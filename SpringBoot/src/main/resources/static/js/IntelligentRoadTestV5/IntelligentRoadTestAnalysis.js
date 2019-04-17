var IntelligentRoadTest = {};
IntelligentRoadTest.map = null;
IntelligentRoadTest.mapMobile = null;
IntelligentRoadTest.mapUnicom = null;
IntelligentRoadTest.city = null;
IntelligentRoadTest.country = null;
IntelligentRoadTest.mktcenter = null;
IntelligentRoadTest.object_id = null;
IntelligentRoadTest.bstid = null;
IntelligentRoadTest.cellid = null;
IntelligentRoadTest.day = null;
IntelligentRoadTest.isFirstLoad = true;
IntelligentRoadTest.SelectDataChe = {};
IntelligentRoadTest.baimapStyle = "grayscale";
IntelligentRoadTest.badPolygonArr = [];//多边形
IntelligentRoadTest.badPolygonMarkerArr = [];//多边形标记点
IntelligentRoadTest.badPolygonArrM = [];//移动地图多边形
IntelligentRoadTest.badPolygonMarkerArrM = [];//移动地图多边形标记点
IntelligentRoadTest.badPolygonArrU = [];//联通地图多边形
IntelligentRoadTest.badPolygonMarkerArrU = [];//联通地图多边形标记点
IntelligentRoadTest.gridSectorOverlay = [];//多边形扇区连线
IntelligentRoadTest.sectorCompent = null;//基站组件对象
IntelligentRoadTest.bmapDistanceTool = null;//测距测角组件对象
IntelligentRoadTest.myDrawingManagerObject = null;//框选对象
IntelligentRoadTest.SelectionOverlayList = [];//框选的多边形
IntelligentRoadTest.SelectionOverlayListM= [];//框选的多边形
IntelligentRoadTest.SelectionOverlayListU = [];//框选的多边形
IntelligentRoadTest.selectBoxMarker = null;//框选多边形的保存图标
IntelligentRoadTest.GridMap = null;
IntelligentRoadTest.GridDataChe = [];//多边形栅格数据缓存
IntelligentRoadTest.GridCanArr = [];//栅格缓存，用于组件呈现栅格
IntelligentRoadTest.GridCanArrT = [];//三网对比的电信rsrp均值
IntelligentRoadTest.CanArr = [];//栅格数据缓存，用于提示信息或者top扇区呈现
IntelligentRoadTest.GridMapM = null;
IntelligentRoadTest.GridCanArrM = [];//栅格缓存，用于组件呈现栅格
IntelligentRoadTest.GridMapU = null;
IntelligentRoadTest.GridCanArrU = [];//栅格缓存，用于组件呈现栅格
//IntelligentRoadTest.GridMapCircle = null;//描点组件
IntelligentRoadTest.GridMapCircleData = [];//描点数据
IntelligentRoadTest.jizhanTableData=null;
IntelligentRoadTest.GridMapCircleDataArr = [];//描点的数据缓存
IntelligentRoadTest.gridThresholds=[
                      { "threshold": "<=-115", "text": "(-∞,-115]", "color": "#C00000", "gradient": 0.83 },
                      { "threshold": "<=-105", "text": "(-115,-105]", "color": "#FFC000", "gradient": 0.66 },
                      { "threshold": "<=-95", "text": "(-105,-95]", "color": "#0070C0", "gradient": 0.5 },
                      { "threshold": "<=-85", "text": "(-95,-85]", "color": "#00B0F0", "gradient": 0.33 },
                      { "threshold": "<0", "text": "(-85,0)", "color": "#009900", "gradient": 0.33 }
                     ];
IntelligentRoadTest.allCity=["广州","深圳","珠海","佛山","东莞","惠州","中山","江门","肇庆","清远","茂名","湛江","汕头","汕尾","梅州","韶关","揭阳","潮州","云浮","河源","阳江"];// 可选的有效日期。
IntelligentRoadTest.colorBarArr = ["1","2","3"];
IntelligentRoadTest.clickMarker = null;
IntelligentRoadTest.clickGrid = null
IntelligentRoadTest.isFirstSelectMkt = true; //是否是第一次初始化营服列表
IntelligentRoadTest.isGridTop = false; //是否栅格置顶（显示栅格信息）
IntelligentRoadTest.isPositioningSector = false; //是否需要定位基站
IntelligentRoadTest.positioningMarker =null;//定位标记点
IntelligentRoadTest.sectorShowTimeout = null;//延迟查询基站定时器
IntelligentRoadTest.MarketPolygon = [];//营服多边形对象缓存数组
IntelligentRoadTest.DistrictPolygon = [];//区县多边形对象缓存数组
IntelligentRoadTest.selectingBox = false;//是否正在框选栅格
IntelligentRoadTest.concernPolygon = null;//关注区域多边形对象
IntelligentRoadTest.concernPolygonM = null;//关注区域多边形对象
IntelligentRoadTest.concernPolygonU = null;//关注区域多边形对象
IntelligentRoadTest.concerningArea = false;//是否正在查看关注区域
IntelligentRoadTest.sevenIndex = 0;//7天rsrp均值计数值
IntelligentRoadTest.sevenLineData = [];//7天rsrp均值折线图数据保存
IntelligentRoadTest.sevenLineEchartDiv = "lineChart";//rsrp均值7天变化折线图div id
IntelligentRoadTest.sevenLineEchart = null;//rsrp均值7天变化折线图对象
IntelligentRoadTest.concernAreaData = [];//正在编辑的关注区域数据
IntelligentRoadTest.isThreeNetStatus = false;//是否查看三网
IntelligentRoadTest.linkImgPoints = [];//聚焦框的四个角
IntelligentRoadTest.focusPolyline = null;//聚焦边框
IntelligentRoadTest.unicomIsHide=true;//记录联通地图是隐藏
IntelligentRoadTest.mobileIsHide=true;//记录移动地图是隐藏
IntelligentRoadTest.isShowGrid = false;//正在查看栅格，（进入到呈现栅格方法内）
IntelligentRoadTest.isShowDTGrid = false;//正在查看路测栅格,(进入到路测栅格数据回调方法内)
IntelligentRoadTest.sele = 0;//
IntelligentRoadTest.index = 0;//
IntelligentRoadTest.doType=0;
IntelligentRoadTest.bst_id =null ;//
IntelligentRoadTest.cell_id = null;//
IntelligentRoadTest.sectorArr=null;
IntelligentRoadTest.type=1;
IntelligentRoadTest.tableDivState=0;
//缓存的查询参数
IntelligentRoadTest.parameter_1='';
IntelligentRoadTest.parameter_2='';
IntelligentRoadTest.parameter_3='';
IntelligentRoadTest.parameter_4='';
IntelligentRoadTest.parameter_5='';
IntelligentRoadTest.parameter_6='';
IntelligentRoadTest.parameter_7='';
IntelligentRoadTest.badcellAnalysis=false;//是否是质差小区链接过来的；
$(function() {	
	//页面切换回来后97日历会自动弹出来  隐藏弹出来的日历
	window.onfocus = function(){  
		setTimeout(function(){
			$dp.hide();
		},5);
	}
	$(".mapWrap").height($(".contentDiv").height()-$(".tableTop").height()-7);
	$(".mainTabContent").height($(".areaTableWrap").height()-40);
	$(".coverDiv").height($(".mapWrap").height()/1.4);
	$("#mapMobile, #mapUnicom").height($(".coverDiv").height()-$(".cover-title").height());
	
	/* 关闭移动、联通覆盖地图div */
	//移动、联通覆盖 拖动
	$( ".dragDiv" ).draggable();
	/* 移动覆盖  */
	$(".li-Mobile").mouseup(function () {
		if ($(this).parents(".dragDiv").hasClass("ui-draggable-dragging")==false) {
	    	$(this).next(".coverDiv").show({
		        effect: "scale",
		        origin: "left top",
		        duration: 1000
		    });
	    }
		IntelligentRoadTest.mobileIsHide=false; 
		IntelligentRoadTest.centerAndZoomTimeout = setTimeout("IntelligentRoadTest.timeoutCenterAndZoom();",1100);
		IntelligentRoadTest.drawPolylineTimeout = setTimeout("IntelligentRoadTest.drawPolyline();",1200);
		
	});
	
	//文件选择款改变
	$("#fujian").change(function(){
		$("#message").html("");
	})
		
	setTimeout(function(){
		$("#date97").val(IntelligentRoadTest.day);
	},1000);
	
	//Dt文件上传
	$("#upload").click(function(){
			console.log("点击");
			
//		$(".progressBox").show();
		var formData = new FormData($("#uploadForm")[0]);
		var concernName = $("#uploadName").val();
		var concernAreaDate = $("#date97").val();
		var fujian = $("#fujian").val();
		var Offset = parseInt($("#Offset  option:selected").text());
		var LogTime =parseInt($("#LogTime  option:selected").text());
		var GPS_Lon = parseInt($("#GPS_Lon  option:selected").text());
		var GPS_Lat = parseInt($("#GPS_Lat  option:selected").text());
		var PCell = parseInt($("#PCell  option:selected").text());
		
		
		if(concernName==""||concernName==null){
			$("#message").html("路测名称不能为空！");
		}else if(concernAreaDate==""||concernAreaDate==null){
			$("#message").html("路测时间不能为空！");
		}else if(fujian==""||fujian==null){
			$("#message").html("请先选择一个csv文件！");
		}else if((Offset+LogTime+GPS_Lon+GPS_Lat+PCell)!=15){
			$("#message").html("排序字段不能重复选取！");
		}else{
			
			
				
			$.ajax({
				url: 'pages_dtUpload_DtUpload_uploadDt.action',
				type: 'POST',
				data: formData,
				async: true,
				
				cache: false,
				contentType: false,
				processData: false,
				
				success: function (attachmentJson) {
					 console.log("成功"+attachmentJson.length);
					
					IntelligentRoadTest.queryAllDTList();
					 if(attachmentJson[1]==0){
						 	console.log("成功上传！");
						 	$("#message").html("成功上传！");
						 	
								
								$(".progressBox").hide();
							
						 }else{
						 	console.log("上传失败，错误信息："+attachmentJson[0]);
						 	$("#message").html("上传失败，错误信息："+attachmentJson[0]);
						 	$(".progressBox").hide();
						 }
				},
				error: function () {
					$(".progressBox").hide();
					console.log("失败");
				}
		});
					
			
			$(".progressBox").show();
		}
		
		
		
		
		
		
	})
	/* 联通覆盖 */
	$(".li-Unicom").mouseup(function () {
		if ($(this).parents(".dragDiv").hasClass("ui-draggable-dragging")==false) {
	    	$(this).next(".coverDiv").show({
		        effect: "scale",
		        origin: "left top",
		        duration: 1000
		    });
	    }
		IntelligentRoadTest.unicomIsHide=false;
		IntelligentRoadTest.centerAndZoomTimeout = setTimeout("IntelligentRoadTest.timeoutCenterAndZoom();",1100);

		IntelligentRoadTest.drawPolylineTimeout = setTimeout("IntelligentRoadTest.drawPolyline();",1200);

	});
	/* 关闭移动/联通覆盖 */
	$(".close-coverDiv").click(function () {
	    if($(this).parents(".coverDiv").attr("title")=="联通覆盖"){
	    	IntelligentRoadTest.unicomIsHide=true;//记录联通地图是隐藏
	    }else if($(this).parents(".coverDiv").attr("title")=="移动覆盖"){
	    	IntelligentRoadTest.mobileIsHide=true;//记录移动地图是隐藏
	    //	$(".li-Mobile").hide();
	    }
		$(this).parents(".coverDiv").hide({
	        effect: "scale",
	        origin: "left top",
	        duration: 1000
	    });	
		IntelligentRoadTest.centerAndZoomTimeout = setTimeout("IntelligentRoadTest.timeoutCenterAndZoom();",1100);

		IntelligentRoadTest.drawPolylineTimeout = setTimeout("IntelligentRoadTest.drawPolyline();",1200);
	});
	
	/* 页面上方的tab标签切换 */
	$(".tabUl li").click(function () {
		$(this).addClass("active").siblings().removeClass("active");
		var index=$(".tabUl li").index($(this));
		if(index!=IntelligentRoadTest.index){
			if(index!=0){
				$(".selectRight").hide();
				if(index == 5){
					$(".tableDiv").eq(6).show().siblings().hide();
				}else{
					$(".tableDiv").eq(index).show().siblings().hide();
				}
				
			}else{
				if($('#seid').html()=='弱覆盖区域'){
					 $(".tableDiv").eq(0).show().siblings().hide();
					 $("#doTypeSele").show();
					 IntelligentRoadTest.areaTableResize();
				}else{
					$(".tableDiv").eq(5).show().siblings().hide();
					$("#doTypeSele").hide();
					IntelligentRoadTest.jzTableResize();
				}
				$(".selectRight").show();
			}
			if(index == 3){
				$(".searchRight").show();
				IntelligentRoadTest.concernAreaTable.resizeWidht(IntelligentRoadTest.concernAreaTable.tableObject);
			}else{
				$(".searchRight").hide();
			}
			if(index == 4){
				$(".jobRight").show();
				IntelligentRoadTest.alarmInfo.resizeWidht(IntelligentRoadTest.alarmInfo.tableObject);
			}else{
				$(".jobRight").hide();
			}
			if(index == 5){
				$(".importRight").show();
				IntelligentRoadTest.DTTable.resizeWidht(IntelligentRoadTest.DTTable.tableObject);
			}else{
				$(".importRight").hide();
			}
			IntelligentRoadTest.index=index;
		}
		
		
		try {
			if(index == 1){
				IntelligentRoadTest.alarmTable.resizeWidht(IntelligentRoadTest.alarmTable.tableObject)
			}else if(index == 2){
				IntelligentRoadTest.KPITable.resizeWidht(IntelligentRoadTest.KPITable.tableObject);
			}
			
		} catch (e) {
			// TODO: handle exception
		}
		
	});
	$("#tab_1").click(function () {
		$(".tableDiv").eq(0).show().siblings().hide();
		 $("#doTypeSele").show();
		 IntelligentRoadTest.areaTableResize();
//			IntelligentRoadTest.loadJiZhanTableData(city,country,mktcenter,IntelligentRoadTest.day);
			
	});
	$("#tab_2").click(function () {
		$(".tableDiv").eq(5).show().siblings().hide();
		$("#doTypeSele").hide();
		IntelligentRoadTest.jzTableResize();
		//		IntelligentRoadTest.jizhanTablePaging(IntelligentRoadTest.list,IntelligentRoadTest.cell_id,IntelligentRoadTest.bst_id);
	});
	
	$(".DTimport").click(function () {
		$(".importModal").show();
	});
	
	IntelligentRoadTest.loadSelectData();
	
	// 城市列表点击事件 
	$(".city-list li").click(function () {
		$(this).addClass("current").siblings().removeClass("current");
		$(".select-name").removeClass("selectName");
		$(this).parents(".select-city").find(".city-name").text($(this).text()+"市");
		$(this).parents(".select-city").find(".city-selected").text($(this).text()+"市");
		$(this).parents(".city-info").hide();
	});	
	// 下拉框  
	$(".select-name").click(function () {
		$(".select-name").removeClass("selectName");
		$(this).addClass("selectName");
		$(".select-info").hide();
		$(this).siblings(".select-info").show();
		$(".select-info > a").click(function () {
			$(this).addClass("selected").siblings().removeClass("selected");
			$(this).parent().siblings().find(".selectA").text($(this).text());
			$(".select-name").removeClass("selectName");
			$(this).parent().hide();
			var doType=$(this).text();
			switch (doType) {
			case '全部':
				doType=0;
				break;
			case '工程':
				doType=1;
				break;
			case '维护':
				doType=2;
				break;
			case '优化':
				doType=3;
				break;
			case '规划':
				doType=4;
				break;
			default:
				doType=0;
				break;
			}
			IntelligentRoadTest.doType = doType;
		});
		$(".select-info > div").click(function () {
			$(".select-name").removeClass("selectName");
			$(this).parent().hide();
		});
	});
	$(".selectTriangle").click(function () {
		$(".tabSelect-info").toggle();
	});
	$(".tabSelect-info > div").click(function () {
		$(this).parent().hide();
		$(".tabText").text($(this).text());
	});
	
	//展开表格部分
	$(".pack").click(function () {
        if ($(".areaTableWrap").hasClass("tableWrapUp")) {
        	$(".select-info,.areaJZ").addClass("selectTop");
        	$(".areaTableWrap").removeClass("tableWrapUp");
            $(this).children().css("transform","rotate(0deg)");
            $(".mainTabContent").height($(".areaTableWrap").height()-40);
            IntelligentRoadTest.tableDivState=0;
        } else{
        	$(".select-info,.areaJZ").removeClass("selectTop");
        	$(".areaTableWrap").addClass("tableWrapUp");
        	$(this).children().css("transform","rotate(180deg)");
        	$(".mainTabContent").height($(".areaTableWrap").height()-40);
        	IntelligentRoadTest.tableDivState=1;
        	IntelligentRoadTest.loadAllTable();
//        	$('#tab_2').click();
        }
    });
	
	$(".colseImg,.btn-save").click(function(){
		$("#message").html("");
		$("#uploadName").val("");
		$("#fujian").val("");
		
		$(".modal").hide();
	});
/*	$("body").click(function (e) { 点击其他地方隐藏下拉列表  
		if($(e.target).closest(".lineImg,.modal-body").length == 0){
			$(".modal").hide();
		};
	});*/
	
	$("#threeComp").click(function(){
		if($(this).is(':checked')){
			$(".clickOpersComp").show();
			IntelligentRoadTest.isThreeNetStatus = true;
			//增加移动和联通地图的多边形和标记点覆盖物
//			for(var i=0;i<IntelligentRoadTest.badPolygonArrM.length;i++){
//				IntelligentRoadTest.mapMobile.addOverlay(IntelligentRoadTest.badPolygonArrM[i]);
//			}
			for(var i=0;i<IntelligentRoadTest.badPolygonMarkerArrM.length;i++){
				IntelligentRoadTest.mapMobile.addOverlay(IntelligentRoadTest.badPolygonMarkerArrM[i]);
			}
//			for(var i=0;i<IntelligentRoadTest.badPolygonArrU.length;i++){
//				IntelligentRoadTest.mapUnicom.addOverlay(IntelligentRoadTest.badPolygonArrU[i]);
//			}
			for(var i=0;i<IntelligentRoadTest.badPolygonMarkerArrU.length;i++){
				IntelligentRoadTest.mapUnicom.addOverlay(IntelligentRoadTest.badPolygonMarkerArrU[i]);
			}
			
			
			setTimeout(function(){
//				IntelligentRoadTest.centerAndZoomTimeout = 
				IntelligentRoadTest.timeoutCenterAndZoom();
//				IntelligentRoadTest.drawPolyline();
				IntelligentRoadTest.drawPolylineTimeout = setTimeout("IntelligentRoadTest.drawPolyline();",100);
				IntelligentRoadTest.sectorCompentM.draw();
				IntelligentRoadTest.sectorCompentU.draw();
			},200);
//			setTimeout("IntelligentRoadTest.timeoutCenterAndZoom();",200);
//			setTimeout("IntelligentRoadTest.drawPolyline();",400);
			
			setTimeout(function(){
				IntelligentRoadTest.GridMap.clear();
				IntelligentRoadTest.GridMapM.clear();
				IntelligentRoadTest.GridMapU.clear();
				
//				var dataChe = [minLng,minLat,maxLng,maxLat,rsrp_avg,grid_num,agps_count,sector_set,
//				               dxrsrpAvg,rsrp_avgM,rsrp_avgU,monthrelate,dx_cover,yd_cover,lt_cover];
				IntelligentRoadTest.GridCanArrT = [];
				IntelligentRoadTest.GridCanArrM = [];
				IntelligentRoadTest.GridCanArrU = [];
				for(var i=0;i<IntelligentRoadTest.CanArr.length;i++){
					var griddata = IntelligentRoadTest.CanArr[i];
					if(griddata[8]!=null){
						var gridT = [griddata[0],griddata[1],griddata[2],griddata[3],griddata[8]];//三网电信rsrp
						IntelligentRoadTest.GridCanArrT.push(gridT);
					}
					
					if(griddata[9]!=null){
						var gridM = [griddata[0],griddata[1],griddata[2],griddata[3],griddata[9]];//三网移动rsrp
						IntelligentRoadTest.GridCanArrM.push(gridM);
					}
					
					if(griddata[10]!=null){
						var gridU = [griddata[0],griddata[1],griddata[2],griddata[3],griddata[10]];//三网联通rsrp
						IntelligentRoadTest.GridCanArrU.push(gridU);
					}
				}
				
				
				var CTData = IntelligentRoadTest.GridCanArrT;
				var CMData = IntelligentRoadTest.GridCanArrM;
				var CUData = IntelligentRoadTest.GridCanArrU;
				for(var j=0;j<IntelligentRoadTest.colorBarArr.length;j++){
					CTData = IntelligentRoadTest.ClearData(CTData,IntelligentRoadTest.colorBarArr[j]);
					CMData = IntelligentRoadTest.ClearData(CMData,IntelligentRoadTest.colorBarArr[j]);
					CUData = IntelligentRoadTest.ClearData(CUData,IntelligentRoadTest.colorBarArr[j]);
				}
				IntelligentRoadTest.GridMap.draw(CTData);
				IntelligentRoadTest.GridMapM.draw(CMData);
				IntelligentRoadTest.GridMapU.draw(CUData);
				CTData = null;
				CMData = null;
				CUData = null;
			},300);
			
			
		}else{
			$(".clickOpersComp").hide();
			IntelligentRoadTest.isThreeNetStatus = false;
			for(var i = 0 ; i< IntelligentRoadTest.linkImgPoints.length;i++){
		        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.linkImgPoints[i]);
		    }
			
		    IntelligentRoadTest.linkImgPoints=[];
			if (IntelligentRoadTest.focusPolyline != null) {
				IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.focusPolyline);
			}
			//清除移动和联通地图的多边形和标记点覆盖物
//			for(var i=0;i<IntelligentRoadTest.badPolygonArrM.length;i++){
//				IntelligentRoadTest.mapMobile.removeOverlay(IntelligentRoadTest.badPolygonArrM[i]);
//			}
			for(var i=0;i<IntelligentRoadTest.badPolygonMarkerArrM.length;i++){
				IntelligentRoadTest.mapMobile.removeOverlay(IntelligentRoadTest.badPolygonMarkerArrM[i]);
			}
//			for(var i=0;i<IntelligentRoadTest.badPolygonArrU.length;i++){
//				IntelligentRoadTest.mapUnicom.removeOverlay(IntelligentRoadTest.badPolygonArrU[i]);
//			}
			for(var i=0;i<IntelligentRoadTest.badPolygonMarkerArrU.length;i++){
				IntelligentRoadTest.mapUnicom.removeOverlay(IntelligentRoadTest.badPolygonMarkerArrU[i]);
			}
			
			IntelligentRoadTest.sectorCompentM.clear();
			IntelligentRoadTest.sectorCompentU.clear();
			
			IntelligentRoadTest.GridMapM.clear();
			IntelligentRoadTest.GridMapU.clear();
			IntelligentRoadTest.GridMap.clear();
			
			
			IntelligentRoadTest.GridCanArrT = null;
			IntelligentRoadTest.GridCanArrM = null;
			IntelligentRoadTest.GridCanArrU = null;
			
			IntelligentRoadTest.GridCanArrT = [];
			IntelligentRoadTest.GridCanArrM = [];
			IntelligentRoadTest.GridCanArrU = [];
			
			var CTData = IntelligentRoadTest.CanArr;
			for(var j=0;j<IntelligentRoadTest.colorBarArr.length;j++){
				CTData = IntelligentRoadTest.ClearData(CTData,IntelligentRoadTest.colorBarArr[j]);
			}
			IntelligentRoadTest.GridMap.draw(CTData);
			CTData = null;
		}
		
	});
	
	$('#leftIcon').click(function(){
		$(window).resize();
	});
	
	$('#topHeader').click(function(){
		$(window).resize();
	});
	
	$('#downFooter').click(function(){
		$(window).resize();
	});
	
	$(window).resize(function(){
		$(".mapWrap").height($(".contentDiv").height()-$(".tableTop").height()-7);
		$(".mainTabContent").height($(".areaTableWrap").height()-40);
		$(".coverDiv").height($(".mapWrap").height()/1.4);
		$("#mapMobile, #mapUnicom").height($(".coverDiv").height()-$(".cover-title").height());
		if($('#sevenLineDiv').is(':visible')){
			if(IntelligentRoadTest.sevenLineEchart!=null){
				IntelligentRoadTest.sevenLineEchart.resize();
			}
		}
		
		
		if(IntelligentRoadTest.isThreeNetStatus){
			IntelligentRoadTest.centerAndZoomTimeout = setTimeout("IntelligentRoadTest.timeoutCenterAndZoom();",200);
			IntelligentRoadTest.drawPolylineTimeout = setTimeout("IntelligentRoadTest.drawPolyline();",400);
		}
		
	});
	
	
	var city = noceUtil.GetQueryString("city");//city
	var country = noceUtil.GetQueryString("country");//country
	var mktcenter = noceUtil.GetQueryString("mktcenter");//mktcenter
	var object_id = noceUtil.GetQueryString("object_id");
	var bstid = noceUtil.GetQueryString("bstid");//基站id
	var cellid = noceUtil.GetQueryString("cellid");//小区id
	var day = noceUtil.GetQueryString("day");//时间
	var clickSector = noceUtil.GetQueryString("clickSector");//是否查询弱区附近最近的一个基站
	
	if(!noceUtil.isUndefined(city)&&!noceUtil.isUndefined(country)&&!noceUtil.isUndefined(object_id)//&&!noceUtil.isUndefined(mktcenter)
			&&!noceUtil.isUndefined(day)){
		
		var cityPermission_common=$('#cityPermission_common').val();
		IntelligentRoadTest.cityPermission_common = cityPermission_common;
		if(cityPermission_common=="全省"){
//			IntelligentRoadTest.city = noceUtil.LATN_ID_city[city];
			IntelligentRoadTest.city = city;
		}else{
			if(city==cityPermission_common){
//				IntelligentRoadTest.city = noceUtil.LATN_ID_city[city];
				IntelligentRoadTest.city = city;
			}else{
				alert("地市与用户归属地市不一致");
				return;
			}
		}
		
		IntelligentRoadTest.country = country;
		IntelligentRoadTest.mktcenter = null;
		IntelligentRoadTest.object_id = object_id;
		IntelligentRoadTest.day = String(day);
		if(!noceUtil.isUndefined(clickSector)){
			if(clickSector=="1"||clickSector==1){
				IntelligentRoadTest.isPositioningSector = true;
			}
		}
		$('#seachTime').val(String(day));
		$('#weekStartTime').text(sevenBefore(String(day)));
		
		//加载弱区多边形
		IntelligentRoadTest.loadmktCenterPolygonData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day);
//		IntelligentRoadTest.loadmktCenterAreaTableData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day,IntelligentRoadTest.doType);

		$('#alarmCityName').val(city);
//		$('#jobSeachTime').val(String(day));
//		$('#jobStartTime').val(sevenBefore(String(day)));
		var t1=getNewDate(String(day).substring(0,4)+"/"+String(day).substring(4,6)+"/"+String(day).substring(6,8),4);
		$('#jobSeachTime').val(t1);
		var t2=getNewDate(sevenBefore(String(day)).substring(0,4)+"/"+sevenBefore(String(day)).substring(4,6)+"/"+sevenBefore(String(day)).substring(6,8),4);
		$('#jobStartTime').val(t2);
		
//		IntelligentRoadTest.loadJiZhanTableData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day);
//		IntelligentRoadTest.loadAlarmInfoTableData(sevenBefore(String(day)),String(day),city);
//		IntelligentRoadTest.queryAllConcernArea();
	}else if(!noceUtil.isUndefined(city)&&!noceUtil.isUndefined(bstid)&&!noceUtil.isUndefined(cellid)&&!noceUtil.isUndefined(day)){
        IntelligentRoadTest.badcellAnalysis=true;
       //分权分域
        var cityPermission_common=$('#cityPermission_common').val();
        IntelligentRoadTest.cityPermission_common = cityPermission_common;
        if(cityPermission_common=="全省"){
//			IntelligentRoadTest.city = noceUtil.LATN_ID_city[city];
            IntelligentRoadTest.city = city;
        }else{
            if(city==cityPermission_common){
//				IntelligentRoadTest.city = noceUtil.LATN_ID_city[city];
                IntelligentRoadTest.city = city;
            }else{
                alert("地市与用户归属地市不一致");
                return;
            }
        }

        //初始化变量和日期
        IntelligentRoadTest.country = "";
        IntelligentRoadTest.mktcenter = null;
        IntelligentRoadTest.day = String(day);
        IntelligentRoadTest.bstid = bstid;
        IntelligentRoadTest.cellid = cellid;
       /* if(!noceUtil.isUndefined(clickSector)){
            if(clickSector=="1"||clickSector==1){
                IntelligentRoadTest.isPositioningSector = true;
            }
        }*/
        $('#seachTime').val(String(day));
        $('#weekStartTime').text(sevenBefore(String(day)));

        //加载弱区多边形
        // IntelligentRoadTest.loadmktCenterPolygonData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day);

        $('#alarmCityName').val(city);
        var t1=getNewDate(String(day).substring(0,4)+"/"+String(day).substring(4,6)+"/"+String(day).substring(6,8),4);
        $('#jobSeachTime').val(t1);
        var t2=getNewDate(sevenBefore(String(day)).substring(0,4)+"/"+sevenBefore(String(day)).substring(4,6)+"/"+sevenBefore(String(day)).substring(6,8),4);
        $('#jobStartTime').val(t2);

	}
	
	IntelligentRoadTest.initMap();
	IntelligentRoadTest.loadDistrictJsonData();
	
	
	$("#gageDistance").click(function () {
		if(IntelligentRoadTest.bmapDistanceTool==null){
			IntelligentRoadTest.bmapDistanceTool = new measureDistance(IntelligentRoadTest.map);
		}else{
			IntelligentRoadTest.bmapDistanceTool.removeAll();
		}
		IntelligentRoadTest.bmapDistanceTool.openMeasure();
	});
	
	$('#BoxSelection').click(function(){
		
		if(IntelligentRoadTest.concerningArea){
			alert("请先将关注区域隐藏");
			return;
		}
		
		if($(this).text()=="框选栅格"){
            if(IntelligentRoadTest.map.getZoom()<=15){
                alert("请将地图放大到200米及以下");
                return;
            }
			//开始框选栅格
			$(this).text('取消框选');
			if(IntelligentRoadTest.myDrawingManagerObject==null){
				var styleOptions = {
				        strokeColor:"red",    //边线颜色。
				        //fillColor:"red",      //填充颜色
				        strokeWeight: 1,       //边线的宽度，以像素为单位。
				        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
				        fillOpacity: 0.3,      //填充的透明度，取值范围0 - 1。
				        strokeStyle: 'dashed' //边线的样式，solid或dashed。
				}
				IntelligentRoadTest.myDrawingManagerObject = new BMapLib.DrawingManager(IntelligentRoadTest.map, {isOpen: true, 
				    enableDrawingTool: true, //drawingType: BMAP_DRAWING_POLYGON,
				    enableCalculate: false,
				    drawingToolOptions: {
				        anchor: BMAP_ANCHOR_TOP_RIGHT,
				        offset: new BMap.Size(5, 5),
				        drawingModes : [
				            BMAP_DRAWING_POLYGON
				         ]
				    },
				    polygonOptions: styleOptions,
				    });
				IntelligentRoadTest.myDrawingManagerObject.setDrawingMode(BMAP_DRAWING_POLYGON);
//				alert(IntelligentRoadTest.myDrawingManagerObject.getDrawingMode());
				IntelligentRoadTest.myDrawingManagerObject.addEventListener('overlaycomplete', IntelligentRoadTest.overlaycomplete);
			}else{
				IntelligentRoadTest.myDrawingManagerObject.open();
			}
			//锁定地图
            IntelligentRoadTest.map.disableDragging();//禁用拖拽
            IntelligentRoadTest.map.disableScrollWheelZoom()// 禁用滚轮缩放
            // IntelligentRoadTest.map.enableScrollWheelZoom(); // 允许滚轮缩放
            // IntelligentRoadTest.map.enableDragging();
			IntelligentRoadTest.selectingBox = true;
			
			
		}else{
			//清除框选
			$(this).text('框选栅格');
            IntelligentRoadTest.map.enableScrollWheelZoom(); // 允许滚轮缩放
            IntelligentRoadTest.map.enableDragging();
			if(IntelligentRoadTest.myDrawingManagerObject!=null){
				IntelligentRoadTest.myDrawingManagerObject.close(true);
			}
			for(var i=0;i<IntelligentRoadTest.SelectionOverlayList.length;i++){
				IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.SelectionOverlayList[i]);
			}
			
			if(IntelligentRoadTest.selectBoxMarker!=null){
				IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.selectBoxMarker);
			}
			
			for(var i=0;i<IntelligentRoadTest.SelectionOverlayListM.length;i++){
				IntelligentRoadTest.mapMobile.removeOverlay(IntelligentRoadTest.SelectionOverlayListM[i]);
			}
			
			for(var i=0;i<IntelligentRoadTest.SelectionOverlayListU.length;i++){
				IntelligentRoadTest.mapUnicom.removeOverlay(IntelligentRoadTest.SelectionOverlayListU[i]);
			}
			
			IntelligentRoadTest.SelectionOverlayList = null;
			IntelligentRoadTest.SelectionOverlayList = [];
			IntelligentRoadTest.SelectionOverlayListM = null;
			IntelligentRoadTest.SelectionOverlayListM = [];
			IntelligentRoadTest.SelectionOverlayListU = null;
			IntelligentRoadTest.SelectionOverlayListU = [];
			
			IntelligentRoadTest.GridCanArrT = null;
			IntelligentRoadTest.GridCanArr = null;
			IntelligentRoadTest.CanArr = null;
			
			IntelligentRoadTest.GridCanArrT = [];
//			IntelligentRoadTest.GridCanArr = [];
			IntelligentRoadTest.CanArr = [];
			IntelligentRoadTest.GridMap.clear();
			
			IntelligentRoadTest.GridCanArrM = null;
			IntelligentRoadTest.GridCanArrM = [];
			IntelligentRoadTest.GridMapM.clear();
			
			IntelligentRoadTest.GridCanArrU = null;
			IntelligentRoadTest.GridCanArrU = [];
			IntelligentRoadTest.GridMapU.clear();
			
			IntelligentRoadTest.selectingBox = false;
		}
	});
	
	$('#submit').click(function(){
		var city = $('#cityName').text().replace('市','');
		var country = $('#areaName').text();
		var mktcenter = $('#regon').text();
		var doType=$('#doType').html();
		IntelligentRoadTest.city = city;
		IntelligentRoadTest.country = country;
		var point = null;
		if(mktcenter =="全部营服"){
			mktcenter = null;
//			IntelligentRoadTest.mktcenter = mktcenter;
			var max_lng = parseFloat(IntelligentRoadTest.districtLngAndLat[city][country]['max_lng']);
			var max_lat = parseFloat(IntelligentRoadTest.districtLngAndLat[city][country]['max_lat']);
			var min_lng = parseFloat(IntelligentRoadTest.districtLngAndLat[city][country]['min_lng']);
			var min_lat = parseFloat(IntelligentRoadTest.districtLngAndLat[city][country]['min_lat']);
			point = new BMap.Point((max_lng+min_lng)/2,(max_lat+min_lat)/2);
		}else{
			
			var districtObj=IntelligentRoadTest.SelectDataChe[city];
			var marketbaseArr=(null==districtObj || null==districtObj[country])?[]:districtObj[country];
			for(var i=0;i<marketbaseArr.length;i++){
				var m = marketbaseArr[i];//{id:'',name:'',max_lng:'',max_lat:'',min_lng:'',min_lat:'',gis:''}
				var max_lng = parseFloat(m['max_lng']);
				var max_lat = parseFloat(m['max_lat']);
				var min_lng = parseFloat(m['min_lng']);
				var min_lat = parseFloat(m['min_lat']);
				point = new BMap.Point((max_lng+min_lng)/2,(max_lat+min_lat)/2);
				break;
			}
		}
		if(point!=null){
			IntelligentRoadTest.map.setCenter(point);
		}
		
		IntelligentRoadTest.mktcenter = mktcenter;
		
		if($('#sector').is(':checked')){
			if(IntelligentRoadTest.sectorCompent.selectCity!=IntelligentRoadTest.city
//					||
//					IntelligentRoadTest.sectorCompent.selectDistrict!=IntelligentRoadTest.country
					){
				
				IntelligentRoadTest.sectorCompent.selectCity =IntelligentRoadTest.city;
//				IntelligentRoadTest.sectorCompent.selectDistrict = IntelligentRoadTest.country;
				
				if(IntelligentRoadTest.sectorCompent.selectTime==undefined||IntelligentRoadTest.sectorCompent.selectTime==null){
					IntelligentRoadTest.sectorCompent.selectTime = IntelligentRoadTest.day;
				}
				
				IntelligentRoadTest.sectorCompent.queryByTemplate();
			}else{
				IntelligentRoadTest.sectorCompent.clear();
				IntelligentRoadTest.sectorCompent.draw();
			}
		}
		
		
		
		var day = IntelligentRoadTest.day;
		IntelligentRoadTest.loadmktCenterPolygonData(city,country,mktcenter,day);
		IntelligentRoadTest.loadmktCenterAreaTableData(city,country,mktcenter,day,IntelligentRoadTest.doType);
		IntelligentRoadTest.loadJiZhanTableData(city,country,mktcenter,day);
//		IntelligentRoadTest.loadAlarmInfoTableData(day);
		//置空基站告警表格
		var alarmData = {columns:["day","base_statn_id","cell_id","factory","alarm_time","clear_time","alarm_level","isrecover","outofsrv","prob_cause"],result:[],type:[]}
		IntelligentRoadTest.showSectorAlarmTable(alarmData);
		//置空KPI表格
		var KPIData = {columns:["day","enodebid","cell_id","cell_name","erab_succ_rate","erab_drop_rate","rrccon_succrate","swchsf_succ_rate","swchaf_succ_rate","up_prb_userate","dw_prb_userate","counter0003","pdch_flow"],result:[],type:[]}
		IntelligentRoadTest.showSectorKPITable(KPIData);
		
	});
	
	
	//栅格图例绑定点击事件
	$(".colorLegen").children().each(function(i){
		$(this).click(function(){
			var id = $(this).attr("id");
			if($(this).hasClass("grey")){//判断该图例颜色是否为灰
				//灰色的时候，呈现栅格
				$(this).removeClass("grey");
//				console.log("呈现栅格");
				IntelligentRoadTest.colorBarArr = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArr,id.split("_")[1]);
			}else{
				//呈现该图例栅格
				$(this).addClass("grey");
				IntelligentRoadTest.colorBarArr.push(id.split("_")[1]);
//				console.log("清除栅格");
			}
			
			console.log(IntelligentRoadTest.colorBarArr);
			if(IntelligentRoadTest.isShowGrid){
				if(IntelligentRoadTest.isShowDTGrid){
					IntelligentRoadTest.GridMap.clear();
					var CTData = IntelligentRoadTest.CanArr;
					for(var j=0;j<IntelligentRoadTest.colorBarArr.length;j++){
						CTData = IntelligentRoadTest.ClearData(CTData,IntelligentRoadTest.colorBarArr[j]);
					}
					IntelligentRoadTest.GridMap.draw(CTData);
					CTData = null;
				}else{
					//增加移动联通地图栅格重绘
					if(IntelligentRoadTest.isThreeNetStatus){
						IntelligentRoadTest.GridMap.clear();
						IntelligentRoadTest.GridMapM.clear();
						IntelligentRoadTest.GridMapU.clear();
						var CTData = IntelligentRoadTest.GridCanArrT;
						var CMData = IntelligentRoadTest.GridCanArrM;
						var CUData = IntelligentRoadTest.GridCanArrU;
						for(var j=0;j<IntelligentRoadTest.colorBarArr.length;j++){
							CTData = IntelligentRoadTest.ClearData(CTData,IntelligentRoadTest.colorBarArr[j]);
							CMData = IntelligentRoadTest.ClearData(CMData,IntelligentRoadTest.colorBarArr[j]);
							CUData = IntelligentRoadTest.ClearData(CUData,IntelligentRoadTest.colorBarArr[j]);
						}
						IntelligentRoadTest.GridMap.draw(CTData);
						IntelligentRoadTest.GridMapM.draw(CMData);
						IntelligentRoadTest.GridMapU.draw(CUData);
						CTData = null;
						CMData = null;
						CUData = null;
					}else{
						IntelligentRoadTest.GridMap.clear();
						var CTData = IntelligentRoadTest.CanArr;
						for(var j=0;j<IntelligentRoadTest.colorBarArr.length;j++){
							CTData = IntelligentRoadTest.ClearData(CTData,IntelligentRoadTest.colorBarArr[j]);
						}
						IntelligentRoadTest.GridMap.draw(CTData);
						CTData = null;
					}
				}
				
				
			}else{
				var DTData = IntelligentRoadTest.GridMapCircleData;
				for(var j=0;j<IntelligentRoadTest.colorBarArr.length;j++){
					DTData = IntelligentRoadTest.ClearDtData(DTData,IntelligentRoadTest.colorBarArr[j]);
				}
//				IntelligentRoadTest.GridMapCircle.drawCircle(DTData);
				IntelligentRoadTest.GridMap.drawCircle(DTData);
				DTData = null;
			}
			
		});
	});
	
	
	$("#searchButton").on("click", function() {
		var val = $('#searchText').val().trim();
		var re2=new RegExp('^[\u4e00-\u9fa5]{1,}');
		var re3=new RegExp("^[0-9]+\.[0-9]+\,[0-9]+\.[0-9]+$");
		var re4=new RegExp("^[0-9]+\_[0-9]+$");
		if(re2.test(val)){//输入的都是中文,用百度地图搜索组件
			if(IntelligentRoadTest.localSearch==undefined){
				IntelligentRoadTest.localSearch = new BMap.LocalSearch(IntelligentRoadTest.city, {
//					renderOptions:{map: IntelligentRoadTest.map},
					onSearchComplete:IntelligentRoadTest.localSearchSearchComplete
				});
			}else{
				IntelligentRoadTest.localSearch.clearResults();
			}
			IntelligentRoadTest.localSearch.search(val);
			
		}
//		else if(val.indexOf("BST")>=0){//以BST开头，认为是基站名称
//			val = val.replace('BST','');
//			var list = ["IntelligentRoadTest_16_bstSearchByName","BSTNAME:"+val];
//			var progressBarSqls=[];
//			progressBarSqls.push(list);
//			var functionlist = [IntelligentRoadTest.bstSearchData];
//			var dataBase = [3];
//			progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase);
//		}
		else if(re3.test(val)){//经纬度定位
			var lng = val.split(",")[0];
			var lat = val.split(",")[1];
			var polyPoint = new BMap.Point(Number(lng),Number(lat))
			IntelligentRoadTest.map.setCenter(polyPoint);
			
			if(IntelligentRoadTest.positioningMarker!=null){
				IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.positioningMarker);
			}
			var myIcon = new BMap.Icon("../js/IntelligentRoadTest/images/mapPositioning.png", new BMap.Size(23,23));
			IntelligentRoadTest.positioningMarker = new BMap.Marker(polyPoint,{icon:myIcon});
			IntelligentRoadTest.positioningMarker.setZIndex(-1);
			IntelligentRoadTest.positioningMarker.setOffset(new BMap.Size(0,-12));
			IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.positioningMarker);
			
			for(var i=0;i<IntelligentRoadTest.badPolygonMarkerArr.length;i++){
				//如果弱区的图标是定位图标，则换回弱区图标
				var markerImg = IntelligentRoadTest.badPolygonMarkerArr[i].getIcon();
				if(markerImg.imageUrl.indexOf("mapPositioning.png")>=0){
					markerImg.setImageUrl("../js/IntelligentRoadTest/images/polygonCenter.png");
					markerImg.setSize(new BMap.Size(23,32))
					IntelligentRoadTest.badPolygonMarkerArr[i].setIcon(markerImg);
				}
//				markerImg = null;
			}
			
			var district = IntelligentRoadTest.getCenterPointDistrict(polyPoint);
			if(IntelligentRoadTest.cityPermission_common=="全省"){
				if(district!=null){
					if(district.city!=IntelligentRoadTest.city||district.name!=IntelligentRoadTest.country){
						IntelligentRoadTest.city = district.city;
						IntelligentRoadTest.country = district.name;
						IntelligentRoadTest.mktcenter = null;
						
						$('#cityList_1 > li').each(function(){
							$(this).children('a').each(function(){
								if($(this).text() == IntelligentRoadTest.city){
									$(this).click();
								}
							});
						});
						
						$('#district > a').each(function(){
							if($(this).text() == IntelligentRoadTest.country){
								$(this).click();
							}
						});
//						$('#submit').click();
						IntelligentRoadTest.loadmktCenterPolygonData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day);
//						IntelligentRoadTest.loadmktCenterAreaTableData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day,IntelligentRoadTest.doType);
//						IntelligentRoadTest.loadJiZhanTableData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day);
					}
				}
				
				if($('#sector').is(':checked')){
					if(IntelligentRoadTest.sectorCompent.selectCity!=IntelligentRoadTest.city
//							||
//							IntelligentRoadTest.sectorCompent.selectDistrict!=IntelligentRoadTest.country
							){
						
						IntelligentRoadTest.sectorCompent.selectCity =IntelligentRoadTest.city;
//						IntelligentRoadTest.sectorCompent.selectDistrict = IntelligentRoadTest.country;
						
//						IntelligentRoadTest.sectorCompent.selectCity = district.city;
//						IntelligentRoadTest.sectorCompentM.selectCity = district.city;
//						IntelligentRoadTest.sectorCompentU.selectCity = district.city;
						if(IntelligentRoadTest.sectorCompent.selectTime==undefined||IntelligentRoadTest.sectorCompent.selectTime==null){
							IntelligentRoadTest.sectorCompent.selectTime = IntelligentRoadTest.day;
						}
						IntelligentRoadTest.sectorCompent.queryByTemplate();
//						IntelligentRoadTest.sectorCompentM.queryByTemplate();
//						IntelligentRoadTest.sectorCompentU.queryByTemplate();
					}else{
						IntelligentRoadTest.sectorCompent.clear();
						IntelligentRoadTest.sectorCompent.draw();
//						IntelligentRoadTest.sectorCompentM.draw();
//						IntelligentRoadTest.sectorCompentU.draw();
					}
				}
				
			}else{
				if(district!=null){
					if(district.city==IntelligentRoadTest.cityPermission_common){
						if(district.city!=IntelligentRoadTest.city||district.name!=IntelligentRoadTest.country){
							IntelligentRoadTest.city = district.city;
							IntelligentRoadTest.country = district.name;
							IntelligentRoadTest.mktcenter = null;
							
							$('#cityList_1 > li').each(function(){
								$(this).children('a').each(function(){
									if($(this).text() == IntelligentRoadTest.city){
										$(this).click();
									}
								});
							});
							
							$('#district > a').each(function(){
								if($(this).text() == IntelligentRoadTest.country){
									$(this).click();
								}
							});
//							$('#submit').click();
							IntelligentRoadTest.loadmktCenterPolygonData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day);
//							IntelligentRoadTest.loadmktCenterAreaTableData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day,IntelligentRoadTest.doType);
						}
						
						if($('#sector').is(':checked')){
							if(IntelligentRoadTest.sectorCompent.selectCity!=IntelligentRoadTest.city
//									||
//									IntelligentRoadTest.sectorCompent.selectDistrict!=IntelligentRoadTest.country
									){
								
								IntelligentRoadTest.sectorCompent.selectCity =IntelligentRoadTest.city;
//								IntelligentRoadTest.sectorCompent.selectDistrict = IntelligentRoadTest.country;
//								IntelligentRoadTest.sectorCompentM.selectCity = district.city;
//								IntelligentRoadTest.sectorCompentU.selectCity = district.city;
								if(IntelligentRoadTest.sectorCompent.selectTime==undefined||IntelligentRoadTest.sectorCompent.selectTime==null){
									IntelligentRoadTest.sectorCompent.selectTime = IntelligentRoadTest.day;
								}
								IntelligentRoadTest.sectorCompent.queryByTemplate();
//								IntelligentRoadTest.sectorCompentM.queryByTemplate();
//								IntelligentRoadTest.sectorCompentU.queryByTemplate();
							}else{
								IntelligentRoadTest.sectorCompent.clear();
								IntelligentRoadTest.sectorCompent.draw();
//								IntelligentRoadTest.sectorCompentM.draw();
//								IntelligentRoadTest.sectorCompentU.draw();
							}
						}
					}
				}
			}
			
			
		}else if(re4.test(val)){//基站id_小区id
			var tex = val.split('_');
			var list = ["IntelligentRoadTest_17_cellPositioning","DAY:"+IntelligentRoadTest.day,"BSTID:"+tex[0],"CELLID:"+tex[1]];
			var progressBarSqls=[];
			progressBarSqls.push(list);
			var functionlist = [IntelligentRoadTest.cellPositioning];
			var dataBase = [3];
			progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase);
		}
		
		
	});
	
//	$("#searchText").click(function () {
//		$(".searchBox .search-info").show();
//	});
	
	//清除按钮
    $('.clearText').click(function () {
    	$(this).siblings('.textBox').val("");
    });
	
	
	$("body").click(function (e) {
		if($(e.target).closest(".select-name,.city-info,.tool-info > a,.searchBox .textBox,.search-info,.btn-search,.house input,.house label,.selectTriangle").length == 0){
			$(".select-info,.tool-info,.search-info,.tabSelect-info").hide();
		};
	});
	
	$('#GridForTop').click(function(){
		if($(this).text()=="栅格置顶"){
			$(this).text('取消栅格置顶');
//			console.log('需要显示栅格信息');
			IntelligentRoadTest.isGridTop = true;
		}else{
			$(this).text('栅格置顶');
//			console.log('不需要显示栅格信息');
			IntelligentRoadTest.isGridTop = false;
		}
	});
	
	$('#areaTAbleExport').click(function(){
		var city = $('#cityName').text().replace('市','');
		var country = $('#areaName').text();
		var mktcenter = $('#regon').text();
		var fileName = "";
		var sheetName = "";
		var list = ["DAY:"+IntelligentRoadTest.day,"CITY:"+city,"COUNTRY:"+country];
		if(mktcenter=="全部营服"){
			fileName = city+"("+country+")";
			sheetName = country;
			list.push("MKTCENTER:");
		}else{
			fileName = city+"("+country+"_"+mktcenter+")";
			sheetName = mktcenter;
			list.push("MKTCENTER:"+"and MKTCENTER = '"+mktcenter+"'");
		}
		var titleName;
		var templateId;
		if($('#seid').html()=='弱覆盖区域'){
			templateId ="IntelligentRoadTest_09_areaTable";
			titleName = ["弱区编号","地市","区县","营服中心","最近站址",
			 			"最近基站ID","最近小区ID","最近小区名","最近小区状态","最近TOP5小区集","MR数最大TOP5小区集","退服告警数","退服告警小区数","未恢复退服告警小区数", 
						"建议处理措施","是否派单","4G切3G总次数","4G切3G总次数排名","4G总流量(MB)","4G流量排名","4G用户数","4G用户数排名","感知优良率(%)","感知优良率排名",
				"弱栅格数","弱栅格数排名","弱栅格面积(㎡)","栅格总面积(㎡)","中心点经度","中心点纬度","中心点区域归属ID",
				"GIS经纬度集","最终排名累计","日期","工单号"];
		}else{
			templateId="IntelligentRoadTest_09_jizhanTable_dc";
			titleName=["站名","地市","区县","营服中心",
			"基站ID","小区ID","小区名","小区归属ID","告警级别","退服告警数","小区状态","弱覆盖区域数","附近弱覆盖区域数","4G切3G总次数","4G总流量",
			"4G用户数","感知优良率","栅格数","弱覆盖区域集合","附近弱覆盖区域集合"];
		}
		
		var obj={
				fileName:fileName+$('#seid').html(),
				dataType:3,
				paraLists:[
				     {
				     sheetName:sheetName+$('#seid').html(),
				     titleName:titleName,
				     mergeTitle:[],
				     templateId:templateId,
				     templatePara:list,
				     },
				          ],
			};
		var exportExcel=new exportExcelNew(obj);
		exportExcel.submit();
		
		
	});
	//隐藏关注区域按钮
	$('#hideConcernArea').click(function(){
        IntelligentRoadTest.hideConcernArea();
        $(this).parent().hide();
		if(IntelligentRoadTest.concerningArea){

		}else{
			
		}
	});
	$('#concernAreaSearchButton').click(function(){
		var name = $('#concernAreaSearchText').val().trim();
		IntelligentRoadTest.concernAreaSearch(name);
	});
	
	$('#DtSearchButton').click(function(){
		var name = $('#DtSearchText').val().trim();
		if(name==null||name==''){
//			IntelligentRoadTest.queryAllDTList();
		}else{
			IntelligentRoadTest.queryAllDTList(name);
		}
		
	});
	
	setTimeout(function(){
		$(window).resize();
	},1000);
	
});


function searchenter(event) {
    event = event || window.event;
    if (event.keyCode == 13) {
    	$("#searchButton").click();
    }
}

IntelligentRoadTest.bstSearchData = function IntelligentRoadTest_bstSearchData(data){
	var result = callBackChangeData(data);
//	var $bstSearchResult = $('#bstSearchResult');
//	$bstSearchResult.html('');
//	for(var i=0;i<result.length;i++){
//		var infoStr = "";
//		infoStr += result[i].base_statn_name+"("+result[i].base_statn_id+"),";
//		infoStr += result[i].cell_name+"("+result[i].cell_id+")";
//		var lng = result[i].longitude_baidu;
//		var lat = result[i].latitude_baidu;
//		$bstSearchResult.append('<li class="search-text" position="'+lng+','+lat+'">'+infoStr+'</li>');
//	}
//	$bstSearchResult.show();
//	$('#bstSearchResult > li').unbind("click").bind('click',function(){
//		var position = $(this).attr("position");
//		var pointArr = position.split(",");
//		var point = new BMap.Point(pointArr[0],pointArr[1]);
//		IntelligentRoadTest.map.centerAndZoom(point,17);
//		$('#bstSearchResult').hide();
//	})
	
	if(result.length>=1){
		var lng = result[0].longitude_baidu;
		var lat = result[0].latitude_baidu;
		var bst_id = result[0].base_statn_id;
		var cell_id = result[0].cell_id;
		var point = new BMap.Point(lng,lat);
		IntelligentRoadTest.map.setCenter(point);
		IntelligentRoadTest.map.setZoom(18);
		
		if(IntelligentRoadTest.isThreeNetStatus){
			IntelligentRoadTest.mapMobile.setCenter(point);
			IntelligentRoadTest.mapMobile.setZoom(18);
			
			IntelligentRoadTest.mapUnicom.setCenter(point);
			IntelligentRoadTest.mapUnicom.setZoom(18);
			
			IntelligentRoadTest.drawPolylineTimeout = setTimeout("IntelligentRoadTest.drawPolyline();", 200);
			
		}
		
		if(IntelligentRoadTest.positioningMarker!=null){
			IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.positioningMarker);
		}
		var myIcon = new BMap.Icon("../js/IntelligentRoadTest/images/mapPositioning.png", new BMap.Size(23,23));
		IntelligentRoadTest.positioningMarker = new BMap.Marker(point,{icon:myIcon});
		IntelligentRoadTest.positioningMarker.setZIndex(-1);
		IntelligentRoadTest.positioningMarker.setOffset(new BMap.Size(0,-12));
		IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.positioningMarker);
		
		if($('#sector').is(':checked')){
			if(IntelligentRoadTest.sectorCompent!=null){
				for(var i=0;i<IntelligentRoadTest.sectorCompent.sectorPolygon.length;i++){
					if(bst_id==IntelligentRoadTest.sectorCompent.sectorPolygon[i].statn_id
							&&cell_id==IntelligentRoadTest.sectorCompent.sectorPolygon[i].cell_id){
						IntelligentRoadTest.sectorCompent.reloadPolygon = IntelligentRoadTest.sectorCompent.sectorPolygon[i].data;
					}
				}
				var e = {};
				IntelligentRoadTest.sectorCompent.MapZoomAndDragEnd(e,IntelligentRoadTest.sectorCompent);
			}
			
//			//增加移动联通地图基站重绘
//			if(IntelligentRoadTest.isThreeNetStatus){
//				if(IntelligentRoadTest.sectorCompentM!=null){
//					IntelligentRoadTest.sectorCompentM.MapZoomAndDragEnd(e,IntelligentRoadTest.sectorCompentM);
//				}
//				
//				if(IntelligentRoadTest.sectorCompentU!=null){
//					IntelligentRoadTest.sectorCompentU.MapZoomAndDragEnd(e,IntelligentRoadTest.sectorCompentU);
//				}
//			}
		}
	}
}
//根据基站id和小区id搜索后进行定位的回调函数
IntelligentRoadTest.cellPositioning = function IntelligentRoadTest_cellPositioning(data){
	var result = callBackChangeData(data);
	if(result.length>0){
		var point = new BMap.Point(result[0].longitude_baidu,result[0].latitude_baidu);
//		IntelligentRoadTest.map.centerAndZoom(point,17);
		IntelligentRoadTest.map.setCenter(point);
		
		if(IntelligentRoadTest.isThreeNetStatus){
			IntelligentRoadTest.mapMobile.setCenter(point);
			IntelligentRoadTest.mapUnicom.setCenter(point);
		}
		
		if(IntelligentRoadTest.positioningMarker!=null){
			IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.positioningMarker);
		}
		var myIcon = new BMap.Icon("../js/IntelligentRoadTest/images/mapPositioning.png", new BMap.Size(23,23));
		IntelligentRoadTest.positioningMarker = new BMap.Marker(point,{icon:myIcon});
		IntelligentRoadTest.positioningMarker.setZIndex(-1);
		IntelligentRoadTest.positioningMarker.setOffset(new BMap.Size(0,-12));
		IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.positioningMarker);
		
		for(var i=0;i<IntelligentRoadTest.badPolygonMarkerArr.length;i++){
			//如果弱区的图标是定位图标，则换回弱区图标
			var markerImg = IntelligentRoadTest.badPolygonMarkerArr[i].getIcon();
			if(markerImg.imageUrl.indexOf("mapPositioning.png")>=0){
				markerImg.setImageUrl("../js/IntelligentRoadTest/images/polygonCenter.png");
				markerImg.setSize(new BMap.Size(23,32));
				IntelligentRoadTest.badPolygonMarkerArr[i].setIcon(markerImg);
			}
//			markerImg = null;
		}
		
		
		var district = IntelligentRoadTest.getCenterPointDistrict(point);
		
		if(IntelligentRoadTest.cityPermission_common=="全省"){
			if(district!=null){
				if(district.city!=IntelligentRoadTest.city||district.name!=IntelligentRoadTest.country){
					IntelligentRoadTest.city = district.city;
					IntelligentRoadTest.country = district.name;
					IntelligentRoadTest.mktcenter = null;
					
					$('#cityList_1 > li').each(function(){
						$(this).children('a').each(function(){
							if($(this).text() == IntelligentRoadTest.city){
								$(this).click();
							}
						});
					});
					
					$('#district > a').each(function(){
						if($(this).text() == IntelligentRoadTest.country){
							$(this).click();
						}
					});
//					$('#submit').click();
					IntelligentRoadTest.loadmktCenterPolygonData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day);
//					IntelligentRoadTest.loadmktCenterAreaTableData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day,IntelligentRoadTest.doType);
				}
				
				if($('#sector').is(':checked')){
					if(IntelligentRoadTest.sectorCompent.selectCity!=IntelligentRoadTest.city
//							||
//							IntelligentRoadTest.sectorCompent.selectDistrict!=IntelligentRoadTest.country
							){
						
						IntelligentRoadTest.sectorCompent.selectCity =IntelligentRoadTest.city;
//						IntelligentRoadTest.sectorCompent.selectDistrict = IntelligentRoadTest.country;
//						IntelligentRoadTest.sectorCompentM.selectCity = district.city;
//						IntelligentRoadTest.sectorCompentU.selectCity = district.city;
						if(IntelligentRoadTest.sectorCompent.selectTime==undefined||IntelligentRoadTest.sectorCompent.selectTime==null){
							IntelligentRoadTest.sectorCompent.selectTime = IntelligentRoadTest.day;
						}
						IntelligentRoadTest.sectorCompent.queryByTemplate();
//						IntelligentRoadTest.sectorCompentM.queryByTemplate();
//						IntelligentRoadTest.sectorCompentU.queryByTemplate();
					}else{
						IntelligentRoadTest.sectorCompent.clear();
						IntelligentRoadTest.sectorCompent.draw();
//						IntelligentRoadTest.sectorCompentM.draw();
//						IntelligentRoadTest.sectorCompentU.draw();
					}
				}
			}
		}else{
			if(district!=null){
				if(district.city==IntelligentRoadTest.cityPermission_common){
					if(district.city!=IntelligentRoadTest.city||district.name!=IntelligentRoadTest.country){
						IntelligentRoadTest.city = district.city;
						IntelligentRoadTest.country = district.name;
						IntelligentRoadTest.mktcenter = null;
						
						$('#cityList_1 > li').each(function(){
							$(this).children('a').each(function(){
								if($(this).text() == IntelligentRoadTest.city){
									$(this).click();
								}
							});
						});
						
						$('#district > a').each(function(){
							if($(this).text() == IntelligentRoadTest.country){
								$(this).click();
							}
						});
//						$('#submit').click();
						IntelligentRoadTest.loadmktCenterPolygonData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day);
//						IntelligentRoadTest.loadmktCenterAreaTableData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day,IntelligentRoadTest.doType);
					}
					
					if($('#sector').is(':checked')){
						if(IntelligentRoadTest.sectorCompent.selectCity!=IntelligentRoadTest.city
//								||
//								IntelligentRoadTest.sectorCompent.selectDistrict!=IntelligentRoadTest.country
								){
							
							IntelligentRoadTest.sectorCompent.selectCity =IntelligentRoadTest.city;
//							IntelligentRoadTest.sectorCompent.selectDistrict = IntelligentRoadTest.country;
//							IntelligentRoadTest.sectorCompentM.selectCity = district.city;
//							IntelligentRoadTest.sectorCompentU.selectCity = district.city;
							if(IntelligentRoadTest.sectorCompent.selectTime==undefined||IntelligentRoadTest.sectorCompent.selectTime==null){
								IntelligentRoadTest.sectorCompent.selectTime = IntelligentRoadTest.day;
							}
							IntelligentRoadTest.sectorCompent.queryByTemplate();
//							IntelligentRoadTest.sectorCompentM.queryByTemplate();
//							IntelligentRoadTest.sectorCompentU.queryByTemplate();
						}else{
							IntelligentRoadTest.sectorCompent.clear();
							IntelligentRoadTest.sectorCompent.draw();
//							IntelligentRoadTest.sectorCompentM.draw();
//							IntelligentRoadTest.sectorCompentU.draw();
						}
					}
					
				}
			}
		}
		
		
	}else{
		alert(IntelligentRoadTest.day+"查询不到该扇区");
	}
	
}

IntelligentRoadTest.removeId = function IntelligentRoadTest_removeId(idArr,id){
	var NewId = [];
	if(idArr.length>0){
		for(var i=0;i<idArr.length;i++){
			if(idArr[i]!=id){
				NewId.push(idArr[i]);
			}
		}
	}
	return NewId;
};

IntelligentRoadTest.ClearData = function IntelligentRoadTest_ClearData(data,id){
		var newTileData = [];
		for(var i=0;i<data.length;i++){
			if(id=="1"){//去掉大于等于-85的
				if(data[i][4]<=-85){
					newTileData.push(data[i]);
				}
			}else if(id=="2"){//去掉大于等于-95  小于等于-85的
				if(-95>=data[i][4]||data[i][4]>-85){
					newTileData.push(data[i]);
				}
			}else if(id=="3"){//去掉大于等于-105  小于等于-95的
				if(-105>=data[i][4]||data[i][4]>-95){
					newTileData.push(data[i]);
				}
			}else if(id=="4"){//去掉大于等于-115  小于等于-105的
				if(-115>=data[i][4]||data[i][4]>-105){
					newTileData.push(data[i]);
				}
			}else if(id=="5"){//去掉 小于等于-115的
				if(data[i][4]>-115){
					newTileData.push(data[i]);
				}
			}
		}
		
		return newTileData;
}

IntelligentRoadTest.ClearDtData = function IntelligentRoadTest_ClearDtData(data,id){
	var newTileData = [];
	for(var i=0;i<data.length;i++){
		if(id=="1"){//去掉大于等于-85的
			if(data[i][2]<=-85){
				newTileData.push(data[i]);
			}
		}else if(id=="2"){//去掉大于等于-95  小于等于-85的
			if(-95>=data[i][2]||data[i][2]>-85){
				newTileData.push(data[i]);
			}
		}else if(id=="3"){//去掉大于等于-105  小于等于-95的
			if(-105>=data[i][2]||data[i][2]>-95){
				newTileData.push(data[i]);
			}
		}else if(id=="4"){//去掉大于等于-115  小于等于-105的
			if(-115>=data[i][2]||data[i][2]>-105){
				newTileData.push(data[i]);
			}
		}else if(id=="5"){//去掉 小于等于-115的
			if(data[i][2]>-115){
				newTileData.push(data[i]);
			}
		}
	}
	
	return newTileData;
}


IntelligentRoadTest.initAreaSelectList = function IntelligentRoadTest_initAreaSelectList(){
	$('.city-list').html('');
	var cityPermission_common=$('#cityPermission_common').val();
	if(cityPermission_common=='全省'){
		$('#cityList_3').append('<li class="current"><a href="javascript:;">全省</a></li>');
		for(var i=0;i<IntelligentRoadTest.allCity.length;i++){
			if(IntelligentRoadTest.allCity[i]==IntelligentRoadTest.city){
				$('#cityList_1').append('<li class="current" onclick="IntelligentRoadTest.qhCity(\''+IntelligentRoadTest.allCity[i]+'\')"><a href="javascript:;">'+IntelligentRoadTest.allCity[i]+'</a></li>');
				$('#cityList_2').append('<li class="current"><a href="javascript:;">'+IntelligentRoadTest.allCity[i]+'</a></li>');
				$('#cityList_3').append('<li><a href="javascript:;">'+IntelligentRoadTest.allCity[i]+'</a></li>');
				//初始化该地市的区县下拉列表
				
				var distinctObj = IntelligentRoadTest.SelectDataChe[IntelligentRoadTest.city];
				// 切换地市时，初始化区县
				var $District = $('#district');
//				$District.html('<a href="javascript:;">区县</a>');
				$District.html('');
				
				distinctObj=null==distinctObj?{}:distinctObj;//防止distinctArr是‘undefined’时会报错
				var index = 0;
				for(var k in distinctObj){
					if(IntelligentRoadTest.isFirstSelectMkt){
						if(k==IntelligentRoadTest.country){
							$District.siblings(".select-name").children(".selectA").text(k);
							IntelligentRoadTest.initMarketbaseSelect(IntelligentRoadTest.city, k);
						}
					}else{
						if(index == 0){
							$District.siblings(".select-name").children(".selectA").text(k);
							IntelligentRoadTest.initMarketbaseSelect(IntelligentRoadTest.city, k);
						}
						
					}
					index++;
					$District.append('<a href="javascript:;">'+k+'</a>');
				}
				
			}else{
				$('#cityList_1').append('<li onclick="IntelligentRoadTest.qhCity(\''+IntelligentRoadTest.allCity[i]+'\')"><a href="javascript:;">'+IntelligentRoadTest.allCity[i]+'</a></li>');
				$('#cityList_2').append('<li><a href="javascript:;">'+IntelligentRoadTest.allCity[i]+'</a></li>');
				$('#cityList_3').append('<li><a href="javascript:;">'+IntelligentRoadTest.allCity[i]+'</a></li>');
			}
			
		}
	}else{
//		OpersComp.city=cityPermission_common;
		for(var i=0;i<IntelligentRoadTest.allCity.length;i++){
			if(IntelligentRoadTest.allCity[i]==IntelligentRoadTest.city){
				$('#cityList_1').append('<li class="current" onclick="IntelligentRoadTest.qhCity(\''+IntelligentRoadTest.allCity[i]+'\')"><a href="javascript:;">'+IntelligentRoadTest.allCity[i]+'</a></li>');
				$('#cityList_2').append('<li class="current"><a href="javascript:;">'+IntelligentRoadTest.allCity[i]+'</a></li>');
				$('#cityList_3').append('<li class="current"><a href="javascript:;">'+IntelligentRoadTest.allCity[i]+'</a></li>');
				var distinctObj = IntelligentRoadTest.SelectDataChe[IntelligentRoadTest.city];
				//初始化该地市的区县下拉列表
				var $District = $('#district');
//				$District.html('<a href="javascript:;">区县</a>');
				$District.html('');
				distinctObj=null==distinctObj?{}:distinctObj;//防止distinctArr是‘undefined’时会报错
				var index = 0;
				for(var k in distinctObj){
					if(IntelligentRoadTest.isFirstSelectMkt){
						if(k==IntelligentRoadTest.country){
							$District.siblings(".select-name").children(".selectA").text(k);
							IntelligentRoadTest.initMarketbaseSelect(IntelligentRoadTest.city, k);
						}
					}else{
						if(index == 0){
							$District.siblings(".select-name").children(".selectA").text(k);
							IntelligentRoadTest.initMarketbaseSelect(IntelligentRoadTest.city, k);
						}
						
					}
					index++;
					
					
					$District.append('<a href="javascript:;">'+k+'</a>');
				}
			}
		}
	}
	
	$('.city-name').html(IntelligentRoadTest.city);
	$('.city-selected').html(IntelligentRoadTest.city);
	
	if(cityPermission_common=='全省'){
		$('#cityList_3_id').html('全省市');
		$('#cityList_3_div .city-selected').html('全省市');
	}
	
	// 城市列表点击事件 
	$(".city-list li").unbind( "click" ).bind("click",function () {
		$(this).addClass("current").siblings().removeClass("current");
		$(".select-name").removeClass("selectName");
		$(this).parents(".select-city").find(".city-name").text($(this).text()+"市");
		$(this).parents(".select-city").find(".city-selected").text($(this).text()+"市");
		$(this).parents(".city-info").hide();
		
		if($(this).parent('#cityList_3').length>0){
			IntelligentRoadTest.queryAllDTList();
		}
		
	});	
	
	$("#district > a").unbind( "click" ).bind("click",function () {
		$(this).addClass("selected").siblings().removeClass("selected");
		$(this).parent().siblings(".select-name").children(".selectA").text($(this).text());
		$(this).parent().hide();
		var city = $('#cityName').text();
		IntelligentRoadTest.initMarketbaseSelect(city, $(this).text());
	});
	
}

IntelligentRoadTest.qhCity = function IntelligentRoadTest_qhCity(cityStr){
	cityStr = cityStr.replace('市','');
	var distinctObj = IntelligentRoadTest.SelectDataChe[cityStr];
	// 切换地市时，初始化区县
	var $District = $('#district');
//	$District.html('<a href="javascript:;">区县</a>');
	$District.html('');
	distinctObj=null==distinctObj?{}:distinctObj;//防止distinctArr是‘undefined’时会报错
	var index = 0;
	for(var k in distinctObj){
		if(index == 0){
			$District.siblings(".select-name").children(".selectA").text(k);
			IntelligentRoadTest.initMarketbaseSelect(cityStr, k);
		}
		index++;
		$District.append('<a href="javascript:;">'+k+'</a>');
	}
	
	$("#district > a").unbind( "click" ).bind("click",function () {
		$(this).addClass("selected").siblings().removeClass("selected");
		$(this).parent().siblings(".select-name").children(".selectA").text($(this).text());
		$(this).parent().hide();
		var city = $('#cityName').text();
		IntelligentRoadTest.initMarketbaseSelect(city, $(this).text());
	});
}


IntelligentRoadTest.initMarketbaseSelect = function IntelligentRoadTest_initMarketbaseSelect(city,country){
	city = city.replace("市","");

	var districtObj=IntelligentRoadTest.SelectDataChe[city];
	var marketbaseArr=(null==districtObj || null==districtObj[country])?[]:districtObj[country];
	$('#regon').text('全部营服');
	var $mktcenter = $('#mktcenter');
	$mktcenter.html('<a href="javascript:;">全部营服</a>');
	
	for(var i=0;i<marketbaseArr.length;i++){
		var m = marketbaseArr[i];//{id:'',name:'',max_lng:'',max_lat:'',min_lng:'',min_lat:'',gis:''}
		$mktcenter.append('<a href="javascript:;">'+m.name+'</a>');
		if(!noceUtil.isUndefined(IntelligentRoadTest.mktcenter)&&m.name==IntelligentRoadTest.mktcenter){
			if(IntelligentRoadTest.isFirstSelectMkt){
				IntelligentRoadTest.isFirstSelectMkt = false;
				$('#regon').text(IntelligentRoadTest.mktcenter);
			}
		}
	}
	
	$("#mktcenter > a").unbind( "click" ).bind("click",function () {
		$(this).addClass("selected").siblings().removeClass("selected");
		$(this).parent().siblings(".select-name").children(".selectA").text($(this).text());
		$(this).parent().hide();
//		var city = $('#cityName').text();
//		var country = $('#areaName').text();
//		var mktcenter = $(this).text();
		
	});
}

IntelligentRoadTest.overlaycomplete = function IntelligentRoadTest_overlaycomplete(e){
	IntelligentRoadTest.myDrawingManagerObject.close();
    IntelligentRoadTest.map.enableScrollWheelZoom(); // 允许滚轮缩放
    IntelligentRoadTest.map.enableDragging();
	for(var i=0;i<IntelligentRoadTest.SelectionOverlayList.length;i++){
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.SelectionOverlayList[i]);
	}
	
	for(var i=0;i<IntelligentRoadTest.SelectionOverlayListM.length;i++){
		IntelligentRoadTest.mapMobile.removeOverlay(IntelligentRoadTest.SelectionOverlayListM[i]);
	}
	
	for(var i=0;i<IntelligentRoadTest.SelectionOverlayListU.length;i++){
		IntelligentRoadTest.mapUnicom.removeOverlay(IntelligentRoadTest.SelectionOverlayListU[i]);
	}
	
	IntelligentRoadTest.SelectionOverlayList = [];
	IntelligentRoadTest.SelectionOverlayListM = [];
	IntelligentRoadTest.SelectionOverlayListU = [];
//	e.overlay.type = "boxSelect";
	IntelligentRoadTest.SelectionOverlayList.push(e.overlay);
	
	var overlayPointArr=e.overlay.getPath();
	var endPoint = overlayPointArr[overlayPointArr.length-1];
	
	var styleOptions = {
	        strokeColor:"red",    //边线颜色。
	        //fillColor:"red",      //填充颜色
	        strokeWeight: 1,       //边线的宽度，以像素为单位。
	        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
	        fillOpacity: 0.3,      //填充的透明度，取值范围0 - 1。
	        strokeStyle: 'dashed' //边线的样式，solid或dashed。
	}
	var overlayM = new BMap.Polygon(overlayPointArr,styleOptions);
	var overlayU = new BMap.Polygon(overlayPointArr,styleOptions);
	IntelligentRoadTest.SelectionOverlayListM.push(overlayM);
	IntelligentRoadTest.SelectionOverlayListU.push(overlayU);
	IntelligentRoadTest.mapMobile.addOverlay(overlayM);
	IntelligentRoadTest.mapUnicom.addOverlay(overlayU);
	
	var myIcon = new BMap.Icon("../js/IntelligentRoadTest/images/save.png", new BMap.Size(72,34));
	IntelligentRoadTest.selectBoxMarker = new BMap.Marker(endPoint,{icon:myIcon,offset:new BMap.Size(-25,-15)});
	// IntelligentRoadTest.selectBoxMarker.areaOverlay = e.overlay;
	IntelligentRoadTest.selectBoxMarker.addEventListener("click",IntelligentRoadTest.areaMarkerClick);
	IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.selectBoxMarker);
    IntelligentRoadTest.selectBoxMarker.hide();
	
	var maxAndMinLngLat = IntelligentRoadTest.getMaxAndMinLatLng(overlayPointArr);//[maxLng , maxLat , minLng , minLat]

    var mid_lng = (maxAndMinLngLat[0]+maxAndMinLngLat[2])/2;
    var mid_lat = (maxAndMinLngLat[1]+maxAndMinLngLat[3])/2;
    var city_id = noceUtil.city_LATN_ID[IntelligentRoadTest.city];
    var listRecentCell = ["IntelligentRoadTest_19_ConcernAreaRecentCell","MIDLNG:"+mid_lng,"MIDLAT:"+mid_lat,"CITYID:"+city_id];
    var progressBarSqlsList=[];
    progressBarSqlsList.push(listRecentCell);
    var concernAreaList = [IntelligentRoadTest.concernAreaRecentCell];
    var concernAreaDataBase = [3];
    progressbarTwo.submitSql(progressBarSqlsList, concernAreaList,concernAreaDataBase,[IntelligentRoadTest.SelectionOverlayList],null,null,null,true);
//	var startGridNum = gridNum(maxAndMinLngLat[2],maxAndMinLngLat[3],20,100000);
//	var endGridNum = gridNum(maxAndMinLngLat[0],maxAndMinLngLat[1],20,100000);

	var minLngNum = gridLngNum(maxAndMinLngLat[2],20);
	var maxLngNum = gridLngNum(maxAndMinLngLat[0],20);
	var minLatNum = gridLatNum(maxAndMinLngLat[3],20);
	var maxLatNum = gridLatNum(maxAndMinLngLat[1],20);
	var keyprefix = IntelligentRoadTest.day+"_"+"20_0_";
	var len = 100000;
	var rowKeyArray = new Array();
	for(var i=minLngNum;i<=maxLngNum;i++){
		for(var j=minLatNum;j<=maxLatNum;j++){
			var rowkey = keyprefix + String(i*len+j);
			rowKeyArray.push(rowkey);
		}
	}
	var keyListStr = rowKeyArray.join(",");
	
//	var startRow = IntelligentRoadTest.day+"_"+"20_0_"+startGridNum;
//	var endRow = IntelligentRoadTest.day+"_"+"20_0_"+endGridNum;
//	var cloumnsList = "i:a1,i:a11,i:a12,i:a13,i:a14,i:a15,i:a16,i:a18,i:a22,i:a26,i:a27,i:a28";
//	var list = ["IntelligentRoadTest_06_grid","STARTROW:"+startRow,"ENDROW:"+endRow,"COLUMNLIST:"+cloumnsList];
	var cloumnsList = "i:a1,i:a11,i:a12,i:a13,i:a14,i:a15,i:a16,i:a18,i:a19,i:a22,i:a26,i:a27,i:a28,i:a29,i:a30,i:a31,i:a32,i:a33,i:a34,i:a35,i:a36,i:a37,i:a38";
	var list = ["IntelligentRoadTest_06_boxSelectGrid","KEYLIST:"+keyListStr,"COLUMNLIST:"+cloumnsList];
	var progressBarSqls=[];
	progressBarSqls.push(list);
	var functionlist = [IntelligentRoadTest.filterGridData];
	var dataBase = [4];
	progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase);
//	$('#BoxSelection').text('框选栅格');
	//图例全部呈现
	IntelligentRoadTest.initColorBarAll();
	
}
//框选区域最近小区
IntelligentRoadTest.concernAreaRecentCell = function IntelligentRoadTest_concernAreaRecentCell(data,overlayList){
    var result = callBackChangeData(data);
    if(overlayList.length>0&&result.length>0){
        overlayList[0].bst_id = result[0].base_statn_id;
        overlayList[0].cell_id = result[0].cell_id;
        overlayList[0].cell_name = result[0].cell_name;
    }
}
//过滤框选区域栅格
IntelligentRoadTest.filterGridData = function IntelligentRoadTest_filterGridData(data){
//	var result = callBackChangeData(data);
	var result = data.result;
	var polygonGridData = [];
	//将不在框选多边形内的栅格去掉
	for(var j=0;j<IntelligentRoadTest.SelectionOverlayList.length;j++){
		var avgSum = 0;
		var allSum = 0;
		var cnt = 0;
		var count = 0;
		var gridCount = 0;
		var grid_dx_count = 0;
		var grid_dx_sum = 0;
		var grid_dx_105_count = 0;
		var grid_yd_count = 0;
		var grid_yd_sum = 0;
		var grid_yd_105_count = 0;
		var grid_lt_count = 0;
		var grid_lt_sum = 0;
		var grid_lt_105_count = 0;
		var month_relate = null;
		for(var i=0;i<result.length;i++){
			var gridMidLng = result[i][3];// i:a1,i:a11,i:a12,i:a13,i:a14,i:a15,i:a16,i:a18,i:a19,i:a22,i:a26,i:a27,i:a28,i:a29,i:a30,i:a31,i:a32,i:a33,i:a34,i:a35,i:a36,i:a37,i:a38
			var gridMidLat = result[i][4];
			var point = new BMap.Point(gridMidLng,gridMidLat);
			if(BMapLib.GeoUtils.isPointInPolygon(point, IntelligentRoadTest.SelectionOverlayList[j])){
				polygonGridData.push(result[i]);
				count++;
				avgSum += parseFloat(result[i][11]); // rsrp_140_0_avg
				allSum += parseFloat(result[i][8]); // rsrp_140_0_cnt
				cnt += parseInt(result[i][9]); // rsrp_105_cnt
				gridCount += parseInt(result[i][12]); //Grid_Rec_Cnt
				//增加三网计算
				grid_dx_count += parseInt(result[i][13]==null?0:result[i][13]);
				grid_dx_105_count += parseInt(result[i][14]==null?0:result[i][14]);
				grid_dx_sum += parseFloat(result[i][15]==null?0:result[i][15]);
				grid_yd_count += parseInt(result[i][16]==null?0:result[i][16]);
				grid_yd_105_count += parseInt(result[i][17]==null?0:result[i][17]);
				grid_yd_sum += parseFloat(result[i][18]==null?0:result[i][18]);
				grid_lt_count += parseInt(result[i][19]==null?0:result[i][19]);
				grid_lt_105_count += parseInt(result[i][20]==null?0:result[i][20]);
				grid_lt_sum += parseFloat(result[i][21]==null?0:result[i][21]);
				if(result[i][22]!=null){//month_relate
					if(month_relate==null){
						month_relate = result[i][22];
					}else if(month_relate!=result[i][22]&&month_relate.indexOf(result[i][22])<0){
						month_relate = month_relate+"_"+result[i][22];
					}
					
				}
			}
		}
		var rsrpAvg = avgSum/count;
		var cover = cnt/allSum;
		var dx_rsrp = grid_dx_sum/grid_dx_count;
		var yd_rsrp = grid_yd_sum/grid_yd_count;
		var lt_rsrp = grid_lt_sum/grid_lt_count;
		var dx_cover = grid_dx_105_count/grid_dx_count;
		var yd_cover = grid_yd_105_count/grid_yd_count;
		var lt_cover = grid_lt_105_count/grid_lt_count;
		
		if(grid_dx_sum==0||grid_dx_count==0){
			dx_rsrp = null;
		}
		if(grid_yd_sum==0||grid_yd_count==0){
			yd_rsrp = null;
		}
		if(grid_lt_sum==0||grid_lt_count==0){
			lt_rsrp = null;
		}
		if(grid_dx_105_count==0||grid_dx_count==0){
			dx_cover = null;
		}
		if(grid_yd_105_count==0||grid_yd_count==0){
			yd_cover = null;
		}
		if(grid_lt_105_count==0||grid_lt_count==0){
			lt_cover = null;
		}
		
		if(count==0){
			rsrpAvg = null;
			cover = null;
			dx_rsrp = null;
			yd_rsrp = null;
			lt_rsrp = null;
			dx_cover = null;
			yd_cover = null;
			lt_cover = null;
		}
		
		IntelligentRoadTest.SelectionOverlayList[j].type = "boxSelect";
		IntelligentRoadTest.SelectionOverlayList[j].rsrpAvg = rsrpAvg;//parseFloat(rsrpAvg).toFixed(2);
		IntelligentRoadTest.SelectionOverlayList[j].cover = cover;//parseFloat(cover).toFixed(4);
		IntelligentRoadTest.SelectionOverlayList[j].count = count;
		
		IntelligentRoadTest.SelectionOverlayList[j].dx_rsrp = dx_rsrp;
		IntelligentRoadTest.SelectionOverlayList[j].yd_rsrp = yd_rsrp;
		IntelligentRoadTest.SelectionOverlayList[j].lt_rsrp = lt_rsrp;
		IntelligentRoadTest.SelectionOverlayList[j].dx_cover = dx_cover;
		IntelligentRoadTest.SelectionOverlayList[j].yd_cover = yd_cover;
		IntelligentRoadTest.SelectionOverlayList[j].lt_cover = lt_cover;
		IntelligentRoadTest.SelectionOverlayList[j].month_relate = month_relate;
		
		IntelligentRoadTest.SelectionOverlayList[j].gridCount = gridCount;
        // if(IntelligentRoadTest.selectBoxMarker!=null){
        //     IntelligentRoadTest.selectBoxMarker.areaOverlay = IntelligentRoadTest.SelectionOverlayList[j];
        // }
	}
	data.result = polygonGridData;
	
	IntelligentRoadTest.showGridByCanv(data);
	data = null;
    if(IntelligentRoadTest.selectBoxMarker!=null){
        IntelligentRoadTest.selectBoxMarker.show();
    }
}

IntelligentRoadTest.getMaxAndMinLatLng = function IntelligentRoadTest_getMaxAndMinLatLng(array){ //array是一组存放中百度地图的point对象的数组
    var resultArr = [];
    var maxLng = null;
    var maxLat = null;
    var minLng = null;
    var minLat = null;
    console.log(maxLng == null);
    if(array.length > 0){
        for(var i = 0; i < array.length; i++){
        	if(maxLng == null){
                maxLng = array[i].lng;
            }
            if(maxLat == null){
                maxLat = array[i].lat;
            }
            if(minLat == null){
                minLat = array[i].lat;
            }
            if(minLng == null){
                minLng = array[i].lng;
            }
            if(maxLat <  array[i].lat){
                maxLat = array[i].lat;
            }
            if(maxLng < array[i].lng){
                maxLng = array[i].lng;
            }
            if(minLat > array[i].lat){
                minLat = array[i].lat;
            }
            if(minLng > array[i].lng){
                minLng = array[i].lng;
            }
        }
        resultArr = [maxLng , maxLat , minLng , minLat];
    }
    return resultArr;
}


function sevenBefore(timeStr){
	var year = timeStr.substring(0,4);
	var month = parseInt(timeStr.substring(4,6))-1;
	var day = timeStr.substring(6);
	var time = new Date(year,month,day);
	var startTime = new Date(time.getTime()-6*24*60*60*1000);
	var startY = startTime.getFullYear();
	var startM = startTime.getMonth()+1;
	var startD = startTime.getDate();
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
	var startStr = startY+startM+startD;
//	console.log("7天前日期字符串:"+startStr);
	return startStr;
	
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
	IntelligentRoadTest.day = newDay;
	
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
//	$('#jobSeachTime').val(newDay);
//	$('#jobStartTime').val(time);
	var t1=getNewDate(newDay.substring(0,4)+"/"+newDay.substring(4,6)+"/"+newDay.substring(6,8),4);
	$('#jobSeachTime').val(t1);
	var t2=getNewDate(time.substring(0,4)+"/"+time.substring(4,6)+"/"+time.substring(6,8),4);
	$('#jobStartTime').val(t2);
	
	//隐藏连线
	for(var i=0;i<IntelligentRoadTest.gridSectorOverlay.length;i++){
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.gridSectorOverlay[i]);
	}
	//隐藏连线的扇区
	if(IntelligentRoadTest.sectorBMapUtil!=undefined&&IntelligentRoadTest.sectorBMapUtil!=null){
		IntelligentRoadTest.sectorBMapUtil.sectorHide();
	}
	
	
	//清除框选的多边形
//	for(var i=0;i<IntelligentRoadTest.SelectionOverlayList.length;i++){
//		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.SelectionOverlayList[i]);
//	}
//	IntelligentRoadTest.SelectionOverlayList =[];
	
//	IntelligentRoadTest.isShowGrid = false;//正在查看栅格，（进入到呈现栅格方法内）
//	IntelligentRoadTest.isShowDTGrid = false;//正在查看路测栅格,(进入到路测栅格数据回调方法内)
	
	//只有在查看弱区栅格或者扇区栅格时需要清除数据，路测栅格和描点不需要清除
	if(IntelligentRoadTest.isShowGrid&&!IntelligentRoadTest.isShowDTGrid){
		//清除栅格
//		IntelligentRoadTest.GridCanArr = [];
		
//		IntelligentRoadTest.GridCanArr = null;
		IntelligentRoadTest.GridCanArrT = null;
		IntelligentRoadTest.CanArr = null;
		
		IntelligentRoadTest.GridCanArrT = [];
		IntelligentRoadTest.CanArr = [];
		IntelligentRoadTest.GridMap.clear();
		
		IntelligentRoadTest.GridCanArrM = null;
		IntelligentRoadTest.GridCanArrM = [];
		IntelligentRoadTest.GridMapM.clear();
		
		IntelligentRoadTest.GridCanArrU = null;
		IntelligentRoadTest.GridCanArrU = [];
		IntelligentRoadTest.GridMapU.clear();
	}
	
	
	IntelligentRoadTest.loadmktCenterPolygonData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day);
	if(IntelligentRoadTest.tableDivState==1){
		IntelligentRoadTest.loadmktCenterAreaTableData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day,IntelligentRoadTest.doType);
		IntelligentRoadTest.loadJiZhanTableData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day);
		IntelligentRoadTest.loadAlarmInfoTableData($('#jobStartTime').val(),$('#jobSeachTime').val(),$('#alarmCityName').html().replace('市',''));
	}
	if(IntelligentRoadTest.concerningArea){
		IntelligentRoadTest.loadConcenrnAreaNewData(IntelligentRoadTest.concernPolygon);
	}
	
	if(IntelligentRoadTest.selectingBox){
		var overlayPointArr = null;
		if(IntelligentRoadTest.SelectionOverlayList.length==1){
			overlayPointArr = IntelligentRoadTest.SelectionOverlayList[0].getPath();
			var maxAndMinLngLat = IntelligentRoadTest.getMaxAndMinLatLng(overlayPointArr);//[maxLng , maxLat , minLng , minLat]
//			var startGridNum = gridNum(maxAndMinLngLat[2],maxAndMinLngLat[3],20,100000);
//			var endGridNum = gridNum(maxAndMinLngLat[0],maxAndMinLngLat[1],20,100000);

			var minLngNum = gridLngNum(maxAndMinLngLat[2],20);
			var maxLngNum = gridLngNum(maxAndMinLngLat[0],20);
			var minLatNum = gridLatNum(maxAndMinLngLat[3],20);
			var maxLatNum = gridLatNum(maxAndMinLngLat[1],20);
			var keyprefix = IntelligentRoadTest.day+"_"+"20_0_";
			var len = 100000;
			var rowKeyArray = new Array();
			for(var i=minLngNum;i<=maxLngNum;i++){
				for(var j=minLatNum;j<=maxLatNum;j++){
					var rowkey = keyprefix + String(i*len+j);
					rowKeyArray.push(rowkey);
				}
			}
			var keyListStr = rowKeyArray.join(",");
			
			var cloumnsList = "i:a1,i:a11,i:a12,i:a13,i:a14,i:a15,i:a16,i:a18,i:a19,i:a22,i:a26,i:a27,i:a28,i:a29,i:a30,i:a31,i:a32,i:a33,i:a34,i:a35,i:a36,i:a37,i:a38";
			var list = ["IntelligentRoadTest_06_boxSelectGrid","KEYLIST:"+keyListStr,"COLUMNLIST:"+cloumnsList];
			var progressBarSqls=[];
			progressBarSqls.push(list);
			var functionlist = [IntelligentRoadTest.filterGridData];
			var dataBase = [4];
			progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase);
			//图例全部呈现
			IntelligentRoadTest.initColorBarAll();
		}
		
	}
	
	
	//置空基站告警表格
	var alarmData = {columns:["day","base_statn_id","cell_id","factory","alarm_time","clear_time","alarm_level","isrecover","outofsrv","prob_cause"],result:[],type:[]}
	IntelligentRoadTest.showSectorAlarmTable(alarmData);
	//置空KPI表格
	var KPIData = {columns:["day","enodebid","cell_id","cell_name","erab_succ_rate","erab_drop_rate","rrccon_succrate","swchsf_succ_rate","swchaf_succ_rate","up_prb_userate","dw_prb_userate","counter0003","pdch_flow"],result:[],type:[]}
	IntelligentRoadTest.showSectorKPITable(KPIData);
	
	
//	IntelligentRoadTest.sectorCompent.sectorHide();
//	IntelligentRoadTest.sectorCompent.selectTime = IntelligentRoadTest.day;
////	IntelligentRoadTest.sectorCompent.selectTime = "20171011";
//	IntelligentRoadTest.sectorCompent.queryByTemplate();
//	$("#sector").attr("checked",false);
//	IntelligentRoadTest.sectorCompent.clear();
	if($('#sector').is(':checked')){
		IntelligentRoadTest.sectorCompent.selectTime = IntelligentRoadTest.day;
		IntelligentRoadTest.sectorCompent.queryByTemplate();
	}
	
//	IntelligentRoadTest.sectorCompentM.selectTime = IntelligentRoadTest.day;
//	IntelligentRoadTest.sectorCompentU.selectTime = IntelligentRoadTest.day;
	
//	IntelligentRoadTest.sectorCompentM.queryByTemplate();
//	IntelligentRoadTest.sectorCompentU.queryByTemplate();
	
}

/*******************************************************************************
 * @funcname doSubmitAndRemove
 * @funcdesc 执行提交操作并将地图的tilesloaded事件移除
 * @param null
 * @return null
 * @author 林楚佳
 * @create 20170503
 * @modifier
 * @modify
 ******************************************************************************/
function doSubmitAndRemove(){
	setTimeout(function(){
		uploadData.getChromeData();
		uploadData.doSubmit();
	},10000);
	IntelligentRoadTest.map.removeEventListener("tilesloaded",doSubmitAndRemove);
}

IntelligentRoadTest.initMap = function IntelligentRoadTest_initMap(){
	var point = null;
	if(IntelligentRoadTest.city=="全省"){
		point=BMapUtil.getCityLocation("广州");
	}else{
		point=BMapUtil.getCityLocation(IntelligentRoadTest.city);
	}
	
	IntelligentRoadTest.map = new BMap.Map("baiduMap", {enableMapClick : false,minZoom:10,maxZoom:18});          // 创建地图实例
	// map.centerAndZoom(IntelligentRoadTest.city,15);
	IntelligentRoadTest.map.centerAndZoom(point,18);
	IntelligentRoadTest.map.addEventListener("tilesloaded",doSubmitAndRemove);
	
	IntelligentRoadTest.map.enableScrollWheelZoom(); // 允许滚轮缩放
	IntelligentRoadTest.map.enableDragging();
	IntelligentRoadTest.map.disableDoubleClickZoom();
	IntelligentRoadTest.map.enableAutoResize();
	IntelligentRoadTest.map.disableInertialDragging();//禁用惯性拖拽
	IntelligentRoadTest.map.setMapStyle({style:IntelligentRoadTest.baimapStyle});
	
	//移动地图
	IntelligentRoadTest.mapMobile = new BMap.Map("mapMobile", {enableMapClick : false,minZoom:10,maxZoom:18});          // 创建地图实例
	// map.centerAndZoom(IntelligentRoadTest.city,15);
	IntelligentRoadTest.mapMobile.centerAndZoom(point,12);
//	IntelligentRoadTest.mapMobile.addEventListener("tilesloaded",doSubmitAndRemove);
	
//	IntelligentRoadTest.mapMobile.enableScrollWheelZoom(); // 允许滚轮缩放
	IntelligentRoadTest.mapMobile.disableDragging();// 禁止拖拽
	IntelligentRoadTest.mapMobile.disableDoubleClickZoom();
	IntelligentRoadTest.mapMobile.enableAutoResize();
	IntelligentRoadTest.mapMobile.setMapStyle({style:IntelligentRoadTest.baimapStyle});
	IntelligentRoadTest.mapMobile.addEventListener("resize", function(e){
//		$(window).resize();
		if(IntelligentRoadTest.isThreeNetStatus){
			IntelligentRoadTest.centerAndZoomTimeout = setTimeout("IntelligentRoadTest.timeoutCenterAndZoom();",200);
			IntelligentRoadTest.drawPolylineTimeout = setTimeout("IntelligentRoadTest.drawPolyline();",1000);
		}
	});
	
	
	
	
	//联通地图
	IntelligentRoadTest.mapUnicom = new BMap.Map("mapUnicom", {enableMapClick : false,minZoom:10,maxZoom:18});          // 创建地图实例
	IntelligentRoadTest.mapUnicom.centerAndZoom(point,12);
	
	IntelligentRoadTest.mapUnicom.disableDragging();// 禁止拖拽
	IntelligentRoadTest.mapUnicom.disableDoubleClickZoom();//不使用双击放大
	IntelligentRoadTest.mapUnicom.enableAutoResize();//地图自适应大小
	IntelligentRoadTest.mapUnicom.setMapStyle({style:IntelligentRoadTest.baimapStyle});
	
	
	IntelligentRoadTest.map.addEventListener('zoomend', IntelligentRoadTest.GridMapZoomEnd);
	IntelligentRoadTest.map.addEventListener('dragend', IntelligentRoadTest.GridMapZoomEnd);
	IntelligentRoadTest.map.addEventListener('moveend', IntelligentRoadTest.GridMapMoveEnd);
	IntelligentRoadTest.map.addEventListener("mousemove",IntelligentRoadTest.mousemoveEvent);
	IntelligentRoadTest.map.addEventListener('click', IntelligentRoadTest.MapClickEvent);
	
	var top_right_control = new BMap.ScaleControl(
			{
				anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
				offset:{width: 50, height: 50}
			});// 右下角，添加比例尺
	var top_right_navigation = new BMap.NavigationControl(
			{anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM,offset:{ width:0,height:30}}); //右下角，添加缩放控件

	IntelligentRoadTest.map.addControl(top_right_control);
	IntelligentRoadTest.map.addControl(top_right_navigation);
	
	var mapType2 = new myBMapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT});
//	var mapType2 = new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT,mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]});
	IntelligentRoadTest.map.addControl(mapType2);
	
	
	IntelligentRoadTest.localSearch = new BMap.LocalSearch("广东省", {
//		renderOptions:{map: IntelligentRoadTest.map},
		onSearchComplete:IntelligentRoadTest.localSearchSearchComplete
	});
	
	var bMapObj={
			map:IntelligentRoadTest.map,
			useSelectTimeQuerySector:true,
			isShowFactoryIcon:false,
			showHighStatn:false,
			sectorColor:"#9966CC",
			circleColor:"#9966CC",
			opacity:0.6,
//			selectTime:IntelligentRoadTest.day,
			selectCity:IntelligentRoadTest.city,
			ifShowLodingImage : true,
			senes:0,
//			selectDistrict:IntelligentRoadTest.country,
	};
	IntelligentRoadTest.sectorCompent = new SectorUtilForBaidu(bMapObj);
	//移动地图基站组件
	var bMapObjM={
			map:IntelligentRoadTest.mapMobile,
//			useSelectTimeQuerySector:true,
//			isShowFactoryIcon:false,
//			showHighStatn:false,
			sectorColor:"white",
			circleColor:"white",
			lineColor:"#FF9900",
			opacity:0.5,
//			selectTime:IntelligentRoadTest.day,
	};
	IntelligentRoadTest.sectorCompentM = new SectorUtilForBaidu(bMapObjM);
	//联通地图基站组件
	var bMapObjU={
			map:IntelligentRoadTest.mapUnicom,
//			useSelectTimeQuerySector:true,
//			isShowFactoryIcon:false,
//			showHighStatn:false,
			sectorColor:"white",
			circleColor:"white",
			lineColor:"#FF9900",
			opacity:0.5,
//			selectTime:IntelligentRoadTest.day,
	};
	IntelligentRoadTest.sectorCompentU = new SectorUtilForBaidu(bMapObjU);
	//栅格组件
	IntelligentRoadTest.GridMap = new GridMap(IntelligentRoadTest.map, {
        readTileData: null,//瓦片获取数据事件
        opacity: 0.8,//$('#opacity').val(),//透明度
        colorMode: 'range'//gradient:渐变的方式呈现颜色；range:按区间匹配颜色
    });
	IntelligentRoadTest.GridMap.setThresholds(IntelligentRoadTest.gridThresholds);
	
	//移动地图栅格组件
	IntelligentRoadTest.GridMapM = new GridMap(IntelligentRoadTest.mapMobile, {
        readTileData: null,//瓦片获取数据事件
        opacity: 0.8,//$('#opacity').val(),//透明度
        colorMode: 'range'//gradient:渐变的方式呈现颜色；range:按区间匹配颜色
    });
	IntelligentRoadTest.GridMapM.setThresholds(IntelligentRoadTest.gridThresholds);
	
	//联通地图栅格组件
	IntelligentRoadTest.GridMapU = new GridMap(IntelligentRoadTest.mapUnicom, {
        readTileData: null,//瓦片获取数据事件
        opacity: 0.8,//$('#opacity').val(),//透明度
        colorMode: 'range'//gradient:渐变的方式呈现颜色；range:按区间匹配颜色
    });
	IntelligentRoadTest.GridMapU.setThresholds(IntelligentRoadTest.gridThresholds);
	
//	IntelligentRoadTest.GridMapCircle = new GridMap(IntelligentRoadTest.map, {
//        readTileData: null,//瓦片获取数据事件
//        opacity: 0.8,//$('#opacity').val(),//透明度
//        colorMode: 'range'//gradient:渐变的方式呈现颜色；range:按区间匹配颜色
//    });
//	IntelligentRoadTest.GridMapCircle.setThresholds(IntelligentRoadTest.gridThresholds);
	
	
}

IntelligentRoadTest.GridMapZoomEnd = function IntelligentRoadTest_GridMapZoomEnd(e){
	var centerPoint = IntelligentRoadTest.map.getCenter();
	
	if(IntelligentRoadTest.isThreeNetStatus){
		var zoom = IntelligentRoadTest.map.getZoom();
		IntelligentRoadTest.mapMobile.setCenter(centerPoint);
		IntelligentRoadTest.mapMobile.setZoom(zoom);
		
		IntelligentRoadTest.mapUnicom.setCenter(centerPoint);
		IntelligentRoadTest.mapUnicom.setZoom(zoom);
		
		//聚焦框
		IntelligentRoadTest.drawPolylineTimeout = setTimeout("IntelligentRoadTest.drawPolyline();",100);
//		IntelligentRoadTest.drawPolyline();
	}
	
	
	//缩放时不会触发地图移动moveend事件，因此要做一个触发
	if(e.type=="onzoomend"){
		IntelligentRoadTest.GridMapMoveEnd(e);
	}
	
	
	
}

IntelligentRoadTest.GridMapMoveEnd = function IntelligentRoadTest_GridMapMoveEnd(e){
	
	if(IntelligentRoadTest.isThreeNetStatus){
		IntelligentRoadTest.sectorCompentM.clear();
		IntelligentRoadTest.sectorCompentM.draw();
		IntelligentRoadTest.sectorCompentU.clear();
		IntelligentRoadTest.sectorCompentU.draw();
	}
	
	var centerPoint = IntelligentRoadTest.map.getCenter();
	var district = IntelligentRoadTest.getCenterPointDistrict(centerPoint);
	if(district!=null){
		if(IntelligentRoadTest.cityPermission_common=="全省"){
			//地图拖拽完毕后，将搜索地市进行限制
			IntelligentRoadTest.localSearch.setLocation(district.city);
			
			if(district.city!=IntelligentRoadTest.city||district.name!=IntelligentRoadTest.country){
				IntelligentRoadTest.city = district.city;
				IntelligentRoadTest.country = district.name;
				IntelligentRoadTest.mktcenter = null;
				
				$('#cityList_1 > li').each(function(){
					$(this).children('a').each(function(){
						if($(this).text() == IntelligentRoadTest.city){
							$(this).click();
						}
					});
				});
				
				$('#district > a').each(function(){
					if($(this).text() == IntelligentRoadTest.country){
						$(this).click();
					}
				});
//				$('#submit').click();
				IntelligentRoadTest.loadmktCenterPolygonData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day);
//				IntelligentRoadTest.loadmktCenterAreaTableData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day,IntelligentRoadTest.doType);
			}
			if($('#sector').is(':checked')){
				if(IntelligentRoadTest.city!=IntelligentRoadTest.sectorCompent.selectCity
//						||IntelligentRoadTest.sectorCompent.selectDistrict!=IntelligentRoadTest.country
						){
					IntelligentRoadTest.sectorCompent.selectCity = district.city;
//					IntelligentRoadTest.sectorCompent.selectDistrict = district.name;
//					IntelligentRoadTest.sectorCompentM.selectCity = district.city;
//					IntelligentRoadTest.sectorCompentU.selectCity = district.city;
					if(IntelligentRoadTest.sectorCompent.selectTime==undefined||IntelligentRoadTest.sectorCompent.selectTime==null){
						IntelligentRoadTest.sectorCompent.selectTime = IntelligentRoadTest.day;
					}
					IntelligentRoadTest.sectorCompent.queryByTemplate();
//					IntelligentRoadTest.sectorCompentM.queryByTemplate();
//					IntelligentRoadTest.sectorCompentU.queryByTemplate();
				}else{
					IntelligentRoadTest.sectorCompent.clear();
					IntelligentRoadTest.sectorCompent.draw();
//					IntelligentRoadTest.sectorCompentM.draw();
//					IntelligentRoadTest.sectorCompentU.draw();
				}
			}
			
		}else{
			if(district.city == IntelligentRoadTest.cityPermission_common){
				//地图拖拽完毕后，将搜索地市进行限制
				IntelligentRoadTest.localSearch.setLocation(district.city);
				
				if(district.city!=IntelligentRoadTest.city||district.name!=IntelligentRoadTest.country){
					IntelligentRoadTest.city = district.city;
					IntelligentRoadTest.country = district.name;
					IntelligentRoadTest.mktcenter = null;
					
					$('#cityList_1 > li').each(function(){
						$(this).children('a').each(function(){
							if($(this).text() == IntelligentRoadTest.city){
								$(this).click();
							}
						});
					});
					
					$('#district > a').each(function(){
						if($(this).text() == IntelligentRoadTest.country){
							$(this).click();
						}
					});
//					$('#submit').click();
					IntelligentRoadTest.loadmktCenterPolygonData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day);
//					IntelligentRoadTest.loadmktCenterAreaTableData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day,IntelligentRoadTest.doType);
				}
				
				
//				if(IntelligentRoadTest.cityPermission_common == IntelligentRoadTest.sectorCompent.selectCity){
//					IntelligentRoadTest.sectorCompent.queryByTemplate();
//				}
				
				if($('#sector').is(':checked')){
					if(IntelligentRoadTest.city!=IntelligentRoadTest.sectorCompent.selectCity
//							||IntelligentRoadTest.sectorCompent.selectDistrict!=IntelligentRoadTest.country
							){
						IntelligentRoadTest.sectorCompent.selectCity = IntelligentRoadTest.city;
//						IntelligentRoadTest.sectorCompent.selectDistrict = IntelligentRoadTest.country;
						
						if(IntelligentRoadTest.sectorCompent.selectTime==undefined||IntelligentRoadTest.sectorCompent.selectTime==null){
							IntelligentRoadTest.sectorCompent.selectTime = IntelligentRoadTest.day;
						}
						IntelligentRoadTest.sectorCompent.queryByTemplate();
					}else{
						IntelligentRoadTest.sectorCompent.clear();
						IntelligentRoadTest.sectorCompent.draw();
					}
				}
				
				
			}
		}
		
	}
	
	//呈现的是栅格
	if(IntelligentRoadTest.isShowGrid){
		if(IntelligentRoadTest.isShowDTGrid){
			IntelligentRoadTest.GridMap.clear();
			var CTData = IntelligentRoadTest.CanArr;
			for(var j=0;j<IntelligentRoadTest.colorBarArr.length;j++){
				CTData = IntelligentRoadTest.ClearData(CTData,IntelligentRoadTest.colorBarArr[j]);
			}
			IntelligentRoadTest.GridMap.draw(CTData);
			CTData = null;
		}else{
			//三网时，还需要增加移动和联通的清除
			//增加移动联通地图栅格重绘
			if(IntelligentRoadTest.isThreeNetStatus){
				IntelligentRoadTest.GridMap.clear();
				IntelligentRoadTest.GridMapM.clear();
				IntelligentRoadTest.GridMapU.clear();
				var CTData = IntelligentRoadTest.GridCanArrT;
				var CMData = IntelligentRoadTest.GridCanArrM;
				var CUData = IntelligentRoadTest.GridCanArrU;
				for(var j=0;j<IntelligentRoadTest.colorBarArr.length;j++){
					CTData = IntelligentRoadTest.ClearData(CTData,IntelligentRoadTest.colorBarArr[j]);
					CMData = IntelligentRoadTest.ClearData(CMData,IntelligentRoadTest.colorBarArr[j]);
					CUData = IntelligentRoadTest.ClearData(CUData,IntelligentRoadTest.colorBarArr[j]);
				}
				IntelligentRoadTest.GridMap.draw(CTData);
				IntelligentRoadTest.GridMapM.draw(CMData);
				IntelligentRoadTest.GridMapU.draw(CUData);
				CTData = null;
				CMData = null;
				CUData = null;
			}else{
				IntelligentRoadTest.GridMap.clear();
				var CTData = IntelligentRoadTest.CanArr;
				for(var j=0;j<IntelligentRoadTest.colorBarArr.length;j++){
					CTData = IntelligentRoadTest.ClearData(CTData,IntelligentRoadTest.colorBarArr[j]);
				}
				IntelligentRoadTest.GridMap.draw(CTData);
				CTData = null;
			}
			
		}
		
	}else{
		IntelligentRoadTest.GridMap.clear();
		//呈现的是描点
		var DTData = IntelligentRoadTest.GridMapCircleData;
		for(var j=0;j<IntelligentRoadTest.colorBarArr.length;j++){
			DTData = IntelligentRoadTest.ClearDtData(DTData,IntelligentRoadTest.colorBarArr[j]);
		}
		IntelligentRoadTest.GridMap.drawCircle(DTData);
		DTData = null;
	}
	
	
	//三网时，还需要增加移动和联通地图的基站重绘
	if($('#sector').is(':checked')){
		//为了防止扇区在栅格下面，先画完栅格再画基站
		if(IntelligentRoadTest.sectorCompent!=null){
			IntelligentRoadTest.sectorCompent.MapZoomAndDragEnd(e,IntelligentRoadTest.sectorCompent);
		}
//		//增加移动联通地图基站重绘
//		if(IntelligentRoadTest.isThreeNetStatus){
//			if(IntelligentRoadTest.sectorCompentM!=null){
//				IntelligentRoadTest.sectorCompentM.MapZoomAndDragEnd(e,IntelligentRoadTest.sectorCompentM);
//			}
//			
//			if(IntelligentRoadTest.sectorCompentU!=null){
//				IntelligentRoadTest.sectorCompentU.MapZoomAndDragEnd(e,IntelligentRoadTest.sectorCompentU);
//			}
//		}
	}
}


IntelligentRoadTest.mousemoveEvent = function IntelligentRoadTest_mousemoveEvent(e){
	if(IntelligentRoadTest.bmapDistanceTool!=null&&IntelligentRoadTest.bmapDistanceTool!=undefined){
		if(IntelligentRoadTest.bmapDistanceTool.isUseTool){
			return;
		}
	}
	if(e.overlay!=null&&!IntelligentRoadTest.isGridTop){
		var poly = e.overlay;
		if(poly.type == "badPolygon"||poly.type == "badMarker"){
			$('#lblTip').html("");
			var x = e.pixel.x;
			var y = e.pixel.y;
			var infoStr = "";
			infoStr +="覆盖弱区"+poly.object_id+"<br/>";
			
			 if(IntelligentRoadTest.isThreeNetStatus){
//            	 infoStr +="关联月份："+result[0][11]+"<br>";
            	infoStr +=poly.month_relate+"三网RSRP均值对比"+"<br>";
            	infoStr +="&nbsp;&nbsp;&nbsp;&nbsp;电信："+(poly.dx_rsrp==null?null:parseFloat(poly.dx_rsrp).toFixed(2))+"<br>";
                infoStr +="&nbsp;&nbsp;&nbsp;&nbsp;移动："+(poly.yd_rsrp==null?null:parseFloat(poly.yd_rsrp).toFixed(2))+"<br>";
                infoStr +="&nbsp;&nbsp;&nbsp;&nbsp;联通："+(poly.lt_rsrp==null?null:parseFloat(poly.lt_rsrp).toFixed(2))+"<br>";
                infoStr +=poly.month_relate+"三网覆盖率对比"+"<br>";
                infoStr +="&nbsp;&nbsp;&nbsp;&nbsp;电信："+(poly.dx_cover==null?null:parseFloat(poly.dx_cover*100).toFixed(2)+"%")+"<br>";
                infoStr +="&nbsp;&nbsp;&nbsp;&nbsp;移动："+(poly.yd_cover==null?null:parseFloat(poly.yd_cover*100).toFixed(2)+"%")+"<br>";
                infoStr +="&nbsp;&nbsp;&nbsp;&nbsp;联通："+(poly.lt_cover==null?null:parseFloat(poly.lt_cover*100).toFixed(2)+"%")+"<br>";
               
            }else{
            	infoStr +="综合排名:"+poly.ranking_num+"/"+poly.total_length+"<br/>";
            	infoStr +="排名得分:"+parseFloat(poly.pc_orderno_tot).toFixed(1)+"<br/>";
    			infoStr +="中心经度:"+poly.longitude_mid_baidu+"<br/>";
    			infoStr +="中心纬度:"+poly.latitude_mid_baidu+"<br/>";
    			infoStr +="4G切3G次数:"+poly.lte_to_3g_tot+"<br/>";
    			infoStr +="4G用户数:"+poly.user_4g_avg+"<br/>";
    			infoStr +="4G流量(MB):"+parseInt(poly.flow_4g_tot)+"<br/>";
    			infoStr +="4G感知优良率:"+poly.ce_good_ratio_avg+"%<br/>";
    			infoStr +="弱区面积(平方米):"+poly.poor_grid_area+"<br/>";
    			infoStr +="处理建议:"+poly.do_type+"<br/>";
            }
			
//			console.log(info);
			$('#lblTip').html(infoStr);
		    $('#tip').css("left", x + 10 + "px").css("top", y + 15 + "px").show();
		    return;
		}else if(poly.type == "sectorLine"){
			$('#lblTip').html('');
			var x = e.pixel.x;
			var y = e.pixel.y;
			var info = "";
//			polyline.bstid = sector[0];
//			polyline.cellid = sector[1];
//			polyline.count = sector[2];
//			polyline.rsrpAvg = sector[3];
//			polyline.topNum = sector[4];
			info += "基站id："+poly.bstid+"<br>";
			info += "基站名称："+poly.bstname+"<br>";
			info += "小区id："+poly.cellid+"<br>";
			info += "小区名称："+poly.cellname+"<br>";
			info += "数量："+poly.count+"<br>";
			info += "rsrp均值："+parseFloat(poly.rsrpAvg).toFixed(2)+"<br>";
			info += "排名："+poly.topNum+"<br>";
			info += "距离:"+poly.distince+"米<br>";
			$('#lblTip').html(info);
		    $('#tip').css("left", x + 10 + "px").css("top", y + 15 + "px").show();
		    return;
		}else if(poly.type == "boxSelect"){
			$('#lblTip').html('');
			var x = e.pixel.x;
			var y = e.pixel.y;
			var info = "";
			info += "框选区域统计<br>";
			
			 if(IntelligentRoadTest.isThreeNetStatus){
//            	 infoStr +="关联月份："+result[0][11]+"<br>";
				info +=poly.month_relate+"三网RSRP均值对比"+"<br>";
				info +="&nbsp;&nbsp;&nbsp;&nbsp;电信："+(poly.dx_rsrp==null?null:parseFloat(poly.dx_rsrp).toFixed(2))+"<br>";
				info +="&nbsp;&nbsp;&nbsp;&nbsp;移动："+(poly.yd_rsrp==null?null:parseFloat(poly.yd_rsrp).toFixed(2))+"<br>";
				info +="&nbsp;&nbsp;&nbsp;&nbsp;联通："+(poly.lt_rsrp==null?null:parseFloat(poly.lt_rsrp).toFixed(2))+"<br>";
				info +=poly.month_relate+"三网覆盖率对比"+"<br>";
				info +="&nbsp;&nbsp;&nbsp;&nbsp;电信："+(poly.dx_cover==null?null:parseFloat(poly.dx_cover*100).toFixed(2)+"%")+"<br>";
				info +="&nbsp;&nbsp;&nbsp;&nbsp;移动："+(poly.yd_cover==null?null:parseFloat(poly.yd_cover*100).toFixed(2)+"%")+"<br>";
				info +="&nbsp;&nbsp;&nbsp;&nbsp;联通："+(poly.lt_cover==null?null:parseFloat(poly.lt_cover*100).toFixed(2)+"%")+"<br>";
            }else{
            	info += "rsrp均值:"+(poly.rsrpAvg==null?null:parseFloat(poly.rsrpAvg).toFixed(2))+"<br>";
    			info += "覆盖率:"+(poly.cover==null?null:parseFloat(poly.cover*100).toFixed(2)+"%")+"<br>";
    			info += "AGPS记录数:"+poly.gridCount+"<br>";
    			info += "栅格个数:"+poly.count+"<br>";
            }
			
			$('#lblTip').html(info);
		    $('#tip').css("left", x + 10 + "px").css("top", y + 15 + "px").show();
		    return;
		}else if(poly.type == "boxConcernSelect"){
			$('#lblTip').html('');
			var x = e.pixel.x;
			var y = e.pixel.y;
			var info = "";
			info += "区域名称:"+poly.area_name+"<br>";
			if(IntelligentRoadTest.isThreeNetStatus){
//           	 infoStr +="关联月份："+result[0][11]+"<br>";
				info +=poly.month_relate+"三网RSRP均值对比"+"<br>";
				info +="&nbsp;&nbsp;&nbsp;&nbsp;电信："+(poly.dx_rsrp==null?null:parseFloat(poly.dx_rsrp).toFixed(2))+"<br>";
				info +="&nbsp;&nbsp;&nbsp;&nbsp;移动："+(poly.yd_rsrp==null?null:parseFloat(poly.yd_rsrp).toFixed(2))+"<br>";
				info +="&nbsp;&nbsp;&nbsp;&nbsp;联通："+(poly.lt_rsrp==null?null:parseFloat(poly.lt_rsrp).toFixed(2))+"<br>";
				info +=poly.month_relate+"三网覆盖率对比"+"<br>";
				info +="&nbsp;&nbsp;&nbsp;&nbsp;电信："+(poly.dx_cover==null?null:parseFloat(poly.dx_cover*100).toFixed(2)+"%")+"<br>";
				info +="&nbsp;&nbsp;&nbsp;&nbsp;移动："+(poly.yd_cover==null?null:parseFloat(poly.yd_cover*100).toFixed(2)+"%")+"<br>";
				info +="&nbsp;&nbsp;&nbsp;&nbsp;联通："+(poly.lt_cover==null?null:parseFloat(poly.lt_cover*100).toFixed(2)+"%")+"<br>";
           }else{
				info += "rsrp均值:"+(poly.rsrpAvg==null?null:parseFloat(poly.rsrpAvg).toFixed(2))+"<br>";
				info += "覆盖率:"+(poly.cover==null?null:parseFloat(poly.cover*100).toFixed(2)+"%")+"<br>";
				info += "AGPS记录数:"+poly.gridCount+"<br>";
				info += "栅格个数:"+poly.count+"<br>";
           }
			
			$('#lblTip').html(info);
		    $('#tip').css("left", x + 10 + "px").css("top", y + 15 + "px").show();
		    return;
		}
		return;
	}else{
		$('#tip').hide();
	}
	
	var _self = this;
    var position = e.point;
    // var x = event.layerX;
    // var y = event.layerY;

    var x = e.offsetX;
    var y = e.offsetY;


    if (IntelligentRoadTest.lastPos == null) {
    	IntelligentRoadTest.lastPos = position;
    }
    else if (IntelligentRoadTest.lastPos.lng != position.lng && IntelligentRoadTest.lastPos.lat != position.lat) {
    	IntelligentRoadTest.lastPos = position;
    	 if (IntelligentRoadTest.lastMousemove != null) { clearTimeout(IntelligentRoadTest.lastMousemove); }
        $('#tip').hide();
//        return;
    }
    
    
    
    IntelligentRoadTest.lastMousemove = setTimeout(function () {
    	IntelligentRoadTest.getPosData(position, x, y, e);
    }, 300);

}


IntelligentRoadTest.getPosData = function IntelligentRoadTest_getPosData(position, x, y, e) {
	if (IntelligentRoadTest.lastPos.lng != position.lng && IntelligentRoadTest.lastPos.lat != position.lat) { 
		$('#lblTip').html("");
		$('#tip').hide();
		return;
	}

    var lng = position.lng;
    var lat = position.lat;
    
    //--从缓存数据中获取---
    
    if(IntelligentRoadTest.isShowGrid){
    	 //获取栅格对应的数据
        var result = $.grep(IntelligentRoadTest.CanArr, function (arr) {
            var minLng = arr[0];
            var minLat = arr[1];
            var maxLng = arr[2];
            var maxLat = arr[3];
            return (minLat <= e.point.lat && maxLat >= e.point.lat) && (minLng <= e.point.lng && maxLng >= e.point.lng);
        });
        if (result && result.length > 0) {
        	if(IntelligentRoadTest.isShowDTGrid){
//        		[lngAndLat[0],lngAndLat[1],lngAndLat[4],lngAndLat[5],rsrp_avg,gridNum,dtObject.dt_name];
        		var infoStr = "";
        		 infoStr +="栅格编号:"+result[0][5]+"<br>";
        		 infoStr +="路测名称:"+result[0][6]+"<br>";
        		 infoStr +="RSRP:"+result[0][4]+"<br>";
        		 $('#lblTip').html(infoStr);
                 $('#tip').css("left", x + 20 + "px").css("top", y + 25 + "px").show();
        	}else{
        		var infoStr = "";

//            	栅格
//            	栅格编号：
//            	AGPS记录数：
//            	RSRP：
//            	minLng,minLat,maxLng,maxLat,rsrp_avg,grid_num,agps_count,sector_set,dxrsrpAvg【8】,rsrp_avgM,rsrp_avgU,monthrelate,dx_cover,yd_cover,lt_cover
        		infoStr +="栅格编号："+result[0][5]+"<br>";
                
                if(IntelligentRoadTest.isThreeNetStatus){
//                	 infoStr +="关联月份："+result[0][11]+"<br>";
                	infoStr +=result[0][11]+"三网RSRP均值对比"+"<br>";
                	infoStr +="&nbsp;&nbsp;&nbsp;&nbsp;电信："+(result[0][8]==null?null:parseFloat(result[0][8]).toFixed(2))+"<br>";
                    infoStr +="&nbsp;&nbsp;&nbsp;&nbsp;移动："+(result[0][9]==null?null:parseFloat(result[0][9]).toFixed(2))+"<br>";
                    infoStr +="&nbsp;&nbsp;&nbsp;&nbsp;联通："+(result[0][10]==null?null:parseFloat(result[0][10]).toFixed(2))+"<br>";
                    infoStr +=result[0][11]+"三网覆盖率对比"+"<br>";
                    infoStr +="&nbsp;&nbsp;&nbsp;&nbsp;电信："+(result[0][12]==null?null:parseFloat(result[0][12]*100).toFixed(2)+"%")+"<br>";
                    infoStr +="&nbsp;&nbsp;&nbsp;&nbsp;移动："+(result[0][13]==null?null:parseFloat(result[0][13]*100).toFixed(2)+"%")+"<br>";
                    infoStr +="&nbsp;&nbsp;&nbsp;&nbsp;联通："+(result[0][14]==null?null:parseFloat(result[0][14]*100).toFixed(2)+"%")+"<br>";
                   
                }else{
                	infoStr +="AGPS记录数(周)："+result[0][6]+"<br>";
                    infoStr +="RSRP均值(周)："+parseFloat(result[0][4]).toFixed(2)+"<br>";
                }
                
                
                $('#lblTip').html(infoStr);
                $('#tip').css("left", x + 20 + "px").css("top", y + 25 + "px").show();
        	}
        	
            return;
        }
    }else{
    	//描点
    	var result = $.grep(IntelligentRoadTest.GridMapCircleDataArr, function (arr) {
            var lng = arr[0];
            var lat = arr[1];
            var circleCenter = IntelligentRoadTest.map.pointToPixel(new BMap.Point(lng,lat));
            var pointPixel = IntelligentRoadTest.map.pointToPixel(e.point);//鼠标所在的像素位置
            //判断两个点的距离是否在5像素内
            
            var distince = Math.sqrt((pointPixel.x-circleCenter.x)*(pointPixel.x-circleCenter.x)+(pointPixel.y-circleCenter.y)*(pointPixel.y-circleCenter.y));
            if(distince<=5){
            	return true;
            }
        });
    	if (result && result.length > 0) {
    		var infoStr = "";
    		//[lng,lat,dtObject.dt_name,rsrp];
    		for(var i=0;i<result.length;i++){
    			if(i>0){
    				infoStr+="<br>";
    			}
    			//路测名称、RSRP（描点显示RSRP，栅格显示RSRP均值）
    			infoStr +="路测名称:"+result[i][2]+"<br>";
//    			infoStr +="百度经度:"+result[i][0]+"<br>";
//    			infoStr +="百度纬度:"+result[i][1]+"<br>";
    			infoStr +="RSRP:"+result[i][3]+"<br>";
    			
    		}
    		$('#lblTip').html(infoStr);
            $('#tip').css("left", x + 10 + "px").css("top", y + 15 + "px").show();
            return;
//    		infoStr +="栅格编号："+result[0][4]+"<br>";
    	}
    }
    $('#tip').hide();
    return;
}

IntelligentRoadTest.MapClickEvent = function IntelligentRoadTest_MapClickEvent(e){
	if(e.overlay!=null&&!IntelligentRoadTest.isGridTop){
		return;
	}
	
	var position = e.point;
	
	var clickSector = [];
	if($('#sector').is(':checked')){
		if(IntelligentRoadTest.sectorCompent!=null){
			clickSector = IntelligentRoadTest.sectorCompent.MapClickEvent(e,IntelligentRoadTest.sectorCompent);
		}
//		clickSector = IntelligentRoadTest.sectorCompent.getSectorPolygonByPoint(position);
		if(clickSector.length>0){
			e.target = e.target==undefined?{}:e.target;
			e.target.point2 = clickSector[0];
			IntelligentRoadTest.sectorCompentClick(e);
			e = null;
			return;
		}
	}
	
	
	
	
	var lng = position.lng;
    var lat = position.lat;
    
    //--从缓存数据中获取---
  //获取栅格对应的数据
    var result = $.grep(IntelligentRoadTest.CanArr, function (arr) {
        var minLng = arr[0];
        var minLat = arr[1];
        var maxLng = arr[2];
        var maxLat = arr[3];
        return (minLat <= e.point.lat && maxLat >= e.point.lat) && (minLng <= e.point.lng && maxLng >= e.point.lng);
    });
    
    if (result && result.length > 0) {
    	if(IntelligentRoadTest.clickGrid == result[0][4]){
    		for(var i=0;i<IntelligentRoadTest.gridSectorOverlay.length;i++){
    			IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.gridSectorOverlay[i]);
    		}
    		IntelligentRoadTest.sectorBMapUtil.sectorHide();
    		IntelligentRoadTest.clickGrid = null;
    		IntelligentRoadTest.clickMarker = null;
    		return;
    	}
    	
    	IntelligentRoadTest.clickGrid = result[0][4];
//    	minLng,minLat,maxLng,maxLat
    	var gridLng = (parseFloat(result[0][0])+parseFloat(result[0][2]))/2;
    	var gridLat = (parseFloat(result[0][1])+parseFloat(result[0][3]))/2;
    	var gridCenter = new BMap.Point(gridLng,gridLat);
    	var sector_set = result[0][7];
    	if(sector_set==null||sector_set.indexOf(",")<0){
    		return;
    	}
    	
    	var sectorArr = sector_set.split("@");
    	var topStr = "";
    	for(var i=0;i<sectorArr.length;i++){
    		var sector = sectorArr[i].split(",");
    		var bstId = parseInt(sector[0]);
    		var cellId = parseInt(sector[1]);
    		var topid = bstId*1000000+cellId;
    		if(i!=sectorArr.length-1){
    			topStr+=String(topid)+",";
    		}else{
    			topStr+=String(topid);
    		}
    	}
    	
    	if(topStr!=""){
    		if(IntelligentRoadTest.sectorBMapUtil==undefined || IntelligentRoadTest.sectorBMapUtil == null){
    			var bMapObj={
        				map:IntelligentRoadTest.map,
        				useSelectTimeQuerySector:false,
        				isShowFactoryIcon:false,
        				showHighStatn:false,
        				sectorColor:"#9966CC",
        				circleColor:"#9966CC",
//        				sectorColor:"#00FFFF",
//        				circleColor:"#00FFFF",
        		};
    			IntelligentRoadTest.sectorBMapUtil = new sectorStation(bMapObj);
    		}
    		
    		var day = IntelligentRoadTest.day;
//    		day = "20171011";
    		var list = ["IntelligentRoadTest_15_mainSectorList","DAY:"+day,
    		            "BSTIDANDCELLID:"+topStr];
    		var progressBarSqls=[];
    		progressBarSqls.push(list);
    		var functionlist = [IntelligentRoadTest.showGridOrPolyfonSector];
    		var dataBase = [3];
    		progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase,[[gridCenter,sectorArr]]);
    	}
    	
    }else{
    	if(IntelligentRoadTest.sectorBMapUtil==undefined || IntelligentRoadTest.sectorBMapUtil == null){
    		return;
    	}
    	for(var i=0;i<IntelligentRoadTest.gridSectorOverlay.length;i++){
    		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.gridSectorOverlay[i]);
    	}
    	IntelligentRoadTest.sectorBMapUtil.sectorHide();
    	IntelligentRoadTest.clickGrid = null;
    	IntelligentRoadTest.clickMarker = null;
    }
    
}

IntelligentRoadTest.colorCheckBoxClick = function IntelligentRoadTest_colorCheckBoxClick(){
	if($('#color').is(':checked')){
		$('.colorBar-info').show();
	}else{
		$('.colorBar-info').hide();
	}
}

IntelligentRoadTest.sectorCheckBoxClick = function IntelligentRoadTest_sectorCheckBoxClick(){
	if($('#sector').is(':checked')){
		if(IntelligentRoadTest.sectorCompent.selectCity!=IntelligentRoadTest.city||
			IntelligentRoadTest.sectorCompent.selectTime!=IntelligentRoadTest.day
//			||
//			IntelligentRoadTest.sectorCompent.selectDistrict!=IntelligentRoadTest.country
			){
			
			IntelligentRoadTest.sectorCompent.selectCity = IntelligentRoadTest.city;
			IntelligentRoadTest.sectorCompent.selectTime = IntelligentRoadTest.day;
//			IntelligentRoadTest.sectorCompent.selectDistrict = IntelligentRoadTest.country;
			IntelligentRoadTest.sectorCompent.queryByTemplate();
		}else{
			IntelligentRoadTest.sectorCompent.clear();
			IntelligentRoadTest.sectorCompent.draw();
		}
//		IntelligentRoadTest.sectorCompent.selectCity = IntelligentRoadTest.city;
//			IntelligentRoadTest.sectorCompentM.selectCity = IntelligentRoadTest.city;
//			IntelligentRoadTest.sectorCompentU.selectCity = IntelligentRoadTest.city;
		
//			IntelligentRoadTest.sectorCompentM.queryByTemplate();
//			IntelligentRoadTest.sectorCompentU.queryByTemplate();
		
		
//		//增加移动联通地图基站重绘
//		if(IntelligentRoadTest.isThreeNetStatus){
//			if(IntelligentRoadTest.sectorCompentM!=null){
//				IntelligentRoadTest.sectorCompentM.draw();
//			}
//			
//			if(IntelligentRoadTest.sectorCompentU!=null){
//				IntelligentRoadTest.sectorCompentU.draw();
//			}
//		}
	}else{
		IntelligentRoadTest.sectorCompent.clear();
		
//		//增加移动联通地图基站重绘
//		if(IntelligentRoadTest.isThreeNetStatus){
//			if(IntelligentRoadTest.sectorCompentM!=null){
//				IntelligentRoadTest.sectorCompentM.clear();
//			}
//			
//			if(IntelligentRoadTest.sectorCompentU!=null){
//				IntelligentRoadTest.sectorCompentU.clear();
//			}
//		}
	}
}


/**********************************
 * @funcname IntelligentRoadTest.loadSelectData
 * @funcdesc 查询区县和营服下拉框的数据
 * @param {null}
 * @return {null}
 * @author 梁杰禹
 * @create 20170807
 * @modifier 梁杰禹
 * @modify 20170807
 ***********************************/
IntelligentRoadTest.loadSelectData = function(){
//	var list1 = ["Common_04_city_area_mkt_relation"];	
	var list1 = ["Common_04_city_area_mkt_NameAndId"];
	var progressBarSqls = [];	
	progressBarSqls.push(list1);
	var functionlist = [IntelligentRoadTest.initDistrictMarketbase];
	var database = [3];
//	progressbarTwo.submitSql(progressBarSqls, functionlist,database,null,null,null,null,true);
	progressbarTwo.submitSql(progressBarSqls, functionlist,database);
};

//处理区县和营服中心下拉框的数据
/**********************************
 * @funcname IntelligentRoadTest.initDistrictMarketbase
 * @funcdesc 处理区县和营服中心下拉框的数据，并加载全省的色块
 * @param {object} data 查询返回的数据
 * @return {null}
 * @author 梁杰禹
 * @create 20170807
 * @modifier 梁杰禹
 * @modify 20170807
 ***********************************/
IntelligentRoadTest.initDistrictMarketbase=function IntelligentRoadTest_initDistrictMarketbase (data){
	//数据结构为{"广州":{"天河":["棠下","上社"]}}
	var result = changeData(data);
	var city = "",district="",marketbase="";
	var districtArr = [];
	var districtObj = {};
	for(var i=0;i<result.length;i++){
		city = result[i].city_name;
		district=result[i].district_name;
		marketbase= {"id":result[i].mktcen_id,"name":result[i].mktcen_name,"max_lng":result[i].max_lng,"max_lat":result[i].max_lat,
		"min_lng":result[i].min_lng,"min_lat":result[i].min_lat,
		//"gis":result[i].gis_data_baidu
		};
		//{id:'',name:'',max_lng:'',max_lat:'',min_lng:'',min_lat:'',gis:''}
		if(null==IntelligentRoadTest.SelectDataChe[city]){//city缓存的数据为null
			districtObj = {};
			var marketbaseArr=[];
			marketbaseArr.push(marketbase);//营服中心数组
			districtObj[district]=marketbaseArr;//区县对象
			IntelligentRoadTest.SelectDataChe[city]=districtObj;//缓存区县营服中心数据
		}else{//city缓存的数据不为null
			districtObj=IntelligentRoadTest.SelectDataChe[city];//从缓存取该city的区县对象			
			if(null==districtObj[district]){//如果区县对象为空，定义营服中心数组并加值，否则给区县对象的营服中心数据加值	
				var marketbaseArr=[];
				marketbaseArr.push(marketbase);//营服中心数组
				districtObj[district]=marketbaseArr;
			}else{
				//marketbaseArr=districtObj[district];
				//marketbaseArr.push(marketbase);//营服中心数组
				districtObj[district].push(marketbase);
			}			
		}
	}
	
	IntelligentRoadTest.initAreaSelectList();
//	IntelligentRoadTest.initMarketPolygon();//将营服生成多边形，用于地图在拖拽后加载某营服的弱区和基站
	data = null;

}

//查询区县的轮廓数据
/***********************************************************
 * @funcname IntelligentRoadTest.loadDistrictJsonData
 * @funcdesc 查询区县的轮廓数据
 * @param {null}
 * @return {null}
 * @author 梁杰禹 
 * @create 20170911
 * @modifier 
 * @modify 
 ***********************************************************/
IntelligentRoadTest.loadDistrictJsonData = function IntelligentRoadTest_loadDistrictJsonData(){
	var list = ["Common_05_districtJson"];
	var progressBarSqls=[];
	progressBarSqls.push(list);
	var functionlist = [IntelligentRoadTest.handleDistrictJson];
	progressbarTwo.submitSql(progressBarSqls, functionlist ,[3]);
};
//处理区县的轮廓数据，并缓存
/***********************************************************
 * @funcname IntelligentRoadTest.handleDistrictJson
 * @funcdesc 处理区县的轮廓数据，并缓存
 * @param {array} data 查询返回的区县轮廓数据
 * @return {null}
 * @author 梁杰禹 
 * @create 20170911
 * @modifier 
 * @modify 
 ***********************************************************/
IntelligentRoadTest.handleDistrictJson = function IntelligentRoadTest_handleDistrictJson(data){
    /*start 质差分析链接过来，需要显示基站和定位扇区 搜索定位需要用到区县的轮廓数据start*/
    if(IntelligentRoadTest.badcellAnalysis){
        $('#sector').click();//渲染基站
        var bstid_cellid=IntelligentRoadTest.bstid+"_"+IntelligentRoadTest.cellid;
        $('#searchText').val(bstid_cellid);
        $("#searchButton").click();
    }
    /*end 质差分析链接过来，需要显示基站和定位扇区 end*/
	var result = callBackChangeData(data);
	var districtJson = {};
	var districtLngAndLat = {};
	//{"广州":{"天河":"","白云":"",...},...}
	var city_name = "";
	for(var i=0;i<result.length;i++){
		if(i==0){
			city_name = result[i].city_name;
			districtJson[city_name] = {};
			districtLngAndLat[city_name] = {};
		}
		if(city_name==result[i].city_name){
			districtJson[city_name][result[i].district_name] = result[i].gis_data_baidu;
			districtLngAndLat[city_name][result[i].district_name] = {};
			districtLngAndLat[city_name][result[i].district_name]["max_lng"] = result[i].baidu_max_longitude;
			districtLngAndLat[city_name][result[i].district_name]["min_lng"] = result[i].baidu_min_longitude;
			districtLngAndLat[city_name][result[i].district_name]["max_lat"] = result[i].baidu_maxlatitude;
			districtLngAndLat[city_name][result[i].district_name]["min_lat"] = result[i].baidu_minlatitude;
			districtLngAndLat[city_name][result[i].district_name]["id"] = result[i].district_id;
		}else{
			city_name = result[i].city_name;
			districtJson[city_name] = {};
			districtJson[city_name][result[i].district_name] = result[i].gis_data_baidu;
			
			districtLngAndLat[city_name] = {};
			districtLngAndLat[city_name][result[i].district_name] = {};
			districtLngAndLat[city_name][result[i].district_name]["max_lng"] = result[i].baidu_max_longitude;
			districtLngAndLat[city_name][result[i].district_name]["min_lng"] = result[i].baidu_min_longitude;
			districtLngAndLat[city_name][result[i].district_name]["max_lat"] = result[i].baidu_maxlatitude;
			districtLngAndLat[city_name][result[i].district_name]["min_lat"] = result[i].baidu_minlatitude;
			districtLngAndLat[city_name][result[i].district_name]["id"] = result[i].district_id;
		}
		
	}
	IntelligentRoadTest.districtJson = districtJson;
	//{"广州":{"天河":{"max_lng":"","min_lng":"","max_lat":"","min_lat":"","id":""}},......}
	IntelligentRoadTest.districtLngAndLat = districtLngAndLat;
	
	IntelligentRoadTest.initDistrictPolygon();//将区县生成多边形，用于地图在拖拽后加载某营服的弱区和基站
	data = null;
}


IntelligentRoadTest.loadmktCenterPolygonData = function IntelligentRoadTest_loadmktCenterPolygonData(city,country,mktcenter,day){
	var list = ["IntelligentRoadTest_08_polygonGis","DAY:"+day,"CITY:"+city,"COUNTRY:"+country];
	if(mktcenter == null){
		list.push("MKTCENTER:");
	}else{
		list.push("MKTCENTER:"+"and MKTCENTER = '"+mktcenter+"'");
	}
	var progressBarSqls=[];
	progressBarSqls.push(list);
	var functionlist = [IntelligentRoadTest.showmktCenterPolygon];
	progressbarTwo.submitSql(progressBarSqls, functionlist ,[3]);
}

IntelligentRoadTest.loadmktCenterAreaTableData = function IntelligentRoadTest_loadmktCenterAreaTableData(city,country,mktcenter,day,do_type,b){
	//缓存的查询参数  如果参数一样则不进行查询
	if($('#areaTable .scrollDiv').height()==0||$('#areaTable .scrollDiv').width()==0){}else
	if(IntelligentRoadTest.parameter_3==(city+country+mktcenter+day+do_type+IntelligentRoadTest.object_id)){
		return;
	}
//	$(".tableDiv").eq(0).show();
	IntelligentRoadTest.parameter_3=city+country+mktcenter+day+do_type+IntelligentRoadTest.object_id;
	if(do_type==null||do_type==undefined||do_type==0){
		do_type="";
	}else{
		do_type="and DO_TYPE="+do_type;
	}
	
	var list = ["IntelligentRoadTest_09_areaTable","DAY:"+day,"CITY:"+city,"COUNTRY:"+country,"DO_TYPE:"+do_type];
	if(mktcenter == null||mktcenter ==''||mktcenter == undefined){
		list.push("MKTCENTER:");
	}else{
		list.push("MKTCENTER:"+"and MKTCENTER = '"+mktcenter+"'");
	}
	
	var clnObj={
    		clnCssArray:[
    		             {clnNum:1,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:8,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:12,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:16,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:17,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:19,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:21,clnCss:["cln",["clickShowModal"]]}
    		             ],
    		functionArray:[{funCln:8,funtion:"IntelligentRoadTest.sectorPositioning();",funType:1},
    		               {funCln:1,funtion:"IntelligentRoadTest.areaPositioning();",funType:1},
    		               {funCln:12,funtion:"IntelligentRoadTest.alarmPositioning();",funType:1},
    		               {funCln:16,funtion:"IntelligentRoadTest.alarmInfoPositioning();",funType:1},
    		               {funCln:17,funtion:"IntelligentRoadTest.KPIPositioning();",funType:1},
    		               {funCln:19,funtion:"IntelligentRoadTest.KPIPositioning();",funType:1},
    		               {funCln:21,funtion:"IntelligentRoadTest.KPIPositioning();",funType:1}
    		               ],
    		subArray:[{clnNum:11,value:0,title:IntelligentRoadTest.TOPSectorInfo},
    		          {clnNum:10,value:0,title:IntelligentRoadTest.recentSectorInfo}
    		          ]
    };
	var tableHead = "弱区编号,地市,区县,营服中心,最近站址," +
			"最近基站ID,最近小区ID,最近小区名,最近小区状态,最近TOP5小区集,MR数最大TOP5小区集,退服告警数,退服告警小区数,未恢复退服告警小区数," +
			"建议处理措施,是否派单,4G切3G总次数,4G切3G总次数排名,4G总流量(MB),4G流量排名,4G用户数,4G用户数排名,感知优良率(%),感知优良率排名,"+
	"弱栅格数,弱栅格数排名,弱栅格面积(㎡),栅格总面积(㎡),中心点经度,中心点纬度,中心点区域归属ID,"+
	"GIS经纬度集,最终排名累计";
//	var tableHead = "日期,弱区id,最近站名,最近站址,最近基站ID,曾发生退服告警总次数,曾发生退服告警小区数," +
//	"未恢复退服告警小区数,弱覆盖处理措施,地市名称,地市ID,区县,区县ID,营服中心,营服中心ID,,4G切3G总次数,4G切3G总次数在本地网内排名," +
//	",4G总流量,本地网内4G流量排名,,感知优良率按天平均值(%),本地网内感知优良率排名,,,4G用户数按天平均值,本地网内4G用户数排名,最终排名累计值," +
//	"栅格最小经度,栅格最小纬度,栅格中心经度,栅格中心纬度,栅格最大经度,栅格最大纬度,中心点区域归属ID,主服务小区集合,GIS经纬度集合";
	var fixObj={
			fixRow:1,
			fixClnObj:{
				fixCln:2,
				tableId:'fixreaTableId'
			}
		};
	var tableObject={
			divId:"areaTable",
			tableId:"areaTableId",
			tableHead:tableHead,
//			Data:data,
			clnObj:clnObj,
			fixObj:fixObj,
			dataType:3,
			sql:list,
			sortFlag:1,
			sortObj:{sortColumn:"day",sortType:"asc"},
			pageObj:{pageFlag:0}
			,scrollObj:{clnNums:[1],clnValues:[IntelligentRoadTest.object_id]}
	    	};
	IntelligentRoadTest.areaTable = new TableToolsNewTwo();
	IntelligentRoadTest.areaTable.tableObject = tableObject;
	IntelligentRoadTest.areaTable.submit(tableObject);
	
	IntelligentRoadTest.areaTableIsEnd = setTimeout(IntelligentRoadTest.AreaTableTimeout,300);
	
//	var progressBarSqls=[];
//	progressBarSqls.push(list);
//	var functionlist = [IntelligentRoadTest.showmktCenterAreaTable];
//	progressbarTwo.submitSql(progressBarSqls, functionlist ,[3]);
}

IntelligentRoadTest.showmktCenterAreaTable = function IntelligentRoadTest_showmktCenterAreaTable(data){
//	IntelligentRoadTest.alarmTable 
	var clnObj={
    		clnCssArray:[{clnNum:2,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:3,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:4,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:5,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:6,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:7,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:8,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:16,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:18,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:20,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:22,clnCss:["cln",["clickShowModal"]]}],
    		functionArray:[{funCln:2,funtion:"IntelligentRoadTest.areaPositioning();",funType:1},
    		               {funCln:3,funtion:"IntelligentRoadTest.sectorPositioning();",funType:1},
    		               {funCln:4,funtion:"IntelligentRoadTest.sectorPositioning();",funType:1},
    		               {funCln:5,funtion:"IntelligentRoadTest.sectorPositioning();",funType:1},
    		               {funCln:6,funtion:"IntelligentRoadTest.alarmPositioning();",funType:1},
    		               {funCln:7,funtion:"IntelligentRoadTest.alarmPositioning();",funType:1},
    		               {funCln:8,funtion:"IntelligentRoadTest.alarmPositioning();",funType:1},
    		               {funCln:16,funtion:"IntelligentRoadTest.KPIPositioning();",funType:1},
    		               {funCln:18,funtion:"IntelligentRoadTest.KPIPositioning();",funType:1},
    		               {funCln:20,funtion:"IntelligentRoadTest.KPIPositioning();",funType:1},
    		               {funCln:22,funtion:"IntelligentRoadTest.KPIPositioning();",funType:1},
    		               ]
    };
	var tableHead = "日期,弱区id,最近站名,最近站址,最近基站ID,曾发生退服告警总次数,曾发生退服告警小区数," +
			"未恢复退服告警小区数,弱覆盖处理措施,地市名称,地市ID,区县,区县ID,营服中心,营服中心ID,4G切3G总次数,4G切3G总次数在本地网内排名," +
			"4G总流量,本地网内4G流量排名,感知优良率按天平均值(%),本地网内感知优良率排名,4G用户数按天平均值,本地网内4G用户数排名,最终排名累计值," +
			"栅格最小经度,栅格最小纬度,栅格中心经度,栅格中心纬度,栅格最大经度,栅格最大纬度,中心点区域归属ID,主服务小区集合,GIS经纬度集合";
	var fixObj={
			fixRow:1,
		};
	var tableObject={
			divId:"areaTable",
			tableId:"areaTableId",
			tableHead:tableHead,
			Data:data,
			clnObj:clnObj,
			fixObj:fixObj
	    	};
	IntelligentRoadTest.areaTable = new TableToolsNewTwo();
	IntelligentRoadTest.areaTable.tableObject = tableObject;
	IntelligentRoadTest.areaTable.submit(tableObject);
	
	IntelligentRoadTest.areaTableIsEnd = setTimeout(IntelligentRoadTest.AreaTableTimeout,300);
}

IntelligentRoadTest.TOPSectorInfo = function IntelligentRoadTest_TOPSectorInfo(mrtopSectorStr){
//	console.log(topSectorStr);
	//基站号,小区号,数量,平均RSRP,按数量排序序号
	var topSectorArr = mrtopSectorStr.split("@");
	var info = "";
	for(var i=0;i<topSectorArr.length;i++){
		var sect = topSectorArr[i].split(",");
		info += "基站id:"+sect[0]+",小区id:"+sect[1]+
		",数量:"+sect[2]+",平均RSRP:"+sect[3]+",数量排序序号:"+sect[4];
		if(i<topSectorArr.length-1){
			info += "\n";
		}
	}
	if(topSectorArr.length>1){
		return info;
	}else{
		return mrtopSectorStr;
	}
	
}

IntelligentRoadTest.recentSectorInfo = function IntelligentRoadTest_recentSectorInfo(recentSectorStr){
//	console.log(topSectorStr);
	//基站号,小区号,距离，数量,平均RSRP
	var topSectorArr = recentSectorStr.split("@");
	var info = "";
	for(var i=0;i<topSectorArr.length;i++){
		var sect = topSectorArr[i].split(",");
		info += "基站号:"+sect[0]+",小区号:"+sect[1]+
		",距离:"+sect[2]+",数量:"+sect[3]+",平均RSRP:"+sect[4];
		if(i<topSectorArr.length-1){
			info += "\n";
		}
	}
	if(topSectorArr.length>1){
		return info;
	}else{
		return recentSectorStr;
	}
	
}


//根据弱区进行定位
IntelligentRoadTest.areaPositioning = function IntelligentRoadTest_positioning(data){
//	console.log(data);
	var point = new BMap.Point(data.longitude_mid_baidu,data.latitude_mid_baidu);
	IntelligentRoadTest.map.setCenter(point);
	IntelligentRoadTest.map.setZoom(18);
	
	if(IntelligentRoadTest.isThreeNetStatus){
		IntelligentRoadTest.mapMobile.setCenter(point);
		IntelligentRoadTest.mapMobile.setZoom(18);
		
		IntelligentRoadTest.mapUnicom.setCenter(point);
		IntelligentRoadTest.mapUnicom.setZoom(18);
		
		IntelligentRoadTest.drawPolylineTimeout = setTimeout("IntelligentRoadTest.drawPolyline();", 200);
	}
	
	
	if(IntelligentRoadTest.positioningMarker!=null){
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.positioningMarker);
	}
	var myIcon = new BMap.Icon("../js/IntelligentRoadTest/images/mapPositioning.png", new BMap.Size(23,23));
//	IntelligentRoadTest.positioningMarker = new BMap.Marker(point,{icon:myIcon});
//	IntelligentRoadTest.positioningMarker.setZIndex(-1);
//	IntelligentRoadTest.positioningMarker.setOffset(new BMap.Size(0,-15));
//	IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.positioningMarker);
	
	for(var i=0;i<IntelligentRoadTest.badPolygonMarkerArr.length;i++){
		if(data.object_id==IntelligentRoadTest.badPolygonMarkerArr[i].object_id){
			//将当前点击的标记点换位定位标记点
			var markerImg = IntelligentRoadTest.badPolygonMarkerArr[i].getIcon();
			if(markerImg.imageUrl.indexOf("polygonCenter.png")>=0){
				markerImg.setImageUrl("../js/IntelligentRoadTest/images/mapPositioning.png");
				markerImg.setSize(new BMap.Size(23,23));
				IntelligentRoadTest.badPolygonMarkerArr[i].setIcon(markerImg);
			}
//			markerImg = null;
		}else{
			//将不是当前标记点，但是图标是定位图标的，换回弱区图标
			var markerImg = IntelligentRoadTest.badPolygonMarkerArr[i].getIcon();
			if(markerImg.imageUrl.indexOf("mapPositioning.png")>=0){
				markerImg.setImageUrl("../js/IntelligentRoadTest/images/polygonCenter.png");
				markerImg.setSize(new BMap.Size(23,32));
				IntelligentRoadTest.badPolygonMarkerArr[i].setIcon(markerImg);
			}
//			markerImg = null;
		}
	}
	
	
	
	var startTime = $('#weekStartTime').text();
	var endTime = IntelligentRoadTest.day;
	var sectorArr = data.sector_set.split("@");
	IntelligentRoadTest.loadAreaAlarmAndKPIData(startTime,endTime,sectorArr);
	IntelligentRoadTest.sectorArr=sectorArr;
	IntelligentRoadTest.type=1;
	IntelligentRoadTest.object_id = data.object_id;
	
}

//根据基站小区进行定位
IntelligentRoadTest.sectorPositioning = function IntelligentRoadTest_positioning(data){
	
	//查询告警数据并切换到告警tab
	var startTime = $('#weekStartTime').text();
	var endTime = IntelligentRoadTest.day;
	var sector_set = data.sector_set;
	var sectorArr = sector_set.split("@");
	IntelligentRoadTest.loadAreaAlarmAndKPIData(startTime,endTime,sectorArr);
	IntelligentRoadTest.sectorArr=sectorArr;
	IntelligentRoadTest.type=1;
	if(data.object_id!=undefined){
		IntelligentRoadTest.object_id = data.object_id;
	}
	var listBST = [];
	var bstid = data.enodeb_id;
	if(data.cell_id==''||data.cell_id==null){
		//根据基站定位
		listBST = ["IntelligentRoadTest_16_bstSearchByID","BSTID:"+bstid,"DAY:"+IntelligentRoadTest.day];
	}else{
		//根据小区定位
		listBST = ["IntelligentRoadTest_17_cellPositioning","BSTID:"+bstid,"CELLID:"+data.cell_id,"DAY:"+IntelligentRoadTest.day];
	}
	
//	var listBST = ["IntelligentRoadTest_16_bstSearchByID","BSTID:"+bstid,"DAY:"+IntelligentRoadTest.day];
	var progressBarSqls=[];
	progressBarSqls.push(listBST);
	var functionlist = [IntelligentRoadTest.bstSearchData];
	var dataBase = [3];
	progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase);
	
	for(var i=0;i<IntelligentRoadTest.badPolygonMarkerArr.length;i++){
		//将不是当前标记点，但是图标是定位图标的，换回弱区图标
		var markerImg = IntelligentRoadTest.badPolygonMarkerArr[i].getIcon();
		if(markerImg.imageUrl.indexOf("mapPositioning.png")>=0){
			markerImg.setImageUrl("../js/IntelligentRoadTest/images/polygonCenter.png");
			markerImg.setSize(new BMap.Size(23,32));
			IntelligentRoadTest.badPolygonMarkerArr[i].setIcon(markerImg);
		}
//		markerImg = null;
	}
	
	
//	IntelligentRoadTest.object_id = data.object_id;
}
//点击告警指标切换到告警表格（如果不是当前存储的弱区，则进行查询）
IntelligentRoadTest.alarmPositioning = function IntelligentRoadTest_alarmPositioning(data){
		//查询告警数据并切换到告警tab
		var startTime = $('#weekStartTime').text();
		var endTime = IntelligentRoadTest.day;
		var sector_set = data.sector_set;
		var sectorArr = sector_set.split("@");
		IntelligentRoadTest.loadAreaAlarmAndKPIData(startTime,endTime,sectorArr);
		IntelligentRoadTest.sectorArr=sectorArr;
    	IntelligentRoadTest.type=1;
		if(data.object_id!=undefined){
			IntelligentRoadTest.object_id = data.object_id;
		}
	//直接切换到告警tab
	$(".tabUl li").each(function(){
		var id = $(this).find('a').attr('id');
		if(id=="alarmT"){
			$(this).click();
		}
	});
	
}

//点击KPI指标切换到KPI表格（如果不是当前存储的弱区，则进行查询）
IntelligentRoadTest.KPIPositioning = function IntelligentRoadTest_KPIPositioning(data){
		//查询告警数据并切换到告警tab
		var startTime = $('#weekStartTime').text();
		var endTime = IntelligentRoadTest.day;
		var sector_set = data.sector_set;
		var sectorArr = sector_set.split("@");
		IntelligentRoadTest.loadAreaAlarmAndKPIData(startTime,endTime,sectorArr);
		IntelligentRoadTest.sectorArr=sectorArr;
    	IntelligentRoadTest.type=1;
		if(data.object_id!=undefined){
			IntelligentRoadTest.object_id = data.object_id;
		}
	//直接切换到告警tab
	$(".tabUl li").each(function(){
		var id = $(this).find('a').attr('id');
		if(id=="kpiT"){
			$(this).click();
		}
	});
	
}


//查询告警和KPI指标数据
//["基站号,小区号,数量,平均RSRP,按数量排序序号",""]
IntelligentRoadTest.loadAreaAlarmAndKPIData = function IntelligentRoadTest_loadAreaAlarmAndKPIData(startTime,endTime,sectorArr){
	//缓存的查询参数  如果参数一样则不进行查询
	if(IntelligentRoadTest.parameter_5==(startTime+endTime+sectorArr)){
		return;
	}
	IntelligentRoadTest.parameter_5=startTime+endTime+sectorArr;
	var topStr = "";
	var bstStr = "";
	for(var i=0;i<sectorArr.length;i++){//基站号,小区号,数量,平均RSRP,按数量排序序号
		var sector = sectorArr[i].split(",");
		var bstId = parseInt(sector[0]);
		var cellId = parseInt(sector[1]);
		var topid = bstId*1000000+cellId;
		if(i!=sectorArr.length-1){
			topStr += String(topid)+",";
			bstStr += String(bstId)+",";
		}else{
			topStr += String(topid);
			bstStr += String(bstId);
		}
	}
	
	if(topStr==""){
		topStr = "''";
	}
	
	if(bstStr==""){
		bstStr = "''";
	}
	
	var list = ["IntelligentRoadTest_12_polygonAlarmTable","STARTDAY:"+startTime,"ENDDAY:"+endTime,
	            "BSTIDANDCELLID:"+topStr,"BSTID:"+bstStr];
	var list1 = ["IntelligentRoadTest_14_polygonKPITable","STARTDAY:"+startTime,"ENDDAY:"+endTime,
	             "BSTIDANDCELLID:"+topStr];
	//告警表格构造
	var alarmTableHead = "日期,基站ID,小区ID,厂家,接收告警时间,告警时间,告警恢复时间,告警级别,是否恢复,是否断站退服,告警内容,告警范围";
	var alarmFixObj={
			fixRow:1,
		};
	var clnObj = {
			clnCssArray:[{clnNum:5,clnCss:["range",["tmp.substring(0,10).replace(/\-/g,'')>"+endTime,"alarmTableRed_font"]
			                              ]},
                      {clnNum:7,clnCss:["range",["tmp.substring(0,10).replace(/\-/g,'')>"+endTime,"alarmTableRed_font"]
                      ]},
			            ],
//			subNotArray:[5,6,7]
            subArray:[{clnNum:5,value:1},
              		  {clnNum:6,value:1},
              		  {clnNum:7,value:1}]

	};
	var alarmTableObject={
		divId:"alarmTable",
		tableId:"alarmTableId",
		tableHead:alarmTableHead,
		fixObj:alarmFixObj,
		clnObj:clnObj,
		dataType:3,
		sql:list,
		sortFlag:1,
		sortObj:{sortColumn:"day",sortType:"asc"},
		pageObj:{pageFlag:0},
	};
	//KPI表格构造
	var KPITableHead = "日期,基站id,扇区id,扇区名称,E-RAB建立成功率(%),E-RAB掉线率(%),RRC建立成功率(%),同频切换成功率(%),异频切换成功率(%),上行prb利用率(%),下行prb利用率(%),最大rrc连接用户数,PDCP层流量(MB)";
	var KPIFixObj={
			fixRow:1,
		};
	var KPITableObject={
		divId:"KPITable",
		tableId:"KPITableId",
		tableHead:KPITableHead,
		fixObj:KPIFixObj,
		dataType:3,
		sql:list1,
		sortFlag:1,
		sortObj:{sortColumn:"day",sortType:"asc"},
		pageObj:{pageFlag:0},
	};
	
	IntelligentRoadTest.alarmTable = new TableToolsNewTwo();
	IntelligentRoadTest.alarmTable.tableObject = alarmTableObject;
	IntelligentRoadTest.alarmTable.submit(alarmTableObject);
	
	IntelligentRoadTest.KPITable = new TableToolsNewTwo();
	IntelligentRoadTest.KPITable.tableObject = KPITableObject;
	IntelligentRoadTest.KPITable.submit(KPITableObject);
	
	IntelligentRoadTest.alarmTableIsEnd = setTimeout(IntelligentRoadTest.alarmTableTimeout,300);
	IntelligentRoadTest.KPITableIsEnd = setTimeout(IntelligentRoadTest.KPITableTimeout,300);
	
	
//	var progressBarSqls=[];
//	progressBarSqls.push(list);
//	progressBarSqls.push(list1);
//	var functionlist = [IntelligentRoadTest.showSectorAlarmTable,IntelligentRoadTest.showSectorKPITable];
//	var dataBase = [3,3];
//	progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase);
}
//展示多边形top基站告警数据
IntelligentRoadTest.showSectorAlarmTable = function IntelligentRoadTest_showSectorAlarmTable(data){
	var tableHead = "日期,基站ID,小区ID,厂家,告警时间,告警恢复时间,告警级别,是否恢复,是否断站退服,告警内容";
	var fixObj={
			fixRow:1,
		};
	var clnObj = {
//			subNotArray:[5,6]
	subArray:[{clnNum:5,value:1},
      		  {clnNum:6,value:1}]
	
	};
	var tableObject={
		divId:"alarmTable",
		tableId:"alarmTableId",
		tableHead:tableHead,
		Data:data,
		clnObj:clnObj,
		fixObj:fixObj
		};
	IntelligentRoadTest.alarmTable = new TableToolsNewTwo();
	IntelligentRoadTest.alarmTable.tableObject = tableObject;
	IntelligentRoadTest.alarmTable.submit(tableObject);
	
	IntelligentRoadTest.alarmTableIsEnd = setTimeout(IntelligentRoadTest.alarmTableTimeout,300);
	
}
//展示多边形top基站KPI数据
IntelligentRoadTest.showSectorKPITable = function IntelligentRoadTest_showSectorKPITable(data){
	var tableHead = "日期,基站id,扇区id,扇区名称,E-RAB建立成功率(%),E-RAB掉线率(%),RRC建立成功率(%),同频切换成功率(%),异频切换成功率(%),上行prb利用率(%),下行prb利用率(%),最大rrc连接用户数,PDCP层流量(MB)";
	var fixObj={
			fixRow:1,
		};
	var tableObject={
		divId:"KPITable",
		tableId:"KPITableId",
		tableHead:tableHead,
		Data:data,
//		clnObj:clnObj
		fixObj:fixObj,
		};
	IntelligentRoadTest.KPITable = new TableToolsNewTwo();
	IntelligentRoadTest.KPITable.tableObject = tableObject;
	IntelligentRoadTest.KPITable.submit(tableObject);
	
	IntelligentRoadTest.KPITableIsEnd = setTimeout(IntelligentRoadTest.KPITableTimeout,300);
}

//营服弱区多边形呈现
IntelligentRoadTest.showmktCenterPolygon =function IntelligentRoadTest_showmktCenterPolygon(data){
	var result = callBackChangeData(data);
	data= null;
	for(var i=0;i<IntelligentRoadTest.badPolygonArr.length;i++){
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.badPolygonArr[i]);
	}
	
	for(var i=0;i<IntelligentRoadTest.badPolygonMarkerArr.length;i++){
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.badPolygonMarkerArr[i]);
	}

//	for(var i=0;i<IntelligentRoadTest.badPolygonArrM.length;i++){
//		IntelligentRoadTest.mapMobile.removeOverlay(IntelligentRoadTest.badPolygonArrM[i]);
//	}
	
	for(var i=0;i<IntelligentRoadTest.badPolygonMarkerArrM.length;i++){
		IntelligentRoadTest.mapMobile.removeOverlay(IntelligentRoadTest.badPolygonMarkerArrM[i]);
	}
	
//	for(var i=0;i<IntelligentRoadTest.badPolygonArrU.length;i++){
//		IntelligentRoadTest.mapUnicom.removeOverlay(IntelligentRoadTest.badPolygonArrU[i]);
//	}
	
	for(var i=0;i<IntelligentRoadTest.badPolygonMarkerArrU.length;i++){
		IntelligentRoadTest.mapUnicom.removeOverlay(IntelligentRoadTest.badPolygonMarkerArrU[i]);
	}
	
	IntelligentRoadTest.badPolygonArr = null;
	IntelligentRoadTest.badPolygonMarkerArr = null;
	
	IntelligentRoadTest.badPolygonArr = [];
	IntelligentRoadTest.badPolygonMarkerArr = [];
	
	var badPolygonArrM = [];
	
	IntelligentRoadTest.badPolygonMarkerArrM = null;
	
	IntelligentRoadTest.badPolygonArrU = null;
	IntelligentRoadTest.badPolygonMarkerArrU = null;
	
	IntelligentRoadTest.badPolygonMarkerArrM = [];
	
	IntelligentRoadTest.badPolygonArrU = [];
	IntelligentRoadTest.badPolygonMarkerArrU = [];
	for(var i=0;i<result.length;i++){
		var object_id = result[i].object_id;
		var pc_orderno_tot = result[i].pc_orderno_tot;
		var longitude_mid_baidu = result[i].longitude_mid_baidu;
		var latitude_mid_baidu = result[i].latitude_mid_baidu;
		var lte_to_3g_tot = result[i].lte_to_3g_tot;
		var user_4g_avg = result[i].user_4g_avg;
		var flow_4g_tot = result[i].flow_4g_tot;
		var ce_good_ratio_avg = result[i].ce_good_ratio_avg;
		var do_type = result[i].do_type;
		var sector_set = result[i].sector_set;
		var enodeb_id = result[i].enodeb_id;
		var cell_id = result[i].cell_id;
		var enodebname = result[i].enodebname;
		var gis_data = result[i].gis_data;
		var gisPointArr = gis_data.split("@");
		var pointArr = [];
		for(var j=0;j<gisPointArr.length;j++){
			var gisPoint = gisPointArr[j].split(",");
			var point = new BMap.Point(gisPoint[0],gisPoint[1]);
			pointArr.push(point);
		}
		
		var ply = new BMap.Polygon(pointArr, {strokeWeight: 1.5, strokeColor: "#FF9900",fillOpacity:0.1}); //建立多边形覆盖物
//		var plyM = new BMap.Polygon(pointArr, {strokeWeight: 1, strokeColor: "blue",fillOpacity:0.2}); //建立多边形覆盖物
//		var plyU = new BMap.Polygon(pointArr, {strokeWeight: 1, strokeColor: "blue",fillOpacity:0.2}); //建立多边形覆盖物
		
		ply.object_id = result[i].object_id;
		ply.pc_orderno_tot = result[i].pc_orderno_tot;
		ply.longitude_mid_baidu = result[i].longitude_mid_baidu;
		ply.latitude_mid_baidu = result[i].latitude_mid_baidu;
		ply.lte_to_3g_tot = result[i].lte_to_3g_tot;
		ply.user_4g_avg = result[i].user_4g_avg;
		ply.flow_4g_tot = result[i].flow_4g_tot;
		ply.ce_good_ratio_avg = result[i].ce_good_ratio_avg;
		ply.do_type = result[i].do_type;
		ply.sector_set = result[i].sector_set;
		ply.city_id = result[i].city_id;
		ply.country_id = result[i].country_id;
		ply.mktcenter_id = result[i].mktcenter_id;
		ply.enodeb_id = result[i].enodeb_id;
		ply.cell_id = result[i].cell_id;
		ply.enodebname = result[i].enodebname;
		ply.poor_grid_area = result[i].poor_grid_area;
		ply.dx_rsrp = result[i].dx_rsrp;
		ply.dx_cover = result[i].dx_cover;
		ply.yd_rsrp = result[i].yd_rsrp;
		ply.yd_cover = result[i].yd_cover;
		ply.lt_rsrp = result[i].lt_rsrp;
		ply.lt_cover = result[i].lt_cover;
		ply.month_relate = result[i].month_relate;
		ply.total_length = result.length;
		ply.ranking_num = i+1;
		ply.type = "badPolygon";
		
		var polyPoint = new BMap.Point(longitude_mid_baidu,latitude_mid_baidu);
		var myIcon = new BMap.Icon("../js/IntelligentRoadTest/images/polygonCenter.png", new BMap.Size(23,32));
		var myIconM = new BMap.Icon("../js/IntelligentRoadTest/images/polygonCenter.png", new BMap.Size(23,32));
		var myIconU = new BMap.Icon("../js/IntelligentRoadTest/images/polygonCenter.png", new BMap.Size(23,32));
		var polyMarker = new BMap.Marker(polyPoint,{icon:myIcon});
		var polyMarkerM = new BMap.Marker(polyPoint,{icon:myIconM});
		var polyMarkerU = new BMap.Marker(polyPoint,{icon:myIconU});
		polyMarker.setZIndex(1);
		polyMarker.setOffset(new BMap.Size(0,-15));
		polyMarkerM.setOffset(new BMap.Size(0,-15));
		polyMarkerU.setOffset(new BMap.Size(0,-15));
		
		polyMarker.object_id = result[i].object_id;
		polyMarker.sector_set = result[i].sector_set;
		
		polyMarker.pc_orderno_tot = result[i].pc_orderno_tot;
		polyMarker.longitude_mid_baidu = result[i].longitude_mid_baidu;
		polyMarker.latitude_mid_baidu = result[i].latitude_mid_baidu;
		polyMarker.lte_to_3g_tot = result[i].lte_to_3g_tot;
		polyMarker.user_4g_avg = result[i].user_4g_avg;
		polyMarker.flow_4g_tot = result[i].flow_4g_tot;
		polyMarker.ce_good_ratio_avg = result[i].ce_good_ratio_avg;
		polyMarker.do_type = result[i].do_type;
		polyMarker.city_id = result[i].city_id;
		polyMarker.country_id = result[i].country_id;
		polyMarker.mktcenter_id = result[i].mktcenter_id;
		polyMarker.enodeb_id = result[i].enodeb_id;
		polyMarker.cell_id = result[i].cell_id;
		polyMarker.enodebname = result[i].enodebname;
		polyMarker.poor_grid_area = result[i].poor_grid_area;
		polyMarker.dx_rsrp = result[i].dx_rsrp;
		polyMarker.dx_cover = result[i].dx_cover;
		polyMarker.yd_rsrp = result[i].yd_rsrp;
		polyMarker.yd_cover = result[i].yd_cover;
		polyMarker.lt_rsrp = result[i].lt_rsrp;
		polyMarker.lt_cover = result[i].lt_cover;
		polyMarker.month_relate = result[i].month_relate;
		polyMarker.total_length = result.length;
		polyMarker.ranking_num = i+1;
		polyMarker.type = "badMarker";
		
		
		
		if(object_id==IntelligentRoadTest.object_id){
			if(IntelligentRoadTest.isFirstLoad){
				if(IntelligentRoadTest.isPositioningSector){
					//根据最近小区定位
					var listBST = ["IntelligentRoadTest_17_cellPositioning","BSTID:"+result[i].enodeb_id,"CELLID:"+result[i].cell_id,"DAY:"+IntelligentRoadTest.day];
					var progressBarSqls=[];
					progressBarSqls.push(listBST);
					var functionlist = [IntelligentRoadTest.bstSearchData];
					var dataBase = [3];
					progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase);
					IntelligentRoadTest.isPositioningSector = false;
				}else{
//					ply.setFillOpacity(0.2);
					IntelligentRoadTest.map.setCenter(polyPoint);
					IntelligentRoadTest.map.setZoom(18);
					
					if(IntelligentRoadTest.positioningMarker!=null){
						IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.positioningMarker);
					}
					
					var myIcon = new BMap.Icon("../js/IntelligentRoadTest/images/mapPositioning.png", new BMap.Size(23,23));
					polyMarker.setIcon(myIcon);
					
					IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.positioningMarker);
				}
				//加载该弱区的栅格
				var city_id= result[i].city_id;
				var country_id = result[i].country_id;
				var object_id = result[i].object_id;
				
				var startRow = IntelligentRoadTest.day+"_"+"20_2_"+city_id+"_"+country_id+"_"+object_id+"_";
				var endRow = IntelligentRoadTest.day+"_"+"20_2_"+city_id+"_"+country_id+"_"+object_id+"_~";
				var cloumnsList = "i:a1,i:a11,i:a12,i:a13,i:a14,i:a15,i:a16,i:a18,i:a19,i:a22,i:a26,i:a27,i:a28,i:a29,i:a30,i:a31,i:a32,i:a33,i:a34,i:a35,i:a36,i:a37,i:a38";
				var list = ["IntelligentRoadTest_06_grid","STARTROW:"+startRow,"ENDROW:"+endRow,"COLUMNLIST:"+cloumnsList];
	    		var progressBarSqls=[];
	    		progressBarSqls.push(list);
	    		var functionlist = [IntelligentRoadTest.showGridByCanv];
	    		var dataBase = [4];
	    		progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase);
				
				var startTime = $('#weekStartTime').text();
				var endTime = IntelligentRoadTest.day;
//				IntelligentRoadTest.loadSectorCellAlarmAndKPIData(startTime,endTime,enodeb_id,null);
				//查询基站级告警和小区级
				var sectorSet = result[i].sector_set;
				var sectorArr = sectorSet.split("@");
//				IntelligentRoadTest.loadAreaAlarmAndKPIData(startTime,endTime,sectorArr)
				IntelligentRoadTest.sectorArr=sectorArr;
		    	IntelligentRoadTest.type=1;
				IntelligentRoadTest.isFirstLoad = false;
				
			}
		}
		
		
		ply.addEventListener("click",function(e){
			//多边形点击，显示该多边形内的栅格
//			var ply = this;
			if(IntelligentRoadTest.isGridTop){
				return;
			}
//			this.setFillOpacity(0.2);
			
			for(var i=0;i<IntelligentRoadTest.badPolygonArr.length;i++){
				if(IntelligentRoadTest.badPolygonArr[i].object_id==IntelligentRoadTest.object_id){
//					IntelligentRoadTest.badPolygonArr[i].setFillOpacity(0.6);
				}
				
			}
			
			var city_id= this.city_id;
			var country_id = this.country_id;
			var object_id = this.object_id;
			IntelligentRoadTest.object_id = object_id;
			// IntelligentRoadTest.hideSelectionBox();
			// IntelligentRoadTest.hideConcernArea();
			for(var i=0;i<IntelligentRoadTest.gridSectorOverlay.length;i++){
    			IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.gridSectorOverlay[i]);
    		}
			if(IntelligentRoadTest.sectorBMapUtil!=undefined || IntelligentRoadTest.sectorBMapUtil != null){
				IntelligentRoadTest.sectorBMapUtil.sectorHide();
			}
    		
			
			var startRow = IntelligentRoadTest.day+"_"+"20_2_"+city_id+"_"+country_id+"_"+object_id+"_";
			var endRow = IntelligentRoadTest.day+"_"+"20_2_"+city_id+"_"+country_id+"_"+object_id+"_~";
			var cloumnsList = "i:a1,i:a11,i:a12,i:a13,i:a14,i:a15,i:a16,i:a18,i:a19,i:a22,i:a26,i:a27,i:a28,i:a29,i:a30,i:a31,i:a32,i:a33,i:a34,i:a35,i:a36,i:a37,i:a38";
			var list = ["IntelligentRoadTest_06_grid","STARTROW:"+startRow,"ENDROW:"+endRow,"COLUMNLIST:"+cloumnsList];
    		var progressBarSqls=[];
    		progressBarSqls.push(list);
    		var functionlist = [IntelligentRoadTest.showGridByCanv];
    		var dataBase = [4];
    		progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase);
    		
    		//表格切换
			$('#tab_1').click();
			IntelligentRoadTest.loadPolygonAreaTableData(IntelligentRoadTest.city,IntelligentRoadTest.country,endTime,e.target.object_id);
		});
		
		polyMarker.addEventListener("click",function(e){
			//标记点点击，显示top扇区
//			var ply = this;
			if(IntelligentRoadTest.isGridTop){
				return;
			}
			//直接切换到区域列表
//        	$(".tabUl li").each(function(){
//        		var id = $(this).find('a').attr('id');
//        		if(id=="areaT"){
//        			$(this).click();
//        		}
//        	});
			var gridCenter = e.target.point;
			// IntelligentRoadTest.hideSelectionBox();
			// IntelligentRoadTest.hideConcernArea();
			if(IntelligentRoadTest.clickMarker!=e.target.object_id){
				IntelligentRoadTest.clickGrid = null;
				IntelligentRoadTest.clickMarker =  e.target.object_id;
				
				var sector_set = this.sector_set;
				var sectorArr = sector_set.split("@");
		    	var topStr = "";
		    	var bstStr = "";
		    	for(var i=0;i<sectorArr.length;i++){
		    		var sector = sectorArr[i].split(",");
		    		var bstId = parseInt(sector[0]);
		    		var cellId = parseInt(sector[1]);
		    		var topid = bstId*1000000+cellId;
		    		if(i!=sectorArr.length-1){
		    			topStr+=String(topid)+",";
		    			bstStr += String(bstId)+","
		    		}else{
		    			topStr+=String(topid);
		    			bstStr += String(bstId);
		    		}
		    	}
		    	if(topStr!=""){
		    		//top扇区连线查询
		    		if(IntelligentRoadTest.sectorBMapUtil==undefined || IntelligentRoadTest.sectorBMapUtil == null){
		    			var bMapObj={
		        				map:IntelligentRoadTest.map,
		        				useSelectTimeQuerySector:false,
		        				isShowFactoryIcon:false,
		        				showHighStatn:false,
		        				sectorColor:"#9966CC",
		        				circleColor:"#9966CC",
//		        				sectorColor:"#00FFFF",
//		        				circleColor:"#00FFFF",
		        		};
//		        		bMapUtil=new sectorStation(bMapObj,["click"],[OpersComp.sectorClick]);
//		    			IntelligentRoadTest.sectorBMapUtil = new sectorStation(bMapObj,["click"],[OpersComp.mainSectorClick]);
		    			IntelligentRoadTest.sectorBMapUtil = new sectorStation(bMapObj);
		    		}
		    		var day = IntelligentRoadTest.day;
//		    		day = "20171011";
		    		var list = ["IntelligentRoadTest_15_mainSectorList","DAY:"+day,
		    		            "BSTIDANDCELLID:"+topStr];
		    		var progressBarSqls=[];
		    		progressBarSqls.push(list);
		    		var functionlist = [IntelligentRoadTest.showGridOrPolyfonSector];
		    		var dataBase = [3];
		    		progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase,[[gridCenter,sectorArr]]);
		    	}
		    	
		    	var startTime = $('#weekStartTime').text();
		    	var endTime = IntelligentRoadTest.day;
//		    	var sectorArr = data.sector_set.split("@");
		    	if(IntelligentRoadTest.tableDivState==1){
		    	IntelligentRoadTest.loadAreaAlarmAndKPIData(startTime,endTime,sectorArr);
		    	}
		    	IntelligentRoadTest.sectorArr=sectorArr;
		    	IntelligentRoadTest.type=1;
		    	IntelligentRoadTest.object_id = e.target.object_id;
		    	//表格切换
				$('#tab_1').click();
		    	IntelligentRoadTest.loadPolygonAreaTableData(IntelligentRoadTest.city,IntelligentRoadTest.country,endTime,e.target.object_id);
		    	IntelligentRoadTest.concerningArea = false;
		    	
			}else{
				for(var i=0;i<IntelligentRoadTest.gridSectorOverlay.length;i++){
	    			IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.gridSectorOverlay[i]);
	    		}
	    		IntelligentRoadTest.sectorBMapUtil.sectorHide();
	    		IntelligentRoadTest.clickMarker = null;
	    		IntelligentRoadTest.clickGrid = null;
	    		return;
			}
			
		});
		
		IntelligentRoadTest.badPolygonArr.push(ply);
		IntelligentRoadTest.badPolygonMarkerArr.push(polyMarker);
		IntelligentRoadTest.map.addOverlay(ply);
		IntelligentRoadTest.map.addOverlay(polyMarker);
		
		var plyM = {type:2,points:pointArr,decide:1};
		badPolygonArrM.push(plyM);
		IntelligentRoadTest.badPolygonMarkerArrM.push(polyMarkerM);
		
//		IntelligentRoadTest.badPolygonArrU.push(plyU);
		IntelligentRoadTest.badPolygonMarkerArrU.push(polyMarkerU);
		
		if(IntelligentRoadTest.isThreeNetStatus){
//			IntelligentRoadTest.mapMobile.addOverlay(plyM);
			IntelligentRoadTest.mapMobile.addOverlay(polyMarkerM);
//			IntelligentRoadTest.mapUnicom.addOverlay(plyU);
			IntelligentRoadTest.mapUnicom.addOverlay(polyMarkerU);
		}
		
	}
	
	IntelligentRoadTest.sectorCompentM.polygonCanvasArr = badPolygonArrM;
	IntelligentRoadTest.sectorCompentU.polygonCanvasArr = badPolygonArrM;
	if(IntelligentRoadTest.isThreeNetStatus){
		IntelligentRoadTest.sectorCompentM.draw();
		IntelligentRoadTest.sectorCompentU.draw();
	}
	
}


IntelligentRoadTest.loadPolygonAreaTableData = function IntelligentRoadTest_loadPolygonAreaTableData(city,country,day,object_id){
//	var list = ["IntelligentRoadTest_10_polygonTable","DAY:"+day,"CITY:"+city,"COUNTRY:"+country,"OBJECTID:"+object_id];
//	
//	var clnObj={
//    		clnCssArray:[{clnNum:2,clnCss:["cln",["clickShowModal"]]},
//    		             {clnNum:3,clnCss:["cln",["clickShowModal"]]},
//    		             {clnNum:4,clnCss:["cln",["clickShowModal"]]},
//    		             {clnNum:5,clnCss:["cln",["clickShowModal"]]},
//    		             {clnNum:6,clnCss:["cln",["clickShowModal"]]},
//    		             {clnNum:7,clnCss:["cln",["clickShowModal"]]},
//    		             {clnNum:8,clnCss:["cln",["clickShowModal"]]},
//    		             {clnNum:16,clnCss:["cln",["clickShowModal"]]},
//    		             {clnNum:18,clnCss:["cln",["clickShowModal"]]},
//    		             {clnNum:20,clnCss:["cln",["clickShowModal"]]},
//    		             {clnNum:22,clnCss:["cln",["clickShowModal"]]}],
//    		functionArray:[{funCln:2,funtion:"IntelligentRoadTest.areaPositioning();",funType:1},
//    		               {funCln:3,funtion:"IntelligentRoadTest.sectorPositioning();",funType:1},
//    		               {funCln:4,funtion:"IntelligentRoadTest.sectorPositioning();",funType:1},
//    		               {funCln:5,funtion:"IntelligentRoadTest.sectorPositioning();",funType:1},
//    		               {funCln:6,funtion:"IntelligentRoadTest.alarmPositioning();",funType:1},
//    		               {funCln:7,funtion:"IntelligentRoadTest.alarmPositioning();",funType:1},
//    		               {funCln:8,funtion:"IntelligentRoadTest.alarmPositioning();",funType:1},
//    		               {funCln:16,funtion:"IntelligentRoadTest.KPIPositioning();",funType:1},
//    		               {funCln:18,funtion:"IntelligentRoadTest.KPIPositioning();",funType:1},
//    		               {funCln:20,funtion:"IntelligentRoadTest.KPIPositioning();",funType:1},
//    		               {funCln:22,funtion:"IntelligentRoadTest.KPIPositioning();",funType:1},
//    		               ]
//    };
//	var tableHead = "日期,弱区id,最近站名,最近站址,最近基站ID,曾发生退服告警总次数,曾发生退服告警小区数," +
//			"未恢复退服告警小区数,弱覆盖处理措施,地市名称,地市ID,区县,区县ID,营服中心,营服中心ID,4G切3G总次数,4G切3G总次数在本地网内排名," +
//			"4G总流量,本地网内4G流量排名,感知优良率按天平均值(%),本地网内感知优良率排名,4G用户数按天平均值,本地网内4G用户数排名,最终排名累计值," +
//			"栅格最小经度,栅格最小纬度,栅格中心经度,栅格中心纬度,栅格最大经度,栅格最大纬度,中心点区域归属ID,主服务小区集合,GIS经纬度集合";
//	var fixObj={
//			fixRow:1,
//		};
//	var tableObject={
//			divId:"areaTable",
//			tableId:"areaTableId",
//			tableHead:tableHead,
////			Data:data,
//			clnObj:clnObj,
//			fixObj:fixObj,
//			dataType:3,
//			sql:list,
//			sortFlag:1,
//			sortObj:{sortColumn:"day",sortType:"asc"},
//			pageObj:{pageFlag:0},
//	    	};
//	IntelligentRoadTest.areaTable = new TableToolsNewTwo();
//	IntelligentRoadTest.areaTable.tableObject = tableObject;
//	IntelligentRoadTest.areaTable.submit(tableObject);
//	
//	IntelligentRoadTest.areaTableIsEnd = setTimeout(IntelligentRoadTest.AreaTableTimeout,300);
//	var progressBarSqls=[];
//	progressBarSqls.push(list);
//	var functionlist = [IntelligentRoadTest.showmktCenterAreaTable];
//	progressbarTwo.submitSql(progressBarSqls, functionlist ,[3]);
	
	
	
	setTimeout(function(){
//		if(IntelligentRoadTest.areaTable!=null&&IntelligentRoadTest.areaTable!=undefined){
//			IntelligentRoadTest.areaTable.locationTable("areaTable",1,IntelligentRoadTest.object_id);
//		}
		
//		IntelligentRoadTest.areaTable.locationTable("areaTable",1,IntelligentRoadTest.object_id);
		var city = $('#cityName').text().replace('市','');
		var country = $('#areaName').text();
		if(country=='区县'){
			country=noceUtil.GetQueryString("country");
			city=noceUtil.GetQueryString("city");
		}
		var mktcenter = $('#regon').text();
		if(mktcenter =="全部营服"){
			mktcenter = '';
		}
		if(IntelligentRoadTest.tableDivState==1){
			IntelligentRoadTest.loadmktCenterAreaTableData(city,country,mktcenter,IntelligentRoadTest.day,IntelligentRoadTest.doType,IntelligentRoadTest.object_id);
		}
		},500)
}


IntelligentRoadTest.showGridOrPolyfonSector = function IntelligentRoadTest_showGridOrPolyfonSector(data,objectData){
	IntelligentRoadTest.sectorBMapUtil.useSelectSectorData = true;
	IntelligentRoadTest.sectorBMapUtil.sectorShow(data);
	
	for(var i=0;i<IntelligentRoadTest.gridSectorOverlay.length;i++){
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.gridSectorOverlay[i]);
	}
	IntelligentRoadTest.gridSectorOverlay = null;
	IntelligentRoadTest.gridSectorOverlay = [];
	var result = callBackChangeData(data);
	
	for(var i=0;i<result.length;i++){
		var sectorindex = "";
		if(result[i].is_indoor=="室外"){
			for(var j=0;j<IntelligentRoadTest.sectorBMapUtil.RSRPSectorChe.length;j++){
				if(IntelligentRoadTest.sectorBMapUtil.RSRPSectorChe[j].point2.statn_id==result[i].base_statn_id&&IntelligentRoadTest.sectorBMapUtil.RSRPSectorChe[j].point2.cell_id==result[i].cell_id){
					if(IntelligentRoadTest.sectorBMapUtil.RSRPSectorChe[j].getPath().length/2==0){
						sectorindex = IntelligentRoadTest.sectorBMapUtil.RSRPSectorChe[j].getPath()[IntelligentRoadTest.sectorBMapUtil.RSRPSectorChe[j].getPath().length/2]
					}else{
						sectorindex = IntelligentRoadTest.sectorBMapUtil.RSRPSectorChe[j].getPath()[parseInt(IntelligentRoadTest.sectorBMapUtil.RSRPSectorChe[j].getPath().length/2)+1];
					}
				}
			}
		}
		
		var lng = result[i].longitude_baidu;
		var lat = result[i].latitude_baidu;
		if(sectorindex==""){
			sectorindex = new BMap.Point(lng, lat);
		}
		
		var polyline = new BMap.Polyline([
		                          		objectData[0],
		                          		sectorindex
		                          	], {strokeColor:"#CC66FF", strokeOpacity:1});
		var topSector = objectData[1];
		for(var j=0;j<topSector.length;j++){
			var sector = topSector[j].split(",");
			if(sector[0]==result[i].base_statn_id && sector[1]==result[i].cell_id){
				//基站号,小区号,数量,平均RSRP,按数量排序序号
				polyline.bstid = sector[0];
				polyline.cellid = sector[1];
				polyline.count = sector[2];
				polyline.rsrpAvg = sector[3];
				polyline.topNum = sector[4];
				polyline.setStrokeWeight(6-parseInt(sector[4]));
				polyline.bstname = result[i].base_statn_name;
				polyline.cellname = result[i].cell_name;
			}
		}
		
		polyline.type = "sectorLine";
		polyline.distince = parseInt(IntelligentRoadTest.map.getDistance(objectData[0],new BMap.Point(lng, lat)));
//		polyline.addEventListener("mouseover",function(e){
//			
//		});
		
		IntelligentRoadTest.gridSectorOverlay.push(polyline);
		IntelligentRoadTest.map.addOverlay(polyline);
		
	}
	data = null;
	objectData = null;
}

//扇区绑定点击事件
IntelligentRoadTest.sectorCompentClick = function IntelligentRoadTest_sectorCompentClick(e){
	var sector = e.target.point2;
//	e.target.setFillColor("#9900FF");
	var bst_id = sector.statn_id;
	var cell_id = sector.cell_id;
	var object_id = bst_id*256+cell_id;

	//隐藏连线
	for(var i=0;i<IntelligentRoadTest.gridSectorOverlay.length;i++){
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.gridSectorOverlay[i]);
	}
	IntelligentRoadTest.gridSectorOverlay = null;
	IntelligentRoadTest.gridSectorOverlay = [];
	//隐藏连线的扇区
	if(IntelligentRoadTest.sectorBMapUtil!=undefined&&IntelligentRoadTest.sectorBMapUtil!=null){
		IntelligentRoadTest.sectorBMapUtil.sectorHide();
	}
	// IntelligentRoadTest.hideSelectionBox();
	// IntelligentRoadTest.hideConcernArea();
//	var city_id = noceUtil.city_LATN_ID[sector_city];
//	var country_id = IntelligentRoadTest.districtLngAndLat[sector_city][sector_area_name]['id'];
//	var startRow = IntelligentRoadTest.day+"_"+"20_1_"+city_id+"_"+country_id+"_"+object_id+"_";
//	var endRow = IntelligentRoadTest.day+"_"+"20_1_"+city_id+"_"+country_id+"_"+object_id+"_~";
	
	
	var startRow = IntelligentRoadTest.day+"_"+"20_1_"+object_id+"_";
	var endRow = IntelligentRoadTest.day+"_"+"20_1_"+object_id+"_~";
	var cloumnsList = "i:a1,i:a11,i:a12,i:a13,i:a14,i:a15,i:a16,i:a18,i:a19,i:a22,i:a26,i:a27,i:a28,i:a29,i:a30,i:a31,i:a32,i:a33,i:a34,i:a35,i:a36,i:a37,i:a38";
	var list = ["IntelligentRoadTest_06_grid","STARTROW:"+startRow,"ENDROW:"+endRow,"COLUMNLIST:"+cloumnsList];
	var progressBarSqls=[];
	progressBarSqls.push(list);
	var functionlist = [IntelligentRoadTest.showGridByCanv];
	var dataBase = [4];
	progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase);
	
	var startTime = $('#weekStartTime').text();
	var endTime = IntelligentRoadTest.day;
	if(IntelligentRoadTest.tableDivState==1){
		IntelligentRoadTest.loadSectorCellAlarmAndKPIData(startTime,endTime,bst_id,cell_id);
	}
	IntelligentRoadTest.bst_id =bst_id ;//
	IntelligentRoadTest.cell_id = cell_id;//
	IntelligentRoadTest.type=0;
	//--tiaozhuan
	IntelligentRoadTest.jizhanLocationRow();
	//
	IntelligentRoadTest.initColorBarAll();
	IntelligentRoadTest.object_id = null;
	e = null;
	
}
//查询单个扇区的告警和KPI表格数据
IntelligentRoadTest.loadSectorCellAlarmAndKPIData = function IntelligentRoadTest_loadSectorCellAlarmAndKPIData(startTime,endTime,bst_id,cell_id){
	//缓存的查询参数  如果参数一样则不进行查询
	if(IntelligentRoadTest.parameter_4==(startTime+endTime+bst_id+cell_id)){
		return;
	}
	IntelligentRoadTest.parameter_4=startTime+endTime+bst_id+cell_id;
//	var list = ["IntelligentRoadTest_11_alarmTable","STARTDAY:"+startTime,"ENDDAY:"+endTime,
//	            "BSTID:"+bst_id];
//	var list1 = ["IntelligentRoadTest_13_KPITable","STARTDAY:"+startTime,"ENDDAY:"+endTime,
//	             "BSTID:"+bst_id];
	var list = ["IntelligentRoadTest_12_polygonAlarmTable","STARTDAY:"+startTime,"ENDDAY:"+endTime,
	            ];
	var list1 = ["IntelligentRoadTest_13_KPITable","STARTDAY:"+startTime,"ENDDAY:"+endTime,
	             "BSTID:"+bst_id];
	
	if(cell_id ==null){
//		topStr += parseInt(bst_id)
		cell_id = "";
		list.push("BSTIDANDCELLID:''");
		list.push("BSTID:"+bst_id);
		list1.push("CELLID:"+cell_id);
	}else{
		
		list.push("BSTIDANDCELLID:"+String(parseInt(bst_id) +parseInt(cell_id)));
		list.push("BSTID:"+bst_id);
		
//		list.push("BSTIDANDCELLID:"+"AND cell_id = "+cell_id);
		list1.push("CELLID:"+"AND cellid = "+cell_id);
	}
	
	
//	var progressBarSqls=[];
//	progressBarSqls.push(list);
//	progressBarSqls.push(list1);
//	var functionlist = [IntelligentRoadTest.showSectorAlarmTable,IntelligentRoadTest.showSectorKPITable];
//	var dataBase = [3,3];
//	progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase);
	
	
	
	//告警表格构造
	var alarmTableHead = "日期,基站ID,小区ID,厂家,接收告警时间,告警时间,告警恢复时间,告警级别,是否恢复,是否断站退服,告警内容";
	var alarmFixObj={
			fixRow:1,
		};
	var clnObj = {
			clnCssArray:[{clnNum:5,clnCss:["range",["tmp.substring(0,10).replace(/\-/g,'')>"+startTime,"red_font"]
			                              ]},
                      {clnNum:7,clnCss:["range",["tmp.substring(0,10).replace(/\-/g,'')>"+startTime,"red_font"]
                      ]},
			            ],
//			subNotArray:[5,6,7]
            subArray:[{clnNum:5,value:1},
              		  {clnNum:6,value:1},
              		  {clnNum:7,value:1}]
	};
	var alarmTableObject={
		divId:"alarmTable",
		tableId:"alarmTableId",
		tableHead:alarmTableHead,
		fixObj:alarmFixObj,
		clnObj:clnObj,
		dataType:3,
		sql:list,
		sortFlag:1,
		sortObj:{sortColumn:"day",sortType:"asc"},
		pageObj:{pageFlag:0},
	};
	//KPI表格构造
	var KPITableHead = "日期,基站id,扇区id,扇区名称,E-RAB建立成功率(%),E-RAB掉线率(%),RRC建立成功率(%),同频切换成功率(%),异频切换成功率(%),上行prb利用率(%),下行prb利用率(%),最大rrc连接用户数,PDCP层流量(MB)";
	var KPIFixObj={
			fixRow:1,
		};
	var KPITableObject={
		divId:"KPITable",
		tableId:"KPITableId",
		tableHead:KPITableHead,
		fixObj:KPIFixObj,
		dataType:3,
		sql:list1,
		sortFlag:1,
		sortObj:{sortColumn:"day",sortType:"asc"},
		pageObj:{pageFlag:0},
	};
	
	IntelligentRoadTest.alarmTable = new TableToolsNewTwo();
	IntelligentRoadTest.alarmTable.tableObject = alarmTableObject;
	IntelligentRoadTest.alarmTable.submit(alarmTableObject);
	
	IntelligentRoadTest.KPITable = new TableToolsNewTwo();
	IntelligentRoadTest.KPITable.tableObject = KPITableObject;
	IntelligentRoadTest.KPITable.submit(KPITableObject);
	
	IntelligentRoadTest.alarmTableIsEnd = setTimeout(IntelligentRoadTest.alarmTableTimeout,300);
	IntelligentRoadTest.KPITableIsEnd = setTimeout(IntelligentRoadTest.KPITableTimeout,300);
	
}

//多边形点击呈现栅格回调函数
IntelligentRoadTest.showGridByCanv = function IntelligentRoadTest_showGridByCanv(data){
	//IntelligentRoadTest.GridDataChe = data;
	var result = callBackChangeData(data);
	data = null;
	IntelligentRoadTest.isShowGrid = true;
	IntelligentRoadTest.isShowDTGrid = false;
	//清除描点数据
//	IntelligentRoadTest.GridMapCircle.clear();
	IntelligentRoadTest.GridMapCircleData = null;
	IntelligentRoadTest.GridMapCircleDataArr = null;
	IntelligentRoadTest.GridMapCircleData = [];
	IntelligentRoadTest.GridMapCircleDataArr = [];
	
	IntelligentRoadTest.GridMap.clear();
	IntelligentRoadTest.GridMapM.clear();
	IntelligentRoadTest.GridMapU.clear();
//	IntelligentRoadTest.GridCanArr = [];
//	IntelligentRoadTest.GridCanArr = null;
	IntelligentRoadTest.GridCanArrT = null;
	IntelligentRoadTest.GridCanArrM = null;
	IntelligentRoadTest.GridCanArrU = null;
	IntelligentRoadTest.CanArr = null;
	
	IntelligentRoadTest.GridCanArrT = [];
	IntelligentRoadTest.GridCanArrM = [];
	IntelligentRoadTest.GridCanArrU = [];
	IntelligentRoadTest.CanArr = [];
	
	
	for(var i=0;i<result.length;i++){
		var maxLng = result[i]["i:a15"];// 最大经度
		var maxLat = result[i]["i:a16"];// 最大纬度
		var minLng = result[i]["i:a11"];// 最小经度
		var minLat = result[i]["i:a12"];// 最小纬度
		var grid_num = result[i]["i:a1"];// 栅格号
		var sector_set = result[i]["i:a18"];// 主小区集合
		var agps_count = result[i]["i:a28"];// AGPS记录数
		var rsrp_avg = result[i]["i:a27"];// rsrp均值
		
		var dxrsrpCount = result[i]["i:a29"];//DX_RSRP_COUNT
		var dxrsrp105Count = result[i]["i:a30"];//DX_RSRP_105_COUNT
		var dxrsrpsum = result[i]["i:a31"];//DX_RSRP_SUM
		var ydrsrpCount = result[i]["i:a32"];//YD_RSRP_COUNT
		var ydrsrp105Count = result[i]["i:a33"];//YD_RSRP_105_COUNT
		var ydrsrpsum = result[i]["i:a34"];//YD_RSRP_SUM
		var ltrsrpCount = result[i]["i:a35"];//LT_RSRP_COUNT
		var ltrsrp105Count = result[i]["i:a36"];//LT_RSRP_105_COUNT
		var ltrsrpsum = result[i]["i:a37"];//LT_RSRP_SUM
		var monthrelate = result[i]["i:a38"];//MONTH_RELATE
		
		var dxrsrpAvg = null;
		var rsrp_avgM = null;
		var rsrp_avgU = null;
		var dx_cover = null;
		var yd_cover = null;
		var lt_cover = null;
		
		if(dxrsrpCount!=null&&dxrsrpsum!=null){
			dxrsrpAvg = dxrsrpsum/dxrsrpCount;
		}
		if(ydrsrpCount!=null&&ydrsrpsum!=null){
			rsrp_avgM = ydrsrpsum/ydrsrpCount;// rsrp均值
		}
		if(ltrsrpCount!=null&&ltrsrpsum!=null){
			rsrp_avgU = ltrsrpsum/ltrsrpCount;// rsrp均值
		}
		
		if(dxrsrpCount!=null&&dxrsrp105Count!=null){
			dx_cover = dxrsrp105Count/dxrsrpCount;
		}
		if(ydrsrpCount!=null&&ydrsrp105Count!=null){
			yd_cover = ydrsrp105Count/ydrsrpCount;
		}
		if(ltrsrpCount!=null&&ltrsrp105Count!=null){
			lt_cover = ltrsrp105Count/ltrsrpCount;
		}

		if(rsrp_avg!=null){
//			var gridData = [minLng,minLat,maxLng,maxLat,rsrp_avg];
			var dataChe = [minLng,minLat,maxLng,maxLat,rsrp_avg,grid_num,agps_count,sector_set,
			               dxrsrpAvg,rsrp_avgM,rsrp_avgU,monthrelate,dx_cover,yd_cover,lt_cover];
//			IntelligentRoadTest.GridCanArr.push(gridData);
			IntelligentRoadTest.CanArr.push(dataChe);
		}
		
		if(IntelligentRoadTest.isThreeNetStatus){
			if(dxrsrpAvg!=null){
				var gridData = [minLng,minLat,maxLng,maxLat,dxrsrpAvg];
				IntelligentRoadTest.GridCanArrT.push(gridData);
			}
			if(rsrp_avgM!=null){
				var gridData = [minLng,minLat,maxLng,maxLat,rsrp_avgM];
				IntelligentRoadTest.GridCanArrM.push(gridData);
			}
			
			if(rsrp_avgU!=null){
				var gridData = [minLng,minLat,maxLng,maxLat,rsrp_avgU];
				IntelligentRoadTest.GridCanArrU.push(gridData);
			}
		}
		
		
		
	}
	
//	var CTData = IntelligentRoadTest.GridCanArr;
//	var CMData = IntelligentRoadTest.GridCanArrM;
//	var CUData = IntelligentRoadTest.GridCanArrU;
//	for(var j=0;j<IntelligentRoadTest.colorBarArr.length;j++){
//		CTData = IntelligentRoadTest.ClearData(CTData,IntelligentRoadTest.colorBarArr[j]);
//		CMData = IntelligentRoadTest.ClearData(CMData,IntelligentRoadTest.colorBarArr[j]);
//		CUData = IntelligentRoadTest.ClearData(CUData,IntelligentRoadTest.colorBarArr[j]);
//	}
	
	
	if(IntelligentRoadTest.isThreeNetStatus){
		var CTData = IntelligentRoadTest.GridCanArrT;
		var CMData = IntelligentRoadTest.GridCanArrM;
		var CUData = IntelligentRoadTest.GridCanArrU;
		for(var j=0;j<IntelligentRoadTest.colorBarArr.length;j++){
			CTData = IntelligentRoadTest.ClearData(CTData,IntelligentRoadTest.colorBarArr[j]);
			CMData = IntelligentRoadTest.ClearData(CMData,IntelligentRoadTest.colorBarArr[j]);
			CUData = IntelligentRoadTest.ClearData(CUData,IntelligentRoadTest.colorBarArr[j]);
		}
		IntelligentRoadTest.GridMap.draw(CTData);
		IntelligentRoadTest.GridMapM.draw(CMData);
		IntelligentRoadTest.GridMapU.draw(CUData);
		CTData = null;
		CMData = null;
		CUData = null;
	}else{
		var CTData = IntelligentRoadTest.CanArr;
		for(var j=0;j<IntelligentRoadTest.colorBarArr.length;j++){
			CTData = IntelligentRoadTest.ClearData(CTData,IntelligentRoadTest.colorBarArr[j]);
		}
		IntelligentRoadTest.GridMap.draw(CTData);
		CTData = null;
	}
	
	
}

IntelligentRoadTest.localSearchSearchComplete = function IntelligentRoadTest_localSearchSearchComplete(result){
//	console.log(result);
	var localPoint = null;
	
	if(result.getPoi(0)==undefined){
		alert("当前地图所在地市搜索不到你输入的地址");
		return;
	}else{
		localPoint = result.getPoi(0).point;
	}
	
	IntelligentRoadTest.map.setCenter(localPoint);
	
	if(IntelligentRoadTest.positioningMarker!=null){
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.positioningMarker);
	}
	var myIcon = new BMap.Icon("../js/IntelligentRoadTest/images/mapPositioning.png", new BMap.Size(23,23));
	IntelligentRoadTest.positioningMarker = new BMap.Marker(localPoint,{icon:myIcon});
	IntelligentRoadTest.positioningMarker.setZIndex(-1);
	IntelligentRoadTest.positioningMarker.setOffset(new BMap.Size(0,-12));
	IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.positioningMarker);
	
	
	for(var i=0;i<IntelligentRoadTest.badPolygonMarkerArr.length;i++){
		//如果弱区的图标是定位图标，则换回弱区图标
		var markerImg = IntelligentRoadTest.badPolygonMarkerArr[i].getIcon();
		if(markerImg.imageUrl.indexOf("mapPositioning.png")>=0){
			markerImg.setImageUrl("../js/IntelligentRoadTest/images/polygonCenter.png");
			markerImg.setSize(new BMap.Size(23,32));
			IntelligentRoadTest.badPolygonMarkerArr[i].setIcon(markerImg);
		}
//		markerImg = null;
	}
	
	var district = IntelligentRoadTest.getCenterPointDistrict(localPoint);
	
	if(IntelligentRoadTest.cityPermission_common=="全省"){
		if(district!=null){
			if(district.city!=IntelligentRoadTest.city||district.name!=IntelligentRoadTest.country){
				IntelligentRoadTest.city = district.city;
				IntelligentRoadTest.country = district.name;
				IntelligentRoadTest.mktcenter = null;
				
				$('#cityList_1 > li').each(function(){
					$(this).children('a').each(function(){
						if($(this).text() == IntelligentRoadTest.city){
							$(this).click();
						}
					});
				});
				
				$('#district > a').each(function(){
					if($(this).text() == IntelligentRoadTest.country){
						$(this).click();
					}
				});
//				$('#submit').click();
				IntelligentRoadTest.loadmktCenterPolygonData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day);
//				IntelligentRoadTest.loadmktCenterAreaTableData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day,IntelligentRoadTest.doType);
//				IntelligentRoadTest.loadJiZhanTableData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day);
			}
			
//				IntelligentRoadTest.sectorCompent.selectCity = market.city;
//				IntelligentRoadTest.sectorCompent.selectDistrict = market.country;
//				IntelligentRoadTest.sectorCompent.selecMarketbase = market.name;
//				IntelligentRoadTest.sectorCompent.queryByTemplate();
			if($('#sector').is(':checked')){
				if(IntelligentRoadTest.sectorCompent.selectCity!=IntelligentRoadTest.city
//						||
//						IntelligentRoadTest.sectorCompent.selectDistrict!=IntelligentRoadTest.country
						){
					
					IntelligentRoadTest.sectorCompent.selectCity =IntelligentRoadTest.city;
//					IntelligentRoadTest.sectorCompent.selectDistrict = IntelligentRoadTest.country;
//					IntelligentRoadTest.sectorCompentM.selectCity = district.city;
//					IntelligentRoadTest.sectorCompentU.selectCity = district.city;
					if(IntelligentRoadTest.sectorCompent.selectTime==undefined||IntelligentRoadTest.sectorCompent.selectTime==null){
						IntelligentRoadTest.sectorCompent.selectTime = IntelligentRoadTest.day;
					}
					IntelligentRoadTest.sectorCompent.queryByTemplate();
//					IntelligentRoadTest.sectorCompentM.queryByTemplate();
//					IntelligentRoadTest.sectorCompentU.queryByTemplate();
				}else{
					IntelligentRoadTest.sectorCompent.clear();
					IntelligentRoadTest.sectorCompent.draw();
//					IntelligentRoadTest.sectorCompentM.draw();
//					IntelligentRoadTest.sectorCompentU.draw();
				}
			}
			
			
		}
	}else{
		if(district!=null){
			if(district.city==IntelligentRoadTest.cityPermission_common){
				if(district.city!=IntelligentRoadTest.city||district.name!=IntelligentRoadTest.country){
					IntelligentRoadTest.city = district.city;
					IntelligentRoadTest.country = district.name;
					IntelligentRoadTest.mktcenter = null;
					
					$('#cityList_1 > li').each(function(){
						$(this).children('a').each(function(){
							if($(this).text() == IntelligentRoadTest.city){
								$(this).click();
							}
						});
					});
					
					$('#district > a').each(function(){
						if($(this).text() == IntelligentRoadTest.country){
							$(this).click();
						}
					});
//					$('#submit').click();
					IntelligentRoadTest.loadmktCenterPolygonData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day);
//					IntelligentRoadTest.loadmktCenterAreaTableData(IntelligentRoadTest.city,IntelligentRoadTest.country,IntelligentRoadTest.mktcenter,IntelligentRoadTest.day,IntelligentRoadTest.doType);
				}
				
				if($('#sector').is(':checked')){
					if(IntelligentRoadTest.sectorCompent.selectCity!=IntelligentRoadTest.city
//							||
//							IntelligentRoadTest.sectorCompent.selectDistrict!=IntelligentRoadTest.country
							){
						
						IntelligentRoadTest.sectorCompent.selectCity =IntelligentRoadTest.city;
//						IntelligentRoadTest.sectorCompent.selectDistrict = IntelligentRoadTest.country;
//						IntelligentRoadTest.sectorCompentM.selectCity = district.city;
//						IntelligentRoadTest.sectorCompentU.selectCity = district.city;
						if(IntelligentRoadTest.sectorCompent.selectTime==undefined||IntelligentRoadTest.sectorCompent.selectTime==null){
							IntelligentRoadTest.sectorCompent.selectTime = IntelligentRoadTest.day;
						}
						IntelligentRoadTest.sectorCompent.queryByTemplate();
//						IntelligentRoadTest.sectorCompentM.queryByTemplate();
//						IntelligentRoadTest.sectorCompentU.queryByTemplate();
					}else{
						IntelligentRoadTest.sectorCompent.clear();
						IntelligentRoadTest.sectorCompent.draw();
//						IntelligentRoadTest.sectorCompentM.draw();
//						IntelligentRoadTest.sectorCompentU.draw();
					}
				}
			}
			
			
			
		}
	}
	
	
	
}

IntelligentRoadTest.hideSelectionBox = function IntelligentRoadTest_hideSelectionBox(){
	var text = $('#BoxSelection').text();
	if(IntelligentRoadTest.selectingBox){
		$('#BoxSelection').click();
	}
}

IntelligentRoadTest.hideConcernArea = function IntelligentRoadTest_hideConcernArea(){
	IntelligentRoadTest.concerningArea = false;
	if(IntelligentRoadTest.concernPolygon!=null){
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.concernPolygon);
		IntelligentRoadTest.GridMap.clear();
//		IntelligentRoadTest.GridCanArr = [];
//		IntelligentRoadTest.GridCanArr = null;
		IntelligentRoadTest.GridCanArrT = null;
		IntelligentRoadTest.GridCanArrT = [];
		IntelligentRoadTest.CanArr = null;
		IntelligentRoadTest.CanArr = [];
	}
	
	if(IntelligentRoadTest.concernPolygonM!=null){
		IntelligentRoadTest.mapMobile.removeOverlay(IntelligentRoadTest.concernPolygonM);
		IntelligentRoadTest.GridMapM.clear();
		IntelligentRoadTest.GridCanArrM = null;
		IntelligentRoadTest.GridCanArrM = [];
//		IntelligentRoadTest.CanArrM = [];
	}
	
	if(IntelligentRoadTest.concernPolygonU!=null){
		IntelligentRoadTest.mapUnicom.removeOverlay(IntelligentRoadTest.concernPolygonU);
		IntelligentRoadTest.GridMapU.clear();
		IntelligentRoadTest.GridCanArrU = null;
		IntelligentRoadTest.GridCanArrU = [];
//		IntelligentRoadTest.CanArrU = [];
	}
	
	
	
}

IntelligentRoadTest.initColorBarAll = function IntelligentRoadTest_initColorBarAll(){
	//图例重设
	$("#colorLegen").children().each(function(){
		if($(this).hasClass("grey")){
			$(this).removeClass("grey");
		}
	});
	IntelligentRoadTest.colorBarArr = [];
}

IntelligentRoadTest.initMarketPolygon = function IntelligentRoadTest_initMarketPolygon(){
//	{id:'',name:'',max_lng:'',max_lat:'',min_lng:'',min_lat:'',gis:''}
//	var districtObj=IntelligentRoadTest.SelectDataChe[city];
//	var marketbaseArr=(null==districtObj || null==districtObj[country])?[]:districtObj[country];
	for(var city in IntelligentRoadTest.SelectDataChe){
		var districtObj = IntelligentRoadTest.SelectDataChe[city];
		for(var district in districtObj){
			var marketbaseArr = districtObj[district];//营服数组
//			console.log(district);
//			for(var i=0;i<marketbaseArr.length;i++){
//				var market = marketbaseArr[i];
//				var gis = market.gis;
//				var gisPoints = gis.split("|");
//				
//				for(var i=0;i<gisPoints.length;i++){
//					var PointArr = [];
//					var points = gisPoints[i].split("@");
//					for(var j=0;j<points.length;j++){
//						var point = points[j].split(",");
//						var p = new BMap.Point(point[0],point[1]);
//						PointArr.push(p);
//					}
//					var marketPolygon = new BMap.Polygon(PointArr, {strokeWeight: 1, strokeColor: "blue",fillOpacity:0.2}); //建立多边形覆盖物
//					marketPolygon.city = city;
//					marketPolygon.country = district;
//					marketPolygon.id = market.id;
//					marketPolygon.name = market.name;
//					marketPolygon.max_lng = market.max_lng;
//					marketPolygon.max_lat = market.max_lat;
//					marketPolygon.min_lng = market.min_lng;
//					marketPolygon.min_lat = market.min_lat;
//					IntelligentRoadTest.MarketPolygon.push(marketPolygon);
//					
//				}
//				
//			}
		}
	}
}

IntelligentRoadTest.initDistrictPolygon = function IntelligentRoadTest_initDistrictPolygon(){
	for(var city in IntelligentRoadTest.districtJson){
		var districtObj = IntelligentRoadTest.districtJson[city];
		for(var district in districtObj){
			var gis = districtObj[district];
			var id = IntelligentRoadTest.districtLngAndLat[city][district]["id"];
			var name = district;
			var max_lng = IntelligentRoadTest.districtLngAndLat[city][district].max_lng;
			var max_lat = IntelligentRoadTest.districtLngAndLat[city][district].max_lat;
			var min_lng = IntelligentRoadTest.districtLngAndLat[city][district].min_lng;
			var min_lat = IntelligentRoadTest.districtLngAndLat[city][district].min_lat;
			var gisPoints = gis.split("|");
			for(var i=0;i<gisPoints.length;i++){
				var PointArr = [];
				var points = gisPoints[i].split("@");
				for(var j=0;j<points.length;j++){
					var point = points[j].split(",");
					var p = new BMap.Point(point[0],point[1]);
					PointArr.push(p);
				}
				
				var districtPolygon = new BMap.Polygon(PointArr); //建立多边形覆盖物
				var points = districtPolygon.getPath();
				var bounds = districtPolygon.getBounds();
				var districtObject = {};
				districtObject.id = id;
				districtObject.city = city;
				districtObject.name = name;
				districtObject.bounds = bounds;
				districtObject.points = points;
				districtPolygon = null;
//				districtPolygon.max_lng = max_lng;
//				districtPolygon.max_lat = max_lat;
//				districtPolygon.min_lng = min_lng;
//				districtPolygon.min_lat = min_lat;
				IntelligentRoadTest.DistrictPolygon.push(districtObject);
			}
		}
	}
	
	IntelligentRoadTest.districtJson = null;

	
}

//匹配地图中心点所在的区县
IntelligentRoadTest.getCenterPointDistrict = function IntelligentRoadTest_getCenterPointDistrict(centerPoint){
	var market = null;
	for(var i=0;i<IntelligentRoadTest.DistrictPolygon.length;i++){
		if(BMapLib.GeoUtils.isPointInPolygonForNOCE(centerPoint, IntelligentRoadTest.DistrictPolygon[i])){
			market = IntelligentRoadTest.DistrictPolygon[i];
			break;
		}
	}
	return market;
}


IntelligentRoadTest.alarmTableTimeout = function IntelligentRoadTest_alarmTableTimeout(){
//	IntelligentRoadTest.areaTable.tableObject = tableObject;
	if(IntelligentRoadTest.alarmTable!=undefined && IntelligentRoadTest.alarmTable!=null){
		if(IntelligentRoadTest.alarmTable.tableObject.loadEnd){
			clearTimeout(IntelligentRoadTest.alarmTableIsEnd);
			$('#alarmT + .loadImg').hide();
//			console.log("告警表加载完成");
		}else{
			IntelligentRoadTest.alarmTableIsEnd = setTimeout(IntelligentRoadTest.alarmTableTimeout,300);
			$('#alarmT + .loadImg').show();
		}
	}else{
		clearTimeout(IntelligentRoadTest.alarmTableIsEnd);
		$('#alarmT + .loadImg').hide();
	}
	
//	IntelligentRoadTest.alarmTable = new TableToolsNewTwo();
//	IntelligentRoadTest.alarmTable.submit(alarmTableObject);
//	
//	IntelligentRoadTest.KPITable = new TableToolsNewTwo();
//	IntelligentRoadTest.KPITable.submit(KPITableObject);
	
}

IntelligentRoadTest.KPITableTimeout = function IntelligentRoadTest_KPITableTimeout(){
	if(IntelligentRoadTest.KPITable!=undefined && IntelligentRoadTest.KPITable!=null){
		if(IntelligentRoadTest.KPITable.tableObject.loadEnd){
			clearTimeout(IntelligentRoadTest.KPITableIsEnd);
			$('#kpiT + .loadImg').hide();
//			console.log("KPI表加载完成");
		}else{
			IntelligentRoadTest.KPITableIsEnd = setTimeout(IntelligentRoadTest.KPITableTimeout,300);
			$('#kpiT + .loadImg').show();
		}
	}else{
		clearTimeout(IntelligentRoadTest.KPITableIsEnd);
		$('#kpiT + .loadImg').hide();
	}
	
	
//	IntelligentRoadTest.KPITableIsEnd = setTimeout(IntelligentRoadTest.KPITableTimeout,300);
}

IntelligentRoadTest.AreaTableTimeout = function IntelligentRoadTest_AreaTableTimeout(){
	if(IntelligentRoadTest.areaTable!=undefined && IntelligentRoadTest.areaTable!=null){
		if(IntelligentRoadTest.areaTable.tableObject.loadEnd){
			clearTimeout(IntelligentRoadTest.areaTableIsEnd);
			$('#areaT ~ .loadImg').hide();
			setTimeout(function(){
//				IntelligentRoadTest.areaTable.locationTable("areaTable",1,IntelligentRoadTest.object_id);
//					var city = $('#cityName').text().replace('市','');
//					var country = $('#areaName').text();
//					if(country=='区县'){
//						country=noceUtil.GetQueryString("country");
//						city=noceUtil.GetQueryString("city");
//					}
//					var mktcenter = $('#regon').text();
//					if(mktcenter =="全部营服"){
//						mktcenter = '';
//					}
//					IntelligentRoadTest.loadmktCenterAreaTableData(city,country,mktcenter,IntelligentRoadTest.day,IntelligentRoadTest.doType,IntelligentRoadTest.object_id);
				},500)
//			console.log("区域明细表加载完成");
		}else{
			IntelligentRoadTest.areaTableIsEnd = setTimeout(IntelligentRoadTest.AreaTableTimeout,300);
			$('#areaT ~ .loadImg').show();
		}
	}else{
		$('#areaT ~ .loadImg').hide();
		clearTimeout(IntelligentRoadTest.areaTableIsEnd);
	}
	
	
//	IntelligentRoadTest.KPITableIsEnd = setTimeout(IntelligentRoadTest.KPITableTimeout,300);
}


IntelligentRoadTest.concernAreaTableTimeout = function IntelligentRoadTest_concernAreaTableTimeout(){
	
	if(IntelligentRoadTest.concernAreaTable!=undefined && IntelligentRoadTest.concernAreaTable!=null){
		if(IntelligentRoadTest.concernAreaTable.tableObject.loadEnd){
			clearTimeout(IntelligentRoadTest.concernAreaTableIsEnd);
//			$('#areaT ~ .loadImg').hide();
			setTimeout(function(){
				var headTr=$("#concernAreaTable  table  tr");
				var line = headTr.length-1;
				var lineHeight = 31;//每列的高度
				var top = (line-1)*lineHeight;//滚动条应该滚动的距离
				$("#concernAreaTable .normalTable").scrollTop(top);
				headTr.eq(line).addClass("loadTr");
				},500)
		}else{
			IntelligentRoadTest.concernAreaTableIsEnd = setTimeout(IntelligentRoadTest.concernAreaTableTimeout,300);
//			$('#areaT ~ .loadImg').show();
		}
	}else{
//		$('#areaT ~ .loadImg').hide();
		clearTimeout(IntelligentRoadTest.concernAreaTableIsEnd);
	}
	
}

//------------------------------------
//关注区域列表


IntelligentRoadTest.areaMarkerClick = function IntelligentRoadTest_areaMarkerClick(e){
	// var areaOverlay = e.target.areaOverlay;
    var areaOverlay = IntelligentRoadTest.SelectionOverlayList.length>0?IntelligentRoadTest.SelectionOverlayList[0]:{}

	if(areaOverlay.rsrpAvg==undefined||areaOverlay.cover==undefined){
	    alert("框选区域的rsrp均值或者覆盖率还未查询结束，请等查询结束后再点击保存");
	    return;
    }
	IntelligentRoadTest.areaMarkerAreaOverlay = areaOverlay;
//	IntelligentRoadTest.areaMarkerAreaOverlay.area_name = "关注区域测试";
//	IntelligentRoadTest.map.removeOverlay(this);
	//打开编辑框
	
	$('#saveConcernArea').show();
	$('#userName').text($('#headerUserForm_a').text().trim());
	$('#concernAreaName').val('');
	$('#concernAreaType').val('');
	//编辑框的确定按钮，调用IntelligentRoadTest.saveConcernArea方法进行存储多边形

	$('#saveButton').unbind('click').bind('click',function(){
		var concernName = $('#concernAreaName').val();
		var create_user = $('#userName').text();
		var concernAreaType = $('#concernAreaType').val();
		if(concernName==''){
			alert("您未输入框选区域的名称");
			return;
		}
		// IntelligentRoadTest.areaMarkerAreaOverlay.area_name = concernName;
		// IntelligentRoadTest.areaMarkerAreaOverlay.create_user = create_user;
		// IntelligentRoadTest.areaMarkerAreaOverlay.area_type = concernAreaType;
        areaOverlay.area_name = concernName;
        areaOverlay.create_user = create_user;
        areaOverlay.area_type = concernAreaType;
		// IntelligentRoadTest.saveConcernArea(IntelligentRoadTest.areaMarkerAreaOverlay);
        IntelligentRoadTest.saveConcernArea(areaOverlay);
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.selectBoxMarker);
		$('#saveConcernArea').hide();
		
	});
}

IntelligentRoadTest.saveConcernArea = function IntelligentRoadTest_saveConcernArea(areaOverlay){
	var overlayPointArr=areaOverlay.getPath();
	var maxAndMinLngLat = IntelligentRoadTest.getMaxAndMinLatLng(overlayPointArr);//[maxLng , maxLat , minLng , minLat]
	var max_lng = maxAndMinLngLat[0];
	var min_lng = maxAndMinLngLat[2];
	var max_lat = maxAndMinLngLat[1];
	var min_lat = maxAndMinLngLat[3];
	var area_name = areaOverlay.area_name;
	var area_path = "";
	var area_type = areaOverlay.area_type;
//	var handle_time = "";
//	var handle_description = "";
	var create_user = areaOverlay.create_user;
	var city = $('#cityName').text().replace('市','');
	var rsrp = areaOverlay.rsrpAvg;
	var cover = areaOverlay.cover;
	var bst_id = areaOverlay.bst_id;
	var cell_id = areaOverlay.cell_id;
	var cell_name = areaOverlay.cell_name;
	
	for(var i=0;i<overlayPointArr.length;i++){
		var point = overlayPointArr[i];
		area_path +=point.lng+","+point.lat;
		if(i!=overlayPointArr.length-1){
			area_path += "@";
		}
	}
	
	var ajaxData = {
	    "area_name":area_name,
        "city":city,
        "create_user":create_user,
        "gis_data_baidu":area_path,
        "max_longitude_baidu":max_lng,
        "min_longitude_baidu":min_lng,
        "max_latitude_baidu":max_lat,
        "min_latitude_baidu":min_lat,
        "area_type":area_type,
        "rsrp":rsrp,
        "cover":cover,
        "bst_id":bst_id,
        "cell_id":cell_id,
        "cell_name":cell_name,
//			"handle_time":handle_time,
//			"handle_description":handle_description,
	};
	var $ajax = $.ajax({
        type: 'post',
        data: ajaxData,
        url: 'pages_concernArea_ConcernArea_saveArea.action',
        cache: false,
        dataType: 'json',
        success: function(data){
        	console.log(data);
        	IntelligentRoadTest.queryAllConcernArea();
        	IntelligentRoadTest.concernAreaTableIsEnd = setTimeout(IntelligentRoadTest.concernAreaTableTimeout,300);
        	//直接切换到关注列表
        	$(".tabUl li").each(function(){
        		var id = $(this).find('a').attr('id');
        		if(id=="concernAreaT"){
        			$(this).click();
        		}
        	});
        },
        error: function(data,textStatus){
        	
        }
    });
}

IntelligentRoadTest.queryAllConcernArea = function IntelligentRoadTest_queryAllConcernArea(){
	var list = ["IntelligentRoadTest_18_allConcernArea"];
	var city=$('#cityPermission_common').val();
	if(city=="全省"){
		list.push("CITY:");
	}else{
		list.push("CITY:"+"and city='"+city+"'");
	}
//	var progressBarSqls=[];
//	progressBarSqls.push(list);
//	var functionlist = [IntelligentRoadTest.showAllConcernArea];
//	var dataBase = [3];
//	progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase,[[gridCenter,sectorArr]]);
	
	var clnObj={
    		clnCssArray:[
    		             {clnNum:2,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:7,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:8,clnCss:["cln",["clickShowModal"]]},
    		             ],
    		functionArray:[
    		               {funCln:2,funtion:"IntelligentRoadTest.concernAreaPositiong();",funType:1},
    		               {funCln:7,funtion:"IntelligentRoadTest.concernAreaLog();",funType:1},
    		               {funCln:8,funtion:"IntelligentRoadTest.concernAreaSevenLine(this);",funType:1},
                {funCln:19,funtion:"IntelligentRoadTest.concernAreaEdit(this);",funType:1},
                {funCln:20,funtion:"IntelligentRoadTest.concernAreaDelete(this);",funType:1},
    		               ],
//    		subNotArray:[5,9,14]
			subArray:[{clnNum:5,value:1},
		      		  {clnNum:8,value:1},
		      		  {clnNum:19,value:1},
                        {clnNum:20,value:1}]
    };
	var tableHead = "编号,名称,类型,创建者,创建时间,地市,调优日志,7天变化,rsrp均值,覆盖率,最近基站id,最近小区id,最近小区名称,经纬度集合,最大经度,最大纬度,最小经度,最小纬度,编辑,删除";
	var fixObj={
			fixRow:1,
		};
	var tableObject={
			divId:"concernAreaTable",
			tableId:"concernAreaTable",
			tableHead:tableHead,
//			Data:data,
			clnObj:clnObj,
			fixObj:fixObj,
			dataType:3,
			sql:list,
			sortFlag:1,
//			sortObj:{sortColumn:"day",sortType:"asc"},
			pageObj:{pageFlag:0},
	    	};
	IntelligentRoadTest.concernAreaTable = new TableToolsNewTwo();
	IntelligentRoadTest.concernAreaTable.tableObject = tableObject;
	IntelligentRoadTest.concernAreaTable.submit(tableObject);
	
}
//关注区域名称模糊搜索
IntelligentRoadTest.concernAreaSearch = function IntelligentRoadTest_concernAreaSearch(name){
	var list = ["IntelligentRoadTest_19_searchConcernArea","NAME:"+name];
	var city=$('#cityPermission_common').val();
	if(city=="全省"){
		list.push("CITY:");
	}else{
		list.push("CITY:"+"and city='"+city+"'");
	}

    var clnObj={
        clnCssArray:[
            {clnNum:2,clnCss:["cln",["clickShowModal"]]},
            {clnNum:7,clnCss:["cln",["clickShowModal"]]},
            {clnNum:8,clnCss:["cln",["clickShowModal"]]},
        ],
        functionArray:[
            {funCln:2,funtion:"IntelligentRoadTest.concernAreaPositiong();",funType:1},
            {funCln:7,funtion:"IntelligentRoadTest.concernAreaLog();",funType:1},
            {funCln:8,funtion:"IntelligentRoadTest.concernAreaSevenLine(this);",funType:1},
            {funCln:19,funtion:"IntelligentRoadTest.concernAreaEdit(this);",funType:1},
            {funCln:20,funtion:"IntelligentRoadTest.concernAreaDelete(this);",funType:1},
        ],
//    		subNotArray:[5,9,14]
        subArray:[{clnNum:5,value:1},
            {clnNum:8,value:1},
            {clnNum:19,value:1},
            {clnNum:20,value:1}]
    };
    var tableHead = "编号,名称,类型,创建者,创建时间,地市,调优日志,7天变化,rsrp均值,覆盖率,最近基站id,最近小区id,最近小区名称,经纬度集合,最大经度,最大纬度,最小经度,最小纬度,编辑,删除";
    var fixObj={
        fixRow:1,
    };
    var tableObject={
        divId:"concernAreaTable",
        tableId:"concernAreaTable",
        tableHead:tableHead,
//			Data:data,
        clnObj:clnObj,
        fixObj:fixObj,
        dataType:3,
        sql:list,
        sortFlag:1,
//			sortObj:{sortColumn:"day",sortType:"asc"},
        pageObj:{pageFlag:0},
    };
    IntelligentRoadTest.concernAreaTable = new TableToolsNewTwo();
    IntelligentRoadTest.concernAreaTable.tableObject = tableObject;
    IntelligentRoadTest.concernAreaTable.submit(tableObject);
}

IntelligentRoadTest.concernAreaEdit = function IntelligentRoadTest_concernAreaEdit(data){
    $('#concernCreateTime').text(data.create_time);
    $('#concernCreator').text(data.creator);
    $('#concernType').text(data.area_type);
    $('#concernId').text(data.id);
    $('#concernName').text(data.area_name);
//	$('#concernHandleDescribe').val(data[7].replace(/#/g,"\n"));
    $('#concernHandleDescribe').val(data.handle_description);
    $('#concernHandleDescribe').removeAttr('readonly');
    $('#editConcernArea').show();
    $('#sureButton').show();
    $('#sureButton').unbind('click').bind('click',function(){
//		var $('#concernCreateTime').text(data[10]);
//		$('#concernCreator').text(data[9]);
//		$('#concernId').text(data[1]);
//		$('#concernName').text(data[2]);
        data.handle_description = String($('#concernHandleDescribe').val());
        // IntelligentRoadTest.concernAreaData[8] = String($('#concernHandleDescribe').val());
//		.replace(/\n/g,"#");
//         IntelligentRoadTest.updateConcernArea(IntelligentRoadTest.concernAreaData);
        IntelligentRoadTest.updateConcernArea(data);
        $('#editConcernArea').hide();
    });
}
function editConcernArea(imgHtml){
	var imgTd = $(imgHtml).parent().parent();//查找到当前img所在的td
	var tdArr = $(imgTd).prevAll('td');//当前td之前所有的同辈td元素,顺序为表格顺序的倒序
	var data = [];
	$(tdArr).each(function(i){
		var tdChildrenDiv = $(this).find('div');
		if($(tdChildrenDiv).children('a').length>0){
			//存在a标签,数据为a标签的title
			var d = $(tdChildrenDiv).children('a').attr('title');
			data.push(d);
		}else{
			data.push($(tdChildrenDiv).text());
		}
	});
	data.reverse();
	
//	console.log("编辑关注区域:"+data);
	//弹出框进行编辑  //编号,名称,类型,创建者,创建时间,地市,经纬度集合,调优日志,RSRP均值7天变化,最大经度,最大纬度,最小经度,最小纬度,操作
	IntelligentRoadTest.concernAreaData = data;
	$('#concernCreateTime').text(data[5]);
	$('#concernCreator').text(data[4]);
	$('#concernType').text(data[3]);
	$('#concernId').text(data[1]);
	$('#concernName').text(data[2]);
//	$('#concernHandleDescribe').val(data[7].replace(/#/g,"\n"));
	$('#concernHandleDescribe').val(data[8]);
	$('#concernHandleDescribe').removeAttr('readonly');
	$('#editConcernArea').show();
	$('#sureButton').show();
	$('#sureButton').unbind('click').bind('click',function(){
//		var $('#concernCreateTime').text(data[10]);
//		$('#concernCreator').text(data[9]);
//		$('#concernId').text(data[1]);
//		$('#concernName').text(data[2]);
		IntelligentRoadTest.concernAreaData[8] = String($('#concernHandleDescribe').val());
//		.replace(/\n/g,"#");
		IntelligentRoadTest.updateConcernArea(IntelligentRoadTest.concernAreaData);
		$('#editConcernArea').hide();
	});
//	return;
	
}
//更新关注区域
IntelligentRoadTest.updateConcernArea = function IntelligentRoadTest_updateConcernArea(data){
//	编号,名称,类型,创建者,创建时间,地市,经纬度集合,调优日志,RSRP均值7天变化,最大经度,最大纬度,最小经度,最小纬度,操作
	var id = data.id;
	var area_name = data.area_name;
	var gis_data_baidu = data.gis_data_baidu;
	var max_lng = data.max_longitude_baidu;
	var min_lng = data.min_longitude_baidu;
	var max_lat = data.max_latitude_baidu;
	var min_lat = data.min_latitude_baidu;
	var create_user = data.creator;
	var area_type = data.area_type;
	var create_time = data.create_time;
	var handle_time = data.handle_time;
	var handle_description = data.handle_description;
	var city = data.city;
	var bst_id = data.recent_base_statn_id;
	var cell_id = data.recent_cell_id;
	var cell_name = data.recent_cell_name;
	var rsrp = data.rsrp;
	var cover = data.cover;

	var ajaxData = {
		"id" : id,
		"area_name" : area_name,
		"city" : city,
		"gis_data_baidu" : gis_data_baidu,
		"max_longitude_baidu" : max_lng,
		"min_longitude_baidu" : min_lng,
		"max_latitude_baidu" : max_lat,
		"min_latitude_baidu" : min_lat,
        "area_type":area_type,
		"create_user" : create_user,
		"create_time" : create_time,
		"handle_time" : handle_time,
		"handle_description" : handle_description,
		"rsrp":rsrp,
        "cover":cover,
        "bst_id":bst_id,
        "cell_id":cell_id,
        "cell_name":cell_name,
	};
	var $ajax = $.ajax({
		type : 'post',
		data : ajaxData,
		url : 'pages_concernArea_ConcernArea_updateArea.action',
		cache : false,
		dataType : 'json',
		success : function(data) {
//			console.log(data.status);
			IntelligentRoadTest.queryAllConcernArea();
		},
		error : function(data, textStatus) {
			alert("更新关注区域失败");
		}
	});
}

IntelligentRoadTest.concernAreaDelete = function IntelligentRoadTest_concernAreaDelete(data){
    var ajaxData = {
        "id":data.id,
    };

    if(confirm("确定删除此条数据吗")){
        var $ajax = $.ajax({
            type: 'post',
            data: ajaxData,
            url: 'pages_concernArea_ConcernArea_deleteArea.action',
            cache: false,
            dataType: 'json',
            success: function(data){
//	        	console.log(data);
//	        	console.log(data.status);
                IntelligentRoadTest.queryAllConcernArea();
            },
            error: function(data,textStatus){

            }
        });
    }
}

function deleteConcernArea(imgHtml){
	
	//直接删除该条记录
	var imgTd = $(imgHtml).parent().parent();//查找到当前img所在的td
	var tdArr = $(imgTd).prevAll('td');//当前td之前所有的同辈td元素,顺序为表格顺序的倒序
	var data = [];
	$(tdArr).each(function(i){
		var tdChildrenDiv = $(this).find('div');
		if($(tdChildrenDiv).children('a').length>0){
			//存在a标签,数据为a标签的title
			var d = $(tdChildrenDiv).children('a').attr('title');
			data.push(d);
		}else{
			data.push($(tdChildrenDiv).text());
		}
	});
	data.reverse();
	var id = data[1];
	
	var ajaxData = {
		"id":id,
	};
	
	if(confirm("确定删除此条数据吗")){
		var $ajax = $.ajax({
	        type: 'post',
	        data: ajaxData,
	        url: 'pages_concernArea_ConcernArea_deleteArea.action',
	        cache: false,
	        dataType: 'json',
	        success: function(data){
//	        	console.log(data);
//	        	console.log(data.status);
	        	IntelligentRoadTest.queryAllConcernArea();
	        },
	        error: function(data,textStatus){
	        	
	        }
	    });
	}
	
	
	
//	console.log("删除关注区域");
}
//调优日志点击，查看调优日志
IntelligentRoadTest.concernAreaLog = function IntelligentRoadTest_concernAreaLog(data){
	$('#concernCreateTime').text(data.create_time);
	$('#concernCreator').text(data.creator);
	$('#concernId').text(data.id);
	$('#concernName').text(data.area_name);
	$('#concernType').text(data.area_type);
//	$('#concernHandleDescribe').val(data[7].replace(/#/g,"\n"));
	$('#concernHandleDescribe').val(data.handle_description);
	$('#concernHandleDescribe').attr('readonly','readonly');
	
	$('#sureButton').hide();
	$('#editConcernArea').show();
}
//7天rsrp均值点击，查看7天rsrp均值变化
IntelligentRoadTest.concernAreaSevenLine = function IntelligentRoadTest_concernAreaSevenLine(data,thisHtml){
//	$(".lineImg").attr("src","../IntelligentRoadTest/images/line.png");
//	$(this).attr("src","../IntelligentRoadTest/images/lineClick.png");
	var minLngNum = gridLngNum(data.min_longitude_baidu,20);
	var maxLngNum = gridLngNum(data.max_longitude_baidu,20);
	var minLatNum = gridLatNum(data.min_latitude_baidu,20);
	var maxLatNum = gridLatNum(data.max_latitude_baidu,20);
	var endDate = new Date(IntelligentRoadTest.day.substring(0,4),parseInt(IntelligentRoadTest.day.substring(4,6))-1,IntelligentRoadTest.day.substring(6));
	IntelligentRoadTest.sevenIndex = 0;
	IntelligentRoadTest.sevenLineData = null;
	IntelligentRoadTest.sevenLineData = [];
//	IntelligentRoadTest.sevenLineData.seriesData = [];
	for(var p=0;p<7;p++){
		var date = new Date(endDate.getTime()-p*1000*60*60*24);
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		if(month<10){
			month = "0"+String(month);
		}else{
			month = String(month);
		}
		
		if(day<10){
			day = "0"+String(day);
		}else{
			day = String(day);
		}
		var time = year+month+day;
		var keyprefix = time+"_"+"20_0_";
		var len = 100000;
		var rowKeyArray = new Array();
		for(var i=minLngNum;i<=maxLngNum;i++){
			for(var j=minLatNum;j<=maxLatNum;j++){
				var rowkey = keyprefix + String(i*len+j);
				rowKeyArray.push(rowkey);
			}
		}
		var keyListStr = rowKeyArray.join(",");
		rowKeyArray = null;
//		var startRow = IntelligentRoadTest.day+"_"+"20_0_"+startGridNum;
//		var endRow = IntelligentRoadTest.day+"_"+"20_0_"+endGridNum;
//		var cloumnsList = "i:a1,i:a11,i:a12,i:a13,i:a14,i:a15,i:a16,i:a18,i:a22,i:a26,i:a27,i:a28";
//		var list = ["IntelligentRoadTest_06_grid","STARTROW:"+startRow,"ENDROW:"+endRow,"COLUMNLIST:"+cloumnsList];
		var cloumnsList = "i:a1,i:a11,i:a12,i:a13,i:a14,i:a15,i:a16,i:a18,i:a19,i:a22,i:a26,i:a27,i:a28,i:a29,i:a30,i:a31,i:a32,i:a33,i:a34,i:a35,i:a36,i:a37,i:a38";
		var list = ["IntelligentRoadTest_06_boxSelectGrid","KEYLIST:"+keyListStr,"COLUMNLIST:"+cloumnsList];
		var progressBarSqls=[];
		progressBarSqls.push(list);
		var functionlist = [IntelligentRoadTest.filterAreaGridDataForSevenLine];
		var dataBase = [4];
		progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase,[[data,time]]);
	}
	
}

IntelligentRoadTest.filterAreaGridDataForSevenLine = function (data,paraArr){
	var polygonData = paraArr[0];
	var time = paraArr[1];
	var gis_data = polygonData.gis_data_baidu.split("@");
	var pointArr = [];
	for(var i=0;i<gis_data.length;i++){
		var pointA = gis_data[i].split(",");
		var point = new BMap.Point(pointA[0],pointA[1]);
		pointArr.push(point);
	}
	var styleOptions = {
	        strokeColor:"red",    //边线颜色。
	        //fillColor:"red",      //填充颜色
	        strokeWeight: 1,       //边线的宽度，以像素为单位。
	        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
	        fillOpacity: 0.3,      //填充的透明度，取值范围0 - 1。
	        strokeStyle: 'dashed' //边线的样式，solid或dashed。
	}
//	var concernPolygon = new BMap.Polygon(pointArr,styleOptions);
	
	
	var result = data.result;
	//将不在框选多边形内的栅格去掉
	var avgSum = 0;
	var allSum = 0;
	var cnt = 0;
	var count = 0;
	var gridCount = 0;
	
	for(var i=0;i<result.length;i++){
		var gridMidLng = result[i][3];// i:a1,i:a11,i:a12,i:a13,i:a14,i:a15,i:a16,i:a18,i:a19,i:a22,i:a26,i:a27,i:a28,i:a29,i:a30,i:a31,i:a32,i:a33,i:a34,i:a35,i:a36,i:a37,i:a38
		var gridMidLat = result[i][4];
		var point = new BMap.Point(gridMidLng,gridMidLat);
		var polygon = {};
		polygon.points = pointArr;
		if(BMapLib.GeoUtils.isPointInPolygonForNOCE(point, polygon)){
			count++;
			avgSum += parseFloat(result[i][11]); // rsrp_140_0_avg
			allSum += parseFloat(result[i][8]); // rsrp_140_0_cnt
			cnt += parseInt(result[i][9]); // rsrp_105_cnt
			gridCount += parseInt(result[i][12]); //Grid_Rec_Cnt
		}
	}
	var rsrpAvg = null;//parseFloat(avgSum/count).toFixed(2);
	var cover = null;//parseFloat(cnt/allSum*100).toFixed(2);
	
	if(count==0){
		rsrpAvg = '-';
		cover = '-';
	}else{
		rsrpAvg = parseFloat(avgSum/count).toFixed(2);
		cover = parseFloat(cnt/allSum*100).toFixed(2);
	}
	var da = {};
	da['time'] = time;
	da['avg'] = rsrpAvg;
	da['cover'] = cover;
	
	IntelligentRoadTest.sevenLineData.push(da);
	
//	IntelligentRoadTest.sevenLineData.xAxisData.push(time);
//	IntelligentRoadTest.sevenLineData.seriesData.push(rsrpAvg);
	IntelligentRoadTest.sevenIndex++;
	data = null;
	if(IntelligentRoadTest.sevenIndex==7){
		IntelligentRoadTest.sevenLineData.sort(function(a,b){
			return parseInt(a.time)-parseInt(b.time);
		});
		var xAxisData = [];
		var seriesData = [];
		var coverData = [];
		for(var i = 0;i<IntelligentRoadTest.sevenLineData.length;i++){
			xAxisData.push(IntelligentRoadTest.sevenLineData[i].time.substring(4));
			seriesData.push(IntelligentRoadTest.sevenLineData[i].avg);
			coverData.push(IntelligentRoadTest.sevenLineData[i].cover);
		}
		$('#sevenLineDiv').show();
		
		IntelligentRoadTest.sevenLineEchart = echarts.init(document.getElementById(IntelligentRoadTest.sevenLineEchartDiv));
		var option = {
	        title: {
	            text: '7天变化',
	            x: 'center',
	            textStyle: {
	                fontSize: 14,
	                fontWeight: '400',
	                color: '#686c78'
	            }
	        },
	        legend:{
	        	left:'center',
	        	top:'7%',
	        	data:['RSRP','覆盖率'],
	        },
			tooltip: {
				trigger: 'axis',
				axisPointer:{
				    type:'shadow'
				},
			},
			grid: { //图表在div的布局控制
				top: '15%',
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [{ //X轴样式
				type: 'category',
				boundaryGap: true,
				axisLabel: {
					interval:0,
//					rotate:10,
					align:'center',
				},
				axisLine: {
	                show: true,
	                lineStyle:{
	                    color: '#686c78',
	                }
	            },
	            axisTick:{
	            	show:true,
	            	alignWithLabel:true,
	            },
				data:xAxisData,
			}],
			yAxis: [{ //Y轴样式
				type: 'value',
				name:'db',
				scale:true,
				axisLine: {
					show: true,
					lineStyle:{
	                    color: '#686c78',
	                },
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show:false,
					lineStyle: {
						color: '#EAEEF7',
					}
				}
			},
			{ //Y轴样式
				type: 'value',
				name:'%',
				scale:true,
				axisLine: {
					show: true,
					lineStyle:{
	                    color: '#686c78',
	                },
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					show:false,
					lineStyle: {
						color: '#EAEEF7',
					}
				}
			}
			],
			series: [{ //图表数据样式
				type: 'line',
				symbolSize: 6,
				name: "RSRP",
				smooth: true,
				lineStyle: {
					normal: {
						color: '#55b7f1',
						width: 2,
					}
				},
				itemStyle: {
					normal: {
						color: "#55b7f1",
						borderColor: "#55b7f1",
					}
				},
				areaStyle: {
					normal: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
									offset: 0,
									color: '#D5ECFA' // 0% 处的颜色
								},
								{
									offset: 1,
									color: '#FFFFFF' // 100% 处的颜色
								}
							],
							globalCoord: false // 缺省为 false
						}
					},
				},
				data:seriesData
			},
			{ //图表数据样式
				type: 'line',
				symbolSize: 6,
				name: "覆盖率",
				smooth: true,
				yAxisIndex:1,
//				lineStyle: {
//					normal: {
//						color: '#55b7f1',
//						width: 2,
//					}
//				},
//				itemStyle: {
//					normal: {
//						color: "#55b7f1",
//						borderColor: "#55b7f1",
//					}
//				},
//				areaStyle: {
//					normal: {
//						color: {
//							type: 'linear',
//							x: 0,
//							y: 0,
//							x2: 0,
//							y2: 1,
//							colorStops: [{
//									offset: 0,
//									color: '#D5ECFA' // 0% 处的颜色
//								},
//								{
//									offset: 1,
//									color: '#FFFFFF' // 100% 处的颜色
//								}
//							],
//							globalCoord: false // 缺省为 false
//						}
//					},
//				},
				data:coverData
			}]
		};
		IntelligentRoadTest.sevenLineEchart.setOption(option);
		IntelligentRoadTest.sevenLineEchart.resize();
	}
	
	
}

IntelligentRoadTest.concernAreaPositiong = function IntelligentRoadTest_concernAreaPositiong(data){
//	console.log(data);
	
	if(IntelligentRoadTest.selectingBox){
		alert("您正在框选栅格，请先保存框选区域或者取消框选");
		return;
	}
	
//	if(IntelligentRoadTest.concernPolygon!=null){
//		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.concernPolygon);
//	}
	IntelligentRoadTest.hideConcernArea();
	$('#hideConcernArea').parent().show();
	
	var gis_data = data.gis_data_baidu.split("@");
	var pointArr = [];
	for(var i=0;i<gis_data.length;i++){
		var pointA = gis_data[i].split(",");
		var point = new BMap.Point(pointA[0],pointA[1]);
		pointArr.push(point);
	}
	var styleOptions = {
	        strokeColor:"red",    //边线颜色。
	        //fillColor:"red",      //填充颜色
	        strokeWeight: 1,       //边线的宽度，以像素为单位。
	        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
	        fillOpacity: 0.3,      //填充的透明度，取值范围0 - 1。
	        strokeStyle: 'dashed' //边线的样式，solid或dashed。
	}
	IntelligentRoadTest.concernPolygon = new BMap.Polygon(pointArr,styleOptions);
	IntelligentRoadTest.concernPolygonM = new BMap.Polygon(pointArr,styleOptions);
	IntelligentRoadTest.concernPolygonU = new BMap.Polygon(pointArr,styleOptions);
//	IntelligentRoadTest.concernPolygon.
	IntelligentRoadTest.concernPolygon.id = data.id;
	IntelligentRoadTest.concernPolygon.area_name = data.area_name;
	IntelligentRoadTest.concernPolygon.gis_data_baidu = data.gis_data_baidu;
	IntelligentRoadTest.concernPolygon.max_lng = data.max_longitude_baidu;
	IntelligentRoadTest.concernPolygon.min_lng = data.min_longitude_baidu;
	IntelligentRoadTest.concernPolygon.max_lat = data.max_latitude_baidu;
	IntelligentRoadTest.concernPolygon.min_lat = data.min_latitude_baidu;
	IntelligentRoadTest.concernPolygon.create_user = data.creator;
	IntelligentRoadTest.concernPolygon.create_time = data.create_time;
	IntelligentRoadTest.concernPolygon.handle_time = data.handle_time;
	IntelligentRoadTest.concernPolygon.handle_description = data.handle_description;
	IntelligentRoadTest.concernPolygon.city = data.city;
	IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.concernPolygon);
	
	IntelligentRoadTest.mapMobile.addOverlay(IntelligentRoadTest.concernPolygonM);
	IntelligentRoadTest.mapUnicom.addOverlay(IntelligentRoadTest.concernPolygonU);
	
	var mid_lng = (data.min_longitude_baidu+data.max_longitude_baidu)/2;
	var mid_lat = (data.min_latitude_baidu+data.max_latitude_baidu)/2;
	IntelligentRoadTest.map.setCenter(new BMap.Point(mid_lng,mid_lat));
	IntelligentRoadTest.centerAndZoomTimeout = setTimeout("IntelligentRoadTest.timeoutCenterAndZoom()",100);
	IntelligentRoadTest.drawPolylineTimeout = setTimeout("IntelligentRoadTest.drawPolyline()",200);
	if(IntelligentRoadTest.isThreeNetStatus){
		setTimeout(function(){
			IntelligentRoadTest.sectorCompentM.clear();
			IntelligentRoadTest.sectorCompentM.draw();
			IntelligentRoadTest.sectorCompentU.clear();
			IntelligentRoadTest.sectorCompentU.draw();
		},300);
	}
	
	var minLngNum = gridLngNum(data.min_longitude_baidu,20);
	var maxLngNum = gridLngNum(data.max_longitude_baidu,20);
	var minLatNum = gridLatNum(data.min_latitude_baidu,20);
	var maxLatNum = gridLatNum(data.max_latitude_baidu,20);
	var keyprefix = IntelligentRoadTest.day+"_"+"20_0_";
	var len = 100000;
	var rowKeyArray = new Array();
	for(var i=minLngNum;i<=maxLngNum;i++){
		for(var j=minLatNum;j<=maxLatNum;j++){
			var rowkey = keyprefix + String(i*len+j);
			rowKeyArray.push(rowkey);
		}
	}
	var keyListStr = rowKeyArray.join(",");
	rowKeyArray = null;
//	var startRow = IntelligentRoadTest.day+"_"+"20_0_"+startGridNum;
//	var endRow = IntelligentRoadTest.day+"_"+"20_0_"+endGridNum;
//	var cloumnsList = "i:a1,i:a11,i:a12,i:a13,i:a14,i:a15,i:a16,i:a18,i:a22,i:a26,i:a27,i:a28";
//	var list = ["IntelligentRoadTest_06_grid","STARTROW:"+startRow,"ENDROW:"+endRow,"COLUMNLIST:"+cloumnsList];
	var cloumnsList = "i:a1,i:a11,i:a12,i:a13,i:a14,i:a15,i:a16,i:a18,i:a19,i:a22,i:a26,i:a27,i:a28,i:a29,i:a30,i:a31,i:a32,i:a33,i:a34,i:a35,i:a36,i:a37,i:a38";
	var list = ["IntelligentRoadTest_06_boxSelectGrid","KEYLIST:"+keyListStr,"COLUMNLIST:"+cloumnsList];
	var progressBarSqls=[];
	progressBarSqls.push(list);
	var functionlist = [IntelligentRoadTest.filterAreaGridData];
	var dataBase = [4];
	progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase);
//	$('#BoxSelection').text('框选栅格');
	//图例全部呈现
	IntelligentRoadTest.initColorBarAll();
	IntelligentRoadTest.concerningArea = true;
	
}

IntelligentRoadTest.filterAreaGridData = function IntelligentRoadTest_filterAreaGridData(data){
//	var result = callBackChangeData(data);
	var result = data.result;
	var polygonGridData = [];
	//将不在框选多边形内的栅格去掉
	var avgSum = 0;
	var allSum = 0;
	var cnt = 0;
	var count = 0;
	var gridCount = 0;
	var grid_dx_count = 0;
	var grid_dx_sum = 0;
	var grid_dx_105_count = 0;
	var grid_yd_count = 0;
	var grid_yd_sum = 0;
	var grid_yd_105_count = 0;
	var grid_lt_count = 0;
	var grid_lt_sum = 0;
	var grid_lt_105_count = 0;
	var month_relate = null;
	
	for(var i=0;i<result.length;i++){
		var gridMidLng = result[i][3];// i:a1,i:a11,i:a12,i:a13,i:a14,i:a15,i:a16,i:a18,i:a19(8),i:a22,i:a26,i:a27,i:a28,i:a29(13),i:a30
		//,i:a31(15),i:a32,i:a33,i:a34,i:a35,i:a36,i:a37,i:a38
		var gridMidLat = result[i][4];
		var point = new BMap.Point(gridMidLng,gridMidLat);
		if(BMapLib.GeoUtils.isPointInPolygon(point, IntelligentRoadTest.concernPolygon)){
			polygonGridData.push(result[i]);
			count++;
			avgSum += parseFloat(result[i][11]); // rsrp_140_0_avg
			allSum += parseFloat(result[i][8]); // rsrp_140_0_cnt
			cnt += parseInt(result[i][9]); // rsrp_105_cnt
			gridCount += parseInt(result[i][12]); //Grid_Rec_Cnt
			
			grid_dx_count += parseInt(result[i][13]==null?0:result[i][13]);
			grid_dx_105_count += parseInt(result[i][14]==null?0:result[i][14]);
			grid_dx_sum += parseFloat(result[i][15]==null?0:result[i][15]);
			grid_yd_count += parseInt(result[i][16]==null?0:result[i][16]);
			grid_yd_105_count += parseInt(result[i][17]==null?0:result[i][17]);
			grid_yd_sum += parseFloat(result[i][18]==null?0:result[i][18]);
			grid_lt_count += parseInt(result[i][19]==null?0:result[i][19]);
			grid_lt_105_count += parseInt(result[i][20]==null?0:result[i][20]);
			grid_lt_sum += parseFloat(result[i][21]==null?0:result[i][21]);
			if(result[i][22]!=null){//month_relate
				if(month_relate==null){
					month_relate = result[i][22];
				}else if(month_relate!=result[i][22]&&month_relate.indexOf(result[i][22])<0){
					month_relate = month_relate+"_"+result[i][22];
				}
				
			}
		}
	}
	var rsrpAvg = avgSum/count;
	var cover = cnt/allSum;
	var dx_rsrp = grid_dx_sum/grid_dx_count;
	var yd_rsrp = grid_yd_sum/grid_yd_count;
	var lt_rsrp = grid_lt_sum/grid_lt_count;
	var dx_cover = grid_dx_105_count/grid_dx_count;
	var yd_cover = grid_yd_105_count/grid_yd_count;
	var lt_cover = grid_lt_105_count/grid_lt_count;
	
	if(grid_dx_sum==0||grid_dx_count==0){
		dx_rsrp = null;
	}
	if(grid_yd_sum==0||grid_yd_count==0){
		yd_rsrp = null;
	}
	if(grid_lt_sum==0||grid_lt_count==0){
		lt_rsrp = null;
	}
	if(grid_dx_105_count==0||grid_dx_count==0){
		dx_cover = null;
	}
	if(grid_yd_105_count==0||grid_yd_count==0){
		yd_cover = null;
	}
	if(grid_lt_105_count==0||grid_lt_count==0){
		lt_cover = null;
	}
	
	if(count==0){
		rsrpAvg = null;
		cover = null;
		dx_rsrp = null;
		yd_rsrp = null;
		lt_rsrp = null;
		dx_cover = null;
		yd_cover = null;
		lt_cover = null;
	}
	
	IntelligentRoadTest.concernPolygon.type = "boxConcernSelect";
	IntelligentRoadTest.concernPolygon.rsrpAvg = rsrpAvg;//parseFloat(rsrpAvg).toFixed(2);
	IntelligentRoadTest.concernPolygon.cover = cover;//parseFloat(cover).toFixed(2);
	IntelligentRoadTest.concernPolygon.count = count;
	IntelligentRoadTest.concernPolygon.dx_rsrp = dx_rsrp;
	IntelligentRoadTest.concernPolygon.yd_rsrp = yd_rsrp;
	IntelligentRoadTest.concernPolygon.lt_rsrp = lt_rsrp;
	IntelligentRoadTest.concernPolygon.dx_cover = dx_cover;
	IntelligentRoadTest.concernPolygon.yd_cover = yd_cover;
	IntelligentRoadTest.concernPolygon.lt_cover = lt_cover;
	IntelligentRoadTest.concernPolygon.month_relate = month_relate;
	IntelligentRoadTest.concernPolygon.gridCount = gridCount;
		
	data.result = polygonGridData;
	IntelligentRoadTest.showGridByCanv(data);
	data = null;
	if($('#sector').is(':checked')){
		//为了防止扇区在栅格下面，先画完栅格再画基站
		if(IntelligentRoadTest.sectorCompent!=null){
			IntelligentRoadTest.sectorCompent.MapZoomAndDragEnd({},IntelligentRoadTest.sectorCompent);
		}
//		//增加移动联通地图基站重绘
//		if(IntelligentRoadTest.isThreeNetStatus){
//			if(IntelligentRoadTest.sectorCompentM!=null){
//				IntelligentRoadTest.sectorCompentM.MapZoomAndDragEnd({},IntelligentRoadTest.sectorCompentM);
//			}
//			
//			if(IntelligentRoadTest.sectorCompentU!=null){
//				IntelligentRoadTest.sectorCompentU.MapZoomAndDragEnd({},IntelligentRoadTest.sectorCompentU);
//			}
//		}
	}
}

IntelligentRoadTest.clearConcernArea = function IntelligentRoadTest_clearConcernArea(){
	IntelligentRoadTest.hideConcernArea();
}

IntelligentRoadTest.loadConcenrnAreaNewData = function IntelligentRoadTest_loadConcenrnAreaNewData(data){
	var gis_data = data.gis_data_baidu.split("@");
	var pointArr = [];
	for(var i=0;i<gis_data.length;i++){
		var pointA = gis_data[i].split(",");
		var point = new BMap.Point(pointA[0],pointA[1]);
		pointArr.push(point);
	}
//	var styleOptions = {
//	        strokeColor:"red",    //边线颜色。
//	        //fillColor:"red",      //填充颜色
//	        strokeWeight: 1,       //边线的宽度，以像素为单位。
//	        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
//	        fillOpacity: 0.3,      //填充的透明度，取值范围0 - 1。
//	        strokeStyle: 'dashed' //边线的样式，solid或dashed。
//	}
//	IntelligentRoadTest.concernPolygon = new BMap.Polygon(pointArr,styleOptions);
////	IntelligentRoadTest.concernPolygon.
//	IntelligentRoadTest.concernPolygon.id = data.id;
//	IntelligentRoadTest.concernPolygon.area_name = data.area_name;
//	IntelligentRoadTest.concernPolygon.gis_data_baidu = data.gis_data_baidu;
//	IntelligentRoadTest.concernPolygon.max_lng = data.max_longitude_baidu;
//	IntelligentRoadTest.concernPolygon.min_lng = data.min_longitude_baidu;
//	IntelligentRoadTest.concernPolygon.max_lat = data.max_latitude_baidu;
//	IntelligentRoadTest.concernPolygon.min_lat = data.min_latitude_baidu;
//	IntelligentRoadTest.concernPolygon.create_user = data.creator;
//	IntelligentRoadTest.concernPolygon.create_time = data.create_time;
//	IntelligentRoadTest.concernPolygon.handle_time = data.handle_time;
//	IntelligentRoadTest.concernPolygon.handle_description = data.handle_description;
//	IntelligentRoadTest.concernPolygon.city = data.city;
//	IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.concernPolygon);
	
	var mid_lng = (data.max_lng+data.min_lng)/2;
	var mid_lat = (data.max_lat+data.min_lat)/2;
	IntelligentRoadTest.map.setCenter(new BMap.Point(mid_lng,mid_lat));
	
	var minLngNum = gridLngNum(data.min_lng,20);
	var maxLngNum = gridLngNum(data.max_lng,20);
	var minLatNum = gridLatNum(data.min_lat,20);
	var maxLatNum = gridLatNum(data.max_lat,20);
	var keyprefix = IntelligentRoadTest.day+"_"+"20_0_";
	var len = 100000;
	var rowKeyArray = new Array();
	for(var i=minLngNum;i<=maxLngNum;i++){
		for(var j=minLatNum;j<=maxLatNum;j++){
			var rowkey = keyprefix + String(i*len+j);
			rowKeyArray.push(rowkey);
		}
	}
	var keyListStr = rowKeyArray.join(",");
	rowKeyArray = null;
//	var startRow = IntelligentRoadTest.day+"_"+"20_0_"+startGridNum;
//	var endRow = IntelligentRoadTest.day+"_"+"20_0_"+endGridNum;
//	var cloumnsList = "i:a1,i:a11,i:a12,i:a13,i:a14,i:a15,i:a16,i:a18,i:a22,i:a26,i:a27,i:a28";
//	var list = ["IntelligentRoadTest_06_grid","STARTROW:"+startRow,"ENDROW:"+endRow,"COLUMNLIST:"+cloumnsList];
	var cloumnsList = "i:a1,i:a11,i:a12,i:a13,i:a14,i:a15,i:a16,i:a18,i:a19,i:a22,i:a26,i:a27,i:a28,i:a29,i:a30,i:a31,i:a32,i:a33,i:a34,i:a35,i:a36,i:a37,i:a38";
	var list = ["IntelligentRoadTest_06_boxSelectGrid","KEYLIST:"+keyListStr,"COLUMNLIST:"+cloumnsList];
	var progressBarSqls=[];
	progressBarSqls.push(list);
	var functionlist = [IntelligentRoadTest.filterAreaGridData];
	var dataBase = [4];
	progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase);
//	$('#BoxSelection').text('框选栅格');
	//图例全部呈现
	IntelligentRoadTest.initColorBarAll();
	IntelligentRoadTest.concerningArea = true;
}


/*******************************************************************************
 * @funcname drawPolyline
 * @funcdesc 地图画虚框
 * @return {null}
 * @author 梁杰禹
 * @create 20170319
 ******************************************************************************/
IntelligentRoadTest.drawPolyline = function IntelligentRoadTest_drawPolyline() {

	for(var i = 0 ; i< IntelligentRoadTest.linkImgPoints.length;i++){
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.linkImgPoints[i]);
    }
	
    IntelligentRoadTest.linkImgPoints=[];
	if (IntelligentRoadTest.focusPolyline != null) {
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.focusPolyline);
		IntelligentRoadTest.focusPolyline = null;
	}
	//正在三网的状态时，画出聚焦框
	if(IntelligentRoadTest.isThreeNetStatus){
		var bs = null;
		if (!IntelligentRoadTest.mobileIsHide) {
			bs = IntelligentRoadTest.mapMobile.getBounds(); // 获取可视区域
		} else {
			bs = IntelligentRoadTest.mapUnicom.getBounds(); // 获取可视区域
		}

		if(bs!=null){
			var bssw = bs.getSouthWest(); // 可视区域左下角
			var bsne = bs.getNorthEast(); // 可视区域右上角
			var minLng = bssw.lng;
			var minLat = bssw.lat;
			var maxLng = bsne.lng;
			var maxLat = bsne.lat;
			if (minLng == maxLng) {

				IntelligentRoadTest.drawPolylineTimeout = setTimeout("IntelligentRoadTest.drawPolyline();", 200);
				return;
			}
			var pStart=[{"lng":minLng,"lat":minLat},{"lng":maxLng,"lat":minLat},{"lng":maxLng,"lat":maxLat},{"lng":minLng,"lat":maxLat}];
			IntelligentRoadTest.focusPolyline = new BMap.Polyline([
					new BMap.Point(minLng, minLat), new BMap.Point(maxLng, minLat),
					new BMap.Point(maxLng, maxLat), new BMap.Point(minLng, maxLat),
					new BMap.Point(minLng, minLat) ], {
				strokeColor : "red",
				strokeStyle : 'dashed',
				strokeWeight : 2,
				strokeOpacity : 0.5
			});
			IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.focusPolyline);
			IntelligentRoadTest.linkImg(pStart);
			clearTimeout(IntelligentRoadTest.drawPolylineTimeout);
		}
	}
	
}

/**
 * 传入四个角的经纬度，为虚框添加四个角的图片
 */
IntelligentRoadTest.linkImg=function IntelligentRoadTest_linkImg(pStart){
 var points = [
               // 四个点的坐标
           new BMap.Point(pStart[0].lng,pStart[0].lat),
           new BMap.Point(pStart[1].lng,pStart[1].lat),
           new BMap.Point(pStart[2].lng,pStart[2].lat),
           new BMap.Point(pStart[3].lng,pStart[3].lat)
       ];
 //opersComp   IntelligentRoadTest
       var images = [
               "../js/opersComp/images/com_4.png",
               "../js/opersComp/images/com_3.png",
               "../js/opersComp/images/com_2.png",
               "../js/opersComp/images/com_1.png"
       ];
       var icons =[];
       for(var k = 0;k<images.length;k++){
           icons[k] = new BMap.Icon(images[k],new BMap.Size(48,50));
       }
       for(var i = 0 ; i< points.length;i++){
           var marker = new BMap.Marker(points[i] ,{icon :icons[i]});
//           if(i==0){
//        	   marker.setOffset(new BMap.Size(3,-2));
//           }else if(i==1){
//        	   marker.setOffset(new BMap.Size(-3,-2));
//           }else if(i==2){
//        	   marker.setOffset(new BMap.Size(-3,2));
//           }else if(i==3){
//        	   marker.setOffset(new BMap.Size(2,4));
//           }
           
           IntelligentRoadTest.linkImgPoints.push(marker);
           IntelligentRoadTest.map.addOverlay(marker);
       }

}

IntelligentRoadTest.timeoutCenterAndZoom = function IntelligentRoadTest_timeoutCenterAndZoom(){
	var zoom = IntelligentRoadTest.map.getZoom();
	IntelligentRoadTest.mapMobile.setZoom(zoom);//设置地图级别
	IntelligentRoadTest.mapUnicom.setZoom(zoom);//设置地图级别
	
	var centerPoint = IntelligentRoadTest.map.getCenter();
	IntelligentRoadTest.mapMobile.setCenter(centerPoint);//设置中心点坐标
	IntelligentRoadTest.mapUnicom.setCenter(centerPoint);//设置中心点坐标
	clearTimeout(IntelligentRoadTest.centerAndZoomTimeout);
// if(OpersComp.objectType==3||OpersComp.objectType==4||OpersComp.objectType==5){
//	IntelligentRoadTest.drawPolyline();
	//基站渲染
//	if () {
//		bMapUtil.sectorShow();
//	}
}

//查询dt列表
IntelligentRoadTest.queryAllDTList = function IntelligentRoadTest_queryAllDTList(name){
	var list = [];
	if(name==undefined){
		list = ["IntelligentRoadTest_18_dtTableList"];
	}else{
		list = ["IntelligentRoadTest_18_dtTableListSearch"];
		list.push("NAME:"+name);
	}
	var city = $('#cityList_3_id').text().replace('市','');
	if(city=='全省'||city==''){
		list.push("CITY:");
	}else{
		list.push("CITY: and city = '"+city+"'");
	}
	
	var username = $('#headerUserForm_a').text().trim();
	list.push("USERNAME:"+username);
	
	var clnObj={
    		clnCssArray:[
    		             {clnNum:7,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:8,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:9,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:10,clnCss:["cln",["clickShowModal"]]},
    		             ],
    		functionArray:[
//    		               {funCln:10,funtion:"IntelligentRoadTest.areaPositioning();",funType:1},
    		               {funCln:7,funtion:"IntelligentRoadTest.dtCircle();",funType:1},
    		               {funCln:8,funtion:"IntelligentRoadTest.dtGrid();",funType:1},
    		               {funCln:9,funtion:"IntelligentRoadTest.dtFileUpload();",funType:1},
    		               {funCln:10,funtion:"IntelligentRoadTest.dtDelete();",funType:1},
    		               ],
//    		subNotArray:[10]
			subArray:[{clnNum:10,value:1}]
    };
	var tableHead = "编号,路测名称,路测时间,上传成功时间,上传者,地市,路测描点,路测栅格化,文件下载,文件删除";
//	var tableHead = "编号,路测名称,路测时间,上传成功时间,上传者,地市,操作1,操作2";

	var fixObj={
			fixRow:1,
		};
	var tableObject={
			divId:"DTTable",
			tableId:"DTTableId",
			tableHead:tableHead,
//			Data:data,
			clnObj:clnObj,
			fixObj:fixObj,
			dataType:3,
			sql:list,
			sortFlag:1,
			sortObj:{sortColumn:"create_time",sortType:"desc"},
			pageObj:{pageFlag:0}
	    	};
	IntelligentRoadTest.DTTable = new TableToolsNewTwo();
	IntelligentRoadTest.DTTable.tableObject = tableObject;
	IntelligentRoadTest.DTTable.submit(tableObject);
	
}
//描点
IntelligentRoadTest.dtCircle = function IntelligentRoadTest_dtCircle(data){
//	console.log(data);
	var dt_id = data.id;
	var mid_lng = data.center_longitude_baidu;
	var mid_lat = data.center_latgitude_baidu;
	IntelligentRoadTest.map.setCenter(new BMap.Point(mid_lng,mid_lat));
	
	var list = ["IntelligentRoadTest_19_dtDetailCircle","DTID:"+dt_id];
	var progressBarSqls=[];
	progressBarSqls.push(list);
	var functionlist = [IntelligentRoadTest.dtCircleDraw];
	var dataBase = [3];
	progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase,[data]);
}

//栅格
IntelligentRoadTest.dtGrid = function IntelligentRoadTest_dtGrid(data){
//	console.log(data);
	var dt_id = data.id;
	var mid_lng = data.center_longitude_baidu;
	var mid_lat = data.center_latgitude_baidu;
	IntelligentRoadTest.map.setCenter(new BMap.Point(mid_lng,mid_lat));
	
	var list = ["IntelligentRoadTest_20_dtDetailGrid","DTID:"+dt_id];
	var progressBarSqls=[];
	progressBarSqls.push(list);
	var functionlist = [IntelligentRoadTest.dtGridDraw];
	var dataBase = [3];
	progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase,[data]);
}

//下载文件
IntelligentRoadTest.dtFileUpload = function IntelligentRoadTest_dtFileUpload(data){
//	console.log(data);
	var form = $("<form>");   //定义一个form表单
	    form.attr('style', 'display:none');   //在form表单中添加查询参数 
	    form.attr('target', '');
	    form.attr('method', 'post');
	    //form.attr('action', 'pages_dtUpload_DtUpload_downloadFile.action');
        form.attr('action', 'pages_dtUpload_DtUpload_downloadFileFromDb.action');
	    creator = '<textarea name="creator">'+data["creator"]+'</textarea>';
	    createTime = '<textarea name="createTime">'+data["create_time"]+'</textarea>';
	    id = '<textarea name="id">'+data["id"]+'</textarea>';
	   
	    form.append(creator);
	    form.append(createTime);
	    form.append(id);
	   
	    $('body').append(form);  //将表单放置在web中
	    form.submit();
	    form.remove();
}

//删除记录
IntelligentRoadTest.dtDelete = function IntelligentRoadTest_dtDelete(data){
//	console.log(data);
	//只有上传者才能删除文件
	if(data.iscandelete!=undefined){
		return;
	}
//	console.log(data["id"]+""+data["create_time"]+""+data["creator"]);
	var ajaxData = {
			"id":data["id"],
			"createTime":data["create_time"],
			"creator":data["creator"],
		};
	  if(confirm("确定删除此条数据？")) {
		  var $ajax = $.ajax({
		        type: 'post',
		        data: ajaxData,

		       // url: 'pages_dtUpload_DtUpload_deleteFile.action',
              url: 'pages_dtUpload_DtUpload_deleteFileFromDB.action',
		        cache: false,
		        dataType: 'json',
		        success: function(data){
//		        	console.log(data);
		        	IntelligentRoadTest.queryAllDTList();
//		        	console.log("成功");
		        	
		        },
		        error: function(data,textStatus){
		        	console.log("删除dt文件失败");
		        }
		    });
	  }else{
		  
	  }
}

//路测数据描点
IntelligentRoadTest.dtCircleDraw = function IntelligentRoadTest_dtCircleDraw(data,dtObject){
	var result = callBackChangeData(data);
	data = null;
	IntelligentRoadTest.isShowGrid = false;
//	console.log(result);
	IntelligentRoadTest.GridMap.clear();
	if(IntelligentRoadTest.isThreeNetStatus){
		IntelligentRoadTest.GridMapM.clear();
		IntelligentRoadTest.GridMapU.clear();
	}
	
//	IntelligentRoadTest.GridMapCircle.clear();
	IntelligentRoadTest.GridMapCircleData = null;
	IntelligentRoadTest.GridMapCircleDataArr = null;
	IntelligentRoadTest.GridMapCircleData = [];
	IntelligentRoadTest.GridMapCircleDataArr = [];
	for(var i=0;i<result.length;i++){
		var lng = result[i].longitude_baidu;
		var lat = result[i].latitude_baidu;
//		if(i==0){
//			IntelligentRoadTest.map.setCenter(new BMap.Point(lng,lat));
//		}
		var rsrp = result[i].main_rsrp;
		var sector = result[i].sector;
		var circleData = [lng,lat,rsrp];
		var circleArr = [lng,lat,dtObject.dt_name,rsrp];
		IntelligentRoadTest.GridMapCircleData.push(circleData);
		IntelligentRoadTest.GridMapCircleDataArr.push(circleArr);
	}
	
	var DTData = IntelligentRoadTest.GridMapCircleData;
	for(var j=0;j<IntelligentRoadTest.colorBarArr.length;j++){
		DTData = IntelligentRoadTest.ClearDtData(DTData,IntelligentRoadTest.colorBarArr[j]);
	}
//	IntelligentRoadTest.GridMapCircle.drawCircle(DTData);
	IntelligentRoadTest.GridMap.drawCircle(DTData);
	DTData = null;
	
	
}

//路测数据栅格
IntelligentRoadTest.dtGridDraw = function IntelligentRoadTest_dtCircleDraw(data,dtObject){
	var result = callBackChangeData(data);
//	console.log(result);
	data = null;
	IntelligentRoadTest.isShowGrid = true;
	IntelligentRoadTest.isShowDTGrid = true;
	//清除描点数据
//	IntelligentRoadTest.GridMapCircle.clear();
	IntelligentRoadTest.GridMapCircleData = null;
	IntelligentRoadTest.GridMapCircleDataArr = null;
	IntelligentRoadTest.GridMapCircleData = [];
	IntelligentRoadTest.GridMapCircleDataArr = [];
	
	IntelligentRoadTest.GridMap.clear();
	IntelligentRoadTest.GridMapM.clear();
	IntelligentRoadTest.GridMapU.clear();
//	IntelligentRoadTest.GridCanArr = [];
	
//	IntelligentRoadTest.GridCanArr = null;
	IntelligentRoadTest.GridCanArrT = null;
	IntelligentRoadTest.GridCanArrM = null;
	IntelligentRoadTest.GridCanArrU = null;
	IntelligentRoadTest.CanArr = null;
	
	IntelligentRoadTest.GridCanArrT = [];
	IntelligentRoadTest.GridCanArrM = [];
	IntelligentRoadTest.GridCanArrU = [];
	IntelligentRoadTest.CanArr = [];
	
	for(var i=0;i<result.length;i++){
		var gridNum = result[i].grid_num;
		var rsrp_avg = result[i].main_rsrp;
		var lngAndLat = gridLngLat(gridNum, 20,100000);//[minLng, minLat, midLng, midLat, maxLng, maxLat];
//		var gridData = [lngAndLat[0],lngAndLat[1],lngAndLat[4],lngAndLat[5],rsrp_avg];
		var dataChe = [lngAndLat[0],lngAndLat[1],lngAndLat[4],lngAndLat[5],rsrp_avg,gridNum,dtObject.dt_name];
//		IntelligentRoadTest.GridCanArr.push(gridData);
		IntelligentRoadTest.CanArr.push(dataChe);
	}
	
	var CTData = IntelligentRoadTest.CanArr;
	for(var j=0;j<IntelligentRoadTest.colorBarArr.length;j++){
		CTData = IntelligentRoadTest.ClearData(CTData,IntelligentRoadTest.colorBarArr[j]);
	}
	IntelligentRoadTest.GridMap.draw(CTData);
	CTData = null;
	
	
}

//------------------------------------zwb代码开始 IntelligentRoadTest_loadmktCenterAreaTableData
//IntelligentRoadTest.loadJiZhanTableData = function loadJiZhanTableData(city,country,mktcenter,day){
//	var list = ["IntelligentRoadTest_09_jizhanTable","DAY:"+day,"CITY:"+city,"COUNTRY:"+country];
//	if(mktcenter == null||mktcenter ==''||mktcenter == undefined ){
//		list.push("MKTCENTER:");
//	}else{
//		list.push("MKTCENTER:"+"and MKTCENTER = '"+mktcenter+"'");
//	}
//	
//	var clnObj={
//    		clnCssArray:[
//    		             {clnNum:10,clnCss:["cln",["clickShowModal"]]},
//    		             {clnNum:13,clnCss:["cln",["clickShowModal"]]},
//    		             {clnNum:17,clnCss:["cln",["clickShowModal"]]},
//    		             {clnNum:18,clnCss:["cln",["clickShowModal"]]},
//    		             {clnNum:19,clnCss:["cln",["clickShowModal"]]}
//    		             ],
//    		functionArray:[
////    		               {funCln:10,funtion:"IntelligentRoadTest.areaPositioning();",funType:1},
//    		               {funCln:10,funtion:"IntelligentRoadTest.sectorPositioning();",funType:1},
//    		               {funCln:13,funtion:"IntelligentRoadTest.alarmPositioning();",funType:1},
//    		               {funCln:17,funtion:"IntelligentRoadTest.KPIPositioning();",funType:1},
//    		               {funCln:18,funtion:"IntelligentRoadTest.KPIPositioning();",funType:1},
//    		               {funCln:19,funtion:"IntelligentRoadTest.KPIPositioning();",funType:1}
//    		               ]
//    };
////	var tableHead = "日期,弱区id,最近站名,最近站址,最近基站ID,曾发生退服告警总次数,曾发生退服告警小区数," +
////	"未恢复退服告警小区数,弱覆盖处理措施,地市名称,地市ID,区县,区县ID,营服中心,营服中心ID,,4G切3G总次数,4G切3G总次数在本地网内排名," +
////	",4G总流量,本地网内4G流量排名,,感知优良率按天平均值(%),本地网内感知优良率排名,,,4G用户数按天平均值,本地网内4G用户数排名,最终排名累计值," +
////	"栅格最小经度,栅格最小纬度,栅格中心经度,栅格中心纬度,栅格最大经度,栅格最大纬度,中心点区域归属ID,主服务小区集合,GIS经纬度集合";
//	var tableHead = "站名,地市,地市ID,区县,区县ID,营服中心,营服中心ID," +
//	"基站ID,小区ID,小区名,小区归属ID,告警级别,退服告警数,小区状态,弱覆盖区域数,附近弱覆盖区域数,4G切3G总次数,4G总流量," +
//	"4G用户数,感知优良率,栅格数,弱覆盖区域集合,附近弱覆盖区域集合";
//
//	var fixObj={
//			fixRow:1,
//		};
//	var tableObject={
//			divId:"jzTable",
//			tableId:"jzTableId",
//			tableHead:tableHead,
////			Data:data,
//			clnObj:clnObj,
//			fixObj:fixObj,
//			dataType:3,
//			sql:list,
//			sortFlag:1,
//			sortObj:{sortColumn:"day",sortType:"asc"},
//			pageObj:{pageFlag:1,pageSize:100}
//	    	};
//	IntelligentRoadTest.areaTable = new TableToolsNewTwo();
//	IntelligentRoadTest.areaTable.tableObject = tableObject;
//	IntelligentRoadTest.areaTable.submit(tableObject);
//	
//	IntelligentRoadTest.areaTableIsEnd = setTimeout(IntelligentRoadTest.AreaTableTimeout,300);
//	setTimeout(function(){
////		$('#jzTable .pcbox_nr').show();
////		$('#jzTable .pbt_btn').hide();
//	},300);
//	
//
//}
/**********************************
 * @funcname IntelligentRoadTest.loadJiZhanTableData
 * @funcdesc 加载基站扇区表数据
 * @param {String} city (input optional)
 *  城市名
 * @param {String} country (input optional)
 *  区县名
 * @param {String} mktcenter (input optional)
 *  营服
 * @param {string} day (input optional)
 *  日期
 * @param {string} b (input optional)
 *  如果此参数为true则必须重新查询数据，否则根据参数是否和上次一样决定是否重新查询（一样：不查询 不一样：重新查询）
 * @return 返回加减后的日期字符串
 * @author 郑文彬
 * @create 20171110
 ***********************************/
IntelligentRoadTest.loadJiZhanTableData = function loadJiZhanTableData(city,country,mktcenter,day,b){
	//缓存的查询参数  如果参数一样则不进行查询
	if(b){}else
	if(IntelligentRoadTest.parameter_1==(city+country+mktcenter+day+IntelligentRoadTest.cell_id+IntelligentRoadTest.bst_id)){
		return;
	}
	$('#areaT ~ .loadImg').show();
	IntelligentRoadTest.parameter_1=city+country+mktcenter+day+IntelligentRoadTest.cell_id+IntelligentRoadTest.bst_id;
	var list = ["IntelligentRoadTest_09_jizhanTable","DAY:"+day,"CITY:"+city,"COUNTRY:"+country];
	if(mktcenter == null||mktcenter ==''||mktcenter == undefined ){
		list.push("MKTCENTER:");
	}else{
		list.push("MKTCENTER:"+"and MKTCENTER = '"+mktcenter+"'");
	}
	IntelligentRoadTest.list=list;
	IntelligentRoadTest.jizhanTablePaging(list,IntelligentRoadTest.cell_id,IntelligentRoadTest.bst_id);	
	$('#areaT ~ .loadImg').hide();
}
/**********************************
 * @funcname IntelligentRoadTest.jizhanTablePaging
 * @funcdesc 基站扇区表前端分页函数
 * @param {object} data (input optional)
 *  需要分页显示的总数据
 * @param {String} pageNum (input optional)
 *  第几页
 * @param {String} pageSize (input optional)
 *  每页大小
 * @param {string} clnValue (input optional)
 *  需要标记列的值
 * @author 郑文彬
 * @create 20171110
 ***********************************/
IntelligentRoadTest.jizhanTablePaging=function IntelligentRoadTest_jizhanTablePaging(list,cell_id,se_id){
//	$('#jzbox').show();
	IntelligentRoadTest.parameter_7=list+cell_id+se_id;
	var clnObj={
    		clnCssArray:[
    		             {clnNum:7,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:10,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:14,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:15,clnCss:["cln",["clickShowModal"]]},
    		             {clnNum:16,clnCss:["cln",["clickShowModal"]]}
    		             ],
    		functionArray:[
//    		               {funCln:10,funtion:"IntelligentRoadTest.areaPositioning();",funType:1},
    		               {funCln:7,funtion:"IntelligentRoadTest.sectorPositioning();",funType:1},
    		               {funCln:10,funtion:"IntelligentRoadTest.alarmPositioning();",funType:1},
    		               {funCln:14,funtion:"IntelligentRoadTest.KPIPositioning();",funType:1},
    		               {funCln:15,funtion:"IntelligentRoadTest.KPIPositioning();",funType:1},
    		               {funCln:16,funtion:"IntelligentRoadTest.KPIPositioning();",funType:1}
    		               ]
    };
//	var tableHead = "日期,弱区id,最近站名,最近站址,最近基站ID,曾发生退服告警总次数,曾发生退服告警小区数," +
//	"未恢复退服告警小区数,弱覆盖处理措施,地市名称,地市ID,区县,区县ID,营服中心,营服中心ID,,4G切3G总次数,4G切3G总次数在本地网内排名," +
//	",4G总流量,本地网内4G流量排名,,感知优良率按天平均值(%),本地网内感知优良率排名,,,4G用户数按天平均值,本地网内4G用户数排名,最终排名累计值," +
//	"栅格最小经度,栅格最小纬度,栅格中心经度,栅格中心纬度,栅格最大经度,栅格最大纬度,中心点区域归属ID,主服务小区集合,GIS经纬度集合";
	var tableHead = "站名,地市,区县,营服中心," +
	"基站ID,小区ID,小区名,小区归属ID,告警级别,退服告警数,小区状态,弱覆盖区域数,附近弱覆盖区域数,4G切3G总次数,4G总流量," +
	"4G用户数,感知优良率,栅格数,弱覆盖区域集合,附近弱覆盖区域集合";

	var fixObj={
			fixRow:1,
			fixClnObj:{
				fixCln:2,
				tableId:'fixJz'
			}
		};
	var tableObject={
			divId:"jzTable",
			tableId:"jzTableId",
			tableHead:tableHead,
//			Data:dataT,
			clnObj:clnObj,
			fixObj:fixObj,
			dataType:3,
			sql:list,
			sortFlag:1,
			sortObj:{sortColumn:"day",sortType:"asc"},
			pageObj:{pageFlag:1,pageSize:100},
			frontFlag:1,
			scrollObj:{clnNums:[5,6],clnValues:[se_id,cell_id]}
//			scrollObj:{clnNums:[5,6],clnValues:['480837','17']}
//			scrollObj:{clnNums:[0],clnValues:[120]}
	    	};
	IntelligentRoadTest.locationRowObj=tableObject;
	IntelligentRoadTest.sectorTable = new TableToolsNewTwo();
	IntelligentRoadTest.sectorTable.tableObject = tableObject;
	IntelligentRoadTest.sectorTable.submit(tableObject);
//	setTimeout(function(){
//	$("#jzTable thead tr td").eq(0).hide();
//	$("#jzTable tbody tr").each(function(){
//	    $(this).children("td").eq(0).hide();
//	});
//	},300);
//	IntelligentRoadTest.areaTableIsEnd = setTimeout(IntelligentRoadTest.AreaTableTimeout,300);
	$('#areaT ~ .loadImg').hide();
}
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
/**********************************
 * @funcname IntelligentRoadTest.loadAlarmInfoTableData
 * @funcdesc 查询并显示工单列表
 * @param {string} starTime (input optional)
 *  起始时间（必须）
 * @param {String} endTime (input optional)
 *  结束时间（必须）
 * @param {String} city (input optional)
 *  城市（必须）
 * @param {string} alarm_id (input optional)
 *  工单号（可选）
 * @param {string} object_id (input optional)
 * object_id（可选），用于标记行。
 * @author 郑文彬
 * @create 20171110
 ***********************************/
IntelligentRoadTest.loadAlarmInfoTableData = function loadAlarmInfoTableData(starTime,endTime,city,alarm_id,object_id){
	$('#alarmInfoT + .loadImg').show();
	//缓存的查询参数  如果参数一样则不进行查询
	if(IntelligentRoadTest.parameter_2==(starTime+endTime+city+alarm_id)){
		$('#alarmInfoT + .loadImg').hide();
		return;
	}
	IntelligentRoadTest.parameter_2=starTime+endTime+city+alarm_id;
	if(city!=null&&city!=undefined&&city!=''){
		city='and city=\''+city.replace('市', '')+'\'';
	}else{
		city='';
	}
	if(alarm_id!=null&&alarm_id!=undefined&&alarm_id!=''){
		alarm_id='and alarm_id=\''+alarm_id+'\'';
	}else{
		alarm_id='';
	}
	var list = ["alarm_info_01","STARTIME:"+starTime,"ENDTIME:"+endTime,"CITY:"+city,"ALARM_ID:"+alarm_id];
	progressbarTwo.submitSql([list] , 
			[function (data){
				$('#alarmInfoT + .loadImg').hide();
				var fixObj={
						fixRow:1,
					};
				var theadObj={
						clnCssArray:[
						   
//						             {clnNum:10,clnCss:["cln",["tdWidth"]]}
						             ],
				}
				var clnObj={
			    		clnCssArray:[
			    		             {clnNum:5,clnCss:["cln",["clickShowModal"]]},
			    		             {clnNum:10,clnCss:["cln",["tdWidth"]]}
			    		             ],
			    		functionArray:[
			    		               	{funCln:5,funtion:"IntelligentRoadTest.Ahref();",funType:1}
			    		               ]
			    };				
			
				var tableObject = {
						divId:'alarmInfoTable',
						tableId:"alarmTable_t",
						tableHead:"地市,弱区ID,工单标识,工单类型,工单单号,工单等级,创建时间,是否恢复,恢复时间,工单状态,派单时间,结单时间,工单内容",
						Data:data,
						clnObj:clnObj,
						sortFlag:1,
						fixObj:fixObj
//						theadObj:theadObj
						,scrollObj:{divId:"alarmInfoTable",clnNums:[2],clnValues:[object_id]}
			    	};
				IntelligentRoadTest.alarmInfo = new TableToolsNewTwo();
				IntelligentRoadTest.alarmInfo.tableObject = tableObject;
				IntelligentRoadTest.alarmInfo.submit(tableObject);
//				IntelligentRoadTest.areaTableIsEnd = setTimeout(IntelligentRoadTest.AreaTableTimeout,300);
			}],
			[3],null,null,null,null,false,['Alarms']);
	
//	var progressBarSqls=[];
//	progressBarSqls.push(list);
//	var functionlist = [IntelligentRoadTest.showmktCenterAreaTable];
//	progressbarTwo.submitSql(progressBarSqls, functionlist ,[3]);
}
/**********************************
 * @funcname IntelligentRoadTest.Ahref
 * @funcdesc 工单列表中点击工单单号的跳转连接
 * @param {object} data (input optional)
 *  点击列的所有数据
 * @author 郑文彬
 * @create 20171110
 ***********************************/
IntelligentRoadTest.Ahref=function Ahref(data){
	window.open('http://132.96.154.2/EOMS_FT/app/dwf/ftPub/osCheckFtDetail/osCheckFtDetail!getDetailPage.action?sCode='+data.task_id);
}
/**********************************
 * @funcname IntelligentRoadTest.alarmInfoPositioning
 * @funcdesc 点击是否派单定位到工单列表
 * @param {object} data (input optional)
 *  点击列的所有数据
 * @author 郑文彬
 * @create 20171110
 ***********************************/
IntelligentRoadTest.alarmInfoPositioning=function alarmInfoPositioning(data){
	if(data.order_id==null ||data.order_id==''){
		return;
	}
	var st=$('#seachTime').val();
	var wt=$('#weekStartTime').text();

	var t1=getNewDate(st.substring(0,4)+"/"+st.substring(4,6)+"/"+st.substring(6,8),4);
	$('#jobSeachTime').val(t1);
	var t2=getNewDate(wt.substring(0,4)+"/"+wt.substring(4,6)+"/"+wt.substring(6,8),4);
	$('#jobStartTime').val(t2);
	
	
	
	IntelligentRoadTest.loadAlarmInfoTableData($('#jobStartTime').val(),$('#jobSeachTime').val(),$('#cityName').html(),null,data.object_id);//,
	$('#alarmCityName').html($('#cityName').html());
	//直接切换到工单tab
	$(".tabUl li").each(function(){
		var id = $(this).find('a').attr('id');
		if(id=="alarmInfoT"){
			$(this).click();
		}
	});
}
/**********************************
 * @funcname IntelligentRoadTest.loadAllTable
 * @funcdesc 点击页面的上拉剪头，查询所有表格数据
 * @author 郑文彬
 * @create 20171110
 ***********************************/
IntelligentRoadTest.loadAllTable=function loadAllTable(){
	var city = $('#cityName').text().replace('市','');
	var city2=$('#alarmCityName').html().replace('市','');
	var country = $('#areaName').text();
	if(country=='区县'){
		country=noceUtil.GetQueryString("country");
		city=noceUtil.GetQueryString("city");
		city2=noceUtil.GetQueryString("city");
	}
	var mktcenter = $('#regon').text();
	if(mktcenter =="全部营服"){
		mktcenter = '';
	}
	IntelligentRoadTest.loadJiZhanTableData(city,country,mktcenter,IntelligentRoadTest.day);
	IntelligentRoadTest.loadAlarmInfoTableData($('#jobStartTime').val(),$('#jobSeachTime').val(),city2,$('#alarmId').val());
	IntelligentRoadTest.queryAllConcernArea();
	
	IntelligentRoadTest.queryAllDTList();
	
	IntelligentRoadTest.loadmktCenterAreaTableData(city,country,mktcenter,IntelligentRoadTest.day,IntelligentRoadTest.doType);

	
	if(IntelligentRoadTest.type==0){
		IntelligentRoadTest.loadSectorCellAlarmAndKPIData($('#weekStartTime').text(),IntelligentRoadTest.day,IntelligentRoadTest.bst_id,IntelligentRoadTest.cell_id);
	}else{
		//如果IntelligentRoadTest.sectorArr参数还没有则等待2s在执行
		if(IntelligentRoadTest.sectorArr!=undefined){
			IntelligentRoadTest.loadAreaAlarmAndKPIData($('#weekStartTime').text(),IntelligentRoadTest.day,IntelligentRoadTest.sectorArr);
		}else{
			setTimeout(function(){
				IntelligentRoadTest.loadAreaAlarmAndKPIData($('#weekStartTime').text(),IntelligentRoadTest.day,IntelligentRoadTest.sectorArr);
			},2000);
		}
		
	}
	IntelligentRoadTest.jzTableResize();
	IntelligentRoadTest.areaTableResize();
}
/**********************************
 * @funcname IntelligentRoadTest.jizhanLocationRow
 * @funcdesc 点击扇区 基站扇区表定位到扇区所在的行
 * @param {object} data (input optional)
 *  点击列的所有数据
 * @author 郑文彬
 * @create 20171110
 ***********************************/
IntelligentRoadTest.jizhanLocationRow=function IntelligentRoadTest_jizhanLocationRow(){
	var city = $('#cityName').text().replace('市','');
	var country = $('#areaName').text();
	if(country=='区县'){
		country=noceUtil.GetQueryString("country");
		city=noceUtil.GetQueryString("city");
	}
	var mktcenter = $('#regon').text();
	if(mktcenter =="全部营服"){
		mktcenter = '';
	}
	$('#tab_2').click();
	if(IntelligentRoadTest.tableDivState==1){
		IntelligentRoadTest.loadJiZhanTableData(city,country,mktcenter,IntelligentRoadTest.day,true);
	}
}
/**********************************
 * @funcname IntelligentRoadTest.alarmInfoSubmit
 * @funcdesc 点击扇区 基站扇区表定位到扇区所在的行
 * @param {object} data (input optional)
 *  点击列的所有数据
 * @author 郑文彬
 * @create 20171110
 ***********************************/
IntelligentRoadTest.alarmInfoSubmit=function IntelligentRoadTest_alarmInfoSubmit(){
	var strtTime=$('#jobStartTime').val();
	var endTime=$('#jobSeachTime').val();
	var city=$('#alarmCityName').html();
	var alarmId=$('#alarmId').val().trim();
	if(parseInt(strtTime)>parseInt(endTime)){
		alert('结束时间不能小于起始时间');
		return;
	}
	IntelligentRoadTest.loadAlarmInfoTableData(strtTime,endTime,city,alarmId);
}
$(function(){
	//工单列表搜索事件
	$('#submit_1').click(function(){
		IntelligentRoadTest.alarmInfoSubmit();
	});
	$(".mainTabContent").bind('DOMNodeInserted', function(e) {  
		 if(flag){
		      flag = false;
		      setTimeout(addEvent,1000);
		  }
	})
	$("#alarmCityName").bind('DOMNodeInserted', function(e) {  
		IntelligentRoadTest.alarmInfoSubmit();
	})
})
var flag = true;
/**********************************
 * @funcname addEvent
 * @funcdesc 为表格添加点击后标志下划线和改变颜色事件
 *  点击列的所有数据
 * @author 郑文彬
 * @create 20171110
 ***********************************/
function addEvent(){
	flag = true;
	$('.clickShowModal').mouseup(function(){
		$('.clickShowModal').removeClass('addLine');
		$(this).addClass('addLine');

	})
}
IntelligentRoadTest.jzTableResize=function IntelligentRoadTest_jzTableResize(){
	if($('#jzTable .scrollDiv').width()==0||$('#jzTable .scrollDiv').height()==0){
		var city = $('#cityName').text().replace('市','');
		var country = $('#areaName').text();
		if(country=='区县'){
			country=noceUtil.GetQueryString("country");
			city=noceUtil.GetQueryString("city");
		}
		var mktcenter = $('#regon').text();
		if(mktcenter =="全部营服"){
			mktcenter = '';
		}
	IntelligentRoadTest.loadJiZhanTableData(city,country,mktcenter,IntelligentRoadTest.day,true);

	}
}
IntelligentRoadTest.areaTableResize=function IntelligentRoadTest_areaResize(){
		if($('#areaTable .scrollDiv').width()==0||$('#areaTable .scrollDiv').height()==0){
		var city = $('#cityName').text().replace('市','');
		var country = $('#areaName').text();
		if(country=='区县'){
			country=noceUtil.GetQueryString("country");
			city=noceUtil.GetQueryString("city");
		}
		var mktcenter = $('#regon').text();
		if(mktcenter =="全部营服"){
			mktcenter = '';
		}  
			IntelligentRoadTest.loadmktCenterAreaTableData(city,country,mktcenter,IntelligentRoadTest.day,IntelligentRoadTest.doType,true);
		}
	}