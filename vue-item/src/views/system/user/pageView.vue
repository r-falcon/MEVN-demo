<template>
  <el-dialog
    title="详细信息"
    :visible.sync="itemVisible"
    width="640px"
    :before-close="handleClose"
  >
    <el-row :gutter="32">
      <el-col :span="12">用户：{{ form.username }}</el-col>
      <el-col :span="12">昵称：{{ form.nickname }}</el-col>
      <el-col :span="12">手机：{{ form.phone }}</el-col>
      <el-col :span="12">邮箱：{{ form.email }}</el-col>
      <el-col :span="12"
        >角色：{{ form.isAdmin ? "超级管理员" : "普通用户" }}</el-col
      >
      <el-col :span="12">
        启用状态：<el-switch v-model="form.enable" />
      </el-col>
    </el-row>
    <div style="display: flex; justify-content: center; padding: 30px 0 10px 0">
      <el-button type="primary" @click="handleClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: () => false,
    },
    form: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    itemVisible: {
      get() {
        return this.visible;
      },
      set() {},
    },
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.el-col {
  margin: 10px auto;
}
</style>
