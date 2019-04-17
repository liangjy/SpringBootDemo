/**
 * 关注区域的共享
 */

var concernAreaShare = {};

concernAreaShare.isAuditor = false; //是否是审核员
concernAreaShare.isManager = false; //是否是系统管理员
concernAreaShare.ztre=null; //全省的地市和区县树对象
$(function () {
    // concernAreaShare.getUserCity($("#headerUserForm_a").text().toString().trim());
    if($("#user_role_List_string").val() != null){
        if($("#user_role_List_string").val().indexOf("审核员") > -1){
            concernAreaShare.isAuditor = true;
        }
        if($("#user_role_List_string").val().indexOf("系统管理员") > -1){
            concernAreaShare.isManager = true;
        }
    }
    if($("#cityPermission_common").val()!="全省"){
        concernAreaShare.city=$("#cityPermission_common").val();
    }

    var userName = $("#headerUserForm_a").text().toString().trim();
    setTimeout(function(){
        //获取用户的分权分域数据
        concernAreaShare.getUserCity(userName);
    },15000);//查询用户可共享区域的树形结构
    concernAreaShare.user_nodeId = $("#user_permission_group_id").val();//记录用户的节点ID

    $(".closeBtn").click(function(){
        $(".shareModal").hide();
    });
    $(".modal-tabTitle li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(".modal-tabTitle li").index($(this));
        $(".tab-info").eq(index).show().siblings().hide();
    });
    $(".leftTabInfo li").click(function(){
        $(this).addClass("selected").siblings().removeClass("selected");
    });
    $(".rightTabInfo li").click(function(){
        $(this).addClass("selected").siblings().removeClass("selected");
    });
    $(".btn-toLeft").click(function(){
        $('.rightTabInfo li.selected').remove()
    });
    $(".btn-toRight").click(function(){
        var rightText = $(".tab-info:visible .leftTabInfo li.selected").text();
        var has = false;
        //判断右边li的值是否有重复的
        $('.tab-info:visible .rightTabInfo li').each(function () {
            if($(this).text() == rightText) {
                has = true;
            }
        });
        if (!has) {  //如果右边li的值没有有重复的就把左边li的值添加到右边li
            var leftText = $(".tab-info:visible .leftTabInfo li.selected").text();
//            $(".tab-info:visible .rightTabInfo ul").append("<li>"+leftText+"</li>")
            if($("#rightCityScope").is(':hidden')){
                var obj=concernAreaShare.getNode(leftText,3);
                concernAreaShare.rightCountyScopeV.items.push(obj);
            }else{
                var obj=concernAreaShare.getNode(leftText,2);
                concernAreaShare.rightCityScopeV.items.push(obj);
            }
            setTimeout(function(){
                $(".rightTabInfo li").click(function(){
                    $(this).addClass("selected").siblings().removeClass("selected");
                });
            },500);
        }
    });
})

/**********************************
 * @funcname concernAreaShare.updateConcernArea
 * @funcdesc 更新关注区域的信息
 * @param {Object} concernArea
 concernArea表示关注区域对象
 * @author 林楚佳
 * @create 20180311
 ***********************************/
concernAreaShare.updateConcernArea = function (concernArea){
    if(concernArea != null){
        var $ajax = $.ajax({
            type: 'post',
            data: concernArea,
            url: 'pages_concernArea_ConcernArea_updateArea.action',
            cache: false,
            dataType: 'json',
            success: function(data){
                console.log("操作成功");
                IntelligentRoadTest.getConcernAreaMessageById(data.id);
            },
            error: function(data,textStatus){
                console.log("操作失败");
            }
        });
    }else{
        console.log("参数为空");
    }
}

/**********************************
 * @funcname concernAreaShare.shareConcernArea
 * @funcdesc 共享关注区域（这里需要做一个分支，一个审核员，一个是普通用户）
 * @param {Object} concern
 concern表示关注区域对象
 * @author 林楚佳
 * @create 20180311
 ***********************************/
concernAreaShare.shareConcernArea = function (concern){
    if(concern != null){
        var isAuditor = concernAreaShare.isAuditor;
        var share_scope = concern.share_scope; //这里还要获取分享范围
        var audit_status = ""; //共享状态
        var audit_style = "共享"; //审核类型
        var object_type = "关注区域";
        var object_id = concern.id;
        var audit_content = "将关注区域共享给"+ concern.share_scope_chineseName + "的用户";
        concern.create_user = concern.creator;
        if(isAuditor){ //审核员分支
            //1.更新关注区域对象
            concern.share_status = "已共享";
            audit_status = "已通过";
            concern.share_scope = share_scope;
            concern.audit_option = "审核已经通过";
            concernAreaShare.updateConcernArea(concern); //更新信息

            //2.插入一条数据到操作记录中
            var operateHistory = ShareObject.createOperateObject(audit_style,audit_status,object_id,object_type,audit_content ,share_scope);
            ShareObject.createOperateHistory(operateHistory , concernAreaShare.afterShare);
            $("#tipMessage").html("成功将关注区域共享给其他用户了！");
            $(".submitModal").show().delay(1000).fadeOut();
        }else{ //普通用户分支
            //1.更新关注区域的信息
            concern.share_status = "共享审核中";
            audit_status = "待审核";
            concernAreaShare.updateConcernArea(concern); //更新信息

            //2.创建审核单
            var audit = ShareObject.createAudit(audit_style ,audit_status , object_id , object_type , audit_content , share_scope);
            ShareObject.createOrUpdateAudit(audit , "add" , concernAreaShare.afterShare); //提交审核单,并更新列表数据

            //3.弹出提示框提示已经提交共享申请
            $(".submitModal").show().delay(1000).fadeOut();
        }
    }

}

/**********************************
 * @funcname concernAreaShare.afterShare
 * @funcdesc 共享之后或者取消共享之后的回调函数
 * @param {object} data
 data表示查询返回的数据对象
 * @author 林楚佳
 * @create 20180311
 ***********************************/
concernAreaShare.afterShare = function concernAreaShare_afterShare(data){
    IntelligentRoadTest.queryAllConcernArea();//更新列表数据
}

/**********************************
 * @funcname concernAreaShare.cancelShareConcernArea
 * @funcdesc 取消共享关注区域（这里需要做一个分支，一个审核员，一个是普通用户）
 * @param {object} concern
 concern表示关注区域对象 共享区域对象的数据，从vue对象中取即可
 * @author 林楚佳
 * @create 20180311
 ***********************************/
concernAreaShare.cancelShareConcernArea = function (concern){
    if(concern != null){
        var isAuditor = concernAreaShare.isAuditor;
        var share_scope = concern.share_scope; //这里还要获取分享范围
        var audit_status = ""; //共享状态
        var audit_style = "取消共享"; //审核类型
        var object_type = "关注区域";
        var object_id = concern.id;
        var audit_content = "取消共享关注区域";
        concern.create_user = concern.creator;
        if(isAuditor){ //审核员分支
            //1.更新关注区域对象
            concern.share_status = null;
            audit_status = "已通过";
            concern.share_scope = null;
            concern.audit_option = "审核已经通过";
            concernAreaShare.updateConcernArea(concern); //更新信息

            //2.插入一条数据到操作记录中
            var operateHistory = ShareObject.createOperateObject(audit_style,audit_status,object_id,object_type,audit_content , share_scope);
            ShareObject.createOperateHistory(operateHistory , concernAreaShare.afterShare);
            $("#tipMessage").html("成功取消共享！");
            $(".submitModal").show().delay(1000).fadeOut();
        }else{ //普通用户分支
            //1.更新关注区域的信息
            concern.share_status = "取消共享审核中";
            audit_status = "待审核";
            concernAreaShare.updateConcernArea(concern); //更新信息

            //2.创建审核单
            var audit = ShareObject.createAudit(audit_style ,audit_status , object_id , object_type , audit_content , share_scope);
            ShareObject.createOrUpdateAudit(audit , "add" , concernAreaShare.afterShare); //提交审核单,并更新列表数据
            $("#tipMessage").html("已提交申请，待管理员审核！");
            //3.弹出提示框提示已经提交共享申请(待补充)
            $(".submitModal").show().delay(1000).fadeOut();
        }
    }

}

/**
 * 确认撤销审核单的按钮的点击事件
 */
$("#sureRevokeShare").click(function(){
    var concernArea = IntelligentRoadTest.concernAreaCompleteVM.concernAreaData;
    var sqlList = [];
    var list = ["ShareObject_getAuditByObject" , "OBJECT_TYPE:" + "关注区域" , "OBJECT_ID:" + concernArea.id]
    sqlList.push(list);
    var funcList = [concernAreaShare.dealAuditData];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database);
});

/**********************************
 * @funcname concernAreaShare.dealAuditData
 * @funcdesc 作为处理查询审核单之后的回调函数
 * @param {object} data
 data表示查询返回的结果对象
 * @author 林楚佳
 * @create 20180311
 ***********************************/
concernAreaShare.dealAuditData = function concernAreaShare_dealAuditData(data){
    var result = callBackChangeData(data);
    if(result.length > 0){
        var audit = result[0];
        audit.audit_stat = "已撤销";
        var concernArea = IntelligentRoadTest.concernAreaCompleteVM.concernAreaData;
        if(concernArea.share_status == "共享审核中"){
            concernArea.share_scope = null;
            concernArea.share_status = null;
        }else if(concernArea.share_status == "取消共享审核中") {
            concernArea.share_status = "已共享";
        }
        concernArea.create_user = concernArea.creator;
        concernAreaShare.revokeApply(concernArea , audit);
    }
}


/**********************************
 * @funcname concernAreaShare.revokeApply
 * @funcdesc 撤销申请
 * @param {object} concern  {object} audit
 concern表示关注区域的对象  audit表示审核单对象
 * @author 林楚佳
 * @create 20180311
 ***********************************/
concernAreaShare.revokeApply = function (concern , audit){

    //修改关注区域的状态
    concernAreaShare.updateConcernArea(concern);
    //修改审核单的审核状态
    ShareObject.createOrUpdateAudit(audit , "update" , null);
    //创建一条操作记录到操作记录表
    var operateHistory = audit;
    ShareObject.createOperateHistory(operateHistory, null);
    IntelligentRoadTest.queryAllConcernArea(); //重查所有的数据
}

/**********************************
 * @funcname concernAreaShare.likeDoAudit
 * @funcdesc 模拟审核操作
 * @param {object} concernArea
 concernArea表示关注区域的对象
 * @author 林楚佳
 * @create 20180311
 ***********************************/
concernAreaShare.likeDoAudit = function (concernArea){
    var sqlList = [];
    var list = ["ShareObject_getAuditByObject" , "OBJECT_TYPE:" + "关注区域" , "OBJECT_ID:" + concernArea.id]
    sqlList.push(list);
    var funcList = [concernAreaShare.dealUpdateAudit];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database , [concernArea]);
}
/**********************************
 * @funcname concernAreaShare.dealUpdateAudit
 * @funcdesc 上面方法的回调函数
 * @param {object} data {object} concern
 data表示查询返回的结果  concern表示关注区域的对象
 * @author 林楚佳
 * @create 20180311
 ***********************************/
concernAreaShare.dealUpdateAudit = function concernAreaShare_dealUpdateAudit(data , concern){
    var result = callBackChangeData(data);
    if(result.length > 0){
        var audit = result[0];
        concernAreaShare.doAuditOperate(concern , concernAreaShare.isPass , audit);
    }else{
        $("#tipMessage").html("未找到审核单。");
        $(".submitModal").show().delay(2000).fadeOut();
    }
}
/**
 * 模拟审核操作，用于测试
 */
concernAreaShare.doAuditOperate = function(concern , isPass , audit){
    if(concern != null){
        concern.create_user = concern.creator;
        if(isPass){ //审核通过
            if(concern.share_status == "共享审核中"){
                concern.audit_option = "共享审核已经通过";
                concern.share_status = "已共享";
            }else{
                concern.share_status = null;
                concern.audit_option = "取消共享审核已经通过";
                concern.share_scope = "";
            }
        }else{
            if(concern.share_status == "共享审核中"){
                concern.audit_option = "共享审核不通过";
                concern.share_status = null;
            }else{
                concern.share_status = "已共享";
                concern.audit_option = "取消共享审核不通过";
                concern.share_scope = "";
            }
        }
        concernAreaShare.updateConcernArea(concern); //更新信息
        ShareObject.createOrUpdateAudit(audit , "update"); //更新审核单信息
        var operateHistory = audit;
        ShareObject.createOperateHistory(operateHistory , concernAreaShare.afterShare);
        $("#tipMessage").html(concern.audit_option);
        $(".submitModal").show().delay(2000).fadeOut();
    }
}


//----------------------------------------复用文彬的代码---------------------------------
/**********************************
 * @funcname concernAreaShare.getUserCity
 * @funcdesc 获取用户的分权节点
 * @param {string}  name
 name表示用户名
 * @author 郑文彬
 * @create 20180311
 ***********************************/
concernAreaShare.getUserCity =function AuditList_getUserCity(name){
	progressbarTwo.submitSql([["AuditList_04_getUserCity","name:"+name]],
			[concernAreaShare.setUserGroupData],[3]);
}

/**********************************
 * @funcname concernAreaShare.setUserGroupData
 * @funcdesc 获取用户的分权节点之后的回调函数
 * @param {object}  data
 data表示查询返回的结果
 * @author 郑文彬
 * @create 20180311
 ***********************************/
concernAreaShare.setUserGroupData =function AuditList_setUserGroupData(data){
	var result = callBackChangeData(data);
	concernAreaShare.userGroupData=result[0];
    if(result.length > 0){
        var treeData= concernAreaShare.getTreeData(concernAreaShare.userGroupData);
        //创建ztree实例
        concernAreaShare.ztre=new ZtreeUtil("cityZtree",treeData);
    }
}


/**
 * 选择共享范围之后点击确定按钮触发的点击事件
 */
$("#sureShare").click(function(){
    $(".shareModal").hide();
    var share_scope=""
    var share_scope_chineseName = ""
    var nodes=concernAreaShare.ztre.zTreeObj.getChangeCheckedNodes();
    for(var i=0;i<nodes.length;i++){
        share_scope=share_scope+nodes[i].node_id+"_";
        share_scope_chineseName = share_scope_chineseName + nodes[i].name;
    }
    share_scope=share_scope.substring(0,share_scope.length-1);

    if(share_scope.trim().length > 0){
        IntelligentRoadTest.concernAreaCompleteVM.concernAreaData.share_scope = share_scope;
        var concern = IntelligentRoadTest.concernAreaCompleteVM.concernAreaData;
        concern.share_scope_chineseName = share_scope_chineseName;
        console.log(IntelligentRoadTest.concernAreaCompleteVM.concernAreaData);
        if(share_scope.trim() != ""){ //选择了共享的范围了
            concernAreaShare.shareConcernArea(concern); //调用共享关注区域的方法
        }
        $("#tipMessage").html("已提交申请，待管理员审核！");
        $(".submitModal").show().delay(1000).fadeOut();
    }else{
        $("#tipMessage").html("共享范围没有选中！请重新选择共享范围!");
        $(".submitModal").show().delay(1000).fadeOut();
    }
});

//获取树形结构数据
/**********************************
 * @funcname concernAreaShare.setUserGroupData
 * @funcdesc 根据用户所在的权限节点获取用户树形结构
 * @param {object}  userGroup
 userGroup表示用户的权限节点的对象
 * @author 郑文彬
 * @create 20180311
 ***********************************/
concernAreaShare.getTreeData= function  concernAreaShare_getTreeData(userGroup){
		var ztreeData=[];
		$.ajax({
			type : "post",
			url : "pages_user_User_getTreeData.action",
			async:false,
			dataType : "json",
			success : function(data) {
				if(userGroup.level==1){
					//全省的显示所有城市
					ztreeData=data;
				}else if(userGroup.level==2){
					//市级显示该市及其区县
					for(var i=0;i<data.length;i++){
						if(data[i].node_id==userGroup.node_id||data[i].parent_id==userGroup.node_id){
							ztreeData.push(data[i]);
						}
					}
				}else {
					//区县用户显示该区县及其所在地市
					for(var i=0;i<data.length;i++){
						if(data[i].node_id==userGroup.node_id||data[i].node_id==userGroup.parent_id){
							ztreeData.push(data[i]);
						}
					}
				}
				
			}
		});
		return ztreeData;
	}


//------------------------------工单监测的代码，先写在这里（林楚佳）-----------------------------------------------------




//---------------------------------监测代码结束-----------------------------------------------------------------