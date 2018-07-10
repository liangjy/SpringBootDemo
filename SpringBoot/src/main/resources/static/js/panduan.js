//var flag;
$(function(){//bwBtnClose aCloseBtn
	
	$(".aCloseBtn").click(function(){
		$(this).parents(".bwTipBox").slideUp();
		if($("#panduanCheck").is(':checked')){
			$.cookie('Chrome_tip_flag', 1); 
		};
	});	
	
	var fireFoxTipFlag = $.cookie('Chrome_tip_flag');
	if(!fireFoxTipFlag == 1){
		if(isFirefox=navigator.userAgent.indexOf("Chrome")>0){
			$(".loginWrap").show();
			$(".perception_bottom").show();
			$("#panduan").hide();
		}else{
			$("#panduan").show(); 
		}	
	};
    document.onkeydown=function(e){
        if( e.altKey  && e.ctrlKey  && e.shiftKey ){//shit + alt + ctrl
            $(".loginWrap").show();
            $(".perception_bottom").show();
            $("#panduan").hide();
        }
        if(e.keyCode == 13){
            login();
		}
    }
});
