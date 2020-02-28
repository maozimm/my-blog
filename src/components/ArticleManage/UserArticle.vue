<template>
  <div class="hotArticle">
    <div>
      <h1>文章列表</h1>
    </div>
    <span v-if="articleList.length === 0">你还没有发表任何文章</span>
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
        <a
          href="javascript:void(0)"
          @click="toModifyArticle(item._id)"
          style="margin-left:20px"
          >修改文章>>></a
        >
        <a
          href="javascript:void(0)"
          @click="deleteArticle(item._id)"
          style="margin-left:20px"
          >删除文章>>></a
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
          <span>状态: {{ item.state === 1 ? '发布' : '草稿' }}</span>
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
import { getUserArticleReq, deleteArticleReq } from '../../assets/api/index'
import router from '../../router'
export default {
  data() {
    return {
      total: null,
      articleList: [],
      current_page: 1
    }
  },
  methods: {
    async getHotArticle(pageNum) {},
    // 分页的页数改变
    handleCurrentChange(val) {
      this.getUserArticle(sessionStorage.getItem('userId'), val)
    },
    // 跳转详情页
    toArticleDetail(id) {
      router.push('/articleDetail/' + id)
    },
    // 跳转修改文章
    toModifyArticle(id) {
      router.push('/userModifyArticle/' + id)
    },
    // 删除文章
    async deleteArticle(id) {
      const result = await this.$confirm(
        '此操作将永久删除该文章, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => {
        return err
      })
      if (result === 'confirm') {
        await deleteArticleReq(id)
        this.$message.success('删除文章成功')
        this.getUserArticle(sessionStorage.getItem('userId'), this.current_page)
      } else {
        this.$message.info('已取消删除')
      }
    },
    async getUserArticle(userId, pageNum) {
      const res = await getUserArticleReq(userId, pageNum)
      this.total = res.data.total
      this.articleList = res.data.article
    }
  },
  async created() {
    this.getUserArticle(sessionStorage.getItem('userId'), this.current_page)
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
  right: 350px;
}
</style>
