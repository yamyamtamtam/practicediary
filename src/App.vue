<template>
  <div id="app">
    <div class="inner">
      <h1 class="mainHeadline">@yamakouneの練習日記</h1>
      <p><a target="_blank" href="https://twitter.com/yamakoune">@yamakoune</a>のポイやジャグリングの<a target="_blank" href="https://twitter.com/search?l=&q=%23%E7%B7%B4%E7%BF%92%E6%97%A5%E8%A8%98%20from%3Ayamakoune&src=typd&lang=ja">#練習日記</a>を検索できるよ</p>
      <Toppage></Toppage>
      <h6 class="copyright">&copy; 2019 yamakoune. </h6>
    </div>
  </div>
</template>

<script>
import Toppage from './components/Toppage'

export default {
  name: 'App',
  components: {
    Toppage
  }
}
</script>

<style>
body{
  padding:0;
  margin:0;
}
#app {
  font-family: "メイリオ",Meiryo,"Hiragino Kaku Gothic Pro","ヒラギノ角ゴ Pro W3","MS PGothic","MS UI Gothic",Helvetica,Arial,sans-serif;
  color: #555;
  font-size:14px;
  padding: 40px 0 10px;
  letter-spacing:2px;
  width: 100%;
	height: auto;
	background-color: #DFF4EB;
	background-image:
	 repeating-linear-gradient(-45deg,
	 #D2F2E9, #D2F2E9 15px,
	 transparent 0, transparent 30px);
}
a{
  color:#00A474;
  text-decoration:none;
}
p{
  margin:0;
  padding:0;
  line-height:1.4;
}
.inner{
  max-width:600px;
  width:90%;
  margin:0 auto;
}
.mainHeadline{
  font-size:28px;
  margin:0 0 40px;
  letter-spacing:4px;
  text-align: center;
  color: #FFF;
  text-shadow:2px 2px 2px #BBB,1px -1px 4px #D2F2E9,-1px 1px 4px #D2F2E9,-1px -1px 4px #D2F2E9;
}
.adswrapper{
  margin:20px 0;
}
.copyright{
  font-size:11px;
  font-weight:normal;
  text-align:center;
  margin:40px 0 0;
}
</style>
