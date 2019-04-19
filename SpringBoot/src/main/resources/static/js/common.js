function showException(msg){ 
	if(msg!=null&&msg.length>0){
		
		if(msg.indexOf("hive sql 语法错误")>0){
			
			gsta.alert("Hive SQL 语法错误，请检查");
			
		}else{
		
		art.dialog({
		    id: 'msg',
		    title: '系统异常',
		    icon: 'error',
		    content:msg,
		    width: 450, 
		    left: '50%',
		    top: '10px',
		    fixed: true,
		    drag: false,
		    resize: false 
		}); 
		
		}
	}
}


function byteLength(str) {
	 var byteLen = 0, len = str.length;
	 if( !str ) return 0;
	 for( var i=0; i<len; i++ )
	  byteLen += str.charCodeAt(i) > 255 ? 2 : 1;
	 return byteLen;
}


//截取字符串 包含中文处理 
//(串,长度,增加...) 
function subString(str, len, hasDot) 
{ 
 var newLength = 0; 
 var newStr = ""; 
 var chineseRegex = /[^\x00-\xff]/g; 
 var singleChar = ""; 
 var strLength = str.replace(chineseRegex,"**").length; 
 for(var i = 0;i < strLength;i++) 
 { 
     singleChar = str.charAt(i).toString(); 
     if(singleChar.match(chineseRegex) != null) 
     { 
         newLength += 2; 
     }     
     else 
     { 
         newLength++; 
     } 
     if(newLength > len) 
     { 
         break; 
     } 
     newStr += singleChar; 
 } 

 if(hasDot && strLength > len) 
 { 
     newStr += "..."; 
 } 
 return newStr; 
}










/*ajax*/
var gsta = {
		
		diaLog:function(options){
			art.dialog(options);
		}, 
		ajax : function(options) { 
			options.data = "ajax=true&"+options.data;
			var _error=options.error;  
			options.error = function(XMLHttpRequest,textStatus,errorThrown){ 
                showException(XMLHttpRequest.responseText);
                gsta.closeLoading();
                if(typeof(_error)=='function'){  
                    _error.apply(this, arguments);  
                }  

            }; 
			$.ajax(options);
		}, 
      alert:function(msg,yes){
    	    art.dialog({id:'dialog',content:msg,lock:true,opacity:.1, ok: function (here) {
    	    	art.dialog({id:'dialog'}).close();
    	    	if(yes!=null){
    	    	 return yes.call(this, here);
    	    	}
    	    	
	        }});
      }, 
      loading:function(msg,followId){  
    	   art.dialog({content:"<div style=\"display:block;\">"+msg+"</div>",follow:document.getElementById(''+followId+''),id:'loadingDialog',lock:true,opacity:.1}); 
       
    	   //$("#"+followId).showLoading({msg:msg});
      
      },
      closeLoading:function(){ 
    	  art.dialog({id:'loadingDialog'}).close();  
    	  /*
    	  $(".loading-indicator").remove();
    	  $(".loading-indicator-overlay").remove();
    	  */
    	  
    	  
      },
      closeDialog:function(){
    	  
    	  $(".modal_close").click(); 
      },
      
      closeArtDialog:function(){
    	  
    	  $(".aui_close").click();
    	  
      },
      
      
      tip:function (content) { 
    	        return artDialog({
    	            id: 'Tips',
    	            title: false,
    	            cancel: false,
    	            fixed: true,
    	            lock: false
    	        })
    	        .content('<div style="padding: 0 1em;">' + content + '</div>')
    	        .time(1.5); 
      },
      confirm:function (content, yes, no) {
    	    return artDialog({
    	        id: 'Confirm',
    	        icon: 'question',
    	        fixed: true,
    	        lock: true,
    	        opacity: .1,
    	        content: content,
    	        ok: function (here) {
    	            return yes.call(this, here);
    	        },
    	        cancel: function (here) {
    	            return no && no.call(this, here);
    	        }
    	    });
    	},
    	
    	initTree:function(inputId,data,callBack){  
    		var setting = {	
				data: {
					key: {
						title: "name"
					},
					simpleData: {
						enable: true
					}				
				},
				view: {
					fontCss: getFontCss,
					showIcon:false
				},
				callback: {
					beforeClick: beforeClick,
					onClick: zTreeOnClick
				}
			}   
    		
    		var selectVal;
    		var selectId;
    		
    		var allData = data;
    		
    		var msg = "<div class=\"sn_search\" style=\"width:100%;\">"
    		+"<input class=\"sns_input\" id=\"search_text\">"
            +"<div id=\"search\" class=\"data_icon sns_btn\"></div></div>"
            +"<ul id=\"treeId\" class=\"ztree\" style=\"height:200px;overflow-y:auto;width:101%;\"></ul>";
    		
    		art.dialog({title:"选择",content:msg,lock:true,opacity:.1, ok: function (here) {
	              $("#"+inputId).val(selectVal);
	              callBack(selectId);
	              
	        }}); 
    		var tree = $.fn.zTree.init($("#treeId"),setting,data); 
    		$("#search").click(function(){ 
			    var nodes=tree.getNodesByParamFuzzy("name",$("#search_text").val(),null);
			    if($("#search_text").val()==""){
			    	nodes = allData;
			    }
			    if(nodes.length>0){
			    	tree.destroy();
			    	tree = $.fn.zTree.init($("#treeId"),setting,nodes);  
			    }else{		    
			        gsta.alert("该节点不存在！");
			    }					
			}); 
    		function zTreeOnClick(event, treeId, treeNode) { 
    			selectVal = treeNode.name; 
    			selectId = treeNode.id; 
    		};  
    	},
    	showTopic:function(data,selectedTopicIds,callBack){
    		var _topic="";
    		for(var i=0;i<data.length;i++){
                var topic = data[i];
                var isCheck = "";
                if(selectedTopicIds!=""){
                	var index = selectedTopicIds.toString().indexOf(topic.topicId);
                	if(index>=0){
                		isCheck = "checked='checked'";
                	}
                	
                }
                  _topic+="&nbsp;<input "+isCheck+" text=\""+topic.topicName+"\" name=\"topic_checkbox\" type=\"checkbox\" value=\""+topic.topicId+"\"/>"+topic.topicName;
             }
    		
    		
    		art.dialog({width:350,title:"选择",content:_topic,lock:true,opacity:.1, ok: function (here) {
	            
    			  //获取选择主题的id
    			var selectTopicIds ="";
    			
    			var selectTopicNames ="";
    			
    			$("input[name='topic_checkbox']").each(function(){ 
    	                if($(this).attr("checked")){
    	                	if(selectTopicIds==""){
    	                	  selectTopicIds = $(this).val(); 
    	                	  selectTopicNames = $(this).attr("text");
    	                	  
    	                	}else{
    	                	  selectTopicIds += ","+$(this).val();
    	                	  selectTopicNames += ","+$(this).attr("text");
    	                	}
    	                }
    	           })    
    	           
	              callBack(selectTopicIds,selectTopicNames);
	              
	        }});  
    		
    	}, 
    	sortListGroupByListId:function(listId){
    		
    		var notOrder = new Array();
    		$("#"+listId+" > li").each(function(){
    			
    			notOrder.push($(this));
    			
    		}); 
    		 
    		var sortOrder = notOrder.sort( 
    					function(a, b)  
    					{ 
    						
    						var keyA = $(a).html();
    						 var keyB = $(b).html();  
    					
    						 if(keyA > keyB) return 1;
    			             if(keyA < keyB) return -1;
    			              return 0; 
    					}
    		   );  
    		
    		
 
    		/*$("#"+listId+"").html("");  */
    		var htmlStr="";
    		$.each(sortOrder,function(index,value){
    		      htmlStr+=value.context.outerHTML;
    			/* $("#"+listId+"").append(value); */
    	    });  
    		$("#"+listId+"").html(htmlStr);
    		
    	}  

	};

;(function(){
	
	window.webCommon = (function(){
			
		//标签选择
		var label = {
		
			//标签窗口初始化
			selectLabel	: function(html_param){
				
				$(function(){
						   
					//绑定打开窗口事件
					sb_param.chooseBtn.bind("click",openBox);
					//关闭窗口
					sb_param.confirmBtn.click(function(){
						if(treeNodeName == ""){
							return false;
						}else{
							$("#focurMe").siblings("input").val(treeNodeName);
						};
						closeBox();
						$("#focurMe").attr("id","");
						
						//判断是否附加函数
						if(sb_param.closeFuc){
							sb_param.closeFuc();
						};
					});
					
					
					//树初始化
					$.fn.zTree.init(sb_param.treeId, sb_param.setting, sb_param.zNodes);
					
					sb_param.searchBtn.click(searchNode());
					sb_param.treekey.bind("focus", focusKey).bind("blur", blurKey).bind("propertychange", searchNode).bind("input", searchNode);		   
				
				
				});
				
				//配置参数
				var param = {
					treeId 		: true,						//树的ID
					treeName 	: true,						//树的name
					treekey		: true,						//搜索文本框
					searchBtn	: true,						//搜索按钮
					chooseBtn	: true,						//选择标签按钮
					chooseBox	: true,						//标签窗口id
					confirmBtn	: true,						//确定选择按钮
					lastValue	: "",
					nodeList	: [],
					fontCss		: {},
					_self		: true,
					closeFuc	: false,					//关闭窗口自定义操作函数
					setting		: {	
						data: {
							key: {
								title: "name"
							},
							simpleData: {
								enable: true
							}				
						}
					}};
					
				var sb_param = $.extend(param,html_param);
				
				//查找节点
				function searchNode(e) {
					var zTree = $.fn.zTree.getZTreeObj(sb_param.treeName);
					var value = $.trim(sb_param.treekey.val());
					if (sb_param.treekey.hasClass("empty")) {
						value = "";
					}
					if (sb_param.lastValue === value) return;
					sb_param.lastValue = value;
					if (value === "") return;
					updateNodes(false);
					
					sb_param.nodeList = zTree.getNodesByParamFuzzy("name", value);
					
					updateNodes(true);
				}
				
				//更新节点
				function updateNodes(highlight) {
					var zTree = $.fn.zTree.getZTreeObj(sb_param.treeName);
					for( var i=0, l=sb_param.nodeList.length; i<l; i++) {
						sb_param.nodeList[i].highlight = highlight;
						zTree.updateNode(sb_param.nodeList[i]);
					}
				}
				
				//获取焦点
				function focusKey(e) {
					if (sb_param.treekey.hasClass("empty")) {
						sb_param.treekey.removeClass("empty");
					}
				}
				//失去焦点
				function blurKey(e) {
					if (sb_param.treekey.get(0).value === "") {
						sb_param.treekey.addClass("empty");
					}
				}
				
				//打开窗口
				function openBox(){
					sb_param._self	= $(this);
					sb_param._self.attr("id","focurMe");
					var Twidth	= parseInt(sb_param._self.innerWidth());
					var Ttop	= parseInt(sb_param._self.offset().top)- 140;
					if(Ttop < 0){
						Ttop = 0;
					};
					var Tleft	= parseInt(sb_param._self.offset().left);
					sb_param.chooseBox.css({ top : Ttop , left : ((Tleft - 210) + Twidth)}).fadeIn(400);
				};
				
				//关闭窗口
				function closeBox(){
					sb_param.chooseBox.fadeOut(400);
				};
				
			},
			openBox		: function(){
				
					var _self	= $(this);
					var TchooseBox = _self.attr("box_id");
					_self.attr("id","focurMe");
					var Twidth	= parseInt(_self.innerWidth());
					var Ttop	= parseInt(_self.offset().top)- 140;
					if(Ttop < 0){
						Ttop = 0;
					};
					var Tleft	= parseInt(_self.offset().left);
					$("#"+TchooseBox).css({ top : Ttop , left : ((Tleft - 210) + Twidth)}).fadeIn(400);
				}
		};
		
		//return function
		return {
			selectLabel	: label.selectLabel,
			openBox		: label.openBox
		};
		
	})();

})();

 





//滚动到一定位置，固定DIV
	$.myPluginNav = {
	 rollBar:function(obj,copy,fix){
	  var rollId = $(obj);
	  var copyId = $(copy);
	  var offset = rollId.offset();
	  $(window).scroll(function(){
	   var scrollTop = $(window).scrollTop();
	   if(scrollTop >= offset.top){ 
		copyId.show();
	  	var rollIdW = copyId.width();
		rollId.css("width",rollIdW);
		rollId.addClass(fix);
		//以下code为IE6执行，本来不想兼容IE6，不过还是写了吧
		if ($.browser.msie){
		 isIE = $.browser.version;
		 switch(isIE){
		  case '6.0':
		  rollId.css({'position':'absolute','top':scrollTop});
		  break;
		 }
		}
	   }else{
		rollId.removeClass(fix);
		copyId.hide();
	   }
	  });
	 },
	 //左侧滚动到一定位置后标题固定
	 rollLeftNav:function(parent,objLi,copy,fix){
	  $(parent).scroll(function(){
		$.myPluginNav.rollLeftNavUpdata(parent,objLi,copy,fix);
	  });
	 },
	 //左侧滚动到一定位置后标题固定
	 rollLeftNavUpdata:function(parent,objLi,copy,fix){
	  var rollId = $(objLi);
	   var contentOffset = $(parent).offset().top;
	   var scrollTop = $(parent).scrollTop();
	   $.each(rollId,function(i,n){
			var TliTop = $(n).parent().offset().top;
	   		//console.log(contentOffset,scrollTop,TliTop,fix);
		   if(contentOffset+32*i > TliTop){ 
			$(copy).eq(i).show();
			$(n).addClass(fix);
			$(n).css({'top':scrollTop+32*i});
		   }else{
			$(n).removeClass(fix);
			$(copy).eq(i).hide();
			$(n).css({'top':0});
		   }
		});
	}
}






