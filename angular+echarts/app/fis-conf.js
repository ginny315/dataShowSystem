/**
 * Created by ginny on 17/2/15.
 */





//// 清除其他配置，只保留如下配置
fis.set('project.files',[
    'css/index.css',
    'js/*.js',
    'lib/angular/angular.js',
    'lib/angular-bindonce/bindonce.min.js',
    'lib/angular-bootstrap/ui-bootstrap.js',
    'lib/angular-bootstrap/ui-bootstrap-tpls.js',
    'lib/angular-datetime/**',
    'lib/angular-ui-grid/*',
    'lib/angular-ui-router/**',
    'lib/bootstrap/dist/**',
    'lib/datetimepicker/**',
    'lib/jquery/**',
    'lib/moment/**',
    'lib/ng-table/dist/**',
    'lib/oclazyload/**',
    'lib/require/*',
    'host.js',
    'modules/**',
    'index.html',
    'login.html'
]);

//初始配置
//fis.set('project.files',[
//    'css/**','js/**','lib/**','modules/**','*.html']);
//fis.match('*.js', {
//    //useHash: true,
//    // fis-optimizer-uglify-js 插件进行压缩，已内置
//    optimizer: fis.plugin('uglify-js'),
//    url:'./$0'
//});
//
//fis.match('*.css', {
//    //useHash: true,
//    // fis-optimizer-clean-css 插件进行压缩，已内置
//    optimizer: fis.plugin('clean-css'),
//    url:'./$0'
//});

/*
新配置
 */

fis.match('css/*.css',{
    optimizer: fis.plugin('clean-css')
});
fis.match("**.css", {
    url:'.$0'
});
fis.match('js/**.js',{
    optimizer: fis.plugin('uglify-js'),
    url:'.$0'
});
fis.match('lib/**.js',{
    optimizer: fis.plugin('uglify-js'),
    url:'.$0'
});
fis.match('lib/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',{
    url:'../fonts/glyphicons-halflings-regular.woff2'
});
fis.match('lib/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',{
    url:'../fonts/glyphicons-halflings-regular.woff'
});
fis.match('lib/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',{
    url:'../fonts/glyphicons-halflings-regular.ttf'
});
