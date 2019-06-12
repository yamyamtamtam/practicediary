const twitter = require('twitter');

const client = new twitter({
  "consumer_key"        :"AGCakXw85uaHtoPZm5shWjgvA",
  "consumer_secret"     :"CHlulhuGHgLUldZ8C67nHbA1bSUjg3Rn7N95p6movKxgqyccIH",
  "access_token_key"    :"74767996-Wdk2pQnJxvzpILXhpd2TJnxlhyvLcPtuDhwxB8eI0",
  "access_token_secret" :"3f5hBTB5y60m1PvKgdLiZ2IYKbPQIM5uuawbePs9rwmey"
});

let params = {
    q: '#練習日記 from:yamakoune',
    count: 20,
    include_rts: false,
    exclude_replies: true
};

client.get('search/tweets', params, function(error, tweets, response){
    if (!error) {
        console.log(tweets);
    }
});
