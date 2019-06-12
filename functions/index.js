const express = require('express');
const cors = require('cors');
const twitter = require('twitter');
const functions = require('firebase-functions');
const client = new twitter({
  'consumer_key'        :'xxxxxx',
  'consumer_secret'     :'xxxxxx',
  'access_token_key'    :'xxxxxx',
  'access_token_secret' :'xxxxxx'
});
let searchParams = {
    q: '#練習日記 from:yamakoune',
    count: 20,
    include_rts: false,
    exclude_replies: true
};
let timelineParams = {
    screen_name: 'yamakoune',
    count: 200,
    trim_user: true,
    exclude_replies: true,
    include_rts: false
};
const app = express();
app.use(cors({origin:true}));
app.get('/api/latest', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.set('Cache-Control', 'public, max-age=900, s-maxage=900');
  client.get('search/tweets', searchParams, (error, tweets, response) => {
      if (!error) {
        res.send(tweets);
      }else{
        res.send(error);
      }
  });
});
app.get('/api/timeline', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.set('Cache-Control', 'public, max-age=900, s-maxage=900');
  client.get('statuses/user_timeline', timelineParams, (error, tweets, response) => {
      if (!error) {
        res.send(tweets);
      }else{
        res.send(error);
      }
  });
});
//app.listen(3000, () => console.log('Listening on port 3000'));
exports.api = functions.https.onRequest(app);
