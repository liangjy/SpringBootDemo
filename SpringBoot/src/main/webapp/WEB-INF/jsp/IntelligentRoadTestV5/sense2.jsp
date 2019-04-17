<%--
  Created by IntelliJ IDEA.
  User: lcj
  Date: 2018/2/26
  Time: 9:03
  放置智能路测V2版本的场景类目的jsp
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%--高校开始--%>
<div class="listDiv" id="showCollegeList" style="display: none;">
    <div class="listWrap">
        <div class="searchTitle">在“广州”天河区域内搜索</div>
        <ul class="listTopUl">
            <li class="selectCity" id="collegeSelectCity">
                <div class="select-name selectCity-name">
                    <img src="../js/IntelligentRoadTest/images/nor_add.png" class="name-icon">
                    <span class="city-selected" id="collegeCityName">广州</span>
                    <span class="city-selected-gt">&gt;</span>
					<span class="district-selected" id="collegeDistrictName">全市</span>
					<span class="mktcenter-selected-gt">&gt;</span>
					<span class="mktcenter-selected" id="collegeMktName">全区</span>
                    <span class="triangle"></span>
                </div>
                <div class="select-info city-info" style="display: none;">
                    <ul id="collegeSelectCityList" class="threeLevel"></ul>
                </div>
            </li>
            <li class="classify">
                <div class="select-name" ><span id="collegeListSelectName">全部分类</span><span class="triangle"></span></div>
                <div class="select-info" id="collegeList">
                    <div class="flexRow">
                        <div class="flexCol">全部分类</div>
                        <div class="flexCol selected">全部</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否含有弱区</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否派单</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                </div>
            </li>
            <li class="recomendSort" id="collegeSort">
                <div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
                <div class="select-info">
                    <ul class="sortUl" >
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
        <div class="listDivWrap" id="showCollegeDiv">
            <ul class="listUL">
                <li v-for = "(item , index , key ) in collegeList" class="cursor" @click = "showMessage(item ,index)" v-on:mouseover = "turnMk(index,item)">
                    <div class="colDiv">
                        <span class="numSpan" v-cloak>{{ index + 1  }}</span>
                        <span class="bold" v-cloak>名称：{{ item.esbh_name }}</span>
                        <span class="positionRight" v-if="item.audit_stat == '待审核' && isAuditor == true" v-cloak>申请中</span>
                        <span class="positionRight" v-else-if="item.audit_stat != '待审核'&& item.audit_status == '编辑中' && isAuditor == true" v-cloak>编辑中</span>
                        <span class="positionRight" v-else v-cloak>&nbsp;</span>
                    </div>
                    <div class="colDiv">
                        <span v-if="item.rsrp_avg == null || item.rsrp_avg == ''">RSRP均值：&nbsp;</span>
                        <span v-else v-cloak>RSRP均值：{{ item.rsrp_avg }}</span>
                        <span class="paiSpan" v-if="item.alarm_id != null && item.alarm_id != ''"><img class="" src="../js/IntelligentRoadTestV3/images/pai.png"></span>
                    </div>
                    <div class="colDiv">
                        <span>覆盖率：</span>
                        <span v-if="item.cover_rate == null || item.cover_rate == ''">&nbsp;</span>
                        <span v-else v-cloak>{{ item.cover_rate }}%</span>
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
                        第<input class="page-num" type="text" id="collegePage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
                        <input  type="hidden">
                    </div>
                    <div class="page-pagination">
                        <a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
                        <a href="javascript:;" class="last-active" v-on:click="goLast"></a>
                    </div>
                    <div>
                        <a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTest/images/111_11.png"></a>
                    </div>
                </div>
                <div class="page-info" id="collegeCountMessage" <%--style="display: none;"--%>>
                    <%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
                    共<span v-cloak>{{ totalCounts }}</span>条数据
                </div>
            </div>
        </div>
    </div>

    <div class="detailList">
        <div class="backList" id="collegeCount"> &lt; 返回上一级</div>
        <div class="detailListDiv" id="showCollegeCompleteMessage">
            <div class="infoHeader">
                <div class="brDiv">
                    <span  v-cloak>
                        区域编号：{{ collegeData.esbh_id }}
                        <button id="collegePosition" class="positionDivBtn" v-on:click="collegePosition(collegeData)">
                            <img class="" src="../js/IntelligentRoadTestV3/images/white_position.png?20180516.png" title="定位">
                        </button>
                        <!--  v-show="isShowAlarmInfo == true" -->
                         <button  class="positionDivBtn showBtn positionClass" v-on:click="showPolygonGrid(collegeData,$event)">
                            <img class="imgClass" src="../js/IntelligentRoadTest/images/showP.png" title="显示">
                        </button>
                    </span>
                    <%--<span  class="fRight" v-cloak>创建者：{{ collegeData.creator }}</span>--%>
                </div>
                <div class="brDiv">
                    <span v-cloak>区域类型：{{ collegeData.esbh_type  }}</span>
                    <span class="fRight" v-cloak>地市：{{ collegeData.city }}</span>
                </div>
                <div class="brDiv">
                    <span  v-cloak>区域名称：{{ collegeData.esbh_name }}</span>
                    <span class="fRight" v-cloak>{{ collegeData.day }}</span>
                </div>
            </div>
            <ul class="infoBody">
                <li>
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <div class="positionRight screenClass">
                                <button type="button" class="btn-bg btn-edit" v-on:click="openScreenCompared(collegeData)">分屏对比</button>
                            </div>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li>
                            <div id="collegeLineChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="collegeAllChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="collegeIndoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="collegeOutdoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li >
                            <div id="collegeSecondChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="collegeAllChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="collegeIndoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="collegeOutdoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap" v-show="isShowAlarmInfo == true">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/change7.png">
                            <span class="nameInfo">{{ alaram_title }}</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li id="collegeChartDiv">
                            <div id="collegeChart" class="chartDiv"></div>
                        </li>
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警产生日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.alarm_time }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警恢复日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="alarm_dataObj.recover_time != null && alarm_dataObj.recover_time != ''">{{ alarm_dataObj.recover_time }}</span>
                                <span class="" v-cloak style="color:red" v-else>未恢复</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.alarm_time }}弱栅格数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_grid_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.day }}弱栅格恢复数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_reco_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap nrTop5Cell">
                    <div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">附近扇区</span>
                        </div>
                        <div class="inline" v-if="collegeData.isHasSameSector != true">未就近接入</div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,collegeData,1)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
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
                            <img class="cursor" src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">接入扇区</span>
                        </div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,collegeData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo searchRecentCell" style="display: none;">
                        <li class="cellInfoWrap" v-for="(data , index , key) in mrTop5Cell">
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
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">KPI指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="gotoListPage" title="进入KPI列表" v-on:click="gotoKPIList(collegeData)"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="collegeData.lte_to_3g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">下切数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ collegeData.lte_to_3g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="collegeData.user_4g_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ collegeData.user_4g_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="collegeData.flow_4g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">流量(MB)</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ collegeData.flow_4g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">AGPS覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
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
                                <span class="blueInfo" v-if="collegeData.cover_rate == null || collegeData.cover_rate == '' ">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ collegeData.cover_rate }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="collegeData.ce_good_ratio_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">感知优良率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ (collegeData.ce_good_ratio_avg * 100).toFixed(2)}}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">AGPS记录数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ collegeData.rsrp_140_0_cnt }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">RSRP均值</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="collegeData.rsrp_avg == null || collegeData.rsrp_avg == ''">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ collegeData.rsrp_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">栅格数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ collegeData.all_grid_nums }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap liIndex">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/detail_index.png">
                            <span class="nameInfo">全量MR覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap" v-for="object in allMRDataList">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">{{ object.name }}</span>
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
                                        <span class="nameInfo">覆盖率</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.cover_rate == null || object.cover_rate == '' ">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.cover_rate }}%</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">MR记录数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.mr_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.mr_count }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">RSRP均值</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.rsrp_avg == null || object.rsrp_avg == ''">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.rsrp_avg }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">栅格数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.grid_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.grid_count }}</span>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_poor.png">
                            <span class="nameInfo">附近弱区</span>
                        </div>
                        <div class="floatRight">
                            <%--<span class="areaNumSpan">附近弱覆盖区域数：<span class="areaNum">{{ nearPoorAreaListData.length }}</span></span>--%>
                            <button class="linkCell" title="显示连线" v-on:click="showLinkPoorArea($event,collegeData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul  class="ulDetailInfo">
                        <li class="cellInfoWrap groupInfoWrap">
                            <div class="groupText">附近弱覆盖区域数 ：<span class="areaNum" v-cloak>{{ nearPoorAreaListData.length }}</span></div>
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
                            <ul id='fjrq_1' class="cellInfoDiv groupInfo fjrq">
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
                <%--<li class="liWrap  &lt;%&ndash;noshow&ndash;%&gt;">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/detail_kpiRate.png">
                            <span class="nameInfo">感知速率</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV3/images/showTop5.png">
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
                            <div class="colDiv fLeft">
                                <span class="nameInfo">KPI感知上行速率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="collegeData.min_userex_upavgrate != null">{{ collegeData.min_userex_upavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">KPI感知下行速率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="collegeData.min_userex_dwavgrate != null">{{ collegeData.min_userex_dwavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>--%>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_position.png">
                            <span class="nameInfo">百度坐标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li >
                            <div class="colDiv fLeft">
                                <span class="nameInfo">中心点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ collegeData.longitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">中心点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ collegeData.latitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_layer.png">
                            <span class="nameInfo">图层修改</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">最新版本时间：</span>
                                <span class="lastVersionTime"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">修改者姓名：</span>
                                <span class="lastVersionEditerName"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">查看历史版本：</span>
                                <select class="histroySelect">
                                    <option value="请选择">请选择</option>
                                </select>
                            </div>
                        </li>
                        <li class="systemLayerBottonLi">
                            <div class="colDiv layerBtns">
                            	<button type="button" class="btn-bg btn-redraw" v-on:click="redrawSystemLayer(collegeData,$event)" >重绘</button>
                                <button type="button" class="btn-bg btn-canceled" v-on:click="cancelSystemLayer(collegeData,$event)" >取消</button>
                                <button type="button" class="btn-bg btn-edit" v-on:click="editSystemLayer(collegeData)" >编辑</button>
                                <button type="button" class="btn-bg btn-revoke" v-on:click="resetSystemLayer(collegeData,$event)" >还原</button>
                                <button type="button" class="btn-bg btn-saves" v-on:click="saveSystemLayer(collegeData)" >保存</button>
                                <button type="button" class="btn-bg btn-submit" v-on:click="commitSystemLayer(collegeData)" >提交</button>
                                <button type="button" class="btn-bg btn-revoke btnRevoke revoverBtn" v-on:click="recoverSystemLayer(collegeData)"  style="display: none;">撤销</button>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="colDiv systemLayerDelete">
                        <button class="btn-bg deleteButton" v-on:click="deleteSystemLayer(collegeData)">删除</button>
                    </div>
                    <div class="colDiv systemLayerDeleteEnd">
                        <button class="btn-bg deleteButtonEnd">已删除</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
<%--高校结束--%>
<%--场馆开始--%>
<div class="listDiv" id="showSiteList" style="display: none;">
    <div class="listWrap">
        <div class="searchTitle">在“广州”天河区域内搜索</div>
        <ul class="listTopUl">
            <li class="selectCity" id="siteSelectCity">
                <div class="select-name selectCity-name">
                    <img src="../js/IntelligentRoadTest/images/nor_add.png" class="name-icon">
                    <span class="city-selected" id="siteCityName">广州</span>
                    <span class="city-selected-gt">&gt;</span>
                    <span class="district-selected" id="siteCityDistrictName">全市</span>
                    <span class="mktcenter-selected-gt">&gt;</span>
                    <span class="mktcenter-selected" id="siteCityMktName">全区</span>
                    <span class="triangle"></span>
                </div>
                <div class="select-info city-info" style="display: none;">
                    <ul id="siteSelectCityList" class="threeLevel"></ul>
                </div>
            </li>
            <li class="classify">
                <div class="select-name" ><span id="siteListSelectName">全部分类</span><span class="triangle"></span></div>
                <div class="select-info" id="siteList">
                    <div class="flexRow">
                        <div class="flexCol">全部分类</div>
                        <div class="flexCol selected">全部</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否含有弱区</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否派单</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                </div>
            </li>
            <li class="recomendSort" id="siteSort">
                <div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
                <div class="select-info">
                    <ul class="sortUl" >
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
        <div class="listDivWrap" id="showSiteDiv">
            <ul class="listUL">
                <li v-for = "(item , index , key ) in siteList" class="cursor" @click = "showMessage(item ,index)" v-on:mouseover = "turnMk(index,item)">
                    <div class="colDiv">
                        <span class="numSpan" v-cloak>{{ index + 1  }}</span>
                        <span class="bold" v-cloak>名称：{{ item.esbh_name }}</span>
                        <span class="positionRight" v-if="item.audit_stat == '待审核' && isAuditor == true" v-cloak>申请中</span>
                        <span class="positionRight" v-else-if="item.audit_stat != '待审核'&& item.audit_status == '编辑中' && isAuditor == true" v-cloak>编辑中</span>
                        <span class="positionRight" v-else v-cloak>&nbsp;</span>
                    </div>
                    <div class="colDiv">
                        <span v-if="item.rsrp_avg == null || item.rsrp_avg == ''">RSRP均值：&nbsp;</span>
                        <span v-else v-cloak>RSRP均值：{{ item.rsrp_avg }}</span>
                        <span class="paiSpan" v-if="item.alarm_id != null && item.alarm_id != ''"><img class="" src="../js/IntelligentRoadTestV3/images/pai.png"></span>
                    </div>
                    <div class="colDiv">
                        <span v-if="item.cover_rate == null || item.cover_rate == ''">覆盖率：&nbsp;</span>
                        <span v-else v-cloak>覆盖率：{{ item.cover_rate }}%</span>
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
                        第<input class="page-num" type="text" id="sitePage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
                        <input  type="hidden">
                    </div>
                    <div class="page-pagination">
                        <a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
                        <a href="javascript:;" class="last-active" v-on:click="goLast"></a>
                    </div>
                    <div>
                        <a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTest/images/111_11.png"></a>
                    </div>
                </div>
                <div class="page-info" id="siteCountMessage" <%--style="display: none;"--%>>
                    <%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
                    共<span v-cloak>{{ totalCounts }}</span>条数据
                </div>
            </div>
        </div>
    </div>

    <div class="detailList">
        <div class="backList" id="siteCount"> &lt; 返回上一级</div>
        <div class="detailListDiv" id="showSiteCompleteMessage">
            <div class="infoHeader">
                <div class="brDiv">
                    <span v-cloak>
                        区域编号：{{ siteData.esbh_id }}
                        <button id="sitePosition" class="positionDivBtn" v-on:click="sitePosition(siteData)">
                            <img class="" src="../js/IntelligentRoadTestV3/images/white_position.png?20180516.png" title="定位">
                        </button>
                        <button  class="positionDivBtn showBtn positionClass" v-on:click="showPolygonGrid(siteData,$event)">
						      <img class="imgClass" src="../js/IntelligentRoadTest/images/showP.png" title="显示">
						</button>
                    </span>
                    <%--<span  class="fRight" v-cloak>创建者：{{ siteData.creator }}</span>--%>
                </div>
                <div class="brDiv">
                    <span v-cloak>区域类型：{{ siteData.esbh_type  }}</span>
                    <span class="fRight" v-cloak>地市：{{ siteData.city }}</span>
                </div>
                <div class="brDiv">
                    <span  v-cloak>区域名称：{{ siteData.esbh_name }}</span>
                    <span class="fRight" v-cloak>{{ siteData.day }}</span>
                </div>
            </div>
            <ul class="infoBody">
                <li>
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li>
                            <div id="siteLineChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="siteAllChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="siteIndoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="siteOutdoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li>
                            <div id="siteSecondChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="siteAllChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="siteIndoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="siteOutdoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap" v-show="isShowAlarmInfo == true">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/change7.png">
                            <span class="nameInfo">{{ alaram_title }}</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li id="siteChartDiv">
                            <div id="siteChart" class="chartDiv"></div>
                        </li>
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警产生日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.alarm_time }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警恢复日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="alarm_dataObj.recover_time != null && alarm_dataObj.recover_time != ''">{{ alarm_dataObj.recover_time }}</span>
                                <span class="" v-cloak style="color:red" v-else>未恢复</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.alarm_time }}弱栅格数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_grid_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.day }}弱栅格恢复数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_reco_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap nrTop5Cell">
                    <div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">附近扇区</span>
                        </div>
                        <div class="inline" v-if="siteData.isHasSameSector != true">未就近接入</div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,siteData,1)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
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
                            <img class="cursor" src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">接入扇区</span>
                        </div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,siteData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo searchRecentCell" style="display: none;">
                        <li class="cellInfoWrap" v-for="(data , index , key) in mrTop5Cell">
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
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">KPI指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="gotoListPage" title="进入KPI列表" v-on:click="gotoKPIList(siteData)"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="siteData.lte_to_3g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">下切数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ siteData.lte_to_3g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="siteData.user_4g_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ siteData.user_4g_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="siteData.flow_4g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">流量(MB)</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ siteData.flow_4g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">AGPS覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
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
                                <span class="blueInfo" v-if="siteData.cover_rate == null || siteData.cover_rate == '' ">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ siteData.cover_rate }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="siteData.ce_good_ratio_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">感知优良率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ (siteData.ce_good_ratio_avg * 100).toFixed(2)}}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">AGPS记录数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ siteData.rsrp_140_0_cnt }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">RSRP均值</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="siteData.rsrp_avg == null || siteData.rsrp_avg == ''">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ siteData.rsrp_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">栅格数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ siteData.all_grid_nums }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap liIndex">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/detail_index.png">
                            <span class="nameInfo">全量MR覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap" v-for="object in allMRDataList">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">{{ object.name }}</span>
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
                                        <span class="nameInfo">覆盖率</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.cover_rate == null || object.cover_rate == '' ">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.cover_rate }}%</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">MR记录数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.mr_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.mr_count }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">RSRP均值</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.rsrp_avg == null || object.rsrp_avg == ''">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.rsrp_avg }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">栅格数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.grid_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.grid_count }}</span>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_poor.png">
                            <span class="nameInfo">附近弱区</span>
                        </div>
                        <div class="floatRight">
                            <%--<span class="areaNumSpan">附近弱覆盖区域数：<span class="areaNum">{{ nearPoorAreaListData.length }}</span></span>--%>
                            <button class="linkCell" title="显示连线" v-on:click="showLinkPoorArea($event,siteData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul  class="ulDetailInfo">
                        <li class="cellInfoWrap groupInfoWrap">
                            <div class="groupText">附近弱覆盖区域数 ：<span class="areaNum" v-cloak>{{ nearPoorAreaListData.length }}</span></div>
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
                            <ul id='fjrq_8' class="cellInfoDiv groupInfo fjrq">
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
                <%-- <li class="liWrap  &lt;%&ndash;noshow&ndash;%&gt;">
                     <div class="nameBtn" v-on:click="showDetailInfo($event)">
                         <div class="inline">
                             <img src="../js/IntelligentRoadTestV3/images/detail_kpiRate.png">
                             <span class="nameInfo">感知速率</span>
                         </div>
                         <div class="floatRight">
                             <button class="btn-showInfo">
                                 <img src="../js/IntelligentRoadTestV3/images/showTop5.png">
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
                             <div class="colDiv fLeft">
                                 <span class="nameInfo">KPI感知上行速率</span>
                             </div>
                             <div class="colDiv">
                                 <span class="blueInfo" v-cloak v-if="siteData.min_userex_upavgrate != null">{{ siteData.min_userex_upavgrate }} Mbps</span>
                             </div>
                             <div class="colDiv"></div>
                         </li>
                         <li >
                             <div class="colDiv">
                                 <span class="nameInfo">KPI感知下行速率</span>
                             </div>
                             <div class="colDiv">
                                 <span class="blueInfo" v-cloak v-if="siteData.min_userex_dwavgrate != null">{{ siteData.min_userex_dwavgrate }} Mbps</span>
                             </div>
                             <div class="colDiv"></div>
                         </li>
                     </ul>
                 </li>--%>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_position.png">
                            <span class="nameInfo">百度坐标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li >
                            <div class="colDiv fLeft">
                                <span class="nameInfo">中心点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ siteData.longitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">中心点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ siteData.latitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_layer.png">
                            <span class="nameInfo">图层修改</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">最新版本时间：</span>
                                <span class="lastVersionTime"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">修改者姓名：</span>
                                <span class="lastVersionEditerName"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">查看历史版本：</span>
                                <select class="histroySelect">
                                    <option value="请选择">请选择</option>
                                </select>
                            </div>
                        </li>
                        <li class="systemLayerBottonLi">
                            <div class="colDiv layerBtns">
                                <button type="button" class="btn-bg btn-redraw" v-on:click="redrawSystemLayer(siteData,$event)" >重绘</button>
                                <button type="button" class="btn-bg btn-canceled" v-on:click="cancelSystemLayer(siteData,$event)" >取消</button>
                                <button type="button" class="btn-bg btn-edit" v-on:click="editSystemLayer(siteData)" >编辑</button>
                                <button type="button" class="btn-bg btn-revoke" v-on:click="resetSystemLayer(siteData,$event)" >还原</button>
                                <button type="button" class="btn-bg btn-saves" v-on:click="saveSystemLayer(siteData)" >保存</button>
                                <button type="button" class="btn-bg btn-submit" v-on:click="commitSystemLayer(siteData)" >提交</button>
                                <button type="button" class="btn-bg btn-revoke btnRevoke revoverBtn" v-on:click="recoverSystemLayer(siteData)"  style="display: none;">撤销</button>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="colDiv systemLayerDelete">
                        <button class="btn-bg deleteButton" v-on:click="deleteSystemLayer(siteData)">删除</button>
                    </div>
                    <div class="colDiv systemLayerDeleteEnd">
                        <button class="btn-bg deleteButtonEnd">已删除</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
<%--场馆结束--%>
<%--高密度住宅区开始--%>
<div class="listDiv" id="showUptownList" style="display: none;">
    <div class="listWrap">
        <div class="searchTitle">在“广州”天河区域内搜索</div>
        <ul class="listTopUl">
            <li class="selectCity" id="uptownSelectCity">
                <div class="select-name selectCity-name">
                    <img src="../js/IntelligentRoadTest/images/nor_add.png" class="name-icon">
                    <span class="city-selected" id="uptownCityName">广州</span>
                    <span class="city-selected-gt">&gt;</span>
					<span class="district-selected" id="uptownDistrictName">全市</span>
					<span class="mktcenter-selected-gt">&gt;</span>
					<span class="mktcenter-selected" id="uptownMktName">全区</span>
                    <span class="triangle"></span>
                </div>
                <div class="select-info city-info" style="display: none;">
                    <ul id="uptownSelectCityList" class="threeLevel"></ul>
                </div>
            </li>
            <li class="classify">
                <div class="select-name" ><span id="uptownSelectName">全部分类</span><span class="triangle"></span></div>
                <div class="select-info" id="uptownList">
                    <div class="flexRow">
                        <div class="flexCol">全部分类</div>
                        <div class="flexCol selected">全部</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否含有弱区</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否派单</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                </div>
            </li>
            <li class="recomendSort" id="uptownSort">
                <div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
                <div class="select-info">
                    <ul class="sortUl" >
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
        <div class="listDivWrap" id="showUptownDiv">
            <ul class="listUL">
                <li v-for = "(item , index , key ) in uptownList" class="cursor" @click = "showMessage(item ,index)" v-on:mouseover = "turnMk(index,item)">
                    <div class="colDiv">
                        <span class="numSpan" v-cloak>{{ index + 1  }}</span>
                        <span class="bold" v-cloak>名称：{{ item.esbh_name }}</span>
                        <span class="positionRight" v-if="item.audit_stat == '待审核' && isAuditor == true" v-cloak>申请中</span>
                        <span class="positionRight" v-else-if="item.audit_stat != '待审核'&& item.audit_status == '编辑中' && isAuditor == true" v-cloak>编辑中</span>
                        <span class="positionRight" v-else v-cloak>&nbsp;</span>
                    </div>
                    <div class="colDiv">
                        <span v-if="item.rsrp_avg == null || item.rsrp_avg == ''">RSRP均值：&nbsp;</span>
                        <span v-else v-cloak>RSRP均值：{{ item.rsrp_avg }}</span>
                        <span class="paiSpan" v-if="item.alarm_id != null && item.alarm_id != ''"><img class="" src="../js/IntelligentRoadTestV3/images/pai.png"></span>
                    </div>
                    <div class="colDiv">
                        <span v-if="item.cover_rate == null || item.cover_rate == ''">覆盖率：&nbsp;</span>
                        <span v-else v-cloak>覆盖率：{{ item.cover_rate }}%</span>
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
                        第<input class="page-num" type="text" id="uptownPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
                        <input  type="hidden">
                    </div>
                    <div class="page-pagination">
                        <a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
                        <a href="javascript:;" class="last-active" v-on:click="goLast"></a>
                    </div>
                    <div>
                        <a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTest/images/111_11.png"></a>
                    </div>
                </div>
                <div class="page-info" id="uptownCountMessage" <%--style="display: none;"--%>>
                    <%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
                    共<span v-cloak>{{ totalCounts }}</span>条数据
                </div>
            </div>
        </div>
    </div>

    <div class="detailList">
        <div class="backList" id="uptownCount"> &lt; 返回上一级</div>
        <div class="detailListDiv" id="showUptownCompleteMessage">
            <div class="infoHeader">
                <div class="brDiv">
                    <span v-cloak>
                        区域编号：{{ uptownData.esbh_id }}
                        <button id="uptownPosition" class="positionDivBtn" v-on:click="uptownPosition(uptownData)">
                            <img class="" src="../js/IntelligentRoadTestV3/images/white_position.png?20180516.png" title="定位">
                        </button>
                         <button  class="positionDivBtn showBtn positionClass" v-on:click="showPolygonGrid(uptownData,$event)">
						      <img class="imgClass" src="../js/IntelligentRoadTest/images/showP.png" title="显示">
						</button>
                    </span>
                    <%--<span  class="fRight" v-cloak>创建者：{{ uptownData.creator }}</span>--%>
                </div>
                <div class="brDiv">
                    <span v-cloak>区域类型：{{ uptownData.esbh_type  }}</span>
                    <span class="fRight" v-cloak>地市：{{ uptownData.city }}</span>
                </div>
                <div class="brDiv">
                    <span v-cloak>区域名称：{{ uptownData.esbh_name }}</span>
                    <span class="fRight" v-cloak>{{ uptownData.day }}</span>
                </div>
            </div>
            <ul class="infoBody">
                <li>
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li>
                            <div id="uptownLineChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="uptownAllChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="uptownIndoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="uptownOutdoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li>
                            <div id="uptownSecondChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="uptownAllChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="uptownIndoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="uptownOutdoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap" v-show="isShowAlarmInfo == true">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/change7.png">
                            <span class="nameInfo">{{ alaram_title }}</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li id="uptownChartDiv">
                            <div id="uptownChart" class="chartDiv"></div>
                        </li>
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警产生日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.alarm_time }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警恢复日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="alarm_dataObj.recover_time != null && alarm_dataObj.recover_time != ''">{{ alarm_dataObj.recover_time }}</span>
                                <span class="" v-cloak style="color:red" v-else>未恢复</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.alarm_time }}弱栅格数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_grid_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.day }}弱栅格恢复数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_reco_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap nrTop5Cell">
                    <div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">附近扇区</span>
                        </div>
                        <div class="inline" v-if="uptownData.isHasSameSector != true">未就近接入</div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,uptownData,1)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
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
                            <img class="cursor" src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">接入扇区</span>
                        </div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,uptownData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo searchRecentCell" style="display: none;">
                        <li class="cellInfoWrap" v-for="(data , index , key) in mrTop5Cell">
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
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">KPI指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="gotoListPage" title="进入KPI列表" v-on:click="gotoKPIList(uptownData)"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="uptownData.lte_to_3g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">下切数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ uptownData.lte_to_3g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="uptownData.user_4g_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ uptownData.user_4g_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="uptownData.flow_4g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">流量(MB)</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ uptownData.flow_4g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">AGPS覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
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
                                <span class="blueInfo" v-if="uptownData.cover_rate == null || uptownData.cover_rate == '' ">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ uptownData.cover_rate }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="uptownData.ce_good_ratio_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">感知优良率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ (uptownData.ce_good_ratio_avg * 100).toFixed(2)}}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">AGPS记录数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ uptownData.rsrp_140_0_cnt }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">RSRP均值</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="uptownData.rsrp_avg == null || uptownData.rsrp_avg == '' ">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ uptownData.rsrp_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">栅格数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ uptownData.all_grid_nums }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap liIndex">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/detail_index.png">
                            <span class="nameInfo">全量MR覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap" v-for="object in allMRDataList">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">{{ object.name }}</span>
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
                                        <span class="nameInfo">覆盖率</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.cover_rate == null || object.cover_rate == '' ">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.cover_rate }}%</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">MR记录数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.mr_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.mr_count }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">RSRP均值</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.rsrp_avg == null || object.rsrp_avg == ''">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.rsrp_avg }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">栅格数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.grid_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.grid_count }}</span>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_poor.png">
                            <span class="nameInfo">附近弱区</span>
                        </div>
                        <div class="floatRight">
                            <%--<span class="areaNumSpan">附近弱覆盖区域数：<span class="areaNum">{{ nearPoorAreaListData.length }}</span></span>--%>
                            <button class="linkCell" title="显示连线" v-on:click="showLinkPoorArea($event,uptownData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul  class="ulDetailInfo">
                        <li class="cellInfoWrap groupInfoWrap">
                            <div class="groupText">附近弱覆盖区域数 ：<span class="areaNum" v-cloak>{{ nearPoorAreaListData.length }}</span></div>
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
                            <ul id='fjrq_2' class="cellInfoDiv groupInfo fjrq">
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
                <%--<li class="liWrap  &lt;%&ndash;noshow&ndash;%&gt;">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/detail_kpiRate.png">
                            <span class="nameInfo">感知速率</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV3/images/showTop5.png">
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
                            <div class="colDiv fLeft">
                                <span class="nameInfo">KPI感知上行速率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="uptownData.min_userex_upavgrate != null">{{ uptownData.min_userex_upavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">KPI感知下行速率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="uptownData.min_userex_dwavgrate != null">{{ uptownData.min_userex_dwavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>--%>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_position.png">
                            <span class="nameInfo">百度坐标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li >
                            <div class="colDiv fLeft">
                                <span class="nameInfo">中心点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ uptownData.longitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">中心点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ uptownData.latitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_layer.png">
                            <span class="nameInfo">图层修改</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">最新版本时间：</span>
                                <span class="lastVersionTime"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">修改者姓名：</span>
                                <span class="lastVersionEditerName"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">查看历史版本：</span>
                                <select class="histroySelect">
                                    <option value="请选择">请选择</option>
                                </select>
                            </div>
                        </li>
                        <li class="systemLayerBottonLi">
                            <div class="colDiv layerBtns">
                                <button type="button" class="btn-bg btn-redraw" v-on:click="redrawSystemLayer(uptownData,$event)" >重绘</button>
                                <button type="button" class="btn-bg btn-canceled" v-on:click="cancelSystemLayer(uptownData,$event)" >取消</button>
                                <button type="button" class="btn-bg btn-edit" v-on:click="editSystemLayer(uptownData)">编辑</button>
                                <button type="button" class="btn-bg btn-revoke" v-on:click="resetSystemLayer(uptownData,$event)" >还原</button>
                                <button type="button" class="btn-bg btn-saves" v-on:click="saveSystemLayer(uptownData)">保存</button>
                                <button type="button" class="btn-bg btn-submit" v-on:click="commitSystemLayer(uptownData)" >提交</button>
                                <button type="button" class="btn-bg btn-revoke btnRevoke revoverBtn" v-on:click="recoverSystemLayer(uptownData)"  style="display: none;">撤销</button>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="colDiv systemLayerDelete">
                        <button class="btn-bg deleteButton" v-on:click="deleteSystemLayer(uptownData)">删除</button>
                    </div>
                    <div class="colDiv systemLayerDeleteEnd">
                        <button class="btn-bg deleteButtonEnd">已删除</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
<%--高密度住宅区结束--%>
<%--美食开始--%>
<div class="listDiv" id="showFoodList" style="display: none;">
    <div class="listWrap">
        <div class="searchTitle">在“广州”天河区域内搜索</div>
        <ul class="listTopUl">
            <li class="selectCity" id="foodSelectCity">
                <div class="select-name selectCity-name">
                    <img src="../js/IntelligentRoadTest/images/nor_add.png" class="name-icon">
                    <span class="city-selected" id="foodCityName">广州</span>
                    <span class="city-selected-gt">&gt;</span>
					<span class="district-selected" id="foodDistrictName">全市</span>
					<span class="mktcenter-selected-gt">&gt;</span>
					<span class="mktcenter-selected" id="foodMktName">全区</span>
                    <span class="triangle"></span>
                </div>
                <div class="select-info city-info" style="display: none;">
                    <ul id="foodSelectCityList" class="threeLevel"></ul>
                </div>
            </li>
            <li class="classify">
                <div class="select-name" ><span id="foodListSelectName">全部分类</span><span class="triangle"></span></div>
                <div class="select-info" id="foodList">
                    <div class="flexRow">
                        <div class="flexCol">全部分类</div>
                        <div class="flexCol selected">全部</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否含有弱区</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否派单</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                </div>
            </li>
            <li class="recomendSort" id="foodSort">
                <div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
                <div class="select-info">
                    <ul class="sortUl" >
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
        <div class="listDivWrap" id="showFoodDiv">
            <ul class="listUL">
                <li v-for = "(item , index , key ) in foodList" class="cursor" @click = "showMessage(item ,index)" v-on:mouseover = "turnMk(index,item)">
                    <div class="colDiv">
                        <span class="numSpan" v-cloak>{{ index + 1  }}</span>
                        <span class="bold" v-cloak>名称：{{ item.esbh_name }}</span>
                        <span class="positionRight" v-if="item.audit_stat == '待审核' && isAuditor == true" v-cloak>申请中</span>
                        <span class="positionRight" v-else-if="item.audit_stat != '待审核'&& item.audit_status == '编辑中' && isAuditor == true" v-cloak>编辑中</span>
                        <span class="positionRight" v-else v-cloak>&nbsp;</span>
                    </div>
                    <div class="colDiv">
                        <span v-if="item.rsrp_avg == null || item.rsrp_avg == ''">RSRP均值：&nbsp;</span>
                        <span v-else v-cloak>RSRP均值：{{ item.rsrp_avg }}</span>
                        <span class="paiSpan" v-if="item.alarm_id != null && item.alarm_id != ''"><img class="" src="../js/IntelligentRoadTestV3/images/pai.png"></span>
                    </div>
                    <div class="colDiv">
                        <span v-if="item.cover_rate == null || item.cover_rate == ''">覆盖率：&nbsp;</span>
                        <span v-else v-cloak>覆盖率：{{ item.cover_rate }}%</span>
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
                        第<input class="page-num" type="text" id="foodPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
                        <input  type="hidden">
                    </div>
                    <div class="page-pagination">
                        <a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
                        <a href="javascript:;" class="last-active" v-on:click="goLast"></a>
                    </div>
                    <div>
                        <a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTest/images/111_11.png"></a>
                    </div>
                </div>
                <div class="page-info" id="foodCountMessage" <%--style="display: none;"--%>>
                    <%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
                    共<span v-cloak>{{ totalCounts }}</span>条数据
                </div>
            </div>
        </div>
    </div>

    <div class="detailList">
        <div class="backList" id="foodCount"> &lt; 返回上一级</div>
        <div class="detailListDiv" id="showFoodCompleteMessage">
            <div class="infoHeader">
                <div class="brDiv">
                    <span v-cloak>
                        区域编号：{{ foodData.esbh_id }}
                        <button id="foodPosition" class="positionDivBtn" v-on:click="foodPosition(foodData)">
                            <img class="" src="../js/IntelligentRoadTestV3/images/white_position.png?20180516.png" title="定位">
                        </button>
                         <button  class="positionDivBtn showBtn positionClass" v-on:click="showPolygonGrid(foodData,$event)">
						      <img class="imgClass" src="../js/IntelligentRoadTest/images/showP.png" title="显示">
						</button>
                    </span>
                    <%--<span  class="fRight" v-cloak>创建者：{{ foodData.creator }}</span>--%>
                </div>
                <div class="brDiv">
                    <span v-cloak>区域类型：{{ foodData.esbh_type  }}</span>
                    <span class="fRight" v-cloak>地市：{{ foodData.city }}</span>
                </div>
                <div class="brDiv">
                    <span v-cloak>区域名称：{{ foodData.esbh_name }}</span>
                    <span class="fRight" v-cloak>{{ foodData.day }}</span>
                </div>
            </div>
            <ul class="infoBody">
                <li>
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li>
                            <div id="foodLineChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="foodAllChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="foodIndoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="foodOutdoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li>
                            <div id="foodSecondChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="foodAllChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="foodIndoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="foodOutdoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap" v-show="isShowAlarmInfo == true">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/change7.png">
                            <span class="nameInfo">{{ alaram_title }}</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li id="foodChartDiv">
                            <div id="foodChart" class="chartDiv"></div>
                        </li>
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警产生日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.alarm_time }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警恢复日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="alarm_dataObj.recover_time != null && alarm_dataObj.recover_time != ''">{{ alarm_dataObj.recover_time }}</span>
                                <span class="" v-cloak style="color:red" v-else>未恢复</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.alarm_time }}弱栅格数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_grid_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.day }}弱栅格恢复数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_reco_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap nrTop5Cell">
                    <div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">附近扇区</span>
                        </div>
                        <div class="inline" v-if="foodData.isHasSameSector != true">未就近接入</div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,foodData,1)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
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
                            <img class="cursor" src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">接入扇区</span>
                        </div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,foodData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo searchRecentCell" style="display: none;">
                        <li class="cellInfoWrap" v-for="(data , index , key) in mrTop5Cell">
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
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">KPI指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="gotoListPage" title="进入KPI列表" v-on:click="gotoKPIList(foodData)"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="foodData.lte_to_3g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">下切数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ foodData.lte_to_3g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="foodData.user_4g_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ foodData.user_4g_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="foodData.flow_4g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">流量(MB)</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ foodData.flow_4g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">AGPS覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
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
                                <span class="blueInfo" v-if="foodData.cover_rate == null || foodData.cover_rate == '' ">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ foodData.cover_rate }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="foodData.ce_good_ratio_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">感知优良率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ (foodData.ce_good_ratio_avg * 100).toFixed(2)}}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">AGPS记录数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ foodData.rsrp_140_0_cnt }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">RSRP均值</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="foodData.rsrp_avg == null || foodData.rsrp_avg == '' ">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ foodData.rsrp_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">栅格数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ foodData.all_grid_nums }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap liIndex">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/detail_index.png">
                            <span class="nameInfo">全量MR覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap" v-for="object in allMRDataList">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">{{ object.name }}</span>
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
                                        <span class="nameInfo">覆盖率</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.cover_rate == null || object.cover_rate == '' ">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.cover_rate }}%</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">MR记录数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.mr_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.mr_count }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">RSRP均值</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.rsrp_avg == null || object.rsrp_avg == ''">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.rsrp_avg }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">栅格数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.grid_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.grid_count }}</span>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_poor.png">
                            <span class="nameInfo">附近弱区</span>
                        </div>
                        <div class="floatRight">
                            <%--<span class="areaNumSpan">附近弱覆盖区域数：<span class="areaNum">{{ nearPoorAreaListData.length }}</span></span>--%>
                            <button class="linkCell" title="显示连线" v-on:click="showLinkPoorArea($event,foodData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul  class="ulDetailInfo">
                        <li class="cellInfoWrap groupInfoWrap">
                            <div class="groupText">附近弱覆盖区域数 ：<span class="areaNum" v-cloak>{{ nearPoorAreaListData.length }}</span></div>
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
                            <ul id='fjrq_7' class="cellInfoDiv groupInfo fjrq">
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
                <%--<li class="liWrap  &lt;%&ndash;noshow&ndash;%&gt;">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/detail_kpiRate.png">
                            <span class="nameInfo">感知速率</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV3/images/showTop5.png">
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
                            <div class="colDiv fLeft">
                                <span class="nameInfo">KPI感知上行速率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="foodData.min_userex_upavgrate != null">{{ foodData.min_userex_upavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">KPI感知下行速率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="foodData.min_userex_dwavgrate != null">{{ foodData.min_userex_dwavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>--%>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_position.png">
                            <span class="nameInfo">百度坐标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li >
                            <div class="colDiv fLeft">
                                <span class="nameInfo">中心点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ foodData.longitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">中心点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ foodData.latitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_layer.png">
                            <span class="nameInfo">图层修改</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">最新版本时间：</span>
                                <span class="lastVersionTime"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">修改者姓名：</span>
                                <span class="lastVersionEditerName"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">查看历史版本：</span>
                                <select class="histroySelect">
                                    <option value="请选择">请选择</option>
                                </select>
                            </div>
                        </li>
                        <li class="systemLayerBottonLi">
                            <div class="colDiv layerBtns">
                                <button type="button" class="btn-bg btn-redraw" v-on:click="redrawSystemLayer(foodData,$event)" >重绘</button>
                                <button type="button" class="btn-bg btn-canceled" v-on:click="cancelSystemLayer(foodData,$event)" >取消</button>
                                <button type="button" class="btn-bg btn-edit" v-on:click="editSystemLayer(foodData)" >编辑</button>
                                <button type="button" class="btn-bg btn-revoke" v-on:click="resetSystemLayer(foodData,$event)" >还原</button>
                                <button type="button" class="btn-bg btn-saves" v-on:click="saveSystemLayer(foodData)" >保存</button>
                                <button type="button" class="btn-bg btn-submit" v-on:click="commitSystemLayer(foodData)" >提交</button>
                                <button type="button" class="btn-bg btn-revoke btnRevoke revoverBtn" v-on:click="recoverSystemLayer(foodData)"  style="display: none;">撤销</button>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="colDiv systemLayerDelete">
                        <button class="btn-bg deleteButton" v-on:click="deleteSystemLayer(foodData)">删除</button>
                    </div>
                    <div class="colDiv systemLayerDeleteEnd">
                        <button class="btn-bg deleteButtonEnd">已删除</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
<%--美食结束--%>
<%--美景开始--%>
<div class="listDiv" id="showSceneryList" style="display: none;">
    <div class="listWrap">
        <div class="searchTitle">在“广州”天河区域内搜索</div>
        <ul class="listTopUl">
            <li class="selectCity" id="scenerySelectCity">
                <div class="select-name selectCity-name">
                    <img src="../js/IntelligentRoadTest/images/nor_add.png" class="name-icon">
                    <span class="city-selected" id="sceneryName">广州</span>
                    <span class="city-selected-gt">&gt;</span>
					<span class="district-selected" id="sceneryDistrictName">全市</span>
					<span class="mktcenter-selected-gt">&gt;</span>
					<span class="mktcenter-selected" id="sceneryMktName">全区</span>
                    <span class="triangle"></span>
                </div>
                <div class="select-info city-info" style="display: none;">
                    <ul id="scenerySelectCityList" class="threeLevel"></ul>
                </div>
            </li>
            <li class="classify">
                <div class="select-name" ><span id="sceneryListSelectName">全部分类</span><span class="triangle"></span></div>
                <div class="select-info" id="sceneryList">
                    <div class="flexRow">
                        <div class="flexCol">全部分类</div>
                        <div class="flexCol selected">全部</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否含有弱区</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否派单</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                </div>
            </li>
            <li class="recomendSort" id="scenerySort">
                <div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
                <div class="select-info">
                    <ul class="sortUl" >
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
        <div class="listDivWrap" id="showSceneryDiv">
            <ul class="listUL">
                <li v-for = "(item , index , key ) in sceneryList" class="cursor" @click = "showMessage(item ,index)" v-on:mouseover = "turnMk(index,item)">
                    <div class="colDiv">
                        <span class="numSpan" v-cloak>{{ index + 1  }}</span>
                        <span class="bold" v-cloak>名称：{{ item.esbh_name }}</span>
                        <span class="positionRight" v-if="item.audit_stat == '待审核' && isAuditor == true" v-cloak>申请中</span>
                        <span class="positionRight" v-else-if="item.audit_stat != '待审核'&& item.audit_status == '编辑中' && isAuditor == true" v-cloak>编辑中</span>
                        <span class="positionRight" v-else v-cloak>&nbsp;</span>
                    </div>
                    <div class="colDiv">
                        <span v-if="item.rsrp_avg == null || item.rsrp_avg == ''">RSRP均值：&nbsp;</span>
                        <span v-else v-cloak>RSRP均值：{{ item.rsrp_avg }}</span>
                        <span class="paiSpan" v-if="item.alarm_id != null && item.alarm_id != ''"><img class="" src="../js/IntelligentRoadTestV3/images/pai.png"></span>
                    </div>
                    <div class="colDiv">
                        <span v-if="item.cover_rate == null || item.cover_rate == ''">覆盖率：&nbsp;</span>
                        <span v-else v-cloak>覆盖率：{{ item.cover_rate }}%</span>
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
                        第<input class="page-num" type="text" id="sceneryPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
                        <input  type="hidden">
                    </div>
                    <div class="page-pagination">
                        <a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
                        <a href="javascript:;" class="last-active" v-on:click="goLast"></a>
                    </div>
                    <div>
                        <a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTest/images/111_11.png"></a>
                    </div>
                </div>
                <div class="page-info" id="sceneryCountMessage" <%--style="display: none;"--%>>
                    <%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
                    共<span v-cloak>{{ totalCounts }}</span>条数据
                </div>
            </div>
        </div>
    </div>

    <div class="detailList">
        <div class="backList" id="sceneryCount"> &lt; 返回上一级</div>
        <div class="detailListDiv" id="showSceneryCompleteMessage">
            <div class="infoHeader">
                <div class="brDiv">
                    <span v-cloak>
                        区域编号：{{ sceneryData.esbh_id }}
                        <button id="sceneryPosition" class="positionDivBtn" v-on:click="sceneryPosition(sceneryData)">
                            <img class="" src="../js/IntelligentRoadTestV3/images/white_position.png?20180516.png" title="定位">
                        </button>
                        <button  class="positionDivBtn showBtn positionClass" v-on:click="showPolygonGrid(sceneryData,$event)">
						      <img class="imgClass" src="../js/IntelligentRoadTest/images/showP.png" title="显示">
						</button>
                    </span>
                    <%--<span  class="fRight" v-cloak>创建者：{{ sceneryData.creator }}</span>--%>
                </div>
                <div class="brDiv">
                    <span v-cloak>区域类型：{{ sceneryData.esbh_type  }}</span>
                    <span class="fRight" v-cloak>地市：{{ sceneryData.city }}</span>
                </div>
                <div class="brDiv">
                    <span  v-cloak>区域名称：{{ sceneryData.esbh_name }}</span>
                    <span class="fRight" v-cloak>{{ sceneryData.day }}</span>
                </div>
            </div>
            <ul class="infoBody">
                <li>
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li>
                            <div id="sceneryLineChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="sceneryAllChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="sceneryIndoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="sceneryOutdoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li>
                            <div id="scenerySecondChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="sceneryAllChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="sceneryIndoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="sceneryOutdoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap" v-show="isShowAlarmInfo == true">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/change7.png">
                            <span class="nameInfo">{{ alaram_title }}</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li id="sceneryChartDiv">
                            <div id="sceneryChart" class="chartDiv"></div>
                        </li>
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警产生日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.alarm_time }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警恢复日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="alarm_dataObj.recover_time != null && alarm_dataObj.recover_time != ''">{{ alarm_dataObj.recover_time }}</span>
                                <span class="" v-cloak style="color:red" v-else>未恢复</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.alarm_time }}弱栅格数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_grid_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.day }}弱栅格恢复数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_reco_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap nrTop5Cell">
                    <div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">附近扇区</span>
                        </div>
                        <div class="inline" v-if="sceneryData.isHasSameSector != true">未就近接入</div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,sceneryData,1)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
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
                            <img class="cursor" src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">接入扇区</span>
                        </div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,sceneryData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo searchRecentCell" style="display: none;">
                        <li class="cellInfoWrap" v-for="(data , index , key) in mrTop5Cell">
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
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">KPI指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="gotoListPage" title="进入KPI列表" v-on:click="gotoKPIList(sceneryData)"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="sceneryData.lte_to_3g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">下切数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ sceneryData.lte_to_3g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="sceneryData.user_4g_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ sceneryData.user_4g_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="sceneryData.flow_4g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">流量(MB)</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ sceneryData.flow_4g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">AGPS覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
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
                                <span class="blueInfo" v-if="sceneryData.cover_rate == null || sceneryData.cover_rate == ''">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ sceneryData.cover_rate }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="sceneryData.ce_good_ratio_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">感知优良率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ (sceneryData.ce_good_ratio_avg * 100).toFixed(2)}}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">AGPS记录数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ sceneryData.rsrp_140_0_cnt }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">RSRP均值</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="sceneryData.rsrp_avg == null || sceneryData.rsrp_avg == ''">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ sceneryData.rsrp_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">栅格数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ sceneryData.all_grid_nums }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap liIndex">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/detail_index.png">
                            <span class="nameInfo">全量MR覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap" v-for="object in allMRDataList">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">{{ object.name }}</span>
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
                                        <span class="nameInfo">覆盖率</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.cover_rate == null || object.cover_rate == '' ">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.cover_rate }}%</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">MR记录数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.mr_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.mr_count }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">RSRP均值</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.rsrp_avg == null || object.rsrp_avg == ''">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.rsrp_avg }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">栅格数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.grid_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.grid_count }}</span>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_poor.png">
                            <span class="nameInfo">附近弱区</span>
                        </div>
                        <div class="floatRight">
                            <%--<span class="areaNumSpan">附近弱覆盖区域数：<span class="areaNum">{{ nearPoorAreaListData.length }}</span></span>--%>
                            <button class="linkCell" title="显示连线" v-on:click="showLinkPoorArea($event,sceneryData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul  class="ulDetailInfo">
                        <li class="cellInfoWrap groupInfoWrap">
                            <div class="groupText">附近弱覆盖区域数 ：<span class="areaNum" v-cloak>{{ nearPoorAreaListData.length }}</span></div>
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
                            <ul id='fjrq_3' class="cellInfoDiv groupInfo fjrq">
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
               <%-- <li class="liWrap  &lt;%&ndash;noshow&ndash;%&gt;">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/detail_kpiRate.png">
                            <span class="nameInfo">感知速率</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV3/images/showTop5.png">
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
                            <div class="colDiv fLeft">
                                <span class="nameInfo">KPI感知上行速率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="sceneryData.min_userex_upavgrate != null">{{ sceneryData.min_userex_upavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">KPI感知下行速率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="sceneryData.min_userex_dwavgrate != null">{{ sceneryData.min_userex_dwavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>--%>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_position.png">
                            <span class="nameInfo">百度坐标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li >
                            <div class="colDiv fLeft">
                                <span class="nameInfo">中心点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ sceneryData.longitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">中心点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ sceneryData.latitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_layer.png">
                            <span class="nameInfo">图层修改</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">最新版本时间：</span>
                                <span class="lastVersionTime"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">修改者姓名：</span>
                                <span class="lastVersionEditerName"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">查看历史版本：</span>
                                <select class="histroySelect">
                                    <option value="请选择">请选择</option>
                                </select>
                            </div>
                        </li>
                        <li class="systemLayerBottonLi">
                            <div class="colDiv layerBtns">
                                <button type="button" class="btn-bg btn-redraw" v-on:click="redrawSystemLayer(sceneryData,$event)" >重绘</button>
                                <button type="button" class="btn-bg btn-canceled" v-on:click="cancelSystemLayer(sceneryData,$event)" >取消</button>
                                <button type="button" class="btn-bg btn-edit" v-on:click="editSystemLayer(sceneryData)" >编辑</button>
                                <button type="button" class="btn-bg btn-revoke" v-on:click="resetSystemLayer(sceneryData,$event)" >还原</button>
                                <button type="button" class="btn-bg btn-saves" v-on:click="saveSystemLayer(sceneryData)" >保存</button>
                                <button type="button" class="btn-bg btn-submit" v-on:click="commitSystemLayer(sceneryData)" >提交</button>
                                <button type="button" class="btn-bg btn-revoke btnRevoke revoverBtn" v-on:click="recoverSystemLayer(sceneryData)"  style="display: none;">撤销</button>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="colDiv systemLayerDelete">
                        <button class="btn-bg deleteButton" v-on:click="deleteSystemLayer(sceneryData)">删除</button>
                    </div>
                    <div class="colDiv systemLayerDeleteEnd">
                        <button class="btn-bg deleteButtonEnd">已删除</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
<%--美景结束--%>
<%--高流量商务区开始--%>
<div class="listDiv" id="showBusinessList" style="display: none;">
    <div class="listWrap">
        <div class="searchTitle">在“广州”天河区域内搜索</div>
        <ul class="listTopUl">
            <li class="selectCity" id="businessSelectCity">
                <div class="select-name selectCity-name">
                    <img src="../js/IntelligentRoadTest/images/nor_add.png" class="name-icon">
                    <span class="city-selected" id="businessCityName">广州</span>
                    <span class="city-selected-gt">&gt;</span>
					<span class="district-selected" id="businessDistrictName">全市</span>
					<span class="mktcenter-selected-gt">&gt;</span>
					<span class="mktcenter-selected" id="businessMktName">全区</span>
                    <span class="triangle"></span>
                </div>
                <div class="select-info city-info" style="display: none;">
                    <ul id="businessSelectCityList" class="threeLevel"></ul>
                </div>
            </li>
            <li class="classify">
                <div class="select-name" ><span id="businessListSelectName">全部分类</span><span class="triangle"></span></div>
                <div class="select-info" id="businessList">
                    <div class="flexRow">
                        <div class="flexCol">全部分类</div>
                        <div class="flexCol selected">全部</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否含有弱区</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否派单</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                </div>
            </li>
            <li class="recomendSort" id="businessSort">
                <div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
                <div class="select-info">
                    <ul class="sortUl" >
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
        <div class="listDivWrap" id="showBusinessDiv">
            <ul class="listUL">
                <li v-for = "(item , index , key ) in businessList" class="cursor" @click = "showMessage(item ,index)" v-on:mouseover = "turnMk(index,item)">
                    <div class="colDiv">
                        <span class="numSpan" v-cloak>{{ index + 1  }}</span>
                        <span class="bold" v-cloak>名称：{{ item.esbh_name }}</span>
                        <span class="positionRight" v-if="item.audit_stat == '待审核' && isAuditor == true" v-cloak>申请中</span>
                        <span class="positionRight" v-else-if="item.audit_stat != '待审核'&& item.audit_status == '编辑中' && isAuditor == true" v-cloak>编辑中</span>
                        <span class="positionRight" v-else v-cloak>&nbsp;</span>
                    </div>
                    <div class="colDiv">
                        <span v-if="item.rsrp_avg == null || item.rsrp_avg == ''">RSRP均值：&nbsp;</span>
                        <span v-else v-cloak>RSRP均值：{{ item.rsrp_avg }}</span>
                        <span class="paiSpan" v-if="item.alarm_id != null && item.alarm_id != ''"><img class="" src="../js/IntelligentRoadTestV3/images/pai.png"></span>
                    </div>
                    <div class="colDiv">
                        <span v-if="item.cover_rate == null || item.cover_rate == ''">覆盖率：&nbsp;</span>
                        <span v-else v-cloak>覆盖率：{{ item.cover_rate }}%</span>
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
                        第<input class="page-num" type="text" id="businessPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
                        <input  type="hidden">
                    </div>
                    <div class="page-pagination">
                        <a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
                        <a href="javascript:;" class="last-active" v-on:click="goLast"></a>
                    </div>
                    <div>
                        <a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTest/images/111_11.png"></a>
                    </div>
                </div>
                <div class="page-info" id="businessCountMessage" <%--style="display: none;"--%>>
                    <%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
                    共<span v-cloak>{{ totalCounts }}</span>条数据
                </div>
            </div>
        </div>
    </div>

    <div class="detailList">
        <div class="backList" id="businessCount"> &lt; 返回上一级</div>
        <div class="detailListDiv" id="showBusinessCompleteMessage">
            <div class="infoHeader">
                <div class="brDiv">
                    <span v-cloak>
                        区域编号：{{ businessData.esbh_id }}
                        <button id="businessPosition" class="positionDivBtn" v-on:click="businessPosition(businessData)">
                            <img class="" src="../js/IntelligentRoadTestV3/images/white_position.png?20180516.png" title="定位">
                        </button>
                         <button  class="positionDivBtn showBtn positionClass" v-on:click="showPolygonGrid(businessData,$event)">
						      <img class="imgClass" src="../js/IntelligentRoadTest/images/showP.png" title="显示">
						</button>
                    </span>
                    <%--<span  class="fRight" v-cloak>创建者：{{ businessData.creator }}</span>--%>
                </div>
                <div class="brDiv">
                    <span v-cloak>区域类型：{{ businessData.esbh_type  }}</span>
                    <span class="fRight" v-cloak>地市：{{ businessData.city }}</span>
                </div>
                <div class="brDiv">
                    <span  v-cloak>区域名称：{{ businessData.esbh_name }}</span>
                    <span class="fRight" v-cloak>{{ businessData.day }}</span>
                </div>
            </div>
            <ul class="infoBody">
                <li>
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li>
                            <div id="businessLineChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="businessAllChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="businessIndoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="businessOutdoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li>
                            <div id="businessSecondChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="businessAllChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="businessIndoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="businessOutdoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap" v-show="isShowAlarmInfo == true">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/change7.png">
                            <span class="nameInfo">{{ alaram_title }}</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li id="businessChartDiv">
                            <div id="businessChart" class="chartDiv"></div>
                        </li>
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警产生日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.alarm_time }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警恢复日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="alarm_dataObj.recover_time != null && alarm_dataObj.recover_time != ''">{{ alarm_dataObj.recover_time }}</span>
                                <span class="" v-cloak style="color:red" v-else>未恢复</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.alarm_time }}弱栅格数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_grid_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.day }}弱栅格恢复数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_reco_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap nrTop5Cell">
                    <div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">附近扇区</span>
                        </div>
                        <div class="inline" v-if="businessData.isHasSameSector != true">未就近接入</div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,businessData,1)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
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
                            <img class="cursor" src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">接入扇区</span>
                        </div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,businessData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo searchRecentCell" style="display: none;">
                        <li class="cellInfoWrap" v-for="(data , index , key) in mrTop5Cell">
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
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">KPI指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="gotoListPage" title="进入KPI列表" v-on:click="gotoKPIList(businessData)"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="businessData.lte_to_3g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">下切数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ businessData.lte_to_3g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="businessData.user_4g_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ businessData.user_4g_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="businessData.flow_4g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">流量(MB)</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ businessData.flow_4g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">AGPS覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
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
                                <span class="blueInfo" v-if="businessData.cover_rate == null || businessData.cover_rate == ''">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ businessData.cover_rate }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="businessData.ce_good_ratio_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">感知优良率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ (businessData.ce_good_ratio_avg * 100).toFixed(2)}}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">AGPS记录数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ businessData.rsrp_140_0_cnt }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">RSRP均值</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="businessData.rsrp_avg == null || businessData.rsrp_avg == '' ">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ businessData.rsrp_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">栅格数</span>
                            </div>
                            <div class="colDiv">
                                <%--<span class="blueInfo" v-cloak>{{ businessData.poor_grid_nums }}</span>--%>
                                <span class="blueInfo" v-cloak>{{ businessData.all_grid_nums }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap liIndex">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/detail_index.png">
                            <span class="nameInfo">全量MR覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap" v-for="object in allMRDataList">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">{{ object.name }}</span>
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
                                        <span class="nameInfo">覆盖率</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.cover_rate == null || object.cover_rate == '' ">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.cover_rate }}%</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">MR记录数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.mr_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.mr_count }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">RSRP均值</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.rsrp_avg == null || object.rsrp_avg == ''">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.rsrp_avg }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">栅格数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.grid_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.grid_count }}</span>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_poor.png">
                            <span class="nameInfo">附近弱区</span>
                        </div>
                        <div class="floatRight">
                            <%--<span class="areaNumSpan">附近弱覆盖区域数：<span class="areaNum">{{ nearPoorAreaListData.length }}</span></span>--%>
                            <button class="linkCell" title="显示连线" v-on:click="showLinkPoorArea($event,businessData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul  class="ulDetailInfo">
                        <li class="cellInfoWrap groupInfoWrap">
                            <div class="groupText">附近弱覆盖区域数 ：<span class="areaNum" v-cloak>{{ nearPoorAreaListData.length }}</span></div>
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
                            <ul id='fjrq_4' class="cellInfoDiv groupInfo fjrq">
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
                <%--<li class="liWrap  &lt;%&ndash;noshow&ndash;%&gt;">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/detail_kpiRate.png">
                            <span class="nameInfo">感知速率</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV3/images/showTop5.png">
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
                            <div class="colDiv fLeft">
                                <span class="nameInfo">KPI感知上行速率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="businessData.min_userex_upavgrate != null">{{ businessData.min_userex_upavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">KPI感知下行速率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="businessData.min_userex_dwavgrate != null">{{ businessData.min_userex_dwavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>--%>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_position.png">
                            <span class="nameInfo">百度坐标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li >
                            <div class="colDiv fLeft">
                                <span class="nameInfo">中心点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ businessData.longitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">中心点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ businessData.latitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_layer.png">
                            <span class="nameInfo">图层修改</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">最新版本时间：</span>
                                <span class="lastVersionTime"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">修改者姓名：</span>
                                <span class="lastVersionEditerName"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">查看历史版本：</span>
                                <select class="histroySelect">
                                    <option value="请选择">请选择</option>
                                </select>
                            </div>
                        </li>
                        <li class="systemLayerBottonLi">
                            <div class="colDiv layerBtns">
                                <button type="button" class="btn-bg btn-redraw" v-on:click="redrawSystemLayer(businessData,$event)" >重绘</button>
                                <button type="button" class="btn-bg btn-canceled" v-on:click="cancelSystemLayer(businessData,$event)" >取消</button>
                                <button type="button" class="btn-bg btn-edit" v-on:click="editSystemLayer(businessData)" >编辑</button>
                                <button type="button" class="btn-bg btn-revoke" v-on:click="resetSystemLayer(businessData,$event)" >还原</button>
                                <button type="button" class="btn-bg btn-saves" v-on:click="saveSystemLayer(businessData)" >保存</button>
                                <button type="button" class="btn-bg btn-submit" v-on:click="commitSystemLayer(businessData)" >提交</button>
                                <button type="button" class="btn-bg btn-revoke btnRevoke revoverBtn" v-on:click="recoverSystemLayer(businessData)"  style="display: none;">撤销</button>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="colDiv systemLayerDelete">
                        <button class="btn-bg deleteButton" v-on:click="deleteSystemLayer(businessData)">删除</button>
                    </div>
                    <div class="colDiv systemLayerDeleteEnd">
                        <button class="btn-bg deleteButtonEnd">已删除</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
<%--高流量商务区结束--%>
<%--战狼区域开始--%>
<div class="listDiv" id="showWarwolfList" style="display: none;">
    <div class="listWrap">
        <div class="searchTitle">在“广州”天河区域内搜索</div>
        <ul class="listTopUl">
            <li class="selectCity" id="warwolfSelectCity">
                <div class="select-name selectCity-name">
                    <img src="../js/IntelligentRoadTest/images/nor_add.png" class="name-icon">
                    <span class="city-selected" id="warwolfCityName">广州</span>
                    <span class="city-selected-gt">&gt;</span>
					<span class="district-selected" id="warwolfDistrictName">全市</span>
					<span class="mktcenter-selected-gt">&gt;</span>
					<span class="mktcenter-selected" id="warwolfMktName">全区</span>
                    <span class="triangle"></span>
                </div>
                <div class="select-info city-info" style="display: none;">
                    <ul id="warwolfSelectCityList" class="threeLevel"></ul>
                </div>
            </li>
            <li class="classify">
                <div class="select-name" ><span id="warwolfSelectName">全部分类</span><span class="triangle"></span></div>
                <div class="select-info" id="warwolfList">
                    <div class="flexRow">
                        <div class="flexCol">全部分类</div>
                        <div class="flexCol selected">全部</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否含有弱区</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否派单</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                </div>
            </li>
            <li class="recomendSort" id="warwolfSort">
                <div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
                <div class="select-info">
                    <ul class="sortUl" >
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
        <div class="listDivWrap" id="showWarwolfDiv">
            <ul class="listUL">
                <li v-for = "(item , index , key ) in warwolfList" class="cursor" @click = "showMessage(item ,index)" v-on:mouseover = "turnMk(index,item)">
                    <div class="colDiv">
                        <span class="numSpan" v-cloak>{{ index + 1  }}</span>
                        <span class="bold" v-cloak>名称：{{ item.esbh_name }}</span>
                        <span class="positionRight" v-if="item.audit_stat == '待审核' && isAuditor == true" v-cloak>申请中</span>
                        <span class="positionRight" v-else-if="item.audit_stat != '待审核' && item.audit_status == '编辑中' && isAuditor == true" v-cloak>编辑中</span>
                        <span class="positionRight" v-else v-cloak>&nbsp;</span>
                    </div>
                    <div class="colDiv">
                        <span v-if="item.rsrp_avg == null || item.rsrp_avg == ''">RSRP均值：&nbsp;</span>
                        <span v-else v-cloak>RSRP均值：{{ item.rsrp_avg }}</span>
                        <span class="paiSpan" v-if="item.alarm_id != null && item.alarm_id != ''"><img class="" src="../js/IntelligentRoadTestV3/images/pai.png"></span>
                    </div>
                    <div class="colDiv">
                        <span v-if="item.cover_rate == null || item.cover_rate == ''">覆盖率：&nbsp;</span>
                        <span v-else v-cloak>覆盖率：{{ item.cover_rate }}%</span>
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
                        第<input class="page-num" type="text" id="warwolfPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
                        <input  type="hidden">
                    </div>
                    <div class="page-pagination">
                        <a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
                        <a href="javascript:;" class="last-active" v-on:click="goLast"></a>
                    </div>
                    <div>
                        <a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTest/images/111_11.png"></a>
                    </div>
                </div>
                <div class="page-info" id="warwolfCountMessage" <%--style="display: none;"--%>>
                    <%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
                    共<span v-cloak>{{ totalCounts }}</span>条数据
                </div>
            </div>
        </div>
    </div>

    <div class="detailList">
        <div class="backList" id="warwolfCount"> &lt; 返回上一级</div>
        <div class="detailListDiv" id="showWarwolfCompleteMessage">
            <div class="infoHeader">
                <div class="brDiv">
                    <span v-cloak>
                        区域编号：{{ warwolfData.esbh_id }}
                        <button id="warwolfPosition" class="positionDivBtn" v-on:click="warwolfPosition(warwolfData)">
                            <img class="" src="../js/IntelligentRoadTestV3/images/white_position.png?20180516.png" title="定位">
                        </button>
                         <button  class="positionDivBtn showBtn positionClass" v-on:click="showPolygonGrid(warwolfData,$event)">
						      <img class="imgClass" src="../js/IntelligentRoadTest/images/showP.png" title="显示">
						</button>
                    </span>
                    <%--<span  class="fRight" v-cloak>创建者：{{ warwolfData.creator }}</span>--%>
                </div>
                <div class="brDiv">
                    <span v-cloak>区域类型：战狼区域</span>
                    <span class="fRight" v-cloak>地市：{{ warwolfData.city }}</span>
                </div>
                <div class="brDiv">
                    <span  v-cloak>区域名称：{{ warwolfData.esbh_name }}</span>
                    <span class="fRight" v-cloak>{{ warwolfData.day }}</span>
                </div>
            </div>
            <ul class="infoBody">
                <li>
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li>
                            <div id="warwolfLineChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="warwolfAllChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="warwolfIndoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="warwolfOutdoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li>
                            <div id="warwolfSecondChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="warwolfAllChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="warwolfIndoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="warwolfOutdoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap" v-show="isShowAlarmInfo == true">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/change7.png">
                            <span class="nameInfo">{{ alaram_title }}</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li id="warwolfChartDiv">
                            <div id="warwolfChart" class="chartDiv"></div>
                        </li>
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警产生日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.alarm_time }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警恢复日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="alarm_dataObj.recover_time != null && alarm_dataObj.recover_time != ''">{{ alarm_dataObj.recover_time }}</span>
                                <span class="" v-cloak style="color:red" v-else>未恢复</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.alarm_time }}弱栅格数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_grid_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.day }}弱栅格恢复数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_reco_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap nrTop5Cell">
                    <div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">附近扇区</span>
                        </div>
                        <div class="inline" v-if="warwolfData.isHasSameSector != true">未就近接入</div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,warwolfData,1)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
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
                            <img class="cursor" src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">接入扇区</span>
                        </div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,warwolfData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo searchRecentCell" style="display: none;">
                        <li class="cellInfoWrap" v-for="(data , index , key) in mrTop5Cell">
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
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">KPI指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="gotoListPage" title="进入KPI列表" v-on:click="gotoKPIList(warwolfData)"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="warwolfData.lte_to_3g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">下切数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ warwolfData.lte_to_3g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="warwolfData.user_4g_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ warwolfData.user_4g_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="warwolfData.flow_4g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">流量(MB)</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ warwolfData.flow_4g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">AGPS覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
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
                                <span class="blueInfo" v-if="warwolfData.cover_rate == null || warwolfData.cover_rate == ''">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ warwolfData.cover_rate }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="warwolfData.ce_good_ratio_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">感知优良率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ (warwolfData.ce_good_ratio_avg * 100).toFixed(2)}}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">AGPS记录数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ warwolfData.rsrp_140_0_cnt }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">RSRP均值</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="warwolfData.rsrp_avg == null || warwolfData.rsrp_avg == '' ">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ warwolfData.rsrp_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">栅格数</span>
                            </div>
                            <div class="colDiv">
                                <%--<span class="blueInfo" v-cloak>{{ warwolfData.poor_grid_nums }}</span>--%>
                                <span class="blueInfo" v-cloak>{{ warwolfData.all_grid_nums }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap liIndex">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/detail_index.png">
                            <span class="nameInfo">全量MR覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap" v-for="object in allMRDataList">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">{{ object.name }}</span>
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
                                        <span class="nameInfo">覆盖率</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.cover_rate == null || object.cover_rate == '' ">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.cover_rate }}%</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">MR记录数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.mr_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.mr_count }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">RSRP均值</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.rsrp_avg == null || object.rsrp_avg == ''">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.rsrp_avg }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">栅格数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.grid_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.grid_count }}</span>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_poor.png">
                            <span class="nameInfo">附近弱区</span>
                        </div>
                        <div class="floatRight">
                            <%--<span class="areaNumSpan">附近弱覆盖区域数：<span class="areaNum">{{ nearPoorAreaListData.length }}</span></span>--%>
                            <button class="linkCell" title="显示连线" v-on:click="showLinkPoorArea($event,warwolfData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul  class="ulDetailInfo">
                        <li class="cellInfoWrap groupInfoWrap">
                            <div class="groupText">附近弱覆盖区域数 ：<span class="areaNum" v-cloak>{{ nearPoorAreaListData.length }}</span></div>
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
                            <ul id='fjrq_5' class="cellInfoDiv groupInfo fjrq">
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
               <%-- <li class="liWrap  &lt;%&ndash;noshow&ndash;%&gt;">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/detail_kpiRate.png">
                            <span class="nameInfo">感知速率</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV3/images/showTop5.png">
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
                            <div class="colDiv fLeft">
                                <span class="nameInfo">KPI感知上行速率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="warwolfData.min_userex_upavgrate != null">{{ warwolfData.min_userex_upavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">KPI感知下行速率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="warwolfData.min_userex_dwavgrate != null">{{ warwolfData.min_userex_dwavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>--%>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_position.png">
                            <span class="nameInfo">百度坐标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li >
                            <div class="colDiv fLeft">
                                <span class="nameInfo">中心点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ warwolfData.longitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">中心点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ warwolfData.latitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <!--
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_layer.png">
                            <span class="nameInfo">图层修改</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">最新版本时间：</span>
                                <span class="lastVersionTime"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">修改者姓名：</span>
                                <span class="lastVersionEditerName"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">查看历史版本：</span>
                                <select class="histroySelect">
                                    <option value="请选择">请选择</option>
                                </select>
                            </div>
                        </li>
                        <li class="systemLayerBottonLi">
                            <div class="colDiv layerBtns">
                                <button type="button" class="btn-bg btn-edit" v-on:click="editSystemLayer(warwolfData)" >编辑</button>
                                <button type="button" class="btn-bg btn-revoke" v-on:click="resetSystemLayer(warwolfData)" >还原</button>
                                <button type="button" class="btn-bg btn-saves" v-on:click="saveSystemLayer(warwolfData)" >保存</button>
                                <button type="button" class="btn-bg btn-submit" v-on:click="commitSystemLayer(warwolfData)" >提交</button>
                                <button type="button" class="btn-bg btn-revoke btnRevoke revoverBtn" v-on:click="recoverSystemLayer(warwolfData)"  style="display: none;">撤销</button>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="colDiv systemLayerDelete">
                        <button class="btn-bg deleteButton" v-on:click="deleteSystemLayer(warwolfData)">删除</button>
                    </div>
                    <div class="colDiv systemLayerDeleteEnd">
                        <button class="btn-bg deleteButtonEnd">已删除</button>
                    </div>
                </li> -->
            </ul>
        </div>
    </div>
</div>
<%--战狼区域结束--%>
<%--农贸市场开始--%>
<div class="listDiv" id="showMarketList" style="display: none;">
    <div class="listWrap">
        <div class="searchTitle">在“广州”天河区域内搜索</div>
        <ul class="listTopUl">
            <li class="selectCity" id="marketSelectCity">
                <div class="select-name selectCity-name">
                    <img src="../js/IntelligentRoadTest/images/nor_add.png" class="name-icon">
                    <span class="city-selected" id="marketCityName">广州</span>
                    <span class="city-selected-gt">&gt;</span>
					<span class="district-selected" id="marketDistrictName">全市</span>
					<span class="mktcenter-selected-gt">&gt;</span>
					<span class="mktcenter-selected" id="marketMktName">全区</span>
                    <span class="triangle"></span>
                </div>
                <div class="select-info city-info" style="display: none;">
                    <ul id="marketSelectCityList" class="threeLevel"></ul>
                </div>
            </li>
            <li class="classify">
                <div class="select-name" ><span id="marketListSelectName">全部分类</span><span class="triangle"></span></div>
                <div class="select-info" id="marketList">
                    <div class="flexRow">
                        <div class="flexCol">全部分类</div>
                        <div class="flexCol selected">全部</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否含有弱区</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否派单</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                </div>
            </li>
            <li class="recomendSort" id="marketSort">
                <div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
                <div class="select-info">
                    <ul class="sortUl" >
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
        <div class="listDivWrap" id="showMarketDiv">
            <ul class="listUL">
                <li v-for = "(item , index , key ) in marketList" class="cursor" @click = "showMessage(item ,index)" v-on:mouseover = "turnMk(index,item)">
                    <div class="colDiv">
                        <span class="numSpan" v-cloak>{{ index + 1  }}</span>
                        <span class="bold" v-cloak>名称：{{ item.esbh_name }}</span>
                        <span class="positionRight" v-if="item.audit_stat == '待审核' && isAuditor == true" v-cloak>申请中</span>
                        <span class="positionRight" v-else-if="item.audit_stat != '待审核'&& item.audit_status == '编辑中' && isAuditor == true" v-cloak>编辑中</span>
                        <span class="positionRight" v-else v-cloak>&nbsp;</span>
                    </div>
                    <div class="colDiv">
                        <span v-if="item.rsrp_avg == null || item.rsrp_avg == ''">RSRP均值：&nbsp;</span>
                        <span v-else v-cloak>RSRP均值：{{ item.rsrp_avg }}</span>
                        <span class="paiSpan" v-if="item.alarm_id != null && item.alarm_id != ''"><img class="" src="../js/IntelligentRoadTestV3/images/pai.png"></span>
                    </div>
                    <div class="colDiv">
                        <span v-if="item.cover_rate == null || item.cover_rate == ''">覆盖率：&nbsp;</span>
                        <span v-else v-cloak>覆盖率：{{ item.cover_rate }}%</span>
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
                        第<input class="page-num" type="text" id="marketPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
                        <input  type="hidden">
                    </div>
                    <div class="page-pagination">
                        <a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
                        <a href="javascript:;" class="last-active" v-on:click="goLast"></a>
                    </div>
                    <div>
                        <a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTest/images/111_11.png"></a>
                    </div>
                </div>
                <div class="page-info" id="marketCountMessage" <%--style="display: none;"--%>>
                    <%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
                    共<span v-cloak>{{ totalCounts }}</span>条数据
                </div>
            </div>
        </div>
    </div>

    <div class="detailList">
        <div class="backList" id="marketCount"> &lt; 返回上一级</div>
        <div class="detailListDiv" id="showMarketCompleteMessage">
            <div class="infoHeader">
                <div class="brDiv">
                    <span v-cloak>
                        区域编号：{{ marketData.esbh_id }}
                        <button id="marketPosition" class="positionDivBtn" v-on:click="marketPosition(marketData)">
                            <img class="" src="../js/IntelligentRoadTestV3/images/white_position.png?20180516.png" title="定位">
                        </button>
                         <button  class="positionDivBtn showBtn positionClass" v-on:click="showPolygonGrid(marketData,$event)">
						      <img class="imgClass" src="../js/IntelligentRoadTest/images/showP.png" title="显示">
						</button>
                    </span>
                    <%--<span  class="fRight" v-cloak>创建者：{{ marketData.creator }}</span>--%>
                </div>
                <div class="brDiv">
                    <span v-cloak>区域类型：{{ marketData.esbh_type  }}</span>
                    <span class="fRight" v-cloak>地市：{{ marketData.city }}</span>
                </div>
                <div class="brDiv">
                    <span  v-cloak>区域名称：{{ marketData.esbh_name }}</span>
                    <span class="fRight" v-cloak>{{ marketData.day }}</span>
                </div>
            </div>
            <ul class="infoBody">
                <li>
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li>
                            <div id="marketLineChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="marketAllChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="marketIndoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="marketOutdoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li>
                            <div id="marketSecondChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="marketAllChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="marketIndoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="marketOutdoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap" v-show="isShowAlarmInfo == true">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/change7.png">
                            <span class="nameInfo">{{ alaram_title }}</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li id="marketChartDiv">
                            <div id="marketChart" class="chartDiv"></div>
                        </li>
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警产生日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.alarm_time }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警恢复日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="alarm_dataObj.recover_time != null && alarm_dataObj.recover_time != ''">{{ alarm_dataObj.recover_time }}</span>
                                <span class="" v-cloak style="color:red" v-else>未恢复</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.alarm_time }}弱栅格数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_grid_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.day }}弱栅格恢复数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_reco_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap nrTop5Cell">
                    <div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">附近扇区</span>
                        </div>
                        <div class="inline" v-if="marketData.isHasSameSector != true">未就近接入</div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,marketData,1)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo searchRecentCell" style="display: none;">
                        <li class="cellInfoWrap" v-for="(data , index , key) in nrTop5Cell">
                            <div class="cellName" v-cloak v-on:click="gotoShowSectorMessage(data)">
                                <span>扇区名称：</span><span v-if="data.recent_cell_name == null || data.recent_cell_name == ''">--</span>
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
                            <img class="cursor" src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">接入扇区</span>
                        </div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,marketData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo searchRecentCell" style="display: none;">
                        <li class="cellInfoWrap" v-for="(data , index , key) in mrTop5Cell">
                            <div class="cellName" v-cloak v-on:click="gotoShowSectorMessage(data)">
                                <span>扇区名称：</span><span v-if="data.recent_cell_name == null || data.recent_cell_name == ''">--</span>
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
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">KPI指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="gotoListPage" title="进入KPI列表" v-on:click="gotoKPIList(marketData)"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="marketData.lte_to_3g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">下切数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ marketData.lte_to_3g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="marketData.user_4g_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ marketData.user_4g_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="marketData.flow_4g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">流量(MB)</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ marketData.flow_4g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">AGPS覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
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
											<span class="blueInfo"
                                                  v-if="marketData.cover_rate == null || marketData.cover_rate == '' ">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ marketData.cover_rate }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="marketData.ce_good_ratio_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">感知优良率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ (marketData.ce_good_ratio_avg * 100).toFixed(2) }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">AGPS记录数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ marketData.rsrp_140_0_cnt }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">RSRP均值</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="marketData.rsrp_avg == null || marketData.rsrp_avg == '' ">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ marketData.rsrp_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">栅格数</span>
                            </div>
                            <div class="colDiv">
                                <%--<span class="blueInfo" v-cloak>{{ marketData.poor_grid_nums }}</span>--%>
                                <span class="blueInfo" v-cloak>{{ marketData.all_grid_nums }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap liIndex">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/detail_index.png">
                            <span class="nameInfo">全量MR覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap" v-for="object in allMRDataList">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">{{ object.name }}</span>
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
                                        <span class="nameInfo">覆盖率</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.cover_rate == null || object.cover_rate == '' ">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.cover_rate }}%</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">MR记录数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.mr_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.mr_count }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">RSRP均值</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.rsrp_avg == null || object.rsrp_avg == ''">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.rsrp_avg }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">栅格数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.grid_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.grid_count }}</span>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_poor.png">
                            <span class="nameInfo">附近弱区</span>
                        </div>
                        <div class="floatRight">
                            <%--<span class="areaNumSpan">附近弱覆盖区域数：<span class="areaNum">{{ nearPoorAreaListData.length }}</span></span>--%>
                            <button class="linkCell" title="显示连线" v-on:click="showLinkPoorArea($event,marketData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul  class="ulDetailInfo">
                        <li class="cellInfoWrap groupInfoWrap">
                            <div class="groupText">附近弱覆盖区域数 ：<span class="areaNum" v-cloak>{{ nearPoorAreaListData.length }}</span></div>
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
                            <ul class="cellInfoDiv groupInfo fjrq">
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
               <%-- <li class="liWrap  &lt;%&ndash;noshow&ndash;%&gt;">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/detail_kpiRate.png">
                            <span class="nameInfo">感知速率</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV3/images/showTop5.png">
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
                            <div class="colDiv fLeft">
                                <span class="nameInfo">KPI感知上行速率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="marketData.min_userex_upavgrate != null">{{ marketData.min_userex_upavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">KPI感知下行速率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="marketData.min_userex_dwavgrate != null">{{ marketData.min_userex_dwavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>--%>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_position.png">
                            <span class="nameInfo">百度坐标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li >
                            <div class="colDiv fLeft">
                                <span class="nameInfo">中心点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ marketData.longitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">中心点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ marketData.latitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_layer.png">
                            <span class="nameInfo">图层修改</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">最新版本时间：</span>
                                <span class="lastVersionTime"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">修改者姓名：</span>
                                <span class="lastVersionEditerName"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">查看历史版本：</span>
                                <select class="histroySelect">
                                    <option value="请选择">请选择</option>
                                </select>
                            </div>
                        </li>
                        <li class="systemLayerBottonLi">
                            <div class="colDiv layerBtns">
                                <button type="button" class="btn-bg btn-redraw" v-on:click="redrawSystemLayer(marketData,$event)" >重绘</button>
                                <button type="button" class="btn-bg btn-canceled" v-on:click="cancelSystemLayer(marketData,$event)" >取消</button>
                                <button type="button" class="btn-bg btn-edit" v-on:click="editSystemLayer(marketData)" >编辑</button>
                                <button type="button" class="btn-bg btn-revoke" v-on:click="resetSystemLayer(marketData,$event)" >还原</button>
                                <button type="button" class="btn-bg btn-saves" v-on:click="saveSystemLayer(marketData)" >保存</button>
                                <button type="button" class="btn-bg btn-submit" v-on:click="commitSystemLayer(marketData)" >提交</button>
                                <button type="button" class="btn-bg btn-revoke btnRevoke revoverBtn" v-on:click="recoverSystemLayer(marketData)"  style="display: none;">撤销</button>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="colDiv">
                        <div class="colDiv systemLayerDelete">
                        	<button class="btn-bg deleteButton" v-on:click="deleteSystemLayer(marketData)">删除</button>
                    	</div>
                    	<div class="colDiv systemLayerDeleteEnd">
                        	<button class="btn-bg deleteButtonEnd">已删除</button>
                    	</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
<%--农贸市场结束--%>

<%--新增场景市场开始--%>
<div class="listDiv" id="showSenseList" style="display: none;">
    <div class="listWrap">
        <div class="searchTitle">在“广州”天河区域内搜索</div>
        <ul class="listTopUl">
            <li class="selectCity" id="senseSelectCity">
                <div class="select-name selectCity-name">
                    <img src="../js/IntelligentRoadTest/images/nor_add.png" class="name-icon">
                    <span class="city-selected" id="senseCityName">广州</span>
                    <span class="city-selected-gt">&gt;</span>
                    <span class="district-selected" id="senseDistrictName">全市</span>
                    <span class="mktcenter-selected-gt">&gt;</span>
                    <span class="mktcenter-selected" id="senseMktName">全区</span>
                    <span class="triangle"></span>
                </div>
                <div class="select-info city-info" style="display: none;">
                    <ul id="senseSelectCityList" class="threeLevel"></ul>
                </div>
            </li>
            <li class="classify">
                <div class="select-name" ><span id="senseListSelectName">全部分类</span><span class="triangle"></span></div>
                <div class="select-info" id="senseList">
                    <div class="flexRow">
                        <div class="flexCol">全部分类</div>
                        <div class="flexCol selected">全部</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否含有弱区</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                    <div class="flexRow">
                        <div class="flexCol">是否派单</div>
                        <div class="flexCol selected">不限</div>
                        <div class="flexCol">是</div>
                        <div class="flexCol">否</div>
                    </div>
                </div>
            </li>
            <li class="recomendSort" id="senseSort">
                <div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
                <div class="select-info">
                    <ul class="sortUl" >
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
        <div class="listDivWrap" id="showSenseDiv">
            <ul class="listUL">
                <li v-for = "(item , index , key ) in senseList" class="cursor" @click = "showMessage(item ,index)" v-on:mouseover = "turnMk(index,item)">
                    <div class="colDiv">
                        <span class="numSpan" v-cloak>{{ index + 1  }}</span>
                        <span class="bold" v-cloak>名称：{{ item.esbh_name }}</span>
                        <span class="positionRight" v-if="item.audit_stat == '待审核' && isAuditor == true" v-cloak>申请中</span>
                        <span class="positionRight" v-else-if="item.audit_stat != '待审核'&& item.audit_status == '编辑中' && isAuditor == true" v-cloak>编辑中</span>
                        <span class="positionRight" v-else v-cloak>&nbsp;</span>
                    </div>
                    <div class="colDiv">
                        <span v-if="item.rsrp_avg == null || item.rsrp_avg == ''">RSRP均值：&nbsp;</span>
                        <span v-else v-cloak>RSRP均值：{{ item.rsrp_avg }}</span>
                        <span class="paiSpan" v-if="item.alarm_id != null && item.alarm_id != ''"><img class="" src="../js/IntelligentRoadTestV3/images/pai.png"></span>
                    </div>
                    <div class="colDiv">
                        <span v-if="item.cover_rate == null || item.cover_rate == ''">覆盖率：&nbsp;</span>
                        <span v-else v-cloak>覆盖率：{{ item.cover_rate }}%</span>
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
                        第<input class="page-num" type="text" id="sensePage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
                        <input  type="hidden">
                    </div>
                    <div class="page-pagination">
                        <a href="javascript:;" class="next-active"  v-on:click="lastOrNext(1)" ></a>
                        <a href="javascript:;" class="last-active" v-on:click="goLast"></a>
                    </div>
                    <div>
                        <a href="javascript:;" class="page-load" v-on:click="gotoPage"><img src="../js/IntelligentRoadTest/images/111_11.png"></a>
                    </div>
                </div>
                <div class="page-info" id="senseCountMessage" <%--style="display: none;"--%>>
                    <%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
                    共<span v-cloak>{{ totalCounts }}</span>条数据
                </div>
            </div>
        </div>
    </div>

    <div class="detailList">
        <div class="backList" id="senseCount"> &lt; 返回上一级</div>
        <div class="detailListDiv" id="showSenseCompleteMessage">
            <div class="infoHeader">
                <div class="brDiv">
                    <span v-cloak>
                        区域编号：{{ senseData.esbh_id }}
                        <button id="sensePosition" class="positionDivBtn" v-on:click="sensePosition(senseData)">
                            <img class="" src="../js/IntelligentRoadTestV3/images/white_position.png?20180516.png" title="定位">
                        </button>
                         <button  class="positionDivBtn showBtn positionClass" v-on:click="showPolygonGrid(senseData,$event)">
						      <img class="imgClass" src="../js/IntelligentRoadTest/images/showP.png" title="显示">
						</button>
                    </span>
                    <%--<span  class="fRight" v-cloak>创建者：{{ senseData.creator }}</span>--%>
                </div>
                <div class="brDiv">
                    <span v-cloak>区域类型：{{ senseData.esbh_type  }}</span>
                    <span class="fRight" v-cloak>地市：{{ senseData.city }}</span>
                </div>
                <div class="brDiv">
                    <span  v-cloak>区域名称：{{ senseData.esbh_name }}</span>
                    <span class="fRight" v-cloak>{{ senseData.day }}</span>
                </div>
            </div>
            <ul class="infoBody">
                <li>
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li>
                            <div id="senseLineChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="senseAllChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="senseIndoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="senseOutdoorChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                            <span class="nameInfo" >AGPS感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li>
                            <div id="senseSecondChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png">
                            <span class="nameInfo">全量MR感知速率趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="senseAllChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室内</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="senseIndoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">全量MR室外</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="senseOutdoorChart2" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap" v-show="isShowAlarmInfo == true">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/change7.png">
                            <span class="nameInfo">{{ alaram_title }}</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block">
                        <li id="senseChartDiv">
                            <div id="senseChart" class="chartDiv"></div>
                        </li>
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警产生日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.alarm_time }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">告警恢复日期</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="alarm_dataObj.recover_time != null && alarm_dataObj.recover_time != ''">{{ alarm_dataObj.recover_time }}</span>
                                <span class="" v-cloak style="color:red" v-else>未恢复</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.alarm_time }}弱栅格数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_grid_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">{{ alarm_dataObj.day }}弱栅格恢复数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_reco_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap nrTop5Cell">
                    <div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">附近扇区</span>
                        </div>
                        <div class="inline" v-if="senseData.isHasSameSector != true">未就近接入</div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,senseData,1)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
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
                            <img class="cursor" src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">接入扇区</span>
                        </div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,senseData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo searchRecentCell" style="display: none;">
                        <li class="cellInfoWrap" v-for="(data , index , key) in mrTop5Cell">
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
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">KPI指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="gotoListPage" title="进入KPI列表" v-on:click="gotoKPIList(senseData)"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="senseData.lte_to_3g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">下切数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ senseData.lte_to_3g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="senseData.user_4g_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ senseData.user_4g_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="senseData.flow_4g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">流量(MB)</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ senseData.flow_4g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">AGPS覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
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
											<span class="blueInfo"
                                                  v-if="senseData.cover_rate == null || senseData.cover_rate == '' ">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ senseData.cover_rate }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="senseData.ce_good_ratio_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">感知优良率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ (senseData.ce_good_ratio_avg * 100).toFixed(2) }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">AGPS记录数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ senseData.rsrp_140_0_cnt }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">RSRP均值</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="senseData.rsrp_avg == null || senseData.rsrp_avg == '' ">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ senseData.rsrp_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">栅格数</span>
                            </div>
                            <div class="colDiv">
                                <%--<span class="blueInfo" v-cloak>{{ senseData.poor_grid_nums }}</span>--%>
                                <span class="blueInfo" v-cloak>{{ senseData.all_grid_nums }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap liIndex">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/detail_index.png">
                            <span class="nameInfo">全量MR覆盖指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap" v-for="object in allMRDataList">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">{{ object.name }}</span>
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
                                        <span class="nameInfo">覆盖率</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.cover_rate == null || object.cover_rate == '' ">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.cover_rate }}%</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">MR记录数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.mr_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.mr_count }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">RSRP均值</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-if="object.rsrp_avg == null || object.rsrp_avg == ''">--</span>
                                        <span class="blueInfo" v-else v-cloak>{{ object.rsrp_avg }}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="colDiv">
                                        <span class="nameInfo">栅格数</span>
                                    </div>
                                    <div class="colDiv">
                                        <span class="blueInfo" v-cloak v-if="object.grid_count == null">--</span>
                                        <span class="blueInfo" v-cloak v-else>{{ object.grid_count }}</span>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_poor.png">
                            <span class="nameInfo">附近弱区</span>
                        </div>
                        <div class="floatRight">
                            <%--<span class="areaNumSpan">附近弱覆盖区域数：<span class="areaNum">{{ nearPoorAreaListData.length }}</span></span>--%>
                            <button class="linkCell" title="显示连线" v-on:click="showLinkPoorArea($event,senseData,2)" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul  class="ulDetailInfo">
                        <li class="cellInfoWrap groupInfoWrap">
                            <div class="groupText">附近弱覆盖区域数 ：<span class="areaNum" v-cloak>{{ nearPoorAreaListData.length }}</span></div>
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
                            <ul class="cellInfoDiv groupInfo fjrq">
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
                <%-- <li class="liWrap  &lt;%&ndash;noshow&ndash;%&gt;">
                     <div class="nameBtn" v-on:click="showDetailInfo($event)">
                         <div class="inline">
                             <img src="../js/IntelligentRoadTestV3/images/detail_kpiRate.png">
                             <span class="nameInfo">感知速率</span>
                         </div>
                         <div class="floatRight">
                             <button class="btn-showInfo">
                                 <img src="../js/IntelligentRoadTestV3/images/showTop5.png">
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
                             <div class="colDiv fLeft">
                                 <span class="nameInfo">KPI感知上行速率</span>
                             </div>
                             <div class="colDiv">
                                 <span class="blueInfo" v-cloak v-if="senseData.min_userex_upavgrate != null">{{ senseData.min_userex_upavgrate }} Mbps</span>
                             </div>
                             <div class="colDiv"></div>
                         </li>
                         <li >
                             <div class="colDiv">
                                 <span class="nameInfo">KPI感知下行速率</span>
                             </div>
                             <div class="colDiv">
                                 <span class="blueInfo" v-cloak v-if="senseData.min_userex_dwavgrate != null">{{ senseData.min_userex_dwavgrate }} Mbps</span>
                             </div>
                             <div class="colDiv"></div>
                         </li>
                     </ul>
                 </li>--%>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_position.png">
                            <span class="nameInfo">百度坐标</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li >
                            <div class="colDiv fLeft">
                                <span class="nameInfo">中心点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ senseData.longitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">中心点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ senseData.latitude_mid_baidu }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_layer.png">
                            <span class="nameInfo">图层修改</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">最新版本时间：</span>
                                <span class="lastVersionTime"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">修改者姓名：</span>
                                <span class="lastVersionEditerName"></span>
                            </div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">查看历史版本：</span>
                                <select class="histroySelect">
                                    <option value="请选择">请选择</option>
                                </select>
                            </div>
                        </li>
                        <li class="systemLayerBottonLi">
                            <div class="colDiv layerBtns">
                            	<button type="button" class="btn-bg btn-redraw" v-on:click="redrawSystemLayer(senseData,$event)" >重绘</button>
                                <button type="button" class="btn-bg btn-canceled" v-on:click="cancelSystemLayer(senseData,$event)" >取消</button>
                                <button type="button" class="btn-bg btn-edit" v-on:click="editSystemLayer(senseData)" >编辑</button>
                                <button type="button" class="btn-bg btn-revoke" v-on:click="resetSystemLayer(senseData,$event)" >还原</button>
                                <button type="button" class="btn-bg btn-saves" v-on:click="saveSystemLayer(senseData)" >保存</button>
                                <button type="button" class="btn-bg btn-submit" v-on:click="commitSystemLayer(senseData)" >提交</button>
                                <button type="button" class="btn-bg btn-revoke btnRevoke revoverBtn" v-on:click="recoverSystemLayer(senseData)"  style="display: none;">撤销</button>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="colDiv">
                        <div class="colDiv systemLayerDelete">
                            <button class="btn-bg deleteButton" v-on:click="deleteSystemLayer(senseData)">删除</button>
                        </div>
                        <div class="colDiv systemLayerDeleteEnd">
                            <button class="btn-bg deleteButtonEnd">已删除</button>
                        </div>
                    </div>
                </li>
                <li class="liWrap" style="text-align: center;" v-if="isShowSaveBtn == true"> <%--如果是城中村的详情页则增加一个另存为关注区域的按钮--%>
                    <button class="saveToConcernBtn modal-sure"  v-on:click = "saveToConcernArea(senseData)">另存为关注区域</button>
                </li>
            </ul>
        </div>
    </div>
</div>
<%--新增场景市场结束--%>