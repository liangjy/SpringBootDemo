var sectorTableUtil = {};
// 扇区图表组件
Vue.component('sectorComponent',{
    template: '#sectorChartId',
    props: ['daycom','st','et','besttext','thresholdstext','endDay','city'],
    data(){
        return{
            bestOrsc: 'BEST_SC',
            bestOrscText: [{text:'覆盖最优',value:'BEST'},{text:'规划最优',value:'BEST_SC'},{text:'主接入',value:'SC'}],
            threshold: 110,
            thresholds: [{text:115,value:115},{text:110,value:110},{text:105,value:105},{text:100,value:100},{text:95,value:95}],
        }
    },
    mounted: function(){
        IntelligentRoadTestChart.vm.bestOrsc = this.bestOrsc;
        IntelligentRoadTestChart.vm.thresholdVal = this.threshold;
    },
    methods: {
        chartExport(){
            echartUtil.chartExport();
        }
    },
    watch: {
        bestOrsc: function (val) {
            IntelligentRoadTestChart.vm.bestOrsc = val;
            echartUtil.loadChartData();
        },
        threshold: function (val) {
            IntelligentRoadTestChart.vm.thresholdVal = val;
            echartUtil.loadChartData();
        }
    }
})

// 扇区表格组件
Vue.component('sectorTableComponent',{
    template: '#sectorTableId',
    props: ['tc','tc2','tc3','endDay','city','isshow','taboptions'],
    data(){
        return{
            tabOptions: this.taboptions, // 表格tab页
            tabOptionIdx: 1, //tab页下标，标识哪个tab显示
        }
    },
    mounted: function(){
    },
    methods: {
        tableExport(){
            IntelligentRoadTestChart.vm.tableExport();
        },
        celltableExport(){
            IntelligentRoadTestChart.vm.cellTableExp("营服");
        },
        kanwutableExport(){
            IntelligentRoadTestChart.vm.kanwutableExport("勘误");
        }
    },
    watch:{
        tabOptionIdx: function (val) {
            setTimeout(()=>{
                if(val == 1){
                    IntelligentRoadTestChart.vm.table.resizeWidht(IntelligentRoadTestChart.vm.tableObj);
                }else if(val == 0){
                    IntelligentRoadTestChart.vm.table2.resizeWidht(IntelligentRoadTestChart.vm.tableObj2);
                }else if(val == 2){
                    IntelligentRoadTestChart.vm.table3.resizeWidht(IntelligentRoadTestChart.vm.tableObj3);
                }
            },500)
        },
        taboptions: function (val) {
            this.tabOptions = val;
        }
    }
})


Vue.component('sectorComponent2',{
    template: '#sectorChartId2',
    props: ['daycom','st','et','besttext','thresholdstext','endDay','city','country'],
    data(){
        return{
            bestOrsc: 'BEST_SC',
            bestOrscText: [{text:'覆盖最优',value:'BEST'},{text:'规划最优',value:'BEST_SC'},{text:'主接入',value:'SC'}],
            threshold: 110,
            thresholds: [{text:115,value:115},{text:110,value:110},{text:105,value:105},{text:100,value:100},{text:95,value:95}],
        }
    },
    mounted: function(){
        IntelligentRoadTestChart.vm.bestOrsc2 = this.bestOrsc;
        IntelligentRoadTestChart.vm.thresholdVal2 = this.threshold;
    },
    methods: {
        chartExport(){
            echartUtil.chartExport2();
        }
    },
    computed:{
        countryStr: function () {
            if(this.country == '全市'){
                return '';
            }else{
                return this.country;
            }
        }
    },
    watch: {
        bestOrsc: function (val) {
            IntelligentRoadTestChart.vm.bestOrsc2 = val;
            echartUtil.loadChartData2();
        },
        threshold: function (val) {
            IntelligentRoadTestChart.vm.thresholdVal2 = val;
            echartUtil.loadChartData2();
        }
    }
})

sectorTableUtil.celltableExport = function () {
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
    list.push(`startTime:${urlStartDay}`);
    list.push(`endTime:${urlEndDay}`);
    var obj={
        fileName:fileName,
        dataType:3,
        paraLists:[
            {
                sheetName:sheetName,
                titleName:"告警ID,告警类型,地市名称,区县,营服中心,场景中心经度GPS,场景中心纬度GPS,场景标识,场景名称,场景GPS经纬度集合,告警等级,告警生成时间,是否恢复,告警恢复时间,工单单号,最近基站ID,小区ID,小区名称,弱覆盖区域栅格数,最近弱覆盖区域恢复栅格数,弱覆盖区域集合,弱覆盖区域数,弱覆盖区域百度经纬度集合,弱覆盖区域GPS经纬度集合,排名累计值,最近恢复判断日期,道路ID,覆盖长度,弱覆盖长度,最近弱覆盖路段长度".split(","),
                mergeTitle:[],
                templateId: 'StatisticsDL_MRSatCellTab_mkt',
                templatePara: list,
            }
        ],
    };
    var exportExcel=new exportExcelNew(obj);
    exportExcel.submit();
}
