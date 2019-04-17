IntelligentRoadTestV2={};
IntelligentRoadTestV2.map=null;
IntelligentRoadTestV2.starDate=null;
IntelligentRoadTestV2.endDate=null;
IntelligentRoadTestV2.provLineData = [];
IntelligentRoadTestV2.cityLineData = [];
IntelligentRoadTestV2.type = 1;//页面类型 1覆盖率 2为测试进度 3为测试总数
$(function () {
    $(window).resize(function(){
    	IntelligentRoadTestV2.map.resize();
    	IntelligentRoadTestV2.chartBottom.resize();
//    	canvasDrawing();
    });
    $(".showHideIcon").click(function(){
        $(window).resize();
    });
})
$(function(){
	IntelligentRoadTestV2.cityPermission=$('#cityPermission_common').val();
//	IntelligentRoadTestV2.cityPermission='广州';
	IntelligentRoadTestV2.city="全省";
	IntelligentRoadTestV2.init();
	//时间变化趋势图切换到全省按钮
	$('#btn_1').click(function(){
		IntelligentRoadTestV2.city="全省";
		IntelligentRoadTestV2.showBottomBar(IntelligentRoadTestV2.bottomBarData,IntelligentRoadTestV2.type);
		$('#btn_1').hide();
	});
	//跳转到分析页面
	$('#fxPage').click(function(){
		var city;
		var day=$('#seachTime').val();
		if(IntelligentRoadTestV2.city=="全省"){
			city="深圳";
		}else{
			city=IntelligentRoadTestV2.city;
		}
		window.open("pages_index_Index_home.action?appId=IntelligentRoadTestAnalysisV2&menuId=456&perId=473&id_path=new&isRedirect=true&appName=智能路测分析页V2&isShowPoor=1&city="+city+"&day="+day);
	});

	//切换场景的时候
	$("#senseSelect").change(function(){
		if($("#senseSelect").val() == '其他'){
			if($("#sub_1").val() == 2){
                $("#sub_1").val(1);
                IntelligentRoadTestV2.type = 1;
			}
			$("#testView").hide();
		}else{
            $("#testView").show();
		}
        IntelligentRoadTestV2.queryMapData();
        IntelligentRoadTestV2.queryTotalData();
        IntelligentRoadTestV2.queryTrendData(IntelligentRoadTestV2.starDate , IntelligentRoadTestV2.endDate);
	});

	//切换数据维度的事件
	$('#sub_1').change(function(){
        var sense=$("#senseSelect option:selected").val(); //场景
        if(sense == "全部"){
            sense = "所有场景";
        }
		IntelligentRoadTestV2.type = parseInt($("#sub_1").val());
        if(IntelligentRoadTestV2.type == 1){
            $('#vT').html("覆盖率视图");
            var html="";
            for(var i=0;i<IntelligentRoadTestV2.appRatioTotalData.length;i++) {
                html=html+'<div class="count down"><span class="current top">'+IntelligentRoadTestV2.appRatioTotalData.substring(i, i+1)+'</span><span class="current bottom">'+IntelligentRoadTestV2.appRatioTotalData.substring(i, i+1)+'</span></div>';
            }
            $('.totalNum').html(html); //这是右边的数据显示
            $('.rText').html("全省"+sense+"掌上优覆盖率"); //右边的标题
            $('#bottomBar').html(IntelligentRoadTestV2.city+sense+"历史30天掌上优覆盖率");//右下角的图的标题
        }else if(IntelligentRoadTestV2.type == 2){
            $('#vT').html("测试进度视图");
            var html="";
            for(var i=0;i<IntelligentRoadTestV2.sceneRatioData.length;i++) {
                html=html+'<div class="count down"><span class="current top">'+IntelligentRoadTestV2.sceneRatioData.substring(i, i+1)+'</span><span class="current bottom">'+IntelligentRoadTestV2.sceneRatioData.substring(i, i+1)+'</span></div>';
            }
            $('.totalNum').html(html);
            $('.rText').html("全省"+sense+"测试进度");
            $('#bottomBar').html(IntelligentRoadTestV2.city+sense+"历史30天测试进度");
        }else{
            $('#vT').html("测试总数视图");
            var html="";
            for(var i=0;i<IntelligentRoadTestV2.rsrp140CntData.length;i++) {
                html=html+'<div class="count down"><span class="current top">'+IntelligentRoadTestV2.rsrp140CntData.substring(i, i+1)+'</span><span class="current bottom">'+IntelligentRoadTestV2.rsrp140CntData.substring(i, i+1)+'</span></div>';
            }
            $('.totalNum').html(html);
            $('.rText').html("全省"+sense+"测试总数");
            $('#bottomBar').html(IntelligentRoadTestV2.city+sense+"历史30天测试总数");
        }
		IntelligentRoadTestV2.showMap(IntelligentRoadTestV2.mapData,IntelligentRoadTestV2.type);
		if(IntelligentRoadTestV2.city=="全省"){
			IntelligentRoadTestV2.showBottomBar(IntelligentRoadTestV2.bottomBarData,IntelligentRoadTestV2.type);
		}else{
			IntelligentRoadTestV2.showBottomBar(IntelligentRoadTestV2.bottomBarDataCity,IntelligentRoadTestV2.type);
		}
		})
})
/**********************************
 * @funcname IntelligentRoadTestV2.init
 * @funcdesc 页面初始化方法。查询数据的最大时间，并根据最大时间初始化时间控件并查询地图及全省弱区总数及弱栅格占比数据。
 * @return {null}
 * @author 郑文彬
 * @create 20171218
 ***********************************/
IntelligentRoadTestV2.init=function IntelligentRoadTestV2_init(){
	  IntelligentRoadTestV2.map= echarts.init(document.getElementById("mapContent"));
	  IntelligentRoadTestV2.chartTop = echarts.init(document.getElementById("chartTop"));
	  IntelligentRoadTestV2.chartBottom = echarts.init(document.getElementById("chartBottom"));
		//查询数据最大时间
		progressbarTwo.submitSql([["AppTest_getMaxDay"]] ,
				[IntelligentRoadTestV2.loadPage],
				[3],null,null,null,null,true);
}
/**********************************
 * @funcname IntelligentRoadTestV2.loadPage
 * @funcdesc 并根据最大时间初始化时间控件并查询地图及全省弱区总数及弱栅格占比数据。
 * @param {object} data (input optional)
      通过IntelligentRoadTest_07_maxDay模板查询的含有最大时间的结果集
 * @return {null}
 * @author 郑文彬
 * @create 20171218
 ***********************************/
IntelligentRoadTestV2.loadPage=function IntelligentRoadTestV2_loadPage(data){
    var maxTime = pageMaxTime().replace(/\-/g,"");
    var fomatDate = maxTime.substring(0, 4) + "/" + maxTime.substring(4, 6) + "/" + maxTime.substring(6, 8);
    var d=new Date(fomatDate);
    var date= new Date(d.getFullYear(), d.getMonth(), d.getDate()-6);
    var year=date.getFullYear()+"";
    var month=date.getMonth()+1+"";
    var day=date.getDate()+"";
    if(month.length==1){
        month="0"+month;
    }
    if(day.length==1){
        day="0"+day;
    }
    var startTime = year+month+day;
    $('#seachTime').val(maxTime);
    srtTime = $('#seachTime').val();
	var fomatDate=srtTime.substring(0,4)+"/"+srtTime.substring(4,6)+"/"+srtTime.substring(6,8);
	var now =new Date(srtTime);
	var obj=IntelligentRoadTestV2.getFirstDayOfWeek(now);
	IntelligentRoadTestV2.queryMapData(srtTime);
	IntelligentRoadTestV2.starDate=getNewDate(fomatDate,-30);
	IntelligentRoadTestV2.endDate=srtTime;
	IntelligentRoadTestV2.queryTotalData();
	IntelligentRoadTestV2.queryTrendData(IntelligentRoadTestV2.starDate , IntelligentRoadTestV2.endDate);
}

IntelligentRoadTestV2.queryTotalData = function IntelligentRoadTestV2_queryTotalData(){
    var objectType = $("#senseSelect").val(); //获取场景类型
	objectType = "and object_Type = '" + objectType + "'";
	var day = IntelligentRoadTestV2.endDate;
    var sqlList = [];
    var list = ["APPTest_02_getProvinceTotalData" , "DAY:" + day , "OBJECTTYPE:" + objectType ];
    sqlList.push(list);
    var funcList = [IntelligentRoadTestV2.dealBottomBarDataProvince];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database);
}

IntelligentRoadTestV2.dealBottomBarDataProvince = function IntelligentRoadTestV2_dealBottomBarDataProvince(data){
	var result = callBackChangeData(data);
	console.log(result);
	if(result.length > 0){
        IntelligentRoadTestV2.appRatioTotalData = result[0].app_ratio_avg + "%";
        IntelligentRoadTestV2.sceneRatioData = result[0].scene_ratio_avg + "%";
        IntelligentRoadTestV2.rsrp140CntData = result[0].rsrp140_sum + "";
		var sense = $("#senseSelect").val();
		if(sense == "全部"){
			sense = "所有场景";
		}
		if(IntelligentRoadTestV2.type == 1){
			$('#vT').html("覆盖率视图");
			var html="";
			for(var i=0;i<IntelligentRoadTestV2.appRatioTotalData.length;i++) {
				html=html+'<div class="count down"><span class="current top">'+IntelligentRoadTestV2.appRatioTotalData.substring(i, i+1)+'</span><span class="current bottom">'+IntelligentRoadTestV2.appRatioTotalData.substring(i, i+1)+'</span></div>';
			}
			$('.totalNum').html(html); //这是右边的数据显示
			$('.rText').html("全省"+sense+"掌上优覆盖率"); //右边的标题
			$('#bottomBar').html(IntelligentRoadTestV2.city+sense+"历史30天掌上优覆盖率");//右下角的图的标题
		}else if(IntelligentRoadTestV2.type == 2){
			$('#vT').html("测试进度视图");
			var html="";
			for(var i=0;i<IntelligentRoadTestV2.sceneRatioData.length;i++) {
				html=html+'<div class="count down"><span class="current top">'+IntelligentRoadTestV2.sceneRatioData.substring(i, i+1)+'</span><span class="current bottom">'+IntelligentRoadTestV2.sceneRatioData.substring(i, i+1)+'</span></div>';
			}
			$('.totalNum').html(html);
			$('.rText').html("全省"+sense+"测试进度");
			$('#bottomBar').html(IntelligentRoadTestV2.city+sense+"历史30天测试进度");
		}else{
			$('#vT').html("测试总数视图");
			var html="";
			for(var i=0;i<IntelligentRoadTestV2.rsrp140CntData.length;i++) {
				html=html+'<div class="count down"><span class="current top">'+IntelligentRoadTestV2.rsrp140CntData.substring(i, i+1)+'</span><span class="current bottom">'+IntelligentRoadTestV2.rsrp140CntData.substring(i, i+1)+'</span></div>';
			}
			$('.totalNum').html(html);
			$('.rText').html("全省"+sense+"测试总数");
			$('#bottomBar').html(IntelligentRoadTestV2.city+sense+"历史30天测试总数");
		}
	}
}

IntelligentRoadTestV2.queryTrendData = function IntelligentRoadTestV2_queryTrendData(startDay , endDay){
    var objectType = $("#senseSelect").val(); //获取场景类型
    objectType = "and object_Type = '" + objectType + "'";
    var sqlList = [];
    var city = IntelligentRoadTestV2.city.replace("市" , "");
    var list = [];
    if(IntelligentRoadTestV2.city != "全省"){
        list = ["APPTest_03_getDataTrendData" , "STARTDAY:" + startDay , "ENDDAY:" + endDay ,  "CITY:" + city , "OBJECTTYPE:" + objectType ];
	}else{
        list = ["APPTest_04_getDataTrendDataForAllCity" , "STARTDAY:" + startDay , "ENDDAY:" + endDay ,  "OBJECTTYPE:" + objectType ];
	}
    sqlList.push(list);
    var funcList = [IntelligentRoadTestV2.showBottomBar];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database);
}

IntelligentRoadTestV2.dealTrendData = function IntelligentRoadTestV2_dealTrendData(data){
	var result = callBackChangeData(data);
	console.log(result);
}

/**********************************
 * @funcname IntelligentRoadTestV2.queryBottomBarDataProvince
 * @funcdesc 根据起始时间结束时间查询地市的弱区总数及弱栅格占比时间变化趋势
 * @param {Object} e (input optional)
     点击地图时捕获的对象
 * @return {null}
 * @author 郑文彬
 * @create 20171218
 ***********************************/
IntelligentRoadTestV2.queryBottomBarDataCity=function IntelligentRoadTestV2_queryBottomBarDataCity(e){
	//点击地图后选中城市高亮
	IntelligentRoadTestV2.map.dispatchAction({
		type: 'geoSelect',
		seriesIndex: 0,
		dataIndex:0
	});

	if(IntelligentRoadTestV2.cityPermission!="全省"){
		if((e.name).indexOf(IntelligentRoadTestV2.cityPermission)==-1){
			return;
		}
	}
	if(e.componentType!="geo"){
		IntelligentRoadTestV2.map.dispatchAction({
		type: 'geoToggleSelect',
		seriesIndex: 0,
		name:e.name
	});
		IntelligentRoadTestV2.map.setOption(option);
	}

	IntelligentRoadTestV2.map.dispatchAction({
		type: 'showTip',
		seriesIndex: 0,
		name:e.name
	});
	var endDate=$('#seachTime').val();
	var starDate=getNewDate(endDate.substring(0,4)+"/"+endDate.substring(4,6)+"/"+endDate.substring(6,8),-30);
	IntelligentRoadTestV2.city=e.name;
	IntelligentRoadTestV2.queryTrendData(starDate , endDate);

}
/**********************************
 * @funcname IntelligentRoadTestV2.showBottomBar
 * @funcdesc 根据传入的数据，显示下方时间变化echarts图
 * @param {Object} data (input optional)
     全省或者是地市 时间变化趋势图数据
 * @return {null}
 * @author 郑文彬
 * @create 20171218
 ***********************************/
IntelligentRoadTestV2.showBottomBar=function showBottomBar(data){
	var type=IntelligentRoadTestV2.type;
    var min=0;
    var max=null;
    var interval=null;
    var sense=$("#senseSelect option:selected").val();
    if(sense == "全部"){
    	sense = "所有场景";
	}
	if(IntelligentRoadTestV2.city=="全省"){
		IntelligentRoadTestV2.bottomBarData=data;
		/*if(IntelligentRoadTestV2.cityPermission!="全省"){
			$('#fxPage').html(IntelligentRoadTestV2.cityPermission+"覆盖分析");
		}else{
			$('#fxPage').html("深圳覆盖分析");
		}*/
	}else{
		$('#btn_1').show();
		/*$('#fxPage').html(IntelligentRoadTestV2.city+"覆盖分析");*/
		IntelligentRoadTestV2.bottomBarDataCity=data;
	}
	data = callBackChangeData(data);
	var nameStr = "%";
	if(type == 1){
        $('#bottomBar').html(IntelligentRoadTestV2.city + sense + "历史30天掌上优覆盖率");
	}else if(type == 2){
        $('#bottomBar').html(IntelligentRoadTestV2.city + sense + "历史30天测试进度");
	}else{
        nameStr = "次";
        $('#bottomBar').html(IntelligentRoadTestV2.city + sense + "历史30天测试总数");
	}
	IntelligentRoadTestV2.bottomecharData={day:[],value:[],valueTwo:[]}
	 for(var i=0;i<data.length;i++){
		  var obj={};
		  var day=data[i].day+"";
		  IntelligentRoadTestV2.bottomecharData.day.push(day.substring(4,8));
		  if(type == 1){
		  	  if(data[i].app_ratio != null){
                  IntelligentRoadTestV2.bottomecharData.value.push((parseFloat(data[i].app_ratio)).toFixed(2));
			  }else{
                  IntelligentRoadTestV2.bottomecharData.value.push(null);
			  }
		  }else if(type == 2){
		  	  if(data[i].scene_ratio != null){
                  IntelligentRoadTestV2.bottomecharData.value.push((parseFloat(data[i].scene_ratio)).toFixed(2));
			  }else{
                  IntelligentRoadTestV2.bottomecharData.value.push(null);
			  }
		  }else{
			  IntelligentRoadTestV2.bottomecharData.value.push(data[i].rsrp_140_cnt);
		  }
	  }
	 /*//--y轴固定刻度
	 if(type==1){
	     var yAxis=yAxisSplit(IntelligentRoadTestV2.bottomecharData.value,100,5)
		 max=yAxis.max;
	     interval=yAxis.interval;
	 }else{

		 max=null;
	     interval=2;
	     min=0;
	 }*/
     var  optionBtm = {
	        tooltip: {
	            trigger: 'axis',
	            formatter:function(params ){
		        	var str='<ul style="">';
		        	str=str+'<li style="">&nbsp&nbsp&nbsp&nbsp'+params[0].axisValue+'</li>';
		        	for(var i=0;i<params.length;i++){
		        	   var s='';
		        	if(IntelligentRoadTestV2.type != 3){
		        		s='%';
		        	}
		        	var color="#4ba0d9";
		        	if(params[i].seriesName=="全省"){
		        		color="#4ba0d9";
		        	}
		        		str=str+'<li style=""><span style="color:'+color+';font-size: 20px;padding-right: 5px;">●</span>'+params[i].seriesName+': '+(params[i].value)+''+s+'</li>';
		        	}
		        		return str+'</ul>';
		        }
	        },
	        grid: {
	            left: '3%',
	            right: '4%',
	            bottom: '3%',
	            containLabel: true
	        },
	        xAxis: [
	            {
	                type: 'category',
//	                data : ['1','2','3','4','5','6','7','8','9','10','11','12'],
	                data : IntelligentRoadTestV2.bottomecharData.day,
	                axisPointer: {
	                    type: 'shadow'
	                },
	                axisLine: {
	                    lineStyle: {
	                        color: '#969799'
	                    }
	                },
	                axisTick: {
	                    show: false
	                }
	            }
	        ],
	        yAxis: [
	            {
	                type: 'value',
	                name:nameStr,
	                min: 0,
					nameLocation : 'end',
	                axisLabel: {
	                    show: true,
	                    textStyle: {
	                        color: "#969799"
	                    }
	                },
	                axisLine: {
	                    show: false
	                },
	                splitLine: {
	                    show: false
	                },
	                axisTick: {
	                    show: false
	                },
	            }
	        ],
	        series: [

	            {
	                name: IntelligentRoadTestV2.city,
	                type: 'line',
	                smooth: true,
	                symbol: 'circle',
	                symbolSize: 5,
	                showSymbol: false,
	                yAxisIndex:0,
	                lineStyle: {
	                    normal: {
	                        width: 1
	                    }
	                },
	                areaStyle: {
	                	type:"linear",
	                    normal: {
//	                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
//	                            offset: 0,
//	                            color: 'rgba(16,97,204, 0.3)'
//	                        }, {
//	                            offset: 0.8,
//	                            color: 'rgba(17,235,210, 0)'
//	                        }], false),
	                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                            offset: 0, color: 'rgba(16,97,204, 0.3)' // 0% 处的颜色
	                        }, {
	                            offset: 1, color: 'rgba(255, 255,255, 0)' // 100% 处的颜色
	                        }], false),
	                        shadowColor: 'rgba(17,235,210, 0)',
	                        shadowBlur: 10
	                    }
	                },
	               itemStyle: {
	                        normal: {
	                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
	                                offset: 0,
	                                color: 'rgba(16,97,204,1)'
	                            }, {
	                                offset: 1,
	                                color: 'rgba(17,235,210,1)'
	                            }])
	                        },
	                        emphasis: {
	                        color: 'rgb(0,196,132)',
	                        borderColor: 'rgba(0,196,132,0.2)',
	                        extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
	                        borderWidth: 10
	                    }
	                    },
	                data:IntelligentRoadTestV2.bottomecharData.value
	            }
	            ]
	    };



	  IntelligentRoadTestV2.chartBottom.setOption(optionBtm);
	  IntelligentRoadTestV2.chartBottom.resize();
}
/**********************************
 * @funcname IntelligentRoadTestV2.queryMapData
 * @funcdesc 根据日趋查询地图数据
 * @param {Object} day (input optional)
     日期
 * @return {null}
 * @author 郑文彬
 * @create 20171218
 ***********************************/
IntelligentRoadTestV2.queryMapData=function IntelligentRoadTestV2_queryMapData(day){
	if(day == null){
		day = IntelligentRoadTestV2.endDate;
	}
	var objectType = $("#senseSelect").val(); //获取场景类型
	objectType = "and object_Type = '" + objectType + "'";
    var sqlList = [];
    var list = ["APPTest_01_getTotalData","DAY:" + day , "OBJECTTYPE:" + objectType];
    sqlList.push(list);
    var funcList = [IntelligentRoadTestV2.showMapAndBar];
    var database = [3];
    progressbarTwo.submitSql(sqlList , funcList , database);
}
/**********************************
 * @funcname IntelligentRoadTestV2.showMapAndBar
 * @funcdesc 显示地图 当前日期的bar图不需要已注释
 * @param {Object} data (input optional)
    地图若区总数和弱栅格占比数据
 * @return {null}
 * @author 郑文彬
 * @create 20171218
 ***********************************/
IntelligentRoadTestV2.showMapAndBar=function IntelligentRoadTestV2_showMapAndBar(data){
	var result = callBackChangeData(data);
	console.log(result);
	IntelligentRoadTestV2.mapData=result;
	IntelligentRoadTestV2.showMap(result,IntelligentRoadTestV2.type);
}
/**********************************
 * @funcname IntelligentRoadTestV2.showMap
 * @funcdesc 按类型显示地图
 * @param {Object} data (input optional)
     地图数据
 * @param {string} type (input optional)
     type==1显示弱区总数地图 type==0弱栅格占比地图
 * @return {null}
 * @author 郑文彬
 * @create 20171218
 ***********************************/
IntelligentRoadTestV2.showMap=function IntelligentRoadTestV2_showMap(data,type){
	IntelligentRoadTestV2.map.dispose();
	IntelligentRoadTestV2.map= null;
	IntelligentRoadTestV2.map= echarts.init(document.getElementById("mapContent"));
	  var uploadedDataURL = "../js/IntelligentRoadTest/guangdong.json";
	  var num=1;
	  if(type == 1){
		  num=1;
	  }else if(type == 2){
	  	  num = 1;
	  }else{
	  	  num = 1;
	  }
	  IntelligentRoadTestV2.echartsData=[];
	  if(type == 1){//覆盖率
	  	  data=data.sort(by("app_ratio"));
	  }else if(type == 2){//
		  data=data.sort(by("scene_ratio"));
	  }else{
          data=data.sort(by("rsrp_140_cnt"));
	  }
	  data.reverse();
	  console.log(data)
      var max = 100;
	  if(data.length > 0){
          if(type == 1){//覆盖率
              max = data.length;
          }else if(type == 2){//
              max = data.length;
          }else{
          	  max = data.length;
          }
	  }
	  var dataLength = data.length;
	  if(dataLength == 0){ //没有数据
	  	dataLength = 21;
	  }
	  for(var i=0;i<data.length;i++){
		  if(data[i].city!="全省"){
			  var obj={};
			  obj.name =data[i].city + "市";
			  if(type == 1){
			  	  obj.type = 1;
			  	  obj.rsrp_sinr_cnt = data[i].rsrp_sinr_cnt;
			  	  obj.rsrp_140_cnt = data[i].rsrp_140_cnt;
				  obj.realValue=(data[i].app_ratio);
                  obj.value = 21 - i;
			  }else if(type == 2){
                  obj.type = 2;
				  obj.realValue=(data[i].scene_ratio);
				  obj.object_name_cnt = data[i].object_name_cnt;
				  obj.scene_tot = data[i].scene_tot;
                  obj.value = 21 - i;
			  }else{
                  obj.type = 3;
                  obj.realValue=(data[i].rsrp_140_cnt);
                  obj.value = 21 - i;
			  }
			  IntelligentRoadTestV2.echartsData.push(obj);
		  }
	  }
	  $.getJSON(uploadedDataURL, function(geoJson) {
	        echarts.registerMap('guangdong', geoJson);
	        var geoCoordMap = {
	            "广州市":[113.482362,23.373307 ],"深圳市":[113.951493 ,22.658029 ],
	    		"珠海市":[ 113.261594,22.170497 ],"汕头市":[ 116.481121,23.27136 ],"佛山市":[ 112.976436,23.067229 ],
	    		"韶关市":[ 113.611143,24.959969 ],"湛江市":[110.180047 ,21.31967 ],"肇庆市":[112.166955 ,23.59392 ],
	    		"江门市":[ 112.663682,22.324641 ],"茂名市":[110.943535 ,22.033336 ],"惠州市":[114.429823,23.152322],
	    		"梅州市":[ 116.122374,24.202886],"汕尾市":[ 115.552058,23.024663 ],"河源市":[ 114.871358,23.991769 ],
	    		"阳江市":[111.762215 ,22.076213 ],"清远市":[ 113.02243,24.101593 ],"东莞市":[ 113.850308,23.007632 ],
	    		"中山市":[ 113.390375,22.572622 ],"潮州市":[116.766279 ,23.839547 ],"揭阳市":[116.01199 ,23.330839 ],
	    		"云浮市":[111.66103 ,22.896881 ]
	        }
	        var data =IntelligentRoadTestV2.echartsData;
	        var maxSize4Pin = 100, minSize4Pin = 20;

	      var convertData = function (data) {
	        var res = [];
	        for (var i = 0; i < data.length; i++) {
	            var geoCoord = geoCoordMap[data[i].name];
	            if (geoCoord) {
	                res.push({
	                    name: data[i].name,
	                    value: geoCoord.concat([data[i].value , data[i].rsrp_sinr_cnt , data[i].rsrp_140_cnt , data[i].realValue , data[i].object_name_cnt , data[i].scene_tot])
	                });
	            }
	        }
	        return res;
	    };
	    /*var mapData=[];
	    var j=0;
	    for(var i=IntelligentRoadTestV2.echartsData.length-1;i>=0;i--){
	    	var obj={name:IntelligentRoadTestV2.echartsData[i].name,value:(parseInt(j/4)+1)*20}
	    	if(i==0){
	    		obj={name:IntelligentRoadTestV2.echartsData[i].name,value:100};
	    	}
	    	mapData.push(obj);
	    	j=j+1;
	    }*/
	       option = {
	            tooltip: {
	                trigger: 'item',
	                alwaysShowContent:true,
	                triggerOn:'none',
	                formatter: function (params) {
	                  try {
	                  	var type = IntelligentRoadTestV2.type;
	                	if(type == 1){
	                		return "覆盖率：" + ' : ' + ((params.value[5])).toFixed(2)+"%"
								+ "<br/>" + "满足条件记录数:" + params.value[3] + "<br/>" +
								"总测试记录数:" + params.value[4];
	                	}else if(type == 2){
                            return "测试进度：" + params.value[5] + "%" + "<br/>" +
								"有测试场景数:" + params.value[6] + "<br/>" +
								"总场景数:" + params.value[7];
	                	}else{
	                		return "测试总数:" + params.value[5];
						}
	                  } catch (e) {
							// TODO: handle exception
						}

	                }
	            },
	            visualMap: {
	                min: 21 - dataLength ,
	                max: 21 ,
	                left: '30%',
	                bottom: '70',
	                text: ['高', '低'],
//	                inverse:'true',
	                orient:'horizontal',
	                calculable: false,
	                seriesIndex:2,
	                hoverLink:false,
	                inRange: {
//	                    color: ['#ffffff', '#7ba0e7','#4976d3', '#3757a5','#3757a5','#133d87']
	            color: ['#ffffff', '#7ba0e7','#4976d3', '#3757a5','#1e4997','#133d87']
	                }
	            },
	            geo: {
	            	//地图的配置
	                show: true,
	                map: 'guangdong',
//	                zoom:1.2,
	                left:'5%',
	                right:'28%',
	                bottom:'10%',
	                top:'0%',
	                label: {
	                    normal: {
	                        show: false,
	                        color:"#fff"
	                    },
	                    emphasis: {
	                        show: false,
	                    }
	                },
	                selectedMode:'single',
//	                selectedMode:'multiple',
	                roam: false,
	                itemStyle: {
	                    normal: {
//	                        areaColor: '#9894cf',
	                        borderColor: '#c2d5f5',
	                    },
	                    emphasis: {
	                        areaColor: '#7a77ac',
	                    }
	                }
	            },
	            series : [
	          {
	              name: '供需占比',
	              type: 'effectScatter',
	              coordinateSystem: 'geo',
	              data: convertData(data),
	                symbolSize: function (val) {
	                    return val[2] / 0.8;
	                },
	              showEffectOn: 'render',
	              rippleEffect: {
	                  brushType: 'stroke'
	              },
	              hoverAnimation: true,
	              label: {
	                  normal: {
	                      formatter: '{b}',
	                      position: 'right',
	                      show: true
	                  },
	                  emphasis: {
	                      show: true
	                  }
	              },
	              itemStyle: {
	                  normal: {
	                      color: '#fff',
	                      shadowBlur: 10,
	                      shadowColor: '#333'
	                  }
	              }
	          },
	            { //那五个有动效的圆形
	                name: 'Top 5',
	                type: 'effectScatter',
	                coordinateSystem: 'geo',
	                data: convertData(data.sort(function (a, b) {
	                    return b.value - a.value;
	                }).slice(0, 5)),
	                symbolSize: function (val) {
	                    return val[2] * 1.5 / (num);
	                },
	                showEffectOn: 'render',
	                rippleEffect: {
	                    brushType: 'stroke'
	                },
	                hoverAnimation: true,
	                label: {
	                    normal: {
	                        formatter: '{b}',
	                        position: 'right',
	                        color:'#ffffff',
	                        show: false
	                    }
	                },
	                itemStyle: {
	                	  normal: {
		                        color: '#ffffff'
		                    }
	                },
	                zlevel: -1
	            },
	        	{
				    type: 'map',
				    mapType: 'guangdong',
				    geoIndex: 0,
				    data:IntelligentRoadTestV2.echartsData
				},
	        ]
	        };
	      IntelligentRoadTestV2.mapOption=option;
	      IntelligentRoadTestV2.map.setOption(option);
	      IntelligentRoadTestV2.map.on("click", IntelligentRoadTestV2.queryBottomBarDataCity);
//	      canvasDrawing();
	      IntelligentRoadTestV2.map.resize();
	      IntelligentRoadTestV2.map.dispatchAction({
	    	    type: 'hideTip'
	    	})
	    });

}
//划线  已不需要
function canvasDrawing(params){
//	var event=params.event;
//	var x=event.offsetX;
//	var y=event.offsetY;

	//drawingLineandCircle(x,y);
	var $div=$('.rText')[0];
	var $div2=$('.mapContent')[0];
//	var startPoint=IntelligentRoadTestV2.map.convertFromPixel('geo', [510,60]);
	var startPoint=['114.385734','24.609863'];
	var endPoint=IntelligentRoadTestV2.map.convertFromPixel('geo', [getLeft($div)-getLeft($div2),getTop($div)-getTop($div2)]);
	var dataObject={"coords":[startPoint,endPoint]};
	IntelligentRoadTestV2.mapOption.series[2].data=[dataObject];
	IntelligentRoadTestV2.mapOption.series[3].data=[dataObject];
	IntelligentRoadTestV2.mapOption.series[4].data=[startPoint];
	//guangDongMapOp.series[0].data[0].name="aaa";
	IntelligentRoadTestV2.map.setOption(IntelligentRoadTestV2.mapOption);
}
/**********************************
 * @funcname getTop
 * @funcdesc 获取元素的纵坐标
 * @param {object} e (input optional)
      元素对象
 * @return {offset} 离最上面的距离
 * @author 邹土杰
 * @create 20170721
 * @modifier
 * @modify
 ***********************************/
function getTop(e){
   var offset=e.offsetTop;
   if(e.offsetParent!=null){
     offset+=getTop(e.offsetParent);
   }
   return offset;
}

/**********************************
 * @funcname getLeft
 * @funcdesc 获取元素的横坐标
 * @param {object} e (input optional)
      元素对象
 * @return {offset} 离最左边的距离
 * @author 邹土杰
 * @create 20170721
 * @modifier
 * @modify
 ***********************************/
function getLeft(e){
   var offset=e.offsetLeft;
   if(e.offsetParent!=null){
      offset+=getLeft(e.offsetParent);
   }
   return offset;
}
/**********************************
 * @funcname getFirstDayOfWeek
 * @funcdesc 通过传入的日期获取该日期对应的星期的周一和周日的日期
 * @param {Date} theDay (input optional)
 *  日期对象
 * @return 周一和周日的日期
 * @author 郑文彬
 * @create 20170921
 ***********************************/
IntelligentRoadTestV2.getFirstDayOfWeek=function getFirstDayOfWeek (date) {
	  var day = date.getDay() || 7;
	  var date= new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day);
	  var year=date.getFullYear()+"";
	  var month=date.getMonth()+1+"";
	  var d=date.getDate()+"";
	  if(month.length==1){
		  month="0"+month;
	  }
	  if(d.length==1){
		  d="0"+d;
	  }
	  var d2=new Date(parseInt(year), parseInt(month)-1, parseInt(d)+6);
	  var year2=d2.getFullYear()+"";
	  var month2=d2.getMonth()+1+"";
	  var d2=d2.getDate()+"";
	  if(month2.length==1){
		  month2="0"+month2;
	  }
	  if(d2.length==1){
		  d2="0"+d2;
	  }
	  return  {"starTime":year+month+d,"endTime":year2+month2+d2};
};
/**********************************
 * @funcname getNewDate
 * @funcdesc 日期加减函数 传入日期字符串date（格式为2017/09/01）和加减天数days（减为负数），返回加减天后的日期
 * @param {Date} date (input optional)
 *  日期字符串（格式为2017/09/01）
 * @param {Date} days (input optional)
 *  加减天数
 * @return 返回加减后的日期字符串
 * @author 郑文彬
 * @create 20170921
 ***********************************/
function getNewDate(date,days){
	  var d=new Date(date);
	  var date= new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
	  var year=date.getFullYear()+"";
	  var month=date.getMonth()+1+"";
	  var d=date.getDate()+"";
	  if(month.length==1){
		  month="0"+month;
	  }
	  if(d.length==1){
		  d="0"+d;
	  }
	  return year+month+d;
}
//第二个时间选择后，更新第一个时间为一周前的时间
function seachTimeOnpicked(){
	/*$("#senseSelect").val("全部")*/
	var c = $dp.cal;
	var year = c.newdate['y'];
	var month = c.newdate['M'];
	var day = c.newdate['d'];

	if(month<10){
		month = "0"+month;
	}else{
		month = String(month);
	}
	if(day<10){
		day = "0"+day;
	}else{
		day = String(day);
	}
	var newDay = year+month+day;
	var enddate = new Date(year,month-1,day);
	var startdate = new Date(enddate.getTime()-6*24*60*60*1000);
	var startY = startdate.getFullYear();
	var startM = startdate.getMonth()+1;
	var startD = startdate.getDate();

	if(startM<10){
		startM = "0"+startM;
	}else{
		startM = String(startM);
	}
	if(startD<10){
		startD = "0"+startD;
	}else{
		startD = String(startD);
	}
	var time = startY+startM+startD;
	IntelligentRoadTestV2.queryMapData(newDay);
//	IntelligentRoadTestV2.starDate=newDay.substring(0, 6)+"01";
	IntelligentRoadTestV2.starDate=getNewDate(year+"/"+month+"/"+day,-30);
	IntelligentRoadTestV2.endDate=newDay;
    IntelligentRoadTestV2.queryTotalData();
    IntelligentRoadTestV2.queryTrendData(IntelligentRoadTestV2.starDate , IntelligentRoadTestV2.endDate);

}


/**
 * ********************************
 * @funcname dealDateString
 * @funcdesc 处理日期
 * @param {String} dateString
 日期字符串 格式为：yyyyMMdd
 * @return {Date}
 * @author 林楚佳
 * @create 20170928
 * @modifier
 * @modify
 **********************************
 */
function dealDateString(dateString){
    var year  = dateString.substr(0 , 4);
    var month = dateString.substr(4,2) - 1;
    var day = dateString.substr(6,2);
    var dt = new Date(year, month, day);
    return dt;
}

/**
 * ********************************
 * @funcname getDayBetweenTwoDate
 * @funcdesc 获取两个日期之间的间隔
 * @param {Date} date1 , date2
 两个日期
 * @return {int}
 * @author 林楚佳
 * @create 20170928
 * @modifier
 * @modify
 **********************************
 */
function getDayBetweenTwoDate(date1 , date2){
    var day = 0 ;
    var times =  Math.abs(date2 - date1 );
    day = parseInt(times / 1000 / 60 / 60 /24)//把相差的毫秒数转换为天数
    return Math.abs(day);
}

/**数组排序*/
var by = function(name){
 return function(o, p){
   var a, b;
   if (typeof o === "object" && typeof p === "object" && o && p) {
     a = o[name];
     b = p[name];
     if (a === b) {
       return 0;
     }
     if (typeof a === typeof b) {
       return a < b ? -1 : 1;
     }
     return typeof a < typeof b ? -1 : 1;
   }
   else {
     throw ("error");
   }
 }
}
//传入y轴数据数组 y轴结尾数字，分割数
function yAxisSplit(arr,v,sum){
	var max=null;
	var interval
		 max=Math.max.apply(Math,arr);
		 max=Math.ceil(max);
//		 min=Math.min.apply(Math, arr); 
//		 min=Math.floor(min);
//		 min=0;
		 interval=max/sum;
		 interval=Math.ceil(interval/v)*v;
		 max=interval*sum;
		 return {"max":max,"interval":interval}
}
//---------------设置日期控件的最大时间---------------
function pageMaxTime(){
    // if(IntelligentRoadTest.maxDayTime!=null){
    //     var maxTimeStr = IntelligentRoadTest.maxDayTime.substring(0,4)+"-"+IntelligentRoadTest.maxDayTime.substring(4,6)+"-"+IntelligentRoadTest.maxDayTime.substring(6)
    //     return maxTimeStr
    // }else{
        var nowDate = new Date();
        var hour = nowDate.getHours();
        if(hour<14){
            var twoDateBefore = new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate()-2);
            var year = twoDateBefore.getFullYear();
            var month = twoDateBefore.getMonth()+1;
            var day = twoDateBefore.getDate();
            if(month<10){
                month = "0"+month;
            }else{
                month = month+"";
            }
            if(day<10){
                day = "0"+day;
            }
            return year+"-"+month+"-"+day;
        }else{
            var oneDateBefore = new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate()-1);
            var year = oneDateBefore.getFullYear();
            var month = oneDateBefore.getMonth()+1;
            var day = oneDateBefore.getDate();
            if(month<10){
                month = "0"+month;
            }else{
                month = month+"";
            }
            if(day<10){
                day = "0"+day;
            }
            return year+"-"+month+"-"+day;
        }
    // }
}