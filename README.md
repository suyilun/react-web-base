# react 简易脚手架-v1.0

    主要集成：
    react,react-router v4,react-redux,immutable.js,flow.js,expect.js,webpack,babel。
    

# 安装运行

```
     npm install
osx: npm run webpack-dev-osx
win: npm run webpack-dev-win
    
```
当前使用是route 中的hashHistory，url中使用#link来跳转相应界面

# 帮助

## 代码结构

``` 
    
    +App         项目代码目录
        ++Actions   主要管理redux的action的生成
        ++Layout    管理全局布局，配合router使用
        ++Reducers  redux中的reduce代码编写
        ++Router    路由功能，目前使用hashRouter做路径管理
        ++Component 具体功能模块，示例Home代码
    +package.json 依赖管理，script管理
    +webpack.config.js webpack-dev服务器，webpack服务
    +build     编译生成代码路径
        ++index.html 首页
    +index.js  webpack的entry对象
    
    
```

    


## package中使用包

dependencies

+ react,react-dom 虚拟dom框架
+ redux，react-redux,redux-thunk 类似mvc管理，分离数据
+ immutable 使json不可改变，flow 对象校验
+ axios  ajax类
+ antd  蚂蚁金服框架,可考虑集成其他框架如blueprintjs


devDependencies

+ 环境需要的包


## 参考资料

+ [阮一峰react学习](http://www.ruanyifeng.com/blog/javascript/)
+ [redux视频教学](https://egghead.io/courses/getting-started-with-redux )
+ [redux文档](http://redux.js.org/)
+ [react-router](https://reacttraining.com/react-router/)

+  其他自行google，baidu


# TODO

     继续集成环境
     尝试编写自定义表单系统












    




