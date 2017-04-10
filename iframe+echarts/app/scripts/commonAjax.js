define(['zepto', 'common', 'host','ui'], function($,common, host,ui) {
    var reqData = {
        //'system':'html5',
        //'app_version':9,
        //'system_version':'7.0',
        //'phone_model': 'web',
        //'meid':'h5',
        //'p_version':'2.0',


        'access_token': "4426_5389b91ba6f23918dc3191e1ace5f6ea_1478830117957",
        'app_version': "20",
        'channel': "app store",
        'meid': "feb29c88179107e92dc2971bc85606d0a80ccfc2",
        'p_version': "2.2.0",
        'phone_model': "iPhone6 Plus",
        'system': "ios",
        'system_version': "10.0.2"
    };
    var CommonAjax = {
        doCallback: function(callback, response) {
            if (!callback) return;
            var callbackFunc = callback.func,
            callbackContext = callback.context;
            callbackFunc && typeof(callbackFunc) == 'function' && callbackFunc.call(callbackContext, response);
        },
        //发起视频诊单
        reqVideoInquery: function(data, callback) {
            var data = $.extend(data,reqData);
            $.ajax({
                url:'http://yzm.test.111.com.cn/'+'inquery/v3/submit_inquery',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        // 获取科室列表
        getDepList: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'tw/v2/department_list',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        // 获取首页消息通知
        getIndexNtf: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'tw/v2/twnotification',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        // 去登录
        toLogin: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'tw/v2/patient_register',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        // 获取验证码
        sendVerifyCode: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'sms/v2/send_verify_code',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        // 获取验证码
        toLogin: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'tw/v2/patient_register',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        //药店接口
        getSuperToken: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'video/v1/get_super_user_access_token',
                data:data,
                type:"GET",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        // 医生是否在线
        checkDocIsOnline: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'doctor/v2/check_doc_is_online',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        // 提交问诊
        submitInquiry: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'tw/v1/submit_inquery',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        // 获取医生详情
        getDoctorInfo: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'doctor/v2/doctor_info',
                data:data,
                type:"POST",
                success: function(response,status,xhr) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        //历史聊天记录
        getHistoryTalk: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'tw/v2/historychat',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        // 提交聊天
        submitTalk: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'tw/v2/submitchat',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        // 结束问诊
        endTalk: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'tw/v2/closeinquery',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        // 未读聊天
        unreadTalk: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'tw/v2/currentchat',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        // 我的当前、历史问诊
        myRecipe: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'inquery/v2/graphic_list',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        // 上传图片
        upLoad: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'up_file/up_img/common',
                data:data,
                type:"POST",
                processData: false,
                contentType: false,
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        // 获取患者list
        getPatientList: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'app/v2/patient_list',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        // 处方列表
        myRecipeList: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'tw/v2/recipe_list',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        // 处方详情
        myRecipeInfo: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'app/h5/recipe_detail',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        // 诊单详情
        getInqueryDetail: function(data, callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'inquery/v2/inquery_detail',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        //增加患者
        addPatient:function(data,callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'app/v2/add_patient',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        //http省市区接口，省市区(11.22号上线的接口)
        findAllProvince:function(data,callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'yw/h5/findAllProvince',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },

        // 置换cookie
        getCookieFromYYW:function(data,callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'yw/v1/yw_joint_login_forCookie',

                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },

        findAllCity:function(data,callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'yw/h5/findCityByProvinceId',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        findCountyInfo:function(data,callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'yw/h5/findCountyByCityId',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        //查询药网用户地址
        ywAddressList:function(data,callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'yw/v1/yw_address_list',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        //编辑收获地址
        editYwAddress:function(data,callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'yw/v1/edit_yw_address',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        //adapter地址-查省市区
        getAllProvince:function(data,callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:'http://gateway.111.com.cn/yizhen/findAllProvince?trader=iphone&closesignature=yes&signature_method=md5&timestamp=23234&signature=****&tradername=query',
                data:data,
                type:"GET",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        getAllCity:function(data,callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:'http://gateway.111.com.cn/yizhen/findCityByProvinceId?trader=iphone&closesignature=yes&signature_method=md5&timestamp=23234&signature=****&tradername=query&provinceId=1',
                data:data,
                type:"GET",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        getAllCountyInfo:function(data,callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:'http://gateway.111.com.cn/yizhen/findCountyByCityId?trader=iphone&closesignature=yes&signature_method=md5&timestamp=23234&signature=****&tradername=query&cityId=1',
                data:data,
                type:"GET",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        //查询商品列表-adapter
        checkQueryMerchandiseDetailInfo:function(data,callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:'http://gateway.111.com.cn/yizhen/queryMerchandiseDetailInfo?provinceId=1&countyId=1&payType=1&itemListJson=[{itemId:972486,itemAmount:1},{itemId:50174406,itemAmount:2}]&goodsPattern=0&trader=iphone&closesignature=yes&signature_method=md5&timestamp=1234&signature=SASDASDSD&tradername=tw',
                data:data,
                type:"GET",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        //查询商品列表
        queryMerchandiseDetailInfo:function(data,callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'yw/h5/queryMerchandiseDetailInfo',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        //创建订单
        createYwOrder:function(data,callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'remote/create_yw_order',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        },
        //查询诊单状态
        checkInquery:function(data,callback){
            var data = $.extend(data,reqData);
            $.ajax({
                url:host.api+'inquery/v2/check_inquery',
                data:data,
                type:"POST",
                success: function(response) {
                    CommonAjax.doCallback(callback, response);
                },
                error: function(response) {
                    showError();
                }
            });
        }

    };

    function showError (){
        if($('.widget-dialog-error').length){
            return false;
        } else{
            Dialog.Dialog({
                className:'widget-dialog-error',
                content:'<div class="TWWZ-dialog-content">'+
                '<p class="TWWZ-pt20">网络异常，请刷新重试</p>'+
                '</div>',
                btn:'知道了',
                afterOk:function(){
                }
            })
        }
    }

    return CommonAjax;

});
