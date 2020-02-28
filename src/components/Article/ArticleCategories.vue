<template>
  <div class="hotArticle">
    <div>
      <h1>分类文章</h1>
    </div>
    <div class="search">
      <el-select v-model="category" placeholder="所有分类" size="mini">
        <el-option
          v-for="item in categoryOptions"
          :key="item._id"
          :label="item.title"
          :value="item._id"
        >
        </el-option>
      </el-select>
      <el-button size="mini" @click="search">筛选</el-button>
    </div>
    <div class="articleList" v-for="(item, index) in articleList" :key="index">
      <div class="thumbnail">
        <img :src="item.thumbnail" alt="" width="100px" height="100px" />
      </div>
      <div class="title">
        <span>{{ item.title }}</span>
      </div>
      <div class="content">
        <p>{{ item.abstract }}</p>
        <a href="javascript:void(0)" @click="toArticleDetail(item._id)"
          >阅读更多>>></a
        >
      </div>
      <div class="right">
        <div class="author">作者: {{ item.author.nickName }}</div>
        <span
          >发布时间: {{ item.createTime | moment('YYYY-MM-DD HH:mm:ss') }}</span
        >
        <div class="meta">
          <span>点赞数: {{ item.meta.likes }}</span>
          <span>评论数: {{ item.meta.comments }}</span>
          <span>浏览数: {{ item.meta.views }}</span>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="block paginations">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="current_page"
        :page-size="5"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getCategoriesReq,
  getCategoriesArticleReq
} from '../../assets/api/index'
import router from '../../router'
export default {
  data() {
    return {
      total: null,
      articleList: [],
      current_page: 1,
      categoryOptions: [],
      category: ''
    }
  },
  methods: {
    async getHotArticle(pageNum) {},
    // 分页的页数改变
    handleCurrentChange(val) {
      this.getCategoryArticle(this.category, val)
    },
    // 跳转详情页
    toArticleDetail(id) {
      router.push('/articleDetail/' + id)
    },
    async getCategoryArticle(category, pageNum) {
      const data = await getCategoriesArticleReq(category, pageNum)
      this.articleList = data.data.article
      this.total = data.data.total
    },
    search() {
      this.getCategoryArticle(this.category, this.current_page)
    }
  },
  async created() {
    const res = await getCategoriesReq()
    this.categoryOptions = res.data.category
    this.categoryOptions.unshift({ _id: '', title: '所有分类' })
    this.getCategoryArticle(this.category, this.current_page)
  }
}
</script>
<style scoped>
.hotArticle {
  height: 100%;
  /* overflow: hidden; */
}
.articleList {
  width: 90%;
  position: relative;
  margin-top: 10px;
  height: 150px;
  border-bottom: 1px solid #ccc;
}
.title {
  margin-left: 10px;
  padding-top: 10px;
}
.title span {
  display: block;
  font-size: 20px;
}
.content {
  margin-left: 10px;
  width: 1200px;
}
.content p {
  line-height: 25px;
}
.content a {
  line-height: 25px;
  text-decoration: none;
  color: #333;
}
.right {
  top: 20px;
  right: 20px;
  position: absolute;
}
.right .author {
  margin-bottom: 10px;
}
.right .meta {
  margin-top: 10px;
}
.right .meta span {
  margin-right: 10px;
}
.paginations {
  margin-top: 10px;
  margin-bottom: 50px;
}
.thumbnail {
  position: absolute;
  top: 20px;
  right: 300px;
}
.search {
  margin-top: 10px;
}
.search .el-select {
  width: 100px;
  margin-right: 10px;
}
</style>
