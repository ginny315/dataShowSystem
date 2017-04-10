define(['zepto','template','host', 'ui'], function ($,template,host, ui) {
    var exports = {};
    exports.checkPlatform = function () {
        var ua = navigator.userAgent;
        var android = ua.match(/(Android)[\s\/]+([\d.]+)/);
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
        var ipod = !ipad && !iphone && ua.match(/(iPod).*OS\s([\d_]+)/);
        if (ipad || iphone || ipod) {
            return 2;
        } else {
            return 1;
        }
    };
    exports.getLocationParam = function () {
        var url = window.location.search;
        var params = url.toString().slice(1).split("&");
        var returnObject = {};
        for (var i = 0; i != params.length; i++) {
            var index = params[i].indexOf("=");
            returnObject[params[i].slice(0, index)] = params[i].slice(index + 1);
        }
        return returnObject;
    };
    exports.dealIframeParam = function (oldUrl) {
        var url = oldUrl.split('?')[1];
        var params = url.toString().slice(0).split("&");
        var returnObject = {};
        for (var i = 0; i != params.length; i++) {
            var index = params[i].indexOf("=");
            returnObject[params[i].slice(0, index)] = params[i].slice(index + 1);
        }
        return returnObject;
    };
    exports.checkMobile = function (val) {
        var pattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
        if (pattern.test(val)) {
            return true;
        } else {
            return false;
        }
    };
    exports.inWx = function () {
        var ua = navigator.userAgent.toLowerCase();
        if ((ua.match(/MicroMessenger/i) == "micromessenger")) {
            return true;
        } else {
            return false;
        }
    };
    exports.vaildVersion = function (num) {
        var verson = this.getCookie('versionCode');
        if (host.environment == 'dev') return true;
        return verson >= num;
    };
    exports.inYWApp = function () {
        var that = this;
        if (!that.vaildVersion(504)) {
            ui.Dialog({
                className: 'error-video-msg',
                title: '提示',
                content: '<div class="error-content">' +
                '当前应用版本过低，请更新至最新版本' +
                '</div>',
                foot: '<button class="btn-dialog-cancel">知道了</button>',
                afterClose: function () {
                    if (that.checkPlatform() == 1) Browser.finishActivity()
                    else location.href = host.api + 'history/gobackapp.action'
                }
            });
            return false;
        }
        if(!window.YiZhenJSBridge && host.environment != 'dev') { //检测到js对象没有 跳转
            ui.Dialog({
                className: 'error-video-msg',
                title: '提示',
                content: '<div class="error-content">' +
                '当前用户个人信息获取失败, 请稍后重试' +
                '</div>',
                foot: '<button class="btn-dialog-cancel">知道了</button>',
                afterClose: function () {
                    location.reload()
                }
            });
        }
        return window.YiZhenJSBridge;
    };
    exports.staticsEvent = function (data) {
        //window._czc.push(["_trackEvent", data.category, data.action, data.label, data.value, data.id]);
    };
    exports.getCookie = function (name) {
        return document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)")) == null ? null : decodeURIComponent(RegExp.$2);
    };
    exports.setCookie = function (c_name, value) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + 1);
        exdate.setHours(0);
        exdate.setMinutes(0);
        exdate.setSeconds(0);
        document.cookie = c_name + "=" + escape(value) + ";expires=" + exdate.toGMTString();
    };
    exports.reqData = {
        //TODO:公用数据
    };
    exports.isLogin = function (){
    };
    /*ywapp native string to json*/
    exports.stringToJson = function (str) {
        return eval('(' + str + ')');
    };

    exports.commonAjax = function (options, url, cb, err) {
        var type = options.reqType ? options.reqType : 'POST';
        delete options.reqType;
        var obj = {};
        for (var i in this.reqData) {
            obj[i] = this.reqData[i]
        }
        var data = $.extend(obj,options);
        $.ajax({
            url: host.api + url,
            data: data,
            type: type,
            success: function (response) {
                //cb(JSON.parse(response))
                cb(response)
            },
            error: function (response) {
                ui.endLoading();

                if (err) err();
                else ui.showPrompt('网络异常,请稍后重试')
            }
        });
    };
    exports._cookie = {
        config : {
            raw:'',
            json:'',
            defaults:''
        },
        encode:function(s){
            var self =this;
            return self.config.raw ? s : encodeURIComponent(s);
        },
        decode:function(s){
            var self =this;
            return self.config.raw ? s : decodeURIComponent(s);
        },
        stringifyCookieValue:function(value){
            var self = this;
            return self.encode(self.config.json ? JSON.stringify(value) : String(value));
        },
        parseCookieValue:function(s){
            var self = this;
            if (s.indexOf('"') === 0) {
                s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            }
            try {
                s = decodeURIComponent(s.replace(/\+/g, ' '));
            } catch(e) {
                return;
            }
            try {
                return self.config.json ? JSON.parse(s) : s;
            } catch(e) {}
        },
        read:function(s, converter){
            var self = this;
            var value = self.config.raw ? s : self.parseCookieValue(s);
            return $.isFunction(converter) ? converter(value) : value;
        },
        cookie:function (key, value, options) {
            var self = this;
            // Write
            if (value !== undefined && !$.isFunction(value)) {
                options = $.extend({}, self.config.defaults, options);
                if (typeof options.expires === 'number') {
                    var days = options.expires, t = options.expires = new Date();
                    t.setDate(t.getDate() + days);
                }
                return (document.cookie = [
                    self.encode(key), '=', self.stringifyCookieValue(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                    options.path    ? '; path=' + options.path : '',
                    options.domain  ? '; domain=' + options.domain : '',
                    options.secure  ? '; secure' : ''
                ].join(''));
            }
            // Read
            var result = key ? undefined : {};
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            for (var i = 0, l = cookies.length; i < l; i++) {
                var parts = cookies[i].split('=');
                var name = self.decode(parts.shift());
                var cookie = parts.join('=');

                if (key && key === name) {
                    result = self.read(cookie, value);
                    break;
                }
                if (!key && (cookie = self.read(cookie)) !== undefined) {
                    result[name] = cookie;
                }
            }
            return result;
        },
        removeCookie:function(name){
            var that = this;
            var exp = new Date();
            exp.setTime(exp.getTime() - 1000);
            var cval=that.cookie(name);
            if(cval!=null){
                document.cookie=name+"=; expire="+exp.toGMTString()+"; path=/;domain=.111.com.cn";
                // document.cookie= name + "="+cval+";path='/'"+";domain='.111.com.cn'"+";expires="+exp.toGMTString();
            }
        },
    },
    /**
     * 获取cookie
     * @param name
     * @returns {*}
     */
    exports.getCookie = function (name) {
        var self =this;
        return self._cookie.cookie(name)
    },
    /**
     * 设置cookie
     * 格式 {key:'',value:''}
     * @param data
     */
    exports.setCookie = function (data) {
        var self =this;
        self._cookie.cookie(data.key,data.value,{
            expires: 30, // 有效期为 30 天
            path: "/", // 整个站点有效
            domain:'', // 有效域名
            secure: false // 加密数据传输
        })
    },
    //TODO:id对应map
    exports.mapApi = function (target) {
      var address = -1;
      var map = [
          {id:'home',address:'/config/home.json'},
          {id:'page1',address:'/config/page1.json'},
          {id:'page2',address:'/config/graphic.json'},
      ];
        map.forEach(function (item) {
            if(item.id == target){
                address =  item.address;
            }
        })
        return address;
    },
    exports.init = function () {
    }
    exports.init()
    return exports;
});

