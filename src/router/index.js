import Vue from 'vue'
import VueRouter from 'vue-router'

// 1.安装插件
Vue.use(VueRouter)

const Home = () => import('../views/home')
const Category = () => import('../views/category/index.vue')
const Cart = () => import('../views/cart')
const Profile = () => import('../views/profile/index.vue')
const Detail = () => import('../views/detail/Detail.vue')

const routes = [{
    path: '',
    redirect: './home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category,
  },

  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  },

]

// 2.创建router
const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router