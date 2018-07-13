// 月份组件
var dateComponentUtil = {};
dateComponentUtil.isFirst = true;
Vue.component('monthComponent',{
    template: '#monthTemplate',
    props: ['st','et'],
    data(){
        return{
            isShow: '',
            start: this.st.substring(0, 7),
            end: this.et.substring(0, 7)
        }
    },

    methods: {
        changeSTime(){
            this.start = $("#startTime").val();
        },
        changeETime(){
            this.end = $("#endTime").val();
        }
    },
    mounted: function () {
    },
    watch: {
        start: function (val,old) {
            var isTrue = new Date(this.start) <= new Date(this.end);
            if(isTrue){
                IntelligentRoadTestChart.vm.urlStartDay = val;
                IntelligentRoadTestChart.vm.urlStartMonthCom = val;
                IntelligentRoadTestChart.vm.who = IntelligentRoadTestChart.vm.whoComponent[IntelligentRoadTestChart.vm.statistical];
                IntelligentRoadTestChart.vm.whoTable = IntelligentRoadTestChart.vm.whoTableComponent[IntelligentRoadTestChart.vm.statistical];
                var num = echartUtil.monthMinus(this.start,this.end);
                if(num>12){
                    alert('时间选择范围只能在12个月内，请重新选择。');
                    return false;
                }
                echartUtil.loadChartData();
                if(IntelligentRoadTestChart.vm.statistical != '工单'){
                    echartUtil.loadChartData2();
                }
            }else{
                this.start = old;
                alert('开始日期不能大于结束日期。');
                return false;
            }
        },
        end: function (val,old) {
            var isTrue = new Date(this.end) >= new Date(this.start);
            if(isTrue){
                IntelligentRoadTestChart.vm.urlEndMonthCom = val;
                IntelligentRoadTestChart.vm.who = IntelligentRoadTestChart.vm.whoComponent[IntelligentRoadTestChart.vm.statistical];
                IntelligentRoadTestChart.vm.whoTable = IntelligentRoadTestChart.vm.whoTableComponent[IntelligentRoadTestChart.vm.statistical];
                IntelligentRoadTestChart.vm.urlEndDay = val;
                IntelligentRoadTestChart.vm.urlEndDay2 = val;
                IntelligentRoadTestChart.vm.tableDay = val;
                IntelligentRoadTestChart.vm.statisticalTab = IntelligentRoadTestChart.vm.statistical;
                var num = echartUtil.monthMinus(this.start,this.end);
                if(num>12){
                    alert('时间选择范围只能在12个月内，请重新选择。');
                    return false;
                }
                if(val != old){
                    tableDataProcessForVueComponent.loadTable();
                }
                echartUtil.loadChartData();
                if(IntelligentRoadTestChart.vm.statistical != '工单'){
                    echartUtil.loadChartData2();
                }
            }else{
                this.end = old;
                alert('结束日期不能小于开始日期。');
                return false;
            }
        }
    }

})