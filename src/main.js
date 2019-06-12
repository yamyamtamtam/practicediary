// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
//import Ads from 'vue-google-adsense'
import '@babel/polyfill'
import App from './App'

Vue.config.productionTip = false

Vue.use(require('vue-script2'))
/*
Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)
*/
Vue.use(VueAnalytics, {
  id: 'UA-139924765-1'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
