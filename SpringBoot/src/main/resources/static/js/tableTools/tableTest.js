var tableTest = {};

tableTest.load = function(){
	var tableSql = $("#tableTestSql").val();
	var tableDivId = "tableTestDiv";
	var tableId = "tableTest123";
	var tableTools = new TableToolsNew();
	var tableSqlArr = tableSql.split("&");
	var list1 = [];
	if(parseInt(tableSqlArr[0])==3){
//		list1 =  ["badCellAnalysis_m03_cellinfo","START_DAY:20170220","END_DAY:20170307","NETWORK:4","ENODEBID:856530","CELLID:51"];
		list1 = ["front_perf_test_01","N_factor:2"];
	}else{
//		list1 =  ["badCellAnalysis_cellinfo","START_DAY:20170220","END_DAY:20170307","NETWORK:4","ENODEBID:515033","CELLID:49"];
		list1 = ["front_perf_test_01","N_factor:2"];
	}
	
	tableTools.submit(tableDivId,tableId,list1,tableSql);
};

tableTest.load2 = function(){
	var tableSql = $("#tableTestSql2").val();
	var tableDivId = "tableTestDiv2";
	var tableId = "tableTest12345";
	var tableTools = new TableTools();
	tableTools.submit(tableDivId,tableId,tableSql);
}