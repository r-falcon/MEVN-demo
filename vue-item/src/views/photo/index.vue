<template>
  <div class="app-container">
    <h2>single</h2>
    <image-upload :limit="1" @success="handleSuccess" />
    <el-table :data="singleList" style="width: 100%; margin: 30px 0">
      <el-table-column label="序号" type="index" width="80" />
      <el-table-column prop="name" label="文件名称" />
      <el-table-column prop="url" label="文件一览">
        <template slot-scope="{ row }">
          <img :src="row.url" width="80" height="80" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="120">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            style="color: red"
            icon="el-icon-delete"
            @click="singleDelete(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <h2>multiple</h2>
    <image-upload />
  </div>
</template>

<script>
import ImageUpload from "@/components/ImageUpload/index";
import { getSingles, addSingle, deleteSingle } from "@/api/upload/single";

export default {
  name: "Photo",
  components: { ImageUpload },
  data() {
    return {
      id: "",
      singleList: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getSingles().then((res) => {
        this.id = res.data[0]._id;
        this.singleList = res.data[0].singleList;
      });
    },

    handleSuccess(fileList) {
      addSingle({
        fileList: fileList[0],
      }).then((res) => {
        this.getList();
        this.$message.success("添加成功");
      });
    },

    singleDelete(row) {
      console.log(row);
      deleteSingle({ id: this.id, url: row.url }).then((res) => {
        this.getList();
        this.$message.success("删除成功");
      });
    },
  },
};
</script>
