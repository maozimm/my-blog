<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="info" @click="addDialogVisible = true">添加分类</el-button>
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
        label-position="left"
        label-width="40px"
      >
        <el-form-item label="标题">
          <el-input v-model.trim="form.title" maxlength="30"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmModify">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加分类弹框 -->
    <el-dialog
      title="添加分类"
      :visible="addDialogVisible"
      width="30%"
      @close="addClose"
    >
      <el-form :model="addForm" label-position="left" label-width="40px">
        <el-form-item label="标题">
          <el-input v-model.trim="addForm.title" maxlength="30"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCategoriesReq,
  modifyCategory,
  addCategoryReq
} from '../../assets/api/index'
export default {
  data() {
    return {
      tableData: [],
      modifyDialogVisible: false,
      addDialogVisible: false,
      form: {
        title: ''
      },
      addForm: {
        title: ''
      },
      id: ''
    }
  },
  methods: {
    modifyCategories(row) {
      this.form.title = row.title
      var role = sessionStorage.getItem('role')
      var id = sessionStorage.getItem('userId')
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
      this.id = row._id
    },
    close() {
      this.modifyDialogVisible = false
      this.form.title = ''
    },
    // 提交修改
    async confirmModify() {
      if (this.form.title.length < 2 || this.form.title.length > 30) {
        this.$message.error('分类名称的长度在2-30字符之间')
        return false
      }
      const res = await modifyCategory(this.id, { title: this.form.title })
      if (res.data.meta !== 200) {
        this.$message.error('修改失败')
      } else {
        this.$message.success('修改成功')
        this.getCategories()
      }
      this.modifyDialogVisible = false
    },
    async confirmAdd() {
      if (this.addForm.title.length < 2 || this.addForm.title.length > 30) {
        this.$message.error('分类名称的长度在2-30字符之间')
        return false
      }
      const res = await addCategoryReq({
        author: sessionStorage.getItem('userId'),
        title: this.addForm.title
      })
      if (res.data.meta !== 200) {
        this.$message.error('添加失败')
      } else {
        this.$message.success('添加成功')
        this.getCategories()
      }
      this.addDialogVisible = false
    },
    // 获取分类
    async getCategories() {
      const res = await getCategoriesReq()
      this.tableData = res.data.category
    },
    addClose() {
      this.addDialogVisible = false
      this.addForm.title = ''
    }
  },
  async created() {
    this.getCategories()
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
