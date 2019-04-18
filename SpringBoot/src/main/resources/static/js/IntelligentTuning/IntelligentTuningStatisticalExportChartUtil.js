/**********************************
 * @filedesc 图表工具js
 * @author laijunbao
 * @create 2018-10-25-0025 11:15
 * @modifier
 * @modify
 ***********************************/

var IntelligentTuningStatisticalExportChartUtil = {};

/**********************************
 * @funcname IntelligentTuningStatisticalExportChartUtil.initChart
 * @funcdesc 初始化图表
 * @param {
 * @return {datatype}
 * @author laijunbao
 * @create 2018-11-06-0006 10:37
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportChartUtil.initChart = function () {
    try {
        if(IntelligentTuningStatisticalExport.vm.chartObj != null){
            IntelligentTuningStatisticalExport.vm.chartObj.dispose();
        }
        if(IntelligentTuningStatisticalExport.vm.chartObj2 != null){
            IntelligentTuningStatisticalExport.vm.chartObj2.dispose();
        }
        IntelligentTuningStatisticalExport.vm.chartObj = echarts.init(document.getElementById('allRegionChart'));
        IntelligentTuningStatisticalExport.vm.chartObj2 = echarts.init(document.getElementById('allRegionChart2'));

        IntelligentTuningStatisticalExportChartUtil.showLoading();
    } catch (e) {
        console.error(e);
    }
}
/**********************************
 * @funcname IntelligentTuningStatisticalExportChartUtil.getChart2XData
 * @funcdesc 区域图表x轴
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-11-01-0001 16:59
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportChartUtil.getChart2XData = function(){
    // 包含了地市区县营服的对象
    var cityDistrictMarket = IntelligentTuningStatisticalExport.vm.cityDistrictMarket;

    var city = IntelligentTuningStatisticalExport.vm.queryCity;
    var district = IntelligentTuningStatisticalExport.vm.queryDistrict;

    var areaArr = [];
    // 选择了地市和区县，x轴显示营服
    if((city != '' && city != '全省') && (district != '' && district != '全市')){
        // 某个地市区县的营服
        for (area in cityDistrictMarket){
            if(city == area){
                var countryOjbArr = cityDistrictMarket[area];
                for (country in countryOjbArr){
                    if(country == district){
                        areaArr = cityDistrictMarket[area][country];
                    }
                }
            }
        }
    }else if(city != '' && city != '全省'){
        // 某个地市的区县
        for (area in cityDistrictMarket){
            if(city == area){
                var countryOjbArr = cityDistrictMarket[area];
                for (country in countryOjbArr){
                    areaArr.push(country);
                }
            }
        }
    }else if(city == '全省'){
        // 地市
        for (area in cityDistrictMarket){
            areaArr.push(area);
        }
    }

    IntelligentTuningStatisticalExport.chart2Xdata = areaArr;

    IntelligentTuningStatisticalExport.chart2DataObjArrs = [];
    // 初始化区域图表数据格式
    areaArr.forEach(function (area) {
        var chart1DataObj2 = {};
        chart1DataObj2['area'] = area;
        chart1DataObj2['task_create_count'] = 0;
        chart1DataObj2['accept_count'] = 0;
        chart1DataObj2['execute_count'] = 0;
        chart1DataObj2['resolve_count'] = 0;
        IntelligentTuningStatisticalExport.chart2DataObjArrs.push(chart1DataObj2)
    })

}

/**********************************
 * @funcname IntelligentTuningStatisticalExportChartUtil.chartDataHandler
 * @funcdesc 图表数据处理，图表渲染
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-10-25-0025 15:04
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportChartUtil.chartDataHandler = function(){
    // 图表1数据处理并渲染图表
    IntelligentTuningStatisticalExportChartUtil.chart1DataHandler();

    // 图表2数据处理并渲染图表
    IntelligentTuningStatisticalExportChartUtil.chart2DataHandler();

    IntelligentTuningStatisticalExportChartUtil.hideLoading();

}

/**********************************
 * @funcname IntelligentTuningStatisticalExportChartUtil.chart1DataHandler
 * @funcdesc 图表1数据处理
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-10-25-0025 15:04
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportChartUtil.chart1DataHandler = function(){

    // 循环图表对象数组，得到图表1渲染所需要的数据
    IntelligentTuningStatisticalExportChartUtil.forChartDataArr();

    IntelligentTuningStatisticalExportChartUtil.showChart(IntelligentTuningStatisticalExport.vm.chartObj,
        IntelligentTuningStatisticalExport.chart1Xdata,
        IntelligentTuningStatisticalExport.chart1DataObj);

    IntelligentTuningStatisticalExport.vm.chartObj.hideLoading();
}
/**********************************
 * @funcname IntelligentTuningStatisticalExportChartUtil.chart1DataHandler
 * @funcdesc 图表2数据处理
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-10-25-0025 15:04
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportChartUtil.chart2DataHandler = function(){

    // 循环图表对象数组，得到图表2渲染所需要的数据
    IntelligentTuningStatisticalExportChartUtil.forChart2DataArr();

    IntelligentTuningStatisticalExportChartUtil.showChart(
        IntelligentTuningStatisticalExport.vm.chartObj2,
        IntelligentTuningStatisticalExport.chart2Xdata,
        IntelligentTuningStatisticalExport.chart2DataObj,
        true);

    IntelligentTuningStatisticalExport.vm.chartObj2.hideLoading();

}


/**********************************
 * @funcname IntelligentTuningStatisticalExportChartUtil.forChartDataArr
 * @funcdesc 循环图表对象数组，得到图表1渲染所需要的数据
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-10-25-0025 15:15
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportChartUtil.forChartDataArr = function(){

    // 图表1x轴
    IntelligentTuningStatisticalExport.chart1Xdata = IntelligentTuningStatisticalExportChartUtil.getStartAndEndDay("MMdd");
    IntelligentTuningStatisticalExport.chart1Xdatayyyymmdd = IntelligentTuningStatisticalExportChartUtil.getStartAndEndDay("yyyyMMdd");


    // 方案派单数
    var task_create_count_arr = [];

    // 方案受理数
    var accept_count_arr = [];

    // 执行成功数
    var execute_count_arr = [];

    // 成功解决数
    var resolve_count_arr = [];

    // 查询有结果
    if(IntelligentTuningStatisticalExportCrossFilterUtil.resultByCrossfilter.length > 0){
        IntelligentTuningStatisticalExport.chart1DataObjArrs.forEach(function (chart1DataObj) {
            IntelligentTuningStatisticalExportCrossFilterUtil.resultByCrossfilter.forEach(function (result) {
                //
                if(result.key == chart1DataObj.day){
                    chart1DataObj.task_create_count=result.value.task_create_count;
                    chart1DataObj.accept_count=result.value.accept_count;
                    chart1DataObj.execute_count=result.value.execute_count;
                    chart1DataObj.resolve_count=result.value.resolve_count;
                }
            })
        })

        IntelligentTuningStatisticalExport.chart1DataObjArrs.forEach(function (chart1Data) {
            task_create_count_arr.push(chart1Data.task_create_count);
            accept_count_arr.push(chart1Data.accept_count);
            execute_count_arr.push(chart1Data.execute_count);
            resolve_count_arr.push(chart1Data.resolve_count);
        })

        IntelligentTuningStatisticalExport.vm.task_create_count_title = task_create_count_arr.sum();
        IntelligentTuningStatisticalExport.vm.accept_count_title = accept_count_arr.sum();
        IntelligentTuningStatisticalExport.vm.execute_count_title = execute_count_arr.sum();
        IntelligentTuningStatisticalExport.vm.resolve_count_title = resolve_count_arr.sum();

    }else{
        IntelligentTuningStatisticalExport.vm.task_create_count_title = 0;
        IntelligentTuningStatisticalExport.vm.accept_count_title = 0;
        IntelligentTuningStatisticalExport.vm.execute_count_title = 0;
        IntelligentTuningStatisticalExport.vm.resolve_count_title = 0;
        IntelligentTuningStatisticalExport.chart1DataObjArrs.forEach(function (chart1DataObj) {
            task_create_count_arr.push(0);
            accept_count_arr.push(0);
            execute_count_arr.push(0);
            resolve_count_arr.push(0);
        })
    }

    IntelligentTuningStatisticalExport.chart1DataObj = {
        task_create_count_arr: task_create_count_arr,
        accept_count_arr: accept_count_arr,
        execute_count_arr: execute_count_arr,
        resolve_count_arr: resolve_count_arr
    }
}

/**********************************
 * @funcname IntelligentTuningStatisticalExportChartUtil.forChartDataArr
 * @funcdesc 循环图表对象数组，得到图表2渲染所需要的数据
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-10-25-0025 15:15
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportChartUtil.forChart2DataArr = function(){

    // 方案派单数
    var task_create_count_arr = [];

    // 方案受理数
    var accept_count_arr = [];

    // 执行成功数
    var execute_count_arr = [];

    // 成功解决数
    var resolve_count_arr = [];

    // 查询有结果
    if(IntelligentTuningStatisticalExportCrossFilterUtil.chart2resultByCrossfilter.length > 0){

        IntelligentTuningStatisticalExport.chart2DataObjArrs.forEach(function (chart2DataObj) {
            IntelligentTuningStatisticalExportCrossFilterUtil.chart2resultByCrossfilter.forEach(function (result) {
                if(result.key == chart2DataObj.area){
                    chart2DataObj.task_create_count=result.value.task_create_count;
                    chart2DataObj.accept_count=result.value.accept_count;
                    chart2DataObj.execute_count=result.value.execute_count;
                    chart2DataObj.resolve_count=result.value.resolve_count;
                }
            })
        })
    }else{
        IntelligentTuningStatisticalExport.chart2DataObjArrs.forEach(function (chart2DataObj) {
            chart2DataObj.task_create_count=0;
            chart2DataObj.accept_count=0;
            chart2DataObj.execute_count=0;
            chart2DataObj.resolve_count=0;
        })
    }
    IntelligentTuningStatisticalExport.chart2DataObjArrs.forEach(function (chart1Data) {
        task_create_count_arr.push(chart1Data.task_create_count);
        accept_count_arr.push(chart1Data.accept_count);
        execute_count_arr.push(chart1Data.execute_count);
        resolve_count_arr.push(chart1Data.resolve_count);
    })

    IntelligentTuningStatisticalExport.chart2DataObj = {
        task_create_count_arr: task_create_count_arr,
        accept_count_arr: accept_count_arr,
        execute_count_arr: execute_count_arr,
        resolve_count_arr: resolve_count_arr
    }
}

/**********************************
 * @funcname IntelligentTuningStatisticalExportChartUtil.showLoading
 * @funcdesc 显示loading
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-10-25-0025 15:08
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportChartUtil.showLoading = function(){
    IntelligentTuningStatisticalExport.vm.chartObj.showLoading();
    IntelligentTuningStatisticalExport.vm.chartObj2.showLoading();
}

/**********************************
 * @funcname IntelligentTuningStatisticalExportChartUtil.hideLoading
 * @funcdesc 隐藏loading
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-10-25-0025 15:08
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportChartUtil.hideLoading = function(){
    IntelligentTuningStatisticalExport.vm.chartObj.hideLoading();
    IntelligentTuningStatisticalExport.vm.chartObj2.hideLoading();
}



















/**********************************
 * @funcname getStartAndEndDay
 * @funcdesc 获取开始时间和结束时间之间的日期
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-24 09:22
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportChartUtil.getStartAndEndDay = function(format){
    // 计算日期相减天数，参数格式为 2006-12-18
    var daynum = IntelligentTuningStatisticalExportChartUtil.DateMinus(IntelligentTuningStatisticalExport.vm.queryStartDayFormat,
        IntelligentTuningStatisticalExport.vm.queryDayFormat);
    var dayArrs = [];
    var endT = new Date(IntelligentTuningStatisticalExport.vm.queryDayFormat);

    dayArrs.push(endT.Format(format));
    for(var i=0; i<daynum; i++){
        endT.setDate(endT.getDate()-1);
        dayArrs.push(endT.Format(format));
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
IntelligentTuningStatisticalExportChartUtil.DateMinus = function(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式
    var  aDate,  oDate1,  oDate2,  iDays
    aDate  =  sDate1.split("-")
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
    aDate  =  sDate2.split("-")
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
    return  iDays
}


/**********************************
 * @funcname showSceneChart
 * @funcdesc 图表渲染
 * @param {Object} chartObj 图表对象
 * @param {Array} xData 图表x轴
 * @param {Array} yData 图表y轴
 * @param {Object} isCenter 不是undefined的话，代表要渲染的是图表2
 * @return {datatype}
 * @author laijunbao
 * @create 2018-04-25 21:22
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportChartUtil.showChart = function(chartObj,xData,yData,isCenter){

    // var mrrateMax = Math.max.apply(null,mrRate);
    // var agpsmrRateMax = Math.max.apply(null,agpsmrRate);
    // var mrrateMin = Math.min.apply(null,mrRate);
    // var agpsmrRateMin = Math.min.apply(null,agpsmrRate);
    //
    // var max = '';
    // var min = '';
    // if(mrrateMax > agpsmrRateMax){
    //     max = Math.ceil(mrrateMax);
    // }else{
    //     max = Math.ceil(agpsmrRateMax);
    // }
    // if(mrrateMin > agpsmrRateMin){
    //     min = Math.ceil(agpsmrRateMin);
    // }else{
    //     min = Math.ceil(mrrateMin);
    // }
    // if(min != 0){
    //     min = min -1;
    // }

    var sceneOption = {
        tooltip : {
            trigger: 'axis',
            axisPointer:{
                type:'shadow'
            }
        },
        legend: {
            data: ['方案派单数','方案受理数','执行成功数','成功解决数']
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
            data:xData
        },
        yAxis: [{
            type: 'value',
            name: '数量',
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
            type: 'bar',
            barWidth: '15%',
            name: '方案派单数',
            barMinHeight: 5,
            // yAxisIndex: 1,
            smooth:true,
            itemStyle: {
                normal:{
                    color: '#f6cd40',
                    barBorderRadius: 5
                }
            },
            data: yData.task_create_count_arr
        },{
            type: 'bar',
            barWidth: '15%',
            barMinHeight: 5,
            name: '方案受理数',
            // yAxisIndex: 1,
            smooth:true,
            itemStyle: {
                normal:{
                    color: '#4f94dc',
                    barBorderRadius: 5
                }
            },
            data: yData.accept_count_arr
        },{
            type: 'bar',
            barWidth: '15%',
            barMinHeight: 5,
            name: '执行成功数',
            yAxisIndex: 0,
            itemStyle: {
                normal:{
                    color: '#64bba8',
                    barBorderRadius: 5
                }
            },
            data: yData.execute_count_arr
        },{
            type: 'bar',
            barWidth: '15%',
            barMinHeight: 5,
            name: '成功解决数',
            yAxisIndex: 0,
            itemStyle: {
                normal:{
                    color: '#26bae5',
                    barBorderRadius: 5
                }
            },
            data: yData.resolve_count_arr
        }]
    };

    chartObj.setOption(sceneOption);
    if(isCenter == undefined){
        chartObj.on('click', function (params) {
            var statistical = IntelligentTuningStatisticalExport.vm.queryStatistical;
            if(statistical == '' || statistical == '全部'){
                statistical = null;
            }
            // var day = new Date().Format('yyyy')+params.name;

            var day = IntelligentTuningStatisticalExport.chart1Xdatayyyymmdd[params.dataIndex];
            IntelligentTuningStatisticalExport.vm.dayByClickChart1 = day;

            IntelligentTuningStatisticalExportQueryUtil.getTableData(day);

            day = day.substring(0, 4) + "-" + day.substring(4, 6) + "-" + day.substring(6, 8);

            if(IntelligentTuningStatisticalExport.vm.chartObj2 != null){
                IntelligentTuningStatisticalExport.vm.chartObj2.dispose();
            }
            IntelligentTuningStatisticalExport.vm.chartObj2 = echarts.init(document.getElementById('allRegionChart2'));
            IntelligentTuningStatisticalExport.vm.chartObj2.showLoading();

            if(IntelligentTuningStatisticalExport.vm.queryCity == '全省'){

                IntelligentTuningStatisticalExport.vm.titleCity = '全省';
                IntelligentTuningStatisticalExport.vm.titleDistrict = '';
                IntelligentTuningStatisticalExport.vm.titleMktcenter = '';

                // IntelligentTuningStatisticalExportCrossFilterUtil.chart1handler(null,null,null,null,statistical);
                IntelligentTuningStatisticalExportCrossFilterUtil.chart2handler(day,null,null,null,statistical);

            }else if(IntelligentTuningStatisticalExport.vm.queryCity != '全省' && IntelligentTuningStatisticalExport.vm.queryDistrict == '全市'){

                IntelligentTuningStatisticalExport.vm.titleCity = IntelligentTuningStatisticalExport.vm.queryCity;
                IntelligentTuningStatisticalExport.vm.titleDistrict = '';
                IntelligentTuningStatisticalExport.vm.titleMktcenter = '';

                // IntelligentTuningStatisticalExportCrossFilterUtil.chart1handler(null,IntelligentTuningStatisticalExport.vm.queryCity,null,null,statistical);
                IntelligentTuningStatisticalExportCrossFilterUtil.chart2handler(day,IntelligentTuningStatisticalExport.vm.queryCity,null,null,statistical);

            }else if(IntelligentTuningStatisticalExport.vm.queryCity != '全省' && IntelligentTuningStatisticalExport.vm.queryDistrict != '全市'){

                IntelligentTuningStatisticalExport.vm.titleCity = IntelligentTuningStatisticalExport.vm.queryCity;
                IntelligentTuningStatisticalExport.vm.titleDistrict = IntelligentTuningStatisticalExport.vm.queryDistrict;
                IntelligentTuningStatisticalExport.vm.titleMktcenter = '';

                // IntelligentTuningStatisticalExportCrossFilterUtil.chart1handler(null,IntelligentTuningStatisticalExport.vm.queryCity,IntelligentTuningStatisticalExport.vm.queryDistrict,null,statistical);
                IntelligentTuningStatisticalExportCrossFilterUtil.chart2handler(day,IntelligentTuningStatisticalExport.vm.queryCity,IntelligentTuningStatisticalExport.vm.queryDistrict,null,statistical);
            }

            // IntelligentTuningStatisticalExportChartUtil.chart1DataHandler();
            IntelligentTuningStatisticalExportChartUtil.chart2DataHandler();
            IntelligentTuningStatisticalExport.isShowTable();
        });
    }else{

        chartObj.on('click', function (params) {
            var xName = params.name;

            IntelligentTuningStatisticalExport.vm.isShowTable = true;

            var statistical = IntelligentTuningStatisticalExport.vm.queryStatistical;
            if(statistical == '' ||statistical == '全部'){
                statistical = null;
            }

            if(IntelligentTuningStatisticalExport.vm.queryCity == '全省'){

                IntelligentTuningStatisticalExport.vm.titleCity = xName;

                // IntelligentTuningStatisticalExportCrossFilterUtil.chart1handler(null,xName,null,null,statistical);

                IntelligentTuningStatisticalExportQueryUtil.getTableData(IntelligentTuningStatisticalExport.vm.dayByClickChart1,xName);
            }else if(IntelligentTuningStatisticalExport.vm.queryCity != '全省' && IntelligentTuningStatisticalExport.vm.queryDistrict == '全市'){

                IntelligentTuningStatisticalExport.vm.titleCity = IntelligentTuningStatisticalExport.vm.queryCity;

                IntelligentTuningStatisticalExport.vm.titleDistrict = xName;

                // IntelligentTuningStatisticalExportCrossFilterUtil.chart1handler(null,IntelligentTuningStatisticalExport.vm.queryCity,xName,null,statistical);

                IntelligentTuningStatisticalExportQueryUtil.getTableData(IntelligentTuningStatisticalExport.vm.dayByClickChart1,IntelligentTuningStatisticalExport.vm.queryCity,xName);

            }else if(IntelligentTuningStatisticalExport.vm.queryCity != '全省' && IntelligentTuningStatisticalExport.vm.queryDistrict != '全市'){

                IntelligentTuningStatisticalExport.vm.titleCity = IntelligentTuningStatisticalExport.vm.queryCity;
                IntelligentTuningStatisticalExport.vm.titleMktcenter = xName;

                // IntelligentTuningStatisticalExportCrossFilterUtil.chart1handler(null,IntelligentTuningStatisticalExport.vm.queryCity,IntelligentTuningStatisticalExport.vm.queryDistrict,xName,statistical);

                IntelligentTuningStatisticalExportQueryUtil.getTableData(IntelligentTuningStatisticalExport.vm.dayByClickChart1,IntelligentTuningStatisticalExport.vm.queryCity,IntelligentTuningStatisticalExport.vm.queryDistrict,xName);
            }


            // IntelligentTuningStatisticalExportChartUtil.chart1DataHandler();

        });
    }
}
