var highRailUtil = {};
// 高铁组件
Vue.component('highRailComponent',{
    template: '#highRailChartId',
    props: ['distinct_title_str','daycom','st','et','besttext','thresholdstext','endDay','city'],
    data(){
        return{
            threshold: 110,
            thresholds: [{text:-115,value:115},{text:-110,value:110},{text:-105,value:105},{text:-100,value:100},{text:-95,value:95}],
            sence: "综合",
            sences: ["综合","隧道","非隧道"]
        }
    },
    mounted: function(){
        IntelligentRoadTestChart.vm.thresholdVal = this.threshold;
        IntelligentRoadTestChart.vm.sence1 = this.sence;
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
        sence: function (val) {
            IntelligentRoadTestChart.vm.sence1 = val;
            var data = echartUtil.HSRailDataHandler(echartUtil.HSRailDataWithChart1,val,echartUtil.HSRailExtendObjWithChart1);
            echartUtil.initChart();
            setTimeout(function () {
                echartUtil.showSceneChart(IntelligentRoadTestChart.vm.chartObj,
                    echartUtil.HSRailExtendObjWithChart1.xDatas2,
                    null,
                    null,
                    null,
                    null,
                    undefined,
                    data);

                IntelligentRoadTestChart.vm.chartObj.hideLoading();
            },1000)
        }
    }
})

Vue.component('highRailComponent2',{
    template: '#highRailChartId2',
    props: ['market_title_str','daycom','st','et','besttext','thresholdstext','endDay','city'],
    data(){
        return{
            threshold: 110,
            thresholds: [{text:-115,value:115},{text:-110,value:110},{text:-105,value:105},{text:-100,value:100},{text:-95,value:95}],
            lineRoad: "贵广高铁",
            lineRoads: ["贵广高铁","南广高铁","厦深高铁","深湛高铁","京广深高铁","广珠城轨","广珠城轨支线","广深铁路"],
            sence: "综合",
            sences: ["综合","隧道","非隧道"]
        }
    },
    mounted: function(){
        IntelligentRoadTestChart.vm.thresholdVal2 = this.threshold;
        IntelligentRoadTestChart.vm.sence2 = this.sence;
        IntelligentRoadTestChart.vm.roadName = this.lineRoad;
    },
    methods: {
        chartExport(){
            echartUtil.chartExport2();
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
        },
        sence: function (val) {
            IntelligentRoadTestChart.vm.sence2 = val;
            var data = echartUtil.HSRailDataHandler(echartUtil.HSRailDataWithChart2,val,echartUtil.HSRailExtendObjWithChart2);
            echartUtil.initChart2();
            setTimeout(function () {
                echartUtil.showSceneChart(IntelligentRoadTestChart.vm.chartObj2,
                    echartUtil.HSRailExtendObjWithChart2.xDatas2,
                    null,
                    null,
                    null,
                    null,
                    true,
                    data);

                IntelligentRoadTestChart.vm.chartObj2.hideLoading();
            },1000)
        },
        lineRoad: function (val) {
            IntelligentRoadTestChart.vm.roadName = val;
            echartUtil.loadChartData2();
        }
    }
})

// 扇区表格组件
Vue.component('highRailTableComponent',{
    template: '#highRailTableId',
    props: ['tc','tc2','tc3','tc4','tc5','endDay','city','isshow','taboptions'],
    data(){
        return{
            tabOptions: this.taboptions, // 表格tab页
            tabOptionIdx: 0, //tab页下标，标识哪个tab显示
        }
    },
    mounted: function(){
    },
    methods: {
        tableExport(type){
            var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
            if(dateCycle == "日"){
                if(type == "隧道"){
                    IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj3,"隧道");
                }else if(type == "非隧道"){
                    IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj4,"非隧道");
                }else if(type == "500米"){
                    IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj2,"500米分段");
                }else{
                    IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj,"线路");
                }
            }else{
                if(type == "弱连段"){
                    IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj3,"弱连段");
                }else if(type == "隧道"){
                    IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj4,"隧道");
                }else if(type == "非隧道"){
                    IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj5,"非隧道");
                }else if(type == "500米"){
                    IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj2,"500米分段");
                }else{
                    IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj,"线路");
                }
            }


        }
    },
    watch:{
        tabOptionIdx: function (val) {
            var dateCycle = IntelligentRoadTestChart.vm.dateCycle;
            setTimeout(()=>{
                if(dateCycle != "日"){
                    if(val == 0){
                        IntelligentRoadTestChart.vm.table.resizeWidht(IntelligentRoadTestChart.vm.tableObj);
                    }else if(val == 1){
                        IntelligentRoadTestChart.vm.table2.resizeWidht(IntelligentRoadTestChart.vm.tableObj2);
                    }else if(val == 2){
                        IntelligentRoadTestChart.vm.table3.resizeWidht(IntelligentRoadTestChart.vm.tableObj3);
                    }else if(val == 3){
                        IntelligentRoadTestChart.vm.table4.resizeWidht(IntelligentRoadTestChart.vm.tableObj4);
                    }else if(val == 4){
                        IntelligentRoadTestChart.vm.table5.resizeWidht(IntelligentRoadTestChart.vm.tableObj5);
                    }
                }else{
                    if(val == 0){
                        IntelligentRoadTestChart.vm.table.resizeWidht(IntelligentRoadTestChart.vm.tableObj);
                    }else if(val == 1){
                        IntelligentRoadTestChart.vm.table2.resizeWidht(IntelligentRoadTestChart.vm.tableObj2);
                    }else if(val == 2){
                        IntelligentRoadTestChart.vm.table3.resizeWidht(IntelligentRoadTestChart.vm.tableObj3);
                    }else if(val == 3){
                        IntelligentRoadTestChart.vm.table4.resizeWidht(IntelligentRoadTestChart.vm.tableObj4);
                    }
                }

            },500)
        },
        taboptions: function (val) {
            this.tabOptions = val;
        }
    }
})
