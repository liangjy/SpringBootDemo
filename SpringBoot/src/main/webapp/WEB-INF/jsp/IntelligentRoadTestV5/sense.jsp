<%--
  Created by IntelliJ IDEA.
  User: lcj
  Date: 2018/2/26
  Time: 9:03
  放置智能路测V2版本的场景类目的jsp
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%--高速开始--%>
<div class="listDiv" id="showHighwayList" style="display: none;">
    <div class="listWrap showListWrap">
        <div class="searchTitle">在“广州”天河区域内搜索</div>
        <ul class="listTopUl">
            <li class="selectCity" id="HighwaySelectCity">
                <div class="select-name selectCity-name">
                    <img src="../js/IntelligentRoadTest/images/nor_add.png" class="name-icon">
                    <span class="city-selected" id="highwayCityName">广州</span>
                    <span class="triangle"></span>
                </div>
                <div class="select-info city-info" style="display: none;">
                    <ul id="highwaySelectCityList" class="city-list"></ul>
                </div>
            </li>
            <li class="classify classifyWrap">
                <div class="select-name" ><span id="highwaySelectName">500米分段统计</span><span class="triangle"></span></div>
                <div class="select-info" id="highwayList">
                    <ul class="sortUl">
                        <li class="selected" id="highway500M">500米分段统计</li>
                        <li id = "highwayLP">连片统计</li>
                    </ul>
                </div>
            </li>
            <li class="recomendSort" id="highwaySort">
                <div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
                <div class="select-info">
                    <ul class="sortUl">
                        <li >名称优先</li>
                        <li class="selected" >弱占比优先</li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="listDivWrap" id="showHighwayDiv">
            <ul class="listUL">
                <li v-for = "(item , index , key ) in highwayList"  v-on:mouseover = "turnMk(index,item)">
                    <div class="colDiv" >
                        <span class="numSpan" v-cloak>{{ index + 1  }}</span>
                        <%--<span class="bold cursor" v-on:click ="positionSatr(item,index);" v-cloak>{{ item.road_name }}</span>--%>
                        <span class="bold cursor" v-cloak>{{ item.road_name }}</span>
                    </div>
                    <div class="colDiv">
                        <div>
                            <span v-cloak>{{ poorCountTitle }}：</span>
                            <span v-cloak>{{ Math.floor(item.road_length / 0.5) }}</span>
                        </div>
                        <div class="positionRight">
                            <span>通车里程：</span>
                            <span v-cloak v-if="item.road_length == null || item.road_length == ''"></span>
                            <span v-cloak v-else>{{ item.road_length.toFixed(2) }}km</span>
                        </div>
                    </div>
                    <div class="colDiv" v-if="type == true">
                        <div  class="clickBlueText" v-on:click="goNextList(item , index  , false)">
                            <span v-cloak>{{ poorLengthTitle }}：</span>
                            <span v-cloak v-if="item.poor_length == null || item.poor_length == ''"></span>
                            <span v-cloak v-else>{{ item.poor_length.toFixed(2) }}km</span>
                        </div>
                        <div class="positionRight" <%--v-on:click="goNextList(item , index ,false)"--%>>
                            <span>覆盖里程：</span>
                            <span v-cloak v-if="item.cover_length == null || item.cover_length  == ''"></span>
                            <span v-cloak v-else>{{ item.cover_length.toFixed(2) }}km</span>
                        </div>
                    </div>
                    <div class="colDiv" v-else>
                        <div  class="clickBlueText" v-on:click="goNextList(item , index  , true)">
                            <span v-cloak>{{ poorLengthTitle }}：</span>
                            <span v-cloak v-if="item.poor_length == null || item.poor_length == ''">0km</span>
                            <span v-cloak v-else>{{ item.poor_length.toFixed(2) }}km</span>
                        </div>
                        <div class="positionRight clickBlueText" v-on:click="goNextList(item , index ,false)">
                            <span>覆盖里程：</span>
                            <span v-cloak v-if="item.cover_length == null || item.cover_length  == ''"></span>
                            <span v-cloak v-else>{{ item.cover_length.toFixed(2) }}km</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <span v-cloak>{{ poorCoverAvgTitle }}：</span>
                        <span v-cloak>{{ item.poor_ratio }}%</span>
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
                        第<input class="page-num" type="text" id="highwayPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
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
                <div class="page-info" id="highwayCountMessage" <%--style="display: none;"--%>>
                    <%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
                    共<span v-cloak>{{ totalCounts }}</span>条数据
                </div>
            </div>
        </div>
    </div>
    <div class="listWrap showListDetail">
        <div class="backListDiv" id="highwayListCount"> &lt; 返回上一级</div>
        <ul class="listTopUl">
            <li class="selectCity grayBackground">
                <div class="select-name selectCity-name">
                    <img src="../js/IntelligentRoadTest/images/nor_add.png" class="name-icon">
                    <span class="city-selected" id="highwayCityNameD">广州</span>
                    <span class="triangle"></span>
                </div>
            </li>
            <li class="classify ">
                <div class="select-name" >
                    <span id="highwayName" class="ellipsis" ></span>
                    <%--<span id="highwayClassifyD">全部分类</span>
										<span class="triangle"></span>--%>
                </div>
            </li>
            <li class="recomendSort" id="highwaySortD">
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
        <div class="listDivWrap" id="showHighwayListDiv">
            <ul class="listUL">
                <li v-for = "(item , index , key ) in highwayList" class="cursor" v-on:click="showMessage(item,index)" v-on:mouseover = "turnMk(index,item)">
                    <div class="colDiv">
                        <span class="numSpan" v-cloak>{{ index + 1  }}</span>
                        <span class="bold"   v-cloak>路段编号：{{ item.line_id }}</span>
                    </div>
                    <div class="colDiv">
                        <div>
                            <span>平均RSRP：</span>
                            <span v-if="item.rsrp_avg == null || item.rsrp_avg == ''">&nbsp;</span>
                            <span v-else v-cloak>{{ item.rsrp_avg.toFixed(2) }}</span>
                        </div>
                        <div class="positionRight">
                            <span>覆盖率：</span>
                            <span v-if="item.cover_rate == null || item.cover_rate == '' ">0%</span>
                            <span v-else v-cloak>{{ item.cover_rate}}%</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <span class="cellNameEllipsis" v-cloak>最近扇区：{{ item.cell_name }}</span>
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
                        第<input class="page-num" type="text" id="highwaySecondListPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
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
                <div class="page-info" id="highwaySecondListCountMessage" >
                    共<span v-cloak>{{ totalCounts }}</span>条数据
                </div>
            </div>
        </div>
    </div>
    <div class="detailList">
        <div class="backListDiv" id="highwayCount"> &lt; 返回上一级</div>
        <div class="detailListDiv" id="showHighwayCompleteMessage">
            <div class="infoHeader">
                <div class="brDiv">
                    <span v-cloak>
                        路段编号：{{ highwayData.line_id }}
                        <button id="highwayPosition" class="positionDivBtn" v-on:click="highwayPosition(highwayData)">
                            <img class="" src="../js/IntelligentRoadTestV3/images/white_position.png?20180516.png" title="定位">
                        </button>
                    </span>
                    <span class="fRight" v-cloak>地市：{{ highwayData.city }}</span>
                    <%--<span  class="fRight" v-cloak>创建者：{{ highwayData.creator }}</span>--%>
                </div>
                <div class="brDiv">
                    <span v-cloak>{{ highwayData.road_name  }}</span>
                </div>
            </div>
            <ul class="infoBody">
                <li v-show="isHide30DayLine == false">
                    <div>
                        <img src="../js/IntelligentRoadTest/images/change7.png"/>
                        <span class="nameInfo" >{{ title }}</span>
                    </div>
                </li>
                <li id="highwayLineDiv" v-show="isHide30DayLine == false">
                    <div id="highwayLineChart" class="chartDiv"></div>
                </li>
                <li class="liWrap" v-show="isShowAlarmInfo == true">
                    <div class="nameBtn" <%--v-on:click="showDetailInfo($event)"--%>>
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/change7.png"/>
                            <span class="nameInfo">{{ alaram_title }}</span>
                        </div>
                        <%--<div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>--%>
                    </div>
                    <ul class="">
                        <li id="highwayChartDiv">
                            <div id="highwayChart" class="chartDiv"></div>
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
                                <span class="nameInfo">弱路段长度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ alarm_dataObj.poor_cove_length }}米</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li v-show="isHide30DayLine == false">
                    <div>
                        <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                        <span class="nameInfo" >感知速率</span>
                    </div>
                </li>
                <li id="" v-show="isHide30DayLine == false">
                    <div id="highwaySecondChart" class="chartDiv"></div>
                </li>
                <li class="liWrap nrTop5Cell">
                    <div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">附近扇区</span>
                        </div>
                        <div class="inline" v-if="highwayData.isHasSameSector != true">未就近接入</div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,highwayData,1)" style="display: none;"></button>
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
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,highwayData,2)" style="display: none;"></button>
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
                            <span class="nameInfo">指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="gotoListPage" title="进入KPI列表" v-on:click="gotoKPIList(highwayData)"></button>
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
                        <li  v-if="highwayData.lte_to_3g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">下切数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ highwayData.lte_to_3g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="highwayData.user_4g_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ highwayData.user_4g_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="highwayData.flow_4g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">流量(MB)</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="highwayData.flow_4g_tot == null  || highwayData.flow_4g_tot == ''">&nbsp;</span>
                                <span class="blueInfo" v-cloak v-else>{{ highwayData.flow_4g_tot.toFixed(2) }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">覆盖率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="highwayData.cover_rate == null || highwayData.cover_rate == ''">0%;</span>
                                <span class="blueInfo" v-else v-cloak>{{ highwayData.cover_rate  }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="highwayData.ce_good_ratio_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">感知优良率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="highwayData.ce_good_ratio_avg == null || highwayData.ce_good_ratio_avg == ''">&nbsp;</span>
                                <span class="blueInfo" v-cloak>{{ (highwayData.ce_good_ratio_avg * 100).toFixed(2) }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="highwayData.rsrp_count != null">
                            <div class="colDiv">
                                <span class="nameInfo">AGPS记录数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ highwayData.rsrp_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="highwayData.rsrp != null">
                            <div class="colDiv">
                                <span class="nameInfo">RSRP均值</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="highwayData.dx_rsrp_sum == null || highwayData.dx_rsrp_sum == '' || highwayData.dx_rsrp_count == null || highwayData.dx_rsrp_count == ''">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ (highwayData.dx_rsrp_sum/highwayData.dx_rsrp_count).toFixed(2) }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="highwayData.grid_count != null">
                            <div class="colDiv">
                                <span class="nameInfo">里程数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ highwayData.all_grid_nums }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap  <%--noshow--%>">
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
                                <span class="blueInfo" v-cloak v-if="highwayData.min_userex_upavgrate != null">{{ highwayData.min_userex_upavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">KPI感知下行速率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="highwayData.min_userex_dwavgrate != null">{{ highwayData.min_userex_dwavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_position.png">
                            <span class="nameInfo">GPS坐标</span>
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
                                <span class="nameInfo">起点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ highwayData.longitude_min }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">起点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ highwayData.latitude_min }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv fLeft">
                                <span class="nameInfo">终点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ highwayData.longitude_max }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">终点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ highwayData.latitude_max }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
<%--高速结束--%>
<%--高铁开始--%>
<div class="listDiv" id="showRailList" style="display: none;">
    <div class="listWrap showListWrap">
        <div class="searchTitle">在“广州”天河区域内搜索</div>
        <ul class="listTopUl">
            <li class="selectCity" id="railSelectCity">
                <div class="select-name selectCity-name">
                    <img src="../js/IntelligentRoadTest/images/nor_add.png" class="name-icon">
                    <span class="city-selected" id="railCityName">广州</span>
                    <span class="triangle"></span>
                </div>
                <div class="select-info city-info" style="display: none;">
                    <ul id="railSelectCityList" class="city-list"></ul>
                </div>
            </li>
            <li class="classify classifyWrap">
                <div class="select-name" ><span id="railListSelectName">综合</span><span class="triangle"></span></div>
                <div class="select-info" id="railList">
                    <ul class="sortUl">
                        <li class="selected" id = "rail500M">综合</li>
                        <li id = "railSuiDao">隧道</li>
                        <li id = "railNoSuiDao">非隧道</li>
                        <li id = "railLP"><-110连段</li> <%--暂时注释掉--%>
                        <%--<li class="selected" id = "rail500M">500米分段统计</li>
                        <li id = "railSuiDao">隧道分段统计</li>
                        <li id = "railLP">连片统计</li>
                        <li id = "railLP">连片统计</li> --%>

                    </ul>
                </div>
            </li>
            <li class="recomendSort" id="railSort">
                <div class="select-name"><span>弱里程反序</span><span class="triangle"></span></div>
                <div class="select-info">
                    <ul class="sortUl">
                       <%-- <li >名称优先</li>
                        <li class="selected">弱占比优先</li>--%>
                           <li >弱里程正序</li>
                           <li class="selected">弱里程反序</li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="listDivWrap" id="showRailDiv">
            <ul class="listUL">
                <li class="cursor" v-for = "(item , index , key ) in railList" <%--class="cursor" --%> v-on:mouseover = "turnMk(index,item)" v-on:click="goNextList(item , index  , false)">
                    <div class="colDiv" v-bind:id="item.road_id" >
                        <span class="numSpan" v-cloak >{{ index + 1  }}</span>
                        <%--<span class="bold cursor" v-on:click ="positionSatr(item,index);" v-cloak>{{ item.road_name }}</span>--%>
                        <span class="bold " v-cloak >{{ item.road_name }}</span>
                    </div>
                    <div class="colDiv">
                        <div v-if="type == false"> <%--非弱连片--%>
                            <span v-cloak>{{ total_length_name }}：</span> <%--总里程--%>
                            <span v-cloak>{{ (item.total_length/1000).toFixed(2) }}km</span>
                        </div>
                        <div v-else> <%--弱连片--%>
                            <span v-cloak>{{ total_length_name }}：</span> <%--总里程--%>
                            <span v-cloak>{{ (item.lt110_length/1000).toFixed(2) }}km</span>
                        </div>

                        <div class="positionRight" v-if="type == false"> <%--大于等于-110里程--%>
                            <span v-cloak>{{ gteq110_length_name }}：</span>
                            <span v-cloak v-if="item.gteq110_length == null || item.gteq110_length == ''">--</span>
                            <span v-cloak v-else>{{ (item.gteq110_length/1000).toFixed(2) }}km</span>
                        </div>
                        <div class="positionRight" v-else> <%--弱连片的连片数--%>
                            <span v-cloak>连段数：</span>
                            <span v-cloak v-if="item.total_count == null || item.total_count == ''">--</span>
                            <span v-cloak v-else>{{ item.total_count }}</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <div  class="" v-if="type == false"> <%--小于-110里程--%>
                            <span  v-cloak>{{ lt110_length_name }}：</span>
                            <span v-cloak v-if="item.lt110_length == null || item.lt110_length  == ''">--</span>
                            <span v-cloak v-else>{{ (item.lt110_length/1000).toFixed(2) }}km</span>
                        </div>
                        <div  class="" v-else> <%--最大连段里程--%>
                            <span>最大连段：</span>
                            <span v-cloak v-if="item.max_weak_length == null || item.max_weak_length  == ''">--</span>
                            <span v-cloak v-else>{{ (item.max_weak_length/1000).toFixed(2) }}km</span>
                        </div>

                        <div class="positionRight" v-if="type == false"> <%--非连片--%>
                            <span  v-cloak>&nbsp;&nbsp;{{ out_net_length_name }}：</span>
                            <span v-cloak v-if="item.out_net_length == null || item.out_net_length == ''">--</span>
                            <span v-cloak v-else>{{ (item.out_net_length/1000).toFixed(2) }}km</span>
                        </div>
                        <div class="positionRight" v-else> <%--最小连段里程--%>
                            <span>最小连段：</span>
                            <span v-cloak v-if="item.min_weak_length == null || item.min_weak_length == ''">--</span>
                            <span v-cloak v-else>{{ (item.min_weak_length/1000).toFixed(2) }}km</span>
                        </div>
                    </div>
                    <div class="colDiv" v-if="isSuiDao == true">
                        <div  class="" >
                            <span v-cloak>{{ total_count_name }}：</span>
                            <span v-cloak v-if="item.total_count == null || item.total_count == ''">--</span>
                            <span v-cloak v-else>{{ item.total_count }}段</span>
                        </div>
                        <%--<div class="positionRight clickBlueText" v-on:click="goNextList(item , index ,false)">
                            <span>覆盖里程：</span>
                            <span v-cloak v-if="item.cover_length == null || item.cover_length  == ''"></span>
                            <span v-cloak v-else>{{ item.cover_length.toFixed(2) }}km</span>
                        </div>--%>
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
                        第<input class="page-num" type="text" id="railPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
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
                <div class="page-info" id="railCountMessage" <%--style="display: none;"--%>>
                    <%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
                    共<span v-cloak>{{ totalCounts }}</span>条数据
                </div>
            </div>
        </div>
    </div>
    <div class="listWrap showListDetail">
        <div class="backListDiv" id="railListCount">
            <span >&lt; 返回上一级</span>
            <span class="positionRight" id="railName"></span>
        </div>
        <ul class="listTopUl">
            <li class="selectCity">
                <div class="select-name selectCity-name">
                    <img src="../js/IntelligentRoadTest/images/nor_add.png" class="name-icon">
                    <span class="city-selected" id="railSecondCityNameD">广州</span>
                    <span class="triangle"></span>
                </div>
                <div class="select-info city-info" style="display: none;">
                    <ul id="railSecondSelectCityList" class="city-list"></ul>
                </div>
            </li>
            <%--<li class="classify">
                <div class="select-name" >
                    <span id="railName" class="ellipsis"></span>
                    &lt;%&ndash;<span id="railClassifyD">全部分类</span>
										<span class="triangle"></span>&ndash;%&gt;
                </div>
            </li>--%>
            <%--这里换成和第一层一样，可以切换场景--%>
            <li class="classify classifyWrap">
                <div class="select-name" ><span id="railSecondListSelectName">综合</span><span class="triangle"></span></div>
                <div class="select-info" id="railSecondList">
                    <ul class="sortUl">
                        <li class="selected" id = "rail500MSecond">综合</li>
                        <li id = "railSuiDaoSecond">隧道</li>
                        <li id = "railNoSuiDaoSecond">非隧道</li>
                        <li id = "railLPSecond"><-110连段</li> <%--暂时注释掉--%>
                        <%--<li class="selected" id = "rail500M">500米分段统计</li>
                        <li id = "railSuiDao">隧道分段统计</li>
                        <li id = "railLP">连片统计</li>
                        <li id = "railLP">连片统计</li> --%>

                    </ul>
                </div>
            </li>
            <li class="recomendSort" id="railSortD">
                <div class="select-name"><span>弱里程反序</span><span class="triangle"></span></div>
                <div class="select-info">
                    <ul class="sortUl" >
                        <%--<li class="selected">推荐排序</li>
                        <li>下切优先</li>
                        <li>流量优先</li>
                        <li>感知优先</li>
                        <li>弱覆盖优先</li>
                        <li>用户数优先</li>--%>
                            <li>弱里程正序</li>
                        <li class="selected">弱里程反序</li>

                    </ul>
                </div>
            </li>
        </ul>
        <div class="listDivWrap" id="showRailListDiv">
            <ul class="listUL">
                <li v-for = "(item , index , key ) in railList" v-bind:id="item.line_id" class="cursor" v-on:click="showMessage(item,index)" v-on:mouseover = "turnMk(index,item)">
                    <div class="colDiv">
                        <span class="numSpan" v-cloak>{{ index + 1  }}</span>
                        <span class="bold"   v-cloak v-if="isSuiDao == false">路段编号：{{ item.line_id }}</span>
                        <span class="bold hideLineId"  v-cloak v-if="isSuiDao == true">隧道ID：{{ item.line_id }}</span>
                        <span class="bold"   v-cloak v-if="isSuiDao == true">隧道名称：{{ item.road_name }}</span>
                        <div class="floatRight" v-show="city == '全省'"> <%--这里要判断一下是否是看全省的， 如果是就显示，否则隐藏--%>
                            <span class="nameInfo" v-cloak>{{ item.city }}</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <div>
                            <span>平均RSRP：</span>
                            <span v-if="item.rsrp_avg == null || item.rsrp_avg == ''">&nbsp;</span>
                            <span v-else v-cloak>{{ item.rsrp_avg.toFixed(2) }}</span>
                        </div>
                        <div class="positionRight">
                            <span>弱里程占比：</span>
                            <span v-if="item.weak_length_rate == null || item.weak_length_rate == '' ">--</span>
                            <span v-else v-cloak>{{ item.weak_length_rate}}%</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <div>
                            <span>上行速率：</span>
                            <span v-if="item.min_userex_upavgrate == null || item.min_userex_upavgrate == ''">--</span>
                            <span v-else v-cloak>{{ item.min_userex_upavgrate.toFixed(2) }}Mbps</span>
                        </div>
                        <div class="positionRight">
                            <span>&emsp;下行速率：</span>
                            <span v-if="item.min_userex_dwavgrate == null || item.min_userex_dwavgrate == '' ">--</span>
                            <span v-else v-cloak>{{ item.min_userex_dwavgrate.toFixed(2) }}Mbps</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <div>
                            <span>MR数量：</span>
                            <span v-if="item.rsrp_count == null || item.rsrp_count == ''">--</span>
                            <span v-else v-cloak>{{ item.rsrp_count }}</span>
                        </div>
                        <div class="positionRight" >
                            <span>&emsp;弱里程：</span>
                            <span v-if="item.lt110_length == null || item.lt110_length == '' ">--</span>
                            <span v-else v-cloak>{{ (item.lt110_length/1000).toFixed(2) }}km</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <span class="cellNameEllipsis" v-cloak>最近扇区：{{ item.cell_name }}</span>
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
                        第<input class="page-num" type="text" id="railSecondListPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
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
                <div class="page-info" id="railSecondListCountMessage" >
                    共<span v-cloak>{{ totalCounts }}</span>条数据
                </div>
            </div>
        </div>
    </div>
    <div class="detailList">
        <div class="backList" id="railCount"> &lt; 返回上一级</div>
        <div class="detailListDiv" id="showRailCompleteMessage">
            <div class="infoHeader">
                <div class="brDiv">
                    <span v-cloak>
                        路段编号：{{ railData.line_id }}
                        <button id="railPosition" class="positionDivBtn" v-on:click="railPosition(railData)">
                            <img class="" src="../js/IntelligentRoadTestV3/images/white_position.png?20180516.png" title="定位">
                        </button>
                    </span>
                    <span class="fRight" v-cloak>地市：{{ railData.city }}</span>
                    <%--<span  class="fRight" v-cloak>创建者：{{ railData.creator }}</span>--%>
                </div>
                <div class="brDiv">
                    <span v-cloak>{{ railData.road_name  }}</span>
                </div>
            </div>
            <ul class="infoBody">
                <li v-show="isHide30DayLine == false">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/change7.png"/>
                            <span class="nameInfo" >覆盖趋势</span>
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
                        <li id="railLineDiv" v-show="isHide30DayLine == false">
                            <div id="railLineChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap" v-show="isShowAlarmInfo == true">
                    <div class="nameBtn" <%--v-on:click="showDetailInfo($event)"--%>>
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/change7.png"/>
                            <span class="nameInfo">{{ alaram_title }}</span>
                        </div>
                        <%--<div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>--%>
                    </div>
                    <ul class="ulDetailInfo">
                        <li id="railChartDiv">
                            <div id="railChart" class="chartDiv"></div>
                        </li>
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="railData.lte_to_3g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">下切数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ railData.lte_to_3g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="railData.user_4g_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ railData.user_4g_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="railData.flow_4g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">流量(MB)</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="railData.flow_4g_tot == null  || railData.flow_4g_tot == ''">&nbsp;</span>
                                <span class="blueInfo" v-cloak v-else>{{ railData.flow_4g_tot.toFixed(2) }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">覆盖率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="railData.cover_rate == null || railData.cover_rate == ''">0%</span>
                                <span class="blueInfo" v-else v-cloak>{{ railData.cover_rate }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="railData.ce_good_ratio_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">感知优良率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="railData.ce_good_ratio_avg == null || railData.ce_good_ratio_avg == ''">&nbsp;</span>
                                <span class="blueInfo" v-cloak>{{ (railData.ce_good_ratio_avg * 100).toFixed(2) }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li v-show="isHide30DayLine == false">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/change7.png"/>
                            <span class="nameInfo" >感知速率走势</span>
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
                        <li id="" v-show="isHide30DayLine == false">
                            <div id="railSecondChart" class="chartDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap nrTop5Cell">
                    <div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">附近扇区</span>
                        </div>
                        <div class="inline" v-if="railData.isHasSameSector != true">未就近接入</div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,railData,1)" style="display: none;"></button>
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
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,railData,2)" style="display: none;"></button>
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
                            <span class="nameInfo">指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="gotoListPage" title="进入KPI列表" v-on:click="gotoKPIList(railData)"></button>
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
                        <li  v-if="railData.lte_to_3g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">下切数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ railData.lte_to_3g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <%--这里注释掉用户数，因为下方已经有了总用户数了--%>
                        <%--<li  v-if="railData.user_4g_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ railData.user_4g_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>--%>
                        <li  v-if="railData.flow_4g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">流量(MB)</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="railData.flow_4g_tot == null  || railData.flow_4g_tot == ''">&nbsp;</span>
                                <span class="blueInfo" v-cloak v-else>{{ railData.flow_4g_tot.toFixed(2) }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">-110覆盖率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="railData.cover_rate == null || railData.cover_rate == ''">0%</span>
                                <span class="blueInfo" v-else v-cloak>{{ railData.cover_rate }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="railData.ce_good_ratio_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">感知优良率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="railData.ce_good_ratio_avg == null || railData.ce_good_ratio_avg == ''">&nbsp;</span>
                                <span class="blueInfo" v-cloak>{{ (railData.ce_good_ratio_avg * 100).toFixed(2) }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="railData.rsrp_count != null">
                            <div class="colDiv">
                                <span class="nameInfo">全量MR数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ railData.rsrp_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="railData.rsrp != null">
                            <div class="colDiv">
                                <span class="nameInfo">RSRP均值</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="railData.dx_rsrp_sum == null || railData.dx_rsrp_sum == '' || railData.dx_rsrp_count == null || railData.dx_rsrp_count == ''">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ (railData.dx_rsrp_sum/railData.dx_rsrp_count).toFixed(2) }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="railData.grid_count != null">
                            <div class="colDiv">
                                <span class="nameInfo">里程数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ railData.all_grid_nums }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">种子用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="railData.seed_user_count != null">{{ railData.seed_user_count }}</span>
                                <span class="blueInfo" v-cloak v-else>--</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">非种子用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="railData.non_seed_user_count != null">{{ railData.non_seed_user_count }}</span>
                                <span class="blueInfo" v-cloak v-else>--</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">总用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="railData.user_count != null">{{ railData.user_count }}</span>
                                <span class="blueInfo" v-cloak v-else>--</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap  <%--noshow--%>">
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
                                <span class="blueInfo" v-cloak v-if="railData.min_userex_upavgrate != null">{{ railData.min_userex_upavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">KPI感知下行速率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="railData.min_userex_dwavgrate != null">{{ railData.min_userex_dwavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
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
                                <span class="nameInfo">起点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ railData.longitude_min }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">起点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ railData.latitude_min }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv fLeft">
                                <span class="nameInfo">终点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ railData.longitude_max }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">终点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ railData.latitude_max }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_position.png">
                            <span class="nameInfo">GPS坐标</span>
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
                                <span class="nameInfo">起点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ railData.longitude_min_gps }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">起点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ railData.latitude_min_gps }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv fLeft">
                                <span class="nameInfo">终点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ railData.longitude_max_gps }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">终点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ railData.latitude_max_gps }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
<%--高铁结束--%>
<%--市政路开始--%>
<div class="listDiv" id="showCityRoadList" style="display: none;">
    <div class="listWrap showListWrap">
        <div class="searchTitle">在“广州”天河区域内搜索</div>
        <ul class="listTopUl">
            <li class="selectCity" id="cityRoadSelectCity">
                <div class="select-name selectCity-name">
                    <img src="../js/IntelligentRoadTest/images/nor_add.png" class="name-icon">
                    <span class="city-selected" id="cityRoadCityName">广州</span>
                    <span class="triangle"></span>
                </div>
                <div class="select-info city-info" style="display: none;">
                    <ul id="cityRoadSelectCityList" class="city-list"></ul>
                </div>
            </li>
            <li class="classify classifyWrap">
                <div class="select-name" ><span id="cityRoadSelectName">500米分段统计</span><span class="triangle"></span></div>
                <div class="select-info" id="cityRoadList">
                    <ul class="sortUl">
                        <li class="selected" id="cityRoad500M">500米分段统计</li>
                        <li id="cityRoadLP">连片统计</li>
                    </ul>
                </div>
            </li>
            <li class="recomendSort" id="cityRoadSort">
                <div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
                <div class="select-info">
                    <ul class="sortUl">
                        <li >名称优先</li>
                        <li class="selected">弱占比优先</li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="listDivWrap" id="showCityRoadDiv">
            <ul class="listUL">
                <li v-for = "(item , index , key ) in cityRoadList" v-on:mouseover = "turnMk(index,item)">
                    <div class="colDiv" >
                        <span class="numSpan" v-cloak>{{ index + 1  }}</span>
                        <%--<span class="bold cursor" v-on:click ="positionSatr(item,index);" v-cloak>{{ item.road_name }}</span>--%>
                        <span class="bold cursor" v-cloak>{{ item.road_name }}</span>
                    </div>
                    <div class="colDiv">
                        <div>
                            <span v-cloak>{{ poorCountTitle }}：</span>
                            <span v-cloak>{{ Math.floor(item.road_length / 0.5) }}</span>
                        </div>
                        <div class="positionRight">
                            <span>通车里程：</span>
                            <span v-cloak v-if="item.road_length == null || item.road_length == ''"></span>
                            <span v-cloak v-else>{{ item.road_length.toFixed(2) }}km</span>
                        </div>
                    </div>
                    <div class="colDiv" v-if="type == true">
                        <div  class="clickBlueText" v-on:click="goNextList(item , index  , false)">
                            <span v-cloak>{{ poorLengthTitle }}：</span>
                            <span v-cloak v-if="item.poor_length == null || item.poor_length == ''"></span>
                            <span v-cloak v-else>{{ item.poor_length.toFixed(2) }}km</span>
                        </div>
                        <div class="positionRight" <%--v-on:click="goNextList(item , index ,false)"--%>>
                            <span>覆盖里程：</span>
                            <span v-cloak v-if="item.cover_length == null || item.cover_length  == ''"></span>
                            <span v-cloak v-else>{{ item.cover_length.toFixed(2) }}km</span>
                        </div>
                    </div>
                    <div class="colDiv" v-else>
                        <div  class="clickBlueText" v-on:click="goNextList(item , index  , true)">
                            <span v-cloak>{{ poorLengthTitle }}：</span>
                            <span v-cloak v-if="item.poor_length == null || item.poor_length == ''"></span>
                            <span v-cloak v-else>{{ item.poor_length.toFixed(2) }}km</span>
                        </div>
                        <div class="positionRight clickBlueText" v-on:click="goNextList(item , index ,false)">
                            <span>覆盖里程：</span>
                            <span v-cloak v-if="item.cover_length == null || item.cover_length  == ''"></span>
                            <span v-cloak v-else>{{ item.cover_length.toFixed(2) }}km</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <span v-cloak>{{ poorCoverAvgTitle }}：</span>
                        <span v-cloak>{{ item.poor_ratio }}%</span>
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
                        第<input class="page-num" type="text" id="cityRoadPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
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
                <div class="page-info" id="cityRoadMessage" <%--style="display: none;"--%>>
                    <%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
                    共<span v-cloak>{{ totalCounts }}</span>条数据
                </div>
            </div>
        </div>
    </div>
    <div class="listWrap showListDetail">
        <div class="backListDiv" id="cityRoadListCount"> &lt; 返回上一级</div>
        <ul class="listTopUl">
            <li class="selectCity grayBackground">
                <div class="select-name selectCity-name">
                    <img src="../js/IntelligentRoadTest/images/nor_add.png" class="name-icon">
                    <span class="city-selected" id="cityRoadCityNameD">广州</span>
                    <span class="triangle"></span>
                </div>
            </li>
            <li class="classify ">
                <div class="select-name" >
                    <span id="cityRoadName" class="ellipsis"></span>
                    <%--<span id="cityRoadClassifyD">全部分类</span>
										<span class="triangle"></span>--%>
                </div>
            </li>
            <li class="recomendSort" id="cityRoadSortD">
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
        <div class="listDivWrap" id="showCityRoadListDiv">
            <ul class="listUL">
                <li v-for = "(item , index , key ) in cityRoadList" class="cursor" v-on:click="showMessage(item,index)" v-on:mouseover = "turnMk(index,item)">
                    <div class="colDiv">
                        <span class="numSpan" v-cloak>{{ index + 1  }}</span>
                        <span class="bold"   v-cloak>路段编号：{{ item.line_id }}</span>
                    </div>
                    <div class="colDiv">
                        <div>
                            <span>平均RSRP：</span>
                            <span v-if="item.rsrp_avg == null || item.rsrp_avg == ''">&nbsp;</span>
                            <span v-else v-cloak>{{ item.rsrp_avg.toFixed(2) }}</span>
                        </div>
                        <div class="positionRight">
                            <span>覆盖率：</span>
                            <span v-if="item.cover_rate == null || item.cover_rate == '' ">0%</span>
                            <span v-cloak v-else>{{ item.cover_rate }}%</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <span class="cellNameEllipsis" v-cloak>最近扇区：{{ item.cell_name }}</span>
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
                        第<input class="page-num" type="text" id="cityRoadSecondListPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
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
                <div class="page-info" id="cityRoadSecondListCountMessage" >
                    共<span v-cloak>{{ totalCounts }}</span>条数据
                </div>
            </div>
        </div>
    </div>
    <div class="detailList">
        <div class="backList" id="cityRoadCount"> &lt; 返回上一级</div>
        <div class="detailListDiv" id="showCityRoadCompleteMessage">
            <div class="infoHeader">
                <div class="brDiv">
                    <span v-cloak>
                        路段编号：{{ cityRoadData.line_id }}
                        <button id="cityRoadPosition" class="positionDivBtn" v-on:click="cityRoadPosition(cityRoadData)">
                            <img class="" src="../js/IntelligentRoadTestV3/images/white_position.png?20180516.png" title="定位">
                        </button>
                    </span>
                    <span class="fRight" v-cloak>地市：{{ cityRoadData.city }}</span>
                    <%--<span  class="fRight" v-cloak>创建者：{{ cityRoadData.creator }}</span>--%>
                </div>
                <div class="brDiv">
                    <span v-cloak>{{ cityRoadData.road_name }}</span>
                </div>
            </div>
            <ul class="infoBody">
                <li v-show="isHide30DayLine == false">
                    <div>
                        <img src="../js/IntelligentRoadTest/images/change7.png"/>
                        <span class="nameInfo" >{{ title }}</span>
                    </div>
                </li>
                <li id="cityRoadLineDiv" v-show="isHide30DayLine == false">
                    <div id="cityRoadLineChart" class="chartDiv"></div>
                </li>
                <li class="liWrap" v-show="isShowAlarmInfo == true">
                    <div class="nameBtn" <%--v-on:click="showDetailInfo($event)"--%>>
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/change7.png">
                            <span class="nameInfo">{{ alaram_title }}</span>
                        </div>
                        <%--<div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>--%>
                    </div>
                    <ul class="ulDetailInfo">
                        <li id="cityRoadChartDiv">
                            <div id="cityRoadChart" class="chartDiv"></div>
                        </li>
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="cityRoadData.lte_to_3g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">下切数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ cityRoadData.lte_to_3g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="cityRoadData.user_4g_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ cityRoadData.user_4g_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="cityRoadData.flow_4g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">流量(MB)</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="cityRoadData.flow_4g_tot == null  || cityRoadData.flow_4g_tot == ''">&nbsp;</span>
                                <span class="blueInfo" v-cloak v-else>{{ cityRoadData.flow_4g_tot.toFixed(2) }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">覆盖率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="cityRoadData.cover_rate == null || cityRoadData.cover_rate == ''">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ cityRoadData.cover_rate }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="cityRoadData.ce_good_ratio_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">感知优良率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="cityRoadData.ce_good_ratio_avg == null || cityRoadData.ce_good_ratio_avg == ''">&nbsp;</span>
                                <span class="blueInfo" v-cloak>{{ (cityRoadData.ce_good_ratio_avg * 100).toFixed(2) }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="cityRoadData.rsrp_count != null">
                            <div class="colDiv">
                                <span class="nameInfo">AGPS记录数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ cityRoadData.rsrp_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="cityRoadData.rsrp != null">
                            <div class="colDiv">
                                <span class="nameInfo">RSRP均值</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="cityRoadData.dx_rsrp_sum == null || cityRoadData.dx_rsrp_sum == '' || cityRoadData.dx_rsrp_count == null || cityRoadData.dx_rsrp_count == ''">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ (cityRoadData.dx_rsrp_sum/cityRoadData.dx_rsrp_count).toFixed(2) }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="cityRoadData.grid_count != null">
                            <div class="colDiv">
                                <span class="nameInfo">里程数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ cityRoadData.all_grid_nums }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li v-show="isHide30DayLine == false">
                    <div>
                        <img src="../js/IntelligentRoadTestV3/images/change7.png"/>
                        <span class="nameInfo" >感知速率</span>
                    </div>
                </li>
                <li  v-show="isHide30DayLine == false">
                    <div id="cityRoadSecondChart" class="chartDiv"></div>
                </li>
                <li class="liWrap nrTop5Cell">
                    <div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">附近扇区</span>
                        </div>
                        <div class="inline" v-if="cityRoadData.isHasSameSector != true">未就近接入</div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,cityRoadData,1)" style="display: none;"></button>
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
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,cityRoadData,2)" style="display: none;"></button>
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
                            <span class="nameInfo">指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="gotoListPage" title="进入KPI列表" v-on:click="gotoKPIList(cityRoadData)"></button>
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
                        <li  v-if="cityRoadData.lte_to_3g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">下切数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ cityRoadData.lte_to_3g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="cityRoadData.user_4g_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ cityRoadData.user_4g_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="cityRoadData.flow_4g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">流量(MB)</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="cityRoadData.flow_4g_tot == null  || cityRoadData.flow_4g_tot == ''">&nbsp;</span>
                                <span class="blueInfo" v-cloak v-else>{{ cityRoadData.flow_4g_tot.toFixed(2) }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">覆盖率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="cityRoadData.cover_rate == null || cityRoadData.cover_rate == ''">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ cityRoadData.cover_rate }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="cityRoadData.ce_good_ratio_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">感知优良率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="cityRoadData.ce_good_ratio_avg == null || cityRoadData.ce_good_ratio_avg == ''">&nbsp;</span>
                                <span class="blueInfo" v-cloak>{{ (cityRoadData.ce_good_ratio_avg * 100).toFixed(2) }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="cityRoadData.rsrp_count != null">
                            <div class="colDiv">
                                <span class="nameInfo">AGPS记录数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ cityRoadData.rsrp_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="cityRoadData.rsrp != null">
                            <div class="colDiv">
                                <span class="nameInfo">RSRP均值</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="cityRoadData.dx_rsrp_sum == null || cityRoadData.dx_rsrp_sum == '' || cityRoadData.dx_rsrp_count == null || cityRoadData.dx_rsrp_count == ''">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ (cityRoadData.dx_rsrp_sum/cityRoadData.dx_rsrp_count).toFixed(2) }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="cityRoadData.grid_count != null">
                            <div class="colDiv">
                                <span class="nameInfo">里程数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ cityRoadData.all_grid_nums }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap  <%--noshow--%>">
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
                                <span class="blueInfo" v-cloak v-if="cityRoadData.min_userex_upavgrate != null">{{ cityRoadData.min_userex_upavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">KPI感知下行速率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="cityRoadData.min_userex_dwavgrate != null">{{ cityRoadData.min_userex_dwavgrate }} Mbps</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_position.png">
                            <span class="nameInfo">GPS坐标</span>
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
                                <span class="nameInfo">起点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ cityRoadData.longitude_min }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">起点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ cityRoadData.latitude_min }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv fLeft">
                                <span class="nameInfo">终点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ cityRoadData.longitude_max }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">终点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ cityRoadData.latitude_max }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
<%--市政路结束--%>
<%--地铁开始--%>
<div class="listDiv" id="showMetroList" style="display: none;">
    <div class="listWrap showListWrap">
        <div class="searchTitle">在“广州”天河区域内搜索</div>
        <ul class="listTopUl">
            <li class="selectCity" id="metroSelectCity">
                <div class="select-name selectCity-name">
                    <img src="../js/IntelligentRoadTest/images/nor_add.png" class="name-icon">
                    <span class="city-selected" id="metroCityName">广州</span>
                    <span class="triangle"></span>
                </div>
                <div class="select-info city-info" style="display: none;">
                    <ul id="metroSelectCityList" class="city-list"></ul>
                </div>
            </li>
            <li class="recomendSort" id="metroSort">
                <div class="select-name"><span>推荐排序</span><span class="triangle"></span></div>
                <div class="select-info">
                    <ul class="sortUl" >
                        <li>名称优先</li>
                        <li class="selected">弱占比优先</li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="listDivWrap" id="showMetroDiv">
            <ul class="listUL">
                <li v-for = "(item , index , key ) in metroList" class="cursor" v-on:mouseover = "turnMk(index,item)" v-on:click="goNextList(item , index)">
                    <div class="colDiv">
                        <span class="metroNumSpan" ></span>
                       <%-- <span class="bold" v-on:click="positionSatr(item)">{{ item.line_name }}</span>--%>
                        <span class="bold">{{ item.line_name }}</span>
                    </div>
                    <div class="colDiv">
                        <div class="" >
                            <span>弱路段数：</span>
                            <span v-cloak v-if="item.poor_count != null">{{ item.poor_count }}</span>
                            <span v-cloak v-else>--</span>
                        </div>
                        <div class="positionRight">
                            <span>总覆盖率：</span>
                            <span v-cloak v-if="item.cover_rate_total != null">{{ item.cover_rate_total }}%</span>
                            <span v-cloak v-else>--</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <div class="">
                            <span>总路段数：</span>
                            <span v-cloak v-if="item.line_sect_count != null">{{ item.line_sect_count }}</span>
                            <span v-cloak v-else>--</span>
                        </div>
                        <div class="positionRight">
                            <span>总RSRP均值：</span>
                            <span v-cloak v-if="item.rsrp_avg_total != null ">{{ item.rsrp_avg_total }}</span>
                            <span v-cloak v-else>--</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <div class="">
                            <span>覆盖段数：</span>
                            <span v-cloak v-if="item.cov_count != null">{{ item.cov_count }}</span>
                            <span v-cloak v-else>{{ item.cov_count }}</span>
                        </div>
                        <div class="positionRight">
                            <span>弱路段占比：</span>
                            <span v-cloak v-if="item.poor_ratio != null">{{ item.poor_ratio }}%</span>
                            <span v-cloak v-else>--</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <div class="">
                            <span>总站点数：</span>
                            <span v-cloak v-if="item.station_cnt != null">{{ item.station_cnt }}</span>
                            <span v-cloak v-else>--</span>
                        </div>
                        <div class="positionRight">
                            <span>覆盖站点数：</span>
                            <span v-cloak v-if="item.cov_station_cnt != null">{{ item.cov_station_cnt }}</span>
                            <span v-cloak v-else>--</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <div class="">
                            <span>弱站点数：</span>
                            <span v-cloak v-if="item.weak_station_cnt != null">{{ item.weak_station_cnt }}</span>
                            <span v-cloak v-else>--</span>
                        </div>
                        <div class="positionRight">
                            <span>弱站点占比：</span>
                            <span v-cloak v-if="item.weak_station_rate != null">{{ item.weak_station_rate }}%</span>
                            <span v-cloak v-else>--</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <div class="">
                            <span>站点覆盖率：</span>
                            <span v-cloak v-if="item.cov_station_rate != null">{{ item.cov_station_rate }}%</span>
                            <span v-cloak v-else>--</span>
                        </div>
                        <div class="positionRight">
                            <span>站点RSRP均值：</span>
                            <span v-cloak v-if="item.station_rsrp_avg != null">{{ item.station_rsrp_avg }}</span>
                            <span v-cloak v-else>--</span>
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
                        第<input class="page-num" type="text" id="metroPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
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
                <div class="page-info" id="metroMessage" <%--style="display: none;"--%>>
                    <%--本页显示<span >第{{ startIndex }}</span>-<span >{{ lastIndex }}</span>条的数据，--%>
                    共<span v-cloak>{{ totalCounts }}</span>条数据
                </div>
            </div>
        </div>
    </div>
    <div class="listWrap showListDetail">
        <div class="backListDiv" id="metroListCount"> &lt; 返回上一级</div>
        <ul class="listTopUl">
            <li class="selectCity grayBackground" style="width:25%;">
                <div class="select-name selectCity-name">
                    <img src="../js/IntelligentRoadTest/images/nor_add.png" class="name-icon">
                    <span class="city-selected" id="metroCityNameD">广州</span>
                    <span class="triangle"></span>
                </div>
            </li>
            <li class="classify classifyWrap"  style="width:45%">
                <div class="select-name" ><span id="metroName"></span><span id="metroType">综合指标</span><span class="triangle"></span></div>
                <div class="select-info" id="metroTypeList">
                    <ul class="sortUl">
                        <li class="selected" id="metroAll">综合指标</li>
                        <li id = "mertroZheng">正向指标</li>
                        <li id = "mertroFan">反向指标</li>
                    </ul>
                </div>
            </li>
            <li class="recomendSort" id="metroSortD" style="width:30%">
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
        <div class="listDivWrap" id="showMetroListDiv">
            <ul class="listUL">
                <li v-for = "(item , index , key ) in metroList" class="cursor" @click = "showMessage(item ,index)" v-on:mouseover = "turnMk(index,item)" v-bind:id="item.from_station_name + item.to_station_name + 'List'">
                    <div class="colDiv">
                        <span class="metroNumSpan" v-bind:id="item.from_station_name + item.to_station_name"></span>
                        <span class="bold" v-cloak>{{ item.from_station_name }}
                            <img src="../js/IntelligentRoadTestV3/images/metroType2.png" v-if="metroType == null || metroType == 2">
                            <img src="../js/IntelligentRoadTestV3/images/metroType.png" v-else>
                            {{ item.to_station_name }}</span>
                    </div>
                    <div class="colDiv">
                        <div>
                            <span>弱路段数：</span>
                            <span v-cloak v-if="item.poor_count_sect != null">{{ item.poor_count_sect }}</span>
                            <span v-cloak v-else>--</span>
                        </div>
                        <div class="positionRight">
                            <span>总覆盖率：</span>
                            <span v-cloak v-if="item.cover_rate_total != null">{{ item.cover_rate_total }}%</span>
                            <span v-cloak v-else>--</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <div>
                            <span>总路段数：</span>
                            <span v-cloak v-if="item.line_sect_count != null">{{ item.line_sect_count }}</span>
                            <span v-cloak v-else>--</span>
                        </div>
                        <div class="positionRight">
                            <span>总RSRP均值：</span>
                            <span v-cloak v-if="item.rsrp_avg_total != null">{{ item.rsrp_avg_total }}</span>
                            <span v-cloak v-else>--</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <div class="">
                            <span>覆盖段数：</span>
                            <span v-cloak v-if="item.cov_count_sect != null">{{ item.cov_count_sect }}</span>
                            <span v-cloak v-else>--</span>
                        </div>
                        <div class="positionRight">
                            <span>弱路段占比：</span>
                            <span v-cloak>{{ (item.poor_count_sect/item.cov_count_sect * 100).toFixed(2) }}%</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <div class="">
                            <span>起站覆盖率：</span>
                            <span v-cloak v-if="item.cov_station_rate_from != null">{{ item.cov_station_rate_from }}%</span>
                            <span v-cloak v-else>--</span>
                        </div>
                        <div class="positionRight">
                            <span>止站覆盖率：</span>
                            <span v-cloak v-if="item.cov_station_rate_to != null">{{ item.cov_station_rate_to }}%</span>
                            <span v-cloak v-else></span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <div class="">
                            <span>起站RSRP均值：</span>
                            <span v-cloak v-if="item.station_rsrp_avg_from != null">{{ item.station_rsrp_avg_from }}</span>
                            <span v-cloak v-else>--</span>
                        </div>
                        <div class="positionRight">
                            <span>止站RSRP均值：</span>
                            <span v-cloak v-if="item.station_rsrp_avg_to != null">{{ item.station_rsrp_avg_to }}</span>
                            <span v-cloak v-else>--</span>
                        </div>
                    </div>
                    <div class="colDiv">
                        <div class="">
                            <span>隧道覆盖率：</span>
                            <span v-cloak v-if="item.rsrp_avg_sect != null">{{ item.cover_rate_sect }}%</span>
                            <span v-cloak v-else>--</span>
                        </div>
                        <div class="positionRight">
                            <span>隧道RSRP均值：</span>
                            <span v-cloak v-if="item.cover_rate_sect != null">{{ item.rsrp_avg_sect }}</span>
                            <span v-cloak v-else>--</span>
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
                        第<input class="page-num" type="text" id="metroSecondListPage" v-model="currentPageNum">页，共<span v-cloak>{{ totalPages }}</span>页
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
                <div class="page-info" id="metroCountMessage">
                    共<span v-cloak>{{ totalCounts }}</span>条数据
                </div>
            </div>
        </div>
    </div>
    <div class="detailList">
        <div class="backList" id="metroCount"> &lt; 返回上一级</div>
        <div class="detailListDiv" id="showMetroCompleteMessage">
            <div class="infoHeader">
                <div class="brDiv">
                    <span v-cloak>{{ metroData.line_name }}</span>
                    <%--<select v-model="metroData.mr_flag_name" class="fRight" id="metroLineSelect" style="height: 26px;" @change="changeMrFlagMessage($event, metroData)">
                        <option value="正向">正向</option>
                        <option value="反向">反向</option>
                        <option value="双向综合">双向综合</option>
                    </select>--%>
                </div>
                <div class="brDiv">
                    <span v-cloak>
                        路段编号：{{ metroData.line_id }}
                        <button id="metroPosition" class="positionDivBtn" v-on:click="metroPosition(metroData)">
                            <img class="" src="../js/IntelligentRoadTestV3/images/white_position.png?20180516.png" title="定位">
                        </button>
                    </span>
                    <span class="fRight" v-cloak>地市：{{ metroData.city_name }}</span>
                </div>
                <div class="brDiv">
                    <span v-cloak>起始站点编号：{{ metroData.from_station_id }}</span>
                    <span class="fRight" v-cloak>起始站点：{{ metroData.from_station_name }}</span>
                </div>
                <div class="brDiv">
                    <span v-cloak>终点站点编号：{{ metroData.to_station_id }}</span>
                    <span class="fRight" v-cloak>终点站点：{{ metroData.to_station_name }}</span>
                </div>
            </div>
            <ul class="infoBody">
                <li class="liWrap chartGroup">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTestV5/images/change7.png" class="rotateImg">
                            <span class="nameInfo">全量MR覆盖趋势</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block;">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">双向综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png" class="rotateImg">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo" style="display: block;">
                                <li>
                                    <div id="metroLineChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">正向</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="metroForwardLineChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">反向</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="metroReverseLineChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">开始站点</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="metroStarStationChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">结束站点</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="metroEndStationChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="liWrap hidedLi" >
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/change7.png">
                            <span class="nameInfo">{{ alaram_title }}</span>
                        </div>
                        <div class="floatRight">
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li id="metroChartDiv">
                            <div id="metroChart" class="chartDiv"></div>
                        </li>
                        <li class="colName">
                            <div class="colDiv">类型</div>
                            <div class="colDiv">值</div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="metroData.lte_to_3g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">下切数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ metroData.lte_to_3g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="metroData.user_4g_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ metroData.user_4g_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="metroData.flow_4g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">流量(MB)</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="metroData.flow_4g_tot == null  || metroData.flow_4g_tot == ''">&nbsp;</span>
                                <span class="blueInfo" v-cloak v-else>{{ metroData.flow_4g_tot.toFixed(2) }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">覆盖率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="metroData.cover_rate_sect == null || metroData.cover_rate_sect == ''">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ metroData.cover_rate_sect  }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="metroData.ce_good_ratio_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">感知优良率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="metroData.ce_good_ratio_avg == null || metroData.ce_good_ratio_avg == ''">&nbsp;</span>
                                <span class="blueInfo" v-cloak>{{ (metroData.ce_good_ratio_avg * 100).toFixed(2) }}%</span>
                            </div>
                            <div class="colDiv"></div>
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
                                <img src="../js/IntelligentRoadTestV5/images/showTop5.png" class="rotateImg">
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo" style="display: block;">
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">双向综合</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png" class="rotateImg">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo" style="display: block;">
                                <li>
                                    <div id="metroSecondChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">正向</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="metroForwardSecondChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">反向</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="metroReverseSecondChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">开始站点</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="metroStartStationSecondChart" class="chartDiv"></div>
                                </li>
                            </ul>
                        </li>
                        <li class="liWrap">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)">
                                <div class="inline">
                                    <span class="nameInfo">结束站点</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV5/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li>
                                    <div id="metroEndStationSecondChart" class="chartDiv"></div>
                                </li>
                            </ul>
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
                            <button class="linkCell" title="显示连线" v-on:click="showLinkCell($event,metroData,2)" style="display: none;"></button>
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

                <%--开始站点的TA--%>
                <li class="liWrap stationLi">
                    <div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img class="cursor" src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">起始站点全量MR数据TA列表：{{ metroData.from_station_name }}</span>
                        </div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示TA" v-on:click="showTA($event , metroData , fromStationTAArr , 'start')" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png"> <%--这里需要更换图标--%>
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo searchRecentCell" style="display: none;">
                        <li class="cellInfoWrap" v-for="(data , index , key) in fromStationTAArr">
                            <div class="cellInfoDiv">
                                <div class="colDiv">
                                    <span class="nameInfo" v-if="index == 0">TA</span>
                                    <span class="blueInfo" v-cloak><span v-if="index < 3">=</span><span v-else>≥</span>{{ data.ta_level }}</span>
                                </div>
                                <div class="colDiv">
                                    <span class="nameInfo" v-if="index == 0">RSRP均值</span><span class="blueInfo" v-cloak>{{ data.rsrp_avg }}</span>
                                </div>
                                <div class="colDiv">
                                    <span class="nameInfo" v-if="index == 0">全量MR记录数</span>
                                    <span class="blueInfo" v-cloak >{{ data.counts }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <%--结束站点的TA--%>
                <li class="liWrap stationLi">
                    <div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img class="cursor" src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">结束站点全量MR数据TA列表：{{ metroData.to_station_name }}</span>
                        </div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示TA" v-on:click="showTA($event , metroData , toStationTAArr , 'end')" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png"> <%--这里需要更换图标--%>
                            </button>
                        </div>
                    </div>
                    <ul class="ulDetailInfo searchRecentCell" style="display: none;">
                        <li class="cellInfoWrap" v-for="(data , index , key) in toStationTAArr">
                            <div class="cellInfoDiv">
                                <div class="colDiv">
                                    <span class="nameInfo" v-if="index == 0">TA</span>
                                    <span class="blueInfo" v-cloak><span v-if="index < 3">=</span><span v-else>≥</span>{{ data.ta_level }}</span>
                                </div>
                                <div class="colDiv">
                                    <span class="nameInfo" v-if="index == 0">RSRP均值</span><span class="blueInfo" v-cloak>{{ data.rsrp_avg }}</span>
                                </div>
                                <div class="colDiv">
                                    <span class="nameInfo" v-if="index == 0">全量MR记录数</span>
                                    <span class="blueInfo" v-cloak >{{ data.counts }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>

                <%--开始站点的室分的TA--%>
                <li class="liWrap specialSectorLi">
                    <div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img class="cursor" src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">起始站点:{{ metroData.from_station_name }}室分TA列表</span>
                        </div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示TA" v-on:click="showSectorTA($event , metroData , fromStationSectorTAArr , 'start')" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png"> <%--这里需要更换图标--%>
                            </button>
                        </div>
                    </div>
                    <div class="stationSectorTA_title" style="display: none;">
                        <div class="colDiv">
                            <span class="nameInfo">TA</span>
                        </div>
                        <div class="colDiv">
                            <span class="nameInfo">RSRP均值</span>
                        </div>
                        <div class="colDiv">
                            <span class="nameInfo">全量MR记录数</span>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap" v-for="(data , index , key) in fromStationSectorTAArr">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)"  >
                                <div class="inline">
                                    <span class="nameInfo" v-cloak>{{ data[0].enodeb_cell }}</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV3/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li class="specialInfoWrap stationSectorTA" v-for="(taData , dataIndex , key) in data">
                                    <div class="cellInfoDiv">
                                        <div class="colDiv">
                                            <span class="blueInfo" v-cloak>
                                                <span v-if="dataIndex < 3">=</span><span v-else>≥</span>{{ taData.ta_level }}
                                            </span>
                                        </div>
                                        <div class="colDiv">
                                            <span class="blueInfo" v-cloak>{{ taData.rsrp_avg }}</span>
                                        </div>
                                        <div class="colDiv">
                                            <span class="blueInfo" v-cloak >{{ taData.ta_count }}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>

                <%--结束站点的室分的TA--%>
                <li class="liWrap specialSectorLi">
                    <div class="nameBtn searchCellDiv" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img class="cursor" src="../js/IntelligentRoadTest/images/searchCell.png">
                            <span class="nameInfo">结束站点{{ metroData.to_station_name }}室分TA列表</span>
                        </div>
                        <div class="floatRight">
                            <button class="linkCell" title="显示TA" v-on:click="showSectorTA($event , metroData , toStationSectorTAArr , 'end')" style="display: none;"></button>
                            <button class="btn-showInfo">
                                <img src="../js/IntelligentRoadTest/images/showTop5.png"> <%--这里需要更换图标--%>
                            </button>
                        </div>
                    </div>
                    <div class="stationSectorTA_title" style="display: none;">
                        <div class="colDiv">
                            <span class="nameInfo">TA</span>
                        </div>
                        <div class="colDiv">
                            <span class="nameInfo">RSRP均值</span>
                        </div>
                        <div class="colDiv">
                            <span class="nameInfo">全量MR记录数</span>
                        </div>
                    </div>
                    <ul class="ulDetailInfo">
                        <li class="liWrap" v-for="(data , index , key) in toStationSectorTAArr">
                            <div class="nameBtn dateSplit" v-on:click="showDetailInfo($event)"  >
                                <div class="inline">
                                    <span class="nameInfo" v-cloak>{{ data[0].enodeb_cell }}</span>
                                </div>
                                <div class="floatRight">
                                    <button class="btn-showInfo">
                                        <img src="../js/IntelligentRoadTestV3/images/showTop5.png">
                                    </button>
                                </div>
                            </div>
                            <ul class="ulDetailInfo">
                                <li class="specialInfoWrap stationSectorTA" v-for="(taData , dataIndex , key) in data">
                                    <div class="cellInfoDiv">
                                        <div class="colDiv">
                                            <span class="blueInfo" v-cloak>
                                                <span v-if="dataIndex < 3">=</span><span v-else>≥</span>{{ taData.ta_level }}
                                            </span>
                                        </div>
                                        <div class="colDiv">
                                            <span class="blueInfo" v-cloak>{{ taData.rsrp_avg }}</span>
                                        </div>
                                        <div class="colDiv">
                                            <span class="blueInfo" v-cloak >{{ taData.ta_count }}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>

                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">地铁站+隧道综合指标</span>
                        </div>
                        <div class="floatRight">
                            <button class="gotoListPage" title="进入KPI列表" v-on:click="gotoKPIList(metroData)"></button>
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
                        <li  v-if="metroData.lte_to_3g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">下切数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ metroData.lte_to_3g_tot }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="metroData.user_4g_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">用户数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ metroData.user_4g_avg }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="metroData.flow_4g_tot != null">
                            <div class="colDiv">
                                <span class="nameInfo">流量(MB)</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="metroData.flow_4g_tot == null  || metroData.flow_4g_tot == ''">&nbsp;</span>
                                <span class="blueInfo" v-cloak v-else>{{ metroData.flow_4g_tot.toFixed(2) }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">覆盖率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="metroData.cover_rate_sect == null || metroData.cover_rate_sect == ''">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ metroData.cover_rate_sect  }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="metroData.ce_good_ratio_avg != null">
                            <div class="colDiv">
                                <span class="nameInfo">感知优良率</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="metroData.ce_good_ratio_avg == null || metroData.ce_good_ratio_avg == ''">&nbsp;</span>
                                <span class="blueInfo" v-cloak>{{ (metroData.ce_good_ratio_avg * 100).toFixed(2) }}%</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="metroData.rsrp_count != null">
                            <div class="colDiv">
                                <span class="nameInfo">AGPS记录数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ metroData.rsrp_count }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="metroData.rsrp_avg_sect != null">
                            <div class="colDiv">
                                <span class="nameInfo">RSRP均值</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="metroData.rsrp_avg_sect == null || metroData.rsrp_avg_sect == ''">&nbsp;</span>
                                <span class="blueInfo" v-else v-cloak>{{ metroData.rsrp_avg_sect }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  v-if="metroData.grid_count != null">
                            <div class="colDiv">
                                <span class="nameInfo">里程数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ metroData.line_length }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">双向隧道综合指标</span>
                        </div>
                        <div class="floatRight">
                            <button title="显示线段" class="linkCell" id="twowayLine"  v-on:click="changeLineShowFlag($event , metroData , 2)"></button>
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
                        <li  >
                            <div class="colDiv">
                                <span class="nameInfo">RSRP均值</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="otherDataObj.twoWayRsrp == null || otherDataObj.twoWayRsrp == ''">--</span>
                                <span class="blueInfo" v-else v-cloak>{{ otherDataObj.twoWayRsrp }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  >
                            <div class="colDiv">
                                <span class="nameInfo">全量MR记录数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="otherDataObj.twoWayAllMrCount == null">--</span>
                                <span class="blueInfo" v-cloak>{{ otherDataObj.twoWayAllMrCount }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">正向隧道指标</span>
                        </div>
                        <div class="floatRight">
                            <button title="显示线段" class="linkCell" id="forwardLine" v-on:click="changeLineShowFlag($event , metroData , 1)"></button>
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
                        <li  >
                            <div class="colDiv">
                                <span class="nameInfo">RSRP均值</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="otherDataObj.forwardRsrp == null || otherDataObj.forwardRsrp == ''">--</span>
                                <span class="blueInfo" v-else v-cloak>{{ otherDataObj.forwardRsrp }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li  >
                            <div class="colDiv">
                                <span class="nameInfo">全量MR记录数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="otherDataObj.forwardAllMrCount == null">--</span>
                                <span class="blueInfo" v-cloak v-else>{{ otherDataObj.forwardAllMrCount }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
                <li class="liWrap">
                    <div class="nameBtn" v-on:click="showDetailInfo($event)">
                        <div class="inline">
                            <img src="../js/IntelligentRoadTest/images/detail_index.png">
                            <span class="nameInfo">反向隧道指标</span>
                        </div>
                        <div class="floatRight">
                            <button title="显示线段" class="linkCell" id="resverseLine" v-on:click="changeLineShowFlag($event , metroData , -1)"></button>
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
                                <span class="nameInfo">RSRP均值</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-if="otherDataObj.resverseRsrp == null || otherDataObj.resverseRsrp == ''">--</span>
                                <span class="blueInfo" v-else v-cloak>{{ otherDataObj.resverseRsrp }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li>
                            <div class="colDiv">
                                <span class="nameInfo">全量MR记录数</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak v-if="otherDataObj.resverseAllMrCount == null">--</span>
                                <span class="blueInfo" v-cloak v-else>{{ otherDataObj.resverseAllMrCount }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
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
                                <span class="nameInfo">起点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ metroData.longitude_min }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">起点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ metroData.latitude_min }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv fLeft">
                                <span class="nameInfo">终点经度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ metroData.longitude_max }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                        <li >
                            <div class="colDiv">
                                <span class="nameInfo">终点纬度</span>
                            </div>
                            <div class="colDiv">
                                <span class="blueInfo" v-cloak>{{ metroData.latitude_max }}</span>
                            </div>
                            <div class="colDiv"></div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
<%--地铁结束--%>
