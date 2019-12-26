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
        <el-menu-item index="/me">
          关于我
        </el-menu-item>
      </el-menu>

      <el-dropdown class="right-menu"
        size="medium">
        <div class="avater-wrapper">
          <el-avatar :src="logo"></el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Github</el-dropdown-item>
          <el-dropdown-item>QQ</el-dropdown-item>
          <el-dropdown-item>WeChat</el-dropdown-item>
          <el-dropdown-item divided>注销</el-dropdown-item>
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
export default {
  data () {
    return {
      logo
    }
  },
  methods: {
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
