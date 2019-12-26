<template>
  <el-card class="write-blog">
    <div slot="header">
      <h2>留言箱。。。</h2>
    </div>
    <el-form :model="blogForm"
      :rules="rules"
      ref="blogForm"
      class="blog-form">
      <el-form-item prop="commentItems">
        <el-input type="textarea"
          v-model="blogForm.commentItems"
          placeholder="抢个沙发，来说说吧！"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
          @click="submitForm('blogForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { reqAddComment } from '@/plugins/axios/index'
export default {
  data () {
    return {
      blogForm: {
        commentItems: ''
      },
      rules: {
        commentItems: [
          { required: true, message: '请填写留言内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid, values) => {
        if (valid) {
          const res = await reqAddComment(this.blogForm)
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
