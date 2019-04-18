/*这个js只做一些页面元素的点击或者显示隐藏的操作，这个js主要是由艳萍操作*/
var IntelligentTuning = {};
IntelligentTuning.cityPermission_common = null;//用户分权分域所属
IntelligentTuning.day = 20180916;
IntelligentTuning.nrTopLineColor = "#CC66FF";//邻区连线线条颜色
IntelligentTuning.nrTopSectorColor = "#4661AC";//邻区填充颜色
// IntelligentTuning.nrSectorOverlay = [];//存放连线邻区的地图覆盖物，包括线和扇区
IntelligentTuning.nrCellList=[];//邻区列表的数据集合 //两个地图共用这个属性
IntelligentTuning.isScreen = false;//是否处于分屏模式
IntelligentTuning.isClickList = false;//是否从列表点进去的详情页,或者是从搜索列表点进去详情页
IntelligentTuning.neCellListLength = 3;
$(function () {
    IntelligentTuning.cityPermission_common = $('#cityPermission_common').val();
    if(IntelligentTuning.cityPermission_common != "全省"){ //这里确保默认选中的地市无误
        $("#sectorCityName").text(IntelligentTuning.cityPermission_common);
        $("#sectorDistrictName").text("全市");
        $("#sectorMktName").text("全区");
    }
    IntelligentTuning.loadMktCenterData();//全省营服名称、id
    IntelligentTuning.initListVue();//初始化列表的Vue对象
    IntelligentTuning.getSectorMaxDay();//初始化数据操作
    IntelligentTuning.initCompleteVue(); //初始化详情页的Vue对象
    IntelligentTuning.setSectorVMData();//初始化详情页的vue对象
    IntelligentTuning.backList = new List(); //初始化返回列表的List对象
    // console.log(IntelligentTuning.backList);
    var contentHeight = $(".main-content").height();
    $(".listInfo").height(contentHeight-130);
    $(".logoList").height(contentHeight-170);
    $(".helpInfo").height(contentHeight-90);
    $(window).resize(function () {
        var contentHeight = $(".main-content").height();
        $(".listInfo").height(contentHeight-130);
        $(".logoList").height(contentHeight-170);
        $(".helpInfo").height(contentHeight-90);
    });

    $("body").click(function (e) { //点击其他地方隐藏下拉列表
        if($(e.target).closest(".panelWrap,.searchDiv").length == 0){
            $(".panelDiv").slideUp();
        };
        if($(e.target).closest(".selectCity-name,.city-info").length == 0){
            $(".city-info").hide();
        };

        if($(e.target).closest(".select-name,.select-info").length == 0){
            $(".select-info").hide();
        };

        if($(e.target).closest(".searchBox").length == 0){
            $(".search-result").hide();
        };

        if($(e.target).closest(".searchImg,.coordinateType").length == 0){
            $(".coordinateType").hide();
        };
        if($(e.target).closest(".boxSelectionImg,.boxSelectionUl").length == 0){
            $(".boxSelectionUl").hide();
        };

        if($(e.target).closest(".inSightSector").length == 0){
            $(".inSightSectorSelect").hide();
        };

        if($(e.target).closest("#helpTip").length == 0){
            $(".helpInfo").hide();
        };

    });

    /*$(".logoImg").click(function () {
        //返回初始状态 所有面板收起，地图显示6大问题 级别显示在10公里
        $(".panelDiv").slideUp();
        $(".listInfo").slideUp();
        $(".coordinateType").slideUp();


    });*/

    //搜索文本框点击显示logo面板列表
    $("#searchText").click(function () {
        $(".panelDiv").slideDown();
    });

    $(".searchImg").click(function () {
        $(".coordinateType").slideDown();
    });
    $(".coordinateType li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(this).parent().hide();
        var coordinateTypeId = $(this).children('label').attr('id');
        if(coordinateTypeId == 'radioCell'){
            $('#searchText').attr('placeholder','基站id、基站id_小区id、扇区名称');
        }else if(coordinateTypeId == 'radioCellName'){
            $('#searchText').attr('placeholder','扇区名称');
        }else if(coordinateTypeId == 'radioAddress'){
            $('#searchText').attr('placeholder','地址');
        }else if(coordinateTypeId == 'radioGPS'){
            $('#searchText').attr('placeholder','硬件GPS经纬度');
        }else if(coordinateTypeId == 'radioBaidu'){
            $('#searchText').attr('placeholder','百度经纬度');
        }else{
            $('#searchText').attr('placeholder','');
        }
    });




    //进入列表页
    $(".rowDiv li").click(function () {
        IntelligentTuningMap.firstLoad=false;
        $(".contentWrap").css("width","420px");
        var clickElementID = $(this).attr("id");
        var isShowAllSector = false; //这里点击的是某个问题的类目，所以这里一定是false

        IntelligentTuning.clickFlag = true;
        var index = $(".rowDiv li").index($(this)); //
        $(".listInfo .listWrapInfo").eq(index).show().siblings().hide();
        $(".listInfo .listWrapInfo").eq(index).find(".listWrap").slideDown("slow").siblings(".detailList").hide();
        $("#" + clickElementID + "Left").addClass("active").siblings().removeClass("active"); //左侧问题栏目的高亮显示设置
        IntelligentTuning.filterAndShowList(clickElementID , isShowAllSector);//过滤并显示列表数据
        IntelligentTuningMap.listProblem=IntelligentTuning.currentProblemName;
        IntelligentTuning.goSectorList(); //进入扇区列表
        IntelligentTuning.drawMk(IntelligentTuning.sectorVM.sectorList); //显示水滴点
    });
    //地市、分类、排序点击显示下拉框列表
    $(".listTopUl li .select-name").click(function () {
        $(this).parent().siblings().find(".select-info").hide();
        $(this).siblings(".select-info").toggle();
    });
    //列表点击显示详情页（这里只是艳萍为了展示页面写的，后面需要删除（需修改）
    $(".listUL li").click(function () {

        $(".contentWrap").css("width","60%");
        $(".detailList").slideDown().siblings().hide();

    });
    //详情页的返回图标点击显示列表
    //这里后面要修改成真正的返回上一个查看的对象
    $(".backList").click(function () {

        IntelligentTuningMap.listProblem=IntelligentTuning.currentProblemName;
        IntelligentTuningMap.isInSightSector=false;
        IntelligentTuningScreen.isInSightSector=false;
        IntelligentTuning.checkWhereToGo();//检测要跳转到哪个扇区或者列表
        // IntelligentTuning.goBackToList();//返回列表

        IntelligentTuning.hideGridOrPolygonNrTopSector(IntelligentTuningMap);//清除邻区
        //清除分屏模式的缓存数据和将值进行默认化
        IntelligentTuningScreen.exitScreen();
    });

    //加载框的X按钮
    $(".closeProgress").click(function(){
        $(this).parents(".progressBox").hide();
    });

    //问题筛选列表点击事件
    $(".problemList").click(function(){
        IntelligentTuningMap.firstLoad=false;
        var isShowAllSector = false;
        var currentClass = $(this).attr("class");
        if(currentClass != null && currentClass.indexOf("active") > -1){ //点击的对象是原来就高亮的，说明是要显示所有扇区的
            isShowAllSector = true;
            $(this).removeClass("active"); //移除高亮的样式
        }else{
            $(this).addClass("active").siblings().removeClass("active");
        }
        var elementId = $(this).attr("id").trim(); //获取到点击的对象的ID

        $("#currentArea").hide();//隐藏当前区域的文字的li
        $("#sectorCitySelect").show(); //设置区域显示框显示
        if(IntelligentTuning.clickEye == true){ //如果是点击了眼睛，需要先做一下操作
            $("#searchAreaButton").removeClass("active"); //移除高亮的样式
            $("#searchAreaButton").css("background","#fff");
            $("#currentArea").hide();//隐藏当前区域的文字的li
            $("#sectorCitySelect").show(); //设置区域显示框显示
            IntelligentTuning.clickEye = false; //设置是都点击眼睛为false，这时候drawMk会进行地图的缩放移动操作的
            // IntelligentTuningMap.map.removeOverlay(IntelligentTuning.currentBoundsPolyline); //移除标识范围的虚线
            // IntelligentTuning.currentBoundsPolyline = null; //置空
        }
        //这里需要些一个触发过滤数据的方法（待补上）
        IntelligentTuning.filterAndShowList(elementId , isShowAllSector);//过滤并显示列表数据
        IntelligentTuning.goSectorList();//显示列表
    });


    //那个范围内搜索的眼睛按钮的点击事件
    /**
    $("#searchAreaButton").click(function(){
        var currentClass = $(this).attr("class");//获取当前对象的className
        if(currentClass != null && currentClass.indexOf("active") > -1) { //取消列表显示视野范围内的扇区的功能
            $(this).removeClass("active"); //移除高亮的样式
            $(this).css("background","#fff");
            $("#currentArea").hide();//隐藏当前区域的文字的li
            $("#sectorCitySelect").show(); //设置区域显示框显示
            IntelligentTuning.clickEye = false; //设置是都点击眼睛为false，这时候drawMk会进行地图的缩放移动操作的
            // IntelligentTuningMap.map.removeOverlay(IntelligentTuning.currentBoundsPolyline); //移除标识范围的虚线
            // IntelligentTuning.currentBoundsPolyline = null; //置空
            IntelligentTuning.sectorCurrentMapResult=IntelligentTuning.filtSectorByProblem(IntelligentTuning.sectorResult); //获取到当前地图需要显示的数据，赋值给IntelligentTuning.sectorCurrentMapResult变量 ，这个给小芳使用的
            IntelligentTuningMap.handleCovSectorData(IntelligentTuning.sectorCurrentMapResult,"topMap");//渲染扇区图层
            IntelligentTuning.filtSectorByArea(IntelligentTuning.sectorCurrentMapResult); //获取到当前列表的值
            IntelligentTuning.excuteFilterSector();//将值执行过滤排序之后渲染到页面上
        }else{
            $(this).addClass("active");
            $(this).css("background","#0072BA");
            $(".problemList").removeClass("active"); //移除左侧问题类型的高亮
            $("#sectorCitySelect").hide(); //设置区域显示框隐藏
            $("#currentArea").show();//显示当前区域的文字的li
            IntelligentTuning.clickEye = true; //设置是都点击眼睛为true，这时候drawMk是不会进行地图的缩放移动操作的
            IntelligentTuning.currentProblemName = null; //在点击眼睛的时候，是显示所有的扇区的
            var bounds = IntelligentTuningMap.map.getBounds();
            if(isNotNullOrEmpty(bounds)){
                IntelligentTuning.drawCurrentBounds(bounds.getSouthWest() , bounds.getNorthEast());
                IntelligentTuning.filterByMapBounds(bounds.getSouthWest() , bounds.getNorthEast()); //过滤出这个区域内的所有扇区数据 IntelligentTuning.sectorAreaListChe
                IntelligentTuning.sectorCurrentMapResult=IntelligentTuning.filtSectorByProblem(IntelligentTuning.sectorResult); //获取到当前地图需要显示的数据，赋值给IntelligentTuning.sectorCurrentMapResult变量 ，这个给小芳使用的
                IntelligentTuningMap.handleCovSectorData(IntelligentTuning.sectorCurrentMapResult,"topMap");//渲染扇区图层
                IntelligentTuning.excuteFilterSector();//过滤之后排序后显示在列表上
                // IntelligentTuning.goSectorList();//显示列表
            }else{
                alert("无法获取到当前视野范围");
            }
        }
        if(IntelligentTuning.backList.size() != 0 && IntelligentTuning.backList.get(IntelligentTuning.backList.lastIndex()).currentLocation == "completeMessage"){ //在详情页中
            IntelligentTuning.goBackToList();//通过返回的方式返回列表
            IntelligentTuning.drawMk(IntelligentTuning.sectorVM.sectorList); //显示水滴点
        }else{
            IntelligentTuning.goSectorList();//显示列表
        }
    });*/

    //详情页标题点击展开/收起内容
    $(".infoTitle").click(function () {
        $(this).siblings().toggle();
        if ($(this).find(".btn-showInfo").children().hasClass("rotateImg")){
            $(this).find(".btn-showInfo").children().removeClass("rotateImg");
        } else{
            $(this).find(".btn-showInfo").children().addClass("rotateImg");
        }
    });
    //显示/隐藏logo的名称
    $(".showLogoName").click(function () {
        if ($(".logoList ").css("width")=="50px"){
            $(".showLogoName").children().addClass("rotateImg");
            $(".logoList ").animate({width:150}, 800);
        } else{
            $(".showLogoName").children().removeClass("rotateImg");
            $(".logoList").animate({width:50}, 800);
        }
    });
    //详情页标题点击展开/收起内容
    $(".listBottom").click(function () {
        $(this).siblings().toggle();

        if($(".listBottom").hasClass("showListBottom")){
            $(".searchText").show();
            $(".dataUpdateTime").hide();
            $(".listBottom").removeClass("showListBottom");
            $(".listInfo").height(0);
            $(".showListInfo").children("img").addClass("rotateImg");
            $(".showListInfo").children("span").text("展开");
            $(".contentWrap").css("width","420px");
        }else {
            $(".searchText").hide();
            $(".dataUpdateTime").show();
            $(".listBottom").addClass("showListBottom");
            $(".listInfo").height($(".main-content").height()-130);
            $(".showListInfo").children("img").removeClass("rotateImg");
            $(".showListInfo").children("span").text("收起");
            if($(".detailList").css("display")=="block"){
                $(".contentWrap").css("width","60%");
            }
            IntelligentTuningChart.resizeChart();
        }

    });

    $('.listUL').on("mouseout",function(){
        var id="showSectorListDiv";
        var img="../js/IntelligentRoadTest/images/markeRq.png";
        for(var i=0;i<20;i++){
            $("#"+id).find(".listUL > li").eq(i).find(".numSpan").css("background","url("+"../js/IntelligentRoadTest/images/bg_num.png"+")");
            $("#"+id).find(".listUL > li").eq(i).find(".numSpan2").css("background","url("+"../js/IntelligentRoadTest/images/markeRq.png"+")");
            try {
                IntelligentRoadTest.markerList[i].setIcon(new BMap.Icon(img, new BMap.Size(22,32)));
            } catch (e) {
            }
        }
        IntelligentTuning.drawMk(IntelligentTuning.sectorVM.sectorList , false); //重绘水滴点
        $('#cirTip').hide();//隐藏提示框
    });

    $("#currentArea .closeArea").click(function () {
        $("#currentArea").hide();
        $("#sectorCitySelect").show();
    });

    //方案详情：点击基站小区编号_小区名称分组展开、收起
    $(".splitTr .dateSplit").click(function () {
        if ($(this).find(".btn-showInfo").children().hasClass("rotateImg")){
            $(this).find(".btn-showInfo").children().removeClass("rotateImg");
            $(this).parents(".splitTr").siblings().hide();
        } else{
            $(this).find(".btn-showInfo").children().addClass("rotateImg");
            $(this).parents(".splitTr").siblings().show();
        }
    });
    //方案设置文字点击显示文本框、确定图标、取消图标
    $(".editText input").click(function () {
        $(this).removeClass("disable-input");
        $(this).removeAttr("readonly");
        $(this).siblings().show();

        $(".edit-sure").click(function () {
            $(this).parent().siblings().addClass("disable-input");
            $(this).parent().siblings().attr("readonly",true);
            $(this).parent().hide();
        });
        $(".edit-cancel").click(function () {
            $(this).parent().siblings().addClass("disable-input");
            $(this).parent().siblings().attr("readonly",true);
            $(this).parent().hide();
        });
    });

    //方案对比、小区对比按钮点击显示确定、取消按钮，第一列显示2个复选框
    $(".btn_contrast").click(function () {
        $(this).hide().siblings().show();
        var html = '<ul class="checkboxGroup">\n' +
            '\t\t\t\t\t<li><input type="checkbox" name="vs_first"></li>\n' +
            '\t\t\t\t\t<li><input type="checkbox" name="vs_second"></li>\n' +
            '\t\t\t</ul>';
        $(this).parents("table").find("tr td:first-child").html(html);

        if($(this).parents("table").find("#planRecordTbody").length>0){
            //方案对比
            // console.log('方案对比');
            //点开方案对比的时候，需要将邻区列表的状态恢复
            $("#nrCellDiv .btnGroup .btn-cancel").trigger('click');

        }else if($(this).parents("table").find('#nrCellList').length>0){
            // console.log('邻区列表');
            //点开邻区列表的时候，需要将方案对比的状态恢复
            $("#planRecordDiv .btnGroup .btn-cancel").trigger('click');
        }else{
            console.log('无法识别当前需要进行哪种类型的分屏对比');
        }

        $('input:checkbox[name=vs_first]').unbind('click').bind('click',function(){
            $('input:checkbox[name=vs_first]').each(function(){
                if($(this).is(':checked')){
                    $(this).removeAttr('checked');
                }
            });
            $(this).attr('checked','checked').siblings().removeAttr('checked');
        });

        $('input:checkbox[name=vs_second]').unbind('click').bind('click',function(){
            $('input:checkbox[name=vs_second]').each(function(){
                if($(this).is(':checked')){
                    $(this).removeAttr('checked');
                }
            });
            $(this).attr('checked','checked').siblings().removeAttr('checked');
        });
    });

    //方案对比的确定按钮地那就
    $(".btnGroup .btn-sure").click(function () {
        //还是需要显示确定和取消按钮
        // $(this).parent().hide();
        // $(this).parent().siblings().show();
        // $(this).parents("table").find(".checkboxGroup").addClass("sureText");

        if ($(this).parents("table").find('#nrCellList').length>0 || $(this).parents("table").find('#planRecordTbody').length>0) {

            var type = null;
            var topMapCell = null;
            var bottomMapCell = null;
            var topDay = null;
            var bottomDay = null;

            if($(this).parents("table").find('#nrCellList').length>0){
                // console.log('进入邻区列表的分屏对比');
                //获取对应的小区
                if($('input:checkbox[name=vs_first]:checked').length<1){
                    alert('请勾选一个上分屏小区');
                    return;
                }

                if($('input:checkbox[name=vs_second]:checked').length<1){
                    alert('请勾选一个下分屏小区');
                    return;
                }
                type = 'nrCell';
                topMapCell = $('input:checkbox[name=vs_first]:checked').parents('tr').children('td').eq(1).children('span').text();
                bottomMapCell = $('input:checkbox[name=vs_second]:checked').parents('tr').children('td').eq(1).children('span').text();
                topDay = IntelligentTuning.day;
                bottomDay = IntelligentTuning.day;
                // IntelligentTuningScreen.loadScreenMapData(IntelligentTuning.day,IntelligentTuning.day,topMapCell,bottomMapCell,type);
                // console.log('topMapCell:'+topMapCell);
                // console.log('bottomMapCell:'+bottomMapCell);
            }else if($(this).parents("table").find('#planRecordTbody').length>0){
                // console.log('进入方案对比的分屏对比');
                //获取对应的日期
                if($('input:checkbox[name=vs_first]:checked').length<1){
                    alert('请勾选一个上分屏日期');
                    return;
                }

                if($('input:checkbox[name=vs_second]:checked').length<1){
                    alert('请勾选一个下分屏日期');
                    return;
                }

                var topMapDate = $('input:checkbox[name=vs_first]:checked').parents('tr').children('td').eq(1).children('span').text();
                var bottomMapDate = $('input:checkbox[name=vs_second]:checked').parents('tr').children('td').eq(1).children('span').text();
                /*var topDate = topMapDate.substring(0,topMapDate.indexOf('<')).trim();
                var bottomDate = bottomMapDate.substring(0,bottomMapDate.indexOf('<')).trim();*/
                topDay = topMapDate.trim().split('/').join('');
                bottomDay = bottomMapDate.trim().split('/').join('');
                if(isNotNullOrEmpty(topDay) && isNotNullOrEmpty(bottomDay)){
                    var cellCode = IntelligentTuning.sectorCompleteVM.sectorData.enodeb_id + '_' + IntelligentTuning.sectorCompleteVM.sectorData.cell_id;
                    type = 'planRecord';
                    topMapCell = cellCode;
                    bottomMapCell = cellCode;
                }
                // IntelligentTuningScreen.loadScreenMapData(topDay,bottomDay,cellCode,cellCode,type);
            }

            if(isNotNullOrEmpty(topDay) && isNotNullOrEmpty(bottomDay) && isNotNullOrEmpty(topMapCell) && isNotNullOrEmpty(bottomMapCell) && isNotNullOrEmpty(type)){
                //控制地图的显示
                $(".spiltScreen").show(); //显示分屏的地图
                $(".baiduMapDiv").height("50%");

                //可视区域小区隐藏列表、列表+地图连个选项
                $(".containList").hide(); //显示分屏的地图


                //如果地图没有初始化，则进行初始化
                if(IntelligentTuningScreen.initMapEnd == false){
                    IntelligentTuningScreen.initScreenMap();
                }else{
                    IntelligentTuningScreen.synMap();
                }
                IntelligentTuning.isScreen = true;
                //移除水滴点
                IntelligentTuning.removeMarkerList();
                IntelligentTuningMap.legendGrid(IntelligentTuningMap);
                setTimeout(function (){
                    IntelligentTuningScreen.loadScreenMapData(topDay,bottomDay,topMapCell,bottomMapCell,type);
                },500);

            }else{
                console.log('进入分屏时参数错误');
            }

        }else{
            console.log('无法识别进入哪个类型的分屏对比');
        }
    });

    //方案对比的取消按钮地那就
    $(".btnGroup .btn-cancel").click(function () {
        $(".spiltScreen").hide(); //隐藏分屏的地图
        $(".baiduMapDiv").height("100%");
        $(this).parent().hide();
        $(this).parent().siblings().show();
        $(this).parents("table").find(".checkboxGroup").remove();
        var td = $(this).parents("table").find("tr td:first-child");
        for (var i = 0; i<td.length; i++) {
            td[i].innerText=(i+1);
        }
        IntelligentTuning.isScreen = false;
        IntelligentTuningMap.legendGrid(IntelligentTuningMap);
    });

    //左上角的logo点击事件
    //实现效果如下：地图以当前地市为地图的中心点，并将缩放级别设置为10公里级别，并隐藏地图上的任何东西
    $("#logoBtn").click(function(){

        //1如果是在详情页，需要先触发返回列表的操作
        if(IntelligentTuning.backList.size() != 0){
            var currentLocation = IntelligentTuning.backList.get(IntelligentTuning.backList.lastIndex()).currentLocation;
            if(currentLocation != "list"){ //在详情页中
                $("#sectorCount").trigger("click"); //触发返回的事件
            }
        }

        //2.如果列表存在，收起列表
        /*$(".listTopUl,.listDivWrap").hide();
        $(".panelWrap").show();
        $(".listInfo").hide();
        $(".searchTitle").slideUp();
        $(".circleTipLeft").hide();
        $(".showListBottom").hide();*/

        $(".panelWrap").show();
        $(".listInfo").hide();


        //3.清除地图上所有的覆盖物
        if(IntelligentTuning.isScreen){
            IntelligentTuningScreen.exitScreen();
        }
        IntelligentTuningMap.clearOverlays(IntelligentTuningMap);
        IntelligentTuning.removeMarkerList();//移除地图上的水滴点


        //4重新加载地图上的问题小区的概览图
        var day = IntelligentTuning.currentQueryDay;
        var city = $("#sectorCityName").text();
        var city_id = noceUtil.city_LATN_ID[city];
        IntelligentTuning.queryProblemListByCity(city_id , day);
        IntelligentTuningMap.map.setCenter(city);
        IntelligentTuningMap.map.setZoom(11);
    });

    // 跳转到统计导出
    $("#chartTablePage").click(function () {
        var dayFormat = ""+IntelligentTuning.currentQueryDay;
        dayFormat = dayFormat.substring(0,4) + "-"
            + dayFormat.substring(4,6)
            + "-" + dayFormat.substring(6,8);
        var dayFormatDate = new Date(dayFormat);
        dayFormatDate.setDate(dayFormatDate.getDate()-30);

        var startDay = dayFormatDate.Format("yyyyMMdd");

        var appId = noceUtil.GetQueryString("appId");
        var menuId = noceUtil.GetQueryString("menuId");
        var perId = noceUtil.GetQueryString("perId");
        var appName = noceUtil.GetQueryString("appId");
        var startTime = startDay;
        var endTime = IntelligentTuning.currentQueryDay;
        var mapCity = IntelligentTuning.cityPermission_common;
        var mapDistrict = $("#mapDistrict").text();

        var url ="pages_index_Index_home.action?appId="+appId+"&menuId="+menuId+
            "&perId="+perId+"&id_path=new&isRedirect=true&appName="+appName+"&isChart=1"+
            "&senceName="+IntelligentTuning.currentProblemName+
            "&day="+startTime+"&endDay="+endTime+"&mapCity="+mapCity+"&mapDistrict="+mapDistrict;
        url= encodeURI(url);
        window.open(url);
    });

    $("#helpTip").click(function () {
        $(".helpInfo").show();
    });
});

/**
 * ********************************
 * @funcname IntelligentTuning.checkUrlIsHasMessage
 * @funcdesc 检查url是否带有基站编号、小区编号以及日期这些信息
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.checkUrlIsHasMessage = function(){
    /*这里检查url是否带有基站编号、小区编号以及日期*/
    var day = noceUtil.GetQueryString("day"); //获取日期
    var enodeb_id = noceUtil.GetQueryString("enodeb_id");//获取基站ID
    var cell_id = noceUtil.GetQueryString("cell_id"); //获取小区ID

    var obj = null;
    if(!isnull(day) && !isnull(enodeb_id) && !isnull(cell_id)){ //三个数据缺一不可
        obj = {};
        obj.day = day;
        obj.enodeb_id = enodeb_id;
        obj.cell_id = cell_id;
    }
    return obj;
}


/**
 * ********************************
 * @funcname changeDate
 * @funcdesc 日期改变调用的方法
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
function changeDate(){
    var day = $("#seachTime").text();
    IntelligentTuning.day = day; //设置这个值为当前选中的日期
    //当前正在查看的是附近小区
    if(IntelligentTuningMap.isInSightSector){
        $("#inSightSector .inSightSectorSelect > div.active").click();
        return;
    }

    if(IntelligentTuning.isScreen){
        //分屏模式的时候，上方地图切换时间
        IntelligentTuningScreen.topDay = day;
        IntelligentTuningScreen.loadTopMapData(day,IntelligentTuningScreen.topCellCode,IntelligentTuningScreen.type);

        //下方地图切换事件
        // IntelligentTuningScreen.bottomDay = day;
        // IntelligentTuningScreen.loadBottomMapData(day,IntelligentTuningScreen.bottomCellCode,IntelligentTuningScreen.type);

    }else{
        //不是分屏模式的时候
        var currentLocation = "";//用于记录当前页面显示的是详情页还是列表页还是什么都没有显示的标识属性
        if(IntelligentTuning.backList.size() == 0){ //初始化的时候，还未进入任何列表，这时候改变日期还是要重新加载数据的
            IntelligentTuning.queryAllSectorData(IntelligentTuning.day , IntelligentTuning.currentQueryCity,"topMap"); //重查数据
            if(!isnull(IntelligentTuningMap.cacheItem)){
                IntelligentTuning.getScreenMessageById(IntelligentTuningMap.cacheItem.enodeb_id,IntelligentTuningMap.cacheItem.cell_id,day,"topMap");
            }
            return ;
        }else{
            //IntelligentTuning.backList.get(IntelligentTuning.backList.lastIndex())表示最后一个的位置，也即是当前所在的位置
            currentLocationObj = IntelligentTuning.backList.get(IntelligentTuning.backList.lastIndex());
            if(currentLocationObj.currentLocation == "list"){ //当前正处于列表的状态
                IntelligentTuningMap.listProblem=IntelligentTuning.currentProblemName;
                IntelligentTuning.queryAllSectorData(IntelligentTuning.day , IntelligentTuning.currentQueryCity,"topMap"); //重查数据
                if(!isnull(IntelligentTuningMap.cacheItem)){
                    IntelligentTuning.getScreenMessageById(IntelligentTuningMap.cacheItem.enodeb_id,IntelligentTuningMap.cacheItem.cell_id,day,"topMap");
                }
            }else{ //当前正处于详情页的状态
                //这是留给小芳的入口，让小芳在切换日期的时候可以切换地图上的信息显示
                IntelligentTuning.updateMapSector(IntelligentTuning.day , IntelligentTuning.currentQueryCity,"topMap"); //重查地图的扇区数据
                if(!isnull(IntelligentTuningMap.cacheItem)){
                    IntelligentTuning.getScreenMessageById(IntelligentTuningMap.cacheItem.enodeb_id,IntelligentTuningMap.cacheItem.cell_id,day,"topMap");
                }

            }
        }
    }



}

//查询全省的营服进行缓存，（不查询轮廓）
IntelligentTuning.loadMktCenterData = function IntelligentTuning_loadMktCenterData(){
    /*if(window.localStorage){//检查浏览器是否支持localStorage，不支持则乖乖的去查询
        var mkcenterData = JSON.parse(localStorage.getItem("NOCEMktcenterData"));
        var isSaveForLocalStorage = false;

        if(mkcenterData==undefined){//如果本地没有存储，则需要将数据进行存储
            isSaveForLocalStorage = true;
            var list = ["Common_04_city_area_mkt_NameAndId"];
            var progressBarSqls=[];
            progressBarSqls.push(list);
            var functionlist = [IntelligentTuning.handleMktcenterJson];
            progressbarTwo.submitSql(progressBarSqls, functionlist , [3] ,[isSaveForLocalStorage], null, null, null, true);
        }else{
            if(mkcenterData.version == noceUtil.districtGisDataVersion){
                IntelligentTuning.handleMktcenterJson(mkcenterData.data);
            }else{
                isSaveForLocalStorage = true;
                var list = ["Common_04_city_area_mkt_NameAndId"];
                var progressBarSqls=[];
                progressBarSqls.push(list);
                var functionlist = [IntelligentTuning.handleMktcenterJson];
                progressbarTwo.submitSql(progressBarSqls, functionlist , [3] ,[isSaveForLocalStorage], null, null, null, true);
            }

        }
    }else{*/
        var list = ["Common_04_city_area_mkt_NameAndId"];
        var progressBarSqls=[];
        progressBarSqls.push(list);
        var functionlist = [IntelligentTuning.handleMktcenterJson];
        progressbarTwo.submitSql(progressBarSqls, functionlist , [3], null, null, null, true);
    // }
}


IntelligentTuning.handleMktcenterJson = function IntelligentTuning_handleMktcenterJson(data,isSaveForLocalStorage){
    var result = callBackChangeData(data);
    /*if(isSaveForLocalStorage){
        var saveData = {};
        saveData.version = noceUtil.districtGisDataVersion;
        saveData.data = data;
//		console.log(JSON.stringify(saveData));
        localStorage.setItem("NOCEMktcenterData",JSON.stringify(saveData));
        saveData = null;
    }*/

    var mktcenterDataChe = {};
    var city = "",district_id="",marketbase="";
    var districtArr = [];
    var districtObj = {};
    for(var i=0;i<result.length;i++){
        city = result[i].city_name;
        district_id=result[i].district_id+"_"+result[i].district_name;
        marketbase= {"id":result[i].mktcen_id,"name":result[i].mktcen_name,"max_lng":result[i].max_lng,"max_lat":result[i].max_lat,
            "min_lng":result[i].min_lng,"min_lat":result[i].min_lat};
        if(null==mktcenterDataChe[city]){//city缓存的数据为null
            districtObj = {};
            var marketbaseArr=[];
            marketbaseArr.push(marketbase);//营服中心数组
            districtObj[district_id]=marketbaseArr;//区县对象
            mktcenterDataChe[city]=districtObj;//缓存区县营服中心数据
        }else{//city缓存的数据不为null
            districtObj=mktcenterDataChe[city];//从缓存取该city的区县对象
            if(null==districtObj[district_id]){//如果区县对象为空，定义营服中心数组并加值，否则给区县对象的营服中心数据加值
                var marketbaseArr=[];
                marketbaseArr.push(marketbase);//营服中心数组
                districtObj[district_id]=marketbaseArr;
            }else{
                districtObj[district_id].push(marketbase);
            }
        }
    }
//	console.log(mktcenterDataChe);
    IntelligentTuning.mktcenterLngAndLat = mktcenterDataChe;
    mktcenterDataChe = null;

    IntelligentTuning.initMktcenterSelect();
};

/**
 * 初始化带有营服中心的地市列表
 */
IntelligentTuning.initMktcenterSelect = function IntelligentTuning_initMktcenterSelect(){
    var poorAreaStr = '';
    if(IntelligentTuning.cityPermission_common=='全省'){
        poorAreaStr += '<li class="AllCity"><a href="javascript:;">全省</a></li>';
        for(var currentCity in IntelligentTuning.mktcenterLngAndLat){
            poorAreaStr += '<li><a href="javascript:;">'+currentCity+'</a><ul class="districtName">';
            var districtObj = IntelligentTuning.mktcenterLngAndLat[currentCity];
            var isAllCountry = true;
            for(var currentCountry in districtObj){
                var country_id = currentCountry.split('_')[0];
                var country_name = currentCountry.split('_')[1];
                if(isAllCountry){
                    poorAreaStr += '<li><a href="javascript:;">'+currentCity+'</a><ul class="yfcenterName"><li><a href="javascript:;">全市</a></li></ul></li>';
                    isAllCountry = false;
                }
                poorAreaStr += '<li><a href="javascript:;">'+country_name+'</a><ul class="yfcenterName">';//区县层//营服层

                var mktcenter = districtObj[currentCountry];//营服数组
                for(var i=0;i<mktcenter.length;i++){
                    if(i==0){
                        poorAreaStr += '<li><a href="javascript:;">全区</a></li>';
                    }
                    poorAreaStr += '<li><a href="javascript:;">'+mktcenter[i].name+'</a></li>';
                }
                poorAreaStr += '</ul></li>';//结束营服层
            }
            poorAreaStr += '</ul></li>';//结束区县层
        }
    }else{
        var districtObj = IntelligentTuning.mktcenterLngAndLat[IntelligentTuning.cityPermission_common];
        var currentCity = IntelligentTuning.cityPermission_common;
        poorAreaStr += '<li><a href="javascript:;">'+currentCity+'</a><ul class="districtName">';
        var isAllCountry = true;
        for(var currentCountry in districtObj){
            var country_id = currentCountry.split('_')[0];
            var country_name = currentCountry.split('_')[1];
            //currentCountry:id_name

            if(isAllCountry){
                poorAreaStr += '<li><a href="javascript:;">'+currentCity+'</a><ul class="yfcenterName"><li><a href="javascript:;">全市</a></li></ul></li>';
                isAllCountry = false;
            }

            poorAreaStr += '<li><a href="javascript:;">'+country_name+'</a><ul class="yfcenterName">';//区县层//营服层
            var mktcenter = districtObj[currentCountry];//营服数组
            for(var i=0;i<mktcenter.length;i++){
                if(i==0){
                    poorAreaStr += '<li><a href="javascript:;">全区</a></li>';
                }
                poorAreaStr += '<li><a href="javascript:;">'+mktcenter[i].name+'</a></li>';
            }
            poorAreaStr += '</ul></li>';//结束营服层
        }
    }

    $('#sectorCitySelectList').html(poorAreaStr);

    IntelligentTuning.districtSelectBindEvent("sectorCitySelect");

}

//根据传入的id绑定事件
IntelligentTuning.districtSelectBindEvent = function IntelligentTuning_districtSelectBindEvent(selectId){
    /*地市列表*/
    $("#"+selectId+" .cityName > li").on("mouseover",function () {
        $(this).addClass("selectedCity").siblings().removeClass("selectedCity");
        $("#"+selectId+" .districtName").hide();
        $(this).children(".districtName").show();
    });

    // 区县列表
    $("#"+selectId+" .cityName .districtName li").on("click",function (){
        $("#"+selectId+" .districtName li").removeClass("selected");
        $(this).addClass("selected");
        $(this).parents("li").addClass("selectedCity").siblings().removeClass("selectedCity");
        $("#"+selectId+" .districtName").hide();
        $(this).parent().show();
        $("#"+selectId+" .city-selected").text($(this).parent().siblings().text());
        $("#"+selectId+" .district-selected").text($(this).children().text());
        $("#"+selectId+" .mktcenter-selected").text();
        $("#" + selectId +" .city-selected").show();
        $("#" + selectId +" .city-selected-gt").show();
        $("#" + selectId +" .mktcenter-selected").hide();
        $("#" + selectId +" .mktcenter-selected-gt").hide();
        $("#" + selectId +" .city-info").hide();
    });

    /*三级地市列表点击*/
    $("#"+selectId+" .threeLevel > li").on("click",function (){
        $(".selectedCity").removeClass("selectedCity");
        $(this).addClass("selectedCity");
        var cityName = $(this).children().text();
        if(cityName=='全省'){
            $("#"+selectId+" .city-selected").text(cityName);
            $("#"+selectId+" .district-selected").text('');
            $("#"+selectId+" .mktcenter-selected").text('');
            $("#"+selectId+" .city-selected-gt").hide();
            $("#"+selectId+" .city-selected").show();
            $("#"+selectId+" .mktcenter-selected-gt").hide();
            $("#"+selectId+" .mktcenter-selected").hide();
            $("#" + selectId +" .city-info").hide();
            IntelligentTuning.areaRangeChange(cityName,null,null);
        }
        $("#"+selectId+" .districtName").hide();
        $(this).children(".districtName").show();
    });

    /*三级区县*/
    $("#"+selectId+" .threeLevel .districtName > li > a").on("mouseover click",function (e) {
        $("#"+selectId+" .districtName > li a").removeClass("selected");
        $(this).addClass("selected");
        $("#"+selectId+" .yfcenterName").hide();
        $(this).siblings(".yfcenterName").show();
        e.stopPropagation();
    });

    // 三级营服中心
    $("#"+selectId+" .yfcenterName li").on("click",function (e){
        $("#"+selectId+" .yfcenterName li").removeClass("selected");
        $(this).addClass("selected");
        $(this).parents("li").addClass("selectedCity").siblings().removeClass("selectedCity");
        $("#"+selectId+" .yfcenterName").hide();
        $(this).parent().show();
        e.stopPropagation();
        var city = $("#"+selectId+" .threeLevel").children('.selectedCity').children('a').text();
        $("#"+selectId+" .city-selected").text(city);
        var districtName = $(this).parent().siblings().text();
        var districtAllName = $(this).parent().siblings().text();
        var mktName = $(this).children().text();
        var mktAllName = $(this).children().text();
        if(districtName.length>3){
            districtName = districtName.substring(0,1)+"..."+districtName.substring(districtName.length-1);
        }
        if(mktName.length>3){
            mktName = mktName.substring(0,1)+"..."+mktName.substring(mktName.length-1);
        }
        $("#"+selectId+" .district-selected").text(districtName);
        $("#"+selectId+" .mktcenter-selected").text(mktName);
        if($(this).children().text()=='全区'){
            $("#"+selectId+" .city-selected-gt").show();
            $("#"+selectId+" .city-selected").show();
            $("#"+selectId+" .mktcenter-selected-gt").hide();
            $("#"+selectId+" .mktcenter-selected").hide();
            $("#" + selectId +" .city-info").hide();
            IntelligentTuning.areaRangeChange(city,districtAllName,null);
        }else if($(this).children().text()=='全市'){//将营服设置为全区
            $("#"+selectId+" .district-selected").text('全市');
            $("#"+selectId+" .city-selected-gt").show();
            $("#"+selectId+" .city-selected").show();
            $("#"+selectId+" .mktcenter-selected-gt").hide();
            $("#"+selectId+" .mktcenter-selected").hide();
            $("#"+selectId+" .mktcenter-selected").text('全区');
            $("#" + selectId +" .city-info").hide();
            IntelligentTuning.areaRangeChange(city,null,null);
        }else{
            $("#"+selectId+" .city-selected-gt").hide();
            $("#"+selectId+" .city-selected").hide();
            $("#"+selectId+" .mktcenter-selected-gt").show();
            $("#"+selectId+" .mktcenter-selected").show();
            $("#" + selectId +" .city-info").hide();
            IntelligentTuning.areaRangeChange(city,districtAllName,mktAllName);
        }
    });
}
//切换地市、区县、营服调用触发的方法
//当只切换地市时，区县和营服为null
//切换区县时，null为空
IntelligentTuning.areaRangeChange = function(city,districtName,mktAllName){
    // console.log(city+"-"+districtName+"-"+mktAllName);
    if(city == "全省"){ //这个后面再做

    }
    //说明切换了地市了
    if(city != IntelligentTuning.currentQueryCity){
        IntelligentTuningMap.listProblem=IntelligentTuning.currentProblemName;
        IntelligentTuning.queryAllSectorData(IntelligentTuning.day , city,"topMap"); //重新查询数据
    }else{
        IntelligentTuningMap.listProblem=IntelligentTuning.currentProblemName;
        IntelligentTuning.filtSectorByArea(IntelligentTuning.sectorCurrentMapResult); //获取到当前列表的值
        // IntelligentTuning.setSectorVMData();//将值渲染到页面上
        IntelligentTuning.excuteFilterSector();
    }

}
















