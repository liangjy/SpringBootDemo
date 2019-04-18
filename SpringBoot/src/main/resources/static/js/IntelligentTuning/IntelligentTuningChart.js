/*这个js只做一些页面元素的点击或者显示隐藏的操作，这个js主要是由艳萍操作*/
var IntelligentTuningChart = {};
IntelligentTuningChart.chartRate1 = null;//弱覆盖占比图表对象
IntelligentTuningChart.chartRate2 = null;//过覆盖占比图表对象
IntelligentTuningChart.chartRate3 = null;//重叠覆盖占比图表对象
IntelligentTuningChart.chartMOD3 = null; //MOD3干扰占比图表对象
IntelligentTuningChart.chartRate5 = null;//坐标勘误图表对象
IntelligentTuningChart.chartRate6 = null;//方位角勘误图表对象
IntelligentTuningChart.areaCount1 = null;//区域统计300米内图表对象
IntelligentTuningChart.areaCount2 = null;//区域统计500米内图表对象
IntelligentTuningChart.areaCount3 = null;//区域统计1公里图表对象
IntelligentTuningChart.areaCount4 = null;//区域统计3公里图表对象
IntelligentTuningChart.stationSpacing1 = null;//覆盖率图表对象
IntelligentTuningChart.stationSpacing2 = null;//速率图表对象
IntelligentTuningChart.stationSpacing3 = null;//AGPS-MR数量图表对象
IntelligentTuningChart.pci = null;//计算MOD3干扰占比图表虚实线的值
IntelligentTuningChart.ymd = null;//图表中的竖线所代表的年月日
IntelligentTuningChart.md = null;//图表中的竖线所代表的月日
IntelligentTuningChart.dayArr = null;//图表中x轴的日期列表
$(function () {
	
    $(".chartTitle li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var nodeId = $(this).attr("id");
        IntelligentTuningChart.chartTitleClick(nodeId);
    });
    
    $(".tabInfoTitle li").click(function () {
	    $(this).addClass("active").siblings().removeClass("active");
	    var nodeId = $(this).attr("id");
	    var jsonObj = {"pianzhuanjiaodu":"deviationDistance2","fangxiangjiaokanwu":"gaugeChart01","pianlijuli":"deviationDistance1","zuobiaokanwu":"chartRate5","xiaqingjiaodu":"deviationDistance3",
	    	"xiaqingjiaokanwu":"gaugeChart02","300mi":"areaCount1","500mi":"areaCount2","1000mi":"areaCount3","3000mi":"areaCount4","wentiquyu":"areaCount5","fugailv":"stationSpacing1",
	    	"sulv":"stationSpacing2","agpsMRshuliang":"stationSpacing3","residentUserNum":"residentUserNumChart","flowStatistics":"flowStatisticsChart"}; 
	    
	    var divId = jsonObj[nodeId];
	    $("#"+divId).show().siblings(".chartDiv").hide();
	    IntelligentTuningChart.resizeTabInfoTitle(nodeId);
	});

    $(".tabInfoTitle5 li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(".tabInfoTitle5 li").index($(this));
        $(this).parent().siblings().children().eq(index).show().siblings().hide();

        if(index==0){
			IntelligentTuningChart.deviationDistance1.resize();
		}else {
            IntelligentTuningChart.chartRate5.resize();
		}
    });
    $(".tabInfoTitle6 li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(".tabInfoTitle6 li").index($(this));
        $(this).parent().siblings().children(".chartInfo").eq(index).show().siblings().hide();

        if(index==0){
            IntelligentTuningChart.deviationDistance2.resize();
        }else {
            IntelligentTuningChart.chartGauge1.resize();
            IntelligentTuningChart.chartGauge2.resize();
            IntelligentTuningChart.chartGauge3.resize();
            IntelligentTuningChart.chartGauge4.resize();
            IntelligentTuningChart.chartGauge5.resize();
        }
    });
    $(".tabInfoTitle7 li").click(function () {
    	$(this).addClass("active").siblings().removeClass("active");
    	var index = $(".tabInfoTitle7 li").index($(this));
    	$(this).parent().siblings().children(".chartInfo").eq(index).show().siblings().hide();
    	
    	if(index==0){
    		IntelligentTuningChart.deviationDistance3.resize();
    	}else {
        	IntelligentTuningChart.chartDistance1.resize();
        	IntelligentTuningChart.chartDistance2.resize();
        	IntelligentTuningChart.chartDistance3.resize();
        	IntelligentTuningChart.chartDistance4.resize();
        	IntelligentTuningChart.chartDistance5.resize();
    	}
    });

    $(window).resize(function(){
    	IntelligentTuningChart.resizeChart();
    });
    
    $('#date-range1').dateRangePicker({
        format: 'YYYY-MM-DD',
        separator: ' - ',
        language: 'auto',
        minDays: 7,
    	maxDays: 31,
        autoClose: false,
        showShortcuts: false,
        getValue: function()
        {
            return this.innerHTML;
        },
        setValue: function(s)
        {
            this.innerHTML = s;
        }
    }).bind('datepicker-apply',function(event,obj){
    	IntelligentTuningChart.dateRange1 = obj.value;
    	IntelligentTuningChart.dateRange2 = null;
    	if(!isUndefined(IntelligentTuningChart.dateRange1) && IntelligentTuningChart.dateRange1.indexOf("Invalid date") == -1){
    		var arr = IntelligentTuningChart.dateRange1.split("-");
    		var startTime = $.trim(arr[0])+$.trim(arr[1])+$.trim(arr[2]);
    		var endTime = $.trim(arr[3])+$.trim(arr[4])+$.trim(arr[5]);
    		getBetweenDateStr(startTime,endTime);
//    		IntelligentTuningChart.AntAdj_07_GetErrorSign(IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId);//获取小区问题状态变迁的问题标识
    		IntelligentTuningChart.AntAdj_09_GetPoorRateTrendData(IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId,startTime,endTime);//获取弱覆盖占比的图表数据
    		IntelligentTuningChart.AntAdj_05_GetTrendData(IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId,startTime,endTime);//获取过覆盖占比、重叠覆盖占比、方位角勘误、区域统计覆盖率、速率、站间距覆盖率、站间距速率、站间距AGPS-MR数量的图表数据
    		IntelligentTuningChart.AntAdj_06_GetMOD3TrendData(IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId,startTime,endTime);//获取MOD3干扰的占比数据
    		IntelligentTuningChart.AntAdj_08_GetDistanceTrendData(IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId,endTime);//获取坐标勘误的图表数据
    		IntelligentTuningChart.AntAdj_10_GetFeederLineData(IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId,endTime);//获取方向角勘误的图表数据
    	}
    });
    $('#date-range2').dateRangePicker({
        format: 'YYYY-MM-DD',
        separator: ' - ',
        language: 'auto',
        minDays: 7,
    	maxDays: 31,
        autoClose: false,
        showShortcuts: false,
        getValue: function()
        {
            return this.innerHTML;
        },
        setValue: function(s)
        {
            this.innerHTML = s;
        }
    }).bind('datepicker-apply',function(event,obj){
    	IntelligentTuningChart.dateRange1 = null; 
    	IntelligentTuningChart.dateRange2 = obj.value;
    	if(!isUndefined(IntelligentTuningChart.dateRange2) && IntelligentTuningChart.dateRange2.indexOf("Invalid date") == -1){
    		var arr = IntelligentTuningChart.dateRange2.split("-");
    		var startTime = $.trim(arr[0])+$.trim(arr[1])+$.trim(arr[2]);
    		var endTime = $.trim(arr[3])+$.trim(arr[4])+$.trim(arr[5]);
    		getBetweenDateStr(startTime,endTime);
    		IntelligentTuningChart.AntAdj_05_GetTrendData(IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId,startTime,endTime);//获取过覆盖占比、重叠覆盖占比、方位角勘误、区域统计覆盖率、速率、站间距覆盖率、站间距速率、站间距AGPS-MR数量的图表数据
    	}
    });
    $('#date-range3').dateRangePicker({
        format: 'YYYY-MM-DD',
        separator: ' - ',
        language: 'auto',
        minDays: 7,
        maxDays: 31,
        autoClose: false,
        showShortcuts: false,
        getValue: function()
        {
            return this.innerHTML;
        },
        setValue: function(s)
        {
            this.innerHTML = s;
        }
    }).bind('datepicker-apply',function(event,obj){
        IntelligentTuningChart.dateRange3 = obj.value;
        if(!isUndefined(IntelligentTuningChart.dateRange3) && IntelligentTuningChart.dateRange3.indexOf("Invalid date") == -1){
            var arr = IntelligentTuningChart.dateRange3.split("-");
            var startTime = $.trim(arr[0])+$.trim(arr[1])+$.trim(arr[2]);
            if(arr[3]==' Invalid date'){
    			return;
    		}
            var endTime = $.trim(arr[3])+$.trim(arr[4])+$.trim(arr[5]);
            //日期不合规定
            if(startTime=='19700101'&&endTime=='19700101'){
    			return;
    		}
    		var cellObj={enodeb_id:IntelligentTuningChart.enodebId,cell_id:IntelligentTuningChart.cellId};
            IntelligentTuningPlan.getCellRefer(cellObj,startTime,endTime);
        }
    });
    $('#date-range4').dateRangePicker({
        format: 'YYYY-MM-DD',
        separator: ' - ',
        language: 'auto',
        minDays: 2,
        maxDays: 14,
        autoClose: false,
        showShortcuts: false,
        getValue: function()
        {
            return this.innerHTML;
        },
        setValue: function(s)
        {
            this.innerHTML = s;
        }
    }).bind('datepicker-apply',function(event,obj){
		badCellAnalysis.searchZCAnalysis(obj.date1.format('yyyy-MM-dd'),obj.date2.format('yyyy-MM-dd'),IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId);

	});
    $('#date-range5').dateRangePicker({
        format: 'YYYY-MM-DD',
        separator: ' - ',
        language: 'auto',
        minDays: 7,
        maxDays: 31,
        autoClose: false,
        showShortcuts: false,
        getValue: function()
        {
            return this.innerHTML;
        },
        setValue: function(s)
        {
            this.innerHTML = s;
        }
    }).bind('datepicker-apply',function(event,obj){
        IntelligentTuningChart.dateRange5 = obj.value;
        if(!isUndefined(IntelligentTuningChart.dateRange5) && IntelligentTuningChart.dateRange5.indexOf("Invalid date") == -1){
            var arr = IntelligentTuningChart.dateRange5.split("-");
            var startTime = $.trim(arr[0])+$.trim(arr[1])+$.trim(arr[2]);
            if(arr[3]==' Invalid date'){
    			return;
    		}
            var endTime = $.trim(arr[3])+$.trim(arr[4])+$.trim(arr[5]);
            //日期不合规定
            if(startTime=='19700101'&&endTime=='19700101'){
    			return;
    		}
        	IntelligentTuningChart.AntAdj_residentUserNum(IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId,startTime,endTime);//常驻用户
        	IntelligentTuningChart.AntAdj_flowStatistics(IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId,startTime,endTime);//流量统计
        }
    });
});

/**
 * ********************************
 * @funcname IntelligentTuningChart.resizeChart
 * @funcdesc 刷新图表
 * @param 
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.resizeChart = function IntelligentTuningChart_resizeChart(){
	IntelligentTuningChart.chartRate1.resize();
	IntelligentTuningChart.chartRate2.resize();
	IntelligentTuningChart.chartRate3.resize();
	IntelligentTuningChart.chartMOD3.resize();
	IntelligentTuningChart.chartRate5.resize();
//	IntelligentTuningChart.chartRate6.resize();
	IntelligentTuningChart.areaCount1.resize();
	IntelligentTuningChart.areaCount2.resize();
	IntelligentTuningChart.areaCount3.resize();
	IntelligentTuningChart.areaCount4.resize();
	IntelligentTuningChart.areaCount5.resize();
	IntelligentTuningChart.stationSpacing1.resize();
	IntelligentTuningChart.stationSpacing2.resize();
	IntelligentTuningChart.stationSpacing3.resize();
	
	IntelligentTuningChart.deviationDistance3.resize();
	IntelligentTuningChart.chartDistance1.resize();
	IntelligentTuningChart.chartDistance2.resize();
	IntelligentTuningChart.chartDistance3.resize();
	IntelligentTuningChart.chartDistance4.resize();
	IntelligentTuningChart.chartDistance5.resize();

    IntelligentTuningChart.deviationDistance1.resize();
    IntelligentTuningChart.deviationDistance2.resize();
    IntelligentTuningChart.chartGauge1.resize();
    IntelligentTuningChart.chartGauge2.resize();
    IntelligentTuningChart.chartGauge3.resize();
    IntelligentTuningChart.chartGauge4.resize();
    IntelligentTuningChart.chartGauge5.resize();
    
    IntelligentTuningChart.residentUserNumChart.resize();
	IntelligentTuningChart.flowStatisticsChart.resize();
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.chartTitleClick
 * @funcdesc 根据ID控制小区问题状态变迁图表的显示隐藏
 * @param {String} nodeId : 需要显示图表模块的ID
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.chartTitleClick = function IntelligentTuningChart_chartTitleClick(nodeId){
	var id = "antennaInversionChart";
	
	if(nodeId == "feederLineLogoLeft" || nodeId == "boneLogo"){
		id = "antennaInversionChart";
		
	}else if(nodeId == "macSectorLogoLeft" || nodeId == "macSectorLogo2"){
		id = "coordinateChart";
		
	}else if(nodeId == "cbSectorLogoLeft" || nodeId == "cbPoorAreaLogo"){
		id = "chartRate2";
		
	}else if(nodeId == "dipAngleLogoLeft" || nodeId == "declinationDisparity"){
		id = "declinationDisparityChart";
		
	}else if(nodeId == "poorCoverSectorLogoLeft" || nodeId == "poorAreaCovRateLogo"){
		id = "chartRate1";
		
	}else if(nodeId == "olSectorLogoLeft" || nodeId == "olPoorAreaLogo"){
		id = "chartRate3";
		
	}else if(nodeId == "m3SectorLogoLeft" || nodeId == "m3PoorAreaLogo"){
		id = "chartRate4";
	}
	
    $(".chartWrap").find("#"+id).show().siblings().hide();
    IntelligentTuningChart.resizeChartTitle(id);
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.resizeChartTitle
 * @funcdesc 根据模块的位置刷新相关小区问题状态变迁的图表
 * @param {string} nodeId : 需要刷新图表模块的ID
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.resizeChartTitle = function IntelligentTuningChart_resizeChartTitle(nodeId){
	if(nodeId == "chartRate1" && !isUndefined(IntelligentTuningChart.chartRate1)){//弱覆盖占比
		IntelligentTuningChart.chartRate1.resize();
		
	}else if(nodeId == "chartRate2" && !isUndefined(IntelligentTuningChart.chartRate2)){//过覆盖占比
		IntelligentTuningChart.chartRate2.resize();
		
	}else if(nodeId == "chartRate3" && !isUndefined(IntelligentTuningChart.chartRate3)){//重叠覆盖占比
		IntelligentTuningChart.chartRate3.resize();
		
	}else if(nodeId == "chartRate4" && !isUndefined(IntelligentTuningChart.chartMOD3)){//干扰占比
		IntelligentTuningChart.chartMOD3.resize();
		
	}else if(nodeId == "declinationDisparityChart" && !isUndefined(IntelligentTuningChart.chartMOD3)){//下倾角勘误
		$("#deviationDistance3").show().siblings().hide();
		$("#xiaqingjiaodu").addClass("active").siblings().removeClass("active");
		IntelligentTuningChart.deviationDistance3.resize();//下倾角度
		
	}else if(nodeId == "coordinateChart" && !isUndefined(IntelligentTuningChart.deviationDistance1)){//坐标勘误
		$("#deviationDistance1").show().siblings().hide();
		$("#pianlijuli").addClass("active").siblings().removeClass("active");
		IntelligentTuningChart.deviationDistance1.resize();//偏离距离
		
	}else if(nodeId == "antennaInversionChart" && !isUndefined(IntelligentTuningChart.deviationDistance2)){//方位角勘误
		$("#deviationDistance2").show().siblings().hide();
		$("#pianzhuanjiaodu").addClass("active").siblings().removeClass("active");
		IntelligentTuningChart.deviationDistance2.resize();//偏转角度
	}
};


/**
 * ********************************
 * @funcname IntelligentTuningChart.resizeTabInfoTitle
 * @funcdesc 根据模块的位置刷新相关区间统计和站间距列表的图表
 * @param {string} nodeId : 需要刷新图表模块的id
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.resizeTabInfoTitle = function IntelligentTuningChart_resizeTabInfoTitle(nodeId){
	if(nodeId == "pianlijuli" && !isUndefined(IntelligentTuningChart.deviationDistance1)){//偏离距离
		IntelligentTuningChart.deviationDistance1.resize();
	}else if(nodeId == "zuobiaokanwu" && !isUndefined(IntelligentTuningChart.chartRate5)){//坐标勘误
		IntelligentTuningChart.chartRate5.resize();
	}else if(nodeId == "pianzhuanjiaodu" && !isUndefined(IntelligentTuningChart.deviationDistance2)){//偏转角度
		IntelligentTuningChart.deviationDistance2.resize();
	}else if(nodeId == "fangxiangjiaokanwu" && !isUndefined(IntelligentTuningChart.chartGauge1)){//方位角勘误
		IntelligentTuningChart.chartGauge1.resize();
		IntelligentTuningChart.chartGauge2.resize();
		IntelligentTuningChart.chartGauge3.resize();
		IntelligentTuningChart.chartGauge4.resize();
		IntelligentTuningChart.chartGauge5.resize();
	}else if(nodeId == "xiaqingjiaodu" && !isUndefined(IntelligentTuningChart.deviationDistance3)){//下倾角度
		IntelligentTuningChart.deviationDistance3.resize();
	}else if(nodeId == "xiaqingjiaokanwu" && !isUndefined(IntelligentTuningChart.chartGauge1)){//下倾角勘误
    	IntelligentTuningChart.chartDistance1.resize();
    	IntelligentTuningChart.chartDistance2.resize();
    	IntelligentTuningChart.chartDistance3.resize();
    	IntelligentTuningChart.chartDistance4.resize();
    	IntelligentTuningChart.chartDistance5.resize();
	}else if(nodeId == "300mi" && !isUndefined(IntelligentTuningChart.areaCount1)){//300米内
		IntelligentTuningChart.areaCount1.resize();
	}else if(nodeId == "500mi" && !isUndefined(IntelligentTuningChart.areaCount2)){//500米内
		IntelligentTuningChart.areaCount2.resize();
	}else if(nodeId == "1000mi" && !isUndefined(IntelligentTuningChart.areaCount3)){//1公里内
		IntelligentTuningChart.areaCount3.resize();
	}else if(nodeId == "3000mi" && !isUndefined(IntelligentTuningChart.areaCount4)){//3公里内
		IntelligentTuningChart.areaCount4.resize();
	}else if(nodeId == "wentiquyu" && !isUndefined(IntelligentTuningChart.areaCount5)){//问题区域
		IntelligentTuningChart.areaCount5.resize();
	}else if(nodeId == "fugailv" && !isUndefined(IntelligentTuningChart.stationSpacing1)){//覆盖率
		IntelligentTuningChart.stationSpacing1.resize();
	}else if(nodeId == "sulv" && !isUndefined(IntelligentTuningChart.stationSpacing2)){//速率
		IntelligentTuningChart.stationSpacing2.resize();
	}else if(nodeId == "agpsMRshuliang" && !isUndefined(IntelligentTuningChart.stationSpacing3)){//AGPS-MR数量
		IntelligentTuningChart.stationSpacing3.resize();
	}else if(nodeId == "residentUserNum" && !isUndefined(IntelligentTuningChart.residentUserNumChart)){//常驻用户
		IntelligentTuningChart.residentUserNumChart.resize();
	}else if(nodeId == "flowStatistics" && !isUndefined(IntelligentTuningChart.flowStatisticsChart)){//流量统计
		IntelligentTuningChart.flowStatisticsChart.resize();
	}
};


/**
 * ********************************
 * @funcname IntelligentTuningChart.fillChart
 * @funcdesc 填充小区问题状态变迁、区间统计、站间距列表的图表
 * @param {Object} item : 参数对象
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.fillChart = function IntelligentTuningChart_fillChart(item,queryTime){
	IntelligentTuningChart.echartsDispose();//销毁echarts对象，避免图表缓存
	if(isUndefined(item)){
		return;
	}
	IntelligentTuningChart.enodebId = item.cell_item.enodeb_id;
	IntelligentTuningChart.cellId = item.cell_item.cell_id;
	IntelligentTuningChart.stationSpacing = item.cell_item.station_spacing;
//	var queryTime = item.oprt_etime;
//	if(isUndefined(item.PCI)){
		IntelligentTuningChart.pci = item.cell_item.pci;
//	}else{
//		IntelligentTuningChart.pci = item.PCI;
//	}
	if(isUndefined(IntelligentTuningChart.enodebId) || isUndefined(IntelligentTuningChart.cellId)){
		return;
	}
	if("yyyy-MM-dd" == queryTime){
		queryTime = "";
	}
	IntelligentTuningChart.day = item.cell_item.day.toString();
	IntelligentTuningChart.latitude = item.cell_item.latitude_mid_baidu;
	IntelligentTuningChart.longitude = item.cell_item.longitude_mid_baidu;
	IntelligentTuningChart.problemName = item.cell_item.problem_name;
	IntelligentTuningChart.queryTime = queryTime;
	IntelligentTuningChart.dateRange1 = null;
	IntelligentTuningChart.dateRange2 = null;
	
	var queryTimeStr;
	if(!isUndefined(queryTime)){
		var lastUpdateTime = $("#lastUpdateTime").text();
		var queryTimeArr = queryTime.split(" ");
		queryTimeStr = queryTimeArr[0].replace(/-/g,"");
	}
	if(isUndefined(queryTime) || queryTimeStr >= lastUpdateTime){
		loadBefore_N_Day(30);
	}else{
		var myDate = IntelligentTuningChart.stringToDate(queryTime);
		var preFifteenDate = new Date(myDate.getTime() - 24*60*60*1000*15); //前十五天
		var afterFourteenDate = new Date(myDate.getTime() + 24*60*60*1000*14); //后十四天
		IntelligentTuningChart.startTime = getDateYYYYMMDD(preFifteenDate);
		IntelligentTuningChart.endTime = getDateYYYYMMDD(afterFourteenDate);
	}
	
	$("#date-range1").text(IntelligentTuningChart.startTime.substring(0,4)+"-"+IntelligentTuningChart.startTime.substring(4,6)+"-"+IntelligentTuningChart.startTime.substring(6,8)+" - "+IntelligentTuningChart.endTime.substring(0,4)+"-"+IntelligentTuningChart.endTime.substring(4,6)+"-"+IntelligentTuningChart.endTime.substring(6,8));
	$("#date-range2").text(IntelligentTuningChart.startTime.substring(0,4)+"-"+IntelligentTuningChart.startTime.substring(4,6)+"-"+IntelligentTuningChart.startTime.substring(6,8)+" - "+IntelligentTuningChart.endTime.substring(0,4)+"-"+IntelligentTuningChart.endTime.substring(4,6)+"-"+IntelligentTuningChart.endTime.substring(6,8));
	$("#date-range5").text(IntelligentTuningChart.startTime.substring(0,4)+"-"+IntelligentTuningChart.startTime.substring(4,6)+"-"+IntelligentTuningChart.startTime.substring(6,8)+" - "+IntelligentTuningChart.endTime.substring(0,4)+"-"+IntelligentTuningChart.endTime.substring(4,6)+"-"+IntelligentTuningChart.endTime.substring(6,8));
	
	getBetweenDateStr(IntelligentTuningChart.startTime,IntelligentTuningChart.endTime);
	IntelligentTuningChart.AntAdj_flowStatistics(IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId,IntelligentTuningChart.startTime,IntelligentTuningChart.endTime);//流量统计
	IntelligentTuningChart.AntAdj_residentUserNum(IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId,IntelligentTuningChart.startTime,IntelligentTuningChart.endTime);//常驻用户
	IntelligentTuningChart.AntAdj_07_GetErrorSign(IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId);//获取小区问题状态变迁的问题标识
	IntelligentTuningChart.AntAdj_09_GetPoorRateTrendData(IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId,IntelligentTuningChart.startTime,IntelligentTuningChart.endTime);//获取弱覆盖占比的图表数据
	IntelligentTuningChart.AntAdj_05_GetTrendData(IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId,IntelligentTuningChart.startTime,IntelligentTuningChart.endTime);//获取过覆盖占比、重叠覆盖占比、区域统计覆盖率、速率、站间距覆盖率、站间距速率、站间距AGPS-MR数量的图表数据
	IntelligentTuningChart.AntAdj_06_GetMOD3TrendData(IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId,IntelligentTuningChart.startTime,IntelligentTuningChart.endTime);//获取MOD3干扰的占比数据
	IntelligentTuningChart.AntAdj_08_GetDistanceTrendData(IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId,null);//获取坐标勘误的图表数据
	IntelligentTuningChart.AntAdj_10_GetFeederLineData(IntelligentTuningChart.enodebId,IntelligentTuningChart.cellId,null);//获取方向角勘误的图表数据
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.AntAdj_residentUserNum
 * @funcdesc 获取智能调优常驻用户
 * @param {int} enodebId : 基站ID
 * @param {int} cellId : 小区ID
 * @param {String} endTime : 结束日期
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.AntAdj_residentUserNum = function IntelligentTuningChart_AntAdj_residentUserNum(enodebId,cellId,startTime,endTime){
	var list = ["AntAdj_residentUserNum","STARTDAY:"+startTime,"ENDDAY:"+endTime,"BASE_STATN_ID:"+enodebId,"CELL_SECTOR_ID:"+cellId];
	var sqlList = [list];
	var functionList = [IntelligentTuningChart.setResidentUserNum];
	var database = [3];
	progressbarTwo.submitSql(sqlList,functionList,database,null,null,null,null,true);
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.setResidentUserNum
 * @funcdesc 设置智能调优常驻用户
 * @param {Object} data :  查询返回的结果
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.setResidentUserNum = function IntelligentTuningChart_setResidentUserNum(data){
	console.log("智能调优常驻用户");
	console.log(data);
	var result = callBackChangeData(data);
	//["2019/4/01","2019/4/02","2019/4/03","2019/4/04","2019/4/05","2019/4/06","2019/4/07"]
	if(result.length > 0){
		var dayArr = [],seriesDataArr1 = [],seriesDataArr2 = [],seriesDataArr3 = [];
		for(var i = 0; i < result.length; i++){
			var obj = result[i];
			var day = obj.day;
			var city = obj.city;
			var othercity = obj.othercity;
			var otherprovince = obj.otherprovince;
			
			dayArr.push(day);
			seriesDataArr1.push(city);
			seriesDataArr2.push(othercity);
			seriesDataArr3.push(otherprovince);
		}
		IntelligentTuningChart.initUserStatisticsChart("user",dayArr,seriesDataArr1,seriesDataArr2,seriesDataArr3);
	}
};


/**
 * ********************************
 * @funcname IntelligentTuningChart.AntAdj_flowStatistics
 * @funcdesc 获取智能调优流量统计
 * @param {int} enodebId : 基站ID
 * @param {int} cellId : 小区ID
 * @param {String} endTime : 结束日期
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.AntAdj_flowStatistics = function IntelligentTuningChart_AntAdj_flowStatistics(enodebId,cellId,startTime,endTime){
	var list = ["AntAdj_flowStatistics","STARTDAY:"+startTime,"ENDDAY:"+endTime,"ENODEB_ID:"+enodebId,"CELL_ID:"+cellId];
	var sqlList = [list];
	var functionList = [IntelligentTuningChart.setFlowStatistics];
	var database = [3];
	progressbarTwo.submitSql(sqlList,functionList,database,null,null,null,null,true);
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.setFlowStatistics
 * @funcdesc 设置智能调优流量统计
 * @param {Object} data :  查询返回的结果
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.setFlowStatistics = function IntelligentTuningChart_setFlowStatistics(data){
	console.log("智能调优流量统计");
	console.log(data);
	var result = callBackChangeData(data);
	if(result.length > 0){
		var dayArr = [],seriesDataArr1 = [],seriesDataArr2 = [],seriesDataArr3 = [];
		for(var i = 0; i < result.length; i++){
			var obj = result[i];
			var day = obj.day;
			var city = obj.city;
			var othercity = obj.othercity;
			var otherprovince = obj.otherprovince;
			
			dayArr.push(day);
			seriesDataArr1.push(noceUtil.fixL2(city/1024/1024));
			seriesDataArr2.push(noceUtil.fixL2(othercity/1024/1024));
			seriesDataArr3.push(noceUtil.fixL2(otherprovince/1024/1024));
		}
		IntelligentTuningChart.initUserStatisticsChart("flow",dayArr,seriesDataArr1,seriesDataArr2,seriesDataArr3);
	}
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.AntAdj_10_GetFeederLineData
 * @funcdesc 获取方向角勘误图表数据
 * @param {int} enodebId : 基站ID
 * @param {int} cellId : 小区ID
 * @param {String} endTime : 结束日期
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.AntAdj_10_GetFeederLineData = function IntelligentTuningChart_AntAdj_10_GetFeederLineData(enodebId,cellId,endTime){

	if(endTime == null){
		loadBefore_N_Day(4);
	}else{
		var year = endTime.substring(0,4);
		var month = endTime.substring(4,6);
		if(!isUndefined(month) && month.indexOf("0") == 0){
			 month = month.substring(1);
		}
		var day =  endTime.substring(6,8);
		var date = new Date(year,month -1,day);
		var startTime = new Date(date.getTime() - 24*60*60*1000*4); //前四天
		IntelligentTuningChart.startTime = getDateYYYYMMDD(startTime);
		IntelligentTuningChart.endTime = endTime;
	}
	var list = ["AntAdj_10_GetFeederLineData","STARTDAY:"+IntelligentTuningChart.startTime,"ENDDAY:"+IntelligentTuningChart.endTime,"ENODEBID:"+enodebId,"CELLID:"+cellId];
	var sqlList = [list];
	var functionList = [IntelligentTuningChart.setFeederLineData];
	var database = [3];
	progressbarTwo.submitSql(sqlList,functionList,database,null,null,null,null,true);
};


/**
 * ********************************
 * @funcname IntelligentTuningChart.setFeederLineData
 * @funcdesc 设置方向角勘误图表的数据
 * @param {Object} data :  查询返回的结果
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.setFeederLineData = function IntelligentTuningChart_setFeederLineData(data){
//	console.log(data);
	var result = callBackChangeData(data);
	if(result.length > 0){
		IntelligentTuningChart.initFeederLineChart(result);
	}
};


/**
 * ********************************
 * @funcname IntelligentTuningChart.AntAdj_07_GetErrorSign
 * @funcdesc 获取小区问题状态变迁的问题标识
 * @param {int} enodebId : 基站ID
 * @param {int} cellId : 小区ID
 * @param {String} startTime : 开始日期
 * @param {String} endTime : 结束日期
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.AntAdj_07_GetErrorSign = function IntelligentTuningChart_AntAdj_07_GetErrorSign(enodebId,cellId){
	var day = $("#lastUpdateTime").text();
	var list = ["AntAdj_07_GetErrorSign","DAY:"+day,"ENODEBID:"+enodebId,"CELLID:"+cellId];
	var sqlList = [list];
	var functionList = [IntelligentTuningChart.setErrorSign];
	var database = [3];
	progressbarTwo.submitSql(sqlList,functionList,database,null,null,null,null,true);
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.setErrorSign
 * @funcdesc 设置小区问题状态变迁的问题标识
 * @param {Object} data :  查询返回的结果
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.setErrorSign = function IntelligentTuningChart_setErrorSign(data){
	$(".redCircle").hide();
	var result = callBackChangeData(data);
	if(result.length > 0){
		var is_exist_poor_area = result[0].is_exist_poor_area; //是否弱覆盖
		var is_cb_cov = result[0].is_cb_cov;                   //是否越区覆盖
		var is_ol_cov = result[0].is_ol_cov;                   //是否重叠覆盖
		var is_m3_cov = result[0].is_m3_cov;                   //是否模三干扰覆盖
		var is_loca_abnor = result[0].is_loca_abnor;           //是否坐标勘误
		var is_ant_conn_abnor = result[0].is_ant_conn_abnor;   //是否天馈接反
		var is_decl_angle_abnor = result[0].is_decl_angle_abnor;   //是否天馈接反
		
		if(is_ant_conn_abnor == 1){
			$(".redCircle").eq(0).show();
		}
		if(is_loca_abnor == 1){
			$(".redCircle").eq(1).show();
		}
		if(is_decl_angle_abnor == 1){
			$(".redCircle").eq(2).show();
		}
		if(is_cb_cov == 1){
			$(".redCircle").eq(3).show();
		}
		if(is_exist_poor_area == 1){
			$(".redCircle").eq(4).show();
		}
		if(is_ol_cov == 1){
			$(".redCircle").eq(5).show();
		}
		if(is_m3_cov == 1){
			$(".redCircle").eq(6).show();
		}
		var nodeId = $(".logoList").find(".active").attr("id");
		if(nodeId == null){
			nodeId = "feederLineLogoLeft";
		}
		var jsonObj = {"feederLineLogoLeft":"boneLogo","macSectorLogoLeft":"macSectorLogo2","cbSectorLogoLeft":"cbPoorAreaLogo","poorCoverSectorLogoLeft":"poorAreaCovRateLogo",
				"olSectorLogoLeft":"olPoorAreaLogo","m3SectorLogoLeft":"m3PoorAreaLogo","dipAngleLogoLeft":"declinationDisparity"};
		$("#"+jsonObj[nodeId]).addClass("active").siblings().removeClass("active");
		
		IntelligentTuningChart.chartTitleClick(nodeId);
		
	}
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.AntAdj_09_GetPoorRateTrendData
 * @funcdesc 获取弱覆盖占比的图表数据
 * @param {int} enodebId : 基站ID
 * @param {int} cellId : 小区ID
 * @param {String} startTime : 开始日期
 * @param {String} endTime : 结束日期
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.AntAdj_09_GetPoorRateTrendData = function IntelligentTuningChart_AntAdj_09_GetPoorRateTrendData(enodebId,cellId,startTime,endTime){
 	var list = ["AntAdj_09_GetPoorRateTrendData","STARTDAY:"+startTime,"ENDDAY:"+endTime,"ENODEBID:"+enodebId,"CELLID:"+cellId];
    var sqlList = [list];
    var functionList = [IntelligentTuningChart.setPoorRateTrendData];
    var database = [3];
    progressbarTwo.submitSql(sqlList,functionList,database,null,null,null,null,true);
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.setPoorRateTrendData
 * @funcdesc 填充弱覆盖占比的图表数据
 * @param {Object} data :  查询返回的结果
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.setPoorRateTrendData = function IntelligentTuningChart_setPoorRateTrendData(data){
	var dateArr = [],poorRateArr = [];
	var result = callBackChangeData(data);
	if(result.length > 0){
		for(var i = 0; i < IntelligentTuningChart.dayArr.length; i++){
			var day = IntelligentTuningChart.dayArr[i];
			var y = day.substring(0,4);
			var m = day.substring(4,6);
			var d = day.substring(6,8);
			if(!isUndefined(m) && m.indexOf("0") == 0){
				m = m.substring(1);
			}
			var poorRate = 0;
			for(var j = 0; j < result.length; j++){
				var resultDay = result[j].day.toString();
				if(resultDay == day){
					poorRate = result[j].poor_rate;
					break;
				}
			}
			dateArr.push(y+"/"+m+"/"+d);
			poorRateArr.push(poorRate == null ? 0 : poorRate);
			
		}
		IntelligentTuningChart.initMRRATChart(dateArr,poorRateArr,"poorAreaCovRate");
	}
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.AntAdj_08_GetDistanceTrendData
 * @funcdesc 获取坐标勘误的图表数据
 * @param {int} enodebId : 基站ID
 * @param {int} cellId : 小区ID
 * @param {String} startTime : 开始日期
 * @param {String} endTime : 结束日期
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.AntAdj_08_GetDistanceTrendData = function IntelligentTuningChart_AntAdj_08_GetDistanceTrendData(enodebId,cellId,endTime){

	if(endTime == null){
		loadBefore_N_Day(6);
	}else{
		var year = endTime.substring(0,4);
		var month = endTime.substring(4,6);
		if(!isUndefined(month) && month.indexOf("0") == 0){
			 month = month.substring(1);
		}
		var day =  endTime.substring(6,8);
		var date = new Date(year,month -1,day);
		var startTime = new Date(date.getTime() - 24*60*60*1000*6); //前六天
		IntelligentTuningChart.startTime = getDateYYYYMMDD(startTime);
		IntelligentTuningChart.endTime = endTime;
	}
	var list = ["AntAdj_08_GetDistanceTrendData","STARTDAY:"+IntelligentTuningChart.startTime,"ENDDAY:"+IntelligentTuningChart.endTime,"ENODEBID:"+enodebId,"CELLID:"+cellId];
	var sqlList = [list];
	var functionList = [IntelligentTuningChart.setDistanceTrendData];
	var database = [3];
	progressbarTwo.submitSql(sqlList,functionList,database,null,null,null,null,true);
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.setDistanceTrendData
 * @funcdesc 填充坐标勘误的图表数据
 * @param {Object} data :  查询返回的结果
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.setDistanceTrendData = function IntelligentTuningChart_setDistanceTrendData(data){
	var dataArr = [],dataArr0 = [],dataArr1 = [];
	var result = callBackChangeData(data);
	if(result.length > 0){
		var min_longitude = 1000,max_longitude = 0,min_latitude = 1000,max_latitude = 0;
		var dataObj = {};
		var y = IntelligentTuningChart.day.substring(0,4);
		var m = IntelligentTuningChart.day.substring(4,6);
		var d = IntelligentTuningChart.day.substring(6,8);
		if(!isUndefined(m) && m.indexOf("0") == 0){
			m = m.substring(1);
		}
		dataObj.date = y+"/"+m+"/"+d;
		dataObj.longitude = IntelligentTuningChart.longitude;
		dataObj.latitude = IntelligentTuningChart.latitude;
		dataObj.seriesName = "台账坐标";
		dataArr.push(dataObj);
		dataArr0.push([IntelligentTuningChart.longitude,IntelligentTuningChart.latitude]);
		
		for(var i = 0; i < result.length; i++){
			var dataObj = {};
			var predLocationBaidu = result[i].pred_location_baidu;
			var day = result[i].day.toString();
			var y = day.substring(0,4);
			var m = day.substring(4,6);
			var d = day.substring(6,8);
			if(!isUndefined(m) && m.indexOf("0") == 0){
				m = m.substring(1);
			}
			dataObj.date = y+"/"+m+"/"+d;
			var arr = predLocationBaidu.split(",");
			var longitude = arr[0];
			var latitude = arr[1];
			
			longitude = longitude.substring(0,8);
			latitude = latitude.substring(0,7);
			
			longitude = parseFloat(longitude);
			latitude = parseFloat(latitude);
			
			if(longitude > max_longitude){
				max_longitude = longitude;
			}
			if(longitude < min_longitude){
				min_longitude = longitude;
			}
			if(latitude > max_latitude){
				max_latitude = latitude;
			}
			if(latitude < min_latitude){
				min_latitude = latitude;
			}
			dataObj.longitude = arr[0];
			dataObj.latitude = arr[1];
			dataObj.seriesName = "预测位置";
			dataArr1.push([arr[0],arr[1]]);
			var predDistance = result[i].pred_distance;
			dataObj.predDistance = predDistance;
			dataArr.push(dataObj);
		}
		
		if(IntelligentTuningChart.longitude > max_longitude){
			max_longitude = IntelligentTuningChart.longitude;
		}
		if(IntelligentTuningChart.latitude > max_latitude){
			max_latitude = IntelligentTuningChart.latitude;
		}
		if(IntelligentTuningChart.longitude < min_longitude){
			min_longitude = IntelligentTuningChart.longitude;
		}
		if(IntelligentTuningChart.latitude < min_latitude){
			min_latitude = IntelligentTuningChart.latitude;
		}
		IntelligentTuningChart.initScatterChart(dataArr,dataArr0,dataArr1,min_longitude,max_longitude,min_latitude,max_latitude);
	}
};


/**
 * ********************************
 * @funcname IntelligentTuningChart.AntAdj_05_GetTrendData
 * @funcdesc 获取过覆盖占比、重叠覆盖占比、方位角勘误、区域统计覆盖率、速率、站间距覆盖率、站间距速率、站间距AGPS-MR数量的图表数据
 * @param {int} enodebId : 基站ID
 * @param {int} cellId : 小区ID
 * @param {String} startTime : 开始日期
 * @param {String} endTime : 结束日期
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.AntAdj_05_GetTrendData = function IntelligentTuningChart_AntAdj_05_GetTrendData(enodebId,cellId,startTime,endTime){
 	var list = ["AntAdj_05_GetTrendData","STARTDAY:"+startTime,"ENDDAY:"+endTime,"ENODEBID:"+enodebId,"CELLID:"+cellId];
    var sqlList = [list];
    var functionList = [IntelligentTuningChart.setTrendData];
    var database = [3];
    progressbarTwo.submitSql(sqlList,functionList,database,null,null,null,null,true);
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.setTrendData
 * @funcdesc 填充过覆盖占比、重叠覆盖占比、区域统计覆盖率、速率、站间距覆盖率、站间距速率、站间距AGPS-MR数量的图表数据
 * @param {Object} data :  查询返回的结果
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.setTrendData = function IntelligentTuningChart_setTrendData(data){
	var dateArr = [],dateArr2 = [],cbmrratArr = [],olmrratArr = [],isAntConnAbnorArr = [],nbAgpsMrCovRateArr = [],nbAgpsMrDwrateArr = [],spacingAgpsMrnumArr = [],
	spacingAgpsPmrnumArr = [],spacingAgpsDwrateSumArr = [],problemArr = [],predDistanceArr = [],predAzimuthDiffArr = [],areaDwrateArr = [],areaMrnumsEnodebArr = [],
	areaMrnumsCellArr = [],declinationDisparityArr = [];
	
	var result = callBackChangeData(data);
	if(result.length > 0){
		for(var i = 0; i < IntelligentTuningChart.dayArr.length; i++){
			var day = IntelligentTuningChart.dayArr[i];
			var y = day.substring(0,4);
			var m = day.substring(4,6);
			var d = day.substring(6,8);
			if(!isUndefined(m) && m.indexOf("0") == 0){
				m = m.substring(1);
			}
			dateArr.push(y+"/"+m+"/"+d);
			dateArr2.push(m+"/"+d);
			
			var cbmrrat = 0,olmrrat = 0,isAntConnAbnor = 0,nbAgpsMrCovRate = 0,nbAgpsMrDwrate = 0,spacingAgpsMrnum = 0,spacingAgpsPmrnum = 0,spacingAgpsDwrateSum = 0,
			problem_name = "",poor_area_cov_rate = 0,ol_area_cov_rate = 0,cb_area_cov_rate = 0,pred_distance = 0,pred_azimuth_diff = 0,poor_area_dwrate = 0,poor_area_mrnums = ""
				,ol_area_dwrate = 0,ol_area_mrnums = "",cb_area_dwrate = 0,cb_area_mrnums = "",declination_disparity=0;
			
			for(var j = 0; j < result.length; j++){
				var resultDay = result[j].day.toString();
				if(resultDay == day){
					cbmrrat = result[j].cbmrrat;
					olmrrat = result[j].olmrrat;
//					isAntConnAbnor = result[j].is_ant_conn_abnor;
					nbAgpsMrCovRate = result[j].nb_agps_mr_cov_rate;
					nbAgpsMrDwrate = result[j].nb_agps_mr_dwrate;
					spacingAgpsMrnum = result[j].spacing_agps_mrnum;
					spacingAgpsPmrnum = result[j].spacing_agps_pmrnum;
					spacingAgpsDwrateSum = result[j].spacing_agps_dwrate_sum;
					problem_name = result[j].problem_name;
					poor_area_cov_rate = result[j].poor_area_cov_rate;
					ol_area_cov_rate = result[j].ol_area_cov_rate;
					cb_area_cov_rate = result[j].cb_area_cov_rate;
					pred_distance = result[j].pred_distance;
					pred_azimuth_diff = result[j].pred_azimuth_diff;
					
					poor_area_dwrate = result[j].poor_area_dwrate;
					poor_area_mrnums = result[j].poor_area_mrnums;
					ol_area_dwrate = result[j].ol_area_dwrate;
					ol_area_mrnums = result[j].ol_area_mrnums;
					cb_area_dwrate = result[j].cb_area_dwrate;
					cb_area_mrnums = result[j].cb_area_mrnums;

					declination_disparity = result[j].declination_disparity;
					
					break;
				}
			}
			cbmrratArr.push(cbmrrat == null ? 0 : cbmrrat);
			olmrratArr.push(olmrrat == null ? 0 : olmrrat);
//			if(isAntConnAbnor == 0){
//				isAntConnAbnorArr.push(1);
//			}else if(isAntConnAbnor == 1){
//				isAntConnAbnorArr.push(-1);
//			}else{
//				isAntConnAbnorArr.push(null);
//			}
			nbAgpsMrCovRateArr.push(nbAgpsMrCovRate == null ? 0 : nbAgpsMrCovRate);
			nbAgpsMrDwrateArr.push(nbAgpsMrDwrate == null ? 0 : nbAgpsMrDwrate);
			spacingAgpsMrnumArr.push(spacingAgpsMrnum == null ? 0 : spacingAgpsMrnum);
			spacingAgpsPmrnumArr.push(spacingAgpsPmrnum == null ? 0 : spacingAgpsPmrnum);
			spacingAgpsDwrateSumArr.push(spacingAgpsDwrateSum == null ? 0 : spacingAgpsDwrateSum);
			if(problem_name == "弱覆盖" && IntelligentTuningChart.problemName == problem_name){
				
				problemArr.push(toDecimal2(poor_area_cov_rate == null ? 0 : poor_area_cov_rate * 100));
				areaDwrateArr.push(poor_area_dwrate == null ? 0 : parseFloat(poor_area_dwrate).toFixed(2));
				if(!isUndefined(poor_area_mrnums) && poor_area_mrnums.indexOf(",") != -1 ){
					var arr = poor_area_mrnums.split(",");
					areaMrnumsEnodebArr.push(arr[0] == null ? 0 : arr[0]);
					areaMrnumsCellArr.push(arr[1] == null ? 0 : arr[1]);
				}else{
					areaMrnumsEnodebArr.push(0);
					areaMrnumsCellArr.push(0);
				}
				
			}else if(problem_name == "重叠覆盖" && IntelligentTuningChart.problemName == problem_name){
				
				problemArr.push(toDecimal2(ol_area_cov_rate == null ? 0 : ol_area_cov_rate * 100));
				areaDwrateArr.push(ol_area_dwrate == null ? 0 : parseFloat(ol_area_dwrate).toFixed(2));
				if(!isUndefined(ol_area_mrnums) && ol_area_mrnums.indexOf(",") != -1 ){
					var arr = ol_area_mrnums.split(",");
					areaMrnumsEnodebArr.push(arr[0] == null ? 0 : arr[0]);
					areaMrnumsCellArr.push(arr[1] == null ? 0 : arr[1]);
				}else{
					areaMrnumsEnodebArr.push(0);
					areaMrnumsCellArr.push(0);
				}
				
			}else if(problem_name == "越区覆盖" && IntelligentTuningChart.problemName == problem_name){
				
				problemArr.push(toDecimal2(cb_area_cov_rate == null ? 0 : cb_area_cov_rate * 100));
				areaDwrateArr.push(cb_area_dwrate == null ? 0 : parseFloat(cb_area_dwrate).toFixed(2));
				if(!isUndefined(cb_area_mrnums) && cb_area_mrnums.indexOf(",") != -1 ){
					var arr = cb_area_mrnums.split(",");
					areaMrnumsEnodebArr.push(arr[0] == null ? 0 : arr[0]);
					areaMrnumsCellArr.push(arr[1] == null ? 0 : arr[1]);
				}else{
					areaMrnumsEnodebArr.push(0);
					areaMrnumsCellArr.push(0);
				}
				
			}else{
				problemArr.push(0);
				areaDwrateArr.push(0);
				areaMrnumsEnodebArr.push(0);
				areaMrnumsCellArr.push(0);
			}
			predDistanceArr.push(pred_distance == null ? 0 : pred_distance);
			predAzimuthDiffArr.push(pred_azimuth_diff == null ? 0 : pred_azimuth_diff);
			
			declinationDisparityArr.push(declination_disparity == null ? 0 : declination_disparity);
		}
		
		if(IntelligentTuningChart.dateRange1 == null && IntelligentTuningChart.dateRange2 == null){
			IntelligentTuningChart.initDeclinationDisparityChart(result);//下倾角勘误图表
			IntelligentTuningChart.initDeviationDistanceChart(dateArr,predDistanceArr,predAzimuthDiffArr,declinationDisparityArr);//偏离距离和偏转角度、下倾角度的图表
			IntelligentTuningChart.initMRRATChart(dateArr,cbmrratArr,"cbmrrat");//过覆盖占比
			IntelligentTuningChart.initMRRATChart(dateArr,olmrratArr,"olmrrat");//重叠覆盖占比
//		IntelligentTuningChart.initBarChart(dateArr2,isAntConnAbnorArr);
			IntelligentTuningChart.initAreaCountChart(dateArr,nbAgpsMrCovRateArr,nbAgpsMrDwrateArr);//区域统计图表
			IntelligentTuningChart.initProblemAreaChart(dateArr,problemArr,areaDwrateArr,areaMrnumsEnodebArr,areaMrnumsCellArr);//问题区域图表
			IntelligentTuningChart.initSpacingAgpsChart(dateArr,spacingAgpsMrnumArr,spacingAgpsPmrnumArr,spacingAgpsDwrateSumArr);//站间距列表图表
			
		}else if(IntelligentTuningChart.dateRange1 != null && IntelligentTuningChart.dateRange2 == null){
			IntelligentTuningChart.initDeclinationDisparityChart(result);//下倾角勘误图表
			IntelligentTuningChart.initDeviationDistanceChart(dateArr,predDistanceArr,predAzimuthDiffArr,declinationDisparityArr);//偏离距离和偏转角度、下倾角度的图表
			IntelligentTuningChart.initMRRATChart(dateArr,cbmrratArr,"cbmrrat");//过覆盖占比
			IntelligentTuningChart.initMRRATChart(dateArr,olmrratArr,"olmrrat");//重叠覆盖占比
			
		}else if(IntelligentTuningChart.dateRange1 == null && IntelligentTuningChart.dateRange2 != null){
			
			IntelligentTuningChart.initAreaCountChart(dateArr,nbAgpsMrCovRateArr,nbAgpsMrDwrateArr);//区域统计图表
			IntelligentTuningChart.initProblemAreaChart(dateArr,problemArr,areaDwrateArr,areaMrnumsEnodebArr,areaMrnumsCellArr);//问题区域图表
			
		}
	}
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.AntAdj_06_GetMOD3TrendData
 * @funcdesc 获取MOD3干扰的占比数据
 * @param {int} enodebId : 基站ID
 * @param {int} cellId : 小区ID
 * @param {String} startTime : 开始日期
 * @param {String} endTime : 结束日期
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.AntAdj_06_GetMOD3TrendData = function IntelligentTuningChart_AntAdj_06_GetMOD3TrendData(enodebId,cellId,startTime,endTime){
 	var list = ["AntAdj_06_GetMOD3TrendData","STARTDAY:"+startTime,"ENDDAY:"+endTime,"ENODEBID:"+enodebId,"CELLID:"+cellId];
    var sqlList = [list];
    var functionList = [IntelligentTuningChart.setMOD3TrendData];
    var database = [3];
    progressbarTwo.submitSql(sqlList,functionList,database,null,null,null,null,true);
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.setMOD3TrendData
 * @funcdesc 填充MOD3干扰的占比数据
 * @param {Object} data :  查询返回的结果
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.setMOD3TrendData = function IntelligentTuningChart_setMOD3TrendData(data){
	var sc0Arr = [],sc1Arr = [],sc2Arr = [],nc0Arr = [],nc1Arr = [],nc2Arr = [],dayArr = [];
	IntelligentTuningChart.MOD3DayArr = [];
	var result = callBackChangeData(data);
	for(var i = 0; i < IntelligentTuningChart.dayArr.length; i++){
		var day = IntelligentTuningChart.dayArr[i];
		var y = day.substring(0,4);
		var m = day.substring(4,6);
		var d = day.substring(6,8);
		if(!isUndefined(m) && m.indexOf("0") == 0){
			m = m.substring(1);
		}
		var md = m+"/"+d;
		dayArr.push(md);
		IntelligentTuningChart.MOD3DayArr.push(y+"/"+m+"/"+d);
		var sc0 = 0,sc1 = 0,sc2 = 0,nc0 = 0,nc1 = 0,nc2 = 0;
		for(var j = 0; j < result.length; j++){
			var resultDay = result[j].day.toString();
			if(resultDay == day){
				sc0 = result[j].sc0;
				sc1 = result[j].sc1;
				sc2 = result[j].sc2;
				nc0 = result[j].nc0;
				nc1 = result[j].nc1;
				nc2 = result[j].nc2;
				break;
			}
		}
		sc0Arr.push(sc0 == null ? 0 : sc0);
		sc1Arr.push(sc1 == null ? 0 : sc1);
		sc2Arr.push(sc2 == null ? 0 : sc2);
		nc0Arr.push(nc0 == null ? 0 : nc0);
		nc1Arr.push(nc1 == null ? 0 : nc1);
		nc2Arr.push(nc2 == null ? 0 : nc2);
	}
	IntelligentTuningChart.initMOD3Chart(sc0Arr,sc1Arr,sc2Arr,nc0Arr,nc1Arr,nc2Arr,dayArr);
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.initMOD3Chart
 * @funcdesc MOD3干扰占比图表
 * @param {array} sc0Arr :  主扇区模0
 * @param {array} sc1Arr :  主扇区模1
 * @param {array} sc2Arr :  主扇区模2
 * @param {array} nc0Arr :  邻扇区模0
 * @param {array} nc1Arr :  邻扇区模1
 * @param {array} nc2Arr :  邻扇区模2
 * @param {array} dayArr :  日期列表
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.initMOD3Chart = function IntelligentTuningChart_initMOD3Chart(sc0Arr,sc1Arr,sc2Arr,nc0Arr,nc1Arr,nc2Arr,dayArr) {
	var lineStyleArr = ['dotted' , 'dotted' , 'dotted' , 'dotted' ,'dotted' ,'dotted']; //线的样式（虚线还是实线）
	var selectedObj;
	if(!isUndefined(IntelligentTuningChart.pci)){
		 var mod = parseInt(IntelligentTuningChart.pci) % 3;
	     if(mod == 0){ //只有与pci取模之后在同一个模上的线才是实线的。表示这个扇区当前是在哪个模上
	         lineStyleArr[0] = "solid";
	         lineStyleArr[3] = "solid";
	         selectedObj = {
	        		 "主扇区模0":true,
	        		 "主扇区模1":false , 
	        		 "主扇区模2":false , 
	        		 "邻扇区模0":true , 
	        		 "邻扇区模1":false , 
	        		 "邻扇区模2":false
	         };
	     }else if(mod == 1){
	         lineStyleArr[1] = "solid";
	         lineStyleArr[4] = "solid";
	         selectedObj = {
	        		 "主扇区模0":false,
	        		 "主扇区模1":true , 
	        		 "主扇区模2":false , 
	        		 "邻扇区模0":false , 
	        		 "邻扇区模1":true , 
	        		 "邻扇区模2":false
	         };
	     }else{
	         lineStyleArr[2] = "solid";
	         lineStyleArr[5] = "solid";
	         selectedObj = {
	        		 "主扇区模0":false,
	        		 "主扇区模1":false , 
	        		 "主扇区模2":true , 
	        		 "邻扇区模0":false , 
	        		 "邻扇区模1":false , 
	        		 "邻扇区模2":true
	         };
	     }
	     
	}
    var option = {
        tooltip: {
            trigger: 'axis',
            position:function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                var obj = {top: 60};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 280;
                return obj;
            },
            formatter:function(params){
            	var date = null;
               	var dataArr = [];
	            for(var i = 0; i < params.length; i++){
	            	if(date == null){
	            		date = params[0].name;
	            		dataArr.push(date);
	            		dataArr.push( "<ul>");
	            	}
	            	var seriesName = params[i].seriesName;
	            	var value = params[i].value;
	            	var color = params[i].color;
	            	dataArr.push( "<li><span style='color:  "+color+";font-size:20px;'>●</span>&nbsp;&nbsp;"+seriesName+"："+value+" %</li>");
	            }
		        dataArr.push( "</ul>");
                return  dataArr.join('');
            }
        },
        legend: {
        	top:"-1%",
        	data:["主扇区模0" , "主扇区模1" , "主扇区模2" , "邻扇区模0" , "邻扇区模1" , "邻扇区模2"],
        	selected:selectedObj
        },
        grid: {
            top: 45,
            left: 20,
            right: 20,
            bottom: 10,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#272727'
                }
            },
            data: dayArr,
            axisPointer: {
                value: IntelligentTuningChart.md,
                snap: true,
                lineStyle: {
                    color: '#004E52',
                    opacity: 0.5,
                    width: 2
                },
                handle: {
                    show: true,
                    color: '#004E52'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: 'MOD3干扰占比(%)',
            nameTextStyle:{
            	padding:[1,1,1,10]
            },
            axisLabel: {
                formatter: '{value} %',
                textStyle: {
                    color: '#272727'
                }
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [
            {
                name:'主扇区模0',
                type:'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
//                label: {
//                    normal: {
//                        show: true,
//                        position: 'top',
//                        formatter: '{c}%'
//                    }
//                },
                lineStyle: {
                    normal: {
                        color: '#ec2929',
                        width: 2,
                        type : lineStyleArr[0]
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ec2929',
                        borderColor: '#ec2929'
                    }
                },
                data:sc0Arr,
                markLine:{
                    symbol :'none',
                    symbolSize : 5,
                    data : [{'xAxis': IntelligentTuningChart.md}],
                    lineStyle:{
                    	color:'#004E52'
                    },
                    label:{
                        show:false
                    }
                }
            },
            {
                name:'主扇区模1',
                type:'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
//                label: {
//                    normal: {
//                        show: true,
//                        position: 'top',
//                        formatter: '{c}%'
//                    }
//                },
                lineStyle: {
                	normal: {
                		color: '#1669f1',
                		width: 2,
                		type : lineStyleArr[1]
                	}
                },
                itemStyle: {
                	normal: {
                		color: '#1669f1',
                		borderColor: '#1669f1'
                	}
                },
                data:sc1Arr,
                markLine:{
                    symbol :'none',
                    symbolSize : 5,
                    data : [{'xAxis': IntelligentTuningChart.md}],
                    lineStyle:{
                    	color:'#004E52'
                    },
                    label:{
                        show:false
                    }
                }
            },
            {
                name:'主扇区模2',
                type:'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
//                label: {
//                    normal: {
//                        show: true,
//                        position: 'top',
//                        formatter: '{c}%'
//                    }
//                },
                lineStyle: {
                	normal: {
                		color: '#0ab070',
                		width: 2,
                		type : lineStyleArr[2]
                	}
                },
                itemStyle: {
                	normal: {
                		color: '#0ab070',
                		borderColor: '#0ab070'
                	}
                },
                data:sc2Arr,
                markLine:{
                    symbol :'none',
                    symbolSize : 5,
                    data : [{'xAxis': IntelligentTuningChart.md}],
                    lineStyle:{
                    	color:'#004E52'
                    },
                    label:{
                        show:false
                    }
                }
            },
            {
                name:'邻扇区模0',
                type:'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
//                label: {
//                    normal: {
//                        show: true,
//                        position: 'top',
//                        formatter: '{c}%'
//                    }
//                },
                lineStyle: {
                	normal: {
                		color: '#f0819e',
                		width: 2,
                		type : lineStyleArr[3]
                	}
                },
                itemStyle: {
                	normal: {
                		color: '#f0819e',
                		borderColor: '#f0819e'
                	}
                },
                data:nc0Arr,
                markLine:{
                    symbol :'none',
                    symbolSize : 5,
                    data : [{'xAxis': IntelligentTuningChart.md}],
                    lineStyle:{
                    	color:'#004E52'
                    },
                    label:{
                        show:false
                    }
                }
            },
            {
                name:'邻扇区模1',
                type:'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
//                label: {
//                    normal: {
//                        show: true,
//                        position: 'top',
//                        formatter: '{c}%'
//                    }
//                },
                lineStyle: {
                	normal: {
                		color: '#7cb6f2',
                		width: 2,
                		type : lineStyleArr[4]
                	}
                },
                itemStyle: {
                	normal: {
                		color: '#7cb6f2',
                		borderColor: '#7cb6f2'
                	}
                },
                data:nc1Arr,
                markLine:{
                    symbol :'none',
                    symbolSize : 5,
                    data : [{'xAxis': IntelligentTuningChart.md}],
                    lineStyle:{
                    	color:'#004E52'
                    },
                    label:{
                        show:false
                    }
                }
            },
            {
                name:'邻扇区模2',
                type:'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
//                label: {
//                    normal: {
//                        show: true,
//                        position: 'top',
//                        formatter: '{c}%'
//                    }
//                },
                lineStyle: {
                	normal: {
                		color: '#78e9d2',
                		width: 2,
                		type : lineStyleArr[5]
                	}
                },
                itemStyle: {
                	normal: {
                		color: '#78e9d2',
                		borderColor: '#78e9d2'
                	}
                },
                data:nc2Arr,
                markLine:{
                    symbol :'none',
                    symbolSize : 5,
                    data : [{'xAxis': IntelligentTuningChart.md}],
                    lineStyle:{
                    	color:'#004E52'
                    },
                    label:{
                        show:false
                    }
                }
            }
        ]
    };


    IntelligentTuningChart.chartMOD3 = echarts.init(document.getElementById('chartRate4'));
    IntelligentTuningChart.chartMOD3.setOption(option);
    IntelligentTuningChart.chartMOD3.resize();
    IntelligentTuningChart.clickChartDateRefreshMapAndDate(IntelligentTuningChart.chartMOD3,IntelligentTuningChart.MOD3DayArr);
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.initMRRATChart
 * @funcdesc 弱覆盖占比、过覆盖占比、重叠覆盖占比图表
 * @param {array} dateArr :  日期列表
 * @param {array} dataArr :  数据列表
 * @param {String} id :  模块ID
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.initMRRATChart = function IntelligentTuningChart_initMRRATChart(dateArr,dataArr,id) {

    var option = {
        tooltip: {
            trigger: 'item',
            formatter:function(params){
            	if(params[0] != null){
            		var name = params[0].name;
            		var seriesName = params[0].seriesName;
            		var value = params[0].value;
            		var color = params[0].color;
            		var tooltipArr = [];
            		tooltipArr.push(name);
            		tooltipArr.push("<ul>");
            		tooltipArr.push("<li><span style='color: "+color+";font-size:20px;'>●</span>&nbsp;&nbsp;"+seriesName+"："+value+" %</li>");
            		tooltipArr.push("</ul>");
            		return tooltipArr.join('');
            	}
            }
        },
        legend: {
            data:['弱覆盖占比'],
            left:'47%'
        },
        grid: {
            top: 40,
            left: 25,
            right: 20,
            bottom: 10,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#272727'
                }
            },
            data: dateArr,
            axisPointer: {
                value: IntelligentTuningChart.ymd,
                snap: true,
                lineStyle: {
                    color: '#004E52',
                    opacity: 0.5,
                    width: 2
                },
                handle: {
                    show: true,
                    color: '#004E52'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '覆盖占比(%)',
            splitNumber:5,
            axisLabel: {
                textStyle: {
                    color: '#272727'
                }
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        
        series: [
            {
                name:'覆盖占比',
                type:'line',
                smooth:true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: 'rgb(255, 70, 131)'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(255, 158, 68)'
                        }, {
                            offset: 1,
                            color: 'rgb(255, 70, 131)'
                        }])
                    }
                },
                data: dataArr,
                markLine:{
                    symbol :'none',
                    symbolSize : 5,
                    data : [{'xAxis': IntelligentTuningChart.ymd}],
                    lineStyle : {
                        width: 0.5,
                        color:'#004E52',
                        type :'solid',
                    },
                    label:{
                        show:false
                    }
                }
            }
        ]
    };

    if(id == "poorAreaCovRate"){
    	IntelligentTuningChart.chartRate1 = echarts.init(document.getElementById('chartRate1'));
    	option.legend.data = ["覆盖率"];
    	option.series[0].name = "覆盖率";
    	option.yAxis.name = "覆盖率(%)";
    	IntelligentTuningChart.chartRate1.setOption(option);
    	IntelligentTuningChart.chartRate1.resize();
    	IntelligentTuningChart.clickChartDateRefreshMapAndDate(IntelligentTuningChart.chartRate1,dateArr);
    }else if(id == "cbmrrat"){
    	IntelligentTuningChart.chartRate2 = echarts.init(document.getElementById('chartRate2'));
    	option.legend.data = ["越区覆盖占比"];
    	option.series[0].name = "越区覆盖占比";
    	option.yAxis.name = "越区覆盖占比(%)";
    	IntelligentTuningChart.chartRate2.setOption(option);
    	IntelligentTuningChart.chartRate2.resize();
    	IntelligentTuningChart.clickChartDateRefreshMapAndDate(IntelligentTuningChart.chartRate2,dateArr);
    }else if(id == "olmrrat"){
    	IntelligentTuningChart.chartRate3 = echarts.init(document.getElementById('chartRate3'));
    	option.legend.data = ["重叠覆盖占比"];
    	option.series[0].name = "重叠覆盖占比";
    	option.yAxis.name = "重叠覆盖占比(%)";
    	IntelligentTuningChart.chartRate3.setOption(option);
    	IntelligentTuningChart.chartRate3.resize();
    	IntelligentTuningChart.clickChartDateRefreshMapAndDate(IntelligentTuningChart.chartRate3,dateArr);
    }
};


/**
 * ********************************
 * @funcname IntelligentTuningChart.initScatterChart
 * @funcdesc 坐标勘误图表
 * @param {array} dataArr :  日期列表
 * @param {array} dataArr0 :  坐标位置列表
 * @param {array} dataArr1 :  预测位置列表
 * @param {float} min_longitude :  最小经度
 * @param {float} max_longitude :  最大经度
 * @param {float} min_latitude :  最小纬度
 * @param {float} max_latitude :  最大纬度
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.initScatterChart = function IntelligentTuningChart_initScatterChart(dataArr,dataArr0,dataArr1,min_longitude,max_longitude,min_latitude,max_latitude) {
	max_latitude = (max_latitude+0.0001).toFixed(4);
	max_longitude = (max_longitude+0.0001).toFixed(4);
    var option = {
        tooltip: {
            trigger: 'item',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'cross'        // 默认为直线，可选为：'line' | 'shadow'
            },
            position:function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                var obj = {top: 60};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 80;
                return obj;
            },
            formatter: function (params) {
            	var value = params.value;
            	//鼠标选中的经纬度
            	var select_longitude = value[0];
            	var select_latitude = value[1];
            	
            	var tooltipArr = [];
            	tooltipArr.push( "<ul>");
            	
            	for(var i = 0; i < dataArr.length; i++){
            		var dataObj = dataArr[i];
            		var date = dataObj.date;
            		var seriesName = dataObj.seriesName;
            		var longitude = dataObj.longitude;
            		var latitude = dataObj.latitude;
            		var predDistance = dataObj.predDistance;
            		
            		if(longitude == select_longitude && latitude == select_latitude){
            			if("台账坐标" == seriesName){
            				tooltipArr.push( "<li><span style='color: #FFC000;font-size:20px;'>●</span>&nbsp;&nbsp;"+date+"&nbsp;&nbsp;台账坐标：经度："+longitude+" 纬度："+latitude+"</li>");
            			}else if("预测位置" == seriesName){
            				tooltipArr.push( "<li><span style='color: #5B9BD5;font-size:20px;'>●</span>&nbsp;&nbsp;"+date+"&nbsp;&nbsp;预测位置偏移值："+predDistance+" 米(经度："+longitude+" 纬度："+latitude+")</li>");
            			}
            		}
            	}
            	
            	tooltipArr.push( "</ul>");
                return  tooltipArr.join('');
            }
        },
        legend: {
            data:['台账坐标','近7次预测位置'],
            top: -5,
            right: 20
        },
        xAxis: {
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#272727'
                }
            },
            min:min_longitude,
            max:max_longitude
        },
        yAxis: {
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#272727'
                }
            },
            splitNumber:5,
            minInterval:min_latitude,
            maxInterval:max_latitude,
            min:min_latitude,
            max:max_latitude
        },
        grid: {
            top: 30,
            left: 10,
            right: 30,
            bottom: 10,
            containLabel: true
        },
        series: [{
	            name:'台账坐标',
	            symbolSize: 20,
	            itemStyle: {
	                normal: {
	                    color: '#FFC000'
	                }
	            },
	            data: dataArr0,
	            type: 'scatter'
        	},
            {
                name:'近7次预测位置',
                symbolSize: 20,
                itemStyle: {
                    normal: {
                        color: '#5B9BD5'
                    }
                },
                data: dataArr1,
                type: 'scatter'
            }]
    };

    IntelligentTuningChart.chartRate5 = echarts.init(document.getElementById('chartRate5'));
    IntelligentTuningChart.chartRate5.setOption(option);
    IntelligentTuningChart.chartRate5.resize();

};

/**
 * ********************************
 * @funcname IntelligentTuningChart.initBarChart
 * @funcdesc 方位角勘误图表
 * @param {array} dateArr :  日期列表
 * @param {array} dataArr :  数据列表
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.initBarChart = function IntelligentTuningChart_initBarChart(dateArr,dataArr) {
    var option = {
        tooltip: {
            trigger: 'axis',
            triggerOn: 'mousemove|click', //none
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
            	var value = params[0].value;
            	if(!isUndefined(value)){
            		var name = params[0].name;
            		var color = params[0].color;
            		var seriesName = params[0].seriesName;
            		var tooltipArr = [];
            		tooltipArr.push( "<ul>");
            		if(1 == value){
            			tooltipArr.push( name+"&nbsp;&nbsp;正常");
//            			value = 0;
//            			tooltipArr.push( "<li><span style='color: "+color+";font-size:20px;'>●</span>&nbsp;&nbsp;"+seriesName+"&nbsp;&nbsp;："+value+" </li>");
            		}else if(-1 == value){
            			tooltipArr.push( name+"&nbsp;&nbsp;天馈接反");
//            			value = 1;
//            			tooltipArr.push( "<li><span style='color: "+color+";font-size:20px;'>●</span>&nbsp;&nbsp;"+seriesName+"&nbsp;&nbsp;："+value+" </li>");
            		}
            		tooltipArr.push( "</ul>");
            		return  tooltipArr.join('');
            	}
            }
        },
        grid: {
            top: 20,
            left: 10,
            right: 20,
            bottom: 10,
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: dateArr,
                axisPointer: {
                    type: 'line',
                    value: IntelligentTuningChart.md,
                    snap: true,
                    lineStyle: {
                        color: '#004E52',
                        opacity: 0.5,
                        width: 2
                    },
                    handle: {
                        show: true,
                        color: '#004E52'
                    }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#272727'
                    }
                }
            }
        ],
        yAxis: [
            {
                show: false,
                type: 'value',
            }
        ],
        series: [
            {
                type:'bar',
                name:'数值',
                barWidth:30,
                itemStyle:{
                    normal:{
                        color:function(item){
                            if(dataArr[item.dataIndex] == 1){
                                return 'rgb(52,212,65)';
                            }else if(dataArr[item.dataIndex] == -1){
                            	return 'rgb(255,0,0)';
                            }
                        }
                    }},
                data:dataArr,
                markLine:{
                    symbol :'none',
                    symbolSize : 5,
                    data : [{'xAxis': IntelligentTuningChart.md}],
                    label:{
                        show:false
                    }
                }
            },
        ]
    };

    IntelligentTuningChart.chartRate6 = echarts.init(document.getElementById('chartRate6'));
    IntelligentTuningChart.chartRate6.setOption(option);
    IntelligentTuningChart.chartRate6.resize();

};

/**
 * ********************************
 * @funcname IntelligentTuningChart.initProblemAreaChart
 * @funcdesc 问题区域图表
 * @param {array} dateArr :  日期列表
 * @param {array} problemArr :  问题区域列表
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.initProblemAreaChart = function IntelligentTuningChart_initProblemAreaChart(dateArr,problemArr,areaDwrateArr,areaMrnumsEnodebArr,areaMrnumsCellArr) {
    var option = {
            tooltip: {
                trigger: 'axis',
                formatter:function(params){
                	var date = null;
                   	var dataArr = [];
    	            	for(var i = 0; i < params.length; i++){
    	            		if(date == null){
    	            			date = params[0].name;
    	            			dataArr.push(date);
    	            			dataArr.push( "<ul>");
    	            		}
    	                	var seriesName = params[i].seriesName;
    	                	var value = params[i].value;
    	                	var color = params[i].color;
    	                	var unit;
    	                	if("覆盖率" == seriesName){
    	                		unit = "%";
    	                	}else if("下行速率" == seriesName){
    	                		unit = "Mbp/s";
    	                	}else if("区域MR" == seriesName || "小区MR" == seriesName){
    	                		unit = "条";
    	                	}
    	                	dataArr.push( "<li><span style='color: "+color+";font-size:20px;'>●</span>&nbsp;&nbsp;"+seriesName+"："+value+"&nbsp;&nbsp;"+unit+"</li>");
    	            	}
    		            dataArr.push( "</ul>");
                    return  dataArr.join('');
                	
                }
            },
            legend: {
                data:['覆盖率','下行速率','区域MR','小区MR']
            },
            grid: {
                top: 50,
                left: 10,
                right: 20,
                bottom: 10,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: dateArr
            },
            yAxis: [
                 {
	                show: false,
	                type: 'value'
                 }
            ],
            series: [
                {
                    name:'覆盖率',
                    type:'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: '#4CABF5'
                        }
                    },
                    data:[20, 32, 21, 34, 20, 30, 10],
                    markLine:{
                        symbol :'none',
                        symbolSize : 5,
                        data : [{'xAxis': IntelligentTuningChart.ymd}],
                        lineStyle : {
                            width: 0.5,
                            color:'#004E52',
                            type :'solid',
                        },
                        label:{
                            show:false
                        }
                    }
                },
                {
                    name:'下行速率',
                    type:'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: '#919FF5'
                        }
                    },
                    data:[20, 32, 21, 34, 20, 30, 10],
                    markLine:{
                        symbol :'none',
                        symbolSize : 5,
                        data : [{'xAxis': IntelligentTuningChart.ymd}],
                        lineStyle : {
                            width: 0.5,
                            color:'#004E52',
                            type :'solid',
                        },
                        label:{
                            show:false
                        }
                    }
                },
                {
                    name:'区域MR',
                    type:'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: '#99C783'
                        }
                    },
                    data:[20, 32, 21, 34, 20, 30, 10],
                    markLine:{
                        symbol :'none',
                        symbolSize : 5,
                        data : [{'xAxis': IntelligentTuningChart.ymd}],
                        lineStyle : {
                            width: 0.5,
                            color:'#004E52',
                            type :'solid',
                        },
                        label:{
                            show:false
                        }
                    }
                }
                ,{
                    name:'小区MR',
                    type:'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: '#F5B34C'
                        }
                    },
                    data:[20, 32, 21, 34, 20, 30, 10],
                    markLine:{
                        symbol :'none',
                        symbolSize : 5,
                        data : [{'xAxis': IntelligentTuningChart.ymd}],
                        lineStyle : {
                            width: 0.5,
                            color:'#004E52',
                            type :'solid',
                        },
                        label:{
                            show:false
                        }
                    }
                }
            ]
        };
    
    option.series[0].data = problemArr;
    option.series[1].data = areaDwrateArr;
    option.series[2].data = areaMrnumsEnodebArr;
    option.series[3].data = areaMrnumsCellArr;
    IntelligentTuningChart.areaCount5 = echarts.init(document.getElementById('areaCount5'));
    IntelligentTuningChart.areaCount5.setOption(option);
    IntelligentTuningChart.areaCount5.resize();
    IntelligentTuningChart.clickChartDateRefreshMapAndDate(IntelligentTuningChart.areaCount5,dateArr);
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.initAreaCountChart
 * @funcdesc 区域统计图表
 * @param {array} dateArr :  日期列表
 * @param {array} nbAgpsMrCovRateArr :  覆盖率列表
 * @param {array} nbAgpsMrDwrateArr :  速率列表
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.initAreaCountChart = function IntelligentTuningChart_initAreaCountChart(dateArr,nbAgpsMrCovRateArr,nbAgpsMrDwrateArr) {
	var nbAgpsMrCovRateArr300M = [],nbAgpsMrCovRateArr500M = [],nbAgpsMrCovRateArr1000M = [],nbAgpsMrCovRateArr3000M = [],
	nbAgpsMrDwrateArr300M = [],nbAgpsMrDwrateArr500M = [],nbAgpsMrDwrateArr1000M = [],nbAgpsMrDwrateArr3000M = [];
    var option = {
        tooltip: {
            trigger: 'axis',
            formatter:function(params){
            	var date = null;
               	var dataArr = [];
	            	for(var i = 0; i < params.length; i++){
	            		if(date == null){
	            			date = params[0].name;
	            			dataArr.push(date);
	            			dataArr.push( "<ul>");
	            		}
	                	var seriesName = params[i].seriesName;
	                	var value = params[i].value;
	                	var color = params[i].color;
	                	var unit;
	                	if("覆盖率" == seriesName){
	                		unit = "%";
	                	}else if("速率" == seriesName){
	                		unit = "Mbp/s";
	                	}
	                	dataArr.push( "<li><span style='color: "+color+";font-size:20px;'>●</span>&nbsp;&nbsp;"+seriesName+"："+value+"&nbsp;&nbsp;"+unit+"</li>");
	            	}
		            dataArr.push( "</ul>");
                return  dataArr.join('');
            	
            }
        },
        legend: {
            data:['覆盖率','速率']
        },
        grid: {
            top: 50,
            left: 10,
            right: 25,
            bottom: 10,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: dateArr
        },
        yAxis: [
            {
                type: 'value',
                name: '覆盖率(%)',
                axisLabel: {
                    formatter: '{value} %',
                    textStyle: {
                        color: '#272727'
                    }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
            },
            {
                type: 'value',
                name: '速率（Mbp/s）',
                nameGap:20,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#272727'
                    }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
            }
        ],
        series: [
            {
                name:'覆盖率',
                type:'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#5B9BD5'
                    }
                },
                data:[20, 32, 21, 34, 20, 30, 10],
                markLine:{
                    symbol :'none',
                    symbolSize : 5,
                    data : [{'xAxis': IntelligentTuningChart.ymd}],
                    lineStyle : {
                        width: 0.5,
                        color:'#004E52',
                        type :'solid',
                    },
                    label:{
                        show:false
                    }
                }
            },
            {
                name:'速率',
                type:'line',
                smooth: true,
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: '#FFC000'
                    }
                },
                data:[40, 62, 51, 64, 40, 70, 50],
                markLine:{
                    symbol :'none',
                    symbolSize : 5,
                    data : [{'xAxis': IntelligentTuningChart.ymd}],
                    lineStyle : {
                        width: 0.5,
                        color:'#004E52',
                        type :'solid',
                    },
                    label:{
                        show:false
                    }
                }
            },
        ]
    };

    for(var i = 0; i < nbAgpsMrCovRateArr.length; i++){
    	var nbAgpsMrCovRate = nbAgpsMrCovRateArr[i];
    	if(nbAgpsMrCovRate == null || nbAgpsMrCovRate == "" || nbAgpsMrCovRate == 0){
    		nbAgpsMrCovRateArr300M.push(0);
    		nbAgpsMrCovRateArr500M.push(0);
    		nbAgpsMrCovRateArr1000M.push(0);
    		nbAgpsMrCovRateArr3000M.push(0);
    	}else{
    		var arr = nbAgpsMrCovRate.split(",");
    		nbAgpsMrCovRateArr300M.push(toDecimal2(arr[0] == null ? 0 : arr[0] * 100));
			nbAgpsMrCovRateArr500M.push(toDecimal2(arr[1] == null ? 0 : arr[1] * 100));
			nbAgpsMrCovRateArr1000M.push(toDecimal2(arr[2] == null ? 0 : arr[2] * 100));
			nbAgpsMrCovRateArr3000M.push(toDecimal2(arr[3] == null ? 0 : arr[3] * 100));
    	}
    }
    for(var i = 0; i < nbAgpsMrDwrateArr.length; i++){
    	var nbAgpsMrDwrate = nbAgpsMrDwrateArr[i];
    	if(nbAgpsMrDwrate == null || nbAgpsMrDwrate == "" || nbAgpsMrDwrate == 0){
    		nbAgpsMrDwrateArr300M.push(0);
    		nbAgpsMrDwrateArr500M.push(0);
    		nbAgpsMrDwrateArr1000M.push(0);
    		nbAgpsMrDwrateArr3000M.push(0);
    	}else{
    		var arr = nbAgpsMrDwrate.split("@");
    		nbAgpsMrDwrate = arr[0];
    		if(nbAgpsMrDwrate == null || nbAgpsMrDwrate == "" || nbAgpsMrDwrate == 0){
        		nbAgpsMrDwrateArr300M.push(0);
        		nbAgpsMrDwrateArr500M.push(0);
        		nbAgpsMrDwrateArr1000M.push(0);
        		nbAgpsMrDwrateArr3000M.push(0);
        	}else{
        		arr = nbAgpsMrDwrate.split(",");
        		nbAgpsMrDwrateArr300M.push(arr[0] == null ? 0 : parseFloat(arr[0]).toFixed(2));
        		nbAgpsMrDwrateArr500M.push(arr[1] == null ? 0 : parseFloat(arr[1]).toFixed(2));
        		nbAgpsMrDwrateArr1000M.push(arr[2] == null ? 0 : parseFloat(arr[2]).toFixed(2));
        		nbAgpsMrDwrateArr3000M.push(arr[3] == null ? 0 : parseFloat(arr[3]).toFixed(2));
        	}
    	}
    }
    
    if(nbAgpsMrCovRateArr300M.length > 0){
    	option.series[0].data = nbAgpsMrCovRateArr300M;
    }
    if(nbAgpsMrDwrateArr300M.length > 0){
    	option.series[1].data = nbAgpsMrDwrateArr300M;
    }
	$("#300mi").addClass("active").siblings().removeClass("active"); 
	$("#areaCount1").show().siblings().hide();
    IntelligentTuningChart.areaCount1 = echarts.init(document.getElementById('areaCount1'));
    IntelligentTuningChart.areaCount1.setOption(option);
    IntelligentTuningChart.areaCount1.resize();
	IntelligentTuningChart.clickChartDateRefreshMapAndDate(IntelligentTuningChart.areaCount1,dateArr);
    
    if(nbAgpsMrCovRateArr500M.length > 0){
    	option.series[0].data = nbAgpsMrCovRateArr500M;
    }
    if(nbAgpsMrDwrateArr500M.length > 0){
    	option.series[1].data = nbAgpsMrDwrateArr500M;
    }
    IntelligentTuningChart.areaCount2 = echarts.init(document.getElementById('areaCount2'));
    IntelligentTuningChart.areaCount2.setOption(option);
    IntelligentTuningChart.areaCount2.resize();
	IntelligentTuningChart.clickChartDateRefreshMapAndDate(IntelligentTuningChart.areaCount2,dateArr);
    
    if(nbAgpsMrCovRateArr1000M.length > 0){
    	option.series[0].data = nbAgpsMrCovRateArr1000M;
    }
    if(nbAgpsMrDwrateArr1000M.length > 0){
    	option.series[1].data = nbAgpsMrDwrateArr1000M;
    }
    IntelligentTuningChart.areaCount3 = echarts.init(document.getElementById('areaCount3'));
    IntelligentTuningChart.areaCount3.setOption(option);
    IntelligentTuningChart.areaCount3.resize();
	IntelligentTuningChart.clickChartDateRefreshMapAndDate(IntelligentTuningChart.areaCount3,dateArr);
    
    if(nbAgpsMrCovRateArr3000M.length > 0){
    	option.series[0].data = nbAgpsMrCovRateArr3000M;
    }
    if(nbAgpsMrDwrateArr3000M.length > 0){
    	option.series[1].data = nbAgpsMrDwrateArr3000M;
    }
    IntelligentTuningChart.areaCount4 = echarts.init(document.getElementById('areaCount4'));
    IntelligentTuningChart.areaCount4.setOption(option);
    IntelligentTuningChart.areaCount4.resize();
	IntelligentTuningChart.clickChartDateRefreshMapAndDate(IntelligentTuningChart.areaCount4,dateArr);
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.initSpacingAgpsChart
 * @funcdesc 站间距列表图表
 * @param {array} dateArr :  日期列表
 * @param {array} spacingAgpsMrnumArr :  AGPS-MR数量列表
 * @param {array} spacingAgpsPmrnumArr :  覆盖率列表
 * @param {array} spacingAgpsDwrateSumArr :  速率列表
 * @return
 * @author 赵柏杰
 * @create
 * 
 *站间距计算公式：
 *	SPACING_AGPS_MRNUM
 *	*12333,1222,350,47  
 *	*AGPS:总数量
 *	*0-D:      12333-1222
 *	*1-1.5D:   1222-350
 *	1.5-2D:    350-47
 *	>2D:       47
 *	
 *	SPACING_AGPS_PMRNUM
 *	1487,396,124,11
 *	覆盖率：
 *	0-D:    1-(1487-396)/(12333-1222)
 *	1-1.5D: 1-(396-124)/(1222-350)
 *	1.5-2D: 1-(124-11)/(350-47)
 *	>2D:    1-11/47
 *	
 *	SPACING_AGPS_DWRATE_SUM
 *	85,42,13,2
 *	速率：
 *	0-D:    (85-42)/(12333-1222)
 *	1-1.5D: (42-13)/(1222-350)
 *	1.5-2D: (13-2)/(350-47)
 *	>2D:    2/47
 *
 **********************************
 */
IntelligentTuningChart.initSpacingAgpsChart = function IntelligentTuningChart_initSpacingAgpsChart(dateArr,spacingAgpsMrnumArr,spacingAgpsPmrnumArr,spacingAgpsDwrateSumArr) {
    
     var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                crossStyle: {
                    color: '#999'
                }
            },
            position:function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                var obj = {top: 25};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 280;
                return obj;
            },
            formatter:function(params){
            	var date = null;
               	var dataArr = [];
               	var fugailv = $("#fugailv[class='active']").text();
               	var sulv = $("#sulv[class='active']").text();
               	var agpsMRshuliang = $("#agpsMRshuliang[class='active']").text();
               	var unit;
               	if("覆盖率" == fugailv){
               		unit = "%";
               	}else if("速率" == sulv){
               		unit = "Mb/s";
               	}else if("AGPS-MR数量" == agpsMRshuliang){
               		unit = "条";
               	}
	            for(var i = 0; i < params.length; i++){
	            	if(date == null){
	            		date = params[0].name;
	            		dataArr.push(date);
	            		dataArr.push( "<ul>");
	            	}
	            	var seriesName = params[i].seriesName;
	            	var value = params[i].value;
	            	var color = params[i].color;
	            	dataArr.push( "<li><span style='color: "+color+";font-size:20px;'>●</span>&nbsp;&nbsp;"+seriesName+"："+value+" "+unit+"</li>");
	            }
		        dataArr.push( "</ul>");
                return  dataArr.join('');
            }
        },
        legend: {
            data:['覆盖范围','[0 , D)','[D , 1.5D)','[1.5D , 2D)','[2D , +∞)','站间距D='+IntelligentTuningChart.stationSpacing+'米']
        },
        grid: {
            top: 50,
            left: 15,
            right: 20,
            bottom: 10,
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: dateArr,
                axisPointer: {
                    type: 'shadow'
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#272727'
                    }
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '%',
                axisLabel: {
                    formatter: '{value}%',
                    textStyle: {
                        color: '#272727'
                    }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
            }
        ],
        series: [
            {
                name:'[0 , D)',
                type:'bar',
                itemStyle: {
                    normal: {
                        color: '#4CABF5'
                    }
                },
                data:[20, 49, 70, 23, 25, 76, 35,]
            },
            {
                name:'[D , 1.5D)',
                type:'bar',
                itemStyle: {
                    normal: {
                        color: '#919FF5'
                    }
                },
                data:[16, 32, 20, 64, 33,  23, 44]
            },
            {
                name:'[1.5D , 2D)',
                type:'bar',
                itemStyle: {
                    normal: {
                        color: '#99C783'
                    }
                },
                data:[30, 59, 60, 43, 35, 56, 75,]
            },
            {
                name:'[2D , +∞)',
                type:'bar',
                itemStyle: {
                    normal: {
                        color: '#F5B34C'
                    }
                },
                data:[36, 52, 40, 74, 43,  53, 64]
            },
            {
                name:'覆盖范围',
                type:'bar',
                itemStyle: {
                    normal: {
                        color: '#ffffff'
                    }
                },
            },
            {
                name:'站间距D='+IntelligentTuningChart.stationSpacing+'米',
                type:'bar',
                itemStyle: {
                    normal: {
                        color: '#ffffff'
                    }
                },
            },
        ]
    };

    var arr0D=[],arr1D=[],arr15D=[],arr2D=[];
    for(var i = 0; i< spacingAgpsMrnumArr.length; i++){
    	var spacingAgpsMrnum = spacingAgpsMrnumArr[i];
    	if(spacingAgpsMrnum == null || spacingAgpsMrnum == "" || spacingAgpsMrnum == 0){
        	arr0D.push(0);
        	arr1D.push(0);
        	arr15D.push(0);
        	arr2D.push(0);
    	}else{
    		var arr = spacingAgpsMrnum.split(",");
    		var d0 = isUndefined(arr[0]) ? 0 : arr[0];
    		var d1 = isUndefined(arr[1]) ? 0 : arr[1];
    		var d15 = isUndefined(arr[2]) ? 0 : arr[2];
    		var d2 = isUndefined(arr[3]) ? 0 : arr[3];
    		
    		v0D = d0-d1;
    		v1D = d1-d15;
    		v15D = d15-d2;
    		
    		if(v0D == "Infinity" || v0D == "NaN"){
    			v0D = 0;
    		}
    		if(v1D == "Infinity" || v1D == "NaN"){
    			v1D = 0;
    		}
    		if(v15D == "Infinity" || v15D == "NaN"){
    			v15D = 0;
    		}
        	arr0D.push(v0D);
        	arr1D.push(v1D);
        	arr15D.push(v15D);
        	arr2D.push(d2);
    	}
    }
    IntelligentTuningChart.stationSpacing3 = echarts.init(document.getElementById('stationSpacing3'));//AGPS-MR数量
    option.series[0].data = arr0D;
    option.series[1].data = arr1D;
    option.series[2].data = arr15D;
    option.series[3].data = arr2D;
    option.yAxis[0].name = "AGPS-MR数量(条)";
    option.yAxis[0].axisLabel.formatter = "{value}";
    IntelligentTuningChart.stationSpacing3.setOption(option);
    IntelligentTuningChart.stationSpacing3.resize();
	IntelligentTuningChart.clickChartDateRefreshMapAndDate(IntelligentTuningChart.stationSpacing3,dateArr);
    
    //==========================================================================================================================
    
    var arr0D=[],arr1D=[],arr15D=[],arr2D=[];
    for(var i = 0; i< spacingAgpsPmrnumArr.length; i++){
    	var spacingAgpsPmrnum = spacingAgpsPmrnumArr[i];
    	var spacingAgpsMrnum = spacingAgpsMrnumArr[i];
    	if(spacingAgpsPmrnum == null || spacingAgpsPmrnum == "" || spacingAgpsPmrnum == 0 || spacingAgpsMrnum == null || spacingAgpsMrnum == "" || spacingAgpsMrnum == 0){
        	arr0D.push(0);
        	arr1D.push(0);
        	arr15D.push(0);
        	arr2D.push(0);
    	}else{
        	var pmrnumArr = spacingAgpsPmrnum.split(",");
        	var mrnumArr = spacingAgpsMrnum.split(",");
        	
    		var pmrnumD0 = isUndefined(pmrnumArr[0]) ? 0 : pmrnumArr[0];
    		var pmrnumD1 = isUndefined(pmrnumArr[1]) ? 0 : pmrnumArr[1];
    		var pmrnumD15 = isUndefined(pmrnumArr[2]) ? 0 : pmrnumArr[2];
    		var pmrnumD2 = isUndefined(pmrnumArr[3]) ? 0 : pmrnumArr[3];
    		
    		var mrnumD0 = isUndefined(mrnumArr[0]) ? 0 : mrnumArr[0];
    		var mrnumD1 = isUndefined(mrnumArr[1]) ? 0 : mrnumArr[1];
    		var mrnumD15 = isUndefined(mrnumArr[2]) ? 0 : mrnumArr[2];
    		var mrnumD2 = isUndefined(mrnumArr[3]) ? 0 : mrnumArr[3];
    		
    		v0D = ((1-(pmrnumD0-pmrnumD1)/(mrnumD0-mrnumD1)) * 100).toFixed(2);
    		v1D = ((1-(pmrnumD1-pmrnumD15)/(mrnumD1-mrnumD15)) * 100).toFixed(2);
    		v15D = ((1-(pmrnumD15-pmrnumD2)/(mrnumD15-mrnumD2)) * 100).toFixed(2);
    		v2D = ((1-pmrnumD2/mrnumD2) * 100).toFixed(2);
        	
    		if(v0D <= 0.00 || v0D == "Infinity" || v0D == "NaN"){
    			v0D = 0;
    		}
    		if(v1D <= 0.00 || v1D == "Infinity" || v1D == "NaN"){
    			v1D = 0;
    		}
    		if(v15D <= 0.00 || v15D == "Infinity" || v15D == "NaN"){
    			v15D = 0;
    		}
    		if(v2D <= 0.00 || v2D == "Infinity" || v2D == "NaN"){
    			v2D = 0;
    		}
        	arr0D.push(v0D);
        	arr1D.push(v1D);
        	arr15D.push(v15D);
        	arr2D.push(v2D);
    	}
    }
    $("#fugailv").addClass("active").siblings().removeClass("active");
    $("#stationSpacing1").show().siblings().hide();
    IntelligentTuningChart.stationSpacing1 = echarts.init(document.getElementById('stationSpacing1'));//覆盖率
    option.series[0].data = arr0D;
    option.series[1].data = arr1D;
    option.series[2].data = arr15D;
    option.series[3].data = arr2D;
    option.yAxis[0].name = "覆盖率(%)";
    option.yAxis[0].axisLabel.formatter = "{value}%";
    IntelligentTuningChart.stationSpacing1.setOption(option);
    IntelligentTuningChart.stationSpacing1.resize();
	IntelligentTuningChart.clickChartDateRefreshMapAndDate(IntelligentTuningChart.stationSpacing1,dateArr);
	
    //==========================================================================================================================
    
    var arr0D=[],arr1D=[],arr15D=[],arr2D=[];
    for(var i = 0; i< spacingAgpsDwrateSumArr.length; i++){
    	var spacingAgpsDwrateSum = spacingAgpsDwrateSumArr[i];
    	var spacingAgpsMrnum = spacingAgpsMrnumArr[i];
    	if(spacingAgpsDwrateSum == null || spacingAgpsDwrateSum == "" || spacingAgpsDwrateSum == 0 || spacingAgpsMrnum == null || spacingAgpsMrnum == "" || spacingAgpsMrnum == 0){
        	arr0D.push(0);
        	arr1D.push(0);
        	arr15D.push(0);
        	arr2D.push(0);
    	}else{
    		var dwrateSumArr = spacingAgpsDwrateSum.split(",");
        	var mrnumArr = spacingAgpsMrnum.split(",");
    		
    		var dwrateSumD0 = isUndefined(dwrateSumArr[0]) ? 0 : dwrateSumArr[0];
    		var dwrateSumD1 = isUndefined(dwrateSumArr[1]) ? 0 : dwrateSumArr[1];
    		var dwrateSumD15 = isUndefined(dwrateSumArr[2]) ? 0 : dwrateSumArr[2];
    		var dwrateSumD2 = isUndefined(dwrateSumArr[3]) ? 0 : dwrateSumArr[3];
    		
    		var mrnumD0 = isUndefined(mrnumArr[0]) ? 0 : mrnumArr[0];
    		var mrnumD1 = isUndefined(mrnumArr[1]) ? 0 : mrnumArr[1];
    		var mrnumD15 = isUndefined(mrnumArr[2]) ? 0 : mrnumArr[2];
    		var mrnumD2 = isUndefined(mrnumArr[3]) ? 0 : mrnumArr[3];
    		
    		var v0D = ((dwrateSumD0-dwrateSumD1)/(mrnumD0-mrnumD1)).toFixed(2);
    		var v1D = ((dwrateSumD1-dwrateSumD15)/(mrnumD1-mrnumD15)).toFixed(2);
    		var v15D = ((dwrateSumD15-dwrateSumD2)/(mrnumD15-mrnumD2)).toFixed(2);
    		var v2D = (dwrateSumD2/mrnumD2).toFixed(2);
    		if(v0D <= 0.00 || v0D == "Infinity" || v0D == "NaN"){
    			v0D = 0;
    		}
    		if(v1D <= 0.00 || v1D == "Infinity" || v1D == "NaN"){
    			v1D = 0;
    		}
    		if(v15D <= 0.00 || v15D == "Infinity" || v15D == "NaN"){
    			v15D = 0;
    		}
    		if(v2D <= 0.00 || v2D == "Infinity" || v2D == "NaN"){
    			v2D = 0;
    		}
        	arr0D.push(v0D);
        	arr1D.push(v1D);
        	arr15D.push(v15D);
        	arr2D.push(v2D);
    	}
    }
    IntelligentTuningChart.stationSpacing2 = echarts.init(document.getElementById('stationSpacing2'));//速率
    option.series[0].data = arr0D;
    option.series[1].data = arr1D;
    option.series[2].data = arr15D;
    option.series[3].data = arr2D;
    option.yAxis[0].name = "速率(Mb/s)";
    option.yAxis[0].axisLabel.formatter = "{value}Mb/s";
    IntelligentTuningChart.stationSpacing2.setOption(option);
    IntelligentTuningChart.stationSpacing2.resize();
	IntelligentTuningChart.clickChartDateRefreshMapAndDate(IntelligentTuningChart.stationSpacing2,dateArr);
};


/**
 * ********************************
 * @funcname IntelligentTuningChart.initDeviationDistanceChart
 * @funcdesc 偏离距离和偏转角度、下倾角度的图表
 * @param {array} dateArr :  日期列表
 * @param {array} predDistanceArr :  偏离距离列表
 * @param {array} predAzimuthDiffArr :  偏转角度列表
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.initDeviationDistanceChart = function IntelligentTuningChart_initDeviationDistanceChart(dateArr,predDistanceArr,predAzimuthDiffArr,declinationDisparityArr) {
    var option = {
        tooltip: {
            trigger: 'item',
            formatter:function(params){
            	if(params[0] != null){
            		var name = params[0].name;
            		var seriesName = params[0].seriesName;
            		var value = params[0].value;
            		var color = params[0].color;
            		var unit;
            		if("偏离距离" == seriesName){
            			unit = "米";
            		}else if("偏转角度" == seriesName || "下倾角度" == seriesName){
            			unit = "度";
            		}
            		var tooltipArr = [];
            		tooltipArr.push(name);
            		tooltipArr.push("<ul>");
            		tooltipArr.push("<li><span style='color: "+color+";font-size:20px;'>●</span>&nbsp;&nbsp;"+seriesName+"："+value+"&nbsp;&nbsp;"+unit+"</li>");
            		tooltipArr.push("</ul>");
            		return tooltipArr.join('');
            	}
            }
        },
        legend: {
        	
        },
        grid: {
            top: 40,
            left: 15,
            right: 20,
            bottom: 10,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#272727'
                }
            },
            data: dateArr,
            axisPointer: {
                value: IntelligentTuningChart.ymd,
                snap: true,
                lineStyle: {
                    color: '#004E52',
                    opacity: 0.5,
                    width: 2
                },
                handle: {
                    show: true,
                    color: '#004E52'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '距离（米）',
            splitNumber:5,
            axisLabel: {
                textStyle: {
                    color: '#272727'
                }
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [{
        	name:"偏离距离",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(255, 158, 68)'
                    }, {
                        offset: 1,
                        color: 'rgb(255, 70, 131)'
                    }])
                }
            },
            
            itemStyle: {
                normal: {
                	 color: 'rgb(255, 70, 131)'
                }
            },
            markLine:{
                symbol :'none',
                symbolSize : 5,
                data : [{'xAxis': IntelligentTuningChart.ymd}],
                lineStyle : {
                    width: 0.5,
                    color:'#004E52',
                    type :'solid',
                },
                label:{
                    show:false
                }
            }
        }]
    };
    
    
    IntelligentTuningChart.deviationDistance1 = echarts.init(document.getElementById('deviationDistance1'));
    option.series[0].name = "偏离距离";
    option.series[0].data = predDistanceArr;
    option.legend.data = ["偏离距离"];
    option.yAxis.name = "距离（米）";
    IntelligentTuningChart.deviationDistance1.setOption(option);
    IntelligentTuningChart.deviationDistance1.resize();
	IntelligentTuningChart.clickChartDateRefreshMapAndDate(IntelligentTuningChart.deviationDistance1,dateArr);
	
    IntelligentTuningChart.deviationDistance2 = echarts.init(document.getElementById('deviationDistance2'));
    option.series[0].name = "偏转角度";
    option.series[0].data = predAzimuthDiffArr;
    option.legend.data = ["偏转角度"];
    option.yAxis.name = "度（°）";
    IntelligentTuningChart.deviationDistance2.setOption(option);
    IntelligentTuningChart.deviationDistance2.resize();
	IntelligentTuningChart.clickChartDateRefreshMapAndDate(IntelligentTuningChart.deviationDistance2,dateArr);
    
    IntelligentTuningChart.deviationDistance3 = echarts.init(document.getElementById('deviationDistance3'));
    option.series[0].name = "下倾角度";
    option.series[0].data = declinationDisparityArr;
    option.legend.data = ["下倾角度"];
    option.yAxis.name = "度（°）";
    IntelligentTuningChart.deviationDistance3.setOption(option);
    IntelligentTuningChart.deviationDistance3.resize();
	IntelligentTuningChart.clickChartDateRefreshMapAndDate(IntelligentTuningChart.deviationDistance3,dateArr);

};

/**
 * ********************************
 * @funcname IntelligentTuningChart.initFeederLineChart
 * @funcdesc 方向角勘误图表
 * @param {array} result :  方向角对象列表
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.initFeederLineChart = function IntelligentTuningChart_initFeederLineChart(result) {
    var option3 = {
        tooltip: {
            position:function (pos, params, dom, rect, size) {
            	return {left: "10%", top: "30%"};
            },
        	formatter:function(params){
            	var name = params.name;
            	var seriesName = params.seriesName;
            	var value = params.value;
            	var nameArr = seriesName.split("_");
            	var index = nameArr[1];
            	var obj = result[index];
        		var ant_azimuth = obj.ant_azimuth; //台账角度
        		var pred_azimuth = obj.pred_azimuth; //预测角度
        		var pred_azimuth_diff = obj.pred_azimuth_diff == null ? 0 : obj.pred_azimuth_diff; //偏转角度
        		var swap_ant_enodeb_id = obj.swap_ant_enodeb_id == null ? "" : obj.swap_ant_enodeb_id; //接反基站
        		var swap_ant_cell_id = obj.swap_ant_cell_id == null ? "" : obj.swap_ant_cell_id; //接反小区
        		var swap_ant_azimuth = obj.swap_ant_azimuth; //接反角度
        		
        		var tooltipArr = [];
        		tooltipArr.push("<ul>");
            	if(name == "台账角度" || value == ant_azimuth){
            		tooltipArr.push("<li>台账角度："+value+"</li>");
            	}
            	if(name == "预测角度" || value == pred_azimuth){
            		tooltipArr.push("<li>预测角度："+value+"&nbsp;,&nbsp;偏转角度："+pred_azimuth_diff+"</li>");
            	}
            	if(name == "接反" || value == swap_ant_azimuth){
            		tooltipArr.push("<li>接反天馈："+swap_ant_enodeb_id+"_"+swap_ant_cell_id+"&nbsp;,&nbsp;方向角："+value+"</li>");
            	}
            	tooltipArr.push("</ul>");
            	return tooltipArr.join('');
        	}
        },
        series: [
            {
                name: '台账角度',
                type: 'gauge',
                radius: '90%',
                startAngle: 90,
                endAngle: -269.9999,
                min: 0,
                max: 360,
                splitNumber: 4,
                title: {
                    show: false
                },
                detail: {
                    show: false
                },
                splitLine:{
                    show: false,
                    length: 10
                },
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[1, '#91c7ae']],
                        width: 10
                    }
                },
                axisLabel: { //刻度标签
                    formatter: function (t) {
                        if(t=='360'){
                            return '';
                        }
                        return t;
                    }
                },
                pointer:{
                    width: 7,
                    length: '80%'
                },
                data: [{value: 150, name: '台账角度'}]
            },
            {
                name: '接反',
                type: 'gauge',
                radius: '90%',
                startAngle: 90,
                endAngle: -269.9999,
                min: 0,
                max: 360,
                splitNumber: 4,
                title: {
                    show: false
                },
                detail: {
                    show: false
                },
                splitLine:{
                    show: false,
                    length: 10
                },
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[1, '#c23531']],
                        width: 10
                    }
                },
                axisLabel: { //刻度标签
                    formatter: function (t) {
                        if(t=='360'){
                            return '';
                        }
                        return t;
                    }
                },
                pointer:{
                    width: 5,
                    length: '50%'
                },
                data: [{value: 150, name: '接反'}]
            },
            {
                name: '预测角度',
                type: 'gauge',
                radius: '90%',
                startAngle: 90,
                endAngle: -269.9999,
                min: 0,
                max: 360,
                splitNumber: 4,
                title: {
                    show: false
                },
                detail: {
                    show: false
                },
                splitLine:{
                    show: false,
                    length: 10
                },
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[1, '#63869e']],
                        width: 10
                    }
                },
                axisLabel: { //刻度标签
                    formatter: function (t) {
                        if(t=='360'){
                            return '';
                        }
                        return t;
                    }
                },
                pointer:{
                    width: 5,
                    length: '60%'
                },
                itemStyle:{
	        		 normal:{
		        		borderType:'dashed',
		                borderWidth:3,
		    		    borderColor:'#63869e'
		        	 }
	        	 },
                data: [{value: 250, name: '预测角度'}]
            }
        ]
    };
    var option2 = {
    		tooltip: {
    			position:function (pos, params, dom, rect, size) {
    				return {left: "10%", top: "30%"};
    			},
    			formatter:function(params){
    				var name = params.name;
    				var seriesName = params.seriesName;
    				var value = params.value;
    				var nameArr = seriesName.split("_");
    				var index = nameArr[1];
    				var obj = result[index];
    				var ant_azimuth = obj.ant_azimuth; //台账角度
    				var pred_azimuth = obj.pred_azimuth; //预测角度
    				var pred_azimuth_diff = obj.pred_azimuth_diff == null ? 0 : obj.pred_azimuth_diff; //偏转角度
    				
    				var tooltipArr = [];
    				tooltipArr.push("<ul>");
    				if(name == "台账角度" || value == ant_azimuth){
    					tooltipArr.push("<li>台账角度："+value+"</li>");
    				}
    				if(name == "预测角度" || value == pred_azimuth){
    					tooltipArr.push("<li>预测角度："+value+"&nbsp;,&nbsp;偏转角度："+pred_azimuth_diff+"</li>");
    				}
    				tooltipArr.push("</ul>");
    				return tooltipArr.join('');
    			}
    		},
    		series: [
    		         {
    		        	 name: '台账角度',
    		        	 type: 'gauge',
    		        	 radius: '90%',
    		        	 startAngle: 90,
    		        	 endAngle: -269.9999,
    		        	 min: 0,
    		        	 max: 360,
    		        	 splitNumber: 4,
    		        	 title: {
    		        		 show: false
    		        	 },
    		        	 detail: {
    		        		 show: false
    		        	 },
    		        	 splitLine:{
    		        		 show: false,
    		        		 length: 10
    		        	 },
    		        	 axisLine: {            // 坐标轴线
    		        		 lineStyle: {       // 属性lineStyle控制线条样式
    		        			 color: [[1, '#91c7ae']],
    		        			 width: 10
    		        		 }
    		        	 },
    		        	 axisLabel: { //刻度标签
    		        		 formatter: function (t) {
    		        			 if(t=='360'){
    		        				 return '';
    		        			 }
    		        			 return t;
    		        		 }
    		        	 },
    		        	 pointer:{
    		        		 width: 7,
    		        		 length: '80%'
    		        	 },
    		        	 data: [{value: 150, name: '台账角度'}]
    		         },
    		         {
    		        	 name: '预测角度',
    		        	 type: 'gauge',
    		        	 radius: '90%',
    		        	 startAngle: 90,
    		        	 endAngle: -269.9999,
    		        	 min: 0,
    		        	 max: 360,
    		        	 splitNumber: 4,
    		        	 title: {
    		        		 show: false
    		        	 },
    		        	 detail: {
    		        		 show: false
    		        	 },
    		        	 splitLine:{
    		        		 show: false,
    		        		 length: 10
    		        	 },
    		        	 axisLine: {            // 坐标轴线
    		        		 lineStyle: {       // 属性lineStyle控制线条样式
    		        			 color: [[1, '#63869e']],
    		        			 width: 10
    		        		 }
    		        	 },
    		        	 axisLabel: { //刻度标签
    		        		 formatter: function (t) {
    		        			 if(t=='360'){
    		        				 return '';
    		        			 }
    		        			 return t;
    		        		 }
    		        	 },
    		        	 pointer:{
    		        		 width: 5,
    		        		 length: '60%'
    		        	 },
    		        	 itemStyle:{
    		        		 normal:{
    		        			borderType:'dashed',
    		                    borderWidth:3,
    		    		        borderColor:'#63869e'
    		        		 }
    		        	 },
    		        	 data: [{value: 250, name: '预测角度'}]
    		         }
    		]
    };
    
	if(!isUndefined(IntelligentTuningChart.chartGauge1)){//方向角勘误
		IntelligentTuningChart.chartGauge1.dispose();
		IntelligentTuningChart.chartGauge1 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartGauge2)){//方向角勘误
		IntelligentTuningChart.chartGauge2.dispose();
		IntelligentTuningChart.chartGauge2 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartGauge3)){//方向角勘误
		IntelligentTuningChart.chartGauge3.dispose();
		IntelligentTuningChart.chartGauge3 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartGauge4)){//方向角勘误
		IntelligentTuningChart.chartGauge4.dispose();
		IntelligentTuningChart.chartGauge4 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartGauge5)){//方位角勘误
		IntelligentTuningChart.chartGauge5.dispose();
		IntelligentTuningChart.chartGauge5 = null;
	}

	for(var i = 0; i < result.length; i++){
		var day = result[i].day.toString(); //日期
		var ant_azimuth = result[i].ant_azimuth; //台账角度
		var pred_azimuth = result[i].pred_azimuth; //预测角度
		var pred_azimuth_diff = result[i].pred_azimuth_diff; //偏转角度
		var swap_ant_enodeb_id = result[i].swap_ant_enodeb_id; //接反基站
		var swap_ant_cell_id = result[i].swap_ant_cell_id; //接反小区
		var swap_ant_azimuth = result[i].swap_ant_azimuth; //接反角度
		
		var y = day.substring(0,4);
		var m = day.substring(4,6);
		var d = day.substring(6,8);
		if(!isUndefined(m) && m.indexOf("0") == 0){
			m = m.substring(1);
		}
		day = y+"/"+m+"/"+d;
		
		if(i == 0){
			$(".chartGaugeDay").eq(0).text(day);
		    IntelligentTuningChart.chartGauge1 = echarts.init(document.getElementById('chartGauge1'));
		    if(swap_ant_azimuth == null){
		    	option2.series[0].data[0].value = ant_azimuth == null ? 0 : ant_azimuth;
		    	option2.series[1].data[0].value = pred_azimuth == null ? 0 : pred_azimuth;
		    	option2.series[0].name = "台账角度_0";
		    	option2.series[1].name = "预测角度_0";
		    	IntelligentTuningChart.chartGauge1.setOption(option2);
		    	IntelligentTuningChart.chartGauge1.resize();
		    }else{
		    	option3.series[0].data[0].value = ant_azimuth == null ? 0 : ant_azimuth;
		    	option3.series[1].data[0].value = swap_ant_azimuth == null ? 0 : swap_ant_azimuth;
		    	option3.series[2].data[0].value = pred_azimuth == null ? 0 : pred_azimuth;
		    	option3.series[0].name = "台账角度_0";
		    	option3.series[1].name = "接反_0";
		    	option3.series[2].name = "预测角度_0";
		    	IntelligentTuningChart.chartGauge1.setOption(option3);
		    	IntelligentTuningChart.chartGauge1.resize();
		    }
		}else if(i == 1){
			$(".chartGaugeDay").eq(1).text(day);
		    IntelligentTuningChart.chartGauge2 = echarts.init(document.getElementById('chartGauge2'));
		    if(swap_ant_azimuth == null){
		    	option2.series[0].data[0].value = ant_azimuth == null ? 0 : ant_azimuth;
		    	option2.series[1].data[0].value = pred_azimuth == null ? 0 : pred_azimuth;
		    	option2.series[0].name = "台账角度_1";
		    	option2.series[1].name = "预测角度_1";
		    	IntelligentTuningChart.chartGauge2.setOption(option2);
		    	IntelligentTuningChart.chartGauge2.resize();
		    }else{
		    	option3.series[0].data[0].value = ant_azimuth == null ? 0 : ant_azimuth;
		    	option3.series[1].data[0].value = swap_ant_azimuth == null ? 0 : swap_ant_azimuth;
		    	option3.series[2].data[0].value = pred_azimuth == null ? 0 : pred_azimuth;
		    	option3.series[0].name = "台账角度_1";
		    	option3.series[1].name = "接反_1";
		    	option3.series[2].name = "预测角度_1";
		    	IntelligentTuningChart.chartGauge2.setOption(option3);
		    	IntelligentTuningChart.chartGauge2.resize();
		    }
		}else if(i == 2){
			$(".chartGaugeDay").eq(2).text(day);
		    IntelligentTuningChart.chartGauge3 = echarts.init(document.getElementById('chartGauge3'));
		    if(swap_ant_azimuth == null){
		    	option2.series[0].data[0].value = ant_azimuth == null ? 0 : ant_azimuth;
		    	option2.series[1].data[0].value = pred_azimuth == null ? 0 : pred_azimuth;
		    	option2.series[0].name = "台账角度_2";
		    	option2.series[1].name = "预测角度_2";
		    	IntelligentTuningChart.chartGauge3.setOption(option2);
		    	IntelligentTuningChart.chartGauge3.resize();
		    }else{
		    	option3.series[0].data[0].value = ant_azimuth == null ? 0 : ant_azimuth;
		    	option3.series[1].data[0].value = swap_ant_azimuth == null ? 0 : swap_ant_azimuth;
		    	option3.series[2].data[0].value = pred_azimuth == null ? 0 : pred_azimuth;
		    	option3.series[0].name = "台账角度_2";
		    	option3.series[1].name = "接反_2";
		    	option3.series[2].name = "预测角度_2";
		    	IntelligentTuningChart.chartGauge3.setOption(option3);
		    	IntelligentTuningChart.chartGauge3.resize();
		    }
		}else if(i == 3){
			$(".chartGaugeDay").eq(3).text(day);
		    IntelligentTuningChart.chartGauge4 = echarts.init(document.getElementById('chartGauge4'));
		    if(swap_ant_azimuth == null){
		    	option2.series[0].data[0].value = ant_azimuth == null ? 0 : ant_azimuth;
		    	option2.series[1].data[0].value = pred_azimuth == null ? 0 : pred_azimuth;
		    	option2.series[0].name = "台账角度_3";
		    	option2.series[1].name = "预测角度_3";
		    	IntelligentTuningChart.chartGauge4.setOption(option2);
		    	IntelligentTuningChart.chartGauge4.resize();
		    }else{
		    	option3.series[0].data[0].value = ant_azimuth == null ? 0 : ant_azimuth;
		    	option3.series[1].data[0].value = swap_ant_azimuth == null ? 0 : swap_ant_azimuth;
		    	option3.series[2].data[0].value = pred_azimuth == null ? 0 : pred_azimuth;
		    	option3.series[0].name = "台账角度_3";
		    	option3.series[1].name = "接反_3";
		    	option3.series[2].name = "预测角度_3";
		    	IntelligentTuningChart.chartGauge4.setOption(option3);
		    	IntelligentTuningChart.chartGauge4.resize();
		    }
		}else if(i == 4){
			$(".chartGaugeDay").eq(4).text(day);
		    IntelligentTuningChart.chartGauge5 = echarts.init(document.getElementById('chartGauge5'));
		    if(swap_ant_azimuth == null){
		    	option2.tooltip.position = function (pos, params, dom, rect, size) {
    				return {right: "50%", top: "30%"};
    			};
		    	option2.series[0].data[0].value = ant_azimuth == null ? 0 : ant_azimuth;
		    	option2.series[1].data[0].value = pred_azimuth == null ? 0 : pred_azimuth;
		    	option2.series[0].name = "台账角度_4";
		    	option2.series[1].name = "预测角度_4";
		    	IntelligentTuningChart.chartGauge5.setOption(option2);
		    	IntelligentTuningChart.chartGauge5.resize();
		    }else{
		    	option3.tooltip.position = function (pos, params, dom, rect, size) {
		    		return {right: "50%", top: "30%"};
    			};
		    	option3.series[0].data[0].value = ant_azimuth == null ? 0 : ant_azimuth;
		    	option3.series[1].data[0].value = swap_ant_azimuth == null ? 0 : swap_ant_azimuth;
		    	option3.series[2].data[0].value = pred_azimuth == null ? 0 : pred_azimuth;
		    	option3.series[0].name = "台账角度_4";
		    	option3.series[1].name = "接反_4";
		    	option3.series[2].name = "预测角度_4";
		    	IntelligentTuningChart.chartGauge5.setOption(option3);
		    	IntelligentTuningChart.chartGauge5.resize();
		    }
		}
	}

};

/**
 * ********************************
 * @funcname IntelligentTuningChart.initdeviationDistanceChart
 * @funcdesc 下倾角勘误图表
 * @param {array} result :  下倾角对象列表
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.initDeclinationDisparityChart = function IntelligentTuningChart_initDeclinationDisparityChart(result) {
    var option2 = {
    		tooltip: {
    			position:function (pos, params, dom, rect, size) {
    				return {left: "10%", top: "30%"};
    			},
    			formatter:function(params){
    				var name = params.name;
    				var seriesName = params.seriesName;
    				var value = params.value;
    				var nameArr = seriesName.split("_");
    				var index = nameArr[1];
    				
    				var tooltipArr = [];
    				tooltipArr.push("<ul>");
    				if(name == "台账下倾角"){
    					tooltipArr.push("<li>台账下倾角："+value+"</li>");
    				}
    				if(name == "预测下倾角"){
    					tooltipArr.push("<li>预测下倾角："+value+"</li>");
    				}
    				tooltipArr.push("</ul>");
    				return tooltipArr.join('');
    			}
    		},
    		series: [
    		         {
    		        	 name: '台账下倾角',
    		        	 type: 'gauge',
    		        	 radius: '90%',
    		        	 startAngle: 90,
    		        	 endAngle: -269.9999,
    		        	 min: 0,
    		        	 max: 360,
    		        	 splitNumber: 4,
    		        	 title: {
    		        		 show: false
    		        	 },
    		        	 detail: {
    		        		 show: false
    		        	 },
    		        	 splitLine:{
    		        		 show: false,
    		        		 length: 10
    		        	 },
    		        	 axisLine: {            // 坐标轴线
    		        		 lineStyle: {       // 属性lineStyle控制线条样式
    		        			 color: [[1, '#91c7ae']],
    		        			 width: 10
    		        		 }
    		        	 },
    		        	 axisLabel: { //刻度标签
    		        		 formatter: function (t) {
    		        			 if(t=='360'){
    		        				 return '';
    		        			 }
    		        			 return t;
    		        		 }
    		        	 },
    		        	 pointer:{
    		        		 width: 7,
    		        		 length: '80%'
    		        	 },
    		        	 data: [{value: 150, name: '台账下倾角'}]
    		         },
    		         {
    		        	 name: '预测下倾角',
    		        	 type: 'gauge',
    		        	 radius: '90%',
    		        	 startAngle: 90,
    		        	 endAngle: -269.9999,
    		        	 min: 0,
    		        	 max: 360,
    		        	 splitNumber: 4,
    		        	 title: {
    		        		 show: false
    		        	 },
    		        	 detail: {
    		        		 show: false
    		        	 },
    		        	 splitLine:{
    		        		 show: false,
    		        		 length: 10
    		        	 },
    		        	 axisLine: {            // 坐标轴线
    		        		 lineStyle: {       // 属性lineStyle控制线条样式
    		        			 color: [[1, '#63869e']],
    		        			 width: 10
    		        		 }
    		        	 },
    		        	 axisLabel: { //刻度标签
    		        		 formatter: function (t) {
    		        			 if(t=='360'){
    		        				 return '';
    		        			 }
    		        			 return t;
    		        		 }
    		        	 },
    		        	 pointer:{
    		        		 width: 5,
    		        		 length: '60%'
    		        	 },
    		        	 itemStyle:{
    		        		 normal:{
    		        			borderType:'dashed',
    		                    borderWidth:3,
    		    		        borderColor:'#63869e'
    		        		 }
    		        	 },
    		        	 data: [{value: 250, name: '预测下倾角'}]
    		         }
    		]
    };
    
    for(var i = result.length-1; i > result.length-6; i--){
		var day = result[i].day.toString(); //日期
		var ant_declination_angle = result[i].ant_declination_angle; //台账总下倾角
		var pred_ant_declination_angle = result[i].pred_ant_declination_angle; //预测总下倾角
		
		var y = day.substring(0,4);
		var m = day.substring(4,6);
		var d = day.substring(6,8);
		if(!isUndefined(m) && m.indexOf("0") == 0){
			m = m.substring(1);
		}
		day = y+"/"+m+"/"+d;
		
		if(i == result.length - 1){
		    $(".chartGaugeDay").eq(9).text(day);
		    IntelligentTuningChart.chartDistance5 = echarts.init(document.getElementById('chartDistance5'));
		    option2.series[0].data[0].value = ant_declination_angle == null ? 0 : ant_declination_angle;
			option2.series[1].data[0].value = pred_ant_declination_angle == null ? 0 : pred_ant_declination_angle;
			option2.series[0].name = "台账下倾角";
			option2.series[1].name = "预测下倾角";
			IntelligentTuningChart.chartDistance5.setOption(option2);
			IntelligentTuningChart.chartDistance5.resize();
		}else if(i == result.length - 2){
		    $(".chartGaugeDay").eq(8).text(day);
		    IntelligentTuningChart.chartDistance4 = echarts.init(document.getElementById('chartDistance4'));
		    option2.series[0].data[0].value = ant_declination_angle == null ? 0 : ant_declination_angle;
			option2.series[1].data[0].value = pred_ant_declination_angle == null ? 0 : pred_ant_declination_angle;
			option2.series[0].name = "台账下倾角";
			option2.series[1].name = "预测下倾角";
			IntelligentTuningChart.chartDistance4.setOption(option2);
			IntelligentTuningChart.chartDistance4.resize();
		}else if(i == result.length - 3){
		    $(".chartGaugeDay").eq(7).text(day);
		    IntelligentTuningChart.chartDistance3 = echarts.init(document.getElementById('chartDistance3'));
		    option2.series[0].data[0].value = ant_declination_angle == null ? 0 : ant_declination_angle;
			option2.series[1].data[0].value = pred_ant_declination_angle == null ? 0 : pred_ant_declination_angle;
			option2.series[0].name = "台账下倾角";
			option2.series[1].name = "预测下倾角";
			IntelligentTuningChart.chartDistance3.setOption(option2);
			IntelligentTuningChart.chartDistance3.resize();
		}else if(i == result.length - 4){
		    $(".chartGaugeDay").eq(6).text(day);
		    IntelligentTuningChart.chartDistance2 = echarts.init(document.getElementById('chartDistance2'));
		    option2.series[0].data[0].value = ant_declination_angle == null ? 0 : ant_declination_angle;
			option2.series[1].data[0].value = pred_ant_declination_angle == null ? 0 : pred_ant_declination_angle;
			option2.series[0].name = "台账下倾角";
			option2.series[1].name = "预测下倾角";
			IntelligentTuningChart.chartDistance2.setOption(option2);
			IntelligentTuningChart.chartDistance2.resize();
		}else if(i == result.length - 5){
		    $(".chartGaugeDay").eq(5).text(day);
		    IntelligentTuningChart.chartDistance1 = echarts.init(document.getElementById('chartDistance1'));
		    option2.series[0].data[0].value = ant_declination_angle == null ? 0 : ant_declination_angle;
			option2.series[1].data[0].value = pred_ant_declination_angle == null ? 0 : pred_ant_declination_angle;
			option2.series[0].name = "台账下倾角";
			option2.series[1].name = "预测下倾角";
			IntelligentTuningChart.chartDistance1.setOption(option2);
			IntelligentTuningChart.chartDistance1.resize();
		}
    }
};


/**
 * ********************************
 * @funcname IntelligentTuningChart.initUserStatisticsChart
 * @funcdesc 用户统计图表
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.initUserStatisticsChart = function IntelligentTuningChart_initUserStatisticsChart(biaoshi,dayArr,seriesDataArr1,seriesDataArr2,seriesDataArr3){
    
	  var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    crossStyle: {
                        color: '#999'
                    }
                },
                position:function (pos, params, dom, rect, size) {
                    // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                    var obj = {top: 25};
                    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 280;
                    return obj;
                },
                formatter:function(params){
                	var date = null;
                   	var dataArr = [];
                   	var residentUserNumText = $("#residentUserNum[class='active']").text();
                   	var flowStatisticsText = $("#flowStatistics[class='active']").text();
                   	var unit = "";
                   	if("常驻用户" == residentUserNumText){
                   		unit = "人";
                   	}else if("流量统计" == flowStatisticsText){
                   		unit = "MB";
                   	}
    	            for(var i = 0; i < params.length; i++){
    	            	if(date == null){
    	            		date = params[0].name;
    	            		dataArr.push(date);
    	            		dataArr.push( "<ul>");
    	            	}
    	            	var seriesName = params[i].seriesName;
    	            	var value = params[i].value;
    	            	var color = params[i].color;
    	            	dataArr.push( "<li><span style='color: "+color+";font-size:20px;'>●</span>&nbsp;&nbsp;"+seriesName+"："+value+" "+unit+"</li>");
    	            }
    		        dataArr.push( "</ul>");
                    return  dataArr.join('');
                }
            },
            legend: {
                data:['本地用户数','省内漫入用户数','省外漫入用户数']
            },
            grid: {
                top: 50,
                left: 15,
                right: 20,
                bottom: 10,
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: dayArr,
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#272727'
                        }
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '人',
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#272727'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                }
            ],
            series: [
                {
                    name:'本地用户数',
                    type:'bar',
                    itemStyle: {
                        normal: {
                            color: '#4CABF5'
                        }
                    },
                    data:seriesDataArr1
                },
                {
                    name:'省内漫入用户数',
                    type:'bar',
                    itemStyle: {
                        normal: {
                            color: '#919FF5'
                        }
                    },
                    data:seriesDataArr2
                },
                {
                    name:'省外漫入用户数',
                    type:'bar',
                    itemStyle: {
                        normal: {
                            color: '#99C783'
                        }
                    },
                    data:seriesDataArr3
                }
            ]
        };
    
	if("user" == biaoshi){
	    IntelligentTuningChart.residentUserNumChart = echarts.init(document.getElementById('residentUserNumChart'));//常驻用户
	    IntelligentTuningChart.residentUserNumChart.setOption(option);
	    IntelligentTuningChart.residentUserNumChart.resize();
	}else if("flow" == biaoshi){
	    IntelligentTuningChart.flowStatisticsChart = echarts.init(document.getElementById('flowStatisticsChart'));//常驻用户
	    option.series[0].name = "本地用户流量";
	    option.series[1].name = "省内漫入用户流量";
	    option.series[2].name = "省外漫入用户流量";
	    option.legend.data=['本地用户流量','省内漫入用户流量','省外漫入用户流量'];
	    option.yAxis[0].name = "MB";
//	    option.yAxis[0].axisLabel.formatter = "{value}";
	    IntelligentTuningChart.flowStatisticsChart.setOption(option);
	    IntelligentTuningChart.flowStatisticsChart.resize();
	}
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.initCellIndexChart
 * @funcdesc 小区质量评估指标图表(暂时不做)
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.initCellIndexChart = function IntelligentTuningChart_initCellIndexChart() {
    var base = +new Date(1968, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];

    var data = [Math.random() * 300];

    for (var i = 1; i < 20000; i++) {
        var now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }

    var option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        grid: {
            top: 20,
            left: 10,
            right: 20,
            bottom: 10,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#272727'
                }
            },
            data: date
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#272727'
                }
            }
        },
        series: [
            {
                name:'模拟数据',
                type:'line',
                smooth:true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: 'rgb(255, 70, 131)'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(255, 158, 68)'
                        }, {
                            offset: 1,
                            color: 'rgb(255, 70, 131)'
                        }])
                    }
                },
                data: data
            }
        ]
    };

    IntelligentTuningChart.cellIndex1 = echarts.init(document.getElementById('cellIndex1'));
    IntelligentTuningChart.cellIndex1.setOption(option);
    IntelligentTuningChart.cellIndex1.resize();
};


/**
 * ********************************
 * @funcname IntelligentTuningChart.echartsDispose
 * @funcdesc 销毁echarts对象，避免图表缓存
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.echartsDispose = function IntelligentTuningChart_echartsDispose(){
	if(!isUndefined(IntelligentTuningChart.chartRate1)){//弱覆盖占比
		IntelligentTuningChart.chartRate1.dispose();
		IntelligentTuningChart.chartRate1 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartRate2)){//过覆盖占比
		IntelligentTuningChart.chartRate2.dispose();
		IntelligentTuningChart.chartRate2 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartRate3)){//重叠覆盖占比
		IntelligentTuningChart.chartRate3.dispose();
		IntelligentTuningChart.chartRate3 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartMOD3)){//干扰占比
		IntelligentTuningChart.chartMOD3.dispose();
		IntelligentTuningChart.chartMOD3 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartRate5)){//坐标勘误
		IntelligentTuningChart.chartRate5.dispose();
		IntelligentTuningChart.chartRate5 = null;
	}
	if(!isUndefined(IntelligentTuningChart.deviationDistance1)){//偏离距离
		IntelligentTuningChart.deviationDistance1.dispose();
		IntelligentTuningChart.deviationDistance1 = null;
	}
	if(!isUndefined(IntelligentTuningChart.deviationDistance2)){//偏转角度
		IntelligentTuningChart.deviationDistance2.dispose();
		IntelligentTuningChart.deviationDistance2 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartGauge1)){//方向角勘误
		IntelligentTuningChart.chartGauge1.dispose();
		IntelligentTuningChart.chartGauge1 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartGauge2)){//方向角勘误
		IntelligentTuningChart.chartGauge2.dispose();
		IntelligentTuningChart.chartGauge2 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartGauge3)){//方向角勘误
		IntelligentTuningChart.chartGauge3.dispose();
		IntelligentTuningChart.chartGauge3 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartGauge4)){//方向角勘误
		IntelligentTuningChart.chartGauge4.dispose();
		IntelligentTuningChart.chartGauge4 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartGauge5)){//方位角勘误
		IntelligentTuningChart.chartGauge5.dispose();
		IntelligentTuningChart.chartGauge5 = null;
	}
	if(!isUndefined(IntelligentTuningChart.deviationDistance3)){//下倾角勘误
		IntelligentTuningChart.deviationDistance3.dispose();
		IntelligentTuningChart.deviationDistance3 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartDistance1)){//下倾角勘误
		IntelligentTuningChart.chartDistance1.dispose();
		IntelligentTuningChart.chartDistance1 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartDistance2)){//下倾角勘误
		IntelligentTuningChart.chartDistance2.dispose();
		IntelligentTuningChart.chartDistance2 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartDistance3)){//下倾角勘误
		IntelligentTuningChart.chartDistance3.dispose();
		IntelligentTuningChart.chartDistance3 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartDistance4)){//下倾角勘误
		IntelligentTuningChart.chartDistance4.dispose();
		IntelligentTuningChart.chartDistance4 = null;
	}
	if(!isUndefined(IntelligentTuningChart.chartDistance5)){//下倾角勘误
		IntelligentTuningChart.chartDistance5.dispose();
		IntelligentTuningChart.chartDistance5 = null;
	}
	if(!isUndefined(IntelligentTuningChart.areaCount1)){//300米内
		IntelligentTuningChart.areaCount1.dispose();
		IntelligentTuningChart.areaCount1 = null;
	}
	if(!isUndefined(IntelligentTuningChart.areaCount2)){//500米内
		IntelligentTuningChart.areaCount2.dispose();
		IntelligentTuningChart.areaCount2 = null;
	}
	if(!isUndefined(IntelligentTuningChart.areaCount3)){//1公里内
		IntelligentTuningChart.areaCount3.dispose();
		IntelligentTuningChart.areaCount3 = null;
	}
	if(!isUndefined(IntelligentTuningChart.areaCount4)){//3公里内
		IntelligentTuningChart.areaCount4.dispose();
		IntelligentTuningChart.areaCount4 = null;
	}
	if(!isUndefined(IntelligentTuningChart.stationSpacing1)){//覆盖率
		IntelligentTuningChart.stationSpacing1.dispose();
		IntelligentTuningChart.stationSpacing1 = null;
	}
	if(!isUndefined(IntelligentTuningChart.stationSpacing2)){//速率
		IntelligentTuningChart.stationSpacing2.dispose();
		IntelligentTuningChart.stationSpacing2 = null;
	}
	if(!isUndefined(IntelligentTuningChart.stationSpacing3)){//AGPS-MR数量
		IntelligentTuningChart.stationSpacing3.dispose();
		IntelligentTuningChart.stationSpacing3 = null;
	}
	if(!isUndefined(IntelligentTuningChart.cellIndex1)){//负荷
		IntelligentTuningChart.cellIndex1.dispose();
		IntelligentTuningChart.cellIndex1 = null;
	}
	if(!isUndefined(IntelligentTuningChart.cellIndex1)){//空口指标
		IntelligentTuningChart.cellIndex1.dispose();
		IntelligentTuningChart.cellIndex1 = null;
	}
	if(!isUndefined(IntelligentTuningChart.cellIndex1)){//覆盖
		IntelligentTuningChart.cellIndex1.dispose();
		IntelligentTuningChart.cellIndex1 = null;
	}
	if(!isUndefined(IntelligentTuningChart.cellIndex1)){//干扰
		IntelligentTuningChart.cellIndex1.dispose();
		IntelligentTuningChart.cellIndex1 = null;
	}
	if(!isUndefined(IntelligentTuningChart.cellIndex1)){//空口感知
		IntelligentTuningChart.cellIndex1.dispose();
		IntelligentTuningChart.cellIndex1 = null;
	}
	if(!isUndefined(IntelligentTuningChart.cellIndex1)){//繁忙度
		IntelligentTuningChart.cellIndex1.dispose();
		IntelligentTuningChart.cellIndex1 = null;
	}
	if(!isUndefined(IntelligentTuningChart.cellIndex1)){//用户
		IntelligentTuningChart.cellIndex1.dispose();
		IntelligentTuningChart.cellIndex1 = null;
	}
	if(!isUndefined(cellIndex1.cellIndex1)){//告警
		IntelligentTuningChart.cellIndex1.dispose();
		IntelligentTuningChart.cellIndex1 = null;
	}
	if(!isUndefined(cellIndex1.residentUserNumChart)){//用户统计
		IntelligentTuningChart.residentUserNumChart.dispose();
		IntelligentTuningChart.residentUserNumChart = null;
	}
	if(!isUndefined(cellIndex1.flowStatisticsChart)){//流量统计
		IntelligentTuningChart.flowStatisticsChart.dispose();
		IntelligentTuningChart.flowStatisticsChart = null;
	}
};


function toDecimal2(num){
	var reg1 = /^-?\d+\.\d{1}$/;
	var reg2 = /^-?\d+\.\d*$/;
	if(reg1.test(num)){
		num = num+"0";
	}else if(!reg2.test(num)){
		num = num+".00";
	}else{
		num = num+"";
		var index = num.indexOf(".");
		num = num.substr(0,index+3); 
	}
	return num;
};

function isUndefined(obj){
	if("undefined"==typeof(obj)||obj===""||obj==null){
		return true;
	}else{
		return false;
	}
};

IntelligentTuningChart.stringToDate = function IntelligentTuningChart_stringToDate(dateStr){
	var dateArr = dateStr.split(" ");
    dateArr = dateArr[0].split("-");
    var year = dateArr[0];//parseInt();
    var month;
    //处理月份为04这样的情况                         
    if(!isUndefined(dateArr[1]) && dateArr[1].indexOf("0") == 0){
        month = dateArr[1].substring(1);//parseInt();
    }else{
         month = dateArr[1];//parseInt();
    }
    var day = dateArr[2];//parseInt();
    IntelligentTuningChart.ymd = year+"/"+month+"/"+day;
    IntelligentTuningChart.md = month+"/"+day;
    var date = new Date(year,month -1,day);
    return date;
};

/**
 * ********************************
 * @funcname IntelligentTuningChart.clickChartDateRefreshMapAndDate
 * @funcdesc 点击图表后更新地图的日期和地图
 * @return
 * @author 赵柏杰
 * @create
 **********************************
 */
IntelligentTuningChart.clickChartDateRefreshMapAndDate = function IntelligentTuningChart_clickChartDateRefreshMapAndDate(chartObj,dateArr){
	
	chartObj.getZr().on('click',params=>{
        var pointInPixel= [params.offsetX, params.offsetY];
        if (chartObj.containPixel('grid',pointInPixel)) {
            /*事件处理代码书写位置*/
            let xIndex=chartObj.convertFromPixel({seriesIndex:0},[params.offsetX, params.offsetY])[0];
			var day = dateArr[xIndex];
		 	var dayArr = day.split("/");
	 		var y = dayArr[0];
	 		var m = dayArr[1];
	 		var d = dayArr[2];
	 		if(m.length == 1){
	 			m = "0"+m;
	 		}
	 		$("#seachTime").text(y+m+d);
			changeDate();
        };
    });
}

/**
 * 获取年月日
 */
function getDateYYYYMMDD(myDate){
	var curYear = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
	var curMonth = noceUtil.fomatMD(myDate.getMonth()+1);       //获取当前月份(0-11,0代表1月)+1
	var curDay = noceUtil.fomatMD(myDate.getDate());        //获取当前日(1-31)	
	return curYear+curMonth+curDay;
};

/**
 * 获取两个日期之间的日期
 * */
function getBetweenDateStr(start,end){
	IntelligentTuningChart.dayArr = [];
//    var beginDay = start.split("-");
//    var endDay = end.split("-");
    var diffDay = new Date();
    var dateList = new Array;
    var i = 0;
    diffDay.setDate(start.substring(6,8));
    diffDay.setMonth(start.substring(4,6)-1);
    diffDay.setFullYear(start.substring(0,4));
    IntelligentTuningChart.dayArr.push(start);
    while(i == 0){
        var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
        diffDay.setTime(countDay);
        dateList[2] = diffDay.getDate();
        dateList[1] = diffDay.getMonth() + 1;
        dateList[0] = diffDay.getFullYear();
        if(String(dateList[1]).length == 1){dateList[1] = "0"+dateList[1];};
        if(String(dateList[2]).length == 1){dateList[2] = "0"+dateList[2];};
        IntelligentTuningChart.dayArr.push(dateList[0]+""+dateList[1]+""+dateList[2]);
        if(dateList[0] == end.substring(0,4) && dateList[1] == end.substring(4,6) && dateList[2] == end.substring(6,8)){ 
        	i = 1;
        };
    };
//    console.log(IntelligentTuningChart.dayArr);
};


function loadBefore_N_Day(n){
	var queryTime = IntelligentTuningChart.queryTime;
	if(isUndefined(queryTime)){
		queryTime = $("#lastUpdateTime").text();
	}
	if(!isUndefined(queryTime) && queryTime.length == 8){
		var year = queryTime.substring(0,4);
		var month = queryTime.substring(4,6);
		if(!isUndefined(month) && month.indexOf("0") == 0){
			 month = month.substring(1);
		}
		var day =  queryTime.substring(6,8);
		IntelligentTuningChart.ymd = year+"/"+month+"/"+day;
//		if(IntelligentTuningChart.ymd == null){
//		}
		IntelligentTuningChart.md = month+"/"+day;
//		if(IntelligentTuningChart.md == null){
//		}
		var date = new Date(year,month -1,day);
		var startTime = new Date(date.getTime() - 24*60*60*1000*n); //前n天
		IntelligentTuningChart.startTime = getDateYYYYMMDD(startTime);
		IntelligentTuningChart.endTime = queryTime;
	}
}

