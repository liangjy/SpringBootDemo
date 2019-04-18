var IntelligentTuningStatisticalExport = {};

// 查询回来的图表数据
IntelligentTuningStatisticalExport.chartDataArr = [];


// 图表1数据数组
IntelligentTuningStatisticalExport.chart1DataObjArrs = [];

// 图表2数据数组
IntelligentTuningStatisticalExport.chart2DataObjArrs = [];

// 图表1数据对象数组，存放已经处理好的数据（图表的四个指标）
IntelligentTuningStatisticalExport.chart1DataObj = {};

// 图表2数据对象数组，存放已经处理好的数据（图表的四个指标）
IntelligentTuningStatisticalExport.chart2DataObj = {};

// 图表1 x轴
IntelligentTuningStatisticalExport.chart1Xdata = [];

// 图表2 x轴
IntelligentTuningStatisticalExport.chart2Xdata = [];

// 列表导出中的全部表头
IntelligentTuningStatisticalExport.tableAllTitle = ["地市名称","地市ID","区县","区县ID","营服中心","营服中心ID","基站ID","基站名称","小区ID","小区名称","覆盖范围最小经度","覆盖范围最小纬度","覆盖范围中心经度","覆盖范围中心纬度","覆盖范围最大经度","覆盖范围最大纬度","基站小区归属ID","覆盖范围内栅格数","弱覆盖区域集合","弱覆盖区域数","附近弱覆盖区域集合","附近弱覆盖区域数","4G切3G总次数","4G总流量","感知优良率按天平均值","4G用户数按天平均值","曾发生退服告警总次数","小区的服务状态","基站小区处理级别","预测GPS位置","预测百度地图位置","预测位置相差距离","坐标勘误优先值","支持的MR条数","设备厂商","最终排名累计值","方位角","频段映射","是否室内","机械下倾","电子下倾","天线挂高","验收状况","基站站址","基站位置GPS","是否为NB_IOT","最小用户体验上行平均速率(Mbps)","最小用户体验下行平均速率(Mbps)","PCI","小区功率","总下倾角","包含AGPS的MR条数","包含AGPS的MR与小区平均距离","包含AGPS的MR与小区每TA平均距离","预测角度","偏离角度","支持方位角预测条数","站间距","是否越区覆盖","越区覆盖MR条数","越区覆盖占比","越覆盖TOP3邻区","全量MR条数","是否重叠覆盖","重叠覆盖MR量","重叠覆盖度","重叠覆盖TOP3邻区","是否模三干扰覆盖","模三干扰覆盖MR量","模三干扰占比","模三干扰TOP3邻区","越区是否新增","重叠是否新增","模三是否信息","越区栅格数","重叠栅格数","模三栅格数","全量4G用户数","参考信号功率","模三干扰模0覆盖MR量","模三干扰模1覆盖MR量","模三干扰模2覆盖MR量","小区在邻区出现次数","模三干扰邻区模0覆盖MR量","模三干扰邻区模1覆盖MR量","模三干扰邻区模2覆盖MR量","是否天馈接反","低CQI占比","越区最终排名累计值","重叠最终排名累计值","模三最终排名累计值","重叠覆盖AGPS-MR量","模三干扰覆盖AGPS-MR量","各站间距AGPS数量","各站间距AGPS-栅格总数","各站间距AGPS-弱栅格总数","各站间距AGPS-弱MR条数","各站间距围AGPS-RSRP之和","各站间距AGPS-下行速率之和","是否存在弱覆盖","关联弱区日期","关联弱区ID集合","弱覆盖区域总栅格数","弱覆盖区域弱栅格数","弱覆盖区域覆盖率","弱覆盖区域RSRP均值","弱覆盖区域下行速率","周围AGPS-MR条数","周围AGPS-栅格总数","周围AGPS-弱栅格总数","周围AGPS-MR覆盖率","周围AGPS-RSRP均值","周围AGPS-下行速率","下行低速率区域集合","下行低速率区域个数","附近下行低速率区域集合","附近下行低速率区域个数","模三区域集合","模三区域个数","附近模三区域集合","附近模三区域个数","重叠区域集合","重叠区域个数","附近重叠区域集合","附近模三区域个数","越区区域集合","越区区域个数","附近越区区域集合","附近越区区域个数","问题类型ID","问题类型","调整实施状态","各站间距AGPS数量","各站间距AGPS-栅格总数","各站间距AGPS-弱栅格总数","各站间距AGPS-弱MR条数","各站间距围AGPS-RSRP之和","各站间距AGPS-下行速率之和","天馈接反建议修改基站号","天馈接反建议修改小区号","经度","纬度","下行带宽","重叠覆盖区域轮廓百度经纬度","重叠区域总栅格数","重叠区域弱栅格数","重叠区域覆盖率","重叠区域RSRP均值","重叠区域下行速率","越区覆盖区域轮廓百度经纬度","越区覆盖区域总栅格数","越区覆盖区域弱栅格数","越区覆盖区域覆盖率","越区覆盖区域RSRP均值","越区覆盖区域下行速率","弱覆盖区域轮廓百度经纬度","智能调优方案ID","智能调优工单ID"];
IntelligentTuningStatisticalExport.taskTableTitle = ["调优方案标识","调优方案编码","调优方案关联ID","地市名称","地市ID","区县","营服中心","工单单号","区域归属ID","基站ID_小区ID","小区名称","厂家","频点","方位角","是否室内","基站小区百度经度","基站小区百度纬度","基站小区GPS经度","基站小区GPS纬度","问题类型ID","问题类型","优化方案","处理方式","生成时间","确认单生成时间","确认单位","确认部门","确认人员","确认时间","确认结果","确认说明","集团执行结果","集团执行开始时间","集团执行结束时间","系统评估结果","系统评估开始时间","系统评估结束时间","调整实施状态","问题处理优先值"];


// 数组求和
Array.prototype.sum = function (){
    return this.reduce(function (partial, value){
        return partial + value;
    })
};

$(function () {
    // 场景对象数组
    var statisticalObjectArrs = ["全部","天馈接反","坐标勘误","下倾角勘误","越区覆盖", "弱覆盖","重叠覆盖","MOD3干扰"];

    //,"高速","高铁","市政路","地铁","MOD3干扰区","越区覆盖区","重叠覆盖区"
    // url中的city
    var city = noceUtil.GetQueryString("mapCity");
    // url中的country
    var country = noceUtil.GetQueryString("mapDistrict");
    // url中的senceName，统计对象
    var object_type = noceUtil.GetQueryString("senceName");

    // 问题类型默认为全部
    if($.inArray(object_type,statisticalObjectArrs)<0){
        object_type = '全部';
    }

    // 智能调优统计导出vue实例对象
    IntelligentTuningStatisticalExport.vm = new Vue({
        el: "#pc_listb_IntelligentTuningStatisticalExport",
        data: {
            // 结束日期（格式：20181030）
            queryDay: '',
            // 开始日期（格式：20181001）
            queryStartDay: '',
            // 带横杠的结束日期（格式：2018-10-30）
            queryDayFormat: '',
            // 带横杠的开始日期（格式：2018-10-01）
            queryStartDayFormat: '',
            //点击日期趋势图的日期
            dayByClickChart1: '2',
            // 地市下拉框数据
            citys: ["全省","广州","韶关","深圳","珠海","汕头","佛山","江门","湛江","茂名","肇庆","惠州","梅州","汕尾","河源","阳江","清远","东莞","中山","潮州","揭阳","云浮",'其他'],
            // 当前地市
            selectCity: '',
            // 区县列表数据
            districts: [],
            // 地市列表中高亮显示当前地市
            cityFlag: '',
            // 列表查询用到的地市
            queryCity: '',
            // 列表标题中的地市
            titleCity: '',
            // 列表数据总数
            tableCount: 0,
            // 列表数据总数
            orderTableCount: 0,
            // 列表查询用到的区县
            queryDistrict: '全市',
            // 选择的区县
            district: '全市',
            // 列表标题中的区县
            titleDistrict: '',
            // 列表查询用到的营服
            queryMktcenter: '全区',
            // 列表标题中的营服
            titleMktcenter: '',
            // 区县下拉框是否显示
            dIsShow: false,
            // 查询回来的地市区县营服
            cityDistrictMarket: [],
            // 问题类型（顶部下拉框用）
            statistical: object_type,
            // 查询用到的问题类型
            queryStatistical: '',
            // 问题类型数组
            statisticalObjectArrs: statisticalObjectArrs,
            // 图表1对象
            chartObj: null,
            // 图表2对象
            chartObj2: null,
            // 小区表格
            cellTable: null,
            // 工单表格
            orderTable: null,
            // 小区表格tableObject
            cellTableObj: null,
            // 工单表格tableObject
            orderTableObj: null,
            // 地市列表是否显示，默认不显示
            cityInfoShow: false,
            // 统计对象下拉框是否显示
            isShowStatistical: false,
            // 屏幕宽高值，用于监听浏览器窗口大小改变，resize图表
            screenWidth: document.body.clientWidth,
            screenHeight: document.body.clientHeight,
            // 方案派单数（图表1标题显示）
            task_create_count_title: 0,
            // 方案受理数（图表1标题显示）
            accept_count_title: 0,
            // 执行成功数（图表1标题显示）
            execute_count_title: 0,
            // 成功解决数（图表1标题显示）
            resolve_count_title: 0,
            // 是否显示列表导出按钮（全省全部问题类型时不显示）
            isShowTable: true,
            tabOptions: ["小区","工单"],
            tabOptionIdx: 0,
            status: "全部",
            taskId: "",
            isFromOrderTable: false
        },
        mounted(){
            // 取表FRT_ZNTY_CELL_OPTI_TASK_D的最新日期
            IntelligentTuningStatisticalExportQueryUtil.getMaxDay();

            // 获取区县营服
            IntelligentTuningStatisticalExportQueryUtil.getDistrictMarket();

            if(this.statistical != '全部'){
                this.queryStatistical = this.statistical;
            }

            setTimeout(function () {
                // 初始化图表
                IntelligentTuningStatisticalExportChartUtil.initChart();

                // 区域图表x轴
                IntelligentTuningStatisticalExportChartUtil.getChart2XData();

                // 获取图表数据
                IntelligentTuningStatisticalExportQueryUtil.getChartData();

                // 获取列表数据
                IntelligentTuningStatisticalExportQueryUtil.getTableData();

                // 根据判断是否是全省和全部问题类型来是否显示列表导出按钮
                IntelligentTuningStatisticalExport.isShowTable();

                IntelligentTuningStatisticalExportCrossFilterUtil.isFirst = false;


            }.bind(this),500)

            var _this = this;
            window.onresize = function() {
                return (function() {
                    window.screenWidth = document.body.clientWidth
                    window.screenHeight = document.body.clientHeight
                    _this.screenWidth = window.screenWidth
                    _this.screenHeight = window.screenHeight
                })()
            }

            $(".closeProgress").click(function(){
                $(".progressBox").hide();
            });
        },
        methods: {
            // 确认点击事件
            sureSubmit(){

                this.queryCity = this.cityFlag;
                this.titleCity = this.cityFlag;
                this.titleDistrict = this.district;
                this.queryDistrict = this.district;
                this.queryStatistical = this.statistical;

                if(this.district == '全市'){
                    this.titleDistrict = '';
                }

                if(this.statistical == '全部'){
                    this.queryStatistical = '';
                }

                this.dayByClickChart1 = this.queryDay;
                IntelligentTuningStatisticalExport.isShowTable();
                // IntelligentTuningStatisticalExportCrossFilterUtil.isFirst = true;
                IntelligentTuningStatisticalExportChartUtil.initChart();

                this.status = "全部";
                this.taskId = "";
                setTimeout(function () {

                    IntelligentTuningStatisticalExportChartUtil.getChart2XData();

                    var city = this.cityFlag;
                    var country = this.district;
                    var statistical = this.statistical;
                    if(city == '全省'){
                        city = null;
                    }
                    if(country == '全市'){
                        country = null;
                    }
                    if(statistical == '全部'){
                        statistical = null;
                    }
                    // 处理图表1数据
                    IntelligentTuningStatisticalExportCrossFilterUtil.chart1handler(null,city,country,null,statistical);

                    // 处理图表2数据
                    IntelligentTuningStatisticalExportCrossFilterUtil.chart2handler(this.queryDayFormat,city,country,null,statistical);

                    // 图表数据处理，图表渲染
                    IntelligentTuningStatisticalExportChartUtil.chartDataHandler();

                    // 获取列表数据
                    IntelligentTuningStatisticalExportQueryUtil.getTableData(this.queryDay,city,country,null,statistical);
                }.bind(this),300)

            },
            // body 点击事件
            bodyClick(){
                this.cityInfoShow = false;
                this.dIsShow = false;
                this.isShowStatistical = false;
                if($('#date-range9').data('dateRangePicker') != undefined){
                    $('#date-range9').data('dateRangePicker').close();
                }
            },
            // 显示城市列表
            showCityLists() {
                this.cityInfoShow = !this.cityInfoShow;
                this.dIsShow = false;
                this.isShowStatistical = false;
            },
            // 选择城市
            changeCity(city, event) {
                if (city == '全省') {
                    this.selectCity = city
                } else if(city == '其他'){
                    this.selectCity = city;
                }else{
                    this.selectCity = city;
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
                this.isShowStatistical = false;
            },
            // 显示统计对象下拉框
            showStatistical(){
                this.cityInfoShow = false;
                this.dIsShow = false;
                this.isShowStatistical = !this.isShowStatistical;
            },
            // 统计对象下拉框对象点击事件
            statisticalClick(obj){
                this.statistical = obj;
            },
            tableExport(val){
                if(val == "order"){
                    IntelligentTuningStatisticalExportQueryUtil.orderTableExport("order");
                }else{
                    IntelligentTuningStatisticalExportQueryUtil.tableExport();
                }
            },
            chartExport(which){
                IntelligentTuningStatisticalExportQueryUtil.chartExport(which);

            }

        },
        watch: {
            // 地市改变，同步区县下拉
            selectCity: function (val) {
                this.cityInfoShow = false;
                if (val != '全省' && val != '其他') {
                    this.cityFlag = val.substr(0, 2);
                    var districtKey = this.cityDistrictMarket[this.cityFlag];
                    var tmp = ['全市'];
                    for (key in districtKey) {
                        tmp.push(key);
                    }
                    tmp.push('其他')
                    this.districts = tmp;
                } else if (val == '其他') {
                    this.cityFlag = val;
                    this.districts = ['全市', '其他'];
                } else {
                    this.cityFlag = val;
                    this.districts = [];
                }
            },
            // 区县改
            district: function (val) {
                this.dIsShow = false;
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
            tabOptionIdx(val){
                setTimeout(()=>{
                    if(0 == val){
                        this.cellTable.resizeWidht(this.cellTableObj);
                    }else if(1 == val){
                        this.orderTable.resizeWidht(this.orderTableObj);
                    }
                },500)
            },
            status(val){
                this.isFromOrderTable = true;
                setTimeout(() => {
                    IntelligentTuningStatisticalExportQueryUtil.loadOrderTable(this.dayByClickChart1,this.titleCity,this.titleDistrict,this.titleMktcenter,this.queryStatistical,val,this.taskId);
                    this.isFromOrderTable = false;
                },500)
            },
            taskId(val){
                this.isFromOrderTable = true;
                setTimeout(() => {
                    IntelligentTuningStatisticalExportQueryUtil.loadOrderTable(this.dayByClickChart1,this.titleCity,this.titleDistrict,this.titleMktcenter,this.queryStatistical,this.status,val);
                    this.isFromOrderTable = false;
                },500)
            }
        }
    })
})

/**********************************
 @funcname IntelligentTuningStatisticalExport.isShowTable
 @funcdesc 根据判断是否是全省和全部问题类型来是否显示列表导出按钮
 @param
 @return {datatype}
 @author laijunbao
 @create 2018-11-02-0002 15:10
 @modifier
 @modify
 ***********************************/
IntelligentTuningStatisticalExport.isShowTable = function () {
    var city = IntelligentTuningStatisticalExport.vm.titleCity;
    var statistical = IntelligentTuningStatisticalExport.vm.queryStatistical;

    if(city == '全省' && statistical == ''){
        IntelligentTuningStatisticalExport.vm.isShowTable = false;
    }else{
        IntelligentTuningStatisticalExport.vm.isShowTable = true;
    }
}
