$(function () {
  $('span.copy').click(function () {
    navigator.clipboard.writeText(this.textContent);
    const item = $(this);
    item.addClass('clicked');
    setTimeout(function () {item.removeClass('clicked');}, 500);
  });
});
