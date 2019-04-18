/**********************************
 * @filedesc CrossFilter工具js
 * @author laijunbao
 * @create 2018-10-25-0025 11:15
 * @modifier
 * @modify
 ***********************************/

var IntelligentTuningStatisticalExportCrossFilterUtil = {};

// 是否是第一次加载 true： 是
IntelligentTuningStatisticalExportCrossFilterUtil.isFirst = true;

/**********************************
 * @funcname IntelligentTuningStatisticalExportCrossFilterUtil.chart1handler
 * @funcdesc 处理图表1数据，得到 crossfilter 后的 数组对象
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-10-25-0025 14:58
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportCrossFilterUtil.chart1handler = function (create_day,city,country,mktcenter,statistical) {

    var chartCrossfilter = null;

    // 如果页面不是第一次加载，需要根据参数过滤数据，然后创建不同的crossfilter对象，进行数据处理
    if(!IntelligentTuningStatisticalExportCrossFilterUtil.isFirst){
        var data = [];
        if(IntelligentTuningStatisticalExport.vm.titleCity == '全省' && statistical == null){
            data = IntelligentTuningStatisticalExport.chartDataArr;
        }else{
            data = IntelligentTuningStatisticalExportCrossFilterUtil.filterHandler(create_day,city,country,mktcenter,statistical);
        }

        chartCrossfilter = crossfilter(data);
    }else{
        chartCrossfilter = crossfilter(IntelligentTuningStatisticalExport.chartDataArr);
    }

    // 以create_day创建维度
    var dataDimensionByCreateDay = chartCrossfilter.dimension(function (d) {
        return d.create_day;
    });
    // 分组
    var dataGroupByCreateDay = dataDimensionByCreateDay.group(function (createData) {
        return createData;
    });
    // 汇总
    IntelligentTuningStatisticalExportCrossFilterUtil.resultByCrossfilter = dataGroupByCreateDay.reduce(reduceAdd1, reduceRemove1, reduceInitial1).all();

    chartCrossfilter = null;
}

/**********************************
 * @funcname IntelligentTuningStatisticalExportCrossFilterUtil.handler
 * @funcdesc 处理图表2数据，得到 crossfilter 后的 数组对象
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-10-25-0025 14:58
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportCrossFilterUtil.chart2handler = function (create_day,city,country,mktcenter,statistical) {

    var dataByLastCreateDay = IntelligentTuningStatisticalExportCrossFilterUtil.filterHandler(create_day,city,country,mktcenter,statistical);

    var chart2Crossfilter = crossfilter(dataByLastCreateDay);

    var dataDimensionByCity = null;

    // 全省时，以city创建维度
    if(city == null){
        dataDimensionByCity = chart2Crossfilter.dimension(function (d) {
            return d.city;
        });
    }
    // （点击图表1柱子）city 和 country 都不为空时时，以 mktcenter 创建维度
    else if(create_day != null && city != null && country != null){
        dataDimensionByCity = chart2Crossfilter.dimension(function (d) {
            return d.mktcenter;
        });
    }
    // （点击图表1柱子）city 不为空时时，以 country 创建维度
    else if(create_day != null && city != null){
        dataDimensionByCity = chart2Crossfilter.dimension(function (d) {
            return d.country;
        });
    }
    // （地市或者区县改变）city 和 country 都不为空时时，以 mktcenter 创建维度
    else if(city != null && country != null){
        dataDimensionByCity = chart2Crossfilter.dimension(function (d) {
            return d.mktcenter;
        });
    }
    // （地市或者区县改变）city 不为空时时，以 country 创建维度
    else if(city != null){
        dataDimensionByCity = chart2Crossfilter.dimension(function (d) {
            return d.country;
        });
    }
    else{
        dataDimensionByCity = chart2Crossfilter.dimension(function (d) {
            return d.city;
        });
    }

    var dataGroupByCity = dataDimensionByCity.group(function (type) {
        return type;
    });

    IntelligentTuningStatisticalExportCrossFilterUtil.chart2resultByCrossfilter = dataGroupByCity.reduce(reduceAdd1, reduceRemove1, reduceInitial1).all();

    chart2Crossfilter = null;

}

function reduceAdd1(p, v) {
    p.task_create_count += v.task_create_count;
    p.accept_count += v.accept_count;
    p.execute_count += v.execute_count;
    p.resolve_count += v.resolve_count;
    return p;
};

function reduceRemove1(p, v) {
    p.task_create_count -= v.task_create_count;
    p.accept_count -= v.accept_count;
    p.execute_count -= v.execute_count;
    p.resolve_count -= v.resolve_count;
    return p;
};

function reduceInitial1() {
    return {task_create_count: 0, accept_count: 0, execute_count: 0, resolve_count: 0};
};


/**********************************
 * @funcname IntelligentTuningStatisticalExportCrossFilterUtil.filterHandler
 * @funcdesc 根据传入的参数，过滤图表数据
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-10-29-0029 14:48
 * @modifier
 * @modify
 ***********************************/
IntelligentTuningStatisticalExportCrossFilterUtil.filterHandler = function (create_day,city,country,mktcenter,statistical) {
    // var argumentsArr = Array.prototype.slice.apply(arguments);
    var returnData = [];
    // 日期、地市、区县、营服、问题类型都不为空
    if(create_day != null && city != null && country != null && mktcenter != null && statistical != null){
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.create_day == create_day && d.city == city && d.country == country && d.mktcenter == mktcenter && d.problem_name == statistical;
        })
    }else if(create_day != null && city != null && country != null && mktcenter != null){
        // 日期、地市、区县、营服都不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.create_day == create_day && d.city == city && d.country == country && d.mktcenter == mktcenter;
        })
    }else if(create_day != null && city != null && country != null && statistical != null){
        // 日期、地市、区县、问题类型都不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.create_day == create_day && d.city == city && d.country == country && d.problem_name == statistical;
        })
    }else if(create_day != null && city != null && country != null ){
        // 日期、地市、区县都不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.create_day == create_day && d.city == city && d.country == country;
        })
    }else if(create_day != null && city && statistical != null){
        // 日期、地市、问题类型都不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.create_day == create_day && d.city == city && d.problem_name == statistical;
        })
    }else if(create_day != null && city!= null ){
        // 日期、地市都不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.create_day == create_day && d.city == city;
        })
    }else if(city != null && country != null && mktcenter != null && statistical != null){
        // 地市、区县、营服、问题类型都不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.city == city && d.country == country && d.mktcenter == mktcenter && d.problem_name == statistical;
        })
    }else if(city != null && country != null && mktcenter != null){
        // 地市、区县、营服都不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.city == city && d.country == country && d.mktcenter == mktcenter;
        })
    }
    else if(city != null && country != null && statistical != null){
        // 地市、区县、问题类型都不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.city == city && d.country == country && d.problem_name == statistical;
        })
    }else if(city != null && country != null){
        // 地市、区县都不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.city == city && d.country == country;
        })
    }
    else if(create_day != null && statistical != null){
        // 日期、问题类型都不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.create_day == create_day&& d.problem_name == statistical;
        })
    }else if(create_day != null){
        // 日期不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.create_day == create_day;
        })
    }else if(city != null && statistical != null){
        // 地市、问题类型都不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.city == city&& d.problem_name == statistical;
        })
    }else if(city != null){
        // 地市都不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.city == city;
        })
    }else if(country != null && statistical != null){
        // 区县、问题类型都不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.country == country&& d.problem_name == statistical;
        })
    }else if(country != null){
        // 区县都不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.country == country;
        })
    }else if(mktcenter != null&& statistical != null){
        // 营服、问题类型都不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.mktcenter == mktcenter&& d.problem_name == statistical;
        })
    }else if(mktcenter != null){
        // 营服都不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.mktcenter == mktcenter;
        })
    }else if(statistical != null){
        // 问题类型不为空
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.problem_name == statistical;
        })
    }
    else{
        // 默认返回和 create_day 相等的数据
        returnData = IntelligentTuningStatisticalExport.chartDataArr.filter(function (d) {
            return d.create_day == IntelligentTuningStatisticalExport.vm.queryDayFormat;
        })
    }

    return returnData;
}
