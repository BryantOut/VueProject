<template>
    <div class="add">
        <el-steps :active="activeName-0" finish-status="success" style="margin-bottom:20px">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
            <el-step title="步骤 4"></el-step>
            <el-step title="步骤 5"></el-step>
        </el-steps>
        <template>
            <el-form :model="addForm" label-width="80px">
                <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
                    <el-tab-pane label="基本信息" name="1">
                        <el-form-item label="商品名称">
                            <el-input v-model="addForm.goods_name" style="width:180px"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格">
                            <el-input v-model="addForm.goods_price" style="width:180px"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量">
                            <el-input v-model="addForm.goods_weight" style="width:180px"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量">
                            <el-input v-model="addForm.goods_number" style="width:180px"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <el-cascader :props="props" :options="goodsCategoriesList" @change="handleChange"></el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name="2">商品参数</el-tab-pane>
                    <el-tab-pane label="商品属性" name="3">商品属性</el-tab-pane>
                    <el-tab-pane label="商品图片" name="4">
                        <el-upload class="upload-demo" action="http://localhost:8888/api/private/v1/upload" :headers="getToken()" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture" :on-success="onSuccess">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" name="5">商品内容</el-tab-pane>
                </el-tabs>
                <el-button type="success" plain class="submitInfoBtn">成功按钮</el-button>
            </el-form>
        </template>
    </div>
</template>

<script>
import { getGoodsList } from "@/api/index.js";
export default {
  data() {
    return {
      fileList2: [],
      activeName: "1",
      addForm: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: "",
        attrs: ""
      },
      goodsCategoriesList: [],
      props: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 获取 token
    getToken() {
      var token = localStorage.getItem("mytoken");
      return { Authorization: token };
    },
    onSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
    },
    handleChange(e) {
        console.log(e)
        this.addForm.goods_cat = e.join(',')
        console.log(this.addForm.goods_cat)
    }
  },
  mounted() {
    getGoodsList({ type: 3 }).then(res => {
      this.goodsCategoriesList = res.data;
    });
  }
};
</script>

<style scoped>
.submitInfoBtn {
  float: right;
  margin: 20px 0;
}
</style>