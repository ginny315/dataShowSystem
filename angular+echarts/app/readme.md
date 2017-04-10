#### 项目结构
- 使用相关
  - 打包：root目录下 sh ./deploy.sh
  - 新增库文件， bower install ***，在lib同级目录下执行（添加在lib目录下），js/main.js中添加依赖，配置fis-conf.js


- 代码相关


- ws配置
less watcher ../css/$FileNameWithoutExtension$.css

- 项目结构
   
```
|---app
|------css【不动】  ---编译后的css文件
|------data  ---模拟json数据
|------img  ---资源图片 
|------lib   ---模块库

|------js 公用js目录
|---------app.js  ---root，这个项目中相当于头部control
|---------common.js  ---factory，新增接口需要添加service
|---------main.js  ---入口文件，发布前改版本，新增插件配置
|---------math.js 【不动】
|---------route.js  ---路由文件，通过状态控制路由，新增模块需要增加状态

|------less 
|---------lib  ---样式库文件
|---------index.less   ---所有样式在这个文件中改

|------lib 库文件

|------modules ---模块
|---------marketing 群发营销
|------------filter 群发用户筛选

|---------common
|------------directive
|---------------slider ---图片预览弹层

|------package.json ---配置文件
|------README.md
|------index.html 启动文件
|------host.js 环境选择
|------fis-conf.js 
|----deploy.sh --打包脚本

```

#### 项目地址
线上地址：http://crm.111.com.cn/crm2/index.html#/

-  这里有个要注意的逻辑
   发送信息页面，确认发送-弹框确认-请求信息发送（回调中有type_id，收到后发送ajax）
   
- 【注意】
   这个项目注定会坑，原因：
   后端错误完全无提示，一个tomcat报错或者jsp错误页面，前端无法判断。
   筛选查询耗时长，请求回不来需要处理
   时间戳还要转成string，我已经写过一个函数处理了