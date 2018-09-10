import Vue from 'vue'
import Vuex from 'vuex'


// 让vue使用vuex工具来实现组件之间的数据共享
Vue.use(Vuex)


// 存储数据的对象，我们可以将你需要存储的数据在这个state中定义
const state = {
  username:''
}
const mutations = {
  setUserName (state,username) {
    state.username = username
    localStorage.setItem('myname',username)
  },
  getUserName (state) {
    return state.username
  }
}
const actions = {
  setUserNameAction:({commit},username)=>{
    commit('setUserName',username)
  },
  getUserNameAction:({commit})=>{
    commit('getUserName')
  }
}
const getters = {
  getUserName:(state)=>{
    return localStorage.getItem('myname')
  }
}


export default new Vuex.Store({
  strict:true,
  state,
  getters,
  actions,
  mutations
})
