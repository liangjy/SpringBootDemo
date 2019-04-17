
// 工单图表组件
Vue.component('workOrderComponent',{
    template: '#workOrderChartId',
    props: ['daycom','st','et'],
    data(){
        return{
            workOrderType: '全部',
            workOrderTypes: ["全部","天翼蓝鹰高速","天翼蓝鹰高校","天翼蓝鹰场馆","天翼蓝鹰美食","天翼蓝鹰美景","天翼蓝鹰高密度住宅区","天翼蓝鹰高流量商务区","天翼蓝鹰战狼区域","天翼蓝鹰农贸市场","天翼蓝鹰中小学"]
        }
    },
    mounted: function(){
        // echartUtil.initChart();
    },
    methods: {
        chartExport(){
            workOrderUtil.chartExport();
        }
    },
    watch: {
        workOrderType: function (val) {
            IntelligentRoadTestChart.vm.workOrderType = val;
            echartUtil.loadChartData();
            tableDataProcessForVueComponent.loadTable();
        }
    }
})

// 工单表格组件
Vue.component('workOrderTableComponent',{
    template: '#workOrderTableId',
    props: ['tc','city'],
    data(){
        return{
            tabOptions: ['工单详细','工单数量'], // 表格tab页
            tabOptionIdx: 0, //tab页下标，标识哪个tab显示
        }
    },
    mounted: function(){
    },
    methods: {
        tableExport(){
            IntelligentRoadTestChart.vm.tableExport();
        },
        workOrderCntTabExp(){
            workOrderUtil.workOrderCntTabExp();
        }
    },
    watch:{
        tabOptionIdx: function (val) {
            setTimeout(()=>{
                if(val == 0){
                    IntelligentRoadTestChart.vm.table.resizeWidht(IntelligentRoadTestChart.vm.tableObj);
                }else if(val == 1){
                    IntelligentRoadTestChart.vm.table2.resizeWidht(IntelligentRoadTestChart.vm.tableObj2);
                }
            },500)
        }
    }
})

var workOrderUtil = {};

/**********************************
 * @funcname chartExport
 * @funcdesc 工单图表导出
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-05-21 14:27
 * @modifier 
 * @modify 
 ***********************************/
workOrderUtil.chartExport = function () {
    var city = IntelligentRoadTestChart.vm.cityFlag;
    var district = IntelligentRoadTestChart.vm.district;
    var market = IntelligentRoadTestChart.vm.market;
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = '日';
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    var workOrderType = IntelligentRoadTestChart.vm.workOrderType;

    var list = [];
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
    list.push(`START_DAY:${urlStartDay}`);
    list.push(`END_DAY:${urlEndDay}`);
    var name = objectType + '_' + urlEndDay;
    var obj={
        fileName:name,
        dataType:8,
        paraLists:[
            {
                sheetName:name,
                titleName:['日期','告警数','恢复数'],
                mergeTitle:[],
                templateId: 'StatisticsDL_AlarmCountImg_1',
                templatePara: list,
            }
        ],
    };
    var exportExcel=new exportExcelNew(obj);
    exportExcel.submit();

    /*workOrderUtil.getChartData().then(function (data) {
        var result = callBackChangeData(data);
        if(result.length>0){
            var tableDataArrs = [];
            result.forEach(function(item){
                var dataArrs = [];
                dataArrs.push(item.day);
                dataArrs.push(item.alarm_count);
                dataArrs.push(item.rec_count);
                tableDataArrs.push(dataArrs);
            })
            var name = objectType + '_' + urlEndDay;
            var obj={
                fileName:name,
                dataType:3,
                paraLists:[
                    {
                        sheetName:name,
                        titleName:['日期','告警数','恢复数'],
                        mergeTitle:[],
                        tableData: tableDataArrs
                    }
                ],
            };
            var exportExcel=new exportExcelNew(obj);
            exportExcel.submit();
        }

    })*/

}
/**********************************
 * @funcname getChartData
 * @funcdesc 获取工单图表数据
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-05-21 14:27
 * @modifier 
 * @modify 
 ***********************************/
workOrderUtil.getChartData = function () {
    var city = IntelligentRoadTestChart.vm.cityFlag;
    var district = IntelligentRoadTestChart.vm.district;
    var market = IntelligentRoadTestChart.vm.market;
    var objectType = IntelligentRoadTestChart.vm.statistical;
    var dateCycle = '日';
    var urlStartDay = IntelligentRoadTestChart.vm.urlStartDay;
    var urlEndDay = IntelligentRoadTestChart.vm.urlEndDay;
    var workOrderType = IntelligentRoadTestChart.vm.workOrderType;
    var promise = new Promise(function  (resolve,reject) {
        var list = ["StatisticsDL_AlarmCountImg_1"];
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
        function successCallback(data) {
            resolve(data);
        }
        var progressBarSqls = [];
        var functionlist = [successCallback];
        progressBarSqls.push(list);
        progressbarTwo.submitSql(progressBarSqls, functionlist, [3],null,null,null,null,false,['Alarms']);
    });
    return promise;
}

workOrderUtil.workOrderCntTabExp = function () {
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

    var name = city + district + market + urlEndDay + objectType;
    if(city == '全省'){
        name = '全省' + urlEndDay + objectType + '数量';
    }else if(city != '全省' && district == '全市' && market == '全区'){
        name = city + urlEndDay + objectType + '数量';
    }else if(city != '全省' && district != '全市' && market == '全区'){
        name = city + district + urlEndDay + objectType + '数量';
    }else if(city != '全省' && district != '全市' && market != '全区'){
        name = city + district + market + urlEndDay + objectType + '数量';
    }

    var obj={
        fileName:name,
        dataType:8,
        paraLists:[
            {
                sheetName:name,
                titleName:"区域,工单数,累计恢复量,工单数,累计恢复量,工单数,累计恢复量,工单数,累计恢复量,工单数,累计恢复量,工单数,累计恢复量,工单数,累计恢复量,工单数,累计恢复量,工单数,累计恢复量,工单数,累计恢复量,总派单量,总恢复量,总恢复比".split(","),
                mergeTitle:[
                    {
                        startCol:0,
                        endCol:0,
                        titleName:"区域"
                    },
                    {
                        startCol:1,
                        endCol:2,
                        titleName:"天翼蓝鹰场馆"
                    },
                    {
                        startCol:3,
                        endCol:4,
                        titleName:"翼蓝鹰高流量商务区"
                    },
                    {
                        startCol:5,
                        endCol:6,
                        titleName:"天翼蓝鹰高密度住宅区"
                    },
                    {
                        startCol:7,
                        endCol:8,
                        titleName:"天翼蓝鹰高速"
                    },
                    {
                        startCol:9,
                        endCol:10,
                        titleName:"天翼蓝鹰高校"
                    },
                    {
                        startCol:11,
                        endCol:12,
                        titleName:"天翼蓝鹰美景"
                    },
                    {
                        startCol:13,
                        endCol:14,
                        titleName:"天翼蓝鹰美食"
                    },
                    {
                        startCol:15,
                        endCol:16,
                        titleName:"天翼蓝鹰农贸市场"
                    },
                    {
                        startCol:17,
                        endCol:18,
                        titleName:"天翼蓝鹰战狼区域"
                    },
                    {
                        startCol:19,
                        endCol:20,
                        titleName:"天翼蓝鹰中小学"
                    },
                    {
                        startCol:21,
                        endCol:24,
                        titleName:"总计"
                    },

                ],
                templateId: 'StatisticsDL_AlarmCounTab_count',
                templatePara: list,
            }
        ],
    };
    var exportExcel=new exportExcelNew(obj);
    exportExcel.submit();
}