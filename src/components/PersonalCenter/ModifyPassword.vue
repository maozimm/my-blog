<template>
  <div>
    <h1 class="title">修改密码</h1>
    <div class="content">
      <el-form
        label-position="left"
        label-width="80px"
        class="f16"
        :model="form"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="旧密码" class="mb50" prop="oldPassword">
          <el-input v-model.trim="form.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" class="mb50" prop="newPassword">
          <el-input v-model.trim="form.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" class="mb50" prop="confirmPassword">
          <el-input
            v-model.trim="form.confirmPassword"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="identify">
          <el-input v-model="form.identify" style="width:100px;"></el-input>
        </el-form-item>
        <div class="code" @click="refreshCode">
          <s-identify :identifyCode="identifyCode"></s-identify>
        </div>
        <div class="btn">
          <el-button
            type="danger"
            style="margin-right:20px;"
            @click="submitForm"
            >确认</el-button
          >
          <el-button type="info" @click="resetForm('form')">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { checkPasswordReq, modifyPasswordReq } from '../../assets/api/index'
export default {
  data() {
    var validateOldPassword = async (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        const res = await checkPasswordReq(
          sessionStorage.getItem('userId'),
          this.form.oldPassword
        )
        if (res.data.meta !== 200) {
          callback(new Error('密码不正确'))
        }
        callback()
      }
    }
    // 密码规则
    var regPassword = new RegExp(
      '^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$'
    )
    var validatenNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (!regPassword.test(value)) {
          callback(new Error('密码包含 数字,英文,字符中的两种以上，长度6-20'))
        }
        callback()
      }
    }
    // 确认密码规则
    var validatePassword2 = (rule, value, callback) => {
      if (value !== this.form.newPassword) {
        callback(new Error('两次密码输入不一致,请重新输入'))
      }
      callback()
    }
    // 验证码规则
    var validateIdentify = (rule, value, callback) => {
      if (value !== this.identifyCode) {
        callback(new Error('验证码,请重新输入'))
      }
      callback()
    }
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        // 验证码
        identify: ''
      },
      flag: false,
      identifyCodes: '1234567890',
      identifyCode: '',
      rules: {
        oldPassword: [{ validator: validateOldPassword, trigger: 'blur' }],
        newPassword: [{ validator: validatenNewPassword, trigger: 'blur' }],
        confirmPassword: [{ validator: validatePassword2, trigger: 'blur' }],
        identify: [{ validator: validateIdentify, trigger: 'blur' }]
      }
    }
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        var a = this.randomNum(0, this.identifyCodes.length)
        this.identifyCode += this.identifyCodes[a]
      }
      console.log(this.identifyCode)
    },
    // 清空表单字段
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 提交表单
    submitForm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await modifyPasswordReq(
            sessionStorage.getItem('userId'),
            this.form.newPassword
          )
          if (res.data.meta !== 200) {
            this.$message.error(res.data.message)
          } else {
            this.$message.success('修改密码成功')
            this.resetForm('form')
          }
        } else {
          this.$message.error('请按规则填写表单')
          return false
        }
      })
    }
  },
  created() {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  }
}
</script>
<style scoped lang="less">
.title {
  font-weight: 400;
}
.content {
  height: 400px;
  width: 400px;
  margin-left: 200px;
  transform: translate(200px, 100px);
}
.mb50 {
  margin-bottom: 50px;
}
.el-input {
  width: 300px;
}
.f16 {
  /deep/ label {
    font-size: 16px;
  }
}
.code {
  position: absolute;
  left: 172px;
  top: 294px;
  width: 112px;
  height: 38px;
  border: 1px solid red;
  margin-left: 30px;
  transform: translateY(-24px);
}
.btn {
  margin-left: 80px;
}
</style>
