import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '../components/home/Home'
import Ad from '../components/ads/Ad'
import AdList from '../components/ads/AdList'
import NewAd from '../components/ads/NewAd'
import Login from '../components/auth/Login'
import Registration from '../components/auth/Registration'
import Orders from '../components/user/Orders'


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  },
  {
    path: '/ad/:id',
    name: 'ad',
    props: true,
    component: Ad
  },
  {
    path: '/list',
    name: 'list',
    component: AdList,
    beforEnter: AuthGuard
  },
  {
    path: '/new',
    name: 'newadd',
    component: NewAd,
    beforEnter: AuthGuard
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    beforEnter: AuthGuard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
