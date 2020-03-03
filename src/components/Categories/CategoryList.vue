<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" stripe style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="标题" width="200"></el-table-column>
      <el-table-column
        prop="author.nickName"
        label="创建人"
        width="150"
      ></el-table-column>
      <el-table-column prop="createAt" label="创建时间" width="200"
        ><template scope="scope">
          <span>{{ scope.row.createAt | moment('YYYY-MM-DD HH:mm:ss') }}</span>
        </template></el-table-column
      >
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="modifyCategories(scope.row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteArticle(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改弹框 -->
    <el-dialog
      title="修改"
      :visible="modifyDialogVisible"
      width="30%"
      @close="close"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="left"
        label-width="40px"
      >
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmModify">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCategoriesReq } from '../../assets/api/index'
export default {
  data() {
    return {
      tableData: [],
      modifyDialogVisible: false,
      form: {
        title: ''
      }
    }
  },
  methods: {
    modifyCategories(row) {
      var role = sessionStorage.getItem('role')
      var id = sessionStorage.getItem('userId')
      console.log(row.author.role)
      if (row.author.role !== 'normal' && role === 'admin') {
        if (id === row.author._id) {
          this.modifyDialogVisible = true
          this.form.title = row.title
        } else {
          this.$message.error('该用户没有权限修改此分类')
        }
      } else {
        this.modifyDialogVisible = true
      }
    },
    close() {
      this.modifyDialogVisible = false
    },
    // 提交修改
    confirmModify() {
      alert(123)
      this.modifyDialogVisible = false
    }
  },
  async created() {
    const res = await getCategoriesReq()
    this.tableData = res.data.category
  }
}
</script>
<style scoped>
.el-breadcrumb {
  font-size: 12px;
  margin-bottom: 15px;
}
.el-table {
  margin-top: 20px;
}
</style>
