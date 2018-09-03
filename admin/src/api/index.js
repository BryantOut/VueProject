import axios from 'axios';
// 配置基准路径
const baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 设置默认的基准路径
axios.defaults.baseURL = baseURL

// 向登录接口发生请求
export const login = (params) => {
  return axios.post('login', params)
    .then((result) => {
        return result.data
        // 直接将数据返回，不在这边做处理
    })
}
