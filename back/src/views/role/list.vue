<template>
  <div>
    <el-table :data="roleList" style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item1">
          <div>
            <el-button type="info"  size="small" @click="edit(item1.row.id)"
              plain >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item1.row.id)"
              plain >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {getRoleDelete} from '../../util/axios'
export default {
  data() {
    return {};
  },
  
  methods: {
    ...mapActions({
      getRoleAction: "role/getRoleAction",
    }),
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getRoleDelete({id}).then((res) => {
            if (res.data.code == 200) {
             this.$message.success(res.data.msg)
             this.getRoleAction()
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(id){
      this.$emit('edit',id)
    }
  },
  mounted() {
    this.getRoleAction();
  },
  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
    }),
  },
  components: {},
};
</script>

<style lang="" scoped>
</style>
