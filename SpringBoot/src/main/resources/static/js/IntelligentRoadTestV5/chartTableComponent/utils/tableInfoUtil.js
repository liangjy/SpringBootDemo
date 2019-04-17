/**
 * 表格组件tableObj封装，返回需要的tableObj
 * @author laijunbao
 * @create 2018-07-30-0030 17:55
 */

var TableInfoUtil = {};

/**********************************
 * @funcname getFixObj
 * @funcdesc 表头合并
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-07-30-0030 17:55
 * @modifier
 * @modify
 ***********************************/
TableInfoUtil.getFixObj = function (fixRow,fixCln) {
    var fixObj={
        fixRow: fixRow || 1,
        fixClnObj:{
            fixCln:fixCln || 5,
            tableId:parseInt(Math.random()*100) + "tab"
        }
    };
    return fixObj;
}
/**********************************
 * @funcname getPageObj
 * @funcdesc 分页对象
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-07-30-0030 17:56
 * @modifier
 * @modify
 ***********************************/
TableInfoUtil.getPageObj = function (pageSize,pageFlag) {
    var pageObj={
        pageSize: pageSize || 20,
        pageFlag: pageFlag || 1
    };
    return pageObj;
}

/**********************************
 * @funcname getTableObj
 * @funcdesc 表格tableObj对象
 * @param
 * @return {datatype}
 * @author laijunbao
 * @create 2018-07-30-0030 17:56
 * @modifier
 * @modify
 ***********************************/
TableInfoUtil.getTableObj = function (paraObj) {
    var tableObject={
        divId: paraObj.divId || "tableParentDiv",
        tableId: paraObj.tableId || "tabObjTabId"+parseInt(Math.random()*100) + "tab",
        tableHead: paraObj.tableHead,
        dataType: paraObj.dataType || 3,
        clnObj: paraObj.clnObj || null,
        sql: paraObj.sql,
        sortFlag: paraObj.sortFlag || 0,
        pageObj: paraObj.pageObj || TableInfoUtil.getPageObj(paraObj.pageSize,paraObj.pageFlag),
        fixObj: paraObj.fixObj || TableInfoUtil.getFixObj(paraObj.fixRow,paraObj.fixCln),
        callBackTranFn: paraObj.callBackTranFn || null

    };
    return tableObject;
}
