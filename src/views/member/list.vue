<template>
  <div>
    <el-table :data="memberList" style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>

      <el-table-column prop="phone" label="手机号" width="180">
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
              @click="edit(item1.row.uid)"
              plain
              >编辑</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {getMemberList} from "../../util/axios"
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberAction",
    }),

    edit(uid) {
      this.$emit("edit", uid);
    },
  },
  mounted() {
    this.getMemberList();
  },
  computed: {
    ...mapGetters({
      memberList: "member/getMemberList",
    }),
  },
  components: {},
};
</script>

<style lang="" scoped>
</style>
