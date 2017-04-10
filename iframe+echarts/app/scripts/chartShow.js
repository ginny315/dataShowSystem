/**
 * Created by guoningyan on 30/03/2017.
 */
define(['zepto','fastclick','common','ui','echarts','china','specialOption'], function ($,fastclick,common,ui,echarts,china,specialOption ) {
    fastclick.attach(document.body);
    var exports = {
        $rootDom: $('body'),
        init: function () {
            var that = this;
            that.getData();
            //alert(111);
        },
        getData: function () {
            var that = this;
            var urlParams = common.getLocationParam();
            if(urlParams.modules){
                var doResult = function (res) {
                    if (res.ret == 1) {
                        var option = JSON.parse(decodeURI(urlParams.modules));
                        localStorage.removeItem('dataCurrent');
                        localStorage.setItem('dataCurrent', JSON.stringify(res.data));
                        that.renderUI({
                            option:option,
                            data:res.data
                        });
                    }
                    else ui.showPrompt(res.msg)
                }
                common.commonAjax({reqType:'get'}, '/data/analysis/salesData.json',doResult)
            }
        },
        renderUI: function (renderData) {
            var that = this;
            that.initEcharts('chart',renderData.option,renderData.data);
            that.bindUI()
        },
        bindUI: function () {
            var that = this;
        },
        initEcharts:function (id,option,data) {
            var type = option.type;
            if(type == 'line'){
                echarts.init(document.getElementById(id)).
                setOption(specialOption.setLineOptions(option,data));
            }else if(type == 'bar'){
                echarts.init(document.getElementById(id)).
                setOption(specialOption.setBarOptions(option,data));
            }else if(type == 'pie'){
                echarts.init(document.getElementById(id))
                    .setOption(specialOption.setPieOptions(option,[
                        {value:11,name:'周一'},
                        {value:11,name:'周二'},
                        {value:15,name:'周三'},
                        {value:13,name:'周四'},
                        {value:12,name:'周五'},
                        {value:13,name:'周六'},
                        {value:10,name:'周日'}
                    ]));
            }else if(type == 'china'){
                echarts.init(document.getElementById(id)).setOption(specialOption.setChinaGraphicOoption());
            }else{}
        }
    };
    exports.init();

    return exports;
})