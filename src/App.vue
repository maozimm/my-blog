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
    }
  }
}
</script>
<style lang="less"></style>
