<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<link rel="stylesheet" type="text/css" href="../js/tableTools/tableToolsNewTwo.css"/>	
<link rel="stylesheet" type="text/css" href="../js/IntelligentRoadTestV3/IntelligentRoadTestV2.css?2017090911" />
<link rel="stylesheet" type="text/css" href="../js/IntelligentRoadTestV3/countdown.css?2017090911" />
<script type="text/javascript" src="../js/util/uploadData.js"></script> 	
<!-- 增加progressbarTwo的查询数据同步方法 -->
<script type="text/javascript" src="../js/util/progressbarTwo.js?2017022803"></script>
<script type="text/javascript" src="../js/perception/cityJson.js"></script>
<script type="text/javascript" src="../js/util/areaUtil.js?2017031401"></script>
<script type="text/javascript" src="../js/util/GridMapControl.js?201706788566"></script>
<!-- <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=BRBlNEMNKB7jwL2kAULKI66G"></script> -->
<!-- <script type="text/javascript" src="../js/util/baidumap_offline_v2_20160921.js"></script>-->
<script type="text/javascript" src="../js/util/baidumap_offline_v3.js"></script> 
<script type="text/javascript" src="../js/IntelligentRoadTestV3/myBMapTypeControl.js"></script>
<div class="pc_listb" id="pc_listb_IntelligentRoadTestV2" onselectstart="return false">
	<div class="main-content">
		<div class="topContent">
			<div class="blueLogoDiv">
				<span id="vT">掌上优测试进度概览视图</span>
			</div>
			<div class="rightBar">
				<div class="dateDiv" onclick="var pageMaxTimes=pageMaxTime();WdatePicker({el:'seachTime',position:{left:-100,top:15},dateFmt:'yyyyMMdd',maxDate:pageMaxTimes,isShowClear:false,isShowOK:false,isShowToday:false,onpicked:seachTimeOnpicked})">
					<input id="seachTime" readOnly="readonly" class="dateBox" value="" />
					<span class="triangle"></span>
				</div>
				<div class="changeBtn">
					<span class="">场景: </span>
					<select id="senseSelect">
						<option value="全部" selected>全部</option>
						<%--<option value="高速">高速</option>
						<option value="高铁">高铁</option>
						<option value="市政路">市政路</option>
						<option value="地铁">地铁</option>--%>
						<option value="高校">高校</option>
						<option value="场馆">场馆</option>
						<option value="美食">美食</option>
						<option value="美景">美景</option>
						<option value="高密度住宅区">高密度住宅区</option>
						<option value="高流量商务区">高流量商务区</option>
						<option value="战狼区域">战狼区域</option>
						<option value="农贸市场">农贸市场</option>
						<option value="其他">其他</option>
					</select>
				</div>
				<div class="changeBtn">
					<%--<span class="changeText">覆盖率视图</span>--%>
					<select  id="sub_1">
						<option value="1" selected>覆盖率视图</option>
						<option value="2" id="testView">测试进度视图</option>
						<option value="3">测试总数</option>
					</select>
				</div>
				<div class="showDetialPage" style="display: none;">
					<img src="../js/IntelligentRoadTestV3/images/coverView.png">
					<span class="changeText" id="fxPage">深圳覆盖分析</span>
				</div>
			</div>
		</div>
		<div id="mapContent" class="mapContent"></div>
		<div class="chartWrap barChart">
			<div class="chartTitle">弱区数量区域对比</div>
			<div id="chartTop" class="chartDiv"></div>
		</div>
		<div class="chartWrap lineChart">
			<button id="btn_1" class="btn-bg" style="display: none;">全省</button>
			<div id="bottomBar" class="chartTitle">全省<span class="sense">场景</span>测试进度</div>
			<div id="chartBottom" class="chartDiv"></div>
		</div>
		<div class="totalText">
			<div class="rText">全省<span class="sense">场景</span>历史30天测试进度</div>
			 <div class="totalNum">
			</div>
		</div>
	</div>
</div>
<script src="../js/echarts/echarts.min.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript"src="../js/tableTools/tableToolsNewTwo.js"></script>
<script type="text/javascript" src="../js/util/callBackChangeData.js?2017060610"></script>
<script type="text/javascript" src="../js/util/GeoUtils.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/AroundArea.js"></script>
<!-- <script type="text/javascript" src="../js/opersCompV3/range2.js"></script> -->
<script type="text/javascript" src="../js/util/SectorUtilForBaidu.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/underscore-1.5.2-min.js?20173006"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/IntelligentRoadTestV2.js?20173006"></script>
<script type="text/javascript" 
	 src="../js/util/BMapUtil-Measure.js"></script>
