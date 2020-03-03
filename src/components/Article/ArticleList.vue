<template>
  <div class="articleList">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="title">
        <h1>所有文章</h1>
        <el-button size="mini" type="info" @click="toPublish">写文章</el-button>
      </div>
      <div class="search">
        <el-select v-model="category" placeholder="所有分类" size="mini">
          <el-option
            v-for="item in categoryOptions"
            :key="item._id"
            :label="item.title"
            :value="item._id"
          >
          </el-option>
        </el-select>
        <el-select v-model="state" placeholder="所有状态" size="mini">
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button size="mini" @click="search">筛选</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="thumbnail" label="缩略图" width="180">
          <template scope="scope">
            <img
              :src="scope.row.thumbnail"
              alt=""
              style="width:80px;height:80px;margin-left:40px;"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="abstract"
          label="摘要"
          width="300"
        ></el-table-column>
        <el-table-column
          prop="author.nickName"
          label="创建人"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="category.title"
          label="文章分类"
          width="150"
        ></el-table-column>
        <el-table-column prop="createAt" label="创建时间" width="200"
          ><template scope="scope">
            <span>{{
              scope.row.createAt | moment('YYYY-MM-DD HH:mm:ss')
            }}</span>
          </template></el-table-column
        >
        <el-table-column label="状态" width="100" prop="state">
          <template scope="scope">
            <el-tag v-if="scope.row.state === 0" type="danger">草稿</el-tag>
            <el-tag type="success" v-else>发布</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否热门" prop="isHot" width="80">
          <template scope="scope">
            <el-tag
              v-if="scope.row.isHot === 1"
              type="success"
              @click="setIsHot(scope.row)"
              >是</el-tag
            >
            <el-tag type="danger" v-else @click="setIsHot(scope.row)"
              >否</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="modifyArticle(scope.row)"
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
      <el-dialog
        title="修改"
        :visible="isHotDialogVisible"
        width="30%"
        @close="close"
      >
        <el-form>
          <el-form-item label="是否热门">
            <el-radio v-model="isHot" :label="1">是</el-radio>
            <el-radio v-model="isHot" :label="0">否</el-radio>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isHotDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyIsHot">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  getCategoriesReq,
  getArticleReq,
  deleteArticleReq,
  modifyIsHotReq
} from '../../assets/api/index'
import router from '../../router'
export default {
  data() {
    return {
      tableData: [],
      category: '',
      state: '',
      categoryOptions: [],
      isHotDialogVisible: false,
      isHot: 0,
      articleId: '',
      stateOptions: [
        { label: '草稿', value: 0 },
        { label: '已发布', value: 1 }
      ],
      current_page: 1,
      current_size: 10,
      total: null
    }
  },
  methods: {
    async getArticle(category, state, page, size) {
      const data = await getArticleReq(category, state, page, size)
      this.tableData = data.data.article
      this.total = data.data.total
    },
    // 修改文章
    modifyArticle(row) {
      var role = sessionStorage.getItem('role')
      var id = sessionStorage.getItem('userId')
      if (row.author.role !== 'normal' && role === 'admin') {
        if (id === row.author._id) {
          router.push('/modifyArticle/' + row._id)
        } else {
          this.$message.error('该用户没有权限修改此文章')
        }
      } else {
        router.push('/modifyArticle/' + row._id)
      }
    },
    // 删除文章
    async deleteArticle(row) {
      var role = sessionStorage.getItem('role')
      var id = sessionStorage.getItem('userId')
      if (row.author.role !== 'normal' && role === 'admin') {
        if (id === row.author._id) {
          const result = await this.$confirm(
            '此操作将永久删除该文章, 是否继续?',
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
            await deleteArticleReq(row._id)
            this.$message.success('删除文章成功')
            this.getArticle(
              this.category,
              this.state,
              this.current_page,
              this.current_size
            )
          } else {
            this.$message.info('已取消删除')
          }
        } else {
          this.$message.error('该用户没有权限删除此文章')
        }
      } else {
        const result = await this.$confirm(
          '此操作将永久删除该文章, 是否继续?',
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
          await deleteArticleReq(row._id)
          this.$message.success('删除文章成功')
          this.getArticle(
            this.category,
            this.state,
            this.current_page,
            this.current_size
          )
        } else {
          this.$message.info('已取消删除')
        }
      }
    },
    // 分页的页数条数改变
    handleSizeChange(val) {
      this.current_size = val
      this.getArticle(
        this.category,
        this.state,
        this.current_page,
        this.current_size
      )
    },
    // 分页的页数改变
    handleCurrentChange(val) {
      this.current_page = val
      this.getArticle(
        this.category,
        this.state,
        this.current_page,
        this.current_size
      )
    },
    // 筛选
    search() {
      this.getArticle(
        this.category,
        this.state,
        this.current_page,
        this.current_size
      )
    },
    // 设置热门文章
    setIsHot(row) {
      var role = sessionStorage.getItem('role')
      var id = sessionStorage.getItem('userId')
      this.articleId = row._id
      if (row.author.role !== 'normal' && role === 'admin') {
        if (id === row.author._id) {
          this.isHotDialogVisible = true
        } else {
          this.$message.error('该用户没有权限修改')
        }
      } else {
        this.isHotDialogVisible = true
        this.isHot = row.isHot
      }
    },
    close() {
      this.isHotDialogVisible = false
    },
    // 确认修改文章
    async modifyIsHot() {
      this.isHotDialogVisible = false
      await modifyIsHotReq(this.articleId, { isHot: this.isHot })
      this.getArticle(
        this.category,
        this.state,
        this.current_page,
        this.current_size
      )
    },
    // 跳转到发布文章
    toPublish() {
      router.push('/publishArticle')
    }
  },
  async created() {
    const res = await getCategoriesReq()
    this.categoryOptions = res.data.category
    this.getArticle(
      this.category,
      this.state,
      this.current_page,
      this.current_size
    )
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
.title h1 {
  display: inline-block;
  font-size: 20px;
  /* color: #333; */
  font-weight: 400;
}
.title .el-button {
  margin-left: 10px;
  padding-bottom: 5px;
}
.search {
  margin-top: 10px;
}
.search .el-select {
  width: 100px;
  margin-right: 10px;
}
</style>
