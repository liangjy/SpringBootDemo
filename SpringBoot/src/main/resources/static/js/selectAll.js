// JavaScript Document

/* 
 * @xieze [2012-12-12]
 * and open JavaScript Document in the editor
 */
$(function(){
	$('#selectedAll').selectAll({
		allId:'#selectedAll',
		selectName:'collctTime',
		allCheck:'#allCheck1',
		allNotCheck:'#allNtoCheck1'
	});	
});

;(function($){
	$.fn.extend({
		"selectAll":function(options){
			options:$.extend({
				allId:true,
				selectName:true,
				allCheck:true,
				allNotCheck:true
				
			},options);
				$(options.allId).click(function(){
					if(this.checked){
						$('[name='+options.selectName+']:checkbox').attr('checked',true);
					}else{
						$('[name='+options.selectName+']:checkbox').attr('checked',false);
					}
				});
				$(options.allCheck).click(function(){
						$('[name='+options.selectName+']:checkbox').attr('checked',true);
				});
				$(options.allNotCheck).click(function(){
						$('[name='+options.selectName+']:checkbox').attr('checked',false);
				});
				
				$('[name='+options.selectName+']').click(function(){
					var flag=true;
					$('[name='+options.selectName+']:checkbox').each(function(){
						if(!this.checked){
							flag=false;
							}
					});
					$(options.allId).attr('checked',flag);
				});
				return this;
		}
	});
})(jQuery);