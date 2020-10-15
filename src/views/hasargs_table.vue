<template>
  <el-container style="height: 100vh">
    <el-main>
      分类
      <el-select v-model="Article.sectionid" placeholder="请选择">
        <el-option key="all" label="全部" :value="null"> </el-option>
        <el-option
          v-for="item in types"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-table :data="Article.data">
        <el-table-column prop="id" label="编号" width="140"> </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              icon="el-icon-delete"
              type="danger"
              @click="del(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="j-a-c flex" style="margin: 20px 0">
        <el-pagination
          background
          :page-size="Article.pageSize"
          :current-page.sync="Article.pageIndex"
          layout="prev, pager, next"
          :total="Article.count"
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
  mixins: [tableMixin("Article")],
  watch: {
    "Article.sectionid"() {
      this.refreshArticleTable();
    },
  },
  data() {
    return {
      Article: {
        sectionid: null,
        a: 111,
      },
      types: [],
    };
  },
  methods: {
    async getArticleData(params) {
      let res = await axios.get("http://demo.simbajs.com:89/art/articlelist", {
        params,
      });
      return res;
    },
    async del(id) {
      await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });

      let res1 = await axios.post(
        "http://demo.simbajs.com:89/art/removearticle",
        {
          id,
        }
      );

      if (res1.data.success) {
        this.$notify({
          title: "删除成功",
          type: "success",
        });

        this.getArticleList();
      }
    },
    async getTypes() {
      let res = await axios.get("http://demo.simbajs.com:89/art/sectionlist");
      this.types = res.data;
    },
  },
  created() {
    this.getTypes();
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