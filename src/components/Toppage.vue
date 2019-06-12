<template>
<div>
<!--  <button class="latestButton" v-on:click="latest">最新のツイートを取得</button>-->
  <dl class="keywordSearch">
    <dt><input type="text" v-model="searchWord" placeholder="入力するか、下のワードから検索できるよ"></dt>
    <dd><button :v-ga="$ga.event('send', 'event', 'search', 'click' , 'フリーワード')" v-on:click="search('')">検索</button></dd>
  </dl>
  <p class="TagSearch__cap">よく使うワード</p>
  <ul class="TagSearch">
    <li :v-ga="$ga.event('send', 'event', 'search', 'click' , '3poi')" v-on:click="search('3poi')">3poi</li>
    <li :v-ga="$ga.event('send', 'event', 'search', 'click' , '3ポイ')" v-on:click="search('3ポイ')">3ポイ</li>
    <li :v-ga="$ga.event('send', 'event', 'search', 'click' , 'ハイブリッド')" v-on:click="search('ハイブリッド')">ハイブリッド</li>
    <li :v-ga="$ga.event('send', 'event', 'search', 'click' , 'アトミック')" v-on:click="search('アトミック')">アトミック</li>
    <li :v-ga="$ga.event('send', 'event', 'search', 'click' , 'サテライト')" v-on:click="search('サテライト')">サテライト</li>
    <li :v-ga="$ga.event('send', 'event', 'search', 'click' , 'フロート')" v-on:click="search('フロート')">フロート</li>
    <li :v-ga="$ga.event('send', 'event', 'search', 'click' , 'アンチスピンフラワー')" v-on:click="search('アンチスピンフラワー')">アンチスピンフラワー</li>
    <li :v-ga="$ga.event('send', 'event', 'search', 'click' , '試み')" v-on:click="search('試み')">試み</li>
    <li :v-ga="$ga.event('send', 'event', 'search', 'click' , 'シーケンス')" v-on:click="search('シーケンス')">シーケンス</li>
    <li :v-ga="$ga.event('send', 'event', 'search', 'click' , 'セイム')" v-on:click="search('セイム')">セイム</li>
    <li :v-ga="$ga.event('send', 'event', 'search', 'click' , 'オポジット')" v-on:click="search('オポジット')">オポジット</li>
    <li :v-ga="$ga.event('send', 'event', 'search', 'click' , 'ワンハンド')" v-on:click="search('ワンハンド')">ワンハンド</li>
  </ul>
  <div v-show="loading" class="loader"></div>
  <p class="caption">{{ caption }}</p>
  <TweetCard v-for="tweet in tweets" v-bind:tweet="tweet"></TweetCard>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import TweetCard from './TweetCard'
export default {
  name: 'Toppage',
  components: {
    TweetCard
  },
  data () {
    return {
      tweets:[],
      loading: true,
      searchWord: '',
      caption: ''
    }
  },
  created: function(){
    this.latest();
  },
  methods: {
    latest: function(){
      this.$ga.page('/')
      let vuedata = this;
      vuedata.tweets = [];
      vuedata.tweetDatas = [];
      const api = axios.create({
        headers: {'Access-Control-Allow-Origin': '*'}
      })
      axios
      .get('api/latest')
      .then(function(response){
        for(let i = 0; i < response.data.statuses.length; i++){
          for(let k = 0; k < response.data.statuses[i].extended_entities.media[0].video_info.variants.length; k++){
            let videoUrl = response.data.statuses[i].extended_entities.media[0].video_info.variants[k].url;
            if(videoUrl.match(/.mp4/)){
              vuedata.tweetDatas = {
                id: response.data.statuses[i].id,
                time: moment(response.data.statuses[i].created_at).format('YYYY/MM/DD'),
                text: response.data.statuses[i].text,
                image: response.data.statuses[i].extended_entities.media[0].media_url_https,
                video: videoUrl,
                fav: response.data.statuses[i].favorite_count,
                retweet: response.data.statuses[i].retweet_count
              }
              break;
            }
          }
          vuedata.tweets.push(vuedata.tweetDatas);
        }
        vuedata.caption = '直近1週間の#練習日記を表示してるよ。';
        vuedata.$forceUpdate();
        vuedata.loading = false;
      })
      .catch(function(error) {
        vuedata.caption = 'なんだかおかしいよ。しばらく経ってから試してね。';
      });
    },
    search: function(tag){
      let vuedata = this;
      vuedata.loading = true;
      vuedata.tweets = [];
      vuedata.tweetDatas = [];
      vuedata.caption = '';
      if(tag !== ''){
        vuedata.searchWord = tag;
      }
      const api = axios.create({
        headers: {'Access-Control-Allow-Origin': '*'}
      })
      if(vuedata.searchWord !== ''){
        axios
        .get('api/timeline')
        .then(function(response){
          let exist = 0;
          for(let i = 0; i < response.data.length; i++){
            let text = response.data[i].text;
            if(text.match(/#練習日記/) && text.indexOf(vuedata.searchWord) != -1){
              for(let k = 0; k < response.data[i].extended_entities.media[0].video_info.variants.length; k++){
                let videoUrl = response.data[i].extended_entities.media[0].video_info.variants[k].url;
                if(videoUrl.match(/.mp4/)){
                  vuedata.tweetDatas = {
                    id: response.data[i].id,
                    time: moment(response.data[i].created_at).format('YYYY/MM/DD'),
                    text: text,
                    image: response.data[i].extended_entities.media[0].media_url_https,
                    video: videoUrl,
                    fav: response.data[i].favorite_count,
                    retweet: response.data[i].retweet_count
                  }
                  break;
                }
              }
              vuedata.tweets.push(vuedata.tweetDatas);
              exist = 1;
            }
          }
          if(exist == 0){
            vuedata.caption = '見つからなかったよ。古いものはtwitter公式の「高度な検索」から調べてね。';
          }
          vuedata.$forceUpdate();
          vuedata.loading = false;
        })
        .catch(function(error) {
          vuedata.caption = 'なんだかおかしいよ。しばらく経ってから試してね。';
        });
      }else{
        vuedata.caption = '検索ワードを入力してね。';
        vuedata.$forceUpdate();
        vuedata.loading = false;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.keywordSearch{
  display:flex;
  margin:30px 0;
}
.keywordSearch dt{
  width:80%;
}
.keywordSearch dt input{
  color:#444;
  width:100%;
  height:30px;
  padding:2px 10px;
  box-sizing:border-box;
  border:1px solid #DDD;
  border-radius:0px;
  -webkit-appearance: none;
}
.keywordSearch dt input::placeholder{
  font-size:11px;
}
.keywordSearch dd{
  width:18%;
  margin:0 0 0 2%;
}
input[type="submit"],
input[type="button"] {
  border-radius: 0;
  -webkit-box-sizing: content-box;
  -webkit-appearance: button;
  appearance: button;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
}
input[type="submit"]::-webkit-search-decoration,
input[type="button"]::-webkit-search-decoration {
  display: none;
}
input[type="submit"]::focus,
input[type="button"]::focus {
  outline-offset: -2px;
}
.keywordSearch button{
  width:100%;
  height:30px;
  padding:2px 10px;
  box-sizing:border-box;
  background:#00A474;
  color:#FFF;
  text-align:center;
  border:none;
}
.TagSearch__cap{
  font-size:12px;
  margin:0 0 15px;
  padding:0 0 5px;
  border-bottom:1px solid #00a474;
}
.TagSearch{
  display:flex;
  flex-wrap:wrap;
  margin:0 0 30px;
  padding:0;
}
.TagSearch li{
  list-style-type:none;
  cursor:pointer;
  margin:0 10px 10px 0;
  padding:5px 10px;
  font-size:12px;
  border-radius:5px;
  background:#00A474;
  color:#FFF;
  text-align:center;
}
.loader {
  color: #00A474;
  font-size: 20px;
  margin: 100px auto;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load4 1.3s infinite linear;
  animation: load4 1.3s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
@-webkit-keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
@keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
</style>
