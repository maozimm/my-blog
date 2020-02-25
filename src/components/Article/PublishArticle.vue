<template>
  <div class="publishArticle">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>发布文章</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title" v-if="modifyArticle">修改文章</div>
    <div class="title" v-else>写文章</div>
    <div class="content">
      <el-form ref="form" :model="acrticleForm" :rules="rules">
        <el-row :gutter="80">
          <el-col :span="15">
            <el-form-item label="标题" prop="title">
              <el-input
                placeholder="请输入标题,长度在2到20之间"
                v-model="acrticleForm.title"
                maxlength="20"
              ></el-input>
            </el-form-item>
            <el-form-item label="摘要" prop="abstract">
              <el-input
                placeholder="请输入摘要,长度在2到50之间"
                v-model="acrticleForm.abstract"
                maxlength="50"
              ></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <el-input
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 18 }"
                placeholder="请输入内容,字数限制在5-2000之间"
                maxlength="2000"
                v-model="acrticleForm.content"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <div>上传封面</div>
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
            <el-form-item label="所属分类" prop="category">
              <el-select v-model="acrticleForm.category" placeholder="所有分类">
                <el-option
                  v-for="item in categoryOptions"
                  :key="item._id"
                  :label="item.title"
                  :value="item._id"
                >
                </el-option>
              </el-select>
              <el-form-item label="发布时间" prop="createAt">
                <div class="block">
                  <el-date-picker
                    v-model="acrticleForm.createAt"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions1"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="acrticleForm.state" placeholder="所有状态">
                  <el-option
                    v-for="item in stateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getCategoriesReq,
  addArticleReq,
  findArticleReq,
  modifyArticleReq
} from '../../assets/api/index'
import router from '../../router'
export default {
  data() {
    return {
      acrticleForm: {
        title: '',
        abstract: '',
        content: '',
        category: '',
        state: '',
        author: '',
        thumbnail: '',
        createAt: ''
      },
      // 修改文章标识
      modifyArticle: false,
      categoryOptions: [],
      stateOptions: [
        { label: '草稿', value: 0 },
        { label: '已发布', value: 1 }
      ],
      imageUrl: '',
      pickerOptions1: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ],
        fileFlag: true
      },
      // 表单校验规则
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 20, message: '标题在 2 到 20 个字符', trigger: 'blur' }
        ],
        abstract: [
          { required: true, message: '请输入摘要', trigger: 'blur' },
          { min: 2, max: 50, message: '摘要在 2 到 50 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          {
            min: 5,
            max: 2000,
            message: '内容在 5 到 2000 个字符',
            trigger: 'blur'
          }
        ],
        createAt: [
          { required: true, message: '请选择发布时间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    save() {
      // 判断验证合不合法
      this.$refs.form.validate(async valid => {
        if (
          valid &&
          this.acrticleForm.category !== '' &&
          this.acrticleForm.state !== ''
        ) {
          if (this.modifyArticle && !this.fileFlag) {
            this.acrticleForm.author = sessionStorage.getItem('userId')
            const data = await modifyArticleReq(
              this.$route.params.id,
              this.acrticleForm
            )
            if (data.data.meta === 200) {
              this.$message.success('修改成功')
              router.push('/articleList')
            }
            return false
          }
          if (this.fileFlag) {
            await this.$refs.upload.submit()
          } else {
            this.$message.error('请上传图片')
          }
        } else {
          this.$message.error('请按规则填写各项内容')
          return false
        }
      })
    },
    // 图片上传成功回调
    async handleAvatarSuccess(res, file) {
      // 访问图片的路径
      this.acrticleForm.thumbnail =
        'http://localhost:3000/' + res.path.split('\\')[4]
      if (this.acrticleForm.author === '') {
        this.acrticleForm.author = sessionStorage.getItem('userId')
      }
      if (!this.modifyArticle) {
        const data = await addArticleReq(this.acrticleForm)
        if (data.data.meta === 200) {
          this.$message.success('保存成功')
          router.push('/articleList')
        }
      } else {
        const data = await modifyArticleReq(
          this.$route.params.id,
          this.acrticleForm
        )
        if (data.data.meta === 200) {
          this.$message.success('修改成功')
          router.push('/articleList')
        }
      }
    },
    // 图片预览
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
    }
  },
  async created() {
    // 判断是不是修改文章
    if (this.$route.params.id) {
      this.modifyArticle = true
      const res = await findArticleReq(this.$route.params.id)
      const data = res.data.article[0]
      this.acrticleForm.createAt = data.createAt
      this.acrticleForm.title = data.title
      this.acrticleForm.abstract = data.abstract
      this.acrticleForm.content = data.content
      this.acrticleForm.state = data.state
      this.imageUrl = data.thumbnail
      this.acrticleForm.category = data.category
      this.acrticleForm.thumbnail = data.thumbnail
    }
    const res = await getCategoriesReq()
    this.categoryOptions = res.data.category
  }
}
</script>
<style scoped lang="less">
.publishArticle {
  .el-breadcrumb {
    font-size: 12px;
    margin-bottom: 15px;
  }
  .title {
    font-size: 24px;
    color: #333;
    margin-bottom: 15px;
  }
  .content {
    .el-select {
      width: 100%;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
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
.block {
  margin-top: 40px;
}
</style>
