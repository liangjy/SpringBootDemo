<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<link rel="stylesheet" type="text/css" href="../js/IntelligentTuning/IntelligentTuningStatisticalExport.css" />
<link rel="stylesheet" type="text/css" href="../css/daterangepicker.css" />
<link rel="stylesheet" type="text/css" href="../js/tableTools/tableToolsNewTwo.css"/>

<div class="pc_listb" id="pc_listb_IntelligentTuningStatisticalExport" v-cloak @click.stop="bodyClick();">
	<div class="main-content">
		<!-- 正在加载数据弹框--start -->
		<div class="progressBox">
			<div class="progressDiv">
				<div class="progressLoading">
					<div class="load-imgText">
						<img src="../images/loading.gif" />
						<div>正在加载数据......</div>
					</div>
					<button type="button" class="closeProgress">
						<img src="../images/closeChart.png"/>
					</button>
				</div>
			</div>
		</div>
		<div class="topContent topDiv">
			<ul class="floatLeft leftUl">
				<li class="select-text">
					<div class="select-city selectDiv" >
						<div class="select-name" @click.stop="showCityLists">
							<img src="../js/IntelligentRoadTest/images/add_nor.png" class="name-icon">
							<a href="javascript:;" class="city-name selectA" id="RSRPGridMapCity">{{selectCity}}</a>
							<span class="triangleGrey"></span>
						</div>
						<div class="city-info select-info" v-show="cityInfoShow">
							<div class="current-city">
								<span>当前城市：</span>
								<span class="city-selected">{{selectCity}}</span>
							</div>
							<ul class="city-list">
								<li v-for="city in citys" @click.stop="changeCity(city,$event)" :class="{current:city==cityFlag}">
									<a class="current" href="javascript:;">{{city}}</a>
								</li>
							</ul>
						</div>
					</div>
				</li>
				<li>
					<div class="selectDiv" @click.stop="showDistricts();">
						<div id="district_name" class="select-name disable-name">
							<img src="../js/IntelligentRoadTest/images/district_nor.png" class="name-icon">
							<a href="javascript:;" :class="{selectA:districts.length==0}" id="chart_district">{{district}}</a>
							<span class="triangleGrey"></span>
						</div>
						<div class="select-info" id="districts" v-show="dIsShow" >
							<p v-for="d in districts" :class="{selected:d==district}" @click.stop="changeDistrict(d);">
								{{d}}
							</p>
						</div>
					</div>
				</li>
				<li>
					<div class="selectDiv">
						<div class="select-name" @click.stop="showStatistical();">
							<img src="../js/IntelligentRoadTest/images/countObject.png" class="name-icon">
							<a href="javascript:;" class="selectA" id="chart_countObject">{{statistical}}</a>
							<span class="triangleGrey"></span>
						</div>
						<div class="select-info" id="countObject" v-show="isShowStatistical">
							<%--<p class="selected">统计对象</p>--%>
							<p v-for="st in statisticalObjectArrs" @click="statisticalClick(st);" :class="{selected:st==statistical}">
								{{ st }}
							</p>
						</div>
					</div>
				</li>
				<li>
					<button type="button" class="btn-bg btn-sure" id="submit" @click.stop="sureSubmit">确定</button>
				</li>
			</ul>
			<%--<div class="exportDiv">--%>
			<%--<button type="button" class="btn-bg btn-export" @click="tableExport" id="export" style="display: none;">导出</button>--%>
			<%--</div>--%>
		</div>
		<div class="contentDiv">
			<!-- 上面的2个柱状折线图div  -->
			<div class="chartWrap">
				<div class="box-shadow">
					<div class="chartDivWrap">
						<div class="chartTop" style="padding-left: 20px">
							<span class="marginRight220">{{queryStartDay}}~{{queryDayFormat.split("-")[1]}}{{queryDayFormat.split("-")[2]}} {{queryCity}}{{queryDistrict}} {{queryStatistical}}累计方案派单数:{{task_create_count_title}} 累计方案受理数:{{accept_count_title}} 累计执行成功数:{{execute_count_title}} 累计成功解决数:{{resolve_count_title}}</span>
							<button type="button" id="tabExport" @click.stop="chartExport(1)" class="btn-bg btn-export">图表导出</button>
							<div class="dateDiv">
								<span id="date-range9" class="datebox">{{queryStartDayFormat}} - {{queryDayFormat}}</span>
								<span class="triangleGrey"></span>
							</div>
						</div>
						<div class="chartDiv" id="allRegionChart"></div>
					</div>
				</div>
			</div>
			<div class="chartWrap">
				<div class="box-shadow">

					<div class="chartDivWrap">
						<div class="chartTop" style="padding-left: 20px">
							<span>{{dayByClickChart1}} {{queryCity}} {{queryDistrict}} {{queryStatistical}}智能调优方案统计</span>
							<button type="button" id="tabExport" @click.stop="chartExport(2)" class="btn-bg btn-export">图表导出</button>
						</div>
						<div class="chartDiv" id="allRegionChart2"></div>
					</div>
				</div>
			</div>
			<!-- 下面的表格div  -->
			<div class="tableDivWrap">
				<div class="box-shadow">
					<div class="tableDiv">
						<%--<div class="tbWrap">
							<div class="tbTitle">{{dayByClickChart1}} {{titleCity}} {{titleDistrict}} {{titleMktcenter}} {{queryStatistical}}小区清单（总条数：{{tableCount}}）
								<button type="button" id="tabExport" @click.stop="tableExport" class="btn-bg btn-export" v-show="isShowTable">表格导出</button>
							</div>
							<div id="tableParentDiv" class="tableSt" >
								暂无数据
							</div>
						</div>--%>
						<div class="tbWrap">
							<div class="tbTitle">
								<ul class="tabUl">
									<li v-for="(tabOption,index) in tabOptions" :class="{active:index==tabOptionIdx}" @click="tabOptionIdx=index">
										{{tabOption}}
									</li>
								</ul>
								<span v-show="tabOptionIdx==0">{{dayByClickChart1}} {{titleCity}} {{titleDistrict}} {{titleMktcenter}} {{queryStatistical}}小区清单（总条数：{{tableCount}}）</span>
								<span v-show="tabOptionIdx==1">{{dayByClickChart1}} {{titleCity}} {{titleDistrict}} {{titleMktcenter}} {{queryStatistical}}工单清单（总条数：{{orderTableCount}}）</span>
								<button type="button" id="tabExport" @click.stop="tableExport" class="btn-bg btn-export" v-show="tabOptionIdx==0 && isShowTable">表格导出</button>
								<div class="tabOption" v-show="tabOptionIdx==1">
									<span v-show="tabOptionIdx==1">筛选条件：</span>
									<select name="" id="" v-show="tabOptionIdx==1" v-model="status">
										<option value="全部">全部</option>
										<option value="确认中">确认中</option>
										<option value="执行中">执行中</option>
										<option value="评估中">评估中</option>
										<option value="已归档">已归档</option>
									</select>
									<div class="searchDiv">
										<input type="text" class="searchInput" v-model="taskId" v-show="tabOptionIdx==1" placeholder="输入工单编号进行搜索">
										<img src="../js/IntelligentTuning/images/search.png">
									</div>
									<button type="button" id="orderExport" @click.stop="tableExport('order')" class="btn-bg btn-export" v-show="tabOptionIdx==1" >表格导出</button>
								</div>
							</div>
							<div id="tableParentDiv" class="tableSt" v-show="tabOptionIdx==0"></div>
							<div id="tableParentDiv2" class="tableSt" v-show="tabOptionIdx==1"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript" src="../js/util/moment.min.js"></script>
<script type="text/javascript" src="../js/util/jquery.daterangepicker.js"></script>
<script src="../js/util/vue.js"></script>
<script type="text/javascript" src="../js/util/progressbarTwo.js"></script>
<script type="text/javascript" src="../js/util/callBackChangeData.js"></script>
<script src="../js/echarts/echarts.min.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" src="../js/util/crossfilter.js"></script>
<script type="text/javascript"src="../js/tableTools/tableToolsNewTwo.js"></script>
<script type="text/javascript" src="../js/util/exportExcel.js"></script>


<script type="text/javascript" src="../js/IntelligentTuning/IntelligentTuningStatisticalExportCrossFilterUtil.js"></script>
<script type="text/javascript" src="../js/IntelligentTuning/IntelligentTuningStatisticalExportQueryUtil.js"></script>
<script type="text/javascript" src="../js/IntelligentTuning/IntelligentTuningStatisticalExportChartUtil.js"></script>
<script type="text/javascript" src="../js/IntelligentTuning/IntelligentTuningStatisticalExport.js"></script>
