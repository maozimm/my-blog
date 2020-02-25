<template>
  <div class="hotArticle">
    <div><h1>热门文章</h1></div>
    <div class="articleList" v-for="(item, index) in articleList" :key="index">
      <div class="thumbnail">
        <img :src="item.thumbnail" alt="" width="100px" />
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current_page"
        :page-sizes="[5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getHotArticleReq } from '../../assets/api/index'
import router from '../../router'
export default {
  data() {
    return {
      total: null,
      articleList: [],
      current_page: 1,
      current_size: 5
    }
  },
  methods: {
    async getHotArticle(pageNum, pageSize) {
      const data = await getHotArticleReq(pageNum, pageSize)
      this.articleList = data.data.article
      this.total = data.data.total
      console.log(data)
    },
    // 分页的页数条数改变
    handleSizeChange(val) {
      this.current_size = val
      this.getHotArticle(this.current_page, this.current_size)
    },
    // 分页的页数改变
    handleCurrentChange(val) {
      this.current_page = val
      this.getHotArticle(this.current_page, this.current_size)
    },
    // 跳转详情页
    toArticleDetail(id) {
      router.push('/articleDetail/' + id)
    }
  },
  created() {
    this.getHotArticle(this.current_page, this.current_size)
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
</style>
