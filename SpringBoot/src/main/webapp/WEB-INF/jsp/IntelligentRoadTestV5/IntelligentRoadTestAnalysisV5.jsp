<%@ page language="java" contentType="text/html; charset=utf-8"
		 pageEncoding="utf-8"%>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />


<!--jQuery插件  -->
<link type="text/css" rel="stylesheet" href="../css/jquery-ui.css" />
<link type="text/css" rel="stylesheet" href="../css/mian.css" />
<script type="text/javascript"  src="../js/jquery-1.12.3.js"></script>
<script type="text/javascript"  src="../js/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript"  src="../js/jquery-ui.js"></script>
<script type="text/javascript"  src="../js/jquery.ui.datepicker-zh-CN.js"></script>


<!--弹窗插件结束  -->
<script type="text/javascript"  src="../js/My97DatePicker/WdatePicker.js"></script>
<link type="text/css" rel="stylesheet" href="../js/My97DatePicker/skin/default/datepicker.css" />
<!--通用工具  -->
<link rel="stylesheet" href="../css/jquery-ui.css">
<link rel="stylesheet" href="../css/leanModal.css">
<link rel="stylesheet" href="../css/mian.css">
<link rel="stylesheet" type="text/css" href="../css/home/common.min.css" />
<link rel="stylesheet" type="text/css" href="../css/zTreeStyle.css" />
<link rel="stylesheet" type="text/css" href="../js/IntelligentRoadTestV5/daterangepicker.css"/>
<link rel="stylesheet" type="text/css" href="../js/IntelligentRoadTestV5/colorPick.css"/>
<link rel="stylesheet" type="text/css" href="../js/IntelligentRoadTestV5/IntelligentRoadTestAnalysisV5.css" />
<link rel="stylesheet" type="text/css" href="../js/IntelligentRoadTestV5/slider-legend.css" />
<link rel="stylesheet" type="text/css" href="../js/IntelligentRoadTestV5/ShareObject.css" />
<link rel="stylesheet" type="text/css" href="../js/leaflet/leaflet.css"/>
<input type="hidden" id="version" value="2.0">
<input type="hidden" id="currentPerId" value="486">
<input value="" id="currentTabIndex" type="hidden">
<input type="hidden" id="cityPermission_common" value="全省">
<input type="hidden" id="district_common" value="">
<input type="hidden" id="user_permission_group_id" value="1">
<input type="hidden" value="分公司_全省,系统管理员2,普通用户2,审核员" id="user_role_List_string">
<input value="全省" id="currentCityName" type="hidden">

<div class="pc_listb" id="pc_listb_IntelligentRoadTestV5">
	<div class="main-content">
		<%--<div class="page-title">
			<div>
				<img src="../images/ITEphone/logo.png" class="titleImg">
				<span class="mTitle">广东电信智慧运营网络大数据</span>
			</div>
			<div class="sTitle">天翼蓝鹰网络测评</div>
		</div>--%>
		<div class="contentWrap">
			<div class="topDiv" onselectstart="return false">
				<div class="packList" title="打开列表">
					<img src="../js/IntelligentRoadTestV5/images/pack_down.png">
				</div>
				<!-- 搜索框和搜索列表 -->
				<div class="searchDiv">
					<div class="searchBox">
						<a href="javascript:;" title="首页" onclick="openIntelligentToadTestV2Page()" class="logoImg"><img src="../js/IntelligentRoadTestV5/images/logoImg.png"></a>
						<input id="searchText"  onkeyup="searchenter(event);" class="textBox" placeholder='地名、经度,纬度、基站id_小区id' />
						<button id="searchButton" title="搜索" type="button" class="btn-bg btn-search"><img src="../js/IntelligentRoadTestV5/images/searchBg.png"/></button>
						<a href="javascript:;" title="清空" class="clearText"><img src="../js/IntelligentRoadTestV5/images/clearImg.png"></a>
						<a href="javascript:;" class="search_loading"><img src="../js/IntelligentRoadTestV5/images/search_loading.gif"></a>
						<a href="javascript:;" title="统计" class="chartTotal"><img src="../js/IntelligentRoadTestV5/images/chartTotal.gif"></a>
					</div>
					<ul class="search-result" style="display: none;" id="mapClickResult"></ul>
					<ul class="search-result" style="display: none;" id="searchResult"></ul>
				</div>
				<!-- 日期框和地市列表 -->
				<div class="dateCity">
					<div class="select-city" id = "topCitySelect">
						<div class="selectCity-name">
							<img src="../js/IntelligentRoadTestV5/images/nor_add.png">
							<span class="city-selected" id="mapCity"></span>
							<span>&gt;</span>
							<span class="district-selected" id="mapDistrict"></span>
							<span class="triangle"></span>
						</div>
						<div class="city-info" style="display: none;">
							<ul id="allcity" class="cityName"></ul>
						</div>
					</div>
					<div class="dateDiv" id="dateWrap">
						<span id="weekStartTime" class="startTime"></span>
						<span>~</span>
						<span id="seachTime" class="endTime"></span>
						<span class="triangle"></span>
					</div>
				</div>
				<!-- 右侧工具栏 -->
				<div class="rightToolbar">
					<div class="toolMenu">
						<img src="../js/IntelligentRoadTestV5/images/collapse.png" />
					</div>
					<ul>
						<li class="select-text select-layer">
							<div class="select-name" title="场景图层">
								<span class="name-img">
									<i class="icon icon_layer"></i>
								</span>
								<a href="javascript:;" class="selectA">场景图层</a>
							</div>
							<div class="layer-info">
								<div class="layerTab">
									<ul class="layerTabTitle">
										<li class="active">系统图层</li>
										<li>自定义图层</li>
									</ul>
									<div class="layerTabWrap">
										<div class="layerWrap1 layerTabCon layerWrap">
											<table data-zindex="1">
												<tr>
													<td colspan="3">
														<div class="layer-name">
															<input type="checkbox" name="layer" id="sector" value="3">
															<label for="sector">4G扇区图层</label>
														</div>
														<div class="layer-opacity">
															<span class="opacityText">透明度：</span>
															<input type="number" id="sectorOpacity" class="iptNum" min="0" max="1" step="0.1" value="0.7">
															<button class="btn-showTableInfo"><img src="../js/IntelligentRoadTestV5/images/layer_xiala.png"></button>
														</div>
													</td>
												</tr>
												<tr>
													<td>扇区类型</td>
													<td>
														<input type="checkbox" id="indoor-sector" name="type-sector" value="室内" checked>
														<label for="">室分</label>
													</td>
													<td>
														<input type="checkbox" id="macro-sector" name="type-sector" value="室外" checked>
														<label for="">宏扇区</label>
													</td>
													<td class="nullTd"></td>
													<td>
														<input type="checkbox" id="other-sector" name="type-sector" value="室外和室内" checked>
														<label for="">其他</label>
													</td>
												</tr>
												<tr>
													<td>使用频段</td>
													<td>
														<input type="checkbox" value="800MHz" name="band-sector" checked>
														<label>800M</label>
													</td>
													<td>
														<input type="checkbox" value="1.8GHz" name="band-sector" checked>
														<label>1.8G</label>
													</td>
													<td class="nullTd"></td>
													<td>
														<input type="checkbox" value="2.1GHz" name="band-sector" checked>
														<label>2.1G</label>
													</td>
													<td>
														<input type="checkbox" value="2.6GHz" name="band-sector" checked>
														<label>2.6G</label>
													</td>
												</tr>
												<tr>
													<td>设备厂家</td>
													<td>
														<input type="checkbox" value="中兴" name="factory-sector" checked>
														<span class="squarePick" style="background-color: #9966CC;"></span>
														<label>中兴</label>
													</td>
													<td>
														<input type="checkbox" value="华为" name="factory-sector" checked>
														<span class="squarePick" style="background-color: #9966CC;"></span>
														<label>华为</label>
													</td>
													<td class="nullTd"></td>
													<td>
														<input type="checkbox" value="爱立信" name="factory-sector" checked>
														<span class="squarePick" style="background-color: #9966CC;"></span>
														<label>爱立信</label>
													</td>
													<td>
														<input type="checkbox" value="其它" name="factory-sector" checked>
														<span class="squarePick" style="background-color: #9966CC;"></span>
														<label>其它</label>
													</td>
												</tr>
												<tr>
													<td>专题类型</td>
													<td>
														<input type="checkbox" id="m3Sector" name="cov-sector" value="IS_M3_COV" checked><%--index-26--%>
														<label>MOD3干扰扇区</label>
													</td>
													<td>
														<input type="checkbox" id="cbSector" name="cov-sector" value="IS_CB_COV" checked><%--index-28--%>
														<label>越区覆盖扇区</label>
													</td>
													<td class="nullTd"></td>
													<td>
														<input type="checkbox" id="olSector" name="cov-sector" value="IS_OL_COV" checked><%--index-27--%>
														<label>重叠覆盖扇区</label>
													</td>
													<td>
														<input type="checkbox" id="otherSector" name="cov-sector" value="其它" checked><%--index-3--%>
														<label>其它</label>
													</td>
												</tr>
											</table>
											<table data-zindex="2">
												<tr>
													<td colspan="3">
														<div class="layer-name">
															<input type="checkbox" name="layer" id="sector2G">
															<label for="sector2G">2G扇区图层</label>
														</div>
														<div class="layer-opacity">
															<span class="opacityText">透明度：</span>
															<input type="number" id="sector2GOpacity" class="iptNum" min="0" max="1" step="0.1" value="0.7">
															<button class="btn-showTableInfo"><img src="../js/IntelligentRoadTestV5/images/layer_xiala.png"></button>
														</div>
													</td>
												</tr>
												<tr class="greyColor">
													<td>扇区类型</td>
													<td>
														<input type="checkbox" id="indoor-sector-2g" name="type-sector-2g" value="室内" disabled checked>
														<label for="indoor-sector-2g" class="greyColor">室分</label>
													</td>
													<td>
														<input type="checkbox" id="macro-sector-2g" name="type-sector-2g" value="室外" disabled checked>
														<label for="macro-sector-2g" class="greyColor">宏扇区</label>
													</td>
													<td class="nullTd"></td>
													<td>
														<input type="checkbox" id="other-sector-2g" name="type-sector-2g" value="室外和室内" disabled checked>
														<label for="other-sector-2g" class="greyColor">其他</label>
													</td>
												</tr>
												<tr class="greyColor">
													<td>分配频点</td>
													<td>
														<input type="checkbox" value="242" name="band-sector-2g" disabled checked>
														<label for="band-sector-2g" class="greyColor">242</label>
													</td>
													<td>
														<input type="checkbox" value="283" name="band-sector-2g" disabled checked>
														<label for="band-sector-2g" class="greyColor">283</label>
													</td>
												</tr>
												<tr>
													<td>设备厂家</td>
													<td>
														<input type="checkbox" value="中兴" name="factory-sector-2g" checked>
														<span class="squarePick" style="background-color: #f57dad;"></span>
														<label>中兴</label>
													</td>
													<td>
														<input type="checkbox" value="华为" name="factory-sector-2g" checked>
														<span class="squarePick" style="background-color: #f57dad;"></span>
														<label>华为</label>
													</td>
													<td class="nullTd"></td>
													<td>
														<input type="checkbox" value="阿朗" name="factory-sector-2g" checked>
														<span class="squarePick" style="background-color: #f57dad;"></span>
														<label>阿朗</label>
													</td>
													<td>
														<input type="checkbox" value="其它" name="factory-sector-2g" checked>
														<span class="squarePick" style="background-color: #f57dad;"></span>
														<label>其它</label>
													</td>
												</tr>
											</table>


											<!-- 移动站址图层 start-->
											<table data-zindex="3">
												<tr>
													<td colspan="3">
														<div class="layer-name">
															<input type="checkbox" name="layer" id="yd_sector">
															<label for="yd_sector">移动站址图层</label>
														</div>
														<div class="layer-opacity">
															<span class="opacityText">透明度：</span>
															<input type="number" id="yd_SectorOpacity" class="iptNum" min="0" max="1" step="0.1" value="1">
															<button class="btn-showTableInfo"><img src="../js/IntelligentRoadTestV5/images/layer_xiala.png"></button>
														</div>
													</td>
												</tr>
												<tr class="greyColor">
													<td>覆盖类型</td>
													<td>
														<input type="checkbox" id="covertype-sector-yd" name="covertype-sector-yd" value="全部" disabled checked>
														<label for="covertype-sector-yd" class="greyColor">全部</label>
													</td>
												</tr>
												<tr class="greyColor">
													<td>频段类型</td>
													<td>
														<input type="checkbox" value="" name="band-sector-yd" disabled checked>
														<label for="band-sector-yd" class="greyColor">全部</label>
													</td>
												</tr>
												<tr>
													<td>设备厂家</td>
													<td>
														<input type="checkbox" value="全部" name="factory-sector-yd" checked disabled>
														<span class="squarePick" id="yd-factory-color" style="background-color: #c8ff59;"></span>
														<label>全部</label>
													</td>
												</tr>
											</table>
											<!-- 移动站址图层end -->

											<table data-zindex="4" style="table-layout: fixed;">

												<tr>
													<td colspan="3">
														<div class="layer-name">
															<input type="checkbox" id="grid" checked="" disabled="">
															<label for="grid">栅格图层</label>
														</div>
														<div class="layer-opacity">
															<span class="opacityText">透明度：</span>
															<input type="number" id="gridOpacity" class="iptNum" min="0" max="1" step="0.1" value="0.5">
															<button class="btn-showTableInfo"><img src="../js/IntelligentRoadTestV5/images/layer_xiala.png"></button>
														</div>
													</td>
												</tr>
												<tr>
													<td>覆盖频段</td>
													<td colspan="2" class="padding0">
														<fieldset class="fieldset bandMap">
															<legend>
																<ul>
																	<li>
																		<input type="radio" id="bf-band" name="band-radio" value="0" checked="">
																		<label for="bf-band" >不分频段</label>
																	</li>
																	<li>
																		<input type="radio" id="qf-band" name="band-radio" value="1">
																		<label for="qf-band" >区分频段</label>
																	</li>
																</ul>
															</legend>
															<div class="fieldsetInfo">
																<div class="bandDiv" style="display: block;">
																	<span>
																		<input type="radio" id="zy-grid" name="chq-grid" value="最优场强">
																		<label for="zy-grid" >最优场强</label>
																	</span>
																	<span>
																		<input type="radio" id="zjr-grid" name="chq-grid" value="主接入场强" checked="">
																		<label for="zjr-grid" >主接入场强</label>
																	</span>
																</div>
																<div class="bandDiv" style="display: none;">
																	<span>
																		<input type="checkbox" id="cover800" name="band-grid" value="800M">
																		<label for="cover800" >800M</label>
																	</span>
																	<span>
																		<input type="checkbox" id="cover18" name="band-grid" value="1.8G">
																		<label for="cover18" >1.8G</label>
																	</span>
																	<span>
																		<input type="checkbox" id="cover21" name="band-grid" value="2.1G">
																		<label for="cover21" >2.1G</label>
																	</span>
																	<span>
																		<input type="checkbox" id="cover26" name="band-grid" value="2.6G">
																		<label for="cover26" >2.6G</label>
																	</span>
																</div>
															</div>
														</fieldset>
													</td>
												</tr>
												<tr>
													<td>栅格数据</td>
													<td>
														<input type="radio" id="agps-mr" name="gridNum" value="1" checked="">
														<label for="agps-mr"  style="color: rgb(50, 133, 255);">AGPS-MR</label>
													</td>
													<td>
														<input type="radio" id="all-mr" name="gridNum" value="0">
														<label for="all-mr" >全量MR综合</label>
													</td>
													<td class="nullTd"></td>
													<td>
														<input type="radio" id="all-mr-outdoor" name="gridNum" value="3" >
														<label for="all-mr-outdoor" >全量MR室外</label>
													</td>
													<td>
														<input type="radio" id="all-mr-indoor" name="gridNum" value="2" >
														<label for="all-mr-indoor" >全量MR室内</label>
													</td>
												</tr>
												<tr>
													<td>时间粒度</td>
													<td>
														<input type="radio" id="grid_day" name="gridTime" value="day">
														<label for="grid_day">天</label>
													</td>
													<td>
														<input type="radio" id="grid_week" name="gridTime" value="week" checked="">
														<label for="grid_week" style="color: rgb(50, 133, 255);">周</label>
													</td>
												</tr>
												<tr>
													<td>栅格类型</td>
													<td colspan="5" class="padding0">
														<fieldset class="fieldset2 gridFieldset2">
															<legend>
																<ul>
																	<li>
																		<input type="radio" id="sxsl-type" name="grid-type" value="1">
																		<label for="sxsl-type">上行速率</label>
																	</li>
																	<li>
																		<input type="radio" id="xxsl-type" name="grid-type" value="2">
																		<label for="xxsl-type">下行速率</label>
																	</li>
																	<li>
																		<input type="radio" id="fgzl-type" name="grid-type" value="0" checked="">
																		<label for="fgzl-type">覆盖质量</label>
																	</li>
																	<li>
																		<input type="radio" id="mod3-type" name="grid-type" value="3">
																		<label for="mod3-type">MOD3干扰</label>
																	</li>
																	<li>
																		<input type="radio" id="yqfg-type" name="grid-type" value="4">
																		<label for="yqfg-type">越区覆盖</label>
																	</li>
																	<li>
																		<input type="radio" id="cdfg-type" name="grid-type" value="5">
																		<label for="cdfg-type">重叠覆盖</label>
																	</li>
																	<li>
																		<input type="radio" id="ecio-type" name="grid-type" value="6">
																		<label for="ecio-type">EC/IO</label>
																	</li>
																	<li style="display: none">
																		<input type="radio" id="nb-type" name="grid-type" value="7">
																		<label for="nb-type">NB预测</label>
																	</li>
																</ul>
															</legend>

															<div class="fieldsetInfo gridFieldSetInfo">
																<div class="gridTypeDiv" style="display: none;">
																	<span>
																		<input type="checkbox" id="youshLegend" name="legend-grid" value="1" checked="">
																		<span class="squarePick" style="background-color: #009900;" id="youshColor"></span>
																		<label>优秀</label>
																	</span>
																	<span>
																		<input type="checkbox" id="liangshLegend" name="legend-grid" value="2" checked="">
																		<span class="squarePick" style="background-color: #00B0F0;" id="liangshColor"></span>
																		<label>良好</label>
																	</span>
																	<span>
																		<input type="checkbox" id="zhongshLegend" name="legend-grid" value="3" checked="">
																		<span class="squarePick" style="background-color: #0070C0;" id="zhongshColor"></span>
																		<label>中等</label>
																	</span>
																	<span>
																		<input type="checkbox" id="chaLeshgend" name="legend-grid" value="4" checked="">
																		<span class="squarePick" style="background-color: #FFC000;" id="chashColor"></span>
																		<label>较差</label>
																	</span>
																	<span>
																		<input type="checkbox" id="jichashLegend" name="legend-grid" value="5" checked="">
																		<span class="squarePick" style="background-color: #C00000;" id="jichashColor"></span>
																		<label>极差</label>
																	</span>
																	<span style="display:none;">
																		<input type="checkbox" id="notCountshLegend" name="legend-grid" value="6">
																		<%--<span class="squarePick" style="background-color: #bb10c4;" id="notCountshColor"></span>--%>
																		<label>记录数≤<span class="counter">3</span></label>
																	</span>
																	<span class="fallNet">
																		<input type="checkbox" id="fallNetshLegend" name="legend-grid" value="7">
																		<span class="squarePick" style="background-color: #000;" id="fallNetshColor"></span>
																		<label>脱网</label>
																	</span>
																</div>
																<div class="gridTypeDiv" style="display: none;">
																	<span>
																		<input type="checkbox" id="youxhLegend" name="legend-grid" value="1" checked="">
																		<span class="squarePick" style="background-color: #009900;" id="youxhColor"></span>
																		<label>优秀</label>
																	</span>
																	<span>
																		<input type="checkbox" id="liangxhLegend" name="legend-grid" value="2" checked="">
																		<span class="squarePick" style="background-color: #00B0F0;" id="liangxhColor"></span>
																		<label>良好</label>
																	</span>
																	<span>
																		<input type="checkbox" id="zhongxhLegend" name="legend-grid" value="3" checked="">
																		<span class="squarePick" style="background-color: #0070C0;" id="zhongxhColor"></span>
																		<label>中等</label>
																	</span>
																	<span>
																		<input type="checkbox" id="chaxhLegend" name="legend-grid" value="4" checked="">
																		<span class="squarePick" style="background-color: #FFC000;" id="chaxhColor"></span>
																		<label>较差</label>
																	</span>
																	<span>
																		<input type="checkbox" id="jichaxhLegend" name="legend-grid" value="5" checked="">
																		<span class="squarePick" style="background-color: #C00000;" id="jichaxhColor"></span>
																		<label>极差</label>
																	</span>
																	<span style="display:none;">
																		<input type="checkbox" id="notCountxhLegend" name="legend-grid" value="6">
																		<%--<span class="squarePick" style="background-color: #bb10c4;" id="notCountxhColor"></span>--%>
																		<label>记录数≤<span class="counter">3</span></label>
																	</span>
																	<span class="fallNet">
																		<input type="checkbox" id="fallNetxhLegend" name="legend-grid" value="7">
																		<span class="squarePick" style="background-color: #000;" id="fallNetxhColor"></span>
																		<label>脱网</label>
																	</span>
																</div>
																<div class="gridTypeDiv" style="display: block;">
																	<span>
																		<input type="checkbox" id="youLegend" name="legend-grid" value="1" checked="">
																		<span class="squarePick" style="background-color: #009900;" id="youColor"></span>
																		<label>优秀</label>
																	</span>
																	<span>
																		<input type="checkbox" id="liangLegend" name="legend-grid" value="2" checked="">
																		<span class="squarePick" style="background-color: #00B0F0;" id="liangColor"></span>
																		<label>良好</label>
																	</span>
																	<span>
																		<input type="checkbox" id="zhongLegend" name="legend-grid" value="3" checked="">
																		<span class="squarePick" style="background-color: #0070C0;" id="zhongColor"></span>
																		<label>中等</label>
																	</span>
																	<span>
																		<input type="checkbox" id="chaLegend" name="legend-grid" value="4" checked="">
																		<span class="squarePick" style="background-color: #FFC000;" id="chaColor"></span>
																		<label>较差</label>
																	</span>
																	<span>
																		<input type="checkbox" id="jichaLegend" name="legend-grid" value="5" checked="">
																		<span class="squarePick" style="background-color: #C00000;" id="jichaColor"></span>
																		<label>极差</label>
																	</span>
																	<span style="display:none;">
																		<input type="checkbox" id="notCountLegend" name="legend-grid" value="6">
																		<%--<span class="squarePick" style="background-color: #bb10c4;" id="notCountColor"></span>--%>
																		<label>记录数≤<span class="counter">3</span></label>
																	</span>
																	<span class="fallNet">
																		<input type="checkbox" id="fallNetLegend" name="legend-grid" value="7">
																		<span class="squarePick" style="background-color: #000;" id="fallNetColor"></span>
																		<label>脱网</label>
																	</span>
																</div>
																<div class="gridTypeDiv" style="display: none;">
																	<span>
																		<input type="checkbox" id="youM3Legend" name="legend-grid" value="1" checked="">
																		<span class="squarePick" style="background-color: #009900;" id="youM3Color"></span>
																		<label>优秀</label>
																	</span>
																	<span>
																		<input type="checkbox" id="liangM3Legend" name="legend-grid" value="2" checked="">
																		<span class="squarePick" style="background-color: #00B0F0;" id="liangM3Color"></span>
																		<label>良好</label>
																	</span>
																	<span>
																		<input type="checkbox" id="zhongM3Legend" name="legend-grid" value="3" checked="">
																		<span class="squarePick" style="background-color: #0070C0;" id="zhongM3Color"></span>
																		<label>中等</label>
																	</span>
																	<span>
																		<input type="checkbox" id="chaM3Legend" name="legend-grid" value="4" checked="">
																		<span class="squarePick" style="background-color: #FFC000;" id="chaM3Color"></span>
																		<label>较差</label>
																	</span>
																	<span>
																		<input type="checkbox" id="jichaM3Legend" name="legend-grid" value="5" checked="">
																		<span class="squarePick" style="background-color: #C00000;" id="jichaM3Color"></span>
																		<label>极差</label>
																	</span>
																	<span style="display:none;">
																		<input type="checkbox" id="notCountM3Legend" name="legend-grid" value="6">
																		<%--<span class="squarePick" style="background-color: #bb10c4;" id="notCountM3Color"></span>--%>
																		<label>记录数≤<span class="counter">3</span></label>
																	</span>
																	<span class="fallNet">
																		<input type="checkbox" id="fallNetM3Legend" name="legend-grid" value="7">
																		<span class="squarePick" style="background-color: #000;" id="fallNetM3Color"></span>
																		<label>脱网</label>
																	</span>
																</div>
																<div class="gridTypeDiv" style="display: none;">
																	<span>
																		<input type="checkbox" id="youYQLegend" name="legend-grid" value="1" checked="">
																		<span class="squarePick" style="background-color: #009900;" id="youYQColor"></span>
																		<label>优秀</label>
																	</span>
																	<span>
																		<input type="checkbox" id="liangYQLegend" name="legend-grid" value="2" checked="">
																		<span class="squarePick" style="background-color: #00B0F0;" id="liangYQColor"></span>
																		<label>良好</label>
																	</span>
																	<span>
																		<input type="checkbox" id="zhongYQLegend" name="legend-grid" value="3" checked="">
																		<span class="squarePick" style="background-color: #0070C0;" id="zhongYQColor"></span>
																		<label>中等</label>
																	</span>
																	<span>
																		<input type="checkbox" id="chaYQLegend" name="legend-grid" value="4" checked="">
																		<span class="squarePick" style="background-color: #FFC000;" id="chaYQColor"></span>
																		<label>较差</label>
																	</span>
																	<span>
																		<input type="checkbox" id="jichaYQLegend" name="legend-grid" value="5" checked="">
																		<span class="squarePick" style="background-color: #C00000;" id="jichaYQColor"></span>
																		<label>极差</label>
																	</span>
																	<span style="display:none;">
																		<input type="checkbox" id="notCountYQLegend" name="legend-grid" value="6">
																		<%--<span class="squarePick" style="background-color: #bb10c4;" id="notCountYQColor"></span>--%>
																		<label>记录数≤<span class="counter">3</span></label>
																	</span>
																	<span class="fallNet">
																		<input type="checkbox" id="fallNetYQLegend" name="legend-grid" value="7">
																		<span class="squarePick" style="background-color: #000;" id="fallNetYQColor"></span>
																		<label>脱网</label>
																	</span>
																</div>
																<div class="gridTypeDiv" style="display: none;">
																	<span>
																		<input type="checkbox" id="youCDLegend" name="legend-grid" value="1" checked="">
																		<span class="squarePick" style="background-color: #009900;" id="youCDColor"></span>
																		<label>优秀</label>
																	</span>
																	<span>
																		<input type="checkbox" id="liangCDLegend" name="legend-grid" value="2" checked="">
																		<span class="squarePick" style="background-color: #00B0F0;" id="liangCDColor"></span>
																		<label>良好</label>
																	</span>
																	<span>
																		<input type="checkbox" id="zhongCDLegend" name="legend-grid" value="3" checked="">
																		<span class="squarePick" style="background-color: #0070C0;" id="zhongCDColor"></span>
																		<label>中等</label>
																	</span>
																	<span>
																		<input type="checkbox" id="chaCDLegend" name="legend-grid" value="4" checked="">
																		<span class="squarePick" style="background-color: #FFC000;" id="chaCDColor"></span>
																		<label>较差</label>
																	</span>
																	<span>
																		<input type="checkbox" id="jichaCDLegend" name="legend-grid" value="5" checked="">
																		<span class="squarePick" style="background-color: #C00000;" id="jichaCDColor"></span>
																		<label>极差</label>
																	</span>
																	<span style="display:none;">
																		<input type="checkbox" id="notCountCDLegend" name="legend-grid" value="6">
																		<%--<span class="squarePick" style="background-color: #bb10c4;" id="notCountCDColor"></span>--%>
																		<label>记录数≤<span class="counter">3</span></label>
																	</span>
																	<span class="fallNet">
																		<input type="checkbox" id="fallNetCDLegend" name="legend-grid" value="7">
																		<span class="squarePick" style="background-color: #000;" id="fallNetCDColor"></span>
																		<label>脱网</label>
																	</span>
																</div>
																<div class="gridTypeDiv" style="display: none;">
																	<span>
																		<input type="checkbox" id="youECLegend" name="legend-grid" value="1" checked="">
																		<span class="squarePick" style="background-color: #009900;" id="youECColor"></span>
																		<label>优秀</label>
																	</span>
																	<span>
																		<input type="checkbox" id="liangECLegend" name="legend-grid" value="2" checked="">
																		<span class="squarePick" style="background-color: #00B0F0;" id="liangECColor"></span>
																		<label>良好</label>
																	</span>
																	<span>
																		<input type="checkbox" id="zhongECLegend" name="legend-grid" value="3" checked="">
																		<span class="squarePick" style="background-color: #0070C0;" id="zhongECColor"></span>
																		<label>中等</label>
																	</span>
																	<span>
																		<input type="checkbox" id="chaECLegend" name="legend-grid" value="4" checked="">
																		<span class="squarePick" style="background-color: #FFC000;" id="chaECColor"></span>
																		<label>较差</label>
																	</span>
																	<span>
																		<input type="checkbox" id="jichaECLegend" name="legend-grid" value="5" checked="">
																		<span class="squarePick" style="background-color: #C00000;" id="jichaECColor"></span>
																		<label>极差</label>
																	</span>
																	<span style="display:none;">
																		<input type="checkbox" id="notCountECLegend" name="legend-grid" value="6">
																		<%--<span class="squarePick" style="background-color: #bb10c4;" id="notCountECColor"></span>--%>
																		<label>记录数≤<span class="counter">3</span></label>
																	</span>
																	<span class="fallNet">
																		<input type="checkbox" id="fallNetECLegend" name="legend-grid" value="7">
																		<span class="squarePick" style="background-color: #000;" id="fallNetECColor"></span>
																		<label>脱网</label>
																	</span>
																</div>
																<div class="gridTypeDiv" style="display: none;" disabled>
																	<span>
																		<input type="checkbox" id="youNBLegend" name="legend-grid" value="1" checked="">
																		<span class="squarePick" style="background-color: #009900;" id="youNBColor"></span>
																		<label>优秀</label>
																	</span>
																	<span>
																		<input type="checkbox" id="liangNBLegend" name="legend-grid" value="2" checked="">
																		<span class="squarePick" style="background-color: #00B0F0;" id="liangNBColor"></span>
																		<label>良好</label>
																	</span>
																	<span>
																		<input type="checkbox" id="zhongNBLegend" name="legend-grid" value="3" checked="">
																		<span class="squarePick" style="background-color: #0070C0;" id="zhongNBColor"></span>
																		<label>中等</label>
																	</span>
																	<span>
																		<input type="checkbox" id="chaNBLegend" name="legend-grid" value="4" checked="">
																		<span class="squarePick" style="background-color: #FFC000;" id="chaNBColor"></span>
																		<label>较差</label>
																	</span>
																	<span>
																		<input type="checkbox" id="jichaNBLegend" name="legend-grid" value="5" checked="">
																		<span class="squarePick" style="background-color: #C00000;" id="jichaNBColor"></span>
																		<label>极差</label>
																	</span>
																	<span style="display:none;">
																		<input type="checkbox" id="notCountNBLegend" name="legend-grid" value="6">
																		<%--<span class="squarePick" style="background-color: #bb10c4;" id="notCountECColor"></span>--%>
																		<label>记录数≤<span class="counter">3</span></label>
																	</span>
																	<span class="fallNet">
																		<input type="checkbox" id="fallNetNBLegend" name="legend-grid" value="7">
																		<span class="squarePick" style="background-color: #000;" id="fallNetNBColor"></span>
																		<label>脱网</label>
																	</span>
																</div>
															</div>
														</fieldset>
													</td>
												</tr>
											</table>
											<table data-zindex="5" class="lineTable" style="display: none;">
												<tr>
													<td colspan="6">
														<div class="layer-name">
															<input type="checkbox" name="layer" id="lineArea" checked disabled>
															<label for="lineArea">线路图层</label>
														</div>
														<div class="layer-opacity">
															<span class="opacityText">透明度：</span>
															<input type="number" id="lineOpacity" class="iptNum" min="0" max="1" step="0.1" value="0.5">
															<button class="btn-showTableInfo"><img src="../js/IntelligentRoadTestV5/images/layer_xiala.png"></button>
														</div>
													</td>
												</tr>
												<tr>
													<td>线路类型</td>
													<td colspan="5" class="padding0">
														<fieldset class="fieldset2 lineFieldset2">
															<legend>
																<ul>
																	<li>
																		<input type="radio" id="sxsl-type-line" name="grid-type-line" value="1">
																		<label for="sxsl-type-line">上行速率</label>
																	</li>
																	<li>
																		<input type="radio" id="xxsl-type-line" name="grid-type-line" value="2">
																		<label for="xxsl-type-line">下行速率</label>
																	</li>
																	<li>
																		<input type="radio" id="fgzl-type-line" name="grid-type-line" value="0" checked="">
																		<label for="fgzl-type-line">覆盖质量</label>
																	</li>
																</ul>
															</legend>

															<div class="fieldsetInfo lineFieldSetInfo">
																<div class="gridTypeDiv" style="display: none;">
																	<span>
																		<input type="checkbox" id="youshLegendLine" name="legend-grid-line" value="1" checked="">
																		<span class="squarePick" style="background-color: #009900;" id="youshColorLine"></span>
																		<label>优秀</label>
																	</span>
																	<span>
																		<input type="checkbox" id="liangshLegendLine" name="legend-grid-line" value="2" checked="">
																		<span class="squarePick" style="background-color: #00B0F0;" id="liangshColorLine"></span>
																		<label>良好</label>
																	</span>
																	<span>
																		<input type="checkbox" id="zhongshLegendLine" name="legend-grid-line" value="3" checked="">
																		<span class="squarePick" style="background-color: #0070C0;" id="zhongshColorLine"></span>
																		<label>中等</label>
																	</span>
																	<span>
																		<input type="checkbox" id="chaLeshgendLine" name="legend-grid-line" value="4" checked="">
																		<span class="squarePick" style="background-color: #FFC000;" id="chashColorLine"></span>
																		<label>较差</label>
																	</span>
																	<span>
																		<input type="checkbox" id="jichashLegendLine" name="legend-grid-line" value="5" checked="">
																		<span class="squarePick" style="background-color: #C00000;" id="jichashColorLine"></span>
																		<label>极差</label>
																	</span>
																	<span>
																		<input type="checkbox" id="notCountshLegendLine" name="legend-grid-line" value="6">
																		<span class="squarePick" style="background-color: #bb10c4;" id="notCountshColorLine"></span>
																		<label>记录数≤<span class="counter">3</span></label>
																	</span>
																	<span class="fallNet">
																		<input type="checkbox" id="fallNetshLegendLine" name="legend-grid-line" value="7">
																		<span class="squarePick" style="background-color: #000;" id="fallNetshColorLine"></span>
																		<label>脱网</label>
																	</span>
																</div>
																<div class="gridTypeDiv" style="display: none;">
																	<span>
																		<input type="checkbox" id="youxhLegendLine" name="legend-grid-line" value="1" checked="">
																		<span class="squarePick" style="background-color: #009900;" id="youxhColorLine"></span>
																		<label>优秀</label>
																	</span>
																	<span>
																		<input type="checkbox" id="liangxhLegendLine" name="legend-grid-line" value="2" checked="">
																		<span class="squarePick" style="background-color: #00B0F0;" id="liangxhColorLine"></span>
																		<label>良好</label>
																	</span>
																	<span>
																		<input type="checkbox" id="zhongxhLegendLine" name="legend-grid-line" value="3" checked="">
																		<span class="squarePick" style="background-color: #0070C0;" id="zhongxhColorLine"></span>
																		<label>中等</label>
																	</span>
																	<span>
																		<input type="checkbox" id="chaxhLegendLine" name="legend-grid-line" value="4" checked="">
																		<span class="squarePick" style="background-color: #FFC000;" id="chaxhColorLine"></span>
																		<label>较差</label>
																	</span>
																	<span>
																		<input type="checkbox" id="jichaxhLegendLine" name="legend-grid-line" value="5" checked="">
																		<span class="squarePick" style="background-color: #C00000;" id="jichaxhColorLine"></span>
																		<label>极差</label>
																	</span>
																	<span>
																		<input type="checkbox" id="notCountxhLegendLine" name="legend-grid-line" value="6">
																		<span class="squarePick" style="background-color: #bb10c4;" id="notCountxhColorLine"></span>
																		<label>记录数≤<span class="counter">3</span></label>
																	</span>
																	<span class="fallNet">
																		<input type="checkbox" id="fallNetxhLegendLine" name="legend-grid-line" value="7">
																		<span class="squarePick" style="background-color: #000;" id="fallNetxhColorLine"></span>
																		<label>脱网</label>
																	</span>
																</div>
																<div class="gridTypeDiv" style="display: block;">
																	<span>
																		<input type="checkbox" id="youLegendLine" name="legend-grid-line" value="1" checked="">
																		<span class="squarePick" style="background-color: #009900;" id="youColorLine"></span>
																		<label>优秀</label>
																	</span>
																	<span>
																		<input type="checkbox" id="liangLegendLine" name="legend-grid-line" value="2" checked="">
																		<span class="squarePick" style="background-color: #00B0F0;" id="liangColorLine"></span>
																		<label>良好</label>
																	</span>
																	<span>
																		<input type="checkbox" id="zhongLegendLine" name="legend-grid-line" value="3" checked="">
																		<span class="squarePick" style="background-color: #0070C0;" id="zhongColorLine"></span>
																		<label>中等</label>
																	</span>
																	<span>
																		<input type="checkbox" id="chaLegendLine" name="legend-grid-line" value="4" checked="">
																		<span class="squarePick" style="background-color: #FFC000;" id="chaColorLine"></span>
																		<label>较差</label>
																	</span>
																	<span>
																		<input type="checkbox" id="jichaLegendLine" name="legend-grid-line" value="5" checked="">
																		<span class="squarePick" style="background-color: #C00000;" id="jichaColorLine"></span>
																		<label>极差</label>
																	</span>
																	<span>
																		<input type="checkbox" id="notCountLegendLine" name="legend-grid-line" value="6">
																		<span class="squarePick" style="background-color: #bb10c4;" id="notCountColorLine"></span>
																		<label>记录数≤<span class="counter">3</span></label>
																	</span>
																	<span class="fallNet">
																		<input type="checkbox" id="fallNetLegendLine" name="legend-grid-line" value="7">
																		<span class="squarePick" style="background-color: #000;" id="fallNetColorLine"></span>
																		<label>脱网</label>
																	</span>
																</div>
															</div>
														</fieldset>
													</td>
												</tr>
											</table>
											<table data-zindex="6">
												<tr>
													<td colspan="6">
														<div class="layer-name">
															<input type="checkbox" name="layer" id="poorArea">
															<label for="poorArea">专题图层</label>
														</div>
														<div class="layer-opacity">
															<span class="opacityText">透明度：</span>
															<input type="number" id="poorOpacity" class="iptNum" min="0" max="1" step="0.1" value="0.5">
															<button class="btn-showTableInfo"><img src="../js/IntelligentRoadTestV5/images/layer_xiala.png"></button>
														</div>
													</td>
												</tr>
												<tr>
													<td>区域边界</td>
													<td>
														<input type="checkbox" id="poor" name="type-quyu" value="0">
														<span class="squarePick" style="background-color: #F5B258;" id="poorColor"></span>
														<label>弱覆盖区</label>
													</td>
													<%--<td>
														<input type="radio" id="m3Sector" name="type-quyu" value="26">
														<span class="squarePick" style="background-color: #57b0bd;" id="m3SectorColor"></span>
														<label>MOD3干扰扇区</label>
													</td>
													<td class="nullTd"></td>
													<td>
														<input type="radio" id="cbSector" name="type-quyu" value="28">
														<span class="squarePick" style="background-color: #de5077;" id="cbSectorColor"></span>
														<label>越区覆盖扇区</label>
													</td>
													<td>
														<input type="radio" id="olSector" name="type-quyu" value="27">
														<span class="squarePick" style="background-color: #f78131;" id="olSectorColor"></span>
														<label>重叠覆盖扇区</label>
													</td>--%>
													<td class="nullTd"></td>
													<td class="nullTd"></td>
													<td>
														<input type="radio" id="upPoorArea" name="type-quyu" value="24">
														<span class="squarePick" style="background-color: #7477bf;" id="upPoorAreaColor"></span>
														<label>上行低速区</label>
													</td>
													<td>
														<input type="radio" id="downPoorArea" name="type-quyu" value="25">
														<span class="squarePick" style="background-color: #77799c;" id="downPoorAreaColor"></span>
														<label>下行低速区</label>
													</td>
													<td class="nullTd"></td>
													<td>
														<input type="radio" id="m3PoorArea" name="type-quyu" value="30">
														<span class="squarePick" style="background-color: #77799c;" id="m3PoorAreaColor"></span>
														<label>MOD3干扰区</label>
													</td>
													<td>
														<input type="radio" id="cbPoorArea" name="type-quyu" value="32">
														<span class="squarePick" style="background-color: #fc77d9;" id="cbPoorAreaColor"></span>
														<label>越区覆盖区</label>
													</td>
													<td class="nullTd"></td>
													<td>
														<input type="radio" id="olPoorArea" name="type-quyu" value="31">
														<span class="squarePick" style="background-color: #9e380f;" id="olPoorAreaColor"></span>
														<label>重叠覆盖区</label>
													</td>
												</tr>
												<tr>
													<td>区域大小</td>
													<td style="width: 66.6%;">
														<label for="">连片栅格数</label>
														<span>
															<input type="number" class="iptNum poorIptNum" id="minGridNum" min="3" step="1" value="10" onkeyup="this.value=this.value.replace(/[^0-9]+/g,'')">
															<span>--</span>
															<input type="number" class="iptNum poorIptNum" id="maxGridNum" min="11" step="1" placeholder="最大" onkeyup="this.value=this.value.replace(/[^0-9]+/g,'')">
														</span>
													</td>
												</tr>
											</table>
											<table data-zindex="7">
												<tr>
													<td colspan="6">
														<div class="layer-name">
															<input type="checkbox" name="layer" id="scene">
															<label for="scene" style="">场景图层</label>
														</div>
														<div class="layer-opacity">
															<span class="opacityText">透明度：</span>
															<input type="number" id="sceneOpacity" class="iptNum" min="0" max="1" step="0.1" value="0.5">
															<button class="btn-showTableInfo"><img src="../js/IntelligentRoadTestV5/images/layer_xiala.png"></button>
														</div>
													</td>
												</tr>
												<tr>
													<td>场景边界</td>
													<td>
														<input type="radio" id="highColleges" name="sceneRadio" value="10">
														<span class="squarePick" style="background-color: #76ACFC;" id="highCollegesColor"></span>
														<label>高校</label>
													</td>
													<td>
														<input type="radio" id="venues" name="sceneRadio" value="19">
														<span class="squarePick" style="background-color: #76ACFC;" id="venuesColor"></span>
														<label>场馆</label>
													</td>
													<td class="nullTd"></td>
													<td>
														<input type="radio" id="beautyFood" name="sceneRadio" value="18">
														<span class="squarePick" style="background-color: #76ACFC;" id="beautyFoodColor"></span>
														<label>美食</label>
													</td>
													<td>
														<input type="radio" id="beautyScenery" name="sceneRadio" value="12">
														<span class="squarePick" style="background-color: #76ACFC;" id="beautySceneryColor"></span>
														<label>美景</label>
													</td>
													<td class="nullTd"></td>
													<td>
														<input type="radio" id="concern" name="sceneRadio" value="1">
														<span class="squarePick" style="background-color: #4AA9E0;" id="concernAreaColor"></span>
														<label>关注区域</label>
													</td>
													<td>
														<input type="radio" id="bone" name="sceneRadio" value="5">
														<span class="squarePick" style="background-color: #ED666A;" id="boneAreaColor"></span>
														<label>骨头区域</label>
													</td>
													<td class="nullTd"></td>
													<td>
														<input type="radio" id="wolfArea" name="sceneRadio" value="16">
														<span class="squarePick" style="background-color: #76ACFC;" id="wolfAreaColor"></span>
														<label>战狼区域</label>
													</td>
													<td>
														<input type="radio" id="farmerMarket" name="sceneRadio" value="17">
														<span class="squarePick" style="background-color: #76ACFC;" id="farmerMarketColor"></span>
														<label>农贸市场</label>
													</td>
													<td class="nullTd"></td>
													<td>
														<input type="radio" id="highResidence" name="sceneRadio" value="9">
														<span class="squarePick" style="background-color: #76ACFC;" id="highResidenceColor"></span>
														<label>高密度住宅区</label>
													</td>
													<td>
														<input type="radio" id="highBusiness" name="sceneRadio" value="11">
														<span class="squarePick" style="background-color: #76ACFC;" id="highBusinessColor"></span>
														<label>高流量商务区</label>
													</td>
													<td class="nullTd"></td>
													<td>
														<input type="radio" id="village" name="sceneRadio" value="22">
														<span class="squarePick" style="background-color: #76ACFC;" id="villageColor"></span>
														<label>自然村</label>
													</td>
													<td>
														<input type="radio" id="cityVillage" name="sceneRadio" value="21">
														<span class="squarePick" style="background-color: #76ACFC;" id="cityVillageColor"></span>
														<label>城中村</label>
													</td>
													<td class="nullTd"></td>
													<td>
														<input type="radio" id="school" name="sceneRadio" value="20">
														<span class="squarePick" style="background-color: #76ACFC;" id="schoolColor"></span>
														<label>中小学</label>
													</td>
													<td>
														<input type="radio" id="factory" name="sceneRadio" value="23">
														<span class="squarePick" style="background-color: #76ACFC;" id="factoryColor"></span>
														<label>工厂</label>
													</td>
												</tr>
											</table>
											<table data-zindex="8">
												<tr>
													<td colspan="3">
														<div class="layer-name">
															<input type="checkbox" name="layer" id="userComplain">
															<label for="userComplain">用户抱怨图层</label>
														</div>
														<div class="layer-opacity">
															<span class="opacityText">透明度：</span>
															<input type="number" id="userOpacity" class="iptNum" min="0" max="1" step="0.1" value="0.5">
															<button class="btn-showTableInfo"><img src="../js/IntelligentRoadTestV5/images/layer_xiala.png"></button>
														</div>
													</td>
												</tr>
												<tr>
													<td>全量工单</td>
													<td>
														<input id="ly_wuxianceB" type="checkbox" name="full-order" value="投诉单">
														<span class="squarePick" style="background-color: #ff9900;" id="ly_wuxianceBColor"></span>
														<label for="ly_wuxianceB">无线侧B</label>
													</td>
													<td>
														<input id="ly_hexinceN" type="checkbox" name="full-order" value="NOC投诉单">
														<span class="squarePick" style="background-color: #69c;" id="ly_hexinceNColor"></span>
														<label for="ly_hexinceN">核心侧N</label>
													</td>
												</tr>
												<tr>
													<td class="nullTd"></td>
													<td colspan="2">
														<input id="ly_ziyuanleiC" type="checkbox" name="full-order" value="需求单">
														<span class="squarePick" style="background-color: #f66;" id="ly_ziyuanleiCColor"></span>
														<label for="ly_ziyuanleiC">资源类C</label>
													</td>
												</tr>
												<tr>
													<td>抱怨热点</td>
													<td colspan="2">
														<input id="ly_yibihuan" type="checkbox" name="complain-hot"  value="1">
														<span class="squarePick" style="background-color: #008000;" id="ly_yibihuanColor"></span>
														<label for="ly_yibihuan">已闭环</label>
														<%--<img src="../js/IntelligentRoadTestV5/images/iconClose.png" class="closeImg">--%>
													</td>
												</tr>
												<tr>
													<td class="nullTd"></td>
													<td colspan="2" style="width: 72%;">
														<input id="ly_weibihuanless3" type="checkbox" name="complain-hot" value="2">
														<span class="squarePick" style="background-color: #0070C0;" id="ly_weibihuanless3Color"></span>
														<label for="ly_weibihuanless3">未闭环持续3周以内（&lt;3）</label>
													</td>
												</tr>
												<tr>
													<td class="nullTd"></td>
													<td colspan="2" style="width: 72%;">
														<input id="ly_weibihuanmore3" type="checkbox" name="complain-hot" value="3">
														<span class="squarePick" style="background-color: #f00;" id="ly_weibihuanmore3Color"></span>
														<label for="ly_weibihuanmore3">未闭环持续3周以上（≥3）</label>
													</td>
												</tr>
												<tr>
													<td>越级工单</td>
													<td>
														<input id="ly_gongxinbukaohe" type="checkbox" name="over-order" value="工信部越级">
														<span class="squarePick" style="background-color: #f90;" id="ly_gongxinbukaoheColor"></span>
														<label for="ly_gongxinbukaohe">工信部越级考核</label>
													</td>
													<td>
														<input id="ly_jituankaohe" type="checkbox" name="over-order" value="集团越级">
														<span class="squarePick" style="background-color: #6699cc;" id="ly_jituankaoheColor"></span>
														<label for="ly_jituankaohe">集团越级考核</label>
													</td>
												</tr>
												<tr>
													<td class="nullTd"></td>
													<td>
														<input id="ly_gongxinbuguidang" type="checkbox" name="over-order" value="越级考核">
														<span class="squarePick" style="background-color: #f30;" id="ly_gongxinbuguidangColor"></span>
														<label for="ly_gongxinbuguidang">工信部越级归档</label>
													</td>
													<td>
														<input id="ly_jituanguidang" type="checkbox" name="over-order" value="越级归档">
														<span class="squarePick" style="background-color: #9c0;" id="ly_jituanguidangColor"></span>
														<label for="ly_jituanguidang">集团越级归档</label>
													</td>
												</tr>
											</table>
											<%--<table>
												<tr>
													<td colspan="3">
														<div class="layer-name">
															<input type="checkbox" name="layer" id="sector" value="3">
															<label for="sector">区划图层</label>
														</div>
														<div class="layer-opacity">
															<span class="opacityText">透明度：</span>
															<input type="number" id="sectorOpacity" class="iptNum" min="0" max="1" step="0.1" value="0.5">
															<button class="btn-showTableInfo"><img src="../js/IntelligentRoadTestV5/images/showTop5.png"></button>
														</div>
													</td>
												</tr>
												<tr>
													<td>区划边界</td>
													<td>
														<input type="checkbox" id="" name="type-quhua" value="室内">
														<label for="">地市</label>
													</td>
													<td>
														<input type="checkbox" id="" name="type-quhua" value="室外">
														<label for="">区县</label>
													</td>
													<td class="nullTd"></td>
													<td>
														<input type="checkbox" id="" name="type-quhua" value="室外和室内">
														<label for="">营服中心</label>
													</td>
												</tr>
											</table>--%>
											<div class="layer_sure">
												<div class="application" id="submitForData">确定</div>
											</div>
										</div>
										<div class="layerWrap1 definedLayer" style="display: none;">
											<ul class="defined-tabTitle">
												<li class="active">DT导入图层</li>
												<li>点导入图层</li>
												<li>多边形导入图层</li>
											</ul>
											<div class="defined-wrap">
												<div class="definedInfo" style="display: block;">
													<form name="uploadForm" id="uploadForm">
														<table>
															<tr>
																<td>图层名称：</td>
																<td><input type="text"  id="uploadName" value="" placeholder="请输入图层名称" name="uploadName"/></td>
															</tr>
															<tr>
																<td>文件时间：</td>
																<td>
																	<input id="date97" type="text" class="datebox" value="20171107" name="uploadDate" readonly="readonly"
																		   onFocus="WdatePicker({opposite:true,dateFmt:'yyyyMMdd',isShowClear:false})" />
																</td>
															</tr>
															<tr>
																<td>字段排序：</td>
																<td>
																	<div class="filedSort">
																		<div>序号</div>
																		<div>
																			<select id="Offset" name="Offset">
																				<option selected = "selected">1</option>
																				<option>2</option>
																				<option>3</option>
																				<option>4</option>
																				<option>5</option>
																				<option>6</option>
																			</select>
																		</div>
																	</div>
																	<div class="filedSort">
																		<div>时间</div>
																		<div>
																			<select id="LogTime" name="LogTime">
																				<option>1</option>
																				<option selected = "selected">2</option>
																				<option>3</option>
																				<option>4</option>
																				<option>5</option>
																				<option>6</option>
																			</select>
																		</div>
																	</div>
																	<div class="filedSort">
																		<div>经度</div>
																		<div>
																			<select id="GPS_Lon" name="GPS_Lon">
																				<option>1</option>
																				<option>2</option>
																				<option selected = "selected">3</option>
																				<option>4</option>
																				<option>5</option>
																				<option>6</option>
																			</select>
																		</div>
																	</div>
																	<div class="filedSort">
																		<div>纬度</div>
																		<div>
																			<select id="GPS_Lat" name="GPS_Lat">
																				<option>1</option>
																				<option>2</option>
																				<option>3</option>
																				<option selected = "selected">4</option>
																				<option>5</option>
																				<option>6</option>
																			</select>
																		</div>
																	</div>
																	<div class="filedSort">
																		<div>RSRP</div>
																		<div>
																			<select id="PCell" name="PCell">
																				<option>1</option>
																				<option>2</option>
																				<option>3</option>
																				<option>4</option>
																				<option selected = "selected">5</option>
																				<option>6</option>
																			</select>
																		</div>
																	</div>
																	<div class="filedSort">
																		<div>备注</div>
																		<div>
																			<select id="remark" name="dtRemark">
																				<option>1</option>
																				<option>2</option>
																				<option>3</option>
																				<option>4</option>
																				<option>5</option>
																				<option selected = "selected">6</option>
																			</select>
																		</div>
																	</div>
																</td>
															</tr>
															<tr>
																<td></td>
																<td><input type="file" class="importFile"  value="DT导入" name="fujian" id="fujian" accept=".csv"/></td>
															</tr>
															<tr>
																<td colspan="2" class="btnTD"><input type="button" class="btn-bg btn-upload" value="上传" id="upload"/></td>
															</tr>
														</table>
													</form>
													<div class="tipInfoCon">
														文件必须为csv文件，最多13个字段，前6个为必填，首行为字段名。<br />
														前5列可自由选择列顺序，不选则为默认顺序。<br />
														上传CSV文件字段规范：序号、时间、经度、纬度、主RSRP、主ENODEBID_CELLID、邻区1RSRP、邻区1ENODEBID_CELLID、邻区2RSRP、邻区2ENODEBID_CELLID、邻区3RSRP、邻区3ENODEBID_CELLID。<br />
														经纬度、各RSRP为double类型。时间格式：HH:MM:SS

													</div>
													<div id="message" class="message">
														<!-- 提示信息 -->
													</div>
												</div>
												<div class="definedInfo">
													<form name="pointForm" id="pointForm">
														<table>
															<tr>
																<td>图层名称：</td>
																<td><input type="text"  id="uploadName2" value="" placeholder="请输入图层名称" name="uploadName"/></td>
															</tr>
															<tr>
																<td>文件时间：</td>
																<td>
																	<input id="date98" type="text" class="datebox" value="20171107" name="uploadDate" readonly="readonly"
																		   onFocus="WdatePicker({opposite:true,dateFmt:'yyyyMMdd',isShowClear:false})" />
																</td>
															</tr>
															<tr>
																<td>字段排序：</td>
																<td>
																	<div class="filedSort">
																		<div>序号</div>
																		<div>
																			<select id="Offset2" name="Offset">
																				<option selected = "selected">1</option>
																				<option>2</option>
																				<option>3</option>
																				<option>4</option>
																				<option>5</option>
																				<option>6</option>
																			</select>
																		</div>
																	</div>
																	<div class="filedSort">
																		<div>时间</div>
																		<div>
																			<select id="LogTime2" name="LogTime">
																				<option>1</option>
																				<option selected = "selected">2</option>
																				<option>3</option>
																				<option>4</option>
																				<option>5</option>
																				<option>6</option>
																			</select>
																		</div>
																	</div>
																	<div class="filedSort">
																		<div>经度</div>
																		<div>
																			<select id="GPS_Lon2" name="GPS_Lon">
																				<option>1</option>
																				<option>2</option>
																				<option selected = "selected">3</option>
																				<option>4</option>
																				<option>5</option>
																				<option>6</option>
																			</select>
																		</div>
																	</div>
																	<div class="filedSort">
																		<div>纬度</div>
																		<div>
																			<select id="GPS_Lat2" name="GPS_Lat">
																				<option>1</option>
																				<option>2</option>
																				<option>3</option>
																				<option selected = "selected">4</option>
																				<option>5</option>
																				<option>6</option>
																			</select>
																		</div>
																	</div>
																	<div class="filedSort">
																		<div>取值</div>
																		<div>
																			<select id="value2" name="PCell">
																				<option>1</option>
																				<option>2</option>
																				<option>3</option>
																				<option>4</option>
																				<option selected = "selected">5</option>
																				<option>6</option>
																			</select>
																		</div>
																	</div>
																	<div class="filedSort">
																		<div>备注</div>
																		<div>
																			<select id="remark2" name="pointRemark">
																				<option>1</option>
																				<option>2</option>
																				<option>3</option>
																				<option>4</option>
																				<option>5</option>
																				<option selected = "selected">6</option>
																			</select>
																		</div>
																	</div>
																</td>
															</tr>
															<tr>
																<td></td>
																<td>
																	<input type="hidden"  name="pointColor" id="pointColor" />
																	<input type="file" class="importFile"  value="DT导入" name="fujian" id="fujian2" accept=".csv"/>
																	<div class="colorDiv">
																		<span>选择颜色：</span>
																		<span id="pointSquarePick" class="squarePick" style="background-color: #FE8586"></span>
																	</div>
																</td>
															</tr>
															<tr>
																<td colspan="2" class="btnTD"><input type="button" class="btn-bg btn-upload" value="上传" id="PointUpload"/></td>
															</tr>
														</table>
													</form>
													<div class="tipInfoCon">
														文件必须为csv文件，最多6个字段，前6个为必填，首行为字段名。<br />
														前6列可自由选择列顺序，不选则为默认顺序。<br />
														上传CSV文件字段规范：序号、时间、经度、纬度、取值、备注。<br />
														经纬度、取值为double类型。时间格式：HH:MM:SS

													</div>
													<div id="message2" class="message2">
														<!-- 提示信息 -->
													</div>
												</div>
												<div class="definedInfo">
													<form name="uploadForm3" id="polygonForm">
														<table>
															<tr>
																<td>图层名称：</td>
																<td><input type="text"  id="uploadName3" value="" placeholder="请输入图层名称" name="uploadName"/></td>
															</tr>
															<tr>
																<td>文件时间：</td>
																<td>
																	<input id="date99" type="text" class="datebox" value="20171107" name="uploadDate" readonly="readonly"
																		   onFocus="WdatePicker({opposite:true,dateFmt:'yyyyMMdd',isShowClear:false})" />
																</td>
															</tr>
															<tr>
																<td>字段排序：</td>
																<td>
																	<div class="filedSort">
																		<div>序号</div>
																		<div>
																			<select id="Offset3" name="Offset">
																				<option selected = "selected">1</option>
																				<option>2</option>
																				<option>3</option>
																				<option>4</option>
																				<option>5</option>
																			</select>
																		</div>
																	</div>
																	<div class="filedSort">
																		<div>时间</div>
																		<div>
																			<select id="LogTime3" name="LogTime">
																				<option>1</option>
																				<option selected = "selected">2</option>
																				<option>3</option>
																				<option>4</option>
																				<option>5</option>
																			</select>
																		</div>
																	</div>
																	<div class="filedSort">
																		<div>经纬度集</div>
																		<div>
																			<select id="GIS_DATA" name="GIS_DATA">
																				<option>1</option>
																				<option>2</option>
																				<option selected = "selected">3</option>
																				<option>4</option>
																				<option>5</option>
																			</select>
																		</div>
																	</div>
																	<div class="filedSort">
																		<div>取值</div>
																		<div>
																			<select id="PCell3" name="PCell">
																				<option>1</option>
																				<option>2</option>
																				<option>3</option>
																				<option selected = "selected">4</option>
																				<option>5</option>
																			</select>
																		</div>
																	</div>
																	<div class="filedSort">
																		<div>备注</div>
																		<div>
																			<select id="remark3" name="polygonRemark">
																				<option>1</option>
																				<option>2</option>
																				<option>3</option>
																				<option>4</option>
																				<option selected = "selected">5</option>

																			</select>
																		</div>
																	</div>
																</td>
															</tr>
															<tr>
																<td></td>
																<td>
																	<input type="hidden"  name="polygonColor" id="polygonColor" />
																	<input type="file" class="importFile"  value="DT导入" name="fujian" id="fujian3" accept=".csv"/>
																	<div class="colorDiv">
																		<span>选择颜色：</span>
																		<span id="polygonSquarePick" class="squarePick" style="background-color: #FE8586"></span>
																	</div>
																</td>
															</tr>
															<tr>
																<td colspan="2" class="btnTD"><input type="button" class="btn-bg btn-upload" value="上传" id="polygonUpload"/></td>
															</tr>
														</table>
													</form>
													<div class="tipInfoCon">
														文件必须为csv文件，最多5个字段，前5个为必填，首行为字段名。<br />
														各列可自由选择列顺序，不选则为默认顺序。<br />
														上传CSV文件字段规范：序号、时间、经纬度集、取值、备注。<br />
														取值为double类型。时间格式：HH:MM:SS。经纬度集用双引号包括，@分割点，逗号分割经纬度

													</div>
													<div id="message3" class="message3">
														<!-- 提示信息 -->
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<%--<div class="settingDiv">
                                    <div class="layerBtn">
                                        &lt;%&ndash;<a href="javascript:;" id="layerAdd"><img src="../js/IntelligentRoadTestV5/images/layer_add.png">新增</a>&ndash;%&gt;
                                        <a href="javascript:;" id="layerSetTop"><img src="../js/IntelligentRoadTestV5/images/layer_top.png">置頂</a>
                                        <a href="javascript:;" id="layerSetUp"><img src="../js/IntelligentRoadTestV5/images/layer_up.png">上移</a>
                                        <a href="javascript:;" id="layerSetDown"><img src="../js/IntelligentRoadTestV5/images/layer_down.png">下移</a>
                                        <a href="javascript:;" id="layerSetBottom"><img src="../js/IntelligentRoadTestV5/images/layer_bottom.png">置底</a>
                                    </div>
                                    <ul class="checkboxDiv" id="layerUl">
                                        <li>
                                            <input type="checkbox" id="sector">
                                            <span id="colorSector" class="colorPick" style="background-color: #9966CC;"></span>
                                            <label>扇区</label>
                                        </li>
                                        <li>
                                            <input type="checkbox" id="poor">
                                            <span id="colorPoor" class="colorPick" style="background-color: #FF9900;"></span>
                                            <label>弱区</label>
                                        </li>
                                        <li>
                                            <input type="checkbox" id="concernArea">
                                            <span id="colorConcernArea" class="colorPick" style="background-color: #4AA9E0;"></span>
                                            <label>关注区域</label>
                                        </li>
                                        <li>
                                            <input type="checkbox" id="boneArea">
                                            <span id="colorBoneArea" class="colorPick" style="background-color: #ED666A;"></span>
                                            <label>骨头区域</label>
                                        </li>
                                        <li>
                                            <input type="checkbox" id="grid">
                                            <span class="colorPick colorBgImg"></span>
                                            &lt;%&ndash;<img class="colorPick colorBgImg" src="../js/IntelligentRoadTestV5/images/grid.png">&ndash;%&gt;
                                            <label>弱区柵格</label>
                                        </li>
                                        <li style="display: none">
                                            <input type="checkbox" id="highWay">
                                            <span id="colorHighWay" class="colorPick" style="background-color: #9966CC;"></span>
                                            <label>高速</label>
                                        </li>
                                        <li style="display: none">
                                            <input type="checkbox" id="rail">
                                            <span id="colorRail" class="colorPick" style="background-color: #9966CC;"></span>
                                            <label>高铁</label>
                                        </li>
                                        <li style="display: none">
                                            <input type="checkbox" id="cityRoad">
                                            <span id="colorCityRoad" class="colorPick" style="background-color: #9966CC;"></span>
                                            <label>市政路</label>
                                        </li>
                                        <li style="display: none">
                                            <input type="checkbox" id="metro">
                                            <span id="colorMetro" class="colorPick" style="background-color: #9966CC;"></span>
                                            <label>地铁</label>
                                        </li>
                                    </ul>
                                </div>
                                <div class="layerBtm">
                                    <span class="opacityDiv">
                                        <span class="opacityText">透明度：</span>
                                        <input type="number" id = "userSetOpacity" class="iptNum" min="0" max="1" step="0.1" value="0.5">
                                    </span>
                                    <span class="application" id="submitForData">确定</span>
                                </div>--%>
							</div>
						</li>
						<li class="select-text" id="BoxSelection">
							<div class="select-name" title="地图框选">
								<span class="name-img">
									<i class="icon icon_boxSelection"></i>
								</span>
								<a href="javascript:;" class="selectA">地图框选</a>
							</div>
						</li>
						<li class="select-text threeCompDiv" id="threeComp">
							<div class="select-name" title="三网对比">
								<span class="name-img">
									<i class="icon icon_threeComp"></i>
								</span>
								<a href="javascript:;" class="selectA">三网对比</a>
							</div>
						</li>
						<li class="select-text threeCompDiv" id="screenComp">
							<div class="select-name" title="分屏对比">
								<span class="name-img">
									<i class="icon icon_screenComp"></i>
								</span>
								<a href="javascript:;" class="selectA">分屏对比</a>
							</div>
						</li>
						<li class="select-text" id="gageDistance">
							<div class="select-name" title="测距测角">
								<span class="name-img">
									<i class="icon icon_gageDistance"></i>
								</span>
								<a href="javascript:;" class="selectA">测距测角</a>
							</div>
						</li>
						<li class="select-text" id="coordinatePick">
							<div class="select-name" title="坐标拾取">
								<span class="name-img">
									<i class="icon icon_coordinatePick"></i>
								</span>
								<a href="javascript:;" class="selectA">坐标拾取</a>
							</div>
						</li>
						<li class="select-text" id="exportData">
							<div class="select-name" title="统计导出">
								<span class="name-img">
									<i class="icon icon_exportData"></i>
								</span>
								<a href="javascript:;" class="selectA">统计导出</a>
							</div>
						</li>
						<li class="select-text" id="helpTip">
							<div class="select-name" title="帮助">
								<span class="name-img">
									<i class="icon icon_help"></i>
								</span>
								<a href="javascript:;" class="selectA">帮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;助</a>
							</div>
							<div class="help-info">
								<iframe src="../js/IntelligentRoadTestV5/html/helpInfo20181227.html" style="width:100%; height:100%;" scrolling="yes" frameborder="0"></iframe>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="mapDiv" onselectstart="return false">
				<!-- 百度地图的div -->
				<div id="baiduMap" class="baiduMap"></div>
				<div id="OsmMap" class="baiduMap" style="display: none"></div>
				<div class="clickOpersComp" style="display: none;">
					<!-- 移动百度地图div -->
					<div class="MobileDiv">
						<div class="dragDiv">
							<div  class="li-Mobile logoDiv"><a href="javascript:;"><img src="../js/opersComp/images/Mobile_logo.png"/></a></div>
							<div class="Mobile coverDiv" id="MobileDiv" title="移动覆盖">
								<div class="smallMap" id="smallMobile">
									<div class="cover-title">
										<span>移动覆盖</span><a href="javascript:;" class="close-coverDiv">x</a>
									</div>
									<div id="mapMobile"></div>
								</div>
							</div>
						</div>
					</div>
					<!-- 联通百度地图div -->
					<div class="UnicomDiv">
						<div class="dragDiv">
							<div class="li-Unicom logoDiv"><a href="javascript:;"><img src="../js/opersComp/images/Unicom_logo.png"/></a></div>
							<div class="Unicom coverDiv" id="UnicomDiv" title="联通覆盖">
								<div class="smallMap" id="smallUnicom">
									<div class="cover-title">
										<span>联通覆盖</span><a href="javascript:;" class="close-coverDiv">x</a>
									</div>
									<div id="mapUnicom"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 百度地图提示框 -->
				<div class="tipCon" id="tip">
					<div>
						<label id="lblTip"></label>
					</div>
				</div>
				<!-- 百度地图提示框 -->
				<div class="tipCon" id="tip_2">
					<div>
						<label id="lblTip_2"></label>
					</div>
				</div>
				<%--tooltip 提示框--%>
				<div class="circleTip" id="cirTip"></div>
				<%--circleTipLeft 提示框--%>
				<div class="circleTipLeft" id="cirTipLeft"></div>
			</div>
			<div class="panelWrap">
				<ul class="coordinateType">
					<li>
						<input type="radio" id="radioGPS" name="coordinate" checked>
						<label for="radioGPS">硬件GPS坐标</label>
					</li>
					<li>
						<input type="radio" id="radioBaidu" name="coordinate">
						<label for="radioBaidu">百度地图坐标</label>
					</li>
                    <li>
                        <div class="NrDiv">
							<input type="checkbox" id="showNrCheckbox" name="showNrCheckbox" checked>
							<span class="NrText">附近4G覆盖</span>
							<span class="triangle"></span>
							<ul class="NrUl" style="display: none;">
								<li data-nrcover="2G">附近2G覆盖</li>
								<li data-nrcover="4G" class="selected">附近4G覆盖</li>
							</ul>
						</div>
                    </li>
				</ul>
				<%--<div class="panelDiv" id="oldPanelDiv">
					<div class="tabLists">
						<ul class="rowDiv">
							<li class="bg-orange" id="poorAreaLogo">
								<a href="javascript:;" class="poorClick" >
									<img src="../js/IntelligentRoadTestV5/images/img_poor.png">
									<span>弱区</span>
								</a>
							</li>
							<li class="bg-blue" id="concernAreaLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_ConcernArea.png">
									<span>关注区域</span>
								</a>
							</li>
							<li class="bg-purple" id="sectorLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_sector.png">
									<span>扇区</span>
								</a>
							</li>
							<li class="bg-red" id="alarmInfoLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_alarmInfo.png">
									<span>工单</span>
								</a>
							</li>
							<li class="bg-green" id="dtLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_layer.png">
									<span>自定义图层</span>
								</a>
							</li>
							<li class="bg-bone" id="boneLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_bone.png">
									<span>骨头区域</span>
								</a>
							</li>
							<li class="bg-macSector" id="macSectorLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_macSector.png">
									<span>宏扇区坐标堪误</span>
								</a>
							</li>
						</ul>
					</div>
					<div class="sceneList">
						<ul class="rowUl">
							<li class="colWidth4">
								<img src="../js/IntelligentRoadTestV5/images/scene1.png">
								<span>高速</span>
							</li>
							<li class="colWidth4">
								<img src="../js/IntelligentRoadTestV5/images/scene2.png">
								<span>高铁</span>
							</li>
							<li class="colWidth4">
								<img src="../js/IntelligentRoadTestV5/images/scene10.png">
								<span>市政路</span>
							</li>
							<li class="colWidth4 border_none">
								<img src="../js/IntelligentRoadTestV5/images/scene5.png">
								<span>地铁</span>
							</li>
							<li class="colWidth4">
								<img src="../js/IntelligentRoadTestV5/images/scene4.png">
								<span>高校</span>
							</li>
							<li class="colWidth4">
								<img src="../js/IntelligentRoadTestV5/images/scene9.png">
								<span>场馆</span>
							</li>
							<li class="colWidth2 flex3">
								<img src="../js/IntelligentRoadTestV5/images/scene3.png">
								<span>高密度住宅区</span>
							</li>
							<li class="colWidth4">
								<img src="../js/IntelligentRoadTestV5/images/scene7.png">
								<span>美食</span>
							</li>
							<li class="colWidth4">
								<img src="../js/IntelligentRoadTestV5/images/scene8.png">
								<span>美景</span>
							</li>
							<li class="colWidth2 flex3">
								<img src="../js/IntelligentRoadTestV5/images/scene6.png">
								<span>高流量商务区</span>
							</li>
							<li &lt;%&ndash;class="colWidth2 li_warwolf"&ndash;%&gt; class="colWidth4">
								<img src="../js/IntelligentRoadTestV5/images/scene11.png">
								<span>战狼区</span>
							</li>
							<li &lt;%&ndash;class="colWidth2 li_market"&ndash;%&gt; class="colWidth4">
								<img src="../js/IntelligentRoadTestV5/images/scene12.png">
								<span>市场</span>
							</li>
							<li id="schoolLogo" &lt;%&ndash;style="display: none;"&ndash;%&gt; class="colWidth4">
								<img src="../js/IntelligentRoadTestV5/images/scene15.png">
								<span>中小学</span>
							</li>
							<li id="naturalVillageLogo" style="display: none;" class="colWidth4">
								<img src="../js/IntelligentRoadTestV5/images/scene13.png">
								<span>自然村</span>
							</li>
							<li id="cityVillagesLogo" &lt;%&ndash;style="display: none;"&ndash;%&gt;>
								<img src="../js/IntelligentRoadTestV5/images/scene14.png">
								<span>城中村</span>
							</li>
							<li id="factoryLogo" style="display: none;" >
								<img src="../js/IntelligentRoadTestV5/images/scene16.png">
								<span>工&emsp;厂</span>
							</li>
						</ul>
					</div>
				</div>--%>
				<div class="panelDiv" id="">
					<div class="tabLists">
						<ul class="rowDiv">
							<li class="bg-orange colWidth2" id="poorAreaLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_poor.png">
									<span>弱覆盖区</span>
								</a>
							</li>
							<li class="bg-blue colWidth2" id="concernAreaLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_ConcernArea.png">
									<span>关注区</span>
								</a>
							</li>
							<li class="bg_down colWidth4" id="downLowSpeedLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_downLowSpeed.png">
									<span>下行低速区</span>
								</a>
							</li>
							<li class="bg_up colWidth4" id="upLowSpeedLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_upLowSpeed.png">
									<span>上行低速区</span>
								</a>
							</li>
							<li class="bg-purple colWidth4" id="sectorLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_sector.png">
									<span>扇区</span>
								</a>
							</li>
							<li class="bg-complain colWidth4" id="userComplainLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_complain.png">
									<span>用户抱怨</span>
								</a>
							</li>
							<li class="bg-mod3 colWidth2" id="MOD3InterfereLogo" style="display: none;">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_MOD3.png">
									<span>MOD3干扰区(小区级)</span>
								</a>
							</li>
							<li class="bg-across colWidth4" id="acrossCoverAreaLogo" style="display: none;">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_across.png">
									<span>越区覆盖区(小区级)</span>
								</a>
							</li>
							<li class="bg-overlap colWidth4" id="overlapCoverAreaLogo" style="display: none;">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_overlap.png">
									<span>重叠覆盖区(小区级)</span>
								</a>
							</li>
							<li class="bg-mod3 colWidth2" id="m3PoorAreaLogo" >
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_MOD3.png">
									<span>MOD3干扰区</span>
								</a>
							</li>
							<li class="bg-across colWidth4" id="cbPoorAreaLogo" >
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_across.png">
									<span>越区覆盖区</span>
								</a>
							</li>
							<li class="bg-overlap colWidth4" id="olPoorAreaLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_overlap.png">
									<span>重叠覆盖区</span>
								</a>
							</li>
							<li class="bg-bone colWidth4" id="boneLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_bone.png">
									<span>骨头区</span>
								</a>
							</li>
							<li class="bg-macSector colWidth4" id="macSectorLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_macSector.png">
									<span>台账勘误</span>
								</a>
							</li>
							<li class="bg-red colWidth4" id="alarmInfoLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_alarmInfo.png">
									<span>工单</span>
								</a>
							</li>
							<li class="bg-green colWidth4" id="dtLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentRoadTestV5/images/img_layer.png">
									<span>我的图层</span>
								</a>
							</li>
						</ul>
					</div>
					<div class="sceneList">
						<ul class="rowUl">
							<li id="highwayLogo">
								<img src="../js/IntelligentRoadTestV5/images/scene1.png">
								<span>高&emsp;速</span>
							</li>
							<li id="railLogo">
								<img src="../js/IntelligentRoadTestV5/images/scene2.png">
								<span>高&emsp;铁</span>
							</li>
							<li id="cityRoadLogo">
								<img src="../js/IntelligentRoadTestV5/images/scene10.png">
								<span>市政路</span>
							</li>
							<li id="metroLogo" class="border_none">
								<img src="../js/IntelligentRoadTestV5/images/scene5.png">
								<span>地&emsp;铁</span>
							</li>
							<li id="collegeLogo">
								<img src="../js/IntelligentRoadTestV5/images/scene4.png">
								<span>高&emsp;校</span>
							</li>
							<li id="siteLogo">
								<img src="../js/IntelligentRoadTestV5/images/scene9.png">
								<span>场&emsp;馆</span>
							</li>
							<li id="uptownLogo">
								<img src="../js/IntelligentRoadTestV5/images/scene3.png">
								<span>住宅区</span>
							</li>
							<li id="businessLogo" class="border_none">
								<img src="../js/IntelligentRoadTestV5/images/scene6.png">
								<span>商务区</span>
							</li>
							<li id="foodLogo">
								<img src="../js/IntelligentRoadTestV5/images/scene7.png">
								<span>美&emsp;食</span>
							</li>
							<li id="sceneryLogo">
								<img src="../js/IntelligentRoadTestV5/images/scene8.png">
								<span>美&emsp;景</span>
							</li>
							<li id="marketLogo">
								<img src="../js/IntelligentRoadTestV5/images/scene12.png">
								<span>市&emsp;场</span>
							</li>
							<li id="warwolfLogo" class="border_none">
								<img src="../js/IntelligentRoadTestV5/images/scene11.png">
								<span>战狼区</span>
							</li>
							<li id="schoolLogo" class="colWidth2">
								<img src="../js/IntelligentRoadTestV5/images/scene15.png">
								<span>中小学</span>
							</li>
							<li id="naturalVillageLogo" style="display: none;">
								<img src="../js/IntelligentRoadTestV5/images/scene13.png">
								<span>自然村</span>
							</li>
							<li id="cityVillagesLogo" class="colWidth2" >
								<img src="../js/IntelligentRoadTestV5/images/scene14.png">
								<span>城中村</span>
							</li>
							<li id="factoryLogo" style="display: none;">
								<img src="../js/IntelligentRoadTestV5/images/scene16.png">
								<span>工&emsp;厂</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="listInfo">
					<%--弱区开始--%>
					<div class="listDiv" id="showPoorAreaList" style="display: none;">
						<div class="listWrap">
							<div class="searchTitle">在“广州”天河区域内搜索</div>
							<ul class="listTopUl">
								<li class="selectCity" id="poorAreaSelectCity">
									<div class="select-name selectCity-name" v-on:click="showSelectInfo($event)">
										<img src="../js/IntelligentRoadTestV5/images/nor_add.png" class="name-icon">
										<span class="city-selected" id="poorAreaCityName">广州</span>
										<span class="city-selected-gt">&gt;</span>
										<span class="district-selected" id="poorAreaDistrictName">天河</span>
										<span class="mktcenter-selected-gt">&gt;</span>
										<span class="mktcenter-selected" id="poorAreaMktName">全区</span>
										<span class="triangle"></span>
									</div>
									<div class="select-info city-info" style="display: none;">
										<ul id="poorAreaSelectCityList" class="threeLevel"></ul>
									</div>
								</li>
								<li class="classify">
									<div class="select-name" v-on:click="showSelectInfo($event)"><span id="rfgListSelectName">全部分类</span><span class="triangle"></span></div>
									<div class="select-info" id="rfgList">
										<div class="flexRow">
											<div class="flexCol">全部分类</div>
											<div class="flexCol selected">全部</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">附近扇区</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">有告警</div>
											<div class="flexCol">无告警</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">接入扇区</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">有告警</div>
											<div class="flexCol">无告警</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">处理建议</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">优化</div>
											<div class="flexCol">维护</div>
											<div class="flexCol"></div>
											<div class="flexCol">规划</div>
											<div class="flexCol">工程</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">区域类型</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">市区</div>
											<div class="flexCol">县城</div>
											<div class="flexCol"></div>
											<div class="flexCol">乡镇</div>
											<div class="flexCol">农村</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">是否新增</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">是</div>
											<div class="flexCol">否</div>
										</div>
									</div>
								</li>
								<li class="recomendSort" id="rfgSort">
									<div class="select-name" v-on:click="showSelectInfo($event)"><span>推荐排序</span><span class="triangle"></span></div>
									<div class="select-info">
										<ul class="sortUl">
											<li class="selected">推荐排序</li>
											<li>下切优先</li>
											<li>流量优先</li>
											<li>感知优先</li>
											<li>弱覆盖优先</li>
											<li>用户数优先</li>
										</ul>
									</div>
								</li>
							</ul>
							<div class="listDivWrap" id="showPoorListDiv">
								<ul class="listUL">
									<li v-for = "(item , index , key ) in poorAreaList" class="cursor"  v-on:click = "showMessage(item,index)" v-on:mouseover = "turnMk(index,item)">
										<div class="colDiv">
											<span class="numSpan2" v-cloak>{{ index + 1  }}</span>
											<div class="bold" v-cloak>{{ typeName }}编号：{{ item.object_id }}</div>
											<div class="rightImg">
												<span v-if="item.new_added_flag == 1"><img class="" src="../js/IntelligentRoadTestV5/images/zeng.png"></span>
												<span v-if="item.ishasorder == 1"><img class="" src="../js/IntelligentRoadTestV5/images/pai.png"></span>
											</div>
										</div>
										<div class="colDiv">
											<div class="yfcenter" v-cloak>{{ item.mktcenter }}营服中心</div>
										</div>
										<div class="colDiv">
											<span class="cellNameEllipsis" v-bind:title="item.cell_name" v-cloak>最近扇区：{{ item.cell_name }}</span>
										</div>

										<%--<div class="colDiv">
											<div class="spanGroup">
												<span class="border_blue bg_duelType">
													<span v-if="item.do_type=='规划'"><span class="color_white">规</span>建维优</span>
													<span v-else-if="item.do_type=='建议'">规<span class="color_white">建</span>维优</span>
													<span v-else-if="item.do_type=='维护'">规建<span class="color_white">维</span>优</span>
													<span v-else="item.do_type=='优化'">规建维<span class="color_white">优</span></span>
												</span>
												<span class="">
													<span class="border_blue bg_order" v-if="item.ishasorder == 1">派单</span>
													<span class="border_blue border_grey" v-else>派单<img class="icon_no" src="../js/IntelligentRoadTestV5/images/icon_no.png"/></span>
												</span>
												<span class="border_blue bg_areaType">
													<span v-if="item.belong_area_id=='市区'"><span class="color_white">市</span>县乡村</span>
													<span v-else-if="item.belong_area_id=='县城'">市<span class="color_white">县</span>乡村</span>
													<span v-else-if="item.belong_area_id=='乡镇'">市县<span class="color_white">乡</span>村</span>
													<span v-else="item.belong_area_id=='农村'">市县乡<span class="color_white">村</span></span>
												</span>
												<span class="">
													<span class="border_blue bg_new" v-if="item.new_added_flag == 1">新增</span>
													<span class="border_blue border_grey" v-else>新增<img class="icon_no" src="../js/IntelligentRoadTestV5/images/icon_no.png"/></span>
												</span>
											</div>
										</div>
										<div class="colDiv">
											<span class="bg_sense" v-if="item.scene_type != null && item.scene_type != ''">{{ item.scene_type.replace(/,/g,"，") }}</span>
										</div>--%>
									</li>
								</ul>
								<div class="pageWrap">
									<div class="page">
										<div class="page-pagination">
											<a href="javascript:;" class="first-active"  v-on:click = "goFirst"></a>
											<a href="javascript:;" class="prev-active" v-on:click="lastOrNext(0)" ></a>
										</div>
										<div >
											第<input class="page-num" type="text" id="rfgPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
											<input  type="hidden">
										</div>
										<div class="page-pagination">
											<a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
											<a href="javascript:;" class="last-active" v-on:click="goLast"></a>
										</div>
										<div>
											<a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTestV5/images/111_11.png"></a>
										</div>
									</div>
									<div class="page-info" id="poorAreaCountMessage" <%--style="display: none;"--%>>
										<%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
										共<span v-cloak>{{ totalCounts }}</span>条数据
									</div>
								</div>
							</div>
						</div>
						<div class="detailList">
							<div class="backList" id="poorAreaCount"> &lt; 返回上一级</div>
							<div class="detailListDiv" id="poorAreaCompleteMessage">
								<div class="infoHeader">
									<div class="brDiv">
										<span v-cloak>
											区域编号：{{ poorAreaData.object_id }}
											<button id="poorPosition" class="positionDivBtn" v-on:click="poorPosition(poorAreaData)">
												<img class="" src="../js/IntelligentRoadTestV5/images/white_position.png" title="定位">
											</button>
											 <button  class="positionDivBtn showBtn positionClass" v-on:click="showPolygonGrid(poorAreaData,$event)">
												<img class="imgClass" src="../js/IntelligentRoadTest/images/showP.png" title="显示">
											</button>
										</span>
										<span class="fRight" v-cloak>
											<div v-cloak>区域类型：{{ poorAreaData.belong_area_id }}</div>
										</span>
									</div>
									<div class="brDiv">
										<span>{{ poorAreaData.mktcenter }}营服中心</span>
										<span class="fRight" v-cloak>处理分类：{{ poorAreaData.do_type }}</span>
									</div>
								</div>
								<ul class="infoBody">
									<li>
										<div class="floatLeft">
											<img src="../js/IntelligentRoadTestV5/images/address_red.png">
											<span v-cloak>{{ poorAreaData.city }}</span> &gt;
											<span v-cloak>{{ poorAreaData.country }}</span>
										</div>
										<div class="floatRight">
											<span class="nameInfo" v-cloak>{{ poorAreaData.day }}</span>
										</div>
									</li>
									<li>
										<div v-cloak>场景：{{ poorAreaData.scene_type }}</div>
									</li>
									<li>
										<div class="inline">
											<img src="../js/IntelligentRoadTestV5/images/change7.png">
											<span class="nameInfo">历史7天变化</span>
										</div>
									</li>
									<li>
										<div id="gridThrLineChart" class="chartDiv"></div>
									</li>
									<li>
										<div class="inline">
											<img src="../js/IntelligentRoadTestV5/images/change7.png">
											<span class="nameInfo">感知速率</span>
										</div>
									</li>
									<li>
										<div id="poorAreaSecondChart" class="chartDiv"></div>
									</li>
									<li class="liWrap nrTop5Cell">
										<div class="nameBtn searchCellDiv text_center" v-on:click="showDetailInfo($event)">
											<div class="floatLeft">
												<img src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">附近扇区</span>
											</div>
											<div class="inline" v-if="poorAreaData.isHasSameSector != true">未就近接入</div>
											<div class="floatRight">
												<button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,poorAreaData,1)"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;">
											<li v-for="(data , index , key) in nrTop5Cell" class="cellInfoWrap">
												<div class="cellName" v-cloak v-on:click="gotoShowSectorMessage(data)">
													<span>扇区名称：</span>
													<span v-if="data.recent_cell_name == null || data.recent_cell_name == ''">--</span>
													<span class="sectorNameEllipsis" v-bind:title="data.recent_cell_name" v-else>{{ data.recent_cell_name }}</span>
												</div>
												<div class="cellInfoDiv">
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站编号</span><span class="blueInfo" v-cloak>{{ data.enodebid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">小区编号</span><span class="blueInfo" v-cloak>{{ data.cellid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(m)</span>
														<span class="blueInfo" v-cloak v-if="data.distance == null || data.distance == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">MR数量</span>
														<span class="blueInfo" v-cloak v-if="data.counts == null || data.counts == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ data.counts }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li class="liWrap mrNrTop5Cell">
										<div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">接入扇区</span>
											</div>
											<div class="floatRight">
												<button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,poorAreaData,2)"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;">
											<li class="cellInfoWrap" v-for="(data , index , key )  in mrNrTop5Cell">
												<div class="cellName" v-cloak v-on:click="gotoShowSectorMessage(data)">
													<span>扇区名称：</span>
													<span v-if="data.recent_cell_name == null || data.recent_cell_name == ''">--</span>
													<span class="sectorNameEllipsis" v-bind:title="data.recent_cell_name" v-else>{{ data.recent_cell_name }}</span>
												</div>
												<div class="cellInfoDiv">
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站编号</span><span class="blueInfo" v-cloak>{{ data.enodebid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">小区编号</span><span class="blueInfo" v-cloak>{{ data.cellid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(m)</span>
														<span class="blueInfo" v-cloak v-if="data.distance == null || data.distance == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">MR数量</span>
														<span class="blueInfo" v-cloak v-if="data.counts == null || data.counts == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ data.counts }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li class="liWrap specialSectorLi" v-show="zhuantiName != '' && zhuantiName != '越区覆盖'">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">{{ zhuantiName }}扇区</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" style="display: none;">
											<li class="liWrap" v-for="(model , modelIndex) in zhuantiNRSectorList">
												<div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
													<div class="inline">
														<span class="nameInfo" v-cloak>{{model.modelName}}</span>
													</div>
													<div class="floatRight">
														<button class="linkCell" title="显示连线" v-on:click="showNRLinkCell($event,poorAreaData,model.modeSectorList ,modelIndex)"></button>
														<button class="btn-showInfo">
															<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
														</button>
													</div>
												</div>
												<ul class="ulDetailInfo" style="display: none;">
													<li class="specialInfoWrap" v-for="(data , index , key )  in model.modeSectorList"
														v-bind:id="modelIndex + '_' + index" v-on:mouseenter="highLightLine($event ,data , modelIndex , index)"
														v-on:mouseleave="unHighLightLine($event ,data , modelIndex , index)" >
														<div class="cellName" v-cloak v-on:click="gotoShowSectorMessage(data)">
															<span>扇区名称：</span>
															<span v-if="data.sector_name == null || data.sector_name == ''">--</span>
															<span class="sectorNameEllipsis" v-bind:title="data.sector_name" v-else>{{ data.sector_name }}</span>
														</div>
														<div class="cellInfoDiv">
															<div class="colDiv">
																<span class="nameInfo" v-if="index == 0">基站_扇区</span><span class="blueInfo" v-cloak>{{ data.enodebid_cellid }}</span>
															</div>
															<div class="colDiv">
																<span class="nameInfo" v-if="index == 0">频点_PCI</span><span class="blueInfo" v-cloak>{{ data.pin_pci }}</span>
															</div>
															<div class="colDiv">
																<span class="nameInfo" v-if="index == 0">距离(m)</span>
																<span class="blueInfo" v-cloak v-if="data.distance == null || data.distance == ''">--</span>
																<span class="blueInfo" v-cloak v-else>{{ data.distance }}</span>
															</div>
															<div class="colDiv">
																<span class="nameInfo" v-if="index == 0" v-bind:title="'主接入数量/邻区数量'">主/邻</span>
																<span class="blueInfo" v-cloak v-if="data.mr_count == null || data.mr_count == ''">--/{{ data.zhanbi }}</span>
																<span class="blueInfo" v-cloak v-else>{{ data.zhuanti_mr_count }}/{{ data.zhanbi }}</span>
															</div>
														</div>
													</li>
												</ul>
											</li>
										</ul>
									</li>
									<%--邻区列表--%>
									<li class="liWrap cbnrTop5Cell" v-show="zhuantiName != '' && zhuantiName == '越区覆盖'">
										<div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">{{ zhuantiName }}扇区</span>
											</div>
											<div class="floatRight">
												<button class="linkCell" title="显示连线" v-on:click="showNRSectorLinkCell($event,poorAreaData,nrCellList,3)" style="display: none;"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;">
											<li class="cellInfoWrap" v-for="(data , index , key) in nrCellList">
												<div class="cellName" v-cloak v-on:click="gotoShowSectorMessage(data , sectorData)">
													<span>扇区名称：</span>
													<span v-if="data.sector_name == null || data.sector_name == ''">--</span>
													<span class="sectorNameEllipsis" v-bind:title="data.sector_name" v-else>{{ data.sector_name }}</span>
												</div>
												<div class="cellInfoDiv" v-if="data.enodebid_cellid == null || data.enodebid_cellid == ''" v-on:mouseover="showErrorMessage(data.pin_pci)">
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站_扇区</span><span class="blueInfo" v-cloak>{{ data.enodebid_cellid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">频点_PCI</span><span class="blueInfo" v-cloak>{{ data.pin_pci }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(m)</span>
														<span class="blueInfo" v-cloak v-if="data.distance == null || data.distance == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0" v-bind:title="'主接入数量/邻区数量'">主/邻</span>
														<span class="blueInfo" v-cloak v-if="data.mr_count == null || data.mr_count == ''">--/{{ data.zhanbi }}</span>
														<span class="blueInfo" v-cloak v-else>{{ data.zhuanti_mr_count }}/{{ data.zhanbi }}</span>
													</div>
												</div>
												<div class="cellInfoDiv" v-else>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站_扇区</span><span class="blueInfo" v-cloak>{{ data.enodebid_cellid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">频点_PCI</span><span class="blueInfo" v-cloak>{{ data.pin_pci }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(m)</span>
														<span class="blueInfo" v-cloak v-if="data.distance == null || data.distance == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0" v-bind:title="'主接入数量/邻区数量'">主/邻</span>
														<span class="blueInfo" v-cloak v-if="data.mr_count == null || data.mr_count == ''">--/{{ data.zhanbi }}</span>
														<span class="blueInfo" v-cloak v-else>{{ data.zhuanti_mr_count }}/{{ data.zhanbi }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_alarm.png">
												<span class="nameInfo">接入扇区告警</span>
											</div>
											<div class="floatRight">
												<button class="gotoListPage" title="进入告警列表" v-on:click="gotoAlarmList(poorAreaData)"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo">
											<li class="colName">
												<div class="colDiv">类型</div>
												<div class="colDiv">值</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">退服告警数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ poorAreaData.alarm_nums }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">退服告警小区数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ poorAreaData.alarm_cells }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">未恢复退服告警小区数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ poorAreaData.nr_alarm_cells }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_index.png">
												<span class="nameInfo">指标</span>
											</div>
											<div class="floatRight">
												<button class="gotoListPage" title="进入KPI列表" v-on:click="gotoKPIList(poorAreaData)"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo">
											<li class="colName">
												<div class="colDiv">类型</div>
												<div class="colDiv">值</div>
												<div class="colDiv">地市排名</div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">综合排名</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ poorAreaData.pc_orderno_tot }}</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ poorAreaData.pc_tot_cityno }}</span>
												</div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">4G切3G总次数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ poorAreaData.lte_to_3g_tot }}</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ poorAreaData.lte_to_3g_orderno }}</span>
												</div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">4G总流量(MB)</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ poorAreaData.flow_4g_tot }}</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ poorAreaData.flow_4g_orderno }}</span>
												</div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">4G用户数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ poorAreaData.user_4g_avg }}</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ poorAreaData.user_4g_orderno }}</span>
												</div>
											</li>

											<li >
												<div class="colDiv">
													<span class="nameInfo">感知优良率(%)</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ poorAreaData.ce_good_ratio_avg }}</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ poorAreaData.ce_good_ratio_orderno }}</span>
												</div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo" v-bind:title="zhuantiName + '栅格数'">{{ zhuantiName }}栅格数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ poorAreaData.poor_grid_nums}}</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ poorAreaData.poor_grid_nums_orderno }}</span>
												</div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo" v-bind:title="zhuantiName + '栅格面积(㎡)'">{{ zhuantiName }}栅格面积(㎡)</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ poorAreaData.poor_grid_area }}</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo">{{ poorAreaData.poor_grid_nums_orderno }}</span>
												</div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">栅格总面积(㎡)</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ poorAreaData.all_grid_area }}</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo">&nbsp;</span>
												</div>
											</li>
										</ul>
									</li>
                                    <li class="liWrap">
                                        <div class="nameBtn" v-on:click="showDetailInfo($event)">
                                            <div class="inline">
                                                <img src="../js/IntelligentRoadTestV5/images/detail_position.png">
                                                <span class="nameInfo">百度坐标</span>
                                            </div>
                                            <div class="floatRight">
                                                <button class="btn-showInfo">
                                                    <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                                </button>
                                            </div>
                                        </div>
                                        <ul class="ulDetailInfo"  style="display: none;">
                                            <li >
                                                <div class="colDiv fLeft">
                                                    <span class="nameInfo">中心点经度</span>
                                                </div>
                                                <div class="colDiv">
                                                    <span class="blueInfo" v-cloak>{{ poorAreaData.longitude_mid_baidu }}</span>
                                                </div>
                                                <div class="colDiv"></div>
                                            </li>
                                            <li >
                                                <div class="colDiv">
                                                    <span class="nameInfo">中心点纬度</span>
                                                </div>
                                                <div class="colDiv">
                                                    <span class="blueInfo" v-cloak>{{ poorAreaData.latitude_mid_baidu }}</span>
                                                </div>
                                                <div class="colDiv"></div>
                                            </li>
                                        </ul>
                                    </li>
									<li class="liWrap" style="text-align: center;">
										<button class="saveToConcernBtn modal-sure" id="saveToConcernAreaBtn" v-on:click = "saveToConcernArea(poorAreaData)">另存为关注区域</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<%--弱区结束--%>
					<%--关注区域开始--%>
					<div class="listDiv" id="showConcernAreaList" style="display: none;">
						<div class="listWrap">
							<div class="searchTitle">在“广州”天河区域内搜索</div>
							<ul class="listTopUl">
								<li class="selectCity" id="concernAreaSelectCity">
									<div class="select-name selectCity-name">
										<img src="../js/IntelligentRoadTestV5/images/nor_add.png" class="name-icon">
										<span class="city-selected" id="concernAreaCityName">广州</span>
										<span class="city-selected-gt">&gt;</span>
										<span class="district-selected" id="concernAreaDistrictName">全市</span>
										<span class="mktcenter-selected-gt">&gt;</span>
										<span class="mktcenter-selected" id="concernAreaMktName">全区</span>
										<span class="triangle"></span>
									</div>
									<div class="select-info city-info" style="display: none;">
										<ul id="concernAreaSelectCityList" class="threeLevel"></ul>
									</div>
								</li>
								<li class="classify">
									<div class="select-name" ><span id="concernAreaListSelectName">全部分类</span><span class="triangle"></span></div>
									<div class="select-info" id="concernAreaList">
										<div class="flexRow">
											<div class="flexCol">全部分类</div>
											<div class="flexCol selected">全部</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">栅格数量</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">300以内</div>
											<div class="flexCol">300-1000</div>
											<div class="flexCol"></div>
											<div class="flexCol">1000以上</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">区域类型</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">城中村</div>
											<div class="flexCol">交通枢纽</div>
											<div class="flexCol"></div>
											<div class="flexCol">其他</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">共享状态</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">我的共享</div>
											<div class="flexCol">审核中</div>
											<div class="flexCol"></div>
											<div class="flexCol">共享未通过</div>
											<div class="flexCol">共享</div>
										</div>
									</div>
								</li>
								<li class="recomendSort" id="concernSort">
									<div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
									<div class="select-info">
										<ul class="sortUl" >
											<li>推荐排序</li>
											<li class="selected">时间优先</li>
											<li>下切优先</li>
											<li>流量优先</li>
											<li>感知优先</li>
											<li>弱覆盖优先</li>
											<li>用户数优先</li>
										</ul>
									</div>
								</li>
							</ul>
							<div class="listDivWrap" id="showConcernAreaDataDiv">
								<ul class="listUL">
									<li v-for = "(item , index , key ) in concernAreaList" class="cursor" @click = "showMessage(item ,index)" v-on:mouseover = "turnMk(index,item)">
										<div class="colDiv">
											<span class="numSpan" v-cloak>{{ index + 1  }}</span>
											<span class="bold" v-cloak>区域名称：{{ item.area_name }}</span>
										</div>
										<div class="colDiv">
											<span>RSRP均值：</span>
											<span v-if="item.rsrp == null || item.rsrp == ''">&nbsp;</span>
											<span v-else v-cloak>{{ parseFloat(item.rsrp).toFixed(2) }}</span>
											<div class="positionRight" v-if="item.creator == uname && item.share_status != null && item.share_status != ''">
												<span class="text_orange" v-if="item.share_status == '共享审核中' || item.share_status == '取消共享审核中'" v-cloak>审核中</span>
												<span class="text_red" v-cloak v-if="item.share_status == '共享未通过'" <%--v-on:mouseover="viewAudit($event , item.audit_option)" v-on:mouseout="hideAudit()"--%>>未通过</span>
												<span class="text_blue" v-cloak v-if="item.share_status == '已共享'" <%--v-on:mouseover="viewAudit($event , item.audit_option)" v-on:mouseout="hideAudit()"--%>>我的共享</span>
											</div>
											<div class="positionRight" v-if="item.creator != uname && item.share_status != null && item.share_status != ''">
												<span class="text_blue" v-if="item.share_status == '已共享' || item.share_status == '取消共享审核中'" v-cloak>共享</span>
											</div>
										</div>
										<div class="colDiv">
											<span>覆盖率：</span>
											<span v-if="item.cover == null || item.cover == ''">&nbsp;</span>
											<span v-cloak>{{ (item.cover*100).toFixed(2) }}</span>
										</div>
										<div class="colDiv">
											<span class="cellNameEllipsis" v-bind:title="item.recent_cell_name" v-cloak>最近扇区：{{ item.recent_cell_name }}</span>
										</div>
									</li>
								</ul>
								<div class="pageWrap">
									<div class="page">
										<div class="page-pagination">
											<a href="javascript:;" class="first-active"  v-on:click = "goFirst"></a>
											<a href="javascript:;" class="prev-active" v-on:click="lastOrNext(0)" ></a>
										</div>
										<div >
											第<input class="page-num" type="text" id="concernAreaPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
											<input type="hidden">
										</div>
										<div class="page-pagination">
											<a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
											<a href="javascript:;" class="last-active" v-on:click="goLast"></a>
										</div>
										<div>
											<a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTestV5/images/111_11.png"></a>
										</div>
									</div>
									<div class="page-info" id="concernAreaCountMessage" <%--style="display: none;"--%>>
										<%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
										共<span v-cloak>{{ totalCounts }}</span>条数据
									</div>
								</div>
								<!-- 审核意见--start -->
								<div class="auditTip">
									<%--<div class="">
										<div>共享说明：</div>
										<div class="shareText">

										</div>
									</div>--%>
									<div class="">
										<div>审核意见：</div>
										<div class="auditText">
											<span id="auditOption"></span>
										</div>
									</div>
								</div>
								<!-- 审核意见--end -->
							</div>
						</div>

						<div class="detailList">
							<div class="backList" id="concernAreaCount"> &lt; 返回上一级</div>
							<div class="detailListDiv" id="showConcernAreaCompleteMessage">
								<div class="infoHeader">
									<div class="brDiv">
										<span v-cloak>
											区域编号：{{ concernAreaData.id }}
											<button id="concernPosition" class="positionDivBtn" v-on:click="concernPosition(concernAreaData)">
												<img class="" src="../js/IntelligentRoadTestV5/images/white_position.png" title="定位">
											</button>
											<button  class="positionDivBtn showBtn positionClass" v-on:click="showPolygonGrid(concernAreaData,$event)">
												<img class="imgClass" src="../js/IntelligentRoadTest/images/showP.png" title="显示">
											</button>
										</span>
										<span  class="fRight" v-cloak>创建者：{{ concernAreaData.creator }}</span>
									</div>
									<div class="brDiv">
										<span v-cloak>区域类型：{{ concernAreaData.area_type }}</span>
										<span class="fRight" v-cloak>地市：{{ concernAreaData.city }}</span>
									</div>
									<div class="brDiv">
										<span v-bind:title="concernAreaData.area_name" v-cloak v-if="concernAreaData.area_name != null && concernAreaData.area_name.length >= 13">区域名称：{{ concernAreaData.area_name.substr(0 , 6) + '...' + concernAreaData.area_name.substr(concernAreaData.area_name.length-5) }}</span>
										<span v-cloak v-else >区域名称：{{ concernAreaData.area_name }}</span>
										<span class="fRight" v-cloak>{{ concernAreaData.create_time }}</span>
									</div>
								</div>
								<ul class="infoBody">
									<li class="tipSpan">
										<img src="../js/IntelligentRoadTestV5/images/tipSpan.png" />
										<span>&nbsp;&nbsp;提示：创建当天只显示部分信息</span>
									</li>
									<li>
										<div>
											<img src="../js/IntelligentRoadTestV5/images/change7.png"/>
											<span class="nameInfo" >{{ title }}</span>
											<button type="button" class="btn-bg btn-export" id="" v-on:click="exportCoverData()">导出</button>
										</div>
									</li>
									<li id="sevenLineLi">
										<div id="lineChart" class="chartDiv"></div>
									</li>
									<li v-show="hideSecondEchart == false">
										<div>
											<img src="../js/IntelligentRoadTestV5/images/change7.png"/>
											<span class="nameInfo" >感知速率</span>
										</div>
									</li>
									<li id="" v-show="hideSecondEchart == false">
										<div id="concernAreaSecondChart" class="chartDiv"></div>
									</li>
									<li class="liWrap nrTop5Cell">
										<div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">附近扇区</span>
											</div>
											<div class="inline" v-if="concernAreaData.isHasSameSector != true">未就近接入</div>
											<div class="floatRight">
												<button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,concernAreaData,1)" style="display: none;"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;">
											<li class="cellInfoWrap" v-for="(data , index , key) in nrTop5Cell">
												<div class="cellName" v-on:click="gotoShowSectorMessage(data)" v-cloak>
													<span>扇区名称：</span>
													<span class="sectorNameEllipsis" v-bind:title="data.recent_cell_name">{{ data.recent_cell_name }}</span>
												</div>
												<div class="cellInfoDiv">
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0" >基站编号</span>
														<span class="blueInfo" v-if="data.enodebid == null || data.enodebid == ''">&nbsp;</span>
														<span class="blueInfo" v-else v-cloak>{{ data.enodebid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">小区编号</span>
														<span class="blueInfo" v-if="data.cellid == null || data.cellid == ''">&nbsp;</span>
														<span class="blueInfo" v-else v-cloak>{{ data.cellid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(m)</span><span class="blueInfo" v-cloak>&nbsp;{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">MR数量</span><span class="blueInfo" v-cloak>&nbsp;{{ data.counts }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li class="liWrap mrNrTop5Cell">
										<div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img class="cursor" src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">接入扇区</span>
											</div>
											<div class="floatRight">
												<button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,concernAreaData,2)" style="display: none;"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;">
											<li class="cellInfoWrap" v-for="(data , index , key) in mrTop5Cell">
												<div class="cellName" v-on:click="gotoShowSectorMessage(data)" v-cloak>
													<span>扇区名称：</span>
													<span class="sectorNameEllipsis" v-bind:title="data.recent_cell_name">{{ data.recent_cell_name }}</span>
												</div>
												<div class="cellInfoDiv">
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站编号</span>
														<span class="blueInfo" v-if="data.enodebid == null || data.enodebid == ''">&nbsp;</span>
														<span class="blueInfo" v-else v-cloak>{{ data.enodebid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">小区编号</span>
														<span class="blueInfo" v-if="data.cellid == null || data.cellid == ''">&nbsp;</span>
														<span class="blueInfo" v-else v-cloak>{{ data.cellid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(M)</span><span class="blueInfo" v-cloak>&nbsp;{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">MR数量</span><span class="blueInfo" v-cloak>&nbsp;{{ data.counts }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li>
										<div class="handleDiv">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/handle.png"/>
												<span class="nameInfo">调优日志</span>
											</div>
											<div class="floatRight">
												<button id="editButton" v-on:click = "editConcernAreaMessage(concernAreaData)">
													<img class="concernPadding" src="../js/IntelligentRoadTestV5/images/edit.png"/>
												</button>
												<button type="button" class="btn-bg btn-save" id="sureButton" style="display: none;">保存</button>
												<button type="button" class="btn-bg btn-cancel" id="cancelButton" style="display: none;">取消</button>
											</div>
										</div>
									</li>
									<li>
										<div class="handle_description">
											<textarea rows="5" id="concernHandleDescribe" readonly>
												<%--{{ concernAreaData.handle_description }}--%>
											</textarea>
										</div>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_index.png">
												<span class="nameInfo">指标</span>
											</div>
											<div class="floatRight">
												<button class="gotoListPage" title="进入KPI列表" v-on:click="gotoKPIList(concernAreaData)" v-if="mrTop5Cell.length!=0"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo">
											<li class="colName">
												<div class="colDiv">类型</div>
												<div class="colDiv">值</div>
												<div class="colDiv"></div>
											</li>
											<li  v-if="concernAreaData.lte_to_3g_tot != null">
												<div class="colDiv">
													<span class="nameInfo">下切数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ concernAreaData.lte_to_3g_tot }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li  v-if="concernAreaData.user_4g_avg != null">
												<div class="colDiv">
													<span class="nameInfo">用户数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ concernAreaData.user_4g_avg }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li  v-if="concernAreaData.flow_4g_tot != null">
												<div class="colDiv">
													<span class="nameInfo">流量(MB)</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ concernAreaData.flow_4g_tot }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">覆盖率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ (concernAreaData.cover*100).toFixed(2) }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li  v-if="concernAreaData.ce_good_ratio_avg != null">
												<div class="colDiv">
													<span class="nameInfo">感知优良率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ (concernAreaData.ce_good_ratio_avg * 100).toFixed(2) }}%</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li  v-if="concernAreaData.rsrp_count != null">
												<div class="colDiv">
													<span class="nameInfo">AGPS记录数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ concernAreaData.rsrp_count }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li  v-if="concernAreaData.rsrp != null">
												<div class="colDiv">
													<span class="nameInfo">RSRP均值</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-if="concernAreaData.rsrp == null || concernAreaData.rsrp == ''">&nbsp;</span>
													<span class="blueInfo" v-else v-cloak>{{ concernAreaData.rsrp.toFixed(2) }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li  v-if="concernAreaData.grid_count != null">
												<div class="colDiv">
													<span class="nameInfo">栅格数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ concernAreaData.grid_count }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li  v-if="concernAreaData.poor_grid_radio != null">
												<div class="colDiv">
													<span class="nameInfo">弱栅格占比</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ concernAreaData.poor_grid_radio }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
                                    <%--<li class="liWrap  &lt;%&ndash;noshow&ndash;%&gt;">
                                        <div class="nameBtn" v-on:click="showDetailInfo($event)">
                                            <div class="inline">
                                                <img src="../js/IntelligentRoadTestV5/images/detail_kpiRate.png">
                                                <span class="nameInfo">感知速率</span>
                                            </div>
                                            <div class="floatRight">
                                                <button class="btn-showInfo">
                                                    <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                                </button>
                                            </div>
                                        </div>
                                        <ul class="ulDetailInfo" style="display: none;">
                                            <li class="colName">
                                                <div class="colDiv">类型</div>
                                                <div class="colDiv">值</div>
                                                <div class="colDiv"></div>
                                            </li>
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">KPI感知上行速率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="concernAreaData.min_userex_upavgrate != null">{{ concernAreaData.min_userex_upavgrate }} Mbps</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">KPI感知下行速率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="concernAreaData.min_userex_dwavgrate != null">{{ concernAreaData.min_userex_dwavgrate }} Mbps</span>
												</div>
												<div class="colDiv"></div>
											</li>
                                        </ul>
                                    </li>--%>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_position.png">
												<span class="nameInfo">百度坐标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" style="display: none;">
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">中心点经度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ (concernAreaData.max_longitude_baidu +  concernAreaData.min_longitude_baidu )/2 }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">中心点纬度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ (concernAreaData.max_latitude_baidu +  concernAreaData.min_latitude_baidu )/2 }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<li>
										<div class="btnGroupWrap" v-if="concernAreaData.creator == uname"> <%--只有创建者才能够拥有以下的操作按钮--%>
											<button class="btn-bg btn-share" id="btnShare"
													v-if="concernAreaData.share_status == '' || concernAreaData.share_status == null || concernAreaData.share_status == '共享未通过'" v-on:click="btnShareClick(concernAreaData)">共享</button>
											<button class="btn-bg btn-unShare" v-if="concernAreaData.share_status == '已共享'" id="cancelShare" v-on:click="cancelShareClick(concernAreaData)">取消共享</button>
											<button class="btn-bg btn-unShare" id="revokeApply" v-if="concernAreaData.share_status == '共享审核中' || concernAreaData.share_status == '取消共享审核中'" v-on:click="revokeApplyClick(concernAreaData)">撤销申请</button>
											<button class="btn-bg deleteButton" v-on:click = "deleteConcernArea(concernAreaData)">删除</button>
										</div>
									</li>
								</ul>
							</div>
							<div class="alertModal" id="modal-concernArea" style="display: none;">
								<div class="alertModal-body">
									<table>
										<tr>
											<td colspan="2">确认移出关注区域列表</td>
										</tr>
										<tr>
											<td>
												<button type="button" class="btn-bg modal-sure" id="sureDeleteConcern">确定</button>
											</td>
											<td>
												<button type="button" class="btn-bg modal-cancel" >取消</button>
											</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</div>
					<%--关注区域结束--%>
					<%--扇区开始--%>
					<div class="listDiv" id="showSectorList" style="display: none;">
						<div class="listWrap">
							<div class="searchTitle">在“广州”天河区域内搜索</div>
							<ul class="listTopUl">
								<li class="selectCity" id="sectorCitySelect">
									<div class="select-name selectCity-name">
										<img src="../js/IntelligentRoadTestV5/images/nor_add.png" class="name-icon">
										<span class="city-selected" id="sectorCityName">广州</span>
										<span class="city-selected-gt">&gt;</span>
										<span class="district-selected" id="sectorDistrictName">天河</span>
										<span class="mktcenter-selected-gt">&gt;</span>
										<span class="mktcenter-selected" id="sectorMktName">全区</span>
										<span class="triangle"></span>
									</div>
									<div class="select-info city-info" style="display: none;">
										<ul id="sectorCitySelectList" class="threeLevel"></ul>
									</div>
								</li>
								<li class="classify">
									<div class="select-name"><span id="sectorListSelectName">全部分类</span><span class="triangle"></span></div>
									<div class="select-info" id="sectorList">
										<div class="flexRow">
											<div class="flexCol">全部分类</div>
											<div class="flexCol selected">全部</div>
											<div class="flexCol"></div>
											<div class="flexCol"></div>
										</div>
										<div class="flexRow">
											<div class="flexCol">区域类型</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">市区</div>
											<div class="flexCol">县城</div>
											<div class="flexCol"></div>
											<div class="flexCol">乡镇</div>
											<div class="flexCol">农村</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">扇区状态</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">在线</div>
											<div class="flexCol">退服</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">设备厂商</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">华为</div>
											<div class="flexCol">中兴</div>
											<div class="flexCol"></div>
											<div class="flexCol">爱立信</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">扇区类型</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">室内</div>
											<div class="flexCol">室外</div>
											<div class="flexCol"></div>
											<div class="flexCol">其他</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">使用频段</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">800M</div>
											<div class="flexCol">1.8G</div>
											<div class="flexCol">2.1G</div>
											<div class="flexCol">2.6G</div>
										</div>
										<div class="flexRow" id="isNewAddSector"> <%--只有在专题扇区才有这个选项--%>
											<div class="flexCol">是否新增</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">是</div>
											<div class="flexCol">否</div>
										</div>
										<div class="flexRow" id="isFilterMrCount"> <%--只有在专题扇区才有这个选项--%>
											<div class="flexCol">MR条数</div>
											<div class="flexCol">&gt;=</div>
											<div class="flexCol"><input type="text" id="mrCount" value="1000" style="width: 70px;padding-left: 5px;"></div>
											<div class="flexCol"><input type="button" id="sureFilter" value="确定" class="btn-bg btn-sure"></div>
										</div>
									</div>
								</li>
								<li class="recomendSort" id="sectorSort">
									<div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
									<div class="select-info">
										<ul class="sortUl">
											<li class="selected">推荐排序</li>
											<li>下切优先</li>
											<li>流量优先</li>
											<li>感知优先</li>
											<li>弱覆盖优先</li>
											<li>用户数优先</li>
											<li id="sectorRateFirst">占比优先</li>
										</ul>
									</div>
								</li>
							</ul>
							<div class="listDivWrap" id="showSectorListDiv">
								<ul class="listUL">
									<li v-for = "(item , index , key ) in sectorList" class="cursor" v-on:click="showMessage(item,index , true)" v-on:mouseover = "turnMk(index,item)">
										<div class="colDiv">
											<span class="numSpan" v-cloak>{{ index + 1  }}</span>
											<span class="bold cellNameEllipsis"  v-bind:title="item.cell_name" v-cloak>小区名称：{{ item.cell_name }}</span>
										</div>
										<div class="colDiv">
											<span v-cloak>基站扇区编号：{{ item.enodeb_id }}_{{ item.cell_id }}</span>
											<div class="rightImg">
												<%--MOD3干扰新增的标识--%>
												<span v-if="rateName == 'MOD3干扰占比'&& item.m3_is_new == 1"><img class="" src="../js/IntelligentRoadTestV5/images/zeng.png"></span>
												<%--越区覆盖新增的标识--%>
												<span v-if="rateName == '越区覆盖占比'&& item.cb_is_new == 1"><img class="" src="../js/IntelligentRoadTestV5/images/zeng.png"></span>
												<%--重叠覆盖新增的标识--%>
												<span v-if="rateName == '重叠覆盖占比'&& item.ol_is_new == 1"><img class="" src="../js/IntelligentRoadTestV5/images/zeng.png"></span>
											</div>
										</div>
										<div class="colDiv" v-if="item.sector_type != null">  <%--显示占比--%>
											<span v-cloak>{{ rateName }}：{{ item.sector_rate }}%</span>
										</div>
									</li>
								</ul>
								<div class="pageWrap">
									<div class="page">
										<div class="page-pagination">
											<a href="javascript:;" class="first-active"  v-on:click = "goFirst"></a>
											<a href="javascript:;" class="prev-active" v-on:click="lastOrNext(0)" ></a>
										</div>
										<div >
											第<input class="page-num" type="text" id="sectorPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
											<input  type="hidden">
										</div>
										<div class="page-pagination">
											<a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
											<a href="javascript:;" class="last-active" v-on:click="goLast"></a>
										</div>
										<div>
											<a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTestV5/images/111_11.png"></a>
										</div>
									</div>
									<div class="page-info" id="sectorCountMessage"<%-- style="display: none;"--%>>
										<%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
										共<span v-cloak>{{ totalCounts }}</span>条数据
									</div>
								</div>
							</div>
						</div>

						<div class="detailList">
							<div class="backList" id="sectorCount"> &lt; 返回上一级</div>
							<div class="detailListDiv" id="sectorCompleteMessage">
								<div class="infoHeader">
									<div class="brDiv">
										<span v-cloak>
											基站扇区编号：{{ sectorData.enodeb_id }}_{{ sectorData.cell_id }}
											<button id="sectorPosition" class="positionDivBtn" v-on:click="sectorPosition(sectorData)">
												<img src="../js/IntelligentRoadTestV5/images/white_position.png" title="定位">
											</button>
											<button id="showGridSub" class="positionDivBtn" v-show="isShowCompleteMessage == true" v-on:click="showSectorGrid(sectorData)">
												<img class="showGrid" src="../js/IntelligentRoadTestV5/images/white_grid.png" title="隐藏栅格">
											</button>
											<button id="showLine" class="positionDivBtn">
												<img class="showLine" src="../js/IntelligentRoadTestV5/images/white_line.png" title="显示连线">
											</button>
										</span>
										<span class="fRight" v-show="isShowMore == false">
											<button class="showMore" v-on:click="showMoreMessage()">显示更多</button>
										</span>
									</div>
									<div class="brDiv nameEllipsis" v-bind:title="sectorData.enodeb_name">
										<span v-cloak>基站名称：{{ sectorData.enodeb_name }}</span>
									</div>
									<div class="brDiv nameEllipsis" v-bind:title="sectorData.cell_name">
										<span v-cloak>扇区名称：{{ sectorData.cell_name }}</span>
									</div>
								</div>
								<ul class="infoBody">
									<li class="inlineCol2">
										<div>
											<span  v-cloak>区县：{{ sectorData.country }}</span>
											<span class="floatRight" v-cloak>区域类型：{{ sectorData.belong_area_id }}</span>
										</div>
										<div>
											<span v-cloak>厂家：{{ sectorOtherData.bs_vendor }}</span>
											<span class="floatRight" v-cloak>扇区状态：{{ sectorData.cell_state }}</span>
										</div>
									</li>
									<li class="inlineCol2">
										<div>
											<span v-cloak>频段：{{ sectorOtherData.band }}</span>
											<span class="floatRight" v-cloak>天线挂高：{{ sectorOtherData.high }}</span>
										</div>
										<div>
											<span v-cloak>PCI ：{{ sectorData.pci }}</span>
											<span class="floatRight" v-cloak>下行带宽：{{ sectorOtherData.band_width }}</span>
										</div>
									</li>
									<li class="inlineCol2">
										<div>
											<span v-cloak>功率：{{ sectorData.pilot_power }}</span>
											<span class="floatRight" v-cloak>验收状态：{{ sectorOtherData.acceptstatus }}</span>
										</div>
										<div>
											<span v-cloak>日期：{{ sectorData.day }}</span>
											<span class="floatRight" v-cloak>{{ sectorOtherData.is_indoor }}</span>
										</div>
										<div>
											<span v-cloak>营服中心：{{ sectorData.mktcenter }}</span>
										</div>
									</li>
									<%--占比趋势图--%>
									<li v-if="sectorData.sector_type != null">
										<div class="inline">
											<img src="../js/IntelligentRoadTestV5/images/change7.png">
											<span class="nameInfo">{{rateName}}占比趋势</span>
										</div>
									</li>
									<li v-if="sectorData.sector_type != null">
										<div id="sectorZhanBiChart" class="chartDiv" style="height:320px;"></div>
									</li>
									<%--覆盖趋势图--%>
									<li v-show="sectorData.sector_type != null && isShowMore == true" >
										<div class="inline">
											<img src="../js/IntelligentRoadTestV5/images/change7.png">
											<span class="nameInfo">覆盖趋势</span>
										</div>
									</li>
									<li v-show="sectorData.sector_type != null && isShowMore == true">
										<div id="sectorCoverChart" class="chartDiv"></div>
									</li>

									<li v-show="isShowMore == true">
										<div class="inline">
											<img src="../js/IntelligentRoadTestV5/images/change7.png">
											<span class="nameInfo">感知速率</span>
										</div>
									</li>
									<li v-show="isShowMore == true">
										<div id="sectorSecondChart" class="chartDiv"></div>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_params.png">
												<span class="nameInfo">参数</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo">
											<li class="colName">
												<div class="colDiv">类型</div>
												<div class="colDiv">值</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">方位角</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ sectorOtherData.ant_azimuth }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">机械下倾</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ sectorOtherData.ant_engine_angle }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">电子下倾</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ sectorOtherData.ant_electron_angle }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">天线挂高</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ sectorOtherData.high }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_alarm.png">
												<span class="nameInfo">告警</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo">
											<li class="colName">
												<div class="colDiv">类型</div>
												<div class="colDiv">值</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">告警级别</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ sectorData.alarm_level }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">退服告警数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ sectorData.alarm_nums }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_evaluate.png">
												<span class="nameInfo">KPI指标（全量MR）</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo">
											<li >
												<div class="colDiv">
													<span class="nameInfo">4G切3G总次数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ sectorData.lte_to_3g_tot }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">4G总流量(Mb)</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ sectorData.flow_4g_tot }}Mb</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">4G用户数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ sectorData.user_4g_avg }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">栅格数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ sectorData.grid_nums }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">感知优良率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-if="sectorData.ce_good_ratio_avg == null && sectorData.ce_good_ratio_avg == ''" v-cloak>-</span>
													<span class="blueInfo" v-else v-cloak>{{ (sectorData.ce_good_ratio_avg * 100).toFixed(2)}}%</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">综合排名</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-if="sectorData.orderno_tot != null">{{ parseFloat(sectorData.orderno_tot).toFixed(2) }}</span>
                                                    <span class="blueInfo" v-else>-</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<%--增加一个栏目可以跟随图层配置变化而变化的指标--%>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_evaluate.png">
												<span class="nameInfo">评估指标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo">
											<li >
												<div class="colDiv">
													<span class="nameInfo"></span>
												</div>
												<div class="colDiv">AGPS</div>
												<div class="colDiv">全量MR</div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">覆盖率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ changeableData.cover_rate }}%</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ changeableData.cover_rate_allmr }}%</span>
												</div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">RSRP均值</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="changeableData.rsrp_avg != null && changeableData.rsrp_avg != ''">
														{{ parseFloat(changeableData.rsrp_avg).toFixed(2) }}
													</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="changeableData.rsrp_avg_allmr != null && changeableData.rsrp_avg_allmr != ''">
														{{ parseFloat(changeableData.rsrp_avg_allmr).toFixed(2) }}
													</span>
												</div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">MR记录数</span>
												</div>
												<div class="colDiv">
                                                    <span class="blueInfo" v-cloak v-if="changeableData.mr_count == null || changeableData.mr_count == ''">-</span>
                                                    <span class="blueInfo" v-cloak v-else>{{ changeableData.mr_count }}</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak  v-if="changeableData.mr_count_allmr == null || changeableData.mr_count_allmr == ''">-</span>
													<span class="blueInfo" v-cloak v-else>{{ changeableData.mr_count_allmr }}</span>
												</div>
											</li>
											<li v-show="sectorData.sector_type != null && currentGridRateName != null">
												<div class="colDiv">
													<span class="nameInfo">{{ currentGridRateName }}MR总数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sector_zhuanti_agps_mr == null || sector_zhuanti_agps_mr == ''">-</span>
													<span class="blueInfo" v-cloak v-else>{{ sector_zhuanti_agps_mr }}</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sector_zhuanti_all_mr == null || sector_zhuanti_all_mr == ''">-</span>
													<span class="blueInfo" v-cloak v-else>{{ sector_zhuanti_all_mr }}</span>
												</div>
											</li>
											<li v-show="sectorData.sector_type != null && currentGridRateName != null">
												<div class="colDiv">
													<span class="nameInfo">{{ currentGridRateName }}栅格数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sector_grid_count == null || sector_grid_count == ''">-</span>
													<span class="blueInfo" v-cloak v-else>{{ sector_grid_count }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li v-show="sectorData.sector_type != null && currentGridRateName != null" >
												<div class="colDiv">
													<span class="nameInfo" v-bind:title="currentGridRateName + '栅格面积(㎡)'">{{ currentGridRateName }}栅格面积(㎡)</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-if="sector_grid_area == null || sector_grid_area == ''">-</span>
													<span class="blueInfo" v-else >{{ sector_grid_area }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">栅格总数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.grid_nums == null || sectorData.grid_nums == ''">-</span>
													<span class="blueInfo" v-cloak v-else>{{ sectorData.grid_nums }}</span>
												</div>
												<div class="colDiv"><div class="colDiv"><span class="blueInfo">-</span></div></div>
											</li>
											<li v-if="sectorData.grid_nums != null && sectorData.grid_nums != ''">
												<div class="colDiv">
													<span class="nameInfo">栅格总面积</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-if="sectorData.grid_nums == null || sectorData.grid_nums == ''">-</span>
													<span class="blueInfo">{{ parseInt(sectorData.grid_nums) * 20 * 20 }}㎡</span>
												</div>
												<div class="colDiv"><span class="blueInfo">-</span></div>
											</li>
										</ul>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_evaluate.png">
												<span class="nameInfo">专题评估</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo">
											<li >
												<div class="colDiv">
													<span class="nameInfo" title="全量MR重叠覆盖占比">全量MR重叠覆盖占比</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ sectorData.ol_mrrat }}%</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo" title="全量MR模三干扰占比">全量MR模三干扰占比</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ sectorData.m3_mrrat }}%</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo" title="AGPS-MR越区覆盖占比">AGPS-MR越区覆盖占比</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ sectorData.cb_mrrat }}%</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<li class="liWrap" v-show="isShowMore == true">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_kpi.png">
												<span class="nameInfo">历史KPI</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" v-for="(kpiData , index , key) in kpiList" style="display: none;">
											<li class="liWrap">
												<div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
													<div class="inline">
														<%--<img src="../js/IntelligentRoadTestV5/images/white_calendar.png">--%>
														<span class="nameInfo" v-cloak>{{ kpiData.day }}</span>
													</div>
													<div class="floatRight">
														<button class="btn-showInfo">
															<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
														</button>
													</div>
												</div>
												<ul class="ulDetailInfo">
													<li >
														<div class="colDiv">
															<span class="nameInfo">E-RAB建立成功率(%)</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.erab_succ_rate }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">E-RAB掉线率(%)</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.erab_drop_rate }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">RRC建立成功率(%)</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.rrccon_succrate }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">同频切换成功率(%)</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.swchsf_succ_rate }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">异频切换成功率(%)</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.swchaf_succ_rate }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">上行prb利用率(%)</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.up_prb_userate }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">下行prb利用率(%)</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.dw_prb_userate }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">最大rrc连接用户数</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.counter0003 }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">PDCP层流量(MB)</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.pdch_flow }}</span>
														</div>
													</li>
												</ul>
											</li>
										</ul>
									</li>

									<%--邻区列表--%>
									<li class="liWrap nrTop5Cell" v-show="sectorData.sector_type != null">
										<div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">{{ anotherRateName }}邻区列表</span>
											</div>
											<div class="floatRight">
												<button class="linkCell" title="显示连线" v-on:click="showNRLinkCell($event,sectorData,nrCellList,1)" style="display: none;"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;">
											<li class="cellInfoWrap" v-for="(data , index , key) in nrCellList">
												<div class="cellName" v-cloak v-on:click="gotoShowSectorMessage(data , sectorData)">
													<span>扇区名称：</span>
													<span v-if="data.sector_name == null || data.sector_name == ''">--</span>
													<span class="sectorNameEllipsis" v-bind:title="data.sector_name" v-else>{{ data.sector_name }}</span>
												</div>
												<div class="cellInfoDiv" v-if="data.enodebid_cellid == null || data.enodebid_cellid == ''" v-on:mouseover="showErrorMessage(data.pin_pci)">
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站_扇区</span><span class="blueInfo" v-cloak>--</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">频点_PCI</span><span class="blueInfo" v-cloak>{{ data.pin_pci }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(m)</span>
														<span class="blueInfo" v-cloak v-if="data.distance == null || data.distance == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">{{ anotherRateName }}数量</span>
														<span class="blueInfo" v-cloak >{{ data.zhuanti_mr_count }}</span>
													</div>
												</div>
												<div class="cellInfoDiv" v-else>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站_扇区</span><span class="blueInfo" v-cloak>{{ data.enodebid_cellid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">频点_PCI</span><span class="blueInfo" v-cloak>{{ data.pin_pci }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(m)</span>
														<span class="blueInfo" v-cloak v-if="data.distance == null || data.distance == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">{{ anotherRateName }}数量</span>
														<span class="blueInfo" v-cloak >{{ data.zhuanti_mr_count }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<%--站间距列表--%>
									<li class="liWrap stationSpace" >
										<div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img class="cursor" src="../js/IntelligentRoadTestV5/images/stationSpace.png">
												<span class="nameInfo">站间距列表</span>
												<span class="nameInfo" style="padding-left: 30px;">站间距 D=<span>{{ sectorData.station_spacing }}</span> 米</span>
											</div>
											<div class="floatRight">
												<button class="linkCell" title="显示连线" v-on:click="showDistanceCricle($event,sectorData,stationDistanceList)" style="display: none;"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;">
											<li class="cellInfoWrap" v-for="(obj , i) in stationDistanceList">
												<div class="cellInfoDiv">
													<div class="colDiv" style="min-width: 26%">
														<span class="nameInfo" v-if="i == 0">覆盖距离</span>
														<span class="blueInfo">&nbsp;</span>
														<span class="blueInfo">{{ obj.keyStr }}</span>
													</div>
													<div class="colDiv" style="min-width: 36%">
														<span class="nameInfo" v-if="i == 0">站间距D值分段</span>
														<span class="blueInfo">&nbsp;</span>
														<span class="blueInfo">{{ obj.valueName }}</span>
													</div>
													<div class="colDiv" style="min-width: 38%">
														<span class="nameInfo" v-if="i == 0">AGPS-MR 数量</span>
														<span class="blueInfo">&nbsp;</span>
														<span class="blueInfo">{{ obj.value }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li class="liWrap" v-show="isShowCompleteMessage == true && isShowMore == true">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_poor.png">
												<span class="nameInfo">覆盖弱区</span>
											</div>
											<div class="floatRight">
												<%--<span class="areaNumSpan">弱覆盖区域数：<span class="areaNum">{{ poorAreaListData.length }}</span></span>--%>
												<button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,sectorData,1)" style="display: none;"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo">
											<li class="cellInfoWrap groupInfoWrap">
												<div class="groupText">弱覆盖区域数 ： <span class="areaNum" v-cloak>{{ poorAreaListData.length }}</span></div>
                                                <div class="groupTitle">
                                                    <div class="colDiv">
                                                        <span class="nameInfo">弱区编号</span>
                                                    </div>
                                                    <div class="colDiv">
                                                        <span class="nameInfo">距离</span>
                                                    </div>
                                                    <div class="colDiv">
                                                        <span class="nameInfo">栅格总数</span>
                                                    </div>
                                                    <div class="colDiv">
                                                        <span class="nameInfo">覆盖栅格</span>
                                                    </div>
                                                </div>
												<ul id="fgrq" class="cellInfoDiv groupInfo fgrq">
													<li v-for="(data , index , key ) in poorAreaListData">
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ data.object_id }}</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ data.distance }}</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ data.gridCount }}</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ data.poorGridCount }}</span>
														</div>
													</li>
												</ul>
											</li>
										</ul>
									</li>
									<li class="liWrap" v-show="isShowCompleteMessage == true && isShowMore == true">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_poor.png">
												<span class="nameInfo">附近弱区</span>
											</div>
											<div class="floatRight">
												<%--<span class="areaNumSpan">附近弱覆盖区域数：<span class="areaNum">{{ nearPoorAreaListData.length }}</span></span>--%>
												<button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,sectorData,2)" style="display: none;"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul  class="ulDetailInfo">
											<li class="cellInfoWrap groupInfoWrap">
												<div class="groupText">附近弱覆盖区域数 ：<span class="areaNum" v-cloak>{{  nearPoorAreaListData.length }}</span></div>
                                                <div class="groupTitle">
                                                    <div class="colDiv">
                                                        <span class="nameInfo">弱区编号</span>
                                                    </div>
                                                    <div class="colDiv">
                                                        <span class="nameInfo">距离</span>
                                                    </div>
                                                    <div class="colDiv">
                                                        <span class="nameInfo">栅格总数</span>
                                                    </div>
                                                    <div class="colDiv">
                                                        <span class="nameInfo">覆盖栅格</span>
                                                    </div>
                                                </div>
												<ul id='fjrq' class="cellInfoDiv groupInfo fjrq">
													<li v-for="(data , index , key ) in nearPoorAreaListData">
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ data.object_id }}</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ data.distance }}</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ data.gridCount }}</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ data.poorGridCount }}</span>
														</div>
													</li>
												</ul>
											</li>
										</ul>
									</li>
									<li class="liWrap"  v-show="isShowMore == true">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_kpiRate.png">
												<span class="nameInfo">感知速率</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" style="display: none;">
											<li class="colName">
												<div class="colDiv">类型</div>
												<div class="colDiv">值</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">KPI感知上行速率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.min_userex_upavgrate != null">{{ sectorData.min_userex_upavgrate }} Mbps</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">KPI感知下行速率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.min_userex_dwavgrate != null">{{ sectorData.min_userex_dwavgrate }} Mbps</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<li class="liWrap mrNrTop5Cell" v-show="isShowMore == true"><%--距离测评--%>
										<div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img class="cursor" src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">距离测评</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;">
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">AGPS- MR条数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.agps_mr_count != null && sectorData.agps_mr_count != ''">
														{{ sectorData.agps_mr_count }}
													</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo" title="AGPS-MR平均距离">AGPS-MR平均距离</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.agps_mr_dist_avg != null && sectorData.agps_mr_dist_avg != ''">
														{{ sectorData.agps_mr_dist_avg }}
													</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li class="cellInfoWrap" v-for="(data , index , key) in TAArr">
												<div class="cellInfoDiv">
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">TA值</span>
														<span class="blueInfo" v-if="data.ta == null || data.ta == ''">&nbsp;</span>
														<span class="blueInfo" v-else v-cloak>{{ data.ta }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">数量</span>
														<span class="blueInfo" v-if="data.count == null || data.count == ''">&nbsp;</span>
														<span class="blueInfo" v-else v-cloak>{{ data.count }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">平均距离(M)</span><span class="blueInfo" v-cloak>&nbsp;{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">占比(%)</span><span class="blueInfo" v-cloak>&nbsp;{{ data.avg }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li class="liWrap" v-show="isShowMore == true"><%--位置预测--%>
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_position.png">
												<span class="nameInfo">位置预测</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" style="display: none;">
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">预测GPS经度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.pred_location_gps != null && sectorData.pred_location_gps != ''">
														{{ parseFloat(sectorData.pred_location_gps.split(',')[0]).toFixed(6) }}
													</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">预测GPS纬度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.pred_location_gps != null && sectorData.pred_location_gps != ''">
														{{ parseFloat(sectorData.pred_location_gps.split(',')[1]).toFixed(6) }}
													</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">台账GPS经度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.location_gps != null && sectorData.location_gps != ''">
														{{ parseFloat(sectorData.location_gps.split(',')[0]).toFixed(6) }}
													</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">台账GPS纬度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.location_gps != null">
														{{ parseFloat(sectorData.location_gps.split(',')[1]).toFixed(6) }}
													</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">预测位置相差距离</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.pred_distance != null ">
														{{ sectorData.pred_distance }}米
													</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo" title="预测位置支持的MR条数">预测位置支持的MR条数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.surport_number != null ">
														{{ sectorData.surport_number }}
													</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<li class="liWrap" v-show="isShowMore == true">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_position.png">
												<span class="nameInfo">方位角预测</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" style="display: none;">
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">台账角度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.ant_azimuth != null ">
														{{ sectorData.ant_azimuth }}°
													</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">预测角度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.pred_azimuth != null">
														{{ sectorData.pred_azimuth }}°
													</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">偏离角度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.pred_azimuth_diff != null">
														{{ sectorData.pred_azimuth_diff }}°
													</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo" title="预测方位角支持MR条数">预测方位角支持MR条数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.surp_azimuth_count != null ">
														{{ sectorData.surp_azimuth_count }}
													</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<li class="liWrap" v-show="isShowMore == true">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_position.png">
												<span class="nameInfo">百度坐标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" style="display: none;">
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">预测经度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.pred_location_baidu != null && sectorData.pred_location_gps != ''">
														{{ parseFloat(sectorData.pred_location_baidu.split(',')[0]).toFixed(6) }}
													</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">预测纬度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.pred_location_gps != null && sectorData.pred_location_gps != ''">
														{{ parseFloat(sectorData.pred_location_baidu.split(',')[1]).toFixed(6) }}
													</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">台账经度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.longitude_mid_baidu != null && sectorData.longitude_mid_baidu != ''">
														{{ parseFloat(sectorData.longitude_mid_baidu).toFixed(6) }}
													</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">台账纬度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="sectorData.latitude_mid_baidu != null && sectorData.latitude_mid_baidu != ''">
														{{ parseFloat(sectorData.latitude_mid_baidu).toFixed(6) }}
													</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<%--扇区结束--%>
					<%--用户抱怨开始--%>
					<div class="listDiv" id="showUserComplainList" style="display: none;">
						<div class="listWrap">
							<div class="searchTitle" style="display: none">在“广州”天河区域内搜索</div>
							<ul class="listTopUl">
								<li class="selectCity" id="userComplainCitySelect">
									<div class="select-name selectCity-name">
										<img src="../js/IntelligentRoadTestV5/images/nor_add.png" class="name-icon">
										<span class="city-selected" id="userComplainCityName">广州</span>
										<span class="city-selected-gt">&gt;</span>
										<span class="district-selected" id="userComplainDistrictName">全市</span>
										<span class="mktcenter-selected-gt">&gt;</span>
										<span class="mktcenter-selected" id="userComplainMktName">全区</span>
										<span class="triangle"></span>
									</div>
									<div class="select-info city-info" style="display: none;">
										<ul id="userComplainCitySelectList" class="threeLevel"></ul>
									</div>
								</li>
								<li class="classify">
									<div class="select-name"><span id="userComplainListSelectName">全部分类</span><span class="triangle"></span></div>
									<div class="select-info" id="userComplainList">
										<table class="userComplainTB">
											<tr>
												<td>全量工单</td>
												<td>
													<input id="wuxianceB" type="checkbox" value="投诉单" checked="">
													<label for="wuxianceB">无线侧B</label>
												</td>
												<td>
													<input id="hexinceN" type="checkbox" value="NOC投诉单" checked="">
													<label for="hexinceN">核心侧N</label>
												</td>
											</tr>
											<tr>
												<td></td>
												<td colspan="2">
													<input id="ziyuanleiC" type="checkbox" value="需求单" checked="">
													<label for="ziyuanleiC">资源类C</label>
												</td>
											</tr>
											<tr>
												<td>抱怨热点</td>
												<td colspan="2">
													<input id="yibihuan" type="checkbox" name="redian" value="1" <%--class="complainRadio"--%> >
													<label for="yibihuan">已闭环</label>
													<%--<img src="../js/IntelligentRoadTestV5/images/iconClose.png" class="closeImg">--%>
												</td>
											</tr>
											<tr>
												<td></td>
												<td colspan="2">
													<input id="weibihuanless3" type="checkbox" name="redian" value="2"  <%--class="complainRadio"--%>>
													<label for="weibihuanless3">未闭环持续3周以内（<3）</label>
												</td>
											</tr>
											<tr>
												<td></td>
												<td colspan="2">
													<input id="weibihuanmore3" type="checkbox" name="redian" value="3" <%--class="complainRadio"--%>>
													<label for="weibihuanmore3">未闭环持续3周以上（≥3）</label>
												</td>
											</tr>
											<tr>
												<td>越级工单</td>
												<td>
													<input id="gongxinbukaohe" type="checkbox" value="工信部越级">
													<label for="gongxinbukaohe">工信部越级考核</label>
												</td>
												<td>
													<input id="jituankaohe" type="checkbox" value="集团越级">
													<label for="jituankaohe">集团越级考核</label>
												</td>
											</tr>
											<tr>
												<td></td>
												<td>
													<input id="gongxinbuguidang" type="checkbox" value="越级考核">
													<label for="gongxinbuguidang">工信部越级归档</label>
												</td>
												<td>
													<input id="jituanguidang" type="checkbox" value="越级归档">
													<label for="jituanguidang">集团越级归档</label>
												</td>
											</tr>
											<tr>
												<td><input type="button" id="filterUserComplain" value="确定" class="btn-bg btn-sure"></td>
											</tr>
										</table>
									</div>
								</li>
								<li class="recomendSort" id="userComplainSort">
									<div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
									<div class="select-info">
										<ul class="sortUl">
											<li class="selected">推荐排序</li>
											<%--<li>弱覆盖优先</li>
											<li>下切优先</li>
											<li>用户数优先</li>
											<li>流量优先</li>
											<li>感知优先</li>--%>
										</ul>
									</div>
								</li>
							</ul>
							<div class="listDivWrap" id="showUserComplainDataDiv">
								<ul class="listUL">
									<li v-for = "(item , index , key ) in userComplainList" class="cursor" @click = "showMessage(item ,index)" v-on:mouseover = "turnMk(index,item)">
										<div class="colDiv">
											<span class="numSpan" v-cloak>{{ index + 1  }}</span>
											<span class="bold" v-cloak v-if="item.type != '抱怨热点'" >工单编号：{{ item.workorder_id }}</span>
											<span class="bold" v-cloak v-if="item.type == '抱怨热点'" >栅格编号：{{ item.workorder_id }}</span>
											<span class="itemCircle" v-if="item.type != '抱怨热点'" v-bind:style="{ background:item.color }"></span>
											<span class="itemSquare" v-if="item.type == '抱怨热点'" v-bind:style="{ background  :item.color}"></span>
										</div>
										<div class="colDiv" v-cloak v-if="item.type != '抱怨热点'">
											<span class="blueColor cellNameEllipsis" v-bind:title="item.service_type" v-cloak>服务类别：{{ item.service_type }}</span>
										</div>
										<div class="colDiv" v-cloak>
											<span class="" v-cloak>抱怨类型：{{ item.typeName }}</span>
										</div>
										<div class="colDiv" v-cloak v-if="item.type == '抱怨热点'">
											<span class="" v-cloak>持续周期：{{ item.continued_cycle }}</span>
										</div>
										<div class="colDiv" v-cloak v-if="item.type == '抱怨热点'">
											<span class="" v-cloak>营服中心：{{ item.mktcenter }}</span>
										</div>
									</li>
								</ul>
								<div class="pageWrap">
									<div class="page">
										<div class="page-pagination">
											<a href="javascript:;" class="first-active" v-on:click = "goFirst"></a>
											<a href="javascript:;" class="prev-active" v-on:click="lastOrNext(0)" ></a>
										</div>
										<div >
											第<input class="page-num" type="text" id="userComplainPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
											<input  type="hidden">
										</div>
										<div class="page-pagination">
											<a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
											<a href="javascript:;" class="last-active" v-on:click="goLast"></a>
										</div>
										<div>
											<a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTestV5/images/111_11.png"></a>
										</div>
									</div>
									<div class="page-info" id="userComplainCountMessage" <%--style="display: none;"--%>>
										<%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
										共<span v-cloak>{{ totalCounts }}</span>条数据
									</div>
								</div>
							</div>
						</div>

						<div class="detailList">
							<div class="backList" id="userComplainCount"> &lt; 返回上一级</div>
							<div class="detailListDiv" id="showUserComplainCompleteMessage">
								<%--全量工单详情页--%>
								<div v-if="userComplain.type == '全量工单'">
									<div class="infoHeader">
										<div class="brDiv">
											<span>工单编号：{{ userComplain.workorder_id }}</span>
											<%--<span class="fRight">工单状态：{{ userComplain.workorder_status }}</span>--%>
										</div>
										<div class="brDiv">
											<span>受理时间：{{ userComplain.accept_time }}</span>
										</div>
										<div class="brDiv">
											<span>区县：{{ userComplain.complaint_county }}</span>
											<span class="fRight">营服中心：{{ userComplain.mktcenter }}</span>
										</div>
										<div class="brDiv nameEllipsis">
											<span>服务类型：</span>
											<span v-bind:title="userComplain.service_type">{{ userComplain.service_type }}</span>
										</div>
									</div>
									<ul class="infoBody">
										<li class="liWrap">
											<div class="nameBtn" v-on:click="showDetailInfo($event)">
												<div class="inline">
													<img src="../js/IntelligentRoadTestV5/images/detail_info.png">
													<span class="nameInfo">工单属性</span>
												</div>
												<div class="floatRight">
													<button class="btn-showInfo">
														<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
													</button>
												</div>
											</div>
											<ul class="ulDetailInfo">
												<li class="colName">
													<span>工单种类：</span>
													<span>{{ userComplain.workorder_type }}</span>
												</li>
												<li class="colName">
													<span>受理内容：</span><br/>
													<span>{{ userComplain.accept_content }}</span>
												</li>
												<li class="colName">
													<span>受理时间：</span>
													<span>{{ userComplain.accept_time }}</span>
												</li>
												<li class="colName">
													<span>工单总历时时长（小时）：</span>
													<span>待定</span>
												</li>
											</ul>
										</li>
										<li class="liWrap">
											<div class="nameBtn" v-on:click="showDetailInfo($event)">
												<div class="inline">
													<img src="../js/IntelligentRoadTestV5/images/detail_region.png">
													<span class="nameInfo">区域</span>
												</div>
												<div class="floatRight">
													<button class="btn-showInfo">
														<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
													</button>
												</div>
											</div>
											<ul class="ulDetailInfo">
												<li>
													<div class="colDiv">
														<span>归属地：</span>
														<span>{{ userComplain.belong_city }}</span>
													</div>
													<div class="colDiv">
														<span>归属网格：</span>
														<span>{{ userComplain.belong_grid }}</span>
													</div>
												</li>
												<li>
													<div class="colDiv">
														<span>申告地：</span>
														<span>{{ userComplain.complaint_city }}</span>
													</div>
													<div class="colDiv">
														<span>区/县：</span>
														<span>{{ userComplain.complaint_county }}</span>
													</div>
												</li>
												<li>
													<div class="colDiv">
														<span>营服中心：</span>
														<span>{{ userComplain.mktcenter }}</span>
													</div>
													<div class="colDiv">
													</div>
												</li>
											</ul>
										</li>
										<li class="liWrap">
											<div class="nameBtn" v-on:click="showDetailInfo($event)">
												<div class="inline">
													<img src="../js/IntelligentRoadTestV5/images/detail_reason.png">
													<span class="nameInfo">原因分析</span>
												</div>
												<div class="floatRight">
													<button class="btn-showInfo">
														<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
													</button>
												</div>
											</div>
											<ul class="ulDetailInfo">
												<li class="colName">
													<span>分析归类：</span>
													<span>{{ userComplain.classify }}</span>
												</li>
												<li class="colName">
													<span>原因定性：</span>
													<span>{{ userComplain.position }}</span>
												</li>
												<li class="colName">
													<span>表象大类：</span>
													<span>{{ userComplain.phenomenon }}</span>
												</li>
												<li class="colName">
													<span>原因定性一级：</span>
													<span>{{ userComplain.position_one }}</span>
												</li>
												<li class="colName">
													<span>原因定性二级：</span>
													<span>{{ userComplain.position_two }}</span>
												</li>
											</ul>
									</li>
										<li class="liWrap">
											<div class="nameBtn" v-on:click="showDetailInfo($event)">
												<div class="inline">
													<img src="../js/IntelligentRoadTestV5/images/detail_position.png">
													<span class="nameInfo">百度经纬度</span>
												</div>
												<div class="floatRight">
													<button class="btn-showInfo">
														<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
													</button>
												</div>
											</div>
											<ul class="ulDetailInfo" style="display: none;">
												<li>
													<div class="colName">
														<span>经度：</span>
														<span v-if="userComplain.longitude != null && userComplain.longitude != ''">{{ parseFloat(userComplain.longitude).toFixed(6) }}</span>
														<span v-else></span>
													</div>
													<div class="colName">
														<span>纬度：</span>
														<span v-if="userComplain.latitude != null && userComplain.latitude != ''">{{ parseFloat(userComplain.latitude).toFixed(6) }}</span>
													</div>
												</li>
											</ul>
										</li>
										<%--<li class="liWrap">
											<div class="nameBtn" v-on:click="showDetailInfo($event)">
												<div class="inline">
													<img src="../js/IntelligentRoadTestV5/images/detial_file.png">
													<span class="nameInfo">归档</span>
												</div>
												<div class="floatRight">
													<button class="btn-showInfo">
														<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
													</button>
												</div>
											</div>
											<ul class="ulDetailInfo">
												<li class="colName">
													<span>归档时间：</span>
													<span>{{ userComplain.archive_time }}</span>
												</li>
												<li class="colName">
													<span>归档内容：</span><br/>
													<span>{{ userComplain.archive_content }}</span>
												</li>
											</ul>
										</li>--%>
									</ul>
								</div>
								<%--抱怨热点详情页--%>
								<div v-if="userComplain.type == '抱怨热点'">
									<div class="infoHeader">
										<div class="brDiv">
											<span>栅格编号：{{ userComplain.workorder_id }}</span>
											<span class="fRight">id：{{ userComplain.id }}</span>
										</div>
										<div class="brDiv">
											<span>持续周期：{{ userComplain.continued_cycle }}</span>
											<span class="fRight">是否闭环：
												<span class="text_red" v-if="userComplain.close_loop == 1">是</span>
												<span class="text_red" v-else>否</span>
											</span>
										</div>
									</div>
									<ul class="infoBody">
										<li class="liWrap">
											<div class="nameBtn" v-on:click="showDetailInfo($event)">
												<div class="inline">
													<img src="../js/IntelligentRoadTestV5/images/detail_info.png">
													<span class="nameInfo">栅格属性</span>
												</div>
												<div class="floatRight">
													<button class="btn-showInfo">
														<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
													</button>
												</div>
											</div>
											<ul class="ulDetailInfo">
												<li class="colName">
													<span>地市：</span>
													<span>{{ userComplain.city }}</span>
												</li>
												<li class="colName">
													<span>区县：</span>
													<span>{{ userComplain.county }}</span>
												</li>
												<li class="colName">
													<span>镇：</span>
													<span>{{ userComplain.town }}</span>
												</li>
												<li class="colName">
													<span>营服中心：</span>
													<span>{{ userComplain.mktcenter }}</span>
												</li>
												<li class="colName">
													<span>路名：</span>
													<span>{{ userComplain.road }}</span>
												</li>
												<li class="colName">
													<span>中心点经度：</span>
													<span v-if="userComplain.longitude != null && userComplain.longitude != ''">{{ parseFloat(userComplain.longitude).toFixed(6) }}</span>
													<span v-else></span>
												</li>
												<li class="colName">
													<span>中心点纬度：</span>
													<span v-if="userComplain.latitude != null && userComplain.latitude != ''">{{ parseFloat(userComplain.latitude).toFixed(6) }}</span>
													<span v-else></span>
												</li>
											</ul>
										</li>
										<li class="liWrap">
											<div class="nameBtn" v-on:click="showDetailInfo($event)">
												<div class="inline">
													<img src="../js/IntelligentRoadTestV5/images/detail_region.png">
													<span class="nameInfo">周期</span>
												</div>
												<div class="floatRight">
													<button class="btn-showInfo">
														<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
													</button>
												</div>
											</div>
											<ul class="ulDetailInfo">
												<li>
													<div class="colName">
														<span>原始周期起始时间：</span>
														<span>{{ userComplain.create_stime }}</span>
													</div>
													<div class="colName">
														<span>原始周期结束时间：</span>
														<span>{{ userComplain.create_etime }}</span>
													</div>
												</li>
												<li>
													<div class="colName">
														<span>更新/闭环周期起始时间：</span>
														<span>{{ userComplain.update_stime }}</span>
													</div>
													<div class="colName">
														<span>更新/闭环周期结束时间：</span>
														<span>{{ userComplain.update_etime }}</span>
													</div>
												</li>
											</ul>
										</li>
										<li class="liWrap">
											<div class="nameBtn" v-on:click="showDetailInfo($event)">
												<div class="inline">
													<img src="../js/IntelligentRoadTestV5/images/detial_file.png">
													<span class="nameInfo">单量</span>
												</div>
												<div class="floatRight">
													<button class="btn-showInfo">
														<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
													</button>
												</div>
											</div>
											<ul class="ulDetailInfo">
												<li>
													<div class="colName">
														<span>原始单量：</span>
														<span>{{ userComplain.older_count }}</span>
													</div>
													<div class="colName">
														<span>最新单量：</span>
														<span>{{ userComplain.newest_count }}</span>
													</div>
												</li>
											</ul>
										</li>
										<li class="liWrap">
											<div class="nameBtn" v-on:click="showDetailInfo($event)">
												<div class="inline">
													<img src="../js/IntelligentRoadTestV5/images/detail_reason.png">
													<span class="nameInfo">排序</span>
												</div>
												<div class="floatRight">
													<button class="btn-showInfo">
														<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
													</button>
												</div>
											</div>
											<ul class="ulDetailInfo">
												<li class="colName">
													<span>排序：</span>
													<span>{{ userComplain.top_number }}</span>
												</li>
											</ul>
										</li>
									</ul>
								</div>
								<%--越级工单详情页--%>
								<div v-if="userComplain.type == '越级工单'">
									<div class="infoHeader">
										<div class="brDiv">
											<span>工单编号：{{ userComplain.workorder_id }}</span>
											<span class="fRight text_red">越级工单</span>
										</div>
										<div class="brDiv">
											<span>服务类型：{{ userComplain.service_type }}</span>
											<span class="fRight">工单状态：<span class="text_red">{{ userComplain.workorder_status }}</span></span>
										</div>
									</div>
									<ul class="infoBody">
										<li class="liWrap">
											<div class="nameBtn" v-on:click="showDetailInfo($event)">
												<div class="inline">
													<img src="../js/IntelligentRoadTestV5/images/detail_info.png">
													<span class="nameInfo">投诉内容</span>
												</div>
												<div class="floatRight">
													<button class="btn-showInfo">
														<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
													</button>
												</div>
											</div>
											<ul class="ulDetailInfo">
												<li class="colName">
													<span>投诉情况描述：</span>
													<span>{{ userComplain.accept_content }}</span>
												</li>
												<li class="colName">
													<span>投诉来源：</span>
													<span>{{ userComplain.workorder_type }}</span>
												</li>
											</ul>
										</li>
										<li class="liWrap">
											<div class="nameBtn" v-on:click="showDetailInfo($event)">
												<div class="inline">
													<img src="../js/IntelligentRoadTestV5/images/detail_reason.png">
													<span class="nameInfo">原因分析</span>
												</div>
												<div class="floatRight">
													<button class="btn-showInfo">
														<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
													</button>
												</div>
											</div>
											<ul class="ulDetailInfo">
												<li class="colName">
													<span>投诉原因分类：</span>
													<span>{{ userComplain.classify_front }}</span>
												</li>
												<li class="colName">
													<span>投诉原因分类（申诉后）：</span>
													<span>{{ userComplain.classify_after }}</span>
												</li>
												<li class="colName">
													<span>原因定性：</span>
													<span>{{ userComplain.position }}</span>
												</li>
												<li class="colName">
													<span>原因定性二级：</span>
													<span>{{ userComplain.position_two }}</span>
												</li>
												<li class="colName">
													<span>分析归类：</span>
													<span>{{ userComplain.classify }}</span>
												</li>
											</ul>
										</li>
										<li class="liWrap">
											<div class="nameBtn" v-on:click="showDetailInfo($event)">
												<div class="inline">
													<img src="../js/IntelligentRoadTestV5/images/detial_file.png">
													<span class="nameInfo">处理结果</span>
												</div>
												<div class="floatRight">
													<button class="btn-showInfo">
														<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
													</button>
												</div>
											</div>
											<ul class="ulDetailInfo">
												<li class="colName">
													<span>受理时间：</span>
													<span>{{ userComplain.accept_time }}</span>
												</li>
												<li class="colName">
													<span>处理结果描述：</span>
													<span>{{ userComplain.archive_content }}</span>
												</li>
												<li class="colName">
													<span>处理审核/答复时间：</span>
													<span>{{ userComplain.answer_time }}</span>
												</li>
											</ul>
										</li>
										<li class="liWrap">
											<div class="nameBtn" v-on:click="showDetailInfo($event)">
												<div class="inline">
													<img src="../js/IntelligentRoadTestV5/images/detail_position.png">
													<span class="nameInfo">区域</span>
												</div>
												<div class="floatRight">
													<button class="btn-showInfo">
														<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
													</button>
												</div>
											</div>
											<ul class="ulDetailInfo">
												<li>
													<div class="colName">
														<span>归属地：</span>
														<span>{{ userComplain.belong_city }}</span>
													</div>
													<div class="colName">
														<span>申告地市：</span>
														<span>{{ userComplain.complaint_city }}</span>
													</div>
													<div class="colName">
														<span>实际申告地：</span>
														<span>{{ userComplain.actual_city }}</span>
													</div>
													<div class="colName">
														<span>投诉地区县：</span>
														<span>{{ userComplain.complaint_county }}</span>
													</div>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<%--用户抱怨结束--%>
					<%--工单开始--%>
					<div class="listDiv" id="showAlarmInfoList" style="display: none;">
						<div class="backList" id="alarmInfoBack" style="display: none;">返回</div>
						<div class="listWrap">
							<div class="searchTitle">在“广州”天河区域内搜索</div>
							<ul class="listTopUl">
								<li class="selectCity" id="alarmSelectCity">
									<div class="select-name selectCity-name">
										<img src="../js/IntelligentRoadTestV5/images/nor_add.png" class="name-icon">
										<span class="city-selected" id="alarmCityName">广州</span>
										<span class="triangle"></span>
									</div>
									<div class="select-info city-info" style="display: none;">
										<ul id="alarmSelectCityList" class="city-list"></ul>
									</div>
								</li>
								<li class="classify">
									<div class="select-name"><span id="alarmInfoListSelectName">全部分类</span><span class="triangle"></span></div>
									<div class="select-info" id="alarmInfoList">
										<div class="flexRow">
											<div class="flexCol">全部分类</div>
											<div class="flexCol selected" >全部</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">工单类型</div>
											<div class="flexCol selected">不限</div>
											<%--<div class="flexCol"></div><div class="flexCol"></div><div class="flexCol"></div>--%>
											<div class="flexCol" style="white-space:  nowrap;">弱区</div>
											<%--<div class="flexCol"></div><div class="flexCol"></div>--%>
											<div class="flexCol" style="white-space:  nowrap;">扇区勘误</div>
											<div class="flexCol"></div>
											<div class="flexCol">高速</div>
											<div class="flexCol">高校</div>
											<div class="flexCol">美食</div>
											<div class="flexCol"></div>
											<div class="flexCol">战狼</div>
											<div class="flexCol">场馆</div>
											<div class="flexCol">美景</div>
											<div class="flexCol"></div>
											<div class="flexCol">住宅区</div>
											<div class="flexCol">商务区</div>
											<div class="flexCol">农贸</div>
											<div class="flexCol"></div>
											<div class="flexCol">中小学</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">工单等级</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">紧急</div>
											<div class="flexCol">严重</div>
											<div class="flexCol"></div>
											<div class="flexCol">一般</div>
											<div class="flexCol">次要</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">是否恢复</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">已恢复</div>
											<div class="flexCol">未恢复</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">工单状态</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">已申请</div>
											<div class="flexCol">已销单</div>
											<div class="flexCol"></div>
											<div class="flexCol">已退单</div>
										</div>
									</div>
								</li>
								<li class="recomendSort" id="alarmInfoSort">
									<div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
									<div class="select-info">
										<ul class="sortUl">
											<li class="selected">恢复时间优先</li>
											<li>派单时间优先</li>
										</ul>
									</div>
								</li>
							</ul>
							<div class="listDivWrap" id="showAlarmInfoDiv">
								<ul class="listUL">
									<li v-for = "(item , index , key ) in alarmInfoList" v-on:mouseover = "turnMk(index,item)">

										<div class="colDiv">
											<span class="numSpan" v-cloak>{{ index + 1  }}</span>
											<span class="bold"  v-on:click="showMessage(item)" v-cloak>工单单号：{{ item.task_id }}</span>
											<div class="rightImg">
												<span v-if="item.is_recover == '是'"><img src="../js/IntelligentRoadTestV5/images/jie.png"></span>
											</div>
										</div>
										<div class="colDiv" v-if="item.alarm_name == 'AGPS智能路测弱覆盖区域'">
											<span>弱区编号：</span><span class="clickBlueText" v-cloak v-on:click="goPoorAreaMessage(item.enodeb_id ,item.alarm_id,index)">{{ item.enodeb_id }}</span>
										</div>
										<div class="colDiv" v-if="item.alarm_name == '4G基站扇区基础信息异常'">
											<span>扇区编号：</span><span class="clickBlueText" v-cloak v-on:click="gotoShowSectorMessage(item.enodeb_id , item.cell_id,index)">{{ item.enodeb_id + "_" + item.cell_id }}</span>
										</div>
										<div class="colDiv" v-if="item.alarm_name == '4G基站扇区基础信息异常'">
											<span>扇区名称：</span><span class="clickBlueText" v-cloak v-on:click="gotoShowSectorMessage(item.enodeb_id , item.cell_id,index)">{{ item.cell_name }}</span>
										</div>
										<div class="colDiv"
											 v-if="item.alarm_name != 'AGPS智能路测弱覆盖区域' && item.alarm_name != '4G基站扇区基础信息异常'
											  && item.alarm_name != '天翼蓝鹰高速' && item.alarm_name != '天翼蓝鹰高铁' && item.alarm_name != '天翼蓝鹰市政路'"> <%--场景的工单--%>
											<span>区域编号：</span><span class="clickBlueText" v-cloak v-on:click="gotoShowSenseMessage(item.enodeb_id ,  item.alarm_name , item.alarm_time  , index)">{{ item.enodeb_id }}</span>
										</div>
										<div class="colDiv"
											 v-if="item.alarm_name == '天翼蓝鹰高速' || item.alarm_name == '天翼蓝鹰高铁' || item.alarm_name == '天翼蓝鹰市政路'"> <%--场景的工单--%>
											<span>路段编号：</span><span class="clickBlueText" v-cloak v-on:click="gotoShowRoadMessage(item.enodeb_id ,  item.alarm_name , item.alarm_time  , item.city , index)">{{ item.enodeb_id }}</span>
										</div>
										<div class="colDiv" v-if="item.alarm_name != 'AGPS智能路测弱覆盖区域' && item.alarm_name != '4G基站扇区基础信息异常'"> <%--场景的工单--%>
											<span>区域类型：</span><span class="" v-cloak >{{ item.alarm_name }}</span>
										</div>
										<div class="colDiv" >
											<span>工单等级：</span><span v-cloak >{{ item.alarm_level }}</span>
										</div>
									</li>
								</ul>
								<div class="pageWrap">
									<div class="page">
										<div class="page-pagination">
											<a href="javascript:;" class="first-active"  v-on:click = "goFirst"></a>
											<a href="javascript:;" class="prev-active" v-on:click="lastOrNext(0)" ></a>
										</div>
										<div >
											第<input class="page-num" type="text" id="alarmInfoPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
											<input  type="hidden">
										</div>
										<div class="page-pagination">
											<a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
											<a href="javascript:;" class="last-active" v-on:click="goLast"></a>
										</div>
										<div>
											<a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTestV5/images/111_11.png"></a>
										</div>
									</div>
									<div class="page-info" id="alarmInfoCountMessage" <%--style="display: none;"--%>>
										<%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
										共<span v-cloak>{{ totalCounts }}</span>条数据
									</div>
								</div>
							</div>
						</div>

						<div class="detailList">
							<div class="backList" id="alarmInfoCount"> &lt; 返回上一级</div>
							<div class="detailListDiv" id="showAlarmInfoCompleteMessage">
								<div class="infoHeader">
									<div class="brDiv">
										<span v-cloak>工单号：{{ alarmInfoData.task_id }}</span>
										<span class="fRight" v-cloak>是否恢复：{{ alarmInfoData.is_recover }}</span>
									</div>
									<div class="brDiv">
										<span v-cloak>告警等级：{{ alarmInfoData.alarm_level }}</span>
										<span class="fRight" v-cloak>工单状态：{{ alarmInfoData.task_status }}</span>
									</div>
								</div>
								<ul class="infoBody">
									<li>
										<div class="colDiv">
											<span v-cloak>告警ID：{{ alarmInfoData.alarm_id }}</span>
										</div>
									</li>
									<li>
										<div class="colDiv">
											<span v-cloak>弱区编号：{{ alarmInfoData.enodeb_id }}</span>
										</div>
									</li>
									<li>
										<div class="colDiv">
											<span v-cloak>创建时间：{{ alarmInfoData.alarm_time }}</span>
										</div>
									</li>
									<li>
										<div class="colDiv">
											<span v-cloak>恢复时间：{{ alarmInfoData.recover_time }}</span>
										</div>
									</li>
									<li>
										<div class="colDiv">
											<span v-cloak>派单时间：{{ alarmInfoData.task_send_time }}</span>
										</div>
									</li>
									<li>
										<div class="colDiv">
											<span v-cloak>结束时间：{{ alarmInfoData.task_finish_time }}</span>
										</div>
									</li>
									<li>
										<div class="colDiv">
											<div style="text-align: center">工单内容</div>
										</div>
									</li>
									<li v-for="(obj , index , key) in alarmInfoData.alarm_text.split(',')">
										<div class="colDiv" v-if="index < 14" v-cloak>{{ obj }}</div>
										<ul v-else class="alarmUl">
											<li class="alarm_text" v-for="txt in obj.split('\n')" v-cloak>
												{{ txt }}
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<%--工单结束--%>
					<%--DT开始--%>
					<div class="listDiv tbList" id="showdtList" style="display: none;">
						<div class="listWrap">
							<%--<div class="backList" id="dtCount"> &lt; 返回上一级</div>--%>
							<ul class="listTopUl">
								<li class="selectCity" id="DTCitySelect">
									<div class="select-name selectCity-name">
										<img src="../js/IntelligentRoadTestV5/images/nor_add.png" class="name-icon">
										<span class="city-selected" id="DTCityName">广州</span>
										<span class="triangle"></span>
									</div>
									<div class="select-info city-info" style="display: none;">
										<ul id="DTCitySelectList" class="city-list"></ul>
									</div>
								</li>
								<li class="classify">
									<div class="select-name" ><span id="dtListSelectName">全部分类</span><span class="triangle"></span></div>
									<div class="select-info" id="dtList">
										<div class="flexRow">
											<div class="flexCol">全部分类</div>
											<div class="flexCol selected">全部</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">文件时间</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">最近7天</div>
											<div class="flexCol">7天以前</div>
											<div class="flexCol"></div>
											<div class="flexCol">30天以前</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">上传时间</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">最近7天</div>
											<div class="flexCol">7天以前</div>
											<div class="flexCol"></div>
											<div class="flexCol">30天以前</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">共享状态</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">我的共享</div>
											<div class="flexCol">审核中</div>
											<div class="flexCol"></div>
											<div class="flexCol">共享未通过</div>
											<div class="flexCol">共享</div>
										</div>
									</div>
								</li>
								<li class="recomendSort" id="dtSort">
									<div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
									<div class="select-info">
										<ul class="sortUl">
											<li class="selected">图层时间优先</li>
											<li>图层名称优先</li>
										</ul>
									</div>
								</li>
							</ul>
							<div class="listDivWrap" id="dtShowDiv">
								<ul class="listUL" >
									<li v-for = "(item , index , key ) in dtList" class="element">
										<div class="colDiv">
											<div class="bold"><span class="dtNumSpan" v-cloak>{{ index + 1  }}</span>{{ item.dt_name }}<div style="margin-left:5%"  v-if="item.type!=1"><span  class="dtsquarePick" v-on:click ="dtColorPick" v-bind:style="{ background : item.color }" ></span></div></div>
											<div class="positionRight" v-if="item.iscandelete == 1||item.share_status == '已共享'||item.share_status == '取消共享审核中'">
												<span class="text_orange" v-if="(item.share_status == '共享审核中'||item.share_status == '取消共享审核中')&&item.iscandelete == 1" v-cloak>{{item.share_status}}</span>
												<span class="text_red"   v-if="item.share_status == '共享未通过'" <%--v-on:mouseover="viewAudit($event , item.audit_option)" v-on:mouseout="hideAudit()"--%>  v-cloak>{{item.share_status}}</span>
												<span class="text_blue"  v-if="item.share_status == '已共享'&&item.iscandelete == 1" <%--v-on:mouseover="viewAudit($event , item.audit_option)" v-on:mouseout="hideAudit()"--%> v-cloak>我的共享</span>
												<span class="text_blue"  v-if="(item.share_status == '已共享'|| item.share_status == '取消共享审核中') && item.iscandelete == 0" v-cloak>共享</span>
											</div>
										</div>
										<div class="colDiv">
											<div class="RTtime" v-cloak>文件时间：{{ item.dt_time }}</div>
										</div>
										<div class="colDiv">
											<div class="address" v-cloak>上传时间：{{ item.create_time }}</div>
										</div>
										<div class="colDiv">
											<div class="btnImgDiv">
												<button title="显示" v-on:click = 'dtShow(item,$event)'><img src="../js/IntelligentRoadTest/images/dtShow.png"></button>
												<button title="共享"  v-if="item.share_status != '已共享'&& item.share_status != '共享审核中'&& item.share_status != '取消共享审核中' &&item.iscandelete == 1" v-on:click = 'dtShare(item,$event)'><img src="../js/IntelligentRoadTestV5/images/share.png"></button>
												<button title="取消共享"  v-if="item.share_status == '已共享'&&item.iscandelete == 1" v-on:click = 'dtShare(item,$event)'><img src="../js/IntelligentRoadTestV5/images/shcancel.png"></button>
												<button title="撤销申请"  v-if="(item.share_status == '共享审核中'||item.share_status == '取消共享审核中')&&item.iscandelete == 1" v-on:click = 'dtShare(item,$event)'><img src="../js/IntelligentRoadTestV5/images/cancel.png"></button>
												<button title="下载" v-on:click = 'dtFileDownload(item)'><img src="../js/IntelligentRoadTest/images/dtFileUpload.png"></button>
												<button title="删除" v-if="item.iscandelete == 1" v-on:click = 'dtDelete(item)'><img src="../js/IntelligentRoadTest/images/dtDelete.png"></button>
											</div>
											<div class="userName" v-cloak>{{ item.creator }}</div>
										</div>
									</li>
								</ul>
								<div class="pageWrap">
									<div class="page">
										<div class="page-pagination">
											<a href="javascript:;" class="first-active"  v-on:click = "goFirst"></a>
											<a href="javascript:;" class="prev-active" v-on:click="lastOrNext(0)" ></a>
										</div>
										<div >
											第<input class="page-num" type="text" id="dtPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
											<input  type="hidden">
										</div>
										<div class="page-pagination">
											<a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
											<a href="javascript:;" class="last-active" v-on:click="goLast"></a>
										</div>
										<div>
											<a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTestV5/images/111_11.png"></a>
										</div>
									</div>
									<div class="page-info" id="dtCountMessage" <%--style="display: none;"--%>>
										<%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
										共<span  v-cloak>{{ totalCounts }}</span>条数据
									</div>
								</div>
								<!-- 审核意见--start -->
								<div class="dtAuditTip">
									<%--<div class="">
										<div>共享说明：</div>
										<div class="shareText">

										</div>
									</div>--%>
									<div class="">
										<div>审核意见：</div>
										<div class="dtAuditText">
											<span id="dtAuditOption"></span>
										</div>
									</div>
								</div>
								<!-- 审核意见--end -->
							</div>
						</div>
					</div>
					<%--DT结束--%>
					<%--骨头区域开始--%>
					<div class="listDiv" id="showBoneList" style="display: none;">
						<div class="listWrap">
							<div class="searchTitle" style="display: none">在“广州”天河区域内搜索</div>
							<ul class="listTopUl">
								<li class="selectCity" id="boneCitySelect">
									<div class="select-name selectCity-name">
										<img src="../js/IntelligentRoadTestV5/images/nor_add.png" class="name-icon">
										<span class="city-selected" id="boneCityName">广州</span>
										<span class="city-selected-gt">&gt;</span>
										<span class="district-selected" id="boneDistrictName">全市</span>
										<span class="mktcenter-selected-gt">&gt;</span>
										<span class="mktcenter-selected" id="boneMktName">全区</span>
										<span class="triangle"></span>
									</div>
									<div class="select-info city-info" style="display: none;">
										<ul id="boneCitySelectList" class="threeLevel"></ul>
									</div>
								</li>
								<li class="classify">
									<div class="select-name"><span id="boneListSelectName">全部分类</span><span class="triangle"></span></div>
									<div class="select-info" id="boneList">
										<div class="flexRow">
											<div class="flexCol">全部分类</div>
											<div class="flexCol selected">全部</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">缓期处理</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">是</div>
											<div class="flexCol">否</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">数据来源</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">系统创建</div>
											<div class="flexCol">手工添加</div>
										</div>
									</div>
								</li>
								<li class="recomendSort" id="boneSort">
									<div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
									<div class="select-info">
										<ul class="sortUl">
											<li class="selected">推荐排序</li>
											<li>弱覆盖优先</li>
											<li>下切优先</li>
											<li>用户数优先</li>
											<li>流量优先</li>
											<li>感知优先</li>
										</ul>
									</div>
								</li>
							</ul>
							<div class="listDivWrap" id="showBoneAreaDataDiv">
								<ul class="listUL">
									<li v-for = "(item , index , key ) in boneAreaList" class="cursor" @click = "showMessage(item ,index)" v-on:mouseover = "turnMk(index,item)">
										<div class="colDiv">
											<span class="numSpan" v-cloak>{{ index + 1  }}</span>
											<span class="bold" v-cloak>区域名称：{{ item.object_name }}</span>
											<div class="positionRight">
												<span class="greenStatus" v-if="item.is_suspend == 'Y'">已确认 </span>
												<span class="greenStatus" v-else>未确认 </span>
											</div>
										</div>
										<div class="colDiv">
											<span>RSRP均值：</span>
											<span v-if="item.rsrp_avg == null || item.rsrp_avg == ''">&nbsp;</span>
											<span  v-else v-cloak>{{ item.rsrp_avg.toFixed(2) }}</span>
										</div>
										<div class="colDiv">
											<span>覆盖率：</span>
											<span v-if="item.rsrp_cov == null || item.rsrp_cov == ''">&nbsp;</span>
											<span v-else v-cloak>{{ (item.rsrp_cov*100).toFixed(2) }}</span>
										</div>
										<div class="colDiv">
											<span class="cellNameEllipsis" v-bind:title="item.cell_name" v-cloak>最近扇区：{{ item.cell_name }}</span>
										</div>
									</li>
								</ul>
								<div class="pageWrap">
									<div class="page">
										<div class="page-pagination">
											<a href="javascript:;" class="first-active"  v-on:click = "goFirst"></a>
											<a href="javascript:;" class="prev-active" v-on:click="lastOrNext(0)" ></a>
										</div>
										<div >
											第<input class="page-num" type="text" id="boneAreaPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
											<input  type="hidden">
										</div>
										<div class="page-pagination">
											<a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
											<a href="javascript:;" class="last-active" v-on:click="goLast"></a>
										</div>
										<div>
											<a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTestV5/images/111_11.png"></a>
										</div>
									</div>
									<div class="page-info" id="boneAreaCountMessage" <%--style="display: none;"--%>>
										<%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
										共<span v-cloak>{{ totalCounts }}</span>条数据
									</div>
								</div>
							</div>
						</div>

						<div class="detailList">
							<div class="backList" id="boneAreaCount"> &lt; 返回上一级</div>
							<div class="detailListDiv" id="showBoneAreaCompleteMessage">
								<div class="infoHeader">
									<div class="brDiv">
										<span v-cloak>
											区域编号：{{ boneAreaData.id }}
											<button id="bonePosition" class="positionDivBtn" v-on:click="boneAreaPosition(boneAreaData)">
												<img class="" src="../js/IntelligentRoadTestV5/images/white_position.png" title="定位">
											</button>
											<button  class="positionDivBtn showBtn positionClass" v-on:click="showPolygonGrid(boneAreaData,$event)">
												<img class="imgClass" src="../js/IntelligentRoadTest/images/showP.png" title="显示">
											</button>
										</span>
										<span  class="fRight" v-cloak>创建者：
											<span v-if="boneAreaData.creator == null || boneAreaData.creator == ''">系统创建</span>
											<span v-else>{{ boneAreaData.creator }}</span>
										</span>
									</div>
									<div class="brDiv">
										<span v-cloak>区域类型：{{ boneAreaData.area_type }}</span>
										<span class="fRight">地市：{{ boneAreaData.city }}</span>
									</div>
									<div class="brDiv">
										<span v-on:click="BoneAreaPosition(BoneAreaData)" v-cloak>区域名称：{{ boneAreaData.object_name }}</span>
										<span class="fRight" v-cloak>{{ boneAreaData.create_time }}</span>
									</div>
								</div>
								<ul class="infoBody">
									<li>
										<div>
											<img src="../js/IntelligentRoadTestV5/images/change7.png"/>
											<span class="nameInfo" >{{ title }}</span>
										</div>
									</li>
									<li id="boneSevenLineLi">
										<div id="boneLineChart" class="chartDiv"></div>
									</li>
									<li v-show="hideSecondEchart == false">
										<div>
											<img src="../js/IntelligentRoadTestV5/images/change7.png"/>
											<span class="nameInfo" >感知速率</span>
										</div>
									</li>
									<li id="" v-show="hideSecondEchart == false">
										<div id="boneAreaSecondChart" class="chartDiv"></div>
									</li>
									<li class="liWrap nrTop5Cell">
										<div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">附近扇区</span>
											</div>
											<div class="inline" v-if="boneAreaData.isHasSameSector != true">未就近接入</div>
											<div class="floatRight">
												<button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,boneAreaData,1)" style="display: none;"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;">
											<li class="cellInfoWrap" v-for="(data , index , key) in nrTop5Cell">
												<div class="cellName" v-cloak v-on:click="gotoShowSectorMessage(data)">
													<span>扇区名称：</span>
													<span v-if="data.recent_cell_name == null || data.recent_cell_name == ''">--</span>
													<span class="sectorNameEllipsis" v-bind:title="data.recent_cell_name" v-else>{{ data.recent_cell_name }}</span>
												</div>
												<div class="cellInfoDiv">
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站编号</span><span class="blueInfo" v-cloak>{{ data.enodebid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">小区编号</span><span class="blueInfo" v-cloak>{{ data.cellid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(m)</span>
														<span class="blueInfo" v-cloak v-if="data.distance == null || data.distance == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">MR数量</span>
														<span class="blueInfo" v-cloak v-if="data.counts == null || data.counts == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ data.counts }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>

									<li class="liWrap mrNrTop5Cell">
										<div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img class="cursor" src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">接入扇区</span>
											</div>
											<div class="floatRight">
												<button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,boneAreaData,2)" style="display: none;"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;">
											<li class="cellInfoWrap"  v-for="(data , index , key ) in mrTop5Cell">
												<div class="cellName" v-cloak v-on:click="gotoShowSectorMessage(data)">
													<span>扇区名称：</span>
													<span v-if="data.recent_cell_name == null || data.recent_cell_name == ''">--</span>
													<span class="sectorNameEllipsis" v-bind:title="data.recent_cell_name" v-else>{{ data.recent_cell_name }}</span>
												</div>
												<div class="cellInfoDiv">
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站编号</span><span class="blueInfo" v-cloak>{{ data.enodebid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">小区编号</span><span class="blueInfo" v-cloak>{{ data.cellid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(m)</span>
														<span class="blueInfo" v-cloak v-if="data.distance == null || data.distance == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">MR数量</span>
														<span class="blueInfo" v-cloak v-if="data.counts == null || data.counts == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ data.counts }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li>
										<div class="handleDiv">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/delayReason.png"/>
												<span class="nameInfo">延期原因</span>
											</div>
											<div class="floatRight">
												<button id="editBoneAreaButton" v-on:click = "editBoneAreaMessage(boneAreaData)">
													<img class="concernPadding" src="../js/IntelligentRoadTestV5/images/edit.png"/>
												</button>
												<button type="button" class="btn-bg btn-save" id="boneAreaSureButton" style="display: none;">保存</button>
												<button type="button" class="btn-bg btn-cancel" id="cancelBoneButton" style="display: none;">取消</button>
											</div>
										</div>
									</li>
									<li>
										<div class="handle_description">
										<textarea rows="5" id="boneHandleDescribe" readonly>
											<%--{{ boneAreaData.suspend_reason }}--%>
										</textarea>
										</div>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_index.png">
												<span class="nameInfo">指标</span>
											</div>
											<div class="floatRight">
												<button class="gotoListPage" title="进入KPI列表" v-on:click="gotoKPIList(boneAreaData)" v-if="mrTop5Cell.length!=0"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo">
											<li class="colName">
												<div class="colDiv">类型</div>
												<div class="colDiv">值</div>
												<div class="colDiv"></div>
											</li>
											<li v-if="boneAreaData.lte_to_3g_tot != null">
												<div class="colDiv">
													<span class="nameInfo">下切数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ boneAreaData.lte_to_3g_tot }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li v-if="boneAreaData.user_4g_avg != null">
												<div class="colDiv">
													<span class="nameInfo">用户数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ boneAreaData.user_4g_avg }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li v-if="boneAreaData.flow_4g_tot != null">
												<div class="colDiv">
													<span class="nameInfo">流量(MB)</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-if="boneAreaData.flow_4g_tot == null || boneAreaData.flow_4g_tot == ''">&nbsp;</span>
													<span class="blueInfo" v-else v-cloak>{{ boneAreaData.flow_4g_tot.toFixed(2) }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li v-if="boneAreaData.rsrp_cov != null">
												<div class="colDiv">
													<span class="nameInfo">覆盖率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-if="boneAreaData.rsrp_cov == null || boneAreaData.rsrp_cov == ''">&nbsp;</span>
													<span class="blueInfo" v-else v-cloak>{{ (boneAreaData.rsrp_cov*100).toFixed(2) }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li v-if="boneAreaData.ce_good_ratio_avg != null">
												<div class="colDiv">
													<span class="nameInfo">感知优良率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-if="boneAreaData.ce_good_ratio_avg == null || boneAreaData.ce_good_ratio_avg == ''">&nbsp;</span>
													<span class="blueInfo" v-else v-cloak>{{ (boneAreaData.ce_good_ratio_avg*100).toFixed(2) }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li v-if="boneAreaData.rsrp_count != null">
												<div class="colDiv">
													<span class="nameInfo">AGPS记录数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ boneAreaData.rsrp_count }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li v-if="boneAreaData.rsrp_avg != null">
												<div class="colDiv">
													<span class="nameInfo">RSRP均值</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-if="boneAreaData.rsrp_avg == null || boneAreaData.rsrp_avg == ''">&nbsp;</span>
													<span class="blueInfo" v-else v-cloak>{{ boneAreaData.rsrp_avg.toFixed(2) }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li v-if="boneAreaData.poor_grid_nums != null">
												<div class="colDiv">
													<span class="nameInfo">栅格数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-cloak>{{ boneAreaData.poor_grid_nums }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">数据来源</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-if="boneAreaData.area_src_type == 0">系统创建</span>
													<span class="blueInfo" v-else>手工添加</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
                                    <%--<li class="liWrap  &lt;%&ndash;noshow&ndash;%&gt;">
                                        <div class="nameBtn" v-on:click="showDetailInfo($event)">
                                            <div class="inline">
                                                <img src="../js/IntelligentRoadTestV5/images/detail_kpiRate.png">
                                                <span class="nameInfo">感知速率</span>
                                            </div>
                                            <div class="floatRight">
                                                <button class="btn-showInfo">
                                                    <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                                </button>
                                            </div>
                                        </div>
                                        <ul class="ulDetailInfo" style="display: none;">
                                            <li class="colName">
                                                <div class="colDiv">类型</div>
                                                <div class="colDiv">值</div>
                                                <div class="colDiv"></div>
                                            </li>
                                            <li >
                                                <div class="colDiv fLeft">
                                                    <span class="nameInfo">KPI感知上行速率</span>
                                                </div>
                                                <div class="colDiv">
                                                    <span class="blueInfo" v-cloak v-if="boneAreaData.min_userex_upavgrate != null">{{ boneAreaData.min_userex_upavgrate }} Mbps</span>
                                                </div>
                                                <div class="colDiv"></div>
                                            </li>
                                            <li >
                                                <div class="colDiv">
                                                    <span class="nameInfo">KPI感知下行速率</span>
                                                </div>
                                                <div class="colDiv">
                                                    <span class="blueInfo" v-cloak v-if="boneAreaData.min_userex_dwavgrate != null">{{ boneAreaData.min_userex_dwavgrate }} Mbps</span>
                                                </div>
                                                <div class="colDiv"></div>
                                            </li>
                                        </ul>
                                    </li>--%>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_position.png">
												<span class="nameInfo">百度坐标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" style="display: none;">
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">中心点经度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ boneAreaData.longitude_mid }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">中心点纬度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ boneAreaData.latitude_mid }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<li class="block">
										<div v-if="boneAreaData.area_src_type == 0">
											<div class="radioGroup">
										<span>
											 <%--<input v-on:click="deleteBoneArea(boneAreaData , dataIndex)" type="radio" id="SureBornArea" name="bornArea" v-if="boneAreaData.is_suspend=='Y'" checked>--%>
											 <input v-on:click="deleteBoneArea(boneAreaData , dataIndex)" type="radio" id="SureBornArea" name="bornArea" >
											 <label for="SureBornArea">确认骨头区域</label>
										</span>
												<span>
											 <%--<input v-on:click="deleteBoneArea(boneAreaData , dataIndex)" type="radio" id="unSureBornArea" name="bornArea" v-if="boneAreaData.is_suspend == 'N'" checked>--%>
											 <input v-on:click="deleteBoneArea(boneAreaData , dataIndex)" type="radio" id="unSureBornArea" name="bornArea"  >
											 <label for="unSureBornArea">未确认骨头区域</label>
										</span>
											</div>
											<div class="delBtnDiv">
												<button v-if="boneAreaData.creator == uname" class="btn-bg deleteBoneAreaBtn btnDisabled" disabled>删除</button>
											</div>
										</div>
										<div v-else>
											<div class="radioGroup">
											<span class="radioDisabled">
												<input type="radio" name="bornArea" disabled><label>确认骨头区域</label>
											</span>
												<span class="radioDisabled">
												<input type="radio" name="bornArea" disabled><label>未确认骨头区域</label>
											</span>
											</div>
											<div class="delBtnDiv">
												<button class="btn-bg deleteBoneAreaBtn" v-if="boneAreaData.creator==uname" v-on:click = "deleteBoneArea(boneAreaData , dataIndex)">删除</button>
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div class="alertModal" id="modal-boneArea" style="display: none;">
								<div class="alertModal-body">
									<table>
										<tr>
											<td colspan="2" id="boneModalTitle">确认操作该骨头区域</td>
										</tr>
										<tr>
											<td>
												<button type="button" class="btn-bg modal-sure" id="sureDealBone">确定</button>
											</td>
											<td>
												<button type="button" class="btn-bg modal-cancel" id="cancelDealBone">取消</button>
											</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</div>
					<%--骨头区域结束--%>
					<%--宏扇区坐标谌误开始  macSector  --%>
					<div class="listDiv" id="showMacSectorList" style="display: none;">
						<div class="listWrap">
							<%--<div class="backList" id="macSectorCount"> &lt; 返回上一级</div>--%>
							<div class="searchTitle">在“广州”天河区域内搜索</div>
							<ul class="listTopUl">
								<li class="selectCity" id="macSectorCitySelect">
									<div class="select-name selectCity-name">
										<img src="../js/IntelligentRoadTestV5/images/nor_add.png" class="name-icon">
										<span class="city-selected" id="macSectorCityName">广州</span>
										<span class="city-selected-gt">&gt;</span>
										<span class="district-selected" id="macSectorDistrictName">全市</span>
										<span class="mktcenter-selected-gt">&gt;</span>
										<span class="mktcenter-selected" id="macSectorMktName">全区</span>
										<span class="triangle"></span>
									</div>
									<div class="select-info city-info" style="display: none;">
										<ul id="macSectorCitySelectList" class="threeLevel"></ul>
									</div>
								</li>
								<li class="classify">
									<div class="select-name"><span id="macSectorListSelectName"></span><span class="triangle"></span></div>
									<div class="select-info" id="macSectorList">
										<div class="flexRow">
											<div class="flexCol">全部分类</div>
											<div class="flexCol selected">全部</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">距离偏差</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">1公里以内</div>
											<div class="flexCol">1-3公里</div>
											<div class="flexCol"></div>
											<div class="flexCol ">3公里以外</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">角度偏差</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">15°以内</div>
											<div class="flexCol">15°到30°</div>
											<div class="flexCol"></div>
											<div class="flexCol ">30°以上</div>
										</div>
										<div class="flexRow">
											<div class="flexCol">天馈接反</div>
											<div class="flexCol selected">不限</div>
											<div class="flexCol">是</div>
											<div class="flexCol">否</div>
										</div>
									</div>
								</li>
								<li class="recomendSort" id="macSectorSort">
									<div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
									<div class="select-info">
										<ul class="sortUl">
											<li class="selected">推荐排序</li>
											<li>距离优先</li>
											<li>流量优先</li>
											<li>角度优先</li>
											<li>附近弱区数量优先</li>
										</ul>
									</div>
								</li>
							</ul>
							<div class="tipsWrap">
								<div class="tipSpan">
									<img src="../js/IntelligentRoadTestV5/images/tipSpan.png">
									<span><span>&nbsp;&nbsp;提示：</span><span style="display: inline-block;width:255px;vertical-align: top">位置和方位角预测均不含800M和室分，同时方位角预测也不含位置预测大于200米的扇区</span></span>
								</div>
							</div>
							<div class="listDivWrap" id="showMacSectorDiv">
								<ul class="listUL">
									<li v-for = "(item , index , key ) in macSectorList"  v-on:mouseover = "turnMk(index,item)" >
										<div class="colDiv">
											<span class="numSpan" v-cloak>{{ index + 1  }}</span>
											<span class="bold" v-cloak>基站编号：{{ item.enodeb_id }}</span>
											<div class="rightImg">
												<span v-if="item.is_ant_conn_abnor == 1"><img class="" src="../js/IntelligentRoadTestV5/images/fan.png"></span>
											</div>
										</div>
										<div class="colDiv">
											<span>扇区编号：</span>
											<span  v-if="item.cell_id == null">&nbsp;</span>
											<span  v-else v-cloak>{{ item.cell_id }}</span>
											<span class="paiSpan" v-if="item.alt_no != null && item.alt_no != ''"><img src="../js/IntelligentRoadTestV5/images/pai.png"></span>
										</div>
										<div class="colDiv cellName" v-on:click = "gotoShowSectorMessage(item,index)">
											<span>扇区名称：</span>
											<span  v-if="item.cell_name == null || item.cell_name == ''">&nbsp;</span>
											<span  v-else v-cloak>{{ item.cell_name }}</span>
										</div>
										<div class="colDiv">
											<div class="coordinate_angle">
												<span class="redSpan"></span>
												<span>台帐坐标：</span>
												<span v-if="item.location_gps == null ||item.location_gps == ''">空</span>
												<span v-else v-cloak> {{ parseFloat(item.location_gps.split(',')[0]).toFixed(6) }}</span>
											</div>
											<div class="coordinate_angle">
												<span v-if="item.location_gps == null ||item.location_gps == ''">空</span>
												<span v-else v-cloak>{{ parseFloat(item.location_gps.split(',')[1]).toFixed(6) }}</span>
											</div>
										</div>
										<div class="colDiv">
											<div class="coordinate_angle">
												<span class="greenSpan"></span>
												<span>预测坐标：</span>
												<span v-if="item.pred_location_gps == null ||item.pred_location_gps == ''">空</span>
												<span v-else v-cloak> {{ parseFloat(item.pred_location_gps.split(',')[0]).toFixed(6) }}</span>
											</div>
											<div class="coordinate_angle">
												<span v-if="item.pred_location_gps == null ||item.pred_location_gps == ''">空</span>
												<span v-else v-cloak>{{ parseFloat(item.pred_location_gps.split(',')[1]).toFixed(6) }}</span>
											</div>
										</div>
										<div class="colDiv" <%--style="display: none;"--%>>
											<div class="coordinate_angle">
												<span class="angleSpan1"></span>
												<span>台账角度：</span>
												<span v-if="item.ant_azimuth == null ">空</span>
												<span v-else v-cloak>{{ item.ant_azimuth }}°</span>
											</div>

											<div class="coordinate_angle">
												<span class="angleSpan2"></span>
												<span>预测角度：</span>
												<span v-if="item.pred_azimuth == null ">空</span>
												<span v-else v-cloak>{{ item.pred_azimuth }}°</span>
											</div>
										</div>
										<div class="colDiv">
											<div class="coordinate_angle">
												<span class="greySpan"></span>
												<span>偏离距离：</span>
												<span v-if="item.pred_distance == null ">空</span>
												<span v-else v-cloak>{{ item.pred_distance }}米</span>
											</div>
											<div class="coordinate_angle" <%--style="display: none;"--%>>
												<span class="angleSpan3"></span>
												<span>偏离角度：</span>
												<span v-if="item.pred_azimuth_diff == null">空</span>
												<span v-else v-cloak>{{ item.pred_azimuth_diff }}°</span>
											</div>
										</div>
									</li>
								</ul>
								<div class="pageWrap">
									<div class="page">
										<div class="page-pagination">
											<a href="javascript:;" class="first-active"  v-on:click = "goFirst"></a>
											<a href="javascript:;" class="prev-active" v-on:click="lastOrNext(0)" ></a>
										</div>
										<div >
											第<input class="page-num" type="text" id="macSectorPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
											<input  type="hidden">
										</div>
										<div class="page-pagination">
											<a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
											<a href="javascript:;" class="last-active" v-on:click="goLast"></a>
										</div>
										<div>
											<a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTestV5/images/111_11.png"></a>
										</div>
									</div>
									<div class="page-info" id="macSectorCountMessage" <%--style="display: none;"--%>>
										<%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
										共<span v-cloak>{{ totalCounts }}</span>条数据
									</div>
								</div>
							</div>
						</div>
					</div>
					<%--宏扇区坐标谌误结束--%>
					<%--告警开始--%>
					<div class="listDiv alarmList" id="showAlarmList" style="display: none;">
						<div class="listWrap">
							<div class="backList" id="alarmBackPoor"> &lt; </div>
							<div class="listDivWrap" id="showAlarmDiv">
								<ul class="listUL">
									<li v-for = "(item , index , key ) in alarmList" class="cursor"  v-on:click = "showMessage(item,index)">
										<div class="colDiv">
											<span class="numSpan" v-cloak>{{ index + 1  }}</span>
											<div class="bold" v-cloak>基站编号：{{ item.base_statn_id }}</div>
											<div class="positionRight">
												<div  v-cloak>厂家：{{ item.factory }}</div>
											</div>
										</div>
										<div class="colDiv" v-if="item.cell_id != null">
											<span>扇区编号：</span>
											<span  v-cloak>{{ item.cell_id }}</span>
										</div>
										<div class="colDiv" v-if="item.enodeb_name != null">
											<span>基站名称：</span>
											<span  v-cloak>{{ item.enodeb_name }}</span>
										</div>
										<div class="colDiv" v-if="item.cell_name != null">
											<span>扇区名称：</span>
											<span  v-cloak>{{ item.cell_name }}</span>
										</div>
										<%--<div class="colDiv">
											<span>退服告警数：</span>
											<span  v-cloak>{{ item.alarm_nums }}</span>
										</div>--%>
									</li>
								</ul>
								<div class="pageWrap">
									<div class="page">
										<div class="page-pagination">
											<a href="javascript:;" class="first-active"  v-on:click = "goFirst"></a>
											<a href="javascript:;" class="prev-active" v-on:click="lastOrNext(0)" ></a>
										</div>
										<div >
											第<input class="page-num" type="text" id="alarmPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
											<input  type="hidden">
										</div>
										<div class="page-pagination">
											<a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
											<a href="javascript:;" class="last-active" v-on:click="goLast"></a>
										</div>
										<div>
											<a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTestV5/images/111_11.png"></a>
										</div>
									</div>
									<div class="page-info" id="alarmCountMessage" <%--style="display: none;"--%>>
										<%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
										共<span v-cloak>{{ totalCounts }}</span>条数据
									</div>
								</div>
							</div>
						</div>
						<div class="detailList">
							<div class="backList" id="alarmCount"> &lt; </div>
							<div class="detailListDiv" id="showAlarmCompleteMessage">
								<div class="infoHeader">
									<div class="brDiv">
										<span v-cloak>基站编号：{{ alarmData.base_statn_id }}</span>
										<span class="fRight" v-cloak>扇区编号：{{ alarmData.cell_id }}</span>
									</div>
									<div class="brDiv">
										<span>基站名称：</span>
										<span  v-cloak>{{ alarmData.enodeb_name }}</span>
									</div>
									<div class="brDiv">
										<span v-cloak>扇区名称：{{ alarmData.cell_name }}</span>
									</div>
								</div>
								<ul class="infoBody">
									<li>
										<span v-cloak>厂家：{{ alarmData.factory }}</span>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_alarm.png">
												<span class="nameInfo">告警</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" v-for="(alarmData , index , key) in alarmCompleteData" style="display: none;">
											<li class="liWrap">
												<div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
													<div class="inline">
														<span class="nameInfo" v-cloak>{{ alarmData.day }}</span>
													</div>
													<div class="floatRight">
														<button class="btn-showInfo">
															<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
														</button>
													</div>
												</div>
												<ul class="ulDetailInfo">
													<li >
														<div class="colDiv">
															<span class="nameInfo">告警时间</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ alarmData.alarm_time }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">接收告警时间</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ alarmData.rectime }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">告警恢复时间</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ alarmData.clear_time }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">告警级别</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ alarmData.alarm_level }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">是否恢复</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-if="alarmData.isrecover == 'Y'">是</span>
															<span class="blueInfo" v-else>否</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">是否断站退服</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-if="alarmData.outofsrv == 1">是</span>
															<span class="blueInfo" v-else>否</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">告警范围</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ alarmData.alarm_scope }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">告警内容</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ alarmData.prob_cause }}</span>
														</div>
													</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<%--告警结束--%>
					<%--KPI开始--%>
					<div class="listDiv kpiList" id="showkpiList" style="display: none;">
						<div class="listWrap">
							<div class="backList" id="kpiBackPoor"> &lt; </div>
							<div class="listDivWrap" id="showKPIDiv">
								<ul class="listUL">
									<li v-for = "(item , index , key ) in kpiList" class="cursor"  v-on:click = "showMessage(item,index)">
										<div class="colDiv">
											<span class="numSpan" v-cloak>{{ index + 1  }}</span>
											<div class="bold" v-cloak>基站编号：{{ item.enodebid }}</div>
											<div class="positionRight">
												<div  v-cloak>厂家：{{ item.factory }}</div>
											</div>
										</div>
										<div class="colDiv" v-if="item.cellid != null">
											<span>扇区编号：</span>
											<span  v-cloak>{{ item.cellid }}</span>
										</div>
										<div class="colDiv" v-if="item.base_statn_name != null">
											<span>基站名称：</span>
											<span  v-cloak>{{ item.base_statn_name }}</span>
										</div>
										<div class="colDiv" v-if="item.cell_name != null">
											<span class="cellNameEllipsis" v-bind:title="item.cell_name" v-cloak>扇区名称：{{ item.cell_name }}</span>
										</div>
									</li>
								</ul>
								<div class="pageWrap">
									<div class="page">
										<div class="page-pagination">
											<a href="javascript:;" class="first-active"  v-on:click = "goFirst"></a>
											<a href="javascript:;" class="prev-active" v-on:click="lastOrNext(0)" ></a>
										</div>
										<div >
											第<input class="page-num" type="text" id="kpiPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
											<input  type="hidden">
										</div>
										<div class="page-pagination">
											<a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
											<a href="javascript:;" class="last-active" v-on:click="goLast"></a>
										</div>
										<div>
											<a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTestV5/images/111_11.png"></a>
										</div>
									</div>
									<div class="page-info" id="kpiCountMessage" <%--style="display: none;"--%>>
										<%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
										共<span v-cloak>{{ totalCounts }}</span>条数据
									</div>
								</div>
							</div>
						</div>
						<div class="detailList">
							<div class="backList" id="kpiCount"> &lt; </div>
							<div class="detailListDiv" id="showKPICompleteMessage">
								<div class="infoHeader">
									<div class="brDiv">
										<span v-cloak>基站编号：{{ kpiData.enodebid }}</span>
										<span class="fRight" v-cloak>扇区编号：{{ kpiData.cellid }}</span>
									</div>
									<div class="brDiv">
										<span>基站名称：</span>
										<span  v-cloak>{{ kpiData.base_statn_name }}</span>
									</div>
									<div class="brDiv">
										<span v-cloak>扇区名称：{{ kpiData.cell_name }}</span>
									</div>
								</div>
								<ul class="infoBody">
									<li>
										<span v-cloak>厂家：{{ kpiData.factory }}</span>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_index.png">
												<span class="nameInfo">指标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" v-for="(kpiData , index , key) in kpiCompleteData" style="display: none;">
											<li class="liWrap">
												<div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
													<div class="inline">
														<span class="nameInfo" v-cloak>{{ kpiData.day }}</span>
													</div>
													<div class="floatRight">
														<button class="btn-showInfo">
															<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
														</button>
													</div>
												</div>
												<ul class="ulDetailInfo">
													<li >
														<div class="colDiv">
															<span class="nameInfo">E-RAB建立成功率(%)</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.erab_succ_rate }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">E-RAB掉线率(%)</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.erab_drop_rate }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">RRC建立成功率(%)</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.rrccon_succrate }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">同频切换成功率(%)</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.swchsf_succ_rate }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">异频切换成功率(%)</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.swchaf_succ_rate }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">上行prb利用率(%)</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.up_prb_userate }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">下行prb利用率(%)</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.dw_prb_userate }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">最大rrc连接用户数</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.counter0003 }}</span>
														</div>
													</li>
													<li >
														<div class="colDiv">
															<span class="nameInfo">PDCP层流量(MB)</span>
														</div>
														<div class="colDiv">
															<span class="blueInfo" v-cloak>{{ kpiData.pdch_flow }}</span>
														</div>
														<div class="colDiv"></div>
													</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<%--KPI结束--%>
					<%--引入高速、高铁、市政路、地铁场景类目的文件--%>
					<jsp:include page="sense.jsp"/>
					<%--引入放有场景类目的文件--%>
					<jsp:include page="sense2.jsp"/>
					<%--框选保存开始--%>
					<div class="listDiv" id="showBoxSelectionList">
						<div class="backList" id="boxSelectionCount" style="display: none;">返回场景详情页</div>
						<div class="detailList" >
							<div class="detailListDiv" id="saveBoxSelection">
								<div class="infoHeader">
									<div class="brDiv">
										<span ><%--区域编号：--%></span>
										<span  class="fRight" id="saveCreate">创建者：</span>
									</div>
									<div class="brDiv">
										<span>区域类型：
											<input type="text" class="textIpt" id="saveConcernAreaType">
											<span class="must">必填</span>
										</span>
										<span class="fRight" id="saveCity"><%--地市：--%></span>
									</div>
									<div class="brDiv">
										<span>区域名称：</span>
										<input type="text" class="textIpt" id="saveConcernAreaName">
										<span class="must">必填</span>
									</div>
									<div class="auditSelect brDiv">
										<span class="nameInfo">区域归属：
											<select class="saveAs-Select" id="boxCitySelect">
												<option value="请选择">请选择</option>
											</select>
											<select class="saveAs-Select" id="boxCountrySelect">
												<option value="请选择">请选择</option>
											</select>
											<select class="saveAs-Select" id="boxMktcenterSelect">
												<option value="请选择">请选择</option>
											</select>
										</span>
									</div>

									<div class="auditSave brDiv">
										<span class="nameInfo">保存为：&nbsp;&nbsp;&nbsp;
											<select class="saveAs-Select" id="SystemLayerSelect">
												<option value="请选择">请选择</option>
												<option value="关注区域">关注区域</option>
												<option value="骨头区域">骨头区域</option>
											</select>
											<button class="btn-bg modal-sure" id="sureSaveAsSystemLayer">确定</button>
										</span>
									</div>
								</div>
								<ul class="infoBody">
									<li class="tipSpan">
										<img src="../js/IntelligentRoadTestV5/images/tipSpan.png" />
										<span>&nbsp;&nbsp;提示：创建当天只显示部分信息</span>
									</li>
									<li>
										<div>
											<img src="../js/IntelligentRoadTestV5/images/change7.png"/>
											<span class="nameInfo" >历史7天覆盖变化</span>
										</div>
									</li>
									<li id="saveSevenLineLi">
										<div id="saveLineChart" class="chartDiv"></div>
									</li>
									<li class="liWrap nrTop5Cell"  id="saveAreaTop" >
										<div class="nameBtn searchCellDiv" onclick="IntelligentRoadTest.showDetailInfo(event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">附近扇区</span>
											</div>
											<div class="floatRight">
												<button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,nrTop5Cell, centerPoints)" style="display: none;"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;" >
											<li class="cellInfoWrap" v-for="(data , index , key) in nrTop5Cell">
												<div class="cellName" v-on:click="gotoShowSectorMessage(data)" v-cloak>
													<span>扇区名称：</span>
													<span class="sectorNameEllipsis" v-bind:title="data.cell_name">{{ data.cell_name }}</span>
												</div>
												<div class="cellInfoDiv">
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站编号</span><span class="blueInfo" v-cloak>{{ data.base_statn_id }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">小区编号</span><span class="blueInfo" v-cloak>{{ data.cell_id }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(m)</span>
														<span class="blueInfo" v-cloak v-if="data.dis == null || data.dis == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ Math.ceil(data.dis) }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">MR数量</span>
														<span class="blueInfo" v-cloak v-if="data.counts == null || data.counts == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ data.counts }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li class="liWrap mrNrTop5Cell">
										<div class="nameBtn searchCellDiv" onclick="IntelligentRoadTest.showDetailInfo(event)">
											<div class="inline">
												<img class="cursor" src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">接入扇区</span>
											</div>
											<div class="floatRight">
												<button class="linkCell" title="显示连线" onclick="showLinkCell($event,concernAreaData,2)" style="display: none;"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;">
											<li class="cellInfoWrap" v-for="(data , index , key) in mrTop5Cell">
												<div class="cellName" onclick="gotoShowSectorMessage(data)" v-cloak>
													<span>扇区名称：</span>
													<span class="sectorNameEllipsis" v-bind:title="data.recent_cell_name">{{ data.recent_cell_name }}</span>
												</div>
												<div class="cellInfoDiv">
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站编号</span><span class="blueInfo" v-cloak>{{ data.enodebid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">小区编号</span><span class="blueInfo" v-cloak>{{ data.cellid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(m)</span>
														<span class="blueInfo" v-cloak v-if="data.distance == null || data.distance == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">MR数量</span>
														<span class="blueInfo" v-cloak v-if="data.counts == null || data.counts == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ data.counts }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li class="liWrap" id="4GZhiBiao">
										<div class="nameBtn" onclick="IntelligentRoadTest.showDetailInfo(event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_index.png">
												<span class="nameInfo">4G指标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo">
											<li class="colName">
												<div class="colDiv">类型</div>
												<div class="colDiv">值</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">覆盖率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" id="saveCover">{{ (concernAreaData.cover*100).toFixed(2) }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li  v-if="concernAreaData.rsrp != null">
												<div class="colDiv">
													<span class="nameInfo">RSRP均值</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" id="saveRSRP"></span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li  v-if="concernAreaData.rsrp != null">
												<div class="colDiv">
													<span class="nameInfo">弱栅格占比</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" id="savePoorGridCount"></span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<li class="liWrap" id="2GZhiBiao"><%--增加一个2G指标栏目--%>
										<div class="nameBtn" onclick="IntelligentRoadTest.showDetailInfo(event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_index.png">
												<span class="nameInfo">2G指标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo">
											<li class="colName">
												<div class="colDiv">类型</div>
												<div class="colDiv">值</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">EC/IO</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" id="ec_io"></span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">CDR记录数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" id="cdrCount"></span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
                                    <li class="liWrap  <%--noshow--%>">
                                        <div class="nameBtn"  onclick="IntelligentRoadTest.showDetailInfo(event)">
                                            <div class="inline">
                                                <img src="../js/IntelligentRoadTestV5/images/detail_kpiRate.png">
                                                <span class="nameInfo">感知速率</span>
                                            </div>
                                            <div class="floatRight">
                                                <button class="btn-showInfo">
                                                    <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                                </button>
                                            </div>
                                        </div>
                                        <ul class="ulDetailInfo" style="display: none;">
                                            <li class="colName">
                                                <div class="colDiv">类型</div>
                                                <div class="colDiv">值</div>
                                                <div class="colDiv"></div>
                                            </li>
                                            <li >
                                                <div class="colDiv fLeft">
                                                    <span class="nameInfo">KPI感知上行速率</span>
                                                </div>
                                                <div class="colDiv">
                                                    <span class="blueInfo" v-cloak v-if="concernAreaData.min_userex_upavgrate != null">{{ concernAreaData.min_userex_upavgrate }} Mbps</span>
                                                </div>
                                                <div class="colDiv"></div>
                                            </li>
                                            <li >
                                                <div class="colDiv">
                                                    <span class="nameInfo">KPI感知下行速率</span>
                                                </div>
                                                <div class="colDiv">
                                                    <span class="blueInfo" v-cloak v-if="concernAreaData.min_userex_dwavgrate != null">{{ concernAreaData.min_userex_dwavgrate }} Mbps</span>
                                                </div>
                                                <div class="colDiv"></div>
                                            </li>
                                        </ul>
                                    </li>
									<li class="liWrap">
										<div class="nameBtn" onclick="IntelligentRoadTest.showDetailInfo(event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_position.png">
												<span class="nameInfo">百度坐标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" style="display: none;">
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">中心点经度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo"id="saveCenterLon"></span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">中心点纬度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" id="saveCenterLat"></span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<%--<li>
										<div class="colDiv">
											<button class="btn-bg btn-saveConcernArea" id="baocunConcernArea">保存到关注区域</button>
										</div>
										<div class="colDiv">
											<button class="btn-bg btn-saveBoneArea" id="baocunBoneArea">保存到骨头区域</button>
										</div>
									</li>--%>
								</ul>
							</div>
						</div>
					</div>
					<%--框选保存结束--%>
					<%--栅格详细信息开始--%>
					<div class="listDiv" id="showGridList">
						<div class="detailList">
							<div class="backList" id="girdCount"> &lt; 返回</div>
							<div class="detailListDiv" id="showGridCompleteMessage">
								<div class="infoHeader">
									<div class="brDiv">
										<span v-cloak>栅格编号：{{ gridData.grid_id }}</span>
									</div>
									<div class="brDiv">
										<span v-cloak>地市：{{ gridData.city }}</span>
										<span class="fRight" v-cloak>区县：{{ gridData.country }}</span>
									</div>
								</div>
								<ul class="infoBody">
									<li>
										<div>
											<img src="../js/IntelligentRoadTestV5/images/change7.png"/>
											<span class="nameInfo" v-cloak>{{ title }}</span>
										</div>
									</li>
									<li id="gridSevenLineLi">
										<div id="gridLineChart" class="chartDiv"></div>
									</li>
									<li class="liWrap mrNrTop5Cell">
										<div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img class="cursor" src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">接入扇区</span>
											</div>
											<div class="floatRight">
												<button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,gridData,2)" style="display: none;"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;">
											<li class="cellInfoWrap" v-for="(data , index , key) in mrTop5Cell">
												<div class="cellName" v-on:click="gotoShowSectorMessage(data)" v-cloak>
													<span>扇区名称：</span>
													<span class="sectorNameEllipsis" v-bind:title="data.recent_cell_name">{{ data.recent_cell_name }}</span>
												</div>
												<div class="cellInfoDiv">
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站编号</span>
														<span class="blueInfo" v-if="data.enodebid == null || data.enodebid == ''">&nbsp;</span>
														<span class="blueInfo" v-else v-cloak>{{ data.enodebid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">小区编号</span>
														<span class="blueInfo" v-if="data.cellid == null || data.cellid == ''">&nbsp;</span>
														<span class="blueInfo" v-else v-cloak>{{ data.cellid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(M)</span><span class="blueInfo" v-cloak>&nbsp;{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">MR数量</span><span class="blueInfo" v-cloak>&nbsp;{{ data.counts }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>

									<%--邻区列表--%>
									<li class="liWrap nrTop5Cell" v-if="isShowNrCellList != false">
										<div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">邻区列表</span>
											</div>
											<div class="floatRight">
												<button class="linkCell" title="显示连线" v-on:click="showNRLinkCell($event,gridData,nrCellList,1)" style="display: none;"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;">
											<li class="cellInfoWrap" v-for="(data , index , key) in nrCellList">
												<div class="cellName" v-cloak v-on:click="gotoShowSectorMessage(data)">
													扇区名称：<span v-if="data.sector_name == null || data.sector_name == ''">--</span>
													<span class="sectorNameEllipsis" v-bind:title="data.sector_name" v-else>{{ data.sector_name }}</span>
												</div>
												<div class="cellInfoDiv" v-if="data.enodebid_cellid == null || data.enodebid_cellid == ''" v-on:mouseover="showErrorMessage(data.pin_pci)">
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站_扇区</span><span class="blueInfo" v-cloak>{{ data.enodebid_cellid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">频点_PCI</span><span class="blueInfo" v-cloak>{{ data.pin_pci }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(m)</span>
														<span class="blueInfo" v-cloak v-if="data.distance == null || data.distance == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">{{ anotherRateName }}数量</span>
														<span class="blueInfo" v-cloak >{{ data.zhuanti_mr_count }}</span>
													</div>
												</div>
												<div class="cellInfoDiv" v-else>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站_扇区</span><span class="blueInfo" v-cloak>{{ data.enodebid_cellid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">频点_PCI</span><span class="blueInfo" v-cloak>{{ data.pin_pci }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(m)</span>
														<span class="blueInfo" v-cloak v-if="data.distance == null || data.distance == ''">--</span>
														<span class="blueInfo" v-cloak v-else>{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">{{ anotherRateName }}数量</span>
														<span class="blueInfo" v-cloak >{{ data.zhuanti_mr_count }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_index.png">
												<span class="nameInfo">指标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo">
											<li class="colName">
												<div class="colDiv">类型</div>
												<div class="colDiv">值</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">覆盖率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ (gridData.cover_avg*100).toFixed(2) }}%</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li>
												<div class="colDiv">
													<span class="nameInfo">栅格MR条数</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ gridData.gridCount }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li>
												<div class="colDiv">
													<span class="nameInfo">RSRP均值</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-if="gridData.rsrp_avg == null || gridData.rsrp_avg == ''">&nbsp;</span>
													<span class="blueInfo" v-else v-cloak>{{ parseFloat(gridData.rsrp_avg).toFixed(2) }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
                                    <li class="liWrap  <%--noshow--%>">
                                        <div class="nameBtn" v-on:click="showDetailInfo($event)">
                                            <div class="inline">
                                                <img src="../js/IntelligentRoadTestV5/images/detail_kpiRate.png">
                                                <span class="nameInfo">感知速率</span>
                                            </div>
                                            <div class="floatRight">
                                                <button class="btn-showInfo">
                                                    <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                                </button>
                                            </div>
                                        </div>
                                        <ul class="ulDetailInfo" style="display: none;">
                                            <li class="colName">
                                                <div class="colDiv">类型</div>
                                                <div class="colDiv">值</div>
                                                <div class="colDiv"></div>
                                            </li>
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">KPI感知上行速率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="gridData.min_userex_upavgrate != null">{{ parseFloat(gridData.min_userex_upavgrate).toFixed(2) }} Mbps</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">KPI感知下行速率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="gridData.min_userex_dwavgrate != null">{{ parseFloat(gridData.min_userex_dwavgrate).toFixed(2) }} Mbps</span>
												</div>
												<div class="colDiv"></div>
											</li>
                                        </ul>
                                    </li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_position.png">
												<span class="nameInfo">百度坐标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" style="display: none;">
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">中心点经度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ gridData.longitude_mid }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">中心点纬度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ gridData.latitude_mid }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<%--栅格详细信息结束--%>
					<%--高速栅格详细信息开始--%>
					<div class="listDiv" id="showHighwayGridList">
						<div class="detailList">
							<div class="backList" id="highwayGridCount"> &lt; 返回</div>
							<div class="detailListDiv" id="showHighwayGridCompleteMessage">
								<div class="infoHeader">
									<div class="brDiv">
										<span v-cloak>路段编号：{{ line_id }}</span>
										<span class="fRight" v-cloak> 地市：{{ objData.city }}</span>
									</div>
									<div class="brDiv">
										<span v-cloak>{{ objData.road_name }}</span>
										<%--<span class="fRight" v-cloak>区县：{{ gridData.country }}</span>--%>
									</div>
								</div>
								<ul class="infoBody">
									<li>
										<div>
											<img src="../js/IntelligentRoadTestV5/images/change7.png"/>
											<span class="nameInfo" v-cloak>{{ title }}</span>
										</div>
									</li>
									<li id="HighwayGridSevenLineLi">
										<div id="highwayGridLineChart" class="chartDiv"></div>
									</li>
									<li class="liWrap mrNrTop5Cell">
										<div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img class="cursor" src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">接入扇区</span>
											</div>
											<div class="floatRight">
												<button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,objData,2)" style="display: none;"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;">
											<li class="cellInfoWrap" v-for="(data , index , key) in mrTop5Cell">
												<div class="cellName" v-on:click="gotoShowSectorMessage(data)" v-cloak>
													<span>扇区名称：</span>
													<span class="sectorNameEllipsis" v-bind:title="data.recent_cell_name">{{ data.recent_cell_name }}</span>
												</div>
												<div class="cellInfoDiv">
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站编号</span>
														<span class="blueInfo" v-if="data.enodebid == null || data.enodebid == ''">&nbsp;</span>
														<span class="blueInfo" v-else v-cloak>{{ data.enodebid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">小区编号</span>
														<span class="blueInfo" v-if="data.cellid == null || data.cellid == ''">&nbsp;</span>
														<span class="blueInfo" v-else v-cloak>{{ data.cellid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(M)</span><span class="blueInfo" v-cloak>&nbsp;{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">MR数量</span><span class="blueInfo" v-cloak>&nbsp;{{ data.counts }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_index.png">
												<span class="nameInfo">指标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo">
											<li class="colName">
												<div class="colDiv">类型</div>
												<div class="colDiv">值</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">覆盖率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.dx_line_rsrp_cov == null || objData.dx_line_rsrp_cov == ''"></span>
													<span class="blueInfo" v-cloak v-else>{{ (objData.dx_line_rsrp_cov*100).toFixed(2) }}%</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li>
												<div class="colDiv">
													<span class="nameInfo">RSRP均值</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-if="objData.dx_line_rsrp_avg == null || objData.dx_line_rsrp_avg == ''">&nbsp;</span>
													<span class="blueInfo" v-else v-cloak>{{ parseFloat(objData.dx_line_rsrp_avg).toFixed(2) }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<li class="liWrap  <%--noshow--%>">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_kpiRate.png">
												<span class="nameInfo">感知速率</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" style="display: none;">
											<li class="colName">
												<div class="colDiv">类型</div>
												<div class="colDiv">值</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">KPI感知上行速率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.min_userex_upavgrate != null">{{ objData.min_userex_upavgrate }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">KPI感知下行速率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.min_userex_dwavgrate != null">{{ objData.min_userex_dwavgrate }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_position.png">
												<span class="nameInfo">GPS坐标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" style="display: none;">
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">中心点经度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.longitude_mid == null || objData.longitude_mid == ''"></span>
													<span class="blueInfo" v-cloak v-else>{{ parseFloat(objData.longitude_mid).toFixed(6) }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">中心点纬度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.latitude_mid == null || objData.latitude_mid == ''"></span>
													<span class="blueInfo" v-cloak v-else>{{ parseFloat(objData.latitude_mid).toFixed(6) }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<%--高速栅格详细信息结束--%>
					<%--高铁栅格详细信息开始--%>
					<div class="listDiv" id="showRailGridList">
						<div class="detailList">
							<div class="backList" id="railGridCount"> &lt; 返回</div>
							<div class="detailListDiv" id="showRailGridCompleteMessage">
								<div class="infoHeader">
									<div class="brDiv">
										<span v-cloak>路段编号：{{ line_id }}</span>
										<span class="fRight" v-cloak>地市：{{ objData.city }}</span>
									</div>
									<div class="brDiv">
										<span v-cloak>{{ objData.road_name }}</span>
										<%--<span class="fRight" v-cloak>区县：{{ gridData.country }}</span>--%>
									</div>
								</div>
								<ul class="infoBody">
									<li>
										<div>
											<img src="../js/IntelligentRoadTestV5/images/change7.png"/>
											<span class="nameInfo" v-cloak>{{ title }}</span>
										</div>
									</li>
									<li id="railGridSevenLineLi">
										<div id="railGridLineChart" class="chartDiv"></div>
									</li>
									<li class="liWrap mrNrTop5Cell">
										<div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img class="cursor" src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">接入扇区</span>
											</div>
											<div class="floatRight">
												<button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,objData,2)" style="display: none;"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;">
											<li class="cellInfoWrap" v-for="(data , index , key) in mrTop5Cell">
												<div class="cellName" v-on:click="gotoShowSectorMessage(data)" v-cloak>
													<span>扇区名称：</span>
													<span class="sectorNameEllipsis" v-bind:title="data.recent_cell_name">{{ data.recent_cell_name }}</span>
												</div>
												<div class="cellInfoDiv">
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站编号</span>
														<span class="blueInfo" v-if="data.enodebid == null || data.enodebid == ''">&nbsp;</span>
														<span class="blueInfo" v-else v-cloak>{{ data.enodebid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">小区编号</span>
														<span class="blueInfo" v-if="data.cellid == null || data.cellid == ''">&nbsp;</span>
														<span class="blueInfo" v-else v-cloak>{{ data.cellid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(M)</span><span class="blueInfo" v-cloak>&nbsp;{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">MR数量</span><span class="blueInfo" v-cloak>&nbsp;{{ data.counts }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_index.png">
												<span class="nameInfo">指标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo">
											<li class="colName">
												<div class="colDiv">类型</div>
												<div class="colDiv">值</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">覆盖率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ (objData.dx_line_rsrp_cov*100).toFixed(2) }}%</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li>
												<div class="colDiv">
													<span class="nameInfo">RSRP均值</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-if="objData.dx_line_rsrp_avg == null || objData.dx_line_rsrp_avg == ''">&nbsp;</span>
													<span class="blueInfo" v-else v-cloak>{{ objData.dx_line_rsrp_avg }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<li class="liWrap  <%--noshow--%>">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_kpiRate.png">
												<span class="nameInfo">感知速率</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" style="display: none;">
											<li class="colName">
												<div class="colDiv">类型</div>
												<div class="colDiv">值</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">KPI感知上行速率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.min_userex_upavgrate != null">{{ objData.min_userex_upavgrate }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">KPI感知下行速率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.min_userex_dwavgrate != null">{{ objData.min_userex_dwavgrate }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_position.png">
												<span class="nameInfo">百度坐标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" style="display: none;">
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">中心点经度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.longitude_mid == null || objData.longitude_mid == ''"></span>
													<span class="blueInfo" v-cloak v-else>{{ parseFloat(objData.longitude_mid).toFixed(6) }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">中心点纬度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.latitude_mid == null || objData.latitude_mid == ''"></span>
													<span class="blueInfo" v-cloak v-else>{{ parseFloat(objData.latitude_mid).toFixed(6) }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_position.png">
												<span class="nameInfo">GPS坐标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" style="display: none;">
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">中心点经度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.longitude_mid == null || objData.longitude_mid == ''"></span>
													<span class="blueInfo" v-cloak v-else>{{ objData.longitude_mid_gps }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">中心点纬度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.latitude_mid == null || objData.latitude_mid == ''"></span>
													<span class="blueInfo" v-cloak v-else>{{ objData.latitude_mid_gps }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<%--高铁栅格详细信息结束--%>
					<%--市政路栅格详细信息开始--%>
					<div class="listDiv" id="showCityRoadGridList">
						<div class="detailList">
							<div class="backList" id="cityRoadGridCount"> &lt; 返回</div>
							<div class="detailListDiv" id="showCityRoadGridCompleteMessage">
								<div class="infoHeader">
									<div class="brDiv">
										<span v-cloak>路段编号：{{ line_id }}</span>
										<span class="fRight" v-cloak>地市：{{ objData.city }}</span>
									</div>
									<div class="brDiv">
										<span v-cloak>{{ objData.road_name }}</span>
										<%--<span class="fRight" v-cloak>区县：{{ gridData.country }}</span>--%>
									</div>
								</div>
								<ul class="infoBody">
									<li>
										<div>
											<img src="../js/IntelligentRoadTestV5/images/change7.png"/>
											<span class="nameInfo" v-cloak>{{ title }}</span>
										</div>
									</li>
									<li id="cityRoadGridSevenLineLi">
										<div id="cityRoadGridLineChart" class="chartDiv"></div>
									</li>
									<li class="liWrap mrNrTop5Cell">
										<div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img class="cursor" src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">接入扇区</span>
											</div>
											<div class="floatRight">
												<button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,objData,2)" style="display: none;"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;">
											<li class="cellInfoWrap" v-for="(data , index , key) in mrTop5Cell">
												<div class="cellName" v-on:click="gotoShowSectorMessage(data)" v-cloak>
													<span>扇区名称：</span>
													<span class="sectorNameEllipsis" v-bind:title="data.recent_cell_name">{{ data.recent_cell_name }}</span>
												</div>
												<div class="cellInfoDiv">
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站编号</span>
														<span class="blueInfo" v-if="data.enodebid == null || data.enodebid == ''">&nbsp;</span>
														<span class="blueInfo" v-else v-cloak>{{ data.enodebid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">小区编号</span>
														<span class="blueInfo" v-if="data.cellid == null || data.cellid == ''">&nbsp;</span>
														<span class="blueInfo" v-else v-cloak>{{ data.cellid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(M)</span><span class="blueInfo" v-cloak>&nbsp;{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">MR数量</span><span class="blueInfo" v-cloak>&nbsp;{{ data.counts }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_index.png">
												<span class="nameInfo">指标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo">
											<li class="colName">
												<div class="colDiv">类型</div>
												<div class="colDiv">值</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">覆盖率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak>{{ (objData.dx_line_rsrp_cov*100).toFixed(2) }}%</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li>
												<div class="colDiv">
													<span class="nameInfo">RSRP均值</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-if="objData.dx_line_rsrp_avg == null || objData.dx_line_rsrp_avg == ''">&nbsp;</span>
													<span class="blueInfo" v-else v-cloak>{{ objData.dx_line_rsrp_avg }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<li class="liWrap  <%--noshow--%>">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_kpiRate.png">
												<span class="nameInfo">感知速率</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" style="display: none;">
											<li class="colName">
												<div class="colDiv">类型</div>
												<div class="colDiv">值</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">KPI感知上行速率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.min_userex_upavgrate != null">{{ objData.min_userex_upavgrate }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">KPI感知下行速率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.min_userex_dwavgrate != null">{{ objData.min_userex_dwavgrate }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_position.png">
												<span class="nameInfo">GPS坐标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" style="display: none;">
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">中心点经度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.longitude_mid == null || objData.longitude_mid == ''"></span>
													<span class="blueInfo" v-cloak v-else>{{ parseFloat(objData.longitude_mid).toFixed(6) }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">中心点纬度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.latitude_mid == null || objData.latitude_mid == ''"></span>
													<span class="blueInfo" v-cloak v-else>{{ parseFloat(objData.latitude_mid).toFixed(6) }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<%--市政路栅格详细信息结束--%>
					<%--地铁78米路段详细信息开始--%>
					<div class="listDiv" id="showMetro78LineList">
						<div class="detailList">
							<div class="backList" id="metro78LineCount"> &lt; 返回</div>
							<div class="detailListDiv" id="showMetro78LineCompleteMessage">
								<div class="infoHeader">
									<div class="brDiv">
										<span v-cloak>路段编号：{{ objData.section_id }}</span>
										<span class="fRight" v-cloak>{{ objData.line_name }} &nbsp;&nbsp;{{ objData.direction }}</span>
									</div>
                                    <div class="brDiv">
                                        <span v-cloak>起始站点：{{ objData.from_station_name }}</span>
                                        <span class="fRight" v-cloak>结束站点：{{ objData.to_station_name }}</span>
                                    </div>
								</div>
								<ul class="infoBody">
									<li>
										<div>
											<img src="../js/IntelligentRoadTestV5/images/change7.png"/>
											<span class="nameInfo" v-cloak>{{ title }}</span>
										</div>
									</li>
									<li id="metro78LineSevenLineLi">
										<div id="metro78LineChart" class="chartDiv"></div>
									</li>
									<li class="liWrap mrNrTop5Cell">
										<div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img class="cursor" src="../js/IntelligentRoadTestV5/images/searchCell.png">
												<span class="nameInfo">接入扇区</span>
											</div>
											<div class="floatRight">
												<button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,objData,2)" style="display: none;"></button>
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo searchRecentCell" style="display: none;">
											<li class="cellInfoWrap" v-for="(data , index , key) in mrTop5Cell">
												<div class="cellName" v-on:click="gotoShowSectorMessage(data)" v-cloak>
													<span>扇区名称：</span>
													<span class="sectorNameEllipsis" v-bind:title="data.recent_cell_name">{{ data.recent_cell_name }}</span>
												</div>
												<div class="cellInfoDiv">
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">基站编号</span>
														<span class="blueInfo" v-if="data.enodebid == null || data.enodebid == ''">&nbsp;</span>
														<span class="blueInfo" v-else v-cloak>{{ data.enodebid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">小区编号</span>
														<span class="blueInfo" v-if="data.cellid == null || data.cellid == ''">&nbsp;</span>
														<span class="blueInfo" v-else v-cloak>{{ data.cellid }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">距离(M)</span><span class="blueInfo" v-cloak>&nbsp;{{ data.distance }}</span>
													</div>
													<div class="colDiv">
														<span class="nameInfo" v-if="index == 0">MR数量</span><span class="blueInfo" v-cloak>&nbsp;{{ data.counts }}</span>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_index.png">
												<span class="nameInfo">指标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo">
											<li class="colName">
												<div class="colDiv">类型</div>
												<div class="colDiv">值</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">覆盖率</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.cover_rate == null || objData.cover_rate == ''"></span>
													<span class="blueInfo" v-cloak>{{ objData.cover_rate }}%</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li>
												<div class="colDiv">
													<span class="nameInfo">RSRP均值</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-if="objData.rsrp_avg == null || objData.rsrp_avg == ''">&nbsp;</span>
													<span class="blueInfo" v-else v-cloak>{{ objData.rsrp_avg }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
                                    <li class="liWrap  <%--noshow--%>">
                                        <div class="nameBtn" v-on:click="showDetailInfo($event)">
                                            <div class="inline">
                                                <img src="../js/IntelligentRoadTestV5/images/detail_kpiRate.png">
                                                <span class="nameInfo">感知速率</span>
                                            </div>
                                            <div class="floatRight">
                                                <button class="btn-showInfo">
                                                    <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                                </button>
                                            </div>
                                        </div>
                                        <ul class="ulDetailInfo" style="display: none;">
                                            <li class="colName">
                                                <div class="colDiv">类型</div>
                                                <div class="colDiv">值</div>
                                                <div class="colDiv"></div>
                                            </li>
                                            <li >
                                                <div class="colDiv fLeft">
                                                    <span class="nameInfo">KPI感知上行速率</span>
                                                </div>
                                                <div class="colDiv">
                                                    <span class="blueInfo" v-cloak v-if="objData.min_userex_upavgrate != null">{{ objData.min_userex_upavgrate }}</span>
                                                </div>
                                                <div class="colDiv"></div>
                                            </li>
                                            <li >
                                                <div class="colDiv">
                                                    <span class="nameInfo">KPI感知下行速率</span>
                                                </div>
                                                <div class="colDiv">
                                                    <span class="blueInfo" v-cloak v-if="objData.min_userex_dwavgrate != null">{{ objData.min_userex_dwavgrate }}</span>
                                                </div>
                                                <div class="colDiv"></div>
                                            </li>
                                        </ul>
                                    </li>
									<li class="liWrap">
										<div class="nameBtn" v-on:click="showDetailInfo($event)">
											<div class="inline">
												<img src="../js/IntelligentRoadTestV5/images/detail_position.png">
												<span class="nameInfo">百度坐标</span>
											</div>
											<div class="floatRight">
												<button class="btn-showInfo">
													<img src="../js/IntelligentRoadTestV5/images/showTop5.png">
												</button>
											</div>
										</div>
										<ul class="ulDetailInfo" style="display: none;">
											<li >
												<div class="colDiv fLeft">
													<span class="nameInfo">中心点经度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.longitude_mid != null && objData.longitude_mid != ''">{{ parseFloat(objData.longitude_mid).toFixed(6) }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
											<li >
												<div class="colDiv">
													<span class="nameInfo">中心点纬度</span>
												</div>
												<div class="colDiv">
													<span class="blueInfo" v-cloak v-if="objData.latitude_mid != null && objData.latitude_mid != ''">{{ parseFloat(objData.latitude_mid).toFixed(6) }}</span>
												</div>
												<div class="colDiv"></div>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<%--地铁78米路段详细信息结束--%>

					<!-- 保存成功--start -->
					<div class="modal saveModal" style="display: none;">
						<div class="modal-body">
							<div class="submitText">保存成功</div>
						</div>
					</div>
					<!-- 确认撤销--start -->
					<div class="alertModal" id="revokeModal" style="display: none;">
						<div class="alertModal-body">
							<table>
								<tr>
									<td colspan="2">确认撤销</td>
								</tr>
								<tr>
									<td>
										<button type="button" class="btn-bg modal-sure" id="sureRevokeShare">确定</button>
									</td>
									<td>
										<button type="button" class="btn-bg modal-cancel">取消</button>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>

			<%--游标图例--%>
			<div class="colorWrap covGridLegend" style="display: none;">
				<div class="colorLegend">
					<div class="map-w legendTitle">
						<div class="boxSelectionImg">
							<span class="colorBarText">AGPS-MR 覆盖质量（dBm）</span>
							<span class="triangle"></span>
						</div>
						<ul class="boxSelectionUl gridBoxSelectionUl">
							<li data-gridconditions="0|主接入场强|1|week|1" data-gridIndex="1">AGPS-MR 上行速率（Mbps）</li>
							<li data-gridconditions="0|主接入场强|1|week|2" data-gridIndex="2">AGPS-MR 下行速率（Mbps）</li>
							<li class="active" data-gridconditions="0|主接入场强|1|week|0" data-gridIndex="0">AGPS-MR 覆盖质量（dBm）</li>
							<li class="hideCovCover" data-gridconditions="0|主接入场强|1|week|3" data-gridIndex="3">AGPS-MR MOD3干扰（%）</li>
							<li class="hideCovCover" data-gridconditions="0|主接入场强|1|week|4" data-gridIndex="4">AGPS-MR 越区覆盖（%）</li>
							<li class="hideCovCover" data-gridconditions="0|主接入场强|1|week|5" data-gridIndex="5">AGPS-MR 重叠覆盖（%）</li>
							<li data-gridconditions="0|主接入场强|0|week|0" data-gridIndex="0">全量MR综合 覆盖质量（dBm）</li>

						</ul>
						<ul class="boxSelectionUl lineBoxSelectionUl">
							<li data-gridIndex="1">上行速率（Mbps）</li>
							<li data-gridIndex="2">下行速率（Mbps）</li>
							<li class="active" data-gridIndex="0">覆盖质量（dBm）</li>
						</ul>
					</div>

					<div class="slideSpace slideLeft">
						<span class="slideOrange"><img src="../js/IntelligentRoadTestV5/images/slideOrange.png"/></span>
						<img src="../js/IntelligentRoadTestV5/images/slideSpace.png" class="slideSpaceImg" />
					</div>

					<div class="slideLegend">
						<div class="scaleWrap" style="display: none;">
							<div class="scale-text">AGPS-MR 覆盖质量（dBm）</div>
							<div id="scale-slider" class="scaleDiv"></div>
							<div class="scale-btn">
								<input type="number" class="numberInput" min="1" max="100" step="1"/>
								<button type="button" class="closeScale">√</button>
								<button type="button" class="closeScale">×</button>
								<button type="button" class="reset">恢复默认</button>
							</div>
						</div>
						<ul class="colorLegendUl">
							<li class="map-w-i level_1 sliderLi" id="level_1" style="background-color: rgb(0, 153, 0);">
								<span id="youText">优</span>
							</li>
							<li class="map-w-i level_2 sliderLi" id="level_2" style="background-color: rgb(0, 176, 240);">
								<span id="liangText">良</span>
							</li>
							<li class="map-w-i level_3 sliderLi" id="level_3" style="background-color: rgb(0, 112, 192);">
								<span id="zhongText">中</span>
							</li>
							<li class="map-w-i level_4 sliderLi" id="level_4" style="background-color: rgb(255, 192, 0);">
								<span id="chaText">差</span>
							</li>
							<li class="map-w-i level_5 sliderLi" id="level_5" style="background-color: rgb(192, 0, 0);">
								<span id="jichaText">极差</span>
							</li>
						</ul>
						<div class="slideWrap">
							<div class="slideDiv" style="left: 5%;">
								<span class="slideOrange"><img src="../js/IntelligentRoadTestV5/images/slideOrange.png"/></span>
								<span class="slideValue">-85</span>
								<img src="../js/IntelligentRoadTestV5/images/slideImg.png" class="slideImg" />
							</div>
							<div class="slideDiv" style="left: 15%;">
								<span class="slideOrange"><img src="../js/IntelligentRoadTestV5/images/slideOrange.png"/></span>
								<span class="slideValue">-95</span>
								<img src="../js/IntelligentRoadTestV5/images/slideImg.png" class="slideImg" />
							</div>
							<div class="slideDiv" style="left: 25%;">
								<span class="slideOrange"><img src="../js/IntelligentRoadTestV5/images/slideOrange.png"/></span>
								<span class="slideValue">-105</span>
								<img src="../js/IntelligentRoadTestV5/images/slideImg.png" class="slideImg" />
							</div>
							<div class="slideDiv" style="left: 35%;">
								<span class="slideOrange"><img src="../js/IntelligentRoadTestV5/images/slideOrange.png"/></span>
								<span class="slideValue">-115</span>
								<img src="../js/IntelligentRoadTestV5/images/slideImg.png" class="slideImg" />
							</div>
						</div>
					</div>

					<div class="slideSpace slideRight">
						<span class="slideOrange"><img src="../js/IntelligentRoadTestV5/images/slideOrange.png"/></span>
						<img src="../js/IntelligentRoadTestV5/images/slideSpace.png" class="slideSpaceImg" />
					</div>

					<div class="level_6 map-w-i" id="level_6">
						<div class="boxSelectionImg recordDiv">
							<input type="checkbox" id="showRecordCheckbox" name="showRecordCheckbox" >
							<span class="recordText">记录数≤</span>
							<span class="recordNum">3</span>
							<span class="triangle"></span>
							<ul class="boxSelectionUl">
								<li class="active">3</li>
								<li>10</li>
								<li>100</li>
								<li class="customLi">
									<input type="number" min="1" class="recordInput" placeholder="自定义"
										   onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
										   onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
									<button type="button" class="btn recordBtn">OK</button>
								</li>
							</ul>
						</div>
					</div>
					<div class="level_7 map-w-i fallNet" id="level_7" style="background-color: rgb(0, 0, 0);">
						<span id="tuowang">脱网</span>
					</div>
				</div>
			</div>
			<%--游标图例--%>

			<div class="colorBar-info" onselectstart="return false" style="display: none;">
				<div class="toolMenu">
					<img src="../js/IntelligentRoadTestV5/images/collapse.png" class="">
				</div>
				<div class="colorWrap">
					<ul id="colorLegenUC" class="colorBar colorLegenBihuan">
						<li class="map-w colorText">抱怨热点状态</li>
						<li class="map-w-i level_1" id="level_1">已闭环</li>
						<li class="map-w-i level_2" id="level_2">未闭环持续3周以内（<3）</li>
						<li class="map-w-i level_3" id="level_3">未闭环持续3周以上（≥3）</li>
					</ul>
					
				</div>
			</div>
		</div>
		<div class="modal saveAreaModal" id="saveConcernArea" style="display: none;">
			<div class="modal-body">
				<div class="colseImg"><img src="../js/IntelligentRoadTestV5/images/iconClose.png"></div>
				<table>
					<tr>
						<td>创建者：</td>
						<td id="userName"></td>
					</tr>
					<tr>
						<td>区域名称：</td>
						<td><input type="text" id="concernAreaName" value="" placeholder="请输入区域名称" /></td>
					</tr>
					<tr>
						<td>区域类型：</td>
						<td><input type="text" id="concernAreaType" value="" placeholder="请输入区域类型" /></td>
					</tr>
					<tr>
						<td>同时保存到骨头区域：</td>
						<td><input type="checkbox" id="isSaveToBoneArea"/></td>
					</tr>
					<tr>
						<td colspan="2" class="btnTD"><button type="button" class="btn-bg btn-save" id="ConcernAreaSaveButton">保存</button></td>
					</tr>
				</table>
			</div>
		</div>
		<!-- 正在加载数据弹框--start -->
		<div class="progressBox" id = "layerSubmitProgressDiv">
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
		<!-- GPS经纬度提示弹框--start -->
		<div class="modal gpsModal" style="display: none;">
			<div class="modal-body">
				<button type="button" class="closeProgress">
					<img src="../images/closeChart.png" style="width: 20px;"/>
				</button>
				<div class="GPStip">
					<div>提示：系统图层各个图层可以拖拽排序。</div>
					<div class="ckbTip">
						<input type="checkbox" id="ckbTip"><label for="ckbTip">不再提示</label>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn-bg btn-cancel" id="gpsModal-cancel">取消</button>
					<button type="button" class="btn-bg btn-save" id="gpsModal-save">确定</button>
				</div>
			</div>
		</div>
		<!-- GPS经纬度提示弹框--end -->
		<!-- 审核通过--start -->
		<div class="modal auditModal" id="pass" style="display: none;">
			<div class="modal-body">
				<div class="modal-title">
					<span>审核内容</span>
					<button class="closeBtn">
						<img src="../js/IntelligentRoadTest/images/closeModal.png"/>
					</button>
				</div>
				<div class="modal-content">
					<div class="suggest">请输入申请审核的原因：</div>
					<textarea id="passText" class="suggestText" placeholder="请输入..."></textarea>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn-bg btn-sure" id="passSubmit">确定</button>
				</div>
			</div>
		</div>
		<!-- 已提交申请，待管理员审核--start -->
		<div class="modal submitModal" style="display: none;" id="tipInfoDiv">
			<div class="modal-body">
				<div class="submitText" id ="tipMessage">已提交申请，待管理员审核！</div>
			</div>
		</div>
		<!-- 共享弹框--start -->
		<div class="modal shareModal" id="share" style="display: none;">
			<div class="modal-body">
				<div class="modal-title">
					<span>共享</span>
					<button class="closeBtn">
						<img src="../js/IntelligentRoadTest/images/closeModal.png"/>
					</button>
				</div>
				<div class="modal-content ztree" id="cityZtree">
				</div>
				<div class="modal-footer">
					<button type="button" class="btn-bg btn-sure" id="sureShare">确定</button>
				</div>
			</div>
		</div>
		<!-- 图层提示动画--start -->
		<div class="layerGif">
			<div class="layerGifDiv">
				<img class="gifImg" src="../js/IntelligentRoadTestV5/images/layer2.gif" />
				<div class="know" style="display: none;">
					<div>系统图层各个图层可以拖拽排序</div>
					<img class="btn-know" src="../js/IntelligentRoadTestV5/images/know.png" />
				</div>
			</div>
		</div>
		<!-- 框选提示框--start -->
		<div class="modal boxSelectionModal" style="display: none;">
			<div class="boxSelection-body">
				<div>系统图层各个图层可以拖拽排序</div>
				<img class="btn-knowBoxSelection" src="../js/IntelligentRoadTestV5/images/know.png" />
			</div>
		</div>
	</div>
</div>

<script  src="../js/jquery-1.12.3.js"></script>
<script  src="../js/jquery-ui.js"></script>
<%--<script src="http://api.map.baidu.com/api?v=3.0&ak=9GHKUjkZOzsijtyX179MLRz2lGnfFfHA"></script>--%>
<script  src="../js/noceUtil2.js"></script>
<script  src="../js/noceAjax.js"></script>
<script  src="../js/util/BMapUtil.js"></script>
<script src="../js/IntelligentRoadTestV5/moment.min.js"  ></script>
<script src="../js/IntelligentRoadTestV5/jquery.daterangepicker.js" ></script>
<script src="../js/util/vue.js" ></script>
<script src="../js/IntelligentRoadTestV5/colorPick.js" ></script>

<%--初始化地图js--%>
<script src="../js/crossfilter/crossfilter.js"></script>
<script src="../js/util/baidumap_offline_v3.js"></script>
<script src="../js/IntelligentRoadTestV5/myBMapTypeControl.js"></script>
<script src="../js/IntelligentRoadTestV5/initMap.js"></script>

<script src="../js/util/BMapUtil-Measure.js"></script><!-- 待确认是否更新 -->
<script src="../js/util/osmMapUtil-Measure.js"></script><!-- 待确认是否更新 -->
<script src="../js/util/DrawingManager.js"></script><!-- 待确认是否更新 -->
<script src="../js/util/BMapUtil-Conversion.js"></script><!-- 待确认是否更新 -->
<script src="../js/util/GPSUtil.js"></script><!-- 待确认是否更新 -->
<script src="../js/util/GridHelperForUserComplain.js"></script><!-- 待确认是否更新 -->



<script src="../js/IntelligentRoadTestV5/jquery-ui-slider-pips.js"></script>
<script src="../js/IntelligentRoadTestV5/fastclick.js"></script>
<script src="../js/util/uploadData.js"></script><!-- 请求中将写入日志的调用注释掉了 -->
<script src="../js/util/pingying.js"></script>
<script type="text/javascript" src="../js/util/exportExcel.js" ></script>
<!-- 增加progressbarTwo的查询数据同步方法 -->
<script src="../js/progressbarTwo.js"></script>
<!-- <script type="text/javascript" src="../js/perception/cityJson.js" async="true"></script>
<script type="text/javascript" src="../js/util/areaUtil.js?2017031401" async="true"></script> -->
<script src="../js/util/GridMapControl.js"></script>
<script src="../js/util/GridHelper.js"></script>
<!-- <script type="text/javascript" src="../js/util/baidumap_offline_v2_20160921.js"></script> -->
<%--<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=ZUONbpqGBsYGXNIYHicvbAbM"></script>--%>

<!-- 增加osm地图相关插件 -->
<script src="../js/util/BMapUtil-new.js" defer></script>
<script src="../js/util/OSMapUtil.js" defer></script>
<script src="../js/leaflet/leaflet.js" defer></script>
<script src="../js/util/commonOsmUrl.js" defer></script>
<script src="../js/util/wellknown.js"></script>
<script src="../js/util/SectorUtilForOsm.js" defer></script>
<script src="../js/util/OsmUtil-Conversion.js"></script>

<script src="../js/echarts/echarts.min.js" charset="utf-8" defer></script>
<!-- <script type="text/javascript" src="../js/tableTools/tableToolsNewTwo.js" async="true"></script> -->
<script src="../js/util/callBackChangeData.js?2017060611" defer></script>

<%--<script type="text/javascript" src="../js/baiduUtil/mapv.js"></script>--%>
<script src="../js/util/GeoUtils.js" ></script>
<script src="../js/util/SectorUtilForBaidu.js" defer></script>
<script src="../js/util/polyLineDivide.js" defer></script>
<script src="../js/util/GAO.js" async="true"></script>
<script src="../js/util/bdMapUtil/MarkerCluster.js" async="true"></script>
<script src="../js/util/bdMapUtil/TextIconOverlay.js" async="true"></script>
<%--<script type="text/javascript" src="../js/util/PolylineToProfile.js" defer></script>
<script type="text/javascript" src="../js/util/LineUtilForBaidu.js" defer></script>--%>


<script src="../js/IntelligentRoadTestV5/MyOSMMapTypeControl.js" defer></script>
<script src="../js/IntelligentRoadTestV5/ShareObject.js" async="true"></script>
<script src="../js/IntelligentRoadTestV5/concernAreaShare.js" defer></script>
<script type="module" src="../js/IntelligentRoadTestV5/OSMLineChangeToBaidu.js?20180313"></script>
<script type="module" src="../js/IntelligentRoadTestV5/MetroLine.js?20180313"></script>
<script src="../js/IntelligentRoadTestV5/senseList/senseList.js" defer></script>
<script src="../js/IntelligentRoadTestV5/alarmSupervise/alarmSupervise.js?20180313" defer></script>
<script src="../js/IntelligentRoadTestV5/UserComplain/UserComplain.js" defer></script>
<script src="../js/IntelligentRoadTestV5/IntelligentGoToPage.js" defer></script>
<script src="../js/IntelligentRoadTestV5/IntelligentRoadTestAnalysisV5.js?20180313" defer></script>
<script src="../js/IntelligentRoadTestV5/IntelligentRoadTestSystemLayerV3.js?20180313" defer></script>
<script src="../js/IntelligentRoadTestV5/IntelligentRoadTestGridLegend.js?20181119" defer></script>
<script src="../js/IntelligentRoadTestV5/systemLayerEdit/IntelligentRoadTest_systemLayerEdit.js" defer></script>
<script src="../js/IntelligentRoadTestV5/screenCompared/IntelligentRoadTest_ScreenCompared.js" defer></script>
<script src="../js/IntelligentRoadTestV5/NrCoverCheckbox.js" defer></script>
<script src="../js/IntelligentRoadTestV5/polygonToLayer/polygonToLayer.js" defer></script>
<script src="../js/jquery.ztree.all-3.5.min.js" defer></script>
<script src="../js/AuditList/ztreeUtil.js" defer></script>
