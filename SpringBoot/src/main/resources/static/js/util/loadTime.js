

/**
 * 计算页面加载的总时长并将数据传到数据库保存
 */
	var start_time = new Date();
	$(document).ready(function(){ 
		var stop_time = new Date();
		var load_time = stop_time.getTime() - start_time.getTime();
		function getQueryString(name){
		        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		        var r = window.location.search.substr(1).match(reg);
		        if (r != null) {
		        	return decodeURI(r[2]);	
		        }
		        return null;
		    }
		   
		    Date.prototype.Format = function (fmt) { //author: meizz 
		        var o = {
		            "M+": this.getMonth() + 1, //月份 
		            "d+": this.getDate(), //日 
		            "H+": this.getHours(), //小时 
		            "m+": this.getMinutes(), //分 
		            "s+": this.getSeconds(), //秒 
		            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		            "S": this.getMilliseconds() //毫秒 
		        };
		        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		        for (var k in o)
		        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		        return fmt;
		    }

		    function Map() {     
		        this.elements = new Array();     
		           
		        //获取MAP元素个数     
		        this.size = function() {     
		            return this.elements.length;     
		        }     
		           
		        //判断MAP是否为空     
		        this.isEmpty = function() {     
		            return(this.elements.length < 1);     
		        }     
		           
		        //删除MAP所有元素     
		        this.clear = function() {     
		            this.elements = new Array();     
		        }     
		           
		        //向MAP中增加元素（key, value)      
		        this.put = function(_key, _value) {     
		            this.elements.push( {     
		                key : _key,     
		                value : _value     
		            });     
		        }     
		           
		        //删除指定KEY的元素，成功返回True，失败返回False     
		        this.remove = function(_key) {     
		            var bln = false;     
		            try{     
		                for(i = 0; i < this.elements.length; i++) {     
		                    if(this.elements[i].key == _key) {     
		                        this.elements.splice(i, 1);     
		                        return true;     
		                    }     
		                }     
		            } catch(e) {     
		                bln = false;     
		            }     
		            return bln;     
		        }     
		           
		        //获取指定KEY的元素值VALUE，失败返回NULL     
		        this.get = function(_key) {     
		            try{     
		                for(i = 0; i < this.elements.length; i++) {     
		                    if(this.elements[i].key == _key) {     
		                        return this.elements[i].value;     
		                    }     
		                }     
		            } catch(e) {     
		                return null;     
		            }     
		        }     
		           
		        //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL     
		        this.element = function(_index) {     
		            if(_index < 0 || _index >= this.elements.length) {     
		                return null;     
		            }     
		            return this.elements[_index];     
		        }     
		           
		        //判断MAP中是否含有指定KEY的元素     
		        this.containsKey = function(_key) {     
		            varbln = false;     
		            try{     
		                for(i = 0; i < this.elements.length; i++) {     
		                    if(this.elements[i].key == _key) {     
		                        bln = true;     
		                    }     
		                }     
		            } catch(e) {     
		                bln = false;     
		            }     
		            return bln;     
		        }     
		           
		        //判断MAP中是否含有指定VALUE的元素     
		        this.containsValue = function(_value) {     
		            var bln = false;     
		            try{     
		                for(i = 0; i < this.elements.length; i++) {     
		                    if(this.elements[i].value == _value) {     
		                        bln = true;     
		                    }     
		                }     
		            } catch(e) {     
		                bln = false;     
		            }     
		            return bln;     
		        }     
		           
		        //获取MAP中所有VALUE的数组（ARRAY）     
		        this.values = function() {     
		            var arr = new Array();     
		            for(i = 0; i < this.elements.length; i++) {     
		                arr.push(this.elements[i].value);     
		            }     
		            return arr;     
		        }     
		           
		        //获取MAP中所有KEY的数组（ARRAY）     
		        this.keys = function() {     
		            var arr = new Array();     
		            for(i = 0; i < this.elements.length; i++) {     
		                arr.push(this.elements[i].key);     
		            }     
		            return arr;     
		        }     
		    } 




		    function uploadData(uop){
		    	$.ajax({
		        	type:"post",
		        	url : "pages_userOperateRecord_UserOperatePageLoad_saveOrUpdate.action" ,
		        	data:{
		        		"userName" : uop.get("userName"),
		    			"appId" : uop.get("appId"),
		    			"appName" :uop.get("appName"),
		    			"operateTime" : uop.get("operateTime"),
		    			"loadTimeConsuming" :  uop.get("loadTimeConsuming")
		        	},
		        	dataType:"json",
		        	success:function(){
		        		console.log("成功上传数据");
		        	},
		        	error:function(){
		        		console.log("系统错误");
		        	}
		        	
		        });
		    }

		    function submitAjax(){
		    	var operate_time = new Date().Format("yyyy-MM-dd HH:mm:ss");  
		        var uop = new Map();
		        var userName = $("#headerUserForm_a").text(); //获取用户名称
		        var appId = getQueryString("appId");
		        var appName = getQueryString("appName");
		        console.log(appId+" :  "+appName);
		        uop.put("userName", userName);
		        uop.put("appId", appId);
		        uop.put("appName", appName);
		        uop.put("operateTime", operate_time);
		        uop.put("loadTimeConsuming", load_time );
		        console.log(uop);
		        uploadData(uop);
		    }
		    console.log(load_time);
		    if(load_time > 0) {
		    	submitAjax();
		    }
		
		}); 

