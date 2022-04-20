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
        <el-table-column label="订单编号" align="center" prop="PNo" />
        <el-table-column label="商品名称" align="center" prop="goodsName" />
        <el-table-column label="采购公司" align="center" prop="goodsCompany" />
        <el-table-column label="来源地址" align="center" prop="goodsAddress" />
        <el-table-column label="商品分类" align="center" prop="goodsSort">
          <template slot-scope="{ row }">
            {{ SPFL[row.goodsSort] }}
          </template>
        </el-table-column>
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
        <el-table-column label="是否支付" align="center" prop="isPay">
          <template slot-scope="{ row }">
            <el-tag v-if="row.isPay" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" align="center" prop="isTrans">
          <template slot-scope="{ row }">
            <el-tag v-if="row.isTrans" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime">
          <template slot-scope="{ row }">
            {{ parseTime(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
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
  </div>
</template>

<script>
import { getPurchaseList, purchaseDelete } from "@/api/fresh/purchase";
import commonMixin from "@/views/mixin";
import PageOption from "./pageOption.vue";

export default {
  name: "Purchase",
  mixins: [commonMixin],
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
      getPurchaseList(this.queryParams).then((res) => {
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
      record.goodsAddress = record.goodsAddress.split(",");
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
        purchaseDelete({ PNo: record.PNo })
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
