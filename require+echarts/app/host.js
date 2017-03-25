'use strict';
define([], function (argument) {
    //var p = location.protocol;
    var urlObj = {
        dev: {
            api:''
        },
        test: {

        },
        release: {

        }
    };
    var environment = 'dev';
    return urlObj[environment];
});