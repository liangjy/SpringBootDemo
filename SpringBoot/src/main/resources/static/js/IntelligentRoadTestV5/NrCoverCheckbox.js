"use strict";
IntelligentRoadTest.nrCoverMaxZoom = 16;
IntelligentRoadTest.lastExcuteMapMoveendByZoomTimeout = null;
IntelligentRoadTest.lastExcuteMapMoveendZoom = 0;
IntelligentRoadTest.lastExcuteMapMoveendByCenterTimeout = null;
IntelligentRoadTest.lastExcuteMapMoveendByCenter = null;
IntelligentRoadTest.firstNrChange=true;
// IntelligentRoadTest.nrCover={"showNrCover":true,"currentNrCover":"4G"};//附近覆盖的缓存 放在initMap.js中定义了
$(function(){
    $("#showNrCheckbox").change( function() {
        if($(this).is(':checked')){
            let nrText = $('.NrText').text().trim();
            IntelligentRoadTest.currentNrCover=$(".NrUl li.selected").data("nrcover");
            //勾选上默认的图层配置
            IntelligentRoadTest.setNearCoverLayer();//勾选上对应扇区和栅格图层
            IntelligentRoadTest.excuteNrCover();//置为实景地图
            IntelligentRoadTest.showNrCover = true;
            IntelligentRoadTest.loadNrCoverData();//加载附近覆盖内容
            /*if(IntelligentRoadTest.map.getZoom() < IntelligentRoadTest.nrCoverMaxZoom){
                IntelligentRoadTest.maxlnglat_minlnglat = null;
                IntelligentRoadTest.polygonContour = null;
                IntelligentRoadTest.submitLayersData();
            }*/
        }else{
            IntelligentRoadTest.showNrCover = false;
            IntelligentRoadTest.currentNrCover=$(".NrUl li.selected").data("nrcover");
            //用户取消勾选；系统恢复最后一次记录的图层配置，并重新开始记录图层配置的修改；
            /*IntelligentRoadTestSystemLayerV3.fillLayerTabCon();*/
            //显示图例的Mod3,越区,重叠
            $(".hideCovCover").show();
            //取消勾选记录数<=3勾选
            $('.gridFieldSetInfo input[name="legend-grid"][id^="notCount"]').prop("checked", true);
            if(!IntelligentRoadTest.firstNrChange){//第一次触发不需要重置图层
                IntelligentRoadTest.cancelNrCover();//置为普通地图
                IntelligentRoadTestSystemLayerV3.fillLayerTabCon();//重置图层的顺序
                IntelligentRoadTestSystemLayerV3.resetSystemLayer(IntelligentRoadTestSystemLayerV3.systemLayerObj);//根据缓存勾选图层对应的选项
                IntelligentRoadTest.submitLayersData();
            }
        }
        IntelligentRoadTest.firstNrChange=false;
        IntelligentRoadTest.nrCover={"showNrCover":IntelligentRoadTest.showNrCover,"currentNrCover":IntelligentRoadTest.currentNrCover};//附近覆盖的缓存
        localStorage.setItem("nrCover",JSON.stringify(IntelligentRoadTest.nrCover));
    });

    $(".NrText,.NrDiv .triangle").click(function () {
        $(".NrUl").toggle();
    });
    $(".NrUl li").click(function () {
        let isChange = false;
        if($(this).text() != $(".NrText").text()){
            isChange = true;
        }
        $(".NrText").text($(this).text());
        $(this).addClass("selected").siblings().removeClass("selected");
        $(this).parent().hide();
        if(isChange){
            $('#showNrCheckbox').trigger("change");
        }else{
            IntelligentRoadTest.nrCover={"showNrCover":IntelligentRoadTest.showNrCover,"currentNrCover":$(this).data("nrcover")};//附近覆盖的缓存
            localStorage.setItem("nrCover",JSON.stringify(IntelligentRoadTest.nrCover));
        }

    });
    $('#showNrCheckbox').trigger("change");//页面出来的时候，要加载附近覆盖内容
})

IntelligentRoadTest.excuteNrCover = function () {
    //用户勾选后，地图类型设置为实景，比例尺设置为100米；
    let mapDiv = $(IntelligentRoadTest.map.getContainer())
    mapDiv.find('.BMapTypeControl ').each(function () {
        if($(this).text().trim() == '实景') {
            $(this).trigger("click");
        }
    });
    
    //IntelligentRoadTest.map.setZoom(IntelligentRoadTest.initMapZoom);

    //隐藏图例的Mod3,越区,重叠
    $(".hideCovCover").hide();
}

IntelligentRoadTest.cancelNrCover = function () {
    //用户取消勾选，地图类型设置为普通，比例尺保持当前设置，图层配置保持当前状态，直到用户再次改变设置
    let mapDiv = $(IntelligentRoadTest.map.getContainer())
    mapDiv.find('.BMapTypeControl').each(function () {
        if($(this).text().trim() == '地图'){
            $(this).trigger("click");
        }
    });
    IntelligentRoadTest.isShowGrid = false;
    if(IntelligentRoadTest.GridMap){
        IntelligentRoadTest.GridMap.clear();
    }
    $('#sector').attr('checked',false);
    if(IntelligentRoadTest.sectorCompent){
        // if(IntelligentRoadTest.cityPermission_common == '全省'){
        //     IntelligentRoadTest.sectorCompent.selectCity = ;
        // }else{
        //     IntelligentRoadTest.sectorCompent.selectCity = IntelligentRoadTest.cityPermission_common;
        // }

        if(IntelligentRoadTest.sectorCompent.progressbarTwoMultiple){
            IntelligentRoadTest.sectorCompent.progressbarTwoMultiple.cancelSqlAjax();
        }
        if(IntelligentRoadTest.sectorCompent.progressbarTwoMultipleTwo){
            IntelligentRoadTest.sectorCompent.progressbarTwoMultipleTwo.cancelSqlAjax();
        }

        IntelligentRoadTest.sectorCompent.selectCity = $('#topCitySelect .city-selected').text();
        // IntelligentRoadTest.sectorCompent.allDataFlagIsCompleted = true;
        IntelligentRoadTest.sectorCompent.useScopeQuery = false;//将一直局部查询去掉
        IntelligentRoadTest.sectorCompent.clear();
        IntelligentRoadTest.sectorCompent.queryConditionIschange = true;
        IntelligentRoadTest.sectorCompent.allDataFlagIsCompleted = false;
        IntelligentRoadTest.sectorCompent.isBackgroundQuerying = false;
    }
    IntelligentRoadTest.isShowSector = false;

    $('#sector2G').attr('checked',false);

    if(IntelligentRoadTest.sector2GCompent){
        // if(IntelligentRoadTest.cityPermission_common == '全省'){
        //     IntelligentRoadTest.sectorCompent.selectCity = ;
        // }else{
        //     IntelligentRoadTest.sectorCompent.selectCity = IntelligentRoadTest.cityPermission_common;
        // }
        if(IntelligentRoadTest.sector2GCompent.progressbarTwoMultiple){
            IntelligentRoadTest.sector2GCompent.progressbarTwoMultiple.cancelSqlAjax();
        }
        if(IntelligentRoadTest.sector2GCompent.progressbarTwoMultipleTwo){
            IntelligentRoadTest.sector2GCompent.progressbarTwoMultipleTwo.cancelSqlAjax();
        }
        IntelligentRoadTest.sector2GCompent.selectCity = $('#topCitySelect .city-selected').text();
        // IntelligentRoadTest.sectorCompent.allDataFlagIsCompleted = true;
        IntelligentRoadTest.sector2GCompent.useScopeQuery = false;//将一直局部查询去掉
        IntelligentRoadTest.sector2GCompent.clear();
        IntelligentRoadTest.sector2GCompent.queryConditionIschange = true;
        IntelligentRoadTest.sector2GCompent.allDataFlagIsCompleted = false;
        IntelligentRoadTest.sector2GCompent.isBackgroundQuerying = false;
    }
    IntelligentRoadTest.isShow2GSector = false;

    IntelligentRoadTest.legendGrid();

    if(IntelligentRoadTest.LayerMultiple){
        clearInterval(IntelligentRoadTest.LayerMultipleInterval);
        IntelligentRoadTest.LayerMultiple.cancelSqlAjax();
        $('#layerSubmitProgressDiv').hide();
        $('#layerSubmitProgressDiv .closeProgress').unbind("click");
        IntelligentRoadTest.LayerMultiple = null;
    }
}

IntelligentRoadTest.loadNrCoverData = function (isMoveMap) {
    //console.log('加载附近覆盖内容');
    if(IntelligentRoadTest.map.getZoom() < IntelligentRoadTest.nrCoverMaxZoom){
        if(isMoveMap == undefined){
            if (IntelligentRoadTest.isShowSceneArea && IntelligentRoadTest.SceneAreaCompent != null) {
                IntelligentRoadTest.SceneAreaCompent.clear();
                IntelligentRoadTest.isShowSceneArea = false;
            }

            if (IntelligentRoadTest.isShowPoorArea && IntelligentRoadTest.poorAreaCompent != null) {
                IntelligentRoadTest.poorAreaCompent.clear();

            }

            if (IntelligentRoadTest.isShowPoorArea && IntelligentRoadTest.poorCompent != null) {
                IntelligentRoadTest.poorCompent.clear();
            }
            if (IntelligentRoadTest.isShowPoorArea && IntelligentRoadTest.covSectorCompent != null) {
                IntelligentRoadTest.covSectorCompent.clear();
            }
            IntelligentRoadTest.isShowPoorArea = false;

            if (IntelligentRoadTestSystemLayerV3.isShowUserComplain && IntelligentRoadTestSystemLayerV3.userComplainCompent != null) {
                // console.log("重绘用户抱怨图层。。。。");
                IntelligentRoadTestSystemLayerV3.userComplainCompent.clear();
                IntelligentRoadTest.isShowUserComplain = false;
            }
        }
        return;
    }
    let mapBounds = IntelligentRoadTest.map.getBounds();
    let sw = mapBounds.getSouthWest()//返回矩形区域的西南角
    let ne = mapBounds.getNorthEast()//返回矩形区域的东北角
    //maxlng,minlng,maxlat,minlat
    IntelligentRoadTest.maxlnglat_minlnglat = [ne.lng, sw.lng, ne.lat, sw.lat];
    let gis_data = `${ne.lng},${ne.lat}@${ne.lng},${sw.lat}@${sw.lng},${sw.lat}@${sw.lng},${ne.lat}`;
    IntelligentRoadTest.polygonContour = gis_data
    if(isMoveMap){
        if(IntelligentRoadTest.currentNrCover=="4G"){
            IntelligentRoadTestSystemLayerV3.drawSector2GData(false);
            IntelligentRoadTestSystemLayerV3.drawSectorData(true);
        }else{
            IntelligentRoadTestSystemLayerV3.drawSectorData(false);
            IntelligentRoadTestSystemLayerV3.drawSector2GData(true);
        }
        IntelligentRoadTestSystemLayerV3.drawNrCoverGrid();
    }else{
        IntelligentRoadTest.submitLayersData();
    }
}

IntelligentRoadTest.setNearCoverLayer = function (){
    //1.取消所有图层配置的勾选选项
    $('.layerWrap input[name="layer"]:checkbox:not("#grid,#lineArea")').prop("checked", false);

    //2.勾选所有的扇区选项和移动站址图层
    var idSeletor='#sector';
    if(IntelligentRoadTest.currentNrCover=="2G"){
        idSeletor='#sector2G';
    }else{
        $("#yd_sector").prop("checked", true);
    }
    $(idSeletor).prop("checked", true);
    $(idSeletor).parents('tr').siblings().children().find('input:checkbox').prop("checked", true);
    $(idSeletor).parents('tr').siblings().children().find('input:checkbox').siblings('label').css("color","#3285FF");
    //3.4G勾选栅格图层的[覆盖质量,周粒度,全量MR综合,不分频段主接入];2G勾选栅格图层的[不分频段,EC/IO]
    if(IntelligentRoadTest.currentNrCover=="2G"){
        $('.gridFieldset2 #ecio-type').click();
    }else{
        $('.gridFieldset2 #fgzl-type').click();
        $('input#grid_week').click();
        $('input#all-mr').click();;//由于本地只有agps-mr的数据因此先使用agps数据，提交时需要改成全量mr综合
        //$('input#agps-mr').prop("checked", true);
        $("input#bf-band").click();
        $("input#zjr-grid").click();
    }
    $('#grid').parents('tr').siblings().children().find('input:checkbox:checked,input:radio:checked').siblings('label').css("color","#3285FF");
    //4.将线路图层进行隐藏，显示其它图层配置
    $('#sector').parents('table').siblings('table').show();
    $('#sector').parents('table').siblings('table').filter('.lineTable').hide();
    //5.默认勾选记录数<=3勾选
    $('.gridFieldSetInfo input[name="legend-grid"][id^="notCount"]').prop("checked", true);

    //将栅格的透明度设置为0.3
    $("#gridOpacity").val(0.3);
}

IntelligentRoadTest.jugeIsNeedExcuteMapMoveendByZoom = function () {
    if(IntelligentRoadTest.lastExcuteMapMoveendZoom == IntelligentRoadTest.map.getZoom()){
        //console.log("加载附近覆盖数据");
        //IntelligentRoadTest.loadNrCoverData();
        //console.log('jugeIsNeedLoadBoundsNrcoverData--',this);
        IntelligentRoadTest.mapMoveendInteval(this);
    }

}

IntelligentRoadTest.jugeIsNeedExcuteMapMoveendByCenter = function () {
    if(IntelligentRoadTest.lastExcuteMapMoveendByCenter){
        if(IntelligentRoadTest.lastExcuteMapMoveendByCenter.equals(IntelligentRoadTest.map.getCenter())){
            //console.log("加载附近覆盖数据");
            //IntelligentRoadTest.loadNrCoverData();
            //console.log('jugeIsNeedLoadBoundsNrcoverData--',this);
            IntelligentRoadTest.mapMoveendInteval(this);
        }
    }

}
