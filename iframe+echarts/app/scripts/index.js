/**
 * Created by guoningyan on 24/03/2017.
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
            var options = that.options;
            var modules = JSON.stringify(options);
            var data = [11, 11, 15, 13, 12, 13, 10].join(',');
            var newUrl =  host.api+'index.html?target=home'+'&modules='+modules+'&data='+encodeURI(data)+'&interface=';
            var json= {
                url: newUrl
            }
            window.history.replaceState(json,"",newUrl);

			that.getData();
            that.getMenuList();
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
            var chooseChart = $('#chooseChart');
            var secondLink = $('.second-level');
            chooseChart.on('change',function (e) {
                var currentChart = chooseChart.val();
                // $('.chart').hide();
                // $('#'+currentChart+'Chart').show();
                var option = JSON.parse(decodeURI(common.getLocationParam().modules));
                option.type = currentChart;
                var data = JSON.parse(localStorage.getItem('dataCurrent'));
                that.renderUI({
                    option:option,
                    data:data
                })
            });
            secondLink.on('click',function (e) {
                var target = e.target.dataset.target;
                if(target != common.getLocationParam().target){
                    var urlBase = window.location.href.split('?')[0];
                    var paramsBase = window.location.href.split('?')[1];
                    var newUrl = paramsBase && urlBase+'?target='+target+paramsBase.slice(paramsBase.indexOf('&'));
                    var json={
                        url:newUrl
                    };
                    window.history.pushState(json,"",newUrl);
                    that.getData();
                }
            })

            window.onpopstate=function() {
                var json=window.history.state;
                console.log(json)
            };
        },
        //initEcharts:function (id,type,arrMax,arrMin) {
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