var progressbar={};
progressbar.startTime;//查询开始时间
progressbar.endTime;//查询的结束时间
progressbar.resultArray;
progressbar.canel;//是否取消查询（1时取消继续查询）
progressbar.sqllistLength=0;//sql条数
progressbar.sqllist={};//sql的集合
progressbar.parameter={};//sql的附带参数集合
progressbar.functionlist;//回调函数的集合，与sql一一顺序对应
progressbar.reflectClassList;//处理结果的类方法集合（以class:method的格式）
progressbar.statusSum;//统计已经查询完毕的所有sql的条数
progressbar.percentValue=0;//累计进度条的百分比
progressbar.progressbarUlHtml;
progressbar.progressbartabHtml;


/**
 * 保存传过来的sql和回调函数集合
 */
progressbar.submitSql=function(sqllist,functionlist,reflectClass){
	document.getElementById("progressBar").style.width="0%";
	$("#win_4_loading").show();
	progressbar.statusSum=0;
	progressbar.percentValue=0;
	for(var i=0;i<sqllist.length;i++){
		if(sqllist[i].indexOf("&")>=0){
			progressbar.sqllist[i]=sqllist[i].split("&")[0];
		}else{
			progressbar.sqllist[i]=sqllist[i];
		}
		
	}
//	progressbar.sqllist=sqllist;
	progressbar.functionlist=functionlist;
	progressbar.sqllistLength=sqllist.length;
	progressbar.reflectClassList=reflectClass;
	var progressbarUlHtml="";
	var progressbartabHtml="";
	for(var i=0;i<progressbar.sqllistLength;i++){
//		$("#progressbarUl").append("<li>查询"+(i+2)+"</li>");
		if(i==0){
			progressbarUlHtml +='<li class="down">查询1</li>';
//			progressbartabHtml +='<div class="tbli"><div class="lti_box" id="div_executeLog'+i+'"></div></div>';
			progressbartabHtml +='<div class="tbli"><div class="lti_tip"><span class="tip_boxspan">查询SQL='+progressbar.sqllist[i].substr(0,30)+'...'+'<div class="tip_box" >'+progressbar.sqllist[i]+'"</div></span></div><div class="lti_box" id="div_executeLog'+i+'"></div></div>';
		}else{
			progressbarUlHtml +="<li>查询"+(i+1)+"</li>";			
			progressbartabHtml +='<div class="tbli" style="display:none;"><div class="lti_tip"><span class="tip_boxspan">查询SQL='+progressbar.sqllist[i].substr(0,30)+'...'+'<div class="tip_box" >'+progressbar.sqllist[i]+'"</div></span></div><div class="lti_box" id="div_executeLog'+i+'"></div></div>';
			
		}
				
	}
	$("#progressbarUl").html(progressbarUlHtml);
	$("#progressbartab").html(progressbartabHtml);
	progressbar.initTab();
	for(var i=0;i<sqllist.length;i++){
		if(sqllist[i].indexOf("&")>=0){
			progressbar.getOperationId(progressbar.sqllist[i],functionlist[i],i,sqllist[i].split("&")[1]);
		}else{
			progressbar.getOperationId(progressbar.sqllist[i],functionlist[i],i);
		}
//		progressbar.getOperationId(sqllist[i],functionlist[i],i);
//		progressbar.getOperationId(progressbar.sqllist[i],functionlist[i],i);
	}
//	progressbar.getOperationId(sqllist[0],functionlist[0]);//递归执行sql日志和结果的查询（递归入口）
}

/**
 * sql提交查询（返回操作的operationId）
 */
progressbar.getOperationId=function(sql,fun,bb,cc){
//	$("#div_executeLog"+bb).html('sql='+'<span title="'+sql+'">'+sql.substr(0,30)+'...</span><br>');
	progressbar.canel=0;	
	progressbar.startTime = new Date();
	noce.ajax(
		 "pages_util_Progressbar_submitCmd.action", 
		"cmd="+encodeURIComponent(sql)+"&database="+"2",
		function(msg){
			var operationId=msg.cmdId;
			progressbar.getStatusAnsLogs(operationId,fun,bb,cc);
			
		
		},false);
	
}

/**
 * 通过查询返回的operationId标志查询日志
 */
progressbar.getStatusAnsLogs=function(cmdId,fun,bb,cc){
	noce.ajax("pages_util_Progressbar_getCmdExecLogBy.action",
			"cmdId="+cmdId,
			function(msg){			
				var status=msg.status;
				var log=msg.log;
				var i=log.indexOf("%");
				var log1=log.substring(0,i);
				var j=log1.lastIndexOf(" "); 
				var log2=log1.substring(j,i);

				progressbar.percentValue=progressbar.percentValue+parseInt(log2)/progressbar.sqllistLength;
//				var percent=parseInt(log2)/progressbar.sqllistLength+progressbar.statusSum*100/progressbar.sqllistLength+"%";
				var percent=progressbar.percentValue+"%";
				document.getElementById("progressBar").style.width=percent;
				$("#div_executeLog"+bb).append(log);
				 
				if(progressbar.canel==0){
					if(status==true){  
						progressbar.statusSum++;
						progressbar.endTime = new Date(); //为查询结束时间赋值
						
		  			   $("#div_executeLog"+bb).append(progressbar.getUseTime(progressbar.startTime,progressbar.endTime));
		  			   $("#div_executeLog"+bb).append("<hr>");
		  				if(progressbar.statusSum==progressbar.sqllistLength){
		  					document.getElementById("progressBar").style.width="100%";
		  					$("#win_4_loading").hide();
		  					document.getElementById("progressBar").style.width="0%";
		  				}
		  			   progressbar.getResult(cmdId,fun,bb,cc);
		  			 }else{  
		    			   setTimeout(progressbar.getStatusAnsLogs(cmdId,fun,bb,cc),3000); 
		   			} 
				}

				
			},false);
}

/**
 * 通过操作码查询，返回查询结果
 */
progressbar.getResult=function(cmdId,fun,bb,cc){	
	noce.ajaxAsync(
		 "pages_util_Progressbar_getCmdExecResult2.action",
		 "cmdId="+cmdId+"&reflectClass="+progressbar.reflectClassList[parseInt(bb)]+"&parameter="+cc,
		function(msg){
			console.log(msg);
//			var result=msg[0].result;
			var result=msg[0];
			fun(result);
			
		
		});
}


/**
 * 通过查询的开始时间和结束时间计算出查询耗时
 */
progressbar.getUseTime=function(startDate,endDate){	 
	var dateTime=endDate.getTime()-startDate.getTime();  //时间差的毫秒数 
	var milli= Math.abs(endDate.getMilliseconds() - startDate.getMilliseconds());

	//计算出相差天数 
	var days=Math.floor(dateTime/(24*3600*1000)); 
	//计算出小时数 
	var leave1=dateTime%(24*3600*1000);    //计算天数后剩余的毫秒数
	var hours=Math.floor(leave1/(3600*1000));

	//计算相差分钟数
	var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
	var minutes=Math.floor(leave2/(60*1000));
	 
	//计算相差秒数
	var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
	var seconds=Math.round(leave3/1000);
	 
	return " 耗时: "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒"+milli+" 毫秒"; 
}

/**
 * 取消当前的查询
 */
progressbar.canelFunction=function(){
		$.ajax({
	        type: "post",//使用post方法访问后台
	        //dataType: "json",//返回json格式的数据
	        url: "pages_util_Progressbar_cancelCmd.action",//要访问的后台地址 
	        success: function(msg){//msg为返回的数据，在这里做数据绑定  
	        	progressbar.canel = 1;
	        }        
	    }); 
}


$(function(){
	//关闭加载条
	$("#win_4_loadingClose").click(function(){
		$("#win_4_loading").hide();
		progressbar.canelFunction();		
	});
	//日志信息显示
	$("#win_4_infobtn").click(function(){
		var ob = $("#win_4_info");
		var b_dis = ob.css("display");
		if( b_dis == "none" ){
			ob.show();
		}else{
			ob.hide();
		};
	});
});

progressbar.initTab=function(){
//	$(".pcbox_nr .tab li").click(function(){
//		var idx = $(this).index();
//		$(this).addClass("down").siblings().removeClass("down");
//		$(".tabbox .tbli").eq(idx).show().siblings().hide();
//	});
	
	$(".pcbox_nr .tab li").click(function(){
		var idx = $(this).index();
		$(this).addClass("down").siblings().removeClass("down");
		$(this).parent().parent().siblings(".tabbox").children(".tbli").eq(idx).show().siblings().hide();
	});
}
