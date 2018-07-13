var tableDataProcessForVueComponent = {};

/**********************************
 * @funcname loadTable
 * @funcdesc 加载表格
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-25 23:14
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.loadTable = function(day,city,district,market){
    IntelligentRoadTestChart.showLoading();
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    if(objectType == '工单'){
        tableDataProcessForVueComponent.getWorkOrderTableData(day)
            .then( function(data) {
            tableDataProcessForVueComponent.tableDataProcess(data);
        })
        tableDataProcessForVueComponent.getWorkOrderCntTableData(day).then( function(data) {
            tableDataProcessForVueComponent.workOrderCnttableDataProcess(data);
        })
    }else{
        tableDataProcessForVueComponent.getTableData(day,city,district,market).then(function(data) {
            tableDataProcessForVueComponent.loadTableBySql(data);
        })
        if(objectType == '扇区'){
            IntelligentRoadTestChart.showLoading();
            tableDataProcessForVueComponent.getCellMKTableData(day,city,district,market).then(function(data) {
                tableDataProcessForVueComponent.loadCellTableBySql(data);
            })
            tableDataProcessForVueComponent.getCellMKTableDataCount(day,city,district,market).then(function (data) {
                var result = callBackChangeData(data);
                if(result.length == 0){
                    IntelligentRoadTestChart.vm.tableInfo2 = '总条数:0';
                }else{
                    IntelligentRoadTestChart.vm.tableInfo2 = '总条数:'+result[0].count;
                }
                IntelligentRoadTestChart.hideLoading();
            })

            if(dateCycle == '日'){
                IntelligentRoadTestChart.vm.tabOptionsSector = ['营服','扇区','勘误'];
                tableDataProcessForVueComponent.getKanWuTableData(day,city,district,market).then(function(data) {
                    tableDataProcessForVueComponent.loadKanWuTableBySql(data);
                })
                tableDataProcessForVueComponent.getKanWuTableDataCount(day,city,district,market).then(function (data) {
                    var result = callBackChangeData(data);
                    if(result.length == 0){
                        IntelligentRoadTestChart.vm.tableInfo3 = '总条数:0';
                    }else{
                        IntelligentRoadTestChart.vm.tableInfo3 = '总条数:'+result[0].count;
                    }
                    IntelligentRoadTestChart.hideLoading();
                })
            }else{
                IntelligentRoadTestChart.vm.tabOptionsSector = ['营服','扇区'];
            }
        }

        if(objectType != '工单'){
            IntelligentRoadTestChart.showLoading();
            tableDataProcessForVueComponent.getTableDataCount(day,city,district,market).then(function (data) {
                var result = callBackChangeData(data);
                // IntelligentRoadTestChart.vm.tableCount = result[0].count;
                if(result.length == 0){
                    IntelligentRoadTestChart.vm.tableInfo = '总条数:0';
                }else{
                    IntelligentRoadTestChart.vm.tableInfo = '总条数:'+result[0].count;
                }
                IntelligentRoadTestChart.hideLoading();
            })
        }

    }
    tableDataProcessForVueComponent.tableTitleStr(city,district,market);
}
/**********************************
 * @funcname getTableData
 * @funcdesc 获取查表格数据的sql
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-18 09:42
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.getTableData = function (day,city,district,market) {
    // var list = tableDataProcessForVueComponent.getSql(day);
    // return list;
    var promise = new Promise(function  (resolve,reject) {
        var list = tableDataProcessForVueComponent.getSql(day,city,district,market);
        resolve(list);
    });
    return promise;
}
tableDataProcessForVueComponent.getCellMKTableData = function (day,city,district,market) {
    var promise = new Promise(function  (resolve,reject) {
        var list = tableDataProcessForVueComponent.getgetCellMKTableSql(day,city,district,market);
        resolve(list);
    });
    return promise;
}
tableDataProcessForVueComponent.getKanWuTableData = function (day,city,district,market) {
    var promise = new Promise(function  (resolve,reject) {
        var list = tableDataProcessForVueComponent.getKanWuMKTableSql(day,city,district,market);
        resolve(list);
    });
    return promise;
}
/**********************************
 * @funcname getSql
 * @funcdesc 拼接表格sql
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-25 23:14
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.getSql = function(day,city,district,market){
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

    if($.inArray(objectType,['弱区','上行低速区','下行低速区']) > -1){
        list.push('StatisticsDL_PoorGridCountTab');
        list.push(`TABLE:d`);
        if(objectType == '弱区'){
            list.push(`TYPE:0`);
        }else if(objectType == '上行低速区'){
            list.push(`TYPE:4`);
        }else if(objectType == '下行低速区'){
            list.push(`TYPE:5`);
        }
    }else if(objectType == '扇区'){
        list.push('StatisticsDL_MRSatCellTab_cell');
    }else if(objectType == '全区域'){
        list.push('StatisticsDL_MRSatAllAreaTab');
    }else if(objectType == '关注区域'){
        list.push('StatisticsDL_MRSatSenceTab_2');
    }else if(objectType == '骨头区域'){
        list.push('StatisticsDL_MRSatSenceTab_3');
    }
    else{
        list.push('StatisticsDL_MRSatSenceTab_1');
        if(objectType == '战狼区域'){
            list.push(`ZLQY_CONDITION:AND ZLQY_FLAG = 1`);
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '高流量商务区'`);
        }else{
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '${objectType}'`);
        }
    }
    if(objectType != '弱区'){
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
tableDataProcessForVueComponent.getgetCellMKTableSql = function(day,city,district,market){
    if(city == undefined){
        city = IntelligentRoadTestChart.vm.cityFlag;
    }
    if(district == undefined){
        district = IntelligentRoadTestChart.vm.district;
    }
    if(market == undefined){
        market = IntelligentRoadTestChart.vm.market;
    }
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;

    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    if(day != undefined){
        urlEndDay = day;
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

    if(objectType == '弱区'){
        list.push('StatisticsDL_PoorGridCountTab');
        list.push(`TABLE:d`);
    }else if(objectType == '扇区'){
        list.push('StatisticsDL_MRSatCellTab_mkt');
    }else if(objectType == '全区域'){
        list.push('StatisticsDL_MRSatAllAreaTab');
    }else if(objectType == '关注区域'){
        list.push('StatisticsDL_MRSatSenceTab_2');
    }else if(objectType == '骨头区域'){
        list.push('StatisticsDL_MRSatSenceTab_3');
    }
    else{
        list.push('StatisticsDL_MRSatSenceTab_1');
        if(objectType == '战狼区域'){
            list.push(`ZLQY_CONDITION:AND ZLQY_FLAG = 1`);
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '高流量商务区'`);
        }else{
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '${objectType}'`);
        }
    }
    if(objectType != '弱区'){
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
    list.push(`endTime:${urlEndDay}`);

    return list;
}
tableDataProcessForVueComponent.getKanWuMKTableSql = function(day,city,district,market){
    if(city == undefined){
        city = IntelligentRoadTestChart.vm.cityFlag;
    }
    if(district == undefined){
        district = IntelligentRoadTestChart.vm.district;
    }
    if(market == undefined){
        market = IntelligentRoadTestChart.vm.market;
    }
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;

    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    if(day != undefined){
        urlEndDay = day;
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

    list.push('StatisticsDL_MRSatCellTab_mkt_gdkw');
    list.push(`TABLE:${table}`);
    list.push(`COVERAGE_TYPE:${bestOrsc}`);
    list.push(`THRESHOLD:${threshold}`);
    if(table != 'm'){
        list.push(`T_PARTITION_VAR:day`);
    }else{
        list.push(`T_PARTITION_VAR:month`);
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
    list.push(`endTime:${urlEndDay}`);

    return list;
}
/**********************************
 * @funcname getTableDataCount
 * @funcdesc 表格数据总数
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-05-02 12:28
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.getTableDataCount = function (day,city,district,market) {
    var promise = new Promise(function  (resolve,reject) {
        var list = tableDataProcessForVueComponent.getSqlCount(day,city,district,market);
        function successCallback(data) {
            resolve(data);
        }
        var progressBarSqls = [];
        var functionlist = [successCallback];
        progressBarSqls.push(list);
        progressbarTwo.submitSql(progressBarSqls, functionlist, [3]);
    })
    return promise;

}
tableDataProcessForVueComponent.getCellMKTableDataCount = function (day,city,district,market) {
    var promise = new Promise(function  (resolve,reject) {
        var list = tableDataProcessForVueComponent.getCellMKSqlCount(day,city,district,market);
        function successCallback(data) {
            resolve(data);
        }
        var progressBarSqls = [];
        var functionlist = [successCallback];
        progressBarSqls.push(list);
        progressbarTwo.submitSql(progressBarSqls, functionlist, [3]);
    })
    return promise;

}
tableDataProcessForVueComponent.getKanWuTableDataCount = function (day,city,district,market) {
    var promise = new Promise(function  (resolve,reject) {
        var list = tableDataProcessForVueComponent.getKanWuSqlCount(day,city,district,market);
        function successCallback(data) {
            resolve(data);
        }
        var progressBarSqls = [];
        var functionlist = [successCallback];
        progressBarSqls.push(list);
        progressbarTwo.submitSql(progressBarSqls, functionlist, [3]);
    })
    return promise;

}
/**********************************
 * @funcname getSqlCount
 * @funcdesc 获取表格数据总数
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-05-02 12:25
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.getSqlCount = function(day,city,district,market){
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
        list.push('StatisticsDL_04_MRSatTab4Cell_count');
    }else if($.inArray(objectType,['弱区','上行低速区','下行低速区']) > -1){
        list.push('IntelligentRoadTestAnalysisV3_166_PoorTable_count');
        if(objectType == '弱区'){
            list.push(`TYPE:0`);
        }else if(objectType == '上行低速区'){
            list.push(`TYPE:4`);
        }else if(objectType == '下行低速区'){
            list.push(`TYPE:5`);
        }
    }else if(objectType == '全区域'){
        list.push('StatisticsDL_06_MRSatAllAreaTab_count');
    }
    else if(objectType == '关注区域'){
        list.push('StatisticsDL__concern_area_table_count');
    }else if(objectType == '骨头区域'){
        list.push('StatisticsDL__poor_area_table_count');
    }
    else{
        // list.push('StatisticsDL_02_MRSatTab_count_2');
        list.push('StatisticsDL_02_MRSatTab_count');
        if(objectType == '战狼区域'){
            list.push(`ZLQY_CONDITION:AND ZLQY_FLAG = 1`);
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '高流量商务区'`);
        }else{
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '${objectType}'`);
        }
    }
    if(objectType != '弱区' || objectType != '工单'){
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
tableDataProcessForVueComponent.getCellMKSqlCount = function(day,city,district,market){
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
        list.push('StatisticsDL_MRSatCellTab_mkt_cnt');
    }else if(objectType == '弱区'){
        list.push('IntelligentRoadTestAnalysisV3_166_PoorTable_count');
    }else if(objectType == '全区域'){
        list.push('StatisticsDL_06_MRSatAllAreaTab_count');
    }
    // else if(objectType == '关注区域'){
    //     list.push('StatisticsDL__concern_area_table_count');
    // }else if(objectType == '骨头区域'){
    //     list.push('StatisticsDL__poor_area_table_count');
    // }
    else{
        // list.push('StatisticsDL_02_MRSatTab_count_2');
        list.push('StatisticsDL_02_MRSatTab_count');
        if(objectType == '战狼区域'){
            list.push(`ZLQY_CONDITION:AND ZLQY_FLAG = 1`);
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '高流量商务区'`);
        }else{
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '${objectType}'`);
        }
    }
    if(objectType != '弱区' || objectType != '工单'){
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
    list.push(`endTime:${urlEndDay}`);


    return list;
}
tableDataProcessForVueComponent.getKanWuSqlCount = function(day,city,district,market){
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

    list.push('StatisticsDL_MRSatCellTab_mkt_gdkw_cnt');

    list.push(`TABLE:${table}`);
    list.push(`COVERAGE_TYPE:${bestOrsc}`);
    list.push(`THRESHOLD:${threshold}`);
    if(table != 'm'){
        list.push(`T_PARTITION_VAR:day`);
    }else{
        list.push(`T_PARTITION_VAR:month`);
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
    list.push(`endTime:${urlEndDay}`);


    return list;
}
/**********************************
 * @funcname getWeakAreaTableData
 * @funcdesc 弱区表格
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-23 10:18
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.getWeakAreaTableData = function () {
    IntelligentRoadTestChart.vm.isShowLoading = true;
    var city = IntelligentRoadTestChart.vm.cityFlag;
    var district = IntelligentRoadTestChart.vm.district;
    var market = IntelligentRoadTestChart.vm.market;
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    urlStartDay = new Date(urlStartDay).format('yyyyMMdd');
    urlEndDay = new Date(urlEndDay).format('yyyyMMdd');
    var ZLQY_FLAG = 0;
    var promise = new Promise(function  (resolve,reject) {

        var list = ["IntelligentRoadTestAnalysisV3_166_PoorTable"];

        var table = '';
        table = 'd';
        list.push(`TABLE:${table}`);

        if(city != '全省'){
            list.push(`CITY_CONDITION:and CITY='${city}'`);
        }

        if(district != '全市'){
            list.push(`COUNTRY_CONDITION:and COUNTRY='${district}'`);
        }

        if(market != '全区'){
            list.push(`MKTCENTER_CONDITION:and MKTCENTER='${market}'`);
        }

        // urlEndDay = urlEndDay.substring(0, 4) + "-" + urlEndDay.substring(4, 6) + "-" + urlEndDay.substring(6, 8);
        list.push(`startTime:${urlStartDay}`);
        list.push(`endTime:${urlEndDay}`);
        resolve(list);

        // function successCallback(data) {
        //     resolve(data);
        // }
        //
        // var progressBarSqls = [];
        // var functionlist = [successCallback];
        // progressBarSqls.push(list);
        // progressbarTwo.submitSql(progressBarSqls, functionlist, [3]);
    });
    return promise;
}
/**********************************
 * @funcname getWorkOrderTableData
 * @funcdesc 工单表格
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
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
 * @funcname loadTableBySql
 * @funcdesc 通过sql查询显示表格数据
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-25 10:20
 * @modifier
 * @modify
 ***********************************/
tableDataProcessForVueComponent.loadTableBySql = function (data) {
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var title = '';
    if($.inArray(objectType,['弱区','上行低速区','下行低速区']) > -1){
        if(objectType == '上行低速区'){
            title = "上行低速区日期,上行低速区片区编号,地市名称,区县,营服中心,上行低速区中心经度GPS,上行低速区中心纬度GPS," +
                "区域归属,主服务小区集合,4G切3G总次数,4G切3G总次数在本地网内排名,4G总流量,本地网内4G流量排名," +
                "感知优良率按天平均值,本地网内感知优良率排名,4G用户数按天平均值,本地网内4G用户数排名,最终排名累计值," +
                "上行低速区处理措施,上行低速区最近基站名称,上行低速区最近基站地址,基站ID,上行低速区最近的小区ID,上行低速区最近的小区的名称," +
                "上行低速区最近的小区的状态,距离最近的TOP5的小区集合,上行低速区域的上行低速区栅格数,曾发生退服告警总次数,曾发生退服告警小区数," +
                "未恢复退服告警小区数,上行低速区域的全部栅格数,上行低速区域的上行低速区栅格数排名,上行低速区域的栅格的面积," +
                "上行低速区域的全部栅格的面积,场景类型,最近小区告警数,线路ID,线路名称,包含对象ID集合,4G切3G总次数区县排名," +
                "4G流量区县排名,感知优良率区县排名,4G用户数区县排名,上行低速区栅格数区县排名,最终累计值地市排名,最终累计值区县排名,是否新增低速率区标志,GIS经纬度集合GPS";
        }else if(objectType == '下行低速区'){
            title = "下行低速区日期,下行低速区片区编号,地市名称,区县,营服中心,下行低速区中心经度GPS,下行低速区中心纬度GPS," +
                "区域归属,主服务小区集合,4G切3G总次数,4G切3G总次数在本地网内排名,4G总流量,本地网内4G流量排名," +
                "感知优良率按天平均值,本地网内感知优良率排名,4G用户数按天平均值,本地网内4G用户数排名,最终排名累计值," +
                "下行低速区处理措施,下行低速区最近基站名称,下行低速区最近基站地址,基站ID,下行低速区最近的小区ID,下行低速区最近的小区的名称," +
                "下行低速区最近的小区的状态,距离最近的TOP5的小区集合,下行低速区域的下行低速区栅格数,曾发生退服告警总次数,曾发生退服告警小区数," +
                "未恢复退服告警小区数,下行低速区域的全部栅格数,下行低速区域的下行低速区栅格数排名,下行低速区域的栅格的面积," +
                "下行低速区域的全部栅格的面积,场景类型,最近小区告警数,线路ID,线路名称,包含对象ID集合,4G切3G总次数区县排名," +
                "4G流量区县排名,感知优良率区县排名,4G用户数区县排名,下行低速区栅格数区县排名,最终累计值地市排名,最终累计值区县排名,是否新增低速率区标志,GIS经纬度集合GPS";
        }else{
            title = "弱区日期,弱覆盖片区编号,地市名称,区县,营服中心,弱区中心经度GPS,弱区中心纬度GPS," +
                "区域归属,主服务小区集合,4G切3G总次数,4G切3G总次数在本地网内排名,4G总流量,本地网内4G流量排名," +
                "感知优良率按天平均值,本地网内感知优良率排名,4G用户数按天平均值,本地网内4G用户数排名,最终排名累计值," +
                "弱覆盖处理措施,弱覆盖最近基站名称,弱覆盖最近基站地址,基站ID,弱覆盖最近的小区ID,弱覆盖最近的小区的名称," +
                "弱覆盖最近的小区的状态,距离最近的TOP5的小区集合,弱覆盖区域的弱覆盖栅格数,曾发生退服告警总次数,曾发生退服告警小区数," +
                "未恢复退服告警小区数,弱覆盖区域的全部栅格数,弱覆盖区域的弱覆盖栅格数排名,弱覆盖区域的弱栅格的面积," +
                "弱覆盖区域的全部栅格的面积,场景类型,最近小区告警数,线路ID,线路名称,包含对象ID集合,4G切3G总次数区县排名," +
                "4G流量区县排名,感知优良率区县排名,4G用户数区县排名,弱覆盖栅格数区县排名,最终累计值地市排名,最终累计值区县排名,是否新增弱区标志,GIS经纬度集合GPS";
        }

    }else if(objectType == '全区域'){
        title = "地市,区县,营服,AGPS-MR覆盖最优记录数,AGPS-MR覆盖最优RSRP均值,AGPS-MR覆盖最优95记录数,AGPS-MR覆盖最优95覆盖率,AGPS-MR覆盖最优100记录数,AGPS-MR覆盖最优100覆盖率,AGPS-MR覆盖最优105记录数,AGPS-MR覆盖最优105覆盖率,AGPS-MR覆盖最优110记录数,AGPS-MR覆盖最优110覆盖率,AGPS-MR覆盖最优115记录数,AGPS-MR覆盖最优115覆盖率,AGPS-MR覆盖最优弱栅格数,AGPS-MR覆盖最优总栅格数,AGPS-MR覆盖最优弱栅格占比,AGPS-MR主接入记录数,AGPS-MR主接入RSRP均值,AGPS-MR主接入95记录数,AGPS-MR主接入95覆盖率,AGPS-MR主接入100记录数,AGPS-MR主接入100覆盖率,AGPS-MR主接入105记录数,AGPS-MR主接入105覆盖率,AGPS-MR主接入110记录数,AGPS-MR主接入110覆盖率,AGPS-MR主接入115记录数,AGPS-MR主接入115覆盖率,AGPS-MR主接入弱栅格数,AGPS-MR主接入总栅格数,AGPS-MR主接入弱栅格占比,AGPS-MR频段800M-记录数,AGPS-MR频段800M-RSRP均值,AGPS-MR频段800M-95记录数,AGPS-MR频段800M-95覆盖率,AGPS-MR频段800M-100记录数,AGPS-MR频段800M-100覆盖率,AGPS-MR频段800M-105记录数,AGPS-MR频段800M-105覆盖率,AGPS-MR频段800M-110记录数,AGPS-MR频段800M-110覆盖率,AGPS-MR频段800M-115记录数,AGPS-MR频段800M-115覆盖率,AGPS-MR频段800M-弱栅格数,AGPS-MR频段800M-总栅格数,AGPS-MR频段800M-弱栅格占比,AGPS-MR频段1.8G-记录数,AGPS-MR频段1.8G-RSRP均值,AGPS-MR频段1.8G-95记录数,AGPS-MR频段1.8G-95覆盖率,AGPS-MR频段1.8G-100记录数,AGPS-MR频段1.8G-100覆盖率,AGPS-MR频段1.8G-105记录数,AGPS-MR频段1.8G-105覆盖率,AGPS-MR频段1.8G-110记录数,AGPS-MR频段1.8G-110覆盖率,AGPS-MR频段1.8G-115记录数,AGPS-MR频段1.8G-115覆盖率,AGPS-MR频段1.8G-弱栅格数,AGPS-MR频段1.8G-总栅格数,AGPS-MR频段1.8G-弱栅格占比,AGPS-MR频段2.1G-记录数,AGPS-MR频段2.1G-RSRP均值,AGPS-MR频段2.1G-95记录数,AGPS-MR频段2.1G-95覆盖率,AGPS-MR频段2.1G-100记录数,AGPS-MR频段2.1G-100覆盖率,AGPS-MR频段2.1G-105记录数,AGPS-MR频段2.1G-105覆盖率,AGPS-MR频段2.1G-110记录数,AGPS-MR频段2.1G-110覆盖率,AGPS-MR频段2.1G-115记录数,AGPS-MR频段2.1G-115覆盖率,AGPS-MR频段2.1G-弱栅格数,AGPS-MR频段2.1G-总栅格数,AGPS-MR频段2.1G-弱栅格占比,AGPS-MR频段2.6G-记录数,AGPS-MR频段2.6G-RSRP均值,AGPS-MR频段2.6G-95记录数,AGPS-MR频段2.6G-95覆盖率,AGPS-MR频段2.6G-100记录数,AGPS-MR频段2.6G-100覆盖率,AGPS-MR频段2.6G-105记录数,AGPS-MR频段2.6G-105覆盖率,AGPS-MR频段2.6G-110记录数,AGPS-MR频段2.6G-110覆盖率,AGPS-MR频段2.6G-115记录数,AGPS-MR频段2.6G-115覆盖率,AGPS-MR频段2.6G-弱栅格数,AGPS-MR频段2.6G-总栅格数,AGPS-MR频段2.6G-弱栅格占比,全量MR覆盖最优记录数,全量MR覆盖最优RSRP均值,全量MR覆盖最优95记录数,全量MR覆盖最优95覆盖率,全量MR覆盖最优100记录数,全量MR覆盖最优100覆盖率,全量MR覆盖最优105记录数,全量MR覆盖最优105覆盖率,全量MR覆盖最优110记录数,全量MR覆盖最优110覆盖率,全量MR覆盖最优115记录数,全量MR覆盖最优115覆盖率,全量MR覆盖最优弱栅格数,全量MR覆盖最优总栅格数,全量MR覆盖最优弱栅格占比,全量MR主接入记录数,全量MR主接入RSRP均值,全量MR主接入95记录数,全量MR主接入95覆盖率,全量MR主接入100记录数,全量MR主接入100覆盖率,全量MR主接入105记录数,全量MR主接入105覆盖率,全量MR主接入110记录数,全量MR主接入110覆盖率,全量MR主接入115记录数,全量MR主接入115覆盖率,全量MR主接入弱栅格数,全量MR主接入总栅格数,全量MR主接入弱栅格占比,全量MR频段800M-记录数,全量MR频段800M-RSRP均值,全量MR频段800M-95记录数,全量MR频段800M-95覆盖率,全量MR频段800M-100记录数,全量MR频段800M-100覆盖率,全量MR频段800M-105记录数,全量MR频段800M-105覆盖率,全量MR频段800M-110记录数,全量MR频段800M-110覆盖率,全量MR频段800M-115记录数,全量MR频段800M-115覆盖率,全量MR频段800M-弱栅格数,全量MR频段800M-总栅格数,全量MR频段800M-弱栅格占比,全量MR频段1.8G-记录数,全量MR频段1.8G-RSRP均值,全量MR频段1.8G-95记录数,全量MR频段1.8G-95覆盖率,全量MR频段1.8G-100记录数,全量MR频段1.8G-100覆盖率,全量MR频段1.8G-105记录数,全量MR频段1.8G-105覆盖率,全量MR频段1.8G-110记录数,全量MR频段1.8G-110覆盖率,全量MR频段1.8G-115记录数,全量MR频段1.8G-115覆盖率,全量MR频段1.8G-弱栅格数,全量MR频段1.8G-总栅格数,全量MR频段1.8G-弱栅格占比,全量MR频段2.1G-记录数,全量MR频段2.1G-RSRP均值,全量MR频段2.1G-95记录数,全量MR频段2.1G-95覆盖率,全量MR频段2.1G-100记录数,全量MR频段2.1G-100覆盖率,全量MR频段2.1G-105记录数,全量MR频段2.1G-105覆盖率,全量MR频段2.1G-110记录数,全量MR频段2.1G-110覆盖率,全量MR频段2.1G-115记录数,全量MR频段2.1G-115覆盖率,全量MR频段2.1G-弱栅格数,全量MR频段2.1G-总栅格数,全量MR频段2.1G-弱栅格占比,全量MR频段2.6G-记录数,全量MR频段2.6G-RSRP均值,全量MR频段2.6G-95记录数,全量MR频段2.6G-95覆盖率,全量MR频段2.6G-100记录数,全量MR频段2.6G-100覆盖率,全量MR频段2.6G-105记录数,全量MR频段2.6G-105覆盖率,全量MR频段2.6G-110记录数,全量MR频段2.6G-110覆盖率,全量MR频段2.6G-115记录数,全量MR频段2.6G-115覆盖率,全量MR频段2.6G-弱栅格数,全量MR频段2.6G-总栅格数,全量MR频段2.6G-弱栅格占比";
    }else if(objectType == '扇区'){
        title = "地市,区县,营服,基站id,小区id,小区名称,AGPS-MR覆盖最优记录数,AGPS-MR覆盖最优RSRP均值,AGPS-MR覆盖最优95记录数,AGPS-MR覆盖最优95覆盖率,AGPS-MR覆盖最优100记录数,AGPS-MR覆盖最优100覆盖率,AGPS-MR覆盖最优105记录数,AGPS-MR覆盖最优105覆盖率,AGPS-MR覆盖最优110记录数,AGPS-MR覆盖最优110覆盖率,AGPS-MR覆盖最优115记录数,AGPS-MR覆盖最优115覆盖率,AGPS-MR覆盖最优弱栅格数,AGPS-MR覆盖最优总栅格数,AGPS-MR覆盖最优弱栅格占比,AGPS-MR规划最优记录数,AGPS-MR规划最优RSRP均值,AGPS-MR规划最优95记录数,AGPS-MR规划最优95覆盖率,AGPS-MR规划最优100记录数,AGPS-MR规划最优100覆盖率,AGPS-MR规划最优105记录数,AGPS-MR规划最优105覆盖率,AGPS-MR规划最优110记录数,AGPS-MR规划最优110覆盖率,AGPS-MR规划最优115记录数,AGPS-MR规划最优115覆盖率,AGPS-MR规划最优弱栅格数,AGPS-MR规划最优总栅格数,AGPS-MR规划最优弱栅格占比,AGPS-MR主接入记录数,AGPS-MR主接入RSRP均值,AGPS-MR主接入95记录数,AGPS-MR主接入95覆盖率,AGPS-MR主接入100记录数,AGPS-MR主接入100覆盖率,AGPS-MR主接入105记录数,AGPS-MR主接入105覆盖率,AGPS-MR主接入110记录数,AGPS-MR主接入110覆盖率,AGPS-MR主接入115记录数,AGPS-MR主接入115覆盖率,AGPS-MR主接入弱栅格数,AGPS-MR主接入总栅格数,AGPS-MR主接入弱栅格占比,全量MR覆盖最优记录数,全量MR覆盖最优RSRP均值,全量MR覆盖最优95记录数,全量MR覆盖最优95覆盖率,全量MR覆盖最优100记录数,全量MR覆盖最优100覆盖率,全量MR覆盖最优105记录数,全量MR覆盖最优105覆盖率,全量MR覆盖最优110记录数,全量MR覆盖最优110覆盖率,全量MR覆盖最优115记录数,全量MR覆盖最优115覆盖率,全量MR覆盖最优弱栅格数,全量MR覆盖最优总栅格数,全量MR覆盖最优弱栅格占比,全量MR规划最优记录数,全量MR规划最优RSRP均值,全量MR规划最优95记录数,全量MR规划最优95覆盖率,全量MR规划最优100记录数,全量MR规划最优100覆盖率,全量MR规划最优105记录数,全量MR规划最优105覆盖率,全量MR规划最优110记录数,全量MR规划最优110覆盖率,全量MR规划最优115记录数,全量MR规划最优115覆盖率,全量MR规划最优弱栅格数,全量MR规划最优总栅格数,全量MR规划最优弱栅格占比,全量MR主接入记录数,全量MR主接入RSRP均值,全量MR主接入95记录数,全量MR主接入95覆盖率,全量MR主接入100记录数,全量MR主接入100覆盖率,全量MR主接入105记录数,全量MR主接入105覆盖率,全量MR主接入110记录数,全量MR主接入110覆盖率,全量MR主接入115记录数,全量MR主接入115覆盖率,全量MR主接入弱栅格数,全量MR主接入总栅格数,全量MR主接入弱栅格占比";
    }
    else{
        title = "地市,区县,营服,对象ID,对象名称,AGPS-MR覆盖最优记录数,AGPS-MR覆盖最优RSRP均值,AGPS-MR覆盖最优95记录数,AGPS-MR覆盖最优95覆盖率,AGPS-MR覆盖最优100记录数,AGPS-MR覆盖最优100覆盖率,AGPS-MR覆盖最优105记录数,AGPS-MR覆盖最优105覆盖率,AGPS-MR覆盖最优110记录数,AGPS-MR覆盖最优110覆盖率,AGPS-MR覆盖最优115记录数,AGPS-MR覆盖最优115覆盖率,AGPS-MR覆盖最优弱栅格数,AGPS-MR覆盖最优总栅格数,AGPS-MR覆盖最优弱栅格占比,AGPS-MR主接入记录数,AGPS-MR主接入RSRP均值,AGPS-MR主接入95记录数,AGPS-MR主接入95覆盖率,AGPS-MR主接入100记录数,AGPS-MR主接入100覆盖率,AGPS-MR主接入105记录数,AGPS-MR主接入105覆盖率,AGPS-MR主接入110记录数,AGPS-MR主接入110覆盖率,AGPS-MR主接入115记录数,AGPS-MR主接入115覆盖率,AGPS-MR主接入弱栅格数,AGPS-MR主接入总栅格数,AGPS-MR主接入弱栅格占比,AGPS-MR频段800M-记录数,AGPS-MR频段800M-RSRP均值,AGPS-MR频段800M-95记录数,AGPS-MR频段800M-95覆盖率,AGPS-MR频段800M-100记录数,AGPS-MR频段800M-100覆盖率,AGPS-MR频段800M-105记录数,AGPS-MR频段800M-105覆盖率,AGPS-MR频段800M-110记录数,AGPS-MR频段800M-110覆盖率,AGPS-MR频段800M-115记录数,AGPS-MR频段800M-115覆盖率,AGPS-MR频段800M-弱栅格数,AGPS-MR频段800M-总栅格数,AGPS-MR频段800M-弱栅格占比,AGPS-MR频段1.8G-记录数,AGPS-MR频段1.8G-RSRP均值,AGPS-MR频段1.8G-95记录数,AGPS-MR频段1.8G-95覆盖率,AGPS-MR频段1.8G-100记录数,AGPS-MR频段1.8G-100覆盖率,AGPS-MR频段1.8G-105记录数,AGPS-MR频段1.8G-105覆盖率,AGPS-MR频段1.8G-110记录数,AGPS-MR频段1.8G-110覆盖率,AGPS-MR频段1.8G-115记录数,AGPS-MR频段1.8G-115覆盖率,AGPS-MR频段1.8G-弱栅格数,AGPS-MR频段1.8G-总栅格数,AGPS-MR频段1.8G-弱栅格占比,AGPS-MR频段2.1G-记录数,AGPS-MR频段2.1G-RSRP均值,AGPS-MR频段2.1G-95记录数,AGPS-MR频段2.1G-95覆盖率,AGPS-MR频段2.1G-100记录数,AGPS-MR频段2.1G-100覆盖率,AGPS-MR频段2.1G-105记录数,AGPS-MR频段2.1G-105覆盖率,AGPS-MR频段2.1G-110记录数,AGPS-MR频段2.1G-110覆盖率,AGPS-MR频段2.1G-115记录数,AGPS-MR频段2.1G-115覆盖率,AGPS-MR频段2.1G-弱栅格数,AGPS-MR频段2.1G-总栅格数,AGPS-MR频段2.1G-弱栅格占比,AGPS-MR频段2.6G-记录数,AGPS-MR频段2.6G-RSRP均值,AGPS-MR频段2.6G-95记录数,AGPS-MR频段2.6G-95覆盖率,AGPS-MR频段2.6G-100记录数,AGPS-MR频段2.6G-100覆盖率,AGPS-MR频段2.6G-105记录数,AGPS-MR频段2.6G-105覆盖率,AGPS-MR频段2.6G-110记录数,AGPS-MR频段2.6G-110覆盖率,AGPS-MR频段2.6G-115记录数,AGPS-MR频段2.6G-115覆盖率,AGPS-MR频段2.6G-弱栅格数,AGPS-MR频段2.6G-总栅格数,AGPS-MR频段2.6G-弱栅格占比,全量MR覆盖最优记录数,全量MR覆盖最优RSRP均值,全量MR覆盖最优95记录数,全量MR覆盖最优95覆盖率,全量MR覆盖最优100记录数,全量MR覆盖最优100覆盖率,全量MR覆盖最优105记录数,全量MR覆盖最优105覆盖率,全量MR覆盖最优110记录数,全量MR覆盖最优110覆盖率,全量MR覆盖最优115记录数,全量MR覆盖最优115覆盖率,全量MR覆盖最优弱栅格数,全量MR覆盖最优总栅格数,全量MR覆盖最优弱栅格占比,全量MR主接入记录数,全量MR主接入RSRP均值,全量MR主接入95记录数,全量MR主接入95覆盖率,全量MR主接入100记录数,全量MR主接入100覆盖率,全量MR主接入105记录数,全量MR主接入105覆盖率,全量MR主接入110记录数,全量MR主接入110覆盖率,全量MR主接入115记录数,全量MR主接入115覆盖率,全量MR主接入弱栅格数,全量MR主接入总栅格数,全量MR主接入弱栅格占比,全量MR频段800M-记录数,全量MR频段800M-RSRP均值,全量MR频段800M-95记录数,全量MR频段800M-95覆盖率,全量MR频段800M-100记录数,全量MR频段800M-100覆盖率,全量MR频段800M-105记录数,全量MR频段800M-105覆盖率,全量MR频段800M-110记录数,全量MR频段800M-110覆盖率,全量MR频段800M-115记录数,全量MR频段800M-115覆盖率,全量MR频段800M-弱栅格数,全量MR频段800M-总栅格数,全量MR频段800M-弱栅格占比,全量MR频段1.8G-记录数,全量MR频段1.8G-RSRP均值,全量MR频段1.8G-95记录数,全量MR频段1.8G-95覆盖率,全量MR频段1.8G-100记录数,全量MR频段1.8G-100覆盖率,全量MR频段1.8G-105记录数,全量MR频段1.8G-105覆盖率,全量MR频段1.8G-110记录数,全量MR频段1.8G-110覆盖率,全量MR频段1.8G-115记录数,全量MR频段1.8G-115覆盖率,全量MR频段1.8G-弱栅格数,全量MR频段1.8G-总栅格数,全量MR频段1.8G-弱栅格占比,全量MR频段2.1G-记录数,全量MR频段2.1G-RSRP均值,全量MR频段2.1G-95记录数,全量MR频段2.1G-95覆盖率,全量MR频段2.1G-100记录数,全量MR频段2.1G-100覆盖率,全量MR频段2.1G-105记录数,全量MR频段2.1G-105覆盖率,全量MR频段2.1G-110记录数,全量MR频段2.1G-110覆盖率,全量MR频段2.1G-115记录数,全量MR频段2.1G-115覆盖率,全量MR频段2.1G-弱栅格数,全量MR频段2.1G-总栅格数,全量MR频段2.1G-弱栅格占比,全量MR频段2.6G-记录数,全量MR频段2.6G-RSRP均值,全量MR频段2.6G-95记录数,全量MR频段2.6G-95覆盖率,全量MR频段2.6G-100记录数,全量MR频段2.6G-100覆盖率,全量MR频段2.6G-105记录数,全量MR频段2.6G-105覆盖率,全量MR频段2.6G-110记录数,全量MR频段2.6G-110覆盖率,全量MR频段2.6G-115记录数,全量MR频段2.6G-115覆盖率,全量MR频段2.6G-弱栅格数,全量MR频段2.6G-总栅格数,全量MR频段2.6G-弱栅格占比";
    }

    var fixObj={
        fixRow: 1,
        fixClnObj:{
            fixCln:5,
            tableId:"tableId2"
        }
    };
    var pageObj={pageSize:20,pageFlag:1};
    var clnObj={
        subArray:[
            {clnNum:9,value:0,title:tableDataProcessForVueComponent.TOPSectorInfo},
            {clnNum:26,value:0,title:tableDataProcessForVueComponent.recentSectorInfo}
        ]
    };
    //表格对象
    var tableObject = null;
    if($.inArray(objectType,['弱区','上行低速区','下行低速区']) > -1){
        tableObject={
            divId:"tableParentDiv",
            tableId:"tableId",
            tableHead:title,
            dataType:3,
            clnObj:clnObj,
            sql:data,
            sortFlag:0,
            pageObj:pageObj,
            fixObj:fixObj,
            callBackTranFn: tableDataProcessForVueComponent.tranFn

        };
    }else{
        tableObject={
            divId:"tableParentDiv",
            tableId:"tableId",
            tableHead:title,
            dataType:3,
            sql:data,
            sortFlag:0,
            pageObj:pageObj,
            fixObj:fixObj
        };
    }

    IntelligentRoadTestChart.vm.tableObj = tableObject;
    IntelligentRoadTestChart.vm.table = new TableToolsNewTwo();

    IntelligentRoadTestChart.vm.table.submit(tableObject);
    $(".pbt").hide();

}

tableDataProcessForVueComponent.tranFn = function(data){
    var result = callBackChangeData(data);
    result.forEach(function (t) {
        var latlog = GPSUtil.bd09_To_gps84(t.latitude_mid_baidu,t.longitude_mid_baidu);
        t.latitude_mid_baidu = latlog[0];
        t.longitude_mid_baidu = latlog[1];
    })

    return reverseDataForCallBackDataUtil(result);
}
tableDataProcessForVueComponent.tranFn2 = function(data){
    var result = callBackChangeData(data);
    result.forEach(function (t) {
        var latlog = GPSUtil.bd09_To_gps84(t.latitude_mid_baidu,t.longitude_mid_baidu);
        t.latitude_mid_baidu = latlog[0];
        t.longitude_mid_baidu = latlog[1];
    })

    return result;
}

tableDataProcessForVueComponent.loadCellTableBySql = function (data) {
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var title = '';
    if(objectType == '弱区'){
        title = "弱区日期,弱覆盖片区编号,地市名称,区县,营服中心,栅格最小经度,栅格最小纬度,栅格中心经度,栅格中心纬度,栅格最大经度," +
            "栅格最大纬度,区域归属,主服务小区集合,4G切3G总次数,4G切3G总次数在本地网内排名,4G总流量,本地网内4G流量排名," +
            "感知优良率按天平均值,本地网内感知优良率排名,4G用户数按天平均值,本地网内4G用户数排名,最终排名累计值," +
            "弱覆盖处理措施,弱覆盖最近基站名称,弱覆盖最近基站地址,基站ID,弱覆盖最近的小区ID,弱覆盖最近的小区的名称," +
            "弱覆盖最近的小区的状态,距离最近的TOP5的小区集合,弱覆盖区域的弱覆盖栅格数,曾发生退服告警总次数,曾发生退服告警小区数," +
            "未恢复退服告警小区数,弱覆盖区域的全部栅格数,弱覆盖区域的弱覆盖栅格数排名,弱覆盖区域的弱栅格的面积," +
            "弱覆盖区域的全部栅格的面积,场景类型,最近小区告警数,线路ID,线路名称,包含对象ID集合,4G切3G总次数区县排名," +
            "4G流量区县排名,感知优良率区县排名,4G用户数区县排名,弱覆盖栅格数区县排名,最终累计值地市排名,最终累计值区县排名,是否新增弱区标志";
    }else if(objectType == '全区域'){
        title = "地市,区县,营服,AGPS-MR覆盖最优记录数,AGPS-MR覆盖最优RSRP均值,AGPS-MR覆盖最优95记录数,AGPS-MR覆盖最优95覆盖率,AGPS-MR覆盖最优100记录数,AGPS-MR覆盖最优100覆盖率,AGPS-MR覆盖最优105记录数,AGPS-MR覆盖最优105覆盖率,AGPS-MR覆盖最优110记录数,AGPS-MR覆盖最优110覆盖率,AGPS-MR覆盖最优115记录数,AGPS-MR覆盖最优115覆盖率,AGPS-MR覆盖最优弱栅格数,AGPS-MR覆盖最优总栅格数,AGPS-MR覆盖最优弱栅格占比,AGPS-MR主接入记录数,AGPS-MR主接入RSRP均值,AGPS-MR主接入95记录数,AGPS-MR主接入95覆盖率,AGPS-MR主接入100记录数,AGPS-MR主接入100覆盖率,AGPS-MR主接入105记录数,AGPS-MR主接入105覆盖率,AGPS-MR主接入110记录数,AGPS-MR主接入110覆盖率,AGPS-MR主接入115记录数,AGPS-MR主接入115覆盖率,AGPS-MR主接入弱栅格数,AGPS-MR主接入总栅格数,AGPS-MR主接入弱栅格占比,AGPS-MR频段800M-记录数,AGPS-MR频段800M-RSRP均值,AGPS-MR频段800M-95记录数,AGPS-MR频段800M-95覆盖率,AGPS-MR频段800M-100记录数,AGPS-MR频段800M-100覆盖率,AGPS-MR频段800M-105记录数,AGPS-MR频段800M-105覆盖率,AGPS-MR频段800M-110记录数,AGPS-MR频段800M-110覆盖率,AGPS-MR频段800M-115记录数,AGPS-MR频段800M-115覆盖率,AGPS-MR频段800M-弱栅格数,AGPS-MR频段800M-总栅格数,AGPS-MR频段800M-弱栅格占比,AGPS-MR频段1.8G-记录数,AGPS-MR频段1.8G-RSRP均值,AGPS-MR频段1.8G-95记录数,AGPS-MR频段1.8G-95覆盖率,AGPS-MR频段1.8G-100记录数,AGPS-MR频段1.8G-100覆盖率,AGPS-MR频段1.8G-105记录数,AGPS-MR频段1.8G-105覆盖率,AGPS-MR频段1.8G-110记录数,AGPS-MR频段1.8G-110覆盖率,AGPS-MR频段1.8G-115记录数,AGPS-MR频段1.8G-115覆盖率,AGPS-MR频段1.8G-弱栅格数,AGPS-MR频段1.8G-总栅格数,AGPS-MR频段1.8G-弱栅格占比,AGPS-MR频段2.1G-记录数,AGPS-MR频段2.1G-RSRP均值,AGPS-MR频段2.1G-95记录数,AGPS-MR频段2.1G-95覆盖率,AGPS-MR频段2.1G-100记录数,AGPS-MR频段2.1G-100覆盖率,AGPS-MR频段2.1G-105记录数,AGPS-MR频段2.1G-105覆盖率,AGPS-MR频段2.1G-110记录数,AGPS-MR频段2.1G-110覆盖率,AGPS-MR频段2.1G-115记录数,AGPS-MR频段2.1G-115覆盖率,AGPS-MR频段2.1G-弱栅格数,AGPS-MR频段2.1G-总栅格数,AGPS-MR频段2.1G-弱栅格占比,AGPS-MR频段2.6G-记录数,AGPS-MR频段2.6G-RSRP均值,AGPS-MR频段2.6G-95记录数,AGPS-MR频段2.6G-95覆盖率,AGPS-MR频段2.6G-100记录数,AGPS-MR频段2.6G-100覆盖率,AGPS-MR频段2.6G-105记录数,AGPS-MR频段2.6G-105覆盖率,AGPS-MR频段2.6G-110记录数,AGPS-MR频段2.6G-110覆盖率,AGPS-MR频段2.6G-115记录数,AGPS-MR频段2.6G-115覆盖率,AGPS-MR频段2.6G-弱栅格数,AGPS-MR频段2.6G-总栅格数,AGPS-MR频段2.6G-弱栅格占比,全量MR覆盖最优记录数,全量MR覆盖最优RSRP均值,全量MR覆盖最优95记录数,全量MR覆盖最优95覆盖率,全量MR覆盖最优100记录数,全量MR覆盖最优100覆盖率,全量MR覆盖最优105记录数,全量MR覆盖最优105覆盖率,全量MR覆盖最优110记录数,全量MR覆盖最优110覆盖率,全量MR覆盖最优115记录数,全量MR覆盖最优115覆盖率,全量MR覆盖最优弱栅格数,全量MR覆盖最优总栅格数,全量MR覆盖最优弱栅格占比,全量MR主接入记录数,全量MR主接入RSRP均值,全量MR主接入95记录数,全量MR主接入95覆盖率,全量MR主接入100记录数,全量MR主接入100覆盖率,全量MR主接入105记录数,全量MR主接入105覆盖率,全量MR主接入110记录数,全量MR主接入110覆盖率,全量MR主接入115记录数,全量MR主接入115覆盖率,全量MR主接入弱栅格数,全量MR主接入总栅格数,全量MR主接入弱栅格占比,全量MR频段800M-记录数,全量MR频段800M-RSRP均值,全量MR频段800M-95记录数,全量MR频段800M-95覆盖率,全量MR频段800M-100记录数,全量MR频段800M-100覆盖率,全量MR频段800M-105记录数,全量MR频段800M-105覆盖率,全量MR频段800M-110记录数,全量MR频段800M-110覆盖率,全量MR频段800M-115记录数,全量MR频段800M-115覆盖率,全量MR频段800M-弱栅格数,全量MR频段800M-总栅格数,全量MR频段800M-弱栅格占比,全量MR频段1.8G-记录数,全量MR频段1.8G-RSRP均值,全量MR频段1.8G-95记录数,全量MR频段1.8G-95覆盖率,全量MR频段1.8G-100记录数,全量MR频段1.8G-100覆盖率,全量MR频段1.8G-105记录数,全量MR频段1.8G-105覆盖率,全量MR频段1.8G-110记录数,全量MR频段1.8G-110覆盖率,全量MR频段1.8G-115记录数,全量MR频段1.8G-115覆盖率,全量MR频段1.8G-弱栅格数,全量MR频段1.8G-总栅格数,全量MR频段1.8G-弱栅格占比,全量MR频段2.1G-记录数,全量MR频段2.1G-RSRP均值,全量MR频段2.1G-95记录数,全量MR频段2.1G-95覆盖率,全量MR频段2.1G-100记录数,全量MR频段2.1G-100覆盖率,全量MR频段2.1G-105记录数,全量MR频段2.1G-105覆盖率,全量MR频段2.1G-110记录数,全量MR频段2.1G-110覆盖率,全量MR频段2.1G-115记录数,全量MR频段2.1G-115覆盖率,全量MR频段2.1G-弱栅格数,全量MR频段2.1G-总栅格数,全量MR频段2.1G-弱栅格占比,全量MR频段2.6G-记录数,全量MR频段2.6G-RSRP均值,全量MR频段2.6G-95记录数,全量MR频段2.6G-95覆盖率,全量MR频段2.6G-100记录数,全量MR频段2.6G-100覆盖率,全量MR频段2.6G-105记录数,全量MR频段2.6G-105覆盖率,全量MR频段2.6G-110记录数,全量MR频段2.6G-110覆盖率,全量MR频段2.6G-115记录数,全量MR频段2.6G-115覆盖率,全量MR频段2.6G-弱栅格数,全量MR频段2.6G-总栅格数,全量MR频段2.6G-弱栅格占比";
    }else if(objectType == '扇区'){
        title = "地市,地市id,区县,区县id,营服,营服id,AGPS-MR覆盖最优记录数,AGPS-MR覆盖最优RSRP均值,AGPS-MR覆盖最优95记录数,AGPS-MR覆盖最优95覆盖率,AGPS-MR覆盖最优100记录数,AGPS-MR覆盖最优100覆盖率,AGPS-MR覆盖最优105记录数,AGPS-MR覆盖最优105覆盖率,AGPS-MR覆盖最优110记录数,AGPS-MR覆盖最优110覆盖率,AGPS-MR覆盖最优115记录数,AGPS-MR覆盖最优115覆盖率,AGPS-MR覆盖最优弱栅格数,AGPS-MR覆盖最优总栅格数,AGPS-MR覆盖最优弱栅格占比,AGPS-MR规划最优记录数,AGPS-MR规划最优RSRP均值,AGPS-MR规划最优95记录数,AGPS-MR规划最优95覆盖率,AGPS-MR规划最优100记录数,AGPS-MR规划最优100覆盖率,AGPS-MR规划最优105记录数,AGPS-MR规划最优105覆盖率,AGPS-MR规划最优110记录数,AGPS-MR规划最优110覆盖率,AGPS-MR规划最优115记录数,AGPS-MR规划最优115覆盖率,AGPS-MR规划最优弱栅格数,AGPS-MR规划最优总栅格数,AGPS-MR规划最优弱栅格占比,AGPS-MR主接入记录数,AGPS-MR主接入RSRP均值,AGPS-MR主接入95记录数,AGPS-MR主接入95覆盖率,AGPS-MR主接入100记录数,AGPS-MR主接入100覆盖率,AGPS-MR主接入105记录数,AGPS-MR主接入105覆盖率,AGPS-MR主接入110记录数,AGPS-MR主接入110覆盖率,AGPS-MR主接入115记录数,AGPS-MR主接入115覆盖率,AGPS-MR主接入弱栅格数,AGPS-MR主接入总栅格数,AGPS-MR主接入弱栅格占比,全量MR覆盖最优记录数,全量MR覆盖最优RSRP均值,全量MR覆盖最优95记录数,全量MR覆盖最优95覆盖率,全量MR覆盖最优100记录数,全量MR覆盖最优100覆盖率,全量MR覆盖最优105记录数,全量MR覆盖最优105覆盖率,全量MR覆盖最优110记录数,全量MR覆盖最优110覆盖率,全量MR覆盖最优115记录数,全量MR覆盖最优115覆盖率,全量MR覆盖最优弱栅格数,全量MR覆盖最优总栅格数,全量MR覆盖最优弱栅格占比,全量MR规划最优记录数,全量MR规划最优RSRP均值,全量MR规划最优95记录数,全量MR规划最优95覆盖率,全量MR规划最优100记录数,全量MR规划最优100覆盖率,全量MR规划最优105记录数,全量MR规划最优105覆盖率,全量MR规划最优110记录数,全量MR规划最优110覆盖率,全量MR规划最优115记录数,全量MR规划最优115覆盖率,全量MR规划最优弱栅格数,全量MR规划最优总栅格数,全量MR规划最优弱栅格占比,全量MR主接入记录数,全量MR主接入RSRP均值,全量MR主接入95记录数,全量MR主接入95覆盖率,全量MR主接入100记录数,全量MR主接入100覆盖率,全量MR主接入105记录数,全量MR主接入105覆盖率,全量MR主接入110记录数,全量MR主接入110覆盖率,全量MR主接入115记录数,全量MR主接入115覆盖率,全量MR主接入弱栅格数,全量MR主接入总栅格数,全量MR主接入弱栅格占比";
    }
    else{
        title = "地市,区县,营服,对象ID,对象名称,AGPS-MR覆盖最优记录数,AGPS-MR覆盖最优RSRP均值,AGPS-MR覆盖最优95记录数,AGPS-MR覆盖最优95覆盖率,AGPS-MR覆盖最优100记录数,AGPS-MR覆盖最优100覆盖率,AGPS-MR覆盖最优105记录数,AGPS-MR覆盖最优105覆盖率,AGPS-MR覆盖最优110记录数,AGPS-MR覆盖最优110覆盖率,AGPS-MR覆盖最优115记录数,AGPS-MR覆盖最优115覆盖率,AGPS-MR覆盖最优弱栅格数,AGPS-MR覆盖最优总栅格数,AGPS-MR覆盖最优弱栅格占比,AGPS-MR主接入记录数,AGPS-MR主接入RSRP均值,AGPS-MR主接入95记录数,AGPS-MR主接入95覆盖率,AGPS-MR主接入100记录数,AGPS-MR主接入100覆盖率,AGPS-MR主接入105记录数,AGPS-MR主接入105覆盖率,AGPS-MR主接入110记录数,AGPS-MR主接入110覆盖率,AGPS-MR主接入115记录数,AGPS-MR主接入115覆盖率,AGPS-MR主接入弱栅格数,AGPS-MR主接入总栅格数,AGPS-MR主接入弱栅格占比,AGPS-MR频段800M-记录数,AGPS-MR频段800M-RSRP均值,AGPS-MR频段800M-95记录数,AGPS-MR频段800M-95覆盖率,AGPS-MR频段800M-100记录数,AGPS-MR频段800M-100覆盖率,AGPS-MR频段800M-105记录数,AGPS-MR频段800M-105覆盖率,AGPS-MR频段800M-110记录数,AGPS-MR频段800M-110覆盖率,AGPS-MR频段800M-115记录数,AGPS-MR频段800M-115覆盖率,AGPS-MR频段800M-弱栅格数,AGPS-MR频段800M-总栅格数,AGPS-MR频段800M-弱栅格占比,AGPS-MR频段1.8G-记录数,AGPS-MR频段1.8G-RSRP均值,AGPS-MR频段1.8G-95记录数,AGPS-MR频段1.8G-95覆盖率,AGPS-MR频段1.8G-100记录数,AGPS-MR频段1.8G-100覆盖率,AGPS-MR频段1.8G-105记录数,AGPS-MR频段1.8G-105覆盖率,AGPS-MR频段1.8G-110记录数,AGPS-MR频段1.8G-110覆盖率,AGPS-MR频段1.8G-115记录数,AGPS-MR频段1.8G-115覆盖率,AGPS-MR频段1.8G-弱栅格数,AGPS-MR频段1.8G-总栅格数,AGPS-MR频段1.8G-弱栅格占比,AGPS-MR频段2.1G-记录数,AGPS-MR频段2.1G-RSRP均值,AGPS-MR频段2.1G-95记录数,AGPS-MR频段2.1G-95覆盖率,AGPS-MR频段2.1G-100记录数,AGPS-MR频段2.1G-100覆盖率,AGPS-MR频段2.1G-105记录数,AGPS-MR频段2.1G-105覆盖率,AGPS-MR频段2.1G-110记录数,AGPS-MR频段2.1G-110覆盖率,AGPS-MR频段2.1G-115记录数,AGPS-MR频段2.1G-115覆盖率,AGPS-MR频段2.1G-弱栅格数,AGPS-MR频段2.1G-总栅格数,AGPS-MR频段2.1G-弱栅格占比,AGPS-MR频段2.6G-记录数,AGPS-MR频段2.6G-RSRP均值,AGPS-MR频段2.6G-95记录数,AGPS-MR频段2.6G-95覆盖率,AGPS-MR频段2.6G-100记录数,AGPS-MR频段2.6G-100覆盖率,AGPS-MR频段2.6G-105记录数,AGPS-MR频段2.6G-105覆盖率,AGPS-MR频段2.6G-110记录数,AGPS-MR频段2.6G-110覆盖率,AGPS-MR频段2.6G-115记录数,AGPS-MR频段2.6G-115覆盖率,AGPS-MR频段2.6G-弱栅格数,AGPS-MR频段2.6G-总栅格数,AGPS-MR频段2.6G-弱栅格占比,全量MR覆盖最优记录数,全量MR覆盖最优RSRP均值,全量MR覆盖最优95记录数,全量MR覆盖最优95覆盖率,全量MR覆盖最优100记录数,全量MR覆盖最优100覆盖率,全量MR覆盖最优105记录数,全量MR覆盖最优105覆盖率,全量MR覆盖最优110记录数,全量MR覆盖最优110覆盖率,全量MR覆盖最优115记录数,全量MR覆盖最优115覆盖率,全量MR覆盖最优弱栅格数,全量MR覆盖最优总栅格数,全量MR覆盖最优弱栅格占比,全量MR主接入记录数,全量MR主接入RSRP均值,全量MR主接入95记录数,全量MR主接入95覆盖率,全量MR主接入100记录数,全量MR主接入100覆盖率,全量MR主接入105记录数,全量MR主接入105覆盖率,全量MR主接入110记录数,全量MR主接入110覆盖率,全量MR主接入115记录数,全量MR主接入115覆盖率,全量MR主接入弱栅格数,全量MR主接入总栅格数,全量MR主接入弱栅格占比,全量MR频段800M-记录数,全量MR频段800M-RSRP均值,全量MR频段800M-95记录数,全量MR频段800M-95覆盖率,全量MR频段800M-100记录数,全量MR频段800M-100覆盖率,全量MR频段800M-105记录数,全量MR频段800M-105覆盖率,全量MR频段800M-110记录数,全量MR频段800M-110覆盖率,全量MR频段800M-115记录数,全量MR频段800M-115覆盖率,全量MR频段800M-弱栅格数,全量MR频段800M-总栅格数,全量MR频段800M-弱栅格占比,全量MR频段1.8G-记录数,全量MR频段1.8G-RSRP均值,全量MR频段1.8G-95记录数,全量MR频段1.8G-95覆盖率,全量MR频段1.8G-100记录数,全量MR频段1.8G-100覆盖率,全量MR频段1.8G-105记录数,全量MR频段1.8G-105覆盖率,全量MR频段1.8G-110记录数,全量MR频段1.8G-110覆盖率,全量MR频段1.8G-115记录数,全量MR频段1.8G-115覆盖率,全量MR频段1.8G-弱栅格数,全量MR频段1.8G-总栅格数,全量MR频段1.8G-弱栅格占比,全量MR频段2.1G-记录数,全量MR频段2.1G-RSRP均值,全量MR频段2.1G-95记录数,全量MR频段2.1G-95覆盖率,全量MR频段2.1G-100记录数,全量MR频段2.1G-100覆盖率,全量MR频段2.1G-105记录数,全量MR频段2.1G-105覆盖率,全量MR频段2.1G-110记录数,全量MR频段2.1G-110覆盖率,全量MR频段2.1G-115记录数,全量MR频段2.1G-115覆盖率,全量MR频段2.1G-弱栅格数,全量MR频段2.1G-总栅格数,全量MR频段2.1G-弱栅格占比,全量MR频段2.6G-记录数,全量MR频段2.6G-RSRP均值,全量MR频段2.6G-95记录数,全量MR频段2.6G-95覆盖率,全量MR频段2.6G-100记录数,全量MR频段2.6G-100覆盖率,全量MR频段2.6G-105记录数,全量MR频段2.6G-105覆盖率,全量MR频段2.6G-110记录数,全量MR频段2.6G-110覆盖率,全量MR频段2.6G-115记录数,全量MR频段2.6G-115覆盖率,全量MR频段2.6G-弱栅格数,全量MR频段2.6G-总栅格数,全量MR频段2.6G-弱栅格占比";
    }

    var fixObj={
        fixRow: 1,
        fixClnObj:{
            fixCln:5,
            tableId:"tableId222"
        }
    };
    var pageObj={pageSize:20,pageFlag:1};
    //表格对象
    var tableObject={
        divId:"tableParentDiv2",
        tableId:"tableId22",
        tableHead:title,
        dataType:3,
        sql:data,
        sortFlag:0,
        pageObj:pageObj,
        fixObj:fixObj

    };
    IntelligentRoadTestChart.vm.tableObj2 = tableObject;
    IntelligentRoadTestChart.vm.table2 = new TableToolsNewTwo();

    IntelligentRoadTestChart.vm.table2.submit(tableObject);
    $(".pbt").hide();
}
tableDataProcessForVueComponent.loadKanWuTableBySql = function (data) {
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var title = '';
    title = "地市名称,地市ID,区县,区县ID,营服中心,营服中心ID,基站ID,基站名称,小区ID,小区名称,设备厂商,基站位置GPS,预测GPS位置,预测百度地图位置,预测位置相差距离,支持预测的MR条数" +
        ",包含AGPS的MR条数,包含AGPS的MR与小区平均距离,包含AGPS的MR与小区每TA平均距离,方位角,预测角度,偏离角度,支持方位角预测条数";
    var fixObj={
        fixRow: 1,
        fixClnObj:{
            fixCln:5,
            tableId:"tableId333"
        }
    };
    var pageObj={pageSize:20,pageFlag:1};
    //表格对象
    var tableObject={
        divId:"tableParentDiv3",
        tableId:"tableId33",
        tableHead:title,
        dataType:3,
        sql:data,
        sortFlag:0,
        pageObj:pageObj,
        fixObj:fixObj

    };
    IntelligentRoadTestChart.vm.tableObj3 = tableObject;
    IntelligentRoadTestChart.vm.table3 = new TableToolsNewTwo();

    IntelligentRoadTestChart.vm.table3.submit(tableObject);
    $(".pbt").hide();
}
/**********************************
 * @funcname tableDataProcess
 * @funcdesc 前端拿到数据后，渲染表格
 * @param
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
 * @param
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
    if(objectType != '工单' && objectType != '弱区' && objectType != '扇区' && objectType != '全区域'){
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
                templatePara: para,
                // tableData:MobilePerceptionVsl.tableDataExport
            }
        ]
    };

    if($.inArray(objectType,['弱区','上行低速区','下行低速区']) > -1){
        IntelligentRoadTestChart.showLoading();
        var list1 = [tableObj.sql[0]];
        list1 = list1.concat(para);
        var progressBarSqls = [];
        progressBarSqls.push(list1);
        function callback(data) {
            if(data.result.length > 0){
                var dataArr = [];
                data = tableDataProcessForVueComponent.tranFn2(data);
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
                // var exportExcel = new exportExcelNew(obj);
                // exportExcel.submit();
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
 * @param
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
 * @funcname
 * @funcdesc
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
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
 * @param
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
