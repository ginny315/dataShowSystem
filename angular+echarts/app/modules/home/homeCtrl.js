/**
 * Created by ginny on 17/02/20.
 */
angular.module('home', ['app.common', 'pasvaz.bindonce', 'ngTable', 'ui.bootstrap','angular-echarts'])
    .run(['ngTableDefaults', function(ngTableDefaults) {
        ngTableDefaults.params.count = 10;
        ngTableDefaults.settings.counts = [];
    }])
    .controller('homeCtrl', ['$scope', 'config', 'httpData','$stateParams', '$state',
        function($scope, config, httpData,$stateParams,$state) {
            var main = {};

            init();

            function init() {
                $scope.$emit('setCurrentState', 'homePage');
            }


            var pageload = {
                name: 'page.load',
                datapoints: [
                    { x: 2001, y: 1012 },
                    { x: 2002, y: 1023 },
                    { x: 2003, y: 1045 },
                    { x: 2004, y: 1062 },
                    { x: 2005, y: 1032 },
                    { x: 2006, y: 1040 },
                    { x: 2007, y: 1023 },
                    { x: 2008, y: 1090 },
                    { x: 2009, y: 1012 },
                    { x: 2010, y: 1012 },
                ]
            };

            var firstPaint = {
                name: 'page.firstPaint',
                datapoints: [
                    { x: 2001, y: 22 },
                    { x: 2002, y: 13 },
                    { x: 2003, y: 35 },
                    { x: 2004, y: 52 },
                    { x: 2005, y: 32 },
                    { x: 2006, y: 40 },
                    { x: 2007, y: 63 },
                    { x: 2008, y: 80 },
                    { x: 2009, y: 20 },
                    { x: 2010, y: 25 },
                ]
            };

            $scope.config = {
                title: 'Line Chart',
                subtitle: 'Line Chart Subtitle',
                debug: true,
                showXAxis: true,
                showYAxis: true,
                showLegend: true,
                stack: false,
            };

            $scope.configBar = {
                title: 'Bar Chart',
                subtitle: 'Bar Chart Subtitle',
                debug: true,
                showXAxis: true,
                showYAxis: true,
                showLegend: true,
                stack: false,
            };

            $scope.configPie = {
                title: 'Pie Chart',
                subtitle: 'Pie Chart Subtitle',
                debug: true,
                showXAxis: true,
                showYAxis: true,
                showLegend: true,
                stack: false,
                // legend: {
                //     orient : 'vertical',
                //     x : 'left',
                //     data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                // },
            };

            var piePaint = {
                name: 'page.firstPaint',
                datapoints: [
                    { x: 2001, y: 22 },
                    { x: 2002, y: 13 },
                    { x: 2003, y: 35 },
                    { x: 2004, y: 52 },
                    { x: 2005, y: 32 },
                    { x: 2006, y: 40 },
                ]
            };

            var dataChina = {
                title : {
                    text: 'iphone销量',
                    subtext: '纯属虚构',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    x:'left',
                    data:['iphone3','iphone4','iphone5']
                },
                dataRange: {
                    min: 0,
                    max: 2500,
                    x: 'left',
                    y: 'bottom',
                    text:['高','低'],           // 文本，默认为数值文本
                    calculable : true
                },
                toolbox: {
                    show: true,
                    orient : 'vertical',
                    x: 'right',
                    y: 'center',
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                roamController: {
                    show: true,
                    x: 'right',
                    mapTypeControl: {
                        'china': true
                    }
                },
                series : [
                    {
                        name: 'iphone3',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        itemStyle:{
                            normal:{label:{show:true}},
                            emphasis:{label:{show:true}}
                        },
                        data:[
                            {name: '北京',value: Math.round(Math.random()*1000)},
                            {name: '天津',value: Math.round(Math.random()*1000)},
                            {name: '上海',value: Math.round(Math.random()*1000)},
                            {name: '重庆',value: Math.round(Math.random()*1000)},
                            {name: '河北',value: Math.round(Math.random()*1000)},
                            {name: '河南',value: Math.round(Math.random()*1000)},
                            {name: '云南',value: Math.round(Math.random()*1000)},
                            {name: '辽宁',value: Math.round(Math.random()*1000)},
                            {name: '黑龙江',value: Math.round(Math.random()*1000)},
                            {name: '湖南',value: Math.round(Math.random()*1000)},
                            {name: '安徽',value: Math.round(Math.random()*1000)},
                            {name: '山东',value: Math.round(Math.random()*1000)},
                            {name: '新疆',value: Math.round(Math.random()*1000)},
                            {name: '江苏',value: Math.round(Math.random()*1000)},
                            {name: '浙江',value: Math.round(Math.random()*1000)},
                            {name: '江西',value: Math.round(Math.random()*1000)},
                            {name: '湖北',value: Math.round(Math.random()*1000)},
                            {name: '广西',value: Math.round(Math.random()*1000)},
                            {name: '甘肃',value: Math.round(Math.random()*1000)},
                            {name: '山西',value: Math.round(Math.random()*1000)},
                            {name: '内蒙古',value: Math.round(Math.random()*1000)},
                            {name: '陕西',value: Math.round(Math.random()*1000)},
                            {name: '吉林',value: Math.round(Math.random()*1000)},
                            {name: '福建',value: Math.round(Math.random()*1000)},
                            {name: '贵州',value: Math.round(Math.random()*1000)},
                            {name: '广东',value: Math.round(Math.random()*1000)},
                            {name: '青海',value: Math.round(Math.random()*1000)},
                            {name: '西藏',value: Math.round(Math.random()*1000)},
                            {name: '四川',value: Math.round(Math.random()*1000)},
                            {name: '宁夏',value: Math.round(Math.random()*1000)},
                            {name: '海南',value: Math.round(Math.random()*1000)},
                            {name: '台湾',value: Math.round(Math.random()*1000)},
                            {name: '香港',value: Math.round(Math.random()*1000)},
                            {name: '澳门',value: Math.round(Math.random()*1000)}
                        ]
                    },
                    {
                        name: 'iphone4',
                        type: 'map',
                        mapType: 'china',
                        itemStyle:{
                            normal:{label:{show:true}},
                            emphasis:{label:{show:true}}
                        },
                        data:[
                            {name: '北京',value: Math.round(Math.random()*1000)},
                            {name: '天津',value: Math.round(Math.random()*1000)},
                            {name: '上海',value: Math.round(Math.random()*1000)},
                            {name: '重庆',value: Math.round(Math.random()*1000)},
                            {name: '河北',value: Math.round(Math.random()*1000)},
                            {name: '安徽',value: Math.round(Math.random()*1000)},
                            {name: '新疆',value: Math.round(Math.random()*1000)},
                            {name: '浙江',value: Math.round(Math.random()*1000)},
                            {name: '江西',value: Math.round(Math.random()*1000)},
                            {name: '山西',value: Math.round(Math.random()*1000)},
                            {name: '内蒙古',value: Math.round(Math.random()*1000)},
                            {name: '吉林',value: Math.round(Math.random()*1000)},
                            {name: '福建',value: Math.round(Math.random()*1000)},
                            {name: '广东',value: Math.round(Math.random()*1000)},
                            {name: '西藏',value: Math.round(Math.random()*1000)},
                            {name: '四川',value: Math.round(Math.random()*1000)},
                            {name: '宁夏',value: Math.round(Math.random()*1000)},
                            {name: '香港',value: Math.round(Math.random()*1000)},
                            {name: '澳门',value: Math.round(Math.random()*1000)}
                        ]
                    },
                    {
                        name: 'iphone5',
                        type: 'map',
                        mapType: 'china',
                        itemStyle:{
                            normal:{label:{show:true}},
                            emphasis:{label:{show:true}}
                        },
                        data:[
                            {name: '北京',value: Math.round(Math.random()*1000)},
                            {name: '天津',value: Math.round(Math.random()*1000)},
                            {name: '上海',value: Math.round(Math.random()*1000)},
                            {name: '广东',value: Math.round(Math.random()*1000)},
                            {name: '台湾',value: Math.round(Math.random()*1000)},
                            {name: '香港',value: Math.round(Math.random()*1000)},
                            {name: '澳门',value: Math.round(Math.random()*1000)}
                        ]
                    }
                ]

        }

            $scope.data = [ firstPaint ];
            $scope.multiple = [pageload, firstPaint ];
            $scope.dataPie = [piePaint];
            $scope.dataChina = [dataChina];


        }])
