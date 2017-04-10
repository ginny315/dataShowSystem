/**
 * Created with IntelliJ IDEA.
 * User: Mateusz
 * Date: 14.11.12
 * Time: 18:58
 */
'use strict';
var systemInfo = {
    version:'1.0.0',
    debug:true
};

(function () {
    document.getElementById('version').innerHTML=systemInfo.version;
})();

require.config({
    //baseUrl: 'js',
    waitSeconds: 0,
    paths: {
        text: '../lib/text/text',
        jquery: '../lib/jquery/dist/jquery.min',
        angular: '../lib/angular/angular',
        bootstrap: '../lib/bootstrap/dist/js/bootstrap',
        bindonce: '../lib/angular-bindonce/bindonce.min',
       
       
        uiRoute: '../lib/angular-ui-router/release/angular-ui-router',
        oclazyload: '../lib/oclazyload/dist/ocLazyLoad',
        ngAnimate:'../lib/angular-animate/angular-animate.min',
        ngLoading:'../lib/angular-loading-bar/build/loading-bar.min',
        ngtable: '../lib/ng-table/dist/ng-table.min',
        ngBootstrap: '../lib/angular-bootstrap/ui-bootstrap',
        ngBootstrapTpls: '../lib/angular-bootstrap/ui-bootstrap-tpls',
        ngEcharts:'../lib/angular-echarts/dist/angular-echarts.min',
        echarts:'../lib/echarts/dist/echarts',
        china:'../lib/map/js/china',
        
        app: 'app',
        host:'../host',
        common: 'common'

    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'bindonce': {
            deps: ['angular']
        },
        'ngBootstrap': {
            deps: ['angular']
        },
        'ngBootstrapTpls': {
            deps: ['ngBootstrap', 'angular']
        },
        'ngtable': {
            deps: ['angular']
        },
        'uiRoute': {
            deps: ['angular']
        },
        'oclazyload': {
            deps: ['angular']
        },
        'ngAnimate': {
            deps: ['angular']
        },
        'ngLoading': {
            deps: ['angular']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'ngEcharts': {
            deps: ['echarts','angular','china']
        },
        'echarts': {
            exports:'echarts'
        },
        'china': {
            exports:'china',
            deps: ['echarts']
        }
    },
    priority: [
        'angular'
    ]
    // urlArgs: "v="+(systemInfo.debug? (new Date()).getTime():systemInfo.version)
});

require([
    'angular',
    'jquery',
    'echarts',
    'china',
    'app',
    'routes',
    'bootstrap',
    'ngEcharts',
], function(angular,$,echarts,china) {
    //This function will be called when all the dependencies
    //listed above are loaded. Note that this function could
    //be called before the page is loaded.
    //This callback is optional.
    window.echarts = echarts;
    window.china = china;
    $(document).ready(function() {
        console.log(china)
        var appName = $('body').attr('data-ngApp');
        angular.bootstrap(document, [appName]);
    });
});
