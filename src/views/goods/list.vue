<template>
  <div>
    <el-table :data="goodsList" style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="90">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="90">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="90">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="90">
      </el-table-column>
      <el-table-column label="图片" prop="img">
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl+item.row.img" alt="">
          </div>
        </template>
      </el-table-column>

      <!-- 是否新品 -->
      <el-table-column label="是否新品" width='80'>
        <template slot-scope="item" >
           <div>
            <el-button
              type="primary"
              size="small"
              v-if="item.row.isnew == 1"
              plain
              >是</el-button
            >
            <el-button type="danger" size="small" v-else plain>否</el-button>
          </div>
        </template>
      </el-table-column>

      <!-- 是否热卖推荐 -->
      <el-table-column label="是否热卖推荐" width='120'>
        <template slot-scope="item" >
           <div>
            <el-button
              type="primary"
              size="small"
              v-if="item.row.ishot == 1"
              plain
              >是</el-button
            >
            <el-button type="danger" size="small" v-else plain>否</el-button>
          </div>
        </template>
      </el-table-column>

      <!-- 状态 -->
      <el-table-column label="状态" width='80'>
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

      <!-- 操作 -->
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
    <el-pagination
      class="fenye"
      :page-size="goodsSize"
      background
      layout="prev, pager, next"
      :total="goodsCount"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getGoodsDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getGoodsAction();
    this.getGoodsCount();
  },
  methods: {
    ...mapActions({
      getGoodsAction: "goods/getGoodsAction",
      getGoodsCount: "goods/getCountAction",
      changePage: "goods/changePageAction",
    }),
    del(id) {
      this.$confirm("确定要删除这一条数据吗？？？！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getGoodsDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新调取列表
              this.getGoodsAction();
              this.getGoodsCount();
              this.getGoodsList();
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

  computed: {
    ...mapGetters({
      goodsList: "goods/getGoodsList",
      goodsSize: "goods/getGoodsSize",
      goodsCount: "goods/getGoodsCount",
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
.img{
  width: 200px;
}
</style>
