var IntelligentTuningBoxSelection = {};
IntelligentTuningBoxSelection.open = false;
IntelligentTuningBoxSelection.boxSelectObj = null;
IntelligentTuningBoxSelection.infoOverlay = null;
IntelligentTuningBoxSelection.gridDataChe = [];//栅格数据缓存，查询回来的数据
IntelligentTuningBoxSelection.gridTypeIndex = 1;//栅格类型 1-覆盖质量；2-越区覆盖；3-重叠覆盖；4-mod3干扰
IntelligentTuningBoxSelection.CanArr = [];//栅格组件数据缓存
IntelligentTuningBoxSelection.isShowGrid = false;//是否显示框选栅格
IntelligentTuningBoxSelection.centerPoint = {};//缓存提示框的中心点
$(function () {
    $('#boxSelection').click(function () {
        if($(this).hasClass('active')){//已经开启了框选
            $(this).removeClass('active');
            IntelligentTuningBoxSelection.open = false;
            if(IntelligentTuningBoxSelection.boxSelectObj){
                IntelligentTuningBoxSelection.boxSelectObj.cancelDraw();
                if (IntelligentTuningBoxSelection.infoOverlay != null) {
                    IntelligentTuningMap.map.removeOverlay(IntelligentTuningBoxSelection.infoOverlay);
                    IntelligentTuningBoxSelection.infoOverlay = null;
                }
                if(IntelligentTuningBoxSelection.isShowGrid){
                    IntelligentTuningMap.GridMap.clear();
                    IntelligentTuningMap.CanArr = [];
                }
                IntelligentTuningBoxSelection.gridDataChe = [];
                IntelligentTuningMap.legendGrid(IntelligentTuningMap);
                IntelligentTuningMap.map.enableScrollWheelZoom();
                IntelligentTuningMap.map.enableDragging();
                IntelligentTuningMap.map.setMinZoom(10);
                IntelligentTuningBoxSelection.isShowGrid=false;

                if(IntelligentTuningMap.isShowGrid&&!isnull(IntelligentTuningMap.currentGridInfo)){//需要重新将栅格渲染在框选前的地方
                    if(IntelligentTuningMap.currentGridType=="covSector"||IntelligentTuningMap.currentGridType=="fjSector"){//地图小区或者邻近小区
                        IntelligentTuningMap.showSectorGrid(IntelligentTuningMap.gridDataChe,[IntelligentTuningMap.gridTypeIndex,"topMap"]);
                    }else if(IntelligentTuningMap.currentGridType=="fjPolygon"){//附近弱区
                        var currentGridInfo=IntelligentTuningMap.currentGridInfo.split("|");
                        IntelligentTuningMap.loadAreaGrid(currentGridInfo[0], currentGridInfo[1], null,"topMap");
                    }
                }
            }
        }else{

            if(IntelligentTuningMap.map.getZoom()<15){
                alert('请将地图放大到500米及以下');
                return;
            }

            $(this).addClass('active');
            IntelligentTuningBoxSelection.open = true;
            if(IntelligentTuningBoxSelection.boxSelectObj==null){
                var utilOpt = {
                    completeFunc:IntelligentTuningBoxSelection.redrawOverlaycomplete,
                }
                IntelligentTuningBoxSelection.boxSelectObj = new DrawingManagerUtil(IntelligentTuningMap.map,utilOpt);
            }

            IntelligentTuningBoxSelection.boxSelectObj.startDraw();
            IntelligentTuningMap.map.disableScrollWheelZoom();
            IntelligentTuningMap.map.disableDragging();
            IntelligentTuningMap.map.setMinZoom(15);
        }
    });
})


IntelligentTuningBoxSelection.redrawOverlaycomplete = function (polygon){
    IntelligentTuningMap.map.enableScrollWheelZoom();
    // IntelligentTuningMap.map.enableInertialDragging();
    IntelligentTuningMap.map.enableDragging();
    IntelligentTuningMap.map.setMinZoom(10);
    var overlayPath = polygon.getPath();
    var Viewport = IntelligentTuningMap.map.getViewport(overlayPath);
    var centerPoint = Viewport.center;
    IntelligentTuningBoxSelection.centerPoint=centerPoint;
    // console.log(overlayPath);
    var overlayPathArr = [];
    for(var i=0;i<overlayPath.length;i++){
        overlayPathArr.push(overlayPath[i].lng+','+overlayPath[i].lat);
    }
    var day = IntelligentTuning.day;
    var polygonContour = overlayPathArr.join('@');
    var keyPrefix = getddmm(day.toString()) + "_1_";
    var cloumnsList = 'i:a7,i:a16,i:b2,i:b3,i:b4';
    var sqlList = [];
    var list = ["IntelligentTuningBoxSelection_01_getGridData", "TABLENAME:" + "NOCE:DSI_MRO_ALL_GRID_TOT_D",
        "GRIDKEYPREFIX:" + keyPrefix, "GRIDLEVEL:20","POLYGONCONTOUR:"+polygonContour, "COLUMNLIST:" + cloumnsList];
    sqlList.push(list);
    var functionList = [];
    functionList.push(IntelligentTuningBoxSelection.showBoxSelectionGrid);
    progressbarTwo.submitSql(sqlList, functionList, [7],[[centerPoint]]);
    polygon.addEventListener('click',function(event){
        if(IntelligentTuningBoxSelection.infoOverlay!=null){
            if(!IntelligentTuningBoxSelection.infoOverlay._show){
                IntelligentTuningBoxSelection.infoOverlay._show = true;
                IntelligentTuningBoxSelection.infoOverlay.show();
                IntelligentTuningBoxSelection.infoOverlay.draw();
            }
        }
    })
}

IntelligentTuningBoxSelection.showBoxSelectionGrid = function (data,para){
    if(Array.isArray(para)){
        IntelligentTuningBoxSelection.gridDataChe = data;
    }
    var result = callBackChangeData(data);
    IntelligentTuningMap.CanArr = [];
    // IntelligentTuningMap.isShowGrid = true;
    IntelligentTuningBoxSelection.isShowGrid = true;
    // console.log(result);
    var sc_140_cnt_sum = 0;
    var sc_105_cnt_sum = 0;
    var all_grid_count = 0;
    var poor_grid_cnt = 0;
    var grid_user_downSpeed_sum = 0;
    var grid_user_upSpeed_sum = 0;
    var grid_cb_num_sum = 0;
    var grid_ol_num_sum = 0;
    var grid_M3_num_sum = 0;
    var sh_grid_cnt = 0;
    var xh_grid_cnt = 0;
    for(var i=0;i<result.length;i++){
        var rowKey = result[i]["rowkey"].split('_');
        var grid_num = rowKey[2];
        var gridLngLatArray=gridLngLat(rowKey[2],20,100000);
        var maxLng = gridLngLatArray[4];// 最大经度
        var maxLat = gridLngLatArray[5];// 最大纬度
        var minLng = gridLngLatArray[0];// 最小经度
        var minLat = gridLngLatArray[1];// 最小纬度
        var rsrpVal = formatArray(result[i]["i:a7"]).split('#');
        var rsrp_avg = !isnull(rsrpVal) ? rsrpVal[9] : null;// rsrp均值
        var rsrp_attend = !isnull(rsrpVal) ? rsrpVal[0] : null;// 电信RSRP[-140，0)记录数
        var rsrp_105_cnt = !isnull(rsrpVal) ? rsrpVal[4] : null;// 电信RSRP[-105，0)记录数

        if(rsrp_avg!=0&&!isnull(rsrp_avg)&&parseFloat(formatValue(rsrp_attend))>3){
            sc_140_cnt_sum += parseInt(formatValue(rsrpVal[0]));// _RSRP_140_Cnt
            sc_105_cnt_sum += parseInt(formatValue(rsrpVal[4]));// _RSRP_105_Cnt
            if(parseFloat(rsrp_avg) <= -105){
                poor_grid_cnt++;
            }
            all_grid_count++;

            var gridSpeed = formatArray(result[i]['i:a16']).split('#');
            if(!isnull(gridSpeed[0])){
                grid_user_upSpeed_sum += parseFloat(formatValue(gridSpeed[0]));
                sh_grid_cnt ++ ;
            }

            if(!isnull(gridSpeed[1])){
                grid_user_downSpeed_sum += parseFloat(formatValue(gridSpeed[1]));
                xh_grid_cnt ++;
            }

            var gridM3 = formatArray(result[i]['i:b2']).split('#');
            if(!isnull(gridM3)){
                grid_M3_num_sum += parseInt(formatValue(gridM3[0]));
            }

            var gridOL = formatArray(result[i]['i:b3']).split('#');
            if(!isnull(gridOL)){
                grid_ol_num_sum += parseInt(formatValue(gridOL[0]));
            }

            var gridCB = formatArray(result[i]['i:b4']).split('#');
            if(!isnull(gridCB)){
                grid_cb_num_sum += parseInt(formatValue(gridCB[0]));
            }
        }
        IntelligentTuningBoxSelection.gridTypeIndex=IntelligentTuningMap.gridTypeIndex;
        if (IntelligentTuningBoxSelection.gridTypeIndex == 1) {
            //覆盖质量
            var dataChe = [];
            if (rsrp_attend != 0 && !isnull(rsrp_attend)) {
                if (parseFloat(rsrp_attend) <= 3) {
                    dataChe = [minLng, minLat, maxLng, maxLat, rsrp_attend, grid_num];
                } else if (rsrp_avg != 0 && !isnull(rsrp_avg)) {
                    dataChe = [minLng, minLat, maxLng, maxLat, rsrp_avg, grid_num];
                }
                if (dataChe.length > 0) {
                    IntelligentTuningMap.CanArr.push(dataChe);
                }
            }
        }else if (IntelligentTuningBoxSelection.gridTypeIndex == 2 || IntelligentTuningBoxSelection.gridTypeIndex == 3 || IntelligentTuningBoxSelection.gridTypeIndex == 4) {
            //MOD3干扰-i:b2， 越区覆盖-i:b4， 重叠覆盖-i:b3
            // IntelligentTuningBoxSelection.gridTypeIndex = 1;//栅格类型 1-覆盖质量；2-越区覆盖；3-重叠覆盖；4-mod3干扰
            var field = '';
            if(IntelligentTuningBoxSelection.gridTypeIndex==2){
                field = 'i:b4';
            }else if(IntelligentTuningBoxSelection.gridTypeIndex==3){
                field = 'i:b3';
            }else if(IntelligentTuningBoxSelection.gridTypeIndex==4){
                field = 'i:b2';
            }
            if(field!=''){
                var modResult = result[i][field];

                var mr_rat = formatArray(modResult).split("#")[1];//MRMRRAT/OLMRRAT/CBMRRAT 模三干扰MR/重叠覆盖MR/越区覆盖MR的总数量占MR总数量的比率
                var is_x_grid = formatArray(modResult).split("#")[2];//ISM3MR_GRID/ISOLMR_GRID/ISCBMR_GRID

                if (rsrp_attend != 0 && !isnull(rsrp_attend)) {
                    var dataChe = [];
                    if (parseFloat(rsrp_attend) <= 3) {
                        dataChe = [minLng, minLat, maxLng, maxLat, -3, grid_num];
                    } else if (!isnull(mr_rat) || mr_rat == 0) {
                        dataChe = [minLng, minLat, maxLng, maxLat, mr_rat, grid_num];
                    }
                    if (dataChe.length > 0) {
                        IntelligentTuningMap.CanArr.push(dataChe);
                    }
                }
            }
        }else if(IntelligentTuningBoxSelection.gridTypeIndex == 5 ){//下行速率
            var gridSpeed = formatArray(result[i]['i:a16']).split('#');
            var mr_rat;
            if(!isnull(gridSpeed)){
                mr_rat=parseFloat(formatValue(gridSpeed[1]));
            }
            if (rsrp_attend != 0 && !isnull(rsrp_attend) && !isnull(gridSpeed[1])) {
                var dataChe = [];
                if (parseFloat(rsrp_attend) <= 3) {
                    dataChe = [minLng, minLat, maxLng, maxLat, -1, grid_num];
                } else if (!isnull(mr_rat) || mr_rat == 0) {
                    dataChe = [minLng, minLat, maxLng, maxLat, mr_rat, grid_num];
                }
                if (dataChe.length > 0) {
                    IntelligentTuningMap.CanArr.push(dataChe);
                }
            }
        }
    }

    if(IntelligentTuningMap.GridMap == null){
        IntelligentTuningMap.GridMap = new GridMap(IntelligentTuningMap.map, {
            readTileData: null,//瓦片获取数据事件
            opacity: 0.6,//$('#opacity').val(),//透明度
            colorMode: 'range',//gradient:渐变的方式呈现颜色；range:按区间匹配颜色
            divZindex: 9,
        });
    }

    var infoMessage = [];
    if (para != undefined) {
        if(all_grid_count>0){
            var MrCnt = sc_140_cnt_sum;//MR总记录数
            var gridCnt = all_grid_count;//栅格总数
            var coverRatio = parseFloat(sc_105_cnt_sum/sc_140_cnt_sum*100).toFixed(2);//覆盖率
            var upSpeed_avg = parseFloat(grid_user_upSpeed_sum/sh_grid_cnt).toFixed(2);//平均上行速率
            var downSpeed_avg = parseFloat(grid_user_downSpeed_sum/xh_grid_cnt).toFixed(2);//平均下行速率
            var poorGridRadio = parseFloat(poor_grid_cnt/all_grid_count*100).toFixed(2);//弱栅格占比
            var cbRadio = parseFloat(grid_cb_num_sum/sc_140_cnt_sum*100).toFixed(2);//越区覆盖占比
            var olRadio = parseFloat(grid_ol_num_sum/sc_140_cnt_sum*100).toFixed(2);//重叠覆盖占比
            var m3Radio = parseFloat(grid_M3_num_sum/sc_140_cnt_sum*100).toFixed(2);//MOD3干扰占比
            infoMessage.push({key:'MRcnt',val:'MR总条数:'+MrCnt});
            infoMessage.push({key:'gridCnt',val:'栅格总数:'+gridCnt});
            infoMessage.push({key:'coverRadio',val:'覆盖率:'+coverRatio+'%'});
            infoMessage.push({key:'upSpeed_avg',val:'平均上行速率:'+upSpeed_avg+'Mbps'});
            infoMessage.push({key:'downSpeed_avg',val:'平均下行速率:'+downSpeed_avg+'Mbps'});
            infoMessage.push({key:'poorGridRadio',val:'弱栅格占比:'+poorGridRadio+'%'});
            infoMessage.push({key:'cbRadio',val:'越区覆盖占比:'+cbRadio+'%'});
            infoMessage.push({key:'olRadio',val:'重叠覆盖占比:'+olRadio+'%'});
            infoMessage.push({key:'m3Radio',val:'MOD3干扰占比:'+m3Radio+'%'});
        }else{
            infoMessage.push({key:'MRcnt',val:'MR总条数:'+null});
            infoMessage.push({key:'gridCnt',val:'栅格总数:'+null});
            infoMessage.push({key:'coverRadio',val:'覆盖率:'+null+'%'});
            infoMessage.push({key:'upSpeed_avg',val:'平均上行速率:'+null+'Mbps'});
            infoMessage.push({key:'downSpeed_avg',val:'平均下行速率:'+null+'Mbps'});
            infoMessage.push({key:'poorGridRadio',val:'弱栅格占比:'+null+'%'});
            infoMessage.push({key:'cbRadio',val:'越区覆盖占比:'+null+'%'});
            infoMessage.push({key:'olRadio',val:'重叠覆盖占比:'+null+'%'});
            infoMessage.push({key:'m3Radio',val:'MOD3干扰占比:'+null+'%'});
        }
        if (infoMessage.length > 0) {
            if (IntelligentTuningBoxSelection.infoOverlay != null) {
                IntelligentTuningMap.map.removeOverlay(IntelligentTuningBoxSelection.infoOverlay);
                IntelligentTuningBoxSelection.infoOverlay = null;
            }
            IntelligentTuningBoxSelection.infoOverlay = new InfoOverlay(para[0], infoMessage);
            IntelligentTuningMap.map.addOverlay(IntelligentTuningBoxSelection.infoOverlay);
        }
    }

    IntelligentTuningMap.GridMap.clear();
    IntelligentTuningMap.GridMap.setThresholds(IntelligentTuningMap.getGridThresholds(IntelligentTuningBoxSelection.gridTypeIndex));
    var CTData = IntelligentTuningMap.CanArr;
    var colorBarArr = IntelligentTuningMap.colorBarArr;
    if(IntelligentTuningBoxSelection.gridTypeIndex>1&&IntelligentTuningBoxSelection.gridTypeIndex<5){
        colorBarArr=IntelligentTuningMap.colorBarArrCov;
    }else{
        colorBarArr=IntelligentTuningMap.colorBarArrXH;
    }
    for (var j = 0; j < colorBarArr.length; j++) {
        CTData = IntelligentTuningMap.ClearData(CTData, colorBarArr[j],IntelligentTuningBoxSelection.gridTypeIndex);
    }
    IntelligentTuningMap.GridMap.draw(CTData);
    IntelligentTuningMap.legendGrid(IntelligentTuningMap);//图例的变化情况

}

IntelligentTuningBoxSelection.changeGridTypeIndex = function (gridTypeIndex){
    if(gridTypeIndex>0&&gridTypeIndex<5){
        IntelligentTuningBoxSelection.gridTypeIndex = gridTypeIndex;
        IntelligentTuningBoxSelection.showBoxSelectionGrid(IntelligentTuningBoxSelection.gridDataChe);
    }
}