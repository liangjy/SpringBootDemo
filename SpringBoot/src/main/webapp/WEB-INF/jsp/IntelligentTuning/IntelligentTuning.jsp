<%@ page language="java" contentType="text/html; charset=utf-8"
		 pageEncoding="utf-8"%>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="../css/jquery-ui.css">
<link rel="stylesheet" href="../css/leanModal.css">
<link rel="stylesheet" href="../css/mian.css">
<link rel="stylesheet" type="text/css" href="../css/home/common.min.css" />
<link rel="stylesheet" type="text/css" href="../css/zTreeStyle.css" />

<link rel="stylesheet" type="text/css" href="../css/daterangepicker.css" />
<link rel="stylesheet" type="text/css" href="../css/style.css" />
<link rel="stylesheet" type="text/css" href="../js/tableTools/tableToolsNewTwo.css?20170922"/>
<link rel="stylesheet" type="text/css" href="../js/IntelligentTuning/IntelligentTuning.css" />

<input type="hidden" id="version" value="2.0">
<input type="hidden" id="currentPerId" value="486">
<input value="" id="currentTabIndex" type="hidden">
<input type="hidden" id="cityPermission_common" value="全省">
<input type="hidden" id="district_common" value="">
<input type="hidden" id="user_permission_group_id" value="1">
<input type="hidden" value="分公司_全省,系统管理员2,普通用户2,审核员" id="user_role_List_string">
<input value="全省" id="currentCityName" type="hidden">

<div class="pc_listb" id="pc_listb_IntelligentTuning">
	<div class="main-content">
		<div class="mapDiv" onselectstart="return false">
			<div class="spiltScreenWrap">
				<!-- 百度地图的div -->
				<div class="baiduMapDiv">
					<div id="baiduMap" class="baiduMap"></div>
					<!-- 右边栏 -->
					<ul class="rightBar">
						<li class="select-text" id="helpTip" title="帮助">
							<img src="../js/IntelligentTuning/images/nor_help.png">
							<div class="helpInfo">
								<iframe src="../js/IntelligentTuning/html/helpInfo.html" style="width:100%; height:100%;" scrolling="yes" frameborder="0"></iframe>
							</div>
						</li>
						<li class="select-text" id="chartTablePage" title="统计导出">
							<img src="../js/IntelligentTuning/images/nor_exportData.png">
						</li>
						<li class="select-text inSightSector" id="inSightSector" title="附近小区">
							<div class="inSightSectorImg">
								<img src="../js/IntelligentTuning/images/nor_eye.png">
							</div>
							<div class="progressBarDiv"></div>
							<div class="inSightSectorSelect">
								<div class="containList">列表</div>
								<div>地图</div>
								<div class="containList">列表+地图</div>
								<div>清除</div>
							</div>
						</li>
						<li class="dateDiv" id="dateWrap" onclick="WdatePicker({el:'seachTime',dateFmt:'yyyyMMdd',maxDate:'%y-%M-%d',onpicked:changeDate,isShowClear:false,readOnly:true,isShowOK:false})">
							<span id="seachTime" class="startTime">20180109</span>
							<span class="triangle"></span>
						</li>
						<li class="select-text" id="gageDistance" title="距离测量">
							<img src="../js/IntelligentTuning/images/nor_gageDistance.png">
						</li>
						<li class="select-text" id="coordinatePick" title="坐标拾取">
							<img src="../js/IntelligentTuning/images/nor_coordinatePick.png">
						</li>
					</ul>
					<%--circleTipLeft 提示框--%>
					<div class="circleTipLeft" id="cirTipLeft"></div>
					<!-- 正在加载数据弹框--start -->
					<div class="progressBox" id = "loadingDivTop">
						<div class="progressDiv">
							<div class="progressLoading">
								<div class="load-imgText">
									<img src="../images/loading.gif" />
									<div>正在玩命加载，请稍候!</div>
								</div>
								<button type="button" class="closeProgress">
									<img src="../images/closeChart.png"/>
								</button>
							</div>
						</div>
					</div>
				</div>
				<!-- 分屏地图的div -->
				<div class="spiltScreen" style="display: none;">
					<div id="spiltScreenMap" class="spiltScreenMap"></div>
					<!-- 右边栏 -->
					<ul class="rightBar">
						<li class="select-text inSightSector" id="screenInSightSector" title="附近小区">
							<div class="inSightSectorImg">
								<img src="../js/IntelligentTuning/images/nor_eye.png">
							</div>
							<div class="inSightSectorSelect">
								<div class="containList">列表</div>
								<div>地图</div>
								<div class="containList">列表+地图</div>
								<div>清除</div>
							</div>
						</li>
						<li class="dateDiv" id="screenDateWrap" onclick="WdatePicker({el:'screenTime',dateFmt:'yyyyMMdd',maxDate:'%y-%M-%d',onpicked:screenTimeOnpicked,isShowClear:false,readOnly:true,isShowOK:false})">
							<span id="screenTime" class="startTime">20180109</span>
							<span class="triangle"></span>
						</li>
						<li class="select-text" id="screenGageDistance" title="距离测量">
							<img src="../js/IntelligentTuning/images/nor_gageDistance.png">
						</li>
						<li class="select-text" id="screenCoordinatePick" title="坐标拾取">
							<img src="../js/IntelligentTuning/images/nor_coordinatePick.png">
						</li>
					</ul>
					<div class="circleTipLeft" id="cirTipLeft2"></div>
					<!-- 正在加载数据弹框--start -->
					<div class="progressBox" id = "loadingDivBottom">
						<div class="progressDiv">
							<div class="progressLoading">
								<div class="load-imgText">
									<img src="../images/loading.gif" />
									<div>正在玩命加载，请稍候!</div>
								</div>
								<button type="button" class="closeProgress">
									<img src="../images/closeChart.png"/>
								</button>
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

		</div>
		<div class="contentWrap">
			<!-- 搜索框和搜索列表 -->
			<div class="searchDiv">
				<div class="searchBox">
					<a href="javascript:;" title="首页" id="logoBtn" class="logoImg"><img src="../js/IntelligentTuning/images/sectorLogo.png"></a>
					<input id="searchText"  onkeyup="searchenter(event);" class="textBox" placeholder='基站id、基站id_小区id、扇区名称' />
					<a href="javascript:;" class="chartTotal">
						<div class="searchImg">
							<img src="../js/IntelligentTuning/images/search.png">
							<span class="triangle"></span>
						</div>
						<ul class="coordinateType">
							<li class="active">
								<%--<input type="radio" id="radioCell" name="coordinate" checked>--%>
								<label id="radioCell">基站小区</label>
							</li>
                            <%--<li>
                                <input type="radio" id="radioCellName" name="coordinate">
								<label id="radioCellName">扇区名称</label>
							</li>--%>
							<li>
								<%--<input type="radio" id="radioAddress" name="coordinate">--%>
								<label id="radioAddress">地址地名</label>
							</li>
							<li>
								<%--<input type="radio" id="radioGPS" name="coordinate">--%>
								<label id="radioGPS">硬件GPS坐标</label>
							</li>
							<li>
								<%--<input type="radio" id="radioBaidu" name="coordinate">--%>
								<label id="radioBaidu">百度地图坐标</label>
							</li>
						</ul>
					</a>
                    <a href="javascript:;" title="框选评估" id="boxSelection" class="btn-boxSelection">
						<img src="../js/IntelligentTuning/images/view.png" style="margin-top: 6px;"/>
					</a>
					<!--<a href="javascript:;" title="搜索地图范围" id="searchAreaButton" class="btn-bg btn-search">
                        <img src="../js/IntelligentTuning/images/view.png"/></a>-->
					<a href="javascript:;" title="清空" class="clearText"><img src="../js/IntelligentRoadTestV3/images/clearImg.png"></a>
					<a href="javascript:;" class="search_loading"><img src="../js/IntelligentRoadTestV3/images/search_loading.gif"></a>
				</div>
				<ul class="search-result" style="display: none;" id="mapClickResult"></ul>
				<ul class="search-result" style="display: none;" id="searchResult"></ul>
			</div>
			<div class="panelWrap">
				<div class="panelDiv" id="">
					<div class="tabLists">
						<ul class="rowDiv">
							<li class="bg-col3" id="feederLineLogo"> <%--FeederLine == 天馈线--%>
								<a href="javascript:;">
									<img src="../js/IntelligentTuning/images/img_logo6.png">
									<span>天馈接反</span>
								</a>
							</li>
							<li class="bg-col3" id="macSectorLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentTuning/images/img_logo5.png">
									<span>坐标勘误</span>
								</a>
							</li>
							<li class="bg-col3" id="dipAngleLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentTuning/images/img_logo7.png">
									<span>下倾角勘误</span>
								</a>
							</li>
							<li class="bg-col4" id="cbSectorLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentTuning/images/img_logo2.png">
									<span>越区覆盖</span>
								</a>
							</li>
							<li class="bg-col4" id="poorCoverSectorLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentTuning/images/img_logo1.png">
									<span>弱覆盖</span>
								</a>
							</li>
							<li class="bg-col4" id="olSectorLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentTuning/images/img_logo3.png">
									<span>重叠覆盖</span>
								</a>
							</li>
							<li class="bg-col4" id="m3SectorLogo">
								<a href="javascript:;">
									<img src="../js/IntelligentTuning/images/img_logo4.png">
									<span>MOD3干扰</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="listInfo" onselectstart="return false">
				<%--扇区开始--%>
				<div class="listWrapInfo" id="showSectorList">
					<div class="listDiv">
						<div class="listWrap">
							<div class="logoList">
								<div class="showLogoName ">
									<img src="../js/IntelligentTuning/images/showList.png">
								</div>
								<ul>
									<li id="feederLineLogoLeft" class="problemList" title="天馈接反">
										<i class="icon_img6"></i>
										<span>天馈接反</span>
									</li>
									<li  id="macSectorLogoLeft" class="problemList" title="坐标勘误">
										<i class="icon_img5"></i>
										<span>坐标勘误</span>
									</li>
									<li id="dipAngleLogoLeft" class="problemList" title="下倾角勘误">
										<i class="icon_img7"></i>
										<span>下倾角勘误</span>
									</li>
									<li id="cbSectorLogoLeft" class="problemList" title="越区覆盖">
										<i class="icon_img2"></i>
										<span>越区覆盖</span>
									</li>
									<li class="problemList" id="poorCoverSectorLogoLeft" title="弱覆盖">
										<img src="../js/IntelligentTuning/images/img_logo1.png">
										<span>弱覆盖</span>
									</li>

									<li id="olSectorLogoLeft" class="problemList" title="重叠覆盖">
										<i class="icon_img3"></i>
										<span>重叠覆盖</span>
									</li>
									<li id="m3SectorLogoLeft"  class="problemList" title="MOD3干扰">
										<i class="icon_img4"></i>
										<span>MOD3干扰</span>
									</li>
								</ul>
							</div>
							<div class="listContent">
								<ul class="listTopUl">
									<li class="selectCity" id="currentArea" style="display: none">
										<div class="select-name">
											<span>当前区域</span>
											<span title="退出当前区域">
												<img src="../js/IntelligentTuning/images/area_close.png" class="closeArea">
											</span>
										</div>
									</li>
									<li class="selectCity" id="sectorCitySelect">
										<div class="select-name selectCity-name" v-on:click="showSelectInfo($event)">
											<img src="../js/IntelligentTuning/images/position.png" class="name-icon">
											<span class="city-selected" id="sectorCityName">广州</span>
											<span class="city-selected-gt">&gt;</span>
											<span class="district-selected" id="sectorDistrictName">全市</span>
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
												<div class="flexCol"></div>
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
											<div class="flexRow" id="isFilterDistance"> <%--只有宏站勘误才有这个筛选--%>
												<div class="flexCol">距离偏差</div>
												<div class="flexCol selected">不限</div>
												<div class="flexCol">1公里以内</div>
												<div class="flexCol">1-3公里</div>
												<div class="flexCol"></div>
												<div class="flexCol ">3公里以外</div>
											</div>
											<div class="flexRow" id="isFilterAzimuth"> <%--只有方位角勘误才有这个筛选--%>
												<div class="flexCol">角度偏差</div>
												<div class="flexCol selected">不限</div>
												<div class="flexCol">15°以内</div>
												<div class="flexCol">15°到30°</div>
												<div class="flexCol"></div>
												<div class="flexCol ">30°以上</div>
											</div>
											<div class="flexRow" id="isFilterFeederLine"> <%--只有宏站勘误和方位角勘误才有这个筛选--%>
												<div class="flexCol">天馈接反</div>
												<div class="flexCol selected">不限</div>
												<div class="flexCol">是</div>
												<div class="flexCol">否</div>
											</div>
											<div class="flexRow" >
												<div class="flexCol">派单门限</div>
												<div class="flexCol ">不限</div>
												<div class="flexCol selected">满足</div>
												<div class="flexCol">不满足</div>
											</div>
											<div class="flexRow" >
												<div class="flexCol">是否派单</div>
												<div class="flexCol selected">不限</div>
												<div class="flexCol">是</div>
												<div class="flexCol">否</div>
											</div>
											<div class="flexRow">
												<div class="flexCol">派单状态</div>
												<div class="flexCol selected">不限</div>
												<div class="flexCol">确认中</div>
												<div class="flexCol">执行中</div>
												<div class="flexCol"></div>
												<div class="flexCol">评估中</div>
												<div class="flexCol">已归档</div>
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
												<li id="sectorDistanceFirst">距离优先</li> <%--这下面三个是在坐标勘误和方位角勘误才有的--%>
												<li id="sectorAzimuthFirst">角度优先</li>
												<li id="sectorPoorCountFirst">附近弱区数量优先</li>
											</ul>
										</div>
									</li>
								</ul>
								<div class="listDivWrap" id="showSectorListDiv">
									<ul class="listUL">
										<li v-for = "(item , index , key ) in sectorList" class="cursor"  v-on:click = "showMessage(item,index)" v-on:mouseover = "turnMk(index,item)" v-bind:id = "index">
											<div class="colDiv">
												<span class="numSpan2" v-cloak>{{ index + 1 }}</span>
												<span class="rentenCellName " v-cloak>基站扇区编号：{{ item.enodeb_id + '_' + item.cell_id }}</span>
												<div class="rightImg">
												<span v-if="item.is_new == true"><img class="" src="../js/IntelligentRoadTestV3/images/zeng.png"></span>
												<span v-if="item.isPD == true"><img class="" src="../js/IntelligentRoadTestV3/images/pai.png"></span>
												<span v-if="item.sys_status == '已归档'"><img src="../js/IntelligentRoadTestV3/images/jie.png"></span>
											</div>
											</div>
											<div class="colDiv">
												<div class="bold">
													<span>小区名称：</span>
													<span class="cell_name" v-bind:title="item.cell_name" v-cloak>{{ item.cell_name }}</span>
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
                                                第<input class="page-num" type="text" id="sectorPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
                                                <input  type="hidden">
                                            </div>
                                            <div class="page-pagination">
                                                <a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
                                                <a href="javascript:;" class="last-active" v-on:click="goLast"></a>
                                            </div>
                                            <div>
                                                <a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTestV3/images/111_11.png"></a>
                                            </div>
                                        </div>
                                        <div class="page-info" id="sectorCountMessage"<%-- style="display: none;"--%>>
                                            <%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
                                            共<span v-cloak>{{ totalCounts }}</span>条数据
                                        </div>
                                    </div>
								</div>
							</div>
						</div>
						<div class="detailList">
							<div class="backList" id="sectorCount">
								<img src="../js/IntelligentTuning/images/back.png">
							</div>
							<div class="detailListDiv" id="sectorCompleteMessage">
								<div class="infoHeader">
									<table>
										<tr>
											<td style="padding-left: 60px;box-sizing: border-box">
												<span style="margin-left: -60px;">小区名称：</span>
												<span class="cell_name" v-bind:title="sectorData.cell_name">{{ sectorData.cell_name }}</span>
											</td>
											<td>
												<span>基站扇区编号：{{ sectorData.enodeb_id + '_' + sectorData.cell_id }}</span>
											</td>
											<td>
													<span >当前派单问题：</span><span style="color:#ffdf0a;">{{planInfo.problem_name}}</span>
											</td>
											<td>
												<span>区域类型：{{ sectorData.belong_area_id }}</span>
											</td>
										</tr>
										<tr>
											<td>
												<span>所属营服：{{ sectorData.mktcenter }}</span>
											</td>
											<td>
												<span>厂家：{{ sectorData.bs_vendor }}</span>
											</td>
											<td>
												<span v-if="sectorData.band_mapping == 1">频段：800MHz</span>
												<span v-if="sectorData.band_mapping == 2">频段：1.8GHz</span>
												<span v-if="sectorData.band_mapping == 3">频段：2.1GHz</span>
												<span v-if="sectorData.band_mapping == 4">频段：2.6GHz</span>
											</td>
											<td>
												<span>扇区类型：{{ sectorData.is_indoor }}</span>
											</td>
										</tr>
										<tr>
											<td>
												<span v-if="sectorData.pci != null && sectorData.pci != ''">PCI：{{ sectorData.pci }}（模{{ parseInt(sectorData.pci)%3 }}）</span>
												<span v-else>PCI（模-）：--</span>
											</td>
											<td>
												<span v-if="sectorData.ant_electron_angle != null">电子下倾角：{{sectorData.ant_electron_angle}}°</span>
												<span v-else>电子下倾角：--</span>
											</td>
											<td></td>
											<td></td>
										</tr>
									</table>
								</div>
								<div class="infoBody">
									<div class="infoDiv">
										<div class="infoTitle">
											<span>当前方案详情：</span>
											<%--<span>（当前状态：</span><span style="color:#ffdf0a;">待审核，2018-09-11 12:32:32）</span>--%>
                                            <%--<span>(工单状态：</span><span style="color:#ffdf0a;">{{planInfo.current_status}},生成时间:{{planInfo.status_time}}</span>)--%>
                                            <span>(工单状态：</span><span style="color:#ffdf0a;">{{planInfo.current_status}}</span><span>, 生成时间：</span><span style="color: #ffdf0a">{{planInfo.status_time}}</span>)
											<div class="floatRight">
												<button class="btn-showInfo"><img src="../js/IntelligentTuning/images/showMore.png"></button>
											</div>
										</div>
										<template v-if="planInfo.isPlanShow">
										<div class="infoCotent" id="planInfo">
											<table class="table-border0">
												<tr>
													<%--<td>确认状态：{{planInfo.comf_opinion+' '+planInfo.comf_note}}</td>--%>
													<%--<td>执行状态:{{planInfo.oprt_result}}</td>--%>
													<%--<td>评估状态：{{planInfo.eval_result}}</td>--%>
													<%--<td>工单状态：{{planInfo.current_status}}</td>--%>
													<td>省接口确认状态：{{planInfo.comf_opinion}}</td>
													<td>省接口确认时间:{{planInfo.comf_time}}</td>
													<td>省接口确认备注：{{planInfo.comf_note}}</td>
													<td></td>
												</tr>
												<tr>
													<td>集团接口执行状态：{{planInfo.oprt_result}}</td>
													<td>集团接口执行时间：{{planInfo.oprt_etime}}</td>
													<td>系统自动评估状态：{{planInfo.eval_result}}</td>
													<td>系统自动评估时间：{{planInfo.eval_etime}}</td>
												</tr>
											</table>
											<table>
												<thead>
												<tr>
													<th>小区编号</th>
													<th>小区名称</th>
													<th>调整项</th>
													<th>当前设置</th>
													<th>
														<span>方案设置</span>
														<%--<img style="margin-left: 20px" src="../js/IntelligentTuning/images/edit.png">--%>
													</th>
													<th>执行状态</th>
												</tr>
												</thead>
												<tr v-for="plan in planInfo.planInfoArr">
													<td>{{ plan.enodeb_id }}</td>
													<td>{{ plan.cell_name }}</td>
													<td>{{plan.adjustName}}</td>
													<td>{{plan.currentSet}}</td>
													<%--<td class="clickBlueText">{{planInfo.sugg_ant_electron_angle}}</td>--%>
													<td class="editText">
														<%--<input type="text" class="disable-input" :value="plan.planSet" v-bind:title="plan.planSet" readonly>--%>
														<span class="disable-input" v-bind:title="plan.planSet">{{plan.planSet}}</span>
														<span class="editBtnGroup" style="display: none;">
															<button type="button" class="edit-sure"><img src="../js/IntelligentTuning/images/btn-sure.png"></button>
															<button type="button" class="edit-cancel"><img src="../js/IntelligentTuning/images/btn-cancel.png"></button>
														</span>
													</td>
													<td>{{plan.oprt_status}}</td>
												</tr>
												<%--<tr v-show="planInfo.sugg_ant_electron_angle!='_'">--%>
													<%--<td>{{ sectorData.enodeb_id + '_' + sectorData.cell_id }}</td>--%>
													<%--<td>{{ sectorData.cell_name }}</td>--%>
													<%--<td>下倾角</td>--%>
													<%--<td>{{currentSetObj.ant_electron_angle}}</td>--%>
													<%--&lt;%&ndash;<td class="clickBlueText">{{planInfo.sugg_ant_electron_angle}}</td>&ndash;%&gt;--%>
													<%--<td class="editText">--%>
														<%--<input type="text" class="disable-input" :value="planInfo.sugg_ant_electron_angle" v-bind:title="planInfo.sugg_ant_electron_angle" readonly>--%>
														<%--<span class="editBtnGroup" style="display: none;">--%>
															<%--<button type="button" class="edit-sure"><img src="../js/IntelligentTuning/images/btn-sure.png"></button>--%>
															<%--<button type="button" class="edit-cancel"><img src="../js/IntelligentTuning/images/btn-cancel.png"></button>--%>
														<%--</span>--%>
													<%--</td>--%>
												<%--</tr>--%>
												<%--<tr v-show="planInfo.sugg_pilot_power!='_'">--%>
													<%--<td>{{ sectorData.enodeb_id + '_' + sectorData.cell_id }}</td>--%>
													<%--<td>{{ sectorData.cell_name }}</td>--%>
													<%--<td>功率</td>--%>
													<%--<td>{{currentSetObj.pilot_power}}</td>--%>
													<%--&lt;%&ndash;<td class="clickBlueText">{{planInfo.sugg_pilot_power}}</td>&ndash;%&gt;--%>
													<%--<td class="editText">--%>
														<%--<input type="text" class="disable-input" :value="planInfo.sugg_pilot_power" v-bind:title="planInfo.sugg_pilot_power" readonly>--%>
														<%--<span class="editBtnGroup" style="display: none;">--%>
															<%--<button type="button" class="edit-sure"><img src="../js/IntelligentTuning/images/btn-sure.png"></button>--%>
															<%--<button type="button" class="edit-cancel"><img src="../js/IntelligentTuning/images/btn-cancel.png"></button>--%>
														<%--</span>--%>
													<%--</td>--%>
												<%--</tr>--%>
												<%--<tr v-show="planInfo.sugg_pci!='_'">--%>
													<%--<td>{{ sectorData.enodeb_id + '_' + sectorData.cell_id }}</td>--%>
													<%--<td>{{ sectorData.cell_name }}</td>--%>
													<%--<td>PCI</td>--%>
													<%--<td>{{currentSetObj.PCI}}</td>--%>
													<%--&lt;%&ndash;<td class="clickBlueText">{{planInfo.sugg_pci}}</td>&ndash;%&gt;--%>
													<%--<td class="editText">--%>
														<%--<input type="text" class="disable-input" :value="planInfo.sugg_pci" v-bind:title="planInfo.sugg_pci" readonly>--%>
														<%--<span class="editBtnGroup" style="display: none;">--%>
															<%--<button type="button" class="edit-sure"><img src="../js/IntelligentTuning/images/btn-sure.png"></button>--%>
															<%--<button type="button" class="edit-cancel"><img src="../js/IntelligentTuning/images/btn-cancel.png"></button>--%>
														<%--</span>--%>
													<%--</td>--%>
												<%--</tr>--%>
												<%--<tr v-show="planInfo.sugg_handover!='_'">--%>
													<%--<td>{{ sectorData.enodeb_id + '_' + sectorData.cell_id }}</td>--%>
													<%--<td>{{ sectorData.cell_name }}</td>--%>
													<%--<td>切换参数</td>--%>
													<%--<td>{{currentSetObj.handover}}</td>--%>
													<%--&lt;%&ndash;<td class="clickBlueText">{{planInfo.sugg_handover}}</td>&ndash;%&gt;--%>
													<%--<td class="editText">--%>
														<%--<input type="text" class="disable-input" :value="planInfo.sugg_handover" v-bind:title="planInfo.sugg_handover" readonly>--%>
														<%--<span class="editBtnGroup" style="display: none;">--%>
															<%--<button type="button" class="edit-sure"><img src="../js/IntelligentTuning/images/btn-sure.png"></button>--%>
															<%--<button type="button" class="edit-cancel"><img src="../js/IntelligentTuning/images/btn-cancel.png"></button>--%>
														<%--</span>--%>
													<%--</td>--%>
												<%--</tr>--%>
											</table>
										</div>
										</template>
									</div>
									<div class="infoDiv">
										<div class="infoTitle">
											<span>派单方案记录：</span>
											<div class="floatRight">
												<button class="btn-showInfo"><img src="../js/IntelligentTuning/images/showMore.png"></button>
											</div>
										</div>
										<div class="infoCotent" id="planRecordDiv">
											<table>
												<thead>
												<tr>
													<th>
														<span class="btn_contrast">（VS） 方案对比</span>
														<div class="btnGroup" style="display: none;">
															<button class="btn-sure"><img src="../js/IntelligentTuning/images/btn-sure.png">确定</button>
															<button class="btn-cancel"><img src="../js/IntelligentTuning/images/btn-cancel.png">取消</button>
														</div>
													</th>
													<th>方案生成</th>
													<th>确认状态</th>
													<th>执行状态</th>
													<th>评估状态</th>
													<th>工单状态</th>
													<th>调整内容</th>
												</tr>
												</thead>
                                                <tbody id="planRecordTbody">
												<template v-for="(item,i) in planRecords">
													<tr>
														<td>{{i+1}}</td>
														<td @click="getPlan(item,1)"><span class="clickBlueText">{{item.task_create_time}}</span></td>
														<td @click="getPlan(item,2)"><span class="clickBlueText">{{item.confirm_status}}</span></td>
														<td @click="getPlan(item,3)"><span class="clickBlueText">{{item.perform_status}}</span></td>
														<td @click="getPlan(item,4)"><span class="clickBlueText">{{item.assessment_status}}</span></td>
														<td @click="enterTaskInfo(item)"><span class="clickBlueText" style="">{{item.record_sys_status}}</span></td>
														<td @click="editPlanInfo(item)"><div class="cell_name" style="color: #0883df;cursor: pointer" v-bind:title="item.adjust_content">{{item.adjust_content}}</div></td>
													</tr>
												</template>
                                                </tbody>
												<%--<tr>--%>
													<%--<td>1</td>--%>
													<%--<td><span class="clickBlueText" style="">2018/08/25 &lt;执行成功&gt;</span></td>--%>
													<%--<td><span class="clickBlueText" style="">2018/08/25 &lt;执行成功&gt;</span></td>--%>
													<%--<td><span class="clickBlueText" style="">2018/08/25 &lt;执行成功&gt;</span></td>--%>
													<%--<td>xxxx</td>--%>
												<%--</tr>--%>
											</table>
										</div>
									</div>
                                    <div class="infoDiv">
                                        <div class="infoTitle">
                                            <span>台账勘误：</span>
                                            <div class="floatRight">
												<span id="macSectorAndLine" title="隐藏勘误" class="btn_mapLine linkCellHover" v-on:click.stop="showMacSectorAndLine($event,sectorData,mapType)"><img src="../js/IntelligentTuning/images/mapLine.png">地图勘误</span>
                                                <button class="btn-showInfo"><img src="../js/IntelligentTuning/images/showMore.png"></button>
                                            </div>
                                        </div>
                                        <div class="infoCotent" id="planRecordDiv">
											<table class="planRecordTable">
												<tr>
													<td>
														<span>台帐GPS坐标：
															<span v-if="sectorData.location_gps == null ||sectorData.location_gps == ''">-</span>
															<span v-else v-cloak> {{ parseFloat(sectorData.location_gps.split(',')[0]).toFixed(6) }}</span>
															,
															<span v-if="sectorData.location_gps == null ||sectorData.location_gps == ''">-</span>
															<span v-else v-cloak>{{ parseFloat(sectorData.location_gps.split(',')[1]).toFixed(6) }}</span>
														</span>
													</td>
													<td>
														<span>预测GPS坐标：
															<span v-if="sectorData.pred_location_gps == null ||sectorData.pred_location_gps == ''">-</span>
															<span v-else v-cloak> {{ parseFloat(sectorData.pred_location_gps.split(',')[0]).toFixed(6) }}</span>
															,
															<span v-if="sectorData.pred_location_gps == null ||sectorData.pred_location_gps == ''">-</span>
															<span v-else v-cloak>{{ parseFloat(sectorData.pred_location_gps.split(',')[1]).toFixed(6) }}</span>
														</span>
													</td>
													<td>
														<span>偏离距离：
															<span v-if="sectorData.pred_distance == null || sectorData.pred_distance == '' ">-</span>
															<span v-else v-cloak>{{ sectorData.pred_distance }}米</span>
														</span>
													</td>
												</tr>
												<tr>
													<td>
														<span>台账方位角：
															<span v-if="sectorData.ant_azimuth == null || sectorData.ant_azimuth == ''">-</span>
															<span v-else v-cloak>{{ sectorData.ant_azimuth }}°</span>
														</span>
													</td>
													<td>
														<span>预测方位角：
															<span v-if="sectorData.pred_azimuth == null || sectorData.pred_azimuth == ''">-</span>
															<span v-else v-cloak>{{ sectorData.pred_azimuth }}°</span>
														</span>
													</td>
													<td>
														<span>偏转角度：
															<span v-if="sectorData.pred_azimuth_diff == null || sectorData.pred_azimuth_diff == ''">-</span>
															<span v-else v-cloak>{{ sectorData.pred_azimuth_diff }}°</span>
														</span>
													</td>
												</tr>
												<tr>
													<td>
														<span>台账总下倾角：
															<span v-if="sectorData.ant_declination_angle == null || sectorData.ant_declination_angle == ''">-</span>
															<span v-else v-cloak>{{ sectorData.ant_declination_angle }}°</span>
														</span>
													</td>
													<td>
														<span>预测总下倾角：
															<span v-if="sectorData.pred_ant_declination_angle == null || sectorData.pred_ant_declination_angle == ''">-</span>
															<span v-else v-cloak>{{ sectorData.pred_ant_declination_angle }}°</span>
														</span>
													</td>
													<td>
														<span>下倾角差值：
															<span v-if="sectorData.ant_declination_angle == null || sectorData.pred_ant_declination_angle == null">-</span>
															<span v-else v-cloak>{{ sectorData.pred_ant_declination_angle - sectorData.ant_declination_angle }}°</span>
														</span>
													</td>
												</tr>
												<tr>
													<td>
														<span>台账覆盖半径：
															<span v-if="sectorData.ant_mid_radius == null || sectorData.ant_mid_radius == ''">-</span>
															<span v-else v-cloak>{{ sectorData.ant_mid_radius.toFixed(2) }}米</span>
														</span>
													</td>
													<td>
														<span>预测覆盖半径：
															<span v-if="sectorData.pred_ant_mid_radius == null || sectorData.pred_ant_mid_radius == ''">-</span>
															<span v-else v-cloak>{{ sectorData.pred_ant_mid_radius.toFixed(2) }}米</span>
														</span>
													</td>
													<td>
														<span>覆盖半径差值：
															<span v-if="sectorData.pred_ant_mid_radius == null || sectorData.ant_mid_radius == null">-</span>
															<span v-else v-cloak>{{ (sectorData.pred_ant_mid_radius - sectorData.ant_mid_radius).toFixed(2) }}米</span>
														</span>
													</td>
												</tr>
											</table>
                                        </div>
                                    </div>
									<div class="infoDiv">
										<div class="infoTitle">
											<span>小区问题状态变迁：</span>
											<div class="floatRight">
                                                <div class="dateDiv">
                                                    <span id="date-range1" class="startTime dateBox">2018-09-29 - 2018-10-29</span>
                                                    <span class="triangle"></span>
                                                </div>
												<button class="btn-showInfo"><img src="../js/IntelligentTuning/images/showMore.png"></button>
											</div>
										</div>
										<div class="infoCotent">
											<div class="chartWrap">
												<div class="chartInfo chartDiv" id="antennaInversionChart" style="display: block;height: 220px;">
													<ul class="tabInfoTitle tabInfoTitle6">
														<li class="active" id="pianzhuanjiaodu">偏转角度</li>
														<li id="fangxiangjiaokanwu">方向角勘误</li>
													</ul>
													<div class="chartWrap">
														<div class="chartInfo chartDiv" id="deviationDistance2" style="display: block;"></div>
														<div class="chartInfo" id="gaugeChart01" style="display: none;">
															<ul class="chartLegend">
																<li class="legendLi">
																	<span class="legendColor"></span>
																	<span>台账角度</span>
																</li>
																<li class="legendLi">
																	<span class="legendColor"></span>
																	<span>接反</span>
																</li>
																<li class="legendLi">
																	<span class="legendColor"></span>
																	<span>预测角度</span>
																</li>
															</ul>
															<div class="chartGauge">
																<div class="chartDiv" id="chartGauge1"></div>
																<div class="chartDiv" id="chartGauge2"></div>
																<div class="chartDiv" id="chartGauge3"></div>
																<div class="chartDiv" id="chartGauge4"></div>
																<div class="chartDiv" id="chartGauge5"></div>
																<div>
																	<span class="chartGaugeDay">2017/10/23</span>
																	<span class="chartGaugeDay">2017/10/24</span>
																	<span class="chartGaugeDay">2017/10/25</span>
																	<span class="chartGaugeDay">2017/10/26</span>
																	<span class="chartGaugeDay">2017/10/27</span>
																</div>
																<%--<div class="chartDiv" id="chartRate6" style="display: block;"></div>--%>
															</div>
														</div>
													</div>
												</div>
												<div class="chartInfo chartDiv" id="coordinateChart" style="height: 220px;">
													<ul class="tabInfoTitle tabInfoTitle5">
														<li class="active" id="pianlijuli">偏离距离</li>
														<li id="zuobiaokanwu">坐标勘误</li>
													</ul>
													<div class="chartWrap">
														<div class="chartDiv" id="deviationDistance1" style="display: block;"></div>
														<div class="chartDiv" id="chartRate5" style="display: none;"></div>
													</div>
												</div>
												<div class="chartInfo chartDiv" id="declinationDisparityChart" style="display: none;height: 220px;">
													<ul class="tabInfoTitle tabInfoTitle7">
														<li class="active" id="xiaqingjiaodu">下倾角度</li>
														<li id="xiaqingjiaokanwu">下倾角勘误</li>
													</ul>
													<div class="chartWrap">
														<div class="chartInfo chartDiv" id="deviationDistance3" style="display: block;"></div>
														<div class="chartInfo" id="gaugeChart02" style="display: none;">
															<ul class="chartLegend">
																<li class="legendLi">
																	<span class="legendColor"></span>
																	<span>台账下倾角</span>
																</li>
																<li class="legendLi">
																	<span class="legendColor" style="display: none;"></span>
																</li>
																<li class="legendLi">
																	<span class="legendColor"></span>
																	<span>预测下倾角</span>
																</li>
															</ul>
															<div class="chartGauge">
																<div class="chartDiv" id="chartDistance1"></div>
																<div class="chartDiv" id="chartDistance2"></div>
																<div class="chartDiv" id="chartDistance3"></div>
																<div class="chartDiv" id="chartDistance4"></div>
																<div class="chartDiv" id="chartDistance5"></div>
																<div>
																	<span class="chartGaugeDay">2017/10/23</span>
																	<span class="chartGaugeDay">2017/10/24</span>
																	<span class="chartGaugeDay">2017/10/25</span>
																	<span class="chartGaugeDay">2017/10/26</span>
																	<span class="chartGaugeDay">2017/10/27</span>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class="chartInfo chartDiv" id="chartRate2"></div>
												<div class="chartInfo chartDiv" id="chartRate1"></div>
												<div class="chartInfo chartDiv" id="chartRate3"></div>
												<div class="chartInfo chartDiv" id="chartRate4"></div>
											</div>
											<ul class="chartTitle">
												<li class="bg-bone" id="boneLogo">
													<div>
														<img src="../js/IntelligentTuning/images/white_logo6.png">
														<span>天馈接反</span>
														<span class="redCircle"></span>
													</div>
												</li>
												<li class="bg-macSector" id="macSectorLogo2">
													<div>
														<img src="../js/IntelligentRoadTestV3/images/img_macSector.png">
														<span>坐标勘误</span>
														<span class="redCircle"></span>
													</div>
												</li>
												<li class="bg-macSector" id="declinationDisparity">
													<div>
														<img src="../js/IntelligentTuning/images/white_logo7.png">
														<span>下倾角勘误</span>
														<span class="redCircle"></span>
													</div>
												</li>
												<li class="bg-across" id="cbPoorAreaLogo">
													<div>
														<img src="../js/IntelligentRoadTestV3/images/img_across.png">
														<span>越区覆盖</span>
														<span class="redCircle"></span>
													</div>
												</li>
												<li class="bg-orange" id="poorAreaCovRateLogo">
													<div>
														<img src="../js/IntelligentTuning/images/img_logo1.png">
														<span>弱覆盖</span>
														<span class="redCircle"></span>
													</div>
												</li>
												<li class="bg-overlap" id="olPoorAreaLogo">
													<div>
														<img src="../js/IntelligentRoadTestV3/images/img_overlap.png">
														<span>重叠覆盖</span>
														<span class="redCircle"></span>
													</div>
												</li>
												<li class="bg-mod3" id="m3PoorAreaLogo">
													<div>
														<img src="../js/IntelligentTuning/images/white_logo4.png">
														<span>MOD3干扰</span>
														<span class="redCircle"></span>
													</div>
												</li>
											</ul>
										</div>
									</div>
									<div class="infoDiv">
										<div class="infoTitle">
											<span>区域统计：</span>
											<div class="floatRight">
												<div class="dateDiv">
													<span id="date-range2" class="startTime dateBox">2018-09-29 - 2018-10-29</span>
													<span class="triangle"></span>
												</div>
												<span id="problemArea" title="隐藏多边形" class="btn_mapLine linkCellHover" v-on:click.stop="showProblemArea($event,sectorData,mapType)" >
													<img src="../js/IntelligentTuning/images/mapLine.png">显示多边形
												</span>
												<button class="btn-showInfo"><img src="../js/IntelligentTuning/images/showMore.png"></button>
											</div>
										</div>
										<div class="infoCotent">
											<ul class="tabInfoTitle">
												<li class="active" id="300mi">300米内</li>
												<li id="500mi">500米内</li>
												<li id="1000mi">1公里内</li>
												<li id="3000mi">3公里内</li>
												<li id="wentiquyu">问题区域</li>
											</ul>
											<div class="chartWrap">
												<div class="chartDiv" id="areaCount1" style="display: block;"></div>
												<div class="chartDiv" id="areaCount2"></div>
												<div class="chartDiv" id="areaCount3"></div>
												<div class="chartDiv" id="areaCount4"></div>
												<div class="chartDiv" id="areaCount5"></div>
											</div>
										</div>
									</div>
									
								<!-- ########################################################################################################## -->	
									<div class="infoDiv">
										<div class="infoTitle">
											<span>用户统计：</span>
											<div class="floatRight">
                                                <div class="dateDiv">
                                                    <span id="date-range5" class="startTime dateBox">2018-09-29 - 2018-10-29</span>
                                                    <span class="triangle"></span>
                                                </div>
												<button class="btn-showInfo"><img src="../js/IntelligentTuning/images/showMore.png"></button>
											</div>
										</div>
										<div class="infoCotent">
											<ul class="tabInfoTitle">
												<li class="active" id="residentUserNum">常驻用户</li>
												<li id="flowStatistics">流量统计</li>
											</ul>
											<div class="chartWrap">
												<div class="chartDiv" id="residentUserNumChart" style="display: block;"></div>
												<div class="chartDiv" id="flowStatisticsChart" style="display: none;"></div>
											</div>
										</div>
									</div>
								<!-- ########################################################################################################## -->	
									
									<div class="infoDiv">
										<div class="infoTitle">
											<span>TOP3邻区列表：</span>
											<div class="floatRight" id="nrCellTitleDiv">
												<span id="nRLinkCell" class="btn_mapLine linkCellHover" v-on:click.stop="showNRLinkCell($event,sectorData,nrCellList,mapType)" title="隐藏连线">
													<img src="../js/IntelligentTuning/images/mapLine.png">地图连线
												</span>
												<button class="btn-showInfo"><img src="../js/IntelligentTuning/images/showMore.png"></button>
											</div>
										</div>
										<div class="infoCotent" id="nrCellDiv">
                                            <div  class="fixedTable">
                                                <table>
                                                    <thead>
                                                    <tr>
                                                        <th>
                                                            <span class="btn_contrast">（VS） 小区对比</span>
                                                            <div class="btnGroup" style="display: none;">
                                                                <button class="btn-sure"><img src="../js/IntelligentTuning/images/btn-sure.png">确定</button>
                                                                <button class="btn-cancel"><img src="../js/IntelligentTuning/images/btn-cancel.png">取消</button>
                                                            </div>
                                                        </th>
                                                        <th>小区编号</th>
                                                        <th>小区名称</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody id="nrCellList">
                                                    <tr v-for="(nrCell, index) in nrCellList">
                                                        <td>{{index+1}}</td>
                                                        <td v-on:click="forwardNrCellDetil($event,nrCell)"><span class="clickBlueText" >{{nrCell.enodebid_cellid}}</span></td>
                                                        <td><div class="cell_name" v-bind:title="nrCell.cell_name">{{nrCell.cell_name}}</div></td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="scrollTable">
                                                <table>
                                                    <thead>
                                                    <tr>
                                                        <th>频点_PCI</th>
                                                        <th>RSRP均值</th>
                                                        <th>AGPS-MR数量</th>
                                                        <th>问题</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody id="nrCellListTwo">
                                                    <tr v-for="(nrCell, index) in nrCellList">
                                                        <td>{{nrCell.fcn_pci}}</td>
                                                        <td>{{nrCell.rsrp_avg }}</td>
                                                        <td>{{nrCell.mr_count}}</td>
                                                        <td>{{nrCell.problem}}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
										</div>
									</div>
									<div class="infoDiv">
										<div class="infoTitle">
											<span>站间距列表：</span>
											<div class="floatRight">
												<span id="distanceCricle" class="btn_mapLine linkCellHover" v-on:click.stop="showDistanceCricle($event,sectorData,mapType)" title="隐藏圆圈"><img src="../js/IntelligentTuning/images/mapLine.png">站间距圆</span>
												<button class="btn-showInfo"><img src="../js/IntelligentTuning/images/showMore.png"></button>
											</div>
										</div>
										<div class="infoCotent">
											<ul class="tabInfoTitle">
												<li class="active" id="fugailv">覆盖率</li>
												<li id="sulv">速率</li>
												<li id="agpsMRshuliang">AGPS-MR数量</li>
											</ul>
											<div class="chartWrap">
												<div class="chartDiv" id="stationSpacing1" style="display: block;"></div>
												<div class="chartDiv" id="stationSpacing2"></div>
												<div class="chartDiv" id="stationSpacing3"></div>
											</div>
										</div>
									</div>
									<div class="infoDiv" style="display: none;">
										<div class="infoTitle">
											<span>小区质量评估指标：</span>
											<div class="floatRight">
												<button class="btn-showInfo"><img src="../js/IntelligentTuning/images/showMore.png"></button>
											</div>
										</div>
										<div class="infoCotent">
											<ul class="tabInfoTitle cellIndexTitle">
												<li class="active">负荷</li>
												<li>空口指标</li>
												<li>覆盖</li>
						-						<li>干扰</li>
												<li>空口感知</li>
												<li>繁忙度</li>
												<li>用户</li>
												<li>告警</li>
											</ul>
											<div class="chartWrap">
												<div class="chartDiv" id="cellIndex1" style="display: block;"></div>
											</div>
										</div>
									</div>
									<div class="infoDiv">
										<div class="infoTitle">
											<span>参考方案：</span>
											<div class="floatRight">
												<div class="dateDiv">
													<span id="date-range3" class="startTime dateBox">2018-11-02 - 2018-11-08</span>
													<span class="triangle"></span>
												</div>
												<button class="btn-showInfo"><img src="../js/IntelligentTuning/images/showMore.png"></button>
											</div>
										</div>
										<template v-if="referencePlanArr.length>0">
											<div class="infoCotent" id="planInfo">

												<table class="tableDashed">
													<thead>
														<tr>
															<th>小区编号</th>
															<th>小区名称</th>
															<th>调整项</th>
															<th>当前设置</th>
															<th>
																<span>方案设置</span>
																<%--<img style="margin-left: 20px" src="../js/IntelligentTuning/images/edit.png">--%>
															</th>
														</tr>
													</thead>
													<template v-for="(rePlan,index) in referencePlanArr">
														<tr class="splitTr">
															<td colspan="5">
																<div class="nameBtn dateSplit" @click="showPlanInfo(rePlan)">
																	<div class="inline">
																		<span class="nameInfo" v-cloak>{{ rePlan.day + ' ' + rePlan.problem }}</span>
																	</div>
																	<div class="posiitionRight">
																		<button class="btn-showInfo">
																			<img class="rotateImg" src="../js/IntelligentRoadTestV3/images/showTop5.png">
																		</button>
																	</div>
																</div>
															</td>
														</tr>
														<tr v-for="re in rePlan.planInfoArr" v-show="rePlan.isShowContent">
															<td>{{ re.enodeb_id }}</td>
															<td>{{ re.cell_name }}</td>
															<td>{{re.adjustName}}</td>
															<td>{{re.currentSet}}</td>
															<%--<td class="clickBlueText">{{planInfo.sugg_ant_electron_angle}}</td>--%>
															<td class="editText">
																<%--<input type="text" class="disable-input" :value="re.planSet" v-bind:title="re.planSet" readonly>--%>
																<span class="disable-input" v-bind:title="re.planSet">{{re.planSet}}</span>
																<span class="editBtnGroup" style="display: none;">
																<button type="button" class="edit-sure"><img src="../js/IntelligentTuning/images/btn-sure.png"></button>
																<button type="button" class="edit-cancel"><img src="../js/IntelligentTuning/images/btn-cancel.png"></button>
															</span>
															</td>
														</tr>
														<%--<tr v-show="rePlan.sugg_ant_electron_angle!='_'">--%>
															<%--<td>{{ sectorData.enodeb_id + '_' + sectorData.cell_id }}</td>--%>
															<%--<td>{{ sectorData.cell_name }}</td>--%>
															<%--<td>下倾角</td>--%>
															<%--<td>{{currentSetObj.ant_electron_angle}}</td>--%>
															<%--&lt;%&ndash;<td class="clickBlueText">{{planInfo.sugg_ant_electron_angle}}</td>&ndash;%&gt;--%>
															<%--<td class="editText">--%>
																<%--<input type="text" class="disable-input" :value="rePlan.sugg_ant_electron_angle" v-bind:title="rePlan.sugg_ant_electron_angle" readonly>--%>
																<%--<span class="editBtnGroup" style="display: none;">--%>
																<%--<button type="button" class="edit-sure"><img src="../js/IntelligentTuning/images/btn-sure.png"></button>--%>
																<%--<button type="button" class="edit-cancel"><img src="../js/IntelligentTuning/images/btn-cancel.png"></button>--%>
															<%--</span>--%>
															<%--</td>--%>
														<%--</tr>--%>
														<%--<tr v-show="rePlan.sugg_pilot_power!='_'">--%>
															<%--<td>{{ sectorData.enodeb_id + '_' + sectorData.cell_id }}</td>--%>
															<%--<td>{{ sectorData.cell_name }}</td>--%>
															<%--<td>功率</td>--%>
															<%--<td>{{currentSetObj.pilot_power}}</td>--%>
															<%--&lt;%&ndash;<td class="clickBlueText">{{planInfo.sugg_pilot_power}}</td>&ndash;%&gt;--%>
															<%--<td class="editText">--%>
																<%--<input type="text" class="disable-input" :value="rePlan.sugg_pilot_power" v-bind:title="rePlan.sugg_pilot_power" readonly>--%>
																<%--<span class="editBtnGroup" style="display: none;">--%>
																<%--<button type="button" class="edit-sure"><img src="../js/IntelligentTuning/images/btn-sure.png"></button>--%>
																<%--<button type="button" class="edit-cancel"><img src="../js/IntelligentTuning/images/btn-cancel.png"></button>--%>
															<%--</span>--%>
															<%--</td>--%>
														<%--</tr>--%>
														<%--<tr v-show="rePlan.sugg_pci!='_'">--%>
															<%--<td>{{ sectorData.enodeb_id + '_' + sectorData.cell_id }}</td>--%>
															<%--<td>{{ sectorData.cell_name }}</td>--%>
															<%--<td>PCI</td>--%>
															<%--<td>{{currentSetObj.PCI}}</td>--%>
															<%--&lt;%&ndash;<td class="clickBlueText">{{planInfo.sugg_pci}}</td>&ndash;%&gt;--%>
															<%--<td class="editText">--%>
																<%--<input type="text" class="disable-input" :value="rePlan.sugg_pci" v-bind:title="rePlan.sugg_pci" readonly>--%>
																<%--<span class="editBtnGroup" style="display: none;">--%>
																<%--<button type="button" class="edit-sure"><img src="../js/IntelligentTuning/images/btn-sure.png"></button>--%>
																<%--<button type="button" class="edit-cancel"><img src="../js/IntelligentTuning/images/btn-cancel.png"></button>--%>
															<%--</span>--%>
															<%--</td>--%>
														<%--</tr>--%>
														<%--<tr v-show="rePlan.sugg_handover!='_'">--%>
															<%--<td>{{ sectorData.enodeb_id + '_' + sectorData.cell_id }}</td>--%>
															<%--<td>{{ sectorData.cell_name }}</td>--%>
															<%--<td>切换参数</td>--%>
															<%--<td>{{currentSetObj.handover}}</td>--%>
															<%--&lt;%&ndash;<td class="clickBlueText">{{planInfo.sugg_handover}}</td>&ndash;%&gt;--%>
															<%--<td class="editText">--%>
																<%--<input type="text" class="disable-input" :value="rePlan.sugg_handover" v-bind:title="rePlan.sugg_handover" readonly>--%>
																<%--<span class="editBtnGroup" style="display: none;">--%>
																<%--<button type="button" class="edit-sure"><img src="../js/IntelligentTuning/images/btn-sure.png"></button>--%>
																<%--<button type="button" class="edit-cancel"><img src="../js/IntelligentTuning/images/btn-cancel.png"></button>--%>
															<%--</span>--%>
															<%--</td>--%>
														<%--</tr>--%>
													</template>
												</table>
											</div>
										</template>
									</div>
									<div class="infoDiv">
										<div class="infoTitle">
											<span>质差小区分析：</span>
											<div class="floatRight">
												<div class="dateDiv">
													<span id="date-range4" class="startTime dateBox">2018-11-02 - 2018-11-08</span>
													<span class="triangle"></span>
												</div>
												<span id="geographic_analysis" title="地理位置分析" class="btn_mapLine" style="display: none">地理位置分析</span>
												<button class="btn-showInfo"><img src="../js/IntelligentTuning/images/showMore.png"></button>
											</div>
										</div>
										<div class="infoCotent" id="badCellAnalysisDiv">
											<div class="tabUl">
												<div class="zcColumn-type">
													<ul v-for="(zcColumn,key) in ZCAnalysisColumn">
														<template v-if="zcColumn.type != ''">
															<li @click="tabTitleSubmit($event,zcColumn)">
																<div class="tabText">{{zcColumn.type}}</div>
															</li>
														</template>
													</ul>
												</div>
												<div class="zcColumn-circle">
													<ul v-for="(zcColumn,key) in ZCAnalysisColumn">
														<template v-if="zcColumn.type != ''">
															<li v-for="zcAnalysis in ZCAnalysis" @click="tabPanSubmit($event,zcColumn,zcAnalysis)">
																<div v-if="zcAnalysis[zcColumn.column] === '异常'"><span class="circleRed"></span></div>
																<div v-else-if="zcAnalysis[zcColumn.column] === '正常'"><span class="circleGreen"></span></div>
																<div v-else-if="zcAnalysis[zcColumn.column] === '是'"><span class="circleRed"></span></div>
																<div v-else-if="zcAnalysis[zcColumn.column] === '否'"><span class="circleGreen"></span></div>
																<div v-else="zcAnalysis[zcColumn.column] === 'NULL'"><span>\</span></div>
															</li>
														</template>
														<template v-else>
															<li v-for="zcAnalysis in ZCAnalysis">{{zcAnalysis[zcColumn.column].substring(4,6)+'/'+zcAnalysis[zcColumn.column].substring(6,8)}}</li>
														</template>
													</ul>
												</div>
											</div>
											<div class="showContent">
												<div class="nameBtn dateSplit">
													<div class="inline">
														<span class="nameInfo">负荷</span>
													</div>
													<div class="posiitionRight">
														<button class="btn-showInfo">
															<img class="rotateImg" src="../js/IntelligentRoadTestV3/images/showTop5.png">
														</button>
													</div>
												</div>
											</div>
											<div class="myTabContent">
												<!--负荷-->
												<div class="myTabPan">
													<div id="tab1">
														<table id='tab1_table' class="table table-bordered">
															<thead>
															<tr>
																<td>指标名称</td>
																<td>全天最劣值</td>
															</tr>
															</thead>
															<tbody>
															<tr><td >1.1下行PRB平均利用率(%)</td><td title="一天中有3个小时大于50%，则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>[1.06]上行PRB资源利用率（业务信息）</td><td title="一天中有3个小时大于50%，则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>1.11PDCCH信道占用率(%)</td><td title="一天中有3个小时大于60%，则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>1.12PRACH信道占用率(%)</td><td title="一天中有3个小时大于60%，则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<!--新增4行  -->
															<tr><td>最大RRC连接用户数</td><td title="一天中有3个小时大于200（20M）、150（15M）、50（5M），则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>平均RRC连接用户数</td><td>0</td></tr>
															<tr><td>平均激活用户数</td><td>0</td></tr>
															<tr><td>最大激活用户数</td><td>0</td></tr>

															<tr><td>1.14寻呼信道占用率(%)</td><td>0</td></tr>
															<!-- <tr><td>1.17上行平均激活用户数</td><td>0</td></tr>
                                                            <tr><td>1.18下行平均激活用户数</td><td>0</td></tr> -->
															</tbody>
														</table>
													</div>
												</div>

												<!--空口指标-->
												<div class="myTabPan">
													<div id="tab2">
														<table id='tab2_table' class="table table-bordered">
															<thead style="backgroung:#F2F2F2">
															<tr>
																<td>分类</td>
																<td>指标名称</td>
																<td>全天最劣值</td>
															</tr>
															</thead>
															<tbody>
															<tr><td rowspan="5">RRC建立</td><td>[2.6] RRC连接建立成功率(%)</td><td title="一天24小时中有3个小时小于90%，则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>[2.61]RRC连接建立失败次数（UE无应答）</td><td>0</td></tr>
															<tr><td>2.62]RRC连接建立失败次数（小区Reject）</td><td>0</td></tr>
															<tr><td>[2.63]RRC连接建立失败次数（其它原因）</td><td>0</td></tr>
															<tr><td>2.36 RRC连接重建比例(%)</td><td title="一天24小时中有3个小时大于20%，则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td rowspan="3">UE上下文</td><td>3.3 UE上下文掉线率(%)</td><td title="一天24小时中有3个小时大于5%，则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>3.2 UE上下文正常释放次数</td><td>0</td></tr>
															<tr><td>3.1 UE上下文异常释放次数</td><td>0</td></tr>
															<tr><td rowspan="21">E-RAB性能</td><td>[2.17]E-RAB建立请求次数</td><td>0</td></tr>
															<tr><td>[2.18]E-RAB建立成功次数</td><td>0</td></tr>
															<tr><td>[2.19] E-RAB建立成功率(%)</td><td title="一天24小时中有3个小时小于90%，则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>[2.31]E-RAB建立失败次数（UE无响应）</td><td>0</td></tr>
															<tr><td>[2.32]E-RAB建立失败次数（核心网问题）</td><td>0</td></tr>
															<tr><td>[2.33]E-RAB建立失败次数（传输层问题）</td><td>0</td></tr>
															<tr><td>[2.34]E-RAB建立失败次数（无线层问题）</td><td>0</td></tr>
															<tr><td>[2.35]E-RAB建立失败次数（无线资源不足）</td><td>0</td></tr>
															<tr><td>[2.36]E-RAB建立失败次数（安全模式配置失败）</td><td>0</td></tr>
															<tr><td>[2.37]E-RAB建立失败次数（其它原因）</td><td>0</td></tr>
															<tr><td>3.5 E-RAB正常释放次数</td><td>0</td></tr>
															<tr><td>3.4 E-RAB异常释放次数</td><td>0</td></tr>
															<tr><td>3.6 E-RAB掉线率(%)</td><td title="一天24小时中有3个小时大于10%，则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>[3.41]E-RAB异常释放次数（核心网问题）</td><td>0</td></tr>
															<tr><td>[3.42]E-RAB异常释放次数（传输层问题）</td><td>0</td></tr>
															<tr><td>[3.43]E-RAB异常释放次数（网络拥塞）</td><td>0</td></tr>
															<tr><td>[3.44]E-RAB异常释放次数（无线层问题）</td><td>0</td></tr>
															<tr><td>[3.45]E-RAB异常释放次数（切换失败）</td><td>0</td></tr>
															<tr><td>[2.16]S1接口建立成功率(%)</td><td>0</td></tr>
															<tr><td>[2.14]S1接口建立尝试次数</td><td>0</td></tr>
															<tr><td>[2.15]S1接口建立成功次数</td><td>0</td></tr>
															<!--新增18行  -->
															<tr><td rowspan="18">切换</td><td>X2接口切换成功率(%)</td><td title="一天24小时中有3个小时小于90%，则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>X2接口切换成功次数</td><td>0</td></tr>
															<tr><td>X2接口切换请求次数</td><td>0</td></tr>

															<tr><td>S1接口切换成功率(%)</td><td title="一天24小时中有3个小时小于90%，则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>S1接口切换成功次数</td><td>0</td></tr>
															<tr><td>S1接口切换请求次数</td><td>0</td></tr>

															<tr><td>同频切换成功率(%)</td><td title="一天24小时中有3个小时小于90%，则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>同频切换成功次数</td><td>0</td></tr>
															<tr><td>同频切换请求次数</td><td>0</td></tr>

															<tr><td>异频切换成功率(%)</td><td title="一天24小时中有3个小时小于90%，则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>异频切换成功次数</td><td>0</td></tr>
															<tr><td>异频切换请求次数</td><td>0</td></tr>

															<tr><td>eNodeB内切换成功率分子</td><td>0</td></tr>
															<tr><td>eNodeB内切换成功率分母</td><td>0</td></tr>
															<tr><td>eNodeB间切换成功率分子</td><td>0</td></tr>
															<tr><td>eNodeB间切换成功率分母</td><td>0</td></tr>
															<tr><td>eNodeB内切换成功率(%)</td><td>0</td></tr>
															<tr><td>eNodeB间切换成功率(%)</td><td>0</td></tr>
															</tbody>
														</table>
													</div>
												</div>

												<!--覆盖-->
												<div class="myTabPan">
													<div id="bar_1" class="chartDiv"></div>

													<div id="tab3" style="margin-top:5px;margin-bottom:60px;">
														<table id='tab3_1_table' class="table table-bordered">
															<thead style="backgroung:#F2F2F2">
															<tr>
																<td>指标名称</td>
																<td>全天最劣值</td>
															</tr>
															</thead>
															<tbody>
															<tr><td>[2.80]CQI0上报次数</td><td>0</td></tr>
															<tr><td>[2.81]CQI1上报次数</td><td>0</td></tr>
															<tr><td>[2.82]CQI2上报次数</td><td>0</td></tr>
															<tr><td>[2.83]CQI3上报次数</td><td>0</td></tr>
															<tr><td>[2.84]CQI4上报次数</td><td>0</td></tr>
															<tr><td>[2.85]CQI5上报次数</td><td>0</td></tr>
															<tr><td>[2.86]CQI6上报次数</td><td>0</td></tr>
															<tr><td>[2.87]CQI7上报次数</td><td>0</td></tr>
															<tr><td>[2.88]CQI8上报次数</td><td>0</td></tr>
															<tr><td>[2.89]CQI9上报次数</td><td>0</td></tr>
															<tr><td>[2.90]CQI10上报次数</td><td>0</td></tr>
															<tr><td>[2.91]CQI11上报次数</td><td>0</td></tr>
															<tr><td>[2.92]CQI12上报次数</td><td>0</td></tr>
															<tr><td>[2.93]CQI13上报次数</td><td>0</td></tr>
															<tr><td>[2.94]CQI14上报次数</td><td>0</td></tr>
															<tr><td>[2.95]CQI15上报次数</td><td>0</td></tr>
															<tr><td>[2.99]平均CQI</td><td title = '全天平均值小于8 ，则显示为红色（异常），否则为绿色（正常）'>0</td></tr>
															<!--新增2行  -->
															<tr><td>CQI0~6占比</td><td>0</td></tr>
															<tr><td>CQI0~4占比</td><td>0</td></tr>
															<%--<tr><td>平均RSRP</td><td title = '全天平均值小于-110，则显示为红色（异常），否则为绿色（正常）'>0</td></tr>
                                                            <!--新增5行  -->
                                                            <tr><td>RSRP(-∞，-115)占比</td><td>0</td></tr>
                                                            <tr><td>RSRP[-115，-105)占比</td><td>0</td></tr>
                                                            <tr><td>RSRP[-105，-95)占比</td><td>0</td></tr>
                                                            <tr><td>RSRP[-95，-85)占比</td><td>0</td></tr>
                                                            <tr><td>RSRP[-85，+∞)占比</td><td>0</td></tr>--%>
															</tbody>
														</table>
													</div>

													<div id="legend">
														<%--<ul>
                                                           <li><span>覆盖情况：</span></li>
                                                           <li class="myTabActive"><a href="javascript:;">x&lt; -119无覆盖</a></li>
                                                           <li><a href="javascript:;">-119&lt; =x&lt; -115</a></li>
                                                           <li><a href="javascript:;">-115&lt; =x&lt; -105</a></li>
                                                           <li><a href="javascript:;">-105&lt; =x&lt; -95</a></li>
                                                           <li><a href="javascript:;">-95&lt; =x&lt; -85</a></li>
                                                           <li><a href="javascript:;">-85&lt; =x</a></li>
                                                       </ul>--%>
													</div>

													<div id="bar_2" class="chartDiv"></div>


													<div id="tab3_2">
														<table id='tab3_2_table'  class="table table-bordered">
															<thead>
															<tr>
																<td>指标名称</td>
																<td>全天最劣值</td>
															</tr>
															</thead>
															<tbody>
															<tr><td>平均接入距离（米）</td><td title="大于5000米显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>接入距离234米内用户平均RSRP（dBm）</td><td title="小于-105 dBm显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>平均RSRP（单位：dBm）</td><td title="小于-110 dBm，则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>RSRP(-∞，-115)占比</td><td>0</td></tr>
															<tr><td>RSRP[-115，-105)占比</td><td>0</td></tr>
															<tr><td>RSRP[-105，-95)占比</td><td>0</td></tr>
															<tr><td>RSRP[-95，-85)占比</td><td>0</td></tr>
															<tr><td>RSRP[-85，+∞)占比</td><td>0</td></tr>

															</tbody>
														</table>
													</div>

												</div>

												<!--干扰-->
												<div class="myTabPan">
													<div id="tab4">
														<table id='tab4_table' class="table table-bordered">
															<thead>
															<tr>
																<td>指标名称</td>
																<td>全天最劣值</td>
															</tr>
															</thead>
															<tbody>
															<tr><td>[8.1]RSSI平均值(dBm)</td><td title="一天24小时中有3个小时大于-80，则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>平均每PRB干扰噪声平均值(dBm)</td><td title="一天24小时中有3个小时大于-100，则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>信道干扰噪声(dBm)</td><td>0</td></tr>
															</tbody>
														</table>
													</div>
												</div>

												<!--空口感知-->
												<div class="myTabPan">
													<div id="tab5">
														<table id='tab5_table' class="table table-bordered">
															<thead>
															<tr>
																<td>指标名称</td>
																<td>全天最劣值</td>
															</tr>
															</thead>
															<tbody>
															<tr><td>[5.2]PDCP层总流量(MB)</td><td>0</td></tr>
															<tr><td>5.3PDCP层下行流量(MB)</td><td>0</td></tr>
															<tr><td>5.1PDCP层上行流量(MB)</td><td>0</td></tr>
															<tr><td>[5.13]用户体验上行平均速率(Mbps)</td><td>0</td></tr>
															<tr><td>[5.14]用户体验下行平均速率(Mbps)</td><td title="一天中有3个小时小于8Mbps（15M和20M带宽）2Mbps（其他带宽），则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>[6.7]用户面下行平均时延(ms)</td><td title="一天24小时中有3个小时大于100，则显示为红色（异常），否则为绿色（正常）">0</td></tr>
															<tr><td>6.4空口下行用户面丢包率(%)</td><td>0</td></tr>
															</tbody>
														</table>
													</div>
												</div>

												<!--繁忙度-->
												<div class="myTabPan">
													<div id="line" class="chartDiv"></div>
												</div>

												<!--用户-->
												<div class="myTabPan">
													<div id='tab7'>
														<table id='tab7_table' class="table table-bordered">
															<thead>
															<tr>
																<td>序号</td>
																<td>用户号码</td>
																<td>纪录总数</td>
																<td>质差纪录数</td>
																<td>第三次握手时延均值（ms）</td>
																<td>第三次ACK与HTTP GET时延均值(ms)</td>
																<td>平均RSRP(dBm)</td>
																<td>累计会话时长(分钟)</td>
															</tr>
															</thead>
															<tbody>

															</tbody>
														</table>


													</div>
												</div>

												<!--告警-->
												<div class="myTabPan">
													<div id='tab8'>
														<%--<table id='tab8_table' class="table table-bordered">
                                                            <thead>
                                                            <tr>
                                                                <td>序号</td>
                                                                <td>用户号码</td>
                                                                <td>纪录总数</td>
                                                                <td>质差纪录数</td>
                                                                <td>第三次握手时延均值（ms）</td>
                                                                <td>第三次ACK与HTTP GET时延均值(ms)</td>
                                                                <td>平均RSRP(dBm)</td>
                                                                <td>累计会话时长(分钟)</td>
                                                            </tr>
                                                            </thead>
                                                            <tbody>

                                                            </tbody>
                                                        </table>--%>

													</div>
												</div>
											</div>

											<div class="wrap_Dialog">
												<ul id="legend_Dialog" class="tab_li_Dialog">
													<li style="cursor:pointer" class="active">首屏</li>
													<li style="cursor:pointer">视频下载</li>
													<li style="cursor:pointer">视频卡顿</li>
													<li style="cursor:pointer">即时消息</li>
													<li style="cursor:pointer">游戏</li>
												</ul>
												<div id="leg_Dialog">
													<ul>
														<li><label>优良率：(</label></li>
														<li><span style="background: #800000;"></span> 60以下</li>
														<li><span style="background: #ff0000;"></span> 60%-70%</li>
														<li><span style="background: #ff9900;"></span> 70%-80%</li>
														<li><span style="background: #ffff00;"></span> 80%-90%</li>
														<li><span style="background: #53ff1a;"></span> 90%以上)</li>
													</ul>
												</div>
												<div id="bad_detailLine" style="height:300px;width:100%;"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="listBottom showListBottom">
						<button type="button" class="showListInfo">
							<img src="../js/IntelligentTuning/images/showMore.png">
							<span>收起</span>
						</button>
						<div class="dataUpdateTime">数据最近更新时间：<span id="lastUpdateTime"></span></div>
						<div class="searchText"id="currentShowWhatMessage">在[ 广州] 范围搜索 <span style="color: #f7f213;">弱覆盖</span></div>
					</div>
				</div>
			</div>
		</div>
		<!-- 覆盖质量图例-- -->
		<ul id="colorLegen" class="colorBar colorLegen" style="display: none;">
			<li class="map-w colorText">
				<div class="boxSelectionImg">
					<span class="colorBarText" id="level_0">主接入场强 AGPS-MR(dBm)</span>
					<span class="triangle"></span>
				</div>
				<div class="progressLegen"></div>
				<ul class="boxSelectionUl">
					<li class="active" data-gridIndex="1"><label>AGPS-MR 主接入场强(dBm)</label></li>
					<li data-gridIndex="5">AGPS-MR 下行速率（Mbps）</li>
					<li data-gridIndex="2">AGPS-MR 越区覆盖（%）</li>
					<li data-gridIndex="3">AGPS-MR 重叠覆盖（%）</li>
					<li data-gridIndex="4">AGPS-MR MOD3干扰（%）</li>
				</ul>
			</li>
			<li class="map-w-i level_1" id="level_1" style="background-color: rgb(0, 153, 0);">优(-85,0)</li>
			<li class="map-w-i level_2" id="level_2" style="background-color: rgb(0, 176, 240);">良(-95,-85]</li>
			<li class="map-w-i level_3" id="level_3" style="background-color: rgb(0, 112, 192);">中(-105,-95]</li>
			<li class="map-w-i level_4" id="level_4" style="background-color: rgb(255, 192, 0);">差(-115,-105]</li>
			<li class="map-w-i level_5" id="level_5" style="background-color: rgb(192, 0, 0);">极差(-140,-115]</li>
			<li class="map-w-i level_6" id="level_6" style="background-color: #bb10c4;">记录数≤3</li>
		</ul>
		<!-- /覆盖质量图例-- -->
		<!-- 越区、重叠、mod3图例-- -->
		<ul id="colorLegenCov" class="colorBar colorLegen" style="display: none;">
			<li class="map-w colorText">图例</li>
			<li class="map-w-i level_1" id="level_1" style="background-color: rgb(0, 153, 0);">优[0,10%]</li>
			<li class="map-w-i level_2" id="level_2" style="background-color: rgb(0, 176, 240);">良(10%,20%]</li>
			<li class="map-w-i level_3" id="level_3" style="background-color: rgb(0, 112, 192);">中(20%,30%]</li>
			<li class="map-w-i level_4" id="level_4" style="background-color: rgb(255, 192, 0);">差(30%,40%]</li>
			<li class="map-w-i level_5" id="level_5" style="background-color: rgb(192, 0, 0);">极差(40%,+∞]</li>
			<li class="map-w-i level_6" id="level_6" style="background-color: #bb10c4;">记录数≤3</li>
		</ul>
		<!--/越区、重叠、mod3图例-- -->
		<!-- 正在加载数据弹框--start -->
		<div class="progressBox" id = "loadingDiv">
			<div class="progressDiv">
				<div class="progressLoading">
					<div class="load-imgText">
						<img src="../images/loading.gif" />
						<div>正在玩命加载，请稍候!</div>
					</div>
					<button type="button" class="closeProgress">
						<img src="../images/closeChart.png"/>
					</button>
				</div>
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
<!-- 增加progressbarTwo的查询数据同步方法 -->
<script type="text/javascript" src="../js/progressbarTwo.js?2017022803" defer></script>
<script type="text/javascript" src="../js/util/callBackChangeData.js?2017060611" defer></script>
<script type="text/javascript" src="../js/echarts/echarts.min.js" charset="utf-8" defer></script>
<script type="text/javascript" src="../js/util/baidumap_offline_v3.js"></script>
<script type="text/javascript" src="../js/util/BMapUtil-new.js"></script>
<script src="../js/util/vue.js" defer></script> <%--vue的js文件--%>
<script src="../js/util/dateUtil.js"></script> <%--vue的js文件--%>
<script type="text/javascript" src="../js/util/moment.min.js"></script>
<script type="text/javascript" src="../js/util/jquery.daterangepicker.js"></script>
<script type="text/javascript" src="../js/crossfilter/crossfilter.js"></script>
<script type="text/javascript" src="../js/tableTools/tableToolsNewTwo.js"></script>
<script type="text/javascript"  src="../js/IntelligentTuning/IntelligentTuning.js"></script>
<script type="text/javascript"  src="../js/IntelligentTuning/main.js"></script>
<script type="text/javascript"  src="../js/IntelligentTuning/IntelligentTuningSearch.js"></script>

<script type="text/javascript" src="../js/util/GridMapControl.js?201706788566" defer></script>
<script type="text/javascript" src="../js/util/GridHelper.js" async="true"></script>
<script type="text/javascript" src="../js/IntelligentTuning/myBMapTypeControl.js" defer></script>
<script type="text/javascript" src="../js/util/GPSUtil.js" async="true"></script>
<script type="text/javascript" src="../js/util/BMapUtil-Measure.js" async="true"></script>
<script type="text/javascript" src="../js/util/BMapUtil-Conversion.js" async="true"></script>
<script type="text/javascript" src="../js/util/GeoUtils.js" async="true"></script>
<script type="text/javascript" src="../js/util/SectorUtilForBaidu.js" defer></script>
<script type="text/javascript" src="../js/util/DrawingManager.js" defer></script>
<script type="text/javascript" src="../js/IntelligentTuning/initAndGetData.js"></script>
<script type="text/javascript" src="../js/IntelligentTuning/IntelligentTuningMap.js"></script>
<script type="text/javascript" src="../js/IntelligentTuning/IntelligentTuningPlan.js"></script>
<script type="text/javascript" src="../js/IntelligentTuning/IntelligentTuningZCAnalysis.js"></script>
<script type="text/javascript" src="../js/IntelligentTuning/IntelligentTuningChart.js"></script>
<script type="text/javascript" src="../js/IntelligentTuning/IntelligentTuningBoxSelection.js"></script>
<script type="text/javascript" src="../js/IntelligentTuning/IntelligentTuningScreen.js"></script>

