

function TableToolsNewTwo(loadMore,loading,noMore,currentTableId,sortColumn,thead,tableHead,table,condition,pageSize,pageIndex,sortType,dataType,tableCss,
		sortFlag,pageFlag,theadObj,clnObj,rowCss,divCss,sceneId,exportObj,Data,fixObj,scrollObj,frontFlag){//创建对象及其属性
		this.loadMore = loadMore;//加载更多
		this.loading = loading;//加载中
		this.noMore = noMore;//没有更多数据
		this.currentTableId = currentTableId;//当前tableId
		this.sortColumn = sortColumn;//默认排序字段
		this.thead = thead;//显示的表头名称
		this.tableHead = tableHead;//生成的表头样式
		this.table = table;//生成的表样式
		this.condition = condition;// 查询条件
		this.pageSize = pageSize;//行数
		this.pageIndex = pageIndex;// 页数
		this.sortType = sortType;//排序类型	
		this.dataType = dataType;//查询数据库类型
		this.tableCss = tableCss;//查询单元格的样式
		//新增的属性
		this.sortFlag = sortFlag;//是否排序功能（表头箭头、表头绑定排序函数是否移除）
		this.pageFlag = pageFlag;//是否需要分页功能
		this.theadObj = theadObj;//表头对象
		this.clnObj = clnObj;//列单元格对象
		this.rowCss = rowCss;//奇偶行样式
		this.divCss = divCss;//表格外层div样式
		this.sceneId = sceneId;//判断是场景0还是场景1
		this.exportObj=exportObj;//导出中文表头（也可合并表头）的表格
		this.Data = Data;//直接提供数据去生成表格
		this.fixObj=fixObj;//冻结行列（前面）
		this.scrollObj=scrollObj;//表格结束后，将滚动指定的值到可视范围内
		this.frontFlag=frontFlag;//是否需要前端分页
		this.theadFlag=true;//是否第一次生成数据，通常用于合并表头的功能；前端定位的功能
		this.callBackTranFn=null;//回调函数方法执行前的处理函数
/**
 * 生成table表单入口
 * @param tableDivId 生成table表单的块ID
 * @param tableId 生成table表单的ID
 * @param tableSqlPara sql的模板参数
 * @param tableSqlStr 输入的指定格式的字符串,如：查询类型&默认的排序字段&行数&指定的中文表头名称
 * @param tableCss 输入的指定列和该列的样式配置,
 * 格式：col_css=[[col_index1,css_list1],[col_index1,css_list1],...]
 * 说明：col_index为列号，从0开始（即第1列取值为0)，css_list为列的css类配置说明，
 * css_list=["map",[cell_value1,css_class_name1],[cell_value2,css_class_name2]]
 * css_list=["range",[cell_value1,css_class_name1],[cell_value2,css_class_name2]]
 * css_list=["cln",["css_green_font"]]
 * cell_value为列值，css_class_name为类名。
 * 查询类型：暂定1为impala异步查询，2为impala同步查询，3为mysql查询
 */

TableToolsNewTwo.prototype.submit = function(){
	if(arguments.length<2){
		TableToolsNewTwo.prototype.submit1(arguments);
	}else{
		TableToolsNewTwo.prototype.submit0(arguments);
	}
	
};
//场景0提交表单入口
TableToolsNewTwo.prototype.submit0=function(arguments){
	var sceneId=0;
	var tableDivId=arguments[0];
	var tableId=arguments[1];
	var tableSqlPara=arguments[2];
	var tableSqlStr=arguments[3];
	var tableCss=arguments[4];
	//tableDivId,tableId,tableSqlPara,tableSqlStr,tableCss
	var tableSqlStr = TableToolsNewTwo.prototype.check(tableSqlStr);
	var sqlStr = tableSqlStr.split("&");
	var dataType = 1;
	var sqlPara= tableSqlPara;
	var sortColumn = "";
	var pageSize = "";
	var pageIndex = 0;
	var thead = "";
	var specifyCss = [];
	var sortType = "desc";//默认降序排序
	if(sqlStr.length == 2){
		dataType = parseInt(sqlStr[0].trim());
		sortColumn = sqlStr[1].trim();
	}else if(sqlStr.length == 3){
		dataType = parseInt(sqlStr[0].trim());
		sortColumn = sqlStr[1].trim();
		pageSize = sqlStr[2].trim();
	}else if(sqlStr.length == 4){
		dataType = parseInt(sqlStr[0].trim());
		sortColumn = sqlStr[1].trim();
		pageSize = sqlStr[2].trim();
		thead = sqlStr[3].trim();
	}
	if(sortColumn.indexOf(":")>-1){
		var cloumnsAndSort = sortColumn.split(":");
		sortColumn=cloumnsAndSort[0];
		if(cloumnsAndSort[1]==""){
			sortType = cloumnsAndSort[1];
		}
	}
	if(!noceUtil.integerValidat(pageSize)){
		pageSize = 20;
	}
	if(tableCss!=undefined){
		specifyCss=tableCss;
	}
	var sceneId=0;
	var that = this;//this为TableTools对象的属性和值
	that.currentTableId = tableId;
	
	that.sortColumn = sortColumn;
	that.pageSize = pageSize;
	that.pageIndex = pageIndex;
	that.sortType = sortType;
	that.thead = thead;
	that.tableDivId = tableDivId;
	that.dataType = dataType;
	that.tableCss = specifyCss;
	that.sceneId=sceneId;
	var tableDiv = TableToolsNewTwo.prototype.createTableDiv(that);
	$("#"+tableDivId).html(tableDiv);	
	that.condition = {
		"sql":sqlPara,
		"sortColumn":sortColumn,
		"pageSize":pageSize,
		"pageIndex":pageIndex,
		"thead":thead,
		"sortType":sortType,
		"dataType":dataType,
		"sceneId":sceneId
	};
	
	TableToolsNewTwo.prototype.init(that);
	var fun = function(data){
		TableToolsNewTwo.prototype.createSortColumns(that.currentTableId,data.columns,that.sortColumn);
		TableToolsNewTwo.prototype.freshTable(data,that);
	};
	var functionlist=[fun];	
	TableToolsNewTwo.prototype.progressSql(sqlPara,sortColumn,that.sortType,pageSize,pageIndex,functionlist,that.tableDivId,that);
//	TableToolsNewTwo.prototype.progressSql(sqlPara,functionlist,that);
}

/**********************************
 *@funcname submit1
* @funcdesc 场景1提交表单入口：通过传入表格对象tableObj 
* @param { Object} arguments 传入拼接好的表格参数对象
* @return { null }
**********************************/
TableToolsNewTwo.prototype.submit1=function(arguments){
	var sceneId=1;
	var tableObj=arguments[0];
	var tableDivId=tableObj.divId;//表格外层的divId
	var tableId=tableObj.tableId;//表格的id
	var tableSqlPara=tableObj.sql;//拼接的sql
	var sqlPara= tableSqlPara;
	var dataType=noceUtil.isUndefined(tableObj.dataType) ? 1 : tableObj.dataType;//数据库类型  默认为1impala
	var sortFlag=tableObj.sortFlag==undefined ? 1 : tableObj.sortFlag;//是否排序  0：不排序 ；1：排序
	var sortColumn="";
	var sortType="desc";
	if(!noceUtil.isUndefined(tableObj.sortObj)){ //排序字段
		if(!noceUtil.isUndefined(tableObj.sortObj.sortColumn)){
			sortColumn=tableObj.sortObj.sortColumn;
		}
		if(!noceUtil.isUndefined(tableObj.sortObj.sortType)){//排序类型
			sortType=tableObj.sortObj.sortType;
		}
		
	}
	var pageFlag=1;
	var pageSize=20;
	if(!noceUtil.isUndefined(tableObj.pageObj)){
		if(tableObj.pageObj.pageFlag!=undefined){ //是否分页 0：不分页；1：分页
			pageFlag=tableObj.pageObj.pageFlag;
		}
		if(!noceUtil.isUndefined(tableObj.pageObj.pageSize)){//每页的行数；
			pageSize=tableObj.pageObj.pageSize;
		}
		
	}
	var pageIndex = 0;
	var thead = noceUtil.isUndefined(tableObj.tableHead) ? "" : tableObj.tableHead;//表头，不包括需要合并的表头
	var specifyCss = [];
	if(tableCss!=undefined){
		specifyCss=tableCss;
	}
	var theadObj=noceUtil.isUndefined(tableObj.theadObj) ? "" : tableObj.theadObj;
	var clnObj=noceUtil.isUndefined(tableObj.clnObj) ? "" : tableObj.clnObj;
	var rowCss=noceUtil.isUndefined(tableObj.rowCss) ? "" : tableObj.rowCss;
	var divCss=noceUtil.isUndefined(tableObj.divCss) ? "" : tableObj.divCss;
	var exportObj=noceUtil.isUndefined(tableObj.exportObj) ? "" : tableObj.exportObj;
	var Data="";
	if(!noceUtil.isUndefined(tableObj.Data)){//如果是直接通过数据生成表格，则不排序，不需要排序字段，不分页，不需要拼接表格导出对象
		Data=tableObj.Data;
		exportObj="";
		sortColumn="";
		sortFlag=0;
		pageFlag=0;
	} 
	var fixObj=noceUtil.isUndefined(tableObj.fixObj) ? "" : tableObj.fixObj;//冻结行列
	var scrollObj=noceUtil.isUndefined(tableObj.scrollObj) ? "" : tableObj.scrollObj;//定位滚动到某一行的参数
	var frontFlag=noceUtil.isUndefined(tableObj.frontFlag) ? 0 : tableObj.frontFlag;//是否需要前端分页：0---默认不需要 ；1---需要做前端分页
	
	var frontPage;
	if(frontFlag==1){
		pageFlag=pageFlag;
		frontPage=1;
	}
	var addCln=noceUtil.isUndefined(clnObj.lastCln) ? 0 : clnObj.lastCln.addClnNum;//增加最后一列
	
	
	var that = tableObj;//this为TableTools对象的属性和值
	that.currentTableId = tableId;
	
	that.sortColumn = sortColumn;//排序字段
	that.pageSize = pageSize;//每页显示多少行数据
	that.pageIndex = pageIndex;//第几页
	that.sortType = sortType;//排序类型。默认desc
	that.thead = thead;//表头
	that.tableDivId = tableDivId;//表格最外层的divid
	that.dataType = dataType;
	that.tableCss = specifyCss;

	that.sortFlag=sortFlag;//是否排序
	that.pageFlag=pageFlag;//是否分页
	that.theadObj = theadObj;//表头对象
	that.clnObj = clnObj;//列单元格对象
	that.rowCss = rowCss;//奇偶行样式
	that.divCss = divCss;//表格外层div样式
	that.sceneId = sceneId;//判断是场景1还是场景2
	that.Data = Data;//直接提供数据去生成表格
	that.exportObj = exportObj;//导出中文表头对象
	that.fixObj = fixObj;//冻结列对象
	that.scrollObj=scrollObj;//定位滚动到具体的行
	that.frontFlag=frontFlag;//是否需要前端分页：0---默认不需要 ；1---需要做前端分页
	that.frontPage=frontPage;//前端分页第几页
	that.addCln = addCln;//在表格后面再增加多少列
	that.loadEnd=false;//监控表格组件是否执行完毕
	that.theadFlag=true;//用于监控是否第一次生成数据
	that.callBackTranFn=tableObj.callBackTranFn;//处理函数

	
	
	//判断是否需要冻结列
	var tableFixDiv = TableToolsNewTwo.prototype.createTableFixDiv(that);
	var tablePtn="";
	var myPageHtml="";
	if(that.frontFlag==0){
		tablePtn=TableToolsNewTwo.prototype.createTablePtn(that);
	}else{
		myPageHtml=TableToolsNewTwo.prototype.createMyPageDiv(that);
	}
	
	if(tableFixDiv!=""){
		that.fix=true;
		var tableDiv = TableToolsNewTwo.prototype.createTableDiv(that);
		$("#"+tableDivId).html("<div class='positionDiv'>"+tableFixDiv+tableDiv+"</div>"+tablePtn+myPageHtml);
	}else{
		var tableDiv = TableToolsNewTwo.prototype.createTableDiv(that);
		$("#"+tableDivId).html("<div class='positionDiv'>"+tableDiv+"</div>"+tablePtn+myPageHtml);
		//$("#"+tableDivId).append(tablePtn); 
		//$("#"+tableDivId).append(myPageHtml); 
	}
	$("#"+tableDivId).addClass("tableDivClass");
	
	that.condition = {
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
	
	TableToolsNewTwo.prototype.init(that);
	if(!noceUtil.isUndefined(that.Data)){
		if(that.fix){
			TableToolsNewTwo.prototype.createFixSortColumns(that.fixTableId,that.Data.columns,that.sortColumn,that.fixCln);
		}
		TableToolsNewTwo.prototype.createSortColumns(that.currentTableId,that.Data.columns,that.sortColumn);
		if(that.frontFlag==1){
			TableToolsNewTwo.prototype.freshFrontTable(that.Data,that);
		}else{
			TableToolsNewTwo.prototype.freshTable(that.Data,that);
		}
		
	}else{
		var fun = function(data){
            if(!noceUtil.isUndefined(that.callBackTranFn) && data.result.length > 0){
                data = that.callBackTranFn(data);
            }
			if(that.fix){
				TableToolsNewTwo.prototype.createFixSortColumns(that.fixTableId,data.columns,that.sortColumn,that.fixCln);
			}
			TableToolsNewTwo.prototype.createSortColumns(that.currentTableId,data.columns,that.sortColumn);
			if(that.frontFlag==1){
				TableToolsNewTwo.prototype.freshFrontTable(data,that);
			}else{
				TableToolsNewTwo.prototype.freshTable(data,that);
			}
			
		};
		var functionlist=[fun];	
		TableToolsNewTwo.prototype.progressSql(sqlPara,sortColumn,that.sortType,pageSize,pageIndex,functionlist,that.tableDivId,that);
//		TableToolsNewTwo.prototype.progressSql(sqlPara,functionlist,that);
	}
}


/********************************** 
* @funcname progressSql
* @funcdesc 拼装SQL，提交请求
* @param {String} type (input optional) sqlPara：传入的sql
* @param {String} type (input optional) sortColumn：需要排序的字段
* @param {String} type (input optional) sortType：排序类型desc还是asc
* @param {Number} type (input optional) pageSize：分页
* @param {Number} type (input optional) pageIndex：查询第几页的数据
* @param {Array} type (input optional) functionlist：回调函数
* @param {String} type (input optional) tableDivId：表格DiV的id
* @param {Object} type (input optional) that：TableToolsNewTwo对象属性参数
* @return {null}
* @author 陈小芳
* @create 20170515
* @modifier 陈小芳
* @modify 20170515 
***********************************/
TableToolsNewTwo.prototype.progressSql  = function(sqlPara,sortColumn,sortType,pageSize,pageIndex,functionlist,tableDivId,that){
	var SqlList = [];//需使用[]，不然会解析出错
	SqlList.push(sqlPara);
	that.condition.sortColumn = sortColumn;
	that.condition.sortType = sortType;
	that.condition.pageSize = pageSize;
	that.condition.pageIndex = pageIndex;
	if(that.frontFlag==1){
		that.condition.pageFlag = 0;
	}
	
	if(that.condition.dataType==1){
		progressbarTwo.submitSql(SqlList,functionlist,null,null,true,1,that.condition);
	}else{
		var dataBase = [that.condition.dataType];
		progressbarTwo.submitSql(SqlList,functionlist,dataBase,null,false,1,that.condition);
	}
//	progressCanvas.submitSqlDiv(progressCanvasSql,functionlist,reflectClass,tableDivId);
};




/********************************** 
* @funcname freshTable
* @funcdesc 后台分页生成数据，或者直接传入Data参数。用于第一次刷新表格
* @param {Object} type (input optional) data：传入的Data对象/sql查询回来的数据
* @param {Object} type (input optional) that：TableToolsNewTwo对象属性参数
* @return {null}
* @author 陈小芳
* @create 20170515
* @modifier 陈小芳
* @modify 20170515 
***********************************/
TableToolsNewTwo.prototype.freshTable = function(data,that) {
	that.currentPageSize=0;
	var $tableDiv=$("#" + that.tableDivId);
	var $table = $("#" + that.currentTableId);
	var $tableFix = $("#" + that.fixTableId);
	var $tbody = $table.find("tbody");
	var $tbodyFix=$tableFix.find("tbody");
	
	
	var fixCln=0;
	if(!noceUtil.isUndefined(that.fix)&&that.fix==true){
		fixCln=that.fixObj.fixClnObj.fixCln;//冻结的列
	}
	
	
	var tbody = "";
	var tr = "";
	var tr2 = "";
	
	var tbodyFix = "";
	var trFix = "";
	var tr2Fix = "";
	// 获取pageIndex
	/*var pageIndex = $table.attr("pageIndex");
	if (noceUtil.isUndefined(pageIndex)) {
		pageIndex = 1;
		$table.attr("pageIndex", "1");
	}
	if (pageIndex == 1) {
		$tbody.empty();
	}*/	
	$tbody.empty();	
	$tbodyFix.empty();
	// 对象赋值
	that.loadMore = $tableDiv.find(".pmore_1"); 
	that.loading = $tableDiv.find(".pmore_2");
	that.noMore = $tableDiv.find(".pmore_3");
	var result = data.result;
	var types = data.types;
	var columns = data.columns;
	
	
	
	/*//单元格对象
	col_css=
	[[col_index1,css_list1],[col_index1,css_list1],...]

	css_list=
	["map",[cell_value1,css_class_name1],[cell_value2,css_class_name2]]
	["map",["优于","css_green_font"],["劣于","css_red_font"]]
	[5,["map",["优于","green_font"],["劣于","red_font"]]] 

	css_list=
	["range",[cell_value1,css_class_name1],[cell_value2,css_class_name2]]

	css_list=
	["cln",["css_green_font"]]
	var clnObj={clnCssArray:[{clnNum:4,clnCss:["map",["优于","green_font"],["劣于","red_font"]]},{clnNum:5,clnCss:["map",["优于","green_font"],["劣于","red_font"]]}],
			functionArray:[{funCln:4,funtion:"test4",funType:1},{funCln:5,funtion:"test5",funType:1}]
	       		};*/
	
	// 重绘数据
	for ( var i = 0; i < result.length; i++) {//第几行
		var hResult = result[i];
		if(fixCln==0){
			tr = "<tr>" +'<td style="text-align:center"><div class="alltd">' + (i+1) + '</div></td>';
		}else{
			trFix = "<tr>" +'<td style="text-align:center"><div class="alltd">' + (i+1) + '</div></td>';
			tr = "<tr>";
		}
		
		var td_Length = $table.find("thead").find("td").length+fixCln;
		if(fixCln>0){
			td_Length=td_Length+1;
		}

		for ( var j = 0; j < td_Length-1-that.addCln; j++) {//第几列
			//var tmp = noceUtil.fixL2(hResult[j]);
			var tmp = hResult[j];
			if (tmp == null) {
				tmp = '';
			}/*else if(tmp.length>13&&tmp.indexOf("input")<0){
				tmp = '<a title='+tmp+'>'+tmp.substring(0,6)+"...."+tmp.substring(tmp.length-6,tmp.length)+'</a>';				
			}*/
			
			
			
			if(that.sceneId==1){
				var clnCss="";
				var funtion="";
				var subObj=TableToolsNewTwo.prototype.bindClnValueAndTitle(j,tmp,that.clnObj.subArray);
				if(!noceUtil.isUndefined(that.clnObj.clnCssArray)){
					clnCss=TableToolsNewTwo.prototype.bindClnCss(j,tmp,that.clnObj.clnCssArray);
				}
				if(!noceUtil.isUndefined(that.clnObj.functionArray)){
					funtion=TableToolsNewTwo.prototype.bindClnFunction(j,tmp,that.clnObj.functionArray);
				}
				if(!noceUtil.isUndefined(funtion)){
					var dataResult=TableToolsNewTwo.prototype.dataObject(hResult,columns);
					if(funtion.indexOf("()")>-1){ 
						funtion=funtion.replace("(", "("+JSON.stringify(dataResult).replace(/"/g, '&quot;').replace(/\n/g,'&#10;').replace(/\r/g,'&#13;').replace(/ /g,'&nbsp;')+"");
					}else{
						funtion=funtion.replace("(", "("+JSON.stringify(dataResult).replace(/"/g, '&quot;').replace(/\n/g,'&#10;').replace(/\r/g,'&#13;').replace(/ /g,'&nbsp;')+","); 
					}
				}
				if(j<fixCln){
					if(subObj.isSub==0){
						if(!noceUtil.isUndefined(subObj.title)){
							tmp = '<a class="'+clnCss+'" title='+subObj.title+'>'+subObj.value+'</a>';
							trFix=trFix+'<td  '+funtion+'><div class="alltd">' + tmp + '</div></td>';	
						}else{
							trFix=trFix+'<td class="'+clnCss+'" '+funtion+'><div class="alltd">' + subObj.value + '</div></td>';	
						}
					}else{
						trFix=trFix+'<td class="'+clnCss+'" '+funtion+'><div class="alltd">' + subObj.value + '</div></td>';	
					}
					
				}else if(j>=fixCln){
					if(subObj.isSub==0){
						if(!noceUtil.isUndefined(subObj.title)){
							tmp = '<a class="'+clnCss+'" title='+subObj.title+'>'+subObj.value+'</a>';
							tr = tr + '<td  '+funtion+'><div class="alltd">' + tmp + '</div></td>';
						}else{
							tr = tr + '<td class="'+clnCss+'" '+funtion+'><div class="alltd">' + subObj.value + '</div></td>';
						}
					}else{
						tr = tr + '<td class="'+clnCss+'" '+funtion+'><div class="alltd">' + subObj.value + '</div></td>';
					}
					
						
				}
				
			}else{
				var type = types[j];
				if(type == "String"){
					var haveCss = false;
					for(var k=0;k<that.tableCss.length;k++){
						if(j==that.tableCss[k][0]){
							var sCss = that.tableCss[k][1];
							if(sCss[0]=="map"){
								for(var p=1;p<sCss[0].length;p++){
									if(tmp==sCss[p][0]){
										tr = tr + '<td class="'+sCss[p][1]+'">' + tmp + '</td>';
										haveCss = true;
									}
								}
							}
						}
					}
					if(!haveCss){
						tr = tr + '<td>' + tmp + '</td>';	
					}
					
				}else{
					tr = tr + '<td >' + tmp + '</td>';
				}
			}
		}
		if(that.addCln>0){
			var addClnValue=that.clnObj.lastCln.addClnValue;
			for(var k=0;k<addClnValue.length;k++){
				tr = tr + '<td><div class="alltd">' + addClnValue[k] + '</div></td>';	
			}
			
		}
		
		if(fixCln>0){
			trFix = trFix + "</tr>";
			tbodyFix = tbodyFix + trFix;
		}
		tr = tr + "</tr>";
		tbody = tbody + tr;
	}
	$tbody.append(tbody);
	$tbodyFix.append(tbodyFix);
	if(that.sceneId==1&&that.sortFlag==0){//不排序
		$table.find(".nrp_dowm").remove();//移除箭头
		$table.find(".nr_paixu").removeClass("down");//移除排序字段灰色背景
		$table.find("thead td").removeClass("nr_paixu");//移除表头手形图标
		$tableFix.find(".nrp_dowm").remove();//移除箭头
		$tableFix.find(".nr_paixu").removeClass("down");//移除排序字段灰色背景
		$tableFix.find("thead td").removeClass("nr_paixu");//移除表头手形图标
	}
	that.currentPageSize=result.length;
	if(that.sceneId==1&&that.pageFlag==0){//不分页
		that.noMore.show();
		that.loadMore.hide();
		that.loading.hide();
	}else{
		if (result.length == that.condition.pageSize) {
			if (noceUtil.isUndefined(that.pageIndex)) {
				that.pageIndex=1;
				that.pageIndex++;
			}
			
//			that.condition.pageIndex = that.pageIndex;
			that.loadMore.show();
			that.loading.hide();
			that.noMore.hide();
			that.loadMore.unbind('click').click(function() {
				$(this).hide();
				$(this).siblings('.pmore_2').show();
				TableToolsNewTwo.prototype.getMoreData(this,that); 
			});
		} else if(result.length < that.condition.pageSize){
			that.noMore.show();
			that.loadMore.hide();
			that.loading.hide();
		} else if (result.length == 0) {
			that.noMore.show();
			that.loadMore.hide();
			that.loading.hide();
		} else {
			that.noMore.hide();
			that.loadMore.show();
			that.loading.hide();
		}
	}
	
	
	//只会执行一次合并表头的逻辑
	if(that.theadFlag){
		if(that.sceneId==1){
//			var arr2 = $("#"+that.currentTableId+" tr");
//			var tr = arr2[0];
			var clospanTheadHtml=TableToolsNewTwo.prototype.clospanThead(that);
//			$(tr).before(clospanTheadHtml);
		}
		that.theadFlag=false;
	}
	
	//添加奇偶行样式
	if(that.sceneId==1){
		if(!noceUtil.isUndefined(that.rowCss)){
			$tbody.find("tr:nth-child(odd)").addClass(that.rowCss.oddRowCss);
			$tbody.find("tr:nth-child(even)").addClass(that.rowCss.evenRowCss);
			$tbodyFix.find("tr:nth-child(odd)").addClass(that.rowCss.oddRowCss);
			$tbodyFix.find("tr:nth-child(even)").addClass(that.rowCss.evenRowCss);
		}
	}
	if(fixCln>0){
		//因两个表格边框线重叠，故去掉右边表格的边框线
		$("#"+that.currentTableId).css({"border-left":"0"});
		//左边表格鼠标移上去变色
		$("#"+that.fixTableId+" tbody tr").hover(function () {
			var index=$(this).index();
			$("#"+that.currentTableId+" tbody tr").eq(index).addClass("hoverTr");
		});
		//右边表格鼠标移上去变色
		$("#"+that.currentTableId+" tbody tr").hover(function () {
			var index=$(this).index();
			$("#"+that.fixTableId+" tbody tr").eq(index).addClass("hoverTr");
		});
		
		$("#leftIcon").click(function () {//隐藏左边菜单栏的
			$(window).resize();
			
		});
		$(window).resize(function() {//屏幕自适应
			TableToolsNewTwo.prototype.resizeWidht(that);
		});
		
	}else{
		$("#"+that.divId+" .tableWrap").addClass("normalTable").removeClass("scrollDiv");
	}
	
	TableToolsNewTwo.prototype.resizeWidht(that);
	TableToolsNewTwo.prototype.frozedRow(that);
	
	
	
	$(".table tbody tr").mouseenter(function () {
		$(this).addClass("hoverTr");
	}).mouseleave(function () {
		$(".table tbody tr").removeClass("hoverTr");
	});
	that.loadEnd=true;
	TableToolsNewTwo.prototype.locationTableRow(data,that);
};


/********************************** 
* @funcname freshFrontTable
* @funcdesc 前端分页生成数据
* @param {Object} type (input optional) data：传入的Data对象/sql查询回来的数据
* @param {Object} type (input optional) that：TableToolsNewTwo对象属性参数
* @return {null}
* @author 陈小芳
* @create 20170515
* @modifier 陈小芳
* @modify 20170515 
***********************************/
TableToolsNewTwo.prototype.freshFrontTable = function(data,that) {
	that.Data=data;
	if(noceUtil.isUndefined(data.result)){
		$("#"+that.tableDivId).find("#First").removeClass("first-active").addClass("first-disabled");
		$("#"+that.tableDivId).find("#Prev").removeClass("prev-active").addClass("prev-disabled");
		$("#"+that.tableDivId).find("#Last").removeClass("last-active").addClass("last-disabled");
		$("#"+that.tableDivId).find("#Next").removeClass("next-active").addClass("next-disabled");
		return;
	}
	
	if(that.theadFlag){
		if(!noceUtil.isUndefined(that.scrollObj)&&
				!noceUtil.isUndefined(that.scrollObj.clnNums)&&
				!noceUtil.isUndefined(that.scrollObj.clnValues)){
			var result=data.result;
			$("#"+that.divId+ " table tr").removeClass("loadTr");
			for(var i=0;i<result.length;i++){
				var flag=true;
				for(var j=0;j<that.scrollObj.clnNums.length;j++){
					if(that.scrollObj.clnNums[j]==0){//增加这个判断是因为首次跳转定位的页数是没有序号的，而that.scrollObj.clnNums[j]==0代表序号列
						if((i+1)!=that.scrollObj.clnValues[j]){
							flag=false;
							break;
						}
					}else{
						var cln=that.scrollObj.clnNums[j]-1;
						if(result[i][cln]!=that.scrollObj.clnValues[j]){
//							console.log(result[i][cln] +" "+that.scrollObj.clnValues[j]+"///" +i +" "+j);
							flag=false;
							break;
						}
					}
					
				}
				if(flag){
					that.frontPage=Math.ceil((i+1)/that.pageSize);
					break;
				}
			}
			
		}
	}
	
		
		
	var fullListSize=data.result.length;//共有多少条数据
	var iStart=(that.frontPage-1)*that.pageSize+1;//起始下标
	var iend=that.frontPage*that.pageSize;//结束下标
	var totalPages=Math.ceil(data.result.length/that.pageSize);//总页数 最后一页的页数
	if(totalPages==that.frontPage){
		iend=fullListSize;
	}
	$("#"+that.tableDivId+" .myPage  #PageNumber").val(that.frontPage);
	$("#"+that.tableDivId+" .myPage  #firstRowIdx").text(iStart);
	$("#"+that.tableDivId+" .myPage  #PageTotal").text(totalPages);
	$("#"+that.tableDivId+" .myPage  #endRowIdx").text(iend);
	$("#"+that.tableDivId+" .myPage  #fullListSize").text(fullListSize);
	
	if(that.frontPage==1){
		$("#"+that.tableDivId).find("#First").removeClass("first-active").addClass("first-disabled");
		$("#"+that.tableDivId).find("#Prev").removeClass("prev-active").addClass("prev-disabled");
		$("#"+that.tableDivId).find("#Last").removeClass("last-disabled").addClass("last-active");
		$("#"+that.tableDivId).find("#Next").removeClass("next-disabled").addClass("next-active");
	}else if(that.frontPage==totalPages){
		$("#"+that.tableDivId).find("#First").removeClass("first-disabled").addClass("first-active");
		$("#"+that.tableDivId).find("#Prev").removeClass("prev-disabled").addClass("prev-active");
		$("#"+that.tableDivId).find("#Last").removeClass("last-active").addClass("last-disabled");
		$("#"+that.tableDivId).find("#Next").removeClass("next-active").addClass("next-disabled");
	}else{
		$("#"+that.tableDivId).find("#First").removeClass("first-disabled").addClass("first-active");
		$("#"+that.tableDivId).find("#Prev").removeClass("prev-disabled").addClass("prev-active");
		$("#"+that.tableDivId).find("#Last").removeClass("last-disabled").addClass("last-active");
		$("#"+that.tableDivId).find("#Next").removeClass("next-disabled").addClass("next-active");
	}

	that.currentPageSize=0;
	var $tableDiv=$("#" + that.tableDivId);
	var $table = $("#" + that.currentTableId);
	var $tableFix = $("#" + that.fixTableId);
	var $tbody = $table.find("tbody");
	var $tbodyFix=$tableFix.find("tbody");
	
	
	var fixCln=0;
	if(!noceUtil.isUndefined(that.fix)&&that.fix==true){
		fixCln=that.fixObj.fixClnObj.fixCln;//冻结的列
	}
	
	
	var tbody = "";
	var tr = "";
	var tr2 = "";
	
	var tbodyFix = "";
	var trFix = "";
	var tr2Fix = "";
	
	$tbody.empty();	
	$tbodyFix.empty();
	
	var result = data.result;
	var types = data.types;
	var columns = data.columns;
	
	
	
	/*//单元格对象
	col_css=
	[[col_index1,css_list1],[col_index1,css_list1],...]

	css_list=
	["map",[cell_value1,css_class_name1],[cell_value2,css_class_name2]]
	["map",["优于","css_green_font"],["劣于","css_red_font"]]
	[5,["map",["优于","green_font"],["劣于","red_font"]]] 

	css_list=
	["range",[cell_value1,css_class_name1],[cell_value2,css_class_name2]]

	css_list=
	["cln",["css_green_font"]]
	var clnObj={clnCssArray:[{clnNum:4,clnCss:["map",["优于","green_font"],["劣于","red_font"]]},{clnNum:5,clnCss:["map",["优于","green_font"],["劣于","red_font"]]}],
			functionArray:[{funCln:4,funtion:"test4",funType:1},{funCln:5,funtion:"test5",funType:1}]
	       		};*/
	
	// 重绘数据
	for ( var i = iStart-1; i < iend; i++) {//第几行
		var hResult = result[i];
		if(fixCln==0){
			tr = "<tr>" +'<td style="text-align:center"><div class="alltd">' + (i+1) + '</div></td>';
		}else{
			trFix = "<tr>" +'<td style="text-align:center"><div class="alltd">' + (i+1) + '</div></td>';
			tr = "<tr>";
		}
		
		var td_Length = $table.find("thead").find("td").length+fixCln;
		if(fixCln>0){
			td_Length=td_Length+1;
		}

		for ( var j = 0; j < td_Length-1-that.addCln; j++) {//第几列
			//var tmp = noceUtil.fixL2(hResult[j]);
			var tmp = hResult[j];
			if (tmp == null) {
				tmp = '';
			}/*else if(tmp.length>13&&tmp.indexOf("input")<0){
				tmp = '<a title='+tmp+'>'+tmp.substring(0,6)+"...."+tmp.substring(tmp.length-6,tmp.length)+'</a>';				
			}*/
			
			
			
			if(that.sceneId==1){
				var clnCss="";
				var funtion="";
				var subObj=TableToolsNewTwo.prototype.bindClnValueAndTitle(j,tmp,that.clnObj.subArray);
				if(!noceUtil.isUndefined(that.clnObj.clnCssArray)){
					clnCss=TableToolsNewTwo.prototype.bindClnCss(j,tmp,that.clnObj.clnCssArray);
				}
				if(!noceUtil.isUndefined(that.clnObj.functionArray)){
					funtion=TableToolsNewTwo.prototype.bindClnFunction(j,tmp,that.clnObj.functionArray);
				}
				if(!noceUtil.isUndefined(funtion)){
					var dataResult=TableToolsNewTwo.prototype.dataObject(hResult,columns);
					if(funtion.indexOf("()")>-1){ 
						funtion=funtion.replace("(", "("+JSON.stringify(dataResult).replace(/"/g, '&quot;').replace(/\n/g,'&#10;').replace(/\r/g,'&#13;').replace(/ /g,'&nbsp;')+"");
					}else{
						funtion=funtion.replace("(", "("+JSON.stringify(dataResult).replace(/"/g, '&quot;').replace(/\n/g,'&#10;').replace(/\r/g,'&#13;').replace(/ /g,'&nbsp;')+","); 
					}
				}
				if(j<fixCln){
					if(subObj.isSub==0){
						if(!noceUtil.isUndefined(subObj.title)){
							tmp = '<a class="'+clnCss+'" title='+subObj.title+'>'+subObj.value+'</a>';
							trFix=trFix+'<td  '+funtion+'><div class="alltd">' + tmp + '</div></td>';	
						}else{
							trFix=trFix+'<td class="'+clnCss+'" '+funtion+'><div class="alltd">' + subObj.value + '</div></td>';	
						}
					}else{
						trFix=trFix+'<td class="'+clnCss+'" '+funtion+'><div class="alltd">' + subObj.value + '</div></td>';	
					}
						
					
					
				}else if(j>=fixCln){
					if(subObj.isSub==0){
						if(!noceUtil.isUndefined(subObj.title)){
							tmp = '<a class="'+clnCss+'" title='+subObj.title+'>'+subObj.value+'</a>';
							tr = tr + '<td  '+funtion+'><div class="alltd">' + tmp + '</div></td>';
						}else{
							tr = tr + '<td class="'+clnCss+'" '+funtion+'><div class="alltd">' + subObj.value + '</div></td>';
						}
					}else{
						tr = tr + '<td class="'+clnCss+'" '+funtion+'><div class="alltd">' + subObj.value + '</div></td>';
					}
						
					
						
				}
				
			}
		}
		if(that.addCln>0){
			var addClnValue=that.clnObj.lastCln.addClnValue;
			for(var k=0;k<addClnValue.length;k++){
				tr = tr + '<td><div class="alltd">' + addClnValue[k] + '</div></td>';	
			}
			
		}
		
		if(fixCln>0){
			trFix = trFix + "</tr>";
			tbodyFix = tbodyFix + trFix;
		}
		tr = tr + "</tr>";
		tbody = tbody + tr;
	}
	$tbody.append(tbody);
	$tbodyFix.append(tbodyFix);
	if(that.sceneId==1&&that.sortFlag==0){//不排序
		$table.find(".nrp_dowm").remove();//移除箭头
		$table.find(".nr_paixu").removeClass("down");//移除排序字段灰色背景
		$table.find("thead td").removeClass("nr_paixu");//移除表头手形图标
		$tableFix.find(".nrp_dowm").remove();//移除箭头
		$tableFix.find(".nr_paixu").removeClass("down");//移除排序字段灰色背景
		$tableFix.find("thead td").removeClass("nr_paixu");//移除表头手形图标
	}
	
	
	//只会执行一次合并表头的逻辑
	if(that.theadFlag){
		if(that.sceneId==1){
			var clospanTheadHtml=TableToolsNewTwo.prototype.clospanThead(that);
		}
		that.theadFlag=false;
	}
	
	//添加奇偶行样式
	if(that.sceneId==1){
		if(!noceUtil.isUndefined(that.rowCss)){
			$tbody.find("tr:nth-child(odd)").addClass(that.rowCss.oddRowCss);
			$tbody.find("tr:nth-child(even)").addClass(that.rowCss.evenRowCss);
			$tbodyFix.find("tr:nth-child(odd)").addClass(that.rowCss.oddRowCss);
			$tbodyFix.find("tr:nth-child(even)").addClass(that.rowCss.evenRowCss);
		}
	}
	if(fixCln>0){
		//因两个表格边框线重叠，故去掉右边表格的边框线
		$("#"+that.currentTableId).css({"border-left":"0"});
		//左边表格鼠标移上去变色
		$("#"+that.fixTableId+" tbody tr").hover(function () {
			var index=$(this).index();
			$("#"+that.currentTableId+" tbody tr").eq(index).addClass("hoverTr");
		});
		//右边表格鼠标移上去变色
		$("#"+that.currentTableId+" tbody tr").hover(function () {
			var index=$(this).index();
			$("#"+that.fixTableId+" tbody tr").eq(index).addClass("hoverTr");
		});
		
		$("#leftIcon").click(function () {//隐藏左边菜单栏的
			$(window).resize();
			
		});
		$(window).resize(function() {//屏幕自适应
			TableToolsNewTwo.prototype.resizeWidht(that);
		});
		
	}else{
		$("#"+that.divId+" .tableWrap").addClass("normalTable").removeClass("scrollDiv");
	}
	
	TableToolsNewTwo.prototype.resizeWidht(that);
	TableToolsNewTwo.prototype.frozedRow(that);
	
	
	
	$(".table tbody tr").mouseenter(function () {
		$(this).addClass("hoverTr");
	}).mouseleave(function () {
		$(".table tbody tr").removeClass("hoverTr");
	});
	that.loadEnd=true;
	TableToolsNewTwo.prototype.locationTableRow(data,that);
}


/********************************** 
* @funcname resizeWidht
* @funcdesc 重新计算各个表格的高宽和前端分页组件的高宽
* @param {Object} type (input optional) that：TableToolsNewTwo对象属性参数
* @return {null}
* @author 陈小芳
* @create 20170515
* @modifier 陈小芳
* @modify 20170515 
***********************************/
TableToolsNewTwo.prototype.resizeWidht = function (that){
	var totalHeight = $("#"+that.divId).height(); //表格外层div高度
	var tableHeight = $("#"+that.divId+" .table ").height();  //表格高度
	var pageHeight = 0;
	var btnGroupHeight =0;
	var btnGroupHide = 0;
	var scrollBar = 17;  //滚动条宽度
	var positionHeight = totalHeight;
	var fixCln=0;
	if(!noceUtil.isUndefined(that.fix)&&that.fix==true){
		fixCln=that.fixObj.fixClnObj.fixCln;//冻结的列
	}
	if(that.frontFlag==1){
		pageHeight = $("#"+that.divId+" .myPage")[0].offsetHeight;  //分页组件高度
	}else{
		btnGroupHeight = $("#"+that.divId+" .btnGroup")[0].offsetHeight;  //按钮组（加载更多、导出）高度 
//		btnGroupHide = $("#"+that.divId+" .btnGroup").find(".btnDiv").height();
	}
	positionHeight = totalHeight-pageHeight-btnGroupHeight;
	tableHeight=tableHeight-pageHeight-btnGroupHeight;
	
	if(fixCln>0){//如果需要冻结列，需要重新计算表格div的高度
		var totalWidth=$("#"+that.divId).width();//表格外层div宽度
		var fixWidth=$("#"+that.fixTableId).width();//冻结外层div宽度
		$("#"+that.divId+" .scrollDiv").width(totalWidth-fixWidth-2);//滚动表格的宽度=表格外层div宽度-冻结外层div宽度-2条边框线
		
		var offsetWidth = $("#"+that.divId+" .scrollDiv")[0].clientWidth;  //滚动表格的实际宽度
		var scrollWidth = $("#"+that.divId+" .scrollDiv")[0].scrollWidth;  //滚动表格的滚动宽度
		if((tableHeight+scrollBar+1) >= positionHeight || (tableHeight+scrollBar+pageHeight+btnGroupHeight) >= positionHeight){//如果表格高度大于表格外层div高度，说明有纵向滚动条，否则没有纵向滚动条
			scrollBar = $("#"+that.divId+" .scrollDiv")[0].offsetHeight-$("#"+that.divId+" .scrollDiv")[0].clientHeight;
			$("#"+that.divId+" .positionDiv").height(positionHeight);
			$("#"+that.divId+" .fixedDiv").height(positionHeight-scrollBar);//滚动表格外层div的高度=表格外层滚动总高度-滚动条高度
			$("#"+that.divId+" .scrollDiv").height("100%");
            if(scrollWidth > offsetWidth){
                $("#"+that.divId+" .fixedDiv").css("border-bottom","1px solid #ddd");
                $("#"+that.divId+" .positionDiv .table").css("border-bottom","0");
			}else{
                $("#"+that.divId+" .positionDiv .table").css("border-bottom","1px solid #ddd");
			}
		}else{
			$("#"+that.divId+" .scrollDiv").height("auto");
            $("#"+that.divId+" .fixedDiv").height("auto");
			$("#"+that.divId+" .fixedDiv").css("border-bottom","0");
			$("#"+that.divId+" .positionDiv .table").css("border-bottom","1px solid #ddd");
			$("#"+that.divId+" .positionDiv").height($("#"+that.divId+" .scrollDiv").height());
		}
	}else{
		if((tableHeight+scrollBar+1) >= positionHeight){//如果表格高度大于表格外层div高度，说明有纵向滚动条，否则没有纵向滚动条
			$("#"+that.divId+" .positionDiv").height(positionHeight);
		}else{
			$("#"+that.divId+" .positionDiv").height("auto");
		}
	}
	
}


/********************************** 
* @funcname scroll
* @funcdesc 滚动非冻结表（右边）格触发的方法
* @param {Object} type (input optional) that：TableToolsNewTwo对象属性参数
* @return {null}
* @author 陈小芳
* @create 20170515
* @modifier 陈小芳
* @modify 20170515 
***********************************/
TableToolsNewTwo.prototype.scroll = function (that){
	var scrollTop=that.scrollTop;//获取滚动的距离
    var fixheadTr=$("#"+that.divId+" #"+that.fixTableId+"  tr");
    var scrollheadTr=$("#"+that.divId+" #"+that.currentTableId+"  tr");
    var fixRow=!noceUtil.isUndefined(that.fixObj.fixRow) ? that.fixObj.fixRow : 0;//冻结的前面哪几行
    fixheadTr.each(function(i){//冻结左边的冻结列表格
        if(i<fixRow){
            $(this).children().find(".alltd").css({"position":"relative","top":scrollTop,"left":"left","background-color":"#E1E7EB"});
        }
    });
    scrollheadTr.each(function(k){//冻结右边的非冻结列表格
        if(k<fixRow){
            $(this).children().find(".alltd").css({"position":"relative","top":scrollTop,"left":"left","background-color":"#E1E7EB"});
        }
    });
    $("#"+that.divId+" .fixedDiv").scrollTop(scrollTop);
}


/********************************** 
* @funcname fixed
* @funcdesc 滚动冻结列表格（左边）触发的方法
* @param {Object} type (input optional) that：TableToolsNewTwo对象属性参数
* @return {null}
* @author 陈小芳
* @create 20170515
* @modifier 陈小芳
* @modify 20170515 
***********************************/
TableToolsNewTwo.prototype.fixed = function (that){
    var scrollTop=that.scrollTop;//获取滚动的距离
    var fixheadTr=$("#"+that.divId+" #"+that.fixTableId+"  tr");
    var scrollheadTr=$("#"+that.divId+" #"+that.currentTableId+"  tr");
    var fixRow=!noceUtil.isUndefined(that.fixObj.fixRow) ? that.fixObj.fixRow : 0;//冻结的前面哪几行
    fixheadTr.each(function(i){//冻结左边的冻结列表格
        if(i<fixRow){
            $(this).children().find(".alltd").css({"position":"relative","top":scrollTop,"left":"left","background-color":"#E1E7EB"});
        }
    });
    scrollheadTr.each(function(k){//冻结右边的非冻结列表格
        if(k<fixRow){
            $(this).children().find(".alltd").css({"position":"relative","top":scrollTop,"left":"left","background-color":"#E1E7EB"});
        }
    });
    $("#"+that.divId+" .scrollDiv").scrollTop(scrollTop);
}




/********************************** 
* @funcname frozedRow
* @funcdesc 获取拼接的fixRow参数，相应冻结表格前面的多少行
* @param {Object} type (input optional) that：TableToolsNewTwo对象属性参数
* @return {null}
* @author 陈小芳
* @create 20170515
* @modifier 陈小芳
* @modify 20170515 
***********************************/
TableToolsNewTwo.prototype.frozedRow = function (that){
	if(!noceUtil.isUndefined(that.fixObj)){
		 var fixRow=!noceUtil.isUndefined(that.fixObj.fixRow) ? that.fixObj.fixRow : 0;//冻结的前面哪几行
		 if(fixRow>0){//需要冻结行
			if(!noceUtil.isUndefined(that.fix)&&that.fix==true){//如果需要冻结列，说明已经拆分成了两个表格（左边的冻结列表格，右边的非冻结列表格）
				var timer,timer2;
				var flagFix=true;
				var flagScroll=true;
                $("#"+that.divId+" .fixedDiv").scroll(function() {
                	if(flagFix){
                		 if(timer){
                             clearTimeout(timer);
                             console.log('fixedDiv start..');
                             that.scrollTop=$(this).scrollTop();//获取滚动的距离
                             flagScroll=false;
                             TableToolsNewTwo.prototype.fixed(that);
                             
                         }

                         timer = setTimeout(function(){
                             console.log('fixedDiv ends..');
                             flagScroll=true;
                         },200);
                	}

                });
                $("#"+that.divId+" .scrollDiv").scroll(function() {
                	if(flagScroll){
                		if(timer2){
                            clearTimeout(timer2);
//                            console.log('scrolling start..');
                            that.scrollTop=$(this).scrollTop();//获取滚动的距离
                            flagFix=false;
                            TableToolsNewTwo.prototype.scroll(that);
                            
                        }

                        timer2 = setTimeout(function(){
//                            console.log('scrolling ends..');
                            flagFix=true;
                        },200);
                	}

                });
			} else{//只冻结行，不需要冻结列，只有一个表格
				$("#"+that.divId+" .normalTable").scroll(function(){//给table外面的div滚动事件绑定一个函数
					
					var top=$("#"+that.divId+" .normalTable").scrollTop();//获取滚动的距离
					var headTr=$("#"+that.divId+" table  tr");
				    headTr.each(function(i){
				    	if(i<fixRow){
				    		$(this).children().find(".alltd").css({"position":"relative","top":top,"z-index":"10","background-color":"#E1E7EB"});
				    	}
				    });
				});
			}
			
		 }else{//不需要冻结行，需要冻结列
			 if(!noceUtil.isUndefined(that.fix)&&that.fix==true){
				 var timer,timer2;
					var flagFix=true;
					var flagScroll=true;
	                $("#"+that.divId+" .fixedDiv").scroll(function() {
	                	if(flagFix){
	                		 if(timer){
	                             clearTimeout(timer);
	                             console.log('fixedDiv start..');
	                             var scrollTop=$(this).scrollTop();//获取滚动的距离
	                             flagScroll=false;
	                             $("#"+that.divId+" .scrollDiv").scrollTop(scrollTop);
	                             
	                         }

	                         timer = setTimeout(function(){
	                             console.log('fixedDiv ends..');
	                             flagScroll=true;
	                         },200);
	                	}

	                });
	                $("#"+that.divId+" .scrollDiv").scroll(function() {
	                	if(flagScroll){
	                		if(timer2){
	                            clearTimeout(timer2);
	                            console.log('scrolling start..');
	                            var scrollTop=$(this).scrollTop();//获取滚动的距离
	                            flagFix=false;
	                            $("#"+that.divId+" .fixedDiv").scrollTop(scrollTop);
	                        }

	                        timer2 = setTimeout(function(){
	                            console.log('scrolling ends..');
	                            flagFix=true;
	                        },200);
	                	}

	                });
			 }
			 
		 }
		 
	}
}


/********************************** 
* @funcname locationTableRow
* @funcdesc 表格加载完成后，定位指定数值所在的行在第一行；前端分页：定位到所在页数
* @param {Object} type (input optional) data：传入的Data对象/sql查询回来的数据
* @param {Object} type (input optional) that：TableToolsNewTwo对象属性参数
* @return {null}
* @author 陈小芳
* @create 20170515
* @modifier 陈小芳
* @modify 20170515 
***********************************/ 
TableToolsNewTwo.prototype.locationTableRow = function (data,that){
	if(noceUtil.isUndefined(that.scrollObj)||
			noceUtil.isUndefined(that.scrollObj.clnNums)||
			noceUtil.isUndefined(that.scrollObj.clnValues)){
		return;
	}
	var result=data.result;
	$("#"+that.divId+ " table tr").removeClass("loadTr");
	if(!noceUtil.isUndefined(that.fixObj)){
		 var fixRow=!noceUtil.isUndefined(that.fixObj.fixRow) ? that.fixObj.fixRow : 0;//冻结的前面哪几行
		 if(fixRow>0){//需要冻结行
			if(!noceUtil.isUndefined(that.fix)&&that.fix==true){//如果需要冻结列，说明已经拆分成了两个表格（左边的冻结列表格，右边的非冻结列表格）
                var top = 0;
    			var lineHeight = $(".alltd").height()+1;//每列的高度
    			var headTrFix=$("#"+that.divId+" .fixedDiv table  tr");
    			var headTrScroll=$("#"+that.divId+" .scrollDiv table  tr");
    			var clnLength=headTrFix.eq(1).children().length;
    			var line = 0;
				for(var i=0; i<headTrScroll.length;i++){
					var flag=true;
    				for(var j=0;j<that.scrollObj.clnNums.length;j++){
    					var cln=that.scrollObj.clnNums[j];
    					if(cln-clnLength>=0){
        					if(that.scrollObj.clnValues[j]!=headTrScroll.eq(i).children().eq(cln-clnLength).text()){
        						flag=false;
        						break;
            				}
        				}else{
        					if(that.scrollObj.clnValues[j]!=headTrFix.eq(i).children().eq(cln).text()){
        						flag=false;
        						break;
            				}
        				}
    				}
    				if(flag){
    					line=i;
    					break;
    				}
    				
    			}
				
    			top = (line-fixRow)*lineHeight;//滚动条应该滚动的距离
    			headTrFix.eq(line).addClass("loadTr");
    			headTrScroll.eq(line).addClass("loadTr");
    			that.scrollTop=top;
    			$("#"+that.divId+" .fixedDiv").scrollTop(top);
				$("#"+that.divId+" .scrollDiv").scrollTop(top);
				$("#"+that.divId+" .scrollDiv").scroll();
    			
			} else{//只冻结行，不需要冻结列，只有一个表格
				var top = 0;
				var lineHeight = $(".alltd").height()+1;//每列的高度
				var headTr=$("#"+that.divId+"  table  tr");
				var line = 0;
				for(var i=0; i<headTr.length;i++){
					var flag=true;
    				for(var j=0;j<that.scrollObj.clnNums.length;j++){
    					var cln=that.scrollObj.clnNums[j];
    					if(that.scrollObj.clnValues[j]!=headTr.eq(i).children().eq(cln).text()){
//    						console.log(that.scrollObj.clnValues[j]+"  "+headTr.eq(i).children().eq(cln).text()+"///"+i+" "+j);
    						flag=false;
    						break;
        				}
    				}
    				if(flag){
    					line=i;
    					break;
    				}
				}
				
				top = (line-fixRow)*lineHeight;//滚动条应该滚动的距离
				$("#"+that.divId+" .normalTable").scrollTop(top);
				$("#"+that.divId+" .normalTable").scroll();
				headTr.eq(line).addClass("loadTr");
			}
			
		 }else{//不需要冻结行，需要冻结列
			 if(!noceUtil.isUndefined(that.fix)&&that.fix==true){
				 var top = 0;
	    			var lineHeight = $(".alltd").height()+1;//每列的高度
	    			var headTrFix=$("#"+that.divId+" .fixedDiv .table  tr");
	    			var headTrScroll=$("#"+that.divId+" .scrollDiv .table  tr");
	    			var clnLength=headTrFix.eq(1).children().length;
	    			var line = 0;
	    			for(var i=0; i<headTrScroll.length;i++){
						var flag=true;
	    				for(var j=0;j<that.scrollObj.clnNums.length;j++){
	    					var cln=that.scrollObj.clnNums[j];
	    					if(cln-clnLength>=0){
	        					if(that.scrollObj.clnValues[j]!=headTrScroll.eq(i).children().eq(cln-clnLength).text()){
	        						flag=false;
	        						break;
	            				}
	        				}else{
	        					if(that.scrollObj.clnValues[j]!=headTrFix.eq(i).children().eq(cln).text()){
	        						flag=false;
	        						break;
	            				}
	        				}
	    				}
	    				if(flag){
	    					line=i;
	    					break;
	    				}
	    				
	    			}
	    			
	    			top = line*lineHeight;//滚动条应该滚动的距离
	    			headTrFix.eq(line).addClass("loadTr");
	    			headTrScroll.eq(line).addClass("loadTr");
    				$("#"+that.divId+" .fixedDiv").scrollTop(top);
    				$("#"+that.divId+" .scrollDiv").scrollTop(top);
    				$("#"+that.divId+" .scrollDiv").scroll();
    				
			 }
			 
		 }
		 
	}else{
			var top = 0;
			var lineHeight = $(".alltd").height()+1;//每列的高度
			var headTr=$("#"+that.divId+"  table  tr");
			var line = 0;
			for(var i=0; i<headTr.length;i++){
				var flag=true;
				for(var j=0;j<that.scrollObj.clnNums.length;j++){
					var cln=that.scrollObj.clnNums[j];
					if(that.scrollObj.clnValues[j]!=headTr.eq(i).children().eq(cln).text()){
						//console.log(that.scrollObj.clnValues[j]+"  "+headTr.eq(i).children().eq(cln).text()+"///"+i+" "+j);
						flag=false;
						break;
    				}
				}
				if(flag){
					line=i;
					break;
				}
			}
			
			top = line*lineHeight;//滚动条应该滚动的距离
			$("#"+that.divId+" .normalTable").scrollTop(top);
			$("#"+that.divId+" .normalTable").scroll();
			headTr.eq(line).addClass("loadTr");
		//}
	}
}

/********************************** 
* @funcname bindClnCss
* @funcdesc //拼接每行单元格的数据，同时为列绑定自定义的样式（解析that.clnObj.clnCssArray）
* @param {Number} type (input optional) j：遍历到第几列
* @param {String} type (input optional) tmp：当前td单元格的值
* @param {Object} type (input optional) that：tableToolsNewTwo对象属性
* @return {String} type (input optional) clnCss：绑定的class样式 class="xxx"
* @author 陈小芳
* @create 20170515
* @modifier 陈小芳
* @modify 20170515 
***********************************/
TableToolsNewTwo.prototype.bindClnCss = function(j,tmp,clnCssArray){
	//if(!noceUtil.isUndefined(that.clnObj.clnCssArray)){
//		var haveCss = false; 
		var clnCss=" ";
		for(var k=0;k<clnCssArray.length;k++){
			if((j+1)==clnCssArray[k].clnNum){
				var css_list=clnCssArray[k].clnCss;
				if(css_list[0]=="cln"){//css_list=["cln",["css_green_font"]]
					//tr = tr + '<td style="text-align:center;" class="'+css_list[1]+'">' + tmp + '</td>';
//					haveCss = true;
					clnCss=css_list[1];
					break;
				}else if(css_list[0]=="map"){//css_list=["map",[cell_value1,css_class_name1],[cell_value2,css_class_name2]]
					for(var x=1;x<css_list.length;x++){
						if(tmp==css_list[x][0]){
							//tr = tr + '<td style="text-align:center;" class="'+css_list[x][1]+'">' + tmp + '</td>';
//							haveCss = true;
							clnCss=css_list[x][1];
							break;
						}
					}
				}else if(css_list[0]=="range"){//css_list=["range",[cell_value1,css_class_name1],[cell_value2,css_class_name2]]
					for(var x=1;x<css_list.length;x++){
						if(eval(css_list[x][0])){
							//tr = tr + '<td style="text-align:center;" class="'+css_list[x][1]+'">' + tmp + '</td>';
//							haveCss = true;
							clnCss=css_list[x][1];
							break;
						}
					}

				}
				return clnCss;
			}
			/*if(haveCss==true){
				return clnCss;
			}*/
		}
	//}
	return clnCss;
}


/********************************** 
* @funcname bindClnFunction
* @funcdesc //为列绑定自定义的函数（解析that.clnObj.functionArray）
* @param {Number} type (input optional) j：遍历到第几列
* @param {String} type (input optional) tmp：当前td单元格的值
* @param {Array} type (input optional) functionArray：传入的需要绑定列的函数名称和参数和事件
* @return {String} type (output optional) funtion：绑定的事件名称
* @author 陈小芳
* @create 20170515
* @modifier 陈小芳
* @modify 20170515 
***********************************/
TableToolsNewTwo.prototype.bindClnFunction = function(j,tmp,functionArray){
	//if(!noceUtil.isUndefined(that.clnObj.functionArray)){
//		var haveFun = false; 
		var funtion="";
		for(var k=0;k<functionArray.length;k++){
			if((j+1)==functionArray[k].funCln){
				var funtion="";
				var fun_type=functionArray[k].funType;
				var fun_tion=functionArray[k].funtion;
				if(fun_type==0){//0:悬停；1：单击；2：双击；
					funtion="onmouseover="+fun_tion;
//					haveFun = true;
				}else if(fun_type==1){//0:悬停；1：单击；2：双击；
					funtion="onclick="+fun_tion;
//					haveFun = true;
				}else if(fun_type==2){//0:悬停；1：单击；2：双击；
					funtion="ondblclick="+fun_tion;
//					haveFun = true;
				}
				return funtion;
				//tr = tr + '<td style="text-align:center;" '+funtion+'">' + tmp + '</td>';
			}
			/*if(haveFun==true){
				return funtion;
			}*/
		}
		
	//}
	return funtion;
}


/********************************** 
* @funcname bindClnValueAndTitle
* @funcdesc //为列的value和title绑定自定义的函数（解析that.clnObj.subNotArray）value：0：截取（默认）；1：不截取；
* @param {Number} type (input optional) j：遍历到第几列
* @param {String} type (input optional) tmp：当前td单元格的值
* @param {Array} type (input optional) subNotArray：需要执行的函数
* @return {0bj} type (output optional) result：title和value的值
* @author 陈小芳
* @create 20170515
* @modifier 陈小芳
* @modify 20170515 
***********************************/
TableToolsNewTwo.prototype.bindClnValueAndTitle = function(j,tmp,subNotArray){
	var result={
			isSub:0,
			value:'',
			title:''
				};
	var tmpBates=TableToolsNewTwo.prototype.getBytesLength(tmp);
	if(tmpBates>22&&tmp.indexOf("input")<0){
		var titleStr = '';
		if(tmp.indexOf('\n')>0||tmp.indexOf('\r')>0||tmp.indexOf(' ')>0){
			titleStr = tmp.replace(/\n/g,'&#10;').replace(/\r/g,'&#13;').replace(/ /g,'&nbsp;');
		}else{
			titleStr = tmp;
		}
		result.value=tmp.substring(0,5)+"...."+tmp.substring(tmp.length-5,tmp.length);
		result.title=titleStr;
	}else{
		result.value=tmp;
		result.isSub=1;
	}
	if(!noceUtil.isUndefined(subNotArray)){
		for(var k=0;k<subNotArray.length;k++){
			if((j+1)==subNotArray[k].clnNum){
				var subValue=subNotArray[k].value;
				var subTitle=subNotArray[k].title;
				if(!noceUtil.isUndefined(subValue)){
					if(subValue==1){//不截取
						result.value=tmp;
						result.isSub=1;
					}else{
						result.value=subValue(tmp).replace(/\n/g,'&#10;').replace(/\r/g,'&#13;').replace(/ /g,'&nbsp;');;
					}
				}
				
				if(!noceUtil.isUndefined(subTitle)){
					result.title=subTitle(tmp).replace(/\n/g,'&#10;').replace(/\r/g,'&#13;').replace(/ /g,'&nbsp;');;
				}
				return result;
				/*if(isSub){
					if(tmp.length>13&&tmp.indexOf("input")<0){
						var titleStr = '';
						if(tmp.indexOf('\n')>0||tmp.indexOf('\r')>0||tmp.indexOf(' ')>0){
							titleStr = tmp.replace(/\n/g,'&#10;').replace(/\r/g,'&#13;').replace(/ /g,'&nbsp;');
						}else{
							titleStr = tmp;
						}
						tmp = '<a class="'+clnCss+'" title='+titleStr+'>'+tmp.substring(0,6)+"...."+tmp.substring(tmp.length-6,tmp.length)+'</a>';
						trFix=trFix+'<td'+funtion+'><div class="alltd">' + tmp + '</div></td>';	
					}else{
						trFix=trFix+'<td class="'+clnCss+'" '+funtion+'><div class="alltd">' + tmp + '</div></td>';	
					}
				}else{
					trFix=trFix+'<td class="'+clnCss+'" '+funtion+'><div class="alltd">' + tmp + '</div></td>';	
				}*/
			}
		}
	}
	return result;
}



/********************************** 
* @funcname getBytesLength
* @funcdesc 获取字节长度
* @param {String} type (input optional) tmp：传入的字符串
* @return {Number} type (output optional) totalLength：返回字符串的字节长度
* @author 陈小芳
* @create 20170515
* @modifier 陈小芳
* @modify 20170515 
***********************************/
TableToolsNewTwo.prototype.getBytesLength = function(tmp){
	var totalLength=0;
	var charCode;  
	for (var i = 0; i < tmp.toString().length; i++) {
		charCode = tmp.toString().charAt(i); 
		if (/^[\u4e00-\u9fa5]$/.test(charCode)){//匹配中文字符的正则表达式
			totalLength += 2;
		}else{
			totalLength ++;
		}
	
	}
	return totalLength;   
	
}
	
/********************************** 
* @funcname dataObject
* @funcdesc //将绑定的列函数所在的tr中的所有td的innerText值封装成对象作为参数返回
* @param {Array} type (input optional) hResult：当前行数据
* @param {Array} type (input optional) columns：行表头名称
* @return {Object} type (output optional) dataRsult：将绑定的列函数所在的tr中的所有td的innerText值封装成对象作为参数返回
* @author 陈小芳
* @create 20170515
* @modifier 陈小芳
* @modify 20170515 
***********************************/
TableToolsNewTwo.prototype.dataObject = function(hResult,columns){
	var dataRsult = {};
	if (hResult == undefined || columns == undefined) {
		return dataRsult;
	}
	for ( var j = 0; j < hResult.length; j++) {
		var dataC = columns[j];
		var dataR = hResult[j];
		if(dataR==null||dataR == undefined){
			dataRsult[dataC] = dataR;
		}else if(dataR.toString().indexOf("<input")<0){
			if(dataR.toString().indexOf("<img")<0){
//				if(dataR.toString().indexOf('\n')>0||dataR.toString().indexOf('\r')>0||dataR.toString().indexOf(' ')>0){
//					dataRsult[dataC] = dataR.toString().replace(/\n/g,'&#10;').replace(/\r/g,'&#13;').replace(/ /g,'&nbsp;');
//				}else{
					dataRsult[dataC] = dataR;
//				}
				
			}
			
		}
	}
	return dataRsult;
}



//合并表头
//合并表头
/*var theadObj={
//合并表头数组
clnspanArray:[
              {clnNum:4,colspan:4,clnName:"电信"},
              {clnNum:6,colspan:3,clnName:"联通"}
              ],
clnCssArray:[{clnNum:'',clnCss:[]}],
functionArray:[{funCln:'',funtion:"",funType:''}]

   };*/
/********************************** 
* @funcname clospanThead
* @funcdesc 合并表头（表格生成之后执行，并且只会执行一次）
* @param {Object} type (input optional) that：tableToolsNewTwo对象属性
* @return {null}
* @author 陈小芳
* @create 20170515
* @modifier 陈小芳
* @modify 20170515 
***********************************/
TableToolsNewTwo.prototype.clospanThead = function(that){
	if(!noceUtil.isUndefined(that.theadObj.clnspanArray)){
		var fixCln=0;
		if(!noceUtil.isUndefined(that.fix)&&that.fix==true){
			fixCln=that.fixObj.fixClnObj.fixCln;//冻结的行
		}
		var totalLength=0;
		var arr2 = $("#"+that.currentTableId+" tr");
		var tr = arr2[0];
		var arr2Fix = $("#"+that.fixTableId+" tr");
		var trFix = arr2Fix[0];
		var th="";
		var thFix="";
		for(var i=0;i<that.theadObj.clnspanArray[0].clnNum;i++){
			if(i<=fixCln&&fixCln!=0){
				thFix+="<th class='noBottom'><div class='alltd'></div></th>";
			}else{
				th+="<th class='noBottom'><div class='alltd'></div></th>";
			}
			totalLength++;
		}
		for(var i=0;i<that.theadObj.clnspanArray.length;i++){
			if(i>0){
				var clnsuv=that.theadObj.clnspanArray[i].clnNum-(that.theadObj.clnspanArray[i-1].clnNum+that.theadObj.clnspanArray[i-1].colspan-1);
				if(clnsuv==1){
					totalLength=totalLength+that.theadObj.clnspanArray[i].colspan;
					if(totalLength<=fixCln){
						thFix+="<th colspan='"+that.theadObj.clnspanArray[i].colspan+"'><div class='alltd'>"+that.theadObj.clnspanArray[i].clnName+"</div></th>";
					}else{
						th+="<th colspan='"+that.theadObj.clnspanArray[i].colspan+"'><div class='alltd'>"+that.theadObj.clnspanArray[i].clnName+"</div></th>";
					}
				}else if(clnsuv>1){
					for(var k=1;k<clnsuv;k++){
						th+="<th class='noBottom'><div class='alltd'></div></th>";
						totalLength++;
						if(totalLength<=fixCln){
							thFix+="<th class='noBottom'><div class='alltd'></div></th>";
						}else{
							th+="<th class='noBottom'><div class='alltd'></div></th>";
						}
					}
					totalLength=totalLength+that.theadObj.clnspanArray[i].colspan;
					if(totalLength<=fixCln){
						thFix+="<th colspan='"+that.theadObj.clnspanArray[i].colspan+"'><div class='alltd'>"+that.theadObj.clnspanArray[i].clnName+"</div></th>";
					}else{
						th+="<th colspan='"+that.theadObj.clnspanArray[i].colspan+"'><div class='alltd'>"+that.theadObj.clnspanArray[i].clnName+"</div></th>";
					}
				}
			}else{
				
				totalLength=totalLength+that.theadObj.clnspanArray[i].colspan;
				if(totalLength<fixCln){
					thFix+="<th colspan='"+that.theadObj.clnspanArray[i].colspan+"'><div class='alltd'>"+that.theadObj.clnspanArray[i].clnName+"</div></th>";
				}else{
					th+="<th colspan='"+that.theadObj.clnspanArray[i].colspan+"'><div class='alltd'>"+that.theadObj.clnspanArray[i].clnName+"</div></th>";
				}
			}
		}
		var colspanLength=that.theadObj.clnspanArray[that.theadObj.clnspanArray.length-1].clnNum+that.theadObj.clnspanArray[that.theadObj.clnspanArray.length-1].colspan;
		var td_Length = $("#" + that.currentTableId).find("thead").find("td").length;
		for(var j=0;j<td_Length-colspanLength;j++){
			th+="<th class='noBottom'><div class='alltd'></div></th>";
		}
		if(fixCln>0){
			$(trFix).before("<tr>"+thFix+"</tr>");
		}
		$(tr).before("<tr>"+th+"</tr>");
	}
	
}

//参数检查
TableToolsNewTwo.prototype.check = function(tableSql){
	
//	if(tableSql == null || tableSql == ""){//函数模块化
//		alert("查询语句不能为空,请输入需要查询的SQL语句！");
//		return;
//	}else{
//		tableSql = tableSql.trim();
//	} 
//	if(tableSql.substring(0,6).toLowerCase() != "select"){
//		alert("请输入正确以select开头的查询语句！");
//		return;
//	}else if(tableSql.indexOf("&")<0){
//		alert("输入参数格式不对,请在SQL语句结尾加上排序字段，格式为&xxx");
//		return;
//	}	
	if(tableSql.indexOf("&")<0){
		alert("输入参数格式不对,请检查...");
		return;
	}	
	return tableSql;
};


/********************************** 
* @funcname initSort
* @funcdesc 排序初始化，点击表头排序，重新拼接sql参数，调用progressSql提交查询
* @param {Object} type (input optional)  that TableToolsNewTwo对象的属性参数
* @return {null} 
* @author 陈小芳
* @create 20170818
* @modifier 陈小芳
* @modify 20170818 
*********************************/
TableToolsNewTwo.prototype.initSort = function(that) {
	$("#"+that.currentTableId+",#"+that.fixTableId).find("td[sortColumn]").click(function() {
		//$('#,#report_table_data').find("td[sortColumn]").click(function() {
		// 是否相同字段
		var b = $(this).attr("class").indexOf("down") > -1;
		var sortType = that.currentSortType;
		if (typeof(sortType) == "undefined") {
			sortType = that.sortType;
		}
		//当前的数据有多少条
		var pageSize =  that.currentPageSize;
		var pageIndex = 0;
		if (b) {
			if(sortType.indexOf("desc") > -1){
				sortType = "";
				that.currentSortType = sortType;
				$(this).children().children().siblings().eq(1).children().attr("class","nrp_up");
				//$(this).find("span[class='nrp_dowm']").attr("class","nrp_up");//这种方法也可以
			}else{
				sortType = "desc";
				that.currentSortType = sortType;
				$(this).children().children().siblings().eq(1).children().attr("class","nrp_dowm");
				//$(this).find("span[class='nrp_up']").attr("class","nrp_dowm");//这种方法也可以
			}
		}else{
			sortType ="desc";
			that.currentSortType = sortType;
			$(this).children().children().siblings().eq(1).children().attr("class","nrp_dowm");
		}
		var $this = $(this);
		var conditions = that.condition;
		conditions.sortColumn = $this.attr("sortColumn");
		if(conditions.sortColumn==0){//表格无数据时，sortColumn从0累加，但是order by 0 会报错
            conditions.sortColumn=1;
		}
		// 保存当前排序字段
		$("#"+that.currentTableId).attr("sortColumn", conditions.sortColumn);
		conditions.sortType = that.sortType;
		// 初始页数
		conditions.pageIndex = pageIndex;
		var fun = function(data){	
			if(that.frontFlag==1){
				TableToolsNewTwo.prototype.freshFrontTable(data,that);
			}else{
				TableToolsNewTwo.prototype.freshTable(data, that);
			}
		};
		var functionlist=[fun];	
		TableToolsNewTwo.prototype.progressSql(conditions.sql,conditions.sortColumn,sortType,pageSize,pageIndex,functionlist,that.tableDivId,that);
	});
};


/********************************** 
* @funcname initPageBtn
* @funcdesc 前端分页按钮绑定事件
* @param {Object} type (input optional)  that TableToolsNewTwo对象的属性参数
* @return {null} 
* @author 陈小芳
* @create 20170818
* @modifier 陈小芳
* @modify 20170818 
*********************************/
TableToolsNewTwo.prototype.initPageBtn = function(that){
	if(that.frontFlag==1){
		/*第一页*/
		$("#"+that.tableDivId).find("#First").click(function() {
			that.frontPage=1;
			TableToolsNewTwo.prototype.freshFrontTable(that.Data,that);
		});
		/*上一页*/
		$("#"+that.tableDivId).find("#Prev").click(function() {
			if(that.frontPage==1){
				return;
			}
			that.frontPage=parseInt(that.frontPage)-1;
			TableToolsNewTwo.prototype.freshFrontTable(that.Data,that);
		});
		/*下一页*/
		$("#"+that.tableDivId).find("#Next").click(function() {
			var PageTotal=$("#"+that.tableDivId+" .myPage  #PageTotal").text();
			if(that.frontPage==parseInt(PageTotal)){
				return;
			}
			that.frontPage=parseInt(that.frontPage)+1;
			TableToolsNewTwo.prototype.freshFrontTable(that.Data,that);
		});
		/*最后一页*/
		$("#"+that.tableDivId).find("#Last").click(function() {
			that.frontPage=$("#"+that.tableDivId+" .myPage  #PageTotal").text();
			TableToolsNewTwo.prototype.freshFrontTable(that.Data,that);
		});
		/*刷新*/
		$("#"+that.tableDivId).find("#Load").click(function() {
			var frontPage=$("#"+that.tableDivId+" .myPage  #PageNumber").val();
			var PageTotal=$("#"+that.tableDivId+" .myPage  #PageTotal").text();
			if(parseInt(frontPage)<1||parseInt(frontPage)>parseInt(PageTotal)){
				that.frontPage=$("#"+that.tableDivId+" .myPage  #PageTotal").text();
				TableToolsNewTwo.prototype.freshFrontTable(that.Data,that);
			}else{
				that.frontPage=frontPage;
				TableToolsNewTwo.prototype.freshFrontTable(that.Data,that);
			}
			
		});
		/*input回车事件*/
		$("#"+that.tableDivId).find("#PageNumber").keydown(function() {//给输入框绑定按键事件
	        if(event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
	        	var frontPage=$("#"+that.tableDivId+" .myPage  #PageNumber").val();
				var PageTotal=$("#"+that.tableDivId+" .myPage  #PageTotal").text();
				if(parseInt(frontPage)<1||(frontPage-PageTotal>0)){
					that.frontPage=$("#"+that.tableDivId+" .myPage  #PageTotal").text();
					TableToolsNewTwo.prototype.freshFrontTable(that.Data,that);
				}else{
					that.frontPage=frontPage;
					TableToolsNewTwo.prototype.freshFrontTable(that.Data,that);
				}
				$(this).blur();
	        }
	    })
		
	}
	
};


/********************************** 
* @funcname getMoreData
* @funcdesc 获取更多数据的按钮点击事件，拼接sql排序和分页所需的参数，并调用progressSql提交sql查询
* @param {Object} type (input optional)  obj 【加载更多】按钮对象
* @param {Object} type (input optional)  that TableToolsNewTwo对象的属性参数
* @return {null} 
* @author 陈小芳
* @create 20170818
* @modifier 陈小芳
* @modify 20170818 
*********************************/
TableToolsNewTwo.prototype.getMoreData = function(obj,that) {
	that.loadEnd=false;
	console.log(obj);
	var $this = $(obj);
	console.log($this);
	var tableId = $this.attr("type");
	var $table = $("#" + tableId);
	var conditions = that.condition;
	conditions.sortColumn = $table.find("td[class='nr_paixu down']").attr("sortColumn");
	if (noceUtil.isUndefined(conditions.sortColumn)) {
		conditions.sortColumn = that.sortColumn;
	}
	conditions.pageSize=that.pageSize;
	var pageIndex = that.currentPageSize;
	if (noceUtil.isUndefined(pageIndex)) {
		pageIndex = that.condition.pageSize*(that.pageIndex-1);
	}	 
	conditions.sortType = that.sortType;
	var fun = function(data){
        if(!noceUtil.isUndefined(that.callBackTranFn) && data.result.length > 0){
            data = that.callBackTranFn(data);
        }
		TableToolsNewTwo.prototype.freshTable2(data, that);

	};
	var functionlist=[fun];	
	TableToolsNewTwo.prototype.progressSql(conditions.sql,conditions.sortColumn,conditions.sortType,conditions.pageSize,pageIndex,functionlist,that.tableDivId,that);
};


/********************************** 
* @funcname freshTable2
* @funcdesc 后台分页，用于加载更多
* @param {Array} type (input optional)  data sql异步返回的数据，数据格式为：{type:[],result:[],cloumn:[]}
* @param {Object} type (input optional)  that TableToolsNewTwo对象的属性参数
* @return {null} 
* @author 陈小芳
* @create 20170818
* @modifier 陈小芳
* @modify 20170818 
*********************************/
TableToolsNewTwo.prototype.freshTable2 = function(data,that) {
	var $tableDiv = $("#" + that.tableDivId);
	var $table = $("#" + that.currentTableId);
	var $tableFix = $("#" + that.fixTableId);
	var $tbody = $table.find("tbody");
	var $tbodyFix=$tableFix.find("tbody");
	var fixCln=0;
	if(!noceUtil.isUndefined(that.fix)&&that.fix==true){
		fixCln=that.fixObj.fixClnObj.fixCln;//冻结的行
	}
	var tbody = "";
	var tr = "";
	var tr2 = "";
	
	var tbodyFix = "";
	var trFix = "";
	var tr2Fix = "";
	// 获取pageIndex
	var pageIndex = that.pageIndex;
	if (noceUtil.isUndefined(pageIndex)) {
		pageIndex = 1;
		that.pageIndex = pageIndex;
	}
	if (pageIndex == 0) {
		$tbody.empty();
	}
	var num = that.pageSize*(that.pageIndex-1);
	if (noceUtil.isUndefined(num)) {
		num = that.currentPageSize;
	}else{
		that.currentPageSize = that.pageSize*that.pageIndex;
	}
	// 对象赋值
	that.loadMore = $tableDiv.find(".pmore_1");
	that.loading = $tableDiv.find(".pmore_2");
	that.noMore = $tableDiv.find(".pmore_3");
	var result = data.result;
	var types = data.types;
	var columns = data.columns;
	
	
	// 重绘数据
	for ( var i = 0; i < result.length; i++) {
		var hResult = result[i];
		if(fixCln==0){
			tr = "<tr>" +'<td style="text-align:center"><div class="alltd">' + (num+i+1) + '</div></td>';
		}else{
			trFix = "<tr>" +'<td style="text-align:center"><div class="alltd">' + (num+i+1) + '</div></td>';
			tr = "<tr>";
		}
		var td_Length = $table.find("thead").find("td").length+fixCln;
		if(fixCln>0){
			td_Length=td_Length+1;
		}
		for ( var j = 0; j < td_Length-1-that.addCln; j++) {
//			var tmp = noceUtil.fixL2(hResult[j]);
			var tmp = hResult[j];
			if (tmp == null) {
				tmp = '';
			}/*else if(tmp.length>13){
				tmp = '<a title='+tmp+'>'+tmp.substring(0,6)+"...."+tmp.substring(tmp.length-6,tmp.length)+'</a>';				
			}*/
			//为列绑定自定义的样式和函数
			if(that.sceneId==1){
				var clnCss="";
				var funtion="";
				var subObj=TableToolsNewTwo.prototype.bindClnValueAndTitle(j,tmp,that.clnObj.subArray);
				if(!noceUtil.isUndefined(that.clnObj.clnCssArray)){
					clnCss=TableToolsNewTwo.prototype.bindClnCss(j,tmp,that.clnObj.clnCssArray);
				}
				if(!noceUtil.isUndefined(that.clnObj.functionArray)){
					funtion=TableToolsNewTwo.prototype.bindClnFunction(j,tmp,that.clnObj.functionArray);
				}
				if(!noceUtil.isUndefined(funtion)){
					var dataResult=TableToolsNewTwo.prototype.dataObject(hResult,columns);
					if(funtion.indexOf("()")>-1){ 
						funtion=funtion.replace("(", "("+JSON.stringify(dataResult).replace(/"/g, '&quot;').replace(/\n/g,'&#10;').replace(/\r/g,'&#13;').replace(/ /g,'&nbsp;')+"");
					}else{
						funtion=funtion.replace("(", "("+JSON.stringify(dataResult).replace(/"/g, '&quot;').replace(/\n/g,'&#10;').replace(/\r/g,'&#13;').replace(/ /g,'&nbsp;')+","); 
					}
				}
				if(j<fixCln){
					if(subObj.isSub==0){
						if(!noceUtil.isUndefined(subObj.title)){
							tmp = '<a class="'+clnCss+'" title='+subObj.title+'>'+subObj.value+'</a>';
							trFix=trFix+'<td'+funtion+'><div class="alltd">' + tmp + '</div></td>';	
						}else{
							trFix=trFix+'<td class="'+clnCss+'" '+funtion+'><div class="alltd">' + subObj.value + '</div></td>';	
						}
					}else{
						trFix=trFix+'<td class="'+clnCss+'" '+funtion+'><div class="alltd">' + subObj.value + '</div></td>';	
					}
						
					
				}else if(j>=fixCln){
					if(subObj.isSub==0){
						if(!noceUtil.isUndefined(subObj.title)){
							tmp = '<a class="'+clnCss+'" title='+subObj.title+'>'+subObj.value+'</a>';
							tr = tr + '<td '+funtion+'><div class="alltd">' + tmp + '</div></td>';
						}else{
							tr = tr + '<td class="'+clnCss+'" '+funtion+'><div class="alltd">' + subObj.value + '</div></td>';
						}
					}else{
						tr = tr + '<td class="'+clnCss+'" '+funtion+'><div class="alltd">' + subObj.value + '</div></td>';
					}
					
						
					
						
				}
			}else{
				var type = types[j];
				if(type == "String"){
					var haveCss = false;
					for(var k=0;k<that.tableCss.length;k++){
						if(j==that.tableCss[k][0]){
							var sCss = that.tableCss[k][1];
							if(sCss[0]=="map"){
								for(var p=1;p<sCss[0].length;p++){
									if(tmp==sCss[p][0]){
										tr = tr + '<td class="'+sCss[p][1]+'"><div class="alltd">' + tmp + '</div></td>';
										haveCss = true;
									}
								}
							}
						}
					}
					if(!haveCss){
						tr = tr + '<td><div class="alltd">' + tmp + '</div></td>';	
					}
					
				}else{
					tr = tr + '<td ><div class="alltd">' + tmp + '</div></td>';
				}
			}
				
		}
		if(that.addCln>0){
			var addClnValue=that.clnObj.lastCln.addClnValue;
			for(var k=0;k<addClnValue.length;k++){
				tr = tr + '<td><div class="alltd">' + addClnValue[k] + '</div></td>';	
			}
			
		}
		if(fixCln>0){
			trFix = trFix + "</tr>";
			tbodyFix = tbodyFix + trFix;
		}
		tr = tr + "</tr>";
		tbody = tbody + tr;
	}
	$tbody.append(tbody);
	$tbodyFix.append(tbodyFix);

	if (result.length == that.condition.pageSize) {
		that.pageIndex++;
//		that.condition.pageIndex = that.pageIndex;
		that.currentPageSize = num+result.length;
		that.loadMore.show();
		that.loading.hide();
		that.noMore.hide();
		that.loadMore.unbind('click').click(function() {
			$(this).hide();
			$(this).siblings('.pmore_2').show();
			TableToolsNewTwo.prototype.getMoreData(this,that);
		});
	} else if(result.length < that.condition.pageSize){
		that.noMore.show();
		that.loadMore.hide();
		that.loading.hide();
	} else if (result.length == 0) {
		that.noMore.show();
		that.loadMore.hide();
		that.loading.hide();
	} else {
		that.noMore.hide();
		that.loadMore.show();
		that.loading.hide();
	}
	//添加奇偶行样式
	if(that.sceneId==1){
		if(!noceUtil.isUndefined(that.rowCss)){
			$tbody.find("tr:nth-child(odd)").addClass(that.rowCss.oddRowCss);
			$tbody.find("tr:nth-child(even)").addClass(that.rowCss.evenRowCss);
			$tbodyFix.find("tr:nth-child(odd)").addClass(that.rowCss.oddRowCss);
			$tbodyFix.find("tr:nth-child(even)").addClass(that.rowCss.evenRowCss);
		}
	}
	
	
	
	
	$(".table tbody tr").mouseenter(function () {
		$(this).addClass("hoverTr");
	}).mouseleave(function () {
		$(".table tbody tr").removeClass("hoverTr");
	});
	
	
	if(fixCln>0){//如果需要冻结列，需要重新计算表格div的高度
		$("#"+that.currentTableId).css("border-left",0);
		
		$("#"+that.fixTableId+" tbody tr").hover(function () {
			var index=$(this).index();
			$("#"+that.currentTableId+" tbody tr").eq(index).addClass("hoverTr");
		});
		$("#"+that.currentTableId+" tbody tr").hover(function () {
			var index=$(this).index();
			$("#"+that.fixTableId+" tbody tr").eq(index).addClass("hoverTr");
		});
		
		$("#leftIcon").click(function () {//隐藏左边菜单栏的
			TableToolsNewTwo.prototype.resizeWidht(that);
		});
	}
	
	TableToolsNewTwo.prototype.resizeWidht(that);
	
	$(".table tbody tr").mouseenter(function () {
		$(this).addClass("hoverTr");
	}).mouseleave(function () {
		$(".table tbody tr").removeClass("hoverTr");
	});
	that.loadEnd=true;
    //滚动条拉到最底部
    var $div = $('.tableWrap')[0];
    $("#"+that.divId+" .fixedDiv").scrollTop($div.scrollHeight);
    $("#"+that.divId+" .scrollDiv").scrollTop($div.scrollHeight);
    $("#"+that.divId+" .normalTable").scrollTop($div.scrollHeight);

};


/********************************** 
* @funcname initExport
* @funcdesc 初始化导出表格的绑定事件
* @param {Object} type (input optional)  that TableToolsNewTwo对象的属性参数
* @return {null} 
* @author 陈小芳
* @create 20170818
* @modifier 陈小芳
* @modify 20170818 
*********************************/
TableToolsNewTwo.prototype.initExport = function(that){
	var $table = $("#" + that.tableDivId);
	$table.find(".pbt_btn").click(function(){
		if(that.sceneId==1&&!noceUtil.isUndefined(that.Data)){//获取数据导出
			if(noceUtil.ArrayIsNull(that.Data)){
				alert("没有数据可以导出");
				return;
			}
			var columns="";
			//that.Data.columns = ["用户id","用户名称","应用id","应用名称","操作时间","加载耗时"];
			if(noceUtil.isUndefined(that.tableHead)){
				columns = that.Data.columns;
			}else{
				columns = that.tableHead.split(",");
			}
			var sheetObj = new sheet(columns,that.Data.result,"sheet1");
			exportExcelUtil.exportExcelByList("sheet"+"-"+Math.round((Math.random() * 100000)),sheetObj);
		}else if(that.sceneId==1&&!noceUtil.isUndefined(that.exportObj)){//通过拼接导出组件的参数导出，支持合并表头
			var exportExcel=new exportExcelNew(that.exportObj);
			exportExcel.submit();
		}else{//通过sql导出
			//默认导出的名称为sheet，后期可拓展成根据功能名称或表单标题显示导出名称
			exportExcelUtil.exportBySqlPara("sheet"+"_:_" +JSON.stringify(that.condition.sql),"sheet"+"-"
					+Math.round((Math.random() * 100000)),that.condition.dataType);
		}
		
	});	
};


/********************************** 
* @funcname createFixThead
* @funcdesc 动态生成冻结列的表头   fixCln需要冻结的列数
* @param {Object} type (input optional)  that TableToolsNewTwo对象的属性参数
* @param {String} type (input optional)  theadName 传入的表头名称
* @param {Number} type (input optional)  fixCln T需要冻结的列数
* @return {String} type (output optional) tableHead 拼接好的冻结列表格的表头html
* @author 陈小芳
* @create 20170818
* @modifier 陈小芳
* @modify 20170818 
*********************************/
TableToolsNewTwo.prototype.createFixThead=function (that,theadName,fixCln){
	var columns = "";
	if(noceUtil.isUndefined(theadName)&&!noceUtil.isUndefined(that.Data)){
		columns = that.Data.columns;
	}else{
		columns = theadName.split(",");
	}
	var tableHead="";
	var xh = '<div style=" vertical-align: super; display:inline;">序号</div>';
	var tr = "";
	var tds ="";
	var td = '<td class="nr_paixu" sortColumn="';//'<td class="nr_paixu" sortColumn="">';
	/*var div = '<div style=" float: left;  display:inline;">';*/
	var div = '<div style=" vertical-align: super; display:inline;">';
	var span = '<span class="nrp_dowm"></span>';
	var br = '</div>';
	for(var i=0;i<columns.length;i++){
		if(i>=fixCln){
			break;
		}
		//为列绑定自定义的样式和函数
		if(that.sceneId==1){
			var clnCss="";
			var funtion="";
			if(!noceUtil.isUndefined(that.theadObj.clnCssArray)){
				clnCss=TableToolsNewTwo.prototype.bindClnCss(i,columns[i].trim(),that.theadObj.clnCssArray);
			}
			if(!noceUtil.isUndefined(that.theadObj.functionArray)){
				funtion=TableToolsNewTwo.prototype.bindClnFunction(i,columns[i].trim(),that.theadObj.functionArray);
			}
			if(!noceUtil.isUndefined(funtion)){
				//var dataResult=TableToolsNewTwo.prototype.dataObject(hResult,columns);
				if(funtion.indexOf("()")>-1){ 
					funtion=funtion.replace("(", "("+JSON.stringify(columns).replace(/"/g, '&quot;')+"");
				}else{
					funtion=funtion.replace("(", "("+JSON.stringify(columns).replace(/"/g, '&quot;')+","); 
				}
			}
			tds = '<td class="nr_paixu '+clnCss+'" sortColumn="'+i+'"  '+funtion+'>'+'<div class="alltd">'+div+columns[i].trim()+br+div+span+br+br+'</td>';;	
		}else{
			tds = td+i+'" >'+'<div>'+div+columns[i].trim()+br+div+span+br+br+'</td>';
		}
		tr += tds;
	}
	tableHead = '<tr>'+'<td><div class="alltd">'+xh+'</div></td>'+tr+'</tr>';
//	console.log(tableHead);
	return tableHead;
	
	
}


/********************************** 
* @funcname createThead
* @funcdesc //动态生成表头
* @param {Object} type (input optional)  that TableToolsNewTwo对象的属性参数
* *@param {String} type (input optional)  theadName 表头的名称
* @return {String} type (output optional) tableHead 返回拼接好的表头html元素
* @author 陈小芳
* @create 20170818
* @modifier 陈小芳
* @modify 20171128 
*********************************/
TableToolsNewTwo.prototype.createThead = function(that,theadName){
	var fixCln=0;
	if(!noceUtil.isUndefined(that.fix)&&that.fix==true){
		fixCln=that.fixObj.fixClnObj.fixCln;//冻结的行
	}
	var columns = "";
	if(noceUtil.isUndefined(theadName)&&!noceUtil.isUndefined(that.Data)){
		columns = that.Data.columns;
	}else{
		columns = theadName.split(",");
	}
	var tableHead="";
	var xh = '<div style=" vertical-align: super; display:inline;">序号</div>';
	var tr = "";
	var tds ="";
	var td = '<td class="nr_paixu" sortColumn="';//'<td class="nr_paixu" sortColumn="">';
	/*var div = '<div style=" float: left;  display:inline;">';*/
	var div = '<div style=" vertical-align: super; display:inline;">';
	var span = '<span class="nrp_dowm"></span>';
	var br = '</div>';
	for(var i=0;i<columns.length;i++){
		if(fixCln<=i){
			//为列绑定自定义的样式和函数
			if(that.sceneId==1){
				var clnCss="";
				var funtion="";
				if(!noceUtil.isUndefined(that.theadObj.clnCssArray)){
					clnCss=TableToolsNewTwo.prototype.bindClnCss(i,columns[i].trim(),that.theadObj.clnCssArray);
				}
				if(!noceUtil.isUndefined(that.theadObj.functionArray)){
					funtion=TableToolsNewTwo.prototype.bindClnFunction(i,columns[i].trim(),that.theadObj.functionArray);
				}
				if(!noceUtil.isUndefined(funtion)){
					//var dataResult=TableToolsNewTwo.prototype.dataObject(hResult,columns);
					if(funtion.indexOf("()")>-1){ 
						funtion=funtion.replace("(", "("+JSON.stringify(columns).replace(/"/g, '&quot;')+"");
					}else{
						funtion=funtion.replace("(", "("+JSON.stringify(columns).replace(/"/g, '&quot;')+","); 
					}
				}
				tds = '<td class="nr_paixu '+clnCss+'" sortColumn="'+i+'"  '+funtion+'>'+'<div class="alltd">'+div+columns[i].trim()+br+div+span+br+br+'</td>';	
			}else{
				tds = td+i+'" >'+'<div>'+div+columns[i].trim()+br+div+span+br+br+'</td>';
			}
			tr += tds;
		}
	}
	
	if(that.addCln>0){
		var addClnThead=that.clnObj.lastCln.addClnThead;
		if(addClnThead.length>0){
			for(var k=0;k<addClnThead.length;k++){
				tds = '<td class="nr_paixu">'+'<div class="alltd">'+div+addClnThead[k]+br+div+br+br+'</td>';	
				tr += tds;
			}
		}
	}
	
	if(fixCln==0){
		tableHead = '<tr>'+'<td><div class="alltd">'+xh+'</div></td>'+tr+'</tr>';
	}else{
		tableHead = '<tr>'+tr+'</tr>';
	}
	
//	console.log(tableHead);
	return tableHead;
};


/********************************** 
* @funcname createTable
* @funcdesc 动态生成table 参数tableId为表单的唯一ID,参数theadName为表头名称
* @param {Object} type (input optional)  that TableToolsNewTwo对象的属性参数
* @return {String}  type (output optional)  table  返回拼接好的表格<table></table> html元素
* @author 陈小芳
* @create 20170818
* @modifier 陈小芳
* @modify 20171128 
*********************************/
TableToolsNewTwo.prototype.createTable = function(that){
	var table = "";
	//<table id="tableList" class="table table-bordered" style=" table-layout: fixed; width: 100%; word-wrap: break-word;" width="100%" cellpadding="0" cellspacing="0" border="0">
	var tableStr = '<table id="'+that.currentTableId+'"  class="table table-bordered">';	
	var thead = TableToolsNewTwo.prototype.createThead(that,that.thead);
	table = tableStr+'<thead>'+thead+'</thead>'+'<tbody>'+'</tbody>'+'</table>';
//	console.log(table);
	that.table = table;
	return table;
}

/********************************** 
* @funcname createTableDiv
* @funcdesc 通过解析that.divCss，动态生成表格外层div和“导出按钮、加载更多、无更多数据、加载中”按钮的样式
* @param {Object} type (input optional)  that TableToolsNewTwo对象的属性参数
* @return {String} type (output optional)  tableDiv 拼接表格最外层的div块元素
* @author 陈小芳
* @create 20170818
* @modifier 陈小芳
* @modify 20171128 
*********************************/
TableToolsNewTwo.prototype.createTableDiv = function(that){
	
	var loadMoreCss=!noceUtil.isUndefined(that.divCss)&&!noceUtil.isUndefined(that.divCss.loadMoreCss) ? that.divCss.loadMoreCss : "pmore_1";//加载更多数据
	var loadingCss=!noceUtil.isUndefined(that.divCss)&&!noceUtil.isUndefined(that.divCss.loadingCss) ?  that.divCss.loadingCss : "pmore_2";//正在加载
	var noMoreCss=!noceUtil.isUndefined(that.divCss)&&!noceUtil.isUndefined(that.divCss.noMoreCss) ?  that.divCss.noMoreCss : "pmore_3";//已无更多数据
	var loadBtnCss=!noceUtil.isUndefined(that.divCss)&&!noceUtil.isUndefined(that.divCss.loadBtnCss) ?  that.divCss.loadBtnCss : "loadbtn";//按钮的统一样式
	var pbtCss=!noceUtil.isUndefined(that.divCss)&&!noceUtil.isUndefined(that.divCss.pbtCss) ?  that.divCss.pbtCss : "pbt";//导出数据
	var pbtBtnCss=!noceUtil.isUndefined(that.divCss)&&!noceUtil.isUndefined(that.divCss.pbtBtnCss) ? that.divCss.pbtBtnCss : "pbt_btn";//导出数据按钮样式
	var divOutCss=!noceUtil.isUndefined(that.divCss)&&!noceUtil.isUndefined(that.divCss.divOutCss) ? that.divCss.divOutCss : "tableWrap";//表格最外边的div

	var tableDiv = "";
	var divStr = '<div class="scrollDiv '+divOutCss+'" style=" display: block;">';	
	var table = TableToolsNewTwo.prototype.createTable(that);
	tableDiv =  divStr+table+'</div>';
//	console.log("tableDiv:"+tableDiv);
	that.tableDiv = tableDiv;
	return tableDiv;
}



/********************************** 
* @funcname createTablePtn
* @funcdesc //frontFlag==0，即代表不需要前端分页，拼接原来表格后面的加载更多、导出数据等按钮的div
* @param {Object} type (input optional)  that TableToolsNewTwo对象的属性参数
* @return {null} 
* @author 陈小芳
* @create 20170818
* @modifier 陈小芳
* @modify 20171128 
*********************************/
TableToolsNewTwo.prototype.createTablePtn = function(that){
	
	var loadMoreCss=!noceUtil.isUndefined(that.divCss)&&!noceUtil.isUndefined(that.divCss.loadMoreCss) ? that.divCss.loadMoreCss : "pmore_1";//加载更多数据
	var loadingCss=!noceUtil.isUndefined(that.divCss)&&!noceUtil.isUndefined(that.divCss.loadingCss) ?  that.divCss.loadingCss : "pmore_2";//正在加载
	var noMoreCss=!noceUtil.isUndefined(that.divCss)&&!noceUtil.isUndefined(that.divCss.noMoreCss) ?  that.divCss.noMoreCss : "pmore_3";//已无更多数据
	var loadBtnCss=!noceUtil.isUndefined(that.divCss)&&!noceUtil.isUndefined(that.divCss.loadBtnCss) ?  that.divCss.loadBtnCss : "loadbtn";//按钮的统一样式
	var pbtCss=!noceUtil.isUndefined(that.divCss)&&!noceUtil.isUndefined(that.divCss.pbtCss) ?  that.divCss.pbtCss : "pbt";//导出数据
	var pbtBtnCss=!noceUtil.isUndefined(that.divCss)&&!noceUtil.isUndefined(that.divCss.pbtBtnCss) ? that.divCss.pbtBtnCss : "pbt_btn";//导出数据按钮样式
	
	
	var tableDiv = "";
	var pmore_1 = '<div style="display:none" class="btnDiv '+loadMoreCss+'"  type="'+that.currentTableId+'" ><span class="'+loadBtnCss+'">加载更多数据</span></div>';
	var pmore_2 = '<div style="display:none" class="btnDiv '+loadingCss+'"><span class="'+loadBtnCss+'">正在加载...</span></div>';
	var pmore_3 = '<div style="display:none" class="btnDiv '+noMoreCss+'"></div>';
	var pbt_btn = '<div class="btnDiv '+pbtCss+'"><div class="'+pbtBtnCss+'">导出数据</div></div>';
	tableDiv = '<div class="btnGroup pcbox_nr">'+pmore_1+pmore_2+pmore_3+pbt_btn+'</div>';
//	console.log("tableDiv:"+tableDiv);
	that.tableDiv = tableDiv;
	return tableDiv;
}




/********************************** 
* @funcname createMyPageDiv
* @funcdesc 需要前端分页，frontFlag==1时，需要拼接myPage的html
* @param {Object} type (input optional)  that TableToolsNewTwo对象的属性参数
* @return {null} 
* @author 陈小芳
* @create 20170818
* @modifier 陈小芳
* @modify 20171128 
*********************************/
TableToolsNewTwo.prototype.createMyPageDiv = function (that){
	var leftPage='<div class="page">';
	leftPage +='<div class="page-pagination">';
	leftPage +='<a href="javascript:;" class="first-active" id="First"></a>';
	leftPage +='<a href="javascript:;" class="prev-active"  id="Prev"></a>';
	leftPage +='</div>';
	leftPage +='<div class="">';
	leftPage +='第<input class="page-num" id="PageNumber" value="1">页，共<span id="PageTotal">1</span>页';
	leftPage +='<input id="PageNumberH" type="hidden" value="18">';
	leftPage +='</div>';
	leftPage +='<div class="page-pagination">';
	leftPage +='<a href="javascript:;" class="next-active"  id="Next"></a>';
	leftPage +='<a href="javascript:;" class="last-active"  id="Last"></a>';
	leftPage +='</div>';
	leftPage +='<div>'; 
	leftPage +='<a href="javascript:;" class="page-load" id="Load"><img src="../js/IntelligentRoadTest/images/111_11.png"></a>';
	leftPage +='</div>';
	leftPage +='</div>';
	var rightPage='<div class="page-info">';
	rightPage +='本页显示<span id="firstRowIdx">0</span>-<span id="endRowIdx">'+0+'</span>条，共<span id="fullListSize">0</span>条数据';
	rightPage +='</div>';
	var mypageHtml='<div class="myPage">'+leftPage+rightPage+'</div>';
	return mypageHtml;
}


/********************************** 
* @funcname isSub
* @funcdesc 通过传入的参数判断此列是否需要截取字段 false：截取；true:不截取
* @param {Array} type (input optional)  subNotArray 传入的需要截取的列数参数
* @param {Number} type (input optional)  j 当前遍历的列数
* @return {Boolean} type (output optional)  flag 结果返回true或者false
* @author 陈小芳
* @create 20170818
* @modifier 陈小芳
* @modify 20171128 
*********************************/
TableToolsNewTwo.prototype.isSub = function(subNotObj,j){
	var flag=true;
	if(!noceUtil.isUndefined(subNotObj)){
		if(!noceUtil.isUndefined(subNotObj.subValue)){
			var subNotArray=subNotObj.subValue;
			for(var n=0;n<subNotArray.length;n++){
				if((subNotArray[n]-1)==j){
					flag=false;
					break;
				}
			}
		}
	}
	return flag;
	
}

//如果需要冻结列，则需要生成冻结列的表格div
/********************************** 
* @funcname createTableFixDiv
* @funcdesc 根据传入的参数，判断是否需要冻结列，需要则生成冻结列的表格div外层，否则return为""
* @param {Object} type (input optional)  that TableToolsNewTwo对象的属性参数
* @return {String} type (output optional) tableFixDiv 拼接好的冻结列表格的外层div
* @author 陈小芳
* @create 20170818
* @modifier 陈小芳
* @modify 20170818 
*********************************/
TableToolsNewTwo.prototype.createTableFixDiv= function(that){
	var fixCln="";
	var tableId="";
	
	if(!noceUtil.isUndefined(that.fixObj)){
		 fixCln=!noceUtil.isUndefined(that.fixObj.fixClnObj)&&!noceUtil.isUndefined(that.fixObj.fixClnObj.fixCln) ? that.fixObj.fixClnObj.fixCln : "";//冻结的前面哪几列
		 tableId=!noceUtil.isUndefined(that.fixObj.fixClnObj)&&!noceUtil.isUndefined(that.fixObj.fixClnObj.tableId) ? that.fixObj.fixClnObj.tableId : "";//冻结列表格的id
	}
	var tableFixDiv='';
	if(fixCln==""||tableId==""){
		//alert("冻结列的fixClnObj对象中fixCln,tableId,divClass不能为空");
		return tableFixDiv;
	}
	//动态生成table 参数tableId为表单的唯一ID,参数theadName为表头名称
	var tableFix = "";
	//<table id="tableList" class="table table-bordered" style=" table-layout: fixed; width: 100%; word-wrap: break-word;" width="100%" cellpadding="0" cellspacing="0" border="0">
	var tableStr = '<table id="'+tableId+'" class="table table-bordered" style="width: auto;">';	
	var theadFix = TableToolsNewTwo.prototype.createFixThead(that,that.thead,fixCln);
	tableFix = tableStr+'<thead>'+theadFix+'</thead>'+'<tbody>'+'</tbody>'+'</table>';
//		console.log(table);
	that.tableFix = tableFix;
	tableFixDiv='<div class="fixedDiv" >'+tableFix+'</div>';
	that.tableFixDiv = tableFixDiv;
	that.fixTableId=tableId;
	return tableFixDiv;
}

//生成排序字段
/********************************** 
* @funcname createSortColumns
* @funcdesc 根据传入的参数，生成表头属性sortColumn的字段名称，把给添加排序的字段添加“nr_paixu down”样式
* @param {String} type (input optional)  tableId 表格的id
*  @param {String} type (input optional)  columns 表头的字段名称
*  @param {String} type (input optional)  defaultColumn 默认要排序的字段名称
* @return {null} 
* @author 陈小芳
* @create 20170818
* @modifier 陈小芳
* @modify 20171128 
*********************************/
TableToolsNewTwo.prototype.createSortColumns = function(tableId,columns,defaultColumn){
	var $table = $("#" + tableId);
	for(var i=0;i<columns.length;i++){
		if(defaultColumn.toLowerCase() == columns[i].toLowerCase()){
			$table.find("td[sortColumn='"+i+"']").attr("class","nr_paixu down");
		}
		$table.find("td[sortColumn='"+i+"']").attr("sortColumn",columns[i]);
	}
}

//生成排序字段
/********************************** 
* @funcname createFixSortColumns
* @funcdesc 生成冻结列表格的排序字段
* @param {String} type (input optional)  tableId 冻结列表格的id
* @param {String} type (input optional)  columns 冻结列表格的字段名称
* @param {String} type (input optional)  defaultColumn  默认的排序名称
* @param {Number} type (input optional) fixCln 需要冻结的列数
* @return {null}
* @author 陈小芳
* @create 20170818
* @modifier 陈小芳
* @modify 20170818 
*********************************/
TableToolsNewTwo.prototype.createFixSortColumns = function(tableId,columns,defaultColumn,fixCln){
	var $table = $("#" + tableId);
	for(var i=0;i<columns.length;i++){
		if(i<=fixCln){
			break;
		}
		if(defaultColumn.toLowerCase() == columns[i].toLowerCase()){
			$table.find("td[sortColumn='"+i+"']").attr("class","nr_paixu down");
		}
		$table.find("td[sortColumn='"+i+"']").attr("sortColumn",columns[i]);
	}
}


/********************************** 
* @funcname locationTable
* @funcdesc 根据指定列和值重新定位表格滚动条位置
* @param {String} type (input optional)  tableId DIV Id
* @param {String} type (input optional)  columnNum 列数
* @param {String} type (input optional)  val  列值
* @return {null}
* @author 戴岭南
* @create 20171027
*********************************/
TableToolsNewTwo.prototype.locationTable = function(divId,columnNum,val){
	
	var top = 0;
	var lineHeight = $(".alltd").height()+1;//每列的高度
	var headTr=$("#"+divId+"  table  tr");
	var line = 0;
	for(var i=0; i<headTr.length;i++){
		if(headTr.eq(i).hasClass("loadTr")){
			headTr.eq(i).removeClass("loadTr");
		}
		if(val==headTr.eq(i).children().eq(columnNum).text()){
			line = i;
			continue;
		}
		
	}
	
	top = (line-1)*lineHeight;//滚动条应该滚动的距离
	$("#"+divId+" .normalTable").scrollTop(top);
	headTr.eq(line).addClass("loadTr");
}





/********************************** 
* @funcname init
* @funcdesc 初始化模块
* @param {Object} type (input optional)  that TableToolsNewTwo的表格参数对象
* @return {null} 
* @author 陈小芳
* @create 20170818
* @modifier 陈小芳
* @modify 20171128 
*********************************/
TableToolsNewTwo.prototype.init = function(that){
	var $table = $("#" + that.currentTableId);
	var $tableFix = $("#" + that.fixTableId);
	if((that.sceneId==1&&that.sortFlag==0)){//不排序
		that.loading = $table.parent().siblings().find("div[class^=pmore_]").hide();//隐藏分页组件
		TableToolsNewTwo.prototype.initExport(that);//导出
		TableToolsNewTwo.prototype.initPageBtn(that);//前端分页按钮绑定事件
	}else{
		that.loading = $table.parent().siblings().find("div[class^=pmore_]").hide();//隐藏分页组件
		TableToolsNewTwo.prototype.initSort(that);//排序初始化
		TableToolsNewTwo.prototype.initExport(that);//导出
		TableToolsNewTwo.prototype.initPageBtn(that);//前端分页按钮绑定事件
		$table.find(".nr_paixu").click(function(){
			var _self = $(this);
			$tableFix.find(".nr_paixu").removeClass("down");
			_self.addClass("down").siblings().removeClass("down");
		});
		if(that.fix){
			$tableFix.find(".nr_paixu").click(function(){
				var _self = $(this);
				$table.find(".nr_paixu").removeClass("down");
				_self.addClass("down").siblings().removeClass("down");
			});
		}
		
	}
	//如果有冻结列，拆分冻结和非冻结的表头拼接完成后，重新计算表格div的宽度，使两个拆分的表能合并
	/*if(that.fix){
		TableToolsNewTwo.prototype.resizeWidht(that);
	}*/
	TableToolsNewTwo.prototype.resizeWidht(that);
	
}
}
