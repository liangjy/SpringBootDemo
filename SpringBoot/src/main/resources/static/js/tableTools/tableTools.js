function TableTools(loadMore,loading,noMore,currentTableId,sortColumn,thead,tableHead,table,condition,pageSize,pageIndex,sortType){//创建对象及其属性
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

/**
 * 生成table表单入口
 * @param tableDivId 生成table表单的块ID
 * @param tableId 生成table表单的ID
 * @param tableSql 输入的指定格式的字符串,如：sql&默认的排序字段&行数&指定的中文表头名称
 */

TableTools.prototype.submit = function(tableDivId,tableId,tableSql){
	var tableSqlStr = TableTools.prototype.check(tableSql);
	var sqlStr = tableSqlStr.split("&");
	var sql = "";
	var sortColumn = "";
	var pageSize = "";
	var pageIndex = 0;
	var thead = "";
	if(sqlStr.length == 2){
		sql = sqlStr[0].trim();
		sortColumn = sqlStr[1].trim();
	}else if(sqlStr.length == 3){
		sql = sqlStr[0].trim();
		sortColumn = sqlStr[1].trim();
		pageSize = sqlStr[2].trim();
	}else if(sqlStr.length == 4){
		sql = sqlStr[0].trim();
		sortColumn = sqlStr[1].trim();
		pageSize = sqlStr[2].trim();
		thead = sqlStr[3].trim();
	}
	if(!noceUtil.integerValidat(pageSize)){
		pageSize = 20;
	}
	var that = this;//this为TableTools对象的属性和值
	that.currentTableId = tableId;
	that.sortColumn = sortColumn;
	that.pageSize = pageSize;
	that.pageIndex = pageIndex;
	that.sortType = "desc";//默认降序排序
	that.thead = thead;
	that.tableDivId = tableDivId;
	var tableDiv = TableTools.prototype.createTableDiv(that);
	$("#"+tableDivId).html(tableDiv);	
	that.condition = {
		"sql":sql,
		"sortColumn":sortColumn,
		"pageSize":pageSize,
		"pageIndex":pageIndex,
		"thead":thead,
		"sortType":"desc"
	};
	
	TableTools.prototype.init(that);
	var fun = function(data){	
		TableTools.prototype.createSortColumns(that.currentTableId,data.columns,that.sortColumn);
		TableTools.prototype.freshTable(data,that);
	};
	var functionlist=[fun];	
	TableTools.prototype.progressSql(sql,sortColumn,that.sortType,pageSize,pageIndex,functionlist,that.tableDivId);
};

//拼装SQL，提交请求
TableTools.prototype.progressSql = function(sql,sortColumn,sortType,pageSize,pageIndex,functionlist,tableDivId){
	var progressCanvasSql = [sql+" order by "+sortColumn+" "+sortType+" limit "+pageSize+" offset "+pageIndex];//需使用[]，不然会解析出错
	var reflectClass=[""];
	var progressCanvas = new ProgressCanvas();
	progressbar.submitSql(progressCanvasSql,functionlist,reflectClass,true);
//	progressCanvas.submitSqlDiv(progressCanvasSql,functionlist,reflectClass,tableDivId);
}

/**
 * 用于第一次刷新表格
 */
TableTools.prototype.freshTable = function(data,that) {
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
	if(noceUtil.isUndefined(that.pageIndex)){
		that.pageIndex=1;
	}
	that.pageIndex = that.pageIndex;
	$tbody.empty();	
	// 对象赋值
	that.loadMore = $table.parents(".tbli").find(".pmore_1"); 
	that.loading = $table.parents(".tbli").find(".pmore_2");
	that.noMore = $table.parents(".tbli").find(".pmore_3");
	var result = data.result;
	console.log(result);
	var types = data.types;
	var tableTwo_path_Id = noceUtil.GetQueryString("tableIndex");
	var id_path = noceUtil.GetQueryString("appName");
	var invokeApp = noceUtil.GetQueryString("hideFramework");
	if((id_path == "质差小区分析"||invokeApp=="1")&&tableTwo_path_Id!="tableTwo"){ //查自己的和跳转过来的第一个表格
		var _data = [];
		for(var s = 0; s < result.length; s++){
			var a = [];
			for(var l= 0; l < result[s].length; l++){
				if(l == 6 || l == 7 || l == 10 || l  == 13 || l == 16 || l == 19 || l == 22){
					if(result[s][l]=="NULL"){
						a.push(result[s][l]);

					}else{
						a.push(result[s][l] + "%");
					}
					
				}else{
					a.push(result[s][l]);
				}
			}
			_data.push(a);
		}
		result = _data;
		console.log(result);
	}
	
	var tableTwo_path_Id = noceUtil.GetQueryString("tableIndex");
	if(tableTwo_path_Id=="tableTwo"){ //两种情况下的第二个表格
		var _data = [];
		for(var s = 0; s < result.length; s++){
			var a = [];
			for(var l= 0; l < result[s].length; l++){
				if(l == 12 || l == 13 || l == 16 || l == 19|| l == 22 || l == 25|| l == 28){
					if(result[s][l]=="NULL"){
						a.push(result[s][l]);

					}else{
						a.push(result[s][l] + "%");
					}
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
		var id_path = noceUtil.GetQueryString("appName");
//		var id_path_Id = noceUtil.GetQueryString("appId");
		var tableTwo_path_Id = noceUtil.GetQueryString("tableIndex");
		var invokeApp = noceUtil.GetQueryString("hideFramework");
		if(id_path == "质差小区分析"||invokeApp=="1"||tableTwo_path_Id=="tableTwo"){ //自己和跳转过来的第一个表格,以及两种情况下的第二个表格，的重绘数据都是一样的规则
			td_Length=$table.find("thead").find("tr").eq(1).children().length;
//			td_Length=24;
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
		that.loadMore.show();
		that.loading.hide();
		that.noMore.hide();
		that.loadMore.unbind('click').click(function() {
			$(this).hide();
			$(this).siblings('.pmore_2').show();
			TableTools.prototype.getMoreData(this,that); 
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

TableTools.prototype.check = function(tableSql){
	if(tableSql == null || tableSql == ""){//函数模块化
		alert("查询语句不能为空,请输入需要查询的SQL语句！");
		return;
	}else{
		tableSql = tableSql.trim();
	} 
	if(tableSql.substring(0,6).toLowerCase() != "select"){
		alert("请输入正确以select开头的查询语句！");
		return;
	}else if(tableSql.indexOf("&")<0){
		alert("输入参数格式不对,请在SQL语句结尾加上排序字段，格式为&xxx");
		return;
	}	
	return tableSql;
}

/**
 * 排序初始化
 */
TableTools.prototype.initSort = function(that) {
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
			TableTools.prototype.freshTable(data, that);
		};
		var functionlist=[fun];	
		TableTools.prototype.progressSql(conditions.sql,conditions.sortColumn,sortType,pageSize,pageIndex,functionlist,that.tableDivId);
	});
};

/**
 * 获取更多数据
 */
TableTools.prototype.getMoreData = function(obj,that) {
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
		TableTools.prototype.freshTable2(data, that);
	};
	var functionlist=[fun];	
	TableTools.prototype.progressSql(conditions.sql,conditions.sortColumn,conditions.sortType,conditions.pageSize,pageIndex,functionlist,that.tableDivId);
};

//用于加载更多
TableTools.prototype.freshTable2 = function(data,that) {
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
	
	var id_path = noceUtil.GetQueryString("appName");
	var invokeApp = noceUtil.GetQueryString("hideFramework");
	var tableTwo_path_Id = noceUtil.GetQueryString("tableIndex");
	if((id_path == "质差小区分析"||invokeApp=="1")&&tableTwo_path_Id!="tableTwo"){//两种情况下的第一个表格，但是invokeApp=="1"应该tableTwo_path_Id!="tableTwo"，才不会给
		var _data = [];
		for(var s = 0; s < result.length; s++){
			var a = [];
			for(var l= 0; l < result[s].length; l++){
				if(l == 6 || l == 7 || l == 10 || l == 13|| l == 16 || l == 19|| l == 22){
					if(result[s][l]=="NULL"){
						a.push(result[s][l]);

					}else{
						a.push(result[s][l] + "%");
					}
				}else{
					a.push(result[s][l]);
				}
			}
			_data.push(a);
		}
		result = _data;
		console.log(result);
	}
	var tableTwo_path_Id = noceUtil.GetQueryString("tableIndex");
	if(tableTwo_path_Id=="tableTwo"){ //两种情况下的第二个表格
		var _data = [];
		for(var s = 0; s < result.length; s++){
			var a = [];
			for(var l= 0; l < result[s].length; l++){
				if(l == 12 || l == 13 || l == 16 || l == 19|| l == 22 || l == 25|| l == 28){
					if(result[s][l]=="NULL"){
						a.push(result[s][l]);

					}else{
						a.push(result[s][l] + "%");
					}
				}else{
					a.push(result[s][l]);
				}
			}
			_data.push(a);
		}
		result = _data;
		console.log(result);
	}
	
	var types = data.types;
	// 重绘数据
	for ( var i = 0; i < result.length; i++) {
		var hResult = result[i];
		tr = "<tr>" +'<td style="text-align:center">' + (num+i+1) + '</td>';
		
		var id_path = noceUtil.GetQueryString("appName");
//		var id_path_Id = noceUtil.GetQueryString("appId");
		var invokeApp = noceUtil.GetQueryString("hideFramework");
		var tableTwo_path_Id = noceUtil.GetQueryString("tableIndex");
		if(id_path == "质差小区分析"||invokeApp=="1"||tableTwo_path_Id=="tableTwo"){  //自己和跳转过来的第一个表格,以及两种情况下的第二个表格，的重绘数据都是一样的规则
			td_Length=$table.find("thead").find("tr").eq(1).children().length;
//			td_Length=24;
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
			TableTools.prototype.getMoreData(this,that);
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
TableTools.prototype.initExport = function(that){
	var $table = $("#" + that.tableDivId);
	$table.find(".pbt_btn").click(function(){
		//默认导出的名称为sheet，后期可拓展成根据功能名称或表单标题显示导出名称
		exportExcelUtil.exportBySql("sheet"+"_:_" + that.condition.sql,"sheet"+"-"
				+Math.round((Math.random() * 100000)));
	});	
};

//动态生成表头
TableTools.prototype.createThead = function(theadName){
	var columns = theadName.split(",");
	var tableHead="";
	var xh = "序号";
	var tr = "";
	var tds ="";
	var td = '<td class="nr_paixu" sortColumn="';//'<td class="nr_paixu" sortColumn="">';
//	var div = '<div style=" float: left;  display:inline;">';
	var div = '<div style=" vertical-align: super;  display:inline;">';
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
TableTools.prototype.createTable = function(that){
	var table = "";
	//<table id="tableList" class="table table-bordered" style=" table-layout: fixed; width: 100%; word-wrap: break-word;" width="100%" cellpadding="0" cellspacing="0" border="0">
	var tableStr = '<table id="'+that.currentTableId+'"  class="table table-bordered">';	
	var thead = TableTools.prototype.createThead(that.thead);
	table = tableStr+'<thead>'+thead+'</thead>'+'<tbody>'+'</tbody>'+'</table>';
//	console.log(table);
	that.table = table;
	return table;
	}
//动态生成table 参数tableId为表单的唯一ID,参数theadName为表头名称
TableTools.prototype.createTableDiv = function(that){
	var tableDiv = "";
	var divStr = '<div class="pcbox_nr" style=" display: block; background: rgb(255, 255, 255);"><div class="tbli" ><div class="ptb">';	
	var table = TableTools.prototype.createTable(that);
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
TableTools.prototype.createSortColumns = function(tableId,columns,defaultColumn){
	var $table = $("#" + tableId);
	for(var i=0;i<columns.length;i++){
		if(defaultColumn.toLowerCase() == columns[i].toLowerCase()){
			$table.find("td[sortColumn='"+i+"']").attr("class","nr_paixu down");
		}
		$table.find("td[sortColumn='"+i+"']").attr("sortColumn",columns[i]);
	}
}

TableTools.prototype.init = function(that){
	var $table = $("#" + that.currentTableId);
	that.loading = $table.parent().siblings().find("div[class^=pmore_]").hide();//隐藏分页组件
	TableTools.prototype.initSort(that);//排序初始化
	TableTools.prototype.initExport(that);//导出
	$table.find(".nr_paixu").click(function(){
		var _self = $(this);
		_self.addClass("down").siblings().removeClass("down");
	});
};
}
