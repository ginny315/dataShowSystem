#### 项目结构
- 项目搭建
  - 基于requirejs模块化，引入echarts数据图表展示
  - 公用数据请求
  
- 使用相关
  - 打包：root目录下 sh ./deploy.sh
  - 启动：app目录下 fis3 server start (fis3 server open 打开编译完成的目录，可以清空缓存)
  - 监控修改 app目录下 fis3 release -wL 

- 代码相关

- ws配置
less watcher ../styles/$FileNameWithoutExtension$.css

- 项目结构
   
```
|---app
|------styles ---样式
|------data  ---模拟json数据
|------images  ---资源图片 
|------scripts

|------README.md
|------index.html 启动文件
|------host.js 环境选择
|------fis-conf.js 
|----deploy.sh --打包脚本

```

#### 项目地址
