var badCellAnalysis = {};
badCellAnalysis.queryCellCount=1;//调用小区回调方法的次数badCellAnalysis.cellTableDataFormat
badCellAnalysis.currentCellCount=0;//当前调用小区回调方法的次数
/*badCellAnalysis.expandNode=false;//只选择一个小区的时候，默认展开显示多天,是否需要展开节点 默认不展开*/
var SearchPanel = {
    $panel: null,//查询面板
    $tree: null,//树控件
    
    
    
    visiable: function () {
        return this.$panel.css("display") == "block";
    },
    init: function () {
        this.$panel = $('#searchContent');
        SearchPanel.booleanTime = false;//改为查mysql
        //初始化树控件
        this.initTree();
        //加载树数据
        var option_val = $('#selectArea').children('option:selected').val();//这就是selected的值 
    	SearchPanel.selectAreaValue = option_val;
    	SearchPanel.updateTreeData(option_val);
    	//uploadData.doSubmit();
        //树图选项变动
        $('#selectArea').change(function(){ 
        	$('#lblAreaType').text($(this).find("option:selected").text().replace("按", ""));
            $('#selectedArea').empty();
        	$("#searchButtonResult").html("");
        	var option_val = $(this).children('option:selected').val();//这就是selected的值 
        	SearchPanel.selectAreaValue = option_val;
        	SearchPanel.updateTreeData(option_val);
        });
        
        //筛选按钮
        $('#searchButton').click(function () {
            SearchPanel.searchTree();
        });
        //显示或者隐藏面板
        $('#searchBox').click(function () {
            if (SearchPanel.visiable()) {
                /*SearchPanel.hide();*/
            }else {
                SearchPanel.show();
            }
        });

        //查询按钮
        $('#btnSubmit').click(function () {
            SearchPanel.search();
        });

        //清除按钮
        $('#clearButton').click(function () {
        	$("#searchButtonResult").html("");
        	var option_val = $("#selectArea").children('option:selected').val();//这就是selected的值 
        	SearchPanel.selectAreaValue = option_val;
        	SearchPanel.updateTreeData(option_val);
        	$('#selectedArea').empty();
        	$('#txtSearch').val("");
        });
        //搜索清除按钮
        $('#clearText').click(function () {
        	$('#txtSearch').val("");
        });
//        var len =[];
        //监听DIV内容发生改变时触发的事件
        $("#badCellAnalysis_table").bind('DOMNodeInserted',function(e) {
        	//给第一行的前6个单元格加class,供样式使用（这几列表头不换行）	
    		var arr2 = $("#badCellAnalysis_tableFix_data tr");
    		
    		var tr = arr2[1];
	    		for (var i = 0; i < 7; i++) {
	    			$(tr).children().eq(i).addClass("nowrap");
	    		}
//	    		$(tr).children().eq(8).addClass("nowrap");
	    	//给表格td数据添加样式	
		    var arr = $("#badCellAnalysis_tableFix_data > tbody > tr");
	    	if(arr.length > 0){
	    		for(var i = 0; i < arr.length; i++){
	    			var tr = arr[i];
	    			var eNodeBId = $(tr).children().eq(3);
	    			var cellId = $(tr).children().eq(5);
	    			var eNodeName = $(tr).children().eq(2);//改为点击小区名称显示基本信息
	    			var cellName = $(tr).children().eq(4);//改为点击小区名称显示基本信息
	    			$(eNodeBId).css({"color":"#0099FF","cursor":"pointer"});
	    			$(cellId).css({"color":"#0099FF","cursor":"pointer"});
	    			$(cellName).css({"color":"#0099FF","cursor":"pointer"});
	    			$(cellName).find("a").css({"color":"#0099FF","cursor":"pointer"});
//	    			添加鼠标悬浮事件
	    			$(cellName).unbind( "click" ).click( function (){
	    				mouseInfo(this);
//	    			    if(!noceUtil.isUndefined(SearchPanel.showTooltip)){
//	    			    	console.log(SearchPanel.showTooltip);
//	    			    }
	    			});
//	    			$(cellName).unbind( "mouseover" ).mouseover( function (){mouseInfo(this);} );
	    			
	    			
	    			$(eNodeBId).unbind( "click" ).click(function () {toCellInfo(this);});
	    			$(cellId).unbind( "click" ).click(function () {toCellInfo(this);});
	    		}
	    		
	    	}
	    	
	    	 
	    	//鼠标提示信息：
	    	function mouseInfo(node) {
	    		var startDate=new Date().getTime();
		    	var tr = $(node).parent("tr");
		    	var enodeId = $(tr).children().eq(3).text();
		    	var cellId = $(tr).children().eq(5).text();
		    	var cellName = $(tr).children().eq(4);
		    	if(!noceUtil.isUndefined(enodeId)&&!noceUtil.isUndefined(cellId)){
		    		var lowData_list = ["badcell_MouseData","ENODEBID:"+enodeId,"CELLID:"+cellId];
		        	var progressBarSqls=[lowData_list];
		        	var functionlist = [callBackMouseData];
		        	progressbarTwo.submitSql(progressBarSqls,functionlist,[3]);
		        	function callBackMouseData(data){
		        		var queryDate=new Date().getTime();
		        		console.log("查询耗时："+(queryDate-startDate));
		        			var result = callBackChangeData(data);
		        			SearchPanel.checkResult = result;
		        			SearchPanel.is_indoor = [];
		            		SearchPanel.sector_id = [];
		            		SearchPanel.sector_name = [];
		            		SearchPanel.band = [];
		            		SearchPanel.ant_azimuth = [];
		            		SearchPanel.ant_engine_angle = [];
		            		SearchPanel.ant_electron_angle = [];
		            		SearchPanel.high = [];
		            		SearchPanel.longitude = [];
		            		SearchPanel.latitude = [];
		            		SearchPanel.acceptstatus = [];
		            		SearchPanel.sector_addr = [];
                        	SearchPanel.bs_vendor = [];
		            		for(var i = 0 ;i< result.length;i++){
		            			SearchPanel.is_indoor.push(result[i].is_indoor);
		            			SearchPanel.sector_id.push(result[i].sector_id);
		            			SearchPanel.sector_name.push(result[i].sector_name);
		            			SearchPanel.band.push(result[i].band);
		            			SearchPanel.ant_azimuth.push(result[i].ant_azimuth);
		            			SearchPanel.ant_engine_angle.push(result[i].ant_engine_angle);
		            			SearchPanel.ant_electron_angle.push(result[i].ant_electron_angle);
		            			SearchPanel.high.push(result[i].high);
		            			SearchPanel.longitude.push(result[i].longitude);
		            			SearchPanel.latitude.push(result[i].latitude);
		            			SearchPanel.acceptstatus.push(result[i].acceptstatus);
		            			SearchPanel.sector_addr.push(result[i].sector_addr);
                                SearchPanel.bs_vendor.push(result[i].bs_vendor);
		            			//SearchPanel.check = "0";
		        		   }
		            		
		            		//弹出提示信息框：
			        		SearchPanel.showTooltip='<div class="">'
		    					+'<div class="">'
								+'<div class="">--'+SearchPanel.is_indoor+'--</div>'
								+'<div class="">'
									+'<div>基站编号：'+enodeId+'</div>'
									+'<div>扇区编号：'+SearchPanel.sector_id[0]+'</div>'
									+'<div>扇区名称: '+SearchPanel.sector_name[0]+'</div>'
		                            +'<div>频段: '+SearchPanel.band[0]+'</div>'
		                            +'<div>方位角: '+SearchPanel.ant_azimuth[0]+'</div>'
		                            +'<div>机械下倾: '+SearchPanel.ant_engine_angle[0]+'</div>'
		                            +'<div>电子下倾: '+SearchPanel.ant_electron_angle[0]+'</div>'
		                            +'<div>天线挂高: '+SearchPanel.high[0]+'</div>'
		                            +'<div>经度: '+SearchPanel.longitude[0]+'</div>'
		                            +'<div>纬度: '+SearchPanel.latitude[0]+'</div>'
		                            +'<div>验收状况: '+SearchPanel.acceptstatus[0]+'</div>'
		                            +'<div>站址地址: '+SearchPanel.sector_addr[0]+'</div>'
                                	+'<div>厂家: '+SearchPanel.bs_vendor[0]+'</div>'
								+'</div></div></div>';
			        		$(cellName).tooltip({
			    			    position: 'top',
			    			    content: SearchPanel.showTooltip,
			    			    showEvent:"dblclick",
			    			    onShow: function(){
			    			    },
			    			    onHide: function(){
			    			    }
			    	        });
			        		$(cellName).dblclick();
			        		var endDate=new Date().getTime();
			        		console.log("回调函数耗时："+(endDate-queryDate));
			        		console.log("提示框耗时："+(endDate-startDate));
		        		}
		        	}
		        	
		        	
			        	
		        		
		        		var cell = $(cellName).text();

		    	}

	    	
		    //跳转到小区信息页面
		    function toCellInfo(node){
		    	var startHour;
				var endHour;
				if(SearchPanel.param==undefined){
			    		
			    		///////////////////////////////////////////////////////////////
			    		var timeStr = noceUtil.GetQueryString("timeStr");//传过来的时间
//			        	var timeStr = '20170320';
			        	var people = timeStr.substring(0,4)+'-'+timeStr.substring(4,6)+'-'+timeStr.substring(6);
//			    		alert(people);
			    		
			    		var nowTime = noceUtil.getCurYYYYMMDD();
			    		var myself = nowTime.substring(0,4)+'-'+nowTime.substring(4,6)+'-'+nowTime.substring(6);
//			    		alert(myself);
			    		
			    		var d1=new Date(people);//传过来的时间
			    		var d2=new Date(myself);//当前的时间
			    		var minus = (d2-d1)/(24*60*60*1000);
//			    		alert(minus);
			    		
			    		if(minus>4||minus==4){
//			    			alert("大于4天");
			    			var oldTimeStart  = d1 - (3 *(24*60*60*1000)) ; //传过来的时间-3 
			        		var oldTime1 = new Date(oldTimeStart);//将毫秒转化为日期格式？？
			        		startDay_02 = noceUtil.changeSecondsToYYYYMMDD(oldTime1);
			        		startHour_02 = startDay_02+"00";
			        		startHour = startHour_02;
			                
			                var plus_3=  Number(3 *(24*60*60*1000));
			                var d1Seconds =  d1.getTime();
			                var oldTimeEnd = d1Seconds + plus_3 ; //传过来的时间+3 
			        		var oldTime2 = new Date(oldTimeEnd);
			        		endDay_02 = noceUtil.changeSecondsToYYYYMMDD(oldTime2);
			        		endHour_02 = endDay_02+"23";
			        		endHour = endHour_02;
			    		}else{
//			    			alert("小于4天");
			        		var oldTimeStart  = d1 - (7 *(24*60*60*1000)) ; //传过来的时间-7 
			        		var oldTime1 = new Date(oldTimeStart);//将毫秒转化为日期格式？？
			        		startDay_02 = noceUtil.changeSecondsToYYYYMMDD(oldTime1);
			        		startHour_02 = startDay_02+"00";
			        		startHour = startHour_02;
			        		
			        		var oldTimeEnd = d1 - (1 *(24*60*60*1000)) ; //传过来的时间-1 
			        		var oldTime2 = new Date(oldTimeEnd);
			        		endDay_02 = noceUtil.changeSecondsToYYYYMMDD(oldTime2);
			        		endHour_02 = endDay_02+"23";
			        		endHour = endHour_02;
			    		}
//			    	}

		    	}else{
		    		startHour = SearchPanel.param.beginDate;
					endHour = SearchPanel.param.endDate;
		    	}
		    	var tr = $(node).parent("tr");
		    	var eNodeBId = $(tr).children().eq(3).text();
		    	var cellId = $(tr).children().eq(5).text();
		    	//这里传参的时候，没有门限值了，故后面使用http请求参数也会失败。
//		    	var tcp_ack_dl_low = $(tr).children().eq(8).text();
//		    	var wireless_dt2_low = $(tr).children().eq(12).text();
		    	
		    	//新加五个门限值带过去给第二个表格：
		    	var low1 = SearchPanel.low1;
		    	var low2 = SearchPanel.low2;
		    	var low3 = SearchPanel.low3;
		    	var low4 = SearchPanel.low4;
		    	var low5 = SearchPanel.low5;
		    	var id_path = noceUtil.GetQueryString("id_path");
		    	var invokeApp = noceUtil.GetQueryString("hideFramework");
		    	var perId= noceUtil.GetQueryString("perId");
		    	if(invokeApp=="1"){
		    		window.location.href="pages_index_Index_home.action?appId=badCellAnalysis&menuId="+defualtMeunConfig.menuId+"&id_path="+id_path+"&isRedirect=true&startHour="+startHour+"&endHour="+endHour+"&eNodeBId="+eNodeBId+"&cellId="+cellId+"&low1="+low1+"&low2="+low2+"&low3="+low3+"&low4="+low4+"&low5="+low5+"&hideFramework=1"+"&tableIndex=tableTwo&modifyFooter=1";
		    	}else{
		    		window.open("pages_index_Index_home.action?appId=badCellAnalysis&menuId="+defualtMeunConfig.menuId+"&perId="+perId+"&id_path="+id_path+"&isRedirect=true&startHour="+startHour+"&endHour="+endHour+"&eNodeBId="+eNodeBId+"&cellId="+cellId+"&low1="+low1+"&low2="+low2+"&low3="+low3+"&low4="+low4+"&low5="+low5+"&tableIndex=tableTwo");
		    	}
		    	
		    }
        });







    },
    
  //初始化树控件
    initTree: function () {

        $('#treeCity').tree({
            onlyLeafCheck: true,
            checkbox: true,
            //展开节点
            onBeforeExpand: function (node) {
                if (!node.children || node.children.length == 0) {
                    SearchPanel.beforeExpand(node);
                }
            },
            //选择节点
            onCheck: function (node, checked) {
            	
                if (node.level == SearchPanel.getCurrentLevel()) {
                    if (checked) {
                        SearchPanel.checkNode(node);
                    }
                    else {
                        $('#s_' + node.id).remove();
                    }
                }
            }
        });

        $tree = $('#treeCity');
      //点击地市名称也选中checkbox
        $(".tree-title").click(function(){
       	  $(this).siblings(".tree-checkbox,.tree-hit").click();
        });
    },
    //初始化地市的树状列表
    initTreeData : function(){
    	var cityTreeData = [{
            "id": 1,
            "text": "广东",
            "iconCls": "none",
            "level": 0,
            "state": "open",
            "children": [
            {
                "text": "深圳",
                id: 755,
                "level": 1,
                "state": "open"
            }, {
                "text": "广州",
                "level": 1,
                id: 200,
                "state": "open",
            }, {
                "text": "东莞",
                "level": 1,
                id: 769,
                "state": "open",
            }, {
                "text": "佛山",
                "level": 1,
                id: 757,
                "state": "open",
            }, {
                "text": "中山",
                "level": 1,
                id: 760,
                "state": "open",
            }, {
                "text": "惠州",
                "level": 1,
                id: 752,
                "state": "open",
            }, {
                "text": "汕头",
                "level": 1,
                id: 754,
                "state": "open",
            }, {
                "text": "江门",
                "level": 1,
                id: 750,
                "state": "open",
            }, {
                "text": "珠海",
                "level": 1,
                id: 756,
                "state": "open",
            }, {
                "text": "揭阳",
                "level": 1,
                id: 663,
                "state": "open",
            }, {
                "text": "湛江",
                "level": 1,
                id: 759,
                "state": "open",
            }, {
                "text": "茂名",
                "level": 1,
                id: 668,
                "state": "open",
            }, {
                "text": "肇庆",
                "level": 1,
                id: 758,
                "state": "open",
            }, {
                "text": "清远",
                "level": 1,
                id: 763,
                "state": "open",
            }, {
                "text": "潮州",
                "level": 1,
                id: 768,
                "state": "open",
            }, {
                "text": "梅州",
                "level": 1,
                id: 753,
                "state": "open",
            }, {
                "text": "河源",
                "level": 1,
                id: 762,
                "state": "open",
            }, {
                "text": "韶关",
                "level": 1,
                id: 751,
                "state": "open",
            }, {
                "text": "阳江",
                "level": 1,
                id: 662,
                "state": "open",
            }, {
                "text": "汕尾",
                "level": 1,
                id: 660,
                "state": "open",
            }, {
                "text": "云浮",
                "level": 1,
                id: 766,
                "state": "open",
            }]
        }];
    	var cityPermission_common = $("#cityPermission_common").val();
    	if(cityPermission_common == "全省"){
    		$('#treeCity').tree('loadData', cityTreeData);
    	}else{
    		var newCityTreeData = [];
    		
    		var newCityArr = [];
    		for(var i = 0 ; i < cityTreeData[0].children.length; i++){
    			if(cityTreeData[0].children[i].text == cityPermission_common){
    				newCityArr.push(cityTreeData[0].children[i]);
    				newCityTreeData = [{
    	                "id": 1,
    	                "text": "广东",
    	                "iconCls": "none",
    	                "level": 0,
    	                "state": "open",
    	                "children":newCityArr
    	                	}];
    			}
    		}
    		$('#treeCity').tree('loadData', newCityTreeData);
    	}
    	
    	//点击地市名称也选中checkbox
        $(".tree-title").click(function(){
       	  $(this).siblings(".tree-checkbox,.tree-hit").click();
        });
    },
    //更新树状列表的数据
    updateTreeData : function(option_val){
    	if(option_val == "city"){//地市
    		SearchPanel.initTreeData();
    	}else{
    	  //营服中心、基站、小区  都先把树列表替换成营服中心层级的数据
    	  //营服中心的数据如果存在，就直接调用解析函数，如果没有，就先查sql再回调解析函数
    	  if(noceUtil.isUndefined(SearchPanel.displayTreeData_mkt_center_data)){
//		        alert("查门限值");
	          	var lowData_list = ["badCellAnalysis_03_querythreshold"];
	        	var functionlist = [callBackLowData];
	        	progressbarTwo.submitSql([lowData_list], functionlist,[3]);//...
   	        	function callBackLowData(result){	
    	    			var result = callBackChangeData(result);
    	        		SearchPanel.low1 = [];
    	        		SearchPanel.low2 = [];
    	        		SearchPanel.low3 = [];
    	        		SearchPanel.low4 = [];
    	        		SearchPanel.low5 = [];
    	        		for(var i = 0 ;i< result.length;i++){
    	        			SearchPanel.low1.push(result[i].webpage_tcp_synack_dl);//第1段时延门限
    	        			SearchPanel.low2.push(result[i].webpage_tcp_ack_dl);//第2段时延门限
    	        			SearchPanel.low3.push(result[i].webpage_wireless_dt2);//第3段时延门限
    	        			SearchPanel.low4.push(result[i].webpage_http_delay);//第4段时延门限
    	        			SearchPanel.low5.push(result[i].fin_delay);//第5段时延门限
    	    		    }
   	        	}
    		  
    		  //在这里判断查询方式
    		  var list="";
    		  SearchPanel.booleanTime = true;//改为查mysql
    		  var cityPermission_common = $("#cityPermission_common").val();
			  var cityName = "";
			  if(cityPermission_common == "全省"){
				  cityName = "";
			  }else{
				  cityName = "and city_name ='"+ cityPermission_common + "'";
			  }
			  list = ["badCellAnalysis_m01_treemenuyf","NETTYPE:4G","CITYNAME:" + cityName];
//    	   		  var sqlArr = sqlUtil.getSqlList(list);
			  var sqlArr = [];
			  sqlArr.push(list);
			  var dataBase = [3];
			  progressbarTwo.submitSql(sqlArr,[SearchPanel.displayTreeData_mkt_center],dataBase);
     	  }else{
    		  SearchPanel.displayTreeData_mkt_center(SearchPanel.displayTreeData_mkt_center_data);
    	  }
    	}
    },
    //解析营服中心sql查询的数据，封装成树状列表的json数组
    displayTreeData_mkt_center : function SearchPanel_displayTreeData_mkt_center_dat (data){
    	if(noceUtil.isUndefined(SearchPanel.displayTreeData_mkt_center_data)){
    		SearchPanel.displayTreeData_mkt_center_data = data;//缓存起来
    	}
    	console.log(data);
    	var resultArr = callBackChangeData(data);
//    	console.log("返回成功,树状列表数据【"+resultArr.length+"】条");
    	
    	//如果是营服中心，叶子节点就设置open  如果不是设置closed，因为树图的选项是基站或小区
    	var state_val = "closed";
    	if(SearchPanel.selectAreaValue == "area"){
    		state_val = "open";
    	}
    	//tree数据格式
        //id :唯一id
        //text: 文本
        //level: 级别；0：根节点,1:地市,2:营服中心,3:基站,4:小区
        //children: 子节点数组
        //state: closed或者open,节点是否展开，最后一个级别的数据设置为open
    	var treeData = [{
    		"id": 1,
    		"text": "广东",
    		"iconCls": "none",
    		"level": 0,
    		"state": "open"
    	}];
    	
    	var cityArr = [];
    	var cityNameArr = [];
    	var areaArr = [];
    	for(var i = 0; i < resultArr.length; i++){
    		
        	var obj = resultArr[i];
        	var city_id = obj.city_id;
        	var city_name = obj.city_name;
        	var mkt_center_code = obj.mkt_center_code;
        	var mkt_center_name = obj.mkt_center_name;
        	var city = {id:city_id,text:city_name,"level": 1,"state": "closed"};
        	var mkt_center = {id:city_id+"-"+mkt_center_name,text:mkt_center_name,"level": 2,"state": state_val};
        	
        	var index = $.inArray(city_name, cityNameArr);
        	if(cityArr.length == 0 || index == -1){
        		areaArr = [];
        		cityNameArr.push(city_name);
        		areaArr.push(mkt_center);
        		city.children = areaArr;
        		cityArr.push(city);
        	}else{
        		var city_ = cityArr[index];
        		var areaArr_ = city_.children;
        		areaArr_.push(mkt_center);
        		city_.children = areaArr_;
        		cityArr[index] = city_;
        	}
        }
    	treeData[0].children = cityArr;
    	$('#treeCity').tree('loadData', treeData);
    	//点击地市名称也选中checkbox
        $(".tree-title").click(function(){
       	  $(this).siblings(".tree-checkbox,.tree-hit").click();
        });
    },
    //取消节点选中
    unCheckNode: function (nodeId) {
    	$("#s_"+nodeId).prev().remove();
        var node = $tree.tree('find', nodeId);
        $tree.tree('uncheck', node.target);
    },
    //选中节点，把该节点添加到已选列表
    checkNode: function (node) {
    	var content = node.text;
    	var strlen =  noceUtil.getStringByUnicodeLength(content);
    	var buffer = "...";
    	if(strlen > 20){
			 if(content.length == strlen){//非中文标题,控制截取的位置,让显示的长度和中文标题一致
				 var content_1_subIndex = 10;
				 var content_2_subIndex = content.length-(content_1_subIndex - 2);
				 var content_1 = content.substring(0,content_1_subIndex);
				 var content_2 = content.substring(content_2_subIndex,content.length);
				 content = content_1+buffer+content_2;
			 }else{
				 var content_1_len = 0;
				 var content_1 = "";
				 for(i=0; i<content.length; i++){
					var text = content.charAt(i);
					var len = noceUtil.getStringByUnicodeLength(text);
					content_1_len += len;
					if(content_1_len >= 10){
						content_1 = content.substring(0,i+1);
						break;
					}
				 }
				 var content_2_len = 0;
				 var content_2 = "";
				 for(i=content.length-1; i>1; i--){
					 var text = content.charAt(i);
					 var len = noceUtil.getStringByUnicodeLength(text);
					 content_2_len += len;
					 if(content_2_len >= 8){
						 content_2 = content.substring(i,content.length);
						 break;
					 }
				 }
				 content = content_1+buffer+content_2;
			 }
			 
		 }
    	$('#selectedArea').append("<div id='Layer_"+node.text+"' style='display:none;position:absolute;z-index:1;'></div> <div onmouseover=\"SearchPanel.showNodeText('"+node.text+"')\" onmouseout=\"SearchPanel.hideNodeText('"+node.text+"')\" class='selectedNode' id=\"s_" + node.id + "\" nodeId='" + node.id + "' >" + content + "<div class='selectedNode_r' onclick=\"SearchPanel.unCheckNode('" + node.id + "')\"><img src='../css/images/delete.png'></div></div>");
    },
    //显示节点的悬浮信息
    showNodeText : function(content){
    	var x,y; 
    	x = event.clientX; 
    	y = event.clientY;
    	var node = document.getElementById("Layer_"+content);
    	var text = $(node).next().text(); 
    	if(text.indexOf("...") != -1){
    		document.getElementById("Layer_"+content).style.left = (x*0.3)+"px"; 
    		document.getElementById("Layer_"+content).style.top = (y*0.62)+"px";
    		document.getElementById("Layer_"+content).innerHTML = "<span style='background-color:#9ff2ff;'>"+content+"</span>"; 
    		document.getElementById("Layer_"+content).style.display = "block";
    	}
    },
    //隐藏节点的悬浮信息
    hideNodeText : function(content){
    	document.getElementById("Layer_"+content).innerHTML = ""; 
    	document.getElementById("Layer_"+content).style.display = "none";
    },
    //展开节点（三角形图标）
    beforeExpand : function(node){
    	
    	if (node) {
			if (node.level == 2){
				//展开营服中心
				var city = $(node.target).parent().parent().parent().children().eq(0);
				var city_node = $tree.tree('getNode', city);
				var city_id = city_node.id;
				//在这里判断查询方式
				var templateID;
				templateID = "badCellAnalysis_m04_treemenubs";
				 list = [templateID,"NETTYPE:4G","CITY_ID:"+city_id,"MKT_CENTER_NAME:"+node.text];
				
			} else if (node.level == 3){
				//展开基站
				var mkt_center = $(node.target).parent().parent().parent().children().eq(0);
				var mkt_center_node = $tree.tree('getNode', mkt_center);
				var mkt_center_name = mkt_center_node.text;
				
				var city = $(mkt_center_node.target).parent().parent().parent().children().eq(0);
				var city_node = $tree.tree('getNode', city);
				var city_id = city_node.id;
				var nodeId = node.id;
				var idArr = nodeId.split("-");
				nodeId = idArr[idArr.length - 1];
				//在这里判断查询方式
				var templateID;
				templateID = "badCellAnalysis_m05_treemenucell";
				 list = [templateID,"NETTYPE:4G","CITY_ID:"+city_id,"MKT_CENTER_NAME:"+mkt_center_name,"BASE_STATN_ID:"+nodeId];
			}
			SearchPanel.node = node;
			var sqlArr = [];
			sqlArr.push(list);
			var dataBase = [3];
			progressbarTwo.submitSql(sqlArr,[SearchPanel.displayTreeData_beforeExpand],dataBase);

    	}
    },
    //解析展开节点的数据
    displayTreeData_beforeExpand:function SearchPanel_displayTreeData_beforeExpand (data){
    	console.log(data);
    	var node = SearchPanel.node;
    	//查询数据
		var resultArr = callBackChangeData(data);
		var dataArr = new Array();
//    	console.log("返回成功,共有数据 【"+resultArr.length+"】条");
    	var cells = {};
    	for(var i = 0; i < resultArr.length; i++){
    		var obj = resultArr[i];
    		var city_id = obj.city_id;
    		var mkt_center_name = obj.mkt_center_name;
    		var base_statn_id = obj.base_statn_id;
    		var enodeb_info = obj.enodeb_info;
    		if(node.level == 2){
	    		if (SearchPanel.selectAreaValue == "bts"){//树图选项是基站
		    		cells = { id: city_id+"-"+mkt_center_name+"-"+base_statn_id, text: enodeb_info, level: 3, state: "open" };
	    		}else if (SearchPanel.selectAreaValue == "sector"){//树图选项是小区
	    			cells = { id: city_id+"-"+mkt_center_name+"-"+base_statn_id, text: enodeb_info, level: 3, state: "closed" };
	    		}
    		}else if (node.level == 3){
    			var cell_id = obj.cell_id;
	    		var cell_info = obj.cell_info;
	    		cells = { id: city_id+"-"+mkt_center_name+"-"+base_statn_id+"-"+cell_id, text: cell_info, level: 4, state: "open" };
    		}
    		dataArr.push(cells);
    	}
    	//把基站和小区的树列表数据添加进树里
    	$tree.tree('append', {
	          parent: node.target,
	          data: dataArr
	     });
    	$(node.target).next().show();
    	//点击地市名称也选中checkbox
        $(".tree-title").click(function(){
       	  $(this).siblings(".tree-checkbox,.tree-hit").click();
        });
    },
    //筛选树数据
    searchTree: function () {
    	var option_val = $("#selectArea").children('option:selected').val();//这就是selected的值 
        var queryContent = $("#txtSearch").val();		
        if("" == queryContent){
        	alert("请输入要筛选的名称或ID");
        	return;
        }
		var list;
		//在这里判断查询方式
		var templateID;
		SearchPanel.booleanTime = true;//改为查mysql
		if(SearchPanel.booleanTime){
			//默认或者三个月之内都是查mysql：
			templateID = "badCellAnalysis_m06_treemenuquery";
			//在这里拼接Mysql-SQL模板：
			if(option_val == "city"){
	        	list = [templateID,"NETTYPE:4G","QUERY_CONTENT:"+queryContent,"YF_RESULT:","YF_QUERY:","YF_ORDER:","BS_RESULT:","BS_QUERY:","BS_ORDER:","CELL_RESULT:","CELL_QUERY:","CELL_ORDER:"];
	        }else if(option_val == "area"){
	        	list = [templateID,"NETTYPE:4G","QUERY_CONTENT:"+queryContent,
	        	        "YF_RESULT:,MKT_CENTER_CODE,MKT_CENTER_NAME","YF_QUERY:or MKT_CENTER_NAME like '%"+queryContent+"%'","YF_ORDER:,MKT_CENTER_NAME",
	        	        "BS_RESULT:","BS_QUERY:","BS_ORDER:",
	        	        "CELL_RESULT:","CELL_QUERY:","CELL_ORDER:"];
	        }else if(option_val == "bts"){
	        	list = [templateID,"NETTYPE:4G","QUERY_CONTENT:"+queryContent,
	        	        "YF_RESULT:,MKT_CENTER_CODE,MKT_CENTER_NAME","YF_QUERY:or MKT_CENTER_NAME like '%"+queryContent+"%'","YF_ORDER:,MKT_CENTER_NAME",
	        	        "BS_RESULT:,BASE_STATN_ID,BASE_STATN_NAME,concat(cast(BASE_STATN_ID as char), \"(\", IFNULL(BASE_STATN_NAME, \"空\"), \")\") as eNodeB_INFO","BS_QUERY:or cast(BASE_STATN_ID as char) like \"%"+queryContent+"%\" or BASE_STATN_NAME like \"%"+queryContent+"%\"","BS_ORDER:,BASE_STATN_ID",
	        	        "CELL_RESULT:","CELL_QUERY:","CELL_ORDER:"];
	        }else if(option_val == "sector"){
	        	list = [templateID,"NETTYPE:4G","QUERY_CONTENT:"+queryContent,
	        	        "YF_RESULT:,MKT_CENTER_CODE,MKT_CENTER_NAME","YF_QUERY:or MKT_CENTER_NAME like '%"+queryContent+"%'","YF_ORDER:,MKT_CENTER_NAME",
	        	        "BS_RESULT:,BASE_STATN_ID,BASE_STATN_NAME,concat(cast(BASE_STATN_ID as char), \"(\", IFNULL(BASE_STATN_NAME, \"空\"), \")\") as eNodeB_INFO","BS_QUERY:or cast(BASE_STATN_ID as char) like \"%"+queryContent+"%\" or BASE_STATN_NAME like \"%"+queryContent+"%\"","BS_ORDER:,BASE_STATN_ID",
	        	        "CELL_RESULT:,cell_id,cell_name,concat(cast(cell_id as char), \"(\", IFNULL(cell_name, \"空\"), \")\") as CELL_INFO","CELL_QUERY:or cast(CELL_ID as char) like \"%"+queryContent+"%\" or CELL_NAME like \"%"+queryContent+"%\"","CELL_ORDER:,cell_id"];
	        }
		  }else{     
			 //三个月之外查Impala：
			templateID = "badCellAnalysis_06_treemenuquery";
			//在这里拼接Mysql-SQL模板：
			if(option_val == "city"){
	        	list = [templateID,"NETTYPE:4G","QUERY_CONTENT:"+queryContent,"YF_RESULT:","YF_QUERY:","YF_ORDER:","BS_RESULT:","BS_QUERY:","BS_ORDER:","CELL_RESULT:","CELL_QUERY:","CELL_ORDER:"];
	        }else if(option_val == "area"){
	        	list = [templateID,"NETTYPE:4G","QUERY_CONTENT:"+queryContent,
	        	        "YF_RESULT:,MKT_CENTER_CODE,MKT_CENTER_NAME","YF_QUERY:or MKT_CENTER_NAME like '%"+queryContent+"%'","YF_ORDER:,MKT_CENTER_NAME",
	        	        "BS_RESULT:","BS_QUERY:","BS_ORDER:",
	        	        "CELL_RESULT:","CELL_QUERY:","CELL_ORDER:"];
	        }else if(option_val == "bts"){
	        	list = [templateID,"NETTYPE:4G","QUERY_CONTENT:"+queryContent,
	        	        "YF_RESULT:,MKT_CENTER_CODE,MKT_CENTER_NAME","YF_QUERY:or MKT_CENTER_NAME like '%"+queryContent+"%'","YF_ORDER:,MKT_CENTER_NAME",
	        	        "BS_RESULT:,BASE_STATN_ID,BASE_STATN_NAME,concat(cast(BASE_STATN_ID as string), \"(\", nvl(BASE_STATN_NAME, \"空\"), \")\") as eNodeB_INFO","BS_QUERY:or cast(BASE_STATN_ID as string) like \"%"+queryContent+"%\" or BASE_STATN_NAME like \"%"+queryContent+"%\"","BS_ORDER:,BASE_STATN_ID",
	        	        "CELL_RESULT:","CELL_QUERY:","CELL_ORDER:"];
	        }else if(option_val == "sector"){
	        	list = [templateID,"NETTYPE:4G","QUERY_CONTENT:"+queryContent,
	        	        "YF_RESULT:,MKT_CENTER_CODE,MKT_CENTER_NAME","YF_QUERY:or MKT_CENTER_NAME like '%"+queryContent+"%'","YF_ORDER:,MKT_CENTER_NAME",
	        	        "BS_RESULT:,BASE_STATN_ID,BASE_STATN_NAME,concat(cast(BASE_STATN_ID as string), \"(\", nvl(BASE_STATN_NAME, \"空\"), \")\") as eNodeB_INFO","BS_QUERY:or cast(BASE_STATN_ID as string) like \"%"+queryContent+"%\" or BASE_STATN_NAME like \"%"+queryContent+"%\"","BS_ORDER:,BASE_STATN_ID",
	        	        "CELL_RESULT:,cell_id,cell_name,concat(cast(cell_id as string), \"(\", nvl(cell_name, \"空\"), \")\") as CELL_INFO","CELL_QUERY:or cast(CELL_ID as string) like \"%"+queryContent+"%\" or CELL_NAME like \"%"+queryContent+"%\"","CELL_ORDER:,cell_id"];
	        };
			
			
			
		  }
        
        if(noceUtil.ArrayIsNull(list)){
        	alert("没有获取到筛选的SQL");
        	return;
        }
//        var sqlArr = sqlUtil.getSqlList(list);
		  var sqlArr = []; 
		  sqlArr.push(list);
		var dataBase = [3];
		progressbarTwo.submitSql(sqlArr,[SearchPanel.displayTreeData_searchTree],dataBase);
    },
    //解析筛选的数据
    displayTreeData_searchTree:function SearchPanel_displayTreeData_searchTree (data){
    	console.log(data);
    	var option_val = $("#selectArea").children('option:selected').val();//这就是selected的值 
		//查询数据
		var resultArr = callBackChangeData(data);
		
		var count = 0;
		var cityArr = [];
		var areaArr = [];
		var btsArr = [];
		var sectorArr = [];
		var cityNameArr = [];
		var areaNameArr = [];
		var btsNameArr = [];
		var sectorNameArr = [];
		
    	for(var i = 0; i < resultArr.length; i++){
    		var city;
    		var mkt_center;
    		var enodeb;
    		var cell;
    		
    		var obj = resultArr[i];
        	var city_id = obj.city_id;
        	var city_name = obj.city_name;
        	var mkt_center_code = obj.mkt_center_code;
        	var mkt_center_name = noceUtil.isUndefined(obj.mkt_center_name) ? "未知" : obj.mkt_center_name;
        	var base_statn_id = obj.base_statn_id;
        	var enodeb_info = obj.enodeb_info;
        	var cell_id = obj.cell_id;
        	var cell_info = obj.cell_info;
        	
        	if(!noceUtil.isUndefined(city_name)){
        		city = {id:city_id,text:city_name,"level": 1,"state": "open","iconCls": "none"};
        	}
        	//后面需求方要求不过滤营服为null的数据,统一放到一个[未知]营服里面
        	if(!noceUtil.isUndefined(mkt_center_name)){
        		mkt_center = {id:city_id+"-"+mkt_center_name,text:mkt_center_name,"level": 2,"state": "open","iconCls": "none"};
        	}
        	if(!noceUtil.isUndefined(enodeb_info)){
        		enodeb = {id:city_id+"-"+mkt_center_name+"-"+base_statn_id,text:enodeb_info,"level": 3,"state": "open","iconCls": "none"};
        	}
        	if(!noceUtil.isUndefined(cell_info)){
        		cell = {id:city_id+"-"+mkt_center_name+"-"+base_statn_id+"-"+cell_id,text:cell_info,"level": 4,"state": "open","iconCls": "none"};
        	}
        	//如果树图选项是地市，而地市对象不存在，那么就跳出当前循环，继续遍历下一条数据
        	if(option_val == "city" && noceUtil.isUndefined(city)){
        		continue;
        	//如果树图选项是营服中心，而营服中心对象不存在，那么就跳出当前循环，继续遍历下一条数据
        	}else if(option_val == "area" && (noceUtil.isUndefined(city) || noceUtil.isUndefined(mkt_center))){
        		continue;
        	//如果树图选项是基站，而基站对象不存在，那么就跳出当前循环，继续遍历下一条数据
        	}else if(option_val == "bts" && (noceUtil.isUndefined(city) || noceUtil.isUndefined(mkt_center) || noceUtil.isUndefined(enodeb))){
        		continue;
        	//如果树图选项是小区，而小区对象不存在，那么就跳出当前循环，继续遍历下一条数据
        	}else if(option_val == "sector" && (noceUtil.isUndefined(city) || noceUtil.isUndefined(mkt_center) || noceUtil.isUndefined(enodeb) || noceUtil.isUndefined(cell))){
        		continue;
        	}
        	// count += 1;//统计符合要求的数据有多少条
        	
        	var index_1 = $.inArray(city_name, cityNameArr);
        	var index_2 = $.inArray(mkt_center_name, areaNameArr);
        	var index_3 = $.inArray(enodeb_info, btsNameArr);
        	var index_4 = $.inArray(cell_info, sectorNameArr);
        	
        	//地市的数组里没有该地市
        	if(!noceUtil.isUndefined(city) && (cityArr.length == 0 || index_1 == -1)){
        		//把下级的名称数组和对象数组清空
        		areaArr = [];
        		btsArr = [];
        		sectorArr = [];
        		areaNameArr = [];
        		btsNameArr = [];
        		sectorNameArr = [];
        		
        		
        		//小区存在，就添加进基站里
        		if(!noceUtil.isUndefined(enodeb) && !noceUtil.isUndefined(cell)){
        			sectorNameArr.push(cell_info);
        			sectorArr.push(cell);//添加小区
        			enodeb.children = sectorArr;
        		}
        		
        		//基站存在，就添加进营服中心里
        		if(!noceUtil.isUndefined(mkt_center) && !noceUtil.isUndefined(enodeb)){
        			btsNameArr.push(enodeb_info);
        			btsArr.push(enodeb);//添加基站
        			mkt_center.children = btsArr;
        		}
        		
				//营服中心存在，就添加进地市里
        		if(!noceUtil.isUndefined(city) && !noceUtil.isUndefined(mkt_center)){
        			areaNameArr.push(mkt_center_name);
            		areaArr.push(mkt_center);
            		city.children = areaArr;//添加营服中心
        		}
        		cityArr.push(city);
        		cityNameArr.push(city_name);//添加地市到地市名称数组里
        		
        	}else if(!noceUtil.isUndefined(mkt_center) && cityArr.length > 0 && index_1 != -1){//地市已存在
        		//营服中心没有添加过
        		if(areaArr.length > 0 && index_2 == -1){
        			//清空基站和小区的名称和对象数组
        			btsNameArr = [];
            		sectorNameArr = [];
            		btsArr = [];
            		sectorArr = [];
            		//添加名称进数组
        			areaNameArr.push(mkt_center_name);
        			btsNameArr.push(enodeb_info);
    				sectorNameArr.push(cell_info);
    				//小区存在，就添加进基站里
    				if(!noceUtil.isUndefined(enodeb) && !noceUtil.isUndefined(cell)){
    					sectorArr.push(cell);
        				enodeb.children = sectorArr;//直接添加小区

            		}
    				//基站存在，就添加进营服中心里
            		if(!noceUtil.isUndefined(mkt_center) && !noceUtil.isUndefined(enodeb)){
                        btsArr.push(enodeb);
        				mkt_center.children = btsArr;//直接添加基站
            		}
        			
            		//获取已添加的地市，并把营服中心添加进去
            		var city_ = cityArr[index_1];
            		if(!noceUtil.isUndefined(city_) && !noceUtil.isUndefined(mkt_center)){
            			areaArr.push(mkt_center);
            			city_.children = areaArr;
                		cityArr[index_1] = city_;
            		}
            		
        		}else if(!noceUtil.isUndefined(enodeb) && areaArr.length > 0 && index_2 != -1){//营服中心已添加过--基站没有添加过
        			//基站没有添加过
        			if(btsArr.length > 0 && index_3 == -1){
        				//清空小区的名称和对象数组
        				sectorNameArr = [];
        				sectorArr = [];
        				//添加名称进数组
        				btsNameArr.push(enodeb_info);
        				sectorNameArr.push(cell_info);
        				//获取已添加的营服中心
        				var city_ = cityArr[index_1];
                		var areaArr_ = city_.children;
                		var mkt_center_ = areaArr_[index_2];
                		//添加基站和小区进营服中心
                		//小区存在，就添加进基站里
        				if(!noceUtil.isUndefined(enodeb) && !noceUtil.isUndefined(cell)){
        					sectorArr.push(cell);
                    		enodeb.children = sectorArr;//直接添加小区
        				}
        				if(!noceUtil.isUndefined(mkt_center_) && !noceUtil.isUndefined(enodeb)){
        					btsArr.push(enodeb);
        					mkt_center_.children = btsArr;
                    		areaArr_[index_2] = mkt_center_;
                    		city_.children = areaArr_;
                    		cityArr[index_1] = city_;
        				}
                		
            		}else if(!noceUtil.isUndefined(cell) && btsArr.length > 0 && index_3 != -1){//基站已存在
            			//当前小区没有添加过
            			if(sectorArr.length > 0 && index_4 == -1){ 
            				sectorNameArr.push(cell_info);
            				var city_ = cityArr[index_1];
                    		var areaArr_ = city_.children;
                    		var mkt_center_ = areaArr_[index_2];
                    		var btsArr_ = mkt_center_.children;
                    		var bts_ = btsArr_[index_3];
                    		//小区存在，就添加进基站里
                    		if(!noceUtil.isUndefined(bts_) && !noceUtil.isUndefined(cell)){
                    			sectorArr.push(cell);//添加小区进基站
                        		bts_.children = sectorArr;
                        		btsArr_[index_3] = bts_;
                        		mkt_center_.children = btsArr_;
                        		areaArr_[index_2] = mkt_center_;
                        		city_.children = areaArr_;
                        		cityArr[index_1] = city_;
                    		}
            			}
            		}
        		}
        	}
        }
        var treeData = [];
        if(cityArr.length > 0){
        	var treeData = [{
    			"id": 1,
    			"text": "广东",
    			"iconCls": "none",
    			"level": 0,
    			"state": "open"
    		}];
            treeData[0].children = cityArr;
        }
        
    	$('#treeCity').tree('loadData', treeData);
    	//点击地市名称也选中checkbox
        $(".tree-title").click(function(){
       	  $(this).siblings(".tree-checkbox,.tree-hit").click();
        });
        count=$("#treeCity .tree-checkbox").length;
        if(count < 100){
            if(count == resultArr.length){
                $("#searchButtonResult").text("匹配结果"+count+"条");
            }else{
                $("#searchButtonResult").text("匹配结果"+count+"条");//,已剔除异常数据"+(resultArr.length-count)+"条
            }
        }else{
            $("#searchButtonResult").text("匹配结果过大,仅返回前100条");
        }
    },
   /* show: function () {
        this.$panel.show();
    },
    hide: function () {
        this.$panel.hide();
    },*/
    //树类型对应的级别
    getCurrentLevel: function () {
        var lastLevel = 1;
        switch ($('#selectArea').val()) {
            case "city": lastLevel = 1; break;
            case "area": lastLevel = 2; break;
            case "bts": lastLevel = 3; break;
            case "sector": lastLevel = 4; break;
            default: lastLevel = 4; break;
        }

        return lastLevel;
    },
    //表单验证
    valid: function () {
        if ($('#formSearch').form('validate')) {
            var beginDate = $('#dateBegin').val();
            var endDate = $('#dateEnd').val();
            if (beginDate.length > 0 && beginDate.length > 0 && (Date.parse(beginDate) > Date.parse(endDate))) {
//                $.messager.alert("查询结束日期不能早于开始日期");
                alert("查询结束日期不能早于开始日期");
                return false;
            }else if(noceUtil.isUndefined(beginDate) || noceUtil.isUndefined(endDate)){
            	 alert("请选择查询结束日期或开始日期");
                 return false;
            }else if(getDays(beginDate,endDate)>13){
                alert("查询起始日期不能超过两周");
                return false;

            }
            return true;
        }
        return false;
    },
    //获取搜索条件
    getParams: function () {
        var params = {
            beginDate: $('#dateBegin').val(),
            endDate: $('#dateEnd').val(),
            keyword: $('#txtSearch').val(),
            enodebid: $('#txtEnodebId').val(),
            cellid: $('#txtCellId').val(),
            areaType: $('#selectArea').val(),
            nodes: []
        };
        var selectedArea_Arr = $('#selectedArea').children(".selectedNode");
        if(noceUtil.ArrayIsNull(selectedArea_Arr)){
        	 alert("缺少查询的地域信息");
             return false;
        }
        $.each(selectedArea_Arr, function (i, item) {
            params.nodes.push($(item).attr("nodeId"));
        });

        return params;
    },
    //提交选项
    search: function () {
    	var param = this.getParams();
    	if(false == param || null == param || " " == param || "" == param ){
    		return;
    	}
    	if (param && this.valid()) {
            // badCellAnalysis.cellTable();
            SearchPanel.param = param;//保存查询条件
            //隐藏面板
            /*this.hide();*/
            var dateArr=getDates(param.beginDate,param.endDate);
            var re = /-/g;
            startHour = param.beginDate.replace(re, "") + "00";
            endHour = param.endDate.replace(re, "") + "23";
            //在这里新添加需替换变量的时间：
            startDay = param.beginDate.replace(re, "");
            endDay = param.endDate.replace(re, "");

            SearchPanel.param.beginDate = startHour;
            SearchPanel.param.endDate = endHour;
            //目前已经修改为只有按基站和按小区查询
            var nodes = param.nodes;
            if (nodes.length > 0) {
                badCellAnalysis.queryCellCount=1;
                var startMonth = startDay.substring(4, 6);
                var endMonth = endDay.substring(4, 6);

                var progressBarSqls = [], functionlists = [], databases = [];
                var list1 = [];var list2=[];//起始时间有可能不同月份
                list1=["badCellAnalysis_01_queryresult_hbase","KEY:" + "getByKeys","MONTH:" + startMonth];
                list2=["badCellAnalysis_01_queryresult_hbase","KEY:" + "getByKeys","MONTH:" + endMonth];
                if (param.areaType == "bts") {//按基站
                    var date;
                    var BASE_STATN_ID;
                    for(var j in dateArr){
                    	if(!date){
                            date="`DAY`="+dateArr[j];
						}else{
                            date=date+" or "+"`DAY`="+dateArr[j];
						}
                    }
                    for (var i in nodes) {
                        var nodeArr = nodes[i].split("-");
                        var endeb_id = nodeArr[2];
                        if(!BASE_STATN_ID){
                            BASE_STATN_ID="BASE_STATN_ID="+endeb_id;
                        }else{
                            BASE_STATN_ID=BASE_STATN_ID+" or "+"BASE_STATN_ID="+endeb_id;
                        }
                    }
                    progressbarTwo.submitSql([["badCellAnalysis_m06_cellquery_cellquery","DATE:"+date,"BASE_STATN_ID:"+BASE_STATN_ID]],
						[function eNodeiBycellId(data){
                            var res1;//拼接keyList
                            var res2;
                    		var result=callBackChangeData(data);
                            $.each(result,function(k,value) {
                                var month=value["day"].toString().substring(4,6);
                                if(startMonth==month){
                                    if(!res1){// 如果ret为空，则无需添加","作为分隔符
                                        res1=value["day"]+"_"+value["base_statn_id"]+"_"+value["cell_id"];
                                    }else{//给ret的每个key间添加","作为分隔符
                                        res1=res1+","+value["day"]+"_"+value["base_statn_id"]+"_"+value["cell_id"];
                                    }
                                }else{
                                    if(!res2){// 如果ret为空，则无需添加","作为分隔符
                                        res2=value["day"]+"_"+value["base_statn_id"]+"_"+value["cell_id"];
                                    }else{//给ret的每个key间添加","作为分隔符
                                        res2=res2+","+value["day"]+"_"+value["base_statn_id"]+"_"+value["cell_id"];
                                    }
								}
                            });
                            list1.push("KEYLIST:" + res1);
                            list2.push("KEYLIST:" + res2);
                            progressBarSqls.push(list1);
                            functionlists.push(badCellAnalysis.cellTableDataFormat);
                            databases.push(4);
                            if(startMonth!=endMonth){
                                progressBarSqls.push(list2);
                                functionlists.push(badCellAnalysis.cellTableDataFormat);
                                databases.push(4);
                                badCellAnalysis.queryCellCount=2;
                            }
                            if(progressBarSqls.length>0 && functionlists.length>0 && databases.length>0){
                                badCellAnalysis.cellTbleData=[];//缓存第一个表格的数据
                                badCellAnalysis.currentCellCount=0;
                                progressbarTwo.submitSql(progressBarSqls,functionlists,databases);
                            }
						}],
						[3]);

                } else if (param.areaType == "sector") {//按小区
                    var res1;//拼接keyList
                    var res2;
                    for (var i in nodes) {
                        var nodeArr = nodes[i].split("-");
                        var endeb_id = nodeArr[2];
                        var cell_id = nodeArr[3];
                        for(var j in dateArr){
                            var month=dateArr[j].substring(4,6);
                            if(startMonth==month){
                                if(!res1){// 如果ret为空，则无需添加","作为分隔符
                                    res1=dateArr[j]+"_"+endeb_id+"_"+cell_id;
                                }else{//给ret的每个key间添加","作为分隔符
                                    res1=res1+","+dateArr[j]+"_"+endeb_id+"_"+cell_id;
                                }
                            }else{
                                if(!res2){// 如果ret为空，则无需添加","作为分隔符
                                    res2=dateArr[j]+"_"+endeb_id+"_"+cell_id;
                                }else{//给ret的每个key间添加","作为分隔符
                                    res2=res2+","+dateArr[j]+"_"+endeb_id+"_"+cell_id;
                                }
                            }
                        }
                    }
                    list1.push("KEYLIST:" + res1);
                    list2.push("KEYLIST:" + res2);
                    progressBarSqls.push(list1);
                    functionlists.push(badCellAnalysis.cellTableDataFormat);
                    databases.push(4);
                    if(startMonth!=endMonth){
                        progressBarSqls.push(list2);
                        functionlists.push(badCellAnalysis.cellTableDataFormat);
                        databases.push(4);
                        badCellAnalysis.queryCellCount=2;
                    }
                    if(progressBarSqls.length>0 && functionlists.length>0 && databases.length>0){
                        badCellAnalysis.cellTbleData=[];//缓存第一个表格的数据
                        badCellAnalysis.currentCellCount=0;
                        progressbarTwo.submitSql(progressBarSqls,functionlists,databases);
                    }
                }
            }
            // $(".right-mainContent").height($(".perception_content").height() - 65);
            // $(".table-info").css("height","100%");
            $('.myTab').hide();
            $(".myTabTitle li").eq(0).addClass("current").siblings().removeClass("current");
            $('.myTabPan').eq(0).removeClass("hided").siblings().addClass("hided");
            $('#badCellAnalysis_cellInfo_table').html("");
        }

           /* var latnid_query;
            var marketbase_query;
            var enodebid_query;
            var cellid_query;
            var BASE_STATN_QUERY;
            var SECTORID_QUERY;
            
            var nodes = param.nodes;
            if(nodes.length > 0){
            	
            	var latnid_Arr = [];
            	var marketbase_Arr = [];
            	var enodebid_Arr = [];
            	var cellid_Arr = [];

            	var latnid = null;
            	var marketbase = null;
            	var enodebid = null;
            	var cellid = null;
            	
                if(param.areaType == "city"){
                	
                	latnid_query = "and LATN_ID in (";
                	for(var i = 0; i < nodes.length; i++){
                		latnid = nodes[i];
                		if($.inArray(latnid, latnid_Arr) == -1){
                			latnid_Arr.push(latnid);
                			latnid_query += latnid+",";
                		}
                	}
        			
        		}else if(param.areaType == "area"){
        			
        			latnid_query = "and LATN_ID in (";
        			marketbase_query = "and marketbase in (";
                	for(var i = 0; i < nodes.length; i++){
                		var node_id = nodes[i];
                		var node_Arr = node_id.split("-");
                		latnid = node_Arr[0];
                		marketbase = node_Arr[1];
                		if($.inArray(latnid, latnid_Arr) == -1){
            				latnid_Arr.push(latnid);
            				latnid_query += latnid+",";
            			}
            			if($.inArray(marketbase, marketbase_Arr) == -1){
            				marketbase_Arr.push(marketbase);
            				marketbase_query += "'"+marketbase+"',";
            			}
                	}
        			
        		}else if(param.areaType == "bts"){
        			
        			latnid_query = "and LATN_ID in (";
        			marketbase_query = "and marketbase in (";
        			enodebid_query = "and eNodeB_ID in (";
        			BASE_STATN_QUERY = "and BASE_STATN_ID in (";
                	for(var i = 0; i < nodes.length; i++){
                		var node_id = nodes[i];
                		var node_Arr = node_id.split("-");
                		latnid = node_Arr[0];
                		marketbase = node_Arr[1];
                		enodebid = node_Arr[2];
                		if($.inArray(latnid, latnid_Arr) == -1){
            				latnid_Arr.push(latnid);
            				latnid_query += latnid+",";
            			}
            			if($.inArray(marketbase, marketbase_Arr) == -1){
            				marketbase_Arr.push(marketbase);
            				marketbase_query += "'"+marketbase+"',";
            			}
            			if($.inArray(enodebid, enodebid_Arr) == -1){
            				enodebid_Arr.push(enodebid);
            				enodebid_query += "'"+enodebid+"',";
            				BASE_STATN_QUERY += enodebid+",";
            			}
                	}
        			
        		}else if(param.areaType == "sector"){
        			
        			latnid_query = "and LATN_ID in (";
        			marketbase_query = "and marketbase in (";
        			enodebid_query = "and eNodeB_ID in (";
        			cellid_query = "and CELL_ID in (";
        			BASE_STATN_QUERY = "and BASE_STATN_ID in (";
        			SECTORID_QUERY = "and SECTOR_ID in (";
                	for(var i = 0; i < nodes.length; i++){
                		var node_id = nodes[i];
                		var node_Arr = node_id.split("-");
                		latnid = node_Arr[0];
                		marketbase = node_Arr[1];
                		enodebid = node_Arr[2];
                		cellid = node_Arr[3];
                		if($.inArray(latnid, latnid_Arr) == -1){
            				latnid_Arr.push(latnid);
            				latnid_query += latnid+",";
            			}
            			if($.inArray(marketbase, marketbase_Arr) == -1){
            				marketbase_Arr.push(marketbase);
            				marketbase_query += "'"+marketbase+"',";
            			}
            			if($.inArray(enodebid, enodebid_Arr) == -1){
            				enodebid_Arr.push(enodebid);
            				enodebid_query += "'"+enodebid+"',";
            				BASE_STATN_QUERY += enodebid+",";
            			}
            			if($.inArray(cellid, cellid_Arr) == -1){
            				cellid_Arr.push(cellid);
            				cellid_query += cellid+",";
            				SECTORID_QUERY += cellid+",";
            			}
                	}
        		}
            }
            if(!noceUtil.isUndefined(latnid_query)){
            	latnid_query = latnid_query.substring(0, latnid_query.length-1)+")";
            }
            if(!noceUtil.isUndefined(marketbase_query)){
            	marketbase_query = marketbase_query.substring(0, marketbase_query.length-1)+")";
            }
            if(!noceUtil.isUndefined(enodebid_query)){
            	enodebid_query = enodebid_query.substring(0, enodebid_query.length-1)+")";
            }
            if(!noceUtil.isUndefined(cellid_query)){
            	cellid_query = cellid_query.substring(0, cellid_query.length-1)+")";
            }
            if(!noceUtil.isUndefined(BASE_STATN_QUERY)){
            	BASE_STATN_QUERY = BASE_STATN_QUERY.substring(0, BASE_STATN_QUERY.length-1)+")";
            }
            if(!noceUtil.isUndefined(SECTORID_QUERY)){
            	SECTORID_QUERY = SECTORID_QUERY.substring(0, SECTORID_QUERY.length-1)+")";
            }
            
//           //判断查询方式
//            function compareDateIsSeparatedXDay_2 (startTime,endTime,x){
//    			if(isNaN(startTime)||isNaN(endTime)||isNaN(x)){
//    				alert("传入的参数有不全为数字的参数");
//    				return;
//    			}
//    			if(startTime.length!=8||endTime.length!=8){
//    				alert("请检查传入的时间是否为YYYYMMDD的格式");
//    				return;
//    			}
//    			 var d1 = new Date(startTime.substring(0,4),startTime.substring(4,6),startTime.substring(6));
//    			 var d2 = new Date(endTime.substring(0,4),endTime.substring(4,6),endTime.substring(6));
//    			 if(d1.getTime()>d2.getTime()+1000*60*60*24*x){//当前的时间比开始时间+100天大，说明所选时间超过了100天
//    				 SearchPanel.booleanTime = true;
//    			 }else{
//    				 SearchPanel.booleanTime = false;
//    			 }
//    		 };
//
//    		var beforeTime = noceUtil.getCurYYYYMMDD();
//    		compareDateIsSeparatedXDay_2(beforeTime,startDay,100);
    		SearchPanel.booleanTime = true;//改为查Impala
            if(SearchPanel.booleanTime){//返回true,超过三个月，查Impala
            	templateID="badCellAnalysis_02_queryresult";
            }else{
            	templateID="badCellAnalysis_m02_queryresult";
            }
            var list,paramList;
            
            
            if(param.areaType == "city"){
            	list = [templateID,"START_DAY:"+startDay,"END_DAY:"+endDay,"NETWORK:4","NETTYPE:4G","KQILEVEL:差",
        	            "LATNID_QUERY:"+latnid_query,"MARKETBASE_QUERY:",
        	            "ENODEBID_QUERY:","CELLID_QUERY:","BASE_STATN_QUERY:","SECTORID_QUERY:"];

                paramList=["START_DAY:"+startDay,"END_DAY:"+endDay,"NETWORK:4","NETTYPE:4G","KQILEVEL:差",
                    "LATNID_QUERY:"+latnid_query,"MARKETBASE_QUERY:",
                    "ENODEBID_QUERY:","CELLID_QUERY:","BASE_STATN_QUERY:","SECTORID_QUERY:"];

            }else if(param.areaType == "area"){
            	list = [templateID,"START_DAY:"+startDay,"END_DAY:"+endDay,"NETWORK:4","NETTYPE:4G","KQILEVEL:差",
        	            "LATNID_QUERY:"+latnid_query,"MARKETBASE_QUERY:"+marketbase_query,
        	            "ENODEBID_QUERY:","CELLID_QUERY:","BASE_STATN_QUERY:","SECTORID_QUERY:"];

                paramList=["START_DAY:"+startDay,"END_DAY:"+endDay,"NETWORK:4","NETTYPE:4G","KQILEVEL:差",
                    "LATNID_QUERY:"+latnid_query,"MARKETBASE_QUERY:"+marketbase_query,
                    "ENODEBID_QUERY:","CELLID_QUERY:","BASE_STATN_QUERY:","SECTORID_QUERY:"];

            }else if(param.areaType == "bts"){
            	list = [templateID,"START_DAY:"+startDay,"END_DAY:"+endDay,"NETWORK:4","NETTYPE:4G","KQILEVEL:差",
        	            "LATNID_QUERY:"+latnid_query,"MARKETBASE_QUERY:"+marketbase_query,
        	            "ENODEBID_QUERY:"+enodebid_query,"BASE_STATN_QUERY:"+BASE_STATN_QUERY,"CELLID_QUERY:","SECTORID_QUERY:"];

                paramList=["START_DAY:"+startDay,"END_DAY:"+endDay,"NETWORK:4","NETTYPE:4G","KQILEVEL:差",
                    "LATNID_QUERY:"+latnid_query,"MARKETBASE_QUERY:"+marketbase_query,
                    "ENODEBID_QUERY:"+enodebid_query,"BASE_STATN_QUERY:"+BASE_STATN_QUERY,"CELLID_QUERY:","SECTORID_QUERY:"];

            }else if(param.areaType == "sector"){
            	list = [templateID,"START_DAY:"+startDay,"END_DAY:"+endDay,"NETWORK:4","NETTYPE:4G","KQILEVEL:差",
            	            "LATNID_QUERY:"+latnid_query,"MARKETBASE_QUERY:"+marketbase_query,
            	            "ENODEBID_QUERY:"+enodebid_query,"CELLID_QUERY:"+cellid_query,"BASE_STATN_QUERY:"+BASE_STATN_QUERY,"SECTORID_QUERY:"+SECTORID_QUERY];

                paramList=["START_DAY:"+startDay,"END_DAY:"+endDay,"NETWORK:4","NETTYPE:4G","KQILEVEL:差",
                    "LATNID_QUERY:"+latnid_query,"MARKETBASE_QUERY:"+marketbase_query,
                    "ENODEBID_QUERY:"+enodebid_query,"CELLID_QUERY:"+cellid_query,"BASE_STATN_QUERY:"+BASE_STATN_QUERY,"SECTORID_QUERY:"+SECTORID_QUERY];
            }
            var	tableThead="";
            var titleName="";
            if(SearchPanel.booleanTime){//返回true,超过三个月，查Impala
       		 tableThead="地市,基站名称,基站ID,小区名称,小区ID,总记录数,首页时延优良率(%),视频业务优良率(%),平均值(ms),质差记录数,质差记录占比 (%)," +
	    		"平均值(ms),质差记录数,质差记录占比 (%),平均值(ms),质差记录数,质差记录占比 (%),"+
	    		"平均值(ms),质差记录数,质差记录占比 (%),平均值(ms),质差记录数,质差记录占比 (%)";

       		 titleName=["地市","基站名称","基站ID","小区名称","小区ID","总记录数","首页时延优良率(%)","视频业务优良率(%)","平均值(ms)","质差记录数","质差记录占比 (%)","平均值(ms)","质差记录数","质差记录占比 (%)","平均值(ms)","质差记录数","质差记录占比 (%)","平均值(ms)","质差记录数","质差记录占比 (%)","平均值(ms)","质差记录数","质差记录占比 (%)"];

            }else{
    		    //sql&默认的排序字段&行数&指定的中文表头名称
    		    tableThead="地市,基站名称,基站ID,小区名称,小区ID,总记录数,首页时延优良率(%),视频业务优良率(%),平均值(ms),质差记录数,质差记录占比 (%)," +
	    		"平均值(ms),质差记录数,质差记录占比 (%),平均值(ms),质差记录数,质差记录占比 (%),"+
	    		"平均值(ms),质差记录数,质差记录占比 (%),平均值(ms),质差记录数,质差记录占比 (%)";

                titleName=["地市","基站名称","基站ID","小区名称","小区ID","总记录数","首页时延优良率(%)","视频业务优良率(%)","平均值(ms)","质差记录数","质差记录占比 (%)","平均值(ms)","质差记录数","质差记录占比 (%)","平均值(ms)","质差记录数","质差记录占比 (%)","平均值(ms)","质差记录数","质差记录占比 (%)","平均值(ms)","质差记录数","质差记录占比 (%)"];

            }//已去除门限值那两列，相应的SQL也已经去除那两列
		    
    	}*/
    	
    	/*
    	//----------------------------------拼接表格对象---------------------------------------------
		//排序对象
		var	sortObj={sortColumn:"TEST_NUM_ALL",sortType:"desc"};
		//分页对象
		var pageObj={pageSize:10,pageFlag:1};
		var fixObj={
				fixClnObj:{
					fixCln:6,
					tableId:"badCellAnalysis_tableFix_data",
					divClass:"badCellAnalysis_tableFix"
				}
		};
        var exportObj={
            fileName: "质差小区分析" + Math.round((Math.random() * 100000)),
            dataType: 2,
            paraLists: [
                {
                    sheetName: "质差小区分析",
                    titleName: titleName,
                    mergeTitle: [
                    	{
							startCol:6,
							endCol:7,
							titleName:"感知指标"
                    	},
                        {
                            startCol:8,
                            endCol:10,
                            titleName:"第一段时延"
                        },
                        {
                            startCol:11,
                            endCol:13,
                            titleName:"第二段时延"
                        },
                        {
                            startCol:14,
                            endCol:16,
                            titleName:"第三段时延"
                        },
                        {
                            startCol:17,
                            endCol:19,
                            titleName:"第四段时延"
                        },
                        {
                            startCol:20,
                            endCol:22,
                            titleName:"第五段时延"
                        }
					],
                    templateId: templateID,
                    templatePara: paramList
                }
            ]
        }
		//表格对象
		var tableObject={divId:"badCellAnalysis_table",
				tableId:"badCellAnalysis_table_data",
				tableHead:tableThead,
				dataType:2,
				sql:list,
				sortFlag:1,
				sortObj:sortObj,
			    pageObj:pageObj,
		    	fixObj:fixObj,
                exportObj:exportObj
		    	};

		var tableTools = new TableToolsNewTwo();
		tableTools.submit(tableObject);
//---------------------------------拼接表格对象----------------------------------------------
    	//由于新页面样式需要，故加：
    	//$("#badCellAnalysis_table_data").addClass('table table-bordered');
	 	//给表头的均值加上门限值显示出来:2017-03-21
    	var arr2 = $("#badCellAnalysis_table_data tr");
		var tr = arr2[0];


		
		$(tr).children().eq(2).children().children().eq(0).text("平均值(ms) [质差门限>"+SearchPanel.low1+"ms]");
		$(tr).children().eq(5).children().children().eq(0).text("平均值(ms) [质差门限>"+SearchPanel.low2+"ms]");
		$(tr).children().eq(8).children().children().eq(0).text("平均值(ms) [质差门限>"+SearchPanel.low3+"ms]");
		$(tr).children().eq(11).children().children().eq(0).text("平均值(ms) [质差门限>"+SearchPanel.low4+"ms]");
		$(tr).children().eq(14).children().children().eq(0).text("平均值(ms) [质差门限>"+SearchPanel.low5+"ms]");
$(tr).before("<tr><th colspan='2'  ><div class='alltd'>感知指标</div></th>" +
		         "<th style='color:#0099FF' colspan='3' title ='Tcp第二次握手时延（CN/CP侧原因）'><div class='alltd'>第一段时延</div></th>" +
		         "<th style='color:#0099FF' colspan='3' title ='第三次握手时延（无线/终端侧原因）'><div class='alltd'>第二段时延</div></th>" +
		         "<th style='color:#0099FF' colspan='3' title ='第三次ACK与HTTP GET的时延（无线/终端侧原因）'><div class='alltd'>第三段时延</div></th>" +
		         "<th style='color:#0099FF' colspan='3' title='首GET响应时延（CN/CP侧原因）'><div class='alltd'>第四段时延</div></th>" +
		         "<th style='color:#0099FF' colspan='3' title ='200ok到FIN时延'><div class='alltd'>第五段时延</div></th></tr>");

var arr2Fix = $("#badCellAnalysis_tableFix_data tr");
var trFix = arr2Fix[0];
$(trFix).before("<tr><th class='noBottom'><div class='alltd'></div></th><th class='noBottom'><div class='alltd'></div></th><th class='noBottom'><div class='alltd'></div></th><th class='noBottom'>" +"<div class='alltd'></div></th><th class='noBottom'><div class='alltd'></div></th><th class='noBottom'><div class='alltd'></div></th><th class='noBottom'><div class='alltd'></div></th></tr>");

	*/
    }
};

// 获取开始日期至结束日期中所有的日期
function getDates(startDay, endDay) {
    var dateArr=[];
    // 获取入参字符串形式日期的Date型日期
    var d1 = new Date(startDay);
    var d2 = new Date(endDay);

    // 定义一天的毫秒数
    var dayMilliSeconds  = 1000*60*60*24;

    // 获取输入日期的毫秒数
    var d1Ms = d1.getTime();
    var d2Ms = d2.getTime();

    // 定义返回值
    var ret;

    // 对日期毫秒数进行循环比较，直到d1Ms 大于等于 d2Ms 时退出循环
    // 每次循环结束，给d1Ms 增加一天
    for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
        // 将给的毫秒数转换为Date日期
        var day = new Date(d1Ms);

        // 获取其年月日形式的字符串
        ret = day.format('yyyyMMdd');

        /*// 如果ret为空，则无需添加","作为分隔符
        if (!ret) {
            // 将给的毫秒数转换为Date日期
            var day = new Date(d1Ms);

            // 获取其年月日形式的字符串
            ret = day.format('yyyyMMdd');
        } else {

            // 否则，给ret的每个字符日期间添加","作为分隔符
            var day = new Date(d1Ms);
            ret = ret + ',' + day.format('yyyyMMdd');
        }*/
        dateArr.push(ret);
    }
    return dateArr;

}

function getDays(startDay, endDay){
    var s1 = new Date(startDay);
    var s2 = new Date(endDay);
    var days = s2.getTime() - s1.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    return day;
}