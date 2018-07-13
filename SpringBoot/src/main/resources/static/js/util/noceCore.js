var noce = {};
//noce.appId = "perce";// 全局，记录当前应用id,默认"appRadar"雷达图 situation
noce.appId = "";
//noce.newPageApps = [ 'customPrece', "situation", "appRadar", "busPerception", "fourGPlus","perce" ];
noce.getEachart = function() {
	if (typeof (noce.ec) == "undefined") {
		require.config({
			packages : [ {
				name : 'zrender',
				location : '../js/zrender-2.0.2/src', // zrender与echarts在同一级目录
				main : 'zrender'
			}, {
				name : 'echarts',
				location : '../js/echarts-2.0.2/src',
				main : 'echarts'
			}, {
				name : 'BMap',
				location : '../js/echarts-2.0.2/BMap/src',
				main : 'main'
			} ]
		});

		/*
		 * 按需加载
		 */
		require([ 'echarts', 'BMap', 'echarts/chart/line', 'echarts/chart/bar', 'echarts/chart/gauge', 'echarts/chart/pie', 'echarts/chart/funnel', 'echarts/chart/radar',
				'echarts/chart/map'],
				
		// 渲染ECharts图表
		function DrawEChart(ec, BMapExtension) {
			noce.ec = ec;
			noce.BMapExtension = BMapExtension;
			var appId = noce.appId;
			if (!noceUtil.isUndefined($("#currentAppId").val())) {  //??
				appId = $("#currentAppId").val();
			}
			var noticeId = noceUtil.GetQueryString("noticeId");
			var showID = noceUtil.GetQueryString("showID");
			//首页点击公告时，不需要再触发公告管理
			if(noceUtil.isUndefined(noticeId) && noceUtil.isUndefined(showID)){
				$("#" + appId).click();
			}
			
//			exsit = true;
//			for ( var i = 0; i <= noce.newPageApps.length; i++) {  //??
//				if (appId == noce.newPageApps[i]) {
//					$("#" + appId).click();
//					exsit = true;
//					break;
//				}
//			}

			// if(!exsit){
			// $("#appRadar").click();
			// }
			//				

			return noce.ec;  //返回echarts对象
		});
	} else {
		return noce.ec;
	}
};

noce.init = function() {
	limitTime.initWdate();// 时间范围
	areaUtil.initArea();// 地域粒度
	topN.init();
	situation.init();// 优良率
	customPrece.init();// 客服感知
	appRadar.init();// 雷达图
	noceUtil.showCurrentOption();// 展示当前应用的查询条件
};
$(function(){
	noce.appId = $('#currentAppId').val();
	noce.perId = $('#currentPerId').val();
});
