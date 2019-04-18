//'质差小区分析’模块
var badCellAnalysis={};
badCellAnalysis.queryCellCount=1;//调用小区回调方法的次数badCellAnalysis.cellTableDataFormat
badCellAnalysis.currentCellCount=0;//当前调用小区回调方法的次数
badCellAnalysis.distriOptionIndex = 0;//tab下标默认等于0
badCellAnalysis.ZCTabconditionsCache=null;//用于缓存质差小区的查询条件
//小区表格的字段
badCellAnalysis.tableObjProperty = [
    {"type":"负荷","column":"load_condition","index":0},	//负荷情况
    {"type":"空口指标","column":"airport_indicator","index":1},//空口指标
    {"type":"覆盖","column":"cover_quality","index":2},//覆盖质量
    {"type":"干扰","column":"interfer_situation","index":3},//干扰情况
    {"type":"空口感知","column":"emtperc_situation","index":4},//空口感知情况
    {"type":"繁忙度","column":"business","index":5},//繁忙情况
    {"type":"用户","column":"top_user","index":6},//TOP用户
    {"type":"告警","column":"alarm_flag","index":7},//告警
    {"type":"","column":"day"}//
];
badCellAnalysis.coverBar1=null;//覆盖情况 第一个柱形图
badCellAnalysis.coverBar2=null;//覆盖情况 第二个柱形图
badCellAnalysis.busyline=null;//繁忙度 折线图
badCellAnalysis.downLineBar=null;//所有tab表格下钻后的优良率折线图
badCellAnalysis.pointCount=0;//繁忙度人数超过40的记录
badCellAnalysis.crossfilterCellTable=null;//小区表格crossfilter对象
badCellAnalysis.tableToolsGJ=null;//告警表格

$(function () {
    //质差小区分析：-------负荷-------展开、收起
    $(".showContent .dateSplit").click(function () {
        if ($(this).find(".btn-showInfo").children().hasClass("rotateImg")){
            $(this).find(".btn-showInfo").children().removeClass("rotateImg");
            $(this).parent().next().hide();
        } else{
            $(this).find(".btn-showInfo").children().addClass("rotateImg");
            $(this).parent().next().show();
        }
    });
    //质差小区分析：负荷、空口指标、覆盖、干扰、空口感知、繁忙度、用户、告警（红点、绿点）点击显示对应的内容
   /* $(".tabUl ul li").click(function () {
        $(".clicked").removeClass("clicked");
        $(this).addClass("clicked");
        $(".showContent").show();
        var tabText = $(this).siblings().find(".tabText").text();
        $(".showContent .nameInfo").text(tabText);
        var index = $(".tabUl ul").index($(this).parent());
        $(".myTabPan").eq(index).show().siblings().hide();
        $("#badCellAnalysisDiv").scrollTop(350);
    });*/

    //点击地理位置分析
    $("#geographic_analysis").click(function (event) {
        progressbarTwo.submitSql([["badCellAnalysis_cellquery_intelligentroadtestanalysisv3_sector", "CITY_ID:"+badCellAnalysis.cityId,"DAY:"+badCellAnalysis.timeId,"BASE_STATN_ID:"+badCellAnalysis.eNodeBId,"CELL_ID:"+badCellAnalysis.cellId]],
            [badCellAnalysis.geographicAnalysis],[3]);
        event.stopPropagation();
    });


    $(window).resize(function() {//屏幕自适应
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
        /*if(!noceUtil.isUndefined(badCellAnalysis.tableToolsGJ)
            &&!noceUtil.isUndefined(badCellAnalysis.GJtableObject)){
            badCellAnalysis.tableToolsGJ.resizeWidht(badCellAnalysis.GJtableObject);
        }*/
    });
    $("#leftIcon").click(function () {//窗口改变时地图居中
        $(window).resize();
    });
});

/**
 * ********************************
 * @funcname badCellAnalysis.searchZCAnalysis
 * @funcdesc 查询质差小区的数据
 * @param {String} startDay ：开始时间:如果开始时间为空,则从结束时间往前数7天作为开始时间
 * @param {String} endDay ： 结束时间
 * @param {String} enodeb_id ： 基站id
 * @param {String} cell_id ： 小区id
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
badCellAnalysis.searchZCAnalysis=function badCellAnalysis_searchZCAnalysis(startDay,endDay,enodeb_id,cell_id){
    // startDay=null;endDay="2018-10-27";
    if(startDay==null){
        startDay=new Date(new Date(endDay).getTime()-6*1000*60*60*24).format('yyyy-MM-dd');
        $("#date-range4").text(startDay+' - '+endDay);
    }
    $(".clicked").removeClass("clicked");
    $("#geographic_analysis").hide();
    $(".showContent").hide();
    $(".myTabContent").hide();
    $(".myTabPan").hide();
    badCellAnalysis.queryCellCount=1;
    var startMonth = startDay.substring(5, 7);
    var endMonth = endDay.substring(5, 7);
    var dateArr=getDates(startDay,endDay);
    var progressBarSqls = [], functionlists = [], databases = [];
    var list1 = [];var list2=[];//起始时间有可能不同月份
    list1=["badCellAnalysis_01_queryresult_hbase_v2","KEY:" + "getByKeys","MONTH:" + startMonth];
    list2=["badCellAnalysis_01_queryresult_hbase_v2","KEY:" + "getByKeys","MONTH:" + endMonth];
    var res1;//拼接keyList
    var res2;
    for(var j in dateArr){
        var month=dateArr[j].substring(4,6);
        if(startMonth==month){
            if(!res1){// 如果ret为空，则无需添加","作为分隔符
                res1=dateArr[j]+"_"+enodeb_id+"_"+cell_id;
            }else{//给ret的每个key间添加","作为分隔符
                res1=res1+","+dateArr[j]+"_"+enodeb_id+"_"+cell_id;
            }
        }else{
            if(!res2){// 如果ret为空，则无需添加","作为分隔符
                res2=dateArr[j]+"_"+enodeb_id+"_"+cell_id;
            }else{//给ret的每个key间添加","作为分隔符
                res2=res2+","+dateArr[j]+"_"+enodeb_id+"_"+cell_id;
            }
        }
    }
    list1.push("KEYLIST:" + res1);
    list2.push("KEYLIST:" + res2);
    progressBarSqls.push(list1);
    functionlists.push(badCellAnalysis.cellTableDataFormat);
    databases.push(4);
    if(startMonth!=endMonth){
        progressBarSqls.push(list2);
        functionlists.push(badCellAnalysis.cellTableDataFormat);
        databases.push(4);
        badCellAnalysis.queryCellCount=2;
    }
    if(progressBarSqls.length>0 && functionlists.length>0 && databases.length>0){
        badCellAnalysis.cellTbleData=[];//缓存第一个表格的数据
        badCellAnalysis.currentCellCount=0;
        progressbarTwo.submitSql(progressBarSqls,functionlists,databases);
    }

}

//质差小区地理位置分析跳转到智能测评扇区详情页
/**********************************
 * @funcname badCellAnalysis.geographicAnalysis
 * @funcdesc 质差小区地理位置分析跳转到智能测评扇区详情页
 * @param {data} item (input optional) url需要携带的参数
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.geographicAnalysis=function badCellAnalysis_geographicAnalysis(data){
    var result=callBackChangeData(data);
    var object_id=parseFloat(badCellAnalysis.eNodeBId)*256+parseFloat(badCellAnalysis.cellId);
    //获取可以查看的最新时间 下午2点之前可以看到前天的,下午2点之后可以看到昨天的
    var nowDate = new Date();
    var hour = nowDate.getHours();
    var dateBefore = null;
    if (hour < 14) {
        dateBefore = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() - 2);
    }else{
        dateBefore = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() - 1);
    }
    var year = dateBefore.getFullYear();
    var month = dateBefore.getMonth() + 1;
    var day = dateBefore.getDate();
    if (month < 10) {
        month = "0" + month;
    } else {
        month = month + "";
    }
    if (day < 10) {
        day = "0" + day;
    }
    var maxDay= year + "" + month + "" + day;
    if(Number(result[0].day)>Number(maxDay)){
        if (confirm("天翼蓝鹰查看扇区的最新时间是"+maxDay+",是否更换时间跳转到天翼蓝鹰查看?")) {
            window.open("pages_index_Index_home.action?" +
                "appId=IntelligentRoadTestAnalysisV5&menuId=456&perId=525&id_path=new&isRedirect=true&appName=智能测评V5.0" +
                "&day=" + maxDay + "&city=" + result[0].city_name +
                "&country=" + result[0].area_name +"&mktcenter="+result[0].mkt_center_name+
                "&object_id="+object_id+"&object_type=扇区");
        } else {
            return;
        }
    }else{//直接跳转
        window.open("pages_index_Index_home.action?" +
            "appId=IntelligentRoadTestAnalysisV5&menuId=456&perId=525&id_path=new&isRedirect=true&appName=智能测评V5.0" +
            "&day=" + result[0].day + "&city=" + result[0].city_name +
            "&country=" + result[0].area_name +"&mktcenter="+result[0].mkt_center_name+
            "&object_id="+object_id+"&object_type=扇区");
    }
}

//处理小区表格的回调函数
/**********************************
 * @funcname badCellAnalysis.cellTableDataFormat
 * @funcdesc 处理小区表格的回调函数 上方表格的数据拼接
 * @param {data} item (input optional)
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.cellTableDataFormat=function badCellAnalysis_cellTableDataFormat(data) {
    badCellAnalysis.date1=new Date().getTime();
    console.log("开始查询的时间："+badCellAnalysis.date1);
    var dataList = [];
    var ia1Key = ['enodebidIa1','cellidIa1','cityIa1','districtIa1','marketbaseIa1'];
    var ia2Key = ['load_condition','airport_indicator','cover_quality','interfer_situation','emtperc_situation','business','top_user'];
    var ia17Key = ['alarm_flag'];
    /*var ib1Key = ['network','latn_id','marketbase','district','enodeb_id','enodebname','cell_id','cell_name'];
    var ib2Key = ['test_num_all','tcp_ack_dl_tot','tcp_ack_dl_ratio_tot','wireless_dt2_tot','wireless_dt2_ratio_tot','bd_tcp_ack_dl_tot','bd_wireless_dt2_tot'];
    var ib3Key = ['http_delay_tot','fin_delay_tot','tcp_synack_dl_tot','bad_http_delay_tot','bad_tcp_synack_dl_tot','webpage_open_delay_tot','bad_webpage_open_delay'];
    var ib4Key = ['good_webpage_open_delay','webpage_open_delay_all','vidio_download_rate_tot','bad_vidio_download_rate','good_vidio_download_rate','vidio_download_rate_all','bad_fin_delay_tot','sector_ce_level'];
    var ib5Key = ['webpage_open_delay_good_ratio','vidio_download_rate_good_ratio','ce_good_ratio'];
    var ib6Key = ['first_screen_delay_good','first_screen_delay_bad','first_screen_all','first_screen_delay_tot','im_send_all','im_send_good','im_send_bad','video_halt_rate_good','video_halt_rate_bad','video_halt_all','video_halt_rate_tot','game_delay_good','game_delay_bad','game_all','game_delay_tot'];
*/
    var result=noceUtil.isUndefined(data.result) ? [] : data.result;
    for(var i=0;i<result.length;i++){//rowkey,ia1,ib1,ib2,ib2,ib4,ib5,ib6
        var rowObj={};
        rowObj["rowkey"]=result[i][0];
        var ia1Array=spliceNull(result[i][1],ia1Key.length).split("|");
        for(var a1 in ia1Key){
            rowObj[ia1Key[a1]]=ia1Array[a1];
        }

        var ia2Array=spliceNull(result[i][2],ia2Key.length).split("|");
        for(var a2 in ia2Key){
            rowObj[ia2Key[a2]]=ia2Array[a2];
        }
        var ia17Array=spliceNull(result[i][3],ia17Key.length).split("|");
        for(var a17 in ia17Key){
            rowObj[ia17Key[a17]]=ia17Array[a17];
        }
        /*var ib1Array=spliceNull(result[i][4],ib1Key.length).split("|");
        for(var b1 in ib1Key){
            rowObj[ib1Key[b1]]=ib1Array[b1];
        }
        var ib2Array=spliceNull(result[i][5],ib2Key.length).split("|");
        for(var b2 in ib2Key){
            rowObj[ib2Key[b2]]=ib2Array[b2];
        }
        var ib3Array=spliceNull(result[i][6],ib3Key.length).split("|");
        for(var b3 in ib3Key){
            rowObj[ib3Key[b3]]=ib3Array[b3];
        }
        var ib4Array=spliceNull(result[i][7],ib4Key.length).split("|");
        for(var b4 in ib4Key){
            rowObj[ib4Key[b4]]=ib4Array[b4];
        }
        var ib5Array=spliceNull(result[i][8],ib5Key.length).split("|");
        for(var b5 in ib5Key){
            rowObj[ib5Key[b5]]=ib5Array[b5];
        }
        var ib6Array=spliceNull(result[i][9],ib6Key.length).split("|");
        for(var b6 in ib6Key){
            rowObj[ib6Key[b6]]=ib6Array[b6];
        }*/
        var tableObj={};
        /*if(rowObj["latn_id"]=="NULL"&&rowObj["enodeb_id"]=="NULL"&&rowObj["cell_id"]=="NULL"){
            continue;
        }*/

        //badCellAnalysis.tableObjProperty
        tableObj["latn_id"]=(rowObj["cityIa1"]!="NULL") ? noceUtil.city_LATN_ID[rowObj["cityIa1"]] : rowObj["latn_id"];//地市ID
        tableObj["enodeb_id"]=rowObj["rowkey"].split("_")[1];//基站id
        tableObj["cell_id"]=rowObj["rowkey"].split("_")[2];//小区id
       /* tableObj["enodeb_info"]=tableObj["enodeb_id"]+"（"+rowObj["enodebname"]+"）";// 基站ID＋名称
        tableObj["cell_info"]=tableObj["cell_id"]+"（"+rowObj["cell_name"]+"）";//小区ID＋名称*/
        tableObj["day"]=rowObj["rowkey"].split("_")[0];//时间段，以天为粒度
        tableObj["load_condition"]=judgeIsNormal(rowObj["load_condition"]);//负荷情况
        tableObj["airport_indicator"]=judgeIsNormal(rowObj["airport_indicator"]);//空口指标
        tableObj["cover_quality"]=judgeIsNormal(rowObj["cover_quality"]);//覆盖质量
        tableObj["interfer_situation"]=judgeIsNormal(rowObj["interfer_situation"]);//干扰情况
        tableObj["emtperc_situation"]=judgeIsNormal(rowObj["emtperc_situation"]); //空口感知情况
        tableObj["business"]=judgeIsNormal(rowObj["business"]);//繁忙情况
        tableObj["top_user"]=judgeIsNormal(rowObj["top_user"]);//TOP用户
        //缺失告警字段
        tableObj["alarm_flag"]=parseFloat(rowObj["alarm_flag"])==1 ? "是" : "否";
        /*if (dataIsNull(rowObj["first_screen_all"]) || dataIsNull(rowObj["first_screen_delay_bad"]) || parseFloat(rowObj["first_screen_all"])==0) {
            tableObj["first_screen_rate"]="NULL";//首屏优良率[（总次数-质差次数）/总次数]
        }else{
            tableObj["first_screen_rate"]=(parseFloat(rowObj["first_screen_all"]-rowObj["first_screen_delay_bad"])/parseFloat(rowObj["first_screen_all"])*100).toFixed(2)+"%";//首屏优良率[（总次数-质差次数）/总次数]
        }
        if (dataIsNull(rowObj["vidio_download_rate_good_ratio"])){
            tableObj["video_download_rate"]="NULL";//视频下载优良率
        }else{
            tableObj["video_download_rate"]=(parseFloat(rowObj["vidio_download_rate_good_ratio"])*100).toFixed(2)+"%";//视频下载优良率
        }
        if (dataIsNull(rowObj["video_halt_all"]) || dataIsNull(rowObj["video_halt_rate_bad"]) || parseFloat(rowObj["video_halt_all"]) == 0) {
            tableObj["video_katon_rate"]="NULL";//视频卡顿优良率[（总次数-质差次数）/总次数]
        }else{
            tableObj["video_katon_rate"]=(parseFloat(rowObj["video_halt_all"]-rowObj["video_halt_rate_bad"])/parseFloat(rowObj["video_halt_all"])*100).toFixed(2)+"%";//视频卡顿优良率[（总次数-质差次数）/总次数]
        }
        if (dataIsNull(rowObj["im_send_good"]) || dataIsNull(rowObj["im_send_all"]) || parseFloat(rowObj["im_send_all"]) == 0) {
            tableObj["instant_messaging_rate"]="NULL";//即时消息优良率[成功次数）/总次数]
        }else{
            tableObj["instant_messaging_rate"]=(parseFloat(rowObj["im_send_good"])/parseFloat(rowObj["im_send_all"])*100).toFixed(2)+"%";////即时消息优良率[成功次数）/总次数]
        }
        if (dataIsNull(rowObj["game_all"]) || dataIsNull(rowObj["game_delay_bad"]) || parseFloat(rowObj["game_all"]) == 0) {
            tableObj["game_rate"]="NULL";//游戏优良率[（总次数-质差次数）/总次数]
        }else{
            tableObj["game_rate"]=(parseFloat(rowObj["game_all"]-rowObj["game_delay_bad"])/parseFloat(rowObj["game_all"])*100).toFixed(2)+"%";//游戏优良率[（总次数-质差次数）/总次数]
        }

        if (dataIsNull(rowObj["tcp_synack_dl_tot"]) || dataIsNull(rowObj["test_num_all"]) || parseFloat(rowObj["test_num_all"]) == 0) {
            tableObj["average_low1"]="NULL";//均值（ms） 第一段时延
        }else{
            tableObj["average_low1"]=(parseFloat(rowObj["tcp_synack_dl_tot"])/parseFloat(rowObj["test_num_all"])).toFixed(2);//均值（ms） 第一段时延
        }
        tableObj["threshold_low1"]=SearchPanel.low1;//门限 第一段时延
        tableObj["quality_low1"]=rowObj["bad_tcp_synack_dl_tot"];//质差记录 第一段时延
        if (dataIsNull(rowObj["bad_tcp_synack_dl_tot"]) || dataIsNull(rowObj["test_num_all"]) || parseFloat(rowObj["test_num_all"]) == 0) {
            tableObj["quality_rate_low1"]="NULL";//质差记录占比 第一段时延
        }else{
            tableObj["quality_rate_low1"]=(parseFloat(rowObj["bad_tcp_synack_dl_tot"])/parseFloat(rowObj["test_num_all"])*100).toFixed(2)+"%";//质差记录占比 第一段时延
        }

        if (dataIsNull(rowObj["tcp_ack_dl_tot"]) || dataIsNull(rowObj["test_num_all"]) || parseFloat(rowObj["test_num_all"]) == 0) {
            tableObj["average_low2"]="NULL";//均值（ms） 第二段时延
        }else{
            tableObj["average_low2"]=(parseFloat(rowObj["tcp_ack_dl_tot"])/parseFloat(rowObj["test_num_all"])).toFixed(2);//均值（ms） 第二段时延
        }
        tableObj["threshold_low2"]=SearchPanel.low2;//门限 第二段时延
        tableObj["quality_low2"]=rowObj["bd_tcp_ack_dl_tot"];//质差记录 第二段时延
        if (dataIsNull(rowObj["bd_tcp_ack_dl_tot"]) || dataIsNull(rowObj["test_num_all"]) || parseFloat(rowObj["test_num_all"]) == 0) {
            tableObj["quality_rate_low2"]="NULL";//质差记录占比 第二段时延
        }else{
            tableObj["quality_rate_low2"]=(parseFloat(rowObj["bd_tcp_ack_dl_tot"])/parseFloat(rowObj["test_num_all"])*100).toFixed(2)+"%";//质差记录占比 第二段时延
        }
        if (dataIsNull(rowObj["wireless_dt2_tot"]) || dataIsNull(rowObj["test_num_all"]) || parseFloat(rowObj["test_num_all"]) == 0) {
            tableObj["average_low3"]="NULL";//均值（ms） 第三段时延
        }else{
            tableObj["average_low3"]=(parseFloat(rowObj["wireless_dt2_tot"])/parseFloat(rowObj["test_num_all"])).toFixed(2);//均值（ms） 第三段时延
        }
        tableObj["threshold_low3"]=SearchPanel.low3;//门限 第三段时延
        tableObj["quality_low3"]=rowObj["bd_wireless_dt2_tot"];//质差记录 第三段时延
        if (dataIsNull(rowObj["bd_wireless_dt2_tot"]) || dataIsNull(rowObj["test_num_all"]) || parseFloat(rowObj["test_num_all"]) == 0) {
            tableObj["quality_rate_low3"]="NULL";//质差记录占比 第三段时延
        }else{
            tableObj["quality_rate_low3"]=(parseFloat(rowObj["bd_wireless_dt2_tot"])/parseFloat(rowObj["test_num_all"])*100).toFixed(2)+"%";//质差记录占比 第三段时延
        }
        if (dataIsNull(rowObj["http_delay_tot"]) || dataIsNull(rowObj["test_num_all"]) || parseFloat(rowObj["test_num_all"]) == 0) {
            tableObj["average_low4"]="NULL";//均值（ms） 第四段时延
        }else{
            tableObj["average_low4"]=(parseFloat(rowObj["http_delay_tot"])/parseFloat(rowObj["test_num_all"])).toFixed(2);//均值（ms） 第四段时延
        }
        tableObj["threshold_low4"]=SearchPanel.low4;//门限 第四段时延
        tableObj["quality_low4"]=rowObj["bad_http_delay_tot"];//质差记录 第四段时延
        if (dataIsNull(rowObj["bad_http_delay_tot"]) || dataIsNull(rowObj["test_num_all"]) || parseFloat(rowObj["test_num_all"]) == 0) {
            tableObj["quality_rate_low4"]="NULL";//质差记录占比 第四段时延
        }else{
            tableObj["quality_rate_low4"]=(parseFloat(rowObj["bad_http_delay_tot"])/parseFloat(rowObj["test_num_all"])*100).toFixed(2)+"%";//质差记录占比 第四段时延
        }
        if (dataIsNull(rowObj["fin_delay_tot"]) || dataIsNull(rowObj["test_num_all"]) || parseFloat(rowObj["test_num_all"]) == 0) {
            tableObj["average_low5"]="NULL";//均值（ms） 第五段时延
        }else{
            tableObj["average_low5"]=(parseFloat(rowObj["fin_delay_tot"])/parseFloat(rowObj["test_num_all"])).toFixed(2);//均值（ms） 第五段时延
        }

        tableObj["threshold_low5"]=SearchPanel.low5;//门限 第五段时延
        tableObj["quality_low5"]=rowObj["bad_fin_delay_tot"];//质差记录 第五段时延
        if (dataIsNull(rowObj["bad_fin_delay_tot"]) || dataIsNull(rowObj["test_num_all"]) || parseFloat(rowObj["test_num_all"]) == 0) {
            tableObj["quality_rate_low5"]="NULL";//质差记录占比 第五段时延
        }else{
            tableObj["quality_rate_low5"]=(parseFloat(rowObj["bad_fin_delay_tot"])/parseFloat(rowObj["test_num_all"])*100).toFixed(2)+"%";//质差记录占比 第五段时延
        }*/
        dataList.push(tableObj);
    }
    badCellAnalysis.currentCellCount++;
    if(badCellAnalysis.currentCellCount==badCellAnalysis.queryCellCount){
        badCellAnalysis.cellTbleData.push.apply(badCellAnalysis.cellTbleData,dataList);
        if(badCellAnalysis.queryCellCount>1){//说明存在跨月查询，需要使用crossfilter对数据过滤
            if(badCellAnalysis.crossfilterCellTable==null){
                badCellAnalysis.crossfilterCellTable=crossfilter([]);
                badCellAnalysis.crossfilterCellTable.add(badCellAnalysis.cellTbleData);
                badCellAnalysis.dimensionCellTable=badCellAnalysis.crossfilterCellTable.dimension(//创建维度
                    function(d) {
                        return d.enodeb_id+"|"+ d.cell_id+"|"+d.day;
                    });

            }else{
                badCellAnalysis.crossfilterCellTable.remove();
                badCellAnalysis.crossfilterCellTable.add(badCellAnalysis.cellTbleData);
            }
            badCellAnalysis.cellTbleData=badCellAnalysis.dimensionCellTable.bottom(badCellAnalysis.crossfilterCellTable.size());
        }
        IntelligentTuning.sectorCompleteVM.ZCAnalysis=badCellAnalysis.cellTbleData;
        IntelligentTuning.sectorCompleteVM.ZCAnalysisColumn=badCellAnalysis.tableObjProperty;
    }else{
        badCellAnalysis.cellTbleData=dataList;
    }

}



//拼接上半部分的表格
/**********************************
 * @funcname badCellAnalysis.cellTable
 * @funcdesc 拼接上半部分的表格 绘制表格
 * @param {dataArr} item (input optional) 表格的数据
 * @param {clonums} item (input optional) 表头字段名
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.cellTable=function badCellAnalysis_cellTable(){
    badCellAnalysis.content = '' +
        '<div class="wrap_Dialog">' +
        '<ul id="legend_Dialog" class="tab_li_Dialog">' +
        '<li style = "cursor:pointer" class="active">首屏</li>' +
        '<li style = "cursor:pointer">视频下载</li>' +
        '<li style = "cursor:pointer">视频卡顿</li>' +
        '<li style = "cursor:pointer">即时消息</li>' +
        '<li style = "cursor:pointer">游戏</li>' +
        '</ul>'+
        '<div id="leg_Dialog">' +
        '<ul>' +
        '<li><label>优良率：(</label></li></li>' +
        '<li><span style="background: #800000;"></span> 60以下</li>' +
        '<li><span style="background: #ff0000;"></span> 60%-70%</li>' +
        '<li><span style="background: #ff9900;"></span> 70%-80%</li>' +
        '<li><span style="background: #ffff00;"></span> 80%-90%</li>' +
        '<li><span style="background: #53ff1a;"></span> 90%以上)</li>' +
        '</ul>' +
        '</div>'+
        '<div id="bad_detailLine" style="height:300px;width:1020px"></div>' +
        '</div>';

    //点击时间,触发函数//点击负荷····告警等字段，也触发函数
    $("#badCellAnalysis_cellInfo_table td.time-go-deep,#badCellAnalysis_cellInfo_table td.tab-go-deep").unbind("click").click(function () {
        // $(".table-info").height($("#badCellAnalysis_cellInfo_table_data").height() + 37);
        //第一次或者之后点击时间，默认显示的tab页信息
        $(this).parent().addClass("selectedDay").siblings().removeClass("selectedDay");//给点击这一行添加绿色背景
        var index = $(this).parent().index();
        $(".scrollDiv tbody tr").eq(index).addClass("selectedDay").siblings().removeClass("selectedDay");
        //拿到下钻的具体时间作为查询的条件之一
        var tr = $(this).parent("tr");  //表示td所在的父tr
        var timeId = $(tr).children().eq(3).text();
        var cityId = $(tr).children().eq(0).text();//获取城市的id
        badCellAnalysis.cityId=cityId;
        badCellAnalysis.cityName = noceUtil.LATN_ID_city[cityId];//获取当前城市的名称
        var eNodeBTitle=$(tr).children().eq(1).attr("title");
        badCellAnalysis.eNodeBId=dataIsNull(eNodeBTitle) ?  ($(tr).children().eq(1).text()).split("（")[0] : eNodeBTitle.split("（")[0];
        var cellTitle=$(tr).children().eq(2).attr("title");
        badCellAnalysis.cellId=dataIsNull(cellTitle) ? ($(tr).children().eq(2).text()).split("（")[0] : cellTitle.split("（")[0];//小区id
        badCellAnalysis.timeId = timeId;//供忙度图标题使用
        //显示下方tab页
        $('.myTab').show();
        var scrollHeight = $(".right-mainContent").prop("scrollHeight");
        $('.right-mainContent').animate({scrollTop:scrollHeight}, 400);
        var tabName=getTab($(this).index());
        $(".myTabTitle li > a:contains('"+tabName+"')").parent().click();
        resizeTable();


        //查数，回调函数画表格（给每个td赋值）
        badCellAnalysis.badCellAnaSubmit();
    });

    //点击小区名称触发函数badCellAnalysis.cellInfo() 弹出小区基本信息提示框
    $("#badCellAnalysis_cellInfo_table td.cell-go-info").unbind("click").click(function () {
        var tr = $(this).parent("tr");
        var timeId = $(tr).children().eq(3).text();//时间

        var eNodeBTitle=$(tr).children().eq(1).attr("title");
        var enodeId =dataIsNull(eNodeBTitle) ?  ($(tr).children().eq(1).text()).split("（")[0] : eNodeBTitle.split("（")[0];
        var cellTitle=$(tr).children().eq(2).attr("title");
        var cellId=dataIsNull(cellTitle) ? ($(tr).children().eq(2).text()).split("（")[0] : cellTitle.split("（")[0];//小区id
        var cellName = $(tr).children().eq(2);
        var cityId=$(tr).children().eq(0).text();;
        if(!noceUtil.isUndefined(enodeId)&&!noceUtil.isUndefined(cellId)){
            var lowData_list = ["badCellAnalysis_m05_cellquery","BASE_STATN_ID:"+enodeId,"CELL_ID:"+cellId,"DAY:"+timeId,"CITY_ID:"+cityId];
            var progressBarSqls=[lowData_list];
            var functionlist = [cellInfo];
            progressbarTwo.submitSql(progressBarSqls,functionlist,[3]);
            //鼠标点击该表Cell，显示该小区的基本信息
            function  cellInfo(data){
                var result = callBackChangeData(data);
                var showTooltip='<div class="">'
                    +'<div class="">'
                    +'<div class="">--'+result[0]["is_indoor"]+'--</div>'
                    +'<div class="">'
                    +'<div>基站编号：'+result[0]["base_statn_id"]+'</div>'
                    +'<div>扇区编号：'+result[0]["cell_id"]+'</div>'
                    +'<div>扇区名称: '+result[0]["cell_name"]+'</div>'
                    +'<div>频段: '+result[0]["band"]+'</div>'
                    +'<div>方位角: '+result[0]["ant_azimuth"]+'</div>'
                    +'<div>机械下倾: '+result[0]["ant_engine_angle"]+'</div>'
                    +'<div>电子下倾: '+result[0]["ant_electron_angle"]+'</div>'
                    +'<div>天线挂高: '+result[0]["high"]+'</div>'
                    +'<div>经度: '+result[0]["longitude"]+'</div>'
                    +'<div>纬度: '+result[0]["latitude"]+'</div>'
                    +'<div>验收状况: '+result[0]["acceptstatus"]+'</div>'
                    +'<div>站址地址: '+result[0]["sector_addr"]+'</div>'
                    +'<div>厂家: '+result[0]["bs_vendor"]+'</div>'
                    +'</div></div>'
                    +'</div>';
                $(cellName).tooltip({
                    position: 'top',
                    content: showTooltip,
                    showEvent:"dblclick",
                    onShow: function(){
                    },
                    onHide: function(){
                    }
                });
                $(cellName).dblclick();
            }
        }
    });


    badCellAnalysis.date2=new Date().getTime();
    console.log("处理数据结束的时间："+badCellAnalysis.date2);
    console.log("耗时："+(badCellAnalysis.date2-badCellAnalysis.date1));

}




/**********************************
 * @funcname getTab
 * @funcdesc 根据上方表格中td的index获取表头的字段，从而获取下方对应的tab页
 * @param {null} item (input optional)
 * @return {String} tabName tab名称
 * @author 陈小芳
 * @create 20180704
 ***********************************/
function getTab(index){
    var tabName="负荷";
    switch (index){
        case 4:
            tabName="负荷";
            break;
        case 5:
            tabName="空口指标";
            break;
        case 6:
            tabName="覆盖";
            break;
        case 7:
            tabName="干扰";
            break;
        case 8:
            tabName="空口感知";
            break;
        case 9:
            tabName="繁忙度";
            break;
        case 10:
            tabName="用户";
            break;
        case 11:
            tabName="告警";
            break;
        default:
            tabName="负荷";
    }
    return tabName;

}

//下方tab页sql查询
/**********************************
 * @funcname badCellAnalysis.badCellAnaSubmit
 * @funcdesc 下方tab页sql查询
 * @param {null} item (input optional)
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.badCellAnaSubmit=function badCellAnalysis_badCellAnaSubmit() {
    var month = getMonthFromDate(badCellAnalysis.timeId);
    //负荷、覆盖情况（图1，表1，表2）、空口指标、干扰、空口感知
    var list1_keyList = badCellAnalysis.timeId+"_"+badCellAnalysis.eNodeBId+"_"+badCellAnalysis.cellId;
    var list1 = ["badCellAnalysis_15_hbase_sheet", "MONTH:" + month, "KEYLIST:" + list1_keyList];
    //tab的表格下钻后需要的数据
    var hourKeyList = list1_1KeyList();
    var list1_1 = ["badCellAnalysis_16_hbase_loadimg", "MONTH:" + month, "KEYLIST:" + hourKeyList];
    //覆盖质量-柱状图2： MOD_DAY_ENODEBID_CellId_MR_LteScTadv
    var list3_2_key=badCellAnalysis.eNodeBId.substr(badCellAnalysis.eNodeBId.length-1,1)+"_"+list1_keyList+"_";
    var list3_2 = ["badCellAnalysis_h08_celldetailinfo_COVERDIS_img", "STARTROW:"+list3_2_key+"0","ENDROW:"+list3_2_key+"~"];
    //繁忙度
    var list6Key=badCellAnalysis.eNodeBId.substr(badCellAnalysis.eNodeBId.length-1,1)+"_"+badCellAnalysis.eNodeBId+"_"+badCellAnalysis.cellId+"_"+badCellAnalysis.timeId;//MOD_BASE_STATN_ID_CELL_ID_STS_TIME
    var list6 = ["badCellAnalysis_h11_celldetailinfo_BUSINESS_img", "STARTROW:"+list6Key+"0000","ENDROW:"+list6Key+"~"];
    //用户
    var list7Key=badCellAnalysis.eNodeBId.substr(badCellAnalysis.eNodeBId.length-2,2)+"_"+list1_keyList+"_";//MOD_DAY_eNodeB_ID_CEll_ID_IMSI
    var list7 = ["badCellAnalysis_h12_celldetailinfo_USER", "STARTROW:" + list7Key, "ENDROW:" + list7Key+"~"];
    //告警
    var list8 = ["badCellAnalysis_18_alarm_details", "DAY:" + badCellAnalysis.timeId, "BASE_STATION:" + badCellAnalysis.eNodeBId];
    var progressBarSqls = [list1, list1_1, list3_2, list6, list7, list8];
    var functionlist = [badCellAnalysis.tabTableData, badCellAnalysis.tabHourChartData, badCellAnalysis.callBackTab3_2_chart, badCellAnalysis.callBackTab6, badCellAnalysis.callBackTab7, badCellAnalysis.GJCallBackTab8];
    var databases = [4, 4, 4, 4, 4, 3];

    progressbarTwo.submitSql(progressBarSqls, functionlist, databases);
    badCellAnalysis.ZCTabconditionsCache=badCellAnalysis.timeId+"|"+badCellAnalysis.cityId+"|"+badCellAnalysis.eNodeBId+"|"+badCellAnalysis.cellId;
}




//处理tab页表格下钻后的数据
/**********************************
 * @funcname badCellAnalysis.tabHourChartData
 * @funcdesc 处理tab页表格下钻后的数据
 * @param {data} item (input optional) 回调数据
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.tabHourChartData = function  badCellAnalysis_tabHourChartData(data) {
    var results = data.result.length>0 ? data.result : [];
    var ia2Key = ["dw_prb_userate", "up_prb_userate", "pdcch_ocprate", "prach_ocprate", "pag_ocprate", "rrccon_succrate", "rrccon_succrate_v", "rrccon_rbrate", "ue_drop_rate", "erab_succ_rate", "erab_drop_rate"];
    var ia3Key = ["rrccon_fail_cellrj", "rrccon_fail_oth", "rrccon_fail_uenor", "ue_nrls_rate", "ue_anrls_rate", "erab_req", "erab_succ", "erab_fail_wrlack", "erab_fail_wl", "erab_fail_oth"];
    var ia4Key = ["erab_fail_core", "erab_fail_tl", "erab_fail_smfail", "erab_fail_uenor", "erab_nrls", "erab_anrls", "erab_anrls_wl", "erab_anrls_netcong", "erab_anrls_swfail", "erab_anrls_core", "erab_anrls_tl"];
    var ia6Key = ["rssi_avg", "pdch_dwflow", "pdch_upflow", "userex_upavgrate", "userex_dwavgrate", "user_avgdelay", "aidw_packloss_rate", "avg_rsrp", "avg_distance"];
    var ia8Key = ["counter0294", "counter0295", "counter0003", "counter0053", "counter0077", "counter0013", "counter0270", "counter0271", "counter0110", "counter0111"];
    var ia9Key = ["counter0108", "counter0109", "counter0156", "counter0157", "counter0159", "counter0160", "counter0151", "counter0193", "counter0154", "counter0196"];
    var ia10Key = ["swchx2_succ_rate", "swchs1_succ_rate", "swchsf_succ_rate", "swchaf_succ_rate", "swchenin_succ_rate", "swchenmu_succ_rate"];
    var ia12Key = ["ests1_succ_rate", "ests1_att", "ests1_succ"];
    var ib3Key = ["http_delay_tot", "fin_delay_tot", "tcp_synack_dl_tot", "bad_http_delay_tot", "bad_tcp_synack_dl_tot", "webpage_open_delay_tot", "bad_webpage_open_delay"];
    var ib4Key = ["good_webpage_open_delay", "webpage_open_delay_all", "vidio_download_rate_tot", "bad_vidio_download_rate", "good_vidio_download_rate", "vidio_download_rate_all", "bad_fin_delay_tot"];
    var ib5Key = ['first_screen_delay_good','first_screen_delay_bad','first_screen_all','first_screen_delay_tot','im_send_all','im_send_good','im_send_bad','video_halt_rate_good','video_halt_rate_bad','video_halt_all','video_halt_rate_tot','game_delay_good','game_delay_bad','game_all','game_delay_tot'];
    var resultList = [];
    if (results.length > 0) {
        for (var i = 0; i < results.length; i++) {
            /*i:a2,i:a3,i:a4,i:a6,i:a8,i:a9,i:a10,i:a12,i:b3,i:b4,i:b5*/
            /**
             * 0:"rowkey"
             * 1:"i:a2"
             * 2:"i:a3"
             * 3:"i:a4"
             * 4:"i:a6"
             * 5:"i:a8"
             * 6:"i:a9"
             * 7:"i:a10"
             * 8:"i:a12"
             * 9:"i:b3"
             * 10:"i:b4"
             * 11:"i:b5"
             */

            var resultItem = results[i];
            var rowkey = resultItem[0];

            var ia2Obj = callBackSplice(resultItem[1], ia2Key);
            var ia3Obj = callBackSplice(resultItem[2], ia3Key);
            var ia4Obj = callBackSplice(resultItem[3], ia4Key);
            var ia6Obj = callBackSplice(resultItem[4], ia6Key);
            var ia8Obj = callBackSplice(resultItem[5], ia8Key);
            var ia9Obj = callBackSplice(resultItem[6], ia9Key);
            var ia10Obj = callBackSplice(resultItem[7], ia10Key);
            var ia12Obj = callBackSplice(resultItem[8], ia12Key);
            var ib3Obj = callBackSplice(resultItem[9], ib3Key);
            var ib4Obj = callBackSplice(resultItem[10], ib4Key);
            var ib5Obj = callBackSplice(resultItem[11], ib5Key);

            var loadImgObj = {};
            loadImgObj["hour"] = rowkey.split("_")[0];
            loadImgObj["enodebid"] = rowkey.split("_")[1];
            loadImgObj["cellid"] = rowkey.split("_")[2];

            //对应于i:a2中获取，下标2~12，共11项
            loadImgObj["dw_prb_userate"] = dataMultiply100(ia2Obj.dw_prb_userate);
            loadImgObj["up_prb_userate"] = dataMultiply100(ia2Obj.up_prb_userate);
            loadImgObj["pdcch_ocprate"] = dataMultiply100(ia2Obj.pdcch_ocprate);
            loadImgObj["prach_ocprate"] = dataMultiply100(ia2Obj.prach_ocprate);
            loadImgObj["pag_ocprate"] = dataMultiply100(ia2Obj.pag_ocprate);
            loadImgObj["rrccon_succrate"] = dataMultiply100(ia2Obj.rrccon_succrate);
            loadImgObj["rrccon_succrate_v"] = dataMultiply100(ia2Obj.rrccon_succrate_v);
            loadImgObj["rrccon_rbrate"] = dataMultiply100(ia2Obj.rrccon_rbrate);
            loadImgObj["ue_drop_rate"] = dataMultiply100(ia2Obj.ue_drop_rate);
            loadImgObj["erab_succ_rate"] = dataMultiply100(ia2Obj.erab_succ_rate);
            loadImgObj["erab_drop_rate"] = dataMultiply100(ia2Obj.erab_drop_rate);

            //对应于i:a3中获取，下标13~22，共10项
            loadImgObj["rrccon_fail_uenor"] = dealIntData(ia3Obj.rrccon_fail_uenor);
            loadImgObj["rrccon_fail_cellrj"] = dealIntData(ia3Obj.rrccon_fail_cellrj);
            loadImgObj["rrccon_fail_oth"] = dealIntData(ia3Obj.rrccon_fail_oth);
            loadImgObj["ue_nrls_rate"] = dealIntData(ia3Obj.ue_nrls_rate);
            loadImgObj["ue_anrls_rate"] = dealIntData(ia3Obj.ue_anrls_rate);
            loadImgObj["erab_req"] = dealIntData(ia3Obj.erab_req);
            loadImgObj["erab_succ"] = dealIntData(ia3Obj.erab_succ);
            loadImgObj["erab_fail_wl"] = dealIntData(ia3Obj.erab_fail_wl);
            loadImgObj["erab_fail_wrlack"] = dealIntData(ia3Obj.erab_fail_wrlack);
            loadImgObj["erab_fail_oth"] = dealIntData(ia3Obj.erab_fail_oth);

            //对应于i:a4中获取，下标23~33，共11项
            loadImgObj["erab_fail_uenor"] = dealIntData(ia4Obj.erab_fail_uenor);
            loadImgObj["erab_fail_core"] = dealIntData(ia4Obj.erab_fail_core);
            loadImgObj["erab_fail_tl"] = dealIntData(ia4Obj.erab_fail_tl);
            loadImgObj["erab_fail_smfail"] = dealIntData(ia4Obj.erab_fail_smfail);
            loadImgObj["erab_nrls"] = dealIntData(ia4Obj.erab_nrls);
            loadImgObj["erab_anrls"] = dealIntData(ia4Obj.erab_anrls);
            loadImgObj["erab_anrls_core"] = dealIntData(ia4Obj.erab_anrls_core);
            loadImgObj["erab_anrls_tl"] = dealIntData(ia4Obj.erab_anrls_tl);
            loadImgObj["erab_anrls_netcong"] = dealIntData(ia4Obj.erab_anrls_netcong);
            loadImgObj["erab_anrls_wl"] = dealIntData(ia4Obj.erab_anrls_wl);
            loadImgObj["erab_anrls_swfail"] = dealIntData(ia4Obj.erab_anrls_swfail);

            //对应于i:a6中获取，下标34~41，共8项
            loadImgObj["rssi_avg"] = dealFloatData(ia6Obj.rssi_avg);
            loadImgObj["pdch_dwflow"] = dealFloatData(ia6Obj.pdch_dwflow);
            loadImgObj["pdch_upflow"] = dealFloatData(ia6Obj.pdch_upflow);
            loadImgObj["userex_upavgrate"] = dealFloatData(ia6Obj.userex_upavgrate);
            loadImgObj["userex_dwavgrate"] = dealFloatData(ia6Obj.userex_dwavgrate);
            loadImgObj["user_avgdelay"] = dealFloatData(ia6Obj.user_avgdelay);
            loadImgObj["aidw_packloss_rate"] = dataMultiply100(ia6Obj.aidw_packloss_rate);
            loadImgObj["avg_rsrp"] = dealFloatData(ia6Obj.avg_rsrp);
            loadImgObj["avg_distance"] = dealFloatData(ia6Obj.avg_distance);
            loadImgObj["pdch_flow"] = (Number(formatValue(dealFloatData(ia6Obj.pdch_dwflow)))+Number(formatValue(dealFloatData(ia6Obj.pdch_upflow)))).toFixed(2);;


            //对应于i:a8中获取，下标42~49，共8项
            loadImgObj["counter0003"] = dealFloatData(ia8Obj.counter0003);
            loadImgObj["counter0053"] = dealFloatData(ia8Obj.counter0053);
            loadImgObj["counter0077"] = dealFloatData(ia8Obj.counter0077);
            loadImgObj["counter0013"] = dealFloatData(ia8Obj.counter0013);
            loadImgObj["counter0110"] = dealFloatData(ia8Obj.counter0110);
            loadImgObj["counter0111"] = dealFloatData(ia8Obj.counter0111);
            loadImgObj["counter0270"] = dealFloatData(ia8Obj.counter0270);
            loadImgObj["counter0271"] = dealFloatData(ia8Obj.counter0271);

            //对应于i:a9中获取，下标50~59，共10项
            loadImgObj["counter0108"] = dealFloatData(ia9Obj.counter0108);
            loadImgObj["counter0109"] = dealFloatData(ia9Obj.counter0109);
            loadImgObj["counter0156"] = dealFloatData(ia9Obj.counter0156);
            loadImgObj["counter0157"] = dealFloatData(ia9Obj.counter0157);
            loadImgObj["counter0159"] = dealFloatData(ia9Obj.counter0159);
            loadImgObj["counter0160"] = dealFloatData(ia9Obj.counter0160);
            loadImgObj["counter0151"] = dealFloatData(ia9Obj.counter0151);
            loadImgObj["counter0193"] = dealFloatData(ia9Obj.counter0193);
            loadImgObj["counter0154"] = dealFloatData(ia9Obj.counter0154);
            loadImgObj["counter0196"] = dealFloatData(ia9Obj.counter0196);

            //对应于i:a10中获取，下标60~65，共6项
            loadImgObj["swchx2_succ_rate"] = dataMultiply100(ia10Obj.swchx2_succ_rate);
            loadImgObj["swchs1_succ_rate"] = dataMultiply100(ia10Obj.swchs1_succ_rate);
            loadImgObj["swchsf_succ_rate"] = dataMultiply100(ia10Obj.swchsf_succ_rate);
            loadImgObj["swchaf_succ_rate"] = dataMultiply100(ia10Obj.swchaf_succ_rate);
            loadImgObj["swchenin_succ_rate"] = dataMultiply100(ia10Obj.swchenin_succ_rate);
            loadImgObj["swchenmu_succ_rate"] = dataMultiply100(ia10Obj.swchenmu_succ_rate);

            //对应于i:a12中获取，下标66~68，共3项
            loadImgObj["ests1_succ_rate"] = dataMultiply100(ia12Obj.ests1_succ_rate);
            loadImgObj["ests1_att"] = dealIntData(ia12Obj.ests1_att);
            loadImgObj["ests1_succ"] = dealIntData(ia12Obj.ests1_succ);

            //对应于i:b3,i:b4中获取，下标69~72，共4项 //网页
            loadImgObj["webpage_open_delay_all"] = dealIntData(ib4Obj.webpage_open_delay_all);
            if (!dataIsNull(ib4Obj.webpage_open_delay_all) && !dataIsNull(ib3Obj.bad_webpage_open_delay) && Number(ib4Obj.webpage_open_delay_all)!=0) {
                loadImgObj["webpage_open_delay_rate"] = dealFloatData((ib4Obj.webpage_open_delay_all - ib3Obj.bad_webpage_open_delay) * 100 / ib4Obj.webpage_open_delay_all);
            } else {
                loadImgObj["webpage_open_delay_rate"] = 0;
            }
            //视频下载
            loadImgObj["vidio_download_rate_all"] = dealIntData(ib4Obj.vidio_download_rate_all);
            if (!dataIsNull(ib4Obj.vidio_download_rate_all) && !dataIsNull(ib4Obj.bad_vidio_download_rate) && Number(ib4Obj.vidio_download_rate_all)!=0) {
                loadImgObj["vidio_download_rate"] = dealFloatData((ib4Obj.vidio_download_rate_all - ib4Obj.bad_vidio_download_rate) * 100 / ib4Obj.vidio_download_rate_all);
            } else {
                loadImgObj["vidio_download_rate"] = 0;
            }
            //对应于i:b5中获取
            //首屏
            loadImgObj["first_screen_all"] = dealIntData(ib5Obj.first_screen_all);
            if (!dataIsNull(ib5Obj.first_screen_all) && !dataIsNull(ib5Obj.first_screen_delay_bad) && Number(ib5Obj.first_screen_all)!=0) {
                loadImgObj["first_screen_rate"] = dealFloatData((ib5Obj.first_screen_all - ib5Obj.first_screen_delay_bad) * 100 / ib5Obj.first_screen_all);
            } else {
                loadImgObj["first_screen_rate"] = 0;
            }
            //即时消息
            loadImgObj["im_send_all"] = dealIntData(ib5Obj.im_send_all);
            if (!dataIsNull(ib5Obj.im_send_all) && !dataIsNull(ib5Obj.im_send_bad) && Number(ib5Obj.im_send_all)!=0) {
                loadImgObj["im_send_rate"] = dealFloatData((ib5Obj.im_send_all - ib5Obj.im_send_bad) * 100 / ib5Obj.im_send_all);
            } else {
                loadImgObj["im_send_rate"] = 0;
            }
            //视频卡顿
            loadImgObj["video_halt_all"] = dealIntData(ib5Obj.video_halt_all);
            if (!dataIsNull(ib5Obj.video_halt_all) && !dataIsNull(ib5Obj.video_halt_rate_bad) && Number(ib5Obj.video_halt_all)!=0) {
                loadImgObj["video_halt_rate"] = dealFloatData((ib5Obj.video_halt_all - ib5Obj.video_halt_rate_bad) * 100 / ib5Obj.video_halt_all);
            } else {
                loadImgObj["video_halt_rate"] = 0;
            }
            //游戏
            loadImgObj["game_all"] = dealIntData(ib5Obj.game_all);
            if (!dataIsNull(ib5Obj.game_all) && !dataIsNull(ib5Obj.game_delay_bad) && Number(ib5Obj.game_all)!=0) {
                loadImgObj["game_rate"] = dealFloatData((ib5Obj.game_all - ib5Obj.game_delay_bad) * 100 / ib5Obj.game_all);
            } else {
                loadImgObj["game_rate"] = 0;
            }
            resultList.push(loadImgObj);
        }
    }
    badCellAnalysis.allHourChartTab = resultList;
}

//负荷、空口指标、覆盖情况（图1，表1，表2）、干扰情况、空口感知
/**********************************
 * @funcname badCellAnalysis.tabTableData
 * @funcdesc 处理负荷、空口指标、覆盖情况（图1，表1，表2）、干扰情况、空口感知 的表格数据
 * @param {data} item (input optional) 回调数据
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.tabTableData=function badCellAnalysis_tabTableData(data) {
    var results = data.result.length>0 ? data.result : [];

    /**
     *  i:a3,i:a4,i:a5,i:a6,i:a7,i:a8,i:a9,i:a10,i:a11,i:a12,i:a13,i:a14,i:a16
     * i:a3,i:a8，i:a9,i:a10,i:a11 的有数据时为float类型，否则为 null
     * i:a4，i:a5,i:a6:数据返回的类型为：bigint，
     * i:a7:前八项为float，后三项为bigint类型
     * i:a12,i:a13,i:a14的值为int类型，为1或0，代表正常或者异常
     */
    badCellAnalysis.cellObj={};
    if (results.length > 0) {
        var ia3Key = ["dw_prb_userate", "up_prb_userate", "pdcch_ocprate", "prach_ocprate", "pag_ocprate", "rrccon_succrate", "rrccon_succrate_v", "rrccon_rbrate", "ue_drop_rate", "erab_succ_rate", "erab_drop_rate"];
        var ia4Key = ["rrccon_fail_cellrj", "rrccon_fail_oth", "rrccon_fail_uenor", "ue_nrls_rate", "ue_anrls_rate", "erab_req", "erab_succ", "erab_fail_wrlack", "erab_fail_wl", "erab_fail_oth"];
        var ia5Key = ["erab_fail_core", "erab_fail_tl", "erab_fail_smfail", "erab_fail_uenor", "erab_nrls", "erab_anrls", "erab_anrls_wl", "erab_anrls_netcong", "erab_anrls_swfail", "erab_anrls_core", "erab_anrls_tl"];
        var ia6Key = ["report_cqi0", "report_cqi1", "report_cqi2", "report_cqi3", "report_cqi4", "report_cqi5", "report_cqi6", "report_cqi7", "report_cqi8", "report_cqi9", "report_cqi10", "report_cqi11", "report_cqi12", "report_cqi13", "report_cqi14", "report_cqi15"];
        var ia7Key = ["rssi_avg", "pdch_dwflow", "pdch_upflow", "userex_upavgrate", "userex_dwavgrate", "user_avgdelay", "aidw_packloss_rate", "avg_rsrp", "avg_distance", "ests1_att", "ests1_succ"];
        var ia8Key = ["counter0003", "counter0053", "counter0077", "counter0013", "counter0270", "counter0271", "counter0110", "counter0111", "counter0108"];
        var ia9Key = ["counter0109", "counter0156", "counter0157", "counter0159", "counter0160", "counter0151", "counter0193", "counter0154", "counter0196"];
        var ia10Key = ["ests1_succ_rate", "swchx2_succ_rate", "swchs1_succ_rate", "swchsf_succ_rate", "swchaf_succ_rate", "swchenin_succ_rate", "swchenmu_succ_rate"];
        var ia11Key = ["rsrp_level1_rate", "rsrp_level2_rate", "rsrp_level3_rate", "rsrp_level4_rate", "rsrp_level5_rate", "cqi_level1_rate", "cqi_level2_rate"];
        var ia12Key = ["dw_prb_userate_stat", "pdcch_ocprate_stat", "prach_ocprate_stat", "counter0003_stat", "rrccon_succrate_stat", "rrccon_rbrate_stat", "ue_drop_rate_stat", "erab_succ_rate_stat", "erab_drop_rate_stat"];
        var ia13Key = ["swchx2_succ_rate_stat", "swchs1_succ_rate_stat", "swchsf_succ_rate_stat", "swchaf_succ_rate_stat", "userex_dwavgrate_stat", "user_avgdelay_stat"];
        var ia14Key = ["rssi_avg_stat", "counter0270_stat", "report_cqi_avg_stat", "avg_rsrp_stat", "avg_distance_stat", "up_prb_userate_stat"];
        var ia16Key = ["avg_rsrp_234","band_width","avg_rsrp_234_stat"];

        for (var i = 0; i < results.length; i++) {
            var resultItem = results[i];

            var ia3Obj = callBackSplice(resultItem[0], ia3Key);
            var ia4Obj = callBackSplice(resultItem[1], ia4Key);
            var ia5Obj = callBackSplice(resultItem[2], ia5Key);
            var ia6Obj = callBackSplice(resultItem[3], ia6Key);
            var ia7Obj = callBackSplice(resultItem[4], ia7Key);
            var ia8Obj = callBackSplice(resultItem[5], ia8Key);
            var ia9Obj = callBackSplice(resultItem[6], ia9Key);
            var ia10Obj = callBackSplice(resultItem[7], ia10Key);
            var ia11Obj = callBackSplice(resultItem[8], ia11Key);
            var ia12Obj = callBackSplice(resultItem[9], ia12Key);
            var ia13Obj = callBackSplice(resultItem[10], ia13Key);
            var ia14Obj = callBackSplice(resultItem[11], ia14Key);
            var ia16Obj = callBackSplice(resultItem[12], ia16Key);

            var cellInfoObj = {};



            for (var ia3 in ia3Obj){
                cellInfoObj[ia3]=dataMultiply100(ia3Obj[ia3]);
            }
            for (var ia4 in ia4Obj){
                cellInfoObj[ia4]=ia4Obj[ia4];
            }
            for (var ia5 in ia5Obj){
                cellInfoObj[ia5]=ia5Obj[ia5];
            }
            var divisor = 0;
            var dividend = 0;
            var a6=0;
            for (var ia6 in ia6Obj){
                cellInfoObj[ia6]=ia6Obj[ia6];
                divisor += Number(formatValue(dealIntData(ia6Obj[ia6]))) * a6;
                dividend += Number(formatValue(dealIntData(ia6Obj[ia6])));
                a6++;
            }
            cellInfoObj["report_cqi"]=parseInt(divisor / dividend);//计算【覆盖】中的[2.99]平均CQI字段
            for (var ia7 in ia7Obj){
                if(ia7=="avg_distance"||ia7=="ests1_att"||ia7=="ests1_succ"){
                    cellInfoObj[ia7]=ia7Obj[ia7];
                }else if(ia7=="aidw_packloss_rate"){
                    cellInfoObj[ia7]=dataMultiply100(ia7Obj[ia7]);
                }else{
                    cellInfoObj[ia7]=dealFloatData(ia7Obj[ia7]);
                }
            }
            for (var ia8 in ia8Obj){
                if(ia8=="counter0270"||ia8=="counter0271"){
                    cellInfoObj[ia8]=dealFloatData(ia8Obj[ia8]);
                }else{
                    cellInfoObj[ia8]=dealIntData(ia8Obj[ia8]);
                }

            }
            for (var ia9 in ia9Obj){
                cellInfoObj[ia9]=dealFloatData(ia9Obj[ia9]);
            }
            for (var ia10 in ia10Obj){
                cellInfoObj[ia10]=dataMultiply100(ia10Obj[ia10]);
            }
            for (var ia11 in ia11Obj){
                cellInfoObj[ia11]=dataMultiply100(ia11Obj[ia11]);
            }
            for (var ia12 in ia12Obj){
                cellInfoObj[ia12]=ia12Obj[ia12];
            }
            for (var ia13 in ia13Obj){
                cellInfoObj[ia13]=ia13Obj[ia13];
            }
            for (var ia14 in ia14Obj){
                cellInfoObj[ia14]=ia14Obj[ia14];
            }
            for (var ia16 in ia16Obj){
                cellInfoObj[ia16]=ia16Obj[ia16];
            }
            badCellAnalysis.cellObj=cellInfoObj;

            //覆盖第二个柱形图标题缓存
            badCellAnalysis.coverBar2Title={"distince":cellInfoObj.avg_distance,"rsrp":cellInfoObj.avg_rsrp};
        }
    }

    badCellAnalysis.callBackTab1(badCellAnalysis.cellObj);//负荷表格
    badCellAnalysis.callBackTab2(badCellAnalysis.cellObj);//空口指标表格
    badCellAnalysis.callBackTab3(badCellAnalysis.cellObj);//覆盖
    badCellAnalysis.callBackTab4(badCellAnalysis.cellObj);//干扰
    badCellAnalysis.callBackTab5(badCellAnalysis.cellObj);//空口感知


}


//1负荷情况
/**********************************
 * @funcname badCellAnalysis.callBackTab1
 * @funcdesc 1负荷情况呈现
 * @param {result} item (input optional) 传入表格的数据
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.callBackTab1=function badCellAnalysis_callBackTab1(result) {
    if(result!=undefined){
        var $tableTr=$("#tab1_table > tbody > tr");//tdColor
        $tableTr.eq(0).children().eq(1).text(valueRate(result.dw_prb_userate));
        var td1Color=getTdColor(result.dw_prb_userate,result.dw_prb_userate_stat);
        $tableTr.eq(0).children().eq(1).addClass(td1Color);

        $tableTr.eq(1).children().eq(1).text(valueRate(result.up_prb_userate));
        var td2Color=getTdColor(result.up_prb_userate,result.up_prb_userate_stat);
        $tableTr.eq(1).children().eq(1).addClass(td2Color);

        $tableTr.eq(2).children().eq(1).text(valueRate(result.pdcch_ocprate));
        var td3Color=getTdColor(result.pdcch_ocprate,result.pdcch_ocprate_stat);
        $tableTr.eq(2).children().eq(1).addClass(td3Color);

        $tableTr.eq(3).children().eq(1).text(valueRate(result.prach_ocprate));
        var td4Color=getTdColor(result.prach_ocprate,result.prach_ocprate_stat);
        $tableTr.eq(3).children().eq(1).addClass(td4Color);

        $tableTr.eq(4).children().eq(1).text(result.counter0003);
        var td5Color=getTdColor(result.counter0003,result.counter0003_stat);
        $tableTr.eq(4).children().eq(1).addClass(td5Color);

        $tableTr.eq(5).children().eq(1).text(result.counter0053);
        $tableTr.eq(6).children().eq(1).text(result.counter0077);
        $tableTr.eq(7).children().eq(1).text(result.counter0013);
        $tableTr.eq(8).children().eq(1).text(valueRate(result.pag_ocprate));
    }
    $('#tab1_table > tbody > tr > td:last-child').css({"cursor":"pointer","text-decoration":"underline"});//最后一列加上鼠标、下划线的样式
    //给负荷情况的每个指标绑定事件：弹出具体折线图
    $("#tab1_table > tbody > tr > td:last-child").unbind("click").click(function () {
        badCellAnalysis.goodRateHow = 0;//在这里将badCellAnalysis.goodRateHow恢复为首屏
        //在这里准备具体折线图的一些信息：
        var index = $(this).parent().index();
        badCellAnalysis.lineLegend = $(this).prev().text();//保存具体指标的折线图标题
        badCellAnalysis.clickTrIndex = index;//当前表格点击的第几个tr
        /*var dialogX = art.dialog({
            id: 'bad',
            title: 'badbad',
            width: 1020,
            height: 300,
            content: badCellAnalysis.content,
            lock: true,
            padding: 0,
            close: true,
            fixed: true
        }).show();*/
        $(".wrap_Dialog").show();
        $("#badCellAnalysisDiv").scrollTop($("#badCellAnalysisDiv")[0].scrollHeight);
        //画图
        callBackTab1_1_buildChart(badCellAnalysis.allHourChartTab);

        $("#legend_Dialog li").unbind("click").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            var index = $('#legend_Dialog li').index($(this));
            badCellAnalysis.goodRateHow = index;
            callBackTab1_1_buildChart(badCellAnalysis.allHourChartTab);
        });
    });

}

//2空口指标
/**********************************
 * @funcname badCellAnalysis.callBackTab2
 * @funcdesc 2空口指标呈现
 * @param {result} item (input optional) 传入表格的数据
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.callBackTab2=function badCellAnalysis_callBackTab2(result) {
    if(result!=undefined){
        var cData=[
            result.rrccon_succrate,result.rrccon_fail_uenor,result.rrccon_fail_cellrj,result.rrccon_fail_oth,
            result.rrccon_rbrate,result.ue_drop_rate,result.ue_nrls_rate,result.ue_anrls_rate,
            result.erab_req,result.erab_succ,result.erab_succ_rate,result.erab_fail_uenor,
            result.erab_fail_core,result.erab_fail_tl,result.erab_fail_wl,result.erab_fail_wrlack,
            result.erab_fail_smfail,result.erab_fail_oth,result.erab_nrls,result.erab_anrls,
            result.erab_drop_rate,result.erab_anrls_core,result.erab_anrls_tl,result.erab_anrls_netcong,
            result.erab_anrls_wl,result.erab_anrls_swfail,result.ests1_succ_rate,result.ests1_att,
            result.ests1_succ,result.swchx2_succ_rate,result.counter0111,result.counter0110,
            result.swchs1_succ_rate,result.counter0109,result.counter0108,result.swchsf_succ_rate,
            result.counter0157,result.counter0156,result.swchaf_succ_rate,result.counter0160,
            result.counter0159,result.counter0151,result.counter0193,result.counter0154,
            result.counter0196,result.swchenin_succ_rate,result.swchenmu_succ_rate
        ];
        var $tableTr=$("#tab2_table > tbody > tr");
        for(var i in cData){
            if(i==0||i==4||i==5||i==10||i==20||i==26||i==29||i==32||i==35||i==38||i==45||i==46){//文本值需要加上%
                if(i==0||i==5||i==8||i==29){
                    $tableTr.eq(i).children().eq(2).text(valueRate(cData[i]));//这几行加了合并列的原因
                }else{
                    $tableTr.eq(i).children().eq(1).text(valueRate(cData[i]));
                }
            }else{
                if(i==0||i==5||i==8||i==29){
                    $tableTr.eq(i).children().eq(2).text(cData[i]);//这几行加了合并列的原因
                }else{
                    $tableTr.eq(i).children().eq(1).text(cData[i]);
                }
            }

            //开始添加样式
            var tdColor="";
            if(i==0){
                tdColor=getTdColor(cData[i],result.rrccon_succrate_stat);
                $tableTr.eq(i).children().eq(2).addClass(tdColor);
            }else if(i==4){
                tdColor=getTdColor(cData[i],result.rrccon_rbrate_stat);
                $tableTr.eq(i).children().eq(1).addClass(tdColor);
            }else if(i==5){
                tdColor=getTdColor(cData[i],result.ue_drop_rate_stat);
                $tableTr.eq(i).children().eq(2).addClass(tdColor);
            }else if(i==10){
                tdColor=getTdColor(cData[i],result.erab_succ_rate_stat);
                $tableTr.eq(i).children().eq(1).addClass(tdColor);
            }else if(i==20){
                tdColor=getTdColor(cData[i],result.erab_drop_rate_stat);
                $tableTr.eq(i).children().eq(1).addClass(tdColor);
            }else if(i==29){
                tdColor=getTdColor(cData[i],result.swchx2_succ_rate_stat);
                $tableTr.eq(i).children().eq(2).addClass(tdColor);
            }else if(i==32){
                tdColor=getTdColor(cData[i],result.swchs1_succ_rate_stat);
                $tableTr.eq(i).children().eq(1).addClass(tdColor);
            }else if(i==35){
                tdColor=getTdColor(cData[i],result.swchsf_succ_rate_stat);
                $tableTr.eq(i).children().eq(1).addClass(tdColor);
            }else if(i==38){
                tdColor=getTdColor(cData[i],result.swchaf_succ_rate_stat);
                $tableTr.eq(i).children().eq(1).addClass(tdColor);
            }
        }
    }
    $('#tab2_table > tbody > tr > td:last-child').css({"cursor":"pointer","text-decoration":"underline"});//最后一列加上鼠标、下划线的样式

    //给负荷情况的每个指标绑定事件：弹出具体折线图
    $("#tab2_table > tbody > tr > td:last-child").unbind("click").click(function () {
        //在这里准备具体折线图的一些信息：
        badCellAnalysis.goodRateHow = 0;//在这里将badCellAnalysis.goodRateHow恢复为首屏
        //在这里准备具体折线图的一些信息：
        var index = $(this).parent().index();
        badCellAnalysis.lineLegend = $(this).prev().text();//保存具体指标的折线图标题
        badCellAnalysis.clickTrIndex = index;//当前表格点击的第几个tr
        /*var dialogX = art.dialog({
            id: 'bad',
            title: 'badbad',
            width: 1020,
            height: 300,
            content: badCellAnalysis.content,
            lock: true,
            padding: 0,
            close: true,
            fixed: true
        }).show();*/
        $(".wrap_Dialog").show();
        $("#badCellAnalysisDiv").scrollTop($("#badCellAnalysisDiv")[0].scrollHeight);
        //画图
        callBackTab1_1_buildChart(badCellAnalysis.allHourChartTab);
        $("#legend_Dialog li").unbind("click").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            var index = $('#legend_Dialog li').index($(this));
            badCellAnalysis.goodRateHow = index;
            callBackTab1_1_buildChart(badCellAnalysis.allHourChartTab);
        });
    });
}

//3覆盖质量（第一个柱状图+第一个表格+第二个表格）
/**********************************
 * @funcname badCellAnalysis.callBackTab3
 * @funcdesc 3覆盖质量（第一个柱状图+第一个表格+第二个表格）封装好数据传入对应的处理方法呈现
 * @param {result} item (input optional) 传入表格的数据
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.callBackTab3=function badCellAnalysis_callBackTab3(result) {
    //给表格1赋值
    var cData1 = [
        result.report_cqi0,
        result.report_cqi1,
        result.report_cqi2,
        result.report_cqi3,
        result.report_cqi4,
        result.report_cqi5,
        result.report_cqi6,
        result.report_cqi7,
        result.report_cqi8,
        result.report_cqi9,
        result.report_cqi10,
        result.report_cqi11,
        result.report_cqi12,
        result.report_cqi13,
        result.report_cqi14,
        result.report_cqi15,
        result.report_cqi,
        //新增2行：
        result.cqi_level1_rate,
        result.cqi_level2_rate
    ];
    var threshold1={"report_cqi_avg_stat":result.report_cqi_avg_stat};

    //给表格2赋值
    var cData2 = [
        result.avg_distance,
        result.avg_rsrp_234,
        result.avg_rsrp,
        result.rsrp_level1_rate,
        result.rsrp_level2_rate,
        result.rsrp_level3_rate,
        result.rsrp_level4_rate,
        result.rsrp_level5_rate
    ];
    var threshold2={
        "avg_distance_stat":result.report_cqi_avg_stat,
        "avg_rsrp_234_stat":result.report_cqi_avg_stat,
        "avg_rsrp_stat":result.report_cqi_avg_stat
    };


    badCellAnalysis.callBackTab3_1_chart(cData1,result.report_cqi);//第一个柱形图
    if(result!=undefined){
        badCellAnalysis.callBackTab3_1_table(cData1,threshold1);//第一个表格
        badCellAnalysis.callBackTab3_2_table(cData2,threshold2);//第二个表格
    }
}
//3覆盖质量 第一个柱形图
/**********************************
 * @funcname badCellAnalysis.callBackTab3
 * @funcdesc 3覆盖质量 第一个柱形图呈现
 * @param {result} item (input optional) 传入表格的数据
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.callBackTab3_1_chart=function badCellAnalysis_callBackTab3_1_chart(cData,report_cqi=0){
    var xIndex = [];
    var yNumber = [];
    for (var i = 0; i < 16; i++) {
        xIndex.push($("#tab3_1_table > tbody > tr").eq(i).children("td").eq(0).text());
    }
    for (var i = 0; i < 16; i++) {
        if(dataIsNull(cData[i])){
            yNumber.push('-');
        }else{
            yNumber.push(cData[i]);
        }
    }
    if(badCellAnalysis.coverBar1==null){
        badCellAnalysis.coverBar1 = echarts.init(document.getElementById('bar_1'));
    }
    var chartContainer = $("#bar_1");
    /*chartContainer[0].style.width = '' + ($(window).width() - 10) + 'px';
    chartContainer[0].style.height = "390px";*/
    badCellAnalysis.barOption.title.text = '平均CQI:' + report_cqi;
    badCellAnalysis.barOption.xAxis[0].data = xIndex; //指标名称
    badCellAnalysis.barOption.series[0].data = yNumber;  //数值
    badCellAnalysis.coverBar1.setOption(badCellAnalysis.barOption);
    badCellAnalysis.coverBar1.resize();
}

//3覆盖质量 第一个表格
/**********************************
 * @funcname badCellAnalysis.callBackTab3_1_table
 * @funcdesc 3覆盖质量 第一个表格呈现
 * @param {cData} item (input optional) 传入表格的数据
 * @param {threshold} item (input optional) 传入表格需要用到的门限值用于比较取色
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.callBackTab3_1_table=function badCellAnalysis_callBackTab3_1_table(cData,threshold){
    var $tableTr=$("#tab3_1_table > tbody > tr");
    for(var i in cData){
        $tableTr.eq(i).children().eq(1).text(cData[i]);
        if(i==16){
            var tdColor=getTdColor(cData[i],threshold.report_cqi_avg_stat);
            $tableTr.eq(i).children().eq(1).addClass(tdColor);
        }else if(i==17){
            $tableTr.eq(i).children().eq(1).text(valueRate(cData[i]));
        }else if(i==18){
            $tableTr.eq(i).children().eq(1).text(valueRate(cData[i]));
        }
    }
}

//3覆盖质量 第二个表格
/**********************************
 * @funcname badCellAnalysis.callBackTab3_2_table
 * @funcdesc 3覆盖质量 第二个表格
 * @param {cData} item (input optional) 传入表格的数据
 * @param {threshold} item (input optional) 传入表格需要用到的门限值用于比较取色
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.callBackTab3_2_table=function badCellAnalysis_callBackTab3_2_table(cData,threshold){
    var $tableTr=$("#tab3_2_table > tbody > tr");
    for(var i in cData){
        $tableTr.eq(i).children().eq(1).text(cData[i]);
        if(i==0){
            var tdColor=getTdColor(cData[i],threshold.avg_distance_stat);
            $tableTr.eq(i).children().eq(1).addClass(tdColor);
        }else if(i==1){
            var tdColor=getTdColor(cData[i],threshold.avg_rsrp_234_stat);
            $tableTr.eq(i).children().eq(1).addClass(tdColor);
        }else if(i==2){
            var tdColor=getTdColor(cData[i],threshold.avg_rsrp_stat);
            $tableTr.eq(i).children().eq(1).addClass(tdColor);
        }else{
            $tableTr.eq(i).children().eq(1).text(valueRate(cData[i]));
        }
    }
}

//3覆盖质量 第二个柱形图
/**********************************
 * @funcname badCellAnalysis.callBackTab3_2_chart
 * @funcdesc 3覆盖质量 第二个柱形图
 * @param {data} item (input optional) 回调的数据
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.callBackTab3_2_chart=function badCellAnalysis_callBackTab3_2_chart(data) {
    var columns=[];
    for(var i in data.columns){
        if(data.columns[i]=="rowkey"){
            columns.push("rowkey");
        }else{
            columns.push((data.columns[i].split(":")[1]).toLocaleLowerCase());
        }

    }
    data.columns=columns;

    var result = callBackChangeData(data);
    var mr_distance = [];  //接入距离 -----------横坐标
    var access_nums = [];   //次数 --------------纵坐标
    var avg_ltescrsrp = [];    //平均RSRP ------ 颜色

    var xNumber = [];
    var cNumber = [];
    // x< -119无覆盖, -119< =x< -115, -115< =x< -105, -105< =x< -95 ,-95< =x< -85 ,-85< =x
    var yNumber1 = [];
    var yNumber2 = [];
    var yNumber3 = [];
    var yNumber4 = [];
    var yNumber5 = [];
    var yNumber6 = [];
    for (var i = 1; i < 129; i++) {
        xNumber[i-1] = i * 78;
        cNumber[i-1] = "-";
        yNumber1[i-1] = {"rsrp":"-","value":"-"};
        yNumber2[i-1] = {"rsrp":"-","value":"-"};
        yNumber3[i-1] = {"rsrp":"-","value":"-"};
        yNumber4[i-1] = {"rsrp":"-","value":"-"};
        yNumber5[i-1] = {"rsrp":"-","value":"-"};
        yNumber6[i-1] = {"rsrp":"-","value":"-"};
    }
    for (var i = 0; i < result.length; i++) {
        if (noceUtil.isUndefined(result[i])) {
            result[i] = 0;
        }
        if(Number(result[i].rowkey.split("_")[4])>127){
            continue;
        }

        mr_distance.push(result[i].mr_distance);//接入距离 -----------横坐标
        access_nums.push(result[i].access_nums);//次数 --------------纵坐标
        avg_ltescrsrp.push(result[i].avg_ltescrsrp);//平均RSRP ------ 颜色
        var index = xNumber.indexOf(Number(result[i].mr_distance));//当前x在x模板中的位置
        //根据这个index来给模板相应的位置补上相应数据
        cNumber[index] = result[i].avg_ltescrsrp;
        //给每个数值分类
        if (result[i].avg_ltescrsrp < -119) {
            yNumber1[index]["value"]=result[i].access_nums;
            yNumber1[index]["rsrp"]=result[i].avg_ltescrsrp;
            cNumber[index]=0;

        }
        if (result[i].avg_ltescrsrp >= -119 && result[i].avg_ltescrsrp < -115) {
            yNumber2[index]["value"]=result[i].access_nums;
            yNumber2[index]["rsrp"]=result[i].avg_ltescrsrp;
            cNumber[index]=1;

        }
        if (result[i].avg_ltescrsrp >= -115 && result[i].avg_ltescrsrp < -105) {
            yNumber3[index]["value"]=result[i].access_nums;
            yNumber3[index]["rsrp"]=result[i].avg_ltescrsrp;
            cNumber[index]=2;
        }
        if (result[i].avg_ltescrsrp >= -105 && result[i].avg_ltescrsrp < -95) {
            yNumber4[index]["value"]=result[i].access_nums;
            yNumber4[index]["rsrp"]=result[i].avg_ltescrsrp;
            cNumber[index]=3;
        }
        if (result[i].avg_ltescrsrp >= -95 && result[i].avg_ltescrsrp < -85) {
            yNumber5[index]["value"]=result[i].access_nums;
            yNumber5[index]["rsrp"]=result[i].avg_ltescrsrp;
            cNumber[index]=4;

        }
        if (result[i].avg_ltescrsrp >= -85) {
            yNumber6[index]["value"]=result[i].access_nums;
            yNumber6[index]["rsrp"]=result[i].avg_ltescrsrp;
            cNumber[index]=5;
        }
    }
    badCellAnalysis.seriesIndex=cNumber;//记录有颜色的柱形用的是哪个series
    //准备一个64个默认颜色的数组
    // var colorList = ['red', '#ff6600', '#ff9900', 'yellow', '#99e699', 'green'];

    if(badCellAnalysis.coverBar2==null){
        badCellAnalysis.coverBar2 = echarts.init(document.getElementById('bar_2'));
    }
    var chartContainer = $("#bar_2");
    /* chartContainer[0].style.width = '' + ($(window).width() - 10) + 'px';
     chartContainer[0].style.height = "390px";*/
    var titleVal=badCellAnalysis.coverBar2Title;
    if (noceUtil.isUndefined(titleVal)) {  //判断如果为null
        titleVal={"distince":"0","rsrp":"0"};
    }
    var title = "平均覆盖距离：" + titleVal.distince + "米   "+"平均RSRP：" + titleVal.rsrp + "米   ";
    badCellAnalysis.barOption_2.title.text ="平均覆盖距离：" + titleVal.distince + "米   "+"平均RSRP：" + titleVal.rsrp + "dBm";;
    badCellAnalysis.barOption_2.yAxis[0].name = "次数";
    badCellAnalysis.barOption_2.xAxis[0].name = "米";
    badCellAnalysis.barOption_2.series[0].data = yNumber1;  //数值
    badCellAnalysis.barOption_2.series[1].data = yNumber2;  //数值
    badCellAnalysis.barOption_2.series[2].data = yNumber3;  //数值
    badCellAnalysis.barOption_2.series[3].data = yNumber4;  //数值
    badCellAnalysis.barOption_2.series[4].data = yNumber5;  //数值
    badCellAnalysis.barOption_2.series[5].data = yNumber6;  //数值
    badCellAnalysis.barOption_2.xAxis[0].data = xNumber; //指标名称
    badCellAnalysis.coverBar2.setOption(badCellAnalysis.barOption_2);
    badCellAnalysis.coverBar2.resize();
    /*$("#bar_2").show();*/
}


//4干扰情况
/**********************************
 * @funcname badCellAnalysis.callBackTab4
 * @funcdesc 4干扰情况 呈现
 * @param {data} item (input optional) 回调的数据
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.callBackTab4=function badCellAnalysis_callBackTab4(result) {
    if(result!=undefined){
        var $tableTr=$("#tab4_table > tbody > tr");
        $tableTr.eq(0).children().eq(1).text(result.rssi_avg);
        var td1Color=getTdColor(result.rssi_avg,result.rssi_avg_stat);
        $tableTr.eq(0).children().eq(1).addClass(td1Color);
        $tableTr.eq(1).children().eq(1).text(result.counter0270);
        var td2Color=getTdColor(result.counter0270,result.counter0270_stat);
        $tableTr.eq(1).children().eq(1).addClass(td2Color);
        $tableTr.eq(2).children().eq(1).text(result.counter0271);
    }
    $('#tab4_table > tbody > tr > td:last-child').css({"cursor":"pointer","text-decoration":"underline"});//最后一列加上鼠标、下划线的样式
    $("#tab4_table > tbody > tr > td:last-child").unbind("click").click(function () {
        badCellAnalysis.goodRateHow = 0;//在这里将badCellAnalysis.goodRateHow恢复为首屏
        //在这里准备具体折线图的一些信息：
        var index = $(this).parent().index();
        badCellAnalysis.lineLegend = $(this).prev().text();//保存具体指标的折线图标题
        badCellAnalysis.clickTrIndex = index;//当前表格点击的第几个tr
        /*var dialogX = art.dialog({
            id: 'bad',
            title: 'badbad',
            width: 1020,
            height: 300,
            content: badCellAnalysis.content,
            lock: true,
            padding: 0,
            close: true,
            fixed: true
        }).show();*/
        $(".wrap_Dialog").show();
        $("#badCellAnalysisDiv").scrollTop($("#badCellAnalysisDiv")[0].scrollHeight);
        //画图
        callBackTab1_1_buildChart(badCellAnalysis.allHourChartTab);

        $("#legend_Dialog li").unbind("click").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            var index = $('#legend_Dialog li').index($(this));
            badCellAnalysis.goodRateHow = index;
            callBackTab1_1_buildChart(badCellAnalysis.allHourChartTab);
        });
    });

}

//5空口感知情况
/**********************************
 * @funcname badCellAnalysis.callBackTab5
 * @funcdesc 5空口感知情况 呈现
 * @param {result} item (input optional) 表格的数据
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.callBackTab5=function badCellAnalysis_callBackTab5(result) {
    if(result!=undefined){
        //5 空口感知情况  七个
        result.pdch_flow=(Number(formatValue(result.pdch_dwflow))+Number(formatValue(result.pdch_upflow))).toFixed(2);
        var cData = [
            result.pdch_flow,
            result.pdch_dwflow,
            result.pdch_upflow,
            result.userex_upavgrate,
            result.userex_dwavgrate,
            result.user_avgdelay,
            result.aidw_packloss_rate,
        ]
        var $tableTr=$("#tab5_table > tbody > tr");
        for(var i in cData){
            $tableTr.eq(i).children().eq(1).text(cData[i]);
            if(i==4){
                var tdColor=getTdColor(cData[i],result.userex_dwavgrate_stat);
                $tableTr.eq(4).children().eq(1).addClass(tdColor);
            }else if(i==5){

                var tdColor=getTdColor(cData[i],result.user_avgdelay_stat);
                $tableTr.eq(5).children().eq(1).addClass(tdColor);
            }else if(i==6){
                $tableTr.eq(i).children().eq(1).text(valueRate(cData[i]));
            }
        }
    }

    $('#tab5_table > tbody > tr > td:last-child').css({"cursor":"pointer","text-decoration":"underline"});//最后一列加上鼠标、下划线的样式

    $("#tab5_table > tbody > tr > td:last-child").unbind("click").click(function () {
        badCellAnalysis.goodRateHow = 0;//在这里将badCellAnalysis.goodRateHow恢复为首屏
        //在这里准备具体折线图的一些信息：
        var index = $(this).parent().index();
        badCellAnalysis.lineLegend = $(this).prev().text();//保存具体指标的折线图标题
        badCellAnalysis.clickTrIndex = index;//当前表格点击的第几个tr
        /*var dialogX = art.dialog({
            id: 'bad',
            title: 'badbad',
            width: 1020,
            height: 300,
            content: badCellAnalysis.content,
            lock: true,
            padding: 0,
            close: true,
            fixed: true
        }).show();*/
        $(".wrap_Dialog").show();
        $("#badCellAnalysisDiv").scrollTop($("#badCellAnalysisDiv")[0].scrollHeight);
        //画图
        callBackTab1_1_buildChart(badCellAnalysis.allHourChartTab);

        $("#legend_Dialog li").unbind("click").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            var index = $('#legend_Dialog li').index($(this));
            badCellAnalysis.goodRateHow = index;
            callBackTab1_1_buildChart(badCellAnalysis.allHourChartTab);
        });
    });


}


//6繁忙度（折线图）
/**********************************
 * @funcname badCellAnalysis.callBackTab6
 * @funcdesc 6繁忙度 24小时按照分钟呈现
 * @param {data} item (input optional) 回调的数据
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.callBackTab6=function badCellAnalysis_callBackTab6(data) {
    var columns=[];
    for(var i in data.columns){
        if(i=="0"||i==0){
            columns.push("rowkey");
        }else{
            columns.push((data.columns[i].split(":")[1]).toLocaleLowerCase());
        }

    }
    data.columns=columns;
    var result = callBackChangeData(data);

    var newX=[];
    var yNumber_tmp = [];//补上分布图缺失值(先将纵坐标全部设为0)
    for(var i=0;i<24;i++){
        if(i<10){
            i="0"+i;
        }
        for(var k=0;k<60;k++){
            if(k<10){
                k="0"+k;
            }
            newX.push(i+":"+k);
            yNumber_tmp.push(0);
        }
    }

    var xIndex = [];
    var yNumber = [];
    //再用有数据的yNumber[i]将0替换掉
    for (var i = 0; i < result.length; i++) {
        xIndex.push(result[i]["rowkey"]);
        yNumber.push(result[i]["dpi_user_num"]);
    }
    //再用有数据的yNumber[i]将0替换掉
    for (var i = 0; i < xIndex.length; i++) {
        if(Number(xIndex)>2359){
            continue;
        }
        var nowIndex = minConvertor(xIndex[i].split("_")[3].substr(8));//这里采用‘单个’//例如由于100 并不是第100个，所以转化为"01:00"在  newX 里是第几个！
        var index = newX.indexOf(nowIndex);
        yNumber_tmp[index] = yNumber[i];
    }
    xIndex = newX;
    yNumber = yNumber_tmp;
    if(badCellAnalysis.busyline==null){
        badCellAnalysis.busyline = echarts.init(document.getElementById('line'));
    }
    var chartContainer = $("#line");
    /*chartContainer[0].style.width = "1200px";
    chartContainer[0].style.height = "350px";*/
    badCellAnalysis.distriOption_2.series[0].color = "#ff6600";
    badCellAnalysis.distriOption_2.title.text = badCellAnalysis.timeId + '分钟级繁忙度图';
    badCellAnalysis.distriOption_2.xAxis[0].data = xIndex; //小时：分钟
    badCellAnalysis.distriOption_2.series[0].data = yNumber;  //人数

    pointLine = [];
    var point = 40;
    var len = yNumber.length;
    for (var i = 1; i < len; i++) {
        if (yNumber[i] > point || yNumber[i] == point) {
            pointLine.push(yNumber[i]);
        }
    }
    var pointCount = pointLine.length;  //Y轴大于40的数据

    badCellAnalysis.pointCount = pointCount;

    console.log(pointLine);
    console.log(pointCount);


    badCellAnalysis.busyline.setOption(badCellAnalysis.distriOption_2);
    badCellAnalysis.busyline.resize();
}


//7 TOP用户
/**********************************
 * @funcname badCellAnalysis.callBackTab7
 * @funcdesc 7TOP用户 按记录数降序排序
 * @param {data} item (input optional) 回调的数据
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.callBackTab7=function badCellAnalysis_callBackTab7(data) {
    var columns=[];
    for(var i in data.columns){
        if(i=="0"||i==0){
            columns.push("rowkey");
        }else{
            columns.push((data.columns[i].split(":")[1]).toLocaleLowerCase());
        }
    }
    data.columns=columns;
    var resultData = callBackChangeData(data);
    var result=badCellAnalysis.sortByKey(resultData,"test_num_all");
    var rows="";
    for (var i = 0; i < result.length; i++) {
        var imsi=result[i].rowkey.split("_")[4];
        var test_num_all=result[i].test_num_all;
        var test_num_bad=result[i].test_num_bad;
        var avg_tcp_ack_dl_tot=0;
        if(!dataIsNull(result[i].tcp_ack_dl_tot)&&!dataIsNull(result[i].test_num_all)&&Number(result[i].test_num_all)!=0){
            avg_tcp_ack_dl_tot=(parseFloat(result[i].tcp_ack_dl_tot)/parseFloat(result[i].test_num_all)).toFixed(2);
        }
        var avg_wireless_dt2_tot=0;
        if(!dataIsNull(result[i].wireless_dt2_tot)&&!dataIsNull(result[i].test_num_all)&&Number(result[i].test_num_all)!=0){
            avg_wireless_dt2_tot=(parseFloat(result[i].wireless_dt2_tot)/parseFloat(result[i].test_num_all)).toFixed(2);
        }
        var avg_ltescrsrp_avg_tot=0;
        if(!dataIsNull(result[i].ltescrsrp_avg_tot)&&!dataIsNull(result[i].test_num_rsrp)&&Number(result[i].test_num_rsrp)!=0){
            avg_ltescrsrp_avg_tot=(parseFloat(result[i].ltescrsrp_avg_tot)/parseFloat(result[i].test_num_rsrp)).toFixed(2);
        }
        var duration_tot=result[i].duration_tot;
        rows += "<tr><td>" + (i + 1) + "</td>" +
            "<td>" + imsi + "</td>" +
            "<td>" + test_num_all + "</td>" +
            "<td>" + test_num_bad + "</td>" +
            "<td>" + avg_tcp_ack_dl_tot + "</td>" +
            "<td>" + avg_wireless_dt2_tot + "</td>" +
            "<td>" + avg_ltescrsrp_avg_tot + "</td>" +
            "<td>" + duration_tot + "</td></tr>";

    }
    $("#tab7_table tbody").html(rows);


    /*//当天该小区下用户数:1、小于等于3个; 2、大于3个;
    if (imsi.length > 3) {//随取一个列名判断有几行，即有几个用户

        //开始判断：
        var count = 0;
        var b = test_num_bad;//保留原有的，未排序过的。

        var plusBad = test_num_bad[0] + test_num_bad[1] + test_num_bad[2];

        var resultBad = 0;
        for (var i = 0; i < test_num_bad.length; i++) {
            resultBad += test_num_bad[i];
        }

        console.log("前三项的和为：" + plusBad + "，总和的大小：" + resultBad);

        if ((plusBad / resultBad) > 0.8) {
            for (var i = 0; i < 3; i++) {
                $("#tab7_table tbody tr").eq(i).children("td").css({"color": "#FF0000"});//大于3行，这3行全部显示红色
            }
        } else {
            $("#tab7_table tbody tr").children("td").css({"color": "#000000"});//小于等于3行时，这3行全部显示红色
        }

    } else {//1、小于等于3个(包括无用户？)
        $("#tab7_table tbody tr").children("td").css({"color": "#FF0000"});//小于等于3行时，这3行全部显示红色
    }*/

}

//8 告警表格
/**********************************
 * @funcname badCellAnalysis.GJCallBackTab8
 * @funcdesc 告警表格
 * @param {data} item (input optional) 回调的数据
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
badCellAnalysis.GJCallBackTab8=function badCellAnalysis_GJCallBackTab8(data) {
    var tableThead = "记录ID,接收时间,基站ID,BSC编码,是否断站退服,网络类型,厂家,BSC标志,地市,网元信息,网元类型,告警时间,是否断站,告警ID,告警排序,告警级别,告警码,告警位置,告警内容,告警文本,是否确认,告警网元IP,确认时间,确认人,是否过滤,是否显示,基站名称,断站类型,是否恢复,告警恢复时间,告警恢复ID,采集时间,告警自编码,采集接口IP,预留字段,告警范围,小区ID";
    //表格对象
    badCellAnalysis.GJtableObject = {
        divId: "tab8",
        tableId: "tab8_table",
        tableHead: tableThead,
        sortFlag: 0,
        Data: data
    };


//---------------------------------拼接表格对象----------------------------------------------
    badCellAnalysis.tableToolsGJ = new TableToolsNewTwo();
    badCellAnalysis.tableToolsGJ.submit(badCellAnalysis.GJtableObject);

}

//1_1 负荷情况具体指标折线图
/**********************************
 * @funcname callBackTab1_1_buildChart
 * @funcdesc 1_1 所有tab需要下钻的具体指标折线图
 * @param {result} item (input optional) 折线图需要使用的字段数据
 * @return {null}
 * @author 陈小芳
 * @create 20180704
 ***********************************/
function callBackTab1_1_buildChart(result) {
    //补横坐标缺失值，并将纵坐标赋0
    var xIndex = [];
    var yNumber=[]
    //这里将无数据的优良率和质差次数用“0”，替换。（是无数据！）
    var low_quality = [];//质差次数
    for (var i = 0; i < 24; i++) {
        xIndex.push(i);
        low_quality[i]={"value":0,"low_quality_rate":0,"low_quality_count":0,"color":"white"};
        yNumber[i]=0;
    }
    badCellAnalysis.unit = "";
    for (var i = 0; i < result.length; i++) {
        if (noceUtil.isUndefined(result[i])) {
            result[i] = 0;
        }
        var hour = subHour(result[i].hour);
        var tr=badCellAnalysis.clickTrIndex;

        //1负荷情况
        if (badCellAnalysis.distriOptionIndex == 0) {
            var cData=["dw_prb_userate|%","up_prb_userate|%","pdcch_ocprate|%","prach_ocprate|%",
                "counter0003|次数","counter0053|次数","counter0077|次数","counter0013|次数","pag_ocprate|%"];
            var data=cData[tr].split("|");
            yNumber[hour]=dataIsNull(result[i][data[0]]) ? 0 : result[i][data[0]];
            badCellAnalysis.unit=data[1];
        }else if(badCellAnalysis.distriOptionIndex == 1){//空口指标
            var cData=[
                "rrccon_succrate|%","rrccon_fail_uenor|次数","rrccon_fail_cellrj|次数","rrccon_fail_oth|次数",
                "rrccon_rbrate|%","ue_drop_rate|%","ue_nrls_rate|次数","ue_anrls_rate|次数",
                "erab_req|次数","erab_succ|次数","erab_succ_rate|%","erab_fail_uenor|次数",
                "erab_fail_core|次数","erab_fail_tl|次数","erab_fail_wl|次数","erab_fail_wrlack|次数",
                "erab_fail_smfail|次数","erab_fail_oth|次数","erab_nrls|次数","erab_anrls|次数",
                "erab_drop_rate|%","erab_anrls_core|次数","erab_anrls_tl|次数","erab_anrls_netcong|次数",
                "erab_anrls_wl|次数","erab_anrls_swfail|次数","ests1_succ_rate|%","ests1_att|次数",
                "ests1_succ|次数","swchx2_succ_rate|%","counter0111|次数","counter0110|次数",
                "swchs1_succ_rate|%","counter0109|次数","counter0108|次数","swchsf_succ_rate|%",
                "counter0157|次数","counter0156|次数","swchaf_succ_rate|%","counter0160|次数",
                "counter0159|次数","counter0151|次数","counter0193|次数","counter0154|次数",
                "counter0196|次数","swchenin_succ_rate|%","swchenmu_succ_rate|%"
            ];
            var data=cData[tr].split("|");
            yNumber[hour]=dataIsNull(result[i][data[0]]) ? 0 : result[i][data[0]];
            badCellAnalysis.unit=data[1];
        }else if(badCellAnalysis.distriOptionIndex == 3){//干扰
            var cData=[
                "rssi_avg|dBm","counter0270|dBm","counter0271|dBm"
            ];
            var data=cData[tr].split("|");
            yNumber[hour]=dataIsNull(result[i][data[0]]) ? 0 : result[i][data[0]];
            badCellAnalysis.unit=data[1];
        }else if(badCellAnalysis.distriOptionIndex == 4){//空口感知情况
            var cData=[
                "pdch_flow|MB","pdch_dwflow|MB","pdch_upflow|MB","userex_upavgrate|Mbps",
                "userex_dwavgrate|Mbps","user_avgdelay|ms","aidw_packloss_rate|%"
            ];
            var data=cData[tr].split("|");
            yNumber[hour]=dataIsNull(result[i][data[0]]) ? 0 : result[i][data[0]];
            badCellAnalysis.unit=data[1];
        }

        var low_quality_count=0;//质差次数
        var low_quality_Rate=0;//质差优良率
        var color = "white";//颜色
        if(badCellAnalysis.goodRateHow==0){//首屏
            low_quality_count=result[i]["first_screen_all"];
            low_quality_Rate=result[i]["first_screen_rate"];
        }else if(badCellAnalysis.goodRateHow==1){//视频下载
            low_quality_count=result[i]["vidio_download_rate_all"];
            low_quality_Rate=result[i]["vidio_download_rate"];
        }else if(badCellAnalysis.goodRateHow==2){//视频卡顿
            low_quality_count=result[i]["video_halt_all"];
            low_quality_Rate=result[i]["video_halt_rate"];
        }else if(badCellAnalysis.goodRateHow==3){//即时消息
            low_quality_count=result[i]["im_send_all"];
            low_quality_Rate=result[i]["im_send_rate"];
        }else if(badCellAnalysis.goodRateHow==4){//游戏
            low_quality_count=result[i]["game_all"];
            low_quality_Rate=result[i]["game_rate"];
        }
        if (low_quality_Rate < 60 || low_quality_Rate == 60) {//60%以下
            color = '#800000';
        }
        if (low_quality_Rate < 70 && low_quality_Rate > 60) {//60~70%以下
            color = '#ff0000';
        }
        if (low_quality_Rate < 80 && low_quality_Rate > 70 || low_quality_Rate == 70) {//70%-80%
            color = '#ff9900';
        }
        if (low_quality_Rate < 90 && low_quality_Rate > 80 || low_quality_Rate == 80) {//80%-90%
            color = '#ffff00';
        }
        if (low_quality_Rate > 90 || low_quality_Rate == 90) {//90%以上
            color = '#53ff1a';
        }
        low_quality[hour]={"value":low_quality_count,"low_quality_rate":low_quality_Rate,"low_quality_count":low_quality_count,"color":color};
    }


    //绑定数据开始初始画图
    if(badCellAnalysis.downLineBar==null){
        badCellAnalysis.downLineBar = echarts.init(document.getElementById('bad_detailLine'));
    }else{
        badCellAnalysis.downLineBar.dispose();
        badCellAnalysis.downLineBar = echarts.init(document.getElementById('bad_detailLine'));
    }
    var chartContainer = $("#bad_detailLine");
    /*chartContainer[0].style.width = "1020px";
    chartContainer[0].style.height = "300px";*/
    badCellAnalysis.distriOption.xAxis[0].data = xIndex; //指标名称
    badCellAnalysis.distriOption.series[0].data = yNumber;  //折线图数值
    badCellAnalysis.distriOption.series[1].data = low_quality;  //质差次数
    badCellAnalysis.distriOption.legend.data = [badCellAnalysis.lineLegend, '总次数'];
    badCellAnalysis.distriOption.series[0].name = badCellAnalysis.lineLegend;  //折线图的名称
    badCellAnalysis.distriOption.yAxis[0].name = badCellAnalysis.unit;//折线图的单位
    badCellAnalysis.distriOption.yAxis[1].name = '总次数';
    badCellAnalysis.downLineBar.setOption(badCellAnalysis.distriOption);
    /*$("#bad_detailLine").show();*/
}

//数组升序排序
badCellAnalysis.sortByKey=function badCellAnalysis_sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = Number(a[key]);
        var y = Number(b[key]);
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
}

function calculateRate(dataItem, dataSum) {
    if (dataIsNull(dataItem) || dataIsNull(dataSum)) {
        return 0;
    } else {
        if (0.0 == parseFloat(dataSum)) {
            return 0;
        } else {
            return ((parseFloat(dataSum) - parseFloat(dataItem)) * 100 / dataSum).toFixed(2);
        }
    }
}

/**
 * @ description 计算某一数据的百分比
 * @param data 数据
 * @returns 若数据不为空，则将数据转化为浮点型数据再乘以100去两位小数返回，否则返回'NULL'
 */
function dataMultiply100(data) {
    if (dataIsNull(data)) {
        return 'NULL';
    } else {
        return (parseFloat(data) * 100).toFixed(2);
    }
}

/**
 * 处理浮点型数据，若有数据则保留两位小数，否则为0.00
 * @param data
 * @returns
 */
function dealFloatData(data) {
    if (dataIsNull(data)) {
        return 'NULL';
    } else {
        return parseFloat(data).toFixed(2);
    }
}

/**
 * 处理整型数据，单位为次数的数据，而不是数字如0或1代表异常或正常的数据。
 * @param data
 * @returns
 */
function dealIntData(data) {
    if (dataIsNull(data)) {
        return 'NULL';
    } else {
        return parseInt(data);
    }
}



/**
 * 从年月日时中截取小时，并且时间小于10时，前面不填充0
 * @param date 传入的数据，格式如：2017020201
 */
function subHour(date) {
    if (null == date || date.length == 0) {
        return;
    }
    var hour = date.substring((date.length - 2), date.length);
    var zeroIndex = hour.substring(0, 1);
    var formatedHour = 0;
    if ("0" == zeroIndex) {//小时的值小于10
        formatedHour = parseInt(hour.substring(1, hour.length));
    } else {
        formatedHour = parseInt(hour);
    }
    return formatedHour;
}

//判断数据是否为空
function dataIsNull(data) {
    if (data == null || data == 'null' || data == 'NULL' || data == "" || data == undefined || data == "undefined") {
        return true;
    } else {
        return false;
    }
}

//按照dataKey封装为对象数据，为null的显示NULL
function callBackSplice(dataValue, dataKey) {
    var dataObj = {};
    if (dataIsNull(dataValue)) {
        var dataArray = []
        for (var i = 0; i < dataKey.length; i++) {
            dataArray[i] = 'NULL';
            dataObj[dataKey[i]] = dataArray[i];
        }
    } else {
        var dataArray = dataValue.split("|");
        for (var i = 0; i < dataArray.length; i++) {
            if (dataArray[i] == null || dataArray[i] == 'null' || dataArray[i] == "NULL") {
                dataArray[i] = 'NULL';
            }
            dataObj[dataKey[i]] = dataArray[i];
        }
    }


    return dataObj;

}

/**
 * 根据传入的参数判断情况是否正常，1：正常，0：异常
 * @param num 传入的参数 ，0，或者1
 * @returns 若传入的是1，返回'正常'，否则返回'异常'
 */
function judgeIsNormal(num) {
    if (1 == num || '1' == num) {
        return "正常";
    } else if (0 == num || '0' == num) {
        return "异常";
    } else {
        return 'NULL';
    }
}

/**
 * @funcName formatDate
 * @descript 格式化日期为带横线分隔符"-"的形式
 * @param date 传入的日期 格式为:yyyyMMdd
 * @returns {String} 格式化后的日期，如2017-09-01
 */
function formatDate(date) {
    var formatedDate = "";
    if (date != null && date != undefined) {
        var year = date.substring(0, 4);
        var month = date.substring(4, 6);
        var day = date.substring(6, 8);
        formatedDate = year + "-" + month + "-" + day;
        return formatedDate;
    } else {
        return formatedDate;
    }
}


/**
 * 处理返回数据在有数据时为对应数据，没数据时为null字符串的情况，在有数据时返回原数据，无数据时返回拼接了指定个数null的字符串
 * @param data
 * @param fillLength
 */
function spliceNull(data, fillLength) {
    if (data == null || data == 'null' || data == "NULL") {
        var nullStr = '';
        if (fillLength != undefined && fillLength != null) {
            for (var i = 0; i < fillLength; i++) {
                if (i != fillLength) {
                    nullStr += "NULL|";
                } else {
                    nullStr += "NULL";
                }
            }
        }
        return nullStr;
    } else {
        return data;
    }
}


/**
 * @funName
 * @description 拼接Hbase请求参数
 * @param startDate 起始日期
 * @param endDate 结束日期
 * @param cellId 小区ID
 * @param eNodeBid 基站id
 * @returns {Array}
 */
function spliceHbaseQueryParam(startDate, endDate, cellId, eNodeBid) {
    var dateArr = enumerateDays(startDate, endDate);
    var paramList = [];
    if (dateArr.length > 0) {
        for (var i = 0; i < dateArr.length; i++) {
            var day = dateArr[i];
            console.log("获取出的日期：" + day);
            var param = day + "_" + eNodeBid + "_" + cellId;
            paramList.push(param);
        }
    }
    return paramList;
}

/**
 * @description 从传入的数据中截取日期中的月份
 * @param date
 * @returns 截取到的月份分
 */
function getMonthFromDate(date) {
    return date.substring(4, 6);
}



//tab表格下钻后画折线图
badCellAnalysis.distriOption = {
    title: {
        text: '',
        y: '10',
        x: 'center',
        textStyle: {
            fontSize: 16,
            color: '#ff944d'
        }
    },
//		    calculable : true,
    legend: {
        data: []//不在这里定义了，会出现第一个找不到的情况
    },
    grid: {
        containLabel: false,
        // bottom: '3%',
        left: '5%',
        right: '5%'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            return params[0].name +"时"+ "<br/>"+
                params[0].seriesName +":"+params[0].value +badCellAnalysis.unit+"<br/>"+
                "总次数："+ params[1].data.value + "<br/>"+
                "优良率："+ params[1].data.low_quality_rate +"%"+ "<br/>";
        }

    },
    xAxis: [
        {
            name: '',
            type: 'category',
//		            boundaryGap : false,
//		            axisLine: {onZero: false},
            data: []//xIndex
        }
    ],
    yAxis: [

        {
//					 min:0,
            type: 'value',
            name: '',
//		            silent:true,
//		            yAxisIndex: 0,
            splitLine: {
                show: false,
            },
        },
        {
            type: 'value',
//		            silent:true,
            name: '总次数',
//		            yAxisIndex: 1,
            splitLine: {
                show: true,
            },
        }

    ],
    series: [
        {
            name: '',
            type: 'line',
            yAxisIndex: 0,
//		            symbol:'none',
            itemStyle: {
                normal: {
                    color: '#199ED8',
                    lineStyle: {
                        color: '#199ED8'
                    }
                }
            },

            data: []//yNumber
        },
        {
            name: '总次数',
            type: 'bar',
            yAxisIndex: 1,
            data: [],//质差次数
            itemStyle: {
                normal: {
                    color: function (params) {
                        return params.data.color;
                    },
                    label: {show: false}
                }
            },
        }
    ]
};

//画折线图2 繁忙度折线图
badCellAnalysis.distriOption_2 = {
    title: {
        text: '',
        x: 'center',
        textStyle: {
            fontSize: 16,
            color: '#ff944d'
        }
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            if (badCellAnalysis.distriOptionIndex == 0 || badCellAnalysis.distriOptionIndex == 1 || badCellAnalysis.distriOptionIndex == 3 || badCellAnalysis.distriOptionIndex == 4) {
                if (!noceUtil.isUndefined(params[0])) {//避免悬浮在最大值的水滴上时Undefined出错
                    return params[0].dataIndex + '<br/>'
                        + params[0].seriesName + ' : ' + params[0].value + badCellAnalysis.unit + '<br/>';
                }

            } else {
                if (!noceUtil.isUndefined(params[0])) {//避免悬浮在最大值的水滴上时Undefined出错
                    return params[0].name + '<br/>'
                        + params[0].seriesName + ' : ' + params[0].value + '<br/>';
                }

            }

        }
    },
    dataZoom: {
        show: true,
        realtime: true,
        start: 0,
        end: 100
    },
    grid: {
        containLabel: false,
        // bottom: '3%',
        left: '5%',
        right: '1%'
    },
    xAxis: [
        {
            name: '分钟',
            type: 'category',
            boundaryGap: false,
            axisLine: {onZero: false},
            data: []//xIndex
        }
    ],
    yAxis: [
        {
            name: '人',
            type: 'value'

        }
    ],
    series: [
        {
            name: '人数',
            type: 'line',
            symbol: 'none',
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: '#ff944d'
                    }
                }
            },
            data: [],//yNumber
            markPoint: {
                data: [{type: 'max', name: '最大值'}],
                itemStyle: {
                    normal: {
                        color: '#ff944d'
                    }
                },
            },
            markLine: {
                label: {
                    normal: {
                        show: true,
                        position: 'middle',
                        formatter: function (params) {
                            return "人数超过40的记录有：" + badCellAnalysis.pointCount;
                        }
                    }
                },
                lineStyle: {
                    normal: {
                        type: 'dotted',
                        color: '#ff1a1a'
                    }
                },
                data: [
                    {yAxis: 40}
                ]

            }
        }
    ]
};

//画柱状图 覆盖质量第一个柱形图
badCellAnalysis.barOption = {
    title: {
        text: '',
        x: 'center',
        textStyle: {
            fontSize: 16,
            color: '#00e673'
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    calculable: true,
    grid: {
        containLabel: true,
        bottom: '20%',
        left: '1%',
        right: '1%'
    },
    xAxis: [
        {
            type: 'category',
            axisLabel: {
                show: true,
                align:'right',
                interval: 0,
                rotate: 35
            },
            data: ["CQI0上报次数", "CQI1上报次数", "CQI2上报次数", "CQI3上报次数", "CQI4上报次数", "CQI5上报次数", "CQI6上报次数", "CQI7上报次数", "CQI8上报次数", "CQI9上报次数", "CQI10上报次数", "CQI11上报次数", "CQI12上报次数", "CQI13上报次数", "CQI14上报次数", "CQI15上报次数"]
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '次数',
            type: 'bar',
            symbol: 'none',
            data: [],
            itemStyle: {normal: {color: '#00e673', label: {show: false}}},
        }
    ]
};

//画柱状图2 覆盖第二个柱形图
badCellAnalysis.barOption_2 = {
    title: {
        text: '',
        x: '250',
        y: '40',
        subtext: "                 （大于5000米异常）",
        textStyle: {
            fontSize: 16,
            color: '#00e673'
        },
        subtextStyle: {
            align: 'rigth',
            baseline: 'top',
            fontSize: 12,
            color: '#ff1a1a',
        }

    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            var seriesIndex=badCellAnalysis.seriesIndex[params[0].dataIndex];
            if(seriesIndex=="-"){
                return "<div style='text-align:left'>" +
                    '  覆盖距离:' + params[0].name + '米' + '<br/>'
                    + 'RSRP: ' + params[0].data.rsrp + '<br/>'
                    + '测试次数: ' + params[0].data.value + '<br/>' +
                    "</div>";
            }else{
                return "<div style='text-align:left'>" +
                    '  覆盖距离:' + params[seriesIndex].name + '米' + '<br/>'
                    + 'RSRP: ' + params[seriesIndex].data.rsrp + '<br/>'
                    + '测试次数: ' + params[seriesIndex].data.value + '<br/>' +
                    "</div>";
            }
        }
    },
    legend: {
        data:['x<-119无覆盖','-119<=x<-115','-115<=x<-105','','-105<=x<-95','-95<=x<-85','-85<=x']
    },
    grid: {
        containLabel: false,
        // bottom: '3%',
        left: '4%',
        right: '1%'
    },
    // calculable: true,
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                show: true,
                interval:2,
                rotate: 80,
                margin: 5
            },
            data: [],
        }
    ],
    yAxis: [
        {
            type: 'value'
        }

    ],
    series: [

        {
            name: 'x<-119无覆盖',
            type: 'bar',
            stack: '测试次数',
            symbol: 'none',
            itemStyle: {
                normal: {
                    color:'red'
                },
                label: {show: false}
            },
            data: []
        },
        {
            name: '-119<=x<-115',
            type: 'bar',
            stack: '测试次数',
            symbol: 'none',
            itemStyle: {
                normal: {
                    color:'#ff6600'
                },
                label: {show: false}
            },
            data: []
        },
        {
            name: '-115<=x<-105',
            type: 'bar',
            stack: '测试次数',
            symbol: 'none',
            itemStyle: {
                normal: {
                    color:'#ff9900'
                },
                label: {show: false}
            },
            data: []
        },
        {
            name: '-105<=x<-95',
            type: 'bar',
            stack: '测试次数',
            symbol: 'none',
            itemStyle: {
                normal: {
                    color:'yellow'
                },
                label: {show: false}
            },
            data: []
        },
        {
            name: '-95<=x<-85',
            type: 'bar',
            stack: '测试次数',
            symbol: 'none',
            itemStyle: {
                normal: {
                    color:'#99e699'
                },
                label: {show: false}
            },
            data: []
        },
        {
            name: '-85<=x',
            type: 'bar',
            stack: '测试次数',
            symbol: 'none',
            itemStyle: {
                normal: {
                    color:'green'
                },
                label: {show: false}
            },
            data: []
        }
    ]
};



//无效数据置为0
function formatValue(value){
    if(dataIsNull(value)){
        return 0;
    }else{
        return value;
    }
}

//无效数组置为空''
function formatArray(value) {
    if(!noceUtil.isUndefined(value)&&value!='NULL'&&value!='null'&&value!='undefined'){
        return value;
    }
    return '';
}

// value---td的值，threshold---门限值
function getTdColor(value,threshold) {
    var color="";
    if(value=="NULL"){
        color="greyColor";
    }else{
        color="normal";
    }
    if(threshold==1 || threshold=="1"){
        color="green";
    }else if(threshold==0 || threshold=="0"){
        color="red";
    }

    return color;
}

function  valueRate(value){
    if(dataIsNull(value)){
        return 'NULL';
    }else{
        return value+"%";
    }
}

//将横坐标转化为00:00格式的“单个”方法
function minConvertor(min) {
    var str = String(min);
    var len = str.length;
    var attach = 4 - len;

    var left = '';
    for (var i = 0; i < attach; i++) {
        left += '0';
    }
    var s = left + str;
    var result = s.substring(0, 2) + ':' + s.substring(2, 4);
    return result;
}

// 获取开始日期至结束日期中所有的日期
function getDates(startDay, endDay) {
    var dateArr=[];
    // 获取入参字符串形式日期的Date型日期
    var d1 = new Date(startDay);
    var d2 = new Date(endDay);

    // 定义一天的毫秒数
    var dayMilliSeconds  = 1000*60*60*24;

    // 获取输入日期的毫秒数
    var d1Ms = d1.getTime();
    var d2Ms = d2.getTime();

    // 定义返回值
    var ret;

    // 对日期毫秒数进行循环比较，直到d1Ms 大于等于 d2Ms 时退出循环
    // 每次循环结束，给d1Ms 增加一天
    for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
        // 将给的毫秒数转换为Date日期
        var day = new Date(d1Ms);

        // 获取其年月日形式的字符串
        ret = day.format('yyyyMMdd');

        /*// 如果ret为空，则无需添加","作为分隔符
        if (!ret) {
            // 将给的毫秒数转换为Date日期
            var day = new Date(d1Ms);

            // 获取其年月日形式的字符串
            ret = day.format('yyyyMMdd');
        } else {

            // 否则，给ret的每个字符日期间添加","作为分隔符
            var day = new Date(d1Ms);
            ret = ret + ',' + day.format('yyyyMMdd');
        }*/
        dateArr.push(ret);
    }
    return dateArr;

}

//获取两个时间间隔的天数
function getDays(startDay, endDay){
    var s1 = new Date(startDay);
    var s2 = new Date(endDay);
    var days = s2.getTime() - s1.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    return day;
}




function list1_1KeyList(){
    var res;
    var timeId=badCellAnalysis.timeId;
    var eNodebId=badCellAnalysis.eNodeBId;
    var cellId=badCellAnalysis.cellId;
    for(var i=0;i<24;i++){
        var minutes="00";
        if(i<10){
            minutes="0"+i;
        }else{
            minutes=i;
        }
        if(!res){
            res=timeId+minutes+"_"+eNodebId+"_"+cellId;
        }else{
            res=res+","+timeId+minutes+"_"+eNodebId+"_"+cellId;
        }

    }
    return res;
}


















