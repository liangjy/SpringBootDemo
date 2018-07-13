var weakAreaUtil = {};

// 弱区图表组件
Vue.component('weakAreaComponent',{
    template: '#weakAreaChartId',
    props: ['wal','daycom','st','et','endDay','city'],
    mounted: function(){
        // echartUtil.initChart();
    },
    methods: {
        chartExport(){
            echartUtil.chartExport();
        }
    }
})

// 弱区表格组件
Vue.component('weakAreaTableComponent',{
    template: '#weakAreaTableId',
    props: ['tc','endDay','city','wal'],
    mounted: function(){
    },
    methods: {
        tableExport(){
            IntelligentRoadTestChart.vm.tableExport();
        }
    }
})

Vue.component('weakAreaComponent2',{
    template: '#weakAreaChartId2',
    props: ['wal','daycom','st','et','endDay','city','country'],
    mounted: function(){
        // echartUtil.initChart();
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
})