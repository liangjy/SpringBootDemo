var userAnalysis={};
userAnalysis.data;//数据集
userAnalysis.parent;//界面父节点

//初始化
userAnalysis.init=function(){
	userAnalysis.parent=$("#pc_listb_userAnalysis");
	userAnalysis.parent.find("input[name=win_8_time]").change(function(){
		var num = $(this).attr("num");
		userAnalysis.parent.find(".win_8_time_"+num).show().siblings().hide();
	});
	userAnalysis.parent.find("#submit").click(function(){
		console.log("load userAnalysis");
		//显示进度条
    	$("#win_4_loading").show();
		userAnalysis.load();
	});
	//userAnalysis.parent.find(".tab li:last").hide();
	userAnalysis.parent.find(".tab li:gt(0)").hide();
	userAnalysis.initExport();
	userAnalysis.checkTab();
	
};

/**
 * 初始化文件导出
 */
userAnalysis.initExport = function(){
	
//	tab1
	userAnalysis.parent.find("#exportEcel_userAnalysis_tab1").click(function(){
		art.dialog({
			lock: true,
			  width: '200px',
			  content: document.getElementById('userAnalysis_list_outPrintFile'),
			  okVal: '下载',
			    ok: function () {
			    	var val = $("input[name=userAnalysis_list_printType]:checked").val();
			    	var fileName = "4G APP与DPI 关联分析清单表";
			    	if(val=="2"){
//			    		APP版本分析表
			    		var $table =userAnalysis.parent.find("#tab1_2");
//			    		noce.ajax("pages_app_TopN_exportExcel.action?fileName=topN清单表.csv");
						var content=noceUtil.exportConditionStr(userAnalysis.parent.find(".conditon"))+ userAnalysis.exportStr($table);
						console.log(content);
						        var BB = self.Blob;
						        saveAs(
						              new BB(
						                  ["\ufeff" + content] //\ufeff防止utf8 bom防止中文乱码
						                , {type: "text/plain;charset=utf8"}
						            )
						            , "APP版本分析表.csv"
						        );
			    	}else if(val=="1"){
//			    		APP用户分析表
			    		var $table =userAnalysis.parent.find("#tab1_1");
//			    		noce.ajax("pages_app_TopN_exportExcel.action?fileName=topN清单表.csv");
						//var content=noceUtil.exportConditionStr(userAnalysis.parent.find(".conditon"))+ noceUtil.exportStr($table);
			    		var content=noceUtil.exportConditionStr(userAnalysis.parent.find(".conditon"))+ noceUtil.exportStr($table);
						console.log(content);
						        var BB = self.Blob;
						        saveAs(
						              new BB(
						                  ["\ufeff" + content] //\ufeff防止utf8 bom防止中文乱码
						                , {type: "text/plain;charset=utf8"}
						            )
						            , "APP用户分析表.csv"
						        );
			    		
			    	}
			    },
			    cancel: true
		  });
	});
	
//	tab2
	userAnalysis.parent.find("#exportEcel_userAnalysis_tab2").click(function(){
		var $table =userAnalysis.parent.find("#tab2");
//		noce.ajax("pages_app_TopN_exportExcel.action?fileName=topN清单表.csv");
		var content=noceUtil.exportConditionStr(userAnalysis.parent.find(".conditon"))+ noceUtil.exportStr($table);
		console.log(content);
		        var BB = self.Blob;
		        saveAs(
		              new BB(
		                  ["\ufeff" + content] //\ufeff防止utf8 bom防止中文乱码
		                , {type: "text/plain;charset=utf8"}
		            )
		            , "集团APP数据分析.csv"
		        );
	});
	
//	tab3
	userAnalysis.parent.find("#exportEcel_userAnalysis_tab3").click(function(){
		var $table =userAnalysis.parent.find("#tab3_table");
//		noce.ajax("pages_app_TopN_exportExcel.action?fileName=topN清单表.csv");
		var content=noceUtil.exportConditionStr(userAnalysis.parent.find(".conditon"))+ noceUtil.exportStr($table);
		console.log(content);
		        var BB = self.Blob;
		        saveAs(
		              new BB(
		                  ["\ufeff" + content] //\ufeff防止utf8 bom防止中文乱码
		                , {type: "text/plain;charset=utf8"}
		            )
		            , "APP到达率.csv"
		        );
	});
};

/*
 * 切换tab
 */
userAnalysis.checkTab = function(){
	userAnalysis.parent.find(".tab li").click(function(){
		var idx = $(this).index();
		$(this).addClass("down").siblings().removeClass("down");
		userAnalysis.parent.find(".tabbox .tbli").eq(idx).show().siblings().hide();
	});
};

//获取当月星期5和星期7
userAnalysis.getFridayAndSunday=function(){
	var dayas = new Array();
	var weekDay = userAnalysis.parent.find("#weekStartTime_userAnalysis").val();
	var $selectDay = userAnalysis.parent.find("#startDay_userAnalysis");
	var year = weekDay.split("-")[0];
	var month = weekDay.split("-")[1];
	var date = new Date();
	date.setFullYear(year,month,0);
	var endDate = date.getDate();
	for(var i=1;i<=endDate;i++){
		date.setFullYear(year,month-1,i);
		if(date.getDay()==5||date.getDay()==1){
			dayas.push(addO(i));
		}
	}
	$selectDay.empty();
	var ops = "";
	for(var i=0;i<dayas.length;i++){
		ops=ops+"<option>"+dayas[i]+"</option>";
	}
	$selectDay.append(ops);
	userAnalysis.getSevenDayLater();	
};

//获取7天后的日期
userAnalysis.getSevenDayLater=function(){
	var date = new Date();
	var weekDay = userAnalysis.parent.find("#weekStartTime_userAnalysis").val();
	var $selectDay =  userAnalysis.parent.find("#startDay_userAnalysis");
	var day = userAnalysis.parent.find("#startDay_userAnalysis").val();
	var year = weekDay.split("-")[0];
	var month = weekDay.split("-")[1];
	var date3 = noceUtil.getSevenDayLater(year, month, day);
	console.log(date3);
//	设置结束时间
	userAnalysis.parent.find("#weekEndTime_userAnalysis").html(date3);
//	设置select
	$selectDay.val(day);
	return false;	
};

$(function(){

	userAnalysis.init();

});

//载入页面
userAnalysis.load=function(){
	var $table = userAnalysis.parent;
	var $appReach = $table.find(".tab li:last");
	
	var timeType = $table.find("input[name='win_8_time']:checked").val();//时间粒度
	if($appReach.attr("class")=="down"&&timeType!="quarter"){
		$appReach.hide();
		$table.find(".tab li:first").click();
	}else if(timeType=="quarter"){
		$appReach.hide();
	}else{
		$appReach.hide();
	}
	
	var time="";
	if(timeType=="month"){
		time=$table.find("#monthStartTime_userAnalysis").val();
		timeHtml=time;
	}else if(timeType=="week"){
		var weekStartTime=$table.find("#weekStartTime_userAnalysis").val();
		var startDay=$table.find("#startDay_userAnalysis").val();
		var weekEndTime=$table.find("#weekEndTime_userAnalysis").html();
		time=weekStartTime+"-"+startDay+","+weekEndTime;
		timeHtml=time;
	}else if(timeType=="day"){
		timeTypeHtml="日";
		time=$table.find("#dayStartTime_userAnalysis").val();
		timeHtml=time;
	}else if(timeType=="quarter"){
		//$appReach.show();
		$appReach.hide();
		var timeVal = $table.find("#quarter_userAnalysis").val();
		var y = timeVal.substring(0,4);
		var m = timeVal.substring(5,6);
		m=m>=10?m:"0"+m;
		time = y+m;
	}
	if(time==""||time=="0"||(timeType=="week"&&$table.find("#weekStartTime_userAnalysis").val()=="")){
		alert("请输入日期");
		return false;
	}
	
	var condition = {
			"time":time,
			"timeType":timeType,
			"cityName":cityPermission_common
	};
	userAnalysis.dispalyCondition = {
			'dispalyTime':timeVal||time,
	};
	noce.ajax(
		"pages_userAnalysis_UserAnalysis_getAppTable.action",
		noceUtil.JsonToObject("userAnalysisInputModel",condition),
		function(data){
			userAnalysis.parent.find(".conditon").show();
			noceUtil.displayConditions(userAnalysis.parent,userAnalysis.dispalyCondition);
			console.log(data);//输出sql
			
			var functionlist = [ userAnalysis.callbakTab1_1,
			                     userAnalysis.callbakTab1_2
			       //              userAnalysis.callbakTab2
			                   ];
			var reflectClass = [
			                    "com.gsta.bdi.dh.odi.engine.service.userAnalysis.UserAnalysisServiceImpl:dealDatas",
			                    "com.gsta.bdi.dh.odi.engine.service.userAnalysis.UserAnalysisServiceImpl:dealDatas"
			      //              "com.gsta.bdi.dh.odi.engine.service.userAnalysis.UserAnalysisServiceImpl:dealTab2Datas"
			                    ];
			if(condition.timeType=="quarter"){
				functionlist.push(userAnalysis.callbakTab3);
				reflectClass.push("com.gsta.bdi.dh.odi.engine.service.userAnalysis.UserAnalysisServiceImpl:dealDatas");
			}
			progressbar.submitSql(data,functionlist,reflectClass);
		}
	);

};


userAnalysis.callbakTab1_1=function(result){
	result = result.result;
	var $tbody = userAnalysis.parent.find("#tab1_1").find("tbody");
	var tr="";
	var tbody ="";
//	重绘数据	
	for(var i = 0;i<result.length;i++){
		var hResult = result[i];
		tr = "<tr>";
		for(var j = 0;j<hResult.length;j++){
			tr = tr+'<td class="number">'+hResult[j]+'</td>';
		}
		tr = tr+"</tr>";
		tbody = tbody+tr;
	}
	$tbody.empty().append(tbody);
};

userAnalysis.callbakTab1_2=function(result){
	result = result.result;
	console.log(result);
	var $tbody = userAnalysis.parent.find("#tab1_2").find("tbody");
	var tr="";
	var tbody ="";
	var trH1 = "";
	var trH2 = "";
//	重绘数据	
	var dataLength = 12; //页面的列数
	for(var i = 0;i<result.length;i++){
		var hResult = result[i]; 
		//拿到某一行数据,要将数据分成四组，1和2对应， 3和4对应
		
		
		var length = (hResult.length-5)/4+1;
		
		
		tr = "<tr><td rowspan='2'>"+hResult[0]+"</td>";  //地势
		trH1 = '<td>活跃用户/累积用户</td>';
		trH2 = '</tr><tr><td>测试量/累积量</td>';
		
		
		for (var j = 2;j<=dataLength;j++){
			trH1+= '<td class="number" style="text-align :left; ">'+hResult[j]+"/"+hResult[j+dataLength]+'</td>';
			trH2+= '<td class="number" style="text-align :left; ">'+hResult[j+dataLength*2]+"/"+hResult[j+dataLength*3]+'</td>';
		}
		tr += trH1+trH2;
		tr = tr+"</tr>";
		tbody = tbody+tr;
	}
	$tbody.empty();
	$tbody.append(tbody);
};

userAnalysis.callbakTab2=function(result){
	result = result.result;
	var $tbody = userAnalysis.parent.find("#tab2").find("tbody");
	var tr="";
	var tbody ="";
	var total = ["广东",0,0,0,0,0,0,"广东",0,0,0,0,0,0];
//	重绘数据	
	for(var i = 0;i<result.length;i++){
		var hResult = result[i];
		for(var j = 0;j<hResult.length;j++){
			if(j!=0&&j!=7){
				total[j] = total[j]+hResult[j];
			}
		}
		
		tr = "<tr>";
		var length = (hResult.length)/2;
		for(var j = 0;j<length;j++){
			if(j==1) continue;
			tr = tr+'<td class="number">'+hResult[j]+'</td>';
			if(j==2||j==3||j==4){
				tr = tr+'<td class="number">'+(hResult[j]-hResult[j+7])+'</td>';
				
			}
		}
		tr = tr+"</tr>";
		tbody = tbody+tr;
	}
	var totalStr = '<tr>';
		for(var j = 0;j<length;j++){
			if(j==1) continue;
			totalStr = totalStr+'<td class="number">'+total[j]+'</td>';
			if(j==2||j==3||j==4){
				totalStr = totalStr+'<td class="number">'+(total[j]-total[j+7])+'</td>';
			}
		}
	totalStr+="</tr>"
		if("全省"==cityPermission_common){
			$tbody.empty().append(totalStr+tbody);
		}else{
			$tbody.empty().append(tbody);
		}
}

//重绘tab3_table
userAnalysis.callbakTab3=function(result){
	result = result.result;
	var xDate = new Array();//x坐标
	var yDate = new Array(); //y坐标
	var $tbody = userAnalysis.parent.find("#tab3_table").find("tbody");
	var tr="";
	var tbody ="";
	var total = ["广东",0,0];
//	重绘数据	
	for(var i = 0;i<result.length;i++){
		var hResult = result[i];
		
		xDate.push(hResult[0])
		yDate.push(Number(noceUtil.numToPrecent(hResult[1]*10,hResult[2])));
		
		for(var j = 1;j<hResult.length;j++){
				total[j] = total[j]+hResult[j];
		}
		
		tr = "<tr>";
		for(var j = 0;j<hResult.length;j++){
			tr = tr+'<td class="number">'+hResult[j]+'</td>';
		}
		tr = tr+'<td class="number">'+noceUtil.numToPrecent(hResult[1]*10,hResult[2])+'</td></tr>';
		tbody = tbody+tr;
	}
	var totalStr = '<tr>';
	for(var j = 0;j<total.length;j++){
		totalStr = totalStr+'<td class="number">'+total[j]+'</td>';
	}
	totalStr+='<td class="number">'+noceUtil.numToPrecent(total[1]*10,total[2])+'</td></tr>';
	
	if(cityPermission_common=="全省"){
		tbody=	totalStr+tbody;
		
		xDate.unshift("广东");
		yDate.unshift(Number(noceUtil.numToPrecent(total[1]*10,total[2])));
	}
	$tbody.empty().append(tbody);
	
	userAnalysis.raphelBar('tab3_bar','APP到达率',xDate,yDate);
};

//重绘柱状图
userAnalysis.raphelBar = function(id,title,xArray,yDates){
	$('#'+id)
	.highcharts(
			{
				chart : {
					type : 'column',
				},
				 credits: {
			            enabled: false
			        },
				title : {
					text : title,
				},
				xAxis : {
					categories : xArray,
					crosshair : true
				},
				yAxis : {
					min : 0,
					max : 15,
					labels : {
						style : {
							"color" : "#57BFF8",
							"fontWeight" : "bold"
						}
					},
					title : {
						text : '单位‰',
						style : {
							"color" : "#707070",
							"fontWeight" : "bold"
						}

					},
					lineWidth : 1,
					gridLineColor : "#57BFF8",// 网格线颜色
					gridLineWidth : 0,// 网格线宽度
					floor : 0,// Y轴最小坐标
					tickWidth : 1,// 刻度宽度
					/* 插入导航线 */
					plotLines : [ {

						label : {
							text : "12",
							align : "left",
							style : {
								color : "#6CFF49",
								fontWeight: 'bold',
							},
							x : 10,
							y : -3,
						},
						value : 12,
						width : 2,
						dashStyle : "Solid",
						color : "#6CFF49"
					}, {

						label : {
							text : "3",
							align : "left",
							style : {
								color : "#E20B08",
								fontWeight: 'bold'
							},
							x : 10,
							y : -3,
						},
						value : 3,
						width : 2,
						dashStyle : "Solid",
						color : "#E20B08"
					} ]
					
				},
				tooltip : {
					headerFormat : '<span id="barAreaName" style="font-size:10px">{point.key}</span><table>',
					pointFormat : '<tr><td style="color:{series.color};padding:0">{series.name}: </td>'
							+ '<td style="padding:0"><b>{point.y}</b></td></tr>',
					footerFormat : '</table>',
					shared : true,
					useHTML : true,
					valueDecimals:3
				},
				series : [ {
					name : '到达率(‰)',
					data : yDates
				} ]
			});
};	


//普通table数据转成cvs格式
userAnalysis.exportStr = function(obj){
	var content = "";
	var $table = $(obj);
	var $thead = $table.find("thead");
	var $tbody = $table.find("tbody");
	var $trs =$tbody.find("tr") ;
	var $tds = $thead.find("td");
	var tr,td;
	tr="";
	$tds.each(function (index, domEle) {
		if($(domEle).css("display") != "none"){
			
			if (typeof($(domEle).attr('colspan')) == 'undefined' || $(domEle).attr('colspan') == 2 ) {
				var text = $(domEle).html();
				var colspan = $(domEle).attr('colspan');
				if(text.indexOf("<")>-1){
					text = text.substring(0,text.indexOf("<"));
				}
				
		 		if(tr==""){
		 			//tr = text + "\n";
		 			tr = text;
		 		}else{	
		 			tr = tr+","+text;
		 		}
		 		if(colspan > 1){
		 			for(var x = 1; x < colspan; x++){
		 				tr = tr+ ",";
		 			}					
		 		}
			}
		}
	 });
	content = tr;
	$trs.each(function (index, domEle) {
		$tds = $(domEle).find("td");
		tr="";
		if(index%2==1){
			tr=",";
		}
		$tds.each(function (index, domEle) { 
			if(tr==""){
				tr = $(domEle).text();
			}else if(tr==","){
				tr = tr+$(domEle).text();
			}else{
				tr = tr+","+$(domEle).text();
			}
			
		 });
		content = content+"\n"+tr;
	 });
	return content;
};
