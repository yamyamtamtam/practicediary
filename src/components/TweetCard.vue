<template>
  <article class="tweetCard">
    <h2 class="tweetCard__title">{{ tweet.text }}</h2>
    <video v-if="tweet.video" class="tweetCard__video" :src="tweet.video" controls></video>
    <div class="tweetCard__data">
      <p class="tweetCard__time">投稿日：{{ tweet.time }}</p>
      <p class="tweetCard__fav">{{ tweet.fav }}<span>fav</span></p>
      <p class="tweetCard__retweet">{{ tweet.retweet }}<span>retweet</span></p>
    </div>
  </article>
</template>

<script>
export default {
  name: 'TweetCard',
  props: ['tweet'],
  data(){
    return {};
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tweetCard{
  position:relative;
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0px 0px 4px #EEE;
  border: none;
  margin: 30px 0 0 0;
  background:#FFF;
}
.tweetCard:after{
  content:"";
  position:absolute;
  top:0;
  right:0;
  width:0;
  height:0;
  border:10px solid transparent;
  border-top:10px solid #00A474;
  border-right:10px solid #00A474;
}
.tweetCard__title{
  font-size: 14px;
  font-weight: normal;
  margin: 0 0 10px 0;
}
.tweetCard__video{
  max-width: 300px;
  width: auto;
  display:block;
  margin:0 auto;
}
.tweetCard__data{
  display:flex;
  justify-content: flex-end;
  align-items:baseline;
  letter-spacing:0;
  margin:20px 0 0;
}
.tweetCard__fav{
  font-size:15px;
  font-weight:bold;
  color:#00A474;
  margin:0 10px 0 0;
}
.tweetCard__fav span{
  font-size:11px;
  font-weight:normal;
  padding:0 0 0 2px;
}
.tweetCard__retweet{
  font-size:15px;
  font-weight:bold;
  color:#00A474;
}
.tweetCard__retweet span{
  font-size:11px;
  font-weight:normal;
  padding:0 0 0 2px;
}
.tweetCard__time{
  font-size:12px;
  color:#444;
  margin-right:auto;
}
</style>
