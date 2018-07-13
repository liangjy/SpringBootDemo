var uploadData = {}; 
uploadData.map = new Map(); // 声明一个存放需要保存到数据库的数据的Map对象
uploadData.currentUserName = "";
uploadData.readyStart = 0;
uploadData.redirectTime = 0;
uploadData.appcacheTime = 0;
uploadData.unloadEventTime = 0;
uploadData.lookupDomainTime = 0;
uploadData.connectTime = 0;
uploadData.requestTime =0;
uploadData.initDomTreeTime = 0;
uploadData.loadTime = 0;

var start = new Date(); //用户操作的开始时间  
var end = ""; //定义页面加载结束的时间，这里先定义，在后面的方法中会进行赋值
var loadTime = 0; // 定义页面加载时间

	/**********************************
	 * @funcname getQueryString
	 * @funcdesc 通过名称截取url上参数的参数值
	 * @param {String} name (input)
	      参数的名称 例如 appName
	 * @return {String}
	 * @author 林楚佳
	 * @create 20170428
	 * @modifier 
	 * @modify 
	 ***********************************/
	function getQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
        	return decodeURI(r[2]);	
        }
        return null;
    }
	/**********************************
	 * @funcname Format
	 * @funcdesc 重写Date的Format方法，用于格式化日期
	 * @param {Date} fmt (input)
	      想要进行格式化的日期
	 * @return {String}
	 * @author 林楚佳
	 * @create 20170428
	 * @modifier 
	 * @modify 
	 ***********************************/
    Date.prototype.Format = function (fmt) { 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "H+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    /**********************************
     * @funcname Map
     * @funcdesc 自定义的Map对象
     * @param 
     * @return {Map}
     * @author 林楚佳
     * @create 20170428
     * @modifier  
     * @modify 
     ***********************************/
    function Map() {     
        this.elements = new Array();     
        //获取MAP元素个数     
        this.size = function() {     
            return this.elements.length;     
        }     
        //判断MAP是否为空     
        this.isEmpty = function() {     
            return(this.elements.length < 1);     
        }     
        //删除MAP所有元素     
        this.clear = function() {     
            this.elements = new Array();     
        }     
        //向MAP中增加元素（key, value)      
        this.put = function(_key, _value) {     
            this.elements.push( {     
                key : _key,     
                value : _value     
            });     
        }     
        //删除指定KEY的元素，成功返回True，失败返回False     
        this.remove = function(_key) {     
            var bln = false;     
            try{     
                for(i = 0; i < this.elements.length; i++) {     
                    if(this.elements[i].key == _key) {     
                        this.elements.splice(i, 1);     
                        return true;     
                    }     
                }     
            } catch(e) {     
                bln = false;     
            }     
            return bln;     
        }     
        //获取指定KEY的元素值VALUE，失败返回NULL     
        this.get = function(_key) {     
            try{     
                for(i = 0; i < this.elements.length; i++) {     
                    if(this.elements[i].key == _key) {     
                        return this.elements[i].value;     
                    }     
                }     
            } catch(e) {     
                return null;     
            }     
        }     
        //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL     
        this.element = function(_index) {     
            if(_index < 0 || _index >= this.elements.length) {     
                return null;     
            }     
            return this.elements[_index];     
        }     
           
        //判断MAP中是否含有指定KEY的元素     
        this.containsKey = function(_key) {     
            varbln = false;     
            try{     
                for(i = 0; i < this.elements.length; i++) {     
                    if(this.elements[i].key == _key) {     
                        bln = true;     
                    }     
                }     
            } catch(e) {     
                bln = false;     
            }     
            return bln;     
        }     
           
        //判断MAP中是否含有指定VALUE的元素     
        this.containsValue = function(_value) {     
            var bln = false;     
            try{     
                for(i = 0; i < this.elements.length; i++) {     
                    if(this.elements[i].value == _value) {     
                        bln = true;     
                    }     
                }     
            } catch(e) {     
                bln = false;     
            }     
            return bln;     
        }     
        //获取MAP中所有VALUE的数组（ARRAY）     
        this.values = function() {     
            var arr = new Array();     
            for(i = 0; i < this.elements.length; i++) {     
                arr.push(this.elements[i].value);     
            }     
            return arr;     
        }     
        //获取MAP中所有KEY的数组（ARRAY）     
        this.keys = function() {     
            var arr = new Array();     
            for(i = 0; i < this.elements.length; i++) {     
                arr.push(this.elements[i].key);     
            }     
            return arr;     
        }     
    } 
    
    /**********************************
	 * @funcname getConsuming
	 * @funcdesc 计算两个时间相差的毫秒数
	 * @param {Date} start (input) {Date} end (input) 
	      strat表示开始的时间戳  end表示结束的时间戳
	 * @return {int}
	 * @author 林楚佳
	 * @create 20170428
	 * @modifier  
	 * @modify  
	 ***********************************/
    function getConsuming(start , end){
		return end.getTime() - start.getTime();
	}
    
    /**********************************
     * @funcname initData
     * @funcdesc 初始化需要保存的数据，包括appName 、appId 、userName以及operateTime
     * @param {null}
     * @return {null}
     * @author 林楚佳
     * @create 20170428
     * @modifier  
     * @modify  
     ***********************************/
    function initData() {
    	if(document.getElementById("headerUserForm_a") != null){
    		var username = document.getElementById("headerUserForm_a").text; // 获取当前操作的用户的用户名
    		if(username!=null && username != ""){
    			uploadData.currentUserName = username;
    		}
    	}    
    	uploadData.map.put("operateTime", start.Format("yyyy-MM-dd HH:mm:ss")); // 将操作时间进行格式化后放入map中
    	uploadData.map.put("userName", uploadData.currentUserName);
    	var appId = "";
    	var appName = "";
    	appId = getQueryString("appId");
    	appName = getQueryString("appName");
    	uploadData.map.put("appId", appId);
    	uploadData.map.put("appName", appName);
    }
   
	//调用initData函数
    initData();
    
    /**********************************
     * @funcname getEndDate
     * @funcdesc 获取最终时间并计算出总的耗时时间
     * @param {null}
     * @return {null}
     * @author 林楚佳
     * @create 20170428
     * @modifier nameOfModifier
     * @modify dateOfModification
     ***********************************/
	uploadData.getEndDate = function(){ 
		end = new Date();
		loadTime = getConsuming(start, end);
		uploadData.map.put("loadTimeConsuming", loadTime);
		console.log("加载时间是："+loadTime);
	}
	
	/**********************************
	 * @funcname submitData
	 * @funcdesc 将map中的信息通过ajax异步上传到服务器上进行保存
	 * @param {map} uop (input)
	      存放了需要保存到数据库中的数据的map
	 * @return {null}
	 * @author 林楚佳
	 * @create 20170428
	 * @modifier  
	 * @modify  
	 ***********************************/
	uploadData.submitData = function(uop){
    	$.ajax({
        	type:"post",
        	url : "pages_userOperateRecord_UserOperatePageLoad_saveOrUpdate.action",
        	data:{
        		"userName" : uop.get("userName").trim(),
    			"appId" : uop.get("appId"),
    			"appName" :uop.get("appName"),
    			"operateTime" : uop.get("operateTime"),
    			"loadTimeConsuming" :  uop.get("loadTimeConsuming"),
    			"readyStart" :  uop.get("readyStart"),
    			"redirectTime" :  uop.get("redirectTime"),
    			"appcacheTime" :  uop.get("appcacheTime"),
    			"unloadEventTime" :  uop.get("unloadEventTime"),
    			"lookupDomainTime" :  uop.get("lookupDomainTime"),
    			"connectTime" :  uop.get("connectTime"),
    			"requestTime" :  uop.get("requestTime"),
    			"initDOMTreeTime" :  uop.get("initDomTreeTime")
        	},
        	dataType:"json",
        	success:function(){
        		console.log("成功上传数据");
        	},
        	error:function(){
        		console.log("系统错误");
        	}
        });
    }
	
	/**
	 * ********************************
	 * @funcname uploadData.getChromeData 
	 * @funcdesc 获取Chrome浏览器中页面加载的一些参数并保存在map中
	 * @param {null} 
	       
	 * @return {null}
	 * @author 林楚佳
	 * @create 20170807
	 * @modifier  
	 * @modify  
	 **********************************
	 */
	uploadData.getChromeData = function uploadData_getChromeData() {
		with(performance){
		    uploadData.readyStart = timing.fetchStart - timing.navigationStart;
		    uploadData.redirectTime = timing.redirectEnd  - timing.redirectStart;
		    uploadData.appcacheTime = timing.domainLookupStart  - timing.fetchStart;
		    uploadData.unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
		    uploadData.lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
		    uploadData.connectTime = timing.connectEnd - timing.connectStart;
		    uploadData.requestTime = timing.responseEnd - timing.requestStart;
		    uploadData.initDomTreeTime = timing.domInteractive - timing.responseEnd;domReadyTime = timing.domComplete - timing.domInteractive;
		    uploadData.loadTime = timing.loadEventEnd - timing.navigationStart;
		    uploadData.map.put("readyStart", uploadData.readyStart);
		    uploadData.map.put("redirectTime", uploadData.redirectTime);
		    uploadData.map.put("appcacheTime", uploadData.appcacheTime);
		    uploadData.map.put("unloadEventTime", uploadData.unloadEventTime);
		    uploadData.map.put("lookupDomainTime", uploadData.lookupDomainTime);
		    uploadData.map.put("connectTime", uploadData.connectTime);
		    uploadData.map.put("requestTime", uploadData.requestTime);
		    uploadData.map.put("initDomTreeTime", uploadData.initDomTreeTime);
		    uploadData.map.put("loadTimeConsuming", uploadData.loadTime);
		     //过早获取时 domComplete有时会是0loadEventTime = timing.loadEventEnd - timing.loadEventStart;loadTime = timing.loadEventEnd - timing.navigationStart;
		     //过早获取时 loadEventEnd有时会是0
		    console.log('准备新页面时间耗时: ' + uploadData.readyStart);
		    console.log('redirect 重定向耗时: ' + uploadData.redirectTime);
		    console.log('Appcache 耗时: ' + uploadData.appcacheTime);
		    console.log('unload 前文档耗时: ' + uploadData.unloadEventTime);
		    console.log('DNS 查询耗时: ' + uploadData.lookupDomainTime);
		    console.log('TCP连接耗时: ' + uploadData.connectTime);
		    console.log('request请求耗时: ' + uploadData.requestTime);
		    console.log('请求完毕至DOM加载: ' + uploadData.initDomTreeTime);
		    console.log('从开始至load总耗时: ' + uploadData.loadTime);
		}
	}
	
	/**********************************
	 * @funcname doSubmit
	 * @funcdesc 用于给其他人调用的进行执行异步保存的函数
	 * @param {null}
	 * @return {null}
	 * @author 林楚佳
	 * @create 20140728
	 * @modifier  
	 * @modify  
	 ***********************************/
	uploadData.doSubmit = function(){
			//数据校验   ： appName可能为空  其他不为空 console出来
			if(uploadData.map.size() >= 12){
				//uploadData.getEndDate();
				uploadData.submitData(uploadData.map);
				uploadData.map.clear();
			}else{
				console.log("无须提交或数据缺失！请确认！");
				uploadData.map.clear();
			}
	}