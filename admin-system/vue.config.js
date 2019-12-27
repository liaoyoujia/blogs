// vue 项目配置文件
module.exports = {
  // publicPath: './', // 所有的资源都会被链接为相对路径
  devServer: {
    port: 9102,
    proxy: {
      'api': {
        // target: 'http://10.129.100.41:5400',
        target: 'http://localhost:80/',
        ws: false,
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
        @import "@/styles/entry.scss";
        `
      }
    }
  }
}
