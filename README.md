# 重点目录

[element-ui]()

[axios拦截器--Interceptors](https://bryantout.github.io/2018/08/29/axios%E5%8F%8Aresource/)

[router全局路由守卫](https://bryantout.github.io/2018/08/31/vue%E7%9A%84%E8%B7%AF%E7%94%B1/)

# 项目接口

[项目接口文档](http://47.96.21.88:8082/)

[项目地址](http://47.96.21.88/#/login)

# 知识点回顾

[Vue Router](https://bryantout.github.io/2018/08/31/vue%E7%9A%84%E8%B7%AF%E7%94%B1/)

[Vue组件](https://bryantout.github.io/categories/vue/)

[Vue单文件组件](https://bryantout.github.io/2018/09/03/vue%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6/)

# vue-cli 脚手架工具文件结构

![](/mdImg/vue项目第一天.png)

# 登录页面

![](/mdImg/login.png)

## element-ui

[官方网站](http://element-cn.eleme.io/2.0/#/zh-CN/component/quickstart)

### 安装

```html
npm i element-ui -S
```

### 快速开发

```html
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
```

## 配置基本路径

```html
import axios from 'axios';
// 配置基准路径
const baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 设置默认的基准路径
axios.defaults.baseURL = baseURL
```

## axios.post将结果返回给用户，后台不进行处理

[axios笔记](https://bryantout.github.io/2018/08/29/axios%E5%8F%8Aresource/)

![](/mdImg/axios2.png)

## axios拦截器--Interceptors

![](/mdImg/axios拦截器.png)

[axios文档](https://github.com/axios/axios)

> **You can intercept requests or responses before they are handled by `then` or `catch`.**
>
> 它们被处理之前，您可以拦截请求或响应`then`或`catch`。

**拦截器基本结构**

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
```

> 需求：**除了登录接口，其他所有接口请求头必须设置为Authorization=token (token为登录成功后服务器返回的认证token)**

**实现需求代码**

```js
// 添加拦截器--不是我们来调用的，而是 axios 自动调用
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  var token = localStorage.getItem('mytoken')
  if (token) {
    // 2.将值传递到服务器 config--
    config.headers['Authorization'] = token
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
```

## router全局路由守卫&路由相关笔记

[导航守卫](https://bryantout.github.io/2018/08/31/vue%E7%9A%84%E8%B7%AF%E7%94%B1/)

