function TableToolsNew(loadMore,loading,noMore,currentTableId,sortColumn,thead,tableHead,table,condition,pageSize,pageIndex,sortType,dataType,tableCss){//创建对象及其属性
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
		this.tableCss = tableCss;//查询数据库类型
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
 * cell_value为列值，css_class_name为类名。
 * 查询类型：暂定1为impala异步查询，2为impala同步查询，3为mysql查询
 */

TableToolsNew.prototype.submit = function(tableDivId,tableId,tableSqlPara,tableSqlStr,tableCss){
	var tableSqlStr = TableToolsNew.prototype.check(tableSqlStr);
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
	var tableDiv = TableToolsNew.prototype.createTableDiv(that);
	$("#"+tableDivId).html(tableDiv);	
	that.condition = {
		"sql":sqlPara,
		"sortColumn":sortColumn,
		"pageSize":pageSize,
		"pageIndex":pageIndex,
		"thead":thead,
		"sortType":sortType,
		"dataType":dataType
	};
	
	TableToolsNew.prototype.init(that);
	var fun = function(data){	
		TableToolsNew.prototype.createSortColumns(that.currentTableId,data.columns,that.sortColumn);
		TableToolsNew.prototype.freshTable(data,that);
	};
	var functionlist=[fun];	
	TableToolsNew.prototype.progressSql(sqlPara,sortColumn,that.sortType,pageSize,pageIndex,functionlist,that.tableDivId,that);
//	TableToolsNew.prototype.progressSql(sqlPara,functionlist,that);
	
};

//拼装SQL，提交请求
TableToolsNew.prototype.progressSql  = function(sqlPara,sortColumn,sortType,pageSize,pageIndex,functionlist,tableDivId,that){
	var SqlList = [];//需使用[]，不然会解析出错
	SqlList.push(sqlPara);
	that.condition.sortColumn = sortColumn;
	that.condition.sortType = sortType;
	that.condition.pageSize = pageSize;
	that.condition.pageIndex = pageIndex;
	
	if(that.condition.dataType==1){
		progressbarTwo.submitSql(SqlList,functionlist,null,null,true,1,that.condition);
	}else{
		var dataBase = [that.condition.dataType];
		progressbarTwo.submitSql(SqlList,functionlist,dataBase,null,false,1,that.condition);
	}
//	progressCanvas.submitSqlDiv(progressCanvasSql,functionlist,reflectClass,tableDivId);
};

/**
 * 用于第一次刷新表格
 */
TableToolsNew.prototype.freshTable = function(data,that) {
	var $table = $("#" + that.currentTableId);
	var $tbody = $table.find("tbody");
	var tbody = "";
	var tr = "";
	var tr2 = "";
	// 获取pageIndex
	/*var pageIndex = $table.attr("pageIndex");
	if (noceUtil.isUndefined(pageIndex)) {
		pageIndex = 1;
		$table.attr("pageIndex", "1");
	}
	if (pageIndex == 1) {
		$tbody.empty();
	}*/	
	that.pageIndex = 1;
	$tbody.empty();	
	// 对象赋值
	that.loadMore = $table.parents(".tbli").find(".pmore_1"); 
	that.loading = $table.parents(".tbli").find(".pmore_2");
	that.noMore = $table.parents(".tbli").find(".pmore_3");
	var result = data.result;
	var types = data.types;
	
	var id_path = noceUtil.GetQueryString("appId");
	if(id_path =="badCellAnalysis"){//这里因为只是第二个表格经过这个组件。
		console.log(id_path);
		var _data = [];
		for(var s = 0; s < result.length; s++){
			var a = [];
			for(var l= 0; l < result[s].length; l++){
				if(l == 12 || l == 13 || l == 16 || l == 19|| l == 22 || l == 25|| l == 28){
					a.push(result[s][l] + "%");
				}else{
					a.push(result[s][l]);
				}
			}
			_data.push(a);
		}
		result = _data;
		console.log(result);
	}
	
	// 重绘数据
	for ( var i = 0; i < result.length; i++) {
		var hResult = result[i];
		tr = "<tr>" +'<td style="text-align:center">' + (i+1) + '</td>';
		//判断td的长度，由于js加了跨行
		var id_path = noceUtil.GetQueryString("appId");
		var graph=noceUtil.GetQueryString("graph");
		if(id_path == "badCellAnalysis"){
			td_Length=$table.find("thead").find("tr").eq(1).children().length;
//			td_Length=24;
		}else if(graph == "1"){
			td_Length=$table.find("thead").find("tr").eq(1).children().length;
		}else{
			td_Length = $table.find("thead").find("td").length;
		}

		for ( var j = 0; j < td_Length-1; j++) {

			var tmp = noceUtil.fixL2(hResult[j]);
			if (tmp == null) {
				tmp = '';
			}else if(tmp.length>20){
				tmp = '<u><a title='+tmp+'>'+tmp.substring(0,10)+"...."+tmp.substring(tmp.length-10,tmp.length)+'</a></u>';				
			}
			var type = types[j];
			if(type == "String"){
				var haveCss = false;
				for(var k=0;k<that.tableCss.length;k++){
					if(j==that.tableCss[k][0]){
						var sCss = that.tableCss[k][1];
						if(sCss[0]=="map"){
							for(var p=1;p<sCss[0].length;p++){
								if(tmp==sCss[p][0]){
									tr = tr + '<td style="text-align:center;" class="'+sCss[p][1]+'">' + tmp + '</td>';
									haveCss = true;
								}
							}
						}
					}
				}
				if(!haveCss){
					tr = tr + '<td style="text-align:center;">' + tmp + '</td>';	
				}
				
			}else{
				tr = tr + '<td >' + tmp + '</td>';
			}						
		}
		tr = tr + "</tr>";
		tbody = tbody + tr;
	}
	$tbody.append(tbody);
	if (result.length == that.condition.pageSize) {
		that.pageIndex++;
		that.condition.pageIndex = that.pageIndex;
		that.loadMore.show();
		that.loading.hide();
		that.noMore.hide();
		that.loadMore.unbind('click').click(function() {
			$(this).hide();
			$(this).siblings('.pmore_2').show();
			TableToolsNew.prototype.getMoreData(this,that); 
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
};

TableToolsNew.prototype.check = function(tableSql){
	
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

/**
 * 排序初始化
 */
TableToolsNew.prototype.initSort = function(that) {
	$("#"+that.currentTableId).find("td[sortColumn]").click(function() {
		// 是否相同字段
		var b = $(this).attr("class").indexOf("down") > -1;
		var sortType = that.currentSortType;
		if (typeof(sortType) == "undefined") {
			sortType = that.sortType;
		}
		var pageSize =  that.currentPageSize;
		if (noceUtil.isUndefined(pageSize)) {
			pageSize = that.pageSize;
		}
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
		// 保存当前排序字段
		$("#"+that.currentTableId).attr("sortColumn", conditions.sortColumn);
		conditions.sortType = that.sortType;
		// 初始页数
		conditions.pageIndex = pageIndex;
		var fun = function(data){	
			TableToolsNew.prototype.freshTable(data, that);
		};
		var functionlist=[fun];	
		TableToolsNew.prototype.progressSql(conditions.sql,conditions.sortColumn,sortType,pageSize,pageIndex,functionlist,that.tableDivId,that);
	});
};

/**
 * 获取更多数据
 */
TableToolsNew.prototype.getMoreData = function(obj,that) {
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
	var pageIndex = that.currentPageSize;
	if (noceUtil.isUndefined(pageIndex)) {
		pageIndex = that.condition.pageSize*(that.pageIndex-1);
	}else{
		conditions.pageIndex = that.pageIndex; 
	}	 
	conditions.sortType = that.sortType;
	var fun = function(data){	
		TableToolsNew.prototype.freshTable2(data, that);
	};
	var functionlist=[fun];	
	TableToolsNew.prototype.progressSql(conditions.sql,conditions.sortColumn,conditions.sortType,conditions.pageSize,pageIndex,functionlist,that.tableDivId,that);
};

//用于加载更多
TableToolsNew.prototype.freshTable2 = function(data,that) {
	var $table = $("#" + that.currentTableId);
	var $tbody = $table.find("tbody");
	var tbody = "";
	var tr = "";
	var tr2 = "";
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
	that.loadMore = $table.parents(".tbli").find(".pmore_1");
	that.loading = $table.parents(".tbli").find(".pmore_2");
	that.noMore = $table.parents(".tbli").find(".pmore_3");
	var result = data.result;
	var types = data.types;
	
	var id_path = noceUtil.GetQueryString("appId");
	if(id_path =="badCellAnalysis"){//这里因为只是第二个表格经过这个组件。
		console.log(id_path);
		var _data = [];
		for(var s = 0; s < result.length; s++){
			var a = [];
			for(var l= 0; l < result[s].length; l++){
				if(l == 12 || l == 13 || l == 16 || l == 19|| l == 22 || l == 25|| l == 28){
					a.push(result[s][l] + "%");
				}else{
					a.push(result[s][l]);
				}
			}
			_data.push(a);
		}
		result = _data;
		console.log(result);
	}
	
	// 重绘数据
	for ( var i = 0; i < result.length; i++) {
		var hResult = result[i];
		tr = "<tr>" +'<td style="text-align:center">' + (num+i+1) + '</td>';
		
		//判断td的长度，由于js加了跨行
		var id_path = noceUtil.GetQueryString("appId");
		var graph=noceUtil.GetQueryString("graph");
		if(id_path == "badCellAnalysis"){
			td_Length=$table.find("thead").find("tr").eq(1).children().length;
//			td_Length=24;
		}else if(graph == "1"){
			td_Length=$table.find("thead").find("tr").eq(1).children().length;
		}else{
			td_Length = $table.find("thead").find("td").length;
		}
		for ( var j = 0; j < td_Length-1; j++) {

			var tmp = noceUtil.fixL2(hResult[j]);
			if (tmp == null) {
				tmp = '';
			}else if(tmp.length>20){
				tmp = '<u><a title='+tmp+'>'+tmp.substring(0,10)+"...."+tmp.substring(tmp.length-10,tmp.length)+'</a></u>';				
			}
			var type = types[j];
			if(type == "String"){
				tr = tr + '<td style="text-align:center">' + tmp + '</td>';
			}else{
				tr = tr + '<td >' + tmp + '</td>';
			}		
		}
		tr = tr + "</tr>";
		tbody = tbody + tr;
	}
	$tbody.append(tbody);
	if (result.length == that.condition.pageSize) {
		that.pageIndex++;
		that.condition.pageIndex = that.pageIndex;
		that.currentPageSize = num+result.length;
		that.loadMore.show();
		that.loading.hide();
		that.noMore.hide();
		that.loadMore.unbind('click').click(function() {
			$(this).hide();
			$(this).siblings('.pmore_2').show();
			TableToolsNew.prototype.getMoreData(this,that);
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
};

//导出表格
TableToolsNew.prototype.initExport = function(that){
	var $table = $("#" + that.tableDivId);
	$table.find(".pbt_btn").click(function(){
		//默认导出的名称为sheet，后期可拓展成根据功能名称或表单标题显示导出名称
		exportExcelUtil.exportBySqlPara("sheet"+"_:_" +JSON.stringify(that.condition.sql),"sheet"+"-"
				+Math.round((Math.random() * 100000)),that.condition.dataType);
	});	
};

//动态生成表头
TableToolsNew.prototype.createThead = function(theadName){
	var columns = theadName.split(",");
	var tableHead="";
	var xh = "序号";
	var tr = "";
	var tds ="";
	var td = '<td class="nr_paixu" sortColumn="';//'<td class="nr_paixu" sortColumn="">';
	/*var div = '<div style=" float: left;  display:inline;">';*/
	var div = '<div style=" vertical-align: super; display:inline;">';
	var span = '<span class="nrp_dowm"></span>';
	var br = '</div>';
	for(var i=0;i<columns.length;i++){
		tds = td+i+'" >'+'<div>'+div+columns[i].trim()+br+div+span+br+br+'</td>';
		tr += tds;
	}
	tableHead = '<tr>'+'<td style="text-align:center">'+xh+'</td>'+tr+'</tr>';
//	console.log(tableHead);
	return tableHead;
};

//动态生成table 参数tableId为表单的唯一ID,参数theadName为表头名称
TableToolsNew.prototype.createTable = function(that){
	var table = "";
	//<table id="tableList" class="table table-bordered" style=" table-layout: fixed; width: 100%; word-wrap: break-word;" width="100%" cellpadding="0" cellspacing="0" border="0">
	var tableStr = '<table id="'+that.currentTableId+'"  class="table table-bordered">';	
	var thead = TableToolsNew.prototype.createThead(that.thead);
	table = tableStr+'<thead>'+thead+'</thead>'+'<tbody>'+'</tbody>'+'</table>';
//	console.log(table);
	that.table = table;
	return table;
	}
//动态生成table 参数tableId为表单的唯一ID,参数theadName为表头名称
TableToolsNew.prototype.createTableDiv = function(that){
	var tableDiv = "";
	var divStr = '<div class="pcbox_nr" style=" display: block; background: rgb(255, 255, 255);"><div class="tbli" ><div class="ptb">';	
	var table = TableToolsNew.prototype.createTable(that);
	var pmore_1 = '<div style="display:none" class="pmore_1"  type="'+that.currentTableId+'" ><span class="loadbtn">加载更多数据</span></div>';
	var pmore_2 = '<div style="display:none" class="pmore_2"><span class="loadbtn">正在加载...</span></div>';
	var pmore_3 = '<div style="display:none;background:#fff;" class="pmore_3"></div>';
	var pbt_btn = '<div class="pbt"><div class="pbt_btn">导出数据</div></div>';
	tableDiv =  divStr+table+'</div>'+pmore_1+pmore_2+pmore_3+pbt_btn+'</div>'+'</div>';
	console.log(tableDiv);
	that.tableDiv = tableDiv;
	return tableDiv;
	}

//生成排序字段
TableToolsNew.prototype.createSortColumns = function(tableId,columns,defaultColumn){
	var $table = $("#" + tableId);
	for(var i=0;i<columns.length;i++){
		if(defaultColumn.toLowerCase() == columns[i].toLowerCase()){
			$table.find("td[sortColumn='"+i+"']").attr("class","nr_paixu down");
		}
		$table.find("td[sortColumn='"+i+"']").attr("sortColumn",columns[i]);
	}
}

TableToolsNew.prototype.init = function(that){
	var $table = $("#" + that.currentTableId);
	that.loading = $table.parent().siblings().find("div[class^=pmore_]").hide();//隐藏分页组件
	TableToolsNew.prototype.initSort(that);//排序初始化
	TableToolsNew.prototype.initExport(that);//导出
	$table.find(".nr_paixu").click(function(){
		var _self = $(this);
		_self.addClass("down").siblings().removeClass("down");
	});
};
}
