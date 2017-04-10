'use strict';
define([], function (argument) {
    //var p = location.protocol;
    var urlObj = {
        dev: {
            api:'http://127.0.0.1:8080/'
        },
        test: {

        },
        release: {

        }
    };
    var environment = 'dev';
    return urlObj[environment];
});