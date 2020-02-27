import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 全局样式
import './assets/css/global.css'
// 处理时间
import moment from 'moment/moment'
// 引入点赞组件
import Likes from './components/Star/Star.vue'
// 引入评论组件
import commentItem from './components/Comment/CommentsItem.vue'
import replyItem from './components/Comment/ReplyItem.vue'
Vue.component('like', Likes)
Vue.component('comment-item', commentItem)
Vue.component('reply-item', replyItem)
Vue.use(ElementUI)
axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.config.productionTip = false
Vue.filter('moment', function(value, formatString) {
  formatString = formatString || 'YYYY-MM-DD'
  return moment(value).format(formatString)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
