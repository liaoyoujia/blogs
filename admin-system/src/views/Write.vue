<template>
  <el-card class="write-blog">
    <div slot="header">
      <h2>创作中...</h2>
    </div>
    <el-form :model="blogForm"
      :rules="rules"
      ref="blogForm"
      label-width="100px"
      class="blog-form">
      <el-form-item label="文章名称"
        prop="title"
        class="blog-form-item">
        <el-input v-model="blogForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章标签"
        prop="tag"
        class="blog-form-item">
        <el-input v-model="blogForm.tag"></el-input>
      </el-form-item>
      <el-form-item label="文章类型"
        prop="type"
        class="blog-form-item">
        <el-radio-group v-model="blogForm.type">
          <el-radio label="技术博客"></el-radio>
          <el-radio label="生活杂谈"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章内容"
        prop="content">
        <mavon-editor v-model="blogForm.content"
          ref=md
          @imgAdd="$imgAdd" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
          @click="submitForm('blogForm')">立即创建</el-button>
        <el-button @click="resetForm('blogForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { reqAddBlog, reqUploads } from '@/plugins/axios/index'
export default {
  data () {
    return {
      blogForm: {
        title: '',
        type: '',
        content: '',
        tag: ''
      },
      img_file: {},
      value: '',
      rules: {
        title: [
          { required: true, message: '请输入文章名称', trigger: 'blur' },
          { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
        ],
        tag: [
          { required: true, message: '请输入文章标签', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择文章类型', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请填写文章内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      console.log(this.blogForm, 1323123)
      this.$refs[formName].validate(async (valid, values) => {
        if (valid) {
          const res = await reqAddBlog(this.blogForm)
          if (res.errno === 0) {
            this.$message({
              showClose: true,
              message: '添加成功！',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: '添加失败！',
              type: 'error'
            })
          }
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async $imgAdd (pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
      this.img_file[pos] = $file
      const res = await reqUploads(formdata)
      this.$refs.md.$img2Url(pos, res.url)
    }
  }

}
</script>

<style scoped lang="scss">
.write-blog {
  width: 100%;
  .blog-form {
    width: 100%;
    .blog-form-item {
      width: 50%;
    }
  }
}
</style>
