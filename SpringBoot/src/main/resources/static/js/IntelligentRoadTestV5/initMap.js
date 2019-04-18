"use strict";

var IntelligentRoadTest = {};
IntelligentRoadTest.isChangeDate = false;// 记录是否切换日期，当用户切换日期时这个变量会变成true 这个变量主要用户判断是否需要重新定位
IntelligentRoadTest.loadBoundsLineTimeInterval = 1000;//毫秒
IntelligentRoadTest.lastLoadBoundsLineTimeout = null;//地图缩放结束判断时候需要重查数据定时器
IntelligentRoadTest.lastLoadBoundsLineByCenterTimeout = null;//地图拖拽结束判断时候需要重查数据定时器
IntelligentRoadTest.cityFirstCountryObj = { //各个地市的默认显示的区县，这里用于判断地市用户移动到其他地市时，点击列表取数时所要显示的区县名称
    "深圳" : "罗湖",
    "广州" : "天河",
    "东莞" : "城区",
    "佛山" : "南海",
    "中山" : "城区",
    "惠州" : "惠城",
    "汕头" : "金平",
    "江门" : "江海",
    "珠海" : "香洲",
    "揭阳" : "城区",
    "湛江" : "赤坎",
    "茂名" : "茂南",
    "肇庆" : "德庆",
    "清远" : "城区",
    "潮州" : "潮安",
    "梅州" : "梅江",
    "河源" : "城区",
    "韶关" : "新丰",
    "阳江" : "高新",
    "汕尾" : "城区",
    "云浮" : "云城"
};
IntelligentRoadTest.startIndex = 0; //数据开始的位置
IntelligentRoadTest.lastIndex = 0; //数据结束的位置
IntelligentRoadTest.pageSize = 20; //列表的每页数据条数
IntelligentRoadTest.esbhPolygon = [];
IntelligentRoadTest.metorZoomAndCenter = {oneLevel: null, second: null, threeLevel: null};//地铁各级列表中心点和级别缓存
IntelligentRoadTest.mkIndex = null;
IntelligentRoadTest.osmMkData = null;
IntelligentRoadTest.osmType = null;
IntelligentRoadTest.dtPolygon = [];
IntelligentRoadTest.sectorPoorline = {nearby: [], cover: []};
IntelligentRoadTest.polygonData = null;
IntelligentRoadTest.polygonList = [];//附近弱区多边形
IntelligentRoadTest.threeLabel = null;
IntelligentRoadTest.isZoom = true;
//0弱区（弱覆盖区） 1关注 2工单 3扇区 4dt 5骨头 6宏扇区 7高速 8高铁 9高密度 10高校  11高流量商务 12美景 13框选骨头区域 14市政路 15地铁 16战狼 17农贸 18美食 19场馆
// 20中小学 21城中村 22自然村 23工厂 24上行低速率区 25下行低速率区 26MOD3干扰区 27重叠覆盖区 28越区覆盖区 29用户抱怨
IntelligentRoadTest.index = null;
IntelligentRoadTest.seachTime = false;//是否是切换日期
IntelligentRoadTest.isGridMessage = false;//是否在栅格详情页
IntelligentRoadTest.isSelect = false;//是否框选中
IntelligentRoadTest.mapObjClick = false;
IntelligentRoadTest.maxlng_maxlat_minlng_minlat = "";//缓存的栅格查询条件
IntelligentRoadTest.gridTableName = "";//缓存的栅格查询的表格
IntelligentRoadTest.maxlng_maxlat_minlng_minlatThree = "";
IntelligentRoadTest.isBackList = false;
IntelligentRoadTest.continueLineData = [];
IntelligentRoadTest.isShowGridMessage = false;//是否是点击地图栅格进入详情页面
IntelligentRoadTest.mapClick = false;//是否是地图点击
IntelligentRoadTest.second = false;//false高速高铁第一层 true其他层
IntelligentRoadTest.searchTitleClick = false;
IntelligentRoadTest.metroHighlightData = [];//地铁铁高亮数据
IntelligentRoadTest.metroHighlightDataOverlay = [];//地铁铁高亮覆盖物
var lineFlag = false;
IntelligentRoadTest.currentLocation = ""; //用户当前所在的详细页的记录（只在详细页中变更,返回列表或者直接隐藏都设置为空)
IntelligentRoadTest.senseName = null; //用于记录当前所在的场景
IntelligentRoadTest.wantDeleteConcern = null;//想要删除的关注区域的信息
IntelligentRoadTest.wantDealBone = null; //想要处理的骨肉区域的信息
IntelligentRoadTest.road_id = null; //用于记录道路进入二级列表时的父级road_id
IntelligentRoadTest.line_id = null; //用于记录地铁进入二级列表时的父级line_id
IntelligentRoadTest.roadIndex = null;//用于记录进入了道路的哪一级列表，1表示一级列表 2表示二级列 3表示详情页 4表示20米详情页
IntelligentRoadTest.metroIndex = null;//与roadName差不多，这个是记录地铁的
IntelligentRoadTest.osmCenterPoint = null;//osm第一层点击线段后记录下来的点击点
IntelligentRoadTest.splitLineData = {};
// DT列表的属性
IntelligentRoadTest.result = []; // DT列表查询返回的数据缓存
IntelligentRoadTest.currentResult = [];//DT列表当前数据的缓存
IntelligentRoadTest.dtVM = null; //DT列表的Vue对象
IntelligentRoadTest.dtCurrentPage = 1; //DT列表的当前页数
IntelligentRoadTest.dtTotalPage = 0; //DT列表总页数
IntelligentRoadTest.dtTotalCount = 0;//DT列表总记录数
IntelligentRoadTest.dtCrossFliterObj = crossfilter([]);//Dtcrossflilter对象
IntelligentRoadTest.filterDtResult = [];//帅选后的骨头数据数组
IntelligentRoadTest.tempDtFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterDt = false;//是否排序过
IntelligentRoadTest.dtCurrentSelectConditon = "";//DT列表的前一个查询条件缓存
IntelligentRoadTest.isSeachDT = false;


//弱覆盖区域列表的属性
IntelligentRoadTest.rfgResult = []; //弱覆盖区域列表查询数据的缓存
IntelligentRoadTest.rfgCurrentResult = [];//弱覆盖区域列表当前的数据的缓存
IntelligentRoadTest.rfgVM = null; //弱覆盖区域列表的Vue对象
IntelligentRoadTest.rfgCompleteVM = null;//弱覆盖区域详细信息的Vue对象
IntelligentRoadTest.rfgCurrentPage = 1; //弱覆盖区域列表的当前页数
IntelligentRoadTest.rfgTotalPage = 0; //弱覆盖区域列表总页数
IntelligentRoadTest.rfgTotalCount = 0;//弱覆盖区域列表总记录数
IntelligentRoadTest.rfgpayments = crossfilter([]);//弱覆盖crossflilter对象
IntelligentRoadTest.filterRfgResult = [];//帅选后的骨头数据数组
IntelligentRoadTest.tempRfgFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterRfg = false;//是否排序过
IntelligentRoadTest.rfgCurrentSelectConditon = "";//弱覆盖列表的前一个查询条件缓存


//关注区域列表的属性
IntelligentRoadTest.concernAreaResult = [];//关注区域列表查询数据的缓存
IntelligentRoadTest.concernAreaCurrentResult = [];//关注区域列表当前数据的缓存
IntelligentRoadTest.concernAreaVM = null; //关注区域列表的Vue对象
IntelligentRoadTest.concernAreaCurrentPage = 1; //关注区域列表的当前页数
IntelligentRoadTest.concernAreaTotalPage = 0; //关注区域列表总页数
IntelligentRoadTest.concernAreaTotalCount = 0;//关注区域列表总记录数
IntelligentRoadTest.concernAreaCrossFliterObj = crossfilter([]);//骨头区域crossflilter对象
IntelligentRoadTest.filterConcernAreaResult = [];//帅选后的骨头数据数组
IntelligentRoadTest.tempConcernAreaFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterConcernArea = false;//是否排序过
IntelligentRoadTest.concernAreaCurrentSelectConditon = "";//关注区域列表的前一个查询条件缓存

//骨头区域列表的属性
IntelligentRoadTest.boneAreaResult = [] // 骨头区域列表的缓存数据
IntelligentRoadTest.boneAreaCurrentResult = [];//骨头区域列表当前的数据
IntelligentRoadTest.boneAreaVM = null; //骨头区域列表的Vue对象
IntelligentRoadTest.boneAreaCurrentPage = 1; //骨头区域列表的当前页数
IntelligentRoadTest.boneAreaTotalPage = 0; //骨头区域列表总页数
IntelligentRoadTest.boneAreaTotalCount = 0;//骨头区域列表总记录数
IntelligentRoadTest.boneCrossFliterObj = crossfilter([]);//骨头区域crossflilter对象
IntelligentRoadTest.filterBoneAreaResult = [];//帅选后的骨头数据数组
IntelligentRoadTest.tempFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterBoneArea = false;//是否排序过
IntelligentRoadTest.boneAreaCurrentSelectConditon = "";//骨头区域列表的前一个查询条件缓存

//工单列表的属性
IntelligentRoadTest.alarmInfoResult = [];//工单列表查询数据的缓存
IntelligentRoadTest.alarmInfoCurrentResult = [];//工单列表当前数据的缓存
IntelligentRoadTest.alarmInfoVM = null; //工单列表的Vue对象
IntelligentRoadTest.alarmInfoCurrentPage = 1; //工单列表的当前页数
IntelligentRoadTest.alarmInfoTotalPage = 0; //工单列表总页数
IntelligentRoadTest.alarmInfoTotalCount = 0;//工单列表总记录数
IntelligentRoadTest.alarmInfoCrossFliterObj = crossfilter([]);//骨头区域crossflilter对象
IntelligentRoadTest.filterAlarmInfoResult = [];//帅选后的骨头数据数组
IntelligentRoadTest.tempAlarmInfoFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterAlarmInfo = false;//是否排序过
IntelligentRoadTest.alarmInfoCurrentSelectConditon = "";//工单列表的前一个查询条件缓存


//扇区列表的属性
IntelligentRoadTest.sectorResult = [];//扇区列表查询数据的缓存
IntelligentRoadTest.sectorCurrentResult = [];//扇区列表当前数据的缓存
IntelligentRoadTest.sectorVM = null; //扇区列表的Vue对象
IntelligentRoadTest.sectorCurrentPage = 1; //扇区列表的当前页数
IntelligentRoadTest.sectorTotalPage = 0; //扇区列表总页数
IntelligentRoadTest.sectorTotalCount = 0;//扇区列表总记录数
IntelligentRoadTest.sectorCrossFliterObj = crossfilter([]);//骨头区域crossflilter对象
IntelligentRoadTest.filterSectorResult = [];//帅选后的骨头数据数组
IntelligentRoadTest.tempSectorFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterSector = false;//是否排序过
IntelligentRoadTest.sectorCurrentSelectConditon = "";//扇区列表的前一个查询条件缓存


//告警列表的属性
IntelligentRoadTest.alarmResult = [];//告警列表查询数据的缓存
IntelligentRoadTest.alarmVM = null; //告警列表的Vue对象
IntelligentRoadTest.alarmCurrentPage = 1; //告警列表的当前页数
IntelligentRoadTest.alarmTotalPage = 0; //告警列表总页数
IntelligentRoadTest.alarmTotalCount = 0;//告警列表总记录数

//KPI列表的属性
IntelligentRoadTest.kpiResult = [];//KPI列表查询数据的缓存
IntelligentRoadTest.kpiListData = [];//列表的数据
IntelligentRoadTest.kpiCompleteData = [];//详情页的数据
IntelligentRoadTest.kpiVM = null; //KPI列表的Vue对象
IntelligentRoadTest.kpiCurrentPage = 1; //KPI列表的当前页数
IntelligentRoadTest.kpiTotalPage = 0; //KPI列表总页数
IntelligentRoadTest.kpiTotalCount = 0;//KPI列表总记录数

//宏站列表的属性
IntelligentRoadTest.macSectorResult = [];//宏站列表查询数据的缓存
IntelligentRoadTest.macSectorCurrentResult = [];//宏站列表当前数据的缓存
IntelligentRoadTest.macSectorVM = null; //宏站列表的Vue对象
IntelligentRoadTest.macSectorCurrentPage = 1; //宏站列表的当前页数
IntelligentRoadTest.macSectorTotalPage = 0; //宏站列表总页数
IntelligentRoadTest.macSectorTotalCount = 0;//宏站列表总记录数
IntelligentRoadTest.macSectorCrossFliterObj = crossfilter([]);//骨头区域crossflilter对象
IntelligentRoadTest.filterMacSectorResult = [];//帅选后的骨头数据数组
IntelligentRoadTest.tempMacSectorFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterMacSector = false;//是否排序过
IntelligentRoadTest.macSectorCurrentSelectConditon = "";//宏站列表的前一个查询条件缓存
IntelligentRoadTest.isSeachMacSector = false;

//五高一地的属性
//高校列表的属性
IntelligentRoadTest.collegeResult = [];//高校列表查询数据的缓存
IntelligentRoadTest.collegeCurrentResult = [];//高校列表当前数据的缓存
IntelligentRoadTest.collegeVM = null; //高校列表的Vue对象
IntelligentRoadTest.collegeCurrentPage = 1; //高校列表的当前页数
IntelligentRoadTest.collegeTotalPage = 0; //高校列表总页数
IntelligentRoadTest.collegeTotalCount = 0;//高校列表总记录数
IntelligentRoadTest.collegeCrossFliterObj = crossfilter([]);//骨头区域crossflilter对象
IntelligentRoadTest.filterCollegeResult = [];//帅选后的骨头数据数组
IntelligentRoadTest.tempCollegeFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterCollege = false;//是否排序过
IntelligentRoadTest.collegeCurrentSelectConditon = "";//高校列表的前一个查询条件缓存
IntelligentRoadTest.ifShowCollege = true; //是否启用


//高密度住宅区列表的属性
IntelligentRoadTest.uptownResult = [];//高密度住宅区列表查询数据的缓存
IntelligentRoadTest.uptownCurrentResult = [];//高密度住宅区列表当前数据的缓存
IntelligentRoadTest.uptownVM = null; //高密度住宅区列表的Vue对象
IntelligentRoadTest.uptownCurrentPage = 1; //高密度住宅区列表的当前页数
IntelligentRoadTest.uptownTotalPage = 0; //高密度住宅区列表总页数
IntelligentRoadTest.uptownTotalCount = 0;//高密度住宅区列表总记录数
IntelligentRoadTest.uptownCrossFliterObj = crossfilter([]);//骨头区域crossflilter对象
IntelligentRoadTest.filterUptownResult = [];//帅选后的骨头数据数组
IntelligentRoadTest.tempUptownFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterUptown = false;//是否排序过
IntelligentRoadTest.uptownCurrentSelectConditon = "";//高密度住宅区列表的前一个查询条件缓存
IntelligentRoadTest.ifShowUptown = true; //是否启用

//高流量商务区列表的属性
IntelligentRoadTest.businessResult = [];//高流量商务区列表查询数据的缓存
IntelligentRoadTest.businessCurrentResult = [];//高流量商务区列表当前数据的缓存
IntelligentRoadTest.businessVM = null; //高流量商务区列表的Vue对象
IntelligentRoadTest.businessCurrentPage = 1; //高流量商务区列表的当前页数
IntelligentRoadTest.businessTotalPage = 0; //高流量商务区列表总页数
IntelligentRoadTest.businessTotalCount = 0;//高流量商务区列表总记录数
IntelligentRoadTest.businessCrossFliterObj = crossfilter([]);//骨头区域crossflilter对象
IntelligentRoadTest.filterBusinessResult = [];//帅选后的骨头数据数组
IntelligentRoadTest.tempBusinessFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterBusiness = false;//是否排序过
IntelligentRoadTest.businessCurrentSelectConditon = "";//高流量商务区列表的前一个查询条件缓存
IntelligentRoadTest.ifShowBusiness = true; //是否启用


//美景列表的属性
IntelligentRoadTest.sceneryResult = [];//美景列表查询数据的缓存
IntelligentRoadTest.sceneryCurrentResult = [];//美景列表当前数据的缓存
IntelligentRoadTest.sceneryVM = null; //美景列表的Vue对象
IntelligentRoadTest.sceneryCurrentPage = 1; //美景列表的当前页数
IntelligentRoadTest.sceneryTotalPage = 0; //美景列表总页数
IntelligentRoadTest.sceneryTotalCount = 0;//美景列表总记录数
IntelligentRoadTest.sceneryCrossFliterObj = crossfilter([]);//骨头区域crossflilter对象
IntelligentRoadTest.filterSceneryResult = [];//帅选后的骨头数据数组
IntelligentRoadTest.tempSceneryFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterScenery = false;//是否排序过
IntelligentRoadTest.sceneryCurrentSelectConditon = "";//美景列表的前一个查询条件缓存
IntelligentRoadTest.ifShowScenery = true; //是否启用

//高速列表的属性
IntelligentRoadTest.highwayFirstListResult = [];//500米高速第一层列表查询数据的缓存
IntelligentRoadTest.highwayFirstListCurrentResult = [];//500米高速第一层列表当前数据的缓存
IntelligentRoadTest.highwayVM = null; //高速第一层列表的Vue对象
IntelligentRoadTest.highwayCurrentPage = 1; //高速列表的当前页数
IntelligentRoadTest.highwayTotalPage = 0; //高速第一层列表总页数
IntelligentRoadTest.highwayTotalCount = 0;//高速第一层列表总记录数
IntelligentRoadTest.highwaySecondListResult = [];//高速第二层列表查询数据的缓存
IntelligentRoadTest.highwaySecondListCurrentResult = [];//高速第二层列表当前数据的缓存
IntelligentRoadTest.highwaySecondVM = null; //高速第二层列表的Vue对象
IntelligentRoadTest.highwaySecondListCurrentPage = 1; //高速第二层列表的当前页数
IntelligentRoadTest.highwaySecondListTotalPage = 0; //高速第二层列表总页数
IntelligentRoadTest.highwaySecondListTotalCount = 0;//高速第二层列表总记录数
IntelligentRoadTest.highwayCrossFliterObj = crossfilter([]);//高速区域crossflilter对象
IntelligentRoadTest.filterHighwayResult = [];//帅选后的高速数据数组
IntelligentRoadTest.tempHighwayFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterHighway = false;//是否排序过
IntelligentRoadTest.highwayCurrentSelectConditon = "";//高速列表的前一个查询条件缓存
IntelligentRoadTest.ifShowHighway = true; //是否启用
IntelligentRoadTest.highwayIsPoor = false;//是否只查询二层列表的弱路段
IntelligentRoadTest.continueLineHighWayDataChe = [];//连片线段数据缓存，用于每次地图底图线段数据查询后都要重绘

//高铁列表的属性
IntelligentRoadTest.railFirstListResult = [];//500米高铁第一层列表查询数据的缓存
IntelligentRoadTest.railFirstListCurrentResult = [];//500米高铁第一层列表当前数据的缓存
IntelligentRoadTest.railVM = null; //高铁第一层列表的Vue对象
IntelligentRoadTest.railCurrentPage = 1; //高铁列表的当前页数
IntelligentRoadTest.railTotalPage = 0; //高铁第一层列表总页数
IntelligentRoadTest.railTotalCount = 0;//高铁第一层列表总记录数
IntelligentRoadTest.railSecondListResult = [];//高铁第二层列表查询数据的缓存
IntelligentRoadTest.railSecondListCurrentResult = [];//高铁第二层列表当前数据的缓存
IntelligentRoadTest.railSecondVM = null; //高铁第二层列表的Vue对象
IntelligentRoadTest.railSecondListCurrentPage = 1; //高铁第二层列表的当前页数
IntelligentRoadTest.railSecondListTotalPage = 0; //高铁第二层列表总页数
IntelligentRoadTest.railSecondListTotalCount = 0;//高铁第二层列表总记录数
IntelligentRoadTest.railCrossFliterObj = crossfilter([]);//高铁区域crossflilter对象
IntelligentRoadTest.filterRailResult = [];//帅选后的高铁数据数组
IntelligentRoadTest.tempRailFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterRail = false;//是否排序过
IntelligentRoadTest.railCurrentSelectConditon = "";//高铁列表的前一个查询条件缓存
IntelligentRoadTest.ifShowRail = true; //是否启用
IntelligentRoadTest.railIsPoor = false;//是否只查询二层列表的弱路段
IntelligentRoadTest.continueLineRailWayDataChe = [];//高铁连片地图数据缓存

//市政路列表的属性
IntelligentRoadTest.cityRoadFirstListResult = [];//500米市政路第一层列表查询数据的缓存
IntelligentRoadTest.cityRoadFirstListCurrentResult = [];//500米市政路第一层列表当前数据的缓存
IntelligentRoadTest.cityRoadVM = null; //市政路第一层列表的Vue对象
IntelligentRoadTest.cityRoadCurrentPage = 1; //市政路列表的当前页数
IntelligentRoadTest.cityRoadTotalPage = 0; //市政路第一层列表总页数
IntelligentRoadTest.cityRoadTotalCount = 0;//市政路第一层列表总记录数
IntelligentRoadTest.cityRoadSecondListResult = [];//市政路第二层列表查询数据的缓存
IntelligentRoadTest.cityRoadSecondListCurrentResult = [];//市政路第二层列表当前数据的缓存
IntelligentRoadTest.cityRoadSecondVM = null; //市政路第二层列表的Vue对象
IntelligentRoadTest.cityRoadSecondListCurrentPage = 1; //市政路第二层列表的当前页数
IntelligentRoadTest.cityRoadSecondListTotalPage = 0; //市政路第二层列表总页数
IntelligentRoadTest.cityRoadSecondListTotalCount = 0;//市政路第二层列表总记录数
IntelligentRoadTest.cityRoadCrossFliterObj = crossfilter([]);//市政路区域crossflilter对象
IntelligentRoadTest.filterCityRoadResult = [];//帅选后的市政路数据数组
IntelligentRoadTest.tempCityRoadFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterCityRoad = false;//是否排序过
IntelligentRoadTest.cityRoadCurrentSelectConditon = "";//市政路列表的前一个查询条件缓存
IntelligentRoadTest.ifShowCityRoad = true; //是否启用
IntelligentRoadTest.cityRoadIsPoor = false;//是否只查询二层列表的弱路段
IntelligentRoadTest.continueLineCityRoadDataChe = [];//市政路连片地图数据缓存

IntelligentRoadTest.isSuiDao = false;
//地铁列表的属性
IntelligentRoadTest.metroFirstListResult = [];//地铁第一层列表查询数据的缓存
IntelligentRoadTest.metroFirstListCurrentResult = [];//地铁第一层列表当前数据的缓存
IntelligentRoadTest.metroVM = null; //地铁第一层列表的Vue对象
IntelligentRoadTest.metroCurrentPage = 1; //地铁列表的当前页数
IntelligentRoadTest.metroTotalPage = 0; //地铁第一层列表总页数
IntelligentRoadTest.metroTotalCount = 0;//地铁第一层列表总记录数
IntelligentRoadTest.metroSecondListResult = [];//地铁第二层列表查询数据的缓存
IntelligentRoadTest.metroSecondListCurrentResult = [];//地铁第一层列表当前数据的缓存
IntelligentRoadTest.metroSecondVM = null; //地铁第二层列表的Vue对象
IntelligentRoadTest.metroSecondListCurrentPage = 1; //地铁第二层列表的当前页数
IntelligentRoadTest.metroSecondListTotalPage = 0; //地铁第二层列表总页数
IntelligentRoadTest.metroSecondListTotalCount = 0;//地铁第二层列表总记录数
IntelligentRoadTest.metroCrossFliterObj = crossfilter([]);//地铁区域crossflilter对象
IntelligentRoadTest.filterMetroResult = [];//帅选后的地铁数据数组
IntelligentRoadTest.tempMetroFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterMetro = false;//是否排序过
IntelligentRoadTest.metroCurrentSelectConditon = "";//地铁列表的前一个查询条件缓存
IntelligentRoadTest.metroStationsDataList = [];//地铁的站点间信息的数据缓存，用于过滤出二级列表的数据
IntelligentRoadTest.metroPoorLineMarker = [];//地铁第一层显示的连片覆盖物
IntelligentRoadTest.metroPoorLineResult = {};//地铁连片数据缓存 结构:{road_id:{},road_id:{}}
IntelligentRoadTest.metroLineWeight = 6;//地铁线路线条宽度
IntelligentRoadTest.metroStationsOverlay = [];//地市概貌线路覆盖物
IntelligentRoadTest.metroStationsMarkerOverlay = [];//地市概貌地铁站点图标覆盖物
IntelligentRoadTest.metroStationsSctionOverlay = [];//站与站之间78米线段覆盖物
IntelligentRoadTest.ifShowMetro = true; //是否启用
IntelligentRoadTest.metroIndex = null; //在地铁的哪一层
IntelligentRoadTest.fatherLineId = null;//在二级列表时其一级列表时
IntelligentRoadTest.metroType = 2; //地铁的指标类型（综合指标为2， 正向指标为1 ， 反向指标为-1）


//美食列表的属性
IntelligentRoadTest.foodResult = [];//美食列表查询数据的缓存
IntelligentRoadTest.foodCurrentResult = [];//美食列表当前数据的缓存
IntelligentRoadTest.foodVM = null; //美食列表的Vue对象
IntelligentRoadTest.foodCurrentPage = 1; //美食列表的当前页数
IntelligentRoadTest.foodTotalPage = 0; //美食列表总页数
IntelligentRoadTest.foodTotalCount = 0;//美食列表总记录数
IntelligentRoadTest.foodCrossFliterObj = crossfilter([]);//骨头区域crossflilter对象
IntelligentRoadTest.filterFoodResult = [];//帅选后的骨头数据数组
IntelligentRoadTest.tempFoodFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterFood = false;//是否排序过
IntelligentRoadTest.foodCurrentSelectConditon = "";//美食列表的前一个查询条件缓存
IntelligentRoadTest.ifShowFood = true; //是否启用
//大型运动场馆列表的属性
IntelligentRoadTest.siteResult = [];//大型运动场馆列表查询数据的缓存
IntelligentRoadTest.siteCurrentResult = [];//大型运动场馆列表当前数据的缓存
IntelligentRoadTest.siteVM = null; //大型运动场馆列表的Vue对象
IntelligentRoadTest.siteCurrentPage = 1; //大型运动场馆列表的当前页数
IntelligentRoadTest.siteTotalPage = 0; //大型运动场馆列表总页数
IntelligentRoadTest.siteTotalCount = 0;//大型运动场馆列表总记录数
IntelligentRoadTest.siteCrossFliterObj = crossfilter([]);//骨头区域crossflilter对象
IntelligentRoadTest.filterSiteResult = [];//帅选后的骨头数据数组
IntelligentRoadTest.tempSiteFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterSite = false;//是否排序过
IntelligentRoadTest.siteCurrentSelectConditon = "";//大型运动场馆列表的前一个查询条件缓存
IntelligentRoadTest.ifShowSite = true; //是否启用

//战狼区域列表的属性
IntelligentRoadTest.warwolfResult = [];//战狼区域列表查询数据的缓存
IntelligentRoadTest.warwolfCurrentResult = [];//战狼区域列表当前数据的缓存
IntelligentRoadTest.warwolfVM = null; //战狼区域列表的Vue对象
IntelligentRoadTest.warwolfCurrentPage = 1; //战狼区域列表的当前页数
IntelligentRoadTest.warwolfTotalPage = 0; //战狼区域列表总页数
IntelligentRoadTest.warwolfTotalCount = 0;//战狼区域列表总记录数
IntelligentRoadTest.warwolfCrossFliterObj = crossfilter([]);//骨头区域crossflilter对象
IntelligentRoadTest.filterWarwolfResult = [];//帅选后的骨头数据数组
IntelligentRoadTest.tempWarwolfFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterWarwolf = false;//是否排序过
IntelligentRoadTest.warwolfCurrentSelectConditon = "";//战狼区域列表的前一个查询条件缓存
IntelligentRoadTest.ifShowWarwolf = true; //是否启用

//农贸市场列表的属性
IntelligentRoadTest.marketResult = [];//农贸市场列表查询数据的缓存
IntelligentRoadTest.marketCurrentResult = [];//农贸市场列表当前数据的缓存
IntelligentRoadTest.marketVM = null; //农贸市场列表的Vue对象
IntelligentRoadTest.marketCurrentPage = 1; //农贸市场列表的当前页数
IntelligentRoadTest.marketTotalPage = 0; //农贸市场列表总页数
IntelligentRoadTest.marketTotalCount = 0;//农贸市场列表总记录数
IntelligentRoadTest.marketCrossFliterObj = crossfilter([]);//骨头区域crossflilter对象
IntelligentRoadTest.filterMarketResult = [];//帅选后的骨头数据数组
IntelligentRoadTest.tempMarketFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterMarket = false;//是否排序过
IntelligentRoadTest.marketCurrentSelectConditon = "";//农贸市场列表的前一个查询条件缓存
IntelligentRoadTest.ifShowMarket = true; //是否启用


//新增场景
var school = {}; //中小学
school.type = 11;//ESBH_TYPE
school.typeName = "天翼蓝鹰中小学";
school.senseName = "中小学";
school.name = "school";
school.index = 20;

var cityVillage = {} //城中村
cityVillage.type = 12;//ESBH_TYPE
cityVillage.typeName = "天翼蓝鹰城中村";
cityVillage.senseName = "城中村";
cityVillage.name = "cityVillage";
cityVillage.index = 21;

var village = {};//自然村
village.type = 13;//ESBH_TYPE
village.typeName = "天翼蓝鹰自然村";
village.senseName = "自然村";
village.name = "village";
village.index = 22;

var factory = {}; //工厂
factory.type = 14;//ESBH_TYPE
factory.typeName = "天翼蓝鹰工厂";
factory.senseName = "工厂";
factory.name = "factory";
factory.index = 23;

IntelligentRoadTest.school = school;
IntelligentRoadTest.cityVillage = cityVillage;
IntelligentRoadTest.village = village;
IntelligentRoadTest.factory = factory;

//弱区和上下行低速率区域
var poorArea = {};//存放弱区列表的一些属性的对象（比如index ， typeName等等）
poorArea.type = 0;//弱区域type
poorArea.typeName = "弱区";
poorArea.senseName = "弱区";
poorArea.name = "poorArea";
poorArea.index = 0;

var upPoorArea = {};//存放上行低速区域列表的一些属性的对象（比如index ， typeName等等）
upPoorArea.type = 4;//弱区域type
upPoorArea.typeName = "上行低速区";
upPoorArea.senseName = "上行低速区";
upPoorArea.name = "upPoorArea";
upPoorArea.index = 24;

var dwPoorArea = {};//存放下行低速区域列表的一些属性的对象（比如index ， typeName等等）
dwPoorArea.type = 5;//弱区域type
dwPoorArea.typeName = "下行低速区";
dwPoorArea.senseName = "下行低速区";
dwPoorArea.name = "dwPoorArea";
dwPoorArea.index = 25;

var m3PoorArea = {};//存放MOD3干扰区域列表的一些属性的对象（比如index ， typeName等等）
m3PoorArea.type = 6;//弱区域type
m3PoorArea.typeName = "MOD3干扰区";
m3PoorArea.senseName = "MOD3干扰区";
m3PoorArea.name = "m3PoorArea";
m3PoorArea.index = 30;

var olPoorArea = {};//存放重叠覆盖区域列表的一些属性的对象（比如index ， typeName等等）
olPoorArea.type = 7;//弱区域type
olPoorArea.typeName = "重叠覆盖区";
olPoorArea.senseName = "重叠覆盖区";
olPoorArea.name = "olPoorArea";
olPoorArea.index = 31;

var cbPoorArea = {};//存放越区覆盖区域列表的一些属性的对象（比如index ， typeName等等）
cbPoorArea.type = 8;//弱区域type
cbPoorArea.typeName = "越区覆盖区";
cbPoorArea.senseName = "越区覆盖区";
cbPoorArea.name = "cbPoorArea";
cbPoorArea.index = 32;

IntelligentRoadTest.m3PoorArea = m3PoorArea;
IntelligentRoadTest.olPoorArea = olPoorArea;
IntelligentRoadTest.cbPoorArea = cbPoorArea;


IntelligentRoadTest.poorArea = poorArea;
IntelligentRoadTest.upPoorArea = upPoorArea;
IntelligentRoadTest.dwPoorArea = dwPoorArea;

IntelligentRoadTest.hasCityVillageCity = ["中山" , "广州" , "惠州" , "珠海" , "东莞" , "江门" , "深圳" , "佛山"];
//--------------------------------------------------------------------------
IntelligentRoadTest.isClickGrid = false; //作为是否进入栅格详情页的标识

//框选区域的属性
IntelligentRoadTest.saveAreaVM = null;

IntelligentRoadTest.OsmMap = null;
IntelligentRoadTest.cityPermission_common = null;//用户分权分域所属
IntelligentRoadTest.user_role = null;//用户角色字符串
IntelligentRoadTest.city = null;//用户切换后的地市
IntelligentRoadTest.day = null;//用户切换后的时间
IntelligentRoadTest.baimapStyle = "grayscale";//地图风格
IntelligentRoadTest.baidumapExhibitionStyle = [
    {
        "featureType": "background",
        "elementType": "all",
        "stylers": {
            "color": "#192d52ff"
        }
    }
];//天翼手机展展示用的地图风格
IntelligentRoadTest.mapStyle = [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": {
            "color": "#eeeeeeff",
            "visibility": "on"
        }
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "poilabel",
        "elementType": "all",
        "stylers": {
            "color": "#eeeeeeff",
            "visibility": "off"
        }
    }
];//三网时地图风格
IntelligentRoadTest.localSearch = null;//百度接口根据名称进行搜索工具类
IntelligentRoadTest.bmapDistanceTool = null;//测距测角工具类
IntelligentRoadTest.myDrawingManagerObject = null;//框选工具类
IntelligentRoadTest.selectBoxMarker = null;//框选结束后的保存按钮
IntelligentRoadTest.SelectionOverlay = null;//框选结束后的多边形对象
IntelligentRoadTest.SelectionOverlayM = null;//框选结束后添加到移动地图的多边形对象
IntelligentRoadTest.SelectionOverlayU = null;//框选结束后添加到联通地图的多边形对象
IntelligentRoadTest.DistrictPolygon = [];//区县轮廓多边形存储数组，用于匹配地图中心点所在的区县
IntelligentRoadTest.districtLngAndLat = {};//区县名称、id、最大最小经纬度存储对象，数据格式为：{"广州":{"天河":{"max_lng":"","min_lng":"","max_lat":"","min_lat":"","id":""}},......}
IntelligentRoadTest.sectorCompent = null;//基站组件对象-----4G
IntelligentRoadTest.sector2GCompent = null;//基站组件对象----2G
IntelligentRoadTest.poorAreaCompent = null;//弱区图层对象
IntelligentRoadTest.poorAreaCompentM = null;//移动地图弱区图层对象
IntelligentRoadTest.poorAreaCompentU = null;//联通地图弱区图层对象
IntelligentRoadTest.poorCompent = null;//弱覆盖区图层对象
IntelligentRoadTest.poorCompentM = null;//移动地图弱覆盖区图层对象
IntelligentRoadTest.poorCompentU = null;//联通地图弱覆盖区图层对象
IntelligentRoadTest.covSectorCompent = null;//mod3、越区、重叠图层对象
IntelligentRoadTest.covSectorCompentM = null;//移动地图mod3、越区、重叠图层对象
IntelligentRoadTest.covSectorCompentU = null;//联通地图mod3、越区、重叠图层对象
IntelligentRoadTest.ConcernAreaCompent = null;//关注区域图层对象
IntelligentRoadTest.BoneAreaCompent = null;//骨头区域图层对象
IntelligentRoadTest.colorBarArr = [];//需要隐藏的图例id数组---覆盖质量
IntelligentRoadTest.colorBarArrSH = [];//需要隐藏的图例id数组---上行速率
IntelligentRoadTest.colorBarArrXH = [];//需要隐藏的图例id数组---下行速率
IntelligentRoadTest.colorBarArrM3 = [];//需要隐藏的图例id数组---MOD3干扰
IntelligentRoadTest.colorBarArrYQ = [];//需要隐藏的图例id数组---越区覆盖
IntelligentRoadTest.colorBarArrCD = [];//需要隐藏的图例id数组---重叠覆盖
IntelligentRoadTest.colorBarArrEC = [];//需要隐藏的图例id数组---EC/IO
IntelligentRoadTest.colorBarArrNB = [];//需要隐藏的图例id数组---NB
IntelligentRoadTest.colorBarArrLine = [];//需要隐藏的图例id数组---线段覆盖质量
IntelligentRoadTest.colorBarArrSHLine = [];//需要隐藏的图例id数组---线段上行速率
IntelligentRoadTest.colorBarArrXHLine = [];//需要隐藏的图例id数组---线段下行速率
IntelligentRoadTest.CanArr = [];//栅格数据
IntelligentRoadTest.GridCanArrT = [];//三网时电信栅格数据
IntelligentRoadTest.GridCanArrM = [];//三网时移动栅格数据
IntelligentRoadTest.GridCanArrU = [];//三网时联通栅格数据
IntelligentRoadTest.GridAreaCanArrT = [];//三网时电信区县弱区栅格
IntelligentRoadTest.GridAreaCanArrM = [];//三网时移动区县弱区栅格
IntelligentRoadTest.GridAreaCanArrU = [];//三网时联通区县弱区栅格
IntelligentRoadTest.CanArrArea = [];//区县弱区栅格
IntelligentRoadTest.GridMapCircleDataArr = [];//DT描点数据
IntelligentRoadTest.layerIndex = [];//图层顺序数组
IntelligentRoadTest.nrSectorOverlay = [];//最近top5小区连线
IntelligentRoadTest.mrSectorOverlay = [];//mr记录数top5小区连线
IntelligentRoadTest.nrTop5CellBmapUtil = null;//最近top5小区扇区呈现
IntelligentRoadTest.mrTop5CellBmapUtil = null;//mr记录数top5小区扇区呈现
IntelligentRoadTest.nrTop5CellBmapUtilOsm = null;//最近top5小区扇区呈现
IntelligentRoadTest.mrTop5CellBmapUtilOsm = null;//mr记录数top5小区扇区呈现
IntelligentRoadTest.objectPolyline = null;//图层选中的进行高亮提示轮廓
IntelligentRoadTest.mrGridTop5CellBmapUtil = null;//栅格mr记录数top连线扇区
IntelligentRoadTest.mrGridSectorOverlay = [];//栅格mr记录数top连线

IntelligentRoadTest.linkImgPoints = [];//三网对比时聚焦框的四个角图标覆盖物
IntelligentRoadTest.focusPolyline = null;//三网对比时聚焦框中的矩形线对象
IntelligentRoadTest.sevenIndex = 0;//关注区域7天变化查询结束标记
IntelligentRoadTest.sevenLineData = [];//关注区域7天变化图表数据纪录
IntelligentRoadTest.sevenLineEchart = null;//关注区域7天变化echart图表对象
IntelligentRoadTest.sevenLineEchartDiv = "lineChart"; //关注区域的折线图的div的id
IntelligentRoadTest.saveSevenLineEchartDiv = "saveLineChart"; //保存关注区域的折线图的div的id
IntelligentRoadTest.boneSevenLineEchartDiv = "boneLineChart"; //骨头区域的折线图的div的id
IntelligentRoadTest.isBoxSelectEchart = false;//是否框选echart对象
IntelligentRoadTest.count = 0;
IntelligentRoadTest.unicomIsHide = false;//三网时联通地图是否隐藏
IntelligentRoadTest.mobileIsHide = false;//三网时移动地图是否隐藏
IntelligentRoadTest.isThreeNetStatus = false;//是否正在打开三网
IntelligentRoadTest.isBoxSelecting = false;//是否正在框选栅格
IntelligentRoadTest.concerningArea = false;//是否正在查看关注区域
IntelligentRoadTest.isShowGrid = false;//正在查看栅格，（进入到呈现栅格方法内）
IntelligentRoadTest.isShowDTGrid = false;//正在查看路测栅格,(进入到路测栅格数据回调方法内)
IntelligentRoadTest.isShowAreaGrid = false;//查询区域弱区栅格
IntelligentRoadTest.isUseCoordinatePickTool = false;//是否使用坐标获取工具
IntelligentRoadTest.gridThresholds = [
    {"threshold": "<=-115", "text": "(-∞,-115]", "color": "#C00000", "gradient": 0.83},
    {"threshold": "<=-105", "text": "(-115,-105]", "color": "#FFC000", "gradient": 0.66},
    {"threshold": "<=-95", "text": "(-105,-95]", "color": "#0070C0", "gradient": 0.5},
    {"threshold": "<=-85", "text": "(-95,-85]", "color": "#00B0F0", "gradient": 0.33},
    {"threshold": "<0", "text": "(-85,0)", "color": "#009900", "gradient": 0.33},
    {"threshold": "<=3", "text": "(0,3]", "color": "#bb10c4", "gradient": 0.33},
    {"threshold": "200", "text": "(-85,0)", "color": "#0070C0", "gradient": 0.33}
];
IntelligentRoadTest.allCity = ["广州", "深圳", "珠海", "佛山", "东莞", "惠州", "中山", "江门", "肇庆", "清远", "茂名", "湛江", "汕头", "汕尾", "梅州", "韶关", "揭阳", "潮州", "云浮", "河源", "阳江"];// 可选的有效日期。
IntelligentRoadTest.MetroCityList = ["广州", "深圳", "佛山", "东莞"];// 可选的地铁地市。

IntelligentRoadTest.poorAreaLineColor = '#FF9900';
IntelligentRoadTest.sectorColor = '#9966CC';
IntelligentRoadTest.concernAreaLineColor = '#4AA9E0';
IntelligentRoadTest.boneAreaLineColor = '#ED666A';
IntelligentRoadTest.nrTop5LineColor = "#CC66FF";//最近top5小区连线线条颜色
IntelligentRoadTest.mrTop5LineColor = "#6633FF";//主服务top5小区连线线条颜色
IntelligentRoadTest.objectPolylineColor = "#99FF00";//匹配到的进行高亮颜色
IntelligentRoadTest.continueLineColor = "#FF9900";//高速高铁市政路连片线段颜色
IntelligentRoadTest.lineArr = [];
IntelligentRoadTest.sectorPolygonArr = [];
IntelligentRoadTest.macSectorMarkeArr = [];//宏站账台mk
IntelligentRoadTest.isShowBaiduMap = true;//当前显示的地图是否是百度地图
IntelligentRoadTest.isShowOsmMapEnd = false;//进行地图而切换时，osm地图是否切换完成
IntelligentRoadTest.roadHbaseQueryMultiple = null;//视野内级别数据hbase查询
IntelligentRoadTest.roadDimQueryMultiple = null;//视野内级别数据基础表查询
IntelligentRoadTest.isShowHighwayLine = false;//是否呈现高速图层,只有第一层的时候有效
IntelligentRoadTest.isShowRailwayLine = false;//是否呈现高铁图层，只有第一层的时候有效
IntelligentRoadTest.isShowCityRoadLine = false;//是否呈现市政路图层，只有第一层的时候有效
IntelligentRoadTest.isInitBoxCitySelect = false;//是否初始化了框选之后详细信息页面的营服下拉框
IntelligentRoadTest.isInitBoxSceneSelect = false;//是否初始化了框选之后详细信息页面的场景下拉框
//当前登录的用户名，用户判断关注区域和骨头区域删除按钮是否隐藏
IntelligentRoadTest.currentUser = null;

//搜索文字缓存
IntelligentRoadTest.searchTxtTmp = [];

//是否点击过弱区。。那部分
IntelligentRoadTest.clickFlag = false;

//场景name
IntelligentRoadTest.senceName = "IntelligentRoadTestV2";

//点击的场景
IntelligentRoadTest.searchSenceTxtTmp = "";

//弱区，扇区index
IntelligentRoadTest.indexTmp = [];

IntelligentRoadTest.isSkip = false;//判断是否直接从详情调到一级列表

IntelligentRoadTest.isClickSector = false;//判断是否主动点击扇区

IntelligentRoadTest.nrmrLineHighOsm = [];

IntelligentRoadTest.nrmrLineHighFlag = true;

//栅格图层弹出框数据
IntelligentRoadTest.gridBandIndex = 0;//栅格频段下标 0--不分频段  1--区分频段
IntelligentRoadTest.gridTypeIndex = 0;//栅格类型下标 0--覆盖类型  1--上行速率  2--下行速率  3--MOD3干扰扇区   4--越区覆盖扇区   5--重叠覆盖扇区  6--MOD3干扰弱区   7--越区覆盖弱区   8--重叠覆盖弱区
IntelligentRoadTest.gridBand = ["主接入场强"];//栅格频段
IntelligentRoadTest.gridType = 0;//栅格数据 AGPS-MR、全量MR综合、全量MR室外、全量MR室内的AGPS_TYPE分别为1、0、3、2
IntelligentRoadTest.gridTime = "week";//栅格时间粒度
IntelligentRoadTest.gridOpacity = 0.6;//栅格透明度
IntelligentRoadTest.gridDivZindex = 10;//栅格层级
IntelligentRoadTest.gridInterval=null;//获取对应栅格类型的指标区间（右下角栅格图例）与线段共用
IntelligentRoadTest.gridIntervalKey="fgLegend";//获取对应栅格类型的指标区间（右下角栅格图例）与线段共用
IntelligentRoadTest.requery = true;//是否需要忽略缓存重新查询图层
IntelligentRoadTest.systemLayer = null;//缓存的图层Json数据
IntelligentRoadTest.highLightPolyline = null;//当前高亮的对象多边形


//IntelligentRoadTest.clickItem = null;//当前点击的多边形
IntelligentRoadTest.boxItem = null;//当前框选的多边形
IntelligentRoadTest.maxlnglat_minlnglat = null;//缓存多边形的最大最小经纬度

//三网RSRP均值对比
IntelligentRoadTest.dx_rsrp_three = null;//电信
IntelligentRoadTest.yd_rsrp_three = null;//移动
IntelligentRoadTest.lt_rsrp_three = null;//联通
//三网覆盖率对比
IntelligentRoadTest.dx_cover_three = null;//电信
IntelligentRoadTest.yd_cover_three = null;//移动
IntelligentRoadTest.lt_cover_three = null;//联通
IntelligentRoadTest.month_relate_three = null;//三网对比的月份

//场景覆盖指标呈现
IntelligentRoadTest.rsrpAvg = null;//RSRP均值
IntelligentRoadTest.coverRate = null;//覆盖率
IntelligentRoadTest.poorRate = null;//弱栅格占比
IntelligentRoadTest.zhibiao = null;//指标类型
IntelligentRoadTest.shRate = null;//kqi感知上行速率
IntelligentRoadTest.xhRate = null;//kqi感知下行速率
IntelligentRoadTest.xhCqi = null;//kqi感知下行平均CQI
IntelligentRoadTest.xhRank = null;//kqi感知下行平均Rank
IntelligentRoadTest.mrRate = null;//MOD3/越区/重叠栅格占比

IntelligentRoadTest.systemTip = true;//系统图层第一次打开的时候需要提示
IntelligentRoadTest.polygonContour = "";//多边形轮廓

IntelligentRoadTest.loadLayerNum = 0;//需要加载图层的方法（用来控制“加载中”弹框动画的显示隐藏）
IntelligentRoadTest.currentLayerNum = 0;//当前执行到的方法（用来控制“加载中”弹框动画的显示隐藏）
IntelligentRoadTest.showLayerLoading = false;

//场景图层映射对象
IntelligentRoadTest.senceObjName = {
    "highColleges": "college",//高校
    "venues": "site",//场馆
    "beautyFood": "food",//美食
    "beautyScenery": "scenery",//美景
    "concern": "concern",//关注区域
    "bone": "boneArea",//骨头区域
    "wolfArea": "warwolf",//战狼区域
    "farmerMarket": "market",//农贸市场
    "highResidence": "uptown",//高密度住宅区
    "highBusiness": "business",//高流量商务区
    "village": "village",//自然村
    "cityVillage": "cityVillage",//城中村
    "school": "school",//中小学
    "factory": "factory"//工厂
};


IntelligentRoadTest.isColorFirstClick = true;

IntelligentRoadTest.paCell = {};//弱栅格占比
IntelligentRoadTest.paHisDay = [];//系统时间历史前7天
IntelligentRoadTest.paAftDay = [];//选中日期后7天

// 工单跳转延时加载标识，等待IntelligentRoadTest.handleDistrictJson方法执行，防止图层加载出来了，地图再次进行定位，导致地图中心点不在图层所在的范围
IntelligentRoadTest.handleDistrictJsonIsComplete = false;


IntelligentRoadTest.initMapZoom = 17; //后面会改成17，也即是100米 18为50米

IntelligentRoadTest.showNrCover = true; //先暂时设置为false，后面要改成 true
IntelligentRoadTest.currentNrCover = "4G"; //默认显示4G附近覆盖
IntelligentRoadTest.nrCover={"showNrCover":true,"currentNrCover":"4G"};//附近覆盖的缓存

/**
 * 传入城市名称获取相应的经纬度
 *
 */
function getCityLocation(city){
    var cityLocation={
        "广州":"113.270793,23.135308",
        "深圳":"114.066112,22.548515",
        "珠海":"113.583235,22.276392",
        "汕头":"116.688739,23.359289",
        "佛山":"113.128432,23.027707",
        "韶关":"113.603757,24.816174",
        "湛江":"110.365494,21.277163",
        "肇庆":"112.47177,23.052984",
        "江门":"113.088165,22.584459",
        "茂名":"110.931773,21.669051",
        "惠州":"114.423348,23.116409",
        "梅州":"116.129179,24.294311",
        "汕尾":"115.381693,22.791322",
        "河源":"114.707097,23.749829",
        "阳江":"111.989051,21.864421",
        "清远":"113.062619,23.688238",
        "东莞":"113.758231,23.026997",
        "中山":"113.399023,22.522262",
        "潮州":"116.62943,23.662923",
        "揭阳":"116.37922,23.555773",
        "云浮":"112.051045,22.921154",
        "未知":"113.270793,23.135308"
    };
    if(city!=null){
        var  pointArr=cityLocation[city].split(",");
        var pointLng=pointArr[0];
        var pointLat=pointArr[1];
        var point = new BMap.Point(pointLng, pointLat);
        return point;
    }
    return null;

};
IntelligentRoadTest.resizeInfoWindow = function IntelligentRoadTest_resizeInfoWindow() {
    try {
        var pixel = IntelligentRoadTest.map.pointToPixel(IntelligentRoadTest.infoWindowPoint);
        var x = pixel.x;
        var y = pixel.y;
        var height = $('#cirTipLeft').height() * 33 / 100 + 30;
        $('#cirTipLeft').css("left", x + 20 + "px").css("top", y - height + 10 + "px");
    } catch (e) {
        // TODO: handle exception
    }
}

//地图缩放、拖拽结束事件
IntelligentRoadTest.GridMapZoomEnd = function IntelligentRoadTest_GridMapZoomEnd(e) {
    // console.log("地图缩放、拖拽结束事件");
    IntelligentRoadTest.resizeInfoWindow(IntelligentRoadTest.infoWindowPoint);
    //缩放时不会触发地图移动moveend事件，因此要做一个触发
    if (e.type == "onzoomend") {
        //console.log("zoomend",IntelligentRoadTest.map.getZoom());
        IntelligentRoadTest.GridMapMoveEnd(e);
    }
    //高铁需要在10公里级别做分层，如果大于10公里，使用聚合打点的方式，小于10公里，使用画框的方式
    if(IntelligentRoadTest.index == 8 && (IntelligentRoadTest.roadStatus == 3 || IntelligentRoadTest.roadStatus == 1 || IntelligentRoadTest.roadStatus == 2)){
        if(IntelligentRoadTest.map.getZoom() > IntelligentRoadTest.markarClusterZoom){
            if(IntelligentRoadTest.railMarkerClusterer){
                IntelligentRoadTest.railMarkerClusterer.clearMarkers();
            }

            if(IntelligentRoadTest.railContinueLineUtil){
                IntelligentRoadTest.railContinueLineUtil.draw();
            }
        }else{
            if(IntelligentRoadTest.railMarkerClusterer){
                if(IntelligentRoadTest.railMarkerClusterer.getMarkers().length != IntelligentRoadTest.MarkerResultArr.length){
                    IntelligentRoadTest.railMarkerClusterer.clearMarkers();
                    IntelligentRoadTest.railMarkerClusterer.addMarkers(IntelligentRoadTest.MarkerResultArr);
                }
            }

            if(IntelligentRoadTest.railContinueLineUtil){
                IntelligentRoadTest.railContinueLineUtil.clearCanvasLayers();
            }
        }
    }

    if (IntelligentRoadTest.metroStationsMarkerOverlay.length > 0) {
        if (IntelligentRoadTest.map.getZoom() < 14) {
            for (var i = 0; i < IntelligentRoadTest.metroStationsMarkerOverlay.length; i++) {
                var markerPoint = IntelligentRoadTest.metroStationsMarkerOverlay[i];
                var icon = markerPoint.getIcon();
                icon.setImageSize(new BMap.Size(9, 9));
                markerPoint.setIcon(icon);
                if (markerPoint.isVisible()) {
                    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metroStationsMarkerOverlay[i]);  //移除覆盖物
                    IntelligentRoadTest.metroStationsMarkerOverlay[i] = markerPoint;
                    IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.metroStationsMarkerOverlay[i]);  //添加覆盖物
                } else {
                    IntelligentRoadTest.metroStationsMarkerOverlay[i] = markerPoint;
                }

            }

            for (var i = 0; i < IntelligentRoadTest.metroStationsOverlay.length; i++) {
                if (IntelligentRoadTest.metroStationsOverlay[i].type == "LineDivide") {
                    if (IntelligentRoadTest.metroStationsOverlay[i].index % 2 != 0 && IntelligentRoadTest.metroStationsOverlay[i].isVisible()) {
                        IntelligentRoadTest.metroStationsOverlay[i].hide();
                    }
                }
            }

        } else {
            for (var i = 0; i < IntelligentRoadTest.metroStationsMarkerOverlay.length; i++) {
                var markerPoint = IntelligentRoadTest.metroStationsMarkerOverlay[i];
                var icon = markerPoint.getIcon();
                icon.setImageSize(new BMap.Size(18, 18));
                markerPoint.setIcon(icon);
                if (markerPoint.isVisible()) {
                    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.metroStationsMarkerOverlay[i]);  //移除覆盖物
                    IntelligentRoadTest.metroStationsMarkerOverlay[i] = markerPoint;
                    IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.metroStationsMarkerOverlay[i]);  //添加覆盖物
                } else {
                    IntelligentRoadTest.metroStationsMarkerOverlay[i] = markerPoint;
                }
            }

            for (var i = 0; i < IntelligentRoadTest.metroStationsOverlay.length; i++) {
                if (IntelligentRoadTest.metroStationsOverlay[i].type == "LineDivide") {
                    if (!IntelligentRoadTest.metroStationsOverlay[i].isVisible()) {
                        IntelligentRoadTest.metroStationsOverlay[i].show();
                    }
                }
            }

        }
    }
}


//地图移动结束事件
IntelligentRoadTest.GridMapMoveEnd = function IntelligentRoadTest_GridMapMoveEnd(e) {
    // console.log("地图移动结束事件");
    $('#cirTipLeft').hide();
    if (e.gH) {//当使用centerAndZoom方法进行设置中心点时，该属性会为字符串"CenterAndZoom"
        return;
    }
    if(e.type == "onzoomend"){
        if(IntelligentRoadTest.lastExcuteMapMoveendByZoomTimeout != null) {
            clearTimeout(IntelligentRoadTest.lastExcuteMapMoveendByZoomTimeout);
            IntelligentRoadTest.lastExcuteMapMoveendZoom = IntelligentRoadTest.map.getZoom();
            //延迟时间执行地图移动结束事件需要的重绘、重新查询（如果需要）等动作
            IntelligentRoadTest.lastExcuteMapMoveendByZoomTimeout = setTimeout(IntelligentRoadTest.jugeIsNeedExcuteMapMoveendByZoom.bind(e),IntelligentRoadTest.loadBoundsLineTimeInterval);
        }else{
            IntelligentRoadTest.lastExcuteMapMoveendZoom = IntelligentRoadTest.map.getZoom();
            IntelligentRoadTest.lastExcuteMapMoveendByZoomTimeout = setTimeout(IntelligentRoadTest.jugeIsNeedExcuteMapMoveendByZoom.bind(e),IntelligentRoadTest.loadBoundsLineTimeInterval);
        }
    }else{
        if(IntelligentRoadTest.lastExcuteMapMoveendByCenterTimeout != null) {
            clearTimeout(IntelligentRoadTest.lastExcuteMapMoveendByCenterTimeout);
            IntelligentRoadTest.lastExcuteMapMoveendByCenter = IntelligentRoadTest.map.getCenter();
            //延迟时间执行查询
            IntelligentRoadTest.lastExcuteMapMoveendByCenterTimeout = setTimeout(IntelligentRoadTest.jugeIsNeedExcuteMapMoveendByCenter.bind(e),IntelligentRoadTest.loadBoundsLineTimeInterval);
        }else{
            IntelligentRoadTest.lastExcuteMapMoveendByCenter = IntelligentRoadTest.map.getCenter();
            IntelligentRoadTest.lastExcuteMapMoveendByCenterTimeout = setTimeout(IntelligentRoadTest.jugeIsNeedExcuteMapMoveendByCenter.bind(e),IntelligentRoadTest.loadBoundsLineTimeInterval);
        }
    }
    // IntelligentRoadTest.legendGrid();
    // IntelligentRoadTest.GridMap.draw(IntelligentRoadTest.gridArr);
}

IntelligentRoadTest.mapMoveendInteval = function (e){
    if (IntelligentRoadTest.isScreenCompared && !IntelligentRoadTestScreenCompared.sendSetCenter) {//分屏页发送页面同步信息
        var messageObj = {}
        messageObj.type = "bdmaponmoveend";
        messageObj.point = IntelligentRoadTest.map.getCenter();
        messageObj.zoom = IntelligentRoadTest.map.getZoom();
        messageObj.sendSetCenter = true;
        window.opener.postMessage(JSON.stringify(messageObj), "*");
    } else {
        if (IntelligentRoadTest.isAddMessageEvent && !IntelligentRoadTestScreenCompared.sendSetCenter) {// 主屏时，往分屏页发送信息
            var messageObj = {}
            messageObj.type = "bdmaponmoveend";
            messageObj.point = IntelligentRoadTest.map.getCenter();
            messageObj.zoom = IntelligentRoadTest.map.getZoom();
            messageObj.sendSetCenter = true;
            windowScreeen.postMessage(JSON.stringify(messageObj), "*");
        }
    }
    var centerPoint = IntelligentRoadTest.map.getCenter();
    if (IntelligentRoadTest.isThreeNetStatus) {
        var zoom = IntelligentRoadTest.map.getZoom();
        IntelligentRoadTest.mapMobile.setCenter(centerPoint);
        IntelligentRoadTest.mapMobile.setZoom(zoom);

        IntelligentRoadTest.mapUnicom.setCenter(centerPoint);
        IntelligentRoadTest.mapUnicom.setZoom(zoom);

        //聚焦框
        IntelligentRoadTest.drawPolylineTimeout = setTimeout("IntelligentRoadTest.drawPolyline();", 100);
    }

    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.myCompOverlay);
    $("#cirTip").hide();
    if (IntelligentRoadTest.isThreeNetStatus) {
        IntelligentRoadTest.poorAreaCompentM.clear();
        IntelligentRoadTest.poorAreaCompentM.draw();
        IntelligentRoadTest.poorAreaCompentU.clear();
        IntelligentRoadTest.poorAreaCompentU.draw();
    }


    if (IntelligentRoadTest.isShowSceneArea && IntelligentRoadTest.SceneAreaCompent != null) {
        IntelligentRoadTest.SceneAreaCompent.MapZoomAndDragEnd(e, IntelligentRoadTest.SceneAreaCompent);
    }

    if (IntelligentRoadTest.isShowPoorArea && IntelligentRoadTest.poorAreaCompent != null) {
        // console.log("重绘上行、下行。。。。");
        IntelligentRoadTest.poorAreaCompent.MapZoomAndDragEnd(e, IntelligentRoadTest.poorAreaCompent);
    }

    if (IntelligentRoadTest.isShowPoorArea && IntelligentRoadTest.poorCompent != null) {
        // console.log("重绘弱区。。。。");
        IntelligentRoadTest.poorCompent.MapZoomAndDragEnd(e, IntelligentRoadTest.poorCompent);
    }
    if (IntelligentRoadTest.isShowPoorArea && IntelligentRoadTest.covSectorCompent != null) {
        // console.log("重绘MOD3、越区、重叠。。。。");
        IntelligentRoadTest.covSectorCompent.MapZoomAndDragEnd(e, IntelligentRoadTest.covSectorCompent);
    }

    if (IntelligentRoadTest.isShowSector && IntelligentRoadTest.sectorCompent != null && !IntelligentRoadTest.showNrCover) {
        // console.log("重绘扇区。。。。");
        IntelligentRoadTest.sectorCompent.MapZoomAndDragEnd(e, IntelligentRoadTest.sectorCompent);
    }
    if (IntelligentRoadTest.isShow2GSector && IntelligentRoadTest.sector2GCompent != null && !IntelligentRoadTest.showNrCover) {
        // console.log("重绘扇区。。。。");
        IntelligentRoadTest.sector2GCompent.MapZoomAndDragEnd(e, IntelligentRoadTest.sector2GCompent);
    }

    if (IntelligentRoadTest.isShowYDSector && IntelligentRoadTest.sectorYDCompent != null) {
        // console.log("重绘扇区。。。。");
        IntelligentRoadTest.sectorYDCompent.MapZoomAndDragEnd(e, IntelligentRoadTest.sectorYDCompent);
    }

    if (IntelligentRoadTestSystemLayerV3.isShowUserComplain && IntelligentRoadTestSystemLayerV3.userComplainCompent != null) {
        // console.log("重绘用户抱怨图层。。。。");
        IntelligentRoadTestSystemLayerV3.userComplainCompent.MapZoomAndDragEnd(e, IntelligentRoadTestSystemLayerV3.userComplainCompent);
    }


    //呈现的是栅格
    if (IntelligentRoadTest.isShowGrid) {
        if (IntelligentRoadTest.isShowDTGrid) {
            IntelligentRoadTest.GridMap.clear();
            var CTData = IntelligentRoadTest.CanArr;
            var colorBarArr = [];
            if (IntelligentRoadTest.gridTypeIndex == 1) {
                colorBarArr = IntelligentRoadTest.colorBarArrSH;
            } else if (IntelligentRoadTest.gridTypeIndex == 2) {
                colorBarArr = IntelligentRoadTest.colorBarArrXH;
            } else if (IntelligentRoadTest.gridTypeIndex == 0) {
                colorBarArr = IntelligentRoadTest.colorBarArr;
            } else if (IntelligentRoadTest.gridTypeIndex == 3) {
                colorBarArr = IntelligentRoadTest.colorBarArrM3;
            } else if (IntelligentRoadTest.gridTypeIndex == 4) {
                colorBarArr = IntelligentRoadTest.colorBarArrYQ;
            } else if (IntelligentRoadTest.gridTypeIndex == 5) {
                colorBarArr = IntelligentRoadTest.colorBarArrCD;
            }else if (IntelligentRoadTest.gridTypeIndex == 6) {
                colorBarArr = IntelligentRoadTest.colorBarArrEC;
            }

            for (var j = 0; j < colorBarArr.length; j++) {
                CTData = IntelligentRoadTest.ClearData(CTData, colorBarArr[j]);
            }
            if (CTData.length > 0) {
                IntelligentRoadTest.GridMap.draw(CTData);
            }
            CTData = null;
        } else {
            //三网时，还需要增加移动和联通的清除
            //增加移动联通地图栅格重绘
            if (IntelligentRoadTest.isThreeNetStatus) {
                IntelligentRoadTest.GridMap.clear();
                IntelligentRoadTest.GridMapM.clear();
                IntelligentRoadTest.GridMapU.clear();
                var CTData = IntelligentRoadTest.GridCanArrT;
                var CMData = IntelligentRoadTest.GridCanArrM;
                var CUData = IntelligentRoadTest.GridCanArrU;
                for (var j = 0; j < IntelligentRoadTest.colorBarArr.length; j++) {
                    CTData = IntelligentRoadTest.ClearData(CTData, IntelligentRoadTest.colorBarArr[j]);
                    CMData = IntelligentRoadTest.ClearData(CMData, IntelligentRoadTest.colorBarArr[j]);
                    CUData = IntelligentRoadTest.ClearData(CUData, IntelligentRoadTest.colorBarArr[j]);
                }
                if (CTData.length > 0) {
                    IntelligentRoadTest.GridMap.draw(CTData);
                }
                IntelligentRoadTest.GridMapM.draw(CMData);
                IntelligentRoadTest.GridMapU.draw(CUData);
                CTData = null;
                CMData = null;
                CUData = null;
            } else {
                IntelligentRoadTest.GridMap.clear();
                var CTData = IntelligentRoadTest.CanArr;
                var colorBarArr = [];
                if (IntelligentRoadTest.gridTypeIndex == 1) {
                    colorBarArr = IntelligentRoadTest.colorBarArrSH;
                } else if (IntelligentRoadTest.gridTypeIndex == 2) {
                    colorBarArr = IntelligentRoadTest.colorBarArrXH;
                } else if (IntelligentRoadTest.gridTypeIndex == 0) {
                    colorBarArr = IntelligentRoadTest.colorBarArr;
                } else if (IntelligentRoadTest.gridTypeIndex == 3) {
                    colorBarArr = IntelligentRoadTest.colorBarArrM3;
                } else if (IntelligentRoadTest.gridTypeIndex == 4) {
                    colorBarArr = IntelligentRoadTest.colorBarArrYQ;
                } else if (IntelligentRoadTest.gridTypeIndex == 5) {
                    colorBarArr = IntelligentRoadTest.colorBarArrCD;
                }else if (IntelligentRoadTest.gridTypeIndex == 6) {
                    colorBarArr = IntelligentRoadTest.colorBarArrEC;
                }
                for (var j = 0; j < colorBarArr.length; j++) {
                    CTData = IntelligentRoadTest.ClearData(CTData, colorBarArr[j]);
                }
                try {
                    if (CTData.length > 0) {
                        IntelligentRoadTest.GridMap.draw(CTData);
                    }
                } catch (e) {
                    // TODO: handle exception
                }
                CTData = null;
            }

        }

    } else {
        IntelligentRoadTest.GridMap.clear();
        //呈现的是描点
        var DTData = IntelligentRoadTest.GridMapCircleDataArr;
        for (var j = 0; j < IntelligentRoadTest.colorBarArr.length; j++) {
            DTData = IntelligentRoadTest.ClearDtData(DTData, IntelligentRoadTest.colorBarArr[j]);
        }
        if (DTData.length > 0) {
            IntelligentRoadTest.GridMap.drawCircle(DTData);
        }

        DTData = null;
    }

    if (IntelligentRoadTest.isShowAreaGrid) {
        //三网时，还需要增加移动和联通的清除
        //增加移动联通地图栅格重绘
        if (IntelligentRoadTest.isThreeNetStatus) {
            IntelligentRoadTest.GridMapArea.clear();
            IntelligentRoadTest.GridMapAreaM.clear();
            IntelligentRoadTest.GridMapAreaU.clear();
            var CTData = IntelligentRoadTest.GridAreaCanArrT;
            var CMData = IntelligentRoadTest.GridAreaCanArrM;
            var CUData = IntelligentRoadTest.GridAreaCanArrU;
            for (var j = 0; j < IntelligentRoadTest.colorBarArr.length; j++) {
                CTData = IntelligentRoadTest.ClearData(CTData, IntelligentRoadTest.colorBarArr[j]);
                CMData = IntelligentRoadTest.ClearData(CMData, IntelligentRoadTest.colorBarArr[j]);
                CUData = IntelligentRoadTest.ClearData(CUData, IntelligentRoadTest.colorBarArr[j]);
            }
            if (CTData.length > 0) {
                IntelligentRoadTest.GridMapArea.draw(CTData);
            }
            IntelligentRoadTest.GridMapAreaM.draw(CMData);
            IntelligentRoadTest.GridMapAreaU.draw(CUData);
            CTData = null;
            CMData = null;
            CUData = null;
        } else {
            IntelligentRoadTest.GridMapArea.clear();
            var CTData = IntelligentRoadTest.CanArrArea;
            for (var j = 0; j < IntelligentRoadTest.colorBarArr.length; j++) {
                CTData = IntelligentRoadTest.ClearData(CTData, IntelligentRoadTest.colorBarArr[j]);
            }
            if (CTData.length > 0) {
                IntelligentRoadTest.GridMapArea.draw(CTData);
            }
            CTData = null;
        }
    } else {
        IntelligentRoadTest.GridMapArea.clear();
        IntelligentRoadTest.GridMapAreaM.clear();
        IntelligentRoadTest.GridMapAreaU.clear();
    }

    //需要加载附近覆盖的内容
    if(IntelligentRoadTest.showNrCover ){
        if(IntelligentRoadTest.map.getZoom() >= IntelligentRoadTest.nrCoverMaxZoom){
            if(IntelligentRoadTest.currentLocation == ''){
                IntelligentRoadTest.loadNrCoverData(true);
            }

        }else{
            if (IntelligentRoadTest.isShowSector && IntelligentRoadTest.sectorCompent != null) {
                //IntelligentRoadTest.sectorCompent.useScopeQuery = false;
                IntelligentRoadTest.sectorCompent.allDataFlagIsCompleted = false;
                IntelligentRoadTest.sectorCompent.isBackgroundQuerying = true;
            }
            if (IntelligentRoadTest.isShow2GSector && IntelligentRoadTest.sector2GCompent != null) {
                //IntelligentRoadTest.sectorCompent.useScopeQuery = false;
                IntelligentRoadTest.sector2GCompent.allDataFlagIsCompleted = false;
                IntelligentRoadTest.sector2GCompent.isBackgroundQuerying = true;
            }
        }
    }

    //由于高速、高铁、市政路需要迁移到百度地图，因此加入在第一层和第二层时地图缩放等事件结束后重新加载地图数据
    if (IntelligentRoadTest.index == 7 || IntelligentRoadTest.index == 8 || IntelligentRoadTest.index == 14) {
        if(e.type == "onzoomend"){
            if (IntelligentRoadTest.roadIndex < 3){
                IntelligentRoadTest.loadLineByLevelFromBounds();
                /*
                if(IntelligentRoadTest.lastLoadBoundsLineTimeout != null) {
                    clearTimeout(IntelligentRoadTest.lastLoadBoundsLineTimeout);
                    IntelligentRoadTest.lastLoadBoundsMapZoom = IntelligentRoadTest.map.getZoom();
                    //延迟时间执行查询
                    IntelligentRoadTest.lastLoadBoundsLineTimeout = setTimeout(IntelligentRoadTest.jugeIsNeedLoadBoundsLineData,IntelligentRoadTest.loadBoundsLineTimeInterval);
                }else{
                    IntelligentRoadTest.lastLoadBoundsMapZoom = IntelligentRoadTest.map.getZoom();
                    IntelligentRoadTest.lastLoadBoundsLineTimeout = setTimeout(IntelligentRoadTest.jugeIsNeedLoadBoundsLineData,IntelligentRoadTest.loadBoundsLineTimeInterval);
                }*/
            } else {
                //还需要看是否需要将高速、高铁、市政路的画线组件的数据清除掉
            }
        }else{
            if(IntelligentRoadTest.roadIndex < 3){
                IntelligentRoadTest.loadLineByLevelFromBounds();
                /*if(IntelligentRoadTest.lastLoadBoundsLineByCenterTimeout != null) {
                    clearTimeout(IntelligentRoadTest.lastLoadBoundsLineByCenterTimeout);
                    IntelligentRoadTest.lastLoadBoundsMapCenter = IntelligentRoadTest.map.getCenter();
                    //延迟时间执行查询
                    IntelligentRoadTest.lastLoadBoundsLineByCenterTimeout = setTimeout(IntelligentRoadTest.jugeIsNeedLoadBoundsLineDataByCenter,IntelligentRoadTest.loadBoundsLineTimeInterval);
                }else{
                    IntelligentRoadTest.lastLoadBoundsMapCenter = IntelligentRoadTest.map.getCenter();
                    IntelligentRoadTest.lastLoadBoundsLineByCenterTimeout = setTimeout(IntelligentRoadTest.jugeIsNeedLoadBoundsLineDataByCenter,IntelligentRoadTest.loadBoundsLineTimeInterval);
                }*/
            }else{

            }
        }
    }

    var centerPoint = IntelligentRoadTest.map.getCenter();
    var district = IntelligentRoadTest.getCenterPointDistrict(centerPoint);
    if (district != null) {
        $('#mapCity').text(district.city);
        $('#mapDistrict').text(district.name);
        if(IntelligentRoadTest.city == "全省"){
            return;
        }
        if(IntelligentRoadTest.cityPermission_common != "全省" && IntelligentRoadTest.cityPermission_common != district.city){
            //地图已经移动到其他地市去了
            return;
        }

        IntelligentRoadTest.searchTxtUpdate();
        /*if (IntelligentRoadTest.cityPermission_common == "全省") {
            //地图拖拽完毕后，将搜索地市进行限制
            // IntelligentRoadTest.localSearch.setLocation(district.city);
            //更新页面中间的区域列表

            $('#mapCity').text(district.city);
            $('#mapDistrict').text(district.name);
            if(IntelligentRoadTest.city == "全省"){
                return;
            }
            IntelligentRoadTest.city = district.city;
            IntelligentRoadTest.district = district.name;
            // IntelligentRoadTest.updateSearchTmpTxt();
            IntelligentRoadTest.searchTxtUpdate();
        } else {
            if (district.city == IntelligentRoadTest.cityPermission_common) {
                $('#mapCity').text(district.city);
                $('#mapDistrict').text(district.name);
                IntelligentRoadTest.city = district.city;
                IntelligentRoadTest.district = district.name;
                // IntelligentRoadTest.updateSearchTmpTxt();
                IntelligentRoadTest.searchTxtUpdate();
            }
        }*/
    }else{
        let myGeo = new BMap.Geocoder();
        myGeo.getLocation(centerPoint, function(rs){
            let addComp = rs.addressComponents;
            if(addComp.province == '广东省'){
                $('#mapCity').text(addComp.city);
                $('#mapDistrict').text(addComp.district);
            }else{
                $('#mapCity').text(addComp.city);
                $('#mapDistrict').text(addComp.district);
            }
        });
    }
}



//地图鼠标移动事件
IntelligentRoadTest.mousemoveEvent = function IntelligentRoadTest_mousemoveEvent(e) {
    // console.log("地图鼠标移动事件");
    if (IntelligentRoadTest.index == 4) {
        if (!IntelligentRoadTest.isShowGrid) {
            var position = e.point;
            var x = e.offsetX;
            var y = e.offsetY;
            if (IntelligentRoadTest.lastPos == null) {
                IntelligentRoadTest.lastPos = position;
            }
            else if (IntelligentRoadTest.lastPos.lng != position.lng && IntelligentRoadTest.lastPos.lat != position.lat) {
                IntelligentRoadTest.lastPos = position;
                if (IntelligentRoadTest.lastMousemove != null) {
                    clearTimeout(IntelligentRoadTest.lastMousemove);
                }
                $('#tip').hide();
            }

            IntelligentRoadTest.lastMousemove = setTimeout(function () {
                IntelligentRoadTest.getPosData(position, x, y, e);
            }, 300);
        }
    }
}


//地图点击事件
IntelligentRoadTest.MapClickEvent = function IntelligentRoadTest_MapClickEvent(e) {
    var clickPoint = e.point;
    //判断是否是区县级用户,如果区县用户点击了该区县轮廓以外的对象则不做任何处理
    /*if(IntelligentRoadTest.countryPermission_common){
        var district = IntelligentRoadTest.getCenterPointDistrict(clickPoint);
        if(district==null||IntelligentRoadTest.countryPermission_common!=district.name){
            return;
        }
    }*/
    // console.log("地图点击事件");
    IntelligentRoadTest.mapClick = true;
    if (IntelligentRoadTest.isSelect) {//正在框选的时候
        return;
    }

    if (IntelligentRoadTest.bmapDistanceTool) {//正在使用测距工具
        if (IntelligentRoadTest.bmapDistanceTool.isUseTool) {
            return;
        }
    }

    if (IntelligentRoadTest.isUseCoordinatePickTool) {//正在使用坐标拾取工具
        return;
    }

    //处于图层编辑和重绘状态时
    if (IntelligentRoadTest_SystemLayerEdit.isEditPolygon || IntelligentRoadTest_SystemLayerEdit.isRedrawPolygon) {
        return;
    }

    //判断是否点击到了TA扇形区域
    if (IntelligentRoadTest.checkIfShowTaSectorMessage() == true) {
        IntelligentRoadTest.checkInWhichTASector(e);
        IntelligentRoadTest.checkInWhichTACircle(e);
    } else {
        if (IntelligentRoadTest.highLightTASectorOption != null) {
            IntelligentRoadTest.highLightTASectorOption.isShow = false;
            IntelligentRoadTest.drawCirCle();
        }

        if (IntelligentRoadTest.highLightTACircleOption != null) {
            IntelligentRoadTest.highLightTACircleOption.isShow = false;
            IntelligentRoadTest.drawCirCle();
        }
    }

//    if(IntelligentRoadTest.isShowNrPoorArea == true){
//        IntelligentRoadTest.isShowNrPoorArea = false;
//        return;
//    }

    //不可以使用覆盖物做判断，否则多边形内的栅格无法点击
//    if(e.overlay!=null){
//    	IntelligentRoadTest.mapClick=false;
//    	return;
//    }

    var clickType = e.target.ze;
    if (clickType != undefined && clickType != null) {
        if (clickType.length > 1) {
            IntelligentRoadTest.mapClick = false;
            return;
        }
    }
    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.myCompOverlayTwo);
    $("#cirTipLeft").hide();


    //隐藏栅格连线
    IntelligentRoadTest.hideGridMrTop5Sector();

    var clickSector = [];
    if (IntelligentRoadTest.isShowSector) {
        clickSector = IntelligentRoadTest.sectorCompent.getSectorPolygonByPoint(clickPoint);
    }

    let click2GSector = [];
    if (IntelligentRoadTest.isShow2GSector) {
        click2GSector = IntelligentRoadTest.sector2GCompent.getSectorPolygonByPoint(clickPoint);
    }

    let clickYDSector = [];
    if (IntelligentRoadTest.isShowYDSector) {
        clickYDSector = IntelligentRoadTest.sectorYDCompent.getSectorPolygonByPoint(clickPoint);
    }

    var clickpoorArea = [];
    var clickPoor = [];
    var clickCovSector = [];
    if (IntelligentRoadTest.isShowPoorArea) {//专题图层是否有图层
        clickpoorArea = IntelligentRoadTest.poorAreaCompent.getSectorPolygonByPoint(clickPoint);//上、下行、mod3弱区、重叠弱区、越区弱区
        clickPoor = IntelligentRoadTest.poorCompent.getSectorPolygonByPoint(clickPoint);//弱区
        clickCovSector = IntelligentRoadTest.covSectorCompent.getSectorPolygonByPoint(clickPoint);//mod3扇区、重叠扇区、越区扇区
    }


    var clickSceneArea = [];
    if (IntelligentRoadTest.isShowSceneArea) {
        clickSceneArea = IntelligentRoadTest.SceneAreaCompent.getSectorPolygonByPoint(clickPoint);
    }

    var clickGrid = [];
    if (IntelligentRoadTest.isShowAreaGrid) {
        //获取栅格对应的数据
        clickGrid = $.grep(IntelligentRoadTest.CanArrArea, function (arr) {
            var minLng = arr[0];
            var minLat = arr[1];
            var maxLng = arr[2];
            var maxLat = arr[3];
            return (minLat <= clickPoint.lat && maxLat >= clickPoint.lat) && (minLng <= clickPoint.lng && maxLng >= clickPoint.lng);
        });
    }

    var clickObjectGrid = [];
    if (IntelligentRoadTest.isShowGrid && !IntelligentRoadTest.isShowDTGrid) {
        /*if(IntelligentRoadTest.isThreeNetStatus){
            //获取栅格对应的数据
            clickObjectGrid = $.grep(IntelligentRoadTest.GridCanArrT, function (arr) {
                var minLng = arr[0];
                var minLat = arr[1];
                var maxLng = arr[2];
                var maxLat = arr[3];
                return (minLat <= clickPoint.lat && maxLat >= clickPoint.lat) && (minLng <= clickPoint.lng && maxLng >= clickPoint.lng);
            });
        }else{*/
        //获取栅格对应的数据
        clickObjectGrid = $.grep(IntelligentRoadTest.CanArr, function (arr) {
            var minLng = arr[0];
            var minLat = arr[1];
            var maxLng = arr[2];
            var maxLat = arr[3];
            return (minLat <= clickPoint.lat && maxLat >= clickPoint.lat) && (minLng <= clickPoint.lng && maxLng >= clickPoint.lng);
        });
//    	}
    }

    var polygonLayer = [];
    if (IntelligentRoadTest.polygonToLayerComponents) {
        polygonLayer = IntelligentRoadTest.polygonToLayerComponents.getSectorPolygonByPoint(clickPoint);
    }
    IntelligentRoadTest.clickResultChe = {
        "sector": clickSector,//扇区
        "poorArea": clickpoorArea,//上、下行、MOD3干扰弱区、越区覆盖弱区、重叠覆盖弱区
        "poor": clickPoor,//弱区
        "covSector": clickCovSector,//MOD3/重叠、越区
        "scene": clickSceneArea,//场景
        "grid": clickGrid,//栅格
        "objectGrid": clickObjectGrid,//对象栅格
        "polygonLayer": polygonLayer,
        'YDSector':clickYDSector, //移动扇区
        '2GSector':click2GSector //2G扇区
    };

    if (clickSector.length + clickCovSector.length + clickpoorArea.length + clickPoor.length + clickSceneArea.length + clickGrid.length + clickObjectGrid.length > 0) {
//    	IntelligentRoadTest.mkIndex=null;
        IntelligentRoadTest.mapObjClick = true;
        for (var i = 0; i < IntelligentRoadTest.polygonList.length; i++) {
            IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.polygonList[i]);
        }
    }
    //如果只匹配到一个结果，则直接进入进行该结果的操作，不需要用户再次点击
    if (clickSector.length + clickCovSector.length + clickpoorArea.length + clickPoor.length + clickSceneArea.length + clickGrid.length + clickObjectGrid.length + polygonLayer.length  + clickYDSector.length + click2GSector.length == 1) {
        //如果站间距的图层存在，则清除图层并将变量置空
        if (IntelligentRoadTest.sectorCircleCanvas != null) {
            IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.sectorCircleCanvas); //清除圆圈
            IntelligentRoadTest.sectorCircleCanvas = null;
        }
        IntelligentRoadTest.cleraAllZhuantiSectorAndLine();
        IntelligentRoadTest.hideCBPoorAreaNrTop5Sector();
        if (clickSector.length == 1) {
            /* IntelligentRoadTest.loadPoorAreaGrid("20180725","757",null,null,1,clickSector[0].statn_id,clickSector[0].cell_id);
             return;*/
            //如果是当前正在查看的扇区，不执行查询
            if (clickSector[0].type == 2) {//室外基站
                var p = clickSector[0].points[0];
                var pointsArr = clickSector[0].points;
                pointsArr.push(p);
                IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(pointsArr, 2, 'sector');//高亮扇区轮廓
            } else {//室内基站
                IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(clickSector[0], 1, 'sector');//高亮扇区轮廓
            }
            IntelligentRoadTestSystemLayerV3.setPoorAreaObj(3);//初始化当前查看的扇区详情页标识
            if (IntelligentRoadTest.index == 3 && IntelligentRoadTest.currentLocation == "sector"
                && IntelligentRoadTest.sectorCompleteVM.sectorData.enodeb_id == clickSector[0].statn_id
                && IntelligentRoadTest.sectorCompleteVM.sectorData.cell_id == clickSector[0].cell_id && IntelligentRoadTest.isClickGrid == false) {
                IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
                return;
            } else if (IntelligentRoadTest.index == 3 && IntelligentRoadTest.currentLocation == "sector"
                && IntelligentRoadTest.sectorCompleteVM.sectorData.enodeb_id == clickSector[0].statn_id
                && IntelligentRoadTest.sectorCompleteVM.sectorData.cell_id == clickSector[0].cell_id && IntelligentRoadTest.isClickGrid == true) {
                IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
                IntelligentRoadTest.isClickGrid = true;
                IntelligentRoadTest.getSectorMessageById(clickSector[0].statn_id, clickSector[0].cell_id, IntelligentRoadTest.day);//跳转到扇区详情页
            } else {
                IntelligentRoadTest.getSectorMessageById(clickSector[0].statn_id, clickSector[0].cell_id, IntelligentRoadTest.day);//跳转到扇区详情页
            }

        } else if (clickCovSector.length == 1) {
            //如果是当前正在查看的MOD3/越区/重叠，不执行查询
            if (clickCovSector[0].type == 2) {//室外基站
                var p = clickCovSector[0].points[0];
                var pointsArr = clickCovSector[0].points;
                pointsArr.push(p);
                IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(pointsArr, 2, 'sector');//高亮多边形
            } else {//室内基站
                IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(clickCovSector[0], 1, 'sector');//高亮多边形
            }
            //跳转到越区、mod3、重叠的详情页数据
            var clickCovObj = IntelligentRoadTestSystemLayerV3.poorArea[clickCovSector[0].scene];
            IntelligentRoadTestSystemLayerV3.setPoorAreaObj(clickCovObj.index);//初始化当前查看的专题扇区详情页标识
            if (IntelligentRoadTest.index == clickCovObj.index && IntelligentRoadTest.currentLocation == clickCovSector[0].scene
                && IntelligentRoadTest.sectorCompleteVM.sectorData.enodeb_id == clickCovSector[0].statn_id
                && IntelligentRoadTest.sectorCompleteVM.sectorData.cell_id == clickCovSector[0].cell_id && IntelligentRoadTest.isClickGrid == false) {
                IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);//当前正在查看专题扇区详情页，不需要跳转
                return;
            } else if (IntelligentRoadTest.index == clickCovObj.index && IntelligentRoadTest.currentLocation == clickCovSector[0].scene
                && IntelligentRoadTest.sectorCompleteVM.sectorData.enodeb_id == clickCovSector[0].statn_id
                && IntelligentRoadTest.sectorCompleteVM.sectorData.cell_id == clickCovSector[0].cell_id && IntelligentRoadTest.isClickGrid == true) {
                IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
                IntelligentRoadTest.isClickGrid = true;
                IntelligentRoadTest.getSectorMessageById(clickCovSector[0].statn_id, clickCovSector[0].cell_id, IntelligentRoadTest.day);
            } else {
                IntelligentRoadTest.getSectorMessageById(clickCovSector[0].statn_id, clickCovSector[0].cell_id, IntelligentRoadTest.day);
            }

        } else if (clickpoorArea.length == 1 || clickPoor.length == 1) {
            var clickpoorArray = clickpoorArea;
            if (clickPoor.length == 1) {
                clickpoorArray = clickPoor;
            }
            //如果是当前正在查看的弱区，不执行查询
            var clickpoorAreaObj = IntelligentRoadTestSystemLayerV3.poorArea[clickpoorArray[0].scene];
            IntelligentRoadTestSystemLayerV3.setPoorAreaObj(clickpoorAreaObj.index);
            if (IntelligentRoadTest.index == clickpoorAreaObj.index && IntelligentRoadTest.currentLocation == clickpoorArray[0].scene
                && IntelligentRoadTest.rfgCompleteVM.poorAreaData.object_id == clickpoorArray[0].object_id && IntelligentRoadTest.isClickGrid == false) {
                IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
                return;
            } else if (IntelligentRoadTest.index == clickpoorAreaObj.index && IntelligentRoadTest.currentLocation == clickpoorArray[0].scene
                && IntelligentRoadTest.rfgCompleteVM.poorAreaData.object_id == clickpoorArray[0].object_id && IntelligentRoadTest.isClickGrid == true) {
                IntelligentRoadTest.isClickGrid = false;
                //弱区点击，呈现栅格,跳转到详细信息
                IntelligentRoadTest.getPoorAreaMessageById(clickpoorArray[0].object_id, IntelligentRoadTest.day);
            } else {
                //弱区点击，呈现栅格,跳转到详细信息
                IntelligentRoadTest.getPoorAreaMessageById(clickpoorArray[0].object_id, IntelligentRoadTest.day);
            }

        } else if (clickSceneArea.length == 1) {
            if (IntelligentRoadTest.showSceneAreaId == "concern") {
                //如果是当前正在查看的关注区域，不执行查询
                if (IntelligentRoadTest.index == 1 && IntelligentRoadTest.currentLocation == "concern"
                    && IntelligentRoadTest.concernAreaCompleteVM.concernAreaData.id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == false) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 1 && IntelligentRoadTest.currentLocation == "concern"
                    && IntelligentRoadTest.concernAreaCompleteVM.concernAreaData.id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getConcernAreaMessageById(clickSceneArea[0].id);
                    // IntelligentRoadTest.index = 1;
                } else {
                    //关注区域点击，呈现栅格,需要跳转到详细页
                    IntelligentRoadTest.getConcernAreaMessageById(clickSceneArea[0].id);
                }
            }
            if (IntelligentRoadTest.showSceneAreaId == "bone") {
                //如果是当前正在查看的骨头区域，不执行查询
                if (IntelligentRoadTest.index == 5 && IntelligentRoadTest.currentLocation == "boneArea"
                    && IntelligentRoadTest.boneAreaCompleteVM.boneAreaData.id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 5 && IntelligentRoadTest.currentLocation == "boneArea"
                    && IntelligentRoadTest.boneAreaCompleteVM.boneAreaData.id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getBoneAreaMessageById(clickSceneArea[0].id);
                } else {
                    //骨头区域点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getBoneAreaMessageById(clickSceneArea[0].id);
                }
            }

            if (IntelligentRoadTest.showSceneAreaId == "highColleges") {
                //如果是当前正在查看的高校，不执行查询
                if (IntelligentRoadTest.index == 10 && IntelligentRoadTest.currentLocation == "college"
                    && IntelligentRoadTest.collegeCompleteVM.collegeData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 10 && IntelligentRoadTest.currentLocation == "college"
                    && IntelligentRoadTest.collegeCompleteVM.collegeData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(1, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');//表示通过地图图层点击过去
                } else {
                    //高校点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(1, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                }
            }
            if (IntelligentRoadTest.showSceneAreaId == "venues") {
                //如果是当前正在查看的场馆，不执行查询
                if (IntelligentRoadTest.index == 19 && IntelligentRoadTest.currentLocation == "site"
                    && IntelligentRoadTest.siteCompleteVM.siteData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 19 && IntelligentRoadTest.currentLocation == "site"
                    && IntelligentRoadTest.siteCompleteVM.siteData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(10, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                } else {
                    //场馆点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(10, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                }
            }
            if (IntelligentRoadTest.showSceneAreaId == "beautyFood") {
                //如果是当前正在查看的美食，不执行查询
                if (IntelligentRoadTest.index == 18 && IntelligentRoadTest.currentLocation == "food"
                    && IntelligentRoadTest.foodCompleteVM.foodData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 18 && IntelligentRoadTest.currentLocation == "food"
                    && IntelligentRoadTest.foodCompleteVM.foodData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(9, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                } else {
                    //美食点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(9, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                }
            }
            if (IntelligentRoadTest.showSceneAreaId == "beautyScenery") {
                //如果是当前正在查看的美景，不执行查询
                if (IntelligentRoadTest.index == 12 && IntelligentRoadTest.currentLocation == "scenery"
                    && IntelligentRoadTest.sceneryCompleteVM.sceneryData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 12 && IntelligentRoadTest.currentLocation == "scenery"
                    && IntelligentRoadTest.sceneryCompleteVM.sceneryData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(7, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                } else {
                    //美景点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(7, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                }
            }
            if (IntelligentRoadTest.showSceneAreaId == "wolfArea") {
                //如果是当前正在查看的战狼区域，不执行查询
                if (IntelligentRoadTest.index == 16 && IntelligentRoadTest.currentLocation == "warwolf"
                    && IntelligentRoadTest.warwolfCompleteVM.warwolfData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 16 && IntelligentRoadTest.currentLocation == "warwolf"
                    && IntelligentRoadTest.warwolfCompleteVM.warwolfData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(3, clickSceneArea[0].id, IntelligentRoadTest.day, 'map', true);
                } else {
                    //战狼区域点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(3, clickSceneArea[0].id, IntelligentRoadTest.day, 'map', true);
                }
            }
            if (IntelligentRoadTest.showSceneAreaId == "farmerMarket") {
                //如果是当前正在查看的农贸市场，不执行查询
                if (IntelligentRoadTest.index == 17 && IntelligentRoadTest.currentLocation == "market"
                    && IntelligentRoadTest.marketCompleteVM.marketData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 17 && IntelligentRoadTest.currentLocation == "market"
                    && IntelligentRoadTest.marketCompleteVM.marketData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(8, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                } else {
                    //农贸市场点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(8, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                }
            }
            if (IntelligentRoadTest.showSceneAreaId == "highResidence") {
                //如果是当前正在查看的高密度住宅区，不执行查询
                if (IntelligentRoadTest.index == 9 && IntelligentRoadTest.currentLocation == "uptown"
                    && IntelligentRoadTest.uptownCompleteVM.uptownData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 9 && IntelligentRoadTest.currentLocation == "uptown"
                    && IntelligentRoadTest.uptownCompleteVM.uptownData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(2, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                } else {
                    //高密度住宅区点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(2, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                }
            }
            if (IntelligentRoadTest.showSceneAreaId == "highBusiness") {
                //如果是当前正在查看的高流量商务区，不执行查询
                if (IntelligentRoadTest.index == 11 && IntelligentRoadTest.currentLocation == "business"
                    && IntelligentRoadTest.businessCompleteVM.businessData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 11 && IntelligentRoadTest.currentLocation == "business"
                    && IntelligentRoadTest.businessCompleteVM.businessData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(3, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                } else {
                    //高流量商务区点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(3, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                }
            }
            if (IntelligentRoadTest.showSceneAreaId == "cityVillage") {
                //如果是当前正在查看的城中村，不执行查询
                if (IntelligentRoadTest.index == 21 && IntelligentRoadTest.currentLocation == "cityVillage"
                    && IntelligentRoadTest.senseCompleteVM.senseData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 21 && IntelligentRoadTest.currentLocation == "cityVillage"
                    && IntelligentRoadTest.senseCompleteVM.senseData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(12, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                } else {
                    //城中村点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(12, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                }
            }
            if (IntelligentRoadTest.showSceneAreaId == "school") {
                //如果是当前正在查看的中小学，不执行查询
                if (IntelligentRoadTest.index == 20 && IntelligentRoadTest.currentLocation == "school"
                    && IntelligentRoadTest.senseCompleteVM.senseData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 20 && IntelligentRoadTest.currentLocation == "school"
                    && IntelligentRoadTest.senseCompleteVM.senseData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(11, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                } else {
                    //中小学点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(11, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                }
            }
            if (IntelligentRoadTest.showSceneAreaId == "village") {
                //如果是当前正在查看的自然村，不执行查询
                if (IntelligentRoadTest.index == 22 && IntelligentRoadTest.currentLocation == "village"
                    && IntelligentRoadTest.senseCompleteVM.senseData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 22 && IntelligentRoadTest.currentLocation == "village"
                    && IntelligentRoadTest.senseCompleteVM.senseData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(13, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                } else {
                    //自然村点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(13, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                }
            }
            if (IntelligentRoadTest.showSceneAreaId == "factory") {
                //如果是当前正在查看的工厂，不执行查询
                if (IntelligentRoadTest.index == 23 && IntelligentRoadTest.currentLocation == "factory"
                    && IntelligentRoadTest.senseCompleteVM.senseData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 23 && IntelligentRoadTest.currentLocation == "factory"
                    && IntelligentRoadTest.senseCompleteVM.senseData.esbh_id == clickSceneArea[0].id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(14, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                } else {
                    //工厂点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(14, clickSceneArea[0].id, IntelligentRoadTest.day, 'map');
                }
            }


        } else if (clickGrid.length == 1) {
            var maxLng = clickGrid[0][2];
            var maxLat = clickGrid[0][3];
            var minLng = clickGrid[0][0];
            var minLat = clickGrid[0][1];
            var midLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2;
            var midLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2;
            var centerPoint = new BMap.Point(midLng, midLat);
            // IntelligentRoadTest.showGridMrNrTop5CellForMap(centerPoint,clickGrid[0][7]);//centerPoint,sector_set
            var points = [
                new BMap.Point(minLng, minLat),
                new BMap.Point(maxLng, minLat),
                new BMap.Point(maxLng, maxLat),
                new BMap.Point(minLng, maxLat),
                new BMap.Point(minLng, minLat)];
            IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(points, 2, 'grid');
            if (IntelligentRoadTest.isClickGrid && IntelligentRoadTest.gridVM.gridData.grid_id == clickGrid[0][5]) {
                IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
                return;
            } else {
                IntelligentRoadTest.getGridDataByGridId(clickGrid[0]);//获取栅格的详细数据
                IntelligentRoadTest.getSeventDayDataByGridId(clickGrid[0][5]);//获取栅格历史7天的覆盖率
                IntelligentRoadTest.goGridCompleteMessage();
            }

        } else if (clickObjectGrid.length == 1) {

            var maxLng = clickObjectGrid[0][2];
            var maxLat = clickObjectGrid[0][3];
            var minLng = clickObjectGrid[0][0];
            var minLat = clickObjectGrid[0][1];
            var midLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2;
            var midLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2;
            var centerPoint = new BMap.Point(midLng, midLat);
            // IntelligentRoadTest.showGridMrNrTop5CellForMap(centerPoint,clickObjectGrid[0][7]);//centerPoint,sector_set
            var points = [
                new BMap.Point(minLng, minLat),
                new BMap.Point(maxLng, minLat),
                new BMap.Point(maxLng, maxLat),
                new BMap.Point(minLng, maxLat),
                new BMap.Point(minLng, minLat)];
            IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(points, 2, 'grid');

            if(IntelligentRoadTest.gridTypeIndex==6){
                //2G栅格需要显示该栅格信息
                let gridInfo = [
                        {key:'栅格编号',val:clickObjectGrid[0][5]},
                        {key:'EC/IO平均值',val:parseFloat(clickObjectGrid[0][4]).toFixed(2)},
                ]
                IntelligentRoadTest.openInfoWindowTwo(centerPoint.lng,centerPoint.lat,gridInfo);
                return;
            }
            if (IntelligentRoadTest.isClickGrid && IntelligentRoadTest.gridVM.gridData.grid_id == clickObjectGrid[0][5]) {
                IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
                return;
            } else {
                IntelligentRoadTest.goGridCompleteMessage();
                IntelligentRoadTest.getGridDataByGridId(clickObjectGrid[0]);//获取栅格的详细数据
                IntelligentRoadTest.getSeventDayDataByGridId(clickObjectGrid[0][5]);//获取栅格历史7天的覆盖率

            }

        } else if (polygonLayer.length == 1) {
            if (polygonLayer[0].obj_type == "concern") {
                //如果是当前正在查看的关注区域，不执行查询
                if (IntelligentRoadTest.index == 1 && IntelligentRoadTest.currentLocation == "concern"
                    && IntelligentRoadTest.concernAreaCompleteVM.concernAreaData.id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == false) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 1 && IntelligentRoadTest.currentLocation == "concern"
                    && IntelligentRoadTest.concernAreaCompleteVM.concernAreaData.id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getConcernAreaMessageById(polygonLayer[0].obj_id);
                } else {
                    //关注区域点击，呈现栅格,需要跳转到详细页
                    IntelligentRoadTest.getConcernAreaMessageById(polygonLayer[0].obj_id);
                }
            }

            if (polygonLayer[0].obj_type == "boneArea") {
                //如果是当前正在查看的骨头区域，不执行查询
                if (IntelligentRoadTest.index == 5 && IntelligentRoadTest.currentLocation == "boneArea"
                    && IntelligentRoadTest.boneAreaCompleteVM.boneAreaData.id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 5 && IntelligentRoadTest.currentLocation == "boneArea"
                    && IntelligentRoadTest.boneAreaCompleteVM.boneAreaData.id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getBoneAreaMessageById(polygonLayer[0].obj_id);
                    // IntelligentRoadTest.index =  5;
                } else {
                    //骨头区域点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getBoneAreaMessageById(polygonLayer[0].obj_id);
                }
            }

            if (polygonLayer[0].obj_type == "college") {
                //如果是当前正在查看的高校，不执行查询
                if (IntelligentRoadTest.index == 10 && IntelligentRoadTest.currentLocation == "college"
                    && IntelligentRoadTest.collegeCompleteVM.collegeData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 10 && IntelligentRoadTest.currentLocation == "college"
                    && IntelligentRoadTest.collegeCompleteVM.collegeData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(1, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');//表示通过地图图层点击过去
                } else {
                    //高校点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(1, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                }
            }

            if (polygonLayer[0].obj_type == "site") {
                //如果是当前正在查看的场馆，不执行查询
                if (IntelligentRoadTest.index == 19 && IntelligentRoadTest.currentLocation == "site"
                    && IntelligentRoadTest.siteCompleteVM.siteData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 19 && IntelligentRoadTest.currentLocation == "site"
                    && IntelligentRoadTest.siteCompleteVM.siteData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(10, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                } else {
                    //场馆点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(10, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                }
            }

            if (polygonLayer[0].obj_type == "food") {
                //如果是当前正在查看的美食，不执行查询
                if (IntelligentRoadTest.index == 18 && IntelligentRoadTest.currentLocation == "food"
                    && IntelligentRoadTest.foodCompleteVM.foodData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 18 && IntelligentRoadTest.currentLocation == "food"
                    && IntelligentRoadTest.foodCompleteVM.foodData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(9, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                } else {
                    //美食点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(9, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                }
            }

            if (polygonLayer[0].obj_type == "scenery") {
                //如果是当前正在查看的美景，不执行查询
                if (IntelligentRoadTest.index == 12 && IntelligentRoadTest.currentLocation == "scenery"
                    && IntelligentRoadTest.sceneryCompleteVM.sceneryData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 12 && IntelligentRoadTest.currentLocation == "scenery"
                    && IntelligentRoadTest.sceneryCompleteVM.sceneryData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(7, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                } else {
                    //美景点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(7, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                }
            }

            if (polygonLayer[0].obj_type == "warwolf") {
                //如果是当前正在查看的战狼区域，不执行查询
                if (IntelligentRoadTest.index == 16 && IntelligentRoadTest.currentLocation == "warwolf"
                    && IntelligentRoadTest.warwolfCompleteVM.warwolfData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 16 && IntelligentRoadTest.currentLocation == "warwolf"
                    && IntelligentRoadTest.warwolfCompleteVM.warwolfData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(3, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map', true);
                } else {
                    //战狼区域点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(3, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map', true);
                }
            }

            if (polygonLayer[0].obj_type == "market") {
                //如果是当前正在查看的农贸市场，不执行查询
                if (IntelligentRoadTest.index == 17 && IntelligentRoadTest.currentLocation == "market"
                    && IntelligentRoadTest.marketCompleteVM.marketData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 17 && IntelligentRoadTest.currentLocation == "market"
                    && IntelligentRoadTest.marketCompleteVM.marketData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(8, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                } else {
                    //农贸市场点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(8, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                }
            }

            if (polygonLayer[0].obj_type == "uptown") {
                //如果是当前正在查看的高密度住宅区，不执行查询
                if (IntelligentRoadTest.index == 9 && IntelligentRoadTest.currentLocation == "uptown"
                    && IntelligentRoadTest.uptownCompleteVM.uptownData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 9 && IntelligentRoadTest.currentLocation == "uptown"
                    && IntelligentRoadTest.uptownCompleteVM.uptownData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(2, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                } else {
                    //高密度住宅区点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(2, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                }
            }

            if (polygonLayer[0].obj_type == "business") {
                //如果是当前正在查看的高流量商务区，不执行查询
                if (IntelligentRoadTest.index == 11 && IntelligentRoadTest.currentLocation == "business"
                    && IntelligentRoadTest.businessCompleteVM.businessData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 11 && IntelligentRoadTest.currentLocation == "business"
                    && IntelligentRoadTest.businessCompleteVM.businessData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(3, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                } else {
                    //高流量商务区点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(3, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                }
            }

            if (polygonLayer[0].obj_type == "cityVillage") {
                //如果是当前正在查看的城中村，不执行查询
                if (IntelligentRoadTest.index == 21 && IntelligentRoadTest.currentLocation == "cityVillage"
                    && IntelligentRoadTest.businessCompleteVM.businessData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 21 && IntelligentRoadTest.currentLocation == "cityVillage"
                    && IntelligentRoadTest.businessCompleteVM.businessData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(12, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                } else {
                    //城中村点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(12, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                }
            }

            if (polygonLayer[0].obj_type == "school") {
                //如果是当前正在查看的中小学，不执行查询
                if (IntelligentRoadTest.index == 20 && IntelligentRoadTest.currentLocation == "school"
                    && IntelligentRoadTest.businessCompleteVM.businessData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 20 && IntelligentRoadTest.currentLocation == "school"
                    && IntelligentRoadTest.businessCompleteVM.businessData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(11, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                } else {
                    //中小学点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(11, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                }
            }

            if (polygonLayer[0].obj_type == "village") {
                //如果是当前正在查看的自然村，不执行查询
                if (IntelligentRoadTest.index == 22 && IntelligentRoadTest.currentLocation == "village"
                    && IntelligentRoadTest.senseCompleteVM.senseData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 22 && IntelligentRoadTest.currentLocation == "village"
                    && IntelligentRoadTest.senseCompleteVM.senseData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(13, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                } else {
                    //自然村点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(13, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                }
            }
            if (polygonLayer[0].obj_type == "factory") {
                //如果是当前正在查看的工厂，不执行查询
                if (IntelligentRoadTest.index == 23 && IntelligentRoadTest.currentLocation == "factory"
                    && IntelligentRoadTest.senseCompleteVM.senseData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    return;
                } else if (IntelligentRoadTest.index == 23 && IntelligentRoadTest.currentLocation == "factory"
                    && IntelligentRoadTest.senseCompleteVM.senseData.esbh_id == polygonLayer[0].obj_id
                    && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
                    IntelligentRoadTest.isClickGrid = false;
                    IntelligentRoadTest.getSenseDataByESBHID(14, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                } else {
                    //工厂点击，呈现栅格，需要跳转到详细页
                    IntelligentRoadTest.getSenseDataByESBHID(14, polygonLayer[0].obj_id, IntelligentRoadTest.day, 'map');
                }
            }

            if (polygonLayer[0].obj_type == "sector" /*||polygonLayer[0].obj_type=='m3Sector'
                ||polygonLayer[0].obj_type=='olSector'||polygonLayer[0].obj_type=='cbSector'*/) {
                //由于扇区已经绑定了事件，因此这里不需要出发进入详情页
                return;
                //如果是当前正在查看的扇区，不执行查询
                if (polygonLayer[0].type == 2) {//室外基站
                    var p = polygonLayer[0].points[0];
                    var pointsArr = polygonLayer[0].points;
                    pointsArr.push(p);
                    IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(pointsArr, 2, 'sector');
                } else {//室内基站
                    IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(polygonLayer[0], 1, 'sector');
                }
                var sceneString = polygonLayer[0].obj_type;
                var clickSectorObj = IntelligentRoadTestSystemLayerV3.poorArea[sceneString];
                if (IntelligentRoadTest.index == clickSectorObj.index && IntelligentRoadTest.currentLocation == sceneString
                    && IntelligentRoadTest.sectorCompleteVM.sectorData.enodeb_id == polygonLayer[0].statn_id
                    && IntelligentRoadTest.sectorCompleteVM.sectorData.cell_id == polygonLayer[0].cell_id && IntelligentRoadTest.isClickGrid == false) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
                    return;
                } else if (IntelligentRoadTest.index == clickSectorObj.index && IntelligentRoadTest.currentLocation == sceneString
                    && IntelligentRoadTest.sectorCompleteVM.sectorData.enodeb_id == polygonLayer[0].statn_id
                    && IntelligentRoadTest.sectorCompleteVM.sectorData.cell_id == polygonLayer[0].cell_id && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
                    IntelligentRoadTest.isClickGrid = true;
                    IntelligentRoadTest.getSectorMessageById(polygonLayer[0].statn_id, polygonLayer[0].cell_id, IntelligentRoadTest.day);
                } else {
                    IntelligentRoadTest.getSectorMessageById(polygonLayer[0].statn_id, polygonLayer[0].cell_id, IntelligentRoadTest.day);
                }
            }
            if (polygonLayer[0].obj_type == 'm3Sector' || polygonLayer[0].obj_type == 'olSector' || polygonLayer[0].obj_type == 'cbSector') {
                //如果是当前正在查看的扇区，不执行查询
                if (polygonLayer[0].type == 2) {//室外基站
                    var p = polygonLayer[0].points[0];
                    var pointsArr = polygonLayer[0].points;
                    pointsArr.push(p);
                    IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(pointsArr, 2, 'sector');
                } else {//室内基站
                    IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(polygonLayer[0], 1, 'sector');
                }
                var sceneString = polygonLayer[0].obj_type;
                var clickSectorObj = IntelligentRoadTestSystemLayerV3.poorArea[sceneString];
                if (IntelligentRoadTest.index == clickSectorObj.index && IntelligentRoadTest.currentLocation == sceneString
                    && IntelligentRoadTest.sectorCompleteVM.sectorData.enodeb_id == polygonLayer[0].statn_id
                    && IntelligentRoadTest.sectorCompleteVM.sectorData.cell_id == polygonLayer[0].cell_id && IntelligentRoadTest.isClickGrid == false) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
                    return;
                } else if (IntelligentRoadTest.index == clickSectorObj.index && IntelligentRoadTest.currentLocation == sceneString
                    && IntelligentRoadTest.sectorCompleteVM.sectorData.enodeb_id == polygonLayer[0].statn_id
                    && IntelligentRoadTest.sectorCompleteVM.sectorData.cell_id == polygonLayer[0].cell_id && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
                    IntelligentRoadTest.isClickGrid = true;
                    IntelligentRoadTest.getSectorMessageById(polygonLayer[0].statn_id, polygonLayer[0].cell_id, IntelligentRoadTest.day);
                } else {
                    IntelligentRoadTest.getSectorMessageById(polygonLayer[0].statn_id, polygonLayer[0].cell_id, IntelligentRoadTest.day);
                }
            }

            if (polygonLayer[0].obj_type == "poorArea" || polygonLayer[0].obj_type == 'upPoorArea'
                || polygonLayer[0].obj_type == 'dwPoorArea' || polygonLayer[0].obj_type == 'm3Sector'
                || polygonLayer[0].obj_type == 'olSector' || polygonLayer[0].obj_type == 'cbSector') {//是否会出现不同天，但弱区编号是一样的情况？待处理
                var sceneString = polygonLayer[0].obj_type;
                if (polygonLayer[0].obj_type == "poorArea") {
                    sceneString = "poor";
                }
                //如果是当前正在查看的弱区，不执行查询
                var clickpoorAreaObj = IntelligentRoadTestSystemLayerV3.poorArea[sceneString];
                IntelligentRoadTestSystemLayerV3.setPoorAreaObj(clickpoorAreaObj.index);
                if (IntelligentRoadTest.index == clickpoorAreaObj.index && IntelligentRoadTest.currentLocation == polygonLayer[0].obj_type
                    && IntelligentRoadTest.rfgCompleteVM.poorAreaData.object_id == polygonLayer[0].obj_id && IntelligentRoadTest.isClickGrid == false) {
                    IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
                    return;
                } else if (IntelligentRoadTest.index == clickpoorAreaObj.index && IntelligentRoadTest.currentLocation == polygonLayer[0].obj_type
                    && IntelligentRoadTest.rfgCompleteVM.poorAreaData.object_id == polygonLayer[0].obj_id && IntelligentRoadTest.isClickGrid == true) {
                    IntelligentRoadTest.isClickGrid = false;
                    //弱区点击，呈现栅格,跳转到详细信息
                    IntelligentRoadTest.getPoorAreaMessageById(polygonLayer[0].obj_id, IntelligentRoadTest.day);
                } else {
                    //弱区点击，呈现栅格,跳转到详细信息
                    IntelligentRoadTest.getPoorAreaMessageById(polygonLayer[0].obj_id, IntelligentRoadTest.day);
                }
            }
            if (polygonLayer[0].signs == "addComplainHot" || polygonLayer[0].signs == "addUserComplain") {
                //跳转到【用户抱怨】图层详情页 || 跳转到【抱怨热点】栅格详情页
                if (IntelligentRoadTest.index == 29 && IntelligentRoadTest.currentLocation == "userComplain"
                    && IntelligentRoadTest.userComplainCompleteVM.userComplain.workorder_id == polygonLayer[0].id) {
                    console.log("已经在工单或抱怨热点详情页");
                    return;
                } else {
                    if (IntelligentRoadTest.userComplainVM == null) {
                        IntelligentRoadTest.dealQueryAllUserComplain([]);
                        IntelligentRoadTest.userComplainVM.showMessage(polygonLayer[0].val, null);
                    } else {
                        IntelligentRoadTest.userComplainVM.showMessage(polygonLayer[0].val, null);
                    }
                    IntelligentRoadTest.index = 29;
                }
            }

            if (polygonLayer[0].obj_type == "poorAreaDashed") {//虚线框弱区，暂时不包含分屏对比中的虚线弱区，只做工单中的虚线弱区
                if (!polygonLayer[0].isDashLine) {//是虚框的时候，说明当前的弱区虚框不是生成的时间
                    IntelligentRoadTest.getPoorAreaMessageById(polygonLayer[0].obj_id, IntelligentRoadTest.day, true);
                } else {
                    var obj = {};
                    obj.overlay = {};
                    obj.overlay = new BMap.Polygon(polygonLayer[0].points);
//                    var obj = IntelligentRoadTest.getBaiduPolygonObj(poorAreaData.gis_data);
                    IntelligentRoadTest.overlaycomplete(obj, false);
                    IntelligentRoadTest.goSaveAreaCompleteMessage();
                }
            }

            if (polygonLayer[0].obj_type == "boxSelect") {//自定义框选，点击时，需要进入框选详情页
                if (IntelligentRoadTest.SelectionE) {
                    IntelligentRoadTest.overlaycomplete(IntelligentRoadTest.SelectionE, false);
                }
                if (IntelligentRoadTest.SelectionOverlay) {
                    IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.SelectionOverlay);
                }
            }
        }else if(clickYDSector.length == 1){
            let ydSectorPoint = clickYDSector[0].cen_point;
            let ydSectorInfo = [
                {key:'基站名',val:clickYDSector[0].name},
                {key:'频段类型',val:clickYDSector[0].bandtype},
                {key:'覆盖类型',val:clickYDSector[0].coveragetype}
            ]
            IntelligentRoadTest.openInfoWindowTwo(ydSectorPoint.lng,ydSectorPoint.lat,ydSectorInfo);

           //console.log('显示移动站点信息');
        }else if(click2GSector.length == 1){
            //显示该2G站点的信息
            let sector2GObj = click2GSector[0]
            //console.log('2G扇区信息',sector2GObj);
            IntelligentRoadTestSystemLayerV3.query2GSectorInfo(sector2GObj);
        }

        $('.packList').attr("title", "收起列表");
        $('.packList').children().addClass('rotatePackImg');
        $('.packList').children().attr("src", "../js/IntelligentRoadTestV3/images/pack_top.png");

        $(".listDiv .detailList").each(function () {
            if ($(this).is(":visible")) {
                $(this).slideUp();
                $(this).slideDown();
            }
        });

        IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
        return;
    }

    var clickResultStr = '';
    if (clickSector.length > 0) {
        IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
        for (var i = 0; i < clickSector.length; i++) {
            var clickid = clickSector[i].statn_id + '_' + clickSector[i].cell_id;
            clickResultStr += '<li type="sector" clickid="' + clickid + '"><span></span><span >' + clickSector[i].statn_id + '_' + clickSector[i].cell_id + '</span><span>扇区</span></li>';
        }
    }

    if (clickYDSector.length > 0) {
        IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
        for (let i = 0; i < clickYDSector.length; i++) {
            let clickid = clickYDSector[i].obj_id;
            clickResultStr += '<li type="YDSector" clickid="' + clickid + '"><span></span><span >' + clickYDSector[i].name + '</span><span>移动站点</span></li>';
        }
    }

    if (click2GSector.length > 0) {
        IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
        //console.log('2G扇区信息列表',click2GSector);
        for (let i = 0; i < click2GSector.length; i++) {
            let clickid = `${click2GSector[i].bsc_id}_${click2GSector[i].statn_id}_${click2GSector[i].sector_id}_${click2GSector[i].city_id}`;
            clickResultStr += '<li type="2GSector" clickid="' + clickid + '"><span></span><span >' + clickid + '</span><span>2G扇区</span></li>';
        }
    }

    if (clickCovSector.length > 0) {//匹配到多个专题扇区
        IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
        for (var i = 0; i < clickCovSector.length; i++) {
            var clickid = clickCovSector[i].statn_id + '_' + clickCovSector[i].cell_id;
            var clickCovObj = IntelligentRoadTestSystemLayerV3.poorArea[clickCovSector[i].scene];
            var lable = clickCovObj.name;
            clickResultStr += '<li name="' + clickCovSector[i].scene + '" type="covSector" clickid="' + clickid + '"><span></span><span >' + clickCovSector[i].statn_id + '_' + clickCovSector[i].cell_id + '</span><span>' + lable + '</span></li>';
        }
    }

    if (clickpoorArea.length > 0) {
        IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
        for (var i = 0; i < clickpoorArea.length; i++) {
            //  // var plyM = {type:2,points:pointArr,decide:1,object_id:object_id};
            var clickid = clickpoorArea[i].object_id;
            var clickpoorAreaObj = IntelligentRoadTestSystemLayerV3.poorArea[clickpoorArea[i].scene];
            var lable = clickpoorAreaObj.name;
            clickResultStr += '<li name="' + clickpoorArea[i].scene + '" type="poorArea" clickid="' + clickid + '"><span></span><span>' + clickpoorArea[i].object_id + '</span><span>' + lable + '</span></li>';
        }
    }

    if (clickPoor.length > 0) {
        IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
        for (var i = 0; i < clickPoor.length; i++) {
            //  // var plyM = {type:2,points:pointArr,decide:1,object_id:object_id};
            var clickid = clickPoor[i].object_id;
            var clickpoorAreaObj = IntelligentRoadTestSystemLayerV3.poorArea[clickPoor[i].scene];
            var lable = clickpoorAreaObj.name;
            clickResultStr += '<li name="' + clickPoor[i].scene + '" type="poor" clickid="' + clickid + '"><span></span><span>' + clickPoor[i].object_id + '</span><span>' + lable + '</span></li>';
        }
    }

    if (clickSceneArea.length > 0) {
        IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
        var clickIds = [];
        for (var i = 0; i < clickSceneArea.length; i++) {
            var flag = true;
            var clickid = clickSceneArea[i].id;
            var lable = IntelligentRoadTestScreenCompared.getObjTypeByString(clickSceneArea[i].scene);
            for (var k = 0; k < clickIds.length; k++) {
                if (clickid == clickIds[k]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                clickIds.push(clickid);
                //var plyM = {type:2,points:pointArr,decide:1,id:id,name:name,scene:scene};
                clickResultStr += '<li name="' + clickSceneArea[i].scene + '" type="scene" clickid="' + clickid + '"><span>' + clickSceneArea[i].name + '</span><span>' + clickSceneArea[i].id + '</span><span>' + lable + '</span></li>';
            }
        }
    }

    if (clickGrid.length > 0) {
        IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
        for (var i = 0; i < clickGrid.length; i++) {
            //var dataChe = [minLng,minLat,maxLng,maxLat,rsrp_avg,grid_num,agps_count,sector_set,
            // dxrsrpAvg,rsrp_avgM,rsrp_avgU,monthrelate,dx_cover,yd_cover,lt_cover];
            var clickid = clickGrid[i][5];
            clickResultStr += '<li type="grid" clickid="' + clickid + '"><span></span><span>' + clickGrid[i][5] + '</span><span>弱区栅格</span></li>';
        }
    }

    if (clickObjectGrid.length > 0) {
        IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', true);
        for (var i = 0; i < clickObjectGrid.length; i++) {
            //var dataChe = [minLng,minLat,maxLng,maxLat,rsrp_avg,grid_num,agps_count,sector_set,
            // dxrsrpAvg,rsrp_avgM,rsrp_avgU,monthrelate,dx_cover,yd_cover,lt_cover];
            var clickid = clickObjectGrid[i][5];
            clickResultStr += '<li type="objectGrid" clickid="' + clickid + '"><span></span><span>' + clickObjectGrid[i][5] + '</span><span>对象栅格</span></li>';
        }
    }

    if (polygonLayer.length > 0) {
        IntelligentRoadTest.searchShowMkLable(e.point.lng, e.point.lat, '', 3);
        var clickIds = [];
        for (var i = 0; i < polygonLayer.length; i++) {
            var lable = IntelligentRoadTestScreenCompared.getObjTypeByString(polygonLayer[i].obj_type);
            if (polygonLayer[i].obj_type == 'sector') {
                var polygonLayersSectorHasAdd = false;//当前的这个扇区是否已经在扇区图层添加了点击命中
                for (var j = 0; j < clickSector.length; j++) {
                    if (polygonLayer[i].statn_id == clickSector[j].statn_id && polygonLayer[i].cell_id == clickSector[j].cell_id) {
                        polygonLayersSectorHasAdd = true;
                    }
                }
                //当前的这个扇区没有在扇区图层命中
                if(!polygonLayersSectorHasAdd){
                    //当前点击的扇区和图层匹配到的扇区相同，当前注册的不需要进行列表显示
                    var clickid = polygonLayer[i].statn_id + '_' + polygonLayer[i].cell_id;
                    clickResultStr += '<li type="sector" clickid="' + clickid + '"><span></span><span >' + polygonLayer[i].statn_id + '_' + polygonLayer[i].cell_id + '</span><span>扇区</span></li>';
                }

            } else if (polygonLayer[i].obj_type == 'm3Sector'
                || polygonLayer[i].obj_type == 'olSector' || polygonLayer[i].obj_type == 'cbSector') {
                for (var j = 0; j < clickCovSector.length; j++) {
                    if (polygonLayer[i].statn_id != clickCovSector[j].statn_id && polygonLayer[i].cell_id != clickCovSector[j].cell_id) {
                        //当前点击的扇区和图层匹配到的扇区相同，当前注册的不需要进行列表显示
                        var clickid = polygonLayer[i].statn_id + '_' + polygonLayer[i].cell_id;
                        clickResultStr += '<li name="' + polygonLayer[i].obj_type + '" type="polygonLayer" clickid="' + clickid + '"><span></span><span >' + polygonLayer[i].statn_id + '_' + polygonLayer[i].cell_id + '</span><span>' + lable + '</span></li>';
                    }
                }
            } else if (polygonLayer[i].obj_type == 'poorArea') {
                for (var j = 0; j < clickPoor.length; j++) {
                    if (clickPoor[j].object_id != polygonLayer[i].obj_id) {
                        clickResultStr += '<li name="' + polygonLayer[i].obj_type + '" type="polygonLayer" clickid="' + clickid + '"><span>' + polygonLayer[i].name + '</span><span>' + polygonLayer[i].obj_id + '</span><span>' + lable + '</span></li>';
                    }
                }
            } else if (polygonLayer[i].obj_type == 'upPoorArea'
                || polygonLayer[i].obj_type == 'dwPoorArea' || polygonLayer[i].obj_type == 'm3PoorArea'
                || polygonLayer[i].obj_type == 'olPoorArea' || polygonLayer[i].obj_type == 'cbPoorArea') {
                for (var j = 0; j < clickpoorArea.length; j++) {
                    if (clickpoorArea[j].object_id != polygonLayer[i].obj_id && clickpoorArea[j].scene != polygonLayer[i].obj_type) {
                        clickResultStr += '<li name="' + polygonLayer[i].obj_type + '" type="polygonLayer" clickid="' + clickid + '"><span>' + polygonLayer[i].name + '</span><span>' + polygonLayer[i].obj_id + '</span><span>' + lable + '</span></li>';
                    }
                }
            } else if (polygonLayer[i].signs == 'addUserComplain' || polygonLayer[i].signs == 'addComplainHot') {
                clickResultStr += '<li name="' + polygonLayer[i].signs + '" type="polygonLayer" clickid="' + polygonLayer[i].id + '"><span>' + polygonLayer[i].workOrder + '</span><span>' + polygonLayer[i].id + '</span><span>' + polygonLayer[i].workType + '</span></li>';
            } else {
                /**
                 for(var j=0;j<clickSceneArea.length;j++){
        			if(clickSceneArea[j].scene!=polygonLayer[i].obj_type){//将地图图层匹配到的结果和注册的进行去重
        				var flag=true;
                        var clickid = polygonLayer[i].obj_id;
                        for(var k=0;k<clickIds.length;k++){
                        	if(clickid==clickIds[k]){
                        		flag=false;
                        		break;
                        	}
                        }
                        if(flag){
                        	clickIds.push(clickid);
            	            //var plyM = {type:2,points:pointArr,decide:1,id:id,name:name,scene:scene};
            	            clickResultStr += '<li name="'+polygonLayer[i].obj_type+'" type="polygonLayer" clickid="'+clickid+'"><span>'+polygonLayer[i].name+'</span><span>'+polygonLayer[i].obj_id+'</span><span>'+lable+'</span></li>';
                        }
        			}
        		}*/

                var flag = true;
                var clickid = polygonLayer[i].obj_id;
                if (polygonLayer[i].obj_type == "userComplain") {
                    flag = false;
                } else {
                    for (var k = 0; k < clickIds.length; k++) {
                        if (clickid == clickIds[k]) {
                            flag = false;
                            break;
                        }
                    }
                }

                if (flag) {
                    clickIds.push(clickid);
                    //var plyM = {type:2,points:pointArr,decide:1,id:id,name:name,scene:scene};
                    clickResultStr += '<li name="' + polygonLayer[i].obj_type + '" type="polygonLayer" clickid="' + clickid + '"><span>' + polygonLayer[i].name + '</span><span>' + polygonLayer[i].obj_id + '</span><span>' + lable + '</span></li>';
                }
            }

        }
    }

    if (clickResultStr == '') {
        $('#mapClickResult').html('点击位置匹配不到数据');
        $('#mapClickResult').slideUp(1000);
    } else {
        //如果站间距的图层存在，则清除图层并将变量置空
        if (IntelligentRoadTest.sectorCircleCanvas != null) {
            IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.sectorCircleCanvas); //清除圆圈
            IntelligentRoadTest.sectorCircleCanvas = null;
        }
        $('#mapClickResult').html(clickResultStr);
        setTimeout(function () {
            if ($('#mapClickResult li').length > 1) {
                $('#mapClickResult').slideDown(1000);
                $(".listDiv .detailList").each(function () {
                    if ($(this).is(":visible")) {
                        $(this).slideUp();
                        $('.packList').attr("title", "打开列表");
                        $('.packList').children().removeClass('rotatePackImg');
                        $('.packList').children().attr("src", "../js/IntelligentRoadTestV3/images/pack_down.png");
                    }
                });
            }
        }, 100);

    }


    $('#mapClickResult li').unbind("mouseover").bind("mouseover", function () {
        var type = $(this).attr('type');
        var liClickid = $(this).attr('clickid');
        var resultList = IntelligentRoadTest.clickResultChe[type];
        if (type == "sector") {
            var bst_id = liClickid.split('_')[0];
            var cell_id = liClickid.split('_')[1];
            for (var i = 0; i < resultList.length; i++) {
                //扇区着重提示
                if (resultList[i].statn_id == bst_id && resultList[i].cell_id == cell_id) {
                    if (resultList[i].type == 2) {//室外基站
                        var p = resultList[i].points[0];
                        var pointsArr = [].concat(resultList[i].points);
                        pointsArr.push(p);
                        IntelligentRoadTest.showClickObjectPolyline(pointsArr, 2);
                    } else {//室内基站
                        IntelligentRoadTest.showClickObjectPolyline(resultList[i], 1);
                    }

                    break;
                }
            }

            // IntelligentRoadTest.sectorCompent.MapClickEvent(e,IntelligentRoadTest.sectorCompent);
        }else if(type == "YDSector"){
            for (let i = 0; i < resultList.length; i++) {
                //扇区着重提示
                if (resultList[i].obj_id == liClickid) {
                    if (resultList[i].type == 2) {
                        //室外基站
                        var p = resultList[i].points[0];
                        var pointsArr = [].concat(resultList[i].points);
                        pointsArr.push(p);
                        IntelligentRoadTest.showClickObjectPolyline(pointsArr, 2);
                    } else {//室内基站
                        IntelligentRoadTest.showClickObjectPolyline(resultList[i], 1);
                    }

                    break;
                }
            }
        } else if(type == "2GSector"){
            //console.log('2G扇区列表高亮。。。。');
            for (let i = 0; i < resultList.length; i++) {
                let sector_id = `${resultList[i].bsc_id}_${resultList[i].statn_id}_${resultList[i].sector_id}_${resultList[i].city_id}`;
                // clickResultStr += '<li type="2GSector" clickid="' + clickid + '"><span></span><span >' + clickid + '</span><span>2G扇区</span></li>';
                if (sector_id == liClickid) {
                    if (resultList[i].type == 2) {
                        //室外基站
                        var p = resultList[i].points[0];
                        var pointsArr = [].concat(resultList[i].points);
                        pointsArr.push(p);
                        IntelligentRoadTest.showClickObjectPolyline(pointsArr, 2);
                    } else {//室内基站
                        IntelligentRoadTest.showClickObjectPolyline(resultList[i], 1);
                    }
                    break;
                }
            }
        } else if (type == "covSector") {//mod3、重叠、越区
            for (var i = 0; i < resultList.length; i++) {
                //扇区着重提示
                if ((resultList[i].statn_id + '_' + resultList[i].cell_id) == liClickid) {
                    if (resultList[i].type == 2) {//室外基站
                        var p = resultList[i].points[0];
                        var pointsArr = [].concat(resultList[i].points);
                        pointsArr.push(p);
                        IntelligentRoadTest.showClickObjectPolyline(pointsArr, 2);
                    } else {//室内基站
                        IntelligentRoadTest.showClickObjectPolyline(resultList[i], 1);
                    }

                    break;
                }
            }
        } else if (type == "poor" || type == "poorArea") {
            for (var i = 0; i < resultList.length; i++) {
                if (resultList[i].object_id == liClickid) {
                    //弱区着重提示
                    IntelligentRoadTest.showClickObjectPolyline(resultList[i].points, 2);
                    break;
                }
            }

        } else if (type == "scene") {
            for (var i = 0; i < resultList.length; i++) {
                if (resultList[i].id == liClickid) {
                    //场景着重提示
                    var p = resultList[i].points[0];
                    var pointsArr = resultList[i].points
                    pointsArr.push(p);
                    IntelligentRoadTest.showClickObjectPolyline(pointsArr, 2);
                    break;
                }
            }

        } else if (type == "grid" || type == "objectGrid") {
            for (var i = 0; i < resultList.length; i++) {
                if (resultList[i][5] == liClickid) {
                    //栅格着重提示
                    //var dataChe = [minLng,minLat,maxLng,maxLat,rsrp_avg,grid_num,agps_count,sector_set,
                    // dxrsrpAvg,rsrp_avgM,rsrp_avgU,monthrelate,dx_cover,yd_cover,lt_cover];
                    var maxLng = resultList[i][2];
                    var maxLat = resultList[i][3];
                    var minLng = resultList[i][0];
                    var minLat = resultList[i][1];
                    var points = [
                        new BMap.Point(minLng, minLat),
                        new BMap.Point(maxLng, minLat),
                        new BMap.Point(maxLng, maxLat),
                        new BMap.Point(minLng, maxLat),
                        new BMap.Point(minLng, minLat)];
                    IntelligentRoadTest.showClickObjectPolyline(points, 2);
                    break;
                }
            }
        } else if (type == "polygonLayer") {
            var obj_type = $(this).attr('name');
            for (var i = 0; i < resultList.length; i++) {
                if (obj_type == 'sector' || obj_type == 'm3Sector' || obj_type == 'olSector' || obj_type == 'cbSector') {
                    if (obj_type == resultList[i].obj_type) {
                        var bst_id = liClickid.split('_')[0];
                        var cell_id = liClickid.split('_')[1];
                        for (var i = 0; i < resultList.length; i++) {
                            //扇区着重提示
                            if (resultList[i].statn_id == bst_id && resultList[i].cell_id == cell_id) {
                                if (resultList[i].type == 2) {//室外基站
                                    var p = resultList[i].points[0];
                                    var pointsArr = [].concat(resultList[i].points);
                                    pointsArr.push(p);
                                    IntelligentRoadTest.showClickObjectPolyline(pointsArr, 2);
                                } else {//室内基站
                                    IntelligentRoadTest.showClickObjectPolyline(resultList[i], 1);
                                }

                                break;
                            }
                        }
                    }
                } else if (obj_type == "addUserComplain" && obj_type == resultList[i].signs && resultList[i].id == liClickid) {//全量工单、越级工单
                    IntelligentRoadTest.showClickObjectPolyline(resultList[i], 3);
                    break;
                } else if (obj_type == "addComplainHot" && obj_type == resultList[i].signs && resultList[i].id == liClickid) {//抱怨热点
                    var p = resultList[i].points[0];
                    var pointsArr = [].concat(resultList[i].points);
                    pointsArr.push(p);
                    IntelligentRoadTest.showClickObjectPolyline(pointsArr, 2);
                    break;
                } else {
                    if (resultList[i].obj_id == liClickid && resultList[i].obj_type == obj_type) {
                        var p = resultList[i].points[0];
                        var pointsArr = [].concat(resultList[i].points);
                        pointsArr.push(p);
                        IntelligentRoadTest.showClickObjectPolyline(pointsArr, 2);
                        break;
                    }
                }

            }
        }

        // console.log("鼠标移入类型:"+type);
    });

    $('#mapClickResult li').unbind("mouseout").bind("mouseout", function () {
        var type = $(this).attr('type');
        if (IntelligentRoadTest.objectPolyline != null) {
            IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.objectPolyline);
        }
        // console.log("鼠标移出类型:"+type);
    });

    $('#mapClickResult li').unbind("click").bind("click", function () {
        var type = $(this).attr('type');
        var liClickid = $(this).attr('clickid');
        var resultList = IntelligentRoadTest.clickResultChe[type];
        if (type == "sector") {
            var bst_id = liClickid.split('_')[0];
            var cell_id = liClickid.split('_')[1];
            for (var i = 0; i < resultList.length; i++) {
                //扇区点击，跳转到详细页，需要加载栅格
                if (resultList[i].statn_id == bst_id && resultList[i].cell_id == cell_id) {
                    if (resultList[i].type == 2) {//室外基站
                        var p = resultList[i].points[0];
                        var pointsArr = resultList[i].points
                        pointsArr.push(p);
                        IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(pointsArr, 2, 'sector');
                    } else {//室内基站
                        IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(resultList[i], 1, 'sector');
                    }
                    IntelligentRoadTestSystemLayerV3.setPoorAreaObj(3);
                    IntelligentRoadTest.getSectorMessageById(resultList[i].statn_id, resultList[i].cell_id, IntelligentRoadTest.day);
                    IntelligentRoadTest.index == 3;
                    break;
                }
            }

            // IntelligentRoadTest.sectorCompent.MapClickEvent(e,IntelligentRoadTest.sectorCompent);
        } else if(type == "2GSector"){
            //console.log('2G扇区列表点击。。。。');
            for (let i = 0; i < resultList.length; i++) {
                let sector_id = `${resultList[i].bsc_id}_${resultList[i].statn_id}_${resultList[i].sector_id}_${resultList[i].city_id}`;
                // clickResultStr += '<li type="2GSector" clickid="' + clickid + '"><span></span><span >' + clickid + '</span><span>2G扇区</span></li>';
                if (sector_id == liClickid) {
                    if (resultList[i].type == 2) {//室外基站
                        var p = resultList[i].points[0];
                        var pointsArr = resultList[i].points
                        pointsArr.push(p);
                        IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(pointsArr, 2, 'sector');
                    } else {//室内基站
                        IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(resultList[i], 1, 'sector');
                    }
                    IntelligentRoadTestSystemLayerV3.query2GSectorInfo(resultList[i]);
                    break;
                }
            }
        } else if(type == "YDSector"){

            for (var i = 0; i < resultList.length; i++) {
                //扇区着重提示
                if (resultList[i].obj_id == liClickid) {
                    let ydSectorPoint = resultList[i].cen_point;
                    let ydSectorInfo = [
                        {key:'基站名',val:resultList[i].name},
                        {key:'频段类型',val:resultList[i].bandtype},
                        {key:'覆盖类型',val:resultList[i].coveragetype}
                    ]
                    IntelligentRoadTest.openInfoWindowTwo(ydSectorPoint.lng,ydSectorPoint.lat,ydSectorInfo);

                    break;
                }
            }
            //console.log('显示移动站点信息');
        } else if (type == "covSector") {
            for (var i = 0; i < resultList.length; i++) {
                //mod3/重叠/越区点击，跳转到详细页，需要加载栅格
                if ((resultList[i].statn_id + '_' + resultList[i].cell_id) == liClickid) {
                    if (resultList[i].type == 2) {//室外基站
                        var p = resultList[i].points[0];
                        var pointsArr = resultList[i].points
                        pointsArr.push(p);
                        IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(pointsArr, 2, 'sector');
                    } else {//室内基站
                        IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(resultList[i], 1, 'sector');
                    }
                    var clickCovObj = IntelligentRoadTestSystemLayerV3.poorArea[resultList[i].scene];
                    IntelligentRoadTestSystemLayerV3.setPoorAreaObj(clickCovObj.index);//给通用的扇区对象赋值
                    IntelligentRoadTest.getSectorMessageById(resultList[i].statn_id, resultList[i].cell_id, IntelligentRoadTest.day);
                    IntelligentRoadTest.index == clickCovObj.index;
                    break;
                }
            }
        } else if (type == "poor" || type == "poorArea") {
            for (var i = 0; i < resultList.length; i++) {
                if (resultList[i].object_id == liClickid) {
                    //弱区点击，呈现栅格,跳转到详细信息
//                    IntelligentRoadTest.loadClickPoorAreaGrid(resultList[i]);
//                     IntelligentRoadTestSystemLayerV3.setPoorAreaObj(resultList[i]);
                    var clickPoorAreaObj = IntelligentRoadTestSystemLayerV3.poorArea[resultList[i].scene];
                    IntelligentRoadTestSystemLayerV3.setPoorAreaObj(clickPoorAreaObj.index);//给通用的弱区对象赋值
                    IntelligentRoadTest.getPoorAreaMessageById(resultList[i].object_id, IntelligentRoadTest.day);
                    IntelligentRoadTest.index == clickPoorAreaObj.index;
                    break;
                }
            }


        } else if (type == "scene") {
            // var sceneId = $(this).attr('type');
            for (var i = 0; i < resultList.length; i++) {
                if (resultList[i].id == liClickid) {
                    if (IntelligentRoadTest.showSceneAreaId == "concern") {//关注区域点击，呈现栅格,需要跳转到详细页
                        IntelligentRoadTest.getConcernAreaMessageById(resultList[i].id);
                        IntelligentRoadTest.index == 1;
                    } else if (IntelligentRoadTest.showSceneAreaId == "bone") {//骨头区域点击，呈现栅格，是否需要跳转到详细页
                        IntelligentRoadTest.getBoneAreaMessageById(resultList[i].id);
                        IntelligentRoadTest.index == 5;
                    } else if (IntelligentRoadTest.showSceneAreaId == "highColleges") {//高校点击，呈现栅格，是否需要跳转到详细页
                        IntelligentRoadTest.getSenseDataByESBHID(1, resultList[i].id, IntelligentRoadTest.day, 'true');
                        IntelligentRoadTest.index == 10;
                    } else if (IntelligentRoadTest.showSceneAreaId == "venues") {//场馆点击，呈现栅格，是否需要跳转到详细页
                        IntelligentRoadTest.getSenseDataByESBHID(10, resultList[i].id, IntelligentRoadTest.day);
                        IntelligentRoadTest.index == 19;
                    } else if (IntelligentRoadTest.showSceneAreaId == "beautyFood") {//美食点击，呈现栅格，是否需要跳转到详细页
                        IntelligentRoadTest.getSenseDataByESBHID(9, resultList[i].id, IntelligentRoadTest.day);
                        IntelligentRoadTest.index == 18;
                    } else if (IntelligentRoadTest.showSceneAreaId == "beautyScenery") {//美景点击，呈现栅格，是否需要跳转到详细页
                        IntelligentRoadTest.getSenseDataByESBHID(7, resultList[i].id, IntelligentRoadTest.day);
                        IntelligentRoadTest.index == 12;
                    } else if (IntelligentRoadTest.showSceneAreaId == "wolfArea") {//战狼区域点击，呈现栅格，是否需要跳转到详细页
                        IntelligentRoadTest.getSenseDataByESBHID(3, resultList[i].id, IntelligentRoadTest.day, 'true', true);
                        IntelligentRoadTest.index == 16;
                    } else if (IntelligentRoadTest.showSceneAreaId == "farmerMarket") {//农贸市场点击，呈现栅格，是否需要跳转到详细页
                        IntelligentRoadTest.getSenseDataByESBHID(8, resultList[i].id, IntelligentRoadTest.day);
                        IntelligentRoadTest.index == 17;
                    } else if (IntelligentRoadTest.showSceneAreaId == "highResidence") {//高密度住宅区点击，呈现栅格，是否需要跳转到详细页
                        IntelligentRoadTest.getSenseDataByESBHID(2, resultList[i].id, IntelligentRoadTest.day, 'true');
                        IntelligentRoadTest.index == 9;
                    } else if (IntelligentRoadTest.showSceneAreaId == "highBusiness") {//高流量商务区点击，呈现栅格，是否需要跳转到详细页
                        IntelligentRoadTest.getSenseDataByESBHID(3, resultList[i].id, IntelligentRoadTest.day, 'true');
                        IntelligentRoadTest.index == 11;
                    } else if (IntelligentRoadTest.showSceneAreaId == "cityVillage") {//城中村点击，呈现栅格，是否需要跳转到详细页
                        IntelligentRoadTest.getSenseDataByESBHID(12, resultList[i].id, IntelligentRoadTest.day, 'true');
                        IntelligentRoadTest.index == 21;
                    } else if (IntelligentRoadTest.showSceneAreaId == "school") {//中小学点击，呈现栅格，是否需要跳转到详细页
                        IntelligentRoadTest.getSenseDataByESBHID(11, resultList[i].id, IntelligentRoadTest.day, 'true');
                        IntelligentRoadTest.index == 20;
                    } else if (IntelligentRoadTest.showSceneAreaId == "village") {//自然村点击，呈现栅格，是否需要跳转到详细页
                        IntelligentRoadTest.getSenseDataByESBHID(13, resultList[i].id, IntelligentRoadTest.day, 'true');
                        IntelligentRoadTest.index == 22;
                    } else if (IntelligentRoadTest.showSceneAreaId == "factory") {//工厂点击，呈现栅格，是否需要跳转到详细页
                        IntelligentRoadTest.getSenseDataByESBHID(14, resultList[i].id, IntelligentRoadTest.day, 'true');
                        IntelligentRoadTest.index == 23;
                    }
                    break;
                }
            }

        } else if (type == "grid" || type == "objectGrid") {
            for (var i = 0; i < resultList.length; i++) {
                if (resultList[i][5] == liClickid) {

                    var maxLng = resultList[i][2];
                    var maxLat = resultList[i][3];
                    var minLng = resultList[i][0];
                    var minLat = resultList[i][1];
                    var midLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2;
                    var midLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2;
                    var centerPoint = new BMap.Point(midLng, midLat);
                    var points = [
                        new BMap.Point(minLng, minLat),
                        new BMap.Point(maxLng, minLat),
                        new BMap.Point(maxLng, maxLat),
                        new BMap.Point(minLng, maxLat),
                        new BMap.Point(minLng, minLat)];
                    if(IntelligentRoadTest.gridTypeIndex == 6){
                        //2G栅格需要显示该栅格信息
                        let gridInfo = [
                            {key:'栅格编号',val:resultList[i][5]},
                            {key:'EC/IO平均值',val:parseFloat(resultList[i][4]).toFixed(2)},
                        ]
                        IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(points, 2, 'grid');
                        IntelligentRoadTest.openInfoWindowTwo(centerPoint.lng,centerPoint.lat,gridInfo);
                        break;
                    }else{

                        IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(points, 2, 'grid');

                        showOrHideInputImage(2);
                        IntelligentRoadTest.getGridDataByGridId(resultList[i]);//获取栅格的详细数据
                        IntelligentRoadTest.getSeventDayDataByGridId(resultList[i][5]);//获取栅格历史7天的覆盖率
                        IntelligentRoadTest.goGridCompleteMessage();
                        break;
                    }

                }
            }
        } else if (type == "polygonLayer") {
            var obj_type = $(this).attr('name');
            if (obj_type == 'sector' || obj_type == 'm3Sector' || obj_type == 'olSector' || obj_type == 'cbSector') {
                var bst_id = liClickid.split('_')[0];
                var cell_id = liClickid.split('_')[1];
                for (var i = 0; i < resultList.length; i++) {
                    if (resultList[i].obj_type == 'sector' || resultList[i].obj_type == 'm3Sector' || resultList[i].obj_type == 'olSector' || resultList[i].obj_type == 'cbSector') {
                        //扇区点击，跳转到详细页，需要加载栅格
                        if (resultList[i].statn_id == bst_id && resultList[i].cell_id == cell_id) {
                            if (resultList[i].type == 2) {//室外基站
                                var p = resultList[i].points[0];
                                var pointsArr = resultList[i].points
                                pointsArr.push(p);
                                IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(pointsArr, 2, 'sector');
                            } else {//室内基站
                                IntelligentRoadTestSystemLayerV3.showHighLightedPolyline(resultList[i], 1, 'sector');
                            }
                            var clickCovObj = IntelligentRoadTestSystemLayerV3.poorArea[resultList[i].obj_type];
                            IntelligentRoadTestSystemLayerV3.setPoorAreaObj(clickCovObj.index);//给通用的扇区对象赋值
//                            IntelligentRoadTest.loadMainSectorGrid(resultList[i]);
                            IntelligentRoadTest.getSectorMessageById(resultList[i].statn_id, resultList[i].cell_id, IntelligentRoadTest.day);
                            IntelligentRoadTest.index = clickCovObj.index;
                            break;
                        }
                    }
                }
            } else if (obj_type == "addUserComplain" || obj_type == "addComplainHot") {
                for (var i = 0; i < resultList.length; i++) {
                    if (resultList[i].signs == obj_type && resultList[i].id == liClickid) {
                        //跳转到全量工单、越级工单详情//跳转到抱怨热点详情
                        if (IntelligentRoadTest.userComplainVM == null) {
                            IntelligentRoadTest.dealQueryAllUserComplain([]);
                            IntelligentRoadTest.userComplainVM.showMessage(resultList[i].val, null);
                        } else {
                            IntelligentRoadTest.userComplainVM.showMessage(resultList[i].val, null);
                        }
                        IntelligentRoadTest.index = 29;
                        break;
                    }
                }

            } else {
                for (var i = 0; i < resultList.length; i++) {
                    if (resultList[i].obj_id == liClickid && obj_type == resultList[i].obj_type) {
                        if (resultList[i].obj_type == "concern") {//关注区域点击，呈现栅格,需要跳转到详细页
                            IntelligentRoadTest.getConcernAreaMessageById(resultList[i].obj_id);
                            IntelligentRoadTest.index == 1;
                        } else if (resultList[i].obj_type == "boneArea") {//骨头区域点击，呈现栅格，是否需要跳转到详细页
                            IntelligentRoadTest.getBoneAreaMessageById(resultList[i].obj_id);
                            IntelligentRoadTest.index == 5;
                        } else if (resultList[i].obj_type == "colleges") {//高校点击，呈现栅格，是否需要跳转到详细页
                            IntelligentRoadTest.getSenseDataByESBHID(1, resultList[i].obj_id, IntelligentRoadTest.day, 'true');
                            IntelligentRoadTest.index == 10;
                        } else if (resultList[i].obj_type == "site") {//场馆点击，呈现栅格，是否需要跳转到详细页
                            IntelligentRoadTest.getSenseDataByESBHID(10, resultList[i].obj_id, IntelligentRoadTest.day);
                            IntelligentRoadTest.index == 19;
                        } else if (resultList[i].obj_type == "food") {//美食点击，呈现栅格，是否需要跳转到详细页
                            IntelligentRoadTest.getSenseDataByESBHID(9, resultList[i].obj_id, IntelligentRoadTest.day);
                            IntelligentRoadTest.index == 18;
                        } else if (resultList[i].obj_type == "scenery") {//美景点击，呈现栅格，是否需要跳转到详细页
                            IntelligentRoadTest.getSenseDataByESBHID(7, resultList[i].obj_id, IntelligentRoadTest.day);
                            IntelligentRoadTest.index == 12;
                        } else if (resultList[i].obj_type == "warwolf") {//战狼区域点击，呈现栅格，是否需要跳转到详细页
                            IntelligentRoadTest.getSenseDataByESBHID(3, resultList[i].obj_id, IntelligentRoadTest.day, 'true', true);
                            IntelligentRoadTest.index == 16;
                        } else if (resultList[i].obj_type == "market") {//农贸市场点击，呈现栅格，是否需要跳转到详细页
                            IntelligentRoadTest.getSenseDataByESBHID(8, resultList[i].obj_id, IntelligentRoadTest.day);
                            IntelligentRoadTest.index == 17;
                        } else if (resultList[i].obj_type == "uptown") {//高密度住宅区点击，呈现栅格，是否需要跳转到详细页
                            IntelligentRoadTest.getSenseDataByESBHID(2, resultList[i].obj_id, IntelligentRoadTest.day, 'true');
                            IntelligentRoadTest.index == 9;
                        } else if (resultList[i].obj_type == "business") {//高流量商务区点击，呈现栅格，是否需要跳转到详细页
                            IntelligentRoadTest.getSenseDataByESBHID(3, resultList[i].obj_id, IntelligentRoadTest.day, 'true');
                            IntelligentRoadTest.index == 11;
                        } else if (resultList[i].obj_type == "cityVillage") {//城中村点击，呈现栅格，是否需要跳转到详细页
                            IntelligentRoadTest.getSenseDataByESBHID(12, resultList[i].obj_id, IntelligentRoadTest.day, 'true');
                            IntelligentRoadTest.index == 21;
                        } else if (resultList[i].obj_type == "school") {//中小学点击，呈现栅格，是否需要跳转到详细页
                            IntelligentRoadTest.getSenseDataByESBHID(11, resultList[i].obj_id, IntelligentRoadTest.day, 'true');
                            IntelligentRoadTest.index == 20;
                        } else if (resultList[i].obj_type == "village") {//自然村点击，呈现栅格，是否需要跳转到详细页
                            IntelligentRoadTest.getSenseDataByESBHID(13, resultList[i].obj_id, IntelligentRoadTest.day, 'true');
                            IntelligentRoadTest.index == 22;
                        } else if (resultList[i].obj_type == "factory") {//工厂点击，呈现栅格，是否需要跳转到详细页
                            IntelligentRoadTest.getSenseDataByESBHID(14, resultList[i].obj_id, IntelligentRoadTest.day, 'true');
                            IntelligentRoadTest.index == 23;
                        } else if (resultList[i].obj_type == "poorArea") {//弱区，呈现栅格，是否需要跳转到详细页
                            IntelligentRoadTest.getPoorAreaMessageById(resultList[i].obj_id, IntelligentRoadTest.day);
                            IntelligentRoadTest.index == 0;
                        } else if (resultList[i].obj_type == 'upPoorArea' || resultList[i].obj_type == 'dwPoorArea') { //删除||resultList[i].obj_type=='m3Sector'||resultList[i].obj_type=='olSector'||resultList[i].obj_type=='cbSector'
                            var clickPoorAreaObj = IntelligentRoadTestSystemLayerV3.poorArea[resultList[i].obj_type];
                            IntelligentRoadTestSystemLayerV3.setPoorAreaObj(clickPoorAreaObj.index);
                            IntelligentRoadTest.getPoorAreaMessageById(resultList[i].obj_id, IntelligentRoadTest.day);
                            IntelligentRoadTest.index == clickPoorAreaObj.index;
                        } else if (resultList[i].obj_type == "boxSelect") {//自定义框选，呈现栅格，是否需要跳转到详细页
                            if (IntelligentRoadTest.SelectionE) {
                                IntelligentRoadTest.overlaycomplete(IntelligentRoadTest.SelectionE, false);
                            }
                            if (IntelligentRoadTest.SelectionOverlay) {
                                IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.SelectionOverlay);
                            }
                        } else if (resultList[i].obj_type == "poorAreaDashed") {//虚线弱区，呈现栅格，是否需要跳转到详细页
                            if (!resultList[i].isDashLine) {//是虚框的时候，说明当前的弱区虚框不是生成的时间
                                IntelligentRoadTest.getPoorAreaMessageById(resultList[i].obi_id, IntelligentRoadTest.day, true);
                            } else {
                                var obj = {};
                                obj.overlay = {};
                                obj.overlay = new BMap.Polygon(resultList[i].points);
                                IntelligentRoadTest.overlaycomplete(obj, false);
                                IntelligentRoadTest.goSaveAreaCompleteMessage();
                            }
                        }
                        break;
                    }
                }
            }
        }
        $(this).parent().hide();
    });

}


IntelligentRoadTest.initMap = function IntelligentRoadTest_initMap() {
    var point = null;
    if (IntelligentRoadTest.city == "全省") {
        point = getCityLocation("广州");
    } else {
        point = getCityLocation(IntelligentRoadTest.city);
    }
    var zoom = IntelligentRoadTest.initMapZoom;
    if (IntelligentRoadTest.isScreenCompared) {//分屏页面需要根据主屏的中心经纬度进行初始化
        if (IntelligentRoadTestScreenCompared.initLng != null && IntelligentRoadTestScreenCompared.initLat != null) {
            point = new BMap.Point(IntelligentRoadTestScreenCompared.initLng, IntelligentRoadTestScreenCompared.initLat);
        }
        if (IntelligentRoadTestScreenCompared.initZoom != null) {
            zoom = IntelligentRoadTestScreenCompared.initZoom;
        }
    }

    IntelligentRoadTest.map = new BMap.Map("baiduMap", {enableMapClick: false, minZoom: 8, maxZoom: 20});          // 创建地图实例
    // map.centerAndZoom(IntelligentRoadTest.city,15);
    IntelligentRoadTest.map.centerAndZoom(point, zoom);

    IntelligentRoadTest.map.enableScrollWheelZoom(); // 允许滚轮缩放
    IntelligentRoadTest.map.enableDragging();
    IntelligentRoadTest.map.disableDoubleClickZoom();
    // IntelligentRoadTest.map.disableContinuousZoom();//禁用连续缩放
    IntelligentRoadTest.map.enableAutoResize();
    IntelligentRoadTest.map.disableInertialDragging();//禁用惯性拖拽
    var exhibition = noceUtil.GetQueryString("exhibition");
    if (exhibition == "true" || exhibition == true) {
        IntelligentRoadTest.map.setMapStyle({styleJson: IntelligentRoadTest.baidumapExhibitionStyle});
    } else {
        IntelligentRoadTest.map.setMapStyle({style: IntelligentRoadTest.baimapStyle});
    }

/*
    //移动地图
    IntelligentRoadTest.mapMobile = new BMap.Map("mapMobile", {enableMapClick: false, minZoom: 10, maxZoom: 20});          // 创建地图实例
    IntelligentRoadTest.mapMobile.centerAndZoom(point, 12);

    IntelligentRoadTest.mapMobile.disableDragging();// 禁止拖拽
    IntelligentRoadTest.mapMobile.disableDoubleClickZoom();
    IntelligentRoadTest.mapMobile.enableAutoResize();
    IntelligentRoadTest.mapMobile.setMapStyle({styleJson: IntelligentRoadTest.mapStyle});
    IntelligentRoadTest.mapMobile.addEventListener("resize", function (e) {
        if (IntelligentRoadTest.isThreeNetStatus) {
            IntelligentRoadTest.centerAndZoomTimeout = setTimeout("IntelligentRoadTest.timeoutCenterAndZoom();", 200);
            IntelligentRoadTest.drawPolylineTimeout = setTimeout("IntelligentRoadTest.drawPolyline();", 1000);
        }
    });

    //联通地图
    IntelligentRoadTest.mapUnicom = new BMap.Map("mapUnicom", {enableMapClick: false, minZoom: 10, maxZoom: 20});          // 创建地图实例
    IntelligentRoadTest.mapUnicom.centerAndZoom(point, 12);

    IntelligentRoadTest.mapUnicom.disableDragging();// 禁止拖拽
    IntelligentRoadTest.mapUnicom.disableDoubleClickZoom();//不使用双击放大
    IntelligentRoadTest.mapUnicom.enableAutoResize();//地图自适应大小
    IntelligentRoadTest.mapUnicom.setMapStyle({styleJson: IntelligentRoadTest.mapStyle});
    */

    IntelligentRoadTest.map.addEventListener('zoomend', IntelligentRoadTest.GridMapZoomEnd);
    IntelligentRoadTest.map.addEventListener('dragend', function () {
        $('#cirTipLeft').hide();
    });
    IntelligentRoadTest.map.addEventListener('moveend', IntelligentRoadTest.GridMapMoveEnd);
    IntelligentRoadTest.map.addEventListener("mousemove", IntelligentRoadTest.mousemoveEvent);
    IntelligentRoadTest.map.addEventListener('click', IntelligentRoadTest.MapClickEvent);

    var top_right_control = new BMap.ScaleControl(
        {
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            offset: {width: 50, height: 50}
        });// 右下角，添加比例尺
    var top_right_navigation = new BMap.NavigationControl(
        {anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM, offset: {width: 0, height: 30}}); //右下角，添加缩放控件

    IntelligentRoadTest.map.addControl(top_right_control);
    IntelligentRoadTest.map.addControl(top_right_navigation);

    var nrCover=localStorage.getItem("nrCover");
    if(nrCover!=null&&nrCover!=""){
        IntelligentRoadTest.nrCover=JSON.parse(nrCover);
    }
    /*根据缓存初始化附近覆盖按钮*/
    $("#showNrCheckbox").prop("checked",IntelligentRoadTest.nrCover.showNrCover);
    $(".NrText").text($('.NrUl li[data-nrcover="'+IntelligentRoadTest.nrCover.currentNrCover+'"]').text());
    $('.NrUl li[data-nrcover="'+IntelligentRoadTest.nrCover.currentNrCover+'"]').addClass("selected").siblings().removeClass("selected");
    //重新初始化变量
    IntelligentRoadTest.showNrCover = IntelligentRoadTest.nrCover.showNrCover; //先暂时设置为false，后面要改成 true
    IntelligentRoadTest.currentNrCover = IntelligentRoadTest.nrCover.currentNrCover; //默认显示4G附近覆盖

    var bmap_type=IntelligentRoadTest.nrCover.showNrCover ? BMAP_SATELLITE_MAP : BMAP_NORMAL_MAP;
    var mapType2 = new myBMapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT, offset: new BMap.Size(10, 55),mapType:bmap_type});
//	var mapType2 = new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT,mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]});
    IntelligentRoadTest.map.addControl(mapType2);//添加地图类型控件

/*
    var bMapObj = {
        map: IntelligentRoadTest.map,
        useSelectTimeQuerySector: true,
        isShowFactoryIcon: false,
        showHighStatn: false,
        sectorColor: IntelligentRoadTest.sectorColor,
        circleColor: IntelligentRoadTest.sectorColor,
        opacity: 0.6,
//			selectTime:IntelligentRoadTest.day,
        selectCity: IntelligentRoadTest.city,
        ifShowLodingImage: true,
        senes: 0,
        sectorZindex: 1,
        queryOtherTable: true,
        queryCondition: "AND nb_flag = 0",
        // useOptionColor:true,
        // optionColor:{field:'bs_vendor',
        //     option:[{level:'0',color:'#000000'},
        //         {level:'1',color:'#990000'},
        //         {level:'2',color:'#3333CC'},
        //         {level:'3',color:'#00FFFF'}]
        // },
        // optionChangeFunc:IntelligentRoadTest.factoryLevel,
    };
    IntelligentRoadTest.sectorCompent = new SectorUtilForBaidu(bMapObj);

    //移动地图弱区
    var bMapObjM = {
        map: IntelligentRoadTest.mapMobile,
        sectorColor: "white",
        circleColor: "white",
        lineColor: IntelligentRoadTest.poorAreaLineColor,
        opacity: 0.3,
        lineOpacity: 1,
        lineWidth: 2,
        sectorZindex: 1,
    };
    IntelligentRoadTest.poorAreaCompentM = new SectorUtilForBaidu(bMapObjM);
    IntelligentRoadTest.poorCompentM = new SectorUtilForBaidu(bMapObjM);
    IntelligentRoadTest.covSectorCompentM = new SectorUtilForBaidu(bMapObjM);

    //联通地图弱区
    var bMapObjU = {
        map: IntelligentRoadTest.mapUnicom,
        sectorColor: "white",
        circleColor: "white",
        lineColor: IntelligentRoadTest.poorAreaLineColor,
        opacity: 0.3,
        lineOpacity: 1,
        lineWidth: 2,
        sectorZindex: 1,
    };
    IntelligentRoadTest.poorAreaCompentU = new SectorUtilForBaidu(bMapObjU);
    IntelligentRoadTest.poorCompentU = new SectorUtilForBaidu(bMapObjU);
    IntelligentRoadTest.covSectorCompentU = new SectorUtilForBaidu(bMapObjU);

    //栅格组件
    IntelligentRoadTest.GridMap = new GridMap(IntelligentRoadTest.map, {
        readTileData: null,//瓦片获取数据事件
        opacity: 0.6,//$('#opacity').val(),//透明度
        colorMode: 'range',//gradient:渐变的方式呈现颜色；range:按区间匹配颜色
        divZindex: 10,
    });
    IntelligentRoadTest.GridMap.setThresholds(IntelligentRoadTest.gridThresholds);

    //移动地图栅格组件
    IntelligentRoadTest.GridMapM = new GridMap(IntelligentRoadTest.mapMobile, {
        readTileData: null,//瓦片获取数据事件
        opacity: 0.6,//$('#opacity').val(),//透明度
        colorMode: 'range',//gradient:渐变的方式呈现颜色；range:按区间匹配颜色
        divZindex: 10,
    });
    IntelligentRoadTest.GridMapM.setThresholds(IntelligentRoadTest.gridThresholds);

    //联通地图栅格组件
    IntelligentRoadTest.GridMapU = new GridMap(IntelligentRoadTest.mapUnicom, {
        readTileData: null,//瓦片获取数据事件
        opacity: 0.6,//$('#opacity').val(),//透明度
        colorMode: 'range',//gradient:渐变的方式呈现颜色；range:按区间匹配颜色
        divZindex: 10,
    });
    IntelligentRoadTest.GridMapU.setThresholds(IntelligentRoadTest.gridThresholds);


    //栅格组件
    IntelligentRoadTest.GridMapArea = new GridMap(IntelligentRoadTest.map, {
        readTileData: null,//瓦片获取数据事件
        opacity: 0.8,//$('#opacity').val(),//透明度
        colorMode: 'range',//gradient:渐变的方式呈现颜色；range:按区间匹配颜色
    });
    IntelligentRoadTest.GridMapArea.setThresholds(IntelligentRoadTest.gridThresholds);

    //移动地图栅格组件
    IntelligentRoadTest.GridMapAreaM = new GridMap(IntelligentRoadTest.mapMobile, {
        readTileData: null,//瓦片获取数据事件
        opacity: 0.8,//$('#opacity').val(),//透明度
        colorMode: 'range',//gradient:渐变的方式呈现颜色；range:按区间匹配颜色
        divZindex: 1,
    });
    IntelligentRoadTest.GridMapAreaM.setThresholds(IntelligentRoadTest.gridThresholds);

    //联通地图栅格组件
    IntelligentRoadTest.GridMapAreaU = new GridMap(IntelligentRoadTest.mapUnicom, {
        readTileData: null,//瓦片获取数据事件
        opacity: 0.8,//$('#opacity').val(),//透明度
        colorMode: 'range',//gradient:渐变的方式呈现颜色；range:按区间匹配颜色
        divZindex: 1,
    });
    IntelligentRoadTest.GridMapAreaU.setThresholds(IntelligentRoadTest.gridThresholds);


    //--------------------------增加初始化osm地图
    var pointOsm = null;
    if (IntelligentRoadTest.city == "全省") {
        pointOsm = OSMapUtil.getCityLocation("广州");
    } else {
        pointOsm = OSMapUtil.getCityLocation(IntelligentRoadTest.city);
    }

    if (pointOsm == null) {
        pointOsm = new L.LatLng(23.135541, 113.270667);
    }
    //初始化osm地图
    IntelligentRoadTest.OsmMap = new L.Map('OsmMap', {
        center: pointOsm,
        zoom: 10,
        zoomControl: false,
        doubleClickZoom: false,
        renderer: L.canvas(),
    });

    var osmscale = new L.control.scale({imperial: false, position: "bottomright"}).addTo(IntelligentRoadTest.OsmMap);

//	OpersComp.wmsLayer = L.tileLayer(OpersComp.getUrl() + ':8099/{z}/{x}/{y}.png', {
//     http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}
    IntelligentRoadTest.wmsLayer = L.tileLayer(commonOsmUrl + '/styles/positron/{z}/{x}/{y}.png', {
//     IntelligentRoadTest.wmsLayer = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}', {
        minZoom: 7,
        maxZoom: 19,
        tileSize: 256,
    })
    IntelligentRoadTest.wmsLayer.addTo(IntelligentRoadTest.OsmMap);

    IntelligentRoadTest.MyOSMMapTypeControl = new L.Control.Legend({position: 'topright'},IntelligentRoadTest.wmsLayer);
    IntelligentRoadTest.MyOSMMapTypeControl.addTo(IntelligentRoadTest.OsmMap);
    IntelligentRoadTest.OsmMap.on('moveend', function (e) {
        var zoom = IntelligentRoadTest.OsmMap.getZoom();
        var centerPoint = IntelligentRoadTest.OsmMap.getCenter(); // 获取中心点

        if (IntelligentRoadTest.isScreenCompared && !IntelligentRoadTestScreenCompared.sendSetCenter) {//分屏页发送页面同步信息
            var messageObj = {}
            messageObj.type = "osmmaponmoveend";
            messageObj.point = IntelligentRoadTest.OsmMap.getCenter();
            messageObj.zoom = IntelligentRoadTest.OsmMap.getZoom();
            messageObj.sendSetCenter = true;
            window.opener.postMessage(JSON.stringify(messageObj), "*");
        } else {
            if (IntelligentRoadTest.isAddMessageEvent && !IntelligentRoadTestScreenCompared.sendSetCenter) {// 主屏时，往分屏页发送信息
                var messageObj = {}
                messageObj.type = "osmmaponmoveend";
                messageObj.point = IntelligentRoadTest.OsmMap.getCenter();
                messageObj.zoom = IntelligentRoadTest.OsmMap.getZoom();
                messageObj.sendSetCenter = true;
                windowScreeen.postMessage(JSON.stringify(messageObj), "*");
            }
        }

        //基站渲染
        if (IntelligentRoadTest.isShowSector && IntelligentRoadTest.sectorCompentForOsm != null) {
            IntelligentRoadTest.sectorCompentForOsm.MapZoomAndDragEnd(e, IntelligentRoadTest.sectorCompentForOsm);
        }

        if (IntelligentRoadTest.isShowOsmMapEnd) {
            //高速、高铁、市政路只有在第一层列表或者连片时才需要查询视野内线段数据

            if (IntelligentRoadTest.index == 7 || IntelligentRoadTest.index == 8 || IntelligentRoadTest.index == 14) {
                if (IntelligentRoadTest.roadIndex == 1) {
                    IntelligentRoadTest.loadLineByLevelFromBounds();
                } else {
                    if (IntelligentRoadTest.geoJsonLayer) {
                        IntelligentRoadTest.geoJsonLayer.clearLayers();
                    }
                }

            }

        }

        var centerPoint = IntelligentRoadTest.OsmMap.getCenter();
        var district = IntelligentRoadTest.getCenterPointDistrict(centerPoint);
        if (district != null) {
            if (IntelligentRoadTest.cityPermission_common == "全省") {
                //地图拖拽完毕后，将搜索地市进行限制
                // IntelligentRoadTest.localSearch.setLocation(district.city);
                //更新页面中间的区域列表
                $('#mapCity').text(district.city);
                $('#mapDistrict').text(district.name);

            } else {
                if (district.city == IntelligentRoadTest.cityPermission_common) {
                    $('#mapCity').text(district.city);
                    $('#mapDistrict').text(district.name);
                }
            }
            IntelligentRoadTest.city = district.city;
            IntelligentRoadTest.district = district.name;
            // IntelligentRoadTest.updateSearchTmpTxt();
            IntelligentRoadTest.searchTxtUpdate();

        }

    });

    var bMapObj = {
        map: IntelligentRoadTest.OsmMap,
        useSelectTimeQuerySector: true,
        isShowFactoryIcon: false,
        showHighStatn: false,
        sectorColor: IntelligentRoadTest.sectorColor,
        circleColor: IntelligentRoadTest.sectorColor,
        opacity: 0.6,
        selectCity: IntelligentRoadTest.city,
        ifShowLodingImage: true,
        senes: 0,
        sectorZindex: 1,
        queryCondition: "AND nb_flag = 0",
        // useOptionColor:true,
        // optionColor:{field:'bs_vendor',
        //     option:[{level:'0',color:'#000000'},
        //         {level:'1',color:'#990000'},
        //         {level:'2',color:'#3333CC'},
        //         {level:'3',color:'#00FFFF'}]
        // },
        // optionChangeFunc:IntelligentRoadTest.factoryLevel,
    };
    IntelligentRoadTest.sectorCompentForOsm = new SectorUtilForOsm(bMapObj);*/
}


//查询弱区表的最大时间
IntelligentRoadTest.loadMaxDay = function IntelligentRoadTest_loadMaxDay() {

    var maxTime = pageMaxTime().replace(/\-/g, "");
    /*这里做一下修改，如果是从url获取时间的话，这里要时间要修改成url上的时间*/
    // var maxTime = pageMaxTime().replace(/\-/g,"");
    var lastPage = noceUtil.GetQueryString("lastPage");
    var urlDay = noceUtil.GetQueryString("day");
    if (lastPage != null && lastPage != "" && urlDay != null && urlDay != "") {
        if(parseInt(maxTime) < parseInt(urlDay)){
            console.log('传入的日期比获取的最大日期大....','传入日期:'+urlDay,'最大日期:'+maxTime)
        }else{
            maxTime = urlDay;
        }
    }
    var fomatDate = maxTime.substring(0, 4) + "/" + maxTime.substring(4, 6) + "/" + maxTime.substring(6, 8);

    var d = new Date(fomatDate);
    var date = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 6);
    var year = date.getFullYear() + "";
    var month = date.getMonth() + 1 + "";
    var day = date.getDate() + "";
    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    var startTime = year + month + day;

    $('#seachTime').text(maxTime);
    $('#weekStartTime').text(startTime);
    IntelligentRoadTest.day = $('#seachTime').text();

    return;

    var list = ["IntelligentRoadTestV2_01_maxDay"];
    var sqlList = [list];
    var functionList = [IntelligentRoadTest.handleMaxDay];
    var database = [3];
    progressbarTwo.submitSql(sqlList, functionList, database, null, null, null, null, true);
}
//查询最大时间回调函数
IntelligentRoadTest.handleMaxDay = function IntelligentRoadTest_handleMaxDay(data) {
    var result = callBackChangeData(data);
    if (result.length > 0) {
        var maxTime = result[0]["day"] + "";//拿到结果集第一个对象的day属性值
        var fomatDate = maxTime.substring(0, 4) + "/" + maxTime.substring(4, 6) + "/" + maxTime.substring(6, 8);

        var d = new Date(fomatDate);//时间格式的方式转化为时间类型
        var date = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 6);
        var year = date.getFullYear() + "";
        var month = date.getMonth() + 1 + "";
        var day = date.getDate() + "";//分别拿到年月日
        if (month.length == 1) {//月份为单数时，前面加0
            month = "0" + month;
        }
        if (day.length == 1) {//日期为单数时，前面加0
            day = "0" + day;
        }
        var startTime = year + month + day;//拼接成字符串20180101

        $('#seachTime').text(maxTime);//赋值给文本内容
        $('#weekStartTime').text(startTime);
        IntelligentRoadTest.day = $('#seachTime').text();
    }

}

//---------------设置日期控件的最大时间---------------
function pageMaxTime() {
    // if(IntelligentRoadTest.maxDayTime!=null){
    //     var maxTimeStr = IntelligentRoadTest.maxDayTime.substring(0,4)+"-"+IntelligentRoadTest.maxDayTime.substring(4,6)+"-"+IntelligentRoadTest.maxDayTime.substring(6)
    //     return maxTimeStr
    // }else{
    var nowDate = new Date();
    var hour = nowDate.getHours();
    if (hour < 23) {
        var twoDateBefore = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() - 2);
        var year = twoDateBefore.getFullYear();
        var month = twoDateBefore.getMonth() + 1;
        var day = twoDateBefore.getDate();
        if (month < 10) {
            month = "0" + month;
        } else {
            month = month + "";
        }
        if (day < 10) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    } else {
        var oneDateBefore = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() - 1);
        var year = oneDateBefore.getFullYear();
        var month = oneDateBefore.getMonth() + 1;
        var day = oneDateBefore.getDate();
        if (month < 10) {
            month = "0" + month;
        } else {
            month = month + "";
        }
        if (day < 10) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    }
    // }
}

//------------------------------


function doSubmitAndRemove() {
    setTimeout(function () {
        uploadData.getChromeData();
        uploadData.doSubmit();
    }, 10000);
    IntelligentRoadTest.map.removeEventListener("tilesloaded", doSubmitAndRemove);
}

// $(function(){
//设置版权的高度为空
if($("#ifShowBottomFlag").val() != null && $("#ifShowBottomFlag").val().trim() == "#HIDDEN#"){ //该页面配置了不显示底部栏目
    $("#downFooter").hide(); // 隐藏左侧的控制显示隐藏底栏的按钮
    $("#right").css("padding-bottom" , 0); //设置与底边的距离
}

//匹配地图中心点所在的区县
IntelligentRoadTest.getCenterPointDistrict = function IntelligentRoadTest_getCenterPointDistrict(centerPoint) {
    var market = null;
    for (var i = 0; i < IntelligentRoadTest.DistrictPolygon.length; i++) {
        if (BMapLib.GeoUtils.isPointInPolygonForNOCE(centerPoint, IntelligentRoadTest.DistrictPolygon[i])) {
            market = IntelligentRoadTest.DistrictPolygon[i];
            break;
        }
    }
    return market;
}

//初始化完定位一下用户所在的地市
IntelligentRoadTest.locationCityAndDirict = function(){
    var centerPoint = IntelligentRoadTest.map.getCenter();
    var district = IntelligentRoadTest.getCenterPointDistrict(centerPoint);
    if (district != null) {
        if (IntelligentRoadTest.cityPermission_common == "全省") {
            //地图拖拽完毕后，将搜索地市进行限制
            // IntelligentRoadTest.localSearch.setLocation(district.city);
            //更新页面中间的区域列表
            $('#mapCity').text(district.city);
            $('#mapDistrict').text(district.name);
            if(IntelligentRoadTest.city == "全省"){
                return;
            }
            IntelligentRoadTest.city = district.city;
            IntelligentRoadTest.district = district.name;
            // IntelligentRoadTest.updateSearchTmpTxt();
            // IntelligentRoadTest.searchTxtUpdate();
        } else {
            if (district.city == IntelligentRoadTest.cityPermission_common) {
                $('#mapCity').text(district.city);
                $('#mapDistrict').text(district.name);
                IntelligentRoadTest.city = district.city;
                IntelligentRoadTest.district = district.name;
                if(!isNull(IntelligentRoadTest.countryPermission_common)){
                    IntelligentRoadTest.district = IntelligentRoadTest.countryPermission_common;
                }
                // IntelligentRoadTest.updateSearchTmpTxt();
                // IntelligentRoadTest.searchTxtUpdate();
            }
        }
    }
}

//初始化地图
IntelligentRoadTest.currentUser = $.trim($("#headerUserForm_a").text());
IntelligentRoadTest.cityPermission_common = $('#cityPermission_common').val();
IntelligentRoadTest.user_role = $('#user_role_List_string').val();
if (IntelligentRoadTest.cityPermission_common == "全省") {
    IntelligentRoadTest.city = noceUtil.GetQueryString("city");
    if (IntelligentRoadTest.city == null) {
        IntelligentRoadTest.city = "广州";
    }
    // IntelligentRoadTest.district = "福田";
} else {
    IntelligentRoadTest.city = IntelligentRoadTest.cityPermission_common;
}
IntelligentRoadTest.initMap();
//将时间初始化提前
IntelligentRoadTest.loadMaxDay();
//目前暂时只有NB角色的用户才能看到NB预测栅格
if($("#user_role_List_string").val().indexOf('NB')>-1){
    $('input[id="nb-type"][value="7"]').parent('li').show();
}else{
    $('input[id="nb-type"][value="7"]').parent('li').hide();
}


// });


//------------------增加导出的方法--------------------------
/**
 * ********************************
 * @funcname exportData
 * @funcdesc 将数据导出成文件
 * @param {Array} data  {String} fileName
 data表示要导出的数据  fileName：Excel文件名称
 * @return {null}
 * @author 林楚佳
 * @create 20170901
 * @modifier
 * @modify
 **********************************
 */
function exportData(data , fileName){
    // 这里的data数据，也即是从数据库查询出来的数据
    // colums表示 是表格的列名数组 相当于data中的columns数组
    // tableData表示每一行的数据，相当于data中的result
    var sheetObj = new sheet(data.tableHead,data.tableData,"sheet1");
    exportExcelUtil.exportExcelByList(fileName,sheetObj);
}

IntelligentRoadTest.exportCoverData = function(){
    if(!isNull(IntelligentRoadTest.sevenLineEchart)){
        var data = IntelligentRoadTest.concernAreaExportObj;
        var tableHead = ["日期","RSRP","覆盖率","弱覆盖占比"]; // 表头数据
        var tableData = [];//最终是个二维数组
        if(data != null && data.day != null){
            /*day : xAxisData,
              rsrp : seriesData,
              cover : coverData,
              poor_radio : poor_grid_radioData
             */
            for(var i = 0; i < data.day.length; i++){
                var column = [data.day[i] , data.rsrp[i] , data.cover[i] , data.poor_radio[i]]; //一行数据
                tableData.push(column);
            }
        }
        var concernData = IntelligentRoadTest.concernAreaCompleteVM.concernAreaData;
        var fileName = "编号" + concernData.id + "名称" + concernData.area_name + "的" + concernData.create_time + "覆盖数据";
        var exportDataObj = {
            tableHead :  tableHead,
            tableData : tableData
        };
        exportData(exportDataObj , fileName); //导出数据
    }
}