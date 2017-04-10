/**
 * Created by guoningyan on 29/03/2017.
 */
define(['zepto','fastclick','template','host','common','ui','echarts','china','specialOption'], function ($,fastclick,template,host,common,ui,echarts,china,specialOption ) {
    fastclick.attach(document.body);
    var exports = {
        $rootDom: $('body'),
        options:{
            type: "line",
            title: {
                "text": "这是新title",
                "subtext": "纯属虚构"
            }
        },
        init: function () {
            var that = this;
            that.getData();
            that.getMenuList();

            var options = that.options;
            var modules = JSON.stringify(options);
            var data = [11, 11, 15, 13, 12, 13, 10].join(',');//测试data，实际没用到
            $('iframe')[0].src = host.api+'chartShow.html?target=home'+'&modules='+modules+'&data='+encodeURI(data)+'&interface=';
        },
        getData: function () {
            var that = this;
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
            chooseChart.on('change',function (e) {
                var currentChart = chooseChart.val();
                var iframe = $('iframe')[0];
                var urlParams = common.dealIframeParam(iframe.src);
                if(urlParams.modules){
                    var newModules = JSON.parse(decodeURI(urlParams.modules));
                    newModules.type = currentChart;
                    iframe.src = host.api+'chartShow.html?target='+urlParams.target+'&modules='+JSON.stringify(newModules)+'&data='+urlParams.data+'&interface=';
                }else{
                    alert('请先选择需要展示的模块～');
                }
            });
            secondLink.on('click',function (e) {
                var target = e.target.dataset.target;
                var iframe = $('iframe')[0];
                if(target != common.dealIframeParam(iframe.src).target) {
                    console.log('new')
                    var options = that.options;
                    var modules = JSON.stringify(options);
                    var data = [11, 11, 15, 13, 12, 13, 10].join(',');//测试data，实际没用到
                    iframe.src = host.api + 'chartShow.html?target=' + target + '&modules=' + modules + '&data=' + encodeURI(data) + '&interface=';
                }
            })
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