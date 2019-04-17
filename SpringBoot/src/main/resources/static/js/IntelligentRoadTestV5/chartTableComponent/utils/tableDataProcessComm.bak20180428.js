let tableDataProcessForVueComponent = {};

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
tableDataProcessForVueComponent.loadTable = function(){
    IntelligentRoadTestChart.vm.isShowLoading = true;
    let objectType = IntelligentRoadTestChart.vm.statistical;
    if(objectType == '工单'){
        tableDataProcessForVueComponent.getWorkOrderTableData().then( data => {
            tableDataProcessForVueComponent.tableDataProcess(data);
        }).then(() => {
            IntelligentRoadTestChart.vm.isShowLoading = false;
        })
    }else{
        tableDataProcessForVueComponent.getTableData().then(data => {
            tableDataProcessForVueComponent.loadTableBySql(data);
        }).then(()=>{
            IntelligentRoadTestChart.vm.isShowLoading = false;
        })
    }

}

/**********************************
 * @funcname getTableData
 * @funcdesc 
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-18 09:42
 * @modifier 
 * @modify 
 ***********************************/
tableDataProcessForVueComponent.getTableData = function () {
    let promise = new Promise(function  (resolve,reject) {
        let list = tableDataProcessForVueComponent.getSql();
        resolve(list);
    });
    return promise;
}
/**********************************
 * @funcname getSql
 * @funcdesc 拼接表格sql
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-25 23:14
 * @modifier 
 * @modify 
 ***********************************/
tableDataProcessForVueComponent.getSql = function(){
    let city = IntelligentRoadTestChart.vm.cityFlag;
    let district = IntelligentRoadTestChart.vm.district;
    let market = IntelligentRoadTestChart.vm.market;
    let objectType = IntelligentRoadTestChart.vm.statistical;
    let dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    let urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    let urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    let ZLQY_FLAG = 0;
    let bestOrsc = IntelligentRoadTestChart.vm.bestOrsc;
    let threshold = IntelligentRoadTestChart.vm.thresholdVal;
    let workOrderType = IntelligentRoadTestChart.vm.workOrderType;
    let list = [];
    let table = '';

    if(dateCycle == '月'){
        table = 'm';
    }else if(dateCycle == '周'){
        table = 'w';
    }else if(dateCycle == '日'){
        table = 'd';
    }

    if(objectType == '弱区'){
        list.push('IntelligentRoadTestAnalysisV3_166_PoorTable');
        list.push(`TABLE:d`);
    }else if(objectType == '扇区'){
        list.push('StatisticsDL_04_MRSatTab4Cell');
    }else if(objectType == '全区域'){
        list.push('StatisticsDL_06_MRSatAllAreaTab');
    }else if(objectType == '工单'){
        list.push('IntelligentRoadTestAnalysisV3_101_AlarmTable');
        if(workOrderType != '全部'){
            list.push(`ALARM_NAME:AND LOCATE('${workOrderType}',ALARM_NAME) > 0`);
        }
    }else{
        list.push('StatisticsDL_02_MRSatTab');
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

    if(city != '全省'){
        list.push(`CITY_CONDITION:and CITY='${city}'`);
    }
    if(district != '全市'){
        list.push(`COUNTRY_CONDITION:and COUNTRY='${district}'`);
    }
    if(market != '全区'){
        list.push(`MKTCENTER_CONDITION:and MKTCENTER='${market}'`);
    }
    list.push(`startTime:${urlStartDay}`);
    list.push(`endTime:${urlEndDay}`);

    return list;
}
/**********************************
 * @funcname getSectorTableData
 * @funcdesc 扇区表格
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-18 10:12
 * @modifier 
 * @modify 
 ***********************************/
tableDataProcessForVueComponent.getSectorTableData = function () {
    let city = IntelligentRoadTestChart.vm.cityFlag;
    let district = IntelligentRoadTestChart.vm.district;
    let market = IntelligentRoadTestChart.vm.market;
    let objectType = IntelligentRoadTestChart.vm.statistical;
    let dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    let urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    let urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    let ZLQY_FLAG = 0;
    let promise = new Promise(function  (resolve,reject) {

        let list = ["StatisticsDL_04_MRSatTab4Cell"];

        let table = '';
        if(dateCycle == '月'){
            table = 'm';
        }else if(dateCycle == '周'){
            table = 'w';
        }else if(dateCycle == '日'){
            table = 'd';
        }
        list.push(`TABLE:${table}`);

        if(table != 'm'){
            list.push(`T_PARTITION_VAR:day`);
        }else{
            list.push(`T_PARTITION_VAR:month`);
        }

        if(city != '全省'){
            list.push(`CITY_CONDITION:and CITY='${city}'`);
        }

        if(district != '全市'){
            list.push(`COUNTRY_CONDITION:and COUNTRY='${district}'`);
        }

        if(market != '全区'){
            list.push(`MKTCENTER_CONDITION:and MKTCENTER='${market}'`);
        }
        // list.push(`startTime:${urlStartDay}`);
        list.push(`endTime:${urlEndDay}`);

        resolve(list);
        // function successCallback(data) {
        //     resolve(data);
        // }
        //
        // let progressBarSqls = [];
        // let functionlist = [successCallback];
        // progressBarSqls.push(list);
        // progressbarTwo.submitSql(progressBarSqls, functionlist, [3]);
    });
    return promise;
}
/**********************************
 * @funcname getAllAreaTableData
 * @funcdesc 全区域表格
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-18 14:06
 * @modifier 
 * @modify 
 ***********************************/
tableDataProcessForVueComponent.getAllAreaTableData = function () {
    let city = IntelligentRoadTestChart.vm.cityFlag;
    let district = IntelligentRoadTestChart.vm.district;
    let market = IntelligentRoadTestChart.vm.market;
    let objectType = IntelligentRoadTestChart.vm.statistical;
    let dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    let urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    let urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    let ZLQY_FLAG = 0;
    let promise = new Promise(function  (resolve,reject) {

        let list = ["StatisticsDL_06_MRSatAllAreaTab"];

        let table = '';
        if(dateCycle == '月'){
            table = 'm';
        }else if(dateCycle == '周'){
            table = 'w';
        }else if(dateCycle == '日'){
            table = 'd';
        }
        list.push(`TABLE:${table}`);

        if(table != 'm'){
            list.push(`T_PARTITION_VAR:day`);
        }else{
            list.push(`T_PARTITION_VAR:month`);
        }

        if(city != '全省'){
            list.push(`CITY_CONDITION:and CITY='${city}'`);
        }

        if(district != '全市'){
            list.push(`COUNTRY_CONDITION:and COUNTRY='${district}'`);
        }

        if(market != '全区'){
            list.push(`MKTCENTER_CONDITION:and MKTCENTER='${market}'`);
        }
        list.push(`startTime:${urlStartDay}`);
        list.push(`endTime:${urlEndDay}`);

        resolve(list);
        // function successCallback(data) {
        //     resolve(data);
        // }
        //
        // let progressBarSqls = [];
        // let functionlist = [successCallback];
        // progressBarSqls.push(list);
        // progressbarTwo.submitSql(progressBarSqls, functionlist, [3]);
    });
    return promise;
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
    let city = IntelligentRoadTestChart.vm.cityFlag;
    let district = IntelligentRoadTestChart.vm.district;
    let market = IntelligentRoadTestChart.vm.market;
    let objectType = IntelligentRoadTestChart.vm.statistical;
    let dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    let urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    let urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    urlStartDay = new Date(urlStartDay).format('yyyyMMdd');
    urlEndDay = new Date(urlEndDay).format('yyyyMMdd');
    let ZLQY_FLAG = 0;
    let promise = new Promise(function  (resolve,reject) {

        let list = ["IntelligentRoadTestAnalysisV3_166_PoorTable"];

        let table = '';
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
        // let progressBarSqls = [];
        // let functionlist = [successCallback];
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
tableDataProcessForVueComponent.getWorkOrderTableData = function(data){
    IntelligentRoadTestChart.vm.isShowLoading = true;
    let city = IntelligentRoadTestChart.vm.cityFlag;
    let district = IntelligentRoadTestChart.vm.district;
    let market = IntelligentRoadTestChart.vm.market;
    let objectType = IntelligentRoadTestChart.vm.statistical;
    let dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    let urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    let urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    // urlStartDay = new Date(urlStartDay).format('yyyyMMdd');
    // urlEndDay = new Date(urlEndDay).format('yyyyMMdd');
    let ZLQY_FLAG = 0;
    let workOrderType = IntelligentRoadTestChart.vm.workOrderType;
    let promise = new Promise(function  (resolve,reject) {
        let list = ["IntelligentRoadTestAnalysisV3_101_AlarmTable"];
        if(city != '全省'){
            list.push(`CITY_CONDITION:and CITY='${city}'`);
        }

        if(district != '全市'){
            list.push(`COUNTRY_CONDITION:and COUNTRY='${district}'`);
        }

        if(market != '全区'){
            list.push(`MKTCENTER_CONDITION:and MKTCENTER='${market}'`);
        }
        if(workOrderType != '全部'){
            list.push(`ALARM_NAME:AND LOCATE('${workOrderType}',ALARM_NAME) > 0`);
        }

        list.push(`startTime:${urlStartDay}`);
        list.push(`endTime:${urlEndDay}`);

        // resolve(list);
        function successCallback(data) {
            resolve(data);
        }

        let progressBarSqls = [];
        let functionlist = [successCallback];
        progressBarSqls.push(list);
        progressbarTwo.submitSql(progressBarSqls, functionlist, [3],null,null,null,null,false,['Alarms']);
    });
    return promise;
}
/**********************************
 * @funcname loadTableBySql
 * @funcdesc 通过sqlchax显示表格数据
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-25 10:20
 * @modifier 
 * @modify 
 ***********************************/
tableDataProcessForVueComponent.loadTableBySql = function (data,title) {
    let objectType = IntelligentRoadTestChart.vm.statistical;
    // let title = '';
    if(objectType == '弱区'){
        title = "弱区日期,弱覆盖片区编号,地市名称,区县,营服中心,栅格最小经度,栅格最小纬度,栅格中心经度,栅格中心纬度,栅格最大经度," +
            "栅格最大纬度,区域归属,主服务小区集合,4G切3G总次数,4G切3G总次数在本地网内排名,4G总流量,本地网内4G流量排名," +
            "感知优良率按天平均值,本地网内感知优良率排名,4G用户数按天平均值,本地网内4G用户数排名,最终排名累计值," +
            "弱覆盖处理措施,弱覆盖最近基站名称,弱覆盖最近基站地址,基站ID,弱覆盖最近的小区ID,弱覆盖最近的小区的名称," +
            "弱覆盖最近的小区的状态,距离最近的TOP5的小区集合,弱覆盖区域的弱覆盖栅格数,曾发生退服告警总次数,曾发生退服告警小区数," +
            "未恢复退服告警小区数,弱覆盖区域的全部栅格数,弱覆盖区域的弱覆盖栅格数排名,弱覆盖区域的弱栅格的面积," +
            "弱覆盖区域的全部栅格的面积,场景类型,最近小区告警数,线路ID,线路名称,包含对象ID集合,4G切3G总次数区县排名," +
            "4G流量区县排名,感知优良率区县排名,4G用户数区县排名,弱覆盖栅格数区县排名,最终累计值地市排名,最终累计值区县排名,是否新增弱区标志";
    }else if(objectType == '工单'){
        title = "告警ID,地市,区县,营服中心,告警类型,场景标识,场景名称,告警等级,告警时间,是否恢复,告警恢复时间,工单单号";
    }else if(objectType == '全区域'){
        title = "地市,区县,营服,AGPS-MR覆盖最优记录数,AGPS-MR覆盖最优RSRP均值,AGPS-MR覆盖最优95记录数,AGPS-MR覆盖最优95覆盖率,AGPS-MR覆盖最优100记录数,AGPS-MR覆盖最优100覆盖率,AGPS-MR覆盖最优105记录数,AGPS-MR覆盖最优105覆盖率,AGPS-MR覆盖最优110记录数,AGPS-MR覆盖最优110覆盖率,AGPS-MR覆盖最优115记录数,AGPS-MR覆盖最优115覆盖率,AGPS-MR覆盖最优弱栅格数,AGPS-MR覆盖最优总栅格数,AGPS-MR覆盖最优弱栅格占比,AGPS-MR规划最优记录数,AGPS-MR规划最优RSRP均值,AGPS-MR规划最优95记录数,AGPS-MR规划最优95覆盖率,AGPS-MR规划最优100记录数,AGPS-MR规划最优100覆盖率,AGPS-MR规划最优105记录数,AGPS-MR规划最优105覆盖率,AGPS-MR规划最优110记录数,AGPS-MR规划最优110覆盖率,AGPS-MR规划最优115记录数,AGPS-MR规划最优115覆盖率,AGPS-MR规划最优弱栅格数,AGPS-MR规划最优总栅格数,AGPS-MR规划最优弱栅格占比,AGPS-MR主接入记录数,AGPS-MR主接入RSRP均值,AGPS-MR主接入95记录数,AGPS-MR主接入95覆盖率,AGPS-MR主接入100记录数,AGPS-MR主接入100覆盖率,AGPS-MR主接入105记录数,AGPS-MR主接入105覆盖率,AGPS-MR主接入110记录数,AGPS-MR主接入110覆盖率,AGPS-MR主接入115记录数,AGPS-MR主接入115覆盖率,AGPS-MR主接入弱栅格数,AGPS-MR主接入总栅格数,AGPS-MR主接入弱栅格占比,AGPS-MR频段800M-记录数,AGPS-MR频段800M-RSRP均值,AGPS-MR频段800M-95记录数,AGPS-MR频段800M-95覆盖率,AGPS-MR频段800M-100记录数,AGPS-MR频段800M-100覆盖率,AGPS-MR频段800M-105记录数,AGPS-MR频段800M-105覆盖率,AGPS-MR频段800M-110记录数,AGPS-MR频段800M-110覆盖率,AGPS-MR频段800M-115记录数,AGPS-MR频段800M-115覆盖率,AGPS-MR频段800M-弱栅格数,AGPS-MR频段800M-总栅格数,AGPS-MR频段800M-弱栅格占比,AGPS-MR频段1.8G-记录数,AGPS-MR频段1.8G-RSRP均值,AGPS-MR频段1.8G-95记录数,AGPS-MR频段1.8G-95覆盖率,AGPS-MR频段1.8G-100记录数,AGPS-MR频段1.8G-100覆盖率,AGPS-MR频段1.8G-105记录数,AGPS-MR频段1.8G-105覆盖率,AGPS-MR频段1.8G-110记录数,AGPS-MR频段1.8G-110覆盖率,AGPS-MR频段1.8G-115记录数,AGPS-MR频段1.8G-115覆盖率,AGPS-MR频段1.8G-弱栅格数,AGPS-MR频段1.8G-总栅格数,AGPS-MR频段1.8G-弱栅格占比,AGPS-MR频段2.1G-记录数,AGPS-MR频段2.1G-RSRP均值,AGPS-MR频段2.1G-95记录数,AGPS-MR频段2.1G-95覆盖率,AGPS-MR频段2.1G-100记录数,AGPS-MR频段2.1G-100覆盖率,AGPS-MR频段2.1G-105记录数,AGPS-MR频段2.1G-105覆盖率,AGPS-MR频段2.1G-110记录数,AGPS-MR频段2.1G-110覆盖率,AGPS-MR频段2.1G-115记录数,AGPS-MR频段2.1G-115覆盖率,AGPS-MR频段2.1G-弱栅格数,AGPS-MR频段2.1G-总栅格数,AGPS-MR频段2.1G-弱栅格占比,AGPS-MR频段2.6G-记录数,AGPS-MR频段2.6G-RSRP均值,AGPS-MR频段2.6G-95记录数,AGPS-MR频段2.6G-95覆盖率,AGPS-MR频段2.6G-100记录数,AGPS-MR频段2.6G-100覆盖率,AGPS-MR频段2.6G-105记录数,AGPS-MR频段2.6G-105覆盖率";
    }
    else{
        title = "地市,区县,营服,对象ID,对象名称,AGPS-MR覆盖最优记录数,AGPS-MR覆盖最优RSRP均值,AGPS-MR覆盖最优95记录数,AGPS-MR覆盖最优95覆盖率,AGPS-MR覆盖最优100记录数,AGPS-MR覆盖最优100覆盖率,AGPS-MR覆盖最优105记录数,AGPS-MR覆盖最优105覆盖率,AGPS-MR覆盖最优110记录数,AGPS-MR覆盖最优110覆盖率,AGPS-MR覆盖最优115记录数,AGPS-MR覆盖最优115覆盖率,AGPS-MR覆盖最优弱栅格数,AGPS-MR覆盖最优总栅格数,AGPS-MR覆盖最优弱栅格占比,AGPS-MR规划最优记录数,AGPS-MR规划最优RSRP均值,AGPS-MR规划最优95记录数,AGPS-MR规划最优95覆盖率,AGPS-MR规划最优100记录数,AGPS-MR规划最优100覆盖率,AGPS-MR规划最优105记录数,AGPS-MR规划最优105覆盖率,AGPS-MR规划最优110记录数,AGPS-MR规划最优110覆盖率,AGPS-MR规划最优115记录数,AGPS-MR规划最优115覆盖率,AGPS-MR规划最优弱栅格数,AGPS-MR规划最优总栅格数,AGPS-MR规划最优弱栅格占比,AGPS-MR主接入记录数,AGPS-MR主接入RSRP均值,AGPS-MR主接入95记录数,AGPS-MR主接入95覆盖率,AGPS-MR主接入100记录数,AGPS-MR主接入100覆盖率,AGPS-MR主接入105记录数,AGPS-MR主接入105覆盖率,AGPS-MR主接入110记录数,AGPS-MR主接入110覆盖率,AGPS-MR主接入115记录数,AGPS-MR主接入115覆盖率,AGPS-MR主接入弱栅格数,AGPS-MR主接入总栅格数,AGPS-MR主接入弱栅格占比,AGPS-MR频段800M-记录数,AGPS-MR频段800M-RSRP均值,AGPS-MR频段800M-95记录数,AGPS-MR频段800M-95覆盖率,AGPS-MR频段800M-100记录数,AGPS-MR频段800M-100覆盖率,AGPS-MR频段800M-105记录数,AGPS-MR频段800M-105覆盖率,AGPS-MR频段800M-110记录数,AGPS-MR频段800M-110覆盖率,AGPS-MR频段800M-115记录数,AGPS-MR频段800M-115覆盖率,AGPS-MR频段800M-弱栅格数,AGPS-MR频段800M-总栅格数,AGPS-MR频段800M-弱栅格占比,AGPS-MR频段1.8G-记录数,AGPS-MR频段1.8G-RSRP均值,AGPS-MR频段1.8G-95记录数,AGPS-MR频段1.8G-95覆盖率,AGPS-MR频段1.8G-100记录数,AGPS-MR频段1.8G-100覆盖率,AGPS-MR频段1.8G-105记录数,AGPS-MR频段1.8G-105覆盖率,AGPS-MR频段1.8G-110记录数,AGPS-MR频段1.8G-110覆盖率,AGPS-MR频段1.8G-115记录数,AGPS-MR频段1.8G-115覆盖率,AGPS-MR频段1.8G-弱栅格数,AGPS-MR频段1.8G-总栅格数,AGPS-MR频段1.8G-弱栅格占比,AGPS-MR频段2.1G-记录数,AGPS-MR频段2.1G-RSRP均值,AGPS-MR频段2.1G-95记录数,AGPS-MR频段2.1G-95覆盖率,AGPS-MR频段2.1G-100记录数,AGPS-MR频段2.1G-100覆盖率,AGPS-MR频段2.1G-105记录数,AGPS-MR频段2.1G-105覆盖率,AGPS-MR频段2.1G-110记录数,AGPS-MR频段2.1G-110覆盖率,AGPS-MR频段2.1G-115记录数,AGPS-MR频段2.1G-115覆盖率,AGPS-MR频段2.1G-弱栅格数,AGPS-MR频段2.1G-总栅格数,AGPS-MR频段2.1G-弱栅格占比,AGPS-MR频段2.6G-记录数,AGPS-MR频段2.6G-RSRP均值,AGPS-MR频段2.6G-95记录数,AGPS-MR频段2.6G-95覆盖率,AGPS-MR频段2.6G-100记录数,AGPS-MR频段2.6G-100覆盖率,AGPS-MR频段2.6G-105记录数,AGPS-MR频段2.6G-105覆盖率,AGPS-MR频段2.6G-110记录数,AGPS-MR频段2.6G-110覆盖率,AGPS-MR频段2.6G-115记录数,AGPS-MR频段2.6G-115覆盖率,AGPS-MR频段2.6G-弱栅格数,AGPS-MR频段2.6G-总栅格数,AGPS-MR频段2.6G-弱栅格占比,全量MR覆盖最优记录数,全量MR覆盖最优RSRP均值,全量MR覆盖最优95记录数,全量MR覆盖最优95覆盖率,全量MR覆盖最优100记录数,全量MR覆盖最优100覆盖率,全量MR覆盖最优105记录数,全量MR覆盖最优105覆盖率,全量MR覆盖最优110记录数,全量MR覆盖最优110覆盖率,全量MR覆盖最优115记录数,全量MR覆盖最优115覆盖率,全量MR覆盖最优弱栅格数,全量MR覆盖最优总栅格数,全量MR覆盖最优弱栅格占比,全量MR规划最优记录数,全量MR规划最优RSRP均值,全量MR规划最优95记录数,全量MR规划最优95覆盖率,全量MR规划最优100记录数,全量MR规划最优100覆盖率,全量MR规划最优105记录数,全量MR规划最优105覆盖率,全量MR规划最优110记录数,全量MR规划最优110覆盖率,全量MR规划最优115记录数,全量MR规划最优115覆盖率,全量MR规划最优弱栅格数,全量MR规划最优总栅格数,全量MR规划最优弱栅格占比,全量MR主接入记录数,全量MR主接入RSRP均值,全量MR主接入95记录数,全量MR主接入95覆盖率,全量MR主接入100记录数,全量MR主接入100覆盖率,全量MR主接入105记录数,全量MR主接入105覆盖率,全量MR主接入110记录数,全量MR主接入110覆盖率,全量MR主接入115记录数,全量MR主接入115覆盖率,全量MR主接入弱栅格数,全量MR主接入总栅格数,全量MR主接入弱栅格占比,全量MR频段800M-记录数,全量MR频段800M-RSRP均值,全量MR频段800M-95记录数,全量MR频段800M-95覆盖率,全量MR频段800M-100记录数,全量MR频段800M-100覆盖率,全量MR频段800M-105记录数,全量MR频段800M-105覆盖率,全量MR频段800M-110记录数,全量MR频段800M-110覆盖率,全量MR频段800M-115记录数,全量MR频段800M-115覆盖率,全量MR频段800M-弱栅格数,全量MR频段800M-总栅格数,全量MR频段800M-弱栅格占比,全量MR频段1.8G-记录数,全量MR频段1.8G-RSRP均值,全量MR频段1.8G-95记录数,全量MR频段1.8G-95覆盖率,全量MR频段1.8G-100记录数,全量MR频段1.8G-100覆盖率,全量MR频段1.8G-105记录数,全量MR频段1.8G-105覆盖率,全量MR频段1.8G-110记录数,全量MR频段1.8G-110覆盖率,全量MR频段1.8G-115记录数,全量MR频段1.8G-115覆盖率,全量MR频段1.8G-弱栅格数,全量MR频段1.8G-总栅格数,全量MR频段1.8G-弱栅格占比,全量MR频段2.1G-记录数,全量MR频段2.1G-RSRP均值,全量MR频段2.1G-95记录数,全量MR频段2.1G-95覆盖率,全量MR频段2.1G-100记录数,全量MR频段2.1G-100覆盖率,全量MR频段2.1G-105记录数,全量MR频段2.1G-105覆盖率,全量MR频段2.1G-110记录数,全量MR频段2.1G-110覆盖率,全量MR频段2.1G-115记录数,全量MR频段2.1G-115覆盖率,全量MR频段2.1G-弱栅格数,全量MR频段2.1G-总栅格数,全量MR频段2.1G-弱栅格占比,全量MR频段2.6G-记录数,全量MR频段2.6G-RSRP均值,全量MR频段2.6G-95记录数,全量MR频段2.6G-95覆盖率,全量MR频段2.6G-100记录数,全量MR频段2.6G-100覆盖率,全量MR频段2.6G-105记录数,全量MR频段2.6G-105覆盖率,全量MR频段2.6G-110记录数,全量MR频段2.6G-110覆盖率,全量MR频段2.6G-115记录数,全量MR频段2.6G-115覆盖率,全量MR频段2.6G-弱栅格数,全量MR频段2.6G-总栅格数,全量MR频段2.6G-弱栅格占比";
    }

    var pageObj={pageSize:20,pageFlag:1};
    //表格对象
    let tableObject={
        divId:"tableParentDiv",
        tableId:"tableId",
        tableHead:title,
        dataType:3,
        sql:data,
        sortFlag:0,
        pageObj:pageObj,
        // clnObj:clnObj,
        // fixObj:fixObj

    };


    IntelligentRoadTestChart.vm.tableObj = tableObject;
    let table = new TableToolsNewTwo();
    table.submit(tableObject);
    $(".pbt").hide();
}

tableDataProcessForVueComponent.tableDataProcess = function (data,title) {
    let objectType = IntelligentRoadTestChart.vm.statistical;
    if(data.result.length > 0){
        let result = callBackChangeData(data);
        let TableDetailData = {};

        TableDetailData.columns = ["1", "2"];
        TableDetailData.result = [];
        console.time("循环处理表格数据时间：");
        result.forEach( t => {
            let dataArrs = [];
            for(o in t){
                dataArrs.push(t[o]);
            }
            TableDetailData.result.push(dataArrs);
        })
        console.timeEnd("循环处理时间时间：");

        if(TableDetailData.result.length == 0){
            TableDetailData.result = [[]];
        }

        let title = '';
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
            title = "告警ID,地市,区县,营服中心,告警类型,场景标识,场景名称,告警等级,告警时间,是否恢复,告警恢复时间,工单单号";
        }
        else{
            title = "地市,区县,营服,对象ID,对象名称,AGPS-MR覆盖最优记录数,AGPS-MR覆盖最优RSRP均值,AGPS-MR覆盖最优95记录数,AGPS-MR覆盖最优95覆盖率,AGPS-MR覆盖最优100记录数,AGPS-MR覆盖最优100覆盖率,AGPS-MR覆盖最优105记录数,AGPS-MR覆盖最优105覆盖率,AGPS-MR覆盖最优110记录数,AGPS-MR覆盖最优110覆盖率,AGPS-MR覆盖最优115记录数,AGPS-MR覆盖最优115覆盖率,AGPS-MR覆盖最优弱栅格数,AGPS-MR覆盖最优总栅格数,AGPS-MR覆盖最优弱栅格占比,AGPS-MR规划最优记录数,AGPS-MR规划最优RSRP均值,AGPS-MR规划最优95记录数,AGPS-MR规划最优95覆盖率,AGPS-MR规划最优100记录数,AGPS-MR规划最优100覆盖率,AGPS-MR规划最优105记录数,AGPS-MR规划最优105覆盖率,AGPS-MR规划最优110记录数,AGPS-MR规划最优110覆盖率,AGPS-MR规划最优115记录数,AGPS-MR规划最优115覆盖率,AGPS-MR规划最优弱栅格数,AGPS-MR规划最优总栅格数,AGPS-MR规划最优弱栅格占比,AGPS-MR主接入记录数,AGPS-MR主接入RSRP均值,AGPS-MR主接入95记录数,AGPS-MR主接入95覆盖率,AGPS-MR主接入100记录数,AGPS-MR主接入100覆盖率,AGPS-MR主接入105记录数,AGPS-MR主接入105覆盖率,AGPS-MR主接入110记录数,AGPS-MR主接入110覆盖率,AGPS-MR主接入115记录数,AGPS-MR主接入115覆盖率,AGPS-MR主接入弱栅格数,AGPS-MR主接入总栅格数,AGPS-MR主接入弱栅格占比,AGPS-MR频段800M-记录数,AGPS-MR频段800M-RSRP均值,AGPS-MR频段800M-95记录数,AGPS-MR频段800M-95覆盖率,AGPS-MR频段800M-100记录数,AGPS-MR频段800M-100覆盖率,AGPS-MR频段800M-105记录数,AGPS-MR频段800M-105覆盖率,AGPS-MR频段800M-110记录数,AGPS-MR频段800M-110覆盖率,AGPS-MR频段800M-115记录数,AGPS-MR频段800M-115覆盖率,AGPS-MR频段800M-弱栅格数,AGPS-MR频段800M-总栅格数,AGPS-MR频段800M-弱栅格占比,AGPS-MR频段1.8G-记录数,AGPS-MR频段1.8G-RSRP均值,AGPS-MR频段1.8G-95记录数,AGPS-MR频段1.8G-95覆盖率,AGPS-MR频段1.8G-100记录数,AGPS-MR频段1.8G-100覆盖率,AGPS-MR频段1.8G-105记录数,AGPS-MR频段1.8G-105覆盖率,AGPS-MR频段1.8G-110记录数,AGPS-MR频段1.8G-110覆盖率,AGPS-MR频段1.8G-115记录数,AGPS-MR频段1.8G-115覆盖率,AGPS-MR频段1.8G-弱栅格数,AGPS-MR频段1.8G-总栅格数,AGPS-MR频段1.8G-弱栅格占比,AGPS-MR频段2.1G-记录数,AGPS-MR频段2.1G-RSRP均值,AGPS-MR频段2.1G-95记录数,AGPS-MR频段2.1G-95覆盖率,AGPS-MR频段2.1G-100记录数,AGPS-MR频段2.1G-100覆盖率,AGPS-MR频段2.1G-105记录数,AGPS-MR频段2.1G-105覆盖率,AGPS-MR频段2.1G-110记录数,AGPS-MR频段2.1G-110覆盖率,AGPS-MR频段2.1G-115记录数,AGPS-MR频段2.1G-115覆盖率,AGPS-MR频段2.1G-弱栅格数,AGPS-MR频段2.1G-总栅格数,AGPS-MR频段2.1G-弱栅格占比,AGPS-MR频段2.6G-记录数,AGPS-MR频段2.6G-RSRP均值,AGPS-MR频段2.6G-95记录数,AGPS-MR频段2.6G-95覆盖率,AGPS-MR频段2.6G-100记录数,AGPS-MR频段2.6G-100覆盖率,AGPS-MR频段2.6G-105记录数,AGPS-MR频段2.6G-105覆盖率,AGPS-MR频段2.6G-110记录数,AGPS-MR频段2.6G-110覆盖率,AGPS-MR频段2.6G-115记录数,AGPS-MR频段2.6G-115覆盖率,AGPS-MR频段2.6G-弱栅格数,AGPS-MR频段2.6G-总栅格数,AGPS-MR频段2.6G-弱栅格占比,全量MR覆盖最优记录数,全量MR覆盖最优RSRP均值,全量MR覆盖最优95记录数,全量MR覆盖最优95覆盖率,全量MR覆盖最优100记录数,全量MR覆盖最优100覆盖率,全量MR覆盖最优105记录数,全量MR覆盖最优105覆盖率,全量MR覆盖最优110记录数,全量MR覆盖最优110覆盖率,全量MR覆盖最优115记录数,全量MR覆盖最优115覆盖率,全量MR覆盖最优弱栅格数,全量MR覆盖最优总栅格数,全量MR覆盖最优弱栅格占比,全量MR规划最优记录数,全量MR规划最优RSRP均值,全量MR规划最优95记录数,全量MR规划最优95覆盖率,全量MR规划最优100记录数,全量MR规划最优100覆盖率,全量MR规划最优105记录数,全量MR规划最优105覆盖率,全量MR规划最优110记录数,全量MR规划最优110覆盖率,全量MR规划最优115记录数,全量MR规划最优115覆盖率,全量MR规划最优弱栅格数,全量MR规划最优总栅格数,全量MR规划最优弱栅格占比,全量MR主接入记录数,全量MR主接入RSRP均值,全量MR主接入95记录数,全量MR主接入95覆盖率,全量MR主接入100记录数,全量MR主接入100覆盖率,全量MR主接入105记录数,全量MR主接入105覆盖率,全量MR主接入110记录数,全量MR主接入110覆盖率,全量MR主接入115记录数,全量MR主接入115覆盖率,全量MR主接入弱栅格数,全量MR主接入总栅格数,全量MR主接入弱栅格占比,全量MR频段800M-记录数,全量MR频段800M-RSRP均值,全量MR频段800M-95记录数,全量MR频段800M-95覆盖率,全量MR频段800M-100记录数,全量MR频段800M-100覆盖率,全量MR频段800M-105记录数,全量MR频段800M-105覆盖率,全量MR频段800M-110记录数,全量MR频段800M-110覆盖率,全量MR频段800M-115记录数,全量MR频段800M-115覆盖率,全量MR频段800M-弱栅格数,全量MR频段800M-总栅格数,全量MR频段800M-弱栅格占比,全量MR频段1.8G-记录数,全量MR频段1.8G-RSRP均值,全量MR频段1.8G-95记录数,全量MR频段1.8G-95覆盖率,全量MR频段1.8G-100记录数,全量MR频段1.8G-100覆盖率,全量MR频段1.8G-105记录数,全量MR频段1.8G-105覆盖率,全量MR频段1.8G-110记录数,全量MR频段1.8G-110覆盖率,全量MR频段1.8G-115记录数,全量MR频段1.8G-115覆盖率,全量MR频段1.8G-弱栅格数,全量MR频段1.8G-总栅格数,全量MR频段1.8G-弱栅格占比,全量MR频段2.1G-记录数,全量MR频段2.1G-RSRP均值,全量MR频段2.1G-95记录数,全量MR频段2.1G-95覆盖率,全量MR频段2.1G-100记录数,全量MR频段2.1G-100覆盖率,全量MR频段2.1G-105记录数,全量MR频段2.1G-105覆盖率,全量MR频段2.1G-110记录数,全量MR频段2.1G-110覆盖率,全量MR频段2.1G-115记录数,全量MR频段2.1G-115覆盖率,全量MR频段2.1G-弱栅格数,全量MR频段2.1G-总栅格数,全量MR频段2.1G-弱栅格占比,全量MR频段2.6G-记录数,全量MR频段2.6G-RSRP均值,全量MR频段2.6G-95记录数,全量MR频段2.6G-95覆盖率,全量MR频段2.6G-100记录数,全量MR频段2.6G-100覆盖率,全量MR频段2.6G-105记录数,全量MR频段2.6G-105覆盖率,全量MR频段2.6G-110记录数,全量MR频段2.6G-110覆盖率,全量MR频段2.6G-115记录数,全量MR频段2.6G-115覆盖率,全量MR频段2.6G-弱栅格数,全量MR频段2.6G-总栅格数,全量MR频段2.6G-弱栅格占比";
        }

        let tableObj = {
            divId: 'tableParentDiv',
            tableId: "tableId",
            tableHead: title,
            pageObj: {pageFlag: 1, pageSize: 20},
            frontFlag: 1,
            Data:TableDetailData
            // clnObj: clnObj
        };

        IntelligentRoadTestChart.vm.tableObj = tableObj;
        let table = new TableToolsNewTwo();
        table.submit(tableObj);
    }
}

tableDataProcessForVueComponent.sectorTableDataProcess = function (data) {
    if(data.result.length > 0){
        let result = callBackChangeData(data);
        let TableDetailData = {};

        TableDetailData.columns = ["1", "2"];
        TableDetailData.result = [];
        result.forEach( t => {
            let dataArrs = [];
            for(o in t){
                dataArrs.push(t[o]);
            }
            TableDetailData.result.push(dataArrs);
        })

        if(TableDetailData.result.length == 0){
            TableDetailData.result = [[]];
        }

        let tableObj = {
            divId: 'tableParentDiv',
            tableId: "tableId",
            tableHead: "地市,区县,营服,基站ID,小区ID,小区名称,AGPS-MR覆盖最优记录数,AGPS-MR覆盖最优RSRP均值,AGPS-MR覆盖最优95记录数,AGPS-MR覆盖最优95覆盖率,AGPS-MR覆盖最优100记录数,AGPS-MR覆盖最优100覆盖率,AGPS-MR覆盖最优105记录数,AGPS-MR覆盖最优105覆盖率,AGPS-MR覆盖最优110记录数,AGPS-MR覆盖最优110覆盖率,AGPS-MR覆盖最优115记录数,AGPS-MR覆盖最优115覆盖率,AGPS-MR覆盖最优弱栅格数,AGPS-MR覆盖最优总栅格数,AGPS-MR覆盖最优弱栅格占比,AGPS-MR规划最优记录数,AGPS-MR规划最优RSRP均值,AGPS-MR规划最优95记录数,AGPS-MR规划最优95覆盖率,AGPS-MR规划最优100记录数,AGPS-MR规划最优100覆盖率,AGPS-MR规划最优105记录数,AGPS-MR规划最优105覆盖率,AGPS-MR规划最优110记录数,AGPS-MR规划最优110覆盖率,AGPS-MR规划最优115记录数,AGPS-MR规划最优115覆盖率,AGPS-MR规划最优弱栅格数,AGPS-MR规划最优总栅格数,AGPS-MR规划最优弱栅格占比,AGPS-MR主接入记录数,AGPS-MR主接入RSRP均值,AGPS-MR主接入95记录数,AGPS-MR主接入95覆盖率,AGPS-MR主接入100记录数,AGPS-MR主接入100覆盖率,AGPS-MR主接入105记录数,AGPS-MR主接入105覆盖率,AGPS-MR主接入110记录数,AGPS-MR主接入110覆盖率,AGPS-MR主接入115记录数,AGPS-MR主接入115覆盖率,AGPS-MR主接入弱栅格数,AGPS-MR主接入总栅格数,AGPS-MR主接入弱栅格占比,全量MR覆盖最优记录数,全量MR覆盖最优RSRP均值,全量MR覆盖最优95记录数,全量MR覆盖最优95覆盖率,全量MR覆盖最优100记录数,全量MR覆盖最优100覆盖率,全量MR覆盖最优105记录数,全量MR覆盖最优105覆盖率,全量MR覆盖最优110记录数,全量MR覆盖最优110覆盖率,全量MR覆盖最优115记录数,全量MR覆盖最优115覆盖率,全量MR覆盖最优弱栅格数,全量MR覆盖最优总栅格数,全量MR覆盖最优弱栅格占比,全量MR规划最优记录数,全量MR规划最优RSRP均值,全量MR规划最优95记录数,全量MR规划最优95覆盖率,全量MR规划最优100记录数,全量MR规划最优100覆盖率,全量MR规划最优105记录数,全量MR规划最优105覆盖率,全量MR规划最优110记录数,全量MR规划最优110覆盖率,全量MR规划最优115记录数,全量MR规划最优115覆盖率,全量MR规划最优弱栅格数,全量MR规划最优总栅格数,全量MR规划最优弱栅格占比,全量MR主接入记录数,全量MR主接入RSRP均值,全量MR主接入95记录数,全量MR主接入95覆盖率,全量MR主接入100记录数,全量MR主接入100覆盖率,全量MR主接入105记录数,全量MR主接入105覆盖率,全量MR主接入110记录数,全量MR主接入110覆盖率,全量MR主接入115记录数,全量MR主接入115覆盖率,全量MR主接入弱栅格数,全量MR主接入总栅格数,全量MR主接入弱栅格占比",
            pageObj: {pageFlag: 1, pageSize: 20},
            frontFlag: 1,
            Data:TableDetailData
            // clnObj: clnObj
        };
        IntelligentRoadTestChart.vm.tableObj = tableObj;
        let table = new TableToolsNewTwo();
        table.submit(tableObj);
    }
}

tableDataProcessForVueComponent.allAreaTableDataProcess = function (data) {
    if(data.result.length > 0){
        let result = callBackChangeData(data);
        let TableDetailData = {};

        TableDetailData.columns = ["1", "2"];
        TableDetailData.result = [];
        result.forEach( t => {
            let dataArrs = [];
            for(o in t){
                dataArrs.push(t[o]);
            }
            TableDetailData.result.push(dataArrs);
        })

        if(TableDetailData.result.length == 0){
            TableDetailData.result = [[]];
        }

        let tableObj = {
            divId: 'tableParentDiv',
            tableId: "tableId",
            tableHead: "地市,区县,营服,AGPS-MR覆盖最优记录数,AGPS-MR覆盖最优RSRP均值,AGPS-MR覆盖最优95记录数,AGPS-MR覆盖最优95覆盖率,AGPS-MR覆盖最优100记录数,AGPS-MR覆盖最优100覆盖率,AGPS-MR覆盖最优105记录数,AGPS-MR覆盖最优105覆盖率,AGPS-MR覆盖最优110记录数,AGPS-MR覆盖最优110覆盖率,AGPS-MR覆盖最优115记录数,AGPS-MR覆盖最优115覆盖率,AGPS-MR覆盖最优弱栅格数,AGPS-MR覆盖最优总栅格数,AGPS-MR覆盖最优弱栅格占比,AGPS-MR规划最优记录数,AGPS-MR规划最优RSRP均值,AGPS-MR规划最优95记录数,AGPS-MR规划最优95覆盖率,AGPS-MR规划最优100记录数,AGPS-MR规划最优100覆盖率,AGPS-MR规划最优105记录数,AGPS-MR规划最优105覆盖率,AGPS-MR规划最优110记录数,AGPS-MR规划最优110覆盖率,AGPS-MR规划最优115记录数,AGPS-MR规划最优115覆盖率,AGPS-MR规划最优弱栅格数,AGPS-MR规划最优总栅格数,AGPS-MR规划最优弱栅格占比,AGPS-MR主接入记录数,AGPS-MR主接入RSRP均值,AGPS-MR主接入95记录数,AGPS-MR主接入95覆盖率,AGPS-MR主接入100记录数,AGPS-MR主接入100覆盖率,AGPS-MR主接入105记录数,AGPS-MR主接入105覆盖率,AGPS-MR主接入110记录数,AGPS-MR主接入110覆盖率,AGPS-MR主接入115记录数,AGPS-MR主接入115覆盖率,AGPS-MR主接入弱栅格数,AGPS-MR主接入总栅格数,AGPS-MR主接入弱栅格占比,AGPS-MR频段800M-记录数,AGPS-MR频段800M-RSRP均值,AGPS-MR频段800M-95记录数,AGPS-MR频段800M-95覆盖率,AGPS-MR频段800M-100记录数,AGPS-MR频段800M-100覆盖率,AGPS-MR频段800M-105记录数,AGPS-MR频段800M-105覆盖率,AGPS-MR频段800M-110记录数,AGPS-MR频段800M-110覆盖率,AGPS-MR频段800M-115记录数,AGPS-MR频段800M-115覆盖率,AGPS-MR频段800M-弱栅格数,AGPS-MR频段800M-总栅格数,AGPS-MR频段800M-弱栅格占比,AGPS-MR频段1.8G-记录数,AGPS-MR频段1.8G-RSRP均值,AGPS-MR频段1.8G-95记录数,AGPS-MR频段1.8G-95覆盖率,AGPS-MR频段1.8G-100记录数,AGPS-MR频段1.8G-100覆盖率,AGPS-MR频段1.8G-105记录数,AGPS-MR频段1.8G-105覆盖率,AGPS-MR频段1.8G-110记录数,AGPS-MR频段1.8G-110覆盖率,AGPS-MR频段1.8G-115记录数,AGPS-MR频段1.8G-115覆盖率,AGPS-MR频段1.8G-弱栅格数,AGPS-MR频段1.8G-总栅格数,AGPS-MR频段1.8G-弱栅格占比,AGPS-MR频段2.1G-记录数,AGPS-MR频段2.1G-RSRP均值,AGPS-MR频段2.1G-95记录数,AGPS-MR频段2.1G-95覆盖率,AGPS-MR频段2.1G-100记录数,AGPS-MR频段2.1G-100覆盖率,AGPS-MR频段2.1G-105记录数,AGPS-MR频段2.1G-105覆盖率,AGPS-MR频段2.1G-110记录数,AGPS-MR频段2.1G-110覆盖率,AGPS-MR频段2.1G-115记录数,AGPS-MR频段2.1G-115覆盖率,AGPS-MR频段2.1G-弱栅格数,AGPS-MR频段2.1G-总栅格数,AGPS-MR频段2.1G-弱栅格占比,AGPS-MR频段2.6G-记录数,AGPS-MR频段2.6G-RSRP均值,AGPS-MR频段2.6G-95记录数,AGPS-MR频段2.6G-95覆盖率,AGPS-MR频段2.6G-100记录数,AGPS-MR频段2.6G-100覆盖率,AGPS-MR频段2.6G-105记录数,AGPS-MR频段2.6G-105覆盖率",
            pageObj: {pageFlag: 1, pageSize: 20},
            frontFlag: 1,
            Data:TableDetailData
            // clnObj: clnObj
        };
        IntelligentRoadTestChart.vm.tableObj = tableObj;
        let table = new TableToolsNewTwo();
        table.submit(tableObj);
    }
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
tableDataProcessForVueComponent.tableExport = function(fileName,sheetName,tableObj) {
    var obj = {
        fileName: fileName,
        dataType: 3,
        paraLists: [
            {
                sheetName: sheetName,
                titleName: tableObj.thead.split(','),
                mergeTitle: [],
                templateId: tableObj.sql.splice(0,1)+'',
                templatePara: tableObj.sql,
                // tableData:MobilePerceptionVsl.tableDataExport
            }
        ]
    };
    var exportExcel = new exportExcelNew(obj);
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
    let wopts = { bookType:'xlsx', type:'binary' };
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    const wbout = XLSX.write(wb, wopts);
    saveAs(new Blob([s2ab(wbout)]), fileName); // 保存为文件
}
function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    };
    return buf;
}
