<template>
  <div>
    <el-table :data="specsList" style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column prop="attrs" label="规格属性" width="180">
        <template slot-scope="item">
          <div>
            <el-tag v-for="attrname in item.row.attrs" :key="attrname" type="success" >{{attrname}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
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
            <el-button type="primary" size="small" @click="edit(item1.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item1.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    
   <el-pagination class="fenye"
      :page-size="specsSize"
      background
      layout="prev, pager, next"
      :total="specsCount"
      @current-change="currentChange"
    >
   </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getSpecsDelete, getSpecsList} from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getSpecsAction();
    this.getSpecsCount();
    console.log(this.specsSize,'555555')
  },
  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
      specsCount: "specs/getSpecsCount",
      specsSize: "specs/getSpecsSize",
    }),
  },
  methods: {
    ...mapActions({
      getSpecsAction: "specs/getSpecsAction",
      getSpecsCount: "specs/getCountAction",
      changePage: "specs/changePageAction",
    }),
    del(id) {
      this.$confirm("确定要删除这一条数据吗？？？！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getSpecsDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getSpecsAction();
              this.getSpecsCount();
              this.getSpecsList();
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
    // 切换页码
    currentChange(e) {
      console.log(e, "当前");
      this.changePage(e);
    },
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
