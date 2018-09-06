<template>
    <div class="user">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" style='width:300px'>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success" plain>成功按钮</el-button>
        </div>
        <div style="margin-top: 15px;">
            <template>
                <el-table :data="userInfoData" border style="width: 100%">
                    <el-table-column type="index" width="50">
                    </el-table-column>
                    <el-table-column prop="username" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱" width="180">
                    </el-table-column>
                    <el-table-column prop="mobile" label="电话">
                    </el-table-column>
                    <el-table-column label="状态" width="60">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="220">
                        <template slot-scope="scope">
                            <el-tooltip content="编辑" placement="top">
                                <el-button type="success" icon="el-icon-edit" plain></el-button>
                            </el-tooltip>
                            <el-tooltip content="分享" placement="top">
                                <el-button type="primary" icon="el-icon-share" plain></el-button>
                            </el-tooltip>
                            <el-tooltip content="删除" placement="top">
                                <el-button type="danger" icon="el-icon-delete" plain></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div>
            <div style='text-align:center;margin-top: 40px;'>
                <el-pagination 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="pageNum" 
                :page-sizes="[1, 2, 3, 4]" 
                :page-size="1" 
                layout="total, sizes, prev, pager, next, jumper" 
                :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllUserInfo } from "@/api/index.js";
export default {
  data() {
    return {
        pageSize:1,
      pageNum: 1,
      value1: true,
      value2: true,
      input5: "",
      total: 1,
      userInfoData: []
    };
  },
  mounted() {
    // getAllUserInfo({ query: "", pagenum: 1, pagesize: "4" }).then(res => {
    //   console.log(res.data);
    //   this.userInfoData = res.data.users;
    //   this.total = res.data.total;
    // });
    this.init();
  },
  methods: {
    handleSizeChange(val) {
        this.pageSize = val
        this.init()
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        this.pageNum = val
        this.init()
      console.log(`当前页: ${val}`);
    },
    init() {
      getAllUserInfo({ query: "", pagenum: this.pageNum, pagesize: this.pageSize }).then(res => {
        console.log(res.data);
        this.userInfoData = res.data.users;
        this.total = res.data.total;
      });
    }
  }
};
</script>

<style scoped lang='scss'>
/* 覆盖element导航菜单的样式 */
.el-breadcrumb {
  background-color: #f5f5f5;
  height: 45px;
  font-size: 15px;
  padding-left: 10px;
  line-height: 45px;
  margin-bottom: 15px;
}
</style>