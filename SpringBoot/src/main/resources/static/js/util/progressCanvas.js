function ProgressCanvas(startTime,endTime,canel,statusSum,percentValue,perList,handIds,logTimeoutIds,divId){
this.startTime = startTime;// 查询开始时间
this.endTime = endTime;// 查询的结束时间
this.canel = canel;// 是否取消查询（1时取消继续查询）
this.statusSum = statusSum;// 统计已经查询完毕的所有sql的条数
this.percentValue = percentValue;// 累计进度条的百分比
this.perList = perList;
this.handIds = handIds;
this.logTimeoutIds = logTimeoutIds;
this.currentDivId = divId;

/**
 * 保存指定模块传过来的sql和回调函数集合
 */
ProgressCanvas.prototype.submitSqlDiv = function(sqllist, functionlist, reflectClass,divId) {
	var that = this;
	that.canel = 0;
	that.handIds = new Array();
	that.logTimeoutIds = new Array();
	if(noceUtil.isUndefined(reflectClass)){
		reflectClass =  new Array(functionlist.length);
	}
	$("#"+divId).find(".pcbox_nr").css("position","absolute");
	$("#"+divId).find(".pcbox_nr").hide();

	ProgressCanvas.prototype.createDiv(divId);
	
	var loader = $('.circleLoader').ClassyLoader({
		width:100,
		height:100,
		animate:false,
		percentage:0,
		speed:1,
		start:"right",
		showText:true,
	    diameter:40,
	    lineColor:"#459DF5",
	    lineWidth:18
	}); 
	loader.show();
	that.loader = loader;
	that.currentDivId = divId;		
	console.log("sql==" + sqllist);
	
	that.statusSum = 0; //统计已经查询完毕的所有sql的条数
	that.percentValue = 0;  // 累计进度条的百分比
	
	that.perList = new Array(); //记录每条sql的百分比
	
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
		that.perList[i] = 0;
		// console.log("初始化"+i+"=="+progressCanvas.perList[i]);
	}

	var progressCanvasUlHtml = "";
	var progressCanvastabHtml = "";
	
	//这里应该是点击详细信息时出现的内容
	for ( var i = 0; i < sqllist.length; i++) {
		if (i == 0) {
			progressCanvasUlHtml += '<li class="down">查询1</li>';
			progressCanvastabHtml += '<div class="tbli"><div class="lti_tip"><span class="tip_boxspan">查询SQL='
					+ sqllist_inner[i].substr(0, 30)
					+ '...'
					+ '<div class="tip_box" >'
					+ sqllist_inner[i]
					+ '"</div></span></div><div class="lti_box" id="circleDiv_executeLog'
					+ i + '"></div></div>';
		} else {
			progressCanvasUlHtml += "<li>查询" + (i + 1) + "</li>";
			progressCanvastabHtml += '<div class="tbli" style="display:none;"><div class="lti_tip"><span class="tip_boxspan">查询SQL='
					+ sqllist_inner[i].substr(0, 30)
					+ '...'
					+ '<div class="tip_box" >'
					+ sqllist_inner[i]
					+ '"</div></span></div><div class="lti_box" id="circleDiv_executeLog'
					+ i + '"></div></div>';

		}
	}
	
	
	$("#"+divId).find("#circleProgressUl").html(progressCanvasUlHtml);
	$("#"+divId).find("#circleProgressTab").html(progressCanvastabHtml);
	ProgressCanvas.prototype.initTab(that);
	
	
	var curSum = [ 0 ];
	
	for ( var i = 0; i < sqllist.length; i++) {  //依次对每条sql提交查询
		if (sqllist[i].indexOf("&") >= 0) {
			ProgressCanvas.prototype.getOperationId(sqllist_inner[i], functionlist[i], i, reflectClass, sqlsum, curSum, that, sqllist[i].split("&")[1]); //?
		} else {
			ProgressCanvas.prototype.getOperationId(sqllist_inner[i], functionlist[i], i, reflectClass, sqlsum, curSum,that);
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
ProgressCanvas.prototype.getOperationId = function(sql, fun, bb, add, sqlsum, curSum, that, cc) {
	that.canel = 0;
	that.startTime = new Date();
	noce.ajax("pages_util_Progressbar_submitCmd.action", "cmd=" + encodeURIComponent(sql) + "&database=" + "2", function(msg) {
		var operationId = msg.cmdId;
		that.handIds.push(operationId);
		ProgressCanvas.prototype.getStatusAnsLogs(operationId, fun, bb, add, sqlsum, curSum, cc,that);

	}, false);
};

/**
 * 通过查询返回的operationId标志查询日志
 */
ProgressCanvas.prototype.getStatusAnsLogs = function(cmdId, fun, bb, add, sqlsum, curSum, cc,that) {
	noce.ajax(
					"pages_util_Progressbar_getCmdExecLogBy.action",
					"cmdId=" + cmdId,
					function(msg) {
						var status = msg.status;
						var log = msg.log;
						var i = log.indexOf("%");
						var log1 = log.substring(0, i);
						var j = log1.lastIndexOf(" ");
						var log2 = log1.substring(j, i);

						// progressCanvas.percentValue=progressCanvas.percentValue+parseInt(log2)/sqlsum;

						that.perList[parseInt(bb)] = parseInt(log2)
								/ sqlsum;

						// 取值
						var percent = 0;
						for ( var i = 0; i < sqlsum; i++) {// 初始化百分比数组，全部置为0
							percent += parseInt(that.perList[i]);
						}						
						that.loader.draw(percent);
						console.log("percent"+bb+"=="+percent);
						$("#"+that.currentDivId).find("#circleDiv_executeLog" + bb).append(log);
						if (that.canel == 0) {
							if (status == true) {
								that.statusSum++;
								curSum[0]++;
								that.endTime = new Date(); // 为查询结束时间赋值

								$("#"+that.currentDivId).find("#circleDiv_executeLog" + bb).append(
										ProgressCanvas.prototype.getUseTime(
												that.startTime,
												that.endTime));
								$("#"+that.currentDivId).find("#circleDiv_executeLog" + bb).append("<hr>");
								if (that.statusSum == sqlsum) {
									that.loader.draw(100);
									$("#"+that.currentDivId).find("#circle_loading").remove();
									$("#"+that.currentDivId).find(".pcbox_nr").show();
								}
								ProgressCanvas.prototype.getResult(cmdId, fun, bb, add,
										sqlsum, curSum, cc,that);
							} else {
								var timeoutId = setTimeout(ProgressCanvas
										.prototype.getStatusAnsLogs(cmdId, fun, bb, add,
												sqlsum, curSum, cc,that), 3000);
								that.logTimeoutIds.push(timeoutId);

							}
						}

					}, false);
};

/**
 * 通过操作码查询，返回查询结果
 */
ProgressCanvas.prototype.getResult = function(cmdId, fun, bb, add, sqlsum, curSum, cc,that) {
	noce.ajaxAsync("pages_util_Progressbar_getCmdExecResult2.action",
			"cmdId=" + cmdId + "&reflectClass=" + add[parseInt(bb)]
					+ "&parameter=" + cc, function(msg) {

				// 查询完成。清除handleId
				var handIds = that.handIds;
				var newHandIds = new Array();
				for ( var i = 0; i < handIds.length; i++) {
					var handleId = handIds[i];
					if (Number(cmdId) != Number(handleId)) {
						newHandIds.push(handleId);
					}
				}

				that.handIds = newHandIds;
				console.log(msg);
				// var result=msg[0].result;
				var result = msg[0];
				fun(result);
				if (curSum[0] == sqlsum) {
					$("#"+that.currentDivId).find("#circle_loading").remove();
				}

			});
};

/**
 * 通过查询的开始时间和结束时间计算出查询耗时
 */
ProgressCanvas.prototype.getUseTime = function(startDate, endDate) {
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
ProgressCanvas.prototype.canelFunction = function(that) {
	// 取消轮询
	that.canel = 1;
	var logTimeoutIds = that.logTimeoutIds;
	for ( var i = 0; i < logTimeoutIds.length; i++) {
		clearTimeout(logTimeoutIds[i]);
	}

	// 后台发送取消请求
	if (that.handIds.length > 0) {
		$.ajax({
			type : "post",// 使用post方法访问后台
			data : {
				'cmdIds' : that.handIds.toString()
			},
			// dataType: "json",//返回json格式的数据
			url : "pages_util_Progressbar_cancelCmd.action",// 要访问的后台地址
			success : function(msg) {// msg为返回的数据，在这里做数据绑定
				that.handIds = new Array();
				that.logTimeoutIds = new Array();
			}
		});
	}
};

ProgressCanvas.prototype.createDiv = function(divId){
	var div='<div id="circle_loading" style="position:absolute; margin-left: 500px; width:118px; height:128px;">'+
	'<div class="lt_txt_1">正在加载...</div>'+
		'<div class="bgcolor">'+
			'<div id="circle_loadingClose" style="width:15px; height:15px; float:right; display:block; background:url(../images/loading_t_close.png) no-repeat; margin-top:1px; margin-right:2px; cursor:pointer;"></div>'+
		    '<div><canvas class="circleLoader"></canvas></div>'+
		'</div>'+
		'<div class="lt_txt_2" id="circle_infobtn">点击加载详细信息</div>'+		
	//<!-- 下面的内容是点击详细信息之后出现的 -->
		'<div class="circle_info" id="circle_info" style="width:520px;z-index: 9999;">'+
			'<div class="pcbox_nr">'+
			'<div class="tab">'+
				'<ul id="circleProgressUl">'+
					'<li class="down">清单表</li>'+
					'<li>汇总表</li>'+
				'</ul>'+
			'</div>'+
			'<div class="tabbox" id="circleProgressTab">'+
				'<div class="tbli">'+
					'<div class="lti_tip">'+
						'<span class="tip_boxspan">select * form aaa'+
							'<div class="tip_box">'+
								'<p>jisdjfalsdfkj; 10%</p>'+
								'<p>jisdjfalsdfkj; 10%</p>'+
								'<p>jisdjfalsdfkj; 10%</p>'+
								'<p>jisdjfalsdfkj; 10%</p>'+
								'<p>jisdjfalsdfkj; 10%</p>'+
							'</div> </span>'+
					'</div>'+
					'<div class="lti_box">'+
						'<p>jisdjfalsdfkj; 10%</p>'+
						'<p>jisdjfalsdfkj; 10%</p>'+
						'<p>jisdjfalsdfkj; 10%</p>'+
						'<p>jisdjfalsdfkj; 10%</p>'+
						'<p>jisdjfalsdfkj; 10%</p>'+
					'</div>'+
				'</div>'+
				'<div class="tbli" style="display:none;">'+
					'<div class="lti_box">'+
						'<p>jisdjfalsdfkj; 10%</p>'+
						'<p>jisdjfalsdfkj; 10%</p>'+
						'<p>jisdjfalsdfkj; 10%</p>'+
						'<p>jisdjfalsdfkj; 10%</p>'+
						'<p>jisdjfalsdfkj; 10%</p>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'</div>'+
		'</div>'+
	'</div>';
	$("#"+divId).append(div);
}

ProgressCanvas.prototype.initTab = function(that) {
	// 浏览器关闭，浏览器刷新 ，取消查询
	$(window).unload(function() {
		ProgressCanvas.prototype.canelFunction(that);
	});
	// 关闭加载条
	$("#"+that.currentDivId).find("#circle_loadingClose").click(function() {
		$("#"+that.currentDivId).find("#circle_loading").hide();
		ProgressCanvas.prototype.canelFunction(that);
	});
	// 日志信息显示
	$("#"+that.currentDivId).find("#circle_infobtn").click(function() {
		var ob = $("#"+that.currentDivId).find("#circle_info");
		var b_dis = ob.css("display");
		if (b_dis == "none") {
			ob.show();
		} else {
			ob.hide();
		};
	});
	
	$("#"+that.currentDivId).find(".pcbox_nr .tab li").click(
			function() {
				var idx = $(this).index();
				$(this).addClass("down").siblings().removeClass("down");
				$(this).parent().parent().siblings(".tabbox").children(".tbli")
						.eq(idx).show().siblings().hide();
			});
};
}

