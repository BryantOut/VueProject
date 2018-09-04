# 重点目录

[element-ui]()

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

## axios拦截器

