'use strict';

define(['app'], function(app) {

    return app.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        $ocLazyLoadProvider.config({
            jsLoader: requirejs,
            debug: true
        });
        //默认的路由
        $urlRouterProvider.otherwise("/");
        //设置路由-状态
        $stateProvider
            .state('homePage', {
                url: "/",
                templateUrl: 'modules/home/home.html',
                controller: 'homeCtrl',
                resolve: { 
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'homeCtrl',
                            files: ['modules/home/homeCtrl.js']
                        });
                    }]
                }
            })
            .state('pageA', {
                url: "/",
                templateUrl: 'modules/analysis/analysis.html',
                controller: 'analysisCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'analysisCtrl',
                            files: ['modules/analysis/analysisCtrl.js']
                        });
                    }]
                }
            })

    }]);

    return app;
});
