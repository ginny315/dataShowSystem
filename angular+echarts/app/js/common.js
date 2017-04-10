'use strict';
define(['angular', 'host'], function(angular, host) {
    return angular.module('app.common', [])
        .config(['$locationProvider', '$httpProvider', function($locationProvider, $httpProvider) {
            // $locationProvider.html5Mode({
            //     enabled: true,
            //     requireBase: false
            // });

            $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

            // Override $http service's default transformRequest
            $httpProvider.defaults.transformRequest = [function(data) {
                /**
                 * The workhorse; converts an object to x-www-form-urlencoded serialization.
                 * @param {Object} obj
                 * @return {String}
                 */
                var param = function(obj) {
                    var query = '';
                    var name, value, fullSubName, subName, subValue, innerObj, i;
                    for (name in obj) {
                        value = obj[name];
                        if (value instanceof Array) {
                            for (i = 0; i < value.length; ++i) {
                                subValue = value[i];
                                fullSubName = name + '[' + i + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        } else if (value instanceof Object) {
                            for (subName in value) {
                                subValue = value[subName];
                                fullSubName = name + '[' + subName + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        } else if (value !== undefined && value !== null) {
                            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                        }
                    }
                    return query.length ? query.substr(0, query.length - 1) : query;
                };
                return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
            }];
        }])
        .factory('config', [function() {
            var service ={
                menuList: [{
                    text: '数据区域选择',
                    children: [{
                        text: '首页',
                        state: 'homePage'
                    },{
                        text: 'pageA',
                        state: 'pageA'
                    }]
                }],
                provinceList:[
                    {name:'北京',value:'beijing'},
                    {name:'天津',value:'tianjing'},
                    {name:'河北',value:'hebei'},
                    {name:'山西',value:'shanxi'},
                    {name:'内蒙古',value:'neimenggu'},
                    {name:'辽宁',value:'liaoning'},
                    {name:'吉林',value:'jilin'},
                    {name:'黑龙江',value:'heilongjiang'},
                    {name:'上海',value:'shanghai'},
                    {name:'江苏',value:'jiangsu'},
                    {name:'浙江',value:'zhejiang'},
                    {name:'安徽',value:'anhui'},
                    {name:'福建',value:'fujian'},
                    {name:'江西',value:'jiangxi'},
                    {name:'山东',value:'shandong'},
                    {name:'河南',value:'henan'},
                    {name:'湖北',value:'hubei'},
                    {name:'湖南',value:'hunan'},
                    {name:'广东',value:'guangdong'},
                    {name:'广西',value:'guangxi'},
                    {name:'海南',value:'hainan'},
                    {name:'重庆',value:'chongqing'},
                    {name:'四川',value:'sichuan'},
                    {name:'贵州',value:'guizhou'},
                    {name:'云南',value:'yunnan'},
                    {name:'西藏',value:'xizang'},
                    {name:'陕西',value:'shaanxi'},
                    {name:'甘肃',value:'gansu'},
                    {name:'青海',value:'qinghai'},
                    {name:'宁夏',value:'ningxia'},
                    {name:'新疆',value:'xinjiang'},
                    {name:'全国',value:''},
                ]
            };
            return service;
        }])
        .factory('httpData', ['$rootScope','$http', '$q', 'config', '$location','$state',
            function($rootScope,$http, $q, config, $location,$state) {
            this.DEBUG = false;
            this.domainUrl = this.DEBUG ? '../app/data': host.api;
            this.method = this.DEBUG ? 'get' : 'post';
            this.suffix = this.DEBUG ? '.json' : '';

            var that = this,
                service = {},
                localData = {};

                //TODO:需要修改主要参数
             function setPostInfo(infoObj) {
                var dataObj = infoObj.data || {};
                //var localToken = config.getToken('crm_info')? JSON.parse(config.getToken('crm_info')):{};
                var postData = {
                    // "token": localToken.token,
                    // "login_id": localToken.userId,
                    // "user_role": localToken.userRole,
                    // "user_name": localToken.userName,
                    // "platform_id": localToken.platformId,
                    // "current_time": localToken.currentTime

                } ;
                //postData.biz_data =  JSON.stringify(dataObj);
                // Object.keys(dataObj).forEach(function(key) {
                //    postData[key] = dataObj[key]
                // });
                var deferred = $q.defer();
                 $http({
                    method: that.method,
                    url: that.domainUrl + infoObj.url + that.suffix,
                    data: dataObj,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;',
                        'Accept':undefined
                    }
                    // withCredentials: true
                },{
                    ignoreLoadingBar: true
                }).then(function successCallback(response) {
                    var res = response.data;
                    if (res.ret === 1) {
                        deferred.resolve(res.data);
                    } else {
                        if(res.msg == "用户未登陆"){
                            alert(res.msg);
                            window.location.href="login.html"
                        }else{
                            alert(res.msg);
                        }
                    }
                }, function errorCallback(response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            }

            function setPostFile(infoObj) {
                infoObj.data.append('type','2');
                return $.ajax({
                    url:that.domainUrl + infoObj.url + that.suffix,
                    data:infoObj.data,
                    type:'post',
                    processData : false,
                    contentType : false
                });
            }


            // service.getVersion = function (data) {
            //     return setPostInfo({
            //         url:'../common/system/getSystemVersionMax',
            //         data:data
            //     })
            // };
            //请求商品名称
            service.queryNameByPmId = function (data) {
                return setPostInfo({
                    url:'/crm/userSendBenefit/queryNameByPmId',
                    data:data
                })
            };
            //上传图片
            service.sendPic = function (data) {
                return setPostFile({
                    url:'/crm/upload/uploadFile',
                    data:data
                })
            };
            //获取所有类目
            service.getAllCategory = function (data) {
                return setPostInfo({
                    url:'/crm/userSendBenefit/getCatComboboxAll?col_name=cat1_name&col_id=cat1_id&filter_name=cat1_name',
                    data:data
                })
            };
            //获取症状目录
            service.getAllSymptom = function (data) {
                return setPostInfo({
                    url:'/crm/userSendBenefit/getSymptomCombobox',
                    data:data
                })
            }
            //症状类目数量获取
            service.queryStatByZzp = function (data) {
                return setPostInfo({
                   url:'/crm/userSendBenefit/queryStatByZzp',
                    data:data
                });
            };
            //购买类目的数据请求(请求显示的实时数据)
            service.queryStatByCatId = function (data) {
                return setPostInfo({
                    url:'/crm/userSendBenefit/queryStatByCatId',
                    data:data
                })
            };
            //请求单品操作行为数量
            service.queryStatByPmId = function (data) {
                return setPostInfo({
                    url:'/crm/userSendBenefit/queryStatByPmId',
                    data:data
                })
            };
            //请求符合条件的效果条目
            service.querySmslog = function (data) {
                return setPostInfo({
                    url: '/crm/userSendBenefit/query/smslog',
                    data:data
                })
            };
            //请求多个商品名
            service.queryNameByPmId = function (data) {
                return setPostInfo({
                    url:'/crm/userSendBenefit/queryNameByPmId',
                    data:data
                })
            }
            //查询用户数
             service.queryCrmPersonas = function (data) {
                  return setPostInfo({
                      url:'/crm/userSendBenefit/query/queryCrmPersonas',
                      data:data
                  })
             }
            //发送优惠信息
            service.sendInfo = function (data) {
                return setPostInfo({
                    url:'/crm/userSendBenefit/send/information',
                    data:data
                })
            };
            //发送结果轮询查询
            service.sendInfoAsk = function (data) {
                return setPostInfo({
                    url:'/crm/userSendBenefit/query/querySendCount',
                    data:data
                })
            }
            return service;
        }])
        .factory('math', [function() {
            return {
                numAdd: function(num1, num2) {
                    /**
                     * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
                     * 
                     * @param num1加数1 | num2加数2
                     */
                    var baseNum, baseNum1, baseNum2;
                    try {
                        baseNum1 = num1.toString().split(".")[1].length;
                    } catch (e) {
                        baseNum1 = 0;
                    }
                    try {
                        baseNum2 = num2.toString().split(".")[1].length;
                    } catch (e) {
                        baseNum2 = 0;
                    }
                    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
                    return Math.round(num1 * baseNum + num2 * baseNum) / baseNum;
                },
                numSub: function(num1, num2) {
                    /**
                     * 减法，避免数据相减小数点后产生多位数和计算精度损失。
                     * 
                     * @param num1被减数  |  num2减数
                     */
                    var baseNum, baseNum1, baseNum2;
                    var precision; // 精度
                    try {
                        baseNum1 = num1.toString().split(".")[1].length;
                    } catch (e) {
                        baseNum1 = 0;
                    }
                    try {
                        baseNum2 = num2.toString().split(".")[1].length;
                    } catch (e) {
                        baseNum2 = 0;
                    }
                    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
                    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
                    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
                },
                numMulti: function(num1, num2) {
                    /**
                     * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
                     * 
                     * @param num1被乘数 | num2乘数
                     */
                    var baseNum = 0;
                    try {
                        baseNum += num1.toString().split(".")[1].length;
                    } catch (e) {}
                    try {
                        baseNum += num2.toString().split(".")[1].length;
                    } catch (e) {}
                    return Number(num1.toString().replace(".", "")) *
                        Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
                },
                numDiv: function(num1, num2) {
                    /**
                     * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
                     * 
                     * @param num1被除数 | num2除数
                     */
                    var baseNum1 = 0,
                        baseNum2 = 0;
                    var baseNum3, baseNum4;
                    try {
                        baseNum1 = num1.toString().split(".")[1].length;
                    } catch (e) {
                        baseNum1 = 0;
                    }
                    try {
                        baseNum2 = num2.toString().split(".")[1].length;
                    } catch (e) {
                        baseNum2 = 0;
                    }
                    baseNum3 = Number(num1.toString().replace(".", ""));
                    baseNum4 = Number(num2.toString().replace(".", ""));
                    return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
                }
            }
        }])
        //表单文件上传
        .directive('customOnChange', function() {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var onChangeHandler = scope.$eval(attrs.customOnChange);
                    element.bind('change', onChangeHandler);
                }
            };
        })
        .directive('backImg', function(){
            return function(scope, element, attrs){
                attrs.$observe('backImg', function(value) {
                    element.css({
                        'background-image': 'url(' + value +')',
                        'background-size' : 'cover',
                        'background-repeat':'no-repeat'
                    });
                });
            };
        })
        .controller('common_ModalInstanceCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
            $scope.ok = function() {
                $uibModalInstance.close();
            };
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }])

});
