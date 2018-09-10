<template>
  <div class="login">
    <div class="container">
      <el-form :model="loginFrom" :rules="rules" ref="loginFrom" class="demo-ruleForm">
        <img src="../assets/avatar.jpg" alt="" class="avatar">
        <el-form-item prop="username">
          <el-input v-model="loginFrom.username" prefix-icon="myicon myicon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginFrom.password" prefix-icon="myicon myicon-key"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submitForm('loginFrom')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/index.js";
import { getAllUserInfo } from "@/api/index.js";
export default {
  data() {
    return {
      loginFrom: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.loginFrom).then(res => {
            console.log(res);
            if (res.meta.status === 200) {
              // 给出提示信息
              this.$message({
                message: res.meta.msg,
                type: "success"
              })

              // this.$store.state.username = res.data.token
              this.$store.dispatch('setUserNameAction',res.data.username)
              // 将 token 存储起来，使用 localStorage
              localStorage.setItem('mytoken',res.data.token)

              /* 除了使用 <router-link> 创建 a 标签来定义导航链接，
              我们可以借助 router 的实例方法，通过编写代码来实现 */
              // 路由跳转
              this.$router.push({name: 'Home'})

            } else {
              this.$message({
                message: res.meta.msg,
                type: "error"
              })
            }
          });
        } else {
          this.$message.error('请填写用户名和密码');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang='scss'>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../assets/bg.png");

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    // background: white;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
      margin-bottom: 20px;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>