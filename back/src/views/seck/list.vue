<template>
  <div>
    <el-table :data="seckList" style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180">
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
            <el-button
              type="info"
              size="small"
              @click="edit(item1.row.id)"
              plain
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="del(item1.row.id)"
              plain
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getSeckDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.getSeckAction())
    this.getSeckAction()
  },
  methods: {
    ...mapActions({
      getSeckAction: "seck/getSeckAction",
    }),
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getSeckDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              
              this.$message.success(res.data.msg);
              this.getSeckAction();
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
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.getSeckAction();
  },
  computed: {
    ...mapGetters({
      seckList: "seck/getSeckList",
    }),
  },
  components: {},
};
</script>

<style lang="" scoped>
</style>
