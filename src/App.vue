<template>
  <div id="app">
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      s: 'data'
    }
  },
  methods: {
    aaa() {}
  },
  watch: {
    $route(to, from) {
      if (
        to.fullPath === '/publishArticle' &&
        from.fullPath.split('/')[1] === 'modifyArticle'
      ) {
        location.reload()
      }
      if (
        (to.fullPath === '/hotArticle' &&
          from.fullPath === '/recommendArticle') ||
        (to.fullPath === '/recommendArticle' && from.fullPath === '/hotArticle')
      ) {
        location.reload()
      }
      if (
        to.name === 'userPublishArticle' &&
        from.name === 'userModifyArticle'
      ) {
        location.reload()
      }
    }
  }
}
</script>
<style lang="less"></style>
