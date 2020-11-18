<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加规格' : '修改规格'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          prop="specsname"
          label="规格名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in arrAttr"
          :key="index"
          label="规格属性:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="item.value" autocomplete="off"></el-input>
          <el-button v-if="index == 0" @click="addAttr" type="primary"
            >新增规格属性</el-button
          >
          <el-button v-else @click="delAttr(item)" type="danger"
            >删除</el-button
          >
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
import { mapActions } from "vuex";
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return {
      // 规格属性
      arrAttr: [
        {
          value: "",
        },
      ],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      formLabelWidth: "120px",
      rules: {
        specsname: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    reset() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.arrAttr = [
        {
          value: "",
        },
      ];
    },
    // 添加规格属性
    addAttr() {
      if (this.arrAttr.length <= 3) {
        this.arrAttr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多只能添加3项！！！");
      }
    },
    // 删除规格属性
    delAttr(item) {
      var index = this.arrAttr.indexOf(item);
      if (index !== -1) {
        this.arrAttr.splice(index, 1);
      }
    },
    //   取消
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    ...mapActions({
      getSpecsList: "specs/getSpecsAction",
      getCountAction: "specs/getCountAction",
    }),
    // 添加
    add() {
      let newArr = this.arrAttr.map((item) => {
        return item.value;
      });

      this.form.attrs = newArr.join(",");

      getSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSpecsList();
          this.getCountAction();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 修改
    updata() {
       let newArr = this.arrAttr.map((item) => {
        return item.value;
      });
      this.form.attrs = newArr.join(",");
      // this.form.attrs = newArr.join(",");
      getSpecsEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSpecsList();
          this.getCountAction();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    look(id) {
      getSpecsInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          let data = res.data.list[0];
          this.form = data;
          data.attrs.map((item, index) => {
            // 第一项  if(index==0) 不判断，直接push，规格属性第一项没有，因为定义时是空，给他强制赋值，在向下
            console.log(item, "item");
            if (index == 0) {
              this.arrAttr[0].value = item;
            } else {
              this.arrAttr.push({
                value: item,
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
.el-input {
  width: 70%;
}
</style>
