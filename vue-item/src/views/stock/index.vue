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
      </div>

      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column label="序号" align="center" type="index" />
        <el-table-column label="商品名称" align="center" prop="goodsName" />
        <el-table-column
          label="商品单价（元）"
          align="center"
          prop="goodsPrice"
        />
        <el-table-column
          label="商品数量（件）"
          align="center"
          prop="goodsAmount"
        />
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pagenum"
        :limit.sync="queryParams.pagesize"
        @pagination="initList"
      />
    </el-card>
  </div>
</template>

<script>
import { getStockList } from "@/api/fresh/stock";

export default {
  name: "Stock",
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
    };
  },
  mounted() {
    this.initList();
  },
  methods: {
    initList() {
      this.loading = true;
      getStockList(this.queryParams).then((res) => {
        this.loading = false;
        this.tableData = res.data.records;
        this.total = res.data.total;
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
