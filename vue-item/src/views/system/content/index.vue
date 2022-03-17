<template>
  <div class="app-container">
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="mini" @click="handleAdd">添加</el-button>
    </div>

    <div>learn more for you</div>

    <el-table :data="contentList">
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="name" label="分类名称">
        <template slot-scope="scope">
          {{ scope.row.category ? scope.row.category.name : "" }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="username" label="作者">
        <template slot-scope="scope">
          {{ scope.row.user ? scope.row.user.username : "" }}
        </template>
      </el-table-column>
      <el-table-column prop="addTime" label="添加时间">
        <template slot-scope="scope">
          {{ parseTime(scope.row.addTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="views" label="阅读量" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row._id)"
            >删除</el-button
          >
          <el-button
            type="info"
            size="mini"
            @click="handleComment(scope.row._id)"
            >评论</el-button
          >
          <el-button type="info" size="mini" @click="handleDetail(scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pagenum"
      :limit.sync="queryParams.pagesize"
      @pagination="getInit"
    />

    <el-dialog
      :title="isAdd ? '添加内容' : '修改内容'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分类名称" prop="category">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option
              v-for="item in sortOptions"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="内容简介" prop="description">
          <el-input
            type="textarea"
            :rows="2"
            v-model="form.description"
          ></el-input>
        </el-form-item>

        <el-form-item label="文章内容" prop="content">
          <el-input type="textarea" :rows="2" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="文章评论"
      :visible.sync="comDialogVisible"
      width="30%"
      :before-close="handleComClose"
    >
      <el-form ref="cform" :model="cform" :rules="crules" label-width="80px">
        <el-form-item label="评论内容" prop="comment">
          <el-input
            type="textarea"
            :rows="2"
            v-model="cform.comment"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleComClose">取 消</el-button>
        <el-button type="primary" @click="handleComSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="文章详情"
      :visible.sync="descDialogVisible"
      width="50%"
      :before-close="handleDescClose"
    >
      <div>
        <el-row>
          <el-col>文章标题：{{ descForm.title }}</el-col>
          <el-col
            >文章分类：{{
              descForm.category ? descForm.category.name : ""
            }}</el-col
          >
          <el-col
            >文章作者：{{ descForm.user ? descForm.user.username : "" }}</el-col
          >
          <el-col>文章描述：{{ descForm.description }}</el-col>
          <el-col>文章内容：{{ descForm.content }}</el-col>
          <el-col>创建时间：{{ parseTime(descForm.addTime) }}</el-col>
          <el-col>文章评论：</el-col>
        </el-row>

        <el-table :data="descForm.comments">
          <el-table-column label="序号" type="index" width="50" />

          <el-table-column prop="username" label="评论者" />
          <el-table-column prop="postTime" label="评论时间">
            <template slot-scope="scope">
              {{ parseTime(scope.row.postTime) }}
            </template>
          </el-table-column>
          <el-table-column prop="comment" label="评论内容" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                @click="handleCommentDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDescClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getContents,
  contentAdd,
  contentEdit,
  contentDelete,
  contentComment,
  commentDelete,
} from "@/api/system/content";
import { getSorts } from "@/api/system/sort";

export default {
  name: "Content",
  data() {
    return {
      contentList: [],
      total: 0,
      queryParams: {
        pagenum: 1,
        pagesize: 2,
      },

      isAdd: false,
      dialogVisible: false,
      form: {},
      rules: {
        category: [
          { required: true, message: "分类名称不能为空", trigger: "trigger" },
        ],
        title: [
          { required: true, message: "文章标题不能为空", trigger: "blur" },
        ],
      },
      sortOptions: [],

      comDialogVisible: false,
      cform: {},
      crules: {
        comment: [
          { required: true, message: "评论内容不能为空", trigger: "blur" },
        ],
      },

      descDialogVisible: false,
      descForm: {},
    };
  },
  mounted() {
    this.getInit();
  },
  methods: {
    getInit() {
      getContents(this.queryParams)
        .then((res) => {
          this.contentList = res.data.records;
          this.total = res.data.total;
        })
        .catch((err) => console.log(err));
    },

    handleAdd() {
      this.handleSortOptions();
      this.isAdd = true;
      this.dialogVisible = true;
    },

    handleUpdate(record) {
      this.handleSortOptions();
      this.isAdd = false;
      this.dialogVisible = true;
      this.form = record;
    },

    handleSortOptions() {
      getSorts()
        .then((res) => {
          this.sortOptions = res.data.records;
        })
        .catch((err) => console.log(err));
    },

    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            contentAdd(this.form).then((res) => {
              this.$message.success(res.message);
              this.reset();
              this.getInit();
            });
          } else {
            contentEdit(this.form).then((res) => {
              this.$message.success(res.message);
              this.reset();
              this.getInit();
            });
          }
        }
      });
    },

    handleClose() {
      this.reset();
    },

    reset() {
      this.isAdd = false;
      this.dialogVisible = false;
      this.$refs.form.resetFields();
      this.getInit();
    },

    handleDelete(id) {
      this.$confirm("删除后不可恢复，确定要删除吗？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        customClass: "delete_icon",
        dangerouslyUseHTMLString: true,
      })
        .then(() => {
          contentDelete({ id: id }).then((res) => {
            this.$message.success(res.message);
            this.getInit();
          });
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },

    handleComment(id) {
      this.cform.id = id;
      this.comDialogVisible = true;
    },

    handleComSubmit() {
      this.$refs.cform.validate((valid) => {
        if (valid) {
          contentComment(this.cform)
            .then((res) => {
              this.$message.success(res.message);
              this.cReset();
              this.getInit();
            })
            .catch((err) => console.log(err));
        }
      });
    },

    handleComClose() {
      this.cReset();
    },

    cReset() {
      this.comDialogVisible = false;
      this.$refs.cform.resetFields();
      this.getInit();
    },

    handleDetail(record) {
      this.descDialogVisible = true;
      this.descForm = record;
    },

    handleDescClose() {
      this.descForm = {};
      this.descDialogVisible = false;
    },

    handleCommentDelete(record) {
      this.$confirm("删除后不可恢复，确定要删除吗？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        customClass: "delete_icon",
        dangerouslyUseHTMLString: true,
      })
        .then(() => {
          const params = {
            contentId: this.descForm._id,
            comment: record.comment,
          };
          commentDelete(params)
            .then((res) => {
              this.$message.success(res.message);
              this.descForm = res.data
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.el-row {
  .el-col {
    margin: 10px 0;
  }
}
</style>
