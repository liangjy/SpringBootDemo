
(function($) {
	$.fn.extend({
		page : function(options) {
			var defaults = {
			    url:'',
			    pageTool:''
			}; 
			options = $.extend(defaults, options); 
	
	    function prevPage(){ 
		if(currentNumber==1){ 
		   gsta.alert("已经是第一页"); 
		}else{
		currentNumber = parseInt(currentNumber)-1; 
		 toPage(currentNumber);
		}  
		};

		function nextPage(){ 
		if(currentNumber==lastNumber){
		  gsta.alert("已经是最后一页");
		}else{
		currentNumber = parseInt(currentNumber)+1;
		 toPage(currentNumber);
		}   
		};

		function roundPage(){
		  var pageNumber = $("#pageNumber").val();
		  toPage(pageNumber);
		};


		function lastPage(){ 
		var lastNumber = $("#lastNumber").val();
		toPage(lastNumber); 

		};

		function currentPage(){
		  toPage(currentNumber);
		} 
		
		}
	
	}) 
	
})(jQuery);
			

