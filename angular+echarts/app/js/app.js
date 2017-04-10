/**
 * Created with IntelliJ IDEA.
 * User: Mateusz
 * Date: 17.11.12
 * Time: 15:22
 */
'use strict';

define(['angular', 'math', 'bindonce', 'common', 'ngBootstrap', 'ngBootstrapTpls', 'ngtable', 'uiRoute', 'oclazyload'], function(angular, MATH) {

    var myApp = angular.module('myApp', ['app.common', 'pasvaz.bindonce', 'ngTable', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad']);
    myApp.controller('admin', ['$scope', 'config', 'httpData', function($scope, config, httpData) {
        //$scope.admin = httpData.localData.admin;

        // httpData.getVersion().then(function (response) {
        //     $scope.version = response;
        // });
        $scope.logout = function() {
            config.removeToken();
            config.removeUserName();
            window.location.href = "./login.html";
        }
    }]);
    myApp.controller('menu', ['$scope', 'config', 'httpData', function($scope, config, httpData) {
        $scope.menuList = config.menuList;
        $scope.path = "数据区域选择>首页";
        $scope.$on('setCurrentState', function(e, state) {
            $scope.currentState = state;
        })
    }]);

    return myApp;
});
