<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<link rel="stylesheet" type="text/css" href="../js/tableTools/tableToolsNewTwo.css"/>
<link rel="stylesheet" type="text/css" href="../js/IntelligentRoadTest/IntelligentRoadTestChart.css?2018011211" />
<script type="text/javascript" src="../js/util/uploadData.js"></script>
<script type="text/javascript" src="../js/util/exportExcel.js"></script>

<!-- 增加progressbarTwo的查询数据同步方法 -->
<script type="text/javascript" src="../js/util/progressbarTwo.js?2017022803"></script>
<div class="pc_listb" id="pc_listb_IntelligentRoadTestChart">
    <div class="main-content">
        <div class="topContent">
            <div class="leftBar">
                <div class="dateDiv">20180104 ~ 20180110</div>
                <div class="textName">
                    <span class="cityName">广州市</span><span class="typeName">弱区</span><span>数据表</span>
                </div>
            </div>
            <div class="exportDiv">
                <button type="button" class="btn-bg btn-export" id="export">导出</button>
            </div>
        </div>
        <div class="contentDiv">
            <!-- 上面的2个柱状折线图div  -->
            <div class="chartWrap">
                <div class="box-shadow">
                    <div class="chartDiv-top">
                        <div class="chartTitle" id="topbar">
                            <div class="chartTop">
                                <span class="city">全省</span>RSRP&lt;-105db弱覆盖区域数及弱覆盖栅格占比
                            </div>
                            <div class="chartTop">
                                弱区总数：<span class="poorTotalNum">35192</span>
                                弱栅格总数：<span class="gridTotalNum">938777</span>
                            </div>
                        </div>
                        <div class="chartDiv" id="chartTop"></div>
                    </div>
                    <div class="chartDiv-bottom">
                        <div class="chartTitle" id="bottombar">
                            <div class="chartTop">
                                <span class="city"></span>RSRP&lt;-105db弱覆盖区域数及弱覆盖栅格占比
                            </div>
                            <div class="chartTop">
                                弱区总数：<span class="poorTotalNum">35192</span>
                                弱栅格总数：<span class="gridTotalNum">938777</span>
                            </div>
                        </div>
                        <div class="chartDiv" id="chartBottom"></div>
                    </div>
                </div>
            </div>
            <!-- 下面的表格div  -->
            <div class="tableDivWrap">
                <div class="box-shadow">
                    <div class="tableDiv">
                        <div id="areaTable" class="tableSt"></div>
                        <div id="jzTable" class="tableStJz"></div>
                        <div id="concernAreaTable" class="tableSt"></div>
                        <div id="alarmInfoTable" class="tableSt"></div>
                        <div id="DTTable" ></div>
                        <div id="sectorTable"></div>
                        <div id="poorareaTable"></div>
                        <div id="MacSectorTable"></div>
                        <div id="gaosuTable"></div>
                        <div id="ditieTable"></div>
                        <div id="wugaoAreaTable"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="../js/echarts/echarts.min.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript"src="../js/tableTools/tableToolsNewTwo.js"></script>
<script type="text/javascript" src="../js/util/callBackChangeData.js?2017060610"></script>
<script src="../js/IntelligentRoadTest/IntelligenRoadTestChartExport.js"></script>
<script type="text/javascript" src="../js/IntelligentRoadTest/IntelligentRoadTestChart.js?2018011211"></script>
