<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加管理员' : '修改管理员'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item prop="roleid" label="所属角色" :label-width="formLabelWidth">
          <el-select
            v-model="form.roleid"
            placeholder="请选择"
            
          >
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="username"
          label="管理员名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
import { getUserAdd, getUserInfo, getUserEdit } from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return {
      form: {
        roleid: "", 
        username: "", 
        password: "", 
        status: 1 
      },
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        roleid: [
          { required: true, message: "请输入密码", trigger: "blur" },
         
        ],
      },
    };
  },
  mounted() {
    console.log(this.addInfo, "addInfo");
    if (this.roleList.length == 0) {
      this.getRoleList();
    }
  },
  methods: {
    reset() {
      this.form = {
       roleid: "", 
        username: "", 
        password: "", 
        status: 1 
      };
    },
    //   取消
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    ...mapActions({
      getRoleList: "role/getRoleAction",
      getUserList: "user/getUserAction",
     getCountAction:'user/getCountAction',
    }),
    // 添加
    add() {
      getUserAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getUserList();
          this.getCountAction()
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 修改
    updata() {
      getUserEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getUserList();
          this.getCountAction();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    look(uid) {
      getUserInfo({ uid }).then((res) => {
        if (res.data.code == 200) {
          //  取出list中的数据（menus）
          this.form = res.data.list;
          this.form.uid = uid;
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
    }),
  },
};
</script>

<style lang="" scoped>
</style>
