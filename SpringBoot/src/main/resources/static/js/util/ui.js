var noceUI = {};
noceUI.gugueExpanded = false;
noceUI.menuExpanded = false;
/**
 * 动态设置界面高度和宽度
 */
noceUI.setSizeByClient = function() {
  				//根据浏览器高度设置body高度和高度
					var windowHeight = $(window).height();
					var centerHeight = (windowHeight-65-25);
					$("#main").css("height",centerHeight+"px");
					$("#left").css("height",centerHeight+5+"px");
					$("#pc_listb_cover,#ifmContent").css("height",centerHeight+"px");
					//收缩app图标
					$("#expanded_gugue,#expand_gugue").css("top",centerHeight/2-25+"px");
					
//					宽度设置
					var windowWidth = $(window).width();//获取浏览器宽度
					$("#buttom").width(windowWidth);
					var leftWidth = 175+1+1;//页面宽度控制175px左边菜单宽度，1px菜单与main间隔
					//判断左侧菜单是否收缩
					if(noceUI.menuExpanded){
						leftWidth = 21+1;
					}
					
					$("#main").css("width",windowWidth-leftWidth+"px");//设置main宽度
					
					var perception_content_width = $(".perception_content").width();
					
//					优良率
					if(noceUI.gugueExpanded){
						$("#pc_listb_situation div.table-view").find("div[id]").css("width",(perception_content_width-20)*0.98+"px");
						//优良率百分比居中
						$("#pc_listb_situation .appValue").css("left",(windowWidth-leftWidth)*0.48-60+"px");
					}else{
						$("#pc_listb_situation div.table-view").find("div[id]").css("width",(perception_content_width-20)*0.48+"px");
						//优良率百分比居中
						$("#pc_listb_situation .appValue").css("left",(windowWidth-leftWidth)*0.48/2-60+"px");
					}
//					客服感知
					$("#pc_listb_customPrece div.table-view").children("div[id]").css("width",(perception_content_width-20)*0.98-160+"px").addClass("marg_chart");
					$("#pc_listb_customPrece .appValue").css("left",(windowWidth-leftWidth)*0.48-60+"px");
					
//					感知指标_分布图
					$("#line_package_perce,#line_page_perce,#line_video_perce").css("width",(perception_content_width-20)*0.99+"px");
					
//					质差问题定界
					$("#container1_poorBound").css("width",(perception_content_width-20)*0.99+"px");
					$("#containerTable_poorBound").css("width",(perception_content_width-20)*0.99+"px");
					$("#container2_poorBound,container3_poorBound").css("width",(perception_content_width-20)*0.99/2-20+"px");
//					关联分析
					$("#associations_lenged").css("margin-left",(perception_content_width-20)*0.5-230+"px");
					
					$("#flowChartAll").css("width",(perception_content_width-20)*0.98-160+"px");
					//					终端归集分析
					$("#pc_listb_analysisTerminal").find("div[id$='_bar'][id^='analysisTerminal_']").css("width",(perception_content_width-20)*0.98-160+"px");
					$("#pc_listb_analysisApplication").find("div[id$='_bar'][id^='analysisApplication_']").css("width",(perception_content_width-20)*0.98-160+"px");
					
					$("#pc_listb_analysisTerminaldpi").find("div[id$='_bar'][id^='analysisTerminal_']").css("width",(perception_content_width-20)*0.98-160+"px");
					$("#pc_listb_analysisApplicationdpi").find("div[id$='_bar'][id^='analysisApplication_']").css("width",(perception_content_width-20)*0.98-160+"px");
					
  			};




/*
 * 左侧菜单展开
 */
noceUI.packMenu = function(){
	$("#left").css("position","absolute");
	noceUI.setSizeByClient();
	
	$("#expand_menu").hide();
	$("#expanded_menu").hide();
	
	$("#u14").width(171);
	$("#left").animate({
		/*opacity: 'show',*/width:'175px'
	    }, 800,"linear",function(){
	    	noceUI.menuExpanded = false;
	    	$("#left").css("position","");
	    	$("#left").unbind('click').css("cursor","");
			noceUI.setSizeByClient();
			$("#expand_menu").show();
			
			noceUI.repairChartByMeun();
	    });
}
/*
 * 左侧菜单收缩
 */
noceUI.expandMenu = function(){
	$("#left").css("position","absolute");
	noceUI.menuExpanded = true;
	noceUI.setSizeByClient();
	
	$("#expand_menu").hide();
	$("#expanded_menu").hide();
	
	$("#left").animate({
		/*opacity: 'hide',*/width:'20px'
	    }, 800,"linear",function(){
//	    	$("#left").hide();
	    	$("#u14").width(0);
	    	$("#left").css("position","");
	    	$("#left").unbind('click').click(noceUI.packMenu).css("cursor","pointer");
	    	$("#expanded_menu").show();
	    	
	    	noceUI.repairChartByMeun();
	    });
}

/**
 * 自定义弹框（覆盖浏览器默认的alert）
 * @param c
 * @returns
 */
function alert( c ){
		art.dialog({
			content: c,
			fixed: true,
			lock: true,
			esc:true,
			background: '#000', // 背景色
			opacity: 0.67,	// 透明度
			close:function(){
				$("div[id^='pc_listb_']:visible").find(".tcx_btn").first().click();
			}
		});
}

/*
 * 展开优良率APP数据
 */
noceUI.packAppGugue = function(){
	
	situation.parent.find(".con1").show();
	situation.parent.find(".con2").css("width",'48%');
	
	noceUI.gugueExpanded = false;
	noceUI.setSizeByClient()
	$("#expanded_gugue").show();
	$("#expand_gugue").hide();
	situation.load(null,true);
}
/*
 * 收缩优良率APP数据
 */
noceUI.expandAppGugue = function(){
//	
	situation.parent.find(".con1").hide();
	situation.parent.find(".con2").css("width",'98%');
	
	noceUI.gugueExpanded = true;
	noceUI.setSizeByClient()
	$("#expanded_gugue").hide();
	$("#expand_gugue").show();
	
	situation.load(null,true);
}

/*
 * 菜单伸缩重绘图表事件
 */
noceUI.repairChartByMeun = function(){
	situation.load(null,true);//优良率
	customPrece.load(null,true);//客户感知
}

/*
 * tab添加悬浮样式
 */
noceUI.tabHover = function(){
$(".tab li").hover(
		function () {
			if($(this).filter(".down").length<1){
				$(this).addClass("hover").siblings().removeClass("hover");
			}
		},
		function () {
			$(this).removeClass("hover");
		}
	);
};

/**
 * 初始化UI
 */
$(function(){
	
	noceUI.tabHover();
	
	$("#expanded_menu").hide().click(noceUI.packMenu);//展开
	$("#expand_menu").show().click(noceUI.expandMenu);//收缩
	
	$("#expand_gugue").hide().click(noceUI.packAppGugue);//展开
	$("#expanded_gugue").show().click(noceUI.expandAppGugue);//收缩
	
	noceUI.setSizeByClient();
	window.onresize=noceUI.setSizeByClient;//监听
	

});