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
                IntelligentRoadTestChart.vm.whoChart = IntelligentRoadTestChart.vm.whoComponent[IntelligentRoadTestChart.vm.statistical];
                IntelligentRoadTestChart.vm.whoChart2 = IntelligentRoadTestChart.vm.whoComponent2[IntelligentRoadTestChart.vm.statistical];
                IntelligentRoadTestChart.vm.whoTable = IntelligentRoadTestChart.vm.whoTableComponent[IntelligentRoadTestChart.vm.statistical];

                if($.inArray(IntelligentRoadTestChart.vm.statistical,['工单','地铁']) < 0){
                    IntelligentRoadTestChart.vm.isShowChart2 = true;
                }else{
                    IntelligentRoadTestChart.vm.isShowChart2 = false;
                }

                if(IntelligentRoadTestChart.vm.statistical == "扇区"){
                    IntelligentRoadTestChart.vm.tabOptionsSector = ['营服','扇区','勘误'];
                }else if(IntelligentRoadTestChart.vm.statistical == "高铁"){
                    if(IntelligentRoadTestChart.vm.dateCycle == "日"){
                        IntelligentRoadTestChart.vm.tabOptionsSector = ['线路','500米分段','隧道','非隧道'];
                    }else{
                        IntelligentRoadTestChart.vm.tabOptionsSector = ['线路','500米分段','弱连段','隧道','非隧道'];
                    }
                }else if(IntelligentRoadTestChart.vm.statistical == "地铁"){
                    IntelligentRoadTestChart.vm.tabOptionsSector = ['线路','TA段','站厅站台','站间段'];
                }

                var num = echartUtil.monthMinus(this.start,this.end);
                if(num>12){
                    alert('时间选择范围只能在12个月内，请重新选择。');
                    return false;
                }
                echartUtil.loadChartData();
                if($.inArray(IntelligentRoadTestChart.vm.statistical,['工单','地铁']) < 0){
                    echartUtil.loadChartData2();
                }
            }else{
                this.start = old;
                alert('开始日期不能大于结束日期。');
                return false;
            }
        },
        end: function (val,old) {
            if(IntelligentRoadTestChart.vm.cityFlag == "全省"){
                IntelligentRoadTestChart.vm.distinctTitleStr = "";
                IntelligentRoadTestChart.vm.marketTitleStr = "各地市";
            }else if(IntelligentRoadTestChart.vm.cityFlag != "全省" && IntelligentRoadTestChart.vm.district == "全市"){
                IntelligentRoadTestChart.vm.distinctTitleStr = "";
                IntelligentRoadTestChart.vm.marketTitleStr = "各区县";
            }else if(IntelligentRoadTestChart.vm.cityFlag != "全省" && IntelligentRoadTestChart.vm.district != "全市"){
                IntelligentRoadTestChart.vm.distinctTitleStr = IntelligentRoadTestChart.vm.cityFlag;
                IntelligentRoadTestChart.vm.marketTitleStr = "各营服";
            }

            var isTrue = new Date(this.end) >= new Date(this.start);
            if(isTrue){
                IntelligentRoadTestChart.vm.urlEndMonthCom = val;
                IntelligentRoadTestChart.vm.whoChart = IntelligentRoadTestChart.vm.whoComponent[IntelligentRoadTestChart.vm.statistical];
                IntelligentRoadTestChart.vm.whoChart2 = IntelligentRoadTestChart.vm.whoComponent2[IntelligentRoadTestChart.vm.statistical];
                IntelligentRoadTestChart.vm.whoTable = IntelligentRoadTestChart.vm.whoTableComponent[IntelligentRoadTestChart.vm.statistical];
                IntelligentRoadTestChart.vm.urlEndDay = val;
                IntelligentRoadTestChart.vm.urlEndDay2 = val;
                IntelligentRoadTestChart.vm.tableDay = val;
                IntelligentRoadTestChart.vm.statisticalTab = IntelligentRoadTestChart.vm.statistical;

                if($.inArray(IntelligentRoadTestChart.vm.statistical,['工单','地铁']) < 0){
                    IntelligentRoadTestChart.vm.isShowChart2 = true;
                }else{
                    IntelligentRoadTestChart.vm.isShowChart2 = false;
                }

                if(IntelligentRoadTestChart.vm.statistical == "扇区"){
                    IntelligentRoadTestChart.vm.tabOptionsSector = ['营服','扇区','勘误'];
                }else if(IntelligentRoadTestChart.vm.statistical == "高铁"){
                    if(IntelligentRoadTestChart.vm.dateCycle == "日"){
                        IntelligentRoadTestChart.vm.tabOptionsSector = ['线路','500米分段','隧道','非隧道'];
                    }else{
                        IntelligentRoadTestChart.vm.tabOptionsSector = ['线路','500米分段','弱连段','隧道','非隧道'];
                    }
                }else if(IntelligentRoadTestChart.vm.statistical == "地铁"){
                    IntelligentRoadTestChart.vm.tabOptionsSector = ['线路','TA段','站厅站台','站间段'];
                }else if($.inArray(IntelligentRoadTestChart.vm.statistical,["关注区域","骨头区域","高速","市政路"]) > -1){
                    IntelligentRoadTestChart.vm.tabOptionsSector = [];
                }else{
                    IntelligentRoadTestChart.vm.tabOptionsSector = ["AGPS-MR","全量MR综合","全量MR室外","全量MR室内"];
                }

                var num = echartUtil.monthMinus(this.start,this.end);
                if(num>12){
                    alert('时间选择范围只能在12个月内，请重新选择。');
                    return false;
                }
                if(val != old){
                    tableDataProcessForVueComponent.loadTable();
                }
                echartUtil.loadChartData();
                if($.inArray(IntelligentRoadTestChart.vm.statistical,['工单','地铁']) < 0){
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
