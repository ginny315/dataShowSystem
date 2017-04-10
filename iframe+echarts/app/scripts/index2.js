/**
 * Created by guoningyan on 29/03/2017.
 */
define(['zepto','fastclick','template','host','common','ui','echarts','china','specialOption'], function ($,fastclick,template,host,common,ui,echarts,china,specialOption ) {
    fastclick.attach(document.body);
    var exports = {
        $rootDom: $('body'),
        init: function () {
            var that = this;
            var urlBase = window.location.href.split('?')[0];
            var iframe = $('iframe')[0];
            var hash;
            hash=(!window.location.hash)?"#home":window.location.hash;
            that.getMenuList();
            iframe.src = host.api+'chartShow2.html'+hash;
            //iframe.onload = function () {
                console.log('iframe init1')
                that.getData();
                //window.history.replaceState({},"",urlBase+'#home');
            //}
            window.location.hash=hash;

        },
        //TODO:第一次请求配置文件为了获取modules长度，设置高度，以后可以优化
        getData: function () {
            var that = this;
            var doResultConfig = function (response) {
                var len = response.modules.length;
                $('iframe')[0].height = 320 * len;
            }
            common.commonAjax({reqType:'get'}, '/config/home.json',doResultConfig);
            that.renderUI();
        },
        renderUI: function () {
            var that = this;
            that.bindUI();
        },
        bindUI: function () {
            var that = this;
            var chooseChart = $('#chooseChart');
            var secondLink = $('.second-level');
            var iframe = $('iframe')[0];

            secondLink.on('click',function (e) {
                var target = e.target.dataset.target;
                //var urlBase = window.location.href.split('?')[0];
                //if(target != common.dealIframeParam(iframe.src).target) {
                if(target != window.location.hash.slice(1)){

                    console.log('00')
                    //iframe.src = host.api + 'chartShow2.html?target=' + target;
                    //iframe.onload = function () {
                        //window.history.pushState({},"",urlBase+'#'+target);
                        that.getData();
                    //}
                    window.location.hash=target;
                }
            });
            window.onhashchange = function () {
                console.log('hash change')
                iframe.src = host.api + 'chartShow2.html' + window.location.hash;
            }
        },
        getMenuList: function () {
            var that = this;
            var doResult = function (res) {
                if (res.ret == 1) {
                    that.renderMenuList({menuList:res.data.menuList});
                    that.bindUI();
                }
                else ui.showPrompt(res.msg)
            }
            common.commonAjax({reqType:'get'}, '/data/analysis/menuData.json',doResult);
        },
        renderMenuList: function (obj) {
            var that = this;
            var html =template('menu_list_template', obj);
            that.$rootDom.prepend(html);
        },
    };
    exports.init();
    return exports;
})