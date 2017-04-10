/**
 * Created by ginny on 17/02/20.
 */
angular.module('marketingOperate', ['app.common', 'pasvaz.bindonce', 'ngTable', 'ui.bootstrap'])
    .run(['ngTableDefaults', function(ngTableDefaults) {
        ngTableDefaults.params.count = 10;
        ngTableDefaults.settings.counts = [];
    }])
    .factory('uploadFun',[function() {
        var fun = {};
         //图片上传
        fun.upload = function(form,inputFile) {
            console.log('form=',form)
            console.log('inputFile=',inputFile)
            //var imgType = $(inputFile)[0].files[0].type;
            var form_str = new FormData($(form)[0]);
            //form_str.append("prefix", 'doctor');
            form_str.append("imgFile", $(inputFile)[0].files[0]);
            //try {
            console.log('$(inputFile)[0].files[0]=',$(inputFile)[0].files[0])
                //if(!/\.(jpg|jpeg|png|JPG|PNG)$/.test(imgType.substring(6,imgType.length))){
                if(!/image\/(jpg|jpeg|png|JPG|PNG)$/.test(($(inputFile)[0].files[0].type))){
                    alert("图片格式错误");
                    return false;
                }
            // }catch(e) {
            //     return;
            // }
            if ($(inputFile)[0].files[0].size / (335*150) > 1) {
                alert('图片超过大小，请重试');
            } else {
                return form_str;
            }
        };
        return fun;
    }])
    .controller('marketingCtrl', ['$scope', 'config', 'httpData','$stateParams', '$state','uploadFun','$uibModal','$interval','$timeout',
        function($scope, config, httpData,$stateParams,$state,uploadFun,$uibModal,$interval,$timeout) {
            $scope.status= false;
            $scope.marketing = {
                serviceList:[
                    {name:'短信',value:0},
                    {name:'push',value:1},
                    {name:'盒子',value:2}
                ],
                serviceListText:[],
                hasChosenUser:null,//1-全部，2-筛选
                allUser:'全部用户',
                activityLinkChoose:'1',
                shortMessageInterface:'dh',//短信接口默认选择
                beforefilter:true,
                beforeall:true,
                tracker:'',
                selectParam:{},
                canSend:false,//发送条件校验
                hasSentCount:0,//已发送人数
                sendInfoList:[],
                sendResult:'发送中...',
                sendAction:''
            };
            $scope.filter = {
                actList:[
                    {name:'购买',value:'0'},
                    {name:'收藏',value:'1'},
                    {name:'加购物车',value:'2'},
                    {name:'浏览',value:'3'}
                ],
                actListText:[],
                symptomList:[],
                userTypeList:[
                    {name:'新注册',value:0},
                    {name:'新客',value:1},
                    {name:'高粘度老客',value:2},
                    {name:'低粘度老客',value:3},
                    {name:'促销敏感用户',value:4},
                    {name:'睡眠用户',value:5},
                ],
                userTypeListText:[],
                userSexList:[
                    {name:'男',value:1},
                    {name:'女',value:2}
                ],
                userSexListText:[],
                regionList:config.provinceList,
                regionListText:[''],
                dayList:['01','02','03','04','05',
                    '06','07','08','09','10',
                    '11','12','13','14','15'
                ],
                forbidDay:'07',
                productList:[],
                productList2:[],
                showSecondCat:[],
                showThirdCat:[],
                screenmask:false,
                filterParams:{},
                people:0,
                searchFinsh:null,
                notConfirm:true,
            };
            var main = {
                spollingTime:5000,//轮询时间
            };
            //确认发送-收到response之后关闭本弹框，打开发送情况展示弹框
            main.modalFun = function(callback,data) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'modules/marketing/confirm.html',
                    controller: function ($scope,$uibModalInstance) {
                        $scope.ok =  function () {
                            $scope.marketing.sendAction = '正在发送您的请求，请稍候...';
                            callback && callback(data).then(function(response) {
                                //alert('发送成功');
                                //if(response){
                                //     $uibModalInstance.close('cancel');
                                //     main.modalFunSend();
                                //}
                            });
                            $timeout(
                                function() {
                                    $uibModalInstance.close('cancel');
                                    $scope.marketing.sendAction = '';
                                    main.modalFunSend();
                                }, 1000);
                        };
                        $scope.cancel = function () {
                            $uibModalInstance.close('cancel');
                            $scope.marketing.sendAction = '';
                        }
                    },
                    scope:$scope,
                    size: 'sm'
                });
            };
            //发送消息提示
            main.modalFunSend = function(callback,data) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'modules/marketing/sending.html',
                    controller: function ($scope,$uibModalInstance) {
                        $scope.cancel = function () {
                            //clearInterval(main.myIntervel);
                            $interval.cancel(main.myIntervel);
                            $uibModalInstance.close('cancel');
                        }
                        //初始化时轮询接口，获取当前发送的实时数据
                        $scope.init = function () {
                            main.myIntervel = $interval(function(){
                                //发送信息请求 resultCode=1 全部发送成功,2 短信发送失败
                                //status 0 未发送，1发送中，2发送完成
                                httpData.sendInfoAsk({
                                    sendType:$scope.marketing.serviceListText.join(',')
                                }).then(function (response) {
                                    console.log('ask req=',response)
                                    if(response.status == '2'){//发送完成
                                        $scope.marketing.sendResult = '发送完成';
                                        $scope.marketing.hasSentCount = response.successCount;
                                        clearInterval($scope.myIntervel);
                                    }else if(response.status == '1'){
                                        $scope.marketing.hasSentCount = response.successCount;
                                    }else{
                                        console.log('status not 1 2 ')
                                    }
                                })
                            },main.spollingTime);
                        }
                        $scope.init();
                    },
                    scope:$scope,
                    size: 'sm'
                });
            };

            //获取所有症状
            main.getAllSymptom = function () {
                httpData.getAllSymptom({

                }).then(function (response) {
                    $.extend(true,$scope.filter.symptomList,response.symptomCombox)
                })
            }
            //获取所有商品类目
            main.getAllCategory = function () {
                console.log('getAllCategory')
                httpData.getAllCategory({}).then(function (response) {
                    $.extend(true,$scope.filter.productList,response.combox)
                    $.extend(true,$scope.filter.productList2,response.combox)
                })
            }
            //数字展示
            main.showDigit = function (item,type,list,newList) {
                if(newList == 'new'){
                    httpData.queryStatByCatId({
                        catId:item || '',
                        startDate:main.dealWithTime($scope.filter.buyStartTime2),
                        endDate:main.dealWithTime($scope.filter.buyEndTime2),
                        type:type || ''
                    }).then(function (response) {
                        response.catIds.forEach(function (v) {
                            list.forEach(function (value) {
                                if(value.value == v.catId)
                                    value.count = v.count;
                            });
                        })
                    })
                }else{
                    httpData.queryStatByCatId({
                        catId:item || '',
                        startDate:main.dealWithTime($scope.filter.buyStartTime),
                        endDate:main.dealWithTime($scope.filter.buyEndTime),
                        type:type || ''
                    }).then(function (response) {
                        response.catIds.forEach(function (v) {
                            list.forEach(function (value) {
                                if(value.value == v.catId)
                                    value.count = v.count;
                            });
                        })
                    })
                }
            }
            //数字展示
            main.showDigitSym = function (item,type,list) {
                httpData.queryStatByZzp({
                    catId:item || '',
                    type:type || ''
                }).then(function (response) {
                    response.symptomCatIds.forEach(function (v) {
                        list.forEach(function (value) {
                            if(value.value == v.catId)
                                value.count = v.count;
                        });
                    })
                })
            }
            //选中前操作。需要选择日期-发送请求-显示当前类目数量
            main.beforeCheckCat = function () {
                if(!$scope.filter.buyStartTime && !$scope.filter.buyEndTime){
                    alert('请先选择时间！');
                    return false;
                }else if($scope.filter.buyStartTime > $scope.filter.buyEndTime){
                    alert('开始时间必须小于结束时间');
                    return false;
                }else{
                    return true;
                }
            }
            //新建选中前操作。需要选择日期-发送请求-显示当前类目数量
            main.beforeCheckCatNew = function () {
                console.log('22')
                if(!$scope.filter.buyStartTime2 && !$scope.filter.buyEndTime2){
                    alert('请先选择时间！');
                    return false;
                }else if($scope.filter.buyStartTime2 > $scope.filter.buyEndTime2){
                    alert('开始时间必须小于结束时间');
                    return false;
                }else{
                    return true;
                }
            }
            //转换成时间戳，全部已string方式返回，无返回""
            main.dealWithTime = function (time,timeNew) {
                if(time && time.getTime() != undefined)
                    timeNew = time.getTime() + '';
                else
                    timeNew = '';
                return timeNew;
            }
            //打开筛选用户弹窗
            main.openFilterUserModel = function () {
                $scope.resuib = $uibModal.open({
                    animation: true,
                    templateUrl: 'modules/marketing/filter/filter.html?v=' + new Date().getTime(),
                    windowClass: 'custom-model-lg',
                    controller: function ($scope) {
                        var symptomTag1_id = [],symptomTag2_id = [],
                            cat1_id = [],cat2_id = [],cat3_id = [],
                            cat1_id1 = [],cat2_id1 = [],cat3_id1 = [];

                        $scope.init = function () {
                            main.getAllCategory();
                            main.getAllSymptom();
                        }
                        //筛选人数
                        $scope.filter.search = function () {
                            $scope.filter.notConfirm = false;
                            $scope.filter.searchFinsh = false;
                            var sex = "";
                            if($scope.filter.userSexListText.length == 2){
                                sex = 0;
                            }else{
                                sex = $scope.filter.userSexListText[0];
                            }

                            //症状选择集中
                            $scope.filter.symptomList.forEach(function (item1) {
                                if(item1.hasChosen && item1.hasChosen == true){
                                    symptomTag1_id.push(item1.value);
                                }
                                item1.symptomCombox2.forEach(function (item2) {
                                    if(item2.hasChosen == true){
                                        symptomTag2_id.push(item2.value);
                                    }
                                })
                            })
                            //类目购买筛选1
                            $scope.filter.productList.forEach(function (item1) {
                                if(item1.hasChosen && item1.hasChosen == true){
                                    cat1_id.push(item1.value);
                                }
                                item1.combox2.forEach(function (item2) {
                                    if(item2.hasChosen == true){
                                        cat2_id.push(item2.value);
                                    }
                                    item2.combox3.forEach(function (item3) {
                                        if(item3.hasChosen == true){
                                            cat3_id.push(item3.value);
                                        }
                                    })
                                })
                            })
                            //类目购买筛选2
                            $scope.filter.productList2.forEach(function (item1) {
                                if(item1.hasChosen && item1.hasChosen == true){
                                    cat1_id1.push(item1.value);
                                }
                                item1.combox2.forEach(function (item2) {
                                    if(item2.hasChosen == true){
                                        cat2_id1.push(item2.value);
                                    }
                                    item2.combox3.forEach(function (item3) {
                                        if(item3.hasChosen == true){
                                            cat3_id1.push(item3.value);
                                        }
                                    })
                                })
                            })

                            if($scope.filter.screenmask == false){
                                $scope.filter.forbidDay = null;
                            }

                            $scope.filter.filterParams = {
                                goodsText:$scope.filter.productId || '',//商品编码
                                start_time:main.dealWithTime($scope.filter.operateStartTime),//商品开始时间
                                end_time:main.dealWithTime($scope.filter.operateEndTime),//商品结束时间
                                actionTags:$scope.filter.actListText.join(',') || '',//操作行为标签 0购买，1收藏，2加车，3浏览
                                start_time1:main.dealWithTime($scope.filter.buyStartTime),//类目购买筛选1开始时间
                                end_time1:main.dealWithTime($scope.filter.buyEndTime),//类目购买筛选1结束时间
                                cat1_id:cat1_id.join(',') || '',//类目购买筛选1一级类目，逗号分开
                                cat2_id:cat2_id.join(',') || '',//类目购买筛选1二级类目，逗号分开
                                cat3_id:cat3_id.join(',') || '',//类目购买筛选1三级类目，逗号分开
                                relation:$scope.filter.logicRelation || '',//关系 0并，1或，2除
                                start_time2:main.dealWithTime($scope.filter.buyStartTime2),//类目购买筛选2开始时间
                                end_time2:main.dealWithTime($scope.filter.buyEndTime2),//类目购买筛选2结束时间
                                cat1_id1:cat1_id1.join(',') || '',//类目购买筛选2一级类目，逗号分开
                                cat2_id1:cat2_id1.join(',') || '',//类目购买筛选2二级类目，逗号分开
                                cat3_id1:cat3_id1.join(',') || '',//类目购买筛选2三级类目，逗号分开
                                symptomTag1_id:symptomTag1_id.join(',') || '',//症状筛选一级类目
                                symptomTag2_id:symptomTag2_id.join(',') || '',//症状筛选二级类目
                                userTypes:$scope.filter.userTypeListText.join(',') || '',//用户类型
                                userSex:sex || '',//用户性别 0全选，1男，2女
                                areaText:$scope.filter.regionListText.join(',') || '',//地域，拼音，逗号隔开
                                screenmask:$scope.filter.screenmask.toString(),//屏蔽选项:booelan
                                out_day:($scope.filter.forbidDay || 0)+'',//屏蔽天数
                            }

                             
                            httpData.queryCrmPersonas({
                                filterParams:JSON.stringify($scope.filter.filterParams) || ''
                            }).then(function (response) {
                                $scope.filter.searchFinsh = true;
                                $scope.filter.people = response.userCount;
                                //筛选人数带过去-筛选条件带过去
                                $scope.marketing.filterPeople = (response.userCount)/10000+'万';
                                $scope.marketing.selectParam = $scope.filter.filterParams;
                                console.log('$scope.marketing.selectParam=',$scope.marketing.selectParam)
                                symptomTag1_id = [];
                                symptomTag2_id = [];
                                cat1_id = [];
                                cat2_id = [];
                                cat3_id = [];
                                cat1_id1 = [];
                                cat2_id1 = [];
                                cat3_id1 = [];
                            })
                        }
                        //确认筛选
                        $scope.filter.confirm = function () {
                            $scope.marketing.beforefilter = false;
                            $scope.marketing.groupObject = 'select';
                            $scope.marketing.hasChosenUser = 2;
                            $scope.marketing.allUser = '全部用户';
                            $scope.resuib.close();
                        }
                        $scope.filter.cancel = function () {
                            $scope.resuib.close();
                        }
                        $scope.searchItemName = function () {
                            httpData.queryNameByPmId({
                                pmId:$scope.filter.productId || ''
                            }).then(function (response) {
                                $scope.filter.pmList = response.pmInfos;
                                $scope.filter.showItem = true;
                            })
                        }
                        $scope.toggleSelectionSex = function (v) {
                            main.toggleSelection(v,$scope.filter.userSexListText);
                        }
                        $scope.toggleSelectionRegion = function (v) {
                            if(v == ''){//选择全国
                                $scope.filter.regionListText = [''];
                            }else{//选择地区
                                var idx = main.inArr('',$scope.filter.regionListText);
                                if(idx === false){//没有已选全国
                                    main.toggleSelection(v,$scope.filter.regionListText);
                                }else{//已选全国，删除全国，加地区
                                    $scope.filter.regionListText.splice(idx,1);
                                    main.toggleSelection(v,$scope.filter.regionListText);
                                }
                            }
                        }
                        $scope.toggleSelectionForbidDay = function () {
                            $scope.filter.screenmask == false ? $scope.filter.screenmask=true : $scope.filter.screenmask=false;
                        }
                        //请求单品操作行为数量展示
                        $scope.toggleSelectionAct = function (item) {
                            main.toggleSelection(item.value,$scope.filter.actListText)
                            httpData.queryStatByPmId({
                                startDate:main.dealWithTime($scope.filter.operateStartTime),
                                endDate:main.dealWithTime($scope.filter.operateEndTime),
                                pmId:$scope.filter.productId || '',
                                type:item.value || ''
                            }).then(function (response) {
                                console.log('response=',response)
                                item.catIds = response.pmIdCount;
                                item.showDig = true;
                                console.log('item=',item)
                            })
                        }
                        $scope.toggleSelectionUserType = function (v) {
                            main.toggleSelection(v,$scope.filter.userTypeListText);
                        }
                        //商品类目打开对应的二级菜单 必须先输入时间判断-请求数量
                        $scope.showSecondCatFunc = function (item,shouldShow,type) {
                            if(type != 'new' && !main.beforeCheckCat()){
                                item.isShow = false;
                                return;
                            }
                            else if(type == 'new' && !main.beforeCheckCatNew()){
                                item.isShow = false;
                                return;
                            }else {
                                console.log('==showSecondCatFunc')
                                var arrCat2 = [];
                                if (shouldShow == 1) {
                                    item.isShow = true;
                                    item.showDig = true;
                                } else {
                                    item.isShow = false;
                                }
                                item.combox2.forEach(function (item2) {
                                    item2.showDig = true;
                                    arrCat2.push(item2.value);
                                });
                                //一级菜单选中时展示当前的数量
                                if(type == 'new'){
                                    main.showDigit(item.value,1,$scope.filter.productList,'new');
                                    main.showDigit(arrCat2.join(","), 2, item.combox2,'new');
                                }else{
                                    main.showDigit(item.value,1,$scope.filter.productList);
                                    main.showDigit(arrCat2.join(","), 2, item.combox2);
                                }
                            }
                        }
                        //打开对应的三级菜单
                        $scope.showThirdCatFunc = function (item,shouldShow,newList) {
                            var arrCat3 = [];
                            if(shouldShow == 1){
                                item.isShow = true;
                                item.showDig = true;
                            }else{
                                item.isShow = false;
                            }
                            item.combox3.forEach(function (item3) {
                                item3.showDig = true;
                                arrCat3.push(item3.value);
                            });
                            if(newList == 'new'){
                                main.showDigit(arrCat3.join(","),3,item.combox3,'new');
                            }else{
                                main.showDigit(arrCat3.join(","),3,item.combox3);
                            }
                        }
                        //选择一级菜单，二级三级全部选中，展示一级菜单数量
                        $scope.toggleSelectionChooseFirstCat = function (item,newList) {
                            if(newList == 'new'){
                                main.beforeCheckCatNew();
                            }else{
                                main.beforeCheckCat();
                            }
                            item.hasChosen == true ? item.hasChosen = false : item.hasChosen = true;
                            if(item.hasChosen == true){
                                item.combox2.forEach(function (value2) {
                                    value2.hasChosen = true;
                                    if(value2.hasChosen == true){
                                        value2.combox3.forEach(function (value3) {
                                            value3.hasChosen = true;
                                        })
                                    }
                                })
                            }else{
                                item.combox2.forEach(function (value2) {
                                    value2.hasChosen = false;
                                    if(value2.hasChosen == false){
                                        value2.combox3.forEach(function (value3) {
                                            value3.hasChosen = false;
                                        })
                                    }
                                })
                            }
                            //一级菜单选中时展示当前的数量
                            if(newList == 'new'){
                                main.showDigit(item.value,1,$scope.filter.productList,'new');
                            }else{
                                main.showDigit(item.value,1,$scope.filter.productList);
                            }
                            item.showDig = true;
                        }
                        //选择二级菜单，三级菜单全部选中,对应的一级父级全部选中
                        $scope.toggleSelectionChooseSecondCat = function (item2,item1,newList) {
                            if(newList == 'new'){
                                main.beforeCheckCatNew();
                            }else{
                                main.beforeCheckCat();
                            }
                            item2.hasChosen == true ? item2.hasChosen = false : item2.hasChosen = true;

                            if(item2.hasChosen == true){
                                item2.combox3.forEach(function (value3) {
                                    value3.hasChosen = true;
                                })
                            }else{
                                item2.combox3.forEach(function (value3) {
                                    value3.hasChosen = false;
                                })
                            }

                            var chooseItem2 = false;
                            item1.combox2.forEach(function (value2) {
                                if(value2.hasChosen == true)
                                    chooseItem2 = true;
                            });
                            if(item1.hasChosen != true){
                                item1.hasChosen = true;
                            }else{
                                if(chooseItem2 == false){
                                    item1.hasChosen = false;
                                }
                            }
                            if(newList == 'new'){
                                main.showDigit(item2.value,2,$scope.filter.productList,'new');
                            }else{
                                main.showDigit(item2.value,2,$scope.filter.productList);
                            }
                        }
                        //选择三级菜单，对应的一二级父级全部选中
                        $scope.toggleSelectionChooseThirdCat = function (item3,item2,item1,newList) {
                            main.beforeCheckCat();
                            item3.hasChosen == true ? item3.hasChosen = false : item3.hasChosen = true;

                            var chooseItem3 = false;
                            item2.combox3.forEach(function (value3) {
                                if(value3.hasChosen == true)
                                    chooseItem3 = true;
                            });
                            item1.combox2.forEach(function (value2) {
                                if(value2.hasChosen == true)
                                    chooseItem2 = true;
                            });

                            if(item2.hasChosen != true){
                                item2.hasChosen = true;
                            }else{//所有三级取消选中
                                if(chooseItem3 == false){
                                    item2.hasChosen = false;
                                }
                            }
                            if(item1.hasChosen != true){
                                item1.hasChosen = true;
                            }else{
                                if(chooseItem3 == false && chooseItem2 == false){
                                    item1.hasChosen = false;
                                }
                            }
                            if(newList == 'new'){
                                main.showDigit(item3.value,3,$scope.filter.productList,'new');
                            }else{
                                main.showDigit(item3.value,3,$scope.filter.productList);
                            }
                        }
                        //点击增加筛选属性
                        $scope.addCatAttr = function () {
                            if(!$scope.filter.logicRelation){
                                alert('请先选择逻辑关系！');
                            }else{
                                $scope.filter.showCat2 = true;
                            }
                        }
                        //症状打开对应的二级菜单
                        $scope.showSecondSymFunc = function (item,shouldShow) {
                            var arrCat2 = [];
                            if (shouldShow == 1) {
                                item.isShow = true;
                                item.showDig = true;
                            } else {
                                item.isShow = false;
                            }
                            item.symptomCombox2.forEach(function (item2) {
                                item2.showDig = true;
                                arrCat2.push(item2.value);
                            });
                            //一级菜单选中时展示当前的数量
                            main.showDigitSym(item.value,1,$scope.filter.symptomList);
                            //展示二级菜单当前数量
                            main.showDigitSym(arrCat2.join(","), 2, item.symptomCombox2);
                        }
                        //选择症状一级类目-二级类目全部选中-展示症状数量
                        $scope.toggleSelectionChooseFirstSym = function (item) {
                            // httpData.queryStatByZzp({
                            //     catId:item.value,
                            //     //type:type
                            // }).then(function (response) {
                            //     console.log('response=',response)
                            //     item.showDig = true;
                            // });

                            item.hasChosen == true ? item.hasChosen = false : item.hasChosen = true;
                            item.symptomCombox2.forEach(function (value2) {
                                console.log('item.hasChosen=',item.hasChosen)
                                if(item.hasChosen == true){
                                    value2.hasChosen = true;
                                }else{
                                    value2.hasChosen = false;
                                }
                            })
                            //一级菜单选中时展示当前的数量
                            main.showDigitSym(item.value,1,$scope.filter.symptomList);
                            item.showDig = true;
                        }
                        //选择症状二级类目
                        $scope.toggleSelectionChooseSecondSym = function (item2,item1) {
                            item2.hasChosen == true ? item2.hasChosen = false : item2.hasChosen = true;

                            var chooseItem2 = false;
                            item1.symptomCombox2.forEach(function (value2) {
                                if(value2.hasChosen == true)
                                    chooseItem2 = true;
                            });
                            if(item1.hasChosen != true){
                                item1.hasChosen = true;
                            }else{
                                if(chooseItem2 == false){
                                    item1.hasChosen = false;
                                }
                            }
                            main.showDigitSym(item2.value,2,$scope.filter.symptomList);
                        }
                        $scope.init();
                    },
                    size: 'lg',
                    scope: $scope
                });
            };

            init();

            function init() {
                $scope.hstep = 1;
                $scope.mstep = 1;
                $scope.$emit('setCurrentState', 'marketing');
            }

            //checkbox选择处理
            main.toggleSelection = function(v,distArr) {
                var idx = distArr.indexOf(v);
                if(idx == -1){
                    distArr.push(v);
                }else{
                    distArr.splice(idx, 1);
                }
            };

            main.inArr = function (v,arr) {
                var idx = arr.indexOf(v);
                if(idx == -1){
                    return false;
                }else{
                    return idx;
                }
            }

            //选择发送渠道 0-短信 1-push 2-盒子
            $scope.toggleSelectionSendWay = function (v) {
                main.toggleSelection(v,$scope.marketing.serviceListText);
            }
            //查看商品名称
            $scope.searchProductName = function () {
                httpData.queryNameByPmId({
                    pmId:$scope.marketing.productId || ''
                }).then(function (response) {
                    $scope.marketing.productName = response.pmInfos;
                    $scope.marketing.showProductName = true;
                })
            }
            //定时发送
            $scope.toggleDataInpput = function (choose) {
                if(choose == 'N'){
                    $scope.marketing.shouldShowDate = true;
                }else{
                    $scope.marketing.shouldShowDate = false;
                }
            }
            //选择用户
            $scope.chooseAllUser = function () {
                console.log('$scope.marketing.hasChosenUser=',$scope.marketing.hasChosenUser)
                if($scope.marketing.hasChosenUser != 1){// 选择所有用户
                    $scope.marketing.hasChosenUser = 1;
                    $scope.marketing.allUser = '√ 全部用户';
                    $scope.marketing.groupObject = 'all';
                    $scope.marketing.beforeall = false;
                }
                else{
                    $scope.marketing.hasChosenUser = null;
                    $scope.marketing.allUser = '全部用户';
                    $scope.marketing.groupObject = null;
                    $scope.marketing.beforeall = true;
                }
            }
            //打开筛选用户
            $scope.chooseSelectUser = function () {
                main.openFilterUserModel();
            };
            //检查链接有效性
            $scope.checkLink = function () {
                var url = $scope.marketing.activityLink;
                var regUrl = new RegExp(/^(https:\/\/)[\w\-_]+(\.[\w\-_]+)+([\w\-\.]*[\w\-])?/);
                //@?^=%&amp;:/~\+#
                var regString = new RegExp(/[=|]/, 'g');
                var oldLink = $scope.marketing.activityLink;
                $scope.oldLink = oldLink;
                url = url.toString();
                var matches = regUrl.exec( url );
                matches && matches[0] ? $scope.isHttps = true :$scope.isHttps = false ;
                $scope.hasInvalid = regString.test(url);
                $scope.isLink = regUrl.test( url ) && !$scope.hasInvalid;
                console.log( $scope.isLink)
            };
            //发送图片
            $scope.uploadPic = function () {
                var temp = uploadFun.upload('marketing-pic','#pic_file');
                // $scope.$apply(function() {
                //     $scope.info.url = 1; //显示loading
                // });
                temp && httpData.sendPic(temp).then(function (response) {
                    var response = JSON.parse(response);
                    console.log('pic res==');
                    console.log(typeof response)
                    if(response.status == 'error') {
                        //alert(response.url);
                        $scope.marketing.idFrontImg = '';
                    }else {
                        //$scope.info.face = response.data.pic_url; // 上传参数
                        $scope.marketing.idFrontImg = response.url;
                        //显示图片
                        $scope.$apply(function() {
                            //$scope.info.faceImg = response.data.domain_name+response.data.pic_url;
                            $scope.marketing.idFrontImg = response.url;
                        })
                    }
                });
            }
            function isEmpty(obj) {
                for (var name
                    in obj)
                {
                    return false;
                }
                return true;
            }
            //确认发送
            $scope.doSend = function () {
                if($scope.marketing.serviceListText.length == 0){
                    alert('请选择发送渠道！');
                    return;
                }
                var checkFlag1 = true,
                    checkFlag2 = true,
                    checkFlag3 = true,
                    checkFlagAll = true;
                if($scope.marketing.serviceListText.length > 0){
                    $scope.marketing.serviceListText.forEach(function (item) {
                        if(item == 0){
                            if(!$scope.marketing.shortMessageContent){
                                checkFlag1 = false;
                                alert('请填写必填项！');
                                return;
                            }
                        }else if(item == 1){
                            if(!$scope.marketing.messageContent && !(marketing.activityLinkChoose == 1 && !marketing.activityLink)){
                                checkFlag2 = false;
                                alert('请填写必填项！');
                                return;
                            }
                        }else if(item == 2){
                            if(!$scope.marketing.messageContent && !(marketing.activityLinkChoose == 1 && !marketing.activityLink)
                                && !$scope.marketing.sendTime){
                                checkFlag3 = false;
                                alert('请填写必填项！');
                                return;
                            }
                        }else{}
                    })
                    //选择了手动输入，选择了人数筛选，
                    if(!($scope.marketing.beforefilter == true && !$scope.marketing.mobileList) && !$scope.marketing.beforefilter
                        && !$scope.marketing.sendTime && !($scope.marketing.sendTime == '1' && $scope.marketing.sendTimeShow)){
                        alert('请填写必填项！');
                        return;
                    }
                }
                var params = null;
                //if($.isPlainObject($scope.marketing.selectParam)){
                if(isEmpty($scope.marketing.selectParam) || $scope.marketing.groupObject == 'all'){
                    params = '';
                }else{
                    params = JSON.stringify($scope.marketing.selectParam);
                }
                console.log('params=',params)
                    //TODO:提交发送信息
                    main.modalFun(httpData.sendInfo,{
                            active_end_time:main.dealWithTime($scope.marketing.startTime),//失效时间
                            active_pm:$scope.marketing.productId || '',//活动商品编码
                            activityUrl:$scope.marketing.activityLink || '',//活动链接
                            benefitTextArea:$scope.marketing.shortMessageContent || '',//短信内容
                            groupObject:$scope.marketing.groupObject || '',//发送对象 all全部用户，select筛选用户
                            imgUrl:$scope.marketing.idFrontImg || '',//图片链接
                            interface:$scope.marketing.shortMessageInterface,//短信接口 dh大汉三通，mw梦网，zn咨诺
                            messageHeader:$scope.marketing.shortMessageName || '',//短信名称
                            mobileTextArea:$scope.marketing.mobileList || '',//手机号码
                            pushHeader:$scope.marketing.messageName || '',//消息名称
                            pushTextArea:$scope.marketing.messageContent || '',//消息内容
                            sendRadio:$scope.marketing.sendTime || 0,//发送时间 0立即发送，1定时发送
                            sendType:$scope.marketing.serviceListText.join(','),//发送类型 0短信，1push，2消息盒子
                            send_time:main.dealWithTime($scope.marketing.sendTimeShow),//定时发送时间
                            selectParam:params,//携带的参数
                            tracker: $scope.marketing.tracker //tracker
                    });
                //}
            }
        }])
