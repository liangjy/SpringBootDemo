/**
 * 工程取SQL工具JS，存放公用方法
 */
var sqlUtil = {};


/**
 * 创建key-value的对象
 */
sqlUtil.ObjectKeyValue = function(key,value){
	 var obj = new Object();
	 obj.key = key;
	 obj.value = value;
	 return obj;
}

sqlUtil.JsonSqlObject = function(sql_id,param_arr){
	this.sql_id = sql_id;
	this.param_arr = param_arr;
}

/**
 * 创建key-value的JSON对象的字符串
 */
sqlUtil.JsonKeyValue = function(){
		var list = new Array();
		for(var i = 0; i < arguments.length; i++){
			list[i] = arguments[i];
		}
		var dataList = JSON.stringify(list);
		return dataList;
	}

sqlUtil.JsonKeyValueStr = function(){
	 if(arguments.length%2 !=0){
		 alert("传入的参数不是偶数！");
	 }
	 var listObj = new Array();
	 for(var i = 1; i < arguments.length; i++){
		 var obj,key,value;
		 if(arguments.length%3 == 0){
			 key = arguments[i];
			 value = arguments[i+1];
			 obj = noceUtil.ObjectKeyValue(key,value)
			 i +=1;
			 listObj.push(obj);	
		 }		 	 
	 }
	 var dataList = JSON.stringify(listObj);	 
	 return dataList;
}
/**
 * 获取单条SQL语句
 * 入参格式：{sqlId,key:value,key:value...}
 */
sqlUtil.getSqlStr = function(){
	var sql_id = arguments[0];
	var listObj = new Array();
	for(var i = 0; i < arguments.length-1; i++){
		var obj,str,key,value;
		str = arguments[i+1].split(":");
		key = str[0];
		value = str[1];
		obj = sqlUtil.ObjectKeyValue(key,value)
		listObj.push(obj);		 	 
	}
	 var dataList = JSON.stringify(listObj);	 
	 var sqlUtilQuery = {
			 "id":sql_id,
			 "param":dataList
	 }
	 //提交请求
	 var sql = "";
	 $.ajax({
         async: false,//默认true为异步，false为同步
         data: sqlUtilQuery,
         url: "pages_sqlUtil_sqlUtil_getSqlStr.action",
         dataType: "text",
         success: function(data){
        	 sql = data;
         }
	 });
	 return sql;	 	 
}

/**
 * 获取多条SQL语句
 * 入参格式：{[sqlId,key:value,key:value...],[sqlId,key:value,key:value...]}
 */
sqlUtil.getSqlList = function(){
	var sqlsList = new Array();
	for(var i = 0; i < arguments.length; i++){
		var obj,str,key,value;
		obj = arguments[i];
		var jsonSqlObject = new sqlUtil.JsonSqlObject();
		jsonSqlObject.sql_id = obj[0];
		var list = new Array();
		for(var j = 1; j < obj.length;j++){
			var keyValues = obj[j].split(":");
			var keyValueObject = new sqlUtil.ObjectKeyValue(keyValues[0],keyValues[1]);
			list.push(keyValueObject);						
		}
		jsonSqlObject.param_arr = list;	
		sqlsList.push(jsonSqlObject);
	}
	 var sqlsLists = JSON.stringify(sqlsList);	
	 var sqlUtilQuery = {
			 "param":sqlsLists
	 }
	 //提交请求
	 var sql = "";
	 $.ajax({
		 type:"POST",
         async: false,//默认true为异步，false为同步
         data: sqlUtilQuery,
         url: "pages_sqlUtil_sqlUtil_getSqlsList.action",
         dataType: "json",
         success: function(data){
        	 sql = data;
         }
	 });
	 return sql;	 	 
};

//根据sql获取数据
sqlUtil.loadData = function(querySql){
	var resultData;
	var sqlUtilQuery = {
			 "querySql":querySql
	 };
	$.ajax({
		type:"POST",
        async: false,//默认true为异步，false为同步
        data: sqlUtilQuery,
        url: "pages_sqlUtil_sqlUtil_loadData.action",
        dataType: "json",
        success: function(data){
        	resultData = data;
        }
	 });
	return resultData;
};