<template>
  <div>
    <h1 class="title">修改资料</h1>
    <div class="content">
      <span class="avatar-title">头像</span>
      <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:3000/articleImg"
        :show-file-list="false"
        :auto-upload="false"
        :on-success="handleAvatarSuccess"
        :on-change="imgPreview"
        :before-upload="beforeAvatarUpload"
        ref="upload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span class="nickName-title">昵称</span>
      <el-input class="nickName" v-model.trim="nickName"></el-input>
      <div class="btn">
        <el-button type="danger" @click="save()">保存</el-button>
        <el-button type="info" @click="cancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { findUserReq, modifyUserReq } from '../../assets/api/index'
export default {
  data() {
    return {
      imageUrl: '',
      nickName: '',
      avatar: '',
      fileFlag: true,
      imageUrl1: '',
      nickName1: ''
    }
  },
  methods: {
    async handleAvatarSuccess(res, file) {
      // 访问图片的路径
      this.avatar = 'http://localhost:3000/' + res.path.split('\\')[4]
      const data = await modifyUserReq(sessionStorage.getItem('userId'), {
        avatar: this.avatar,
        nickName: this.nickName
      })
      if (data.data.meta === 200) {
        this.$message.success('修改成功')
        location.reload()
      }
    },
    imgPreview(file) {
      const isJPG = file.raw.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传封面图片只能是 JPG 格式!')
        this.$refs.upload.clearFiles()
        this.fileFlag = false
      } else if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过 2MB!')
        this.$refs.upload.clearFiles()
        this.fileFlag = false
      } else {
        this.fileFlag = true
        this.imageUrl = URL.createObjectURL(file.raw)
      }
      return isJPG && isLt2M
    },
    beforeAvatarUpload(file) {
      if (!file) {
        this.message.error('请选择图片上传')
        return false
      }
    },
    async save() {
      if (this.nickName.length > 10 || this.nickName.length < 2) {
        this.$message.error('昵称长度为2-10个字符')
        return false
      }
      console.log(this.fileFlag)
      if (this.fileFlag) {
        await this.$refs.upload.submit()
        if (this.imageUrl === this.imageUrl1) {
          const data = await modifyUserReq(sessionStorage.getItem('userId'), {
            nickName: this.nickName
          })
          if (data.data.meta === 200) {
            this.$message.success('修改成功')
            location.reload()
          }
        }
      } else {
        this.$message.error('请上传图片')
      }
    },
    cancel() {
      this.nickName = this.nickName1
      this.imageUrl = this.imageUrl1
    }
  },
  async created() {
    const res = await findUserReq(sessionStorage.getItem('userId'))
    this.imageUrl = res.data.user[0].avatar
    this.nickName = res.data.user[0].nickName
    this.imageUrl1 = res.data.user[0].avatar
    this.nickName1 = res.data.user[0].nickName
  }
}
</script>
<style scoped>
.title {
  font-weight: 400;
}
.content {
  height: 400px;
  width: 400px;
  margin-left: 200px;
  /* background-color: #ccc; */
}
.avatar-uploader {
  width: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-title,
.nickName-title {
  display: block;
  margin-bottom: 10px;
}
.nickName-title {
  margin-top: 20px;
}
.nickName {
  margin-top: 10px;
}
.btn {
  margin-top: 20px;
}
</style>
