/**
 * 分屏对比地图
 * @type {{}}
 */
var IntelligentTuningScreen = {};
IntelligentTuningScreen.initMapEnd = false;//是否初始化完了分屏的地图
IntelligentTuningScreen.initUtilEnd = false;//是否初始化完了分屏的测距、坐标拾取工具
IntelligentTuningScreen.bmapDistanceTool = null;//测距测角工具类
IntelligentTuningScreen.coordinatePickTool = null;//坐标拾取工具
IntelligentTuningScreen.isUseCoordinatePickTool = false;//是否正在进行坐标拾取操作
IntelligentTuningScreen.topDay = IntelligentTuningScreen.day;//上分屏的日期
IntelligentTuningScreen.bottomDay = IntelligentTuningScreen.day;//下分屏的日期
IntelligentTuningScreen.topCellCode = null;//上分屏的小区编码
IntelligentTuningScreen.bottomCellCode = null;//下分屏的小区编码
IntelligentTuningScreen.type = null;//当前分屏的类型（方案对比、邻区对比）


IntelligentTuningScreen.gridTypeIndex = 1;//栅格类型 1-覆盖质量；2-过覆盖；3-重叠覆盖；4-mod3干扰
IntelligentTuningScreen.GridMap = null;//栅格组件
IntelligentTuningScreen.CanArr = [];//存储栅格数据
IntelligentTuningScreen.colorBarArr = [];//需要隐藏的图例id数组---覆盖质量
IntelligentTuningScreen.colorBarArrCov = [];//需要隐藏的图例id数组---越区覆盖、重叠覆盖、mod3
IntelligentTuningScreen.covSectorCompent = null;//过覆盖、mod3覆盖、重叠覆盖扇区组件
IntelligentTuningScreen.otherSectorCompent = null; //用于存储附近邻区扇区和附近弱区的对象，不用于渲染，只做存储
IntelligentTuningScreen.sectorCircleCanvas = null;//站间列表圆形
IntelligentTuningScreen.poorPolygonList = [];//附近弱区
IntelligentTuningScreen.problemPolygonList = [];//派单问题区域多边形
IntelligentTuningScreen.currentDetailPageCaChe = "";//当前的详情页条件缓存
IntelligentTuningScreen.polygon = null;//高亮的多边形
IntelligentTuningScreen.cacheItem=null;//缓存当前的详情页对象，用户在栅格提示框的内容中使用
IntelligentTuningScreen.currentGridInfo="";//缓存当前栅格查询条件
IntelligentTuningScreen.currentGridType="covSector";//当前地图上显示的栅格：polygon 附近弱区  sector 扇区
IntelligentTuningScreen.gridinfoPoint=null;//信息提示窗口经纬度缓存
IntelligentTuningScreen.gridTipBox="cirTipLeft2";//栅格提示框的id -----弃用
IntelligentTuningScreen.allSectorTopChe="";//上方地图缓存查询某地市所有扇区的条件
IntelligentTuningScreen.allSectorBottomChe="";//下方地图缓存查询某地市所有扇区的条件
IntelligentTuningScreen.infoOverlay=null;//栅格提示框
IntelligentTuningScreen.nrSectorOverlay=[];//存放连线邻区的地图覆盖物，包括线和扇区
IntelligentTuningScreen.objectPolyline=null;//地图高亮的形状
IntelligentTuningScreen.mapType="bottomMap";
IntelligentTuningScreen.gridTipShow=false;//栅格信息提示框默认隐藏
IntelligentTuningScreen.sectorPredOverlaysArr=[];//坐标勘误标注点和方向角偏转的小区和连线
IntelligentTuningScreen.gridDataChe=null;//缓存的栅格数据
IntelligentTuningScreen.isInSightSector=false;//是否是点击可视区域查询出来的小区
IntelligentTuningScreen.polygonCanvasArr=[];//缓存点击可视区域之前的小区
IntelligentTuningScreen.pointRadius=4;//缓存小区的大小



$(function (){
    // IntelligentTuningScreen.initScreenMap();
})


/**
 * ********************************
 * @funcname IntelligentTuningScreen.initScreenMap
 * @funcdesc 进入分屏时初始化下方地图
 * @param
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuningScreen.initScreenMap = function (){
    var point = IntelligentTuningMap.map.getCenter();
    var zoom = IntelligentTuningMap.map.getZoom();
    IntelligentTuningScreen.map = new BMap.Map("spiltScreenMap", {enableMapClick: false, minZoom: 10, maxZoom: 20});
    IntelligentTuningScreen.map.centerAndZoom(point, zoom);//定位中心
    IntelligentTuningScreen.map.enableScrollWheelZoom(); // 允许滚轮缩放
    IntelligentTuningScreen.map.enableDragging();
    IntelligentTuningScreen.map.disableDoubleClickZoom();
    IntelligentTuningScreen.map.enableAutoResize();
    IntelligentTuningScreen.map.disableInertialDragging();//禁用惯性拖拽
    IntelligentTuningScreen.map.setMapStyle({style: IntelligentTuningMap.baimapStyle});
    IntelligentTuningScreen.map.addEventListener('zoomend', IntelligentTuningScreen.GridMapZoomEnd);
    IntelligentTuningScreen.map.addEventListener('dragend', function () {
        // $('#cirTipLeft2').hide();
    });
    IntelligentTuningScreen.map.addEventListener('moveend', IntelligentTuningScreen.GridMapMoveEnd);
    IntelligentTuningScreen.map.addEventListener("mousemove", IntelligentTuningScreen.mousemoveEvent);
    IntelligentTuningScreen.map.addEventListener('click', IntelligentTuningScreen.MapClickEvent);
    IntelligentTuningScreen.map.addEventListener('resize', IntelligentTuningScreen.MapResizeEvent);
    var top_right_control = new BMap.ScaleControl(
        {
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            offset: {width: 30, height: 30}
        });// 右下角，添加比例尺
    var top_right_navigation = new BMap.NavigationControl(
        {anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM, offset: {width: 0, height: 30}}); //右下角，添加缩放控件

    IntelligentTuningScreen.map.addControl(top_right_control);
    IntelligentTuningScreen.map.addControl(top_right_navigation);

    var mapType2 = new myBMapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT, offset: new BMap.Size(10, 10)});
//	var mapType2 = new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT,mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]});
    IntelligentTuningScreen.map.addControl(mapType2);//添加地图类型控件

    //过覆盖、mod3覆盖、重叠覆盖扇区组件
    if (IntelligentTuningScreen.covSectorCompent == null) {
        var bMapObj = {
            map: IntelligentTuningScreen.map,
            useBandsColor:true,
            bandLevelColor:{
                level1:"#f89f12",
                level2:"#d4237a",
                level3:"#f865e3",
                level4:"#d81e06",
                level5:"#338125",
                level6:"#1296db",
                level7:"#4df1e3",
                level8:"#993399"
            },
            sectorColor: IntelligentTuningMap.covSectorColor,
            circleColor: IntelligentTuningMap.covSectorColor,
            opacity: 0.6,
            lineOpacity: 1,
            ifShowLodingImage: true,
            sectorZindex: 1
        };
        IntelligentTuningScreen.covSectorCompent = new SectorUtilForBaidu(bMapObj);
    }
    //不用于渲染，只做存储数据（附近弱区，扇区）的组件
    if (IntelligentTuningScreen.otherSectorCompent == null) {
        var bMapObj = {
            map: IntelligentTuningScreen.map,
            sectorColor: IntelligentTuningMap.covSectorColor,
            circleColor: IntelligentTuningMap.covSectorColor,
            opacity: 0.6,
            lineOpacity: 1,
            ifShowLodingImage: true,
            sectorZindex: 1
        };
        IntelligentTuningScreen.otherSectorCompent = new SectorUtilForBaidu(bMapObj);
    }
    //栅格组件
    IntelligentTuningScreen.GridMap = new GridMap(IntelligentTuningScreen.map, {
        readTileData: null,//瓦片获取数据事件
        opacity: 0.6,//$('#opacity').val(),//透明度
        colorMode: 'range',//gradient:渐变的方式呈现颜色；range:按区间匹配颜色
        divZindex: 10,
    });


    IntelligentTuningScreen.initMapEnd = true;
    if (IntelligentTuningScreen.initUtilEnd === false){
        IntelligentTuningScreen.initUtil();
    }
}

/**
 * ********************************
 * @funcname IntelligentTuningScreen.GridMapZoomEnd
 * @funcdesc 分屏下方地图缩放、拖拽结束事件
 * @param
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuningScreen.GridMapZoomEnd = function IntelligentTuningScreen_GridMapZoomEnd(e) {
    //缩放时不会触发地图移动moveend事件，因此要做一个触发
    if (e.type == "onzoomend") {
        IntelligentTuningScreen.GridMapMoveEnd(e);
    }

    if(IntelligentTuningScreen.infoOverlay){
        if(IntelligentTuningScreen.infoOverlay._show){
            setTimeout(function(){
                IntelligentTuningMap.resizeGridInfo(IntelligentTuningScreen);
            },100);
        }else{
            IntelligentTuningScreen.infoOverlay.hide();
        }
    }


    if(IntelligentTuning.isScreen && IntelligentTuningScreen.topCellCode !=null && IntelligentTuningScreen.bottomCellCode != null){
        if(IntelligentTuningScreen.topCellCode === IntelligentTuningScreen.bottomCellCode){
            var bottomZoom = IntelligentTuningScreen.map.getZoom();
            var topZoom = IntelligentTuningMap.map.getZoom();

            if (bottomZoom!=topZoom) {
                IntelligentTuningMap.map.setZoom(bottomZoom);
            }
        }
    }

}

/**
 * ********************************
 * @funcname IntelligentTuningScreen.GridMapMoveEnd
 * @funcdesc 分屏下方地图移动结束事件
 * @param
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuningScreen.GridMapMoveEnd = function IntelligentTuningScreen_GridMapMoveEnd(e) {
    /*if(IntelligentTuningScreen.infoOverlay){
        if(IntelligentTuningScreen.infoOverlay._show){
            IntelligentTuningMap.resizeGridInfo(IntelligentTuningScreen);
        }else{
            IntelligentTuningScreen.infoOverlay.hide();
        }
    }*/
    if (e.gH) {//当使用centerAndZoom方法进行设置中心点时，该属性会为字符串"CenterAndZoom"，但由于百度地图js进行了干扰，每次更新后这个都会变，因此需要在对百度地图js进行更新时修改对应的地方
        return;
    }

    if (IntelligentTuningScreen.covSectorCompent != null) {
        IntelligentTuningScreen.covSectorCompent.MapZoomAndDragEnd(e, IntelligentTuningScreen.covSectorCompent);
    }
    //呈现的是栅格
    if(IntelligentTuningScreen.isShowGrid){
        IntelligentTuningScreen.GridMap.clear();
        var CTData = IntelligentTuningScreen.CanArr;
        var colorBarArr=[];
        colorBarArr=IntelligentTuningScreen.colorBarArr;
        if(IntelligentTuningScreen.gridTypeIndex==2||IntelligentTuningScreen.gridTypeIndex==3||IntelligentTuningScreen.gridTypeIndex==4){
            colorBarArr=IntelligentTuningScreen.colorBarArrCov;
        }
        for(var j=0;j<colorBarArr.length;j++){
            CTData = IntelligentTuningScreen.ClearData(CTData,colorBarArr[j],IntelligentTuningScreen.gridTypeIndex);
        }
        IntelligentTuningScreen.GridMap.draw(CTData);
        CTData = null;

    }
    ////如果上下的扇区相同，则地图进行同步，不同则不需要进行同步
    if(IntelligentTuning.isScreen && IntelligentTuningScreen.topCellCode !=null && IntelligentTuningScreen.bottomCellCode != null){
        if(IntelligentTuningScreen.topCellCode === IntelligentTuningScreen.bottomCellCode){
            var bottomCenter = IntelligentTuningScreen.map.getCenter();
            var topCenter = IntelligentTuningMap.map.getCenter();

            var bottomZoom = IntelligentTuningScreen.map.getZoom();
            var topZoom = IntelligentTuningMap.map.getZoom();

            if(topCenter.lng != bottomCenter.lng || topCenter.lat != bottomCenter.lat){
                IntelligentTuningMap.map.setCenter(bottomCenter);
            }

            // if (bottomZoom!=topZoom) {
            //     IntelligentTuningMap.map.setZoom(bottomZoom);
            // }
        }
    }

    if (IntelligentTuningScreen.covSectorCompent != null) {
        IntelligentTuningScreen.covSectorCompent.MapZoomAndDragEnd(e, IntelligentTuningMap.covSectorCompent);
    }

}

/**
 * ********************************
 * @funcname IntelligentTuningScreen.mousemoveEvent
 * @funcdesc 分屏下方地图鼠标移动事件
 * @param
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuningScreen.mousemoveEvent = function IntelligentTuningScreen_mousemoveEvent(e) {

}
/**
 * ********************************
 * @funcname IntelligentTuningScreen.MapClickEvent
 * @funcdesc 分屏下方地图大小自适应事件
 * @param
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
//
IntelligentTuningScreen.MapResizeEvent = function IntelligentTuningScreen_MapResizeEvent(e){
    // IntelligentTuningScreen.GridMapMoveEnd(e);
    // IntelligentTuningScreen.map.setCenter(IntelligentTuningScreen.map.getCenter());
}

/**
 * ********************************
 * @funcname IntelligentTuningScreen.MapClickEvent
 * @funcdesc 分屏下方地图点击事件
 * @param
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuningScreen.MapClickEvent = function IntelligentTuningScreen_MapClickEvent(e) {
    IntelligentTuningScreen.mapClick = true;

    if (IntelligentTuningScreen.bmapDistanceTool) {//正在使用测距工具
        if (IntelligentTuningScreen.bmapDistanceTool.isUseTool) {
            return;
        }
    }

    if (IntelligentTuningScreen.isUseCoordinatePickTool) {//正在使用坐标拾取工具
        return;
    }

    var clickType = e.target.ze;
    if (clickType != undefined && clickType != null) {
        if (clickType.length > 1) {
            IntelligentTuningScreen.mapClick = false;
            return;
        }
    }
    // $("#cirTipLeft2").hide();
    var clickPoint = e.point;
    var clickCovSector = [];
    if (IntelligentTuningScreen.covSectorCompent) {
        clickCovSector = IntelligentTuningScreen.covSectorCompent.getSectorPolygonByPoint(clickPoint);
    }
    var clickOtherPolygon = [];
    if (IntelligentTuningScreen.otherSectorCompent) {
        clickOtherPolygon = IntelligentTuningScreen.otherSectorCompent.getSectorPolygonByPoint(clickPoint);
    }

    IntelligentTuningScreen.clickResultChe = {
        "covSector": clickCovSector,//MOD3/重叠、越区
        "otherPolygon": clickOtherPolygon//最近弱区，最近扇区,问题多边形
    };

    //如果只匹配到一个结果，则直接进入进行该结果的操作，不需要用户再次点击
    if (clickCovSector.length + clickOtherPolygon.length == 1) {
        if (clickCovSector.length == 1) {
            IntelligentTuningScreen.currentGridType="covSector";
            //如果是当前正在查看的MOD3/越区/重叠，不执行查询
            //跳转到越区、mod3、重叠的详情页数据
            var clickSectorInfo=IntelligentTuningScreen.bottomDay+"|"+clickCovSector[0].statn_id+"|"+clickCovSector[0].cell_id+"|"+getNeedGridType(IntelligentTuningScreen)+"|"+clickCovSector[0].scene;
            if (IntelligentTuningScreen.isShowGrid&&IntelligentTuningScreen.currentDetailPageCaChe == clickSectorInfo) {
                //当前正在查看扇区详情页，不需要跳转
                var currentGridInfo=IntelligentTuningScreen.bottomDay+"|"+clickCovSector[0].statn_id+"|"+clickCovSector[0].cell_id+"|"+getNeedGridType(IntelligentTuningScreen);
                if(IntelligentTuningScreen.currentGridInfo!=currentGridInfo){
                    //详情页与点击的扇区一致，但是扇区的地图信息不一致时（发生在用户点击过这个扇区详情页，但是又点击了其它的扇区而没有进入过其它的详情页）
                    IntelligentTuning.getScreenMessageById(clickCovSector[0].statn_id, clickCovSector[0].cell_id,IntelligentTuningScreen.bottomDay,"bottomMap");
                    // IntelligentTuningMap.showSector(IntelligentTuningScreen.cacheItem,IntelligentTuningScreen);//高亮小区
                    // IntelligentTuningMap.loadSectorGrid(IntelligentTuning.bottomDay, clickOtherPolygon[0].statn_id, clickOtherPolygon[0].cell_id, clickOtherPolygon[0].problem_name,"bottomMap");
                }
                return;
            } else {
                var currentGridInfo=IntelligentTuningScreen.bottomDay+"|"+clickCovSector[0].statn_id+"|"+clickCovSector[0].cell_id+"|"+getNeedGridType(IntelligentTuningScreen);
                if(IntelligentTuningScreen.currentGridInfo!=currentGridInfo){
                    if (clickCovSector[0].type == 2) {//室外基站
                        var p = clickCovSector[0].points[0];
                        var pointsArr = clickCovSector[0].points;
                        pointsArr.push(p);
                        IntelligentTuningMap.showHighLightedPolyline(pointsArr, 2, 'sector');//高亮多边形
                    } else {//室内基站
                        IntelligentTuningMap.showHighLightedPolyline(clickCovSector[0], 1, 'sector');//高亮多边形
                    }
                    IntelligentTuningScreen.day=IntelligentTuningScreen.bottomDay;
                    // IntelligentTuning.goSectorCompleteMessage(clickCovSector[0].statn_id, clickCovSector[0].cell_id);//跳转到详情页
                    // IntelligentTuning.getSectorMessageById(clickCovSector[0].statn_id, clickCovSector[0].cell_id,IntelligentTuningScreen.bottomDay);
                    IntelligentTuning.getScreenMessageById(clickCovSector[0].statn_id, clickCovSector[0].cell_id,IntelligentTuningScreen.bottomDay,"bottomMap");
                }
                return;
            }

        } else if (clickOtherPolygon.length == 1) {//小区附近的弱区和邻扇区
            if (clickOtherPolygon[0].scene == "fjPoor"||clickOtherPolygon[0].scene == "fjProblemArea") {//附近弱区
                var clickPoorInfo=IntelligentTuningScreen.bottomDay+"|"+clickOtherPolygon[0].gis_data+"|"+IntelligentTuningScreen.gridTypeIndex;
                if(IntelligentTuningScreen.isShowGrid&&IntelligentTuningScreen.currentGridInfo==clickPoorInfo&&IntelligentTuningMap.polygon!=null){
                    return;
                }
                IntelligentTuningMap.showPolygon(clickOtherPolygon[0],IntelligentTuningScreen);//高亮并查询对应栅格
                IntelligentTuningScreen.cacheItem.fjPoor=clickOtherPolygon[0];
                IntelligentTuningScreen.currentGridType="fjPolygon";
                IntelligentTuningMap.loadAreaGrid(IntelligentTuningScreen.bottomDay, clickOtherPolygon[0].gis_data, null,"bottomMap")
                return;
            } else if (clickOtherPolygon[0].scene == "fjSector") {//附近扇区
                //查询栅格
                var currentGridInfo=IntelligentTuningScreen.bottomDay+"|"+clickOtherPolygon[0].statn_id+"|"+clickOtherPolygon[0].cell_id+"|"+getNeedGridType(IntelligentTuningScreen);
                if(IntelligentTuningScreen.currentGridInfo!=currentGridInfo){
                    IntelligentTuningScreen.cacheItem.fjSector=clickOtherPolygon[0];
                    IntelligentTuningScreen.currentGridType="fjSector";
                    IntelligentTuningMap.showSector(clickOtherPolygon[0],IntelligentTuningScreen);//高亮小区
                    IntelligentTuningMap.loadSectorGrid(IntelligentTuningScreen.bottomDay, clickOtherPolygon[0].statn_id, clickOtherPolygon[0].cell_id, null,"bottomMap");
                }
                return;
            }

        }


        $(".listDiv .detailList").each(function () {
            if ($(this).is(":visible")) {
                $(this).slideUp();
                $(this).slideDown();
            }
        });
        return;
    }


    //如果匹配到多个结果
    var clickResultStr = '';
    if (clickCovSector.length > 0) {
        for (var i = 0; i < clickCovSector.length; i++) {
            var clickid = clickCovSector[i].statn_id + '_' + clickCovSector[i].cell_id;
            clickResultStr += '<li type="covSector" clickid="' + clickid + '"><span></span><span >' + clickCovSector[i].statn_id + '_' + clickCovSector[i].cell_id + '</span><span>扇区</span></li>';
        }
    }

    if (clickOtherPolygon.length > 0) {
        for (var i = 0; i < clickOtherPolygon.length; i++) {
            if (clickOtherPolygon[i].scene == "fjPoor") {
                clickResultStr += '<li type="otherPolygon" clickid="' + clickOtherPolygon[i].object_id + '"><span></span><span>' + clickOtherPolygon[i].object_id + '</span><span>附近弱区</span></li>';
            } else if (clickOtherPolygon[i].scene == "fjSector") {
                var clickid = clickOtherPolygon[i].statn_id + '_' + clickOtherPolygon[i].cell_id;
                clickResultStr += '<li type="otherPolygon" clickid="' + clickid + '"><span></span><span >' + clickOtherPolygon[i].statn_id + '_' + clickOtherPolygon[i].cell_id + '</span><span>附近扇区</span></li>';
            }else if(clickOtherPolygon[0].scene == "fjProblemArea"){
                clickResultStr += '<li type="otherPolygon" clickid="' + clickOtherPolygon[i].object_id + '"><span></span><span>' + clickOtherPolygon[i].object_id + '</span><span>问题区域</span></li>';
            }
        }
    }

    if (clickResultStr == '') {
        $('#mapClickResult').html('点击位置匹配不到数据');
        $('#mapClickResult').hide();
    } else {

        $('#mapClickResult').html(clickResultStr);
        setTimeout(function () {
            if ($('#mapClickResult li').length > 1) {
                $('#mapClickResult').show();
            }
        }, 100);

    }

    $('#mapClickResult li').unbind("mouseover").bind("mouseover", function () {
        var type = $(this).attr('type');
        var liClickid = $(this).attr('clickid');
        var resultList = IntelligentTuningScreen.clickResultChe[type];
        if (type == "covSector") {
            var bst_id = liClickid.split('_')[0];
            var cell_id = liClickid.split('_')[1];
            for (var i = 0; i < resultList.length; i++) {
                //扇区着重提示
                if (resultList[i].statn_id == bst_id && resultList[i].cell_id == cell_id) {
                    if (resultList[i].type == 2) {//室外基站
                        var p = resultList[i].points[0];
                        var pointsArr = [].concat(resultList[i].points);
                        pointsArr.push(p);
                        IntelligentTuningMap.showClickObjectPolyline(pointsArr, 2,IntelligentTuningScreen);
                    } else {//室内基站
                        IntelligentTuningMap.showClickObjectPolyline(resultList[i], 1,IntelligentTuningScreen);
                    }

                    break;
                }
            }

        } else if (type == "otherPolygon") {
            for (var i = 0; i < resultList.length; i++) {
                if (resultList[i].scene == "fjPoor"|| resultList[i].scene == "fjProblemArea") {
                    if (resultList[i].object_id == liClickid) {
                        //弱区着重提示
                        IntelligentTuningMap.showClickObjectPolyline(resultList[i].points, 2,IntelligentTuningScreen);
                        break;
                    }
                }else if (resultList[i].scene == "fjSector") {
                    var bst_id = liClickid.split('_')[0];
                    var cell_id = liClickid.split('_')[1];
                    //扇区着重提示
                    if (resultList[i].statn_id == bst_id && resultList[i].cell_id == cell_id) {
                        if (resultList[i].type == 2) {//室外基站
                            var p = resultList[i].points[0];
                            var pointsArr = [].concat(resultList[i].points);
                            pointsArr.push(p);
                            IntelligentTuningMap.showClickObjectPolyline(pointsArr, 2,IntelligentTuningScreen);
                        } else {//室内基站
                            IntelligentTuningMap.showClickObjectPolyline(resultList[i], 1,IntelligentTuningScreen);
                        }
                        break;
                    }
                }


            }

        }
        // console.log("鼠标移入类型:"+type);
    });
    $('#mapClickResult li').unbind("mouseout").bind("mouseout", function () {
        var type = $(this).attr('type');
        if (IntelligentTuningScreen.objectPolyline != null) {
            IntelligentTuningScreen.map.removeOverlay(IntelligentTuningScreen.objectPolyline);
        }
        // console.log("鼠标移出类型:"+type);
    });
    $('#mapClickResult li').unbind("click").bind("click", function () {
        var type = $(this).attr('type');
        var liClickid = $(this).attr('clickid');
        var resultList = IntelligentTuningScreen.clickResultChe[type];
        if (type == "covSector") {
            var statn_id = liClickid.split('_')[0];
            var cell_id = liClickid.split('_')[1];
            for (var i = 0; i < resultList.length; i++) {
                //扇区点击，跳转到详细页，需要加载栅格
                if (resultList[i].statn_id == statn_id && resultList[i].cell_id == cell_id) {
                    IntelligentTuningScreen.currentGridType="covSector";
                    var clickSectorInfo=IntelligentTuningScreen.bottomDay+"|"+resultList[i].statn_id+"|"+resultList[i].cell_id+"|"+getNeedGridType(IntelligentTuningScreen)+"|"+resultList[i].scene;
                    if (IntelligentTuningScreen.isShowGrid&&IntelligentTuningScreen.currentDetailPageCaChe == clickSectorInfo) {
                        //当前正在查看扇区详情页，不需要跳转
                        var currentGridInfo=IntelligentTuningScreen.bottomDay+"|"+resultList[i].statn_id+"|"+resultList[i].cell_id+"|"+getNeedGridType(IntelligentTuningScreen);
                        if(IntelligentTuningScreen.currentGridInfo!=currentGridInfo){
                            //详情页与点击的扇区一致，但是扇区的地图信息不一致时（发生在用户点击过这个扇区详情页，但是又点击了其它的扇区而没有进入过其它的详情页）
                            IntelligentTuning.getScreenMessageById(resultList[i].statn_id, resultList[i].cell_id,IntelligentTuning.bottomDay,"bottomMap");
                            // IntelligentTuningMap.showSector(IntelligentTuningScreen.cacheItem,IntelligentTuningScreen);//高亮小区
                            // IntelligentTuningMap.loadSectorGrid(IntelligentTuning.bottomDay, resultList[i].statn_id, resultList[i].cell_id, resultList[i].problem_name,"bottomMap");
                        }
                        return;
                    } else {
                            var currentGridInfo=IntelligentTuningScreen.bottomDay+"|"+resultList[i].statn_id+"|"+resultList[i].cell_id+"|"+getNeedGridType(IntelligentTuningScreen);
                            if(IntelligentTuningScreen.currentGridInfo!=currentGridInfo) {
                                if (resultList[i].type == 2) {//室外基站
                                    var p = resultList[i].points[0];
                                    var pointsArr = resultList[i].points
                                    pointsArr.push(p);
                                    IntelligentTuningMap.showHighLightedPolyline(pointsArr, 2, 'sector');
                                } else {//室内基站
                                    IntelligentTuningMap.showHighLightedPolyline(resultList[i], 1, 'sector');
                                }
                                IntelligentTuning.goSectorCompleteMessage(resultList[i].statn_id, resultList[i].cell_id);//跳转到详情页
                                IntelligentTuningScreen.day=IntelligentTuningScreen.bottomDay;
                                IntelligentTuning.getSectorMessageById(resultList[i].statn_id, resultList[i].cell_id,IntelligentTuningScreen.bottomDay);

                            }
                        }

                    break;
                }
            }
        } else if (type == "otherPolygon") {
            for (var i = 0; i < resultList.length; i++) {
                if (resultList[i].scene == "fjPoor"|| resultList[i].scene == "fjProblemArea") {//附近弱区
                    if (resultList[i].object_id == liClickid) {
                        var clickPoorInfo=IntelligentTuningScreen.bottomDay+"|"+resultList[i].gis_data+"|"+IntelligentTuningScreen.gridTypeIndex;
                        if(IntelligentTuningScreen.isShowGrid&&IntelligentTuningScreen.currentGridInfo==clickPoorInfo&&IntelligentTuningMap.polygon!=null){
                            return;
                        }
                        //弱区着重提示
                        IntelligentTuningMap.showPolygon(resultList[i],IntelligentTuningScreen);//高亮并查询对应栅格
                        IntelligentTuningScreen.cacheItem.fjPoor=resultList[i];
                        IntelligentTuningScreen.currentGridType="fjPolygon";
                        IntelligentTuningMap.loadAreaGrid(IntelligentTuningScreen.bottomDay, resultList[i].gis_data, null,"bottomMap")
                        break;
                    }
                } else if (resultList[i].scene == "fjSector") {//附近扇区
                    //扇区着重提示
                    if (resultList[i].statn_id+"_"+resultList[i].cell_id == liClickid) {
                        //查询栅格
                        var currentGridInfo=IntelligentTuningScreen.bottomDay+"|"+resultList[i].statn_id+"|"+resultList[i].cell_id+"|"+getNeedGridType(IntelligentTuningScreen);
                        if(IntelligentTuningScreen.currentGridInfo!=currentGridInfo){
                            IntelligentTuningScreen.cacheItem.fjSector=resultList[i];
                            IntelligentTuningScreen.currentGridType="fjSector";
                            IntelligentTuningMap.showSector(resultList[i],IntelligentTuningMap);//高亮小区
                            IntelligentTuningMap.loadSectorGrid(IntelligentTuningScreen.bottomDay, resultList[i].statn_id, resultList[i].cell_id, null,"bottomMap");
                        }
                    }
                }
            }
        }
        $(this).parent().hide();
    });


}

/**
 * ********************************
 * @funcname IntelligentTuningScreen.initUtil
 * @funcdesc 初始化分屏地图上的测距、坐标拾取
 * @param
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuningScreen.initUtil = function (){
    /*---测量点击事件---*/
    $("#screenGageDistance").click(function () {//测距测角工具
        if (IntelligentTuningScreen.isUseCoordinatePickTool) {
            alert("不能同时使用鼠标测距和坐标拾取");
            return;
        }

        if (IntelligentTuningScreen.bmapDistanceTool == null) {
            IntelligentTuningScreen.bmapDistanceTool = new measureDistance(IntelligentTuningScreen.map, IntelligentTuningScreen.bmapDistanceToolFinish);
        }

        if (IntelligentTuningScreen.bmapDistanceTool.isUseTool) {
            IntelligentTuningScreen.bmapDistanceTool.closeAll();
        } else {
            IntelligentTuningScreen.bmapDistanceTool.openMeasure();
            IntelligentTuningMap.editImgSrc("#screenGageDistance");
        }
    });

//坐标拾取工具
    $('#screenCoordinatePick').click(function () {
        if (IntelligentTuningScreen.bmapDistanceTool != null && IntelligentTuningScreen.bmapDistanceTool.isUseTool) {
            alert("不能同时使用鼠标测距和坐标拾取");
            return;
        }
        if (IntelligentTuningScreen.coordinatePickTool == null) {
            var bMapObj = {
                map: IntelligentTuningScreen.map,
            }
            IntelligentTuningScreen.coordinatePickTool = new bmapConversion(bMapObj);
        }

        if (IntelligentTuningScreen.isUseCoordinatePickTool) {
            IntelligentTuningScreen.coordinatePickTool.closeAll();
            IntelligentTuningScreen.isUseCoordinatePickTool = false;
        } else {
            IntelligentTuningScreen.coordinatePickTool.openMeasure();
            IntelligentTuningScreen.isUseCoordinatePickTool = true;
        }
        IntelligentTuningMap.editImgSrc('#screenCoordinatePick');

    });

   /* //可视区域的小区
    $('#screenInSightSector').click(function () {
        IntelligentTuning.queryInSightSectorData(IntelligentTuningScreen.bottomDay,IntelligentTuning.currentQueryCity,"bottomMap");
    });*/

    IntelligentTuningScreen.initUtilEnd = true;
}
/**
 * ********************************
 * @funcname IntelligentTuningScreen.synMap
 * @funcdesc 将同步上方地图的中心点和级别到下方地图
 * @param
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuningScreen.synMap = function (){
    var bottomCenter = IntelligentTuningScreen.map.getCenter();
    var topCenter = IntelligentTuningMap.map.getCenter();

    var bottomZoom = IntelligentTuningScreen.map.getZoom();
    var topZoom = IntelligentTuningMap.map.getZoom();
    //暂时不进行地图同步，查询了小区的数据后会将对应的地图进行放大
    if(topCenter.lng != bottomCenter.lng || topCenter.lat != bottomCenter.lat || bottomZoom!=topZoom){
        // IntelligentTuningScreen.map.centerAndZoom(topCenter,topZoom);
    }
}


function screenTimeOnpicked(){
    // console.log($('#ScreenTime').text());
    var bottomDay = $('#screenTime').text()
    IntelligentTuningScreen.bottomDay = bottomDay;//下分屏的日期
    IntelligentTuningScreen.loadBottomMapData(bottomDay,IntelligentTuningScreen.bottomCellCode,IntelligentTuningScreen.type);
    //当前正在查看的是附近小区
    if(IntelligentTuningMap.isInSightSector){
        $("#screenInSightSector .inSightSectorSelect > div.active").click();
    }
}

/**
 * ********************************
 * @funcname IntelligentTuningScreen.coordinatePickToolFinish
 * @funcdesc 分屏下方地图坐标拾取工具结束事件
 * @param
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuningScreen.coordinatePickToolFinish = function IntelligentTuningScreen_coordinatePickToolFinish() {
    if (!IntelligentTuningScreen.coordinatePickTool.isUseTool) {
        IntelligentTuningMap.editImgSrc("#screenCoordinatePick");
    }
}
/**
 * ********************************
 * @funcname IntelligentTuningScreen.bmapDistanceToolFinish
 * @funcdesc 分屏下方地图测距测角结束触发事件
 * @param
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuningScreen.bmapDistanceToolFinish = function IntelligentTuningScreen_bmapDistanceToolFinish() {
    if (!IntelligentTuningScreen.bmapDistanceTool.isUseTool) {
        IntelligentTuningMap.editImgSrc("#screenGageDistance");
    }
}

/**
 * ********************************
 * @funcname IntelligentTuningScreen.loadScreenMapData
 * @funcdesc 加载分屏对比的小区地图数据
 * @param {string} topDay (input) 上方地图加载数据的时间
 * @param {string} bottomDay (input) 下方地图加载数据的时间
 * @param {string} topCellCode (input) 上方地图的加载的扇区编码
 * @param {string} bottomCellCode (input) 下方地图的加载的扇区编码
 * @param {string} type (input) 当前分屏的类型（邻区对比、方案对比）
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuningScreen.loadScreenMapData = function (topDay,bottomDay,topCellCode,bottomCellCode,type) {

    if(isNotNullOrEmpty(topDay) && isNotNullOrEmpty(bottomDay) && isNotNullOrEmpty(topCellCode) && isNotNullOrEmpty(bottomCellCode) && isNotNullOrEmpty(type)){
        IntelligentTuningScreen.topDay = topDay;//上分屏的日期
        IntelligentTuningScreen.bottomDay = bottomDay;//下分屏的日期
        IntelligentTuningScreen.topCellCode = topCellCode;//上分屏的小区编码
        IntelligentTuningScreen.bottomCellCode = bottomCellCode;//下分屏的小区编码
        IntelligentTuningScreen.type = type;
        //设置下方分屏的时间
        if($('#seachTime').text() != topDay){
            $('#seachTime').text(topDay);
        }

        if($('#screenTime').text() != bottomDay){
            $('#screenTime').text(bottomDay);
        }

        IntelligentTuningScreen.loadTopMapData(topDay,topCellCode,type);
        IntelligentTuningScreen.loadBottomMapData(bottomDay,bottomCellCode,type);
    }

}
/**
 * ********************************
 * @funcname IntelligentTuningScreen.loadTopMapData
 * @funcdesc 加载分屏对比的上方地图数据
 * @param {string} topDay (input) 上方地图加载数据的时间
 * @param {string} topCellCode (input) 上方地图的加载的扇区编码
 * @param {string} type (input) 当前分屏的类型（邻区对比、方案对比） nrcell  planRecord
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuningScreen.loadTopMapData = function (topDay,topCellCode,type) {
    // console.log('查询分屏上方地图数据---' + 'topDay:'+topDay +'  topCellCode:'+topCellCode +'  type:'+type );
    //加载地图上所有的扇区数据并渲染
    // IntelligentTuning.queryAllSectorData(topDay,IntelligentTuning.currentQueryCity,"topMap");
    //查询对应小区的具体对象
    var enodeb_id=topCellCode.split("_")[0];
    var cell_id=topCellCode.split("_")[1];
    IntelligentTuning.getScreenMessageById(enodeb_id, cell_id,topDay,"topMap");
    // IntelligentTuning.queryInSightSectorData(topDay,IntelligentTuning.currentQueryCity,"topMap");


}

/**
 * ********************************
 * @funcname IntelligentTuningScreen.loadBottomMapData
 * @funcdesc 加载分屏对比的上方地图数据
 * @param {string} bottomDay (input) 下方地图加载数据的时间
 * @param {string} bottomCellCode (input) 下方地图的加载的扇区编码
 * @param {string} type (input) 当前分屏的类型（邻区对比、方案对比）nrcell  planRecord
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuningScreen.loadBottomMapData = function (bottomDay,bottomCellCode,type) {
    // console.log('查询分屏下方地图数据---' + 'bottomDay:'+bottomDay +'  bottomCellCode:'+bottomCellCode +'  type:'+type );
    //查询该地市所有的扇区数据并渲染
    // IntelligentTuning.queryAllSectorData(bottomDay,IntelligentTuning.currentQueryCity,"bottomMap");
    //查询对应小区的具体对象
    var enodeb_id=bottomCellCode.split("_")[0];
    var cell_id=bottomCellCode.split("_")[1];
    IntelligentTuning.getScreenMessageById(enodeb_id, cell_id,bottomDay,"bottomMap");
    // IntelligentTuning.queryInSightSectorData(bottomDay,IntelligentTuning.currentQueryCity,"bottomMap");
}




/**
 * ********************************
 * @funcname IntelligentTuningScreen.exitScreen
 * @funcdesc 退出分屏
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuningScreen.exitScreen = function (){

    if(IntelligentTuningScreen.type === 'nrCell'){
        $("#nrCellDiv .btnGroup .btn-cancel").click();
    }else if(IntelligentTuningScreen.type === 'planRecord'){
        $("#planRecordDiv .btnGroup .btn-cancel").click();
    }else{
        $(".spiltScreen").hide(); //显示百度地图，隐藏分屏的地图
        $(".baiduMapDiv").height("100%");
    }
    IntelligentTuningScreen.topDay = IntelligentTuningScreen.day;//上分屏的日期
    IntelligentTuningScreen.bottomDay = IntelligentTuningScreen.day;//下分屏的日期
    IntelligentTuningScreen.topCellCode = null;//上分屏的小区编码
    IntelligentTuningScreen.bottomCellCode = null;//下分屏的小区编码
    IntelligentTuningScreen.type = null;//当前分屏的类型（方案对比、邻区对比）

    //详情页的数据自动变化为上分屏的数据
    if(IntelligentTuning.sectorCompleteVM.mapType=="bottomMap"){
        IntelligentTuning.goSectorCompleteMessage(IntelligentTuningMap.cacheItem.enodeb_id , IntelligentTuningMap.cacheItem.cell_id);//跳转到详情页
        IntelligentTuning.getSectorMessageById(IntelligentTuningMap.cacheItem.enodeb_id , IntelligentTuningMap.cacheItem.cell_id,IntelligentTuningMap.cacheItem.day,"topMap");
    }

    //可视区域小区显示列表、列表+地图连个选项
    $(".containList").show(); //显示分屏的地图

    //还需要增加清除缓存数据
    IntelligentTuningScreen.currentDetailPageCaChe="";
    IntelligentTuningScreen.currentGridInfo="";
    IntelligentTuningMap.clearOverlays(IntelligentTuningScreen);
    if(IntelligentTuningScreen.covSectorCompent){
        IntelligentTuningScreen.covSectorCompent.clear();
        IntelligentTuningScreen.covSectorCompent.polygonCanvasArr=[];

    }
    if(IntelligentTuningScreen.otherSectorCompent){
        IntelligentTuningScreen.otherSectorCompent.polygonCanvasArr=[];

    }

}
