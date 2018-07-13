var IntelligentRoadTestChart = {};

$(function () {
    // 场景对象数组
    var statisticalObject = ["全区域","弱区","关注区域","扇区","工单","骨头区域",
        "高校","场馆","美食","美景","高密度住宅区","高流量商务区","战狼区域","农贸市场","中小学","城中村","上行低速区","下行低速区"];
    // url中的city
    var city = noceUtil.GetQueryString("mapCity");
    // url中的country
    var country = noceUtil.GetQueryString("mapDistrict");
    // url中的senceName，统计对象
    var object_type = noceUtil.GetQueryString("senceName");
    if(object_type == '宏扇区'){
        object_type = '扇区';
    }else{
        if($.inArray(object_type,statisticalObject)<0){
            object_type = '全区域';
        }
    }

    document.onkeydown=function(e){
        if( e.altKey  && e.ctrlKey && e.shiftKey && e.keyCode == 48  ){//shit + alt   + ctrl + 0
            $(".btn-export").show();
        }
    }

    // 广东省地市
    var citys = ["全省","广州","韶关","深圳","珠海","汕头","佛山","江门","湛江","茂名","肇庆","惠州","梅州","汕尾","河源","阳江","清远","东莞","中山","潮州","揭阳","云浮",'其他'];

    // if(object_type == '扇区'){
    //     citys = citys.splice(1);
    // }

    // 图表vue组件
    var chartComponents = {
        '全区域':'collegeComponent'
        ,'弱区':'weakAreaComponent'
        ,'上行低速区':'weakAreaComponent'
        ,'下行低速区':'weakAreaComponent'
        ,'关注区域':'collegeComponent'
        ,'扇区':'sectorComponent'
        ,'工单':'workOrderComponent'
        ,'骨头区域':'collegeComponent'
        // ,'高速':'collegeComponent'
        ,'高铁':'collegeComponent'
        // ,'市政路':'collegeComponent'
        ,'地铁':'collegeComponent'
        ,'高校':'collegeComponent'
        ,'场馆':'collegeComponent'
        ,'美食':'collegeComponent'
        ,'美景':'collegeComponent'
        ,'高密度住宅区':'collegeComponent'
        ,'高流量商务区':'collegeComponent'
        ,'战狼区域':'collegeComponent'
        ,'农贸市场':'collegeComponent'
        ,'中小学':'collegeComponent'
        ,'城中村':'collegeComponent'
    };
    var chartComponents2 = {
        '全区域':'collegeComponent2'
        ,'弱区':'weakAreaComponent2'
        ,'上行低速区':'weakAreaComponent2'
        ,'下行低速区':'weakAreaComponent2'
        ,'关注区域':'collegeComponent2'
        ,'扇区':'sectorComponent2'
        // ,'工单':'workOrderComponent'
        ,'骨头区域':'collegeComponent2'
        // ,'高速':'collegeComponent'
        ,'高铁':'collegeComponent2'
        // ,'市政路':'collegeComponent'
        ,'地铁':'collegeComponent2'
        ,'高校':'collegeComponent2'
        ,'场馆':'collegeComponent2'
        ,'美食':'collegeComponent2'
        ,'美景':'collegeComponent2'
        ,'高密度住宅区':'collegeComponent2'
        ,'高流量商务区':'collegeComponent2'
        ,'战狼区域':'collegeComponent2'
        ,'农贸市场':'collegeComponent2'
        ,'中小学':'collegeComponent2'
        ,'城中村':'collegeComponent2'
    };

    // 表格vue组件
    var tableComponents = {
        '全区域':'collegeTableComponent'
        ,'弱区':'weakAreaTableComponent'
        ,'上行低速区':'weakAreaTableComponent'
        ,'下行低速区':'weakAreaTableComponent'
        ,'关注区域':'collegeTableComponent'
        ,'扇区':'sectorTableComponent'
        ,'工单':'workOrderTableComponent'
        ,'骨头区域':'collegeTableComponent'
        // ,'高速':'collegeTableComponent'
        ,'高铁':'collegeTableComponent'
        // ,'市政路':'collegeTableComponent'
        ,'地铁':'collegeTableComponent'
        ,'高校':'collegeTableComponent'
        ,'场馆':'collegeTableComponent'
        ,'美食':'collegeTableComponent'
        ,'美景':'collegeTableComponent'
        ,'高密度住宅区':'collegeTableComponent'
        ,'高流量商务区':'collegeTableComponent'
        ,'战狼区域':'collegeTableComponent'
        ,'农贸市场':'collegeTableComponent'
        ,'中小学':'collegeTableComponent'
        ,'城中村':'collegeTableComponent'
    };
    // 日期vue组件
    var dayComponentArrs = {
        '月': 'monthComponent',
        '周': 'dayComponent',
        '日': 'dayComponent'
    }
    var dTmp = new Date();
    // 下午2点前
    if(dTmp.getHours()<14){
        dTmp.setDate(dTmp.getDate()-2);
    }else{
        dTmp.setDate(dTmp.getDate()-1);
    }
    // endDay = dTmp.format('yyyyMMdd');
    // var dayTmp = endDay.substring(0, 4) + "-" + endDay.substring(4, 6) + "-" + endDay.substring(6, 8);
    // var dateTmp = new Date(dayTmp);
    // dateTmp.setDate(dateTmp.getDate()-30);
    // dateTmp = dateTmp.format('yyyy-MM-dd');

    var startDayPar = '';
    var endDayPar = dTmp.format('yyyy-MM-dd');
    var startTime = new Date('2018-05-01');
    var currentDateBefore = dTmp.setDate(dTmp.getDate()-30);
    if(object_type == '工单'){
        startTime = new Date('2018-03-01');
        currentDateBefore = dTmp.setDate(dTmp.getDate()-180);
    }
    if(currentDateBefore < startTime){
        startDayPar = startTime.format('yyyy-MM-dd');
    }else{
        startDayPar = dTmp.format('yyyy-MM-dd');
    }


    // 统计导出vue对象
    IntelligentRoadTestChart.vm = new Vue({
        el: '#pc_listb_IntelligentRoadTestChartV2',
        data: {
            urlStartDay: startDayPar, // 开始时间
            urlEndDay: endDayPar, // 结束时间
            urlEndDay2: endDayPar, // 结束时间
            urlStartDayCom: startDayPar, // 缓存还没有通过日期组件修改的时间，切换统计周期的时候，需要把时间还原回去
            urlEndDayCom: endDayPar, // 缓存还没有通过日期组件修改的时间，切换统计周期的时候，需要把时间还原回去
            urlStartMonthCom: startDayPar.substring(0, 7), // 月份开始时间
            urlEndMonthCom: endDayPar.substring(0, 4) + "-" + endDayPar.substring(4, 6) , // 月份结束时间
            cityFlag: '', // 查询所用的地市，也用于地市列表中高亮显示当前地市
            titleCity: '',
            titleCountry: '',
            citys: citys, // 地市集合
            cityInfoShow: false, // 地市列表是否显示，默认不显示
            selectCity: '', // 当前地市
            cityDistrictMarket: null, // 数据库查回来的地市区县营服
            districts: [], //区县数组
            district: '全市', // 区县
            dIsShow: false, //区县下拉框是否显示
            marketbases: [], // 营服数组
            market: '全区', // 营服
            cityStr: '', // 表格标题显示区域信息
            isShowmarketbase: false, // 是否显示营服下拉
            statisticalObject: statisticalObject,  // 统计对象
            statistical: object_type, // 统计对象
            statisticalTab: '', // 表格标题显示的统计对象
            isShowStatistical: false, // 统计对象下拉框是否显示
            dateCycle: '日', // 周期，月、周、日
            whoChart: '', // 显示哪个图表vue组件
            whoChart2: '', // 显示哪个图表vue组件（区域图表）
            whoTable: '', // 显示哪个表格vue组件
            whoComponent: chartComponents, // 图表vue组件
            whoComponent2: chartComponents2, // 图表vue组件
            whoTableComponent: tableComponents, // 表格vue组件
            isShowLoading: true, // 是否显示loading
            bestOrsc: 'BEST', // 指标
            bestOrsc2: 'BEST', // 指标
            bestOrscText: [{text:'覆盖最优',value:'BEST'},{text:'主接入',value:'SC'},
                {text:'频段800M',value:'F800M'},{text:'频段1.8G',value:'F18G'},{text:'频段2.1G',value:'F21G'},{text:'频段2.6G',value:'F26G'}],
            thresholdVal: 105, // 分级覆盖率门限
            thresholdVal2: 105, // 分级覆盖率门限
            thresholds: [{text:115,value:115},{text:110,value:110},{text:105,value:105},{text:100,value:100},{text:95,value:95}],
            whichDate: 'dayComponent', // 日期组件
            whichDateArrs: dayComponentArrs, // 日期组件数组
            tableObj: {}, // 表格对象
            tableObj2: {}, // 表格对象
            tableObj3: {}, // 表格对象
            table: {}, // 表格对象
            table2: {}, // 表格对象
            table3: {}, // 表格对象
            workOrderType: '全部', // 工单类型
            dchecked: true, // ‘日’ 是否选中
            ddisabled: false, // ‘日’ 是否不可选
            wchecked: false,
            wdisabled: false,
            mchecked: false,
            mdisabled: false,
            chartObj: null, // 图表对象
            chartObj2: null, // 图表对象
            tableCount: 0, // 表格总数
            isExport: false, // 是否显示导出
            tableInfo: '', // 表格标题信息（总条数）
            tableInfo2: '', // 表格标题信息（总条数）
            tableInfo3: '', // 表格标题信息（总条数）
            tableDay: '', // 表格标题时间
            sectorExportIsShow: true, // 扇区表格导出按钮是否显示
            collegeChartId2: '',
            chartWrap: 'chartWrap',
            isShowChartSec: false,
            cityQuerystr: '',
            districtQuerystr: '',
            marketQuerystr: '全区',
            tabOptionsSector: ['营服','扇区','勘误'],// 扇区table页
        },
        methods: {
            // body 点击事件
            bodyClick(){
                this.cityInfoShow = false;
                this.dIsShow = false;
                this.isShowmarketbase = false;
                this.isShowStatistical = false;
                if($('#date-range9').data('dateRangePicker') != undefined){
                    $('#date-range9').data('dateRangePicker').close();
                }
            },
            // 显示城市列表
            showCityLists() {
                this.cityInfoShow = !this.cityInfoShow;
                this.dIsShow = false;
                this.isShowmarketbase = false;
                this.isShowStatistical = false;
            },
            // 选择城市
            changeCity(city, event) {
                if (city == '全省') {
                    this.selectCity = city
                } else if(city == '其他'){
                    this.selectCity = city;
                }else{
                    this.selectCity = city + '市';
                }
                this.district = '全市';
            },
            // 选择区县
            changeDistrict(d){
                this.district = d;
            },
            // 显示区县下拉
            showDistricts(){
                this.cityInfoShow = false;
                this.dIsShow = !this.dIsShow;
                this.isShowmarketbase = false;
                this.isShowStatistical = false;
            },
            // 选择营服
            changeMarketbase(d){
                this.market = d;
            },
            // 显示营服下拉
            showMarketbase(){
                this.cityInfoShow = false;
                this.dIsShow = false;
                this.isShowmarketbase = !this.isShowmarketbase;
                this.isShowStatistical = false;
            },
            // 显示统计对象下拉框
            showStatistical(){
                this.cityInfoShow = false;
                this.dIsShow = false;
                this.isShowmarketbase = false;
                this.isShowStatistical = !this.isShowStatistical;
            },
            // 统计对象下拉框对象点击事件
            statisticalClick(obj){
                this.statistical = obj;
            },
         // 确定按钮事件
            sureSubmit(){
                // echartUtil.reload();
                this.statisticalTab = this.statistical;
                if(this.dateCycle == '月'){
                    var start = $("#startTime").val();
                    var end = $("#endTime").val();
                    var m = echartUtil.monthMinus(start,end);
                    if(m >12){
                        alert('时间选择范围只能在12个月份内，请重新选择。');
                        return;
                    }
                }else{
                    // var nowDate = new Date();
                    // if(nowDate.getHours() >= 14){
                    //     this.urlEndDay = new Date(nowDate.getTime() - 1 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
                    // }else{
                    //     this.urlEndDay = new Date(nowDate.getTime() - 2 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd");
                    // }
                }
                IntelligentRoadTestChart.showLoading();
                // 表格标题区域信息
                tableDataProcessForVueComponent.tableTitleStr();
                this.whoChart = this.whoComponent[this.statistical];
                this.whoChart2 = this.whoComponent2[this.statistical];
                this.whoTable = this.whoTableComponent[this.statistical];
                $("#date-range9").text(this.urlStartDay + " - " + this.urlEndDay);

                this.tableDay = this.urlEndDay;
                this.urlEndDay2 = this.urlEndDay;
                this.titleCity = this.cityFlag;
                this.titleCountry = this.district;
                this.cityQuerystr = this.cityFlag;
                this.districtQuerystr = this.district;
                this.marketQuerystr = '全区';
                var _this = this;
                setTimeout(function () {
                    // 加载图表
                    echartUtil.loadChartData();
                    if(_this.statistical != '工单'){
                        echartUtil.loadChartData2();
                    }

                    // 加载表格
                    tableDataProcessForVueComponent.loadTable();

                },300)
            },
            // 表格导出
            tableExport(city){
                if(this.statistical == '工单'){
                    var thead = this.tableObj.thead.split(',');
                    var data = this.tableObj.Data.result;
                    tableDataProcessForVueComponent.workOrderTableExport(`${this.statistical}统计表`,`${this.statistical}统计表`,this.tableObj);
                }else{
                    var thead = this.tableObj.thead.split(',');
                    var data = this.tableObj.Data.result;
                    if(city == undefined){
                        tableDataProcessForVueComponent.tableExport(this.tableObj);
                    }else{
                        tableDataProcessForVueComponent.tableExport(this.tableObj);
                    }
                }
            },
            cellTableExp(str){
                tableDataProcessForVueComponent.tableExport(this.tableObj2,str);
            },
            kanwutableExport(str){
                tableDataProcessForVueComponent.tableExport(this.tableObj3,str);
            }

        },
        mounted(){
            // 获取区县营服
            IntelligentRoadTestChart.showLoading();
            var _this = this;
            // 获取区县营服
            getDistrictMarket().then(function(data){
                _this.cityDistrictMarket = initDistrictMarketbase(data);
                // 分权分域
                var cityPermission = $("#cityPermission_common").val();
                if(cityPermission == '全省'){
                    // _this.selectCity = city + '市';
                    _this.selectCity = '全省';
                }else{
                    _this.selectCity = city + '市';
                    citys = [city];
                    _this.citys = [city];
                    _this.changeCity(city);
                }
                // 加载组件
                _this.whoChart = _this.whoComponent[object_type];
                _this.whoChart2 = _this.whoComponent2[object_type];
                _this.whoTable = _this.whoTableComponent[object_type];

            }).then(function(){
                // 表格标题统计对象
                _this.statisticalTab = _this.statistical;
                // 表格标题时间
                _this.tableDay = _this.urlEndDay;
                _this.titleCity = _this.cityFlag;
                _this.titleCountry = _this.district;
                _this.cityQuerystr = _this.cityFlag;
                _this.districtQuerystr = _this.district;

                tableDataProcessForVueComponent.loadTable();
                echartUtil.loadChartData();
                if(_this.statistical != '工单'){
                    echartUtil.loadChartData2();
                }
                // 统计周期改变
                IntelligentRoadTestChart.changeSta(_this.statistical);
                // $(".btn-export").hide();
                $(".closeProgress").click(function(){
                    $(".progressBox").hide();
                });
            })
        },
        watch: {
            // 地市改变，同步区县下拉
            selectCity: function (val) {
                this.cityInfoShow = false;
                if (val != '全省' && val != '其他') {
                    this.cityFlag = val.substr(0, 2);
                    var districtKey = this.cityDistrictMarket[this.cityFlag];
                    var tmp = ['全市'];
                    for(key in districtKey){
                        tmp.push(key);
                    }
                    tmp.push('其他')
                    this.districts = tmp;
                } else if(val == '其他'){
                    this.cityFlag = val;
                    this.districts = ['全市','其他'];
                    this.market = '全区';
                    this.marketbases = [];
                }else{
                    this.cityFlag = val;
                    this.districts = [];
                    this.market = '全区';
                    this.marketbases = [];
                }
            },
            // 区县改变，同步营服下拉
            district: function (val) {
                this.dIsShow = false;
                this.market = '全区';
                if (val != '全市' && val != '其他') {
                    this.marketbases = this.cityDistrictMarket[this.cityFlag][val];
                    if(this.marketbases[0] != '全区'){
                        this.marketbases.splice(0, 0, '全区');
                    }
                    this.marketbases.push('其他');
                } else if(val == '其他'){
                    // this.market = '全区';
                    this.marketbases = ['全区','其他'];
                }else{
                    this.marketbases = [];
                }
            },
            // 营服改变
            market: function (val) {
                this.isShowmarketbase = false;
            },
            // 统计对象
            statistical: function (val,old) {
                // 统计周期改变
                IntelligentRoadTestChart.changeSta(val);
                var _this = this;
                setTimeout(function () {
                    var dTmp = new Date(_this.urlEndDay);
                    var startTime = new Date('2018-05-01');

                    // 如果结束时间小于5.1号
                    if(dTmp < startTime){
                        var d = new Date();
                        // 下午2点前
                        if(d.getHours()<14){
                            d.setDate(d.getDate()-2);
                        }else{
                            d.setDate(d.getDate()-1);
                        }
                        dTmp = d;
                        _this.urlEndDay = dTmp.format('yyyy-MM-dd');
                    }else{
                        _this.urlEndDay = _this.urlEndDayCom;
                    }
                    var startDayPar = '';
                    var endDayPar = _this.urlEndDay;
                    var currentDateBefore = dTmp.setDate(dTmp.getDate()-30);
                    if(_this.statistical == '工单'){
                        startTime = new Date('2018-03-01');
                        currentDateBefore = dTmp.setDate(dTmp.getDate()-180);
                    }
                    if(currentDateBefore < startTime){
                        startDayPar = startTime.format('yyyy-MM-dd');
                    }else{
                        startDayPar = dTmp.format('yyyy-MM-dd');
                    }
                    _this.urlStartDay = startDayPar;
                    // this.tableDay = endDayPar;
                    _this.urlStartDayCom = _this.urlStartDay;
                    _this.urlEndDayCom = _this.urlEndDay;
                },500)

            },
            // 统计周期
            dateCycle: function (val) {
                this.whichDate = this.whichDateArrs[val];
                if(val != '月'){
                    this.urlEndDay = this.urlEndDayCom;
                    this.urlStartDay = this.urlStartDayCom;
                }else{
                    this.urlStartDay = this.urlStartDayCom.substring(0, 7);
                    this.urlEndDay = this.urlEndDayCom.substring(0, 7);

                    var endDayTmp = new Date(this.urlEndDay);
                    var startDayTmp = new Date(this.urlStartDay);

                    endDayTmp.setMonth(endDayTmp.getMonth()-1);
                    if(endDayTmp >= startDayTmp){
                        this.urlEndDay = endDayTmp.format("yyyy-MM");
                    }
                }
            }
        }
    })
});
/**********************************
 * @funcname getDistrictMarket
 * @funcdesc 获取区县营服
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018/4/3 14:35
 * @modifier 
 * @modify 
 ***********************************/
function getDistrictMarket(){
    var promise = new Promise(function(resolve, reject) {
        var list1 = ["IntelligentRoadTestAnalysisV3_getDISTRICTNAME"];
        var progressBarSqls = [];
        progressBarSqls.push(list1);
        function initDistrictMarketbaseCallback(data) {
            resolve(data);
        }
        var functionlist = [initDistrictMarketbaseCallback];
        var database = [3];
        progressbarTwo.submitSql(progressBarSqls, functionlist,database);
    })
    return promise;
}
/**********************************
 * @funcname initDistrictMarketbase
 * @funcdesc 处理区县营服数据
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018/4/3 14:37
 * @modifier 
 * @modify 
 ***********************************/
function initDistrictMarketbase(data) {
    //数据结构为{"广州":{"天河":["棠下","上社"]}}
    var result = changeData(data);
    var city = "",district="",marketbase="";
    var districtArr = [];
    var districtObj = {};
    var selectDataChe = {};
    for(var i=0;i<result.length;i++){
        city = result[i].city_name;
        district=result[i].area_name;
        if(city == "肇庆"){
            if(district == "高新区"){
                district = "高新";
            }
        }
        marketbase=result[i].mkt_center_name;
        if(null== selectDataChe[city]){//city缓存的数据为null
            districtObj = {};
            var marketbaseArr=[];
            if(marketbase != '' && marketbase != null){
                if(null== selectDataChe[city]){
                    marketbaseArr.push(marketbase);//营服中心数组
                    districtObj[district]=marketbaseArr;//区县对象
                    selectDataChe[city]=districtObj;//缓存区县营服中心数据
                }else{
                    if($.inArray(marketbase,selectDataChe[city][district]) < 0){
                        marketbaseArr.push(marketbase);//营服中心数组
                        districtObj[district]=marketbaseArr;//区县对象
                        selectDataChe[city]=districtObj;//缓存区县营服中心数据
                    }
                }

            }
        }else{//city缓存的数据不为null
            districtObj=selectDataChe[city];//从缓存取该city的区县对象
            if(null==districtObj[district]){//如果区县对象为空，定义营服中心数组并加值，否则给区县对象的营服中心数据加值
                var marketbaseArr=[];
                if(marketbase != '' && marketbase != null){
                    if($.inArray(marketbase,selectDataChe[city][district]) < 0){
                        marketbaseArr.push(marketbase);//营服中心数组
                        districtObj[district]=marketbaseArr;
                    }
                }
            }else{
                //marketbaseArr=districtObj[district];
                //marketbaseArr.push(marketbase);//营服中心数组
                if(marketbase != '' && marketbase != null){
                    if($.inArray(marketbase,selectDataChe[city][district]) < 0){
                        districtObj[district].push(marketbase);
                    }
                }
            }
        }
    }
    return selectDataChe;
}
function changeData(data) {
    var result = data.result;
    var cloumns = data.columns;
    var resultArray = [];
    if(result ==undefined ||cloumns ==undefined){
        return resultArray;
    }
    for ( var i = 0; i < result.length; i++) {
        var rs = result[i];
        var dataRsult = {};
        for ( var j = 0; j < rs.length; j++) {
            //var dataC = JSON.stringify(cloumns[j]);
            var dataC = cloumns[j];
            var dataR = rs[j];
            dataRsult[dataC] = dataR;
        }
        resultArray.push(dataRsult);
    }
    return resultArray;
}
/**********************************
 * @funcname changeSta
 * @funcdesc 统计周期改变
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-05-15 11:07
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChart.changeSta = function (val) {
    if(val == '工单'){
        IntelligentRoadTestChart.vm.dateCycle = '日';
        IntelligentRoadTestChart.vm.wdisabled = true;
        IntelligentRoadTestChart.vm.wchecked = false;

        IntelligentRoadTestChart.vm.ddisabled = true;
        IntelligentRoadTestChart.vm.dchecked = true;

        IntelligentRoadTestChart.vm.mdisabled = true;
        IntelligentRoadTestChart.vm.mchecked = false;
    }else if($.inArray(val,['弱区','上行低速区','下行低速区']) > -1){
        IntelligentRoadTestChart.vm.dateCycle = '周';
        IntelligentRoadTestChart.vm.wdisabled = true;
        IntelligentRoadTestChart.vm.wchecked = true;

        IntelligentRoadTestChart.vm.ddisabled = true;
        IntelligentRoadTestChart.vm.dchecked = false;

        IntelligentRoadTestChart.vm.mdisabled = true;
        IntelligentRoadTestChart.vm.mchecked = false;
    }else{
        IntelligentRoadTestChart.vm.dateCycle = '日';
        IntelligentRoadTestChart.vm.wdisabled = false;
        IntelligentRoadTestChart.vm.wchecked = false;

        IntelligentRoadTestChart.vm.ddisabled = false;
        IntelligentRoadTestChart.vm.dchecked = true;

        IntelligentRoadTestChart.vm.mdisabled = false;
        IntelligentRoadTestChart.vm.mchecked = false;
    }
}

IntelligentRoadTestChart.showLoading = function () {
    $(".progressBox").show();
}
IntelligentRoadTestChart.hideLoading = function () {
    $(".progressBox").hide();
}



