import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'

import Login from '@/components/home/Login'
import Register from '@/components/home/Register'

import Index from '@/components/index/Index'
import Contacts from '@/components/index/Contacts'
import Add from '@/components/index/Add'
import Own from '@/components/index/Own'




Vue.use(Router)

export default new Router({
  routes: [
    // 重定向
    {path: '/',redirect: '/home/login'},
    {path: '/home',component: Home,redirect: '/home/login',
    // 嵌套路由
      children: [
        {path: 'login',component: Login},
        {path: 'register',component: Register}
    ]
  },
  {path: '/index',component: Index,redirect:'/index/contacts',
    children: [
      {path: 'contacts', component: Contacts},
      {path: 'add', component: Add},
      {path: 'own', component: Own}
    ]
  },
  ]
})
