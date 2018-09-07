<template>
    <div class="role">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="success" plain>添加用户</el-button>
        <el-table :data="tableData" style="width: 100%;margin-top:15px;" border>
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-row v-for="first in scope.row.children" :key="first.id" style='padding-bottom:20px'>
                        <el-col :span="4">
                            <el-tag closable type="success" @close='doDelRolesRight(scope.row,first.id)'>
                                {{first.authName}}
                            </el-tag>
                            <span class="el-icon-arrow-right"></span>
                        </el-col>
                        <el-col :span="20">
                            <el-row v-for="second in first.children" :key="second.id" style='padding-bottom:20px'>
                                <el-col :span="6">
                                    <el-tag closable type="info" @close='doDelRolesRight(scope.row,second.id)'>
                                        {{second.authName}}
                                    </el-tag>
                                    <span class="el-icon-arrow-right"></span>
                                </el-col>
                                <el-col :span="18">
                                    <el-tag closable type="" v-for="third in second.children" :key="third.id" style="margin-right:20px;margin-bottom:10px;" @close='doDelRolesRight(scope.row,third.id)'>
                                        {{third.authName}}
                                    </el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row v-if="scope.row.children.length===0">
                        <el-col style="color:#0094FF;font-family:kaiti">该角色没有任何权限，请前往添加</el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column label="角色名称" prop="roleName" width="140">
            </el-table-column>
            <el-table-column label="描述" prop="roleDesc">
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
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>这是一段信息</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getAllRoleList, delRolesRight } from "@/api/index.js";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false
    };
  },
  mounted() {
    getAllRoleList().then(res => {
      console.log(res);
      this.tableData = res.data;
    });
  },
  methods: {
    doDelRolesRight(row, rightId) {
      delRolesRight(row.id, rightId).then(res => {
        console.log(res);
        row.children = res.data;
      });
    },
    showRoleDialog() {
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>