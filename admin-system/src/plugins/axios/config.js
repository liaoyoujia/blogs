import axios from 'axios'
// import store from '@/plugins/store/index'
// import router from '@/plugins/router'
// 创建axios实例
const instance = axios.create({
  baseURL: '/'
  // timeout: 60000 // 请求超时时间10秒
})

// request拦截器
instance.interceptors.request.use(
  config => {
    // const { vx_token } = store.state.user
    // const { url } = config
    // if ((url.indexOf('authentication/user') === -1) && vx_token) {
    //   config.headers.Authorization = vx_token
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response拦截器
instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          // 401: 未登录
          // 未登录则跳转登录页面，并携带当前页面的路径
          // store.commit(types.LOGOUT)
          // router.replace({
          //   name: 'login',
          //   query: {
          //     redirect: router.currentRoute.fullPath
          //   }
          // })
          break
        case 403:
          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
          // APP_VUE.$message({
          //   showClose: true,
          //   message: '登录过期，请重新登录',
          //   duration: 2000,
          //   type: 'error'
          // })
          // localStorage.removeItem('token')
          // store.commit('loginSuccess', null)
          // // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          // setTimeout(() => {
          //   router.replace({
          //     path: '/login',
          //     query: {
          //       redirect: router.currentRoute.fullPath
          //     }
          //   })
          // }, 1000)
          break
        case 404:
          // 404请求不存在
          // APP_VUE.$message({
          //   showClose: true,
          //   message: '网络请求不存在',
          //   duration: 2000,
          //   type: 'error'
          // })
          break
        default:
        // APP_VUE.$message({
        //   showClose: true,
        //   message: error.response.data.message || '请求出错',
        //   duration: 2000,
        //   type: 'error'
        // })
      }
    } else {
      // APP_VUE.$message({
      //   showClose: true,
      //   message: '请求出错',
      //   duration: 2000,
      //   type: 'error'
      // })
    }
    return Promise.reject(error)
  }
)

export default instance
