<template>
  <el-container class="layout-box">
    <el-header class="layout-header">
      <el-menu :default-active="activeMenu()"
        mode="horizontal"
        router>
        <el-menu-item index="/index">
          首页
        </el-menu-item>
        <el-menu-item index="/write">
          写作
        </el-menu-item>
        <el-menu-item index="/comment">
          评论
        </el-menu-item>
      </el-menu>

      <el-dropdown class="right-menu"
        size="medium"
        @command="handleCommand">
        <div class="avater-wrapper">
          <el-avatar :src="logo"></el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="github">Github</el-dropdown-item>
          <el-dropdown-item divided
            v-if="token&&token.length"
            command="cancellate">注销</el-dropdown-item>
          <el-dropdown-item divided
            v-else
            command="login">登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container class="layout-container">
      <router-view></router-view>
    </el-container>
    <el-footer class="layout-footer">
      Design by 廖有佳个人博客 国ACA备11002373号-1
    </el-footer>
  </el-container>
</template>

<script>
import logo from '../assets/logo.jpg'
import { removeStore } from '@/utils/store' // get token from cookie
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      logo
    }
  },
  computed: {
    ...mapState({
      token: state => state.token
    })
  },
  methods: {
    ...mapMutations([
      'resetToken'
    ]),
    activeMenu () {
      const route = this.$route
      const { path } = route
      const routePath = ['/index', '/write', '/comment', '/me']
      for (let i = 0; i < routePath.length; i++) {
        if (path.startsWith(routePath[i])) {
          return routePath[i]
        }
      }
      return routePath[0]
    },
    handleCommand (type) {
      switch (type) {
        case 'github':
          window.location.href = 'https://github.com/liaoyoujia/blogs'
          break
        case 'cancellate':
          removeStore('token')
          this.resetToken()
          this.$router.push({ name: 'login' })
          break
        case 'login':
          this.$router.push({ name: 'login' })
          break
      }
    }
  }
}
</script>

<style scoped lang="scss">
.layout-box {
  width: 100%;
  .layout-header {
    width: 100%;
    background-color: #fff;
    padding: 0 40px;
    box-sizing: border-box;
    border-bottom: solid 1px #e6e6e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-menu-layout {
      width: 100%;
      .el-menu-item {
        margin-right: 50px;
      }
    }
    .right-menu {
      .avater-wrapper {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        .user-avater {
          display: block;
          margin-right: 8px;
          width: 38px;
          border-radius: 50%;
        }
      }
    }
  }
}
.layout-container {
  width: 60%;
  margin: 20px auto 0;
}
.layout-footer {
  margin-top: 30px;
  width: 100%;
  color: #686868;
  font-size: 12px;
  text-align: center;
}
</style>
