 <template>
    <div class="home">
        <el-container>
            <el-aside width="auto">
                <div class="logo"></div>
                <el-menu :router='true' :collapse='collapse' default-active="user" :unique-opened='true' class="el-menu-admin" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-submenu  :index='item.path+""' v-for='item in menuList' :key='item.id'>
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item :index='submenu.path' v-for='submenu in item.children' :key='submenu.id'>
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{this.$store.state.username}}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <span class="myicon myicon-menu toggle-btn" @click='collapse=!collapse'></span>
                    <span class="system-title">用户管理系统</span>
                    <span class="welcome">
                        你好kobe
                        <el-button type="text" @click="quit">退出</el-button>
                    </span>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
 
 <script>
import { getMenus } from "@/api/index.js";
export default {
  data() {
    return {
      collapse: false,
      menuList:[]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    quit() {
      // 清除之前存储的 token
      localStorage.removeItem("mytoken");
      // 重定向回到登录页面
      this.$router.push({ path: "/login" });
    }
  },
  mounted () {
      getMenus().then((res)=>{
          console.log(res)
          this.menuList = res.data
      })
  }
}
</script>
 
 <style scoped lang='scss'>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fffefe;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>