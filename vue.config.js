module.exports = {
  // 解决打包前后文件相对路径的引用问题
  // eslint-disable-next-line eqeqeq
  publicPath: process.env.NODE_ENV == 'production' ? './' : '/',
  devServer: {
    before: require('./mock/index.js'),
  },
  // 修改打包之后index.html的位置
  // indexPath: 'dist/html',
  // 默认情况下，打包生成的静态资源在文件名中包含hash值，以更好地控制缓存，这里可以设置关闭以hash方式命名
  // filenameHashing: false,
  // 伪代理解决跨域问题
  // devServer: {
  //   proxy: 'http://localhost:8080',
  // },
  // 跨域第二种,多端口跨域
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:4000',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': '/',
  //       },
  //     },
  //     '/api2': {
  //       target: 'http://localhost:7878',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': '/',
  //       },
  //     },
  //   },
  // },
};
