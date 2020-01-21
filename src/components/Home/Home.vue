<template>
  <el-container class="container">
    <el-header class="header">
      <div class="logo">
        <img src="../../assets/logo.png" alt="" />
        <span>管理员系统</span>
      </div>
      <div class="login-out">
        <el-button type="primary" @click="loginOut">退出</el-button>
      </div>
    </el-header>
    <el-container class="asdie_main">
      <el-aside>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff"
          @open="handleOpen"
          @close="handleClose"
          :unique-opened="true"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="userInfo">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-star-off"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="articleList">文章列表</el-menu-item>
            <el-menu-item index="publishArticle">发布文章</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-star-off"></i>
              <span>分类管理</span>
            </template>
            <el-menu-item index="categoryList">分类列表</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-star-off"></i>
              <span>评论管理</span>
            </template>
            <el-menu-item index="commentList">评论列表</el-menu-item>
            <el-menu-item index="setComment">评论设置</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import router from '../../router/index'
export default {
  data() {
    return {}
  },
  methods: {
    loginOut() {
      router.push('/login')
      this.$message.success('退出成功')
      sessionStorage.removeItem('role')
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  }
}
</script>
<style scoped>
.container {
  height: 100%;
}
.container .el-header {
  /* padding: 0 50px; */
}
.container .header {
  background-color: #333;
}
.container .el-aside {
  background-color: #545c64;
}
.el-header .login-out {
  width: 150px;
  padding: 10px 0px;
  float: right;
}
.el-header .logo {
  display: flex;
  align-items: center;
  float: left;
  height: 100%;
  vertical-align: middle;
}
.el-header .logo img {
  height: 100%;
  width: auto;
}
.el-header .logo span {
  display: inline-block;
  font-size: 18px;
  color: #fff;
  font-weight: 700;
}
.el-header .login-out .el-button {
  width: 100%;
  height: 100%;
}
.el-container .el-aside {
  width: 200px !important;
}
.el-submenu {
  width: 200px;
}
</style>
