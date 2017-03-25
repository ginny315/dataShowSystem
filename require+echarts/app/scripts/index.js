/**
 * Created by guoningyan on 24/03/2017.
 */
define(['zepto','fastclick','template','host','common','echarts','china','specialOption'], function ($,fastclick,template,host,common,echarts,china,specialOption ) {
	fastclick.attach(document.body);
	var exports = {
        $rootDom: $('body'),
        menuList: [
            {
            text:'页面选择',
            subMenu:[
                {name:'首页', url:'/'},
                {name:'Page1页', url:'/page1'},
                {name:'Page2页', url:'/page2'}
            ]
            }
        ],
		init: function () {
			var that = this;
			that.getData();
            //that.renderMenuList({menuList:that.menuList});
            that.getMenuList();
		},
		getData: function () {
			var that = this;
            // common.commonAjax({
            //     params:'aa'
            // }, '', doResult, null)
            that.renderUI();
		},
		renderUI: function () {
		    console.log(echarts)
			var that = this;
            var arrMax = [11, 11, 15, 13, 12, 13, 10],
                arrMin = [1, -2, 2, 5, 3, 2, 0];
            that.initEcharts('lineChart','line',arrMax,arrMin);
            that.initEcharts('barChart','bar',arrMax,arrMin);
            that.initEcharts('pieChart','pie');
            that.initEcharts('chinaChart','china');
            that.bindUI()
		},
		bindUI: function () {
			var that = this;
            var chooseChart = $('#chooseChart');
            var secondLink = $('.second-level');
            chooseChart.on('change',function (e) {
                var currentChart = chooseChart.val();
                $('.chart').hide();
                $('#'+currentChart+'Chart').show();
            });
            secondLink.on('click',function (e) {
                console.log(e.target.dataset.url);
                //TODO:根据url请求对应的图表数据，要不要缓存呢？
            })
		},
        initEcharts:function (id,type,arrMax,arrMin) {
		    if(type == 'line'){
		        echarts.init(document.getElementById(id)).
                setOption(specialOption.setLineOptions(arrMax,arrMin));
            }else if(type == 'bar'){
                echarts.init(document.getElementById(id)).
                setOption(specialOption.setBarOptions(arrMax,arrMin));
            }else if(type == 'pie'){
                echarts.init(document.getElementById(id)).setOption(specialOption.setPieOptions([
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
            common.commonAjax({reqType:'get'}, '/data/analysis/menuData.json',doResult)
        },
        renderMenuList: function (obj) {
            var that = this;
            var html =template('menu_list_template', obj);
            that.$rootDom.prepend(html);
        },
        getChartData:function () {
            
        }
    };
    exports.init();
	return exports;
})