<template>
  <el-dialog
    title="详细信息"
    :visible.sync="itemVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-row :gutter="32">
      <el-col :span="12">标题：{{ form.title }}</el-col>
      <el-col :span="12" v-if="form.user"
        >作者：{{ form.user.username }}</el-col
      >
      <el-col :span="12" v-if="form.category"
        >分类：{{ form.category.name }}</el-col
      >
      <el-col :span="12">创建时间：{{ parseTime(form.createTime) }}</el-col>
      <el-col :span="24">描述：{{ form.description }}</el-col>
      <el-col :span="24">内容：{{ form.content }}</el-col>
      <el-col :span="24"
        >评论：{{
          form.comments && form.comments.length == 0 ? "暂无" : null
        }}</el-col
      >
    </el-row>

    <el-table
      v-if="form.comments && form.comments.length > 0"
      :data="form.comments"
      style="width: 100%"
    >
      <el-table-column label="序号" align="center" type="index" />
      <el-table-column label="评论者" align="center" prop="user" />
      <el-table-column label="评论内容" align="center" prop="comment" />
      <el-table-column label="评论时间" align="center" prop="createTime">
        <template slot-scope="{ row }">
          {{ parseTime(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button
            v-hasRole="['admin']"
            type="text"
            style="color: red"
            icon="el-icon-delete"
            @click="handleDelete(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex; justify-content: center; padding: 30px 0 10px 0">
      <el-button type="primary" @click="handleClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { commentDelete } from "@/api/article/content";

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

    handleDelete(record) {
      this.$confirm("此操作将永久删除该条数据，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        commentDelete({ id: this.form._id, commentId: record.id })
          .then((res) => {
            this.$message.success("删除成功");
            this.$parent.initList();
            this.$emit("close");
          })
          .catch((err) => {
            console.log(err);
            this.$message.error("删除失败");
          });
      });
    },
  },
};
</script>

<style scoped>
.el-col {
  margin: 10px auto;
}
</style>
