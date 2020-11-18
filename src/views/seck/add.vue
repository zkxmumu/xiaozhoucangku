<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加活动' : '修改活动'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          prop="title"
          label="限时秒杀名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="timer"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          prop="first_cateid"
          label="一级分类："
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.first_cateid" @change="changeCate()">
            <el-option value label="请选择" disabled></el-option>
            <!-- 调取商品分类的列表接口 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="二级分类">
          <el-select v-model="form.second_cateid" @change="changeGoods()">
            <!-- 二级分类一定是根据一级分类选择之后的联动信息 -->
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="商品">
          <el-select v-model="form.goodsid">
            <!-- 二级分类一定是根据一级分类选择之后的联动信息 -->
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 状态 -->
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
import {
  getGoodsList,
  getSeckAdd,
  getSeckInfo,
  getSeckEdit,
} from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return { 
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      formLabelWidth: "120px",
      // 创建一个二级分类数组
      secondArr: [],
      // 创建一个商品数组
      goodsArr: [],
      timer: "",
      rules: {
        title: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
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
  mounted() {
     if (this.cateList.length == 0) {
      this.getCateList();
    }
  },
  methods: {
    changeCate(n) {
      let index = this.cateList.findIndex((item, i) => {
        console.log(item, i, "每一项changeCate");
        return this.form.first_cateid == item.id;
      });
      this.secondArr = this.cateList[index].children;
      if (!n) {
        // 将联动清空，改变一级时，二级处于清空状态
        this.form.second_cateid = "";
        this.form.goodsid = "";
      }
    },
    changeGoods(n) {
      getGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid
      }).then((res) => {
        if (res.data.code == 200) {
          console.log(this.form.first_cateid)
          console.log(this.form.second_cateid)
          // this.$message.success(res.data.msg);
          this.goodsArr = res.data.list;
          if (!n) {
            this.form.goodsid = "";
          }
        }
      });
    },
    // 商品

    reset() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.timer = "";
    },
    //   取消
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    ...mapActions({
      getSeckList: "seck/getSeckAction",
      getCateList: "cate/getCateListAction",
    }),
    // 添加
    add() {
      this.form.begintime = new Date(this.timer[0]).getTime();
      this.form.endtime = new Date(this.timer[1]).getTime();
     getSeckAdd(this.form).then(res => {
        if (res.data.code == 200) {
          console.log(this.form)
          this.$message.success(res.data.msg);
          //重新调取接口
          this.getSeckList();
          //关闭弹框
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 修改
    updata() {
      this.form.begintime = new Date(this.timer[0]).getTime();
      this.form.endtime = new Date(this.timer[1]).getTime();
      getSeckEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSeckList();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    look(id) {
      getSeckInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          //  取出list中的数据（menus）
          this.form = res.data.list;
          this.form.id = id;

          this.timer = [
            new Date(parseFloat(this.form.begintime)),
            new Date(parseFloat(this.form.endtime)),
          ];
          this.changeCate(true);
          this.changeGoods(true);
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      seckList: "seck/getSeckList",
      cateList: "cate/getCateList",
    }),
  },
};
</script>

<style lang="" scoped>
</style>
