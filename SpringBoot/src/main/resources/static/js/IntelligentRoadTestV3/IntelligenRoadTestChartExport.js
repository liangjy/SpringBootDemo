var IntelligentRoadTestChartExport = {};


/**********************************
 * @funcname tableExport
 * @funcdesc 调用导出组件
 * @param fileName:导出的文件名
 * @param sheetName:excel文件的sheet名
 * @param templateId:sql模版id
 * @param titleName:导出的excel表头
 * @param list:sql查询条件
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/26 0:38
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTestChartExport.tableExport = function IntelligentRoadTestChartExport_tableExport(fileName,sheetName,templateId,titleName,list) {
    var obj={
        fileName:fileName,
        dataType:3,
        paraLists:[
            {
                sheetName:sheetName,
                titleName:titleName,
                mergeTitle:[],
                templateId:templateId,
                templatePara:list,
            },
        ],
    };
    var exportExcel=new exportExcelNew(obj);
    exportExcel.submit();
}

/**********************************
 * @funcname sectorTableExport
 * @funcdesc 扇区导出
 * @param IntelligentRoadTestChart: IntelligentRoadTestChart对象
 * @param city: 城市
 * @param country: 区县
 * @param mktcenter: 营服
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/25 20:10
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChartExport.poorAreaTableExport = function IntelligentRoadTestChartExport_poorAreaTableExport(IntelligentRoadTestChart,city,country,mktcenter) {

    var list = ["DAY:"+IntelligentRoadTestChart.endDay,"CITY:"+city];

    if(country != ""){
        list.push("COUNTRY:"+"and COUNTRY = '"+country+"'");
    }

    // var fileName = city+"("+country+"_"+mktcenter+")" + "弱覆盖区域";
    var fileName =city+ "弱覆盖区域";

    if(country != ""){
        fileName = city+"("+country+")" + "弱覆盖区域";
    }
    if(mktcenter != ""){
        fileName =  city+"("+country+"_"+mktcenter+")" + "弱覆盖区域";
    }

    var sheetName = mktcenter+"弱覆盖区域";
    if(mktcenter != ""){

        list.push("MKTCENTER:"+"and MKTCENTER = '"+mktcenter+"'");
    }

    var templateId ="IntelligentRoadTest_09_03_areaTableExport";
    var titleName = ["弱区编号","地市","区县","营服中心","最近站址",
        "最近基站ID","最近小区ID","最近小区名","最近小区状态","最近TOP5小区集","MR数最大TOP5小区集","退服告警数","退服告警小区数","未恢复退服告警小区数",
        "建议处理措施","是否派单","4G切3G总次数","4G切3G总次数排名","4G总流量(MB)","4G流量排名","4G用户数","4G用户数排名","感知优良率(%)","感知优良率排名",
        "弱栅格数","弱栅格数排名","弱栅格面积(㎡)","栅格总面积(㎡)","中心点区域归属ID",
        "最终排名累计","日期","工单号"];

    //调用导出组件
    IntelligentRoadTestChartExport.tableExport(fileName,sheetName,templateId,titleName,list);

}

/**********************************
 * @funcname concernAreaTableExport
 * @funcdesc 关注区域导出
 * @param IntelligentRoadTestChart: IntelligentRoadTestChart对象
 * @param city: 城市
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/25 20:22
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChartExport.concernAreaTableExport = function IntelligentRoadTestChartExport_concernAreaTableExport(IntelligentRoadTestChart,city) {

    var list = ["CITY:"+city];

    var fileName =city+ "关注区域";

    var sheetName = city+"关注区域";

    var templateId ="IntelligentRoadTest_18_allConcernArea_export_02";
    var titleName = ["编号","名称","类型","创建者","创建时间","地市","调优日志","rsrp均值","覆盖率","最近基站id","最近小区id","最近小区名称"];

    //调用导出组件
    IntelligentRoadTestChartExport.tableExport(fileName,sheetName,templateId,titleName,list);
}

/**********************************
 * @funcname sectorTableExport
 * @funcdesc 扇区表格导出
 * @param IntelligentRoadTestChart: IntelligentRoadTestChart对象
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/25 21:26
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChartExport.sectorTableExport = function IntelligentRoadTestChartExport_sectorTableExport(IntelligentRoadTestChart) {

    var list = [];
    var city = IntelligentRoadTestChart.mapCity;
    list.push("DAY:"+IntelligentRoadTestChart.endDay);
    list.push("CITY:"+IntelligentRoadTestChart.mapCity);
    // list.push("COUNTRY:"+IntelligentRoadTestChart.mapDistrict);

    // var fileName =city + "(" + IntelligentRoadTestChart.mapDistrict + ")" + "扇区";
    var fileName =city + "扇区";

    var sheetName = fileName;

    var templateId ="IntelligentRoadTestAnalysisV2_3_171_cellTableExport";
    var titleName = ["地市名称","地市ID","区县","区县ID","营服中心","营服中心ID","基站ID","基站名称","小区ID","小区名称",
        "中心点区域归属ID","覆盖范围内栅格数","弱覆盖区域数","附近弱覆盖区域集合","附近弱覆盖区域数","4G切3G总次数","4G总流量",
        "感知优良率按天平均值","4G用户数按天平均值","曾发生退服告警总次数","小区的服务状态","基站小区处理级别","预测位置相差距离",
        "坐标勘误优先值","支持的MR条数","设备厂商","最终排名累计值","方位角","频段映射","是否室内","机械下倾",
        "电子下倾","天线挂高","验收状况","基站站址","day","栅格颗粒度类型"];

    //调用导出组件
    IntelligentRoadTestChartExport.tableExport(fileName,sheetName,templateId,titleName,list);
}

/**********************************
 * @funcname alarmTableExport
 * @funcdesc 工单导出
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018/01/29 0029 17:07
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChartExport.alarmTableExport = function IntelligentRoadTestChartExport_alarmTableExport(IntelligentRoadTestChart) {

    var city = IntelligentRoadTestChart.mapCity;
    city='and city=\''+city+'\'';
    // var fileName =city + "(" + IntelligentRoadTestChart.mapDistrict + ")" + "扇区";

    var list = ["alarm_info_V2", "ENDTIME:" + IntelligentRoadTestChart.endDay, "CITY:" + city, "ALARM_ID:" + ''];
    var sqlList = [list];
    var funcList = [IntelligentRoadTestChartExport.dealAlarmInfoData];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database ,null,null,null,null,false,['Alarms']);

}
/**********************************
 * @funcname dealAlarmInfoData
 * @funcdesc 拼接数据，导出工单表格数据
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018/01/29 0029 18:02
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChartExport.dealAlarmInfoData = function IntelligentRoadTestChartExport_dealAlarmInfoData(data) {
    var result = data.result;

    var newData = {};
    var columns = ["地市","弱区ID","工单标识","工单类型","工单单号","工单等级","创建时间","是否恢复","恢复时间","工单状态","派单时间","结单时间","工单内容"];
    var tableData = [];
    for(var i = 0 ; i < result.length ; i++){
        tableData[i] = [result[i][0],result[i][1],result[i][2],result[i][3],result[i][4],result[i][5],result[i][6],result[i][7],result[i][8],
            result[i][9],result[i][10],result[i][11],result[i][12]];
    }

    newData.columns = columns;
    newData.tableData = tableData;

    var fileName =IntelligentRoadTestChart.mapCity + "工单";

    var sheetObj = new sheet(newData.columns,newData.tableData,"sheet1");
    exportExcelUtil.exportExcelByList(fileName,sheetObj);
}

/**********************************
 * @funcname DTListTableExport
 * @funcdesc dt表格导出
 * @param IntelligentRoadTestChart: IntelligentRoadTestChart对象
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/25 21:37
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChartExport.DTListTableExport = function IntelligentRoadTestChartExport_DTListTableExport(IntelligentRoadTestChart) {

    var list = [];

    var city = IntelligentRoadTestChart.mapCity;

    list.push("CITY: and city = '"+city+"'");

    var fileName =city + "dt";

    var sheetName = fileName;

    var templateId ="IntelligentRoadTest_18_dtTableList_export";
    var titleName = ["编号","路测名称","路测时间","上传成功时间","上传者","地市"];

    //调用导出组件
    IntelligentRoadTestChartExport.tableExport(fileName,sheetName,templateId,titleName,list);
}

/**********************************
 * @funcname boneAreaTableExport
 * @funcdesc 骨头区域表格导出
 * @param IntelligentRoadTestChart: IntelligentRoadTestChart对象
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/26 0:26
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChartExport.boneAreaTableExport = function IntelligentRoadTestChartExport_boneAreaTableExport(IntelligentRoadTestChart) {

    var list = [];
    var city = IntelligentRoadTestChart.mapCity;
    list.push("DAY:"+IntelligentRoadTestChart.endDay.substr(0,IntelligentRoadTestChart.endDay.length-2));
    list.push("CITY:"+IntelligentRoadTestChart.mapCity);
    // list.push("COUNTRY:"+IntelligentRoadTestChart.mapDistrict);

    var fileName =city + "骨头区域";

    var sheetName = fileName;

    var templateId ="IntelligentRoadTestAnalysisV2_3_176_BONE_AREA_M_tableExport";
    var titleName = ["区域ID","地市名称","地市ID","区县","区县ID","营服中心","营服中心ID","中心点区域归属ID","主服务小区集合",
        "4G切3G总次数","4G切3G总次数在本地网内排名","4G总流量","本地网内4G流量排名","感知优良率按天平均值",
        "本地网内感知优良率排名","4G用户数按天平均值","本地网内4G用户数排名","弱覆盖区域的弱覆盖栅格数",
        "弱覆盖区域的弱覆盖栅格数排名","最终排名累计值","弱覆盖最近基站名称","弱覆盖最近基站地址",
        "弱覆盖最近的基站ID","弱覆盖最近的小区ID","弱覆盖最近的小区的名称","RSRP总和","RSRP记录数","RSRP均值",
        "大于等于-105记录数","大于等于-105记录数","覆盖率","区域名称","区域类型","区域来源类型","是否缓期处理",
        "缓期原因","创建人","创建时间","最近小区集合","月份"];

    //调用导出组件
    IntelligentRoadTestChartExport.tableExport(fileName,sheetName,templateId,titleName,list);
}

/**********************************
 * @funcname macSectorTableExport
 * @funcdesc 宏扇区表格导出
 * @param IntelligentRoadTestChart: IntelligentRoadTestChart对象
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/26 0:29
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChartExport.macSectorTableExport = function IntelligentRoadTestChartExport_macSectorTableExportExport(IntelligentRoadTestChart) {

    var list = [];
    var city = IntelligentRoadTestChart.mapCity;
    list.push("DAY:"+IntelligentRoadTestChart.endDay);
    list.push("CITY:"+IntelligentRoadTestChart.mapCity);
    // list.push("COUNTRY:"+IntelligentRoadTestChart.mapDistrict);
    list.push("PRED_DISTANCE:AND PRED_DISTANCE>1000");

    var fileName =city + "扇区数据表";

    var sheetName = fileName;

    var templateId ="IntelligentRoadTestAnalysisV2_3_171_cellTableExport";
    var titleName = ["地市名称","地市ID","区县","区县ID","营服中心","营服中心ID","基站ID","基站名称","小区ID","小区名称",
        "中心点区域归属ID","覆盖范围内栅格数","弱覆盖区域数","附近弱覆盖区域集合","附近弱覆盖区域数","4G切3G总次数","4G总流量",
        "感知优良率按天平均值","4G用户数按天平均值","曾发生退服告警总次数","小区的服务状态","基站小区处理级别","预测位置相差距离",
        "坐标勘误优先值","支持的MR条数","设备厂商","最终排名累计值","方位角","频段映射","是否室内","机械下倾",
        "电子下倾","天线挂高","验收状况","基站站址","day","栅格颗粒度类型"];

    //调用导出组件
    IntelligentRoadTestChartExport.tableExport(fileName,sheetName,templateId,titleName,list);
}

/**********************************
 * @funcname gaosuTableExport
 * @funcdesc 高速高铁市政路表格导出
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/26 10:48
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChartExport.gaosuGaotieShizhengluTableExport = function IntelligentRoadTestChartExport_gaosuGaotieShizhengluTableExport(IntelligentRoadTestChart,type,areaType) {

    var list = [];
    var city = IntelligentRoadTestChart.mapCity;
    list.push("DAY:"+IntelligentRoadTestChart.endDay);
    list.push("CITY:"+IntelligentRoadTestChart.mapCity);
    // list.push("COUNTRY:"+IntelligentRoadTestChart.mapDistrict);
    list.push("TYPE:" + type);

    var fileName =city + areaType +  "数据表";

    var sheetName = fileName;

    var templateId ="IntelligentRoadTestAnalysisV2_3_166_WUGAO_tableExport";
    var titleName = ["弱覆盖片区编号","地市名称","地市ID","区县","区县ID","营服中心","营服中心ID","中心点区域归属ID",
        "主服务小区集合","4G切3G总次数","4G切3G总次数在本地网内排名","4G总流量","本地网内4G流量排名",
        "感知优良率按天平均值","本地网内感知优良率排名","4G用户数按天平均值","本地网内4G用户数排名","最终排名累计值",
        "弱覆盖处理措施","弱覆盖最近基站名称","弱覆盖最近基站地址","基站ID","弱覆盖区域的弱覆盖栅格数","曾发生退服告警总次数",
        "曾发生退服告警小区数","未恢复退服告警小区数","弱覆盖区域的全部栅格数","弱覆盖区域的弱覆盖栅格数排名","弱覆盖区域的弱栅格的面积",
        "弱覆盖区域的全部栅格的面积","弱覆盖最近的小区ID","弱覆盖最近的小区的名称","弱覆盖最近的小区的状态","距离最近的TOP5的小区集合",
        "电信RSRP均值最大频点记录数","电信大于等于-105记录数","电信RSRP均值最大频点的所有RSRP之和","移动RSRP均值最大频点的非空RSRP记录数",
        "移动大于等于-105记录数","移动RSRP均值最大频点RSRP之和","联通RSRP均值最大频点记录数","联通大于等于-105记录数",
        "联通RSRP均值最大频点RSRP之和","关联月份","场景类型","最近小区告警数","线路ID","线路名称","day","栅格颗粒度类型","类型"];

    //调用导出组件
    IntelligentRoadTestChartExport.tableExport(fileName,sheetName,templateId,titleName,list);
}
/**********************************
 * @funcname ditieTableExport
 * @funcdesc 地铁表格导出
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/26 11:14
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChartExport.ditieTableExport = function IntelligentRoadTestChartExport_ditieTableExport(IntelligentRoadTestChart) {

    var list = [];
    var city = IntelligentRoadTestChart.mapCity;
    list.push("DAY:" + IntelligentRoadTestChart.endDay);
    list.push("CITYID:" + noceUtil.city_LATN_ID[IntelligentRoadTestChart.mapCity]);

    var fileName =city + "地铁数据表";

    var sheetName = fileName;

    var templateId ="IntelligentRoadTestAnalysisV2_3_181_WUGAO_METRO_tableExport";
    var titleName = ["地市ID","源地铁站ID","下一地铁站ID","地铁分段ID","地铁线路标识","TA分段级别","移动RSRP[-140，0)记录数",
        "移动RSRP[-115，0)记录数","移动RSRP[-110，0)记录数","移动RSRP[-105，0)记录数","移动RSRP[-100，0)记录数",
        "移动RSRP[-95，0)记录数","移动RSRP[-140，0)之和","移动RSRP[-115，0)之和","移动RSRP[-110，0)之和",
        "移动RSRP[-105，0)之和","移动RSRP[-100，0)之和","移动RSRP[-95，0)之和","移动RSRP[-140，0)平均值",
        "移动RSRP[-115，0)平均值","移动RSRP[-110，0)平均值","移动RSRP[-105，0)平均值","移动RSRP[-100，0)平均值",
        "移动RSRP[-95，0)平均值","联通RSRP[-140，0)记录数","联通RSRP[-115，0)记录数","联通RSRP[-110，0)记录数",
        "联通RSRP[-105，0)记录数","联通RSRP[-100，0)记录数","联通RSRP[-95，0)记录数","联通RSRP[-140，0)之和",
        "联通RSRP[-115，0)之和","联通RSRP[-110，0)之和","联通RSRP[-105，0)之和","联通RSRP[-100，0)之和",
        "联通RSRP[-95，0)之和","联通RSRP[-140，0)平均值","联通RSRP[-115，0)平均值","联通RSRP[-110，0)平均值",
        "联通RSRP[-105，0)平均值","联通RSRP[-100，0)平均值","联通RSRP[-95，0)平均值","电信RSRP[-140，0)记录数",
        "电信RSRP[-115，0)记录数","电信RSRP[-110，0)记录数","电信RSRP[-105，0)记录数","电信RSRP[-100，0)记录数",
        "电信RSRP[-95，0)记录数","电信RSRP[-140，0)之和","电信RSRP[-115，0)之和","电信RSRP[-110，0)之和",
        "电信RSRP[-105，0)之和","电信RSRP[-100，0)之和","电信RSRP[-95，0)之和","电信RSRP[-140，0)平均值",
        "电信RSRP[-115，0)平均值","电信RSRP[-110，0)平均值","电信RSRP[-105，0)平均值","电信RSRP[-100，0)平均值",
        "电信RSRP[-95，0)平均值","电信top接入小区","电信Top最近小区","线路名称","源地铁站名称","目的地铁站名称",
        "预留字段8","预留字段9","预留字段10","日期"];

    //调用导出组件
    IntelligentRoadTestChartExport.tableExport(fileName,sheetName,templateId,titleName,list);
}
/**********************************
 * @funcname wugaoAreaTableExport
 * @funcdesc 五高区域类表格导出
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 ESBH_TYPE= 1、高校；2、高密度住宅；3、高流量商务区； 7、美景；8、农贸市场 9、美食 10、场馆
 * @return {datatype}
 * @author laijunbao
 * @create 2018/1/26 11:35
 * @modifier 
 * @modify 
 ***********************************/
IntelligentRoadTestChartExport.wugaoAreaTableExport = function IntelligentRoadTestChartExport_wugaoAreaTableExport(IntelligentRoadTestChart,type,areaType) {

    var list = [];
    var city = IntelligentRoadTestChart.mapCity;
    list.push("DAY:" + IntelligentRoadTestChart.endDay);
    list.push("CITY:" + city);
    list.push("ESBHTYPE:" + type);
    var otherConditon = "";
    if(areaType == "战狼区域"){
        // otherConditon = " and zlqy_flag is null ";//测试代码
        otherConditon = " and zlqy_flag = 1 "; //正式代码
    }
    list.push("OTHERCONDITION:" + otherConditon);
    var fileName =city + areaType + "数据表";

    var sheetName = fileName;

    var templateId ="IntelligentRoadTestAnalysisV2_3_177_WUGAO_Area_tableExport";
    var titleName = ["天翼蓝鹰区域编号","天翼蓝鹰区域名称","地市名称","地市ID","区县","区县ID","营服中心","营服中心ID",
        "中心点区域归属ID","主服务小区集合","4G切3G总次数","4G切3G总次数在本地网内排名","4G总流量","本地网内4G流量排名",
        "感知优良率按天平均值","本地网内感知优良率排名","4G用户数按天平均值","本地网内4G用户数排名","最终排名累计值",
        "弱覆盖最近基站名称","弱覆盖最近基站地址","基站ID","弱覆盖区域的弱覆盖栅格数","曾发生退服告警总次数","曾发生退服告警小区数",
        "未恢复退服告警小区数","弱覆盖区域的全部栅格数","弱覆盖区域的弱覆盖栅格数排名","弱覆盖区域的弱栅格的面积",
        "弱覆盖区域的全部栅格的面积","弱覆盖最近的小区ID","弱覆盖最近的小区的名称","弱覆盖最近的小区的状态","距离最近的TOP5的小区集合",
        "电信RSRP均值最大频点记录数","电信大于等于-105记录数","电信RSRP均值最大频点的所有RSRP之和","关联月份","弱覆盖区域集合",
        "弱覆盖区域数","day","栅格颗粒度类型"];

    //调用导出组件
    IntelligentRoadTestChartExport.tableExport(fileName,sheetName,templateId,titleName,list);
}