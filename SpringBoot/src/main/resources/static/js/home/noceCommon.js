var noceCommon = {
};

$(function() {
	/* 左边一级菜单权限不同下显示的布局,如果菜单数是单数，最后一个菜单独占一行 */
	var length = $(".header-nav li.show").length;
	var odd = length % 2; 
	if ( odd==1 ) { //奇数
		$(".header-nav .show").last().addClass("li-big");
	} 
	
	/* 左边菜单的高度  */
	var invo = noceUtil.GetQueryString("hideFramework");
	var invo2 = noceUtil.GetQueryString("hideFooter");
	var height = 0;
	if(invo==1){
		height=window.innerHeight;
	}else if(invo2==1){
		height=window.innerHeight;
	}else{
		height=window.innerHeight-$('.header').height();
	}

    $(".left-info").height($(".perception_content").height());
    if($(".perception_content").css("height")>="685px"){
    	$(".divBG").css("padding","11px 5px");
    }else{
    	$(".divBG").css("padding","4px 5px");
    }
	/* 窗口改变时左边菜单的高度重新设置 */
	$(window).resize(function () {
		heightH();
		heightF();
		$("#pc_listb_badCellAnalysis .right-mainContent").height($(".perception_content").height()-65);
		if($(".perception_content").height()>=685){
	    	$(".divBG").css("padding","11px 5px");
	    	if($(".perception_content").height()>=715){
		    	if ($(".header").is(":hidden") && $(".footer").is(":hidden")){
					$(".divBG").css("padding","17px 5px");
				}else{
					$(".divBG").css("padding","11px 5px");
				}
	    	}
	    }else{
	    	if ($(".header").is(":hidden") && $(".footer").is(":hidden")){
	    		$(".divBG").css("padding","10px 5px");
			}else{
				$(".divBG").css("padding","4px 5px");
			}
	    }
	});
});
/* 左边右下角的箭头点击，左边隐藏，右边最大化 */

function leftMenu () {
    if ($(".content-left").is(":visible")) {
        $(".content-left").hide();
        $(".content-right").css("margin-right","0px");
        $(".content").css("padding-right","0");
        $(".leftMenu img").css("transform","rotate(180deg)");
        $(".showHideIcon").css("left","0px");
        $(".myTabPan").css("overflow","hidden");
    } else{
        $(".content-left").show();
        $(".content-right").css("margin-right","-180px");
        $(".content").css("padding-right","180px");
        $(".leftMenu img").css("transform","rotate(0deg)");
        $(".showHideIcon").css("left","140px");
        $(".myTabPan").css("overflow","auto");
    }
}
function topHeader () {
	if ($(".header").is(":visible")) {
		$(".header").hide();
        $(".header").css("margin-top",'0px');
        $(".mainWrapDiv").css("padding-top",'0px');
		$(".topHeader img").css("transform","rotate(180deg)");
	} else {
		$(".header").show();
        $(".header").css("margin-top",'-38px');
        $(".mainWrapDiv").css("padding-top",'38px');
		$(".topHeader img").css("transform","rotate(0deg)");
	}
	heightH();
}
function downFooter () {
	if ($(".footer").is(":visible")) {
		$(".footer").hide();
        $(".footer").css("margin-bottom",'0');
        $(".content-right").css("padding-bottom",'0');
		$(".downFooter img").css("transform","rotate(180deg)");
	} else {
		$(".footer").show();
        $(".footer").css("margin-bottom",'-20px');
        $(".content-right").css("padding-bottom",'20px');
		$(".downFooter img").css("transform","rotate(0)");
	}
	heightF();
}

function heightH() {
	var mapTop=parseInt($(".check-info").css("min-height"))+parseInt($(".map-top").css("min-height"));
	if ($(".header").is(":visible")) {
		var height=window.innerHeight-$('.header').height();
	    if ($(".footer").is(":visible")) {
	    	$(".left-info").height(height-$(".footer").height());
	    	$("#pc_listb_OpersComp .main-content").height($(".perception_content").height()-20);
	    	$(".mapContent").height($(".perception_content").height()-mapTop);
	    	$("#RSRPGridMap_baiduMap").height($(".perception_content").height()-$(".check-info").height()-5);
	    }else{
	    	$(".left-info").height(height);
	    	$("#pc_listb_OpersComp .main-content").height($(".perception_content").height()-20);
	    	$(".mapContent").height($(".perception_content").height()-mapTop);
	    	$("#RSRPGridMap_baiduMap").height($(".perception_content").height()-$(".check-info").height()-5);
	    }
	    if($(".perception_content").height()>=659){
	    	$(".divBG").css("padding","10px 5px");
	    }else{
	    	$(".divBG").css("padding","4px 5px");
	    }
	} else{
		var height=window.innerHeight;
	    $("#RSRPGridMap_baiduMap").height(height);
	    if ($(".footer").is(":visible")) {
	    	$(".left-info").height(height-$(".footer").height());
	    	$("#pc_listb_OpersComp .main-content").height($(".perception_content").height()-20);
	    	$(".mapContent").height($(".perception_content").height()-mapTop);
	    	$("#RSRPGridMap_baiduMap").height($(".perception_content").height()-$(".check-info").height()-5);
	    }else{
	    	$(".left-info").height(height);
	    	$("#pc_listb_OpersComp .main-content").height($(".perception_content").height()-20);
	    	$(".mapContent").height($(".perception_content").height()-mapTop);
	    	$("#RSRPGridMap_baiduMap").height($(".perception_content").height()-$(".check-info").height()-5);
	    }
	    if($(".perception_content").height()>=659){
	    	$(".divBG").css("padding","10px 5px");
	    }else{
	    	$(".divBG").css("padding","4px 5px");
	    }
	}
}
function heightF() {
	var mapTop=parseInt($(".check-info").css("min-height"))+parseInt($(".map-top").css("min-height"));
	if ($(".footer").is(":visible")) {
	    if ($(".header").is(":visible")) {
	    	var height=window.innerHeight-$(".header").height();
	    	$(".left-info").height(height-$(".footer").height());
	    	$("#pc_listb_OpersComp .main-content").height($(".perception_content").height()-20);
	    	$(".mapContent").height($(".perception_content").height()-mapTop);
	    	$("#RSRPGridMap_baiduMap").height($(".perception_content").height()-$(".check-info").height()-5);
	    }else{
	    	var height=window.innerHeight;
	    	$(".left-info").height(height-$(".footer").height());
	    	$("#pc_listb_OpersComp .main-content").height($(".perception_content").height()-20);
	    	$(".mapContent").height($(".perception_content").height()-mapTop);
	    	$("#RSRPGridMap_baiduMap").height($(".perception_content").height()-$(".check-info").height()-5);
	    }
	    if($(".perception_content").height()>=659){
	    	$(".divBG").css("padding","10px 5px");
	    }else{
	    	$(".divBG").css("padding","4px 5px");
	    }
	} else{
	    if ($(".header").is(":visible")) {
	    	var height=window.innerHeight-$(".header").height();
	    	$(".left-info").height(height);
	    	$("#pc_listb_OpersComp .main-content").height($(".perception_content").height()-20);
	    	$(".mapContent").height($(".perception_content").height()-mapTop);
	    	$("#RSRPGridMap_baiduMap").height($(".perception_content").height()-$(".check-info").height()-5);
	    }else{
	    	var height=window.innerHeight;
		    $("#RSRPGridMap_baiduMap").height(height);
	    	$(".left-info").height(height);
	    	$("#pc_listb_OpersComp .main-content").height($(".perception_content").height()-20);
	    	$(".mapContent").height($(".perception_content").height()-mapTop);
	    	$("#RSRPGridMap_baiduMap").height($(".perception_content").height()-$(".check-info").height()-5);
	    }
	    if($(".perception_content").height()>=659){
	    	$(".divBG").css("padding","10px 5px");
	    }else{
	    	$(".divBG").css("padding","4px 5px");
	    }
	}
}


//var flag = false;
function loadApp (e) {
	if($(e).attr("name")=="notice"){
		$(e).parent().addClass('active');
	}
	/*if(!flag){
		//首次打开页面的时候隐藏子目录
		$('.left-menu li:has(ul)').addClass('parent_li').find('> a').next("ul").hide();
	}*/
	console.log("e================"+e);
	var children = $(e).parent('li.parent_li').find(' > ul');
	if($(e).next().length>0){
		console.log($(e))
		if (children.is(":visible")) {
	        children.hide();
	        $(e).addClass('icon-plus-sign').removeClass('icon-minus-sign');
	        
	    } else {
	        children.show();
	        // flag = true;
	        $(e).siblings().removeClass("icon-plus-sign");
	        $(e).addClass('icon-minus-sign').removeClass('icon-plus-sign');
	    }
	}

}

noceCommon.loadAddSubIcon=function(){
	var htmls = '<a href="javascript:;" onclick="loadApp(this)" class="icon-plus-sign" style="float:left;height: 31px;width: 40px;position: absolute;z-index: 999;"></a>'
		/*判断是否有多级菜单，如果有就添加+图标 */
		$('.left-menu li:has(ul)').addClass('parent_li').find('> a').addClass('icon-plus-sign').before(htmls);
		if($(".icon-plus-sign").hasClass("icon-minus-sign")){
			$(".icon-plus-sign").prev().addClass('icon-plus-sign');
			$(".icon-plus-sign").prev().removeClass("icon-plus-sign");
		}
}

