<template>
  <div>
    <!-- <h1>菜单</h1> -->
    <elbread></elbread>
    <!-- 添加 -->
    <el-button type="primary" size="small" @click="isAdd">添加</el-button>
    <!-- 表格 -->
    <tablist @edit="edit"></tablist>
    <!-- 弹框 -->
    <vadd :addInfo="addInfo" @cancel="cancel" ref='dialog'></vadd>
  </div>
</template>

<script>
import elbread from "../../components/el-bread";
import tablist from "../menu/list";
import vadd from "../menu/add";

export default {
  data() {
    return {
      addInfo: {
        isShow: false,
        isAdd: true,
      },
    };
  },
  methods: {
    isAdd() {
      this.addInfo.isShow = true;
      this.addInfo.isAdd=true
    },
    cancel(e) {
      this.addInfo.isShow = e;
    },
    edit(e) {
      console.log(e, "1254658465");

      this.addInfo.isShow = true;

      this.addInfo.isAdd = false;

      this.$refs.dialog.look(e);
    },
    
  },
  components: {
    elbread,
    tablist,
    vadd,
  },
};
</script>

<style lang="" scoped>
</style>
