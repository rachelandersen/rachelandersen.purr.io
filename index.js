/* eslint-disable func-style */
//function that is a user tweet generator
function userTweetGenerator() {
  //access visitorName & visitorMessage from input boxes
  let visitorName = document.getElementById('userName').value;
  let visitorMessage = document.getElementById('userMessage').value;
  //if input exists in both input boxes
  if(visitorName && visitorMessage) {
    //set tweet = to user:visitorName, message: visitorMessage, created_at: new Date()
    const tweet = {
      user: visitorName,
      message: visitorMessage,
      created_at: new Date()
    };
    //if streams.users[visitorName] is undefined, 
    if(!streams.users[visitorName]) {
      //set streams.users[visitorName] = to an empty array so that items can be pushed to it
      streams.users[visitorName] = [];
    }
    //invoke the addTweet function from the data-generator using the data from tweet
    addTweet(tweet);
    //invoke tweetGenerator
    tweetGenerator();
    //set the userMessage input box's value to an empty string to clear it out between tweets
    document.getElementById('userMessage').value = '';
  }
}

//create a global variable to store the value of the last user name that was clicked
var lastUserClicked = '';
//function to hide all other users' tweets when a user's name is clicked
const hideOthers = (user) => {
  //set tweetArray = to an array of tweets with the class name "tweet"
  let tweetArray = document.getElementsByClassName("tweet");
  //loop over tweetArray
  for (let i = 0; i < tweetArray.length; i++) {
    //if tweetArray[i] contains the name of any other user other than the input user (the one clicked)
    if( !tweetArray[i].classList.contains(user) ) {
      //set style.display of tweetArray[i] to 'none' (will remove tweet from view)
      tweetArray[i].style.display = 'none';
    }
    //if user is the lastUserClicked
    if(user === lastUserClicked) {
      //show the whole block again (if user is clicked twice, it will show only their tweets and when clicked again, will show everything again)
      tweetArray[i].style.display = 'block';
    }
  }
  //if user is the lastUserClicked
  if(user === lastUserClicked) {
    //set lastUserClicked to an empty string
    lastUserClicked = '';
    //otherwise
  } else {
    //set lastUserClicked = to the input user
    lastUserClicked = user;
  }
};

//create a global variable lastTweetTimeStamp set = to 0
var lastTweetTimeStamp = 0;

//create a tweetGenerator function
function tweetGenerator() {
  //set a jquery variable $tweetDiv = to the div w/ the class tweetStream
  const $tweetDiv = $("#tweetStream");
  //let $tweets = map invoked on the streams.home array in reversed order
  const $tweets = streams.home.reverse().map((tweet) => {
    //create state variable - set to false
    let shouldBeHidden = false;
    //if condition is met, set state variable to true
    if(lastUserClicked && lastUserClicked !== tweet.user) {
      shouldBeHidden = true;
    }

    //if lastTweetTimeStamp is before the time that the tweet is created at
    if(lastTweetTimeStamp < tweet.created_at) {
      // eslint-disable-next-line quotes
      //set $tweet = to a div with the class of tweet and ${tweet.user}
      const $tweet = $(`<div class="tweet ${tweet.user} tweet"></div>`);
      //set userName = a link of @${tweet.user} that, when clicked, will implement the hideOthers helper function
      let userName = $(`<a onclick="hideOthers('${tweet.user}')" href="#">@${tweet.user}</a>`);
      //append username to $tweet
      $tweet.append(userName);
      //set text = to `: ${tweet.message} ${moment(tweet.created_at).fromNow()}`
      const text = `: ${tweet.message} ${moment(tweet.created_at).fromNow()}`;
      //append the text to $tweet
      $tweet.append(text);
      //if shouldBeHidden is true
      if(shouldBeHidden) {
        //hide $tweet
        $tweet.hide();
      }
      //return $tweet
      return $tweet;
    }
  });
  //prepend $tweets to $tweetDiv
  $tweetDiv.prepend($tweets);
  //reset the lastTweetTimeStamp to current time
  lastTweetTimeStamp = Date.now();
};

$(document).ready(() => {
  //when the #refreshButton is clicked, invoke tweetGenerator
  $("#refreshButton").click(() => {
    tweetGenerator();
  });
  //when the #tweetButton is clicked, invoke tweetGenerator
  $("#tweetButton").click(() => {
    userTweetGenerator();
  });
  //invoke tweetGenerator
  tweetGenerator();
});

//1. show the user new tweets somehow

//a. create a function to display new tweets

//b. create a button that, when clicked, displays new tweets (calls the newTweet function)

//2. figure out how to display timestamps

//3. Design your interface so that you want to look at and use the product you’re making.

//4. Allow the user to click on any username to see that user’s timeline.

//a. hide other user tweets when user name is clicked (all user names are clickable)

//b. create a button to return to all tweets

//5. Show when the tweets were created in a human-friendly way (eg “10 minutes ago”). You’ll
// want to use a library to do this work for you. A very popular library is called Moment.js

//6. Allow the user to tweet
//a. create username and tweet input boxes
//b. create a button that, when clicked, will take data from input boxes and insert at the
// top of the tweet stream in proper format with a date
