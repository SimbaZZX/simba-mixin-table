<template>
  <el-container style="height: 100vh">
    <el-main>
      <el-table :data="Test.data">
        <el-table-column prop="id" label="编号" width="140"> </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
      </el-table>
      <div class="j-a-c flex" style="margin: 20px 0">
        <el-pagination
          background
          :page-size="Test.pageSize"
          :current-page.sync="Test.pageIndex"
          layout="prev, pager, next"
          :total="Test.count"
        >
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import tableMixin from "@/mixin/tableMixin";
export default {
  mixins: [tableMixin("Test")],
  methods: {
    getTestData(params) {
      return axios.get("http://demo.simbajs.com:89/art/articlelist", {
        params,
      });
    },
  },
};
</script>

<style>
.el-header {
  background-color: #5b5d61;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>