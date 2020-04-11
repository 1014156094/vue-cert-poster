module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'examples/main.js',
      // 模板来源
      template: 'public/index.html',
      // 输出文件名
      filename: 'index.html'
    }
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = '#source-map' // 调试显示源码
    }
  },

  css: {
    extract: false // 不提取 CSS 出来，强制内联，详情见 https://cli.vuejs.org/zh/guide/build-targets.html#库
  }
}
