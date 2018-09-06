import axios from 'axios';
// 配置基准路径
const baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 设置默认的基准路径
axios.defaults.baseURL = baseURL

// 添加拦截器--不是我们来调用的，而是 axios 自动调用
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 在请求发送之前你想要做的事情
  // 我们要将 token 这个值通过请求头的方式传递给服务器
  // 1.获取 token
  // console.log(config):Authorization是后台接口与前台调用约定好的值，不能随意修改
  var token = localStorage.getItem('mytoken')
  if (token) {
    // 2.将值传递到服务器
    config.headers['Authorization'] = token
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 向登录接口发生请求
export const login = (params) => {
  return axios.post('login', params)
    .then((result) => {
      return result.data
      // 直接将数据返回，不在这边做处理
    })
}

// 用户数据列表
export const getAllUserInfo = (params) => {
  return axios.get('users', {
    params: params
  }).then((res) => {
    // console.log(res)
    return res.data
    // 直接将数据返回，不在这边做处理
  })
}

// 实现添加用户
export const addUserInfo = (addForm) => {
  return axios.post('users', addForm).then((res) => {
    return res.data
  })
}

// 实现更新用户
export const updataUserInfo = (editForm) => {
  return axios.put(`users/${editForm.id}`, editForm).then((res) => {
    return res.data
  })
}

// 删除用户
export const delUserInfo = (delId) => {
  return axios.delete(`users/${delId}`).then((res) => {
    return res.data
  })
}
