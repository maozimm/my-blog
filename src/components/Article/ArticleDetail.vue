<template>
  <div class="articleDetail">
    <div class="middle">
      <div class="title">
        <span>{{ articleDetail.title }}</span>
      </div>
      <div class="detail">
        <span class="time"
          >发表时间：
          {{ articleDetail.createAt | moment('YYYY-MM-DD HH:mm:ss') }}</span
        >
        <span class="author" v-if="articleDetail.author"
          >作者：{{ articleDetail.author.nickName }}</span
        >
        <span class="comments" v-if="articleDetail.meta"
          >评论数：{{ articleDetail.meta.comments }}</span
        >
        <span class="views" v-if="articleDetail.meta"
          >浏览数：{{ articleDetail.meta.views }}</span
        >
        <like
          v-if="articleDetail.meta"
          @click="changeValue"
          :count="articleDetail.meta.likes"
          :like="like"
        ></like>
      </div>
      <div class="main">
        <div class="abstract">
          <p>{{ articleDetail.abstract }}</p>
        </div>
        <div class="imgs">
          <img :src="articleDetail.thumbnail" alt="" />
        </div>
        <div class="content">
          <p>{{ articleDetail.content }}</p>
        </div>
        <div class="writeCommet">
          <img :src="null" alt="" class="avatar-32" />
          <el-input
            class="width90"
            type="textarea"
            placeholder="请输入内容"
            :autosize="{ minRows: 4, maxRows: 8 }"
            minlenth="1"
            maxlength="200"
            v-model.trim="textArea"
          ></el-input>
          <div class="btn">
            <el-button type="danger" round @click="addCommet">发布</el-button>
            <el-button type="info" round @click="addCommetCancel"
              >取消</el-button
            >
          </div>
        </div>
        <span class="totalComment">全部评论</span>
        <comment-item
          v-for="(comment, index) in comments"
          :key="index"
          :avatar="comment.avatar"
          :author="comment.author"
          :content="comment.content"
          :time="comment.createAt"
          @addReply="handleAddReply(comment)"
          @commitReply="commit(comment, arguments)"
          @cancelReply="cancel(comment)"
          :hasReply="replys[comment._id] && replys[comment._id].length > 0"
          :showInput="comment.inputFlag"
        >
          <reply-item
            v-for="reply in replys[comment._id]"
            :key="reply._id"
            :author="reply.author"
            :content="reply.content"
            :time="reply.createTime"
          >
          </reply-item>
        </comment-item>
        <div class="block paginations">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="current_page"
            :page-size="5"
            layout="total,prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  findArticleReq,
  addViewsReq,
  modifyArticleReq,
  getCommentReq,
  getReplyReq,
  addReplyReq,
  addCommetReq
} from '../../assets/api/index'
export default {
  data() {
    return {
      articleDetail: {},
      views: '',
      like: false,
      likes: '',
      id: '',
      // 评论
      comments: [],
      replys: {},
      current_page: 1,
      total: 0,
      textArea: ''
    }
  },
  methods: {
    async getRrticleDetail() {
      // 找到文章
      const res = await findArticleReq(this.$route.params.id)
      this.articleDetail = res.data.article[0]
      this.views = res.data.article[0].meta.views
      this.likes = res.data.article[0].meta.likes
    },
    changeValue() {
      this.like = !this.like
      if (this.like) {
        this.articleDetail.meta.likes = this.likes + 1
      } else {
        this.articleDetail.meta.likes = this.likes
      }
    },
    beforeunloadFn(e) {
      e.preventDefault()
      return false
    },
    handleAddReply(item) {
      item.inputFlag = true
    },
    // 发布评论
    async commit(comment, data) {
      const res = await addReplyReq({
        author: sessionStorage.getItem('userId'),
        content: data[0],
        comment: comment._id
      })
      if (res.data.meta === 200) {
        this.$message.success('回复成功')
        this.getComments(this.id, this.current_page)
      }
    },
    // 取消评论
    cancel(comment) {
      comment.inputFlag = false
    },
    handleCurrentChange(val) {
      this.getComments(this.id, val)
    },
    // 获取评论
    async getComments(id, page) {
      const res = await getCommentReq(id, page)
      var comments = res.data.comments
      this.total = res.data.total
      var newComments = []
      var commentsId = []
      comments.forEach((element, index) => {
        newComments.push({ inputFlag: false })
        for (var key in element) {
          if (key === '_id') {
            commentsId.push(element[key])
          }
          if (key === '_id' || key === 'content' || key === 'createAt') {
            newComments[index][key] = element[key]
          } else {
            if (key === 'author') {
              newComments[index].author = element[key].nickName
              newComments[index].avatar = element[key].avatar
            }
          }
        }
      })
      this.comments = newComments
      // 构造回复评论数据结构
      const data = await getReplyReq(commentsId)
      var replys = data.data.replys
      for (var key in replys) {
        if (replys[key].length > 0) {
          replys[key].forEach(element => {
            for (var key1 in element) {
              if (key1 === 'author') {
                element[key1] = element[key1].nickName
              }
            }
          })
        }
      }
      this.replys = replys
    },
    // 发表评论
    async addCommet() {
      const res = await addCommetReq({
        author: sessionStorage.getItem('userId'),
        content: this.textArea,
        post: this.id
      })
      if (res.data.meta === 200) {
        this.textArea = ''
        this.$message.success('评论成功')
        this.getComments(this.id, this.current_page)
      }
    },
    addCommetCancel() {
      this.textArea = ''
    }
  },
  async created() {
    this.id = this.$route.params.id
    await this.getRrticleDetail()
    // 浏览记录
    var visitors = sessionStorage.getItem('userId').toString()
    await addViewsReq({
      visitor: visitors,
      post: this.$route.params.id.toString(),
      createdAt: new Date()
    })
    await modifyArticleReq(this.$route.params.id, {
      meta: {
        views: this.views + 1,
        likes: this.articleDetail.meta.likes,
        comments: this.articleDetail.meta.comments
      }
    })
    await this.getRrticleDetail()
    await this.getComments(this.$route.params.id, this.current_page)
  },
  mounted() {
    // window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
  },
  async destroyed() {
    // window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
    await modifyArticleReq(this.id, {
      meta: {
        views: this.views,
        likes: this.articleDetail.meta.likes,
        comments: this.articleDetail.meta.comments
      }
    })
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
    .imgs img {
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
.paginations {
  margin-top: 20px;
  margin-left: 200px;
}
.avatar-32 {
  float: left;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.writeCommet {
  overflow: hidden;
  margin-left: 200px;
  margin-bottom: 20px;
}
.width90 {
  margin-left: 20px;
  width: 92%;
}
.btn {
  float: right;
  margin-top: 10px;
}
.totalComment {
  display: block;
  margin-left: 200px;
  margin-bottom: 10px;
  font-size: 20px;
}
</style>
