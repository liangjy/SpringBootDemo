var tableDataProcessForVueComponent = {};

/**********************************
 * @funcname loadTable
 * @funcdesc 加载表格
 * @param day 结束日期
 * @param city 地市
 * @param district 区县
 * @param market 营服
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-25 23:14
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.loadTable = function(day,city,district,market){
    IntelligentRoadTestChart.showLoading();
    // 表格是否加载完成
    tableDataProcessForVueComponent.loadTableComplete = false;
    // 表格总数是否加载完成
    tableDataProcessForVueComponent.loadCountComplete = false;
    // 统计对象
    var objectType = IntelligentRoadTestChart.vm.statistical;
    // 统计周期
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    if(objectType == '工单'){
        // 工单表格
        tableDataProcessForVueComponent.getWorkOrderTableData(day)
            .then( function(data) {
            // 前端拿到数据后，渲染表格
            tableDataProcessForVueComponent.tableDataProcess(data);
        })
        // 工单数量表格
        tableDataProcessForVueComponent.getWorkOrderCntTableData(day).then( function(data) {
            // 前端拿到数据后，渲染表格（工单表格）
            tableDataProcessForVueComponent.workOrderCnttableDataProcess(data);
        })
    }else{
        // 获取表格数据
        tableDataProcessForVueComponent.getTableData(day,city,district,market);

        // 表格数据总数
        tableDataProcessForVueComponent.getTableDataCount(day,city,district,market);
    }

    // 表格标题区域信息
    tableDataProcessForVueComponent.tableTitleStr(city,district,market);

    var hideLoad = setInterval(function () {
        if(tableDataProcessForVueComponent.loadTableComplete && tableDataProcessForVueComponent.loadCountComplete){
            clearInterval(hideLoad);
            IntelligentRoadTestChart.hideLoading();
        }
    },500)
}
/**********************************
 * @funcname getTableData
 * @funcdesc 获取表格数据，调用表格组件，后台分页
 * @param day 结束日期
 * @param city 地市
 * @param district 区县
 * @param market 营服
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-18 09:42
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.getTableData = function (day,city,district,market) {
    var objectType = IntelligentRoadTestChart.vm.statistical;
    // 生成表格组件需要的tableObj
    var sqlLists = tableDataProcessForVueComponent.getTableObject(day,city,district,market);
    sqlLists.forEach(function (sqlList,index) {
        var table = new TableToolsNewTwo();
        // 默认显示的表格，之后下标为页面从左网右排（除了默认显示的0）
        if(index == 0){
            IntelligentRoadTestChart.vm.table = table;
            IntelligentRoadTestChart.vm.tableObj = sqlList;
        }else if(index == 1){
            IntelligentRoadTestChart.vm.table2 = table;
            IntelligentRoadTestChart.vm.tableObj2 = sqlList;
        }else if(index == 2){
            IntelligentRoadTestChart.vm.table3 = table;
            IntelligentRoadTestChart.vm.tableObj3 = sqlList;
        }else if(index == 3){
            IntelligentRoadTestChart.vm.table4 = table;
            IntelligentRoadTestChart.vm.tableObj4 = sqlList;
        }else if(index == 4){
            IntelligentRoadTestChart.vm.table5 = table;
            IntelligentRoadTestChart.vm.tableObj5 = sqlList;
        }

        table.submit(sqlList);
        $(".pbt").hide();
    })

    // 定时器，判断表格是否生成完成
    var count = 0;
    var isStopTable = setInterval(function () {
        count ++;
        if(sqlLists.length == 1){
            if(IntelligentRoadTestChart.vm.tableObj.loadEnd){
                clearInterval(isStopTable)
                tableDataProcessForVueComponent.loadTableComplete = true;
            }
        }else if(sqlLists.length == 2){
            if(IntelligentRoadTestChart.vm.tableObj.loadEnd && IntelligentRoadTestChart.vm.tableObj2.loadEnd){
                clearInterval(isStopTable)
                tableDataProcessForVueComponent.loadTableComplete = true;
            }
        }else if(sqlLists.length == 3){
            if(IntelligentRoadTestChart.vm.tableObj.loadEnd && IntelligentRoadTestChart.vm.tableObj2.loadEnd &&
                IntelligentRoadTestChart.vm.tableObj3.loadEnd){
                clearInterval(isStopTable)
                tableDataProcessForVueComponent.loadTableComplete = true;
            }
        }else if(sqlLists.length == 4){
            if(IntelligentRoadTestChart.vm.tableObj.loadEnd && IntelligentRoadTestChart.vm.tableObj2.loadEnd &&
                IntelligentRoadTestChart.vm.tableObj3.loadEnd && IntelligentRoadTestChart.vm.tableObj4.loadEnd){
                clearInterval(isStopTable)
                tableDataProcessForVueComponent.loadTableComplete = true;
            }
        }else if(sqlLists.length == 5){
            if(IntelligentRoadTestChart.vm.tableObj.loadEnd && IntelligentRoadTestChart.vm.tableObj2.loadEnd &&
                IntelligentRoadTestChart.vm.tableObj3.loadEnd && IntelligentRoadTestChart.vm.tableObj4.loadEnd &&
                IntelligentRoadTestChart.vm.tableObj5.loadEnd){
                clearInterval(isStopTable)
                tableDataProcessForVueComponent.loadTableComplete = true;
            }
        }
        if(count > 30){
            clearInterval(isStopTable);
            tableDataProcessForVueComponent.loadTableComplete = true;
        }
    },1000)

}

/**********************************
 * @funcname getTableObject
 * @funcdesc 生成表格组件需要的tableObj
 * @param day 结束日期
 * @param city 地市
 * @param district 区县
 * @param market 营服
 * @return {datatype}
 * @author laijunbao
 * @create 2018-07-31-0031 16:20
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.getTableObject = function(day,city,district,market){
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var clnObj={
        subArray:[
            {clnNum:9,value:0,title:tableDataProcessForVueComponent.TOPSectorInfo},
            {clnNum:26,value:0,title:tableDataProcessForVueComponent.recentSectorInfo}
        ]
    };
    var sqlAndTalObj = {};
    var sqlLists = [];
    var tableObj = {};
    var titleSqlArrs = [];
    var titleSqlObj = {};

    if(objectType == "扇区"){
        titleSqlObj = {
            divId: "tableParentDiv",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market),
            tableHead: TableTitle.sectorTitle
        };
        sqlLists.push(titleSqlObj);
        titleSqlObj = {
            divId: "tableParentDiv2",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market,"营服"),
            tableHead: TableTitle.mkTitle
        };
        sqlLists.push(titleSqlObj);
        if(dateCycle != "月"){
            titleSqlObj = {
                divId: "tableParentDiv3",
                sql: tableDataProcessForVueComponent.getSql(day,city,district,market,"勘误"),
                tableHead: TableTitle.kanwuTitle
            };
            sqlLists.push(titleSqlObj);
        }

    }else if($.inArray(objectType,['弱区','上行低速区','下行低速区','MOD3干扰区','越区覆盖区','重叠覆盖区']) > -1){
        if($.inArray(objectType,["MOD3干扰区","越区覆盖区","重叠覆盖区"]) > -1){
            clnObj={
                subArray:[
                    {clnNum:9,value:0,title:tableDataProcessForVueComponent.TopCellSet},
                    {clnNum:10,value:0,title:tableDataProcessForVueComponent.TOPSectorInfo},
                    {clnNum:27,value:0,title:tableDataProcessForVueComponent.recentSectorInfo}
                ]
            };
        }
        titleSqlObj = {
            divId: "tableParentDiv",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market),
            tableHead: TableTitle.metroLineTitle,
            callBackTranFn: tableDataProcessForVueComponent.converToGPS,
            clnObj: clnObj
        };
        if(objectType == "上行低速区"){
            titleSqlObj.clnObj = clnObj;
            titleSqlObj.tableHead = TableTitle.upLowerAreaTitle;
        }else if(objectType == "下行低速区"){
            titleSqlObj.tableHead = TableTitle.downLowerAreaTitle;
        }else if(objectType == "弱区"){
            titleSqlObj.tableHead = TableTitle.weakTitle;
        }else if(objectType == "MOD3干扰区"){
            titleSqlObj.tableHead = TableTitle.MOD3Title;
        }else if(objectType == "越区覆盖区"){
            titleSqlObj.tableHead = TableTitle.yuequTitle;
        }else if(objectType == "重叠覆盖区"){
            titleSqlObj.tableHead = TableTitle.chongdiequTitle;
        }
        sqlLists.push(titleSqlObj);
    }else if(objectType == "全区域"){
        // AGPS-MR、全量MR综合、全量MR室外、全量MR室内的AGPS_TYPE分别为1、0、3、2
        titleSqlObj = {
            divId: "tableParentDiv",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market,1),
            tableHead: TableTitle.allAreaTitle,
            callBackTranFn: tableDataProcessForVueComponent.converToGPS,
            clnObj: clnObj
        };
        sqlLists.push(titleSqlObj);

        titleSqlObj = {
            divId: "tableParentDiv2",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market,0),
            tableHead: TableTitle.allAreaTitle
        };
        sqlLists.push(titleSqlObj);

        titleSqlObj = {
            divId: "tableParentDiv3",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market,3),
            tableHead: TableTitle.allAreaTitle
        };
        sqlLists.push(titleSqlObj);

        titleSqlObj = {
            divId: "tableParentDiv4",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market,2),
            tableHead: TableTitle.allAreaTitle
        };
        sqlLists.push(titleSqlObj);
    }else if(objectType == "高铁"){
        titleSqlObj = {
            divId: "tableParentDiv",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market),
            tableHead: TableTitle.highrailLineTitle
        };
        sqlLists.push(titleSqlObj);

        titleSqlObj = {
            divId: "tableParentDiv2",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market,"500米分段"),
            tableHead: TableTitle.highRail500Title
            // callBackTranFn: tableDataProcessForVueComponent.converToGPS
        };
        sqlLists.push(titleSqlObj);

        if(dateCycle != "日"){
            let weakTitle = TableTitle.weakTitle;
            weakTitle+=",l最大连段里程,l最小连段里程,l＜-110里程";
            titleSqlObj = {
                divId: "tableParentDiv3",
                sql: tableDataProcessForVueComponent.getSql(day,city,district,market,"弱连段"),
                tableHead: weakTitle,
                callBackTranFn: tableDataProcessForVueComponent.converToGPS
            };
            sqlLists.push(titleSqlObj);

            titleSqlObj = {
                divId: "tableParentDiv4",
                sql: tableDataProcessForVueComponent.getSql(day,city,district,market,"隧道"),
                tableHead: TableTitle.highRailTunnelsTitle
                // callBackTranFn: tableDataProcessForVueComponent.converToGPS
            };
            sqlLists.push(titleSqlObj);

            titleSqlObj = {
                divId: "tableParentDiv5",
                sql: tableDataProcessForVueComponent.getSql(day,city,district,market,"非隧道"),
                tableHead: TableTitle.highRail500Title
                // callBackTranFn: tableDataProcessForVueComponent.converToGPS
            };
            sqlLists.push(titleSqlObj);
        }else{
            titleSqlObj = {
                divId: "tableParentDiv3",
                sql: tableDataProcessForVueComponent.getSql(day,city,district,market,"隧道"),
                tableHead: TableTitle.highRailTunnelsTitle
                // callBackTranFn: tableDataProcessForVueComponent.converToGPS
            };
            sqlLists.push(titleSqlObj);

            titleSqlObj = {
                divId: "tableParentDiv4",
                sql: tableDataProcessForVueComponent.getSql(day,city,district,market,"非隧道"),
                tableHead: TableTitle.highRail500Title
                // callBackTranFn: tableDataProcessForVueComponent.converToGPS
            };
            sqlLists.push(titleSqlObj);
        }


    }else if(objectType == "地铁"){
        titleSqlObj = {
            divId: "tableParentDiv",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market),
            tableHead: TableTitle.metroLineTitle
        };
        sqlLists.push(titleSqlObj);
        titleSqlObj = {
            divId: "tableParentDiv2",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market,"TA段"),
            tableHead: TableTitle.metroTunnelTitle,
            callBackTranFn: tableDataProcessForVueComponent.converToGPS
        };
        sqlLists.push(titleSqlObj);
        titleSqlObj = {
            divId: "tableParentDiv3",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market,"站厅站台"),
            tableHead: TableTitle.metroSiteTitle
        };
        sqlLists.push(titleSqlObj);
        titleSqlObj = {
            divId: "tableParentDiv4",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market,"站间段"),
            tableHead: TableTitle.metroStationTitle
        };
        sqlLists.push(titleSqlObj);
    }else if($.inArray(objectType,['全区域','高校','场馆','美食','高密度住宅区','高流量商务区','战狼区域','农贸市场','中小学','城中村']) > -1){
        // AGPS-MR、全量MR综合、全量MR室外、全量MR室内的AGPS_TYPE分别为1、0、3、2
        titleSqlObj = {
            divId: "tableParentDiv",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market,1),
            tableHead: TableTitle.commTitle2,
            callBackTranFn: tableDataProcessForVueComponent.converToGPS,
            clnObj: clnObj
        };
        sqlLists.push(titleSqlObj);

        titleSqlObj = {
            divId: "tableParentDiv2",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market,0),
            tableHead: TableTitle.commTitle2
        };
        sqlLists.push(titleSqlObj);

        titleSqlObj = {
            divId: "tableParentDiv3",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market,3),
            tableHead: TableTitle.commTitle2
        };
        sqlLists.push(titleSqlObj);

        titleSqlObj = {
            divId: "tableParentDiv4",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market,2),
            tableHead: TableTitle.commTitle2
        };
        sqlLists.push(titleSqlObj);
    }else{
        titleSqlObj = {
            divId: "tableParentDiv",
            sql: tableDataProcessForVueComponent.getSql(day,city,district,market),
            tableHead: TableTitle.commTitle
            // callBackTranFn: tableDataProcessForVueComponent.converToGPS
        };
        sqlLists.push(titleSqlObj);
    }

    // 创建并返回表格组件需要的tableObj
    return tableDataProcessForVueComponent.createTableObject(sqlLists);
}
/**********************************
 * @funcname createTableObject
 * @funcdesc 创建表格组件需要的tableObj
 * @param sqlLists tableObj 预数组
 * @return tableObjArr tableObj 数组
 * @author laijunbao
 * @create 2018-07-31-0031 16:50
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.createTableObject = function(sqlLists){
    var tableObjArr = [];
    sqlLists.forEach(function (sqlObj) {
        var paraObj = {
            divId: sqlObj.divId,
            tableHead: sqlObj.tableHead,
            sql: sqlObj.sql,
            callBackTranFn: sqlObj.callBackTranFn == undefined ? null:sqlObj.callBackTranFn,
            clnObj: sqlObj.clnObj
        };
        tableObjArr.push(TableInfoUtil.getTableObj(paraObj));
    })
    return tableObjArr;
}

/**********************************
 * @funcname getSql
 * @funcdesc 拼接表格sql
 * @param day 结束日期
 * @param city 地市
 * @param district 区县
 * @param market 营服
 * @param type 类型
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-25 23:14
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.getSql = function(day,city,district,market,type){
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;

    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    if(day != undefined){
        urlEndDay = day;
    }
    if(city == undefined){
        city = IntelligentRoadTestChart.vm.cityFlag;
    }
    if(district == undefined){
        district = IntelligentRoadTestChart.vm.district;
    }
    if(market == undefined){
        market = IntelligentRoadTestChart.vm.market;
    }

    var ZLQY_FLAG = 0;
    var bestOrsc = IntelligentRoadTestChart.vm.bestOrsc;
    var threshold = IntelligentRoadTestChart.vm.thresholdVal;
    var workOrderType = IntelligentRoadTestChart.vm.workOrderType;
    var list = [];
    var listCnt = [];
    var table = '';

    if(dateCycle != '月'){
        urlStartDay = new Date(urlStartDay).format('yyyyMMdd');
        urlEndDay = new Date(urlEndDay).format('yyyyMMdd');
    }else{
        urlStartDay = new Date(urlStartDay).format('yyyyMM');
        urlEndDay = new Date(urlEndDay).format('yyyyMM');
    }
    if(dateCycle == '月'){
        table = 'm';
    }else if(dateCycle == '周'){
        table = 'w';
    }else if(dateCycle == '日'){
        table = 'd';
    }

    if($.inArray(objectType,['弱区','上行低速区','下行低速区','MOD3干扰区','越区覆盖区','重叠覆盖区']) > -1){
        list.push('StatisticsDL_PoorGridCountTab');
        list.push(`TABLE:d`);
        if(objectType == '弱区'){
            list.push(`TYPE:0`);
        }else if(objectType == '上行低速区'){
            list.push(`TYPE:4`);
        }else if(objectType == '下行低速区'){
            list.push(`TYPE:5`);
        }else if(objectType == 'MOD3干扰区'){
            list.push(`TYPE:6`);
        }else if(objectType == '越区覆盖区'){
            list.push(`TYPE:8`);
        }else if(objectType == '重叠覆盖区'){
            list.push(`TYPE:7`);
        }
    }else if(objectType == '扇区'){
        if(type=="营服"){
            list.push('StatisticsDL_MRSatCellTab_mkt');
        }else if(type=="勘误"){
            list.push('StatisticsDL_MRSatCellTab_mkt_gdkw');
        }else{
            list.push('StatisticsDL_MRSatCellTab_cell');
        }
    }else if(objectType == '全区域'){
        list.push('StatisticsDL_MRSatAllAreaTab');
        list.push('AGPS_TYPE:'+ type);
    }else if(objectType == '关注区域'){
        list.push('StatisticsDL_MRSatSenceTab_2');
    }else if(objectType == '骨头区域'){
        list.push('StatisticsDL_MRSatSenceTab_3');
    }else if($.inArray(objectType,['高速','市政路']) > -1){
        list.push('StatisticsDL_MRSatSenceTab_11');
        if(objectType == '高速'){
            list.push("OBJECT_TYPE:and OBJECT_TYPE ='高速'");
        }else{
            list.push("OBJECT_TYPE:and OBJECT_TYPE ='市政路'");
        }
    }else if(objectType == '高铁'){
        threshold = IntelligentRoadTestChart.vm.tablethresholdVal;

        if(type == "500米分段"){
            list.push('StatisticsDL_MRHSRail_500metres_Info');
            list.push(`LINE_TYPE_CONDITION:2`);
        }else if(type == "弱连段"){
            list.push('StatisticsDL_PoorGridCountTab');
            list.push(`TYPE:2`);
        }else if(type == "隧道"){
            list.push('StatisticsDL_MRHSRail_tunnels_Info');
            list.push(`LINE_TYPE_CONDITION:21`);
        }else if(type == "非隧道"){
            list.push('StatisticsDL_MRHSRail_500metres_Info');
            list.push(`LINE_TYPE_CONDITION:22`);
        }else{
            list.push('StatisticsDL_MRHSRail_Line_Info');
        }
        list.push(`STATCYCLE:${table}`);
        list.push(`DAY:${urlEndDay}`);
    }else if(objectType == '地铁'){
        if(type == "TA段"){
            list.push('StatisticsDL_MRSubway_Tunnel_Info');
        }else if(type == "站厅站台"){
            list.push('StatisticsDL_MRSubway_Station_Info');
        }else if(type == "站间段"){
            list.push('StatisticsDL_MRSubway_MidStation_Info');
        }else{
            list.push('StatisticsDL_MRSubway_Line_Info');
        }
        list.push(`DAY:${urlEndDay}`);
    }else{
        if($.inArray(objectType,['高校','场馆','美食','高密度住宅区','高流量商务区','战狼区域','农贸市场','中小学','城中村']) > -1){
            list.push('StatisticsDL_MRSatSenceTab_20181127');
            list.push('AGPS_TYPE:'+ type);
        }else{
            list.push('StatisticsDL_MRSatSenceTab_1');
        }

        if(objectType == '战狼区域'){
            list.push(`ZLQY_CONDITION:AND a.ZLQY_FLAG = 1`);
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '高流量商务区'`);
        }else{
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '${objectType}'`);
        }
    }
    if($.inArray(objectType,['MOD3干扰区','越区覆盖区','重叠覆盖区']) > -1){
        list.push(`TOP_CELL_SET_CONDITION:TOP_CELL_SET,`);
    }else{
        list.push(`TOP_CELL_SET_CONDITION:`);
    }
    if(objectType == "高铁"){
        list.push(`HIGHWAY_CONDITION_FIELDS:,max(POOR_GRID_NUMS)*20,min(POOR_GRID_NUMS)*20,sum(POOR_GRID_NUMS)*20`);
    }else{
        list.push(`HIGHWAY_CONDITION_FIELDS:`);
    }

    if($.inArray(objectType,['弱区','上行低速区','下行低速区','MOD3干扰区','越区覆盖区','重叠覆盖区']) < 0){
        list.push(`TABLE:${table}`);
        list.push(`COVERAGE_TYPE:${bestOrsc}`);
        list.push(`THRESHOLD:${threshold}`);
        if(table != 'm'){
            list.push(`T_PARTITION_VAR:day`);
        }else{
            list.push(`T_PARTITION_VAR:month`);
        }
    }
    if($.inArray(objectType,['高速','市政路','地铁']) > -1){
        if(objectType == '高速'){
            list.push("ROAD_TYPE_ID:1");
        }else{
            list.push("ROAD_TYPE_ID:3");
        }
        if(city == '全省'){
            list.push(`CITY_CONDITION:`);
        }else if(city == '其他'){
            list.push(`CITY_CONDITION:and a.CITY_ID is null`);
        }else{
            var cityId = noceUtil.city_LATN_ID[city];
            list.push(`CITY_CONDITION:and a.CITY_ID=${cityId}`);
        }
        if(district == '全市'){
            list.push(`COUNTRY_CONDITION:`);
        }else if(district == '其他'){
            list.push(`COUNTRY_CONDITION:and a.COUNTRY is null`);
        }else{
            list.push(`COUNTRY_CONDITION:and a.COUNTRY='${district}'`);
        }
        if(market == '全区'){
            list.push(`MKTCENTER_CONDITION:`);
        }else if(market == '其他'){
            list.push(`MKTCENTER_CONDITION:and a.MKTCENTER is null`);
        }else{
            if(objectType != '弱区' && objectType != '扇区' && objectType != '全区域'){
                list.push(`MKTCENTER_CONDITION:and a.MKTCENTER like '%${market}%'`);
            }else{
                list.push(`MKTCENTER_CONDITION:and a.MKTCENTER='${market}'`);
            }
        }
    }else if($.inArray(objectType,['高校','场馆','美食','高密度住宅区','高流量商务区','战狼区域','农贸市场','中小学','城中村']) > -1){
        if(city == '全省'){
            list.push(`CITY_CONDITION:`);
        }else if(city == '其他'){
            list.push(`CITY_CONDITION:and a.CITY_ID is null`);
        }else{
            var cityId = noceUtil.city_LATN_ID[city];
            list.push(`CITY_CONDITION:and a.CITY_ID=${cityId}`);
        }
        if(district == '全市'){
            list.push(`COUNTRY_CONDITION:`);
        }else if(district == '其他'){
            list.push(`COUNTRY_CONDITION:and a.COUNTRY is null`);
        }else{
            list.push(`COUNTRY_CONDITION:and a.COUNTRY='${district}'`);
        }
        if(market == '全区'){
            list.push(`MKTCENTER_CONDITION:`);
        }else if(market == '其他'){
            list.push(`MKTCENTER_CONDITION:and a.MKTCENTER is null`);
        }else{
            if(objectType != '弱区' && objectType != '扇区' && objectType != '全区域'){
                list.push(`MKTCENTER_CONDITION:and a.MKTCENTER like '%${market}%'`);
            }else{
                list.push(`MKTCENTER_CONDITION:and a.MKTCENTER='${market}'`);
            }
        }
    } else{
        if(city == '全省'){
            list.push(`CITY_CONDITION:`);
        }else if(city == '其他'){
            list.push(`CITY_CONDITION:and CITY_ID is null`);
        }else{
            var cityId = noceUtil.city_LATN_ID[city];
            list.push(`CITY_CONDITION:and CITY_ID=${cityId}`);
        }
        if(district == '全市'){
            list.push(`COUNTRY_CONDITION:`);
        }else if(district == '其他'){
            list.push(`COUNTRY_CONDITION:and COUNTRY is null`);
        }else{
            list.push(`COUNTRY_CONDITION:and COUNTRY='${district}'`);
        }
        if(market == '全区'){
            list.push(`MKTCENTER_CONDITION:`);
        }else if(market == '其他'){
            list.push(`MKTCENTER_CONDITION:and MKTCENTER is null`);
        }else{
            if(objectType != '弱区' && objectType != '扇区' && objectType != '全区域'){
                list.push(`MKTCENTER_CONDITION:and MKTCENTER like '%${market}%'`);
            }else{
                list.push(`MKTCENTER_CONDITION:and MKTCENTER='${market}'`);
            }
        }
    }


    list.push(`startTime:${urlStartDay}`);

    if(objectType == '骨头区域'){
        if(dateCycle == '月'){
            list.push(`endTime2:${urlEndDay}`);
        }else{
            list.push(`endTime2:floor(${urlEndDay}/100)`);
        }
    }
    list.push(`endTime:${urlEndDay}`);


    return list;
}
/**********************************
 * @funcname getTableDataCount
 * @funcdesc 表格数据总数
 * @param day 结束日期
 * @param city 地市
 * @param district 区县
 * @param market 营服
 * @param type 类型
 * @return {datatype}
 * @author laijunbao
 * @create 2018-05-02 12:28
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.getTableDataCount = function (day,city,district,market,type) {
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    // var list = tableDataProcessForVueComponent.getSqlCount(day,city,district,market,type);
    var sqlLists = tableDataProcessForVueComponent.createTableCountSql(day,city,district,market);
    sqlLists.forEach(function (sqlObj,index) {
        var progressBarSqls = [];
        var functionlist = [successCallback];
        progressBarSqls.push(sqlObj.sql);
        progressbarTwo.submitSql(progressBarSqls, functionlist, [3],[[sqlObj.type,index]]);
    });
    function successCallback(data,type) {
        var result = callBackChangeData(data);
        var tableInfo = '';
        if(result.length == 0){
            tableInfo = '总条数:0';
        }else{
            tableInfo = '总条数:'+result[0].count;
        }
        if(type[0] == undefined){
            IntelligentRoadTestChart.vm.tableInfo = tableInfo;
        }else if($.inArray(type[0],['营服','500米分段','全量MR综合',"TA段"]) > -1){
            IntelligentRoadTestChart.vm.tableInfo2 = tableInfo;
        }else if($.inArray(type[0],['勘误','站点','弱连段','全量MR室外',"站厅站台"]) > -1){
            IntelligentRoadTestChart.vm.tableInfo3 = tableInfo;
        }else if($.inArray(type[0],['站间','隧道','全量MR室内',"站间段"]) > -1){
            if(objectType == "高铁" && dateCycle == "日"){
                IntelligentRoadTestChart.vm.tableInfo3 = tableInfo;
            }else{
                IntelligentRoadTestChart.vm.tableInfo4 = tableInfo;
            }
        }else if($.inArray(type[0],['非隧道']) > -1){
            if(objectType == "高铁" && dateCycle == "日"){
                IntelligentRoadTestChart.vm.tableInfo4 = tableInfo;
            }else{
                IntelligentRoadTestChart.vm.tableInfo5 = tableInfo;
            }

        }
        if(type[1] == sqlLists.length -1){
            tableDataProcessForVueComponent.loadCountComplete = true;
        }
    }
}
/**********************************
 * @funcname getTableCountSql
 * @funcdesc 创建获取表格总数sql
 * @param day 结束日期
 * @param city 地市
 * @param district 区县
 * @param market 营服
 * @return {datatype}
 * @author laijunbao
 * @create 2018-08-01-0001 10:37
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.createTableCountSql = function(day,city,district,market){
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var sqlLists = [];
    var sqlListsObj = {};
    if(objectType == "扇区"){
        if(dateCycle != "月"){
            sqlLists.push(
                {
                    sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market)
                },
                {
                    sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market,"营服"),
                    type: "营服"
                },
                {
                    sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market,"勘误"),
                    type: "勘误"
                }
            )
        }else{
            sqlLists.push(
                {
                    sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market)
                },
                {
                    sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market,"营服"),
                    type: "营服"
                }
            )
        }

    }else if(objectType == "地铁"){
        sqlLists.push(
            {
                sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market)
            },
            {
                sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market,"TA段"),
                type: "TA段"
            },
            {
                sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market,"站厅站台"),
                type: "站厅站台"
            },
            {
                sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market,"站间段"),
                type: "站间段"
            }
        )
    }else if(objectType == "高铁"){
        if(dateCycle != "日"){
            sqlLists.push(
                {
                    sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market)
                },
                {
                    sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market,"500米分段"),
                    type: "500米分段"
                },
                {
                    sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market,"弱连段"),
                    type: "弱连段"
                },
                {
                    sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market,"隧道"),
                    type: "隧道"
                },
                {
                    sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market,"非隧道"),
                    type: "非隧道"
                }
            )
        }else{
            sqlLists.push(
                {
                    sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market)
                },
                {
                    sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market,"500米分段"),
                    type: "500米分段"
                },
                {
                    sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market,"隧道"),
                    type: "隧道"
                },
                {
                    sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market,"非隧道"),
                    type: "非隧道"
                }
            )
        }


    }else if($.inArray(objectType,['全区域','高校','场馆','美食','高密度住宅区','高流量商务区','战狼区域','农贸市场','中小学','城中村']) > -1){
        sqlLists.push(
            {
                sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market,1)
            },
            {
                sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market,0),
                type: "全量MR综合"
            },
            {
                sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market,3),
                type: "全量MR室外"
            },
            {
                sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market,2),
                type: "全量MR室内"
            }
        )
    }
    else{
        sqlLists.push(
            {
                sql: tableDataProcessForVueComponent.getSqlCount(day,city,district,market)
            }
        )
    }
    return sqlLists;
}

/**********************************
 * @funcname getSqlCount
 * @funcdesc 获取表格数据总数
 * @param day 结束日期
 * @param city 地市
 * @param district 区县
 * @param market 营服
 * @param type 类型
 * @return {datatype}
 * @author laijunbao
 * @create 2018-05-02 12:25
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.getSqlCount = function(day,city,district,market,type){
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;

    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    if(day != undefined){
        urlEndDay = day;
    }
    if(day != undefined){
        urlEndDay = day;
    }
    if(city == undefined){
        city = IntelligentRoadTestChart.vm.cityFlag;
    }
    if(district == undefined){
        district = IntelligentRoadTestChart.vm.district;
    }
    if(market == undefined){
        market = IntelligentRoadTestChart.vm.market;
    }

    var ZLQY_FLAG = 0;
    var bestOrsc = IntelligentRoadTestChart.vm.bestOrsc;
    var threshold = IntelligentRoadTestChart.vm.thresholdVal;
    var workOrderType = IntelligentRoadTestChart.vm.workOrderType;
    var list = [];
    var listCnt = [];
    var table = '';

    if(dateCycle != '月'){
        urlStartDay = new Date(urlStartDay).format('yyyyMMdd');
        urlEndDay = new Date(urlEndDay).format('yyyyMMdd');
    }else{
        urlStartDay = new Date(urlStartDay).format('yyyyMM');
        urlEndDay = new Date(urlEndDay).format('yyyyMM');
    }
    if(dateCycle == '月'){
        table = 'm';
    }else if(dateCycle == '周'){
        table = 'w';
    }else if(dateCycle == '日'){
        table = 'd';
    }
    if(objectType == '扇区'){
        if(type == "营服"){
            list.push('StatisticsDL_MRSatCellTab_mkt_cnt');
        }else if(type == "勘误"){
            list.push('StatisticsDL_MRSatCellTab_mkt_gdkw_cnt');
        }else{
            list.push('StatisticsDL_04_MRSatTab4Cell_count');
        }
    }else if($.inArray(objectType,['弱区','上行低速区','下行低速区','MOD3干扰区','越区覆盖区','重叠覆盖区']) > -1){
        list.push('IntelligentRoadTestAnalysisV3_166_PoorTable_count');
        if(objectType == '弱区'){
            list.push(`TYPE:0`);
        }else if(objectType == '上行低速区'){
            list.push(`TYPE:4`);
        }else if(objectType == '下行低速区'){
            list.push(`TYPE:5`);
        }else if(objectType == 'MOD3干扰区'){
            list.push(`TYPE:6`);
        }else if(objectType == '越区覆盖区'){
            list.push(`TYPE:8`);
        }else if(objectType == '重叠覆盖区'){
            list.push(`TYPE:7`);
        }

    }else if(objectType == '全区域'){
        list.push('StatisticsDL_06_MRSatAllAreaTab_count');
        list.push('AGPS_TYPE:'+ type);
    }
    else if(objectType == '关注区域'){
        list.push('StatisticsDL__concern_area_table_count');
    }else if(objectType == '骨头区域'){
        list.push('StatisticsDL__poor_area_table_count');
    }else if($.inArray(objectType,['高速','市政路']) > -1){
        list.push('StatisticsDL_03_MRSatTab_count');
        if(objectType == '高速'){
            list.push("OBJECT_TYPE:and OBJECT_TYPE ='高速'");
        }else{
            list.push("OBJECT_TYPE:and OBJECT_TYPE ='市政路'");
        }
    }else if(objectType == '高铁'){
        if(type == "500米分段"){
            list.push('StatisticsDL_MRHSRail_500metres_Info_count');
            list.push(`LINE_TYPE_CONDITION:2`);
        }else if(type == "弱连段"){
            list.push('IntelligentRoadTestAnalysisV5_HighRail_166_PoorTable_count');
            list.push(`TYPE:2`);
        }else if(type == "隧道"){
            list.push('StatisticsDL_MRHSRail_tunnels_Info_count');
        }else if(type == "非隧道"){
            list.push('StatisticsDL_MRHSRail_500metres_Info_count');
            list.push(`LINE_TYPE_CONDITION:22`);
        }else{
            list.push('StatisticsDL_MRHSRail_Line_Info_count');
        }
        list.push(`DAY:${urlEndDay}`);
        list.push(`STATCYCLE:${table}`);
    }else if(objectType == '地铁'){
        if(type == "TA段"){
            list.push('StatisticsDL_MRSubway_Tunnel_Info_count');
        }else if(type == "站厅站台"){
            list.push('StatisticsDL_MRSubway_Station_Info_count');
        }else if(type == "站间段"){
            list.push('StatisticsDL_MRSubway_MidStation_Info_count');
        }else{
            list.push('StatisticsDL_MRSubway_Line_Info_count');
        }
        list.push(`DAY:${urlEndDay}`);
    }
    else{
        if($.inArray(objectType,['高校','场馆','美食','高密度住宅区','高流量商务区','战狼区域','农贸市场','中小学','城中村']) > -1){
            list.push('StatisticsDL_02_MRSatTab_count_20181127');
            list.push('AGPS_TYPE:'+ type);
        }else{
            list.push('StatisticsDL_02_MRSatTab_count');
        }
        if(objectType == '战狼区域'){
            list.push(`ZLQY_CONDITION:AND ZLQY_FLAG = 1`);
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '高流量商务区'`);
        }else{
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '${objectType}'`);
        }

    }
    if($.inArray(objectType,['MOD3干扰区','越区覆盖区','重叠覆盖区']) > -1){
        list.push(`TOP_CELL_SET_CONDITION:TOP_CELL_SET,`);
    }else{
        list.push(`TOP_CELL_SET_CONDITION:`);
    }
    if(objectType == "高铁"){
        list.push(`HIGHWAY_CONDITION_FIELDS:,max(POOR_GRID_NUMS)*20,min(POOR_GRID_NUMS)*20,sum(POOR_GRID_NUMS)*20`);
    }else{
        list.push(`HIGHWAY_CONDITION_FIELDS:`);
    }
    if($.inArray(objectType,['弱区','上行低速区','下行低速区','MOD3干扰区','越区覆盖区','重叠覆盖区','工单']) < 0){
        list.push(`TABLE:${table}`);
        list.push(`COVERAGE_TYPE:${bestOrsc}`);
        list.push(`THRESHOLD:${threshold}`);
        if(table != 'm'){
            list.push(`T_PARTITION_VAR:day`);
        }else{
            list.push(`T_PARTITION_VAR:month`);
        }
    }

    if(city == '全省'){
        list.push(`CITY_CONDITION:`);
    }else if(city == '其他'){
        list.push(`CITY_CONDITION:and CITY_ID is null`);
    }else{
        var cityId = noceUtil.city_LATN_ID[city];
        list.push(`CITY_CONDITION:and CITY_ID=${cityId}`);
    }
    if(district == '全市'){
        list.push(`COUNTRY_CONDITION:`);
    }else if(district == '其他'){
        list.push(`COUNTRY_CONDITION:and COUNTRY is null`);
    }else{
        list.push(`COUNTRY_CONDITION:and COUNTRY='${district}'`);
    }
    if(market == '全区'){
        list.push(`MKTCENTER_CONDITION:`);
    }else if(market == '其他'){
        list.push(`MKTCENTER_CONDITION:and MKTCENTER is null`);
    }else{
        if(objectType != '弱区' && objectType != '扇区' && objectType != '全区域'){
            list.push(`MKTCENTER_CONDITION:and MKTCENTER like '%${market}%'`);
        }else{
            list.push(`MKTCENTER_CONDITION:and MKTCENTER='${market}'`);
        }
    }
    list.push(`startTime:${urlStartDay}`);

    if(objectType == '骨头区域'){
        if(dateCycle == '月'){
            list.push(`endTime2:${urlEndDay}`);
        }else{
            list.push(`endTime2:floor(${urlEndDay}/100)`);
        }
    }
    list.push(`endTime:${urlEndDay}`);


    return list;
}

/**********************************
 * @funcname getWorkOrderTableData
 * @funcdesc 工单表格
 * @param day 结束日期
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-24 16:40
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.getWorkOrderTableData = function(day){
    IntelligentRoadTestChart.vm.isShowLoading = true;
    var city = IntelligentRoadTestChart.vm.cityFlag;
    var district = IntelligentRoadTestChart.vm.district;
    var market = IntelligentRoadTestChart.vm.market;
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    if(day != undefined){
        urlEndDay = day;
    }
    var ZLQY_FLAG = 0;
    var workOrderType = IntelligentRoadTestChart.vm.workOrderType;
    var promise = new Promise(function  (resolve,reject) {
        var list = ["StatisticsDL_AlarmCounTab_detail"];
        if(city == '全省'){
            list.push(`CITY_CONDITION:`);
        }else if(city == '其他'){
            list.push(`CITY_CONDITION:and CITY is null`);
        }else{
            list.push(`CITY_CONDITION:and CITY='${city}'`);
        }
        if(district == '全市'){
            list.push(`COUNTRY_CONDITION:`);
        }else if(district == '其他'){
            list.push(`COUNTRY_CONDITION:and COUNTRY is null`);
        }else{
            list.push(`COUNTRY_CONDITION:and COUNTRY='${district}'`);
        }
        if(market == '全区'){
            list.push(`MKTCENTER_CONDITION:`);
        }else if(market == '其他'){
            list.push(`MKTCENTER_CONDITION:and MKTCENTER is null`);
        }else{
            list.push(`MKTCENTER_CONDITION:and MKTCENTER='${market}'`);
        }
        if(workOrderType != '全部'){
            list.push(`ALARM_NAME:AND LOCATE('${workOrderType}',ALARM_TYPE) > 0`);
        }

        list.push(`startTime:${urlStartDay}`);
        list.push(`endTime:${urlEndDay}`);

        var title = "告警ID,告警类型,地市名称,区县,营服中心,场景中心经度GPS,场景中心纬度GPS,场景标识,场景名称,场景GPS经纬度集合,告警等级,告警生成时间,是否恢复,告警恢复时间,工单单号,最近基站ID,小区ID,小区名称,弱覆盖区域栅格数,最近弱覆盖区域恢复栅格数,弱覆盖区域集合,弱覆盖区域数,弱覆盖区域百度经纬度集合,弱覆盖区域GPS经纬度集合,排名累计值,最近恢复判断日期,道路ID,覆盖长度,弱覆盖长度,最近弱覆盖路段长度";
        var fixObj={
            fixRow: 1,
            fixClnObj:{
                fixCln:5,
                tableId:"tableId2"
            }
        };
        var pageObj={pageSize:20,pageFlag:1};
        var tableObject={
            divId:"tableParentDiv",
            tableId:"tableId",
            tableHead:title,
            dataType:3,
            sql:list,
            sortFlag:0,
            pageObj:pageObj,
            fixObj:fixObj
        };
        // IntelligentRoadTestChart.vm.tableObj = tableObject;
        // IntelligentRoadTestChart.vm.table = new TableToolsNewTwo();
        //
        // IntelligentRoadTestChart.vm.table.submit(tableObject);
        // $(".pbt").hide();

        // resolve(list);
        function successCallback(data) {
            resolve(data);
        }

        IntelligentRoadTestChart.vm.tableObj.sql = list;
        var progressBarSqls = [];
        var functionlist = [successCallback];
        progressBarSqls.push(list);
        progressbarTwo.submitSql(progressBarSqls, functionlist, [3]);
    });
    return promise;
}
/**********************************
 * @funcname getWorkOrderCntTableData
 * @funcdesc 工单数量表格
 * @param day 结束日期
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-24 16:40
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.getWorkOrderCntTableData = function(day){
    IntelligentRoadTestChart.vm.isShowLoading = true;
    var city = IntelligentRoadTestChart.vm.cityFlag;
    var district = IntelligentRoadTestChart.vm.district;
    var market = IntelligentRoadTestChart.vm.market;
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    if(day != undefined){
        urlEndDay = day;
    }
    var ZLQY_FLAG = 0;
    var workOrderType = IntelligentRoadTestChart.vm.workOrderType;
    var promise = new Promise(function  (resolve,reject) {
        var list = ["StatisticsDL_AlarmCounTab_count"];
        if(city == '全省'){
            list.push(`CITY_CONDITION:`);
            list.push(`CITY:CITY`);
            list.push(`isWhere:全省`);
        }else if(city == '其他'){
            list.push(`CITY_CONDITION:and CITY is null`);
        }else{
            list.push(`CITY_CONDITION:and CITY='${city}'`);
        }
        if(district == '全市'){
            list.push(`COUNTRY_CONDITION:`);
        }else if(district == '其他'){
            list.push(`COUNTRY_CONDITION:and COUNTRY is null`);
        }else{
            list.push(`COUNTRY_CONDITION:and COUNTRY='${district}'`);
        }
        if(market == '全区'){
            list.push(`MKTCENTER_CONDITION:`);
        }else if(market == '其他'){
            list.push(`MKTCENTER_CONDITION:and MKTCENTER is null`);
        }else{
            list.push(`MKTCENTER_CONDITION:and MKTCENTER='${market}'`);
        }
        if(workOrderType != '全部'){
            list.push(`ALARM_NAME:AND LOCATE('${workOrderType}',ALARM_NAME) > 0`);
        }
        if(city != '全省' && city != '其他' && district == '全市'){
            list.push(`CITY:COUNTRY`);
            list.push(`isWhere:全市`);
        }else{
            list.push(`CITY:MKTCENTER`);
            list.push(`isWhere:全营服`);
        }
        list.push(`START_DAY:'${urlStartDay}'`);
        list.push(`END_DAY:'${urlEndDay}'`);

        // resolve(list);
        function successCallback(data) {
            resolve(data);
        }

        // IntelligentRoadTestChart.vm.tableObj.sql = list;
        var progressBarSqls = [];
        var functionlist = [successCallback];
        progressBarSqls.push(list);
        progressbarTwo.submitSql(progressBarSqls, functionlist, [3],[],null,null,null,false,['Alarms']);
    });
    return promise;
}
/**********************************
 * @funcname converToGPS
 * @funcdesc 百度坐标转gps坐标
 * @param data[arr] 需要转换的数据
 * @param isConverBack[boolean] 转成gps后是否需要转换成输入的格式
 * @return {datatype}
 * @author laijunbao
 * @create 2018-08-07-0007 16:04
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.converToGPS = function(data,isConverBack){
    var result = callBackChangeData(data);

    result.forEach(function (t) {
        var gpsResultArrs = [];
        if(t.latitude_mid_baidu != undefined){
            var latlog = GPSUtil.bd09_To_gps84(t.latitude_mid_baidu,t.longitude_mid_baidu);
            t.latitude_mid_baidu = latlog[0];
            t.longitude_mid_baidu = latlog[1];
        }
        if(t["longitude_min"] != undefined){
            var latlog = GPSUtil.bd09_To_gps84(t["latitude_min"],t["longitude_min"]);
            t["latitude_min"] = latlog[0];
            t["longitude_min"] = latlog[1];
        }
        if(t["latitude_mid"] != undefined){
            var latlog = GPSUtil.bd09_To_gps84(t["latitude_mid"],t["longitude_mid"]);
            t["latitude_mid"] = latlog[0];
            t["longitude_mid"] = latlog[1];
        }
        if(t["latitude_max"] != undefined){
            var latlog = GPSUtil.bd09_To_gps84(t["latitude_max"],t["longitude_max"]);
            t["latitude_max"] = latlog[0];
            t["longitude_max"] = latlog[1];
        }
        if(t["gis_line_gps"] != undefined){
            var arrTmp = t["gis_line_gps"].substring(16,t["gis_line_gps"].length-1).split(",");
            var strRec = "";
            arrTmp.forEach(function (val,index) {
                var lnglatArr = val.split(" ");
                var latlog = GPSUtil.bd09_To_gps84(lnglatArr[1],lnglatArr[0]).reverse();
                if(index == arrTmp.length -1){
                    strRec +=  latlog.join(" ")
                }else{
                    strRec +=  latlog.join(" ") + ","
                }
            })
            strRec = "MULTILINESTRING(" + strRec + ")";
            t["gis_line_gps"] = strRec;
        }
        if(t["gis_data"] != undefined){
            var gpsArrs = [];
            gpsArrs = t["gis_data"].split("@");
            if(gpsArrs.length>0){
                gpsArrs.forEach(function (gps) {
                    var gpsSplit = gps.split(",");
                    var tmp = GPSUtil.bd09_To_gps84(gpsSplit[1],gpsSplit[0]);
                    gpsResultArrs.push(tmp[1] + "," + tmp[0]);
                })
            }
            t["gis_data"] = gpsResultArrs.join("@");
        }

    })
    if(isConverBack ==  undefined){
        return reverseDataForCallBackDataUtil(result);
    }else{
        return result;
    }
}
/**********************************
 * @funcname tableDataProcess
 * @funcdesc 前端拿到数据后，渲染表格
 * @param data 数据
 * @param title 表头
 * @return {datatype}
 * @author laijunbao
 * @create 2018-05-21 14:15
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.tableDataProcess = function (data,title) {
    var objectType = IntelligentRoadTestChart.vm.statistical;
    // if(data.result.length > 0){
        var result = callBackChangeData(data);
        var TableDetailData = {};

        TableDetailData.columns = ["1", "2"];
        TableDetailData.result = [];
        console.time("循环处理表格数据时间：");
        result.forEach( function(t) {
            var dataArrs = [];
            for(o in t){
                dataArrs.push(t[o]);
            }
            TableDetailData.result.push(dataArrs);
        })
        console.timeEnd("循环处理时间时间：");

        if(TableDetailData.result.length == 0){
            TableDetailData.result = [[]];
        }

        if(objectType == '弱区'){
            title = "弱覆盖片区编号,地市名称,区县,营服中心,栅格最小经度,栅格最小纬度,栅格中心经度,栅格中心纬度,栅格最大经度," +
                "栅格最大纬度,区域归属,主服务小区集合,4G切3G总次数,4G切3G总次数在本地网内排名,4G总流量,本地网内4G流量排名," +
                "感知优良率按天平均值,本地网内感知优良率排名,4G用户数按天平均值,本地网内4G用户数排名,最终排名累计值," +
                "弱覆盖处理措施,弱覆盖最近基站名称,弱覆盖最近基站地址,基站ID,弱覆盖最近的小区ID,弱覆盖最近的小区的名称," +
                "弱覆盖最近的小区的状态,距离最近的TOP5的小区集合,弱覆盖区域的弱覆盖栅格数,曾发生退服告警总次数,曾发生退服告警小区数," +
                "未恢复退服告警小区数,弱覆盖区域的全部栅格数,弱覆盖区域的弱覆盖栅格数排名,弱覆盖区域的弱栅格的面积," +
                "弱覆盖区域的全部栅格的面积,场景类型,最近小区告警数,线路ID,线路名称,包含对象ID集合,4G切3G总次数区县排名," +
                "4G流量区县排名,感知优良率区县排名,4G用户数区县排名,弱覆盖栅格数区县排名,最终累计值地市排名,最终累计值区县排名,是否新增弱区标志,弱区日期";
        }else if(objectType == '工单'){
            title = "告警ID,告警类型,地市名称,区县,营服中心,场景中心经度GPS,场景中心纬度GPS,场景标识,场景名称,场景GPS经纬度集合,告警等级,告警生成时间,是否恢复,告警恢复时间,工单单号,最近基站ID,小区ID,小区名称,弱覆盖区域栅格数,最近弱覆盖区域恢复栅格数,弱覆盖区域集合,弱覆盖区域数,弱覆盖区域GPS经纬度集合,排名累计值,最近恢复判断日期,道路ID,覆盖长度,弱覆盖长度,最近弱覆盖路段长度";
        }
        else{
            title = "地市,区县,营服,对象ID,对象名称,AGPS-MR覆盖最优记录数,AGPS-MR覆盖最优RSRP均值,AGPS-MR覆盖最优95记录数,AGPS-MR覆盖最优95覆盖率,AGPS-MR覆盖最优100记录数,AGPS-MR覆盖最优100覆盖率,AGPS-MR覆盖最优105记录数,AGPS-MR覆盖最优105覆盖率,AGPS-MR覆盖最优110记录数,AGPS-MR覆盖最优110覆盖率,AGPS-MR覆盖最优115记录数,AGPS-MR覆盖最优115覆盖率,AGPS-MR覆盖最优弱栅格数,AGPS-MR覆盖最优总栅格数,AGPS-MR覆盖最优弱栅格占比,AGPS-MR规划最优记录数,AGPS-MR规划最优RSRP均值,AGPS-MR规划最优95记录数,AGPS-MR规划最优95覆盖率,AGPS-MR规划最优100记录数,AGPS-MR规划最优100覆盖率,AGPS-MR规划最优105记录数,AGPS-MR规划最优105覆盖率,AGPS-MR规划最优110记录数,AGPS-MR规划最优110覆盖率,AGPS-MR规划最优115记录数,AGPS-MR规划最优115覆盖率,AGPS-MR规划最优弱栅格数,AGPS-MR规划最优总栅格数,AGPS-MR规划最优弱栅格占比,AGPS-MR主接入记录数,AGPS-MR主接入RSRP均值,AGPS-MR主接入95记录数,AGPS-MR主接入95覆盖率,AGPS-MR主接入100记录数,AGPS-MR主接入100覆盖率,AGPS-MR主接入105记录数,AGPS-MR主接入105覆盖率,AGPS-MR主接入110记录数,AGPS-MR主接入110覆盖率,AGPS-MR主接入115记录数,AGPS-MR主接入115覆盖率,AGPS-MR主接入弱栅格数,AGPS-MR主接入总栅格数,AGPS-MR主接入弱栅格占比,AGPS-MR频段800M-记录数,AGPS-MR频段800M-RSRP均值,AGPS-MR频段800M-95记录数,AGPS-MR频段800M-95覆盖率,AGPS-MR频段800M-100记录数,AGPS-MR频段800M-100覆盖率,AGPS-MR频段800M-105记录数,AGPS-MR频段800M-105覆盖率,AGPS-MR频段800M-110记录数,AGPS-MR频段800M-110覆盖率,AGPS-MR频段800M-115记录数,AGPS-MR频段800M-115覆盖率,AGPS-MR频段800M-弱栅格数,AGPS-MR频段800M-总栅格数,AGPS-MR频段800M-弱栅格占比,AGPS-MR频段1.8G-记录数,AGPS-MR频段1.8G-RSRP均值,AGPS-MR频段1.8G-95记录数,AGPS-MR频段1.8G-95覆盖率,AGPS-MR频段1.8G-100记录数,AGPS-MR频段1.8G-100覆盖率,AGPS-MR频段1.8G-105记录数,AGPS-MR频段1.8G-105覆盖率,AGPS-MR频段1.8G-110记录数,AGPS-MR频段1.8G-110覆盖率,AGPS-MR频段1.8G-115记录数,AGPS-MR频段1.8G-115覆盖率,AGPS-MR频段1.8G-弱栅格数,AGPS-MR频段1.8G-总栅格数,AGPS-MR频段1.8G-弱栅格占比,AGPS-MR频段2.1G-记录数,AGPS-MR频段2.1G-RSRP均值,AGPS-MR频段2.1G-95记录数,AGPS-MR频段2.1G-95覆盖率,AGPS-MR频段2.1G-100记录数,AGPS-MR频段2.1G-100覆盖率,AGPS-MR频段2.1G-105记录数,AGPS-MR频段2.1G-105覆盖率,AGPS-MR频段2.1G-110记录数,AGPS-MR频段2.1G-110覆盖率,AGPS-MR频段2.1G-115记录数,AGPS-MR频段2.1G-115覆盖率,AGPS-MR频段2.1G-弱栅格数,AGPS-MR频段2.1G-总栅格数,AGPS-MR频段2.1G-弱栅格占比,AGPS-MR频段2.6G-记录数,AGPS-MR频段2.6G-RSRP均值,AGPS-MR频段2.6G-95记录数,AGPS-MR频段2.6G-95覆盖率,AGPS-MR频段2.6G-100记录数,AGPS-MR频段2.6G-100覆盖率,AGPS-MR频段2.6G-105记录数,AGPS-MR频段2.6G-105覆盖率,AGPS-MR频段2.6G-110记录数,AGPS-MR频段2.6G-110覆盖率,AGPS-MR频段2.6G-115记录数,AGPS-MR频段2.6G-115覆盖率,AGPS-MR频段2.6G-弱栅格数,AGPS-MR频段2.6G-总栅格数,AGPS-MR频段2.6G-弱栅格占比,全量MR覆盖最优记录数,全量MR覆盖最优RSRP均值,全量MR覆盖最优95记录数,全量MR覆盖最优95覆盖率,全量MR覆盖最优100记录数,全量MR覆盖最优100覆盖率,全量MR覆盖最优105记录数,全量MR覆盖最优105覆盖率,全量MR覆盖最优110记录数,全量MR覆盖最优110覆盖率,全量MR覆盖最优115记录数,全量MR覆盖最优115覆盖率,全量MR覆盖最优弱栅格数,全量MR覆盖最优总栅格数,全量MR覆盖最优弱栅格占比,全量MR规划最优记录数,全量MR规划最优RSRP均值,全量MR规划最优95记录数,全量MR规划最优95覆盖率,全量MR规划最优100记录数,全量MR规划最优100覆盖率,全量MR规划最优105记录数,全量MR规划最优105覆盖率,全量MR规划最优110记录数,全量MR规划最优110覆盖率,全量MR规划最优115记录数,全量MR规划最优115覆盖率,全量MR规划最优弱栅格数,全量MR规划最优总栅格数,全量MR规划最优弱栅格占比,全量MR主接入记录数,全量MR主接入RSRP均值,全量MR主接入95记录数,全量MR主接入95覆盖率,全量MR主接入100记录数,全量MR主接入100覆盖率,全量MR主接入105记录数,全量MR主接入105覆盖率,全量MR主接入110记录数,全量MR主接入110覆盖率,全量MR主接入115记录数,全量MR主接入115覆盖率,全量MR主接入弱栅格数,全量MR主接入总栅格数,全量MR主接入弱栅格占比,全量MR频段800M-记录数,全量MR频段800M-RSRP均值,全量MR频段800M-95记录数,全量MR频段800M-95覆盖率,全量MR频段800M-100记录数,全量MR频段800M-100覆盖率,全量MR频段800M-105记录数,全量MR频段800M-105覆盖率,全量MR频段800M-110记录数,全量MR频段800M-110覆盖率,全量MR频段800M-115记录数,全量MR频段800M-115覆盖率,全量MR频段800M-弱栅格数,全量MR频段800M-总栅格数,全量MR频段800M-弱栅格占比,全量MR频段1.8G-记录数,全量MR频段1.8G-RSRP均值,全量MR频段1.8G-95记录数,全量MR频段1.8G-95覆盖率,全量MR频段1.8G-100记录数,全量MR频段1.8G-100覆盖率,全量MR频段1.8G-105记录数,全量MR频段1.8G-105覆盖率,全量MR频段1.8G-110记录数,全量MR频段1.8G-110覆盖率,全量MR频段1.8G-115记录数,全量MR频段1.8G-115覆盖率,全量MR频段1.8G-弱栅格数,全量MR频段1.8G-总栅格数,全量MR频段1.8G-弱栅格占比,全量MR频段2.1G-记录数,全量MR频段2.1G-RSRP均值,全量MR频段2.1G-95记录数,全量MR频段2.1G-95覆盖率,全量MR频段2.1G-100记录数,全量MR频段2.1G-100覆盖率,全量MR频段2.1G-105记录数,全量MR频段2.1G-105覆盖率,全量MR频段2.1G-110记录数,全量MR频段2.1G-110覆盖率,全量MR频段2.1G-115记录数,全量MR频段2.1G-115覆盖率,全量MR频段2.1G-弱栅格数,全量MR频段2.1G-总栅格数,全量MR频段2.1G-弱栅格占比,全量MR频段2.6G-记录数,全量MR频段2.6G-RSRP均值,全量MR频段2.6G-95记录数,全量MR频段2.6G-95覆盖率,全量MR频段2.6G-100记录数,全量MR频段2.6G-100覆盖率,全量MR频段2.6G-105记录数,全量MR频段2.6G-105覆盖率,全量MR频段2.6G-110记录数,全量MR频段2.6G-110覆盖率,全量MR频段2.6G-115记录数,全量MR频段2.6G-115覆盖率,全量MR频段2.6G-弱栅格数,全量MR频段2.6G-总栅格数,全量MR频段2.6G-弱栅格占比";
        }

        TableDetailData.columns = title.split(',');
        var fixObj={
            fixRow: 1,
            fixClnObj:{
                fixCln:4,
                tableId:"tableId2"
            }
        };
        var tableObj = {
            divId: 'tableParentDiv',
            tableId: "tableId",
            tableHead: title,
            pageObj: {pageFlag: 1, pageSize: 20},
            frontFlag: 1,
            Data:TableDetailData,
            // clnObj: clnObj
            fixObj: fixObj
        };

    IntelligentRoadTestChart.vm.tableObj = tableObj;
    IntelligentRoadTestChart.vm.table = new TableToolsNewTwo();
    IntelligentRoadTestChart.vm.table.submit(tableObj);
    IntelligentRoadTestChart.vm.isShowLoading = false;
    IntelligentRoadTestChart.hideLoading();
    // }else{
    //
    // }
}
/**********************************
 * @funcname workOrderCnttableDataProcess
 * @funcdesc 前端拿到数据后，渲染表格（工单表格）
 * @param data 数据
 * @param title 表头
 * @return {datatype}
 * @author laijunbao
 * @create 2018-05-21 14:15
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.workOrderCnttableDataProcess = function (data,title) {
    var objectType = IntelligentRoadTestChart.vm.statistical;
    // if(data.result.length > 0){
    var result = callBackChangeData(data);
    var TableDetailData = {};

    TableDetailData.columns = ["1", "2"];
    TableDetailData.result = [];
    console.time("循环处理表格数据时间：");
    result.forEach( function(t) {
        var dataArrs = [];
        for(o in t){
            dataArrs.push(t[o]);
        }
        TableDetailData.result.push(dataArrs);
    })
    console.timeEnd("循环处理时间时间：");

    if(TableDetailData.result.length == 0){
        TableDetailData.result = [[]];
    }

    if(objectType == '弱区'){
        title = "弱覆盖片区编号,地市名称,区县,营服中心,栅格最小经度,栅格最小纬度,栅格中心经度,栅格中心纬度,栅格最大经度," +
            "栅格最大纬度,区域归属,主服务小区集合,4G切3G总次数,4G切3G总次数在本地网内排名,4G总流量,本地网内4G流量排名," +
            "感知优良率按天平均值,本地网内感知优良率排名,4G用户数按天平均值,本地网内4G用户数排名,最终排名累计值," +
            "弱覆盖处理措施,弱覆盖最近基站名称,弱覆盖最近基站地址,基站ID,弱覆盖最近的小区ID,弱覆盖最近的小区的名称," +
            "弱覆盖最近的小区的状态,距离最近的TOP5的小区集合,弱覆盖区域的弱覆盖栅格数,曾发生退服告警总次数,曾发生退服告警小区数," +
            "未恢复退服告警小区数,弱覆盖区域的全部栅格数,弱覆盖区域的弱覆盖栅格数排名,弱覆盖区域的弱栅格的面积," +
            "弱覆盖区域的全部栅格的面积,场景类型,最近小区告警数,线路ID,线路名称,包含对象ID集合,4G切3G总次数区县排名," +
            "4G流量区县排名,感知优良率区县排名,4G用户数区县排名,弱覆盖栅格数区县排名,最终累计值地市排名,最终累计值区县排名,是否新增弱区标志,弱区日期";
    }else if(objectType == '工单'){
        title = "区域,工单数,累计恢复量,工单数,累计恢复量,工单数,累计恢复量,工单数,累计恢复量,工单数,累计恢复量,工单数,累计恢复量,工单数,累计恢复量," +
            "工单数,累计恢复量,工单数,累计恢复量,工单数,累计恢复量,总派单量,总恢复量,总恢复比";
    }
    else{
        title = "地市,区县,营服,对象ID,对象名称,AGPS-MR覆盖最优记录数,AGPS-MR覆盖最优RSRP均值,AGPS-MR覆盖最优95记录数,AGPS-MR覆盖最优95覆盖率,AGPS-MR覆盖最优100记录数,AGPS-MR覆盖最优100覆盖率,AGPS-MR覆盖最优105记录数,AGPS-MR覆盖最优105覆盖率,AGPS-MR覆盖最优110记录数,AGPS-MR覆盖最优110覆盖率,AGPS-MR覆盖最优115记录数,AGPS-MR覆盖最优115覆盖率,AGPS-MR覆盖最优弱栅格数,AGPS-MR覆盖最优总栅格数,AGPS-MR覆盖最优弱栅格占比,AGPS-MR规划最优记录数,AGPS-MR规划最优RSRP均值,AGPS-MR规划最优95记录数,AGPS-MR规划最优95覆盖率,AGPS-MR规划最优100记录数,AGPS-MR规划最优100覆盖率,AGPS-MR规划最优105记录数,AGPS-MR规划最优105覆盖率,AGPS-MR规划最优110记录数,AGPS-MR规划最优110覆盖率,AGPS-MR规划最优115记录数,AGPS-MR规划最优115覆盖率,AGPS-MR规划最优弱栅格数,AGPS-MR规划最优总栅格数,AGPS-MR规划最优弱栅格占比,AGPS-MR主接入记录数,AGPS-MR主接入RSRP均值,AGPS-MR主接入95记录数,AGPS-MR主接入95覆盖率,AGPS-MR主接入100记录数,AGPS-MR主接入100覆盖率,AGPS-MR主接入105记录数,AGPS-MR主接入105覆盖率,AGPS-MR主接入110记录数,AGPS-MR主接入110覆盖率,AGPS-MR主接入115记录数,AGPS-MR主接入115覆盖率,AGPS-MR主接入弱栅格数,AGPS-MR主接入总栅格数,AGPS-MR主接入弱栅格占比,AGPS-MR频段800M-记录数,AGPS-MR频段800M-RSRP均值,AGPS-MR频段800M-95记录数,AGPS-MR频段800M-95覆盖率,AGPS-MR频段800M-100记录数,AGPS-MR频段800M-100覆盖率,AGPS-MR频段800M-105记录数,AGPS-MR频段800M-105覆盖率,AGPS-MR频段800M-110记录数,AGPS-MR频段800M-110覆盖率,AGPS-MR频段800M-115记录数,AGPS-MR频段800M-115覆盖率,AGPS-MR频段800M-弱栅格数,AGPS-MR频段800M-总栅格数,AGPS-MR频段800M-弱栅格占比,AGPS-MR频段1.8G-记录数,AGPS-MR频段1.8G-RSRP均值,AGPS-MR频段1.8G-95记录数,AGPS-MR频段1.8G-95覆盖率,AGPS-MR频段1.8G-100记录数,AGPS-MR频段1.8G-100覆盖率,AGPS-MR频段1.8G-105记录数,AGPS-MR频段1.8G-105覆盖率,AGPS-MR频段1.8G-110记录数,AGPS-MR频段1.8G-110覆盖率,AGPS-MR频段1.8G-115记录数,AGPS-MR频段1.8G-115覆盖率,AGPS-MR频段1.8G-弱栅格数,AGPS-MR频段1.8G-总栅格数,AGPS-MR频段1.8G-弱栅格占比,AGPS-MR频段2.1G-记录数,AGPS-MR频段2.1G-RSRP均值,AGPS-MR频段2.1G-95记录数,AGPS-MR频段2.1G-95覆盖率,AGPS-MR频段2.1G-100记录数,AGPS-MR频段2.1G-100覆盖率,AGPS-MR频段2.1G-105记录数,AGPS-MR频段2.1G-105覆盖率,AGPS-MR频段2.1G-110记录数,AGPS-MR频段2.1G-110覆盖率,AGPS-MR频段2.1G-115记录数,AGPS-MR频段2.1G-115覆盖率,AGPS-MR频段2.1G-弱栅格数,AGPS-MR频段2.1G-总栅格数,AGPS-MR频段2.1G-弱栅格占比,AGPS-MR频段2.6G-记录数,AGPS-MR频段2.6G-RSRP均值,AGPS-MR频段2.6G-95记录数,AGPS-MR频段2.6G-95覆盖率,AGPS-MR频段2.6G-100记录数,AGPS-MR频段2.6G-100覆盖率,AGPS-MR频段2.6G-105记录数,AGPS-MR频段2.6G-105覆盖率,AGPS-MR频段2.6G-110记录数,AGPS-MR频段2.6G-110覆盖率,AGPS-MR频段2.6G-115记录数,AGPS-MR频段2.6G-115覆盖率,AGPS-MR频段2.6G-弱栅格数,AGPS-MR频段2.6G-总栅格数,AGPS-MR频段2.6G-弱栅格占比,全量MR覆盖最优记录数,全量MR覆盖最优RSRP均值,全量MR覆盖最优95记录数,全量MR覆盖最优95覆盖率,全量MR覆盖最优100记录数,全量MR覆盖最优100覆盖率,全量MR覆盖最优105记录数,全量MR覆盖最优105覆盖率,全量MR覆盖最优110记录数,全量MR覆盖最优110覆盖率,全量MR覆盖最优115记录数,全量MR覆盖最优115覆盖率,全量MR覆盖最优弱栅格数,全量MR覆盖最优总栅格数,全量MR覆盖最优弱栅格占比,全量MR规划最优记录数,全量MR规划最优RSRP均值,全量MR规划最优95记录数,全量MR规划最优95覆盖率,全量MR规划最优100记录数,全量MR规划最优100覆盖率,全量MR规划最优105记录数,全量MR规划最优105覆盖率,全量MR规划最优110记录数,全量MR规划最优110覆盖率,全量MR规划最优115记录数,全量MR规划最优115覆盖率,全量MR规划最优弱栅格数,全量MR规划最优总栅格数,全量MR规划最优弱栅格占比,全量MR主接入记录数,全量MR主接入RSRP均值,全量MR主接入95记录数,全量MR主接入95覆盖率,全量MR主接入100记录数,全量MR主接入100覆盖率,全量MR主接入105记录数,全量MR主接入105覆盖率,全量MR主接入110记录数,全量MR主接入110覆盖率,全量MR主接入115记录数,全量MR主接入115覆盖率,全量MR主接入弱栅格数,全量MR主接入总栅格数,全量MR主接入弱栅格占比,全量MR频段800M-记录数,全量MR频段800M-RSRP均值,全量MR频段800M-95记录数,全量MR频段800M-95覆盖率,全量MR频段800M-100记录数,全量MR频段800M-100覆盖率,全量MR频段800M-105记录数,全量MR频段800M-105覆盖率,全量MR频段800M-110记录数,全量MR频段800M-110覆盖率,全量MR频段800M-115记录数,全量MR频段800M-115覆盖率,全量MR频段800M-弱栅格数,全量MR频段800M-总栅格数,全量MR频段800M-弱栅格占比,全量MR频段1.8G-记录数,全量MR频段1.8G-RSRP均值,全量MR频段1.8G-95记录数,全量MR频段1.8G-95覆盖率,全量MR频段1.8G-100记录数,全量MR频段1.8G-100覆盖率,全量MR频段1.8G-105记录数,全量MR频段1.8G-105覆盖率,全量MR频段1.8G-110记录数,全量MR频段1.8G-110覆盖率,全量MR频段1.8G-115记录数,全量MR频段1.8G-115覆盖率,全量MR频段1.8G-弱栅格数,全量MR频段1.8G-总栅格数,全量MR频段1.8G-弱栅格占比,全量MR频段2.1G-记录数,全量MR频段2.1G-RSRP均值,全量MR频段2.1G-95记录数,全量MR频段2.1G-95覆盖率,全量MR频段2.1G-100记录数,全量MR频段2.1G-100覆盖率,全量MR频段2.1G-105记录数,全量MR频段2.1G-105覆盖率,全量MR频段2.1G-110记录数,全量MR频段2.1G-110覆盖率,全量MR频段2.1G-115记录数,全量MR频段2.1G-115覆盖率,全量MR频段2.1G-弱栅格数,全量MR频段2.1G-总栅格数,全量MR频段2.1G-弱栅格占比,全量MR频段2.6G-记录数,全量MR频段2.6G-RSRP均值,全量MR频段2.6G-95记录数,全量MR频段2.6G-95覆盖率,全量MR频段2.6G-100记录数,全量MR频段2.6G-100覆盖率,全量MR频段2.6G-105记录数,全量MR频段2.6G-105覆盖率,全量MR频段2.6G-110记录数,全量MR频段2.6G-110覆盖率,全量MR频段2.6G-115记录数,全量MR频段2.6G-115覆盖率,全量MR频段2.6G-弱栅格数,全量MR频段2.6G-总栅格数,全量MR频段2.6G-弱栅格占比";
    }

    TableDetailData.columns = title.split(',');
    var fixObj={
        fixRow: 2,
        // fixClnObj:{
        //     fixCln:5,
        //     tableId:"tableId222"
        // }
    };
    var tableObj = {
        divId: 'tableParentDiv2',
        tableId: "tableId22",
        tableHead: title,
        pageObj: {pageFlag: 1, pageSize: 20},
        frontFlag: 1,
        Data:TableDetailData,
        // clnObj: clnObj
        fixObj: fixObj
    };

    IntelligentRoadTestChart.vm.tableObj2 = tableObj;
    IntelligentRoadTestChart.vm.table2 = new TableToolsNewTwo();
    IntelligentRoadTestChart.vm.table2.submit(tableObj);
    IntelligentRoadTestChart.vm.isShowLoading = false;
    IntelligentRoadTestChart.hideLoading();

    var arr2 = $("#tableParentDiv2 tr");
    var tr = arr2[0];
    $(tr).before("<tr><th colspan='2'><div class='alltd'>区域</div></th>" +
        "<th colspan='2'><div class='alltd'>天翼蓝鹰场馆</div></th>" +
        "<th colspan='2'><div class='alltd'>翼蓝鹰高流量商务区</div></th>" +
        "<th colspan='2'><div class='alltd'>天翼蓝鹰高密度住宅区</div></th>" +
        "<th colspan='2'><div class='alltd'>天翼蓝鹰高速</div></th>" +
        "<th colspan='2'><div class='alltd'>天翼蓝鹰高校</div></th>" +
        "<th colspan='2'><div class='alltd'>天翼蓝鹰美景</div></th>" +
        "<th colspan='2'><div class='alltd'>天翼蓝鹰美食</div></th>" +
        "<th colspan='2'><div class='alltd'>天翼蓝鹰农贸市场</div></th>" +
        "<th colspan='2'><div class='alltd'>天翼蓝鹰战狼区域</div></th>" +
        "<th colspan='2'><div class='alltd'>天翼蓝鹰中小学</div></th>" +
        "<th colspan='3'><div class='alltd'>总计</div></th>" +
        "</tr>");
    // }else{
    //
    // }
}
/**********************************
 * @funcname tableExport
 * @funcdesc 表格数据导出
 * @param tableObj tableObj
 * @param str 统计对象
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-25 12:30
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.tableExport = function(tableObj,str) {
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var city = IntelligentRoadTestChart.vm.cityQuerystr;
    var district = IntelligentRoadTestChart.vm.districtQuerystr;
    var market = IntelligentRoadTestChart.vm.marketQuerystr;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay2;
    var bestOrsc = IntelligentRoadTestChart.vm.bestOrsc;
    var threshold = IntelligentRoadTestChart.vm.thresholdVal;
    var title = tableObj.thead.split(',');
    if(objectType != '工单' && objectType != '弱区' && objectType != '扇区' && objectType != '全区域'
        && objectType != '高铁' && objectType != '地铁'){
        title.push('gps经纬度集合');
    }
    var para = [];
    for(var i=1;i<tableObj.sql.length;i++){
        para.push(tableObj.sql[i]);
    }
    var name = city + district + market + urlEndDay + objectType;
    if(city == '全省'){
        name = '全省' + urlEndDay + objectType;
    }else if(city != '全省' && district == '全市' && market == '全区'){
        name = city + urlEndDay + objectType;
    }else if(city != '全省' && district != '全市' && market == '全区'){
        name = city + district + urlEndDay + objectType;
    }else if(city != '全省' && district != '全市' && market != '全区'){
        name = city + district + market + urlEndDay + objectType;
    }
    if(str != undefined){
        name += '_' + str + "统计表";
    }else{
        name += "统计表";
    }

    var obj = {
        fileName: name,
        dataType: 3,
        paraLists: [
            {
                sheetName: name,
                titleName: title,
                mergeTitle: [],
                templateId: tableObj.sql[0],
                templatePara: para
            }
        ]
    };

    if($.inArray(objectType,['弱区','上行低速区','下行低速区','MOD3干扰区','越区覆盖区','重叠覆盖区']) > -1 ||
        (objectType == "地铁" && str == "TA段")){
        IntelligentRoadTestChart.showLoading();
        var list1 = [tableObj.sql[0]];
        list1 = list1.concat(para);
        var progressBarSqls = [];
        progressBarSqls.push(list1);
        function callback(data) {
            if(data.result.length > 0){
                var dataArr = [];
                data = tableDataProcessForVueComponent.converToGPS(data,1);
                data.forEach(function (d) {
                    var arr = [];
                    for(k in d){
                        arr.push(d[k]);
                    }
                    dataArr.push(arr);
                })
                var obj = {
                    fileName: name,
                    dataType: 3,
                    paraLists: [
                        {
                            sheetName: name,
                            titleName: title,
                            mergeTitle: [],
                            tableData:dataArr
                        }
                    ]
                };
                tableDataProcessForVueComponent.tableExportByData(name,name,title,dataArr);
                IntelligentRoadTestChart.hideLoading();
            }
        }
        var functionlist = [callback];
        var database = [3];
        progressbarTwo.submitSql(progressBarSqls, functionlist,database);

    }else{
        var exportExcel = new exportExcelNew(obj);
        exportExcel.submit();
    }

}
/**********************************
 * @funcname workOrderTableExport
 * @funcdesc 工单表单导出
 * @param fileName 文件名
 * @param sheetName sheetName
 * @param tableObj tableObj
 * @return {datatype}
 * @author laijunbao
 * @create 2018-05-04 13:18
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.workOrderTableExport = function(fileName,sheetName,tableObj){
    var city = IntelligentRoadTestChart.vm.cityFlag;
    var district = IntelligentRoadTestChart.vm.district;
    var market = IntelligentRoadTestChart.vm.market;
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    var ZLQY_FLAG = 0;
    var workOrderType = IntelligentRoadTestChart.vm.workOrderType;
    var list = [];
    if(city == '全省'){
        list.push(`CITY_CONDITION:`);
    }else if(city == '其他'){
        list.push(`CITY_CONDITION:and CITY is null`);
    }else{
        list.push(`CITY_CONDITION:and CITY='${city}'`);
    }
    if(district == '全市'){
        list.push(`COUNTRY_CONDITION:`);
    }else if(district == '其他'){
        list.push(`COUNTRY_CONDITION:and COUNTRY is null`);
    }else{
        list.push(`COUNTRY_CONDITION:and COUNTRY='${district}'`);
    }
    if(market == '全区'){
        list.push(`MKTCENTER_CONDITION:`);
    }else if(market == '其他'){
        list.push(`MKTCENTER_CONDITION:and MKTCENTER is null`);
    }else{
        list.push(`MKTCENTER_CONDITION:and MKTCENTER='${market}'`);
    }
    if(workOrderType != '全部'){
        list.push(`ALARM_NAME:AND LOCATE('${workOrderType}',ALARM_TYPE) > 0`);
    }

    list.push(`startTime:${urlStartDay}`);
    list.push(`endTime:${urlEndDay}`);
    var name = city + district + market + urlEndDay + objectType  + '详细';
    if(city == '全省'){
        name = '全省' + urlEndDay + objectType + '详细';
    }else if(city != '全省' && district == '全市' && market == '全区'){
        name = city + urlEndDay + objectType  + '详细';
    }else if(city != '全省' && district != '全市' && market == '全区'){
        name = city + district + urlEndDay + objectType  + '详细';
    }else if(city != '全省' && district != '全市' && market != '全区'){
        name = city + district + market + urlEndDay + objectType  + '详细';
    }
    var obj={
        fileName:name,
        dataType:3,
        paraLists:[
            {
                sheetName:name,
                titleName:"告警ID,告警类型,地市名称,区县,营服中心,场景中心经度GPS,场景中心纬度GPS,场景标识,场景名称,场景GPS经纬度集合,告警等级,告警生成时间,是否恢复,告警恢复时间,工单单号,最近基站ID,小区ID,小区名称,弱覆盖区域栅格数,最近弱覆盖区域恢复栅格数,弱覆盖区域集合,弱覆盖区域数,弱覆盖区域GPS经纬度集合,排名累计值,最近恢复判断日期,道路ID,覆盖长度,弱覆盖长度,最近弱覆盖路段长度".split(","),
                mergeTitle:[],
                templateId: 'StatisticsDL_AlarmCounTab_detail',
                templatePara: list,
            }
        ],
    };
    var exportExcel=new exportExcelNew(obj);
    exportExcel.submit();
}

/**********************************
 * @funcname tableExportByData
 * @funcdesc 表格导出（前端导出）
 * @param fileName 文件名
 * @param sheetName sheetName
 * @param titleName 表头
 * @param data 表格数据
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-25 12:30
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.tableExportByData = function(fileName,sheetName,titleName,data) {
    data.splice(0,0,titleName);
    fileName += ".xlsx";
    var wopts = { bookType:'xlsx', type:'binary' };
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    const wbout = XLSX.write(wb, wopts);
    saveAs(new Blob([s2ab(wbout)]), fileName); // 保存为文件
}
function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (var i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    };
    return buf;
}

/**********************************
 * @funcname tableTitleStr
 * @funcdesc 表格标题区域信息
 * @param city 地市
 * @param district 区县
 * @param market 营服
 * @return {datatype}
 * @author laijunbao
 * @create 2018-05-14 16:26
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.tableTitleStr = function (city,district,market) {
    if(city == undefined){
        city = IntelligentRoadTestChart.vm.cityFlag;
    }
    if(district == undefined){
        district = IntelligentRoadTestChart.vm.district;
    }
    if(market == undefined){
        market = IntelligentRoadTestChart.vm.market;
    }
    var statistical = IntelligentRoadTestChart.vm.statistical;

    if(city != '全省' && city != '其他') {
        if (district != '全市' && district != '其他') {
            if(market != '全区' && market != '其他'){
                IntelligentRoadTestChart.vm.cityStr = city + district + market;
            }else if(market == '其他'){
                IntelligentRoadTestChart.vm.cityStr = city + district + market;
            }else{
                IntelligentRoadTestChart.vm.cityStr = city + district;
            }
        } else if(district == '其他'){
            IntelligentRoadTestChart.vm.cityStr = city + district;
        }else{
            IntelligentRoadTestChart.vm.cityStr = city;
        }
    }else{
        IntelligentRoadTestChart.vm.cityStr = city;
    }

    if(statistical == '扇区'){
        if(city == '全省'){
            IntelligentRoadTestChart.vm.sectorExportIsShow = false;
        }else{
            IntelligentRoadTestChart.vm.sectorExportIsShow = true;
        }
    }

}
tableDataProcessForVueComponent.recentSectorInfo = function tableDataProcessForVueComponent_recentSectorInfo(recentSectorStr){
//	console.log(topSectorStr);
    //基站号,小区号,距离，数量,平均RSRP
    var topSectorArr = recentSectorStr.split("@");
    var info = "";
    for(var i=0;i<topSectorArr.length;i++){
        var sect = topSectorArr[i].split(",");
        info += "基站号:"+sect[0]+",小区号:"+sect[1]+
            ",距离:"+sect[2]+",数量:"+sect[3]+",平均RSRP:"+sect[4];
        if(i<topSectorArr.length-1){
            info += "\n";
        }
    }
    if(topSectorArr.length>1){
        return info;
    }else{
        return recentSectorStr;
    }

}

tableDataProcessForVueComponent.TOPSectorInfo = function tableDataProcessForVueComponent_TOPSectorInfo(mrtopSectorStr) {
//	console.log(topSectorStr);
    //基站号,小区号,数量,平均RSRP,按数量排序序号
    var topSectorArr = mrtopSectorStr.split("@");
    var info = "";
    for (var i = 0; i < topSectorArr.length; i++) {
        var sect = topSectorArr[i].split(",");
        info += "基站id:" + sect[0] + ",小区id:" + sect[1] +
            ",数量:" + sect[2] + ",平均RSRP:" + sect[3] + ",数量排序序号:" + sect[4];
        if (i < topSectorArr.length - 1) {
            info += "\n";
        }
    }
    if (topSectorArr.length > 1) {
        return info;
    } else {
        return mrtopSectorStr;
    }
}
tableDataProcessForVueComponent.TopCellSet = function tableDataProcessForVueComponent_TopCellSet(TopCellSetInfo) {
    var topSectorArr = TopCellSetInfo.split("@");
    var info = "";
    var tmp = "";
    for (var i = 0; i < topSectorArr.length; i++) {
        if(topSectorArr[i].indexOf(";") > -1){
            tmp = topSectorArr[i].split(";");
            for (var j = 0; j < tmp.length; j++) {
                info += tmp[j]+"\n";
            }
        }else{
            info += topSectorArr[i]+"\n";
        }
    }
    if (topSectorArr.length > 1) {
        return info;
    } else {
        return mrtopSectorStr;
    }
}
