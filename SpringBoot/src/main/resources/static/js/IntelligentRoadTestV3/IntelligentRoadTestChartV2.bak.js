var IntelligentRoadTestChart = {};

$(function () {
    var day = noceUtil.GetQueryString("day");
    var city = noceUtil.GetQueryString("mapCity");
    var country = noceUtil.GetQueryString("mapDistrict");
    var object_type = noceUtil.GetQueryString("senceName");
    /* 下拉框  */
    $(".select-name").click(function () {
        $(".select-name").removeClass("selectName");
        $(this).addClass("selectName");
        $(".select-info").hide();
        $(this).siblings(".select-info").show();
    });
    /* 城市列表点击事件 */
    $(".city-list li").click(function () {
        $(this).addClass("current").siblings().removeClass("current");
        $(".select-name").removeClass("selectName");
        $(this).parents(".select-city").find(".city-name").text($(this).text()+"市");
        $(this).parents(".select-city").find(".city-selected").text($(this).text()+"市");
        $(this).parents(".city-info").hide();
    });
    /* 下拉列表点击 */
    $(".select-info > p").click(function() {
        $(this).addClass("selected").siblings().removeClass("selected");
        $(this).parent().siblings().find(".selectA").text($(this).text());
        $(".select-name").removeClass("selectName");
        $(".select-info").hide();
    });
    /* 点击其他地方隐藏下拉列表  */
    $("body").click(function (e) {
        if($(e.target).closest(".select-name,.select-info").length == 0){
            $(".select-info").hide();
            $(".select-name").removeClass("selectName");
        };
    });

    $("#countObject p").click(function () {
        var index = $("#countObject p").index($(this));
        $(".chartDivWrap").eq(index-1).show().siblings().hide();
        $(".tbWrap").eq(index-1).show().siblings().hide();
        $(window).resize();
    });

    IntelligentRoadTestChart.poorareaChart = echarts.init(document.getElementById('poorareaChart'));
    IntelligentRoadTestChart.alarmInfoChart = echarts.init(document.getElementById('alarmInfoChart'));
    IntelligentRoadTestChart.metroChart = echarts.init(document.getElementById('metroChart'));

    IntelligentRoadTestChart.poorAreaOption = {
        tooltip : {
            trigger: 'axis',
            axisPointer:{
                type:'shadow'
            }
        },
        legend: {
            itemWidth: 20,
            itemHeight: 8,
            data: ['弱栅格占比','弱区数量']
        },
        grid: {
            left: 10,
            right: 10,
            bottom: 5,
            top: 30,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false,
            },
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            },
            data: ['1', '2', '3', '4', '5', '6', '7']
        },
        yAxis: [{
            type: 'value',
            name: '占比(%)',
            min: 0,
            max: 100,
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#ededef'
                }
            },
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            }
        }, {
            type: 'value',
            name: '数量(个)',
            min: 0,
            max: 2500,
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#ededef'
                }
            },
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            }
        }],
        series: [{
            type: 'line',
            name: '弱栅格占比',
            yAxisIndex: 0,
            itemStyle: {
                normal: {
                    color: '#e8a564'
                }
            },
            data: [30, 40, 20, 50, 70, 30, 60]
        },{
            type: 'bar',
            barWidth: '20%',
            name: '弱区数量',
            yAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: '#64bba8',
                    barBorderRadius: [10, 10, 0, 0]
                }
            },
            data: [1020, 1932, 1201, 1934, 1590, 1830, 1520]
        }]
    };

    IntelligentRoadTestChart.alarmInfoOption = {
        tooltip : {
            trigger: 'axis',
            axisPointer:{
                type:'shadow'
            }
        },
        legend: {
            icon: 'rect',
            itemWidth: 20,
            itemHeight: 3,
            data: ['弱栅格恢复比','回单比']
        },
        grid: {
            left: 10,
            right: 10,
            bottom: 5,
            top: 30,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false,
            },
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            },
            data: ['1', '2', '3', '4', '5', '6', '7']
        },
        yAxis: {
            type: 'value',
            name: '%',
            min: 0,
            max: 100,
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#ededef'
                }
            },
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            }
        },
        series: [{
            type: 'line',
            name: '弱栅格恢复比',
            itemStyle: {
                normal: {
                    color: '#9882ec'
                }
            },
            data: [82, 53, 80, 54, 29, 53, 20]
        },{
            type: 'line',
            name: '回单比',
            itemStyle: {
                normal: {
                    color: '#3213ab'
                }
            },
            data: [80, 42, 91, 64, 39, 83, 50]
        }]
    };

    IntelligentRoadTestChart.metroOption = {
        tooltip : {
            trigger: 'axis',
            axisPointer:{
                type:'shadow'
            }
        },
        legend: {
            data: ['全量MR覆盖率','全量MR记录数']
        },
        grid: {
            left: 10,
            right: 10,
            bottom: 5,
            top: 30,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false,
            },
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            },
            data: ['1', '2', '3', '4', '5', '6', '7']
        },
        yAxis: [{
            type: 'value',
            name: '%',
            min: 0,
            max: 100,
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#ededef'
                }
            },
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            }
        }, {
            type: 'value',
            name: 'MR记录数',
            min: 0,
            max: 2500,
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#ededef'
                }
            },
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            }
        }],
        series: [{
            type: 'line',
            name: '全量MR覆盖率',
            yAxisIndex: 0,
            itemStyle: {
                normal: {
                    color: '#0f7ac4'
                }
            },
            data: [20, 32, 12, 44, 59, 23, 52]
        },{
            type: 'bar',
            barWidth: '20%',
            name: '全量MR记录数',
            yAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: '#50b0f3',
                    barBorderRadius: 5
                }
            },
            data: [1020, 1932, 1201, 1934, 1590, 1830, 1520]
        }]
    };

    IntelligentRoadTestChart.poorareaChart.setOption(IntelligentRoadTestChart.poorAreaOption);
    IntelligentRoadTestChart.alarmInfoChart.setOption(IntelligentRoadTestChart.alarmInfoOption);
    IntelligentRoadTestChart.metroChart.setOption(IntelligentRoadTestChart.metroOption);

    $(window).resize(function () {
        IntelligentRoadTestChart.poorareaChart.resize();
        IntelligentRoadTestChart.alarmInfoChart.resize();
        IntelligentRoadTestChart.metroChart.resize();
    });

    IntelligentRoadTestChart.showSceneChart('allRegionChart');
    IntelligentRoadTestChart.showSceneChart('concernAreaChart');
    IntelligentRoadTestChart.showSceneChart('sectorChart');
    IntelligentRoadTestChart.showSceneChart('boneAreaChart');
    IntelligentRoadTestChart.showSceneChart('highWayChart');
    IntelligentRoadTestChart.showSceneChart('railChart');
    IntelligentRoadTestChart.showSceneChart('cityRoadChart');
    IntelligentRoadTestChart.showSceneChart('collegeChart');
    IntelligentRoadTestChart.showSceneChart('siteChart');
    IntelligentRoadTestChart.showSceneChart('foodChart');
    IntelligentRoadTestChart.showSceneChart('sceneryChart');
    IntelligentRoadTestChart.showSceneChart('uptownChart');
    IntelligentRoadTestChart.showSceneChart('businessChart');
    IntelligentRoadTestChart.showSceneChart('warwolfChart');
    IntelligentRoadTestChart.showSceneChart('marketChart');

});



IntelligentRoadTestChart.showSceneChart = function IntelligentRoadTestChart_showChart(div){
    var chartDiv = echarts.init(document.getElementById(div));

    var sceneOption = {
        tooltip : {
            trigger: 'axis',
            axisPointer:{
                type:'shadow'
            }
        },
        legend: {
            data: ['AGPS-MR','全量-MR','AGPS-MR记录数','全量MR记录数']
        },
        grid: {
            left: 10,
            right: 10,
            bottom: 5,
            top: 30,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false,
            },
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            },
            data: ['1', '2', '3', '4', '5', '6', '7']
        },
        yAxis: [{
            type: 'value',
            name: '%',
            min: 0,
            max: 100,
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#ededef'
                }
            },
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            }
        }, {
            type: 'value',
            name: 'MR记录数',
            min: 0,
            max: 2500,
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#ededef'
                }
            },
            axisLine :{
                lineStyle: {
                    color: '#5b5d61'
                }
            }
        }],
        series: [{
            type: 'line',
            name: 'AGPS-MR',
            yAxisIndex: 0,
            itemStyle: {
                normal:{
                    color: '#50b0f3'
                }
            },
            data: [20, 32, 12, 44, 59, 23, 52]
        },{
            type: 'line',
            name: '全量-MR',
            yAxisIndex: 0,
            itemStyle: {
                normal:{
                    color: '#0f7ac4'
                }
            },
            data: [30, 40, 20, 50, 70, 30, 60]
        },{
            type: 'bar',
            barWidth: '20%',
            name: 'AGPS-MR记录数',
            yAxisIndex: 1,
            itemStyle: {
                normal:{
                    color: '#50b0f3',
                    barBorderRadius: 5
                }
            },
            data: [820, 1532, 901, 1534, 1290, 1530, 1320]
        },{
            type: 'bar',
            barWidth: '20%',
            name: '全量MR记录数',
            yAxisIndex: 1,
            itemStyle: {
                normal:{
                    color: '#0f7ac4',
                    barBorderRadius: 5
                }
            },
            data: [1020, 1932, 1201, 1934, 1590, 1830, 1520]
        }]
    };

    chartDiv.setOption(sceneOption);

    $(window).resize(function () {
        chartDiv.resize();
    })
}
