<template>
  <div class="user">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <!-- 查询框 -->
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="query"
            clearable
            @clear="getuer"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getuer"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible_add = true"
            >添加</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="avatar" label="头像" width="180">
          <template scope="scope">
            <img :src="scope.row.avatar" alt="" width="80px" height="80px" />
          </template>
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称"
          width="250"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="300"
        ></el-table-column>
        <el-table-column prop="role" label="角色" width="150"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200"
          ><template scope="scope">
            <span>{{
              scope.row.createTime | moment('YYYY-MM-DD HH:mm:ss')
            }}</span>
          </template></el-table-column
        >
        <el-table-column label="状态" width="150" prop="status">
          <template scope="scope">
            <el-tag v-if="scope.row.status === 0" type="danger">停用</el-tag>
            <el-tag type="success" v-else>启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="modifyUer(scope.row._id, scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row._id, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block paginations">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current_page"
          :page-sizes="[5, 10]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <!-- 修改用户弹框 -->
      <el-dialog
        title="修改用户"
        :visible.sync="dialogVisible_modify"
        width="40%"
        height="30%"
        @close="modifyUserClose"
      >
        <!-- 修改表单 -->
        <el-form
          :model="modifyForm"
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="nickName">
            <el-input v-model="modifyForm.nickName"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="modifyForm.status" placeholder="请选择状态">
              <el-option label="停用" value="0"></el-option>
              <el-option label="启用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色">
            <el-radio-group v-model="modifyForm.role">
              <el-radio label="管理员"></el-radio>
              <el-radio label="普通用户"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_modify = false">取 消</el-button>
          <el-button type="primary" @click="modifyFormPut">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加用户 -->
      <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible_add"
        width="50%"
        @close="addUserClose"
      >
        <el-form
          :model="addForm"
          :rules="addRules"
          ref="addForm"
          label-width="100px"
        >
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="昵称：" prop="nickName">
            <el-input v-model="addForm.nickName"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="addForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="password1">
            <el-input v-model="addForm.password1" type="password"></el-input>
          </el-form-item>
          <el-form-item label="角色：">
            <el-radio-group v-model="addForm.role">
              <el-radio label="admin" value="admin" v-if="role == 'superAdmin'"
                >管理员</el-radio
              >
              <el-radio label="normal">普通用户</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态：">
            <el-radio-group v-model="addForm.status">
              <el-radio label="0">停用</el-radio>
              <el-radio label="1">启用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_add = false">取 消</el-button>
          <el-button type="primary" @click="addFormPut">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  getUserReq,
  modifyUserReq,
  deleteUserReq,
  addUserReq
} from '../../assets/api/index'
export default {
  data() {
    // 邮箱规则
    var regEmail = new RegExp(
      '^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$'
    )
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        if (!regEmail.test(value)) {
          callback(new Error('请输入正确的邮箱格式'))
        }
        callback()
      }
    }
    // 密码规则
    var regPassword = new RegExp(
      '^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$'
    )
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (!regPassword.test(value)) {
          callback(new Error('密码包含 数字,英文,字符中的两种以上，长度6-20'))
        }
        callback()
      }
    }
    var validatePassword2 = (rule, value, callback) => {
      if (value !== this.addForm.password) {
        callback(new Error('两次密码输入不一致,请重新输入'))
      }
      callback()
    }
    return {
      tableData: [],
      query: '',
      role: '',
      addForm: {
        email: '',
        nickName: '',
        status: '1',
        role: 'normal',
        password: '',
        password1: ''
      },
      current_page: 1,
      current_size: 10,
      total: null,
      modifyForm: {
        nickName: '',
        status: '',
        role: 'normal',
        _id: null
      },
      dialogVisible_modify: false,
      dialogVisible_add: false,
      rules: {
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      },
      addRules: {
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        email: [{ validator: validateEmail, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        password1: [{ validator: validatePassword2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async getuer(page, size) {
      const users = await getUserReq(page, size)
      this.tableData = users.data.user
      this.total = users.data.total
    },
    // 修改用户
    modifyUer(id, row) {
      var role = sessionStorage.getItem('role')
      var role1 = row.role
      if (role === 'admin') {
        if (role1 === '管理员' || role1 === '超级管理员') {
          this.$message.error('该用户没有权限')
          this.dialogVisible_modify = false
          return
        }
      }
      this.modifyForm.nickName = row.nickName
      this.dialogVisible_modify = true
      this.modifyForm.role = row.role
      this.modifyForm._id = row._id
    },
    async deleteUser(id, row) {
      var role = sessionStorage.getItem('role')
      var role1 = row.role
      if (role === 'admin') {
        if (role1 === '管理员' || role1 === '超级管理员') {
          this.$message.error('该用户没有权限')
          this.dialogVisible_modify = false
          return
        }
      }
      const result = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => {
        return err
      })
      if (result === 'confirm') {
        await deleteUserReq(id)
        this.$message.success('删除用户成功')
        this.getuer(this.current_page, this.current_size)
      } else {
        this.$message.info('已取消删除')
      }
    },
    // 分页的页数条数改变
    handleSizeChange(val) {
      this.current_size = val
      this.getuer(this.current_page, val)
    },
    // 分页的页数改变
    handleCurrentChange(val) {
      this.current_page = val
      this.getuer(val, this.current_size)
    },
    // 修改提交
    modifyFormPut() {
      this.$refs.ruleForm.validate(async validate => {
        if (!validate || this.modifyForm.status === '') {
          this.$message.error('选项不能为空并按要求填写')
        } else {
          this.dialogVisible_modify = false
          if (this.modifyForm.role === '管理员') {
            this.modifyForm.role = 'admin'
          } else {
            this.modifyForm.role = 'normal'
          }
          await modifyUserReq(this.modifyForm._id, this.modifyForm)
          this.$message.success('修改用户成功')
          this.getuer(this.current_page, this.current_size)
        }
      })
    },
    // 添加提交
    addFormPut() {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const res = await addUserReq(this.addForm)
          // 通过状态码判断是否添加成功
          if (res.data.meta !== 400) {
            this.$message.success('添加成功')
            this.getuer(this.current_page, this.current_size)
            this.dialogVisible_add = false
          } else {
            this.$message.error('邮箱已存在')
          }
        } else {
          this.$message.error('请按规则填写邮箱,昵称以及密码')
          return false
        }
      })
    },
    modifyUserClose() {},
    // 关闭添加用户弹框
    addUserClose() {
      this.$refs.addForm.resetFields()
    }
  },
  created() {
    this.getuer(this.current_page, this.current_size)
    this.role = sessionStorage.getItem('role')
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
.paginations {
  margin-top: 20px;
}
img {
  margin-left: 40px;
}
</style>
