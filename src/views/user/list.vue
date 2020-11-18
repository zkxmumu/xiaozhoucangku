<template>
  <div>
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="250">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180">
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="item">
          <div>
            <el-button
              type="primary"
              size="small"
              v-if="item.row.status == 1"
              plain
              >启用</el-button
            >
            <el-button type="danger" size="small" v-else plain>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item1">
          <div>
            <el-button type="primary" size="small" @click="edit(item1.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item1.row.uid)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="fenye"
      :page-size="userSize"
      background
      layout="prev, pager, next"
      :total="userCount"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getUserDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getUserAction();
    this.getUserCount();
  },
  methods: {
    ...mapActions({
      getUserAction: "user/getUserAction",
      getUserCount: "user/getCountAction",
      changePage: "user/changePageAction",
    }),
    del(uid) {
      this.$confirm("确定要删除这一条数据吗？？？！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除接口
          getUserDelete({ uid }).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新调取列表
              this.getUserAction();
              this.getUserCount()
        
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    edit(id) {
      this.$emit("edit", id);
    },
    // 切换页码
    currentChange(e) {
      console.log(e, "当前");
      this.changePage(e);
    },
  },
  
  computed: {
    ...mapGetters({
      userList: "user/getUserList",
      userSize: "user/getUserSize",
      userCount: "user/getUserCount",
    }),
  },
  components: {},
};
</script>

<style lang="" scoped>
.fenye {
  float: right;
  padding: 20px 0 0 0;
}
</style>
