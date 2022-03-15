<template>
  <div class="app-container">
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="mini" @click="handleAdd">添加</el-button>
    </div>

    <el-table :data="sortList">
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row._id)"
            >删除</el-button
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
      :title="isAdd ? '添加分类' : '修改分类'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSorts,sortAdd,sortEdit,sortDelete } from "@/api/system/sort";

export default {
  name: "Sort",
  data() {
    return {
      sortList: [],
      total: 0,
      queryParams: {
        pagenum: 1,
        pagesize: 2,
      },

      isAdd: false,
      dialogVisible: false,

      form: {},
      rules: {
        name: [
          { required: true, message: "分类名称不能为空", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getInit();
  },
  methods: {
    getInit() {
      getSorts(this.queryParams).then((res) => {
        this.sortList = res.data.records;
        this.total = res.data.total;
      });
    },

    handleAdd() {
      this.isAdd = true;
      this.dialogVisible = true;
    },

    handleUpdate(record) {
      this.isAdd = false 
      this.dialogVisible = true
      this.form = record
    },

    handleSubmit() {
      this.$refs.form.validate(valid => {
        if(valid){
          if(this.isAdd){
            sortAdd(this.form).then(res => {
               this.$message.success(res.message)
               this.reset()
               this.getInit()
            })
          }else{
            sortEdit(this.form).then(res => {
              this.$message.success(res.message)
              this.reset()
              this.getInit()
            })
          }
        }
      })
    },

    handleClose() {
      this.reset();
    },

    reset() {
      this.isAdd = false;
      this.dialogVisible = false;
      this.$refs.form.resetFields()
    },

    handleDelete(id) {
      this.$confirm('删除后不可恢复，确定要删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'delete_icon',
        dangerouslyUseHTMLString: true
      }).then(() => {
        sortDelete({id:id}).then(res => {
          this.$message.success(res.message)
          this.getInit()
        })
      }).catch((err) => {
        this.$message.error(err)
      })
    },
  },
};
</script>
