<template>
  <div class="register-container">
    <div class="title">
      <img src="../../assets/logo.png" alt="" />
      <span>博客系统</span>
    </div>
    <div class="register-body">
      <div class="register-box">
        <div class="register-title">欢迎注册博客系统</div>
        <div class="register-form">
          <el-form
            ref="form"
            :model="form"
            label-width="80px"
            class="fontsize"
            :rules="rules"
          >
            <el-form-item label="邮箱:" prop="email">
              <el-input
                v-model="form.email"
                placeholder="请设置您的邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item label="昵称:" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请设置您的昵称"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input
                v-model="form.password"
                placeholder="请设置您的密码"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="password_2">
              <el-input
                v-model="form.password_2"
                placeholder="请确认您的昵称"
                type="password"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="btn">
            <el-button type="primary" @click="submitForm">确认</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../../router/index'
import { registerReq } from '../../assets/api/index'
export default {
  data () {
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
      if (value !== this.form.password) {
        callback(new Error('两次密码输入不一致,请重新输入'))
      }
      callback()
    }
    return {
      form: {
        nickName: '',
        password: '',
        password_2: '',
        email: ''
      },
      rules: {
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        email: [{ validator: validateEmail, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        password_2: [{ validator: validatePassword2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 清空表单字段
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 提交表单
    submitForm () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { data: res } = await registerReq(this.form)
          // 通过状态码判断是否注册成功
          if (res.meta !== 400) {
            this.$message.success('注册成功')
            router.push('/login')
          } else {
            this.$message.error('邮箱已存在')
          }
        } else {
          this.$message.error('请按规则填写邮箱,昵称以及密码')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.register-container {
  height: 100%;
  background: #ccc;
  overflow: hidden;
}
.title {
  padding: 20px;
  border-bottom: 1px solid #fff;
}
.title img {
  width: 60px;
  height: auto;
  vertical-align: middle;
}
.title span {
  margin-left: 5px;
  font-size: 20px;
  font-weight: 700;
}
.register-body {
  position: relative;
  height: 100%;
}
.register-box {
  position: absolute;
  top: 10%;
  left: 50%;
  width: 800px;
  height: 500px;
  transform: translateX(-400px);
  /* transform: translateY(-300px); */
  background-color: #fff;
}
.register-box .register-title {
  padding-top: 20px;
  text-align: center;
  color: #373d41;
  font-size: 30px;
}
.register-body .register-form {
  margin-top: 20px;
}
.register-body .register-form .el-form-item {
  margin-top: 40px;
  margin-left: 50px;
  width: 600px;
}
.register-form .btn {
  margin-left: 400px;
}
.register-form .btn .el-button {
  margin-left: 30px;
}
</style>
