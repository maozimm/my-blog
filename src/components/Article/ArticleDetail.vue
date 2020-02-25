<template>
  <div class="articleDetail">
    <div class="middle">
      <div class="title">
        <span>{{ articleDetail.title }}</span>
      </div>
      <div class="detail">
        <span class="time">发表时间： {{ articleDetail.createAt }}</span>
        <span class="author" v-if="articleDetail.author"
          >作者：{{ articleDetail.author.nickName }}</span
        >
        <span class="likes" v-if="articleDetail.meta"
          >点赞数：{{ articleDetail.meta.likes }}</span
        >
        <span class="comments" v-if="articleDetail.meta"
          >评论数：{{ articleDetail.meta.comments }}</span
        >
        <span class="views" v-if="articleDetail.meta"
          >浏览数：{{ articleDetail.meta.views }}</span
        >
      </div>
      <div class="main">
        <div class="abstract">
          <p>{{ articleDetail.abstract }}</p>
        </div>
        <div class="img">
          <img :src="articleDetail.thumbnail" alt="" />
        </div>
        <div class="content">
          <p>{{ articleDetail.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findArticleReq } from '../../assets/api/index'
export default {
  data() {
    return {
      articleDetail: {}
    }
  },
  methods: {},
  async created() {
    const res = await findArticleReq(this.$route.params.id)
    this.articleDetail = res.data.article[0]
    console.log(this.articleDetail)
    console.log(this.articleDetail.author.nickName)
  }
}
</script>
<style scoped lang="less">
.middle {
  width: 1200px;
  .title {
    width: 400px;
    margin: 0 auto;
    font-size: 20px;
    text-align: center;
    margin-bottom: 40px;
  }
  .detail {
    width: 1000px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 40px;
    span {
      margin-right: 15px;
    }
  }
  .main {
    width: 1000px;
    margin-bottom: 40px;
    .content,
    .abstract {
      margin-left: 200px;
    }
    p {
      margin-bottom: 40px;
    }
    img {
      margin-left: 400px;
      width: 300px;
    }
    .abstract {
      text-indent: 2em;
    }
    .content {
      line-height: 25px;
      text-indent: 2em;
    }
  }
}
</style>
