// JavaScript Document
var myJqTipsBoxHtml='<div id="myJqTipsBox" class="myJqTipsBox">'+
  '<div id="myJqTipsBox_inner" class="inner">'+
    '<div id="myJqTipsBox_tltle" class="tltle">'+
      '<div id="myJqTipsBox_tltle_text" class="l"></div>'+
      '<div class="r"><input type="button" class="closeBtn" value="" onclick="hideTipsBox();" /></div>'+
    '</div>'+
    '<div id="myJqTipsBox_content" class="content">'+
    '</div>'+
  '</div>'+
  '<iframe src="" frameborder="0" id="myJqTipsBox_ieframe" class="ieFrame"></iframe>'+
'</div>'+
'<div id="myJqTipsBoxZzBg" class="myJqTipsBoxZzBg"><iframe src="" frameborder="0" id="zzBgIeframe"></iframe></div>';

$(document).ready(function(){
	$("body").prepend(myJqTipsBoxHtml);
});

function showTipsBox(width, height, title, cont, isFrame){
	var zzBg = $("#myJqTipsBoxZzBg");
	var zzBgAndFrame = $("#myJqTipsBoxZzBg, #zzBgIeframe");
	var tipsBox = $("#myJqTipsBox");
	
	$("#myJqTipsBox_tltle_text").html(title);
	
	var body_mt = $("body").css("margin-top").split("px")[0];
	var body_mb = $("body").css("margin-bottom").split("px")[0];
	var body_ml = $("body").css("margin-left").split("px")[0];
	var body_mr = $("body").css("margin-right").split("px")[0];
	if(body_mt == "auto"){ body_mt = 0;}
	if(body_mb == "auto"){ body_mb = 0;}
	if(body_ml == "auto"){ body_ml = 0;}
	if(body_mr == "auto"){ body_mr = 0;}
	var bodySjHeight = $("body").outerHeight() + body_mt * 1 + body_mb * 1;
	var bodySjWidth = $("body").outerWidth() + body_ml * 1 + body_mr * 1;
	
	if(bodySjHeight < $(window).height()){
		zzBgAndFrame.height($(window).height());
	}else{
		zzBgAndFrame.height(bodySjHeight);		
	}
	
	if(bodySjWidth < $(window).width()){
		zzBgAndFrame.width($(window).width());
	}else{
		zzBgAndFrame.width(bodySjWidth);		
	}
	
	if(width != "" && height != ""){
		$("#myJqTipsBox, #myJqTipsBox_ieframe").css({"width": width, "height": height});
		$("#myJqTipsBox_inner").css({"width": width - 2, "height": height - 2});
		$("#myJqTipsBox_tltle").css({"width": width - 12});
		$("#myJqTipsBox_content").css({"width": width - 2,"height": height - 27});
	}
	
	if(isFrame){
		$("#myJqTipsBox_content").html('<iframe src="' + cont + '" frameborder="0" id="myJqTipsBox_content_iframe" style="width:100%; height:100%;"></iframe>');
	}else{
		$("#myJqTipsBox_content").html(cont);
	}
	
	var _version = $.browser.version;
	if( _version == 6.0){
		tipsBox.css({"left": ($("body").width() - tipsBox.width()) / 2});
	}else{
		tipsBox.css({
			"left": ($("body").width() - tipsBox.width()) / 2,
			"top": ($(window).height() - tipsBox.height()) / 2
		});
	}
	
	$("#myJqTipsBox_ieframe, #zzBgIeframe").css({"opacity": 0});
	zzBg.css({"opacity": 0.3});
	$("#myJqTipsBox, #myJqTipsBoxZzBg").show();
}

function hideTipsBox(){
	$("#myJqTipsBox, #myJqTipsBoxZzBg").hide();
}