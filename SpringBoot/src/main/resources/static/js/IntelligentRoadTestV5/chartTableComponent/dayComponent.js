// 日期（天）组件

var dayComponetUtil = {};

dayComponetUtil.chart1StartDate = null;
dayComponetUtil.chart1EndDate = null;
dayComponetUtil.chart2StartDate = null;
dayComponetUtil.chart2EndDate = null;

Vue.component('dayComponent',{
    template: '#dayTemplate',
    props: ['st','et'],
    data(){
        return{
            isShow: '',
            start: this.st,
            end: this.et
        }
    },
    methods: {
        changeSTime(){
            this.start = $("#startTime").val();
            IntelligentRoadTestChart.vm.urlStartDay = this.start;
        },
        changeETime(){
            this.end = $("#endTime").val();
            IntelligentRoadTestChart.vm.urlEndDay = this.end;
            IntelligentRoadTestChart.vm.tableDay = this.end;
        }
    },
    mounted: function () {
        var dayNum = 31;
        if(IntelligentRoadTestChart.vm.statistical == '工单'){
            dayNum = 365;
        }
        var dTmp = new Date();
        // 下午2点前
        if(dTmp.getHours()<14){
            dTmp.setDate(dTmp.getDate()-2);
        }else{
            dTmp.setDate(dTmp.getDate()-1);
        }
        dTmp = dTmp.format('yyyy-MM-dd');

        $('#date-range9').dateRangePicker({
            getValue: function()
            {
                return this.innerHTML;
            },
            setValue: function(s)
            {
                this.innerHTML = s;
            },
            endDate: dTmp,
            separator : ' - ',
            maxDays: dayNum,
            language: 'cn'
        });
        $(".selected-days").hide();
        $('#date-range9').click(function () {
            $(".error-top").text('');
        }).bind('datepicker-apply',function(event,obj){
            if(obj.date2 != "Invalid Date"){
                var day = [obj.date1.format("yyyy-MM-dd"),obj.date2.format("yyyy-MM-dd")];
                dayComponetUtil.chart1StartDate = obj.date1.format("yyyyMMdd");
                dayComponetUtil.chart1EndDate = obj.date2.format("yyyyMMdd");
                if(IntelligentRoadTestChart.vm.urlStartDay != day[0] || IntelligentRoadTestChart.vm.urlEndDay != day[1]){
                    IntelligentRoadTestChart.vm.whoChart = IntelligentRoadTestChart.vm.whoComponent[IntelligentRoadTestChart.vm.statistical];
                    IntelligentRoadTestChart.vm.whoChart2 = IntelligentRoadTestChart.vm.whoComponent2[IntelligentRoadTestChart.vm.statistical];
                    IntelligentRoadTestChart.vm.whoTable = IntelligentRoadTestChart.vm.whoTableComponent[IntelligentRoadTestChart.vm.statistical];
                    IntelligentRoadTestChart.vm.urlStartDay = day[0];
                    IntelligentRoadTestChart.vm.urlStartDayCom = day[0];
                    IntelligentRoadTestChart.vm.urlEndDay = day[1];
                    IntelligentRoadTestChart.vm.urlEndDay2 = day[1];
                    IntelligentRoadTestChart.vm.urlEndDayCom = day[1];
                    IntelligentRoadTestChart.vm.tableDay = day[1];
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

                    // 防止vue组件没挂载就执行查询
                    setTimeout(function () {
                        tableDataProcessForVueComponent.loadTable();
                        echartUtil.loadChartData();
                        if($.inArray(IntelligentRoadTestChart.vm.statistical,['工单','地铁',"高铁"]) < 0){
                            echartUtil.loadChartData2();
                        }

                    },500);

                }else{
                    alert('日期没有变化。');
                }
            }else{
                alert('没有选择结束日期。');
            }

        })
        dayComponetUtil.chart1StartDate = IntelligentRoadTestChart.vm.urlStartDay.replace(/-/g,"");
        dayComponetUtil.chart1EndDate = IntelligentRoadTestChart.vm.urlEndDay.replace(/-/g,"");
        dayComponetUtil.chart2StartDate = IntelligentRoadTestChart.vm.urlStartDay.replace(/-/g,"");
        dayComponetUtil.chart2EndDate = IntelligentRoadTestChart.vm.urlEndDay.replace(/-/g,"");
    },
    watch: {
        start: function (val,old) {
            var dayn = echartUtil.DateMinus(val,this.end);
            if(dayn >30){
                alert('时间选择范围只能在30内，请重新选择。');
                return;
            }
            if(val != old){
                echartUtil.loadChartData();
                if(IntelligentRoadTestChart.vm.statistical != "高铁"){
                    echartUtil.loadChartData2();
                }
            }
        },
        end: function (val,old) {
            var dayn = echartUtil.DateMinus(this.start,val);
            if(dayn >30){
                alert('时间选择范围只能在30内，请重新选择。');
                return;
            }
            if(val != old){
                echartUtil.loadChartData();
                if(IntelligentRoadTestChart.vm.statistical != "高铁"){
                    echartUtil.loadChartData2();
                }
                tableDataProcessForVueComponent.loadTable();

            }
        }
    }

})


// 日期（天）组件
Vue.component('dayComponent2',{
    template: '#dayTemplate2',
    props: ['st','et'],
    data(){
        return{
            isShow: '',
            start: this.st,
            end: this.et
        }
    },
    methods: {
        changeSTime(){
            this.start = $("#startTime").val();
            IntelligentRoadTestChart.vm.urlStartDay = this.start;
        },
        changeETime(){
            this.end = $("#endTime").val();
            IntelligentRoadTestChart.vm.urlEndDay = this.end;
            IntelligentRoadTestChart.vm.tableDay = this.end;
        }
    },
    mounted: function () {
        var dayNum = 31;
        if(IntelligentRoadTestChart.vm.statistical == '工单'){
            dayNum = 365;
        }
        var dTmp = new Date();
        // 下午2点前
        if(dTmp.getHours()<14){
            dTmp.setDate(dTmp.getDate()-2);
        }else{
            dTmp.setDate(dTmp.getDate()-1);
        }
        dTmp = dTmp.format('yyyy-MM-dd');

        $('#date-range9-2').dateRangePicker({
            getValue: function()
            {
                return this.innerHTML;
            },
            setValue: function(s)
            {
                this.innerHTML = s;
            },
            endDate: dTmp,
            separator : ' - ',
            maxDays: dayNum,
            language: 'cn'
        }).bind('datepicker-apply',function(event,obj) {
            if(obj.date2 != "Invalid Date"){
                var day = [obj.date1.format("yyyy-MM-dd"), obj.date2.format("yyyy-MM-dd")];
                dayComponetUtil.chart2StartDate = obj.date1.format("yyyyMMdd");
                dayComponetUtil.chart2EndDate = obj.date2.format("yyyyMMdd");
                if(IntelligentRoadTestChart.vm.urlStartDay != day[0] || IntelligentRoadTestChart.vm.urlEndDay != day[1]){
                    IntelligentRoadTestChart.vm.whoChart = IntelligentRoadTestChart.vm.whoComponent[IntelligentRoadTestChart.vm.statistical];
                    IntelligentRoadTestChart.vm.whoChart2 = IntelligentRoadTestChart.vm.whoComponent2[IntelligentRoadTestChart.vm.statistical];
                    IntelligentRoadTestChart.vm.whoTable = IntelligentRoadTestChart.vm.whoTableComponent[IntelligentRoadTestChart.vm.statistical];
                    IntelligentRoadTestChart.vm.urlStartDay = day[0];
                    IntelligentRoadTestChart.vm.urlStartDayCom = day[0];
                    IntelligentRoadTestChart.vm.urlEndDay = day[1];
                    IntelligentRoadTestChart.vm.urlEndDay2 = day[1];
                    IntelligentRoadTestChart.vm.urlEndDayCom = day[1];
                    IntelligentRoadTestChart.vm.tableDay = day[1];
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

                    // 防止vue组件没挂载就执行查询
                    setTimeout(function () {
                        tableDataProcessForVueComponent.loadTable();
                        // echartUtil.loadChartData();
                        if($.inArray(IntelligentRoadTestChart.vm.statistical,['工单','地铁']) < 0){
                            echartUtil.loadChartData2();
                        }

                    },500);

                }else{
                    alert('日期没有变化。');
                }
            }else{
                alert('没有选择结束日期。');
            }

        })
        $(".selected-days").hide();
        $('#date-range9-2').click(function () {
            $(".error-top").text('');
        })

    },
    watch: {
        start: function (val,old) {
            var dayn = echartUtil.DateMinus(val,this.end);
            if(dayn >30){
                alert('时间选择范围只能在30内，请重新选择。');
                return;
            }
            if(val != old){
                // echartUtil.loadChartData();
                echartUtil.loadChartData2();
            }
        },
        end: function (val,old) {
            var dayn = echartUtil.DateMinus(this.start,val);
            if(dayn >30){
                alert('时间选择范围只能在30内，请重新选择。');
                return;
            }
            if(val != old){
                // echartUtil.loadChartData();
                echartUtil.loadChartData2();
                tableDataProcessForVueComponent.loadTable();

            }
        }
    }

})
