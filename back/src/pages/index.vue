<template>
  <div>
    <el-container>
      <el-header>
        XXX大型后台管理项目
        <div v-if="getUserInfo" class="userInfo">
          欢迎 {{ getUserInfo.username }} 登录本系统
          <el-button @click="logout" type="danger" size="small">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 导航菜单 -->
          <navv></navv>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navv from "../components/nav";
import {mapActions,mapGetters} from 'vuex'
export default {
  data() {
    return {};
  },
  computed:{
    ...mapGetters(['getUserInfo'])
  },
  components: {
    navv,
  },
  methods:{
    ...mapActions(['changeUserInfoAction']),
    logout(){
      this.changeUserInfoAction(null)
      this.$router.push('/login')
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-header {
  background: $threeBgColor;
}

.el-aside {
  background: $twoBgColor !important;
}
</style>
