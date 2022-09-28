$(function () {
  $('.mail').html(function (_, html) {return html + "@" + window.location.hostname;});
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
});
