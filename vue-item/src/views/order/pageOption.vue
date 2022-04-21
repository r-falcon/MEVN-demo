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
          <el-form-item label="订单编号" prop="ONo">
            <el-input :disabled="!isAdd" v-model="form.ONo" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品名称" prop="goodsName">
            <el-input :disabled="!isAdd" v-model="form.goodsName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品分类" prop="goodsSort">
            <el-select
              :disabled="!isAdd"
              v-model="form.goodsSort"
              placeholder="请选择"
            >
              <el-option
                v-for="item in goodsSort"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购单价（元）" prop="goodsPrice">
            <el-input-number
              v-model="form.goodsPrice"
              :disabled="!isAdd"
              :precision="2"
              :min="0"
              :max="9999"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="购买单价（元）" prop="buyPrice">
            <el-input-number
              v-model="form.buyPrice"
              :disabled="!isAdd"
              :precision="2"
              :min="0"
              :max="9999"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="购买数量（件）" prop="buyAmount">
            <el-input-number
              v-model="form.buyAmount"
              :disabled="!isAdd"
              :precision="0"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="购买者" prop="buyer">
            <el-input v-model="form.buyer" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收货地址" prop="buyerAddress">
            <el-cascader v-model="form.buyerAddress" :options="cityData" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机" prop="buyerPhone">
            <el-input v-model="form.buyerPhone" />
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
import { orderAdd, orderEdit } from "@/api/fresh/order";
import commonMixin from "@/views/mixin";
import cityData from "@/assets/citydata.js";
import { checkPhone } from "@/utils/ruoyi";

export default {
  props: {
    opt: {
      type: Object,
      default: () => {},
    },
  },
  mixins: [commonMixin],
  data() {
    let checkMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入手机号"));
      } else if (value && !checkPhone(value)) {
        callback(new Error("手机号格式错误"));
      } else callback();
    };
    return {
      cityData,
      rules: {
        ONo: [
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

        goodsSort: [
          {
            required: true,
            message: "商品分类不能为空",
            trigger: "change",
          },
        ],

        goodsPrice: [
          {
            required: true,
            message: "采购单价不能为空",
            trigger: "blur",
          },
        ],

        buyPrice: [
          {
            required: true,
            message: "购买单价不能为空",
            trigger: "blur",
          },
        ],

        buyAmount: [
          {
            required: true,
            message: "采购数量不能为空",
            trigger: "blur",
          },
        ],

        buyer: [
          {
            required: true,
            message: "购买者不能为空",
            trigger: "blur",
          },
        ],

        buyerPhone: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur",
          },
          {
            validator: checkMobile,
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
            this.form.buyerAddress = this.form.buyerAddress.join(",");
          }
          if (this.isAdd) {
            orderAdd(this.form).then((res) => {
              this.$message.success("添加成功");
              this.reset();
              this.$emit("success");
            });
          } else {
            orderEdit(this.form).then((res) => {
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
