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
        <el-table-column label="分类名称" align="center" prop="name" />
        <el-table-column label="分类描述" align="center" prop="desc" />
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
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
  </div>
</template>

<script>
import { getSorts, sortsDelete } from "@/api/article/sort";
import PageOption from "./pageOption.vue";

export default {
  name: "Category",
  components: {
    PageOption,
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
    };
  },
  mounted() {
    this.initList();
  },
  methods: {
    initList() {
      this.loading = true;
      getSorts(this.queryParams).then((res) => {
        this.loading = false;
        this.tableData = res.data.records;
        this.total = res.data.total;
      });
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
        sortsDelete({ id: record._id })
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
