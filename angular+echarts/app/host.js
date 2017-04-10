/**
 * Created by ginny on 17/2/15.
 */
'use strict';

define([], function (argument) {
    var urlObj = {
        dev: {
            api: '',
            loginUrl:''
        },
        test: {
            api:'http://10.25.32.233',
            loginUrl:''
        },
        release: {
            //api: 'http://crm.111.com.cn',
            api:'http://crm.111.com.cn/crm-api',
            loginUrl:''
        }
    };
    var environment = 'test';
    return urlObj[environment];
});