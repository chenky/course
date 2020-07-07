const path = require('path');
const getEntry = require("./build/getEntry");
let config = require("./config/config");
var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let entries = getEntry("./src/js/pages/**");
// let entries = {
//   page1: ['./src/js/pages/page1.js']
// }
// console.log("js entries:"+ JSON.stringify(entries));

let webpackHtml = (function(){
  let htmls = [];

  let pages = getEntry("./src/html/**");
  // let pages = {
  //   page1: ['./src/html/page1.html']
  // }
  let pageNames = Object.keys(pages);

  pageNames.forEach(function(pageName){
    let page = pages[pageName][0];
    console.log(page);          
    let filename =path.relative("./src", page);   

    let options = {
      filename, //生成的html存放路径，相对于path
      template: page, //html模板路径
      inject: "body", //默认不注入js
      hash: false,
      chunks: [pageName] 
    
      /*
      * 调用html-minify 压缩 html压缩时会有很多html语法检查问题，必须设置压缩忽略项 ignoreCustomFragments
      * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
      * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
      */
      // minify: { //压缩HTML文件
      //     removeComments: true, //移除HTML中的注释
      //     collapseWhitespace: true, //删除空白符与换行符
      //     removeEmptyAttributes: false, //删除空值属性
      //     ignoreCustomFragments: (debug ? [] : [/\$!?(\{[^"'\s]*\}|[^"'\s]*)|(^#|\s#)[^\f\n\r\v]*/ig]), //设置压缩忽略项目
      //     minifyCSS: true, //压缩css
      //     minifyJS: true //压缩js
      // }
  };

    htmls.push(new HtmlWebpackPlugin(options));
  });

  return htmls;
})();

let devServer = {
    contentBase: './debug/html/',
    port: 9000,
    // open: "Chrome",
    openPage: "./debug/html/page1.html",
    // historyApiFallback: true,
    inline: true,
    hot: true
    // stats: { colors: true },
    

    // quiet: true,

    // proxy: isProxy ? {
    //     "/api/h5/**/*.json": {
    //         //target: urlConfig.production.ajaxUrl,
    //         target: "http://localhost:3000/",
    //         pathRewrite: {
    //             "^/api/h5/": ""
    //         },
    //         /*onProxyReq: function(proxyReq, req, res) {
    //             proxyReq.setHeader('content-type', 'application/x-www-form-urlencoded');
    //         },*/
    //         cookieDomainRewrite: {
    //             // "unchanged.domain": "unchanged.domain",
    //             // "old.domain": "new.domain",
    //             //"*": ".mideaepay.com"
    //         },
    //         bypass: function(req) {
    //             // if(req.url === "/api/nope") {
    //             // 	return "/bypass.html";
    //             // }
    //         },
    //         // ws: false,
    //         // ignorePath: true,
    //         changeOrigin: true,
    //         secure: false
    //     }

    // } : {}
}


module.exports = {
  entry: entries,
  output: {
    filename: '[name].js?[hash:8]',
    path: path.resolve(__dirname, config.debug.path)
  },
  optimization: {
    minimize: false
  }
  ,
  plugins: [
    new CleanWebpackPlugin([config.debug.path]),
    ...webpackHtml,
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin()

  ],
  // resolve: {
  //   //指定引用模块的查询地址
  //   modules: ["node_modules"],
  //   extensions: ['', '.ts', '.tsx', '.js']
  // },
  // devtool: 'inline-source-map',
  // devServer
};