"use strict";
import {LineUtilForBaidu} from '../util/LineUtilForBaidu.js'
//OMS线路图层转百度图层涉及的方法
IntelligentRoadTest.railContinueResult = []; //连片和隧道的地图数据
IntelligentRoadTest.railMarkerClusterer = null;//隧道或者连片的聚合
IntelligentRoadTest.MarkerResultArr = [];
IntelligentRoadTest.lineProfileColor = "#33FF00";//"#CCFF00";//"#FF33FF";//"#0000FF";//'#F4A460';
IntelligentRoadTest.MarkerClustererImageUrl = "../js/IntelligentRoadTestV5/images/markeRq.png";//'../js/IntelligentRoadTestV5/images/RoadMarker.png';
IntelligentRoadTest.markarClusterZoom = 11;//在10公里（含）以上，需要显示聚合点，一下则显示20米线段
IntelligentRoadTest.lineDilutionNum = 2;//抽稀的间隔

IntelligentRoadTest.roadHighlightDataOverlayObj = null;//高亮线段的canvas对象

/**
 * ********************************
 * @funcname IntelligentRoadTest.parseGeoJsonForBaidu
 * @funcdesc 将查询返回的高铁线路数据进行处理，将其处理成可以用于百度地图展示的数据
 * @param {Array} data：处理前的数据 ； {boolean} isSuiDao ：标识是否是隧道
 *
 * @return {Array}
 * @author
 * @create
 **********************************
 */
IntelligentRoadTest.parseGeoJsonForBaidu = function (data , isSuiDao) {
    let features = [];
    if (data == null || data == undefined) {
        return;
    }

    let reg = /\d+(\.\d+)?\s\d+(\.\d+)?/g;


    data.forEach(function (row) {
        let gis_data_point_strArr = [];
        let line_gis_data = row["i:a3"];
        if (line_gis_data != null && line_gis_data != "") {
            gis_data_point_strArr = line_gis_data.match(reg);//例如：["3.1 4", "10 50", "20 25"]
        }
        if (gis_data_point_strArr == null || gis_data_point_strArr.length == 0) { //由于line_gis_data.match(reg)返回的结果可能是null，所以要做容错
            gis_data_point_strArr = [];
        }
        let pointArr = [];

        for (let j = 0; j < gis_data_point_strArr.length; j++) { //这里就将数据转换成百度点对象集合
            let pointStrArr = gis_data_point_strArr[j].split(" ");
            let p = new BMap.Point(pointStrArr[0], pointStrArr[1]);
            pointArr.push(p);
        }


        let rowkeySplitList = row["rowkey"].split("_"); //20181209_100_2_200_102_224373  日期_数据的级别（米）_线路类型（1为高速、2为高铁、3为市政路）_地市ID_道路ID_线段ID


        let object = {
            "city" : row["i:a1"],
            "road_name" : row["i:a2"],
            "dx_line_rsrp_count": row["i:a5"],
            "dx_line_rsrp_avg": row["i:a6"],
            "dx_line_rsrp_cov": row["i:a7"],
            "min_userex_upavgrate": row["i:a33"],
            "min_userex_dwavgrate": row["i:a34"],
            // "color" : "#000",
            "pointArr" :pointArr,
            "rowkey" : row["rowkey"],
            "roadIndex" : IntelligentRoadTest.roadIndex,
            "city_id" : rowkeySplitList[3],
            "road_id" : rowkeySplitList[4],
            "line_id" : rowkeySplitList[5],
            "object_id" : rowkeySplitList[5],
        }

        if (IntelligentRoadTest.lineTypeIndex == 0) {
            object.level = IntelligentRoadTest.getRoadRSRPLevel(row["i:a6"], row["i:a5"]);
        } else if (IntelligentRoadTest.lineTypeIndex == 1) {
            object.level = IntelligentRoadTest.getRoadSHLevel(row["i:a33"], row["i:a5"]);
        } else if (IntelligentRoadTest.lineTypeIndex == 2) {
            object.level = IntelligentRoadTest.getRoadXHLevel(row["i:a34"], row["i:a5"]);
        }

        object.color = IntelligentRoadTest.getColorStrByLevel(object.level);

        if(isSuiDao == true && IntelligentRoadTest.roadIndex < 3){
            object.color = IntelligentRoadTest.lineProfileColor;
        }
        features.push(object);
    });

    return features;
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.drawRailWay
 * @funcdesc 绘制高铁的线路
 * @param {Array} comResultArr ：线路数据
 *
 * @return
 * @author
 * @create
 **********************************
 */
IntelligentRoadTest.drawRailWay =function(comResultArr){
    if(IntelligentRoadTest.railContinueLineUtil != null && IntelligentRoadTest.roadStatus == 0){
        IntelligentRoadTest.railContinueLineUtil.clearCanvasLayers(); //清除连片的地图线路
    }

    /*if((IntelligentRoadTest.roadStatus == 3 || IntelligentRoadTest.roadStatus == 1) && IntelligentRoadTest.roadIndex >  2){
        //其他场景，不响应
        if(IntelligentRoadTest.railLineUtil){
            IntelligentRoadTest.railLineUtil.replyMouseMoveEvent = false;
            IntelligentRoadTest.railLineUtil.replyMouseClickEvent = false;
        }
        return ;
    }*/
    if (IntelligentRoadTest.railLineUtil == undefined) {
        let optioin = {
            lineIndex: 2,
            lineWeight: 6,
            // useOptionColor:true,
            // optionFiledConfiguration:,
            // optionChangeFunc:,
            useTouchWeight:true,
            touchWeight:12,
            replyMouseMoveEvent: true,
            replyMouseMoveEventFunc: IntelligentRoadTest.roadLineUtilMouseMove, //需要替换为自己的方法
            replyMouseClickEvent: true,
            replyMouseClickEventFunc: IntelligentRoadTest.RailLineUtilMouseClick //需要替换
        }
        IntelligentRoadTest.railLineUtil = new LineUtilForBaidu(IntelligentRoadTest.map, optioin);
    }

    if(IntelligentRoadTest.roadIndex == 2){
        IntelligentRoadTest.railLineUtil.replyMouseMoveEvent = false;
        IntelligentRoadTest.railLineUtil.replyMouseClickEvent = false;
    }else{
        IntelligentRoadTest.railLineUtil.replyMouseMoveEvent = true;
        IntelligentRoadTest.railLineUtil.replyMouseClickEvent = true;
    }

    //IntelligentRoadTest.railLineUtil.clearCanvasLayers();
    IntelligentRoadTest.railLineUtil.lineDataObject = [];
    IntelligentRoadTest.railLineUtil.lineDataObject = null;
    IntelligentRoadTest.railLineUtil.lineOpacity = IntelligentRoadTest.lineOpacity;
    IntelligentRoadTest.railLineUtil.lineDataObject = comResultArr;
    IntelligentRoadTest.railLineUtil.draw();
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.drawRailWayContinue
 * @funcdesc 绘制弱连段和隧道的地图数据
 * @param {Array} comResultArr : 数据
 *
 * @return
 * @author
 * @create
 **********************************
 */
IntelligentRoadTest.drawRailWayContinue =function(comResultArr){
    if(IntelligentRoadTest.roadIndex > 2){
        IntelligentRoadTest.railLineUtil.clearCanvasLayers();
    } //在连片或者隧道的第三层或者第四层，不要显示500米段的20米的地图信息
    if (IntelligentRoadTest.railContinueLineUtil == undefined) {
        let option = {
            lineIndex: 3,
            lineWeight: 2,
            // useOptionColor:true,
            // optionFiledConfiguration:,
            // optionChangeFunc:,
            useLineToProfile:true,
            lineProfileWeight:5,
            useTouchWeight:true,
            touchWeight:12,
            replyMouseMoveEvent: true,
            replyMouseMoveEventFunc: IntelligentRoadTest.roadContinueUtilMouseMove, //需要替换为自己的方法
            replyMouseClickEvent: true,
            replyMouseClickEventFunc: IntelligentRoadTest.roadContinueUtilMouseClick //需要替换
        }

        IntelligentRoadTest.railContinueLineUtil = new LineUtilForBaidu(IntelligentRoadTest.map, option);
    }
    IntelligentRoadTest.railContinueLineUtil.lineOpacity = IntelligentRoadTest.lineOpacity;
    if(IntelligentRoadTest.roadIndex >2){
        IntelligentRoadTest.railContinueLineUtil.useLineToProfile = false;
        IntelligentRoadTest.railContinueLineUtil.lineWeight = 6;
        IntelligentRoadTest.railContinueLineUtil.useTouchWeight = false;
        IntelligentRoadTest.railContinueLineUtil.touchWeight = 12;
    }else{
        IntelligentRoadTest.railContinueLineUtil.lineOpacity = 1;
        IntelligentRoadTest.railContinueLineUtil.useLineToProfile = true;
        IntelligentRoadTest.railContinueLineUtil.lineWeight = 2;
        IntelligentRoadTest.railContinueLineUtil.useTouchWeight = true;
        IntelligentRoadTest.railContinueLineUtil.touchWeight = 12;
    }

    if(IntelligentRoadTest.roadIndex == 1){
        IntelligentRoadTest.railContinueLineUtil.replyMouseMoveEvent = false;
    }else{
        IntelligentRoadTest.railContinueLineUtil.replyMouseMoveEvent = true;
    }

    IntelligentRoadTest.railContinueLineUtil.lineDataObject = [];
    IntelligentRoadTest.railContinueLineUtil.lineDataObject = null;
    IntelligentRoadTest.railContinueLineUtil.lineDataObject = comResultArr;

    if(IntelligentRoadTest.roadStatus == 3 || IntelligentRoadTest.roadStatus == 1 || IntelligentRoadTest.roadStatus == 2){
        if(IntelligentRoadTest.map.getZoom() > IntelligentRoadTest.markarClusterZoom){
            IntelligentRoadTest.railContinueLineUtil.draw();
        }

        /*setTimeout(function(){
            if(IntelligentRoadTest.railContinueLineUtil._mapCanvasLayers == null && IntelligentRoadTest.map.getZoom() > IntelligentRoadTest.markarClusterZoom){ //在绘制连片的时，有时候会出现数据没有问题，但是调用draw方法之后还是没有canvas图层出现，这里判断一下，如果出现这种情况，重新绘制一遍
                IntelligentRoadTest.railContinueLineUtil.draw();
            }
        },500);*/

        if(IntelligentRoadTest.roadIndex < 3){
            IntelligentRoadTest.drawRailWayForMarker(comResultArr);
        }
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.drawRailWayForMarker
 * @funcdesc 绘制聚合点
 * @param  {Array} comResultArr 数据
 *
 * @return
 * @author
 * @create
 **********************************
 */
IntelligentRoadTest.drawRailWayForMarker = function(comResultArr){
    let markerArr = [];
    for(const[index,resultObj] of comResultArr.entries()){
        if(resultObj.pointArr.length > 0){
            let markerPoint = resultObj["cent_point"];
            if(markerPoint){
                let markerIcon = new BMap.Icon(IntelligentRoadTest.MarkerClustererImageUrl,new BMap.Size(20, 30));
                //let markerLabel = new BMap.Label('1',{offset:new BMap.Size(5,5)});
                //markerLabel.setStyle({ color : "red", fontSize : "10px",border:'0px',backgroundColor:"" });
                let marker = new BMap.Marker(markerPoint);
                marker.setIcon(markerIcon);
                marker.setOffset(new BMap.Size(0, -15));
                //marker.setLabel(markerLabel);
                markerArr.push(marker)
            }
        }
    }
    IntelligentRoadTest.MarkerResultArr = [].concat(markerArr);
    if(IntelligentRoadTest.railMarkerClusterer == null){
        IntelligentRoadTest.railMarkerClusterer = new BMapLib.MarkerClusterer(IntelligentRoadTest.map, {gridSize :20,minClusterSize : 1});
        let myStyles = [ {
            url: IntelligentRoadTest.MarkerClustererImageUrl,
            size: new BMap.Size(20, 30),
            //anchor : new BMap.Size(0, 0),//只针对文字
            offsetSize : new BMap.Size(0, -15),//只针对文字
            textColor: 'red',
            textSize : 16
        },/*{
        url: '../js/IntelligentRoadTestV5/images/metroCircle.png',
        size: new BMap.Size(30, 30),
        opt_anchor: [0, 0],
        textColor: 'red',
        opt_textSize: 12
    },{
        url: '../js/IntelligentRoadTestV5/images/work_order.png',
        size: new BMap.Size(34, 34),
        opt_anchor: [0, 0],
        textColor: 'red',
        opt_textSize: 14
    }*/];
        IntelligentRoadTest.railMarkerClusterer.setStyles(myStyles);
    }else{
        IntelligentRoadTest.railMarkerClusterer.clearMarkers();
    }
    if(IntelligentRoadTest.map.getZoom() <= IntelligentRoadTest.markarClusterZoom){
        IntelligentRoadTest.railMarkerClusterer.addMarkers(IntelligentRoadTest.MarkerResultArr);
    }

}


IntelligentRoadTest.lastMouseMoveContinueLine = {};

IntelligentRoadTest.roadContinueUtilMouseMove = function (lineData){
    if(IntelligentRoadTest.index != 8){
        return;
    }
    // console.log(lineData);
    if(IntelligentRoadTest.roadStatus == 2){
        //非隧道的暂时不响应
      return;
    }



    if (lineData.length > 0) {
        // console.log("mousemove", lineData);
        IntelligentRoadTest.roadContinueMouseout({});
        IntelligentRoadTest.lastMouseMoveContinueLine = null;
        IntelligentRoadTest.lastMouseMoveContinueLine = lineData[0];
        IntelligentRoadTest.roadContinueMouseover(lineData[0]);
    } else {
        IntelligentRoadTest.lastMouseMoveLine = {};
        IntelligentRoadTest.roadContinueMouseout(IntelligentRoadTest.lastMouseMoveContinueLine);
    }
}

/**
 * ********************************
 * @funcname  IntelligentRoadTest.getLineObjFromSecondList
 * @funcdesc 根据线段ID从列表中获取对应的线段对象
 * @param {int} line_id ： 线段ID
 *
 * @return {Object}
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getLineObjFromSecondList = function(line_id){

    let obj = {};
    let list = IntelligentRoadTest.railSecondListResult;
    for(let i = 0; i < list.length; i++){
        if(list[i].line_id == line_id){
            obj = list[i];
        }
    }
    return obj;

}

/**
 * ********************************
 * @funcname IntelligentRoadTest.roadContinueUtilMouseClick
 * @funcdesc 高铁弱连段和隧道的鼠标点击事件
 * @param {Array} lineDataList ： 鼠标点击位置匹配到的对象数组
 *
 * @return
 * @author
 * @create
 **********************************
 */
IntelligentRoadTest.roadContinueUtilMouseClick = function (lineDataList){
    // console.log(lineData);
    if(IntelligentRoadTest.index != 8){
        return;
    }
    if(IntelligentRoadTest.roadStatus == 2){
        //非隧道的时候，暂不可以点击下钻
        return;
    }

    if(lineDataList != null && lineDataList.length > 0){
        let lineObj = lineDataList[0];
        if(IntelligentRoadTest.roadIndex == 1){
            if(IntelligentRoadTest.roadStatus == 1){
                lineObj = IntelligentRoadTest.getLineObjFromList(lineObj.road_id);
            }
            IntelligentRoadTest.railVM.goNextList(lineObj , null , false);
        }else if(IntelligentRoadTest.roadIndex == 2){
            if(IntelligentRoadTest.roadStatus == 1 || IntelligentRoadTest.roadStatus == 3){ //隧道和连片
                lineObj = IntelligentRoadTest.getLineObjFromSecondList(lineObj.line_id);
            }
            if(lineObj.line_id != undefined){
                IntelligentRoadTest.railSecondVM.showMessage(lineObj);
            }
        }else if(IntelligentRoadTest.roadIndex){
            IntelligentRoadTest.goRailGridCompleteMessage();
            IntelligentRoadTest.showRoad20MCompleteMessage(lineObj.line_id, lineObj, "#showRailGridCompleteMessage", 2);
        }
    }
}



/**
 * ********************************
 * @funcname IntelligentRoadTest.setRightCenterAndZoom
 * @funcdesc 根据传入的点的数组获取到最佳的位置和缩放级别并将地图设置为那个级别和位置
 * @param {Array} points : 点的数组
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.setRightCenterAndZoom = function (points){
    if(points != null && points.length > 0){
        let viewport = IntelligentRoadTest.map.getViewport(points);
        IntelligentRoadTest.map.centerAndZoom(viewport.center , viewport.zoom);
    }
    IntelligentRoadTest.isNeedCenterAndZoom = false; //是否需要缩放地图
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.find500MeterBy20MeterId
 * @funcdesc 根据传入的20米线段对象，过滤出属于该条线段的500米线段
 * @param {Object} lineObj ： 传入的20米线段对象
 *
 * @return
 * @author
 * @create
 **********************************
 */
IntelligentRoadTest.find500MeterBy20MeterId = function (lineObj){

    if(lineObj.rowkey.indexOf("_20_")>-1){
        //20190105_20_2_758_103_75810316037
        let rowkeyArr = lineObj.rowkey.split("_");
        if(rowkeyArr[1] == '20'){
            let sect_20_id =  rowkeyArr[5]
            let sqlList = [];
            let list = ["IntelligentRoadTestAnalysisV5_getHighway500By20id","SECT_20_ID:"+sect_20_id];
            sqlList.push(list)
            let functionList = [IntelligentRoadTest.deal500MeterBy20MeterId];
            progressbarTwo.submitSql(sqlList,functionList,[3],[lineObj]);
        }
    }else if(lineObj.rowkey.indexOf("_1000_")>-1) {
        //IntelligentRoadTest.railSecondVM.showMessage(lineObj);
        console.log("暂不支持从1公里线段下钻到500米");
    }
}

IntelligentRoadTest.deal500MeterBy20MeterId = function IntelligentRoadTest_deal500MeterBy20MeterId(data,lineObj){
    let result = callBackChangeData(data)
    if(result.length>0){
        let sect_id = result[0].sect_id;
        for(let i=0;i<IntelligentRoadTest.railSecondListResult.length;i++){
            if(IntelligentRoadTest.railSecondListResult[i].line_id == sect_id){
                IntelligentRoadTest.railSecondVM.showMessage(IntelligentRoadTest.railSecondListResult[i]);
                break;
            }
        }
    }else{
        console.log('根据20线段id，无法获取500米线段id');
    }
}

IntelligentRoadTest.lastMouseMoveLine = {};
/**
 * ********************************
 * @funcname IntelligentRoadTest.roadLineUtilMouseMove
 * @funcdesc 高铁线路鼠标移出时触发的事件
 * @param {Array} lineData ：  
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.roadLineUtilMouseMove = function (lineData) {

    if(IntelligentRoadTest.index != 8){
        return;
    }

    if((IntelligentRoadTest.roadStatus == 3 || IntelligentRoadTest.roadStatus == 1 || IntelligentRoadTest.roadStatus == 2)&& IntelligentRoadTest.roadIndex > 1){
        return;
    }
    if (lineData.length > 0) {
        // console.log("mousemove", lineData);
        IntelligentRoadTest.lastMouseMoveLine = null;
        IntelligentRoadTest.lastMouseMoveLine = lineData[0];
        IntelligentRoadTest.roadMouseover(lineData[0]);
    } else {
        IntelligentRoadTest.roadMouseout(IntelligentRoadTest.lastMouseMoveLine);
        IntelligentRoadTest.lastMouseMoveLine = {};
    }

}

/**
 * ********************************
 * @funcname IntelligentRoadTest.RailLineUtilMouseClick
 * @funcdesc 高忒线路点击事件
 * @param {Array} lineDataList ：鼠标点击时匹配到的对象数组
 *
 * @return
 * @author
 * @create
 **********************************
 */
IntelligentRoadTest.RailLineUtilMouseClick = function IntelligentRoadTest_RailLineUtilMouseClick(lineDataList){

    if(IntelligentRoadTest.index != 8){
        return;
    }

    // console.log(lineDataList);
    if((IntelligentRoadTest.roadStatus == 3 || IntelligentRoadTest.roadStatus == 1 || IntelligentRoadTest.roadStatus == 2)&& IntelligentRoadTest.roadIndex > 1){ //此时是和隧道或者连片一起显示，这时候点击是不应该有效果的
        return;
    }
    //清除掉高亮的图层
    IntelligentRoadTest.removeRoadHighlightFirstOverlay();

    if(lineDataList != null && lineDataList.length > 0){
        let lineObj = lineDataList[0];
        if(lineObj.roadIndex == 1){
            IntelligentRoadTest.railVM.goNextList(lineObj , null , false);
        }else if(lineObj.roadIndex == 2){
            //由于第二层直接显示20米或者1公里的线段，因此需要反查出500米线段的id，再得到第二层中500米线段的数据，再进行下钻
            IntelligentRoadTest.find500MeterBy20MeterId(lineObj);
        }else{
            IntelligentRoadTest.goRailGridCompleteMessage();
            IntelligentRoadTest.showRoad20MCompleteMessage(lineObj.line_id, lineObj, "#showRailGridCompleteMessage", 2);
        }
    }
}



IntelligentRoadTest.getBaiduLineLevel = function IntelligentRoadTest_getBaiduLineLevel() {
    let level = 100;
    switch (IntelligentRoadTest.map.getZoom()) {
        case 19:
            level = 20;
            break;
        case 18:
            level = 20;
            break;
        case 17:
            level = 20;
            break;
        case 16:
            level = 20;
            break;
        case 15:
            level = 20;
            break;
        case 14:
            level = 20;//1公里
            break;
        case 13:
            level = 20;//2公里
            break;
        case 12:
            level = 20;//5公里
            break;
        case 11:
            level = 1000;
            break;
        case 10:
            level = 1000;
            break;
        case 9:
            level = 1000;
            break;
        case 8:
            level = 1000;
            break;
        case 7:
            level = 1000;
            break;
    }

    return level;
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.getRoadSecondMapListByRoadId
 * @funcdesc 根据高铁的ID获取其进入二级列表是显示的地图数据
 * @param {int} road_id ： 高铁ID
 *
 * @return
 * @author
 * @create
 **********************************
 */
IntelligentRoadTest.getRoadSecondMapListByRoadId = function (road_id){
    let list = [];
    if(!isNull(road_id)){
        if(IntelligentRoadTest.railLineUtil){
            for(let i = 0; i < IntelligentRoadTest.railLineUtil.lineDataObject.length; i++){
                if(IntelligentRoadTest.railLineUtil.lineDataObject[i].road_id == road_id){
                    list.push(IntelligentRoadTest.railLineUtil.lineDataObject[i]);
                }
            }
        }
    }
    return list;
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.getRoadSecondMapListByRoadIdLineID
 * @funcdesc 根据高铁的ID以及线段的ID 获取到其线段的地图数据
 * @param {int} road_id:高铁ID {int} line_id : 线段ID
 *
 * @return
 * @author
 * @create
 **********************************
 */
IntelligentRoadTest.getRoadSecondMapListByRoadIdLineID = function (road_id , line_id){
    let list = [];
    if(!isNull(road_id) && !isNull(line_id)){
        if(IntelligentRoadTest.railLineUtil){
            for(let i = 0; i < IntelligentRoadTest.railLineUtil.lineDataObject.length; i++){
                if(IntelligentRoadTest.railLineUtil.lineDataObject[i].road_id == road_id && IntelligentRoadTest.railLineUtil.lineDataObject[i].line_id == line_id){
                    list.push(IntelligentRoadTest.railLineUtil.lineDataObject[i]);
                }
            }
        }

    }
    return list;
}

IntelligentRoadTest.getLineObjFromList = function(road_id){

    let obj = {};
    let list = IntelligentRoadTest.railFirstListResult;

    for(let i = 0; i < list.length; i++){
        if(list[i].road_id == road_id){
            obj =  list[i];
        }
    }
    return obj;
}


IntelligentRoadTest.lastMouseMoveContinueLine = {};
IntelligentRoadTest.roadContinueLineUtilMouseMove = function (lineData) {
    if (lineData.length > 0) {
        // console.log("mousemove", lineData);
        IntelligentRoadTest.roadContinueMouseout({});
        IntelligentRoadTest.lastMouseMoveContinueLine = null;
        IntelligentRoadTest.lastMouseMoveContinueLine = lineData[0];
        IntelligentRoadTest.roadContinueMouseover(lineData[0]);
    } else {
        //将列表的所有灰色背景高亮全部清掉
        IntelligentRoadTest.lastMouseMoveContinueLine = {};
        IntelligentRoadTest.roadContinueMouseout(IntelligentRoadTest.lastMouseMoveContinueLine);
    }

}

/**********************************
 * @funcname IntelligentRoadTest.roadMouseover
 * @funcdesc 地铁线段鼠标移入时调用
 * 1，地铁数据高亮显示
 * 2，打印选中地铁线段的起始结束点
 * 3，列表水滴点变为蓝色
 * @param {object} data (input optional)
 * 触摸地铁线段时获取到的需要高亮显示的地铁数据
 * @return {null}
 * @author 郑文彬
 * @create 20180417
 ***********************************/
IntelligentRoadTest.roadMouseover = function IntelligentRoadTest_railMouseover(lineObj) {
    if (IntelligentRoadTest.roadIndex == 1) {
        //let line_id_result = IntelligentRoadTest.getRoadSecondMapListByRoadId(lineObj.road_id);
        /*let line_height_result = [];
        if (line_id_result) {
            for (let station_id_key in line_id_result) {
                for (let i = 0; i < line_id_result[station_id_key].length; i++) {
                    line_height_result.push(line_id_result[station_id_key][i]);
                }
            }
        }*/
        //IntelligentRoadTest.railHighlightData = line_id_result;
        // IntelligentRoadTest.metroHighlightData = IntelligentRoadTest.metroDataFilter(IntelligentRoadTest.metroDataResult, lineObj.line_id);
        IntelligentRoadTest.roadHighlightFirst(IntelligentRoadTest.getRoadSecondMapListByRoadId(lineObj.road_id));

    } else if (IntelligentRoadTest.roadIndex == 2) {
        //let line_id_result = IntelligentRoadTest.getRoadSecondMapListByRoadIdLineID(lineObj.road_id , lineObj.line_id);

        //IntelligentRoadTest.railHighlightData = line_id_result;
        // IntelligentRoadTest.metroHighlightData = IntelligentRoadTest.metroDataFilter(IntelligentRoadTest.metroDataResult, lineObj.line_id, lineObj.from_station_id, lineObj.to_station_id);
        IntelligentRoadTest.roadHighlightFirst(IntelligentRoadTest.getRoadSecondMapListByRoadIdLineID(lineObj.road_id , lineObj.line_id));
    } else if (IntelligentRoadTest.roadIndex == 3 || IntelligentRoadTest.roadIndex == 4) {
        /*let line_id_result = lineObj;
        IntelligentRoadTest.railHighlightData = line_id_result;*/
        IntelligentRoadTest.roadHighlightFirst(lineObj);

    }
    if (IntelligentRoadTest.roadIndex == 2) {
        if (lineObj.line_id != "" && lineObj.line_id != null ) {
            $("#showRailListDiv li :contains('路段编号：" + lineObj.line_id + "')").parent().eq(0).css('background-color', '#f7f7f7');;
            $("#showRailListDiv li :contains('路段编号：" + lineObj.line_id  + "')").prev('.numSpan').css("background", "url(" + "../js/IntelligentRoadTest/images/maker2.png" + ")");

            $("#showRailListDiv li :contains('路段编号：" + lineObj.line_id  + "')").parent().eq(0).bind('mouseout', lineObj, function (event) {
                $("#showRailListDiv li :contains('路段编号：" + event.data.line_id + "')").parent().eq(0).css('background-color', '#fffff');
                $("#showRailListDiv li :contains('路段编号：" + event.data.line_id + "')").prev('.numSpan').css("background", "url(" + "../js/IntelligentRoadTestV5/images/bg_num.png" + ")");
            });
        }
    } else if (IntelligentRoadTest.roadIndex == 1) {
        if (lineObj.road_name != "" && lineObj.road_name != null) {
            $("#showRailDiv li :contains('" + lineObj.road_name + "')").parent().eq(0).css('background-color', '#f7f7f7');
            $("#showRailDiv li :contains('" + lineObj.road_name + "')").prev().css("background", "url(" + "../js/IntelligentRoadTestV5/images/maker2.png" + ")");

            $("#showRailDiv li :contains('" + lineObj.road_name + "')").parent().eq(0).bind('mouseout', lineObj, function (event) {
                $("#showRailDiv li :contains('" + event.data.road_name + "')").parent().eq(0).css('background-color', '#fffff');
                $("#showRailDiv li :contains('" + event.data.road_name + "')").prev().css("background", "url(" + "../js/IntelligentRoadTestV5/images/bg_num.png" + ")");
            });
        }
    }

}
/**********************************
 * @funcname intelligentRoadTest.metroMouseout
 * @funcdesc 地铁线段鼠标移出时调用
 * 1，取消地铁高亮显示
 * 2，清除起始结束点
 * 3，列表水滴点回复红色
 * @param {object} lineObj (input optional)
 * 触摸地铁线段时获取到的需要高亮显示的地铁数据
 * @return {null}
 * @author 郑文彬
 * @create 20180417
 ***********************************/
IntelligentRoadTest.roadMouseout = function IntelligentRoadTest_roadMouseout(lineObj) {
    /*for (let i = 0; i < IntelligentRoadTest.roadHighlightDataOverlay.length; i++) {
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.roadHighlightDataOverlay[i]);
    }
    IntelligentRoadTest.roadHighlightDataOverlay = [];*/

    if(IntelligentRoadTest.roadHighlightDataOverlayObj){
        IntelligentRoadTest.roadHighlightDataOverlayObj.clearCanvasLayers();
        IntelligentRoadTest.roadHighlightDataOverlayObj.lineDataObject = null;
        IntelligentRoadTest.roadHighlightDataOverlayObj.lineDataObject = [];
    }



    // IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metro78HighlightPoly);
    // IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metorMkSatr);
    // IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metorMkEnd);
    if (IntelligentRoadTest.roadIndex == 2) {
        if (lineObj.line_id != undefined ) {
            $("#showRailListDiv li :contains(路段编号：'" + lineObj.line_id + "')").parent().eq(0).css('background-color', '#ffff');
            $("#showRailListDiv li :contains('路段编号：" + lineObj.line_id  + "')").prev('.numSpan').css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
        } else {
            $("#showRailListDiv li").css('background-color', '#fff');
            // $("#showMetroListDiv li").eq(0).css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
            $("#showRailListDiv li").each(function (i) {
                let bgCdd = $(this).children('div').children().eq(0).css("background");
                if (bgCdd.indexOf("/images/marker2.png") >= 0) {
                    $(this).children('div').children().eq(0).css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
                }
            });
        }

    } else {
        if (lineObj.road_name == undefined) {
            $("#showRailListDiv li").css('background-color', '#fff');
            $("#showRailListDiv li").each(function (i) {
                let bgCdd = $(this).children('div').children().eq(0).css("background");
                if (bgCdd.indexOf("/images/marker2.png") >= 0) {
                    $(this).children('div').children().eq(0).css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
                }
            });
            // $("#showMetroDiv li").eq(0).css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
        } else {
            $("#showRailDiv li :contains('" + lineObj.road_name + "')").parent().eq(0).css('background-color', '#ffff');
            $("#showRailDiv li :contains('" + lineObj.road_name + "')").prev('.numSpan').css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
        }


    }
    for(let i = 0; i < IntelligentRoadTest.roadMarkerList.length; i++){ //移除起止点
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.roadMarkerList[i]);
    }
    IntelligentRoadTest.roadMarkerList = [];
}

/**********************************
 * @funcname intelligentRoadTest.roadContinueMouseover
 * @funcdesc 地铁连片线段鼠标移入时调用
 * 1，地铁数据高亮显示
 * 2，打印选中地铁线段的起始结束点
 * 3，列表水滴点变为蓝色
 * @param {object} data (input optional)
 * 触摸地铁线段时获取到的需要高亮显示的地铁数据
 * @return {null}
 * @author 郑文彬
 * @create 20180417
 ***********************************/
IntelligentRoadTest.roadContinueMouseover = function IntelligentRoadTest_roadContinueMouseover(lineObj) {
    IntelligentRoadTest.gotoRailSecondListByLineObj(lineObj);
    if(lineObj != null && lineObj.centerPoint == null && lineObj.longitude_mid != null && lineObj.latitude_mid != null){ //移入列表
        lineObj.centerPoint = new BMap.Point(lineObj.longitude_mid , lineObj.latitude_mid);
   }
    if (IntelligentRoadTest.roadIndex == 1) {

        let line_id_result = [];
        if(IntelligentRoadTest.roadStatus == 3){//连片
            for(let i = 0; i < IntelligentRoadTest.railContinueResult.length; i++){
                if(IntelligentRoadTest.railContinueResult[i].road_id == lineObj.road_id){
                    line_id_result.push(IntelligentRoadTest.railContinueResult[i]);
                }
            }
        }else if(IntelligentRoadTest.roadStatus == 1){ //隧道
            for(let i = 0; i < IntelligentRoadTest.railContinueResult.length; i++){
                if(IntelligentRoadTest.railContinueResult[i].road_id == lineObj.road_id){
                    line_id_result.push(IntelligentRoadTest.railContinueResult[i]);
                }
            }
        }
        // IntelligentRoadTest.railContinueHighlightData = line_id_result;
        IntelligentRoadTest.roadContinueHighlightFirst(line_id_result);
    } else if (IntelligentRoadTest.roadIndex == 2) {
        let line_id_result = [];
                if(IntelligentRoadTest.roadStatus == 3){ //连片
            for(let i = 0; i < IntelligentRoadTest.railContinueResult.length; i++){
                if(IntelligentRoadTest.railContinueResult[i].road_id == lineObj.road_id && IntelligentRoadTest.railContinueResult[i].object_id == lineObj.object_id){
                    line_id_result.push(IntelligentRoadTest.railContinueResult[i]);
                }
            }
        }else if(IntelligentRoadTest.roadStatus == 1){ //隧道
            for(let i = 0; i < IntelligentRoadTest.railContinueResult.length; i++){
                if(IntelligentRoadTest.railContinueResult[i].line_id == lineObj.line_id){
                    line_id_result.push(IntelligentRoadTest.railContinueResult[i]);
                }
            }
        }
        // IntelligentRoadTest.railContinueHighlightData = line_id_result;
        IntelligentRoadTest.roadContinueHighlightFirst(line_id_result);
    } else if (IntelligentRoadTest.roadIndex == 3 || IntelligentRoadTest.roadIndex == 4) {
        // let line_id_result = lineObj;
        // IntelligentRoadTest.railHighlightData = line_id_result;
        IntelligentRoadTest.roadContinueHighlightFirst(lineObj);
    }
    if (IntelligentRoadTest.roadIndex == 2) {
        if (lineObj.object_id != "" && lineObj.object_id != null ) {
            if(IntelligentRoadTest.roadStatus == 1){ //隧道的第二层是隧道ID
                $("#showRailListDiv li :contains('隧道ID：" + lineObj.line_id + "')").parent().eq(0).css('background-color', '#f7f7f7');;
                $("#showRailListDiv li :contains('隧道ID：" + lineObj.line_id  + "')").prev('.numSpan').css("background", "url(" + "../js/IntelligentRoadTest/images/maker2.png" + ")");

                $("#showRailListDiv li :contains('隧道ID：" + lineObj.line_id  + "')").parent().eq(0).bind('mouseout', lineObj, function (event) {
                    $("#showRailListDiv li :contains('隧道ID：" + event.data.line_id + "')").parent().eq(0).css('background-color', '#fffff');
                    $("#showRailListDiv li :contains('隧道ID：" + event.data.line_id + "')").prev('.numSpan').css("background", "url(" + "../js/IntelligentRoadTestV5/images/bg_num.png" + ")");
                });
            }else{
                $("#showRailListDiv li :contains('路段编号：" + lineObj.object_id + "')").parent().eq(0).css('background-color', '#f7f7f7');;
                $("#showRailListDiv li :contains('路段编号：" + lineObj.object_id  + "')").prev('.numSpan').css("background", "url(" + "../js/IntelligentRoadTest/images/maker2.png" + ")");

                $("#showRailListDiv li :contains('路段编号：" + lineObj.object_id  + "')").parent().eq(0).bind('mouseout', lineObj, function (event) {
                    $("#showRailListDiv li :contains('路段编号：" + event.data.object_id + "')").parent().eq(0).css('background-color', '#fffff');
                    $("#showRailListDiv li :contains('路段编号：" + event.data.object_id + "')").prev('.numSpan').css("background", "url(" + "../js/IntelligentRoadTestV5/images/bg_num.png" + ")");
                });
            }

        }
    } else if (IntelligentRoadTest.roadIndex == 1) {
        if (lineObj.road_id != "" && lineObj.road_id != null) {
            if(IntelligentRoadTest.roadStatus == 1){
                $("#" + lineObj.road_id).parent().eq(0).css('background-color', '#f7f7f7');
                $("#" + lineObj.road_id).children().eq(0).css("background", "url(" + "../js/IntelligentRoadTestV5/images/maker2.png" + ")");

                $("#" + lineObj.road_id).parent().eq(0).bind('mouseout', lineObj, function (event) {
                    $("#" + lineObj.road_id).parent().eq(0).css('background-color', '#fffff');
                    $("#" + lineObj.road_id).children().eq(0).css("background", "url(" + "../js/IntelligentRoadTestV5/images/bg_num.png" + ")");
                });
            }else{
                $("#showRailDiv li :contains('" + lineObj.road_name + "')").parent().eq(0).css('background-color', '#f7f7f7');
                $("#showRailDiv li :contains('" + lineObj.road_name + "')").prev().css("background", "url(" + "../js/IntelligentRoadTestV5/images/maker2.png" + ")");

                $("#showRailDiv li :contains('" + lineObj.road_name + "')").parent().eq(0).bind('mouseout', lineObj, function (event) {
                    $("#showRailDiv li :contains('" + event.data.road_name + "')").parent().eq(0).css('background-color', '#fffff');
                    $("#showRailDiv li :contains('" + event.data.road_name + "')").prev().css("background", "url(" + "../js/IntelligentRoadTestV5/images/bg_num.png" + ")");
                });
            }
        }
    }

    // document.getElementById(i).scrollIntoView();
    // IntelligentRoadTest.suiDaoInfoWindow = {};
    //这里增加显示隧道名称的代码

    if(IntelligentRoadTest.roadStatus == 1 && IntelligentRoadTest.roadIndex == 2){ //隧道
        if(lineObj.centerPoint != null){
            // IntelligentRoadTest.suiDaoCompOverlay 自定义覆盖物的变量
            IntelligentRoadTest.openInfoWindow(lineObj.centerPoint.lng, lineObj.centerPoint.lat, lineObj.road_name , true , 666);
            $("#cirTip").css("z-index" , 99999999);
            if(lineObj.longitude_mid == null && lineObj.latitude_mid == null){ //这样表示是从地图移入的
                if(document.getElementById(lineObj.line_id) != null){
                    document.getElementById(lineObj.line_id).scrollIntoView();
                }
            }
        }
    }

}

/**
 * ********************************
 * @funcname IntelligentRoadTest.gotoRailSecondListByLineObj
 * @funcdesc 根据传入的路段对象，定位到它在列表的哪一页，并将列表跳转到那一页去
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.gotoRailSecondListByLineObj = function (lineObj) {
    if(IntelligentRoadTest.roadIndex != 2 && IntelligentRoadTest.roadStatus == 1){ //只有隧道第二层才有执行下面代码的资格
        return;
    }
    if(!isNull(lineObj) && lineObj.line_id != null){ //参数不为空并且隧道名称不为空
        let index = 0;
        for(let i = 0; i < IntelligentRoadTest.railSecondListCurrentResult.length; i++){
            if(IntelligentRoadTest.railSecondListCurrentResult[i].line_id == lineObj.line_id){ //匹配上了
                index = i+1;//这里为什么要加1，是因为数组从0开始，而列表从1开始
            }
        }
        let pageIndex = Math.ceil(index/20); //获取所在的页数
        if($("#railSecondListPage").val() == pageIndex){  //在同一页不需要跳转
            return;
        }
        $("#railSecondListPage").val(pageIndex);//修改当前页数
        IntelligentRoadTest.railSecondVM.gotoPage();//跳转到那一页
    }
}


IntelligentRoadTest.roadContinueHighlightDataOverlay = [];//存放连片高亮的覆盖物数组
/**********************************
 * @funcname intelligentRoadTest.roadContinueHighlightFirst
 * @funcdesc 连片数据高亮显示
 * @param {object} data (input optional)
 *
 * @return {null}
 * @author 郑文彬
 * @create 20180417
 ***********************************/
IntelligentRoadTest.roadContinueHighlightFirst = function IntelligentRoadTest_roadContinueHighlightFirst(result) {
    IntelligentRoadTest.removeRoadHighlightFirstOverlay();

    if(IntelligentRoadTest.roadHighlightDataOverlayObj == null){
        let option = {
            lineIndex: 99,
            lineWeight: 12,
        }
        IntelligentRoadTest.roadHighlightDataOverlayObj = new LineUtilForBaidu(IntelligentRoadTest.map,option)

    }
    IntelligentRoadTest.roadHighlightDataOverlayObj.lineDataObject = null;
    IntelligentRoadTest.roadHighlightDataOverlayObj.lineDataObject = [].concat(result);
    IntelligentRoadTest.roadHighlightDataOverlayObj.lineOpacity = IntelligentRoadTest.lineOpacity;
    IntelligentRoadTest.roadHighlightDataOverlayObj._clearLayers = false;
    IntelligentRoadTest.roadHighlightDataOverlayObj.draw();

/*
    for (let i = 0; i < IntelligentRoadTest.roadContinueHighlightDataOverlay.length; i++) {
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.roadContinueHighlightDataOverlay[i]);
    }
    /!*for(let k = 0; k < IntelligentRoadTest.roadMarkerList.length; k++){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.roadMarkerList[k]);
    }*!/
    // IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metorMkSatr);
    // IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metorMkEnd);
    IntelligentRoadTest.roadContinueHighlightDataOverlay = [];
    // let result = callBackChangeData(data);
    //latitude_mid longitude_mid--
    if(IntelligentRoadTest.roadIndex > 2){
        result = [result];
    }
    // let orderArr = result.sort(compare("line_id"));

    for (let i = 0; i < result.length; i++) {

        let pointArr = result[i].pointArr;

        let roadLine = new BMap.Polyline(pointArr);
//        metroStationToStationLine.setStrokeColor('#00330d');

        // roadLine.setStrokeColor(result[i].color);
        roadLine.setStrokeColor('#9ffb13');
        roadLine.setStrokeOpacity(IntelligentRoadTest.lineOpacity);
        roadLine.setStrokeWeight(IntelligentRoadTest.railContinueLineUtil.lineWeight * 2);

        roadLine.city_id = result[i].city_id;
        roadLine.road_id = result[i].road_id;
        roadLine.object_id = result[i].object_id;
        roadLine.city = result[i].city;
       /!* roadLine.line_rsrp = result[i].line_rsrp;
        roadLine.dx_rsrp_140_cnt = result[i].dx_rsrp_140_cnt;
        roadLine.min_userex_upavgrate = result[i].min_userex_upavgrate;
        roadLine.min_userex_dwavgrate = result[i].min_userex_dwavgrate;*!/
        //roadLine.obj = result[i]; //将所有的数据保存在一个对象中，点击线段的时候将这个对象传递过去
        /!*let markerPoint = null;
        if(result[i].from_station_longitude!=null&&result[i].from_station_latitude){
            let from_station_id_str = String(result[i].from_station_id);
            let statioinNum = parseInt(from_station_id_str.substring(from_station_id_str.length-2));
            if(statioinNum<2){
                // markerPoint = new BMap.Point(result[i].from_station_longitude,result[i].from_station_latitude);
            }
        }
        metroStationToStationLine.addEventListener("click", function (e) {

            if (IntelligentRoadTest.second) {
                //如果在二级列表，则需要加载站与站直接78米一段的数据
                let city_id = e.target.city_id;
                let from_station_id = e.target.from_station_id;
                let to_station_id = e.target.to_station_id;
//                IntelligentRoadTest.queryMetroStationToStationLine(city_id,from_station_id,to_station_id);
                IntelligentRoadTest.metroClick(this.obj, 2);
                // IntelligentRoadTest.metroSecondVM.showMessage(this.obj, null);
            } else {
                //需要增加判断，如果是1列表时点击，需要保留点击线段所在的地铁线，其他地铁线进行隐藏
                IntelligentRoadTest.metroClick(this, 1);
                IntelligentRoadTest.metroVM.goNextList(this.obj, null);
            }
        });*!/
        IntelligentRoadTest.map.addOverlay(roadLine);
        IntelligentRoadTest.roadContinueHighlightDataOverlay.push(roadLine);
    }*/

    if(result){
        if(IntelligentRoadTest.roadIndex > 1 && result.length > 0){ //从第三层开始
            let endPoint = result[0].pointArr[0]; //第一个点
            let resultLength = result.length;
            let startPointIndex = result[resultLength - 1].pointArr.length - 1;
            let startPoint = result[resultLength - 1].pointArr[startPointIndex]; //第二个点
            IntelligentRoadTest.roadOverStarEndMk(startPoint , endPoint);//鼠标移入显示起止点
        }
    }
    result = null;

}
/**********************************
 * @funcname intelligentRoadTest.metroMouseout
 * @funcdesc 地铁线段鼠标移出时调用
 * 1，取消地铁高亮显示
 * 2，清除起始结束点
 * 3，列表水滴点回复红色
 * @param {object} lineObj (input optional)
 * 触摸地铁线段时获取到的需要高亮显示的地铁数据
 * @return {null}
 * @author 郑文彬
 * @create 20180417
 ***********************************/
IntelligentRoadTest.roadContinueMouseout = function IntelligentRoadTest_roadContinueMouseout(lineObj) {
    // IntelligentRoadTest.map.closeInfoWindow();//关闭窗口
    /*if(IntelligentRoadTest.myCompOverlay != null){ //移除隧道名称的提示框
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.myCompOverlay);
    }*/

    IntelligentRoadTest.removeRoadHighlightFirstOverlay();

    for (let i = 0; i < IntelligentRoadTest.roadContinueHighlightDataOverlay.length; i++) {
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.roadContinueHighlightDataOverlay[i]);
    }
    IntelligentRoadTest.roadContinueHighlightDataOverlay = [];
    lineObj.line_id = lineObj.object_id; //统一一下名称
    // IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metro78HighlightPoly);
    // IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metorMkSatr);
    // IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metorMkEnd);
    if (IntelligentRoadTest.roadIndex == 2) {
        if (lineObj.line_id != undefined ) {
            if(IntelligentRoadTest.roadStatus == 1){
                $("#showRailListDiv li :contains('隧道ID：" + lineObj.line_id + "')").parent().eq(0).css('background-color', '#ffff');
                $("#showRailListDiv li :contains('隧道ID：" + lineObj.line_id  + "')").prev().css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
            }else{
                $("#showRailListDiv li :contains('路段编号：" + lineObj.line_id + "')").parent().eq(0).css('background-color', '#ffff');
                $("#showRailListDiv li :contains('路段编号：" + lineObj.line_id  + "')").prev('.numSpan').css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
            }
        } else {
            $("#showRailListDiv li").css('background-color', '#fff');
            // $("#showMetroListDiv li").eq(0).css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
            $("#showRailListDiv li").each(function (i) {
                let bgCdd = $(this).children('div').children().eq(0).css("background");
                if (bgCdd.indexOf("/images/marker2.png") >= 0) {
                    $(this).children('div').children().eq(0).css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
                }
            });
        }

    } else {
        if (lineObj.road_name == undefined) {
            $("#showRailListDiv li").css('background-color', '#fff');
            $("#showRailListDiv li").each(function (i) {
                let bgCdd = $(this).children('div').children().eq(0).css("background");
                if (bgCdd.indexOf("/images/marker2.png") >= 0) {
                    $(this).children('div').children().eq(0).css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
                }
            });
            // $("#showMetroDiv li").eq(0).css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
        } else {
            if(IntelligentRoadTest.roadStatus == 1){ //隧道
                $("#" + lineObj.road_id).parent().eq(0).css('background-color', '#ffff');
                $("#" + lineObj.road_id).children().eq(0).css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
            }else{
                $("#showRailDiv li :contains('" + lineObj.road_name + "')").parent().eq(0).css('background-color', '#ffff');
                $("#showRailDiv li :contains('" + lineObj.road_name + "')").prev().css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
            }
        }


    }
    for(let i = 0; i < IntelligentRoadTest.roadMarkerList.length; i++){ //移除起止点
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.roadMarkerList[i]);
    }
    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.suiDaoCompOverlay);
    $("#cirTip").hide(); //如果上面的代码无法隐藏，只能使用这个隐藏了。
    IntelligentRoadTest.suiDaoCompOverlay = {};
    IntelligentRoadTest.roadMarkerList = [];
}
IntelligentRoadTest.roadMarkerList = []; //存放移入显示的起始点和终点的数组
IntelligentRoadTest.roadHighlightDataOverlay = []; //道路高亮的对象的数组
/**********************************
 * @funcname intelligentRoadTest.metroHighlight
 * @funcdesc 地铁数据高亮显示
 * @param {object} data (input optional)
 * 触摸地铁线段时获取到的需要高亮显示的地铁数据
 * @return {null}
 * @author 郑文彬
 * @create 20180417
 ***********************************/
IntelligentRoadTest.roadHighlightFirst = function IntelligentRoadTest_roadHighlightFirst(result) {
    if(IntelligentRoadTest.roadHighlightDataOverlayObj == null){
        let option = {
            lineIndex: 99,
            lineWeight: 12,
        }
        IntelligentRoadTest.roadHighlightDataOverlayObj = new LineUtilForBaidu(IntelligentRoadTest.map,option)
    }

    IntelligentRoadTest.roadHighlightDataOverlayObj.lineDataObject = null;
    IntelligentRoadTest.roadHighlightDataOverlayObj.lineDataObject = result;
    IntelligentRoadTest.roadHighlightDataOverlayObj.lineOpacity = IntelligentRoadTest.lineOpacity;
    IntelligentRoadTest.roadHighlightDataOverlayObj.draw();


    /*for (let i = 0; i < IntelligentRoadTest.roadHighlightDataOverlay.length; i++) {
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.roadHighlightDataOverlay[i]);
    }
    IntelligentRoadTest.roadHighlightDataOverlay = [];*/

    for(let k = 0; k < IntelligentRoadTest.roadMarkerList.length; k++){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.roadMarkerList[k]);
    }
    IntelligentRoadTest.roadMarkerList = [];

    /*if(IntelligentRoadTest.roadIndex > 2){
        result = [result];
    }

    for (let i = 0; i < result.length; i++) {

        //此时显示的是20米线段，如果数据长度超过500，进行抽稀
        if(IntelligentRoadTest.map.getZoom() > IntelligentRoadTest.markarClusterZoom && result.length > 500){
            if(i%IntelligentRoadTest.lineDilutionNum != 0){
                continue;
            }
        }

        let pointArr = result[i].pointArr;

        let roadLine = new BMap.Polyline(pointArr);

        roadLine.setStrokeColor(result[i].color);
        roadLine.setStrokeOpacity(IntelligentRoadTest.lineOpacity);
        roadLine.setStrokeWeight(IntelligentRoadTest.railLineUtil.lineWeight * 2);

        /!*roadLine.city_id = result[i].city_id;
        roadLine.road_id = result[i].road_id;
        roadLine.line_id = result[i].line_id;
        roadLine.city = result[i].city;
        roadLine.line_rsrp = result[i].line_rsrp;
        roadLine.dx_rsrp_140_cnt = result[i].dx_rsrp_140_cnt;
        roadLine.min_userex_upavgrate = result[i].min_userex_upavgrate;
        roadLine.min_userex_dwavgrate = result[i].min_userex_dwavgrate;*!/
        //roadLine.obj = result[i]; //将所有的数据保存在一个对象中，点击线段的时候将这个对象传递过去
        /!*let markerPoint = null;
        if(result[i].from_station_longitude!=null&&result[i].from_station_latitude){
            let from_station_id_str = String(result[i].from_station_id);
            let statioinNum = parseInt(from_station_id_str.substring(from_station_id_str.length-2));
            if(statioinNum<2){
                // markerPoint = new BMap.Point(result[i].from_station_longitude,result[i].from_station_latitude);
            }
        }
        metroStationToStationLine.addEventListener("click", function (e) {

            if (IntelligentRoadTest.second) {
                //如果在二级列表，则需要加载站与站直接78米一段的数据
                let city_id = e.target.city_id;
                let from_station_id = e.target.from_station_id;
                let to_station_id = e.target.to_station_id;
//                IntelligentRoadTest.queryMetroStationToStationLine(city_id,from_station_id,to_station_id);
                IntelligentRoadTest.metroClick(this.obj, 2);
                // IntelligentRoadTest.metroSecondVM.showMessage(this.obj, null);
            } else {
                //需要增加判断，如果是1列表时点击，需要保留点击线段所在的地铁线，其他地铁线进行隐藏
                IntelligentRoadTest.metroClick(this, 1);
                IntelligentRoadTest.metroVM.goNextList(this.obj, null);
            }
        });*!/
        IntelligentRoadTest.map.addOverlay(roadLine);
        IntelligentRoadTest.roadHighlightDataOverlay.push(roadLine);
    }*/
    if(result){
        if(IntelligentRoadTest.roadIndex > 1 && result.length > 0){ //从第三层开始
            let endPoint = result[0].pointArr[0]; //第一个点
            let resultLength = result.length;
            let startPointIndex = result[resultLength - 1].pointArr.length - 1;
            let startPoint = result[resultLength - 1].pointArr[startPointIndex]; //第二个点
            IntelligentRoadTest.roadOverStarEndMk(startPoint , endPoint);//鼠标移入显示起止点
        }
    }
    result = null;
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.removeRoadHighlightFirstOverlay
 * @funcdesc 清除500米的高亮线段
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.removeRoadHighlightFirstOverlay = function(){
    for (let i = 0; i < IntelligentRoadTest.roadHighlightDataOverlay.length; i++) {
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.roadHighlightDataOverlay[i]);
    }
    for(let k = 0; k < IntelligentRoadTest.roadMarkerList.length; k++){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.roadMarkerList[k]);
    }
    IntelligentRoadTest.roadHighlightDataOverlay = null;
    IntelligentRoadTest.roadHighlightDataOverlay = [];

    IntelligentRoadTest.roadMarkerList = null;
    IntelligentRoadTest.roadMarkerList = [];

    if(IntelligentRoadTest.roadHighlightDataOverlayObj){
        IntelligentRoadTest.roadHighlightDataOverlayObj.clearCanvasLayers();
        IntelligentRoadTest.roadHighlightDataOverlayObj.lineDataObject = null;
        IntelligentRoadTest.roadHighlightDataOverlayObj.lineDataObject = [];
    }

}

IntelligentRoadTest.showRoad20MCompleteMessage = function IntelligentRoadTest_showRoad20MCompleteMessage( lineId, obj, divID, type) {
    // IntelligentRoadTest.hideGridOrPolygonNrTop5SectorOsm();
    // IntelligentRoadTest.hideGridOrPolygonMrTop5SectorOsm();
    let rowkey = [IntelligentRoadTest.day, 20, type, obj.city_id, obj.road_id, lineId];
    IntelligentRoadTest.getRoadSeventDayDataByLineId(rowkey);
    $(divID).find(".linkCell").attr("title", "显示连线");
    $(divID).find(".linkCell").removeClass("linkCellHover");
    if (type == 1) {
        let echartsTitle = "历史7天覆盖变化";
        let mrNearTOP5 = [];
        if (obj.sector_set != null && obj.sector_set != "") {
            let mrTo5DataArr = obj.sector_set.split("@");
            for (let k = 0; k < mrTo5DataArr.length; k++) {
                mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
            }
        }
        if (IntelligentRoadTest.highwayVueObj == null) {
            IntelligentRoadTest.highwayVueObj = new Vue({
                el: divID,
                data: {
                    objData: obj,
                    line_id: lineId,
                    mrTop5Cell: mrNearTOP5,
                    title: echartsTitle
                },
                methods: {
                    showDetailInfo: function (event) {
                        IntelligentRoadTest.showDetailInfo(event);
                    },
                    showLinkCell: function (event, item, type) {
                        //type=1最近小区，type=2 接入扇区
                        if ($(event.currentTarget).hasClass("linkCellHover")) {
                            $(event.currentTarget).attr("title", "显示连线");
                            $(event.currentTarget).removeClass("linkCellHover");
                            // $(event.currentTarget).children().attr("src",norImg);
                            if (type == 1) {
                                IntelligentRoadTest.hideGridOrPolygonNrTop5SectorOsm();
                            } else if (type == 2) {
                                IntelligentRoadTest.hideGridOrPolygonMrTop5SectorOsm();
                            }
                        } else {
                            $(event.currentTarget).attr("title", "隐藏连线");
                            $(event.currentTarget).addClass("linkCellHover");
                            // $(event.currentTarget).children().attr("src",clickImg);
                            // let max_lng =
                            // let centerPoint = new BMap.Point(item.longitude_mid, item.latitude_mid);
                            let mid_lng = item.longitude_mid;
                            let mid_lat = item.latitude_mid;
                            let centerPoint = new L.LatLng(mid_lat, mid_lng);
                            if (type == 1) {
                                IntelligentRoadTest.showNrTop5CellForMapByOsm(centerPoint, item.top5_sector_set);
                            } else if (type == 2) {
                                IntelligentRoadTest.showMrNrTop5CellForMapByOsm(centerPoint, item.sector_set);
                            }
                        }
                    },
                    gotoAlarmList: function (item) {
                        if (item.sector_set != null) {
                            let sectorArr = item.sector_set.split("@");
                            IntelligentRoadTest.loadAlarmListData(sectorArr);
                            $("#alarmBackPoor").html("返回上一级");
                        }
                    },
                    gotoKPIList: function (item) {
                        if (item.sector_set != null) {
                            let sectorArr = item.sector_set.split("@");
                            showOrHideInputImage(2);
                            IntelligentRoadTest.loadKPIListData(sectorArr);
                            $("#kpiBackPoor").html("返回上一级");
                        }
                    },
                    gotoShowSectorMessage: function (sectorDate) {
                        // console.log(sectorDate);
                        IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid, sectorDate.cellid, IntelligentRoadTest.day);
                    }
                }
            });
        } else {
            IntelligentRoadTest.highwayVueObj.objData = obj;
            IntelligentRoadTest.highwayVueObj.line_id = lineId;
            IntelligentRoadTest.highwayVueObj.mrTop5Cell = mrNearTOP5;
            IntelligentRoadTest.highwayVueObj.title = echartsTitle;
        }
    } else if (type == 2) {
        if(obj.longitude_mid != null && obj.latitude_mid != null){
            obj = IntelligentRoadTest.changeRailBaiduCenterPointToGPS(obj);
            let centerPoint = new BMap.Point(obj.longitude_mid , obj.latitude_mid);
            IntelligentRoadTest.map.panTo(centerPoint);
        }
        if(!isNull(obj.longitude_max) && !isNull(obj.longitude_min) && !isNull(obj.latitude_max) && !isNull(obj.latitude_min)){
            let startPoint = new BMap.Point(obj.longitude_max , obj.latitude_max);
            let endPoint = new BMap.Point(obj.longitude_min , obj.latitude_min);
            IntelligentRoadTest.road20MStarEndMk(startPoint , endPoint);
        }
        let echartsTitle = "历史7天覆盖变化";
        let mrNearTOP5 = [];
        if (obj.sector_set != null && obj.sector_set != "") {
            let mrTo5DataArr = obj.sector_set.split("@");
            for (let k = 0; k < mrTo5DataArr.length; k++) {
                mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
            }
        }
        if (IntelligentRoadTest.railVueObj == null) {
            IntelligentRoadTest.railVueObj = new Vue({
                el: divID,
                data: {
                    objData: obj,
                    line_id: lineId,
                    mrTop5Cell: mrNearTOP5,
                    title: echartsTitle
                },
                methods: {
                    showDetailInfo: function (event) {
                        IntelligentRoadTest.showDetailInfo(event);
                    },
                    showLinkCell: function (event, item, type) {
                        //type=1最近小区，type=2 接入扇区
                        if ($(event.currentTarget).hasClass("linkCellHover")) {
                            $(event.currentTarget).attr("title", "显示连线");
                            $(event.currentTarget).removeClass("linkCellHover");
                            // $(event.currentTarget).children().attr("src",norImg);
                            if (type == 1) {
                                IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                            } else if (type == 2) {
                                IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                            }
                        } else {
                            $(event.currentTarget).attr("title", "隐藏连线");
                            $(event.currentTarget).addClass("linkCellHover");
                            // $(event.currentTarget).children().attr("src",clickImg);
                            // let max_lng =
                            // let centerPoint = new BMap.Point(item.longitude_mid, item.latitude_mid);
                            let mid_lng = item.longitude_mid;
                            let mid_lat = item.latitude_mid;
                            let centerPoint = new BMap.Point(mid_lng, mid_lat);
                            if (type == 1) {
                                IntelligentRoadTest.showNrTop5CellForMap(centerPoint, item.top5_sector_set);
                            } else if (type == 2) {
                                IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint, item.sector_set);
                            }
                        }
                    },
                    gotoAlarmList: function (item) {
                        if (item.sector_set != null) {
                            let sectorArr = item.sector_set.split("@");
                            IntelligentRoadTest.loadAlarmListData(sectorArr);
                            $("#alarmBackPoor").html("返回上一级");
                        }
                    },
                    gotoKPIList: function (item) {
                        if (item.sector_set != null) {
                            let sectorArr = item.sector_set.split("@");
                            showOrHideInputImage(2);
                            IntelligentRoadTest.loadKPIListData(sectorArr);
                            $("#kpiBackPoor").html("返回上一级");
                        }
                    },
                    gotoShowSectorMessage: function (sectorDate) {
                        // console.log(sectorDate);
                        IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid, sectorDate.cellid, IntelligentRoadTest.day);
                    }
                }
            });
        } else {
            IntelligentRoadTest.railVueObj.objData = obj;
            IntelligentRoadTest.railVueObj.line_id = lineId;
            IntelligentRoadTest.railVueObj.mrTop5Cell = mrNearTOP5;
            IntelligentRoadTest.railVueObj.title = echartsTitle;
        }
    } else if (type == 3) {
        let echartsTitle = "历史7天覆盖变化";
        let mrNearTOP5 = [];
        if (obj.sector_set != null && obj.sector_set != "") {
            let mrTo5DataArr = obj.sector_set.split("@");
            for (let k = 0; k < mrTo5DataArr.length; k++) {
                mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
            }
        }
        if (IntelligentRoadTest.cityRoadVueObj == null) {
            IntelligentRoadTest.cityRoadVueObj = new Vue({
                el: divID,
                data: {
                    objData: obj,
                    line_id: lineId,
                    mrTop5Cell: mrNearTOP5,
                    title: echartsTitle
                },
                methods: {
                    showDetailInfo: function (event) {
                        IntelligentRoadTest.showDetailInfo(event);
                    },
                    showLinkCell: function (event, item, type) {
                        //type=1最近小区，type=2 接入扇区
                        if ($(event.currentTarget).hasClass("linkCellHover")) {
                            $(event.currentTarget).attr("title", "显示连线");
                            $(event.currentTarget).removeClass("linkCellHover");
                            // $(event.currentTarget).children().attr("src",norImg);
                            if (type == 1) {
                                IntelligentRoadTest.hideGridOrPolygonNrTop5SectorOsm();
                            } else if (type == 2) {
                                IntelligentRoadTest.hideGridOrPolygonMrTop5SectorOsm();
                            }
                        } else {
                            $(event.currentTarget).attr("title", "隐藏连线");
                            $(event.currentTarget).addClass("linkCellHover");
                            // $(event.currentTarget).children().attr("src",clickImg);
                            // let max_lng =
                            // let centerPoint = new BMap.Point(item.longitude_mid, item.latitude_mid);
                            let mid_lng = item.longitude_mid;
                            let mid_lat = item.latitude_mid;
                            let centerPoint = new L.LatLng(mid_lat, mid_lng);
                            if (type == 1) {
                                IntelligentRoadTest.showNrTop5CellForMapByOsm(centerPoint, item.top5_sector_set);
                            } else if (type == 2) {
                                IntelligentRoadTest.showMrNrTop5CellForMapByOsm(centerPoint, item.sector_set);
                            }
                        }
                    },
                    gotoAlarmList: function (item) {
                        if (item.sector_set != null) {
                            let sectorArr = item.sector_set.split("@");
                            IntelligentRoadTest.loadAlarmListData(sectorArr);
                            $("#alarmBackPoor").html("返回上一级");
                        }
                    },
                    gotoKPIList: function (item) {
                        if (item.sector_set != null) {
                            let sectorArr = item.sector_set.split("@");
                            showOrHideInputImage(2);
                            IntelligentRoadTest.loadKPIListData(sectorArr);
                            $("#kpiBackPoor").html("返回上一级");
                        }
                    },
                    gotoShowSectorMessage: function (sectorDate) {
                        // console.log(sectorDate);
                        IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid, sectorDate.cellid, IntelligentRoadTest.day);
                    }
                }
            });
        } else {
            IntelligentRoadTest.cityRoadVueObj.objData = obj;
            IntelligentRoadTest.cityRoadVueObj.line_id = lineId;
            IntelligentRoadTest.cityRoadVueObj.mrTop5Cell = mrNearTOP5;
            IntelligentRoadTest.cityRoadVueObj.title = echartsTitle;
        }
    }
}

//查询某个20米的线段历史7天的数据
IntelligentRoadTest.getRoadSeventDayDataByLineId = function (rowkey) {
    //DAY_`LINE_LEVEL`_`LINE_TYPE`_`CITY_ID`_`ROAD_ID`_`LINE_ID`
    let keyList = [];
    let dateList = [];
    for (let i = 7; i > 0; i--) {
        let day = new Date(dealDateString(IntelligentRoadTest.day).getTime() - (i - 1) * 24 * 60 * 60 * 1000).Format("yyyyMMdd");
        rowkey[0] = day;
        keyList.push(rowkey.join("_"));
        dateList.push(day);
    }
    let keyListStr = keyList.join(",");
    let cloumnsList = "i:a6,i:a7";
    let list = ["IntelligentRoadTestV5_getRoad20MDataByLineID", "KEYLIST:" + keyListStr, "COLUMNLIST:" + cloumnsList];
    let progressBarSqls = [];
    progressBarSqls.push(list);
    let functionlist = [IntelligentRoadTest.dealSeventDayDataByLineId];
    let dataBase = [7];
    progressbarTwo.submitSql(progressBarSqls, functionlist, dataBase, [rowkey]);
}

IntelligentRoadTest.dealRoadSeventDayDataByLineId = function IntelligentRoadTest_dealRoadSeventDayDataByLineId(data, params) {
    let result = callBackChangeData(data);
    let objResult = [];
    if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
            let obj = {};
            let dataArr = result[i];
            let time = dataArr["rowkey"].substr(0, 8); //日期
            obj.create_time = dealDateString(time).Format("yyyy-MM-dd");
            obj.rsrp = dataArr["i:a6"];
            obj.cover = dataArr["i:a7"];
            objResult.push(obj);
        }
    }
    let rowkey = params;
    let divID = "";
    if (rowkey[2] == "1") {
        divID = "highwayGridLineChart";
    } else if (rowkey[2] == "2") {
        divID = "railGridLineChart";
    } else if (rowkey[2] == "3") {
        divID = "cityRoadGridLineChart";
    }
    IntelligentRoadTest.showGridSevenDayEcharts(objResult, divID);
    showOrHideInputImage(1);
}

/**********************************
 * @funcname intelligentRoadTest.metorStarEndMk
 * @funcdesc 绘制鼠标移入线段时的起始结束点
 * @param {object} point (input optional)
 *起始点
 * @param {object} point2 (input optional)
 *结束点
 * @author 郑文彬
 * @create 20180417
 ***********************************/
IntelligentRoadTest.roadStarEndMk = function IntelligentRoadTest_roadStarEndMk(point, point2) {
//	 IntelligentRoadTest.metorStarPoint=point;
//	 IntelligentRoadTest.metorEndPoint=point2;
    if(IntelligentRoadTest.roadMkSatr != null){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.roadMkSatr);
    }
    if(IntelligentRoadTest.roadMkEnd != null){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.roadMkEnd);
    }
    let img = "../js/IntelligentRoadTest/images/bg_num.png";
    let myIcon = new BMap.Icon(img, new BMap.Size(22, 32));
    let marker = new BMap.Marker(point, {icon: myIcon});  // 创建标注
    let label = new BMap.Label('起', {
        offset: new BMap.Size(3, 3)
    });
    label.setStyle({
        background: 'none', color: "#fff", border: 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
        , fontWeight: 'bold'
    });
    marker.setLabel(label);
    marker.setOffset(
        new BMap.Size(0, -15)
    );
    IntelligentRoadTest.roadMkSatr = marker;
    IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.roadMkSatr);

    let myIcon2 = new BMap.Icon(img, new BMap.Size(22, 32));
    let marker2 = new BMap.Marker(point2, {icon: myIcon});  // 创建标注
    let label2 = new BMap.Label('止', {
        offset: new BMap.Size(3, 3)
    });
    label2.setStyle({
        background: 'none', color: "#fff", border: 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
        , fontWeight: 'bold'
    });
    marker2.setLabel(label2);
    marker2.setOffset(
        new BMap.Size(0, -15)
    );
    IntelligentRoadTest.roadMkEnd = marker2;
    IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.roadMkEnd);
}

IntelligentRoadTest.hideStartEndMarker = function (){
    if(!isNull(IntelligentRoadTest.roadMkSatr)){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.roadMkSatr);
    }
    if(!isNull(IntelligentRoadTest.roadMkEnd)){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.roadMkEnd);
    }
}


/**********************************
 * @funcname intelligentRoadTest.metorStarEndMk
 * @funcdesc 绘制20米线段时的起始结束点
 * @param {object} point (input optional)
 *起始点
 * @param {object} point2 (input optional)
 *结束点
 * @author 郑文彬
 * @create 20180417
 ***********************************/
IntelligentRoadTest.road20MStarEndMk = function IntelligentRoadTest_road20MStarEndMk(point, point2) {
//	 IntelligentRoadTest.metorStarPoint=point;
//	 IntelligentRoadTest.metorEndPoint=point2;
    if(IntelligentRoadTest.road20MMkSatr != null){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.road20MMkSatr);
    }
    if(IntelligentRoadTest.road20MMkEnd != null){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.road20MMkEnd);
    }
    let img = "../js/IntelligentRoadTest/images/bg_num.png";
    let myIcon = new BMap.Icon(img, new BMap.Size(22, 32));
    let marker = new BMap.Marker(point, {icon: myIcon});  // 创建标注
    let label = new BMap.Label('起', {
        offset: new BMap.Size(3, 3)
    });
    label.setStyle({
        background: 'none', color: "#fff", border: 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
        , fontWeight: 'bold'
    });
    marker.setLabel(label);
    marker.setOffset(
        new BMap.Size(0, -15)
    );
    IntelligentRoadTest.road20MMkSatr = marker;
    IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.road20MMkSatr);

    let myIcon2 = new BMap.Icon(img, new BMap.Size(22, 32));
    let marker2 = new BMap.Marker(point2, {icon: myIcon});  // 创建标注
    let label2 = new BMap.Label('止', {
        offset: new BMap.Size(3, 3)
    });
    label2.setStyle({
        background: 'none', color: "#fff", border: 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
        , fontWeight: 'bold'
    });
    marker2.setLabel(label2);
    marker2.setOffset(
        new BMap.Size(0, -15)
    );
    IntelligentRoadTest.road20MMkEnd = marker2;
    IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.road20MMkEnd);
}

IntelligentRoadTest.hide20MStartEndMarker = function (){
    if(!isNull(IntelligentRoadTest.road20MMkSatr)){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.road20MMkSatr);
    }
    if(!isNull(IntelligentRoadTest.road20MMkEnd)){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.road20MMkEnd);
    }
}
/**********************************
 * @funcname intelligentRoadTest.metorStarEndMk
 * @funcdesc 绘制鼠标移入线段时的起始结束点
 * @param {object} point (input optional)
 *起始点
 * @param {object} point2 (input optional)
 *结束点
 * @author 郑文彬
 * @create 20180417
 ***********************************/
IntelligentRoadTest.roadOverStarEndMk = function IntelligentRoadTest_roadOverStarEndMk(point, point2) {
//	 IntelligentRoadTest.metorStarPoint=point;
//	 IntelligentRoadTest.metorEndPoint=point2;
    for(let i = 0; i < IntelligentRoadTest.roadMarkerList.length; i++){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.roadMarkerList[i]);
    }
    IntelligentRoadTest.roadMarkerList = [];
    let img = "../js/IntelligentRoadTest/images/bg_num.png";
    let myIcon = new BMap.Icon(img, new BMap.Size(22, 32));
    let marker = new BMap.Marker(point, {icon: myIcon});  // 创建标注
    let label = new BMap.Label('起', {
        offset: new BMap.Size(3, 3)
    });
    label.setStyle({
        background: 'none', color: "#fff", border: 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
        , fontWeight: 'bold'
    });
    marker.setLabel(label);
    marker.setOffset(
        new BMap.Size(0, -15)
    );
    let roadMkSatr = marker;
    IntelligentRoadTest.map.addOverlay(roadMkSatr);
    IntelligentRoadTest.roadMarkerList.push(roadMkSatr);
    let myIcon2 = new BMap.Icon(img, new BMap.Size(22, 32));
    let marker2 = new BMap.Marker(point2, {icon: myIcon});  // 创建标注
    let label2 = new BMap.Label('止', {
        offset: new BMap.Size(3, 3)
    });
    label2.setStyle({
        background: 'none', color: "#fff", border: 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
        , fontWeight: 'bold'
    });
    marker2.setLabel(label2);
    marker2.setOffset(
        new BMap.Size(0, -15)
    );
    let roadMkEnd = marker2;
    IntelligentRoadTest.map.addOverlay(roadMkEnd);
    IntelligentRoadTest.roadMarkerList.push(roadMkEnd);
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.showRoadContinueData
 * @funcdesc 显示连片或者隧道的地图数据
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.showRoadContinueData = function(result){
    //console.log(result);
    let comResultArr = [];
    if(result.length > 0){
        for(let i = 0; i < result.length; i++){
            let str = result[i].gis_data;
            let startIndex = str.indexOf('(') + 1;
            let endIndex = str.lastIndexOf(')');
            let longLatStr = str.substring(startIndex , endIndex); //获取经纬度集合的字符串
            //经纬度集合是以逗号隔开每一个经纬度点，以空格隔开经度和纬度的
            let pointArr = IntelligentRoadTest.getPointArrByString(longLatStr); //获取百度点集合
            let object = {
                "city" : result[i].city,
                "road_name" : result[i].road_name,
                "contain_ids" : result[i].contain_ids,
                "object_id": result[i].object_id,
                "line_id" : result[i].line_id,
                "road_id": result[i].road_id,
                "pointArr" :pointArr,
                "roadIndex" : IntelligentRoadTest.roadIndex,
                "city_id" : result[i].city_id,
                "longitude_min": result[i].longitude_min,
                "latitude_min": result[i].latitude_min,
                "longitude_mid": result[i].longitude_mid,
                "latitude_mid": result[i].latitude_mid,
                "longitude_max": result[i].longitude_max,
                "latitude_max": result[i].latitude_max,
                "cent_point": new BMap.Point(result[i].longitude_mid,result[i].latitude_mid)
            }

            // IntelligentRoadTest.getRoadWeight
            if(IntelligentRoadTest.roadStatus == 3){ //连片
                object.color = "#C00000";
                object.line_id = result[i].object_id;
            }else{
                object.color = IntelligentRoadTest.lineProfileColor;
                object.line_id = result[i].id;
            }
            comResultArr.push(object);
        }
    }
    IntelligentRoadTest.drawRailWayContinue(comResultArr);
    if(IntelligentRoadTest.roadIndex < 3){ //小于3才可以缓存
        IntelligentRoadTest.railContinueResult = comResultArr;
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.getPointArrByString
 * @funcdesc 根据字符串切割出经纬度，然后返回一个百度地图点对象数组
 * @param {String} string ： 经纬度集合的字符串
 *
 * @return {Array}
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getPointArrByString = function(string){
    let pointArr = [];
    if(!isNull(string)){
        let pointList = string.split(",");
        for(let i = 0; i < pointList.length; i++){
            pointList[i] = pointList[i].trim();
        	let point = new BMap.Point(pointList[i].split(" ")[0] ,pointList[i].split(" ")[1]);
        	pointArr.push(point);
        }
    }
    return pointArr;
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.getRoadGisDataStr
 * @funcdesc 从原始的字符串中截取出每一段的经纬度字符串
 * @param string ： 原始字符串
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getRoadGisDataStr = function(string){

    let pointString = [];
    if(!isNull(string)){
        if(string.indexOf("MULTILINESTRING") > -1){ //表示这个字符串里面有多段线路
            string = string.substring(string.indexOf("(") + 1 , string.lastIndexOf(")") - 1); //去除外面的没用的字符
            let strList = string.split("),"); //根据这个截取出多段线路的信息
            for(let i = 0; i < strList.length; i++){
                if(strList[i].indexOf("(") > -1){
                    strList[i] = strList[i].replace("(" , "");
                }
                if(strList[i].indexOf(")") > -1){
                    strList[i] = strList[i].replace(")" , "");
                }
                strList[i] = strList[i].trim();
            }
            pointString = strList;
        }else{
            string = string.substring(string.indexOf("(") + 1 , string.lastIndexOf(")") - 1);
            pointString.push(string);
        }
    }
    return pointString;
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.getRoadSuiDaoGisData
 * @funcdesc 获取道路隧道第一二层的地图数据
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getRoadSuiDaoGisData = function ( city_name , road_type_id){
    if(IntelligentRoadTest.roadCurrentQueryCity == "全省"){
        city_name = "全省";
    }
    let sqlList = [];
    let cityCondition = " and city_name = '" + city_name + "' ";
    if(city_name == "全省"){
        cityCondition = "";
    }
    let list = ["IntelligentRoadTestAnalysisV5_getRoadSuiDaoGisData" , "CITYCONDITION:" + cityCondition , "ROAD_TYPE_ID:" + road_type_id ];
    if(IntelligentRoadTest.roadIndex == 2){
        //第二层需要根据地市和线路进行筛选
        list.push("ROAD_ID: AND ROAD_ID = " + IntelligentRoadTest.road_id);
    }else{
        list.push("ROAD_ID:");
    }
    sqlList.push(list);
    let funcList = [IntelligentRoadTest.dealRoadSuiDaoGisData];
    let database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database);
}

IntelligentRoadTest.dealRoadSuiDaoGisData = function IntelligentRoadTest_dealRoadSuiDaoGisData(data){
    let result = callBackChangeData(data);
    //console.log(result);
    IntelligentRoadTest.continueLineRailWayDataChe = result;

    if(IntelligentRoadTest.roadIndex == 2){
        //在第二层的时候，需要过滤出当前线路的隧道数据
        let railData = crossfilter(IntelligentRoadTest.continueLineRailWayDataChe); //创建一个crossfilter对象
        let railDataLineIDDim = railData.dimension(function (d) {
            return d.road_id;
        }); //按照线路id创建一个维度
        let finalLineData = railDataLineIDDim.filter(IntelligentRoadTest.road_id);
        IntelligentRoadTest.railSecondListMapResult = finalLineData.top(railData.size());
        IntelligentRoadTest.showRoadSuiDaoData(finalLineData.top(railData.size()));
        // currentShowResult = IntelligentRoadTest.railSecondListMapResult

        /*let points = [];
        for(let i = 0; i < IntelligentRoadTest.railSecondListMapResult.length; i++){
            let point_mid = new BMap.Point(IntelligentRoadTest.railSecondListMapResult[i].longitude_mid,IntelligentRoadTest.railSecondListMapResult[i].latitude_mid);
            points.push(point_mid);
        }
        IntelligentRoadTest.setRightCenterAndZoom(points);*/


    }else{
        IntelligentRoadTest.showRoadSuiDaoData(IntelligentRoadTest.continueLineRailWayDataChe);
    }




}

/**
 * ********************************
 * @funcname
 * @funcdesc
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.showRoadSuiDaoData = function(result){
    let comResultArr = [];
    if(result.length > 0){
        for(let i = 0; i < result.length; i++){
            let str = result[i].geom;
            /*let flag = false; //是否具有多条线段的标识
            if(str.indexOf("MULTILINESTRING") > -1){ //多条线段
                flag = true;
            }*/
            let pointStringArr = IntelligentRoadTest.getRoadGisDataStr(str); //获取各段线路的经纬度的字符串
            for(let m = 0; m < pointStringArr.length; m++){
                //经纬度集合是以逗号隔开每一个经纬度点，以空格隔开经度和纬度的
                let longLatStr = pointStringArr[m];
                let pointArr = IntelligentRoadTest.getPointArrByString(longLatStr); //获取百度点集合
                let centerPointStr = result[i].cent_geom; //中心点经纬度的字符串
                let centerPoint = null; //中心点
                if(centerPointStr != null){
                    centerPointStr = centerPointStr.trim().substring(centerPointStr.indexOf('(') + 1 , centerPointStr.indexOf(')')).trim();
                    centerPoint = new BMap.Point(parseFloat(centerPointStr.split(" ")[0]) , parseFloat(centerPointStr.split(" ")[1]));
                }
                let viewport = IntelligentRoadTest.map.getViewport(pointArr);
                let object = {
                    "city" : result[i].city_name,
                    "road_name" : result[i].road_name,
                    "contain_ids" : result[i].contain_ids,
                    "object_id": result[i].object_id,
                    "line_id" : result[i].line_id,
                    "road_id": result[i].road_id,
                    "pointArr" :pointArr,
                    "roadIndex" : IntelligentRoadTest.roadIndex,
                    "city_id" : result[i].city_id,
                    // "longitude_min": result[i].longitude_min,
                    // "latitude_min": result[i].latitude_min,
                    // "longitude_mid": result[i].longitude_mid,
                    // "latitude_mid": result[i].latitude_mid,
                    // "longitude_max": result[i].longitude_max,
                    // "latitude_max": result[i].latitude_max,
                    "centerPoint" : centerPoint,
                    "cent_point": viewport.center
                }


                if(result[i].line_id == null){
                    object.line_id = result[i].id;
                }
                if(result[i].object_id == null){
                    object.object_id = result[i].id;
                }

                // IntelligentRoadTest.getRoadWeight

                object.color = IntelligentRoadTest.lineProfileColor;
                comResultArr.push(object);
            }
        }
    }
    IntelligentRoadTest.drawRailWayContinue(comResultArr);

    if(IntelligentRoadTest.roadIndex < 3){ //小于3才可以缓存
        IntelligentRoadTest.railContinueResult = comResultArr;
    }
}


IntelligentRoadTest.showSuiDaoLineDataForChe = function IntelligentRoadTest_showSuiDaoLineDataForChe(data){
    let result = callBackChangeData(data);
    // let line_data_list = IntelligentRoadTest.parseGeoJsonForBaidu(result , true);
    IntelligentRoadTest.railContinueResult = IntelligentRoadTest.parseGeoJsonForBaidu(result , true);;
    //console.log(result);
    IntelligentRoadTest.osmColorLegen();
    //IntelligentRoadTest.showSuiDaoSmallLine(line_data_list);
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.showSuiDaoSmallLine
 * @funcdesc 显示隧道的详情页地图信息
 * @param {Array} result 从hbase查询回来的数据经过callbackChangeData转换后的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.showSuiDaoSmallLine = function(result,NotCenterAndZoom){
    if(NotCenterAndZoom != true){
        let points = [];
        for(let i = 0; i < result.length; i++){
            points = points.concat(result[i].pointArr);
        }
        IntelligentRoadTest.setRightCenterAndZoom(points); //定位并显示适当的级别
    }
    IntelligentRoadTest.drawRailWayContinue(result);
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.changeRailBaiduLocationToGPS
 * @funcdesc 高铁的百度转GPS方法
 * @param  {Object} item : 高铁的对象
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.changeRailBaiduLocationToGPS = function (item){
    /*longitude_min 起点经度
       latitude_min
       longitude_max
       latitude_max*/
    if(!isNull(item)){
        let startLatLng = GPSUtil.bd09_To_gps84(item.latitude_min , item.longitude_min);//将起始点的经纬度转成GPS的  [lat,lng]返回值是这个
        let endLatLng = GPSUtil.bd09_To_gps84(item.latitude_max , item.longitude_max);//将终止点的经纬度转成GPS的  [lat,lng]返回值是这个
        item.latitude_min_gps = startLatLng[0];
        item.longitude_min_gps = startLatLng[1];
        item.latitude_max_gps = endLatLng[0];
        item.longitude_max_gps = endLatLng[1];
    }else{
        item.latitude_min_gps = null
        item.longitude_min_gps =null;
        item.latitude_max_gps = null;
        item.longitude_max_gps =null
    }
    return item;
}


/**
 * ********************************
 * @funcname IntelligentRoadTest.changeRailBaiduCenterPointToGPS
 * @funcdesc 高铁的20米线段中心点百度转GPS方法
 * @param  {Object} item : 高铁的对象
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.changeRailBaiduCenterPointToGPS = function (item){
    /*longitude_mid
    latitude_mid*/

    if(!isNull(item)){
        var latLng = GPSUtil.bd09_To_gps84(item.latitude_mid , item.longitude_mid); //[lat,lng]返回值是这个
        item.latitude_mid_gps = latLng[0];
        item.longitude_mid_gps = latLng[1];
    }else{
        item.latitude_mid_gps = null
        item.longitude_mid_gps =null;

    }
    return item;
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealCentGeoDataToPoint
 * @funcdesc 将高铁第一层的中心经纬度字符串进行处理返回一个point
 * @param {String} geoString ： 经纬度字符串
 *
 * @return {Object}
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealCentGeoDataToPoint = function(geoString){
    var point = null
    if(!isNull(geoString)){ //字符串不为空
        var string = geoString.replace(")" , "").trim().substr(geoString.indexOf("(") + 1).trim();
        var lngLatArr = string.split(" ");
        console.log(lngLatArr);
        if(lngLatArr.length == 2){
            if(!isNull(lngLatArr[0]) && !isNull(lngLatArr[1])){
                point = new BMap.Point(parseFloat(lngLatArr[0]) , parseFloat(lngLatArr[1]));
            }
        }
    }
    return point;
}










//-------------------------------------------------------高铁新需求代码---------------------------------------
/*第二层更换为可切换场景，这些是点击事件*/
$("#rail500MSecond").click(function () {
    IntelligentRoadTest.roadStatus = 0; //高铁的场景分类，0表示综合 、 1表示隧道 、 2表示非隧道 3表示<-110连段
    IntelligentRoadTest.isLp = false;
    IntelligentRoadTest.isSuiDao = false;
    IntelligentRoadTest.railVM.type = false;
    if(IntelligentRoadTest.railContinueLineUtil != null){
        IntelligentRoadTest.railContinueLineUtil.clearCanvasLayers(); //清除连片的地图线路
    }

    //如果隧道聚合有对象，则将聚合点进行清除
    if(IntelligentRoadTest.railMarkerClusterer){
        IntelligentRoadTest.railMarkerClusterer.clearMarkers();
        IntelligentRoadTest.MarkerResultArr = [];
    }

    $("#railSecondListSelectName").html("综合");
    $(this).addClass("selected").siblings().removeClass("selected");
    $("#railSecondList").hide();
    IntelligentRoadTest.getRoadSecondListData(IntelligentRoadTest.road_id, IntelligentRoadTest.roadCurrentQueryCity, IntelligentRoadTest.day,
        2, false, IntelligentRoadTest.railIsPoor);
});

$("#railLPSecond").click(function () {
    IntelligentRoadTest.roadStatus = 3;
    IntelligentRoadTest.isLp = true;
    IntelligentRoadTest.isSuiDao = false;
    $("#railSecondListSelectName").html("<-110连段");
    $(this).addClass("selected").siblings().removeClass("selected");
    $("#railSecondList").hide();

    if(IntelligentRoadTest.railContinueLineUtil != null){
        IntelligentRoadTest.railContinueLineUtil.clearCanvasLayers(); //清除连片的地图线路
    }

    //如果隧道聚合有对象，则将聚合点进行清除
    if(IntelligentRoadTest.railMarkerClusterer){
        IntelligentRoadTest.railMarkerClusterer.clearMarkers();
        IntelligentRoadTest.MarkerResultArr = [];
    }

    //在第二层时，切换到连片，需要根据路线加载线段，并加载该线路的连片数据
    //IntelligentRoadTest.loadLineByLevelFromBounds();
    IntelligentRoadTest.queryContinueLine(IntelligentRoadTest.roadCurrentQueryCity, 2, IntelligentRoadTest.day, true)

    IntelligentRoadTest.getRoadSecondListData(IntelligentRoadTest.road_id, IntelligentRoadTest.roadCurrentQueryCity, IntelligentRoadTest.day,
        2, true, IntelligentRoadTest.railIsPoor);
});

$("#railSuiDaoSecond").click(function () {
    IntelligentRoadTest.roadStatus = 1;
    IntelligentRoadTest.isLp = false;
    IntelligentRoadTest.isSuiDao = true;
    IntelligentRoadTest.railVM.type = false;
    $("#railSecondListSelectName").html("隧道");
    $(this).addClass("selected").siblings().removeClass("selected");
    $("#railSecondList").hide();

    if(IntelligentRoadTest.railContinueLineUtil != null){
        IntelligentRoadTest.railContinueLineUtil.clearCanvasLayers(); //清除连片的地图线路
    }

    //如果隧道聚合有对象，则将聚合点进行清除
    if(IntelligentRoadTest.railMarkerClusterer){
        IntelligentRoadTest.railMarkerClusterer.clearMarkers();
        IntelligentRoadTest.MarkerResultArr = [];
    }

    //在第二层时，切换到隧道，需要根据路线加载视野线段，并加载该线路的隧道数据
    //IntelligentRoadTest.loadLineByLevelFromBounds();
    IntelligentRoadTest.getRoadSuiDaoGisData(IntelligentRoadTest.roadCurrentQueryCity,21);


    IntelligentRoadTest.getRoadSecondListData(IntelligentRoadTest.road_id, IntelligentRoadTest.roadCurrentQueryCity, IntelligentRoadTest.day,
        2, false, IntelligentRoadTest.railIsPoor);
});

$("#railNoSuiDaoSecond").click(function () {
    IntelligentRoadTest.roadStatus = 2;
    IntelligentRoadTest.isLp = false;
    IntelligentRoadTest.isSuiDao = false;
    IntelligentRoadTest.railVM.type = false;
    $("#railSecondListSelectName").html("非隧道");
    $(this).addClass("selected").siblings().removeClass("selected");
    $("#railSecondList").hide();

    if(IntelligentRoadTest.railContinueLineUtil != null){
        IntelligentRoadTest.railContinueLineUtil.clearCanvasLayers(); //清除连片的地图线路
    }

    //如果隧道聚合有对象，则将聚合点进行清除
    if(IntelligentRoadTest.railMarkerClusterer){
        IntelligentRoadTest.railMarkerClusterer.clearMarkers();
        IntelligentRoadTest.MarkerResultArr = [];
    }

    //在第二层时，切换到非隧道，需要根据路线加载视野线段，并加载该线路的隧道数据（目前是加载隧道数据）
    //IntelligentRoadTest.loadLineByLevelFromBounds();
    IntelligentRoadTest.getRoadSuiDaoGisData(IntelligentRoadTest.roadCurrentQueryCity,21);

    IntelligentRoadTest.getRoadSecondListData(IntelligentRoadTest.road_id, IntelligentRoadTest.roadCurrentQueryCity, IntelligentRoadTest.day,
        2, false, IntelligentRoadTest.railIsPoor);
});

/**
 * ********************************
 * @funcname IntelligentRoadTest.checkShowWitchType
 * @funcdesc 根据第二层的显示类型，判断返回时第一层要显示什么东西
 * @param {String} text ： 第二层的文字
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.checkShowWitchType = function(text){

    if(isNull(text)){
        return;
    }
    $("#railListSelectName").text(text); //名称更换为新的类型
    switch(text) {
    	case '综合' :
            $("#rail500M").trigger('click');//触发查看综合的事件
    		break;
        case '隧道' :
            $("#railSuiDao").trigger('click');//触发查看隧道的事件
            break;
        case '非隧道' :
            $("#railNoSuiDao").trigger('click');//触发查看非隧道的事件
            break;
        case '<-110连段' :
            $("#railLP").trigger('click');//触发查看<-110连段的事件
            break;
    }
}

//判断地图缩放结束后是否需要加载视野内的线段数据
/**
 * ********************************
 * @funcname IntelligentRoadTest.jugeIsNeedLoadBoundsLineData
 * @funcdesc 判断地图缩放结束后是否需要加载视野内的线段数据
 * @param
 *
 * @return
 * @author
 * @create
 **********************************
 */
IntelligentRoadTest.jugeIsNeedLoadBoundsLineData = function(){

    if(IntelligentRoadTest.lastLoadBoundsMapZoom == IntelligentRoadTest.map.getZoom()){
        //console.log("加载视野内线路数据");
        IntelligentRoadTest.loadLineByLevelFromBounds();
    }

/*
    if(IntelligentRoadTest.lastLoadBoundsLine == null){
        IntelligentRoadTest.lastLoadBoundsLine = new Date().getTime();
    }
    let nowTime = new Date().getTime();//单位为毫秒
    if((nowTime - IntelligentRoadTest.lastLoadBoundsLineTime) > IntelligentRoadTest.loadBoundsLineTimeInterval && (级别判断有变化)){
        IntelligentRoadTest.loadLineByLevelFromBounds();
    }else{

    }*/
}

//地图拖拽做延迟查数
/**
 * ********************************
 * @funcname IntelligentRoadTest.jugeIsNeedLoadBoundsLineDataByCenter
 * @funcdesc  地图拖拽做延迟查数
 * @param
 *
 * @return
 * @author
 * @create
 **********************************
 */
IntelligentRoadTest.jugeIsNeedLoadBoundsLineDataByCenter = function(){
    if(IntelligentRoadTest.lastLoadBoundsMapCenter){
        if(IntelligentRoadTest.lastLoadBoundsMapCenter.equals(IntelligentRoadTest.map.getCenter())){
            //console.log("加载视野内线路数据");
            IntelligentRoadTest.loadLineByLevelFromBounds();
        }
    }

}

/**
 * ********************************
 * @funcname IntelligentRoadTest.changeCityTextColor
 * @funcdesc 根据地市名称，将高铁二级列表的地市选择中，所属的地市的背景色高亮
 * @param {String} city : 地市名称
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.changeCityTextColor = function(city){

    var cityListLi = $("#railSecondSelectCityList").children();
    
    for(var i = 0; i < cityListLi.length; i++){
    	var text = $(cityListLi[i]).text().trim();//地市名称
        if(text == city){ //将背景色设置为高亮
            $(cityListLi[i]).addClass("current");
        }else{
            $(cityListLi[i]).removeClass("current");
        }
    }

}