/*放置天翼蓝鹰工单监测代码的js*/


//-------------------------------------------工单监测代码开始--------------------------------------------------------------

IntelligentRoadTest.getCompleteEchartData = function (result , startDay , endDay){
    var optionResult = {};
    var betweenDays = getDayBetweenTwoDate(dealDateString(startDay) , dealDateString(endDay));
    var objResult = []; //对象数组，用于显示echart图的数据
    if(result.length > 0){
        for(var i = betweenDays ; i > 0 ; i-- ){
            var obj = {};
            obj.day = new Date(dealDateString(endDay).getTime() - (i - 1) * 24 * 60 * 60 * 1000).Format("yyyyMMdd");
            obj.recover_avg = null;
            obj.poor_cove_reco_count = null;
            obj.poor_cove_grid_count = null;
            objResult.push(obj);
        }
        for(var k = 0 ; k < objResult.length; k++){
            for(var h = 0 ; h < result.length ; h++){
                if(result[h].day.toString() == objResult[k].day){ //数据中存在这一天的数据
                    objResult[k] = result[h];
                }
            }
        }
    }else{
        optionResult.day = [];
        optionResult.seriesData = [];
        return optionResult;
    }

    var dayList = [];
    var valueList = [];
    for(var h = 0 ; h < objResult.length; h++){
        dayList[h] = dealDateString(objResult[h].day).Format("yyyy-MM-dd").substr(5);
        var seriseDataObj = {};
        seriseDataObj.value = objResult[h].recover_avg;
        seriseDataObj.type = "区域类型";
        seriseDataObj.poor_cove_reco_count = objResult[h].poor_cove_reco_count;
        seriseDataObj.poor_cove_grid_count = objResult[h].poor_cove_grid_count;
        valueList[h] = seriseDataObj;
    }
    optionResult.day = dayList;
    optionResult.seriesData = valueList;
    return optionResult;
}

IntelligentRoadTest.getLineCompleteEchartData = function (result , startDay , endDay){

    var betweenDays = getDayBetweenTwoDate(dealDateString(startDay) , dealDateString(endDay));
    var objResult = []; //对象数组，用于显示echart图的数据
    if(result.length > 0){
        for(var i = betweenDays ; i > 0 ; i-- ){
            var obj = {};
            obj.day = new Date(dealDateString(endDay).getTime() - (i - 1) * 24 * 60 * 60 * 1000).Format("yyyyMMdd");
            obj.poor_cov_length = null;
            objResult.push(obj);
        }
        for(var k = 0 ; k < objResult.length; k++){
            for(var h = 0 ; h < result.length ; h++){
                if(result[h].day.toString() == objResult[k].day){ //数据中存在这一天的数据
                    objResult[k] = result[h];
                }
            }
        }
    }
    var optionResult = {};
    var dayList = [];
    var valueList = [];
    for(var h = 0 ; h < objResult.length; h++){
        dayList[h] = dealDateString(objResult[h].day).Format("yyyy-MM-dd").substr(5);
        valueList[h] = objResult[h].poor_cov_length;
    }
    optionResult.day = dayList;
    optionResult.seriesData = valueList;
    return optionResult;
}


IntelligentRoadTest.getSenseObjectAlarmInfoData = function(alarm_type , esbh_id , day , poor_area_set , zlqy_flag){
    var sqlList = [];
    var dayCondition = "";
    /*if(IntelligentRoadTest.alarm_recover_time == null || IntelligentRoadTest.alarm_recover_time == ''){
        dayCondition = "and day = " + day ;
    }else if( IntelligentRoadTest.alarm_recover_time != null && parseInt(IntelligentRoadTest.alarm_recover_time) < parseInt(day)){ //选择的日期大于工单回复时间
        dayCondition = "order by  day desc limit 1";
    }else{
        dayCondition = "and day = " + day ;
    }*/
    var type = alarm_type;
    if(alarm_type == "天翼蓝鹰高流量商务区" && zlqy_flag != null){
        if(zlqy_flag == 1){
            type = "天翼蓝鹰战狼区域";
        }
    }
    var list = ["IntelligentRoadTestV3_getSenseObjectAlarmInfoData" , "ALARM_TYPE:" + type , "ESBH_ID:" + esbh_id ];
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealSenseObjectAlarmInfoData];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database , [[alarm_type , esbh_id , poor_area_set , zlqy_flag]]);
}


IntelligentRoadTest.dealSenseObjectAlarmInfoData = function IntelligentRoadTest_dealSenseObjectAlarmInfoData(data , params){
    var result = callBackChangeData(data);
    IntelligentRoadTest.alarm_time = null;
    var alarm_dataObj = {};
    if(result.length > 0){
        IntelligentRoadTest.alarm_time = result[0].alarm_time;
        //展示指标，将指标的数值放入所属的vue对象中
        alarm_dataObj.day = result[0].day;
        alarm_dataObj.alarm_time = result[0].alarm_time;
        alarm_dataObj.recover_time = result[0].recover_time;
        alarm_dataObj.poor_cove_grid_count = result[0].poor_cove_grid_count; //弱栅格数
        alarm_dataObj.poor_cove_reco_count = result[0].poor_cove_reco_count; // 弱栅格恢复数
        alarm_dataObj.recover_avg = result[0].recover_avg;
        IntelligentRoadTest.alarm_recover_time = result[0].recover_time; //记录当前的工单恢复时间
        var poor_coverage_set = result[0].poor_coverage_set; //该工单对象的在派单当天的附近弱区集合
        var alarm_type = params[0];
        var esbh_id = params[1];
        var startDay = result[0].alarm_time;
        var endDay = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000).Format("yyyyMMdd");
        if(result[0].recover_time != null && result[0].recover_time != ''){
            endDay = result[0].recover_time;
        }
        if(IntelligentRoadTest.querySenseTrendCondition == null || IntelligentRoadTest.querySenseTrendCondition != alarm_type + "_" + esbh_id){//条件变化或者第一次查询趋势图
            IntelligentRoadTest.getSenseObjectPoorGridTrend(alarm_type , esbh_id , startDay , endDay , params[3]);
        }
        if(IntelligentRoadTest.poorAreaIdList == null){
            IntelligentRoadTest.poorAreaIdList = [];
        }
        var isDashLine = true;
        var poorAreaIdList = [];//弱区id数组
        if(IntelligentRoadTest.day == startDay){
            isDashLine = false;
        }else{
            if(IntelligentRoadTest.isFromAlarmList == null || IntelligentRoadTest.isFromAlarmList == false){
                IntelligentRoadTest.getPoorAreaGisDataByID(esbh_id , startDay);
            }
        }
        if(poor_coverage_set != null && poor_coverage_set != ''){
            poorAreaIdList = IntelligentRoadTest.getPoorAreaIdList(poor_coverage_set);
        }
        IntelligentRoadTest.poorAreaIdList = poorAreaIdList;
        IntelligentRoadTest.queryGisDataByObjectID( IntelligentRoadTest.poorAreaIdList , startDay , isDashLine);
    }
    switch(params[0]){
        case "天翼蓝鹰高校" :
            IntelligentRoadTest.collegeCompleteVM.alarm_dataObj = alarm_dataObj;
            break;
        case "天翼蓝鹰高密度住宅区" :
            IntelligentRoadTest.uptownCompleteVM.alarm_dataObj = alarm_dataObj;
            break;
        case "天翼蓝鹰高流量商务区" :
            IntelligentRoadTest.businessCompleteVM.alarm_dataObj = alarm_dataObj;
            break;
        case "天翼蓝鹰战狼区域" :
            IntelligentRoadTest.warwolfCompleteVM.alarm_dataObj = alarm_dataObj;
            break;
        case "天翼蓝鹰美景" :
            IntelligentRoadTest.sceneryCompleteVM.alarm_dataObj = alarm_dataObj;
            break;
        case "天翼蓝鹰农贸市场" :
            IntelligentRoadTest.marketCompleteVM.alarm_dataObj = alarm_dataObj;
            break;
        case "天翼蓝鹰美食" :
            IntelligentRoadTest.foodCompleteVM.alarm_dataObj = alarm_dataObj;
            break;
        case "天翼蓝鹰场馆" :
            IntelligentRoadTest.siteCompleteVM.alarm_dataObj = alarm_dataObj;
            break;
        case "天翼蓝鹰中小学" :
            IntelligentRoadTest.senseCompleteVM.alarm_dataObj = alarm_dataObj;
            break;
    }
}


IntelligentRoadTest.getSenseObjectPoorGridTrend = function (alarm_type , esbh_id , startDay , endDay , zlqy_flag){
    var type = alarm_type;
    if(alarm_type == "天翼蓝鹰高流量商务区" && zlqy_flag != null){
        if(zlqy_flag == 1){
            type = "天翼蓝鹰战狼区域";
        }
    }
    var sqlList = [];
    var list = ["IntelligentRoadTestV3_getSenseObjectPoorGridTrend" ,"ALARM_TYPE:" + type , "ESBH_ID:" + esbh_id ,
        "STARTDAY:" + startDay , "ENDDAY:" + endDay ];
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealSenseObjectPoorGridTrend];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database , [[alarm_type , startDay , endDay]]);
    IntelligentRoadTest.querySenseTrendCondition = alarm_type + "_" + esbh_id ;
}

IntelligentRoadTest.dealSenseObjectPoorGridTrend = function IntelligentRoadTest_dealSenseObjectPoorGridTrend(data , params){
    var result = callBackChangeData(data);
    if(result.length > 0){
        var isSense = true;
        var divID = "";
        switch(params[0]){
            case "天翼蓝鹰高校" :
                divID = "collegeChart";
                break;
            case "天翼蓝鹰高密度住宅区" :
                divID = "uptownChart";
                break;
            case "天翼蓝鹰高流量商务区" :
                divID = "businessChart";
                break;
            case "天翼蓝鹰战狼区域" :
                divID = "warwolfChart";
                break;
            case "天翼蓝鹰美景" :
                divID = "sceneryChart";
                break;
            case "天翼蓝鹰农贸市场" :
                divID = "marketChart";
                break;
            case "天翼蓝鹰美食" :
                divID = "foodChart";
                break;
            case "天翼蓝鹰场馆" :
                divID = "siteChart";
                break;
            case "天翼蓝鹰中小学" :
                divID = "senseChart";
                break;
        }
        var finalResult = IntelligentRoadTest.getCompleteEchartData(result ,params[1] , params[2]);
        IntelligentRoadTest.showAlarmInfoLine(finalResult , divID , isSense);
    }
}


IntelligentRoadTest.getLineObjectAlarmInfoData = function (alarm_type , line_id , day){
    var sqlList = [];
    var dayCondition = "";
    /*if(IntelligentRoadTest.alarm_recover_time == null || IntelligentRoadTest.alarm_recover_time == ''){
        dayCondition = "and day = " + day ;
    }else if( IntelligentRoadTest.alarm_recover_time != null && parseInt(IntelligentRoadTest.alarm_recover_time) < parseInt(day)){ //选择的日期大于工单回复时间
        dayCondition = "order by  day desc limit 1";
    }else{
        dayCondition = "and day = " + day ;
    }*/
    var list = ["IntelligentRoadTestV3_getLineObjectAlarmInfoData" , "ALARM_TYPE:" + alarm_type , "LINE_ID:" + line_id];
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealLineObjectAlarmInfoData];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database , [[alarm_type , line_id]] );
}

IntelligentRoadTest.dealLineObjectAlarmInfoData = function IntelligentRoadTest_dealLineObjectAlarmInfoData(data , params){
    var result = callBackChangeData(data);
    var alarm_dataObj = {};
    if(result.length > 0){
        //展示指标，将指标的数值放入所属的vue对象中
        alarm_dataObj.day = result[0].day;
        alarm_dataObj.alarm_time = result[0].alarm_time;
        alarm_dataObj.recover_time = result[0].recover_time;
        alarm_dataObj.poor_cove_length = result[0].poor_cov_length;
        IntelligentRoadTest.alarm_recover_time = result[0].recover_time; //记录当前的工单恢复时间
        var alarm_type = params[0];
        var line_id = params[1];
        var startDay = result[0].alarm_time;
        var endDay = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000).Format("yyyyMMdd");
        if(result[0].recover_time != null && result[0].recover_time != ''){
            endDay = result[0].recover_time;
        }
        if(IntelligentRoadTest.queryLineTrendCondition == null || IntelligentRoadTest.queryLineTrendCondition != alarm_type + "_" + line_id){//条件变化或者第一次查询趋势图
            IntelligentRoadTest.getLineObjectPoorLengthTrend(alarm_type , line_id , startDay , endDay);
        }
    }
    switch(params[0]){
        case "天翼蓝鹰高速" :
            IntelligentRoadTest.highwayCompleteVM.alarm_dataObj = alarm_dataObj;
            break;
        case "天翼蓝鹰高铁" :
            IntelligentRoadTest.railCompleteVM.alarm_dataObj = alarm_dataObj;
            break;
        case "天翼蓝鹰市政路" :
            IntelligentRoadTest.cityRoadCompleteVM.alarm_dataObj = alarm_dataObj;
            break;
    }
}


IntelligentRoadTest.getLineObjectPoorLengthTrend = function (alarm_type , line_id , startDay , endDay){
    var sqlList = [];
    var list = ["IntelligentRoadTestV3_getLineObjectPoorLengthTrend" , "ALARM_TYPE:" + alarm_type , "LINE_ID:" + line_id ,
        "STARTDAY:" + startDay , "ENDDAY:" + endDay   ];
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealLineObjectPoorLengthTrend];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database , [[alarm_type , startDay , endDay]]);
    IntelligentRoadTest.queryLineTrendCondition = alarm_type + "_" + line_id ;
}

IntelligentRoadTest.dealLineObjectPoorLengthTrend = function IntelligentRoadTest_dealLineObjectPoorLengthTrend(data , params){
    var result = callBackChangeData(data);
    if(result.length > 0){
        var isSense = false;
        var divID = "";
        switch(params[0]){
            case "天翼蓝鹰高速" :
                divID = "highwayChart";
                break;
            case "天翼蓝鹰高铁" :
                divID = "railChart";
                break;
            case "天翼蓝鹰市政路" :
                divID = "cityRoadChart";
                break;
        }
        var finalResult = IntelligentRoadTest.getLineCompleteEchartData(result ,params[1] , params[2]);
        IntelligentRoadTest.showAlarmInfoLine(finalResult , divID , isSense);
    }
}


//绘制工单监测的折线图方法
IntelligentRoadTest.showAlarmInfoLine = function(objResult , divID , isSense){
    if(IntelligentRoadTest.alaramInfoLineEcharts !=  null){
        IntelligentRoadTest.alaramInfoLineEcharts.dispose();
    }
    IntelligentRoadTest.alaramInfoLineEcharts = echarts.init(document.getElementById(divID));
    var seriesDataName = "";
    var danwei = "";
    if(isSense == true){
        seriesDataName = "弱栅格恢复比";
        danwei = "%";
    }else{
        seriesDataName = "弱路段长度";
        danwei = "米";
    }
    var option = {};
    if(objResult != null){

        option = {
            legend:{
                left:'center',
                top:'2%',
                data:[seriesDataName],
            },
            tooltip: {
                trigger: 'axis',
                axisPointer:{
                    type:'shadow'
                },
                formatter: function (params) {
                    if(params[0].value == null){
                        return params[0].axisValue + "<br/>" + params[0].seriesName + ": -" ;
                    }else{
                        if(params[0].data.type == null){
                            return params[0].axisValue + "<br/>" + params[0].seriesName + ":" + params[0].value + danwei;
                        }else{
                            return params[0].axisValue + "<br/>" + params[0].seriesName + ":" + params[0].value + danwei
                                + "<br/>" + "弱栅格恢复数:" + params[0].data.poor_cove_reco_count + "<br/>" +
                                "弱栅格数:" + params[0].data.poor_cove_grid_count;
                        }
                    }
                }
            },
            grid: { //图表在div的布局控制
                top: '10%',
                left: '3%',
                right: '12%',
                bottom: '15%',
                containLabel: true
            },
            dataZoom : {//实现缩放功能
                type : "slider" ,
                show : true,
                // realtime : true,
                start : 0 ,
                bottom : '1%'

            },
            xAxis: { //X轴样式
                type: 'category',
                boundaryGap: true,
                axisLabel: {
                    /*interval:0,*/
//					rotate:10,
                    align:'center',
                },
                axisLine: {
                    show: true,
                    lineStyle:{
                        color: '#686c78',
                    }
                },
                axisTick:{
                    show:true,
                    alignWithLabel:true,
                },
                data:objResult.day,
            },
            yAxis: { //Y轴样式
                type: 'value',
                name:danwei,
                scale:true,
                position: 'left',
                axisLine: {
                    show: true,
                    lineStyle:{
                        color: '#686c78',
                    },
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show:false,
                    lineStyle: {
                        color: '#EAEEF7',
                    }
                }
            }
            ,
            series: { //图表数据样式
                type: 'line',
                symbolSize: 6,
                name: seriesDataName,
                smooth: true,
                lineStyle: {
                    normal: {
                        color: '#55b7f1',
                        width: 2,
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#55b7f1",
                        borderColor: "#55b7f1",
                    }
                },
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#D5ECFA' // 0% 处的颜色
                            },
                                {
                                    offset: 1,
                                    color: '#FFFFFF' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        }
                    },
                },
                data:objResult.seriesData
            }
        };
    }
    IntelligentRoadTest.alaramInfoLineEcharts.setOption(option);
    IntelligentRoadTest.alaramInfoLineEcharts.resize();
}



IntelligentRoadTest.queryGisDataByObjectID = function (objectIdList , day , isDashLine){
    var sqlList = [];
    if(objectIdList == null || objectIdList.length  ==  0){
        return;
    }
    var list = ["IntelligentRoadTestAnalysisV3_getPoorAreaGisDataByIDList" , "DAY:" + day ,
        "DAY:" + day];
    var objectListStr = "";
    for(var i = 0 ; i < objectIdList.length; i++){
        if(i == 0){
            objectListStr = objectListStr + objectIdList[i];
        }else{
            objectListStr = objectListStr + "," +  objectIdList[i];
        }
    }
    list.push("OBJECTIDLIST:" + objectListStr);
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealGisDataByObjectID];
    var database = [3];
    if(IntelligentRoadTest.poorAreaListCondition == null){
        IntelligentRoadTest.poorAreaListCondition = objectListStr;
    }else{
        if(objectListStr == IntelligentRoadTest.poorAreaListCondition){
            IntelligentRoadTest.dealGisDataByObjectID(IntelligentRoadTest.poorAreaGisList , [isDashLine]);
            return ;
        }else{
            IntelligentRoadTest.poorAreaListCondition = objectListStr;
        }
    }
    progressbarTwo.submitSql(sqlList , funcList , database , [[isDashLine]] );
}

IntelligentRoadTest.dealGisDataByObjectID = function IntelligentRoadTest_dealGisDataByObjectID(data , params){
    if(data != null){
        var result = callBackChangeData(data);
        IntelligentRoadTest.poorAreaGisList = data;
        if(result != null && result.length >0){
            var poorAreaIdList = [];
            var gisDataArr = [];
            for(var i = 0 ; i < result.length; i ++){
                poorAreaIdList[i] = result[i].object_id;
                gisDataArr[i] = result[i].gis_data;
            }
            IntelligentRoadTest.showPoorAreaPolygon( poorAreaIdList , gisDataArr , params[0]);
        }
    }
}

IntelligentRoadTest.showPoorAreaPolygon = function showEsbhPolygonGrid( poorAreaIdList , gisDataArr , isDashLine){
    IntelligentRoadTest.removeEsbhPolyline();
    var lineStyle = "solid";//默认实线
    if(isDashLine == true){
        lineStyle = "dashed";//虚线
    }
    IntelligentRoadTest.esbhPolygon=[];
    //显示多边形
    for(var i=0;i<gisDataArr.length;i++){
        var varr=[];
        var poorAreaId = poorAreaIdList[i];
        var gis_data=gisDataArr[i];
        var sp=gis_data.split('@');
        for(var j=0;j<sp.length;j++){
            var v=sp[j].split(',');
            varr.push(new BMap.Point(v[0],v[1]));
        }
        var polygon = new BMap.Polygon(varr,
            {strokeStyle:lineStyle,strokeColor:"#FF9900", strokeWeight:5, strokeOpacity:0.9,fillOpacity:0.1});  //创建多边形
        polygon.poorAreaId =  poorAreaId;
        polygon.gis_data = gis_data;
        polygon.obj_type = 'poorAreaDashed';
        polygon.addEventListener("click",function (e){
            IntelligentRoadTest.maxlng_maxlat_minlng_minlat="";
            /**
            //修改这个点击事件
            if(isDashLine == false){ //所在的日期是派单当天
                IntelligentRoadTest.isShowNrPoorArea = true; //是否是点击交叠弱区
                var condition = this.poorAreaId + "_" +  IntelligentRoadTest.day;
                if(IntelligentRoadTest.getPoorAreaByIdCahe == condition){
                    IntelligentRoadTest.isShowNrPoorArea = false; //是否是点击交叠弱区
                }
                if(IntelligentRoadTest.isShowNrPoorArea == true){
                    IntelligentRoadTest.getPoorAreaMessageById(this.poorAreaId , IntelligentRoadTest.day,true);
                }
            }else{ //选中的日期不是派单当天
                IntelligentRoadTest.isShowNrPoorArea = true; //是否是点击交叠弱区
                if(IntelligentRoadTest.poorAreaCahe == this.gis_data){
                    IntelligentRoadTest.isShowNrPoorArea = false; //是否是点击交叠弱区
                }
                var poorAreaData = {};
                poorAreaData.gis_data = this.gis_data;
                if(IntelligentRoadTest.isShowNrPoorArea == true){
                    IntelligentRoadTest.savePoorAreaToConcernArea(poorAreaData);
                }
            }*/
            $('.positionClass').find("img").attr("src","../js/IntelligentRoadTest/images/showP.png");
            $('.positionClass').addClass("showBtn");
            /*setTimeout(function(){
                $("#cirTipLeft").show();
                IntelligentRoadTest.resizeInfoWindow();
            },100)*/
        });
        
    //  将多边形注册到图层对象
        var itemData = {
        	obj_type:"poorAreaDashed",
        	pointsString:gis_data,//存放
        	type:2,
        	decide:1,
        	obj_id:poorAreaId,
        	day:IntelligentRoadTest.day,
        	name:'弱区虚框',
        	isDashLine:isDashLine
        };
        IntelligentRoadTest.registeredPolygonToLayer(itemData);
        
        IntelligentRoadTest.esbhPolygon[i]=polygon;
        IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.esbhPolygon[i]);   //增加多边形
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.getPoorAreaIdList
 * @funcdesc 切割字符串。获取附近弱区的ID
 * @param {String} poorAreaSetStr ：附近弱区的字符串
 *
 * @return {Array}
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getPoorAreaIdList = function(poorAreaSetStr){
    var poorAreaIdList = [];
    if(poorAreaSetStr != null){
        var list = poorAreaSetStr.split("@");
        for(var i = 0 ; i < list.length; i++){
            poorAreaIdList[i] = list[i].split(",")[0];
        }
    }
    return poorAreaIdList;
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.getNCCellList
 * @funcdesc 根据邻区字符串切割出邻区列表数据
 * @param {String} ncCellStr：邻区列表的字符串  格式如下：基站号_小区号, FCN_PCI，小区名称、总MR数量、MOD3干扰MR数量、平均RSRP、距离（修改后的格式，20180813庆龙提供）
 *
 * @return {Array}
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getNCCellList = function (ncCellStr){

    var nrCellList = [];
    var noEnodebIdCellIdList = []; //没有基站ID和小区ID的列表
    if(ncCellStr != null && ncCellStr != ""){
        var list = ncCellStr.split("@"); //第一步切割出所有邻区的记录
        for(var i = 0; i < list.length; i++){
        	var obj = {};
        	var array = list[i].split(",");
        	obj.enodebid_cellid = array[0]; //基站_扇区
            obj.pin_pci = array[1];//频段_PCI
            obj.sector_name = array[2];//扇区名称
            obj.mr_count = array[3]; //总mr数
            obj.zhuanti_mr_count = array[4]; //专题mr数
            obj.rsrp_avg = array[5];//rsrp均值
            if(array[6] != null && array[6] != ""){
                obj.distance = parseFloat(array[6]).toFixed(2); //距离
            }else{
                obj.distance = array[6]; //距离
            }
            if(array[7] != null && array[7] != ""){
                // obj.zhanbi = (parseFloat(array[7]) * 100).toFixed(0); //占比
                obj.zhanbi = array[7]; //占比
                /*if(obj.zhanbi < 1){
                    obj.zhanbi = "< 1%";
                }else{
                    obj.zhanbi = obj.zhanbi + "%";
                }*/
            }else{
                obj.zhanbi = "--";
            }
            obj.enodebid = array[0].split("_")[0]; //基站ID
            obj.cellid = array[0].split("_")[1];//扇区ID
            if(obj.enodebid != "" && obj.cellid != ""){ //基站扇区ID不为空的情况下才加上去
                nrCellList.push(obj);
            }else{
                noEnodebIdCellIdList.push(obj);
            }
        }
    }
    nrCellList = nrCellList.concat(noEnodebIdCellIdList); //将没有基站ID和小区ID的数据放在数组后边
    return nrCellList;
}





IntelligentRoadTest.checkWhichSenseToGo = function(){
    if(IntelligentRoadTest.querySenseTrendCondition != null){
        var senseName = null;
        var objectType = IntelligentRoadTest.querySenseTrendCondition.toString().trim().split('_')[0].substring(4); //截取查询弱栅格恢复比的趋势图中的条件，取出其类型
        switch (objectType) {
            case "高校" :
                IntelligentRoadTest.goCollegeCompleteMessage();
                IntelligentRoadTest.showGridWhenBack(IntelligentRoadTest.collegeCompleteVM.collegeData);
                senseName = "college";
                break;
            case "高密度住宅区" :
                IntelligentRoadTest.goUptownCompleteMessage();
                IntelligentRoadTest.showGridWhenBack(IntelligentRoadTest.uptownCompleteVM.uptownData);
                senseName = "uptown";
                break;
            case "高流量商务区" :
                IntelligentRoadTest.goBusinessCompleteMessage();
                IntelligentRoadTest.showGridWhenBack(IntelligentRoadTest.businessCompleteVM.businessData);
                senseName = "business";
                break;
            case "场馆" :
                IntelligentRoadTest.goSiteCompleteMessage();
                IntelligentRoadTest.showGridWhenBack(IntelligentRoadTest.siteCompleteVM.siteData);
                senseName = "site";
                break;
            case "美食" :
                IntelligentRoadTest.goFoodCompleteMessage();
                IntelligentRoadTest.showGridWhenBack(IntelligentRoadTest.foodCompleteVM.foodData);
                senseName = "food";
                break;
            case "美景" :
                IntelligentRoadTest.goSceneryCompleteMessage();
                IntelligentRoadTest.showGridWhenBack(IntelligentRoadTest.sceneryCompleteVM.sceneryData);
                senseName = "scenery";
                break;
            case "战狼区域" :
                IntelligentRoadTest.goWarwolfCompleteMessage();
                IntelligentRoadTest.showGridWhenBack(IntelligentRoadTest.warwolfCompleteVM.warwolfData);
                senseName = "warwolf";
                break;
            case "农贸市场" :
                IntelligentRoadTest.goMarketCompleteMessage();
                IntelligentRoadTest.showGridWhenBack(IntelligentRoadTest.marketCompleteVM.marketData);
                senseName = "market";
                break;
            case "中小学" :
                IntelligentRoadTest.goSenseCompleteMessage();
                IntelligentRoadTest.showGridWhenBack(IntelligentRoadTest.senseCompleteVM.senseData);
                senseName = "school";
                break;
        }
        if(IntelligentRoadTest.isFromAlarmList == null || IntelligentRoadTest.isFromAlarmList == false){
            IntelligentRoadTest.senseName = senseName;
        }else{
            IntelligentRoadTest.senseName = null;
        }
        setTimeout(function(){
            $('.positionClass').find("img").attr("src","../js/IntelligentRoadTest/images/hideP.png");
            $('.positionClass').removeClass("showBtn");
        },500);
    }
}

//执行echart的resize方法将不为null的echart对象进行resize
IntelligentRoadTest.resizeEcharts = function () {
    setTimeout(function(){
        if(IntelligentRoadTest.sevenLineEchart != null){
            IntelligentRoadTest.sevenLineEchart.resize();
        }

        if(IntelligentRoadTest.gridSevenLineEchart != null){
            IntelligentRoadTest.gridSevenLineEchart.resize();
        }

        if(IntelligentRoadTest.gridThrLineEchart != null){
            IntelligentRoadTest.gridThrLineEchart.resize();
        }

        if(IntelligentRoadTest.alaramInfoLineEcharts != null){
            IntelligentRoadTest.alaramInfoLineEcharts.resize();
        }

        if(IntelligentRoadTest.secondEchart != null){
            IntelligentRoadTest.secondEchart.resize();
        }

        if(IntelligentRoadTest.sectorSecondEchart != null){
            IntelligentRoadTest.sectorSecondEchart.resize();
        }

        if(IntelligentRoadTest.gridSecondEchart != null){
            IntelligentRoadTest.gridSecondEchart.resize();
        }

        if(IntelligentRoadTest.sectorCoverCharts != null){
            IntelligentRoadTest.sectorCoverCharts.resize();
        }

        if(IntelligentRoadTest.sectorZhanBiCharts != null){
            IntelligentRoadTest.sectorZhanBiCharts.resize();
        }

    },1500);
    infoHeight();
}

//根据时间和场景ID，场景类型ID以及时间获取该对象在某天的弱区集合
IntelligentRoadTest.getPoorAreaGisDataByID = function (esbh_id ,  day){
    var sqlList = [];
    var list = ["IntelligentRoadTestAnalysisV3_getPoorAreaGisDataByID" , "DAY:" + day ,
        "ESBH_ID:" + esbh_id ];
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealPoorAreaGisDataByID];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database);
}

IntelligentRoadTest.dealPoorAreaGisDataByID = function IntelligentRoadTest_dealPoorAreaGisDataByID(data){
    var result = callBackChangeData(data);
    if(result.length > 0){
        var isDashLine = true;
        var poorAreaIdList = [];//弱区id数组
        isDashLine = true;
        if(result[0].poor_coverage_set != null && result[0].poor_coverage_set != ''){
            poorAreaIdList = IntelligentRoadTest.getPoorAreaIdList(result[0].poor_coverage_set);
        }
        IntelligentRoadTest.poorAreaIdList = poorAreaIdList;
        IntelligentRoadTest.queryGisDataByObjectID( IntelligentRoadTest.poorAreaIdList , IntelligentRoadTest.alarm_time , isDashLine);
    }
}

/**********************************
 * @funcname IntelligentRoadTest.removeEsbhPolyline
 * @funcdesc 清除工单监测功能打出的弱区多边形覆盖物
 * @param

 * @author 林楚佳
 * @create 20180503
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest.removeEsbhPolyline = function(){
    if(IntelligentRoadTest.esbhPolygon != null){
        for(var i = 0 ; i < IntelligentRoadTest.esbhPolygon.length ; i++){
            IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.esbhPolygon[i]);   //删除多边形
            
          //注销
            var itemData = {
            	obj_type:IntelligentRoadTest.esbhPolygon[i].obj_type,
            	pointsString:null,
            	type:2,
            	decide:1,
            	obj_id:IntelligentRoadTest.esbhPolygon[i].poorAreaId,
            	day:IntelligentRoadTest.esbhPolygon[i].day
            };
            IntelligentRoadTest.logOutPolygonToLayer(itemData);
            
        }
        IntelligentRoadTest.esbhPolygon = [];
    }
}


//----------------------------------------工单监测代码结束-------------------------------------------------------------

//---------------------------------未就近接入扇区判断逻辑代码开始---------------------------------------------------

/**********************************
 * @funcname IntelligentRoadTest.checkIfHasSameSector
 * @funcdesc 判断接入扇区和附近扇区是否有交集，也即是判断接入扇区是否就近接入
 * @param {Array} nrSectorArr  {Array} mrSectorArr
 nrSectorArr表示附近扇区的数组 ， mrSectorArr表示接入扇区的数组 特别说明：参数倒换过来并不影响结果
 * @return {boolean}
 * @author 林楚佳
 * @create 20180509
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest.checkIfHasSameSector = function (nrSectorArr , mrSectorArr){

    var flag = false;
    if(nrSectorArr != null && nrSectorArr.length > 0 && mrSectorArr != null && mrSectorArr.length > 0){
        for(var i = 0 ; i < nrSectorArr.length ; i++){
            for(var k = 0 ; k < mrSectorArr.length ; k++){
                if(mrSectorArr[k].enodebid == nrSectorArr[i].enodebid && mrSectorArr[k].cellid == nrSectorArr[i].cellid){
                    flag = true;
                }
            }
        }
    }else{
        flag = true;
    }
    return flag;
}

/*根据所给的单号获取到该对象并将其显示在列表中，相当于筛选出这条数据*/
IntelligentRoadTest.selectAlarmByAlarmId = function (alarm_id){

    IntelligentRoadTest.tempAlarmInfoFliterObj = crossfilter([]);
    IntelligentRoadTest.tempAlarmInfoFliterObj.add(IntelligentRoadTest.alarmInfoResult);
    var alarmInfoFilter = IntelligentRoadTest.tempAlarmInfoFliterObj.dimension(function(d) { return d });

    alarmInfoFilter.filter(function(d){
        if(d.alarm_id == alarm_id ){
            return d;
        }
    });
    var tempData = alarmInfoFilter.top(IntelligentRoadTest.tempAlarmInfoFliterObj.size());//过滤后的结果集
    IntelligentRoadTest.tempAlarmInfoFliterObj.remove();//移除

    IntelligentRoadTest.alarmInfoCurrentResult = tempData;
    IntelligentRoadTest.showAlarmInfoData(IntelligentRoadTest.alarmInfoCurrentResult);
    $("#alarmInfoBack").show();
    /*$("#alarmInfoSort ul li.selected").trigger("click");*/

}
/*工单监测进入弱区之后返回之后重新查询栅格数据*/
IntelligentRoadTest.showGridWhenBack = function (item){
    if(IntelligentRoadTest.isFromAlarmList == true){
        //从工单跳转过来的
        IntelligentRoadTest.getSenseDataByESBHID(IntelligentRoadTest.currentAlarmType , IntelligentRoadTest.currentAlarmEsbhId , IntelligentRoadTest.day , false , false);
        IntelligentRoadTest.poorAreaCahe = null;
        IntelligentRoadTest.getPoorAreaByIdCahe = null; //为了点击返回之后再次点击之后有反应而设置的
        IntelligentRoadTest.isPoorAreaSaveToConcern = null;
    }
    setTimeout(function(){
        $('.positionClass').find("img").attr("src","../js/IntelligentRoadTest/images/showP.png");
        $('.positionClass').addClass("showBtn");
    },800);
}
//---------------------------------未就近接入扇区判断逻辑代码结束---------------------------------------------------

//-----------筛选的方法，用于修改现有的筛选方式，现有的筛选方式是对单个类目进行筛选，也即是单选筛选，按照新需求要将其改成多选------------

/**********************************
 * @funcname nameOfFunction
 * @funcdesc descriptionOfFunction
 * @param {datatype} nameOfParameter (input/output optional)
 descriptionOfParameter
 * @return {datatype}
 * @author nameOfauthor
 * @create dateOfCreation
 * @modifier nameOfModifier
 * @modify dateOfModification
 ***********************************/

/**********************************
 * @funcname IntelligentRoadTest.filterPoorArea
 * @funcdesc 根据所给的数据以及筛选条件对数据过滤后返回
 * @param {Array} result {Array} conditionArr
 Array:表示弱区的数据集（查询回来的所有的数据)
 conditionArr：表示弱区的筛选条件（这个是在用户点击的时候进行设置的，因为需要支持多选）
 数组中的顺序如下： [附近扇区 , 接入扇区 , 处理建议 , 区域类型 , 是否新增]
 后续如有新增则再修改上面的规则即可
 * @return {Object}
 * @author 林楚佳
 * @create 20180514
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest.filterPoorArea = function(result , conditionArr){

    var tempResult = [];//作为一个中间的数据缓存
    //定义对象维度
    var temoFilterObj = crossfilter([]);
    temoFilterObj.add(result);

    var rfgFilter = temoFilterObj.dimension(function(d) { return d }); //附近扇区
    var selectElement = conditionArr[0];
    rfgFilter.filter(function(d){
        if(selectElement=="不限"){
            return d;
        }else if(selectElement=="有告警"){
            if(d.top5_alarm_nums>0){
                return d;
            }
        }else if(selectElement=="无告警"){
            if(d.top5_alarm_nums==0){
                return d;
            }
        }
    });

    tempResult = rfgFilter.top(result.length);
    var temoFilterObj1 = crossfilter(tempResult);
    var rfgFilter1 = temoFilterObj1.dimension(function(d) { return d }); //接入扇区
    selectElement = conditionArr[1];
    rfgFilter1.filter(function(d){

        if(selectElement=="不限"){
            return d;
        }else if(selectElement=="有告警"){
            if(d.alarm_nums>0){
                return d;
            }
        }else if(selectElement=="无告警"){
            if(d.alarm_nums==0){
                return d;
            }
        }

    });

    tempResult = rfgFilter1.top(result.length);
    var temoFilterObj2 = crossfilter(tempResult);
    var rfgFilter2 = temoFilterObj2.dimension(function(d) { return d.do_type }); //处理建议
    selectElement = conditionArr[2];
    if(selectElement == "不限"){
        rfgFilter2.filter();
    }else{
        rfgFilter2.filter(selectElement);
    }

    tempResult = rfgFilter2.top(result.length);
    var temoFilterObj3 = crossfilter(tempResult);
    var rfgFilter3 = temoFilterObj3.dimension(function(d) { return d.belong_area_id }); //区域类型
    selectElement = conditionArr[3];
    if(selectElement == "不限"){
        rfgFilter3.filter();
    }else{
        rfgFilter3.filter(selectElement);
    }

    tempResult = rfgFilter3.top(result.length);
    var temoFilterObj4 = crossfilter(tempResult);
    var rfgFilter4 = temoFilterObj4.dimension(function(d) { return d }); // 是否新增
    selectElement = conditionArr[4];
    rfgFilter4.filter(function (d) {
        if(selectElement=="不限"){
            return d;
        }else if(selectElement=="是"){
            if(d.new_added_flag>0){
                return d;
            }
        }else if(selectElement=="否"){
            if(d.new_added_flag==0){
                return d;
            }
        }
    })
    return rfgFilter4;

}

/**********************************
 * @funcname IntelligentRoadTest.concernAreaFilter
 * @funcdesc 关注区域的筛选方法
 * @param {Array} result {Array} conditionArr
 result : 表示关注区域的总数据集
 conditionArr : 表示关注区域的筛选条件
 * @return {Object}
 * @author 林楚佳
 * @create 20180515
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest.concernAreaFilter = function (result , conditionArr){
    var tempResult = [];//作为一个中间的数据缓存
    //定义对象维度
    var temoFilterObj = crossfilter([]);
    temoFilterObj.add(result);

    var objFilter = temoFilterObj.dimension(function(d) { return d });
    var selectElement = conditionArr[0];
    objFilter.filter(function(d){
        if(selectElement=="不限"){
            return d;
        }else if(selectElement=="300以内"){
            if(d.grid_count<300){
                return d;
            }
        }else if(selectElement=="300-1000"){
            if(d.grid_count>=300&&d.grid_count<=1000){
                return d;
            }
        }else if(selectElement=="1000以上"){
            if(d.grid_count>1000){
                return d;
            }
        }
    });

    tempResult = objFilter.top(result.length);
    var temoFilterObj1 = crossfilter(tempResult);
    var objFilter1 = temoFilterObj1.dimension(function(d) { return d.area_type });
    selectElement = conditionArr[1];
    if(selectElement == "不限"){
        objFilter1.filter();
    }else{
        objFilter1.filter(selectElement);
    }

    tempResult = objFilter1.top(result.length);
    var temoFilterObj2 = crossfilter(tempResult);
    var objFilter2 = temoFilterObj1.dimension(function(d) { return d });
    selectElement = conditionArr[2];
    objFilter2.filter(function(d){

        if(selectElement=="不限"){
            return d;
        }else if(selectElement=="我的共享"&&d.creator == IntelligentRoadTest.concernAreaVM.uname){
            if(d.share_status=="已共享"&&d.creator == IntelligentRoadTest.concernAreaVM.uname){
                return d;
            }
        }else if(selectElement=="审核中"&&d.creator == IntelligentRoadTest.concernAreaVM.uname){
            if(d.share_status=="共享审核中"||d.share_status=="取消共享审核中"){
                return d;
            }
        }else if(selectElement=="共享未通过"){
            if(d.share_status=="共享未通过"){
                return d;
            }
        }else if(selectElement=="共享"){
            if((d.share_status == '已共享' || d.share_status == '取消共享审核中')&&d.creator != IntelligentRoadTest.concernAreaVM.uname){
                return d;
            }
        }
    });
    return objFilter2;
}

/**********************************
 * @funcname IntelligentRoadTest.sectorFilter
 * @funcdesc 扇区的筛选方法
 * @param {Array} result {Array} conditionArr
 result : 表示扇区的总数据集
 conditionArr : 表示扇区的筛选条件
 * @return {Object}
 * @author 林楚佳
 * @create 20180515
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest.sectorFilter = function (result , conditionArr){

    var sectorObj = IntelligentRoadTest.sectorObj;
    var currentSector = sectorObj.name; //获取当前所在的扇区的类型
    var tempResult = [];//作为一个中间的数据缓存
    //定义对象维度
    var temoFilterObj = crossfilter([]);
    temoFilterObj.add(result);

    var objFilter = temoFilterObj.dimension(function(d) { return d.belong_area_id }); //区域类型
    var selectElement = conditionArr[0];
    if(selectElement == "不限"){
        objFilter.filter();
    }else{
        objFilter.filter(selectElement);
    }

    tempResult = objFilter.top(result.length);
    var temoFilterObj1 = crossfilter(tempResult);
    var objFilter1 = temoFilterObj1.dimension(function(d) { return d.cell_state }); //扇区状态
    selectElement = conditionArr[1];
    if(selectElement == "不限"){
        objFilter1.filter();
    }else{
        objFilter1.filter(selectElement);
    }

    tempResult = objFilter1.top(result.length);
    var temoFilterObj2 = crossfilter(tempResult);
    var objFilter2 = temoFilterObj2.dimension(function(d) { return d.bs_vendor }); //设备厂商
    selectElement = conditionArr[2];
    if(selectElement == "不限"){
        objFilter2.filter();
    }else{
        objFilter2.filter(selectElement);
    }

    tempResult = objFilter2.top(result.length);
    var temoFilterObj3 = crossfilter(tempResult);
    var objFilter3 = temoFilterObj3.dimension(function(d) { return d }); //室内外
    selectElement = conditionArr[3];
    objFilter3.filter(function(d){

        if(selectElement=="不限"){
            return d;
        }else if(selectElement=="室内"){
            if(d.is_indoor=="室内"){
                return d;
            }
        }else if(selectElement=="室外"){
            if(d.is_indoor=="室外"){
                return d;
            }
        }else if(selectElement=="其他"){
            if(d.is_indoor!="室内"&&d.is_indoor!="室外"){
                return d;
            }
        }

    });

    tempResult = objFilter3.top(result.length);
    var temoFilterObj4 = crossfilter(tempResult);
    var objFilter4 = temoFilterObj4.dimension(function(d) { return d.band_mapping });  //使用频段
    selectElement = conditionArr[4];
    if(selectElement == "不限"){
        objFilter4.filter();
    }else{
        var band_mapping = 1;
        if(selectElement == "800M"){
            band_mapping = 1;
        }else if(selectElement == "1.8G"){
            band_mapping = 2;
        }else if(selectElement == "2.1G"){
            band_mapping = 3;
        }else if(selectElement == "2.6G"){
            band_mapping = 4;
        }
        objFilter4.filter(band_mapping);
    }


    tempResult = objFilter4.top(result.length);
    var temoFilterObj5 = crossfilter(tempResult);
    var objFilter5 = temoFilterObj5.dimension(function(d) { return d });  //是否新增
    selectElement = conditionArr[5];
    if(selectElement == "不限"){
        objFilter5.filter();
    }else{
        objFilter5.filter(
            function(d){
                if(currentSector == "m3Sector"){ //MOD3干扰扇区
                    if(selectElement == "是"){
                        if(d.m3_is_new == 1){ //筛选出新增的
                            return d;
                        }
                    }else{
                        if(d.m3_is_new != 1){ //不是新增
                            return d;
                        }
                    }
                }else if(currentSector == "olSector"){ //重叠覆盖扇区
                    if(selectElement == "是"){
                        if(d.ol_is_new == 1){ //筛选出新增的
                            return d;
                        }
                    }else{
                        if(d.ol_is_new != 1){ //不是新增
                            return d;
                        }
                    }
                }else if(currentSector == "cbSector"){ //越区覆盖扇区
                    if(selectElement == "是"){
                        if(d.cb_is_new == 1){ //筛选出新增的
                            return d;
                        }
                    }else{
                        if(d.cb_is_new != 1){ //不是新增
                            return d;
                        }
                    }
                }else{ //普通扇区不需要做过滤
                    return d;
                }
            }
        );
    }


    tempResult = objFilter5.top(result.length);
    var temoFilterObj6 = crossfilter(tempResult);
    var objFilter6 = temoFilterObj6.dimension(function(d) { return d });  //MR数量限制条件
    selectElement = conditionArr[6];
    if(selectElement == 0){
        objFilter6.filter();
    }else{
        objFilter6.filter(
            function(d){
                if(currentSector == "m3Sector"){ //MOD3干扰扇区
                    if(d.all_mr_count >= selectElement){
                        return d;
                    }
                }else if(currentSector == "olSector"){ //重叠覆盖扇区
                    if(d.all_mr_count >= selectElement){
                        return d;
                    }
                }else if(currentSector == "cbSector"){ //越区覆盖扇区
                    if(d.agps_mr_count >= selectElement){
                        return d;
                    }
                }else{ //普通扇区不需要做过滤
                    return d;
                }
            }
        );
    }
    return objFilter6;
}

/**********************************
 * @funcname IntelligentRoadTest.alarmInfoFilter
 * @funcdesc 工单的筛选方法
 * @param {Array} result {Array} conditionArr
 result : 表示工单的总数据集
 conditionArr : 表示工单的筛选条件
 * @return {Object}
 * @author 林楚佳
 * @create 20180515
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest.alarmInfoFilter = function (result , conditionArr){
    var tempResult = [];//作为一个中间的数据缓存
    //定义对象维度
    var temoFilterObj = crossfilter([]);
    temoFilterObj.add(result);

    var objFilter = temoFilterObj.dimension(function(d) { return d }); //工单类型
    var selectElement = conditionArr[0];
    objFilter.filter(function(d){

        if(selectElement=="不限"){
            return d;
        }else if(selectElement=="弱区"){
            if(d.alarm_name=="AGPS智能路测弱覆盖区域"){
                return d;
            }
        }else if(selectElement=="高速"){
            if(d.alarm_name=="天翼蓝鹰高速"){
                return d;
            }
        }else if(selectElement=="扇区勘误"){
            if(d.alarm_name=="4G基站扇区基础信息异常"){
                return d;
            }
        }else if(selectElement=="高校"){
            if(d.alarm_name=="天翼蓝鹰高校"){
                return d;
            }
        }else if(selectElement=="场馆"){
            if(d.alarm_name=="天翼蓝鹰场馆"){
                return d;
            }
        }else if(selectElement=="战狼"){
            if(d.alarm_name=="天翼蓝鹰战狼区域"){
                return d;
            }
        }else if(selectElement=="农贸"){
            if(d.alarm_name=="天翼蓝鹰农贸市场"){
                return d;
            }
        }else if(selectElement=="美食"){
            if(d.alarm_name=="天翼蓝鹰美食"){
                return d;
            }
        }else if(selectElement=="美景"){
            if(d.alarm_name=="天翼蓝鹰美景"){
                return d;
            }
        }else if(selectElement=="商务区"){
            if(d.alarm_name=="天翼蓝鹰高流量商务区"){
                return d;
            }
        }else if(selectElement=="住宅区"){
            if(d.alarm_name=="天翼蓝鹰高密度住宅区"){
                return d;
            }
        }else if(selectElement=="中小学"){
            if(d.alarm_name=="天翼蓝鹰中小学"){
                return d;
            }
        }

    });

    tempResult = objFilter.top(result.length);
    var temoFilterObj1 = crossfilter(tempResult);
    var objFilter1 = temoFilterObj1.dimension(function(d) { return d.alarm_level }); //工单等级
    selectElement = conditionArr[1];
    if(selectElement == "不限"){
        objFilter1.filter();
    }else{
        objFilter1.filter(selectElement);
    }

    tempResult = objFilter1.top(result.length);
    var temoFilterObj2 = crossfilter(tempResult);
    var objFilter2 = temoFilterObj2.dimension(function(d) { return d.is_recover }); //是否恢复
    selectElement = conditionArr[2];

    if(selectElement=="不限"){
        objFilter2.filter();
    }else{
        var is_recover = "是";
        if(selectElement=="已恢复"){
            is_recover = "是";
        }else if(selectElement=="未恢复"){
            is_recover = "否";
        }
        objFilter2.filter(is_recover);
    }

    tempResult = objFilter2.top(result.length);
    var temoFilterObj3 = crossfilter(tempResult);
    var objFilter3 = temoFilterObj3.dimension(function(d) { return d.task_status }); //工单状态
    selectElement = conditionArr[3];
    if(selectElement == "不限"){
        objFilter3.filter();
    }else{
        objFilter3.filter(selectElement);
    }

    return objFilter3;
}


/**********************************
 * @funcname IntelligentRoadTest.DTFilter
 * @funcdesc DT的筛选方法
 * @param {Array} result {Array} conditionArr
 result : 表示DT列表的总数据集
 conditionArr : 表示DT列表的筛选条件
 * @return {Object}
 * @author 林楚佳
 * @create 20180515
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest.DTFilter = function (result , conditionArr){
    var tempResult = [];//作为一个中间的数据缓存
    //定义对象维度
    var temoFilterObj = crossfilter([]);
    temoFilterObj.add(result);

    var objFilter = temoFilterObj.dimension(function(d) { return d }); //文件时间
    var selectElement = conditionArr[0];
    objFilter.filter(function(d){
        var reg = new RegExp( '-' , "g" )
        var dtTime = d.dt_time.replace(reg ,"");
        var dtDate = dealDateString(dtTime);
        var today = new Date();
        var chazhi = getDayBetweenTwoDate(today,dtDate)+1;

        if(selectElement=="不限"){
            return d;
        }else if(selectElement=="最近7天"){

            if(chazhi<=7){
                return d;
            }
        }else if(selectElement=="7天以前"){
            if(chazhi>7){
                return d;
            }
        }else if(selectElement=="30天以前"){
            if(chazhi>30){
                return d;
            }
        }

    });

    tempResult = objFilter.top(result.length);
    var temoFilterObj1 = crossfilter(tempResult);
    var objFilter1 = temoFilterObj1.dimension(function(d) { return d }); //上传时间
    selectElement = conditionArr[1];
    objFilter1.filter(function(d){
        var reg = new RegExp( '-' , "g" )
        var dtTime = d.create_time.replace(reg ,"");
        var dtDate = dealDateString(dtTime);
        var today = new Date();
        var chazhi = getDayBetweenTwoDate(today,dtDate)+1;

        if(selectElement=="不限"){
            return d;
        }else if(selectElement=="最近7天"){
            if(chazhi<=7){
                return d;
            }
        }else if(selectElement=="7天以前"){
            if(chazhi>7){
                return d;
            }
        }else if(selectElement=="30天以前"){
            if(chazhi>30){
                return d;
            }
        }

    });

    tempResult = objFilter1.top(result.length);
    var temoFilterObj2 = crossfilter(tempResult);
    var objFilter2 = temoFilterObj1.dimension(function(d) { return d }); //共享状态
    selectElement = conditionArr[2];
    objFilter2.filter(function(d){

        if(selectElement=="不限"){
            return d;
        }else if(selectElement=="我的共享"){
            if(d.share_status=="已共享"&&d.iscandelete == 1){
                return d;
            }
        }else if(selectElement=="审核中"){
            if((d.share_status=="共享审核中"||d.share_status=="取消共享审核中") && d.iscandelete == 1){
                return d;
            }
        }else if(selectElement=="共享未通过"){
            if(d.share_status=="共享未通过"&&d.iscandelete == 1){
                return d;
            }
        }else if(selectElement=="共享"){
            if((d.share_status=="已共享"||d.share_status=="取消共享审核中")&&d.iscandelete == 0){
                return d;
            }
        }

    });
    return objFilter2;
}


/**********************************
 * @funcname IntelligentRoadTest.boneAreaFilter
 * @funcdesc 骨头区域的筛选方法
 * @param {Array} result {Array} conditionArr
 result : 表示骨头区域的总数据集
 conditionArr : 表示骨头区域的筛选条件
 * @return {Object}
 * @author 林楚佳
 * @create 20180515
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest.boneAreaFilter = function (result , conditionArr){
    var tempResult = [];//作为一个中间的数据缓存
    //定义对象维度
    var temoFilterObj = crossfilter([]);
    temoFilterObj.add(result);

    var objFilter = temoFilterObj.dimension(function(d) { return d }); //缓期处理
    var selectElement = conditionArr[0];
    objFilter.filter(function(d){
        if(selectElement=="不限"){
            return d;
        }else if(selectElement=="是"){
            if(d.is_suspend!=null && d.is_suspend!=""){
                return d;
            }
        }else if(selectElement=="否"){
            if(d.is_suspend==null || d.is_suspend==""){
                return d;
            }
        }
    });

    tempResult = objFilter.top(result.length);
    var temoFilterObj1 = crossfilter(tempResult);
    var objFilter1 = temoFilterObj1.dimension(function(d) { return d }); //数据来源
    selectElement = conditionArr[1];
    objFilter1.filter(function(d){
        if(selectElement=="系统创建"){
            if(d.area_src_type==0){
                return d;
            }
        }else if(selectElement=="手工添加"){
            if(d.area_src_type==1){
                return d;
            }
        }else if(selectElement=="不限"){
            return d;
        }
    });


    return objFilter1;
}


/**********************************
 * @funcname IntelligentRoadTest.senseFilter
 * @funcdesc 五高中的区域类型的筛选方法
 * @param {Array} result {Array} conditionArr
 result : 表示列表的总数据集
 conditionArr : 表示列表的筛选条件
 * @return {Object}
 * @author 林楚佳
 * @create 20180515
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest.senseFilter = function (result , conditionArr){
    var tempResult = [];//作为一个中间的数据缓存
    //定义对象维度
    var temoFilterObj = crossfilter([]);
    temoFilterObj.add(result);

    var objFilter = temoFilterObj.dimension(function(d) { return d }); //是否含有弱区
    var selectElement = conditionArr[0];
    objFilter.filter(function(d){
        if(selectElement=="不限"){
            return d;
        }else if(selectElement=="是"){

            if(d.poor_coverage_count>0){
                return d;
            }
        }else if(selectElement=="否"){
            if(d.poor_coverage_count == null || d.poor_coverage_count == '' || d.poor_coverage_count==0){ //没有附近弱区
                return d;
            }
        }
    });

    tempResult = objFilter.top(result.length);
    var temoFilterObj1 = crossfilter(tempResult);
    var objFilter1 = temoFilterObj1.dimension(function(d) { return d }); //是否派单
    selectElement = conditionArr[1];
    objFilter1.filter(function(d){
        if(selectElement=="不限"){
            return d;
        }else if(selectElement=="是"){

            if(d.alarm_id != null && d.alarm_id != ''){
                return d;
            }
        }else if(selectElement=="否"){
            if(d.alarm_id == null || d.alarm_id == ''){
                return d;
            }
        }
    });


    return objFilter1;
}


//-----------筛选的方法结束-----------


//------------------------------------------感知速率30天的趋势图---------------------------------------------

/**********************************
 * @funcname nameOfFunction
 * @funcdesc descriptionOfFunction
 * @param {datatype} nameOfParameter (input/output optional)
 descriptionOfParameter
 * @return {datatype}
 * @author nameOfauthor
 * @create dateOfCreation
 * @modifier nameOfModifier
 * @modify dateOfModification
 ***********************************/
IntelligentRoadTest.queryGanZhi30DayData = function( dayName , tableName , day , divID){

    var sqlList = [];
    var list = [];
    sqlList.push(list);
    var funcList  = [];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database , [divID]);

}


/*显示感知速率的echarts图*/
IntelligentRoadTest.showSecondEchart = function IntelligentRoadTest_showGridThryDayEcharts(result , divID){
    if(IntelligentRoadTest.secondEchart != null){
        IntelligentRoadTest.secondEchart.dispose();
    }
    IntelligentRoadTest.secondEchart = echarts.init(document.getElementById(divID));
    var resultList = IntelligentRoadTest.getSecondEchartData(result);
    var xAxisData = [];
    var upArr = [];
    var dwArr = [];
    // var coverData = [];
    var flag = true;
    if(resultList != null && resultList.length > 0){
        for(var i = 0 ;  i < resultList.length; i++){
            var day = "";
            if(resultList[i].create_time != null){
               day = resultList[i].create_time.toString().substring(5);
            }else{
                day = resultList[i].day.toString().substring(4,6)+"-"+resultList[i].day.toString().substring(6);
            }
            xAxisData[i] = day;
            if(resultList[i].min_userex_upavgrate == null && flag == true){
                flag = false;
                upArr[i] = 0; //上行感知速率
            }else{
                upArr[i] = resultList[i].min_userex_upavgrate; //上行感知速率
            }
            if(resultList[i].min_userex_dwavgrate == null && flag == true){
                flag = false;
                dwArr[i]=0; //下行感知速率
            }else{
                dwArr[i]=resultList[i].min_userex_dwavgrate; //下行感知速率
            }
        }
    }
    var option = {
        legend:{
            left:'center',
            top:'2%',
            data:['上行感知速率','下行感知速率'],
        },
        tooltip: {
            trigger: 'axis',
            axisPointer:{
                type:'shadow'
            },
        },
        grid: { //图表在div的布局控制
            top: '10%',
            left: '3%',
            right: '12%',
            bottom: '15%',
            containLabel: true
        },
        dataZoom : {//实现缩放功能
            type : "slider" ,
            show : true,
            // realtime : true,
            start : 0 ,
            bottom : '1%'

        },
        xAxis: [{ //X轴样式
            type: 'category',
            boundaryGap: true,
            axisLabel: {
                /*interval:0,*/
//					rotate:10,
                align:'center',
            },
            axisLine: {
                show: true,
                lineStyle:{
                    color: '#686c78',
                }
            },
            axisTick:{
                show:true,
                alignWithLabel:true,
            },
            data: xAxisData
        }],
        yAxis: [{ //Y轴样式
            type: 'value',
            name:'Mbps',
            scale:true,
            axisLine: {
                show: true,
                lineStyle:{
                    color: '#686c78',
                },
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show:false,
                lineStyle: {
                    color: '#EAEEF7',
                }
            }
        }
        ],
        series: [
            { //图表数据样式
                type: 'line',
                symbolSize: 6,
                name: "上行感知速率",
                smooth: true,
                lineStyle: {
                    normal: {
                        color: '#55b7f1',
                        width: 2,
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#55b7f1",
                        borderColor: "#55b7f1",
                    }
                },
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#D5ECFA' // 0% 处的颜色
                            },
                                {
                                    offset: 1,
                                    color: '#FFFFFF' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        }
                    },
                },
                data:upArr
            },
            { //图表数据样式
                type: 'line',
                symbolSize: 6,
                name: "下行感知速率",
                smooth: true,
                data:dwArr
            }]
    };
    IntelligentRoadTest.secondEchart.setOption(option);
    IntelligentRoadTest.secondEchart.resize();
    showOrHideInputImage(1);

}

/**********************************
 * @funcname getEchartData
 * @funcdesc 将数据将进行处理并返回处理后的数据
 * @param {Array} result
 result表示需要处理的数据
 * @author 林楚佳
 * @create 20180101
 ***********************************/
IntelligentRoadTest.getSecondEchartData = function (result){
    var objResult = []; //对象数组，用于显示echart图的数据
    if(result.length > 0){
        if(result[0].create_time == null){ //如果数据中是day而不是create_time，先转成create_time
            for(var m = 0 ; m < result.length ; m++){
                result[m].create_time = result[m].day;
            }
        }
        for(var i = 30 ; i > 0 ; i-- ){
            var obj = {};
            if(result[0].create_time.toString().indexOf("-") > -1){
                obj.create_time = new Date(dealDateString(IntelligentRoadTest.day).getTime() - (i - 1) * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
            }else{
                obj.create_time = new Date(dealDateString(IntelligentRoadTest.day).getTime() - (i - 1) * 24 * 60 * 60 * 1000).Format("yyyyMMdd");
            }
            obj.min_userex_upavgrate = 0;
            obj.min_userex_dwavgrate = 0;
            objResult.push(obj);
        }
        for(var k = 0 ; k < objResult.length; k++){
            for(var h = 0 ; h < result.length ; h++){
                if(result[h].create_time.toString() == objResult[k].create_time){ //数据中存在这一天的数据
                    objResult[k] = result[h];
                }
            }
            if(objResult[k].create_time.toString().indexOf("-") < 0){
                objResult[k].create_time = dealDateString(objResult[k].create_time.toString()).Format("yyyy-MM-dd");
            }
        }
        return objResult;
    }else{
        return [];
    }

}



/**********************************
 * @funcname IntelligentRoadTest.showGridKPIEcharts
 * @funcdesc 显示7天的KPI感知速率数据的echarts图
 * @param {Array}  result {String} divID
 * result表示需要展示的数据 ， divID表示echarts图所在的div的id
 * @author 林楚佳
 * @create 20180515
 ***********************************/
IntelligentRoadTest.showGridKPIEcharts = function showGridKPIEcharts(result , divID){
    if(divID == "sectorSecondChart"){
        if(IntelligentRoadTest.sectorSecondEchart != null){
            IntelligentRoadTest.sectorSecondEchart.dispose();
        }
        IntelligentRoadTest.sectorSecondEchart = echarts.init(document.getElementById(divID));
    }else{
        if(IntelligentRoadTest.gridSecondEchart != null){
            IntelligentRoadTest.gridSecondEchart.dispose();
        }
        IntelligentRoadTest.gridSecondEchart = echarts.init(document.getElementById(divID));
    }

    var xAxisData = [];
    var upData = [];
    var dwData = [];
    if(result != null && result.length > 0){
        var tempFilterObj = crossfilter([]);
        tempFilterObj.add(result);
        var tempFilter = tempFilterObj.dimension(function(d) { return d.create_time });
        result = tempFilter.top(7);
        result.reverse();
        for(var i = 0 ;  i < result.length; i++){
            result[i].create_time = new Date(dealDateString(result[i].create_time).getTime()).Format("yyyy-MM-dd");
            var day = result[i].create_time.toString().substring(5);
            xAxisData[i] = day;
            upData[i] = parseFloat(result[i].min_userex_upavgrate).toFixed(2);
            dwData[i] = parseFloat(result[i].min_userex_dwavgrate).toFixed(2);
        }
    }

    var option = {
        legend:{
            left:'center',
            top:'2%',
            data:['上行感知速率','下行感知速率'],
        },
        tooltip: {
            trigger: 'axis',
            axisPointer:{
                type:'shadow'
            },
        },
        grid: { //图表在div的布局控制
            top: '10%',
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        dataZoom : {//实现缩放功能
            type : "slider" ,
            show : true,
            // realtime : true,
            start : 0 ,
            bottom : '1%'

        },
        xAxis: [{ //X轴样式
            type: 'category',
            boundaryGap: true,
            axisLabel: {
                /*interval:0,*/
//					rotate:10,
                align:'center',
            },
            axisLine: {
                show: true,
                lineStyle:{
                    color: '#686c78',
                }
            },
            axisTick:{
                show:true,
                alignWithLabel:true,
            },
            data: xAxisData
        }],
        yAxis: [{ //Y轴样式
            type: 'value',
            name:'Mbps',
            scale:true,
            axisLine: {
                show: true,
                lineStyle:{
                    color: '#686c78',
                },
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show:false,
                lineStyle: {
                    color: '#EAEEF7',
                }
            }
        }
        ],
        series: [
            { //图表数据样式
                type: 'line',
                symbolSize: 6,
                name: "上行感知速率",
                smooth: true,
                lineStyle: {
                    normal: {
                        color: '#55b7f1',
                        width: 2,
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#55b7f1",
                        borderColor: "#55b7f1",
                    }
                },
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#D5ECFA' // 0% 处的颜色
                            },
                                {
                                    offset: 1,
                                    color: '#FFFFFF' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        }
                    },
                },
                data:upData
            },
            { //图表数据样式
                type: 'line',
                symbolSize: 6,
                name: "下行感知速率",
                smooth: true,
                data:dwData
            }]
    };
    if(divID == "sectorSecondChart"){
        IntelligentRoadTest.sectorSecondEchart.setOption(option);
        IntelligentRoadTest.sectorSecondEchart.resize();
    }else{
        IntelligentRoadTest.gridSecondEchart.setOption(option);
        IntelligentRoadTest.gridSecondEchart.resize();
    }
    showOrHideInputImage(1);

}

/**********************************
 * @funcname IntelligentRoadTest.getSectorKPITrendData
 * @funcdesc 根据基站ID和小区ID获取到该扇区的7天KPI感知速率的指标数据
 * @param {Int}  enodebid {Int} cellid
 * enodebid表示基站ID ， cellid表示小区ID
 * @author 林楚佳
 * @create 20180516
 ***********************************/
IntelligentRoadTest.getSectorKPITrendData = function (enodebid , cellid){

    var endDay = IntelligentRoadTest.day;//结束日期为当前选中的日期
    var startDay = new Date(dealDateString(endDay).getTime() - 6 * 24 * 60 * 60 * 1000).Format("yyyyMMdd");
    var sqlList = [];
    var list = ["IntelligentRoadTestAnalysisV3_getSectorKPITrend" , "STARTDAY:" + startDay , "ENDDAY:" + endDay , "ENODEBID:" + enodebid , "CELLID:" + cellid];
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealSectorKPITrendData];
    var database = [3];

    progressbarTwo.submitSql(sqlList , funcList , database);

}

/**********************************
 * @funcname IntelligentRoadTest.dealSectorKPITrendData
 * @funcdesc 处理扇区7天感知速率指标数据的回调函数
 * @param {Object}  data
 * data表示返回的数据 ，需要进一步处理之后才可以比较容易使用
 * @author 林楚佳
 * @create 20180516
 ***********************************/
IntelligentRoadTest.dealSectorKPITrendData = function IntelligentRoadTest_dealSectorKPITrendData(data){
    var result = callBackChangeData(data);
    IntelligentRoadTest.showGridKPIEcharts(result , "sectorSecondChart"); //调用折线图的方法
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.queryMetroTa
 * @funcdesc 根据起止站点的ID查询这两个站点的TA数据
 * @param {Object} metroData
 *metroData : 该地铁站点间对象
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.queryMetroTa = function(metroData){

    var station_id_list = "";
    if(metroData != null ){
        station_id_list = metroData.from_station_id + "," + metroData.to_station_id;
    }
    var sqlList = [];
    var list = ["IntelligentRoadTestAnalysisV2_207_MetroStationTA" , "FROM_STATION_ID_LIST:" + station_id_list ,
        "CITY_ID:" + metroData.city_id , "DAY:" + IntelligentRoadTest.day ];
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealMetroTa];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database , [metroData]);
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealMetroTa
 * @funcdesc 查询地铁站点TA值的回调函数
 * @param {Object} data
 * data:查询返回的数据
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealMetroTa = function IntelligentRoadTest_dealMetroTa(data , params){
    var result = callBackChangeData(data);
    // console.log(result);
    // console.log(params);
    var fromStationArr = [];
    var toStationArr = [];
    if(result.length > 0){
        for(var i = 0; i < result.length; i++){
        	if(result[i].from_station_id == params.from_station_id){ //开始站点的TA值
                fromStationArr.push(result[i]);
            }else if(result[i].from_station_id == params.to_station_id){ //结束站点的TA值
                toStationArr.push(result[i]);
            }
        }
    }
    //将处理好的值传入地铁详情页的VUE对象
    IntelligentRoadTest.metroCompleteVM.toStationTAArr = toStationArr;
    IntelligentRoadTest.metroCompleteVM.fromStationTAArr = fromStationArr;
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.drawTACircle
 * @funcdesc 根据传入的TA值的数组绘制同心圆
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.drawTACircle = function(item , TAArr , type){
    if(type == "start" && item != null){
        IntelligentRoadTest.startTaCircleList = [];
        var point = new BMap.Point(item.from_station_longitude , item.from_station_latitude);
    }else if(type == "end" && item != null){
        IntelligentRoadTest.endTaCircleList = []; //将圆形对象放入列表方便清除
        var point = new BMap.Point(item.to_station_longitude , item.to_station_latitude);
    }
    if(TAArr != null && item != null){
    	for(var i = 0; i < TAArr.length; i++){
    		var radius = (TAArr[i].ta_level + 1 ) * 78;
    		var lineColor = IntelligentRoadTest.getColorStrByRsrp(TAArr[i].rsrp_avg);
    		var circleOption = {
                strokeColor : lineColor, //线条颜色
                strokeWeight : 2, //线条宽度
                strokeOpacity:0, //线条的透明度
                fillColor : '#fff', //填充颜色
                fillOpacity: 0.001 , //填充颜色的透明度
                strokeStyle : 'solid' , //线条的样式，solid或dashed
            }
            var circle = new BMap.Circle(point , radius , circleOption);
    		IntelligentRoadTest.map.addOverlay(circle); //绘制
            if(type == "start"){
                IntelligentRoadTest.startTaCircleList.push(circle); //将圆形对象放入列表方便清除
            }else if(type == "end"){
                IntelligentRoadTest.endTaCircleList.push(circle); //将圆形对象放入列表方便清除
            }

    	}
    }
}



/**
 * ********************************
 * @funcname IntelligentRoadTest.clearTaCircle
 * @funcdesc 将传入的TA的圆形对象从地图上清除掉
 * @param {Array} list
 *list: 存放TA圆形对象的数组
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.clearTaCircle = function(list){
    if(list != null){
        for(var i = 0; i < list.length; i++){
            IntelligentRoadTest.map.removeOverlay(list[i]);//移除覆盖物
        }
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.showTACircle
 * @funcdesc 点击显示TA的按钮触发的事件
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.showTACircle = function IntelligentRoadTest_showTACircle(event,item , TAArr , type){
    if(item != null && TAArr != null && type != null){
        if(IntelligentRoadTest.canvasLayerList == null){ //存放同心圆对象的object
            IntelligentRoadTest.canvasLayerList = {
                fromCircleOption : null,
                toCircleOption : null
            };
        }
        var colorArr = [];

        for(var i = 0; i < TAArr.length; i++){
            var level = IntelligentRoadTest.getRoadRSRPLevel(TAArr[i].rsrp_avg,TAArr[i].counts , true); //这里的counts表示记录数大于3，以便执行的时候通过该方法的小于等于3的判断
            var lineColor = IntelligentRoadTest.getColorStrByLevel(level);
        	colorArr.push(lineColor);
        }
        colorArr.reverse(); //倒置一下，是从外面的圆开始画的
        var lng ;
        var lat;
        if(type == "start"){ //起始站点
            lng = item.from_station_longitude;
            lat = item.from_station_latitude;
            if(IntelligentRoadTest.canvasLayerList.fromCircleOption == null){
                IntelligentRoadTest.canvasLayerList.fromCircleOption = {
                    lng : lng,
                    lat : lat,
                    colorArr : colorArr ,
                    type : type,
                    isShow : true
                };
            }else{
                IntelligentRoadTest.canvasLayerList.fromCircleOption.isShow = true;
            }
        }else{
            lng = item.to_station_longitude;
            lat = item.to_station_latitude;
            if(IntelligentRoadTest.canvasLayerList.toCircleOption == null){
                IntelligentRoadTest.canvasLayerList.toCircleOption = {
                    lng : lng,
                    lat : lat,
                    colorArr : colorArr ,
                    type : type,
                    isShow : true
                };
            }else{
                IntelligentRoadTest.canvasLayerList.toCircleOption.isShow = true;
            }
        }
        IntelligentRoadTest.drawCirCle();
    }
    // IntelligentRoadTest.drawTACircle(item , TAArr , type); //绘制TA圆形
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.drawCirCle
 * @funcdesc 绘制TA圆环的方法
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.drawCirCle = function IntelligentRoadTest_drawCirCle() {
    if (IntelligentRoadTest.canvasLayer == null) {
        IntelligentRoadTest.canvasLayer = new BMap.CanvasLayer({
            update: update,
            paneName : 'mapPane',
            zIndex:-1
        });
    }
    // IntelligentRoadTest.colorArr = colorArr;
    IntelligentRoadTest.startStepClear = 1;


    function update() {
        var context = this.canvas.getContext("2d");
        if (!context) {
            return;
        }
        context.clearRect(0,0,context.canvas.width, context.canvas.height); //清除canvas图层中的东西
        if (IntelligentRoadTest.canvasLayerList != null) {
            IntelligentRoadTest.startStepClear = 1;
            if (IntelligentRoadTest.canvasLayerList.fromCircleOption != null && IntelligentRoadTest.canvasLayerList.fromCircleOption.isShow == true) { //显示起始站点的圆形
                drawCircleByOption(context , IntelligentRoadTest.canvasLayerList.fromCircleOption);
            }
            IntelligentRoadTest.startStepClear = 1;
            if (IntelligentRoadTest.canvasLayerList.toCircleOption != null && IntelligentRoadTest.canvasLayerList.toCircleOption.isShow == true) { //显示结束站点的圆形
                drawCircleByOption(context , IntelligentRoadTest.canvasLayerList.toCircleOption);
            }
        }
        if(IntelligentRoadTest.canvasTaSectorLayer != null){
            if(IntelligentRoadTest.canvasTaSectorLayer.fromSectorOption != null && IntelligentRoadTest.canvasTaSectorLayer.fromSectorOption.isShow == true){
                //绘制饼图
                drawSectorByOption(context , IntelligentRoadTest.canvasTaSectorLayer.fromSectorOption);
            }
            if(IntelligentRoadTest.canvasTaSectorLayer.toSectorOption != null && IntelligentRoadTest.canvasTaSectorLayer.toSectorOption.isShow == true){
                //绘制饼图
                drawSectorByOption(context , IntelligentRoadTest.canvasTaSectorLayer.toSectorOption);
            }
        }
        if(IntelligentRoadTest.highLightTASectorOption != null && IntelligentRoadTest.highLightTASectorOption.isShow == true){
            var option = IntelligentRoadTest.highLightTASectorOption.option;
            var pixelObj = IntelligentRoadTest.highLightTASectorOption.pixelObj;
            var centerPoint = IntelligentRoadTest.highLightTASectorOption.centerPoint;
            var sectorIndex = IntelligentRoadTest.highLightTASectorOption.sectorIndex;
            drawHighLightTASector(context , option , pixelObj , centerPoint , sectorIndex);
        }
        if(IntelligentRoadTest.highLightTACircleOption != null && IntelligentRoadTest.highLightTACircleOption.isShow == true){
            var pixelObj = IntelligentRoadTest.highLightTACircleOption.pixelObj;
            var centerPoint = IntelligentRoadTest.highLightTACircleOption.centerPoint;
            var circleIndex = IntelligentRoadTest.highLightTACircleOption.circleIndex;
            drawHighLightTACircle(context  , pixelObj , centerPoint , circleIndex);
        }
    }
    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.canvasLayer);
    IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.canvasLayer); //将图层显示在地图上

}

/**
 * ********************************
 * @funcname drawCircleByOption
 * @funcdesc 根据配置对象渲染圆环
 * @param {Object} context  canvas的画笔对象
 *         {Object} option   配置对象
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
function drawCircleByOption(context , option){
    var fillColorIndex = 1;
    var lng = option.lng;
    var lat = option.lat;
    var colorArr = option.colorArr;
    var type = option.type;
    //point:当前像素
    var point = new BMap.Point(lng, lat);
    //zoom:当前地图缩放级别
    var zoom = IntelligentRoadTest.map.getZoom();
    //center:当前地图可视范围中心点坐标
    var center = IntelligentRoadTest.map.getCenter();
    //bounds:地图可视区域
    var bound = IntelligentRoadTest.map.getSize();
    var pixelObj = IntelligentRoadTest.map.pointToPixel(point); //返回转换之后的像素对象 属性有x 和 y
    var radiusList = [];
    for(var i = colorArr.length; i > 0 ; i--){
        var lngOffset = IntelligentRoadTest.LngDistince(point , 78 * i  , IntelligentRoadTest.map);
        var lng2 = lng + parseFloat(lngOffset);
        var point2 = new BMap.Point(lng2 , lat);
        var pixelObj2 = IntelligentRoadTest.map.pointToPixel(point2); //返回转换之后的像素对象 属性有x 和 y
        var radius = Math.abs(pixelObj2.x - pixelObj.x);
        radiusList.push(radius);
    }

    context.globalAlpha = IntelligentRoadTest.lineOpacity;
    context.strokeStyle = "white";
    context.strokeWeight = 3;
    // context.strokeWeight = 2;
    //context.lineWidth=1;
    for(var k = 0; k < radiusList.length; k++){
        if(k == 0){
            context.beginPath();
            context.fillStyle=colorArr[fillColorIndex-1];
            context.arc(pixelObj.x,pixelObj.y,radiusList[k],0,360*Math.PI/180); //context.arc(圆心点x坐标,圆心点y坐标,半径,0,360*Math.PI/180);
            context.fill();
            context.stroke();
        }else{
            IntelligentRoadTest.startStepClear=1;//别忘记这一步
            clearArc(pixelObj.x,pixelObj.y,radiusList[k],context , colorArr, fillColorIndex,type);
            fillColorIndex++;

            context.beginPath();
            context.fillStyle=colorArr[fillColorIndex-1];
            context.arc(pixelObj.x,pixelObj.y,radiusList[k],0,360*Math.PI/180);
            context.fill();
            context.stroke();
        }
    }

}

/**
 * ********************************
 * @funcname clearArc
 * @funcdesc 清除同心圆重叠的部分的方法
 * @param  {int} x 圆心像素的x ,{int}y 圆心, {int}radius  圆的半径, {Object} context 画笔对象 ,{Array} colorArr 颜色数组 ,{int} fillColorIndex 标识当前绘制到第几个圆的变量, type
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
function clearArc(x,y,radius , context , colorArr , fillColorIndex , type){//圆心(x,y)，半径radius
    var calcWidth=radius-IntelligentRoadTest.startStepClear;
    var calcHeight=Math.sqrt(radius*radius-calcWidth*calcWidth);

    var posX=x-calcWidth;
    var posY=y-calcHeight;

    var widthX=2*calcWidth;
    var heightY=2*calcHeight;

    if(IntelligentRoadTest.startStepClear<=radius){
        context.clearRect(posX,posY,widthX,heightY);
        IntelligentRoadTest.startStepClear+=1;
        clearArc(x,y,radius, context ,colorArr , fillColorIndex , type);
        if(fillColorIndex<colorArr.length&&IntelligentRoadTest.startStepClear<=radius){
            context.fillStyle=colorArr[fillColorIndex];
            context.fillRect(posX,posY,widthX,heightY);
        }
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.queryMetroSectorTA
 * @funcdesc 查询地铁的站点的所有室分的TA记录
 * @param {Object} metroData ： 地铁详情页的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.queryMetroSectorTA = function(metroData){
    var station_id_list = "";
    if(metroData != null ){
        station_id_list = metroData.from_station_id + "," + metroData.to_station_id;
    }
    var sqlList = [];
    var list = ["IntelligentRoadTestAnalysisV2_208_MetroStationSectorTA" , "FROM_STATION_ID_LIST:" + station_id_list ,
        "CITY_ID:" + metroData.city_id , "DAY:" + IntelligentRoadTest.day ];
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealMetroSectorTA];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database , [metroData]);
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealMetroSectorTA
 * @funcdesc IntelligentRoadTest.queryMetroSectorTA的回调函数 ， 用于处理返回的数据
 * @param {Object} data ： 查询返回的数据   {Array} params ： 查询传递过来的参数
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealMetroSectorTA = function IntelligentRoadTest_dealMetroSectorTA(data , params){
    var result = callBackChangeData(data);
    IntelligentRoadTest.fromSectorTATotalCount = 0; //保存TA总值的变量
    IntelligentRoadTest.toSectorTATotalCount = 0; //保存TA总值的变量
    var fromStationSectorTAArr = [];//保存起始站点的TA记录的数组
    var toStationSectorTAArr = [];//保存结束站点的TA记录的数组
    var fromTemp = {}; //中间变量
    var toTemp = {}; //中间变量
    if(result.length > 0){
        var crossfilterObj = crossfilter([]);
        for(var i = 0; i < result.length; i++){
            result[i].flag = result[i].from_station_id + "_" + result[i].enodeb_id + "_" + result[i].cell_id;
            result[i].enodeb_cell = result[i].enodeb_id + "_" + result[i].cell_id;
            result[i].enodeb_cell_ta = result[i].enodeb_id + "_" + result[i].cell_id + "_" + result[i].ta_level;
            if(result[i].from_station_id == params.from_station_id){
                IntelligentRoadTest.fromSectorTATotalCount += result[i].ta_count;
            }else{
                IntelligentRoadTest.toSectorTATotalCount += result[i].ta_count;
            }
        }
        crossfilterObj.add(result);
        var flagDimension = crossfilterObj.dimension(function(d) { return d.flag });
        var flagArr = flagDimension.group().top(result.length); //这个对象数组的key就是要的数据
        for(var m = 0 ; m < flagArr.length ; m++){ //首先给最终的对象赋值空数组
            var strArr = flagArr[m].key.split("_");
            if(strArr[0] == params.from_station_id){ //属于起始站点的
                fromTemp[strArr[1]+"_"+strArr[2]] = [];
            }else{
                toTemp[strArr[1]+"_"+strArr[2]] = [];
            }
        }
        //最终获取到起止站点每个室分的TA数据
        for(var n = 0; n < result.length; n++){
            if(result[n].from_station_id == params.from_station_id){ //开始站点的TA值
                fromTemp[result[n].enodeb_id + "_" + result[n].cell_id].push(result[n]);
            }else if(result[n].from_station_id == params.to_station_id){ //结束站点的TA值
                toTemp[result[n].enodeb_id + "_" + result[n].cell_id].push(result[n]);
            }
        }
        for(key in fromTemp){
            fromStationSectorTAArr.push(fromTemp[key]);
        }
        for(key in toTemp){
            toStationSectorTAArr.push(toTemp[key]);
        }

        fromStationSectorTAArr = IntelligentRoadTest.sortSectorTAArrByMRCount(fromStationSectorTAArr);
        toStationSectorTAArr = IntelligentRoadTest.sortSectorTAArrByMRCount(toStationSectorTAArr);
        //增加一个排序方法，将这两个数组进行排序
        // console.log(toStationSectorTAArr);
        // console.log(fromStationSectorTAArr);
    }
    //将处理好的值传入地铁详情页的VUE对象
    IntelligentRoadTest.metroCompleteVM.toStationSectorTAArr = toStationSectorTAArr;
    IntelligentRoadTest.metroCompleteVM.fromStationSectorTAArr = fromStationSectorTAArr;
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.sortSectorTAArrByMRCount
 * @funcdesc 根据MR总数量排序TA
 * @param
 *
 * @return {Array}
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.sortSectorTAArrByMRCount = function(array){

    var taCountArr = [];
    var newResultArr = [];
    for(var i = 0; i < array.length; i++){
        var obj = {};
        obj.key = array[i][0].flag;
        obj.value = getSumTa(array[i]) ;
        taCountArr.push(obj);
    }

    taCountArr.sort(function(a,b){
        return parseInt(a.value)-parseInt(b.value);
    });

    for(index in taCountArr){
        for(var k = 0 ; k < array.length; k++){
            if(taCountArr[index].key == array[k][0].flag){
                newResultArr.push(array[k]);
            }
        }
    }
    return newResultArr;
}


/**
 * ********************************
 * @funcname IntelligentRoadTest.showTASector
 * @funcdesc 点击显示室分TA的按钮触发的事件
 * @param  {Object} event ：对象  {Object} item ：地铁站间对象 {Array} TAArr 是一个二维数组，存放每个室分的ta数据   {String} type表示开始还是结束站点
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.showTASector = function(event,item , TAArr , type){
    if(item != null && TAArr != null && type != null) {
        if (IntelligentRoadTest.canvasTaSectorLayer == null) { //存放TA扇区的配置对象
            IntelligentRoadTest.canvasTaSectorLayer = {
                fromSectorOption: null,
                toSectorOption: null
            };
        }
        var lng ;
        var lat;
        var colorArr = [];
        var rangeArr = []; //计算每个室分的所占的角度
        if(type == "start") { //起始站点
            var taArrDataArr = IntelligentRoadTest.metroCompleteVM.fromStationSectorTAArr;
            for(var i = 0; i < taArrDataArr.length; i++){
                colorArr.push(getTaColorArr(taArrDataArr[i]));
            }
            rangeArr = getTaRangeArr(taArrDataArr , 'start');
            lng = item.from_station_longitude;
            lat = item.from_station_latitude;
            /*if(IntelligentRoadTest.canvasTaSectorLayer.fromSectorOption == null){

            }else{
                IntelligentRoadTest.canvasTaSectorLayer.fromSectorOption.isShow = true;
            }*/
            IntelligentRoadTest.canvasTaSectorLayer.fromSectorOption = {
                lng : lng,
                lat : lat,
                colorArr : colorArr , //颜色数组
                rangeArr : rangeArr, //角度数组
                type : type,
                isShow : true
            };
        }else{
            var taArrDataArr = IntelligentRoadTest.metroCompleteVM.toStationSectorTAArr;
            for(var i = 0; i < taArrDataArr.length; i++){
                colorArr.push(getTaColorArr(taArrDataArr[i]));
            }
            rangeArr = getTaRangeArr(taArrDataArr , 'end');
            lng = item.to_station_longitude;
            lat = item.to_station_latitude;
            /*if(IntelligentRoadTest.canvasTaSectorLayer.toSectorOption == null){

            }else{
                IntelligentRoadTest.canvasTaSectorLayer.toSectorOption.isShow = true;
            }*/
            IntelligentRoadTest.canvasTaSectorLayer.toSectorOption = {
                lng : lng,
                lat : lat,
                colorArr : colorArr , //颜色数组
                rangeArr : rangeArr, //角度数组
                type : type,
                isShow : true
            };
        }
        IntelligentRoadTest.drawCirCle();
    }
}

/**
 * ********************************
 * @funcname getTaRangeArr
 * @funcdesc 根据所给的 所有的室分的TA数据来获取到每个室分所占的角度值
 * @param {Array} sectorTaArr ：所有室分的TA数据
 *
 * @return {Array}
 * @author 林楚佳
 * @create
 **********************************
 */
function getTaRangeArr(sectorTaArr , type){
    var rangeArr = [];
    if(sectorTaArr != null){
        for(var i = 0; i < sectorTaArr.length; i++){
            var taTotalCount = getSumTa(sectorTaArr[i]);
            var range;
            if(type == "start"){
                range = taTotalCount/IntelligentRoadTest.fromSectorTATotalCount * Math.PI * 2; //得出占有多少角度
            }else{
                range = taTotalCount/IntelligentRoadTest.toSectorTATotalCount * Math.PI * 2; //得出占有多少角度
            }
            rangeArr.push(range);
        }
    }
    return rangeArr;
}

/**
 * ********************************
 * @funcname getSumTa
 * @funcdesc 获取所给的某个室分的TA的总TA值
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
function getSumTa(TAArr){
    var sumTA = 0;
    if(TAArr != null){
        for(var i = 0; i < TAArr.length; i++){
        	sumTA += TAArr[i].ta_count;
        }
    }
    return sumTA;
}

/**
 * ********************************
 * @funcname drawSectorByOption
 * @funcdesc 根据配置绘制扇形
 * @param {Object} context : 画笔对象  {Object} option ： 扇形的一些参数
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
function drawSectorByOption(context , option){
    context.globalAlpha = IntelligentRoadTest.lineOpacity;
    var fillColorIndex = 0;
    var lng = option.lng;
    var lat = option.lat;

    var type = option.type;
    //point:当前像素
    var point = new BMap.Point(lng, lat);
    //zoom:当前地图缩放级别
    var zoom = IntelligentRoadTest.map.getZoom();
    //center:当前地图可视范围中心点坐标
    var center = IntelligentRoadTest.map.getCenter();
    //bounds:地图可视区域
    var bound = IntelligentRoadTest.map.getSize();
    var pixelObj = IntelligentRoadTest.map.pointToPixel(point); //返回转换之后的像素对象 属性有x 和 y
    var radiusList = [];

    var rangeArr = option.rangeArr; //这个数组有多少个元素就表示这个站点有多少个扇形环
    var startRange = -0.5 * Math.PI; //开始角度
    var endRange = -0.5 * Math.PI; //结束角度
    var currentEndRange = 0; //累计使用的角度，方便计算下一次的开始角度
    for(var m = 0 ; m < rangeArr.length; m++){
        var fillColorIndex = 0;
        if(m == 0){
            startRange = -0.5 * Math.PI;
            endRange = -0.5 * Math.PI + rangeArr[m] ;
            currentEndRange = endRange; //当前最大的角度等于endRange
        }else{
            startRange = currentEndRange; //下一个的开始角度是上一个的结束角度
            endRange = currentEndRange + rangeArr[m]; //结束角度等于开始角度再加上所占角度
            currentEndRange =endRange; //当前最大的角度等于endRange
        }
        var colorArr = option.colorArr[m];
        for(var i = colorArr.length; i > 0 ; i--){
            var lngOffset = IntelligentRoadTest.LngDistince(point , 78 * i  , IntelligentRoadTest.map);
            var lngOffsetNextSmallCircle = IntelligentRoadTest.LngDistince(point , 78 * (i-1)  , IntelligentRoadTest.map);
            var lng2 = lng + parseFloat(lngOffset);
            var lngNextSmallCircle = lng + parseFloat(lngOffsetNextSmallCircle);
            var point2 = new BMap.Point(lng2 , lat);
            var nextSmallCirclePoint = new BMap.Point(lngNextSmallCircle,lat);
            var pixelObj2 = IntelligentRoadTest.map.pointToPixel(point2); //返回转换之后的像素对象 属性有x 和 y
            var nextSmallCirclePixel = IntelligentRoadTest.map.pointToPixel(nextSmallCirclePoint);
            var radius = Math.abs(pixelObj2.x - pixelObj.x);
            var nextSmallCircleRadius = Math.abs(nextSmallCirclePixel.x - pixelObj.x);
            //获取到半径
            //绘制扇形
            drawArc(context,pixelObj.x,pixelObj.y,radius,startRange,endRange,colorArr[fillColorIndex],0.4,nextSmallCircleRadius);
            fillColorIndex++;
            /**
            if(i == colorArr.length){ //绘制第一个
                drawArc(context,pixelObj.x,pixelObj.y,radius,startRange,endRange,colorArr[fillColorIndex],0.4,nextSmallCircleRadius);
                fillColorIndex++;
            }else{ //之后的需要在绘制前加上一层白色不透明的遮罩
                //drawArc(context,pixelObj.x,pixelObj.y,radius,startRange,endRange,'white',0.4);
                drawArc(context,pixelObj.x,pixelObj.y,radius,startRange,endRange,colorArr[fillColorIndex],0.4);
                fillColorIndex++;
            }*/
        }
    }
}

/**
 * ********************************
 * @funcname getTaColorArr
 * @funcdesc 根据TA的值获取不同的颜色，最终返回一个数组
 * @param {Array} TAArr ： TA的数组
 *
 * @return {Array}
 * @author 林楚佳
 * @create
 **********************************
 */
function getTaColorArr(TAArr){
    var colorArr = [];
    for(var i = 0; i < TAArr.length; i++){
        var level = IntelligentRoadTest.getRoadRSRPLevel(TAArr[i].rsrp_avg,TAArr[i].ta_count , true); //这里的4表示记录数大于3，以便执行的时候通过该方法的小于等于3的判断
        var lineColor = IntelligentRoadTest.getColorStrByLevel(level);
        colorArr.push(lineColor);
    }
    colorArr.reverse();
    return colorArr;
}

/**
 * ********************************
 * @funcname drawArc
 * @funcdesc 根据传入的参数绘制圆形或者扇形
 * @param
 context:canvas画笔对象
 cx:圆心x值
 cy:圆心y值
 radius:圆的半径
 stAngle:开始角度
 endAngle:结束角度
 color:填充颜色
 opacity:透明度
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
function drawArc(context,cx,cy,radius,stAngle,endAngle,color,opacity,smallCircleRadius){
    context.strokeStyle = "white";
    context.strokeWeight = 4;
    context.beginPath();
    context.globalAlpha = IntelligentRoadTest.lineOpacity; //根据图层配置的透明度设置
    context.fillStyle = color;
    context.arc(cx,cy,radius,stAngle,endAngle);
    context.lineTo(cx,cy);
    context.arc(cx,cy,smallCircleRadius,stAngle,endAngle);
    context.lineTo(cx,cy);
    context.fill("evenodd");
    context.closePath();
    context.globalAlpha = 1; //线段不需要透明度，如果设置透明度的话比较难看出来每个扇形的分隔
    context.stroke();
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.clearAllCircle
 * @funcdesc 清除圆环，根据属性进行清除
 * @param {String}  type  ： 如果为null，则表示要清除两个圆环，并将配置对象设置为null
 * 如有不是null，则设置配置对象的isShow属性让渲染的方法判断是否渲染该圆环
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.clearAllCircle = function IntelligentRoadTest_clearAllCircle(type , otherType){

    if(IntelligentRoadTest.highLightTACircleOption != null){
        IntelligentRoadTest.highLightTACircleOption.isShow = false;
    }
    if(IntelligentRoadTest.highLightTASectorOption != null){
        IntelligentRoadTest.highLightTASectorOption.isShow = false;
    }
    if(type == null){
        if(IntelligentRoadTest.canvasLayer != null ){
            IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.canvasLayer);
        }
        IntelligentRoadTest.canvasLayerList = null; //置空
        IntelligentRoadTest.canvasTaSectorLayer = null;//置空
        return ;
    }else{
        if(IntelligentRoadTest.canvasLayerList != null){
            if(type == "start" && otherType == "circleTA"){ //起始站点综合TA圆环
                IntelligentRoadTest.canvasLayerList.fromCircleOption.isShow = false; //设置为不显示
            }else if(type == "end" && otherType == "circleTA"){ //结束站点综合TA圆环
                IntelligentRoadTest.canvasLayerList.toCircleOption.isShow = false; //设置为不显示
            }
        }

        if(IntelligentRoadTest.canvasTaSectorLayer != null){
            if(type == "start" && otherType == "sectorTA"){ //起始站点综合TA圆环
                IntelligentRoadTest.canvasTaSectorLayer.fromSectorOption.isShow = false; //设置为不显示
            }else if(type == "end" && otherType == "sectorTA"){ //结束站点综合TA圆环
                IntelligentRoadTest.canvasTaSectorLayer.toSectorOption.isShow = false; //设置为不显示
            }
        }

        if(( IntelligentRoadTest.canvasLayerList == null || IntelligentRoadTest.canvasLayerList.fromCircleOption == null || IntelligentRoadTest.canvasLayerList.fromCircleOption.isShow == false )
            && (IntelligentRoadTest.canvasLayerList == null || IntelligentRoadTest.canvasLayerList.toCircleOption == null || IntelligentRoadTest.canvasLayerList.toCircleOption.isShow == false)
            && (IntelligentRoadTest.canvasTaSectorLayer == null || IntelligentRoadTest.canvasTaSectorLayer.fromSectorOption == null || IntelligentRoadTest.canvasTaSectorLayer.fromSectorOption.isShow == false)
            && (IntelligentRoadTest.canvasTaSectorLayer == null || IntelligentRoadTest.canvasTaSectorLayer.toSectorOption == null || IntelligentRoadTest.canvasTaSectorLayer.toSectorOption.isShow == false)
        ){
            //四个都不显示
            IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.canvasLayer);
        }else{
            IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.canvasLayer);
            IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.canvasLayer); //将图层显示在地图上
        }
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.checkIfShowTaSectorMessage
 * @funcdesc 点击地图的时候判断是否需要显示TA的信息
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.checkIfShowTaSectorMessage = function(){

    var flag = false;
    //1.判断地图上是否显示TA扇形区域
    if(IntelligentRoadTest.canvasLayer != null ){ //以下两个条件满足一个则表示地图上拥有TA扇形
        if(IntelligentRoadTest.canvasTaSectorLayer != null && IntelligentRoadTest.canvasTaSectorLayer.fromSectorOption != null &&
            IntelligentRoadTest.canvasTaSectorLayer.fromSectorOption.isShow == true){ //显示TA扇形区域
            flag = true;
        }
        if(IntelligentRoadTest.canvasTaSectorLayer != null && IntelligentRoadTest.canvasTaSectorLayer.toSectorOption != null &&
            IntelligentRoadTest.canvasTaSectorLayer.toSectorOption.isShow == true){ //显示TA扇形区域
            flag = true;
        }

        if(IntelligentRoadTest.canvasLayerList != null && IntelligentRoadTest.canvasLayerList.fromCircleOption != null &&
            IntelligentRoadTest.canvasLayerList.fromCircleOption.isShow == true){ //显示圆形区域
            flag = true;
        }
        if(IntelligentRoadTest.canvasLayerList != null && IntelligentRoadTest.canvasLayerList.toCircleOption != null &&
            IntelligentRoadTest.canvasLayerList.toCircleOption.isShow == true){ //显示圆形区域
            flag = true;
        }
    }
    return flag;
}
/**
 * ********************************
 * @funcname  IntelligentRoadTest.checkInWhichTASector
 * @funcdesc  判断当前点击的点位于哪个Ta扇形内
 * @param {Object} e 鼠标 对象
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.checkInWhichTASector = function(e){

    var flag = false;
    if(IntelligentRoadTest.canvasTaSectorLayer != null && IntelligentRoadTest.canvasTaSectorLayer.fromSectorOption != null &&
        IntelligentRoadTest.canvasTaSectorLayer.fromSectorOption.isShow == true){ //显示TA扇形区域
        flag = true;
    }

    if(IntelligentRoadTest.canvasTaSectorLayer != null && IntelligentRoadTest.canvasTaSectorLayer.toSectorOption != null &&
        IntelligentRoadTest.canvasTaSectorLayer.toSectorOption.isShow == true){ //显示TA扇形区域
        flag = true;
    }

    if(flag == false){
        return ;
    }
    // IntelligentRoadTest.map.pointToPixel 百度点转像素点
    //IntelligentRoadTest.map.getDistance(start: Point, end: Point);返回两个点之间的距离，单位米   TA扇形的最大距离是4*78米的距离
    var metroData = IntelligentRoadTest.metroCompleteVM.metroData;
    var fromCenterPoint = new BMap.Point(metroData.from_station_longitude , metroData.from_station_latitude); //起始站点的中心点坐标
    var toCenterPoint = new BMap.Point(metroData.to_station_longitude , metroData.to_station_latitude); //结束站点的中心点坐标
    var fromCenterPixel = IntelligentRoadTest.map.pointToPixel(fromCenterPoint); //起始站点的像素点对象
    var toCenterPixel = IntelligentRoadTest.map.pointToPixel(toCenterPoint); //结束站点的像素点对象
    var clickPoint = e.point; //点击的位置的百度点对象
    var clickPixel = e.pixel; //点击的位置的像素点对象

    var distance1 = IntelligentRoadTest.map.getDistance(fromCenterPoint , clickPoint); //开始站点和点击点的距离
    var distance2 = IntelligentRoadTest.map.getDistance(toCenterPoint , clickPoint); //开始站点和点击点的距离
    if(distance1 > 4 * 78 && distance2 > 4 * 78){ //点击的位置没有落在任何一个扇形区域
        if(IntelligentRoadTest.highLightTASectorOption != null && IntelligentRoadTest.highLightTASectorOption.isShow == true){
            IntelligentRoadTest.highLightTASectorOption.isShow = false;
            IntelligentRoadTest.drawCirCle(); //绘制
        }

        return;
    }

    var distanceTool = new measureDistance(IntelligentRoadTest.map);
    if(distance1 <= 4 * 78){ //点击的位置位于起始站点的TA扇形内
        var taIndex1 = Math.floor(distance1/78); //获取到点击的是哪个TA值的扇形
        var range = distanceTool.calculationAngle(fromCenterPixel , clickPixel )/180 * Math.PI; //计算出点击点圆心的连线和正北方向的夹角 以n*Math.PI表示
        if(IntelligentRoadTest.canvasTaSectorLayer.fromSectorOption != null && IntelligentRoadTest.canvasTaSectorLayer.fromSectorOption.isShow == true){
            var rangeArr = IntelligentRoadTest.canvasTaSectorLayer.fromSectorOption.rangeArr;
            var sectorOptionObj = IntelligentRoadTest.checkRangeIndex(range , rangeArr); //获取到扇形的一些配置属性，用于绘制高亮边框
            IntelligentRoadTest.highLightTASectorOption = {
                option : sectorOptionObj,
                pixelObj : fromCenterPixel,
                centerPoint : fromCenterPoint,
                isShow : true,
                sectorIndex : taIndex1
            };
            var sectorTaList = IntelligentRoadTest.metroCompleteVM.fromStationSectorTAArr[sectorOptionObj.index];
            var sector = sectorTaList[taIndex1]; //获取到点击的扇形数据
            var taLevel = "";
            if(taIndex1 < 3){
                taLevel = "=" + sector.ta_level;
            }else{
                taLevel = "≥" + sector.ta_level;
            }
            var objectArr = [{key:"基站扇区编号" , val: sector.enodeb_id + "_" + sector.cell_id},{key:"TA级别" , val: taLevel},
                {key:"MR记录数" , val: sector.ta_count},{key:"rsrp均值" , val: sector.rsrp_avg}];
            IntelligentRoadTest.openInfoWindowTwo(clickPoint.lng , clickPoint.lat , objectArr);
            IntelligentRoadTest.drawCirCle(); //绘制
        }
    }

    if(distance2 <= 4 * 78){ //点击的位置位于起始站点的TA扇形内
        var taIndex2 = Math.floor(distance2/78); //获取到点击的是哪个TA值的扇形
        var range = distanceTool.calculationAngle(toCenterPixel , clickPixel )/180 * Math.PI; //计算出点击点圆心的连线和正北方向的夹角 以n*Math.PI表示
        if(IntelligentRoadTest.canvasTaSectorLayer.toSectorOption != null && IntelligentRoadTest.canvasTaSectorLayer.toSectorOption.isShow == true){
            var rangeArr = IntelligentRoadTest.canvasTaSectorLayer.toSectorOption.rangeArr;
            var sectorOptionObj = IntelligentRoadTest.checkRangeIndex(range , rangeArr); //获取到扇形的一些配置属性，用于绘制高亮边框
            IntelligentRoadTest.highLightTASectorOption = {
                option : sectorOptionObj,
                pixelObj : toCenterPixel,
                centerPoint : toCenterPoint,
                isShow : true,
                sectorIndex : taIndex2
            };
            var sectorTaList = IntelligentRoadTest.metroCompleteVM.toStationSectorTAArr[sectorOptionObj.index];
            var sector = sectorTaList[taIndex2]; //获取到点击的扇形数据
            var taLevel = "";
            if(taIndex2 < 3){
                taLevel = "=" + sector.ta_level;
            }else{
                taLevel = "≥" + sector.ta_level;
            }
            var objectArr = [{key:"基站扇区编号" , val: sector.enodeb_id + "_" + sector.cell_id},{key:"TA级别" , val: taLevel},
                {key:"MR记录数" , val: sector.ta_count},{key:"rsrp均值" , val: sector.rsrp_avg}];
            IntelligentRoadTest.openInfoWindowTwo(clickPoint.lng , clickPoint.lat , objectArr);
            IntelligentRoadTest.drawCirCle(); //绘制
        }
    }

}


/**
 * ********************************
 * @funcname  IntelligentRoadTest.checkInWhichTACircle
 * @funcdesc  判断当前点击的点位于哪个Ta圆形内
 * @param {Object} e 鼠标 对象
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.checkInWhichTACircle = function(e){
    var flag = false;
    if(IntelligentRoadTest.canvasLayerList != null && IntelligentRoadTest.canvasLayerList.fromCircleOption != null &&
        IntelligentRoadTest.canvasLayerList.fromCircleOption.isShow == true){ //显示圆形区域
        flag = true;
    }
    if(IntelligentRoadTest.canvasLayerList != null && IntelligentRoadTest.canvasLayerList.toCircleOption != null &&
        IntelligentRoadTest.canvasLayerList.toCircleOption.isShow == true){ //显示圆形区域
        flag = true;
    }

    if(flag == false){
        return ;
    }
    // IntelligentRoadTest.map.pointToPixel 百度点转像素点
    //IntelligentRoadTest.map.getDistance(start: Point, end: Point);返回两个点之间的距离，单位米   TA扇形的最大距离是4*78米的距离
    var metroData = IntelligentRoadTest.metroCompleteVM.metroData;
    var fromCenterPoint = new BMap.Point(metroData.from_station_longitude , metroData.from_station_latitude); //起始站点的中心点坐标
    var toCenterPoint = new BMap.Point(metroData.to_station_longitude , metroData.to_station_latitude); //结束站点的中心点坐标
    var fromCenterPixel = IntelligentRoadTest.map.pointToPixel(fromCenterPoint); //起始站点的像素点对象
    var toCenterPixel = IntelligentRoadTest.map.pointToPixel(toCenterPoint); //结束站点的像素点对象
    var clickPoint = e.point; //点击的位置的百度点对象
    var clickPixel = e.pixel; //点击的位置的像素点对象

    var distance1 = IntelligentRoadTest.map.getDistance(fromCenterPoint , clickPoint); //开始站点和点击点的距离
    var distance2 = IntelligentRoadTest.map.getDistance(toCenterPoint , clickPoint); //开始站点和点击点的距离
    if(distance1 > 4 * 78 && distance2 > 4 * 78){ //点击的位置没有落在任何一个扇形区域
        if(IntelligentRoadTest.highLightTACircleOption != null && IntelligentRoadTest.highLightTACircleOption.isShow == true){
            IntelligentRoadTest.highLightTACircleOption.isShow = false;
            IntelligentRoadTest.drawCirCle(); //绘制
        }

        return;
    }

    var distanceTool = new measureDistance(IntelligentRoadTest.map);
    if(distance1 <= 4 * 78){ //点击的位置位于起始站点的TA扇形内
        if(IntelligentRoadTest.canvasLayerList.fromCircleOption != null && IntelligentRoadTest.canvasLayerList.fromCircleOption.isShow == true){
            var taIndex1 = Math.floor(distance1/78); //获取到点击的是哪个TA值的圆形
            IntelligentRoadTest.highLightTACircleOption = {
                pixelObj : fromCenterPixel,
                centerPoint : fromCenterPoint,
                isShow : true,
                circleIndex : taIndex1
            };
            var circle = IntelligentRoadTest.metroCompleteVM.fromStationTAArr[taIndex1];//获取到点击的扇形数据
            var taLevel = "";
            if(taIndex1 < 3){
                taLevel = "=" + circle.ta_level;
            }else{
                taLevel = "≥" + circle.ta_level;
            }
            var objectArr = [{key:"TA" , val: taLevel },{key:"RSRP均值" , val: circle.rsrp_avg},
                {key:"全量MR记录数" , val: circle.counts}];
            IntelligentRoadTest.openInfoWindowTwo(clickPoint.lng , clickPoint.lat , objectArr);
            IntelligentRoadTest.drawCirCle(); //绘制
        }
    }

    if(distance2 <= 4 * 78){ //点击的位置位于起始站点的TA扇形内
        if(IntelligentRoadTest.canvasLayerList.toCircleOption != null && IntelligentRoadTest.canvasLayerList.toCircleOption.isShow == true){
            var taIndex2 = Math.floor(distance2/78); //获取到点击的是哪个TA值的扇形
            IntelligentRoadTest.highLightTACircleOption = {
                pixelObj : toCenterPixel,
                centerPoint : toCenterPoint,
                isShow : true,
                circleIndex : taIndex2
            };
            var circle = IntelligentRoadTest.metroCompleteVM.toStationTAArr[taIndex2];
            var taLevel = "";
            if(taIndex2 < 3){
                taLevel = "=" + circle.ta_level;
            }else{
                taLevel = "≥" + circle.ta_level;
            }
            var objectArr = [{key:"TA" , val: taLevel },{key:"RSRP均值" , val: circle.rsrp_avg},
                {key:"全量MR记录数" , val: circle.counts}];
            IntelligentRoadTest.openInfoWindowTwo(clickPoint.lng , clickPoint.lat , objectArr);
            IntelligentRoadTest.drawCirCle(); //绘制
        }
    }

}

/**
 * ********************************
 * @funcname IntelligentRoadTest.checkRangeIndex
 * @funcdesc 判断点击的位置属于哪一个TA中的哪一个扇形区域的
 * @param {float} range 点击的位置与圆心的连线和正北方向的夹角角度
 *         {Array} 该站点的TA扇形的角度数组
 * @return {Object}
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.checkRangeIndex = function(range , rangeArr){
    var index = 0;
    var currentRange = 0;
    for(var i = 0; i < rangeArr.length; i++){
    	if(i == 0){
    	    if(range <= rangeArr[i]){ //位于第一个扇形
                index = 0 ;
                break;
            }else{
                currentRange += rangeArr[i];
            }
        }else{
            if(range > currentRange && range <= currentRange + rangeArr[i]){
                index = i;
                break;
            }else{
                currentRange += rangeArr[i];
            }
        }
    }
    var obj = {
        index : index, //所属的位置
        currentRange : currentRange, //扇形开始角度（从哪个角度开始画）
        sectorRange : rangeArr[index] //扇形的角度 （画多大的角度）
    };
    return obj;
}

/**
 * ********************************
 * @funcname drawHighLightTASector
 * @funcdesc 绘制高亮的TA扇形
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
function drawHighLightTASector(context , option , pixelObj , centerPoint , sectorIndex){
    var index = sectorIndex + 1;
    var lng = centerPoint.lng;
    var lat = centerPoint.lat;
    var point = new BMap.Point(lng, lat);
    //zoom:当前地图缩放级别
    var zoom = IntelligentRoadTest.map.getZoom();
    //center:当前地图可视范围中心点坐标
    var center = IntelligentRoadTest.map.getCenter();
    //bounds:地图可视区域
    var bound = IntelligentRoadTest.map.getSize();
    pixelObj = IntelligentRoadTest.map.pointToPixel(point); //返回转换之后的像素对象 属性有x 和 y
    var lngOffset = IntelligentRoadTest.LngDistince(centerPoint , 78 * index  , IntelligentRoadTest.map);
    var lng2 = lng + parseFloat(lngOffset);
    var point2 = new BMap.Point(lng2 , lat);
    var pixelObj2 = IntelligentRoadTest.map.pointToPixel(point2); //返回转换之后的像素对象 属性有x 和 y
    var radius = Math.abs(pixelObj2.x - pixelObj.x);
    var stAngle = option.currentRange - 0.5 * Math.PI;
    var endAngle = option.currentRange + option.sectorRange - 0.5 * Math.PI;
    if(index == 1){ //最里面的那个肯定是扇形
        context.strokeStyle = "#9ffb13";
        context.lineWidth  = 6;
        context.beginPath();
        context.arc(pixelObj.x,pixelObj.y,radius,stAngle,endAngle);
        context.lineTo(pixelObj.x,pixelObj.y);
        context.closePath();
        context.globalAlpha = 1; //线段不需要透明度，如果设置透明度的话比较难看出来每个扇形的分隔
        context.stroke();
        context.lineWidth  = 1;
    }else{
        var lineStartAngle = (option.currentRange / Math.PI) * 180;
        var lineEndAngle = (option.currentRange + option.sectorRange) / Math.PI  * 180 ;
        var lngOffset2 = IntelligentRoadTest.LngDistince(centerPoint , 78 * (index - 1)  , IntelligentRoadTest.map);
        var lng3 = lng + parseFloat(lngOffset2);
        var point3 = new BMap.Point(lng3 , lat);
        var pixelObj3 = IntelligentRoadTest.map.pointToPixel(point3); //返回转换之后的像素对象 属性有x 和 y
        var radius2 = Math.abs(pixelObj3.x - pixelObj.x); //获取第二个圆的半径
        context.strokeStyle = "#9ffb13";
        context.lineWidth  = 6;
        var firstX = pixelObj.x + Math.sin(2*Math.PI/360 * lineStartAngle) * radius;
        var firstY = pixelObj.y - Math.cos(2*Math.PI/360 * lineStartAngle) * radius;
        var firstCirclePoint = {x : firstX , y : firstY };
        var secondX = pixelObj.x + Math.sin(2*Math.PI/360 * lineEndAngle) * radius2;
        var secondY = pixelObj.y - Math.cos(2*Math.PI/360 * lineEndAngle) * radius2;
        var secondCirclePoint = {x : secondX , y : secondY };
        context.globalAlpha = 1; //线段不需要透明度，如果设置透明度的话比较难看出来每个扇形的分隔
        context.beginPath();
        // context.moveTo(firstX ,firstY);
        context.arc(pixelObj.x,pixelObj.y,radius,stAngle,endAngle); //画外层的圆
        context.lineTo(secondX , secondY);
        context.arc(pixelObj.x,pixelObj.y,radius2,endAngle ,stAngle , true ); //画里面的圆 ,这里还要配置逆时针绘制
        context.lineTo(firstX ,firstY );
        // context.closePath();

        context.stroke();
        context.lineWidth  = 1;
    }
}


/**
 * ********************************
 * @funcname drawHighLightTACircle
 * @funcdesc 绘制高亮的TA圆形
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
function drawHighLightTACircle(context  , pixelObj , centerPoint , index){
    var index = index + 1;
    var lng = centerPoint.lng;
    var lat = centerPoint.lat;
    var point = new BMap.Point(lng, lat);
    //zoom:当前地图缩放级别
    var zoom = IntelligentRoadTest.map.getZoom();
    //center:当前地图可视范围中心点坐标
    var center = IntelligentRoadTest.map.getCenter();
    //bounds:地图可视区域
    var bound = IntelligentRoadTest.map.getSize();
    pixelObj = IntelligentRoadTest.map.pointToPixel(point); //返回转换之后的像素对象 属性有x 和 y
    var lngOffset = IntelligentRoadTest.LngDistince(centerPoint , 78 * index  , IntelligentRoadTest.map);
    var lng2 = lng + parseFloat(lngOffset);
    var point2 = new BMap.Point(lng2 , lat);
    var pixelObj2 = IntelligentRoadTest.map.pointToPixel(point2); //返回转换之后的像素对象 属性有x 和 y
    var radius = Math.abs(pixelObj2.x - pixelObj.x);
    var stAngle = 0;
    var endAngle = 2 * Math.PI;
    context.strokeStyle = "#9ffb13";
    context.lineWidth  = 6;
    context.beginPath();
    context.arc(pixelObj.x,pixelObj.y,radius,stAngle,endAngle);
    context.closePath();
    context.globalAlpha = 1; //线段不需要透明度，如果设置透明度的话比较难看出来每个扇形的分隔
    context.stroke();
    context.lineWidth  = 1;
}


//----------------------------------------------------------MOD3干扰扇区、重叠覆盖扇区和越区覆盖扇区开始--------------------------------------------

var normalSector = {};//存放所有扇区列表的一些属性的对象（比如index ， typeName等等）
normalSector.type = "";//用于筛选出来对应的数据的条件
normalSector.typeName = "扇区";
normalSector.senseName = "扇区";
normalSector.name = "sector";
normalSector.index = 3;

//替换原来的一些属性
var m3Sector = {};//存放MOD3干扰扇区列表的一些属性的对象（比如index ， typeName等等）
m3Sector.type = "IS_M3_COV";//用于筛选出来对应的数据的条件
m3Sector.typeName = "MOD3干扰扇区";
m3Sector.senseName = "MOD3干扰扇区";
m3Sector.name = "m3Sector";
m3Sector.index = 26;

var olSector = {};//存放重叠覆盖扇区列表的一些属性的对象（比如index ， typeName等等）
olSector.type = "IS_OL_COV";//用于筛选出来对应的数据的条件
olSector.typeName = "重叠覆盖扇区";
olSector.senseName = "重叠覆盖扇区";
olSector.name = "olSector";
olSector.index = 27;

var cbSector = {};//存放越区覆盖扇区列表的一些属性的对象（比如index ， typeName等等）
cbSector.type = "IS_CB_COV";//用于筛选出来对应的数据的条件
cbSector.typeName = "越区覆盖扇区";
cbSector.senseName = "越区覆盖扇区";
cbSector.name = "cbSector";
cbSector.index = 28;

IntelligentRoadTest.normalSector = normalSector;
IntelligentRoadTest.m3Sector = m3Sector;
IntelligentRoadTest.olSector = olSector;
IntelligentRoadTest.cbSector = cbSector;

IntelligentRoadTest.sectorObj = IntelligentRoadTest.normalSector; //默认显示所有扇区


//----------------------------扇区列表开始 ---------------------------------------

/**
 * ********************************
 * @funcname IntelligentRoadTest.sectorFilterMrCount
 * @funcdesc 专题扇区根据MR条数进行筛选
 * @param {int} mr条数
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.sectorFilterMrCount = function(mr_count){
    IntelligentRoadTest.sectorFilterConditionArr[6] = mr_count; //将条件赋值到筛选条件数组
    var sectorListFilter = IntelligentRoadTest.sectorFilter(IntelligentRoadTest.sectorResult , IntelligentRoadTest.sectorFilterConditionArr);
    var tempData = sectorListFilter.top(IntelligentRoadTest.tempSectorFliterObj.size());//过滤后的结果集
    IntelligentRoadTest.tempSectorFliterObj.remove();//移除
    IntelligentRoadTest.tempSectorFliterObj = crossfilter([]);
    sectorListFilter = IntelligentRoadTest.tempSectorFliterObj.dimension(function(d) { return d });
    IntelligentRoadTest.tempSectorFliterObj.add(tempData);

    //过滤后回显数据
    IntelligentRoadTest.filterSectorResult = tempData;
    IntelligentRoadTest.sectorCurrentResult = IntelligentRoadTest.filterSectorResult;
    IntelligentRoadTest.isFilterSector = true;

    $("#sectorSort ul li.selected").trigger("click");
}

/**
 * IntelligentRoadTest.splitPoorAreaStr
 * 切割弱区集合的字符串的方法
 * @param poorAreaSetStr
 * @returns {Array}
 */
IntelligentRoadTest.splitPoorAreaStr = function IntelligentRoadTest_splitPoorAreaStr(poorAreaSetStr){
    var objList = [];
    var dataArr = poorAreaSetStr.split("@");
    for(var i = 0 ; i < dataArr.length; i++){
        var strArr = dataArr[i].split(",");
        var obj = {
            object_id : strArr[0] , //弱区编号
            distance : strArr[1] , //距离
            gridCount : strArr[2] , //弱区内的栅格数
            poorGridCount : strArr[3] //弱区内的弱栅格数
        }
        objList.push(obj);
    }
    return objList;
}
/**
 * ********************************
 * @funcname IntelligentRoadTest.splitTAData
 * @funcdesc 处理扇区的AGPS-MR每TA平均距离的记录的集合字符串
 * @param {String} taSet
 *   taSet 集合字符串
 * @return {Array}
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.splitTAData = function(taSet){
    var taArr = [];
    if(taSet != null && taSet != ""){
        var arrs = taSet.split("@"); //先切割成行行记录
        for(var i = 0; i < arrs.length; i++){
            var obj = {};
            var set = arrs[i].split(","); //切割出某一行数据中的属性
            if(set.length >= 4){
                obj.ta = set[0];
                obj.count = set[1];
                obj.distance = set[2];
                if(set[3] != null && set[3] != ""){
                    obj.avg = (parseFloat(set[3]) * 100).toFixed(2);
                }else{
                    obj.avg = set[3];
                }
            }
            taArr.push(obj);
        }
    }
    return taArr;
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealSectorData
 * @funcdesc 处理查询返回的扇区列表数据
 * @param {Object} data : 表示查询返回的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealSectorData = function  IntelligentRoadTest_dealSectorData (data) {
    var result = callBackChangeData(data);

   /* for(var i = 0; i < result.length; i++){ //构建测试数据，方便测试，后期需要删除
        if(result[i].pred_distance == null){
            result[i].pred_distance = 300;
        }
        if(result[i].pred_azimuth == null){
            result[i].pred_azimuth = 150;
        }
    }*/
    IntelligentRoadTest.sectorResult = result ;
    IntelligentRoadTest.sectorCurrentResult = result;
    IntelligentRoadTest.sectorCrossFliterObj.remove();
    IntelligentRoadTest.sectorCrossFliterObj.add(result);
    // console.log(result);
    //IntelligentRoadTest.showSectorData(result);
    // $("#sectorList .flexRow ").eq(0).children(".selected").trigger("click");
    var SelectName = $("#sectorListSelectName").text();
    var flexCol = $("#sectorList  .flexRow .flexCol");
    IntelligentRoadTest.triggleFilter(SelectName, flexCol);
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.showSectorData
 * @funcdesc 展示扇区列表
 * @param {Array} result:表示扇区列表数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.showSectorData = function IntelligentRoadTest_showSectorData(result) {
    IntelligentRoadTest.sectorCurrentPage = 1;
    IntelligentRoadTest.sectorTotalCount = result.length;
    var pageCount = result.length / IntelligentRoadTest.pageSize;
    if((result.length % IntelligentRoadTest.pageSize) != 0){
        IntelligentRoadTest.sectorTotalPage = parseInt(pageCount) + 1 ; //总页数，没有整除时加上1
    }else{
        IntelligentRoadTest.sectorTotalPage = pageCount;  //整除不用加1
    }
    var rateName = IntelligentRoadTest.getSectorTypeName() + "占比"; //获取当前扇区类型的名称

    if(IntelligentRoadTest.sectorVM == null){
        IntelligentRoadTest.sectorVM = new Vue({
            el : '#showSectorListDiv',
            data : {
                sectorList : IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.sectorCurrentResult , IntelligentRoadTest.sectorCurrentPage),
                sectorType : IntelligentRoadTest.sectorObj.name, //扇区类型
                rateName : rateName, //列表显示覆盖度的名称
                totalPages : IntelligentRoadTest.sectorTotalPage,
                totalCounts :  IntelligentRoadTest.sectorTotalCount ,
                currentPageNum :  IntelligentRoadTest.sectorCurrentPage,
                startIndex : IntelligentRoadTest.startIndex ,
                lastIndex : IntelligentRoadTest.lastIndex
            },
            methods : {
                showMessage : function (item,index , isListInHere){
                    if(isListInHere != null && isListInHere == true){ //从列表进来的时候不要执行下去
                        IntelligentRoadTest.getSectorMessageById(item.enodeb_id , item.cell_id , IntelligentRoadTest.day); //查询一下这个扇区的详细数据
                        return ;
                    }
                    //如果站间距的图层存在，则清除图层并将变量置空
                    if(IntelligentRoadTest.sectorCircleCanvas != null){
                        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.sectorCircleCanvas); //清除圆圈
                        IntelligentRoadTest.sectorCircleCanvas = null;
                    }
                    //将其他查询放入到这里来，防止因过渡操作导致的查询卡顿
                    if(item.enodeb_id != null && item.cell_id != null){
                        IntelligentRoadTest.loadSectoroOtherData(item.enodeb_id , item.cell_id);
                        IntelligentRoadTest.loadAlarmData(item.enodeb_id , item.cell_id);
                        IntelligentRoadTest.loadKPIData(item.enodeb_id , item.cell_id);
                    }
                    IntelligentRoadTest.cleraAllZhuantiSectorAndLine();
                    IntelligentRoadTest.hideCBPoorAreaNrTop5Sector();
                    IntelligentRoadTest.mkIndex=index;
                    IntelligentRoadTest.cacheItem=item;
                    $('#showGridSub img').addClass("showGrid");
                    $('#showGridSub img').attr("src","../js/IntelligentRoadTestV3/images/white_grid.png");
                    $('#showGridSub img').attr("title","隐藏栅格");
                    if(IntelligentRoadTest.circle){
                        //注销
                        var itemSectorData = {
                            obj_type:IntelligentRoadTest.circle.obj_type,
                            pointsString:null,
                            type:2,
                            decide:1,
                            statn_id:IntelligentRoadTest.circle.statn_id,
                            cell_id:IntelligentRoadTest.circle.cell_id,
                            day:IntelligentRoadTest.circle.day
                        };
                        IntelligentRoadTest.logOutPolygonToLayer(itemSectorData);
                    }

                    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.circle);
                    IntelligentRoadTest.showSector(item,IntelligentRoadTest.sectorObj.name);

                    /*显示7天覆盖率趋势图和7天 在这个方法中设置了如果是扇区列表，不需要查询这个数据*/
                    IntelligentRoadTest.getSectorCovRateData(item.enodeb_id , item.cell_id , item.pci);
                    //显示扇区7天的KPI感知速率指标趋势
                    IntelligentRoadTest.getSectorKPITrendData(item.enodeb_id , item.cell_id);
                    IntelligentRoadTest.goSectorCompleteMessage();
                    var object_id = item.enodeb_id*256+item.cell_id;
                    IntelligentRoadTest.loadPoorAreaGrid(IntelligentRoadTest.day,item.city_id,item.country_id,object_id,1,item.enodeb_id,item.cell_id);
                    //扇区点击
                    var obj= IntelligentRoadTest.getSectorXYZ(item.band_mapping);
                    var pointArr=IntelligentRoadTest.add_sector(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),obj.xy,obj.xy,obj.z,item.ant_azimuth)
//          		  var pointArr=IntelligentRoadTest.add_sector(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),0.0003,0.0003,3.5,item.ant_azimuth)
                    var lng=pointArr[2].lng;
                    var lat=pointArr[2].lat;
                    if(item.is_indoor=='室内'){
                        lng=item.longitude_mid_baidu;
                        lat=item.latitude_mid_baidu;
                    }
//
                    if(IntelligentRoadTest.mapClick){
                        IntelligentRoadTest.mapClick=false;
                    }else{
                        if(!IntelligentRoadTest.isChangeDate && !IntelligentRoadTest.showNrCover){ //日期切换的时候不做任何定位和缩放,不在显示附近覆盖的情况下才可以做定位
                            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),20);
                        }else{
                            IntelligentRoadTest.isChangeDate = false;
                        }
                    }

                    var poorAreaList = [] ;//弱覆盖区域集合
                    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
                        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
                    }
                    var nearPoorAreaList = []; //附近弱覆盖区域集合
                    if(item.nb_poor_coverage_set != null && item.nb_poor_coverage_set != ''){
                        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.nb_poor_coverage_set);
                    }
                    IntelligentRoadTest.polygonList=[];
                    // IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList,1);
                    // IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList,2);

                    //增加显示距离测评的TA平均距离
                    var taArr = []; //AGPS-MR每TA平均距离的集合
                    if(item.agps_mr_dist_ta != null && item.agps_mr_dist_ta !=  ''){
                        taArr = IntelligentRoadTest.splitTAData(item.agps_mr_dist_ta);
                    }

                    //增加一个邻区列表数据
                    var nrCellStr = null;
                    if(IntelligentRoadTest.sectorObj.name == "olSector"){
                        nrCellStr = item.olnccell_set;
                    }else if(IntelligentRoadTest.sectorObj.name == "cbSector"){
                        nrCellStr = item.cbnccell_set;
                    }else if(IntelligentRoadTest.sectorObj.name == "m3Sector"){
                        nrCellStr = item.m3nccell_set;
                    }
                    var nrCellList = IntelligentRoadTest.getNCCellList(nrCellStr); //获取到邻区列表数据

                    /*增加一个属性显示专题的名称*/
                    var rateName = "";
                    var anotherRateName = ""; //另外一个简洁名称
                    if(IntelligentRoadTest.sectorObj.name == "m3Sector"){
                        rateName = "MOD3干扰";
                        anotherRateName = "MOD3";
                    }else if(IntelligentRoadTest.sectorObj.name == "olSector"){
                        rateName = "重叠覆盖";
                        anotherRateName = "重叠";
                    }else if(IntelligentRoadTest.sectorObj.name == "cbSector"){
                        rateName = "越区覆盖";
                        anotherRateName = "越区";
                    }
                    //判断是否显示所有的信息
                    var isShowMore = true;
                    var stationDistanceList = []; //站间列表数组
                    //这里判断是否显示站间列表
                    //处理站间列表的数据
                    /*if(item.spacing_agps_mrnum == null || item.spacing_agps_mrnum == ""){ //测试数据，方便测试
                        item.spacing_agps_mrnum = "1200,1500,1600,1800";
                    }*/

                    if(item.spacing_agps_mrnum_d != null && item.spacing_agps_mrnum_d != ""
                        && item.station_spacing != null && item.station_spacing != ""){ //站间距和站间MR数都有
                        var mrArr = item.spacing_agps_mrnum_d.split(","); //切割出每一个mr值
                        var DValueArr = [ 0 , 1 , 1.5 , 2]; //倍数
                        var DValueNameArr = ["全部" , "≥D" , "≥1.5D" , "≥2D" ];

                        var DKeyNameArr = ["全部" , "≥" , "≥" , "≥" ];
                        var startValue = 0;
                        for(var k = 0 ; k < mrArr.length; k++){
                            var obj = {};
                            obj.key = item.station_spacing * DValueArr[k];
                            if(k == 0){
                                obj.keyStr = DKeyNameArr[k];
                            }else{
                                obj.keyStr = DKeyNameArr[k] + " " + obj.key;
                            }
                            obj.value = mrArr[k];
                            obj.valueName = DValueNameArr[k];
                            stationDistanceList.push(obj);
                        }
                    }
                    if(IntelligentRoadTest.sectorObj.name != "sector"){
                        isShowMore = false;
                        /*//这里判断是否显示偏离的位置以及偏离的角度
                        if(item.pred_distance == null && item.pred_azimuth == null){ //测试数据
                            item.pred_distance = 300;
                            item.pred_azimuth = 150;
                        }*/
                        if(item.pred_distance != null && item.pred_distance >= 200){ //超过200米则显示
                            if(item.pred_azimuth != null){
                                IntelligentRoadTest.drawSectorAndLine(item);
                            }
                        }
                    }

                    if(!IntelligentRoadTest.isScreenCompared&&IntelligentRoadTest.isAddMessageEvent){//不是在分屏页，并且点击过分屏
                        if(!windowScreeen.closed){//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
                            // windowScreeen.focus();
                            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item,'sector');
                        }
                    }
                    $(".linkCell").attr("title","显示连线");
                    $(".linkCell").removeClass("linkCellHover");
                    if(IntelligentRoadTest.sectorCompleteVM == null){
                        IntelligentRoadTest.sectorCompleteVM = new Vue({
                            el : '#sectorCompleteMessage' ,
                            data : {
                                sectorData : item,
                                isShowMore : isShowMore ,
                                sectorOtherData :  "" , //扇区的其他信息
                                rateName : rateName,
                                currentGridRateName:"sector", //当前栅格图层的类型
                                sector_grid_area: null , //专题扇区的栅格面积
                                sector_grid_count:null, //专题扇区的栅格数
                                sector_zhuanti_agps_mr: null , //专题扇区的agpsMR记录数
                                sector_zhuanti_all_mr:null, //专题扇区的全量MR记录数
                                anotherRateName : anotherRateName,
                                nrCellList : nrCellList, //邻区列表数据
                                kpiList : [] , // kpi列表的数据
                                alarmList : [] , // 告警列表的数据
                                changeableData: {}, //可以变化的指标对象
                                poorAreaListData : poorAreaList, //弱覆盖集合
                                nearPoorAreaListData : nearPoorAreaList ,//附近弱覆盖集合
                                TAArr : taArr, //AGPS-MR每TA平均距离的集合
                                stationDistanceList: stationDistanceList, //站间列表集合
                                isShowCompleteMessage : IntelligentRoadTest.isShowBaiduMap
                            },
                            methods : {
                                sectorPosition:function(item){
                                    if(IntelligentRoadTest.circle){
                                        //注销
                                        var itemSectorData = {
                                            obj_type:IntelligentRoadTest.circle.obj_type,
                                            pointsString:null,
                                            type:2,
                                            decide:1,
                                            statn_id:IntelligentRoadTest.circle.statn_id,
                                            cell_id:IntelligentRoadTest.circle.cell_id,
                                            day:IntelligentRoadTest.circle.day
                                        };
                                        IntelligentRoadTest.logOutPolygonToLayer(itemSectorData);
                                    }
                                    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.circle);
                                    IntelligentRoadTest.showSector(item,IntelligentRoadTest.sectorObj.name);
                                    if(item.longitude_mid_baidu!=undefined&&item.longitude_mid_baidu!=0&&item.latitude_mid_baidu!=undefined&&item.latitude_mid_baidu!=0){
                                        IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),20);
                                    }
                                },
                                showSectorGrid:function(item){
                                    if($('#showGridSub img').hasClass("showGrid")){
                                        $('#showGridSub img').removeClass("showGrid");
                                        $('#showGridSub img').attr("src","../js/IntelligentRoadTest/images/showOrHideGrid.png");
                                        $('#showGridSub img').attr("title","显示栅格");
                                        //删除栅格
                                        IntelligentRoadTest.GridMapCircleDataArr = null;
                                        IntelligentRoadTest.GridMapCircleDataArr = [];
                                        IntelligentRoadTest.GridCanArrT = null;
                                        IntelligentRoadTest.GridCanArrM = null;
                                        IntelligentRoadTest.GridCanArrU = null;
                                        IntelligentRoadTest.CanArr = null;
                                        IntelligentRoadTest.GridCanArrT = [];
                                        IntelligentRoadTest.GridCanArrM = [];
                                        IntelligentRoadTest.GridCanArrU = [];
                                        IntelligentRoadTest.CanArr = [];
                                        IntelligentRoadTest.GridMap.clear();
                                    }else{
                                        $('#showGridSub img').addClass("showGrid");
                                        $('#showGridSub img').attr("src","../js/IntelligentRoadTestV3/images/white_grid.png");
                                        $('#showGridSub img').attr("title","隐藏栅格");
                                        //
                                        var object_id = item.enodeb_id*256+item.cell_id;
                                        IntelligentRoadTest.loadPoorAreaGrid(IntelligentRoadTest.day,item.city_id,item.country_id,object_id,1,item.enodeb_id,item.cell_id);
                                        //显示
                                    }
                                },
                                gotoAlarmList : function (item){
                                    if(item.sector_set != null){
                                        var sectorArr = item.sector_set.split("@");
                                        IntelligentRoadTest.loadAlarmListData(sectorArr);
                                        $("#alarmBackPoor").html("返回上一级");
                                    }
                                },
                                showDetailInfo :function (event){
                                    IntelligentRoadTest.showDetailInfo(event);
                                },showLinkCell :function (event,item,type){
                                    //显示或隐藏附近弱区或者覆盖弱区 type==1为覆盖弱区 type==2为附近弱区
//                                    if($(event.currentTarget).hasClass("linkCellHover")){
//                                        $(event.currentTarget).attr("title","显示连线");
//                                        $(event.currentTarget).removeClass("linkCellHover");
//                                        IntelligentRoadTest.hideSectorPoorLine(type);
//                                    }else{
//                                        $(event.currentTarget).attr("title","隐藏连线");
//                                        $(event.currentTarget).addClass("linkCellHover");
//                                        IntelligentRoadTest.showSectorPoorLine(item,type);
//                                    }
                                    IntelligentRoadTest.showLinkPoorArea(event,item,type);
                                },
                                gotoShowSectorMessage : function (sectorDate , item){
                                    // console.log(sectorDate);
                                    if(sectorDate.enodebid != null &&  sectorDate.enodebid != "" && sectorDate.cellid != null && sectorDate.cellid != ""){
                                        IntelligentRoadTest.clickType=1;
                                        if(IntelligentRoadTest.sectorObj.name != "sector"){
                                            IntelligentRoadTest.lastSectorObj = IntelligentRoadTest.sectorObj;
                                            IntelligentRoadTest.lastSectorObj.currentSector = item;
                                            IntelligentRoadTest.sectorObj = IntelligentRoadTest.normalSector;
                                        }
                                        IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid , sectorDate.cellid , IntelligentRoadTest.day);
                                    }
                                },
                                showMoreMessage : function(){
                                    IntelligentRoadTest.sectorCompleteVM.isShowMore = true;
                                },
                                showNRLinkCell :function (event,item,nrCellList , type){
                                    if($(event.currentTarget).hasClass("linkCellHover")){
                                        $(event.currentTarget).attr("title","显示连线");
                                        $(event.currentTarget).removeClass("linkCellHover");
                                        // $(event.currentTarget).children().attr("src",norImg);
                                        if(type==1){
                                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                                        }else if(type==2){
                                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                                        }
                                    }else{
                                        $(event.currentTarget).attr("title","隐藏连线");
                                        $(event.currentTarget).addClass("linkCellHover");
                                        var centerPoint = new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu);
                                        var enodebid_cellidArr = [];
                                        for(var i = 0; i < nrCellList.length; i++){
                                            if(nrCellList[i].enodebid != null && nrCellList[i].enodebid != "" &&
                                                nrCellList[i].cellid != null && nrCellList[i].cellid != "" ){ //做一下容错，不将基站ID和小区ID 为空的扇区拼进去
                                                enodebid_cellidArr.push(nrCellList[i].enodebid + "," + nrCellList[i].cellid); //将基站ID和扇区ID用逗号拼在一起
                                            }
                                        }
                                        var sector_set = enodebid_cellidArr.join("@"); //拼成一个以@符号切割扇区的字符串
                                        if(type==1){
                                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint,sector_set);
                                        }else if(type==2){
                                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint,sector_set);
                                        }
                                    }
                                },
                                showDistanceCricle :function (event,item,stationDistanceList){
                                    if($(event.currentTarget).hasClass("linkCellHover")){
                                        $(event.currentTarget).attr("title","显示连线");
                                        $(event.currentTarget).removeClass("linkCellHover");
                                        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.sectorCircleCanvas); //清除圆圈
                                        IntelligentRoadTest.sectorCircleCanvas = null;
                                    }else{
                                        if(IntelligentRoadTest.map.getZoom() > 17){
                                            IntelligentRoadTest.map.setZoom(17);
                                        }
                                        $(event.currentTarget).attr("title","隐藏连线");
                                        $(event.currentTarget).addClass("linkCellHover");
                                        IntelligentRoadTest.showSectorStationCircle(item.station_spacing , stationDistanceList , item);
                                    }
                                },
                                showErrorMessage:function(pin_pci){
                                    if(pin_pci != null){
                                        var list = pin_pci.split("_");
                                    }
                                    alert("在3公里范围内找不到PCI为" + list[1] + "、频点为" + list[0] + "对应的小区")
                                }
                            }
                        });
                    }else{
                        IntelligentRoadTest.sectorCompleteVM.sectorData = item;
                        IntelligentRoadTest.sectorCompleteVM.isShowMore = isShowMore;
                        IntelligentRoadTest.sectorCompleteVM.sectorOtherData = "";
                        IntelligentRoadTest.sectorCompleteVM.rateName = rateName;
                        IntelligentRoadTest.sectorCompleteVM.anotherRateName = anotherRateName;
                        IntelligentRoadTest.sectorCompleteVM.nrCellList = nrCellList;
                        IntelligentRoadTest.sectorCompleteVM.poorAreaListData =  poorAreaList;
                        IntelligentRoadTest.sectorCompleteVM.nearPoorAreaListData =  nearPoorAreaList ;
                        IntelligentRoadTest.sectorCompleteVM.TAArr = taArr;
                        IntelligentRoadTest.sectorCompleteVM.stationDistanceList = stationDistanceList;
                        IntelligentRoadTest.sectorCompleteVM.isShowCompleteMessage =  IntelligentRoadTest.isShowBaiduMap;
                    }
                    IntelligentRoadTest.setChangealbeDataObj(IntelligentRoadTest.sectorObj.name); //设置专题栅格数和专题栅格面积数属性

                },
                lastOrNext : function (type) {
                    if(type == 0){
                        //上一页
                        if(IntelligentRoadTest.sectorCurrentPage >  1){
                            IntelligentRoadTest.sectorCurrentPage = IntelligentRoadTest.sectorCurrentPage - 1;
                            IntelligentRoadTest.sectorVM.sectorList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.sectorCurrentResult , IntelligentRoadTest.sectorCurrentPage);
                            IntelligentRoadTest.sectorVM.currentPageNum = IntelligentRoadTest.sectorCurrentPage;
                            IntelligentRoadTest.sectorVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.sectorVM.lastIndex = IntelligentRoadTest.lastIndex;
                        }else{
                            alert("当前页是第一页");
                        }
                    }else{
                        if(IntelligentRoadTest.sectorCurrentPage < IntelligentRoadTest.sectorTotalPage){
                            IntelligentRoadTest.sectorCurrentPage = IntelligentRoadTest.sectorCurrentPage + 1;
                            IntelligentRoadTest.sectorVM.sectorList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.sectorCurrentResult , IntelligentRoadTest.sectorCurrentPage);
                            IntelligentRoadTest.sectorVM.currentPageNum = IntelligentRoadTest.sectorCurrentPage;
                            IntelligentRoadTest.sectorVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.sectorVM.lastIndex = IntelligentRoadTest.lastIndex;
                        }
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.sectorVM.sectorList,3);
//                    IntelligentRoadTest.drawMk(IntelligentRoadTest.sectorTotalPage,3);
//                     $("#sectorCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
//                         + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.sectorTotalCount +"条数据)");
                },
                gotoPage : function(){
                    var page = $("#sectorPage").val();
                    page  = parseInt(page);
                    if(page > 0 && page <= IntelligentRoadTest.sectorTotalPage){
                        IntelligentRoadTest.sectorCurrentPage = page;
                        IntelligentRoadTest.sectorVM.sectorList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.sectorCurrentResult , IntelligentRoadTest.sectorCurrentPage);
                        IntelligentRoadTest.sectorVM.currentPageNum =IntelligentRoadTest.sectorCurrentPage;
                        IntelligentRoadTest.sectorVM.startIndex = IntelligentRoadTest.startIndex;
                        IntelligentRoadTest.sectorVM.lastIndex = IntelligentRoadTest.lastIndex;
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.sectorVM.sectorList,3);
//                    IntelligentRoadTest.drawMk(IntelligentRoadTest.sectorTotalPage,3);
//                     $("#sectorCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
//                         + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.sectorTotalCount +"条数据)");
                },
                goLast :function () {
                    IntelligentRoadTest.sectorCurrentPage = IntelligentRoadTest.sectorTotalPage;
                    IntelligentRoadTest.sectorVM.sectorList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.sectorCurrentResult , IntelligentRoadTest.sectorCurrentPage);
                    IntelligentRoadTest.sectorVM.currentPageNum = IntelligentRoadTest.sectorCurrentPage;
                    IntelligentRoadTest.sectorVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.sectorVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.sectorVM.sectorList,3);
//                    IntelligentRoadTest.drawMk(IntelligentRoadTest.sectorTotalPage,3);
//                     $("#sectorCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
//                         + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.sectorTotalCount +"条数据)");
                },
                goFirst :function () {
                    IntelligentRoadTest.sectorCurrentPage = 1;
                    IntelligentRoadTest.sectorVM.sectorList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.sectorCurrentResult , IntelligentRoadTest.sectorCurrentPage);
                    IntelligentRoadTest.sectorVM.currentPageNum = IntelligentRoadTest.sectorCurrentPage;
                    IntelligentRoadTest.sectorVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.sectorVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.sectorVM.sectorList,3);
//                    IntelligentRoadTest.drawMk(IntelligentRoadTest.sectorTotalPage,3);
//                     $("#sectorCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
//                         + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.sectorTotalCount +"条数据)");
                },  turnMk:function (index,item){
                    for(var i=0;i<IntelligentRoadTest.markerList.length;i++){
                        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.markerList[i]);
                    }

                    for(var i=0;i<IntelligentRoadTest.lngArr.length;i++){
                        var lng=IntelligentRoadTest.lngArr[i];
                        var lat=IntelligentRoadTest.latArr[i];
                        var color="#fff"
                        var img="../js/IntelligentRoadTest/images/bg_num.png";
                        if(i==index){
                            img="../js/IntelligentRoadTest/images/maker2.png";
                            color="black";
                            IntelligentRoadTest.openInfoWindow(lng,lat,item.cell_name);
                        }
                        IntelligentRoadTest.addMk(lng,lat,img,i,color,item.cell_name);
                        $("#showSectorListDiv").find(".listUL > li").eq(i).find(".numSpan").css("background","url(../js/IntelligentRoadTest/images/bg_num.png)");
                        $("#showSectorListDiv").find(".listUL > li").eq(i).css("background","#fff");
                    }
                    $("#showSectorListDiv").find(".listUL > li").eq(index).find(".numSpan").css("background","url(../js/IntelligentRoadTest/images/maker2.png)");
                    $("#showSectorListDiv").find(".listUL > li").eq(index).css("background","#f4f4f4");
                }
            }
        });
    }else{
        IntelligentRoadTest.sectorVM.sectorList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.sectorCurrentResult , IntelligentRoadTest.sectorCurrentPage);
        IntelligentRoadTest.sectorVM.sectorType = IntelligentRoadTest.sectorObj.name;
        IntelligentRoadTest.sectorVM.rateName = rateName;
        IntelligentRoadTest.sectorVM.totalPages = IntelligentRoadTest.sectorTotalPage;
        IntelligentRoadTest.sectorVM.totalCounts =  IntelligentRoadTest.sectorTotalCount ;
        IntelligentRoadTest.sectorVM.currentPageNum =  IntelligentRoadTest.sectorCurrentPage;
        IntelligentRoadTest.sectorVM.startIndex = IntelligentRoadTest.startIndex ;
        IntelligentRoadTest.sectorVM.lastIndex = IntelligentRoadTest.lastIndex;
        if(IntelligentRoadTest.index==3 || IntelligentRoadTest.index== 26 ||  IntelligentRoadTest.index==27 || IntelligentRoadTest.index==28){
//        	IntelligentRoadTest.drawMk(IntelligentRoadTest.sectorTotalPage,3);
            IntelligentRoadTest.drawMk(IntelligentRoadTest.sectorVM.sectorList,3);
        }

        // $("#sectorCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
        //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.sectorTotalCount +"条数据)");
    }
    if(IntelligentRoadTest.currentLocation == "sector" || IntelligentRoadTest.currentLocation == "m3Sector" ||
        IntelligentRoadTest.currentLocation == "olSector" || IntelligentRoadTest.currentLocation == "cbSector"){
        IntelligentRoadTest.goSectorCompleteMessage();
    }
    showOrHideInputImage(1);
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.loadSectorData
 * @funcdesc 查询扇区列表数据
 * @param  {String} country_id :这里表示的是区县的ID
 * {String} mktcenter_id：营服的ID
 *{String}mktcenter_name ： 营服名称
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.loadSectorData = function IntelligentRoadTest_loadSectorData(country_id , mktcenter_id , mktcenter_name){

    if(IntelligentRoadTest.sectorObj == null){
        return ;
    }

    var sqlList = [];
    var city = $('#sectorCityName').text().trim();
    var city_id = noceUtil.city_LATN_ID[city];
    var country = $('#sectorDistrictName').text().trim();
    if(country_id == null){
        if(city == "阳江" && country == "高新办"){
            country = "高新";
        }
        country_id = IntelligentRoadTest.districtLngAndLat[city][country]["id"];
    }
    var list = ["IntelligentRoadTestAnalysi_v2_sector" ,"DAY:"+IntelligentRoadTest.day,"CITY_ID:"+city_id,"COUNTRY:"+country];
    if(mktcenter_name != null && mktcenter_name != "" && mktcenter_name != 'null'){
        list.push("MKTCENTER_ID:" + "and MKTCENTER = '" + mktcenter_name  + "'");
    }else{
        var mktcenter = $("#sectorMktName").text().trim();
        if(mktcenter != "" && mktcenter != "null" && mktcenter != "全区"){
            list.push("MKTCENTER_ID:" + "and MKTCENTER = '" + mktcenter + "'");
            mktcenter_name = mktcenter;
        }
    }
    if(IntelligentRoadTest.sectorObj.name != "sector"){ //是专题扇区的列表
        var type = "and " + IntelligentRoadTest.sectorObj.type + "=1"; //增加查询条件
        list.push("TYPE:" + type);
        var sectorType = "g." + IntelligentRoadTest.sectorObj.type + " as sector_type ,"  ; //将专题标识字段查询出来

        if(IntelligentRoadTest.sectorObj.name == "olSector"){ //重叠覆盖
            sectorType += "round(g.OLMRRAT * 100 , 2) as sector_rate ,";
        }else if(IntelligentRoadTest.sectorObj.name == "cbSector"){ //越区覆盖
            sectorType += "round(g.CBMRRAT * 100 , 2) as sector_rate,";
        }else if(IntelligentRoadTest.sectorObj.name == "m3Sector"){ //越区覆盖
            sectorType += "round(g.M3MRRAT * 100 , 2) as sector_rate,";
        }
        // var sectorType = "1 as sector_type , ";
        list.push("SECTORTYPE:" + sectorType);
    }

    IntelligentRoadTest.sectorCountryId = country;
    IntelligentRoadTest.sectorMktCenterId = mktcenter_name;
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealSectorData];
    var database = [3];

    var currentSelectCondition  = "" + IntelligentRoadTest.day + city + country + mktcenter_name + IntelligentRoadTest.sectorObj.typeName;

    //查询条件不同的情况下才重新查询数据
    if(IntelligentRoadTest.sectorCurrentSelectConditon != null && IntelligentRoadTest.sectorCurrentSelectConditon != currentSelectCondition){
        showOrHideInputImage(2);
        progressbarTwo.submitSql(sqlList , funcList , database);
    }else{
        return;
    }
    //记录扇区查询的条件
    IntelligentRoadTest.sectorCurrentSelectConditon = currentSelectCondition ;
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.getSectorMessageById
 * @funcdesc 根据基站ID和小区ID获取扇区信息
 * @param {String} enodebId： 基站ID
 * {String} cellid：扇区ID
 * {String} day：日期
 * {boolean} isAlarmSector：是否是告警基站
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getSectorMessageById = function IntelligentRoadTest_getSectorMessageById(enodebId , cellid , day,isAlarmSector) {

    var sqlList = [];
    var sectorType = "";
    if(IntelligentRoadTest.sectorObj.name == "olSector"){ //重叠覆盖
        sectorType += "round(g.OLMRRAT * 100 , 2) as sector_rate ,";
    }else if(IntelligentRoadTest.sectorObj.name == "cbSector"){ //越区覆盖
        sectorType += "round(g.CBMRRAT * 100 , 2) as sector_rate,";
    }else if(IntelligentRoadTest.sectorObj.name == "m3Sector"){ //越区覆盖
        sectorType += "round(g.M3MRRAT * 100 , 2) as sector_rate,";
    }
    var list = ["IntelligentRoadTestAnalysisV2_getSectorById", "ENODEBID:" + enodebId, "CELLID:" + cellid ,"DAY:" + day , "SECTORTYPE:" + sectorType];
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealSectorMessageById];
    var database = [3];
    progressbarTwo.submitSql(sqlList, funcList, database , [[enodebId , cellid,isAlarmSector]]);

}

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealSectorMessageById
 * @funcdesc 处理查询返回的扇区数据（单个）
 * @param {Object}data ：表示查询返回的数据
 * {Array} params ： 参数列表 [enodebId , cellid,isAlarmSector]
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealSectorMessageById = function IntelligentRoadTest_dealSectorMessageById(data , params) {
    var result = callBackChangeData(data);
    var item = {};
    if(result.length > 0 && result[0] != null){
        if(IntelligentRoadTest.sectorObj.name != "sector"){ //专题扇区
            result[0].sector_type = true; //设置标识字段的值不为null即可
        }
        item = result[0];
    }else{
        item.enodeb_id = params[0];
        item.cell_id = params[1];
    }
    if(IntelligentRoadTest.sectorVM == null){
        IntelligentRoadTest.showSectorData([]);
    }
    IntelligentRoadTest.sectorVM.showMessage(item,params[2]);
}

/*
IntelligentRoadTest.showSectorMessageById = function IntelligentRoadTest_showSectorMessageById(item,isAlarmSector) {
    $('#showGridSub img').addClass("showGrid");
    $('#showGridSub img').attr("src","../js/IntelligentRoadTestV3/images/white_grid.png");
    $('#showGridSub img').attr("title","隐藏栅格");
    $('.linkCell').removeClass("linkCellHover");

    if(IntelligentRoadTest.sectorObj.name != "sector"){ //专题扇区
        item.sector_type = true; //设置标识字段的值不为null即可
    }
    if(IntelligentRoadTest.circle){
        //注销
        var itemSectorData = {
            obj_type:IntelligentRoadTest.circle.obj_type,
            pointsString:null,
            type:2,
            decide:1,
            statn_id:IntelligentRoadTest.circle.statn_id,
            cell_id:IntelligentRoadTest.circle.cell_id,
            day:IntelligentRoadTest.circle.day
        };
        IntelligentRoadTest.logOutPolygonToLayer(itemSectorData);
    }
    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.circle);
    IntelligentRoadTest.showSector(item,IntelligentRoadTest.sectorObj.name);
    /!*显示7天覆盖率趋势图和7天 在这个方法中设置了如果是扇区列表，不需要查询这个数据*!/
    IntelligentRoadTest.getSectorCovRateData(item.enodeb_id , item.cell_id , item.pci);
    //显示扇区7天的KPI感知速率指标趋势
    IntelligentRoadTest.getSectorKPITrendData(item.enodeb_id , item.cell_id);
    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
    IntelligentRoadTest.hideSectorPoorLine(3);
    IntelligentRoadTest.polygonList=[];
    var obj= IntelligentRoadTest.getSectorXYZ(item.band_mapping);
    var pointArr=IntelligentRoadTest.add_sector(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),obj.xy,obj.xy,obj.z,item.ant_azimuth)
    var lng=pointArr[2].lng;
    var lat=pointArr[2].lat;
    if(item.is_indoor=='室内'){
        lng=item.longitude_mid_baidu;
        lat=item.latitude_mid_baidu;
    }
    if(!isAlarmSector){
        var textList=
            [
                {"key":"扇区名称","val":item.cell_name},
                {"key":"扇区编号","val":item.enodeb_id+"_"+item.cell_id},
            ]
        if(IntelligentRoadTest.clickType==1){
            if(!IntelligentRoadTest.mapClick){
                if(item.longitude_mid_baidu!=undefined&&item.longitude_mid_baidu!=0&&item.latitude_mid_baidu!=undefined&&item.latitude_mid_baidu!=0){
                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),20);
                }
            }
            IntelligentRoadTest.clickType=0;
        }
//	 		IntelligentRoadTest.searchShowMkLable(lng,lat,textList);
    }else{
        if(item.longitude_mid_baidu!=undefined&&item.longitude_mid_baidu!=0&&item.latitude_mid_baidu!=undefined&&item.latitude_mid_baidu!=0){
            if(!IntelligentRoadTest.mapClick){
                IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),20);
            }
        }
        /!*IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
            [
                {"key":"扇区名称","val":item.cell_name},
                {"key":"扇区编号","val":item.enodeb_id+"_"+item.cell_id},
            ]
        );*!/
    }

    $("#sectorCount").html("返回");


    if(!IntelligentRoadTest.isScreenCompared&&IntelligentRoadTest.isAddMessageEvent){//不是在分屏页，并且点击过分屏
        if(!windowScreeen.closed){//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
            // windowScreeen.focus();
            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item,'sector');
        }
    }
    IntelligentRoadTest.goSectorCompleteMessage();
    IntelligentRoadTest.cacheItem=item;
    // IntelligentRoadTest.index=3;
    var object_id = item.enodeb_id*256+item.cell_id;
    IntelligentRoadTest.loadPoorAreaGrid(IntelligentRoadTest.day,item.city_id,item.country_id,object_id,1,item.enodeb_id,item.cell_id);
    var poorAreaList = [] ;//弱覆盖区域集合
    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
    }
    var nearPoorAreaList = []; //附近弱覆盖区域集合
    if(item.nb_poor_coverage_set != null && item.nb_poor_coverage_set != ''){
        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.nb_poor_coverage_set);
    }
    IntelligentRoadTest.polygonList=[];
    // IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList,1);
    // IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList,2,"fjrq");

    //增加显示距离测评的TA平均距离
    var taArr = []; //AGPS-MR每TA平均距离的集合
    if(item.agps_mr_dist_ta != null && item.agps_mr_dist_ta !=  ''){
        taArr = IntelligentRoadTest.splitTAData(item.agps_mr_dist_ta);
    }

    //增加一个邻区列表数据
    var nrCellStr = null;
    if(IntelligentRoadTest.sectorObj.name == "olSector"){
        nrCellStr = item.olnccell_set;
    }else if(IntelligentRoadTest.sectorObj.name == "cbSector"){
        nrCellStr = item.cbnccell_set;
    }else if(IntelligentRoadTest.sectorObj.name == "m3Sector"){
        nrCellStr = item.m3nccell_set;
    }
    var nrCellList = IntelligentRoadTest.getNCCellList(nrCellStr); //获取到邻区列表数据

    /!*增加一个属性显示专题的名称*!/
    var rateName = "";
    var anotherRateName = ""; //另外一个简洁的名称
    if(IntelligentRoadTest.sectorObj.name == "m3Sector"){
        rateName = "MOD3干扰";
        anotherRateName = "MOD3";
    }else if(IntelligentRoadTest.sectorObj.name == "olSector"){
        rateName = "重叠覆盖";
        anotherRateName = "重叠";
    }else if(IntelligentRoadTest.sectorObj.name == "cbSector"){
        rateName = "越区覆盖";
        anotherRateName = "越区";
    }
    //获取当前扇区类型的名称

    if(IntelligentRoadTest.sectorCompleteVM == null){
        IntelligentRoadTest.sectorCompleteVM = new Vue({
            el : '#sectorCompleteMessage' ,
            data : {
                sectorData : item,
                sectorOtherData :  "" , //扇区的其他信息
                rateName : rateName,
                anotherRateName : anotherRateName,
                nrCellList : nrCellList, //邻区列表
                kpiList : [] , // kpi列表的数据
                alarmList : [] , // 告警列表的数据
                changeableData: {}, //可以变化的指标对象
                poorAreaListData : poorAreaList, //弱覆盖集合
                nearPoorAreaListData : nearPoorAreaList, //附近弱覆盖集合
                TAArr : taArr, //AGPS-MR每TA平均距离的集合
                isShowCompleteMessage : IntelligentRoadTest.isShowBaiduMap
            },
            methods : {
                sectorPosition:function(item){
                    if(IntelligentRoadTest.circle){
                        //注销
                        var itemSectorData = {
                            obj_type:IntelligentRoadTest.circle.obj_type,
                            pointsString:null,
                            type:2,
                            decide:1,
                            statn_id:IntelligentRoadTest.circle.statn_id,
                            cell_id:IntelligentRoadTest.circle.cell_id,
                            day:IntelligentRoadTest.circle.day
                        };
                        IntelligentRoadTest.logOutPolygonToLayer(itemSectorData);
                    }
                    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.circle);
                    IntelligentRoadTest.showSector(item,IntelligentRoadTest.sectorObj.name);
                    if(item.longitude_mid_baidu!=undefined&&item.longitude_mid_baidu!=0&&item.latitude_mid_baidu!=undefined&&item.latitude_mid_baidu!=0){
                        IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),20);
                    }
                },
                showSectorGrid:function(item){
                    if($('#showGridSub img').hasClass("showGrid")){
                        $('#showGridSub img').removeClass("showGrid");
                        $('#showGridSub img').attr("src","../js/IntelligentRoadTest/images/showOrHideGrid.png");
                        $('#showGridSub img').attr("title","显示栅格");
                        //删除栅格
                        IntelligentRoadTest.GridMapCircleDataArr = null;
                        IntelligentRoadTest.GridMapCircleDataArr = [];
                        IntelligentRoadTest.GridCanArrT = null;
                        IntelligentRoadTest.GridCanArrM = null;
                        IntelligentRoadTest.GridCanArrU = null;
                        IntelligentRoadTest.CanArr = null;
                        IntelligentRoadTest.GridCanArrT = [];
                        IntelligentRoadTest.GridCanArrM = [];
                        IntelligentRoadTest.GridCanArrU = [];
                        IntelligentRoadTest.CanArr = [];
                        IntelligentRoadTest.GridMap.clear();
                    }else{
                        $('#showGridSub img').addClass("showGrid");
                        $('#showGridSub img').attr("src","../js/IntelligentRoadTestV3/images/white_grid.png");
                        $('#showGridSub img').attr("title","隐藏栅格");
                        //
                        var object_id = item.enodeb_id*256+item.cell_id;
                        IntelligentRoadTest.loadPoorAreaGrid(IntelligentRoadTest.day,item.city_id,item.country_id,object_id,1,item.enodeb_id,item.cell_id);
                        //显示
                    }
                },
                gotoAlarmList : function (item){
                    if(item.sector_set != null){
                        var sectorArr = item.sector_set.split("@");
                        IntelligentRoadTest.loadAlarmListData(sectorArr);
                        $("#alarmBackPoor").html("返回上一级");
                    }
                },
                showDetailInfo :function (event){
                    IntelligentRoadTest.showDetailInfo(event);
                },showLinkCell :function (event,item,type){
                    //附近弱区或者覆盖弱区连线
//                    if($(event.currentTarget).hasClass("linkCellHover")){
//                        $(event.currentTarget).attr("title","显示连线");
//                        $(event.currentTarget).removeClass("linkCellHover");
//                        IntelligentRoadTest.hideSectorPoorLine(type);//---
//                    }else{
//                        $(event.currentTarget).attr("title","隐藏连线");
//                        $(event.currentTarget).addClass("linkCellHover");
//                        IntelligentRoadTest.showSectorPoorLine(item,type);
//                    }
                    IntelligentRoadTest.showLinkPoorArea(event,item,type);
                },
                gotoShowSectorMessage : function (sectorDate){
                    // console.log(sectorDate);
                    if(sectorDate.enodebid != null &&  sectorDate.enodebid != "" && sectorDate.cellid != null && sectorDate.cellid != ""){
                        IntelligentRoadTest.clickType=1;
                        IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid , sectorDate.cellid , IntelligentRoadTest.day);
                    }
                },
                showNRLinkCell :function (event,item, nrCellList , type){
                    //type=1最近小区，type=2 接入扇区
                    if($(event.currentTarget).hasClass("linkCellHover")){
                        $(event.currentTarget).attr("title","显示连线");
                        $(event.currentTarget).removeClass("linkCellHover");
                        // $(event.currentTarget).children().attr("src",norImg);
                        if(type==1){
                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                        }else if(type==2){
                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                        }
                    }else{
                        $(event.currentTarget).attr("title","隐藏连线");
                        $(event.currentTarget).addClass("linkCellHover");
                        // $(event.currentTarget).children().attr("src",clickImg);
                        // var max_lng =
                        var centerPoint = new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu);
                        var enodebid_cellidArr = [];
                        for(var i = 0; i < nrCellList.length; i++){
                            enodebid_cellidArr.push(nrCellList[i].enodebid + "," + nrCellList[i].cellid); //将基站ID和扇区ID用逗号拼在一起
                        }
                        var sector_set = enodebid_cellidArr.join("@"); //拼成一个以@符号切割扇区的字符串
                        if(type==1){
                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint,sector_set);
                        }else if(type==2){
                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint,sector_set);
                        }
                    }
                }
            }
        });
    }else{
        IntelligentRoadTest.sectorCompleteVM.sectorData = item;
        IntelligentRoadTest.sectorCompleteVM.sectorOtherData = "";
        IntelligentRoadTest.sectorCompleteVM.rateName = rateName;
        IntelligentRoadTest.sectorCompleteVM.anotherRateName = anotherRateName;
        IntelligentRoadTest.sectorCompleteVM.nrCellList = nrCellList;
        IntelligentRoadTest.sectorCompleteVM.poorAreaListData =  poorAreaList;
        IntelligentRoadTest.sectorCompleteVM.nearPoorAreaListData =  nearPoorAreaList ;
        IntelligentRoadTest.sectorCompleteVM.TAArr = taArr;
        IntelligentRoadTest.sectorCompleteVM.isShowCompleteMessage =  IntelligentRoadTest.isShowBaiduMap;
    }
    IntelligentRoadTest.setChangealbeDataObj(IntelligentRoadTest.sectorObj.name); //设置专题栅格数和专题栅格面积数属性
    if(item.enodeb_id != null && item.cell_id != null){
        IntelligentRoadTest.loadSectoroOtherData(item.enodeb_id , item.cell_id);
        IntelligentRoadTest.loadAlarmData(item.enodeb_id , item.cell_id);
        IntelligentRoadTest.loadKPIData(item.enodeb_id , item.cell_id);
        if(noceUtil.GetQueryString("object_type")=="扇区"){ //从其他地方跳转过来的
            IntelligentRoadTest.sectorCompleteVM.sectorPosition(IntelligentRoadTest.sectorCompleteVM.sectorData);//定位一下
        }
    }
}
*/


//------点击扇区列表进入详情页是要做的查询--------------------


function changeFormat(dateString){
    return dealDateString(dateString).Format("yyyy-MM-dd");
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.loadSectoroOtherData
 * @funcdesc 根据基站ID和小区ID从dim_sector表中查询所需的数据
 * @param {String} enodebid : 基站iD  {String} cellid ：小区ID
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.loadSectoroOtherData = function IntelligentRoadTest_loadSectoroOtherData(enodebid , cellid) {

    var sqlList = [];
    var city = $('#sectorCityName').text().trim();
    var country = $('#sectorDistrictName').text().trim();
    var list = ["IntelligentRoadTestV2_09_sectorMessage" ,"DAY:"+IntelligentRoadTest.day , "ENODEBID:" + enodebid , "CELLID:" + cellid];
    var list2 = ["IntelligentRoadTestV2_10_getSectorOtherMessage" ,"DAY:"+IntelligentRoadTest.day , "ENODEBID:" + enodebid , "CELLID:" + cellid];
    sqlList.push(list);
    sqlList.push(list2);
    var funcList = [IntelligentRoadTest.dealSectorOtherData , IntelligentRoadTest.dealSectorOtherData2];
    var database = [3 , 3];
    progressbarTwo.submitSql(sqlList , funcList , database);
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealSectorOtherData
 * @funcdesc IntelligentRoadTest.loadSectoroOtherData方法中查询的回调函数
 * @param {Object} data ： 查询返回的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealSectorOtherData = function IntelligentRoadTest_dealSectorOtherData(data) {
//	IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.circle);
    var result = callBackChangeData(data);
    if(result.length > 0){
        IntelligentRoadTest.sectorCompleteVM.sectorOtherData = result[0];
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealSectorOtherData2
 * @funcdesc 处理从数据库查询回来的扇区覆盖率和rsrp均值以及mr记录数的方法
 * @param {Object} data 查询返回的数据
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealSectorOtherData2 = function IntelligentRoadTest_dealSectorOtherData2 (data){
    var result = callBackChangeData(data);
    // console.log(result);
    if(result.length > 0){
        
        for(var i = 0; i < result.length; i++){
            if(result[i].agps_type == 1){
                IntelligentRoadTest.sectorCompleteVM.changeableData.cover_rate =  result[i].cover_rate; //覆盖率
                IntelligentRoadTest.sectorCompleteVM.changeableData.rsrp_avg =  result[i].rsrp_avg; //rsrp均值
                IntelligentRoadTest.sectorCompleteVM.changeableData.mr_count =  result[i].mr_count; //mr记录数
            }else{
                IntelligentRoadTest.sectorCompleteVM.changeableData.cover_rate_allmr =  result[i].cover_rate; //覆盖率
                IntelligentRoadTest.sectorCompleteVM.changeableData.rsrp_avg_allmr =  result[i].rsrp_avg; //rsrp均值
                IntelligentRoadTest.sectorCompleteVM.changeableData.mr_count_allmr =  result[i].mr_count; //mr记录数
            }
        }

    }else{
        IntelligentRoadTest.sectorCompleteVM.changeableData.cover_rate =  ""; //覆盖率
        IntelligentRoadTest.sectorCompleteVM.changeableData.rsrp_avg =  ""; //rsrp均值
        IntelligentRoadTest.sectorCompleteVM.changeableData.mr_count =  ""; //mr记录数

        IntelligentRoadTest.sectorCompleteVM.changeableData.cover_rate_allmr =  ""; //覆盖率
        IntelligentRoadTest.sectorCompleteVM.changeableData.rsrp_avg_allmr =  ""; //rsrp均值
        IntelligentRoadTest.sectorCompleteVM.changeableData.mr_count_allmr =  ""; //mr记录数
    }

}

IntelligentRoadTest.sortNrSectorByMrCount = function(topSector){
    var list = [];
    for(var j=0;j<topSector.length;j++){
        var sector = topSector[j].split(",");
        //基站号,小区号,距离，数量,平均RSRP,排序
        //513108,51,262,2817,-96.54,1
        var obj ={
            enodeb_id :sector[0],
            cell_id :sector[1],
            count : sector[3]
        };
        list.push(obj);
    }
    list.sort(compare("count"));
    list.reverse();
    for(var i = 0; i < list.length; i++){
    	list[i].sortFlag = i;
    }
    return list;
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.setChangealbeDataObj
 * @funcdesc 设置扇区详情页中根据图层配置变化而变化的指标的对象（加载栅格之后调用）
 * @param {String} type ：标识扇区类型  m3Sector 、  olSector 、cbSector 和其他
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.setChangealbeDataObj = function (type){
    if(IntelligentRoadTest.sectorCompleteVM != null){
        var data = IntelligentRoadTest.sectorCompleteVM.sectorData;
        if(type == "m3Sector"){ //当前图层配置为m3干扰图层
            IntelligentRoadTest.sectorCompleteVM.currentGridRateName = "MOD3干扰";
            IntelligentRoadTest.sectorCompleteVM.sector_grid_count = data.m3_grid_count; //专题栅格数
            IntelligentRoadTest.sectorCompleteVM.sector_zhuanti_agps_mr = data.agps_m3mrnum; //专题AGPSMR记录数
            IntelligentRoadTest.sectorCompleteVM.sector_zhuanti_all_mr = data.m3mrnum; //专题全量MR记录数
            if(data.m3_grid_count != null && data.m3_grid_count != ""){
                IntelligentRoadTest.sectorCompleteVM.sector_grid_area = parseInt(data.m3_grid_count) * 20 * 20; //专题栅格面积
            }
        }else if(type == "olSector"){ //重叠扇区
            IntelligentRoadTest.sectorCompleteVM.currentGridRateName = "重叠覆盖";
            IntelligentRoadTest.sectorCompleteVM.sector_grid_count = data.ol_grid_count; //专题栅格数
            IntelligentRoadTest.sectorCompleteVM.sector_zhuanti_agps_mr = data.agps_olmrnum; //专题AGPSMR记录数
            IntelligentRoadTest.sectorCompleteVM.sector_zhuanti_all_mr = data.olmrnum; //专题全量MR记录数
            if(data.ol_grid_count != null && data.ol_grid_count != ""){
                IntelligentRoadTest.sectorCompleteVM.sector_grid_area = parseInt(data.ol_grid_count) * 20 * 20; //专题栅格面积
            }
        }else if(type == "cbSector"){ //越区扇区
            IntelligentRoadTest.sectorCompleteVM.currentGridRateName = "越区覆盖";
            IntelligentRoadTest.sectorCompleteVM.sector_grid_count = data.cb_grid_count; //专题栅格数
            IntelligentRoadTest.sectorCompleteVM.sector_zhuanti_agps_mr = data.cbmrnum; //专题AGPSMR记录数
            IntelligentRoadTest.sectorCompleteVM.sector_zhuanti_all_mr = ""; //专题全量MR记录数 越区扇区没有全量MR记录数
            if(data.cb_grid_count != null && data.cb_grid_count != ""){
                IntelligentRoadTest.sectorCompleteVM.sector_grid_area = parseInt(data.cb_grid_count) * 20 * 20; //专题栅格面积
            }
        }else{ //普通扇区
            IntelligentRoadTest.sectorCompleteVM.currentGridRateName = null;
        }
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.loadAlarmData
 * @funcdesc 取弱区主服务小区（top5）告警表格数据
 * @param {String} enodebid : 基站iD  {String} cellid ：小区ID
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.loadAlarmData = function IntelligentRoadTest_loadAlarmData(enodebid , cellid) {

    var sqlList = [];
    var city = $('#sectorCityName').text().trim();
    var country = $('#sectorDistrictName').text().trim();
    var endDay = IntelligentRoadTest.day;
    var startDay = new Date(dealDateString(endDay).getTime() - 6 * 24 * 60 * 60 * 1000).Format("yyyyMMdd");
    var list = ["IntelligentRoadTestV2_12_polygonAlarmTable" ,
        "STARTDAY:" + startDay , "ENDDAY:" + endDay , "ENODEBID:" + enodebid , "CELLID:"  + cellid
    ];
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealAlarmData];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database);
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealAlarmData
 * @funcdesc IntelligentRoadTest.loadAlarmData方法中查询的回调函数
 * @param {Object} data ： 查询返回的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealAlarmData = function  IntelligentRoadTest_dealAlarmData(data){
    var result = callBackChangeData(data);
    // console.log(result);
    IntelligentRoadTest.sectorCompleteVM.alarmList = result;
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.loadKPIData
 * @funcdesc 查询指定扇区的KPI指标
 * @param {String} enodebid : 基站iD  {String} cellid ：小区ID
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.loadKPIData = function IntelligentRoadTest_loadKPIData(enodebid , cellid) {

    var sqlList = [];
    var city = $('#sectorCityName').text().trim();
    var country = $('#sectorDistrictName').text().trim();
    var endDay = IntelligentRoadTest.day;
    var startDay = new Date(dealDateString(endDay).getTime() - 6 * 24 * 60 * 60 * 1000).Format("yyyyMMdd");
    var list = ["IntelligentRoadTestV2_14_polygonKPITable",
        "STARTDAY:" + startDay , "ENDDAY:" + endDay , "ENODEBID:" + enodebid , "CELLID:"  + cellid
    ];
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealkpiData];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database);
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealkpiData
 * @funcdesc IntelligentRoadTest.loadKPIData方法中查询的回调函数
 * @param {Object} data ： 查询返回的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealkpiData = function IntelligentRoadTest_dealkpiData(data){
    var result = callBackChangeData(data);
    // console.log(result);
    if(result.length > 0){
        for(var i = 0 ; i < result.length ; i++){
            result[i].day = dealDateString(result[i].day).Format("yyyy-MM-dd");
        }
    }
    IntelligentRoadTest.sectorCompleteVM.kpiList = result ;
}



//扇区
/**
 * ********************************
 * @funcname IntelligentRoadTest.getSectorMessageByCondition
 * @funcdesc 扇区的模糊搜索
 * @param
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getSectorMessageByCondition = function IntelligentRoadTest_getSectorMessageByCondition(){
    if($("#searchText").val().trim()==''){
        $('#searchResult').hide();
        return;
    }
    var sqlList = [];
    var city = $('#sectorCityName').text().trim();
    // var country = $('#sectorDistrictName').text().trim();
    var list = ["IntelligentRoadTestAnalysi_v2_getSectorByCondition" ,"DAY:"+IntelligentRoadTest.day,"CITY:"+city,];
    // list.push("MKTCENTER:");
    /*if(IntelligentRoadTest.sectorCountryId != null && IntelligentRoadTest.sectorCountryId != ""
        && IntelligentRoadTest.sectorCountryId != "null"){
        list.push("COUNTRY_ID:" + " and COUNTRY = '" + IntelligentRoadTest.sectorCountryId + "'");
    }
    if(IntelligentRoadTest.sectorMktCenterId != null && IntelligentRoadTest.sectorMktCenterId != ""
        && IntelligentRoadTest.sectorMktCenterId != "null"){
        list.push("MKTCENTER_ID:" + " and MKTCENTER = '" + IntelligentRoadTest.sectorMktCenterId + "'");
    }*/
    var condition = "";
    if($("#searchText").val().trim() != ""){
        var selectCondition = IntelligentRoadTest.dealSelectConditionString($("#searchText").val().trim());
        condition = "and (cell_name like '%" + selectCondition + "%' "
            + " or concat_ws('_' , g.ENODEB_ID , g.cell_id) like '%" + selectCondition + "%')";
    }
    list.push("CONDITION:" + condition);
    if(IntelligentRoadTest.sectorObj.name != "sector"){ //在专题扇区列表中
        var sector_type = "and " + IntelligentRoadTest.sectorObj.type + "=1"; //增加查询条件
        list.push("TYPE:" + sector_type); //在专题扇区列表只能搜索专题扇区
        var sectorType = "g." + IntelligentRoadTest.sectorObj.type + " as sector_type ,"  ; //将专题标识字段查询出来
        if(IntelligentRoadTest.sectorObj.name == "olSector"){ //重叠覆盖
            sectorType += "round(g.OLMRRAT * 100 , 2) as sector_rate ,";
        }else if(IntelligentRoadTest.sectorObj.name == "cbSector"){ //越区覆盖
            sectorType += "round(g.CBMRRAT * 100 , 2) as sector_rate,";
        }else if(IntelligentRoadTest.sectorObj.name == "m3Sector"){ //越区覆盖
            sectorType += "round(g.M3MRRAT * 100 , 2) as sector_rate,";
        }
        list.push("SECTORTYPE:" + sectorType);
    }
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealSectorMessageByCondition];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database);
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealSectorMessageByCondition
 * @funcdesc 扇区模糊搜索查询的回调函数
 * @param {Object} data ： 查询返回的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealSectorMessageByCondition = function IntelligentRoadTest_dealSectorMessageByCondition(data){
    var result = callBackChangeData(data);
    // console.log("基站搜索");

    IntelligentRoadTest.seachResult ={type:"sector",result:result};
    var resultStr = '';
    for(var i=0;i<result.length;i++){
        resultStr += '<li type="sector" clickId="'+result[i].enodeb_id+'_'+result[i].cell_id+'"><span>'+result[i].cell_name+'</span><span>'+result[i].enodeb_id+'_'+result[i].cell_id+'</span><span>扇区</span></li>';
    }
    if(resultStr != ''){
        $('#searchResult').html(resultStr);
        setTimeout(function(){
            if($('#searchText').val().trim() != ""){
                $('#searchResult').show();
            }
        },100);
    }else{
        $('#searchResult').html('无结果');
        setTimeout(function(){
            if($('#searchText').val().trim() != ""){
                $('#searchResult').show();
            }
        },100);
    }

    $('#searchResult li').unbind('click').bind('click',function(){
        var type = $(this).attr('type');
        var clickId = $(this).attr('clickId');
        if(IntelligentRoadTest.seachResult.type == type){
            for(var i=0;i<IntelligentRoadTest.seachResult.result.length;i++){
                var id = IntelligentRoadTest.seachResult.result[i].enodeb_id+'_'+IntelligentRoadTest.seachResult.result[i].cell_id;
                if(clickId==id){
                    //跳转到扇区详情
                    if(IntelligentRoadTest.circle){
                        //注销
                        var itemSectorData = {
                            obj_type:IntelligentRoadTest.circle.obj_type,
                            pointsString:null,
                            type:2,
                            decide:1,
                            statn_id:IntelligentRoadTest.circle.statn_id,
                            cell_id:IntelligentRoadTest.circle.cell_id,
                            day:IntelligentRoadTest.circle.day
                        };
                        IntelligentRoadTest.logOutPolygonToLayer(itemSectorData);
                    }
                    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.circle);
                    IntelligentRoadTest.showSector(IntelligentRoadTest.seachResult.result[i],IntelligentRoadTest.sectorObj.name);
                    IntelligentRoadTest.sectorVM.showMessage(IntelligentRoadTest.seachResult.result[i]);
                    var textList=		[
                        {"key":"区域名称","val":IntelligentRoadTest.seachResult.result[i].cell_name},
                        {"key":"区域编号","val":IntelligentRoadTest.seachResult.result[i].enodeb_id},
                    ]
                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(IntelligentRoadTest.seachResult.result[i].longitude_mid_baidu,IntelligentRoadTest.seachResult.result[i].latitude_mid_baidu), 20);
                    IntelligentRoadTest.searchShowMkLable(IntelligentRoadTest.seachResult.result[i].longitude_mid_baidu,IntelligentRoadTest.seachResult.result[i].latitude_mid_baidu,textList)
                    var item=IntelligentRoadTest.seachResult.result[i];
                    var object_id = item.enodeb_id*256+item.cell_id;
                    IntelligentRoadTest.loadPoorAreaGrid(IntelligentRoadTest.day,item.city_id,item.country_id,object_id,1,item.enodeb_id,item.cell_id);
                    var poorAreaList = [] ;//弱覆盖区域集合
                    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
                        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
                    }
                    var nearPoorAreaList = []; //附近弱覆盖区域集合
                    if(item.nb_poor_coverage_set != null && item.nb_poor_coverage_set != ''){
                        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.nb_poor_coverage_set);
                    }
                    IntelligentRoadTest.polygonList=[];
                    $('.linkCell').removeClass("linkCellHover");
                    // IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList,1);
                    // IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList,2);
                    // console.log("匹配到扇区结果");
                    break;
                }
            }
        }
        $('#searchResult').hide();
    });

}

/**
 * ********************************
 * @funcname IntelligentRoadTest.getSectorCovRateData
 * @funcdesc 获取专题扇区的覆盖率趋势图和占比趋势图的数据
 * @param {String} enodebid:基站ID
 *{String} cellid ： 扇区ID
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getSectorCovRateData = function(enodebid , cellid , pci){
    var endDay = IntelligentRoadTest.day;
    var startDay = new Date(dealDateString(endDay).getTime() - 6 * 24 * 60 * 60 * 1000).Format("yyyyMMdd");
    var rateName = "";
    var showName = ""; //占比之前显示的名称
    if(IntelligentRoadTest.sectorObj.name == "m3Sector"){
        rateName = "M3MRRAT";
        showName = "MOD3干扰";
    }else if(IntelligentRoadTest.sectorObj.name == "olSector"){
        rateName = "OLMRRAT";
        showName = "重叠覆盖";
    }else if(IntelligentRoadTest.sectorObj.name == "cbSector"){
        rateName = "CBMRRAT";
        showName = "越区覆盖";
    }else{ //普通扇区不需要查询这个数据
        return;
    }
    var sqlList = [];
    var list = ["IntelligentRoadTestAnalysisV2_getSectorCovRate" , "STARTDAY:" + startDay , "ENDDAY:" + endDay , "RATE:" + rateName , "ENODEBID:" + enodebid , "CELLID:" + cellid];
    var list2 = ["IntelligentRoadTestAnalysisV2_getSectorZhanBiRate" , "STARTDAY:" + startDay , "ENDDAY:" + endDay , "RATE:" + rateName , "ENODEBID:" + enodebid , "CELLID:" + cellid];
    var funcList = [IntelligentRoadTest.dealSectorCovRateData , IntelligentRoadTest.dealSectorCovRateData];
    if(IntelligentRoadTest.sectorObj.name == "m3Sector"){ //MOD3干扰的占比趋势图比较特殊，与其他两个不同
        list2 = ["IntelligentRoadTestAnalysisV2_getSectorM3FGanRaoRate" , "STARTDAY:" + startDay , "ENDDAY:" + endDay , "RATE:" + rateName , "ENODEBID:" + enodebid , "CELLID:" + cellid];
        funcList = [IntelligentRoadTest.dealSectorCovRateData , IntelligentRoadTest.dealM3SectorZhanBiData];
    }
    sqlList.push(list);
    sqlList.push(list2);
    var database = [3 , 3];
    progressbarTwo.submitSql(sqlList , funcList , database , [[startDay , showName , "cover"],[startDay , showName , "zhanbi",pci]]);
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealSectorCovRateData
 * @funcdesc IntelligentRoadTest.getSectorCovRateData这个方法中的查询的回调函数
 * @param {Object} data：查询返回的数据 {Array} params ： 参数列表 其中包含开始时间以及要显示的专题名称
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealSectorCovRateData = function IntelligentRoadTest_dealSectorCovRateData(data , params){
    var result = callBackChangeData(data);
    IntelligentRoadTest.showSectorCoverRateTrend(result , params[0] , params[1] , params[2]); //显示两个趋势图
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealM3SectorZhanBiData
 * @funcdesc 处理MOD3干扰的专题的MOD3干扰度数据的回调函数
 * @param {Object} data : 查询返回的数据  {Array} params : 参数 params[0]是开始时间
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealM3SectorZhanBiData = function IntelligentRoadTest_dealM3SectorZhanBiData(data , params){
    var result = callBackChangeData(data);
    // console.log(result);
    for(var i = 0; i < result.length; i++){
    	if(result[i].day.toString().indexOf("-") < 0){ //日期格式不是 yyyy-MM-dd
            result[i].day = dealDateString(result[i].day).Format("yyyy-MM-dd"); //转换一下日期格式
        }
    }
    var afterDealData = IntelligentRoadTest.dealM3ZhanBiData(result , params); //处理返回一个可直接用于echarts图展示的数据
    IntelligentRoadTest.showM3SectorZhanBiTrend(afterDealData , params[3]);
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.getM3ZhanBiData
 * @funcdesc 将数据处理成可直接用于echarts图展示的对象
 * @param {Array} result : 数据
 * @return {Object}
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealM3ZhanBiData = function(result , params){

    var xData = []; //横坐标的值 （日期）
    var sc0Arr = []; //主扇区模0的数组
    var sc1Arr = []; //主扇区模1的数组
    var sc2Arr = []; //主扇区模2的数组
    var nc0Arr = []; //邻区扇区模0的数组
    var nc1Arr = []; //邻区扇区模1的数组
    var nc2Arr = []; //邻区扇区模2的数组
    var dayArr = []; //存放完整日期的数组

    var startDay = params[0]; //开始时间
    //处理数据
    for(var i = 0; i < 7; i++){
        var day = new Date(dealDateString(startDay).getTime() + i * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
        dayArr.push(day);
        xData.push(day.substr(5));
        sc0Arr.push(0);
        sc1Arr.push(0);
        sc2Arr.push(0);
        nc0Arr.push(0);
        nc1Arr.push(0);
        nc2Arr.push(0);
    }

    //将result的数据放入到数组中
    for(var m = 0 ; m < result.length ; m++){
        var index = dayArr.indexOf(result[m].day.toString()); //在数组中的位置
        if(index > -1){
            sc0Arr[index] = result[m].sc0;
            sc1Arr[index] = result[m].sc1;
            sc2Arr[index] = result[m].sc2;
            nc0Arr[index] = result[m].nc0;
            nc1Arr[index] = result[m].nc1;
            nc2Arr[index] = result[m].nc2;
        }
    }
    //返回数据
    var dataObject = {
        xData : xData,
        sc0Arr : sc0Arr,
        sc1Arr : sc1Arr,
        sc2Arr : sc2Arr,
        nc0Arr : nc0Arr,
        nc1Arr : nc1Arr,
        nc2Arr : nc2Arr
    };

    return dataObject;
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.showM3SectorZhanBiTrend
 * @funcdesc 绘制MOD3干扰占比趋势图的柱状图
 * @param {Object} object ：用于展示的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.showM3SectorZhanBiTrend = function(object , pci){
    //初始化echarts对象
    if(IntelligentRoadTest.sectorZhanBiCharts == null){
        IntelligentRoadTest.sectorZhanBiCharts = echarts.init(document.getElementById("sectorZhanBiChart"));
    }else{
        IntelligentRoadTest.sectorZhanBiCharts.dispose();
        IntelligentRoadTest.sectorZhanBiCharts = echarts.init(document.getElementById("sectorZhanBiChart"));
    }
    //绘制折线图
    var colorArr = [
        '#ec2929',
        '#1669f1',
        '#0ab070',
        '#f0819e',
        '#7cb6f2',
        '#78e9d2'];
    var lineStyleArr = ['dotted' , 'dotted' , 'dotted' , 'dotted' ,'dotted' ,'dotted']; //线的样式（虚线还是实线）
    if(pci != null && pci != ""){
        var mod = parseInt(pci) % 3;
        if(mod == 0){ //只有与pci取模之后在同一个模上的线才是实线的。表示这个扇区当前是在哪个模上
            lineStyleArr[0] = "solid";
            lineStyleArr[3] = "solid";
        }else if(mod == 1){
            lineStyleArr[1] = "solid";
            lineStyleArr[4] = "solid";
        }else{
            lineStyleArr[2] = "solid";
            lineStyleArr[5] = "solid";
        }
    }
    var option1 = {
        legend:{
            left:'center',
            top:'-1%',
            data:["主扇区模0" , "主扇区模1" , "主扇区模2" , "邻扇区模0" , "邻扇区模1" , "邻扇区模2"],
        },
        tooltip: {
            trigger: 'axis',
            axisPointer:{
                type:'shadow'
            }
            /* ,
             formatter: function (params) {
                 if(params[0].value == null){
                     return params[0].axisValue + "<br/>" + params[0].seriesName + ": -" ;
                 }else{
                     if(params[0].data.type == null){
                         return params[0].axisValue + "<br/>" + params[0].seriesName + ":" + params[0].value + danwei;
                     }else{
                         return params[0].axisValue + "<br/>" + params[0].seriesName + ":" + params[0].value + danwei
                             + "<br/>" + "弱栅格恢复数:" + params[0].data.poor_cove_reco_count + "<br/>" +
                             "弱栅格数:" + params[0].data.poor_cove_grid_count;
                     }
                 }
             }*/
        },
        grid: { //图表在div的布局控制
            top: '20%',
            left: '3%',
            right: '12%',
            bottom: '15%',
            containLabel: true
        },
        dataZoom : {//实现缩放功能
            type : "slider" ,
            show : true,
            // realtime : true,
            start : 0 ,
            bottom : '1%'

        },
        xAxis: { //X轴样式
            type: 'category',
            boundaryGap: true,
            axisLabel: {
                /*interval:0,*/
//					rotate:10,
                align:'center',
            },
            axisLine: {
                show: true,
                lineStyle:{
                    color: '#686c78',
                }
            },
            axisTick:{
                show:true,
                alignWithLabel:true,
            },
            data:object.xData,
        },
        yAxis: { //Y轴样式
            type: 'value',
            name:"%",
            scale:true,
            // max:100,
            position: 'left',
            axisLine: {
                show: true,
                lineStyle:{
                    color: '#686c78',
                },
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show:false,
                lineStyle: {
                    color: '#EAEEF7',
                }
            }
        }
        ,
        series: [
            { //sc0
                type: 'line',
                symbolSize: 6,
                name: "主扇区模0",
                smooth: true,
                lineStyle: {
                    normal: {
                        color: colorArr[0],
                        width: 2,
                        type : lineStyleArr[0]
                    }
                },
                itemStyle: {
                    normal: {
                        color: colorArr[0],
                        borderColor: colorArr[0]
                    }
                },
                data:object.sc0Arr
            },
            {  //sc1
                type: 'line',
                symbolSize: 6,
                name: "主扇区模1",
                smooth: true,
                lineStyle: {
                    normal: {
                        color: colorArr[1],
                        width: 2,
                        type : lineStyleArr[1]
                    }
                },
                itemStyle: {
                    normal: {
                        color: colorArr[1],
                        borderColor: colorArr[1]
                    }
                },
                data:object.sc1Arr
            },
            {  //sc1
                type: 'line',
                symbolSize: 6,
                name: "主扇区模2",
                smooth: true,
                lineStyle: {
                    normal: {
                        color:colorArr[2],
                        width: 2,
                        type : lineStyleArr[2]
                    }
                },
                itemStyle: {
                    normal: {
                        color: colorArr[2],
                        borderColor: colorArr[2]
                    }
                },
                data:object.sc2Arr
            },
            { //nc0
                type: 'line',
                symbolSize: 6,
                name: "邻扇区模0",
                smooth: true,
                lineStyle: {
                    normal: {
                        color: colorArr[3],
                        width: 2,
                        type : lineStyleArr[3]
                    }
                },
                itemStyle: {
                    normal: {
                        color: colorArr[3],
                        borderColor: colorArr[3]
                    }
                },
                data:object.nc0Arr
            },
            { //nc1
                type: 'line',
                symbolSize: 6,
                name: "邻扇区模1",
                smooth: true,
                lineStyle: {
                    normal: {
                        color:colorArr[4],
                        width: 2,
                        type : lineStyleArr[4]
                    }
                },
                itemStyle: {
                    normal: {
                        color: colorArr[4],
                        borderColor: colorArr[4]
                    }
                },
                data:object.nc1Arr
            },
            { //nc2
                type: 'line',
                symbolSize: 6,
                name: "邻扇区模2",
                smooth: true,
                lineStyle: {
                    normal: {
                        color: colorArr[5],
                        width: 2,
                        type : lineStyleArr[5]
                    }
                },
                itemStyle: {
                    normal: {
                        color: colorArr[5],
                        borderColor: colorArr[5]
                    }
                },
                data:object.nc2Arr
            }
        ]
    };
    IntelligentRoadTest.sectorZhanBiCharts.setOption(option1);
    IntelligentRoadTest.sectorZhanBiCharts.resize();

}

/**
 * ********************************
 * @funcname IntelligentRoadTest.showSectorCoverRateTrend
 * @funcdesc 显示专题扇区的占比趋势图和覆盖趋势图
 * @param  {Array} result : 查询返回的数据经过callbackChangeData转换之后的数据
 *  {String} startDay ： 开始日期
 *  {String} 扇区类型名称
 *  {String} type 标识是占比趋势还是覆盖率趋势
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.showSectorCoverRateTrend = function(result , startDay , typeName , type){

    var xData = []; //x轴数据

    if(type == "cover"){ //覆盖率趋势图
        //覆盖率趋势图的echarts对象
        if(IntelligentRoadTest.sectorCoverCharts == null){
            IntelligentRoadTest.sectorCoverCharts = echarts.init(document.getElementById("sectorCoverChart"));
        }else{
            IntelligentRoadTest.sectorCoverCharts.dispose();
            IntelligentRoadTest.sectorCoverCharts = echarts.init(document.getElementById("sectorCoverChart"));
        }
        var covRateArr = []; //覆盖率的数据
        for(var i = 0; i < 7; i++){
            var day = new Date(dealDateString(startDay).getTime() + i * 24 * 60 * 60 * 1000 ).Format("yyyy-MM-dd");
            xData.push(day.substr(5));
            var temp = new Date(dealDateString(startDay).getTime() + i * 24 * 60 * 60 * 1000 ).Format("yyyyMMdd");
            for(var m = 0 ; m < result.length; m++){
                if(result[m] != null && result[m].day.toString() == temp){ //数据中有当天的数据
                    covRateArr[i] = result[m].cov_rate;
                }else if(covRateArr[i] == null){ //防止二次赋值把原来有的值覆盖掉
                    covRateArr[i] = null ;
                }
            }
            if(result.length == 0){ //都没有数据，全部数据为null会导致echart报错，这里如果没有数据则置为0
                covRateArr[i] = 0;
            }
        }
        var option1 = {
            legend:{
                left:'center',
                top:'2%',
                data:["覆盖率"],
            },
            tooltip: {
                trigger: 'axis',
                axisPointer:{
                    type:'shadow'
                }
                /* ,
                 formatter: function (params) {
                     if(params[0].value == null){
                         return params[0].axisValue + "<br/>" + params[0].seriesName + ": -" ;
                     }else{
                         if(params[0].data.type == null){
                             return params[0].axisValue + "<br/>" + params[0].seriesName + ":" + params[0].value + danwei;
                         }else{
                             return params[0].axisValue + "<br/>" + params[0].seriesName + ":" + params[0].value + danwei
                                 + "<br/>" + "弱栅格恢复数:" + params[0].data.poor_cove_reco_count + "<br/>" +
                                 "弱栅格数:" + params[0].data.poor_cove_grid_count;
                         }
                     }
                 }*/
            },
            grid: { //图表在div的布局控制
                top: '10%',
                left: '3%',
                right: '12%',
                bottom: '15%',
                containLabel: true
            },
            dataZoom : {//实现缩放功能
                type : "slider" ,
                show : true,
                // realtime : true,
                start : 0 ,
                bottom : '1%'

            },
            xAxis: { //X轴样式
                type: 'category',
                boundaryGap: true,
                axisLabel: {
                    /*interval:0,*/
//					rotate:10,
                    align:'center',
                },
                axisLine: {
                    show: true,
                    lineStyle:{
                        color: '#686c78',
                    }
                },
                axisTick:{
                    show:true,
                    alignWithLabel:true,
                },
                data:xData,
            },
            yAxis: { //Y轴样式
                type: 'value',
                name:"%",
                scale:true,
                // max:100,
                position: 'left',
                axisLine: {
                    show: true,
                    lineStyle:{
                        color: '#686c78',
                    },
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show:false,
                    lineStyle: {
                        color: '#EAEEF7',
                    }
                }
            }
            ,
            series: { //图表数据样式
                type: 'line',
                symbolSize: 6,
                name: "覆盖率",
                smooth: true,
                lineStyle: {
                    normal: {
                        color: '#55b7f1',
                        width: 2,
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#55b7f1",
                        borderColor: "#55b7f1",
                    }
                },
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#D5ECFA' // 0% 处的颜色
                            },
                                {
                                    offset: 1,
                                    color: '#FFFFFF' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        }
                    },
                },
                data:covRateArr
            }
        };
        IntelligentRoadTest.sectorCoverCharts.setOption(option1);
        IntelligentRoadTest.sectorCoverCharts.resize();
    }else{ //占比趋势图
        //占比趋势图的echarts对象
        if(IntelligentRoadTest.sectorZhanBiCharts == null){
            IntelligentRoadTest.sectorZhanBiCharts = echarts.init(document.getElementById("sectorZhanBiChart"));
        }else{
            IntelligentRoadTest.sectorZhanBiCharts.dispose();
            IntelligentRoadTest.sectorZhanBiCharts = echarts.init(document.getElementById("sectorZhanBiChart"));
        }
        var zhanbiArr = []; //占比的数据
        for(var k = 0; k < 7; k++){
            var day = new Date(dealDateString(startDay).getTime() + k * 24 * 60 * 60 * 1000 ).Format("yyyy-MM-dd");
            xData.push(day.substr(5));
            var temp = new Date(dealDateString(startDay).getTime() + k * 24 * 60 * 60 * 1000 ).Format("yyyyMMdd");
            for(var n = 0 ; n < result.length; n++){
                if(result[n] != null && result[n].day.toString() == temp){ //数据中有当天的数据
                    zhanbiArr[k] = result[n].mr_rate;
                }else if(zhanbiArr[k] == null){
                    zhanbiArr[k] = null; //需要修改
                }
            }
            if(result.length == 0){ //都没有数据，全部数据为null会导致echart报错，这里如果没有数据则置为0
                zhanbiArr[k] = 0;
            }
        }

        var option2 = {
            legend:{
                left:'center',
                top:'2%',
                data:[typeName + "占比"],
            },
            tooltip: {
                trigger: 'axis',
                axisPointer:{
                    type:'shadow'
                }
                /*,
                formatter: function (params) {
                    if(params[0].value == null){
                        return params[0].axisValue + "<br/>" + params[0].seriesName + ": -" ;
                    }else{
                        if(params[0].data.type == null){
                            return params[0].axisValue + "<br/>" + params[0].seriesName + ":" + params[0].value + danwei;
                        }else{
                            return params[0].axisValue + "<br/>" + params[0].seriesName + ":" + params[0].value + danwei
                                + "<br/>" + "弱栅格恢复数:" + params[0].data.poor_cove_reco_count + "<br/>" +
                                "弱栅格数:" + params[0].data.poor_cove_grid_count;
                        }
                    }
                }*/
            },
            grid: { //图表在div的布局控制
                top: '10%',
                left: '3%',
                right: '12%',
                bottom: '15%',
                containLabel: true
            },
            dataZoom : {//实现缩放功能
                type : "slider" ,
                show : true,
                // realtime : true,
                start : 0 ,
                bottom : '1%'

            },
            xAxis: { //X轴样式
                type: 'category',
                boundaryGap: true,
                axisLabel: {
                    /*interval:0,*/
//					rotate:10,
                    align:'center',
                },
                axisLine: {
                    show: true,
                    lineStyle:{
                        color: '#686c78',
                    }
                },
                axisTick:{
                    show:true,
                    alignWithLabel:true,
                },
                data:xData,
            },
            yAxis: { //Y轴样式
                type: 'value',
                name:"%",
                scale:true,
                // max:100,
                position: 'left',
                axisLine: {
                    show: true,
                    lineStyle:{
                        color: '#686c78',
                    },
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show:false,
                    lineStyle: {
                        color: '#EAEEF7',
                    }
                }
            }
            ,
            series: { //图表数据样式
                type: 'line',
                symbolSize: 6,
                name: typeName + "占比",
                smooth: true,
                lineStyle: {
                    normal: {
                        color: '#55b7f1',
                        width: 2,
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#55b7f1",
                        borderColor: "#55b7f1",
                    }
                },
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#D5ECFA' // 0% 处的颜色
                            },
                                {
                                    offset: 1,
                                    color: '#FFFFFF' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        }
                    },
                },
                data:zhanbiArr
            }
        };
        IntelligentRoadTest.sectorZhanBiCharts.setOption(option2);
        IntelligentRoadTest.sectorZhanBiCharts.resize();
    }

}

IntelligentRoadTest.getSectorTypeName = function(){
    var rateName = "";
    if(IntelligentRoadTest.sectorObj.name == "olSector"){
        rateName = "重叠覆盖";
    }else if(IntelligentRoadTest.sectorObj.name == "cbSector"){
        rateName = "越区覆盖";
    }else if(IntelligentRoadTest.sectorObj.name == "m3Sector"){
        rateName = "MOD3干扰";
    }
    return rateName;
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.showSectorStationCircle
 * @funcdesc 点击绘制站间列表圆形按钮时调用的方法
 * @param {int} distance ：站间距  {Array} spaceStationList 站间列表   {Object} sectorData ： 扇区对象
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.showSectorStationCircle = function(distance , spaceStationList , sectorData){

    if (IntelligentRoadTest.sectorCircleCanvas == null) {
        IntelligentRoadTest.sectorCircleCanvas = new BMap.CanvasLayer({
            update: reDraw,
            paneName : 'mapPane',
            zIndex:-1
        });
    }

    function reDraw() {
        var context = this.canvas.getContext("2d");
        if (!context) {
            return;
        }
        context.clearRect(0,0,context.canvas.width, context.canvas.height); //清除canvas图层中的东西
        IntelligentRoadTest.drawSectorStationCircle(context , distance , spaceStationList , sectorData)
    }
    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.sectorCircleCanvas);
    IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.sectorCircleCanvas); //将图层显示在地图上
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.drawSectorStationCircle
 * @funcdesc 绘制站间列表的圆形
 * @param {Object} context ：画笔对象  {int} distance ：站间距  {Array} spaceStationList 站间列表   {Object} sectorData ： 扇区对象
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.drawSectorStationCircle = function(context , distance , spaceStationList , sectorData){

    var colorArr = ["green" , "blue" , "red"]; //颜色
    var DValueArr = [1 , 1.5 , 2]; //倍数
    var lng = sectorData.longitude_mid_baidu;
    var lat = sectorData.latitude_mid_baidu;
    var point = new BMap.Point(lng, lat);
    //zoom:当前地图缩放级别
    var zoom = IntelligentRoadTest.map.getZoom();
    //center:当前地图可视范围中心点坐标
    var center = IntelligentRoadTest.map.getCenter();
    //bounds:地图可视区域
    var bound = IntelligentRoadTest.map.getSize();
    var pixelObj = IntelligentRoadTest.map.pointToPixel(point); //返回转换之后的像素对象 属性有x 和 y

    for(var i = 1; i < spaceStationList.length; i++){
        var lngOffset = IntelligentRoadTest.LngDistince(point , distance * DValueArr[i-1]  , IntelligentRoadTest.map);
        var lng2 = lng + parseFloat(lngOffset);
        var point2 = new BMap.Point(lng2 , lat);
        var pixelObj2 = IntelligentRoadTest.map.pointToPixel(point2); //返回转换之后的像素对象 属性有x 和 y
        var radius = Math.abs(pixelObj2.x - pixelObj.x);
        context.globalAlpha = 1; //线段不需要透明度，如果设置透明度的话比较难看出来每个扇形的分隔
        context.strokeStyle = colorArr[i-1];
        context.lineWidth  = 3;
        context.beginPath();
        context.arc(pixelObj.x,pixelObj.y,radius , 0 , 2 * Math.PI);
        context.closePath();
        context.stroke();
    }
}


//----------------------------扇区列表结束 ----------------------------------------



/*主页扇区搜索后绘制一个扇区，点击扇区显示扇区详情页*/

IntelligentRoadTest.drawSectorAfterSearch = function(sector){
    var point=new BMap.Point(sector.longitude_baidu,sector.latitude_baidu);
    if(sector.ant_azimuth!=null&&sector.band_mapping!=null) {
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.SearchSectorPolygon);
        var obj= IntelligentRoadTest.getSectorXYZ(sector.band_mapping);
        var assemble = IntelligentRoadTest.add_sector(point, obj.xy, obj.xy, obj.z, sector.ant_azimuth);
//	    	var assemble=IntelligentRoadTest.add_sector(point,0.0003,0.0003,3.5,list[i].ant_azimuth);
        var sectorPolygon = new BMap.Polygon(assemble);
        sectorPolygon.setFillColor("#4661AC");
        sectorPolygon.setStrokeWeight(1);
        sectorPolygon.addEventListener("click", function () {
            IntelligentRoadTest.getSectorMessageById(sector.base_statn_id , sector.cell_id , IntelligentRoadTest.day);
            IntelligentRoadTest.map.removeOverlay(this);
        });
        IntelligentRoadTest.map.addOverlay(sectorPolygon);
        IntelligentRoadTest.SearchSectorPolygon = sectorPolygon;
    }
}


/*专题扇区详情页如果预测距离大于200米则画一个虚框的扇形以及与预测位置的连线*/
IntelligentRoadTest.drawSectorAndLine = function(sector) {
    var img = "../js/IntelligentRoadTest/images/maker3.png";
    var predLocation = sector.pred_location_baidu;
    IntelligentRoadTest.clearSectorPredOverlays(); //先清除掉原有的线和标注点
    IntelligentRoadTest.sectorPredOverlaysArr = [];
    var lng = predLocation.split(",")[0];
    var lat = predLocation.split(",")[1];
    var obj = IntelligentRoadTest.getSectorXYZ(sector.band_mapping);
//		var pointArr=IntelligentRoadTest.add_sector(new BMap.Point(lng,lat),0.0003,0.0003,3.5,sector.ant_azimuth)
    var pointArr = IntelligentRoadTest.add_sector(new BMap.Point(lng, lat), obj.xy, obj.xy, obj.z, sector.ant_azimuth)
    lng = (pointArr[2].lng + pointArr[2].lng) / 2;
    lat = (pointArr[2].lat + pointArr[2].lat) / 2;

    var lng_2 = sector.longitude_mid_baidu;
    var lat_2 = sector.latitude_mid_baidu;
    var pointArr_2 = IntelligentRoadTest.add_sector(new BMap.Point(lng_2, lat_2), obj.xy, obj.xy, obj.z, sector.ant_azimuth)
    lng_2 = (pointArr_2[2].lng + pointArr_2[3].lng) / 2;
    lat_2 = (pointArr_2[2].lat + pointArr_2[2].lat) / 2;
    var point = new BMap.Point(lng, lat);
    var myIcon = new BMap.Icon(img, new BMap.Size(22, 32));
    var marker = new BMap.Marker(point, {icon: myIcon});  // 创建标注
    marker.setOffset(new BMap.Size(0, -14));
    IntelligentRoadTest.map.addOverlay(marker);
    IntelligentRoadTest.sectorPredOverlaysArr.push(marker);
    //画线条
    var polyline = new BMap.Polyline([
        new BMap.Point(lng_2, lat_2),
        new BMap.Point(lng, lat)
    ], {strokeColor: "#505872", strokeWeight: 2, strokeOpacity: 0.5});   //创建折线
    polyline.cell_name = sector.cell_name;
    IntelligentRoadTest.map.addOverlay(polyline);
    IntelligentRoadTest.sectorPredOverlaysArr.push(polyline);
//	    //画扇区 这里还需要在画一个预测偏位角的扇区，坐标和台账坐标一致。只是
    var point = new BMap.Point(sector.longitude_mid_baidu, sector.latitude_mid_baidu);
    if (sector.pred_azimuth != null && sector.band_mapping != null) { //绘制预测角度的扇区
        var assemble1 = IntelligentRoadTest.add_sector(point, obj.xy, obj.xy, obj.z, sector.pred_azimuth);
        var sectorPolygon1 = new BMap.Polygon(assemble1);
        sectorPolygon1.setFillColor("#F9C943"); //这里需要更换颜色
        sectorPolygon1.setStrokeWeight(2);
        sectorPolygon1.setStrokeStyle("dashed");
        sectorPolygon1.point2 = point;
        sectorPolygon1.cell_name = sector.cell_name;
        sectorPolygon1.isPred = true;
        IntelligentRoadTest.map.addOverlay(sectorPolygon1);
        IntelligentRoadTest.sectorPredOverlaysArr.push(sectorPolygon1);
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.clearSectorPredOverlays
 * @funcdesc 清除地图上的扇区预测位置点以及预测偏离角度的扇区覆盖物
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.clearSectorPredOverlays = function(){
    if(IntelligentRoadTest.sectorPredOverlaysArr != null && IntelligentRoadTest.sectorPredOverlaysArr.length > 0){
        for(var i = 0; i < IntelligentRoadTest.sectorPredOverlaysArr.length; i++){
            IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.sectorPredOverlaysArr[i]);
        }
        IntelligentRoadTest.sectorPredOverlaysArr = []; //重置数据
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.getPolylineAndSectorListIndex
 * @funcdesc 获取到最近扇区或者接入扇区的连线对应的左边的列表中的哪些index
 * @param {Array} list : 左侧详情页中的扇区列表
 *
 * @return {Array}
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getPolylineAndSectorListIndex = function(list){

    var indexArr = [];
    if(list != null && list.length > 0){
        for(var i = 0; i < list.length; i++){
        	if(list[i].distance != null && list[i].distance != "-"){ //距离不为空
        	    indexArr.push(i);
            }
        }
    }
    return indexArr;
}


/*------------------------------------------------专题弱区取该专题弱区的邻区数据展示专题扇区开始--------------------------------------------*/

//存放弱区专题邻区的数据的对象
IntelligentRoadTest.poorAreaNRZhuantiModel = {
    "800M_模0" : {},
    "800M_模1" : {},
    "800M_模2" : {},
    "1.8G_模0" : {},
    "1.8G_模1" : {},
    "1.8G_模2" : {},
    "2.1G_模0" : {},
    "2.1G_模1" : {},
    "2.1G_模2" : {},
    "2.6G_模0" : {},
    "2.6G_模1" : {},
    "2.6G_模2" : {}
};

IntelligentRoadTest.poorAreaNrZhuanutiSectorPoloyLineList = []; //存放弱区专题邻区的连线对象的数组

/**
 * ********************************
 * @funcname IntelligentRoadTest.getPoorAreaNearSectorData
 * @funcdesc 获取某个弱区的专题邻区数据
 * @param {int} city_id : 地市ID  {int} object_id : 弱区ID   {int} type : 指明要查询那种专题的邻区， 6为MOD3干扰  7为重叠覆盖 8为越区覆盖
 *          {String} day : 日期
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getPoorAreaNearSectorData = function( city_id , object_id , type ,  day){
    if(city_id != null && object_id != null && type != null && day != null){
        var sqlList = [];
        var list = ["IntelligentRoadTestAnalysisV3_getPoorAreaZhuanTiSector" , "DAY:" + day , "CITY_ID:" + city_id , "OBJECT_ID:" + object_id , "TYPE:" + type];
        sqlList.push(list);
        var funcList = [IntelligentRoadTest.dealPoorAreaNearSectorData];
        var database = [3];
        progressbarTwo.submitSql(sqlList , funcList , database , [[type]]);
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealPoorAreaNearSectorData
 * @funcdesc 处理查询返回的弱区的专题邻区数据
 * @param {Object} data : 查询返回的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealPoorAreaNearSectorData = function IntelligentRoadTest_dealPoorAreaNearSectorData(data , params){
    var result = callBackChangeData(data);
    // console.log(result);

    if(result.length > 0){
        var dataList = [];
        if(params[0] == 6 || params[0] == 7){//MOD3干扰的数据处理
            var type = "";
            if(params[0] == 7){
                type = "ol";
            }
           dataList = IntelligentRoadTest.subStrAndDealZhuantiSectorString(result[0].top_cell_set , type); //获取到专题扇区数据
           IntelligentRoadTest.rfgCompleteVM.zhuantiNRSectorList = dataList; //将数据放入vue对象中
        }else{//越区和重叠的数据处理
            var dataList = IntelligentRoadTest.getNCCellList(result[0].top_cell_set); //获取到邻区列表数据
            IntelligentRoadTest.rfgCompleteVM.nrCellList = dataList;
        }
    }else{
        IntelligentRoadTest.rfgCompleteVM.zhuantiNRSectorList = []; //将数据放入vue对象中
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.subStrAndDealZhuantiSectorString
 * @funcdesc 处理弱区的专题邻区的字符串，将其处理成数组
 * @param {String} type : 用于区分是MOD3还是重叠
 * {String} str : 要处理的字符串
 * 格式如下：
 *
 *1.8G:484527_48,1825_57,F黄埔区沐陂军营-0,66,49,-271.8484772727272,1644.0@485538_50,1825_234,F软件路京华信息LTE-RRU103,53,41,-145.83387924528301,2731.0@486275_50,1825_308,萝岗黄陂北C网LTE-RRU03,17,14,-316.44117647058823,5245.0;
 800M:484313_21,2452_83,F国家软件基地南LTE-RRU03/GZV3592,10,10,-116.9,753.0
 @484306_24,2452_65,F大观学校LTE-RRU03/GZV2226,4,4,-140.5,2053.0@479326_18,2452_71,东升石矿LTE-RRU06/GZV2253,4,4,-147.25,2904.0
 * @return {Object/Array}
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.subStrAndDealZhuantiSectorString = function(str , type){

    var dataList = [];
    var tempList = [
        {key : "800M_模0" , value :null},
        {key : "800M_模1" , value :null},
        {key : "800M_模2" , value :null},
        {key : "1.8G_模0" , value :null},
        {key : "1.8G_模1" , value :null},
        {key : "1.8G_模2" , value :null},
        {key : "2.1G_模0" , value :null},
        {key : "2.1G_模1" , value :null},
        {key : "2.1G_模2" , value :null},
        {key : "2.6G_模0" , value :null},
        {key : "2.6G_模0" , value :null},
        {key : "2.6G_模2" , value :null},
    ];

    if(type == "ol"){ //重叠区域的邻区列表
        tempList = [
            {key : "800M" , value :null},
            {key : "1.8G" , value :null},
            {key : "2.1G" , value :null},
            {key : "2.6G" , value :null},
        ];
    }

    if(str != null){

        var bandList = str.split(";"); //切割出那12种栏目的数据（最多12个栏目）
        var modNameList = [];//获取栏目名称的顺序
        for(var i = 0; i < bandList.length; i++){ //遍历每个栏目，取出每一个栏目的扇区列表数据
            var bandAndModName = bandList[i].split(":")[0]; //取到栏目的名称
            modNameList.push(bandAndModName);
            var sectorStr = bandList[i].split(":")[1]; //获取到存放扇区列表的字符串
            var sectorList = IntelligentRoadTest.getNCCellList(sectorStr); //获取当前栏目的扇区的列表数据
            var obj = {
                modelName : bandAndModName ,
                modeSectorList : sectorList
            };
            for(var m = 0 ; m < tempList.length; m++){
                if(tempList[m].key == obj.modelName){
                    tempList[m].value = obj;
                }
            }
        }
        for(var n = 0 ; n <  tempList.length; n++){ //按照排序规则获取到排序后的数据
            if(tempList[n].value != null){
                dataList[modNameList.indexOf(tempList[n].key)] = tempList[n].value;
                // dataList.push(tempList[n].value);
            }
        }
    }
    console.log(dataList);
    return dataList;
}


//显示专题弱区里面的专题扇区连线
IntelligentRoadTest.showZhuantiSectorLine = function IntelligentRoadTest_showZhuantiSectorLine(centerPoint,top5_sector_set,index){
    if(IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList == null){
        IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList = []; //初始化存放弱区中的专题扇区的扇区组件对象
    }

    if(top5_sector_set==undefined||top5_sector_set==null){
        return;
    }
    if(top5_sector_set.indexOf(",")<0){
        return;
    }
    var nearTOP5 = [];
    if(top5_sector_set != null && top5_sector_set != ""){
        var to5DataArr = top5_sector_set.split("@");
        for(var i =  0 ; i < to5DataArr.length; i++){
            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
        }
    }
    var sectorArr = top5_sector_set.split("@");
    var topStr = "";
    var bstStr = "";
    for(var i=0;i<sectorArr.length;i++){
        var sector = sectorArr[i].split(",");
        var bstId = parseInt(sector[0]);
        var cellId = parseInt(sector[1]);
        var topid = bstId*1000000+cellId;
        if(i!=sectorArr.length-1){
            topStr+=String(topid)+",";
            bstStr += String(bstId)+","
        }else{
            topStr+=String(topid);
            bstStr += String(bstId);
        }
    }
    if(topStr!=""){
        //top扇区连线查询
        if(IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList[index]==undefined || IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList[index] == null){
            var bMapObj={
                map:IntelligentRoadTest.map,
                useSelectTimeQuerySector:false,
                isShowFactoryIcon:false,
                showHighStatn:false,
                sectorColor:IntelligentRoadTest.sectorColor,
                circleColor:IntelligentRoadTest.sectorColor,
                senceName : IntelligentRoadTest.senceName
            };
            IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList[index] = new sectorStation(bMapObj);
        }
        var day = IntelligentRoadTest.day;
        var list = ["IntelligentRoadTest_15_mainSectorList","DAY:"+day,
            "BSTIDANDCELLID:"+topStr];
        var progressBarSqls=[];
        progressBarSqls.push(list);
        var functionlist = [IntelligentRoadTest.showZhuantiSectorAndLine];
        var dataBase = [3];
        progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase,[[centerPoint,sectorArr , nearTOP5 , index]]);
    }
}

//呈现最近top5小区连线
IntelligentRoadTest.showZhuantiSectorAndLine = function IntelligentRoadTest_showZhuantiSectorAndLine(data,objectData){
    var index = objectData[3];
    // IntelligentRoadTest.hidePoorAreaZhuantiSectorAndLine(index);
    IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList[index].useSelectSectorData = true;
    IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList[index].sectorShow(data);
    /*for(var i=0;i<IntelligentRoadTest.nrSectorOverlay.length;i++){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.nrSectorOverlay[i]);
    }
    IntelligentRoadTest.nrSectorOverlay = null;
    IntelligentRoadTest.nrSectorOverlay = [];*/

    var result = callBackChangeData(data);
    var polylineArr = [];
    for(var i=0;i<result.length;i++){
        var sectorindex = "";
        if(result[i].is_indoor=="室外"){
            for(var j=0;j<IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList[index].RSRPSectorChe.length;j++){
                if(IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList[index].RSRPSectorChe[j].point2.statn_id==result[i].base_statn_id&&IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList[index].RSRPSectorChe[j].point2.cell_id==result[i].cell_id){
                    if(IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList[index].RSRPSectorChe[j].getPath().length/2==0){
                        sectorindex = IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList[index].RSRPSectorChe[j].getPath()[IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList[index].RSRPSectorChe[j].getPath().length/2]
                    }else{
                        sectorindex = IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList[index].RSRPSectorChe[j].getPath()[parseInt(IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList[index].RSRPSectorChe[j].getPath().length/2)+1];
                    }
                }
            }
        }

        var lng = result[i].longitude_baidu;
        var lat = result[i].latitude_baidu;
        if(sectorindex==""){
            sectorindex = new BMap.Point(lng, lat);
        }

        var polyline = new BMap.Polyline([
            objectData[0],
            sectorindex
        ], {strokeColor:IntelligentRoadTest.nrTop5LineColor, strokeOpacity:1});//这里的颜色可能需要修改
        var topSector = objectData[1];
        for(var j=0;j<topSector.length;j++){
            var sector = topSector[j].split(",");
            if(sector[0]==result[i].base_statn_id && sector[1]==result[i].cell_id){
                //基站号,小区号,距离，数量,平均RSRP,排序
                //513108,51,262,2817,-96.54,1
                polyline.bstid = sector[0];
                polyline.cellid = sector[1];
                polyline.distince = sector[2];
                polyline.count = sector[3];
                polyline.rsrpAvg = sector[4];
                polyline.topNum = sector[5];
                polyline.setStrokeWeight(6-parseInt(sector[5]));
                polyline.bstname = result[i].base_statn_name;
                polyline.cellname = result[i].cell_name;
            }
        }

        polyline.type = "sectorLine";
        polyline.distince = parseInt(IntelligentRoadTest.map.getDistance(objectData[0],new BMap.Point(lng, lat)));
        polyline.modelIndex = index;
        polyline.sectorIndex = i;
//		polyline.addEventListener("mouseover",function(e){
//
//		});
        polyline.i=i;
        IntelligentRoadTest.poorAreaZhuantiSectorBgColor(polyline, objectData[2]);
        // IntelligentRoadTest.nrSectorOverlay.push(polyline);
        //这里保存要按照index去保存了
        polylineArr.push(polyline);
        IntelligentRoadTest.map.addOverlay(polyline);
    }
    IntelligentRoadTest.poorAreaNrZhuanutiSectorPoloyLineList[index] = polylineArr; //将每个polyline对象保存在全局数组中，并且和index 一一对应
    IntelligentRoadTest.isShowGridMessage=false;
    // data = null;
    // objectData = null;
}

/**********************************
 * @funcname IntelligentRoadTest.mrNrTop5CellBgColor
 * @funcdesc 附件扇区和接入删去的链接线和表格双向高亮显示
 * @param {String} type (input optional)
 * type==0附件扇区 type==1接入扇区
 * @param {String} polyline (input optional)
 * 连接线对象
 * @return {null}
 * @author 郑文彬
 * @create 20180412
 ***********************************/
IntelligentRoadTest.poorAreaZhuantiSectorBgColor =function IntelligentRoadTest_poorAreaZhuantiSectorBgColor(polyline, sectorList ){

    // v-bind:class = "highLightLine";



    // 这里要绑定polyline的移入移出事件 .css("background","#f4f4f4");
    polyline.addEventListener("mouseover",function(){
        $("#"+this.modelIndex + "_" + this.sectorIndex).css("background" , "#f4f4f4");
        this.setStrokeColor('#9ffb13');
    });

    polyline.addEventListener("mouseout",function(){
        $("#"+this.modelIndex + "_" + this.sectorIndex).css("background" , "#fff");
        this.setStrokeColor('#cc66ff');
    });

}


IntelligentRoadTest.hidePoorAreaZhuantiSectorAndLine = function IntelligentRoadTest_hidePoorAreaZhuantiSectorAndLine(index){

    IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList[index].sectorHide();//隐藏扇区
    var poloylineList = IntelligentRoadTest.poorAreaNrZhuanutiSectorPoloyLineList[index];
    for(var i = 0; i < poloylineList.length; i++){ //遍历移除当前index的所有线
    	if(poloylineList[i] != null){
            IntelligentRoadTest.map.removeOverlay(poloylineList[i]);
        }
    }

}

IntelligentRoadTest.cleraAllZhuantiSectorAndLine = function(){
    if(IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList == null || IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList.length == 0){ //不需要清除
        return;
    }
    for(var n = 0 ; n < IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList.length; n++){
        if(IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList[n] != null){
            IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList[n].sectorHide();//隐藏扇区
        }
    }
    for(var m = 0 ; m < IntelligentRoadTest.poorAreaNrZhuanutiSectorPoloyLineList.length ; m++){
        var poloylineList = IntelligentRoadTest.poorAreaNrZhuanutiSectorPoloyLineList[m];
        if(poloylineList != null){
            for(var i = 0; i < poloylineList.length; i++){ //遍历移除当前index的所有线
                if(poloylineList[i] != null){
                    IntelligentRoadTest.map.removeOverlay(poloylineList[i]);
                }
            }
        }
    }
    IntelligentRoadTest.poorAreaZhuantiSectorUtilObjList = [];
    IntelligentRoadTest.poorAreaNrZhuanutiSectorPoloyLineList = []; //置空
}


IntelligentRoadTest.cbSectorPolyLineList = []; //存放越区覆盖区域的邻区连线对象的数组

//呈现越区覆盖区域的邻区连线
IntelligentRoadTest.showCBPoorAreaNrTop5Sector = function IntelligentRoadTest_showCBPoorAreaNrTop5Sector(data,objectData){
    IntelligentRoadTest.cbCellBmapUtil.useSelectSectorData = true;
    IntelligentRoadTest.cbCellBmapUtil.sectorShow(data);

    for(var i=0;i<IntelligentRoadTest.cbSectorPolyLineList.length;i++){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.cbSectorPolyLineList[i]);
    }
    IntelligentRoadTest.cbSectorPolyLineList = null;
    IntelligentRoadTest.cbSectorPolyLineList = [];
    var result = callBackChangeData(data);

    for(var i=0;i<result.length;i++){
        var sectorindex = "";
        if(result[i].is_indoor=="室外"){
            for(var j=0;j<IntelligentRoadTest.cbCellBmapUtil.RSRPSectorChe.length;j++){
                if(IntelligentRoadTest.cbCellBmapUtil.RSRPSectorChe[j].point2.statn_id==result[i].base_statn_id&&IntelligentRoadTest.cbCellBmapUtil.RSRPSectorChe[j].point2.cell_id==result[i].cell_id){
                    if(IntelligentRoadTest.cbCellBmapUtil.RSRPSectorChe[j].getPath().length/2==0){
                        sectorindex = IntelligentRoadTest.cbCellBmapUtil.RSRPSectorChe[j].getPath()[IntelligentRoadTest.cbCellBmapUtil.RSRPSectorChe[j].getPath().length/2]
                    }else{
                        sectorindex = IntelligentRoadTest.cbCellBmapUtil.RSRPSectorChe[j].getPath()[parseInt(IntelligentRoadTest.cbCellBmapUtil.RSRPSectorChe[j].getPath().length/2)+1];
                    }
                }
            }
        }

        var lng = result[i].longitude_baidu;
        var lat = result[i].latitude_baidu;
        if(sectorindex==""){
            sectorindex = new BMap.Point(lng, lat);
        }

        var polyline = new BMap.Polyline([
            objectData[0],
            sectorindex
        ], {strokeColor:IntelligentRoadTest.nrTop5LineColor, strokeOpacity:1});
        var topSector = objectData[1];
        for(var j=0;j<topSector.length;j++){
            var sector = topSector[j].split(",");
            if(sector[0]==result[i].base_statn_id && sector[1]==result[i].cell_id){
                //基站号,小区号,距离，数量,平均RSRP,排序
                //513108,51,262,2817,-96.54,1
                polyline.bstid = sector[0];
                polyline.cellid = sector[1];
                polyline.distince = sector[2];
                polyline.count = sector[3];
                polyline.rsrpAvg = sector[4];
                polyline.topNum = sector[5];
                polyline.setStrokeWeight(6-parseInt(sector[5]));
                polyline.bstname = result[i].base_statn_name;
                polyline.cellname = result[i].cell_name;
            }
        }

        polyline.type = "sectorLine";
        polyline.distince = parseInt(IntelligentRoadTest.map.getDistance(objectData[0],new BMap.Point(lng, lat)));
//		polyline.addEventListener("mouseover",function(e){
//
//		});
        polyline.i=i;
        var cellList = IntelligentRoadTest.rfgCompleteVM.nrCellList;
        IntelligentRoadTest.mrNrTop5CellBgColor(polyline,2 , cellList);
        IntelligentRoadTest.cbSectorPolyLineList.push(polyline);
        IntelligentRoadTest.map.addOverlay(polyline);
    }
    IntelligentRoadTest.isShowGridMessage=false;
    // data = null;
    // objectData = null;
}

IntelligentRoadTest.hideCBPoorAreaNrTop5Sector = function(){

    for(var i=0;i<IntelligentRoadTest.cbSectorPolyLineList.length;i++){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.cbSectorPolyLineList[i]);
    }
    if(IntelligentRoadTest.cbCellBmapUtil!=null){
        IntelligentRoadTest.cbCellBmapUtil.sectorHide();
    }

    $('.listDiv :visible .cbnrTop5Cell ul li').each(function (){
        var $events = $(this).data("events");
        if($events && $events['mouseover']){
            $(this).unbind('mouseover');
        }
        if($events && $events['mouseout']){
            $(this).unbind('mouseout');
        }
    });
}
/*------------------------------------------------专题弱区取该专题弱区的邻区数据展示专题扇区结束--------------------------------------------*/


/*-------------------------------------------------天翼蓝鹰5.0修改-----------------------------------------------*/

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealMetroSecondListData
 * @funcdesc 处理查询返回的地铁的二级列表数据
 * @param {Object} data ： 查询返回的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealMetroSecondListData = function IntelligentRoadTest_dealMetroSecondListData(data){
    var result = callBackChangeData(data);
    // console.log(result);
    IntelligentRoadTest.metroAllSecondListResult = result; //地铁第二级列表的所有数据
}

//获取某条线路的某个方向的二级列表数据
/**
 * ********************************
 * @funcname IntelligentRoadTest.getCurrentLineSecondListResult
 * @funcdesc 根据地铁线路的ID和方向获取某条地铁的指定方向的数据
 * @param {int} line_id : 线路ID   {int} mr_flag : 地铁线路
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getCurrentLineSecondListResult = function(line_id , mr_flag){

    if(isNull(line_id) || isNull(mr_flag)){
        return;
    }
    if(IntelligentRoadTest.metroAllSecondListResult != null && IntelligentRoadTest.metroAllSecondListResult.length > 0){ //二级列表的缓存数据不为空时才会起作用
        var crossfilterObj = crossfilter(IntelligentRoadTest.metroAllSecondListResult);
        var metroDimension = crossfilterObj.dimension(function(d) { return d }); //创建维度
        metroDimension.filter(function(d){
            if(d.line_id == line_id && d.mr_flag == mr_flag){
                return d;
            }
        });
        IntelligentRoadTest.metroSecondListResult = metroDimension.top(IntelligentRoadTest.metroAllSecondListResult.length);

        // IntelligentRoadTest.metroSecondListCurrentResult = metroDimension.top(IntelligentRoadTest.metroAllSecondListResult.length);
        crossfilterObj.remove();//移除
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.getMetroOtherRSRPAndAllMRCount
 * @funcdesc 根据起止站点的ID从二级列表数据中过滤出相应的rsrs均值数据以及全量MR的数据
 * @param {int} from_id :起始站点ID  {int} to_id ： 结束站点ID
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getMetroOtherRSRPAndAllMRCount = function(from_id , to_id){
    var obj = {
        forwardRsrp : null,
        forwardAllMrCount : null,
        resverseRsrp : null,
        resverseAllMrCount : null,
        twoWayRsrp : null,
        twoWayAllMrCount : null,
    };
    var result = IntelligentRoadTest.metroAllSecondListResult==undefined?[]:IntelligentRoadTest.metroAllSecondListResult;
    for(var i = 0; i < result.length; i++){
    	if(result[i].from_station_id == from_id && result[i].to_station_id == to_id){
            if(result[i].mr_flag == 2){
                obj.twoWayRsrp = result[i].rsrp_avg_sect;
                obj.twoWayAllMrCount = result[i].dx_rsrp_140_cnt;
            }else if(result[i].mr_flag == 1){
                obj.forwardRsrp = result[i].rsrp_avg_sect;
                obj.forwardAllMrCount = result[i].dx_rsrp_140_cnt;
            }
        }else if(result[i].to_station_id == from_id && result[i].from_station_id == to_id && result[i].mr_flag == -1){
            obj.resverseRsrp = result[i].rsrp_avg_sect;
            obj.resverseAllMrCount = result[i].dx_rsrp_140_cnt;
        }
    }
    IntelligentRoadTest.metroCompleteVM.otherDataObj = obj;
}

//--------------------------------------------场景详情页的修改-----------------------------------------------------
