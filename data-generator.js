/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.js.
 */

// Set up data structures
const streams = {
  home: [],
  users: {
    JoeExotic: [],
    CaroleBaskin: [],
    DocAntle: [],
    MarioTabraue: [],
  },
};
const users = Object.keys(streams.users);

// Utility function for adding tweets to our data structures
const addTweet = (newTweet) => {
  const username = newTweet.user;
  streams.users[username].push(newTweet);
  streams.home.push(newTweet);
};

// Utility function
const randomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// Random tweet generator
const opening = ['just', '', '', '', 'Carole Baskin', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'Joe Exotic', 'that tiger', 'a lion', 'a seedy old man'];
const verbs = ['attacked', 'murdered', 'rescued', 'eviscerated', 'sold', 'bought', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
const objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
const nouns = ['tiger', 'Carole Baskin\'s husband', 'Joe Exotic', 'cage', 'drugs', 'big cat', 'law', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'lion', 'mind', 'tiger cub'];
const tags = ['#tigerking', '#meth', '#florida', '#susdeath', '#furreal', '#joeforpresident', '#ballin', '#tigercult', '#yolo', '#BigCatRescue', '#roar'];

const randomMessage = () => {
  return [
    randomElement(opening),
    randomElement(verbs),
    randomElement(objects),
    randomElement(nouns),
    randomElement(tags),
  ].join(' ');
};

// Generate random tweets on a random schedule
const generateRandomTweet = () => {
  const tweet = {
    user: randomElement(users),
    message: randomMessage(),
    created_at: new Date(),
  };
  addTweet(tweet);
};

for (let i = 0; i < 10; i++) {
  generateRandomTweet();
}

const scheduleNextTweet = () => {
  generateRandomTweet();
  setTimeout(scheduleNextTweet, Math.random() * 1500);
};
scheduleNextTweet();

// Utility function for letting students add "write a tweet" functionality
// (NOTE: Not used by the rest of this file.)
const writeTweet = (message) => {
  const visitor = window.visitor;

  if (!visitor){
    throw new Error('Set the global visitor property!');
  }

  const tweet = {
    user: visitor,
    message: message,
    created_at: new Date()
  };
  addTweet(tweet);
};
