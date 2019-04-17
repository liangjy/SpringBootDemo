IntelligentRoadTestV2={};
IntelligentRoadTestV2.map=null;
IntelligentRoadTestV2.starDate=null;
IntelligentRoadTestV2.endDate=null;
IntelligentRoadTestV2.type=0;//页面类型 1弱区总数视图 0弱栅格占比视图
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
	//弱区总数视图和弱栅格占比试图切换按钮
	$('#sub_1').click(function(){
		if(IntelligentRoadTestV2.type==0){
			IntelligentRoadTestV2.type=1;
			$(".changeImg").attr("src","../js/IntelligentRoadTest/images/changeImg1.png");
			$('#sub_1').html("弱栅格占比视图");
			$('#vT').html("弱区分布视图");
//			$('.totalNum').html(IntelligentRoadTestV2.badcountTodate);
		    var html="";
		    for(var i=0;i<IntelligentRoadTestV2.badcountTodate.length;i++) {
//          html=html+"<span>"+IntelligentRoadTestV2.badcountTodate.substring(i, i+1)+"</span>";
                html=html+'<div class="count down"><span class="current top">'+IntelligentRoadTestV2.badcountTodate.substring(i, i+1)+'</span><span class="current bottom">'+IntelligentRoadTestV2.badcountTodate.substring(i, i+1)+'</span></div>';
            }
//	        $('.totalNum').html("<span>"+IntelligentRoadTestV2.badcountTodate.substring+"</span><span>"+strHtml4+"</span><span>"+strHtml6+"</span>");
            $('.totalNum').html(html);
		    $('.rText').html("全省弱区总数");
		
			$('.rText').html("全省弱区总数");
			$('#bottomBar').html(IntelligentRoadTestV2.city+"弱区总数变化趋势");
		}else{
			IntelligentRoadTestV2.type=0;
			$(".changeImg").attr("src","../js/IntelligentRoadTest/images/changeImg2.png");
			$('#sub_1').html("弱区分布视图");
			$('#vT').html("弱栅格占比视图");
			$('#bottomBar').html(IntelligentRoadTestV2.city+"弱区占比变化趋势");
			var html="";
			for(var i=0;i<IntelligentRoadTestV2.proportionTodate.length;i++) {
				 // html=html+"<span>"+IntelligentRoadTestV2.proportionTodate.substring(i, i+1)+"</span>";
                 html=html+'<div class="count down"><span class="current top">'+IntelligentRoadTestV2.proportionTodate.substring(i, i+1)+'</span><span class="current bottom">'+IntelligentRoadTestV2.proportionTodate.substring(i, i+1)+'</span></div>';

            }
            $('.totalNum').html(html);
		    $('.rText').html("全省弱栅格占比");
		}
		IntelligentRoadTestV2.showMap(IntelligentRoadTestV2.mapData,IntelligentRoadTestV2.type);
//		IntelligentRoadTestV2.showTopBar(IntelligentRoadTestV2.mapData,IntelligentRoadTestV2.type);
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
		progressbarTwo.submitSql([["IntelligentRoadTest_07_maxDay"]] , 
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
//	var result = callBackChangeData(data);
//	var data=result[0];
//	var srtTime=data["max(day)"]+"";
	
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
    $('#weekStartTime').html(startTime);
    srtTime = $('#seachTime').val();
	var fomatDate=srtTime.substring(0,4)+"/"+srtTime.substring(4,6)+"/"+srtTime.substring(6,8);
	var now =new Date(srtTime);
	var obj=IntelligentRoadTestV2.getFirstDayOfWeek(now);
//	$('#seachTime').val(srtTime);
//	$('#weekStartTime').html(getNewDate(fomatDate,-6));
	IntelligentRoadTestV2.queryMapData(srtTime);
	IntelligentRoadTestV2.starDate=getNewDate(fomatDate,-30);
	IntelligentRoadTestV2.endDate=srtTime;
	IntelligentRoadTestV2.queryBottomBarDataProvince(IntelligentRoadTestV2.starDate,IntelligentRoadTestV2.endDate);

}
/**********************************
 * @funcname IntelligentRoadTestV2.queryBottomBarDataProvince
 * @funcdesc 根据起始时间结束时间查询全省的弱区总数及弱栅格占比时间变化趋势
 * @param {String} starDate (input optional)
      起始时间
 * @param {String} endDate (input optional)
      结束时间
 * @return {null}
 * @author 郑文彬
 * @create 20171218
 ***********************************/
IntelligentRoadTestV2.queryBottomBarDataProvince=function IntelligentRoadTestV2_queryBottomBarDataProvince(starDate,endDate){
	var sql=["IntelligentRoadTestV2_01","starDate:"+starDate,"endDate:"+endDate,"city:\'"+IntelligentRoadTestV2.city+"\'"]
	progressbarTwo.submitSql([sql] , 
			[IntelligentRoadTestV2.showBottomBar],
			[3]);

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
	IntelligentRoadTestV2.city=e.name.replace("市","");
    var city_id = noceUtil.city_LATN_ID[IntelligentRoadTestV2.city]
    var sql=["IntelligentRoadTestV2_02","starDate:"+starDate,"endDate:"+endDate,"city:"+city_id]
	progressbarTwo.submitSql([sql] , 
			[IntelligentRoadTestV2.showBottomBar],
			[3]);

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
	if(IntelligentRoadTestV2.city=="全省"){
		IntelligentRoadTestV2.bottomBarData=data;
		if(IntelligentRoadTestV2.cityPermission!="全省"){
			$('#fxPage').html(IntelligentRoadTestV2.cityPermission+"弱覆盖分布");
		}else{
			$('#fxPage').html("深圳弱覆盖分布");
		}
	}else{
		$('#btn_1').show();
		$('#fxPage').html(IntelligentRoadTestV2.city+"弱覆盖分布");
		IntelligentRoadTestV2.bottomBarDataCity=data;
	}
	data = callBackChangeData(data);
	if(IntelligentRoadTestV2.city=="全省"){
		IntelligentRoadTestV2.badcountTodate=data[data.length-1].badcount+"";
		IntelligentRoadTestV2.proportionTodate=((data[data.length-1].proportion)*100).toFixed(2)+"%";
		 if(type==1){
			  var html="";
			  for(var i=0;i<IntelligentRoadTestV2.badcountTodate.length;i++) {
                  html=html+'<div class="count down"><span class="current top">'+IntelligentRoadTestV2.badcountTodate.substring(i, i+1)+'</span><span class="current bottom">'+IntelligentRoadTestV2.badcountTodate.substring(i, i+1)+'</span></div>';
			  }
              $('.totalNum').html(html);
			  $('.rText').html("全省弱区总数");
		 }else{
			  var html="";
			  for(var i=0;i<IntelligentRoadTestV2.proportionTodate.length;i++) {
                  html=html+'<div class="count down"><span class="current top">'+IntelligentRoadTestV2.proportionTodate.substring(i, i+1)+'</span><span class="current bottom">'+IntelligentRoadTestV2.proportionTodate.substring(i, i+1)+'</span></div>';
			  }
              $('.totalNum').html(html);
			  $('.rText').html("全省弱栅格占比");
		 }
	}
	IntelligentRoadTestV2.bottomecharData={day:[],value:[],valueTwo:[]}
	var name=IntelligentRoadTestV2.city+"弱区数";
	$('#bottomBar').html(IntelligentRoadTestV2.city+"弱区总数变化趋势");
	if(type!=1){
		 name=IntelligentRoadTestV2.city+"占比(%)";
		 $('#bottomBar').html(IntelligentRoadTestV2.city+"弱栅格占比变化趋势");
	}
	 for(var i=0;i<data.length;i++){
		  if(data[i].city!="全省"){
			  var obj={};
			  var day=data[i].day+"";
			  IntelligentRoadTestV2.bottomecharData.day.push(day.substring(4,8));
			  if(type==1){
				  IntelligentRoadTestV2.bottomecharData.value.push(data[i].badcount);
			  }else{
				  IntelligentRoadTestV2.bottomecharData.value.push(((data[i].proportion)*100).toFixed(2));
			  }
		  }
	  }
	 //--y轴固定刻度
	 if(type==1){
	     var yAxis=yAxisSplit(IntelligentRoadTestV2.bottomecharData.value,100,5)
		 max=yAxis.max;
	     interval=yAxis.interval;
	 }else{
		
		 max=10;
	     interval=2;
	     min=0;
	 }
     var  optionBtm = {
         backgroundColor:"black",
	        tooltip: {
	            trigger: 'axis',
	            formatter:function(params ){
		        	var str='<ul style="">';
		        	str=str+'<li style="">&nbsp&nbsp&nbsp&nbsp'+params[0].axisValue+'</li>';
		        	for(var i=0;i<params.length;i++){
		        	   var s='';
		        	if(IntelligentRoadTestV2.type==0){
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
                    axisLabel: {
                        textStyle: {
                            color: "white"
                        }
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
	                name:"",
	                min: min,
	                max: max,
	                interval: interval,
	                axisLabel: {
	                    show: true,
	                    textStyle: {
	                        color: "white"
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
	var sql=["IntelligentRoadTest_01_province","DAY:"+day]
	progressbarTwo.submitSql([sql] , 
			[IntelligentRoadTestV2.showMapAndBar],
			[3]);

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
	IntelligentRoadTestV2.mapData=result;
	IntelligentRoadTestV2.showMap(result,IntelligentRoadTestV2.type);
//	IntelligentRoadTestV2.showTopBar(result,IntelligentRoadTestV2.type);
}
//注释掉的不需要的方法
IntelligentRoadTestV2.showTopBar=function IntelligentRoadTestV2_showTopBar(data,type){
	  var echarData={city:[],value:[]}
	  for(var i=0;i<data.length;i++){
		  if(data[i].city!="全省"){
			  var obj={};
			  echarData.city.push(data[i].city+"市");
			  if(type==1){
				  echarData.value.push(data[i].poor_grid_nums);
			  }
			  IntelligentRoadTestV2.echartsData.push(obj);
		  }
	  }
	
	    var optionTop = {
            backgroundColor:"black",
	        tooltip: {
	            trigger: 'axis',
	            backgroundColor:'rgba(255,255,255,0.8)',
	            extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
	            textStyle:{
	                color:'#6a717b',
	            },

	        },
	        grid: {
	        	top: '8%',
	            left: '3%',
	            right: '4%',
	            bottom: '0%',
	            containLabel: true
	        },
	        yAxis: [{
	            type: 'category',
//	            data: ['广州','深圳','广州','深圳','广州','深圳','广州','深圳','广州','深圳','广州','深圳','广州','深圳','广州','深圳','广州','深圳','广州','深圳','广州'],
	            data:echarData.city,

	            axisTick: {
	                show: false
	            },
	            axisLabel: {
	                margin: 10,
	                textStyle: {
	                    fontSize: 12,
	                    color:'#94999f'
	                }
	            },
	            axisLine: {
	                show: false
	            },

	        }],
	        xAxis: [{
	            type: 'value',
	            axisTick: {
	                show: false
	            },
	            axisLabel: {
	                show: false
	            },
	            axisLine: {
	                show: false
	            },
	            splitLine: {
	                show: false
	            }
	        }],
	        series: [{
	            name: 'Top 10',
	            type: 'bar',
				barWidth: '60%',
//	            data: [7700, 8800, 9900, 11100, 14200, 16000, 18400, 20500, 22600, 7700, 8800, 9900, 11100, 14200, 16000, 18400, 20500, 22600, 20500, 22600, 24700],
	            data: echarData.value,
	            itemStyle: {
	                normal: {
	                    color: function(params) {
	                        var colorList = [
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#5f5acc'},
	                                {offset: 1, color: '#63e5ce'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#b05acc'},
	                                {offset: 1, color: '#f6b65a'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#5f5acc'},
	                                {offset: 1, color: '#63e5ce'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#b05acc'},
	                                {offset: 1, color: '#f6b65a'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#5f5acc'},
	                                {offset: 1, color: '#63e5ce'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#b05acc'},
	                                {offset: 1, color: '#f6b65a'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#5f5acc'},
	                                {offset: 1, color: '#63e5ce'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#b05acc'},
	                                {offset: 1, color: '#f6b65a'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#5f5acc'},
	                                {offset: 1, color: '#63e5ce'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#b05acc'},
	                                {offset: 1, color: '#f6b65a'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#5f5acc'},
	                                {offset: 1, color: '#63e5ce'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#b05acc'},
	                                {offset: 1, color: '#f6b65a'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#5f5acc'},
	                                {offset: 1, color: '#63e5ce'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#b05acc'},
	                                {offset: 1, color: '#f6b65a'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#5f5acc'},
	                                {offset: 1, color: '#63e5ce'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#b05acc'},
	                                {offset: 1, color: '#f6b65a'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#5f5acc'},
	                                {offset: 1, color: '#63e5ce'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#b05acc'},
	                                {offset: 1, color: '#f6b65a'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#5f5acc'},
	                                {offset: 1, color: '#63e5ce'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#b05acc'},
	                                {offset: 1, color: '#f6b65a'}
	                            ]),
	                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
	                                {offset: 0, color: '#7e3faa'},
	                                {offset: 0.5, color: '#5f5acc'},
	                                {offset: 1, color: '#63e5ce'}
	                            ])
	                        ];
	                        return colorList[params.dataIndex]
	                    },
	                    barBorderRadius: [0, 5,5, 0],
	                    shadowColor: 'rgba(0,0,0,0.1)',
	                    shadowBlur: 3,
	                    shadowOffsetY: 3
	                }
	            }
	        }]
	    };
	    IntelligentRoadTestV2.chartTop.resize();
	    IntelligentRoadTestV2.chartTop.setOption(optionTop);
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
	  var num=100;
	  if(type==0){
		  num=0.003;
	  }
	  IntelligentRoadTestV2.echartsData=[];
	  if(type==1){//弱区数
	  	  data=data.sort(by("badcount"));
	  }else{//占比
		  data=data.sort(by("proportion"));
	  }
	  data.reverse();
	  for(var i=0;i<data.length;i++){
		  if(data[i].city!="全省"){
			  var obj={};
			  obj.name =data[i].city+"市";
			  if(type==1){
				  obj.value=(data[i].badcount);
			  }else{
				  obj.value=(data[i].proportion);
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
	        var max = 480, min = 9; // todo 
	        var maxSize4Pin = 100, minSize4Pin = 20;

	      var convertData = function (data) {
	        var res = [];
	        for (var i = 0; i < data.length; i++) {
	            var geoCoord = geoCoordMap[data[i].name];
	            if (geoCoord) {
	                res.push({
	                    name: data[i].name,
	                    value: geoCoord.concat(data[i].value)
	                });
	            }
	        }
	        return res;
	    };
	    var mapData=[];
	    var j=0;
	    for(var i=IntelligentRoadTestV2.echartsData.length-1;i>=0;i--){
	    	var obj={name:IntelligentRoadTestV2.echartsData[i].name,value:(parseInt(j/4)+1)*20}
	    	if(i==0){
	    		obj={name:IntelligentRoadTestV2.echartsData[i].name,value:100};
	    	}
	    	mapData.push(obj);
	    	j=j+1;
	    }
	       option = {
               backgroundColor:"black",
	            tooltip: {
	                trigger: 'item',
	                alwaysShowContent:true,
	                triggerOn:'none',
	                formatter: function (params) {
	                  try {
	                	if(type!=1){
	                		return "弱栅格占比" + ' : ' + ((params.value[2])*100).toFixed(2)+"%";
	                	}else{
	                		return "弱区总数" + ' : ' + params.value[2];
	                	}
	                  } catch (e) {
							// TODO: handle exception
						}
	                
	                }
	            },
	            visualMap: {
	                min: 0,
	                max: 100,
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
	                },
                    textStyle:{
                        color:"white",
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
	                    return val[2] /num;
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
	                    return val[2] / (num);
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
				    data:mapData
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
	console.log("一周前日期："+time);
	$('#weekStartTime').text(time);
	IntelligentRoadTestV2.queryMapData(newDay);
//	IntelligentRoadTestV2.starDate=newDay.substring(0, 6)+"01";
	IntelligentRoadTestV2.starDate=getNewDate(year+"/"+month+"/"+day,-30);
	IntelligentRoadTestV2.endDate=newDay;
	IntelligentRoadTestV2.city="全省";
	IntelligentRoadTestV2.queryBottomBarDataProvince(IntelligentRoadTestV2.starDate,IntelligentRoadTestV2.endDate);
	
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