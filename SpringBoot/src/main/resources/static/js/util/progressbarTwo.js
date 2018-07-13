var progressbarTwo = {};
progressbarTwo.startTime;// 查询开始时间
progressbarTwo.endTime;// 查询的结束时间
progressbarTwo.canel;// 是否取消查询（1时取消继续查询）
progressbarTwo.statusSum;// 统计已经查询完毕的所有sql的条数
progressbarTwo.percentValue = 0;// 累计进度条的百分比
progressbarTwo.perList = new Array();
progressbarTwo.handIds = new Array();
progressbarTwo.logTimeoutIds = new Array();
progressbarTwo.sqlsum = 0;
progressbarTwo.req_start_time=""; //请求开始的时间戳
progressbarTwo.req_complete_time=""; //请求结束的时间戳
progressbarTwo.callback_start_time=""; //回调开始的时间戳
progressbarTwo.callback_complete_time=""; //回调完成的时间戳
progressbarTwo.userName = $("#headerUserForm_a").text(); //获取用户名称

/**********************************
 * @funcname Map
 * @funcdesc 自定义的Map
 * @param null
 * @return {Map}
 * @author 林楚佳
 * @create 20170418
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

progressbarTwo.handleIdMap = new Map(); // 创建一个存放handleId的Map对象。 在 progressbarTwo.getOperationId中使用

/**********************************
 * @funcname getQueryString
 * @funcdesc 通过名称获取url中参数的值
 * @param {String} name (input)
      需要获取到的参数的名称
 * @return {String}
 * @author 林楚佳
 * @create 20170418
 * @modifier  
 * @modify  
 ***********************************/
progressbarTwo.getQueryString = function(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}

/**********************************
 * @funcname getReqTime
 * @funcdesc 获取请求所用的时间
 * @param null
 * @return {int}
 * @author 林楚佳	
 * @create 20170418
 * @modifier  
 * @modify  
 ***********************************/
progressbarTwo.getReqTime= function(){
	return progressbarTwo.req_complete_time.getTime() - progressbarTwo.req_start_time.getTime();
}

/**********************************
 * @funcname getCallbackTime
 * @funcdesc 获取回调所用的时间
 * @param null
 * @return {int}
 * @author 林楚佳	
 * @create 20170418
 * @modifier  
 * @modify  
 ***********************************/
progressbarTwo.getCallbackTime = function(){
	return progressbarTwo.callback_complete_time.getTime() - progressbarTwo.callback_start_time.getTime();
}

/**********************************
 * @funcname getConsuming
 * @funcdesc 获取两个时间的时间差
 * @param null
 * @return {int}
 * @author 林楚佳	
 * @create 20170418
 * @modifier  
 * @modify  
 ***********************************/
progressbarTwo.getConsuming = function(start , end) {
	return end.getTime() - start.getTime();
}
/**********************************
 * @funcname getFunctionName
 * @funcdesc 获取方法的方法名称，如果方法有方法名称则将方法的名称截取下来
 * @param {String} str (input)
      方法的整个实体
 * @return {String}
 * @author 林楚佳
 * @create 20170418
 * @modifier  
 * @modify  
 ***********************************/
function getFunctionName(str){
	var functionName = str.substring(str.indexOf("function")+8,str.indexOf("(")-1);
	return functionName;
}

progressbarTwo.userMap = new Map(); //由于impala的异步查询横跨多个方法，所以需要声明一个全局变量来保存数据

/**********************************
 * @funcname Date.prototype.Format 
 * @funcdesc 重写Date方法的Format方法，用于将时间进行格式转换，转换成想要的格式的字符串
 * @param {Date} fmt (input)
      想要进行转换的日期
 * @return {String}
 * @author 林楚佳
 * @create 20170418
 * @modifier  
 * @modify  
 ***********************************/
Date.prototype.Format = function (fmt) { //author: meizz 
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
 * @funcname submitUserOperateRecord
 * @funcdesc 将map中的数据通过异步的方式上传到服务器进行保存
 * @param {Map} uor (input )
      存放了记录用户操作时请求的耗时以及回调耗时的map
 * @return null
 * @author 林楚佳	
 * @create 20170418
 * @modifier  
 * @modify  
 ***********************************/
progressbarTwo.submitUserOperateRecord = function(uor) {
	$.ajax({
		type : "post",
		url : "pages_userOperateRecord_UserOperateRecord_saveOrUpdate.action" ,
		data:{
			"userName" : uor.get("userName").trim(),
			"appId" : uor.get("appId"),
			"appName" :uor.get("appName"),
			"operateTime" : uor.get("operateTime"),
			"reqParams" : uor.get("reqParams"),
			"reqTimeConsuming" : uor.get("reqTimeConsuming"),
			"callbackName" : uor.get("callbackName"),
			"callbackTimeConsuming" : uor.get("callbackTimeConsuming"),
			"totalTimeConsuming" : uor.get("totalTimeConsuming")
		},
		success : function(){
//			console.log("操作成功");
		},
		error : function(err){
			console.log("操作失败");
		}
	})
}

/**
 * sqllist:模板参数数组。
 * functionlist：回调函数数组。格式：[func1,func2,...]
 * dataBase：数据库类型集合，可以不传（可选）。格式：[2,3,3,...] 说明：2:impala 3:mysql
 * paraArray：往回调函数中放入的参数，可以不传（可选）。格式：[any,any,any,...] 说明：any可以为数组、jquery对象等类型
 * isAsync_ImpalaQuery:是否impala异步查询（可选） 说明：true为impala异步查询，false为不使用impala异步查询
 * callType调用类别（可选）: 
 * 1:tableTools(表格组件)  
 * callPara格式：
 * tableToolsPara = {
		"sortColumn":sortColumn,
		"pageSize":pageSize,
		"pageIndex":pageIndex,
		"sortType":"desc"
	};
 */


/**********************************
 * @funcname progressbarTwo.submitSql
 * @funcdesc 查询组件入口，首先判断参数，如果使用impala的异步查询，则使用impala异步查询逻辑，再判断是组件查询，然后判断是否是同步请求进行查询，如果前面的都不符合，则使用正常的异步请求进行查询
 * @param {array} sqllist (input ) 数组的每个为替换sql模板的参数数组  格式：[["id","key:value","key:value",…],[ "id","key:value","key:value",…],...]
 * @param {array} functionlist (input ) 数组的每个为查询的回调函数 格式:[func1,func2,...]
 * @param {array} dataBase (input optional) 如果不传该参数，则默认使用impala的同步查询（默认为2），3：mysql 4：hbase thrift 5：Elasticsearch 6：postgreSql 7：hbase api（无认证的方式）
 * @param {array} paraArray (input optional) 往回调函数带入的参数（对象、数组等），如果要带入，则需要一一对应，比如在第三个查询模板带入，则需要将前两个位置填满，第三个位置放入需要带入的参数
 * @param {boolean} isAsync_ImpalaQuery (input optional) 该参数为true的时候使用impala的后台异步查询，其他情况为不使用impala的异步查询，不再支持impala异步查询,此值会置为false
 * @param {number} callType (input optional) 使用的组件标识，目前暂时只有一个组件使用（1：表格组件）
 * @param {object} callPara (input optional) 本参数需要和callType配合使用，请求会将这个对象发送到后台（如果增加组件，则需要在后台新增实体类接收该参数）进行sql拼接后者其他处理
 * callPara = {
		"sql":sqlPara,
		"sortColumn":sortColumn,
		"pageSize":pageSize,
		"pageIndex":pageIndex,
		"thead":thead,
		"sortType":sortType,
		"dataType":dataType,
		"pageFlag":pageFlag,
		"sceneId":sceneId
	};
	sceneId:场景0的功能展示:
	a.	加载更多。
	b.	排序（可升降排序）
	c.	导出。
	d.	超长缩略（前后取10个字符，鼠标浮动显示完整信息）。
	e.	数值型样式右对齐，字符型左对齐。
	场景1的功能展示:
	a.实现复杂表头（表头可跨列）
	b.支持按列或按行冻结
	c.支持表头或按列绑定函数（包括悬停、单击、双击）
	d.支持表头或按列指定css class,class名称可以整列相同，可以按列值对应，可以按取值范围对应
	e.支持不分页，不添加表头排序，不指定order by字段
	f.支持前端直接提供数据去生成表格
 * 
 * 
 * 
 * @param {boolean} isSync (input optional) 本参数标识使用ajax的同步请求，即一个请求处理完才发起下一个请求
 * @return null
 * @author 梁杰禹	
 * @create 20170808
 * @modifier  
 * @modify  
 ***********************************/
progressbarTwo.submitSql = function(sqllist, functionlist,dataBase,paraArray,isAsync_ImpalaQuery,callType,callPara,isSync,dbName) {
	if(dbName!=undefined||dbName!=null){
		for ( var i = 0; i < sqllist.length; i++) {
			if($.isArray(paraArray)){
				if(i<paraArray.length){
					progressbarTwo.submitSqlAjax(sqllist[i],functionlist[i],dataBase[i],paraArray[i],null,dbName[i]);
				}else{
					progressbarTwo.submitSqlAjax(sqllist[i],functionlist[i],dataBase[i],null,null,dbName[i]);
				}
			}else{
				progressbarTwo.submitSqlAjax(sqllist[i],functionlist[i],dataBase[i],null,null,dbName[i]);
			}
			
		}
		return;
	}
//	if(isAsync_ImpalaQuery==undefined||isAsync_ImpalaQuery==null){
		isAsync_ImpalaQuery = false;
//	}
	if(isSync==undefined||isSync==null){
		isSync = false;
	}
	if(callType == undefined || callType==null){
		callType = false;
	}
	
	if(noceUtil.isUndefined(paraArray)){
		paraArray = [];
	}
	
	if(sqllist.length==0){
		alert("传入的sql参数长度为0，请检查....");
		return;
	}
	
//	if(isAsync_ImpalaQuery){
//		progressbarTwo.submitSqlAsync(sqllist,functionlist,paraArray,callType,callPara); //-----
//		return;
//	}
	if(noceUtil.isUndefined(dataBase)){
		dataBase = [];
	}
	
	if(callType==1||callType=="1"){
		var paraUrl = progressbarTwo.getParaUrl(1,callPara);
		progressbarTwo.submitSqlAjax(sqllist[0], functionlist[0],dataBase[0],paraArray[0],paraUrl);  //--------
		return;
	}
	
	if(isSync){
		//依次对每条sql提交查询
		for ( var i = 0; i < sqllist.length; i++) {  
			if(dataBase[i]==null||dataBase[i]==undefined||dataBase[i].length==0){
				dataBase[i] = 2;
			}
			progressbarTwo.submitSqlSync(sqllist[i], functionlist[i],dataBase[i],paraArray[i]); //-------
		}
		return;
	}
	//依次对每条sql提交查询
	for ( var i = 0; i < sqllist.length; i++) {  
		if(dataBase[i]==null||dataBase[i]==undefined||dataBase[i].length==0){
			dataBase[i] = 2;
		}
		progressbarTwo.submitSqlAjax(sqllist[i], functionlist[i],dataBase[i],paraArray[i]);
	}
};


/**********************************
 * @funcname progressbarTwo.submitSqlAjax
 * @funcdesc ajax异步请求，同步查询数据
 * @param {array} sqlParaList (input) 模板参数数组 格式：["id","key:value","key:value",…]
 * @param {function} callBackFunc (input) 回调函数 格式: func1方法
 * @param {number} dataBase (input) 数据库类型
 * @param {object} paraArray (input optional) 往回调函数中放入的参数 说明：附带上的参数
 * @param {string} paraUrl (input optional) 组件拼装的url
 * @return {null}
 * @author 梁杰禹
 * @create 20170808
 * @modifier 
 * @modify 
 ***********************************/
progressbarTwo.submitSqlAjax = function(sqlParaList, callBackFunc,dataBase,paraAny,paraUrl,databaseName){
	var appId=$('#currentAppId').val();
	var appName = $('#'+appId).text();
	if(paraUrl==""||paraUrl==undefined||paraUrl==null){
		paraUrl = "";
	}
	var uor = new Map(); //创建一个map保存所有的信息
	var operate_time = new Date().Format("yyyy-MM-dd HH:mm:ss");  //创建操作时间
	progressbarTwo.req_start_time = new Date(); // 初始时间
	noce.ajax("/DataQuery/submitQuery", "cmd=" + encodeURIComponent(JSON.stringify(sqlParaList)) + "&database=" + dataBase +"&appId="+appId+"&appName="+encodeURIComponent(appName)+paraUrl+"&dbName="+databaseName, function(data) {
		progressbarTwo.req_complete_time = new Date(); // 创建请求结束时间
		var totalReq = progressbarTwo.getReqTime(); // 计算总的加载时间
		//回调开始 
		progressbarTwo.callback_start_time = new Date(); // 记录回调函数开始时间
		
		if(noceUtil.isUndefined(paraAny)){
			if(callBackFunc.name != null || callBackFunc.name != ""){
				uor.put("callbackName", callBackFunc.name);
			}else{
				uor.put("callbackName", " ");
			}
			callBackFunc(data);
		}else{
			if(callBackFunc.name != null || callBackFunc.name != ""){
				uor.put("callbackName", callBackFunc.name);
			}else{
				uor.put("callbackName", " ");
			}
			callBackFunc(data,paraAny);
		}
		
		//回调结束
		progressbarTwo.callback_complete_time = new Date(); // 记录回调结束时间
		var totalCallback = progressbarTwo.getCallbackTime(); // 计算回调函数总耗时
		//在这里将所有的参数都放到数组中并调用上面的方法将数据传入后台进行持久化操作
		uor.put("userName" , progressbarTwo.userName);
		uor.put("appId" , progressbarTwo.getQueryString("appId"));
		uor.put("appName" , progressbarTwo.getQueryString("appName"));
		uor.put("operateTime" , operate_time);
		uor.put("reqParams" , JSON.stringify(sqlParaList));
		uor.put("reqTimeConsuming" , totalReq);
		uor.put("callbackTimeConsuming" , totalCallback);
		uor.put("totalTimeConsuming" , totalReq + totalCallback);
		//调用方法将数据保存到数据库中
//		progressbarTwo.submitUserOperateRecord(uor);
	}, true);
	
};



/**********************************
 * @funcname progressbarTwo.submitSqlSync
 * @funcdesc ajax同步请求，同步查询数据
 * @param {array} sqlParaList (input) 模板参数数组 格式：["id","key:value","key:value",…]
 * @param {function} callBackFunc (input) 回调函数 格式: func1方法
 * @param {number} dataBase (input) 数据库类型
 * @param {object} paraArray (input optional) 往回调函数中放入的参数 说明：附带上的参数
 * @param {string} paraUrl (input optional) 组件拼装的url
 * @return {null}
 * @author 梁杰禹
 * @create 20170808
 * @modifier 
 * @modify 
 ***********************************/
progressbarTwo.submitSqlSync = function(sqlParaList, callBackFunc,dataBase,paraAny,paraUrl){
	var appId=$('#currentAppId').val();
	var appName = $('#'+appId).text();
	if(paraUrl==""||paraUrl==undefined||paraUrl==null){
		paraUrl = "";
	}
	
	var uor = new Map();//创建一个map保存所有的信息
	var operate_time = new Date().Format("yyyy-MM-dd HH:mm:ss");  
	//初始时间
	progressbarTwo.req_start_time = new Date();
	noce.ajaxAsync("/DataQuery/submitQuery", "cmd=" + encodeURIComponent(JSON.stringify(sqlParaList)) + "&database=" + dataBase +"&appId="+appId+"&appName="+encodeURIComponent(appName)+paraUrl, function(data) {
		progressbarTwo.req_complete_time = new Date();
		var totalReq = progressbarTwo.getReqTime();
		//回调开始 
		progressbarTwo.callback_start_time = new Date();
		//回调开始  声明一个回调开始时间
		if(noceUtil.isUndefined(paraAny)){
			if(callBackFunc.name != null || callBackFunc.name != ""){
				uor.put("callbackName", callBackFunc.name);
			}else{
				uor.put("callbackName", " ");
			}
			callBackFunc(data);
		}else{
			if(callBackFunc.name != null || callBackFunc.name != ""){
				uor.put("callbackName", callBackFunc.name);
			}else{
				uor.put("callbackName", " ");
			}
			callBackFunc(data,paraAny);
		}
		//回调结束
		progressbarTwo.callback_complete_time = new Date();
		var totalCallback = progressbarTwo.getCallbackTime();
		//在这里将所有的参数都放到数组中并调用上面的方法将数据传入后台进行持久化操作
		uor.put("userName" , progressbarTwo.userName);
		uor.put("appId" , progressbarTwo.getQueryString("appId"));
		uor.put("appName" , progressbarTwo.getQueryString("appName"));
		uor.put("operateTime" , operate_time);
		uor.put("reqParams" , JSON.stringify(sqlParaList));
		uor.put("reqTimeConsuming" , totalReq);
		uor.put("callbackTimeConsuming" , totalCallback);
		uor.put("totalTimeConsuming" , totalReq + totalCallback);
		//调用方法将数据保存到数据库中
//		progressbarTwo.submitUserOperateRecord(uor);
	});
};

/**********************************
 * @funcname progressbarTwo.getParaUrl
 * @funcdesc 返回根据组件类型和参数拼装的字符串
 * @param {number} type 组件类型
 * @param {object} callPara 组件参数
 * @return {string} 根据组件类型拼接后的字符串
 * @author 梁杰禹
 * @create 20170808
 * @modifier 
 * @modify 
 ***********************************/
progressbarTwo.getParaUrl = function(type,callPara){
	var paraUrl = "";
	
	if(type==1){
		for(var item in callPara){
			paraUrl = paraUrl+"&tableToolsPara."+item+"="+callPara[item];
		} 
		paraUrl +="&toolsType="+type;
	}
	return paraUrl;
};

//------------------增加多实例的提交方法，适用于可取消本次的ajax请求-------------------------
function progressbarTwoMultiple(sqllist, functionlist,dataBase,paraArray,isAsync_ImpalaQuery,callType,callPara,isSync,dbName){
	this.sqllist = sqllist;
	this.functionlist = functionlist;
	this.dataBase = dataBase;
	this.paraArray = paraArray;
	this.isAsync_ImpalaQuery = isAsync_ImpalaQuery;
	this.callType = callType;
	this.callPara = callPara;
	this.isSync = isSync;
	this.dbName = dbName;
	this.sqlListCount = 0;
	this.completeCount = 0;
	this.sqlListAjax = [];
	if(dbName!=undefined||dbName!=null){
		this.sqlListCount = sqllist.length;
		for ( var i = 0; i < sqllist.length; i++) {  
			this.submitSqlAjax(sqllist[i],functionlist[i],dataBase[i],null,null,dbName[i]);
		}
		return;
	}
//	if(isAsync_ImpalaQuery==undefined||isAsync_ImpalaQuery==null){
		isAsync_ImpalaQuery = false;
//	}
	if(isSync==undefined||isSync==null){
		isSync = false;
	}
	if(callType == undefined || callType==null){
		callType = false;
	}
	
	if(noceUtil.isUndefined(paraArray)){
		paraArray = [];
	}
	
	if(sqllist.length==0){
		alert("传入的sql参数长度为0，请检查....");
		return;
	}
	//impala后台异步查询
//	if(isAsync_ImpalaQuery){
//		progressbarTwo.submitSqlAsync(sqllist,functionlist,paraArray,callType,callPara); // -----
//		return;
//	}
	if(noceUtil.isUndefined(dataBase)){
		dataBase = [];
	}
	
	if(callType==1||callType=="1"){
		this.sqlListCount = 1;
		var paraUrl = progressbarTwo.getParaUrl(1,callPara);
		this.submitSqlAjax(sqllist[0], functionlist[0],dataBase[0],paraArray[0],paraUrl);  // --------
		return;
	}
	
	if(isSync){
		// 依次对每条sql提交查询
		this.sqlListCount = sqllist.length;
		for ( var i = 0; i < sqllist.length; i++) {  
			if(dataBase[i]==null||dataBase[i]==undefined||dataBase[i].length==0){
				dataBase[i] = 2;
			}
			this.submitSqlSync(sqllist[i], functionlist[i],dataBase[i],paraArray[i]); // -------
		}
		return;
	}
	
	//依次对每条sql提交查询
	this.sqlListCount = sqllist.length;
	for ( var i = 0; i < sqllist.length; i++) {  
		if(dataBase[i]==null||dataBase[i]==undefined||dataBase[i].length==0){
			dataBase[i] = 2;
		}
		this.submitSqlAjax(sqllist[i], functionlist[i],dataBase[i],paraArray[i]);
	}
	
	
}

progressbarTwoMultiple.prototype = {
	sqllist: [],
	functionlist : [],
	dataBase : [],
	paraArray : [],
	isAsync_ImpalaQuery : false,
	callType : 1,
	callPara : {},
	isSync : false,
	dbName : null,
	sqlListCount : 0,
	completeCount : 0,
	sqlListAjax : [],
	submitSqlAjax: function(sqlParaList, callBackFunc,dataBase,paraAny,paraUrl,databaseName){
		var appId=$('#currentAppId').val();
		var appName = $('#'+appId).text();
		if(paraUrl==""||paraUrl==undefined||paraUrl==null){
			paraUrl = "";
		}
		var uor = new Map(); //创建一个map保存所有的信息
		var operate_time = new Date().Format("yyyy-MM-dd HH:mm:ss");  //创建操作时间
		progressbarTwo.req_start_time = new Date(); // 初始时间
        var objectThis = this;
		var $ajax = noce.ajax("pages_util_ProgressbarTwo_submitCmd.action", "cmd=" + encodeURIComponent(JSON.stringify(sqlParaList)) + "&database=" + dataBase +"&appId="+appId+"&appName="+encodeURIComponent(appName)+paraUrl+"&dbName="+databaseName, function(data) {
			progressbarTwo.req_complete_time = new Date(); // 创建请求结束时间
			var totalReq = progressbarTwo.getReqTime(); // 计算总的加载时间
			//回调开始 
			progressbarTwo.callback_start_time = new Date(); // 记录回调函数开始时间
			
			if(noceUtil.isUndefined(paraAny)){
				if(callBackFunc.name != null || callBackFunc.name != ""){
					uor.put("callbackName", callBackFunc.name);
				}else{
					uor.put("callbackName", " ");
				}
				callBackFunc(data);
			}else{
				if(callBackFunc.name != null || callBackFunc.name != ""){
					uor.put("callbackName", callBackFunc.name);
				}else{
					uor.put("callbackName", " ");
				}
				callBackFunc(data,paraAny);
			}
            objectThis.completeCount++;
			if(objectThis.completeCount == objectThis.sqlListCount){
				// console.log("submitSqlAjax：sql查询完成");
			}
			//回调结束
			progressbarTwo.callback_complete_time = new Date(); // 记录回调结束时间
			var totalCallback = progressbarTwo.getCallbackTime(); // 计算回调函数总耗时
			//在这里将所有的参数都放到数组中并调用上面的方法将数据传入后台进行持久化操作
			uor.put("userName" , progressbarTwo.userName);
			uor.put("appId" , progressbarTwo.getQueryString("appId"));
			uor.put("appName" , progressbarTwo.getQueryString("appName"));
			uor.put("operateTime" , operate_time);
			uor.put("reqParams" , JSON.stringify(sqlParaList));
			uor.put("reqTimeConsuming" , totalReq);
			uor.put("callbackTimeConsuming" , totalCallback);
			uor.put("totalTimeConsuming" , totalReq + totalCallback);
			//调用方法将数据保存到数据库中
//			progressbarTwo.submitUserOperateRecord(uor);
		}, true);
		this.sqlListAjax.push($ajax);
	},
	submitSqlSync:function(sqlParaList, callBackFunc,dataBase,paraAny,paraUrl){
		var appId=$('#currentAppId').val();
		var appName = $('#'+appId).text();
		if(paraUrl==""||paraUrl==undefined||paraUrl==null){
			paraUrl = "";
		}
		
		var uor = new Map();//创建一个map保存所有的信息
		var operate_time = new Date().Format("yyyy-MM-dd HH:mm:ss");  
		//初始时间
		progressbarTwo.req_start_time = new Date();

		var objectThis = this;

		var $ajax = noce.ajaxAsync("pages_util_ProgressbarTwo_submitCmd.action", "cmd=" + encodeURIComponent(JSON.stringify(sqlParaList)) + "&database=" + dataBase +"&appId="+appId+"&appName="+encodeURIComponent(appName)+paraUrl, function(data) {
			progressbarTwo.req_complete_time = new Date();
			var totalReq = progressbarTwo.getReqTime();
			//回调开始 
			progressbarTwo.callback_start_time = new Date();
			//回调开始  声明一个回调开始时间
			if(noceUtil.isUndefined(paraAny)){
				if(callBackFunc.name != null || callBackFunc.name != ""){
					uor.put("callbackName", callBackFunc.name);
				}else{
					uor.put("callbackName", " ");
				}
				callBackFunc(data);
			}else{
				if(callBackFunc.name != null || callBackFunc.name != ""){
					uor.put("callbackName", callBackFunc.name);
				}else{
					uor.put("callbackName", " ");
				}
				callBackFunc(data,paraAny);
			}

            objectThis.completeCount++;
			if(objectThis.completeCount == objectThis.sqlListCount){
				// console.log("submitSqlSync：sql查询完成");
			}
			
			//回调结束
			progressbarTwo.callback_complete_time = new Date();
			var totalCallback = progressbarTwo.getCallbackTime();
			//在这里将所有的参数都放到数组中并调用上面的方法将数据传入后台进行持久化操作
			uor.put("userName" , progressbarTwo.userName);
			uor.put("appId" , progressbarTwo.getQueryString("appId"));
			uor.put("appName" , progressbarTwo.getQueryString("appName"));
			uor.put("operateTime" , operate_time);
			uor.put("reqParams" , JSON.stringify(sqlParaList));
			uor.put("reqTimeConsuming" , totalReq);
			uor.put("callbackTimeConsuming" , totalCallback);
			uor.put("totalTimeConsuming" , totalReq + totalCallback);
			//调用方法将数据保存到数据库中
//			progressbarTwo.submitUserOperateRecord(uor);
		});
		this.sqlListAjax.push($ajax);
		
	},
	cancelSqlAjax: function(){
		for(var i=0;i<this.sqlListAjax.length;i++){
			if (this.sqlListAjax[i] != null && this.sqlListAjax[i].state() === 'pending') {
				this.sqlListAjax[i].abort();
		    }
		}
		this.sqlListAjax = null;
		this.sqlListAjax = [];
	}
}


//------------------增加多实例的提交方法，适用于可取消本次的ajax请求 end -------------------------


