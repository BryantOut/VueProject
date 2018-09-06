<template>
  <div class="user">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 15px;">
      <!-- 搜索部分 -->
      <el-input placeholder="请输入内容" v-model="queryKey" class="input-with-select" style='width:300px' @keyup.native.enter="querySub">
        <el-button slot="append" icon="el-icon-search" @click="querySub"></el-button>
      </el-input>
      <el-button type="success" plain @click="addDialogFormVisible=true">添加用户</el-button>
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
              <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="changeUserStatus(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-tooltip content="编辑" placement="top">
                <el-button type="success" icon="el-icon-edit" plain @click="showEditDialog(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip content="授权角色" placement="top">
                <el-button type="primary" icon="el-icon-share" plain @click="showRoleDialog(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="danger" icon="el-icon-delete" plain @click="deleteDialog(scope.row.id)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div>
      <div style='text-align:center;margin-top: 40px;'>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[4, 8, 12, 16]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 添加用户的模态框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" :rules="rules" ref='addForm'>
        <el-form-item label="用户名：" :label-width="formLabelWidth" prop="username">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话：" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加编辑莫套框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm" :rules="rules" ref='editForm'>
        <el-form-item label="用户名：" :label-width="formLabelWidth" prop="username">
          <el-input v-model="editForm.username" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话：" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updataUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色模态框 -->
    <el-dialog title="收货地址" :visible.sync="roleDialogFormVisible">
      <el-form :model="roleFrom">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="roleFrom.username" auto-complete="off" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="角色：联级" :label-width="formLabelWidth">
          <el-select v-model="roleFrom.role_name" placeholder="请选择活动区域">
            <el-option :label="item.roleName" :value="item.id" v-for='item in AllRoleList' :key='item.id'></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary"  @click="changeUserRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllUserInfo,
  addUserInfo,
  updataUserInfo,
  delUserInfo,
  changeUserInfoStatus,
  getAllRoleList,
  changeUserRoleById
} from "@/api/index.js";
export default {
  data() {
    return {
      AllRoleList:[],
      pageSize: 4,
      // 当前页
      pageNum: 1,
      total: 1,
      userInfoData: [],
      queryKey: "",
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      roleFrom: 
        {
          username: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: "",
          role_name:'',
          id:''
        }
      ,
      editForm: {
        username: "",
        email: "",
        mobile: "",
        id: ""
      },
      addDialogFormVisible: false,
      formLabelWidth: "120px",
      editDialogFormVisible: false,
      roleDialogFormVisible: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
        mobile: [
          { required: true, message: "手机号码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.init();
      console.log(`当前页: ${val}`);
    },
    init() {
      getAllUserInfo({
        query: this.queryKey,
        pagenum: this.pageNum,
        pagesize: this.pageSize
      }).then(res => {
        // console.log(res.data);
        this.userInfoData = res.data.users;
        this.total = res.data.total;
      });
    },
    querySub() {
      this.init();
    },
    // 添加用户
    addUserSubmit(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          addUserInfo(this.addForm).then(res => {
            console.log(res);
            this.addDialogFormVisible = false;

            // 操作提示
            this.$message({
              message: res.meta.msg,
              type: "success"
            });

            // 重置表单
            this.$refs[addForm].resetFields();
            this.init();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 编辑用户
    showEditDialog(parame) {
      console.log(parame);
      this.editDialogFormVisible = true;
      this.editForm.username = parame.username;
      this.editForm.email = parame.email;
      this.editForm.id = parame.id;
      this.editForm.mobile = parame.mobile;
    },
    // 更新用户
    updataUser() {
      //   console.log(this.editForm);
      updataUserInfo(this.editForm).then(res => {
        // console.log(res);
        this.editDialogFormVisible = false;
        // 操作提示
        this.$message({
          message: res.meta.msg,
          type: "success"
        });
        this.init();
      });
    },
    // 删除用户
    deleteDialog(delId) {
      console.log(delId);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delUserInfo(delId).then(res => {
            console.log(res);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.init();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 改变用户状态
    changeUserStatus(row) {
      console.log(row);
      changeUserInfoStatus({ id: row.id, state: row.mg_state }).then(res => {
        console.log(res);
        // 操作提示
        if (res.meta.status === 200) {
          this.$message({
            message: res.meta.msg,
            type: "success"
          });
          this.init();
        }
      });
    },
    // 获取所有角色列表数据
    showRoleDialog(row) {
      this.roleDialogFormVisible = true
      console.log(row)
      this.roleFrom.username = row.username
      this.roleFrom.role_name = row.role_name
      this.roleFrom.id = row.id
      // 加载角色列表
      getAllRoleList().then((res)=>{
        console.log(res)
        this.AllRoleList = res.data
      })
    },
    // 修改用户角色
    changeUserRole() {
      changeUserRoleById(this.roleFrom).then((res)=>{
        console.log(res)
        // 操作提示
        if (res.meta.status === 200) {
          this.$message({
            message: res.meta.msg,
            type: "success"
          });
          this.roleDialogFormVisible = false
          this.init();
        }
      })
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