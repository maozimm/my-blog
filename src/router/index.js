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
import ArticleDetail from '../components/Article/ArticleDetail.vue'
import ArticleCategories from '../components/Article/ArticleCategories.vue'
import UserArticle from '../components/ArticleManage/UserArticle.vue'
import ModifyUser from '../components/PersonalCenter/ModifyInfo.vue'
import ModifyPassword from '../components/PersonalCenter/ModifyPassword.vue'

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
      { path: '/modifyArticle/:id', component: PublishArticle },
      { path: '/commentList', component: CommentList },
      { path: '/setComment', component: SetComment },
      { path: '/categoryList', component: CategoryList }
    ],
    redirect: '/userInfo'
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/user_home',
    component: UserHome,
    children: [
      { path: '/hotArticle', component: HotArticle },
      { path: '/articleDetail/:id', component: ArticleDetail },
      {
        path: '/userPublishArticle',
        component: PublishArticle,
        name: 'userPublishArticle'
      },
      {
        path: '/recommendArticle',
        component: HotArticle,
        name: 'recommendArticle'
      },
      {
        path: '/articleCategories',
        component: ArticleCategories
      },
      {
        path: '/userArticle',
        component: UserArticle
      },
      {
        path: '/userModifyArticle/:id',
        component: PublishArticle,
        name: 'userModifyArticle'
      },
      {
        path: '/modifyUser',
        component: ModifyUser
      },
      {
        path: '/modifyPassword',
        component: ModifyPassword
      }
    ],
    redirect: '/hotArticle'
  }
]

const router = new VueRouter({
  routes
})

export default router
