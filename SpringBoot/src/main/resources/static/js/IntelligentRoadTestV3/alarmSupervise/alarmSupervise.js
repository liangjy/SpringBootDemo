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

    return objFilter4;
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
            if(d.poor_coverage_count==0){
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
    list = sqlList.push(list);
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
    console.log(result);
    console.log(params);
    if(result.length > 0){
        var fromStationArr = [];
        var toStationArr = [];
        for(var i = 0; i < result.length; i++){
        	if(result[i].from_station_id == params.from_station_id){ //开始站点的TA值
                fromStationArr.push(result[i]);
            }else if(result[i].from_station_id == params.to_station_id){ //结束站点的TA值
                toStationArr.push(result[i]);
            }
        }
        //将处理好的值传入地铁详情页的VUE对象
        IntelligentRoadTest.metroCompleteVM.toStationTAArr = toStationArr;
        IntelligentRoadTest.metroCompleteVM.fromStationTAArr = fromStationArr;
    }
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
            var level = IntelligentRoadTest.getRoadRSRPLevel(TAArr[i].rsrp_avg,4); //这里的4表示记录数大于3，以便执行的时候通过该方法的小于等于3的判断
            var lineColor = IntelligentRoadTest.getColorStrByLevel(level);
        	colorArr.push(lineColor);
        }
        colorArr.reverse();
        console.log(colorArr);
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
            update: update
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
IntelligentRoadTest.clearAllCircle = function IntelligentRoadTest_clearAllCircle(type){
    if(IntelligentRoadTest.canvasLayerList != null){
        if(type == null){
            if(IntelligentRoadTest.canvasLayer != null ){
                IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.canvasLayer);
            }
            IntelligentRoadTest.canvasLayerList = null; //置空
            return ;
        }else if(type == "start"){
            IntelligentRoadTest.canvasLayerList.fromCircleOption.isShow = false; //设置为不显示
        }else{
            IntelligentRoadTest.canvasLayerList.toCircleOption.isShow = false; //设置为不显示
        }
        if((IntelligentRoadTest.canvasLayerList.fromCircleOption == null || IntelligentRoadTest.canvasLayerList.fromCircleOption.isShow == false )
            && (IntelligentRoadTest.canvasLayerList.toCircleOption == null || IntelligentRoadTest.canvasLayerList.toCircleOption.isShow == false)){//两个都不显示
            IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.canvasLayer);
        }else{
            IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.canvasLayer);
            IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.canvasLayer); //将图层显示在地图上
        }
    }
}