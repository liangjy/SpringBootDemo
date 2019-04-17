var IntelligentGoToPage = {};
IntelligentRoadTest.isFirstGotoNew = false;//是否是页面跳转查看新增系统图层
IntelligentGoToPage.gotoPoorPage = function IntelligentGoToPage_gotoPoorPage(IntelligentRoadTest){
    var day = noceUtil.GetQueryString("day");
    var city = noceUtil.GetQueryString("city");
    var country = noceUtil.GetQueryString("country");
    var mktcenter = noceUtil.GetQueryString("mktcenter");
    var object_id = noceUtil.GetQueryString("object_id");
    var object_type = noceUtil.GetQueryString("object_type");
    var road_id = noceUtil.GetQueryString("road_id");
    var screen = noceUtil.GetQueryString("screen");
    var obj_isNew = noceUtil.GetQueryString("isNew");
    var isAudit = noceUtil.GetQueryString("isAudit");
    var isHide = noceUtil.GetQueryString("isHide"); //是否隐藏导航栏和title

    /*规划站点跳转过来的时候*/
    var lastPage = noceUtil.GetQueryString("lastPage"); //判断是否从规划站点过来的字段
    var lng = noceUtil.GetQueryString("lng"); //经度
    var lat = noceUtil.GetQueryString("lat"); //纬度
    let maxTime = pageMaxTime().replace(/\-/g, "");
    //跳转过来时,如果传入的时间比最大时间大,则按照最大时间进行初始化
    if(parseInt(maxTime) < parseInt(day)){
        console.log('传入的日期比获取的最大日期大....','传入日期:'+day,'最大日期:'+maxTime)
        day = maxTime;
    }
    if(lastPage != null && lastPage != "" && lng != null && lng != "" && lat != null && lat != "" && day != null && day != ""){
        IntelligentRoadTest.lastPage = lastPage; //保存在全局变量中，在后面可以做判断
        IntelligentRoadTest.sitePlanLng = lng;
        IntelligentRoadTest.sitePlanLat = lat;
        IntelligentRoadTest.day = day;

        //勾中扇区图层
        $('#sector').parents('table').find('input:checkbox').prop("checked",true);
        $('#sector').parents('tr').siblings().find('input:checkbox').siblings('label').css("color","#3285FF");

        if($("#poorArea").attr("checked") != "checked"){
            $("#poorArea").trigger('click'); //勾中专题图层
        }

        if($("#poor").attr("checked") != "checked"){
            $("#poor").trigger('click'); //勾中弱区图层
        }
        setTimeout(function(){
            var arr = GPSUtil.gps84_To_bd09( parseFloat(lat) , parseFloat(lng)); //返回的是纬度在前经度在后的数组
            IntelligentRoadTest.map.setCenter(new BMap.Point(arr[1] , arr[0]));
            IntelligentRoadTest.map.setZoom(18);
            IntelligentRoadTest.map.addOverlay(new BMap.Marker(new BMap.Point(arr[1] , arr[0])));
            IntelligentRoadTest.submitLayersData();//初始化图层 //这里只有在从规划站点跳转过来的时候才会执行，其他情况不会执行
        },1500);

        return ;
    }
    /*规划站点跳转过来的时候*/

    if(isHide == "1" || isHide == 1){
        //触发左下角的三个按钮，将边栏隐藏掉
        $("#leftIcon").trigger('click');
        $("#topHeader").trigger('click');
        $("#downFooter").trigger('click');
    }
    if(day != null && city != null && country != null && mktcenter != null && object_id != null&&obj_isNew==null) {
        IntelligentRoadTest.objIdTmp = object_id;
        IntelligentRoadTest.city = city;
        IntelligentRoadTest.district = country;
        IntelligentRoadTest.day = day;

        $('#seachTime').text(day);
        var startTime  = new Date(dealDateString(day).getTime() - 6 * 24 * 60 * 60 * 1000 ).Format("yyyyMMdd");
        $('#weekStartTime').text(startTime);
        IntelligentRoadTest.day = $('#seachTime').text();

        $("#searchText").val(object_id);
        if (object_type == null) {
            var poorAreaType = noceUtil.GetQueryString("poorAreaType"); //用于判断是否是专题区域
            if(poorAreaType != null || poorAreaType != ""){
                if(poorAreaType == "m3PoorArea"){
                    IntelligentRoadTest.poorAreaObj = IntelligentRoadTest.m3PoorArea;
                }else if(poorAreaType == "cbPoorArea"){
                    IntelligentRoadTest.poorAreaObj = IntelligentRoadTest.cbPoorArea;
                }else if(poorAreaType == "olPoorArea"){
                    IntelligentRoadTest.poorAreaObj = IntelligentRoadTest.olPoorArea;
                }else if(poorAreaType == "dwPoorArea"){
                    IntelligentRoadTest.poorAreaObj = IntelligentRoadTest.dwPoorArea;
                }else if(poorAreaType == "upPoorArea"){
                    IntelligentRoadTest.poorAreaObj = IntelligentRoadTest.upPoorArea;
                }else{
                    IntelligentRoadTest.poorAreaObj = IntelligentRoadTest.poorArea;
                }
            }else{ //默认使用普通弱区类型
                IntelligentRoadTest.poorAreaObj = IntelligentRoadTest.poorArea;
            }
            IntelligentRoadTest.searchSenceTxtTmp = " 弱区";
            $("#poorAreaCityName").text(IntelligentRoadTest.city);
            $("#poorAreaDistrictName").text(IntelligentRoadTest.district);
            var city = $("#poorAreaCityName").text();
            var district = $("#poorAreaDistrictName").text();
            // IntelligentRoadTest.poorAreaObj = IntelligentRoadTest.poorArea;
            IntelligentRoadTest.goPoorAreaList();
            // $("#poorAreaCount").hide();
            IntelligentRoadTest.updateSearchTmpTxtByRowdiv();
            if (IntelligentRoadTest.rfgCurrentSelectConditon == "") {
                showOrHideInputImage(2);
                IntelligentRoadTest.loadmktCenterAreaTableData(IntelligentRoadTest.city, IntelligentRoadTest.district, null, IntelligentRoadTest.day, null);
            } else {
                var condition = "" + IntelligentRoadTest.day + city + district;
                if (condition == IntelligentRoadTest.rfgCurrentSelectConditon) {//无需重新查询数据
                    console.log("无需重新查询数据");
                } else {
                    showOrHideInputImage(2);
                    if(IntelligentRoadTest.rfgVM == null){
                        IntelligentRoadTest.showPoorAreaData([]);
                    }
                    IntelligentRoadTest.rfgVM.poorAreaList = null;//重置
                    IntelligentRoadTest.loadmktCenterAreaTableData(IntelligentRoadTest.city, IntelligentRoadTest.district, null, IntelligentRoadTest.day, null);
                }
            }
            var timer = setInterval(function () {
                if (IntelligentRoadTest.rfgVM != null && IntelligentRoadTest.rfgVM.poorAreaList != null) {
                    // $("#poorAreaCount").html("返回上一级(" + $("#poorAreaCountMessage").text() + ")");
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.rfgVM.poorAreaList);
                    clearInterval(timer);
                    showOrHideInputImage(1);
                    IntelligentRoadTest.updateSearchTmpTxt();
                }
            }, 500);

            var sqlList = [];
            var para = [];
            if(screen=='true'||screen==true){
            	para.push(true);
            }
            var city = $('#poorAreaCityName').text().trim();
            var list = ["IntelligentRoadTestV2_getPoorAreaByCondition", "DAY:" + IntelligentRoadTest.day, "CITY:" + city,"TYPE:"+ IntelligentRoadTest.poorAreaObj.type];
            var condition = "";
            var selectCondition = IntelligentRoadTest.dealSelectConditionString(object_id);
            condition = "and object_id like '%" + selectCondition + "%'";
            list.push("CONDITION:" + condition);
            sqlList.push(list);
            var funcList = [IntelligentRoadTest.dealPoorAreaMessageByCondition2];
            var database = [3];
            progressbarTwo.submitSql(sqlList, funcList, database,para);
        } else if (object_type == "高速") {
            IntelligentRoadTest.showOsmMap();//显示osm地图
            // var cityCenterPoint = OSMapUtil.getCityLocation(IntelligentRoadTest.city);
            // IntelligentRoadTest.OsmMap.setView(cityCenterPoint, 11);

            if (IntelligentRoadTest.geoJsonLayer) {
                IntelligentRoadTest.geoJsonLayer.clearLayers();
            }

            if (IntelligentRoadTest.splitLineGeoJsonLayer) {
                IntelligentRoadTest.splitLineGeoJsonLayer.clearLayers();
            }
            if (IntelligentRoadTest.ContinueLineGeoJsonLayer) {
                IntelligentRoadTest.ContinueLineGeoJsonLayer.clearLayers();
            }

            IntelligentRoadTest.searchSenceTxtTmp = " 高速";
            IntelligentRoadTest.index = 7;
            IntelligentRoadTest.senseName = 'highway';
//          只显示扇区图层和线段图层选项
            $('#sector').parents('table').siblings('table').hide();
            $('#sector').parents('table').siblings('table').filter('.lineTable').show();
            // var highwayData = IntelligentRoadTest.highwayCompleteVM.highwayData;
            // IntelligentRoadTest.highwayVM = {};
            // IntelligentRoadTest.highwayVM.type = false ;
            // setTimeout(()=>{
            //     IntelligentRoadTest.getRoadCompleteMessageByLineID(IntelligentRoadTest.objIdTmp ,IntelligentRoadTest.day , 1 ,
            //         IntelligentRoadTest.city , null , false);
            //
            //     var city_id = noceUtil.city_LATN_ID[city];
            //
            //     // IntelligentRoadTest.loadSplitLineSmallLine(road_id ,object_id, city_id , day ,1);
            //
            // },200)





        } else if (object_type == "高铁") {
        	IntelligentRoadTest.showOsmMap();//显示osm地图
            if (IntelligentRoadTest.geoJsonLayer) {
                IntelligentRoadTest.geoJsonLayer.clearLayers();
            }
            if (IntelligentRoadTest.splitLineGeoJsonLayer) {
                IntelligentRoadTest.splitLineGeoJsonLayer.clearLayers();
            }
            if (IntelligentRoadTest.ContinueLineGeoJsonLayer) {
                IntelligentRoadTest.ContinueLineGeoJsonLayer.clearLayers();
            }
            IntelligentRoadTest.senseName = 'rail';
            IntelligentRoadTest.searchSenceTxtTmp = " 高铁";
            IntelligentRoadTest.index = 8;
//          只显示扇区图层和线段图层选项
            $('#sector').parents('table').siblings('table').hide();
            $('#sector').parents('table').siblings('table').filter('.lineTable').show();
//            IntelligentRoadTest.goRailFirstList();
//            if (IntelligentRoadTest.railCurrentSelectConditon == "") {
//                showOrHideInputImage(2);
//                IntelligentRoadTest.getRoadFirstListData(IntelligentRoadTest.city, IntelligentRoadTest.day,
//                    2, false); //加载高铁第一层列表
//            } else {
//                var currentRailCity = IntelligentRoadTest.city;
//                var condition = "" + currentRailCity + IntelligentRoadTest.day;
//                if (condition == IntelligentRoadTest.railCurrentSelectConditon) {//无需重新查询数据
//                    console.log("无需重新查询数据");
//                } else {
//                    showOrHideInputImage(2);
//                    IntelligentRoadTest.railVM.railList = null;
//                    IntelligentRoadTest.getRoadFirstListData(currentRailCity, IntelligentRoadTest.day,
//                        2, IntelligentRoadTest.railVM.type); //加载高铁第一层列表
//                }
//            }
//            $("#railCityName").text(IntelligentRoadTest.city);
//            IntelligentRoadTest.updateSearchTmpTxtByRowdiv();
//            var timer = setInterval(function () {
//                if (IntelligentRoadTest.railVM != null && IntelligentRoadTest.railVM.railList != null) {
//                    clearInterval(timer);
//                    showOrHideInputImage(1);
//
//                    //搜索标题更新
//                    IntelligentRoadTest.searchTxtUpdate();
//                }
//            }, 500);
//            var cityCenterPoint = OSMapUtil.getCityLocation(IntelligentRoadTest.city);
//            IntelligentRoadTest.OsmMap.panTo(cityCenterPoint);

            // IntelligentRoadTest.loadLineByLevelFromBounds();
//            IntelligentRoadTest.loadAllLineByLevel("广州",2,1000);//
        } else if (object_type == "市政路") {
        	IntelligentRoadTest.showOsmMap();//显示osm地图
            if (IntelligentRoadTest.geoJsonLayer) {
                IntelligentRoadTest.geoJsonLayer.clearLayers();
            }
            if (IntelligentRoadTest.splitLineGeoJsonLayer) {
                IntelligentRoadTest.splitLineGeoJsonLayer.clearLayers();
            }
            if (IntelligentRoadTest.ContinueLineGeoJsonLayer) {
                IntelligentRoadTest.ContinueLineGeoJsonLayer.clearLayers();
            }
            IntelligentRoadTest.senseName = 'cityRoad';
            IntelligentRoadTest.searchSenceTxtTmp = " 市政路";
            IntelligentRoadTest.index = 14;
//            只显示扇区图层和线段图层选项
            $('#sector').parents('table').siblings('table').hide();
            $('#sector').parents('table').siblings('table').filter('.lineTable').show();
//            IntelligentRoadTest.goCityRoadFirstList();
//            if (IntelligentRoadTest.cityRoadCurrentSelectConditon == "") {
//                showOrHideInputImage(2);
//                IntelligentRoadTest.getRoadFirstListData(IntelligentRoadTest.city, IntelligentRoadTest.day,
//                    3, false); //加载市政路第一层列表
//            } else {
//                var currentCityRoadCity = IntelligentRoadTest.city;
//                var condition = "" + currentCityRoadCity + IntelligentRoadTest.day;
//                if (condition == IntelligentRoadTest.cityRoadCurrentSelectConditon) {//无需重新查询数据
//                    console.log("无需重新查询数据");
//                } else {
//                    showOrHideInputImage(2);
//                    IntelligentRoadTest.cityRoadVM.cityRoadList = null;
//                    IntelligentRoadTest.getRoadFirstListData(currentCityRoadCity, IntelligentRoadTest.day,
//                        3, IntelligentRoadTest.cityRoadVM.type); //加载市政路第一层列表
//                }
//            }
//            $("#cityRoadCityName").text(IntelligentRoadTest.city);
//            IntelligentRoadTest.updateSearchTmpTxtByRowdiv();
//            var timer = setInterval(function () {
//                if (IntelligentRoadTest.cityRoadVM != null && IntelligentRoadTest.cityRoadVM.cityRoadList != null) {
//                    clearInterval(timer);
//                    showOrHideInputImage(1);
//
//                    //搜索标题更新
//                    IntelligentRoadTest.searchTxtUpdate();
//                }
//            }, 500);
//            
//            var cityCenterPoint = OSMapUtil.getCityLocation(IntelligentRoadTest.city);
//            IntelligentRoadTest.OsmMap.panTo(cityCenterPoint);
            // IntelligentRoadTest.loadLineByLevelFromBounds();
//            IntelligentRoadTest.loadAllLineByLevel("广州",3,1000);//

        } else if (object_type == "地铁") {//地铁
            IntelligentRoadTest.searchSenceTxtTmp = " 地铁";
            IntelligentRoadTest.index = 15;
            IntelligentRoadTest.senseName = 'metro';
            // IntelligentRoadTest.goMetroFirstList();
            IntelligentRoadTest.showBaiduMap();//显示百度地图

            var metro_id = object_id.split(",");
            if(screen=='true'||screen==true){
        	   $("#searchText").val(metro_id[0]);
                IntelligentRoadTest.metroIndex = 3;
        	}
            if (IntelligentRoadTest.metroCurrentSelectConditon == "") {
                showOrHideInputImage(2);
                IntelligentRoadTest.getMetroStationsData(IntelligentRoadTest.city, IntelligentRoadTest.day,true);
                IntelligentRoadTest.getMetroFirstListData(IntelligentRoadTest.city, IntelligentRoadTest.day);
                //补充一个地铁详情页查询
                var from_id = metro_id[1];
                var to_id = metro_id[2];
                var metroItem = {
                    "line_id":metro_id[0],
                    "from_station_id":from_id,
                    "to_station_id":to_id,
                };
                if(screen=='true'||screen==true){
                    var metroTimer = setInterval(function () {
                        if(IntelligentRoadTest.allMetroDataObj){
                            if (IntelligentRoadTest.allMetroDataObj["2"][metro_id[0]]) {
                                clearInterval(metroTimer);
                                // IntelligentRoadTest.metroClick(metroItem, 2,2);
                                IntelligentRoadTest.getMetroStationDataByID(from_id ,to_id , IntelligentRoadTest.day,noceUtil.city_LATN_ID[IntelligentRoadTest.city]);
                            }
                        }
                    }, 500);
/*
                    var metroListTimer = setInterval(function () {
                        if(IntelligentRoadTest.metroVM){
                            var metroListFirstData = null;
                            for(var i=0;i<IntelligentRoadTest.metroFirstListResult.length;i++){
                                if(IntelligentRoadTest.metroFirstListResult[i].line_id == metro_id[0]){
                                    metroListFirstData = IntelligentRoadTest.metroFirstListResult[i];
                                }
                            }
                            if(metroListFirstData != null){
                                // clearInterval(metroListTimer);
                                IntelligentRoadTest.metroVM.goNextList(metroListFirstData);
                                if(IntelligentRoadTest.metroSecondListResult){
                                    IntelligentRoadTest.showMetroSecondList(IntelligentRoadTest.metroSecondListResult);
                                    var inToMessage = false;
                                    for(var i=0;i<IntelligentRoadTest.metroSecondListResult.length;i++){
                                        if(IntelligentRoadTest.metroSecondListResult[i].mr_flag==2){
                                            if(IntelligentRoadTest.metroSecondListResult[i].line_id == metro_id[0]
                                            && IntelligentRoadTest.metroSecondListResult[i].from_station_id == from_id
                                                && IntelligentRoadTest.metroSecondListResult[i].to_station_id == to_id){
                                                IntelligentRoadTest.metroSecondVM.showMessage(IntelligentRoadTest.metroSecondListResult[i]);
                                                inToMessage = true;
                                            }
                                        }
                                    }
                                    if(inToMessage == false){
                                        IntelligentRoadTest.metroSecondVM.showMessage({});
                                    }
                                    clearInterval(metroListTimer);
                                }
                            }

                        }
                    }, 500);*/


                }

            } else {
                var currentMetroCity = IntelligentRoadTest.city;
                var condition = "" + currentMetroCity + IntelligentRoadTest.day;
                if (condition == IntelligentRoadTest.metroCurrentSelectConditon) {//无需重新查询数据
                    console.log("无需重新查询数据");
                    IntelligentRoadTest.dealMetroStationsData(IntelligentRoadTest.metroData); //将缓存中的地铁线路的线路展示出来
                } else {
                    showOrHideInputImage(2);
                    if(IntelligentRoadTest.metroVM == null){
                        IntelligentRoadTest.showMetroFirstList([]);
                    }
                    IntelligentRoadTest.metroVM.metroList = null;
                    IntelligentRoadTest.getMetroStationsData(currentMetroCity, IntelligentRoadTest.day);
                    IntelligentRoadTest.getMetroFirstListData(IntelligentRoadTest.city, IntelligentRoadTest.day);
                }
            }
            $("#metroCityName").text(IntelligentRoadTest.city);
            IntelligentRoadTest.updateSearchTmpTxtByRowdiv();
            var timer = setInterval(function () {
                if (IntelligentRoadTest.metroVM != null && IntelligentRoadTest.metroVM.metroList != null) {
                    clearInterval(timer);
                    showOrHideInputImage(1);
                    //搜索标题更新
                    IntelligentRoadTest.searchTxtUpdate();
//            		只显示扇区图层和线段图层选项
                    $('#sector').parents('table').siblings('table').hide();
                    $('#sector').parents('table').siblings('table').filter('.lineTable').show();
                }
            }, 500);

        } else if (object_type == "高校") {
            IntelligentRoadTest.searchSenceTxtTmp = " 高校";
            IntelligentRoadTest.index = 10;
            IntelligentRoadTest.senseName = "college";
            IntelligentRoadTest.showBaiduMap();//显示百度地图

            // IntelligentRoadTest.goCollegeList();
            $("#collegeCityName").text(IntelligentRoadTest.city);
            IntelligentRoadTest.updateSearchTmpTxtByRowdiv();
            if (IntelligentRoadTest.collegeCurrentSelectConditon == "") {
                showOrHideInputImage(2);
                IntelligentRoadTest.getSenseDataByObjectId(1, city, IntelligentRoadTest.day);
            } else {
                var currentCollegeCity = $("#collegeCityName").text().trim();
                var condition = "" + currentCollegeCity + IntelligentRoadTest.day;
                if (condition == IntelligentRoadTest.collegeCurrentSelectConditon) {//无需重新查询数据
                    console.log("无需重新查询数据");
                } else {
                    showOrHideInputImage(2);
                    if(IntelligentRoadTest.collegeVM == null){
                        IntelligentRoadTest.showCollegeData([]);
                    }
                    IntelligentRoadTest.collegeVM.collegeList = null;
                    IntelligentRoadTest.getSenseDataByObjectId(1, currentCollegeCity, IntelligentRoadTest.day);
                }
            }
            var timer = setInterval(function () {
                if (IntelligentRoadTest.collegeVM != null && IntelligentRoadTest.collegeVM.collegeList != null) {
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.collegeVM.collegeList, 10);//
                    clearInterval(timer);
                    showOrHideInputImage(1);

                    //搜索标题更新
                    IntelligentRoadTest.searchTxtUpdate();
                }
            }, 500);
        } else if (object_type == "场馆") {
            IntelligentRoadTest.searchSenceTxtTmp = "场馆";
            // IntelligentRoadTest.goSiteList();
            IntelligentRoadTest.index = 19;
            IntelligentRoadTest.senseName = "site";
            IntelligentRoadTest.showBaiduMap();//显示百度地图

            $("#siteCityName").text(IntelligentRoadTest.city);
            IntelligentRoadTest.updateSearchTmpTxtByRowdiv();
            if (IntelligentRoadTest.siteCurrentSelectConditon == "") {
                showOrHideInputImage(2);
                IntelligentRoadTest.getSenseDataByObjectId(10, city, IntelligentRoadTest.day);
            } else {
                var siteCity = $("#siteCityName").text().trim();
                var condition = "" + siteCity + IntelligentRoadTest.day;
                if (condition == IntelligentRoadTest.siteCurrentSelectConditon) {//无需重新查询数据
                    console.log("无需重新查询数据");
                } else {
                    showOrHideInputImage(2);
                    if(IntelligentRoadTest.siteVM == null){
                        IntelligentRoadTest.showSiteData([]);
                    }
                    IntelligentRoadTest.siteVM.siteList = null;
                    IntelligentRoadTest.getSenseDataByObjectId(10, siteCity, IntelligentRoadTest.day);
                }
            }
            var timer = setInterval(function () {
                if (IntelligentRoadTest.siteVM != null && IntelligentRoadTest.siteVM.siteList != null) {
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.siteVM.siteList, 19);//
                    clearInterval(timer);
                    showOrHideInputImage(1);

                    //搜索标题更新
                    IntelligentRoadTest.searchTxtUpdate();
                }
            }, 500);

        } else if (object_type == "高密度住宅区") {
            IntelligentRoadTest.senseName = "uptown"
            IntelligentRoadTest.searchSenceTxtTmp = " 高密度住宅区";
            // IntelligentRoadTest.goUptownList();
            IntelligentRoadTest.index = 9;
            IntelligentRoadTest.showBaiduMap();//显示百度地图

            $("#uptownCityName").text(IntelligentRoadTest.city);
            IntelligentRoadTest.updateSearchTmpTxtByRowdiv();
            if (IntelligentRoadTest.uptownCurrentSelectConditon == "") {
                showOrHideInputImage(2);
                IntelligentRoadTest.getSenseDataByObjectId(2, city, IntelligentRoadTest.day);
            } else {
                var uptownCity = $("#uptownCityName").text().trim();
                var condition = "" + uptownCity + IntelligentRoadTest.day;
                if (condition == IntelligentRoadTest.uptownCurrentSelectConditon) {//无需重新查询数据
                    console.log("无需重新查询数据");
                } else {
                    showOrHideInputImage(2);
                    if(IntelligentRoadTest.uptownVM == null){
                        IntelligentRoadTest.showUptownData([]);
                    }
                    IntelligentRoadTest.uptownVM.uptownList = null;
                    IntelligentRoadTest.getSenseDataByObjectId(2, uptownCity, IntelligentRoadTest.day);
                }
            }
            var timer = setInterval(function () {
                if (IntelligentRoadTest.uptownVM != null && IntelligentRoadTest.uptownVM.uptownList != null) {
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.uptownVM.uptownList, 9);//
                    clearInterval(timer);
                    showOrHideInputImage(1);

                    //搜索标题更新
                    IntelligentRoadTest.searchTxtUpdate();
                }
            }, 500);
        } else if (object_type == "美食") {
            IntelligentRoadTest.searchSenceTxtTmp = "美食";
            IntelligentRoadTest.goFoodList();
            IntelligentRoadTest.index = 18;
            IntelligentRoadTest.senseName = "food";
            IntelligentRoadTest.showBaiduMap();//显示百度地图

            $("#foodCityName").text(IntelligentRoadTest.city);
            IntelligentRoadTest.updateSearchTmpTxtByRowdiv();
            if (IntelligentRoadTest.foodCurrentSelectConditon == "") {
                showOrHideInputImage(2);
                IntelligentRoadTest.getSenseDataByObjectId(9, city, IntelligentRoadTest.day);
            } else {
                var foodCity = $("#foodCityName").text().trim();
                var condition = "" + foodCity + IntelligentRoadTest.day;
                if (condition == IntelligentRoadTest.foodCurrentSelectConditon) {//无需重新查询数据
                    console.log("无需重新查询数据");
                } else {
                    showOrHideInputImage(2);
                    if(IntelligentRoadTest.foodVM == null){
                        IntelligentRoadTest.showFoodData([]);
                    }
                    IntelligentRoadTest.foodVM.foodList = null;
                    IntelligentRoadTest.getSenseDataByObjectId(9, foodCity, IntelligentRoadTest.day);
                }
            }
            var timer = setInterval(function () {
                if (IntelligentRoadTest.foodVM != null && IntelligentRoadTest.foodVM.foodList != null) {
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.foodVM.foodList, 18);//
                    clearInterval(timer);
                    showOrHideInputImage(1);

                    //搜索标题更新
                    IntelligentRoadTest.searchTxtUpdate();
                }
            }, 500);

        } else if (object_type == "美景") {
            IntelligentRoadTest.searchSenceTxtTmp = " 美景";
            IntelligentRoadTest.index = 12;
            IntelligentRoadTest.senseName = "scenery";
            IntelligentRoadTest.goSceneryList();
            IntelligentRoadTest.showBaiduMap();//显示百度地图

            $("#sceneryName").text(IntelligentRoadTest.city);
            IntelligentRoadTest.updateSearchTmpTxtByRowdiv();
            if (IntelligentRoadTest.sceneryCurrentSelectConditon == "") {
                showOrHideInputImage(2);
                IntelligentRoadTest.getSenseDataByObjectId(7, city, IntelligentRoadTest.day);
            } else {
                var currentSceneryCity = $("#sceneryName").text().trim();
                var condition = "" + currentSceneryCity + IntelligentRoadTest.day;
                if (condition == IntelligentRoadTest.sceneryCurrentSelectConditon) {//无需重新查询数据
                    console.log("无需重新查询数据");
                } else {
                    showOrHideInputImage(2);
                    if(IntelligentRoadTest.sceneryVM == null){
                        IntelligentRoadTest.showSceneryData([]);
                    }
                    IntelligentRoadTest.sceneryVM.sceneryList = null;
                    IntelligentRoadTest.getSenseDataByObjectId(7, currentSceneryCity, IntelligentRoadTest.day);
                }
            }

            var timer = setInterval(function () {
                if (IntelligentRoadTest.sceneryVM != null && IntelligentRoadTest.sceneryVM.sceneryList != null) {
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.sceneryVM.sceneryList, 12);//
                    clearInterval(timer);
                    showOrHideInputImage(1);

                    //搜索标题更新
                    IntelligentRoadTest.searchTxtUpdate();
                }
            }, 500);
        } else if (object_type == "高流量商务区") {
            IntelligentRoadTest.searchSenceTxtTmp = " 高流量商务区";
            IntelligentRoadTest.index = 11;
            IntelligentRoadTest.showBaiduMap();//显示百度地图
            IntelligentRoadTest.goBusinessList();
            IntelligentRoadTest.senseName = "business";
            $("#businessCityName").text(IntelligentRoadTest.city);
            IntelligentRoadTest.updateSearchTmpTxtByRowdiv();
            if (IntelligentRoadTest.businessCurrentSelectConditon == "") {
                showOrHideInputImage(2);
                IntelligentRoadTest.getSenseDataByObjectId(3, city, IntelligentRoadTest.day);
            } else {
                var currentBusinessCity = $("#businessCityName").text().trim();
                var condition = "" + currentBusinessCity + IntelligentRoadTest.day;
                if (condition == IntelligentRoadTest.businessCurrentSelectConditon) {//无需重新查询数据
                    console.log("无需重新查询数据");
                } else {
                    showOrHideInputImage(2);
                    if(IntelligentRoadTest.businessVM == null){
                        IntelligentRoadTest.showBusinessData([]);
                    }
                    IntelligentRoadTest.businessVM.businessList = null;
                    IntelligentRoadTest.getSenseDataByObjectId(3, currentBusinessCity, IntelligentRoadTest.day);
                }
            }
            var timer = setInterval(function () {
                if (IntelligentRoadTest.businessVM != null && IntelligentRoadTest.businessVM.businessList != null) {
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.businessVM.businessList, 11);//
                    clearInterval(timer);
                    showOrHideInputImage(1);

                    //搜索标题更新
                    IntelligentRoadTest.searchTxtUpdate();
                }
            }, 500);
        } else if (object_type == "战狼区域") {
            IntelligentRoadTest.searchSenceTxtTmp = "战狼区域";
            IntelligentRoadTest.index = 16;
            IntelligentRoadTest.showBaiduMap();//显示百度地图
            IntelligentRoadTest.goWarwolfList();
            IntelligentRoadTest.senseName = "warwolf";
            $("#warwolfCityName").text(IntelligentRoadTest.city);
            IntelligentRoadTest.updateSearchTmpTxtByRowdiv();
            if (IntelligentRoadTest.warwolfCurrentSelectConditon == "") {
                showOrHideInputImage(2);
                IntelligentRoadTest.getWarwolfListData(IntelligentRoadTest.day, city, 3);
            } else {
                var currentWarwolfCity = $("#warwolfCityName").text().trim();
                var condition = "" + currentWarwolfCity + IntelligentRoadTest.day;
                if (condition == IntelligentRoadTest.warwolfCurrentSelectConditon) {//无需重新查询数据
                    console.log("无需重新查询数据");
                } else {
                    showOrHideInputImage(2);
                    if(IntelligentRoadTest.warwolfVM == null){
                        IntelligentRoadTest.showWarwolfData([]);
                    }
                    IntelligentRoadTest.warwolfVM.warwolfList = null;
                    IntelligentRoadTest.getWarwolfListData(IntelligentRoadTest.day, currentWarwolfCity, 3);
                }
            }
            var timer = setInterval(function () {
                if (IntelligentRoadTest.warwolfVM != null && IntelligentRoadTest.warwolfVM.warwolfList != null) {
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.warwolfVM.warwolfList, 11);//
                    clearInterval(timer);
                    showOrHideInputImage(1);

                    //搜索标题更新
                    IntelligentRoadTest.searchTxtUpdate();
                }
            }, 500);
        } else if (object_type == "农贸市场") {
            IntelligentRoadTest.searchSenceTxtTmp = " 农贸市场";
            IntelligentRoadTest.index = 17;
            IntelligentRoadTest.showBaiduMap();//显示百度地图
            IntelligentRoadTest.goMarketList();
            IntelligentRoadTest.senseName = "market";
            $("#marketCityName").text(IntelligentRoadTest.city);
            IntelligentRoadTest.updateSearchTmpTxtByRowdiv();
            if (IntelligentRoadTest.marketCurrentSelectConditon == "") {
                showOrHideInputImage(2);
                IntelligentRoadTest.getSenseDataByObjectId(8, city, IntelligentRoadTest.day);
            } else {
                var currentMarketCity = $("#marketCityName").text().trim();
                var condition = "" + currentMarketCity + IntelligentRoadTest.day;
                if (condition == IntelligentRoadTest.marketCurrentSelectConditon) {//无需重新查询数据
                    console.log("无需重新查询数据");
                } else {
                    showOrHideInputImage(2);
                    if(IntelligentRoadTest.marketVM == null){
                        IntelligentRoadTest.showMarketData([]);
                    }
                    IntelligentRoadTest.marketVM.marketList = null;
                    IntelligentRoadTest.getSenseDataByObjectId(8, currentMarketCity, IntelligentRoadTest.day);
                }
            }
            var timer = setInterval(function () {
                if (IntelligentRoadTest.marketVM != null && IntelligentRoadTest.marketVM.marketList != null) {
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.marketVM.marketList, 17);//
                    clearInterval(timer);
                    showOrHideInputImage(1);

                    //搜索标题更新
                    IntelligentRoadTest.searchTxtUpdate();
                }
            }, 500);
        }else if(object_type == "中小学" || object_type == "城中村" || object_type == "自然村" || object_type == "工厂" ){ //新增场景
            showOrHideInputImage(2);
            if(object_type == "中小学"){
                IntelligentRoadTest.senseObject = IntelligentRoadTest.school;
                IntelligentRoadTest.index = IntelligentRoadTest.senseObject.index;
            }else if(object_type == "城中村"){
                IntelligentRoadTest.senseObject = IntelligentRoadTest.cityVillage;
                IntelligentRoadTest.index = IntelligentRoadTest.senseObject.index;
            }else if(object_type == "自然村"){
                IntelligentRoadTest.senseObject = IntelligentRoadTest.village;
                IntelligentRoadTest.index = IntelligentRoadTest.senseObject.index;
            }else if(object_type == "工厂"){
                IntelligentRoadTest.senseObject = IntelligentRoadTest.factory;
                IntelligentRoadTest.index = IntelligentRoadTest.senseObject.index;
            }
            if(IntelligentRoadTest.senseVM != null && IntelligentRoadTest.senseVM.senseList != null){
                IntelligentRoadTest.senseVM.senseList = null;
            }
            if(IntelligentRoadTest.senseVM == null){
                IntelligentRoadTest.showSenseData([]);
            }
            IntelligentRoadTest.getSenseDataByObjectId(IntelligentRoadTest.senseObject.type , IntelligentRoadTest.day  , IntelligentRoadTest.day);
            IntelligentRoadTest.getSenseDataByESBHID(IntelligentRoadTest.senseObject.type , IntelligentRoadTest.objIdTmp  ,
                IntelligentRoadTest.day);
            var timer = setInterval(function(){
                if(IntelligentRoadTest.senseVM != null && IntelligentRoadTest.senseVM.senseList != null ){
                    // $("#macSectorCount").html("返回上一级(" + $("#macSectorCountMessage").text() + ")");
                    // IntelligentRoadTest.drawMk(IntelligentRoadTest.macSectorVM.macSectorList,6);
                    clearInterval(timer);
                    showOrHideInputImage(1);
                }
            },500);
        }

        IntelligentGoToPage.type = IntelligentRoadTest.senseName;

        if (IntelligentRoadTest.senseName == "college") {
            IntelligentRoadTest.getSenseDataByESBHID( 1,  IntelligentRoadTest.objIdTmp,IntelligentRoadTest.day);
        }else if (IntelligentRoadTest.senseName == "uptown") {
            if(IntelligentRoadTest.uptownVM == null){
                IntelligentRoadTest.showUptownData([]);
            }
            $("#seachTime").text(day);
            IntelligentRoadTest.getSenseDataByESBHID(2 ,  IntelligentRoadTest.objIdTmp,IntelligentRoadTest.day);
            /*var i = 0;
            var uptown = setInterval(function() {
                i++;
                if(IntelligentRoadTest.uptownVM != null){
                    clearInterval(uptown);
                    $("#seachTime").text(day);
                    IntelligentRoadTest.getSenseDataByESBHID(2 ,  IntelligentRoadTest.objIdTmp,IntelligentRoadTest.day);
                }
                if(i > 10){
                    clearInterval(uptown);
                }
            },1000)*/
        }else if (IntelligentRoadTest.senseName == "business") {
            if(IntelligentRoadTest.businessVM == null){
                IntelligentRoadTest.showBusinessData([]);
            }
            $("#seachTime").text(day);
            IntelligentRoadTest.getSenseDataByESBHID(3 ,  IntelligentRoadTest.objIdTmp ,IntelligentRoadTest.day,'true');
            /*var i = 0;
            var bus =  setInterval(function() {
                i++;

                if(i > 10){
                    clearInterval(bus);
                }
            },1000)*/
        }else if (IntelligentRoadTest.senseName == "warwolf") {
            if(IntelligentRoadTest.warwolfVM == null){
                IntelligentRoadTest.showWarwolfData([]);
            }
            $("#seachTime").text(day);
            IntelligentRoadTest.getSenseDataByESBHID(3 ,  IntelligentRoadTest.objIdTmp ,IntelligentRoadTest.day, null ,'true');
        }else if (IntelligentRoadTest.senseName == "market") {
            if(IntelligentRoadTest.marketVM == null){
                IntelligentRoadTest.showMarketData([]);
            }
            $("#seachTime").text(day);
            IntelligentRoadTest.getSenseDataByESBHID(8 ,  IntelligentRoadTest.objIdTmp ,IntelligentRoadTest.day);
        }else if (IntelligentRoadTest.senseName == "scenery") {
            if(IntelligentRoadTest.sceneryVM == null){
                IntelligentRoadTest.showSceneryData([]);
            }
            $("#seachTime").text(day);
            IntelligentRoadTest.getSenseDataByESBHID(7 ,  IntelligentRoadTest.objIdTmp ,IntelligentRoadTest.day);
        }else if (IntelligentRoadTest.senseName == "food") {
            if(IntelligentRoadTest.foodVM == null){
                IntelligentRoadTest.showFoodData([]);
            }
            $("#seachTime").text(day);
            IntelligentRoadTest.getSenseDataByESBHID(9 ,  IntelligentRoadTest.objIdTmp,IntelligentRoadTest.day);
        }else if (IntelligentRoadTest.senseName == "site") {
            if(IntelligentRoadTest.siteVM == null){
                IntelligentRoadTest.showSiteData([]);
            }
            $("#seachTime").text(day);
            IntelligentRoadTest.getSenseDataByESBHID(10 ,  IntelligentRoadTest.objIdTmp,IntelligentRoadTest.day);
        }
        if (IntelligentRoadTest.senseName == "metro") {
            // IntelligentGoToPage.searchMetroByCondition(IntelligentRoadTest.senseName, object_id); //模糊匹配地铁场景
            $("#seachTime").text(day);
            // IntelligentRoadTest.getMetroMessageById(IntelligentRoadTest.objIdTmp);
        }
        if (IntelligentRoadTest.index == 7 || IntelligentRoadTest.index == 8 || IntelligentRoadTest.index == 14) {
            $("#seachTime").text(day);
            var isLP = false;
            if((road_id != null && road_id.indexOf('_')>0)|| (object_id != null && object_id.indexOf('_')>0 )){
            	isLP = true;
            }
            var roadType = 1;
            if(IntelligentRoadTest.index == 7){
            	if(!IntelligentRoadTest.highwayVM){
            		IntelligentRoadTest.showRoadFirstList([] , 1 , isLP);
            	}else{
            		IntelligentRoadTest.showRoadFirstList(IntelligentRoadTest.highwayFirstListResult , 1 , isLP);
            	}
            	
            }else if(IntelligentRoadTest.index == 8){
            	roadType = 2;
            	if(!IntelligentRoadTest.railVM){
            		IntelligentRoadTest.showRoadFirstList([] , 2 , isLP);
            	}else{
            		IntelligentRoadTest.showRoadFirstList(IntelligentRoadTest.railFirstListResult , 2 , isLP);
            	}
            }else if(IntelligentRoadTest.index == 14){
            	roadType = 3;
            	if(!IntelligentRoadTest.cityRoadVM){
            		IntelligentRoadTest.showRoadFirstList([] , 3 , isLP);
            	}else{
            		IntelligentRoadTest.showRoadFirstList(IntelligentRoadTest.cityRoadFirstListResult , 3 , isLP);
            	}
            }
            
            setTimeout(function(){
            	var city_id = noceUtil.city_LATN_ID[city];
            	var isSaveForScreen = false;
                if(screen=='true'||screen==true){
                	isSaveForScreen = true;
                }
            	IntelligentRoadTest.getRoadCompleteMessageByLineID(object_id ,day , roadType , city , road_id , isLP,isSaveForScreen);
//                IntelligentGoToPage.searchLineByCondition(IntelligentRoadTest.index, object_id);
                
//                if(isLP){
//                	IntelligentRoadTest.loadContinueLineMeterData(IntelligentRoadTest.day,roadType,city_id,road_id,contain_ids);
//                }else{
//                	IntelligentRoadTest.loadSplitLineSmallLine(road_id ,object_id, city_id , day ,1);
//                }
                
            },200)
        }
        IntelligentRoadTest.submitLayersData();//初始化图层
    }else if(day != null && city != null && country != null && mktcenter != null && object_id != null&&(obj_isNew=="true"||obj_isNew==true)){
    	IntelligentRoadTest.objIdTmp = object_id;
        IntelligentRoadTest.city = city;
        IntelligentRoadTest.district = country;
        IntelligentRoadTest.day = day;
        $("#seachTime").text(day);
        var systemLayerType = ",高校,场馆,高密度住宅区,美食,美景,高流量商务区,战狼区域,农贸市场,中小学,城中村,自然村,工厂,";
        if(systemLayerType.indexOf(object_type)>=0){
        	IntelligentGoToPage.searchNewObj(object_type,object_id);
        }
    }

    //其他不属于场景的类型 ： 扇区、关注区域和骨头区域
    if(object_type != null && object_id != null){
        if(object_type == "扇区"){
            IntelligentRoadTest.searchSenceTxtTmp = "扇区";
            IntelligentRoadTest.index = 3;
            IntelligentRoadTest.showBaiduMap();//显示百度地图
            $("#sectorCityName").text(IntelligentRoadTest.city);
            $("#sectorDistrictName").text(IntelligentRoadTest.district);
            IntelligentRoadTest.updateSearchTmpTxtByRowdiv();
            IntelligentRoadTest.loadSectorData();
            var timer = setInterval(function(){
                if(IntelligentRoadTest.sectorVM != null && IntelligentRoadTest.sectorVM.sectorList != null){
                    var obj_id = parseInt(object_id);
                    var enodebId = parseInt(obj_id/256);
                    var cellid = obj_id%256;
                    IntelligentRoadTest.clickType=1;
                    IntelligentRoadTest.getSectorMessageById(enodebId , cellid , IntelligentRoadTest.day,false);
                    clearInterval(timer);
                }
            }, 200);
        }else if(object_type == "骨头区域"){
            IntelligentRoadTest.searchSenceTxtTmp = "骨头区域";
            IntelligentRoadTest.index = 5;
            IntelligentRoadTest.showBaiduMap();//显示百度地图
            $("#boneCityName").text(IntelligentRoadTest.city)
            IntelligentRoadTest.updateSearchTmpTxtByRowdiv();
            IntelligentRoadTest.queryAllBoneArea();
            if(IntelligentRoadTest.boneAreaVM == null){
                IntelligentRoadTest.boneAreaData([]);
            }
            IntelligentRoadTest.getBoneAreaHisById(object_id,IntelligentRoadTest.day);
            /*if($("input#scene").attr("checked") != "checked"){ //默认勾中场景图层的复选框
                $("input#scene").trigger('click');
            }
            if($("input#bone").attr("checked") != "checked"){ //默认选中骨头区域图层
                $("input#bone").trigger('click');
            }*/
        }else if(object_type == "关注区域"){
            IntelligentRoadTest.searchSenceTxtTmp = "关注区域";
            IntelligentRoadTest.index = 1;
            IntelligentRoadTest.showBaiduMap();//显示百度地图
            $("#concernAreaCityName").text(IntelligentRoadTest.city);
            IntelligentRoadTest.updateSearchTmpTxtByRowdiv();
            showOrHideInputImage(2);
            IntelligentRoadTest.queryAllConcernArea();
            if(IntelligentRoadTest.concernAreaVM = null){
                IntelligentRoadTest.concernAreaData([]);
            }
            IntelligentRoadTest.getConncernAreaHisMessageById(object_id ,IntelligentRoadTest.day);

            /*if($("input#scene").attr("checked") != "checked"){ //默认勾中场景图层的复选框
                $("input#scene").trigger('click');
            }
            if($("input#concern").attr("checked") != "checked"){ //默认选中关注区域图层
                $("input#concern").trigger('click');
            }*/

        }
        if(isAudit == "1" || isAudit == "2"){
            IntelligentRoadTest.submitLayersData();//初始化图层
        }
    }
}
//根据场景的名称来实现搜索功能
IntelligentGoToPage.searchSenseByCondition = function IntelligentGoToPage_searchSenseByCondition(senseName , val){
    var allResult = [];
    if(senseName == "college"){
        allResult = IntelligentRoadTest.collegeResult;
    }else if(senseName == "uptown"){
        allResult = IntelligentRoadTest.uptownResult;
    }else if(senseName == "scenery"){
        allResult = IntelligentRoadTest.sceneryResult;
    }else if(senseName == "business"){
        allResult = IntelligentRoadTest.businessResult;
    }else if(senseName == "warwolf"){
        allResult = IntelligentRoadTest.warwolfResult;
    }else if(senseName == "food"){
        allResult = IntelligentRoadTest.foodResult;
    }else if(senseName == "market"){
        allResult = IntelligentRoadTest.marketResult;
    }else if(senseName == "site"){
        allResult = IntelligentRoadTest.siteResult;
    }
    //var condition;
    IntelligentRoadTest.collegeCrossFliterObj = crossfilter([]);
    IntelligentRoadTest.collegeCrossFliterObj.add(allResult);
    var collegeByNameFilter = IntelligentRoadTest.collegeCrossFliterObj.dimension(function(d) { return d });
    // console.log(dtByNameFilter.top(IntelligentRoadTest.dtCrossFliterObj.size()));
    if($("#searchText").val().trim() != ""){
        condition = $("#searchText").val().trim();
        collegeByNameFilter.filter(function(d){
            if(d.esbh_name.indexOf(condition)!=-1){
                return d;
            }
        });
        var result = collegeByNameFilter.top(IntelligentRoadTest.collegeCrossFliterObj.size());
    }else{
        var  result = allResult;
        $('#searchResult').slideUp(1000);
    }
    //过滤后回显数据
    if(senseName == "college"){
        // IntelligentRoadTest.filterCollegeResult = result;
        // IntelligentRoadTest.collegeCurrentResult = IntelligentRoadTest.filterCollegeResult;
        // IntelligentRoadTest.isFilterCollege = true;
        //IntelligentRoadTest.showCollegeData(IntelligentRoadTest.filterCollegeResult);
        IntelligentRoadTest.seachResult ={type:"college",result:result};
    }else if(senseName == "uptown"){
        // IntelligentRoadTest.filterUptownResult = result;
        // IntelligentRoadTest.uptownCurrentResult = IntelligentRoadTest.filterUptownResult;
        // IntelligentRoadTest.isFilterUptown = true;
        //IntelligentRoadTest.showCollegeData(IntelligentRoadTest.filterCollegeResult);
        IntelligentRoadTest.seachResult ={type:"uptown",result:result};
    }else if(senseName == "scenery"){
        // IntelligentRoadTest.filterSceneryResult = result;
        // IntelligentRoadTest.sceneryCurrentResult = IntelligentRoadTest.filterSceneryResult;
        // IntelligentRoadTest.isFilterScenery = true;
        //IntelligentRoadTest.showsceneryData(IntelligentRoadTest.filtersceneryResult);
        IntelligentRoadTest.seachResult ={type:"scenery",result:result};
    }else if(senseName == "business"){
        // IntelligentRoadTest.filterBusinessResult = result;
        // IntelligentRoadTest.businessCurrentResult = IntelligentRoadTest.filterBusinessResult;
        // IntelligentRoadTest.isFilterBusiness = true;
        //IntelligentRoadTest.showbusinessData(IntelligentRoadTest.filterbusinessResult);
        IntelligentRoadTest.seachResult ={type:"business",result:result};
    }else if(senseName == "warwolf"){
        IntelligentRoadTest.seachResult ={type:"warwolf",result:result};
    }else if(senseName == "food"){
        IntelligentRoadTest.seachResult ={type:"food",result:result};
    }else if(senseName == "site"){
        IntelligentRoadTest.seachResult ={type:"site",result:result};
    }else if(senseName == "market"){
        IntelligentRoadTest.seachResult ={type:"market",result:result};
    }

    var resultStr = '';
    for(var i=0;i<result.length;i++){
        if(senseName == "college"){
            resultStr += '<li type="college" clickId="'+result[i].esbh_id+'"><span>'+result[i].esbh_name+'</span><span>'+result[i].esbh_id+'</span><span>高校</span></li>';
        }else if(senseName == "uptown"){
            resultStr += '<li type="uptown" clickId="'+result[i].esbh_id+'"><span>'+result[i].esbh_name+'</span><span>'+result[i].esbh_id+'</span><span>住宅区</span></li>';
        }else if(senseName == "scenery"){
            resultStr += '<li type="scenery" clickId="'+result[i].esbh_id+'"><span>'+result[i].esbh_name+'</span><span>'+result[i].esbh_id+'</span><span>美景</span></li>';
        }else if(senseName == "business"){
            resultStr += '<li type="business" clickId="'+result[i].esbh_id+'"><span>'+result[i].esbh_name+'</span><span>'+result[i].esbh_id+'</span><span>商务区</span></li>';
        }else if(senseName == "warwolf"){
            resultStr += '<li type="warwolf" clickId="'+result[i].esbh_id+'"><span>'+result[i].esbh_name+'</span><span>'+result[i].esbh_id+'</span><span>战狼</span></li>';
        }else if(senseName == "food"){
            resultStr += '<li type="food" clickId="'+result[i].esbh_id+'"><span>'+result[i].esbh_name+'</span><span>'+result[i].esbh_id+'</span><span>美食</span></li>';
        }else if(senseName == "site"){
            resultStr += '<li type="site" clickId="'+result[i].esbh_id+'"><span>'+result[i].esbh_name+'</span><span>'+result[i].esbh_id+'</span><span>场馆</span></li>';
        }else if(senseName == "market"){
            resultStr += '<li type="market" clickId="'+result[i].esbh_id+'"><span>'+result[i].esbh_name+'</span><span>'+result[i].esbh_id+'</span><span>农贸</span></li>';
        }

    }
    if(IntelligentRoadTest.index!=4&&IntelligentRoadTest.index!=6 && IntelligentRoadTest.senseName != null){
        if(resultStr != ''){
            $('#searchResult').html(resultStr);
            setTimeout(function(){
                if($('#searchText').val().trim() != ""){
                    $('#searchResult').slideDown(1000);
                }
            },100);
        }else{
            $('#searchResult').html('无结果');
            setTimeout(function(){
                if($('#searchText').val().trim() != ""){
                    $('#searchResult').slideDown(1000);
                }
            },100);
        }
    }

    // $('#searchResult li').unbind('click').bind('click',function(){
    var type = IntelligentGoToPage.type = senseName;
    var clickId = IntelligentRoadTest.objIdTmp;
    if(IntelligentRoadTest.seachResult.type == type){
        for(var i=0;i<IntelligentRoadTest.seachResult.result.length;i++){
            if(clickId==IntelligentRoadTest.seachResult.result[i].esbh_id){
                $('.linkCell').removeClass("linkCellHover");
                IntelligentRoadTest.hideSectorPoorLine(3);
                //跳转到骨头详情
                if(senseName == "college"){
                    IntelligentRoadTest.collegeVM.showMessage(IntelligentRoadTest.seachResult.result[i]);
                }else if(senseName == "uptown"){
                    IntelligentRoadTest.uptownVM.showMessage(IntelligentRoadTest.seachResult.result[i]);
                }else if(senseName == "scenery"){
                    IntelligentRoadTest.sceneryVM.showMessage(IntelligentRoadTest.seachResult.result[i]);
                }else if(senseName == "business"){
                    IntelligentRoadTest.businessVM.showMessage(IntelligentRoadTest.seachResult.result[i]);
                }else if(senseName == "warwolf"){
                    IntelligentRoadTest.warwolfVM.showMessage(IntelligentRoadTest.seachResult.result[i]);
                }else if(senseName == "food"){
                    IntelligentRoadTest.foodVM.showMessage(IntelligentRoadTest.seachResult.result[i]);
                }else if(senseName == "market"){
                    IntelligentRoadTest.marketVM.showMessage(IntelligentRoadTest.seachResult.result[i]);
                }else if(senseName == "site"){
                    IntelligentRoadTest.siteVM.showMessage(IntelligentRoadTest.seachResult.result[i]);
                }
                IntelligentRoadTest.drawEsbhMk(IntelligentRoadTest.seachResult.result[i]);

                // //骨头打点
                // var item=IntelligentRoadTest.seachResult.result[i];
                // IntelligentRoadTest.showPolygon(item.gis_data);
                // var textList=[
                //     {"key":"区域名称","val":item.object_name},
                //     {"key":"区域编号","val":item.id},
                // ];
                // IntelligentRoadTest.searchShowMkLable((item.longitude_min+item.longitude_max)/2,(item.latitude_max+item.latitude_min)/2,textList)
                // IntelligentRoadTest.map.centerAndZoom(new BMap.Point((item.longitude_min+item.longitude_max)/2,(item.latitude_max+item.latitude_min)/2),16);

                console.log("匹配到高校结果");
                break;
            }
        }
    }
    $('#searchResult').slideUp(1000);
    // });

    //这里有一个通用的方法来搜索数据，注意：这个搜索返回的结果是要显示在搜索结果的div中，和DT列表以及宏站不同
}

//根据地铁的名称来实现搜索功能
IntelligentGoToPage.searchMetroByCondition = function IntelligentGoToPage_searchMetroByCondition(senseName , val){
    // return;
    console.log("地铁搜索");

    IntelligentRoadTest.seachMetroFirstListData(IntelligentRoadTest.city, IntelligentRoadTest.day,  val);
    IntelligentRoadTest.seachMetroSecondListData(IntelligentRoadTest.city, IntelligentRoadTest.day,  val);
    IntelligentGoToPage.dealMetroSeachResult();

}
IntelligentGoToPage.dealMetroSeachResult = function IntelligentGoToPage_dealMetroSeachResult() {
    var resultStr = '';
    if(IntelligentRoadTest.LineFirstSeachResult.length!=0){
        for(var i=0;i<IntelligentRoadTest.LineFirstSeachResult.length;i++){
            resultStr += '<li type="firstLine" clickId="'+IntelligentRoadTest.LineFirstSeachResult[i].line_id+'"><span></span><span>'+IntelligentRoadTest.LineFirstSeachResult[i].line_name+'</span><span>线路</span></li>';
        }
    }
    if(IntelligentRoadTest.LineSecondSeachResult.length!=0){
        for(var i=0;i<IntelligentRoadTest.LineSecondSeachResult.length;i++){
            resultStr += '<li type="secondLine" clickId="'+IntelligentRoadTest.LineSecondSeachResult[i].from_station_id+'"><span>'+IntelligentRoadTest.LineSecondSeachResult[i].line_name+'</span><span>'+IntelligentRoadTest.LineSecondSeachResult[i].from_station_name+'</span><span>站点</span></li>';
        }
    }

    if(resultStr != ''){
        $('#searchResult').html(resultStr);
        setTimeout(function(){
            if($('#searchText').val().trim() != ""){
                $('#searchResult').slideDown(1000);
            }
        },100);
    }else{
        $('#searchResult').html('无结果');
        setTimeout(function(){
            if($('#searchText').val().trim() != ""){
                $('#searchResult').slideDown(1000);
            }
        },100);
    }

    // $('#searchResult li').unbind('click').bind('click',function(){
        var type = IntelligentGoToPage.type;
        var clickId = IntelligentRoadTest.objIdTmp;
//         if("firstLine" == type){
//             for(var i=0;i<IntelligentRoadTest.LineFirstSeachResult.length;i++){
//                 if(clickId==IntelligentRoadTest.LineFirstSeachResult[i].line_id){
//                     //调用进入详情页方法
//                     //第二层
// //                	IntelligentRoadTest.metroClick();
//                     IntelligentRoadTest.metroVM.goNextList(IntelligentRoadTest.LineFirstSeachResult[i],1);
//                     // break;
//                 }
//             }
//         }else if("secondLine" == type){
            for(var i=0;i<IntelligentRoadTest.LineSecondSeachResult.length;i++){
                if(clickId==IntelligentRoadTest.LineSecondSeachResult[i].from_station_id){
                    //调用进入详情页方法
                    //第层
                    IntelligentRoadTest.initMetroSecondVM();
                    IntelligentRoadTest.isSkip = true;
                    IntelligentRoadTest.metroSecondVM.showMessage(IntelligentRoadTest.LineSecondSeachResult[i],1);
                    // break;
                }
            }

        // }
        $('#searchResult').slideUp(1000);
    // });
}

//根据线路的索引来实现搜索功能
IntelligentGoToPage.searchLineByCondition = function IntelligentGoToPage_searchSenseByCondition(index , val) {
    var lineType;
    var selectName;
    var isLp;
    if(index==7){
        lineType = 1;
        selectName = $("#highwaySelectName").text();
    }else if(index==8){
        lineType = 2;
        selectName = $("#railListSelectName").text();
    }else if(index==14){
        lineType = 3;
        selectName = $("#cityRoadSelectName").text();
    }

    if(selectName=="500米分段统计"){
        isLp = false;
    }else{
        isLp = true;
    }
    IntelligentRoadTest.seachRoadFirstListData(IntelligentRoadTest.city, IntelligentRoadTest.day, lineType, isLp, val);
    IntelligentRoadTest.seachRoadSecondListData(IntelligentRoadTest.city, IntelligentRoadTest.day, lineType, isLp, val);
    IntelligentGoToPage.dealSeachResult();

}
//搜索线路进入详情
IntelligentGoToPage.dealSeachResult = function IntelligentGoToPage_dealSeachResult() {
    var resultStr = '';
    for(var i=0;i<IntelligentRoadTest.LineFirstSeachResult.length;i++){
        resultStr += '<li type="firstLine" clickId="'+IntelligentRoadTest.LineFirstSeachResult[i].road_id+'"><span></span><span>'+IntelligentRoadTest.LineFirstSeachResult[i].road_name+'</span><span>线路</span></li>';
    }
    for(var i=0;i<IntelligentRoadTest.LineSecondSeachResult.length;i++){
        resultStr += '<li type="secondLine" clickId="'+IntelligentRoadTest.LineSecondSeachResult[i].line_id+'"><span></span><span>'+IntelligentRoadTest.LineSecondSeachResult[i].line_id+'</span><span>路段</span></li>';
    }
    if(resultStr != ''){
        $('#searchResult').html(resultStr);
        setTimeout(function(){
            if($('#searchText').val().trim() != ""){
                $('#searchResult').slideDown(1000);
            }
        },100);
    }else{
        $('#searchResult').html('无结果');
        setTimeout(function(){
            if($('#searchText').val().trim() != ""){
                $('#searchResult').slideDown(1000);
            }
        },100);
    }

        var clickId = IntelligentRoadTest.objIdTmp;
        for(var i=0;i<IntelligentRoadTest.LineSecondSeachResult.length;i++){
            if(clickId==IntelligentRoadTest.LineSecondSeachResult[i].line_id){
                //调用进入详情页方法
                if(IntelligentRoadTest.index==7){
                    IntelligentRoadTest.initHighwaySecondVM();
                    IntelligentRoadTest.isSkip = true;
                    IntelligentRoadTest.highwaySecondVM.showMessage(IntelligentRoadTest.LineSecondSeachResult[i]);
                }else if(IntelligentRoadTest.index==8){
                    IntelligentRoadTest.initRailSecondVM();
                    IntelligentRoadTest.isSkip = true;
                    IntelligentRoadTest.railSecondVM.showMessage(IntelligentRoadTest.LineSecondSeachResult[i]);
                }else if(IntelligentRoadTest.index==14){
                    IntelligentRoadTest.initCityRoadSecondVM();
                    IntelligentRoadTest.isSkip = true;
                    IntelligentRoadTest.cityRoadSecondVM.showMessage(IntelligentRoadTest.LineSecondSeachResult[i]);
                }
                // break;
            }
        }

        $('#searchResult').slideUp(1000);
    // });
}

//根据场景类型和id进入框选详情页
IntelligentGoToPage.searchNewObj = function (object_type,object_id){
	var sqlList = [];
	var list = ["IntelligentRoadTestV3_SystemLayerEdit_getNewData","OBJCT_ID:"+object_id,"OBJECT_TYPE:"+object_type];
	sqlList.push(list);
	var functionList = [IntelligentGoToPage.dealSearchNewData];
	var database = [3];
	progressbarTwo.submitSql(sqlList, functionList,database);
}

IntelligentGoToPage.dealSearchNewData = function (data){
	var result = callBackChangeData(data);
	if(result.length>0){
		var obj = IntelligentRoadTest.getBaiduPolygonObj(result[0].gis_data_baidu);
		obj.overlay.setFillOpacity(0.1);
		IntelligentRoadTest.map.addOverlay(obj.overlay);
		IntelligentRoadTest.isFirstGotoNew = true;//是否是第一次进入时查看新增的对象
	    IntelligentRoadTest.overlaycomplete(obj,false);
	    IntelligentRoadTest.isFirstGotoNew = false;
	    IntelligentRoadTest.index = 13;
	    IntelligentRoadTest.isShowGrid = true;
	    IntelligentRoadTest.goSaveAreaCompleteMessage();
	    var viewPort = IntelligentRoadTest.map.getViewport(obj.overlay.getPath());
	    IntelligentRoadTest.map.centerAndZoom(viewPort.center,viewPort.zoom);
	    var timerNewData = setInterval(function(){
	    	//加上显示
	        if(IntelligentRoadTest.saveAreaCompleteVM != null){
	        	$("#saveConcernAreaName").val(result[0].obj_name);
//	            $("#saveConcernAreaType").val(");
	            $("#boxCitySelect").val(result[0].city);
	            $("#boxCitySelect").trigger("change");
	            $("#boxCountrySelect").val(result[0].country_id);
	            $("#boxCountrySelect").trigger("change");
	            $("#boxMktcenterSelect").val(result[0].mktcenter_id);
	            $("#SystemLayerSelect").val(result[0].obj_type);
	            clearInterval(timerNewData);
	        }
	    },500);
	}
    IntelligentRoadTest.submitLayersData();//初始化图层
}
