/**
 * 默认使用蚂蚁金服 antd组件，如果不需要antd的话，就需要修改js的loader
 * @type {webpack}
 */
const webpack = require('webpack');
const path = require('path');
const env = require('./Env/env');

const nodeModelDir = path.join(__dirname, 'node_modules');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
// const HtmlwebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

//  process.env.NODE_ENV
const deps = [
  'react/dist/react.min.js',
  'react-router/dist/react-router.min.js',
  'moment/min/moment.min.js',
  'underscore/underscore-min.js',
  'antd/dist/antd.min.js',
  'lodash/lodash.js',
];

//  引用环境属性，根据profile属性来修改webpack属性
const envPlugin = new webpack.DefinePlugin({ __ENV__: JSON.stringify(env) });

const config = {
  entry: {
    app: ['babel-polyfill', './App/index.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    alias: [],
  },
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  //   _: 'lodash',
  //   antd: 'antd',
  // },
  plugins: [
    envPlugin,
    //  生成 index.html 插件
    // , new HtmlwebpackPlugin({
    //  D:\\nodeJs\\     title: 'Webpack-demos',
    //     filename: 'index.html'
    // })
    new LodashModuleReplacementPlugin(),
    //  提取公用js插件
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: "common",
    //     filename: "js/common.js",
    //     chunks: ['index', 'detail']
    // })
  ],
  module: {
    loaders: [
      {
        test: /\.(css)$/,
        loaders: ['style-loader', 'css-loader?modules&localIdentName=[local]-[hash:base64:5]', 'less-loader'],
      },
      {
        test: /\.(less)$/,
        loader: 'style-loader!css-loader!less-loader',
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader?limit=8192',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [['import', {
            libraryName: 'antd',
            style: true, // or 'css'
          }]],
        },
      },
    ],
    noParse: [],
  },
};
  //  开发者模式
if (process.env.NODE_ENV === 'develop') {
  //  热响应插件
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  //  弹出界面插件
  config.plugins.push(
    new OpenBrowserPlugin({
      url: 'http://localhost:9999',
    }));
  //  "source-map";// #eval-
  config.devtool = 'source-map';
  //  代理设置
  config.devServer = {
    port: 9999,
    proxy: {
      '/api/*': {
        host: 'localhost',
        target: 'http://localhost:8080/api',
        secure: false,
        withCredentials: true,
        pathRewrite: {
          '^/api/': '',
        },
      },
    },
  };
} else {
  config.plugins.push(new UglifyJsPlugin({
    compress: {
      warnings: false,
    },
    sourceMap: false,
  }));
}

deps.forEach((dep) => {
  const depPath = path.resolve(nodeModelDir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

module.exports = config;
