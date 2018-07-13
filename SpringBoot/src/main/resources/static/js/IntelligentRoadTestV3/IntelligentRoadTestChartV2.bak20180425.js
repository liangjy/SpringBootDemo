var IntelligentRoadTestChart = {};

$(function () {
    var day = noceUtil.GetQueryString("day");
    var endDay = noceUtil.GetQueryString("endDay");
    var city = noceUtil.GetQueryString("mapCity");
    var country = noceUtil.GetQueryString("mapDistrict");
    var object_type = noceUtil.GetQueryString("senceName");

    // 图表vue组件
    let chartComponents = {
        '全区域':'allAreaComponent'
        ,'弱区':'weakAreaComponent'
        ,'关注区域':'concernAreaComponent'
        ,'扇区':'sectorComponent'
        ,'工单':'workOrderComponent'
        ,'骨头区域':'boneAreaComponent'
        ,'高速':'highSpeedComponent'
        ,'高铁':'highRailComponent'
        ,'市政路':'municipalRoadComponent'
        ,'地铁':'metroComponent'
        ,'高校':'collegeComponent'
        ,'场馆':'venueComponent'
        ,'美食':'foodComponent'
        ,'美景':'sceneComponent'
        ,'高密度住宅区':'highHomeComponent'
        ,'高流量商务区':'businessComponent'
        ,'战狼区域':'zlComponent'
        ,'农贸市场':'marketComponent'
    };

    // 表格vue组件
    let tableComponents = {
        '全区域':'allAreaTableComponent'
        ,'弱区':'weakAreaTableComponent'
        ,'关注区域':'concernAreaTableComponent'
        ,'扇区':'sectorTableComponent'
        ,'工单':'workOrderTableComponent'
        ,'骨头区域':'boneAreaTableComponent'
        ,'高速':'highSpeedTableComponent'
        ,'高铁':'highRailTableComponent'
        ,'市政路':'municipalRoadTableComponent'
        ,'地铁':'metroTableComponent'
        ,'高校':'collegeTableComponent'
        ,'场馆':'venueTableComponent'
        ,'美食':'foodTableComponent'
        ,'美景':'sceneTableComponent'
        ,'高密度住宅区':'highHomeTableComponent'
        ,'高流量商务区':'businessTableComponent'
        ,'战狼区域':'zlTableComponent'
        ,'农贸市场':'marketTableComponent'
    };

    /*// 天组件
    Vue.component('dayComponent',{
        template: '#dayTemplate',
        data(){
            return{
                isShow: '',
                st: '',
                et: ''
            }
        },
        methods: {
            changeSTime(){

            },
            changeETime(){

            }
        },
        mounted: function () {
            console.log(1)
            this.st = IntelligentRoadTestChart.vm.UrlStartDayCom;
            this.et = IntelligentRoadTestChart.vm.urlEndDayCom;
        }
    })

// 月份组件
    Vue.component('monthComponent',{
        template: '#monthTemplate',
        data(){
            return{
                // monthShow: false
            }
        },
        methods: {

        },
        mounted: function () {

        }
    })*/
    let dayComponentArrs = {
        '月': 'monthComponent',
        '周': 'dayComponent',
        '日': 'dayComponent'
    }
    let dayTmp = endDay.substring(0, 4) + "-" + endDay.substring(4, 6) + "-" + endDay.substring(6, 8);
    let dateTmp = new Date(dayTmp);
    dateTmp.setDate(dateTmp.getDate()-30);
    dateTmp = dateTmp.format('yyyy-MM-dd');

    IntelligentRoadTestChart.vm = new Vue({
        el: '#pc_listb_IntelligentRoadTestChartV2',
        data: {
            urlStartDay: dateTmp,
            urlEndDay: endDay.substring(0, 4) + "-" + endDay.substring(4, 6) + "-" + endDay.substring(6, 8),
            urlStartDayCom: dateTmp,
            urlEndDayCom: endDay.substring(0, 4) + "-" + endDay.substring(4, 6) + "-" + endDay.substring(6, 8),
            cityFlag: '',
            citys: ["全省","广州","韶关","深圳","珠海","汕头","佛山","江门","湛江","茂名","肇庆","惠州","梅州","汕尾","河源","阳江","清远","东莞","中山","潮州","揭阳","云浮"],
            cityInfoShow: false,
            selectCity: '',
            cityDistrictMarket: null,
            districts: [], //区县数组
            district: '全市', // 区县
            dIsShow: false, //区县下拉框是否显示
            marketbases: [], // 营服数组
            market: '全区', // 营服
            isShowmarketbase: false, // 是否显示营服下拉
            statisticalObject: ["全区域","弱区","关注区域","扇区","工单","骨头区域","高速","高铁","市政路",
                "地铁","高校","场馆","美食","美景","高密度住宅区","高流量商务区","战狼区域","农贸市场"],  // 统计对象
            statistical: object_type, // 统计对象
            isShowStatistical: false, // 统计对象下拉框是否显示
            dateCycle: '日', // 周期，月、周、日
            who: '', // 显示哪个图表vue组件
            whoTable: '', // 显示哪个表格vue组件
            whoComponent: chartComponents, // 图表vue组件
            whoTableComponent: tableComponents, // 表格vue组件
            isShowLoading: true,
            bestOrsc: 'BEST',
            thresholdVal: 105,
            monthShow: false,
            dayShow: true,
            whichDate: 'dayComponent',
            whichDateArrs: dayComponentArrs,
            tableObj: '',
            workOrderType: '全部',
            dchecked: true,
            ddisabled: true,
            wchecked: false,
            wdisabled: true,
            mchecked: false,
            mdisabled: true,
            chartObj: null


        },
        methods: {
            // body 点击事件
            bodyClick(){
                this.cityInfoShow = false;
                this.dIsShow = false;
                this.isShowmarketbase = false;
                this.isShowStatistical = false;
            },
            // 显示城市列表
            showCityLists() {
                this.cityInfoShow = !this.cityInfoShow;
            },
            // 选择城市
            changeCity(city, event) {
                if (city == '全省') {
                    this.selectCity = city
                } else {
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
                this.dIsShow = !this.dIsShow;
            },
            // 选择营服
            changeMarketbase(d){
                this.market = d;
            },
            // 显示营服下拉
            showMarketbase(){
                this.isShowmarketbase = !this.isShowmarketbase;
            },
            // 显示统计对象下拉框
            showStatistical(){
                this.isShowStatistical = !this.isShowStatistical;
            },
            // 统计对象下拉框对象点击事件
            statisticalClick(obj){
                this.statistical = obj;
            },
            // 确定按钮事件
            sureSubmit(){
                echartUtil.reload();
            },
            tableExport(){
                console.log(this.tableObj);
                let thead = this.tableObj.thead.split(',');
                let data = this.tableObj.Data.result;
                tableDataProcessForVueComponent.tableExport('x','x',this.tableObj);
                /*let thead = this.tableObj.thead.split(',');
                let data = this.tableObj.Data.result;
                tableDataProcessForVueComponent.tableExportByData('x','x',thead,data);*/
            }

        },
        mounted(){
            // 获取区县营服
            getDistrictMarket().then(data=>{
                this.cityDistrictMarket = initDistrictMarketbase(data);
                // 分权分域
                let cityPermission = $("#cityPermission_common").val();
                if(cityPermission == '全省'){
                    this.selectCity = city + '市';
                }else{
                    this.selectCity = city + '市';
                    this.citys = [city];
                    this.changeCity(city);
                }
                this.who = this.whoComponent[object_type];
                this.whoTable = this.whoTableComponent[object_type];
                // this.chartObj = echarts.init(document.getElementById('allRegionChart'))
            })
        },
        // 组件
        components: {
            // monthComponent,
            // dayComponent
        },
        watch: {
            // 地市改变，同步区县下拉
            selectCity: function (val) {
                this.cityInfoShow = false;
                if (val != '全省') {
                    this.cityFlag = val.substr(0, 2);
                    let districtKey = this.cityDistrictMarket[this.cityFlag];
                    let tmp = ['全市'];
                    for(key in districtKey){
                        tmp.push(key);
                    }
                    this.districts = tmp;
                } else {
                    this.cityFlag = val;
                    this.districts = [];
                    this.market = '全区';
                    this.marketbases = [];
                }
            },
            // 区县改变，同步营服下拉
            district: function (val) {
                this.dIsShow = false;
                if (val != '全市') {
                    this.marketbases = this.cityDistrictMarket[this.cityFlag][val];
                    this.marketbases.splice(0, 0, '全区');
                } else {
                    this.market = '全区';
                    this.marketbases = [];
                }
            },
            // 营服改变
            market: function (val) {
                this.isShowmarketbase = false;
            },
            // 统计对象
            statistical: function (val) {
                this.who = this.whoComponent[val];
                this.whoTable = this.whoTableComponent[val];
                this.isShowLoading = true;
                this.urlStartDay = this.urlStartDayCom;
                this.urlEndDay = this.urlEndDayCom;

                if(val == '工单'){
                    this.wdisabled = true;
                    this.wchecked = false;

                    this.ddisabled = true;
                    this.dchecked = true;

                    this.mdisabled = true;
                    this.mchecked = false;
                }else if(val == '弱区'){
                    this.wdisabled = true;
                    this.wchecked = true;

                    this.ddisabled = true;
                    this.dchecked = false;

                    this.mdisabled = true;
                    this.mchecked = false;
                }else{
                    this.wdisabled = false;
                    this.wchecked = false;

                    this.ddisabled = false;
                    this.dchecked = true;

                    this.mdisabled = false;
                    this.mchecked = false;
                }

            },
            dateCycle: function (val) {
                this.whichDate = this.whichDateArrs[val];
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
    let promise = new Promise((resolve, reject) => {
        var list1 = ["CustExpVsl_01_city_area_mkt_relation"];
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
    let selectDataChe = {};
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



