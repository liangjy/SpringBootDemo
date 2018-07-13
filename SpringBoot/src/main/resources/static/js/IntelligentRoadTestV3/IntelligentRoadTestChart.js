var IntelligentRoadTestChart = {};

//场景名称
IntelligentRoadTestChart.senceName = noceUtil.GetQueryString("senceName");

//时间
IntelligentRoadTestChart.day = noceUtil.GetQueryString("day");
IntelligentRoadTestChart.endDay = noceUtil.GetQueryString("endDay");

//城市
IntelligentRoadTestChart.mapCity = noceUtil.GetQueryString("mapCity");


//区县
IntelligentRoadTestChart.mapDistrict = noceUtil.GetQueryString("mapDistrict");

//全省还是地市用户
IntelligentRoadTestChart.cityPermission = null;

//营服
IntelligentRoadTestChart.mktcenterTmp = "";

$(function () {

    //导出
    $('#export').click(function(){
        IntelligentRoadTestChart.export();
    });

    //改变顶部文字，进来的哪个场景
    IntelligentRoadTestChart.changeTopText();

    IntelligentRoadTestChart.cityPermission=$('#cityPermission_common').val();

    if(IntelligentRoadTestChart.cityPermission=="全省"){
        IntelligentRoadTestChart.mapDistrict = "";
    }

    if(IntelligentRoadTestChart.senceName != "弱区"){
        $(".chartWrap").hide();
    }

    if(IntelligentRoadTestChart.senceName == "弱区"){

        $(".chartWrap").show();
        //查询左边图表数据
        IntelligentRoadTestChart.getLeftChartData();

        //查询右边图表数据
        IntelligentRoadTestChart.getRightChartData();

        //加载表格
        IntelligentRoadTestChart.loadmktCenterAreaTableData();

    }else if(IntelligentRoadTestChart.senceName == "关注区域"){
        //关注区域表格
        IntelligentRoadTestChart.concernAreaTable();

    }else if(IntelligentRoadTestChart.senceName == "工单"){
        //工单表格
        IntelligentRoadTestChart.alarmInfoTable(IntelligentRoadTestChart.day,IntelligentRoadTestChart.endDay,IntelligentRoadTestChart.mapCity,"","");

    }else if(IntelligentRoadTestChart.senceName == "dt"){
        //dt表格
        IntelligentRoadTestChart.DTListTable();

    }else if (IntelligentRoadTestChart.senceName == "扇区"){
        //扇区表格
        IntelligentRoadTestChart.sectorTable();

    }else if (IntelligentRoadTestChart.senceName == "骨头区域"){
        //骨头区域表格
        IntelligentRoadTestChart.boneAreaTable()

    }else if (IntelligentRoadTestChart.senceName == "宏扇区"){
        //宏扇区表格
        IntelligentRoadTestChart.macSectorTable();

    }else if (IntelligentRoadTestChart.senceName == "高速"){
        //高速，高铁，市政路表格
        IntelligentRoadTestChart.gaosuGaoTieShizhengluTable(1);

    }else if (IntelligentRoadTestChart.senceName == "高铁"){
        //高速，高铁，市政路表格
        IntelligentRoadTestChart.gaosuGaoTieShizhengluTable(2);
    }else if (IntelligentRoadTestChart.senceName == "市政路"){
        //高速，高铁，市政路表格
        IntelligentRoadTestChart.gaosuGaoTieShizhengluTable(3);
    }
    else if (IntelligentRoadTestChart.senceName == "地铁"){
        //地铁表格
        IntelligentRoadTestChart.ditieTable();
    }else if (IntelligentRoadTestChart.senceName == "高校" ){
        //高校。。。表格
        IntelligentRoadTestChart.wugaoAreaTable(1);
    }else if(IntelligentRoadTestChart.senceName == "高密度住宅区"){
        IntelligentRoadTestChart.wugaoAreaTable(2);

    }else if(IntelligentRoadTestChart.senceName == "高流量商务区"){
        IntelligentRoadTestChart.wugaoAreaTable(3);

    }else if(IntelligentRoadTestChart.senceName == "美景"){
        IntelligentRoadTestChart.wugaoAreaTable(7);

    }else if(IntelligentRoadTestChart.senceName == "美食"){
        IntelligentRoadTestChart.wugaoAreaTable(9);

    }else if(IntelligentRoadTestChart.senceName == "战狼区域"){
        IntelligentRoadTestChart.wugaoAreaTable(3);

    }else if(IntelligentRoadTestChart.senceName == "场馆"){
        IntelligentRoadTestChart.wugaoAreaTable(10);

    }else if(IntelligentRoadTestChart.senceName == "农贸市场"){
        IntelligentRoadTestChart.wugaoAreaTable(8);

    }
    else {
        $(".chartWrap").hide();
    }


    $(".chartDiv").height($(".chartDiv-top").height()-40);
    $(".contentDiv").height($(".main-content").height()-50);
    $(window).resize(function () {
        $(".chartDiv").height($(".chartDiv-top").height()-40);
        $(".contentDiv").height($(".main-content").height()-50);
    });

    //表格高度
    if($(".typeName").text()=="弱区"){
        $(".tableDivWrap").css("height","50%");
    }else{
        $(".tableDivWrap").css("height","100%");
    }
    //隐藏导出按钮
    /*if($(".typeName").text()=="弱区"){
        $(".exportDiv").show();

    }else {
        $(".exportDiv").hide();
    }*/
});
/**********************************
 * @funcname changeTopText
 * @funcdesc 改变顶部文字，进来的哪个场景
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/24 10:43
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChart.changeTopText = function IntelligentRoadTestChart_changeTopText() {
    $(".dateDiv").text(IntelligentRoadTestChart.day + "~" + IntelligentRoadTestChart.endDay);
    $(".cityName").text(IntelligentRoadTestChart.mapCity);
    $(".typeName").text(IntelligentRoadTestChart.senceName);
}

/**********************************
 * @funcname getLeftChartData
 * @funcdesc 查询左边图表数据
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018-01-22 15:53
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTestChart.getLeftChartData = function IntelligentRoadTestChart_getLeftChartData() {
    var sql=["IntelligentRoadTest_01_province","DAY:"+IntelligentRoadTestChart.endDay]
    if(IntelligentRoadTestChart.cityPermission!="全省"){
        sql=["IntelligentRoadTest_02_city","DAY:"+IntelligentRoadTestChart.endDay,"CITY:"+IntelligentRoadTestChart.mapCity];
    }
    var sqlList = [];
    sqlList.push(sql);
    var funcList = [IntelligentRoadTestChart.initLeftChart];
    var database = [3];
    progressbarTwo.submitSql(sqlList, funcList, database,null,null,null,null,true);
}

/**********************************
 * @funcname getRightChartData
 * @funcdesc 查询右边图表数据
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018-01-22 16:38
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChart.getRightChartData = function IntelligentRoadTestChart_getRightChartData(day,city) {
    var sql= "";
    var cityPar = "";
    if(typeof city != "undefined"){
        if(IntelligentRoadTestChart.cityPermission=="全省"){
            IntelligentRoadTestChart.mapCity =city;
            cityPar = city;
        }else{
            cityPar = IntelligentRoadTestChart.mapCity;
            IntelligentRoadTestChart.mapDistrict = city;
        }
    }else{
        cityPar = IntelligentRoadTestChart.mapCity;
    }
    if(IntelligentRoadTestChart.cityPermission=="全省"){
        sql=["IntelligentRoadTest_02_city","DAY:"+IntelligentRoadTestChart.endDay,"CITY:"+cityPar];
    }else{
        sql=["IntelligentRoadTest_03_country","DAY:"+IntelligentRoadTestChart.endDay,"CITY:"+cityPar,"COUNTRY:"+IntelligentRoadTestChart.mapDistrict]
    }

    var sqlList = [];
    sqlList.push(sql);
    var funcList = [IntelligentRoadTestChart.initRightChart];
    var database = [3];
    progressbarTwo.submitSql(sqlList, funcList, database,null,null,null,null,true);
}

/**********************************
 * @funcname initLeftChart
 * @funcdesc 初始化左边echart图
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018-01-22 16:06
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTestChart.initLeftChart = function IntelligentRoadTestChart_initLeftChart(data) {

    var result = callBackChangeData(data);
    for(var j=0;j<result.length;j++){
        if(result[j].country=='全市'){

            result[0] = result.splice(j, 1, result[0])[0];
        }
    }
    var chartData={};
    var charBadcount=[];
    var charPoor_grid_nums=[];
    var charCity=[];
    var charProportion=[]
    if(result.length!=0){
        $('#topbar').html(IntelligentRoadTestChart.cityPermission+"RSRP<-105db弱覆盖区域数及弱覆盖栅格占比<div style='padding-left:40px;' >弱区总数："+result[0].badcount+"  弱栅格总数："+	result[0].poor_grid_nums+"</div>");
    }

    for(var i=1;i<result.length;i++){
        charBadcount.push(result[i].badcount);
        charPoor_grid_nums.push(result[i].poor_grid_nums);
        charProportion.push(result[i].proportion)
        if(IntelligentRoadTestChart.cityPermission!="全省"){
            charCity.push(result[i].country);
        }else{
            charCity.push(result[i].city);
        }

    }
    chartData.city=charCity;
    chartData.badcount=charBadcount;
    chartData.poor_grid_nums=charPoor_grid_nums;
    chartData.proportion=charProportion;
    IntelligentRoadTestChart.topBarData=chartData;//缓存上方柱状图数据
    IntelligentRoadTestChart.showBar('chartTop',chartData);

}

/**********************************
 * @funcname initRightChart
 * @funcdesc 初始化右边图表
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018-01-22 16:39
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChart.initRightChart = function IntelligentRoadTestChart_initRightChart(data) {

    var result = callBackChangeData(data);
    for(var j=0;j<result.length;j++){
        if(result[j].country=='全市'){

            result[0] = result.splice(j, 1, result[0])[0];
        }
    }
    IntelligentRoadTestChart.bottomBarData=result;//缓存下方柱状图数据
    var chartData={};
    var charBadcount=[];
    var charPoor_grid_nums=[];
    var charCity=[];
    var charProportion=[]

    var txtTmp = "";
    if(IntelligentRoadTestChart.cityPermission == "全省"){
        txtTmp = IntelligentRoadTestChart.mapCity;
    }else {
        txtTmp = IntelligentRoadTestChart.mapDistrict;
    }
    if(result.length!=0){
        $('#bottombar').html(txtTmp+"RSRP<-105db弱覆盖区域数及弱覆盖栅格占比<div style='padding-left:40px;' >弱区总数："+result[0].badcount+"  弱栅格总数："+	result[0].poor_grid_nums+"</div>");
    }

    for(var i=1;i<result.length;i++){
        charBadcount.push(result[i].badcount);
        charPoor_grid_nums.push(result[i].poor_grid_nums);
        charProportion.push(result[i].proportion)
        if(IntelligentRoadTestChart.cityPermission=="全省"){
            charCity.push(result[i].country);
        }else{
            charCity.push(result[i].mktcenter);
        }

    }
    chartData.city=charCity;
    chartData.badcount=charBadcount;
    chartData.poor_grid_nums=charPoor_grid_nums;
    chartData.proportion=charProportion;
    IntelligentRoadTestChart.topBarData=chartData;//缓存上方柱状图数据
    IntelligentRoadTestChart.showBar('chartBottom',chartData);

}
/**********************************
 * @funcname showBar
 * @funcdesc 填充图表
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018-01-22 16:14
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChart.showBar= function IntelligentRoadTestChart_showBar(div,data){
    $(".chartDiv").height($(".chartDiv-top").height()-40);
    $(".contentDiv").height($(".main-content").height()-40);
    var gridSum=0;//栅格总数
    var chart = echarts.init(document.getElementById(div));
    var asisLab=null;
    if(div!="chartBottom"){
        IntelligentRoadTestChart.topChar=chart;
        asisLab={
            interval:0,//横轴信息全部显示
            formatter:function(val){
                return val.split("").join("\n");
            }
        }

    }else{
        IntelligentRoadTestChart.bottomChar=chart;
        asisLab={
            interval:0,//横轴信息全部显示
            formatter:function(val){
                return val.split("").join("\n");
            }
        }
    }
    var max=Math.max.apply(null, data.poor_grid_nums);
    for(var i=0;i<data.poor_grid_nums.length;i++){
        if(data.poor_grid_nums[i]<(max/12)){
            data.poor_grid_nums[i]=Math.ceil(max/10);
        }
        gridSum=gridSum+data.poor_grid_nums[i];//计算栅格总数
    }
    var max2=Math.max.apply(null, data.badcount);
    for(var j=0;j<data.badcount.length;j++){
        if(data.badcount[j]<(max2/12)){
            data.badcount[j]=Math.ceil(max2/10);
        }
    }
    //获取栅格占比信息
    var gridRatio=[]
    for(var i=0;i<data.proportion.length;i++){
        gridRatio.push((data.proportion[i]*100).toFixed(2));
    }
    var max3=Math.max.apply(null, gridRatio);
    //-------------
    var interval3=Math.ceil(Math.ceil(max3)/4);
    max3=interval3*4;

    var interval2=Math.ceil(Math.ceil(max2)/4);
    interval2=Math.ceil(interval2/100)*100;
    max2=interval2*4;

    var option = {
        tooltip : {
            trigger: 'axis',
            axisPointer:{
                type:'shadow'

            },formatter:function(params ){
//	        	alert(JSON.stringify(params[0]));
                var str='<ul style="">';
                for(var i=0;i<params.length;i++){
                    var s='';
                    if(params[i].seriesName=='弱覆盖栅格占比'){
                        s='%';
                    }
                    str=str+'<li style=""><span style="color:'+params[i].color+';font-size: 20px;padding-right: 5px;">●</span>'+params[i].seriesName+': '+params[i].value+''+s+'</li>';
                }
                return str+'</ul>';
            }
        },
        legend: {
            data:['弱覆盖栅格占比','弱覆盖区域'],
            top: '5%',
        },
        calculable : true,
        grid:{
            left: '11%',
            right: '10%',
            bottom: '50px'
        },
        xAxis : [
            {
                type : 'category',
                data : data.city,
                axisLabel: asisLab,
                axisLine: {
                    lineStyle:{
                        color: '#686c78',
                    },
                },
                axisTick: {
                    show: false
                },
            },
        ],
        yAxis : [
            {
                type : 'value',
                name:'弱覆盖栅格占比(%)',
//	            splitNumber:4,
//	            scale:true,
                min: 0,
                max: max3,
                interval: interval3,
                axisLine: {
                    lineStyle:{
                        color: '#686c78',
                    },
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                nameTextStyle:{

                }
            },
            {
                type : 'value',
                name:'弱覆盖区域数',
                min: 0,
                max: max2,
                interval: interval2,
//	            splitNumber:4,
                axisLine: {
                    lineStyle:{
                        color: '#686c78',
                    },
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
            ,
            {
                type : 'value',
                name:'弱覆盖栅格数',
                show:false,
//	            min: 0,
//	            max: max,
//	            interval: interval,
                axisLine: {
                    lineStyle:{
                        color: '#686c78',
                    },
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series : [
            {
                name:'弱覆盖栅格占比',
                type:'bar',
                barWidth: '40%',
                data:gridRatio,
                yAxisIndex:0,
                itemStyle:{
                    normal:{
                        color: '#64BBA8',
                        barBorderRadius: [10,10,0,0]
                    }
                }
            }
            , {
                name: '弱覆盖区域',
                yAxisIndex:1,
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#E8A463'
                    }
                },
                data: data.badcount
            },
            {
                name:'弱覆盖栅格',
                type:'line',
                data:data.poor_grid_nums,
                yAxisIndex:2,
                itemStyle:{
                    normal:{
                        borderWidth:0,
                        color: '#7d8bd3',
                        opacity:0
                    }
                },
                lineStyle:{
                    normal:{
                        opacity:0
                    }
                }
            }
        ]
    };
    chart.setOption(option);
    // chart.resize();
    window.addEventListener("resize", function() {
        chart.resize();
    });

    if(div!="chartBottom"){
        chart.on('click', function (params) {
            if(params.name=='全省' ||params.name=='全市'){
                return;
            }

            //查询右边图表
            IntelligentRoadTestChart.getRightChartData(IntelligentRoadTestChart.day,params.name);

            //查询表格数据
            if(IntelligentRoadTestChart.cityPermission=="全省"){
                IntelligentRoadTestChart.mapCity = params.name;
                IntelligentRoadTestChart.mapDistrict = "";
                // IntelligentRoadTestChart.loadmktCenterAreaTableData(params.name,IntelligentRoadTestChart.bottomBarData[1].country,"",IntelligentRoadTestChart.day,"","")
                IntelligentRoadTestChart.loadmktCenterAreaTableData(params.name)
            }else{
                IntelligentRoadTestChart.mapDistrict = params.name;
                IntelligentRoadTestChart.mktcenterTmp = "";
                // IntelligentRoadTestChart.mktcenterTmp = IntelligentRoadTestChart.bottomBarData[1].mktcenter;
                // city,country,mktcenter,day,do_type,b
                // IntelligentRoadTestChart.loadmktCenterAreaTableData(IntelligentRoadTestChart.mapCity,IntelligentRoadTestChart.mapDistrict,IntelligentRoadTestChart.bottomBarData[1].mktcenter);
                IntelligentRoadTestChart.loadmktCenterAreaTableData(IntelligentRoadTestChart.mapCity,IntelligentRoadTestChart.mapDistrict);
            }
        });
    }else{
        chart.on('click', function (params) {
            //查询右边top20数据
            if(IntelligentRoadTestChart.cityPermission=="全省"){
                // intelligentRoadTest.loadTOP20Table($('#seachTime').val(),intelligentRoadTest.checkedTopBar,params.name);
                IntelligentRoadTestChart.loadmktCenterAreaTableData(IntelligentRoadTestChart.mapCity,params.name,"",IntelligentRoadTestChart.day,"","")
                IntelligentRoadTestChart.mapDistrict = params.name;

            }else{
                IntelligentRoadTestChart.loadmktCenterAreaTableData(IntelligentRoadTestChart.mapCity,IntelligentRoadTestChart.mapDistrict,params.name,IntelligentRoadTestChart.day,"","");
                IntelligentRoadTestChart.mktcenterTmp = params.name;
            }
        });
    }

}

/**********************************
 * @funcname export
 * @funcdesc 表格导出
 * @param {datatype} nameOfParameter (input/output optional)
 descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/23 9:44
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTestChart.export = function IntelligentRoadTestChart_export() {
    //城市
    var city = IntelligentRoadTestChart.mapCity;

    //区县
    var country = IntelligentRoadTestChart.mapDistrict;

    //营服
    var mktcenter = IntelligentRoadTestChart.mktcenterTmp;

    if (IntelligentRoadTestChart.senceName == "弱区"){
        //弱区表格导出
        IntelligentRoadTestChartExport.poorAreaTableExport(IntelligentRoadTestChart,city,country,mktcenter);

    }else if(IntelligentRoadTestChart.senceName == "关注区域"){
        //关注区域表格导出
        IntelligentRoadTestChartExport.concernAreaTableExport(IntelligentRoadTestChart,city);

    }else if (IntelligentRoadTestChart.senceName == "扇区"){
        //扇区表格导出
        IntelligentRoadTestChartExport.sectorTableExport(IntelligentRoadTestChart);

    }
    else if(IntelligentRoadTestChart.senceName == "工单"){
        //工单表格导出
        IntelligentRoadTestChartExport.alarmTableExport(IntelligentRoadTestChart);

    }else if(IntelligentRoadTestChart.senceName == "dt"){
        //dt表格导出
        IntelligentRoadTestChartExport.DTListTableExport(IntelligentRoadTestChart);

    }else if (IntelligentRoadTestChart.senceName == "骨头区域"){
        //骨头区域表格导出
        IntelligentRoadTestChartExport.boneAreaTableExport(IntelligentRoadTestChart);

    }else if (IntelligentRoadTestChart.senceName == "宏扇区"){
        //宏扇区表格导出
        IntelligentRoadTestChartExport.macSectorTableExport(IntelligentRoadTestChart);

    }else if(IntelligentRoadTestChart.senceName == "高速"){
        IntelligentRoadTestChartExport.gaosuGaotieShizhengluTableExport(IntelligentRoadTestChart,1,"高速");
    }else if(IntelligentRoadTestChart.senceName == "高铁"){
        IntelligentRoadTestChartExport.gaosuGaotieShizhengluTableExport(IntelligentRoadTestChart,2,"高铁");
    }else if(IntelligentRoadTestChart.senceName == "市政路"){
        IntelligentRoadTestChartExport.gaosuGaotieShizhengluTableExport(IntelligentRoadTestChart,3,"市政路");
    }else if(IntelligentRoadTestChart.senceName == "地铁"){
        IntelligentRoadTestChartExport.ditieTableExport(IntelligentRoadTestChart);
    }else if(IntelligentRoadTestChart.senceName == "高校"){
        IntelligentRoadTestChartExport.wugaoAreaTableExport(IntelligentRoadTestChart,1,"高校");
    }else if(IntelligentRoadTestChart.senceName == "高密度住宅区"){
        IntelligentRoadTestChartExport.wugaoAreaTableExport(IntelligentRoadTestChart,2,"高密度住宅区");
    }else if(IntelligentRoadTestChart.senceName == "高流量商务区"){
        IntelligentRoadTestChartExport.wugaoAreaTableExport(IntelligentRoadTestChart,3,"高流量商务区");
    }else if(IntelligentRoadTestChart.senceName == "美景"){
        IntelligentRoadTestChartExport.wugaoAreaTableExport(IntelligentRoadTestChart,7,"美景");
    }else if(IntelligentRoadTestChart.senceName == "美食"){
        IntelligentRoadTestChartExport.wugaoAreaTableExport(IntelligentRoadTestChart,9,"美食");
    }else if(IntelligentRoadTestChart.senceName == "战狼区域"){
        IntelligentRoadTestChartExport.wugaoAreaTableExport(IntelligentRoadTestChart,3,"战狼区域");
    }else if(IntelligentRoadTestChart.senceName == "场馆"){
        IntelligentRoadTestChartExport.wugaoAreaTableExport(IntelligentRoadTestChart,10,"场馆");
    }else if(IntelligentRoadTestChart.senceName == "农贸市场"){
        IntelligentRoadTestChartExport.wugaoAreaTableExport(IntelligentRoadTestChart,8,"农贸市场");
    }


}

/**********************************
 * @funcname loadmktCenterAreaTableData
 * @funcdesc 加载弱区表格
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018-01-22 18:21
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChart.loadmktCenterAreaTableData = function IntelligentRoadTestChart_loadmktCenterAreaTableData(city,country,mktcenter,day,do_type,b){
    if(do_type==null||do_type==undefined||do_type==0){
        do_type="";
    }else{
        do_type="and DO_TYPE="+do_type;
    }
    var cityPar = "";
    var countrypar = "";
    if(typeof city != "undefined"){
        cityPar = city;
    }else{
        cityPar = IntelligentRoadTestChart.mapCity;
    }
    if(typeof country != "undefined"){
        countrypar = country;
    }else{
        countrypar = IntelligentRoadTestChart.mapDistrict;
    }

    var list = ["IntelligentRoadTest_09_02_areaTable","DAY:"+IntelligentRoadTestChart.endDay,"DO_TYPE:"+do_type];

    if(cityPar != ""){
        list.push("CITY:"+cityPar);
    }
    if(countrypar != ""){
        list.push("COUNTRY:"+"and COUNTRY = '"+countrypar+"'");
    }else{
        list.push("COUNTRY:");
    }
    if(mktcenter == null||mktcenter ==''||mktcenter == undefined){
        list.push("MKTCENTER:");
    }else{
        list.push("MKTCENTER:"+"and MKTCENTER = '"+mktcenter+"'");
    }

    var clnObj={
        clnCssArray:[
            {clnNum:1,clnCss:["cln",["clickShowModal"]]},
            {clnNum:8,clnCss:["cln",["clickShowModal"]]},
            {clnNum:12,clnCss:["cln",["clickShowModal"]]},
            {clnNum:16,clnCss:["cln",["clickShowModal"]]},
            {clnNum:17,clnCss:["cln",["clickShowModal"]]},
            {clnNum:19,clnCss:["cln",["clickShowModal"]]},
            {clnNum:21,clnCss:["cln",["clickShowModal"]]}
        ],
        subArray:[{clnNum:11,value:0,title:IntelligentRoadTestChart.TOPSectorInfo},
            {clnNum:10,value:0,title:IntelligentRoadTestChart.recentSectorInfo}
        ]
    };
    var tableHead = "弱区编号,地市,区县,营服中心,最近站址," +
        "最近基站ID,最近小区ID,最近小区名,最近小区状态,最近TOP5小区集,MR数最大TOP5小区集,退服告警数,退服告警小区数,未恢复退服告警小区数," +
        "建议处理措施,是否派单,4G切3G总次数,4G切3G总次数排名,4G总流量(MB),4G流量排名,4G用户数,4G用户数排名,感知优良率(%),感知优良率排名,"+
        "弱栅格数,弱栅格数排名,弱栅格面积(㎡),栅格总面积(㎡),中心点经度,中心点纬度,中心点区域归属ID,"+
        "GIS经纬度集,最终排名累计";
//	var tableHead = "日期,弱区id,最近站名,最近站址,最近基站ID,曾发生退服告警总次数,曾发生退服告警小区数," +
//	"未恢复退服告警小区数,弱覆盖处理措施,地市名称,地市ID,区县,区县ID,营服中心,营服中心ID,,4G切3G总次数,4G切3G总次数在本地网内排名," +
//	",4G总流量,本地网内4G流量排名,,感知优良率按天平均值(%),本地网内感知优良率排名,,,4G用户数按天平均值,本地网内4G用户数排名,最终排名累计值," +
//	"栅格最小经度,栅格最小纬度,栅格中心经度,栅格中心纬度,栅格最大经度,栅格最大纬度,中心点区域归属ID,主服务小区集合,GIS经纬度集合";
    var fixObj={
        fixRow:1,
        fixClnObj:{
            fixCln:2,
            tableId:'fixreaTableId'
        }
    };
    var tableObject={
        divId:"areaTable",
        tableId:"areaTableId",
        tableHead:tableHead,
//			Data:data,
        clnObj:clnObj,
        fixObj:fixObj,
        dataType:3,
        sql:list,
        sortFlag:1,
        // sortObj:{sortColumn:"day",sortType:"asc"},
        pageObj:{pageFlag:0},
        frontFlag:1
        // ,scrollObj:{clnNums:[1],clnValues:[IntelligentRoadTest.object_id]}
    };
    IntelligentRoadTestChart.areaTable = new TableToolsNewTwo();
    IntelligentRoadTestChart.areaTable.submit(tableObject);

    $(".btnDiv").hide();
}

IntelligentRoadTestChart.recentSectorInfo = function IntelligentRoadTestChart_recentSectorInfo(recentSectorStr){
//	console.log(topSectorStr);
    //基站号,小区号,距离，数量,平均RSRP
    var topSectorArr = recentSectorStr.split("@");
    var info = "";
    for(var i=0;i<topSectorArr.length;i++){
        var sect = topSectorArr[i].split(",");
        info += "基站号:"+sect[0]+",小区号:"+sect[1]+
            ",距离:"+sect[2]+",数量:"+sect[3]+",平均RSRP:"+sect[4];
        if(i<topSectorArr.length-1){
            info += "\n";
        }
    }
    if(topSectorArr.length>1){
        return info;
    }else{
        return recentSectorStr;
    }

}
IntelligentRoadTestChart.TOPSectorInfo = function IntelligentRoadTestChart_TOPSectorInfo(mrtopSectorStr){
//	console.log(topSectorStr);
    //基站号,小区号,数量,平均RSRP,按数量排序序号
    var topSectorArr = mrtopSectorStr.split("@");
    var info = "";
    for(var i=0;i<topSectorArr.length;i++){
        var sect = topSectorArr[i].split(",");
        info += "基站id:"+sect[0]+",小区id:"+sect[1]+
            ",数量:"+sect[2]+",平均RSRP:"+sect[3]+",数量排序序号:"+sect[4];
        if(i<topSectorArr.length-1){
            info += "\n";
        }
    }
    if(topSectorArr.length>1){
        return info;
    }else{
        return mrtopSectorStr;
    }

}

/**********************************
 * @funcname queryAllConcernArea
 * @funcdesc 关注区域表格
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/25 21:05
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChart.concernAreaTable = function IntelligentRoadTestChart_concernAreaTable(){
    var list = ["IntelligentRoadTest_18_allConcernArea_02"];
    /*var city=$('#cityPermission_common').val();
    if(city=="全省"){
        list.push("CITY:");
    }else{
        list.push("CITY:"+"and city='"+city+"'");
    }*/
    var city = IntelligentRoadTestChart.mapCity;
    list.push("CITY:"+"and city='"+city+"'");

    var clnObj={
        clnCssArray:[
            {clnNum:2,clnCss:["cln",["clickShowModal"]]},
            {clnNum:7,clnCss:["cln",["clickShowModal"]]},
            {clnNum:8,clnCss:["cln",["clickShowModal"]]},
        ],
       /* functionArray:[
            {funCln:2,funtion:"IntelligentRoadTest.concernAreaPositiong();",funType:1},
            {funCln:7,funtion:"IntelligentRoadTest.concernAreaLog();",funType:1},
            {funCln:8,funtion:"IntelligentRoadTest.concernAreaSevenLine(this);",funType:1},
            {funCln:19,funtion:"IntelligentRoadTest.concernAreaEdit(this);",funType:1},
            {funCln:20,funtion:"IntelligentRoadTest.concernAreaDelete(this);",funType:1},
        ],*/
//    		subNotArray:[5,9,14]
        subArray:[{clnNum:5,value:1},
            {clnNum:8,value:1},
            {clnNum:19,value:1},
            {clnNum:20,value:1}]
    };
    var tableHead = "编号,名称,类型,创建者,创建时间,地市,调优日志,rsrp均值,覆盖率,最近基站id,最近小区id,最近小区名称,经纬度集合,最大经度,最大纬度,最小经度,最小纬度";
    var fixObj={
        fixRow:1,
    };
    var tableObject={
        divId:"concernAreaTable",
        tableId:"concernAreaTable",
        tableHead:tableHead,
//			Data:data,
        clnObj:clnObj,
        fixObj:fixObj,
        dataType:3,
        sql:list,
        sortFlag:1,
//			sortObj:{sortColumn:"day",sortType:"asc"},
        pageObj:{pageFlag:0},
        frontFlag:1
    };
    IntelligentRoadTestChart.concernAreaTable = new TableToolsNewTwo();
    IntelligentRoadTestChart.concernAreaTable.tableObject = tableObject;
    IntelligentRoadTestChart.concernAreaTable.submit(tableObject);

    $(".btnDiv").hide();

}

/**********************************
 * @funcname loadAlarmInfoTableData
 * @funcdesc 工单表格
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/25 21:01
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChart.alarmInfoTable = function IntelligentRoadTestChart_alarmInfoTable(starTime,endTime,city,alarm_id,object_id){

    if(city!=null&&city!=undefined&&city!=''){
        city='and city=\''+city.replace('市', '')+'\'';
    }else{
        city='';
    }
    if(alarm_id!=null&&alarm_id!=undefined&&alarm_id!=''){
        alarm_id='and alarm_id=\''+alarm_id+'\'';
    }else{
        alarm_id='';
    }
    // var list = ["alarm_info_V2"];
    // list.push("STARTIME:"+starTime);
    // list.push("ENDTIME:"+endTime);
    // list.push("CITY:"+city);
    // list.push("ALARM_ID:"+alarm_id);

    var list = ["alarm_info_V2", "ENDTIME:" + endTime, "CITY:" + city, "ALARM_ID:" + alarm_id];

    progressbarTwo.submitSql([list] ,
        [function (data){
            $('#alarmInfoT + .loadImg').hide();
            var fixObj={
                fixRow:1,
            };
            var theadObj={
                clnCssArray:[
                ],
            }
            var clnObj={
                clnCssArray:[
                    {clnNum:5,clnCss:["cln",["clickShowModal"]]},
                    {clnNum:10,clnCss:["cln",["tdWidth"]]}
                ],
                functionArray:[
                    {funCln:5,funtion:"IntelligentRoadTest.Ahref();",funType:1}
                ]
            };

            var tableObject = {
                divId:'alarmInfoTable',
                tableId:"alarmTable_t",
                tableHead:"地市,弱区ID,工单标识,工单类型,工单单号,工单等级,创建时间,是否恢复,恢复时间,工单状态,派单时间,结单时间,工单内容",
                Data:data,
                clnObj:clnObj,
                sortFlag:1,
                fixObj:fixObj,
                frontFlag:1,
                // theadObj:theadObj
                scrollObj:{divId:"alarmInfoTable",clnNums:[2],clnValues:[object_id]}
            };
            IntelligentRoadTestChart.alarmInfo = new TableToolsNewTwo();
            IntelligentRoadTestChart.alarmInfo.tableObject = tableObject;
            IntelligentRoadTestChart.alarmInfo.submit(tableObject);
            $(".btnDiv").hide();
        }],
        [3],null,null,null,null,false,['Alarms']);


}

/**********************************
 * @funcname queryAllDTList
 * @funcdesc dt表格
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/25 21:01
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChart.DTListTable = function IntelligentRoadTestChart_DTListTable(name){
    var list = [];
    if(name==undefined){
        list = ["IntelligentRoadTest_18_dtTableList"];
    }else{
        list = ["IntelligentRoadTest_18_dtTableListSearch"];
        list.push("NAME:"+name);
    }
    var city = IntelligentRoadTestChart.mapCity;
    if(city=='全省'||city==''){
        list.push("CITY:");
    }else{
        list.push("CITY: and city = '"+city+"'");
    }

    var username = $('#headerUserForm_a').text().trim();
    list.push("USERNAME:"+username);

    var clnObj={
        clnCssArray:[
            {clnNum:7,clnCss:["cln",["clickShowModal"]]},
            {clnNum:8,clnCss:["cln",["clickShowModal"]]},
            {clnNum:9,clnCss:["cln",["clickShowModal"]]},
            {clnNum:10,clnCss:["cln",["clickShowModal"]]},
        ],
        functionArray:[
//    		               {funCln:10,funtion:"IntelligentRoadTest.areaPositioning();",funType:1},
            {funCln:7,funtion:"IntelligentRoadTest.dtCircle();",funType:1},
            {funCln:8,funtion:"IntelligentRoadTest.dtGrid();",funType:1},
            {funCln:9,funtion:"IntelligentRoadTest.dtFileUpload();",funType:1},
            {funCln:10,funtion:"IntelligentRoadTest.dtDelete();",funType:1},
        ],
//    		subNotArray:[10]
        subArray:[{clnNum:10,value:1}]
    };
    var tableHead = "编号,路测名称,路测时间,上传成功时间,上传者,地市";
//	var tableHead = "编号,路测名称,路测时间,上传成功时间,上传者,地市,操作1,操作2";

    var fixObj={
        fixRow:1,
    };
    var tableObject={
        divId:"DTTable",
        tableId:"DTTableId",
        tableHead:tableHead,
//			Data:data,
        clnObj:clnObj,
        fixObj:fixObj,
        dataType:3,
        sql:list,
        sortFlag:1,
        frontFlag:1,
        sortObj:{sortColumn:"create_time",sortType:"desc"},
        pageObj:{pageFlag:0}
    };
    IntelligentRoadTestChart.DTTable = new TableToolsNewTwo();
    IntelligentRoadTestChart.DTTable.tableObject = tableObject;
    IntelligentRoadTestChart.DTTable.submit(tableObject);
    $(".btnDiv").hide();

}

/**********************************
 * @funcname queryAllSectorTable
 * @funcdesc 扇区表格
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/25 14:57
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChart.sectorTable = function IntelligentRoadTestChart_sectorTable() {
    var list = ["IntelligentRoadTestAnalysisV2_3_171_cellTable2"];
    var city = IntelligentRoadTestChart.mapCity;
    list.push("DAY:"+IntelligentRoadTestChart.endDay);
    list.push("CITY:"+IntelligentRoadTestChart.mapCity);

    if(IntelligentRoadTestChart.mapDistrict != ""){
        list.push("COUNTRY:"+"and COUNTRY = '"+IntelligentRoadTestChart.mapDistrict+"'");
    }


    var clnObj={
        clnCssArray:[
            {clnNum:2,clnCss:["cln",["clickShowModal"]]},
            {clnNum:7,clnCss:["cln",["clickShowModal"]]},
            {clnNum:8,clnCss:["cln",["clickShowModal"]]},
        ],
        subArray:[{clnNum:5,value:1},
            {clnNum:8,value:1},
            {clnNum:19,value:1},
            {clnNum:20,value:1}]
    };
    var tableHead = "地市名称,地市ID,区县,区县ID,营服中心,营服中心ID,基站ID,基站名称,小区ID,小区名称,覆盖范围最小经度,覆盖范围最小纬度," +
        "覆盖范围中心经度,覆盖范围中心纬度,覆盖范围最大经度,覆盖范围最大纬度,基站小区归属ID,覆盖范围内栅格数,弱覆盖区域集合," +
        "弱覆盖区域数,附近弱覆盖区域集合,附近弱覆盖区域数,4G切3G总次数,4G总流量,感知优良率按天平均值,4G用户数按天平均值," +
        "曾发生退服告警总次数,小区的服务状态,基站小区处理级别,预测GPS位置,预测百度地图位置,预测位置相差距离,坐标勘误优先值," +
        "支持的MR条数,设备厂商,最终排名累计值,方位角,频段映射,是否室内,机械下倾,电子下倾,天线挂高,验收状况,基站站址,day,栅格颗粒度类型";
    var fixObj={
        fixRow:1,
    };
    var tableObject={
        divId:"sectorTable",
        tableId:"sectorTable",
        tableHead:tableHead,
        clnObj:clnObj,
        fixObj:fixObj,
        dataType:3,
        sql:list,
        sortFlag:1,
        pageObj:{pageFlag:0},
        frontFlag:1
    };
    IntelligentRoadTestChart.concernAreaTable = new TableToolsNewTwo();
    IntelligentRoadTestChart.concernAreaTable.tableObject = tableObject;
    IntelligentRoadTestChart.concernAreaTable.submit(tableObject);

    $(".btnDiv").hide();
    
}

/**********************************
 * @funcname boneAreaTable
 * @funcdesc 骨头区域表格
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/25 15:56
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChart.boneAreaTable = function IntelligentRoadTestChart_boneAreaTable() {
    var list = ["IntelligentRoadTestAnalysisV2_3_176_BONE_AREA_M_table"];
    var city = IntelligentRoadTestChart.mapCity;
    list.push("DAY:"+IntelligentRoadTestChart.endDay.substr(0,IntelligentRoadTestChart.endDay.length-2));
    list.push("CITY:"+IntelligentRoadTestChart.mapCity);
    /*if(IntelligentRoadTestChart.mapDistrict != ""){
        list.push("COUNTRY:"+"and COUNTRY = '"+IntelligentRoadTestChart.mapDistrict+"'");
    }*/
    // list.push("COUNTRY:"+IntelligentRoadTestChart.mapDistrict);

    var clnObj={
        clnCssArray:[
            {clnNum:2,clnCss:["cln",["clickShowModal"]]},
            {clnNum:7,clnCss:["cln",["clickShowModal"]]},
            {clnNum:8,clnCss:["cln",["clickShowModal"]]},
        ],
        subArray:[{clnNum:5,value:1},
            {clnNum:8,value:1},
            {clnNum:19,value:1},
            {clnNum:20,value:1}]
    };
    var tableHead = "区域ID,地市名称,地市ID,区县,区县ID,营服中心,营服中心ID,栅格最小经度,栅格最小纬度,栅格中心经度,栅格中心纬度," +
        "栅格最大经度,栅格最大纬度,中心点区域归属ID,主服务小区集合,GIS经纬度集合,4G切3G总次数,4G切3G总次数在本地网内排名,4G总流量," +
        "本地网内4G流量排名,感知优良率按天平均值,本地网内感知优良率排名,4G用户数按天平均值,本地网内4G用户数排名,弱覆盖区域的弱覆盖栅格数," +
        "弱覆盖区域的弱覆盖栅格数排名,最终排名累计值,弱覆盖最近基站名称,弱覆盖最近基站地址,弱覆盖最近的基站ID,弱覆盖最近的小区ID," +
        "弱覆盖最近的小区的名称,RSRP总和,RSRP记录数,RSRP均值,大于等于-105记录数,大于等于-105记录数,覆盖率,区域名称,区域类型," +
        "区域来源类型,是否缓期处理,缓期原因,创建人,创建时间,最近小区集合,月份";
    var fixObj={
        fixRow:1,
    };
    var tableObject={
        divId:"poorareaTable",
        tableId:"poorareaTable",
        tableHead:tableHead,
        clnObj:clnObj,
        fixObj:fixObj,
        dataType:3,
        sql:list,
        sortFlag:1,
        pageObj:{pageFlag:0},
        frontFlag:1
    };
    IntelligentRoadTestChart.concernAreaTable = new TableToolsNewTwo();
    IntelligentRoadTestChart.concernAreaTable.tableObject = tableObject;
    IntelligentRoadTestChart.concernAreaTable.submit(tableObject);

    $(".btnDiv").hide();

}

/**********************************
 * @funcname queryMacSectorTable
 * @funcdesc 宏扇区表格
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/25 19:18
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChart.macSectorTable = function IntelligentRoadTestChart_macSectorTable() {
    var list = ["IntelligentRoadTestAnalysisV2_3_171_cellTable"];
    var city = IntelligentRoadTestChart.mapCity;
    list.push("DAY:"+IntelligentRoadTestChart.endDay);
    list.push("CITY:"+IntelligentRoadTestChart.mapCity);
    // list.push("COUNTRY:"+IntelligentRoadTestChart.mapDistrict);

    list.push("PRED_DISTANCE:AND PRED_DISTANCE>1000");
    // if(IntelligentRoadTestChart.mapDistrict != ""){
    //     list.push("COUNTRY:"+"and COUNTRY = '"+IntelligentRoadTestChart.mapDistrict+"'");
    // }

    var clnObj={
        clnCssArray:[
            {clnNum:2,clnCss:["cln",["clickShowModal"]]},
            {clnNum:7,clnCss:["cln",["clickShowModal"]]},
            {clnNum:8,clnCss:["cln",["clickShowModal"]]},
        ],
        subArray:[{clnNum:5,value:1},
            {clnNum:8,value:1},
            {clnNum:19,value:1},
            {clnNum:20,value:1}]
    };
    var tableHead = "地市名称,地市ID,区县,区县ID,营服中心,营服中心ID,基站ID,基站名称,小区ID,小区名称,覆盖范围最小经度,覆盖范围最小纬度," +
        "覆盖范围中心经度,覆盖范围中心纬度,覆盖范围最大经度,覆盖范围最大纬度,基站小区归属ID,覆盖范围内栅格数,弱覆盖区域集合," +
        "弱覆盖区域数,附近弱覆盖区域集合,附近弱覆盖区域数,4G切3G总次数,4G总流量,感知优良率按天平均值,4G用户数按天平均值," +
        "曾发生退服告警总次数,小区的服务状态,基站小区处理级别,预测GPS位置,预测百度地图位置,预测位置相差距离,坐标勘误优先值," +
        "支持的MR条数,设备厂商,最终排名累计值,方位角,频段映射,是否室内,机械下倾,电子下倾,天线挂高,验收状况,基站站址,day,栅格颗粒度类型";
    var fixObj={
        fixRow:1,
    };
    var tableObject={
        divId:"MacSectorTable",
        tableId:"MacSectorTable",
        tableHead:tableHead,
        clnObj:clnObj,
        fixObj:fixObj,
        dataType:3,
        sql:list,
        sortFlag:1,
        pageObj:{pageFlag:0},
        frontFlag:1
    };
    IntelligentRoadTestChart.concernAreaTable = new TableToolsNewTwo();
    IntelligentRoadTestChart.concernAreaTable.tableObject = tableObject;
    IntelligentRoadTestChart.concernAreaTable.submit(tableObject);

    $(".btnDiv").hide();

}

/**********************************
 * @funcname gaosuGaoTieShizhengluTable
 * @funcdesc 高速高铁市政路表格
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/26 10:56
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChart.gaosuGaoTieShizhengluTable = function IntelligentRoadTestChart_gaosuGaoTieShizhengluTable(type) {
    var list = ["IntelligentRoadTestAnalysisV2_3_166_WUGAO_table"];
    var city = IntelligentRoadTestChart.mapCity;
    list.push("DAY:" + IntelligentRoadTestChart.endDay);
    list.push("CITY:" + IntelligentRoadTestChart.mapCity);
    // list.push("COUNTRY:" + IntelligentRoadTestChart.mapDistrict);

    list.push("TYPE:" + type);

    var clnObj = {
        clnCssArray: [
            {clnNum: 2, clnCss: ["cln", ["clickShowModal"]]},
            {clnNum: 7, clnCss: ["cln", ["clickShowModal"]]},
            {clnNum: 8, clnCss: ["cln", ["clickShowModal"]]},
        ],
        subArray: [{clnNum: 5, value: 1},
            {clnNum: 8, value: 1},
            {clnNum: 19, value: 1},
            {clnNum: 20, value: 1}]
    };
    var tableHead = "弱覆盖片区编号,地市名称,地市ID,区县,区县ID,营服中心,营服中心ID,栅格最小经度,栅格最小纬度,栅格中心经度,栅格中心纬度," +
        "栅格最大经度,栅格最大纬度,中心点区域归属ID,主服务小区集合,GIS经纬度集合,4G切3G总次数,4G切3G总次数在本地网内排名,4G总流量," +
        "本地网内4G流量排名,感知优良率按天平均值,本地网内感知优良率排名,4G用户数按天平均值,本地网内4G用户数排名,最终排名累计值,弱覆盖处理措施," +
        "弱覆盖最近基站名称,弱覆盖最近基站地址,基站ID,弱覆盖区域的弱覆盖栅格数,曾发生退服告警总次数,曾发生退服告警小区数,未恢复退服告警小区数," +
        "弱覆盖区域的全部栅格数,弱覆盖区域的弱覆盖栅格数排名,弱覆盖区域的弱栅格的面积,弱覆盖区域的全部栅格的面积,弱覆盖最近的小区ID," +
        "弱覆盖最近的小区的名称,弱覆盖最近的小区的状态,距离最近的TOP5的小区集合,电信RSRP均值最大频点记录数,电信大于等于-105记录数," +
        "电信RSRP均值最大频点的所有RSRP之和,移动RSRP均值最大频点的非空RSRP记录数,移动大于等于-105记录数,移动RSRP均值最大频点RSRP之和," +
        "联通RSRP均值最大频点记录数,联通大于等于-105记录数,联通RSRP均值最大频点RSRP之和,关联月份,场景类型,最近小区告警数,线路ID," +
        "线路名称,day,栅格颗粒度类型,类型";
    var fixObj = {
        fixRow: 1,
    };
    var tableObject = {
        divId: "gaosuTable",
        tableId: "gaosuTable",
        tableHead: tableHead,
        clnObj: clnObj,
        fixObj: fixObj,
        dataType: 3,
        sql: list,
        sortFlag: 1,
        pageObj: {pageFlag: 0},
        frontFlag: 1
    };
    IntelligentRoadTestChart.concernAreaTable = new TableToolsNewTwo();
    IntelligentRoadTestChart.concernAreaTable.tableObject = tableObject;
    IntelligentRoadTestChart.concernAreaTable.submit(tableObject);

    $(".btnDiv").hide();
}
/**********************************
 * @funcname ditieTable
 * @funcdesc 地铁表格
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/26 11:05
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChart.ditieTable = function IntelligentRoadTestChart_ditieTable(type) {
    var list = ["IntelligentRoadTestAnalysisV2_3_181_WUGAO_METRO_table"];
    var city = IntelligentRoadTestChart.mapCity;
    list.push("DAY:" + IntelligentRoadTestChart.endDay);
    list.push("CITYID:" + noceUtil.city_LATN_ID[IntelligentRoadTestChart.mapCity]);
    // list.push("COUNTRY:" + IntelligentRoadTestChart.mapDistrict);


    var clnObj = {
        clnCssArray: [
            {clnNum: 2, clnCss: ["cln", ["clickShowModal"]]},
            {clnNum: 7, clnCss: ["cln", ["clickShowModal"]]},
            {clnNum: 8, clnCss: ["cln", ["clickShowModal"]]},
        ],
        subArray: [{clnNum: 5, value: 1},
            {clnNum: 8, value: 1},
            {clnNum: 19, value: 1},
            {clnNum: 20, value: 1}]
    };
    var tableHead = "地市ID,源地铁站ID,下一地铁站ID,地铁分段ID,地铁线路标识,TA分段级别,线段GPS经纬度集合,移动RSRP[-140，0)记录数," +
        "移动RSRP[-115，0)记录数,移动RSRP[-110，0)记录数,移动RSRP[-105，0)记录数,移动RSRP[-100，0)记录数,移动RSRP[-95，0)记录数," +
        "移动RSRP[-140，0)之和,移动RSRP[-115，0)之和,移动RSRP[-110，0)之和,移动RSRP[-105，0)之和,移动RSRP[-100，0)之和," +
        "移动RSRP[-95，0)之和,移动RSRP[-140，0)平均值,移动RSRP[-115，0)平均值,移动RSRP[-110，0)平均值,移动RSRP[-105，0)平均值," +
        "移动RSRP[-100，0)平均值,移动RSRP[-95，0)平均值,联通RSRP[-140，0)记录数,联通RSRP[-115，0)记录数,联通RSRP[-110，0)记录数," +
        "联通RSRP[-105，0)记录数,联通RSRP[-100，0)记录数,联通RSRP[-95，0)记录数,联通RSRP[-140，0)之和,联通RSRP[-115，0)之和," +
        "联通RSRP[-110，0)之和,联通RSRP[-105，0)之和,联通RSRP[-100，0)之和,联通RSRP[-95，0)之和,联通RSRP[-140，0)平均值," +
        "联通RSRP[-115，0)平均值,联通RSRP[-110，0)平均值,联通RSRP[-105，0)平均值,联通RSRP[-100，0)平均值,联通RSRP[-95，0)平均值," +
        "电信RSRP[-140，0)记录数,电信RSRP[-115，0)记录数,电信RSRP[-110，0)记录数,电信RSRP[-105，0)记录数,电信RSRP[-100，0)记录数," +
        "电信RSRP[-95，0)记录数,电信RSRP[-140，0)之和,电信RSRP[-115，0)之和,电信RSRP[-110，0)之和,电信RSRP[-105，0)之和," +
        "电信RSRP[-100，0)之和,电信RSRP[-95，0)之和,电信RSRP[-140，0)平均值,电信RSRP[-115，0)平均值,电信RSRP[-110，0)平均值," +
        "电信RSRP[-105，0)平均值,电信RSRP[-100，0)平均值,电信RSRP[-95，0)平均值,电信top接入小区,电信Top最近小区,线路名称," +
        "源地铁站名称,目的地铁站名称,中心经度,中心纬度,预留字段9,预留字段10,日期";
    var fixObj = {
        fixRow: 1,
    };
    var tableObject = {
        divId: "ditieTable",
        tableId: "ditieTable",
        tableHead: tableHead,
        clnObj: clnObj,
        fixObj: fixObj,
        dataType: 3,
        sql: list,
        sortFlag: 1,
        pageObj: {pageFlag: 0},
        frontFlag: 1
    };
    IntelligentRoadTestChart.concernAreaTable = new TableToolsNewTwo();
    IntelligentRoadTestChart.concernAreaTable.tableObject = tableObject;
    IntelligentRoadTestChart.concernAreaTable.submit(tableObject);

    $(".btnDiv").hide();
}
/**********************************
 * @funcname wugaoAreaTable
 * @funcdesc 五高区域类表格
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 ESBH_TYPE= 1、高校；2、高密度住宅；3、高流量商务区； 7、美景；8、农贸市场 9、美食 10、场馆
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/26 11:28
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChart.wugaoAreaTable = function IntelligentRoadTestChart_wugaoAreaTable(type) {
    var list = ["IntelligentRoadTestAnalysisV2_3_177_WUGAO_Area_table"];
    var city = IntelligentRoadTestChart.mapCity;
    list.push("DAY:" + IntelligentRoadTestChart.endDay);
    list.push("CITY:" + city);
    list.push("ESBHTYPE:" + type);
    if(IntelligentRoadTestChart.senceName == "战狼区域"){
        //战狼区域是在商务区中分离出来的，所以在这里做一个分支
        var otherCondition = "and zlqy_flag = 1";//战狼区域的标识字段
        // var otherCondition = " and zlqy_flag is  null";//测试代码，数据库中的字段为null，先做这个作为测试代码
        list.push("OTHERCONDITION:" + otherCondition);
    }
    var clnObj = {
        clnCssArray: [
            {clnNum: 2, clnCss: ["cln", ["clickShowModal"]]},
            {clnNum: 7, clnCss: ["cln", ["clickShowModal"]]},
            {clnNum: 8, clnCss: ["cln", ["clickShowModal"]]},
        ],
        subArray: [{clnNum: 5, value: 1},
            {clnNum: 8, value: 1},
            {clnNum: 19, value: 1},
            {clnNum: 20, value: 1}]
    };
    var tableHead = "天翼蓝鹰区域编号,天翼蓝鹰区域名称,地市名称,地市ID,区县,区县ID,营服中心,营服中心ID,栅格最小经度," +
        "栅格最小纬度,栅格中心经度,栅格中心纬度,栅格最大经度,栅格最大纬度,中心点区域归属ID,主服务小区集合," +
        "GIS经纬度集合,4G切3G总次数,4G切3G总次数在本地网内排名,4G总流量,本地网内4G流量排名,感知优良率按天平均值,本地网内感知优良率排名," +
        "4G用户数按天平均值,本地网内4G用户数排名,最终排名累计值,弱覆盖最近基站名称,弱覆盖最近基站地址,基站ID,弱覆盖区域的弱覆盖栅格数," +
        "曾发生退服告警总次数,曾发生退服告警小区数,未恢复退服告警小区数,弱覆盖区域的全部栅格数,弱覆盖区域的弱覆盖栅格数排名," +
        "弱覆盖区域的弱栅格的面积,弱覆盖区域的全部栅格的面积,弱覆盖最近的小区ID,弱覆盖最近的小区的名称,弱覆盖最近的小区的状态," +
        "距离最近的TOP5的小区集合,电信RSRP均值最大频点记录数,电信大于等于-105记录数,电信RSRP均值最大频点的所有RSRP之和," +
        "关联月份,弱覆盖区域集合,弱覆盖区域数,day,栅格颗粒度类型";
    var fixObj = {
        fixRow: 1,
    };
    var tableObject = {
        divId: "wugaoAreaTable",
        tableId: "wugaoAreaTable",
        tableHead: tableHead,
        clnObj: clnObj,
        fixObj: fixObj,
        dataType: 3,
        sql: list,
        sortFlag: 1,
        pageObj: {pageFlag: 0},
        frontFlag: 1
    };
    IntelligentRoadTestChart.concernAreaTable = new TableToolsNewTwo();
    IntelligentRoadTestChart.concernAreaTable.tableObject = tableObject;
    IntelligentRoadTestChart.concernAreaTable.submit(tableObject);

    $(".btnDiv").hide();
}

/**********************************
 * @funcname getNewDate
 * @funcdesc 日期加减函数 传入日期字符串date（格式为2017/09/01）和加减天数days（减为负数），返回加减天后的日期
 * @param {Date} date (input optional)
 *  日期字符串（格式为2017/09/01）
 * @param {Date} days (input optional)
 *  加减天数
 * @return 返回加减后的日期字符串
 * @author 郑文彬
 * @create 20170921
 ***********************************/
function getNewDate(date,days){
    var d=new Date(date);
    var date= new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
    var year=date.getFullYear()+"";
    var month=date.getMonth()+1+"";
    var d=date.getDate()+"";
    if(month.length==1){
        month="0"+month;
    }
    if(d.length==1){
        d="0"+d;
    }
    return year+month+d;
}