<template>
  <div class="comments-item">
    <div class="pull-left">
      <img class="avatar-32" :src="avatar" alt="" :v-if="avatar" />
    </div>
    <div class="comments-box">
      <div class="comments-trigger">
        <strong
          ><a href="javascript:void(0)">{{ author }}</a></strong
        >
        <span class="comments-date">
          · {{ time | moment('YYYY-MM-DD HH:mm:ss') }}</span
        >
      </div>
      <div class="comments-content">
        <p>{{ content }}</p>
      </div>
      <p class="comments-ops">
        <span class="comments-reply-btn ml15" @click="handleAddReply"
          >回复</span
        >
      </p>
      <div class="reply-input" v-if="showInput" v-show="!hasReply">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          :autosize="{ minRows: 2, maxRows: 4 }"
          minlenth="1"
          maxlength="200"
          v-model.trim="textArea"
        >
        </el-input>
        <div class="btn">
          <el-button type="danger" round @click="commit">发布</el-button>
          <el-button type="info" round @click="cancel">取消</el-button>
        </div>
      </div>
      <div class="reply-list" v-show="hasReply">
        <slot></slot>
        <div class="reply-item reply-item--ops">
          <a
            class="reply-inner-btn"
            href="javascript:void(0);"
            @click="handleAddReply"
            >添加回复</a
          >
          <div class="reply-input" v-if="showInput">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              :autosize="{ minRows: 2, maxRows: 4 }"
              minlenth="1"
              maxlength="200"
              v-model.trim="textArea"
            >
            </el-input>
            <div class="btn">
              <el-button type="danger" round @click="commit">发布</el-button>
              <el-button type="info" round @click="cancel">取消</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentsItem',
  props: {
    avatar: String,
    author: String,
    content: String,
    time: String,
    hasReply: Boolean,
    showInput: Boolean
  },
  data() {
    return {
      textArea: ''
    }
  },
  computed: {},
  methods: {
    handleAddReply(event) {
      event.stopPropagation()
      this.$emit('addReply', this)
    },
    commit(event) {
      event.stopPropagation()
      this.$emit('commitReply', this.textArea)
      this.textArea = ''
    },
    cancel(event) {
      event.stopPropagation()
      this.$emit('cancelReply')
      this.textArea = ''
    }
  }
}
</script>

<style scoped>
img {
  border: 0;
  vertical-align: middle;
}
.ml10 {
  margin-left: 10px !important;
}
.ml15 {
  margin-left: 15px !important;
}
.comments-item {
  padding: 15px 0;
  /* margin-top: 100px; */
  margin-left: 200px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  font-size: 14px;
}
.pull-left {
  float: left !important;
}
.pull-right {
  float: right !important;
}
.avatar-32 {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.comments-item a {
  color: #009a61;
  text-decoration: none;
  background: transparent;
}
.comments-item a:hover,
.comments-item a:active,
.comments-item a:focus {
  outline: 0;
}
.comments-box {
  padding-left: 47px;
}
.comments-box strong {
  font-weight: bold;
}
.comments-trigger {
  margin-bottom: 10px;
  color: #999;
  font-size: 13px;
}
.comments-content {
  line-height: 1.6;
  word-wrap: break-word;
  margin-bottom: 10px !important;
}
.comments-content::before,
.comments-content::after {
  display: table;
}
.comments-content::after {
  content: '';
  clear: both;
}
.comments-ops {
  margin: 0;
  color: #999;
  font-size: 13px;
}
.comments-reply-btn {
  cursor: pointer;
}
.reply-list {
  margin-top: 10px;
  font-size: 13px;
  background-color: #fafafa;
  padding: 0 10px;
  color: #666;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
}
.reply-item--ops {
  border-bottom: none;
}
.reply-item {
  padding-bottom: 10px;
  padding-top: 10px;
  word-break: break-word;
}
.el-textarea {
  margin-top: 20px;
}
.reply-input {
  /* 清除浮动 */
  overflow: hidden;
}
.btn {
  float: right;
  margin-top: 10px;
}
</style>
