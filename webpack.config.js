/**
 * 默认使用蚂蚁金服 antd组件，如果不需要antd的话，就需要修改js的loader
 * @type {webpack}
 */
var webpack = require("webpack");
var path = require("path");
var env = require("./Env/env");
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

//process.env.NODE_ENV

//引用环境属性，根据profile属性来修改webpack属性
var envPlugin = new webpack.DefinePlugin({
    __ENV__: JSON.stringify(env)
})

var webpackOptions = {
    entry: {
        app: ['babel-polyfill', "./App/index.js"],
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js',
        //filename: "bundle.js"
    },
    plugins: [envPlugin
        //生成 index.html 插件
        // , new HtmlwebpackPlugin({
        //     title: 'Webpack-demos',
        //     filename: 'index.html'
        // })
        , new LodashModuleReplacementPlugin()
        //提取公用js插件
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "common",
        //     filename: "js/common.js",
        //     chunks: ['index', 'detail']
        // })
    ],
    module: {
        loaders: [
            {test: /\.(css)$/, loaders: ['style', 'css?modules&localIdentName=[local]-[hash:base64:5]', 'less']},
            {test: /\.(less)$/, loader: `style!css!less`},
            {test: /\.(jpg|png)$/, loader: "url?limit=8192"},
            {test: /\.(eot|svg|ttf|woff|woff2)\w*/, loader: "url-loader?limit=10000&mimetype=application/font-woff"}
        ]
    },
    externals: {"react": "React", "react-dom": "ReactDOM", '_': 'lodash'}
}
console.log(process.env.NODE_ENV)

//开发者模式
if (process.env.NODE_ENV == "develop") {
    //热响应插件
    webpackOptions.plugins.push(new webpack.HotModuleReplacementPlugin());
    //弹出界面插件
    webpackOptions.plugins.push(
        new OpenBrowserPlugin({
            url: 'http://localhost:9999'
        })
    )

    webpackOptions.devtool = '#eval-source-map'//"source-map";
    //代理设置
    webpackOptions.devServer = {
        port: 8081,
        proxy: {
            '/api/*': {host: "localhost", target: "http://localhost:10001/", secure: false, withCredentials: true, pathRewrite: {"^/api/": ''}}
        }
    }
    webpackOptions.externals = Object.assign(webpackOptions.externals, {"antd": true, "moment": true})
    webpackOptions.module.loaders.push({
        test: /\.js$/, loader: "babel-loader",
        exclude: '/node_modules/',
        query: {
            compact: false,
            presets: ["react", "es2015", "stage-2"],
            plugins: [
                "transform-object-rest-spread",
                "transform-es2015-arrow-functions",
                "transform-object-assign"]
        }
    });
} else {
    webpackOptions.plugins.push(new UglifyJsPlugin({
        compress: {warnings: false},
        sourceMap: false
    }))
    webpackOptions.module.loaders.push({
        test: /\.js$/, loader: "babel-loader",
        query: {
            compact: false,
            presets: ["react", "es2015", "stage-2"],
            plugins: ["transform-object-rest-spread",
                "transform-es2015-arrow-functions",
                "transform-object-assign",
                ["import", [{
                    "libraryName": "antd",
                    "style": true
                }]]
            ]
        }
    });
}
module.exports = webpackOptions;


