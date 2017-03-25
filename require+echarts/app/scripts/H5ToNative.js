define([],function(){
	var h5tonative =
	{
		functionlist:
		{
			shake:"yzjk://shake/",
			gotoRegister:"yzjk://gotoRegister/",
			hideApp:"yzjk://hideApp/",
			alert:"yzjk://alert/"
		},
		getAllCookie:function()
		{
			return unescape(document.cookie);
		},
		getCookie:function(sMainName,sSubName)
		{
			return document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"))==null ? null : decodeURIComponent(RegExp.$2);
		},
		getUserAgent:function(){return navigator.userAgent;},
		platform:
		{
			isandroid:function(){return h5tonative.getUserAgent().indexOf("yzjkandroid")>0;},
			isios:function(){return h5tonative.getUserAgent().indexOf("yzjkios")>0;},
			isother:function(){return h5tonative.getUserAgent().indexOf("yzjkandroid")< 0 && h5tonative.getUserAgent().indexOf("yzjkios")<0;}
		},
		getClientInfo:function(){return h5tonative.getCookie("clientinfo","");},
		getUserToken:function(){return h5tonative.getCookie("usertoken","");},
		getProvinceid:function(){return h5tonative.getCookie("provinceid","");},
		getFrom:function(){return h5tonative.getCookie("from","");},
		getSessionid:function(){return h5tonative.getCookie("sessionid","");},
		isWireless2:function()
		{
			if(h5tonative.getCookie("frameworkver","") != "")
			{
				return true;
			}
			return false;
		},
		//url:h5 to native协议地址,必须以/结尾,如:yzjk://home/,yzjk://shake/
		//iostype 针对ios调用，默认0为fun调用，1为路由调用
		goToNative:function(url,param,iostype)
		{
			if (h5tonative.platform.isother()) return;
			window.yzjk.enterNativeWithData(url,param);
			if(iostype && iostype==1){
				if(h5tonative.platform.isandroid())
				{
					window.yzjk.enterNativeWithData(url,param);
				}
				if(h5tonative.platform.isios())
				{
					window.location.href = url+"?body="+param;
				}
			}
		},
		shake:function(param)
		{
			if(h5tonative.platform.isandroid())
			{
				window.yzjk.gotoNative(h5tonative.functionlist.shake,param);
			}
			if(h5tonative.platform.isios())
			{
				window.location.href = h5tonative.functionlist.shake+"?body="+param;
			}
		}

	};
	return h5tonative;
});