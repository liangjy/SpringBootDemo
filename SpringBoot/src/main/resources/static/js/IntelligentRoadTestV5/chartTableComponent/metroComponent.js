var metroUtil = {};
// 高铁组件
Vue.component('metroComponent',{
    template: '#metroChartId',
    props: ['distinct_title_str','daycom','st','et','besttext','thresholdstext','endDay','city'],
    data(){
        return{
            bestOrsc: 'BEST_SC',
            bestOrscText: [{text:'覆盖最优',value:'BEST'},{text:'规划最优',value:'BEST_SC'},{text:'主接入',value:'SC'}],
            threshold: 105,
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
Vue.component('metroTableComponent',{
    template: '#metroTableId',
    props: ['tc','tc2','tc3','tc4','endDay','city','isshow','taboptions'],
    data(){
        return{
            tabOptions: this.taboptions, // 表格tab页
            tabOptionIdx: 0, //tab页下标，标识哪个tab显示
        }
    },
    mounted: function(){
    },
    methods: {
        tableExport(){
            IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj,"线路");
        },
        metroTul(){
            IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj2,"TA段");
        },
        metroSite(){
            IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj3,"站厅站台");
        },
        metroStation(){
            IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj4,"站间段");
        }
    },
    watch:{
        tabOptionIdx: function (val) {
            setTimeout(()=>{
                if(val == 0){
                    IntelligentRoadTestChart.vm.table.resizeWidht(IntelligentRoadTestChart.vm.tableObj);
                }else if(val == 1){
                    IntelligentRoadTestChart.vm.table2.resizeWidht(IntelligentRoadTestChart.vm.tableObj2);
                }else if(val == 2){
                    IntelligentRoadTestChart.vm.table3.resizeWidht(IntelligentRoadTestChart.vm.tableObj3);
                }else if(val == 3){
                    IntelligentRoadTestChart.vm.table4.resizeWidht(IntelligentRoadTestChart.vm.tableObj4);
                }
            },500)
        },
        taboptions: function (val) {
            this.tabOptions = val;
        }
    }
})
