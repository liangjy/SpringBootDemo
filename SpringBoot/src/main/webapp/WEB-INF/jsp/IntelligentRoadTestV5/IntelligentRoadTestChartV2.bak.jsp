<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<link rel="stylesheet" type="text/css" href="../js/tableTools/tableToolsNewTwo.css"/>
<link rel="stylesheet" type="text/css" href="../js/IntelligentRoadTestV3/IntelligentRoadTestChartV2.css?2018011211" />
<script type="text/javascript" src="../js/util/uploadData.js"></script>
<script type="text/javascript" src="../js/util/exportExcel.js"></script>

<!-- 增加progressbarTwo的查询数据同步方法 -->
<script type="text/javascript" src="../js/util/progressbarTwo.js?2017022803"></script>
<div class="pc_listb" id="pc_listb_IntelligentRoadTestChartV2">
    <div class="main-content">
        <div class="topContent topDiv">
            <ul class="floatLeft leftUl">
                <li class="select-text">
                    <div class="select-city selectDiv">
                        <div class="select-name">
                            <img src="../js/IntelligentRoadTest/images/add_nor.png" class="name-icon">
                            <a href="javascript:;" class="city-name selectA" id="RSRPGridMapCity">广州市</a>
                            <span class="triangleGrey"></span>
                        </div>
                        <div class="city-info select-info" style="display: none;">
                            <div class="current-city">
                                <span>当前城市：</span>
                                <span class="city-selected">广州市</span>
                            </div>
                            <ul class="city-list"><li class="current"><a href="javascript:;">广州</a></li><li class=""><a href="javascript:;">韶关</a></li><li><a href="javascript:;">深圳</a></li><li><a href="javascript:;">珠海</a></li><li><a href="javascript:;">汕头</a></li><li><a href="javascript:;">佛山</a></li><li><a href="javascript:;">江门</a></li><li><a href="javascript:;">湛江</a></li><li><a href="javascript:;">茂名</a></li><li><a href="javascript:;">肇庆</a></li><li><a href="javascript:;">惠州</a></li><li><a href="javascript:;">梅州</a></li><li><a href="javascript:;">汕尾</a></li><li><a href="javascript:;">河源</a></li><li><a href="javascript:;">阳江</a></li><li><a href="javascript:;">清远</a></li><li><a href="javascript:;">东莞</a></li><li><a href="javascript:;">中山</a></li><li><a href="javascript:;">潮州</a></li><li><a href="javascript:;">揭阳</a></li><li><a href="javascript:;">云浮</a></li></ul>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="selectDiv">
                        <div id="district_name" class="select-name disable-name">
                            <img src="../js/IntelligentRoadTest/images/district_nor.png" class="name-icon">
                            <a href="javascript:;" class="selectA" id="chart_district">全市</a>
                            <span class="triangleGrey"></span>
                        </div>
                        <div class="select-info" id="district" style="display: none;">
                            <p class="selected">全市</p>
                            <p>增城</p>
                            <p>南沙</p>
                            <p>黄萝</p>
                            <p>东山</p>
                            <p>白云</p>
                            <p>天河</p>
                            <p>荔湾</p>
                            <p>越秀</p>
                            <p>番禺</p>
                            <p>从化</p>
                            <p>广州无网格</p>
                            <p>花都</p>
                            <p>海珠</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="selectDiv">
                        <div class="select-name disable-name">
                            <img src="../js/IntelligentRoadTest/images/yingfu_nor.png" class="name-icon">
                            <a href="javascript:;" class="selectA" id="chart_marketbase">全区</a>
                            <span class="triangleGrey"></span>
                        </div>
                        <div class="select-info" id="marketbase" style="display: none;">
                            <p class="selected">全区</p>
                            <p>XXX营服中心</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="selectDiv">
                        <div class="select-name">
                            <img src="../js/IntelligentRoadTest/images/countObject.png" class="name-icon">
                            <a href="javascript:;" class="selectA" id="chart_countObject">全区域</a>
                            <span class="triangleGrey"></span>
                        </div>
                        <div class="select-info" id="countObject" style="display: none;">
                            <p class="selected">统计对象</p>
                            <p>全区域</p>
                            <p>弱区</p>
                            <p>关注区域</p>
                            <p>扇区</p>
                            <p>工单</p>
                            <p>骨头区域</p>
                            <p>高速</p>
                            <p>高铁</p>
                            <p>市政路</p>
                            <p>地铁</p>
                            <p>高校</p>
                            <p>场馆</p>
                            <p>美食</p>
                            <p>美景</p>
                            <p>高密度住宅区</p>
                            <p>高流量商务区</p>
                            <p>战狼区域</p>
                            <p>农贸市场</p>
                        </div>
                    </div>
                </li>
                <li class="select-network">
                    <img src="../js/IntelligentRoadTest/images/countWeek.png" class="name-icon">
                    <div class="radioDiv">
                        <input type="radio" name="network" id="moonth" value="月" checked="checked">
                        <label for="moonth">月</label>
                    </div>
                    <div class="radioDiv">
                        <input type="radio" name="network" id="week" value="周">
                        <label for="week">周</label>
                    </div>
                    <div class="radioDiv">
                        <input type="radio" name="network" id="day" value="日">
                        <label for="day">日</label>
                    </div>
                </li>
                <li>
                    <button type="button" class="btn-bg btn-sure" id="submit">确定</button>
                </li>
            </ul>
            <div class="exportDiv">
                <button type="button" class="btn-bg btn-export" id="export">导出</button>
            </div>
        </div>
        <div class="contentDiv">
            <!-- 上面的2个柱状折线图div  -->
            <div class="chartWrap">
                <div class="box-shadow">
                    <div class="chartDivWrap" style="display: block;">
                        <div class="chartTop">
                            <select id="">
                                <option value="覆盖最优">覆盖最优</option>
                                <option value="主接入">主接入</option>
                            </select>
                            <span>分级覆盖率门限：</span>
                            <select id="">
                                <option value="-115">-115</option>
                                <option value="-110">-110</option>
                                <option selected="" value="-105">-105</option>
                                <option value="-100">-100</option>
                                <option value="-95">-95</option>
                            </select>
                            <span>覆盖率趋势图</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="allRegionChart"></div>
                    </div>
                    <div class="chartDivWrap">
                        <div class="chartTop">
                            <span>RSRP<-105db弱覆盖区域数及弱覆盖栅格占比</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="poorareaChart"></div>
                    </div>
                    <div class="chartDivWrap">
                        <div class="chartTop">
                            <select id="">
                                <option value="覆盖最优">覆盖最优</option>
                                <option value="主接入">主接入</option>
                            </select>
                            <span>分级覆盖率门限：</span>
                            <select id="">
                                <option value="-115">-115</option>
                                <option value="-110">-110</option>
                                <option selected="" value="-105">-105</option>
                                <option value="-100">-100</option>
                                <option value="-95">-95</option>
                            </select>
                            <span>覆盖率趋势图</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="concernAreaChart"></div>
                    </div>
                    <div class="chartDivWrap">
                        <div class="chartTop">
                            <select id="">
                                <option value="覆盖最优">覆盖最优</option>
                                <option value="主接入">主接入</option>
                            </select>
                            <span>分级覆盖率门限：</span>
                            <select id="">
                                <option value="-115">-115</option>
                                <option value="-110">-110</option>
                                <option selected="" value="-105">-105</option>
                                <option value="-100">-100</option>
                                <option value="-95">-95</option>
                            </select>
                            <span>覆盖率趋势图</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="sectorChart"></div>
                    </div>
                    <div class="chartDivWrap">
                        <div class="chartTop">
                            <span>“ 场景：</span>
                            <select id="u5298_input">
                                <option value="高速">高速</option>
                                <option value="高铁">高铁</option>
                                <option value="市政路">市政路</option>
                                <option value="地铁">地铁</option>
                                <option selected="" value="高校">高校</option>
                                <option value="场馆">场馆</option>
                                <option value="美食">美食</option>
                                <option value="美景">美景</option>
                                <option value="高密度住宅区">高密度住宅区</option>
                                <option value="高流量商务区">高流量商务区</option>
                                <option value="战狼区域">战狼区域</option>
                                <option value="农贸市场">农贸市场</option>
                            </select>
                            <span>工单恢复趋势 ”</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="alarmInfoChart"></div>
                    </div>
                    <div class="chartDivWrap">
                        <div class="chartTop">
                            <select id="">
                                <option value="覆盖最优">覆盖最优</option>
                                <option value="主接入">主接入</option>
                            </select>
                            <span>分级覆盖率门限：</span>
                            <select id="">
                                <option value="-115">-115</option>
                                <option value="-110">-110</option>
                                <option selected="" value="-105">-105</option>
                                <option value="-100">-100</option>
                                <option value="-95">-95</option>
                            </select>
                            <span>覆盖率趋势图</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="boneAreaChart"></div>
                    </div>
                    <div class="chartDivWrap">
                        <div class="chartTop">
                            <select id="">
                                <option value="覆盖最优">覆盖最优</option>
                                <option value="主接入">主接入</option>
                            </select>
                            <span>分级覆盖率门限：</span>
                            <select id="">
                                <option value="-115">-115</option>
                                <option value="-110">-110</option>
                                <option selected="" value="-105">-105</option>
                                <option value="-100">-100</option>
                                <option value="-95">-95</option>
                            </select>
                            <span>覆盖率趋势图</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="highWayChart"></div>
                    </div>
                    <div class="chartDivWrap">
                        <div class="chartTop">
                            <select id="">
                                <option value="覆盖最优">覆盖最优</option>
                                <option value="主接入">主接入</option>
                            </select>
                            <span>分级覆盖率门限：</span>
                            <select id="">
                                <option value="-115">-115</option>
                                <option value="-110">-110</option>
                                <option selected="" value="-105">-105</option>
                                <option value="-100">-100</option>
                                <option value="-95">-95</option>
                            </select>
                            <span>覆盖率趋势图</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="railChart"></div>
                    </div>
                    <div class="chartDivWrap">
                        <div class="chartTop">
                            <select id="">
                                <option value="覆盖最优">覆盖最优</option>
                                <option value="主接入">主接入</option>
                            </select>
                            <span>分级覆盖率门限：</span>
                            <select id="">
                                <option value="-115">-115</option>
                                <option value="-110">-110</option>
                                <option selected="" value="-105">-105</option>
                                <option value="-100">-100</option>
                                <option value="-95">-95</option>
                            </select>
                            <span>覆盖率趋势图</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="cityRoadChart"></div>
                    </div>
                    <div class="chartDivWrap">
                        <div class="chartTop">
                            <select id="">
                                <option value="覆盖最优">覆盖最优</option>
                                <option value="主接入">主接入</option>
                            </select>
                            <span>分级覆盖率门限：</span>
                            <select id="">
                                <option value="-115">-115</option>
                                <option value="-110">-110</option>
                                <option selected="" value="-105">-105</option>
                                <option value="-100">-100</option>
                                <option value="-95">-95</option>
                            </select>
                            <span>覆盖率趋势图</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="metroChart"></div>
                    </div>
                    <div class="chartDivWrap">
                        <div class="chartTop">
                            <select id="">
                                <option value="覆盖最优">覆盖最优</option>
                                <option value="主接入">主接入</option>
                            </select>
                            <span>分级覆盖率门限：</span>
                            <select id="">
                                <option value="-115">-115</option>
                                <option value="-110">-110</option>
                                <option selected="" value="-105">-105</option>
                                <option value="-100">-100</option>
                                <option value="-95">-95</option>
                            </select>
                            <span>覆盖率趋势图</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="collegeChart"></div>
                    </div>
                    <div class="chartDivWrap">
                        <div class="chartTop">
                            <select id="">
                                <option value="覆盖最优">覆盖最优</option>
                                <option value="主接入">主接入</option>
                            </select>
                            <span>分级覆盖率门限：</span>
                            <select id="">
                                <option value="-115">-115</option>
                                <option value="-110">-110</option>
                                <option selected="" value="-105">-105</option>
                                <option value="-100">-100</option>
                                <option value="-95">-95</option>
                            </select>
                            <span>覆盖率趋势图</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="siteChart"></div>
                    </div>
                    <div class="chartDivWrap">
                        <div class="chartTop">
                            <select id="">
                                <option value="覆盖最优">覆盖最优</option>
                                <option value="主接入">主接入</option>
                            </select>
                            <span>分级覆盖率门限：</span>
                            <select id="">
                                <option value="-115">-115</option>
                                <option value="-110">-110</option>
                                <option selected="" value="-105">-105</option>
                                <option value="-100">-100</option>
                                <option value="-95">-95</option>
                            </select>
                            <span>覆盖率趋势图</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="foodChart"></div>
                    </div>
                    <div class="chartDivWrap">
                        <div class="chartTop">
                            <select id="">
                                <option value="覆盖最优">覆盖最优</option>
                                <option value="主接入">主接入</option>
                            </select>
                            <span>分级覆盖率门限：</span>
                            <select id="">
                                <option value="-115">-115</option>
                                <option value="-110">-110</option>
                                <option selected="" value="-105">-105</option>
                                <option value="-100">-100</option>
                                <option value="-95">-95</option>
                            </select>
                            <span>覆盖率趋势图</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="sceneryChart"></div>
                    </div>
                    <div class="chartDivWrap">
                        <div class="chartTop">
                            <select id="">
                                <option value="覆盖最优">覆盖最优</option>
                                <option value="主接入">主接入</option>
                            </select>
                            <span>分级覆盖率门限：</span>
                            <select id="">
                                <option value="-115">-115</option>
                                <option value="-110">-110</option>
                                <option selected="" value="-105">-105</option>
                                <option value="-100">-100</option>
                                <option value="-95">-95</option>
                            </select>
                            <span>覆盖率趋势图</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="uptownChart"></div>
                    </div>
                    <div class="chartDivWrap">
                        <div class="chartTop">
                            <select id="">
                                <option value="覆盖最优">覆盖最优</option>
                                <option value="主接入">主接入</option>
                            </select>
                            <span>分级覆盖率门限：</span>
                            <select id="">
                                <option value="-115">-115</option>
                                <option value="-110">-110</option>
                                <option selected="" value="-105">-105</option>
                                <option value="-100">-100</option>
                                <option value="-95">-95</option>
                            </select>
                            <span>覆盖率趋势图</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="businessChart"></div>
                    </div>
                    <div class="chartDivWrap">
                        <div class="chartTop">
                            <select id="">
                                <option value="覆盖最优">覆盖最优</option>
                                <option value="主接入">主接入</option>
                            </select>
                            <span>分级覆盖率门限：</span>
                            <select id="">
                                <option value="-115">-115</option>
                                <option value="-110">-110</option>
                                <option selected="" value="-105">-105</option>
                                <option value="-100">-100</option>
                                <option value="-95">-95</option>
                            </select>
                            <span>覆盖率趋势图</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="warwolfChart"></div>
                    </div>
                    <div class="chartDivWrap">
                        <div class="chartTop">
                            <select id="">
                                <option value="覆盖最优">覆盖最优</option>
                                <option value="主接入">主接入</option>
                            </select>
                            <span>分级覆盖率门限：</span>
                            <select id="">
                                <option value="-115">-115</option>
                                <option value="-110">-110</option>
                                <option selected="" value="-105">-105</option>
                                <option value="-100">-100</option>
                                <option value="-95">-95</option>
                            </select>
                            <span>覆盖率趋势图</span>
                            <div class="dateDiv">
                                <input class="datebox" value="2018-3" readonly="readonly"
                                       onfocus="WdatePicker({opposite:true,dateFmt:'yyyy-MM',maxDate:'%y-%M',isShowClear:false,isShowToday:false,isShowOK:false})">
                                <span class="triangleGrey"></span>
                            </div>
                        </div>
                        <div class="chartDiv" id="marketChart"></div>
                    </div>
                </div>
            </div>
            <!-- 下面的表格div  -->
            <div class="tableDivWrap">
                <div class="box-shadow">
                    <div class="tableDiv">
                        <div class="tbWrap" style="display: block;">
                            <div class="tbTitle">全区域统计表</div>
                            <div id="allRegionTable" class="tableSt"></div>
                        </div>
                        <div class="tbWrap">
                            <div class="tbTitle">弱区统计表</div>
                            <div id="poorareaTable" class="tableSt"></div>
                        </div>
                        <div class="tbWrap">
                            <div class="tbTitle">关注区域统计表</div>
                            <div id="concernAreaTable" class="tableSt"></div>
                        </div>
                        <div class="tbWrap">
                            <div class="tbTitle">扇区统计表</div>
                            <div id="sectorTable" class="tableSt"></div>
                        </div>
                        <div class="tbWrap">
                            <div class="tbTitle">工单统计表</div>
                            <div id="alarmInfoTable" class="tableSt"></div>
                        </div>
                        <div class="tbWrap">
                            <div class="tbTitle">骨头区域统计表</div>
                            <div id="boneAreaTable" class="tableSt"></div>
                        </div>
                        <div class="tbWrap">
                            <div class="tbTitle">高速统计表</div>
                            <div id="highWayTable" class="tableSt"></div>
                        </div>
                        <div class="tbWrap">
                            <div class="tbTitle">高铁统计表</div>
                            <div id="railTable" class="tableSt"></div>
                        </div>
                        <div class="tbWrap">
                            <div class="tbTitle">市政路统计表</div>
                            <div id="cityRoadTable" class="tableSt"></div>
                        </div>
                        <div class="tbWrap">
                            <div class="tbTitle">地铁统计表</div>
                            <div id="metroTable" class="tableSt"></div>
                        </div>
                        <div class="tbWrap">
                            <div class="tbTitle">高校统计表</div>
                            <div id="collegeTable" class="tableSt"></div>
                        </div>
                        <div class="tbWrap">
                            <div class="tbTitle">场馆统计表</div>
                            <div id="siteTable" class="tableSt"></div>
                        </div>
                        <div class="tbWrap">
                            <div class="tbTitle">美食统计表</div>
                            <div id="foodTable" class="tableSt"></div>
                        </div>
                        <div class="tbWrap">
                            <div class="tbTitle">美景统计表</div>
                            <div id="sceneryTable" class="tableSt"></div>
                        </div>

                        <div class="tbWrap">
                            <div class="tbTitle">高密度住宅区统计表</div>
                            <div id="uptownTable" class="tableSt"></div>
                        </div>
                        <div class="tbWrap">
                            <div class="tbTitle">高流量商务区统计表</div>
                            <div id="businessTable" class="tableSt"></div>
                        </div>
                        <div class="tbWrap">
                            <div class="tbTitle">战狼区域统计表</div>
                            <div id="warwolfTable" class="tableSt"></div>
                        </div>
                        <div class="tbWrap">
                            <div class="tbTitle">农贸市场统计表</div>
                            <div id="marketTable" class="tableSt"></div>
                        </div>
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
<script type="text/javascript" src="../js/IntelligentRoadTestV3/IntelligentRoadTestChartV2.js?2018011211"></script>
