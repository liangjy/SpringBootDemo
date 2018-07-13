var ChartTool = {};
/**
data: 是返回的数据
select hour
      ,round(sum(TCP_Ack_DL_TOT)/sum(TEST_NUM_ALL),2) as mean_ms--第三次握手时延均值（ms）
      ,round(sum(TCP_Ack_DL_RATIO_TOT)/sum(TEST_NUM_ALL)*100,2) as bad_record_rate--第三次握手时延占比均值（%）

 sql 如上，则 delay_index = 1,perc_index = 2
title: 标题
chart_id ： 绘图的 div 的id
timeGrading： 时间粒度
*/
ChartTool.tradeGraph = function(data,delay_index,perc_index,title,chart_id,timeGrading){
	
	var result = data.result;	
	var tt = title;

	var delay = [];
	var perc = [];
	var xIndex = [];
	for (var i = 0; i < result.length; i++) {
		var arr = result[i];
		
		//根据不同的时间粒度构建 XIndex
		var month = new String(arr[0]);
		var index = Number(month);
//		if(timeGrading == "hour"){
////			var month = new String(arr[0]);
//			index = Number(month);
//		}else {
////			var month = new String(arr[0]);
//			index = Number(month);
//		}
		
		xIndex.push(index);
		delay.push(arr[delay_index]);
		perc.push(arr[perc_index]);
	}

	kqiAna.tradeOption.title.text = tt;
	kqiAna.tradeOption.xAxis[0].data = xIndex;
	kqiAna.tradeOption.series[0].data = perc;
	kqiAna.tradeOption.series[1].data = delay;
	var option = kqiAna.tradeOption;

	kqiAna.paintDomainChart(chart_id,option);
}

/**
data: 是返回的数据
title: 标题
chart_id ： 绘图的 div 的id
*/
ChartTool.distributeGraph = function(data,title,chart_id){
	
	var tt = title;
	
	var res = data.result;
	var seriesData = [];
	var  xIndex = []; 
	for (var i = 0; i < res.length; i++) {
	    var arr = res[i];
	    xIndex.push(arr[0]);
	    seriesData.push(arr[1]);
	}
	//补上分布图缺失值
	var xIndex_tmp = [];
	var seriesData_tmp = [];
	for (var i = 0; i < 4001; i++) {
		xIndex_tmp.push(i);		
	}
	for (var i = 0; i < 4001; i++) {
		seriesData_tmp[i]=0;
	}	
	for (var i = 0; i < xIndex.length; i++) {
		seriesData_tmp[xIndex[i]]=seriesData[i];
	}
	var xIndex = xIndex_tmp;
	var seriesData = seriesData_tmp;


	kqiAna.distriOption.title.text = tt;
	kqiAna.distriOption.xAxis[0].data = xIndex;
	kqiAna.distriOption.series[0].data = seriesData;

	var option = kqiAna.distriOption;
	
	kqiAna.paintDomainChart(chart_id,option);
}



