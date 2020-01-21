<template>
  <div class="articleList">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="title">
        <h1>所有文章</h1>
        <el-button size="mini" type="info">写文章</el-button>
      </div>
      <div class="search">
        <el-select v-model="category" placeholder="所有分类" size="mini">
          <el-option
            v-for="item in categoryOptions"
            :key="item._id"
            :label="item.title"
            :value="item.title"
          >
          </el-option>
        </el-select>
        <el-select v-model="state" placeholder="所有状态" size="mini">
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button size="mini">筛选</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column
          prop="thumbnail"
          label="缩略图"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="250"
        ></el-table-column>
        <el-table-column
          prop="content"
          label="内容"
          width="300"
        ></el-table-column>
        <el-table-column
          prop="author.nickName"
          label="创建人"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="category.title"
          label="文章分类"
          width="150"
        ></el-table-column>
        <el-table-column prop="createAt" label="创建时间" width="200"
          ><template scope="scope">
            <span>{{
              scope.row.createAt | moment('YYYY-MM-DD HH:mm:ss')
            }}</span>
          </template></el-table-column
        >
        <el-table-column label="状态" width="150" prop="state">
          <template scope="scope">
            <el-tag v-if="scope.row.state === 0" type="danger">草稿</el-tag>
            <el-tag type="success" v-else>发布</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >修改</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteArtcle(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getCategoriesReq, getArticleReq } from '../../assets/api/index'
export default {
  data() {
    return {
      tableData: [],
      category: '',
      state: '',
      categoryOptions: [],
      stateOptions: [
        { label: '草稿', value: 0 },
        { label: '已发布', value: 1 }
      ]
    }
  },
  methods: {
    deleteArtcle() {}
  },
  async created() {
    const res = await getCategoriesReq()
    this.categoryOptions = res.data.category
    const data = await getArticleReq()
    this.tableData = data.data.article
    console.log(this.tableData)
  }
}
</script>
<style scoped>
.el-breadcrumb {
  font-size: 12px;
  margin-bottom: 15px;
}
.el-table {
  margin-top: 20px;
}
.paginations {
  margin-top: 20px;
}
.title h1 {
  display: inline-block;
  font-size: 20px;
  /* color: #333; */
  font-weight: 400;
}
.title .el-button {
  margin-left: 10px;
  padding-bottom: 5px;
}
.search {
  margin-top: 10px;
}
.search .el-select {
  width: 100px;
  margin-right: 10px;
}
</style>
