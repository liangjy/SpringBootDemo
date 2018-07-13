var progressbar = {};
progressbar.startTime;// 查询开始时间
progressbar.endTime;// 查询的结束时间
progressbar.canel;// 是否取消查询（1时取消继续查询）
progressbar.statusSum;// 统计已经查询完毕的所有sql的条数
progressbar.percentValue = 0;// 累计进度条的百分比
progressbar.perList = new Array();
progressbar.handIds = new Array();
progressbar.logTimeoutIds = new Array();

/**
 * 保存传过来的sql和回调函数集合
 */
progressbar.submitSql = function(sqllist, functionlist, reflectClass,isShow) {
	//不显示进度条，必须给够4个参数，reflectClass为null
	//不能只给3个参数
	if(noceUtil.isUndefined(reflectClass)){
		reflectClass =  new Array(functionlist.length);
	}
	if(isShow==undefined||isShow==null){
		isShow = true;
	}
	if(isShow){
		$("#win_4_loading").show();
	}else{
		$("#win_4_loading").hide();
	}
	document.getElementById("progressBar").style.width = "0%";
//	$("#win_4_loading").show();
	//前端不打印sql出来,本地调试时可自己放开注释
//	console.log("sql==" + sqllist);
	
	progressbar.statusSum = 0; //统计已经查询完毕的所有sql的条数
	progressbar.percentValue = 0;  // 累计进度条的百分比
	
	progressbar.perList = new Array(); //记录每条sql的百分比
	
	var sqllist_inner = {};  //存储SQL语句
	
	
	for ( var i = 0; i < sqllist.length; i++) {
		if (sqllist[i].indexOf("&") >= 0) {
			sqllist_inner[i] = sqllist[i].split("&")[0];
		} else {
			sqllist_inner[i] = sqllist[i];
		}
	}
	sqlsum = sqllist.length; //sqlsum这个变量没有定义?? 但它的作用是用来记录要查询的sql条数
	
	for ( var i = 0; i < sqlsum; i++) {// 初始化百分比数组，全部置为0
		progressbar.perList[i] = 0;
		// console.log("初始化"+i+"=="+progressbar.perList[i]);
	}

	var progressbarUlHtml = "";
	var progressbartabHtml = "";
	
	//这里应该是点击详细信息时出现的内容
	for ( var i = 0; i < sqllist.length; i++) {
		if (i == 0) {
			progressbarUlHtml += '<li class="down">查询1</li>';
			progressbartabHtml += '<div class="tbli"><div class="lti_tip"><span class="tip_boxspan">查询SQL='
					+ sqllist_inner[i].substr(0, 30)
					+ '...'
					+ '<div class="tip_box" >'
					+ sqllist_inner[i]
					+ '"</div></span></div><div class="lti_box" id="div_executeLog'
					+ i + '"></div></div>';
		} else {
			progressbarUlHtml += "<li>查询" + (i + 1) + "</li>";
			progressbartabHtml += '<div class="tbli" style="display:none;"><div class="lti_tip"><span class="tip_boxspan">查询SQL='
					+ sqllist_inner[i].substr(0, 30)
					+ '...'
					+ '<div class="tip_box" >'
					+ sqllist_inner[i]
					+ '"</div></span></div><div class="lti_box" id="div_executeLog'
					+ i + '"></div></div>';

		}
	}
	
	
	$("#progressbarUl").html(progressbarUlHtml);
	$("#progressbartab").html(progressbartabHtml);
	progressbar.initTab();
	
	
	var curSum = [ 0 ];
	
	for ( var i = 0; i < sqllist.length; i++) {  //依次对每条sql提交查询
		if (sqllist[i].indexOf("&") >= 0) {
			progressbar.getOperationId(sqllist_inner[i], functionlist[i], i, reflectClass, sqlsum, curSum, sqllist[i].split("&")[1]); //?
		} else {
			progressbar.getOperationId(sqllist_inner[i], functionlist[i], i, reflectClass, sqlsum, curSum);
		}
	}
};

/**
 * sql提交查询（返回操作的operationId）
 * 
 * 
 * sql : 要执行的一条sql
 * fun : java后台处理的数据的方法
 * bb : 表示第几条sql ??
 * add : 处理数据的回调函数
 * sqlsum :  总共要查询的sql条数??
 * curSum : 
 * cc : 
 * 
 * 
 */
progressbar.getOperationId = function(sql, fun, bb, add, sqlsum, curSum, cc) {
	progressbar.canel = 0;
	progressbar.startTime = new Date();
	var appId=$('#currentAppId').val();
	var appName = $('#'+appId).text();
	noce.ajax("pages_util_Progressbar_submitCmd.action", "cmd=" + encodeURIComponent(sql) + "&database=" + "2"+"&appId="+appId+"&appName="+encodeURIComponent(appName), function(msg) {
		var operationId = msg.cmdId;
		progressbar.handIds.push(operationId);
		progressbar.getStatusAnsLogs(operationId, fun, bb, add, sqlsum, curSum, cc);

	}, false);
};

/**
 * 通过查询返回的operationId标志查询日志
 */
progressbar.getStatusAnsLogs = function(cmdId, fun, bb, add, sqlsum, curSum, cc) {
	noce
			.ajax(
					"pages_util_Progressbar_getCmdExecLogBy.action",
					"cmdId=" + cmdId,
					function(msg) {
						var status = msg.status;
						var log = msg.log;
						var i = log.indexOf("%");
						var log1 = log.substring(0, i);
						var j = log1.lastIndexOf(" ");
						var log2 = log1.substring(j, i);

						// progressbar.percentValue=progressbar.percentValue+parseInt(log2)/sqlsum;

						progressbar.perList[parseInt(bb)] = parseInt(log2)
								/ sqlsum;

						// 取值
						var percent = 0;
						for ( var i = 0; i < sqlsum; i++) {// 初始化百分比数组，全部置为0
							percent += parseInt(progressbar.perList[i]);
						}

						percent += "%";
						// console.log("percent"+bb+"=="+percent);
						document.getElementById("progressBar").style.width = percent;
						$("#div_executeLog" + bb).append(log);

						if (progressbar.canel == 0) {
							if (status == true) {
								progressbar.statusSum++;
								curSum[0]++;
								progressbar.endTime = new Date(); // 为查询结束时间赋值

								$("#div_executeLog" + bb).append(
										progressbar.getUseTime(
												progressbar.startTime,
												progressbar.endTime));
								$("#div_executeLog" + bb).append("<hr>");
								if (progressbar.statusSum == sqlsum) {
									document.getElementById("progressBar").style.width = "100%";
									// $("#win_4_loading").hide();
									document.getElementById("progressBar").style.width = "0%";
								}
								progressbar.getResult(cmdId, fun, bb, add,
										sqlsum, curSum, cc);
							} else {
								var timeoutId = setTimeout(progressbar
										.getStatusAnsLogs(cmdId, fun, bb, add,
												sqlsum, curSum, cc), 3000);
								progressbar.logTimeoutIds.push(timeoutId);

							}
						}

					}, false);
};

/**
 * 通过操作码查询，返回查询结果
 */
progressbar.getResult = function(cmdId, fun, bb, add, sqlsum, curSum, cc) {
	noce.ajaxAsync("pages_util_Progressbar_getCmdExecResult2.action",
			"cmdId=" + cmdId + "&reflectClass=" + add[parseInt(bb)]
					+ "&parameter=" + cc, function(msg) {

				// 查询完成。清除handleId
				var handIds = progressbar.handIds;
				var newHandIds = new Array();
				for ( var i = 0; i < handIds.length; i++) {
					var handleId = handIds[i];
					if (Number(cmdId) != Number(handleId)) {
						newHandIds.push(handleId);
					}
				}

				progressbar.handIds = newHandIds;
				console.log(msg);
				// var result=msg[0].result;
				var result = msg[0];
				fun(result);
				if (curSum[0] == sqlsum) {
					$("#win_4_loading").hide();
				}

			});
};

/**
 * 通过查询的开始时间和结束时间计算出查询耗时
 */
progressbar.getUseTime = function(startDate, endDate) {
	var dateTime = endDate.getTime() - startDate.getTime(); // 时间差的毫秒数
	var milli = Math.abs(endDate.getMilliseconds()
			- startDate.getMilliseconds());

	// 计算出相差天数
	var days = Math.floor(dateTime / (24 * 3600 * 1000));
	// 计算出小时数
	var leave1 = dateTime % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
	var hours = Math.floor(leave1 / (3600 * 1000));

	// 计算相差分钟数
	var leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
	var minutes = Math.floor(leave2 / (60 * 1000));

	// 计算相差秒数
	var leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
	var seconds = Math.round(leave3 / 1000);

	return " 耗时: " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒" + milli + " 毫秒";
};

/**
 * 取消当前的查询
 */
progressbar.canelFunction = function() {
	// 取消轮询
	progressbar.canel = 1;
	var logTimeoutIds = progressbar.logTimeoutIds;
	for ( var i = 0; i < logTimeoutIds.length; i++) {
		clearTimeout(logTimeoutIds[i]);
	}

	// 后台发送取消请求
	if (progressbar.handIds.length > 0) {
		$.ajax({
			type : "post",// 使用post方法访问后台
			data : {
				'cmdIds' : progressbar.handIds.toString()
			},
			// dataType: "json",//返回json格式的数据
			url : "pages_util_Progressbar_cancelCmd.action",// 要访问的后台地址
			success : function(msg) {// msg为返回的数据，在这里做数据绑定
				progressbar.handIds = new Array();
				progressbar.logTimeoutIds = new Array();
			}
		});
	}
};
$(function() {
	// 浏览器关闭，浏览器刷新 ，取消查询
	$(window).unload(function() {
		progressbar.canelFunction();
	});
//	// 关闭加载条，先将click事件解绑，在绑定
//	$("#win_4_loadingClose").click(function() {
//		$("#win_4_loading").hide();
//		progressbar.canelFunction();
//		progressbarTwo.canelFunction();
//	});
	// 日志信息显示
//	$("#win_4_infobtn").click(function() {
//		var ob = $("#win_4_info");
//		var b_dis = ob.css("display");
//		if (b_dis == "none") {
//			ob.show();
//		} else {
//			ob.hide();
//		}
//		;
//	});
});
progressbar.initTab = function() {
	// $(".pcbox_nr .tab li").click(function(){
	// var idx = $(this).index();
	// $(this).addClass("down").siblings().removeClass("down");
	// $(".tabbox .tbli").eq(idx).show().siblings().hide();
	// });
	// 关闭加载条，先将click事件解绑，在绑定
	//为什么要解绑又绑定呢：因为存在两个版本使用该id，为了避免冲突（progressbar.js和progressbarTwo.js）
	$("#win_4_loadingClose").unbind("click").bind("click",function() {
		$("#win_4_loading").hide();
		progressbar.canelFunction();
	});
	// 日志信息显示，先将click事件解绑，在绑定
	//为什么要解绑又绑定呢：因为存在两个版本使用该id，为了避免冲突（progressbar.js和progressbarTwo.js）
	$("#win_4_infobtn").unbind("click").bind("click",function() {
		var ob = $("#win_4_info");
		var b_dis = ob.css("display");
		if (b_dis == "none") {
			ob.show();
		} else {
			ob.hide();
		}
		;
	});
	//点击某个查询后，显示该查询的信息
	$(".pcbox_nr .tab li").click(
			function() {
				var idx = $(this).index();
				$(this).addClass("down").siblings().removeClass("down");
				$(this).parent().parent().siblings(".tabbox").children(".tbli")
						.eq(idx).show().siblings().hide();
			});
};
