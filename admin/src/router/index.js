import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import User from '../views/user/User.vue'
import Reports from '../views/report/Reports.vue'
import Right from '../views/right/Right.vue'
import Role from '../views/right/Role.vue'
import Categories from '../views/goods/Categories.vue'
import Goods from '../views/goods/Goods.vue'
import Add from '../views/goods/GoodsAdd.vue'
import List from '../views/goods/GoodsList.vue'
import VueQuillEditor from 'vue-quill-editor'

// 引入vue-amap
import VueAMap from 'vue-amap';
Vue.use(VueAMap);

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '6a204f2b675f32f8849ec4b6b7c21e5c',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
Vue.use(Router)

import ECharts from 'vue-echarts'
Vue.component('chart', ECharts)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path: 'users',
          name: 'User',
          component: User
        },
        {
          path: 'rights',
          name: 'Right',
          component: Right
        },
        {
          path: 'roles',
          name: 'Role',
          component: Role
        },
        {
          path: 'categories',
          name: 'Categories',
          component: Categories
        },
        {
          path: 'goods',
          name: 'Goods',
          component: Goods,
          redirect:{name:'List'},
          children:[
            {
              path: 'add',
              name: 'Add',
              component: Add
            },
            {
              path: 'list',
              name: 'List',
              component: List
            }
          ]
        },
        {
          path: 'reports',
          name: 'Reports',
          component: Reports
        }
      ]
    }
  ]
})
