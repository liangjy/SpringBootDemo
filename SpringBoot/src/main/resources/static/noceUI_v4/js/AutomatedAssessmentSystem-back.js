/*
var defualtMeunConfig = {
	"专题分析" : "top100HotspotTendency"
};// key:value

$(function() {
	$('.header-nav-list').click(function() {
		var index = $(this).index();
		var menuName = $(this).text();
		defualtMeunConfig[menuName];
		$('.header-nav-list').eq(index).addClass('on').siblings().removeClass('on');
		$('.content-left').eq(index).show().siblings().hide();
		var $contentLeft = $('.content-left').eq(index);
		if ($contentLeft.find('.tree li a.on').length < 1) {
			console.log($contentLeft.find('.tree li a').text());
			// 是否有配置
			//if (typeof (defualtMeunConfig[menuName]) != "undefind") {
			if (typeof (defualtMeunConfig[menuName]) != "undefined") {
				$("#" + defualtMeunConfig[menuName]).click();
			} else {
				// 没有配置默认第一个菜单选中
				var $muen = $contentLeft.find('.tree li a:first');
				console.log($muen.attr("id"));
				if ($muen.attr("id") == "menu") {
					$muen.parents("li").find("ul  li a:first").click();
				} else {
					$muen.click();
				}
			}
		} else {
			console.log($contentLeft.find('.tree li a.on').text());
			$contentLeft.find('.tree li a.on').click();
		}
		setTimeout(function() {
			if ($("div.pc_listb:visible").attr("id") == "pc_listb_hotspotZoneAnalyze") {
				$("div.pc_listb:visible").find("div.bwin").first().hide();
			} else {
				$("div.pc_listb:visible").find("div.bwin").first().show();
			}
		}, 2000);
	});
	$('.tree li a').click(function() {
		var $contentLeft = $(this).parents('.content-left');
		$contentLeft.find('.tree li a').removeClass('on');
		$(this).addClass('on');
	});

	var h1 = $(window).height();
	var h2 = $('.top-bar').height();
	var h3 = $('.header').height();
	var h4 = $('.footer').height();
	$('.content-left,.content-right').css('height', (h1 - h2 - h3 - h4 - 11));
	$(window).resize(function() {
		var h1 = $(window).height();
		var h2 = $('.top-bar').height();
		var h3 = $('.header').height();
		var h4 = $('.footer').height();
		$('.content-left,.content-right').css('height', (h1 - h2 - h3 - h4 - 11));
	});

	// default events
	// $('.content-left').eq(0).find('.tree li a:first').click();
	$('.content-left').each(function(i) {
		var $this = $(this);
		if ($this.find('ul.tree').html().trim() == "") {
			$('.header-nav-list').eq(i).hide();
		}
	});

	$('.pcbox_nr .ptb table').addClass('table table-bordered');
});
*/