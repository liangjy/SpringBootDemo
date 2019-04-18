/*整个应用的主js，这里主要放置Vue对象*/

/*-----------------------------变量声明区域开始-------------------------------*/
IntelligentTuning.day = null; //日期
IntelligentTuning.backList = null; //存放访问过的对象的数据的列表，用于点击返回时使用
IntelligentTuning.startIndex = 0; //数据开始的位置
IntelligentTuning.lastIndex = 0; //数据结束的位置
IntelligentTuning.pageSize = 20; //列表的每页数据条数
//扇区列表的属性
IntelligentTuning.sectorResult = [];//扇区列表查询数据的缓存
IntelligentTuning.sectorCurrentMapResult = []; //地图上需要显示出来的扇区的数据
IntelligentTuning.sectorAreaListChe = [];//扇区列表在某个区域范围内的数据的缓存，这个用于分类筛选时使用到
IntelligentTuning.sectorCurrentResult = [];//扇区列表当前数据的缓存
IntelligentTuning.sectorVM = null; //扇区列表的Vue对象
IntelligentTuning.sectorCurrentPage = 1; //扇区列表的当前页数
IntelligentTuning.sectorTotalPage = 0; //扇区列表总页数
IntelligentTuning.sectorTotalCount = 0;//扇区列表总记录数
IntelligentTuning.sectorCrossFliterObj = crossfilter([]);//扇区crossflilter对象
IntelligentTuning.filterSectorResult = [];//筛选后的扇区数据数组
IntelligentTuning.tempSectorFliterObj = null;//临时数据集
IntelligentTuning.isFilterSector = false;//是否排序过
IntelligentTuning.sectorCurrentSelectConditon = "";//扇区列表的前一个查询条件缓存
IntelligentTuning.currentProblemName = null; //当前的问题类型
IntelligentTuning.markerList = []; //地图上的水滴点的数组
IntelligentTuning.sectorFilterConditionArr = ["不限" , "不限" ,"不限" ,"不限" ,"不限" , "不限", 1000 , "不限" , "不限" , "不限" ,"满足" ,"不限" , "不限"]; //存放扇区分类筛选的条件的数组
IntelligentTuning.clickEye = false; //记录是否点击了眼睛
//----------------------------------------------------------MOD3干扰扇区、重叠覆盖扇区和越区覆盖扇区开始--------------------------------------------

var normalSector = {};//存放所有扇区列表的一些属性的对象（比如index ， typeName等等）
normalSector.type = "";//用于筛选出来对应的数据的条件
normalSector.typeName = "扇区";
normalSector.senseName = "扇区";
normalSector.name = "sector";
normalSector.index = 3;

//替换原来的一些属性
var m3Sector = {};//存放MOD3干扰扇区列表的一些属性的对象（比如index ， typeName等等）
m3Sector.type = "IS_M3_COV";//用于筛选出来对应的数据的条件
m3Sector.typeName = "MOD3干扰扇区";
m3Sector.senseName = "MOD3干扰扇区";
m3Sector.name = "m3Sector";
m3Sector.index = 1;

var olSector = {};//存放重叠覆盖扇区列表的一些属性的对象（比如index ， typeName等等）
olSector.type = "IS_OL_COV";//用于筛选出来对应的数据的条件
olSector.typeName = "重叠覆盖扇区";
olSector.senseName = "重叠覆盖扇区";
olSector.name = "olSector";
olSector.index = 2;

var cbSector = {};//存放越区覆盖扇区列表的一些属性的对象（比如index ， typeName等等）
cbSector.type = "IS_CB_COV";//用于筛选出来对应的数据的条件
cbSector.typeName = "越区覆盖扇区";
cbSector.senseName = "越区覆盖扇区";
cbSector.name = "cbSector";
cbSector.index = 3;

IntelligentTuning.normalSector = normalSector;
IntelligentTuning.m3Sector = m3Sector;
IntelligentTuning.olSector = olSector;
IntelligentTuning.cbSector = cbSector;

IntelligentTuning.sectorObj = IntelligentTuning.normalSector; //默认显示所有扇区 IntelligentTuning.sectorObj标识当前所属的扇区对象是什么



/*-----------------------------变量声明区域结束--------------------------------*/

//---------------------实现List------------------------------
/*
 * List 大小可变数组
 */
function List() {
    this.list = new Array();
};

/**
 * 将指定的元素添加到此列表的尾部。
 * @param object 指定的元素
 */
List.prototype.add = function(object) {
    //this.list[this.list.length] = object;
    this.list.push(object);
};

/**
 * 将List添加到此列表的尾部。
 * @param listObject 一个列表
 */
List.prototype.addAll = function(listObject) {
    this.list = this.list.concat(listObject.list);
};

/**
 *  返回此列表中指定位置上的元素。
 * @param index 指定位置
 * @return 此位置的元素
 */
List.prototype.get = function(index) {
    return this.list[index];
};

/**
 *  获取元素在数组中的坐标,不存在则返回-1
 * @return true or false
 */
List.prototype.getObjectIndex = function(object) {
    var i = 0;
    for(; i < this.list.length; i++) {
        if( this.list[i] === object) {
            return i;
        }
    }
    return -1;
};

/**
 * 移除此列表中指定位置上的元素。
 * @param index 指定位置
 * @return 此位置的元素
 */
List.prototype.removeIndex = function(index) {
    var object = this.list[index];
    this.list.splice(index, 1);
    return object;
};

/**
 * 移除此列表中指定元素。
 * @param object 指定元素
 * @return 此位置的元素
 */
List.prototype.remove = function(object) {
    var i = this.getObjectIndex(object);

    if(i==-1) {
        return null;
    } else {
        return this.removeIndex(i);
    }
};

/**
 * 移除此列表中的所有元素。
 */
List.prototype.clear = function() {
    this.list.splice(0, this.list.length);
};

/**
 * 返回此列表中的元素数。
 * @return 元素数量
 */
List.prototype.size = function() {
    return this.list.length;
};

/**
 * 返回此列表中的最后一个元素的index。
 * @return 最后一个元素的index
 */
List.prototype.lastIndex = function() {
    return this.list.length - 1;
};

/**
 * 返回列表中指定的 start（包括）和 end（不包括）之间列表。
 * @param start 开始位置
 * @param end   结束位置
 * @return  新的列表
 */
List.prototype.subList = function(start, end) {
    var list = new List();
    list.list = this.list.slice(start, end);
    return list;
};

/**
 *  如果列表不包含元素，则返回 true。
 * @return true or false
 */
List.prototype.isEmpty = function() {
    return this.list.length == 0;
};


/**
 * ********************************
 * @funcname isNotNullOrEmpty
 * @funcdesc 判断对象是否是null或者空字符串
 * @param {Object} obj
 *
 * @return {boolean} true表示该对象不为null以及空字符串
 * @author 林楚佳
 * @create
 **********************************
 */
function isNotNullOrEmpty(obj){
    if(obj === undefined || obj === ""){
        return false;
    }else{
        return true;
    }
}

/**
 * ********************************
 * @funcname IntelligentTuning.initListVue
 * @funcdesc 初始化列表的Vue对象
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.initListVue = function(){
    var rateName = "";
    IntelligentTuning.sectorVM = new Vue({
        el : '#showSectorListDiv',
        data : {
            // sectorList : IntelligentTuning.getDataListByPage(IntelligentTuning.sectorCurrentResult , IntelligentTuning.sectorCurrentPage),
            sectorList : [], //列表数据
            sectorType : IntelligentTuning.sectorObj.name, //扇区类型
            rateName : rateName, //列表显示覆盖度的名称
            totalPages : IntelligentTuning.sectorTotalPage,
            totalCounts :  IntelligentTuning.sectorTotalCount ,
            currentPageNum :  IntelligentTuning.sectorCurrentPage,
            startIndex : IntelligentTuning.startIndex ,
            lastIndex : IntelligentTuning.lastIndex
        },
        methods : {
            showMessage : function (item,index){
                IntelligentTuning.mkIndex=index;
                IntelligentTuning.cacheItem=item;
                $('#showGridSub img').addClass("showGrid");
                $('#showGridSub img').attr("src","../js/IntelligentTuningV3/images/white_grid.png");
                $('#showGridSub img').attr("title","隐藏栅格");
                IntelligentTuning.isClickList=true;
                IntelligentTuningMap.gridTypeIndex=getNeedGridType(IntelligentTuningMap);

                IntelligentTuning.goSectorCompleteMessage(item.enodeb_id , item.cell_id);//跳转到详情页

                IntelligentTuning.getSectorMessageById(item.enodeb_id , item.cell_id,IntelligentTuning.day,"topMap"); //查询出这个扇区的详细数据，然后在这个查询的回调函数中调用各个模块的实现方法即可
                
               /* IntelligentTuningMap.map.removeOverlay(IntelligentTuning.circle);
                IntelligentTuning.showSector(item,IntelligentTuning.sectorObj.name);*/



                $(".linkCell").attr("title","显示连线");
                $(".linkCell").removeClass("linkCellHover");
                /*IntelligentTuning.sectorCompleteVM.sectorData = item;
                IntelligentTuning.sectorCompleteVM.isShowMore = isShowMore;
                IntelligentTuning.sectorCompleteVM.sectorOtherData = "";
                IntelligentTuning.sectorCompleteVM.rateName = rateName;
                IntelligentTuning.sectorCompleteVM.anotherRateName = anotherRateName;
                IntelligentTuning.sectorCompleteVM.nrCellList = nrCellList;
                IntelligentTuning.sectorCompleteVM.poorAreaListData =  poorAreaList;
                IntelligentTuning.sectorCompleteVM.nearPoorAreaListData =  nearPoorAreaList ;
                IntelligentTuning.sectorCompleteVM.TAArr = taArr;
                IntelligentTuning.sectorCompleteVM.stationDistanceList = stationDistanceList;
                IntelligentTuning.sectorCompleteVM.isShowCompleteMessage =  IntelligentTuning.isShowBaiduMap;*/
            },
            lastOrNext : function (type) {
                if(type == 0){
                    //上一页
                    if(IntelligentTuning.sectorCurrentPage >  1){
                        IntelligentTuning.sectorCurrentPage = IntelligentTuning.sectorCurrentPage - 1;
                        IntelligentTuning.sectorVM.sectorList = IntelligentTuning.getDataListByPage(IntelligentTuning.sectorCurrentResult , IntelligentTuning.sectorCurrentPage);
                        IntelligentTuning.sectorVM.currentPageNum = IntelligentTuning.sectorCurrentPage;
                        IntelligentTuning.sectorVM.startIndex = IntelligentTuning.startIndex;
                        IntelligentTuning.sectorVM.lastIndex = IntelligentTuning.lastIndex;
                    }else{
                        alert("当前页是第一页");
                    }
                }else{
                    if(IntelligentTuning.sectorCurrentPage < IntelligentTuning.sectorTotalPage){
                        IntelligentTuning.sectorCurrentPage = IntelligentTuning.sectorCurrentPage + 1;
                        IntelligentTuning.sectorVM.sectorList = IntelligentTuning.getDataListByPage(IntelligentTuning.sectorCurrentResult , IntelligentTuning.sectorCurrentPage);
                        IntelligentTuning.sectorVM.currentPageNum = IntelligentTuning.sectorCurrentPage;
                        IntelligentTuning.sectorVM.startIndex = IntelligentTuning.startIndex;
                        IntelligentTuning.sectorVM.lastIndex = IntelligentTuning.lastIndex;
                    }
                }
                IntelligentTuning.drawMk(IntelligentTuning.sectorVM.sectorList,3);
            },
            gotoPage : function(){
                var page = $("#sectorPage").val();
                page  = parseInt(page);
                if(page > 0 && page <= IntelligentTuning.sectorTotalPage){
                    IntelligentTuning.sectorCurrentPage = page;
                    IntelligentTuning.sectorVM.sectorList = IntelligentTuning.getDataListByPage(IntelligentTuning.sectorCurrentResult , IntelligentTuning.sectorCurrentPage);
                    IntelligentTuning.sectorVM.currentPageNum =IntelligentTuning.sectorCurrentPage;
                    IntelligentTuning.sectorVM.startIndex = IntelligentTuning.startIndex;
                    IntelligentTuning.sectorVM.lastIndex = IntelligentTuning.lastIndex;
                }
                IntelligentTuning.drawMk(IntelligentTuning.sectorVM.sectorList,3);
            },
            goLast :function () {
                IntelligentTuning.sectorCurrentPage = IntelligentTuning.sectorTotalPage;
                IntelligentTuning.sectorVM.sectorList = IntelligentTuning.getDataListByPage(IntelligentTuning.sectorCurrentResult , IntelligentTuning.sectorCurrentPage);
                IntelligentTuning.sectorVM.currentPageNum = IntelligentTuning.sectorCurrentPage;
                IntelligentTuning.sectorVM.startIndex = IntelligentTuning.startIndex;
                IntelligentTuning.sectorVM.lastIndex = IntelligentTuning.lastIndex;
                IntelligentTuning.drawMk(IntelligentTuning.sectorVM.sectorList,3);
            },
            goFirst :function () {
                IntelligentTuning.sectorCurrentPage = 1;
                IntelligentTuning.sectorVM.sectorList = IntelligentTuning.getDataListByPage(IntelligentTuning.sectorCurrentResult , IntelligentTuning.sectorCurrentPage);
                IntelligentTuning.sectorVM.currentPageNum = IntelligentTuning.sectorCurrentPage;
                IntelligentTuning.sectorVM.startIndex = IntelligentTuning.startIndex;
                IntelligentTuning.sectorVM.lastIndex = IntelligentTuning.lastIndex;
                IntelligentTuning.drawMk(IntelligentTuning.sectorVM.sectorList,3);
            },
            turnMk:function (index,item){
                for(var i=0;i<IntelligentTuning.markerList.length;i++){
                    IntelligentTuningMap.map.removeOverlay(IntelligentTuning.markerList[i]);
                }
                if(IntelligentTuning.lngArr == null){
                    return ;
                }
                for(var i=0;i<IntelligentTuning.lngArr.length;i++){
                    var lng=IntelligentTuning.lngArr[i];
                    var lat=IntelligentTuning.latArr[i];
                    var color="#2c2c2c"
                    var img="../js/IntelligentTuning/images/markeRq.png";
                    if(i==index){
                        img="../js/IntelligentTuning/images/maker2.png";
                        color="black";
                        IntelligentTuning.openInfoWindow(lng,lat,item.cell_name);
                    }
                    IntelligentTuning.addMk(lng,lat,img,i,color,item.cell_name);
                    $("#showSectorListDiv").find(".listUL > li").eq(i).find(".numSpan").css("background","url(../js/IntelligentTuning/images/bg_num.png)");
                }
                $("#showSectorListDiv").find(".listUL > li").eq(index).find(".numSpan").css("background","url(../js/IntelligentTuning/images/maker2.png)");
            }
        }
    });
}

/**
 * ********************************
 * @funcname IntelligentTuning.setSectorVMData
 * @funcdesc 设置扇区的列表的Vue对象中的数据
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.setSectorVMData = function(){
    //计算出总页数和总记录数
    var result = IntelligentTuning.sectorCurrentResult;
    IntelligentTuning.sectorCurrentPage = 1;
    IntelligentTuning.sectorTotalCount = result.length;
    var pageCount = result.length / IntelligentTuning.pageSize;
    if((result.length % IntelligentTuning.pageSize) != 0){
        IntelligentTuning.sectorTotalPage = parseInt(pageCount) + 1 ; //总页数，没有整除时加上1
    }else{
        IntelligentTuning.sectorTotalPage = pageCount;  //整除不用加1
    }
    var rateName = IntelligentTuning.currentProblemName;
    IntelligentTuning.sectorVM.sectorList = IntelligentTuning.getDataListByPage(IntelligentTuning.sectorCurrentResult , IntelligentTuning.sectorCurrentPage);
    IntelligentTuning.sectorVM.sectorType = IntelligentTuning.sectorObj.name;
    IntelligentTuning.sectorVM.rateName = rateName;
    IntelligentTuning.sectorVM.totalPages = IntelligentTuning.sectorTotalPage;
    IntelligentTuning.sectorVM.totalCounts =  IntelligentTuning.sectorTotalCount ;
    IntelligentTuning.sectorVM.currentPageNum =  IntelligentTuning.sectorCurrentPage;
    IntelligentTuning.sectorVM.startIndex = IntelligentTuning.startIndex ;
    IntelligentTuning.sectorVM.lastIndex = IntelligentTuning.lastIndex;

    //判断是否当前是否处于列表页，如果处于列表页，则需要画水滴点
    var isShowMarker = $("#showSectorListDiv").is(":visible");
    if(isShowMarker){
        //drawMk
        IntelligentTuning.drawMk(IntelligentTuning.sectorVM.sectorList);
    }
}

/*根据传入的数据集和页码来获取到该页的数据集*/
/**
 * ********************************
 * @funcname IntelligentTuning.getDataListByPage
 * @funcdesc 根据传入的数据以及当前页数，获取到当前页的列表数据
 * @param {Array} allData 要进行分页的数据集  {int} page 页码
 *
 * @return {Array}
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.getDataListByPage = function IntelligentTuning_getDataListByPage(allData , page){
    var dataList = [];
    if(allData != null && allData.length > 0){
        for(var i = 0 ; i < IntelligentTuning.pageSize; i++){
            if((page-1) * IntelligentTuning.pageSize + i >= allData.length){
                IntelligentTuning.lastIndex = allData.length;
                break;
            }else{
                dataList[i] = allData[(page-1) * IntelligentTuning.pageSize + i];
                if(i == 0){
                    IntelligentTuning.startIndex = (page-1) * IntelligentTuning.pageSize + i + 1;
                }
                if(i == IntelligentTuning.pageSize - 1){
                    IntelligentTuning.lastIndex = (page-1) * IntelligentTuning.pageSize + i + 1;
                }
            }
        }
    }else {
        IntelligentTuning.startIndex = 0 ;
        IntelligentTuning.lastIndex = 0 ;
    }
    //IntelligentTuning.drawMk(dataList);
    return dataList;
}

/**
 * ********************************
 * @funcname IntelligentTuning.initCompleteVue
 * @funcdesc 初始化详情页Vue对象的方法
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.initCompleteVue = function(){
    IntelligentTuning.sectorCompleteVM = new Vue({
        el : '#sectorCompleteMessage' ,
        data : {
            sectorData : {},
            isShowMore : true ,
            sectorOtherData :  "" , //扇区的其他信息
            rateName : "",
            mapType : "",
            currentGridRateName:"sector", //当前栅格图层的类型
            sector_grid_area: null , //专题扇区的栅格面积
            sector_grid_count:null, //专题扇区的栅格数
            sector_zhuanti_agps_mr: null , //专题扇区的agpsMR记录数
            sector_zhuanti_all_mr:null, //专题扇区的全量MR记录数
            anotherRateName : "",
            nrCellList : [], //邻区列表数据
            kpiList : [] , // kpi列表的数据
            alarmList : [] , // 告警列表的数据
            changeableData: {}, //可以变化的指标对象
            poorAreaListData : [], //弱覆盖集合
            nearPoorAreaListData : [] ,//附近弱覆盖集合
            TAArr : [], //AGPS-MR每TA平均距离的集合
            stationDistanceList: [], //站间列表集合
            isShowCompleteMessage : true,
            //方案记录数组
            planRecords:[],
            //方案详情
            planInfo:{problem_name:'',sys_status:'',task_create_time:'',sugg_ant_electron_angle:'_',sugg_pci:'_',sugg_pilot_power:'_',sugg_handover:'_'},
            //方案当前设置
            currentSetObj:{ant_electron_angle:'',pilot_power:'',PCI:'',handover:'',isShowInfo:true},
            //参考方案
            referencePlanArr:[],
            isShowReferencePlanTable: true,
            //质差小区分析
            ZCAnalysis:[],
            ZCAnalysisColumn:[],
        },
        methods : {
            sectorPosition:function(item){
                if(IntelligentTuning.circle){
                    //注销
                    var itemSectorData = {
                        obj_type:IntelligentTuning.circle.obj_type,
                        pointsString:null,
                        type:2,
                        decide:1,
                        statn_id:IntelligentTuning.circle.statn_id,
                        cell_id:IntelligentTuning.circle.cell_id,
                        day:IntelligentTuning.circle.day
                    };
                    IntelligentTuning.logOutPolygonToLayer(itemSectorData);
                }
                IntelligentTuningMap.map.removeOverlay(IntelligentTuning.circle);
                IntelligentTuning.showSector(item,IntelligentTuning.sectorObj.name);
                if(item.longitude_mid_baidu!=undefined&&item.longitude_mid_baidu!=0&&item.latitude_mid_baidu!=undefined&&item.latitude_mid_baidu!=0){
                    IntelligentTuningMap.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),20);
                }
            },
            showSectorGrid:function(item){
                if($('#showGridSub img').hasClass("showGrid")){
                    $('#showGridSub img').removeClass("showGrid");
                    $('#showGridSub img').attr("src","../js/IntelligentTuning/images/showOrHideGrid.png");
                    $('#showGridSub img').attr("title","显示栅格");
                    //删除栅格
                    IntelligentTuning.GridMapCircleDataArr = null;
                    IntelligentTuning.GridMapCircleDataArr = [];
                    IntelligentTuning.GridCanArrT = null;
                    IntelligentTuning.GridCanArrM = null;
                    IntelligentTuning.GridCanArrU = null;
                    IntelligentTuning.CanArr = null;
                    IntelligentTuning.GridCanArrT = [];
                    IntelligentTuning.GridCanArrM = [];
                    IntelligentTuning.GridCanArrU = [];
                    IntelligentTuning.CanArr = [];
                    IntelligentTuning.GridMap.clear();
                }else{
                    $('#showGridSub img').addClass("showGrid");
                    $('#showGridSub img').attr("src","../js/IntelligentTuningV3/images/white_grid.png");
                    $('#showGridSub img').attr("title","隐藏栅格");
                    //
                    var object_id = item.enodeb_id*256+item.cell_id;
                    IntelligentTuning.loadPoorAreaGrid(IntelligentTuning.day,item.city_id,item.country_id,object_id,1,item.enodeb_id,item.cell_id);
                    //显示
                }
            },
            gotoAlarmList : function (item){
                if(item.sector_set != null){
                    var sectorArr = item.sector_set.split("@");
                    IntelligentTuning.loadAlarmListData(sectorArr);
                    $("#alarmBackPoor").html("返回上一级");
                }
            },
            showDetailInfo :function (event){
                IntelligentTuning.showDetailInfo(event);
            },showLinkCell :function (event,item,type){
                IntelligentTuning.showLinkPoorArea(event,item,type);
            },
            gotoShowSectorMessage : function (sectorDate , item){
                // console.log(sectorDate);
                if(sectorDate.enodebid != null &&  sectorDate.enodebid != "" && sectorDate.cellid != null && sectorDate.cellid != ""){
                    IntelligentTuning.clickType=1;
                    if(IntelligentTuning.sectorObj.name != "sector"){
                        IntelligentTuning.lastSectorObj = IntelligentTuning.sectorObj;
                        IntelligentTuning.lastSectorObj.currentSector = item;
                        IntelligentTuning.sectorObj = IntelligentTuning.normalSector;
                    }
                    IntelligentTuning.getSectorMessageById(sectorDate.enodebid , sectorDate.cellid , IntelligentTuning.day);
                }
            },
            showMoreMessage : function(){
                IntelligentTuning.sectorCompleteVM.isShowMore = true;
            },
            forwardNrCellDetil : function(event,nrCellData,maptype){
                // console.log(nrCellData);
                /*IntelligentTuning.goSectorCompleteMessage(nrCellData.enodebid , nrCellData.cellid);//跳转到详情页
                IntelligentTuning.getSectorMessageById(nrCellData.enodebid,nrCellData.cellid,IntelligentTuning.day);*/
                //偏移地图到指定位置
                IntelligentTuningMap.map.centerAndZoom(new BMap.Point(nrCellData.positionLng, nrCellData.positionLat),15);
                var mapWidth=$("#baiduMap").width();//地图宽度
                var sectorWidth=$("#showSectorList").width();//详情页的宽度；
                var width=(mapWidth-sectorWidth)/2+(sectorWidth-mapWidth/2);
                IntelligentTuningMap.map.panBy(width,0);

                //查看当前点击的邻小区的栅格
                IntelligentTuningMap.cacheItem.fjSector=nrCellData;
                IntelligentTuningMap.currentGridType="fjSector";
                IntelligentTuningMap.showSector(nrCellData,IntelligentTuningMap);//高亮小区
                IntelligentTuningMap.loadSectorGrid(IntelligentTuning.day, nrCellData.enodebid, nrCellData.cellid, nrCellData.problem_name,maptype);
            },
            showMacSectorAndLine :function (event,item, mapType){
                var object=getCurrentMap(mapType);
                if(object.cacheItem.enodeb_id!=item.enodeb_id||object.cacheItem.cell_id!=item.cell_id){
                    alert("当前对象详情页与地图点击的小区对象不一致，请点击地图提示框中的查看详情");
                    return;
                }
                //台账勘误
                if($(event.currentTarget).hasClass("linkCellHover")){
                    $(event.currentTarget).attr("title","台账勘误");
                    $("#"+event.currentTarget.id).css("background-color","rgba(255,153,0,0.5)");
                    $(event.currentTarget).removeClass("linkCellHover");
                    //隐藏台账勘误
                    IntelligentTuningMap.clearSectorPredOverlays(object);
                }else{
                    $(event.currentTarget).attr("title","隐藏勘误");
                    $("#"+event.currentTarget.id).css("background-color","#ff9900");
                    $(event.currentTarget).addClass("linkCellHover");
                    //显示台账勘误
                    if(item.band_mapping!=1&&item.is_indoor == "室外"){ //位置和方位角预测均不含800M和室分，同时方位角预测也不含位置预测大于200米的扇区
                            IntelligentTuningMap.drawMacSectorAndLine(item,object);
                    }
                }


            },
            showProblemArea :function (event,item,mapType){
                var object=getCurrentMap(mapType);
                if(object.cacheItem.enodeb_id!=item.enodeb_id||object.cacheItem.cell_id!=item.cell_id){
                    alert("当前对象详情页与地图点击的小区对象不一致，请点击地图提示框中的查看详情");
                    return;
                }
                //显示/隐藏派单问题多边形
                if($(event.currentTarget).hasClass("linkCellHover")){
                    $(event.currentTarget).attr("title","显示多边形");
                    $("#"+event.currentTarget.id).css("background-color","rgba(255,153,0,0.5)");
                    $(event.currentTarget).removeClass("linkCellHover");
                    IntelligentTuningMap.removeProblemPolygonList(object);//隐藏问题多边形
                    IntelligentTuningMap.removePolygonList(object);//隐藏弱区多边形
                    if (object.polygon != null) {//重新画一次高亮的多边形（防止多边形覆盖在其之上，不能直接移除的原因是因为栅格没有移除，这个提示框必须要显示）
                        object.map.removeOverlay(object.polygon);
                        // object.map.addOverlay(object.polygon);
                    }
                    object.polygon=null;
                }else{
                    $(event.currentTarget).attr("title","隐藏多边形");
                    $("#"+event.currentTarget.id).css("background-color","#ff9900");
                    $(event.currentTarget).addClass("linkCellHover");
                    IntelligentTuningMap.showLinkPoorArea(item,mapType);//显示弱区多边形
                    setTimeout(function(){
                        IntelligentTuningMap.showProblemArea(item,mapType);//显示问题多边形
                    },300);
                }


            },
            showNRLinkCell :function (event,item,nrCellList , mapType){
                var object=getCurrentMap(mapType);
                if(object.cacheItem.enodeb_id!=item.enodeb_id||object.cacheItem.cell_id!=item.cell_id){
                    alert("当前对象详情页与地图点击的小区对象不一致，请点击地图提示框中的查看详情");
                    return;
                }
                //邻区连线
                if($(event.currentTarget).hasClass("linkCellHover")){
                    $(event.currentTarget).attr("title","地图连线");
                    $("#"+event.currentTarget.id).css("background-color","rgba(255,153,0,0.5)");
                    $(event.currentTarget).removeClass("linkCellHover");
                    //隐藏邻区连线
                    // var object=getCurrentMap(mapType);
                    IntelligentTuning.hideGridOrPolygonNrTopSector(object);
                }else{
                    $(event.currentTarget).attr("title","隐藏连线");
                    $("#"+event.currentTarget.id).css("background-color","#ff9900");
                    $(event.currentTarget).addClass("linkCellHover");
                    var centerPoint = new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu);
                    var enodebid_cellidArr = [];
                    for(var i = 0; i < nrCellList.length; i++){
                        if(nrCellList[i].enodebid != null && nrCellList[i].enodebid != "" &&
                            nrCellList[i].cellid != null && nrCellList[i].cellid != "" ){ //做一下容错，不将基站ID和小区ID 为空的扇区拼进去
                            enodebid_cellidArr.push(nrCellList[i]); //将基站ID和扇区ID用逗号拼在一起
                        }
                    }
                    // var sector_set = enodebid_cellidArr.join("@"); //拼成一个以@符号切割扇区的字符串
                    //显示邻区连线
                    IntelligentTuning.showNrTopCellForMap(centerPoint,enodebid_cellidArr,mapType);
                }


            },
            showDistanceCricle :function (event,item,mapType){
                var object=getCurrentMap(mapType);
                if(object.cacheItem.enodeb_id!=item.enodeb_id||object.cacheItem.cell_id!=item.cell_id){
                    alert("当前对象详情页与地图点击的小区对象不一致，请点击地图提示框中的查看详情");
                    return;
                }
                //站间距圆
                // var object=getCurrentMap(mapType);
                if($(event.currentTarget).hasClass("linkCellHover")){
                    $(event.currentTarget).attr("title","显示圆圈");
                    $("#"+event.currentTarget.id).css("background-color","rgba(255,153,0,0.5)");
                    $(event.currentTarget).removeClass("linkCellHover");
                    //清除站间距圆圈
                    if(object.sectorCircleCanvas!=null){
                        object.map.removeOverlay(object.sectorCircleCanvas);
                        object.sectorCircleCanvas=null;
                    }
                }else{
                    if(IntelligentTuningMap.map.getZoom() > 17){
                        IntelligentTuningMap.map.setZoom(17);
                    }
                    $(event.currentTarget).attr("title","隐藏圆圈");
                    $("#"+event.currentTarget.id).css("background-color","#ff9900");
                    $(event.currentTarget).addClass("linkCellHover");
                    if(isnull(item.station_spacing)){
                        IntelligentTuningMap.showSectorStationCircle(400, 2, item,object);//站间距圆圈
                    }else{
                        IntelligentTuningMap.showSectorStationCircle(item.station_spacing, 4, item,object);//站间距圆圈
                    }
                }
            },
            showErrorMessage:function(pin_pci){
                if(pin_pci != null){
                    var list = pin_pci.split("_");
                }
                alert("在3公里范围内找不到PCI为" + list[1] + "、频点为" + list[0] + "对应的小区")
            },
            tabPanSubmit:function(event,zcColumn,zcAnalysis){
                $("#geographic_analysis").show();
                $(".showContent .dateSplit .btn-showInfo").children().addClass("rotateImg");
                $(".clicked").removeClass("clicked");
                $(event.currentTarget).addClass("clicked");
                $(".showContent").show();
                $(".showContent .nameInfo").text(zcColumn.type);
                badCellAnalysis.cityId=zcAnalysis.latn_id;
                badCellAnalysis.cityName = noceUtil.LATN_ID_city[zcAnalysis.latn_id];//获取当前城市的名称
                badCellAnalysis.eNodeBId=zcAnalysis.enodeb_id;
                badCellAnalysis.cellId=zcAnalysis.cell_id;//小区id
                badCellAnalysis.timeId = zcAnalysis.day;//供忙度图标题使用
                badCellAnalysis.distriOptionIndex = zcColumn.index;
                $(".myTabContent").show();
                $(".myTabPan").eq(zcColumn.index).show().siblings().hide();
                $("#badCellAnalysisDiv").scrollTop(350);
                $(".wrap_Dialog").hide();
                var object=getCurrentMap(this.mapType);
                if(object.cacheItem.day!=zcAnalysis.day||object.cacheItem.enodeb_id!=zcAnalysis.enodeb_id||object.cacheItem.cell_id!=zcAnalysis.cell_id){
                    $("#seachTime").text(zcAnalysis.day);//修改地图的时间
                    IntelligentTuning.day = zcAnalysis.day;
                    IntelligentTuning.updateMapSector(zcAnalysis.day , IntelligentTuning.currentQueryCity,"topMap"); //重查地图的扇区数据
                    IntelligentTuning.getScreenMessageById(zcAnalysis.enodeb_id,zcAnalysis.cell_id,zcAnalysis.day,this.mapType);
                }
                //查数，回调函数画表格（给每个td赋值）
                var ZCTabconditions=zcAnalysis.day+"|"+zcAnalysis.latn_id+"|"+zcAnalysis.enodeb_id+"|"+zcAnalysis.cell_id;
                if(badCellAnalysis.ZCTabconditionsCache!=ZCTabconditions){
                    badCellAnalysis.badCellAnaSubmit();
                }else{
                    if(badCellAnalysis.coverBar1!=null){
                        badCellAnalysis.coverBar1.resize();
                    }
                    if(badCellAnalysis.coverBar2!=null){
                        badCellAnalysis.coverBar2.resize();
                    }
                    if(badCellAnalysis.busyline!=null){
                        badCellAnalysis.busyline.resize();
                    }
                    if(badCellAnalysis.downLineBar!=null){
                        badCellAnalysis.downLineBar.resize();
                    }
                }
            },
            tabTitleSubmit:function(event,zcColumn){
                var parentIndex = zcColumn.index;
                if($(".zcColumn-circle ul").eq(parentIndex).find(".circleRed:last").length>0){
                    $(".zcColumn-circle ul").eq(parentIndex).find(".circleRed:last").click();
                }else{
                    $(".zcColumn-circle ul").eq(parentIndex).find("li").last().click();
                }


            },
            //点击方案列表
            getPlan(item,index){
                if(index==1){ //方案生成时间
                    IntelligentTuningChart.fillChart(item,item.task_create_time_date);// //调用图表
                }else if(index==2){//确认时间
                    IntelligentTuningChart.fillChart(item,item.comf_time);
                }else if(index==3){//执行结束时间
                    IntelligentTuningChart.fillChart(item,item.oprt_etime);
                }else{//评估结束时间
                    IntelligentTuningChart.fillChart(item,item.eval_etime);
                }
                this.planInfo=item;
                //调用图表
            },
            //点击工单状态跳转
            enterTaskInfo(item){
                if(item.comf_task_id==undefined||item.comf_task_id==null||item.comf_task_id==''){
                    alert('工单号为空!')
                }
                if(item.comf_task_id!=undefined&&item.comf_task_id!=null&&item.comf_task_id!=''){
                    window.open('http://132.96.154.2/EOMS_FT/app/dwf/ftPub/osCheckFtDetail/osCheckFtDetail!getDetailPage.action?sCode='+item.comf_task_id);
                }
            },
            showPlanInfo(obj){
                obj.isShowContent=!obj.isShowContent;
            },
            editPlanInfo(item){
                this.planInfo=item;
                // console.log("修改方案详情")
            },

        }
    });
}


