import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import User from '../views/user/User.vue'
import Right from '../views/right/Right.vue'
import Role from '../views/right/Role.vue'
import Categories from '../views/goods/Categories.vue'
import Goods from '../views/goods/Goods.vue'
import Add from '../views/goods/GoodsAdd.vue'
import List from '../views/goods/GoodsList.vue'

Vue.use(Router)

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
        }
      ]
    }
  ]
})
