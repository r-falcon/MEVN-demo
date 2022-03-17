<template>
  <div class="app-container">
    <el-table :data="userList">
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="isAdmin" label="是否管理员">
        <template slot-scope="scope">
          {{ scope.row.isAdmin === true ? "是" : "否" }}
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
  </div>
</template>

<script>
import { getUsers } from "@/api/system/user";

export default {
  name: "User",
  data() {
    return {
      userList: [],
      total: 0,
      queryParams: {
        pagenum: 1,
        pagesize: 2,
      },
    };
  },
  mounted() {
    this.getInit();
  },
  methods: {
    getInit() {
      getUsers(this.queryParams).then((res) => {
        this.userList = res.data.records;
        this.total = res.data.total;
      });
    },
  },
};
</script>
