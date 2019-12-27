<template>
  <div class="login-from">
    <h3 class="login-from-title">登录</h3>
    <el-form :model="loginUser"
      status-icon
      :rules="rules"
      ref="loginUser"
      label-width="60px">
      <el-form-item label="用户名"
        prop="username">
        <el-input v-model="loginUser.username"></el-input>
      </el-form-item>
      <el-form-item label="密码"
        prop="password">
        <el-input type="password"
          v-model="loginUser.password"></el-input>
      </el-form-item>
      <el-form-item size="small">
        <el-button type="primary"
          @click="submitForm('loginUser')"
          class="user-submit">提交</el-button>
        <el-button @click="resetForm('loginUser')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reqLogin } from '@/plugins/axios/index'
import { setStore } from '@/utils/store'
import { mapMutations } from 'vuex'

function generateFrom () {
  return {
    username: '',
    password: ''
  }
}
export default {
  data () {
    const validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginUser: generateFrom(),
      rules: {
        username: [
          { validator: validateUser, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]

      }

    }
  },
  methods: {
    ...mapMutations([
      'getToken'
    ]),
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await reqLogin(this.loginUser)
          if (res.errno === 0) {
            setStore('token', res.message)
            this.getToken(res.message)
            this.$router.push({ name: 'layout' })
          }
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang="scss">
.login-from {
  width: 20%;
  padding: 20px 50px 50px;
  background-color: #fff;
  margin: 200px auto 0;
  .login-from-title {
    text-align: center;
    font-size: 28px;
    margin-bottom: 30px;
  }
  .user-submit {
    margin: 20px 30px 0;
  }
}
</style>
