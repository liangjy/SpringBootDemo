var colleageUtil = {};

// 高校图表组件
Vue.component('collegeComponent',{
    template: '#collegeChartId',
    props: ['daycom','st','et','wal','besttext','thresholdstext','endDay','city'],
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
    props: ['wal','tc','endDay','city'],
    methods: {
        tableExport(){
            IntelligentRoadTestChart.vm.tableExport(this.city);
        }
    },
    mounted: function () {
    }
})

Vue.component('collegeComponent2',{
    template: '#collegeChartId2',
    props: ['daycom','st','et','wal','besttext','thresholdstext','endDay','city','country'],
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
            echartUtil.loadChartData2();
        },
        threshold: function (val) {
            IntelligentRoadTestChart.vm.thresholdVal2 = val;
            echartUtil.loadChartData2();
        }
    }
})

