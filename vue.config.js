'use strict'
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
const productionGzipExtensions = ['js', 'css']

function resolve(dir) {
  return path.join(__dirname, dir)
}
const name = '万顺叫车'
module.exports = {
  publicPath: isProd ? '/carMobile/' : '/',
  // 输出文件目录
  outputDir: 'package',
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: 'assets',
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: !isProd,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: false,
  /* 代码保存时进行eslint检测 */
  lintOnSave: true,
  configureWebpack: config => {
    const plugins = []
    // plugins.push(
    // 用来复制文件或文件夹
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, './pay'),
    //     to: 'pay',
    //     ignore: ['.*'],
    //   },
    // ])
    // )
    if (isProd) {
      // 配置webpack 压缩
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
        })
      )
    }
    config.plugins = [...config.plugins, ...plugins]
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
    config.plugin('html').tap(args => {
      //修复 Lazy loading routes Error
      args[0].chunksSortMode = 'none'
      // 项目标题
      args[0].title = name
      return args
    })
    // 添加别名
    config.resolve.alias.set('@', resolve('src'))
    // 预加载
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial',
      },
    ])
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons/svg-icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons/svg-icons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
    config
      // https://webpack.js.org/configuration/devtool/#dev
      .when(
        !isProd,
        // config => config.devtool('cheap-source-map')cheap-module-eval-source-map
        config => config.devtool('cheap-source-map')
      )
    config.when(isProd, config => {
      // 打包生成的 runtime.js非常的小，gzip 之后一般只有几 kb，但这个文件又经常会改变，我们每次都需要重新请求它，它的 http 耗时远大于它的执行时间了，所以建议不要将它单独拆包，而是将它内联到我们的 index.html 之中(index.html 本来每次打包都会变)。
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end()
      // 代码分割
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            // test: /[\\/]node_modules[\\/](vue|vue-router|vuex|axios)[\\/]/,
            test: /[\\/]node_modules[\\/]/,
            name: 'chunk-libs',
            priority: 20, // 权重要大于上面的chunk-libs
            chunks: 'all',
          },
          vantUI: {
            test: /[\\/]node_modules[\\/]_?vant(.*)/, // in order to adapt to cnpm
            name: 'chunk-vantUI',
            priority: 20, // 权重要大于上面的chunk-libs
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  分割前必须共享模块的最小块数。
            priority: 5,
            reuseExistingChunk: true, // 如果当前块包含已从主束拆分的模块，则将重用它而不是生成新的块。这可能会影响块的结果文件名。
          },
        },
      })
      config.optimization.runtimeChunk('single')
    })
  },
  css: {
    // 是否将css 提取到独立的文件,生产环境提取，开发环境不提取
    extract: !!isProd,
    // 开发模式开启css sourcemap
    sourceMap: !isProd,
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // red: '#111',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.join(__dirname, 'src/assets/style/theme.less')}";`,
          },
        },
      },
    },
    // 启用 CSS modules for all css / pre-processor files(v3用modules v4用requireModuleExtension)
    // modules: false,
    requireModuleExtension: true,
  },
  devServer: {
    /* 自动打开浏览器 */
    open: false,
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: true, // 热更新
    proxy: {
      '^/api': {
        target: 'DEV_URL',
        changeOrigin: false,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
