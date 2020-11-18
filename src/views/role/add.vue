<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加角色' : '修改角色'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          prop="rolename"
          label="角色名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限:" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            default-expand-all
            node-key="id"
            ref="tree"
            :props="{
              children: 'children',
              label: 'title'
            }"
             check-strictly
            show-checkbox
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="addInfo.isAdd"
          >添 加</el-button
        >
        <el-button v-else @click="updata" type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getRoleAdd, getRoleInfo, getRoleEdit } from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      formLabelWidth: "120px",
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    if (this.menuList.length == 0) {
      this.getMenuList();
    }
  },
  methods: {
    reset() {
      this.form = {
        rolename: "",
        status: 1,
      };
      // 树形特有方法 清空
       this.$refs.tree.setCheckedKeys([]);
    },
    //   取消
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
      getRoleList: "role/getRoleAction"
    }),
    // 添加
    add() {
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");

      getRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getRoleList();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 修改
    updata() {
          this.form.menus = this.$refs.tree.getCheckedKeys().join(",");

      getRoleEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getRoleList();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    look(id) {
      getRoleInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          //  取出list中的数据（menus）
          this.form = res.data.list;
          //  设置默认树形选中值 数组
          this.form.menus = this.$refs.tree.setCheckedKeys(
            this.form.menus.split(',')
          );
          this.form.id = id;
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
};
</script>

<style lang="" scoped>
</style>
