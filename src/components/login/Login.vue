<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avater">
        <img src="../../assets/logo.png" alt="登录" />
      </div>
      <div class="login-form">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item prop="email">
            <el-input
              v-model.trim="ruleForm.email"
              prefix-icon="iconfont icon-icon_gangwei"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="ruleForm.password"
              type="password"
              prefix-icon="iconfont icon-icon_mima"
            ></el-input>
          </el-form-item>
          <div class="btn">
            <el-form-item>
              <el-button type="primary" @click="login_click">登录</el-button>
              <el-button @click="reset_click">重置</el-button>
              <el-button @click="register">注册</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { loginReq } from '../../assets/api/index'
import rotuer from '../../router/index'
export default {
  data() {
    var reg = new RegExp(
      '^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$'
    )
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        if (!reg.test(value)) {
          callback(new Error('请输入正确的邮箱格式'))
        }
        callback()
      }
    }
    return {
      labelPosition: 'right',
      ruleForm: {
        email: 'maozi@qq.com',
        password: 'a123456'
      },
      rules: {
        email: [{ validator: validatePass, trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset_click: function() {
      // 清空表单字段
      this.$refs.ruleForm.resetFields()
    },
    login_click: function() {
      // 判断验证合不合法
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          const { data: res } = await loginReq(this.ruleForm)
          // 通过状态码判断是否登录成功
          if (res.status === 0) {
            this.$message.error('该账号已被禁用,请和管理员联系')
            return
          }
          if (res.meta !== 400) {
            if (res.role !== 'normal') {
              this.$message.success('登录成功')
              sessionStorage.setItem('role', res.role)
              sessionStorage.setItem('userId', res._id)
              rotuer.push('/home')
            } else {
              this.$message.success('登录成功')
              rotuer.push('/user_home')
            }
          } else {
            this.$message.error('用户名或者密码不正确')
          }
        } else {
          this.$message.error('请按规则填写用户名和密码')
          return false
        }
      })
    },
    register: function() {
      this.$router.push({ path: 'register' })
    }
  },
  created() {}
}
</script>
<style scoped>
.login-container {
  height: 100%;
  background: -webkit-linear-gradient(top left, #6cc9b6, #3979cc);
}
.login-container .login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 300px;
  background-color: #fff;
  transform: translate(-50%, -50%);
}
.login-container .avater {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: -30%;
  transform: translate(-50%, 50%);
  border-radius: 100px 50%;
  z-index: 2;
}
.login-container .avater img {
  width: 100%;
  height: 100%;
}
.login-container .login-form {
  margin-top: 100px;
  margin-right: 100px;
}
.login-container .btn {
  margin-left: 250px;
}
.login-container .btn {
  margin-left: 150px;
}
</style>
