// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'
Vue.config.productionTip = false
// 使用ElementUI框架
Vue.use(ElementUI)

// 你可以使用 router.beforeEach 注册一个全局前置守卫：
router.beforeEach((to, from, next) => {
  console.log(to.path)
  var token = localStorage.getItem('mytoken')
  // 如果没有 token ，判断如果是 to 到 /login,next
  if (token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
