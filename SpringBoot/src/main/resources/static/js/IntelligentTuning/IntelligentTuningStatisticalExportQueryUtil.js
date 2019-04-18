/**********************************
 * @filedesc 查询工具js
 * @author laijunbao
 * @create 2018-10-25-0025 11:15
 * @modifier
 * @modify
 ***********************************/

var IntelligentTuningStatisticalExportQueryUtil = {};


/**********************************
 * @funcname IntelligentTuningStatisticalExportQueryUtil.getMaxDay
 * @funcdesc 取表FRT_ZNTY_CELL_OPTI_TASK_D的最新日期
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-10-24-0024 15:14
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportQueryUtil.getMaxDay = function () {
    var list = ["AntAdj_00_01_GetMaxDayFrom_FRT_ZNTY_CELL_OPTI_TASK_D"];
    var progressBarSqls = [];
    progressBarSqls.push(list);
    var functionlist = [IntelligentTuningStatisticalExportQueryUtil.getMaxDayCallback];
    var database = [3];
    progressbarTwo.submitSql(progressBarSqls, functionlist,database);
}
/**********************************
 * @funcname IntelligentTuningStatisticalExportQueryUtil.getMaxDayCallback
 * @funcdesc 取表FRT_ZNTY_CELL_OPTI_TASK_D的最新日期函数回调
 * @param
 * @return data 结果集
 * @author laijunbao
 * @create 2018-10-24-0024 15:20
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportQueryUtil.getMaxDayCallback = function (data) {
    var result = callBackChangeData(data);

    if(result.length > 0){
        // 最新日期，即结束日期
        var day = result[0]["day"];
        IntelligentTuningStatisticalExport.vm.queryDay = day;
        IntelligentTuningStatisticalExport.vm.dayByClickChart1 = day;

        var dayFormat = ""+day;
        dayFormat = dayFormat.substring(0,4) + "-"
            + dayFormat.substring(4,6)
            + "-" + dayFormat.substring(6,8);

        // 带横杠的结束日期
        IntelligentTuningStatisticalExport.vm.queryDayFormat = dayFormat;

        // 取结束日期前30天
        var dayFormatDate = new Date(dayFormat);
        dayFormatDate.setDate(dayFormatDate.getDate()-29);

        var startDay = dayFormatDate.Format("yyyyMMdd");

        // 开始日期
        IntelligentTuningStatisticalExport.vm.queryStartDay = parseInt(startDay);

        // 带横杠的开始日期
        IntelligentTuningStatisticalExport.vm.queryStartDayFormat = startDay.substring(0,4) + "-"
            + startDay.substring(4,6)
            + "-" + startDay.substring(6,8);
    }
}


/**********************************
 * @funcname IntelligentTuningStatisticalExportQueryUtil.getDistrictMarket
 * @funcdesc 获取区县营服
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-10-24-0024 15:14
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportQueryUtil.getDistrictMarket = function () {
    var list1 = ["IntelligentRoadTestAnalysisV3_getDISTRICTNAME"];
    var progressBarSqls = [];
    progressBarSqls.push(list1);
    var functionlist = [IntelligentTuningStatisticalExportQueryUtil.getDistrictMarketCallback];
    var database = [3];
    progressbarTwo.submitSql(progressBarSqls, functionlist,database);
}

/**********************************
 * @funcname IntelligentTuningStatisticalExportQueryUtil.getDistrictMarketCallback
 * @funcdesc 获取区县营服函数回调
 * @param
 * @return data 结果集
 * @author laijunbao
 * @create 2018-10-24-0024 15:14
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportQueryUtil.getDistrictMarketCallback = function (data) {
    IntelligentTuningStatisticalExport.vm.cityDistrictMarket = initDistrictMarketbase(data);
    // 分权分域
    var cityPermission = $("#cityPermission_common").val();
    if(cityPermission == '全省'){
        IntelligentTuningStatisticalExport.vm.selectCity = '全省';
        IntelligentTuningStatisticalExport.vm.titleCity = '全省';
        IntelligentTuningStatisticalExport.vm.queryCity = '全省';
    }else{
        IntelligentTuningStatisticalExport.vm.selectCity = cityPermission;
        IntelligentTuningStatisticalExport.vm.titleCity = cityPermission;
        IntelligentTuningStatisticalExport.vm.queryCity = cityPermission;
        // citys = [city];
        IntelligentTuningStatisticalExport.vm.citys = [cityPermission];
        IntelligentTuningStatisticalExport.vm.changeCity(cityPermission);
    }

    $('#date-range9').dateRangePicker({
        getValue: function()
        {
            return this.innerHTML;
        },
        setValue: function(s)
        {
            this.innerHTML = s;
        },
        endDate: IntelligentTuningStatisticalExport.vm.queryDayFormat,
        separator : ' - ',
        maxDays: 30,
        language: 'cn'
    });

    // 日历组件点击确定
    $(".apply-btn").click(function () {
        var day = $("#date-range9").text().split(' ');
        if(day[0] == IntelligentTuningStatisticalExport.vm.queryStartDayFormat && day[2] == IntelligentTuningStatisticalExport.vm.queryDayFormat){
            console.log("日期没有改变");
        }else{
            IntelligentTuningStatisticalExport.vm.queryStartDayFormat = day[0];
            IntelligentTuningStatisticalExport.vm.queryDayFormat = day[2];
            IntelligentTuningStatisticalExport.vm.queryStartDay = day[0].replace(/-/g,"");
            IntelligentTuningStatisticalExport.vm.queryDay = day[2].replace(/-/g,"");
            IntelligentTuningStatisticalExport.vm.dayByClickChart1 = day[2].replace(/-/g,"");
            var statistical = IntelligentTuningStatisticalExport.vm.queryStatistical;
            // IntelligentTuningStatisticalExportCrossFilterUtil.isFirst = true;
            setTimeout(function () {
                // 获取图表和表格数据
                IntelligentTuningStatisticalExportQueryUtil.getChartData();

                if(IntelligentTuningStatisticalExport.vm.titleMktcenter != '' && IntelligentTuningStatisticalExport.vm.titleMktcenter != '全区'){
                    IntelligentTuningStatisticalExportQueryUtil.getTableData(undefined,IntelligentTuningStatisticalExport.vm.titleCity,IntelligentTuningStatisticalExport.vm.titleDistrict,IntelligentTuningStatisticalExport.vm.titleMktcenter);
                }
                if(IntelligentTuningStatisticalExport.vm.titleDistrict != '' && IntelligentTuningStatisticalExport.vm.titleDistrict != '全市'){
                    IntelligentTuningStatisticalExportQueryUtil.getTableData(undefined,IntelligentTuningStatisticalExport.vm.titleCity,IntelligentTuningStatisticalExport.vm.titleDistrict);
                }
                if(IntelligentTuningStatisticalExport.vm.titleCity != '' && IntelligentTuningStatisticalExport.vm.titleCity != '全省'){
                    IntelligentTuningStatisticalExportQueryUtil.getTableData(undefined,IntelligentTuningStatisticalExport.vm.titleCity);
                }


            },500)
        }

    })

    $(".closeProgress").click(function(){
        $(".progressBox").hide();
    });
}

/**********************************
 * @funcname initDistrictMarketbase
 * @funcdesc 处理区县营服数据
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018/4/3 14:37
 * @modifier
 * @modify
 ***********************************/
function initDistrictMarketbase(data) {
    //数据结构为{"广州":{"天河":["棠下","上社"]}}
    var result = changeData(data);
    var city = "",district="",marketbase="";
    var districtArr = [];
    var districtObj = {};
    var selectDataChe = {};
    for(var i=0;i<result.length;i++){
        city = result[i].city_name;
        district=result[i].area_name;
        if(city == "肇庆"){
            if(district == "高新区"){
                district = "高新";
            }
        }
        marketbase=result[i].mkt_center_name;
        if(null== selectDataChe[city]){//city缓存的数据为null
            districtObj = {};
            var marketbaseArr=[];
            if(marketbase != '' && marketbase != null){
                if(null== selectDataChe[city]){
                    marketbaseArr.push(marketbase);//营服中心数组
                    districtObj[district]=marketbaseArr;//区县对象
                    selectDataChe[city]=districtObj;//缓存区县营服中心数据
                }else{
                    if($.inArray(marketbase,selectDataChe[city][district]) < 0){
                        marketbaseArr.push(marketbase);//营服中心数组
                        districtObj[district]=marketbaseArr;//区县对象
                        selectDataChe[city]=districtObj;//缓存区县营服中心数据
                    }
                }

            }
        }else{//city缓存的数据不为null
            districtObj=selectDataChe[city];//从缓存取该city的区县对象
            if(null==districtObj[district]){//如果区县对象为空，定义营服中心数组并加值，否则给区县对象的营服中心数据加值
                var marketbaseArr=[];
                if(marketbase != '' && marketbase != null){
                    if($.inArray(marketbase,selectDataChe[city][district]) < 0){
                        marketbaseArr.push(marketbase);//营服中心数组
                        districtObj[district]=marketbaseArr;
                    }
                }
            }else{
                //marketbaseArr=districtObj[district];
                //marketbaseArr.push(marketbase);//营服中心数组
                if(marketbase != '' && marketbase != null){
                    if($.inArray(marketbase,selectDataChe[city][district]) < 0){
                        districtObj[district].push(marketbase);
                    }
                }
            }
        }
    }
    return selectDataChe;
}
function changeData(data) {
    var result = data.result;
    var cloumns = data.columns;
    var resultArray = [];
    if(result ==undefined ||cloumns ==undefined){
        return resultArray;
    }
    for ( var i = 0; i < result.length; i++) {
        var rs = result[i];
        var dataRsult = {};
        for ( var j = 0; j < rs.length; j++) {
            //var dataC = JSON.stringify(cloumns[j]);
            var dataC = cloumns[j];
            var dataR = rs[j];
            dataRsult[dataC] = dataR;
        }
        resultArray.push(dataRsult);
    }
    return resultArray;
}

/**********************************
 * @funcname IntelligentTuningStatisticalExportQueryUtil.getChartAndTableData
 * @funcdesc 获取图表
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-10-25-0025 11:22
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportQueryUtil.getChartData = function () {
    var progressBarSqls = [];
    var functionlist = [];

    var list1 = ["AntAdj_09_StatisticByDay"];
    list1.push("DAY:" + IntelligentTuningStatisticalExport.vm.queryDay);
    list1.push("STARTDAY:" + IntelligentTuningStatisticalExport.vm.queryStartDayFormat);
    progressBarSqls.push(list1);
    functionlist.push(IntelligentTuningStatisticalExportQueryUtil.getChartDataCallback);

    var database = [3];
    progressbarTwo.submitSql(progressBarSqls, functionlist,database);

}
/**********************************
 * @funcname IntelligentTuningStatisticalExportQueryUtil.getChartAndTableDataCallback
 * @funcdesc 获取图表数据函数回调
 * @param
    descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018-10-25-0025 11:22
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportQueryUtil.getChartDataCallback = function (data) {
    var result = callBackChangeData(data);

    // 存储查询回来的图表数据
    IntelligentTuningStatisticalExport.chartDataArr = result;

    // crossfilter处理数据
    // IntelligentTuningStatisticalExportCrossFilterUtil.init(result);


    // 获取开始时间和结束时间之间的日期
    var dayDiff = IntelligentTuningStatisticalExportChartUtil.getStartAndEndDay("yyyy-MM-dd");

    // 图表1的数据对象
    var chart1DataObj = {};


    // 初始化图表数据格式
    //{TASK_CREATE_count: 0
    // accept_count: 0
    // day: "2018-09-21"
    // execute_count: 0
    // resolve_count: 0}
    IntelligentTuningStatisticalExport.chart1DataObjArrs = [];
    dayDiff.forEach(function (day) {
        chart1DataObj = {};
        chart1DataObj['day'] = day;
        chart1DataObj['task_create_count'] = 0;
        chart1DataObj['accept_count'] = 0;
        chart1DataObj['execute_count'] = 0;
        chart1DataObj['resolve_count'] = 0;
        IntelligentTuningStatisticalExport.chart1DataObjArrs.push(chart1DataObj)
    })

    var city = IntelligentTuningStatisticalExport.vm.cityFlag;
    var country = IntelligentTuningStatisticalExport.vm.district;
    var statistical = IntelligentTuningStatisticalExport.vm.statistical;
    if(city == '全省'){
        city = null;
    }
    if(country == '全市'){
        country = null;
    }
    if(statistical == '全部'){
        statistical = null;
    }
    // 处理图表1数据，得到 crossfilter 后的 数组对象
    IntelligentTuningStatisticalExportCrossFilterUtil.chart1handler(null,city,country,null,statistical);

    // 处理图表2数据，得到 crossfilter 后的 数组对象
    IntelligentTuningStatisticalExportCrossFilterUtil.chart2handler(IntelligentTuningStatisticalExport.vm.queryDayFormat,city,country,null,statistical);

    // 根据 crossfilter 后的 数组对象，进行图表数据处理，图表渲染
    IntelligentTuningStatisticalExportChartUtil.chartDataHandler();

}

/**********************************
 * @funcname IntelligentTuningStatisticalExportQueryUtil.getTableData
 * @funcdesc 获取列表数据
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-11-06-0006 11:28
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportQueryUtil.getTableData = function (day,city,district,mktcenter,statistical) {
    $(".progressBox").show();

    IntelligentTuningStatisticalExportQueryUtil.loadCellTableComplete = false;
    IntelligentTuningStatisticalExportQueryUtil.loadCellTableCountComplete = false;
    IntelligentTuningStatisticalExportQueryUtil.loadOrderTableComplete = false;
    IntelligentTuningStatisticalExportQueryUtil.loadOrderTableCountComplete = false;
    var list = ["AntAdj_10_StatisticDetail"];

    var progressBarSqls = [];
    var functionlist = [];

    var list1 = ["AntAdj_10_StatisticDetail_count"];

    if(day != undefined){
        list.push("DAY:" + day);
        list1.push("DAY:" + day);
    }else{
        list.push("DAY:" + IntelligentTuningStatisticalExport.vm.queryDay);
        list1.push("DAY:" + IntelligentTuningStatisticalExport.vm.queryDay);
    }
    if(city != undefined && city != '其他'){
        list.push("CITY_ID_COND:and city='" + city + "'");
        list1.push("CITY_ID_COND:and city='" + city + "'");
    }else{
        if(IntelligentTuningStatisticalExport.vm.queryCity != '全省' && IntelligentTuningStatisticalExport.vm.queryCity != '其他'){
            list.push("CITY_ID_COND:and city='" + IntelligentTuningStatisticalExport.vm.queryCity + "'");
            list1.push("CITY_ID_COND:and city='" + IntelligentTuningStatisticalExport.vm.queryCity + "'");
        }else if(IntelligentTuningStatisticalExport.vm.queryCity == '其他'){
            list.push("CITY_ID_COND:and city is not null and city =''");
            list1.push("CITY_ID_COND:and city is not null and city =''");
        }else{
            list.push("CITY_ID_COND:");
            list1.push("CITY_ID_COND:");
        }
    }
    if(district != undefined && district != '其他'){
        list.push("COUNTRY_COND:AND COUNTRY='" + district + "'");
        list1.push("COUNTRY_COND:AND COUNTRY='" + district + "'");
    }else{
        if(IntelligentTuningStatisticalExport.vm.queryDistrict != '全市' && IntelligentTuningStatisticalExport.vm.queryCity != '其他'){
            list.push("COUNTRY_COND:AND COUNTRY='" + IntelligentTuningStatisticalExport.vm.queryDistrict + "'");
            list1.push("COUNTRY_COND:AND COUNTRY='" + IntelligentTuningStatisticalExport.vm.queryDistrict + "'");
        }else if(IntelligentTuningStatisticalExport.vm.queryDistrict == '其他'){
            list.push("COUNTRY_COND:and COUNTRY is  null and COUNTRY =''");
            list1.push("COUNTRY_COND:and COUNTRY is  null and COUNTRY =''");
        }else{
            list.push("COUNTRY_COND:");
            list1.push("COUNTRY_COND:");
        }

    }
    if(mktcenter != undefined){
        list.push("MKTCENTER_COND:AND MKTCENTER='" + mktcenter + "'");
        list1.push("MKTCENTER_COND:AND MKTCENTER='" + mktcenter + "'");
    }else{
        if(IntelligentTuningStatisticalExport.vm.queryMktcenter != '全区'){
            list.push("MKTCENTER_COND:AND MKTCENTER='" + IntelligentTuningStatisticalExport.vm.queryMktcenter + "'");
            list1.push("MKTCENTER_COND:AND MKTCENTER='" + IntelligentTuningStatisticalExport.vm.queryMktcenter + "'");
        }else if(IntelligentTuningStatisticalExport.vm.queryMktcenter == '其他'){
            list.push("MKTCENTER_COND:AND MKTCENTER is  null and MKTCENTER =''");
            list1.push("MKTCENTER_COND:AND MKTCENTER is  null and MKTCENTER =''");
        }
        else{
            list.push("MKTCENTER_COND:");
            list1.push("MKTCENTER_COND:");
        }
    }

    if(statistical != undefined && statistical != "全部"){
        list.push("PROBLEM_NAME_COND:"+IntelligentTuningStatisticalExportQueryUtil.getStatisticalStr(statistical));
        list1.push("PROBLEM_NAME_COND:"+IntelligentTuningStatisticalExportQueryUtil.getStatisticalStr(statistical));
    }else{
        if(IntelligentTuningStatisticalExport.vm.queryStatistical != '' && IntelligentTuningStatisticalExport.vm.queryStatistical != '全部'){
            list.push("PROBLEM_NAME_COND:"+IntelligentTuningStatisticalExportQueryUtil.getStatisticalStr(IntelligentTuningStatisticalExport.vm.queryStatistical));
            list1.push("PROBLEM_NAME_COND:"+IntelligentTuningStatisticalExportQueryUtil.getStatisticalStr(IntelligentTuningStatisticalExport.vm.queryStatistical));
        }else{
            list.push("PROBLEM_NAME_COND:");
            list1.push("PROBLEM_NAME_COND:");
        }
    }

    list.push("SYS_STATUS_COND:");
    list1.push("SYS_STATUS_COND:");
    list.push("COMF_TASK_ID_COND:");
    list1.push("COMF_TASK_ID_COND:");

    progressBarSqls.push(list1);
    functionlist.push(getTableCountCallback);
    var database = [3];
    progressbarTwo.submitSql(progressBarSqls, functionlist,database);
    function getTableCountCallback(data){
        var result = callBackChangeData(data);
        IntelligentTuningStatisticalExport.vm.tableCount = result[0].count;
        IntelligentTuningStatisticalExportQueryUtil.loadCellTableCountComplete = true;
    }


    IntelligentTuningStatisticalExport.vm.cellTable = new TableToolsNewTwo();

    IntelligentTuningStatisticalExport.vm.cellTableObj={
        divId: "tableParentDiv",
        tableId: "tabObjTabId"+parseInt(Math.random()*100) + "tab",
        tableHead: "地市名称,区县,营服中心,基站ID,基站名称,小区ID,小区名称,设备厂商,是否为NB_IOT,预测GPS位置,基站位置GPS,预测位置相差距离,坐标勘误优先值,方位角,预测角度,偏离角度,是否天馈接反,天馈接反建议修改基站号,天馈接反建议修改小区号,包含AGPS的MR条数,全量MR条数,站间距,是否存在弱覆盖,弱覆盖区域覆盖率,弱覆盖区域RSRP均值,是否越区覆盖,越区覆盖MR条数,越区覆盖占比,是否重叠覆盖,重叠覆盖MR量,重叠覆盖占比,是否模三干扰覆盖,模三干扰覆盖MR量,模三干扰占比,问题类型,调整实施状态,智能调优方案ID,智能调优工单ID,预测百度地图位置,支持预测的MR条数,包含AGPS的MR条数,包含AGPS的MR与小区每TA平均距离,支持方位角预测条数,4G切3G总次数,4G总流量(MB),感知优良率按天平均值,AGPS用户数按天平均值,最小用户体验上行平均速率（Mbps）,最小用户体验下行平均速率（Mbps）,各站间距AGPS数量,全量4G用户数",
        dataType: 3,
        clnObj: null,
        sql: list,
        sortFlag: 0,
        pageObj: {
            pageSize: 20,
            pageFlag: 1
        },
        fixObj: {
            fixRow: 1,
            fixClnObj: {
                fixCln: 3,
                tableId: parseInt(Math.random() * 100) + "tab"
            },
            callBackTranFn: null
        }

    };
    IntelligentTuningStatisticalExport.vm.cellTable.submit(IntelligentTuningStatisticalExport.vm.cellTableObj);
    $(".pbt").hide();

    // 定时器，判断表格是否生成完成
    var cellCount = 0;
    var isStopCellTable = setInterval(function () {
        cellCount ++;
        if(IntelligentTuningStatisticalExport.vm.cellTableObj.loadEnd && IntelligentTuningStatisticalExportQueryUtil.loadCellTableCountComplete){
            clearInterval(isStopCellTable)
            IntelligentTuningStatisticalExportQueryUtil.loadCellTableComplete = true;
        }
        if(cellCount > 30){
            clearInterval(isStopCellTable);
            IntelligentTuningStatisticalExportQueryUtil.loadCellTableComplete = true;
        }
    },1000)

    IntelligentTuningStatisticalExportQueryUtil.loadOrderTable(day,city,district,mktcenter,statistical);

    // 定时器，判断表格是否生成完成
    var stopCount = 0;
    var isStop = setInterval(function () {
        stopCount ++;
        if(IntelligentTuningStatisticalExportQueryUtil.loadCellTableComplete && IntelligentTuningStatisticalExportQueryUtil.loadOrderTableComplete){
            clearInterval(isStop)
            $(".progressBox").hide();
        }
        if(stopCount > 30){
            clearInterval(isStop);
            $(".progressBox").hide();
        }
    },2000)
}

IntelligentTuningStatisticalExportQueryUtil.getStatisticalStr = function(statistical){
    var str = "";
    if(statistical == "天馈接反"){
        str = `AND (PROBLEM_NAME='${statistical}' or IS_ANT_CONN_ABNOR=1)`
    }else if(statistical == "坐标勘误"){
        str = `AND (PROBLEM_NAME='${statistical}' or PRED_DISTANCE>0)`
    }else if(statistical == "下倾角勘误"){
        str = `AND (PROBLEM_NAME='${statistical}' or IS_DECL_ANGLE_ABNOR=1)`
    }else if(statistical == "越区覆盖"){
        str = `AND (PROBLEM_NAME='${statistical}' or IS_CB_COV=1)`
    }else if(statistical == "弱覆盖"){
        str = `AND (PROBLEM_NAME='${statistical}' or IS_EXIST_POOR__AREA=1)`
    }else if(statistical == "重叠覆盖"){
        str = `AND (PROBLEM_NAME='${statistical}' or IS_OL_COV=1)`
    }else if(statistical == "MOD3干扰"){
        str = `AND (PROBLEM_NAME='${statistical}' or IS_M3_COV=1)`
    }
    return str;
}

/**********************************
 * @funcname IntelligentTuningStatisticalExportQueryUtil.loadOrderTable
 * @funcdesc 工单列表
 * @param
 * @return
 * @author laijunbao
 * @create 2019-02-14 9:53
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportQueryUtil.loadOrderTable = function(day,city,district,mktcenter,statistical,status,taskId){
    var list = ["AntAdj_10_Task_List"];

    var progressBarSqls = [];
    var functionlist = [];

    var list1 = ["AntAdj_10_Task_List_count"];

    if(day != undefined){
        list.push("DAY:" + day);
        list1.push("DAY:" + day);
    }else{
        list.push("DAY:" + IntelligentTuningStatisticalExport.vm.queryDay);
        list1.push("DAY:" + IntelligentTuningStatisticalExport.vm.queryDay);
    }
    if(city != undefined && city != "全省" && city != '其他' && city != ""){
        list.push("CITY_ID_COND:and city='" + city + "'");
        list1.push("CITY_ID_COND:and city='" + city + "'");
    }else{
        if(IntelligentTuningStatisticalExport.vm.queryCity != '全省' && IntelligentTuningStatisticalExport.vm.queryCity != '其他'){
            list.push("CITY_ID_COND:and city='" + IntelligentTuningStatisticalExport.vm.queryCity + "'");
            list1.push("CITY_ID_COND:and city='" + IntelligentTuningStatisticalExport.vm.queryCity + "'");
        }else if(IntelligentTuningStatisticalExport.vm.queryCity == '其他'){
            list.push("CITY_ID_COND:and city is not null and city =''");
            list1.push("CITY_ID_COND:and city is not null and city =''");
        }else{
            list.push("CITY_ID_COND:");
            list1.push("CITY_ID_COND:");
        }
    }
    if(district != undefined && district != '其他' && district != ""){
        list.push("COUNTRY_COND:AND COUNTRY='" + district + "'");
        list1.push("COUNTRY_COND:AND COUNTRY='" + district + "'");
    }else{
        if(IntelligentTuningStatisticalExport.vm.queryDistrict != '全市' && IntelligentTuningStatisticalExport.vm.queryCity != '其他'){
            list.push("COUNTRY_COND:AND COUNTRY='" + IntelligentTuningStatisticalExport.vm.queryDistrict + "'");
            list1.push("COUNTRY_COND:AND COUNTRY='" + IntelligentTuningStatisticalExport.vm.queryDistrict + "'");
        }else if(IntelligentTuningStatisticalExport.vm.queryDistrict == '其他'){
            list.push("COUNTRY_COND:and COUNTRY is  null and COUNTRY =''");
            list1.push("COUNTRY_COND:and COUNTRY is  null and COUNTRY =''");
        }else{
            list.push("COUNTRY_COND:");
            list1.push("COUNTRY_COND:");
        }

    }
    if(mktcenter != undefined && mktcenter != ""){
        list.push("MKTCENTER_COND:AND MKTCENTER='" + mktcenter + "'");
        list1.push("MKTCENTER_COND:AND MKTCENTER='" + mktcenter + "'");
    }else{
        if(IntelligentTuningStatisticalExport.vm.queryMktcenter != '全区'){
            list.push("MKTCENTER_COND:AND MKTCENTER='" + IntelligentTuningStatisticalExport.vm.queryMktcenter + "'");
            list1.push("MKTCENTER_COND:AND MKTCENTER='" + IntelligentTuningStatisticalExport.vm.queryMktcenter + "'");
        }else if(IntelligentTuningStatisticalExport.vm.queryMktcenter == '其他'){
            list.push("MKTCENTER_COND:AND MKTCENTER is  null and MKTCENTER =''");
            list1.push("MKTCENTER_COND:AND MKTCENTER is  null and MKTCENTER =''");
        }
        else{
            list.push("MKTCENTER_COND:");
            list1.push("MKTCENTER_COND:");
        }
    }

    if(statistical != undefined && statistical != ""){
        // list.push("PROBLEM_NAME_COND:"+IntelligentTuningStatisticalExportQueryUtil.getStatisticalStr(statistical));
        // list1.push("PROBLEM_NAME_COND:"+IntelligentTuningStatisticalExportQueryUtil.getStatisticalStr(statistical));
        list.push("PROBLEM_NAME_COND:AND PROBLEM_NAME='"+statistical+"'");
        list1.push("PROBLEM_NAME_COND:AND PROBLEM_NAME='"+statistical+"'");
    }else{
        if(IntelligentTuningStatisticalExport.vm.queryStatistical != '' && IntelligentTuningStatisticalExport.vm.queryStatistical != '全部'){
            // list.push("PROBLEM_NAME_COND:"+IntelligentTuningStatisticalExportQueryUtil.getStatisticalStr(IntelligentTuningStatisticalExport.vm.queryStatistical));
            // list1.push("PROBLEM_NAME_COND:"+IntelligentTuningStatisticalExportQueryUtil.getStatisticalStr(IntelligentTuningStatisticalExport.vm.queryStatistical));
            list.push("PROBLEM_NAME_COND:AND PROBLEM_NAME='"+IntelligentTuningStatisticalExport.vm.queryStatistical+"'");
            list1.push("PROBLEM_NAME_COND:AND PROBLEM_NAME='"+IntelligentTuningStatisticalExport.vm.queryStatistical+"'");
        }else{
            list.push("PROBLEM_NAME_COND:");
            list1.push("PROBLEM_NAME_COND:");
        }

    }
    if(status != undefined && status != "全部"){
        list.push("SYS_STATUS_COND:and SYS_STATUS='"+ status + "'");
        list1.push("SYS_STATUS_COND:and SYS_STATUS='"+ status + "'");
    }else{
        list.push("SYS_STATUS_COND:");
        list1.push("SYS_STATUS_COND:");
    }
    if(taskId != undefined && taskId != ""){
        list.push("COMF_TASK_ID_COND:and COMF_TASK_ID like '%" + taskId + "%'");
        list1.push("COMF_TASK_ID_COND:and COMF_TASK_ID like '%" + taskId + "%'");
    }else{
        list.push("COMF_TASK_ID_COND:");
        list1.push("COMF_TASK_ID_COND:");
    }

    progressBarSqls.push(list1);
    functionlist.push(orderTableCount);
    var database = [3];
    progressbarTwo.submitSql(progressBarSqls, functionlist,database);

    function orderTableCount(data){
        var result = callBackChangeData(data);
        IntelligentTuningStatisticalExport.vm.orderTableCount = result[0].count;
        IntelligentTuningStatisticalExportQueryUtil.loadOrderTableCountComplete = true;
    }


    IntelligentTuningStatisticalExport.vm.orderTable = new TableToolsNewTwo();
    var clnObj={
        clnCssArray:[
            {clnNum:8,clnCss:["cln",["clickShowModal"]]},
            {clnNum:10,clnCss:["cln",["clickShowModal"]]}
        ],
        functionArray:[
                {funCln:8,funtion:"IntelligentTuningStatisticalExportQueryUtil.gotoTaskSystem(this);",funType:1},
                {funCln:10,funtion:"IntelligentTuningStatisticalExportQueryUtil.taskTableClick(this);",funType:1}
            ]
    };
    IntelligentTuningStatisticalExport.vm.orderTableObj={
        divId: "tableParentDiv2",
        tableId: "tabObjTabId"+parseInt(Math.random()*100) + "tab",
        tableHead: "调优方案标识,调优方案编码,调优方案关联ID,地市名称,地市ID,区县,营服中心,工单单号,区域归属ID,基站ID_小区ID,小区名称,厂家,频点,方位角,是否室内,基站小区百度经度,基站小区百度纬度,基站小区GPS经度,基站小区GPS纬度,问题类型ID,问题类型,优化方案,处理方式,生成时间,确认单生成时间,确认单位,确认部门,确认人员,确认时间,确认结果,确认说明,集团执行结果,集团执行开始时间,集团执行结束时间,系统评估结果,系统评估开始时间,系统评估结束时间,调整实施状态,问题处理优先值",
        dataType: 3,
        clnObj: clnObj,
        sql: list,
        sortFlag: 0,
        pageObj: {
            pageSize: 20,
            pageFlag: 1
        },
        fixObj: {
            fixRow: 1,
            fixClnObj: {
                fixCln: 3,
                tableId: parseInt(Math.random() * 100) + "tab"
            },
            callBackTranFn: null
        }

    };
    IntelligentTuningStatisticalExport.vm.orderTable.submit(IntelligentTuningStatisticalExport.vm.orderTableObj);
    $(".pbt").hide();


    // 定时器，判断表格是否生成完成
    var orderCount = 0;
    var isStopOrderTable = setInterval(function () {
        orderCount ++;
        if(IntelligentTuningStatisticalExport.vm.orderTableObj.loadEnd && IntelligentTuningStatisticalExportQueryUtil.loadOrderTableCountComplete){
            clearInterval(isStopOrderTable)
            IntelligentTuningStatisticalExportQueryUtil.loadOrderTableComplete = true;
        }
        if(orderCount > 30){
            clearInterval(isStopOrderTable);
            IntelligentTuningStatisticalExportQueryUtil.loadOrderTableComplete = true;
        }
    },1000)
}
/**********************************
 * @funcname IntelligentTuningStatisticalExportQueryUtil.gotoTaskSystem
 * @funcdesc 点击工单单号跳转到工单系统
 * @param
 * @return
 * @author laijunbao
 * @create 2019-02-26 16:18
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportQueryUtil.gotoTaskSystem = function(data,e){
    $(e).parent().parent().find(".alltd").removeClass('addLine');
    $(e).find(".alltd").addClass('addLine');

    if(data.comf_task_id==undefined||data.comf_task_id==null||data.comf_task_id==''){
        alert('工单号为空!');
    }else{
        window.open('http://132.96.154.2/EOMS_FT/app/dwf/ftPub/osCheckFtDetail/osCheckFtDetail!getDetailPage.action?sCode='+data.comf_task_id);
    }
}
/**********************************
 * @funcname IntelligentTuningStatisticalExportQueryUtil.taskTableClick
 * @funcdesc 点击基站id_小区id 跳转到对应小区详情页
 * @param
 * @return
 * @author laijunbao
 * @create 2019-02-18 15:14
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportQueryUtil.taskTableClick = function(data,e){
    $(e).parent().parent().find(".alltd").removeClass('addLine2');
    $(e).find(".alltd").addClass('addLine2');
    try {
        var enbId_cellId = data.enodeb_id_cell_id.split("_");
        window.open("pages_index_Index_home.action?appId=IntelligentTuning&menuId=522&perId=523&id_path=new&isRedirect=true&appName=智能调优V1.0" +
            "&day=" + IntelligentTuningStatisticalExport.vm.dayByClickChart1 + "&enodeb_id=" + enbId_cellId[0] + "&cell_id=" + enbId_cellId[1]);
    } catch (e) {
        console.error(e);
        alert("跳转异常，请查看控制台信息");
    }
}

/**********************************
 * @funcname IntelligentTuningStatisticalExportQueryUtil.tableExport
 * @funcdesc 表格导出
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-10-26-0026 17:33
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportQueryUtil.tableExport = function () {

    var name = IntelligentTuningStatisticalExport.vm.dayByClickChart1 + IntelligentTuningStatisticalExport.vm.titleCity +
        IntelligentTuningStatisticalExport.vm.titleDistrict + IntelligentTuningStatisticalExport.vm.titleMktcenter+
        IntelligentTuningStatisticalExport.vm.queryStatistical+"小区清单"
    var para= [];

    para.push("DAY:" + IntelligentTuningStatisticalExport.vm.dayByClickChart1);

    if(IntelligentTuningStatisticalExport.vm.titleCity != '全省'){
        para.push("CITY_ID_COND:and city='" + IntelligentTuningStatisticalExport.vm.titleCity + "'");
    }else if(IntelligentTuningStatisticalExport.vm.titleCity == '其他'){
        para.push("CITY_ID_COND:and city is not null and city =''");
    }else{
        para.push("CITY_ID_COND:");
    }
    if(IntelligentTuningStatisticalExport.vm.titleDistrict != '' && IntelligentTuningStatisticalExport.vm.titleDistrict != '全市'){
        para.push("COUNTRY_COND:AND COUNTRY='" + IntelligentTuningStatisticalExport.vm.titleDistrict + "'");
    }else if(IntelligentTuningStatisticalExport.vm.titleDistrict == '其他'){
        para.push("COUNTRY_COND:and COUNTRY is  null and COUNTRY =''");
    }else{
        para.push("COUNTRY_COND:");
    }
    if(IntelligentTuningStatisticalExport.vm.titleMktcenter != '' && IntelligentTuningStatisticalExport.vm.titleMktcenter != '全区'){
        para.push("MKTCENTER_COND:AND MKTCENTER='" + IntelligentTuningStatisticalExport.vm.titleMktcenter + "'");
    }else if(IntelligentTuningStatisticalExport.vm.titleMktcenter == '其他'){
        para.push("MKTCENTER_COND:AND MKTCENTER is  null and MKTCENTER =''");
    }
    else{
        para.push("MKTCENTER_COND:");
    }

    if(IntelligentTuningStatisticalExport.vm.queryStatistical != '' && IntelligentTuningStatisticalExport.vm.queryStatistical != '全部'){
        para.push("PROBLEM_NAME_COND:"+IntelligentTuningStatisticalExportQueryUtil.getStatisticalStr(IntelligentTuningStatisticalExport.vm.queryStatistical));
    }else{
        para.push("PROBLEM_NAME_COND:");
    }

    var obj = {
        fileName: name,
        dataType: 3,
        paraLists: [
            {
                sheetName: name,
                titleName: IntelligentTuningStatisticalExport.tableAllTitle,
                mergeTitle: [],
                templateId: "AntAdj_11_StatisticDetail_export",
                templatePara: para,
            }
        ]
    };
    var exportExcel = new exportExcelNew(obj);
    exportExcel.submit();
}

/**********************************
 * @funcname IntelligentTuningStatisticalExportQueryUtil.tableExport
 * @funcdesc 表格导出
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-10-26-0026 17:33
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportQueryUtil.orderTableExport = function (who) {

    var name = IntelligentTuningStatisticalExport.vm.dayByClickChart1 + IntelligentTuningStatisticalExport.vm.titleCity +
        IntelligentTuningStatisticalExport.vm.titleDistrict + IntelligentTuningStatisticalExport.vm.titleMktcenter+
        IntelligentTuningStatisticalExport.vm.queryStatistical;
    if(IntelligentTuningStatisticalExport.vm.status != "全部"){
        name += IntelligentTuningStatisticalExport.vm.status;
    }
    if(IntelligentTuningStatisticalExport.vm.taskId != ""){
        name += "工单编号包含'"+IntelligentTuningStatisticalExport.vm.taskId+"'工单清单";
    }else{
        name += "工单清单";
    }
    var para= [];

    para.push("DAY:" + IntelligentTuningStatisticalExport.vm.dayByClickChart1);

    if(IntelligentTuningStatisticalExport.vm.titleCity != '全省'){
        para.push("CITY_ID_COND:and city='" + IntelligentTuningStatisticalExport.vm.titleCity + "'");
    }else if(IntelligentTuningStatisticalExport.vm.titleCity == '其他'){
        para.push("CITY_ID_COND:and city is not null and city =''");
    }else{
        para.push("CITY_ID_COND:");
    }
    if(IntelligentTuningStatisticalExport.vm.titleDistrict != '' && IntelligentTuningStatisticalExport.vm.titleDistrict != '全市'){
        para.push("COUNTRY_COND:AND COUNTRY='" + IntelligentTuningStatisticalExport.vm.titleDistrict + "'");
    }else if(IntelligentTuningStatisticalExport.vm.titleDistrict == '其他'){
        para.push("COUNTRY_COND:and COUNTRY is  null and COUNTRY =''");
    }else{
        para.push("COUNTRY_COND:");
    }
    if(IntelligentTuningStatisticalExport.vm.titleMktcenter != '' && IntelligentTuningStatisticalExport.vm.titleMktcenter != '全区'){
        para.push("MKTCENTER_COND:AND MKTCENTER='" + IntelligentTuningStatisticalExport.vm.titleMktcenter + "'");
    }else if(IntelligentTuningStatisticalExport.vm.titleMktcenter == '其他'){
        para.push("MKTCENTER_COND:AND MKTCENTER is  null and MKTCENTER =''");
    }
    else{
        para.push("MKTCENTER_COND:");
    }

    if(IntelligentTuningStatisticalExport.vm.queryStatistical != '' && IntelligentTuningStatisticalExport.vm.queryStatistical != '全部'){
        para.push("PROBLEM_NAME_COND:AND PROBLEM_NAME='"+IntelligentTuningStatisticalExport.vm.queryStatistical+"'");
    }else{
        para.push("PROBLEM_NAME_COND:");
    }

    var status = IntelligentTuningStatisticalExport.vm.status;
    var taskId = IntelligentTuningStatisticalExport.vm.taskId;
    if(status != undefined && status != "全部"){
        para.push("SYS_STATUS_COND:and SYS_STATUS='"+ status + "'");
    }else{
        para.push("SYS_STATUS_COND:");
    }
    if(taskId != undefined && taskId != ""){
        para.push("COMF_TASK_ID_COND:and COMF_TASK_ID like '%" + taskId + "%'");
    }else{
        para.push("COMF_TASK_ID_COND:");
    }

    var obj = {
        fileName: name,
        dataType: 3,
        paraLists: [
            {
                sheetName: name,
                titleName: IntelligentTuningStatisticalExport.taskTableTitle,
                mergeTitle: [],
                templateId: "AntAdj_10_Task_List",
                templatePara: para,
            }
        ]
    };
    var exportExcel = new exportExcelNew(obj);
    exportExcel.submit();
}


/**********************************
 * @funcname IntelligentTuningStatisticalExportQueryUtil.tableExport
 * @funcdesc 图表导出
 * @param {Number} which 代表1或2，1是图表1，2是图表2
 * @return {datatype}
 * @author laijunbao
 * @create 2018-10-26-0026 17:33
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportQueryUtil.chartExport = function (which) {
    var name = IntelligentTuningStatisticalExport.vm.dayByClickChart1 + IntelligentTuningStatisticalExport.vm.queryCity+
        IntelligentTuningStatisticalExport.vm.queryDistrict+
        IntelligentTuningStatisticalExport.vm.queryStatistical+"智能调优方案统计";

    var size = 0;
    var titleName = [ "日期","区域","方案派单数","方案受理数","执行成功数","成功解决数"];
    if(which == 1){
        titleName = [ "日期","方案派单数","方案受理数","执行成功数","成功解决数"];
        name = IntelligentTuningStatisticalExport.vm.queryStartDay + "-" + IntelligentTuningStatisticalExport.vm.queryDay +
            IntelligentTuningStatisticalExport.vm.queryCity+ IntelligentTuningStatisticalExport.vm.queryDistrict +
            IntelligentTuningStatisticalExport.vm.queryStatistical+"统计图表";
        size = IntelligentTuningStatisticalExport.chart1DataObj.accept_count_arr.length;
    }else{

        size = IntelligentTuningStatisticalExport.chart2DataObj.accept_count_arr.length;
    }

    if(size > 0){
        var exportData = [];

        if(which == 1){
            for (var i = 0; i < size; i++) {
                var arr = [];
                arr.push(IntelligentTuningStatisticalExport.chart1Xdata[i]);
                arr.push(IntelligentTuningStatisticalExport.chart1DataObj.task_create_count_arr[i]);
                arr.push(IntelligentTuningStatisticalExport.chart1DataObj.accept_count_arr[i]);
                arr.push(IntelligentTuningStatisticalExport.chart1DataObj.execute_count_arr[i]);
                arr.push(IntelligentTuningStatisticalExport.chart1DataObj.resolve_count_arr[i]);

                exportData.push(arr);
            }
        }else{
            for (var i = 0; i < size; i++) {
                var arr = [];
                arr.push(IntelligentTuningStatisticalExport.vm.dayByClickChart1);
                arr.push(IntelligentTuningStatisticalExport.chart2Xdata[i]);
                arr.push(IntelligentTuningStatisticalExport.chart2DataObj.task_create_count_arr[i]);
                arr.push(IntelligentTuningStatisticalExport.chart2DataObj.accept_count_arr[i]);
                arr.push(IntelligentTuningStatisticalExport.chart2DataObj.execute_count_arr[i]);
                arr.push(IntelligentTuningStatisticalExport.chart2DataObj.resolve_count_arr[i]);

                exportData.push(arr);
            }
        }

        var obj={
            fileName: name,
            dataType:3,
            paraLists:[
                {
                    sheetName: name,
                    titleName:titleName,
                    mergeTitle:[],
                    tableData: exportData
                }
            ],
        };
        var exportExcel=new exportExcelNew(obj);
        exportExcel.submit();
    }else{

    }


}
