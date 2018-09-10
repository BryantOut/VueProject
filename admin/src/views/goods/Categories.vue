<template>
    <div class="categories">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="margin-top: 15px;">
            <el-button type="success" plain @click="showAddGoodsFormVisible">商品添加</el-button>
        </div>
        <!-- 商品列表 -->
        <tree-grid style="margin-top: 15px;" :treeStructure="true" :columns="columns" :data-source="goodsList" @deleteCate="deleteCategory" @editCate="editCategory">
        </tree-grid>
        <!-- 添加商品模态框 -->
        <el-dialog title="收货地址" :visible.sync="addGoodsFormVisible">
            <el-form :model="addFrom">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="addFrom.cat_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-cascader 
                    v-model="selectedOptions" 
                    :options="categoriesList" 
                    change-on-select 
                    :props="categoriesProps"></el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addGoodsFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addGoodsSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <!-- Cascader 级联选择器 -->

    </div>
</template>

<script>
import { getGoodsList } from "@/api/index.js";
import TreeGrid from "@/components/TreeGrid/TreeGrid.vue";
export default {
  data() {
    return {
      goodsList: [],
      columns: [
        {
          text: "分类名称",
          dataIndex: "cat_name",
          width: ""
        },
        {
          text: "是否有效",
          dataIndex: "cat_deleted",
          width: ""
        },
        {
          text: "排序",
          dataIndex: "cat_level",
          width: ""
        }
      ],
      categoriesList: [],
      formLabelWidth: "120px",
      addFrom: {
        // 分类父ID
        cat_pid: "",
        // 分类名称	
        cat_name: "",
        // 分类层级
        cat_level : ""
      },
      addGoodsFormVisible: false,
      categoriesProps:{
          value:'cat_id',
          label:'cat_name',
          children:'children'          
      },
      // 这里面存储着我们当前所有选择的父级分类的数据(id)
      selectedOptions:[]
    };
  },
  methods: {
    deleteCategory(cid) {
      console.log(cid)
    },
    editCategory(cid) {
      console.log(cid)
    },
    showAddGoodsFormVisible() {
      this.addGoodsFormVisible = true
      getGoodsList(2).then(res => {
        console.log(res)
        this.categoriesList = res.data
      });
    },
    addGoodsSubmit() {
      // console.log(this.selectedOptions)
      if (this.selectedOptions.length === 0) {
        // 任何菜单都没有选，则主动加入一级菜单
      }
    }
  },
  // 通过components属性可以来注入你想使用的组件
  components: {
    "tree-grid": TreeGrid
  },
  mounted() {
    getGoodsList(3).then(res => {
      console.log(res);
      this.goodsList = res.data
    });
  }
};
</script>

<style scoped>
</style>