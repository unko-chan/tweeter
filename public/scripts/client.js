/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const renderTweets = function (tweetData) {
    tweetData.forEach((tweet) => {
      const tweetMarkup = createTweetElement(tweet);
      $('#tweets-container').prepend(tweetMarkup);
    });
  };

  const createTweetElement = function (tweetObject) {
    const tweetMarkup = `
    <article class="posts">

      <header>
        <p>${tweetObject.user.name}</p> 
        <p class="tweetHandle">${tweetObject.user.handle}</p>
      </header>

      <div class="postBody">
        <p>${tweetObject.content.text}</p>
      </div>

      <footer>
        <p>${tweetObject.created_at}</p>
        <p>icons</p>
      </footer>

    </article>
  `;
    return tweetMarkup;
  };

  $('#postTweet').submit(function (event) {
    event.preventDefault();
    const textform = $('textarea').val();

    if (textform.trim() === '') {
      alert('empty tweet');
      return false;
    }

    if (textform.length > 140) {
      alert('tweet is over character limit');
      return false;
    }
    
    $.post('/tweets', $(this).serialize());
  });

  const loadTweets = function () {
    $.getJSON('/tweets').done(function (response) {
      renderTweets(response);
    });
  };
  loadTweets();
});
