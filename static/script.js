$(function () {
  const mail = $('.mail');
  emailjs.init('1U0dhCkXoZqW3N_vS');
  function send_mail(form) {
    $('.envelope-side-borders').data('opened', false);
    const msg = form.elements['message'].value.trim();
    if(msg) {
        emailjs.send("service_he4xtq9","template_3fhqju7",{
            message: msg,
        });
        $('.envelope-side-borders').removeClass('open');
        form.reset();
    }
  }
  mail.html(function (_, html) {return html + "@" + window.location.hostname.replace(/^www./, '');});
  mail.click(function() {
    const env = $('.envelope-side-borders');
    if(env.data('opened')) {
      send_mail($('.envelope form')[0]);
    } else {
      env.addClass('open');
      env.data('opened', true);
      env.find('textarea').focus();
    }
  });
  const copy = $('span.copy');
  copy.html(function (_, html) {return $('<span>').html(html);});
  copy.click(function () {
    navigator.clipboard.writeText(this.textContent);
    const item = $(this);
    item.addClass('copied');
    setTimeout(function () {item.removeClass('copied');}, 500);
    // item.addClass('clicked');
    // setTimeout(function () {item.removeClass('clicked');}, 500);
  });
  $('.envelope textarea').keydown(function (e) {if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)) {send_mail(this.form);}});
  $('.envelope form').submit(function () {send_mail(this.form);});
});
