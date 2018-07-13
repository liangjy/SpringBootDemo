/*新增四种场景类型的js代码*/

IntelligentRoadTest.showSenseData = function IntelligentRoadTest_showSenseData(result){
    IntelligentRoadTest.senseCurrentPage = 1;
    IntelligentRoadTest.senseTotalCount = result.length;
    var pageCount = result.length / IntelligentRoadTest.pageSize;
    if((result.length % IntelligentRoadTest.pageSize) != 0){
        IntelligentRoadTest.senseTotalPage = parseInt(pageCount) + 1 ; //总页数，没有整除时加上1
    }else{
        IntelligentRoadTest.senseTotalPage = pageCount;  //整除不用加1
    }

    if(IntelligentRoadTest.senseVM == null){
        IntelligentRoadTest.senseVM = new Vue({
            el : '#showSenseDiv',
            data : {
                senseList : IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.senseCurrentResult , IntelligentRoadTest.senseCurrentPage),
                totalPages : IntelligentRoadTest.senseTotalPage,
                totalCounts :  IntelligentRoadTest.senseTotalCount ,
                currentPageNum :  IntelligentRoadTest.senseCurrentPage,
                startIndex : IntelligentRoadTest.startIndex ,
                lastIndex : IntelligentRoadTest.lastIndex,
                isAuditor : concernAreaShare.isAuditor
            },
            methods : {
                showMessage : function (item , index){
                    IntelligentRoadTest.mkIndex=index;
                    IntelligentRoadTest.cacheItem=item;
                    //跳转到详情页
                    IntelligentRoadTest.goSenseCompleteMessage();
                    IntelligentRoadTest.removeEsbhPolyline();
                    if((item.alarm_id != null && item.alarm_id != '') || IntelligentRoadTest.isFromAlarmList == true){ //判断该对象是否需要展示工单监测指标
                        IntelligentRoadTest.isShowAlarmInfoMessage = true;
                    }/*else{
                        IntelligentRoadTest.isShowAlarmInfoMessage = false;
                    }*/
                    //增加查询工单指标的方法
                    if(IntelligentRoadTest.isShowAlarmInfoMessage == true){
                        var typeName = "";
                        if(IntelligentRoadTest.senseObject != null){
                            typeName = IntelligentRoadTest.senseObject.typeName; //获取对象查询派单信息的场景类型名称
                        }
                        IntelligentRoadTest.getSenseObjectAlarmInfoData(typeName ,item.esbh_id , IntelligentRoadTest.day , item.poor_coverage_set);
                    }
                    
                    var obj_type_string = IntelligentRoadTest.getObjTypeStringByTypeName(item);
                    
                    IntelligentRoadTest.showPolygon(item.gis_data,undefined,obj_type_string,item.esbh_id,IntelligentRoadTest.day,item.esbh_name);
                    IntelligentRoadTest.loadGrid(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
                    /*IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
                        [
                            {"key":"区域名称","val":item.esbh_name},
                            {"key":"区域编号","val":item.esbh_id},
                        ]
                    );*/

                    if(!IntelligentRoadTest.isScreenCompared&&IntelligentRoadTest.isAddMessageEvent){//不是在分屏页，并且点击过分屏
                        if(!windowScreeen.closed){//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
                            // windowScreeen.focus();
                            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item,'sense');
                        }
                    }

                    // $('#concernHandleDescribe').val(item.handle_description);
                    if(IntelligentRoadTest.mapClick){
                        IntelligentRoadTest.mapClick=false;
                    }else{
                    	if(item.audit_stat!='待审核'||item.audit_style=='删除'){
                    		var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
                            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
                    	}
                    }
                    // $("#colorBar").click();

                    var RecentCellImg = $("#showSenseCompleteMessage").find('.linkCell').children('img');
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
                    var echartTitle = "历史30天覆盖变化";

                    var typeNum = 11;
                    if(IntelligentRoadTest.senseObject != null){
                        typeNum = IntelligentRoadTest.senseObject.type ;
                    }
                    IntelligentRoadTest.getSense30DayLineData(typeNum , item.esbh_id , item.city);//加载30天的折线图

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
                    var nearPoorAreaList = []; //附近弱覆盖区域集合
                    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
                        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
                    }
                    if(item.day !=  null && item.day.toString().indexOf("-") < 0){ //转换日期格式
                        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
                    }
                    var poorAreaList = [] ;//弱覆盖区域集合
                    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
                        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
                    }
//                    IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList,1);
                    IntelligentRoadTest.polygonList=[];
                    IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList,2);

                    // 增加一个查询,获取图层的版本信息等
                    var obj_type = IntelligentRoadTest.getObjTypeNumByTypeName(item);
                    IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData(item,obj_type);
//                    var user_role = $('#user_role_List_string').val();

                    if(item.audit_style=='删除'&&item.audit_stat=='审核通过'){
                        $("#showSenseCompleteMessage").find('.systemLayerBottonLi').hide();
                        $("#showSenseCompleteMessage").find('.systemLayerDelete').hide();
                        $("#showSenseCompleteMessage").find('.systemLayerDeleteEnd').show();
                    }else{
                        if(IntelligentRoadTest.user_role.indexOf('审核员')<0){
                            $("#showSenseCompleteMessage").find('.systemLayerBottonLi').hide();
                            $("#showSenseCompleteMessage").find('.systemLayerDelete').hide();
                        }else{
                            $("#showSenseCompleteMessage").find('.systemLayerBottonLi').show();
                            $("#showSenseCompleteMessage").find('.systemLayerDelete').show();
                        }
                        $("#showSenseCompleteMessage").find('.systemLayerDeleteEnd').hide();
                    }

                    $(".linkCell").attr("title","显示连线");
                    $(".linkCell").removeClass("linkCellHover");
                    if(IntelligentRoadTest.senseCompleteVM == null){
                        IntelligentRoadTest.senseCompleteVM = new Vue({
                            el : '#showSenseCompleteMessage' ,
                            data : {
                                senseData : item ,
                                dataIndex : index ,
                                nrTop5Cell : nearTOP5,
                                mrTop5Cell : mrNearTOP5,
                                title : echartTitle,
                                isShowAlarmInfo : IntelligentRoadTest.isShowAlarmInfoMessage,
                                alarm_dataObj:{}, //用于存放从告警表中获取到的指标的对象
                                alaram_title:"工单监测",
                                uname : IntelligentRoadTest.currentUser ,
                                nearPoorAreaListData : nearPoorAreaList
                            },
                            methods : {
                                sensePosition : function(item){
                                    var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
                                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
                                },
                                viewSenseLog : function (item) {
                                    IntelligentRoadTest.senseLog(item);
                                },
                                showDetailInfo :function (event){
                                    IntelligentRoadTest.showDetailInfo(event);
                                },
                                showLinkCell :function (event,item,type){
                                    //type=1最近小区，type=2 接入扇区
                                    if($(event.currentTarget).hasClass("linkCellHover")){
                                        $(event.currentTarget).attr("title","显示连线");
                                        $(event.currentTarget).removeClass("linkCellHover");
                                        if(type==1){
                                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                                        }else if(type==2){
                                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                                        }
                                    }else{
                                        $(event.currentTarget).attr("title","隐藏连线");
                                        $(event.currentTarget).addClass("linkCellHover");
                                        var max_lng = item.longitude_max_baidu;
                                        var max_lat = item.latitude_max_baidu;
                                        var min_lng = item.longitude_min_baidu;
                                        var min_lat = item.latitude_min_baidu;
                                        var mid_lng = item.longitude_mid_baidu;
                                        var mid_lat = item.latitude_mid_baidu;
                                        var centerPoint = new BMap.Point(mid_lng,mid_lat);
                                        if(type==1){
                                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint,item.top5_sector_set);
                                        }else if(type==2){
                                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint,item.sector_set);
                                        }
                                    }
                                },
                                showLinkPoorArea :function (event,item,type){
                                    IntelligentRoadTest.showLinkPoorArea(event,item,type);
                                },
                                gotoShowSectorMessage : function (sectorDate){
                                    IntelligentRoadTest.clickType=1;
                                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid , sectorDate.cellid , IntelligentRoadTest.day);
                                },
                                gotoKPIList : function (item){
                                    if(item.sector_set != null){
                                        var sectorArr = item.sector_set.split("@");
                                        showOrHideInputImage(2);
                                        IntelligentRoadTest.loadKPIListData(sectorArr);
                                        $("#kpiBackPoor").html("返回上一级");
                                    }
                                },
                                editSystemLayer : function (item){
                                	var obj_type = IntelligentRoadTest.getObjTypeNumByTypeName(item);
                                    IntelligentRoadTest_SystemLayerEdit.editSystemLayer(item,obj_type);
                                },
                                resetSystemLayer : function (item,event){
                                	var obj_type = IntelligentRoadTest.getObjTypeNumByTypeName(item);
                                    IntelligentRoadTest_SystemLayerEdit.resetSystemLayer(item,obj_type,event);
                                },
                                saveSystemLayer : function (item){
                                	var obj_type = IntelligentRoadTest.getObjTypeNumByTypeName(item);
                                    IntelligentRoadTest_SystemLayerEdit.saveSystemLayer(item,obj_type);
                                },
                                commitSystemLayer : function (item){
                                	var obj_type = IntelligentRoadTest.getObjTypeNumByTypeName(item);
                                    IntelligentRoadTest_SystemLayerEdit.commitSystemLayer(item,obj_type);
                                },
                                recoverSystemLayer : function (item){
                                    IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer(item,obj_type);
                                },
                                deleteSystemLayer: function (item){
                                	var obj_type = IntelligentRoadTest.getObjTypeNumByTypeName(item);
                                    IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer(item,obj_type);
                                },
                                redrawSystemLayer: function (item,event){
                                	var obj_type = IntelligentRoadTest.getObjTypeNumByTypeName(item);
                                	IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer(item,obj_type,event);
                                },
                                cancelSystemLayer: function (item,event){
                                	var obj_type = IntelligentRoadTest.getObjTypeNumByTypeName(item);
                                	IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer(item,obj_type,event);
                                },
                                openScreenCompared:function(item){
                                    IntelligentRoadTestScreenCompared.openScreenCompared(item,"sense");
                                },
                                showPolygonGrid:function(item,event){
                                    IntelligentRoadTest.showHidePolygonGrid(item,event);
                                }
                            }
                        });
                    }else{
                        IntelligentRoadTest.senseCompleteVM.senseData = item;
                        IntelligentRoadTest.senseCompleteVM.dataIndex = index;
                        IntelligentRoadTest.senseCompleteVM.nrTop5Cell = nearTOP5;
                        IntelligentRoadTest.senseCompleteVM.mrTop5Cell = mrNearTOP5;
                        IntelligentRoadTest.senseCompleteVM.nearPoorAreaListData = nearPoorAreaList;
                        IntelligentRoadTest.senseCompleteVM.isShowAlarmInfo = IntelligentRoadTest.isShowAlarmInfoMessage;
                        // IntelligentRoadTest.senseCompleteVM.title = echartTitle;
                    }

                },
                lastOrNext : function (type) {
                    if(type == 0){
                        //上一页
                        if(IntelligentRoadTest.senseCurrentPage >  1){
                            IntelligentRoadTest.senseCurrentPage = IntelligentRoadTest.senseCurrentPage - 1;
                            IntelligentRoadTest.senseVM.senseList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.senseCurrentResult , IntelligentRoadTest.senseCurrentPage);
                            IntelligentRoadTest.senseVM.currentPageNum = IntelligentRoadTest.senseCurrentPage;
                            IntelligentRoadTest.senseVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.senseVM.lastIndex = IntelligentRoadTest.lastIndex;
                        }else{
                            alert("当前页是第一页");
                        }
                    }else{
                        if(IntelligentRoadTest.senseCurrentPage < IntelligentRoadTest.senseTotalPage){
                            IntelligentRoadTest.senseCurrentPage = IntelligentRoadTest.senseCurrentPage + 1;
                            IntelligentRoadTest.senseVM.senseList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.senseCurrentResult , IntelligentRoadTest.senseCurrentPage);
                            IntelligentRoadTest.senseVM.currentPageNum = IntelligentRoadTest.senseCurrentPage;
                            IntelligentRoadTest.senseVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.senseVM.lastIndex = IntelligentRoadTest.lastIndex;
                        }
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.senseVM.senseList,10);
                },
                gotoPage : function(){
                    var page = $("#sensePage").val();
                    page  = parseInt(page);
                    if(page > 0 && page <= IntelligentRoadTest.senseTotalPage){
                        IntelligentRoadTest.senseCurrentPage = page;
                        IntelligentRoadTest.senseVM.senseList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.senseCurrentResult , IntelligentRoadTest.senseCurrentPage);
                        IntelligentRoadTest.senseVM.currentPageNum =IntelligentRoadTest.senseCurrentPage;
                        IntelligentRoadTest.senseVM.startIndex = IntelligentRoadTest.startIndex;
                        IntelligentRoadTest.senseVM.lastIndex = IntelligentRoadTest.lastIndex;
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.senseVM.senseList,10);
                },
                goLast :function () {
                    IntelligentRoadTest.senseCurrentPage = IntelligentRoadTest.senseTotalPage;
                    IntelligentRoadTest.senseVM.senseList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.senseCurrentResult , IntelligentRoadTest.senseCurrentPage);
                    IntelligentRoadTest.senseVM.currentPageNum = IntelligentRoadTest.senseCurrentPage;
                    IntelligentRoadTest.senseVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.senseVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.senseVM.senseList,10);
                    $("#senseCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.senseTotalCount +"条数据)");
                },
                goFirst :function () {
                    IntelligentRoadTest.senseCurrentPage = 1;
                    IntelligentRoadTest.senseVM.senseList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.senseCurrentResult , IntelligentRoadTest.senseCurrentPage);
                    IntelligentRoadTest.senseVM.currentPageNum = IntelligentRoadTest.senseCurrentPage;
                    IntelligentRoadTest.senseVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.senseVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.senseVM.senseList,10);
                    $("#senseCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.senseTotalCount +"条数据)");
                },
                turnMk:function (index,item){
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
                            IntelligentRoadTest.openInfoWindow(lng,lat,item.esbh_name);
                        }
                        IntelligentRoadTest.addMk(lng,lat,img,i,color,item.esbh_name);
                        $("#showSenseDiv").find(".listUL > li").eq(i).find(".numSpan").css("background","url(../js/IntelligentRoadTest/images/bg_num.png)");
                        $("#showSenseDiv").find(".listUL > li").eq(i).css("background","#fff");
                    }
                    $("#showSenseDiv").find(".listUL > li").eq(index).find(".numSpan").css("background","url(../js/IntelligentRoadTest/images/maker2.png)");
                    $("#showSenseDiv").find(".listUL > li").eq(index).css("background","#f4f4f4");
                }
            }
        });
    }else{ //改变数值
        IntelligentRoadTest.senseVM.senseList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.senseCurrentResult , IntelligentRoadTest.senseCurrentPage);
        IntelligentRoadTest.senseVM.totalPages = IntelligentRoadTest.senseTotalPage;
        IntelligentRoadTest.senseVM.totalCounts =  IntelligentRoadTest.senseTotalCount ;
        IntelligentRoadTest.senseVM.currentPageNum =  IntelligentRoadTest.senseCurrentPage;
        IntelligentRoadTest.senseVM.startIndex = IntelligentRoadTest.startIndex ;
        IntelligentRoadTest.senseVM.lastIndex = IntelligentRoadTest.lastIndex;
        if(IntelligentRoadTest.index >= 20){
            IntelligentRoadTest.drawMk(IntelligentRoadTest.senseVM.senseList,IntelligentRoadTest.index);
        }
        if(!$("#showSenseCompleteMessage").is(":visible")){
            // $("#senseCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
            //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.senseTotalCount +"条数据)");
        }
    }
    if(IntelligentRoadTest.currentLocation == "sense"){
        IntelligentRoadTest.goSenseCompleteMessage();
    }
}

/*新增场景的类目点击时调用的用于检查是否查询的方法，为了复用代码*/
IntelligentRoadTest.doQuerySense = function(city){
    IntelligentRoadTest.showBaiduMap();//显示百度地图

    IntelligentRoadTest.goSenseList();
    $("#senseCityName").text(IntelligentRoadTest.city);
    IntelligentRoadTest.updateSearchTmpTxtByRowdiv();
    if(IntelligentRoadTest.senseCurrentSelectConditon == null || IntelligentRoadTest.senseCurrentSelectConditon == ""){
        showOrHideInputImage(2);
        IntelligentRoadTest.getSenseDataByObjectId(IntelligentRoadTest.senseObject.type , city , IntelligentRoadTest.day);
    }else{
        var currentSenseCity = $("#senseCityName").text().trim();
        var condition ="" + currentSenseCity + IntelligentRoadTest.day + IntelligentRoadTest.senseObject.type;
        if(condition == IntelligentRoadTest.senseCurrentSelectConditon){//无需重新查询数据
            console.log("无需重新查询数据");
            IntelligentRoadTest.isFilterSense = false;
            //
            if(IntelligentRoadTest.senseResult != null){ //因为可能会有延迟，这里需要加上一个判断
                IntelligentRoadTest.senseCurrentResult = IntelligentRoadTest.senseResult;
                IntelligentRoadTest.showSenseData(IntelligentRoadTest.senseResult);
                $("#senseSort ul li.selected").trigger("click");
            }

        }else{
            showOrHideInputImage(2);
            IntelligentRoadTest.senseVM.senseList = null;
            IntelligentRoadTest.getSenseDataByObjectId(IntelligentRoadTest.senseObject.type , currentSenseCity, IntelligentRoadTest.day);
        }
    }
    var timer = setInterval(function(){
        if(IntelligentRoadTest.senseVM != null && IntelligentRoadTest.senseVM.senseList != null){
            IntelligentRoadTest.drawMk(IntelligentRoadTest.senseVM.senseList,IntelligentRoadTest.senseObject.index);//
            clearInterval(timer);
            showOrHideInputImage(1);

            //搜索标题更新
            IntelligentRoadTest.searchTxtUpdate();
        }
    },500);
}

IntelligentRoadTest.getObjTypeNumByTypeName = function (item){
	var obj_type = 11;
    if(item.esbh_type=='中小学'){
    	obj_type = 11;
    }else if(item.esbh_type=='城中村'){
    	obj_type = 12;
    }else if(item.esbh_type=='自然村'){
    	obj_type = 13;
    }else if(item.esbh_type=='工厂'){
    	obj_type = 14;
    }
    return obj_type;
}


IntelligentRoadTest.getObjTypeStringByTypeName = function (item){
	var obj_type = '';
    if(item.esbh_type=='中小学'){
    	obj_type = 'school';
    }else if(item.esbh_type=='城中村'){
    	obj_type = 'cityVillage';
    }else if(item.esbh_type=='自然村'){
    	obj_type = 'village';
    }else if(item.esbh_type=='工厂'){
    	obj_type = 'factory';
    }
    return obj_type;
}


