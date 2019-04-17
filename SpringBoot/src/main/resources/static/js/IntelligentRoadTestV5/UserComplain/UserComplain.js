/*实现用户抱怨功能的js*/

$("#filterUserComplain").click(function(){
    IntelligentRoadTest.getUserComplainListByOption();//获取到筛选后的数据并展示
    IntelligentRoadTestSystemLayerV3.initUC();
    $("#userComplainList").hide();
    var city = $("#userComplainCityName").text();
    IntelligentRoadTest.submitLayersData(city);
});

//用户抱怨列表的属性
IntelligentRoadTest.userComplainResult = [];//用户抱怨列表查询数据的缓存
IntelligentRoadTest.userComplainCurrentResult = [];//用户抱怨列表当前数据的缓存
IntelligentRoadTest.userComplainVM = null; //用户抱怨列表的Vue对象
IntelligentRoadTest.userComplainCurrentPage = 1; //用户抱怨列表的当前页数
IntelligentRoadTest.userComplainTotalPage = 0; //用户抱怨列表总页数
IntelligentRoadTest.userComplainTotalCount = 0;//用户抱怨列表总记录数
IntelligentRoadTest.userComplainCrossFliterObj = crossfilter([]);//crossflilter对象
IntelligentRoadTest.filterUserComplainResult = [];//筛选后的用户抱怨数据
IntelligentRoadTest.tempUserComplainFliterObj = null;//临时数据集
IntelligentRoadTest.isFilterUserComplain = false;//是否排序过
IntelligentRoadTest.userComplainCurrentSelectConditon = "";//用户抱怨列表的前一个查询条件缓存

IntelligentRoadTest.userComplainObj = {
    index : 29,
    name : "userComplain",
    senseName:"用户抱怨",
}; //用户抱怨的基本信息对象


//用户抱怨筛选
$("#userComplainList .flexRow > .flexCol").not(".flexCol:first-child").click(function(){

    //定义对象维度
    if(IntelligentRoadTest.tempConcernFliterObj == null){
        IntelligentRoadTest.tempConcernFliterObj = crossfilter([]);
        IntelligentRoadTest.tempConcernFliterObj.add(IntelligentRoadTest.userComplainResult);
    }else{
        IntelligentRoadTest.tempConcernFliterObj.remove();
        IntelligentRoadTest.tempConcernFliterObj.add(IntelligentRoadTest.userComplainResult);
    }

    if(IntelligentRoadTest.userComplainFilterConditionArr == null){ //用户抱怨的筛选条件数组
        IntelligentRoadTest.userComplainFilterConditionArr = ["不限" , "不限" , "不限"];
    }
    // var userComplainListFilter = IntelligentRoadTest.tempConcernFliterObj.dimension(function(d) { return d });
    $(this).addClass("selected").siblings().removeClass("selected");

    var flexColText = $(this).parent().next().children();
    var allFlexRow = $(this).parent().parent().children();

    //判断点击的分类是否是全部
    var clickHtml= $(this).parent().children()[0].innerHTML;//全部分类
    var selectElement=$(this)[0].innerHTML;
    if(clickHtml=="全部分类"){

        $("#userComplainListSelectName").text("全部分类");
        $("#userComplainList").hide();
        IntelligentRoadTest.userComplainFilterConditionArr = ["不限" , "不限" , "不限"];
        var dealCache = allFlexRow[1].children[1];//栅格数量
        $(dealCache).addClass("selected").siblings().removeClass("selected");
        var dealCache = allFlexRow[2].children[1];//区域类型
        $(dealCache).addClass("selected").siblings().removeClass("selected");
        var dealCache = allFlexRow[3].children[1];//共享状态
        $(dealCache).addClass("selected").siblings().removeClass("selected");
        /*userComplainListFilter.filter(function(d){
            return d;
        });*/
    }else if(clickHtml=="栅格数量"){
        $("#userComplainListSelectName").text("栅格数量");
        $("#userComplainList").hide();
        IntelligentRoadTest.userComplainFilterConditionArr[0] = selectElement;
    }else if(clickHtml=="区域类型"){
        $("#userComplainListSelectName").text("区域类型");
        $("#userComplainList").hide();
        IntelligentRoadTest.userComplainFilterConditionArr[1] = selectElement;
    }else if(clickHtml=="共享状态"){
        $("#userComplainListSelectName").text("共享状态");
        $("#userComplainList").hide();
        IntelligentRoadTest.userComplainFilterConditionArr[2] = selectElement;
    }

    //}
    //console.log(rfgFilter.top(tempFliterObj.size()));
    var userComplainListFilter = IntelligentRoadTest.userComplainFilter(IntelligentRoadTest.userComplainResult , IntelligentRoadTest.userComplainFilterConditionArr);
    var tempData = userComplainListFilter.top(IntelligentRoadTest.tempConcernFliterObj.size());//过滤后的结果集
    IntelligentRoadTest.tempConcernFliterObj.remove();//移除
    IntelligentRoadTest.tempConcernFliterObj = crossfilter([]);
    userComplainListFilter = IntelligentRoadTest.tempConcernFliterObj.dimension(function(d) { return d });
    IntelligentRoadTest.tempConcernFliterObj.add(tempData);
    //过滤后回显数据
    IntelligentRoadTest.filterUserComplainResult = tempData;
    IntelligentRoadTest.userComplainCurrentResult = IntelligentRoadTest.filterConcernArenResult;
    IntelligentRoadTest.isFilterUserComplain = true;
    $("#userComplainSort ul li.selected").trigger("click");
});


//-----------------------------用户抱怨列表开始-------------------------------------
/**
 * ********************************
 * @funcname IntelligentRoadTest.queryAllUserComplain
 * @funcdesc 查询所有的用户抱怨数据，包含全量工单，越级工单和抱怨热点
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.queryAllUserComplain = function(){

    //模板参数有两个，一个是选中日期，格式为yyyy-MM-dd ,一个是地市条件（只有在地市用户的时候才会用到，省级用户不需要用到这个条件）
    //模板1和模板2的地市条件为  and BELONG_CITY = '地市名称'  模板3 为 and city = '地市名称'
    var cityCondition = ""; //模板1和模板2的地市条件
    var cityCondition2 = ""; //模板3的地市条件
    var currentCity = $("#cityPermission_common").val();
    if( currentCity != null && currentCity.trim() != "全省"){ //地市用户
        cityCondition = " and BELONG_CITY = '" + currentCity + "'";
        cityCondition2 = "and city = '" + currentCity + "'";
    }
    var countryCondition1 = "";
    var countryCondition2 = "";
    if(!isNull(IntelligentRoadTest.countryPermission_common)){ //区县用户不可以看全市
        countryCondition1 = "and COMPLAINT_COUNTY = '" + IntelligentRoadTest.countryPermission_common + "'";
        countryCondition2 = "and COUNTY = '" + IntelligentRoadTest.countryPermission_common + "'";
    }
    var startDay = new Date(dealDateString(IntelligentRoadTest.day).getTime() - 6 * 24 * 60 * 60 * 1000).Format("yyyy-MM-dd"); //开始时间
    var endDay = dealDateString(IntelligentRoadTest.day).Format("yyyy-MM-dd");//结束时间
    var startHotDay= new Date(new Date(startDay).getTime() -   24 * 60 * 60 * 1000).Format("yyyy-MM-dd"); //抱怨热点开始时间
    var endHotDay= new Date(new Date(endDay).getTime() -   24 * 60 * 60 * 1000).Format("yyyy-MM-dd"); //抱怨热点结束时间
    var sqlList = [];
    var list = ["IntelligentRoadTestAnalysis_UC_01_wo_abc" , "DAY_BEGIN:" + startDay ,"DAY_END:" + endDay , "CITY:" + cityCondition , "COUNTRY:"  + countryCondition1];
    var list2 = ["IntelligentRoadTestAnalysis_UC_02_wo_LEAPFROG" , "DAY_BEGIN:" + startDay ,"DAY_END:" + endDay , "CITY:" + cityCondition , "COUNTRY:"  + countryCondition1];
    var list3 = ["IntelligentRoadTestAnalysis_UC_03_wo_hot" , "DAY_BEGIN:" + startHotDay , "DAY_END:" + endHotDay ,"CITY:" + cityCondition2 , "COUNTRY:"  + countryCondition2];
    sqlList.push(list);
    sqlList.push(list2);
    sqlList.push(list3);
    var funcList = [IntelligentRoadTest.dealAllUserComplainData , IntelligentRoadTest.dealAllUserComplainData , IntelligentRoadTest.dealAllUserComplainData];
    var database = [3 , 3 , 3];
    if(IntelligentRoadTest.userComplainCurrentSelectConditon == null || IntelligentRoadTest.userComplainCurrentSelectConditon != IntelligentRoadTest.day){ //需要查询数据
        IntelligentRoadTest.userComplainQueryFlag == null;
        progressbarTwo.submitSql(sqlList , funcList , database ,null,null,null,null,false,['UserComplain', 'UserComplain' , 'UserComplain']);
        IntelligentRoadTest.userComplainCurrentSelectConditon = IntelligentRoadTest.day;
    }else{
        if(IntelligentRoadTest.userComplainQueryFlag == 3){
            IntelligentRoadTest.getUserComplainListByOption();//显示列表
        }
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.dealAllUserComplain
 * @funcdesc 用户抱怨查询的回调函数，将数据进行合并，并缓存到全局变量中
 * @param {Object} data ：查询返回的数据对象
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealAllUserComplainData = function IntelligentRoadTest_dealAllUserComplainData(data){
    var result = callBackChangeData(data);
    console.log(result);
    if(IntelligentRoadTest.userComplainQueryFlag == null || IntelligentRoadTest.userComplainQueryFlag == 3){ //如果查询标识为null则说明是第一次查询，如果为3则说明之前查询过，现在重新查询数据
        IntelligentRoadTest.userComplainQueryFlag = 1;
        IntelligentRoadTest.userComplainResult = []; //清空数组
    }else{
        IntelligentRoadTest.userComplainQueryFlag++;
    }

    //将数据进行合并
    for(var i = 0; i < result.length; i++){
        /*if(result[i].longitude != null && result[i].longitude != "" && result[i].latitude != null && result[i].latitude != "" ){ //过滤掉经纬度为空的数据

        }*/
        IntelligentRoadTest.userComplainResult.push(result[i]);
    }

    if(IntelligentRoadTest.userComplainQueryFlag == 3){ //说明数据都已经查询回来并合并好了。
        console.log(IntelligentRoadTest.userComplainResult);
        IntelligentRoadTest.userComplainCrossFliterObj.remove();
        IntelligentRoadTest.userComplainCrossFliterObj.add(IntelligentRoadTest.userComplainResult);
        IntelligentRoadTest.userComplainResult = IntelligentRoadTest.userComplainResult ;
        // IntelligentRoadTest.userComplainCurrentResult = result;
        //数据查询完成之后展示列表
        IntelligentRoadTest.getUserComplainListByOption(IntelligentRoadTest.userComplainResult);
        showOrHideInputImage(1);
        //如果在用户抱怨的详情页，需要将最新的数据显示在详情页中
        IntelligentRoadTest.filterByIdAndShow();
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.getUserComplainListByOption
 * @funcdesc 根据当前的条件获取到列表数据
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getUserComplainListByOption = function(){
    /*筛选数据*/
    var city = $("#userComplainCityName").text();
    var country = $("#userComplainDistrictName").text();
    var mktcenter = $("#userComplainMktName").text();
    if(city != null && country == "全市"){ //查询级别的数据
        country = null;
        mktcenter = null;
    }else if(city != null && country != "全市" && mktcenter == "全区"){ //查询区县级别的数据
        mktcenter = null
    }/*else if(city != null && country != "全市" && mktcenter != "全区"){ //查询营服级别的数据

    }*/
    var allAlarmInfo = []; //全量工单条件数组
    var hotComplain = [];//抱怨热点条件数组
    var crossLevelAlarmInfo = [];//越级工单条件数组
    var checkBoxList = $(".userComplainTB input:checked");
    for(var i = 0; i < checkBoxList.length; i++){
        var elementID = $(checkBoxList[i]).attr("id");
    	switch(elementID) {
    		case 'wuxianceB' :
                allAlarmInfo.push("投诉单");
    			break;
            case 'hexinceN' :
                allAlarmInfo.push("NOC投诉单");
                break;
            case 'ziyuanleiC' :
                allAlarmInfo.push("需求单");
                break;
            case 'yibihuan' :
                hotComplain.push(1);
                break;
            case 'weibihuanless3' :
                hotComplain.push(2);
                break;
            case 'weibihuanmore3' :
                hotComplain.push(3);
                break;
            case 'gongxinbukaohe' :
                crossLevelAlarmInfo.push("工信部越级");
                break;
            case 'jituankaohe' :
                crossLevelAlarmInfo.push("集团越级");
                break;
            case 'gongxinbuguidang' :
                crossLevelAlarmInfo.push("越级考核");
                break;
            case 'jituanguidang' :
                crossLevelAlarmInfo.push("越级归档");
                break;
    	}
    }
    IntelligentRoadTest.userComplainFilterConditonArr = {
        allAlarmInfo : allAlarmInfo, //全量工单条件数组
        hotComplain : hotComplain , //抱怨热点条件数组
        crossLevelAlarmInfo:crossLevelAlarmInfo//越级工单条件数组
    }

    //获取分类筛选的选择结果
    var userComplainList = IntelligentRoadTest.filterUserComplainData(city , country , mktcenter , allAlarmInfo , hotComplain ,crossLevelAlarmInfo); //获取筛选之后的数据
    IntelligentRoadTest.dealQueryAllUserComplain(userComplainList);
    // IntelligentRoadTestSystemLayerV3.setUcByList(allAlarmInfo,hotComplain,crossLevelAlarmInfo);//更新图层

}

/**
 * ********************************
 * @funcname IntelligentRoadTest.filterById
 * @funcdesc 根据当前所在的用户抱怨详情页，从所有数据中根据其ID过滤出该条数据并显示在详情页中
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.filterByIdAndShow = function(){
    if(IntelligentRoadTest.currentLocation == "userComplain"){
        var item = IntelligentRoadTest.userComplainCompleteVM.userComplain; //获取到对象，其中的某个指标是用于确认唯一的标识
        var flag = false; //判断是否过滤出来这条数据的标识
        if(item.type == "全量工单" || item.type == "越级工单"){ //工单类型的过滤
            for(var i = 0; i < IntelligentRoadTest.userComplainResult.length; i++){
                if(IntelligentRoadTest.userComplainResult[i].workorder_id == item.workorder_id){
                    IntelligentRoadTest.userComplainVM.showMessage(IntelligentRoadTest.userComplainResult[i] , null);
                    flag = true; //筛选出了数据
                    return;
                }
            }
            if(flag == false){ //未找到数据
                var obj = {
                    type : item.type ,
                    workorder_id : item.workorder_id,
                    longitude : item.longitude,
                    latitude : item.latitude
                };
                IntelligentRoadTest.userComplainVM.showMessage(obj , null); //只显示工单单号
                alert("您所选日期并没有该工单的数据！请选择其他日期！");
            }
        }else{ //抱怨热点
            for(var i = 0; i < IntelligentRoadTest.userComplainResult.length; i++){
                if(IntelligentRoadTest.userComplainResult[i].workorder_id == item.workorder_id){
                    IntelligentRoadTest.userComplainVM.showMessage(IntelligentRoadTest.userComplainResult[i] , null);
                    flag = true; //筛选出了数据
                    return;
                }
            }
            if(flag == false){ //未找到数据
                var obj = {
                    type : item.type ,
                    workorder_id : item.workorder_id,
                    longitude : item.longitude,
                    latitude : item.latitude
                };
                IntelligentRoadTest.userComplainVM.showMessage(obj , null); //只显示工单单号
                alert("您所选日期并没有该抱怨热点的数据！请选择其他日期！");
            }
        }
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.getUserComplainByArea
 * @funcdesc 获取指定区域内的用户抱怨数据
 * @param  * {String}city_name : 地市名称, {String} country_name ： 区县名称 ,
 * {String} mktcenter_name ：营服中心名称
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getUserComplainByArea = function(city_name , country_name , mktcenter_name){
    var result = IntelligentRoadTest.userComplainResult;
    var tempResult = [];//作为一个中间的数据缓存
    //定义对象维度
    var temoFilterObj = crossfilter([]);
    temoFilterObj.add(result);

    var objFilter = temoFilterObj.dimension(function(d) { return d });
    var selectElement = city_name;
    objFilter.filter(function(d){
        if(selectElement == null ||selectElement == "null" ){ //地市条件为空
            return d;
        }else {
            if(d.city == selectElement || d.complaint_city == selectElement){ //按照地市过滤数据
                return d;
            }
        }
    });

    tempResult = objFilter.top(result.length);
    var temoFilterObj1 = crossfilter(tempResult);
    var objFilter1 = temoFilterObj1.dimension(function(d) { return d });
    selectElement = country_name;
    if(selectElement == null || selectElement == "null"){ //按区县过滤数据
        objFilter1.filter();
    }else{
        objFilter1.filter(function(d){
            if(d.complaint_county == selectElement || d.county == selectElement){
                return d;
            }
        });
    }

    tempResult = objFilter1.top(result.length);
    var temoFilterObj2 = crossfilter(tempResult);
    var objFilter2 = temoFilterObj2.dimension(function(d) { return d });
    selectElement = mktcenter_name;
    objFilter2.filter(function(d){
        if(selectElement == null || selectElement == "null"){ //按营服中心过滤数据
            return d;
        }else {
            if(d.mktcenter == selectElement){
                return d;
            }
        }
    });

    return objFilter2.top(result.length); //返回数据
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.filterUserComplainData
 * @funcdesc 根据传入的条件进行筛选过滤
 * {String}city_name : 地市名称, {String} country_name ： 区县名称 ,
 * {String} mktcenter_name ：营服中心名称
 * {Array} : allAlarmCondArr : 表示全量工单的筛选条件，如果为空数组，则不显示全量工单的数据   条件如下：无线侧B    核心侧N  资源类C   对应传入的值为“投诉单”、“NOC投诉单”、“需求单”
 * {Array} ：hotComplainCondition ： 抱怨热点的筛选条件 改为多选
 *  * 这里使用代号代表各个选项：
 * 1 ： 已闭环
 * 2 ： 未闭环持续3周以内（<3）
 * 3 ： 未闭环持续3周以上（≥3）
 * {Arrayy} crossLevelAlarmCondArr ： 越级工单的筛选条件，如果为空数组则不显示越级工单的数据
 * @return {Array}
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.filterUserComplainData = function(city_name , country_name , mktcenter_name , allAlarmCondArr , hotComplainCondition , crossLevelAlarmCondArr ){

    var afterFilterData = [];
    var areaResult = IntelligentRoadTest.getUserComplainByArea(city_name , country_name , mktcenter_name); //获取指定区域的用户抱怨数据
    IntelligentRoadTest.getUserComplainColorList();//获取每一个种类的颜色
    IntelligentRoadTest.getUserComplainTypeNameList();
    //全量工单的条件筛选
    var temoFilterObj3 = crossfilter(areaResult);
    var objFilter3 = temoFilterObj3.dimension(function(d) { return d });
    var selectElement = allAlarmCondArr;
    objFilter3.filter(function(d){
        if(selectElement == null || selectElement.length == 0){ //说明没有任何一个选项被勾选上
            //不返回任何数据
        }else {
            if(d.type == "全量工单"){
                if(selectElement.indexOf(d.workorder_type) > -1){ //如果数据中的workorder_type类型在勾选的类型中，则返回数据
                    d.color = IntelligentRoadTest.userComplainColorList[d.workorder_type];
                    d.typeName = IntelligentRoadTest.userComplainTypeNameList[d.workorder_type];
                    return d;
                }
            }
        }
    });

    afterFilterData = afterFilterData.concat(objFilter3.top(areaResult.length));

    //抱怨热点的条件筛选 （单选或不选）
    var temoFilterObj4 = crossfilter(areaResult);
    var objFilter4 = temoFilterObj4.dimension(function(d) { return d });
    selectElement = hotComplainCondition;
    objFilter4.filter(function(d){
        if(selectElement == null || selectElement == "null"){ //说明没有任何一个选项被勾选上
            //不返回任何数据
        }else {//是否闭环用CLOSE_LOOP判断  持续时间用CONTINUED_CYCLE判断
            if(d.type == "抱怨热点"){
                /*
                            * 这里使用代号代表各个选项：
                            * 1 ： 已闭环
                            * 2 ： 未闭环持续3周以内（<3）
                            * 3 ： 未闭环持续3周以上（≥3）
                            * */
                if(selectElement.length == 3){ //三个选项全部勾选上了
                    if(d.close_loop == 1){
                        d.color = IntelligentRoadTest.userComplainColorList["1"];
                        d.typeName = IntelligentRoadTest.userComplainTypeNameList["1"];
                    }
                    if(d.close_loop == 0 && d.continued_cycle < 3){
                        d.color = IntelligentRoadTest.userComplainColorList["2"];
                        d.typeName = IntelligentRoadTest.userComplainTypeNameList["2"];
                    }
                    if(d.close_loop == 0 && d.continued_cycle >= 3){
                        d.color = IntelligentRoadTest.userComplainColorList["3"];
                        d.typeName = IntelligentRoadTest.userComplainTypeNameList["3"];
                    }
                    return d;
                }else{
                    for(var m = 0 ; m < selectElement.length; m++){
                        if(selectElement[m] == 1){ //已闭环
                            if(d.close_loop == 1){
                                d.color = IntelligentRoadTest.userComplainColorList["1"];
                                d.typeName = IntelligentRoadTest.userComplainTypeNameList["1"];
                                return d;
                            }
                        }else if(selectElement[m] == 2){ //未闭环持续3周以内（<3）
                            if(d.close_loop == 0 && d.continued_cycle < 3){
                                d.color = IntelligentRoadTest.userComplainColorList["2"];
                                d.typeName = IntelligentRoadTest.userComplainTypeNameList["2"];
                                return d;
                            }
                        }else if(selectElement[m] == 3){ // 未闭环持续3周以上（≥3）
                            if(d.close_loop == 0 && d.continued_cycle >= 3){
                                d.color = IntelligentRoadTest.userComplainColorList["3"];
                                d.typeName = IntelligentRoadTest.userComplainTypeNameList["3"];
                                return d;
                            }
                        }
                    }
                }
            }
        }
    });

    afterFilterData = afterFilterData.concat(objFilter4.top(areaResult.length));

    //越级工单的条件筛选
    var temoFilterObj5 = crossfilter(areaResult);
    var objFilter5 = temoFilterObj5.dimension(function(d) { return d });
    selectElement = crossLevelAlarmCondArr;
    objFilter5.filter(function(d){
        if(selectElement == null || selectElement.length == 0){ //说明没有任何一个选项被勾选上
           //不返回任何数据
        }else {
            if(d.type == "越级工单"){
                if(selectElement.indexOf("越级考核") > -1){ //需要显示越级考核的工单
                    if(d.workorder_type2 == "考核工单"){
                        d.color = IntelligentRoadTest.userComplainColorList["越级考核"];
                        d.typeName = IntelligentRoadTest.userComplainTypeNameList["越级考核"];
                        return d;
                    }
                }
                if(selectElement.indexOf("越级归档") > -1){ //需要显示越级归档的工单
                    if(d.workorder_type2 == "归档工单"){
                        d.color = IntelligentRoadTest.userComplainColorList["越级归档"];
                        d.typeName = IntelligentRoadTest.userComplainTypeNameList["越级归档"];
                        return d;
                    }
                }
                if(selectElement.indexOf("工信部越级") > -1){ //需要显示工信部越级的工单
                    if(d.workorder_type == "工信部预处理"){
                        d.color = IntelligentRoadTest.userComplainColorList["工信部越级"];
                        d.typeName = IntelligentRoadTest.userComplainTypeNameList["工信部越级"];
                        return d;
                    }
                }
                if(selectElement.indexOf("集团越级") > -1){ //需要显示集团越级的工单
                    if(d.workorder_type == "集团网络投诉" || d.workorder_type == "4008热线"){
                        d.color = IntelligentRoadTest.userComplainColorList["集团越级"];
                        d.typeName = IntelligentRoadTest.userComplainTypeNameList["集团越级"];
                        return d;
                    }
                }
            }
        }
    });
    afterFilterData = afterFilterData.concat(objFilter5.top(areaResult.length));

    var selectCondition = $("#searchText").val().trim();
    if(selectCondition == null || selectCondition == ""){ //没有搜索条件
        return afterFilterData; //返回数据
    }else{
//越级工单的条件筛选
        var temoFilterObj6 = crossfilter(afterFilterData);
        var objFilter6 = temoFilterObj6.dimension(function(d) { return d });
        selectElement = selectCondition;
        objFilter6.filter(function(d){
            if((d.workorder_id != null && d.workorder_id.toString().indexOf(selectCondition) > -1)
                || (d.gridid != null && d.gridid.toString().indexOf(selectCondition) > -1)){
                return d;
            }
        });
        afterFilterData = objFilter6.top(areaResult.length);
        return afterFilterData;
    }
}

//列表显示的代码
/**
 * ********************************
 * @funcname IntelligentRoadTest.dealQueryAllUserComplain
 * @funcdesc 处理列表的数据，将数据赋值给当前用户抱怨列表数据缓存的变量
 * @param {Array} result 数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.dealQueryAllUserComplain = function IntelligentRoadTest_dealQueryAllUserComplain(result) {
    console.log(result);
    //IntelligentRoadTest.userComplainData(result);
    // $("#userComplainList .flexRow ").eq(0).children(".selected").trigger("click")

    /*var SelectName = $("#userComplainListSelectName").text();
    var flexCol = $("#userComplainList  .flexRow .flexCol");
    IntelligentRoadTest.triggleFilter(SelectName, flexCol);*/
    IntelligentRoadTest.userComplainCurrentResult = result;
    IntelligentRoadTest.userComplainData(result);//显示列表（暂时不考虑排序问题。后面加上排序则需要排序之后再调用这个方法
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.userComplainData
 * @funcdesc 创建用户抱怨列表的Vue对象并显示列表数据
 * @param {Array} result 要显示的数据
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.userComplainData = function IntelligentRoadTest_userComplainData(result){
    IntelligentRoadTest.userComplainCurrentPage = 1;
    IntelligentRoadTest.userComplainTotalCount = result.length;
    var pageCount = result.length / IntelligentRoadTest.pageSize;
    if((result.length % IntelligentRoadTest.pageSize) != 0){
        IntelligentRoadTest.userComplainTotalPage = parseInt(pageCount) + 1 ; //总页数，没有整除时加上1
    }else{
        IntelligentRoadTest.userComplainTotalPage = pageCount;  //整除不用加1
    }

    if(IntelligentRoadTest.userComplainVM == null){
        IntelligentRoadTest.userComplainVM = new Vue({
            el : '#showUserComplainDataDiv',
            data : {
                userComplainList : IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.userComplainCurrentResult , IntelligentRoadTest.userComplainCurrentPage),
                totalPages : IntelligentRoadTest.userComplainTotalPage,
                totalCounts :  IntelligentRoadTest.userComplainTotalCount ,
                currentPageNum :  IntelligentRoadTest.userComplainCurrentPage,
                startIndex : IntelligentRoadTest.startIndex ,
                lastIndex : IntelligentRoadTest.lastIndex,
                uname : IntelligentRoadTest.currentUser
            },
            methods : {
                showMessage : function (item , index){
                    IntelligentRoadTest.mkIndex=index;
                    IntelligentRoadTest.cacheItem=item;
                    IntelligentRoadTest.goUserComplainCompleteMessage();
                    if(item.longitude != null &&  item.longitude != "" && item.latitude != null && item.latitude != ""){
                        IntelligentRoadTestSystemLayerV3.highLightUserComplain(item,IntelligentRoadTest.currentLocation);//高亮对象
                    }
                    //需要修改
                    if(IntelligentRoadTest.mapClick){
                        IntelligentRoadTest.mapClick=false;
                    }else{
                        // var zoom=getZoom(item.max_longitude_baidu,item.min_longitude_baidu,item.max_latitude_baidu,item.min_latitude_baidu);
                        if(item.longitude != null &&  item.longitude != "" && item.latitude != null && item.latitude != ""){
                            IntelligentRoadTest.map.panTo(new BMap.Point(item.longitude , item.latitude));
                        }
                    }
                    setTimeout(function(){
                        IntelligentRoadTest.openThreeLable();//呈现地图的信息提示框
                    },800);
                    if(!IntelligentRoadTest.isScreenCompared&&IntelligentRoadTest.isAddMessageEvent){//不是在分屏页，并且点击过分屏
                        if(!windowScreeen.closed){//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
                            // windowScreeen.focus();
                            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item,'userComplain');
                        }
                    }
                    // IntelligentRoadTest.showPolygon(item.gis_data_baidu,undefined,"userComlain",item.id,IntelligentRoadTest.day,item.area_name);
                    // IntelligentRoadTest.loadGrid(item.max_longitude_baidu,item.min_longitude_baidu,item.max_latitude_baidu,item.min_latitude_baidu);

                    // $("#colorBar").click();

                    var RecentCellImg = $("#showUserComplainCompleteMessage").find('.linkCell').children('img');
                    $(RecentCellImg).each(function(){
                        var srcText = $(this).attr('src');
                        var clickImg=srcText.replace("nor","click");
                        var norImg=srcText.replace("click","nor");
                        if(srcText==clickImg){
                            $(this).attr('src',norImg);
                        }
                    });
                    // IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                    // IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                    if(IntelligentRoadTest.userComplainCompleteVM == null){
                        IntelligentRoadTest.userComplainCompleteVM = new Vue({
                            el : '#showUserComplainCompleteMessage' ,
                            data : {
                                userComplain : item ,
                                dataIndex : index ,
                            },
                            methods : {
                                //对象定位
                                userComplainPosition : function(item){
                                    IntelligentRoadTest.userComplainPosition(item);
                                },
                                showDetailInfo :function (event){
                                    IntelligentRoadTest.showDetailInfo(event);
                                },
                                gotoShowSectorMessage : function (sectorDate){
                                    IntelligentRoadTest.clickType=1;
                                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid , sectorDate.cellid , IntelligentRoadTest.day);
                                },
                                gotoKPIList : function (item){
                                    if(item.sector_set != null){
                                        var sectorArr = item.sector_set.split("@");
                                        IntelligentRoadTest.loadKPIListData(sectorArr);
                                        $("#kpiBackPoor").html("返回上一级");
                                    }
                                }
                            }
                        });
                    }else{
                        IntelligentRoadTest.userComplainCompleteVM.userComplain = item;
                        IntelligentRoadTest.userComplainCompleteVM.dataIndex = index;
                    }
                },
                lastOrNext : function (type) {
                    if(type == 0){
                        //上一页
                        if(IntelligentRoadTest.userComplainCurrentPage >  1){
                            IntelligentRoadTest.userComplainCurrentPage = IntelligentRoadTest.userComplainCurrentPage - 1;
                            IntelligentRoadTest.userComplainVM.userComplainList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.userComplainCurrentResult , IntelligentRoadTest.userComplainCurrentPage);
                            IntelligentRoadTest.userComplainVM.currentPageNum = IntelligentRoadTest.userComplainCurrentPage;
                            IntelligentRoadTest.userComplainVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.userComplainVM.lastIndex = IntelligentRoadTest.lastIndex;
                        }else{
                            alert("当前页是第一页");
                        }
                    }else{
                        if(IntelligentRoadTest.userComplainCurrentPage < IntelligentRoadTest.userComplainTotalPage){
                            IntelligentRoadTest.userComplainCurrentPage = IntelligentRoadTest.userComplainCurrentPage + 1;
                            IntelligentRoadTest.userComplainVM.userComplainList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.userComplainCurrentResult , IntelligentRoadTest.userComplainCurrentPage);
                            IntelligentRoadTest.userComplainVM.currentPageNum = IntelligentRoadTest.userComplainCurrentPage;
                            IntelligentRoadTest.userComplainVM.startIndex = IntelligentRoadTest.startIndex;
                            IntelligentRoadTest.userComplainVM.lastIndex = IntelligentRoadTest.lastIndex;
                        }
                    }
                    // $("#userComplainCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
                    //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.userComplainTotalCount +"条数据)");
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.userComplainVM.userComplainList,29);
                },
                gotoPage : function(){
                    var page = $("#userComplainPage").val();
                    page  = parseInt(page);
                    if(page > 0 && page <= IntelligentRoadTest.userComplainTotalPage){
                        IntelligentRoadTest.userComplainCurrentPage = page;
                        IntelligentRoadTest.userComplainVM.userComplainList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.userComplainCurrentResult , IntelligentRoadTest.userComplainCurrentPage);
                        IntelligentRoadTest.userComplainVM.currentPageNum =IntelligentRoadTest.userComplainCurrentPage;
                        IntelligentRoadTest.userComplainVM.startIndex = IntelligentRoadTest.startIndex;
                        IntelligentRoadTest.userComplainVM.lastIndex = IntelligentRoadTest.lastIndex;
                    }
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.userComplainVM.userComplainList,29);
                    // $("#userComplainCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
                    //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.userComplainTotalCount +"条数据)");
                },
                goLast :function () {
                    IntelligentRoadTest.userComplainCurrentPage = IntelligentRoadTest.userComplainTotalPage;
                    IntelligentRoadTest.userComplainVM.userComplainList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.userComplainCurrentResult , IntelligentRoadTest.userComplainCurrentPage);
                    IntelligentRoadTest.userComplainVM.currentPageNum = IntelligentRoadTest.userComplainCurrentPage;
                    IntelligentRoadTest.userComplainVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.userComplainVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.userComplainVM.userComplainList,29);
                    $("#userComplainCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.userComplainTotalCount +"条数据)");
                },
                goFirst :function () {
                    IntelligentRoadTest.userComplainCurrentPage = 1;
                    IntelligentRoadTest.userComplainVM.userComplainList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.userComplainCurrentResult , IntelligentRoadTest.userComplainCurrentPage);
                    IntelligentRoadTest.userComplainVM.currentPageNum = IntelligentRoadTest.userComplainCurrentPage;
                    IntelligentRoadTest.userComplainVM.startIndex = IntelligentRoadTest.startIndex;
                    IntelligentRoadTest.userComplainVM.lastIndex = IntelligentRoadTest.lastIndex;
                    IntelligentRoadTest.drawMk(IntelligentRoadTest.userComplainVM.userComplainList,29);
                    $("#userComplainCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
                        + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.userComplainTotalCount +"条数据)");
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
                            IntelligentRoadTest.openInfoWindow(lng,lat,item.workorder_id);
                        }
                        IntelligentRoadTest.addMk(lng,lat,img,i,color,item.workorder_id , item.type);
                        $("#showUserComplainDataDiv").find(".listUL > li").eq(i).find(".numSpan").css("background","url(../js/IntelligentRoadTest/images/bg_num.png)");
                        $("#showUserComplainDataDiv").find(".listUL > li").eq(i).css("background","#fff");
                    }
                    $("#showUserComplainDataDiv").find(".listUL > li").eq(index).find(".numSpan").css("background","url(../js/IntelligentRoadTest/images/maker2.png)");
                    $("#showUserComplainDataDiv").find(".listUL > li").eq(index).css("background","#f4f4f4");
                }
            }
        });
    }else{ //改变数值
        IntelligentRoadTest.userComplainVM.userComplainList = IntelligentRoadTest.getDataListByPage(IntelligentRoadTest.userComplainCurrentResult , IntelligentRoadTest.userComplainCurrentPage);
        IntelligentRoadTest.userComplainVM.totalPages = IntelligentRoadTest.userComplainTotalPage;
        IntelligentRoadTest.userComplainVM.totalCounts =  IntelligentRoadTest.userComplainTotalCount ;
        IntelligentRoadTest.userComplainVM.currentPageNum =  IntelligentRoadTest.userComplainCurrentPage;
        IntelligentRoadTest.userComplainVM.startIndex = IntelligentRoadTest.startIndex ;
        IntelligentRoadTest.userComplainVM.lastIndex = IntelligentRoadTest.lastIndex;
        // if(IntelligentRoadTest.index==29){
        //     IntelligentRoadTest.drawMk(IntelligentRoadTest.userComplainVM.userComplainList,29);
        // }
        if(!$("#showUserComplainCompleteMessage").is(":visible")){
            // $("#userComplainCount").html("返回上一级(本页显示第"+IntelligentRoadTest.startIndex + "-"
            //     + IntelligentRoadTest.lastIndex  + "条的数据，共"+ IntelligentRoadTest.userComplainTotalCount +"条数据)");
        }
    }
    if(IntelligentRoadTest.index==29 && IntelligentRoadTest.currentLocation == ""){
        IntelligentRoadTest.drawMk(IntelligentRoadTest.userComplainVM.userComplainList,29);
    }
    showOrHideInputImage(1);
}

//----------------------------用户抱怨列表结束 ----------------------------------------

//==========================================================跳转方法========================================

/**
 *  跳转到用户抱怨列表
 */
IntelligentRoadTest.goUserComplainList = function IntelligentRoadTest_goUserComplainList(){
    $(".listInfo").slideDown().siblings().hide();
    $("#showUserComplainList").show().siblings().hide();
    $("#showUserComplainList .listWrap").slideDown("slow").siblings().hide();
    // $("#userComplainCount").html("返回上一级(" + $("#userComplainCountMessage").text() + ")");
    // $("#showUserComplainList .searchTitle").html("在“" + $("#boneCityName").text() + "”区域内搜索" );
    $("#userComplainCount").hide();
    showOrHideInputImage(1);
    IntelligentRoadTest.index  = IntelligentRoadTest.userComplainObj.index ;
    IntelligentRoadTest.currentLocation = "";
}

/**
 *  跳转到用户抱怨详情
 */
IntelligentRoadTest.goUserComplainCompleteMessage = function IntelligentRoadTest_goUserComplainCompleteMessage(){
    $(".listInfo").slideDown().siblings().hide();
    $("#showUserComplainList").show().siblings().hide();
    $("#showUserComplainList .detailList").slideDown("slow").siblings().hide();
    /*if(IntelligentRoadTest.userComplainVM != null){
        $("#userComplainCount").show();
    }else{
        $("#userComplainCount").hide();
    }*/
    if(IntelligentRoadTest.index == IntelligentRoadTest.userComplainObj.index || (IntelligentRoadTest.index == null && IntelligentRoadTest.senseName == null)){
        $("#userComplainCount").html("&lt; 返回“用户抱怨”的搜索结果 (" + IntelligentRoadTest.userComplainTotalCount + "条)" );
    }else{
        $("#userComplainCount").html("返回");
    }
    $("#userComplainCount").show();
    showOrHideInputImage(1);
    IntelligentRoadTest.currentLocation = IntelligentRoadTest.userComplainObj.name;
    IntelligentRoadTest.resizeEcharts();
}


//用户点击切换地市区县或者营服触发的方法
IntelligentRoadTest.userComplainChangeCity = function(city , district_id,district_name,mktcenter_id,mktcenter_name){
    //重新筛选数据
    IntelligentRoadTest.map.setCenter(city);
    setTimeout(function(){
        IntelligentRoadTest.getUserComplainListByOption();
        IntelligentRoadTest.submitLayersData(city);
    },500);
}

/**
 * ********************************
 * @funcname IntelligentRoadTest.userComplainPosition
 * @funcdesc 用户抱怨的定位方法
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.userComplainPosition = function(item){

    if(item != null && item.longitude != null && item.longitude != "" && item.latitude != null && item.latitude != ""){
        IntelligentRoadTest.map.panTo(new BMap.Point(item.longitude , item.latitude)); //定位
    }

}


/*20181019号新增需求---在用户抱怨列表左侧加上代表这个抱怨单的类型的图案（吴工）*/

/**
 * ********************************
 * @funcname  IntelligentRoadTest.getUserComplainColorList
 * @funcdesc  获取用户抱怨的工单种类的颜色
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getUserComplainColorList = function(){

    var object = {};
    object["投诉单"] = $("#ly_wuxianceBColor").css("background-color");
    object["NOC投诉单"] = $("#ly_hexinceNColor").css("background-color");
    object["需求单"] = $("#ly_ziyuanleiCColor").css("background-color");
    object["1"] = $("#ly_yibihuanColor").css("background-color");
    object["2"] = $("#ly_weibihuanless3Color").css("background-color");
    object["3"] =  $("#ly_weibihuanmore3Color").css("background-color");
    object["工信部越级"] = $("#ly_gongxinbukaoheColor").css("background-color");
    object["集团越级"] = $("#ly_jituankaoheColor").css("background-color");
    object["越级考核"] = $("#ly_gongxinbuguidangColor").css("background-color");
    object["越级归档"] = $("#ly_jituanguidangColor").css("background-color");
    IntelligentRoadTest.userComplainColorList = object;//初始化保存用户抱怨的颜色对象
}

/**
 * ********************************
 * @funcname  IntelligentRoadTest.getUserComplainTypeNameList
 * @funcdesc  获取用户抱怨的工单种类的名称
 * @param
 *
 * @return
 * @author 林楚佳
 * @create
 **********************************
 */
IntelligentRoadTest.getUserComplainTypeNameList = function(){

    var object = {};
    object["投诉单"] = "全量工单_无线侧B";
    object["NOC投诉单"] = "全量工单_核心侧N";
    object["需求单"] = "全量工单_资源类C";
    object["1"] = "抱怨热点_已闭环";
    object["2"] = "抱怨热点_未闭环持续3周以内（<3）";
    object["3"] =  "抱怨热点_未闭环持续3周以上（≥3）";
    object["工信部越级"] = "越级工单_工信部越级考核";
    object["集团越级"] = "越级工单_集团越级考核";
    object["越级考核"] = "越级工单_工信部越级归档";
    object["越级归档"] = "越级工单_集团越级归档";
    IntelligentRoadTest.userComplainTypeNameList = object;//初始化保存用户抱怨的名称对象
}