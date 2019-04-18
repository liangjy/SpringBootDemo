var IntelligentTuningMap = {};
IntelligentTuningMap.gridYearDate="20190325";//20190325开始,查询栅格需要增加年份,key值如:250319_1_2467714497
IntelligentTuningMap.map = null;//地图
IntelligentTuningMap.baimapStyle = "grayscale";//地图风格
IntelligentTuningMap.bmapDistanceTool = null;//测距测角工具类
IntelligentTuningMap.coordinatePickTool = null;//坐标拾取工具
IntelligentTuningMap.isUseCoordinatePickTool = false;//是否正在进行坐标拾取操作
IntelligentTuningMap.gridTypeIndex = 1;//栅格类型 1-覆盖质量；2-过覆盖；3-重叠覆盖；4-mod3干扰；5-下行速率
IntelligentTuningMap.GridMap = null;//栅格组件
IntelligentTuningMap.CanArr = [];//存储栅格数据
IntelligentTuningMap.colorBarArr = [];//需要隐藏的图例id数组---覆盖质量
IntelligentTuningMap.colorBarArrCov = [];//需要隐藏的图例id数组---越区覆盖、重叠覆盖、mod3
IntelligentTuningMap.colorBarArrXH = [];//需要隐藏的图例id数组---下行速率
IntelligentTuningMap.isShowGrid = false;//是否需要显示栅格
IntelligentTuningMap.covSectorCompent = null;//过覆盖、mod3覆盖、重叠覆盖扇区组件
IntelligentTuningMap.otherSectorCompent = null; //用于存储附近邻区扇区和附近弱区的对象，不用于渲染，只做存储
IntelligentTuningMap.covSectorColor = '#9966CC';//基站的填充颜色和线的颜色
IntelligentTuningMap.objectPolylineColor = "#99FF00";//匹配到的进行高亮颜色
IntelligentTuningMap.sectorCircleCanvas = null;//站间列表圆形
IntelligentTuningMap.poorPolygonList = [];//附近弱区
IntelligentTuningMap.problemPolygonList = [];//派单问题区域多边形
IntelligentTuningMap.isTwoScreen = false;//是否分屏
IntelligentTuningMap.currentDetailPageCaChe = "";//当前的详情页条件缓存
IntelligentTuningMap.polygon = null;//高亮的多边形
IntelligentTuningMap.cacheItem=null;//缓存当前的详情页对象，用户在栅格提示框的内容中使用
IntelligentTuningMap.currentGridInfo="";//缓存当前栅格查询条件
IntelligentTuningMap.currentGridType="covSector";//当前地图上显示的栅格：fjPolygon 附近弱区  covSector 弱覆盖、过覆盖、重叠覆盖、mod3覆盖扇区 fjSector 附近扇区
IntelligentTuningMap.gridinfoPoint=null;//信息提示窗口经纬度缓存
IntelligentTuningMap.gridTipBox="cirTipLeft";//栅格提示框的id---弃用
IntelligentTuningMap.infoOverlay=null;//栅格提示框
IntelligentTuningMap.firstLoad=true;//页面一加载时，地图只显示有问题的扇区，其余时候则是与列表展示一致
IntelligentTuningMap.nrSectorOverlay=[];//存放连线邻区的地图覆盖物，包括线和扇区
IntelligentTuningMap.objectPolyline=null;//地图高亮的形状
IntelligentTuningMap.mapType="topMap";
IntelligentTuningMap.gridTipShow=false;//栅格信息提示框默认隐藏
IntelligentTuningMap.sectorPredOverlaysArr=[];//坐标勘误标注点和方向角偏转的小区和连线
IntelligentTuningMap.gridDataChe=null;//缓存的栅格数据
IntelligentTuningMap.listProblem=null;//缓存地图上的小区应该要显示的问题对应颜色(分屏可以共用,因为在详情页都是null,只有在列表页才有值)
IntelligentTuningMap.isInSightSector=false;//是否是点击可视区域查询出来的小区
IntelligentTuningMap.polygonCanvasArr=[];//缓存点击可视区域之前的小区
IntelligentTuningMap.pointRadius=4;//缓存小区的大小


$(function () {

    IntelligentTuningMap.initMap();//初始化地图


    /*---测量点击事件---*/
    $("#gageDistance").click(function () {//测距测角工具
        if (IntelligentTuningMap.isUseCoordinatePickTool) {
            alert("不能同时使用鼠标测距和坐标拾取");
            return;
        }

        if (IntelligentTuningMap.bmapDistanceTool == null) {
            IntelligentTuningMap.bmapDistanceTool = new measureDistance(IntelligentTuningMap.map, IntelligentTuningMap.bmapDistanceToolFinish);
        }

        if (IntelligentTuningMap.bmapDistanceTool.isUseTool) {
            IntelligentTuningMap.bmapDistanceTool.closeAll();
        } else {
            IntelligentTuningMap.bmapDistanceTool.openMeasure();
            IntelligentTuningMap.editImgSrc("#gageDistance");
        }
    });

    //坐标拾取工具
    $('#coordinatePick').click(function () {
        if (IntelligentTuningMap.bmapDistanceTool != null && IntelligentTuningMap.bmapDistanceTool.isUseTool) {
            alert("不能同时使用鼠标测距和坐标拾取");
            return;
        }
        if (IntelligentTuningMap.coordinatePickTool == null) {
            var bMapObj = {
                map: IntelligentTuningMap.map,
            }
            IntelligentTuningMap.coordinatePickTool = new bmapConversion(bMapObj);
        }

        if (IntelligentTuningMap.isUseCoordinatePickTool) {
            IntelligentTuningMap.coordinatePickTool.closeAll();
            IntelligentTuningMap.isUseCoordinatePickTool = false;
        } else {
            IntelligentTuningMap.coordinatePickTool.openMeasure();
            IntelligentTuningMap.isUseCoordinatePickTool = true;
        }
        IntelligentTuningMap.editImgSrc('#coordinatePick');

    });


    //附近小区眼睛图标点击显示下拉列表
    $(".inSightSectorImg").click(function () {
        $(this).siblings(".inSightSectorSelect").toggle();
    });
    //附近小区眼睛图标的下拉列表项点击
    $(".inSightSectorSelect > div").click(function () {
        IntelligentTuningMap.listProblem=null;//不使用列表的问题给地图上的小区上色,所以置空(防止第一次点击时横向列表时,这个值不会置空的问题)
        $(this).addClass("active").siblings().removeClass("active");
        $(this).parent().hide();
        $(this).parents(".inSightSector").addClass('utilBackgroundColor');
        var parentId=$(this).parents(".inSightSector").attr("id");
        var value=this.innerText;
        if(value=="清除"){
            if(parentId=="inSightSector"){
                IntelligentTuningMap.covSectorCompent.clear();
                IntelligentTuningMap.covSectorCompent.polygonCanvasArr = [];
                IntelligentTuningMap.isInSightSector=false;
                //渲染过覆盖、mod3覆盖、重叠覆盖的小区
                IntelligentTuningMap.covSectorCompent.polygonCanvasArr = IntelligentTuningMap.polygonCanvasArr;
                IntelligentTuningMap.covSectorCompent.pointRadius=IntelligentTuningMap.pointRadius;
                IntelligentTuningMap.covSectorCompent.draw();
            }else if(parentId=="screenInSightSector"){
                IntelligentTuningScreen.covSectorCompent.clear();
                IntelligentTuningScreen.covSectorCompent.polygonCanvasArr = [];
                IntelligentTuningScreen.isInSightSector=false;
                //渲染过覆盖、mod3覆盖、重叠覆盖的小区
                IntelligentTuningScreen.covSectorCompent.polygonCanvasArr = IntelligentTuningScreen.polygonCanvasArr;
                IntelligentTuningScreen.covSectorCompent.pointRadius=IntelligentTuningScreen.pointRadius;
                IntelligentTuningScreen.covSectorCompent.draw();
            }
            $(this).parents(".inSightSector").removeClass('utilBackgroundColor');
        }else{
            if(parentId=="inSightSector"){
                IntelligentTuningMap.isInSightSector=true;
                IntelligentTuning.queryInSightSectorData(IntelligentTuning.day,IntelligentTuning.currentQueryCity,"topMap",value);
            }else if(parentId=="screenInSightSector"){
                IntelligentTuningScreen.isInSightSector=true;
                IntelligentTuning.queryInSightSectorData(IntelligentTuningScreen.bottomDay,IntelligentTuning.currentQueryCity,"bottomMap",value);
            }
        }
        // var speed = 1000;
        // $(".progressBarDiv").show();
        // $(".progressBarDiv").css("width","0%");
        // $(".progressBarDiv").animate({"width":"100%"},speed);
        // var time = setTimeout(function () {
        //     $(".progressBarDiv").hide();
        // }, speed);
    });
   /* //可视区域的小区
    $('#inSightSector').click(function () {
        $(this).addClass('utilBackgroundColor');
        IntelligentTuning.queryInSightSectorData(IntelligentTuning.day,IntelligentTuning.currentQueryCity,"topMap");
    });*/

   //图例切换栅格类型
   $(".boxSelectionImg").click(function () {
        $(".boxSelectionUl").toggle();
    });
    $(".boxSelectionUl li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(this).parent().hide();
        $("#colorLegen .colorBarText").text($(this).text());
        var gridIndex = $(this).data("gridindex");
        if(gridIndex!=IntelligentTuningMap.gridTypeIndex){
            IntelligentTuningMap.gridTypeIndex=gridIndex;
            if(IntelligentTuningBoxSelection.open && IntelligentTuningBoxSelection.isShowGrid){//框选的栅格
                IntelligentTuningBoxSelection.showBoxSelectionGrid(IntelligentTuningBoxSelection.gridDataChe,[IntelligentTuningBoxSelection.centerPoint]);
            }else{//小区的栅格或者是附近弱区的栅格
                if(IntelligentTuningMap.currentGridType=="covSector"||IntelligentTuningMap.currentGridType=="fjSector"){//地图小区或者邻近小区
                    IntelligentTuningMap.showSectorGrid(IntelligentTuningMap.gridDataChe,[gridIndex,"topMap"]);
                }else if(IntelligentTuningMap.currentGridType=="fjPolygon"){//附近弱区
                    var currentGridInfo=IntelligentTuningMap.currentGridInfo.split("|");
                    IntelligentTuningMap.loadAreaGrid(currentGridInfo[0], currentGridInfo[1], null,"topMap");
                }

            }
        }
        // var speed = 1000;
        // $(".progressLegen").show();
        // $(".progressLegen").css("width","0%");
        // $(".progressLegen").animate({"width":"100%"},speed);
        // var time = setTimeout(function () {
        //     $(".progressLegen").hide();
        // }, speed);
    });

	
	//覆盖质量栅格图例绑定点击事件
    // $("#colorLegen").children().each(function(i){
        $("#colorLegen li").click(function(){
            var id = $(this).attr("id");
            var index=$(".map-w-i").index($(this));
            if(isnull(id)){
                return;
            }
            if($(this).hasClass("grey")){//判断该图例颜色是否为灰
                //灰色的时候，呈现栅格
                $(this).removeClass("grey");
              
//				console.log("呈现栅格");
                if(IntelligentTuningMap.gridTypeIndex==1){
                    IntelligentTuningMap.colorBarArr = IntelligentTuningMap.removeId(IntelligentTuningMap.colorBarArr,id.split("_")[1]);
                }else if(IntelligentTuningMap.gridTypeIndex==2||IntelligentTuningMap.gridTypeIndex==3||IntelligentTuningMap.gridTypeIndex==4){
                    IntelligentTuningMap.colorBarArrCov = IntelligentTuningMap.removeId(IntelligentTuningMap.colorBarArrCov,id.split("_")[1]);
                }else if(IntelligentTuningMap.gridTypeIndex==5){
                    IntelligentTuningMap.colorBarArrXH = IntelligentTuningMap.removeId(IntelligentTuningMap.colorBarArrXH,id.split("_")[1]);
                }
               
            }else{
                //呈现该图例栅格
                $(this).addClass("grey");
                if(IntelligentTuningMap.gridTypeIndex==1){
                    IntelligentTuningMap.colorBarArr.push(id.split("_")[1]);
                }else if(IntelligentTuningMap.gridTypeIndex==2||IntelligentTuningMap.gridTypeIndex==3||IntelligentTuningMap.gridTypeIndex==4){
                    IntelligentTuningMap.colorBarArrCov.push(id.split("_")[1]);
                }else if(IntelligentTuningMap.gridTypeIndex==5){
                    IntelligentTuningMap.colorBarArrXH.push(id.split("_")[1]);
                }

//				console.log("清除栅格");
            }
            IntelligentTuningMap.colorbarEndRedraw();
            // console.log(IntelligentTuningMap.colorBarArr);
           
        });
    // });

    /*$("#colorLegenCov li").click(function(){
        var id = $(this).attr("id");
        var index=$(".map-w-i").index($(this));
        if(isnull(id)){
            return;
        }
        if($(this).hasClass("grey")){//判断该图例颜色是否为灰
            //灰色的时候，呈现栅格
            $(this).removeClass("grey");

//				console.log("呈现栅格");
            IntelligentTuningMap.colorBarArrCov = IntelligentTuningMap.removeId(IntelligentTuningMap.colorBarArrCov,id.split("_")[1]);

        }else{
            //呈现该图例栅格
            $(this).addClass("grey");
            IntelligentTuningMap.colorBarArrCov.push(id.split("_")[1]);
//				console.log("清除栅格");
        }
        IntelligentTuningMap.colorbarEndRedraw();
        // console.log(IntelligentTuningMap.colorBarArrCov);

    });*/

});

/**
 * ********************************
 * @funcname IntelligentTuningMap.colorbarEndRedraw
 * @funcdesc 点击图例后重绘栅格或者描点
 * @param
 * @param
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.colorbarEndRedraw = function IntelligentTuningMap_colorbarEndRedraw(){

    IntelligentTuningMap.GridMap.clear();
    var CTData = IntelligentTuningMap.CanArr;
    var colorBarArr=[];
    //框选呈现的是栅格或者小区呈现的栅格,由于框选的栅格和小区（以及附近弱区）的栅格共用同一个栅格对象，以及它们的gridTypeIndex属性都是一致的,方法可以通用
    if((IntelligentTuningBoxSelection.open && IntelligentTuningBoxSelection.isShowGrid)||IntelligentTuningMap.isShowGrid){
        colorBarArr=IntelligentTuningMap.colorBarArr;
        if(IntelligentTuningMap.gridTypeIndex==2||IntelligentTuningMap.gridTypeIndex==3||IntelligentTuningMap.gridTypeIndex==4){
            colorBarArr=IntelligentTuningMap.colorBarArrCov;
        }else if(IntelligentTuningMap.gridTypeIndex==5){
            colorBarArr=IntelligentTuningMap.colorBarArrXH;
        }
        for(var j=0;j<colorBarArr.length;j++){
            CTData = IntelligentTuningMap.ClearData(CTData,colorBarArr[j],IntelligentTuningMap.gridTypeIndex);
        }
        IntelligentTuningMap.GridMap.draw(CTData);
    }/*else if(IntelligentTuningMap.isShowGrid){
        colorBarArr=IntelligentTuningMap.colorBarArr;
        if(IntelligentTuningMap.gridTypeIndex==2||IntelligentTuningMap.gridTypeIndex==3||IntelligentTuningMap.gridTypeIndex==4){
            colorBarArr=IntelligentTuningMap.colorBarArrCov;
        }else if(IntelligentTuningMap.gridTypeIndex==5){
            colorBarArr=IntelligentTuningMap.colorBarArrXH;
        }

        for(var j=0;j<colorBarArr.length;j++){
            CTData = IntelligentTuningMap.ClearData(CTData,colorBarArr[j],IntelligentTuningMap.gridTypeIndex);
        }
        IntelligentTuningMap.GridMap.draw(CTData);
        CTData = null;
    }*/
    IntelligentTuningMap.legendGrid(IntelligentTuningMap);


}


/**
 * ********************************
 * @funcname IntelligentTuningMap.removeId
 * @funcdesc 从数组中移除需要隐藏图例id
 * @param idArr 需要操作的数组
 * @param id 需要从数组中移除的值
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.removeId = function IntelligentTuningMap_removeId(idArr,id){
    var NewId = [];
    if(idArr.length>0){
        for(var i=0;i<idArr.length;i++){
            if(idArr[i]!=id){
                NewId.push(idArr[i]);
            }
        }
    }
    return NewId;
};


/**
 * ********************************
 * @funcname IntelligentTuningMap.initMap
 * @funcdesc 初始化地图
 * @param
 * @param
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.initMap = function IntelligentTuningMap_initMap() {
    var point = null;
    if (IntelligentTuning.cityPermission_common == "全省") {
        point = IntelligentTuningMap.getCityLocation("广州");
    } else {
        point = IntelligentTuningMap.getCityLocation(IntelligentTuning.cityPermission_common);
    }
    var zoom = 11;
    IntelligentTuningMap.map = new BMap.Map("baiduMap", {enableMapClick: false,minZoom: 10, maxZoom: 20});
    IntelligentTuningMap.map.centerAndZoom(point, zoom);//定位中心
    IntelligentTuningMap.map.enableScrollWheelZoom(); // 允许滚轮缩放
    IntelligentTuningMap.map.enableDragging();
    IntelligentTuningMap.map.disableDoubleClickZoom();
    IntelligentTuningMap.map.enableAutoResize();
    IntelligentTuningMap.map.disableInertialDragging();//禁用惯性拖拽
    IntelligentTuningMap.map.setMapStyle({style: IntelligentTuningMap.baimapStyle});
    IntelligentTuningMap.map.addEventListener('zoomend', IntelligentTuningMap.GridMapZoomEnd);
    IntelligentTuningMap.map.addEventListener('dragend', function () {
        // $('#cirTipLeft').hide();
    });
    IntelligentTuningMap.map.addEventListener('moveend', IntelligentTuningMap.GridMapMoveEnd);
    IntelligentTuningMap.map.addEventListener("mousemove", IntelligentTuningMap.mousemoveEvent);
    IntelligentTuningMap.map.addEventListener('click', IntelligentTuningMap.MapClickEvent);
    IntelligentTuningMap.map.addEventListener('resize', IntelligentTuningMap.MapResizeEvent);
    var top_right_control = new BMap.ScaleControl(
        {
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            offset: {width: 30, height: 30}
        });// 右下角，添加比例尺
    var top_right_navigation = new BMap.NavigationControl(
        {anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM, offset: {width: 0, height: 30}}); //右下角，添加缩放控件

    IntelligentTuningMap.map.addControl(top_right_control);
    IntelligentTuningMap.map.addControl(top_right_navigation);

    var mapType2 = new myBMapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT, offset: new BMap.Size(10, 10)});
//	var mapType2 = new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT,mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]});
    IntelligentTuningMap.map.addControl(mapType2);//添加地图类型控件


    //过覆盖、mod3覆盖、重叠覆盖扇区组件
    if (IntelligentTuningMap.covSectorCompent == null) {
        var bMapObj = {
            map: IntelligentTuningMap.map,
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
        IntelligentTuningMap.covSectorCompent = new SectorUtilForBaidu(bMapObj);
    }
    //不用于渲染，只做存储数据（附近弱区，扇区）的组件
    if (IntelligentTuningMap.otherSectorCompent == null) {
        var bMapObj = {
            map: IntelligentTuningMap.map,
            sectorColor: IntelligentTuningMap.covSectorColor,
            circleColor: IntelligentTuningMap.covSectorColor,
            opacity: 0.6,
            lineOpacity: 1,
            ifShowLodingImage: true,
            sectorZindex: 1
        };
        IntelligentTuningMap.otherSectorCompent = new SectorUtilForBaidu(bMapObj);
    }
    IntelligentTuningMap.GridMap = new GridMap(IntelligentTuningMap.map, {
        readTileData: null,//瓦片获取数据事件
        opacity: 0.6,//$('#opacity').val(),//透明度
        colorMode: 'range',//gradient:渐变的方式呈现颜色；range:按区间匹配颜色
        divZindex: 10,
    });
    // IntelligentTuningMap.GridMap.setThresholds(IntelligentTuningMap.getGridThresholds());

}



/**
 * ********************************
 * @funcname IntelligentTuningMap.dealMapById
 * @funcdesc 用户在详情页切换地图上的日期，地图只需要重查站间距圆圈和最近弱区、栅格
 * @param data 具体小区的对象数据
 * @param params 地图类型传递 ”topMap“ 上方地图  ”bottomMap“  下方地图
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.dealMapById=function IntelligentTuningMap_dealMapById(data,params){
    var result = callBackChangeData(data);
    console.log(result);
    if (result.length > 0) {
        var item = result[0];
        //显示地图的详细信息 小芳
        IntelligentTuningMap.showMapDetailMessage(item,params[0]);
    }else{
        var object=getCurrentMap(params[0]);
        IntelligentTuningMap.clearOverlays(object);//清除地图上所有的覆盖物
    }
}


/**
 * ********************************
 * @funcname IntelligentTuningMap.showMapDetailMessage
 * @funcdesc 展示地图详情页的数据
 * @param item 具体小区的对象数据
 * @param mapType 地图类型传递 ”topMap“ 上方地图  ”bottomMap“  下方地图
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.showMapDetailMessage = function IntelligentTuningMap_showMapDetailMessage(item,mapType) {
    var object=IntelligentTuningMap;
    if(mapType=="bottomMap"&&IntelligentTuning.isScreen){
        object=IntelligentTuningScreen;
    }

    IntelligentTuningMap.clearOverlays(object);//清除地图上所有的覆盖物

    //缓存
    object.cacheItem=item;
    if(item.is_indoor!="室外"){
        item.positionLng = item.longitude_mid_baidu;
        item.positionLat = item.latitude_mid_baidu;
    }else{
        var obj = IntelligentTuning.getSectorXYZ(item.band_mapping);
        var pointArr = IntelligentTuning.add_sector(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu), obj.xy, obj.xy, obj.z, item.ant_azimuth)
        item.positionLng = (pointArr[2].lng + pointArr[3].lng) / 2;
        item.positionLat = (pointArr[2].lat + pointArr[3].lat) / 2;
    }

    if(IntelligentTuning.isClickList) {//从列表点进详情页中，才需要计算地图的偏移，点击地图对象，地图不需要缩放
        //偏移地图到指定位置
        object.map.centerAndZoom(new BMap.Point(item.positionLng, item.positionLat),15);
        var mapWidth=$("#baiduMap").width();//地图宽度
        var mapHeight=$("#baiduMap").height();//地图高度
        var sectorWidth=$("#showSectorList").width();//详情页的宽度；
        var width=(mapWidth-sectorWidth)/2+(sectorWidth-mapWidth/2);
        object.map.panBy(width,0);
    }

    /*var width=(mapWidth-sectorWidth)/2+sectorWidth;
    var height=mapHeight/2;
    var positionPoint=object.map.pixelToPoint(new BMap.Pixel(width,height));
    object.map.centerAndZoom(new BMap.Point(positionPoint.lng, positionPoint.lat),15);
*/

    if(object.currentGridType=="fjPolygon"){
        IntelligentTuningMap.showPolygon(item,object);//高亮小区
        if(isnull(item.station_spacing)){
            IntelligentTuningMap.showSectorStationCircle(400, 2, item,object);//站间距圆圈
        }else{
            IntelligentTuningMap.showSectorStationCircle(item.station_spacing, 4, item,object);//站间距圆圈
        }
        IntelligentTuning.showNearSectorList(item,mapType);//邻近小区的展示
        IntelligentTuningMap.showLinkPoorArea(item,mapType);//附近弱区的展示 [现在扩展成根据栅格类型显示对应的多边形]
        IntelligentTuningMap.loadAreaGrid(item.day, object.polygon.gis_data, null,mapType);//加载栅格
        if(item.band_mapping!=1&&item.is_indoor == "室外"/*&&item.pred_distance != null && item.pred_distance <= 200*/){ //超过200米则显示绘制坐标勘误标注点和方向角偏转的小区,以及台账下倾角转化的覆盖范围和预测下倾角转化的覆盖范围
            IntelligentTuningMap.drawMacSectorAndLine(item,object);
        }
        setTimeout(function(){
            IntelligentTuningMap.showProblemArea(item,mapType);//派单问题多边形的展示
        },300);
    }else{
        IntelligentTuningMap.showSector(item,object);//高亮小区
        if(isnull(item.station_spacing)){
            IntelligentTuningMap.showSectorStationCircle(400, 2, item,object);//站间距圆圈
        }else{
            IntelligentTuningMap.showSectorStationCircle(item.station_spacing, 4, item,object);//站间距圆圈
        }
        IntelligentTuning.showNearSectorList(item,mapType);//邻近小区的展示
        IntelligentTuningMap.showLinkPoorArea(item,mapType);//附近弱区的展示[现在扩展成根据栅格类型显示对应的多边形]
        IntelligentTuningMap.loadSectorGrid(item.day, item.enodeb_id, item.cell_id, null,mapType);//加载栅格
        if(item.band_mapping!=1&&item.is_indoor == "室外"/*&&item.pred_distance != null && item.pred_distance <= 200*/){ //位置和方位角预测均不含800M和室分，同时方位角预测也不含位置预测大于200米的扇区,以及台账下倾角转化的覆盖范围和预测下倾角转化的覆盖范围
            IntelligentTuningMap.drawMacSectorAndLine(item,object);
        }
        setTimeout(function(){
            IntelligentTuningMap.showProblemArea(item,mapType);//派单问题多边形的展示
        },300);
    }
    // IntelligentTuningMap.resizeGridInfo(object);

    // IntelligentTuningMap.map.setZoom(20);
    // IntelligentTuningMap.map.setCenter(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu));

}


/********************************************地图点击缩放移动事件、鼠标拾取、测距测角start*********************************/
//地图缩放、拖拽结束事件
IntelligentTuningMap.GridMapZoomEnd = function IntelligentTuningMap_GridMapZoomEnd(e) {
    //缩放时不会触发地图移动moveend事件，因此要做一个触发
    if (e.type == "onzoomend") {
        IntelligentTuningMap.GridMapMoveEnd(e);
    }

    if(IntelligentTuningMap.infoOverlay){
        if(IntelligentTuningMap.infoOverlay._show){
            setTimeout(function(){
                IntelligentTuningMap.resizeGridInfo(IntelligentTuningMap);
            },100);
        }else{
            IntelligentTuningMap.infoOverlay.hide();
        }
    }

    if(IntelligentTuningBoxSelection.infoOverlay){
        if(IntelligentTuningBoxSelection.open){
            setTimeout(function(){
                try {
                    if(IntelligentTuningBoxSelection.infoOverlay!=null){
                        IntelligentTuningBoxSelection.infoOverlay.show();
                        IntelligentTuningBoxSelection.infoOverlay.draw();
                    }
                } catch (e) {
                    // TODO: handle exception
                }
            },100);
        }
    }

    if(IntelligentTuning.isScreen && IntelligentTuningScreen.initMapEnd && IntelligentTuningScreen.topCellCode !=null && IntelligentTuningScreen.bottomCellCode != null){
        if(IntelligentTuningScreen.topCellCode === IntelligentTuningScreen.bottomCellCode){
            var bottomZoom = IntelligentTuningScreen.map.getZoom();
            var topZoom = IntelligentTuningMap.map.getZoom();

            if (bottomZoom!=topZoom) {
                IntelligentTuningScreen.map.setZoom(topZoom);
            }
        }
    }



}
//地图移动结束事件
IntelligentTuningMap.GridMapMoveEnd = function IntelligentTuningMap_GridMapMoveEnd(e) {
   /* if(IntelligentTuningMap.infoOverlay){
        if(IntelligentTuningMap.infoOverlay._show){
            IntelligentTuningMap.resizeGridInfo(IntelligentTuningMap);
        }else{
            IntelligentTuningMap.infoOverlay.hide();
        }
    }*/
    if (e.gH) {//当使用centerAndZoom方法进行设置中心点时，该属性会为字符串"CenterAndZoom"
        return;
    }
    if (IntelligentTuningMap.covSectorCompent != null) {
        IntelligentTuningMap.covSectorCompent.MapZoomAndDragEnd(e, IntelligentTuningMap.covSectorCompent);
    }
    //呈现的是栅格
    //框选呈现的是栅格或者小区呈现的栅格,由于框选的栅格和小区（以及附近弱区）的栅格共用同一个栅格对象，以及它们的gridTypeIndex属性都是一致的
    if((IntelligentTuningBoxSelection.open && IntelligentTuningBoxSelection.isShowGrid)||IntelligentTuningMap.isShowGrid){
        IntelligentTuningMap.GridMap.clear();
        var CTData = IntelligentTuningMap.CanArr;
        var colorBarArr=IntelligentTuningMap.colorBarArr;
        if(IntelligentTuningMap.gridTypeIndex==2||IntelligentTuningMap.gridTypeIndex==3||IntelligentTuningMap.gridTypeIndex==4){
            colorBarArr=IntelligentTuningMap.colorBarArrCov;
        }if(IntelligentTuningMap.gridTypeIndex==5){
            colorBarArr=IntelligentTuningMap.colorBarArrXH;
        }
        for(var j=0;j<colorBarArr.length;j++){
            CTData = IntelligentTuningMap.ClearData(CTData,colorBarArr[j],IntelligentTuningMap.gridTypeIndex);
        }
        IntelligentTuningMap.GridMap.draw(CTData);
        CTData = null;

    }/*else if(IntelligentTuningMap.isShowGrid){
        IntelligentTuningMap.GridMap.clear();
        var CTData = IntelligentTuningMap.CanArr;
        var colorBarArr=IntelligentTuningMap.colorBarArr;
        if(IntelligentTuningMap.gridTypeIndex==2||IntelligentTuningMap.gridTypeIndex==3||IntelligentTuningMap.gridTypeIndex==4){
            colorBarArr=IntelligentTuningMap.colorBarArrCov;
        }else if(IntelligentTuningMap.gridTypeIndex==5){
            colorBarArr=IntelligentTuningMap.colorBarArrXH;
        }
        for(var j=0;j<colorBarArr.length;j++){
            CTData = IntelligentTuningMap.ClearData(CTData,colorBarArr[j],IntelligentTuningMap.gridTypeIndex);
        }
        IntelligentTuningMap.GridMap.draw(CTData);
        CTData = null;
    }*/


    ////如果上下的扇区相同，则地图进行同步，不同则不需要进行同步
    if(IntelligentTuning.isScreen && IntelligentTuningScreen.initMapEnd && IntelligentTuningScreen.topCellCode !=null && IntelligentTuningScreen.bottomCellCode != null){
        if(IntelligentTuningScreen.topCellCode === IntelligentTuningScreen.bottomCellCode){
            var bottomCenter = IntelligentTuningScreen.map.getCenter();
            var topCenter = IntelligentTuningMap.map.getCenter();

            var bottomZoom = IntelligentTuningScreen.map.getZoom();
            var topZoom = IntelligentTuningMap.map.getZoom();

            if(topCenter.lng != bottomCenter.lng || topCenter.lat != bottomCenter.lat){
                IntelligentTuningScreen.map.setCenter(topCenter);
            }

            // if (bottomZoom!=topZoom) {
            //     IntelligentTuningScreen.map.setZoom(topZoom);
            // }
        }
    }

}
//地图鼠标移动事件
IntelligentTuningMap.mousemoveEvent = function IntelligentTuningMap_mousemoveEvent(e) {

}
//地图大小自适应事件
IntelligentTuningMap.MapResizeEvent = function IntelligentTuningMap_MapResizeEvent(e){
    // setTimeout(function (){
    //     IntelligentTuningMap.GridMapMoveEnd(e);
    // },500);
    // IntelligentTuningMap.map.setCenter(IntelligentTuningMap.map.getCenter());
}

//地图点击事件
IntelligentTuningMap.MapClickEvent = function IntelligentTuningMap_MapClickEvent(e) {
    IntelligentTuningMap.mapClick = true;
    if (IntelligentTuningMap.bmapDistanceTool) {//正在使用测距工具
        if (IntelligentTuningMap.bmapDistanceTool.isUseTool) {
            return;
        }
    }

    if (IntelligentTuningMap.isUseCoordinatePickTool) {//正在使用坐标拾取工具
        return;
    }

    var clickType = e.target.ze;
    if (clickType != undefined && clickType != null) {
        if (clickType.length > 1) {
            IntelligentTuningMap.mapClick = false;
            return;
        }
    }
    // $("#cirTipLeft").hide();

    var clickPoint = e.point;
    var clickCovSector = [];
    if (IntelligentTuningMap.covSectorCompent) {
        clickCovSector = IntelligentTuningMap.covSectorCompent.getSectorPolygonByPoint(clickPoint);
    }
    var clickOtherPolygon = [];
    if (IntelligentTuningMap.otherSectorCompent) {
        clickOtherPolygon = IntelligentTuningMap.otherSectorCompent.getSectorPolygonByPoint(clickPoint);
    }

    IntelligentTuningMap.clickResultChe = {
        "covSector": clickCovSector,//MOD3/重叠、越区
        "otherPolygon": clickOtherPolygon//最近弱区，最近扇区,问题多边形
    };

    //如果只匹配到一个结果，则直接进入进行该结果的操作，不需要用户再次点击
    if (clickCovSector.length + clickOtherPolygon.length == 1) {
        if (clickCovSector.length == 1) {
            IntelligentTuningMap.currentGridType="covSector";
            //如果是当前正在查看的MOD3/越区/重叠，不执行查询
            //跳转到越区、mod3、重叠的详情页数据
            var clickSectorInfo=IntelligentTuning.day+"|"+clickCovSector[0].statn_id+"|"+clickCovSector[0].cell_id+"|"+getNeedGridType(IntelligentTuningMap)+"|"+clickCovSector[0].scene;
            if (IntelligentTuningMap.isShowGrid&&IntelligentTuningMap.currentDetailPageCaChe == clickSectorInfo) {
                //当前正在查看扇区详情页，不需要跳转到详情页
                var currentGridInfo=IntelligentTuning.day+"|"+clickCovSector[0].statn_id+"|"+clickCovSector[0].cell_id+"|"+getNeedGridType(IntelligentTuningMap);
                if(IntelligentTuningMap.currentGridInfo!=currentGridInfo){//再判断是否点击了同一个小区
                    //详情页与点击的扇区一致，但是扇区的地图信息不一致时（发生在用户点击过这个扇区详情页，但是又点击了其它的扇区而没有进入过其它的详情页）
                    IntelligentTuning.getScreenMessageById(clickCovSector[0].statn_id, clickCovSector[0].cell_id,IntelligentTuning.day,"topMap");
                    // //为了适应可以切换查看不同问题的栅格而做的缓存
                    // IntelligentTuningMap.showSector(IntelligentTuningMap.cacheItem,IntelligentTuningMap);//高亮小区
                    // IntelligentTuningMap.loadSectorGrid(IntelligentTuning.day, clickCovSector[0].statn_id, clickCovSector[0].cell_id, clickCovSector[0].problem_name,"topMap");
                }
                return;
            } else {
                var currentGridInfo=IntelligentTuning.day+"|"+clickCovSector[0].statn_id+"|"+clickCovSector[0].cell_id+"|"+getNeedGridType(IntelligentTuningMap);
                if(IntelligentTuningMap.currentGridInfo!=currentGridInfo){
                    if (clickCovSector[0].type == 2) {//室外基站
                        var p = clickCovSector[0].points[0];
                        var pointsArr = clickCovSector[0].points;
                        pointsArr.push(p);
                        IntelligentTuningMap.showHighLightedPolyline(pointsArr, 2, 'sector');//高亮多边形
                    } else {//室内基站
                        IntelligentTuningMap.showHighLightedPolyline(clickCovSector[0], 1, 'sector');//高亮多边形
                    }
                    // IntelligentTuning.goSectorCompleteMessage(clickCovSector[0].statn_id, clickCovSector[0].cell_id);//跳转到详情页
                    IntelligentTuning.getScreenMessageById(clickCovSector[0].statn_id, clickCovSector[0].cell_id,IntelligentTuning.day,"topMap");

                }
                return;
            }

        } else if (clickOtherPolygon.length == 1) {
            //小区附近的弱区和邻扇区
            if (clickOtherPolygon[0].scene == "fjPoor" || clickOtherPolygon[0].scene == "fjProblemArea") {//附近弱区和问题多边形
                var clickPoorInfo=IntelligentTuning.day+"|"+clickOtherPolygon[0].gis_data+"|"+IntelligentTuningMap.gridTypeIndex;
                if(IntelligentTuningMap.isShowGrid&&IntelligentTuningMap.currentGridInfo==clickPoorInfo&&IntelligentTuningMap.polygon!=null){
                    return;
                }
                IntelligentTuningMap.showPolygon(clickOtherPolygon[0],IntelligentTuningMap);//高亮并查询对应栅格
				IntelligentTuningMap.cacheItem.fjPoor=clickOtherPolygon[0];
                IntelligentTuningMap.currentGridType="fjPolygon";
                IntelligentTuningMap.loadAreaGrid(IntelligentTuning.day, clickOtherPolygon[0].gis_data, null,"topMap")
                return;
            } else if (clickOtherPolygon[0].scene == "fjSector") {
                //附近扇区
                //查询栅格
                var currentGridInfo=IntelligentTuning.day+"|"+clickOtherPolygon[0].statn_id+"|"+clickOtherPolygon[0].cell_id+"|"+getNeedGridType(IntelligentTuningMap);
                if(IntelligentTuningMap.currentGridInfo!=currentGridInfo){
                    IntelligentTuningMap.cacheItem.fjSector=clickOtherPolygon[0];
                    IntelligentTuningMap.currentGridType="fjSector";
                    IntelligentTuningMap.showSector(clickOtherPolygon[0],IntelligentTuningMap);//高亮小区
                    IntelligentTuningMap.loadSectorGrid(IntelligentTuning.day, clickOtherPolygon[0].statn_id, clickOtherPolygon[0].cell_id, null,"topMap");
                }
                return;
            }

        }

        /*$(".listDiv .detailList").each(function () {
            if ($(this).is(":visible")) {
                $(this).slideUp();
                $(this).slideDown();
            }
        });*/
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
        var resultList = IntelligentTuningMap.clickResultChe[type];
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
                        IntelligentTuningMap.showClickObjectPolyline(pointsArr, 2,IntelligentTuningMap);
                    } else {//室内基站
                        IntelligentTuningMap.showClickObjectPolyline(resultList[i], 1,IntelligentTuningMap);
                    }

                    break;
                }
            }

        } else if (type == "otherPolygon") {
            for (var i = 0; i < resultList.length; i++) {
                if (resultList[i].scene == "fjPoor" || resultList[i].scene == "fjProblemArea") {
                    if (resultList[i].object_id == liClickid) {
                        //弱区着重提示
                        IntelligentTuningMap.showClickObjectPolyline(resultList[i].points, 2,IntelligentTuningMap);
                        break;
                    }
                } else if (resultList[i].scene == "fjSector") {
                    var bst_id = liClickid.split('_')[0];
                    var cell_id = liClickid.split('_')[1];
                    //扇区着重提示
                    if (resultList[i].statn_id == bst_id && resultList[i].cell_id == cell_id) {
                        if (resultList[i].type == 2) {//室外基站
                            var p = resultList[i].points[0];
                            var pointsArr = [].concat(resultList[i].points);
                            pointsArr.push(p);
                            IntelligentTuningMap.showClickObjectPolyline(pointsArr, 2,IntelligentTuningMap);
                        } else {//室内基站
                            IntelligentTuningMap.showClickObjectPolyline(resultList[i], 1,IntelligentTuningMap);
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
        if (IntelligentTuningMap.objectPolyline != null) {
            IntelligentTuningMap.map.removeOverlay(IntelligentTuningMap.objectPolyline);
        }
        // console.log("鼠标移出类型:"+type);
    });
    $('#mapClickResult li').unbind("click").bind("click", function () {
        var type = $(this).attr('type');
        var liClickid = $(this).attr('clickid');
        var resultList = IntelligentTuningMap.clickResultChe[type];
        if (type == "covSector") {
            var statn_id = liClickid.split('_')[0];
            var cell_id = liClickid.split('_')[1];
            for (var i = 0; i < resultList.length; i++) {
                //扇区点击，跳转到详细页，需要加载栅格
                if (resultList[i].statn_id == statn_id && resultList[i].cell_id == cell_id) {
                    IntelligentTuningMap.currentGridType="covSector";
                    var clickSectorInfo=IntelligentTuning.day+"|"+resultList[i].statn_id+"|"+resultList[i].cell_id+"|"+getNeedGridType(IntelligentTuningMap)+"|"+resultList[i].scene;
                    if (IntelligentTuningMap.isShowGrid&&IntelligentTuningMap.currentDetailPageCaChe == clickSectorInfo) {
                        //当前正在查看扇区详情页，不需要跳转
                        var currentGridInfo=IntelligentTuning.day+"|"+resultList[i].statn_id+"|"+resultList[i].cell_id+"|"+getNeedGridType(IntelligentTuningMap);
                        if(IntelligentTuningMap.currentGridInfo!=currentGridInfo){
                            //详情页与点击的扇区一致，但是扇区的地图信息不一致时（发生在用户点击过这个扇区详情页，但是又点击了其它的扇区而没有进入过其它的详情页）
                            IntelligentTuning.getScreenMessageById(resultList[i].statn_id, resultList[i].cell_id,IntelligentTuning.day,"topMap");
                            // IntelligentTuningMap.showSector(IntelligentTuningMap.cacheItem,IntelligentTuningMap);//高亮小区
                            // IntelligentTuningMap.loadSectorGrid(IntelligentTuning.day, resultList[i].statn_id, resultList[i].cell_id, resultList[i].problem_name,"topMap");
                        }
                        return;
                    } else {
                        var currentGridInfo=IntelligentTuning.day+"|"+resultList[i].statn_id+"|"+resultList[i].cell_id+"|"+resultList[i].problem_name;
                        if(IntelligentTuningMap.currentGridInfo!=currentGridInfo){
                            if (resultList[i].type == 2) {//室外基站
                                var p = resultList[i].points[0];
                                var pointsArr = resultList[i].points
                                pointsArr.push(p);
                                IntelligentTuningMap.showHighLightedPolyline(pointsArr, 2, 'sector');
                            } else {//室内基站
                                IntelligentTuningMap.showHighLightedPolyline(resultList[i], 1, 'sector');
                            }
                            IntelligentTuning.getScreenMessageById(resultList[i].statn_id, resultList[i].cell_id,IntelligentTuning.day,"topMap");
                        }
                    }
                    break;
                }
            }
        } else if (type == "otherPolygon") {
            for (var i = 0; i < resultList.length; i++) {
                if (resultList[i].scene == "fjPoor" || resultList[i].scene == "fjProblemArea") {//附近弱区或者问题区域
                    if (resultList[i].object_id == liClickid) {
                        var clickPoorInfo=IntelligentTuning.day+"|"+resultList[i].gis_data+"|"+IntelligentTuningMap.gridTypeIndex;
                        if(IntelligentTuningMap.isShowGrid&&IntelligentTuningMap.currentGridInfo==clickPoorInfo&&IntelligentTuningMap.polygon!=null){
                            return;
                        }
                        //弱区着重提示
                        IntelligentTuningMap.showPolygon(resultList[i],IntelligentTuningMap);//高亮并查询对应栅格
                        IntelligentTuningMap.cacheItem.fjPoor=resultList[i];
                        IntelligentTuningMap.currentGridType="fjPolygon";
                        IntelligentTuningMap.loadAreaGrid(IntelligentTuning.day, resultList[i].gis_data, null,"topMap")
                        break;
                    }
                } else if (resultList[i].scene == "fjSector") {//附近扇区
                    //扇区着重提示
                    if (resultList[i].statn_id+"_"+resultList[i].cell_id == liClickid) {
                        //查询栅格
                        var currentGridInfo=IntelligentTuning.day+"|"+resultList[i].statn_id+"|"+resultList[i].cell_id+"|"+getNeedGridType(IntelligentTuningMap);
                        if(IntelligentTuningMap.currentGridInfo!=currentGridInfo){
                            IntelligentTuningMap.cacheItem.fjSector=resultList[i];
                            IntelligentTuningMap.currentGridType="fjSector";
                            IntelligentTuningMap.showSector(resultList[i],IntelligentTuningMap);//高亮小区
                            IntelligentTuningMap.loadSectorGrid(IntelligentTuning.day, resultList[i].statn_id, resultList[i].cell_id, null,"topMap");
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
 * @funcname IntelligentTuningMap.showClickObjectPolyline
 * @funcdesc 对匹配出来的结果鼠标移入时进行高亮显示
 * @param {Array}    pointArr 画线经纬度点集合
 * @param {Number}   type  2-室外； 3-不随地图改变大小的圆; 其余-室内
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.showClickObjectPolyline = function IntelligentTuningMap_showClickObjectPolyline(pointArr, type,object) {
    if (type == 2) {//室外
        if (object.objectPolyline == null) {
            object.map.removeOverlay(object.objectPolyline);
        }
        object.objectPolyline = new BMap.Polyline(pointArr);
        object.objectPolyline.setStrokeColor(IntelligentTuningMap.objectPolylineColor);
        object.objectPolyline.setStrokeOpacity(1);
        object.objectPolyline.setStrokeWeight(6);
        object.map.addOverlay(object.objectPolyline);
    } else if (type == 3) {//不随地图改变大小的圆
        if (object.objectPolyline == null) {
            object.map.removeOverlay(object.objectPolyline);
        }
        var circlePoint = pointArr.point;
        //转换成像素点，X+1,，算出当前地图下，1像素=多少米
        /*var circlePixel=IntelligentTuningMap.map.pointToPixel(circlePoint);
        var endPoint=IntelligentTuningMap.map.pixelToPoint(new BMap.Pixel(circlePixel.x+1,circlePixel.y));
        var meter=IntelligentTuningMap.map.getDistance(circlePoint,endPoint);
        */
        var meter = IntelligentTuningMap.getMeterOnMap(object.map);
        var radius = pointArr.radius * meter;
        object.objectPolyline = new BMap.Circle(circlePoint, radius);
        object.objectPolyline.setStrokeColor(IntelligentTuningMap.objectPolylineColor);
        object.objectPolyline.setStrokeOpacity(1);
        object.objectPolyline.setStrokeWeight(6);
        object.map.addOverlay(object.objectPolyline);

    } else {//室内
        if (object.objectPolyline == null) {
            object.map.removeOverlay(object.objectPolyline);
        }
        var circlePoint = pointArr.point;
        var radius = pointArr.radiusL;
        object.objectPolyline = new BMap.Circle(circlePoint, radius);
        object.objectPolyline.setStrokeColor(IntelligentTuningMap.objectPolylineColor);
        object.objectPolyline.setStrokeOpacity(1);
        object.objectPolyline.setStrokeWeight(6);
        object.map.addOverlay(object.objectPolyline);
    }

}
//计算当前地图级别一像素等于多少米
IntelligentTuningMap.getMeterOnMap = function IntelligentTuningMap_getMeterOnMap(map) {
    var point = map.getCenter();
    var pixel = map.pointToPixel(point);
    var endPoint = map.pixelToPoint(new BMap.Pixel(pixel.x + 1, pixel.y));
    var meter =map.getDistance(point, endPoint);
    return meter;
}

/**
 * ********************************
 * @funcname IntelligentTuningMap.showPolygon
 * @funcdesc 绘制高亮的多边形
 * @param {Object}    data  多边形对象数据集合
 * @param {Object}    object
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.showPolygon = function IntelligentTuningMap_showPolygon(data,object) {
    if (object.highLightPolyline != null) {
        object.map.removeOverlay(object.highLightPolyline);
    }
    if (object.polygon != null) {
        object.map.removeOverlay(object.polygon);
    }

    object.polygon = null;
    var gisDataArr = data.points;
    var polygon = new BMap.Polygon(gisDataArr, {
        strokeColor: "#9ffb13",
        strokeWeight: 4,
        strokeOpacity: 1,
        fillOpacity: 0.1
    });  //创建多边形
//		IntelligentTuningMap.map.centerAndZoom(new BMap.Point(sumLon/sp.length,sumLat/sp.length),16);
    polygon.addEventListener("click", function (e) {
        setTimeout(function () {
            // $("#"+object.gridTipBox+"").show();
            IntelligentTuningMap.resizeGridInfo(object);
        }, 100)
    });
    polygon.object_id = data.object_id;
    object.polygon = polygon;
    object.map.removeOverlay(object.circle);
    object.map.addOverlay(object.polygon);   //增加多边形
}

/**
 * ********************************
 * @funcname IntelligentTuningMap.showSector
 * @funcdesc 绘制高亮的扇区
 * @param result：需要高亮的扇区的数据
 * @param object IntelligentTuningMap/IntelligentTuningScreen 两大对象，分别处理对应地图的对应覆盖物以及相关数据存储
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.showSector = function IntelligentTuningMap_showSector(result,object) {
    if (result.longitude_mid_baidu == null || result.latitude_mid_baidu == null || result.longitude_mid_baidu == undefined || result.latitude_mid_baidu == undefined) {
        return;
    }
    if (object.highLightPolyline != null) {
        object.map.removeOverlay(object.highLightPolyline);
    }
    object.map.removeOverlay(object.circle);
    object.circle=null;
    var band_order = result.band_mapping;
    var xy = 0.0008;
    var z = 3.5;
    var r = 6;
    var radiusL = 15;
    var radiusS = 12;
    //case band when '2.6GHz' then 4 when '2.1GHz' then 3 when '1.8GHz' then 2 when '800MHz' then 1 else 5 end as band_order
    if (band_order == 4) {
        xy = 0.0004;
        z = 0.8;
        r = 8;
        radiusL = 8;
        radiusS = 5;
        bandLevel = 1;
    } else if (band_order == 3) {
        xy = 0.0006;
        z = 1.8;
        r = 12;
        radiusL = 12;
        radiusS = 9;
        bandLevel = 2;
    } else if (band_order == 1) {
        xy = 0.001;
        z = 5.5;
        r = 18;
        radiusL = 18;
        radiusS = 15;
        bandLevel = 4;
    }
    var point = new BMap.Point(result.longitude_mid_baidu, result.latitude_mid_baidu);
    if (result.is_indoor != '室外') {
        var oval = new BMap.Circle(point, r, {
            strokeColor: "blue",
            strokeWeight: 2,
            strokeOpacity: 0.5,
            fillColor: '#9ffb13'
        });
        oval.statn_id = result.enodeb_id;
        oval.cell_id = result.cell_id;
        oval.day = result.day;
        object.circle = oval;
        object.map.addOverlay(object.circle);
        object.circle.addEventListener("click", function (e) {
            console.log(("IntelligentTuningMap.circle提示框"));
            setTimeout(function () {
                // $("#"+object.gridTipBox+"").show();
                IntelligentTuningMap.resizeGridInfo(object);
            }, 100)
        });
        return;
    }
    var assemble = IntelligentTuning.add_sector(point, xy, xy, z, result.ant_azimuth);
//	var assemble=IntelligentTuning.add_sector(point,0.0003,0.0003,3.5,result[0].ant_azimuth);
    var sectorPolygon = new BMap.Polygon(assemble);
    sectorPolygon.setFillColor("#9ffb13");
    sectorPolygon.setStrokeColor("blue");
    sectorPolygon.setStrokeWeight(1);
    sectorPolygon.point2 = point;
    sectorPolygon.statn_id = result.enodeb_id;
    sectorPolygon.cell_id = result.cell_id;
    sectorPolygon.day = result.day;
    object.circle = sectorPolygon;
    object.circle.addEventListener("click", function (e) {
        console.log(("IntelligentTuningMap.circle提示框"));
        setTimeout(function () {
            // $("#"+object.gridTipBox+"").show();
            IntelligentTuningMap.resizeGridInfo(object);
        }, 100)
    });
    if (object.polygon != null) {
        object.map.removeOverlay(object.polygon);
    }
    object.polygon = null;
    object.map.addOverlay(object.circle);
}

//地图点击的对象高亮显示:用于地图点击对象时，由于要去查对应的数据，导致showsector（）和showpolyon（）方法执行较慢
/**********************************
 * @funcname IntelligentTuningMapSystemLayerV3.showHighLightedPolyline
 * @funcdesc //地图点击的对象高亮显示:用于地图点击对象时，由于要去查对应的数据，导致showsector（）和showpolyon（）方法执行较慢
 * @param {Array} pointArr  绘制多边形需要用到的集合点
 * @param {Number} type 1-圆形的扇区 2-叶子形状的扇区和栅格、多边形
 * @param {String} param sector-扇区 XXX-其它的字符串表示其它对象
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentTuningMap.showHighLightedPolyline = function IntelligentTuningMap_showHighLightedPolyline(pointArr, type, param) {
    if (type == 2) {//叶子形状的扇区和栅格、多边形等
        if (IntelligentTuningMap.highLightPolyline != null) {
            IntelligentTuningMap.map.removeOverlay(IntelligentTuningMap.highLightPolyline);
            if (param == "sector") {
                IntelligentTuningMap.map.removeOverlay(IntelligentTuningMap.circle);
            }
        }
        /*if(IntelligentTuningMap.circle!=null){
            IntelligentTuningMap.map.removeOverlay(IntelligentTuningMap.circle);
        }*/
        var styleOptions = {
            // strokeColor:"#00dddd",    //边线颜色。
            fillColor: "#9ffb13",      //填充颜色
            strokeWeight: 1,       //边线的宽度，以像素为单位。
            // strokeOpacity: 1,	   //边线透明度，取值范围0 - 1。
            // fillOpacity: 0.1,      //填充的透明度，取值范围0 - 1。
            // strokeStyle: 'dashed' //边线的样式，solid或dashed。
        };
        if (param != "sector") {
            styleOptions = {
                strokeColor: "#9ffb13",  //边线颜色。
                fillColor: "",      //填充颜色
                strokeWeight: 4,       //边线的宽度，以像素为单位。
                strokeOpacity: 1,	   //边线透明度，取值范围0 - 1。
                fillOpacity: 0.1,      //填充的透明度，取值范围0 - 1。
                // strokeStyle: 'dashed' //边线的样式，solid或dashed。
            }
        }
        IntelligentTuningMap.highLightPolyline = new BMap.Polygon(pointArr, styleOptions);
        IntelligentTuningMap.map.addOverlay(IntelligentTuningMap.highLightPolyline);
    } else {//圆形的扇区
        if (IntelligentTuningMap.highLightPolyline != null) {
            IntelligentTuningMap.map.removeOverlay(IntelligentTuningMap.highLightPolyline);
        }
        if (IntelligentTuningMap.circle != null) {
            IntelligentTuningMap.map.removeOverlay(IntelligentTuningMap.circle);
        }
        var circlePoint = pointArr.point;
        var radius = pointArr.radiusL;
        IntelligentTuningMap.highLightPolyline = new BMap.Circle(circlePoint, radius, {
            strokeColor: "blue",
            strokeWeight: 2,
            strokeOpacity: 0.5,
            fillColor: '#9ffb13'
        });
        /*IntelligentTuningMap.highLightPolyline.setStrokeColor(IntelligentTuningMap.highLightPolyline);
        IntelligentTuningMap.highLightPolyline.setStrokeOpacity(1);
        IntelligentTuningMap.objectPolyline.setStrokeWeight(2);*/
        IntelligentTuningMap.map.addOverlay(IntelligentTuningMap.highLightPolyline);
    }

}

//坐标拾取工具结束事件
IntelligentTuningMap.coordinatePickToolFinish = function () {
    if (!IntelligentTuningMap.coordinatePickTool.isUseTool) {
        IntelligentTuningMap.editImgSrc("#coordinatePick");
    }
}

//测距测角结束触发事件
IntelligentTuningMap.bmapDistanceToolFinish = function IntelligentTuningMap_bmapDistanceToolFinish() {
    if (!IntelligentTuningMap.bmapDistanceTool.isUseTool) {
        IntelligentTuningMap.editImgSrc("#gageDistance");
    }
}

IntelligentTuningMap.editImgSrc = function IntelligentTuningMap_editImgSrc(imgSrc) {
    // $(imgSrc + " a").toggleClass("txt-color");
    if($(imgSrc).hasClass('utilBackgroundColor')){
        $(imgSrc).removeClass('utilBackgroundColor');
    }else{
        $(imgSrc).addClass('utilBackgroundColor');
    }
}

/********************************************地图点击缩放移动事件、鼠标拾取、测距测角end*********************************/



/**
 * ********************************
 * @funcname IntelligentTuningMap.getGridThresholds
 * @funcdesc 获取栅格图层的的Thresholds
 * @param gridTypeIndex：栅格类型
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.getGridThresholds = function IntelligentTuningMap_getGridThresholds(gridTypeIndex) {
    var gridOpacity = "0.5";
    var gridThresholds = [
        {
            "threshold": "<=-115",
            "text": "(-∞,-115]",
            "color": "#C00000",
            "gradient": gridOpacity
        },
        {
            "threshold": "<=-105",
            "text": "(-115,-105]",
            "color": "#FFC000",
            "gradient": gridOpacity
        },
        {
            "threshold": "<=-95",
            "text": "(-105,-95]",
            "color": "#0070C0",
            "gradient": gridOpacity
        },
        {
            "threshold": "<=-85",
            "text": "(-95,-85]",
            "color": "#00B0F0",
            "gradient": gridOpacity
        },
        {
            "threshold": "<0",
            "text": "(-85,0)",
            "color": "#009900",
            "gradient": gridOpacity
        },
        {
            "threshold": "<=3",
            "text": "(0,3]",
            "color": "#bb10c4",
            "gradient": gridOpacity
        }
    ];
    if (gridTypeIndex == 2 || gridTypeIndex == 3 || gridTypeIndex == 4) {
        gridThresholds = [
            {
                "threshold": "-1",
                "text": "[0,-3]",
                "color": "#bb10c4",
                "gradient": gridOpacity
            },
            {
                "threshold": "0.05",
                "text": "[0,0.05]",
                "color": "#009900",
                "gradient": gridOpacity
            },
            {
                "threshold": "0.15",
                "text": "(0.05,0.15]",
                "color": "#00B0F0",
                "gradient": gridOpacity
            },
            {
                "threshold": "0.25",
                "text": "(0.15,0.25]",
                "color": "#0070C0",
                "gradient": gridOpacity
            },
            {
                "threshold": "0.35",
                "text": "(0.25,0.35]",
                "color": "#FFC000",
                "gradient": gridOpacity
            },
            {
                "threshold": "1",
                "text": "(0.35,1]",
                "color": "#C00000",
                "gradient": gridOpacity
            }
        ];
    }
    if(gridTypeIndex == 5){
        gridThresholds = [
            {
                "threshold": "0",
                "text": "[-3,0)",
                "color": "#bb10c4",
                "gradient": gridOpacity
            },
            {
                "threshold": "100",
                "text": "[12,+∞)",
                "color": "#009900",
                "gradient": gridOpacity
            },
            {
                "threshold": "11.99",
                "text": "[8,12)",
                "color": "#00B0F0",
                "gradient": gridOpacity
            },
            {
                "threshold": "7.99",
                "text": "[5,8)",
                "color": "#0070C0",
                "gradient": gridOpacity
            },
            {
                "threshold": "4.99",
                "text": "[2,5)",
                "color": "#FFC000",
                "gradient": gridOpacity
            },
            {
                "threshold": "1.99",
                "text": "(0,2)",
                "color": "#C00000",
                "gradient": gridOpacity
            }
        ];
    }
    return gridThresholds;
}

/*******************************查4.49栅格(多边形)start******************************************************************/
/**
 * ********************************
 * @funcname IntelligentTuningMap.getCloumnsList
 * @funcdesc 根据用户缓存的条件读取对应的4.29表的字段(先暂时只查过覆盖、mod3干扰、重叠覆盖)
 * @param {Number}  gridTypeIndex  栅格类型
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.getCloumnsList = function IntelligentTuningMap_getCloumnsList(gridTypeIndex) {
    var cloumnsList = ["i:a7"];//覆盖质量的栅格
    if (gridTypeIndex == 3) {//MOD3干扰
        cloumnsList.push("i:b1,i:b2");
    } else if (gridTypeIndex == 2) {//越区覆盖
        cloumnsList.push("i:b1,i:b4");
    } else if (gridTypeIndex == 4) {//重叠覆盖
        cloumnsList.push("i:b1,i:b3");
    } else if (gridTypeIndex == 5) {//下行速率
        cloumnsList.push("i:a16,i:b9");
    }
    return cloumnsList.join(",");
}



/**
 * ********************************
 * @funcname IntelligentTuningMap.loadAreaGrid
 * @funcdesc 查询多边形的栅格
 * @param {String}  day  日期
 * @param {Array}  gis_data  多边形经纬度集合
 * @param {String}  problem_name  问题类型的小区栅格
 * @param {String}  mapType    地图类型
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.loadAreaGrid = function IntelligentTuningMap_loadAreaGrid(day, gis_data, problem_name,mapType) {
    var object=IntelligentTuningMap;
    if(mapType=="bottomMap"&&IntelligentTuning.isScreen){
        object=IntelligentTuningScreen;
    }
    var progressBarSqls = [];
    var functionlist = [];
    var dataBase = [];
    //栅格数据
    var keyprefix = getddmm(day.toString()) + "_1_";//agps-mr
    if(!isnull(problem_name)){
        object.gridTypeIndex = IntelligentTuningMap.getgridTypeIndex(problem_name);//获取对应的问题取对应的栅格
    }
    var cloumnsList = IntelligentTuningMap.getCloumnsList(object.gridTypeIndex);//DSI_MRO_ALL_GRID_TOT_D DSI_MRO_ALL_GRID_TOT_W
    var list = ["IntelligentRoadTestV2_getGridDataV2", "TABLENAME:NOCE:DSI_MRO_ALL_GRID_TOT_D", "GRIDKEYPREFIX:" + keyprefix, "GRIDLEVEL:20",
        "POLYGONCONTOUR:" + gis_data, "COLUMNLIST:" + cloumnsList, "PARTITIONMOD:" + " "];//partitionmod 1
    progressBarSqls.push(list);
    functionlist.push(IntelligentTuningMap.showAreaGrid);
    dataBase.push(7);
    object.currentGridInfo=day+"|"+gis_data+"|"+object.gridTypeIndex;//缓存当前栅格的查询条件
    object.LayerMultiple = new progressbarTwoMultiple(progressBarSqls, functionlist, dataBase, [[object.gridTypeIndex,mapType]]);
    object.LayerMultipleInterval = setInterval(function () {
        if (object.LayerMultiple) {
            if (object.LayerMultiple.completeCount == object.LayerMultiple.sqlListCount) {
                clearInterval(object.LayerMultipleInterval);
                object.LayerMultiple.cancelSqlAjax();
                object.LayerMultiple = null;
            }
        }
    }, 500);

}

/**
 * ********************************
 * @funcname IntelligentTuningMap.showAreaGrid
 * @funcdesc 渲染多边形的栅格
 * @param {Array}  data  栅格数据
 * @param {Array}  params   [gridTypeIndex,mapType] gridTypeIndex 栅格类型 mapType 地图类型
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.showAreaGrid = function IntelligentTuningMap_showAreaGrid(data, params) {
    var gridTypeIndex=params[0];
    var mapType=params[1];
    var object=IntelligentTuningMap;
    if(mapType=="bottomMap"&&IntelligentTuning.isScreen){
        object=IntelligentTuningScreen;
    }
    object.gridDataChe=data;
    object.GridMap.setThresholds(IntelligentTuningMap.getGridThresholds(gridTypeIndex));
    object.GridMap.clear();
    object.CanArr = null;
    object.CanArr = [];
    object.isShowGrid = true;

    var result = isnull(data.result) ? [] : data.result;
    var result = isnull(data.result) ? [] : data.result;
    var length = data.columns.length - 1;

    var rsrp_avg_sum = 0;//所含栅格XXX_RSRP_140_Sum之和
    var cnt_140_sum = 0;//所含栅格XXX_RSRP_140_Cnt之和
    var cnt_105_sum = 0;//所含栅格XXX_RSRP_105_Cnt之和
    var all_grid_count = 0;//所含总栅格个数
    var poor_grid_count = 0;//XXX_RSRP_140_Avg小于-105栅格个数
    var xmr_sum = 0;//mod3,越区,覆盖XXMRNUM之和
    var mr_sum = 0;//MRNUM总数量之和
    var cov_sum = 0;//专题弱区数据之和
    var sh_sum = 0;//上行速率之和
    var xh_sum = 0;//下行速率之和
    var xh_cqi_sum = 0;//下行速率CQI
    var xh_rank_sum = 0;//下行速率Rank
    var all_sh_count=0;//上行速率有值的个数
    var all_xh_count=0;//下行速率有值的个数
    for (var i = 0; i < result.length; i++) {
        var rowKey = result[i][0];
        var grid_num = rowKey.split("_")[2];// 栅格号
        var gridLngLatArray = gridLngLat(grid_num, 20, 100000);
        var maxLng = gridLngLatArray[4];// 最大经度
        var maxLat = gridLngLatArray[5];// 最大纬度
        var minLng = gridLngLatArray[0];// 最小经度
        var minLat = gridLngLatArray[1];// 最小纬度
        var longitude_mid = gridLngLatArray[2];// 中心经度
        var latitude_mid = gridLngLatArray[3];// 中心纬度

        var rsrp_avg = null;// rsrp均值 （覆盖质量的）
        var rsrp_attend = 0;//记录数≤3 （覆盖质量（共用）的）


        //最优、单个频段
        var reData = formatArray(result[i][1]).split("#");
        if (!isnull(reData[9])) {//把小于等于3条记录数和rsrp均值为null过滤掉 不参与计算
            rsrp_avg = formatValue(reData[9]);// rsrp均值 _rsrp_140_avg
            rsrp_attend = parseFloat(formatValue(reData[0]));//栅格MR条数 _rsrp_140_cnt
            if (parseFloat(formatValue(reData[0])) > 3) {
                rsrp_avg_sum += parseFloat(formatValue(reData[8])); // _RSRP_140_Sum
                cnt_140_sum += parseFloat(formatValue(reData[0])); // _RSRP_140_Cnt
                cnt_105_sum += parseInt(formatValue(reData[4])); // _RSRP_105_Cnt
                if (parseFloat(reData[9]) <= -105) {
                    poor_grid_count++;
                }
                all_grid_count++;
            }

        }
        //现在是分频段那种如果各个频段均达不到3条就是紫色，不分频段那种是如果合总达不到3条就是紫色
        //0-最小经度	1-最小纬度	2-最大经度	3-最小纬度	4-rsrp平均值/MR条数默认为3	5-栅格号
        if (gridTypeIndex == 1) {//覆盖质量
            var dataChe = [];
            if (rsrp_attend != 0 && !isnull(rsrp_attend)) {
                if (parseFloat(rsrp_attend) <= 3) {
                    dataChe = [minLng, minLat, maxLng, maxLat, rsrp_attend, grid_num];
                } else if (rsrp_avg != 0 && !isnull(rsrp_avg)) {
                    dataChe = [minLng, minLat, maxLng, maxLat, rsrp_avg, grid_num];
                }
                if (dataChe.length > 0) {
                    object.CanArr.push(dataChe);
                }
            }
        } else if (gridTypeIndex == 2 || gridTypeIndex == 3 || gridTypeIndex == 4) {//MOD3干扰 i:b2 越区覆盖 i:b4 重叠覆盖 i:b3
            var mr_num = formatArray(result[i][length - 1]).split("#")[0];//MRNUM
            var xmr_num = formatArray(result[i][length]).split("#")[0];//XXMRNUM
            var mr_rat = formatArray(result[i][length]).split("#")[1];//MRMRRAT/OLMRRAT/CBMRRAT 模三干扰MR/重叠覆盖MR/越区覆盖MR的总数量占MR总数量的比率
            var is_x_grid = formatArray(result[i][length]).split("#")[2];//ISM3MR_GRID/ISOLMR_GRID/ISCBMR_GRID

            if (rsrp_attend != 0 && !isnull(rsrp_attend) && parseFloat(rsrp_attend) > 3) {
                mr_sum += parseFloat(formatValue(mr_num));//MR的总数量
                xmr_sum += parseFloat(formatValue(xmr_num));//XXXXMR的总数量
                if(is_x_grid==1||is_x_grid=="1"){
                    cov_sum ++;// 是否是XXX覆盖的栅格
                }
            }
            if (rsrp_attend != 0 && !isnull(rsrp_attend)) {
                var dataChe = [];
                if (parseFloat(rsrp_attend) <= 3) {
                    dataChe = [minLng, minLat, maxLng, maxLat, -3, grid_num];
                } else if (!isnull(mr_rat) || mr_rat == 0) {
                    dataChe = [minLng, minLat, maxLng, maxLat, mr_rat, grid_num];
                }
                if (dataChe.length > 0) {
                    object.CanArr.push(dataChe);
                }
            }
        }else if(gridTypeIndex == 5){//下行速率
            var rate_sxh;//上/下行速率
            if(!isnull(result[i][length-1])){
                var rate_sh = result[i][length-1].split("#")[0];//MIN_USEREX_UPAVGRATE 最小用户体验上行平均速率(Mbps)
                var rate_xh = result[i][length-1].split("#")[1];//MIN_USEREX_DWAVGRATE 最小用户体验下行平均速率(Mbps)
                /*if(IntelligentRoadTest.gridTypeIndex==1){//上行速率
                    rate_sxh=rate_sh;
                }else if(IntelligentRoadTest.gridTypeIndex==2){*///下行速率
                    rate_sxh=rate_xh;
                // }
                //平均CQI   平均CQI：1.25
                var xhCqi=formatArray(result[i][length]).split("#")[1];
                var xhRank=formatArray(result[i][length]).split("#")[2];
                if(rsrp_attend!=0&&!isnull(rsrp_attend)&&parseFloat(rsrp_attend)>3){
                    sh_sum += parseFloat(formatValue(rate_sh));//上行速率
                    xh_sum += parseFloat(formatValue(rate_xh));//下行速率
                    xh_cqi_sum += parseFloat(formatValue(xhCqi));//下行速率平均CQI
                    xh_rank_sum += parseFloat(formatValue(xhRank));//下行速率平均CQI
                    if(!isnull(rate_sh)){
                        all_sh_count++
                    }
                    if(!isnull(rate_xh)){
                        all_xh_count++
                    }
                }
            }


            if(rsrp_attend!=0&&!isnull(rsrp_attend)) {
                var dataChe = [];
                if (parseFloat(rsrp_attend) <= 3) {
                    dataChe = [minLng,minLat,maxLng,maxLat,-1,grid_num];
                } else if (!isnull(rate_sxh)) {
                    dataChe = [minLng,minLat,maxLng,maxLat,rate_sxh,grid_num];
                }
                if (dataChe.length > 0) {
                    object.CanArr.push(dataChe);
                }
            }

        }
    }

    if (gridTypeIndex == 1 || gridTypeIndex == 2 || gridTypeIndex == 3 || gridTypeIndex == 4) {
        object.rsrpAvg = isnull(all_grid_count) ? "null" : parseFloat(rsrp_avg_sum / cnt_140_sum).toFixed(2);//RSRP均值
        object.coverRate = isnull(all_grid_count) ? "null" : parseFloat(cnt_105_sum / cnt_140_sum * 100).toFixed(2);//覆盖率
        if (gridTypeIndex == 1) {
            object.poorRate = isnull(all_grid_count) ? "null" : parseFloat(poor_grid_count / all_grid_count * 100).toFixed(2);//弱栅格占比
        } else {
            object.mrRate = isnull(all_grid_count) ? "null" : parseFloat(cov_sum / all_grid_count * 100).toFixed(2);//MOD3/越区/重叠栅格占比
        }
    }else if(gridTypeIndex==5){//下行速率
        object.rsrpAvg = isnull(all_grid_count)? "null" : parseFloat(rsrp_avg_sum/cnt_140_sum).toFixed(2);//RSRP均值
        object.shRate = isnull(all_sh_count)? "null" : parseFloat(sh_sum/all_sh_count).toFixed(2);//KPI感知上行速率
        object.xhRate = isnull(all_xh_count)? "null" : parseFloat(xh_sum/all_xh_count).toFixed(2);//KPI感知下行速率
        object.xhCqi = isnull(all_xh_count)? "null" : parseFloat(xh_cqi_sum/all_xh_count).toFixed(2);//KPI感知下行速率平均CQI
        object.xhRank = isnull(all_xh_count)? "null" : parseFloat(xh_rank_sum/all_xh_count).toFixed(2);//KPI感知下行速率平均Rank
    }

    var CTData = object.CanArr;
    var colorBarArr = object.colorBarArr;
    for (var j = 0; j < colorBarArr.length; j++) {
        CTData = IntelligentTuningMap.ClearData(CTData, colorBarArr[j],gridTypeIndex);
    }
    object.GridMap.draw(CTData);
    CTData = null;
    data = null;
    IntelligentTuningMap.legendGrid(object);//图例的变化情况

    IntelligentTuningMap.openLable("polygon",object);//加载栅格后在弹框中呈现栅格的指标情况
}
/*******************************查4.49栅格(多边形)end******************************************************************/


/*******************************查4.30栅格(扇区)start******************************************************************/
/**
 * ********************************
 * @funcname IntelligentTuningMap.loadSectorGrid
 * @funcdesc 查询扇区多边形的栅格
 * @param {Number}  day 日期
 * @param {Number}  enodeb_id 基站id
 * @param {Number}  cell_id  小区id
 * @param {String}  problem_name 小区的问题
 * @param {Object}  object IntelligentTuningMap/IntelligentTuningScreen 两大对象，分别处理对应地图的对应覆盖物以及相关数据存储
 * @param {Array}  params   [gridTypeIndex,mapType] gridTypeIndex 栅格类型 mapType 地图类型
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.loadSectorGrid = function IntelligentTuningMap_loadSectorGrid(day, enodeb_id, cell_id, problem_name,mapType) {
    var object=IntelligentTuningMap;
    if(mapType=="bottomMap"&&IntelligentTuning.isScreen){
        object=IntelligentTuningScreen;
    }

    //查询当前栅格的小区的全量mr覆盖率和agps-mr覆盖率
    IntelligentTuning.getMrAndAgpsRate(enodeb_id,cell_id,day,mapType);

    var sqlList = [];
    var functionList = [];
    //4.30 DSI_MRO_SC_GRIgetddmmD_TOT_W 扇区栅格
    //DAY_AGPS_TYPE_eNodeB_ID_CELL_ID_GRID_NUM
    //0-全量，1-AGPS
    // var mod=enodeb_id.toString().substr(enodeb_id.toString().length-2,2);
    startRow = getddmm(day.toString()) + "_1_" + enodeb_id + "_" + cell_id + "_";
    endRow = getddmm(day.toString()) + "_1_" + enodeb_id + "_" + cell_id + "_~";
    var cloumnsList = "i:a2,i:a4,i:a5,i:a6,i:a7";//   DSI_MRO_SC_GRID_TOT_D  DSI_MRO_SC_GRID_TOT_W
    var list = ["IntelligentRoadTest_06_gridV2", "TABLENAME:" + "NOCE:DSI_MRO_SC_GRID_TOT_D", "STARTROW:" + startRow, "ENDROW:" + endRow, "COLUMNLIST:" + cloumnsList];
    sqlList.push(list);
    functionList.push(IntelligentTuningMap.showSectorGrid);
    object.gridTypeIndex=getNeedGridType(object);//获取当前应该查看的栅格类型
    if(!isnull(problem_name)){
        object.gridTypeIndex = IntelligentTuningMap.getgridTypeIndex(problem_name);//获取对应的问题
    }
    object.currentGridInfo=day+"|"+enodeb_id+"|"+cell_id+"|"+object.gridTypeIndex;
    object.isShowGrid=true;
    /*IntelligentTuningMap.openLable("sector",object);//加载栅格后在弹框中呈现栅格的指标情况
    return;*/
    progressbarTwo.submitSql(sqlList, functionList, [7], [[object.gridTypeIndex,mapType]]);
}


/**
 * ********************************
 * @funcname IntelligentTuningMap.showSectorGrid
 * @funcdesc 渲染扇区多边形栅格
 * @param {Array}  data  栅格数据
 * @param {Array}  params   [gridTypeIndex,mapType] gridTypeIndex 栅格类型 mapType 地图类型
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.showSectorGrid = function IntelligentTuningMap_showSectorGrid(data, params) {
    var gridTypeIndex=params[0];
    var mapType=params[1];
    var object=IntelligentTuningMap;
    if(mapType=="bottomMap"&&IntelligentTuning.isScreen){
        object=IntelligentTuningScreen;
    }
    object.gridDataChe=data;//缓存的栅格数据
    object.GridMap.setThresholds(IntelligentTuningMap.getGridThresholds(params[0]));
    var result = isnull(data.result) ? [] : data.result;
    object.GridMap.clear();
    object.isShowGrid = true;
    object.CanArr = null;
    object.CanArr = [];
    var rsrp_avg_sum = 0;//所含栅格XXX_RSRP_140_Sum之和
    var cnt_140_sum = 0;//所含栅格XXX_RSRP_140_Cnt之和
    var cnt_105_sum = 0;//所含栅格XXX_RSRP_105_Cnt之和
    var all_grid_count = 0;//所含总栅格个数
    var poor_grid_count = 0;//XXX_RSRP_140_Avg小于-105栅格个数
    var xmr_sum = 0;//mod3,越区,覆盖XXMRNUM之和
    var mr_sum = 0;//MRNUM总数量之和
    var cov_sum = 0;//专题扇区数据之和
    var sh_sum = 0;//上行速率之和
    var xh_sum = 0;//下行速率之和
    var xh_cqi_sum = 0;//下行速率CQI
    var xh_rank_sum = 0;//下行速率Rank
    var all_sh_count=0;//上行速率有值的个数
    var all_xh_count=0;//下行速率有值的个数
    //栅格类型 1-覆盖质量；2-过覆盖；3-重叠覆盖；4-mod3干扰; 5-下行速率
    var cloumn = 2;
    if (gridTypeIndex == 2) {//越区 i：a4
        cloumn = 2;
    } else if (gridTypeIndex == 3) {//重叠 i：a5
        cloumn = 3;
    } else if (gridTypeIndex == 4) {//MOD3 i：a6
        cloumn = 4;
    }else if (gridTypeIndex == 5){//下行 i:a7
        cloumn = 5;
    }
    for (var i = 0; i < result.length; i++) {
        var rowKey = result[i][0];
        var ia2Result = formatArray(result[i][1]).split("#");
        var ia3Result = formatArray(result[i][cloumn]).split("#");
        //根据栅格号获取最大最小、中心经纬度
        var grid_num = rowKey.split("_")[4];// 栅格号
        var gridLngLatArray = gridLngLat(grid_num, 20, 100000);
        var maxLng = gridLngLatArray[4];// 最大经度
        var maxLat = gridLngLatArray[5];// 最大纬度
        var minLng = gridLngLatArray[0];// 最小经度
        var minLat = gridLngLatArray[1];// 最小纬度
        var rsrp_avg = !isnull(ia2Result) ? ia2Result[9] : null;// rsrp均值
        var rsrp_attend = !isnull(ia2Result) ? ia2Result[0] : null;// 电信RSRP[-140，0)记录数
        var rsrp_105_cnt = !isnull(ia2Result) ? ia2Result[4] : null;// 电信RSRP[-105，0)记录数
        var rsrp_cover = null;// 覆盖率
        if (!isnull(rsrp_105_cnt) && !isnull(rsrp_attend)) {
            rsrp_cover = rsrp_105_cnt / rsrp_attend;//覆盖率 sc_rsrp_105_cnt/sc_rsrp_140_cnt
        }

        if (rsrp_avg != 0 && !isnull(rsrp_avg) && parseFloat(formatValue(rsrp_attend)) > 3) {
            rsrp_avg_sum += parseFloat(formatValue(ia2Result[8])); // _RSRP_140_Sum
            cnt_140_sum += parseFloat(formatValue(rsrp_attend)); // _RSRP_140_Cnt
            cnt_105_sum += parseInt(formatValue(rsrp_105_cnt)); // _RSRP_105_Cnt
            if (parseFloat(rsrp_avg) <= -105) {
                poor_grid_count++;
            }
            all_grid_count++;
        }
        if (gridTypeIndex == 1) {
            //0-最小经度 1-最小纬度 2—最大经度 3-最大纬度 4-rsrp均值/电信RSRP[-140，0)记录数 5-栅格号 6-电信RSRP[-105，0)记录数 7-电信RSRP[-140，0)记录数 8-覆盖率（6/7） 9-rsrp均值
            var dataChe = [];
            if (rsrp_attend != 0 && !isnull(rsrp_attend)) {
                if (parseFloat(rsrp_attend) <= 3) {//_RSRP_140_Cnt记录数<=3
                    dataChe = [minLng, minLat, maxLng, maxLat, rsrp_attend, grid_num, rsrp_105_cnt, rsrp_attend, rsrp_cover, rsrp_avg];
                } else if (!isnull(rsrp_avg)) {
                    dataChe = [minLng, minLat, maxLng, maxLat, rsrp_avg, grid_num, rsrp_105_cnt, rsrp_attend, rsrp_cover, rsrp_avg];
                }
                if (dataChe.length > 0) {
                    object.CanArr.push(dataChe);
                }
            }
        } else if (gridTypeIndex == 2 || gridTypeIndex == 3 || gridTypeIndex == 4) {//MOD3干扰 i:b2 越区覆盖 i:b4 重叠覆盖 i:b3
            // var mr_num = ia3Result[0];//MRNUM===>使用_RSRP_140_Cnt代替
            var xmr_num = ia3Result[0];//XXMRNUM
            var mr_rat = ia3Result[1];//MRMRRAT/OLMRRAT/CBMRRAT 模三干扰MR/重叠覆盖MR/越区覆盖MR的总数量占MR总数量的比率
            var is_x_grid = ia3Result[2];;//ISM3MR_GRID/ISOLMR_GRID/ISCBMR_GRID

            if(rsrp_attend!=0&&!isnull(rsrp_attend)&&parseFloat(rsrp_attend)>3){
                // mr_sum += parseFloat(formatValue(mr_num));//MR的总数量 ====>cnt_140_sum代替
                xmr_sum += parseFloat(formatValue(xmr_num));//XXXXMR的总数量
                if(is_x_grid==1||is_x_grid=="1"){
                    cov_sum ++;// 是否是XXX覆盖的栅格
                }
            }
            if (rsrp_attend != 0 && !isnull(rsrp_attend)) {
                var dataChe = [];
                if (parseFloat(rsrp_attend) <= 3) {//过滤_RSRP_140_Cnt<=3的值
                    dataChe = [minLng, minLat, maxLng, maxLat, -3, grid_num];
                } else if (!isnull(mr_rat)) {
                    dataChe = [minLng, minLat, maxLng, maxLat, mr_rat, grid_num, rsrp_105_cnt, rsrp_attend, rsrp_cover, rsrp_avg];
                }
                if (dataChe.length > 0) {
                    object.CanArr.push(dataChe);
                }
            }
        }else if (gridTypeIndex == 5){
            var rate_sxh;//上/下行速率
            // var rate_sh = 0;//MIN_USEREX_UPAVGRATE 最小用户体验上行平均速率(Mbps)
            var rate_xh = ia3Result[3];//MIN_USEREX_DWAVGRATE 最小用户体验下行平均速率(Mbps)
            /*if(IntelligentRoadTest.gridTypeIndex==1){//上行速率
                rate_sxh=rate_sh;
            }else if(IntelligentRoadTest.gridTypeIndex==2){*///下行速率
            rate_sxh=rate_xh;
            // }
            //平均CQI   平均CQI：1.25
            var xhCqi=ia3Result[1];//MR_CQI_AVG MRCQI均值
            var xhRank=ia3Result[2];//MR_Rank_AVG MRRank均值
            if(rsrp_attend!=0&&!isnull(rsrp_attend)&&parseFloat(rsrp_attend)>3){
                // sh_sum += parseFloat(formatValue(rate_sh));//上行速率
                xh_sum += parseFloat(formatValue(rate_xh));//下行速率
                xh_cqi_sum += parseFloat(formatValue(xhCqi));//下行速率平均CQI
                xh_rank_sum += parseFloat(formatValue(xhRank));//下行速率平均CQI
                /*if(!isnull(rate_sh)){
                    all_sh_count++
                }*/
                if(!isnull(rate_xh)){
                    all_xh_count++
                }
            }

            if(rsrp_attend!=0&&!isnull(rsrp_attend)) {
                var dataChe = [];
                if (parseFloat(rsrp_attend) <= 3) {
                    dataChe = [minLng,minLat,maxLng,maxLat,-1,grid_num];
                } else if (!isnull(rate_sxh)) {
                    dataChe = [minLng,minLat,maxLng,maxLat,rate_sxh,grid_num];
                }
                if (dataChe.length > 0) {
                    object.CanArr.push(dataChe);
                }
            }

        }

    }

    object.rsrpAvg = isnull(all_grid_count) ? "null" : parseFloat(rsrp_avg_sum / cnt_140_sum).toFixed(2);//RSRP均值
    object.coverRate = isnull(all_grid_count) ? "null" : parseFloat(cnt_105_sum / cnt_140_sum * 100).toFixed(2);//覆盖率
    if (gridTypeIndex == 1) {
        object.poorRate = isnull(all_grid_count) ? "null" : parseFloat(poor_grid_count / all_grid_count * 100).toFixed(2);//弱栅格占比
    } else if(gridTypeIndex==5){//下行速率
        // object.rsrpAvg = isnull(all_grid_count)? "null" : parseFloat(rsrp_avg_sum/cnt_140_sum).toFixed(2);//RSRP均值
        // object.shRate = isnull(all_sh_count)? "null" : parseFloat(sh_sum/all_sh_count).toFixed(2);//KPI感知上行速率
        object.xhRate = isnull(all_xh_count)? "null" : parseFloat(xh_sum/all_xh_count).toFixed(2);//KPI感知下行速率
        object.xhCqi = isnull(all_xh_count)? "null" : parseFloat(xh_cqi_sum/all_xh_count).toFixed(2);//KPI感知下行速率平均CQI
        object.xhRank = isnull(all_xh_count)? "null" : parseFloat(xh_rank_sum/all_xh_count).toFixed(2);//KPI感知下行速率平均Rank
    }else {
        object.mrRate = isnull(all_grid_count)? "null" : parseFloat(cov_sum/all_grid_count*100).toFixed(2);//MOD3/越区/重叠栅格占比
    }


    //根据栅格类型过滤
    var CTData = object.CanArr;
    var colorBarArr = object.colorBarArr;
    for (var j = 0; j < colorBarArr.length; j++) {
        CTData = IntelligentTuningMap.ClearData(CTData, colorBarArr[j],gridTypeIndex);
    }
    object.GridMap.draw(CTData);
    CTData = null;

    IntelligentTuningMap.legendGrid(object);//图例的变化情况

    IntelligentTuningMap.openLable("sector",object);//加载栅格后在弹框中呈现栅格的指标情况


}
/*******************************查4.30栅格(扇区)end******************************************************************/


/**
 * ********************************
 * @funcname IntelligentTuningMap.ClearData
 * @funcdesc 根据图例id过滤栅格rsrp数据，一般用户图例点击或者需要重绘的时候
 * @param data:栅格数据
 * @param id：图例的id
 * @param gridTypeIndex：栅格类型
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.ClearData = function IntelligentTuningMap_ClearData(data, id,gridTypeIndex) {
    //0-最小经度	1-最小纬度	2-最大经度	3-最小纬度	4-rsrp平均值	5-栅格号	6-rsrp覆盖率	7-mr栅格条数	8-接入扇区	9-地市	10-区县	11-中心经度	12-中心纬度  13-mr数量（多选相加）   14-上行速率   15-下行速率
    var newTileData = [];
    if (gridTypeIndex == 1) {//覆盖质量
        for (var i = 0; i < data.length; i++) {
            if (id == "1") {//去掉大于等于-85的
                if (-85 >= parseFloat(data[i][4]) || parseFloat(data[i][4]) > 0) {
                    newTileData.push(data[i]);
                }
            } else if (id == "2") {//去掉大于等于-95  小于等于-85的
                if (-95 >= parseFloat(data[i][4]) || parseFloat(data[i][4]) > -85) {
                    newTileData.push(data[i]);
                }
            } else if (id == "3") {//去掉大于等于-105  小于等于-95的
                if (-105 >= parseFloat(data[i][4]) || parseFloat(data[i][4]) > -95) {
                    newTileData.push(data[i]);
                }
            } else if (id == "4") {//去掉大于等于-115  小于等于-105的
                if (-115 >= parseFloat(data[i][4]) || parseFloat(data[i][4]) > -105) {
                    newTileData.push(data[i]);
                }
            } else if (id == "5") {//去掉 小于等于-115的
                if (parseFloat(data[i][4]) > -115) {
                    newTileData.push(data[i]);
                }
            } else if (id == "6") {//去掉 小于等于0 记录数≤3
                if (0 >= parseFloat(data[i][4]) || parseFloat(data[i][4]) > 3) {
                    newTileData.push(data[i]);
                }
            }
        }
    } else if (gridTypeIndex == 2 || gridTypeIndex == 3 || gridTypeIndex == 4) {//MOD3 越区 重叠
        for (var i = 0; i < data.length; i++) {
            if (id == "1") {
                if (0 > parseFloat(data[i][4]) || parseFloat(data[i][4]) > 0.05) {
                    newTileData.push(data[i]);
                }
            } else if (id == "2") {
                if (0.05 >= parseFloat(data[i][4]) || parseFloat(data[i][4]) > 0.15) {
                    newTileData.push(data[i]);
                }
            } else if (id == "3") {
                if (0.15 >= parseFloat(data[i][4]) || parseFloat(data[i][4]) > 0.25) {
                    newTileData.push(data[i]);
                }
            } else if (id == "4") {
                if (0.25 >= parseFloat(data[i][4]) || parseFloat(data[i][4]) > 0.35) {
                    newTileData.push(data[i]);
                }
            } else if (id == "5") {
                if (0.35 >= parseFloat(data[i][4])) {
                    newTileData.push(data[i]);
                }
            } else if (id == "6") {
                if (-3 != parseFloat(data[i][4])) {
                    newTileData.push(data[i]);
                }
            }
        }
    }else if(gridTypeIndex == 5){//下行速率
        for(var i=0;i<data.length;i++){
            if(id=="1"){
                if(12>parseFloat(data[i][4])){
                    newTileData.push(data[i]);
                }
            }else if(id=="2"){
                if(8>parseFloat(data[i][4])||parseFloat(data[i][4])>=12){
                    newTileData.push(data[i]);
                }
            }else if(id=="3"){
                if(5>parseFloat(data[i][4])||parseFloat(data[i][4])>=8){
                    newTileData.push(data[i]);
                }
            }else if(id=="4"){
                if(2>parseFloat(data[i][4])||parseFloat(data[i][4])>=5){
                    newTileData.push(data[i]);
                }
            }else if(id=="5"){
                if(0>parseFloat(data[i][4])||parseFloat(data[i][4])>=2){
                    newTileData.push(data[i]);
                }
            }else if(id=="6"){
                if(-2>parseFloat(data[i][4])||parseFloat(data[i][4])>=0){
                    newTileData.push(data[i]);
                }
            }
        }
    }


    return newTileData;
}

/**
 * ********************************
 * @funcname IntelligentTuningMap.legendGrid
 * @funcdesc 显示或隐藏栅格图例
 * @param object IntelligentTuningMap/IntelligentTuningScreen 两大对象，分别处理对应地图的对应覆盖物以及相关数据存储
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.legendGrid = function IntelligentTuningMap_legendGrid(object) {
    if(!IntelligentTuning.isScreen){
        if (object.isShowGrid || IntelligentTuningBoxSelection.open) {//判断当前的地图是否有栅格
            $("#colorLegen .boxSelectionUl>li[data-gridindex=" + object.gridTypeIndex + "]").addClass("active").siblings().removeClass("active");
            var properties=IntelligentTuningMap.colorLegendProperties(object.gridTypeIndex);
            if($("#colorLegen #level_0")!=properties["level_0"]){
                for(var key in properties){
                    $("#colorLegen #"+key).text(properties[key]);
                }
            }

            $("#colorLegen").show();
        } else {
            $("#colorLegen").hide();

        }
    }else{
        $("#colorLegen").hide();
    }

}



/**
 * ********************************
 * @funcname IntelligentTuningMap.openLable
 * @funcdesc 详情页渲染完栅格后打开栅格信息提示框
 * @param type ”sector-“当前是扇区的提示框； ”polygon“-当前是多边形的提示框
 * @param object IntelligentTuningMap/IntelligentTuningScreen 两大对象，分别处理对应地图的对应覆盖物以及相关数据存储
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.openLable = function IntelligentTuningMap_openLable(type,object) {
    try {
        var item = object.cacheItem;
        if (item == null) {
            return;
        }
        //获取lable的中心经纬度
        var lng = null;
        var lat = null;
        var rateObj = [];
        if(object.currentGridType=="covSector"){
            lng = item.positionLng;
            lat = item.positionLat;
            rateObj.push(
                {"key": "基站扇区编号", "val": item.enodeb_id + "_" + item.cell_id},
                {"key": "所属营服", "val": item.mktcenter},
                {"key": "厂家", "val": item.bs_vendor},
                {"key": "频段", "val": IntelligentTuningMap.getBandMapping(item.band_mapping)},
                {"key": "当前派单问题", "val": item.problem_name},
                {"key": "MR覆盖率", "val": object.allMRRate + "%"},
                {"key": "AGPS-MR覆盖率", "val": object.agpsMRRate + "%"}
                );
        }else if(object.currentGridType=="fjPolygon"){//附近弱区
            lng = item.fjPoor.longitude_mid_baidu;
            lat = item.fjPoor.latitude_mid_baidu;
            if(item.fjPoor.scene == "fjProblemArea"){
                rateObj.push(
                    {"key": "区域编号", "val": item.fjPoor.object_id == undefined ? "" : item.fjPoor.object_id },
                    {"key": "最近扇区", "val": item.fjPoor.cell_name == undefined ? "" : item.fjPoor.cell_name});
            }else{
                var keyName="区域编号";
                if(item.fjPoor.areaType == 1){
                    keyName="弱区编号";
                }else if(item.fjPoor.areaType == 2){
                    keyName="越区编号";
                }else if(item.fjPoor.areaType == 3){
                    keyName="重叠编号";
                }else if(item.fjPoor.areaType == 4){
                    keyName="MOD3编号";
                }else if(item.fjPoor.areaType == 5){
                    keyName="下行编号";
                }
                rateObj.push(
                    {"key": keyName, "val": item.fjPoor.object_id},
                    {"key": "最近扇区", "val": item.fjPoor.cell_name});
            }

        }else if(object.currentGridType=="fjSector"){//附近扇区
            item=item.fjSector;
            lng = item.positionLng;
            lat = item.positionLat;
            rateObj.push(
                {"key": "基站扇区编号", "val": item.enodeb_id + "_" + item.cell_id},
                {"key": "所属营服", "val": item.mktcenter},
                {"key": "厂家", "val": item.bs_vendor},
                {"key": "频段", "val": IntelligentTuningMap.getBandMapping(item.band_mapping)},
                {"key": "当前派单问题", "val": item.problem_name},
                {"key": "MR覆盖率", "val": object.allMRRate + "%"},
                {"key": "AGPS-MR覆盖率", "val": object.agpsMRRate + "%"}
            );
        }else{
            lng = item.positionLng;
            lat = item.positionLat;
            rateObj.push(
                {"key": "基站扇区编号", "val": item.enodeb_id + "_" + item.cell_id},
                {"key": "所属营服", "val": item.mktcenter},
                {"key": "厂家", "val": item.bs_vendor},
                {"key": "频段", "val": IntelligentTuningMap.getBandMapping(item.band_mapping)},
                {"key": "当前派单问题", "val": item.problem_name},
                {"key": "MR覆盖率", "val": object.allMRRate + "%"},
                {"key": "AGPS-MR覆盖率", "val": object.agpsMRRate + "%"}
            );
        }

        if (object.isShowGrid) {

            if (object.gridTypeIndex == 1) {//覆盖质量
                if(object.currentGridType=="covSector"||object.currentGridType=="fjSector"){
                   /* var poorRate=null;
                    if(!isnull(item.poor_area_tgrid_count)&&!isnull(item.poor_area_pgrid_count)){
                        poorRate=parseFloat(item.poor_area_pgrid_count/item.poor_area_tgrid_count).toFixed(2);
                    }
                    rateObj.push({"key": "弱栅格占比", "val": poorRate + "%"});*/
                }else if(object.currentGridType=="fjPolygon"){
                    rateObj.push({"key": "RSRP均值", "val": object.rsrpAvg + "%"},
                        {"key": "覆盖率", "val": object.coverRate},
                        {"key": "弱栅格占比", "val": object.poorRate + "%"});
                }

            } else if (object.gridTypeIndex == 2 || object.gridTypeIndex == 3 || object.gridTypeIndex == 4) {
                var covSector=IntelligentTuningMap.covNameRate(object.gridTypeIndex);
                if(object.currentGridType=="covSector"||object.currentGridType=="fjSector"){
                    rateObj.push({"key": covSector.name, "val": item[covSector.covRate] + "%"});
                }else if(object.currentGridType=="fjPolygon"){
                    rateObj.push({"key": covSector.name+"栅格占比", "val": object.mrRate + "%"});
                }
            }else if(object.gridTypeIndex == 5){
                rateObj.push({"key":"KQI感知下行速率", "val": object.xhRate + "Mbps"},
                    {"key": "平均CQI", "val": object.xhCqi},
                    {"key": "平均Rank", "val": object.xhRank}
                    );
            }

            object.tipLabel = [lng, lat, rateObj];
            IntelligentTuningMap.openGridInfo(lng, lat, rateObj,type,object);
        }
    } catch (e) {
        // TODO: handle exception
    }
}

/**
 * ********************************
 * @funcname IntelligentTuningMap.openGridInfo
 * @funcdesc 详情页渲染完栅格后打开栅格信息提示框
 * @param lng 经度
 * @param lat 纬度
 * @param obj 提示框中要展示的信息
 * @param type ”sector“-当前是扇区的提示框； ”polygon“-当前是多边形的提示框
 * @param object IntelligentTuningMap/IntelligentTuningScreen 两大对象，分别处理对应地图的对应覆盖物以及相关数据存储
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.openGridInfo = function IntelligentTuningMap_openGridInfo(lng, lat, obj,type,object) {
    object.gridinfoPoint = new BMap.Point(lng, lat);
    // $("#"+object.gridTipBox+"").html("");
    // $("#"+object.gridTipBox+"").hide();
    if (lng == 0 || lat == 0 || lng == null || lat == null || lng == undefined || lat == undefined) {
        return;
    }
    var ul = document.createElement("ul");
    /*var tip = this._div = document.getElementById(object.gridTipBox);
    tip.appendChild(ul);*/
    var infoText = [];
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].val != undefined) {
            var infoObj = {key:obj[i].key,val:obj[i].key + ":" + obj[i].val};
            infoText.push(infoObj);
            var li = document.createElement("li");
            var dom1 = document.createTextNode(obj[i].key + ":" + obj[i].val);
            if (obj[i].key == "") {
                dom1 = document.createTextNode(obj[i].val);
            }
            li.appendChild(dom1);
            ul.appendChild(li);
        }
    }
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.innerText="天翼蓝鹰";
    a.className="link-tyly";
    var a2 = document.createElement("a");
    a2.innerText="查看详情";
    a2.className="link-tyly";
    li.appendChild(a);
    ul.appendChild(li);
    if(type=="polygon"){
        var item=object.cacheItem.fjPoor;
        if(item.scene != "fjProblemArea"){
            infoText.push({key:'a',val:'<a class="link-tyly">天翼蓝鹰</a>'});
        }
    }else{
        infoText.push({key:'a',val:'<a class="link-tyly">天翼蓝鹰</a><a class="link-detail">查看详情</a>'});
    }
    if(object.infoOverlay!=null){
        object.map.removeOverlay(object.infoOverlay);
        object.infoOverlay=null;
    }
    object.infoOverlay = new InfoOverlay(new BMap.Point(lng, lat),infoText);
    object.map.addOverlay(object.infoOverlay);
    $("#"+object.map.Ta.id+" .link-tyly").unbind("click").bind("click", function () {
        if(type=="sector"){
            var item=object.cacheItem;
            if(object.currentGridType=="fjSector"){
                item=object.cacheItem.fjSector;
            }
            var object_id=parseFloat(item.enodeb_id)*256+parseFloat(item.cell_id);
            window.open("pages_index_Index_home.action?" +
                "appId=IntelligentRoadTestAnalysisV5&menuId=456&perId=525&id_path=new&isRedirect=true&appName=智能测评V5.0" +
                "&day=" + item.day + "&city=" + item.city +
                "&country=" + item.country +"&mktcenter="+item.mktcenter+
                "&object_id="+object_id+"&object_type=扇区"+
                "&isAudit=2"+
                "&grid_type="+object.gridTypeIndex
            );
        }else if(type=="polygon"){
            var item=object.cacheItem.fjPoor;
            var poorAreaType = "";
            if(item.areaType==2){//越区覆盖
                poorAreaType = "cbPoorArea";
            }else if(item.areaType==3){//重叠覆盖
                poorAreaType = "olPoorArea";
            }else if(item.areaType==4){//模三干扰
                poorAreaType = "m3PoorArea";
            }else if(item.areaType==5){//下行速率
                poorAreaType = "dwPoorArea";
            }
            if(item.scene == "fjProblemArea"){
                //附近问题区域，由于没有区域id，不可以进行跳转，因此暂不做跳转

            }else {//fjpoor
                window.open("pages_index_Index_home.action?" +
                    "appId=IntelligentRoadTestAnalysisV5&menuId=456&perId=525&id_path=new&isRedirect=true&appName=智能测评V5.0" +
                    "&day=" + item.day + "&city=" + item.city +
                    "&country=" + item.country +"&mktcenter="+item.mktcenter+
                    "&object_id="+item.object_id+
                    "&isAudit=2"+
                    "&grid_type="+object.gridTypeIndex +
                    "&poorAreaType="+poorAreaType
                );
            }

        }

    });
    if(type!="polygon"){
        $("#"+object.map.Ta.id+" .link-detail").unbind("click").bind("click", function () {
            if(type=="sector"){
                var item=object.cacheItem;
                if(object.currentGridType=="fjSector"){
                    item=object.cacheItem.fjSector;
                }
            }else if(type=="polygon"){
                var item=object.cacheItem;
            }

            if(object.currentDetailPageCaChe!=item.day+"|"+item.enodeb_id+"|"+item.cell_id+"|"+IntelligentTuningMap.getgridTypeIndex(item.problem_name)+"|covSector"){
                IntelligentTuning.goSectorCompleteMessage(item.enodeb_id , item.cell_id);//跳转到详情页
                IntelligentTuning.getSectorMessageById(item.enodeb_id , item.cell_id,item.day,object.mapType);
            }

        });
    }

   /* $("#"+object.map.Ta.id+" .close-infoOverlay").unbind("click").bind("click", function () {
        if(object.infoOverlay!=null){
            object.gridTipShow=false;
            object.infoOverlay.hide();
        }
    });*/

    setTimeout(function () {
        // $("#"+object.gridTipBox+"").show();
        IntelligentTuningMap.resizeGridInfo(object);
    }, 500);


}


/**
 * ********************************
 * @funcname IntelligentTuningMap.getBandMapping
 * @funcdesc 获取对应的小区频段
 * @param band 频段对应的值
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.getBandMapping = function IntelligentTuningMap_getBandMapping(band) {
    var bandMapping="";
    if(band==1){
        bandMapping="800MHz";
    }else if(band==2){
        bandMapping="1.8GHz";
    }else if(band==3){
        bandMapping="2.1GHz";
    }else if(band==4){
        bandMapping="2.6GHz";
    }
    return bandMapping;

}
/**
 * ********************************
 * @funcname IntelligentTuningMap.resizeGridInfo
 * @funcdesc 直接显示栅格信息提示框
 * @param object IntelligentTuningMap/IntelligentTuningScreen 两大对象，分别处理对应地图的对应覆盖物以及相关数据存储
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.resizeGridInfo = function IntelligentTuningMap_resizeGridInfo(object) {
    try {
        if(object.infoOverlay!=null){
            object.infoOverlay._show = true;
            object.gridTipShow=true;
            object.infoOverlay.show();
            object.infoOverlay.draw();
        }
       /* var pixel = object.map.pointToPixel(object.gridinfoPoint);
        var x = pixel.x;
        var y = pixel.y;
        var height = $("#"+object.gridTipBox+"").height() * 50 / 100;
        $("#"+object.gridTipBox+"").css("left", x + 10 + "px").css("top", y - height + "px");*/
    } catch (e) {
        // TODO: handle exception
    }
}

/**
 * ********************************
 * @funcname IntelligentTuningMap.clearOverlays
 * @funcdesc 清除地图上的所有覆盖物
 * @param object IntelligentTuningMap/IntelligentTuningScreen 两大对象，分别处理对应地图的对应覆盖物以及相关数据存储
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.clearOverlays = function IntelligentTuningMap_clearOverlays(object){
    //清除高亮的弱区/扇区
    if (object.highLightPolyline != null) {
        object.map.removeOverlay(object.highLightPolyline);
    }
    if (object.polygon != null) {
        object.map.removeOverlay(object.polygon);
    }
    object.polygon=null;
    if(object.circle!=null){
        object.map.removeOverlay(object.circle);
    }
    //清除附近多边形
    IntelligentTuningMap.removePolygonList(object);

    //清除派单问题多边形
    IntelligentTuningMap.removeProblemPolygonList(object)

    //清楚附近扇区
    IntelligentTuning.hideGridOrPolygonNrTopSector(object);
    //清除站间距圆圈
    if(object.sectorCircleCanvas!=null){
        object.map.removeOverlay(object.sectorCircleCanvas);
        object.sectorCircleCanvas=null;
    }


    if(object.GridMap){

        //清除栅格
        object.GridMap.clear();
        object.CanArr = [];
        object.isShowGrid=false;
        object.currentGridInfo="";
    }

    //清楚栅格信息提示框
    if(object.infoOverlay){
        object.gridTipShow=false;
        object.infoOverlay._show  = false;
        object.infoOverlay.hide();
    }

    //清除地图上的扇区预测位置点以及预测偏离角度的扇区覆盖物
    IntelligentTuningMap.clearSectorPredOverlays(object);

}

/**
 * ********************************
 * @funcname IntelligentTuningMap.removeSectorStationCircle
 * @funcdesc 清除地图上的站间距圆圈
 * @param object IntelligentTuningMap/IntelligentTuningScreen 两大对象，分别处理对应地图的对应覆盖物以及相关数据存储
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.removeSectorStationCircle = function IntelligentTuningMap_removeSectorStationCircle(object){
    //清除站间距圆圈
    if(object.sectorCircleCanvas!=null){
        object.map.removeOverlay(object.sectorCircleCanvas);
        object.sectorCircleCanvas=null;
    }
}

/**
 * ********************************
 * @funcname IntelligentTuningMap.covNameRate
 * @funcdesc 地图栅格提示框需要展示的栅格占比覆盖率的值
 * @param gridTypeIndex 栅格类型代表的值  1-弱覆盖 2-越区覆盖 3-重叠覆盖 4-模三干扰 5-下行速率
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.covNameRate=function IntelligentTuningMap_covNameRate(gridTypeIndex){
    //1-覆盖质量；2-过覆盖；3-重叠覆盖；4-mod3干扰; 5-下行速率 赋值
    var covSector={};
    if(gridTypeIndex==2){
        covSector.name="越区覆盖";
        covSector.covRate="cb_mrrat";
    }else if(gridTypeIndex==3){
        covSector.name="重叠覆盖";
        covSector.covRate="ol_mrrat";
    }else if(gridTypeIndex==4){
        covSector.name="模三干扰";
        covSector.covRate="m3_mrrat";
    }else if(gridTypeIndex==5){
        covSector.name="下行速率";
        covSector.covRate="null";
    }
    return covSector

}


/**
 * ********************************
 * @funcname IntelligentTuningMap.handleCovSectorData
 * @funcdesc 过覆盖、重叠覆盖、mod3覆盖处理数据的统一方法
 * @param result 传入需要渲染的小区数据
 * @param mapType 分屏状态用于区分地图的类型 ”topMap“  上方地图； ”bottomMap“ 下方地图
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.handleCovSectorData = function IntelligentTuningMap_handleCovSectorData(result,mapType) {
    var covArr = [];
    for (var i = 0; i < result.length; i++) {
        var lng = result[i].longitude_mid_baidu;
        var lat = result[i].latitude_mid_baidu;
        var point = new BMap.Point(lng, lat);
        var ant_azimuth = result[i].ant_azimuth;//方位角
        var is_indoor = result[i].is_indoor;//室内外   2为室外 1为不为室外的
//		var band = result[i].band==null?"":result[i].band;//频段
        var band_order = result[i].band_mapping == null ? 2 : result[i].band_mapping;//频段自定义排序字段
        var problem_name = result[i].problem_name;//问题类型
        var priority_problem_name=IntelligentTuningMap.getPriorityProblemName(result[i]);//优先级最高的问题
        var bandLevel = 2;
        if ("室外" == is_indoor) {///室外，叶子形状的那些扇区
            //根据频段，扇区的高矮肥瘦不同   point.band==1.8GH时为默认
            var xy = 0.0008;
            var z = 3.5;
            var r = 6;
            //case band when '2.6GHz' then 4 when '2.1GHz' then 3 when '1.8GHz' then 2 when '800MHz' then 1 else 0 end as band_order
            if (band_order == 4) {
                xy = 0.0004;
                z = 0.8;
                r = 2;
                bandLevel = 4;
            } else if (band_order == 3) {
                xy = 0.0006;
                z = 1.8;
                r = 4;
                bandLevel = 3;
            } else if (band_order == 1) {
                xy = 0.001;
                z = 5.5;
                r = 8;
                bandLevel = 1;
            }

            var assemble = {};
            assemble.points = IntelligentTuning.add_sector(point, xy, xy, z, ant_azimuth);//得到扇形的点集合
            assemble.type = 2;
            // assemble.bandLevel = bandLevel;
            assemble.statn_id = null == result[i].enodeb_id ? "" : result[i].enodeb_id;//基站编号
            assemble.cell_id = result[i].cell_id == null ? "" : result[i].cell_id;//小区编码
            assemble.city_id = result[i].city_id == null ? "200" : result[i].city_id;//city_id
            assemble.problem_name = problem_name;//问题类型
            assemble.priority_problem_name = priority_problem_name;//优先级最高的问题类型
            assemble.scene = "covSector";
            assemble.city = result[i].city;
            assemble.country = result[i].country;
            assemble.mktcenter = result[i].mktcenter;
            assemble.day = result[i].day;
            if(!isnull(IntelligentTuningMap.listProblem)){
                assemble.bandLevel=IntelligentTuningMap.getlevelColor(IntelligentTuningMap.listProblem);
            }else{
                assemble.bandLevel=IntelligentTuningMap.getlevelColor(priority_problem_name);
            }
            covArr.push(assemble);//将扇形点集合进行存储
            assemble = null;
        } else {//室内，圆形的那些扇区
            //case band when '2.6GHz' then 4 when '2.1GHz' then 3 when '1.8GHz' then 2 when '800MHz' then 1 else 0 end as band_order
            var radiusL = 15;
            var radiusS = 12;
            if (band_order == 4) {
                radiusL = 8;
                radiusS = 5;
                bandLevel = 4;
            } else if (band_order == 3) {
                radiusL = 12;
                radiusS = 9;
                bandLevel = 3;
            } else if (band_order == 1) {
                radiusL = 18;
                radiusS = 15;
                bandLevel = 1;
            }

            var assemble = {};
            assemble.radiusL = radiusL;
            assemble.radiusS = radiusS;
            assemble.type = 1;
            assemble.point = point;
            // assemble.bandLevel = bandLevel;
            assemble.statn_id = null == result[i].enodeb_id ? "" : result[i].enodeb_id;//基站编号
            assemble.cell_id = result[i].cell_id == null ? "" : result[i].cell_id;//小区编码
            assemble.city_id = result[i].city_id;//city_id
            assemble.problem_name = problem_name;//问题类型
            assemble.priority_problem_name = priority_problem_name;//优先级最高的问题类型
            assemble.scene = "covSector";
            assemble.city = result[i].city;
            assemble.country = result[i].country;
            assemble.mktcenter = result[i].mktcenter;
            assemble.day = result[i].day;
            if(!isnull(IntelligentTuningMap.listProblem)){
                assemble.bandLevel=IntelligentTuningMap.getlevelColor(IntelligentTuningMap.listProblem);
            }else{
                assemble.bandLevel=IntelligentTuningMap.getlevelColor(priority_problem_name);
            }
            covArr.push(assemble);
            assemble = null;
        }
    }
    var pointRadius=2;//画点的像素大小
    if(covArr.length<2000){
        pointRadius=4;
    }
    if(mapType=="bottomMap"){
        if(IntelligentTuning.isScreen){//处于分屏状态
            // $("#loadingDivBottom").hide();
        }
        $('#screenInSightSector').removeClass('utilBackgroundColor');
        IntelligentTuningScreen.covSectorCompent.clear();
        IntelligentTuningScreen.covSectorCompent.polygonCanvasArr = [];
        //渲染过覆盖、mod3覆盖、重叠覆盖的小区
        IntelligentTuningScreen.covSectorCompent.pointRadius=pointRadius;
        IntelligentTuningScreen.covSectorCompent.polygonCanvasArr = covArr;
        IntelligentTuningScreen.covSectorCompent.draw();
        if(!IntelligentTuningScreen.isInSightSector){//判断如果不是点可视区域的按钮查询出来的小区,则缓存起来
            IntelligentTuningScreen.polygonCanvasArr=IntelligentTuningScreen.covSectorCompent.polygonCanvasArr;
            IntelligentTuningScreen.pointRadius=pointRadius;
        }
        // IntelligentTuningScreen.isInSightSector=false;
    }else{
        if(IntelligentTuning.isScreen){//处于分屏状态
            // $("#loadingDivTop").hide();

        }
        $('#inSightSector').removeClass('utilBackgroundColor');
        IntelligentTuningMap.covSectorCompent.clear();
        IntelligentTuningMap.covSectorCompent.polygonCanvasArr = [];
        //渲染过覆盖、mod3覆盖、重叠覆盖的小区
        IntelligentTuningMap.covSectorCompent.pointRadius=pointRadius;
        IntelligentTuningMap.covSectorCompent.polygonCanvasArr = covArr;
        IntelligentTuningMap.covSectorCompent.draw();
        if(!IntelligentTuningMap.isInSightSector){//判断如果不是点可视区域的按钮查询出来的小区,则缓存起来
            IntelligentTuningMap.polygonCanvasArr=IntelligentTuningMap.covSectorCompent.polygonCanvasArr;
            IntelligentTuningMap.pointRadius=pointRadius;
        }
        // IntelligentTuningMap.isInSightSector=false;
    }
    IntelligentTuningMap.listProblem=null;//重置为null，只有当用户点列表进去的时候才赋值，或者返回的时候才重新赋值

}

/**
 * ********************************
 * @funcname IntelligentTuningMap.getPriorityProblemName
 * @funcdesc 根据优先级排序获取优先级最高的问题
 * @param {Object} data 小区数据
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.getPriorityProblemName=function IntelligentTuningMap_getPriorityProblemName(data){
    var PriorityProblemName="";
    if(data.problem_name == "天馈接反" || data.is_ant_conn_abnor == 1){ //IS_ANT_CONN_ABNOR=1 OR PROBLEM_NAME=‘天馈接反’
        PriorityProblemName="天馈接反";
        return PriorityProblemName;
    }
    if(data.problem_name == "坐标勘误" || data.is_loca_abnor == 1){ //IS_LOCA_ABNOR=1 OR PROBLEM_NAME=‘坐标勘误’
        PriorityProblemName="坐标勘误";
        return PriorityProblemName;
    }
    if(data.problem_name == "下倾角勘误" || data.is_decl_angle_abnor == 1){ //is_decl_angle_abnor=1 OR PROBLEM_NAME=‘下倾角勘误’
        PriorityProblemName="下倾角勘误";
        return PriorityProblemName;
    }
    if(data.problem_name == "越区覆盖" || data.is_cb_cov == 1){ //IS_CB_COV=1 OR PROBLEM_NAME=‘越区覆盖’
        PriorityProblemName="越区覆盖";
        return PriorityProblemName;
    }
    if(data.problem_name == "重叠覆盖" || data.is_ol_cov == 1){ //IS_OL_COV=1 OR PROBLEM_NAME=‘重叠覆盖’
        PriorityProblemName="重叠覆盖";
        return PriorityProblemName;
    }
    if(data.problem_name == "MOD3干扰" || data.is_m3_cov == 1){ //IS_M3_COV=1 OR PROBLEM_NAME=‘MOD3干扰’
        PriorityProblemName="MOD3干扰";
        return PriorityProblemName;
    }
    if(data.problem_name == "弱覆盖" || data.is_exist_poor__area == 1){ //IS_EXIST_POOR__AREA=1 OR PROBLEM_NAME=‘弱覆盖’
        PriorityProblemName="弱覆盖";
        return PriorityProblemName;
    }
    return PriorityProblemName;

}


/********************************************小区站间距圆圈start*********************************/

/**
 * ********************************
 * @funcname IntelligentTuningMap.showSectorStationCircle
 * @funcdesc 点击绘制站间列表圆形按钮时调用的方法
 * @param {int} distance ：站间距  {Array} spaceStationList 站间列表   {Object} sectorData ： 扇区对象
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuningMap.showSectorStationCircle = function (distance, spaceStationList, sectorData,object) {
    if (object.sectorCircleCanvas == null) {
        object.sectorCircleCanvas = new BMap.CanvasLayer({
            update: reDraw,
            paneName: 'mapPane',
            zIndex: -1
        });
    }

    function reDraw() {
        var context = this.canvas.getContext("2d");
        if (!context) {
            return;
        }
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); //清除canvas图层中的东西
        IntelligentTuningMap.drawSectorStationCircle(context, distance, spaceStationList, sectorData,object)
    }

    object.map.removeOverlay(object.sectorCircleCanvas);
    object.map.addOverlay(object.sectorCircleCanvas); //将图层显示在地图上
}

/**
 * ********************************
 * @funcname IntelligentTuningMap.drawSectorStationCircle
 * @funcdesc 绘制站间列表的圆形
 * @param {Object} context ：画笔对象  {int} distance ：站间距  {Array} spaceStationList 站间列表   {Object} sectorData ： 扇区对象
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuningMap.drawSectorStationCircle = function (context, distance, spaceStationList, sectorData,object) {
    var colorArr = ["green", "blue", "red"]; //颜色
    var DValueArr = [1, 1.5, 2]; //倍数
    if(distance==400&&spaceStationList==2){//如果站间距的值为空，默认显示一个400米的红色圈。
        colorArr = ["red"]; //颜色
    }
    var lng = sectorData.longitude_mid_baidu;
    var lat = sectorData.latitude_mid_baidu;
    var point = new BMap.Point(lng, lat);
    //zoom:当前地图缩放级别
    var zoom = object.map.getZoom();
    //center:当前地图可视范围中心点坐标
    var center = object.map.getCenter();
    //bounds:地图可视区域
    var bound = object.map.getSize();
    var pixelObj = object.map.pointToPixel(point); //返回转换之后的像素对象 属性有x 和 y

    for (var i = 1; i < spaceStationList; i++) {
        var lngOffset = IntelligentTuningMap.LngDistince(point, distance * DValueArr[i - 1], object.map);
        var lng2 = lng + parseFloat(lngOffset);
        var point2 = new BMap.Point(lng2, lat);
        var pixelObj2 = object.map.pointToPixel(point2); //返回转换之后的像素对象 属性有x 和 y
        var radius = Math.abs(pixelObj2.x - pixelObj.x);
        context.globalAlpha = 1; //线段不需要透明度，如果设置透明度的话比较难看出来每个扇形的分隔
        context.strokeStyle = colorArr[i - 1];
        context.lineWidth = 3;
        context.beginPath();
        context.arc(pixelObj.x, pixelObj.y, radius, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();
    }
}

//计算相差distince米的经度差距
//centerPoint：中心点百度对象
//distince：需要计算的距离
//mapObject：百度地图对象
IntelligentTuningMap.LngDistince = function IntelligentTuningMap_LngDistince(centerPoint, distince, mapObject) {
    var addCenterPointLng = new BMap.Point(centerPoint.lng + 0.1, centerPoint.lat);
    var distinceLng = mapObject.getDistance(centerPoint, addCenterPointLng);//水平方向相差0.1经度的距离
    var onemeterLng = 0.1 / distinceLng;//一米的经度长度
    return parseFloat(onemeterLng * distince).toFixed(7);
}

//计算相差distince米的纬度差距
IntelligentTuningMap.LatDistince = function IntelligentTuningMap_LatDistince(centerPoint, distince, mapObject) {
    var addCenterPointLat = new BMap.Point(centerPoint.lng, centerPoint.lat + 0.1);
    var distinceLat = mapObject.getDistance(centerPoint, addCenterPointLat);//垂直方向相差0.1纬度的距离
    var onemeterLat = 0.1 / distinceLat;//一米的纬度长度
    return parseFloat(onemeterLat * distince).toFixed(7);
}

/********************************************小区站间距圆圈end*********************************/

/********************************************附近弱区start*********************************/
/**********************************
 * @funcname IntelligentTuningMap.showLinkPoorArea
 * @funcdesc 附近多边形展示
 * @param {string} item (input)
 * 对应详情页数据
 * @return {null}
 * @author 郑文彬
 * @create 20180412
 ***********************************/
IntelligentTuningMap.showLinkPoorArea = function IntelligentTuningMap_showLinkPoorArea(item,mapType) {
    var nearPoorAreaList = []; //弱覆盖区域集合
    // item.nb_poor_coverage_set = "200100972,336,11,0@200101210,911,12,0"; //测试数据
    var object=getCurrentMap(mapType);
    object.gridTypeIndex=getNeedGridType(object);
    var filed="nb_poor_coverage_set";
    var type=0;
    var color="#F5B258";
    if(object.gridTypeIndex==2){//越区覆盖
        filed="nb_cbcov_set";
        type=8;
        color="#de5077";
    }else if(object.gridTypeIndex==3){//重叠覆盖
        filed="ol_m3cov_set";
        type=7;
        color="#9e380f";
    }else if(object.gridTypeIndex==4){//模三干扰
        filed="nb_m3cov_set";
        type=6;
        color="#57b0bd";
    }else if(object.gridTypeIndex==5){//下行速率
        filed="nb_poor_dwratee_set";
        type=5;
        color="#77799c";
    }
    if (item[filed] != null && item[filed] != '') {
        nearPoorAreaList = IntelligentTuningMap.splitPoorAreaStr(item[filed]);
    }
    IntelligentTuningMap.loadPolygonByObjectIdList(nearPoorAreaList, item.problem_name,mapType,type,color);
}
/**********************************
 * @funcname IntelligentTuningMap.loadPolygonByObjectIdList
 * @funcdesc 查询附近弱区或者覆盖弱区
 * @param {list} obj (input) 包含附近或者覆盖弱区object_id的数组对象
 * @param {string} problem_name 对应的区域问题
 * @param {string} mapType 上地图---"topMap"   下方地图------"bottomMap"
 * @param {string} type 对应的区域问题编号
 * @param {string} color 绘制多边形时应该使用的颜色
 * @return {null}
 * @author 郑文彬
 * @create 20180412
 ***********************************/
IntelligentTuningMap.loadPolygonByObjectIdList = function IntelligentTuningMap_loadPolygon(obj, problem_name,mapType,type,color) {
    var objectIdList = "";
    for (var i = 0; i < obj.length; i++) {
        objectIdList = objectIdList + "'" + obj[i].object_id + "',";
    }
    if (objectIdList == "") {
        return;
    }
    objectIdList = objectIdList.substring(0, objectIdList.length - 1);
    var list = ["IntelligentTuning_getPolygon", "OBJECT_ID_LIST:" + objectIdList, "DAY:" + IntelligentTuning.currentQueryDay,"TYPE:" + type];
    var funcList = [IntelligentTuningMap.showPolygonList];
    var database = [3];
    var params = [[problem_name,mapType,color]];
    progressbarTwo.submitSql([list], funcList, database, params);
}

//渲染附近弱区
/**********************************
 * @funcname IntelligentTuningMap.showPolygonList
 * @funcdesc 渲染附近的多边形
 * @param {Object} data：查询回来的附近多边形数据 (input)
 * @param {Array} params：[problem_name 所属的问题,mapType 地图类型] (input)
 * @return {null}
 * @author 陈小芳
 * @create 20180412
 ***********************************/
IntelligentTuningMap.showPolygonList = function IntelligentTuningMap_showPolygonList(data, params) {
    var mapType=params[1];
    var color=params[2];
    var object=IntelligentTuningMap;
    if(mapType=="bottomMap"&&IntelligentTuning.isScreen){
        object=IntelligentTuningScreen;
    }

    IntelligentTuningMap.removePolygonList(object);//先清除附近的多边形
    var result = callBackChangeData(data);
    var poorPolygonList = [];
    for (var i = 0; i < result.length; i++) {
        var varr = [];
        var gis_data = result[i].gis_data;
        var sp = gis_data.split('@');
        var sumLon = 0;
        var sumLat = 0;
        for (var j = 0; j < sp.length; j++) {
            var v = sp[j].split(',');
            sumLon = sumLon + parseFloat(v[0]);
            sumLat = sumLat + parseFloat(v[1]);
            varr.push(new BMap.Point(v[0], v[1]));
        }
        var polygon = new BMap.Polygon(varr, {
            strokeColor: color,
            strokeWeight: 4,
            strokeOpacity: 1,
            fillOpacity: 0.1
        });  //创建多边形
        polygon.i = i;
        polygon.day = result[i].day;
        polygon.latitude_mid_baidu = result[i].latitude_mid_baidu;
        polygon.longitude_mid_baidu = result[i].longitude_mid_baidu;
        polygon.type = "fjPoor";
        polygon.areaType = object.gridTypeIndex;
        var plyM = {
            type: 2,
            points: varr,
            decide: 1,
            object_id: result[i].object_id,
            gis_data: gis_data,
            day:result[i].day,
            city:result[i].city,
            country:result[i].country,
            mktcenter:result[i].mktcenter,
            scene: "fjPoor",
            areaType:object.gridTypeIndex,
            cell_name:result[i].cell_name,
            latitude_mid_baidu:result[i].latitude_mid_baidu,
            longitude_mid_baidu:result[i].longitude_mid_baidu,
            problem_name: params[0]
        };
        /* polygon.addEventListener("click",function (e){
             this.setStrokeColor('#FF9900');
         });
         polygon.addEventListener("click",function (e){
             this.setStrokeColor('#9ffb13');
         });*/
        poorPolygonList.push(plyM);
        object.poorPolygonList.push(polygon);
        object.map.addOverlay(polygon);   //增加多边形
    }
    object.otherSectorCompent.polygonCanvasArr = object.otherSectorCompent.polygonCanvasArr.concat(poorPolygonList);
}

//清除附近弱区
/**********************************
 * @funcname IntelligentTuningMap.removePolygonList
 * @funcdesc 清除附近弱区
 * @param object IntelligentTuningMap/IntelligentTuningScreen 两大对象，分别处理对应地图的对应覆盖物以及相关数据存储
 * @return {null}
 * @author 陈小芳
 * @create 20180412
 ***********************************/
IntelligentTuningMap.removePolygonList=function IntelligentTuningMap_removePolygonList(object){
    console.log('清除附近多边形');
    for (var i = 0; i < object.poorPolygonList.length; i++) {
        object.map.removeOverlay(object.poorPolygonList[i]);
    }
    object.poorPolygonList=[];

    if(object.otherSectorCompent){
        var polygonCanvasArr = object.otherSectorCompent.polygonCanvasArr;
        var fjPolygon = [];
        for (var i = 0; i < polygonCanvasArr.length; i++) {
            if (polygonCanvasArr[i].scene != "fjPoor") {
                fjPolygon.push(polygonCanvasArr[i]);
            }
        }
        object.otherSectorCompent.polygonCanvasArr = fjPolygon;
    }
}


/**
 * IntelligentTuningMap.splitPoorAreaStr
 * 切割附近弱区集合的字符串的方法
 * @param poorAreaSetStr
 * @returns {Array}
 */
IntelligentTuningMap.splitPoorAreaStr = function IntelligentTuningMap_splitPoorAreaStr(poorAreaSetStr) {
    var objList = [];
    var dataArr = poorAreaSetStr.split("@");
    for (var i = 0; i < dataArr.length; i++) {
        var strArr = dataArr[i].split(",");
        var obj = {
            object_id: strArr[0], //弱区编号
            distance: strArr[1], //距离
            gridCount: strArr[2], //弱区内的栅格数
            poorGridCount: strArr[3] //弱区内的弱栅格数
        }
        objList.push(obj);
    }
    return objList;
}
/********************************************小区附近弱区end*********************************/



/********************************************小区派单问题多边形start*********************************/
/**********************************
 * @funcname IntelligentTuningMap.showProblemArea
 * @funcdesc 根据当前小区的派单方案，取不同的字段绘制问题区域多边形
 * @param object item 当前查看的小区对象
 * @param String mapType 当前地图类型
 * @return {null}
 * @author 陈小芳
 * @create 20180412
 ***********************************/
IntelligentTuningMap.showProblemArea=function IntelligentTuningMap_showProblemArea(item,mapType){
    var object=getCurrentMap(mapType);
    IntelligentTuningMap.removeProblemPolygonList(object);//先清除原先的问题多边形
    var column="ref_poor_area_gis_bd";//弱覆盖
    if(item.problem_name=='越区覆盖'){//CB_AREA_GIS_BD
        column="cb_area_gis_bd";
    }else if(item.problem_name=='重叠覆盖'){//OL_AREA_GIS_BD
        column="ol_area_gis_bd";
    }else{
        return;
    }
    var problemPolygonList = [];
    var varr = [];
    var gis_data = item[column];
    if(isnull(gis_data)){
        return;
    }
    var sp = gis_data.split('@');
    /*var sumLon = 0;
    var sumLat = 0;*/
    for (var j = 0; j < sp.length; j++) {
        var v = sp[j].split(',');
        /*sumLon = sumLon + parseFloat(v[0]);
        sumLat = sumLat + parseFloat(v[1]);*/
        varr.push(new BMap.Point(v[0], v[1]));
    }
    var polygon = new BMap.Polygon(varr, {
        strokeColor: "#5b9bd5",
        strokeWeight: 4,
        strokeOpacity: 1,
        fillOpacity: 0.1,
        zIndex:-10
    });  //创建多边形
    /*polygon.i = i;*/
    var Viewport = IntelligentTuningMap.map.getViewport(varr);
    var centerPoint = Viewport.center;
    polygon.latitude_mid_baidu = centerPoint.lat;
    polygon.longitude_mid_baidu = centerPoint.lng;
    polygon.type = "fjProblemArea";
    var plyM = {
        type: 2,
        points: varr,
        decide: 1,
        /*object_id: result[i].object_id,*/
        gis_data: gis_data,
        /*day:result[i].day,
        city:result[i].city,
        country:result[i].country,
        mktcenter:result[i].mktcenter,*/
        scene: "fjProblemArea",
       /* cell_name:result[i].cell_name,*/
        latitude_mid_baidu:centerPoint.lat,
        longitude_mid_baidu:centerPoint.lng,
        problem_name: item.problem_name
    };
    /* polygon.addEventListener("click",function (e){
         this.setStrokeColor('#FF9900');
     });
     polygon.addEventListener("click",function (e){
         this.setStrokeColor('#9ffb13');
     });*/
    problemPolygonList.push(plyM);
    object.problemPolygonList.push(polygon);
    object.map.addOverlay(polygon);   //增加问题多边形
    object.otherSectorCompent.polygonCanvasArr = object.otherSectorCompent.polygonCanvasArr.concat(problemPolygonList);

}


/**********************************
 * @funcname IntelligentTuningMap.removeProblemPolygonList
 * @funcdesc 清除派单问题类型多边形
 * @param object IntelligentTuningMap/IntelligentTuningScreen 两大对象，分别处理对应地图的对应覆盖物以及相关数据存储
 * @return {null}
 * @author 陈小芳
 * @create 20180412
 ***********************************/
IntelligentTuningMap.removeProblemPolygonList=function IntelligentTuningMap_removeProblemPolygonList(object){
    console.log('清除问题多边形');
    for (var i = 0; i < object.problemPolygonList.length; i++) {
        object.map.removeOverlay(object.problemPolygonList[i]);
    }
    object.problemPolygonList=[];
    if(object.otherSectorCompent){
        var polygonCanvasArr = object.otherSectorCompent.polygonCanvasArr;
        var fjPolygon = [];
        for (var i = 0; i < polygonCanvasArr.length; i++) {
            if (polygonCanvasArr[i].scene != "fjProblemArea") {
                fjPolygon.push(polygonCanvasArr[i]);
            }
        }
        object.otherSectorCompent.polygonCanvasArr = fjPolygon;
    }
}

/********************************************小区派单问题多边形start*********************************/

/********************************************其它全局的方法start*********************************/

//通过对应的小区问题获取给IntelligentTuningMap.gridTypeIndex=1;//栅格类型 1-覆盖质量；2-过覆盖；3-重叠覆盖；4-mod3干扰 5-下行速率 赋值
IntelligentTuningMap.getgridTypeIndex = function IntelligentTuningMap_getgridTypeIndex(problem_name) {
    var gridTypeIndex = 1;
    if (problem_name == "弱覆盖") {
        gridTypeIndex = 1;
    } else if (problem_name == "越区覆盖") {
        gridTypeIndex = 2;
    } else if (problem_name == "重叠覆盖") {
        gridTypeIndex = 3;
    } else if (problem_name == "MOD3干扰") {
        gridTypeIndex = 4;
    } else if (problem_name == "坐标勘误") {
        gridTypeIndex = 1;
    } else if (problem_name == "天馈接反" || problem_name == "方位角勘误") {
        gridTypeIndex = 1;
    }else if (problem_name == "下倾角勘误") {
        gridTypeIndex = 1;
    }
    return gridTypeIndex;
}
//通过对应的小区问题获取对应基站组件的level颜色;//栅格类型 1-覆盖质量；2-过覆盖；3-重叠覆盖；4-mod3干扰  赋值
IntelligentTuningMap.getlevelColor = function IntelligentTuningMap_getlevelColor(problem_name) {
    var level = 8;
    if (problem_name == "弱覆盖") {
        level = 1;
    } else if (problem_name == "越区覆盖") {
        level = 2;
    } else if (problem_name == "重叠覆盖") {
        level = 3;
    } else if (problem_name == "MOD3干扰") {
        level = 4;
    } else if (problem_name == "坐标勘误") {
        level = 5;
    } else if (problem_name == "天馈接反" || problem_name == "方位角勘误") {
        level = 6;
    }else if (problem_name == "下倾角勘误") {
        level = 7;
    }
    return level;
}

/**********************************
 * @funcname add_sector
 * @funcdesc 根据基站的位置方位角计算出一个多边形
 * @param {object} centre 基站位置
 * @return
 * @author 梁杰禹
 * @create 20171025
 ***********************************/
IntelligentTuning.add_sector = function add_sector(centre, x, y, z, ant_angle) {
    var assemble = new Array();
    var angle;
    var dot;
    var tangent = x / y;
    assemble.push(centre);
    for (i = 0; i <= 3; i++) {
        angle = (2 * Math.PI / 6 / 3) * i / z + (ant_angle - 30 / z) / 180 * Math.PI;
        dot = new BMap.Point(centre.lng + Math.sin(angle) * y * tangent, centre.lat + Math.cos(angle) * y);
        assemble.push(dot);
    }
    return assemble;
}

IntelligentTuningMap.getPolygonByPoint = function IntelligentTuningMap_getPolygonByPoint(clickPoint, polygonCanvasArr) {
    var clickPolygon = [];
    for (var i = 0; i < polygonCanvasArr.length; i++) {
        if (BMapLib.GeoUtils.isPointInPolygonForNOCE(clickPoint, polygonCanvasArr[i])) {
            var clickP = polygonCanvasArr[i];
            clickPolygon.push(clickP);
        }
    }
    return clickPolygon;
}

/**
 * 传入城市名称获取相应的经纬度
 *
 */
IntelligentTuningMap.getCityLocation = function (city) {
    var cityLocation = {
        "广州": "113.270793,23.135308",
        "深圳": "114.066112,22.548515",
        "珠海": "113.583235,22.276392",
        "汕头": "116.688739,23.359289",
        "佛山": "113.128432,23.027707",
        "韶关": "113.603757,24.816174",
        "湛江": "110.365494,21.277163",
        "肇庆": "112.47177,23.052984",
        "江门": "113.088165,22.584459",
        "茂名": "110.931773,21.669051",
        "惠州": "114.423348,23.116409",
        "梅州": "116.129179,24.294311",
        "汕尾": "115.381693,22.791322",
        "河源": "114.707097,23.749829",
        "阳江": "111.989051,21.864421",
        "清远": "113.062619,23.688238",
        "东莞": "113.758231,23.026997",
        "中山": "113.399023,22.522262",
        "潮州": "116.62943,23.662923",
        "揭阳": "116.37922,23.555773",
        "云浮": "112.051045,22.921154",
        "未知": "113.270793,23.135308"
    };
    if (city != null) {
        var pointArr = cityLocation[city].split(",");
        pointLng = pointArr[0];
        pointLat = pointArr[1];
        var point = new BMap.Point(pointLng, pointLat);
        return point;
    }
    return null;

};

IntelligentTuningMap.getCityCenterLocation = function (city) {
    var cityLocation = {
        "广州": "113.482362,23.373307",
        "深圳": "113.951493,22.658029",
        "珠海": "113.261594,22.170497",
        "汕头": "116.481121,23.27136",
        "佛山": "112.976436,23.067229",
        "韶关": "113.611143,24.959969",
        "湛江": "110.180047,21.31967",
        "肇庆": "112.166955,23.59392",
        "江门": "112.663682,22.324641",
        "茂名": "110.943535,22.033336",
        "惠州": "114.429823,23.152322",
        "梅州": "116.122374,24.202886",
        "汕尾": "115.552058,23.024663",
        "河源": "114.871358,23.991769",
        "阳江": "111.762215,22.076213",
        "清远": "113.02243,24.101593",
        "东莞": "113.850308,23.007632",
        "中山": "113.390375,22.572622",
        "潮州": "116.766279,23.839547",
        "揭阳": "116.01199,23.330839",
        "云浮": "111.66103,22.896881",
        "未知": "113.270793,23.135308"
    };
    if (city != null) {
        var pointArr = cityLocation[city].split(",");
        pointLng = pointArr[0];
        pointLat = pointArr[1];
        var point = new BMap.Point(pointLng, pointLat);
        return point;
    }
    return null;

};

//无效数据置为0
function formatValue(value) {
    if (!noceUtil.isUndefined(value) && value != 'NULL' && value != 'null' && value != 'undefined') {
        return value;
    }
    return 0;

}

//无效数组置为空''
function formatArray(value) {
    if (!noceUtil.isUndefined(value) && value != 'NULL' && value != 'null' && value != 'undefined') {
        return value;
    }
    return '';
}

//是否是无效数据
function isnull(value) {
    if (!noceUtil.isUndefined(value) && value != 'NULL' && value != 'null' && value != 'undefined') {
        return false;
    } else {
        return true;
    }
}

//获取上一个月份的日期
function getPreMonth(date) {
    var year = date.substr(0, 4);
    var month = date.substr(4, 2);
    var preMonth = new Date(year, month - 1 - 1, 1).Format("yyyyMM");
    // var preMonth =new Date( now.setMonth(now.getMonth() - 1)).Format("yyyyMM");
    return preMonth;
}

//获取日期格式为ddMM
function getddmm(date){
    var year=date.substr(2 , 2);
    var month=date.substr(4 , 2);
    var day = date.substr(6 , 2);
    var preMonth=day+""+month+""+year;
    if(Number(date)<Number(IntelligentTuningMap.gridYearDate)){
        preMonth=day+""+month;
    }
    // preMonth = new Date(year+"-"+month+"-"+day).Format("ddMMyyyy");
    return preMonth;
}

//获取当前操作的对象 主要分为主地图对象IntelligentTuningMap 和分屏下方的地图对象IntelligentTuningScreen
function getCurrentMap(mapType){
    var object=IntelligentTuningMap;
    if(mapType=="bottomMap"&&IntelligentTuning.isScreen){
        object=IntelligentTuningScreen;
    }
    return object;
}


/********************************************其它全局的方法end*********************************/

/**********************************提示框******************************************************/
function InfoOverlay(point, textArr){
    this._point = point;
    this._textArr = textArr;
}
InfoOverlay.prototype = new BMap.Overlay();

InfoOverlay.prototype.initialize = function(map){
    this._map = map;
    var thisObj = this;
    thisObj._show = true;
    var tip=this._div=document.createElement("div");
    $(tip).html("");
    $(tip).addClass("circleTipLeft");
    $(tip).show();
    var ul = document.createElement("ul");
    tip.appendChild(ul);
    for(var i=0;i<this._textArr.length;i++){
        if(this._textArr[i].val!=null){
            var li=document.createElement("li");
            $(li).html(this._textArr[i].val);
            ul.appendChild(li);
        }
    }
    // $(ul).append("<a class=\"link-tyly\">天翼蓝鹰</a><a class=\"link-detail\">查看详情</a>");
    $(tip).append("<button type=\"button\" class=\"closeProgress  close-infoOverlay\">\n" +
        "\t\t\t\t\t\t\t\t\t<img src=\"../images/closeChart.png\">\n" +
        "\t\t\t\t\t\t\t\t</button>");
    $(tip).css("paddingRight",28+"px");

    $(tip).find('.close-infoOverlay').unbind('click').bind('click',function () {
        $(tip).hide();
        thisObj._show = false;
    })


    map.getPanes().markerPane.appendChild(tip);
    return tip;
}
InfoOverlay.prototype.draw = function(){
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    if(this._show){
        this._div.style.display="block";
    }
    this._div.style.left = pixel.x+20+"px";
    this._div.style.top  = (pixel.y - this._div.clientHeight/2)+ "px";
}
/**********************************提示框 end******************************************************/



/**********************************
 * @funcname IntelligentTuningMap.drawMacSectorAndLine
 * @funcdesc 绘制坐标勘误标注点和方向角偏转的小区，如果预测距离大于200米则画一个虚框的扇形以及与预测位置的连线
 * 位置和方位角预测均不含800M和室分，同时方位角预测也不含位置预测大于200米的扇区
 * @param item 具体的扇区对象 从3.171表中取得
 * @param object IntelligentTuningMap/IntelligentTuningScreen 两大对象，分别处理对应地图的对应覆盖物以及相关数据存储
 * @return {null}
 * @author 陈小芳
 * @create 20180412
 ***********************************/
IntelligentTuningMap.drawMacSectorAndLine = function IntelligentTuningMap_drawMacSectorAndLine(item,object) {
    var img = "../js/IntelligentRoadTest/images/maker3.png";
    var img2 = "../js/IntelligentRoadTest/images/bg_num.png";
    IntelligentTuningMap.clearSectorPredOverlays(object); //先清除掉原有坐标勘误标注点和方向角偏转的小区
    var point1=null;
    var predLocation = item.pred_location_baidu;//预测百度地图位置
    var lng=null;
    var lng=null;
    var obj = IntelligentTuning.getSectorXYZ(item.band_mapping);//根据基站的位置方位角和频段计算出一个多边形的轮廓点
    if(!isnull(predLocation)){
         lng = predLocation.split(",")[0];
         lat = predLocation.split(",")[1];
        //绿色的预测坐标
        var pointArr = IntelligentTuning.add_sector(new BMap.Point(lng, lat), obj.xy, obj.xy, obj.z, item.ant_azimuth);
        lng = (pointArr[2].lng + pointArr[3].lng) / 2;
        lat = (pointArr[2].lat + pointArr[3].lat) / 2;

        //画绿色的预测坐标
        var point = new BMap.Point(lng, lat);
        point1=point;
        var myIcon = new BMap.Icon(img, new BMap.Size(22, 32));
        var marker = new BMap.Marker(point, {icon: myIcon});  // 创建标注
        marker.setOffset(new BMap.Size(0, -14));
        object.map.addOverlay(marker);
        object.sectorPredOverlaysArr.push(marker);
    }


    //红色的台账坐标
    var lng_2 = item.longitude_mid_baidu;
    var lat_2 = item.latitude_mid_baidu;
    var pointArr_2 = IntelligentTuning.add_sector(new BMap.Point(lng_2, lat_2), obj.xy, obj.xy, obj.z, item.ant_azimuth)
    lng_2 = (pointArr_2[2].lng + pointArr_2[3].lng) / 2;
    lat_2 = (pointArr_2[2].lat + pointArr_2[3].lat) / 2;

    //画红色的台账坐标
    var point2 = new BMap.Point(lng_2, lat_2);
    var myIcon2 = new BMap.Icon(img2, new BMap.Size(22, 32));
    var marker2 = new BMap.Marker(point2, {icon: myIcon2});  // 创建标注
    marker2.setOffset(new BMap.Size(0, -15));
    marker2.setZIndex(66);
    object.map.addOverlay(marker2);
    object.sectorPredOverlaysArr.push(marker2);

    //画线条
    if(!isnull(lng_2)&&!isnull(lat_2)&&!isnull(lng)&&!isnull(lat)){
        var polyline = new BMap.Polyline([
            new BMap.Point(lng_2, lat_2),
            new BMap.Point(lng, lat)
        ], {strokeColor: "#505872", strokeWeight: 2, strokeOpacity: 0.5});   //创建折线
        polyline.cell_name = item.cell_name;
        object.map.addOverlay(polyline);
        object.sectorPredOverlaysArr.push(polyline);
    }


    //画一个预测偏位角的扇区，坐标和台账坐标一致。只是方位角不一样&& item.pred_distance <= 200
    var point = new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu);
    if (item.pred_azimuth != null && item.band_mapping != null&& !isnull(item.pred_distance)&& item.pred_distance <= 200) { //绘制预测角度的扇区
        var assemble1 = IntelligentTuning.add_sector(point, obj.xy, obj.xy, obj.z, item.pred_azimuth);
        var sectorPolygon1 = new BMap.Polygon(assemble1);
        sectorPolygon1.setFillColor("#F9C943"); //这里需要更换颜色
        sectorPolygon1.setStrokeWeight(2);
        sectorPolygon1.setStrokeStyle("dashed");
        sectorPolygon1.point2 = point;
        sectorPolygon1.cell_name = item.cell_name;
        sectorPolygon1.isPred = true;
        object.map.addOverlay(sectorPolygon1);
        object.sectorPredOverlaysArr.push(sectorPolygon1);
    }


    //画台账下倾角转化的覆盖范围和预测下倾角转化的覆盖范围
    var predAntCircleCanvas = new BMap.CanvasLayer({
        update: drawPredAntCircle,
        paneName: 'mapPane',
        zIndex: -99
    });
    function drawPredAntCircle(){
        var ctx = this.canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); //清除canvas图层中的东西
        var pixelPred=object.map.pointToPixel(point1);//用于绘制预测下倾角的覆盖范围
        var pixelAnt = object.map.pointToPixel(point2);//用于绘制台账下倾角的覆盖范围
        //globalAlpha
        //预测下倾角转化的覆盖范围
        if(!isnull(pixelPred)){
            if(!isnull(item.pred_ant_max_radius)&&!isnull(item.pred_ant_near_radius)){//画近端到远端的遮罩
                /*var lineMeter=item.pred_ant_max_radius-item.pred_ant_near_radius;//画圆环是通过画一个很粗的宽的圆来代替
                var radiusMeter=item.pred_ant_near_radius+(item.pred_ant_max_radius-item.pred_ant_near_radius)/2;//宽度是向两边加粗的,所以计算一半的增量
                var lineWidth=IntelligentTuningMap.getDistinceOnMap(point1,pixelPred,lineMeter,object.map);
                var radius=IntelligentTuningMap.getDistinceOnMap(point1,pixelPred,radiusMeter,object.map);
                ctx.beginPath();
                ctx.lineWidth = lineWidth;//画圆环是通过画一个很粗的宽的圆来代替
                console.log("预测下倾角:"+ctx.lineWidth);
                ctx.setLineDash([]);//设置实线
                ctx.arc(pixelPred.x, pixelPred.y, radius, 0, 2 * Math.PI);//宽度是向两边加粗的,所以计算一半的增量作为半径
                ctx.strokeStyle="rgba(255,153,0,0.5)";
                ctx.stroke();
                ctx.closePath();*/


                var radiusMax=IntelligentTuningMap.getDistinceOnMap(point1,pixelPred,item.pred_ant_max_radius,object.map);//远端
                var radiusNear=IntelligentTuningMap.getDistinceOnMap(point1,pixelPred,item.pred_ant_near_radius,object.map);//近端
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.setLineDash([]);//设置实线
                ctx.arc(pixelPred.x, pixelPred.y, radiusMax, 0, 2 * Math.PI);
                ctx.arc(pixelPred.x, pixelPred.y, radiusNear, 0, 2 * Math.PI);
                ctx.fillStyle="rgba(14,199,153,0.5)";
                ctx.fill("evenodd");
                ctx.closePath();
            }

            if(!isnull(item.ant_max_radius)&&!isnull(item.ant_near_radius)) {//画近端到远端的遮罩
                /*var lineMeter=item.ant_max_radius-item.ant_near_radius;//画圆环是通过画一个很粗的宽的圆来代替
                var radiusMeter=item.ant_near_radius+(item.ant_max_radius-item.ant_near_radius)/2;//宽度是向两边加粗的,所以计算一半的增量
                var lineWidth=IntelligentTuningMap.getDistinceOnMap(point2,pixelAnt,lineMeter,object.map);
                var radius=IntelligentTuningMap.getDistinceOnMap(point2,pixelAnt,radiusMeter,object.map);
                ctx.beginPath();
                ctx.lineWidth = lineWidth;//画圆环是通过画一个很粗的宽的圆来代替
                console.log("台账下倾角:"+ctx.lineWidth);
                ctx.setLineDash([]);//设置实线
                ctx.arc(pixelAnt.x, pixelAnt.y, radius, 0, 2 * Math.PI);//宽度是向两边加粗的,所以计算一半的增量作为半径
                ctx.strokeStyle="rgba(255,153,0,0.5)";
                ctx.stroke();
                ctx.closePath();*/
                var radiusMax=IntelligentTuningMap.getDistinceOnMap(point1,pixelPred,item.ant_max_radius,object.map);//远端
                var radiusNear=IntelligentTuningMap.getDistinceOnMap(point1,pixelPred,item.ant_near_radius,object.map);//近端
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.setLineDash([]);//设置实线
                ctx.arc(pixelPred.x, pixelPred.y, radiusMax, 0, 2 * Math.PI);
                ctx.arc(pixelPred.x, pixelPred.y, radiusNear, 0, 2 * Math.PI);
                ctx.fillStyle="rgba(216,30,6,0.5)";
                ctx.fill("evenodd");
                ctx.closePath();
            }
            if(!isnull(item.pred_ant_mid_radius)){//画中心端点的虚线圆(绿色)
                var radiusMid=IntelligentTuningMap.getDistinceOnMap(point1,pixelPred,item.pred_ant_mid_radius,object.map);
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.setLineDash([10,5]);//设置虚线
                ctx.arc(pixelPred.x, pixelPred.y, radiusMid, 0, 2 * Math.PI);//覆盖中心半径画圆
                ctx.strokeStyle="rgba(11,179,137,1)";
                ctx.stroke();
                ctx.closePath();
            }
            if(!isnull(item.ant_mid_radius)) {//画中心端点的虚线圆(红色)
                var radiusMid=IntelligentTuningMap.getDistinceOnMap(point1,pixelPred,item.ant_mid_radius,object.map);
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.setLineDash([10,5]);//设置虚线
                ctx.arc(pixelPred.x, pixelPred.y, radiusMid, 0, 2 * Math.PI);
                ctx.strokeStyle="rgba(216,30,6,1)";
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
    object.map.addOverlay(predAntCircleCanvas);
    object.sectorPredOverlaysArr.push(predAntCircleCanvas);


}
/**
 * ********************************
 * @funcname IntelligentTuningMap.getDistinceOnMap
 * @funcdesc 计算当前地图上两个点坐标的距离
 * @param {Object} point  计算的点坐标
 * @param {Object} pixelObj  像素坐标
 * @param {Number/String} meters 计算的距离(米)
 * @param {Object} map 地图对象
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */

IntelligentTuningMap.getDistinceOnMap=function IntelligentTuningMap_getDistinceOnMap(point,pixelObj,meters,map){
    var lngOffset=IntelligentTuningMap.LngDistince(point, meters, map);
    var lng2 = point.lng + parseFloat(lngOffset);
    var point2 = new BMap.Point(lng2, point.lat);
    var pixelObj2 = map.pointToPixel(point2); //返回转换之后的像素对象 属性有x 和 y
    var distince = Math.abs(pixelObj2.x - pixelObj.x);
    return distince;
}
/**
 * ********************************
 * @funcname IntelligentTuningMap.clearSectorPredOverlays
 * @funcdesc 清除地图上的扇区预测位置点以及预测偏离角度的扇区覆盖物
 * @param object IntelligentTuningMap/IntelligentTuningScreen 两大对象，分别处理对应地图的对应覆盖物以及相关数据存储
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuningMap.clearSectorPredOverlays = function(object){
    console.log("移除台账勘误覆盖物:"+object.sectorPredOverlaysArr.length)
    if(object.sectorPredOverlaysArr != null && object.sectorPredOverlaysArr.length > 0){
        for(var i = 0; i < object.sectorPredOverlaysArr.length; i++){
            object.map.removeOverlay(object.sectorPredOverlaysArr[i]);
        }
    }
    object.sectorPredOverlaysArr = []; //重置数据
}

/**
 * ********************************
 * @funcname IntelligentTuningMap.colorLegendProperties
 * @funcdesc 根据栅格类型gridTypeIndex获取图例文字区间的配置
 * @param {Number} gridTypeIndex 栅格类型 1-覆盖质量；2-过覆盖；3-重叠覆盖；4-mod3干扰；5-下行速率
 * @return {Object} properties 图例文字区间的配置
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuningMap.colorLegendProperties=function IntelligentTuningMap_colorLegendProperties(gridTypeIndex){
    //栅格类型 1-覆盖质量；2-过覆盖；3-重叠覆盖；4-mod3干扰；5-下行速率
    //AGPS-MR主接入场强(dBm)、AGPS-MR下行速率（Mbps）、AGPS-MR越区覆盖（%）、AGPS-MR重叠覆盖（%）、AGPS-MRMOD3干扰（%）；
    var properties={
        "level_0":"AGPS-MR 主接入场强(dBm)",
        "level_1":"优(-85,0)",
        "level_2":"良(-95,-85]",
        "level_3":"中(-105,-95]",
        "level_4":"差(-115,-105]",
        "level_5":"极差(-140,-115]",
        "level_6":"记录数≤3"

    };
    if(gridTypeIndex==2||gridTypeIndex==3||gridTypeIndex==4){
        var properties={
            "level_0":getGridType(gridTypeIndex),
            "level_1":"优[0,5%]",
            "level_2":"良(5%,15%]",
            "level_3":"中(15%,25%]",
            "level_4":"差(25%,35%]",
            "level_5":"极差(35%,+∞]",
            "level_6":"记录数≤3"
        };
    }else if(gridTypeIndex==5){
        var properties={
            "level_0":getGridType(gridTypeIndex),
            "level_1":"优[12,+∞)",
            "level_2":"良[8,12)",
            "level_3":"中[5,8)",
            "level_4":"差[2,5)",
            "level_5":"极差(-∞,2)",
            "level_6":"记录数≤3"
        };
    }
    return properties;
}
function getGridType(gridTypeIndex){
    var type="AGPS-MR 主接入场强(dBm)";
    if(gridTypeIndex==1){
        type="AGPS-MR 主接入场强(dBm)";
    }else if(gridTypeIndex==2){
        type="AGPS-MR 越区覆盖（%）";
    }else if(gridTypeIndex==3){
        type="AGPS-MR 重叠覆盖（%）";
    }else if(gridTypeIndex==4){
        type="AGPS-MR MOD3干扰（%）";
    }else if(gridTypeIndex==5){
        type="AGPS-MR 下行速率（Mbps）";
    }
    return type;

}

//根据点集合计算出最大最小经纬度进行返回
function getMaxAndMinLatLng(array){ //array是一组存放中百度地图的point对象的数组
    var resultArr = [];
    var maxLng = null;
    var maxLat = null;
    var minLng = null;
    var minLat = null;
    console.log(maxLng == null);
    if(array.length > 0){
        for(var i = 0; i < array.length; i++){
            if(maxLng == null){
                maxLng = array[i].lng;
            }
            if(maxLat == null){
                maxLat = array[i].lat;
            }
            if(minLat == null){
                minLat = array[i].lat;
            }
            if(minLng == null){
                minLng = array[i].lng;
            }
            if(maxLat <  array[i].lat){
                maxLat = array[i].lat;
            }
            if(maxLng < array[i].lng){
                maxLng = array[i].lng;
            }
            if(minLat > array[i].lat){
                minLat = array[i].lat;
            }
            if(minLng > array[i].lng){
                minLng = array[i].lng;
            }
        }
        resultArr = [maxLng , maxLat , minLng , minLat];
    }
    return resultArr;
}
//在不同的页面确定不同的栅格类型
function getNeedGridType(object){
    var gridTypeIndex=1;//默认是覆盖质量的类型栅格
    if(IntelligentTuning.backList.size() == 0 || IntelligentTuning.backList.get(IntelligentTuning.backList.lastIndex()).currentLocation == "list"){//在列表页以竖条为准
        gridTypeIndex=IntelligentTuningMap.getgridTypeIndex(IntelligentTuning.currentProblemName);
    }else{//在详情页以图例为准
        gridTypeIndex=object.gridTypeIndex;
    }
    return gridTypeIndex;
}






