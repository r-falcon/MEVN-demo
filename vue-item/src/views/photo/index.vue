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
    <image-upload :limit="2" @success="handleMultiple" />
    <el-table :data="multipleList" style="width: 100%; margin: 30px 0">
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
            @click="multipleDelete(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ImageUpload from "@/components/ImageUpload/index";
import { getSingles, addSingle, deleteSingle } from "@/api/upload/single";
import {
  getMultiples,
  addMultiple,
  deleteMultiple,
} from "@/api/upload/multiple";

export default {
  name: "Photo",
  components: { ImageUpload },
  data() {
    return {
      id: "",
      mid: "",
      singleList: [],
      multipleList: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getSingles().then((res) => {
        if (res.data[0] && res.data[0]._id) {
          this.id = res.data[0]._id;
        }
        this.singleList = res.data[0].singleList;
      });

      getMultiples().then((res) => {
        if (res.data[0] && res.data[0]._id) {
          this.mid = res.data[0]._id;
        }
        this.multipleList = res.data[0].multipleList;
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
      deleteSingle({ id: this.id, url: row.url }).then((res) => {
        this.getList();
        this.$message.success("删除成功");
      });
    },

    handleMultiple(fileList) {
      console.log(111);
      addMultiple({
        fileList: fileList,
      }).then((res) => {
        this.getList();
        this.$message.success("添加成功");
      });
    },

    multipleDelete(row) {
      deleteMultiple({ id: this.mid, url: row.url }).then((res) => {
        this.getList();
        this.$message.success("删除成功");
      });
    },
  },
};
</script>
