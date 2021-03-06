<template>
  <el-dialog
    :title="isAdd ? '新增信息' : '修改信息'"
    :visible.sync="itemVisible"
    width="640px"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="用户" prop="username">
        <el-input v-model="form.username" :disabled="!isAdd" />
      </el-form-item>
      <el-form-item v-if="isAdd" label="密码" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item v-if="isAdd" label="重复密码" prop="password1">
        <el-input v-model="form.password1" type="password" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="是否管理员" prop="isAdmin">
        <el-switch v-model="form.isAdmin" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { userAdd, userEdit } from "@/api/system/user";
import { checkPhone, checkEmail } from "@/utils/ruoyi";

export default {
  props: {
    opt: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    let checkAccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else if (value.length < 5) {
        callback(new Error("用户名为5-20位"));
      } else callback();
    };

    let checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码为6-20位"));
      } else callback();
    };

    let checkMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入手机号"));
      } else if (value && !checkPhone(value)) {
        callback(new Error("手机号格式错误"));
      } else callback();
    };

    let checkMail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入邮箱"));
      } else if (value && !checkEmail(value)) {
        callback(new Error("邮箱格式错误"));
      } else callback();
    };

    let checkNotEqual = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请重复输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };

    return {
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
          {
            validator: checkAccount,
          },
        ],

        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            validator: checkPassword,
          },
        ],

        password1: [
          {
            required: true,
            message: "重复密码不能为空",
            trigger: "blur",
          },
          {
            validator: checkNotEqual,
          },
        ],

        phone: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur",
          },
          {
            validator: checkMobile,
          },
        ],

        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur",
          },
          {
            validator: checkMail,
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
          if (this.isAdd) {
            userAdd(this.form).then((res) => {
              this.$message.success("添加成功");
              this.reset();
              this.$emit("success");
            });
          } else {
            userEdit(this.form).then((res) => {
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
