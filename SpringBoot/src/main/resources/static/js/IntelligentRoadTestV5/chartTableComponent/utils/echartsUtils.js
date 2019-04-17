var echartUtil = {};

echartUtil.HSRailData = [];

/**********************************
 * @funcname initChart
 * @funcdesc 初始化图表
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-05-11 10:47
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.initChart = function(){
    if(IntelligentRoadTestChart.vm.chartObj != null){
        IntelligentRoadTestChart.vm.chartObj.dispose();
        IntelligentRoadTestChart.vm.chartObj = echarts.init(document.getElementById('allRegionChart'));
    }else{
        IntelligentRoadTestChart.vm.chartObj = echarts.init(document.getElementById('allRegionChart'));
    }
    IntelligentRoadTestChart.vm.chartObj.showLoading();
}
/**********************************
 * @funcname initChart
 * @funcdesc 初始化图表2
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-05-11 10:47
 * @modifier
 * @modify
 ***********************************/
echartUtil.initChart2 = function(){
    if(IntelligentRoadTestChart.vm.chartObj2 != null){
        IntelligentRoadTestChart.vm.chartObj2.dispose();
        IntelligentRoadTestChart.vm.chartObj2 = echarts.init(document.getElementById('allRegionChart2'));
        IntelligentRoadTestChart.vm.chartObj2.showLoading();
    }else{
        if(document.getElementById('allRegionChart2') != null){
            IntelligentRoadTestChart.vm.chartObj2 = echarts.init(document.getElementById('allRegionChart2'));
            IntelligentRoadTestChart.vm.chartObj2.showLoading();
        }
    }
}

/**********************************
 * @funcname loadChartData
 * @funcdesc 加载图表
 * @param city 地市
 * @param district 区县
 * @param market 营服
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-26 11:23
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.loadChartData = function(city,district,market){
    echartUtil.initChart();
    // 统计对象
    var objectType = IntelligentRoadTestChart.vm.statistical;

    if(objectType == '工单'){
        echartUtil.loadWorkOrderChart();
    }else if($.inArray(objectType,['弱区','上行低速区','下行低速区','MOD3干扰区','越区覆盖区','重叠覆盖区']) > -1){
        echartUtil.getWeakPoorChart(city,district,market);
    }else{
        echartUtil.getChartData(city,district,market);
    }
}
/**********************************
 * @funcname loadChartData2
 * @funcdesc 中间的图表
 * @param day 结束日期
 * @return {datatype}
 * @author laijunbao
 * @create 2018-07-30-0030 14:34
 * @modifier
 * @modify
 ***********************************/
echartUtil.loadChartData2 = function(day){
    echartUtil.initChart2();
    // 统计对象
    var objectType = IntelligentRoadTestChart.vm.statistical;

    if(objectType == '工单'){
        echartUtil.loadWorkOrderChart();
    }else if($.inArray(objectType,['弱区','上行低速区','下行低速区','MOD3干扰区','越区覆盖区','重叠覆盖区']) > -1){
        echartUtil.getWeakPoorChart2(day);
    }else{
        echartUtil.getChartData2(day);
    }
}

/**********************************
 * @funcname getChartData
 * @funcdesc 获取图表数据（五高。。）
 * @param city 地市
 * @param district 区县
 * @param market 营服
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-17 11:38
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.getChartData = function(city,district,market){
    var list = echartUtil.getSql(city,district,market);
    function successCallback(data,par) {
        echartUtil.dataProcess(data);
        IntelligentRoadTestChart.vm.chartObj.hideLoading();
    }
    var progressBarSqls = [];
    var functionlist = [successCallback];
    progressBarSqls.push(list);
    progressbarTwo.submitSql(progressBarSqls, functionlist, [3]);
}
/**********************************
 * @funcname getChartData2
 * @funcdesc 中间的图表
 * @param day 结束日期
 * @return {datatype}
 * @author laijunbao
 * @create 2018-07-30-0030 14:27
 * @modifier
 * @modify
 ***********************************/
echartUtil.getChartData2 = function(day){
    var list = echartUtil.getSql(undefined,undefined,undefined,"level2",day);
    function successCallback(data,par) {
        echartUtil.dataProcess2(data);
        IntelligentRoadTestChart.vm.chartObj2.hideLoading();
    }
    var progressBarSqls = [];
    var functionlist = [successCallback];
    progressBarSqls.push(list);
    progressbarTwo.submitSql(progressBarSqls, functionlist, [3]);
}

/**********************************
 * @funcname getSql
 * @funcdesc 拼接查询sql
 * @param city 地市
 * @param district 区县
 * @param market 营服
 * @param type 中间的图表
 * @param day 结束日期
 * @return list sql字符串
 * @author laijunbao
 * @create 2018-04-25 22:45
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.getSql = function(city,district,market,type,day){
    var factory = IntelligentRoadTestChart.vm.factory;
    if(type != undefined){
        factory = IntelligentRoadTestChart.vm.factory2;
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

    if(type == "level2"){
        bestOrsc  = IntelligentRoadTestChart.vm.bestOrsc2;
        threshold  = IntelligentRoadTestChart.vm.thresholdVal2;
    }
    var list = [];
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
        if(type != undefined){
            list.push('StatisticsDL_MRSatCellImg_city');
        }else{
            list.push('StatisticsDL_MRSatCellImg');
        }
        if(factory != '全部' && factory != '其他'){
            list.push(`FACTORY_CONDITION:and factory='${factory}'`);
        }else if(factory == '其他'){
            list.push(`FACTORY_CONDITION:and factory not in ('华为','中兴','爱立信')`);
        }else if(factory == '全部'){
            list.push(`FACTORY_CONDITION:`);
        }
    }else if(objectType == '全区域'){
        if(type != undefined){
            list.push('StatisticsDL_MRSatAllAreaImg_city');
        }else{
            list.push('StatisticsDL_MRSatAllAreaImg');
        }
    }else if($.inArray(objectType,['高速','市政路']) > -1){
        if(type != undefined){
            list.push('StatisticsDL_MRSatSceneImg_city');
        }else{
            list.push('StatisticsDL_MRSatSceneImg_time');
        }
        if(objectType == '高速'){
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '高速'`);
        }else{
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '市政路'`);
        }
    }else if(objectType == '高铁'){
        list.push('StatisticsDL_HSRail_01');
        if(type != undefined){
            list.push("ROAD_NAME_CONDITION:AND road_name = '" + IntelligentRoadTestChart.vm.roadName + "'")
        }
    }else if(objectType == '地铁'){
        list.push('StatisticsDL_MRSubway_Img');
    }else{
        if(type != undefined){
            list.push('StatisticsDL_MRSatSceneImg_city');
        }else{
            list.push('StatisticsDL_MRSatSceneImg_time');
        }
        if(objectType == '战狼区域'){
            list.push(`ZLQY_CONDITION:AND ZLQY_FLAG = 1`);
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '高流量商务区'`)
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
        list.push(`CITY:CITY`);
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
    if(city != '全省' && city != '其他' && district == '全市'){
        list.push(`CITY:COUNTRY`);
    }else{
        list.push(`CITY:MKTCENTER`);
    }
    if(objectType == "高铁"){
        if(type != undefined){
            list.push(`START_TIME:${dayComponetUtil.chart2StartDate}`);
            list.push(`END_TIME:${dayComponetUtil.chart2EndDate}`);
        }else{
            list.push(`START_TIME:${dayComponetUtil.chart1StartDate}`);
            list.push(`END_TIME:${dayComponetUtil.chart1EndDate}`);
        }
        list.push(`STATCYCLE:${table}`);
    }else{
        list.push(`START_TIME:${urlStartDay}`);
        list.push(`END_TIME:${urlEndDay}`);
    }

    return list;
}

/**********************************
 * @funcname dataProcess
 * @funcdesc 图表数据处理
 * @param data: 查询回来的数据
 * @return
 * @author laijunbao
 * @create 2018-04-17 11:38
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.dataProcess = function(data,flag){
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    var objectType = IntelligentRoadTestChart.vm.statistical;

    // 开始时间和结束时间之间的日期
    var xDatas = echartUtil.getStartAndEndDay();
    IntelligentRoadTestChart.xDatas = xDatas;

    // 开始时间和结束时间之间的日期
    var xDatas2 = echartUtil.getStartAndEndDay('MMdd');
    
    var isDate = 'day';
    if(dateCycle == '月'){
        isDate = 'month';
    }
    // }else{
    //     xDatas = echartUtil.getDates(urlEndDay,dateCycle);
    // }
    // 记录数
    var mrCnt = [];
    var agpsmrCnt = [];

    var agpsMrEnbCnt = [];
    var mrEnbCnt = [];
    var agpsMrCellCnt = [];
    var mrCellCnt = [];

    var mrIndoorCnt = [];
    var mrOutdoorCnt = [];
    //覆盖率
    var mrRate = [];
    var agpsmrRate = [];

    var agps_mr_rate = {};
    var agps_mr_cnt = {};
    var mr_rate = {};
    var mr_cnt = {};

    var mrIndoorRate = [];
    var mrOutdoorRate = [];

    // 扇区基站数和扇区数
    var agps_mr_enb_cnt = {};
    var mr_enb_cnt = {};
    var agps_mr_cell_cnt = {};
    var mr_cell_cnt = {};

    var mr_indoor_cnt = {};
    var mr_outdoor_cnt = {};
    var mr_indoor_rate = {};
    var mr_outdoor_rate = {};

    var agpsTypeFor0 = null;
    var agpsTypeFor1 = null;
    var agpsTypeFor2 = null;
    var agpsTypeFor3 = null;

    // **** 高铁统计图指标 ****
    // 全量MR数
    var rsrp_cnt_sum_arr = [];
    // 达标里程
    var qulified_length_arr = [];
    // 未达标里程
    var unqualified_length_arr = [];
    // 脱网里程
    var out_neted_length_arr = [];
    // 全量MR数
    var rsrp_cnt_sum_obj = {};
    // 达标里程
    var qulified_length_obj = {};
    // 未达标里程
    var unqualified_length_obj = {};
    // 脱网里程
    var out_neted_length_obj = {};

    xDatas.forEach(function(d) {
        agps_mr_rate[d] = 0;
        agps_mr_cnt[d] = 0;
        mr_rate[d] = 0;
        mr_cnt[d] = 0;

        agps_mr_enb_cnt[d] = 0;
        mr_enb_cnt[d] = 0;
        agps_mr_cell_cnt[d] = 0;
        mr_cell_cnt[d] = 0;

        mr_indoor_cnt[d] = 0;
        mr_outdoor_cnt[d] = 0;
        mr_indoor_rate[d] = 0;
        mr_outdoor_rate[d] = 0;

        rsrp_cnt_sum_obj[d] = 0;
        qulified_length_obj[d] = 0;
        unqualified_length_obj[d] = 0;
        out_neted_length_obj[d] = 0;
    });
    if($.inArray(objectType,["高铁"]) > -1){
        var result = callBackChangeData(data);
        echartUtil.HSRailDataWithChart1 = result;
        var extendObj = {
            dataObj: {
                rsrp_cnt_sum_obj: rsrp_cnt_sum_obj,
                qulified_length_obj: qulified_length_obj,
                unqualified_length_obj: unqualified_length_obj,
                out_neted_length_obj: out_neted_length_obj,
            },
            isDate: isDate,
            xDatas: xDatas,
            xDatas2: xDatas2
        };
        echartUtil.HSRailExtendObjWithChart1 = extendObj;
        var resultObj = echartUtil.HSRailDataHandler(result,IntelligentRoadTestChart.vm.sence1,extendObj);
        echartUtil.showSceneChart(IntelligentRoadTestChart.vm.chartObj,xDatas2,
            null,
            null,
            null,
            null,undefined,resultObj);
    }else if($.inArray(objectType,["地铁"]) > -1){
        var result = callBackChangeData(data);
        result.forEach( function(that) {
            for(m in mr_cnt){
                if(m == that[isDate]+""){
                    mr_cnt[m] = that.rsrp_cnt;
                    mr_rate[m] = that.rsrp_rate;
                }
            }
        })
    }else{
        // agps_type 0是全量的数据数组，1是agps的数据数组
        agpsTypeFor0 = echartUtil.crossfilterData(data)[0];
        agpsTypeFor1 = echartUtil.crossfilterData(data)[1];
        agpsTypeFor2 = echartUtil.crossfilterData(data)[2];
        agpsTypeFor3 = echartUtil.crossfilterData(data)[3];
        agpsTypeFor0.forEach( function(that) {
            for(m in mr_cnt){
                if(m == that[isDate]+""){
                    mr_cnt[m] = that.rsrp_cnt;
                    mr_rate[m] = that.rsrp_rate;
                    mr_enb_cnt[m] = that.enb_cnt;
                    mr_cell_cnt[m] = that.cell_cnt;
                }
            }
        })
        agpsTypeFor1.forEach(function(that) {
            for(m in agps_mr_cnt){
                if(m == that[isDate]+""){
                    agps_mr_cnt[m] = that.rsrp_cnt;
                    agps_mr_rate[m] = that.rsrp_rate;
                    agps_mr_enb_cnt[m] = that.enb_cnt;
                    agps_mr_cell_cnt[m] = that.cell_cnt;
                }
            }
        })
        // 全量MR室内
        agpsTypeFor2.forEach( function(that) {
            for(m in mr_cnt){
                if(m == that[isDate]+""){
                    mr_indoor_cnt[m] = that.rsrp_cnt;
                    mr_indoor_rate[m] = that.rsrp_rate;
                }
            }
        })
        // 全量MR室外
        agpsTypeFor3.forEach(function(that) {
            for(m in agps_mr_cnt){
                if(m == that[isDate]+""){
                    mr_outdoor_cnt[m] = that.rsrp_cnt;
                    mr_outdoor_rate[m] = that.rsrp_rate;
                }
            }
        })
    }

    if($.inArray(objectType,["高铁"]) < 0){
        // 根据 对象的key和图表x轴值数组相等，得出日期对应的值
        mrCnt = echartUtil.forObj(xDatas,mr_cnt);
        mrRate = echartUtil.forObj(xDatas,mr_rate);
        agpsmrCnt = echartUtil.forObj(xDatas,agps_mr_cnt);
        agpsmrRate = echartUtil.forObj(xDatas,agps_mr_rate);
        agpsMrEnbCnt = echartUtil.forObj(xDatas,agps_mr_enb_cnt);
        mrEnbCnt = echartUtil.forObj(xDatas,mr_enb_cnt);
        agpsMrCellCnt = echartUtil.forObj(xDatas,agps_mr_cell_cnt);
        mrCellCnt = echartUtil.forObj(xDatas,mr_cell_cnt);
        mrIndoorCnt = echartUtil.forObj(xDatas,mr_indoor_cnt);
        mrIndoorRate = echartUtil.forObj(xDatas,mr_indoor_rate);
        mrOutdoorCnt = echartUtil.forObj(xDatas,mr_outdoor_cnt);
        mrOutdoorRate = echartUtil.forObj(xDatas,mr_outdoor_rate);

        var extendObj = {};
        if(objectType == "扇区"){
            extendObj = {
                agpsMrEnbCnt: agpsMrEnbCnt,
                mrEnbCnt: mrEnbCnt,
                agpsMrCellCnt: agpsMrCellCnt,
                mrCellCnt: mrCellCnt
            }
        }else if($.inArray(objectType,['全区域','高校','场馆','美食','美景','高密度住宅区','高流量商务区','战狼区域','农贸市场','中小学','城中村']) > -1){
            extendObj = {
                mrIndoorCnt: mrIndoorCnt,
                mrIndoorRate: mrIndoorRate,
                mrOutdoorCnt: mrOutdoorCnt,
                mrOutdoorRate: mrOutdoorRate
            }
        }

        echartUtil.showSceneChart(IntelligentRoadTestChart.vm.chartObj,xDatas2,mrCnt,agpsmrCnt,mrRate,agpsmrRate,undefined,extendObj);
    }


}
/**********************************
 * @funcname dataProcess2
 * @funcdesc 图表2数据处理
 * @param data: 查询回来的数据
 * @return
 * @author laijunbao
 * @create 2018-04-17 11:38
 * @modifier
 * @modify
 ***********************************/
echartUtil.dataProcess2 = function(data,flag){
    var objectType = IntelligentRoadTestChart.vm.statistical;

    // 下标0是全量的数据数组，1是agps的数据数组
    var agpsTypeFor0 = echartUtil.crossfilterData(data)[0];
    var agpsTypeFor1 = echartUtil.crossfilterData(data)[1];
    var agpsTypeFor2 = echartUtil.crossfilterData(data)[2];
    var agpsTypeFor3 = echartUtil.crossfilterData(data)[3];

    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    var cityFlag = IntelligentRoadTestChart.vm.cityFlag;
    var district = IntelligentRoadTestChart.vm.district;

    // 开始时间和结束时间之间的日期
    var xDatas = echartUtil.getStartAndEndDay();
    var xDatas2 = echartUtil.getStartAndEndDay('MMdd');
    IntelligentRoadTestChart.xDatas2 = xDatas;
    var mrCnt = [];
    var agpsmrCnt = [];

    var agpsMrEnbCnt = [];
    var mrEnbCnt = [];
    var agpsMrCellCnt = [];
    var mrCellCnt = [];

    var mrIndoorCnt = [];
    var mrOutdoorCnt = [];

    //覆盖率
    var mrRate = [];
    var agpsmrRate = [];

    var mrIndoorRate = [];
    var mrOutdoorRate = [];

    var agps_mr_rate = {};
    var agps_mr_cnt = {};
    var mr_rate = {};
    var mr_cnt = {};

    var agps_mr_enb_cnt = {};
    var mr_enb_cnt = {};
    var agps_mr_cell_cnt = {};
    var mr_cell_cnt = {};

    var mr_indoor_cnt = {};
    var mr_outdoor_cnt = {};
    var mr_indoor_rate = {};
    var mr_outdoor_rate = {};

    var fetchStr = 'city';
    if(cityFlag != '全省' && cityFlag != '其他'){
        fetchStr = 'country';
    }
    if(district != '全市' && district != '其他'){
        fetchStr = 'mktcenter';
    }
    if($.inArray(objectType,["高铁"]) > -1){
        // **** 高铁统计图指标 ****
        // 全量MR数
        var rsrp_cnt_sum_arr = [];
        // 达标里程
        var qulified_length_arr = [];
        // 未达标里程
        var unqualified_length_arr = [];
        // 脱网里程
        var out_neted_length_arr = [];
        // 全量MR数
        var rsrp_cnt_sum_obj = {};
        // 达标里程
        var qulified_length_obj = {};
        // 未达标里程
        var unqualified_length_obj = {};
        // 脱网里程
        var out_neted_length_obj = {};

        var isDate = 'day';
        if(dateCycle == '月'){
            isDate = 'month';
        }
        xDatas.forEach(function(d) {
            agps_mr_rate[d] = 0;
            agps_mr_cnt[d] = 0;
            mr_rate[d] = 0;
            mr_cnt[d] = 0;

            agps_mr_enb_cnt[d] = 0;
            mr_enb_cnt[d] = 0;
            agps_mr_cell_cnt[d] = 0;
            mr_cell_cnt[d] = 0;

            mr_indoor_cnt[d] = 0;
            mr_outdoor_cnt[d] = 0;
            mr_indoor_rate[d] = 0;
            mr_outdoor_rate[d] = 0;

            rsrp_cnt_sum_obj[d] = 0;
            qulified_length_obj[d] = 0;
            unqualified_length_obj[d] = 0;
            out_neted_length_obj[d] = 0;
        });
        var result = callBackChangeData(data);
        echartUtil.HSRailDataWithChart2 = result;
        var extendObj = {
            dataObj: {
                rsrp_cnt_sum_obj: rsrp_cnt_sum_obj,
                qulified_length_obj: qulified_length_obj,
                unqualified_length_obj: unqualified_length_obj,
                out_neted_length_obj: out_neted_length_obj,
            },
            isDate: isDate,
            xDatas: xDatas,
            xDatas2: xDatas2
        };
        echartUtil.HSRailExtendObjWithChart2 = extendObj;
        var resultObj = echartUtil.HSRailDataHandler(result,IntelligentRoadTestChart.vm.sence2,extendObj);
        echartUtil.showSceneChart(IntelligentRoadTestChart.vm.chartObj2,xDatas2,
            null,
            null,
            null,
            null,true,resultObj);
    }else{
        xDatas = [];
        if(agpsTypeFor0.length != 0){
            agpsTypeFor0.forEach(function(d) {
                agps_mr_rate[d[fetchStr]] = 0;
                agps_mr_cnt[d[fetchStr]] = 0;
                mr_rate[d[fetchStr]] = 0;
                mr_cnt[d[fetchStr]] = 0;
                mr_enb_cnt[d[fetchStr]] = 0;
                mr_cell_cnt[d[fetchStr]] = 0;

                mr_indoor_cnt[d[fetchStr]] = 0;
                mr_outdoor_cnt[d[fetchStr]] = 0;
                mr_indoor_rate[d[fetchStr]] = 0;
                mr_outdoor_rate[d[fetchStr]] = 0;
                xDatas.push(d[fetchStr]);

            });
        }else{
            agpsTypeFor1.forEach(function(d) {
                agps_mr_rate[d[fetchStr]] = 0;
                agps_mr_cnt[d[fetchStr]] = 0;
                mr_rate[d[fetchStr]] = 0;
                mr_cnt[d[fetchStr]] = 0;
                agps_mr_enb_cnt[d[fetchStr]] = 0;
                agps_mr_cell_cnt[d[fetchStr]] = 0;

                mr_indoor_cnt[d[fetchStr]] = 0;
                mr_outdoor_cnt[d[fetchStr]] = 0;
                mr_indoor_rate[d[fetchStr]] = 0;
                mr_outdoor_rate[d[fetchStr]] = 0;
                xDatas.push(d[fetchStr]);

            });
        }


        agpsTypeFor0.forEach( function(that) {
            for(m in mr_cnt){
                if(m == that[fetchStr]){
                    mr_cnt[m] = that.rsrp_cnt;
                    mr_rate[m] = that.rsrp_rate;
                    mr_enb_cnt[m] = that.enb_cnt;
                    mr_cell_cnt[m] = that.cell_cnt;
                }
            }
        })
        agpsTypeFor1.forEach(function(that) {
            for(m in agps_mr_cnt){
                if(m == that[fetchStr]){
                    agps_mr_cnt[m] = that.rsrp_cnt;
                    agps_mr_rate[m] = that.rsrp_rate;
                    agps_mr_enb_cnt[m] = that.enb_cnt;
                    agps_mr_cell_cnt[m] = that.cell_cnt;
                }
            }
        })
        // 全量MR室内
        agpsTypeFor2.forEach( function(that) {
            for(m in mr_cnt){
                if(m == that[fetchStr]){
                    mr_indoor_cnt[m] = that.rsrp_cnt;
                    mr_indoor_rate[m] = that.rsrp_rate;
                }
            }
        })
        // 全量MR室外
        agpsTypeFor3.forEach(function(that) {
            for(m in agps_mr_cnt){
                if(m == that[fetchStr]){
                    mr_outdoor_cnt[m] = that.rsrp_cnt;
                    mr_outdoor_rate[m] = that.rsrp_rate;
                }
            }
        })

        mrCnt = echartUtil.forObj(xDatas,mr_cnt);
        mrRate = echartUtil.forObj(xDatas,mr_rate);
        agpsmrCnt = echartUtil.forObj(xDatas,agps_mr_cnt);
        agpsmrRate = echartUtil.forObj(xDatas,agps_mr_rate);
        agpsMrEnbCnt = echartUtil.forObj(xDatas,agps_mr_enb_cnt);
        mrEnbCnt = echartUtil.forObj(xDatas,mr_enb_cnt);
        agpsMrCellCnt = echartUtil.forObj(xDatas,agps_mr_cell_cnt);
        mrCellCnt = echartUtil.forObj(xDatas,mr_cell_cnt);
        mrIndoorCnt = echartUtil.forObj(xDatas,mr_indoor_cnt);
        mrIndoorRate = echartUtil.forObj(xDatas,mr_indoor_rate);
        mrOutdoorCnt = echartUtil.forObj(xDatas,mr_outdoor_cnt);
        mrOutdoorRate = echartUtil.forObj(xDatas,mr_outdoor_rate);

        var extendObj = {};
        if(objectType == "扇区"){
            extendObj = {
                agpsMrEnbCnt: agpsMrEnbCnt,
                mrEnbCnt: mrEnbCnt,
                agpsMrCellCnt: agpsMrCellCnt,
                mrCellCnt: mrCellCnt
            }
        }else if($.inArray(objectType,['全区域','高校','场馆','美食','美景','高密度住宅区','高流量商务区','战狼区域','农贸市场','中小学','城中村']) > -1){
            extendObj = {
                mrIndoorCnt: mrIndoorCnt,
                mrIndoorRate: mrIndoorRate,
                mrOutdoorCnt: mrOutdoorCnt,
                mrOutdoorRate: mrOutdoorRate
            }
        }

        echartUtil.showSceneChart(IntelligentRoadTestChart.vm.chartObj2,xDatas,mrCnt,agpsmrCnt,mrRate,agpsmrRate,true,extendObj);
    }


}

/**********************************
 * @funcname forObj
 * @funcdesc 根据 对象的key和图表x轴值数组相等，得出日期对应的值
 * @param xData 图表x轴值数组
 * @param obj 指标对象
 * @return arr 图表x轴对应的值的数组
 * @author laijunbao
 * @create 2018-04-23 09:40
 * @modifier
 * @modify
 ***********************************/
echartUtil.forObj = function(xData,obj){
    var arr = [];
    xData.forEach(function (x) {
        Object.keys(obj).forEach(function (key) {
            if(key == x){
                arr.push(obj[key]==null?0:obj[key]);
            }
        })
    })
    return arr;
}


/**********************************
 * @funcname weakAreaDataProcess
 * @funcdesc 弱区图表数据处理
 * @param data 查回来的数据
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-23 09:40
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.weakAreaDataProcess = function(data,flag){
    // 下标0是全量的数据数组，1是agps的数据数组
    var result = callBackChangeData(data);
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    var xDatas = [];
    var format = 'MMdd';
    if(dateCycle == '月'){
        format = 'MM'
    }
    xDatas = echartUtil.getStartAndEndDay();
    var xDatas2 = echartUtil.getStartAndEndDay(format);

    var gridNum = [];
    var gridRate = [];
    xDatas.forEach(function(d) {
        result.forEach( function(that) {
            if(that.day == d){
                gridNum.push(that.poorgridsum);
                gridRate.push(that.gridrng);
            }
        })
    })

    echartUtil.showWeakPoorChart('allRegionChart',xDatas2,gridNum,gridRate);
}
/**********************************
 * @funcname getDates
 * @funcdesc 获取图表x轴
 * @param urlEndDay 结束日期
 * @param dateCycle 统计周期
 * @return datearr 图表x轴
 * @author laijunbao
 * @create 2018-04-17 14:45
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.getDates = function(urlEndDay,dateCycle){
    // urlEndDay = urlEndDay.substring(0, 4) + "-" + urlEndDay.substring(4, 6) + "-" + urlEndDay.substring(6, 8);
    var datearr = [];
    if(dateCycle == '月'){
        var current = new Date(urlEndDay);
        datearr = [parseInt(current.format('yyyyMM'))];
        for(var i=1;i<12;i++){
            current = new Date(urlEndDay);
            current.setMonth(current.getMonth()-i);
            datearr.push(parseInt(current.format('yyyyMM')))
        }
    }else{
        var current = new Date(urlEndDay);
        datearr = [parseInt(current.format('yyyyMMdd'))];
        for(var i=1;i<30;i++){
            current = new Date(urlEndDay);
            current.setDate(current.getDate()-i);
            datearr.push(parseInt(current.format('yyyyMMdd')))
        }
    }
    return datearr.reverse();
}

/**********************************
 * @funcname getStartAndEndDay
 * @funcdesc 图表时间改变后，获取开始时间和结束时间之间的日期
 * @param format 格式
 * @return dayArrs 开始时间和结束时间之间的日期数组
 * @author laijunbao
 * @create 2018-04-24 09:22
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.getStartAndEndDay = function(format){
    var urlStartDayCom = IntelligentRoadTestChart.vm.urlStartDay;
    var urlEndDayCom = IntelligentRoadTestChart.vm.urlEndDay;
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var daynum = echartUtil.DateMinus(urlStartDayCom,urlEndDayCom);
    var dayArrs = [];
    var endT = new Date(urlEndDayCom);

    if(dateCycle == '月'){
        urlStartDayCom = IntelligentRoadTestChart.vm.urlStartDay.substring(0, 7);
        urlEndDayCom = IntelligentRoadTestChart.vm.urlEndDay.substring(0, 7);
    }
    if(format == undefined){
        if(dateCycle == '月'){
            format = 'yyyyMM';
        }else{
            format = 'yyyyMMdd';
        }
    }else{
        if(dateCycle == '月'){
            format = 'yyyyMM';
        }
    }
    if(dateCycle == '月'){
        daynum = echartUtil.monthMinus(urlStartDayCom,urlEndDayCom);
        dayArrs.push(endT.format(format));
        for(var i=0; i<daynum; i++){
            endT.setMonth(endT.getMonth()-1);
            dayArrs.push(endT.format(format));
        }
    }else{
        dayArrs.push(endT.format(format));
        for(var i=0; i<daynum; i++){
            endT.setDate(endT.getDate()-1);
            dayArrs.push(endT.format(format));
        }
    }

    return dayArrs.reverse();

}
/**********************************
 * @funcname DateMinus
 * @funcdesc 计算日期相减天数
 * @param sDate:开始时间，eDate：结束时间，dates连续天数
 * @return {number} 天数
 * @author laijunbao
 * @create 2018/4/1 13:51
 * @modifier
 * @modify
 ***********************************/
// echartUtil.DateMinus = function(sDate,eDate){
//     var st = new Date(sDate);
//     var et = new Date(eDate);
//     var days = et.getTime() - st.getTime();
//     var day = parseInt(days / (1000 * 60 * 60 * 24));
//     return day;
// }
echartUtil.DateMinus = function(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式
    var  aDate,  oDate1,  oDate2,  iDays
    aDate  =  sDate1.split("-")
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
    aDate  =  sDate2.split("-")
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
    return  iDays
}

/**********************************
 * @funcname crossfilterData
 * @funcdesc crossfilter处理数据，用agps_type分类，0是全量的，1是agps的
 * @param data 查询回来的数据
 * @return arr 下标0是全量的数据数组，1是agps的数据数组
 * @author laijunbao
 * @create 2018-04-17 11:39
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.crossfilterData = function(data){
    var result = callBackChangeData(data);
    var CrossFilterObjFor1 = crossfilter([]);
    var CrossFilterObjFor0 = crossfilter([]);
    var CrossFilterObjFor2 = crossfilter([]);
    var CrossFilterObjFor3 = crossfilter([]);
    CrossFilterObjFor1.add(result);
    CrossFilterObjFor0.add(result);
    CrossFilterObjFor2.add(result);
    CrossFilterObjFor3.add(result);
    var CrossFilterObjByTotal1 = CrossFilterObjFor1.dimension(
        function(d) {
            return d.agps_type;
        }
    );
    var CrossFilterObjByTotal0 = CrossFilterObjFor0.dimension(
        function(d) {
            return d.agps_type;
        }
    );
    var CrossFilterObjByTotal2 = CrossFilterObjFor2.dimension(
        function(d) {
            return d.agps_type;
        }
    );
    var CrossFilterObjByTotal3 = CrossFilterObjFor3.dimension(
        function(d) {
            return d.agps_type;
        }
    );
    CrossFilterObjByTotal1.filter(function (d) {
        return d==1;
    })
    CrossFilterObjByTotal0.filter(function (d) {
        return d==0;
    })
    CrossFilterObjByTotal2.filter(function (d) {
        return d==2;
    })
    CrossFilterObjByTotal3.filter(function (d) {
        return d==3;
    })
    var agpsTypeFor1 = CrossFilterObjByTotal1.bottom(CrossFilterObjFor1.size());
    var agpsTypeFor0 = CrossFilterObjByTotal0.bottom(CrossFilterObjFor0.size());
    var agpsTypeFor2 = CrossFilterObjByTotal2.bottom(CrossFilterObjFor2.size());
    var agpsTypeFor3 = CrossFilterObjByTotal3.bottom(CrossFilterObjFor3.size());

    CrossFilterObjFor0.remove();
    CrossFilterObjFor1.remove();
    CrossFilterObjFor2.remove();
    CrossFilterObjFor3.remove();

    CrossFilterObjFor1.add(agpsTypeFor1);
    CrossFilterObjFor0.add(agpsTypeFor0);
    CrossFilterObjFor2.add(agpsTypeFor2);
    CrossFilterObjFor3.add(agpsTypeFor3);

    CrossFilterObjByTotal1 = CrossFilterObjFor1.dimension(
        function(d) {
            return d.day;
        }
    );
    CrossFilterObjByTotal0 = CrossFilterObjFor0.dimension(
        function(d) {
            return d.day;
        }
    );
    CrossFilterObjByTotal2 = CrossFilterObjFor2.dimension(
        function(d) {
            return d.day;
        }
    );
    CrossFilterObjByTotal3 = CrossFilterObjFor3.dimension(
        function(d) {
            return d.day;
        }
    );
    agpsTypeFor1 = CrossFilterObjByTotal1.bottom(CrossFilterObjFor1.size());
    agpsTypeFor0 = CrossFilterObjByTotal0.bottom(CrossFilterObjFor0.size());
    agpsTypeFor2 = CrossFilterObjByTotal2.bottom(CrossFilterObjFor2.size());
    agpsTypeFor3 = CrossFilterObjByTotal3.bottom(CrossFilterObjFor3.size());

    return [agpsTypeFor0,agpsTypeFor1,agpsTypeFor2,agpsTypeFor3];
}

/**********************************
 * @funcname loadWorkOrderChart
 * @funcdesc 工单图表
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-24 15:06
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.loadWorkOrderChart = function(){
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    urlStartDay = new Date(urlStartDay).format('yyyyMMdd');
    urlEndDay = new Date(urlEndDay).format('MMdd');
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    // 取告警数，告警恢复数，当期告警总数
    var promise = Promise.all(echartUtil.getWorkOrderChartPromiseArr());
    // 处理回调
    promise.then( function(val) {
        var resultArrs = [];
        val.forEach( function(v) {
            resultArrs.push(callBackChangeData(v));
        })
        var xDatas = [];
        xDatas = echartUtil.getStartAndEndDay('yyyy-MM-dd');
        var xDatas2 = echartUtil.getStartAndEndDay('MMdd');
        var isDate = 'day';
        if(dateCycle == '月'){
            isDate = 'month';
        }

        var alarmCnt_recoverCnt = resultArrs[0];

        var alarm_count = resultArrs[1][0]['alarm_count'];
        alarm_count = alarm_count==null?0:alarm_count;

        var rec_count = resultArrs[1][0]['rec_count'];
        rec_count = rec_count==null?0:rec_count;

        var rec_rate = resultArrs[1][0]['rec_rate'];
        rec_rate = rec_rate==null?0:rec_rate;

        var recover_cnt = resultArrs[2][0]['recover_cnt'];
        recover_cnt = recover_cnt==null?0:recover_cnt;

        var is_recover_sum = resultArrs[3][0]['is_recover_sum'];
        is_recover_sum = is_recover_sum==null?0:is_recover_sum;

        $("#alarmCurrentCnt").text(`${urlStartDay} ~ ${urlEndDay}当期恢复比：${rec_rate}%(${rec_count}/${alarm_count})`);
        $("#alarmCurrentRecover").text(`历史告警当期恢复数：${recover_cnt}`);
        $("#alarmCurrentRecoverRate").text(`当期告警至今恢复数：${is_recover_sum}`);

        var alarmcntArr = [];
        var alarmreover = [];
        var alarInfoExport = [];
        var alarmcntObj = {};
        var alarmreoverOjb = {};
        var alarInfoExportArr = {};

        xDatas.forEach(function(d) {
            alarmcntObj[d] = 0;
            alarmreoverOjb[d] = 0;
            alarInfoExportArr[d] = 0;
        });
        alarmCnt_recoverCnt.forEach( function(that) {
            for(m in alarmcntObj){
                if(m == that[isDate]+""){
                    alarmcntObj[m] = that.alarm_count;
                    alarmreoverOjb[m] = that.rec_count;
                }
            }
        })
        for(o in alarmcntObj){
            alarmcntArr.push(alarmcntObj[o]==null?0:alarmcntObj[o]);
        }
        for(o in alarmreoverOjb){
            alarmreover.push(alarmreoverOjb[o]==null?0:alarmreoverOjb[o]);
        }


        IntelligentRoadTestChart.vm.chartObj = echarts.init(document.getElementById('allRegionChart'));
        echartUtil.showWorkOrderChart('allRegionChart',xDatas2,alarmcntArr,alarmreover);
    }).then(function(){
        IntelligentRoadTestChart.vm.chartObj.hideLoading();
    })
}
echartUtil.loadWorkOrderChart2 = function(){
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    urlStartDay = new Date(urlStartDay).format('yyyyMMdd');
    urlEndDay = new Date(urlEndDay).format('MMdd');
    var promise = Promise.all(echartUtil.getWorkOrderChartPromiseArr());
    // 处理回调
    promise.then( function(val) {
        var resultArrs = [];
        val.forEach( function(v) {
            resultArrs.push(callBackChangeData(v));
        })
        var xDatas = [];
        xDatas = echartUtil.getStartAndEndDay('yyyy-MM-dd');
        var xDatas2 = echartUtil.getStartAndEndDay('MMdd');

        var alarmCnt_recoverCnt = resultArrs[0];

        var alarm_count = resultArrs[1][0]['alarm_count'];
        alarm_count = alarm_count==null?0:alarm_count;

        var rec_count = resultArrs[1][1]['rec_count'];
        rec_count = rec_count==null?0:rec_count;

        var rec_rate = resultArrs[1][2]['rec_rate'];
        rec_rate = rec_rate==null?0:rec_rate;

        var recover_cnt = resultArrs[2][0]['recover_cnt'];
        recover_cnt = recover_cnt==null?0:recover_cnt;

        var is_recover_sum = resultArrs[3][0]['is_recover_sum'];
        is_recover_sum = is_recover_sum==null?0:is_recover_sum;

        $("#alarmCurrentCnt").text(`${urlStartDay} ~ ${urlEndDay}）当期恢复比：${rec_rate}(${alarm_count}/${rec_count})`);
        $("#alarmCurrentRecover").text(`历史告警当期恢复数：${recover_cnt}`);
        $("#alarmCurrentRecoverRate").text(`当期告警至今恢复数：${is_recover_sum}%`);
        // $("#alarmCurrentRecoverAll").text(`当期恢复数：${allRecover}`);

        var alarmcntArr = [];
        var alarmreover = [];
        var alarInfoExport = [];
        var alarmcntObj = {};
        var alarmreoverOjb = {};
        var alarInfoExportArr = {};

        xDatas.forEach(function(d) {
            alarmcntObj[d] = 0;
            alarmreoverOjb[d] = 0;
            alarInfoExportArr[d] = 0;
        });
        alarmCnt_recoverCnt.forEach( function(that) {
            for(m in alarmcntObj){
                if(m == that.day+""){
                    alarmcntObj[m] = that.alarm_count;
                    alarmreoverOjb[m] = that.rec_count;
                }
            }
        })
        for(o in alarmcntObj){
            alarmcntArr.push(alarmcntObj[o]==null?0:alarmcntObj[o]);
        }
        for(o in alarmreoverOjb){
            alarmreover.push(alarmreoverOjb[o]==null?0:alarmreoverOjb[o]);
        }


        IntelligentRoadTestChart.vm.chartObj = echarts.init(document.getElementById('allRegionChart'));
        echartUtil.showWorkOrderChart('allRegionChart',xDatas2,alarmcntArr,alarmreover);
        // echartUtil.showWeakPoorChart('allRegionChart',xDatas,gridNum,gridRate);
    }).then(function(){
        IntelligentRoadTestChart.vm.chartObj.hideLoading();
    })
}
/**********************************
 * @funcname getWeakPoorChart
 * @funcdesc 弱区图表
 * @param city 地市
 * @param district 区县
 * @param market 营服
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-28 09:59
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.getWeakPoorChart = function(city,district,market){
    var promise = Promise.all(echartUtil.getWeakPoorChartPromiseArr(city,district,market));
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;

    promise.then( function(data) {
        var resultArrs = [];
        data.forEach( function(v) {
            resultArrs.push(callBackChangeData(v));
        })
        var format = 'MMdd';
        if(dateCycle == '月'){
            format = 'MM'
        }
        var isDate = 'day';
        if(dateCycle == '月'){
            isDate = 'month';
        }
        var xDatas = echartUtil.getStartAndEndDay();
        var xDatas2 = echartUtil.getStartAndEndDay(format);
        IntelligentRoadTestChart.xDatas = xDatas;


        var xObjArr = [];

        xDatas.forEach(function (that) {
            var xObj = {};
            xObj.day = parseInt(that);
            xObj.cnt = 0;
            xObj.rate = 0;
            xObjArr.push(xObj);
        })
        var gridNum = [];
        var gridRate = [];
        xObjArr.forEach( function(d) {
            resultArrs[0].forEach(function(that) {
                if(that[isDate] == d.day){
                    d.cnt = that.count;
                    d.rate = that.rate;
                }
            })
        })
        var xDatas2 = [];
        xObjArr.forEach( function(that) {
            gridRate.push(that.rate);
            gridNum.push(that.cnt);
            xDatas2.push(that.day.toString().substr(4,4));
        })

        echartUtil.showWeakPoorChart('allRegionChart',xDatas2,gridNum,gridRate);
    }).then(function(){
        IntelligentRoadTestChart.vm.chartObj.hideLoading();
    })
}
/**********************************
 * @funcname getWeakPoorChart2
 * @funcdesc 弱区图表2
 * @param day 结束日期
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-28 09:59
 * @modifier
 * @modify
 ***********************************/
echartUtil.getWeakPoorChart2 = function(day){
    var promise = Promise.all(echartUtil.getWeakPoorChartPromiseArr2(day));
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;

    promise.then( function(data) {
        var resultArrs = [];
        var cityFlag = IntelligentRoadTestChart.vm.cityFlag;
        var district = IntelligentRoadTestChart.vm.district;
        data.forEach( function(v) {
            resultArrs.push(callBackChangeData(v));
        })
        var format = 'MMdd';
        if(dateCycle == '月'){
            format = 'MM'
        }
        var xDatas = [];

        var gridNum = [];
        var gridRate = [];
        var fetchStr = 'city';
        if(cityFlag != '全省' && cityFlag != '其他'){
            fetchStr = 'country';
        }
        if(district != '全市' && district != '其他'){
            fetchStr = 'mktcenter';
        }
        resultArrs[0].forEach(function(that) {
            gridRate.push(that.rate);
            gridNum.push(that.count);
            xDatas.push(that[fetchStr]);
        })

      /*  var sum = 0;
        gridNum.forEach( function(that) {
            sum += that;
        })
        IntelligentRoadTestChart.vm.tableCount = sum;
*/
        echartUtil.showWeakPoorChart('allRegionChart2',xDatas,gridNum,gridRate,true);
    }).then(function(){
        IntelligentRoadTestChart.vm.chartObj2.hideLoading();
    })
}

/**********************************
 * @funcname getWorkOrderChartPromiseArr
 * @funcdesc 取告警数，告警恢复数，当期告警总数
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-24 15:55
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.getWorkOrderChartPromiseArr = function() {
    var city = IntelligentRoadTestChart.vm.cityFlag;
    var district = IntelligentRoadTestChart.vm.district;
    var market = IntelligentRoadTestChart.vm.market;
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = '日';
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    var workOrderType = IntelligentRoadTestChart.vm.workOrderType;
    // 告警数，恢复数
    var promise1 = new Promise(function  (resolve,reject) {
        var list = ["StatisticsDL_AlarmCountImg_1"];
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
        if (workOrderType != '全部') {
            list.push(`ALARM_NAME:AND LOCATE('${workOrderType}',ALARM_NAME) > 0`);
        }
        list.push(`START_DAY:${urlStartDay}`);
        list.push(`END_DAY:${urlEndDay}`);
        function successCallback(data) {
            resolve(data);
        }
        var progressBarSqls = [];
        var functionlist = [successCallback];
        progressBarSqls.push(list);
        progressbarTwo.submitSql(progressBarSqls, functionlist, [3],[],null,null,null,false,['Alarms']);
    });
    var promise2 = new Promise(function  (resolve,reject) {
        var list = ["StatisticsDL_AlarmCountImg_2"];
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
        if (workOrderType != '全部') {
            list.push(`ALARM_NAME:AND LOCATE('${workOrderType}',ALARM_NAME) > 0`);
        }
        list.push(`START_DAY:${urlStartDay}`);
        list.push(`END_DAY:${urlEndDay}`);
        function successCallback(data) {
            resolve(data);
        }
        var progressBarSqls = [];
        var functionlist = [successCallback];
        progressBarSqls.push(list);
        progressbarTwo.submitSql(progressBarSqls, functionlist, [3],[],null,null,null,false,['Alarms']);
    });
    // 当期告警总数
    var promise3 = new Promise(function  (resolve,reject) {
        var list = ["StatisticsDL_AlarmCountImg_3"];
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
        if (workOrderType != '全部') {
            list.push(`ALARM_NAME:AND LOCATE('${workOrderType}',ALARM_NAME) > 0`);
        }
        list.push(`START_DAY:${urlStartDay}`);
        list.push(`END_DAY:${urlEndDay}`);

        function successCallback(data) {
            resolve(data);
        }

        var progressBarSqls = [];
        var functionlist = [successCallback];
        progressBarSqls.push(list);
        progressbarTwo.submitSql(progressBarSqls, functionlist, [3], [], null, null, null, false, ['Alarms']);
    })
    // 所有当期告警恢复数
    var promise4 = new Promise(function  (resolve,reject) {
        var list = ["StatisticsDL_AlarmCountImg_4"];
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
        if (workOrderType != '全部') {
            list.push(`ALARM_NAME:AND LOCATE('${workOrderType}',ALARM_NAME) > 0`);
        }
        list.push(`START_DAY:${urlStartDay}`);
        list.push(`END_DAY:${urlEndDay}`);

        function successCallback(data) {
            resolve(data);
        }

        var progressBarSqls = [];
        var functionlist = [successCallback];
        progressBarSqls.push(list);
        progressbarTwo.submitSql(progressBarSqls, functionlist, [3], [], null, null, null, false, ['Alarms']);
    });
    return [promise1,promise2,promise3,promise4];
}
/**********************************
 * @funcname getWeakPoorChartPromiseArr
 * @funcdesc 获取弱区图表数据
 * @param city 地市
 * @param district 区县
 * @param market 营服
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-28 10:01
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.getWeakPoorChartPromiseArr = function(city,district,market) {
    if(city == undefined){
        city = IntelligentRoadTestChart.vm.cityQuerystr;
    }
    if(district == undefined){
        district = IntelligentRoadTestChart.vm.districtQuerystr;
    }
    if(market == undefined){
        market = IntelligentRoadTestChart.vm.marketQuerystr;
    }
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = '周';
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    var workOrderType = IntelligentRoadTestChart.vm.workOrderType;


    urlStartDay = new Date(urlStartDay).format('yyyyMMdd');
    urlEndDay = new Date(urlEndDay).format('yyyyMMdd');
    // 弱区统计趋势图
    var promise1 = new Promise(function  (resolve,reject) {
        var list = ["StatisticsDL_PoorGridCountImg"];
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
            list.push(`MKTCENTER_CONDITION:and MKTCENTER='${market}'`);
        }
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
        list.push(`START_TIME:${urlStartDay}`);
        list.push(`END_TIME:${urlEndDay}`);
        function successCallback(data) {
            resolve(data);
        }
        var progressBarSqls = [];
        var functionlist = [successCallback];
        progressBarSqls.push(list);
        progressbarTwo.submitSql(progressBarSqls, functionlist, [3]);
    });

    return [promise1];
}
/**********************************
 * @funcname getWeakPoorChartPromiseArr2
 * @funcdesc 获取弱区图表数据2
 * @param day 结束日期
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-28 10:01
 * @modifier
 * @modify
 ***********************************/
echartUtil.getWeakPoorChartPromiseArr2 = function(day) {
    var city = IntelligentRoadTestChart.vm.cityFlag;
    var district = IntelligentRoadTestChart.vm.district;
    var market = IntelligentRoadTestChart.vm.market;
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = '周';
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay2;
    if(day != undefined){
        urlEndDay = day;
    }
    var workOrderType = IntelligentRoadTestChart.vm.workOrderType;

    urlStartDay = new Date(urlStartDay).format('yyyyMMdd');
    urlEndDay = new Date(urlEndDay).format('yyyyMMdd');
    // 弱区统计趋势图
    var promise1 = new Promise(function  (resolve,reject) {
        var list = ["StatisticsDL_PoorGridCountImg_city"];
        if(city == '全省'){
            list.push(`CITY_CONDITION:`);
            list.push(`CITY:CITY`);
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
            list.push(`MKTCENTER_CONDITION:and MKTCENTER='${market}'`);
        }
        if(city != '全省' && city != '其他' && district == '全市'){
            list.push(`CITY:COUNTRY`);
        }else{
            list.push(`CITY:MKTCENTER`);
        }
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

        list.push(`START_TIME:${urlStartDay}`);
        list.push(`END_TIME:${urlEndDay}`);
        function successCallback(data) {
            resolve(data);
        }
        var progressBarSqls = [];
        var functionlist = [successCallback];
        progressBarSqls.push(list);
        progressbarTwo.submitSql(progressBarSqls, functionlist, [3]);
    });

    return [promise1];
}
/**********************************
 * @funcname showSceneChart
 * @funcdesc 公共图表（五高。。）
 * @param div 图表div
 * @param xDatas 图表x轴
 * @param mrCnt mr记录数
 * @param agpsmrCnt agps mr记录数
 * @param mrRate mr覆盖率
 * @param agpsmrRate agps mr覆盖率
 * @param isCenter 是否是区域图表
 * @param cellEnbCellObj 扇区对象
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-25 21:22
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.showSceneChart = function(div,xDatas,mrCnt,agpsmrCnt,mrRate,agpsmrRate,isCenter,cellEnbCellObj){
    // var chartDiv =  IntelligentRoadTestChart.vm.chartObj;
    var city = IntelligentRoadTestChart.vm.cityFlag=='全省'?'':IntelligentRoadTestChart.vm.cityFlag;
    var district = IntelligentRoadTestChart.vm.district=='全市'?'':IntelligentRoadTestChart.vm.district;
    var market = IntelligentRoadTestChart.vm.market=='全区'?'':IntelligentRoadTestChart.vm.market;
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var chartDiv =  div;

    var mrrateMax = Math.max.apply(null,mrRate);
    var agpsmrRateMax = Math.max.apply(null,agpsmrRate);
    var mrrateMin = Math.min.apply(null,mrRate);
    var agpsmrRateMin = Math.min.apply(null,agpsmrRate);

    var max = '';
    var min = '';
    if(mrrateMax > agpsmrRateMax){
        max = Math.ceil(mrrateMax);
    }else{
        max = Math.ceil(agpsmrRateMax);
    }
    if(mrrateMin > agpsmrRateMin){
        min = Math.ceil(agpsmrRateMin);
    }else{
        min = Math.ceil(mrrateMin);
    }
    if(min != 0){
        min = min -1;
    }

    var unitStr = "%";
    if(objectType == "扇区"){
        unitStr = "";
    }

    var sceneOption = {
        tooltip : {
            trigger: 'axis',
            axisPointer:{
                type:'shadow'
            },
            formatter: function (params, ticket, callback) {
                var factory= IntelligentRoadTestChart.vm.factory;
                if(isCenter != undefined){
                    factory= IntelligentRoadTestChart.vm.factory2;
                }
                var str = '';
                if(city != '' && district != '' && market != ''){
                    str += params[0].name + ' ' + city + district + market  ;
                }else if(city != '' && district != '' ){
                    str += params[0].name + ' ' + city  + district ;
                }else if(city != '' ){
                    str += params[0].name + ' ' + city;
                }else if(city == ''){
                    if(isCenter != undefined){
                        str += params[0].name + ' ' ;
                    }else{
                        str += params[0].name + ' ' + '全省 ';
                    }

                }
                if(factory == '全部'){
                    factory = '';
                }
                str +=   factory + ':<br>';
                if(params.length==8){
                    var y1 = params[0].value == '' ? 0:params[0].value;
                    var y2 = params[1].value == '' ? 0:params[1].value;
                    var y3 = params[2].value == '' ? 0:params[2].value;
                    var y4 = params[3].value == '' ? 0:params[3].value;
                    var y5 = params[4].value == '' ? 0:params[4].value;
                    var y6 = params[5].value == '' ? 0:params[5].value;
                    var y7 = params[6].value == '' ? 0:params[6].value;
                    var y8 = params[7].value == '' ? 0:params[7].value;
                    str += params[0].seriesName.indexOf('率') > 0 ? params[0].seriesName + ':' +  y1 + '%<br>' : params[0].seriesName + ':' +  y1 + '<br>';
                    str += params[1].seriesName.indexOf('率') > 0 ? params[1].seriesName + ':' +  y2 + '%<br>' : params[1].seriesName + ':' +  y2 + '<br>';
                    str += params[2].seriesName.indexOf('率') > 0 ? params[2].seriesName + ':' +  y3 + '%<br>' : params[2].seriesName + ':' +  y3 + '<br>';
                    str += params[3].seriesName.indexOf('率') > 0 ? params[3].seriesName + ':' +  y4 + '%<br>' : params[3].seriesName + ':' +  y4 + '<br>';
                    str += params[4].seriesName.indexOf('率') > 0 ? params[4].seriesName + ':' +  y5 + '%<br>' : params[4].seriesName + ':' +  y5 + '<br>';
                    str += params[5].seriesName.indexOf('率') > 0 ? params[5].seriesName + ':' +  y6 + '%<br>' : params[5].seriesName + ':' +  y6 + '<br>';
                    str += params[6].seriesName.indexOf('率') > 0 ? params[6].seriesName + ':' +  y7 + '%<br>' : params[6].seriesName + ':' +  y7 + '<br>';
                    str += params[7].seriesName.indexOf('率') > 0 ? params[7].seriesName + ':' +  y8 + '%<br>' : params[7].seriesName + ':' +  y8 + '<br>';
                }else if(params.length==7){
                    var y1 = params[0].value == '' ? 0:params[0].value;
                    var y2 = params[1].value == '' ? 0:params[1].value;
                    var y3 = params[2].value == '' ? 0:params[2].value;
                    var y4 = params[3].value == '' ? 0:params[3].value;
                    var y5 = params[4].value == '' ? 0:params[4].value;
                    var y6 = params[5].value == '' ? 0:params[5].value;
                    var y7 = params[6].value == '' ? 0:params[6].value;
                    str += params[0].seriesName.indexOf('率') > 0 ? params[0].seriesName + ':' +  y1 + '%<br>' : params[0].seriesName + ':' +  y1 + '<br>';
                    str += params[1].seriesName.indexOf('率') > 0 ? params[1].seriesName + ':' +  y2 + '%<br>' : params[1].seriesName + ':' +  y2 + '<br>';
                    str += params[2].seriesName.indexOf('率') > 0 ? params[2].seriesName + ':' +  y3 + '%<br>' : params[2].seriesName + ':' +  y3 + '<br>';
                    str += params[3].seriesName.indexOf('率') > 0 ? params[3].seriesName + ':' +  y4 + '%<br>' : params[3].seriesName + ':' +  y4 + '<br>';
                    str += params[4].seriesName.indexOf('率') > 0 ? params[4].seriesName + ':' +  y5 + '%<br>' : params[4].seriesName + ':' +  y5 + '<br>';
                    str += params[5].seriesName.indexOf('率') > 0 ? params[5].seriesName + ':' +  y6 + '%<br>' : params[5].seriesName + ':' +  y6 + '<br>';
                    str += params[6].seriesName.indexOf('率') > 0 ? params[6].seriesName + ':' +  y7 + '%<br>' : params[6].seriesName + ':' +  y7 + '<br>';
                }else if(params.length==6){
                    var y1 = params[0].value == '' ? 0:params[0].value;
                    var y2 = params[1].value == '' ? 0:params[1].value;
                    var y3 = params[2].value == '' ? 0:params[2].value;
                    var y4 = params[3].value == '' ? 0:params[3].value;
                    var y5 = params[4].value == '' ? 0:params[4].value;
                    var y6 = params[5].value == '' ? 0:params[5].value;
                    str += params[0].seriesName.indexOf('率') > 0 ? params[0].seriesName + ':' +  y1 + '%<br>' : params[0].seriesName + ':' +  y1 + '<br>';
                    str += params[1].seriesName.indexOf('率') > 0 ? params[1].seriesName + ':' +  y2 + '%<br>' : params[1].seriesName + ':' +  y2 + '<br>';
                    str += params[2].seriesName.indexOf('率') > 0 ? params[2].seriesName + ':' +  y3 + '%<br>' : params[2].seriesName + ':' +  y3 + '<br>';
                    str += params[3].seriesName.indexOf('率') > 0 ? params[3].seriesName + ':' +  y4 + '%<br>' : params[3].seriesName + ':' +  y4 + '<br>';
                    str += params[4].seriesName.indexOf('率') > 0 ? params[4].seriesName + ':' +  y5 + '%<br>' : params[4].seriesName + ':' +  y5 + '<br>';
                    str += params[5].seriesName.indexOf('率') > 0 ? params[5].seriesName + ':' +  y6 + '%<br>' : params[5].seriesName + ':' +  y6 + '<br>';
                }else if(params.length==5){
                    var y1 = params[0].value == '' ? 0:params[0].value;
                    var y2 = params[1].value == '' ? 0:params[1].value;
                    var y3 = params[2].value == '' ? 0:params[2].value;
                    var y4 = params[3].value == '' ? 0:params[3].value;
                    var y5 = params[4].value == '' ? 0:params[4].value;
                    str += params[0].seriesName.indexOf('率') > 0 ? params[0].seriesName + ':' +  y1 + '%<br>' : params[0].seriesName + ':' +  y1 + '<br>';
                    str += params[1].seriesName.indexOf('率') > 0 ? params[1].seriesName + ':' +  y2 + '%<br>' : params[1].seriesName + ':' +  y2 + '<br>';
                    str += params[2].seriesName.indexOf('率') > 0 ? params[2].seriesName + ':' +  y3 + '%<br>' : params[2].seriesName + ':' +  y3 + '<br>';
                    str += params[3].seriesName.indexOf('率') > 0 ? params[3].seriesName + ':' +  y4 + '%<br>' : params[3].seriesName + ':' +  y4 + '<br>';
                    str += params[4].seriesName.indexOf('率') > 0 ? params[4].seriesName + ':' +  y5 + '%<br>' : params[4].seriesName + ':' +  y5 + '<br>';
                }else if(params.length==4){
                    var y1 = params[0].value == '' ? 0:params[0].value;
                    var y2 = params[1].value == '' ? 0:params[1].value;
                    var y3 = params[2].value == '' ? 0:params[2].value;
                    var y4 = params[3].value == '' ? 0:params[3].value;

                    if(objectType == "高铁"){
                        str += params[0].seriesName.indexOf('全量MR数') < 0 ? params[0].seriesName + ':' +  y1.toFixed(2) + 'km<br>' : params[0].seriesName + ':' +  y1 + '<br>';
                        str += params[1].seriesName.indexOf('全量MR数') < 0 ? params[1].seriesName + ':' +  y2.toFixed(2) + 'km<br>' : params[1].seriesName + ':' +  y2 + '<br>';
                        str += params[2].seriesName.indexOf('全量MR数') < 0 ? params[2].seriesName + ':' +  y3.toFixed(2) + 'km<br>' : params[2].seriesName + ':' +  y3 + '<br>';
                        str += params[3].seriesName.indexOf('全量MR数') < 0 ? params[3].seriesName + ':' +  y4.toFixed(2) + 'km<br>' : params[3].seriesName + ':' +  y4 + '<br>';
                    }else{
                        str += params[0].seriesName.indexOf('率') > 0 ? params[0].seriesName + ':' +  y1 + '%<br>' : params[0].seriesName + ':' +  y1 + '<br>';
                        str += params[1].seriesName.indexOf('率') > 0 ? params[1].seriesName + ':' +  y2 + '%<br>' : params[1].seriesName + ':' +  y2 + '<br>';
                        str += params[2].seriesName.indexOf('率') > 0 ? params[2].seriesName + ':' +  y3 + '%<br>' : params[2].seriesName + ':' +  y3 + '<br>';
                        str += params[3].seriesName.indexOf('率') > 0 ? params[3].seriesName + ':' +  y4 + '%<br>' : params[3].seriesName + ':' +  y4 + '<br>';
                    }

                }else if(params.length==3){
                    var y1 = params[0].value == '' ? 0:params[0].value;
                    var y2 = params[1].value == '' ? 0:params[1].value;
                    var y3 = params[2].value == '' ? 0:params[2].value;

                    if(objectType == "高铁"){
                        str += params[0].seriesName.indexOf('全量MR数') < 0 ? params[0].seriesName + ':' +  y1.toFixed(2) + 'km<br>' : params[0].seriesName + ':' +  y1 + '<br>';
                        str += params[1].seriesName.indexOf('全量MR数') < 0 ? params[1].seriesName + ':' +  y2.toFixed(2) + 'km<br>' : params[1].seriesName + ':' +  y2 + '<br>';
                        str += params[2].seriesName.indexOf('全量MR数') < 0 ? params[2].seriesName + ':' +  y3.toFixed(2) + 'km<br>' : params[2].seriesName + ':' +  y3 + '<br>';
                    }else{
                        str += params[0].seriesName.indexOf('率') > 0 ? params[0].seriesName + ':' +  y1 + '%<br>' : params[0].seriesName + ':' +  y1 + '<br>';
                        str += params[1].seriesName.indexOf('率') > 0 ? params[1].seriesName + ':' +  y2 + '%<br>' : params[1].seriesName + ':' +  y2 + '<br>';
                        str += params[2].seriesName.indexOf('率') > 0 ? params[2].seriesName + ':' +  y3 + '%<br>' : params[2].seriesName + ':' +  y3 + '<br>';
                    }
                }else if(params.length==2){
                    var y1 = params[0].value == '' ? 0:params[0].value;
                    var y2 = params[1].value == '' ? 0:params[1].value;
                    if(objectType == "高铁"){
                        str += params[0].seriesName.indexOf('全量MR数') < 0 ? params[0].seriesName + ':' +  y1.toFixed(2) + 'km<br>' : params[0].seriesName + ':' +  y1 + '<br>';
                        str += params[1].seriesName.indexOf('全量MR数') < 0 ? params[1].seriesName + ':' +  y2.toFixed(2) + 'km<br>' : params[1].seriesName + ':' +  y2 + '<br>';
                    }else{
                        str += params[0].seriesName.indexOf('率') > 0 ? params[0].seriesName + ':' +  y1 + '%<br>' : params[0].seriesName + ':' +  y1 + '<br>';
                        str += params[1].seriesName.indexOf('率') > 0 ? params[1].seriesName + ':' +  y2 + '%<br>' : params[1].seriesName + ':' +  y2 + '<br>';
                    }
                }else if(params.length==1){
                    var y1 = params[0].value == '' ? 0:params[0].value;
                    if(objectType == "高铁"){
                        str += params[0].seriesName.indexOf('全量MR数') < 0 ? params[0].seriesName + ':' +  y1.toFixed(2) + 'km<br>' : params[0].seriesName + ':' +  y1 + '<br>';
                    }else{
                        str += params[0].seriesName.indexOf('率') > 0 ? params[0].seriesName + ':' +  y1 + '%<br>' : params[0].seriesName + ':' +  y1 + '<br>';
                    }
                }

                return str;
            }
        },
        legend: {
            data: ['AGPS-MR记录数','全量MR记录数','AGPS-MR覆盖率','全量-MR覆盖率']
        },
        grid: {
            left: 5,
            right: 5,
            bottom: 5,
            top: 30,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false,
            },
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            },
            data: xDatas
        },
        yAxis: [{
            type: 'value',
            name: 'MR记录数',
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#ededef'
                }
            },
            // splitNumber : 3,
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            },
            axisLabel: {
                color: '#fff',
                // fontSize: 16,
                formatter: function(value,index){
                    var value;
                    if (value >=100000000) {
                        value = value/100000000+'亿';
                    }else if (value >=10000000) {
                        value = value/10000000+'千万';
                    }else if (value >=1000000) {
                        value = value/1000000+'百万';
                    }else if (value >=10000) {
                        value = value/10000+'万';
                    }else if (value >=1000) {
                        value = value/1000+'千';
                    }else if(value <1000){
                        value = value;
                    }
                    return value
                }
            },
        },
            {
                type: 'value',
                name: '%',
                min: min,
                max: max,
                axisTick: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#ededef'
                    }
                },
                // splitNumber : 3,
                axisLine :{
                    lineStyle: {
                        color: '#5b5d61'
                    }
                }
            }],
        series: [{
            type: 'line',
            name: 'AGPS-MR覆盖率',
            yAxisIndex: 1,
            smooth:true,
            itemStyle: {
                normal:{
                    color: '#f6cd40'
                }
            },
            data: agpsmrRate
        },{
            type: 'line',
            name: '全量-MR覆盖率',
            yAxisIndex: 1,
            smooth:true,
            itemStyle: {
                normal:{
                    color: '#4f94dc'
                }
            },
            data: mrRate
        },{
            type: 'bar',
            barMinHeight: 5,
            barWidth: '20%',
            name: 'AGPS-MR记录数',
            yAxisIndex: 0,
            itemStyle: {
                normal:{
                    color: '#64bba8',
                    barBorderRadius: 5
                }
            },
            data: agpsmrCnt
        },{
            type: 'bar',
            barWidth: '20%',
            barMinHeight: 5,
            name: '全量MR记录数',
            yAxisIndex: 0,
            itemStyle: {
                normal:{
                    color: '#26bae5',
                    barBorderRadius: 5
                }
            },
            data: mrCnt
        }]
    };

    if(objectType == "扇区"){
        sceneOption.series[2].barWidth = "10%";
        sceneOption.series[3].barWidth = "10%";
        sceneOption.legend.data.push("AGPS-MR基站数","全量MR基站数","AGPS-MR扇区数","全量MR扇区数");
        if(cellEnbCellObj != undefined){
            sceneOption.series.push({
                type: 'bar',
                barWidth: '10%',
                name: 'AGPS-MR基站数',
                barMinHeight: 5,
                yAxisIndex: 0,
                itemStyle: {
                    normal:{
                        color: '#2ae592',
                        barBorderRadius: 5
                    }
                },
                data: cellEnbCellObj.agpsMrEnbCnt
            },{
                type: 'bar',
                barWidth: '10%',
                name: '全量MR基站数',
                barMinHeight: 5,
                yAxisIndex: 0,
                itemStyle: {
                    normal:{
                        color: '#a71056',
                        barBorderRadius: 5
                    }
                },
                data: cellEnbCellObj.mrEnbCnt
            },{
                type: 'bar',
                barWidth: '10%',
                name: 'AGPS-MR扇区数',
                barMinHeight: 5,
                yAxisIndex: 0,
                itemStyle: {
                    normal:{
                        color: '#e5b058',
                        barBorderRadius: 5
                    }
                },
                data: cellEnbCellObj.agpsMrCellCnt
            },{
                type: 'bar',
                barWidth: '10%',
                barMinHeight: 5,
                name: '全量MR扇区数',
                yAxisIndex: 0,
                itemStyle: {
                    normal:{
                        color: '#c454e5',
                        barBorderRadius: 5
                    }
                },
                data: cellEnbCellObj.mrCellCnt
            })
        }
        if(isCenter == undefined){
            IntelligentRoadTestChart.vm.sectorChart1LegendData = sceneOption.legend.data;
            IntelligentRoadTestChart.vm.sectorChart1Series = sceneOption.series;

            if(IntelligentRoadTestChart.vm.numOrRate == '覆盖率'){
                sceneOption.legend.data = JSON.parse(JSON.stringify(sceneOption.legend.data)).splice(0,4);
                sceneOption.series = JSON.parse(JSON.stringify(sceneOption.series)).splice(0,4);
            }else{
                sceneOption.legend.data = JSON.parse(JSON.stringify(sceneOption.legend.data)).splice(4);
                sceneOption.series = JSON.parse(JSON.stringify(sceneOption.series)).splice(4);
            }
        }else{
            IntelligentRoadTestChart.vm.sectorChart2LegendData = sceneOption.legend.data;
            IntelligentRoadTestChart.vm.sectorChart2Series = sceneOption.series;

            if(IntelligentRoadTestChart.vm.numOrRate2 == '覆盖率'){
                sceneOption.legend.data = JSON.parse(JSON.stringify(sceneOption.legend.data)).splice(0,4);
                sceneOption.series = JSON.parse(JSON.stringify(sceneOption.series)).splice(0,4);
            }else{
                sceneOption.legend.data = JSON.parse(JSON.stringify(sceneOption.legend.data)).splice(4);
                sceneOption.series = JSON.parse(JSON.stringify(sceneOption.series)).splice(4);
            }
        }


    }else if($.inArray(objectType,['全区域','高校','场馆','美食','美景','高密度住宅区','高流量商务区','战狼区域','农贸市场','中小学','城中村']) > -1){
        sceneOption.series[2].barWidth = "10%";
        sceneOption.series[3].barWidth = "10%";
        sceneOption.legend.data.push("全量MR室内记录数","全量MR室外记录数","全量MR室内覆盖率","全量MR室外覆盖率");
        if(cellEnbCellObj != undefined){
            sceneOption.series.push({
                type: 'bar',
                barWidth: '10%',
                barMinHeight: 5,
                name: '全量MR室内记录数',
                yAxisIndex: 0,
                itemStyle: {
                    normal:{
                        color: '#2ae592',
                        barBorderRadius: 5
                    }
                },
                data: cellEnbCellObj.mrIndoorCnt
            },{
                type: 'bar',
                barWidth: '10%',
                barMinHeight: 5,
                name: '全量MR室外记录数',
                yAxisIndex: 0,
                itemStyle: {
                    normal:{
                        color: '#e5b058',
                        barBorderRadius: 5
                    }
                },
                data: cellEnbCellObj.mrOutdoorCnt
            },{
                type: 'line',
                name: '全量MR室内覆盖率',
                yAxisIndex: 1,
                smooth:true,
                itemStyle: {
                    normal:{
                        color: '#120ea7',
                    }
                },
                data: cellEnbCellObj.mrIndoorRate
            },{
                type: 'line',
                name: '全量MR室外覆盖率',
                yAxisIndex: 1,
                smooth:true,
                itemStyle: {
                    normal:{
                        color: '#c454e5'
                    }
                },
                data: cellEnbCellObj.mrOutdoorRate
            })
        }
    }else if($.inArray(objectType,['高铁']) > -1){
        sceneOption.legend.data = ["全量MR数","达标里程","未达标里程","脱网里程"];
        sceneOption.yAxis[0].name = "MR记录数";
        sceneOption.yAxis[1].name = "里程数(km)";
        delete sceneOption.yAxis[1].max;
        delete sceneOption.yAxis[1].min;

        sceneOption.series[0].name = "全量MR数";
        sceneOption.series[0].type = "bar";
        sceneOption.series[0].data = cellEnbCellObj.rsrp_cnt_sum_arr;
        sceneOption.series[0].yAxisIndex = 0;
        sceneOption.series[0].barMinHeight = 5;
        sceneOption.series[0].itemStyle.normal.color = '#4f94dc';

        sceneOption.series[1].name = "达标里程";
        sceneOption.series[1].type = "line";
        sceneOption.series[1].data = cellEnbCellObj.qulified_length_arr;
        sceneOption.series[1].yAxisIndex = 1;
        sceneOption.series[1].itemStyle.normal.color = '#2ae592';

        sceneOption.series[2].name = "未达标里程";
        sceneOption.series[2].type = "line";
        sceneOption.series[2].data = cellEnbCellObj.unqualified_length_arr;
        sceneOption.series[2].yAxisIndex = 1;
        delete sceneOption.series[2].barMinHeight;
        sceneOption.series[2].itemStyle.normal.color = '#f6cd40';

        sceneOption.series[3].name = "脱网里程";
        sceneOption.series[3].type = "line";
        sceneOption.series[3].data = cellEnbCellObj.out_neted_length_arr;
        sceneOption.series[3].yAxisIndex = 1;
        delete sceneOption.series[3].barMinHeight;
        sceneOption.series[3].itemStyle.normal.color = '#c454e5';
    }

    if($.inArray(objectType,['地铁']) > -1){
        sceneOption.legend.data.splice(0,1);
        sceneOption.legend.data.splice(1,1);
        sceneOption.series.splice(0,1);
        sceneOption.series.splice(1,1);
    }
    chartDiv.setOption(sceneOption);
    if(isCenter == undefined){
        chartDiv.on('click', function (params) {
            var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
            var statistical = IntelligentRoadTestChart.vm.statistical;
            // var day = new Date().format('yyyy')+params.name;
            // var day = IntelligentRoadTestChart.vm.urlEndDay.substring(0,4)+params.name;
            var day = IntelligentRoadTestChart.xDatas[params.dataIndex];
            if(dateCycle == '月'){
                day = params.name;
                day = day.substring(0, 4) + "-" + day.substring(4, 6);
            }else{
                day = day.substring(0, 4) + "-" + day.substring(4, 6) + "-" + day.substring(6, 8);
            }
            IntelligentRoadTestChart.vm.tableDay = day;
            tableDataProcessForVueComponent.loadTable(day);
            if($.inArray(statistical,["高铁","地铁"]) < 0){
                echartUtil.loadChartData2(day);
            }
            // echartUtil.loadChartData(IntelligentRoadTestChart.vm.cityFlag,IntelligentRoadTestChart.vm.district,IntelligentRoadTestChart.vm.market);
            IntelligentRoadTestChart.vm.urlEndDay2 = day;
        });
    }else{
        chartDiv.on('click', function (params) {
            var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
            // tableDataProcessForVueComponent.loadTable(day);
            var xName = params.name;
            var city = IntelligentRoadTestChart.vm.cityFlag;
            var district = IntelligentRoadTestChart.vm.district;
            var market = IntelligentRoadTestChart.vm.market;
            if(city == '全省'){
                city = xName;
                IntelligentRoadTestChart.vm.cityQuerystr = xName;
            }else if(city != '全省' && district == '全市'){
                district = xName;
                IntelligentRoadTestChart.vm.districtQuerystr = xName;
            }else if(city != '全省' && district != '全市'){
                market = xName;
                IntelligentRoadTestChart.vm.marketQuerystr = xName;
            }
            // echartUtil.loadChartData(city,district,market)
            if(objectType == "高铁"){
                var day = IntelligentRoadTestChart.xDatas2[params.dataIndex];
                if(dateCycle == '月'){
                    day = params.name;
                    day = day.substring(0, 4) + "-" + day.substring(4, 6);
                }else{
                    day = day.substring(0, 4) + "-" + day.substring(4, 6) + "-" + day.substring(6, 8);
                }
                IntelligentRoadTestChart.vm.tableDay = day;
                IntelligentRoadTestChart.vm.urlEndDay2 = day;
                tableDataProcessForVueComponent.loadTable(IntelligentRoadTestChart.vm.urlEndDay2);
            }else{
                tableDataProcessForVueComponent.loadTable(IntelligentRoadTestChart.vm.urlEndDay2,city,district,market);
            }

        });
    }

    // $(window).resize(function () {
    //     IntelligentRoadTestChart.vm.chartObj.resize();
    //     if(IntelligentRoadTestChart.vm.chartObj2 != undefined){
    //         IntelligentRoadTestChart.vm.chartObj2.resize();
    //     }
    // })
}
/**********************************
 * @funcname showWorkOrderChart
 * @funcdesc 工单图表
 * @param div 图表div
 * @param xDatas 图表x轴
 * @param alarmcntArr 告警数
 * @param alarmreover 恢复数
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-25 21:22
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.showWorkOrderChart = function(div,xDatas,alarmcntArr,alarmreover){
    // var chartDiv = echarts.init(document.getElementById(div));
    var city = IntelligentRoadTestChart.vm.cityFlag=='全省'?'':IntelligentRoadTestChart.vm.cityFlag;
    var district = IntelligentRoadTestChart.vm.district=='全市'?'':IntelligentRoadTestChart.vm.district;
    var market = IntelligentRoadTestChart.vm.market=='全区'?'':IntelligentRoadTestChart.vm.market;
    IntelligentRoadTestChart.vm.chartObj = echarts.init(document.getElementById(div));
    var chartDiv =  IntelligentRoadTestChart.vm.chartObj;
    var sceneOption = {
        tooltip : {
            trigger: 'axis',
            axisPointer:{
                type:'shadow'
            },
            formatter: function (params, ticket, callback) {
                var str = '';
                if(city != '' && district != '' && market != ''){
                    str += params[0].name + ' ' + city + district + market +  '区域:<br>';
                }else if(city != '' && district != '' ){
                    str += params[0].name + ' ' + city  + district + '区域:<br>';
                }else if(city != '' ){
                    str += params[0].name + ' ' + city + '区域:<br>';
                }else{
                    str += params[0].name + ' ' + '全省区域:<br>';
                }

                var y1 = params[0].value == '' ? 0:params[0].value;
                var y2 = params[1].value == '' ? 0:params[1].value;
                str += params[0].seriesName + ':' +  y1 + '<br>';
                str += params[1].seriesName + ':' +  y2 + '<br>';
                return str;
            }
        },
        legend: {
            data: ['告警数','恢复数']
        },
        grid: {
            left: 10,
            right: 10,
            bottom: 5,
            top: 30,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false,
            },
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            },
            data: xDatas
        },
        yAxis: [{
            type: 'value',
            // name: '%',
            // min: 0,
            // max: 100,
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#ededef'
                }
            },
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            }
        }],
        series: [{
            type: 'line',
            name: '告警数',
            symbolSize: 5,
            smooth:true,
            itemStyle: {
                normal: {
                    color: "#2ec7c9",
                    lineStyle: {
                        color: "#2ec7c9"
                    }
                }
            },
            data: alarmcntArr
        },{
            type: 'line',
            name: '恢复数',
            symbolSize: 5,
            smooth:true,
            itemStyle: {
                normal: {
                    color: "blue",
                    lineStyle: {
                        color: "blue"
                    }
                }
            },
            data:alarmreover
        }]
    };

    chartDiv.setOption(sceneOption);
    /*$(window).resize(function () {
        IntelligentRoadTestChart.vm.chartObj.resize();
    })*/
}
/**********************************
 * @funcname showWeakPoorChart
 * @funcdesc 弱区图表
 * @param div 图表div
 * @param xDatas 图表x轴
 * @param mrCnt mr记录数
 * @param agpsmrCnt agps mr记录数
 * @param isCenter 是否是区域图表
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-25 21:21
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.showWeakPoorChart = function(div,xDatas,mrCnt,agpsmrCnt,isCenter){
    var chartDiv = echarts.init(document.getElementById(div));
    var city = IntelligentRoadTestChart.vm.cityFlag=='全省'?'':IntelligentRoadTestChart.vm.cityFlag;
    var district = IntelligentRoadTestChart.vm.district=='全市'?'':IntelligentRoadTestChart.vm.district;
    var market = IntelligentRoadTestChart.vm.market=='全区'?'':IntelligentRoadTestChart.vm.market;
    var objectType = IntelligentRoadTestChart.vm.statistical;

    var sceneOption = {
        tooltip : {
            trigger: 'axis',
            axisPointer:{
                type:'shadow'
            },
            formatter: function (params, ticket, callback) {
                var str = '';
                if(city != '' && district != '' && market != ''){
                    str += params[0].name + ' ' + city + district + market +  '区域:<br>';
                }else if(city != '' && district != '' ){
                    str += params[0].name + ' ' + city  + district + '区域:<br>';
                }else if(city != '' ){
                    str += params[0].name + ' ' + city + '区域:<br>';
                }
                if(params.length==2){
                    var formatStr = '';
                    if(params[0].seriesName.indexOf('比') > 0){
                        formatStr = '%';
                    }else{
                        formatStr = '';
                    }
                    var y1 = params[0].value == '' ? 0:params[0].value + formatStr;

                    if(params[1].seriesName.indexOf('比') > 0){
                        formatStr = '%';
                    }else{
                        formatStr = '';
                    }
                    var y2 = params[1].value == '' ? 0:params[1].value + formatStr;

                    str += params[0].seriesName + ':' +  y1 + '<br>';
                    str += params[1].seriesName + ':' +  y2 + '<br>';
                }else if(params.length==1){
                    var formatStr = '';
                    if(params[0].seriesName.indexOf('比') > 0){
                        formatStr = '%';
                    }else{
                        formatStr = '';
                    }
                    var y1 = params[0].value == '' ? 0:params[0].value + formatStr;

                    str += params[0].seriesName + ':' +  y1 + '<br>';
                }
                // var y1 = params[0].value == '' ? 0:params[0].value;
                // var y2 = params[1].value == '' ? 0:params[1].value;
                // str += params[0].seriesName + ':' +  y1 + '<br>';
                // str += params[1].seriesName + ':' +  y2 + '%<br>';
                return str;
            }
        },
        legend: {
            data: ['弱区数量','弱栅格占比']
        },
        grid: {
            left: 10,
            right: 10,
            bottom: 5,
            top: 30,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false,
            },
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            },
            data: xDatas
        },
        yAxis: [{
            type: 'value',
            name: '数量（个）',
            // min: 0,
            // max: 100,
            axisTick: {
                show: false,
            },
            // splitNumber : 3,
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#ededef'
                }
            },
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            }
        }, {
            type: 'value',
            name: '占比（%）',
            // min: 0,
            // max: 2500,
            axisTick: {
                show: false,
            },
            // splitNumber : 3,
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#ededef'
                }
            },
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            }
        }],
        series: [{
            type: 'bar',
            barWidth: '20%',
            name: '弱区数量',
            yAxisIndex: 0,
            smooth:true,
            itemStyle: {
                normal:{
                    color: '#64BBA8',
                    barBorderRadius: 5
                }
            },
            data: mrCnt
        },{
            type: 'line',
            name: '弱栅格占比',
            yAxisIndex: 1,
            smooth:true,
            itemStyle: {
                normal:{
                    color: '#FEDA70'
                }
            },
            data: agpsmrCnt
        }]
    };

    if(objectType == '上行低速区'){
        sceneOption.legend.data = ['上行低速区数量','上行低速区栅格占比'];
        sceneOption.series[0].name = '上行低速区数量';
        sceneOption.series[1].name = '上行低速区栅格占比';
    }else if(objectType == '下行低速区'){
        sceneOption.legend.data = ['下行低速区数量','下行低速区栅格占比'];
        sceneOption.series[0].name = '下行低速区数量';
        sceneOption.series[1].name = '下行低速区栅格占比';
    }else if(objectType == 'MOD3干扰区'){
        sceneOption.legend.data = ['MOD3干扰区数量','MOD3干扰区栅格占比'];
        sceneOption.series[0].name = 'MOD3干扰区数量';
        sceneOption.series[1].name = 'MOD3干扰区栅格占比';
    }else if(objectType == '越区覆盖区'){
        sceneOption.legend.data = ['越区覆盖区数量','越区覆盖区栅格占比'];
        sceneOption.series[0].name = '越区覆盖区数量';
        sceneOption.series[1].name = '越区覆盖区栅格占比';
    }else if(objectType == '重叠覆盖区'){
        sceneOption.legend.data = ['重叠覆盖区数量','重叠覆盖区栅格占比'];
        sceneOption.series[0].name = '重叠覆盖区数量';
        sceneOption.series[1].name = '重叠覆盖区栅格占比';
    }

    chartDiv.setOption(sceneOption);
    if(isCenter == undefined){
        chartDiv.on('click', function (params) {
            // var day = new Date().format('yyyy')+params.name;

            // var day = IntelligentRoadTestChart.vm.urlEndDay.substring(0,4)+params.name;
            var day = IntelligentRoadTestChart.xDatas[params.dataIndex];
            day = day.substring(0, 4) + "-" + day.substring(4, 6) + "-" + day.substring(6, 8);
            IntelligentRoadTestChart.vm.tableDay = day;
            tableDataProcessForVueComponent.loadTable(day);
            // echartUtil.loadChartData(IntelligentRoadTestChart.vm.cityFlag,IntelligentRoadTestChart.vm.district,IntelligentRoadTestChart.vm.market);
            echartUtil.loadChartData2(day);
            IntelligentRoadTestChart.vm.urlEndDay2 = day;
        });
    }else{
        chartDiv.on('click', function (params) {
            // tableDataProcessForVueComponent.loadTable(day);
            var xName = params.name;
            var city = IntelligentRoadTestChart.vm.cityFlag;
            var district = IntelligentRoadTestChart.vm.district;
            var market = IntelligentRoadTestChart.vm.market;
            if(city == '全省'){
                city = xName;
                IntelligentRoadTestChart.vm.cityQuerystr = xName;
            }else if(city != '全省' && district == '全市'){
                district = xName;
                IntelligentRoadTestChart.vm.districtQuerystr = xName;
            }else if(city != '全省' && district != '全市'){
                market = xName;
                IntelligentRoadTestChart.vm.marketQuerystr = xName;
            }


            // echartUtil.loadChartData(city,district,market)
            tableDataProcessForVueComponent.loadTable(IntelligentRoadTestChart.vm.urlEndDay2,city,district,market);
        });
    }

    /*$(window).resize(function () {
        chartDiv.resize();
    })*/
}

/**********************************
 * @funcname monthMinus
 * @funcdesc 计算月份差
 * @param date1 开始日期
 * @param date2 结束日期
 * @return m 月份差
 * @author laijunbao
 * @create 2018-04-27 11:23
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.monthMinus = function (date1,date2) {
// 拆分年月日
    date1 = date1.split('-');
// 得到月数
    date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
// 拆分年月日
    date2 = date2.split('-');
// 得到月数
    date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
    var m = Math.abs(date1 - date2);
    return m;
}

/**********************************
 * @funcname chartExport
 * @funcdesc 图表导出
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-05-15 11:36
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.chartExport = function () {
    var objectType = IntelligentRoadTestChart.vm.statistical;
    // var city = IntelligentRoadTestChart.vm.cityFlag;
    var city = IntelligentRoadTestChart.vm.cityQuerystr;
    var district = IntelligentRoadTestChart.vm.districtQuerystr;
    var market = IntelligentRoadTestChart.vm.marketQuerystr;
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    var ZLQY_FLAG = 0;
    var bestOrsc = IntelligentRoadTestChart.vm.bestOrsc;
    var threshold = IntelligentRoadTestChart.vm.thresholdVal;
    var list = [];
    var table = '';
    var templateId = '';
    var title = ["日期","指标类别","AGPS-MR覆盖记录数","全量MR覆盖记录数","AGPS-MR覆盖95记录数","AGPS-MR95覆盖率","全量MR覆盖95记录数","全量MR95覆盖率","AGPS-MR覆盖100记录数","AGPS-MR100覆盖率","全量MR覆盖100记录数","全量MR100覆盖率","AGPS-MR覆盖105记录数","AGPS-MR105覆盖率","全量MR覆盖105记录数","全量MR105覆盖率","AGPS-MR覆盖110记录数","AGPS-MR110覆盖率","全量MR覆盖110记录数","全量MR110覆盖率","AGPS-MR覆盖115记录数","AGPS-MR115覆盖率","全量MR覆盖115记录数","全量MR115覆盖率"]
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

    var factory = IntelligentRoadTestChart.vm.factory;
    if(objectType == '扇区'){
        templateId = 'StatisticsDL_MRSatCellDownload';

        if(factory != '全部' && factory != '其他'){
            list.push(`FACTORY_CONDITION:and factory='${factory}'`);
        }else if(factory == '其他'){
            list.push(`FACTORY_CONDITION:and factory not in ('华为','中兴','爱立信')`);
        }else if(factory == '全部'){
            list.push(`FACTORY_CONDITION:`);
        }
        title.push('AGPS-MR基站数','全量MR基站数','AGPS-MR扇区数','全量MR扇区数');
    }else if(objectType == '全区域'){
        templateId = 'StatisticsDL_MRSatAllAreadownload';
    }else if($.inArray(objectType,['弱区','上行低速区','下行低速区','MOD3干扰区','越区覆盖区','重叠覆盖区']) > -1){
        templateId = 'StatisticsDL_PoorGridCountImg';
        if($.inArray(objectType,['上行低速区','下行低速区','MOD3干扰区','越区覆盖区','重叠覆盖区']) > -1){
            title = ["日期",objectType+"数量",objectType+"栅格数","总栅格数",objectType+"栅格占比"];
        }else{
            title = ["日期",objectType+"数量",objectType+"弱栅格数","总栅格数",objectType+"弱栅格占比"];
        }

        name = objectType + '_' + urlEndDay;
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
    }else if(objectType == '高铁'){
        templateId = 'StatisticsDL_HSRail_01';
        title = ["日期","场景","全量MR数","达标里程","未达标里程","脱网里程"];
    }else if(objectType == '地铁'){
        templateId = 'StatisticsDL_MRSubway_Img';
        title = ["日期","全量MR覆盖"+threshold+"记录数","全量MR覆盖"+threshold+"覆盖率"];
    }else{
        templateId = 'StatisticsDL_MRSatSceneDownload_time';

        if(objectType == '战狼区域'){
            list.push(`ZLQY_CONDITION:AND ZLQY_FLAG = 1`);
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '高流量商务区'`)
        }else if($.inArray(objectType,['高速','市政路']) > -1){
            if(objectType == '高速'){
                list.push(`OBJECT_TYPE:and OBJECT_TYPE = '高速'`);
            }else{
                list.push(`OBJECT_TYPE:and OBJECT_TYPE = '市政路'`);
            }
        }else{
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '${objectType}'`);
            list.push(`ZLQY_CONDITION:`);
        }
    }
    if($.inArray(objectType,['全区域','高校','场馆','美食','高密度住宅区','高流量商务区','战狼区域','农贸市场','中小学','城中村']) > -1){
        title = ["日期","指标类别",
            "AGPS-MR覆盖记录数","全量MR覆盖记录数","全量MR室内覆盖记录数","全量MR室外覆盖记录数",
            "AGPS-MR覆盖95记录数","AGPS-MR95覆盖率","全量MR覆盖95记录数","全量MR95覆盖率","全量MR95室内记录数","全量MR95室内覆盖率","全量MR95室外记录数","全量MR95室外覆盖率",
            "AGPS-MR覆盖100记录数","AGPS-MR100覆盖率","全量MR覆盖100记录数","全量MR100覆盖率","全量MR100室内记录数","全量MR100室内覆盖率","全量MR100室外记录数","全量MR100室外覆盖率",
            "AGPS-MR覆盖105记录数","AGPS-MR105覆盖率","全量MR覆盖105记录数","全量MR105覆盖率","全量MR105室内记录数","全量MR105室内覆盖率","全量MR105室外记录数","全量MR105室外覆盖率",
            "AGPS-MR覆盖110记录数","AGPS-MR110覆盖率","全量MR覆盖110记录数","全量MR110覆盖率","全量MR110室内记录数","全量MR110室内覆盖率","全量MR110室外记录数","全量MR110室外覆盖率",
            "AGPS-MR覆盖115记录数","AGPS-MR115覆盖率","全量MR覆盖115记录数","全量MR115覆盖率","全量MR115室内记录数","全量MR115室内覆盖率","全量MR115室外记录数","全量MR115室外覆盖率"]
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
        var cityId = noceUtil.city_LATN_ID[city];
        list.push(`CITY_CONDITION:and CITY_ID=${cityId}`);
    }else{
        list.push(`CITY_CONDITION:`);
    }
    if(district != '全市'){
        list.push(`COUNTRY_CONDITION:and COUNTRY='${district}'`);
    }else{
        list.push(`COUNTRY_CONDITION:`);
    }
    if(market != '全区'){
        list.push(`MKTCENTER_CONDITION:and MKTCENTER like '%${market}%'`);
    }else{
        list.push(`MKTCENTER_CONDITION:`);
    }
    if(objectType == "高铁"){
        list.push(`STATCYCLE:${table}`);
        list.push(`START_TIME:${dayComponetUtil.chart1StartDate}`);
        list.push(`END_TIME:${dayComponetUtil.chart1EndDate}`);
    }else{
        list.push(`START_TIME:${urlStartDay}`);
        list.push(`END_TIME:${urlEndDay}`);
    }

    if($.inArray(objectType,['弱区','上行低速区','下行低速区','MOD3干扰区','越区覆盖区','重叠覆盖区']) > -1){
        bestOrsc = '';
    }
    var name = city + district + market + urlStartDay + '-' + urlEndDay + objectType + '_' + bestOrsc ;
    if(city == '全省'){
        name = '全省' + urlStartDay + '-' +urlEndDay + objectType + '_' + bestOrsc;
    }else if(city != '全省' && district == '全市' && market == '全区'){
        name = city + urlStartDay + '-' + urlEndDay + objectType + '_' + bestOrsc;
    }else if(city != '全省' && district != '全市' && market == '全区'){
        name = city + district + urlStartDay + '-' + urlEndDay + objectType + '_' + bestOrsc;
    }else if(city != '全省' && district != '全市' && market != '全区'){
        name = city + district + market + urlStartDay + '-' + urlEndDay + objectType + '_' + bestOrsc;
    }
    if(factory != '全部'){
        name += "_" + factory;
    }

    if(objectType == "高铁"){
        name = urlStartDay + "-" + urlEndDay + city + "高铁" +  threshold + "覆盖走势图数据";
    }

    var obj = {
        fileName: name,
        dataType: 3,
        paraLists: [
            {
                sheetName: name,
                titleName: title,
                mergeTitle: [],
                templateId: templateId,
                templatePara: list
            }
        ]
    };
    var exportExcel = new exportExcelNew(obj);
    exportExcel.submit();
}
/**********************************
 * @funcname chartExport2
 * @funcdesc 图表2导出
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-05-15 11:36
 * @modifier
 * @modify
 ***********************************/
echartUtil.chartExport2 = function () {
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var city = IntelligentRoadTestChart.vm.cityFlag;
    var district = IntelligentRoadTestChart.vm.district;
    var market = IntelligentRoadTestChart.vm.market;
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay2;
    var ZLQY_FLAG = 0;
    var bestOrsc = IntelligentRoadTestChart.vm.bestOrsc2;
    var threshold = IntelligentRoadTestChart.vm.thresholdVal2;
    var list = [];
    var table = '';
    var templateId = '';
    var title = ["地区","指标类别","AGPS-MR覆盖记录数","全量MR覆盖记录数","AGPS-MR覆盖95记录数","AGPS-MR95覆盖率","全量MR覆盖95记录数","全量MR95覆盖率","AGPS-MR覆盖100记录数","AGPS-MR100覆盖率","全量MR覆盖100记录数","全量MR100覆盖率","AGPS-MR覆盖105记录数","AGPS-MR105覆盖率","全量MR覆盖105记录数","全量MR105覆盖率","AGPS-MR覆盖110记录数","AGPS-MR110覆盖率","全量MR覆盖110记录数","全量MR110覆盖率","AGPS-MR覆盖115记录数","AGPS-MR115覆盖率","全量MR覆盖115记录数","全量MR115覆盖率"];

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

    var factory = IntelligentRoadTestChart.vm.factory2;

    if(objectType == '扇区'){
        templateId = 'StatisticsDL_MRSatCellImg_city_download';

        if(factory != '全部' && factory != '其他'){
            list.push(`FACTORY_CONDITION:and factory='${factory}'`);
        }else if(factory == '其他'){
            list.push(`FACTORY_CONDITION:and factory not in ('华为','中兴','爱立信')`);
        }else if(factory == '全部'){
            list.push(`FACTORY_CONDITION:`);
        }
        title.push('AGPS-MR基站数','全量MR基站数','AGPS-MR扇区数','全量MR扇区数');
    }else if(objectType == '高铁'){
        templateId = 'StatisticsDL_HSRail_01';
        list.push("ROAD_NAME_CONDITION:AND road_name = '" + IntelligentRoadTestChart.vm.roadName + "'")
        title = ["日期","场景","全量MR数","达标里程","未达标里程","脱网里程"];
    }else if(objectType == '全区域'){
        templateId = 'StatisticsDL_MRSatAllAreaImg_city_download';
    }else if($.inArray(objectType,['弱区','上行低速区','下行低速区','MOD3干扰区','越区覆盖区','重叠覆盖区']) > -1){
        templateId = 'StatisticsDL_PoorGridCountImg_city';
        if($.inArray(objectType,['上行低速区','下行低速区','MOD3干扰区','越区覆盖区','重叠覆盖区']) > -1){
            title = ["区域",objectType+"数量",objectType+"栅格数","总栅格数",objectType+"栅格占比"];
        }else{
            title = ["区域",objectType+"数量",objectType+"弱栅格数","总栅格数",objectType+"弱栅格占比"];
        }
        name = objectType + '_' + urlEndDay;
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
    }else{
        templateId = 'StatisticsDL_MRSatSceneDownload_city';
        if(objectType == '战狼区域'){
            list.push(`ZLQY_CONDITION:AND ZLQY_FLAG = 1`);
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '高流量商务区'`);
        }else if($.inArray(objectType,['高速','市政路']) > -1){
            if(objectType == '高速'){
                list.push(`OBJECT_TYPE:and OBJECT_TYPE = '高速'`);
            }else{
                list.push(`OBJECT_TYPE:and OBJECT_TYPE = '市政路'`);
            }
        }else{
            list.push(`OBJECT_TYPE:and OBJECT_TYPE = '${objectType}'`);
            list.push(`ZLQY_CONDITION:`);
        }
    }
    if($.inArray(objectType,['全区域','高校','场馆','美食','高密度住宅区','高流量商务区','战狼区域','农贸市场','中小学','城中村']) > -1){
        title = ["地区","指标类别",
            "AGPS-MR覆盖记录数","全量MR覆盖记录数","全量MR室内覆盖记录数","全量MR室外覆盖记录数",
            "AGPS-MR覆盖95记录数","AGPS-MR95覆盖率","全量MR覆盖95记录数","全量MR95覆盖率","全量MR95室内记录数","全量MR95室内覆盖率","全量MR95室外记录数","全量MR95室外覆盖率",
            "AGPS-MR覆盖100记录数","AGPS-MR100覆盖率","全量MR覆盖100记录数","全量MR100覆盖率","全量MR100室内记录数","全量MR100室内覆盖率","全量MR100室外记录数","全量MR100室外覆盖率",
            "AGPS-MR覆盖105记录数","AGPS-MR105覆盖率","全量MR覆盖105记录数","全量MR105覆盖率","全量MR105室内记录数","全量MR105室内覆盖率","全量MR105室外记录数","全量MR105室外覆盖率",
            "AGPS-MR覆盖110记录数","AGPS-MR110覆盖率","全量MR覆盖110记录数","全量MR110覆盖率","全量MR110室内记录数","全量MR110室内覆盖率","全量MR110室外记录数","全量MR110室外覆盖率",
            "AGPS-MR覆盖115记录数","AGPS-MR115覆盖率","全量MR覆盖115记录数","全量MR115覆盖率","全量MR115室内记录数","全量MR115室内覆盖率","全量MR115室外记录数","全量MR115室外覆盖率"]
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
        list.push(`CITY:CITY`);
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
    if(market != '全区'){
        list.push(`MKTCENTER_CONDITION:and MKTCENTER='${market}'`);
    }else{
        list.push(`MKTCENTER_CONDITION:`);
    }

    if(objectType == "高铁"){
        list.push(`STATCYCLE:${table}`);
        list.push(`START_TIME:${dayComponetUtil.chart2StartDate}`);
        list.push(`END_TIME:${dayComponetUtil.chart2EndDate}`);
    }else{
        list.push(`START_TIME:${urlStartDay}`);
        list.push(`END_TIME:${urlEndDay}`);
    }

    if(city != '全省' && city != '其他' && district == '全市'){
        list.push(`CITY:COUNTRY`);
    }else{
        list.push(`CITY:MKTCENTER`);
    }
    if($.inArray(objectType,['弱区','上行低速区','下行低速区','MOD3干扰区','越区覆盖区','重叠覆盖区']) > -1){
        bestOrsc = '';
    }
    var name = city + district + market + urlEndDay + objectType + '_' + bestOrsc;
    if(city == '全省'){
        name = '全省' + urlEndDay + objectType + '_' + bestOrsc;
    }else if(city != '全省' && district == '全市' && market == '全区'){
        name = city + urlEndDay + objectType + '_' + bestOrsc;
    }else if(city != '全省' && district != '全市' && market == '全区'){
        name = city + district + urlEndDay + objectType + '_' + bestOrsc;
    }else if(city != '全省' && district != '全市' && market != '全区'){
        name = city + district + market + urlEndDay + objectType + '_' + bestOrsc;
    }
    if(factory != '全部'){
        name += "_" + factory;
    }
    if(objectType == "高铁"){
        name = urlStartDay + "-" + urlEndDay + city + IntelligentRoadTestChart.vm.roadName  + threshold + "覆盖走势图数据";
    }
    var obj = {
        fileName: name,
        dataType: 3,
        paraLists: [
            {
                sheetName: name,
                titleName: title,
                mergeTitle: [],
                templateId: templateId,
                templatePara: list
            }
        ]
    };
    var exportExcel = new exportExcelNew(obj);
    exportExcel.submit();
}

/**********************************
 * @funcname echartUtil.HSRailDataHandler
 * @funcdesc 高铁图表数据处理
 * @param {Number} whichChart 哪个图表（用数字表示，1表示第一图表）
 * @param {String} scene 场景
 * @param {String} line 线路
 * @param {Object} extendObj 扩展对象（其他参数）
 * @return
 * @author laijunbao
 * @create 2019-01-24 10:45
 * @modifier
 * @modify HSRailDataWithChart1
 ***********************************/
echartUtil.HSRailDataHandler = function (data,scene,extendObj) {
    var result = data.filter(function (data) {
        return data.scene == scene;
    })
    var rsrp_cnt_sum_arr = [];
    var qulified_length_arr = [];
    var unqualified_length_arr = [];
    var out_neted_length_arr = [];

    var rsrp_cnt_sum_obj = {};
    var qulified_length_obj = {};
    var unqualified_length_obj = {};
    var out_neted_length_obj = {};

    for (let i = 0; i < extendObj.xDatas.length; i++) {
        rsrp_cnt_sum_obj[extendObj.xDatas[i]] = 0;
        qulified_length_obj[extendObj.xDatas[i]] = 0;
        unqualified_length_obj[extendObj.xDatas[i]] = 0;
        out_neted_length_obj[extendObj.xDatas[i]] = 0;
    }
    for (day in rsrp_cnt_sum_obj) {
        for (let j = 0; j < result.length; j++) {
            if(day == result[j]["day"]+""){
                rsrp_cnt_sum_obj[day] = result[j].rsrp_cnt_sum/1000 || 0;
                qulified_length_obj[day] = result[j].qulified_length/1000  || 0;
                unqualified_length_obj[day] = result[j].unqualified_length/1000  || 0;
                out_neted_length_obj[day] = result[j].out_neted_length/1000  || 0;
            }
        }
    }
    var resultObj = {
        rsrp_cnt_sum_arr: echartUtil.forObj(extendObj.xDatas,rsrp_cnt_sum_obj),
        qulified_length_arr: echartUtil.forObj(extendObj.xDatas,qulified_length_obj),
        unqualified_length_arr: echartUtil.forObj(extendObj.xDatas,unqualified_length_obj),
        out_neted_length_arr: echartUtil.forObj(extendObj.xDatas,out_neted_length_obj),
    }

    return resultObj;
}

