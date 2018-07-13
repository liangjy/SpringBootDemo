var AuditList = {};
AuditList.tableV=null;
AuditList.city="";
AuditList.dayStar=null;
AuditList.dayEnd=null;
AuditList.stat=0;
AuditList.objectType='自定义图层';
AuditList.auditType='共享';
AuditList.audit=null;
AuditList.gotoMenuId=456;//
AuditList.gotoPerId=486;//
AuditList.userGroupData=null;//
AuditList.ztre=null;
AuditList.auditUser=false;
AuditList.user=null;
AuditList.result = [] ;
AuditList.currentResult = [];
AuditList.currentPage = 1;
AuditList.totalPage = 0;
AuditList.totalCount = 0;
AuditList.pageSize = 50;
AuditList.isManager = false; //默认不是系统管理员
AuditList.allCity=["广州","深圳","珠海","佛山","东莞","惠州","中山","江门","肇庆","清远","茂名","湛江","汕头","汕尾","梅州","韶关","揭阳","潮州","云浮","河源","阳江"];
AuditList.auditArray = null; //存放要批量操作的审核单对象
AuditList.condition = { //用于筛选过滤的条件对象
    city : null, //地市
    audit_style : null, //行为
    senseType : null, //场景类型
    object_type : null, //审核对象类型（系统图层、关注秋雨、自定义图层）
    object_id : null, //对象的ID
    applicant_id : null , //申请人的账号
    taskid : null, //单号
    auditStat : null , //审核结果
    applicant_name : null //申请人姓名
}

//删除指定下标的元素
Array.prototype.del=function(index){
    if(isNaN(index)||index>=this.length){
        return false;
    }
    for(var i=0,n=0;i<this.length;i++){
        if(this[i]!=this[index]){
            this[n++]=this[i];
        }
    }
    this.length-=1;
};

$(function () {

    AuditList.auditArray = new Array();
    $('.select-city').click(function (){
        $(".city-info").toggle();
    });
    $('body').click(function (e){
        if($(e.target).closest(".select-city,.city-info").length == 0){
            $(".city-info").hide();
        };
    });

    if($("#user_role_List_string").val().indexOf("系统管理员2") > -1){ //系统管理员
        AuditList.isManager = true;
        $("#allPassBtn").show();
        $("#allNoPassBtn").show();
        $("#selectAllAudit").show();
    }


    //初始化地市列表
    AuditList.initCity();

    // 搜索框 数据绑定
    var seachInput = new Vue({
        el: '#searchLi',
        data: {
            message: '',
        },methods: {
            showResult: function () {
                $(".searchResult").show();
                // 搜索列表li点击隐藏搜索列表
                $('body').click(function (e){
                    if($(e.target).closest(".seachInput").length == 0){
                        $(".searchResult").hide();
                    };
                });
            },
            doSearch : function (type , message){
                if(type == "taskid"){
                    if(message != null && message.trim() != ""){
                        AuditList.condition.taskid = message.trim();
                    }else{
                        AuditList.condition.taskid = null;
                    }
                }else if(type == "applicant_id"){
                    if(message != null && message.trim() != ""){
                        AuditList.condition.applicant_id = message.trim();
                    }else{
                        AuditList.condition.applicant_id = null;
                    }
                }else if(type == 'applicant_name'){
                    if(message != null && message.trim() != ""){
                        AuditList.condition.applicant_name = message.trim();
                    }else{
                        AuditList.condition.applicant_name = null;
                    }
                }else if(type == 'object_id'){
                    if(message != null && message.trim() != ""){
                        AuditList.condition.object_id = message.trim();
                    }else{
                        AuditList.condition.object_id = null;
                    }
                }
                AuditList.filterResult(); //执行过滤
            },
            refreshData : function(){
                if($("#seachInput").val().trim() == ""){
                    AuditList.filterResult(); //执行过滤
                }
            }
        }
    });

    $("#allCheck").click(function(){
        if($(this).attr("checked") == "checked"){
            $("input[name='auditCheck']").attr("checked" , "checked");
            for(var i = 0 ; i <  AuditList.tableV.items.length; i++){
                AuditList.tableV.items[i].isChecked = true;
            }
        }else{
            $("input[name='auditCheck']").attr("checked" , false);
            for(var i = 0 ; i <  AuditList.tableV.items.length; i++){
                AuditList.tableV.items[i].isChecked = false;
            }
        }
    })

    $("#exportData").click(function(){
        AuditList.exportData();
    });

    $(".btn-sure,.closeBtn").click(function(){
        $(".modal").hide();
    });
    $(".modal-tabTitle li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(".modal-tabTitle li").index($(this));
        $(".tab-info").eq(index).show().siblings().hide();
    });
    $(".btn-toLeft").click(function(){
        var rightText = $(".tab-info:visible .rightTabInfo li.selected").text();
        if($("#rightCityScope").is(':hidden')){
       	 var obj=AuditList.getNode(rightText,3);
     	 var objArr=[];
       	 for(var i=0;i<AuditList.rightCountyScopeV.items.length;i++){
       		 if(AuditList.rightCountyScopeV.items[i].node_id!=obj.node_id){
       			objArr.push(AuditList.rightCountyScopeV.items[i])
       		 }
       	 }
     	AuditList.rightCountyScopeV.items=objArr;
       }else{
       	 var obj=AuditList.getNode(rightText,2);
       	 var objArr=[];
       	 for(var i=0;i<AuditList.rightCityScopeV.items.length;i++){
       		 if(AuditList.rightCityScopeV.items[i].node_id!=obj.node_id){
       			objArr.push(AuditList.rightCityScopeV.items[i])
       		 }
       	 }
     	AuditList.rightCityScopeV.items=objArr;
       }
//       $('.rightTabInfo li.selected').remove();
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
            	 var obj=AuditList.getNode(leftText,3);
            	 AuditList.rightCountyScopeV.items.push(obj);
            }else{
            	 var obj=AuditList.getNode(leftText,2);
            	 AuditList.rightCityScopeV.items.push(obj);
            }
            setTimeout(function(){
          	  $(".rightTabInfo li").click(function(){
          	        $(this).addClass("selected").siblings().removeClass("selected");
          	   });
            },500);
        }
    });
})


/**
 * ********************************
 * @funcname dealDateString
 * @funcdesc 处理日期
 * @param {String} dateString
 日期字符串 格式为：yyyyMMdd
 * @return {Date}
 * @author 林楚佳
 * @create 20170928
 * @modifier
 * @modify
 **********************************
 */
function dealDateString(dateString){
    dateString = dateString.toString().trim();
    var year  = dateString.substr(0 , 4);
    var month = dateString.substr(4,2) - 1;
    var day = dateString.substr(6,2);
    var dt = new Date(year, month, day);
    return dt;
}

/**********************************
 * @funcname endTime
 * @funcdesc 选择结束日期时设置结束日期并触发查询清单
 * @author 郑文彬
 * @create 20180412
 ***********************************/
function endTime(){
    var year=$dp.cal.getP('y');
    var month=$dp.cal.getP('M');
    var day=$dp.cal.getP('d');
    AuditList.dayEnd=year+month+day;
    if(AuditList.dayEnd<AuditList.dayStar){
    	alert("结束时间不小于起始时间！");
    	return;
    }
    $("#weekEndTime").val(AuditList.dayEnd);
    AuditList.search();
}
/**********************************
 * @funcname endTime
 * @funcdesc 选择起始日期时设置起始日期并触发查询清单
 * @author 郑文彬
 * @create 20180412
 ***********************************/
function starTime(){
    var year=$dp.cal.getP('y');
    var month=$dp.cal.getP('M');
    var day=$dp.cal.getP('d');
    AuditList.dayStar=year+month+day;
    if(AuditList.dayEnd<AuditList.dayStar){
    	alert("起始不可大于结束时间！");
    	return;
    }
    $("#weekInput").val(AuditList.dayStar);
    AuditList.search();
}
$(function () {
	AuditList.city=$("#cityPermission_common").val();
	var user_role_List_string= $("#user_role_List_string").val();
	//判断是否是审核员
	if(user_role_List_string.indexOf("审核员")!=-1){
		AuditList.auditUser=true;
	}
	AuditList.user=$('#headerUserForm_a').text().trim();
//	AuditList.city='广州';
//	AuditList.auditUser=true;
//	AuditList.user="zouj_qs";
	//若果不是审核员，则审核清单列表中的操作改为结果
	if(!AuditList.auditUser){
		$('#td_1').html("结果");
	}

    $("#allPassBtn").click(function(){
        AuditList.auditArray = [];
        var list = AuditList.tableV.items;
        for(var i = 0 ; i < list.length ; i++){
            var item = list[i];
            if(item.isChecked == true){
                AuditList.auditArray.push(item);
            }
        }
        if(AuditList.auditArray == null || AuditList.auditArray.length == 0){
            alert("请选中至少一个审核单对象!");
            return ;
        }
        $("#allPass").show();
    });

    $("#allNoPassBtn").click(function(){
        AuditList.auditArray = [];
        var list = AuditList.tableV.items;
        for(var i = 0 ; i < list.length ; i++){
            var item = list[i];
            if(item.isChecked == true){
                AuditList.auditArray.push(item);
            }
        }
        if(AuditList.auditArray == null || AuditList.auditArray.length == 0){
            alert("请选中至少一个审核单对象!");
            return ;
        }
        $("#allNotPassed").show();
    });
	//如果不是全省用户不显示申请类型中的系统图层和行为中的删除修改增加
//	if($("#cityPermission_common").val()!="全省"){
//		$('#objSelect option').each(function(){
//		    if($(this).text()=='系统图层'){
//		    	$(this).remove();
//		    }
//		 });
//		$('#auditSelect option').each(function(){
//		    if($(this).text()=='删除'||$(this).text()=='修改'||$(this).text()=='增加'){
//		    	$(this).remove();
//		    }
//		 });
//	}
	//获取用户的分权分域数据
	AuditList.getUserCity($('#headerUserForm_a').text().trim());
//	AuditList.getUserCity('zouj_gz');
	AuditList.loadMinDay();
	AuditList.searchEvent();
	AuditList.search();
});
/**********************************
 * @funcname AuditList.loadMinDay
 * @funcdesc 获取数据最小日期
 * @param {String} null (input optional)
 *
 * @return {null}
 * @author 郑文彬
 * @create 20180412
 ***********************************/
AuditList.loadMinDay=function AuditList_loadMinDay(){
	 	var list = ["AuditList_01_getDate","CITY:"+AuditList.city];
	    var sqlList = [list];
	    var functionList = [AuditList.setDay];
	    var database = [3];
	    progressbarTwo.submitSql(sqlList,functionList,database,null,null,null,null,true);
}
/**********************************
 * @funcname AuditList.setDay
 * @funcdesc 初始化日期控件
 * @param {Object} data (input optional)
 * 包含最小日期的对象
 * @return {null}
 * @author 郑文彬
 * @create 20180412
 ***********************************/
AuditList.setDay= function AuditList_setDay(data){
	var result = callBackChangeData(data);
	var day=result[0].day;
	AuditList.dayStar=day.substring(0,4)+""+day.substring(5,7)+""+day.substring(8,10);
	AuditList.dayEnd=new Date().Format("yyyyMMdd");
	$('#weekInput').val(AuditList.dayStar);
//	$('#weekInput').val("20170803");
	$('#weekEndTime').val(AuditList.dayEnd);
}
/**********************************
 * @funcname AuditList_loadAuditTable
 * @funcdesc 查询清单数据
 * @param {String} dayStar (input optional)
 * 起始日期
 * @param {String} dayEnd (input optional)
 * 结束日期
 * @param {String} city (input optional)
 * 城市
 * @param {String} audit_stat (input optional)
 * audit_stat=0 待审核 ，audit_stat=1 已审核
 * * @param {String} object_type (input optional)
 * 申请类型
 * * @param {String} audit_type (input optional)
 * 行为
 * @return {null}
 * @author 郑文彬
 * @create 20180412
 ***********************************/
AuditList.loadAuditTable=function AuditList_loadAuditTable(dayStar,dayEnd,city,audit_stat,object_type,audit_type){
		var list = ["AuditList_02_getAuditList","DAYSTAR:'"+dayStar+"'","DAYEND:'"+dayEnd+"'"
	               ];
		
		if(audit_stat==1){ //已审核的单，从历史记录表中获取
            $("#td_1").html("审核结果");
            $("#td_showAuditOption").show();
            $("#auditStatSelectLi").show();
            $("#allPassBtn").hide();
            $("#allNoPassBtn").hide();
            $("#selectAllAudit").hide();
            if($("#auditStat").val() != "请选择"){
                AuditList.condition.auditStat = $("#auditStat").val();
            }
			list.push("AUDIT_STAT:AND (AUDIT_STAT = '审核通过' or AUDIT_STAT = '审核未通过')");
            list.push("TABLENAME:dm_operate_his");
		}else{ //待审核的单从审核清单表中获取
            $("#td_1").html("操作");
            $("#td_showAuditOption").hide();
            $("#auditStatSelectLi").hide();
            if(AuditList.isManager ==  true){
                $("#allPassBtn").show();
                $("#allNoPassBtn").show();
                $("#selectAllAudit").show();
            }
            AuditList.condition.auditStat = null;
		    list.push("TABLENAME:DM_AUDIT_LIST");
			list.push("AUDIT_STAT:AND AUDIT_STAT ='待审核'");
		}
		//不是审核员只可以查看自己的审核单
		if(!AuditList.auditUser){
			list.push("applicant_id:AND applicant_id ='"+AuditList.user+"'");	
		}
		if(AuditList.city!="全省"){
			//本地网审核员
			if(city!=null&&city!=undefined&&city!=""){
				list.push("CITY:AND CITY='"+city+"'");
			}
			/*if(object_type!="请选择"){
				if(object_type=="自定义图层"){
					list.push("OBJECT_TYPE:AND OBJECT_TYPE in ('点图层','多边形图层','dt图层')");
				}else if(object_type=="系统图层"){
					//地市用户可以看到自己的系统图层清单
					list.push("OBJECT_TYPE:AND (OBJECT_TYPE in ('高校','场馆','高密度住宅区','美食','美景','高流量商务区','战狼区域','农贸市场','中小学','城中村','自然村','工厂') and  applicant_id ='"+AuditList.user+"')");
				}else{
					list.push("OBJECT_TYPE:AND OBJECT_TYPE = '"+object_type+"'");
				}
			}else{
				list.push("OBJECT_TYPE:AND ((OBJECT_TYPE in ('高校','场馆','高密度住宅区','美食','美景','高流量商务区','战狼区域','农贸市场','中小学','城中村','自然村','工厂') and applicant_id ='"+AuditList.user+"') OR"+
						"(OBJECT_TYPE in ('点图层','多边形图层','dt图层','关注区域') ) )");
			}*/
			
			
		}else{
			//省级审核员
			/*if(object_type!="请选择"){
				if(object_type=="自定义图层"){
					list.push("OBJECT_TYPE:AND OBJECT_TYPE in ('点图层','多边形图层','dt图层')");
					list.push("CITY:AND CITY='"+city+"'");
				}else if(object_type=="系统图层"){
					list.push("OBJECT_TYPE:AND OBJECT_TYPE in ('高校','场馆','高密度住宅区'," +
					"'美食','美景','高流量商务区','战狼区域','农贸市场','中小学','城中村','自然村','工厂')");
				}else{
					list.push("CITY:AND CITY='"+city+"'");
					list.push("OBJECT_TYPE:AND OBJECT_TYPE = '"+object_type+"'");
				}
			}else{
				//没有选中审核对象的类型，查询系统图层全部，自定义图层和关注区域根据用户归属地市（全省或者本地网）
//				list.push("OBJECT_TYPE:AND ((OBJECT_TYPE in ('高校','场馆','高密度住宅区','美食','美景','高流量商务区','战狼区域','农贸市场')) OR"+ 
//						"(OBJECT_TYPE in ('点图层','多边形图层','dt图层') AND city = '"+city+"') OR (OBJECT_TYPE = '关注区域' AND city = '"+city+"') )");
			}*/
		}
		
		/*if(audit_type!="请选择"){
			if(audit_stat == 0){
                list.push("AUDIT_TYPE:AND audit_style = '"+ audit_type+"'");
            }else{
                list.push("AUDIT_TYPE:AND operate_type = '"+ audit_type+"'");
            }
		}else{
			list.push("AUDIT_TYPE:");
		}*/
		
		var sqlList = [list];
	    var functionList = [AuditList.showAuditTable];
	    var database = [3];
	    progressbarTwo.submitSql(sqlList,functionList,database,null,null,null,null,true);
		
		
		//----------------------------
		
//		if(object_type!=null&&object_type!=undefined&&object_type!=""&&object_type!="请选择"){
//			if(object_type=="自定义图层"){
//				list.push("OBJECT_TYPE:AND OBJECT_TYPE in ('点图层','多边形图层','dt图层')");
//			}else if(object_type=="系统图层"){
//				list.push("OBJECT_TYPE:AND OBJECT_TYPE in ('高校','场馆','高密度住宅区'," +
//						"'美食','美景','高流量商务区','战狼区域','农贸市场')");
//			}else{
//				list.push("OBJECT_TYPE:AND OBJECT_TYPE = '"+object_type+"'");
//			}
//		}
//		if(audit_type!=null&&audit_type!=undefined&& audit_type!=""&&audit_type!="请选择"){
//			list.push("AUDIT_TYPE:AND audit_style = '"+audit_type+"'");
//		}
//	    var sqlList = [list];
//	    var functionList = [AuditList.showAuditTable];
//	    var database = [3];
//	    if(AuditList.city!="全省"&&object_type=="系统图层"){
//	    	return;
//	    }
//	    progressbarTwo.submitSql(sqlList,functionList,database,null,null,null,null,true);
}


AuditList.getDataListByPage = function AuditList_getDataListByPage(allData , page){
    var dataList = [];
    if(allData != null && allData.length > 0){
        for(var i = 0 ; i < AuditList.pageSize; i++){
            if((page-1) * AuditList.pageSize + i >= allData.length){
                AuditList.lastIndex = allData.length;
                break;
            }else{
                dataList[i] = allData[(page-1) * AuditList.pageSize + i];
                if(i == 0){
                    AuditList.startIndex = (page-1) * AuditList.pageSize + i + 1;
                }
                if(i == AuditList.pageSize - 1){
                    AuditList.lastIndex = (page-1) * AuditList.pageSize + i + 1;
                }
            }
        }
    }else {
        AuditList.startIndex = 0 ;
        AuditList.lastIndex = 0 ;
    }
    //AuditList.drawMk(dataList);
    return dataList;
}

/**********************************
 * @funcname AuditList.showAuditTable
 * @funcdesc 显示清单
 * @param {Object} data (input optional)
 * 清单数据
 * @return {null}
 * @author 郑文彬
 * @create 20180412
 ***********************************/
AuditList.showAuditTable=function AuditList_showAuditTable(data){
	var result = callBackChangeData(data);
    for(var i = 0 ; i < result.length; i++){
        if(result[i].city == null || result[i].city == ""){
            result[i].city = "全省";
        }
        if(result[i].object_type == "点图层" || result[i].object_type  == "dt图层" || result[i].object_type == "多边形图层"){
            result[i].sense_type == "自定义图层";
        }else if(result[i].object_type == "关注区域"){
            result[i].sense_type = "关注区域";
        }else{
            result[i].sense_type = "系统图层";
        }
        if(AuditList.stat != 0){ //已审核
           result[i].audit_style = result[i].operate_type;
        }
    }
	if(AuditList.stat == 0){ //未审核
        AuditList.unAuditResut = result; //保存未审核的列表信息
    }else{//已审核
        AuditList.auditResult = result; //保存已审核的列表信息
    }
    AuditList.filterResult();
}

AuditList.showTable = function(result){
    AuditList.result = result;
    AuditList.totalCount = result.length;
    var pageCount = result.length / AuditList.pageSize;
    if(AuditList.currentPage == null || AuditList.currentPage == 0 || AuditList.currentPage > pageCount){
        AuditList.currentPage = 1;
    }
    if((result.length % AuditList.pageSize) != 0){
        AuditList.totalPage = parseInt(pageCount) + 1 ; //总页数，没有整除时加上1
    }else{
        AuditList.totalPage = pageCount;  //整除不用加1
    }
    if(AuditList.tableV==null){
        AuditList.tableV=new Vue({
            el:"#tableDiv",
            data:{
                items:AuditList.getDataListByPage(AuditList.result , AuditList.currentPage),
                auditUser:AuditList.auditUser,
                isManager : AuditList.isManager,
                city:AuditList.city,
                totalPages : AuditList.totalPage,
                totalCounts :  AuditList.totalCount ,
                currentPageNum :  AuditList.currentPage,
                startIndex : AuditList.startIndex ,
                lastIndex : AuditList.lastIndex,
            },
            methods:{
                audit : function (item,type){
                    if(item.audit_content == null){
                        item.audit_content = "";
                    }
                    AuditList.audit=item;
                    if(type==1){
                        //审核通过
                        $('#pass').show();
                        var audit_option="";
                        if(AuditList.audit.audit_content.indexOf('申请')==-1){
                            audit_option=AuditList.audit.applicant_id+"申请"+AuditList.audit.audit_content+'\n'+
                                '审核意见：审核通过';
                        }else{
                            audit_option=AuditList.audit.applicant_id+":"+AuditList.audit.audit_content+'\n'+
                                '审核意见：审核通过';
                        }

                        var nodes="";
                        try {//获取选中的共享范围
                            nodes=AuditList.ztre.zTreeObj.getChangeCheckedNodes();
                        } catch (e) {
                        }
                        var shareCity=""
                        var share_scope=""
                        for(var i=0;i<nodes.length;i++){
                            share_scope=share_scope+nodes[i].node_id+"_";
                            shareCity=shareCity+nodes[i].name+"、";
                        }
                        share_scope=share_scope.substring(0,share_scope.length-1);
                        shareCity=shareCity.substring(0,shareCity.length-1);
                        //修改过共享范围
                        if(share_scope!=AuditList.audit.share_scope&&share_scope!=""){
                            AuditList.audit.audit_option=audit_option+"\n审核员将共享范围修改为："+shareCity;
                            AuditList.audit.share_scope=share_scope;
                        }else{
                            AuditList.audit.audit_option=audit_option;
                        }
                        $('#passText').val(AuditList.audit.audit_option);
                    }else{
                        //审核不通过
                        var audit_option="";
                        if(AuditList.audit.audit_content.indexOf('申请')==-1){
                            audit_option=AuditList.audit.applicant_id+"申请"+AuditList.audit.audit_content+'\n'+
                                '审核意见：审核不通过';
                        }else{
                            audit_option=AuditList.audit.applicant_id+AuditList.audit.audit_content+'\n'+
                                '审核意见：审核不通过';
                        }

                        $('#notPassedText').val(audit_option);
                        $('#notPassed').show();
                    }
                },
                updateScope :function (item){
                    var systemLayerType = "高校,场馆,高密度住宅区,美食,美景,高流量商务区,战狼区域,农贸市场,中小学,城中村,自然村,工厂";
                    if(systemLayerType.indexOf(item.object_type+",")>0){
                        return;
                    }
                    //修改共享
                    AuditList.audit=item;
                    $('#share').show();
                    var treeData= AuditList.getTreeData(AuditList.userGroupData);
                    if(item.object_type=="点图层"||item.object_type=="dt图层"||item.object_type=="多边形图层"){
                        var list=[];
                        for(var i=0;i<treeData.length;i++){
                            if(treeData[i].level==2||treeData[i].level==1){
                                list.push(treeData[i]);
                            }
                        }
                        //创建ztree实例
                        AuditList.ztre=new ZtreeUtil("cityZtree",list);
                    }else{
                        //创建ztree实例
                        AuditList.ztre=new ZtreeUtil("cityZtree",treeData);
                    }
                    //显示ztree
                    AuditList.ztre.showTree();
                    //根据item.share_scope设置选中
                    AuditList.ztre.chekeNode(item.share_scope);
                },gotoPage:function (itme){
                    var url;
                    if(itme.object_type=='关注区域'){
                        url='/NOCE/portal/pages_index_Index_home.action?appId=IntelligentRoadTestAnalysisV3&menuId='+AuditList.gotoMenuId+'&perId='+AuditList.gotoPerId+'&id_path=new&isRedirect=true&isAudit=1&appName=智能测评&object_type=关注区域&object_id='+itme.object_id;
                    }else if(itme.object_type=='点图层'||itme.object_type=='多边形图层'||itme.object_type=="dt图层"){
                        url='/NOCE/portal/pages_index_Index_home.action?appId=IntelligentRoadTestAnalysisV3&menuId='+AuditList.gotoMenuId+'&perId='+AuditList.gotoPerId+'&id_path=new&isRedirect=true&isAudit=1&appName=智能测评'
                            +"&username="+itme.applicant_name
                            +"&object_id="+itme.object_id
                            +"&object_type="+itme.object_type
                    }else{
                        if(itme.audit_style == "增加"){
                            var day = new Date((new Date().getTime()-48 * 60 * 60 * 1000)).Format("yyyyMMdd");
                            var esbhTable=AuditList.getTable("dm_scene_area_gis_che","where obj_id="+itme.object_id+" and obj_type='"+itme.object_type+"'");
                            var result=esbhTable.result;
                            var city = result.city;
                            var country = result.country;
                            var mktcenter = result.mktcenter;
                            var object_id = result.obj_id;
                            if(object_id==null||object_id==""){
                                return;
                            }
                            var object_type =itme.object_type;
                            url='/NOCE/portal/pages_index_Index_home.action?appId=IntelligentRoadTestAnalysisV3&menuId='+AuditList.gotoMenuId+'&perId='+AuditList.gotoPerId+'&id_path=new&isRedirect=true&isAudit=1&appName=智能测评'
                                +"&day="+day
                                +"&city="+city
                                +"&country="+country
                                +"&mktcenter="+mktcenter
                                +"&object_id="+object_id
                                +"&object_type="+object_type
                                +"&isNew=true";
                        }else{
                            // var day = new Date((new Date().getTime()-48 * 60 * 60 * 1000)).Format("yyyyMMdd");
                            var esbhTable=AuditList.getTable("FRT_ESBH_INFO_D","where ESBH_ID="+itme.object_id+" and day=(select max(day) from FRT_ESBH_INFO_D)");
                            var result=esbhTable.result;
                            var day = result.day;
                            var city = result.city;
                            var country = result.country;
                            var mktcenter = result.mktcenter;
                            var object_id = result.esbh_id;
                            if(object_id==null||object_id==""){
                                if(itme.audit_stat == "审核通过" && itme.audit_style == "删除"){
                                    day = itme.audit_time.substr(0 , 10).replace(/-/g , "");
                                    day = new Date(dealDateString(day).getTime() - 2*24*60*60*100).Format("yyyyMMdd");
                                    esbhTable=AuditList.getTable("FRT_ESBH_INFO_D","where ESBH_ID="+itme.object_id+" and day=" + day);
                                    result=esbhTable.result;
                                    day = result.day;
                                    city = result.city;
                                    country = result.country;
                                    mktcenter = result.mktcenter;
                                    object_id = result.esbh_id;
                                    if(object_id==null||object_id==""){
                                        alert("后台数据同步中！请耐心等待!");
                                        return;
                                    }
                                }else{
                                    AuditList.getEsbhMaxDay(); //查询场景表中的最大日期
                                    day = AuditList.senseMaxDay;
                                    if(day == null){
                                        return ;
                                    }
                                    day = new Date(dealDateString(day).getTime() - 1*24*60*60*100).Format("yyyyMMdd");
                                    esbhTable=AuditList.getTable("FRT_ESBH_INFO_D","where ESBH_ID="+itme.object_id+" and day=" + day);
                                    result=esbhTable.result;
                                    day = result.day;
                                    city = result.city;
                                    country = result.country;
                                    mktcenter = result.mktcenter;
                                    object_id = result.esbh_id;
                                    if(object_id==null||object_id==""){
                                        alert("后台数据同步中！请耐心等待!");
                                        return;
                                    }
                                }
                            }
                            var object_type =itme.object_type;
                            url='/NOCE/portal/pages_index_Index_home.action?appId=IntelligentRoadTestAnalysisV3&menuId='+AuditList.gotoMenuId+'&perId='+AuditList.gotoPerId+'&id_path=new&isRedirect=true&isAudit=1&appName=智能测评'
                                +"&day="+day
                                +"&city="+city
                                +"&country="+country
                                +"&mktcenter="+mktcenter
                                +"&object_id="+object_id
                                +"&object_type="+object_type
                        }
                    }
                    window.open(url);
                },showAuditOption:function(item){
                    $('#auditOptionTip').show();
                    var text="审核人："+item.auditor_id+"\n"+item.audit_option;
                    $('#auditOption').html(text);
                },
                showAuditContent : function(item){
                    $("#showAuditContent").html(item.audit_content);
                    $("#auditContent").show();
                },
                hideAuditContent : function(){
                    $("#auditContent").hide();
                },
                lastOrNext : function (type) {
                    if($("#allCheck").attr("checked") == "checked"){
                        alert("批量操作不支持跨页");
                        return;
                    }
                    if(type == 0){
                        //上一页
                        if(AuditList.currentPage >  1){
                            AuditList.currentPage = AuditList.currentPage - 1;
                            AuditList.tableV.items = AuditList.getDataListByPage(AuditList.result , AuditList.currentPage);
                            AuditList.tableV.currentPageNum = AuditList.currentPage;
                            AuditList.tableV.startIndex = AuditList.startIndex;
                            AuditList.tableV.lastIndex = AuditList.lastIndex;
                        }else{
                            alert("当前页是第一页");
                        }
                    }else{
                        if(AuditList.currentPage < AuditList.totalPage){
                            AuditList.currentPage = AuditList.currentPage + 1;
                            AuditList.tableV.items = AuditList.getDataListByPage(AuditList.result , AuditList.currentPage);
                            AuditList.tableV.currentPageNum = AuditList.currentPage;
                            AuditList.tableV.startIndex = AuditList.startIndex;
                            AuditList.tableV.lastIndex = AuditList.lastIndex;
                        }
                    }

                },
                gotoSomePage : function(){
                    if($("#allCheck").attr("checked") == "checked"){
                        alert("批量操作不支持跨页");
                        return;
                    }
                    var page = $("#page").val();
                    page  = parseInt(page);
                    if(page > 0 && page <= AuditList.totalPage){
                        AuditList.currentPage = page;
                        AuditList.tableV.items = AuditList.getDataListByPage(AuditList.result , AuditList.currentPage);
                        AuditList.tableV.currentPageNum =AuditList.currentPage;
                        AuditList.tableV.startIndex = AuditList.startIndex;
                        AuditList.tableV.lastIndex = AuditList.lastIndex;
                    }
                },
                goLast :function () {
                    if($("#allCheck").attr("checked") == "checked"){
                        alert("批量操作不支持跨页");
                        return;
                    }
                    AuditList.currentPage = AuditList.totalPage;
                    AuditList.tableV.items = AuditList.getDataListByPage(AuditList.result , AuditList.currentPage);
                    AuditList.tableV.currentPageNum = AuditList.currentPage;
                    AuditList.tableV.startIndex = AuditList.startIndex;
                    AuditList.tableV.lastIndex = AuditList.lastIndex;
                },
                goFirst :function () {
                    if($("#allCheck").attr("checked") == "checked"){
                        alert("批量操作不支持跨页");
                        return;
                    }
                    AuditList.currentPage = 1;
                    AuditList.tableV.items = AuditList.getDataListByPage(AuditList.result , AuditList.currentPage);
                    AuditList.tableV.currentPageNum = AuditList.currentPage;
                    AuditList.tableV.startIndex = AuditList.startIndex;
                    AuditList.tableV.lastIndex = AuditList.lastIndex;
                }
            }
        });
    }else{
        AuditList.tableV.items = AuditList.getDataListByPage(AuditList.result , AuditList.currentPage);
        AuditList.tableV.totalPages = AuditList.totalPage;
        AuditList.tableV.totalCounts =  AuditList.totalCount;
        AuditList.tableV.currentPageNum =  AuditList.currentPage;
        AuditList.tableV.startIndex = AuditList.startIndex ;
        AuditList.tableV.lastIndex = AuditList.lastIndex;
    }
}
/**********************************
 * @funcname getNewDate
 * @funcdesc 日期加减函数 传入日期字符串date（格式为2017/09/01）和加减天数days（减为负数），返回加减天后的日期
 * @param {Date} date (input optional)
 *  日期字符串（格式为2017/09/01）
 * @param {Date} days (input optional)
 *  加减天数
 * @return 返回加减后的日期字符串
 * @author 郑文彬
 * @create 20170921
 ***********************************/
function getNewDate(date,days){
    var d=new Date(date);
    var date= new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
    var year=date.getFullYear()+"";
    var month=date.getMonth()+1+"";
    var d=date.getDate()+"";
    if(month.length==1){
        month="0"+month;
    }
    if(d.length==1){
        d="0"+d;
    }
    return year+month+d;
}
/**********************************
 * @funcname AuditList.search
 * @funcdesc 改变过滤条件时重新获取过滤条件，查询清单数据
 * @return {null}
 * @author 郑文彬
 * @create 20180412
 ***********************************/
AuditList.search=function AuditList_search(){
	AuditList.dayEnd=$('#weekEndTime').val();
	AuditList.dayStar=$('#weekInput').val();
    AuditList.stat=$('input[name="checkedList"]:checked').val();
    AuditList.objectType=$('#objSelect option:selected') .val();
    AuditList.auditType=$('#auditSelect option:selected') .val();
	AuditList.loadAuditTable(AuditList.dayStar,AuditList.dayEnd,AuditList.city,AuditList.stat,AuditList.objectType,AuditList.auditType);
}
/**********************************
 * @funcname AuditList.searchEvent
 * @funcdesc 为所有的按钮或下拉框绑定事件
 * @return {null}
 * @author 郑文彬
 * @create 20180412
 ***********************************/
AuditList.searchEvent=function AuditList_searchEvent(){
	$('input[name="checkedList"]').change(function(){
		AuditList.search();
	})
	$("#objSelect").change(function(){
		// AuditList.search();
        if($(this).val() == "请选择"){
            AuditList.condition.object_type = null;
        }else{
            AuditList.condition.object_type = $(this).val();
        }
        AuditList.filterResult();
	});
	$("#auditSelect").change(function(){
		// AuditList.search();
        if($(this).val() == "请选择"){
            AuditList.condition.audit_style = null;
        }else{
            AuditList.condition.audit_style = $(this).val();
        }
        AuditList.filterResult();
	});

	$("#senseSelect").change(function(){
        if($(this).val() == "--请选择--"){
            AuditList.condition.senseType = null;
        }else{
            AuditList.condition.senseType = $(this).val();
        }
        AuditList.filterResult();
    })

    $("#auditStat").change(function(){
        if($(this).val() == "请选择"){
            AuditList.condition.auditStat = null;
        }else{
            AuditList.condition.auditStat = $(this).val();
        }
        AuditList.filterResult();
    })

	$("#audit_submit").click(function(){
		AuditList.search();
	})
	$("#passSubmit").click(function(){
		var audit_stat="审核通过";
		AuditList.audit.audit_stat=audit_stat;
		AuditList.audit.audit_option=$('#passText').val();
		AuditList.updateAudit(AuditList.audit);
	})
	$("#notPassedSubmit").click(function(){
		var audit_option=$('#notPassedText').val();
		var audit_stat="审核未通过";
		AuditList.audit.audit_option=audit_option;
		AuditList.audit.audit_stat=audit_stat;
		AuditList.updateAudit(AuditList.audit);
	});
    $("#allPassSubmit").click(function(){ //确认批量通过
        for(var i = 0 ; i < AuditList.auditArray.length; i++){
            var audit_option=$('#allPassText').val();
            var audit_stat="审核通过";
            AuditList.audit = AuditList.auditArray[i];
            AuditList.audit.audit_option=audit_option;
            AuditList.audit.audit_stat=audit_stat;
            if(i == AuditList.auditArray.length - 1){
                AuditList.auditArray = []; //清空数组
                $("#allCheck").attr("checked" , false);
            }
            AuditList.updateAudit(AuditList.audit);
        }
    });

    $("#allNotPassedSubmit").click(function(){ //确认批量不通过
        for(var i = 0 ; i < AuditList.auditArray.length; i++){
            var audit_option=$('#allNotPassedText').val();
            var audit_stat="审核未通过";
            AuditList.audit = AuditList.auditArray[i];
            AuditList.audit.audit_option=audit_option;
            AuditList.audit.audit_stat=audit_stat;
            if(i == AuditList.auditArray.length - 1){
                AuditList.auditArray = []; //清空数组
                $("#allCheck").attr("checked" , false);
            }
            AuditList.updateAudit(AuditList.audit);
        }
    });
	$("#sureShare").click(function(){
//		var share_scope=""
//		var nodes=AuditList.ztre.zTreeObj.getChangeCheckedNodes();
//		for(var i=0;i<nodes.length;i++){
//			share_scope=share_scope+nodes[i].node_id+"_";
//		}
//		share_scope=share_scope.substring(0,share_scope.length-1);
//		AuditList.audit.share_scope=share_scope;
//		var audit=ShareObject.changeAuditParamsName(AuditList.audit);
//		audit.type = 1; 
//		audit.operate = "update";
//		ShareObject.operateEntity(audit , AuditList.dealUpdateAudit);
	})
    $(".textBox").bind("input propertychange",function(){
        var nodeName=$(this).val();
        if($("#rightCityScope").is(':hidden')){
            var serArr=[];
            for(var i=0;i<AuditList.cityResult.length;i++){
            	if(AuditList.cityResult[i].level==3&&AuditList.cityResult[i].node_name.indexOf(nodeName)!=-1){
                    serArr.push(AuditList.cityResult[i]);
				}
            }
            AuditList.leftCountyScopeV.items=serArr;
        }else{
        	 var serArr=[];
             for(var i=0;i<AuditList.cityResult.length;i++){
             	if(AuditList.cityResult[i].level==2&&AuditList.cityResult[i].node_name.indexOf(nodeName)!=-1){
                     serArr.push(AuditList.cityResult[i]);
 				}
             }
             AuditList.leftCityScopeV.items=serArr;
        }
        setTimeout(function(){
        	  $(".leftTabInfo li").click(function(){
                  $(this).addClass("selected").siblings().removeClass("selected");
              });
        },500);
    });
}
AuditList.dealUpdateAudit =function AuditList_dealUpdateAudit(data){
//	$(".submitText").html("修改成功！");
//	$(".submitModal").show().delay(1000).fadeOut();
	console.log(data);
}
/**********************************
 * @funcname AuditList.getUserCity
 * @funcdesc 根据用户名获取用户的分权分域信息
 * @param {string} name (input optional)
 *  用户名
 * @return null
 * @author 郑文彬
 * @create 20180412
 ***********************************/
AuditList.getUserCity =function AuditList_getUserCity(name){
	progressbarTwo.submitSql([["AuditList_04_getUserCity","name:"+name]],
			[AuditList.setUserGroupData],[3],null,null,null,null,true);
}
//保存用户的分权分域数据
AuditList.setUserGroupData =function AuditList_setUserGroupData(data){
	var result = callBackChangeData(data);
	AuditList.userGroupData=result[0];
}
//根据节点名称获取节点
AuditList.getNode =function AuditList_getNode(node_name,level){
		for(var i=0;i<AuditList.cityResult.length;i++){
			if(level==2){
				if(AuditList.cityResult[i].city==node_name){
					return AuditList.cityResult[i];
				}
			}else if(level==3){
				if(AuditList.cityResult[i].node_name==node_name){
					return AuditList.cityResult[i];
				}
			}
		}
}
/**
*删除数组指定下标或指定对象
*/
Array.prototype.remove=function(obj){
	for(var i =0;i <this.length;i++){
	var temp = this[i];
	if(!isNaN(obj)){
	temp=i;
	}
	if(temp == obj){
	for(var j = i;j <this.length;j++){
	this[j]=this[j+1];
	}
	this.length = this.length-1;
	}
	}
}

/**********************************
 * @funcname AuditList.updateAudit
 * @funcdesc 审核方法，审核通过或不通过时调用。
 * @param {object} audit (input optional)
 *  审核单对象
 * @return null
 * @author 郑文彬
 * @create 20180412
 ***********************************/
AuditList.updateAudit=function AuditList_updateAudit(audit){
	audit.auditor_id=$('#headerUserForm_a').text().trim();
	var verify=AuditList.getTable("DM_AUDIT_LIST","where audit_stat='待审核' and audit_id="+audit.audit_id).result;
	if(verify==null){
		var auditAuditor=AuditList.getTable("DM_AUDIT_LIST","where  audit_id="+audit.audit_id).result;
		if(AuditList.auditArray == null || AuditList.auditArray.length == 0){ //为了批量操作，等到操作完成之后再重新查询
            alert("该审核单已被"+auditAuditor.auditor_id+"审核了！");
            AuditList.search();
            //审核通过刷新菜单栏中待审核数
            AuditList.queryAuditCount();
        }
		return;
	}
	audit.audit_time=new Date().Format("yyyy-MM-dd HH:mm:ss");
	var aduitAjax=ShareObject.changeAuditParamsName(audit);
	aduitAjax.type = 1; 
	aduitAjax.operate = "update";
	var tableResult=null;
	if(audit.object_type=="dt图层"){
		tableResult=AuditList.getTable("user_dt_list","where ID="+audit.object_id);
		//根据审核状态和行为获取share_status
		var share_status=AuditList.getShareStatus(tableResult,audit);
		tableResult.result.share_status=share_status;
		tableResult.result.audit_option=audit.audit_option;
		tableResult.result.share_scope=audit.share_scope;
        if(tableResult.result.share_status=="取消共享审核中"&&audit.audit_stat=="审核未通过"){
            tableResult.result.share_status = "已共享";
        }else if(tableResult.result.share_status=="取消共享审核中"&&audit.audit_stat=="审核通过"){
            tableResult.result.share_status = "共享未通过";
        }
		//更新user_dt_list
		var ajaxData=AuditList.getUpdateAjaxData(tableResult,"resultData");

		AuditList.updateDtShare(ajaxData);
	}else if(audit.object_type=="点图层" ||audit.object_type=="多边形图层"){
		//更新dm_custom_area_list
		tableResult=AuditList.getTable("dm_custom_area_list","where id="+audit.object_id);
		//根据审核状态和行为获取share_status
		var share_status=AuditList.getShareStatus(tableResult,audit);
		tableResult.result.share_status=share_status;
		tableResult.result.audit_option=audit.audit_option;
		tableResult.result.share_scope=audit.share_scope;

        if(tableResult.result.share_status=="取消共享审核中"&&audit.audit_stat=="审核未通过"){
            tableResult.result.share_status = "已共享";
        }else if(tableResult.result.share_status=="取消共享审核中"&&audit.audit_stat=="审核通过"){
            tableResult.result.share_status = "";
        }
        var ajaxData=AuditList.getUpdateAjaxData(tableResult,"customAreaList");
		AuditList.updateCustomShare(ajaxData);
		//更新dm_custom_area_list表
	}else if(audit.object_type=="关注区域"){
		tableResult=AuditList.getTable("DM_USER_CONCERN_AREA","where id="+audit.object_id);
		//根据审核状态和行为获取share_status
		var share_status=AuditList.getShareStatus(tableResult,audit);
		tableResult.result.share_status=share_status;
		tableResult.result.audit_option=audit.audit_option;
		tableResult.result.share_scope=audit.share_scope;
		tableResult.result.create_user = tableResult.result.creator;
		AuditList.updateConcernArea(tableResult.result);
	}else{//系统图层
		var aduitAjaxData=ShareObject.changeAuditParamsName(audit);
		//处理审核通过
		if(audit.audit_stat=="审核通过"){
			if(audit.audit_style=='删除'){
				aduitAjaxData.type = 4;
				aduitAjaxData.operate = "delete";
				ShareObject.operateEntity(aduitAjaxData , AuditList.dealUpdateAudit,false);
			}else if(audit.audit_style=='增加'){
				aduitAjaxData.type = 4;
				aduitAjaxData.operate = "add";
				ShareObject.operateEntity(aduitAjaxData , AuditList.dealUpdateAudit,false);
			}else if(audit.audit_style=='修改'){
				aduitAjaxData.type = 4;
				aduitAjaxData.operate = "edit";
				ShareObject.operateEntity(aduitAjaxData , AuditList.dealUpdateAudit,false);
			}
		}else if(audit.audit_stat=="审核未通过"){//未通过的审核
			if(audit.audit_style=='删除'){
				aduitAjaxData.type = 5;
				aduitAjaxData.operate = "delete";
				ShareObject.operateEntity(aduitAjaxData , AuditList.dealUpdateAudit,false);
			}else if(audit.audit_style=='增加'){
				aduitAjaxData.type = 5;
				aduitAjaxData.operate = "add";
				ShareObject.operateEntity(aduitAjaxData , AuditList.dealUpdateAudit,false);
			}else if(audit.audit_style=='修改'){
				aduitAjaxData.type = 5;
				aduitAjaxData.operate = "edit";
				ShareObject.operateEntity(aduitAjaxData , AuditList.dealUpdateAudit,false);
			}
		}
	}
	
	//系统图层的全部写到后端进行事务管理
	if(audit.object_type=="dt图层"||audit.object_type=="点图层" ||audit.object_type=="多边形图层"||audit.object_type=="关注区域"){
		ShareObject.operateEntity(aduitAjax , AuditList.dealUpdateAudit); 
		//所有类目通过要同步一条数据 dm_audit_list --> DM_OPERATE_HIS
		if(audit.audit_stat=="审核通过"){
			var operAjaxData=ShareObject.changeOperateHistoryParamsName(audit);
			operAjaxData.type = 2; 
			operAjaxData.operate = "add";
			ShareObject.operateEntity(operAjaxData , AuditList.dealUpdateAudit,false);
		}
	}
	//
	$('#TipTool').show();
	setTimeout(function(){$('#TipTool').hide();},2000);
    if(AuditList.auditArray == null || AuditList.auditArray.length == 0) { //为了批量操作，等到操作完成之后再重新查询
        setTimeout(function(){
            AuditList.search();
            //审核通过刷新菜单栏中待审核数
            AuditList.queryAuditCount();
        },1500);
    }
}
/**********************************
 * @funcname AuditList.queryAuditCount
 * @funcdesc 审核通过时重新查询待审核数，更新菜单栏待审核数。
 * @param
 * @return null
 * @author 郑文彬
 * @create 20180412
 ***********************************/
AuditList.queryAuditCount =function AuditList_queryAuditCount(){
	if(!AuditList.auditUser){
		return;
	}
	var sql="AuditList_05_auditCount";
	if(AuditList.city!='全省'){
		sql="AuditList_06_auditCount";
	}
	progressbarTwo.submitSql([[sql,"CITY:"+AuditList.city]],
		[AuditList.showAuditCount],[3]);
}
/**********************************
 * @funcname AuditList.showAuditCount
 * @funcdesc 更新菜单栏的待审核数
 * @param
 * @return null
 * @author 郑文彬
 * @create 20180412
 ***********************************/
AuditList.showAuditCount =function AuditList_showAuditCount(data){
	var result = callBackChangeData(data);
	if(result.length>0&&result[0].count>0){
		var html='<div class="audit">'+result[0].count+'</div>';
			$("#auditCount").html(result[0].count);
	}else{
		$("#auditCount").remove();
	}
	
}
/**********************************
 * @funcname AuditList.getTable
 * @funcdesc 根据表名和查询条件查询表格数据
 * @param {string} tableName (input optional)
 *  表名
 * @param {string} where (input optional)
 *  查询条件
 * @return null
 * @author 郑文彬
 * @create 20180412
 ***********************************/
AuditList.getTable=function AuditList_getTable(tableName,where){
	var tableResult={tableName:tableName,table:null,result:null};
	progressbarTwo.submitSql([["AuditList_05_getTable","tableName:"+tableName,"where:"+where]],
			[function(data){
				tableResult.table=data;
				var result = callBackChangeData(data);
				if(result.length>0){
					 try {
						 if(result[0].audit_time!=undefined){
							 result[0].audit_time=new Date(result[0].audit_time.time).Format("yyyy-MM-dd HH:mm:ss");
						 }
						 if(result[0].zlqy_flag==""){
							 result[0].zlqy_flag=0;
						 }
					} catch (e) {
					}
					try {
						var t=new Date();
						result[0].edit_time=new Date(result[0].edit_time.time).Format("yyyy-MM-dd HH:mm:ss");
					} catch (e) {
					}

					tableResult.result=result[0];
				}else{
					tableResult.result = {};
				}
			}],[3],null,null,null,null,true);
	return tableResult;
}
/**********************************
 * @funcname AuditList.updateConcernArea
 * @funcdesc 审核关注区域时更新关注区域表
 * @param {object} concernArea (input optional)
 *  关注区域对象
 * @return null
 * @author 郑文彬
 * @create 20180412
 ***********************************/
AuditList.updateConcernArea = function (concernArea){
	   if(concernArea != null){
	        var $ajax = $.ajax({
	            type: 'post',
	            data: concernArea,
	            url: 'pages_concernArea_ConcernArea_updateArea.action',
	            cache: false,
	            dataType: 'json',
	            success: function(data){
	                console.log("操作成功");
	            }
	        });
        }
}
/**********************************
 * @funcname AuditList.getShareStatus
 * @funcdesc 根据审核状态和行为获取share_status
 * @param {object} tableResult (input optional)
 *  自定义图层或者关注区域对象
 * @param {object} audit (input optional)
 *  审核单对象
 * @return null
 * @author 郑文彬
 * @create 20180412
 ***********************************/
AuditList.getShareStatus =function getShareStatus(tableResult,audit){
	if(audit.audit_stat=='审核通过'&&audit.audit_style=="取消共享"){
		tableResult.result.share_status="";
		tableResult.result.share_scope="";
	}else if(audit.audit_stat=='审核通过'&&audit.audit_style=="共享"){
		tableResult.result.share_status="已共享";
	}else if(audit.audit_stat=='审核未通过'&&audit.audit_style=="取消共享"){
		tableResult.result.share_status="已共享";
	}else if(audit.audit_stat=='审核未通过'&&audit.audit_style=="共享"){
		tableResult.result.share_status="共享未通过";
		tableResult.result.share_scope="";
	}
	return tableResult.result.share_status;
}
//AuditList.update =function update(){
//	   var $ajax = $.ajax({
//           type: 'post',
//           data: concernArea,
//           url: 'pages_util_update_update.action',
//           cache: false,
//           dataType: 'json',
//           success: function(data){
//               console.log("操作成功");
//           }
//       });
//}
//AuditList.getUpdateSqlParam =function getUpdateSqlParam(tableResult,audit){
//	 var data=tableResult.table;
//	 var result=tableResult.result;
//	 var columns=data.columns;
//	 var setStr="set ";
//	 for(var i=0;i<columns.length;i++){
//		 if(result[columns[i]]!=null&&result[columns[i]]!=undefined){
//			 setStr=setStr+" "+columns[i]+"='"+result[columns[i]]+"',"
//		 }else{
//			 setStr=setStr+" "+columns[i]+"= ,"
//		 }
//	 }
//	 setStr=setStr.substring(0,setStr.length-1);
//	 console.log(setStr);
//}
/**********************************
 * @funcname AuditList.updateDtShare
 * @funcdesc 更新dt图层数据
 * @param {object} dtDate (input optional)
 * dt图层数据
 * @return null
 * @author 郑文彬
 * @create 20180412
 ***********************************/
AuditList.updateDtShare =function updateDtShare(dtDate){
	
	 if(dtDate != null){
	        var $ajax = $.ajax({
	            type: 'post',
	            data: dtDate,
	            url: 'pages_dtUpload_DtUpload_updateShare.action',
	            cache: false,
	            dataType: 'json',
	            success: function(data){
	                console.log("操作成功");
	            }
	        });
     }
}
/**********************************
 * @funcname AuditList.updateCustomShare
 * @funcdesc 更新点图层或者多边形图层数据
 * @param {object} dtDate (input optional)
 * 点图层或多边形数据
 * @return null
 * @author 郑文彬
 * @create 20180412
 ***********************************/
AuditList.updateCustomShare =function updateCustomShare(ajaxData){
	
	if(ajaxData != null){
		var $ajax = $.ajax({
			type: 'post',
			data: ajaxData,
			url: 'pages_dmCustom_Polygon_update.action',
			cache: false,
			dataType: 'json',
			success: function(data){
				console.log("操作成功");
			}
		});
	}
}
/**********************************
 * @funcname AuditList.getUpdateAjaxData
 * @funcdesc 格式化数据 例子{a:1,b:2}-->{objName.a:1,objName.b:2}
 * @param {object} tableResult (input optional)
 * 需要格式化的对象
 * @param {object} objName (input optional)
 * 前缀名
 * @return null
 * @author 郑文彬
 * @create 20180412
 ***********************************/
 AuditList.getUpdateAjaxData =function AuditList_getUpdateAjaxData(tableResult,objName){
	 var data=tableResult.table;
	 var columns=[];
	 for(var i=0;i<data.columns.length;i++){
		 columns.push(objName+"."+data.columns[i]);
		 data.result[0][i]=tableResult.result[data.columns[i]];
	 }
//	 data.columns=columns;
	 var ajaxData={};
	 ajaxData.columns=columns;
	 ajaxData.result=data.result;
	 var result = callBackChangeData(ajaxData);
	 if(result!=null&&result.length>0){
		 if(objName == "dmSceneAreaGisHis"){
			 result[0]["dmSceneAreaGisHis.version_time"] = new Date(result[0]["dmSceneAreaGisHis.audit_time"].time).Format("yyyy-MM-dd HH:mm:ss");
		 }
		 return result[0];
	 }else{
		 return null;
	 }
 };
/**********************************
 * @funcname AuditList.getTreeData
 * @funcdesc 根据用户组获取共享范围的树数据
 * @param {object} userGroup (input optional)
 * 用户组数据
 * @return 树形数据
 * @author 郑文彬
 * @create 20180412
 ***********************************/
 AuditList.getTreeData= function  AuditList_getTreeData(userGroup){
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

AuditList.initCity=function initCity(){
    var cityPermission_common=$('#cityPermission_common').val();
    if(cityPermission_common=="全省"){
        $('.city-list').html();
        $('.city-selected').html("全省");
        $('.city-list').append('<li class="current"><a href="javascript:;">全省</a></li>');
        for(var i=0;i<AuditList.allCity.length;i++){
            $('.city-list').append('<li><a href="javascript:;">'+AuditList.allCity[i]+'</a></li>');
        }
    }else{
        $('.city-list').html();
        $('.city-selected').html(cityPermission_common);
        $('.city-list').append('<li class="current"><a href="javascript:;">'+cityPermission_common+'</a></li>');
    }
    /* 城市列表点击事件 */
    $(".city-list li").click(function () {
        $(this).addClass("current").siblings().removeClass("current");
        $(".select-name").removeClass("selectName");
        $(this).parents(".city-info").hide();
        if ($(this).text()!='全省') {
            AuditList.condition.city = $(this).text();
            AuditList.filterResult();
            $(this).parents(".select-city").find(".city-name").text($(this).text()+"市");
            $(this).parents(".select-city").find(".city-selected").text($(this).text()+"市");
        }else{
            AuditList.condition.city = null;
            AuditList.filterResult();
            $(this).parents(".select-city").find(".city-name").text($(this).text());
            $(this).parents(".select-city").find(".city-selected").text($(this).text());
        }
        return false;
    });
};
	/*过滤数据*/
AuditList.filterResult = function (){

    var result =  [];
    if(AuditList.stat == 0){
        result = AuditList.unAuditResut;
    }else{
        result = AuditList.auditResult;
    }

    // city : null, //地市
    // audit_style : null, //行为
    // senseType : null, //场景类型
    // object_type : null, //审核对象类型（系统图层、关注区域、自定义图层）
    // object_id : null, //对象的ID
    // applicant_id : null , //申请人的账号
    // taskid : null

    var tempResult = [];//作为一个中间的数据缓存
    //定义对象维度
    var temoFilterObj = crossfilter([]);
    temoFilterObj.add(result);

    var resultFilter = temoFilterObj.dimension(function(d) { return d }); //地市
    var selectElement = AuditList.condition.city;
    resultFilter.filter(function(d){
        if(selectElement == null){
            return d;
        }else{
            if(d.city == selectElement){
                return d;
            }
        }
    });

    tempResult = resultFilter.top(result.length);
    var temoFilterObj1 = crossfilter(tempResult);
    var resultFilter1 = temoFilterObj1.dimension(function(d) { return d }); //audit_style 行为
    selectElement = AuditList.condition.audit_style;
    resultFilter1.filter(function(d){

        if(selectElement==null){
            return d;
        }else{
            if(d.audit_style == selectElement){
                return d;
            }
        }
    });

    tempResult = resultFilter1.top(result.length);
    var temoFilterObj2 = crossfilter(tempResult);
    var resultFilter2 = temoFilterObj2.dimension(function(d) { return d }); //senseType 场景类型
    selectElement = AuditList.condition.senseType;
    resultFilter2.filter(function(d){
        if(selectElement==null){
            return d;
        }else{
            if(d.object_type == selectElement){
                return d;
            }
        }
    });

    tempResult = resultFilter2.top(result.length);
    var temoFilterObj3 = crossfilter(tempResult);
    var resultFilter3 = temoFilterObj3.dimension(function(d) { return d }); //object_type 审核类型，自定义图层、关注区域、系统图层
    selectElement = AuditList.condition.object_type;

    resultFilter3.filter(function(d){
        if(selectElement==null){
            return d;
        }else{
            if(selectElement == "自定义图层"){
                if(d.object_type == "点图层" || d.object_type == "dt图层" || d.object_type == "多边形图层"){
                    return d;
                }
            }else if(selectElement == "关注区域"){
                if(d.object_type == "关注区域"){
                    return d;
                }
            }else{
                if(d.object_type != "点图层" &&  d.object_type != "dt图层" && d.object_type != "多边形图层" && d.object_type != "关注区域" ){
                    return d;
                }
            }

        }
    });

    tempResult = resultFilter3.top(result.length);
    var temoFilterObj4 = crossfilter(tempResult);
    var resultFilter4 = temoFilterObj4.dimension(function(d) { return d }); // object_id
    selectElement = AuditList.condition.object_id;
    resultFilter4.filter(function (d) {
        if(selectElement== null){
            return d;
        }else{
            if(d.object_id != null && d.object_id.toString().indexOf(selectElement) > -1){ //模糊匹配对象ID
                return d;
            }
        }
    })

    tempResult = resultFilter4.top(result.length);
    var temoFilterObj5 = crossfilter(tempResult);
    var resultFilter5 = temoFilterObj5.dimension(function(d) { return d }); // applicant_id
    selectElement = AuditList.condition.applicant_id;
    resultFilter5.filter(function (d) {
        if(selectElement == null){
            return d;
        }else{
            if(d.applicant_id != null && d.applicant_id.indexOf(selectElement) > -1){ //模糊匹配申请人账号
                return d;
            }
        }
    })

    tempResult = resultFilter5.top(result.length);
    var temoFilterObj6 = crossfilter(tempResult);
    var resultFilter6 = temoFilterObj6.dimension(function(d) { return d }); // taskid
    selectElement = AuditList.condition.taskid;
    resultFilter6.filter(function (d) {
        if(selectElement == null){
            return d;
        }else{
            if(d.taskid != null && d.taskid.indexOf(selectElement) > -1 ){
                return d;
            }
        }
    });

    tempResult = resultFilter6.top(result.length);
    var temoFilterObj7 = crossfilter(tempResult);
    var resultFilter7 = temoFilterObj7.dimension(function(d) { return d }); // applicant_name
    selectElement = AuditList.condition.applicant_name;
    resultFilter7.filter(function (d) {
        if(selectElement == null){
            return d;
        }else{
            if(d.applicant_name != null && d.applicant_name.indexOf(selectElement) > -1){
                return d;
            }
        }
    });

    tempResult = resultFilter7.top(result.length);
    var temoFilterObj8 = crossfilter(tempResult);
    var resultFilter8 = temoFilterObj8.dimension(function(d) { return d }); // applicant_name
    selectElement = AuditList.condition.auditStat;
    resultFilter8.filter(function (d) {
        if(selectElement == null){
            return d;
        }else{
            if(d.audit_stat == selectElement){
                return d;
            }
        }
    });


    AuditList.result = resultFilter8.top(result.length);
    AuditList.showTable(AuditList.result);
    AuditList.condition.taskid = null;
    AuditList.condition.applicant_id = null;
    AuditList.condition.object_id = null;
    AuditList.condition.applicant_name = null;

}


/**
 * ********************************
 * @funcname exportData
 * @funcdesc 将数据导出成文件
 * @param {Array} data  {String} fileName
 data表示要导出的数据  fileName：Excel文件名称
 * @return {null}
 * @author 林楚佳
 * @create 20170901
 * @modifier
 * @modify
 **********************************
 */
function exportData(data , fileName){
    // 这里的data数据，也即是从数据库查询出来的数据
    // colums表示 是表格的列名数组 相当于data中的columns数组
    // tableData表示每一行的数据，相当于data中的result
    var sheetObj = new sheet(data.columns,data.tableData,"sheet1");
    exportExcelUtil.exportExcelByList(fileName,sheetObj);

}

/**
 * ********************************
 * @funcname dealAuditListData
 * @funcdesc 处理审核单的结果集，将其按照要求进行处理，用于导出数据
 * @param {Array} data
 data表示要处理的数据
 * @return {Array}
 * @author 林楚佳
 * @create 20180607
 * @modifier
 * @modify
 **********************************
 */
function dealAuditListData(result){
    var newData = {};
    var columns = ["单号","申请人账号","申请人姓名","申请时间" , "本地网","申请类型" , "场景类型" , "行为", "对象编号" , "申请内容" ,"审核状态" , "审核意见"] ; // 表头数据
    var tableData = [];

    for(var i = 0 ; i < result.length; i++){
        var tempData = [result[i].taskid  , result[i].applicant_id , result[i].applicant_name , result[i].apply_time , result[i].city  ,
            result[i].sense_type ,result[i].object_type , result[i].audit_style , result[i].object_id , result[i].audit_content , result[i].audit_stat , result[i].audit_option ];
        tableData.push(tempData);
    }
    newData.columns = columns;
    newData.tableData = tableData;

    return newData;
}


/**
 * ********************************
 * @funcname AuditList.exportData
 * @funcdesc 导出审核单记录
 * @return
 * @author 林楚佳
 * @create 20180607
 * @modifier
 * @modify
 **********************************
 */
AuditList.exportData = function(){
    if(AuditList.stat == 0){ //待审核的单
        var data = dealAuditListData(AuditList.unAuditResut);
        var fileName =  $("#weekInput").val() + "~" +  $("#weekEndTime").val() + "待审核单";
        exportData(data , fileName);
    }else{  //已审核的单
        var data = dealAuditListData(AuditList.auditResult);
        var fileName =  $("#weekInput").val() + "~" +  $("#weekEndTime").val() + "已审核单";
        exportData(data , fileName);
    }
}

//同步查询场景表中的最大日期
AuditList.getEsbhMaxDay = function () {
    var sqlList = [];
    var list = ["AuditList_08_getSenseMaxDay"];
    sqlList.push(list);
    var funcList = [AuditList.dealEsbhMaxDay];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database , null , null , null , null , true);
}

AuditList.dealEsbhMaxDay = function AuditList_dealEsbhMaxDay(data){
    var result = callBackChangeData(data);
    if(result.length > 0){
        AuditList.senseMaxDay = result[0].maxday;
    }
}

