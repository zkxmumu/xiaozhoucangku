<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="closed"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="title"
          label="菜单名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="上级菜单" :label-width="formLabelWidth">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            @change="changeMenu"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
          v-if="form.type === 1"
        >
          <el-select v-model="form.icon" placeholder="请选择">
            <!-- 下拉框循环我的菜单列表 -->
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <!-- 下拉框循环我的菜单列表 -->
            <el-option
              v-for="item in indexRouter"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
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
        <el-button
          type="primary"
          @click="add('formDialog')"
          v-if="addInfo.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="updata('formDialog')" v-else
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getMenuAdd, getMenuEdit, getMenuInfo } from "../../util/axios";
import { indexRouter } from "../../router";
export default {
  props: ["addInfo"],
  data() {
    return {
      form: {
        title: "",
        pid: 0,
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      formLabelWidth: "120px",
      indexRouter: indexRouter,
      iconList: [
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-goods",
        "el-icon-menu",
      ],
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 3, max:20 , message: "长度在 3 到 20 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
      },
    };
  },
  methods: {
    closed() {
      this.cancel();
    },
    reset() {
      this.form = {
        title: "",
        pid: 0,
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    cancel() {
      this.$emit("cancel", false);
      this.reset()
    },
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getMenuAdd(this.form).then((res) => {
            console.log(res, "123");
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMenuList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
      // console.log(this.form);
    },
    updata(formName)  {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getMenuEdit(this.form).then((res) => {
            console.log(res, "123");
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMenuList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
    changeMenu() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    look(id) {
      // console.log(id,'形参')
      //调取查看列表
      getMenuInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // 没有id创建id
          this.form.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  components: {},
};
</script>

<style lang="" scoped>
</style>
