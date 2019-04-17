var sectorTableUtil = {};
// 扇区图表组件
Vue.component('sectorComponent',{
    template: '#sectorChartId',
    props: ['distinct_title_str','daycom','st','et','besttext','thresholdstext','endDay','city','numOrRate','isDisabled'],
    data(){
        return{
            bestOrsc: 'BEST_SC',
            bestOrscText: [{text:'覆盖最优',value:'BEST'},{text:'规划最优',value:'BEST_SC'},{text:'主接入',value:'SC'}],
            threshold: 110,
            thresholds: [{text:115,value:115},{text:110,value:110},{text:105,value:105},{text:100,value:100},{text:95,value:95}],
            factory: "全部",
            factorys: [{text:"全部",value:"全部"},{text:"华为",value:"华为"},{text:"中兴",value:"中兴"},{text:"爱立信",value:"爱立信"},{text:"其他",value:"其他"}],
            numOrRate1: this.numOrRate,
            isDisabled1: this.isDisabled
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
        },
        factory: function (val) {
            IntelligentRoadTestChart.vm.factory = val;
            echartUtil.loadChartData();
        },
        numOrRate1(val){
            if(val == '基站扇区数'){
                this.isDisabled1 = true;
                IntelligentRoadTestChart.vm.numOrRate = val;

                var options = IntelligentRoadTestChart.vm.chartObj.getOption();

                echartUtil.initChart();

                setTimeout(function () {
                    options.legend[0].data = JSON.parse(JSON.stringify(IntelligentRoadTestChart.vm.sectorChart1LegendData)).splice(4);
                    options.series = JSON.parse(JSON.stringify(IntelligentRoadTestChart.vm.sectorChart1Series)).splice(4);

                    IntelligentRoadTestChart.vm.chartObj.setOption(options);
                    IntelligentRoadTestChart.vm.chartObj.hideLoading();
                },300)

            }else{
                this.isDisabled1 = false;
                IntelligentRoadTestChart.vm.numOrRate = '覆盖率';

                var options = IntelligentRoadTestChart.vm.chartObj.getOption();

                echartUtil.initChart();

                setTimeout(function () {
                    options.legend[0].data = JSON.parse(JSON.stringify(IntelligentRoadTestChart.vm.sectorChart1LegendData)).splice(0,4);
                    options.series = JSON.parse(JSON.stringify(IntelligentRoadTestChart.vm.sectorChart1Series)).splice(0,4);

                    IntelligentRoadTestChart.vm.chartObj.setOption(options);
                    IntelligentRoadTestChart.vm.chartObj.hideLoading();
                },300)
            }

            IntelligentRoadTestChart.vm.chartObj.on('click', function (params) {
                var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
                var statistical = IntelligentRoadTestChart.vm.statistical;
                // var day = new Date().format('yyyy')+params.name;
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
                IntelligentRoadTestChart.vm.urlEndDay2 = day;
            });
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
            IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj2,"营服");
        },
        kanwutableExport(){
            IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj3,"勘误");
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
    props: ['market_title_str','daycom','st','et','besttext','thresholdstext','endDay','city','country','numOrRate','isDisabled'],
    data(){
        return{
            bestOrsc: 'BEST_SC',
            bestOrscText: [{text:'覆盖最优',value:'BEST'},{text:'规划最优',value:'BEST_SC'},{text:'主接入',value:'SC'}],
            threshold: 110,
            thresholds: [{text:115,value:115},{text:110,value:110},{text:105,value:105},{text:100,value:100},{text:95,value:95}],
            factory: "全部",
            factorys: [{text:"全部",value:"全部"},{text:"华为",value:"华为"},{text:"中兴",value:"中兴"},{text:"爱立信",value:"爱立信"},{text:"其他",value:"其他"}],
            numOrRate2: this.numOrRate,
            isDisabled2: this.isDisabled
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
            echartUtil.loadChartData2(this.endDay);
        },
        threshold: function (val) {
            IntelligentRoadTestChart.vm.thresholdVal2 = val;
            echartUtil.loadChartData2(this.endDay);
        },
        factory: function (val) {
            IntelligentRoadTestChart.vm.factory2 = val;
            echartUtil.loadChartData2(this.endDay);
        },
        numOrRate2(val){
            if(val == '基站扇区数'){
                this.isDisabled2 = true;
                IntelligentRoadTestChart.vm.numOrRate2 = val;

                var options = IntelligentRoadTestChart.vm.chartObj2.getOption();

                echartUtil.initChart2();

                setTimeout(function () {
                    options.legend[0].data = JSON.parse(JSON.stringify(IntelligentRoadTestChart.vm.sectorChart2LegendData)).splice(4);
                    options.series = JSON.parse(JSON.stringify(IntelligentRoadTestChart.vm.sectorChart2Series)).splice(4);

                    IntelligentRoadTestChart.vm.chartObj2.setOption(options);
                    IntelligentRoadTestChart.vm.chartObj2.hideLoading();
                },300)
            }else{
                this.isDisabled2 = false;
                IntelligentRoadTestChart.vm.numOrRate2 = '覆盖率';

                var options = IntelligentRoadTestChart.vm.chartObj2.getOption();

                echartUtil.initChart2();

                setTimeout(function () {
                    options.legend[0].data = JSON.parse(JSON.stringify(IntelligentRoadTestChart.vm.sectorChart2LegendData)).splice(0,4);
                    options.series = JSON.parse(JSON.stringify(IntelligentRoadTestChart.vm.sectorChart2Series)).splice(0,4);

                    IntelligentRoadTestChart.vm.chartObj2.setOption(options);
                    IntelligentRoadTestChart.vm.chartObj2.hideLoading();
                },300)
            }
            IntelligentRoadTestChart.vm.chartObj2.on('click', function (params) {
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
                tableDataProcessForVueComponent.loadTable(IntelligentRoadTestChart.vm.urlEndDay2,city,district,market);
            });
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
