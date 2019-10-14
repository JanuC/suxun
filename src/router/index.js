import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'

import Login from '@/components/home/Login'
import Register from '@/components/home/Register'



Vue.use(Router)

export default new Router({
  routes: [
    // 重定向
    {path: '/',redirect: '/home/login'},
    {path: '/home',redirect: '/home/login'},

    
    {path: '/home',component: Home,alias:'/login',
    // 嵌套路由
    children: [
      {path: 'login',component: Login},
      {path: 'register',component: Register}
    ]
  }
  ]
})
