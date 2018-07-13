var echartUtil = {};

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
 * @param
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
    }else if($.inArray(objectType,['弱区','上行低速区','下行低速区']) > -1){
        echartUtil.getWeakPoorChart(city,district,market);
    }else{
        echartUtil.getChartData(city,district,market).then(function(data) {
            echartUtil.dataProcess(data);
        }).then(function() {
            IntelligentRoadTestChart.vm.chartObj.hideLoading();
        })
    }
}
echartUtil.loadChartData2 = function(day){
    echartUtil.initChart2();
    // 统计对象
    var objectType = IntelligentRoadTestChart.vm.statistical;

    if(objectType == '工单'){
        echartUtil.loadWorkOrderChart();
    }else if($.inArray(objectType,['弱区','上行低速区','下行低速区']) > -1){
        echartUtil.getWeakPoorChart2(day);
    }else{
        echartUtil.getChartData2(day).then(function(data) {
            echartUtil.dataProcess2(data);
        }).then(function() {
            IntelligentRoadTestChart.vm.chartObj2.hideLoading();
        })
    }
}

/**********************************
 * @funcname getChartData
 * @funcdesc 获取图表数据（五高。。）
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-17 11:38
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.getChartData = function(city,district,market){
    var promise = new Promise(function  (resolve,reject) {
        var list = echartUtil.getSql(city,district,market);
        function successCallback(data,par) {
            resolve(data);
        }
        var progressBarSqls = [];
        var functionlist = [successCallback];
        progressBarSqls.push(list);
        progressbarTwo.submitSql(progressBarSqls, functionlist, [3]);
    });
    return promise;
}
echartUtil.getChartData2 = function(day){
    var promise = new Promise(function  (resolve,reject) {
        var list = echartUtil.getSql2(day);
        function successCallback(data,par) {
            resolve(data);
        }
        var progressBarSqls = [];
        var functionlist = [successCallback];
        progressBarSqls.push(list);
        progressbarTwo.submitSql(progressBarSqls, functionlist, [3]);
    });
    return promise;
}

/**********************************
 * @funcname getSql
 * @funcdesc 拼接查询sql
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-25 22:45
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.getSql = function(city,district,market){
    if(city == undefined){
        city = IntelligentRoadTestChart.vm.cityQuerystr;;
    }
    if(district == undefined){
        district = IntelligentRoadTestChart.vm.districtQuerystr;
    }
    if(market == undefined){
        market = IntelligentRoadTestChart.vm.marketQuerystr;
    }
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    var ZLQY_FLAG = 0;
    var bestOrsc = IntelligentRoadTestChart.vm.bestOrsc;
    var threshold = IntelligentRoadTestChart.vm.thresholdVal;
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
        list.push('StatisticsDL_MRSatCellImg');
    }else if(objectType == '全区域'){
        list.push('StatisticsDL_MRSatAllAreaImg');
    }else{
        list.push('StatisticsDL_MRSatSceneImg_time');
        if(objectType == '战狼区域'){
            list.push(`ZLQY_CONDITION:AND ZLQY_FLAG = 1`);
            list.push(`OBJECT_TYPE:高流量商务区`);
        }else{
            list.push(`OBJECT_TYPE:${objectType}`);
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

    list.push(`START_TIME:${urlStartDay}`);
    list.push(`END_TIME:${urlEndDay}`);

    return list;
}

echartUtil.getSql2 = function(day){
    var city = IntelligentRoadTestChart.vm.cityFlag;
    var district = IntelligentRoadTestChart.vm.district;
    var market = IntelligentRoadTestChart.vm.market;
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay2;
    if(day != undefined){
        urlEndDay = day;
    }
    var ZLQY_FLAG = 0;
    var bestOrsc = IntelligentRoadTestChart.vm.bestOrsc2;
    var threshold = IntelligentRoadTestChart.vm.thresholdVal2;
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
        list.push('StatisticsDL_MRSatCellImg_city');
    }else if(objectType == '全区域'){
        list.push('StatisticsDL_MRSatAllAreaImg_city');
    }else{
        list.push('StatisticsDL_MRSatSceneImg_city');
        if(objectType == '战狼区域'){
            list.push(`ZLQY_CONDITION:AND ZLQY_FLAG = 1`);
            list.push(`OBJECT_TYPE:高流量商务区`);
        }else{
            list.push(`OBJECT_TYPE:${objectType}`);
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
    if(city != '全省' && city != '其他' && district == '全市'){
        list.push(`CITY:COUNTRY`);
    }else{
        list.push(`CITY:MKTCENTER`);
    }
    /*if(market == '全区'){
        list.push(`MKTCENTER_CONDITION:`);
    }else if(market == '其他'){
        list.push(`MKTCENTER_CONDITION:and MKTCENTER is null`);
    }else{
        if(objectType != '弱区' && objectType != '扇区' && objectType != '全区域'){
            list.push(`MKTCENTER_CONDITION:and MKTCENTER like '%${market}%'`);
        }else{
            list.push(`MKTCENTER_CONDITION:and MKTCENTER='${market}'`);
        }
    }*/

    list.push(`START_TIME:${urlStartDay}`);
    list.push(`END_TIME:${urlEndDay}`);

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
    // 下标0是全量的数据数组，1是agps的数据数组
    var agpsTypeFor0 = echartUtil.crossfilterData(data)[0];
    var agpsTypeFor1 = echartUtil.crossfilterData(data)[1];
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;

    var xDatas = echartUtil.getStartAndEndDay();

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
    //覆盖率
    var mrRate = [];
    var agpsmrRate = [];

    var agps_mr_rate = {};
    var agps_mr_cnt = {};
    var mr_rate = {};
    var mr_cnt = {};

    xDatas.forEach(function(d) {
        agps_mr_rate[d] = 0;
        agps_mr_cnt[d] = 0;
        mr_rate[d] = 0;
        mr_cnt[d] = 0;
    });

    agpsTypeFor0.forEach( function(that) {
        for(m in mr_cnt){
            if(m == that[isDate]+""){
                mr_cnt[m] = that.rsrp_cnt;
                mr_rate[m] = that.rsrp_rate;
            }
        }
    })
    agpsTypeFor1.forEach(function(that) {
        for(m in agps_mr_cnt){
            if(m == that[isDate]+""){
                agps_mr_cnt[m] = that.rsrp_cnt;
                agps_mr_rate[m] = that.rsrp_rate;
            }
        }
    })
    for(o in mr_cnt){
        mrCnt.push(mr_cnt[o]==null?0:mr_cnt[o]);
    }
    for(o in mr_rate){
        mrRate.push(mr_rate[o]==null?0:mr_rate[o]);
    }
    for(o in agps_mr_cnt){
        agpsmrCnt.push(agps_mr_cnt[o]==null?0:agps_mr_cnt[o]);
    }
    for(o in agps_mr_rate){
        agpsmrRate.push(agps_mr_rate[o]==null?0:agps_mr_rate[o]);
    }

    echartUtil.showSceneChart(IntelligentRoadTestChart.vm.chartObj,xDatas2,mrCnt,agpsmrCnt,mrRate,agpsmrRate);
}
echartUtil.dataProcess2 = function(data,flag){
    // 下标0是全量的数据数组，1是agps的数据数组
    var agpsTypeFor0 = echartUtil.crossfilterData(data)[0];
    var agpsTypeFor1 = echartUtil.crossfilterData(data)[1];
    var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    var cityFlag = IntelligentRoadTestChart.vm.cityFlag;
    var district = IntelligentRoadTestChart.vm.district;

    var xDatas = [];
    var mrCnt = [];
    var agpsmrCnt = [];
    //覆盖率
    var mrRate = [];
    var agpsmrRate = [];

    var agps_mr_rate = {};
    var agps_mr_cnt = {};
    var mr_rate = {};
    var mr_cnt = {};

    var fetchStr = 'city';
    if(cityFlag != '全省' && cityFlag != '其他'){
        fetchStr = 'country';
    }
    if(district != '全市' && district != '其他'){
        fetchStr = 'mktcenter';
    }
    if(agpsTypeFor0.length != 0){
        agpsTypeFor0.forEach(function(d) {
            agps_mr_rate[d[fetchStr]] = 0;
            agps_mr_cnt[d[fetchStr]] = 0;
            mr_rate[d[fetchStr]] = 0;
            mr_cnt[d[fetchStr]] = 0;
            xDatas.push(d[fetchStr]);

        });
    }else{
        agpsTypeFor1.forEach(function(d) {
            agps_mr_rate[d[fetchStr]] = 0;
            agps_mr_cnt[d[fetchStr]] = 0;
            mr_rate[d[fetchStr]] = 0;
            mr_cnt[d[fetchStr]] = 0;
            xDatas.push(d[fetchStr]);

        });
    }


    agpsTypeFor0.forEach( function(that) {
        for(m in mr_cnt){
            if(m == that[fetchStr]){
                mr_cnt[m] = that.rsrp_cnt;
                mr_rate[m] = that.rsrp_rate;
            }
        }
    })
    agpsTypeFor1.forEach(function(that) {
        for(m in agps_mr_cnt){
            if(m == that[fetchStr]){
                agps_mr_cnt[m] = that.rsrp_cnt;
                agps_mr_rate[m] = that.rsrp_rate;
            }
        }
    })
    for(o in mr_cnt){
        mrCnt.push(mr_cnt[o]==null?0:mr_cnt[o]);
    }
    for(o in mr_rate){
        mrRate.push(mr_rate[o]==null?0:mr_rate[o]);
    }
    for(o in agps_mr_cnt){
        agpsmrCnt.push(agps_mr_cnt[o]==null?0:agps_mr_cnt[o]);
    }
    for(o in agps_mr_rate){
        agpsmrRate.push(agps_mr_rate[o]==null?0:agps_mr_rate[o]);
    }

    echartUtil.showSceneChart(IntelligentRoadTestChart.vm.chartObj2,xDatas,mrCnt,agpsmrCnt,mrRate,agpsmrRate,true);
}
/**********************************
 * @funcname weakAreaDataProcess
 * @funcdesc 弱区图表数据处理
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
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
 * @param
 * @return {datatype}
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
 * @param
 * @return {datatype}
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
    CrossFilterObjFor1.add(result);
    CrossFilterObjFor0.add(result);
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
    CrossFilterObjByTotal1.filter(function (d) {
        return d==1;
    })
    CrossFilterObjByTotal0.filter(function (d) {
        return d==0;
    })
    var agpsTypeFor1 = CrossFilterObjByTotal1.bottom(CrossFilterObjFor1.size());
    var agpsTypeFor0 = CrossFilterObjByTotal0.bottom(CrossFilterObjFor0.size());

    CrossFilterObjFor0.remove();
    CrossFilterObjFor1.remove();

    CrossFilterObjFor1.add(agpsTypeFor1);
    CrossFilterObjFor0.add(agpsTypeFor0);

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
    agpsTypeFor1 = CrossFilterObjByTotal1.bottom(CrossFilterObjFor1.size());
    agpsTypeFor0 = CrossFilterObjByTotal0.bottom(CrossFilterObjFor0.size());

    return [agpsTypeFor0,agpsTypeFor1];
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
 * @param
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
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
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
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-28 10:01
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.getWeakPoorChartPromiseArr = function(city,district,market) {
    if(city == undefined){
        city = IntelligentRoadTestChart.vm.cityQuerystr;;
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
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-25 21:22
 * @modifier 
 * @modify 
 ***********************************/
echartUtil.showSceneChart = function(div,xDatas,mrCnt,agpsmrCnt,mrRate,agpsmrRate,isCenter){
    // var chartDiv =  IntelligentRoadTestChart.vm.chartObj;
    var city = IntelligentRoadTestChart.vm.cityFlag=='全省'?'':IntelligentRoadTestChart.vm.cityFlag;
    var district = IntelligentRoadTestChart.vm.district=='全市'?'':IntelligentRoadTestChart.vm.district;
    var market = IntelligentRoadTestChart.vm.market=='全区'?'':IntelligentRoadTestChart.vm.market;
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
                }else if(city == ''){
                    str += params[0].name + ' ' + '全省' + '区域:<br>';
                }
                if(params.length==4){
                    var y1 = params[0].value == '' ? 0:params[0].value;
                    var y2 = params[1].value == '' ? 0:params[1].value;
                    var y3 = params[2].value == '' ? 0:params[2].value;
                    var y4 = params[3].value == '' ? 0:params[3].value;
                    str += params[0].seriesName + ':' +  y1 + '%<br>';
                    str += params[1].seriesName + ':' +  y2 + '%<br>';
                    str += params[2].seriesName + ':' +  y3 + '<br>';
                    str += params[3].seriesName + ':' +  y4 + '<br>';
                }else if(params.length==3){
                    var formatStr = '';
                    if(params[0].seriesName.indexOf('率') > 0){
                        formatStr = '%';
                    }else{
                        formatStr = '';
                    }
                    var y1 = params[0].value == '' ? 0:params[0].value + formatStr;

                    if(params[1].seriesName.indexOf('率') > 0){
                        formatStr = '%';
                    }else{
                        formatStr = '';
                    }
                    var y2 = params[1].value == '' ? 0:params[1].value + formatStr;

                    if(params[2].seriesName.indexOf('率') > 0){
                        formatStr = '%';
                    }else{
                        formatStr = '';
                    }
                    var y3 = params[2].value == '' ? 0:params[2].value + formatStr;

                    str += params[0].seriesName + ':' +  y1 + '<br>';
                    str += params[1].seriesName + ':' +  y2 + '<br>';
                    str += params[2].seriesName + ':' +  y3 + '<br>';
                }else if(params.length==2){
                    var formatStr = '';
                    if(params[0].seriesName.indexOf('率') > 0){
                        formatStr = '%';
                    }else{
                        formatStr = '';
                    }
                    var y1 = params[0].value == '' ? 0:params[0].value + formatStr;

                    if(params[1].seriesName.indexOf('率') > 0){
                        formatStr = '%';
                    }else{
                        formatStr = '';
                    }
                    var y2 = params[1].value == '' ? 0:params[1].value + formatStr;

                    str += params[0].seriesName + ':' +  y1 + '<br>';
                    str += params[1].seriesName + ':' +  y2 + '<br>';
                }else if(params.length==1){
                    var formatStr = '';
                    if(params[0].seriesName.indexOf('率') > 0){
                        formatStr = '%';
                    }else{
                        formatStr = '';
                    }
                    var y1 = params[0].value == '' ? 0:params[0].value + formatStr;

                    str += params[0].seriesName + ':' +  y1 + '<br>';
                }

                return str;
            }
        },
        legend: {
            data: ['AGPS-MR记录数','全量MR记录数','AGPS-MR覆盖率','全量-MR覆盖率']
        },
        grid: {
            left: 0,
            right: 0,
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
            }
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

    chartDiv.setOption(sceneOption);
    if(isCenter == undefined){
        chartDiv.on('click', function (params) {
            var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
            var day = new Date().format('yyyy')+params.name;
            if(dateCycle == '月'){
                day = params.name;
                day = day.substring(0, 4) + "-" + day.substring(4, 6);
            }else{
                day = day.substring(0, 4) + "-" + day.substring(4, 6) + "-" + day.substring(6, 8);
            }
            IntelligentRoadTestChart.vm.tableDay = day;
            tableDataProcessForVueComponent.loadTable(day);
            echartUtil.loadChartData2(day);
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
            echartUtil.loadChartData(city,district,market)
            tableDataProcessForVueComponent.loadTable(IntelligentRoadTestChart.vm.urlEndDay2,city,district,market);
        });
    }

    $(window).resize(function () {
        chartDiv.resize();
    })
}
/**********************************
 * @funcname showWorkOrderChart
 * @funcdesc 工单图表
 * @param 
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
    $(window).resize(function () {
        chartDiv.resize();
    })
}
/**********************************
 * @funcname showWeakPoorChart
 * @funcdesc 弱区图表
 * @param 
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
    }

    chartDiv.setOption(sceneOption);
    if(isCenter == undefined){
        chartDiv.on('click', function (params) {
            var day = new Date().format('yyyy')+params.name;
            day = day.substring(0, 4) + "-" + day.substring(4, 6) + "-" + day.substring(6, 8);
            IntelligentRoadTestChart.vm.tableDay = day;
            tableDataProcessForVueComponent.loadTable(day);
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
            echartUtil.loadChartData(city,district,market)
            tableDataProcessForVueComponent.loadTable(IntelligentRoadTestChart.vm.urlEndDay2,city,district,market);
        });
    }

    $(window).resize(function () {
        chartDiv.resize();
    })
}

/**********************************
 * @funcname monthMinus
 * @funcdesc 计算月份差
 * @param
 * @return {datatype}
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

    if(objectType == '扇区'){
        templateId = 'StatisticsDL_MRSatCellDownload';
    }else if(objectType == '全区域'){
        templateId = 'StatisticsDL_MRSatAllAreadownload';
    }else if($.inArray(objectType,['弱区','上行低速区','下行低速区']) > -1){
        templateId = 'StatisticsDL_PoorGridCountImg';
        if($.inArray(objectType,['上行低速区','下行低速区']) > -1){
            title = ["日期",objectType+"数量",objectType+"栅格数",objectType+"总栅格数",objectType+"栅格占比"];
        }else{
            title = ["日期",objectType+"数量",objectType+"弱栅格数",objectType+"总栅格数",objectType+"弱栅格占比"];
        }

        name = objectType + '_' + urlEndDay;
        list.push(`TABLE:d`);
        if(objectType == '弱区'){
            list.push(`TYPE:0`);
        }else if(objectType == '上行低速区'){
            list.push(`TYPE:4`);
        }else if(objectType == '下行低速区'){
            list.push(`TYPE:5`);
        }
    }else{
        templateId = 'StatisticsDL_MRSatSceneDownload_time';
        if(objectType == '战狼区域'){
            list.push(`ZLQY_CONDITION:AND ZLQY_FLAG = 1`);
            list.push(`OBJECT_TYPE:高流量商务区`);
        }else{
            list.push(`OBJECT_TYPE:${objectType}`);
            list.push(`ZLQY_CONDITION:`);
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
        var cityId = noceUtil.city_LATN_ID[city];
        list.push(`CITY_CONDITION:and CITY_ID=${cityId}`);
        // list.push(`CITY_CONDITION:and CITY='${city}'`);
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

    list.push(`START_TIME:${urlStartDay}`);
    list.push(`END_TIME:${urlEndDay}`);

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

    if(objectType == '扇区'){
        templateId = 'StatisticsDL_MRSatCellImg_city_download';
    }else if(objectType == '全区域'){
        templateId = 'StatisticsDL_MRSatAllAreaImg_city_download';
    }else if($.inArray(objectType,['弱区','上行低速区','下行低速区']) > -1){
        templateId = 'StatisticsDL_PoorGridCountImg_city';
        if($.inArray(objectType,['上行低速区','下行低速区']) > -1){
            title = ["日期",objectType+"数量",objectType+"栅格数",objectType+"总栅格数",objectType+"栅格占比"];
        }else{
            title = ["日期",objectType+"数量",objectType+"弱栅格数",objectType+"总栅格数",objectType+"弱栅格占比"];
        }
        name = objectType + '_' + urlEndDay;
        list.push(`TABLE:d`);
        if(objectType == '弱区'){
            list.push(`TYPE:0`);
        }else if(objectType == '上行低速区'){
            list.push(`TYPE:4`);
        }else if(objectType == '下行低速区'){
            list.push(`TYPE:5`);
        }
    }else{
        templateId = 'StatisticsDL_MRSatSceneDownload_city';
        if(objectType == '战狼区域'){
            list.push(`ZLQY_CONDITION:AND ZLQY_FLAG = 1`);
            list.push(`OBJECT_TYPE:高流量商务区`);
        }else{
            list.push(`OBJECT_TYPE:${objectType}`);
            list.push(`ZLQY_CONDITION:`);
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
    if(market != '全区'){
        list.push(`MKTCENTER_CONDITION:and MKTCENTER='${market}'`);
    }else{
        list.push(`MKTCENTER_CONDITION:`);
    }

    list.push(`START_TIME:${urlStartDay}`);
    list.push(`END_TIME:${urlEndDay}`);

    if(city != '全省' && city != '其他' && district == '全市'){
        list.push(`CITY:COUNTRY`);
    }else{
        list.push(`CITY:MKTCENTER`);
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
