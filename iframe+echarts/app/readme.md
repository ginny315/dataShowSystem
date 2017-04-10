### 数据展示系统两种实现方式
index.html
    单页应用实现数据展示，history版本
indexNew.html
    iframe实现数据展示，资源url传递
index2.html
    iframe实现数据展示，模块资源本地配置，维护json文件

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
iframe版本：http://127.0.0.1:8080/indexNew.html
普通SPA版本：http://127.0.0.1:8080/index.html

#### 已完成内容
specialOptions.js设置
柱状图、折线图（完全统一配置）
饼图（series只能有一个数组合适，其余同上）
中国地图（单独配置）

获取数据和配置-根据配置中的图表个数将数据渲染成数据展示系列


