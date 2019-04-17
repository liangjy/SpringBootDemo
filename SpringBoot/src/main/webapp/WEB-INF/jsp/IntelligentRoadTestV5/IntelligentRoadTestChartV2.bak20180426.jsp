<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<link rel="stylesheet" type="text/css" href="../js/tableTools/tableToolsNewTwo.css"/>
<link rel="stylesheet" type="text/css" href="../js/IntelligentRoadTestV3/IntelligentRoadTestChartV2.css?2018011211" />
<script type="text/javascript" src="../js/util/uploadData.js"></script>
<script type="text/javascript" src="../js/util/exportExcel.js"></script>

<!-- 增加progressbarTwo的查询数据同步方法 -->
<script type="text/javascript" src="../js/util/progressbarTwo.js?2017022803"></script>

<template id="monthTemplate">
    <div class="dateDiv">
        <input id="startTime" class="datebox"  :value="start" readonly="readonly"
               onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
        <span >~</span>
        <input id="endTime" class="datebox" :value="end"   readonly="readonly"
               onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
        <span class="triangleGrey"></span>
    </div>
</template>
<template id="dayTemplate">
    <div class="dateDiv">
        <input id="startTime" class="datebox" :value="start"  readonly="readonly" @focus="changeSTime()"
               onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d',isShowClear:false,isShowToday:false,isShowOK:false})">
        <span >~</span>
        <input id="endTime" class="datebox" :value="end"   readonly="readonly" @focus="changeETime()"
               onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d',isShowClear:false,isShowToday:false,isShowOK:false})">
        <span class="triangleGrey"></span>
    </div>
</template>
<%--全区域模版--%>
<template id="allAreaChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>覆盖率趋势图</span>

            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="allAreaTableId">
    <div class="tbWrap">
        <div class="tbTitle">综合统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<%--弱区模版--%>
<template id="weakAreaChartId">
    <div class="chartDivWrap">
        <div class="chartTop">
            <span>RSRP<-105db弱覆盖区域数及弱覆盖栅格占比</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="weakAreaTableId">
    <div class="tbWrap">
        <div class="tbTitle">弱区统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<%--关注区域模版--%>
<template id="concernAreaChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>覆盖率趋势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="concernAreaTableId">
    <div class="tbWrap">
        <div class="tbTitle">关注区域统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<%--扇区模版--%>
<template id="sectorChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>覆盖率趋势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="sectorTableId">
    <div class="tbWrap">
        <div class="tbTitle">扇区统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<%--工单模版--%>
<template id="workOrderChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <span id="alarmCurrentCnt">当前告警总数：</span>&nbsp;&nbsp;
            <span id="alarmCurrentRecover">当期告警恢复数：</span>&nbsp;&nbsp;
            <span id="alarmCurrentRecoverRate">当期告警恢复比：</span>&nbsp;&nbsp;
            <span id="alarmCurrentRecoverAll">所有告警当期恢复数：</span>&nbsp;&nbsp;
            <span>工单类型：</span>
            <select id="" v-model="workOrderType">
                <option v-for="w in workOrderTypes" :value="w">{{ w }}</option>
            </select>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="workOrderTableId">
    <div class="tbWrap">
        <div class="tbTitle">工单统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<%--骨头区域模版--%>
<template id="boneAreaChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>覆盖率趋势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="boneAreaTableId">
    <div class="tbWrap">
        <div class="tbTitle">骨头区域统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<%--高速模版--%>
<template id="highSpeedChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>覆盖率趋势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="highSpeedTableId">
    <div class="tbWrap">
        <div class="tbTitle">高速统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>


<%--高铁模版--%>
<template id="highRailChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>覆盖率趋势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="highRailTableId">
    <div class="tbWrap">
        <div class="tbTitle">高铁统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<%--市政路模版--%>
<template id="municipalRoadChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>覆盖率趋势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="municipalRoadTableId">
    <div class="tbWrap">
        <div class="tbTitle">市政路统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<%--地铁模版--%>
<template id="metroChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>覆盖率趋势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="metroTableId">
    <div class="tbWrap">
        <div class="tbTitle">地铁统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<%--高校模版--%>
<template id="collegeChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>覆盖率趋势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="collegeTableId">
    <div class="tbWrap">
        <div class="tbTitle">高校统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<%--场馆模版--%>
<template id="venueChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>覆盖率趋势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="venueTableId">
    <div class="tbWrap">
        <div class="tbTitle">场馆统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<%--美食模版--%>
<template id="foodChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>覆盖率趋势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="foodTableId">
    <div class="tbWrap">
        <div class="tbTitle">美食统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<%--美景模版--%>
<template id="sceneChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>覆盖率趋势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="sceneTableId">
    <div class="tbWrap">
        <div class="tbTitle">美景统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<%--高密度住宅区模版--%>
<template id="highHomeChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>覆盖率趋势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="highHomeTableId">
    <div class="tbWrap">
        <div class="tbTitle">高密度住宅区统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<%--高流量商务区模版--%>
<template id="businessChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>覆盖率趋势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="businessTableId">
    <div class="tbWrap">
        <div class="tbTitle">高流量商务区统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<%--战狼模版--%>
<template id="zlChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>覆盖率趋势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="zlTableId">
    <div class="tbWrap">
        <div class="tbTitle">战狼统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<%--农贸市场模版--%>
<template id="marketChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>覆盖率趋势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="marketTableId">
    <div class="tbWrap">
        <div class="tbTitle">农贸市场统计表</div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<div class="pc_listb" id="pc_listb_IntelligentRoadTestChartV2" v-cloak @click.stop="bodyClick();">
    <div class="main-content">
        <!-- 正在加载数据弹框--start -->
        <div class="progressBox" v-show="isShowLoading">
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
                        <div class="select-name" @click.stop="showCityLists($event);">
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
                    <div class="selectDiv" @click.stop="showMarketbase();">
                        <div class="select-name disable-name">
                            <img src="../js/IntelligentRoadTest/images/yingfu_nor.png" class="name-icon">
                            <a href="javascript:;" :class="{selectA:marketbases.length==0}" id="chart_marketbase">{{market}}</a>
                            <span class="triangleGrey"></span>
                        </div>
                        <div class="select-info" id="marketbase" v-show="isShowmarketbase">
                            <p v-for="m in marketbases" :class="{selected:m==market}" @click.stop="changeMarketbase(m);">
                                {{m}}
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
                            <p v-for="st in statisticalObject" @click="statisticalClick(st);" :class="{selected:st==statistical}">
                                {{ st }}
                            </p>
                        </div>
                    </div>
                </li>
                <li class="select-network">
                    <img src="../js/IntelligentRoadTest/images/countWeek.png" class="name-icon">
                    <div class="radioDiv">
                        <input type="radio" v-model="dateCycle" name="network" id="moonth" value="月" :checked="mchecked" :disabled="mdisabled">
                        <label for="moonth">月</label>
                    </div>
                    <div class="radioDiv">
                        <input type="radio" v-model="dateCycle" name="network" id="week" value="周" :checked="wchecked" :disabled="wdisabled">
                        <label for="week">周</label>
                    </div>
                    <div class="radioDiv">
                        <input type="radio" v-model="dateCycle" name="network" id="day" value="日" :checked="dchecked" :disabled="ddisabled">
                        <label for="day">日</label>
                    </div>
                </li>
                <li>
                    <button type="button" class="btn-bg btn-sure" id="submit" @click.stop="sureSubmit">确定</button>
                </li>
            </ul>
            <div class="exportDiv">
                <button type="button" class="btn-bg btn-export" @click="tableExport" id="export">导出</button>
            </div>
        </div>
        <div class="contentDiv">
            <!-- 上面的2个柱状折线图div  -->
            <div class="chartWrap">
                <div class="box-shadow">

                    <component :is="who" :daycom="whichDate" :st="urlStartDay" :et="urlEndDay"></component>

                </div>
            </div>
            <!-- 下面的表格div  -->
            <div class="tableDivWrap">
                <div class="box-shadow">
                    <div class="tableDiv">

                        <component :is="whoTable" ></component>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="../js/util/vue.js"></script>
<script src="../js/util/dateUtil.js"></script>
<script src="../js/util/xlsx.full.min.js"></script>
<script src="../js/util/FileSaver.min.js"></script>
<script type="text/javascript" src="../js/util/crossfilter.js"></script>
<script src="../js/echarts/echarts.min.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript"src="../js/tableTools/tableToolsNewTwo.js"></script>
<script type="text/javascript" src="../js/util/callBackChangeData.js?2017060610"></script>
<script src="../js/IntelligentRoadTest/IntelligenRoadTestChartExport.js"></script>

<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/utils/echartsUtils.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/dayComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/monthComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/allAreaComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/boneAreaComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/businessComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/collegesComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/concernAreaComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/foodComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/highHomeComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/highRailComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/highSpeedComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/marketComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/metroComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/municipalRoadComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/sceneComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/sectorComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/venueComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/weakAreaComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/workOrderComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/zlComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/chartTableComponent/utils/tableDataProcessComm.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV3/IntelligentRoadTestChartV2.js?2018011211"></script>
