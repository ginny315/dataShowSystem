/**
 * Created by guoningyan on 30/03/2017.
 */
define(['zepto','fastclick','common','ui','echarts','china','baseOption'], function ($,fastclick,common,ui,echarts,china,baseOption ) {
    fastclick.attach(document.body);
    var exports = {
        $rootDom: $('body'),
        init: function () {
            var that = this;
            that.getData();
        },
        getData: function () {
            var that = this;
            //var target = common.getLocationParam().target;
            var target = window.location.hash.slice(1);
            var address = common.mapApi(target);
            //TODO:请求后端时将唯一标识符所为参数传递
            if(address != -1){
                var doResult = function (response) {
                    response.modules.forEach(function (item,index) {
                        var doResultConfig = function (res) {
                            if (res.ret == 1) {
                                that.renderUI({
                                    index:index,
                                    option: item.options,
                                    data: res.data
                                });
                            }else
                                ui.showPrompt(res.msg)
                        }
                        common.commonAjax({reqType:'get'},item.getDataApi,doResultConfig);
                    })
                }
                common.commonAjax({reqType:'get'}, address,doResult)
            }else{
                ui.showPrompt('当前页面未配置！')
            }
        },
        renderUI: function (renderData) {
            var that = this;
            var child = $('<div></div>').addClass('chart').attr('id','chart'+renderData.index);
            child.appendTo($('.chart-container'));
            that.initEcharts('chart'+renderData.index,renderData.option,renderData.data);
            that.bindUI()
        },
        bindUI: function () {
            var that = this;
            // window.onpopstate = function () {
            //     console.log('iframe pop');
            //     that.init();
            // }
            window.onhashchange = function () {
                that.init();
            }
        },
        initEcharts:function (id,option,data) {
            var type = option.type;
            if(type == 'line'){
                echarts.init(document.getElementById(id)).
                setOption(baseOption.setLineOptions(option,data));
            }else if(type == 'bar'){
                echarts.init(document.getElementById(id)).
                setOption(baseOption.setBarOptions(option,data));
            }else if(type == 'pie'){
                echarts.init(document.getElementById(id))
                    .setOption(baseOption.setPieOptions(option,data));
            }else if(type == 'map'){
                echarts.init(document.getElementById(id)).setOption(baseOption.setChinaGraphicOoption(option,data));
            }else{}
        }
    };
    exports.init();

    return exports;
})