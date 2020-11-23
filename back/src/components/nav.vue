<template>
  <div>
    <el-menu
      :default-active="defaultactive"
      class="el-menu-vertical-demo"
      active-text-color="#FF8000"
      unique-opened
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-grid"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu :index="item.id.toString()" v-for="item in getUserInfo.menus" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item :index="menu.url" v-for="menu in item.children" :key="menu.id">
          <span slot="title">{{menu.title}}</span>
        </el-menu-item>
      
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      defaultactive: "/home",
    };
  },
  mounted() {
    this.defaultactive = this.$router.path;
    // this.getMenuList()
  },
  methods: {
    // ...mapActions({
    //   getMenuList: "menu/getMenuListAction",
    // }),
  },
  computed: {
    // ...mapGetters({
    //   menuList: "menu/getMenuList",
    // }),
    ...mapGetters(['getUserInfo'])
  },
  components: {},
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-menu {
  background: $oneBgColor;
  height: 130vh !important;
}
</style>
