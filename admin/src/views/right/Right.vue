<template>
    <div style="width: auto">
        <el-table :data="rightData" border style="width: 320px">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="authName" label="权限名称" width="180">
            </el-table-column>
            <el-table-column label="权限层级" width="90">
                <template slot-scope="scope">
                    <span>{{scope.row.level|levelFormat}}</span>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
import { getAllRightList } from "@/api/index.js";
export default {
  data() {
    return {
      rightData: []
    };
  },
  mounted() {
    getAllRightList("list").then(res => {
      console.log(res);
      this.rightData = res.data;
    });
  },
  filters: {
    levelFormat(level) {
      if (level === "0") {
        return "一级";
      } else if (level === "1") {
        return "一级";
      } else if (level === "2") {
        return "二级";
      }
    }
  }
};
</script>

<style scoped>
</style>