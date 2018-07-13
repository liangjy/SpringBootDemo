/**
 * 工程工具JS，存放公用方法
 */
var exportExcelUtil = {};

function sheet(columns,tableData,sheetName){
	this.columns = columns;
	this.tableData = tableData;
	this.sheetName = sheetName;
}

exportExcelUtil.exportBySql = function(para,fileName){
	if(noceUtil.isUndefined(para)){
		alert("para Is null");
		return;
	}
	if(noceUtil.isUndefined(fileName)){
		alert("fileName Is null");
		return;
	}
	
	var appId=$('#currentAppId').val();
	var appName = $('#'+appId).text();
	var form = $("<form>");   //定义一个form表单
    form.attr('style', 'display:none');   //在form表单中添加查询参数 
    form.attr('target', '');
    form.attr('method', 'post');
    form.attr('action', 'pages_excel_Excel_exportExcel.action');
    var html = '<textarea name="para">'+para+'</textarea>'+
    		   '<input name="fileName" value="'+fileName+'"></input>'+
    		   '<input name="appIp" value="'+appId+'"></input>'+
    		   '<input name="appName" value="'+appName+'"></input>';
    form.append(html);
    $('body').append(form);  //将表单放置在web中
    form.submit();
    form.remove();
};
/**
 * para:导出参数，格式为:第一个sheet的name_:_json转换成String后的字符串_;_第二个sheet的name_:_json转换成String后的字符串
 * fileName：Excel文件名称
 * dataType：查询的数据库类型（3:mysql否则impala）
 */
exportExcelUtil.exportBySqlPara = function(para,fileName,dataType){
	if(noceUtil.isUndefined(para)){
		alert("para Is null");
		return;
	}
	if(noceUtil.isUndefined(fileName)){
		alert("fileName Is null");
		return;
	}
	
	var appId=$('#currentAppId').val();
	var appName = $('#'+appId).text();
	var form = $("<form>");   //定义一个form表单
    form.attr('style', 'display:none');   //在form表单中添加查询参数 
    form.attr('target', '');
    form.attr('method', 'post');
    form.attr('action', 'pages_excel_Excel_exportExcelTwo.action');
    var html = '<textarea name="para">'+para+'</textarea>'+
    		   '<input name="fileName" value="'+fileName+'"></input>'+
    		   '<input name="dataType" value="'+dataType+'"></input>'+
    		   '<input name="appIp" value="'+appId+'"></input>'+
    		   '<input name="appName" value="'+appName+'"></input>';
    form.append(html);
    $('body').append(form);  //将表单放置在web中
    form.submit();
    form.remove();
};

exportExcelUtil.exportExcelByList = function(){
	var fileName = arguments[0];
	if((typeof fileName!='string') && fileName.constructor!=String){
		alert("fileName 必须是字符串类型");
		return;
	}
	var sheetList = new Array();
	for(var i = 1; i < arguments.length; i++){
		sheetList[i-1] = arguments[i];
	}
	var dataList = JSON.stringify(sheetList);
	
	var appId=$('#currentAppId').val();
	var appName = $('#'+appId).text();
	
	var form = $("<form>");   //定义一个form表单
    form.attr('style', 'display:none');   //在form表单中添加查询参数 
    form.attr('target', '');
    form.attr('method', 'post');
    form.attr('action', 'pages_excel_Excel_exportExcelByDataList.action');
    var html = '<input name="fileName" value='+fileName+'></input>'+
               '<textarea name="sheetList">'+dataList+'</textarea>'+
    		   '<input name="appIp" value='+appId+'></input>'+
    		   '<input name="appName" value='+appName+'></input>';
    form.append(html);
    $('body').append(form);  //将表单放置在web中
    form.submit();
    form.remove();
};

/**********************************
 * @funcname exportExcelNew
 * @funcdesc 新的excel导出构造函数，支持表头合并
 * @param {exportObj} type (input)
 * @return {null}
 * @author 邹土杰
 * @create 20170523
 * @modifier 
 * @modify 
 ***********************************/
function exportExcelNew(exportObj){
	this.exportObj=JSON.stringify(exportObj);
}
/**********************************
 * @funcname exportExcelNew.prototype.submit
 * @funcdesc 新的excel导出提交方法，支持表头合并
 * @param {exportObj} type (input)
 * @return {null}
 * @author 邹土杰
 * @create 20170523
 * @modifier 
 * @modify 
 ***********************************/
exportExcelNew.prototype.submit = function(){
	var appId=$('#currentAppId').val();
	var appName = $('#'+appId).text();
	var form = $("<form>");   //定义一个form表单
    form.attr('style', 'display:none');   //在form表单中添加查询参数 
    form.attr('target', '');
    form.attr('method', 'post');
    // 以二进制数据流的方式传输,防止表单数据过大后台接收数据不到的情况
    form.attr('enctype', 'multipart/form-data');
    form.attr('action', 'pages_excel_Excel_exportExcelNew.action');
    var html = '<textarea name="exportObj">'+this.exportObj+'</textarea>';
    form.append(html);
    $('body').append(form);  //将表单放置在web中
    form.submit();
    form.remove();
}