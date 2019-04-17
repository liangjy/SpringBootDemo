var IntelligentRoadTestChart = {};

$(function () {
    // 场景对象数组
    var statisticalObject = ["全区域","弱区","关注区域","扇区","工单","骨头区域",
        "高校","场馆","美食","美景","高密度住宅区","高流量商务区","战狼区域","农贸市场",
        "中小学","城中村","上行低速区","下行低速区","高速","高铁","市政路","地铁","MOD3干扰区","越区覆盖区","重叠覆盖区"];

    //,"高速","高铁","市政路","地铁","MOD3干扰区","越区覆盖区","重叠覆盖区"
    // url中的city
    var city = noceUtil.GetQueryString("mapCity");
    // url中的country
    var country = noceUtil.GetQueryString("mapDistrict");
    // url中的senceName，统计对象
    var object_type = noceUtil.GetQueryString("senceName");
    // 统计对象 为 宏扇区 时 是显示扇区组件
    if(object_type == '宏扇区'){
        object_type = '扇区';
    }else{
        // url 中的统计对象不存在场景对象数组时，显示全区域组件
        if($.inArray(object_type,statisticalObject)<0){
            object_type = '全区域';
        }
    }

    document.onkeydown=function(e){
        if( e.altKey  && e.ctrlKey && e.shiftKey && e.keyCode == 48  ){//shit + alt   + ctrl + 0
            // $(".btn-export").show();
            statisticalObject.push("高速","高铁","市政路","地铁","MOD3干扰区","越区覆盖区","重叠覆盖区");
        }
    }

    // 广东省地市
    var citys = ["全省","广州","韶关","深圳","珠海","汕头","佛山","江门","湛江","茂名","肇庆","惠州","梅州","汕尾","河源","阳江","清远","东莞","中山","潮州","揭阳","云浮",'其他'];

    // if(object_type == '扇区'){
    //     citys = citys.splice(1);
    // }
    // 图表1 vue组件
    var chartComponents = {
        '全区域':'collegeComponent'
        ,'弱区':'weakAreaComponent'
        ,'上行低速区':'weakAreaComponent'
        ,'下行低速区':'weakAreaComponent'
        ,'MOD3干扰区':'weakAreaComponent'
        ,'越区覆盖区':'weakAreaComponent'
        ,'重叠覆盖区':'weakAreaComponent'
        ,'关注区域':'collegeComponent'
        ,'扇区':'sectorComponent'
        ,'工单':'workOrderComponent'
        ,'骨头区域':'collegeComponent'
        ,'高速':'collegeComponent'
        ,'高铁':'highRailComponent'
        ,'市政路':'collegeComponent'
        ,'地铁':'metroComponent'
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
    // 图表2 vue组件
    var chartComponents2 = {
        '全区域':'collegeComponent2'
        ,'弱区':'weakAreaComponent2'
        ,'上行低速区':'weakAreaComponent2'
        ,'下行低速区':'weakAreaComponent2'
        ,'MOD3干扰区':'weakAreaComponent2'
        ,'越区覆盖区':'weakAreaComponent2'
        ,'重叠覆盖区':'weakAreaComponent2'
        ,'关注区域':'collegeComponent2'
        ,'扇区':'sectorComponent2'
        ,'骨头区域':'collegeComponent2'
        ,'高速':'collegeComponent2'
        ,'高铁':'highRailComponent2'
        ,'市政路':'collegeComponent2'
        // ,'地铁':'metroComponent2'
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
        ,'MOD3干扰区':'weakAreaTableComponent'
        ,'越区覆盖区':'weakAreaTableComponent'
        ,'重叠覆盖区':'weakAreaTableComponent'
        ,'关注区域':'collegeTableComponent'
        ,'扇区':'sectorTableComponent'
        ,'工单':'workOrderTableComponent'
        ,'骨头区域':'collegeTableComponent'
        ,'高速':'collegeTableComponent'
        ,'高铁':'highRailTableComponent'
        ,'市政路':'collegeTableComponent'
        ,'地铁':'metroTableComponent'
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

    // 开始日期
    var startDayPar = '';
    // 结束日期
    var endDayPar = dTmp.format('yyyy-MM-dd');
    // 默认取数日期从 2018-05-01 起
    var startTime = new Date('2018-05-01');
    // dTmp（结束日期） 的前 30天的日期
    var currentDateBefore = dTmp.setDate(dTmp.getDate()-30);
    // 默认取数日期从 2018-03-01 起
    if(object_type == '工单'){
        startTime = new Date('2018-03-01');
        currentDateBefore = startTime;
    }
    // dTmp（结束日期） 的前 30天的日期 在 2018-03-01或2018-05-01前面，则开始时间为 2018-03-01或2018-05-01，否则用dTmp（结束日期） 的前 30天的日期
    if(currentDateBefore <= startTime){
        startDayPar = startTime.format('yyyy-MM-dd');
    }else{
        startDayPar = dTmp.format('yyyy-MM-dd');
    }


    // 统计导出vue对象
    IntelligentRoadTestChart.vm = new Vue({
        el: '#pc_listb_IntelligentRoadTestChartV2',
        data: {
            urlStartDay: startDayPar, // 开始日期
            urlEndDay: endDayPar, // 结束日期
            urlEndDay2: endDayPar, // 结束日期（点击图表1后的日期）
            urlStartDayCom: startDayPar, // 缓存还没有通过日期组件修改的时间，切换统计周期的时候，需要把时间还原回去
            urlEndDayCom: endDayPar, // 缓存还没有通过日期组件修改的时间，切换统计周期的时候，需要把时间还原回去
            urlStartMonthCom: startDayPar.substring(0, 7), // 月份开始时间
            urlEndMonthCom: endDayPar.substring(0, 4) + "-" + endDayPar.substring(4, 6) , // 月份结束时间
            cityFlag: '', // 查询所用的地市，也用于地市列表中高亮显示当前地市
            titleCity: '', // 图表标题地市
            titleCountry: '',// 图表标题区县
            citys: citys, // 地市集合
            cityInfoShow: false, // 地市列表是否显示，默认不显示
            selectCity: '', // 当前地市
            cityDistrictMarket: null, // 数据库查回来的地市区县营服
            districts: [], // 区县数组
            districtsBak: [], // 区县数组
            district: '全市', // 区县
            dIsShow: false, // 区县下拉框是否显示
            marketbases: [], // 营服数组
            market: '全区', // 营服
            cityStr: '', // 表格标题显示区域信息
            isShowmarketbase: false, // 是否显示营服下拉
            statisticalObject: statisticalObject,  // 场景对象数组
            statistical: object_type, // 统计对象
            statisticalTab: '', // 表格标题显示的统计对象
            isShowStatistical: false, // 统计对象下拉框是否显示
            dateCycle: '日', // 周期，月、周、日
            whoChart: '', // 显示哪个图表1 vue组件
            whoChart2: '', // 显示哪个图表2 vue组件（区域图表）
            whoTable: '', // 显示哪个表格vue组件
            whoComponent: chartComponents, // 图表1 vue组件
            whoComponent2: chartComponents2, // 图表2 vue组件
            whoTableComponent: tableComponents, // 表格vue组件
            isShowLoading: true, // 是否显示loading
            bestOrsc: 'BEST', // 图表1指标
            bestOrsc2: 'BEST', // 图表2指标
            bestOrscText: [{text:'覆盖最优',value:'BEST'},{text:'主接入',value:'SC'},
                {text:'频段800M',value:'F800M'},{text:'频段1.8G',value:'F18G'},{text:'频段2.1G',value:'F21G'},{text:'频段2.6G',value:'F26G'}],
            thresholdVal: 105, // 分级覆盖率门限
            thresholdVal2: 105, // 分级覆盖率门限
            thresholds: [{text:115,value:115},{text:110,value:110},{text:105,value:105},{text:100,value:100},{text:95,value:95}],
            sence1: "综合",
            sence2: "综合",
            roadName: "贵广线",
            whichDate: 'dayComponent', // 日期组件
            whichDate2: 'dayComponent2', // 日期组件
            whichDateArrs: dayComponentArrs, // 日期组件数组
            tableObj: {}, // 表格1对象
            tableObj2: {}, // 表格2对象
            tableObj3: {}, // 表格3对象
            tableObj4: {}, // 表格4对象
            tableObj5: {}, // 表格5对象
            table: {}, // 表格1
            table2: {}, // 表格2
            table3: {}, // 表格3
            table4: {}, // 表格4
            table5: {}, // 表格5
            workOrderType: '全部', // 工单类型
            dchecked: true, // '日' 是否选中
            ddisabled: false, // '日' 是否不可选
            wchecked: false, // '周' 是否选中
            wdisabled: false, // '周' 是否不可选
            mchecked: false, // '月' 是否选中
            mdisabled: false, // '月' 是否不可选
            chartObj: null, // 图表1对象
            chartObj2: null, // 图表2对象
            tableCount: 0, // 表格总数
            isExport: false, // 是否显示导出
            tableInfo: '', // 表格1标题信息（总条数）
            tableInfo2: '', // 表格2标题信息（总条数）
            tableInfo3: '', // 表格3标题信息（总条数）
            tableInfo4: '', // 表格4标题信息（总条数）
            tableInfo5: '', // 表格5标题信息（总条数）
            tableDay: '', // 表格标题时间
            sectorExportIsShow: true, // 扇区表格导出按钮是否显示
            // collegeChartId2: '',
            // chartWrap: 'chartWrap',
            // isShowChartSec: false,
            cityQuerystr: '', // 地市（用于sql查询）
            districtQuerystr: '', // 区县（用于sql查询）
            marketQuerystr: '全区', // 营服（用于sql查询）
            tabOptionsSector: ['营服','扇区','勘误'],// 表格tab页
            isShowChart2: true, // 是否显示区域图表（中间的图表）
            screenWidth: document.body.clientWidth,
            screenHeight: document.body.clientHeight,
            isHideByHighRail: false, // 高铁时隐藏区县选择下拉框
            factory: '全部', // 图表1厂家
            factory2: '全部', // 图表2厂家
            numOrRate: '覆盖率', // 图表1 覆盖率/扇区基站数 下拉框
            isDisabled: false, // 图表1 规划最优（第一个下拉框） 是否可以选择
            numOrRate2: '覆盖率', // 图表1 覆盖率/扇区基站数 下拉框
            isDisabled2: false, // 图表2 规划最优（第一个下拉框） 是否可以选择
            sectorChart1LegendData: [], // 图表1 LegendData
            sectorChart2LegendData: [], // 图表2 LegendData
            sectorChart1Series: [], // 图表1 Series
            sectorChart2Series: [], // 图表2 LegendData
            isShowSelectA: false,
            distinctTitleStr: "各区县",
            marketTitleStr: "各营服"
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

                if(this.statistical == "扇区"){
                    this.tabOptionsSector = ['营服','扇区','勘误'];
                }else if(this.statistical == "高铁"){
                    if(this.dateCycle == "日"){
                        this.tabOptionsSector = ['线路','500米分段','隧道','非隧道'];
                    }else{
                        this.tabOptionsSector = ['线路','500米分段','弱连段','隧道','非隧道'];
                    }
                }else if(this.statistical == "地铁"){
                    this.tabOptionsSector = ['线路','TA段','站厅站台','站间段'];
                }else if($.inArray(this.statistical,["关注区域","骨头区域","高速","市政路"]) > -1){
                    this.tabOptionsSector = [];
                }else{
                    this.tabOptionsSector = ["AGPS-MR","全量MR综合","全量MR室外","全量MR室内"];
                }


                var _this = this;
                if($.inArray(_this.statistical,['工单','地铁']) < 0){
                    _this.isShowChart2 = true;
                }else{
                    _this.isShowChart2 = false;
                }

                if(this.titleCity == "全省"){
                    this.distinctTitleStr = "";
                    this.marketTitleStr = "各地市";
                }else if(this.titleCity != "全省" && this.titleCountry == "全市"){
                    this.distinctTitleStr = "";
                    this.marketTitleStr = "各区县";
                }else if(this.titleCity != "全省" && this.titleCountry != "全市"){
                    this.distinctTitleStr = this.titleCountry;
                    this.marketTitleStr = "各营服";
                }


                setTimeout(function () {
                    // 加载图表
                    echartUtil.loadChartData();
                    if($.inArray(_this.statistical,['工单','地铁']) < 0){
                        echartUtil.loadChartData2();
                    }

                    // 加载表格
                    tableDataProcessForVueComponent.loadTable();

                },300)
            },
            // 表格导出
            tableExport(tableObj,str){
                if(this.statistical == '工单'){
                    var thead = this.tableObj.thead.split(',');
                    var data = this.tableObj.Data.result;
                    tableDataProcessForVueComponent.workOrderTableExport(`${this.statistical}统计表`,`${this.statistical}统计表`,this.tableObj);
                }else{
                    var thead = this.tableObj.thead.split(',');
                    var data = this.tableObj.Data.result;
                    if(tableObj == undefined){
                        tableDataProcessForVueComponent.tableExport(this.tableObj);
                    }else{
                        tableDataProcessForVueComponent.tableExport(tableObj,str);
                    }
                }
            },
            //
            cellTableExp(str){
                tableDataProcessForVueComponent.tableExport(this.tableObj2,str);
            },
            kanwutableExport(str){
                tableDataProcessForVueComponent.tableExport(this.tableObj3,str);
            }

        },
        mounted(){
            // 高铁时隐藏区县选择下拉框
            if(this.statistical == "地铁"){
                this.isHideByHighRail = false;
            }else{
                this.isHideByHighRail = true;
            }
            var _this = this;
            window.onresize = function() {
                return (function() {
                    window.screenWidth = document.body.clientWidth
                    window.screenHeight = document.body.clientHeight
                    _this.screenWidth = window.screenWidth
                    _this.screenHeight = window.screenHeight
                })()
            }
            // 获取区县营服
            IntelligentRoadTestChart.showLoading();
            if(this.statistical == "扇区"){
                this.tabOptionsSector = ['营服','扇区','勘误'];
            }else if(this.statistical == "高铁"){
                if(this.dateCycle == "日"){
                    this.tabOptionsSector = ['线路','500米分段','隧道','非隧道'];
                }else{
                    this.tabOptionsSector = ['线路','500米分段','弱连段','隧道','非隧道'];
                }
            }else if(this.statistical == "地铁"){
                this.tabOptionsSector = ['线路','TA段','站厅站台','站间段'];
            }else if($.inArray(this.statistical,["全区域","关注区域","骨头区域","高速","市政路"]) > -1){
                this.tabOptionsSector = [];
            }else{
                this.tabOptionsSector = ["AGPS-MR","全量MR综合","全量MR室外","全量MR室内"];
            }

            // 获取区县营服
            getDistrictMarket().then(function(data){
                _this.cityDistrictMarket = initDistrictMarketbase(data);
                // 分权分域
                var cityPermission = $("#cityPermission_common").val();
                if(cityPermission == '全省'){
                    // _this.selectCity = city + '市';
                    _this.selectCity = '全省';
                    _this.distinctTitleStr = "";
                    _this.marketTitleStr = "各地市";
                }else{
                    // 区
                    var districtPermission = $("#district_common").val();
                    _this.selectCity = cityPermission + '市';
                    citys = [cityPermission];
                    _this.citys = [cityPermission];
                    _this.distinctTitleStr = "";

                    if(districtPermission != ""){
                        _this.district = districtPermission;
                        _this.districts = [districtPermission];
                        _this.distinctTitleStr = _this.district;
                        _this.marketTitleStr = "各营服";
                    }else{
                        _this.changeCity(cityPermission);
                        _this.marketTitleStr = "";
                        _this.marketTitleStr = "各区县";
                    }
                }
                // 加载组件
                _this.whoChart = _this.whoComponent[object_type];
                _this.whoChart2 = _this.whoComponent2[object_type];
                _this.whoTable = _this.whoTableComponent[object_type];
            }).then(function(){
                // 表格标题统计对象
                _this.statisticalTab = _this.statistical;
                if($.inArray(_this.statistical,['工单','地铁']) < 0){
                    _this.isShowChart2 = true;
                }else{
                    _this.isShowChart2 = false;
                }
                // 表格标题时间
                _this.tableDay = _this.urlEndDay;
                _this.titleCity = _this.cityFlag;
                _this.titleCountry = _this.district;
                _this.cityQuerystr = _this.cityFlag;
                _this.districtQuerystr = _this.district;

                tableDataProcessForVueComponent.loadTable();
                echartUtil.loadChartData();
                if($.inArray(_this.statistical,['工单','地铁']) < 0){
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
                var districtPermission = $("#district_common").val();
                if (val != '全省' && val != '其他') {
                    this.cityFlag = val.substr(0, 2);
                    var districtKey = this.cityDistrictMarket[this.cityFlag];
                    var tmp = ['全市'];
                    for(key in districtKey){
                        if(districtPermission != ""){
                            if(key == districtPermission){
                                tmp = [];
                                tmp.push(key);
                            }
                        }else{
                            tmp.push(key);
                        }
                    }
                    if(districtPermission == ""){
                        tmp.push('其他')
                    }
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
                this.districtsBak = JSON.parse(JSON.stringify(this.districts));
                if(this.statistical == "高铁"){
                    this.districts = [];
                    this.market = '全区';
                    this.marketbases = [];
                }else{
                    this.districts = this.districtsBak;
                    var districtPermission = $("#district_common").val();
                    if(this.districts.length > 0){
                        this.district = this.districts[0];
                    }else{
                        if(districtPermission !=""){
                            this.district = "全区";
                        }else{
                            this.district = "全市";
                        }
                    }
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
                if(val == "地铁"){
                    this.isHideByHighRail = false;
                }else{
                    this.isHideByHighRail = true;
                }
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
                        // currentDateBefore = dTmp.setDate(dTmp.getDate()-180);
                        currentDateBefore = startTime;
                    }
                    if(currentDateBefore <= startTime){
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
                    startDayTmp.setMonth(startDayTmp.getMonth()-12);
                    this.urlStartDay = startDayTmp.format("yyyy-MM");
                }
            },
            screenWidth (val) {
                this.screenWidth = val;
                this.chartObj.resize();
                if(this.chartObj2 != undefined){
                    this.chartObj2.resize();
                }

            },
            screenHeight (val) {
                this.screenHeight = val;
                this.chartObj.resize();
                if(this.chartObj2 != undefined){
                    this.chartObj2.resize();
                }
            },
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
    if($.inArray(val,['工单',"地铁"]) > -1){
        IntelligentRoadTestChart.vm.dateCycle = '日';
        IntelligentRoadTestChart.vm.wdisabled = true;
        IntelligentRoadTestChart.vm.wchecked = false;

        IntelligentRoadTestChart.vm.ddisabled = true;
        IntelligentRoadTestChart.vm.dchecked = true;

        IntelligentRoadTestChart.vm.mdisabled = true;
        IntelligentRoadTestChart.vm.mchecked = false;
    }else if($.inArray(val,['弱区','上行低速区','下行低速区','MOD3干扰区','越区覆盖区','重叠覆盖区']) > -1){
        IntelligentRoadTestChart.vm.dateCycle = '周';
        IntelligentRoadTestChart.vm.wdisabled = true;
        IntelligentRoadTestChart.vm.wchecked = true;

        IntelligentRoadTestChart.vm.ddisabled = true;
        IntelligentRoadTestChart.vm.dchecked = false;

        IntelligentRoadTestChart.vm.mdisabled = true;
        IntelligentRoadTestChart.vm.mchecked = false;
    }else if($.inArray(val,['高铁']) > -1){
        IntelligentRoadTestChart.vm.dateCycle = '日';
        IntelligentRoadTestChart.vm.wdisabled = false;
        IntelligentRoadTestChart.vm.wchecked = false;

        IntelligentRoadTestChart.vm.ddisabled = false;
        IntelligentRoadTestChart.vm.dchecked = true;

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
    if(IntelligentRoadTestChart.vm.statistical == "高铁"){
        IntelligentRoadTestChart.vm.districts = [];
        IntelligentRoadTestChart.vm.district = "全市";
        IntelligentRoadTestChart.vm.market = '全区';
        IntelligentRoadTestChart.vm.marketbases = [];
    }else{
        IntelligentRoadTestChart.vm.districts = IntelligentRoadTestChart.vm.districtsBak;
        var districtPermission = $("#district_common").val();
        if(IntelligentRoadTestChart.vm.districts.length > 0){
            IntelligentRoadTestChart.vm.district = IntelligentRoadTestChart.vm.districts[0];
        }else{
            if(districtPermission !=""){
                IntelligentRoadTestChart.vm.district = "全区";
            }else{
                IntelligentRoadTestChart.vm.district = "全市";
            }
        }
    }
}

IntelligentRoadTestChart.showLoading = function () {
    $(".progressBox").show();
}
IntelligentRoadTestChart.hideLoading = function () {
    $(".progressBox").hide();
}



