/*林楚佳初始化数据以及数据查询的js*/

/**
 * ********************************
 * @funcname IntelligentTuning.getSectorMaxDay
 * @funcdesc 获取到3.171表的最新日期
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.getSectorMaxDay = function () {
    var sqlList = [];
    var list = ["AntAdj_00_GetMaxDayFrom_FRT_AGPS_PC_ENB_D"];
    sqlList.push(list);
    var funcList = [IntelligentTuning.dealSectorMaxDay];
    var database = [3];
    progressbarTwo.submitSql(sqlList, funcList, database);
}

/**
 * ********************************
 * @funcname IntelligentTuning.dealSectorMaxDay
 * @funcdesc 处理查询最大天数的回调函数
 * @param {Object} data : 查询返回的结果
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.dealSectorMaxDay = function IntelligentTuning_dealSectorMaxDay(data) {
    var result = callBackChangeData(data);
    if (result.length > 0) {
        IntelligentTuning.day = result[0].day;
        $("#lastUpdateTime").text(IntelligentTuning.day);
        /*这里需要增加一个逻辑，判断是否url上有day的参数*/
        var obj = IntelligentTuning.checkUrlIsHasMessage(); //这里返回一个带有url上的日期参数的对象
        if(obj != null && obj.day != null && obj.day != ''){
            IntelligentTuning.day = obj.day;
            //并且在这里进行进入指定扇区的详情页
            setTimeout(function(){ //延迟1秒钟执行，防止进入小芳第一次加载图层的回调
                IntelligentTuning.sectorVM.showMessage(obj ,null);
            },1000);
        }
        $("#seachTime").text(IntelligentTuning.day);
        IntelligentTuning.firstInitData(); //初始化扇区数据
    } else {
        alert("无法获取到扇区表的最新日期，请反馈给后台进行核查");
    }
}

/**
 * ********************************
 * @funcname IntelligentTuning.firstInitData
 * @funcdesc 第一次加载时初始化数据的方法
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.firstInitData = function IntelligentTuning_firstInitData() {

    var city = "";
    if (IntelligentTuning.cityPermission_common == "全省") {
        var cityForUrl = noceUtil.GetQueryString("city"); //这里需要检测一下url上是否带有地市参数，如果有要按照url上的参数进行设置
        if(isnull(cityForUrl)){
            city = "广州";
        }else{
            city = cityForUrl;
            $("#sectorCityName").text(cityForUrl);
        }
    } else {
        city = IntelligentTuning.cityPermission_common;
    }
    IntelligentTuning.queryAllSectorData(IntelligentTuning.day, city,"topMap"); //调用查询获取到所有的扇区数据

}

/**
 * ********************************
 * @funcname IntelligentTuning.queryAllSectorData
 * @funcdesc 根据日期和地市查询该地市的所有扇区数据
 * @param {String/int} day 日期  {String} city  地市名称 ； {String} mapType ： 表示使用哪个百度地图  ，topMap表示页面上半部分的地图
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.queryAllSectorData = function (day, city,mapType) {
    if(!IntelligentTuning.isScreen){
        if(day == IntelligentTuning.currentQueryDay && city == IntelligentTuning.currentQueryCity){ //查询条件一致，无需重新查询
            return;
        }
    }else{//分屏状态查询所有扇区
        if(mapType=="topMap"){
            if(day+city==IntelligentTuningScreen.allSectorTopChe){
                return;
            }
            IntelligentTuningScreen.allSectorTopChe=day+city;
            $("#loadingDivTop").show();
        }else if(mapType=="bottomMap"){
            if(day+city==IntelligentTuningScreen.allSectorBottomChe){
                return;
            }
            IntelligentTuningScreen.allSectorBottomChe=day+city;
            $("#loadingDivBottom").show();
        }
    }
    IntelligentTuning.allSectorCheData = [];//这个变量用于存储查询出来的某天某地市的所有扇区信息
    var city_id = noceUtil.city_LATN_ID[city];
    if(city_id == null){ //地市ID为空
        alert("无法获取到地市ID，请检查传入的参数是否正确!");
        return;
    }
    var sqlList = [];
    var funcList=[];
    var database=[];
    var params=[];
    if(IntelligentTuningMap.firstLoad){//初始化加载有问题的小区
        var list1 = ["AntAdj_02_GetAllCells", "DAY:" + day, "CITY_ID:" + city_id];//, "PROBLEM_NAME:" + " and PROBLEM_NAME is not null and PROBLEM_NAME <> ''"
        list1.push("PROBLEM_NAME: "+'and sys_status != "已归档"\n' +
            '\t\tand (IS_ANT_CONN_ABNOR=1 OR\n' +
            '\t\t\t\t\tIS_LOCA_ABNOR=1 OR\n' +
            '\t\t\t\t\tis_decl_angle_abnor=1 OR\n' +
            '\t\t\t\t\tIS_CB_COV=1 OR\n' +
            '\t\t\t\t\tIS_EXIST_POOR__AREA=1 OR\n' +
            '\t\t\t\t\tIS_OL_COV=1 OR\n' +
            '\t\t\t\t\tIS_M3_COV=1)');
        sqlList.push(list1);
        funcList.push(IntelligentTuning.firstProblemSectorData);
        database.push(3);
        params.push([]);
    }
    //这里要做一下判断，如果当前是处于显示所有扇区则需要查询所有的数据，如果是第一次进来或者当前所处的是某个问题类型的扇区，则要调用其他查询
    if((IntelligentTuning.currentProblemName == null || IntelligentTuning.currentProblemName == '') && IntelligentTuningMap.firstLoad == false){ //查询所有的扇区
        var list2= ["AntAdj_02_GetAllCells", "DAY:" + day, "CITY_ID:" + city_id, "PROBLEM_NAME: "];
    }else{//第一次加载的时候，虽然IntelligentTuning.currentProblemName == null，但是还是不需要加载全量数据的
        var list2= ["AntAdj_02_GetAllProblemCells", "DAY:" + day, "CITY_ID:" + city_id]; //查询所有的问题小区
        IntelligentTuning.getAllSectorAfterQuery(day , city_id);// 这里还要偷偷查询一下全量数据
    }

    sqlList.push(list2);
    funcList.push(IntelligentTuning.dealAllSectorData);
    database.push(3);
    params.push([mapType]);
    progressbarTwo.submitSql(sqlList, funcList, database,params);
    if(!IntelligentTuning.isScreen){//如果分屏对比，不进行缓存//IntelligentTuningMap.firstLoad
        if(!IntelligentTuningMap.firstLoad){
            $("#loadingDiv").show();//显示正在加载的框框
        }
        IntelligentTuning.currentQueryCity = city; //记录当前的查询地市
        IntelligentTuning.currentQueryDay = day; //记录当前的查询时间
    }
}

/**
 * ********************************
 * @funcname IntelligentTuning.getAllSectorAfterQuery
 * @funcdesc 查询某天某地市的全量扇区数据
 * @param {int/String} day ： 查询的日期
 *        {int} city_id ： 地市ID
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.getAllSectorAfterQuery = function (day ,city_id){
    var sqlList = [];
    var list = ["AntAdj_02_GetAllCells" , "DAY:" + day , "CITY_ID:" + city_id];
    sqlList.push(list);
    var funcList = [IntelligentTuning.dealAllSectorAfterQuery];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database);
}

/**
 * ********************************
 * @funcname IntelligentTuning.dealAllSectorAfterQuery
 * @funcdesc 处理查询返回的全量扇区数据，主要做的就是将数据赋值给一个全局变量即可，后面这个全局变量有用到，在切换显示全部扇区的时候可以将数据拿出来用
 * @param {Object} data : 查询返回的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.dealAllSectorAfterQuery = function IntelligentTuning_dealAllSectorAfterQuery(data){
    var result = callBackChangeData(data);
    // console.log(result);
    IntelligentTuning.allSectorCheData = result; //将数据缓存到变量
}

/**
 * ********************************
 * @funcname IntelligentTuning.firstProblemSectorData
 * @funcdesc 应用一开始加载，地图只显示有问题的小区
 * @param {Object} data ： 查询有问题的小区返回的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.firstProblemSectorData = function IntelligentTuning_dealAllSectorData(data,params) {
    var result = callBackChangeData(data);
    IntelligentTuning.currentProblemName=null;
    IntelligentTuningMap.listProblem=null;//重置为null，只有当用户点列表进去的时候才赋值，或者返回的时候才重新赋值
    var tempResult=IntelligentTuning.filtSectorByProblem(result);
    IntelligentTuningMap.handleCovSectorData(tempResult,"topMap");//渲染扇区图层
}

/**
 * ********************************
 * @funcname IntelligentTuning.queryProblemListByCity
 * @funcdesc 查询出某个地市的所有有问题的扇区地图数据
 * @param {int} city_id :地市的ID  {String} day : 日期
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.queryProblemListByCity = function(city_id , day){
    var sqlList = [];
    var list = ["AntAdj_02_GetAllCells", "DAY:" + day, "CITY_ID:" + city_id];//, "PROBLEM_NAME:" + " and PROBLEM_NAME is not null and PROBLEM_NAME <> ''"
    list.push("PROBLEM_NAME: "+'and sys_status != "已归档"\n' +
        '\t\tand (IS_ANT_CONN_ABNOR=1 OR PROBLEM_NAME=\'天馈接反\' OR\n' +
        '\t\t\t\t\tPRED_DISTANCE>1000 OR PROBLEM_NAME=\'坐标勘误\' OR\n' +
        '\t\t\t\t\tIS_CB_COV=1 OR PROBLEM_NAME=\'越区覆盖\' OR\n' +
        '\t\t\t\t\tIS_EXIST_POOR__AREA=1 OR PROBLEM_NAME=\'弱覆盖\' OR\n' +
        '\t\t\t\t\tIS_OL_COV=1 OR PROBLEM_NAME=\'重叠覆盖\' OR\n' +
        '\t\t\t\t\tIS_M3_COV=1 OR PROBLEM_NAME=\'MOD3干扰\')')
    sqlList.push(list);
    var funcList = [IntelligentTuning.firstProblemSectorData];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database);
}


/**
 * ********************************
 * @funcname IntelligentTuning.dealAllSectorData
 * @funcdesc 处理查询返回的扇区数据
 * @param {Object} data ： 查询返回的数据
 * @param {Arry} params ： 地图类型
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.dealAllSectorData = function IntelligentTuning_dealAllSectorData(data,params) {
    var result = callBackChangeData(data);
    //1、分屏对比时，不需要显示列表，只渲染地图即可；2、用户点击了只查询可视范围的小区按钮
    if(IntelligentTuning.isScreen){
        // var tempResult=IntelligentTuning.filtSectorByProblem(result);
        IntelligentTuningMap.handleCovSectorData(result,params[0]);//渲染扇区图层
        $("#loadingDiv").hide();//隐藏加载数据的框框
    }else{
        // console.log(result);
        IntelligentTuning.sectorResult = result; //将数据缓存起来
        if(IntelligentTuning.currentProblemName == null || IntelligentTuning.currentProblemName == "" ){//这时候查询的已经是全量数据了，不需要再查询一次，直接把结果赋值给存放数据的变量
            IntelligentTuning.allSectorCheData = result;
        }
        var tempResult=IntelligentTuning.filtSectorByProblem(result); //过滤出当前所属问题的所有扇区数据并赋值给全局变量 IntelligentTuning.sectorCurrentMapResult。可以直接取这个变量的值去渲染扇区图层
        IntelligentTuning.sectorCurrentMapResult = tempResult;
        if(!IntelligentTuningMap.firstLoad){
            IntelligentTuningMap.handleCovSectorData(IntelligentTuning.sectorCurrentMapResult,params[0]);//渲染扇区图层
            $("#loadingDiv").hide();//隐藏加载数据的框框
        }
        IntelligentTuning.filtSectorByArea(IntelligentTuning.sectorCurrentMapResult); //获取到当前列表的值
        IntelligentTuning.excuteFilterSector();//将值进行过滤排序之后渲染到页面上 分类筛选和排序
    }
}


/**
 * ********************************
 * @funcname IntelligentTuning.filtSectorByProblem
 * @funcdesc 根据问题类型筛选出所属的问题类型的所有扇区
 * @param {Array} result : 需要过滤的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.filtSectorByProblem = function IntelligentTuning_filtSectorByProblem(result) {
    var tempResult = [];//作为一个中间的数据缓存
    //定义对象维度
    var temoFilterObj = crossfilter([]);
    temoFilterObj.add(result);

    var objFilter = temoFilterObj.dimension(function (d) {
        return d
    }); //创建维度
    var selectElement = IntelligentTuning.currentProblemName;
    if (selectElement == null || selectElement == "") { //所有的扇区
        objFilter.filter(function(d){
            if(d.cb_is_new == 1 || d.ol_is_new == 1 || d.m3_is_new == 1){
                d.is_new = true;
            }
            return d;
        });
    } else {

        if(selectElement == "方位角勘误"){
            selectElement = "天馈接反";
        }

        objFilter.filter(function (d) { //过滤出所属的问题的扇区
            d.is_new = false; //先将is_new字段先置为false
            if (d.sys_status != "已归档") {
                if(selectElement == "天馈接反" ){
                   if(d.problem_name == selectElement || d.is_ant_conn_abnor == 1){ //IS_ANT_CONN_ABNOR=1 OR PROBLEM_NAME=‘天馈接反’
                        return d;
                   }
                }

                if(selectElement == "坐标勘误" ){
                    if(d.problem_name == selectElement || d.is_loca_abnor == 1){ //IS_LOCA_ABNOR = 1 OR PROBLEM_NAME=‘坐标勘误’
                        return d;
                    }
                }

                if(selectElement == "越区覆盖"){
                    if(d.problem_name == selectElement || d.is_cb_cov == 1){ //IS_CB_COV=1 OR PROBLEM_NAME=‘越区覆盖’
                        if(d.cb_is_new == 1){ //是否是越区新增
                            d.is_new = true;
                        }
                        return d;
                    }
                }

                if(selectElement == "重叠覆盖"){
                    if(d.problem_name == selectElement || d.is_ol_cov == 1){ //IS_OL_COV=1 OR PROBLEM_NAME=‘重叠覆盖’
                        if(d.ol_is_new == 1){ //是否是重叠新增
                            d.is_new = true;
                        }
                        return d;
                    }
                }

                if(selectElement == "MOD3干扰"){
                    if(d.problem_name == selectElement || d.is_m3_cov == 1){ //IS_M3_COV=1 OR PROBLEM_NAME=‘MOD3干扰’
                        if(d.m3_is_new == 1){ //是否是MOD3新增
                            d.is_new = true;
                        }
                        return d;
                    }
                }

                if(selectElement == "弱覆盖"){
                    if(d.problem_name == selectElement || d.is_exist_poor__area == 1){ //IS_EXIST_POOR__AREA=1 OR PROBLEM_NAME=‘弱覆盖’
                        return d;
                    }
                }

                if(selectElement == "下倾角勘误"){
                    if(d.problem_name == selectElement || d.is_decl_angle_abnor == 1){ //is_decl_angle_abnor=1 OR PROBLEM_NAME=‘下倾角勘误’
                        return d;
                    }
                }
            }
        });
    }
    tempResult = objFilter.top(result.length);
    return tempResult;
    temoFilterObj.remove();

}

/**
 * ********************************
 * @funcname IntelligentTuning.filtSectorByArea
 * @funcdesc 根据区域信息筛选出列表的数据
 * @param {Arrayu} result : 需要过滤的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.filtSectorByArea = function IntelligentTuning_filtSectorByArea(result) {

    var tempResult = [];//作为一个中间的数据缓存
    //定义对象维度
    var temoFilterObj = crossfilter([]);
    temoFilterObj.add(result);

    var city = $("#sectorCityName").text();
    var country = $("#sectorDistrictName").text();
    var mktcenter = $("#sectorMktName").text();

    var objFilter = temoFilterObj.dimension(function (d) {
        return d
    }); //创建维度

    if (city != null && country == "全市") { //当前问题下的全市数据
        objFilter.filter();
    } else if (city != null && country != "全市" && mktcenter == "全区") { //当前问题下的某个区县的数据
        objFilter.filter(function (d) { //过滤出所属的问题的扇区
            if (d.country == country) {
                return d;
            }
        });
    } else if (city != null && country != "全市" && mktcenter != "全区") { //当前问题下的某个营服中心的数据
        objFilter.filter(function (d) { //过滤出所属的问题的扇区
            if (d.country == country && d.mktcenter == mktcenter) {
                return d;
            }
        });
    }
    tempResult = objFilter.top(result.length);
    IntelligentTuning.sectorCurrentResult = tempResult; //赋值给当前列表数据的变量 这个是当前列表的数据
    IntelligentTuning.sectorAreaListChe = tempResult; //赋值这个保存着某个区域范围内的扇区数据 ，这个用于分类筛选
    temoFilterObj.remove();

}

/**
 * ********************************
 * @funcname IntelligentTuning.filterByMapBounds
 * @funcdesc 根据左下角和右上角两个点来筛选扇区数据
 * @param {Object} minPoint:左下角的点对象  存放最小经纬度  {Object} maxPoint:右上角的点对象  存放最大经纬度
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.filterByMapBounds = function (minPoint, maxPoint) {

    //参数判断是否为空
    if (isNotNullOrEmpty(minPoint) && isNotNullOrEmpty(maxPoint)) {
        var result = IntelligentTuning.sectorResult;
        var tempResult = [];//作为一个中间的数据缓存
        //定义对象维度
        var temoFilterObj = crossfilter([]);
        temoFilterObj.add(result);

        var objFilter = temoFilterObj.dimension(function (d) {
            return d
        }); //创建维度

        objFilter.filter(function (d) { //过滤出属于这片区域的所有扇区
            if (d.latitude_mid_baidu < maxPoint.lat && d.latitude_mid_baidu > minPoint.lat && d.longitude_mid_baidu < maxPoint.lng && d.longitude_mid_baidu > minPoint.lng) {
                return d;
            }
        });

        tempResult = objFilter.top(result.length);
        IntelligentTuning.sectorAreaListChe = tempResult; //将区域的扇区列表赋值为过滤出来的数据
        temoFilterObj.remove();
    } else {
        alert("传入参数错误，请检查一下参数");
    }

}

/**********************************
 * @funcname IntelligentTuning.sectorFilter
 * @funcdesc 扇区的筛选方法
 * @param {Array} result {Array} conditionArr
 result : 这里的result表示所属当前问题类型的所有扇区的数据
 conditionArr : 表示扇区的筛选条件
 * @return {Object}
 * @author 林楚佳
 * @create 20180515
 * @modifier
 * @modify
 ***********************************/
IntelligentTuning.sectorFilter = function (result, conditionArr) {

    var currentSector = IntelligentTuning.currentProblemName; //获取当前所在的扇区的类型
    var problemName = "";
    if(currentSector == "方位角勘误"){
        problemName = "天馈接反";
    }else{
        problemName = currentSector;
    }
    var tempResult = [];//作为一个中间的数据缓存
    //定义对象维度
    var temoFilterObj = crossfilter([]);
    temoFilterObj.add(result);

    var objFilter = temoFilterObj.dimension(function (d) {
        return d.belong_area_id
    }); //区域类型
    var selectElement = conditionArr[0];
    if (selectElement == "不限") {
        objFilter.filter();
    } else {
        objFilter.filter(selectElement);
    }

    tempResult = objFilter.top(result.length);
    var temoFilterObj1 = crossfilter(tempResult);
    var objFilter1 = temoFilterObj1.dimension(function (d) {
        return d.cell_state
    }); //扇区状态
    selectElement = conditionArr[1];
    if (selectElement == "不限") {
        objFilter1.filter();
    } else {
        objFilter1.filter(selectElement);
    }

    tempResult = objFilter1.top(result.length);
    var temoFilterObj2 = crossfilter(tempResult);
    var objFilter2 = temoFilterObj2.dimension(function (d) {
        return d.bs_vendor
    }); //设备厂商
    selectElement = conditionArr[2];
    if (selectElement == "不限") {
        objFilter2.filter();
    } else {
        objFilter2.filter(selectElement);
    }

    tempResult = objFilter2.top(result.length);
    var temoFilterObj3 = crossfilter(tempResult);
    var objFilter3 = temoFilterObj3.dimension(function (d) {
        return d
    }); //室内外
    selectElement = conditionArr[3];
    objFilter3.filter(function (d) {

        if (selectElement == "不限") {
            return d;
        } else if (selectElement == "室内") {
            if (d.is_indoor == "室内") {
                return d;
            }
        } else if (selectElement == "室外") {
            if (d.is_indoor == "室外") {
                return d;
            }
        } else if (selectElement == "其他") {
            if (d.is_indoor != "室内" && d.is_indoor != "室外") {
                return d;
            }
        }

    });

    tempResult = objFilter3.top(result.length);
    var temoFilterObj4 = crossfilter(tempResult);
    var objFilter4 = temoFilterObj4.dimension(function (d) {
        return d.band_mapping
    });  //使用频段
    selectElement = conditionArr[4];
    if (selectElement == "不限") {
        objFilter4.filter();
    } else {
        var band_mapping = 1;
        if (selectElement == "800M") {
            band_mapping = 1;
        } else if (selectElement == "1.8G") {
            band_mapping = 2;
        } else if (selectElement == "2.1G") {
            band_mapping = 3;
        } else if (selectElement == "2.6G") {
            band_mapping = 4;
        }
        objFilter4.filter(band_mapping);
    }


    tempResult = objFilter4.top(result.length);
    var temoFilterObj5 = crossfilter(tempResult);
    var objFilter5 = temoFilterObj5.dimension(function (d) {
        return d
    });  //是否新增
    selectElement = conditionArr[5];
    if (selectElement == "不限") {
        objFilter5.filter();
    } else {
        objFilter5.filter(
            function (d) {
                if (problemName == "MOD3干扰") { //MOD3干扰扇区
                    if (selectElement == "是") {
                        if (d.m3_is_new == 1) { //筛选出新增的
                            return d;
                        }
                    } else {
                        if (d.m3_is_new != 1) { //不是新增
                            return d;
                        }
                    }
                } else if (problemName == "重叠覆盖") { //重叠覆盖扇区
                    if (selectElement == "是") {
                        if (d.ol_is_new == 1) { //筛选出新增的
                            return d;
                        }
                    } else {
                        if (d.ol_is_new != 1) { //不是新增
                            return d;
                        }
                    }
                }else if(problemName == "越区覆盖"){ //越区覆盖扇区
                    if(selectElement == "是"){
                        if(d.cb_is_new == 1){ //筛选出新增的
                            return d;
                        }
                    } else {
                        if (d.cb_is_new != 1) { //不是新增
                            return d;
                        }
                    }
                }else if(problemName == "天馈接反"){ //天馈接反扇区
                    if(selectElement == "是"){
                        if(d.ant_conn_abnor_is_new == 1){ //筛选出新增的
                            return d;
                        }
                    } else {
                        if (d.ant_conn_abnor_is_new != 1) { //不是新增
                            return d;
                        }
                    }
                }else if(problemName == "坐标勘误"){ //坐标勘误扇区
                    if(selectElement == "是"){
                        if(d.loca_abnor_is_new == 1){ //筛选出新增的
                            return d;
                        }
                    } else {
                        if (d.loca_abnor_is_new != 1) { //不是新增
                            return d;
                        }
                    }
                }else if(problemName == "弱覆盖"){ //弱覆盖扇区
                    if(selectElement == "是"){
                        if(d.poor_cov_is_new == 1){ //筛选出新增的
                            return d;
                        }
                    } else {
                        if (d.poor_cov_is_new != 1) { //不是新增
                            return d;
                        }
                    }
                } else if(problemName == "下倾角勘误"){ //下倾角勘误扇区
                    if(selectElement == "是"){
                        if(d.decl_angle_abnor_is_new == 1){ //筛选出新增的
                            return d;
                        }
                    } else {
                        if (d.decl_angle_abnor_is_new != 1) { //不是新增
                            return d;
                        }
                    }
                }else { //普通扇区不需要做过滤
                    return d;
                }
            }
        );
    }


    tempResult = objFilter5.top(result.length);
    var temoFilterObj6 = crossfilter(tempResult);
    var objFilter6 = temoFilterObj6.dimension(function (d) {
        return d
    });  //MR数量限制条件
    selectElement = conditionArr[6];
    if (selectElement == 0) {
        objFilter6.filter();
    } else {
        objFilter6.filter(
            function (d) {
                if (currentSector == "MOD3干扰") { //MOD3干扰扇区
                    if (d.all_mr_count >= selectElement) {
                        return d;
                    }
                } else if (currentSector == "重叠覆盖") { //重叠覆盖扇区
                    if (d.all_mr_count >= selectElement) {
                        return d;
                    }
                } else if (currentSector == "越区覆盖") { //越区覆盖扇区
                    if (d.agps_mr_count >= selectElement) {
                        return d;
                    }
                } else { //普通扇区不需要做过滤
                    return d;
                }
            }
        );
    }
    if(currentSector != "坐标勘误" && currentSector != "方位角勘误"){ //只有坐标勘误和方位角勘误才有else分支的过滤
        tempResult = objFilter6.top(result.length);
        var temoFilterObj10 = crossfilter(tempResult);
        var objFilter10 = temoFilterObj10.dimension(function (d) {
            return d
        });  //是否派单
        selectElement = conditionArr[11];
        if(currentSector != null && currentSector != ''){ //如果不是显示全部扇区的话，那就需要加上 d.problem_name == problemName
            if (selectElement == "不限") {
                objFilter10.filter(function(d){
                    if(d.task_id != null && d.task_id != '' && d.problem_name == problemName){ //已派单
                        d.isPD = true;
                    }else{
                        d.isPD = false;
                    }
                    return d;
                });
            }else{
                if(selectElement == "是"){
                    objFilter10.filter(function(d){
                        if(d.task_id != null && d.task_id != '' && d.problem_name == problemName){ //已派单
                            d.isPD = true;
                            return d;
                        }
                    });
                }else{
                    objFilter10.filter(function(d){
                        if(d.task_id == null || d.task_id == '' || d.problem_name != problemName ){ //未派单
                            d.isPD = false;
                            return d;
                        }
                    });
                }
            }
        }else{ //当前显示的是所有扇区
            if (selectElement == "不限") {
                objFilter10.filter(function(d){
                    if(d.task_id != null && d.task_id != ''){ //已派单
                        d.isPD = true;
                    }else{
                        d.isPD = false;
                    }
                    return d;
                });
            }else{
                if(selectElement == "是"){
                    objFilter10.filter(function(d){
                        if(d.task_id != null && d.task_id != ''){ //已派单
                            d.isPD = true;
                            return d;
                        }
                    });
                }else{
                    objFilter10.filter(function(d){
                        if(d.task_id == null || d.task_id == ''){ //未派单
                            d.isPD = false;
                            return d;
                        }
                    });
                }
            }
        }

        /*派单状态*/
        tempResult = objFilter10.top(result.length);
        var temoFilterObj11 = crossfilter(tempResult);
        var objFilter11 = temoFilterObj11.dimension(function (d) {
            return d;
        });
        selectElement = conditionArr[12];
        if(selectElement == "不限"){
            objFilter11.filter();
        }else{
            objFilter11.filter(function(d){
                if(d.sys_status == selectElement){
                    return d;
                }
            });
        }

        /*派单门限*/
        tempResult = objFilter11.top(result.length);
        var temoFilterObj12 = crossfilter(tempResult);
        var objFilter12 = temoFilterObj12.dimension(function (d) {
            return d;
        });
        selectElement = conditionArr[10];
        if(selectElement == "不限"){
            objFilter12.filter();
        }else{
            objFilter12.filter(function(d){
                if (problemName == "MOD3干扰") { //MOD3干扰扇区
                    if (selectElement == "满足") {
                        if (d.is_m3_cov == 1) { //筛选出满足派单的
                            return d;
                        }
                    } else {
                        if (d.is_m3_cov != 1) { //不满足
                            return d;
                        }
                    }
                } else if (problemName == "重叠覆盖") { //重叠覆盖扇区
                    if (selectElement == "满足") {
                        if (d.is_ol_cov == 1) { //筛选出满足派单的
                            return d;
                        }
                    } else {
                        if (d.is_ol_cov != 1) { //不满足
                            return d;
                        }
                    }
                }else if(problemName == "越区覆盖"){ //越区覆盖扇区
                    if(selectElement == "满足"){
                        if(d.is_cb_cov == 1){ //筛选出满足派单的
                            return d;
                        }
                    } else {
                        if (d.is_cb_cov != 1) { //不满足
                            return d;
                        }
                    }
                }else if(problemName == "天馈接反"){ //天馈接反扇区
                    if(selectElement == "满足"){
                        if(d.is_ant_conn_abnor == 1){ //筛选出满足派单的
                            return d;
                        }
                    } else {
                        if (d.is_ant_conn_abnor != 1) { //不满足派单的
                            return d;
                        }
                    }
                }else if(problemName == "坐标勘误"){ //坐标勘误扇区
                    if(selectElement == "满足"){
                        if(d.is_loca_abnor == 1){ //筛选出满足派单的
                            return d;
                        }
                    } else {
                        if (d.is_loca_abnor != 1) { //不满足的
                            return d;
                        }
                    }
                }else if(problemName == "弱覆盖"){ //弱覆盖扇区
                    if(selectElement == "满足"){
                        if(d.is_exist_poor__area == 1){ //筛选出满足派单的
                            return d;
                        }
                    } else {
                        if (d.is_exist_poor__area != 1) { //不是派单的
                            return d;
                        }
                    }
                }else if(problemName == "下倾角勘误"){ //下倾角勘误扇区
                    if(selectElement == "满足"){
                        if(d.is_decl_angle_abnor == 1){ //筛选出满足派单的
                            return d;
                        }
                    } else {
                        if (d.is_decl_angle_abnor != 1) { //不是派单的
                            return d;
                        }
                    }
                } else { //普通扇区不需要做过滤
                    return d;
                }
            });
        }

        return objFilter12;
    }else{

        /*距离偏差*/
        tempResult = objFilter6.top(result.length);
        var temoFilterObj7 = crossfilter(tempResult);
        var objFilter7 = temoFilterObj7.dimension(function (d) {
            return d
        });  //MR数量限制条件
        selectElement = conditionArr[7];
        if (selectElement == 0) {
            objFilter7.filter();
        } else {
            objFilter7.filter(
                function (d) {
                    if(currentSector != "坐标勘误"){
                        return d;
                    }
                    if(selectElement=="不限"){
                        return d;
                    }else if(selectElement=="1公里以内"){
                        if(d.pred_distance<=1000){
                            return d;
                        }
                    }else if(selectElement=="1-3公里"){
                        if(d.pred_distance>=1000&&d.pred_distance<=3000){
                            return d;
                        }
                    }else if(selectElement=="3公里以外"){
                        if(d.pred_distance>3000){
                            return d;
                        }
                    }
                }
            );
        }

        /*方位角偏差*/
        tempResult = objFilter7.top(result.length);
        var temoFilterObj8 = crossfilter(tempResult);
        var objFilter8 = temoFilterObj8.dimension(function (d) {
            return d
        });  //MR数量限制条件
        selectElement = conditionArr[8];
        if (selectElement == 0) {
            objFilter8.filter();
        } else {
            objFilter8.filter(
                function (d) {
                    if(currentSector != "方位角勘误"){
                        return d;
                    }
                    if(selectElement=="不限"){
                        return d;
                    }else if(selectElement=="15°以内"){
                        if(d.pred_azimuth_diff<15){
                            return d;
                        }
                    }else if(selectElement=="15°到30°"){
                        if(d.pred_azimuth_diff>=15&&d.pred_azimuth_diff<=30){
                            return d;
                        }
                    }else if(selectElement=="30°以上"){
                        if(d.pred_azimuth_diff>30){
                            return d;
                        }
                    }
                }
            );
        }

        /*天馈接反*/

        tempResult = objFilter8.top(result.length);
        var temoFilterObj9 = crossfilter(tempResult);
        var objFilter9 = temoFilterObj9.dimension(function (d) {
            return d
        });  //MR数量限制条件
        selectElement = conditionArr[9];
        if (selectElement == 0) {
            objFilter9.filter();
        } else {
            objFilter9.filter(
                function (d) {
                    if(selectElement=="不限"){
                        return d;
                    }else if(selectElement=="是"){
                        if(d.is_ant_conn_abnor == 1){
                            return d;
                        }
                    }else{
                        if(d.is_ant_conn_abnor != 1){
                            return d;
                        }
                    }
                }
            );
        }
        tempResult = objFilter9.top(result.length);
        var temoFilterObj10 = crossfilter(tempResult);
        var objFilter10 = temoFilterObj10.dimension(function (d) {
            return d
        });  //是否派单
        selectElement = conditionArr[11];
        if (selectElement == "不限") {
            objFilter10.filter(function(d){
                if(d.task_id != null && d.task_id != '' && d.problem_name == problemName){ //已派单
                    d.isPD = true;
                }else{
                    d.isPD = false;
                }
                return d;
            });
        }else{
            if(selectElement == "是"){
                objFilter10.filter(function(d){
                    if(d.task_id != null && d.task_id != '' && d.problem_name == problemName){ //已派单
                        d.isPD = true;
                        return d;
                    }
                });
            }else{
                objFilter10.filter(function(d){
                    if(d.task_id == null || d.task_id == '' || d.problem_name != problemName ){ //未派单
                        d.isPD = false;
                        return d;
                    }
                });
            }
        }
        /*派单状态*/
        tempResult = objFilter10.top(result.length);
        var temoFilterObj11 = crossfilter(tempResult);
        var objFilter11 = temoFilterObj11.dimension(function (d) {
            return d;
        });
        selectElement = conditionArr[12];
        if(selectElement == "不限"){
            objFilter11.filter();
        }else{
            objFilter11.filter(function(d){
                if(d.sys_status == selectElement){
                    return d;
                }
            });
        }

        /*派单门限*/
        tempResult = objFilter11.top(result.length);
        var temoFilterObj12 = crossfilter(tempResult);
        var objFilter12 = temoFilterObj12.dimension(function (d) {
            return d;
        });
        selectElement = conditionArr[10];
        if(selectElement == "不限"){
            objFilter12.filter();
        }else{
            objFilter12.filter(function(d){
                if (problemName == "MOD3干扰") { //MOD3干扰扇区
                    if (selectElement == "满足") {
                        if (d.is_m3_cov == 1) { //筛选出满足派单的
                            return d;
                        }
                    } else {
                        if (d.is_m3_cov != 1) { //不满足
                            return d;
                        }
                    }
                } else if (problemName == "重叠覆盖") { //重叠覆盖扇区
                    if (selectElement == "满足") {
                        if (d.is_ol_cov == 1) { //筛选出满足派单的
                            return d;
                        }
                    } else {
                        if (d.is_ol_cov != 1) { //不满足
                            return d;
                        }
                    }
                }else if(problemName == "越区覆盖"){ //越区覆盖扇区
                    if(selectElement == "满足"){
                        if(d.is_cb_cov == 1){ //筛选出满足派单的
                            return d;
                        }
                    } else {
                        if (d.is_cb_cov != 1) { //不满足
                            return d;
                        }
                    }
                }else if(problemName == "天馈接反"){ //天馈接反扇区
                    if(selectElement == "满足"){
                        if(d.is_ant_conn_abnor == 1){ //筛选出满足派单的
                            return d;
                        }
                    } else {
                        if (d.is_ant_conn_abnor != 1) { //不满足派单的
                            return d;
                        }
                    }
                }else if(problemName == "坐标勘误"){ //坐标勘误扇区
                    if(selectElement == "满足"){
                        if(d.is_loca_abnor == 1){ //筛选出满足派单的
                            return d;
                        }
                    } else {
                        if (d.is_loca_abnor != 1) { //不满足的
                            return d;
                        }
                    }
                }else if(problemName == "弱覆盖"){ //弱覆盖扇区
                    if(selectElement == "满足"){
                        if(d.is_exist_poor__area == 1){ //筛选出满足派单的
                            return d;
                        }
                    } else {
                        if (d.is_exist_poor__area != 1) { //不是派单的
                            return d;
                        }
                    }
                } else if(problemName == "下倾角勘误"){ //下倾角勘误扇区
                    if(selectElement == "满足"){
                        if(d.is_decl_angle_abnor == 1){ //筛选出满足派单的
                            return d;
                        }
                    } else {
                        if (d.is_decl_angle_abnor != 1) { //不是派单的
                            return d;
                        }
                    }
                }else { //普通扇区不需要做过滤
                    return d;
                }
            });
        }

        return objFilter12;
    }

}


//扇区排序
$("#sectorSort ul li").click(function () {
    $(this).addClass("selected").siblings().removeClass("selected");
    $("#sectorSort .select-info").hide();
    var text = this.innerHTML;
    $("#sectorSort span")[0].innerHTML = text;
    IntelligentTuning.tempSectorFliterObj = crossfilter([]);
    var data = IntelligentTuning.sectorCurrentResult; //这里需要拿列表的数据进行排序
    IntelligentTuning.tempSectorFliterObj.add(data);
    if (text == "推荐排序") {
        if (IntelligentTuning.sectorObj.name == "sector") {
            var sectorFilter = IntelligentTuning.tempSectorFliterObj.dimension(function (d) {
                return d.orderno_tot
            });
        } else if (IntelligentTuning.sectorObj.name == "m3Sector") {
            var sectorFilter = IntelligentTuning.tempSectorFliterObj.dimension(function (d) {
                return d.m3_orderno_tot
            });
        } else if (IntelligentTuning.sectorObj.name == "olSector") {
            var sectorFilter = IntelligentTuning.tempSectorFliterObj.dimension(function (d) {
                return d.ol_orderno_tot
            });
        } else if (IntelligentTuning.sectorObj.name == "cbSector") {
            var sectorFilter = IntelligentTuning.tempSectorFliterObj.dimension(function (d) {
                return d.cb_orderno_tot
            });
        }
    } else if (text == "下切优先") {
        var sectorFilter = IntelligentTuning.tempSectorFliterObj.dimension(function (d) {
            return d.lte_to_3g_tot
        });
    } else if (text == "流量优先") {
        var sectorFilter = IntelligentTuning.tempSectorFliterObj.dimension(function (d) {
            return d.flow_4g_tot
        });
    } else if (text == "感知优先") {
        var sectorFilter = IntelligentTuning.tempSectorFliterObj.dimension(function (d) {
            return d.ce_good_ratio_avg == null ? 10000 : d.ce_good_ratio_avg;
        });
    } else if (text == "弱覆盖优先") {
        var sectorFilter = IntelligentTuning.tempSectorFliterObj.dimension(function (d) {
            return d.poor_coverage_count
        });
    } else if (text == "用户数优先") {
        var sectorFilter = IntelligentTuning.tempSectorFliterObj.dimension(function (d) {
            return d.user_4g_avg
        });
    } else if (text == "占比优先") { //只有专题扇区才有
        if (IntelligentTuning.sectorObj.name == "m3Sector") {
            var sectorFilter = IntelligentTuning.tempSectorFliterObj.dimension(function (d) {
                return d.m3_mrrat
            });
        } else if (IntelligentTuning.sectorObj.name == "olSector") {
            var sectorFilter = IntelligentTuning.tempSectorFliterObj.dimension(function (d) {
                return d.ol_mrrat
            });
        } else {
            var sectorFilter = IntelligentTuning.tempSectorFliterObj.dimension(function (d) {
                return d.cb_mrrat
            });
        }
    }else if(text=="距离优先"){ //这下面三个只有坐标勘误和方位角勘误才有的
        var sectorFilter = IntelligentTuning.tempSectorFliterObj.dimension(function(d) { return d.pred_distance });
    }else if(text=="角度优先"){
        var sectorFilter = IntelligentTuning.tempSectorFliterObj.dimension(function(d) { return d.pred_azimuth_diff });
    }else if(text=="附近弱区数量优先"){
        var sectorFilter = IntelligentTuning.tempSectorFliterObj.dimension(function(d) { return d.nb_poor_coverage_count });
    }

    if (text == "感知优先") {
        var tempData = sectorFilter.bottom(IntelligentTuning.tempSectorFliterObj.size());
    } else {
        var tempData = sectorFilter.top(IntelligentTuning.tempSectorFliterObj.size());
    }

    IntelligentTuning.sectorCurrentResult = tempData;
    IntelligentTuning.setSectorVMData(); //设置列表的值
    IntelligentTuning.changeCurrentShowWhatMessage("list"); //调用这个重新设置
    /*IntelligentTuning.showSectorData(tempData);
    IntelligentTuning.sectorVM.sectorList = IntelligentTuning.getDataListByPage(tempData , 1);*/
});


//扇区筛选
$("#sectorList .flexRow > .flexCol").not(".flexCol:first-child").click(function () {

    // //定义对象维度
    // if(IntelligentTuning.tempSectorFliterObj == null){
    //     IntelligentTuning.tempSectorFliterObj = crossfilter([]);
    //     IntelligentTuning.tempSectorFliterObj.add(IntelligentTuning.sectorAreaListChe);
    // }else{
    //     IntelligentTuning.tempSectorFliterObj.remove();
    //     IntelligentTuning.tempSectorFliterObj.add(IntelligentTuning.sectorAreaListChe);
    // }
    var mr_count = $("#mrCount").val();
    if (mr_count == null || mr_count.toString().trim == "") {
        mr_count = 1000;
    } else {
        if (isNaN(parseInt(mr_count))) { //输入的数据有误
            $("#mrCount").val(1000);
            mr_count = 1000;
        } else {
            mr_count = parseInt(mr_count);
        }
    }
    // var sectorListFilter = IntelligentTuning.tempSectorFliterObj.dimension(function(d) { return d });
    $(this).addClass("selected").siblings().removeClass("selected");

    var flexColText = $(this).parent().next().children();
    var allFlexRow = $(this).parent().parent().children();

    //判断点击的分类是否是全部
    var clickHtml = $(this).parent().children()[0].innerHTML;//全部分类
    var selectElement = $(this)[0].innerHTML;
    if (clickHtml == "全部分类") {
        $("#sectorListSelectName").text("全部分类");
        $("#sectorList").hide();
        IntelligentTuning.sectorFilterConditionArr = ["不限" , "不限" ,"不限" ,"不限" ,"不限" , "不限", 1000 , "不限" , "不限" ,"不限" , "不限" ,"不限" , "不限" , "不限"];
        var dealCache = allFlexRow[1].children[1];//区域类型
        $(dealCache).addClass("selected").siblings().removeClass("selected");
        var dealCache = allFlexRow[2].children[1];//扇区状态
        $(dealCache).addClass("selected").siblings().removeClass("selected");
        var dealCache = allFlexRow[3].children[1];//设备厂商
        $(dealCache).addClass("selected").siblings().removeClass("selected");
        var dealCache = allFlexRow[4].children[1];//扇区状态
        $(dealCache).addClass("selected").siblings().removeClass("selected");
        var dealCache = allFlexRow[5].children[1];//使用频段
        $(dealCache).addClass("selected").siblings().removeClass("selected");
        var dealCache = allFlexRow[6].children[1];//是否新增 这个只有专题扇区才有显示
        $(dealCache).addClass("selected").siblings().removeClass("selected");
        var dealCache = allFlexRow[8].children[1];//偏差距离 这个只有宏站勘误扇区才有显示
        $(dealCache).addClass("selected").siblings().removeClass("selected");
        var dealCache = allFlexRow[9].children[1];//偏差角度 这个只有方位角勘误扇区才有显示
        $(dealCache).addClass("selected").siblings().removeClass("selected");
        var dealCache = allFlexRow[10].children[1];//是否方位角勘误 这个只有宏站勘误和方位角勘误扇区才有显示
        $(dealCache).addClass("selected").siblings().removeClass("selected");
        var dealCache = allFlexRow[11].children[1];//派单门限
        $(dealCache).addClass("selected").siblings().removeClass("selected");
        var dealCache = allFlexRow[12].children[1];//是否派单
        $(dealCache).addClass("selected").siblings().removeClass("selected");
        var dealCache = allFlexRow[13].children[1];//派单状态
        $(dealCache).addClass("selected").siblings().removeClass("selected");
    } else if (clickHtml == "区域类型") {
        $("#sectorListSelectName").text("区域类型");
        $("#sectorList").hide();
        IntelligentTuning.sectorFilterConditionArr[0] = selectElement;
    } else if (clickHtml == "扇区状态") {
        $("#sectorListSelectName").text("扇区状态");
        $("#sectorList").hide();
        IntelligentTuning.sectorFilterConditionArr[1] = selectElement;
    } else if (clickHtml == "设备厂商") {
        $("#sectorListSelectName").text("设备厂商");
        $("#sectorList").hide();
        IntelligentTuning.sectorFilterConditionArr[2] = selectElement;
    } else if (clickHtml == "扇区类型") {
        $("#sectorListSelectName").text("扇区类型");
        $("#sectorList").hide();
        IntelligentTuning.sectorFilterConditionArr[3] = selectElement;
    } else if (clickHtml == "使用频段") {
        $("#sectorListSelectName").text("使用频段");
        $("#sectorList").hide();
        IntelligentTuning.sectorFilterConditionArr[4] = selectElement;
    } else if (clickHtml == "是否新增") {
        $("#sectorListSelectName").text("是否新增");
        $("#sectorList").hide();
        IntelligentTuning.sectorFilterConditionArr[5] = selectElement;
    }else if (clickHtml == "距离偏差") {
        $("#sectorListSelectName").text("距离偏差");
        $("#sectorList").hide();
        IntelligentTuning.sectorFilterConditionArr[7] = selectElement;
    }else if (clickHtml == "角度偏差") {
        $("#sectorListSelectName").text("角度偏差");
        $("#sectorList").hide();
        IntelligentTuning.sectorFilterConditionArr[8] = selectElement;
    }else if (clickHtml == "天馈接反") {
        $("#sectorListSelectName").text("天馈接反");
        $("#sectorList").hide();
        IntelligentTuning.sectorFilterConditionArr[9] = selectElement;
    }else if (clickHtml == "派单门限") {
        $("#sectorListSelectName").text("派单门限");
        $("#sectorList").hide();
        IntelligentTuning.sectorFilterConditionArr[10] = selectElement;
    }else if (clickHtml == "是否派单") {
        $("#sectorListSelectName").text("是否派单");
        $("#sectorList").hide();
        IntelligentTuning.sectorFilterConditionArr[11] = selectElement;
    }else if (clickHtml == "派单状态") {
        $("#sectorListSelectName").text("派单状态");
        $("#sectorList").hide();
        IntelligentTuning.sectorFilterConditionArr[12] = selectElement;
    }
    IntelligentTuning.sectorFilterConditionArr[6] = mr_count;
    //执行过滤
    IntelligentTuning.excuteFilterSector();
    // var sectorListFilter = IntelligentTuning.sectorFilter(IntelligentTuning.sectorAreaListChe , IntelligentTuning.sectorFilterConditionArr);
    // var tempData = sectorListFilter.top(IntelligentTuning.tempSectorFliterObj.size());//过滤后的结果集
    // IntelligentTuning.tempSectorFliterObj.remove();//移除
    // IntelligentTuning.tempSectorFliterObj = crossfilter([]);
    // sectorListFilter = IntelligentTuning.tempSectorFliterObj.dimension(function(d) { return d });
    // IntelligentTuning.tempSectorFliterObj.add(tempData);
    //
    // //过滤后回显数据
    // IntelligentTuning.filterSectorResult = tempData;
    // IntelligentTuning.sectorCurrentResult = IntelligentTuning.filterSectorResult;
    // IntelligentTuning.isFilterSector = true;
    //
    // $("#sectorSort ul li.selected").trigger("click");


});


/**
 * ********************************
 * @funcname  IntelligentTuning.excuteFilterSector
 * @funcdesc 执行扇区列表的分类筛选过滤并将过滤结果进行排序后显示在列表上
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.excuteFilterSector = function () {
    //定义对象维度
    if (IntelligentTuning.tempSectorFliterObj == null) {
        IntelligentTuning.tempSectorFliterObj = crossfilter([]);
        IntelligentTuning.tempSectorFliterObj.add(IntelligentTuning.sectorAreaListChe);
    } else {
        IntelligentTuning.tempSectorFliterObj.remove();
        IntelligentTuning.tempSectorFliterObj.add(IntelligentTuning.sectorAreaListChe);
    }
    var sectorListFilter = IntelligentTuning.sectorFilter(IntelligentTuning.sectorAreaListChe, IntelligentTuning.sectorFilterConditionArr);
    var tempData = sectorListFilter.top(IntelligentTuning.tempSectorFliterObj.size());//过滤后的结果集
    IntelligentTuning.tempSectorFliterObj.remove();//移除
    IntelligentTuning.tempSectorFliterObj = crossfilter([]);
    sectorListFilter = IntelligentTuning.tempSectorFliterObj.dimension(function (d) {
        return d
    });
    IntelligentTuning.tempSectorFliterObj.add(tempData);

    //过滤后回显数据
    IntelligentTuning.filterSectorResult = tempData;
    IntelligentTuning.sectorCurrentResult = IntelligentTuning.filterSectorResult;
    IntelligentTuning.isFilterSector = true;

    $("#sectorSort ul li.selected").trigger("click");
}

/*专题扇区筛选中的MR条数筛选变化触发的方法*/
$('#sureFilter').on('click', function () {
    var mr_count = $("#mrCount").val();
    if (mr_count == null || mr_count.toString().trim == "") {
        mr_count = 1000;
    } else {
        if (isNaN(parseInt(mr_count))) { //输入的数据有误
            $("#mrCount").val(1000);
            mr_count = 1000;
        } else {
            mr_count = parseInt(mr_count);
        }
    }
    IntelligentTuning.sectorFilterMrCount(mr_count); //进行过滤
    $("#sectorList").hide();
});

/**
 * ********************************
 * @funcname IntelligentTuning.sectorFilterMrCount
 * @funcdesc 专题扇区根据MR条数进行筛选
 * @param {int} mr条数
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.sectorFilterMrCount = function (mr_count) {
    IntelligentTuning.sectorFilterConditionArr[6] = mr_count; //将条件赋值到筛选条件数组
    var sectorListFilter = IntelligentTuning.sectorFilter(IntelligentTuning.sectorCurrentResult, IntelligentTuning.sectorFilterConditionArr);
    var tempData = sectorListFilter.top(IntelligentTuning.tempSectorFliterObj.size());//过滤后的结果集
    IntelligentTuning.tempSectorFliterObj.remove();//移除
    IntelligentTuning.tempSectorFliterObj = crossfilter([]);
    sectorListFilter = IntelligentTuning.tempSectorFliterObj.dimension(function (d) {
        return d
    });
    IntelligentTuning.tempSectorFliterObj.add(tempData);

    //过滤后回显数据
    IntelligentTuning.filterSectorResult = tempData;
    IntelligentTuning.sectorCurrentResult = IntelligentTuning.filterSectorResult;
    IntelligentTuning.isFilterSector = true;

    $("#sectorSort ul li.selected").trigger("click");
}

/**********************************
 * @funcname IntelligentTuning.drawMk
 * @funcdesc 遍历当前列表数据，打印列表数据对应的水滴点
 * @param {Array} list (input)
 包含marke经纬度信息的数组
 * @param {object} pageTyep (input) {boolean} isResetZoom:是否需要重新设置zoom
 列表类型
 * @return {null}
 * @author 郑文彬
 * @create 20171219
 ***********************************/
IntelligentTuning.drawMk = function intelligentRoadTest_drawMk(list, isResetZoom) {
    if (IntelligentTuning.isScreenCompared) {//分屏对比是不需要进行描绘标记点和定位
        return;
    }
    if (list == null) {
        return;
    }
    IntelligentTuning.mkList = list;
    // IntelligentTuning.pageTyep=pageTyep;
    if (IntelligentTuning.markerList == null) { //初始化这个变量
        IntelligentTuning.markerList = [];
        IntelligentTuning.lngArr = [];
        IntelligentTuning.latArr = [];
        IntelligentTuning.object_id = [];
    }
    for (var i = 0; i < IntelligentTuning.markerList.length; i++) {
        IntelligentTuningMap.map.removeOverlay(IntelligentTuning.markerList[i]);
    }
    IntelligentTuning.markerList = [];
    IntelligentTuning.lngArr = [];
    IntelligentTuning.latArr = [];
    IntelligentTuning.object_id = [];
    var points = [];
    if (list.length == 0) {
        return;
    }
    var type = null; //这个变量是在用户抱怨列表的时候打点用到的。主要用于判断是属于哪一种类型的工单
    var sumLon = 0;
    var sumLat = 0;
    for (var i = 0; i < list.length; i++) {
        var lng = null;
        var lat = null;
        var object_id = null;

        lng = list[i].longitude_mid_baidu;
        lat = list[i].latitude_mid_baidu;
        object_id = list[i].cell_name;
        var obj = IntelligentTuning.getSectorXYZ(list[i].band_mapping);
        var pointArr = IntelligentTuning.add_sector(new BMap.Point(lng, lat), obj.xy, obj.xy, obj.z, list[i].ant_azimuth)
        lng = (pointArr[2].lng + pointArr[3].lng) / 2;
        lat = (pointArr[2].lat + pointArr[3].lat) / 2;
        if (list[i].is_indoor == '室内') {
            lng = list[i].longitude_mid_baidu;
            lat = list[i].latitude_mid_baidu;
        }
        sumLon = sumLon + lng;
        sumLat = sumLat + lat;
        IntelligentTuning.lngArr.push(lng);
        IntelligentTuning.latArr.push(lat);
        IntelligentTuning.object_id.push(object_id);
        var img = "../js/IntelligentTuning/images/markeRq.png";
        if (lng != null && lng != "" && lat != null && lat != "") {
            points.push(new BMap.Point(lng, lat));
        }
        IntelligentTuning.addMk(lng, lat, img, i, "#2c2c2c", object_id, type);
    }

    var mapView = IntelligentTuningMap.map.getViewport(points);
    if (IntelligentTuning.currentLocation == "" || IntelligentTuning.currentLocation == null) {
        console.log("drawMk  centerAndZoom");
        //看能不能拿到区县，不能就直接将第一个点作为经纬度去进行缩放
        if (list.length > 0) {
            var poinit = new BMap.Point(sumLon / list.length, sumLat / list.length);
            // var district = IntelligentTuning.getCenterPointDistrict(poinit);
            var district = null;
            if (district != null) {
                IntelligentTuningMap.map.centerAndZoom(mapView.center, mapView.zoom);
            } else {
                //如果定位点刚好在海里 ，取第一个点定位
                var lng_1;
                var lat_1;
                lng_1 = list[0].longitude_mid_baidu;
                lat_1 = list[0].latitude_mid_baidu
                poinit = new BMap.Point(lng_1, lat_1);
                if (IntelligentTuning.clickEye == true) { //如果点击了眼睛就不需要缩放了
                    return;
                }
                if (isResetZoom != false) { //只要isResetZoom不为false就需要缩放
                    IntelligentTuningMap.map.centerAndZoom(mapView.center, mapView.zoom);
                }

            }
        }
    }
}


/**********************************
 * @funcname IntelligentTuning.addMk
 * @funcdesc 绘制单个水滴点，并以i为下标，将绘制的水滴的存于IntelligentTuning.markerList中
 * @param {string} lng (input optional)
 经度
 * @param {string} lat (input optional)
 纬度
 * @param {string} img (input optional)
 marke的图片
 * @param {string} i (input optional)
 弱区表当页的序号
 * @param {string} color (input optional)
 文本颜色
 * @param {string} objcet_id (input optional)
 弱区的object_id
 {String} type 用户抱怨的工单的类型，只有工单抱怨需要使用到
 * @return {null}
 * @author 郑文彬
 * @create 20171219
 ***********************************/
IntelligentTuning.addMk = function IntelligentTuning_addMk(lng, lat, img, i, color, objcet_id, type) {
    var point = new BMap.Point(lng, lat);
    var myIcon = new BMap.Icon(img, new BMap.Size(22, 32));
    var marker = new BMap.Marker(point, {icon: myIcon});  // 创建标注
    //marker.setZIndex(1);
    //marker.setOffset(new BMap.Size(0,-15));
    var label = new BMap.Label(i + 1, {
        offset: new BMap.Size(6, 4)
    });
    if (i >= 9) {
        label = new BMap.Label(i + 1, {
            offset: new BMap.Size(2, 4)
        });
    }
    label.setStyle({
        background: 'none', color: "#2c2c2c", border: 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
        , fontWeight: 'bold'
    });
    marker.setLabel(label);
    if (img == "../js/IntelligentTuning/images/maker2.png") {
        marker.setZIndex(666);
    } else {
        marker.setZIndex(99);
    }
    marker.setOffset(
        new BMap.Size(0, -15)
    );
    IntelligentTuning.markerList[i] = marker;
    marker.index = i;
    marker.objcet_id = objcet_id;
    marker.pageType = IntelligentTuning.index;
    if (type != null) { //将用户抱怨工单的类型赋值给marker的type属性
        marker.type = type;
    }
    marker.addEventListener("mouseout", function (e) {
        IntelligentTuningMap.map.removeOverlay(IntelligentTuning.myCompOverlay);
        $('#cirTip').hide();
        var img = "../js/IntelligentTuning/images/markeRq.png";
        IntelligentTuning.markerList[i].setZIndex(111);
        if (IntelligentTuning.mkIndex != i) {
            IntelligentTuning.markerList[i].setIcon(new BMap.Icon(img, new BMap.Size(22, 32)));
        }
        var id = "showSectorListDiv";
        $("#" + id).find(".listUL > li").eq(i).find(".numSpan").css("background", "url(" + "../js/IntelligentTuning/images/bg_num.png" + ")");
        $("#" + id).find(".listUL > li").eq(i).find(".numSpan2").css("background", "url(" + "../js/IntelligentTuning/images/markeRq.png" + ")");
        // $("#" + id).find(".listUL > li").eq(i).css("background", "#666");
        $("#" + id).find(".listUL > li").eq(i).removeClass("highLightLi");
    });
    marker.addEventListener("mouseover", function (e) {
        for (var i = 0; i < IntelligentTuning.lngArr.length; i++) {
            var lng = IntelligentTuning.lngArr[i];
            var lat = IntelligentTuning.latArr[i];
            var color = "#2c2c2c"
            var img = "../js/IntelligentTuning/images/markeRq.png";
            if (i == this.index) {
                img = "../js/IntelligentTuning/images/maker2.png";
                color = "black";
                IntelligentTuning.openInfoWindow(lng, lat, IntelligentTuning.object_id[i]);
                IntelligentTuning.markerList[i].setZIndex(6666);
            }
            if (IntelligentTuning.mkIndex != i) {
                IntelligentTuning.markerList[i].setIcon(new BMap.Icon(img, new BMap.Size(22, 32)));
            }
        }

        IntelligentTuning.openInfoWindow(IntelligentTuning.lngArr[this.index], IntelligentTuning.latArr[this.index], IntelligentTuning.object_id[this.index]);

        //改变列表图标及背景色
        IntelligentTuning.changeImg(this.index);

    });
    marker.addEventListener("click", function (e) {
        //点击水滴点显示提示信息
        setTimeout(function () {
            if (IntelligentTuning.index != 6) {
                $('#cirTipLeft').show();
                // IntelligentTuning.resizeInfoWindow();
            }
        }, 100)
        if (IntelligentTuning.mkIndex == this.index) {
            return;
        }
        IntelligentTuningMap.mapClick = true;
        var img;
        img = "../js/IntelligentTuning/images/markeRq.png";
        try {
            IntelligentTuning.markerList[IntelligentTuning.mkIndex].setIcon(new BMap.Icon(img, new BMap.Size(22, 32)));
        } catch (e) {
        }
        //点击水滴点调至详情页
        var i = this.index;
        IntelligentTuning.sectorVM.showMessage(IntelligentTuning.sectorVM.sectorList[i], i);
        IntelligentTuning.mkIndex = i;
//    	  IntelligentTuning.openThreeLable();
    });
    IntelligentTuningMap.map.addOverlay(marker);
}

/**********************************
 * @funcname IntelligentTuning.changeImg
 * @funcdesc 移入水滴点时列表高亮显示
 * @param {string} pageType (input optional)
 列表类型
 * @param {string} i (input optional)
 * 要高亮第i条数据
 * @return {null}
 * @author 郑文彬
 * @create 20171219
 ***********************************/
IntelligentTuning.changeImg = function IntelligentTuning_changeImg(i) {
    var id = "showSectorListDiv";
    for (var j = 0; j < 20; j++) {
        $("#" + id).find(".listUL > li").eq(j).find(".numSpan").css("background", "url(" + "../js/IntelligentTuning/images/bg_num.png" + ")");
        $("#" + id).find(".listUL > li").eq(j).find(".numSpan2").css("background", "url(" + "../js/IntelligentTuning/images/markeRq.png" + ")");
    }
    $("#" + id).find(".listUL > li").eq(i).find(".numSpan").css("background", "url(" + "../js/IntelligentTuning/images/maker2.png" + ")");
    $("#" + id).find(".listUL > li").eq(i).find(".numSpan2").css("background", "url(" + "../js/IntelligentTuning/images/maker2.png" + ")");
    // $("#" + id).find(".listUL > li").eq(i).css("background", "#000");
    $("#" + id).find(".listUL > li").eq(i).addClass("highLightLi");
    document.getElementById(i).scrollIntoView();
}


/**
 * ********************************
 * @funcname IntelligentTuning.getSectorMessageById
 * @funcdesc 根据扇区编号查询扇区的详细数据
 * @param {String} enodeb_id 基站id
 * @param {String} cell_id 小区id
 * @param {String} day 查询日期
 * @param {String} mapType 地图类型 ”topMap“ 上方地图  ”bottomMap“  下方地图
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.getSectorMessageById = function (enodeb_id, cell_id,day,mapType) {
    if (isNotNullOrEmpty(enodeb_id) && isNotNullOrEmpty(cell_id)) {
        var sqlList = [];
        var list = ["AntAdj_07_GetSectorByID", "DAY:" + day, "ENODEBID:" + enodeb_id, "CELLID:" + cell_id];
        sqlList.push(list);
        var funcList = [IntelligentTuning.dealSectorMessageById];
        var sectorObj = IntelligentTuning.sectorCompleteVM.sectorData; //获取当前详情页的扇区数据
        if(!IntelligentTuning.isScreen&&day!=IntelligentTuning.currentQueryDay && sectorObj.enodeb_id == enodeb_id && sectorObj.cell_id == cell_id){//没有分屏，在详情页的地图上切换时间
            funcList = [IntelligentTuningMap.dealMapById];
        }
        var database = [3];
        if(isnull(mapType)){
            mapType="topMap";
        }
        progressbarTwo.submitSql(sqlList, funcList, database,[[mapType]]);
        /*//如果是分屏的时候重新进入了扇区详情页，退出分屏
        if(IntelligentTuning.isScreen){
            IntelligentTuningScreen.exitScreen();
        }*/

    } else {
        alert("参数输入错误");
    }
}



/**
 * ********************************
 * @funcname IntelligentTuning.getScreenMessageById
 * @funcdesc 根据扇区编号查询扇区的详细数据
 * @param {String} enodeb_id 基站id
 * @param {String} cell_id 小区id
 * @param {String} day 查询日期
 * @param {String} mapType 地图类型 ”topMap“ 上方地图  ”bottomMap“  下方地图
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuning.getScreenMessageById = function (enodeb_id, cell_id,day,mapType) {
    if (isNotNullOrEmpty(enodeb_id) && isNotNullOrEmpty(cell_id)) {
        var sqlList = [];
        var list = ["AntAdj_07_GetSectorByID", "DAY:" + day, "ENODEBID:" + enodeb_id, "CELLID:" + cell_id];
        sqlList.push(list);
        var funcList = [IntelligentTuningMap.dealMapById];//不刷新详细面板，只操作地图，打出地图上所有的覆盖物
        var database = [3];
        IntelligentTuningScreen.currentGridType="covSector";
        IntelligentTuningMap.currentGridType="covSector";
        progressbarTwo.submitSql(sqlList, funcList, database,[[mapType]]);
    } else {
        alert("参数输入错误");
    }
}


/**
 * ********************************
 * @funcname IntelligentTuning.getMrAndAgpsRate
 * @funcdesc 查询当前小区的全量mr覆盖率和agps-mr覆盖率
 * @param {String} enodeb_id 基站id
 * @param {String} cell_id 小区id
 * @param {String} day 查询日期
 * @param {String} mapType 地图类型 ”topMap“ 上方地图  ”bottomMap“  下方地图
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuning.getMrAndAgpsRate = function IntelligentTuning_getMrAndAgpsRate(enodeb_id, cell_id,day,mapType) {
    if (isNotNullOrEmpty(enodeb_id) && isNotNullOrEmpty(cell_id)) {
        var sqlList = [];
        var list = ["IntelligentTuning_get_mrAndApgsRate", "DAY:" + day, "ENODEBID:" + enodeb_id, "CELLID:" + cell_id];
        sqlList.push(list);
        var funcList = [IntelligentTuning.dealMrAndAgpsRate];//不刷新详细面板，只操作地图，打出地图上所有的覆盖物
        var database = [3];
        progressbarTwo.submitSql(sqlList, funcList, database,[[mapType]]);
    } else {
        alert("参数输入错误");
    }
}
/**
 * ********************************
 * @funcname IntelligentTuning.dealMrAndAgpsRate
 * @funcdesc 获取当前小区的全量mr覆盖率和agps-mr覆盖率
 * @param {Object} data ： 查询返回的结果
 * @param {Array} params ： 回调函数传入的其它数据
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuning.dealMrAndAgpsRate=function IntelligentTuning_dealMrAndAgpsRate(data,params){
    var result = callBackChangeData(data);
    var object=getCurrentMap(params[0]);
    object.agpsRate=null;
    object.mrRate=null;
    for(var i=0;i<result.length;i++){
        if(result[i]["agps_type"]==1){//AGPS-MR覆盖率
            object.agpsMRRate=result[i]["cov_rate"];
        }else{//全量MR覆盖率
            object.allMRRate=result[i]["cov_rate"];
        }
    }

}



/**
 * ********************************
 * @funcname IntelligentTuning.dealSectorMessageById
 * @funcdesc 处理查询单个扇区的返回数据的回调函数
 * @param {Object} data ： 查询返回的结果
 * @param {Array} params ： 回调函数传入的其它数据
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.dealSectorMessageById = function IntelligentTuning_dealSectorMessageById(data,params) {
    var result = callBackChangeData(data);
    var mapType=params[0];
    // console.log(result);
    if (result.length > 0) {
        if (IntelligentTuning.sectorCompleteVM == undefined) {
            IntelligentTuning.initCompleteVue();
        }
        var item = result[0];

        //将结果放入到sectorData中，方便获取一些基础数据，后期如果有属性进行存放，这里需要去掉
        IntelligentTuning.sectorCompleteVM.sectorData = item;
        IntelligentTuning.sectorCompleteVM.mapType = mapType;
        // $(".contentWrap").css("width","860px");
        //
        // $(".detailList").slideDown().siblings().hide();

        //填充图表
//        setTimeout(function(){
//        	IntelligentTuningChart.fillChart("","","");
//        },5000);
        var object=getCurrentMap(mapType);
        var currentDetailPageCaChe = item.day+"|"+item.enodeb_id+"|"+item.cell_id+"|"+IntelligentTuningMap.getgridTypeIndex(item.problem_name)+"|covSector";//当前的详情页查询条件缓存
        IntelligentTuningMap.currentDetailPageCaChe= currentDetailPageCaChe;//因为两个地图共用了一个详情页
        IntelligentTuningScreen.currentDetailPageCaChe= currentDetailPageCaChe;//因为两个地图共用了一个详情页
        if(IntelligentTuning.isClickList){//从列表点进详情页中
            //显示地图的详细信息 小芳
            IntelligentTuningMap.cacheItem=item;
            IntelligentTuningMap.currentGridType="covSector";//记录当前展示的是扇区的栅格
            IntelligentTuningMap.showMapDetailMessage(item,mapType);
        }else{
            if(IntelligentTuning.sectorCompleteVM!=undefined){
                IntelligentTuning.sectorCompleteVM.nrCellList = IntelligentTuning.nrCellList;
            }
        }

        //方案
        IntelligentTuningPlan.cellCurSetting(item);
        IntelligentTuningPlan.getPlanRecords(item);
        //参考方案
        // var end=IntelligentTuningPlan.formatDate(new Date());//当前时间
        var lastUpdateTime=$("#lastUpdateTime").text().substring(0,4)+'-'+$("#lastUpdateTime").text().substring(4,6)+'-'+$("#lastUpdateTime").text().substring(6,8) ;//当前时间
        var end=$("#lastUpdateTime").text();
        var start=new Date(IntelligentTuningPlan.stringFormDate(lastUpdateTime).getTime()-24*60*60*1000*6);//计算出前六天的日期
        start=IntelligentTuningPlan.formatDate(start);
        $("#date-range3").text(start.substring(0,4)+'-'+start.substring(4,6)+'-'+start.substring(6,8)+' - '+end.substring(0,4)+'-'+end.substring(4,6)+'-'+end.substring(6,8));
        IntelligentTuningPlan.getCellRefer(item,start,end);
        //质差小区分析
        badCellAnalysis.searchZCAnalysis(null,lastUpdateTime,item.enodeb_id,item.cell_id);

        /*/!*显示当前方案 scheme == 方案*!/
        IntelligentTuning.showSchemeDetial(item);



        /!*显示历史方案记录*!/
        IntelligentTuning.showHistorySchemeList(item);

        //一下三个模块涉及的查询有两个，一个是MOD3的占比趋势图查询，一个是其他的所有数据的查询，这里要分开成两个方法
        /!*!/!*显示小区问题状态变迁，6个折线图*!/
        IntelligentTuning.showSectorTrend(item);
        /!*显示区域统计的折线图  Statistics == 统计*!/
        IntelligentTuning.showAreaStatistics(item);
        /!*显示站间距列表*!/
        IntelligentTuning.showStationDistanceList(item);*!/

        //显示MOD3干扰的占比趋势图 柏杰
        IntelligentTuning.queryAndShowMOD3Trend(item);

        //显示其他的占比趋势图和站间距柱状图 柏杰
        IntelligentTuning.queryAndShowOtherTrendOrBar(item);*/

        /*显示邻区列表 杰禹 */
        // IntelligentTuning.showNearSectorList(item,mapType);


        /*显示质量评估指标 暂时不做 Quality Assessment == 质量评估 */
        // IntelligentTuning.showQualityAssessment(item);
        //因为这里拿的是vue对象中的problem_name ,所以一开始调用这段代码可能会有问题，所以在这里再次调用一次，以确保程序显示正确
        var messageObj = {
            enodeb_id : item.enodeb_id,
            cell_id : item.cell_id
        };
        IntelligentTuning.changeCurrentShowWhatMessage("complete" , messageObj);//显示收起详情页时的提示信息
    }

}
// 梁杰禹增加------------------------
/**
 * ********************************
 * @funcname IntelligentTuning.showNearSectorList
 * @funcdesc 根据查询结果的问题类型，将该扇区的邻区列表字符串进行切割
 * @param {object} itemData：查询小区的结果集
 * @param {String} mapType： 地图类型 ”topMap“ 上方地图  ”bottomMap“  下方地图
 * @return {null}
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuning.showNearSectorList = function (itemData,mapType) {
    var object=getCurrentMap(mapType);
    IntelligentTuning.hideGridOrPolygonNrTopSector(object);
    var nrCellStr = '';
    if(itemData.problem_name === 'MOD3干扰'){
        nrCellStr = itemData.m3nccell_set;
    }else if (itemData.problem_name === '越区覆盖') {
        nrCellStr = itemData.cbnccell_set;
    }else if (itemData.problem_name === '重叠覆盖') {
        nrCellStr = itemData.olnccell_set;
    }else if (itemData.problem_name === '弱覆盖'){

    }else if (itemData.problem_name === '坐标勘误'){

    }else if (itemData.problem_name === '方位角勘误'){

    }
    var centerPoint = new BMap.Point(itemData.longitude_mid_baidu,itemData.latitude_mid_baidu);
    /*/*
        if (IntelligentTuning.currentProblemName === 'MOD3干扰') {
            nrCellStr = itemData.m3nccell_set;
        } else if (IntelligentTuning.currentProblemName === '越区覆盖') {
            nrCellStr = itemData.cbnccell_set;
        } else if (IntelligentTuning.currentProblemName === '重叠覆盖') {
            nrCellStr = itemData.olnccell_set;
        }*/

    var nrCellList = IntelligentTuning.getNCCellList(nrCellStr);

    var bstAndCell = [];
    for(var i=0;i<nrCellList.length;i++){
        if(isNotNullOrEmpty(nrCellList[i].enodebid) && isNotNullOrEmpty(nrCellList[i].cellid)){
            var bstAndCellNum = parseInt(nrCellList[i].enodebid)*1000000+parseInt(nrCellList[i].cellid);
            bstAndCell.push(bstAndCellNum);
        }
    }

    if(bstAndCell.length>0){
        var day = IntelligentTuning.day;
        if(mapType=="bottomMap"&&IntelligentTuning.isScreen){
            day = IntelligentTuningScreen.bottomDay;
        }
        var list = ["AntAdj_08_GetNrSectorProblem","DAY:"+day,"BSTIDANDCELLID:"+bstAndCell.join(',')];
        var progressBarSqls=[];

        progressBarSqls.push(list);
        var functionlist = [IntelligentTuning.showSectorNrCellList];
        var dataBase = [3];
        progressbarTwo.submitSql(progressBarSqls, functionlist, dataBase, [[nrCellList,centerPoint,mapType]]);
    }else{
        IntelligentTuning.nrCellList=nrCellList;
        if(IntelligentTuning.sectorCompleteVM!=undefined&&IntelligentTuning.isClickList){
            IntelligentTuning.sectorCompleteVM.nrCellList = nrCellList;
        }
        var enodebid_cellidArr = [];
        for(var i = 0; i < nrCellList.length; i++){
            if(nrCellList[i].enodebid != null && nrCellList[i].enodebid != "" &&
                nrCellList[i].cellid != null && nrCellList[i].cellid != "" ){ //做一下容错，不将基站ID和小区ID 为空的扇区拼进去
                enodebid_cellidArr.push(nrCellList[i]); //将基站ID和扇区ID用逗号拼在一起
            }
        }
        IntelligentTuning.showNrTopCellForMap(centerPoint,enodebid_cellidArr,mapType);
    }

    //需要将状态进行还原
    // $('#nrCellTitleDiv').children('span').attr("title", "地图连线").removeClass("linkCellHover");

}

/**
 * ********************************
 * @funcname IntelligentTuning.showSectorNrCellList
 * @funcdesc 根据邻区查询对应的小区问题
 * @param {object} data：邻区查询的记过
 * @param {array} params ：[nrCellList：邻区数组 ，centerPoint 主小区的中心点]
 * @return {null}
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuning.showSectorNrCellList = function IntelligentTuning_showSectorNrCellList(data,params){
    var nrCellList=params[0];
    var centerPoint=params[1];
    var mapType=params[2];
    var result = callBackChangeData(data);
    for(var i=0;i<nrCellList.length;i++){
        for(var j=0;j<result.length;j++){
            if(nrCellList[i].enodebid == result[j].enodeb_id && nrCellList[i].cellid == result[j].cell_id){
                nrCellList[i].enodeb_id = result[j].enodeb_id;
                nrCellList[i].cell_id = result[j].cell_id;
                nrCellList[i].problem_name = result[j].problem_name;
                nrCellList[i].scene = "fjSector";
                nrCellList[i].longitude_mid_baidu = result[j].longitude_mid_baidu;
                nrCellList[i].latitude_mid_baidu = result[j].latitude_mid_baidu;
                nrCellList[i].is_indoor = result[j].is_indoor;
                nrCellList[i].day = result[j].day;
                nrCellList[i].city = result[j].city;
                nrCellList[i].mktcenter = result[j].mktcenter;
                nrCellList[i].country = result[j].country;
                nrCellList[i].ant_azimuth = result[j].ant_azimuth;
                if(nrCellList[i].is_indoor==="室外"){
                    var obj = IntelligentTuning.getSectorXYZ(result[j].band_mapping);
                    var point = new BMap.Point(result[j].longitude_mid_baidu, result[j].latitude_mid_baidu);
                    var assemble = IntelligentTuning.add_sector(point, obj.xy, obj.xy, obj.z, result[j].ant_azimuth);
                    nrCellList[i].positionLng = (assemble[2].lng + assemble[3].lng) / 2;
                    nrCellList[i].positionLat = (assemble[2].lat + assemble[3].lat) / 2;
                }else{
                    nrCellList[i].positionLng = result[j].longitude_mid_baidu;
                    nrCellList[i].positionLat = result[j].latitude_mid_baidu;
                }
                nrCellList[i].problem = result[j].problem_name;
                nrCellList[i].mktcenter = result[j].mktcenter;
                nrCellList[i].bs_vendor = result[j].bs_vendor;
                nrCellList[i].band_mapping = result[j].band_mapping;
                nrCellList[i].cb_mrrat = result[j].cb_mrrat;
                nrCellList[i].ol_mrrat = result[j].ol_mrrat;
                nrCellList[i].m3_mrrat = result[j].m3_mrrat;
                nrCellList[i].poor_area_cov_rate = result[j].poor_area_cov_rate;
                nrCellList[i].poor_area_tgrid_count = result[j].poor_area_tgrid_count;
                nrCellList[i].poor_area_pgrid_count = result[j].poor_area_pgrid_count;
            }
        }
    }
    IntelligentTuning.nrCellList=nrCellList;
    if(IntelligentTuning.sectorCompleteVM!=undefined&&IntelligentTuning.isClickList){
        IntelligentTuning.sectorCompleteVM.nrCellList = nrCellList;
    }
    var enodebid_cellidArr = [];
    for(var i = 0; i < nrCellList.length; i++){
        if(nrCellList[i].enodebid != null && nrCellList[i].enodebid != "" &&
            nrCellList[i].cellid != null && nrCellList[i].cellid != "" ){ //做一下容错，不将基站ID和小区ID 为空的扇区拼进去
            enodebid_cellidArr.push(nrCellList[i]); //将基站ID和扇区ID用逗号拼在一起
        }
    }
    IntelligentTuning.showNrTopCellForMap(centerPoint,enodebid_cellidArr,mapType);

}

/**
 * ********************************
 * @funcname IntelligentTuning.getNCCellList
 * @funcdesc 根据邻区字符串切割出邻区列表数据
 * @param {String} ncCellStr：邻区列表的字符串
 * @return {Array}
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuning.getNCCellList = function (ncCellStr) {
    var nrCellList = [];
    var noEnodebIdCellIdList = []; //没有基站ID和小区ID的列表
    if (ncCellStr != null && ncCellStr != "") {
        var list = ncCellStr.split("@"); //第一步切割出所有邻区的记录
        for (var i = 0; i < list.length; i++) {
            var obj = {};
            var array = list[i].split(",");
            obj.enodebid_cellid = array[0]; //基站_扇区
            obj.fcn_pci = array[1];//频段_PCI
            obj.cell_name = array[2];//扇区名称
            obj.mr_count = array[3]; //总mr数
            obj.zhuanti_mr_count = array[4]; //专题mr数
            obj.rsrp_avg = parseFloat(array[5]).toFixed(2);//rsrp均值
            if (array[6] != null && array[6] != "") {
                obj.distance = parseInt(array[6]); //距离
            } else {
                obj.distance = array[6]; //距离
            }
            obj.enodebid = array[0].split("_")[0]; //基站ID
            obj.cellid = array[0].split("_")[1];//扇区ID
            if (array.length == 7) {
                obj.problem = array[7];
            } else {
                obj.problem = '';
            }
            obj.index = i + 1;
            if (obj.enodebid != "" && obj.cellid != "") { //基站扇区ID不为空的情况下才加上去
                nrCellList.push(obj);
            } else {
                noEnodebIdCellIdList.push(obj);
            }
        }
    }
    nrCellList = nrCellList.concat(noEnodebIdCellIdList); //将没有基站ID和小区ID的数据放在数组后边
    var cellListLength = IntelligentTuning.neCellListLength;
    if(nrCellList.length>cellListLength){
        nrCellList = nrCellList.slice(0,cellListLength);
    }
    return nrCellList;
}
/**
 * ********************************
 * @funcname IntelligentTuning.hideGridOrPolygonNrTopSector
 * @funcdesc 隐藏地图上的邻区连线
 * @param {Object}  object IntelligentTuningMap/IntelligentTuningScreen 两大对象，分别处理对应地图的对应覆盖物以及相关数据存储
 * @return {null}
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuning.hideGridOrPolygonNrTopSector = function (object) {
    // console.log('清除邻区');
    for (var i = 0; i < object.nrSectorOverlay.length; i++) {
        object.map.removeOverlay(object.nrSectorOverlay[i]);
    }
    object.nrSectorOverlay=[];//置空数据

    $('#nrCellList tr').each(function (){
        var $events = $(this).data("events");
        if($events && $events['mouseover']){
            $(this).unbind('mouseover');
        }
        if($events && $events['mouseout']){
            $(this).unbind('mouseout');
        }
    })

    $('#nrCellListTwo tr').each(function (){
        var $events = $(this).data("events");
        if($events && $events['mouseover']){
            $(this).unbind('mouseover');
        }
        if($events && $events['mouseout']){
            $(this).unbind('mouseout');
        }
    })

    //需要等小芳将清除的操作加进来
    if(!isnull(object.otherSectorCompent)){
        var polygonCanvasArr = object.otherSectorCompent.polygonCanvasArr;
        var fjPolygon = [];
        for (var i = 0; i < polygonCanvasArr.length; i++) {
            if (polygonCanvasArr[i].scene != "fjSector") {
                fjPolygon.push(polygonCanvasArr[i]);
            }
        }
        object.otherSectorCompent.polygonCanvasArr = fjPolygon;
    }

};

/**
 * ********************************
 * @funcname IntelligentTuning.showNrTopCellForMap
 * @funcdesc 查询邻区信息
 * @param {object} centerPoint :扇区位置点
 * @param {Array} sectorArr :邻区集合
 * @param {String} mapType : 地图类型 ”topMap“ 上方地图  ”bottomMap“ 下方地图
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuning.showNrTopCellForMap = function (centerPoint, sectorArr,mapType) {
    if (sectorArr.length < 1) {
        IntelligentTuning.isClickList=false;
        return;
    }
    var topArr = [];
    for (var i = 0; i < sectorArr.length; i++) {
        var bstId = parseInt(sectorArr[i].enodebid);
        var cellId = parseInt(sectorArr[i].cellid);
        var topid = bstId * 1000000 + cellId;
        topArr.push(topid);
    }
    if (topArr.length > 0) {
        //top扇区连线查询
        var day = IntelligentTuning.day;
        if(mapType=="bottomMap"&&IntelligentTuning.isScreen){
            day = IntelligentTuningScreen.bottomDay;
        }
        var list = ["IntelligentTuning_15_nrSectorList","DAY:"+day,"BSTIDANDCELLID:"+topArr.join(',')];
        var progressBarSqls=[];

        progressBarSqls.push(list);
        var functionlist = [IntelligentTuning.showGridOrPolygonnrTopSector];
        var dataBase = [3];
        progressbarTwo.submitSql(progressBarSqls, functionlist, dataBase, [[centerPoint, sectorArr,mapType]]);
    }
};

/**
 * ********************************
 * @funcname IntelligentTuning.showGridOrPolygonnrTopSector
 * @funcdesc 查询邻区信息回调函数，将邻区在地图上呈现
 * @param {Array} data :查询结果
 * @param {Array} objectData :传递进来的参数，[centerPoint,sectorArr,mapType]
 * @return {null}
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuning.showGridOrPolygonnrTopSector = function (data, objectData) {
    var result = callBackChangeData(data);
    var object=getCurrentMap(objectData[2]);
    IntelligentTuning.hideGridOrPolygonNrTopSector(object);
    object.nrSectorOverlay = [];
    var fjSectorArr = [];
    for (var i = 0; i < result.length; i++) {
        var point = new BMap.Point(result[i].longitude_baidu, result[i].latitude_baidu);
        var sectorindex = new BMap.Point(result[i].longitude_baidu, result[i].latitude_baidu);
        var fjSector = {};
        if (result[i].is_indoor === '室外') {
            var obj = IntelligentTuning.getSectorXYZ(result[i].band_mapping);
            var assemble = IntelligentTuning.add_sector(point, obj.xy, obj.xy, obj.z, result[i].ant_azimuth);
            var sectorPolygon = new BMap.Polygon(assemble);
            sectorPolygon.setFillColor(IntelligentTuning.nrTopSectorColor);
            sectorPolygon.setStrokeWeight(1);
            sectorPolygon.bstId = result[i].base_statn_id;
            sectorPolygon.cellId = result[i].cell_id;
            sectorPolygon.addEventListener("click", function () {
                // IntelligentTuning.getSectorMessageById(sector.base_statn_id , sector.cell_id , IntelligentTuning.day);
                // IntelligentTuning.map.removeOverlay(this);
            });
            sectorPolygon.type = 'fjSector';
            object.nrSectorOverlay.push(sectorPolygon);
            object.map.addOverlay(sectorPolygon);

            fjSector.points = assemble;//得到扇形的点集合
            fjSector.type = 2;
            fjSector.bandLevel = obj.bandLevel;
            fjSector.statn_id = null == result[i].base_statn_id ? "" : result[i].base_statn_id;//基站编号
            fjSector.cell_id = result[i].cell_id == null ? "" : result[i].cell_id;//小区编码
            fjSector.city_id = result[i].city_id;//city_id
            fjSector.problem_name = "";//问题类型
            fjSector.scene = "fjSector";
            fjSector.longitude_mid_baidu = result[i].longitude_baidu;
            fjSector.latitude_mid_baidu = result[i].latitude_baidu;
            fjSector.band_mapping = result[i].band_mapping;
            fjSector.is_indoor = result[i].is_indoor;
            fjSector.enodeb_id = result[i].base_statn_id;
            fjSector.day = result[i].day;
            fjSector.ant_azimuth = result[i].ant_azimuth;
            fjSector.positionLng = (assemble[2].lng + assemble[3].lng) / 2;
            fjSector.positionLat = (assemble[2].lat + assemble[3].lat) / 2;
            if (assemble.length / 2 == 0) {
                sectorindex = assemble[assemble.length / 2];
            } else {
                sectorindex = assemble[parseInt(assemble.length / 2) + 1];
            }
            //用户点击了列表的邻小区，高亮小区后；又点击了地图连线，为了防止高亮的多边形层级在下面，所以重新绘制一次
            if(object.circle!=null){
                if(sectorPolygon.bstId==object.circle.statn_id&&sectorPolygon.cellId==object.circle.cell_id){
                    IntelligentTuningMap.showSector(fjSector,object);
                }
            }
        } else {
            var obj = IntelligentTuning.getSectorRadius(result[i].band_mapping);
            var sectorCircle = new BMap.Circle(point, obj.radiusL);
            sectorCircle.setFillColor(IntelligentTuning.nrTopSectorColor);
            sectorCircle.setStrokeWeight(1);
            sectorCircle.bstId = result[i].base_statn_id;
            sectorCircle.cellId = result[i].cell_id;
            sectorCircle.addEventListener("click", function () {
                // IntelligentTuning.getSectorMessageById(sector.base_statn_id , sector.cell_id , IntelligentTuning.day);
                // IntelligentTuning.map.removeOverlay(this);
            });
            sectorCircle.type = 'fjSector';
            object.map.addOverlay(sectorCircle);

            fjSector.radiusL = obj.radiusL;
            fjSector.radiusS = obj.radiusS;
            fjSector.type = 1;
            fjSector.point = point;
            fjSector.bandLevel = bandLevel;
            fjSector.statn_id = null == result[i].base_statn_id ? "" : result[i].base_statn_id;//基站编号
            fjSector.cell_id = result[i].cell_id == null ? "" : result[i].cell_id;//小区编码
            fjSector.city_id = result[i].city_id;//city_id
            fjSector.problem_name = "";//问题类型
            fjSector.scene = "fjSector";
            fjSector.longitude_mid_baidu = result[i].longitude_baidu;
            fjSector.latitude_mid_baidu = result[i].latitude_baidu;
            fjSector.band_mapping = result[i].band_mapping;
            fjSector.is_indoor = result[i].is_indoor;
            fjSector.enodeb_id = result[i].base_statn_id;
            fjSector.day = result[i].day;
            fjSector.ant_azimuth = result[i].ant_azimuth;
            fjSector.positionLng = result[i].longitude_baidu;
            fjSector.positionLat = result[i].latitude_baidu;
            //用户点击了列表的邻小区，高亮小区后；又点击了地图连线，为了防止高亮的多边形层级在下面，所以重新绘制一次
            if(object.circle!=null){
                if(sectorCircle.bstId==object.circle.statn_id&&sectorCircle.cellId==object.circle.cell_id){
                    IntelligentTuningMap.showSector(fjSector,object);
                }
            }
        }
        var polyline = new BMap.Polyline([
            objectData[0],
            sectorindex
        ], {strokeColor: IntelligentTuning.nrTopLineColor, strokeOpacity: 1});

        var topSector = objectData[1];
        for (var j = 0; j < topSector.length; j++) {
            var sector = topSector[j];
            if (sector.enodebid == result[i].base_statn_id && sector.cellid == result[i].cell_id) {
                //基站号,小区号,MR数量,平均RSRP,按数量排序序号,距离
                //513111,48,1542,-107.1,1,632
                polyline.bstid = sector.enodebid;
                polyline.cellid = sector.cellid;
                polyline.mr_count = sector.mr_count; //总mr数
                polyline.zhuanti_mr_count = sector.zhuanti_mr_count; //专题mr数
                polyline.rsrp_avg = sector.rsrp_avg;
                polyline.fcn_pci = sector.fcn_pci;
                polyline.distinceD = sector.distance;
                polyline.setStrokeWeight(6 - parseInt(sector.index));
                polyline.problem =sector.problem;
                polyline.cellname = result[i].cell_name;
                polyline.topNum = sector.index-1;
                fjSector.city = sector.city;//地市
                fjSector.country = sector.country;//区县
                // fjSector.mktcenter = sector.mktcenter;//营服
                fjSector.problem_name = sector.problem;//问题类型
                fjSector.mktcenter = sector.mktcenter ==undefined?null:sector.mktcenter;
                fjSector.bs_vendor = sector.bs_vendor ==undefined?null:sector.bs_vendor;
                fjSector.cb_mrrat = sector.cb_mrrat ==undefined?null:sector.cb_mrrat;
                fjSector.ol_mrrat = sector.ol_mrrat ==undefined?null:sector.ol_mrrat;
                fjSector.m3_mrrat = sector.m3_mrrat ==undefined?null:sector.m3_mrrat;
                fjSector.poor_area_cov_rate = sector.poor_area_cov_rate ==undefined?null:sector.poor_area_cov_rate;
                fjSector.poor_area_tgrid_count = sector.poor_area_tgrid_count ==undefined?null:sector.poor_area_tgrid_count;
                fjSector.poor_area_pgrid_count = sector.poor_area_pgrid_count ==undefined?null:sector.poor_area_pgrid_count;
            }
        }
        fjSectorArr.push(fjSector);
        polyline.type = "sectorLine";
        polyline.i = polyline.topNum == undefined?i:polyline.topNum;
        polyline.distince = parseInt(object.map.getDistance(objectData[0], point));
        IntelligentTuning.lightNrTopCellBgColor(polyline, 1);//需要反向高亮
        object.nrSectorOverlay.push(polyline);
        object.map.addOverlay(polyline);

    }
    //需要等小芳将放入地图匹配的操作加进来
    object.otherSectorCompent.polygonCanvasArr = object.otherSectorCompent.polygonCanvasArr.concat(fjSectorArr);
    IntelligentTuning.isClickList=false;
}

/**********************************
 * @funcname IntelligentTuning.lightNrTopCellBgColor
 * @funcdesc 邻区扇区连接线和表格双向高亮显示
 * @param {String} type (input optional)
 * @param {String} polyline (input optional) 连接线对象
 * @return {null}
 * @author 郑文彬
 * @create 20180412
 ***********************************/
IntelligentTuning.lightNrTopCellBgColor = function IntelligentTuning_lightNrTopCellBgColor(polyline, type) {
    var id = "nrCellList";
    var divClass = "";
    var color = "";
    if (type == 0) {
        divClass = "nrTop5Cell";
        color = "#cc66ff";
    } else {
        divClass = "mrNrTop5Cell";
        color = IntelligentTuning.nrTopLineColor;
    }

    polyline.addEventListener("mouseover", function (e) {
        $('#' + id + ' tr').eq(polyline.i).css("background", "#f4f4f4");
        $('#' + id + 'Two tr').eq(polyline.i).css("background", "#f4f4f4");
        polyline.setStrokeColor('#9ffb13');
    });
    polyline.addEventListener("mouseout", function (e) {
        $('#' + id + ' tr').eq(polyline.i).css("background", "#fff");
        $('#' + id + 'Two tr').eq(polyline.i).css("background", "#fff");
        polyline.setStrokeColor(color);
    });

    $('#nrCellList tr').eq(polyline.i).unbind('mouseover').bind('mouseover', function () {
        $(this).css("background", "#f4f4f4");
        $('#nrCellListTwo tr').eq(polyline.i).css("background", "#f4f4f4");
        polyline.setStrokeColor('#9ffb13');
    });
    $('#nrCellList tr').eq(polyline.i).unbind('mouseout').bind('mouseout', function () {
        $(this).css("background", "#fff");
        $('#nrCellListTwo tr').eq(polyline.i).css("background", "#fff");
        polyline.setStrokeColor(color);
    });

    $('#nrCellListTwo tr').eq(polyline.i).unbind('mouseover').bind('mouseover', function () {
        $(this).css("background", "#f4f4f4");
        $('#nrCellList tr').eq(polyline.i).css("background", "#f4f4f4");
        polyline.setStrokeColor('#9ffb13');
    });
    $('#nrCellListTwo tr').eq(polyline.i).unbind('mouseout').bind('mouseout', function () {
        $(this).css("background", "#fff");
        $('#nrCellList tr').eq(polyline.i).css("background", "#fff");
        polyline.setStrokeColor(color);
    });



}

//梁杰禹增加 end-------------------------


/**
 * ********************************
 * @funcname IntelligentTuning.filterAndShowList
 * @funcdesc 根据点击的类型以及是否显示所有的扇区进行筛选并将值设置到vue对象中展示在页面上
 * @param {String} elementId：点击的类目的ID {boolean} isShowAllSector ：是否显示全部扇区的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.filterAndShowList = function (elementId, isShowAllSector) {
    IntelligentTuning.checkWhichProblemToFilter(elementId, isShowAllSector); //这里设置全局变量IntelligentTuning.currentProblemName 的值，这个字段是用来表示当前需要显示哪种问题类型的数据
    IntelligentTuning.sectorCurrentMapResult=IntelligentTuning.filtSectorByProblem(IntelligentTuning.sectorResult); //获取到当前地图需要显示的数据，赋值给IntelligentTuning.sectorCurrentMapResult变量 ，这个给小芳使用的
    IntelligentTuningMap.handleCovSectorData(IntelligentTuning.sectorCurrentMapResult,"topMap");//渲染扇区图层
    IntelligentTuning.filtSectorByArea(IntelligentTuning.sectorCurrentMapResult); //获取到当前列表的值
    IntelligentTuning.excuteFilterSector();//将值执行过滤排序之后渲染到页面上
}

/**
 * ********************************
 * @funcname  IntelligentTuning.checkWhichProblemToFilter
 * @funcdesc  根据点击的li的ID来判断当前的选中的问题类型是什么
 * @param {String} elementId :点击的对象的ID  {boolean} isShowAllSector ：是否显示所有的扇区
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.checkWhichProblemToFilter = function (elementId, isShowAllSector) {
    if (isShowAllSector == true) {
        IntelligentTuning.currentProblemName = null; //表示显示所有的扇区
        //这里就需要将数据更换为全量数据了
        IntelligentTuning.sectorResult = IntelligentTuning.allSectorCheData;
    } else {
        if (elementId == "poorCoverSectorLogo" || elementId == "poorCoverSectorLogoLeft") { //弱覆盖
            IntelligentTuning.currentProblemName = "弱覆盖";
        }else if(elementId == "cbSectorLogo" || elementId == "cbSectorLogoLeft"){ //越区覆盖（越区覆盖）
            IntelligentTuning.currentProblemName = "越区覆盖";
        }else if(elementId == "olSectorLogo" || elementId == "olSectorLogoLeft"){ //重叠覆盖
            IntelligentTuning.currentProblemName = "重叠覆盖";
        } else if (elementId == "m3SectorLogo" || elementId == "m3SectorLogoLeft") { //MOD3干扰
            IntelligentTuning.currentProblemName = "MOD3干扰";
        } else if (elementId == "macSectorLogo" || elementId == "macSectorLogoLeft") { //坐标勘误
            IntelligentTuning.currentProblemName = "坐标勘误";
        } else if (elementId == "feederLineLogo" || elementId == "feederLineLogoLeft") { //方位角勘误(天馈接反)
            IntelligentTuning.currentProblemName = "方位角勘误";
        }else if (elementId == "dipAngleLogo" || elementId == "dipAngleLogoLeft"){ //下倾角勘误
            IntelligentTuning.currentProblemName = "下倾角勘误";
        }
    }
    IntelligentTuningMap.listProblem=IntelligentTuning.currentProblemName;
}


//匹配地图中心点所在的区县
IntelligentTuning.getCenterPointDistrict = function IntelligentTuning_getCenterPointDistrict(centerPoint) {
    var market = null;
    for (var i = 0; i < IntelligentTuning.DistrictPolygon.length; i++) {
        if (BMapLib.GeoUtils.isPointInPolygonForNOCE(centerPoint, IntelligentTuning.DistrictPolygon[i])) {
            market = IntelligentTuning.DistrictPolygon[i];
            break;
        }
    }
    return market;
}


/**********************************
 * @funcname IntelligentTuning.openInfoWindow
 * @funcdesc 绘制若取marke上方的文本提示框
 * @param {string} lng (input optional)
 经度
 * @param {string} lat (input optional)
 纬度
 * @param {string} str (input optional)
 需要显示的文本
 * @return {null}
 * @author 郑文彬
 * @create 20171219
 ***********************************/
IntelligentTuning.openInfoWindow = function IntelligentTuning_openInfoWindow(lng, lat, str) {
    IntelligentTuningMap.map.removeOverlay(IntelligentTuning.myCompOverlay);
    $("#cirTip").hide();

    // 自定义覆盖物
    function ComplexCustomOverlay(point, text) {
        this._point = point;
        this._text = text;
    }

    ComplexCustomOverlay.prototype = new BMap.Overlay();
    var zindex = -4514976;
    ComplexCustomOverlay.prototype.initialize = function (map) {
        this._map = map;
        var tip = this._div = document.getElementById("cirTip");
        $(tip).html("");
        $("#cirTip").show();
        var span = document.createElement("span");
        tip.appendChild(span);
        span.appendChild(document.createTextNode(this._text));

        IntelligentTuningMap.map.getPanes().markerPane.appendChild(tip);

        return null;
    }
    ComplexCustomOverlay.prototype.draw = function () {
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
//      this._div.style.left = pixel.x -65 + "px";
//      this._div.style.top  = pixel.y -80 + "px";
//      alert($('#cirTip').width()+" "+$('#cirTip').height());
        this._div.style.left = pixel.x - ($('#cirTip').width() / 2) - 14 + "px";
        this._div.style.top = pixel.y - ($('#cirTip').height()) - 50 + "px";
//      this._div.style.left = pixel.x  + "px";
//      this._div.style.top  = pixel.y + "px";
    }

    var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(lng, lat), str);
    IntelligentTuning.myCompOverlay = myCompOverlay;
    IntelligentTuningMap.map.addOverlay(IntelligentTuning.myCompOverlay);
}

/**
 * ********************************
 * @funcname IntelligentTuning.drawCurrentBounds
 * @funcdesc 根据最大最小经纬度画出一个框框
 * @param {Object} minPoint:左下角的点对象  存放最小经纬度  {Object} maxPoint:右上角的点对象  存放最大经纬度
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.drawCurrentBounds = function (minPoint, maxPoint) {
    if (IntelligentTuning.currentBoundsPolyline != null) {
        IntelligentTuningMap.map.removeOverlay(IntelligentTuning.currentBoundsPolyline);
    }
    if (isNotNullOrEmpty(minPoint) && isNotNullOrEmpty(maxPoint)) {
        var pointArr = [];
        pointArr.push(minPoint); //左下角的点
        pointArr.push(new BMap.Point(minPoint.lng, maxPoint.lat)); //左上角的点
        pointArr.push(maxPoint); //右上角的点
        pointArr.push(new BMap.Point(maxPoint.lng, minPoint.lat));//右下角的点
        pointArr.push(minPoint); //左下角的点 最后要连到第一个点
        IntelligentTuning.currentBoundsPolyline = new BMap.Polyline(pointArr, {
            strokeColor: '#dfff10',
            strokeWeight: 6,
            strokeStyle: 'dashed'
        });
        // IntelligentTuningMap.map.addOverlay(IntelligentTuning.currentBoundsPolyline); //画上虚线
    }
}


/**
 * ********************************
 * @funcname IntelligentTuning.goSectorList
 * @funcdesc  跳转到扇区列表
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.goSectorList = function IntelligentTuning_goSectorList(){
    $(".listTopUl,.listDivWrap").show();
    $(".panelWrap").hide();
    $(".listInfo").slideDown();
    $(".searchTitle").slideUp();
    $(".circleTipLeft").hide();

    var obj = {
        currentLocation : "list" , //当前位置属于列表
        enodeb_id : null,
        cell_id : null
    };
    //这里要设置返回的List的值
    IntelligentTuning.backList.clear(); //返回列表之后就无法再次返回了，所以这里要清除这里的列表
    IntelligentTuning.backList.add(obj);//将这个对象放入到列表中
    IntelligentTuning.changeCurrentShowWhatMessage("list" , null); //显示收起列表时的提示信息
}


/**
 * ********************************
 * @funcname IntelligentTuning.goSectorCompleteMessage
 * @funcdesc 跳转到扇区详情页
 * @param {int} enodeb_id :基站ID  {int} cell_id : 扇区ID
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.goSectorCompleteMessage = function IntelligentTuning_goSectorCompleteMessage(enodeb_id , cell_id){
    $(".contentWrap").css("width","60%");
    $(".panelWrap").hide();
    $(".listInfo").show();
    $(".detailList").slideDown().siblings().hide();
    $(".listDiv .detailList").each(function () {
        if ($(this).is(":visible")) {
            $(this).slideUp();
            $(this).slideDown();
        }
    });
    var obj = {
        currentLocation : "completeMessage" , //当前位置属于详情页
        enodeb_id : enodeb_id,
        cell_id : cell_id
    };
    IntelligentTuning.backList.add(obj);//将这个对象放入到返回列表中
    var messageObj = {
        enodeb_id : enodeb_id,
        cell_id : cell_id
    };
    IntelligentTuning.changeCurrentShowWhatMessage("complete" , messageObj);//显示收起详情页时的提示信息
}

/**
 * ********************************
 * @funcname IntelligentTuning.clickEyeBackToList
 * @funcdesc 在详情页点击眼睛的时候要做的操作
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.clickEyeBackToList = function(){
    $("#sectorCount").trigger("click"); //先触发返回，清除掉一些东西
}

/**
 * ********************************
 * @funcname IntelligentTuning.goBackToList
 * @funcdesc 返回列表
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.goBackToList = function(){
    $(".contentWrap").css("width","420px");
    $(".detailList").hide().siblings().show();
    IntelligentTuningMap.gridTipShow=false;//栅格信息提示框默认隐藏

    var obj = {
        currentLocation : "list" , //当前位置属于列表
        enodeb_id : null,
        cell_id : null
    };
    //这里要设置返回的List的值 和跳转到列表的操作一致
    IntelligentTuning.backList.clear(); //返回列表之后就无法再次返回了，所以这里要清除这里的列表
    IntelligentTuning.backList.add(obj);//将这个对象放入到列表中

    IntelligentTuningMap.clearOverlays(IntelligentTuningMap);//清除地图上的覆盖物
    IntelligentTuningMap.legendGrid(IntelligentTuningMap);//监控图例变化
    IntelligentTuningMap.handleCovSectorData(IntelligentTuning.sectorCurrentMapResult,"topMap");//渲染扇区图层


    //这里需要判断一下，当前列表的查询时间和日历控件上的时间是否一致，如果不一致，日历控件的时间需要修改为查询时间
    if(IntelligentTuning.currentQueryDay != IntelligentTuning.day){
        IntelligentTuning.day = IntelligentTuning.currentQueryDay;
        $("#seachTime").text(IntelligentTuning.currentQueryDay); //切换日期控件的时间
    }
    IntelligentTuning.changeCurrentShowWhatMessage("list" , null);//显示收起列表时的提示信息
}

/**
 * ********************************
 * @funcname  IntelligentTuning.changeCurrentShowWhatMessage
 * @funcdesc 根据类型改变点击收起时显示的那个文本信息的显示内容
 * @param {String} type ：类型 它的值有list 和 complete
 * {Object} messageObj : 存放一些需要展示出去的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.changeCurrentShowWhatMessage = function(type , messageObj){
    var htmlStr = "";
    var problem_name = IntelligentTuning.currentProblemName;
    if(problem_name == null || problem_name == ""){
        problem_name = "全部";
    }
    if(isNotNullOrEmpty(type)){
        if(type == "list"){ //描述当前列表展示的内容是什么
            var city = $("#sectorCityName").text();
            var country = $("#sectorDistrictName").text();
            var mktcenter = $("#sectorMktName").text();
            // 在[ 广州] 范围搜索 <span style="color: #f7f213;">弱覆盖</span>
            htmlStr += "在[" + city ; //将地市拼接进去
            if(country != "全市"){ //说明区县是有选中的
                htmlStr += "," + country ; //将区县拼接进去
            }else{
                htmlStr += "]" ;
            }

            if(country != "全市" && mktcenter != "全区"){
                htmlStr += "," + mktcenter + "]" ; //将区县拼接进去
            }else{
                if(htmlStr.indexOf("]") < 0){
                    htmlStr += "]" ;
                }
            }
            htmlStr += "范围搜索<span style=\"color: #f7f213;\">" + problem_name +  "扇区</span>" ;
            //这里顺便将分类筛选和排序中的某些元素进行显示隐藏的控制
            if(problem_name == "越区覆盖" || problem_name == "重叠覆盖" || problem_name == "MOD3干扰"){
                // $("#isNewAddSector").show(); //显示是否新增的筛选条件
                $("#isFilterMrCount").show();//显示mr条数的筛选条件
                $("#sectorRateFirst").show();//显示占比排序
            }else{
                // $("#isNewAddSector").hide(); //隐藏是否新增的筛选条件
                $("#isFilterMrCount").hide();//隐藏mr条数的筛选条件
                $("#sectorRateFirst").hide();//隐藏占比排序
            }

            /*坐标勘误和方位角勘误的筛选和排序的显示隐藏*/
            //先判断公共部分的显示隐藏
            if(problem_name == "坐标勘误" || problem_name == "方位角勘误"){
                $("#isFilterFeederLine").show(); //显示天馈接反筛选
                $("#sectorPoorCountFirst").show(); //显示附近弱区数量优先排序
            }else{
                $("#isFilterFeederLine").hide(); //隐藏天馈接反筛选
                $("#sectorPoorCountFirst").hide(); //隐藏附近弱区数量优先排序
            }

            //坐标勘误自己的筛选条件的显示隐藏
            if(problem_name == "坐标勘误"){
                $("#isFilterDistance").show(); //显示距离筛选
                $("#sectorDistanceFirst").show(); //显示距离优先排序
            }else{
                $("#isFilterDistance").hide(); //隐藏距离筛选
                $("#sectorDistanceFirst").hide(); //隐藏距离优先排序
            }

            if(problem_name == "方位角勘误"){
                $("#isFilterAzimuth").show(); //显示偏离角度筛选
                $("#sectorAzimuthFirst").show(); //显示角度优先排序
            }else{
                $("#isFilterAzimuth").hide(); //隐藏偏离角度筛选
                $("#sectorAzimuthFirst").hide(); //隐藏角度优先排序
            }

        }else{
            //描述当前详情页显示的内容是什么
            problem_name = IntelligentTuning.sectorCompleteVM.sectorData.problem_name;
            if(problem_name == null || problem_name == ""){
                problem_name = "无";
            }
            htmlStr += "基站扇区编号[" + "<span style=\"color: #f7f213;\">" + messageObj.enodeb_id + "_" + messageObj.cell_id + "</span>] 问题类型[" + "<span style=\"color: #f7f213;\">" + problem_name +  "</span>]";
        }
    }
    $("#currentShowWhatMessage").html(htmlStr); //将信息加载到页面上


}

/**
 * ********************************
 * @funcname IntelligentTuning.checkWhereToGo
 * @funcdesc 点击返回的时候确定要返回到哪个页面（现在统一返回列表）
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.checkWhereToGo = function(){

   /* //第一种情况，一进入页面就点击某个扇区或者通过搜索进入到扇区的详情页
    //第二种情况，从列表页进入到扇区详情页且没有再次进入其他扇区详情页了
    if((IntelligentTuning.backList.size() == 1 && IntelligentTuning.backList.get(0).currentLocation == "completeMessage")
        || (IntelligentTuning.backList.size() == 2 && IntelligentTuning.backList.get(1).currentLocation == "completeMessage"
            && IntelligentTuning.backList.get(0).currentLocation == "list")){
        //返回列表
        IntelligentTuning.goBackToList();
        var problem_name = IntelligentTuning.sectorCompleteVM.sectorData.problem_name;
        if(IntelligentTuning.currentProblemName != problem_name){
            IntelligentTuning.doClickProblemButton(problem_name); //如果和进去列表时的问题类型不同，需要切换问题类型
        }
        return;
    }

    //第三种情况,一开始是进入列表的,后面才通过不同点击扇区进入其他扇区的详情页的
    if(IntelligentTuning.backList.size() > 1){
        //因为一进入详情页的时候，会在IntelligentTuning.backList这个列表中加入一个元素，当我们返回时，需要先移除最后一个元素，然后在进行返回操作
        IntelligentTuning.backList.removeIndex(IntelligentTuning.backList.lastIndex()); //移除本身在返回列表中的值
        //获取到要返回的那个扇区的基站ID和小区ID
        var obj = IntelligentTuning.backList.get(IntelligentTuning.backList.lastIndex());
        IntelligentTuning.backList.removeIndex(IntelligentTuning.backList.lastIndex()); //移除上一个页面在返回列表中的值
        //然后调用Vue对象的showMessage方法将对象传入
        IntelligentTuning.sectorVM.showMessage(obj);
    }
*/
    //返回列表
    IntelligentTuning.goBackToList();
    IntelligentTuning.drawMk(IntelligentTuning.sectorVM.sectorList,false); //显示水滴点
    /*var problem_name = IntelligentTuning.sectorCompleteVM.sectorData.problem_name;
    var isPD = IntelligentTuning.sectorCompleteVM.sectorData.isPD; //是否派单的标识
    if(IntelligentTuning.currentProblemName != problem_name && isPD == true){
        IntelligentTuning.doClickProblemButton(problem_name); //如果和进去列表时的问题类型不同，需要切换问题类型
    }*/
    IntelligentTuningMap.clearOverlays(IntelligentTuningMap);//清除地图上的覆盖物
    IntelligentTuningMap.legendGrid(IntelligentTuningMap);//监控图例变化
    IntelligentTuningMap.cacheItem=null;
    IntelligentTuningMap.currentDetailPageCaChe=null;//置空详情页数据的缓存
    return;
}

/**
 * ********************************
 * @funcname IntelligentTuning.doClickProblemButton
 * @funcdesc 根据问题的名称，触发左侧对应的问题按钮
 * @param {String} problem_name : 问题名称
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.doClickProblemButton = function (problem_name){

    if(problem_name == null || problem_name == "" ){
        return ;
    }else{
        switch(problem_name) {
        	case '弱覆盖' :
                $("#poorCoverSectorLogoLeft").trigger("click"); //触发点击事件
        		break;
            case '越区覆盖' :
                $("#cbSectorLogoLeft").trigger("click"); //触发点击事件
                break;
            case '重叠覆盖' :
                $("#olSectorLogoLeft").trigger("click"); //触发点击事件
                break;
            case 'MOD3干扰' :
                $("#m3SectorLogoLeft").trigger("click"); //触发点击事件
                break;
            case '坐标勘误' :
                $("#macSectorLogoLeft").trigger("click"); //触发点击事件
                break;
            case '方位角勘误' :
                $("#macSectorLogoLeft").trigger("click"); //触发点击事件
                break;
            case '下倾角勘误' :
                $("#dipAngleLogoLeft").trigger("click"); //触发点击事件
                break;
        }
    }

}


/**
 * ********************************
 * @funcname IntelligentTuning.queryInSightSectorData
 * @funcdesc 根据日期和地市查询该地市的可视范围内的扇区数据
 * @param {String/int} day 日期
 * @param {String} city  地市名称
 * @param {String} mapType 地图类型传递 ”topMap“ 上方地图  ”bottomMap“  下方地图
 * @param {String} inSightType 可视区域配置的类型 ”列表“ 、”地图“  、“列表+地图”
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuning.queryInSightSectorData = function (day, city,mapType,inSightType) {
    //获取地图的可视范围，取最大最小经纬度
    var map=IntelligentTuningMap.map;
    if(mapType=="bottomMap"){
        map=IntelligentTuningScreen.map;
    }
    var bounds = map.getBounds();
    var minLngminLat=bounds.getSouthWest();//左下角 西南角（最小经度，最小纬度）
    var maxLngmaxLat=bounds.getNorthEast();//右上角 东北角（最大经度，最大纬度）
    var city_id = noceUtil.city_LATN_ID[city];
    if(city_id == null){ //地市ID为空
        alert("无法获取到地市ID，请检查传入的参数是否正确!");
        return;
    }

    var sqlList = [];
    var funcList=[];
    var database=[];
    var params=[];
    var list= ["AntAdj_02_GetAllCells", "DAY:" + day, "CITY_ID:" + city_id, "PROBLEM_NAME: ",
        "MINLNG:  and LONGITUDE_MID_BAIDU>="+minLngminLat.lng,"MAXLNG: and LONGITUDE_MID_BAIDU<="+maxLngmaxLat.lng,
        "MINLAT: and LATITUDE_MID_BAIDU>="+minLngminLat.lat,"MAXLAT: and LATITUDE_MID_BAIDU<="+maxLngmaxLat.lat];
    sqlList.push(list);
    funcList.push(IntelligentTuning.dealInSightSectorData);
    database.push(3);
    params.push([mapType,inSightType]);
    progressbarTwo.submitSql(sqlList, funcList, database,params);

}
/**
 * ********************************
 * @funcname IntelligentTuning.dealInSightSectorData
 * @funcdesc 处理查询返回可视区域内的扇区数据
 * @param {Object} data ： 查询返回的数据
 *@param {Array} params ： [地图类型，可视区域配置]
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuning.dealInSightSectorData=function IntelligentTuning_dealInSightSectorData(data,params){
    var result = callBackChangeData(data);
    var mapType=params[0];
    var inSightType=params[1];
    if(inSightType=="列表"){
        $(".problemList").removeClass("active"); //移除左侧问题类型的高亮
        $("#sectorCitySelect").hide(); //设置区域显示框隐藏
        $("#currentArea").show();//显示当前区域的文字的li
        IntelligentTuning.sectorAreaListChe=result;
        IntelligentTuning.excuteFilterSector();//过滤之后排序后显示在列表上
        if(IntelligentTuning.backList.size() == 0 || IntelligentTuning.backList.get(IntelligentTuning.backList.lastIndex()).currentLocation == "list"){
            IntelligentTuning.goSectorList();
        }else{
            IntelligentTuning.clickEyeBackToList();//触发返回列表的机制
        }
        $('#inSightSector').removeClass('utilBackgroundColor');
    }else if(inSightType=="地图"){
        IntelligentTuningMap.handleCovSectorData(result,mapType);//渲染扇区图层
    }else if(inSightType=="列表+地图"){
        if(IntelligentTuning.backList.size() == 0 || IntelligentTuning.backList.get(IntelligentTuning.backList.lastIndex()).currentLocation == "list"){
            IntelligentTuning.goSectorList();
        }else{
            IntelligentTuning.clickEyeBackToList();//触发返回列表的机制
        }
        $(".problemList").removeClass("active"); //移除左侧问题类型的高亮
        $("#sectorCitySelect").hide(); //设置区域显示框隐藏
        $("#currentArea").show();//显示当前区域的文字的li
        IntelligentTuning.sectorAreaListChe=result;
        IntelligentTuning.excuteFilterSector();//过滤之后排序后显示在列表上
        IntelligentTuningMap.handleCovSectorData(result,mapType);//渲染扇区图层
    }

}

/**
 * ********************************
 * @funcname IntelligentTuning.removeMarkerList
 * @funcdesc 移除地图上所有的水滴点
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuning.removeMarkerList = function IntelligentTuning_removeMarkerList() {
    for (var i = 0; i < IntelligentTuning.markerList.length; i++) {
        IntelligentTuningMap.map.removeOverlay(IntelligentTuning.markerList[i]);
    }
}
/**
 * ********************************
 * @funcname IntelligentTuning.queryAllSectorData
 * @funcdesc 根据日期和地市查询该地市的所有扇区数据
 * @param {String/int} day 日期  {String} city  地市名称 ； {String} mapType ： 表示使用哪个百度地图  ，topMap表示页面上半部分的地图
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentTuning.updateMapSector=function IntelligentTuning_updateMapSector(day, city,mapType){
    var city_id = noceUtil.city_LATN_ID[city];
    if(city_id == null){ //地市ID为空
        alert("无法获取到地市ID，请检查传入的参数是否正确!");
        return;
    }
    var sqlList = [];
    var funcList=[];
    var database=[];
    var params=[];
    if(IntelligentTuningMap.firstLoad){//初始化加载有问题的小区
        var list1 = ["AntAdj_02_GetAllCells", "DAY:" + day, "CITY_ID:" + city_id];//, "PROBLEM_NAME:" + " and PROBLEM_NAME is not null and PROBLEM_NAME <> ''"
        list1.push("PROBLEM_NAME: "+'and sys_status != "已归档"\n' +
            '\t\tand (IS_ANT_CONN_ABNOR=1 OR\n' +
            '\t\t\t\t\tIS_LOCA_ABNOR=1 OR\n' +
            '\t\t\t\t\tis_decl_angle_abnor=1 OR\n' +
            '\t\t\t\t\tIS_CB_COV=1 OR\n' +
            '\t\t\t\t\tIS_EXIST_POOR__AREA=1 OR\n' +
            '\t\t\t\t\tIS_OL_COV=1 OR\n' +
            '\t\t\t\t\tIS_M3_COV=1)');
        sqlList.push(list1);
        funcList.push(IntelligentTuning.firstProblemSectorData);
        database.push(3);
        params.push([]);
    }else{
        var problem_name="and sys_status != '已归档' ";
        var selectElement=IntelligentTuning.currentProblemName;
        if (!isnull(selectElement)) { //所有的扇区
            if(selectElement == "方位角勘误"||selectElement == "天馈接反"){
                problem_name+="and (problem_name='天馈接反' or is_ant_conn_abnor=1)"
            }else if(selectElement == "坐标勘误"){
                problem_name+="and (problem_name='坐标勘误' or is_loca_abnor=1)"
            }else if(selectElement == "越区覆盖"){
                problem_name+="and (problem_name='越区覆盖' or is_cb_cov=1)"
            }else if(selectElement == "重叠覆盖"){
                problem_name+="and (problem_name='重叠覆盖' or is_ol_cov=1)"
            }else if(selectElement == "MOD3干扰"){
                problem_name+="and (problem_name='MOD3干扰' or is_m3_cov=1)"
            }else if(selectElement == "弱覆盖"){
                problem_name+="and (problem_name='弱覆盖' or is_exist_poor__area=1)"
            }else if(selectElement == "下倾角勘误"){
                problem_name+="and (problem_name='下倾角勘误' or is_decl_angle_abnor=1)"
            }
        }
        var list2= ["AntAdj_02_GetAllCells", "DAY:" + day, "CITY_ID:" + city_id, "PROBLEM_NAME: "+problem_name];
        sqlList.push(list2);
        funcList.push(IntelligentTuning.handleMapSector);
        database.push(3);
        params.push([mapType]);
    }
    progressbarTwo.submitSql(sqlList, funcList, database,params);
}


/**
 * ********************************
 * @funcname IntelligentTuning.handleMapSector
 * @funcdesc 处理地图查询回来的数据
 * @param {Object} data  回调函数返回的地图上的扇区数据
 * @param {Array} params 地图的标志
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentTuning.handleMapSector=function IntelligentTuning_handleMapSector(data,params){
    var result = callBackChangeData(data);
    // var tempResult=IntelligentTuning.filtSectorByProblem(result);
    IntelligentTuningMap.handleCovSectorData(result,params[0]);//渲染扇区图层

}



