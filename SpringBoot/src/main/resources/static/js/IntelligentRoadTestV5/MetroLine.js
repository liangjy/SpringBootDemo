"use strict";
import {LineUtilForBaidu} from '../util/LineUtilForBaidu.js'

//取某地市各条地铁线路78米地理数据
IntelligentRoadTest.getMetroStationsData = function (metroCityName, day, showLine) {
    let city_id = noceUtil.city_LATN_ID[metroCityName];
    let sqlList = [];
    // let list = ["IntelligentRoadTestAnalysisV2_202_MetroStations" , "CITY_ID:" + city_id , "DAY:" + day];
    let list = ["IntelligentRoadTestAnalysisV5_202_MetroSection", "CITY_ID:" + city_id, "DAY:" + day];
    let list2 = ["IntelligentRoadTestAnalysisV5_203_MetroStations","CITY_ID:" + city_id, "DAY:" + day];
    let list3 = ["IntelligentRoadTestAnalysisV5_01_MetroPoorCov","CITY_ID:" + city_id, "DAY:" + day];
    sqlList.push(list);
    sqlList.push(list2);
    sqlList.push(list3);
    // let funcList = [IntelligentRoadTest.dealMetroStationsData];
    let funcList = [IntelligentRoadTest.dealMetroAll78LineData,IntelligentRoadTest.dealMetroAll78StationData,IntelligentRoadTest.dealMetroPoorLineData]
    let database = [3,3,3];
    progressbarTwo.submitSql(sqlList, funcList, database, [showLine,showLine,showLine]);
    IntelligentRoadTest.metroQueryCondition = metroCityName + day;
}

IntelligentRoadTest.dealMetroAll78LineData = function IntelligentRoadTest_dealMetroAll78LineData(data, showLine) {
    let result = callBackChangeData(data);
    let lineMidPoint = [];
    IntelligentRoadTest.metroDataResult = result;
    if (result.length == 0) {
        IntelligentRoadTest.metroZongHeList = {}; //地铁的综合指标的数据
        IntelligentRoadTest.metroZhengList = {}; //地铁的正向指标的数据
        IntelligentRoadTest.metroFanList = {}; //地铁的反向指标的数据
        IntelligentRoadTest.allMetroDataObj = { //保留第一层的地铁线路图的数据
            "2": IntelligentRoadTest.metroZongHeList,
            "1": IntelligentRoadTest.metroZhengList,
            "-1": IntelligentRoadTest.metroFanList
        }
    } else {
        IntelligentRoadTest.metroZongHeList = {}; //地铁的综合指标的数据
        IntelligentRoadTest.metroZhengList = {}; //地铁的正向指标的数据
        IntelligentRoadTest.metroFanList = {}; //地铁的反向指标的数据
        for (let i = 0; i < result.length; i++) {
            let line_id = result[i].line_id;
            let from_station_id = result[i].from_station_id;
            let to_station_id = result[i].to_station_id;
            if (result[i].mr_flag == 2) { //综合指标
                if (IntelligentRoadTest.metroZongHeList[line_id] == undefined) {
                    IntelligentRoadTest.metroZongHeList[line_id] = {};
                    IntelligentRoadTest.metroZongHeList[line_id][from_station_id + "_" + to_station_id] = [];
                    IntelligentRoadTest.metroZongHeList[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                } else {
                    if (IntelligentRoadTest.metroZongHeList[line_id][from_station_id + "_" + to_station_id] == undefined) {
                        IntelligentRoadTest.metroZongHeList[line_id][from_station_id + "_" + to_station_id] = [];
                        IntelligentRoadTest.metroZongHeList[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                    } else {
                        IntelligentRoadTest.metroZongHeList[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                    }
                }
                // IntelligentRoadTest.metroZongHeList[line_id]
                lineMidPoint.push(new BMap.Point(result[i].longitude_mid, result[i].latitude_mid));
            } else if (result[i].mr_flag == 1) { //正向指标
                if (IntelligentRoadTest.metroZhengList[line_id] == undefined) {
                    IntelligentRoadTest.metroZhengList[line_id] = {};
                    IntelligentRoadTest.metroZhengList[line_id][from_station_id + "_" + to_station_id] = [];
                    IntelligentRoadTest.metroZhengList[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                } else {
                    if (IntelligentRoadTest.metroZhengList[line_id][from_station_id + "_" + to_station_id] == undefined) {
                        IntelligentRoadTest.metroZhengList[line_id][from_station_id + "_" + to_station_id] = [];
                        IntelligentRoadTest.metroZhengList[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                    } else {
                        IntelligentRoadTest.metroZhengList[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                    }
                }
                // IntelligentRoadTest.metroZhengList.push(result[i]);
            } else if (result[i].mr_flag == -1) { //反向指标
                if (IntelligentRoadTest.metroFanList[line_id] == undefined) {
                    IntelligentRoadTest.metroFanList[line_id] = {};
                    IntelligentRoadTest.metroFanList[line_id][from_station_id + "_" + to_station_id] = [];
                    IntelligentRoadTest.metroFanList[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                } else {
                    if (IntelligentRoadTest.metroFanList[line_id][from_station_id + "_" + to_station_id] == undefined) {
                        IntelligentRoadTest.metroFanList[line_id][from_station_id + "_" + to_station_id] = [];
                        IntelligentRoadTest.metroFanList[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                    } else {
                        IntelligentRoadTest.metroFanList[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                    }
                }
                // IntelligentRoadTest.metroFanList.push(result[i]);
            }
        }
        IntelligentRoadTest.allMetroDataObj = { //保留第一层的地铁线路图的数据
            "2": IntelligentRoadTest.metroZongHeList,
            "1": IntelligentRoadTest.metroZhengList,
            "-1": IntelligentRoadTest.metroFanList
        }

    }
    //说明需要在地图上显示线段
    if (showLine == true) {
        let showResult = [];
        if (IntelligentRoadTest.metroIndex == 1) {
            //在第一层
            // showResult = IntelligentRoadTest.metroZongHeList;
            // IntelligentRoadTest.showAll78Line(showResult,1,2);
            if (lineMidPoint.length > 0) {
                let metroViewport = IntelligentRoadTest.map.getViewport(lineMidPoint);
                IntelligentRoadTest.map.centerAndZoom(metroViewport.center, metroViewport.zoom);
                IntelligentRoadTest.metorZoomAndCenter.oneLevel = {
                    center: metroViewport.center,
                    zoom: metroViewport.zoom
                };
            }

            IntelligentRoadTest.metroColorLegen();

        } else if (IntelligentRoadTest.metroIndex == 2) {
            // 在第二层，需要根据线路和正反向进行拿数据
            // IntelligentRoadTest.metroClick(IntelligentRoadTest.currentMetroLineItem,1);
            //箭头
            // IntelligentRoadTest.showAll78LineArrow(showResult,IntelligentRoadTest.metroIndex,IntelligentRoadTest.metroType);
            return;
        }
    }

}

//使用canvas显示78米线段,showResult:用来画线的数据，metroIndex：列表层级  ,metroType：指标（正、反或者综合）
IntelligentRoadTest.showAll78Line = function IntelligentRoadTest_showAll78Line(showResult, metroIndex, metroType) {
    let comResultArr = [];//给组件的数据
    let reg = /\d+(\.\d+)?\s\d+(\.\d+)?/g;
    for (let i = 0; i < showResult.length; i++) {
        let gis_data_point_strArr = [];
        let line_gis_data = showResult[i].gis_line_gps;
        if (line_gis_data != null && line_gis_data != "") {
            gis_data_point_strArr = line_gis_data.match(reg);//例如：["3.1 4", "10 50", "20 25"]
        }
        if (gis_data_point_strArr == null || gis_data_point_strArr.length == 0) { //由于line_gis_data.match(reg)返回的结果可能是null，所以要做容错
            gis_data_point_strArr = [];
        }
        let pointArr = [];

        for (let j = 0; j < gis_data_point_strArr.length; j++) {
            let pointStrArr = gis_data_point_strArr[j].split(" ");
            let p = new BMap.Point(pointStrArr[0], pointStrArr[1]);
            pointArr.push(p);
        }

        let lineObject = {
            section_id: showResult[i].section_id,
            city_id: showResult[i].city_id,
            line_id: showResult[i].line_id,
            line_name: showResult[i].line_name,
            from_station_id: showResult[i].from_station_id,
            from_station_name: showResult[i].from_station_name,
            to_station_id: showResult[i].to_station_id,
            to_station_name: showResult[i].to_station_name,
            dx_rsrp_140_cnt: showResult[i].dx_rsrp_140_cnt,
            rsrp_avg: showResult[i].rsrp_avg,
            longitude_mid: showResult[i].longitude_mid,
            latitude_mid: showResult[i].latitude_mid,
            min_userex_dwavgrate: showResult[i].min_userex_dwavgrate,
            min_userex_upavgrate: showResult[i].min_userex_upavgrate,
            mr_flag: showResult[i].mr_flag,
            pointArr: pointArr,
            // color:
        }

        let level = 6;
        if (IntelligentRoadTest.lineTypeIndex == 0) {
            level = IntelligentRoadTest.getMetroRoadRSRPLevel(lineObject.rsrp_avg, lineObject.dx_rsrp_140_cnt);
        } else if (IntelligentRoadTest.lineTypeIndex == 1) {
            level = IntelligentRoadTest.getRoadSHLevel(lineObject.min_userex_upavgrate, lineObject.dx_rsrp_140_cnt);
        } else if (IntelligentRoadTest.lineTypeIndex == 2) {
            level = IntelligentRoadTest.getRoadXHLevel(lineObject.min_userex_dwavgrate, lineObject.dx_rsrp_140_cnt);
        }
        lineObject.color = IntelligentRoadTest.getColorStrByLevel(level);
        comResultArr.push(lineObject);
    }

    if (IntelligentRoadTest.metroLineUtil == undefined) {
        let optioin = {
            lineIndex: 2,
            lineWeight: 6,
            // useOptionColor:true,
            // optionFiledConfiguration:,
            // optionChangeFunc:,
            replyMouseMoveEvent: true,
            replyMouseMoveEventFunc: IntelligentRoadTest.lineUtilMouseMove,
            replyMouseClickEvent: true,
            replyMouseClickEventFunc: IntelligentRoadTest.lineUtilMouseClick
        }
        IntelligentRoadTest.metroLineUtil = new LineUtilForBaidu(IntelligentRoadTest.map, optioin);
    }
    IntelligentRoadTest.metroLineUtil.lineOpacity = IntelligentRoadTest.lineOpacity;
    IntelligentRoadTest.metroLineUtil.lineDataObject = comResultArr;
    IntelligentRoadTest.metroLineUtil.draw();
}

IntelligentRoadTest.lineUtilMouseMove = function (lineData) {
    IntelligentRoadTest.lastMouseMoveLine = {};
    if (lineData.length > 0) {
        // console.log("mousemove", lineData);
        IntelligentRoadTest.lastMouseMoveLine = lineData[0];
        IntelligentRoadTest.metroMouseover(lineData[0]);
    } else {
        IntelligentRoadTest.metroMouseout(IntelligentRoadTest.lastMouseMoveLine);
    }

}

IntelligentRoadTest.lineUtilMouseClick = function (lineData) {
    if (lineData.length > 0) {
        // console.log("click", lineData);
        if (IntelligentRoadTest.metroIndex == 2) {
            //如果在二级列表，则需要加载站与站直接78米一段的数据
            let city_id = lineData[0].city_id;
            let from_station_id = lineData[0].from_station_id;
            let to_station_id = lineData[0].to_station_id;
//                IntelligentRoadTest.queryMetroStationToStationLine(city_id,from_station_id,to_station_id);
            IntelligentRoadTest.metroSecondVM.showMessage(lineData[0], null)
            IntelligentRoadTest.metroClick(lineData[0], 2);
            //需要显示该站与站的起止点，因为还没加上站点的图标，因此不知道哪里到哪里
            // IntelligentRoadTest.metroStationToStationLineData
        } else if (IntelligentRoadTest.metroIndex == 1) {
            //需要增加判断，如果是1列表时点击，需要保留点击线段所在的地铁线，其他地铁线进行隐藏
            IntelligentRoadTest.metroVM.goNextList(lineData[0], null);
            IntelligentRoadTest.metroClick(lineData[0], 1);
        } else if (IntelligentRoadTest.metroIndex == 3 || IntelligentRoadTest.metroIndex == 4) {
            //在站与站的详情页或者78米详情页,进入点击78米线段详情页
            //进入78米线段详情页，类似栅格详情页
            if(IntelligentRoadTest.metroForwardIn78MeterLine == true){
                IntelligentRoadTest.goMetro78LineCompleteMessage(true);
            }else{
                IntelligentRoadTest.goMetro78LineCompleteMessage();
            }

            let section_id = lineData[0].section_id;
            IntelligentRoadTest.getMetro78MData(section_id);
            setTimeout(function () {
                IntelligentRoadTest.getMetro78MSevenDayData(section_id);
            }, 800);//以后可能还要修改
            let pointList = lineData[0].pointArr;
            IntelligentRoadTest.metorLineStarEndMk(pointList[0], pointList[pointList.length - 1]);
            IntelligentRoadTest.map.setZoom(20);
        }
    }

}

IntelligentRoadTest.dealMetroAll78StationData = function IntelligentRoadTest_dealMetroAll78StationData(data,showStation){
    let result = callBackChangeData(data);
    if(result.length==0){
        IntelligentRoadTest.metro78StationToStationData = {
            "-1":{},
            "1":{},
            "2":{}
        };

    }else{
        let zongheStation = {}
        let zhengStation = {}
        let fanStation = {}
        for(let i=0;i<result.length;i++){
            let line_id = result[i].line_id;
            let from_station_id = result[i].from_station_id;
            let to_station_id = result[i].to_station_id;
            if(result[i].mr_flag==2){
                if (zongheStation[line_id] == undefined) {
                    zongheStation[line_id] = {};
                    zongheStation[line_id][from_station_id + "_" + to_station_id] = [];
                    zongheStation[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                } else {
                    if (zongheStation[line_id][from_station_id + "_" + to_station_id] == undefined) {
                        zongheStation[line_id][from_station_id + "_" + to_station_id] = [];
                        zongheStation[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                    } else {
                        zongheStation[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                    }
                }
            }else if(result[i].mr_flag==1){
                if (zhengStation[line_id] == undefined) {
                    zhengStation[line_id] = {};
                    zhengStation[line_id][from_station_id + "_" + to_station_id] = [];
                    zhengStation[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                } else {
                    if (zhengStation[line_id][from_station_id + "_" + to_station_id] == undefined) {
                        zhengStation[line_id][from_station_id + "_" + to_station_id] = [];
                        zhengStation[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                    } else {
                        zhengStation[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                    }
                }
            }else if(result[i].mr_flag==-1){
                if (fanStation[line_id] == undefined) {
                    fanStation[line_id] = {};
                    fanStation[line_id][from_station_id + "_" + to_station_id] = [];
                    fanStation[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                } else {
                    if (fanStation[line_id][from_station_id + "_" + to_station_id] == undefined) {
                        fanStation[line_id][from_station_id + "_" + to_station_id] = [];
                        fanStation[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                    } else {
                        fanStation[line_id][from_station_id + "_" + to_station_id].push(result[i]);
                    }
                }
            }
        }

        IntelligentRoadTest.metro78StationToStationData = {
            "-1":fanStation,
            "1":zhengStation,
            "2":zongheStation
        };
    }

    //说明需要在地图上显示线段
    if (showStation == true) {
        let showResult = [];
        if (IntelligentRoadTest.metroIndex == 1) {
            //在第一层，显示综合指标的所有站点图标
            // let stationMarkerResult = IntelligentRoadTest.metro78StationToStationData["2"];
            // let showResult = [];
            // for(let line_id_key in stationMarkerResult){
            //     for(let station_to_station_key in stationMarkerResult[line_id_key]){
            //         showResult = showResult.concat(stationMarkerResult[line_id_key][station_to_station_key]);
            //     }
            // }
            // IntelligentRoadTest.showAll78Station(showResult,IntelligentRoadTest.metroIndex,IntelligentRoadTest.metroType);

        } else if (IntelligentRoadTest.metroIndex == 2) {
            // 在第二层，需要根据线路id和正反向进行拿数据，显示站点图标

        }else if(IntelligentRoadTest.metroIndex == 3 || IntelligentRoadTest.metroIndex == 4){
            //在第三层或者第四层，需要显示站点到站点的图标
        }
    }


}

IntelligentRoadTest.showAll78Station = function IntelligentRoadTest_showAll78Station(showResult, metroIndex, metroType) {

    for(let i=0;i<IntelligentRoadTest.metroStationsMarkerOverlay.length;i++){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metroStationsMarkerOverlay[i]);
    }
    IntelligentRoadTest.metroStationsMarkerOverlay = [];
    let lastLine_id = null

    if(!Array.isArray(showResult)){
        return;
    }

    // showResult.sort(function(a,b){
    //     return a.station_order-b.station_order;
    // })
    for (let i = 0; i < showResult.length; i++) {
        let iconImageUrl = "../js/IntelligentRoadTest/images/metroL.png";
        let icon = new BMap.Icon(iconImageUrl,new BMap.Size(18,18));
        if(IntelligentRoadTest.map.getZoom()<14){
            icon.setImageSize(new BMap.Size(9,9));
        }
        let markerPoint = new BMap.Point(showResult[i].from_station_longitude,showResult[i].from_station_latitude);
        //lastPoint = new BMap.Point(showResult[i].from_station_longitude,showResult[i].from_station_latitude)
        let markerFromStation = new BMap.Marker(markerPoint,{icon:icon});
        markerFromStation.city_id = showResult[i].city_id;
        markerFromStation.line_id = showResult[i].line_id;
        markerFromStation.line_name = showResult[i].line_name;
        markerFromStation.from_station_id = showResult[i].from_station_id;
        markerFromStation.from_station_name = showResult[i].from_station_name;
        markerFromStation.to_station_id = showResult[i].to_station_id;
        markerFromStation.to_station_name = showResult[i].to_station_name;
        let marker = null;
        lastLine_id = showResult[i].line_id
        if (i == 0 || i == showResult.length - 1) {
            //开始数据和结束数据需要取from和to，中间站点只需要打上from
            if(showResult[i].to_station_longitude!=null&&showResult[i].to_station_latitude!=null){
                marker =  new BMap.Marker(new BMap.Point(showResult[i].to_station_longitude,showResult[i].to_station_latitude),{icon:icon});
                marker.city_id = showResult[i].city_id;
                marker.line_id = showResult[i].line_id;
                marker.line_name = showResult[i].line_name;
                marker.from_station_id = showResult[i].from_station_id;
                marker.from_station_name = showResult[i].from_station_name;
                marker.to_station_id = showResult[i].to_station_id;
                marker.to_station_name = showResult[i].to_station_name;
            }
        }else{
            //中间线段时，如果前一段和后一段的线路id不一样，则需要画上to_station
            if(lastLine_id != showResult[i+1].line_id){
                if(showResult[i].to_station_longitude!=null&&showResult[i].to_station_latitude!=null){
                    marker =  new BMap.Marker(new BMap.Point(showResult[i].to_station_longitude,showResult[i].to_station_latitude),{icon:icon});
                    marker.city_id = showResult[i].city_id;
                    marker.line_id = showResult[i].line_id;
                    marker.line_name = showResult[i].line_name;
                    marker.from_station_id = showResult[i].from_station_id;
                    marker.from_station_name = showResult[i].from_station_name;
                    marker.to_station_id = showResult[i].to_station_id;
                    marker.to_station_name = showResult[i].to_station_name;
                }
            }
        }
        if(marker!=null){
            IntelligentRoadTest.map.addOverlay(marker);
            IntelligentRoadTest.metroStationsMarkerOverlay.push(marker);
        }
        IntelligentRoadTest.map.addOverlay(markerFromStation);
        IntelligentRoadTest.metroStationsMarkerOverlay.push(markerFromStation);
    }
}


IntelligentRoadTest.dealMetroPoorLineData = function IntelligentRoadTest_dealMetroPoorLineData(data,showPoorLine){
    let result = callBackChangeData(data);
    // IntelligentRoadTest.metroPoorLineResult = {};
    let cheData = {};
    for(let i=0;i<result.length;i++){
        cheData[result[i].road_id] = result[i];
    }
    IntelligentRoadTest.metroPoorLineResult = cheData;
    // if(IntelligentRoadTest.metroIndex == 1){
    //     IntelligentRoadTest.showMetroPoorLineData(result);
    // }
}

IntelligentRoadTest.showMetroPoorLineData = function IntelligentRoadTest_showMetroPoorLineData(resultData){
    for(let i=0;i<IntelligentRoadTest.metroPoorLineMarker.length;i++){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metroPoorLineMarker[i]);
    }

    IntelligentRoadTest.metroPoorLineMarker = [];

    for(let i=0;i<resultData.length;i++){
        let mid_point = new BMap.Point(resultData[i].longitude_mid_baidu,resultData[i].latitude_mid_baidu);
        let imgUrl = "../js/IntelligentRoadTest/images/markeRq.png";
        let marker = new BMap.Marker(mid_point);
        marker.setIcon(new BMap.Icon(imgUrl, new BMap.Size(22, 32)));
        let label = new BMap.Label(resultData[i].poor_grid_nums, {
            offset: new BMap.Size(6, 4)
        });
        if (resultData[i].poor_grid_nums > 9) {
            label = new BMap.Label(resultData[i].poor_grid_nums, {
                offset: new BMap.Size(2, 4)
            });
        }
        label.setStyle({
            background: 'none', color: "#fff", border: 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
            , fontWeight: 'bold'
        });
        marker.setLabel(label);
        marker.setOffset( new BMap.Size(0, -16));
        marker.poor_grid_nums = resultData[i].poor_grid_nums;
        marker.road_id = resultData[i].road_id;
        marker.line_id = resultData[i].line_id;
        marker.startPoint = new BMap.Point(resultData[i].longitude_min_baidu,resultData[i].latitude_min_baidu);
        marker.endPoint = new BMap.Point(resultData[i].longitude_max_baidu,resultData[i].latitude_max_baidu);
        marker.addEventListener("click",function(e){
            IntelligentRoadTest.goMetro78LineCompleteMessage(true);
            let section_id = this.road_id;
            IntelligentRoadTest.getMetro78MData(section_id);
            for(let i=0;i<IntelligentRoadTest.metroPoorLineMarker.length;i++){
                IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metroPoorLineMarker[i]);
            }
            setTimeout(function () {
                IntelligentRoadTest.getMetro78MSevenDayData(section_id);
            }, 800);//以后可能还要修改
            IntelligentRoadTest.metorLineStarEndMk(this.startPoint, this.endPoint);
            let zoomPoint = [this.startPoint, this.endPoint];
            let metroViewport = IntelligentRoadTest.map.getViewport(zoomPoint);
            IntelligentRoadTest.map.centerAndZoom(metroViewport.center, metroViewport.zoom);
        });

        /*marker.addEventListener("mouseover",function(e){
            let infoStr = "弱段数:"+this.poor_grid_nums;
            IntelligentRoadTest.openInfoWindow(this.point.lng, this.point.lat, infoStr);
        });

        marker.addEventListener("mouseout",function(e){
            IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.myCompOverlay);
            $('#cirTip').hide();
        });*/

        IntelligentRoadTest.metroPoorLineMarker.push(marker);
        IntelligentRoadTest.map.addOverlay(marker);
    }
}

IntelligentRoadTest.removeMetroPoorLineMarker = function IntelligentRoadTest_removeMetroPoorLineMarker() {
    for (let i = 0; i < IntelligentRoadTest.metroPoorLineMarker.length; i++) {
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metroPoorLineMarker[i]);
    }

    IntelligentRoadTest.metroPoorLineMarker = [];
}


IntelligentRoadTest.showAll78LineArrow = function IntelligentRoadTest_showAll78LineArrow(showResult,metroIndex,metroType){
    if(metroIndex == 1 || metroType == 2){
        return;
    }
    IntelligentRoadTest.removeMetroArrowMarker();

    let lineAllPointArr = [];//给组件的数据
    let reg = /\d+(\.\d+)?\s\d+(\.\d+)?/g;
    showResult.sort(function(a,b){
        return a.section_id-b.section_id;
    });
    for (let i = 0; i < showResult.length; i++) {
        let gis_data_point_strArr = [];
        let line_gis_data = showResult[i].gis_line_gps;
        if (line_gis_data != null && line_gis_data != "") {
            gis_data_point_strArr = line_gis_data.match(reg);//例如：["3.1 4", "10 50", "20 25"]
        }
        if (gis_data_point_strArr == null || gis_data_point_strArr.length == 0) { //由于line_gis_data.match(reg)返回的结果可能是null，所以要做容错
            gis_data_point_strArr = [];
        }
        for (let j = 0; j < gis_data_point_strArr.length; j++) {
            let pointStrArr = gis_data_point_strArr[j].split(" ");
            let p = new BMap.Point(pointStrArr[0], pointStrArr[1]);
            lineAllPointArr.push(p);
        }
    }

    //根据线段方向打上箭头
    let polyLineDivide_point = NOCE.polyLineDivide(lineAllPointArr,200);
    for(let i=0;i<polyLineDivide_point.length;i++){
        let symbol_sharp_path = BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW;//默认设置为正向指标
        if(metroType == -1){//反向
            symbol_sharp_path = BMap_Symbol_SHAPE_FORWARD_OPEN_ARROW;
        }
        let point_lng = polyLineDivide_point[i].lng;
        let point_lat = polyLineDivide_point[i].lat;
        let rotation = polyLineDivide_point[i].angle;
        let symbol = new BMap.Symbol(symbol_sharp_path, {
            scale: 0.5,
            strokeWeight: 2,
            strokeColor:'#fff',
            strokeOpacity:1,//IntelligentRoadTest.lineOpacity,
            rotation: rotation,
        });
        let marker = new BMap.Marker(new BMap.Point(point_lng,point_lat),{icon:symbol});
        marker.angle = rotation;
        marker.index = i;
        marker.type = "LineDivide";
        IntelligentRoadTest.map.addOverlay(marker);
        if(IntelligentRoadTest.map.getZoom()<14 && i%2 != 0){
            marker.hide();
        }
        IntelligentRoadTest.metroStationsOverlay.push(marker);
    }
}
IntelligentRoadTest.removeMetroArrowMarker = function IntelligentRoadTest_removeMetroArrowMarker() {
    for (let i = 0; i < IntelligentRoadTest.metroStationsOverlay.length; i++) {
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metroStationsOverlay[i]);
    }
    IntelligentRoadTest.metroStationsOverlay = [];
}


/**********************************
 * @funcname IntelligentRoadTest.metroDataFilter
 * @funcdesc 根据line_id、from_station_id、to_station_id过滤地铁数据
 * @param {obj} data (input optional) 整个方向的数据（正反向或者综合）
 * @param {String} line_id (input optional)
 * 被点击地铁线段的line_id
 * @param {String} from_station_id (input optional)
 * 被点击地铁线段的from_station_id
 * @param {String} to_station_id (input optional)
 * 被点击地铁线段的from_station_id
 * @return {null}
 * @author 郑文彬
 * @create 20180412
 ***********************************/
IntelligentRoadTest.metroDataFilter = function IntelligentRoadTest_metroDataFilter(data, line_id, from_station_id, to_station_id) {
    let result = [];
    if (data) {
        if (data[line_id]) {
            if (from_station_id != undefined && to_station_id != undefined) {
                //拿站点到站点的数据
                if (data[line_id][from_station_id + "_" + to_station_id]) {
                    result = result.concat(data[line_id][from_station_id + "_" + to_station_id]);

                    // for (let i = 0; i < data[line_id][from_station_id + "_" + to_station_id].length; i++) {
                    //     result.push(data[line_id][from_station_id + "_" + to_station_id][i]);
                    // }
                }

            } else {
                //拿整条线路的数据
                for (let station_key in data[line_id]) {
                    result = result.concat(data[line_id][station_key]);
                    // for (let i = 0; i < data[line_id][station_key].length; i++) {
                    //     result.push(data[line_id][station_key][i]);
                    // }
                }
            }
        }


        /*for (let i = 0; i < data.length; i++) {
            if (from_station_id != undefined && to_station_id != undefined) {
                if (data[i].line_id == line_id && data[i].from_station_id == from_station_id && data[i].to_station_id == to_station_id) {
                    result.push(data[i]);
                }
            } else {
                if (data[i].line_id == line_id) {
                    result.push(data[i]);
                }
            }
        }*/
    }
    return result;
}
/**********************************
 * @funcname IntelligentRoadTest.metroClick
 * @funcdesc 地铁一二级列表的点击事件，点击改变线段（一二级列表点击进入下一级列表也会调用此方法改变地铁线段）
 * @param {String} type (input optional)
 * type==1表示一级列表点击，type==2表示二级列表点击
 * @param {String} lineObj (input optional)
 * 被点击的地铁线段
 * @return {null}
 * @author 郑文彬
 * @create 20180412
 ***********************************/
IntelligentRoadTest.metroClick = function IntelligentRoadTest_metroClick(lineObj, type,metroType) {
    if(metroType == undefined){
        metroType = IntelligentRoadTest.metroType;
    }
    if (type == 1) {
        let result = IntelligentRoadTest.metroDataFilter(IntelligentRoadTest.allMetroDataObj[metroType + ""], lineObj.line_id);
        let stationMarkerResult = IntelligentRoadTest.metroDataFilter(IntelligentRoadTest.metro78StationToStationData[metroType + ""], lineObj.line_id);
        // IntelligentRoadTest.dealMetroStationsData(IntelligentRoadTest.lineData,1);
        IntelligentRoadTest.lineData = result;
        IntelligentRoadTest.lineMarkerData = stationMarkerResult;
        // IntelligentRoadTest.lineMarkerData = stationMarkerResult;
        //将result按from_station_id字段排序
        // let orderArr=result.sort(compare("from_station_id"));
        if (result.length == 0) { //确保orderArr不为空数组
            return;
        }
        let lineMidPointArr = [];
        for (let i = 0; i < result.length; i++) {
            lineMidPointArr.push(new BMap.Point(result[i].longitude_mid, result[i].latitude_mid));
        }
        let metroViewport = IntelligentRoadTest.map.getViewport(lineMidPointArr);
        IntelligentRoadTest.map.centerAndZoom(metroViewport.center, metroViewport.zoom);
        // IntelligentRoadTest.metroColorLegen();
        // IntelligentRoadTest.showAll78Station(stationMarkerResult,IntelligentRoadTest.metroIndex,IntelligentRoadTest.metroType);
        // IntelligentRoadTest.showAll78Line(IntelligentRoadTest.lineData,IntelligentRoadTest.metroIndex,IntelligentRoadTest.metroType);
        IntelligentRoadTest.second = true;
        IntelligentRoadTest.metorZoomAndCenter.second = {center: metroViewport.center, zoom: metroViewport.zoom};
    } else if (type == 2) {
        let result = IntelligentRoadTest.metroDataFilter(IntelligentRoadTest.allMetroDataObj[metroType + ""], lineObj.line_id, lineObj.from_station_id, lineObj.to_station_id);
        let stationMarkerResult = IntelligentRoadTest.metroDataFilter(IntelligentRoadTest.metro78StationToStationData[metroType + ""], lineObj.line_id, lineObj.from_station_id, lineObj.to_station_id);
        IntelligentRoadTest.metroStationToStationLineData = result;
        IntelligentRoadTest.metroStationToStationMarkerData = stationMarkerResult;
        if (result.length == 0) { //确保orderArr不为空数组
            return;
        }
        let lineMidPointArr = [];
        for (let i = 0; i < result.length; i++) {
            lineMidPointArr.push(new BMap.Point(result[i].longitude_mid, result[i].latitude_mid));
        }
        let metroViewport = IntelligentRoadTest.map.getViewport(lineMidPointArr);
        IntelligentRoadTest.map.centerAndZoom(metroViewport.center, metroViewport.zoom);
        IntelligentRoadTest.metorZoomAndCenter.threeLevel={center:metroViewport.center,zoom:metroViewport.zoom};

        // IntelligentRoadTest.showAll78Station(stationMarkerResult,IntelligentRoadTest.metroIndex,IntelligentRoadTest.metroType);
        // IntelligentRoadTest.showAll78Line(IntelligentRoadTest.metroStationToStationLineData,IntelligentRoadTest.metroIndex,IntelligentRoadTest.metroType);
        // IntelligentRoadTest.queryMetroStationToStationLine(lineObj.city_id,lineObj.from_station_id,lineObj.to_station_id ,lineObj.mr_flag);
    }
    IntelligentRoadTest.metroColorLegen();
    IntelligentRoadTest.initColorBarAll();
}

//获取地铁78米高亮数据
/**********************************
 * @funcname IntelligentRoadTest.metro78DataFilter
 * @funcdesc 根据某个78米线段的id获取地铁78米高亮数据
 * @param  {Array} result 原始数据集
 * @param  {string} section_id 78米线段id
 * @return {Array} filterData 过滤后得到的数据集
 * @author liangjy
 * @create  2018/12/17 16:19
 ***********************************/
IntelligentRoadTest.metro78DataFilter = function IntelligentRoadTest_metro78DataFilter(result, section_id) {
    // let result = callBackChangeData(IntelligentRoadTest.metro78Data);
    let obj = {};
    let filterData = [];
    for (let i = 0; i < result.length; i++) {
        if (result[i].section_id == section_id) {
            filterData.push(result[i]);
        }
    }
//	obj.columns=IntelligentRoadTest.metro78Data.columns;
//	obj.result=filterData;
    return filterData;

}
//78米地铁高亮
/**********************************
 * @funcname IntelligentRoadTest.metro78Highlight
 * @funcdesc 78米地铁高亮
 * @param
 * @return
 * @author liangjy
 * @create  2018/12/17 16:25
 ***********************************/
IntelligentRoadTest.metro78Highlight = function IntelligentRoadTest_metro78Highlight(result) {
//    let result = callBackChangeData(data);
    try {
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metro78HighlightPoly);
    } catch (e) {
        // TODO: handle exception
    }
    let reg = /\d+(\.\d+)?\s\d+(\.\d+)?/g;
    for (let i = 0; i < result.length; i++) {
        let section_id = result[i].section_id;
        let gis_line_gps = result[i].gis_line_gps;
        let rsrp_avg = result[i].rsrp_avg;
        let line_min_userex_upavgrate = result[i].min_userex_upavgrate;//上行
        let line_min_userex_dwavgrate = result[i].min_userex_dwavgrate;//下行
        let dx_rsrp_140_cnt = result[i].dx_rsrp_140_cnt;
        let gis_data_point_strArr = [];
        if (gis_line_gps != null) {
            gis_data_point_strArr = gis_line_gps.match(reg);//例如：["3.1 4", "10 50", "20 25"]
        }
        let pointArr = [];
        for (let j = 0; j < gis_data_point_strArr.length; j++) {
            let pointStrArr = gis_data_point_strArr[j].split(" ");
            let p = new BMap.Point(pointStrArr[0], pointStrArr[1]);
            pointArr.push(p);
        }
        let metro78HighlightPoly = new BMap.Polyline(pointArr);

        let level = 6;
        if (IntelligentRoadTest.lineTypeIndex == 0) {
            level = IntelligentRoadTest.getMetroRoadRSRPLevel(rsrp_avg, dx_rsrp_140_cnt);
        } else if (IntelligentRoadTest.lineTypeIndex == 1) {
            level = IntelligentRoadTest.getRoadSHLevel(line_min_userex_upavgrate, dx_rsrp_140_cnt);
        } else if (IntelligentRoadTest.lineTypeIndex == 2) {
            level = IntelligentRoadTest.getRoadXHLevel(line_min_userex_dwavgrate, dx_rsrp_140_cnt);
        }
        metro78HighlightPoly.setStrokeColor(IntelligentRoadTest.getColorStrByLevel(level));
        metro78HighlightPoly.setStrokeOpacity(IntelligentRoadTest.lineOpacity);
        metro78HighlightPoly.setStrokeWeight(IntelligentRoadTest.metroLineWeight * 2);

        metro78HighlightPoly.section_id = section_id;
        metro78HighlightPoly.pointArr = pointArr;
        /* metro78HighlightPoly.addEventListener("click", function (e) {
             //进入78米线段详情页，类似栅格详情页
             IntelligentRoadTest.goMetro78LineCompleteMessage();
             let section_id = this.section_id;
             IntelligentRoadTest.getMetro78MData(section_id);
             setTimeout(function () {
                 IntelligentRoadTest.getMetro78MSevenDayData(section_id);
             }, 800);//以后可能还要修改
             let pointList = this.pointArr;
             IntelligentRoadTest.metorLineStarEndMk(pointList[0], pointList[pointList.length - 1]);
             IntelligentRoadTest.map.setZoom(20);
         });*/

        /*if(pointArr.length){
            let startPoint = new BMap.Point(pointArr[0].longitude_mid, pointArr[0].latitude_mid);
            let endPoint = new BMap.Point(pointArr[pointArr.length - 1].longitude_mid, pointArr[pointArr.length - 1].latitude_mid);
            IntelligentRoadTest.metorStarEndMk(startPoint, endPoint);
            IntelligentRoadTest.metorStarPoint = startPoint;
            IntelligentRoadTest.metorEndPoint = endPoint;
        }*/


        IntelligentRoadTest.metro78HighlightPoly = metro78HighlightPoly;
        IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.metro78HighlightPoly);

    }


}
/**********************************
 * @funcname intelligentRoadTest.metroMouseover
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
IntelligentRoadTest.metroMouseover = function IntelligentRoadTest_metroMouseover(lineObj) {
    let rgpsfilter = [];
    let colorFilter = IntelligentRoadTest.colorBarArrLine;
    if (IntelligentRoadTest.lineTypeIndex == 1) {
        colorFilter = IntelligentRoadTest.colorBarArrSHLine;
    } else if (IntelligentRoadTest.lineTypeIndex == 2) {
        colorFilter = IntelligentRoadTest.colorBarArrXHLine;
    }

    for(let i=0;i<colorFilter.length;i++){
        rgpsfilter.push({level:colorFilter[i]});
    }
    if (IntelligentRoadTest.metroIndex == 1) {
        if (IntelligentRoadTest.metroZongHeList) {
            let line_id_result = IntelligentRoadTest.metroZongHeList[lineObj.line_id];
            let line_height_result = [];
            if (line_id_result) {
                for (let station_id_key in line_id_result) {
                    for (let i = 0; i < line_id_result[station_id_key].length; i++) {
                        line_height_result.push(line_id_result[station_id_key][i]);
                    }
                }
            }
            // IntelligentRoadTest.metroHighlightData = line_height_result;
            IntelligentRoadTest.metroHighlightData = IntelligentRoadTest.metroRgpsFilter(rgpsfilter, line_height_result);
            // IntelligentRoadTest.metroHighlightData = IntelligentRoadTest.metroDataFilter(IntelligentRoadTest.metroDataResult, lineObj.line_id);
            IntelligentRoadTest.metroHighlight(IntelligentRoadTest.metroHighlightData);
        }

    } else if (IntelligentRoadTest.metroIndex == 2) {
        let line_height_result = [];
        if (IntelligentRoadTest.allMetroDataObj[IntelligentRoadTest.metroType + ""]) {
            if (IntelligentRoadTest.allMetroDataObj[IntelligentRoadTest.metroType + ""][lineObj.line_id]) {
                if (IntelligentRoadTest.allMetroDataObj[IntelligentRoadTest.metroType + ""][lineObj.line_id][lineObj.from_station_id + "_" + lineObj.to_station_id]) {
                    let station_to_station_result = IntelligentRoadTest.allMetroDataObj[IntelligentRoadTest.metroType + ""][lineObj.line_id][lineObj.from_station_id + "_" + lineObj.to_station_id];
                    for (let i = 0; i < station_to_station_result.length; i++) {
                        line_height_result.push(station_to_station_result[i]);
                    }
                }
            }
        }
        // IntelligentRoadTest.metroHighlightData = line_height_result;
        IntelligentRoadTest.metroHighlightData = IntelligentRoadTest.metroRgpsFilter(rgpsfilter, line_height_result);
        // IntelligentRoadTest.metroHighlightData = IntelligentRoadTest.metroDataFilter(IntelligentRoadTest.metroDataResult, lineObj.line_id, lineObj.from_station_id, lineObj.to_station_id);
        IntelligentRoadTest.metroHighlight(IntelligentRoadTest.metroHighlightData);
    } else if (IntelligentRoadTest.metroIndex == 3 || IntelligentRoadTest.metroIndex == 4) {
        let line_height_result = [];
        if (IntelligentRoadTest.allMetroDataObj[IntelligentRoadTest.metroType + ""]) {
            if (IntelligentRoadTest.allMetroDataObj[IntelligentRoadTest.metroType + ""][lineObj.line_id]) {
                if (IntelligentRoadTest.allMetroDataObj[IntelligentRoadTest.metroType + ""][lineObj.line_id][lineObj.from_station_id + "_" + lineObj.to_station_id]) {
                    let station_to_station_result = IntelligentRoadTest.allMetroDataObj[IntelligentRoadTest.metroType + ""][lineObj.line_id][lineObj.from_station_id + "_" + lineObj.to_station_id];
                    for (let i = 0; i < station_to_station_result.length; i++) {
                        line_height_result.push(station_to_station_result[i]);
                    }
                }
            }
        }

        // let station_to_station_result = IntelligentRoadTest.metroDataFilter(IntelligentRoadTest.metroDataResult, lineObj.line_id, lineObj.from_station_id, lineObj.to_station_id);
        IntelligentRoadTest.metroHighlightData = IntelligentRoadTest.metro78DataFilter(line_height_result, lineObj.section_id);
        IntelligentRoadTest.metro78Highlight(IntelligentRoadTest.metroHighlightData);
    }
    if (IntelligentRoadTest.metroIndex == 2) {
        if (lineObj.from_station_name != "" && lineObj.from_station_name != null && lineObj.to_station_name != "" && lineObj.to_station_name != null) {
            /*$("#showMetroListDiv li :contains('" + lineObj.from_station_name + " - " + lineObj.to_station_name + "')").parent().eq(0).css('background-color', '#f7f7f7');
            $("#showMetroListDiv li :contains('" + lineObj.from_station_name + " - " + lineObj.to_station_name + "')").prev().css("background", "url(" + "../js/IntelligentRoadTest/images/maker2.png" + ")");

            $("#showMetroListDiv li :contains('" + lineObj.from_station_name + " - " + lineObj.to_station_name + "')").parent().eq(0).bind('mouseout', lineObj, function (event) {
                $("#showMetroListDiv li :contains('" + event.data.from_station_name + " - " + event.data.to_station_name + "')").parent().eq(0).css('background-color', '#fffff');
                $("#showMetroListDiv li :contains('" + event.data.from_station_name + " - " + event.data.to_station_name + "')").prev().css("background", "url(" + "../js/IntelligentRoadTestV5/images/metroListLogo1.png" + ")");
            });*/
            // $("#" + lineObj.from_station_name  + lineObj.to_station_name).parent().eq(0).css('background-color', '#f7f7f7');
            $("#" + lineObj.from_station_name  + lineObj.to_station_name).css("background", "url(" + "../js/IntelligentRoadTestV5/images/metroLogoList2.png" + ")");

            $("#" + lineObj.from_station_name  + lineObj.to_station_name + "List").bind('mouseout', lineObj, function (event) {
                $("#" + event.data.from_station_name  + event.data.to_station_name + "List").css('background-color', '#fffff');
                $("#" + event.data.from_station_name  + event.data.to_station_name).css("background", "url(" + "../js/IntelligentRoadTestV5/images/metroListLogo1.png" + ")");
            });
        }
    } else if (IntelligentRoadTest.metroIndex == 1) {
        if (lineObj.line_name != "" && lineObj.line_name != null) {
            $("#showMetroDiv li :contains('" + lineObj.line_name + "')").parent().eq(0).css('background-color', '#f7f7f7');
            $("#showMetroDiv li :contains('" + lineObj.line_name + "')").prev().css("background", "url(" + "../js/IntelligentRoadTestV5/images/metroLogoList2.png" + ")");

            $("#showMetroDiv li :contains('" + lineObj.line_name + "')").parent().eq(0).bind('mouseout', lineObj, function (event) {
                $("#showMetroDiv li :contains('" + event.data.line_name + "')").parent().eq(0).css('background-color', '#fffff');
                $("#showMetroDiv li :contains('" + event.data.line_name + "')").prev().css("background", "url(" + "../js/IntelligentRoadTestV5/images/metroListLogo1.png" + ")");
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
IntelligentRoadTest.metroMouseout = function IntelligentRoadTest_metroMouseout(lineObj) {
    for (let i = 0; i < IntelligentRoadTest.metroHighlightDataOverlay.length; i++) {
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metroHighlightDataOverlay[i]);
    }
    IntelligentRoadTest.metroHighlightDataOverlay = [];
    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metro78HighlightPoly);
    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metorMkSatr);
    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metorMkEnd);
    if (IntelligentRoadTest.second) {
        if (lineObj.from_station_name != undefined && lineObj.to_station_name != undefined) {
            $("#showMetroListDiv li :contains('" + lineObj.from_station_name + " - " + lineObj.to_station_name + "')").parent().eq(0).css('background-color', '#ffff');
            $("#showMetroListDiv li :contains('" + lineObj.from_station_name + " - " + lineObj.to_station_name + "')").prev().css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
        } else {
            $("#showMetroListDiv li").css('background-color', '#ffff');
            // $("#showMetroListDiv li").eq(0).css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
            $("#showMetroListDiv li").each(function (i) {
                let bgCdd = $(this).children('div').children().eq(0).css("background");
                if (bgCdd.indexOf("/images/marker2.png") >= 0) {
                    $(this).children('div').children().eq(0).css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
                }
            });
        }

    } else {
        if (lineObj.line_name == undefined) {
            $("#showMetroDiv li").css('background-color', '#ffff');
            $("#showMetroDiv li").each(function (i) {
                let bgCdd = $(this).children('div').children().eq(0).css("background");
                if (bgCdd.indexOf("/images/marker2.png") >= 0) {
                    $(this).children('div').children().eq(0).css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
                }
            });
            // $("#showMetroDiv li").eq(0).css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
        } else {
            $("#showMetroDiv li :contains('" + lineObj.line_name + "')").parent().eq(0).css('background-color', '#ffff');
            $("#showMetroDiv li :contains('" + lineObj.line_name + "')").prev().css("background", "url(" + "../js/IntelligentRoadTest/images/bg_num.png" + ")");
        }


    }
}
/**********************************
 * @funcname intelligentRoadTest.metroHighlight
 * @funcdesc 地铁数据高亮显示
 * @param {object} data (input optional)
 * 触摸地铁线段时获取到的需要高亮显示的地铁数据
 * @return {null}
 * @author 郑文彬
 * @create 20180417
 ***********************************/
IntelligentRoadTest.metroHighlight = function IntelligentRoadTest_metroHighlightFirst(result) {
    for (let i = 0; i < IntelligentRoadTest.metroHighlightDataOverlay.length; i++) {
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metroHighlightDataOverlay[i]);
    }
    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metorMkSatr);
    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metorMkEnd);
    IntelligentRoadTest.metroHighlightDataOverlay = [];
    // let result = callBackChangeData(data);
    //latitude_mid longitude_mid--
    let orderArr = result.sort(compare("section_id"));
    if (IntelligentRoadTest.metroIndex == 2) {
        if (orderArr != null && orderArr.length > 0) {
            let point = new BMap.Point(orderArr[0].longitude_mid, orderArr[0].latitude_mid);
            let point2 = new BMap.Point(orderArr[orderArr.length - 1].longitude_mid, orderArr[orderArr.length - 1].latitude_mid);
            if (IntelligentRoadTest.metroType == -1) {
                //反向时，需要将起止点掉反
                IntelligentRoadTest.metorStarEndMk(point2, point);
                IntelligentRoadTest.metorStarPoint = point2;
                IntelligentRoadTest.metorEndPoint = point;
            } else {
                IntelligentRoadTest.metorStarEndMk(point, point2);
                IntelligentRoadTest.metorStarPoint = point;
                IntelligentRoadTest.metorEndPoint = point2;
            }
        }
    }

    ///如果线段太多（大于100），因此进行抽稀
    //地图上把线段呈现出来
    let reg = /\d+(\.\d+)?\s\d+(\.\d+)?/g;
    let dilutionLineNum = 2;
    let arrLength = result.length;
    for (let i = 0; i < result.length; i++) {
        if (arrLength > 100) {
            if (i % dilutionLineNum == 0) {
                continue;
            }
        }

        let city_id = result[i].city_id;//地市id
        let line_id = result[i].line_id;//线路id
        let line_name = result[i].line_name;// 线路名称
        let from_station_id = result[i].from_station_id;// 源地铁站id
        let from_station_name = result[i].from_station_name;// 源地铁站名称
        let to_station_id = result[i].to_station_id;//  目的地铁站id
        let to_station_name = result[i].to_station_name;//  目的地铁站名称
        let line_rsrp = result[i].rsrp_avg;//线段的rsrp均值
        let line_gis_data = result[i].gis_line_gps;
        let line_min_userex_upavgrate = result[i].min_userex_upavgrate;//上行
        let line_min_userex_dwavgrate = result[i].min_userex_dwavgrate;//下行
        let dx_rsrp_140_cnt = result[i].dx_rsrp_140_cnt;
        let gis_data_point_strArr = [];
        if (line_gis_data != null) {
            gis_data_point_strArr = line_gis_data.match(reg);//例如：["3.1 4", "10 50", "20 25"]
        }
        let pointArr = [];
        for (let j = 0; j < gis_data_point_strArr.length; j++) {
            let pointStrArr = gis_data_point_strArr[j].split(" ");
            let p = new BMap.Point(pointStrArr[0], pointStrArr[1]);
            pointArr.push(p);
        }

        let metroStationToStationLine = new BMap.Polyline(pointArr);
//        metroStationToStationLine.setStrokeColor('#00330d');
        let level = 6;
        if (IntelligentRoadTest.lineTypeIndex == 0) {
            level = IntelligentRoadTest.getMetroRoadRSRPLevel(line_rsrp, dx_rsrp_140_cnt);
        } else if (IntelligentRoadTest.lineTypeIndex == 1) {
            level = IntelligentRoadTest.getRoadSHLevel(line_min_userex_upavgrate, dx_rsrp_140_cnt);
        } else if (IntelligentRoadTest.lineTypeIndex == 2) {
            level = IntelligentRoadTest.getRoadXHLevel(line_min_userex_dwavgrate, dx_rsrp_140_cnt);
        }
        metroStationToStationLine.setStrokeColor(IntelligentRoadTest.getColorStrByLevel(level));
        metroStationToStationLine.setStrokeOpacity(IntelligentRoadTest.lineOpacity);
        metroStationToStationLine.setStrokeWeight(IntelligentRoadTest.metroLineWeight * 2);

        metroStationToStationLine.city_id = city_id;
        metroStationToStationLine.line_id = line_id;
        metroStationToStationLine.line_name = line_name;
        metroStationToStationLine.city_name = result[i].city_name;
        metroStationToStationLine.nc_sector_set = result[i].nc_sector_set;
        metroStationToStationLine.sector_set = result[i].sector_set;
        metroStationToStationLine.from_station_id = from_station_id;
        metroStationToStationLine.from_station_name = from_station_name;
        metroStationToStationLine.to_station_id = to_station_id;
        metroStationToStationLine.to_station_name = to_station_name;
        metroStationToStationLine.line_rsrp = line_rsrp;
        metroStationToStationLine.dx_rsrp_140_cnt = dx_rsrp_140_cnt;
        metroStationToStationLine.min_userex_upavgrate = line_min_userex_upavgrate;
        metroStationToStationLine.min_userex_dwavgrate = line_min_userex_dwavgrate;
        metroStationToStationLine.obj = result[i]; //将所有的数据保存在一个对象中，点击线段的时候将这个对象传递过去
        /*let markerPoint = null;
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
        });*/
        IntelligentRoadTest.map.addOverlay(metroStationToStationLine);
        IntelligentRoadTest.metroHighlightDataOverlay.push(metroStationToStationLine);
    }

}
