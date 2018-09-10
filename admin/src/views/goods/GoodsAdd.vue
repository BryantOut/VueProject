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
                    <el-tab-pane label="商品内容" name="5">
                        <quill-editor v-model="addForm.goods_introduce" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
                        </quill-editor>
                    </el-tab-pane>
                </el-tabs>
                <el-button type="success" plain class="submitInfoBtn">成功按钮</el-button>
            </el-form>
        </template>
        <!-- 预览图模态框 -->
        <el-dialog title="图片预览" :visible.sync="previewdialogVisible" width=440px>
            <img :src="imgSrc" alt="" style="width:400px">
        </el-dialog>
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
        pics: [],
        attrs: []
      },
      goodsCategoriesList: [],
      props: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      content: null,
      editorOption: {},
      imgSrc:'',
      previewdialogVisible:false
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 当从上传组件移除上传文件的时候，会触发下面这个函数
    // file:当前被删除的文件
    // fileList:当前上传组件中剩余的文件
    handleRemove(file, fileList) {
      console.log(file, fileList);
      var delFilePath = file.response.data.tmp_path;
      // 在this.addFrom.pics中查找这个文件名称对应的索引，将对应的元素删除
      var index = this.addForm.pics.findIndex(value => {
        return value.pic === delFilePath;
      });
      this.addForm.pics.splice(index, 1);
    },
    handlePreview(file) {
      console.log(file);
      this.imgSrc = 'http://localhost:8888/'+file.response.data.tmp_path
      this.previewdialogVisible = true
    },
    // 获取 token
    getToken() {
      var token = localStorage.getItem("mytoken");
      return { Authorization: token };
    },
    // 文件上传成功之后的钩子处理函数
    onSuccess(response, file, fileList) {
      console.log(response);
      this.addForm.pics.push({ pic: response.data.tmp_path });
      //   console.log(file);
      //   console.log(fileList);
    },
    // 选择分类的时候触发
    handleChange(e) {
      // console.log(e)
      this.addForm.goods_cat = e.join(",");
      // console.log(this.addForm.goods_cat)
    },
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    }
  },
  mounted() {
    getGoodsList({ type: 3 }).then(res => {
      this.goodsCategoriesList = res.data;
    });
  }
};
</script>

<style scoped lang='scss'>
.submitInfoBtn {
  float: right;
  margin: 20px 0;
}
.quill-editor {
  height: 400px;
  .ql-container {
    height: 300px;
  }
}
</style>