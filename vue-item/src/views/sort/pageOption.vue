<template>
  <el-dialog
    :title="isAdd ? '新增信息' : '修改信息'"
    :visible.sync="itemVisible"
    width="570px"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="分类描述" prop="desc">
        <el-input v-model="form.desc" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { sortsAdd, sortsEdit } from "@/api/article/sort";

export default {
  props: {
    opt: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: "分类名称不能为空",
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
          if (this.isAdd) {
            sortsAdd(this.form).then((res) => {
              this.$message.success("添加成功");
              this.reset();
              this.$emit("success");
            });
          } else {
            sortsEdit(this.form).then((res) => {
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
