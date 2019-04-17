//高校
IntelligentRoadTest.showCollegeData = function IntelligentRoadTest_showCollegeData(result) {
    IntelligentRoadTest.collegeCurrentPage = 1;
    IntelligentRoadTest.collegeTotalCount = result.length;
    var pageCount = result.length / IntelligentRoadTest.pageSize;
    if ((result.length % IntelligentRoadTest.pageSize) != 0) {
        IntelligentRoadTest.collegeTotalPage = parseInt(pageCount) + 1; //总页数，没有整除时加上1
    } else {
        IntelligentRoadTest.collegeTotalPage = pageCount;  //整除不用加1
    }

    if (IntelligentRoadTest.collegeVM == null) {
        IntelligentRoadTest.collegeVM = new Vue({
            el: '#showCollegeDiv',
            data: {
                collegeList: IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.collegeCurrentResult, IntelligentRoadTest.collegeCurrentPage),
                totalPages: IntelligentRoadTest.collegeTotalPage,
                totalCounts: IntelligentRoadTest.collegeTotalCount,
                currentPageNum: IntelligentRoadTest.collegeCurrentPage,
                startIndex: IntelligentRoadTest.startIndex,
                lastIndex: IntelligentRoadTest.lastIndex,
                isAuditor: concernAreaShare.isAuditor
            },
            methods: {
                showMessage: function (item, index) {
                    IntelligentRoadTest.mkIndex = index;
                    IntelligentRoadTest.cacheItem = item;
                    IntelligentRoadTest.removeEsbhPolyline();
                    //跳转到高校详情
                    IntelligentRoadTest.goCollegeCompleteMessage();
                    if (item.alarm_id != null && item.alarm_id != '') { //判断该对象是否需要展示工单监测指标
                        IntelligentRoadTest.isShowAlarmInfoMessage = true;
                    }
                    /*else{
                        IntelligentRoadTest.isShowAlarmInfoMessage = false;
                    }*/
                    //增加查询工单指标的方法
                    if (IntelligentRoadTest.isShowAlarmInfoMessage == true) {
                        IntelligentRoadTest.getSenseObjectAlarmInfoData("天翼蓝鹰高校", item.esbh_id, IntelligentRoadTest.day, item.poor_coverage_set);
                    }
                    IntelligentRoadTest.showPolygon(item.gis_data, undefined, "college", item.esbh_id, IntelligentRoadTest.day, item.esbh_name);
                    IntelligentRoadTest.loadGrid(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                    /*IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
                        [
                            {"key":"区域名称","val":item.esbh_name},
                            {"key":"区域编号","val":item.esbh_id},
                        ]
                    );*/

                    if (!IntelligentRoadTest.isScreenCompared && IntelligentRoadTest.isAddMessageEvent) {//不是在分屏页，并且点击过分屏
                        if (!windowScreeen.closed) {//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
                            // windowScreeen.focus();
                            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item, 'college');
                        }
                    }

                    // $('#concernHandleDescribe').val(item.handle_description);
                    if (IntelligentRoadTest.mapClick) {
                        IntelligentRoadTest.mapClick = false;
                    } else {
                        if ((item.audit_stat != '待审核' || item.audit_style != '删除') && !IntelligentRoadTest.isChangeDate) {//日期切换的时候不做任何定位和缩放
                            var zoom = getZoom(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu), zoom);
                        }else{
                            IntelligentRoadTest.isChangeDate = false;
                        }
                    }

                    // $("#colorBar").click();

                    var RecentCellImg = $("#showCollegeCompleteMessage").find('.linkCell').children('img');
                    $(RecentCellImg).each(function () {
                        var srcText = $(this).attr('src');
                        var clickImg = srcText.replace("nor", "click");
                        var norImg = srcText.replace("click", "nor");
                        if (srcText == clickImg) {
                            $(this).attr('src', norImg);
                        }
                    });
                    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                    var echartTitle = "历史30天覆盖变化";
                    // IntelligentRoadTest.getSense30DayLineData(1, item.esbh_id, item.city);//加载30天的折线图
                    IntelligentRoadTest.getSenseAllMR30DayData("高校",item.esbh_id , item.day , item.city, false); //加载30天的折线图
                    IntelligentRoadTest.getSenseAllMrData(item.day , "高校" , item.esbh_id ,item.city, false);
                    var nearTOP5 = [];
                    if (item.top5_sector_set != null && item.top5_sector_set != "") {
                        var to5DataArr = item.top5_sector_set.split("@");
                        for (var i = 0; i < to5DataArr.length; i++) {
                            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
                        }
                    }
                    var mrNearTOP5 = [];
                    if (item.sector_set != null && item.sector_set != "") {
                        var mrTo5DataArr = item.sector_set.split("@");
                        for (var k = 0; k < mrTo5DataArr.length; k++) {
                            mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
                        }
                    }
                    if (IntelligentRoadTest.checkIfHasSameSector(nearTOP5, mrNearTOP5)) {
                        item.isHasSameSector = true;
                    }
                    var nearPoorAreaList = []; //附近弱覆盖区域集合
                    if (item.poor_coverage_set != null && item.poor_coverage_set != '') {
                        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.nb_poor_coverage_set);
                    }
                    if (item.day != null && item.day.toString().indexOf("-") < 0) { //转换日期格式
                        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
                    }
                    var poorAreaList = [];//弱覆盖区域集合
                    if (item.poor_coverage_set != null && item.poor_coverage_set != '') {
                        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
                    }
//                    IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList,1);
                    IntelligentRoadTest.polygonList = [];
                    IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList, 2);

                    // 增加一个查询,获取图层的版本信息等
                    IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData(item, 1);
//                    var user_role = $('#user_role_List_string').val();

                    if (item.audit_style == '删除' && item.audit_stat == '审核通过') {
                        $("#showCollegeCompleteMessage").find('.systemLayerBottonLi').hide();
                        $("#showCollegeCompleteMessage").find('.systemLayerDelete').hide();
                        $("#showCollegeCompleteMessage").find('.systemLayerDeleteEnd').show();
                    } else {
                        if (IntelligentRoadTest.user_role.indexOf('审核员') < 0) {
                            $("#showCollegeCompleteMessage").find('.systemLayerBottonLi').hide();
                            $("#showCollegeCompleteMessage").find('.systemLayerDelete').hide();
                        } else {
                            $("#showCollegeCompleteMessage").find('.systemLayerBottonLi').show();
                            $("#showCollegeCompleteMessage").find('.systemLayerDelete').show();
                        }
                        $("#showCollegeCompleteMessage").find('.systemLayerDeleteEnd').hide();
                    }

                    $(".linkCell").attr("title", "显示连线");
                    $(".linkCell").removeClass("linkCellHover");
                    if (IntelligentRoadTest.collegeCompleteVM == null) {
                        IntelligentRoadTest.collegeCompleteVM = new Vue({
                            el: '#showCollegeCompleteMessage',
                            data: {
                                collegeData: item,
                                dataIndex: index,
                                nrTop5Cell: nearTOP5,
                                mrTop5Cell: mrNearTOP5,
                                title: echartTitle,
                                isShowAlarmInfo: IntelligentRoadTest.isShowAlarmInfoMessage,
                                alarm_dataObj: {}, //用于存放从告警表中获取到的指标的对象
                                alaram_title: "工单监测",
                                uname: IntelligentRoadTest.currentUser,
                                nearPoorAreaListData: nearPoorAreaList,
                                allMRDataList : []
                            },
                            methods: {
                                collegePosition: function (item) {
                                    var zoom = getZoom(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu), zoom);
                                },
                                viewCollegeLog: function (item) {
                                    IntelligentRoadTest.collegeLog(item);
                                },
                                showDetailInfo: function (event) {
                                    IntelligentRoadTest.showDetailInfo(event);
                                },
                                showLinkCell: function (event, item, type) {
                                    //type=1最近小区，type=2 接入扇区
                                    if ($(event.currentTarget).hasClass("linkCellHover")) {
                                        $(event.currentTarget).attr("title", "显示连线");
                                        $(event.currentTarget).removeClass("linkCellHover");
                                        if (type == 1) {
                                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                                        } else if (type == 2) {
                                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                                        }
                                    } else {
                                        $(event.currentTarget).attr("title", "隐藏连线");
                                        $(event.currentTarget).addClass("linkCellHover");
                                        var max_lng = item.longitude_max_baidu;
                                        var max_lat = item.latitude_max_baidu;
                                        var min_lng = item.longitude_min_baidu;
                                        var min_lat = item.latitude_min_baidu;
                                        var mid_lng = item.longitude_mid_baidu;
                                        var mid_lat = item.latitude_mid_baidu;
                                        var centerPoint = new BMap.Point(mid_lng, mid_lat);
                                        if (type == 1) {
                                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint, item.top5_sector_set);
                                        } else if (type == 2) {
                                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint, item.sector_set);
                                        }
                                    }
                                },
                                showLinkPoorArea: function (event, item, type) {
                                    IntelligentRoadTest.showLinkPoorArea(event, item, type);
                                },
                                gotoShowSectorMessage: function (sectorDate) {
                                    IntelligentRoadTest.clickType = 1;
                                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid, sectorDate.cellid, IntelligentRoadTest.day);
                                },
                                gotoKPIList: function (item) {
                                    if (item.sector_set != null) {
                                        var sectorArr = item.sector_set.split("@");
                                        showOrHideInputImage(2);
                                        IntelligentRoadTest.loadKPIListData(sectorArr);
                                        $("#kpiBackPoor").html("返回上一级");
                                    }
                                },
                                editSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.editSystemLayer(item, 1);
                                },
                                resetSystemLayer: function (item, event) {
                                    IntelligentRoadTest_SystemLayerEdit.resetSystemLayer(item, 1, event);
                                },
                                saveSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.saveSystemLayer(item, 1);
                                },
                                commitSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.commitSystemLayer(item, 1);
                                },
                                recoverSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer(item, 1);
                                },
                                deleteSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer(item, 1);
                                },
                                redrawSystemLayer: function (item, event) {
                                    IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer(item, 1, event);
                                },
                                cancelSystemLayer: function (item, event) {
                                    IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer(item, 1, event);
                                },
                                openScreenCompared: function (item) {
                                    IntelligentRoadTestScreenCompared.openScreenCompared(item, "college");
                                }, showPolygonGrid: function (item, event) {
                                    IntelligentRoadTest.showHidePolygonGrid(item, event);
                                }
                            }
                        });
                    } else {
                        IntelligentRoadTest.collegeCompleteVM.collegeData = item;
                        IntelligentRoadTest.collegeCompleteVM.dataIndex = index;
                        IntelligentRoadTest.collegeCompleteVM.nrTop5Cell = nearTOP5;
                        IntelligentRoadTest.collegeCompleteVM.mrTop5Cell = mrNearTOP5;
                        IntelligentRoadTest.collegeCompleteVM.nearPoorAreaListData = nearPoorAreaList;
                        IntelligentRoadTest.collegeCompleteVM.isShowAlarmInfo = IntelligentRoadTest.isShowAlarmInfoMessage;
                        // IntelligentRoadTest.collegeCompleteVM.title = echartTitle;
                    }

                },
                lastOrNext: function (type) {
                    if (type == 0) {
                        //上一页
                        if (IntelligentRoadTest.collegeCurrentPage > 1) {
                            IntelligentRoadTest.collegeCurrentPage = IntelligentRoadTest.collegeCurrentPage - 1;
                            IntelligentRoadTest.collegeVM.collegeList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.collegeCurrentResult, IntelligentRoadTest.collegeCurrentPage);
                            IntelligentRoadTest.collegeVM.currentPageNum = IntelligentRoadTest.collegeCurrentPage;
                            IntelligentRoadTest.collegeVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.collegeVM.lastIndex = IntelligentRoadTest.lastIndex;
                        } else {
                            alert("当前页是第一页");
                        }
                    } else {
                        if (IntelligentRoadTest.collegeCurrentPage < IntelligentRoadTest.collegeTotalPage) {
                            IntelligentRoadTest.collegeCurrentPage = IntelligentRoadTest.collegeCurrentPage + 1;
                            IntelligentRoadTest.collegeVM.collegeList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.collegeCurrentResult, IntelligentRoadTest.collegeCurrentPage);
                            IntelligentRoadTest.collegeVM.currentPageNum = IntelligentRoadTest.collegeCurrentPage;
                            IntelligentRoadTest.collegeVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.collegeVM.lastIndex = IntelligentRoadTest.lastIndex;
                        }
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.collegeVM.collegeList, 10);
                },
                gotoPage: function () {
                    var page = $("#collegePage").val();
                    page = parseInt(page);
                    if (page > 0 && page <= IntelligentRoadTest.collegeTotalPage) {
                        IntelligentRoadTest.collegeCurrentPage = page;
                        IntelligentRoadTest.collegeVM.collegeList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.collegeCurrentResult, IntelligentRoadTest.collegeCurrentPage);
                        IntelligentRoadTest.collegeVM.currentPageNum = IntelligentRoadTest.collegeCurrentPage;
                        IntelligentRoadTest.collegeVM.startIndex = IntelligentRoadTest.startIndex;
                        IntelligentRoadTest.collegeVM.lastIndex = IntelligentRoadTest.lastIndex;
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.collegeVM.collegeList, 10);
                },
                goLast: function () {
                    IntelligentRoadTest.collegeCurrentPage = IntelligentRoadTest.collegeTotalPage;
                    IntelligentRoadTest.collegeVM.collegeList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.collegeCurrentResult, IntelligentRoadTest.collegeCurrentPage);
                    IntelligentRoadTest.collegeVM.currentPageNum = IntelligentRoadTest.collegeCurrentPage;
                    IntelligentRoadTest.collegeVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.collegeVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.collegeVM.collegeList, 10);
                    $("#collegeCount").html("返回上一级(本页显示第" + IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex + "条的数据，共" + IntelligentRoadTest.collegeTotalCount + "条数据)");
                },
                goFirst: function () {
                    IntelligentRoadTest.collegeCurrentPage = 1;
                    IntelligentRoadTest.collegeVM.collegeList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.collegeCurrentResult, IntelligentRoadTest.collegeCurrentPage);
                    IntelligentRoadTest.collegeVM.currentPageNum = IntelligentRoadTest.collegeCurrentPage;
                    IntelligentRoadTest.collegeVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.collegeVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.collegeVM.collegeList, 10);
                    $("#collegeCount").html("返回上一级(本页显示第" + IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex + "条的数据，共" + IntelligentRoadTest.collegeTotalCount + "条数据)");
                },
                turnMk: function (index, item) {
                    for (var i = 0; i < IntelligentRoadTest.markerList.length; i++) {
                        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.markerList[i]);
                    }

                    for (var i = 0; i < IntelligentRoadTest.lngArr.length; i++) {
                        var lng = IntelligentRoadTest.lngArr[i];
                        var lat = IntelligentRoadTest.latArr[i];
                        var color = "#fff"
                        var img = "../js/IntelligentRoadTest/images/bg_num.png";
                        if (i == index) {
                            img = "../js/IntelligentRoadTest/images/maker2.png";
                            color = "black";
                            IntelligentRoadTest.openInfoWindow(lng, lat, item.esbh_name);
                        }
                        IntelligentRoadTest.addMk(lng, lat, img, i, color, item.esbh_name);
                        $("#showCollegeDiv").find(".listUL > li").eq(i).find(".numSpan").css("background", "url(../js/IntelligentRoadTest/images/bg_num.png)");
                        $("#showCollegeDiv").find(".listUL > li").eq(i).css("background", "#fff");
                    }
                    $("#showCollegeDiv").find(".listUL > li").eq(index).find(".numSpan").css("background", "url(../js/IntelligentRoadTest/images/maker2.png)");
                    $("#showCollegeDiv").find(".listUL > li").eq(index).css("background", "#f4f4f4");
                }
            }
        });
    } else { //改变数值
        IntelligentRoadTest.collegeVM.collegeList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.collegeCurrentResult, IntelligentRoadTest.collegeCurrentPage);
        IntelligentRoadTest.collegeVM.totalPages = IntelligentRoadTest.collegeTotalPage;
        IntelligentRoadTest.collegeVM.totalCounts = IntelligentRoadTest.collegeTotalCount;
        IntelligentRoadTest.collegeVM.currentPageNum = IntelligentRoadTest.collegeCurrentPage;
        IntelligentRoadTest.collegeVM.startIndex = IntelligentRoadTest.startIndex;
        IntelligentRoadTest.collegeVM.lastIndex = IntelligentRoadTest.lastIndex;
        if (IntelligentRoadTest.index == 10) {
            IntelligentRoadTest.drawMk(IntelligentRoadTest.collegeVM.collegeList, 10);
        }
        if (!$("#showCollegeCompleteMessage").is(":visible")) {
            // $("#collegeCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
            //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.collegeTotalCount +"条数据)");
        }
    }
    if (IntelligentRoadTest.currentLocation == "college") {
        IntelligentRoadTest.goCollegeCompleteMessage();
    }
}

//-----------------------------大型活动场馆列表开始-------------------------------------

IntelligentRoadTest.showSiteData = function IntelligentRoadTest_showSiteData(result) {
    IntelligentRoadTest.siteCurrentPage = 1;
    IntelligentRoadTest.siteTotalCount = result.length;
    var pageCount = result.length / IntelligentRoadTest.pageSize;
    if ((result.length % IntelligentRoadTest.pageSize) != 0) {
        IntelligentRoadTest.siteTotalPage = parseInt(pageCount) + 1; //总页数，没有整除时加上1
    } else {
        IntelligentRoadTest.siteTotalPage = pageCount;  //整除不用加1
    }

    if (IntelligentRoadTest.siteVM == null) {
        IntelligentRoadTest.siteVM = new Vue({
            el: '#showSiteDiv',
            data: {
                siteList: IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.siteCurrentResult, IntelligentRoadTest.siteCurrentPage),
                totalPages: IntelligentRoadTest.siteTotalPage,
                totalCounts: IntelligentRoadTest.siteTotalCount,
                currentPageNum: IntelligentRoadTest.siteCurrentPage,
                startIndex: IntelligentRoadTest.startIndex,
                lastIndex: IntelligentRoadTest.lastIndex,
                isAuditor: concernAreaShare.isAuditor
            },
            methods: {
                showMessage: function (item, index) {
                    IntelligentRoadTest.mkIndex = index;
                    IntelligentRoadTest.cacheItem = item;
                    //跳转到场馆详情
                    IntelligentRoadTest.goSiteCompleteMessage();
                    IntelligentRoadTest.removeEsbhPolyline();//清除附近弱区的多边形（工单监测）
                    if (item.alarm_id != null && item.alarm_id != '') { //判断该对象是否需要展示工单监测指标
                        IntelligentRoadTest.isShowAlarmInfoMessage = true;
                    }
                    /*else{
                        IntelligentRoadTest.isShowAlarmInfoMessage = false;
                    }*/
                    //增加查询工单指标的方法
                    if (IntelligentRoadTest.isShowAlarmInfoMessage == true) {
                        IntelligentRoadTest.getSenseObjectAlarmInfoData("天翼蓝鹰场馆", item.esbh_id, IntelligentRoadTest.day, item.poor_coverage_set);
                    }
                    IntelligentRoadTest.showPolygon(item.gis_data, undefined, "site", item.esbh_id, IntelligentRoadTest.day, item.esbh_name);
                    IntelligentRoadTest.loadGrid(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                    /* IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
                         [
                             {"key":"区域名称","val":item.esbh_name},
                             {"key":"区域编号","val":item.esbh_id},
                         ]
                     );*/

                    // $('#concernHandleDescribe').val(item.handle_description);
                    if (IntelligentRoadTest.mapClick) {
                        IntelligentRoadTest.mapClick = false;
                    } else {
                        if ((item.audit_stat != '待审核' || item.audit_style != '删除') && !IntelligentRoadTest.isChangeDate ) { //切换时间时不做定位
                            var zoom = getZoom(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu), zoom);
                        }else{
                            IntelligentRoadTest.isChangeDate = false;
                        }
                    }

                    // $("#colorBar").click();

                    var RecentCellImg = $("#showSiteCompleteMessage").find('.linkCell').children('img');
                    $(RecentCellImg).each(function () {
                        var srcText = $(this).attr('src');
                        var clickImg = srcText.replace("nor", "click");
                        var norImg = srcText.replace("click", "nor");
                        if (srcText == clickImg) {
                            $(this).attr('src', norImg);
                        }
                    });
                    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                    var echartTitle = "历史30天覆盖变化";
                    // IntelligentRoadTest.getSense30DayLineData(10, item.esbh_id, item.city);//加载30天的折线图
                    IntelligentRoadTest.getSenseAllMR30DayData("场馆",item.esbh_id , item.day , item.city, false); //加载30天的折线图
                    IntelligentRoadTest.getSenseAllMrData(item.day , "场馆" , item.esbh_id ,item.city, false);
                    var nearTOP5 = [];
                    if (item.top5_sector_set != null && item.top5_sector_set != "") {
                        var to5DataArr = item.top5_sector_set.split("@");
                        for (var i = 0; i < to5DataArr.length; i++) {
                            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
                        }
                    }
                    var mrNearTOP5 = [];
                    if (item.sector_set != null && item.sector_set != "") {
                        var mrTo5DataArr = item.sector_set.split("@");
                        for (var k = 0; k < mrTo5DataArr.length; k++) {
                            mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
                        }
                    }
                    if (IntelligentRoadTest.checkIfHasSameSector(nearTOP5, mrNearTOP5)) {
                        item.isHasSameSector = true;
                    }
                    var nearPoorAreaList = []; //附近弱覆盖区域集合
                    if (item.poor_coverage_set != null && item.poor_coverage_set != '') {
                        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.nb_poor_coverage_set);
                    }
                    if (item.day != null && item.day.toString().indexOf("-") < 0) { //转换日期格式
                        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
                    }
                    var poorAreaList = [];//弱覆盖区域集合
                    if (item.poor_coverage_set != null && item.poor_coverage_set != '') {
                        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
                    }
//                    IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList,1);
                    IntelligentRoadTest.polygonList = [];
                    IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList, 2);

                    if (!IntelligentRoadTest.isScreenCompared && IntelligentRoadTest.isAddMessageEvent) {//不是在分屏页，并且点击过分屏
                        if (!windowScreeen.closed) {//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
                            // windowScreeen.focus();
                            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item, 'site');
                        }
                    }


                    $(".linkCell").attr("title", "显示连线");
                    $(".linkCell").removeClass("linkCellHover");

                    // 增加一个查询,获取图层的版本信息等
                    IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData(item, 10);
//                    var user_role = $('#user_role_List_string').val();

                    if (item.audit_style == '删除' && item.audit_stat == '审核通过') {
                        $("#showSiteCompleteMessage").find('.systemLayerBottonLi').hide();
                        $("#showSiteCompleteMessage").find('.systemLayerDelete').hide();
                        $("#showSiteCompleteMessage").find('.systemLayerDeleteEnd').show();
                    } else {
                        if (IntelligentRoadTest.user_role.indexOf('审核员') < 0) {
                            $("#showSiteCompleteMessage").find('.systemLayerBottonLi').hide();
                            $("#showSiteCompleteMessage").find('.systemLayerDelete').hide();
                        } else {
                            $("#showSiteCompleteMessage").find('.systemLayerBottonLi').show();
                            $("#showSiteCompleteMessage").find('.systemLayerDelete').show();
                        }
                        $("#showSiteCompleteMessage").find('.systemLayerDeleteEnd').hide();
                    }
                    if (IntelligentRoadTest.siteCompleteVM == null) {
                        IntelligentRoadTest.siteCompleteVM = new Vue({
                            el: '#showSiteCompleteMessage',
                            data: {
                                siteData: item,
                                dataIndex: index,
                                nrTop5Cell: nearTOP5,
                                mrTop5Cell: mrNearTOP5,
                                title: echartTitle,
                                isShowAlarmInfo: IntelligentRoadTest.isShowAlarmInfoMessage,
                                alarm_dataObj: {}, //用于存放从告警表中获取到的指标的对象
                                alaram_title: "工单监测",
                                uname: IntelligentRoadTest.currentUser,
                                nearPoorAreaListData: nearPoorAreaList,
                                allMRDataList : []
                            },
                            methods: {
                                sitePosition: function (item) {
                                    var zoom = getZoom(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu), zoom);
                                    // IntelligentRoadTest.sitePositiong(item);
                                },
                                viewSiteLog: function (item) {
                                    IntelligentRoadTest.siteLog(item);
                                },
                                showDetailInfo: function (event) {
                                    IntelligentRoadTest.showDetailInfo(event);
                                },
                                showLinkCell: function (event, item, type) {
                                    //type=1最近小区，type=2 接入扇区
                                    if ($(event.currentTarget).hasClass("linkCellHover")) {
                                        $(event.currentTarget).attr("title", "显示连线");
                                        $(event.currentTarget).removeClass("linkCellHover");
                                        if (type == 1) {
                                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                                        } else if (type == 2) {
                                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                                        }
                                    } else {
                                        $(event.currentTarget).attr("title", "隐藏连线");
                                        $(event.currentTarget).addClass("linkCellHover");
                                        var max_lng = item.longitude_max_baidu;
                                        var max_lat = item.latitude_max_baidu;
                                        var min_lng = item.longitude_min_baidu;
                                        var min_lat = item.latitude_min_baidu;
                                        var mid_lng = item.longitude_mid_baidu;
                                        var mid_lat = item.latitude_mid_baidu;
                                        var centerPoint = new BMap.Point(mid_lng, mid_lat);
                                        if (type == 1) {
                                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint, item.top5_sector_set);
                                        } else if (type == 2) {
                                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint, item.sector_set);
                                        }
                                    }
                                },
                                showLinkPoorArea: function (event, item, type) {
                                    IntelligentRoadTest.showLinkPoorArea(event, item, type);
                                },
                                gotoShowSectorMessage: function (sectorDate) {
                                    IntelligentRoadTest.clickType = 1;
                                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid, sectorDate.cellid, IntelligentRoadTest.day);
                                },
                                gotoKPIList: function (item) {
                                    if (item.sector_set != null) {
                                        var sectorArr = item.sector_set.split("@");
                                        showOrHideInputImage(2);
                                        IntelligentRoadTest.loadKPIListData(sectorArr);
                                        $("#kpiBackPoor").html("返回上一级");
                                    }
                                },
                                editSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.editSystemLayer(item, 10);
                                },
                                resetSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.resetSystemLayer(item, 10);
                                },
                                saveSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.saveSystemLayer(item, 10);
                                },
                                commitSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.commitSystemLayer(item, 10);
                                },
                                recoverSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer(item, 10);
                                },
                                deleteSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer(item, 10);
                                },
                                redrawSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer(item, 10, event);
                                },
                                cancelSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer(item, 10, event);
                                },
                                showPolygonGrid: function (item, event) {
                                    IntelligentRoadTest.showHidePolygonGrid(item, event);
                                }
                            }
                        });
                    } else {
                        IntelligentRoadTest.siteCompleteVM.siteData = item;
                        IntelligentRoadTest.siteCompleteVM.dataIndex = index;
                        IntelligentRoadTest.siteCompleteVM.nrTop5Cell = nearTOP5;
                        IntelligentRoadTest.siteCompleteVM.mrTop5Cell = mrNearTOP5;
                        IntelligentRoadTest.siteCompleteVM.nearPoorAreaListData = nearPoorAreaList;
                        IntelligentRoadTest.siteCompleteVM.isShowAlarmInfo = IntelligentRoadTest.isShowAlarmInfoMessage;
                        // IntelligentRoadTest.siteCompleteVM.title = echartTitle;
                    }


                },
                lastOrNext: function (type) {
                    if (type == 0) {
                        //上一页
                        if (IntelligentRoadTest.siteCurrentPage > 1) {
                            IntelligentRoadTest.siteCurrentPage = IntelligentRoadTest.siteCurrentPage - 1;
                            IntelligentRoadTest.siteVM.siteList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.siteCurrentResult, IntelligentRoadTest.siteCurrentPage);
                            IntelligentRoadTest.siteVM.currentPageNum = IntelligentRoadTest.siteCurrentPage;
                            IntelligentRoadTest.siteVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.siteVM.lastIndex = IntelligentRoadTest.lastIndex;
                        } else {
                            alert("当前页是第一页");
                        }
                    } else {
                        if (IntelligentRoadTest.siteCurrentPage < IntelligentRoadTest.siteTotalPage) {
                            IntelligentRoadTest.siteCurrentPage = IntelligentRoadTest.siteCurrentPage + 1;
                            IntelligentRoadTest.siteVM.siteList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.siteCurrentResult, IntelligentRoadTest.siteCurrentPage);
                            IntelligentRoadTest.siteVM.currentPageNum = IntelligentRoadTest.siteCurrentPage;
                            IntelligentRoadTest.siteVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.siteVM.lastIndex = IntelligentRoadTest.lastIndex;
                        }
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.siteVM.siteList, 10);
                },
                gotoPage: function () {
                    var page = $("#sitePage").val();
                    page = parseInt(page);
                    if (page > 0 && page <= IntelligentRoadTest.siteTotalPage) {
                        IntelligentRoadTest.siteCurrentPage = page;
                        IntelligentRoadTest.siteVM.siteList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.siteCurrentResult, IntelligentRoadTest.siteCurrentPage);
                        IntelligentRoadTest.siteVM.currentPageNum = IntelligentRoadTest.siteCurrentPage;
                        IntelligentRoadTest.siteVM.startIndex = IntelligentRoadTest.startIndex;
                        IntelligentRoadTest.siteVM.lastIndex = IntelligentRoadTest.lastIndex;
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.siteVM.siteList, 10);
                },
                goLast: function () {
                    IntelligentRoadTest.siteCurrentPage = IntelligentRoadTest.siteTotalPage;
                    IntelligentRoadTest.siteVM.siteList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.siteCurrentResult, IntelligentRoadTest.siteCurrentPage);
                    IntelligentRoadTest.siteVM.currentPageNum = IntelligentRoadTest.siteCurrentPage;
                    IntelligentRoadTest.siteVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.siteVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.siteVM.siteList, 10);
                    $("#siteCount").html("返回上一级(本页显示第" + IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex + "条的数据，共" + IntelligentRoadTest.siteTotalCount + "条数据)");
                },
                goFirst: function () {
                    IntelligentRoadTest.siteCurrentPage = 1;
                    IntelligentRoadTest.siteVM.siteList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.siteCurrentResult, IntelligentRoadTest.siteCurrentPage);
                    IntelligentRoadTest.siteVM.currentPageNum = IntelligentRoadTest.siteCurrentPage;
                    IntelligentRoadTest.siteVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.siteVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.siteVM.siteList, 10);
                    $("#siteCount").html("返回上一级(本页显示第" + IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex + "条的数据，共" + IntelligentRoadTest.siteTotalCount + "条数据)");
                },
                turnMk: function (index, item) {
                    for (var i = 0; i < IntelligentRoadTest.markerList.length; i++) {
                        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.markerList[i]);
                    }

                    for (var i = 0; i < IntelligentRoadTest.lngArr.length; i++) {
                        var lng = IntelligentRoadTest.lngArr[i];
                        var lat = IntelligentRoadTest.latArr[i];
                        var color = "#fff"
                        var img = "../js/IntelligentRoadTest/images/bg_num.png";
                        if (i == index) {
                            img = "../js/IntelligentRoadTest/images/maker2.png";
                            color = "black";
                            IntelligentRoadTest.openInfoWindow(lng, lat, item.esbh_name);
                        }
                        IntelligentRoadTest.addMk(lng, lat, img, i, color, item.esbh_name);
                        $("#showSiteDiv").find(".listUL > li").eq(i).find(".numSpan").css("background", "url(../js/IntelligentRoadTest/images/bg_num.png)");
                        $("#showSiteDiv").find(".listUL > li").eq(i).css("background", "#fff");
                    }
                    $("#showSiteDiv").find(".listUL > li").eq(index).find(".numSpan").css("background", "url(../js/IntelligentRoadTest/images/maker2.png)");
                    $("#showSiteDiv").find(".listUL > li").eq(index).css("background", "#f4f4f4");
                }
            }
        });
    } else { //改变数值
        IntelligentRoadTest.siteVM.siteList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.siteCurrentResult, IntelligentRoadTest.siteCurrentPage);
        IntelligentRoadTest.siteVM.totalPages = IntelligentRoadTest.siteTotalPage;
        IntelligentRoadTest.siteVM.totalCounts = IntelligentRoadTest.siteTotalCount;
        IntelligentRoadTest.siteVM.currentPageNum = IntelligentRoadTest.siteCurrentPage;
        IntelligentRoadTest.siteVM.startIndex = IntelligentRoadTest.startIndex;
        IntelligentRoadTest.siteVM.lastIndex = IntelligentRoadTest.lastIndex;
        if (IntelligentRoadTest.index == 19) {
            IntelligentRoadTest.drawMk(IntelligentRoadTest.siteVM.siteList, 19);
        }
        if (!$("#showSiteCompleteMessage").is(":visible")) {
            // $("#siteCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
            //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.siteTotalCount +"条数据)");
        }
    }
    if (IntelligentRoadTest.currentLocation == "site") {
        IntelligentRoadTest.goSiteCompleteMessage();
    }
}

//----------------------------大型活动场馆列表结束 ----------------------------------------

//-----------------------------美食列表开始-------------------------------------

IntelligentRoadTest.showFoodData = function IntelligentRoadTest_showFoodData(result) {
    IntelligentRoadTest.foodCurrentPage = 1;
    IntelligentRoadTest.foodTotalCount = result.length;
    var pageCount = result.length / IntelligentRoadTest.pageSize;
    if ((result.length % IntelligentRoadTest.pageSize) != 0) {
        IntelligentRoadTest.foodTotalPage = parseInt(pageCount) + 1; //总页数，没有整除时加上1
    } else {
        IntelligentRoadTest.foodTotalPage = pageCount;  //整除不用加1
    }

    if (IntelligentRoadTest.foodVM == null) {
        IntelligentRoadTest.foodVM = new Vue({
            el: '#showFoodDiv',
            data: {
                foodList: IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.foodCurrentResult, IntelligentRoadTest.foodCurrentPage),
                totalPages: IntelligentRoadTest.foodTotalPage,
                totalCounts: IntelligentRoadTest.foodTotalCount,
                currentPageNum: IntelligentRoadTest.foodCurrentPage,
                startIndex: IntelligentRoadTest.startIndex,
                lastIndex: IntelligentRoadTest.lastIndex,
                isAuditor: concernAreaShare.isAuditor
            },
            methods: {
                showMessage: function (item, index) {
                    IntelligentRoadTest.mkIndex = index;
                    IntelligentRoadTest.cacheItem = item;
                    //跳转到美食详情
                    IntelligentRoadTest.goFoodCompleteMessage();
                    IntelligentRoadTest.removeEsbhPolyline();//清除附近弱区的多边形（工单监测）
                    if (item.alarm_id != null && item.alarm_id != '') { //判断该对象是否需要展示工单监测指标
                        IntelligentRoadTest.isShowAlarmInfoMessage = true;
                    }
                    /*else{
                        IntelligentRoadTest.isShowAlarmInfoMessage = false;
                    }*/
                    //增加查询工单指标的方法
                    if (IntelligentRoadTest.isShowAlarmInfoMessage == true) {
                        IntelligentRoadTest.getSenseObjectAlarmInfoData("天翼蓝鹰美食", item.esbh_id, IntelligentRoadTest.day, item.poor_coverage_set);
                    }
                    IntelligentRoadTest.showPolygon(item.gis_data, undefined, "food", item.esbh_id, IntelligentRoadTest.day, item.esbh_name);
                    IntelligentRoadTest.loadGrid(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                    /* IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
                         [
                             {"key":"区域名称","val":item.esbh_name},
                             {"key":"区域编号","val":item.esbh_id},
                         ]
                     );*/

                    // $('#concernHandleDescribe').val(item.handle_description);
                    if (IntelligentRoadTest.mapClick) {
                        IntelligentRoadTest.mapClick = false;
                    } else {
                        if ((item.audit_stat != '待审核' || item.audit_style != '删除') && !IntelligentRoadTest.isChangeDate ) { //切换时间时不做定位
                            var zoom = getZoom(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu), zoom);
                        }else{
                            IntelligentRoadTest.isChangeDate = false;
                        }
                    }

                    if (!IntelligentRoadTest.isScreenCompared && IntelligentRoadTest.isAddMessageEvent) {//不是在分屏页，并且点击过分屏
                        if (!windowScreeen.closed) {//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
                            // windowScreeen.focus();
                            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item, 'food');
                        }
                    }
                    // $("#colorBar").click();

                    var RecentCellImg = $("#showFoodCompleteMessage").find('.linkCell').children('img');
                    $(RecentCellImg).each(function () {
                        var srcText = $(this).attr('src');
                        var clickImg = srcText.replace("nor", "click");
                        var norImg = srcText.replace("click", "nor");
                        if (srcText == clickImg) {
                            $(this).attr('src', norImg);
                        }
                    });
                    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                    var echartTitle = "历史30天覆盖变化";
                    // IntelligentRoadTest.getSense30DayLineData(9, item.esbh_id, item.city);//加载30天的折线图
                    IntelligentRoadTest.getSenseAllMR30DayData("美食",item.esbh_id , item.day , item.city, false); //加载30天的折线图
                    IntelligentRoadTest.getSenseAllMrData(item.day , "美食" , item.esbh_id ,item.city, false);
                    var nearTOP5 = [];
                    if (item.top5_sector_set != null && item.top5_sector_set != "") {
                        var to5DataArr = item.top5_sector_set.split("@");
                        for (var i = 0; i < to5DataArr.length; i++) {
                            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
                        }
                    }
                    var mrNearTOP5 = [];
                    if (item.sector_set != null && item.sector_set != "") {
                        var mrTo5DataArr = item.sector_set.split("@");
                        for (var k = 0; k < mrTo5DataArr.length; k++) {
                            mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
                        }
                    }
                    if (IntelligentRoadTest.checkIfHasSameSector(nearTOP5, mrNearTOP5)) {
                        item.isHasSameSector = true;
                    }
                    var nearPoorAreaList = []; //附近弱覆盖区域集合
                    if (item.poor_coverage_set != null && item.poor_coverage_set != '') {
                        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.nb_poor_coverage_set);
                    }
                    if (item.day != null && item.day.toString().indexOf("-") < 0) { //转换日期格式
                        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
                    }
                    var poorAreaList = [];//弱覆盖区域集合
                    if (item.poor_coverage_set != null && item.poor_coverage_set != '') {
                        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
                    }
//                    IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList,1);
                    IntelligentRoadTest.polygonList = [];
                    IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList, 2);


                    $(".linkCell").attr("title", "显示连线");
                    $(".linkCell").removeClass("linkCellHover");
                    // 增加一个查询,获取图层的版本信息等
                    IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData(item, 9);
//                    var user_role = $('#user_role_List_string').val();

                    if (item.audit_style == '删除' && item.audit_stat == '审核通过') {
                        $("#showFoodCompleteMessage").find('.systemLayerBottonLi').hide();
                        $("#showFoodCompleteMessage").find('.systemLayerDelete').hide();
                        $("#showFoodCompleteMessage").find('.systemLayerDeleteEnd').show();
                    } else {
                        if (IntelligentRoadTest.user_role.indexOf('审核员') < 0) {
                            $("#showFoodCompleteMessage").find('.systemLayerBottonLi').hide();
                            $("#showFoodCompleteMessage").find('.systemLayerDelete').hide();
                        } else {
                            $("#showFoodCompleteMessage").find('.systemLayerBottonLi').show();
                            $("#showFoodCompleteMessage").find('.systemLayerDelete').show();
                        }
                        $("#showFoodCompleteMessage").find('.systemLayerDeleteEnd').hide();
                    }
                    if (IntelligentRoadTest.foodCompleteVM == null) {
                        IntelligentRoadTest.foodCompleteVM = new Vue({
                            el: '#showFoodCompleteMessage',
                            data: {
                                foodData: item,
                                dataIndex: index,
                                nrTop5Cell: nearTOP5,
                                mrTop5Cell: mrNearTOP5,
                                title: echartTitle,
                                isShowAlarmInfo: IntelligentRoadTest.isShowAlarmInfoMessage,
                                alarm_dataObj: {}, //用于存放从告警表中获取到的指标的对象
                                alaram_title: "工单监测",
                                uname: IntelligentRoadTest.currentUser,
                                nearPoorAreaListData: nearPoorAreaList,
                                allMRDataList : []
                            },
                            methods: {
                                foodPosition: function (item) {
                                    // IntelligentRoadTest.foodPositiong(item);
                                    var zoom = getZoom(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu), zoom);
                                },
                                viewFoodLog: function (item) {
                                    IntelligentRoadTest.foodLog(item);
                                },
                                showDetailInfo: function (event) {
                                    IntelligentRoadTest.showDetailInfo(event);
                                },
                                showLinkCell: function (event, item, type) {
                                    //type=1最近小区，type=2 接入扇区
                                    if ($(event.currentTarget).hasClass("linkCellHover")) {
                                        $(event.currentTarget).attr("title", "显示连线");
                                        $(event.currentTarget).removeClass("linkCellHover");
                                        if (type == 1) {
                                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                                        } else if (type == 2) {
                                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                                        }
                                    } else {
                                        $(event.currentTarget).attr("title", "隐藏连线");
                                        $(event.currentTarget).addClass("linkCellHover");
                                        var max_lng = item.longitude_max_baidu;
                                        var max_lat = item.latitude_max_baidu;
                                        var min_lng = item.longitude_min_baidu;
                                        var min_lat = item.latitude_min_baidu;
                                        var mid_lng = item.longitude_mid_baidu;
                                        var mid_lat = item.latitude_mid_baidu;
                                        var centerPoint = new BMap.Point(mid_lng, mid_lat);
                                        if (type == 1) {
                                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint, item.top5_sector_set);
                                        } else if (type == 2) {
                                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint, item.sector_set);
                                        }
                                    }
                                },
                                showLinkPoorArea: function (event, item, type) {
                                    IntelligentRoadTest.showLinkPoorArea(event, item, type);
                                },
                                gotoShowSectorMessage: function (sectorDate) {
                                    IntelligentRoadTest.clickType = 1;
                                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid, sectorDate.cellid, IntelligentRoadTest.day);
                                },
                                gotoKPIList: function (item) {
                                    if (item.sector_set != null) {
                                        var sectorArr = item.sector_set.split("@");
                                        showOrHideInputImage(2);
                                        IntelligentRoadTest.loadKPIListData(sectorArr);
                                        $("#kpiBackPoor").html("返回上一级");
                                    }
                                },
                                editSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.editSystemLayer(item, 9);
                                },
                                resetSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.resetSystemLayer(item, 9);
                                },
                                saveSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.saveSystemLayer(item, 9);
                                },
                                commitSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.commitSystemLayer(item, 9);
                                },
                                recoverSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer(item, 9);
                                },
                                deleteSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer(item, 9);
                                },
                                redrawSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer(item, 9, event);
                                },
                                cancelSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer(item, 9, event);
                                },
                                showPolygonGrid: function (item, event) {
                                    IntelligentRoadTest.showHidePolygonGrid(item, event);
                                }
                            }
                        });
                    } else {
                        IntelligentRoadTest.foodCompleteVM.foodData = item;
                        IntelligentRoadTest.foodCompleteVM.dataIndex = index;
                        IntelligentRoadTest.foodCompleteVM.nrTop5Cell = nearTOP5;
                        IntelligentRoadTest.foodCompleteVM.mrTop5Cell = mrNearTOP5;
                        IntelligentRoadTest.foodCompleteVM.nearPoorAreaListData = nearPoorAreaList;
                        IntelligentRoadTest.foodCompleteVM.isShowAlarmInfo = IntelligentRoadTest.isShowAlarmInfoMessage;
                        // IntelligentRoadTest.foodCompleteVM.title = echartTitle;
                    }

                },
                lastOrNext: function (type) {
                    if (type == 0) {
                        //上一页
                        if (IntelligentRoadTest.foodCurrentPage > 1) {
                            IntelligentRoadTest.foodCurrentPage = IntelligentRoadTest.foodCurrentPage - 1;
                            IntelligentRoadTest.foodVM.foodList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.foodCurrentResult, IntelligentRoadTest.foodCurrentPage);
                            IntelligentRoadTest.foodVM.currentPageNum = IntelligentRoadTest.foodCurrentPage;
                            IntelligentRoadTest.foodVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.foodVM.lastIndex = IntelligentRoadTest.lastIndex;
                        } else {
                            alert("当前页是第一页");
                        }
                    } else {
                        if (IntelligentRoadTest.foodCurrentPage < IntelligentRoadTest.foodTotalPage) {
                            IntelligentRoadTest.foodCurrentPage = IntelligentRoadTest.foodCurrentPage + 1;
                            IntelligentRoadTest.foodVM.foodList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.foodCurrentResult, IntelligentRoadTest.foodCurrentPage);
                            IntelligentRoadTest.foodVM.currentPageNum = IntelligentRoadTest.foodCurrentPage;
                            IntelligentRoadTest.foodVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.foodVM.lastIndex = IntelligentRoadTest.lastIndex;
                        }
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.foodVM.foodList, 10);
                },
                gotoPage: function () {
                    var page = $("#foodPage").val();
                    page = parseInt(page);
                    if (page > 0 && page <= IntelligentRoadTest.foodTotalPage) {
                        IntelligentRoadTest.foodCurrentPage = page;
                        IntelligentRoadTest.foodVM.foodList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.foodCurrentResult, IntelligentRoadTest.foodCurrentPage);
                        IntelligentRoadTest.foodVM.currentPageNum = IntelligentRoadTest.foodCurrentPage;
                        IntelligentRoadTest.foodVM.startIndex = IntelligentRoadTest.startIndex;
                        IntelligentRoadTest.foodVM.lastIndex = IntelligentRoadTest.lastIndex;
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.foodVM.foodList, 10);
                },
                goLast: function () {
                    IntelligentRoadTest.foodCurrentPage = IntelligentRoadTest.foodTotalPage;
                    IntelligentRoadTest.foodVM.foodList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.foodCurrentResult, IntelligentRoadTest.foodCurrentPage);
                    IntelligentRoadTest.foodVM.currentPageNum = IntelligentRoadTest.foodCurrentPage;
                    IntelligentRoadTest.foodVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.foodVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.foodVM.foodList, 10);
                    $("#foodCount").html("返回上一级(本页显示第" + IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex + "条的数据，共" + IntelligentRoadTest.foodTotalCount + "条数据)");
                },
                goFirst: function () {
                    IntelligentRoadTest.foodCurrentPage = 1;
                    IntelligentRoadTest.foodVM.foodList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.foodCurrentResult, IntelligentRoadTest.foodCurrentPage);
                    IntelligentRoadTest.foodVM.currentPageNum = IntelligentRoadTest.foodCurrentPage;
                    IntelligentRoadTest.foodVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.foodVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.foodVM.foodList, 10);
                    $("#foodCount").html("返回上一级(本页显示第" + IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex + "条的数据，共" + IntelligentRoadTest.foodTotalCount + "条数据)");
                },
                turnMk: function (index, item) {
                    for (var i = 0; i < IntelligentRoadTest.markerList.length; i++) {
                        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.markerList[i]);
                    }

                    for (var i = 0; i < IntelligentRoadTest.lngArr.length; i++) {
                        var lng = IntelligentRoadTest.lngArr[i];
                        var lat = IntelligentRoadTest.latArr[i];
                        var color = "#fff"
                        var img = "../js/IntelligentRoadTest/images/bg_num.png";
                        if (i == index) {
                            img = "../js/IntelligentRoadTest/images/maker2.png";
                            color = "black";
                            IntelligentRoadTest.openInfoWindow(lng, lat, item.esbh_name);
                        }
                        IntelligentRoadTest.addMk(lng, lat, img, i, color, item.esbh_name);
                        $("#showFoodDiv").find(".listUL > li").eq(i).find(".numSpan").css("background", "url(../js/IntelligentRoadTest/images/bg_num.png)");
                        $("#showFoodDiv").find(".listUL > li").eq(i).css("background", "#fff");
                    }
                    $("#showFoodDiv").find(".listUL > li").eq(index).find(".numSpan").css("background", "url(../js/IntelligentRoadTest/images/maker2.png)");
                    $("#showFoodDiv").find(".listUL > li").eq(index).css("background", "#f4f4f4");
                }
            }
        });
    } else { //改变数值
        IntelligentRoadTest.foodVM.foodList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.foodCurrentResult, IntelligentRoadTest.foodCurrentPage);
        IntelligentRoadTest.foodVM.totalPages = IntelligentRoadTest.foodTotalPage;
        IntelligentRoadTest.foodVM.totalCounts = IntelligentRoadTest.foodTotalCount;
        IntelligentRoadTest.foodVM.currentPageNum = IntelligentRoadTest.foodCurrentPage;
        IntelligentRoadTest.foodVM.startIndex = IntelligentRoadTest.startIndex;
        IntelligentRoadTest.foodVM.lastIndex = IntelligentRoadTest.lastIndex;
        if (IntelligentRoadTest.index == 18) {
            IntelligentRoadTest.drawMk(IntelligentRoadTest.foodVM.foodList, 18);
        }
        if (!$("#showFoodCompleteMessage").is(":visible")) {
            // $("#foodCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
            //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.foodTotalCount +"条数据)");
        }
    }
    if (IntelligentRoadTest.currentLocation == "food") {
        IntelligentRoadTest.goFoodCompleteMessage();
    }
}

//----------------------------美食列表结束 ----------------------------------------

//-----------------------------高密度住宅区列表开始-------------------------------------

IntelligentRoadTest.showUptownData = function IntelligentRoadTest_showUptownData(result) {
    IntelligentRoadTest.uptownCurrentPage = 1;
    IntelligentRoadTest.uptownTotalCount = result.length;
    var pageCount = result.length / IntelligentRoadTest.pageSize;
    if ((result.length % IntelligentRoadTest.pageSize) != 0) {
        IntelligentRoadTest.uptownTotalPage = parseInt(pageCount) + 1; //总页数，没有整除时加上1
    } else {
        IntelligentRoadTest.uptownTotalPage = pageCount;  //整除不用加1
    }

    if (IntelligentRoadTest.uptownVM == null) {
        IntelligentRoadTest.uptownVM = new Vue({
            el: '#showUptownDiv',
            data: {
                uptownList: IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.uptownCurrentResult, IntelligentRoadTest.uptownCurrentPage),
                totalPages: IntelligentRoadTest.uptownTotalPage,
                totalCounts: IntelligentRoadTest.uptownTotalCount,
                currentPageNum: IntelligentRoadTest.uptownCurrentPage,
                startIndex: IntelligentRoadTest.startIndex,
                lastIndex: IntelligentRoadTest.lastIndex,
                isAuditor: concernAreaShare.isAuditor
            },
            methods: {
                showMessage: function (item, index) {
                    IntelligentRoadTest.mkIndex = index;
                    IntelligentRoadTest.cacheItem = item;
                    //跳转到高密度住宅区详情
                    IntelligentRoadTest.goUptownCompleteMessage();
                    IntelligentRoadTest.removeEsbhPolyline();//清除附近弱区的多边形（工单监测）
                    if (item.alarm_id != null && item.alarm_id != '') { //判断该对象是否需要展示工单监测指标
                        IntelligentRoadTest.isShowAlarmInfoMessage = true;
                    }
                    /*else{
                        IntelligentRoadTest.isShowAlarmInfoMessage = false;
                    }*/
                    //增加查询工单指标的方法
                    if (IntelligentRoadTest.isShowAlarmInfoMessage == true) {
                        IntelligentRoadTest.getSenseObjectAlarmInfoData("天翼蓝鹰高密度住宅区", item.esbh_id, IntelligentRoadTest.day, item.poor_coverage_set);
                    }
                    IntelligentRoadTest.showPolygon(item.gis_data, undefined, "uptown", item.esbh_id, IntelligentRoadTest.day, item.esbh_name);
                    IntelligentRoadTest.loadGrid(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                    /*IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
                        [
                            {"key":"区域名称","val":item.esbh_name},
                            {"key":"区域编号","val":item.esbh_id},
                        ]
                    );*/

                    // $('#concernHandleDescribe').val(item.handle_description);
                    if (IntelligentRoadTest.mapClick) {
                        IntelligentRoadTest.mapClick = false;
                    } else {
                        if ((item.audit_stat != '待审核' || item.audit_style != '删除') && !IntelligentRoadTest.isChangeDate ) { //切换时间时不做定位
                            var zoom = getZoom(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu), zoom);
                        }else{
                            IntelligentRoadTest.isChangeDate = false;
                        }
                    }

                    if (!IntelligentRoadTest.isScreenCompared && IntelligentRoadTest.isAddMessageEvent) {//不是在分屏页，并且点击过分屏
                        if (!windowScreeen.closed) {//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
                            // windowScreeen.focus();
                            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item, 'uptown');
                        }
                    }
                    // $("#colorBar").click();

                    var RecentCellImg = $("#showUptownCompleteMessage").find('.linkCell').children('img');
                    $(RecentCellImg).each(function () {
                        var srcText = $(this).attr('src');
                        var clickImg = srcText.replace("nor", "click");
                        var norImg = srcText.replace("click", "nor");
                        if (srcText == clickImg) {
                            $(this).attr('src', norImg);
                        }
                    });
                    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();

                    var echartTitle = "历史30天覆盖变化";
                    // IntelligentRoadTest.getSense30DayLineData(2, item.esbh_id, item.city);//加载30天的折线图
                    IntelligentRoadTest.getSenseAllMR30DayData("高密度住宅区",item.esbh_id , item.day , item.city, false); //加载30天的折线图
                    IntelligentRoadTest.getSenseAllMrData(item.day , "高密度住宅区" , item.esbh_id ,item.city, false);
                    var nearTOP5 = [];
                    if (item.top5_sector_set != null && item.top5_sector_set != "") {
                        var to5DataArr = item.top5_sector_set.split("@");
                        for (var i = 0; i < to5DataArr.length; i++) {
                            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
                        }
                    }
                    var mrNearTOP5 = [];
                    if (item.sector_set != null && item.sector_set != "") {
                        var mrTo5DataArr = item.sector_set.split("@");
                        for (var k = 0; k < mrTo5DataArr.length; k++) {
                            mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
                        }
                    }
                    if (IntelligentRoadTest.checkIfHasSameSector(nearTOP5, mrNearTOP5)) {
                        item.isHasSameSector = true;
                    }
                    var nearPoorAreaList = []; //附近弱覆盖区域集合
                    if (item.poor_coverage_set != null && item.poor_coverage_set != '') {
                        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.nb_poor_coverage_set);
                    }
                    var poorAreaList = [];//弱覆盖区域集合
                    if (item.poor_coverage_set != null && item.poor_coverage_set != '') {
                        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
                    }
//                    IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList,1);
                    IntelligentRoadTest.polygonList = [];
                    IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList, 2);

                    if (item.day != null && item.day.toString().indexOf("-") < 0) { //转换日期格式
                        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
                    }


//                  增加一个查询,获取图层的版本信息等
                    IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData(item, 2);
//                    var user_role = $('#user_role_List_string').val();

                    if (item.audit_style == '删除' && item.audit_stat == '审核通过') {
                        $("#showUptownCompleteMessage").find('.systemLayerBottonLi').hide();
                        $("#showUptownCompleteMessage").find('.systemLayerDelete').hide();
                        $("#showUptownCompleteMessage").find('.systemLayerDeleteEnd').show();
                    } else {
                        if (IntelligentRoadTest.user_role.indexOf('审核员') < 0) {
                            $("#showUptownCompleteMessage").find('.systemLayerBottonLi').hide();
                            $("#showUptownCompleteMessage").find('.systemLayerDelete').hide();
                        } else {
                            $("#showUptownCompleteMessage").find('.systemLayerBottonLi').show();
                            $("#showUptownCompleteMessage").find('.systemLayerDelete').show();
                        }
                        $("#showUptownCompleteMessage").find('.systemLayerDeleteEnd').hide();
                    }
                    $(".linkCell").attr("title", "显示连线");
                    $(".linkCell").removeClass("linkCellHover");
                    if (IntelligentRoadTest.uptownCompleteVM == null) {
                        IntelligentRoadTest.uptownCompleteVM = new Vue({
                            el: '#showUptownCompleteMessage',
                            data: {
                                uptownData: item,
                                dataIndex: index,
                                nrTop5Cell: nearTOP5,
                                mrTop5Cell: mrNearTOP5,
                                title: echartTitle,
                                isShowAlarmInfo: IntelligentRoadTest.isShowAlarmInfoMessage,
                                alarm_dataObj: {}, //用于存放从告警表中获取到的指标的对象
                                alaram_title: "工单监测",
                                uname: IntelligentRoadTest.currentUser,
                                nearPoorAreaListData: nearPoorAreaList,
                                allMRDataList : []
                            },
                            methods: {
                                uptownPosition: function (item) {
                                    // IntelligentRoadTest.uptownPositiong(item);
                                    var zoom = getZoom(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu), zoom);
                                },
                                viewUptownLog: function (item) {
                                    IntelligentRoadTest.uptownLog(item);
                                },
                                showDetailInfo: function (event) {
                                    IntelligentRoadTest.showDetailInfo(event);
                                },
                                showLinkCell: function (event, item, type) {
                                    //type=1最近小区，type=2 接入扇区
                                    if ($(event.currentTarget).hasClass("linkCellHover")) {
                                        $(event.currentTarget).attr("title", "显示连线");
                                        $(event.currentTarget).removeClass("linkCellHover");
                                        if (type == 1) {
                                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                                        } else if (type == 2) {
                                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                                        }
                                    } else {
                                        $(event.currentTarget).attr("title", "隐藏连线");
                                        $(event.currentTarget).addClass("linkCellHover");
                                        var max_lng = item.longitude_max_baidu;
                                        var max_lat = item.latitude_max_baidu;
                                        var min_lng = item.longitude_min_baidu;
                                        var min_lat = item.latitude_min_baidu;
                                        var mid_lng = item.longitude_mid_baidu;
                                        var mid_lat = item.latitude_mid_baidu;
                                        var centerPoint = new BMap.Point(mid_lng, mid_lat);
                                        if (type == 1) {
                                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint, item.top5_sector_set);
                                        } else if (type == 2) {
                                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint, item.sector_set);
                                        }
                                    }
                                },
                                showLinkPoorArea: function (event, item, type) {
                                    IntelligentRoadTest.showLinkPoorArea(event, item, type);
                                },
                                gotoShowSectorMessage: function (sectorDate) {
                                    IntelligentRoadTest.clickType = 1;
                                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid, sectorDate.cellid, IntelligentRoadTest.day);
                                },
                                gotoKPIList: function (item) {
                                    if (item.sector_set != null) {
                                        var sectorArr = item.sector_set.split("@");
                                        showOrHideInputImage(2);
                                        IntelligentRoadTest.loadKPIListData(sectorArr);
                                        $("#kpiBackPoor").html("返回上一级");
                                    }
                                },
                                editSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.editSystemLayer(item, 2);
                                },
                                resetSystemLayer: function (item, event) {
                                    IntelligentRoadTest_SystemLayerEdit.resetSystemLayer(item, 2, event);
                                },
                                saveSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.saveSystemLayer(item, 2);
                                },
                                commitSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.commitSystemLayer(item, 2);
                                },
                                recoverSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer(item, 2);
                                },
                                deleteSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer(item, 2);
                                },
                                redrawSystemLayer: function (item, event) {
                                    IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer(item, 2, event);
                                },
                                cancelSystemLayer: function (item, event) {
                                    IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer(item, 2, event);
                                },
                                showPolygonGrid: function (item, event) {
                                    IntelligentRoadTest.showHidePolygonGrid(item, event);
                                }
                            }
                        });
                    } else {
                        IntelligentRoadTest.uptownCompleteVM.uptownData = item;
                        IntelligentRoadTest.uptownCompleteVM.dataIndex = index;
                        IntelligentRoadTest.uptownCompleteVM.nrTop5Cell = nearTOP5;
                        IntelligentRoadTest.uptownCompleteVM.mrTop5Cell = mrNearTOP5;
                        IntelligentRoadTest.uptownCompleteVM.nearPoorAreaListData = nearPoorAreaList;
                        IntelligentRoadTest.uptownCompleteVM.isShowAlarmInfo = IntelligentRoadTest.isShowAlarmInfoMessage;
                        // IntelligentRoadTest.uptownCompleteVM.title = echartTitle;
                    }

                },
                lastOrNext: function (type) {
                    if (type == 0) {
                        //上一页
                        if (IntelligentRoadTest.uptownCurrentPage > 1) {
                            IntelligentRoadTest.uptownCurrentPage = IntelligentRoadTest.uptownCurrentPage - 1;
                            IntelligentRoadTest.uptownVM.uptownList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.uptownCurrentResult, IntelligentRoadTest.uptownCurrentPage);
                            IntelligentRoadTest.uptownVM.currentPageNum = IntelligentRoadTest.uptownCurrentPage;
                            IntelligentRoadTest.uptownVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.uptownVM.lastIndex = IntelligentRoadTest.lastIndex;
                        } else {
                            alert("当前页是第一页");
                        }
                    } else {
                        if (IntelligentRoadTest.uptownCurrentPage < IntelligentRoadTest.uptownTotalPage) {
                            IntelligentRoadTest.uptownCurrentPage = IntelligentRoadTest.uptownCurrentPage + 1;
                            IntelligentRoadTest.uptownVM.uptownList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.uptownCurrentResult, IntelligentRoadTest.uptownCurrentPage);
                            IntelligentRoadTest.uptownVM.currentPageNum = IntelligentRoadTest.uptownCurrentPage;
                            IntelligentRoadTest.uptownVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.uptownVM.lastIndex = IntelligentRoadTest.lastIndex;
                        }
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.uptownVM.uptownList, 9);
                },
                gotoPage: function () {
                    var page = $("#uptownPage").val();
                    page = parseInt(page);
                    if (page > 0 && page <= IntelligentRoadTest.uptownTotalPage) {
                        IntelligentRoadTest.uptownCurrentPage = page;
                        IntelligentRoadTest.uptownVM.uptownList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.uptownCurrentResult, IntelligentRoadTest.uptownCurrentPage);
                        IntelligentRoadTest.uptownVM.currentPageNum = IntelligentRoadTest.uptownCurrentPage;
                        IntelligentRoadTest.uptownVM.startIndex = IntelligentRoadTest.startIndex;
                        IntelligentRoadTest.uptownVM.lastIndex = IntelligentRoadTest.lastIndex;
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.uptownVM.uptownList, 9);
                },
                goLast: function () {
                    IntelligentRoadTest.uptownCurrentPage = IntelligentRoadTest.uptownTotalPage;
                    IntelligentRoadTest.uptownVM.uptownList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.uptownCurrentResult, IntelligentRoadTest.uptownCurrentPage);
                    IntelligentRoadTest.uptownVM.currentPageNum = IntelligentRoadTest.uptownCurrentPage;
                    IntelligentRoadTest.uptownVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.uptownVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.uptownVM.uptownList, 9);
                    $("#uptownCount").html("返回上一级(本页显示第" + IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex + "条的数据，共" + IntelligentRoadTest.uptownTotalCount + "条数据)");
                },
                goFirst: function () {
                    IntelligentRoadTest.uptownCurrentPage = 1;
                    IntelligentRoadTest.uptownVM.uptownList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.uptownCurrentResult, IntelligentRoadTest.uptownCurrentPage);
                    IntelligentRoadTest.uptownVM.currentPageNum = IntelligentRoadTest.uptownCurrentPage;
                    IntelligentRoadTest.uptownVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.uptownVM.lastIndex = IntelligentRoadTest.lastIndex;
                    if (IntelligentRoadTest.index == 9) {
                        IntelligentRoadTest.drawMk(IntelligentRoadTest.uptownVM.uptownList, 9);
                    }
                    $("#uptownCount").html("返回上一级(本页显示第" + IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex + "条的数据，共" + IntelligentRoadTest.uptownTotalCount + "条数据)");
                },
                turnMk: function (index, item) {
                    for (var i = 0; i < IntelligentRoadTest.markerList.length; i++) {
                        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.markerList[i]);
                    }

                    for (var i = 0; i < IntelligentRoadTest.lngArr.length; i++) {
                        var lng = IntelligentRoadTest.lngArr[i];
                        var lat = IntelligentRoadTest.latArr[i];
                        var color = "#fff"
                        var img = "../js/IntelligentRoadTest/images/bg_num.png";
                        if (i == index) {
                            img = "../js/IntelligentRoadTest/images/maker2.png";
                            color = "black";
                            IntelligentRoadTest.openInfoWindow(lng, lat, item.esbh_name);
                        }
                        IntelligentRoadTest.addMk(lng, lat, img, i, color, item.esbh_name);
                        $("#showUptownDiv").find(".listUL > li").eq(i).find(".numSpan").css("background", "url(../js/IntelligentRoadTest/images/bg_num.png)");
                        $("#showUptownDiv").find(".listUL > li").eq(i).css("background", "#fff");
                    }
                    $("#showUptownDiv").find(".listUL > li").eq(index).find(".numSpan").css("background", "url(../js/IntelligentRoadTest/images/maker2.png)");
                    $("#showUptownDiv").find(".listUL > li").eq(index).css("background", "#f4f4f4");
                }
            }
        });
    } else { //改变数值
        IntelligentRoadTest.uptownVM.uptownList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.uptownCurrentResult, IntelligentRoadTest.uptownCurrentPage);
        IntelligentRoadTest.uptownVM.totalPages = IntelligentRoadTest.uptownTotalPage;
        IntelligentRoadTest.uptownVM.totalCounts = IntelligentRoadTest.uptownTotalCount;
        IntelligentRoadTest.uptownVM.currentPageNum = IntelligentRoadTest.uptownCurrentPage;
        IntelligentRoadTest.uptownVM.startIndex = IntelligentRoadTest.startIndex;
        IntelligentRoadTest.uptownVM.lastIndex = IntelligentRoadTest.lastIndex;
        if (IntelligentRoadTest.index == 9) {
            IntelligentRoadTest.drawMk(IntelligentRoadTest.uptownVM.uptownList, 9);
        }
        if (!$("#showUptownCompleteMessage").is(":visible")) {
            // $("#uptownCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
            //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.uptownTotalCount +"条数据)");
        }
    }
    if (IntelligentRoadTest.currentLocation == "uptown") {
        IntelligentRoadTest.goUptownCompleteMessage();
    }

}

//----------------------------高密度住宅区列表结束 ----------------------------------------

//-----------------------------高流量商务区列表开始-------------------------------------

IntelligentRoadTest.showBusinessData = function IntelligentRoadTest_showBusinessData(result) {
    IntelligentRoadTest.businessCurrentPage = 1;
    IntelligentRoadTest.businessTotalCount = result.length;
    var pageCount = result.length / IntelligentRoadTest.pageSize;
    if ((result.length % IntelligentRoadTest.pageSize) != 0) {
        IntelligentRoadTest.businessTotalPage = parseInt(pageCount) + 1; //总页数，没有整除时加上1
    } else {
        IntelligentRoadTest.businessTotalPage = pageCount;  //整除不用加1
    }

    if (IntelligentRoadTest.businessVM == null) {
        IntelligentRoadTest.businessVM = new Vue({
            el: '#showBusinessDiv',
            data: {
                businessList: IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.businessCurrentResult, IntelligentRoadTest.businessCurrentPage),
                totalPages: IntelligentRoadTest.businessTotalPage,
                totalCounts: IntelligentRoadTest.businessTotalCount,
                currentPageNum: IntelligentRoadTest.businessCurrentPage,
                startIndex: IntelligentRoadTest.startIndex,
                lastIndex: IntelligentRoadTest.lastIndex,
                isAuditor: concernAreaShare.isAuditor
            },
            methods: {
                showMessage: function (item, index) {
                    IntelligentRoadTest.mkIndex = index;
                    IntelligentRoadTest.cacheItem = item;
                    //跳转到高密度商务区详情
                    IntelligentRoadTest.goBusinessCompleteMessage();
                    IntelligentRoadTest.removeEsbhPolyline();//清除附近弱区的多边形（工单监测）
                    if (item.alarm_id != null && item.alarm_id != '') { //判断该对象是否需要展示工单监测指标
                        IntelligentRoadTest.isShowAlarmInfoMessage = true;
                    }
                    /*else{
                        IntelligentRoadTest.isShowAlarmInfoMessage = false;
                    }*/
                    //增加查询工单指标的方法
                    if (IntelligentRoadTest.isShowAlarmInfoMessage == true) {
                        IntelligentRoadTest.getSenseObjectAlarmInfoData("天翼蓝鹰高流量商务区", item.esbh_id, IntelligentRoadTest.day, item.poor_coverage_set, item.zlqy_flag);
                    }
                    IntelligentRoadTest.showPolygon(item.gis_data, undefined, "business", item.esbh_id, IntelligentRoadTest.day, item.esbh_name);
                    IntelligentRoadTest.loadGrid(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                    /*IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
                        [
                            {"key":"区域名称","val":item.esbh_name},
                            {"key":"区域编号","val":item.esbh_id},
                        ]
                    );*/

                    // $('#concernHandleDescribe').val(item.handle_description);
                    if (IntelligentRoadTest.mapClick) {
                        IntelligentRoadTest.mapClick = false;
                    } else {
                        if ((item.audit_stat != '待审核' || item.audit_style != '删除') && !IntelligentRoadTest.isChangeDate ) { //切换时间时不做定位
                            var zoom = getZoom(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu), zoom);
                        }else{
                            IntelligentRoadTest.isChangeDate = false;
                        }
                    }

                    if (!IntelligentRoadTest.isScreenCompared && IntelligentRoadTest.isAddMessageEvent) {//不是在分屏页，并且点击过分屏
                        if (!windowScreeen.closed) {//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
                            // windowScreeen.focus();
                            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item, 'business');
                        }
                    }
                    // $("#colorBar").click();

                    var RecentCellImg = $("#showBusinessCompleteMessage").find('.linkCell').children('img');
                    $(RecentCellImg).each(function () {
                        var srcText = $(this).attr('src');
                        var clickImg = srcText.replace("nor", "click");
                        var norImg = srcText.replace("click", "nor");
                        if (srcText == clickImg) {
                            $(this).attr('src', norImg);
                        }
                    });
                    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();

                    var echartTitle = "历史30天覆盖变化";
                    IntelligentRoadTest.getSenseAllMR30DayData("高流量商务区",item.esbh_id , item.day , item.city, false); //加载30天的折线图
                    IntelligentRoadTest.getSenseAllMrData(item.day , "高流量商务区" , item.esbh_id ,item.city, false);
                    var nearTOP5 = [];
                    if (item.top5_sector_set != null && item.top5_sector_set != "") {
                        var to5DataArr = item.top5_sector_set.split("@");
                        for (var i = 0; i < to5DataArr.length; i++) {
                            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
                        }
                    }
                    var mrNearTOP5 = [];
                    if (item.sector_set != null && item.sector_set != "") {
                        var mrTo5DataArr = item.sector_set.split("@");
                        for (var k = 0; k < mrTo5DataArr.length; k++) {
                            mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
                        }
                    }
                    if (IntelligentRoadTest.checkIfHasSameSector(nearTOP5, mrNearTOP5)) {
                        item.isHasSameSector = true;
                    }
                    var nearPoorAreaList = []; //附近弱覆盖区域集合
                    if (item.poor_coverage_set != null && item.poor_coverage_set != '') {
                        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.nb_poor_coverage_set);
                    }
                    var poorAreaList = [];//弱覆盖区域集合
                    if (item.poor_coverage_set != null && item.poor_coverage_set != '') {
                        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
                    }
                    IntelligentRoadTest.polygonList = [];
                    IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList, 1);
                    IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList, 2);
                    if (item.day != null && item.day.toString().indexOf("-") < 0) { //转换日期格式
                        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
                    }
                    $(".linkCell").attr("title", "显示连线");
                    $(".linkCell").removeClass("linkCellHover");

                    // 增加一个查询,获取图层的版本信息等
                    IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData(item, 3);
//                    var user_role = $('#user_role_List_string').val();

                    if (item.audit_style == '删除' && item.audit_stat == '审核通过') {
                        $("#showBusinessCompleteMessage").find('.systemLayerBottonLi').hide();
                        $("#showBusinessCompleteMessage").find('.systemLayerDelete').hide();
                        $("#showBusinessCompleteMessage").find('.systemLayerDeleteEnd').show();
                    } else {
                        if (IntelligentRoadTest.user_role.indexOf('审核员') < 0) {
                            $("#showBusinessCompleteMessage").find('.systemLayerBottonLi').hide();
                            $("#showBusinessCompleteMessage").find('.systemLayerDelete').hide();
                        } else {
                            $("#showBusinessCompleteMessage").find('.systemLayerBottonLi').show();
                            $("#showBusinessCompleteMessage").find('.systemLayerDelete').show();
                        }
                        $("#showBusinessCompleteMessage").find('.systemLayerDeleteEnd').hide();
                    }
                    if (IntelligentRoadTest.businessCompleteVM == null) {
                        IntelligentRoadTest.businessCompleteVM = new Vue({
                            el: '#showBusinessCompleteMessage',
                            data: {
                                businessData: item,
                                dataIndex: index,
                                nrTop5Cell: nearTOP5,
                                mrTop5Cell: mrNearTOP5,
                                title: echartTitle,
                                isShowAlarmInfo: IntelligentRoadTest.isShowAlarmInfoMessage,
                                alarm_dataObj: {}, //用于存放从告警表中获取到的指标的对象
                                alaram_title: "工单监测",
                                uname: IntelligentRoadTest.currentUser,
                                nearPoorAreaListData: nearPoorAreaList,
                                allMRDataList : []
                            },
                            methods: {
                                businessPosition: function (item) {
                                    //IntelligentRoadTest.businessPositiong(item);
                                    var zoom = getZoom(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu), zoom);
                                },
                                viewBusinessLog: function (item) {
                                    IntelligentRoadTest.businessLog(item);
                                },
                                showDetailInfo: function (event) {
                                    IntelligentRoadTest.showDetailInfo(event);
                                },
                                showLinkCell: function (event, item, type) {
                                    //type=1最近小区，type=2 接入扇区
                                    if ($(event.currentTarget).hasClass("linkCellHover")) {
                                        $(event.currentTarget).attr("title", "显示连线");
                                        $(event.currentTarget).removeClass("linkCellHover");
                                        if (type == 1) {
                                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                                        } else if (type == 2) {
                                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                                        }
                                    } else {
                                        $(event.currentTarget).attr("title", "隐藏连线");
                                        $(event.currentTarget).addClass("linkCellHover");
                                        var max_lng = item.longitude_max_baidu;
                                        var max_lat = item.latitude_max_baidu;
                                        var min_lng = item.longitude_min_baidu;
                                        var min_lat = item.latitude_min_baidu;
                                        var mid_lng = item.longitude_mid_baidu;
                                        var mid_lat = item.latitude_mid_baidu;
                                        var centerPoint = new BMap.Point(mid_lng, mid_lat);
                                        if (type == 1) {
                                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint, item.top5_sector_set);
                                        } else if (type == 2) {
                                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint, item.sector_set);
                                        }
                                    }
                                },
                                showLinkPoorArea: function (event, item, type) {
                                    IntelligentRoadTest.showLinkPoorArea(event, item, type);
                                },
                                gotoShowSectorMessage: function (sectorDate) {
                                    IntelligentRoadTest.clickType = 1;
                                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid, sectorDate.cellid, IntelligentRoadTest.day);
                                },
                                gotoKPIList: function (item) {
                                    if (item.sector_set != null) {
                                        var sectorArr = item.sector_set.split("@");
                                        showOrHideInputImage(2);
                                        IntelligentRoadTest.loadKPIListData(sectorArr);
                                        $("#kpiBackPoor").html("返回上一级");
                                    }
                                },
                                editSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.editSystemLayer(item, 3);
                                },
                                resetSystemLayer: function (item, event) {
                                    IntelligentRoadTest_SystemLayerEdit.resetSystemLayer(item, 3, event);
                                },
                                saveSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.saveSystemLayer(item, 3);
                                },
                                commitSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.commitSystemLayer(item, 3);
                                },
                                recoverSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer(item, 3);
                                },
                                deleteSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer(item, 3);
                                },
                                redrawSystemLayer: function (item, event) {
                                    IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer(item, 3, event);
                                },
                                cancelSystemLayer: function (item, event) {
                                    IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer(item, 3, event);
                                },
                                showPolygonGrid: function (item, event) {
                                    IntelligentRoadTest.showHidePolygonGrid(item, event);
                                }
                            }
                        });
                    } else {
                        IntelligentRoadTest.businessCompleteVM.businessData = item;
                        IntelligentRoadTest.businessCompleteVM.dataIndex = index;
                        IntelligentRoadTest.businessCompleteVM.nrTop5Cell = nearTOP5;
                        IntelligentRoadTest.businessCompleteVM.mrTop5Cell = mrNearTOP5;
                        IntelligentRoadTest.businessCompleteVM.nearPoorAreaListData = nearPoorAreaList;
                        IntelligentRoadTest.businessCompleteVM.title = echartTitle;
                        IntelligentRoadTest.businessCompleteVM.isShowAlarmInfo = IntelligentRoadTest.isShowAlarmInfoMessage;
                    }


                },
                lastOrNext: function (type) {
                    if (type == 0) {
                        //上一页
                        if (IntelligentRoadTest.businessCurrentPage > 1) {
                            IntelligentRoadTest.businessCurrentPage = IntelligentRoadTest.businessCurrentPage - 1;
                            IntelligentRoadTest.businessVM.businessList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.businessCurrentResult, IntelligentRoadTest.businessCurrentPage);
                            IntelligentRoadTest.businessVM.currentPageNum = IntelligentRoadTest.businessCurrentPage;
                            IntelligentRoadTest.businessVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.businessVM.lastIndex = IntelligentRoadTest.lastIndex;
                        } else {
                            alert("当前页是第一页");
                        }
                    } else {
                        if (IntelligentRoadTest.businessCurrentPage < IntelligentRoadTest.businessTotalPage) {
                            IntelligentRoadTest.businessCurrentPage = IntelligentRoadTest.businessCurrentPage + 1;
                            IntelligentRoadTest.businessVM.businessList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.businessCurrentResult, IntelligentRoadTest.businessCurrentPage);
                            IntelligentRoadTest.businessVM.currentPageNum = IntelligentRoadTest.businessCurrentPage;
                            IntelligentRoadTest.businessVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.businessVM.lastIndex = IntelligentRoadTest.lastIndex;
                        }
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.businessVM.businessList, 11);
                },
                gotoPage: function () {
                    var page = $("#businessPage").val();
                    page = parseInt(page);
                    if (page > 0 && page <= IntelligentRoadTest.businessTotalPage) {
                        IntelligentRoadTest.businessCurrentPage = page;
                        IntelligentRoadTest.businessVM.businessList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.businessCurrentResult, IntelligentRoadTest.businessCurrentPage);
                        IntelligentRoadTest.businessVM.currentPageNum = IntelligentRoadTest.businessCurrentPage;
                        IntelligentRoadTest.businessVM.startIndex = IntelligentRoadTest.startIndex;
                        IntelligentRoadTest.businessVM.lastIndex = IntelligentRoadTest.lastIndex;
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.businessVM.businessList, 11);
                },
                goLast: function () {
                    IntelligentRoadTest.businessCurrentPage = IntelligentRoadTest.businessTotalPage;
                    IntelligentRoadTest.businessVM.businessList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.businessCurrentResult, IntelligentRoadTest.businessCurrentPage);
                    IntelligentRoadTest.businessVM.currentPageNum = IntelligentRoadTest.businessCurrentPage;
                    IntelligentRoadTest.businessVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.businessVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.businessVM.businessList, 11);
                    $("#businessCount").html("返回上一级(本页显示第" + IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex + "条的数据，共" + IntelligentRoadTest.businessTotalCount + "条数据)");
                },
                goFirst: function () {
                    IntelligentRoadTest.businessCurrentPage = 1;
                    IntelligentRoadTest.businessVM.businessList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.businessCurrentResult, IntelligentRoadTest.businessCurrentPage);
                    IntelligentRoadTest.businessVM.currentPageNum = IntelligentRoadTest.businessCurrentPage;
                    IntelligentRoadTest.businessVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.businessVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.businessVM.businessList, 11);
                    $("#businessCount").html("返回上一级(本页显示第" + IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex + "条的数据，共" + IntelligentRoadTest.businessTotalCount + "条数据)");
                },
                turnMk: function (index, item) {
                    for (var i = 0; i < IntelligentRoadTest.markerList.length; i++) {
                        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.markerList[i]);
                    }

                    for (var i = 0; i < IntelligentRoadTest.lngArr.length; i++) {
                        var lng = IntelligentRoadTest.lngArr[i];
                        var lat = IntelligentRoadTest.latArr[i];
                        var color = "#fff"
                        var img = "../js/IntelligentRoadTest/images/bg_num.png";
                        if (i == index) {
                            img = "../js/IntelligentRoadTest/images/maker2.png";
                            color = "black";
                            IntelligentRoadTest.openInfoWindow(lng, lat, item.esbh_name);
                        }
                        IntelligentRoadTest.addMk(lng, lat, img, i, color, item.esbh_name);
                        $("#showBusinessDiv").find(".listUL > li").eq(i).find(".numSpan").css("background", "url(../js/IntelligentRoadTest/images/bg_num.png)");
                        $("#showBusinessDiv").find(".listUL > li").eq(i).css("background", "#fff");
                    }
                    $("#showBusinessDiv").find(".listUL > li").eq(index).find(".numSpan").css("background", "url(../js/IntelligentRoadTest/images/maker2.png)");
                    $("#showBusinessDiv").find(".listUL > li").eq(index).css("background", "#f4f4f4");
                }
            }
        });
    } else { //改变数值
        IntelligentRoadTest.businessVM.businessList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.businessCurrentResult, IntelligentRoadTest.businessCurrentPage);
        IntelligentRoadTest.businessVM.totalPages = IntelligentRoadTest.businessTotalPage;
        IntelligentRoadTest.businessVM.totalCounts = IntelligentRoadTest.businessTotalCount;
        IntelligentRoadTest.businessVM.currentPageNum = IntelligentRoadTest.businessCurrentPage;
        IntelligentRoadTest.businessVM.startIndex = IntelligentRoadTest.startIndex;
        IntelligentRoadTest.businessVM.lastIndex = IntelligentRoadTest.lastIndex;
        if (IntelligentRoadTest.index == 11) {
            IntelligentRoadTest.drawMk(IntelligentRoadTest.businessVM.businessList, 11);
        }
        if (!$("#showBusinessCompleteMessage").is(":visible")) {
            // $("#businessCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
            //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.businessTotalCount +"条数据)");
        }
    }
    if (IntelligentRoadTest.currentLocation == "business") {
        IntelligentRoadTest.goBusinessCompleteMessage();
    }

}

//----------------------------高密度商务区列表结束 ----------------------------------------

//-----------------------------战狼区域列表开始-------------------------------------

IntelligentRoadTest.getWarwolfListData = function (day, city, type, district_id, mktcenter_id, district_name, mktcenter_name) {
    var sqlList = [];
    var isZL = " and zlqy_flag = 1 "; //这里要改的
    var city_id;
    if(!isNull(city)){
        city_id = noceUtil.city_LATN_ID[city];
    }
    var list = ["IntelligentRoadTestAnalysi_v2_getSenecsAreaData", "ESBHTYPE:" + type, "CITY_ID:" + city_id,
        "DAY:" + day, "OTHERCONDITION:" + isZL, "USERNAME:" + IntelligentRoadTest.currentUser , "OBJECT_TYPE:" + '战狼区域'];

    if(!isNull(IntelligentRoadTest.countryPermission_common)){ //区县用户
        district_name = IntelligentRoadTest.countryPermission_common;
        $("#warwolfDistrictName").text(IntelligentRoadTest.countryPermission_common);
    }
    if (district_name != null && district_name != "" && district_name != "null") {
        list.push("COUNTRY:" + "and COUNTRY = '" + district_name + "'");
    } else {
        var countryStr = $("#warwolfDistrictName").text().trim();
        if (countryStr != "" && countryStr != "全市" && countryStr != "null") {
            district_name = countryStr;
            list.push("COUNTRY:" + "and COUNTRY = '" + district_name + "'");
        }
    }
    if (mktcenter_name != null && mktcenter_name != "" && mktcenter_name != "null") {
        list.push("MKTCENTER:" + "and MKTCENTER = '" + mktcenter_name + "'");
    } else {
        var mktcenter = $("#warwolfMktName").text().trim();
        if (mktcenter != "" && mktcenter != "全区" && mktcenter != "null") {
            mktcenter_name = mktcenter;
            list.push("MKTCENTER:" + "and MKTCENTER = '" + mktcenter_name + "'");
        }
    }
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealWarwolfListData];
    var database = [3];
    progressbarTwo.submitSql(sqlList, funcList, database);
    IntelligentRoadTest.warwolfCurrentSelectConditon = "" + city + day;
}

IntelligentRoadTest.dealWarwolfListData = function IntelligentRoadTest_dealWarwolfListData(data) {
    var result = callBackChangeData(data);
    console.log(result);
    IntelligentRoadTest.warwolfResult = result;
    IntelligentRoadTest.warwolfCurrentResult = result;
    // IntelligentRoadTest.showWarwolfData(result);
    var SelectName = $("#warwolfSelectName").text();
    var flexCol = $("#warwolfList  .flexRow .flexCol");
    IntelligentRoadTest.triggleFilter(SelectName, flexCol);
}

IntelligentRoadTest.showWarwolfData = function IntelligentRoadTest_showWarwolfData(result) {
    IntelligentRoadTest.warwolfCurrentPage = 1;
    IntelligentRoadTest.warwolfTotalCount = result.length;
    var pageCount = result.length / IntelligentRoadTest.pageSize;
    if ((result.length % IntelligentRoadTest.pageSize) != 0) {
        IntelligentRoadTest.warwolfTotalPage = parseInt(pageCount) + 1; //总页数，没有整除时加上1
    } else {
        IntelligentRoadTest.warwolfTotalPage = pageCount;  //整除不用加1
    }

    if (IntelligentRoadTest.warwolfVM == null) {
        IntelligentRoadTest.warwolfVM = new Vue({
            el: '#showWarwolfDiv',
            data: {
                warwolfList: IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.warwolfCurrentResult, IntelligentRoadTest.warwolfCurrentPage),
                totalPages: IntelligentRoadTest.warwolfTotalPage,
                totalCounts: IntelligentRoadTest.warwolfTotalCount,
                currentPageNum: IntelligentRoadTest.warwolfCurrentPage,
                startIndex: IntelligentRoadTest.startIndex,
                lastIndex: IntelligentRoadTest.lastIndex,
                isAuditor: concernAreaShare.isAuditor
            },
            methods: {
                showMessage: function (item, index) {
                    IntelligentRoadTest.mkIndex = index;
                    IntelligentRoadTest.cacheItem = item;
                    //跳转到战狼区域详情
                    IntelligentRoadTest.goWarwolfCompleteMessage();
                    IntelligentRoadTest.removeEsbhPolyline();//清除附近弱区的多边形（工单监测）
                    if (item.alarm_id != null && item.alarm_id != '') { //判断该对象是否需要展示工单监测指标
                        IntelligentRoadTest.isShowAlarmInfoMessage = true;
                    }
                    /*else{
                        IntelligentRoadTest.isShowAlarmInfoMessage = false;
                    }*/
                    //增加查询工单指标的方法
                    if (IntelligentRoadTest.isShowAlarmInfoMessage == true) {
                        IntelligentRoadTest.getSenseObjectAlarmInfoData("天翼蓝鹰战狼区域", item.esbh_id, IntelligentRoadTest.day, item.poor_coverage_set);
                    }
                    IntelligentRoadTest.showPolygon(item.gis_data, undefined, "warwolf", item.esbh_id, IntelligentRoadTest.day, item.esbh_name);
                    IntelligentRoadTest.loadGrid(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                    /*IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
                        [
                            {"key":"区域名称","val":item.esbh_name},
                            {"key":"区域编号","val":item.esbh_id},
                        ]
                    );*/

                    // $('#concernHandleDescribe').val(item.handle_description);
                    if (IntelligentRoadTest.mapClick) {
                        IntelligentRoadTest.mapClick = false;
                    } else {
                        if (!IntelligentRoadTest.isChangeDate ) { //切换时间时不做定位
                            var zoom = getZoom(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu), zoom);
                        }else{
                            IntelligentRoadTest.isChangeDate = false;
                        }
                    }
                    if (!IntelligentRoadTest.isScreenCompared && IntelligentRoadTest.isAddMessageEvent) {//不是在分屏页，并且点击过分屏
                        if (!windowScreeen.closed) {//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
                            // windowScreeen.focus();
                            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item, 'warWolf');
                        }
                    }
                    // $("#colorBar").click();

                    var RecentCellImg = $("#showWarwolfCompleteMessage").find('.linkCell').children('img');
                    $(RecentCellImg).each(function () {
                        var srcText = $(this).attr('src');
                        var clickImg = srcText.replace("nor", "click");
                        var norImg = srcText.replace("click", "nor");
                        if (srcText == clickImg) {
                            $(this).attr('src', norImg);
                        }
                    });
                    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();

                    var echartTitle = "历史30天覆盖变化";
                    // IntelligentRoadTest.getSense30DayLineData(3, item.esbh_id, item.city);//加载30天的折线图
                    IntelligentRoadTest.getSenseAllMR30DayData("战狼区域",item.esbh_id , item.day , item.city, true); //加载30天的折线图
                    IntelligentRoadTest.getSenseAllMrData(item.day , "高流量商务区" , item.esbh_id ,item.city, true);
                    var nearTOP5 = [];
                    if (item.top5_sector_set != null && item.top5_sector_set != "") {
                        var to5DataArr = item.top5_sector_set.split("@");
                        for (var i = 0; i < to5DataArr.length; i++) {
                            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
                        }
                    }
                    var mrNearTOP5 = [];
                    if (item.sector_set != null && item.sector_set != "") {
                        var mrTo5DataArr = item.sector_set.split("@");
                        for (var k = 0; k < mrTo5DataArr.length; k++) {
                            mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
                        }
                    }
                    if (IntelligentRoadTest.checkIfHasSameSector(nearTOP5, mrNearTOP5)) {
                        item.isHasSameSector = true;
                    }
                    var nearPoorAreaList = []; //附近弱覆盖区域集合
                    if (item.poor_coverage_set != null && item.poor_coverage_set != '') {
                        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.nb_poor_coverage_set);
                    }
                    var poorAreaList = [];//弱覆盖区域集合
                    if (item.poor_coverage_set != null && item.poor_coverage_set != '') {
                        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
                    }
                    IntelligentRoadTest.polygonList = [];
                    IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList, 1);
                    IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList, 2);
                    if (item.day != null && item.day.toString().indexOf("-") < 0) { //转换日期格式
                        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
                    }
                    $(".linkCell").attr("title", "显示连线");
                    $(".linkCell").removeClass("linkCellHover");

                    // 增加一个查询,获取图层的版本信息等，战狼区域暂不需要进行编辑
//                    IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData(item);
////                    var user_role = $('#user_role_List_string').val();
//
//                    if(IntelligentRoadTest.user_role.indexOf('审核员')<0){
//                    	$("#showWarwolfCompleteMessage").find('.systemLayerBottonLi').hide();
//                    	$("#showWarwolfCompleteMessage").find('.systemLayerDelete').hide();
//                    }
//
                    if (IntelligentRoadTest.warwolfCompleteVM == null) {
                        IntelligentRoadTest.warwolfCompleteVM = new Vue({
                            el: '#showWarwolfCompleteMessage',
                            data: {
                                warwolfData: item,
                                dataIndex: index,
                                nrTop5Cell: nearTOP5,
                                mrTop5Cell: mrNearTOP5,
                                title: echartTitle,
                                isShowAlarmInfo: IntelligentRoadTest.isShowAlarmInfoMessage,
                                alarm_dataObj: {}, //用于存放从告警表中获取到的指标的对象
                                alaram_title: "工单监测",
                                uname: IntelligentRoadTest.currentUser,
                                nearPoorAreaListData: nearPoorAreaList,
                                allMRDataList : []
                            },
                            methods: {
                                warwolfPosition: function (item) {
                                    // IntelligentRoadTest.warwolfPositiong(item);
                                    var zoom = getZoom(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu), zoom);
                                },
                                viewWarwolfLog: function (item) {
                                    IntelligentRoadTest.warwolfLog(item);
                                },
                                showDetailInfo: function (event) {
                                    IntelligentRoadTest.showDetailInfo(event);
                                },
                                showLinkCell: function (event, item, type) {
                                    //type=1最近小区，type=2 接入扇区
                                    if ($(event.currentTarget).hasClass("linkCellHover")) {
                                        $(event.currentTarget).attr("title", "显示连线");
                                        $(event.currentTarget).removeClass("linkCellHover");
                                        if (type == 1) {
                                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                                        } else if (type == 2) {
                                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                                        }
                                    } else {
                                        $(event.currentTarget).attr("title", "隐藏连线");
                                        $(event.currentTarget).addClass("linkCellHover");
                                        var max_lng = item.longitude_max_baidu;
                                        var max_lat = item.latitude_max_baidu;
                                        var min_lng = item.longitude_min_baidu;
                                        var min_lat = item.latitude_min_baidu;
                                        var mid_lng = item.longitude_mid_baidu;
                                        var mid_lat = item.latitude_mid_baidu;
                                        var centerPoint = new BMap.Point(mid_lng, mid_lat);
                                        if (type == 1) {
                                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint, item.top5_sector_set);
                                        } else if (type == 2) {
                                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint, item.sector_set);
                                        }
                                    }
                                },
                                showLinkPoorArea: function (event, item, type) {
                                    IntelligentRoadTest.showLinkPoorArea(event, item, type);
                                },
                                gotoShowSectorMessage: function (sectorDate) {
                                    IntelligentRoadTest.clickType = 1;
                                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid, sectorDate.cellid, IntelligentRoadTest.day);
                                },
                                gotoKPIList: function (item) {
                                    if (item.sector_set != null) {
                                        var sectorArr = item.sector_set.split("@");
                                        showOrHideInputImage(2);
                                        IntelligentRoadTest.loadKPIListData(sectorArr);
                                        $("#kpiBackPoor").html("返回上一级");
                                    }
                                }, showPolygonGrid: function (item, event) {
                                    IntelligentRoadTest.showHidePolygonGrid(item, event);
                                }
//                                editSystemLayer : function (item){
//                                    IntelligentRoadTest_SystemLayerEdit.editSystemLayer(item);
//                                },
//                                resetSystemLayer : function (item){
//                                    IntelligentRoadTest_SystemLayerEdit.resetSystemLayer(item);
//                                },
//                                saveSystemLayer : function (item){
//                                    IntelligentRoadTest_SystemLayerEdit.saveSystemLayer(item);
//                                },
//                                commitSystemLayer : function (item){
//                                    IntelligentRoadTest_SystemLayerEdit.commitSystemLayer(item);
//                                },
//                                recoverSystemLayer : function (item){
//                                    IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer(item);
//                                },
//                                deleteSystemLayer: function (item){
//                                	IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer(item);
//                                }
                            }
                        });
                    } else {
                        IntelligentRoadTest.warwolfCompleteVM.warwolfData = item;
                        IntelligentRoadTest.warwolfCompleteVM.dataIndex = index;
                        IntelligentRoadTest.warwolfCompleteVM.nrTop5Cell = nearTOP5;
                        IntelligentRoadTest.warwolfCompleteVM.mrTop5Cell = mrNearTOP5;
                        IntelligentRoadTest.warwolfCompleteVM.nearPoorAreaListData = nearPoorAreaList;
                        IntelligentRoadTest.warwolfCompleteVM.title = echartTitle;
                        IntelligentRoadTest.warwolfCompleteVM.isShowAlarmInfo = IntelligentRoadTest.isShowAlarmInfoMessage;
                    }

                },
                lastOrNext: function (type) {
                    if (type == 0) {
                        //上一页
                        if (IntelligentRoadTest.warwolfCurrentPage > 1) {
                            IntelligentRoadTest.warwolfCurrentPage = IntelligentRoadTest.warwolfCurrentPage - 1;
                            IntelligentRoadTest.warwolfVM.warwolfList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.warwolfCurrentResult, IntelligentRoadTest.warwolfCurrentPage);
                            IntelligentRoadTest.warwolfVM.currentPageNum = IntelligentRoadTest.warwolfCurrentPage;
                            IntelligentRoadTest.warwolfVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.warwolfVM.lastIndex = IntelligentRoadTest.lastIndex;
                        } else {
                            alert("当前页是第一页");
                        }
                    } else {
                        if (IntelligentRoadTest.warwolfCurrentPage < IntelligentRoadTest.warwolfTotalPage) {
                            IntelligentRoadTest.warwolfCurrentPage = IntelligentRoadTest.warwolfCurrentPage + 1;
                            IntelligentRoadTest.warwolfVM.warwolfList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.warwolfCurrentResult, IntelligentRoadTest.warwolfCurrentPage);
                            IntelligentRoadTest.warwolfVM.currentPageNum = IntelligentRoadTest.warwolfCurrentPage;
                            IntelligentRoadTest.warwolfVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.warwolfVM.lastIndex = IntelligentRoadTest.lastIndex;
                        }
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.warwolfVM.warwolfList, 16);
                },
                gotoPage: function () {
                    var page = $("#warwolfPage").val();
                    page = parseInt(page);
                    if (page > 0 && page <= IntelligentRoadTest.warwolfTotalPage) {
                        IntelligentRoadTest.warwolfCurrentPage = page;
                        IntelligentRoadTest.warwolfVM.warwolfList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.warwolfCurrentResult, IntelligentRoadTest.warwolfCurrentPage);
                        IntelligentRoadTest.warwolfVM.currentPageNum = IntelligentRoadTest.warwolfCurrentPage;
                        IntelligentRoadTest.warwolfVM.startIndex = IntelligentRoadTest.startIndex;
                        IntelligentRoadTest.warwolfVM.lastIndex = IntelligentRoadTest.lastIndex;
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.warwolfVM.warwolfList, 11);
                },
                goLast: function () {
                    IntelligentRoadTest.warwolfCurrentPage = IntelligentRoadTest.warwolfTotalPage;
                    IntelligentRoadTest.warwolfVM.warwolfList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.warwolfCurrentResult, IntelligentRoadTest.warwolfCurrentPage);
                    IntelligentRoadTest.warwolfVM.currentPageNum = IntelligentRoadTest.warwolfCurrentPage;
                    IntelligentRoadTest.warwolfVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.warwolfVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.warwolfVM.warwolfList, 16);
                    $("#warwolfCount").html("返回上一级(本页显示第" + IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex + "条的数据，共" + IntelligentRoadTest.warwolfTotalCount + "条数据)");
                },
                goFirst: function () {
                    IntelligentRoadTest.warwolfCurrentPage = 1;
                    IntelligentRoadTest.warwolfVM.warwolfList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.warwolfCurrentResult, IntelligentRoadTest.warwolfCurrentPage);
                    IntelligentRoadTest.warwolfVM.currentPageNum = IntelligentRoadTest.warwolfCurrentPage;
                    IntelligentRoadTest.warwolfVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.warwolfVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.warwolfVM.warwolfList, 16);
                    $("#warwolfCount").html("返回上一级(本页显示第" + IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex + "条的数据，共" + IntelligentRoadTest.warwolfTotalCount + "条数据)");
                },
                turnMk: function (index, item) {
                    for (var i = 0; i < IntelligentRoadTest.markerList.length; i++) {
                        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.markerList[i]);
                    }

                    for (var i = 0; i < IntelligentRoadTest.lngArr.length; i++) {
                        var lng = IntelligentRoadTest.lngArr[i];
                        var lat = IntelligentRoadTest.latArr[i];
                        var color = "#fff"
                        var img = "../js/IntelligentRoadTest/images/bg_num.png";
                        if (i == index) {
                            img = "../js/IntelligentRoadTest/images/maker2.png";
                            color = "black";
                            IntelligentRoadTest.openInfoWindow(lng, lat, item.esbh_name);
                        }
                        IntelligentRoadTest.addMk(lng, lat, img, i, color, item.esbh_name);
                        $("#showWarwolfDiv").find(".listUL > li").eq(i).find(".numSpan").css("background", "url(../js/IntelligentRoadTest/images/bg_num.png)");
                        $("#showWarwolfDiv").find(".listUL > li").eq(i).css("background", "#fff");
                    }
                    $("#showWarwolfDiv").find(".listUL > li").eq(index).find(".numSpan").css("background", "url(../js/IntelligentRoadTest/images/maker2.png)");
                    $("#showWarwolfDiv").find(".listUL > li").eq(index).css("background", "#f4f4f4");
                }
            }
        });
    } else { //改变数值
        IntelligentRoadTest.warwolfVM.warwolfList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.warwolfCurrentResult, IntelligentRoadTest.warwolfCurrentPage);
        IntelligentRoadTest.warwolfVM.totalPages = IntelligentRoadTest.warwolfTotalPage;
        IntelligentRoadTest.warwolfVM.totalCounts = IntelligentRoadTest.warwolfTotalCount;
        IntelligentRoadTest.warwolfVM.currentPageNum = IntelligentRoadTest.warwolfCurrentPage;
        IntelligentRoadTest.warwolfVM.startIndex = IntelligentRoadTest.startIndex;
        IntelligentRoadTest.warwolfVM.lastIndex = IntelligentRoadTest.lastIndex;
        if (IntelligentRoadTest.index == 16) {
            IntelligentRoadTest.drawMk(IntelligentRoadTest.warwolfVM.warwolfList, 16);
        }
        if (!$("#showWarwolfCompleteMessage").is(":visible")) {
            // $("#warwolfCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
            //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.warwolfTotalCount +"条数据)");
        }
    }
    if (IntelligentRoadTest.currentLocation == "warwolf") {
        IntelligentRoadTest.goWarwolfCompleteMessage();
    }
    showOrHideInputImage(1);
}
//----------------------------战狼区域列表结束 ----------------------------------------

//-----------------------------农贸市场列表开始-------------------------------------

IntelligentRoadTest.showMarketData = function IntelligentRoadTest_showMarketData(result) {
    IntelligentRoadTest.marketCurrentPage = 1;
    IntelligentRoadTest.marketTotalCount = result.length;
    var pageCount = result.length / IntelligentRoadTest.pageSize;
    if ((result.length % IntelligentRoadTest.pageSize) != 0) {
        IntelligentRoadTest.marketTotalPage = parseInt(pageCount) + 1; //总页数，没有整除时加上1
    } else {
        IntelligentRoadTest.marketTotalPage = pageCount;  //整除不用加1
    }

    if (IntelligentRoadTest.marketVM == null) {
        IntelligentRoadTest.marketVM = new Vue({
            el: '#showMarketDiv',
            data: {
                marketList: IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.marketCurrentResult, IntelligentRoadTest.marketCurrentPage),
                totalPages: IntelligentRoadTest.marketTotalPage,
                totalCounts: IntelligentRoadTest.marketTotalCount,
                currentPageNum: IntelligentRoadTest.marketCurrentPage,
                startIndex: IntelligentRoadTest.startIndex,
                lastIndex: IntelligentRoadTest.lastIndex,
                isAuditor: concernAreaShare.isAuditor
            },
            methods: {
                showMessage: function (item, index) {
                    IntelligentRoadTest.mkIndex = index;
                    IntelligentRoadTest.cacheItem = item;
                    //跳转到农贸市场详情
                    IntelligentRoadTest.goMarketCompleteMessage();
                    IntelligentRoadTest.removeEsbhPolyline();//清除附近弱区的多边形（工单监测）
                    if (item.alarm_id != null && item.alarm_id != '') { //判断该对象是否需要展示工单监测指标
                        IntelligentRoadTest.isShowAlarmInfoMessage = true;
                    }
                    /*else{
                        IntelligentRoadTest.isShowAlarmInfoMessage = false;
                    }*/
                    //增加查询工单指标的方法
                    if (IntelligentRoadTest.isShowAlarmInfoMessage == true) {
                        IntelligentRoadTest.getSenseObjectAlarmInfoData("天翼蓝鹰农贸市场", item.esbh_id, IntelligentRoadTest.day, item.poor_coverage_set);
                    }
                    IntelligentRoadTest.showPolygon(item.gis_data, undefined, "market", item.esbh_id, IntelligentRoadTest.day, item.esbh_name);
                    IntelligentRoadTest.loadGrid(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                    /*IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
                        [
                            {"key":"区域名称","val":item.esbh_name},
                            {"key":"区域编号","val":item.esbh_id},
                        ]
                    );*/

                    // $('#concernHandleDescribe').val(item.handle_description);
                    if (IntelligentRoadTest.mapClick) {
                        IntelligentRoadTest.mapClick = false;
                    } else {
                        if ((item.audit_stat != '待审核' || item.audit_style != '删除') && !IntelligentRoadTest.isChangeDate ) { //切换时间时不做定位
                            var zoom = getZoom(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu), zoom);
                        }else{
                            IntelligentRoadTest.isChangeDate = false;
                        }
                    }
                    if (!IntelligentRoadTest.isScreenCompared && IntelligentRoadTest.isAddMessageEvent) {//不是在分屏页，并且点击过分屏
                        if (!windowScreeen.closed) {//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
                            // windowScreeen.focus();
                            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item, 'market');
                        }
                    }
                    // $("#colorBar").click();

                    var RecentCellImg = $("#showMarketCompleteMessage").find('.linkCell').children('img');
                    $(RecentCellImg).each(function () {
                        var srcText = $(this).attr('src');
                        var clickImg = srcText.replace("nor", "click");
                        var norImg = srcText.replace("click", "nor");
                        if (srcText == clickImg) {
                            $(this).attr('src', norImg);
                        }
                    });
                    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();

                    var echartTitle = "历史30天覆盖变化";
                    // IntelligentRoadTest.getSense30DayLineData(8, item.esbh_id, item.city);//加载30天的折线图
                    IntelligentRoadTest.getSenseAllMR30DayData("农贸市场",item.esbh_id , item.day , item.city, false); //加载30天的折线图
                    IntelligentRoadTest.getSenseAllMrData(item.day , "农贸市场" , item.esbh_id ,item.city, false);
                    var nearTOP5 = [];
                    if (item.top5_sector_set != null && item.top5_sector_set != "") {
                        var to5DataArr = item.top5_sector_set.split("@");
                        for (var i = 0; i < to5DataArr.length; i++) {
                            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
                        }
                    }
                    var mrNearTOP5 = [];
                    if (item.sector_set != null && item.sector_set != "") {
                        var mrTo5DataArr = item.sector_set.split("@");
                        for (var k = 0; k < mrTo5DataArr.length; k++) {
                            mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
                        }
                    }
                    if (IntelligentRoadTest.checkIfHasSameSector(nearTOP5, mrNearTOP5)) {
                        item.isHasSameSector = true;
                    }
                    var nearPoorAreaList = []; //附近弱覆盖区域集合
                    if (item.poor_coverage_set != null && item.poor_coverage_set != '') {
                        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.nb_poor_coverage_set);
                    }
                    var poorAreaList = [];//弱覆盖区域集合
                    if (item.poor_coverage_set != null && item.poor_coverage_set != '') {
                        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
                    }
                    IntelligentRoadTest.polygonList = [];
                    IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList, 1);
                    IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList, 2);
                    if (item.day != null && item.day.toString().indexOf("-") < 0) { //转换日期格式
                        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
                    }
                    $(".linkCell").attr("title", "显示连线");
                    $(".linkCell").removeClass("linkCellHover");

                    // 增加一个查询,获取图层的版本信息等
                    IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData(item, 8);
//                    var user_role = $('#user_role_List_string').val();

                    if (item.audit_style == '删除' && item.audit_stat == '审核通过') {
                        $("#showMarketCompleteMessage").find('.systemLayerBottonLi').hide();
                        $("#showMarketCompleteMessage").find('.systemLayerDelete').hide();
                        $("#showMarketCompleteMessage").find('.systemLayerDeleteEnd').show();
                    } else {
                        if (IntelligentRoadTest.user_role.indexOf('审核员') < 0) {
                            $("#showMarketCompleteMessage").find('.systemLayerBottonLi').hide();
                            $("#showMarketCompleteMessage").find('.systemLayerDelete').hide();
                        } else {
                            $("#showMarketCompleteMessage").find('.systemLayerBottonLi').show();
                            $("#showMarketCompleteMessage").find('.systemLayerDelete').show();
                        }
                        $("#showMarketCompleteMessage").find('.systemLayerDeleteEnd').hide();
                    }
                    if (IntelligentRoadTest.marketCompleteVM == null) {
                        IntelligentRoadTest.marketCompleteVM = new Vue({
                            el: '#showMarketCompleteMessage',
                            data: {
                                marketData: item,
                                dataIndex: index,
                                nrTop5Cell: nearTOP5,
                                mrTop5Cell: mrNearTOP5,
                                title: echartTitle,
                                isShowAlarmInfo: IntelligentRoadTest.isShowAlarmInfoMessage,
                                alarm_dataObj: {}, //用于存放从告警表中获取到的指标的对象
                                alaram_title: "工单监测",
                                uname: IntelligentRoadTest.currentUser,
                                nearPoorAreaListData: nearPoorAreaList,
                                allMRDataList : []
                            },
                            methods: {
                                marketPosition: function (item) {
                                    // IntelligentRoadTest.marketPositiong(item);
                                    var zoom = getZoom(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu), zoom);
                                },
                                viewMarketLog: function (item) {
                                    IntelligentRoadTest.marketLog(item);
                                },
                                showDetailInfo: function (event) {
                                    IntelligentRoadTest.showDetailInfo(event);
                                },
                                showLinkCell: function (event, item, type) {
                                    //type=1最近小区，type=2 接入扇区
                                    if ($(event.currentTarget).hasClass("linkCellHover")) {
                                        $(event.currentTarget).attr("title", "显示连线");
                                        $(event.currentTarget).removeClass("linkCellHover");
                                        if (type == 1) {
                                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                                        } else if (type == 2) {
                                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                                        }
                                    } else {
                                        $(event.currentTarget).attr("title", "隐藏连线");
                                        $(event.currentTarget).addClass("linkCellHover");
                                        var max_lng = item.longitude_max_baidu;
                                        var max_lat = item.latitude_max_baidu;
                                        var min_lng = item.longitude_min_baidu;
                                        var min_lat = item.latitude_min_baidu;
                                        var mid_lng = item.longitude_mid_baidu;
                                        var mid_lat = item.latitude_mid_baidu;
                                        var centerPoint = new BMap.Point(mid_lng, mid_lat);
                                        if (type == 1) {
                                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint, item.top5_sector_set);
                                        } else if (type == 2) {
                                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint, item.sector_set);
                                        }
                                    }
                                },
                                showLinkPoorArea: function (event, item, type) {
                                    IntelligentRoadTest.showLinkPoorArea(event, item, type);
                                },
                                gotoShowSectorMessage: function (sectorDate) {
                                    IntelligentRoadTest.clickType = 1;
                                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid, sectorDate.cellid, IntelligentRoadTest.day);
                                },
                                gotoKPIList: function (item) {
                                    if (item.sector_set != null) {
                                        var sectorArr = item.sector_set.split("@");
                                        showOrHideInputImage(2);
                                        IntelligentRoadTest.loadKPIListData(sectorArr);
                                        $("#kpiBackPoor").html("返回上一级");
                                    }
                                },
                                editSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.editSystemLayer(item, 8);
                                },
                                resetSystemLayer: function (item, event) {
                                    IntelligentRoadTest_SystemLayerEdit.resetSystemLayer(item, 8, event);
                                },
                                saveSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.saveSystemLayer(item, 8);
                                },
                                commitSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.commitSystemLayer(item, 8);
                                },
                                recoverSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer(item, 8);
                                },
                                deleteSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer(item, 8);
                                },
                                redrawSystemLayer: function (item, event) {
                                    IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer(item, 8, event);
                                },
                                cancelSystemLayer: function (item, event) {
                                    IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer(item, 8, event);
                                },
                                showPolygonGrid: function (item, event) {
                                    IntelligentRoadTest.showHidePolygonGrid(item, event);
                                }
                            }
                        });
                    } else {
                        IntelligentRoadTest.marketCompleteVM.marketData = item;
                        IntelligentRoadTest.marketCompleteVM.dataIndex = index;
                        IntelligentRoadTest.marketCompleteVM.nrTop5Cell = nearTOP5;
                        IntelligentRoadTest.marketCompleteVM.mrTop5Cell = mrNearTOP5;
                        IntelligentRoadTest.marketCompleteVM.nearPoorAreaListData = nearPoorAreaList;
                        IntelligentRoadTest.marketCompleteVM.title = echartTitle;
                        IntelligentRoadTest.marketCompleteVM.isShowAlarmInfo = IntelligentRoadTest.isShowAlarmInfoMessage;
                    }
                },
                lastOrNext: function (type) {
                    if (type == 0) {
                        //上一页
                        if (IntelligentRoadTest.marketCurrentPage > 1) {
                            IntelligentRoadTest.marketCurrentPage = IntelligentRoadTest.marketCurrentPage - 1;
                            IntelligentRoadTest.marketVM.marketList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.marketCurrentResult, IntelligentRoadTest.marketCurrentPage);
                            IntelligentRoadTest.marketVM.currentPageNum = IntelligentRoadTest.marketCurrentPage;
                            IntelligentRoadTest.marketVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.marketVM.lastIndex = IntelligentRoadTest.lastIndex;
                        } else {
                            alert("当前页是第一页");
                        }
                    } else {
                        if (IntelligentRoadTest.marketCurrentPage < IntelligentRoadTest.marketTotalPage) {
                            IntelligentRoadTest.marketCurrentPage = IntelligentRoadTest.marketCurrentPage + 1;
                            IntelligentRoadTest.marketVM.marketList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.marketCurrentResult, IntelligentRoadTest.marketCurrentPage);
                            IntelligentRoadTest.marketVM.currentPageNum = IntelligentRoadTest.marketCurrentPage;
                            IntelligentRoadTest.marketVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.marketVM.lastIndex = IntelligentRoadTest.lastIndex;
                        }
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.marketVM.marketList, 16);
                },
                gotoPage: function () {
                    var page = $("#marketPage").val();
                    page = parseInt(page);
                    if (page > 0 && page <= IntelligentRoadTest.marketTotalPage) {
                        IntelligentRoadTest.marketCurrentPage = page;
                        IntelligentRoadTest.marketVM.marketList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.marketCurrentResult, IntelligentRoadTest.marketCurrentPage);
                        IntelligentRoadTest.marketVM.currentPageNum = IntelligentRoadTest.marketCurrentPage;
                        IntelligentRoadTest.marketVM.startIndex = IntelligentRoadTest.startIndex;
                        IntelligentRoadTest.marketVM.lastIndex = IntelligentRoadTest.lastIndex;
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.marketVM.marketList, 11);
                },
                goLast: function () {
                    IntelligentRoadTest.marketCurrentPage = IntelligentRoadTest.marketTotalPage;
                    IntelligentRoadTest.marketVM.marketList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.marketCurrentResult, IntelligentRoadTest.marketCurrentPage);
                    IntelligentRoadTest.marketVM.currentPageNum = IntelligentRoadTest.marketCurrentPage;
                    IntelligentRoadTest.marketVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.marketVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.marketVM.marketList, 16);
                    $("#marketCount").html("返回上一级(本页显示第" + IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex + "条的数据，共" + IntelligentRoadTest.marketTotalCount + "条数据)");
                },
                goFirst: function () {
                    IntelligentRoadTest.marketCurrentPage = 1;
                    IntelligentRoadTest.marketVM.marketList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.marketCurrentResult, IntelligentRoadTest.marketCurrentPage);
                    IntelligentRoadTest.marketVM.currentPageNum = IntelligentRoadTest.marketCurrentPage;
                    IntelligentRoadTest.marketVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.marketVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.marketVM.marketList, 16);
                    $("#marketCount").html("返回上一级(本页显示第" + IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex + "条的数据，共" + IntelligentRoadTest.marketTotalCount + "条数据)");
                },
                turnMk: function (index, item) {
                    for (var i = 0; i < IntelligentRoadTest.markerList.length; i++) {
                        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.markerList[i]);
                    }

                    for (var i = 0; i < IntelligentRoadTest.lngArr.length; i++) {
                        var lng = IntelligentRoadTest.lngArr[i];
                        var lat = IntelligentRoadTest.latArr[i];
                        var color = "#fff"
                        var img = "../js/IntelligentRoadTest/images/bg_num.png";
                        if (i == index) {
                            img = "../js/IntelligentRoadTest/images/maker2.png";
                            color = "black";
                            IntelligentRoadTest.openInfoWindow(lng, lat, item.esbh_name);
                        }
                        IntelligentRoadTest.addMk(lng, lat, img, i, color, item.esbh_name);
                        $("#showMarketDiv").find(".listUL > li").eq(i).find(".numSpan").css("background", "url(../js/IntelligentRoadTest/images/bg_num.png)");
                        $("#showMarketDiv").find(".listUL > li").eq(i).css("background", "#fff");
                    }
                    $("#showMarketDiv").find(".listUL > li").eq(index).find(".numSpan").css("background", "url(../js/IntelligentRoadTest/images/maker2.png)");
                    $("#showMarketDiv").find(".listUL > li").eq(index).css("background", "#f4f4f4");
                }
            }
        });
    } else { //改变数值
        IntelligentRoadTest.marketVM.marketList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.marketCurrentResult, IntelligentRoadTest.marketCurrentPage);
        IntelligentRoadTest.marketVM.totalPages = IntelligentRoadTest.marketTotalPage;
        IntelligentRoadTest.marketVM.totalCounts = IntelligentRoadTest.marketTotalCount;
        IntelligentRoadTest.marketVM.currentPageNum = IntelligentRoadTest.marketCurrentPage;
        IntelligentRoadTest.marketVM.startIndex = IntelligentRoadTest.startIndex;
        IntelligentRoadTest.marketVM.lastIndex = IntelligentRoadTest.lastIndex;
        if (IntelligentRoadTest.index == 17) {
            IntelligentRoadTest.drawMk(IntelligentRoadTest.marketVM.marketList, 17);
        }
        if (!$("#showMarketCompleteMessage").is(":visible")) {
            // $("#marketCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
            //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.marketTotalCount +"条数据)");
        }
    }
    if (IntelligentRoadTest.currentLocation == "market") {
        IntelligentRoadTest.goMarketCompleteMessage();
    }

}
//----------------------------农贸市场列表结束 ----------------------------------------

//-----------------------------美景列表开始-------------------------------------

IntelligentRoadTest.showSceneryData = function IntelligentRoadTest_showSceneryData(result) {
    IntelligentRoadTest.sceneryCurrentPage = 1;
    IntelligentRoadTest.sceneryTotalCount = result.length;
    var pageCount = result.length / IntelligentRoadTest.pageSize;
    if ((result.length % IntelligentRoadTest.pageSize) != 0) {
        IntelligentRoadTest.sceneryTotalPage = parseInt(pageCount) + 1; //总页数，没有整除时加上1
    } else {
        IntelligentRoadTest.sceneryTotalPage = pageCount;  //整除不用加1
    }

    if (IntelligentRoadTest.sceneryVM == null) {
        IntelligentRoadTest.sceneryVM = new Vue({
            el: '#showSceneryDiv',
            data: {
                sceneryList: IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.sceneryCurrentResult, IntelligentRoadTest.sceneryCurrentPage),
                totalPages: IntelligentRoadTest.sceneryTotalPage,
                totalCounts: IntelligentRoadTest.sceneryTotalCount,
                currentPageNum: IntelligentRoadTest.sceneryCurrentPage,
                startIndex: IntelligentRoadTest.startIndex,
                lastIndex: IntelligentRoadTest.lastIndex,
                isAuditor: concernAreaShare.isAuditor
            },
            methods: {
                showMessage: function (item, index) {
                    IntelligentRoadTest.mkIndex = index;
                    IntelligentRoadTest.cacheItem = item;
                    //跳转到美食详情
                    IntelligentRoadTest.goSceneryCompleteMessage();
                    IntelligentRoadTest.removeEsbhPolyline();//清除附近弱区的多边形（工单监测）
                    if (item.alarm_id != null && item.alarm_id != '') { //判断该对象是否需要展示工单监测指标
                        IntelligentRoadTest.isShowAlarmInfoMessage = true;
                    }
                    /*else{
                        IntelligentRoadTest.isShowAlarmInfoMessage = false;
                    }*/
                    //增加查询工单指标的方法
                    if (IntelligentRoadTest.isShowAlarmInfoMessage == true) {
                        IntelligentRoadTest.getSenseObjectAlarmInfoData("天翼蓝鹰美景", item.esbh_id, IntelligentRoadTest.day, item.poor_coverage_set);
                    }
                    IntelligentRoadTest.showPolygon(item.gis_data, undefined, "scenery", item.esbh_id, IntelligentRoadTest.day, item.esbh_name);
                    IntelligentRoadTest.loadGrid(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                    /*IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
                        [
                            {"key":"区域名称","val":item.esbh_name},
                            {"key":"区域编号","val":item.esbh_id},
                        ]
                    );*/


                    // $('#concernHandleDescribe').val(item.handle_description);
                    if (IntelligentRoadTest.mapClick) {
                        IntelligentRoadTest.mapClick = false;
                    } else {
                        if ((item.audit_stat != '待审核' || item.audit_style != '删除') && !IntelligentRoadTest.isChangeDate ) { //切换时间时不做定位
                            var zoom = getZoom(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu), zoom);
                        }else{
                            IntelligentRoadTest.isChangeDate = false;
                        }
                    }

                    if (!IntelligentRoadTest.isScreenCompared && IntelligentRoadTest.isAddMessageEvent) {//不是在分屏页，并且点击过分屏
                        if (!windowScreeen.closed) {//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
                            // windowScreeen.focus();
                            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item, 'scenery');
                        }
                    }
                    // $("#colorBar").click();

                    var RecentCellImg = $("#showSceneryCompleteMessage").find('.linkCell').children('img');
                    $(RecentCellImg).each(function () {
                        var srcText = $(this).attr('src');
                        var clickImg = srcText.replace("nor", "click");
                        var norImg = srcText.replace("click", "nor");
                        if (srcText == clickImg) {
                            $(this).attr('src', norImg);
                        }
                    });
                    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();

                    var echartTitle = "历史30天覆盖变化";
                    // IntelligentRoadTest.getSense30DayLineData(7, item.esbh_id, item.city);//加载30天的折线图
                    IntelligentRoadTest.getSenseAllMR30DayData("美景",item.esbh_id , item.day , item.city, false); //加载30天的折线图
                    IntelligentRoadTest.getSenseAllMrData(item.day , "美景" , item.esbh_id ,item.city, false);
                    var nearTOP5 = [];
                    if (item.top5_sector_set != null && item.top5_sector_set != "") {
                        var to5DataArr = item.top5_sector_set.split("@");
                        for (var i = 0; i < to5DataArr.length; i++) {
                            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
                        }
                    }
                    var mrNearTOP5 = [];
                    if (item.sector_set != null && item.sector_set != "") {
                        var mrTo5DataArr = item.sector_set.split("@");
                        for (var k = 0; k < mrTo5DataArr.length; k++) {
                            mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
                        }
                    }
                    if (IntelligentRoadTest.checkIfHasSameSector(nearTOP5, mrNearTOP5)) {
                        item.isHasSameSector = true;
                    }
                    var nearPoorAreaList = []; //附近弱覆盖区域集合
                    if (item.poor_coverage_set != null && item.poor_coverage_set != '') {
                        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.nb_poor_coverage_set);
                    }
                    var poorAreaList = [];//弱覆盖区域集合
                    if (item.poor_coverage_set != null && item.poor_coverage_set != '') {
                        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
                    }
                    IntelligentRoadTest.polygonList = [];
                    IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList, 1);
                    IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList, 2);
                    if (item.day != null && item.day.toString().indexOf("-") < 0) { //转换日期格式
                        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
                    }
                    $(".linkCell").attr("title", "显示连线");
                    $(".linkCell").removeClass("linkCellHover");

                    // 增加一个查询,获取图层的版本信息等
                    IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData(item, 7);
//                    var user_role = $('#user_role_List_string').val();

                    if (item.audit_style == '删除' && item.audit_stat == '审核通过') {
                        $("#showSceneryCompleteMessage").find('.systemLayerBottonLi').hide();
                        $("#showSceneryCompleteMessage").find('.systemLayerDelete').hide();
                        $("#showSceneryCompleteMessage").find('.systemLayerDeleteEnd').show();
                    } else {
                        if (IntelligentRoadTest.user_role.indexOf('审核员') < 0) {
                            $("#showSceneryCompleteMessage").find('.systemLayerBottonLi').hide();
                            $("#showSceneryCompleteMessage").find('.systemLayerDelete').hide();
                        } else {
                            $("#showSceneryCompleteMessage").find('.systemLayerBottonLi').show();
                            $("#showSceneryCompleteMessage").find('.systemLayerDelete').show();
                        }
                        $("#showSceneryCompleteMessage").find('.systemLayerDeleteEnd').hide();
                    }
                    if (IntelligentRoadTest.sceneryCompleteVM == null) {
                        IntelligentRoadTest.sceneryCompleteVM = new Vue({
                            el: '#showSceneryCompleteMessage',
                            data: {
                                sceneryData: item,
                                dataIndex: index,
                                nrTop5Cell: nearTOP5,
                                mrTop5Cell: mrNearTOP5,
                                title: echartTitle,
                                isShowAlarmInfo: IntelligentRoadTest.isShowAlarmInfoMessage,
                                alarm_dataObj: {}, //用于存放从告警表中获取到的指标的对象
                                alaram_title: "工单监测",
                                uname: IntelligentRoadTest.currentUser,
                                nearPoorAreaListData: nearPoorAreaList,
                                allMRDataList : []
                            },
                            methods: {
                                sceneryPosition: function (item) {
                                    // IntelligentRoadTest.sceneryPositiong(item);
                                    var zoom = getZoom(item.longitude_max_baidu, item.longitude_min_baidu, item.latitude_max_baidu, item.latitude_min_baidu);
                                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu, item.latitude_mid_baidu), zoom);
                                },
                                /*editSceneryMessage : function (item) {
                                    IntelligentRoadTest.sceneryEdit(item);
                                },
                                deleteScenery : function(item , ind){
                                    IntelligentRoadTest.sceneryDelete(item);
                                },*/
                                viewSceneryLog: function (item) {
                                    IntelligentRoadTest.sceneryLog(item);
                                },
                                // gotoScenerySevenEchart : function (item) {
                                //     IntelligentRoadTest.scenerySevenLine(item);
                                // },
                                showDetailInfo: function (event) {
                                    IntelligentRoadTest.showDetailInfo(event);
                                },
                                showLinkCell: function (event, item, type) {
                                    //type=1最近小区，type=2 接入扇区
                                    if ($(event.currentTarget).hasClass("linkCellHover")) {
                                        $(event.currentTarget).attr("title", "显示连线");
                                        $(event.currentTarget).removeClass("linkCellHover");
                                        if (type == 1) {
                                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                                        } else if (type == 2) {
                                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                                        }
                                    } else {
                                        $(event.currentTarget).attr("title", "隐藏连线");
                                        $(event.currentTarget).addClass("linkCellHover");
                                        var max_lng = item.longitude_max_baidu;
                                        var max_lat = item.latitude_max_baidu;
                                        var min_lng = item.longitude_min_baidu;
                                        var min_lat = item.latitude_min_baidu;
                                        var mid_lng = item.longitude_mid_baidu;
                                        var mid_lat = item.latitude_mid_baidu;
                                        var centerPoint = new BMap.Point(mid_lng, mid_lat);
                                        if (type == 1) {
                                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint, item.top5_sector_set);
                                        } else if (type == 2) {
                                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint, item.sector_set);
                                        }
                                    }
                                },
                                showLinkPoorArea: function (event, item, type) {
                                    IntelligentRoadTest.showLinkPoorArea(event, item, type);
                                },
                                gotoShowSectorMessage: function (sectorDate) {
                                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid, sectorDate.cellid, IntelligentRoadTest.day);
                                },
                                gotoKPIList: function (item) {
                                    if (item.sector_set != null) {
                                        var sectorArr = item.sector_set.split("@");
                                        showOrHideInputImage(2);
                                        IntelligentRoadTest.loadKPIListData(sectorArr);
                                        $("#kpiBackPoor").html("返回上一级");
                                    }
                                },
                                editSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.editSystemLayer(item, 7);
                                },
                                resetSystemLayer: function (item, event) {
                                    IntelligentRoadTest_SystemLayerEdit.resetSystemLayer(item, 7);
                                },
                                saveSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.saveSystemLayer(item, 7);
                                },
                                commitSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.commitSystemLayer(item, 7);
                                },
                                recoverSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer(item, 7);
                                },
                                deleteSystemLayer: function (item) {
                                    IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer(item, 7);
                                },
                                redrawSystemLayer: function (item, event) {
                                    IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer(item, 7, event);
                                },
                                cancelSystemLayer: function (item, event) {
                                    IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer(item, 7, event);
                                },
                                showPolygonGrid: function (item, event) {
                                    IntelligentRoadTest.showHidePolygonGrid(item, event);
                                }
                            }
                        });
                    } else {
                        IntelligentRoadTest.sceneryCompleteVM.sceneryData = item;
                        IntelligentRoadTest.sceneryCompleteVM.dataIndex = index;
                        IntelligentRoadTest.sceneryCompleteVM.nrTop5Cell = nearTOP5;
                        IntelligentRoadTest.sceneryCompleteVM.mrTop5Cell = mrNearTOP5;
                        IntelligentRoadTest.sceneryCompleteVM.nearPoorAreaListData = nearPoorAreaList;
                        IntelligentRoadTest.sceneryCompleteVM.isShowAlarmInfo = IntelligentRoadTest.isShowAlarmInfoMessage;
                        // IntelligentRoadTest.sceneryCompleteVM.title = echartTitle;
                    }

                },
                lastOrNext: function (type) {
                    if (type == 0) {
                        //上一页
                        if (IntelligentRoadTest.sceneryCurrentPage > 1) {
                            IntelligentRoadTest.sceneryCurrentPage = IntelligentRoadTest.sceneryCurrentPage - 1;
                            IntelligentRoadTest.sceneryVM.sceneryList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.sceneryCurrentResult, IntelligentRoadTest.sceneryCurrentPage);
                            IntelligentRoadTest.sceneryVM.currentPageNum = IntelligentRoadTest.sceneryCurrentPage;
                            IntelligentRoadTest.sceneryVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.sceneryVM.lastIndex = IntelligentRoadTest.lastIndex;
                        } else {
                            alert("当前页是第一页");
                        }
                    } else {
                        if (IntelligentRoadTest.sceneryCurrentPage < IntelligentRoadTest.sceneryTotalPage) {
                            IntelligentRoadTest.sceneryCurrentPage = IntelligentRoadTest.sceneryCurrentPage + 1;
                            IntelligentRoadTest.sceneryVM.sceneryList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.sceneryCurrentResult, IntelligentRoadTest.sceneryCurrentPage);
                            IntelligentRoadTest.sceneryVM.currentPageNum = IntelligentRoadTest.sceneryCurrentPage;
                            IntelligentRoadTest.sceneryVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.sceneryVM.lastIndex = IntelligentRoadTest.lastIndex;
                        }
                    }
                    // $("#sceneryCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
                    //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.sceneryTotalCount +"条数据)");
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.sceneryVM.sceneryList, 12);
                },
                gotoPage: function () {
                    var page = $("#sceneryPage").val();
                    page = parseInt(page);
                    if (page > 0 && page <= IntelligentRoadTest.sceneryTotalPage) {
                        IntelligentRoadTest.sceneryCurrentPage = page;
                        IntelligentRoadTest.sceneryVM.sceneryList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.sceneryCurrentResult, IntelligentRoadTest.sceneryCurrentPage);
                        IntelligentRoadTest.sceneryVM.currentPageNum = IntelligentRoadTest.sceneryCurrentPage;
                        IntelligentRoadTest.sceneryVM.startIndex = IntelligentRoadTest.startIndex;
                        IntelligentRoadTest.sceneryVM.lastIndex = IntelligentRoadTest.lastIndex;
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.sceneryVM.sceneryList, 12);
                    // $("#sceneryCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
                    //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.sceneryTotalCount +"条数据)");
                },
                goLast: function () {
                    IntelligentRoadTest.sceneryCurrentPage = IntelligentRoadTest.sceneryTotalPage;
                    IntelligentRoadTest.sceneryVM.sceneryList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.sceneryCurrentResult, IntelligentRoadTest.sceneryCurrentPage);
                    IntelligentRoadTest.sceneryVM.currentPageNum = IntelligentRoadTest.sceneryCurrentPage;
                    IntelligentRoadTest.sceneryVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.sceneryVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.sceneryVM.sceneryList, 12);
                    $("#sceneryCount").html("返回上一级(本页显示第" + IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex + "条的数据，共" + IntelligentRoadTest.sceneryTotalCount + "条数据)");
                },
                goFirst: function () {
                    IntelligentRoadTest.sceneryCurrentPage = 1;
                    IntelligentRoadTest.sceneryVM.sceneryList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.sceneryCurrentResult, IntelligentRoadTest.sceneryCurrentPage);
                    IntelligentRoadTest.sceneryVM.currentPageNum = IntelligentRoadTest.sceneryCurrentPage;
                    IntelligentRoadTest.sceneryVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.sceneryVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.sceneryVM.sceneryList, 12);
                    $("#sceneryCount").html("返回上一级(本页显示第" + IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex + "条的数据，共" + IntelligentRoadTest.sceneryTotalCount + "条数据)");
                },
                turnMk: function (index, item) {
                    for (var i = 0; i < IntelligentRoadTest.markerList.length; i++) {
                        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.markerList[i]);
                    }

                    for (var i = 0; i < IntelligentRoadTest.lngArr.length; i++) {
                        var lng = IntelligentRoadTest.lngArr[i];
                        var lat = IntelligentRoadTest.latArr[i];
                        var color = "#fff"
                        var img = "../js/IntelligentRoadTest/images/bg_num.png";
                        if (i == index) {
                            img = "../js/IntelligentRoadTest/images/maker2.png";
                            color = "black";
                            IntelligentRoadTest.openInfoWindow(lng, lat, item.esbh_name);
                        }
                        IntelligentRoadTest.addMk(lng, lat, img, i, color, item.esbh_name);
                        $("#showSceneryDiv").find(".listUL > li").eq(i).find(".numSpan").css("background", "url(../js/IntelligentRoadTest/images/bg_num.png)");
                        $("#showSceneryDiv").find(".listUL > li").eq(i).css("background", "#fff");
                    }
                    $("#showSceneryDiv").find(".listUL > li").eq(index).find(".numSpan").css("background", "url(../js/IntelligentRoadTest/images/maker2.png)");
                    $("#showSceneryDiv").find(".listUL > li").eq(index).css("background", "#f4f4f4");
                }
            }
        });
    } else { //改变数值
        IntelligentRoadTest.sceneryVM.sceneryList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.sceneryCurrentResult, IntelligentRoadTest.sceneryCurrentPage);
        IntelligentRoadTest.sceneryVM.totalPages = IntelligentRoadTest.sceneryTotalPage;
        IntelligentRoadTest.sceneryVM.totalCounts = IntelligentRoadTest.sceneryTotalCount;
        IntelligentRoadTest.sceneryVM.currentPageNum = IntelligentRoadTest.sceneryCurrentPage;
        IntelligentRoadTest.sceneryVM.startIndex = IntelligentRoadTest.startIndex;
        IntelligentRoadTest.sceneryVM.lastIndex = IntelligentRoadTest.lastIndex;
        if (IntelligentRoadTest.index == 12) {
            IntelligentRoadTest.drawMk(IntelligentRoadTest.sceneryVM.sceneryList, 12);
        }
        if (!$("#showSceneryCompleteMessage").is(":visible")) {
            // $("#sceneryCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
            //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.sceneryTotalCount +"条数据)");
        }
    }
    if (IntelligentRoadTest.currentLocation == "scenery") {
        IntelligentRoadTest.goSceneryCompleteMessage();
    }

}

//----------------------------美景列表结束 ----------------------------------------

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
                    //增加一个判断是否是城中村的判断
                    var isShowSaveBtn = false; //是否显示保存为关注区域的按钮的标识
                    if(IntelligentRoadTest.index == 21){ //是城中村
                        isShowSaveBtn = true;
                    }

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
                        if ((item.audit_stat != '待审核' || item.audit_style != '删除') && !IntelligentRoadTest.isChangeDate ) { //切换时间时不做定位
                            var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
                            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
                        }else{
                            IntelligentRoadTest.isChangeDate = false;
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
                    var typeName = "";
                    if(IntelligentRoadTest.senseObject != null){
                        typeNum = IntelligentRoadTest.senseObject.type ;
                        typeName = IntelligentRoadTest.senseObject.senseName;
                    }
                    // IntelligentRoadTest.getSense30DayLineData(typeNum , item.esbh_id , item.city);//加载30天的折线图
                    IntelligentRoadTest.getSenseAllMR30DayData(typeName ,item.esbh_id , item.day , item.city, false); //加载30天的折线图
                    IntelligentRoadTest.getSenseAllMrData(item.day , typeName , item.esbh_id ,item.city, false);
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
                                nearPoorAreaListData : nearPoorAreaList,
                                allMRDataList : [] ,
                                isShowSaveBtn : isShowSaveBtn
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
                                },
                                saveToConcernArea :  function (senseData) { //另存为关注区域
                                    IntelligentRoadTest.isPoorAreaSaveToConcern = true;
                                    IntelligentRoadTest.senseSaveToConcern = true; //作为和弱区保存为关注区域取分开来的变量
                                    IntelligentRoadTest.savePoorAreaToConcernArea(senseData);
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
                        IntelligentRoadTest.senseCompleteVM.isShowSaveBtn = isShowSaveBtn;
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


//--------------------------------------天翼蓝鹰5.0的场景详情页的修改—------------------------

//保存着区域场景类型的详情页所有的echart图divID的对象，以object_type作为索引，获取相关的详情页的echart图的divID
IntelligentRoadTest.senseEchartDivIDList = {
    "高校" : [ "collegeAllChart" , "collegeLineChart" , "collegeIndoorChart" , "collegeOutdoorChart" , "collegeAllChart2" , "collegeSecondChart" , "collegeIndoorChart2" , "collegeOutdoorChart2"] ,
    "高密度住宅区" : [ "uptownAllChart" , "uptownLineChart" , "uptownIndoorChart" , "uptownOutdoorChart" , "uptownAllChart2" , "uptownSecondChart" , "uptownIndoorChart2" , "uptownOutdoorChart2"] ,
    "高流量商务区" : [ "businessAllChart" , "businessLineChart" , "businessIndoorChart" , "businessOutdoorChart" , "businessAllChart2" , "businessSecondChart" , "businessIndoorChart2" , "businessOutdoorChart2"] ,
    "场馆" : [ "siteAllChart" , "siteLineChart" , "siteIndoorChart" , "siteOutdoorChart" , "siteAllChart2" , "siteSecondChart" , "siteIndoorChart2" , "siteOutdoorChart2"] ,
    "美食" : [ "foodAllChart" , "foodLineChart" , "foodIndoorChart" , "foodOutdoorChart" , "foodAllChart2" , "foodSecondChart" , "foodIndoorChart2" , "foodOutdoorChart2"] ,
    "美景" : [ "sceneryAllChart" , "sceneryLineChart" , "sceneryIndoorChart" , "sceneryOutdoorChart" , "sceneryAllChart2" , "scenerySecondChart" , "sceneryIndoorChart2" , "sceneryOutdoorChart2"] ,
    "农贸市场" : [ "marketAllChart" , "marketLineChart" , "marketIndoorChart" , "marketOutdoorChart" , "marketAllChart2" , "marketSecondChart" , "marketIndoorChart2" , "marketOutdoorChart2"] ,
    "战狼区域" : [ "warwolfAllChart" , "warwolfLineChart" , "warwolfIndoorChart" , "warwolfOutdoorChart" , "warwolfAllChart2" , "warwolfSecondChart" , "warwolfIndoorChart2" , "warwolfOutdoorChart2"] ,
    "中小学" : [ "senseAllChart" , "senseLineChart" , "senseIndoorChart" , "senseOutdoorChart" , "senseAllChart2" , "senseSecondChart" , "senseIndoorChart2" , "senseOutdoorChart2"] ,
    "城中村" : [ "senseAllChart" , "senseLineChart" , "senseIndoorChart" , "senseOutdoorChart" , "senseAllChart2" , "senseSecondChart" , "senseIndoorChart2" , "senseOutdoorChart2"]
};//存放区域场景类型的echartDiv名称的对象

/**
 * ********************************
 * @funcname IntelligentRoadTest.getSenseAllMrData
 * @funcdesc 根据场景区域的类型和对象ID获取该场景区域的全量MR指标的数据
 * @param {int} day ： 日期  {String} object_type ：场景类型 （比如 高校） {int} object_id ： 区域的ID   {boolean} isZL : 是否是战狼区域
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getSenseAllMrData = function(day , object_type , object_id ,city , isZL){
    if(isNull(object_type) || isNull(object_id) || isNull(day) || isNull(city)){ //参数判断
        console.log("参数缺失");
        return ;
    }
    var newObject_type = object_type;
    if(object_type == "战狼区域"){
        newObject_type = "高流量商务区";
    }
    var city_id = noceUtil.city_LATN_ID[city];
    var sqlList = [];
    if(day != null && object_type != null && object_id != null){
        var list = ["IntelligentRoadTestAnalysisV5_getSenseMRData" , "DAY:" + day , "OBJECT_TYPE:" + newObject_type , "OBJECT_ID:" + object_id , "CITYID:" + city_id];
        sqlList.push(list);
        var funcList = [IntelligentRoadTest.dealSenseAllMrData];
        var database = [3];
        progressbarTwo.submitSql(sqlList , funcList , database , [[object_type , isZL]]);
    }else{
        console.log("参数缺失");
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealSenseAllMrData
 * @funcdesc 处理查询返回的场景的全量MR指标数据
 * @param {Object} data : 查询返回的数据  {Array} params : 传递过来的参数
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealSenseAllMrData = function IntelligentRoadTest_dealSenseAllMrData(data , params){
    var result = callBackChangeData(data);
    var dataArr = [
        {
            name : "全量MR综合"
        } ,
        {
            name : "全量MR室内"
        } ,
        {
            name : "全量MR室外"
        }
        ]; //第一个表示全量MR数据， 第二表示全量MR室内数据 ，第三个表示全量MR室外数据
    if(result.length > 0){
        for(var i = 0; i < result.length; i++){
            if(result[i].agps_type == 0){
                dataArr[0] = result[i];
                dataArr[0].name = "全量MR综合";
            }else if(result[i].agps_type == 2){
                dataArr[1] = result[i];
                dataArr[1].name = "全量MR室内";
            }else{
                dataArr[2] = result[i];
                dataArr[2].name = "全量MR室外";
            }
        }
    }/*else{ //测试数据
        for(var i = 0; i < dataArr.length; i++){
            dataArr[i] = {
                cover_rate : 98.52,
                mr_count : 3250,
                rsrp_avg : -90.25,
                grid_count : 5200
            };
            if(i == 0){
                dataArr[i].name =  "全量MR综合";
            }else if(i == 1){
                dataArr[i].name =  "全量MR室内";
            }else{
                dataArr[i].name =  "全量MR室外";
            }
        }
    }*/
    console.log(dataArr);
    IntelligentRoadTest.setAllMrDataToVMByObjectType(params[0] , dataArr , params[1]);
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.setAllMrDataToVMByObjectType
 * @funcdesc 根据不同的场景类型，将处理好的全量MR数据赋值到不同的Vue对象实例中去
 * @param {String} object_type ： 场景类型
 *          {Array}  dataArr : 全量MR数据
 *          {boolean} isZL: 是否是战狼区域
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.setAllMrDataToVMByObjectType = function(object_type , dataArr , isZL){

    switch(object_type) {
        case '高校' :
            IntelligentRoadTest.collegeCompleteVM.allMRDataList = dataArr;
            break;
        case '场馆' :
            IntelligentRoadTest.siteCompleteVM.allMRDataList = dataArr;
            break;
        case '高密度住宅区' :
            IntelligentRoadTest.uptownCompleteVM.allMRDataList = dataArr;
            break;
        case '高流量商务区' :
            if(isZL == true){ //战狼区域
                IntelligentRoadTest.warwolfCompleteVM.allMRDataList = dataArr;
            }else{ //商务区
                IntelligentRoadTest.businessCompleteVM.allMRDataList = dataArr;
            }
            break;
        case '美食' :
            IntelligentRoadTest.foodCompleteVM.allMRDataList = dataArr;
            break;
        case '美景' :
            IntelligentRoadTest.sceneryCompleteVM.allMRDataList = dataArr;
            break;
        case '农贸市场' :
            IntelligentRoadTest.marketCompleteVM.allMRDataList = dataArr;
            break;
        case '中小学' :
            IntelligentRoadTest.senseCompleteVM.allMRDataList = dataArr;
            break;
        case '城中村' :
            IntelligentRoadTest.senseCompleteVM.allMRDataList = dataArr;
            break;
    }

}



/**
 * ********************************
 * @funcname IntelligentRoadTest.getSenseAllMR30DayData
 * @funcdesc 获取某个场景区域的30天全量MR覆盖趋势图数据
 * @param {String} object_type ：场景类型  {int} object_id ： 场景ID  {String} endDay ：结束时间  {boolean} isZL : 是否是战狼区域的标识
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getSenseAllMR30DayData = function(object_type , object_id , endDay , city , isZL) {
    if(isNull(object_type) || isNull(object_id) || isNull(endDay) || isNull(city)){ //参数判断
        console.log("参数缺失");
        return ;
    }
    var newObject_type = object_type;
    if(object_type == "战狼区域"){
        newObject_type = "高流量商务区";
    }
    var startDay = new Date(dealDateString(endDay).getTime() - 29 * 24 * 60 * 60 * 1000).Format("yyyyMMdd");
    var city_id = noceUtil.city_LATN_ID[city];
    var sqlList = [];
    var list = ["IntelligentRoadTestAnalysisV5_getSenseAllMR30DayData", "OBJECT_TYPE:" + newObject_type , "OBJECT_ID:" + object_id ,
                    "STARTDAY:" + startDay , "ENDDAY:" + endDay , "CITYID:" + city_id];
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealSenseAllMR30DayData];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database , [[object_type , isZL]]);
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealSenseAllMR30DayData
 * @funcdesc 某个场景区域30天全量MR覆盖率趋势数据的查询回调函数
 * @param {Object} data ： 查询返回的数据
 *          {Array} params : 传递过来的参数
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealSenseAllMR30DayData = function IntelligentRoadTest_dealSenseAllMR30DayData(data , params){
    var result = callBackChangeData(data);
    var allMrTotalData = [] ; //AGPS_TYPE = 0 全量MR综合数据
    var agpsMrData = []; //AGPS_TYPE = 1 AGPSMR数据
    var allMrInnerData = [] ; //AGPS_TYPE = 2 全量MR室内数据
    var allMrOuterData = [] ; //AGPS_TYPE = 3 全量MR室外数据
    for(var i = 0; i < result.length; i++){
        /*result[i].min_userex_upavgrate = 0.5 + i * 0.08;//造一些假的数据
        result[i].min_userex_dwavgrate = 3 + i * 0.08;*/
        switch(result[i].agps_type) {
        	case 0 :
                allMrTotalData.push(result[i]);
        		break;
            case 1 :
                agpsMrData.push(result[i]);
                break;
            case 2 :
                allMrInnerData.push(result[i]);
                break;
            case 3 :
                allMrOuterData.push(result[i]);
                break;
        }
    }
    var dataList = [allMrTotalData , agpsMrData ,allMrInnerData , allMrOuterData ]; //将数据保存在数组中方便遍历
    //到这里会获取到所有折线图的数据，这里开始显示
    var echartDivIdList = IntelligentRoadTest.senseEchartDivIDList[params[0]]; //获取到该场景类型下的所有echarts图的divID列表
    for(var k = 0; k < echartDivIdList.length; k++){
        if(k < 4){ //显示覆盖率的图
            IntelligentRoadTest.show30SenseDayEcharts(dataList[k] , echartDivIdList[k]);
        }else{ //显示上下行速率的图
            IntelligentRoadTest.showSenseSecondEchart(dataList[k - 4] ,echartDivIdList[k] );
        }
    }
}



IntelligentRoadTest.sense30DayEchartsList = {};//保存区域场景类型所有的覆盖率趋势图的echart对象的Object
/**********************************
 * @funcname IntelligentRoadTest.show30SenseDayEcharts
 * @funcdesc 显示30天的数据的echarts图
 * @param {Array}  result {String} divID
 * result表示需要展示的数据 ， divID表示echarts图所在的div的id
 * @author 林楚佳
 * @create
 ***********************************/
IntelligentRoadTest.show30SenseDayEcharts = function IntelligentRoadTest_show30SenseDayEcharts(result, divID ) {
    if (IntelligentRoadTest.sense30DayEchartsList[divID] != null) {
        IntelligentRoadTest.sense30DayEchartsList[divID].dispose();
    }
    IntelligentRoadTest.sense30DayEchartsList[divID] = echarts.init(document.getElementById(divID));
    result = IntelligentRoadTest.getEchartData(result); //将从数据库获取的数据进行处理，处理成30天的数据数组（从数据库查询返回的额数据有可能没有30天的数据，所以要补全）
    var option = null;
    var xAxisData = [];
    var seriesData = [];
    var coverData = [];
    if (result != null && result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            var day = result[i].create_time.toString().substring(5);
            xAxisData[i] = day;
            seriesData[i] = parseFloat(result[i].rsrp).toFixed(2);
            if (result[i].cover != null) {
                coverData[i] = (result[i].cover * 100).toFixed(2);
            } else {
                coverData[i] = result[i].cover;
            }
        }
    }

    var option = {
        legend: {
            left: 'center',
            top: '2%',
            data: ['RSRP', '覆盖率'],
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
        },
        grid: { //图表在div的布局控制
            top: '10%',
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        dataZoom: {//实现缩放功能
            type: "slider",
            show: true,
            // realtime : true,
            start: 0,
            bottom: '1%'

        },
        xAxis: [{ //X轴样式
            type: 'category',
            boundaryGap: true,
            axisLabel: {
                /*interval:0,*/
//					rotate:10,
                align: 'center',
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#686c78',
                }
            },
            axisTick: {
                show: true,
                alignWithLabel: true,
            },
            data: xAxisData,
        }],
        yAxis: [{ //Y轴样式
            type: 'value',
            name: 'dBm',
            scale: true,
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#686c78',
                },
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#EAEEF7',
                }
            }
        },
            { //Y轴样式
                type: 'value',
                name: '%',
                scale: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#686c78',
                    },
                },
                axisTick: {
                    show: false,
                },
                max: 100,
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#EAEEF7',
                    }
                }
            }
        ],
        series: [{ //图表数据样式
            type: 'line',
            symbolSize: 6,
            name: "RSRP",
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
            data: seriesData
        },
            { //图表数据样式
                type: 'line',
                symbolSize: 6,
                name: "覆盖率",
                smooth: true,
                yAxisIndex: 1,
                data: coverData
            }]
    };
    IntelligentRoadTest.sense30DayEchartsList[divID].setOption(option);
    IntelligentRoadTest.sense30DayEchartsList[divID].resize();
}
IntelligentRoadTest.secondEchartList = {}; //保存着所有场景的速率折线图echart图对象的Object

/*显示感知速率的echarts图*/
/**
 * ********************************
 * @funcname IntelligentRoadTest.showSenseSecondEchart
 * @funcdesc 显示速率的echart图
 * @param {Array} result ： 未处理前的数据（就是查询返回的数据经过callbackChangeData方法转换后的数据
 *          {String} divID ： echart图挂载的元素ID
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.showSenseSecondEchart = function IntelligentRoadTest_showSenseSecondEchart(result , divID  ){

    if (IntelligentRoadTest.secondEchartList[divID] != null) {
        IntelligentRoadTest.secondEchartList[divID].dispose();
    }
    IntelligentRoadTest.secondEchartList[divID] = echarts.init(document.getElementById(divID));
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
    IntelligentRoadTest.secondEchartList[divID].setOption(option);
    IntelligentRoadTest.secondEchartList[divID].resize();
    // showOrHideInputImage(1);

}


//-----------------------------地铁的详情页修改--------------------------------------

/**
 * ********************************
 * @funcname IntelligentRoadTest.getMetro30DayCoverData
 * @funcdesc 获取地铁详情页的30天覆盖趋势图和速率趋势图数据
 * @param {int} from_id : 起始站点ID  {int} to_id ： 结束站点ID  {String} endDay ： 结束日期
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getMetro30DayCoverData = function(from_id , to_id , endDay){
    if(isNull(from_id) || isNull(to_id) || isNull(endDay)){
        console.log("参数缺失");
    }
    var startDay = new Date(dealDateString(endDay).getTime() - 29 * 24 * 60 * 60 * 1000).Format("yyyyMMdd"); //获取开始时间
    var sqlList = [];
    var list = ["IntelligentRoadTestAnalysisV5_getMetroStation30DayData" , "STARTDAY:" + startDay , "ENDDAY:" + endDay , "FROM_STATION_ID:" + from_id , "TO_STATION_ID:" + to_id];
    sqlList.push(list);
    var funcList = [IntelligentRoadTest.dealMetro30DayCoverData];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database , [[from_id , to_id]]);

}

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealMetro30DayCoverData
 * @funcdesc 处理查询返回的地铁的30天覆盖率趋势图数据
 * @param {Object} data ： 查询返回的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealMetro30DayCoverData = function IntelligentRoadTest_dealMetro30DayCoverData(data , params){

    var result = callBackChangeData(data);
    // console.log(result);
//    这里要进行数据处理，处理出来综合双向、正向 、 方向 和开始站点 、结束站点这五种类型的数据
    /*
    * 处理规则如下：
    * 1.mr_flag = 1 的是正向
    * 2.mr_flag = -1 的是反向
    * 3.mr_flag = 2 的是综合双向
    * 4.mr_flag = 0 并且from_station_id = from_id 就是开始站点
    * 5.mr_flag = 0 并且from_station_id = to_id 就是结束站点
    * */

    // IntelligentRoadTest.show30SenseDayEcharts
    // IntelligentRoadTest.showSenseSecondEchart
    var forwardData = [];
    var reverseData = [];
    var two_wayData = [];
    var fromStationData = [];
    var toStationData = [];
    for(var i = 0; i < result.length; i++){
        if(result[i].mr_flag == 1){
            forwardData.push(result[i]);
        }else if(result[i].mr_flag == -1){
            reverseData.push(result[i]);
        }else if(result[i].mr_flag == 2){
            two_wayData.push(result[i]);
        }else{
            if(result[i].from_station_id == params[0]){ //起始站点
                fromStationData.push(result[i]);
            }else{
                toStationData.push(result[i]);
            }
        }
    }

    //显示折线图
    IntelligentRoadTest.show30SenseDayEcharts(two_wayData, "metroLineChart" );//双向综合
    IntelligentRoadTest.show30SenseDayEcharts(forwardData, "metroForwardLineChart" );//正向
    IntelligentRoadTest.show30SenseDayEcharts(reverseData, "metroReverseLineChart" );//反向
    IntelligentRoadTest.show30SenseDayEcharts(fromStationData, "metroStarStationChart" );//起始站点
    IntelligentRoadTest.show30SenseDayEcharts(toStationData, "metroEndStationChart" );//结束站点
    IntelligentRoadTest.showSenseSecondEchart(two_wayData, "metroSecondChart" );
    IntelligentRoadTest.showSenseSecondEchart(forwardData, "metroForwardSecondChart")
    IntelligentRoadTest.showSenseSecondEchart(reverseData, "metroReverseSecondChart")
    IntelligentRoadTest.showSenseSecondEchart(fromStationData, "metroStartStationSecondChart")
    IntelligentRoadTest.showSenseSecondEchart(toStationData, "metroEndStationSecondChart");
}


/**
 * ********************************
 * @funcname IntelligentRoadTest.changeShowMetroLine
 * @funcdesc 根据mr_flag显示某个地铁站间距的地图线路
 * @param {Object} lineObj : 站间段的对象   {int} mr_flag ：方向标识
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.changeShowMetroLine = function(lineObj , mr_flag){
    var result = IntelligentRoadTest.metroDataFilter(IntelligentRoadTest.allMetroDataObj[mr_flag + ""], lineObj.line_id, lineObj.from_station_id, lineObj.to_station_id);
    var stationMarkerResult = IntelligentRoadTest.metroDataFilter(IntelligentRoadTest.metro78StationToStationData[mr_flag + ""], lineObj.line_id, lineObj.from_station_id, lineObj.to_station_id);
    IntelligentRoadTest.metroStationToStationLineData = result;
    IntelligentRoadTest.metroStationToStationMarkerData = stationMarkerResult;
    if (result.length == 0) { //确保orderArr不为空数组
        return;
    }
    var lineMidPointArr = [];
    for (var i = 0; i < result.length; i++) {
        lineMidPointArr.push(new BMap.Point(result[i].longitude_mid, result[i].latitude_mid));
    }
    var metroViewport = IntelligentRoadTest.map.getViewport(lineMidPointArr);
    IntelligentRoadTest.map.centerAndZoom(metroViewport.center, metroViewport.zoom);
    IntelligentRoadTest.metorZoomAndCenter.threeLevel={center:metroViewport.center,zoom:metroViewport.zoom};
    IntelligentRoadTest.metroColorLegen();
    IntelligentRoadTest.initColorBarAll();
}