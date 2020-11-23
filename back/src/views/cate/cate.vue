<template>
  <div>
    <!-- 面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" size="small" @click="isAdd">添加</el-button>
    <!-- 表格列表渲染 -->
    <tablist @edit='edit'></tablist>
    <!-- 弹框表单 -->
    <vadd ref='dialog' @cancel="cancel" :addInfo="addInfo"></vadd>
  </div>
</template>

<script>
import elBread from "../../components/el-bread";
import tablist from "../cate/list";
import vadd from "../cate/add";
export default {
  data() {
    return {
      addInfo: {
        isShow: false,
        isAdd: true
      }
    };
  },
  components: {
    elBread,
    tablist,
    vadd
  },
  methods: {
    isAdd() {
      this.addInfo.isShow = true; 
      this.addInfo.isAdd = true
    },
    cancel(e) {
      this.addInfo.isShow = e;
    },
    //编辑事件
    edit(e){
      this.addInfo.isShow=true   
      this.addInfo.isAdd =false
      this.$refs.dialog.look(e)
    }
  }
};
</script>

<style lang="" scoped></style>
