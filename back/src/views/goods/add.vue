<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品管理' : '修改商品管理'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
      @opened="createEditor"
    >
      <el-form ref="rules" :model="form" :rules="rules">
        <!--一级分类  -->
        <el-form-item
          prop="first_cateid"
          label="一级分类"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="changeCate(false)"
          >
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!--二级分类  -->
        <el-form-item
          prop="second_cateid"
          label="二级分类"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option value label="请选择" disabled></el-option>
            <el-option
              lable="请选择"
              v-for="item in catesecond"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 商品名称 -->
        <el-form-item
          prop="goodsname"
          label="商品名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 价格 -->
        <el-form-item
          prop="price"
          label="商品价格:"
          :label-width="formLabelWidth"
        >
          <el-input v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 市场价格 -->
        <el-form-item
          prop="market_price"
          label="市场价格:"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model.number="form.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- 图片 -->
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :auto-upload="false"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>

        <!-- 商品规格 -->
        <el-form-item
          prop="specsid"
          label="商品规格"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="changeSpecs(false)"
          >
            <el-option value label="请选择" disabled></el-option>
            <el-option
              lable="请选择"
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 规格属性 -->
        <el-form-item
          prop="specsattr"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in specssecond"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 是否新品 -->
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <!-- 是否热卖推荐 -->
        <el-form-item label="是否热卖推荐" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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

        <!-- 商品描述 -->
        <el-form-item label="商品描述:" :label-width="formLabelWidth">
          <!-- 这个标签中插入富文本编辑器 -->
          <div id="editor"></div>
        </el-form-item>
      </el-form>

      <!-- 操作 -->
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
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import {
  getGoodsAdd,
  getGoodsInfo,
  getGoodsEdit,
  getSpecsList,
} from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return {
      // 定义编译器
      editor: null,
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
        description: "",
      },
      formLabelWidth: "120px",
      dialogImageUrl: "",
      dialogVisible: false,
      imgUrl: "", //图片信息
      fileList: [],
      catesecond: [],
      specssecond: [],
      specsList: [],
      rules: {
        first_cateid: [
          { required: true, message: "请输入一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请输入二级分类", trigger: "blur" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        price: [
          { required: true, message: "请输入价格", trigger: "blur" },
          { type: "number", message: "价格必须为数字" },
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
          { type: "number", message: "市场价格必须为数字" },
        ],
        specsid: [{ required: true, message: "请输入编号", trigger: "blur" }],
        specsattr: [
          { required: true, message: "请输入规格属性", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    console.log(this.specsList, "15616");
    this.getCateList(), this.getSpecsList();
  },
  methods: {
    changeCate(n) {
      let index = this.cateList.findIndex((item, i) => {
        // console.log(item, i, "每一项changeCate");
        // 让n和id相等，找到children
        return this.form.first_cateid == item.id;
      });
      this.catesecond = this.cateList[index].children;
      if (!n) {
        // 将联动清空，改变一级时，二级处于清空状态
        this.form.second_cateid = "";
      }
      getSpecsList().then((res) => {
        this.specsList=res.data.list
      });
    },
    changeSpecs(n) {
      console.log(this.specsList);
      let index = this.specsList.findIndex((item, i) => {
        console.log(item, i, "每一项changeSpecs");
        // 让n和id相等，找到children
        return this.form.specsid == item.id;
      });

      this.specssecond = this.specsList[index].attrs;
      if (!n) {
        this.form.specsattr = [];
      }
    },
    // 图片
    onChange(file) {
      this.imgUrl = file.raw;
    },

    onExceed(file) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },

    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    onRemove(file, fileList) {},

    reset() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
        description: "",
      };
      this.fileList = [];
      this.catesecond = [];
      this.specssecond = [];
      // 清空规则验证
      this.$refs["rules"].resetFields();
    },
    //   取消
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    ...mapActions({
      getGoodsList: "goods/getGoodsAction",
      getCateList: "cate/getCateListAction",
      getSpecsList: "specs/getSpecsAction",
      getCountAction: "goods/getCountAction",
    }),

    // 富文本
    createEditor() {
      //实例化
      this.editor = new E("#editor");
      this.editor.create();
      // 设置内容,和表单产生联系
      this.editor.txt.html(this.form.description);
    },

    // 添加
    add() {
      this.form.specsattr = this.form.specsattr
        ? this.form.specsattr.join(",")
        : "";
      // 重新获取图片地址
      this.form.img = this.imgUrl;
      // 添加设置的描述内容
      this.form.description = this.editor.txt.html();
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }

      getGoodsAdd(file).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);

          this.getGoodsList();

          this.getCountAction();

          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 修改
    updata() {
      this.form.specsattr = this.form.specsattr
        ? this.form.specsattr.join(",")
        : "";
      this.form.img = this.imgUrl;
      let data = this.form;

      // console.log(this.form, "this.form");
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }

      this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;

      getGoodsEdit(file).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getGoodsList();
          this.getCountAction();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    look(id) {
      getGoodsInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          //  取出list中的数据（menus）
          let data = res.data.list;
          this.form = data;
          this.form.id = id;
          // 显示图片，打开弹框
          this.fileList = this.form.img
            ? [{ url: this.$imgUrl + this.form.img }]
            : [];

          // 规格属性，进行数据二次整合
          this.form.specsattr = this.form.specsattr
            ? this.form.specsattr.split(",")
            : [];

          //重新调取change事件
          this.changeCate(true);
          //防止 规格属性概率问题
          this.changeSpecs(true);
        }
      });
    },
  },

  computed: {
    ...mapGetters({
      goodsList: "goods/getGoodsList",
      cateList: "cate/getCateList",
     
    }),
  },
};
</script>

<style lang="" scoped>
</style>
