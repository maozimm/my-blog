<template>
  <el-container class="container">
    <el-aside>
      <div class="userInfo">
        <img src="../../assets/logo.png" alt="" />
        <div class="nickName"><span>测试用户</span></div>
      </div>
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
            <span>首页</span>
          </template>
          <el-menu-item index="hotArticle">热门文章</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>文章</span>
          </template>
          <el-menu-item index="userInfo">推荐文章</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>发布文章</span>
          </template>
          <el-menu-item index="userInfo">写文章</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>文章管理</span>
          </template>
          <el-menu-item index="userInfo">文章列表</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>留言</span>
          </template>
          <el-menu-item index="userInfo">发布留言</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>个人中心</span>
          </template>
          <el-menu-item index="userInfo">修改资料</el-menu-item>
          <el-menu-item index="userInfo">修改密码</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>关于</span>
          </template>
          <el-menu-item index="userInfo">网站信息</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main><router-view></router-view></el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  },
  created() {}
}
</script>
<style scoped>
.container {
  height: 100%;
}
.el-aside {
  background-color: #545c64;
}
.userInfo {
  margin-top: 50px;
  /* margin-left: 50px; */
  width: 200px;
  height: 200px;
  /* border-radius: 50%; */
  /* background-color: #fff; */
}
.userInfo img {
  width: 100px;
  height: auto;
  margin-left: 50px;
  border-radius: 50%;
  background-color: #fff;
}
.userInfo .nickName {
  margin-top: 10px;
  margin-left: 60px;
}
.userInfo .nickName span {
  text-align: center;
  color: #fff;
}
.el-submenu {
  width: 200px;
}
.el-aside {
  width: 200px !important;
}
</style>
