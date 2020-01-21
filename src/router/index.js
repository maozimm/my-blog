import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/Login.vue'
import Home from '../components/Home/Home.vue'
import Register from '../components/register/Register.vue'
import UserInfo from '../components/User/UserInfo.vue'
import ArticleList from '../components/Article/ArticleList.vue'
import PublishArticle from '../components/Article/PublishArticle.vue'
import CommentList from '../components/Comment/CommentList.vue'
import SetComment from '../components/Comment/SetComment.vue'
import CategoryList from '../components/Categories/CategoryList.vue'
import UserHome from '../components/UserHome/UserHome.vue'
import HotArticle from '../components/HotArticle/HotArticle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/userInfo', component: UserInfo },
      { path: '/articleList', component: ArticleList },
      { path: '/publishArticle', component: PublishArticle },
      { path: '/commentList', component: CommentList },
      { path: '/setComment', component: SetComment },
      { path: '/categoryList', component: CategoryList }
    ]
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/user_home',
    component: UserHome,
    children: [{ path: '/hotArticle', component: HotArticle }],
    redirect: '/hotArticle'
  }
]

const router = new VueRouter({
  routes
})

export default router
