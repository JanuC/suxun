// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'



// 导入element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'

// 导入 font-awesome
import '../node_modules/font-awesome/css/font-awesome.css'




Vue.use(ElementUI)
import '@/assets/css/main.css'

Vue.config.productionTip = false

/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
