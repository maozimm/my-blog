<template>
  <div class="hotArticle">
    <div>
      <h1>{{ title }}</h1>
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
    <div class="block paginations" v-if="!recommendFlag">
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
import { getHotArticleReq, getRecommendReq } from '../../assets/api/index'
import router from '../../router'
export default {
  data() {
    return {
      total: null,
      articleList: [],
      current_page: 1,
      // 推荐文章标识符
      recommendFlag: false,
      title: '热门文章'
    }
  },
  methods: {
    async getHotArticle(pageNum) {
      const data = await getHotArticleReq(pageNum)
      this.articleList = data.data.article
      this.total = data.data.total
    },
    async getRecommendArticle() {
      const data = await getRecommendReq()
      this.articleList = data.data.article
    },
    // 分页的页数改变
    handleCurrentChange(val) {
      this.getHotArticle(val)
    },
    // 跳转详情页
    toArticleDetail(id) {
      router.push('/articleDetail/' + id)
    }
  },
  async created() {
    if (this.$route.name === 'recommendArticle') {
      this.recommendFlag = true
      this.title = '推荐文章'
      this.getRecommendArticle()
    } else {
      this.getHotArticle(this.current_page)
    }
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
