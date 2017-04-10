/**
 * Created by guoningyan on 01/04/2017.
 */
define(['zepto'], function ($) {
    var exports = {};

    exports.setBaseParams = function () {
        var params = {
            title: {
                text: '默认配置标题',
                subtext: '默认配置副标题',
                textStyle: {
                    color: '#ccc'
                }
            },
            //可能需要展示多个数据，series为数组，item是数组元素
            seriesItem:{
                type:'',
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            }
        };
        return params;
    }
    exports.setLineOptions = function (newOption,data) {
        var that = this;
        var series = [],xAxisData = [],legendData = [];
        var currentParams = null,newParams = {};

        data.forEach(function (value) {
            currentParams = newOption.seriesItem;
            currentParams.type = newOption.type;
            newParams = $.extend(true,{},currentParams, value);
            series.push(newParams);
            legendData.push(value.name);
        })
        newOption.series = series;
        delete newOption.seriesItem;
        newOption.legend.data = legendData;
        data[0].data.forEach(function (x) {
            xAxisData.push(x.name);
        })
        newOption.xAxis[0].data = xAxisData;
        return newOption;
    };
    exports.setBarOptions = function (newOption,data) {
        var that = this;
        var series = [],xAxisData = [],legendData = [];
        data.forEach(function (value) {
            var currentParams = newOption.seriesItem;
            currentParams.type = newOption.type;
            series.push($.extend(true,{},currentParams, value))
            legendData.push(value.name);
        })
        newOption.series = series;
        delete newOption.seriesItem;
        newOption.legend.data = legendData;
        data[0].data.forEach(function (x) {
            xAxisData.push(x.name);
        })
        newOption.xAxis[0].data = xAxisData;
        return newOption;
    };
    exports.setPieOptions = function (newOption,data) {
        newOption.series.data = data.data;
        newOption.legend.data.push(data.name);
        return newOption;
    };
    exports.setChinaGraphicOoption = function (newOption,data) {
        var that = this;
        var series = [],legendData = [];
        data.forEach(function (value) {
            var currentParams = newOption.seriesItem;
            currentParams.type = newOption.type;
            series.push($.extend(true,{},currentParams, value));
            legendData.push(value.name);
        })
        newOption.series = series;
        delete newOption.seriesItem;
        newOption.legend.data = legendData;
        return newOption;
    };


    return exports;
});

