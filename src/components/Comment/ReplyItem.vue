<template>
  <div class="reply-item">
    <div class="reply-content-block">
      <div class="reply-content">
        <p>{{ content }}</p>
      </div>
      <div class="comment-func inline-block">
        <span class="comment-meta inline-block">
          <span> — </span>
          <a
            target="_blank"
            href="javascript:void(0)"
            @click="handleClickAuthor($event)"
            >{{ author }}</a
          >
          <span class="comments-date">
            · {{ time | moment('YYYY-MM-DD HH:mm:ss') }}</span
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReplyItem',
  props: {
    author: String,
    content: String,
    time: [Date]
  },
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style scoped>
.ml10 {
  margin-left: 10px !important;
}
.ml15 {
  margin-left: 15px !important;
}
.pull-left {
  float: left !important;
}
.pull-right {
  float: right !important;
}
.reply-item {
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.09);
  word-break: break-word;
}
.reply-item a {
  color: #009a61;
  text-decoration: none;
  background: transparent;
}
.reply-item a:hover,
.reply-item a:active,
.reply-item a:focus {
  outline: 0;
}
.reply-item p {
  margin-bottom: 5px;
}
.comment-meta {
  color: #999;
}
.inline-block {
  display: inline-block;
}
</style>
