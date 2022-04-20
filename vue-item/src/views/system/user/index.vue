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

        <el-button type="primary" @click="handleAdd">+ 新增</el-button>
      </div>

      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column label="序号" align="center" type="index" />
        <el-table-column label="用户" align="center" prop="username" />
        <el-table-column label="昵称" align="center" prop="nickname" />
        <el-table-column label="手机" align="center" prop="phone" />
        <el-table-column label="邮箱" align="center" prop="email" />
        <el-table-column label="角色" align="center" prop="isAdmin">
          <template slot-scope="{ row }">
            <el-tag v-if="row.isAdmin" type="success">超级管理员</el-tag>
            <el-tag v-else>普通用户</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="启用状态" align="center" prop="enable">
          <template slot-scope="{ row }">
            <el-switch v-model="row.enable" @change="handleChange(row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="360px">
          <template slot-scope="{ row }">
            <el-button type="text" icon="el-icon-lock" @click="resetPwd(row)"
              >重置密码</el-button
            >
            <el-button type="text" icon="el-icon-view" @click="handleView(row)"
              >查看</el-button
            >
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(row)"
              >修改</el-button
            >
            <el-button
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

    <page-view :visible="viewVisible" :form="form" @close="handleViewClose" />
  </div>
</template>

<script>
import {
  getUserList,
  userDelete,
  pwdReset,
  userChange,
} from "@/api/system/user";
import PageOption from "./pageOption.vue";
import PageView from "./pageView.vue";

export default {
  name: "User",
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
      form: {},
    };
  },
  mounted() {
    this.initList();
  },
  methods: {
    initList() {
      this.loading = true;
      getUserList(this.queryParams).then((res) => {
        this.loading = false;
        this.tableData = res.data.records;
        this.total = res.data.total;
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
        userDelete({ id: record._id })
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

    resetPwd(record) {
      this.$confirm("确定将密码重置为 123456 吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        pwdReset({ id: record._id })
          .then((res) => {
            this.$message.success("重置成功");
            this.initList();
          })
          .catch((err) => {
            console.log(err);
            this.$message.error("重置失败");
          });
      });
    },

    handleChange(record) {
      userChange({ id: record._id, enable: record.enable })
        .then((res) => {
          this.$message.success("状态修改成功");
          this.initList();
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("状态修改失败");
        });
    },

    search() {
      console.log(this.queryParams);
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
