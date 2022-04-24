<template>
  <div class="app-container">
    <el-card>
      <div class="input_box">
        <div>
          <el-input
            placeholder="请输入搜索内容"
            class="input_con"
            clearable
            v-model="queryParams.query"
          />
          <el-button icon="el-icon-search" class="input_btn" @click="search" />
          <el-button
            style="margin-left: 10px"
            icon="el-icon-refresh"
            class="input_btn"
            @click="refresh"
          />
        </div>

        <el-button type="primary" @click="handleAdd"> + 新增 </el-button>
      </div>

      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column label="序号" align="center" type="index" />
        <el-table-column label="标题" align="center" prop="title" />
        <el-table-column label="分类" align="center" prop="">
          <template slot-scope="{ row }">
            {{ row.category.name }}
          </template>
        </el-table-column>
        <el-table-column label="作者" align="center" prop="">
          <template slot-scope="{ row }">
            {{ row.user.username }}
          </template>
        </el-table-column>
        <el-table-column label="描述" align="center" prop="description" />
        <el-table-column label="创建时间" align="center" prop="createTime">
          <template slot-scope="{ row }">
            {{ parseTime(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button type="text" icon="el-icon-view" @click="handleView(row)"
              >查看</el-button
            >
            <el-button
              v-hasRole="['admin']"
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(row)"
              >修改</el-button
            >
            <el-button
              v-hasRole="['admin']"
              type="text"
              style="color: red"
              icon="el-icon-delete"
              @click="handleDelete(row)"
              >删除</el-button
            >
            <el-button
              v-hasRole="['normal']"
              type="text"
              icon="el-icon-edit-outline"
              @click="handleComment(row)"
              >评论</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pagenum"
        :limit.sync="queryParams.pagesize"
        @pagination="initList"
      />
    </el-card>

    <page-option
      :opt="opt"
      @close="handleOptClose"
      @success="handleOptSuccess"
    />

    <page-view :visible="viewVisible" :form="form" @close="handleViewClose" />
  </div>
</template>

<script>
import { getContents, contentsDelete, commentAdd } from "@/api/article/content";
import PageOption from "./pageOption.vue";
import PageView from "./pageView.vue";

export default {
  name: "Content",
  components: {
    PageOption,
    PageView,
  },
  data() {
    return {
      loading: false,
      queryParams: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      tableData: [],
      total: 0,

      opt: {
        isAdd: false,
        visible: false,
        data: {},
      },

      viewVisible: false,
      commentVisible: false,
      form: {},
      comment: "",
    };
  },
  mounted() {
    this.initList();
  },
  methods: {
    initList() {
      this.loading = true;
      getContents(this.queryParams).then((res) => {
        console.log(res.data);
        this.loading = false;
        this.tableData = res.data.records;
        this.total = res.data.total;
      });
    },

    handleComment(record) {
      this.$prompt("请输入评论", `关于${record.title}的文章评论`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // inputPattern:'', //对应的校验正则
        // inputErrorMessage:'格式不正确' //错误处理提示
      }).then(({ value }) => {
        commentAdd({ id: record._id, comment: value }).then((res) => {
          this.$message.success("评论成功");
          this.initList();
        });
      });
    },

    handleView(record) {
      this.viewVisible = true;
      this.form = record;
    },

    handleViewClose() {
      this.viewVisible = false;
      this.form = {};
    },

    handleAdd() {
      this.opt.visible = true;
      this.opt.isAdd = true;
    },

    handleEdit(record) {
      this.opt.visible = true;
      this.opt.isAdd = false;
      this.opt.data = record;
    },

    handleOptSuccess() {
      this.initList();
      this.opt = {
        isAdd: false,
        visible: false,
        data: {},
      };
    },

    handleOptClose() {
      this.opt = {
        isAdd: false,
        visible: false,
        data: {},
      };
    },

    handleDelete(record) {
      this.$confirm("此操作将永久删除该条数据，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        contentsDelete({ id: record._id })
          .then((res) => {
            this.$message.success("删除成功");
            this.initList();
          })
          .catch((err) => {
            console.log(err);
            this.$message.error("删除失败");
          });
      });
    },

    search() {
      this.initList();
    },

    refresh() {
      this.queryParams = {
        query: "",
        pagenum: 1,
        pagesize: 10,
      };
      this.initList();
    },
  },
};
</script>

<style lang="scss" scoped>
.input_box {
  margin: 10px auto;
  display: flex;
  justify-content: space-between;

  .input_con {
    width: 300px;
    border-radius: 1px solid #ccc;
  }

  .input_btn {
    background: #f2f7f8;
    margin-left: -5px;
  }
}
</style>
