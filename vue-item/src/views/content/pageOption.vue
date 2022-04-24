<template>
  <el-dialog
    :title="isAdd ? '新增信息' : '修改信息'"
    :visible.sync="itemVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="分类" prop="category">
            <el-select v-model="form.category" placeholder="请选择">
              <el-option
                v-for="item in sortOptions"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" v-model="form.description" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="内容" prop="content">
            <el-input type="textarea" v-model="form.content" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { contentsAdd, contentsEdit } from "@/api/article/content";
import { getSorts } from "@/api/article/sort";

export default {
  props: {
    opt: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      rules: {
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur",
          },
        ],

        category: [
          {
            required: true,
            message: "分类不能为空",
            trigger: "change",
          },
        ],
      },

      sortOptions: [],
    };
  },
  computed: {
    itemVisible: {
      get() {
        return this.opt.visible;
      },
      set() {},
    },
    isAdd: {
      get() {
        return this.opt.isAdd;
      },
      set() {},
    },
    form: {
      get() {
        return this.opt.data;
      },
      set(val) {
        console.log("set", val);
      },
    },
  },
  mounted() {
    getSorts().then((res) => {
      this.sortOptions = res.data.records;
    });
  },
  methods: {
    handleClose() {
      this.reset();
      this.$emit("close");
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            contentsAdd(this.form).then((res) => {
              this.$message.success("添加成功");
              this.reset();
              this.$emit("success");
            });
          } else {
            contentsEdit(this.form).then((res) => {
              this.$message.success("修改成功");
              this.reset();
              this.$emit("success");
            });
          }
        }
      });
    },
    reset() {
      this.resetForm("form");
      this.form = {};
    },
  },
};
</script>
