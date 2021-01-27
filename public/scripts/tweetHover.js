// ask mentor: is using .css bad
$(document).ready(function () {
  console.log('read!');
  $('.posts').hover(
    function () {
      $(this).addClass('box-shadow');
      $(this).children('header').find('.tweetHandle').css('color', 'gray');
    },
    function () {
      $(this).removeClass('box-shadow');
      $(this).children('header').find('.tweetHandle').css('color', 'transparent');
    }
  );
});
