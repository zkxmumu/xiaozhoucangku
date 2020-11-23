<template>
  <div>
    <!-- <h1>菜单</h1> -->
    <elbread></elbread>
    <!-- 添加 按钮-->
    <el-button type="primary" size="small" @click="isAdd">添加</el-button>
    <!--添加 列表 -->
    <vlist @edit='edit'></vlist>
    <vadd ref="rolelook" :addInfo="addInfo" @cancel="cancel"></vadd>
  </div>
</template>

<script>
import elbread from "../../components/el-bread";
import vlist from "../seck/list";
import vadd from "../seck/add";
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
    isAdd(){
      this.addInfo.isShow = true;
      this.addInfo.isAdd=true
    },
    cancel(e) {
      this.addInfo.isShow = e;
    },
    edit(e){
      this.addInfo.isShow=true
       this.addInfo.isAdd=false
       this.$refs.rolelook.look(e);
    }
  },
  components: {
    elbread,
    vlist,
    vadd,
  },
};
</script>

<style lang="" scoped>
</style>
