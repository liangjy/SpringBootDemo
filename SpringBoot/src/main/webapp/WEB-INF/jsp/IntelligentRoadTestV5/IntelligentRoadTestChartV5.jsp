<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<link rel="stylesheet" type="text/css" href="../js/tableTools/tableToolsNewTwo.css"/>
<link rel="stylesheet" type="text/css" href="../js/IntelligentRoadTestV5/IntelligentRoadTestChartV5.css?2018011211" />
<link rel="stylesheet" type="text/css" href="../css/daterangepicker.css" />
<%--<link rel="stylesheet" type="text/css" href="../css/default.css" />--%>
<%--<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>--%>
<script type="text/javascript" src="../js/util/uploadData.js"></script>
<script type="text/javascript" src="../js/util/exportExcel.js"></script>
<script type="text/javascript" src="../js/util/moment.min.js"></script>
<script type="text/javascript" src="../js/util/jquery.daterangepicker.js"></script>
<script type="text/javascript" src="../js/util/GPSUtil.js"></script>

<!-- 增加progressbarTwo的查询数据同步方法 -->
<script type="text/javascript" src="../js/util/progressbarTwo.js?2017022803"></script>

<template id="monthTemplate">
    <div class="dateDiv">
        <input id="startTime" class="datebox"  :value="start" readonly="readonly"  @focus.stop="changeSTime()"
               onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-{%M-1}',isShowClear:false,isShowToday:false,isShowOK:false})">
        <span >~</span>
        <input id="endTime" class="datebox" :value="end"   readonly="readonly" @focus.stop="changeETime()"
               onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-{%M-1}',isShowClear:false,isShowToday:false,isShowOK:false})">
        <span class="triangleGrey"></span>
    </div>
</template>
<template id="dayTemplate">
    <div class="dateDiv">
        <span id="date-range9" class="datebox">{{start}} - {{end}}</span>
        <span class="triangleGrey"></span>
    </div>
</template>
<template id="dayTemplate2">
    <div class="dateDiv">
        <span id="date-range9-2" class="datebox">{{start}} - {{end}}</span>
        <span class="triangleGrey"></span>
    </div>
</template>

<%--弱区模版--%>
<template id="weakAreaChartId">
    <div class="chartDivWrap">
        <div class="chartTop" style="padding-left: 20px">
            <span>{{city}}{{distinct_title_str}}</span>
            <span v-show="wal == '弱区'">RSRP<-105db弱区区域数及弱栅格占比</span>
            <span v-show="wal == '上行低速区'">上行速率<256K的低速率区域数量及栅格占比</span>
            <span v-show="wal == '下行低速区'">下行速率<5M的低速率区域数量及栅格占比</span>
            <span v-show="wal == 'MOD3干扰区'">MOD3干扰区区域数及MOD3干扰栅格占比</span>
            <span v-show="wal == '越区覆盖区'">越区覆盖区区域数及越区覆盖区栅格占比</span>
            <span v-show="wal == '重叠覆盖区'">重叠覆盖区区域数及重叠覆盖区栅格占比</span>
            <button type="button" id="tabExport" @click.stop="chartExport" class="btn-bg btn-export">图表导出</button>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="weakAreaChartId2">
    <div class="chartDivWrap">
        <div class="chartTop">
            <span>{{city}}{{countryStr}}{{market_title_str}}{{endDay}}</span>
            <span v-show="wal == '弱区'">RSRP<-105db弱区区域数及弱栅格占比</span>
            <span v-show="wal == '上行低速区'">上行速率<256K的低速率区域数量及栅格占比</span>
            <span v-show="wal == '下行低速区'">下行速率<5M的低速率区域数量及栅格占比</span>
            <span v-show="wal == 'MOD3干扰区'">MOD3干扰区区域数及MOD3干扰栅格占比</span>
            <span v-show="wal == '越区覆盖区'">越区覆盖区区域数及越区覆盖区栅格占比</span>
            <span v-show="wal == '重叠覆盖区'">重叠覆盖区区域数及重叠覆盖区栅格占比</span>
            <button type="button" id="tabExport" @click.stop="chartExport" class="btn-bg btn-export">图表导出</button>
            <%--<component :is="daycom" :st="st" :et="et"></component>--%>
        </div>
        <div class="chartDiv" id="allRegionChart2"></div>
    </div>
</template>
<template id="weakAreaTableId">
    <div class="tbWrap">
        <div class="tbTitle">{{endDay}}{{city}}{{wal}}统计表({{tc}})
            <button type="button" id="tabExport" @click.stop="tableExport" class="btn-bg btn-export">表格导出</button>
        </div>
        <div id="tableParentDiv" class="tableSt" >
            暂无数据
        </div>
    </div>
</template>

<%--扇区模版--%>
<template id="sectorChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <button type="button" id="tabExport" @click.stop="chartExport" class="btn-bg btn-export">图表导出</button>
            {{city}}{{distinct_title_str}}
            <select id="" v-model="bestOrsc" :disabled="isDisabled1">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold" :disabled="isDisabled1">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>厂家：</span>
            <select id="" v-model="factory">
                <option v-for="item in factorys" :value="item.value">{{ item.text }}</option>
            </select>
            <select name="" id="" v-model="numOrRate1">
                <option value="覆盖率">覆盖率</option>
                <option value="基站扇区数">基站扇区数</option>
            </select>
            <span>趋势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="sectorChartId2">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <button type="button" id="tabExport" @click.stop="chartExport" class="btn-bg btn-export">图表导出</button>
            {{city}}{{countryStr}}{{market_title_str}}{{endDay}}
            <select id="" v-model="bestOrsc" :disabled="isDisabled2">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold" :disabled="isDisabled2">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>厂家：</span>
            <select id="" v-model="factory">
                <option v-for="item in factorys" :value="item.value">{{ item.text }}</option>
            </select>
            <select name="" id="" v-model="numOrRate2">
                <option value="覆盖率">覆盖率</option>
                <option value="基站扇区数">基站扇区数</option>
            </select>
            <span>趋势图</span>
            <%--<component :is="daycom" :st="st" :et="et"></component>--%>
        </div>
        <div class="chartDiv" id="allRegionChart2"></div>
    </div>
</template>
<template id="sectorTableId">
    <div class="tbWrap">
        <div class="tbTitle">
            <ul class="tabUl">
                <li v-for="(tabOption,index) in tabOptions" :class="{active:index==tabOptionIdx}" @click="tabOptionIdx=index">
                    {{tabOption}}
                </li>
            </ul>
            <span v-show="tabOptionIdx==1">{{endDay}}{{city}}扇区统计表({{tc}})</span>
            <span v-show="tabOptionIdx==0">{{endDay}}{{city}}营服统计表({{tc2}})</span>
            <span v-show="tabOptionIdx==2">{{endDay}}{{city}}勘误统计表({{tc3}})</span>
            <button type="button" id="tabExport" @click.stop="tableExport" class="btn-bg btn-export" v-show="isshow&&tabOptionIdx==1">表格导出</button>
            <button type="button" id="celltableExport" @click.stop="celltableExport" class="btn-bg btn-export" v-show="isshow&&tabOptionIdx==0" >表格导出</button>
            <button type="button" id="kanwutableExport" @click.stop="kanwutableExport" class="btn-bg btn-export" v-show="isshow&&tabOptionIdx==2" >表格导出</button>
        </div>
        <div id="tableParentDiv" class="tableSt" v-show="tabOptionIdx==1">
            暂无数据
        </div>
        <div id="tableParentDiv2" class="tableSt" v-show="tabOptionIdx==0">
        </div>
        <div id="tableParentDiv3" class="tableSt" v-show="tabOptionIdx==2">
        </div>
    </div>
</template>

<%--高铁模版--%>
<template id="highRailChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <button type="button" id="tabExport" @click.stop="chartExport" class="btn-bg btn-export">图表导出</button>
            {{city}}{{distinct_title_str}}
            <span>高铁</span>
            <span>场景：</span>
            <select id="" v-model="sence">
                <option v-for="sence in sences" :value="sence">{{ sence }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">{{ item.text }}</option>
            </select>
            <span>覆盖走势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="highRailChartId2">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <button type="button" id="tabExport" @click.stop="chartExport" class="btn-bg btn-export">图表导出</button>
            {{city}}{{market_title_str}}
            <span>线路：</span>
            <select id="" v-model="lineRoad">
                <option v-for="lineRoad in lineRoads" :value="lineRoad">{{ lineRoad }}</option>
            </select>
            <span>场景：</span>
            <select id="" v-model="sence">
                <option v-for="sence in sences" :value="sence">{{ sence }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">{{ item.text }}</option>
            </select>
            <span>覆盖走势图</span>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart2"></div>
    </div>
</template>
<template id="highRailTableId">
    <div class="tbWrap" v-if="tabOptions.length == 5">
        <div class="tbTitle">
            <ul class="tabUl">
                <li v-for="(tabOption,index) in tabOptions" :class="{active:index==tabOptionIdx}" @click="tabOptionIdx=index">
                    {{tabOption}}
                </li>
            </ul>
            <span v-show="tabOptionIdx==0">{{endDay}}{{city}}高铁线路统计表({{tc}})</span>
            <span v-show="tabOptionIdx==1">{{endDay}}{{city}}高铁500米分段统计表({{tc2}})</span>
            <span v-show="tabOptionIdx==2">{{endDay}}{{city}}高铁弱连段统计表({{tc3}})</span>
            <span v-show="tabOptionIdx==3">{{endDay}}{{city}}高铁隧道统计表({{tc4}})</span>
            <span v-show="tabOptionIdx==4">{{endDay}}{{city}}高铁非隧道统计表({{tc5}})</span>
            <button type="button" id="tabExport" @click.stop="tableExport" class="btn-bg btn-export" v-show="tabOptionIdx==0">表格导出</button>
            <button type="button" id="table500Export" @click.stop="tableExport('500米')" class="btn-bg btn-export" v-show="tabOptionIdx==1" >表格导出</button>
            <button type="button" id="table500Export" @click.stop="tableExport('弱连段')" class="btn-bg btn-export" v-show="tabOptionIdx==2" >表格导出</button>
            <button type="button" id="table500Export" @click.stop="tableExport('隧道')" class="btn-bg btn-export" v-show="tabOptionIdx==3" >表格导出</button>
            <button type="button" id="table500Export" @click.stop="tableExport('非隧道')" class="btn-bg btn-export" v-show="tabOptionIdx==4" >表格导出</button>
        </div>
        <div id="tableParentDiv" class="tableSt" v-show="tabOptionIdx==0"></div>
        <div id="tableParentDiv2" class="tableSt" v-show="tabOptionIdx==1"></div>
        <div id="tableParentDiv3" class="tableSt" v-show="tabOptionIdx==2"></div>
        <div id="tableParentDiv4" class="tableSt" v-show="tabOptionIdx==3"></div>
        <div id="tableParentDiv5" class="tableSt" v-show="tabOptionIdx==4"></div>
    </div>
    <div class="tbWrap" v-else="tabOptions.length == 4">
        <div class="tbTitle">
            <ul class="tabUl">
                <li v-for="(tabOption,index) in tabOptions" :class="{active:index==tabOptionIdx}" @click="tabOptionIdx=index">
                    {{tabOption}}
                </li>
            </ul>
            <span v-show="tabOptionIdx==0">{{endDay}}{{city}}高铁线路统计表({{tc}})</span>
            <span v-show="tabOptionIdx==1">{{endDay}}{{city}}高铁500米分段统计表({{tc2}})</span>
            <span v-show="tabOptionIdx==2">{{endDay}}{{city}}高铁隧道统计表({{tc3}})</span>
            <span v-show="tabOptionIdx==3">{{endDay}}{{city}}高铁非隧道统计表({{tc4}})</span>
            <button type="button" id="tabExport" @click.stop="tableExport" class="btn-bg btn-export" v-show="tabOptionIdx==0">表格导出</button>
            <button type="button" id="table500Export" @click.stop="tableExport('500米')" class="btn-bg btn-export" v-show="tabOptionIdx==1" >表格导出</button>
            <button type="button" id="table500Export" @click.stop="tableExport('隧道')" class="btn-bg btn-export" v-show="tabOptionIdx==2" >表格导出</button>
            <button type="button" id="table500Export" @click.stop="tableExport('非隧道')" class="btn-bg btn-export" v-show="tabOptionIdx==3" >表格导出</button>
        </div>
        <div id="tableParentDiv" class="tableSt" v-show="tabOptionIdx==0"></div>
        <div id="tableParentDiv2" class="tableSt" v-show="tabOptionIdx==1"></div>
        <div id="tableParentDiv3" class="tableSt" v-show="tabOptionIdx==2"></div>
        <div id="tableParentDiv4" class="tableSt" v-show="tabOptionIdx==3"></div>
    </div>
</template>

<%--地铁模版--%>
<template id="metroChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <button type="button" id="tabExport" @click.stop="chartExport" class="btn-bg btn-export">图表导出</button>
            {{city}}{{distinct_title_str}}
            <%--<select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>--%>
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
        <div class="tbTitle">
            <ul class="tabUl">
                <li v-for="(tabOption,index) in tabOptions" :class="{active:index==tabOptionIdx}" @click="tabOptionIdx=index">
                    {{tabOption}}
                </li>
            </ul>
            <span v-show="tabOptionIdx==0">{{endDay}}{{city}}地铁线路统计表({{tc}})</span>
            <span v-show="tabOptionIdx==1">{{endDay}}{{city}}地铁TA段统计表({{tc2}})</span>
            <span v-show="tabOptionIdx==2">{{endDay}}{{city}}地铁站厅站台统计表({{tc3}})</span>
            <span v-show="tabOptionIdx==3">{{endDay}}{{city}}地铁站间段统计表({{tc4}})</span>
            <button type="button" id="tabExport" @click.stop="tableExport" class="btn-bg btn-export" v-show="tabOptionIdx==0">表格导出</button>
            <button type="button" id="metroTultableExport" @click.stop="metroTul" class="btn-bg btn-export" v-show="tabOptionIdx==1" >表格导出</button>
            <button type="button" id="metroSitetableExport" @click.stop="metroSite" class="btn-bg btn-export" v-show="tabOptionIdx==2" >表格导出</button>
            <button type="button" id="metroStationtableExport" @click.stop="metroStation" class="btn-bg btn-export" v-show="tabOptionIdx==3" >表格导出</button>
        </div>
        <div id="tableParentDiv" class="tableSt" v-show="tabOptionIdx==0">
        </div>
        <div id="tableParentDiv2" class="tableSt" v-show="tabOptionIdx==1">
        </div>
        <div id="tableParentDiv3" class="tableSt" v-show="tabOptionIdx==2">
        </div>
        <div id="tableParentDiv4" class="tableSt" v-show="tabOptionIdx==3">
        </div>
    </div>
</template>

<%--工单模版--%>
<template id="workOrderChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <button type="button" id="tabExport" @click.stop="chartExport" class="btn-bg btn-export">图表导出</button>
            <span id="alarmCurrentCnt"></span>&nbsp;&nbsp;
            <span id="alarmCurrentRecover"></span>&nbsp;&nbsp;
            <span id="alarmCurrentRecoverRate"></span>&nbsp;&nbsp;
            <%--<span id="alarmCurrentRecoverAll">所有告警当期恢复数：</span>&nbsp;&nbsp;--%>
            <div class="workOrderType">
                <span>工单类型：</span>
                <select id="" v-model="workOrderType">
                    <option v-for="w in workOrderTypes" :value="w">{{ w }}</option>
                </select>
            </div>
            <component :is="daycom" :st="st" :et="et"></component>
        </div>
        <div class="chartDiv" id="allRegionChart"></div>
    </div>
</template>
<template id="workOrderTableId">
    <div class="tbWrap">
        <div class="tbTitle">
            <ul class="tabUl">
                <li v-for="(tabOption,index) in tabOptions" :class="{active:index==tabOptionIdx}" @click="tabOptionIdx=index">
                    {{tabOption}}
                </li>
            </ul>
            {{city}}工单统计表
            <button type="button" id="tabExport" @click.stop="tableExport" class="btn-bg btn-export" v-show="tabOptionIdx==0">表格导出</button>
            <button type="button" id="workOrderCntTabExp" @click.stop="workOrderCntTabExp" class="btn-bg btn-export" v-show="tabOptionIdx==1">表格导出</button>
        </div>
        <div id="tableParentDiv" class="tableSt" v-show="tabOptionIdx==0">
            暂无数据
        </div>
        <div id="tableParentDiv2" class="tableSt" v-show="tabOptionIdx==1" >
            暂无数据
        </div>
    </div>
</template>

<%--高校模版--%>
<template id="collegeChartId">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <button type="button" id="tabExport" @click.stop="chartExport" class="btn-bg btn-export">图表导出</button>
            {{city}}{{distinct_title_str}}
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
<template id="collegeChartId2">
    <div class="chartDivWrap" style="display: block;">
        <div class="chartTop">
            <button type="button" id="tabExport" @click.stop="chartExport" class="btn-bg btn-export">图表导出</button>
            {{city}}{{countryStr}}{{market_title_str}}{{endDay}}
            <select id="" v-model="bestOrsc">
                <option v-for="item in bestOrscText" :value="item.value">{{ item.text }}</option>
            </select>
            <span>分级覆盖率门限：</span>
            <select id="" v-model="threshold">
                <option v-for="item in thresholds" :value="item.value">-{{ item.text }}</option>
            </select>
            <span>覆盖率趋势图</span>
            <%--<component :is="daycom" :st="st" :et="et"></component>--%>
        </div>
        <div class="chartDiv" id="allRegionChart2"></div>
    </div>
</template>
<template id="collegeTableId">
    <div class="tbWrap">
        <div class="tbTitle">
            <ul class="tabUl">
                <li v-for="(tabOption,index) in tabsOptions" :class="{active:index==tabOptionIdx}" @click="tabOptionIdx=index">
                    {{tabOption}}
                </li>
            </ul>
            <span v-if="tabOptionIdx==null">{{endDay}}{{city}}{{wal}}统计表({{tc}})</span>
            <span v-show="tabOptionIdx==0">{{endDay}}{{city}}{{wal}}AGPS-MR统计表({{tc}})</span>
            <span v-show="tabOptionIdx==1">{{endDay}}{{city}}{{wal}}全量MR综合统计表({{tc2}})</span>
            <span v-show="tabOptionIdx==2">{{endDay}}{{city}}{{wal}}全量MR室外统计表({{tc3}})</span>
            <span v-show="tabOptionIdx==3">{{endDay}}{{city}}{{wal}}全量MR室内统计表({{tc4}})</span>
            <button type="button" id="tabExportNull" @click.stop="tableExport" class="btn-bg btn-export" v-if="tabOptionIdx==null">表格导出</button>
            <button type="button" id="tabExport" @click.stop="tableExport(1)" class="btn-bg btn-export" v-show="tabOptionIdx==0">表格导出</button>
            <button type="button" id="metroTultableExport" @click.stop="tableExport(0)" class="btn-bg btn-export" v-show="tabOptionIdx==1" >表格导出</button>
            <button type="button" id="metroSitetableExport" @click.stop="tableExport(3)" class="btn-bg btn-export" v-show="tabOptionIdx==2" >表格导出</button>
            <button type="button" id="metroStationtableExport" @click.stop="tableExport(2)" class="btn-bg btn-export" v-show="tabOptionIdx==3" >表格导出</button>
        </div>
        <div id="tableParentDiv" class="tableSt" v-if="tabOptionIdx==null">
        </div>
        <div id="tableParentDiv" class="tableSt" v-show="tabOptionIdx==0">
        </div>
        <div id="tableParentDiv2" class="tableSt" v-show="tabOptionIdx==1">
        </div>
        <div id="tableParentDiv3" class="tableSt" v-show="tabOptionIdx==2">
        </div>
        <div id="tableParentDiv4" class="tableSt" v-show="tabOptionIdx==3">
        </div>
    </div>
</template>
<div class="pc_listb" id="pc_listb_IntelligentRoadTestChartV2" v-cloak @click.stop="bodyClick();">
    <input type="hidden" id="IntelligentRoadTestChartV2Export" value="统计导出V5">
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
                    <div class="selectDiv" @click.stop="showDistricts();" v-show="isHideByHighRail">
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
                <li v-show="false">
                    <div class="selectDiv" @click.stop="showMarketbase();">
                        <div class="select-name disable-name">
                            <img src="../js/IntelligentRoadTest/images/yingfu_nor.png" class="name-icon">
                            <a href="javascript:;" :class="{selectA:marketbases.length==0}" id="chart_marketbase" v-text="market"></a>
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
                    <div class="radioDiv" :class="{dateCycleStyle:mdisabled}">
                        <input type="radio" v-model="dateCycle" name="network" id="moonth" value="月" :checked="mchecked" :disabled="mdisabled">
                        <label for="moonth">月</label>
                    </div>
                    <div class="radioDiv" :class="{dateCycleStyle:wdisabled}">
                        <input type="radio" v-model="dateCycle" name="network" id="week" value="周" :checked="wchecked" :disabled="wdisabled">
                        <label for="week">周（历史7天）</label>
                    </div>
                    <div class="radioDiv" :class="{dateCycleStyle:ddisabled}">
                        <input type="radio" v-model="dateCycle" name="network" id="day" value="日" :checked="dchecked" :disabled="ddisabled">
                        <label for="day">日</label>
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
                    <component :distinct_title_str="distinctTitleStr"  :is="whoChart" :wal="statisticalTab" :daycom="whichDate" :st="urlStartDay" :et="urlEndDay" :besttext="bestOrscText" :thresholdstext="thresholds" :end-day="tableDay" :city="titleCity" :country="titleCountry" :num-or-rate="numOrRate" :is-disabled="isDisabled"></component>
                </div>
            </div>
            <div class="chartWrap" v-show="isShowChart2">
                <div class="box-shadow">
                    <component :market_title_str="marketTitleStr" :is="whoChart2" :wal="statisticalTab" :daycom="whichDate2" :st="urlStartDay" :et="urlEndDay" :besttext="bestOrscText" :thresholdstext="thresholds" :end-day="tableDay" :city="titleCity" :country="titleCountry" :num-or-rate="numOrRate2" :is-disabled="isDisabled2"></component>
                </div>
            </div>
            <!-- 下面的表格div  -->
            <div class="tableDivWrap">
                <div class="box-shadow">
                    <div class="tableDiv">
                        <component :is="whoTable" :wal="statisticalTab" :tc="tableInfo" :tc2="tableInfo2" :tc3="tableInfo3" :tc4="tableInfo4" :tc5="tableInfo5" :end-day="tableDay" :city="cityStr" :isshow="sectorExportIsShow" :taboptions="tabOptionsSector"></component>
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


<script type="text/javascript" src="../js/IntelligentRoadTestV5/chartTableComponent/utils/echartsUtils.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV5/chartTableComponent/dayComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV5/chartTableComponent/monthComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV5/chartTableComponent/allAreaComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV5/chartTableComponent/collegesComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV5/chartTableComponent/sectorComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV5/chartTableComponent/weakAreaComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV5/chartTableComponent/workOrderComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV5/chartTableComponent/highRailComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV5/chartTableComponent/metroComponent.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV5/chartTableComponent/utils/ReqParaUtil.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV5/chartTableComponent/utils/tableTitle.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV5/chartTableComponent/utils/tableInfoUtil.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV5/chartTableComponent/utils/tableDataProcessComm.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTestV5/IntelligentRoadTestChartV5.js?2018011211"></script>
