<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加会员' : '修改会员'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          prop="phone"
          label="手机号:"
          :label-width="formLabelWidth"

        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          prop="nickname"
          label="昵称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
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
        <el-button @click="updata" type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {  getMemberInfo, getMemberEdit } from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return {
      form: {
        uid:0,
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
      rules: {
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            min: 11,
            max: 20,
            message: "长度在 11 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    
  },
  methods: {
    reset() {
      this.form = {
         uid:0,
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    //   取消
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    ...mapActions({
      getMemberList: "member/getMemberAction",
    }),
   
    // 修改
    updata() {
      getMemberEdit(this.form).then((res) => {
        console.log(res,"res");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getMemberList();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    look(uid) {
      // console.log(uid,'look');
      getMemberInfo({ uid }).then((res) => {
        if (res.data.code == 200) {
          
          this.form = res.data.list;
         
          this.form.uid =uid;
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      memberList: "member/getMemberList",
    }),
  },
};
</script>

<style lang="" scoped>
</style>
