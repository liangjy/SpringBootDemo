// 日期（天）组件
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
            dayNum = 180;
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
        })

        // $('#date-range9').data('dateRangePicker').setDateRange(IntelligentRoadTestChart.vm.urlStartDay,IntelligentRoadTestChart.vm.urlEndDay);

        // 日历组件点击确定
        $(".apply-btn").click(function () {
            var day = $("#date-range9").text().split(' ');
            if(IntelligentRoadTestChart.vm.urlStartDay != day[0] || IntelligentRoadTestChart.vm.urlEndDay != day[2]){
                IntelligentRoadTestChart.vm.who = IntelligentRoadTestChart.vm.whoComponent[IntelligentRoadTestChart.vm.statistical];
                IntelligentRoadTestChart.vm.whoTable = IntelligentRoadTestChart.vm.whoTableComponent[IntelligentRoadTestChart.vm.statistical];
                IntelligentRoadTestChart.vm.urlStartDay = day[0];
                IntelligentRoadTestChart.vm.urlStartDayCom = day[0];
                IntelligentRoadTestChart.vm.urlEndDay = day[2];
                IntelligentRoadTestChart.vm.urlEndDay2 = day[2];
                IntelligentRoadTestChart.vm.urlEndDayCom = day[2];
                IntelligentRoadTestChart.vm.tableDay = day[2];
                IntelligentRoadTestChart.vm.statisticalTab = IntelligentRoadTestChart.vm.statistical;

                // 防止vue组件没挂载就执行查询
                setTimeout(function () {
                    tableDataProcessForVueComponent.loadTable();
                    echartUtil.loadChartData();
                    if(IntelligentRoadTestChart.vm.statistical != '工单'){
                        echartUtil.loadChartData2();
                    }

                },500);

            }else{
                alert('日期没有变化。');
            }

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
                echartUtil.loadChartData();
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
                echartUtil.loadChartData();
                echartUtil.loadChartData2();
                tableDataProcessForVueComponent.loadTable();

            }
        }
    }

})
