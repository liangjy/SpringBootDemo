/*
* 用于提取弱区、上行、下行低速率区域的公共代码，实现复用代码 （20180528 林楚佳）
* */


IntelligentRoadTest.showPoorAreaData = function IntelligentRoadTest_showPoorAreaData(result){
    IntelligentRoadTest.rfgCurrentPage = 1;
    IntelligentRoadTest.rfgTotalCount = result.length;
    var pageCount = result.length / IntelligentRoadTest.pageSize;
    if((result.length % IntelligentRoadTest.pageSize) != 0){
        IntelligentRoadTest.rfgTotalPage = parseInt(pageCount) + 1 ; //总页数，没有整除时加上1
    }else{
        IntelligentRoadTest.rfgTotalPage = pageCount;  //整除不用加1
    }
    var list = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.rfgCurrentResult , IntelligentRoadTest.rfgCurrentPage);
    //IntelligentRoadTest.drawMk(list);
    if( IntelligentRoadTest.rfgVM == null) {
        IntelligentRoadTest.rfgVM = new Vue({
            el : '#showPoorListDiv',
            data : {
                poorAreaList : list ,
                totalPages : IntelligentRoadTest.rfgTotalPage,
                totalCounts :  IntelligentRoadTest.rfgTotalCount ,
                currentPageNum :  IntelligentRoadTest.rfgCurrentPage,
                startIndex : IntelligentRoadTest.startIndex ,
                lastIndex : IntelligentRoadTest.lastIndex
            },
            methods : {
                showMessage : function (item,index){
                	var areaTypeString = IntelligentRoadTest.getAreaTypeByData(item);
                    IntelligentRoadTest.showPolygon(item.gis_data,undefined,areaTypeString,item.object_id,IntelligentRoadTest.day,'');
                    // IntelligentRoadTest.paCell={};
                    IntelligentRoadTest.mkIndex=index;
                    IntelligentRoadTest.cacheItem=item;
                    //获取弱栅格占比
                    IntelligentRoadTest.weakAreaGrid(item);
                    //跳转到弱区详情
                    IntelligentRoadTest.goPoorAreaCompleteMessage();
                    //获取天数
                    // IntelligentRoadTest.getByLatLot(item.longitude_mid_baidu,item.latitude_mid_baidu);
                    IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
                        [
                            {"key":"弱区编号","val":item.object_id},
                            {"key":"最近扇区","val":item.cell_name},
                        ]
                    );
                    if(IntelligentRoadTest.mapClick){
                        IntelligentRoadTest.mapClick=false;
                    }else{
                        if(!isNull(item.longitude_mid_baidu)&&!isNull(item.latitude_mid_baidu)){
                            var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
                            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
                        }
                    }
//                    IntelligentRoadTest.loadPoorAreaGrid(IntelligentRoadTest.day,item.city_id,item.country_id,item.object_id);
                    IntelligentRoadTest.loadGrid(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);

                    if(!IntelligentRoadTest.isScreenCompared&&IntelligentRoadTest.isAddMessageEvent){//不是在分屏页，并且点击过分屏
                        if(!windowScreeen.closed){//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
                            // windowScreeen.focus();
                            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item,'poor');
                        }
                    }

                    var RecentCellImg = $("#poorAreaCompleteMessage").find('.linkCell').children('img');
                    $(RecentCellImg).each(function(){
                        var srcText = $(this).attr('src');
                        var clickImg=srcText.replace("nor","click");
                        var norImg=srcText.replace("click","nor");
                        if(srcText==clickImg){
                            $(this).attr('src',norImg);
                        }
                    });
                    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();

                    var nearTOP5 = [];
                    if(item.top5_sector_set != null && item.top5_sector_set != ""){
                        var to5DataArr = item.top5_sector_set.split("@");
                        for(var i =  0 ; i < to5DataArr.length; i++){
                            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
                        }
                    }
                    var mrNearTOP5 = [];
                    if(item.sector_set != null && item.sector_set != ""){
                        var mrTo5DataArr = item.sector_set.split("@");
                        for(var k =  0 ; k < mrTo5DataArr.length; k++){
                            mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
                        }
                    }
                    if(IntelligentRoadTest.checkIfHasSameSector(nearTOP5 , mrNearTOP5)){
                        item.isHasSameSector = true;
                    }
                    if(item.day !=  null && item.day.toString().indexOf("-") < 0){ //转换日期格式
                        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
                    }
                    $(".linkCell").attr("title","显示连线");
                    $(".linkCell").removeClass("linkCellHover");

                    if(IntelligentRoadTest.rfgCompleteVM == null){
                        IntelligentRoadTest.rfgCompleteVM = new Vue({
                            el : '#poorAreaCompleteMessage' ,
                            data : {
                                poorAreaData : item ,
                                nrTop5Cell : nearTOP5 ,
                                mrNrTop5Cell : mrNearTOP5
                            },
                            methods : {
                                poorPosition :function (item){
                                    if(!isNull(item.longitude_mid_baidu)&&!isNull(item.latitude_mid_baidu)){
                                        var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
                                        IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
                                    }
                                },
                                showDetailInfo :function (event){
                                    IntelligentRoadTest.showDetailInfo(event);
                                },
                                showLinkCell :function (event,item,type){
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
                                        if(type==1){
                                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint,item.top5_sector_set);
                                        }else if(type==2){
                                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint,item.sector_set);
                                        }
                                    }
                                },
                                gotoAlarmList : function (item){
                                    if(item.sector_set != null){
                                        var sectorArr = item.sector_set.split("@");
                                        IntelligentRoadTest.loadAlarmListData(sectorArr);
                                        $("#alarmBackPoor").html("返回上一级");
                                    }
                                },
                                gotoKPIList : function (item){
                                    if(item.sector_set != null){
                                        var sectorArr = item.sector_set.split("@");
                                        showOrHideInputImage(2);
                                        IntelligentRoadTest.loadKPIListData(sectorArr);
                                        $("#kpiBackPoor").html("返回上一级");
                                    }
                                },
                                gotoShowSectorMessage : function (sectorDate){
                                    // console.log(sectorDate);
                                    IntelligentRoadTest.poorToSector = true; //作为是否从弱区详情页跳转到扇区详情页
                                    IntelligentRoadTest.clickType=1;
                                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid , sectorDate.cellid , IntelligentRoadTest.day);
                                },
                                gotoAlarmMessage : function (order_id){
                                    window.open('http://132.96.154.2/EOMS_FT/app/dwf/ftPub/osCheckFtDetail/osCheckFtDetail!getDetailPage.action?sCode=' + order_id);
                                },
                                saveToConcernArea :  function (poorAreaData) {
                                    IntelligentRoadTest.isPoorAreaSaveToConcern = true;
                                    IntelligentRoadTest.savePoorAreaToConcernArea(poorAreaData);
                                },showPolygonGrid:function(item,event){
                                    IntelligentRoadTest.showHidePolygonGrid(item,event);
                                }
                            }
                        });
                    }else{
                        IntelligentRoadTest.rfgCompleteVM.nrTop5Cell = nearTOP5;
                        IntelligentRoadTest.rfgCompleteVM.mrNrTop5Cell = mrNearTOP5;
                        IntelligentRoadTest.rfgCompleteVM.poorAreaData = item;
                    }
                },
                lastOrNext : function (type) {
                    if(type == 0){
                        //上一页
                        if(IntelligentRoadTest.rfgCurrentPage >  1){
                            IntelligentRoadTest.rfgCurrentPage = IntelligentRoadTest.rfgCurrentPage - 1;
                            IntelligentRoadTest.rfgVM.poorAreaList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.rfgCurrentResult , IntelligentRoadTest.rfgCurrentPage);
                            IntelligentRoadTest.rfgVM.currentPageNum = IntelligentRoadTest.rfgCurrentPage;
                            IntelligentRoadTest.rfgVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.rfgVM.lastIndex = IntelligentRoadTest.lastIndex;
                        }else{
                            alert("当前页是第一页");
                        }
                    }else{
                        if(IntelligentRoadTest.rfgCurrentPage < IntelligentRoadTest.rfgTotalPage){
                            IntelligentRoadTest.rfgCurrentPage = IntelligentRoadTest.rfgCurrentPage + 1;
                            IntelligentRoadTest.rfgVM.poorAreaList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.rfgCurrentResult , IntelligentRoadTest.rfgCurrentPage);
                            IntelligentRoadTest.rfgVM.currentPageNum = IntelligentRoadTest.rfgCurrentPage;
                            IntelligentRoadTest.rfgVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.rfgVM.lastIndex = IntelligentRoadTest.lastIndex;
                        }
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.rfgVM.poorAreaList);
                    // $("#poorAreaCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
                    //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.rfgTotalCount +"条数据)");
                },
                gotoPage : function(){
                    var page = $("#rfgPage").val();
                    page  = parseInt(page);
                    if(page > 0 && page <= IntelligentRoadTest.rfgTotalPage){
                        IntelligentRoadTest.rfgCurrentPage = page;
                        IntelligentRoadTest.rfgVM.poorAreaList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.rfgCurrentResult , IntelligentRoadTest.rfgCurrentPage);
                        IntelligentRoadTest.rfgVM.currentPageNum =IntelligentRoadTest.rfgCurrentPage;
                        IntelligentRoadTest.rfgVM.startIndex = IntelligentRoadTest.startIndex;
                        IntelligentRoadTest.rfgVM.lastIndex = IntelligentRoadTest.lastIndex;
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.rfgVM.poorAreaList);
                    // $("#poorAreaCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
                    //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.rfgTotalCount +"条数据)");
                },
                goLast :function () {
                    IntelligentRoadTest.rfgCurrentPage = IntelligentRoadTest.rfgTotalPage;
                    IntelligentRoadTest.rfgVM.poorAreaList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.rfgCurrentResult , IntelligentRoadTest.rfgCurrentPage);
                    IntelligentRoadTest.rfgVM.currentPageNum = IntelligentRoadTest.rfgCurrentPage;
                    IntelligentRoadTest.rfgVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.rfgVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.rfgVM.poorAreaList);
                    // $("#poorAreaCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
                    //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.rfgTotalCount +"条数据)");
                },
                goFirst :function () {
                    IntelligentRoadTest.rfgCurrentPage = 1;
                    IntelligentRoadTest.rfgVM.poorAreaList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.rfgCurrentResult , IntelligentRoadTest.rfgCurrentPage);
                    IntelligentRoadTest.rfgVM.currentPageNum = IntelligentRoadTest.rfgCurrentPage;
                    IntelligentRoadTest.rfgVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.rfgVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.rfgVM.poorAreaList);
                    // $("#poorAreaCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
                    //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.rfgTotalCount +"条数据)");
                },
                turnMk:function (index,item){
                    for(var i=0;i<IntelligentRoadTest.markerList.length;i++){
                        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.markerList[i]);
                    }

                    for(var i=0;i<IntelligentRoadTest.lngArr.length;i++){
                        var lng=IntelligentRoadTest.lngArr[i];
                        var lat=IntelligentRoadTest.latArr[i];
                        var color="#fff"
                        var img="../js/IntelligentRoadTest/images/markeRq.png";
                        if(i==index){
                            img="../js/IntelligentRoadTest/images/maker2.png";
                            color="black";
                            IntelligentRoadTest.openInfoWindow(lng,lat,item.object_id);
                        }
                        IntelligentRoadTest.addMk(lng,lat,img,i,color,item.object_id);
                        $("#showPoorListDiv").find(".listUL > li").eq(i).find(".numSpan2").css("background","url(../js/IntelligentRoadTest/images/markeRq.png)");
                        $("#showPoorListDiv").find(".listUL > li").eq(i).css("background","#fff");
                    }

                    $("#showPoorListDiv").find(".listUL > li").eq(index).find(".numSpan2").css("background","url(../js/IntelligentRoadTest/images/maker2.png)");
                    $("#showPoorListDiv").find(".listUL > li").eq(index).css("background","#f4f4f4");
                },
                showSelectInfo : function (event) {
                    // IntelligentRoadTest.showSelectInfo();
                }
            }
        });
    }else{
        IntelligentRoadTest.rfgVM.poorAreaList = list ;
        IntelligentRoadTest.rfgVM.totalPages = IntelligentRoadTest.rfgTotalPage;
        IntelligentRoadTest.rfgVM.totalCounts =  IntelligentRoadTest.rfgTotalCount ;
        IntelligentRoadTest.rfgVM.currentPageNum =  IntelligentRoadTest.rfgCurrentPage;
        IntelligentRoadTest.rfgVM.startIndex = IntelligentRoadTest.startIndex ;
        IntelligentRoadTest.rfgVM.lastIndex = IntelligentRoadTest.lastIndex;
        if(IntelligentRoadTest.index==0){
            if(IntelligentRoadTest.currentLocation==""||IntelligentRoadTest.currentLocation==null){
                IntelligentRoadTest.drawMk(IntelligentRoadTest.rfgVM.poorAreaList);
            }
        }
        // $("#poorAreaCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
        //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.rfgTotalCount +"条数据)");
    }

    if(IntelligentRoadTest.currentLocation == "poorArea"){
        IntelligentRoadTest.goPoorAreaCompleteMessage();
    }
    showOrHideInputImage(1);
}

IntelligentRoadTest.loadmktCenterAreaTableData = function IntelligentRoadTest_loadmktCenterAreaTableData(city,country,mktcenter,day,do_type ,mktcenter_id , mktcenter_name) {
    //缓存的查询参数  如果参数一样则不进行查询
    /*if ($('#areaTable .scrollDiv').height() == 0 || $('#areaTable .scrollDiv').width() == 0) {
    } else if (IntelligentRoadTest.parameter_3 == (city + country + mktcenter + day + do_type + IntelligentRoadTest.object_id)) {
        return;
    }*/
//	$(".tableDiv").eq(0).show();
//     IntelligentRoadTest.parameter_3 = city + country + mktcenter + day + do_type + IntelligentRoadTest.object_id;
    var sqlList = [];
    if (do_type == null || do_type == undefined || do_type == 0) {
        do_type = "";
    } else {
        do_type = "and DO_TYPE=" + do_type;
    }
    var countryCondition = "";
    if(country != null && country != 'null'){
        countryCondition = " AND COUNTRY = '" + country + "'" ;
    }
    var list = ["IntelligentRoadTestV2_09_areaTable", "DAY:" + day, "CITY:" + city, "COUNTRY:" + countryCondition, "DO_TYPE:" + do_type];
    if (mktcenter_name == null || mktcenter_name == '' || mktcenter_name == undefined || mktcenter_name == 'null') {
        var mktcenter = $("#poorAreaMktName").text().trim();
        if(mktcenter != "" && mktcenter != "全区"){
            list.push("MKTCENTER_ID:" + "and MKTCENTER = '" + mktcenter + "'");
            mktcenter_name = mktcenter;
        }
    } else {
        list.push("MKTCENTER_ID:" + "and MKTCENTER = '" + mktcenter_name + "'");
    }
    IntelligentRoadTest.poorAreaCountry_id = country;
    IntelligentRoadTest.poorAreaMktCenter_id = mktcenter_name;
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealmktCenterAreaTableData];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database);
    //记录查询信息
    IntelligentRoadTest.rfgCurrentSelectConditon ="" +  day +  city + country;

}
