var colleageUtil = {};

// 高校图表组件
Vue.component('collegeComponent',{
    template: '#collegeChartId',
    props: ['distinct_title_str','daycom','st','et','wal','besttext','thresholdstext','endDay','city','country'],
    data(){
        return{
            bestOrsc: 'BEST',
            bestOrscText: this.besttext,
            threshold: 105,
            thresholds: this.thresholdstext
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

// 高校表格组件
Vue.component('collegeTableComponent',{
    template: '#collegeTableId',
    props: ['wal','tc','tc2','tc3','tc4','endDay','city','taboptions'],
    data(){
        return{
            tabsOptions: this.taboptions, // 表格tab页
            tabOptionIdx: this.taboptions.length == 0?null:0, //tab页下标，标识哪个tab显示
        }
    },
    methods: {
        tableExport(type){
            if(type == 1){
                IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj,"AGPS-MR");
            }else if(type == 0){
                IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj2,'全量MR综合');
            }else if(type == 3){
                IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj3,'全量MR室外');
            }else if(type == 2){
                IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj4,'全量MR室内');
            }else{
                IntelligentRoadTestChart.vm.tableExport(IntelligentRoadTestChart.vm.tableObj);
            }
        }
    },
    mounted: function () {
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
        "taboptions": {
            handler(curVal,oldVal){
                this.tabsOptions = curVal;
                this.tabOptionIdx = curVal.length == 0?null:0;
            } ,
            deep:true
        }
    }
})

Vue.component('collegeComponent2',{
    template: '#collegeChartId2',
    props: ['market_title_str','daycom','st','et','wal','besttext','thresholdstext','endDay','city','country'],
    data(){
        return{
            bestOrsc: 'BEST',
            bestOrscText: this.besttext,
            threshold: 105,
            thresholds: this.thresholdstext
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
        }
    }
})



