/**
 * 共享操作的js (对数据库进行修改的操作)
 */

var ShareObject = {};

/**********************************
 * @funcname ShareObject.changeAuditParamsName
 * @funcdesc 将审核单对象的属性名称修改成带前缀的，用于提交给后台使用对象接收属性
 * @param {Object} audit
    存放了审核单属性的对象
 * @return {Object}
 * @author 林楚佳
 * @create 20180310
 ***********************************/
ShareObject.changeAuditParamsName = function (audit){
    var newAuditObject = {
        "audit.audit_id" : audit.audit_id ,
        "audit.apply_time" : audit.apply_time ,
        "audit.applicant_id" : audit.applicant_id ,
        "audit.applicant_name" : audit.applicant_name ,
        "audit.audit_style" : audit.audit_style ,
        "audit.applicant_unit" : audit.applicant_unit ,
        "audit.audit_stat" : audit.audit_stat ,
        "audit.auditor_id" : audit.auditor_id ,
        "audit.audit_time" : audit.audit_time ,
        "audit.city" : audit.city ,
        "audit.object_id" : audit.object_id ,
        "audit.object_type" : audit.object_type ,
        "audit.audit_content" : audit.audit_content ,
        "audit.audit_option" : audit.audit_option ,
        "audit.share_scope" : audit.share_scope
    };
    return newAuditObject;
}

/**********************************
 * @funcname ShareObject.createAudit
 * @funcdesc 传入几个必要参数，创建出可以生成审核单的对象
 参数均为String类型
 * @param audit_stat  审核状态
 * @param object_id   审核的对象ID
 * @param object_type 审核的对象类型 （比如：场景、关注区域、自定义图层）
 * @param audit_content 审核的内容（比如，申请将关注区域共享给天河区。。。等等区域的同事
 * @param share_scope  共享的范围（存放的是选择的区域的节点ID，用'_'拼接起来的字符串
 * @return {Object}
 * @author 林楚佳
 * @create 20180310
 ***********************************/
ShareObject.createAudit = function (audit_style , audit_stat  ,
                                    object_id , object_type , audit_content ,  share_scope){
    var audit = {
        "apply_time" :new Date().Format("yyyy-MM-dd HH:mm:ss"),
        "audit_style" : audit_style ,
        "audit_stat" : audit_stat ,
        "city" : $("#cityPermission_common").val().trim() ,
        "object_id" : object_id ,
        "object_type" : object_type ,
        "audit_content" : audit_content ,
        "share_scope" : share_scope
    }
    return audit;
}


/**********************************
 * @funcname ShareObject.changeOperateHistoryParamsName
 * @funcdesc 将操作记录对象的属性名称修改成带前缀的，用于提交给后台是可以使用对象接收参数，减少代码量
 * @param {Object} operateHistory
 存放操作记录属性的对象
 * @return {Object}
 * @author 林楚佳
 * @create 20180310
 ***********************************/
ShareObject.changeOperateHistoryParamsName = function (operateHistory) {

    var newOperateHistoryObject = {
        "operateHistory.audit_id" : operateHistory.id ,
        "operateHistory.apply_time" : operateHistory.apply_time ,
        "operateHistory.applicant_id" : operateHistory.applicant_id ,
        "operateHistory.applicant_name" : operateHistory.applicant_name ,
        "operateHistory.operate_type" : operateHistory.audit_style ,
        "operateHistory.applicant_unit" : operateHistory.applicant_unit ,
        "operateHistory.audit_stat" : operateHistory.audit_stat ,
        "operateHistory.auditor_id" : operateHistory.auditor_id ,
        "operateHistory.audit_time" : operateHistory.audit_time ,
        "operateHistory.city" : operateHistory.city ,
        "operateHistory.object_id" : operateHistory.object_id ,
        "operateHistory.object_type" : operateHistory.object_type ,
        "operateHistory.audit_content" : operateHistory.audit_content ,
        "operateHistory.audit_option" : operateHistory.audit_option ,
        "operateHistory.share_scope" : operateHistory.share_scope
    }
    return newOperateHistoryObject;
}

/**********************************
 * @funcname ShareObject.createOperateObject
 * @funcdesc 传入几个必要的参数，生成一个操作记录对象
 * @param audit_style 审核类型
 * @param audit_stat 审核状态
 * @param object_id  对象ID
 * @param object_type 对象类型
 * @param audit_content 审核内容
 * @return {Object}
 * @author 林楚佳
 * @create 20180310
 ***********************************/
ShareObject.createOperateObject = function(audit_style , audit_stat , object_id , object_type , audit_content , share_scope){
    var operateHistory = {
        "apply_time" : new Date().Format("yyyy-MM-dd HH:mm:ss"),
        "audit_style" : audit_style ,
        "audit_stat" : audit_stat ,
        "audit_time" :new Date().Format("yyyy-MM-dd HH:mm:ss"),
        "city" : $("#cityPermission_common").val().trim()  ,
        "object_id" : object_id ,
        "object_type" : object_type ,
        "audit_content" : audit_content ,
        "share_scope" : share_scope
    }
    return operateHistory;
}

/**********************************
 * @funcname ShareObject.operateEntity
 * @funcdesc 通过传入存放有对象属性的ajaxData
 * 的对象和回调函数对该对象进行操作（后台的CURD操作）
 * @param {Object} ajaxData  {Object}recallMethod {boolean}isAsync(请求是否是异步的)
 ajaxData表示传递给后台的参数对象
 ajaxData的格式规范：
 {
    "属性名称" : "属性值"

    "type" : ....,
    "operate" : ....
 }
 同时，该数据对象中必须包括以下两个属性
 "type" 用于标识操作的对象类型
 "operate"  用于标识对对象执行什么操作，比如add 表示新增对象  update表示更新对象
 recallMethod 表示回调函数的对象
 * @author 林楚佳
 * @create 20180310
 * @
 ***********************************/
ShareObject.operateEntity = function(ajaxData , recallMethod,isAsync){
    if(ajaxData != null){
    	
    	if(isAsync==false){
    		isAsync = false;
    	}else{
    		isAsync = true;
    	}
        var $ajax = $.ajax({
            type: 'post',
            data: ajaxData,
            async: isAsync,
            url: 'pages_audit_OperateEntity_operateEntity.action',
            cache: false,
            dataType: 'json',
            success: function(data){
                console.log(data);
                console.log("操作成功");
                if (recallMethod != null){
                    recallMethod(data);
                }
            },
            error: function(data,textStatus){
                console.log("操作失败");
            }
        });
    }else{
        console.log("数据为空！请检查传入的参数");
    }
}

/**********************************
 * @funcname ShareObject.createOrUpdateAudit
 * @funcdesc 创建或更新审核单
 * @param {Object} audit  {String}operate {Object} recallFunc
 audit表示审核单对象 operate表示操作类型（创建或者更新）  recallMethod 表示回调函数的对象
 * @author 林楚佳
 * @create 20180310
 ***********************************/
ShareObject.createOrUpdateAudit = function(audit , operate , recallFunc){
    if(audit != null && operate != null){
        var ajaxData = ShareObject.changeAuditParamsName(audit); //将对象属性名称转成带前缀的属性名称
        if(operate == "add"){
            //将操作对象的类型以及做什么操作的属性放入ajaxData中
            ajaxData.type = 1; //1表示操作的对象是审核单对象
            ajaxData.operate = "add";
        }else{
            //将操作对象的类型以及做什么操作的属性放入ajaxData中
            ajaxData.type = 1; //1表示操作的对象是审核单对象
            ajaxData.operate = "update";
        }
        console.log(ajaxData);
        ShareObject.operateEntity(ajaxData , recallFunc);
    }else{
        console.log("请核对参数信息");
    }
}

/**********************************
 * @funcname ShareObject.createOperateHistory
 * @funcdesc 创建操作历史记录
 * @param {Object} operateHistory {Object} recallFunc
 operateHistory表示操作记录的对象   recallMethod 表示回调函数的对象
 * @author 林楚佳
 * @create 20180310
 ***********************************/
ShareObject.createOperateHistory = function (operateHistory , recallFunc){

    if(operateHistory != null){
        var ajaxData = ShareObject.changeOperateHistoryParamsName(operateHistory); //将对象属性名称转成带前缀的属性名称
        //将操作对象的类型以及做什么操作的属性放入ajaxData中
        ajaxData.type = 2; //2表示操作的对象是操作记录对象
        ajaxData.operate = "add";

        console.log(ajaxData);
        ShareObject.operateEntity(ajaxData,recallFunc);
    }
}
