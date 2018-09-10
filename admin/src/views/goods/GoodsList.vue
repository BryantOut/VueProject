<template>
    <div>
        <el-button type="success" plain @click="$router.push({name:'Add'})" style="margin-bottom:20px">添加商品</el-button>
        <template>
            <el-table :data="goodsList" border style="width: 100%">
                <el-table-column prop="goods_name" label="商品名称">
                </el-table-column>
                <el-table-column prop="goods_price" label="商品价格">
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
import { getGoodsList } from "@/api/index.js";
export default {
  data() {
    return {
      goodsList: []
    };
  },
  mounted() {
    getGoodsList({ query: "", pagenum: 1, pagesize: 10 }).then(res => {
      console.log(res);
      this.goodsList = res.data.goods
    });
  }
};
</script>

<style scoped>
</style>