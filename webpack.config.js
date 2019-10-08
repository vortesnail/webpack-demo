const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  // mode: 'production',
  // devtool: 'cheap-module-source-map',
  entry: {
    main: './src/index.js'
  },
  devServer: {
    // 为 dist 文件开一个服务器
    contentBase: path.join(__dirname, "dist"),
    // 定义端口
    port: 8000,
    // 自动打开一个浏览器
    open: true,
    hot: true,
    hotOnly: true,
  },
  module: {
    rules: [{
      test: /\.js$/,
      // 如果 js 文件在 node_modules 中，就不使用 babel-loader
      exclude: /node_modules/,
      loader: "babel-loader",
      // options: {
      //   // presets: [["@babel/preset-env", {
      //   //   // 大于 chrome 67 版本无需用到 preset-env
      //   //   targets: {
      //   //     chrome: '67'
      //   //   },
      //   //   // 根据代码逻辑中用到的 ES6+语法进行方法的导入，而不是全部导入
      //   //   useBuiltIns: 'usage'
      //   // }]]
      //   "plugins": [["@babel/plugin-transform-runtime", {
      //     "absoluteRuntime": false,
      //     "corejs": 2,
      //     "helpers": true,
      //     "regenerator": true,
      //     "useESModules": false
      //   }]]
      // }
      // 以上代码已放入 .babelrc 这个文件中，无需引入自动执行
    }, {
      test: /\.(jpg|png|gif)$/,
      use: {
        // path-loader 能做的 url-loader 也能做
        // url-loader 多了一个 limit 配置项
        loader: 'url-loader',
        options: {
          // placeholder 占位符
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
          // 若图片小于 200kb 打包为 base64 到 bundle.js 中， 反之，打包成静态图片到 /dist/images 之下
          // 意思就是，图片小的话，打包到js文件中，可减少对图片的 http 请求，但是太大，会导致 bundle.js 文件过大，阻碍其他dom的加载
          limit: 204800
        }
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      // loader 的处理顺序从下到上
      use: [
        'style-loader', // 将 css 挂载到 <header></header>
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,  // 重走下面的两个loader
            // modules: true,  // 开启css的模块化打包
          }
        }, // 整合 css 文件, 配置写法
        'sass-loader', // 翻译 sass 为 css
        'postcss-loader' // 厂商前缀
      ]
    }, {
      test: /\.(eot|ttf|svg|woff|woff2)$/,
      use: {
        loader: 'file-loader'
      }
    }]
  },
  // plugin 可以在 webpack 运行到某个过程的时候，做一些事情
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  }
}