const webpack = require('webpack');
const path = require('path');

//使用HtmlWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 載入轉存 css 檔案的套件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 把process.env.NODE_ENV 由 package.json npm script 裡定義
const DEV_MODE = process.env.NODE_ENV === 'development'; //定義為開發模式
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = {
  // mode 一定要加，只能是 development 或是 production 兩種
  mode: process.env.NODE_ENV, //這邊是透過上方的const DEV_MODE設定成development

  // context 指定所有的檔案都從 src 資料始開始，節省打路徑的麻煩
  context: path.resolve('src'),

  //bundle的進入點
  entry: './index.js',

  // 三元運算式，如果是開發模式就用'inline-source-map'，是 production 發佈就拿掉 source-map
  devtool: DEV_MODE ? 'inline-source-map' : false,

  output: {
    path: path.resolve(__dirname, 'dist'),
    //打包後的檔案位置，以此為例會放在名為dist的資料夾

    filename: '[name].js'
    //打包後的檔案名稱
  },
  resolve: {
    // 在 import 檔案, 如果不想寫完整的路徑
    // 可以加入這些目錄, 讓 webpack 自動尋找, 主要是讓圖片支援 ~img 路徑寫法
    modules: [
      path.resolve('src'),
      path.resolve('node_modules'), // 這個一定要加
    ],
  },
  module: {
    rules: [
        //所有.js檔都會用Babel編譯
        {
            test: /\.js$/i,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        // pug檔案
        {
            test: /\.pug$/i,
            use: [
                {
                loader: 'html-loader',
                    options: {
                        minimize: false 
                        // 不壓縮 HTML
                    }
                },
                {
                loader: 'pug-html-loader',
                    options: {
                        pretty: true 
                       // 美化 HTML 的編排 (不壓縮HTML的一種)
                    }
                },
            ]
          },
          
          {
            test: /\.html$/,
            use:[
              { 
                // https://github.com/webpack-contrib/html-loader
                loader: 'html-loader',
              },
            ],
            include: path.resolve('src/html'),
          },

           //用css loader來處理css檔案
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
          },
          //用sass loader來處理sass或scss檔案
          {
            test: /\.s[ac]ss$/i,
            use: [
              // 需要用到的 loader
              MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader"
          ]
          },
          {
            test: /\.(png|jpg|gif|svg|ico)$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 2048, // 小於 2048 bytes(2k) 的圖檔, 自動變成 base64 字串
                // 檔名： [資料夾][檔名].[副檔名]
                name: '[path][name].[ext]',
              },
            },
            include: path.resolve('src/img'),
          },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/pug/index.pug'),
        filename:'index.html',
        // excludeChunks:['home'] 這個是排除home.js這個檔案
    }),
    new MiniCssExtractPlugin({
      // 指定輸出位置
      // [name] 為上方進入點設定的 "名稱"
      filename: "./css/[name].css"
  })
  ],

  // 設定localhost
  devServer: {
    // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
    // HTML5 History API
    historyApiFallback: true,
    port: 3000,
    //hot reload如果是true的話，webpack預設支援hot reload，也就是隨時更改就會更新在網頁上
    hot: true,
    // 可以用 ip 連線，預設是 localhost
    host: '0.0.0.0',
    // https://webpack.js.org/configuration/dev-server/#devserverstats-
    stats: 'minimal'
  },

};