const express = require('express');
const Twit = require('twit');
const config = require('./config.js');
const app = express();

/*
  HEY

  YA U

  Rename config.sample.js to config.js

  k
*/

const T = new Twit(config);

//Eliminated this array of random phrases. -RD 
/* const niceThingsToSay = [
  'It\'s Zirculo, RD\'s bot! He wrote a little more about his ideas at https://roskideluge.github.io/',
  'Hey There! The eclipse was amazing, check this out https://roskideluge.github.io/',
  'Zirculo is about circles! https://roskideluge.github.io/',
  'At your service! It\'s Zirculo! https://roskideluge.github.io/',
  'wait for it................  Zirculo! → → → →  https://roskideluge.github.io/',
  'Hey! check out https://roskideluge.github.io/ - it\'s RD\'s manifesto.',
]; */

// const funEmojis = ['👊','🔥','👍','🎉','💁','🙃','🍕','😎','😘','👏','✌️','👌','👈','👙','🐷','🍟'];

//Eliminated function that creates a reply (buildTweet) for tracked words/phrases. - RD

/* function buildTweet() {
  // get a random emoji
  const emoji = funEmojis[Math.floor(Math.random() * funEmojis.length)];
  // get a random sentence
  const sentence = niceThingsToSay[Math.floor(Math.random() * niceThingsToSay.length)];
  return `${sentence} ${emoji}`;
} */

const stream = T.stream('statuses/filter', {
  track: 'eternal recurrence, eterno retorno' 
});

stream.on('tweet', (tweet) => {
  console.log(tweet);
  
  
  /* const createdTweet = {
    status: `@${tweet.user.screen_name} ${buildTweet()}`,
    in_reply_to_status_id: tweet.id_str
  }; */
  
  /* Changed it so that it automatically RT any tweet with the 
  tracked words, "eternal recurrence, eterno retorno" - RD */
  T.post('statuses/retweet/:id', {
    id: tweet.id_str
  }, (err, data, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log('${data.text}')
    }
  });
});

//Function is set to trigger RT every 5 min. 
setInterval(T.stream, 300000);

app.listen(3000, () => console.log('Server listening on port 3000!') );
