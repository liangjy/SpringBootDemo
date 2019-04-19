function leftHideShow() {
	var left = document.getElementById('left_home');
	var leftIcon = document.getElementById("leftIcon");
	var right = document.getElementById("right");
	if (left.style.display == 'none') { //如果左边栏隐藏时
		left.style.display = ''; //将左边栏展开
		right.style.width = '85%';
		leftIcon.style.transform = 'rotate(0deg)';
	} else {
		left.style.display = 'none'; //将左边栏隐藏
		right.style.width = '100%';
		leftIcon.style.transform = 'rotate(180deg)';
	}
}

/**
 * 头部js伸缩
 */

/*function topHideShow() {

	//获取浏览器的高度
	var windowHeight = $(window).height();

	//获取topbar的高度
	var top_bar_Height = $("#top-bar").height();
	
	//获取收缩的顶部栏的高度
	var headHeight = $("#header").height();

	//获取底部的高度
	var footHeight = $('.footer').height();

	var top = document.getElementById('header'); // 要伸缩的部分
	var topIcon = document.getElementById("topIcon"); //图标部分
	
	if (top.style.display == 'none') { //如果顶部栏隐藏时
		topIcon.style.top=(top_bar_Height+headHeight)+10+"px";
		top.style.display = ''; //将顶部栏展开
		//topIcon.style.top="118px";
		$('.content-left,.content-right').css('height', (windowHeight - top_bar_Height - headHeight - footHeight-11));
		topIcon.style.transform = 'rotate(0deg)';  //图标旋转

	} else {
		topIcon.style.top=top_bar_Height-7+"px";
		top.style.display = 'none'; //将顶部栏隐藏
	//	topIcon.style.top="38px";
		$('.content-left,.content-right').css('height', (windowHeight - top_bar_Height - footHeight - 5));
		topIcon.style.transform = 'rotate(180deg)'; //图标旋转
	}
}*/


//将顶部全部隐藏
/*function topHideShow() {

	//获取浏览器的高度
	var windowHeight = $(window).height();

	//获取topbar的高度
	var top_bar_Height = $("#top-bar").height();
	
	//获取收缩的顶部栏的高度
	var headHeight = $("#header").height();

	//获取底部的高度
	var footHeight = $('.footer').height();

	var top = document.getElementById('header'); // 要伸缩的部分
	var top_bar = document.getElementById('top-bar'); //补充的要伸缩的部分
	
	var topIcon = document.getElementById("topIcon"); //图标部分
	
	if (top.style.display == 'none' || top_bar.style.display == 'none') { 
		topIcon.style.top=(top_bar_Height+headHeight)+10+"px";
		top.style.display = ''; //将顶部栏展开
		top_bar.style.display = '';
		$('.content-left,.content-right').css('height', (windowHeight - top_bar_Height - headHeight - footHeight-11));
		topIcon.style.transform = 'rotate(0deg)';  //图标旋转

	} else {
		topIcon.style.top= 7+"px";
		top.style.display = 'none'; //将顶部栏隐藏
		top_bar.style.display = 'none';
		$('.content-left,.content-right').css('height', (windowHeight  - footHeight));
		topIcon.style.transform = 'rotate(180deg)'; //图标旋转
	}
}*/


//将底部也隐藏
function topHideShow() {

	//获取浏览器的高度
	var windowHeight = $(window).height();

	//获取topbar的高度
	var top_bar_Height = $("#top-bar").height();
	
	//获取收缩的顶部栏的高度
	var headHeight = $("#header").height();

	//获取底部的高度
	var footHeight = $('.footer').height();

	var top = document.getElementById('header'); // 要伸缩的部分
	var top_bar = document.getElementById('top-bar'); //补充的要伸缩的部分
	
	var topIcon = document.getElementById("topIcon"); //图标部分
	
	if (top.style.display == 'none' || top_bar.style.display == 'none') { 
		topIcon.style.top=(top_bar_Height+headHeight)+10+"px";
		top.style.display = ''; //将顶部栏展开
		top_bar.style.display = '';
		$('.content-left,.content-right').css('height', (windowHeight - top_bar_Height - headHeight - footHeight-11));
		topIcon.style.transform = 'rotate(0deg)';  //图标旋转

	} else {
		topIcon.style.top= 7+"px";
		top.style.display = 'none'; //将顶部栏隐藏
		top_bar.style.display = 'none';
		$('.content-left,.content-right').css('height', (windowHeight-footHeight));
		topIcon.style.transform = 'rotate(180deg)'; //图标旋转
	}
}




/**
 * 头部js伸缩
 */
function topHideShow2() {
	
	//获取浏览器的高度
	var windowHeight = $(window).height();

	//获取topbar的高度
	var top_bar_Height = $("#top-bar").height();
	
	//获取收缩的顶部栏的高度
	var headHeight = $("#header").height();

	//获取底部的高度
	var footHeight = $('.footer').height();
	
	var topIcon = document.getElementById("topIcon"); //图标部分
	var top = document.getElementById('header'); // 要伸缩的部分
	
	if ($('#header').is(":hidden") ) {
		topIcon.style.top=(top_bar_Height+headHeight)+10+"px";
		//展开:动画效果：向下伸展
		$('#header').slideDown("slow", function() {
			//top.style.display = ''; //将顶部栏展开
			$('.content-left,.content-right').css('height', (windowHeight - top_bar_Height - headHeight - footHeight-11));
			topIcon.style.transform = 'rotate(0deg)';  //图标旋转
		});
		
	} else {
		topIcon.style.top=top_bar_Height-7+"px";
		//收缩：动画效果，向上收缩
		$('#header').slideUp("slow", function() {
			//top.style.display = 'none'; //将顶部栏隐藏
			$('.content-left,.content-right').css('height', (windowHeight - top_bar_Height - footHeight - 5));
			topIcon.style.transform = 'rotate(180deg)'; //图标旋转
		});
	}
}



$(function(){
	//获取浏览器的高度
	var windowHeight = $(window).height();

	//获取topbar的高度
	var top_bar_Height = $("#top-bar").height();
	
	//获取收缩的顶部栏的高度
	var headHeight = $("#header").height();

	//获取底部的高度
	var footHeight = $('.footer').height();
	
	var topIcon = document.getElementById("topIcon"); //图标部分
	var top = document.getElementById('header'); // 要伸缩的部分
	
	topIcon.style.top=(top_bar_Height+headHeight)+10+"px";
	
	
	topIcon.style.display = "block";
});










