/*****************************************************************
                  jQuery Ajax封装通用类       
*****************************************************************/
//	var noce = {};
    /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
     *       注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
     * type 请求方式("POST" 或 "GET")， 默认为 "GET"
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * successfn 成功回调函数
     * errorfn 失败回调函数
     */
	noce.ajaxAll=function(url, data, async, type, dataType, successfn, errorfn,showLoad) {
//        async = (async==null || async=="" || typeof(async)=="undefined")? "true" : async;
		showLoad = (showLoad==null || typeof(showLoad)=="undefined")? true : showLoad;
        type = (type==null || type=="" || typeof(type)=="undefined")? "post" : type;
        dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
        data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
       var $ajax = $.ajax({
            type: type,
            timeout : 60*1000, //超时时间设置，单位毫秒
            async: async,
            data: data,
            url: url,
            cache: false,
            dataType: dataType,
            success: function(data){
           		if(successfn!=null && successfn!="" && typeof(successfn)!="undefined"){
            			successfn(data);
            			data = null;
            		}
//            	}
            },
            error: function(data,textStatus){
            	if(typeof(data)!="undefined"){
//            		超时返回登陆页面
            		var infor = data.responseText||data.statusText;
            		if(data.status==404){
            			if(infor==" "){
            				infor = "网络异常，请检查网络连接";
            			}
//            			eval(infor);
            			console.log(infor);
            		}
            		else{
            			if(infor=="abort"){
            				console.log(infor);
            			}else{
//                			eval(infor);
                			console.log(infor);
            			}
            			
            		}
            	}
            },
            complete : function(XMLHttpRequest,status) { //请求完成后最终执行参数
                if(status=='timeout'){//超时,status还有success,error等值的情况
                    $ajax.abort();
                    var errorMessage =  "请求超时||"
                    console.log("请求超时");
                }
            }
        });
        return $ajax;
        
    };
    
    /**
     * ajax封装 同步请求
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * successfn 成功回调函数
     */
    noce.ajaxAsync=function(url, data, successfn) {
        data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
        var $ajax = noce.ajaxAll(url, data, false, null, null, successfn, null);
        return $ajax;
    };
    /**
     * ajax封装 异步请求
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * successfn 成功回调函数
     */
    noce.ajax=function(url, data, successfn,showLoad) {
        data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
        var $ajax = noce.ajaxAll(url, data, true, null, null, successfn, null,showLoad);
        return $ajax;
    };
    /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * errMsg 错误消息提示
     * successfn 成功回调函数
     * errorfn 失败回调函数
     */
    noce.ajaxxx=function(url, data,errMsg, successfn, errorfn) {
        data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
        errMsg = (errMsg==null || errMsg=="" || typeof(errMsg)=="undefined")? "内部异常":errMsg;
        var $ajax = noce.ajaxAll(url, data, null, null, null, successfn, errorfn);
        return $ajax;
    };
