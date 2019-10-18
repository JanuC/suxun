import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'

import Login from '@/components/home/Login'
import Register from '@/components/home/Register'

import Index from '@/components/index/Index'
import Contacts from '@/components/index/Contacts'
import Add from '@/components/index/Add'
import Own from '@/components/index/Own'

import axios from 'axios'




Vue.use(Router)

const router =  new Router({
  routes: [
    // 重定向
    {path: '/',redirect: '/home/Login'},
    {path: '/home',component: Home,redirect: '/home/Login',
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
// 全局导航守卫
router.beforeEach((to, from, next) => {
  if(to.path == '/home/Login' || to.path =='/home/Register' ||to.path =='/home/Login') {
    next()
  }else {
    // 发送请求,判断token是否合法
    axios
      .post('http://192.168.31.19:3001/myapi/token',{token: localStorage.getItem('token')})
      .then(res => {
        if(res.data.err_code === 200) {
          // 放行
          next()
        }else {
          next('/home/Login')
        }
      })

  }
})

export default router