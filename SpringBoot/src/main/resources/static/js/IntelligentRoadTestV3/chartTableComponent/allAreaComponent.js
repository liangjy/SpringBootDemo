// 全区域图表组件
Vue.component('allAreaComponent',{
    template: '#allAreaChartId',
    props: ['daycom','st','et'],
    data(){
        return{
            bestOrsc: 'BEST',
            bestOrscText: [{text:'覆盖最优',value:'BEST'},{text:'主接入',value:'SC'},
                {text:'频段800M',value:'F800M'},{text:'频段1.8G',value:'F18G'},{text:'频段2.1G',value:'F21G'},{text:'频段2.6G',value:'F26G'}],
            threshold: 105,
            thresholds: [{text:115,value:115},{text:110,value:110},{text:105,value:105},{text:100,value:100},{text:95,value:95}],
        }
    },

    mounted: function(){
        // echartUtil.initChart();
    },
    methods: {
        chartExport(){
            echartUtil.chartExport();
        }
    },
    watch: {
        bestOrsc: function (val) {
            IntelligentRoadTestChart.vm.bestOrsc = this.bestOrsc;
            echartUtil.loadChartData();
        },
        threshold: function (val) {
            IntelligentRoadTestChart.vm.thresholdVal = this.threshold;
            echartUtil.loadChartData();
        }
    }
})

// 全区域表格组件
Vue.component('allAreaTableComponent',{
    template: '#allAreaTableId',
    props: ['tc','endDay'],
    mounted: function(){
    },
    methods: {
        tableExport(){
            IntelligentRoadTestChart.vm.tableExport();
        }
    }
})