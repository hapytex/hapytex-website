$(function () {
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
  const mail = $('.mail');
  emailjs.init('1U0dhCkXoZqW3N_vS');
  function close_mail() {
    $('.envelope-side-borders').data('opened', false).removeClass('open');
  }
  function send_mail(form) {
    close_mail();
    const msg = form.elements['message'].value.trim();
    if(msg) {
        const match = msg.match(emailRegex);
        emailjs.send("service_bgcm91o","template_3fhqju7",{
            message: msg,
            from: Array.from(msg.matchAll(emailRegex)).join() || undefined
        });
    }
    form.reset();
    $('.envelope button').prop('disabled', true);
  }
  mail.html(function (_, html) {return html + "@" + window.location.hostname.replace(/^www./, '');});
  function toggle_mail() {
    const env = $('.envelope-side-borders');
    if(env.data('opened')) {
      send_mail($('.envelope form')[0]);
    } else {
      env.addClass('open');
      env.data('opened', true);
      env.find('textarea').focus();
    }
  }
  mail.click(toggle_mail);
  const copy = $('span.copy');
  copy.html(function (_, html) {return $('<span>').html(html);});
  copy.click(function () {
    navigator.clipboard.writeText(this.textContent);
    const item = $(this);
    item.addClass('copied');
    setTimeout(function () {item.removeClass('copied');}, 500);
    // item.addClass('clicked');
    // setTimeout(function () {item.removeClass('clicked);}, 500);
  });
  $('.envelope textarea').keydown(function (e) {if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)) {send_mail(this.form);} else if(e.keyCode == 27) {close_mail();}});
  $('.envelope textarea').on('input', function (e) {$('.envelope button').prop('disabled', this.value.length <= 0);});
  $('.envelope form').submit(function () {send_mail(this);});
});
