<template>
  <el-dialog
    :title="isAdd ? '新增信息' : '修改信息'"
    :visible.sync="itemVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="订单编号" prop="PNo">
            <el-input v-model="form.PNo" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="商品名称" prop="goodsName">
            <el-input v-model="form.goodsName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购公司" prop="goodsCompany">
            <el-input v-model="form.goodsCompany" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来源地址" prop="goodsAddress">
            <el-cascader v-model="form.goodsAddress" :options="cityData" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品分类" prop="goodsSort">
            <el-select v-model="form.goodsSort" placeholder="请选择">
              <el-option
                v-for="item in goodsSort"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品单价（元）" prop="goodsPrice">
            <el-input-number
              v-model="form.goodsPrice"
              :precision="2"
              :min="0"
              :max="9999"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品数量（件）" prop="goodsAmount">
            <el-input-number
              v-model="form.goodsAmount"
              :precision="0"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否支付" prop="isPay">
            <el-switch v-model="form.isPay" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否发货" prop="isTrans">
            <el-switch v-model="form.isTrans" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { purchaseAdd, purchaseEdit } from "@/api/fresh/purchase";
import commonMixin from "@/views/mixin";
import cityData from "@/assets/citydata.js";

export default {
  props: {
    opt: {
      type: Object,
      default: () => {},
    },
  },
  mixins: [commonMixin],
  data() {
    return {
      cityData,
      rules: {
        PNo: [
          {
            required: true,
            message: "订单编号不能为空",
            trigger: "blur",
          },
        ],
        goodsName: [
          {
            required: true,
            message: "商品名称不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    itemVisible: {
      get() {
        return this.opt.visible;
      },
      set() {},
    },
    isAdd: {
      get() {
        return this.opt.isAdd;
      },
      set() {},
    },
    form: {
      get() {
        return this.opt.data;
      },
      set(val) {
        console.log("set", val);
      },
    },
  },
  methods: {
    handleClose() {
      this.reset();
      this.$emit("close");
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.goodsAddress) {
            this.form.goodsAddress = this.form.goodsAddress.join(",");
          }
          if (this.isAdd) {
            purchaseAdd(this.form).then((res) => {
              this.$message.success("添加成功");
              this.reset();
              this.$emit("success");
            });
          } else {
            purchaseEdit(this.form).then((res) => {
              this.$message.success("修改成功");
              this.reset();
              this.$emit("success");
            });
          }
        }
      });
    },
    reset() {
      this.resetForm("form");
      this.form = {};
    },
  },
};
</script>
