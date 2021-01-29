const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweetObject) {
  const tweetMarkup = `
  <article class="posts">

    <header>
      <div id="userProfile">
        <img src="${tweetObject.user.avatars}"></img>
        <p>${tweetObject.user.name}</p> 
      </div>
      <p class="tweetHandle">${tweetObject.user.handle}</p>
    </header>

    <div class="postBody">
      <p>${escape(tweetObject.content.text)}</p>
    </div>

    <footer>
      <p>${moment(tweetObject.created_at).fromNow()}</p>
      <div class="icons">
        <i class="fas fa-flag fa-xs"></i>
        <i class="far fa-retweet fa-xs"></i>
        <i class="far fa-heart fa-xs"></i>
      </div>
    </footer>

  </article>
`;
  return tweetMarkup;
};
//pure functions. Does not need to be within $(document).ready scope

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const renderTweets = function (tweetData) {
    tweetData.sort((a, b) => a.created_at > b.created_at); //sorts the tweet array by time
    tweetData.forEach((tweet) => {
      const tweetMarkup = createTweetElement(tweet);
      $('#tweets-container').prepend(tweetMarkup);
    });
  };

  $('.compose').click(function () {
    $('.new-tweet').slideDown();
    $('textarea').focus();
    
    if ($('.new-tweet').height() === 92) {
      $('.new-tweet').slideUp();
    }
  });

  $('#postTweet').submit(function (event) {
    event.preventDefault();
    const textform = $('textarea').val();

    if (textform.trim() === '') {
      $('#warning').text('Oh no! Your beak is empty!').slideDown();
      return false;
    }

    if (textform.length > 140) {
      $('#warning')
        .text("Oh no! Your beak can't handle that tweet! ")
        .slideDown();
      return false;
    }

    $('#warning').slideUp();

    $.post('/tweets', $(this).serialize(), function () {
      loadTweets();
      $('textarea').val(''); //Success callback to take in multiple functions
      $('output').text(MAXCHAR)
    });
  });

  const loadTweets = function () {
    $.getJSON('/tweets').done(function (response) {
      $('#tweets-container').empty(); //prevents double rendering
      renderTweets(response);
    });
  };

  $('#warning').hide();

  loadTweets();
});
