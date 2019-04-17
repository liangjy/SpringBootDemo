IntelligentRoadTest_SystemLayerEdit = {};
IntelligentRoadTest_SystemLayerEdit.polygonStyle = {//编辑的多边形样式
		strokeColor:"red", 
		strokeWeight:1, 
		strokeOpacity:1,
		fillOpacity:0.1,
		strokeStyle:"dashed",
//		enableEditing:true,
};
IntelligentRoadTest_SystemLayerEdit.polylineHisStyle = {//历史版本的多边形轮廓样式
		strokeColor:"#999966", 
		strokeWeight:2, 
		strokeOpacity:1,
		strokeStyle:"dashed",
//		enableEditing:true,
};
IntelligentRoadTest_SystemLayerEdit.polylineAuditStyle = {//正在审核的多边形轮廓样式
		strokeColor:"#00FFFF", 
		strokeWeight:2, 
		strokeOpacity:1,
		strokeStyle:"dashed",
//		enableEditing:true,
};


IntelligentRoadTest_SystemLayerEdit.isEditPolygon = false;//是否正在编辑
IntelligentRoadTest_SystemLayerEdit.isSavePolygon = false;//是否已经保存
IntelligentRoadTest_SystemLayerEdit.isResetPolygon = false;//是否重置
IntelligentRoadTest_SystemLayerEdit.isRedrawPolygon = false;//是否重绘


IntelligentRoadTest_SystemLayerEdit.polygonArr = [];//正在编辑的多边形集合(一般情况只有一个)
IntelligentRoadTest_SystemLayerEdit.polylineHisArr = [];//历史版本轮廓
IntelligentRoadTest_SystemLayerEdit.polylineActArr = [];//当前保存的轮廓
IntelligentRoadTest_SystemLayerEdit.polylineAuditGisArr = [];//处于审核中轮廓
IntelligentRoadTest_SystemLayerEdit.redrawManagerObject = null;//用于重绘的框选对象
//IntelligentRoadTest.polygon
//根据场景查询图层版本图层
//1：高校

/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData
 * @funcdesc 进入图层详情页的时候，控制按钮显示隐藏，查询图层的历史版本、最新版本和正在编辑的轮廓数据
 * @param {object} item (input) 详情页的对象
 * @param {number} type (input) 对象类型（1:高校,2:高密度住宅区,3:高流量商务区,7:美景,8:农贸市场,9:美食,10:场馆）
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData = function (item,type){
	//清除编辑图层的多边形轮廓和线
    IntelligentRoadTest_SystemLayerEdit.clearActPolyline();
    IntelligentRoadTest_SystemLayerEdit.clearHisPolyline();
    IntelligentRoadTest_SystemLayerEdit.clearPolygon();
    IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer();
    IntelligentRoadTest_SystemLayerEdit.clearAuditGisPolyline();
	
	var userName = $('#headerUserForm_a').text().trim();
	var detilInfoDivId = IntelligentRoadTest_SystemLayerEdit.getMessageDivId(item.esbh_type);
	$('#'+detilInfoDivId+' .systemLayerBottonLi button').show();
	if(item.audit_stat=='待审核'){//当前区域处于审核中时
		if(item.applicant_id==userName){//如果提交审核的人是当前用户，则显示撤销按钮，能出现撤销按钮的情况只有当前提交的单子是本地审核员，省级审核员没有待审核的状态
			$('#'+detilInfoDivId+' .systemLayerBottonLi .revoverBtn').siblings('button').hide();
		}else{
			//不是当前用户，则显示正常的编辑、还原、保存、提交按钮
			$('#'+detilInfoDivId+' .systemLayerBottonLi .revoverBtn').hide();
			$('#'+detilInfoDivId+' .systemLayerBottonLi .revoverBtn').prev().show();
			$('#'+detilInfoDivId+' .systemLayerBottonLi .revoverBtn').prevAll('.btn-canceled').hide();
		}
	}else{//没有处于审核中状态的，默认显示四个按钮
		$('#'+detilInfoDivId+' .systemLayerBottonLi .revoverBtn').hide();
		$('#'+detilInfoDivId+' .systemLayerBottonLi .revoverBtn').prev().show();
		$('#'+detilInfoDivId+' .systemLayerBottonLi .revoverBtn').prevAll('.btn-canceled').hide();
	}
	
	IntelligentRoadTest_SystemLayerEdit.isEditPolygon = false;
	IntelligentRoadTest_SystemLayerEdit.isSavePolygon = false;
	IntelligentRoadTest_SystemLayerEdit.isResetPolygon = false;
	IntelligentRoadTest_SystemLayerEdit.isRedrawPolygon = false;
	
	for(var i=0;i<IntelligentRoadTest_SystemLayerEdit.polygonArr.length;i++){
		IntelligentRoadTest_SystemLayerEdit.polygonArr[i].disableEditing();
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest_SystemLayerEdit.polygonArr[i]);
	}
	IntelligentRoadTest_SystemLayerEdit.polygonArr = [];
	if(item.day!=null){
		var userName = $('#headerUserForm_a').text().trim();
//		从DM_SCENE_AREA_GIS_HIS历史表中读取历史版本，从DM_SCENE_AREA_GIS获取最新版本
		var list = ["IntelligentRoadTest_SystemLayerEdit_loadLastVersion","OBJ_ID:"+item.esbh_id,"OBJ_TYPE:"+item.esbh_type];
		var list1 = ["IntelligentRoadTest_SystemLayerEdit_loadHisVersion","OBJ_ID:"+item.esbh_id,"OBJ_TYPE:"+item.esbh_type];
		var list2 = ["IntelligentRoadTest_SystemLayerEdit_loadSaveGisData","OBJ_ID:"+item.esbh_id,"OBJ_TYPE:"+item.esbh_type,"NAME:"+userName];
		var progressBarSqls = [];
		progressBarSqls.push(list);
		progressBarSqls.push(list1);
		progressBarSqls.push(list2);
		var functionlist = [IntelligentRoadTest_SystemLayerEdit.loadLastVersion,IntelligentRoadTest_SystemLayerEdit.loadHisVersion,IntelligentRoadTest_SystemLayerEdit.loadSaveVersion];
		var database = [3,3,3];
		var para = [[item,type],[item,type],[item,type]];
		
		if(item.audit_stat=='待审核'){//如果是处于审核中的状态，需要显示审核中的轮廓
			var list3 = ["IntelligentRoadTest_SystemLayerEdit_loadSaveGisData","OBJ_ID:"+item.esbh_id,"OBJ_TYPE:"+item.esbh_type,"NAME:"+item.applicant_id];
			progressBarSqls.push(list3);
			database.push(3);
			functionlist.push(IntelligentRoadTest_SystemLayerEdit.loadAuditGisData);
			para.push([item,type]);
		}
		
		progressbarTwo.submitSql(progressBarSqls, functionlist, database, para);
	}

}

//最新版本数据
/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.loadLastVersion
 * @funcdesc 查询最新版本数据的回调函数，设置显示当前图层最新版本的编辑人和时间
 * @param {object} data (input) 查询返回的数据
 * @param {array} para (input) 查询时往回调函数放入的参数
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest_SystemLayerEdit.loadLastVersion = function IntelligentRoadTest_SystemLayerEdit_loadLastVersion(data,para){
	var item = para[0];
	var type = item.esbh_type;
	var result = callBackChangeData(data);
	var detilInfoDivId = IntelligentRoadTest_SystemLayerEdit.getMessageDivId(type);
	
	if(result.length>0){
	    if(result[0].edit_time==null||result[0].edit_time=='null'||result[0].edit_time=='NULL'){
            $('#'+detilInfoDivId+' .ulDetailInfo .lastVersionTime').text('');
        }else{
            $('#'+detilInfoDivId+' .ulDetailInfo .lastVersionTime').text(result[0].edit_time);
        }
        if(result[0].editor_id==null||result[0].editor_id=='null'||result[0].editor_id=='NULL'){
            $('#'+detilInfoDivId+' .ulDetailInfo .lastVersionEditerName').text('');
        }else{
            $('#'+detilInfoDivId+' .ulDetailInfo .lastVersionEditerName').text(result[0].editor_id);
        }
	}else{
		$('#'+detilInfoDivId+' .ulDetailInfo .lastVersionTime').text('');
		$('#'+detilInfoDivId+' .ulDetailInfo .lastVersionEditerName').text('');
	}
	
}

/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.loadHisVersion
 * @funcdesc 查询历史版本数据的回调函数，会初始化历史版本的下拉框，切换下拉框的版本时，地图上呈现该历史版本的轮廓
 * @param {object} data (input) 查询返回的数据
 * @param {array} para (input) 查询时往回调函数放入的参数
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
//根据历史版本查询结果集，初始化历史版本下拉框
IntelligentRoadTest_SystemLayerEdit.loadHisVersion = function IntelligentRoadTest_SystemLayerEdit_loadHisVersion(data,para){
	var item = para[0];
	var type = item.esbh_type;
	var result = callBackChangeData(data);
//	if(result.length==0){
//		var rs = {}
//		rs.gis_data_baidu = "113.372210,23.048876@113.379037,23.043151@113.386008,23.042806@113.386066,23.045809@113.384774,23.048740@113.382076,23.050726@113.378524,23.052966@113.375354,23.051417@113.373864,23.049974@113.372183,23.048801@113.372210,23.048876";
//		rs.version_time = "2018-03-01";
//		result[0] = rs;
//	}
	var detilInfoDivId = IntelligentRoadTest_SystemLayerEdit.getMessageDivId(type);
	
	if(detilInfoDivId == ""){
		return;
	}
	
	var histroySelect = $('#'+detilInfoDivId+' .ulDetailInfo .histroySelect');
	$(histroySelect).html('');
	var optionStr = '<option value="请选择">请选择</option>';
	
	for(var i=0;i<result.length;i++){
		optionStr += '<option value="'+result[i].gis_data_baidu+'">'+result[i].version_time+'</option>'
	}
	$(histroySelect).html(optionStr);
	$(histroySelect).unbind('change').bind('change',function(){
		//历史版本轮廓呈现
		var gis_data = $(this).find('option:selected').val();
		if(gis_data!='请选择'){
			IntelligentRoadTest_SystemLayerEdit.clearHisPolyline();
			var gis_data_arr = gis_data.split(";");
			if(gis_data_arr.length==1){
                gis_data_arr = gis_data_arr[0].split("|");
            }
			for(var i=0;i<gis_data_arr.length;i++){
				var point_str_arr = gis_data_arr[i].split('@');
				var pointArr = [];
				for(var j=0;j<point_str_arr.length;j++){
					var point = point_str_arr[j].split(",");
					pointArr.push(new BMap.Point(point[0],point[1]));
				}
				if(pointArr.length>0){
					pointArr.push(pointArr[0]);//对线段进行闭合
				}
				var polyline = new BMap.Polyline(pointArr,IntelligentRoadTest_SystemLayerEdit.polylineHisStyle);
				polyline.obj_id = item.esbh_id;
				polyline.obj_type = item.esbh_type;
				IntelligentRoadTest_SystemLayerEdit.polylineHisArr.push(polyline);
				IntelligentRoadTest.map.addOverlay(polyline);
			}
		}else{
			IntelligentRoadTest_SystemLayerEdit.clearHisPolyline();
		}
	});
	
	
}
/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.loadSaveVersion
 * @funcdesc 高亮当前用户保存的轮廓,如果没有保存的轮廓，则需要拿最新版本的轮廓数据(item中的轮廓有可能是历史版本的轮廓)
 * @param {object} data (input) 查询返回的数据
 * @param {array} para (input) 查询时往回调函数放入的参数
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
//高亮当前用户保存的轮廓,如果没有保存的轮廓，则需要拿最新版本的轮廓数据(item中的轮廓有可能是历史版本的轮廓)
IntelligentRoadTest_SystemLayerEdit.loadSaveVersion = function IntelligentRoadTest_SystemLayerEdit_loadSaveVersion(data,para){
	var item = para[0];
	var type = para[1];
	var result = callBackChangeData(data);
	if(result.length>0){
		if(result[0].audit_status=="已撤销"){
			return;
		}else{
			var gis_data_arr = result[0].gis_data_baidu.split(";");
            if(gis_data_arr.length==1){
                gis_data_arr = gis_data_arr[0].split("|");
            }
			for(var i=0;i<gis_data_arr.length;i++){
				var point_str_arr = gis_data_arr[i].split('@');
				var pointArr = [];
				for(var j=0;j<point_str_arr.length;j++){
					var point = point_str_arr[j].split(",");
					pointArr.push(new BMap.Point(point[0],point[1]));
				}
				if(pointArr.length>0){
					pointArr.push(pointArr[0]);//放入第一个点，否则线不进行闭合
				}
				var polyline = new BMap.Polyline(pointArr,IntelligentRoadTest_SystemLayerEdit.polygonStyle);
				polyline.obj_id = item.esbh_id;
				polyline.obj_type = item.esbh_type;
				IntelligentRoadTest_SystemLayerEdit.polylineActArr.push(polyline);
				IntelligentRoadTest.map.addOverlay(polyline);
			}
			
			
		}
		
	}
}
/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.loadAuditGisData
 * @funcdesc 高亮显示正在审核的系统图层轮廓
 * @param {object} data (input) 查询返回的数据
 * @param {array} para (input) 查询时往回调函数放入的参数
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
//呈现正在审核的系统图层轮廓
IntelligentRoadTest_SystemLayerEdit.loadAuditGisData = function IntelligentRoadTest_SystemLayerEdit_loadAuditGisData(data,para){
	var item = para[0];
	var type = para[1];
	var result = callBackChangeData(data);
	if(result.length>0){
		if(result[0].audit_status=="已撤销"){
			return;
		}else{
			//对于审核中的图层，需要地图自适应显示审核的图层和自身图层
			var allPointsArr = [];
			var gis_data_arr = result[0].gis_data_baidu.split(";");
            if(gis_data_arr.length==1){
                gis_data_arr = gis_data_arr[0].split("|");
            }
			for(var i=0;i<gis_data_arr.length;i++){
				var point_str_arr = gis_data_arr[i].split('@');
				var pointArr = [];
				for(var j=0;j<point_str_arr.length;j++){
					var point = point_str_arr[j].split(",");
					pointArr.push(new BMap.Point(point[0],point[1]));
				}
				if(pointArr.length>0){
					pointArr.push(pointArr[0]);//对线段进行闭合
				}
				var polyline = new BMap.Polyline(pointArr,IntelligentRoadTest_SystemLayerEdit.polylineAuditStyle);
				polyline.obj_id = item.esbh_id;
				polyline.obj_type = item.esbh_type;
				IntelligentRoadTest_SystemLayerEdit.polylineAuditGisArr.push(polyline);
				IntelligentRoadTest.map.addOverlay(polyline);
				allPointsArr = allPointsArr.concat(pointArr);
			}
			var max_lng = item.longitude_max_baidu;
			var min_lng = item.longitude_min_baidu;
			var max_lat = item.latitude_max_baidu;
			var min_lat = item.latitude_min_baidu;
			var polygon_point_southWest = new BMap.Point(min_lng,min_lat);//西南点
			var polygon_point_northWest = new BMap.Point(min_lng,max_lat);//西北点
			var polygon_point_northEast = new BMap.Point(max_lng,max_lat);//东北点
			var polygon_point_southEast = new BMap.Point(max_lng,min_lat);//东南点
			var polygon_points_arr = [];
			polygon_points_arr.push(polygon_point_southWest);
			polygon_points_arr.push(polygon_point_northWest);
			polygon_points_arr.push(polygon_point_northEast);
			polygon_points_arr.push(polygon_point_southEast);
			allPointsArr = allPointsArr.concat(polygon_points_arr);
			IntelligentRoadTest.map.setViewport(allPointsArr);
		}
		
	}
}
/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.clearAuditGisPolyline
 * @funcdesc 清除正在正在审核的轮廓
 * @param {null}
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest_SystemLayerEdit.clearAuditGisPolyline = function IntelligentRoadTest_SystemLayerEdit_clearAuditGisPolyline(){
	for(var i=0;i<IntelligentRoadTest_SystemLayerEdit.polylineAuditGisArr.length;i++){
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest_SystemLayerEdit.polylineAuditGisArr[i]);
	}
	IntelligentRoadTest_SystemLayerEdit.polylineAuditGisArr = null;
	IntelligentRoadTest_SystemLayerEdit.polylineAuditGisArr = [];
}

/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.clearActPolyline
 * @funcdesc 清除当前保存版本的多边形轮廓
 * @param {null}
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
//清除当前保存版本的多边形轮廓
IntelligentRoadTest_SystemLayerEdit.clearActPolyline = function (){
	for(var i=0;i<IntelligentRoadTest_SystemLayerEdit.polylineActArr.length;i++){
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest_SystemLayerEdit.polylineActArr[i]);
	}
	IntelligentRoadTest_SystemLayerEdit.polylineActArr = null;
	IntelligentRoadTest_SystemLayerEdit.polylineActArr = [];
}
/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.clearHisPolyline
 * @funcdesc 清除历史版本的多边形轮廓
 * @param {null}
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
//清除历史版本的多边形轮廓
IntelligentRoadTest_SystemLayerEdit.clearHisPolyline = function (){
	for(var i=0;i<IntelligentRoadTest_SystemLayerEdit.polylineHisArr.length;i++){
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest_SystemLayerEdit.polylineHisArr[i]);
	}
	IntelligentRoadTest_SystemLayerEdit.polylineHisArr = null;
	IntelligentRoadTest_SystemLayerEdit.polylineHisArr = [];
}
/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.clearPolygon
 * @funcdesc 清除编辑的多边形
 * @param {null}
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
//清除编辑的多边形
IntelligentRoadTest_SystemLayerEdit.clearPolygon = function (){
	for(var i=0;i<IntelligentRoadTest_SystemLayerEdit.polygonArr.length;i++){
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest_SystemLayerEdit.polygonArr[i]);
	}
	IntelligentRoadTest_SystemLayerEdit.polygonArr = null;
	IntelligentRoadTest_SystemLayerEdit.polygonArr = [];
}
/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.editSystemLayer
 * @funcdesc 点击详情页的编辑按钮触发的方法，需要查询最新图层的数据，避免出现在历史时间点编辑了历史的轮廓
 * 约束：提交申请之后，在审核状态中，该用户不可以再编辑该图层。如果要重新编辑，则需要撤销申请之后才可以编辑。
 * @param {object} item (input) 详情页该图层对象数据
 * @param {number} type (input) 对象类型
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
//编辑
IntelligentRoadTest_SystemLayerEdit.editSystemLayer = function (item,type){
	
	if(item.esbh_id==null){
		alert("当前区域为新增区域，不可进行编辑");
		return;
	}
	
	var userName = $('#headerUserForm_a').text().trim();
//	新增约束：提交申请之后，在审核状态中，该用户不可以再编辑该图层。如果要重新编辑，则需要撤销申请之后才可以编辑。（已确认）
	if(item.applicant_id==userName&&item.audit_stat=="待审核"){//插入一个逻辑，如果当前用户对当前区域提交了审核，不可以进行编辑
		alert("你对当前区域图层进行了提交，不可进行编辑");
		return;
	}
	
	if(IntelligentRoadTest_SystemLayerEdit.isRedrawPolygon){//重绘中不可以进行编辑
		alert("您正在进行重绘，不可以编辑");
		return;
	}
	
//	var gis_data = item.gis_data;
	
//	if(IntelligentRoadTest_SystemLayerEdit.isEditPolygon){
//		IntelligentRoadTest_SystemLayerEdit.clearPolygon();
//		return;
//	}
//	编辑时，需要提示当前编辑轮廓是否处于最新版本的轮廓，默认需要拿最新版本的轮廓进行编辑
//	var detilInfoDivId = IntelligentRoadTest_SystemLayerEdit.getMessageDivId(item.esbh_type);
//	if(detilInfoDivId == ""){
//		return;
//	}
//	var histroySelect = $('#'+detilInfoDivId+' .ulDetailInfo .histroySelect');
//	var selectLength = $(histroySelect).children('option').length;
//	if(selectLength>1){
//		
//	}
	
	var list = ["IntelligentRoadTest_SystemLayerEdit_loadLastVersionGisData","OBJ_ID:"+item.esbh_id,"OBJ_TYPE:"+item.esbh_type];
	var progressBarSqls = [list];
	var functionlist = [IntelligentRoadTest_SystemLayerEdit.loadLastVersionGisData];
	progressbarTwo.submitSql(progressBarSqls, functionlist, [3], [[item,type]]);
	
}
/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.loadLastVersionGisData
 * @funcdesc 编辑时查询的最新版图层数据回调函数，将图层数据放入到item的lastVersion属性中，同时查询该用户是否有编辑该图层
 * @param {object} data (input) 查询返回的数据
 * @param {array} para (input) 往回调函数传递的参数数据
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest_SystemLayerEdit.loadLastVersionGisData = function IntelligentRoadTest_SystemLayerEdit_loadLastVersionGisData(data,para){
	var item = para[0];
	var type = para[1];
	var result = callBackChangeData(data);
	item.lastVersionGis = result[0].gis_data;
	var userName = $('#headerUserForm_a').text().trim();
	//新增逻辑，如果当前用户对当前区域编辑进行了保存，但是未提交审核，编辑时编辑的是上一次保存的多边形
	var list = ["IntelligentRoadTest_SystemLayerEdit_loadSaveGisData","OBJ_ID:"+item.esbh_id,"OBJ_TYPE:"+item.esbh_type,"NAME:"+userName];
	var progressBarSqls = [list];
	var functionlist = [IntelligentRoadTest_SystemLayerEdit.judgeHasSave];
	
	progressbarTwo.submitSql(progressBarSqls, functionlist, [3], [[item,type]]);
	IntelligentRoadTest_SystemLayerEdit.clearActPolyline();
}
/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.loadLastVersionGisData
 * @funcdesc 查询用户对该图层的编辑数据，如果没有则取最新版的轮廓数据进行编辑，有正在编辑的轮廓则直接用用户编辑的轮廓进行编辑
 * @param {object} data (input) 查询返回的数据
 * @param {array} para (input) 往回调函数传递的参数数据
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest_SystemLayerEdit.judgeHasSave = function IntelligentRoadTest_SystemLayerEdit_judgeHasSave(data,para){
	var item = para[0];
	var type = para[1];
	var result = callBackChangeData(data);
	var gis_data = item.lastVersionGis
	//新增逻辑，如果当前用户对当前区域编辑进行了保存，但是未提交审核，编辑时编辑的是上一次保存的多边形
	//处于审核中、已通过、编辑中、已撤销状态的图层，直接编辑保存数据的轮廓，否则编辑frt层数据的轮廓
	if(result.length>0){
//		if(result[0].audit_status=="审核中"
//			||result[0].audit_status=="已通过"
//			||result[0].audit_status=="编辑中"
//			||result[0].audit_status=="已撤销"){
			gis_data = result[0].gis_data_baidu;
//		}
		
	}
	
//	编辑时，需要提示当前编辑轮廓是否处于最新版本的轮廓，默认需要拿最新版本的轮廓进行编辑
	
	
	for(var i=0;i<IntelligentRoadTest_SystemLayerEdit.polygonArr.length;i++){
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest_SystemLayerEdit.polygonArr[i]);
	}
	IntelligentRoadTest_SystemLayerEdit.polygonArr = null;
	IntelligentRoadTest_SystemLayerEdit.polygonArr = [];
	
	var gis_data_arr = gis_data.split(";");
    if(gis_data_arr.length==1){
        gis_data_arr = gis_data_arr[0].split("|");
    }
	for(var i=0;i<gis_data_arr.length;i++){
		var point_str_arr = gis_data_arr[i].split('@');
		var pointArr = [];
		for(var j=0;j<point_str_arr.length;j++){
			var point = point_str_arr[j].split(",");
			pointArr.push(new BMap.Point(point[0],point[1]));
		}
		var polygon = new BMap.Polygon(pointArr,IntelligentRoadTest_SystemLayerEdit.polygonStyle);
		polygon.obj_id = item.esbh_id;
		polygon.obj_type = item.esbh_type;
		IntelligentRoadTest_SystemLayerEdit.polygonArr.push(polygon);
		IntelligentRoadTest.map.addOverlay(polygon);
		polygon.enableEditing();
	}
	IntelligentRoadTest_SystemLayerEdit.isResetPolygon = false;
	IntelligentRoadTest_SystemLayerEdit.isEditPolygon = true;
	IntelligentRoadTest_SystemLayerEdit.isSavePolygon = false;
	IntelligentRoadTest_SystemLayerEdit.isRedrawPolygon = false;
}
/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer
 * @funcdesc 清除正在编辑或者还没有编辑的图层，用于通过点击地图（类似自定义框选）框选新的多边形
 * @param {object} item (input) 当前对象的详情页数据
 * @param {number} type (input) 当前对象类型
 * @param {object} event (input) 点击html的事件
 * @return {null}
 * @author 梁杰禹
 * @create 20180601
 * @modifier
 * @modify
 ***********************************/
//重绘
IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer = function IntelligentRoadTest_SystemLayerEdit_redrawSystemLayer(item,type,event){
	
	if(IntelligentRoadTest.isBoxSelecting){//如果当前处于图层重绘状态，不可以使用框选
    	alert("您正在使用自定义框选,不可以进行重绘");
    	return;
    }
	
	var userName = $('#headerUserForm_a').text().trim();
//	新增约束：提交申请之后，在审核状态中，该用户不可以再编辑该图层。如果要重新编辑，则需要撤销申请之后才可以编辑。（已确认）
	if(item.applicant_id==userName&&item.audit_stat=="待审核"){//插入一个逻辑，如果当前用户对当前区域提交了审核，不可以进行编辑
		alert("你对当前区域图层进行了提交，不可进行编辑");
		return;
	}
	
	if(IntelligentRoadTest.map.getZoom()<15){
        alert("请将地图放大到500米及以下");
        return;
    }
	
	
	for(var i=0;i<IntelligentRoadTest_SystemLayerEdit.polygonArr.length;i++){
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest_SystemLayerEdit.polygonArr[i]);
	}
	IntelligentRoadTest_SystemLayerEdit.polygonArr = null;
	IntelligentRoadTest_SystemLayerEdit.polygonArr = [];
	//显示取消按钮
	$(event.currentTarget).hide();
	$(event.currentTarget).siblings('.btn-canceled').show();
	
	IntelligentRoadTest_SystemLayerEdit.isResetPolygon = false;
	IntelligentRoadTest_SystemLayerEdit.isEditPolygon = false;
	IntelligentRoadTest_SystemLayerEdit.isSavePolygon = false;
	if(IntelligentRoadTest_SystemLayerEdit.redrawManagerObject ==null){
		var styleOptions = {
            strokeColor:"red",    //边线颜色。
            //fillColor:"red",      //填充颜色
            strokeWeight: 1,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
            fillOpacity: 0.3,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'dashed' //边线的样式，solid或dashed。
	    }
		IntelligentRoadTest_SystemLayerEdit.redrawManagerObject = new BMapLib.DrawingManager(IntelligentRoadTest.map, {isOpen: true,
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
		IntelligentRoadTest_SystemLayerEdit.redrawManagerObject.setDrawingMode(BMAP_DRAWING_POLYGON);
//					alert(IntelligentRoadTest.myDrawingManagerObject.getDrawingMode());
		IntelligentRoadTest_SystemLayerEdit.redrawManagerObject.addEventListener('overlaycomplete', IntelligentRoadTest_SystemLayerEdit.redrawOverlaycomplete);
	}else{
		IntelligentRoadTest_SystemLayerEdit.redrawManagerObject.open();
	}
	
	IntelligentRoadTest_SystemLayerEdit.redrawManagerObject.redrawObjectItem = item;
	IntelligentRoadTest_SystemLayerEdit.redrawManagerObject.redrawObjectItemType = type;
	
	//锁定地图
    IntelligentRoadTest.map.disableDragging();//禁用拖拽
    IntelligentRoadTest.map.disableScrollWheelZoom();// 禁用滚轮缩放
    IntelligentRoadTest.map.setMinZoom(15);
    IntelligentRoadTest_SystemLayerEdit.isRedrawPolygon = true;
}

/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.redrawOverlaycomplete
 * @funcdesc 重绘框选结束后触发的事件调用函数
 * @param {object} e (input) 框选结束后，百度提供的参数
 * @return {null}
 * @author 梁杰禹
 * @create 20180601
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest_SystemLayerEdit.redrawOverlaycomplete = function IntelligentRoadTest_SystemLayerEdit_redrawOverlaycomplete(e){
	if(IntelligentRoadTest_SystemLayerEdit.redrawManagerObject != null){
		IntelligentRoadTest_SystemLayerEdit.redrawManagerObject.close();
    }
	
	IntelligentRoadTest.map.enableScrollWheelZoom(); // 允许滚轮缩放
    IntelligentRoadTest.map.enableDragging();
    IntelligentRoadTest.map.setMinZoom(8);
    
    if(IntelligentRoadTest_SystemLayerEdit.redrawManagerObject.redrawObjectItem){
    	e.overlay.obj_id = IntelligentRoadTest_SystemLayerEdit.redrawManagerObject.redrawObjectItem.esbh_id;
    	e.overlay.obj_type = IntelligentRoadTest_SystemLayerEdit.redrawManagerObject.redrawObjectItem.esbh_type;
    }
    
    IntelligentRoadTest_SystemLayerEdit.polygonArr.push(e.overlay);
    
}
/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer
 * @funcdesc 取消重绘
 * @param {object} item (input) 当前对象的详情页数据
 * @param {number} type (input) 当前对象类型
 * @param {object} event (input) 点击html的事件
 * @return {null}
 * @author 梁杰禹
 * @create 20180601
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer = function (item,type,event){
	for(var i=0;i<IntelligentRoadTest_SystemLayerEdit.polygonArr.length;i++){
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest_SystemLayerEdit.polygonArr[i]);
	}
	IntelligentRoadTest_SystemLayerEdit.polygonArr = null;
	IntelligentRoadTest_SystemLayerEdit.polygonArr = [];
	
	IntelligentRoadTest.map.enableScrollWheelZoom(); // 允许滚轮缩放
    IntelligentRoadTest.map.enableDragging();
    IntelligentRoadTest.map.setMinZoom(8);
    if(IntelligentRoadTest_SystemLayerEdit.redrawManagerObject!=null){
    	IntelligentRoadTest_SystemLayerEdit.redrawManagerObject.close(true);
    }
    if(event){
    	$(event.currentTarget).hide();
    	$(event.currentTarget).prev('.btn-redraw').show();
    }
    
    
    IntelligentRoadTest_SystemLayerEdit.isRedrawPolygon = false;
}

/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.resetSystemLayer
 * @funcdesc 还原图层数据
 * @param {object} item (input) 该图层详情页对象
 * @param {array} type (input) 对象类型
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
//还原
IntelligentRoadTest_SystemLayerEdit.resetSystemLayer = function (item,type){
	//撤销当前用户所有的编辑痕迹
	if(item.esbh_id==null){
		alert("当前区域为新增区域，不可进行还原");
		return;
	}
	for(var i=0;i<IntelligentRoadTest_SystemLayerEdit.polygonArr.length;i++){
		IntelligentRoadTest_SystemLayerEdit.polygonArr[i].disableEditing();
		IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest_SystemLayerEdit.polygonArr[i]);
	}
	
	if(IntelligentRoadTest_SystemLayerEdit.isRedrawPolygon){
		IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer(item,type);
		$(event.currentTarget).prevAll('.btn-canceled').hide();
		$(event.currentTarget).prevAll('.btn-redraw').show();
//		IntelligentRoadTest_SystemLayerEdit.isRedrawPolygon = false;
	}
	
	IntelligentRoadTest_SystemLayerEdit.isEditPolygon = false;
	IntelligentRoadTest_SystemLayerEdit.isSavePolygon = false;
	IntelligentRoadTest_SystemLayerEdit.isResetPolygon = true;
	
	
	var dmSceneAreaGisAct = {};
	dmSceneAreaGisAct.obj_id = item.esbh_id;
	dmSceneAreaGisAct.obj_name = item.esbh_name;
	dmSceneAreaGisAct.obj_type = item.esbh_type;
	var ajaxData = IntelligentRoadTest_SystemLayerEdit.changeObj(dmSceneAreaGisAct);
//	console.log("dmSceneAreaGisAct:"+dmSceneAreaGisAct);
	ajaxData.type = 3;
	ajaxData.operate = "resetSystemLayer";
	var $ajax = $.ajax({
        type: 'post',
        data: ajaxData,
        url: 'pages_audit_OperateEntity_operateEntity.action',
        cache: false,
        dataType: 'json',
        success: function(data){
             alert(data.status);
             if(data.flag!="error"){
            	 IntelligentRoadTest_SystemLayerEdit.clearActPolyline();
             }
             
        },
        error: function(data,textStatus){
            alert("还原图层失败");
        }
    });
	
}
/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.saveSystemLayer
 * @funcdesc 保存编辑结束的图层轮廓数据
 * @param {object} item (input) 该图层详情页对象
 * @param {array} type (input) 对象类型
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
//保存
IntelligentRoadTest_SystemLayerEdit.saveSystemLayer = function (item,type){
	if(item.esbh_id==null){
		alert("当前区域为新增区域，不可进行保存");
		return;
	}
	if(IntelligentRoadTest_SystemLayerEdit.isResetPolygon){
		alert("您已还原多边形，无需保存");
		return;
	}
	
	if(IntelligentRoadTest_SystemLayerEdit.isEditPolygon||IntelligentRoadTest_SystemLayerEdit.isRedrawPolygon){
		if(IntelligentRoadTest_SystemLayerEdit.isRedrawPolygon&&IntelligentRoadTest_SystemLayerEdit.polygonArr.length==0){
			alert("您还没有重绘结束")
			return;
		}
		
		if(confirm("确定保存吗")){
			IntelligentRoadTest_SystemLayerEdit.isResetPolygon = false;
			IntelligentRoadTest_SystemLayerEdit.isEditPolygon = false;
			IntelligentRoadTest_SystemLayerEdit.isSavePolygon = true;
			IntelligentRoadTest_SystemLayerEdit.isRedrawPolygon = false;
			var dmSceneAreaGisAct = {};
			var obj_area = 0;
			var baiduPointArr = [];//多个多边形的所有百度经纬度点集合
			var gpsPointArr = [];//多个多边形的所有gps经纬度点集合
			var baiduPointArrStrAll = [];//多个多边形的所有百度经纬度点字符串集合
			var gpsPointArrStrAll = [];//多个多边形的所有gps经纬度点字符串集合
			for(var i=0;i<IntelligentRoadTest_SystemLayerEdit.polygonArr.length;i++){
				if(IntelligentRoadTest_SystemLayerEdit.polygonArr[i].obj_id==item.esbh_id
						&&IntelligentRoadTest_SystemLayerEdit.polygonArr[i].obj_type==item.esbh_type){
					console.log("当前编辑的轮廓和传入的数据，id和type一致");
					var pointArr = IntelligentRoadTest_SystemLayerEdit.polygonArr[i].getPath();
					var gpsPointArr = [];//当前多边形的gps经纬度点集合,使用百度点对象，因为后面计算最大最小经纬度的时候用的是百度点对象
					var gpsPointArrStr = [];//当前多边形gps经纬度点集合拼接的字符串数组（lng,lat）
					var pointArrStr = [];//当前多边形百度经纬度点集合拼接的字符串字符串数组（lng,lat）
					
					for(var k=0;k<pointArr.length;k++){
						var gpsPoint = GPSUtil.bd09_To_gps84(pointArr[k].lat,pointArr[k].lng);//百度坐标转gps坐标
						gpsPointArr.push(new BMap.Point(gpsPoint[1],gpsPoint[0]));//
						
						var pointStr = pointArr[k].lng+","+pointArr[k].lat;
						var	gpsPointStr = gpsPoint[1]+","+gpsPoint[0];
						pointArrStr.push(pointStr);
						gpsPointArrStr.push(gpsPointStr);
					}
					
					obj_area = obj_area + BMapLib.GeoUtils.getPolygonArea(pointArr);
					baiduPointArrStrAll.push(pointArrStr.join("@"));
					gpsPointArrStrAll.push(gpsPointArrStr.join("@"));
					baiduPointArr = baiduPointArr.concat(pointArr);
					gpsPointArr = gpsPointArr.concat(gpsPointArr);
					IntelligentRoadTest_SystemLayerEdit.polygonArr[i].disableEditing();
				}
			}
			
			
			if(baiduPointArr.length<3){
				alert("没有进行编辑，不可以保存");
				return;
			}
			var baiduMaxAndMin = BMapLib.GeoUtils.getMaxAndMinLatLng(baiduPointArr);
			var gpsMaxAndMin = BMapLib.GeoUtils.getMaxAndMinLatLng(gpsPointArr);//{max_lng: maxLng, max_lat:maxLat ,min_lng:minLng , min_lat:minLat};
			
//			console.log("baiduPointArrStrAll:"+baiduPointArrStrAll.join(";"));
//			console.log("baiduPointArrStrOld:"+item.gis_data);
//			console.log("gpsPointArrStrAll:"+gpsPointArrStrAll.join(";"));
//			console.log("baiduMaxAndMin:"+baiduMaxAndMin);
//			console.log("gpsMaxAndMin:"+gpsMaxAndMin);
			
			dmSceneAreaGisAct.obj_id = item.esbh_id;
			dmSceneAreaGisAct.obj_name = item.esbh_name;
			dmSceneAreaGisAct.obj_type = item.esbh_type;
			dmSceneAreaGisAct.city = item.city; 
			dmSceneAreaGisAct.city_id = noceUtil.city_LATN_ID[item.city]; 
			dmSceneAreaGisAct.country = item.country;
			dmSceneAreaGisAct.country_id = item.country_id;
			dmSceneAreaGisAct.mktcenter = item.mktcenter;
			dmSceneAreaGisAct.mktcenter_id = item.mktcenter_id;
			dmSceneAreaGisAct.gis_data_gps = gpsPointArrStrAll.join("|");
			dmSceneAreaGisAct.longitude_min_gps = gpsMaxAndMin.min_lng;
			dmSceneAreaGisAct.latitude_min_gps = gpsMaxAndMin.min_lat;
			dmSceneAreaGisAct.longitude_mid_gps = parseFloat((gpsMaxAndMin.min_lng+gpsMaxAndMin.max_lng)/2).toFixed(6);
			dmSceneAreaGisAct.latitude_mid_gps = parseFloat((gpsMaxAndMin.min_lat+gpsMaxAndMin.max_lat)/2).toFixed(6);
			dmSceneAreaGisAct.longitude_max_gps = gpsMaxAndMin.max_lng;
			dmSceneAreaGisAct.latitude_max_gps = gpsMaxAndMin.max_lat;
			dmSceneAreaGisAct.gis_data_baidu = baiduPointArrStrAll.join("|");
			dmSceneAreaGisAct.longitude_min_baidu = baiduMaxAndMin.min_lng;
			dmSceneAreaGisAct.latitude_min_baidu = baiduMaxAndMin.min_lat;
			dmSceneAreaGisAct.longitude_mid_baidu = parseFloat((baiduMaxAndMin.min_lng+baiduMaxAndMin.max_lng)/2).toFixed(6);
			dmSceneAreaGisAct.latitude_mid_baidu = parseFloat((baiduMaxAndMin.min_lat+baiduMaxAndMin.max_lat)/2).toFixed(6);
			dmSceneAreaGisAct.longitude_max_baidu = baiduMaxAndMin.max_lng;
			dmSceneAreaGisAct.latitude_max_baidu = baiduMaxAndMin.max_lat;
			dmSceneAreaGisAct.obj_area = parseInt(obj_area);
			dmSceneAreaGisAct.zlqy_flag = item.zlqy_flag;
			dmSceneAreaGisAct.audit_status = "编辑中";
			
			var ajaxData = IntelligentRoadTest_SystemLayerEdit.changeObj(dmSceneAreaGisAct)
//			console.log("dmSceneAreaGisAct:"+dmSceneAreaGisAct);
			ajaxData.type = 3;
			ajaxData.operate = "editAndSave";
//			console.log(ajaxData);
//			return;
			
			var $ajax = $.ajax({
		        type: 'post',
		        data: ajaxData,
		        url: 'pages_audit_OperateEntity_operateEntity.action',
		        cache: false,
		        dataType: 'json',
		        success: function(data){
		        	if(data.flag=="error"){
		        		alert(data.status);
		            }else{
		            	alert(data.status);
		            	IntelligentRoadTest_SystemLayerEdit.ajaxSuccessCallbackQuery(type,item);
		            }
		             
		        },
		        error: function(data,textStatus){
		            alert("保存编辑图层失败");
		        }
		    });
			
		}
		
	}else{
		alert("没有进行编辑，无需保存");
	}
	
	
}
/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.commitSystemLayer
 * @funcdesc 将保存后的图层轮廓 进行提交审核
 * @param {object} item (input) 该图层详情页对象
 * @param {array} type (input) 对象类型
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
//提交
IntelligentRoadTest_SystemLayerEdit.commitSystemLayer = function (item,type){
	if(item.esbh_id==null){
		alert("当前区域为新增区域，不可进行提交");
		return;
	}
	if(item.audit_stat=="待审核"||(item.audit_style == "删除"&&item.audit_stat == "审核通过")){
		//如果当前对象处于审核中，不可以进行提交，可以进行保存
		//图层已经删除，不可以进行提交
		alert("当前区域处于审核中，不可以进行提交");
		return;
	}
	if(IntelligentRoadTest_SystemLayerEdit.isEditPolygon){
		alert("请先保存编辑的多边形再进行提交");
		return;
	}
	
	if(IntelligentRoadTest_SystemLayerEdit.isRedrawPolygon){//重绘中不可以进行编辑
		alert("您正在进行重绘，请先保存再进行提交");
		return;
	}
	
	var dmSceneAreaGisAct = {};
	dmSceneAreaGisAct.obj_id = item.esbh_id;
	dmSceneAreaGisAct.obj_name = item.esbh_name;
	dmSceneAreaGisAct.obj_type = item.esbh_type;
	console.log("提交图层");
	
	var ajaxData = IntelligentRoadTest_SystemLayerEdit.changeObj(dmSceneAreaGisAct)
//		console.log("dmSceneAreaGisAct:"+dmSceneAreaGisAct);
	if($("#cityPermission_common").val().trim() != "全省"){ //非全省审核员
		$("#pass").show();
		$("#passSubmit").unbind("click").bind("click",function(){ //点击确定
			var text = $("#passText").val().trim();
            $("#passText").val("");
            ajaxData.audit_text = text;
            IntelligentRoadTest_SystemLayerEdit.submitCommitSystemLayer(ajaxData , item , type);
            $("#pass").hide();
		});
	}else{
        IntelligentRoadTest_SystemLayerEdit.submitCommitSystemLayer(ajaxData , item , type);
	}
}

IntelligentRoadTest_SystemLayerEdit.submitCommitSystemLayer = function (ajaxData,item,type){
	ajaxData.type = 3;
	ajaxData.operate = "commit";
	var $ajax = $.ajax({
        type: 'post',
        data: ajaxData,
        url: 'pages_audit_OperateEntity_operateEntity.action',
        cache: false,
        dataType: 'json',
        success: function(data){
        	if(data.flag=="error"){
        		alert(data.status);
            }else{
            	alert(data.status);
            	IntelligentRoadTest_SystemLayerEdit.ajaxSuccessCallbackQuery(type,item);
            }
        },
        error: function(data,textStatus){
            alert("提交图层审核失败");
        }
    });
}

/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer
 * @funcdesc 撤销提交的审核，出现撤销按钮只有本地网审核员才有，因为省级审核员提交后直接进行审核，无需别人进行审核
 * @param {object} item (input) 该图层详情页对象
 * @param {array} type (input) 对象类型
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
//撤销
IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer = function (item,type){
	console.log("recoverSystemLayer");
//	对于审核中的系统图层进行撤销，只有本地网审核员才会出现撤销按钮
//	1、将正在审核的单内容同步到历史表，将正在审核的单状态改为已撤销
//	2、将act表中当前用户的对应记录审核状态修改为已撤销
	var dmSceneAreaGisAct = {};
	dmSceneAreaGisAct.obj_id = item.esbh_id;
	dmSceneAreaGisAct.obj_name = item.esbh_name;
	dmSceneAreaGisAct.obj_type = item.esbh_type;
	var ajaxData = IntelligentRoadTest_SystemLayerEdit.changeObj(dmSceneAreaGisAct)
//	console.log("dmSceneAreaGisAct:"+dmSceneAreaGisAct);
	ajaxData.type = 3;
	ajaxData.operate = "recover";
	var $ajax = $.ajax({
        type: 'post',
        data: ajaxData,
        url: 'pages_audit_OperateEntity_operateEntity.action',
        cache: false,
        dataType: 'json',
        success: function(data){
        	if(data.flag=="error"){
        		alert(data.status);
            }else{
            	alert(data.status);
            	IntelligentRoadTest_SystemLayerEdit.ajaxSuccessCallbackQuery(type,item);
            }
        },
        error: function(data,textStatus){
            alert("撤销提交失败");
        }
    });
	
}

//手工新增，框选结束后用户选择保存类型后点击确定按钮触发的事件（将保存到关注区域和骨头区域的一起合并）
$('#sureSaveAsSystemLayer').click(function(){
	IntelligentRoadTest.SelectionOverlay.create_user = $('#headerUserForm_a').text().trim();
    // IntelligentRoadTest.SelectionOverlay.area_type = $("#saveConcernAreaType").val().trim();
    var area_name = $("#saveConcernAreaName").val().trim();
    var area_type = $("#SystemLayerSelect option:selected").val().trim();
    IntelligentRoadTest.SelectionOverlay.area_name =escapeHtml(area_name);
    IntelligentRoadTest.SelectionOverlay.area_type =escapeHtml(area_type);
    var city = $('#boxCitySelect option:selected').val();
    var district_id = $('#boxCountrySelect option:selected').val();
    var district_name = $('#boxCountrySelect option:selected').text();
    var mktcenter_id = $('#boxMktcenterSelect option:selected').val();
    var mktcenter_name = $('#boxMktcenterSelect option:selected').text();
    if(IntelligentRoadTest.SelectionOverlay.area_name==""){
        alert("请输入区域名称");
        return;
    }
    
    if(city=='请选择'||district_id=='请选择'||mktcenter_id=='请选择'){
    	alert('请选择添加区域所在的地市、区县、营服');
    	return;
    }
    
    if(area_type=="请选择"){
    	alert("请选择保存类型");
    	return;
    }else{
    	
    	IntelligentRoadTest.SelectionOverlay.city_select = city;
    	IntelligentRoadTest.SelectionOverlay.city_id = noceUtil.city_LATN_ID[city];
    	IntelligentRoadTest.SelectionOverlay.district_id = district_id;
    	IntelligentRoadTest.SelectionOverlay.district_name = district_name;
    	IntelligentRoadTest.SelectionOverlay.mktcenter_id = mktcenter_id;
    	IntelligentRoadTest.SelectionOverlay.mktcenter_name = mktcenter_name;
    	
    	if(area_type=="骨头区域"||area_type=="关注区域"){
    		IntelligentRoadTest.SelectionOverlay.area_type = $("#saveConcernAreaType").val().trim();
    		if(IntelligentRoadTest.SelectionOverlay.area_type==""){
    	        alert("请输入区域类型");
    	        return;
    	    }
    		
    		if(area_type=="骨头区域"){
    			IntelligentRoadTest.saveBoneArea(IntelligentRoadTest.SelectionOverlay);
    		}else{
    			IntelligentRoadTest.saveConcernArea(IntelligentRoadTest.SelectionOverlay);
    		}
    	}else{
    		IntelligentRoadTest_SystemLayerEdit.addSystemLayer(IntelligentRoadTest.SelectionOverlay);
    	}
    }
    
    
});
/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.addSystemLayer
 * @funcdesc 系统图层新增触发的方法
 * @param {object} areaOverlay (input) 框选结束后的覆盖物对象
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest_SystemLayerEdit.addSystemLayer = function (areaOverlay){
//	var overlayPointArr=areaOverlay.getPath();
	var pointArr = areaOverlay.getPath();
	var gpsPointArr = [];//当前多边形的gps经纬度点集合,使用百度点对象，因为后面计算最大最小经纬度的时候用的是百度点对象
	var gpsPointArrStr = [];//当前多边形gps经纬度点集合拼接的字符串数组（lng,lat）
	var pointArrStr = [];//当前多边形百度经纬度点集合拼接的字符串字符串数组（lng,lat）
	
	for(var k=0;k<pointArr.length;k++){
		var gpsPoint = GPSUtil.bd09_To_gps84(pointArr[k].lat,pointArr[k].lng);//百度坐标转gps坐标
		gpsPointArr.push(new BMap.Point(gpsPoint[1],gpsPoint[0]));//
		
		var pointStr = pointArr[k].lng+","+pointArr[k].lat;
		var	gpsPointStr = gpsPoint[1]+","+gpsPoint[0];
		pointArrStr.push(pointStr);
		gpsPointArrStr.push(gpsPointStr);
	}
	var baiduPointAllStr = pointArrStr.join("@")
	var gpsPointAllStr = gpsPointArrStr.join("@")
	
	var baiduMaxAndMin = BMapLib.GeoUtils.getMaxAndMinLatLng(pointArr);
	var gpsMaxAndMin = BMapLib.GeoUtils.getMaxAndMinLatLng(gpsPointArr);//{max_lng: maxLng, max_lat:maxLat ,min_lng:minLng , min_lat:minLat};
	var dmSceneAreaGisAct = {};
	dmSceneAreaGisAct.obj_id = null;
	dmSceneAreaGisAct.obj_name = areaOverlay.area_name;
	dmSceneAreaGisAct.obj_type = areaOverlay.area_type;
	dmSceneAreaGisAct.city = areaOverlay.city_select; 
	dmSceneAreaGisAct.city_id = noceUtil.city_LATN_ID[areaOverlay.city_select]; 
	dmSceneAreaGisAct.country = areaOverlay.district_name;
	dmSceneAreaGisAct.country_id = areaOverlay.district_id;
	dmSceneAreaGisAct.mktcenter = areaOverlay.mktcenter_name;
	dmSceneAreaGisAct.mktcenter_id = areaOverlay.mktcenter_id;
	dmSceneAreaGisAct.gis_data_gps = gpsPointAllStr;
	dmSceneAreaGisAct.longitude_min_gps = gpsMaxAndMin.min_lng
	dmSceneAreaGisAct.latitude_min_gps = gpsMaxAndMin.min_lat
	dmSceneAreaGisAct.longitude_mid_gps = parseFloat((gpsMaxAndMin.min_lng+gpsMaxAndMin.max_lng)/2).toFixed(6);
	dmSceneAreaGisAct.latitude_mid_gps = parseFloat((gpsMaxAndMin.min_lat+gpsMaxAndMin.max_lat)/2).toFixed(6);
	dmSceneAreaGisAct.longitude_max_gps = gpsMaxAndMin.max_lng
	dmSceneAreaGisAct.latitude_max_gps = gpsMaxAndMin.max_lat
	dmSceneAreaGisAct.gis_data_baidu = baiduPointAllStr;
	dmSceneAreaGisAct.longitude_min_baidu = baiduMaxAndMin.min_lng;
	dmSceneAreaGisAct.latitude_min_baidu = baiduMaxAndMin.min_lat;
	dmSceneAreaGisAct.longitude_mid_baidu = parseFloat((baiduMaxAndMin.min_lng+baiduMaxAndMin.max_lng)/2).toFixed(6);
	dmSceneAreaGisAct.latitude_mid_baidu = parseFloat((baiduMaxAndMin.min_lat+baiduMaxAndMin.max_lat)/2).toFixed(6);
	dmSceneAreaGisAct.longitude_max_baidu = baiduMaxAndMin.max_lng;
	dmSceneAreaGisAct.latitude_max_baidu = baiduMaxAndMin.max_lat;
	dmSceneAreaGisAct.obj_area = parseInt(BMapLib.GeoUtils.getPolygonArea(pointArr));
	dmSceneAreaGisAct.zlqy_flag = null;
	dmSceneAreaGisAct.audit_status = "审核中";
	console.log("dmSceneAreaGisAct:"+dmSceneAreaGisAct);
	
	if(areaOverlay.area_type==""){
		
	} 
	var type = null;
	switch (areaOverlay.area_type) {
	case "高校":
		type = 1;
		break;
	case "场馆":
		type = 10;
		break;
	case "美食":
		type = 9;
		break;
	case "美景":
		type = 7;
		break;
	case "农贸市场":
		type = 8;
		break;
	case "高流量住宅区":
		type = 2;
		break;
	case "高流量商务区":
		type = 3;
		break;
	case "城中村":
		type = 12;
		break;
	case "中小学":
		type = 11;
		break;
	default: 0
		break;
	}
	
	
	var ajaxData = IntelligentRoadTest_SystemLayerEdit.changeObj(dmSceneAreaGisAct);
	
	if($("#cityPermission_common").val().trim() != "全省"){ //非全省审核员
		$("#pass").show();
		$("#passSubmit").unbind("click").bind("click",function(){ //点击确定
			var text = $("#passText").val().trim();
            $("#passText").val("");
            ajaxData.audit_text = text;
            IntelligentRoadTest_SystemLayerEdit.submitAddLayer(ajaxData,type);
            $("#pass").hide();
		});
	}else{
        IntelligentRoadTest_SystemLayerEdit.submitAddLayer(ajaxData,type);
	}
	
}

IntelligentRoadTest_SystemLayerEdit.submitAddLayer = function (ajaxData,type){
	ajaxData.type = 3;
	ajaxData.operate = "systemLayerAdd";
	var $ajax = $.ajax({
        type: 'post',
        data: ajaxData,
        url: 'pages_audit_OperateEntity_operateEntity.action',
        cache: false,
        dataType: 'json',
        success: function(data){
        	if(data.flag=="error"){
        		alert(data.status);
            }else{
            	alert(data.status);
            	IntelligentRoadTest_SystemLayerEdit.ajaxSuccessCallbackQuery(type);
            	$("#showBoxSelectionList").hide();
                $('#BoxSelection').trigger("click");
            }
        },
        error: function(data,textStatus){
            alert("提交图层审核失败");
        }
    });
}

/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer
 * @funcdesc 删除系统图层
 * @param {object} item (input) 该图层详情页对象
 * @param {array} type (input) 对象类型
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
//删除系统图层
IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer = function (item,type){
	if(item.audit_stat=="待审核"){
		alert("当前区域处于审核中，不可以进行删除操作");
		return;
	}
	
	if(item.audit_style == "删除"&&item.audit_stat == "审核通过"){
		//审核中的图层，不可以进行提交审核
		//已经删除的图层，不可以进行删除操作
		alert("当前图层已经删除，不可以进行删除操作");
		return;
	}

    var dmSceneAreaGisAct = {};
    dmSceneAreaGisAct.obj_id = item.esbh_id;
    dmSceneAreaGisAct.obj_name = item.esbh_name;
    dmSceneAreaGisAct.obj_type = item.esbh_type;
    var ajaxData = IntelligentRoadTest_SystemLayerEdit.changeObj(dmSceneAreaGisAct);
    if($("#cityPermission_common").val().trim() != "全省"){ //非全省审核员
		$("#pass").show();
		$("#passSubmit").unbind("click").bind("click",function(){ //点击确定
			var text = $("#passText").val().trim();
            $("#passText").val("");
            ajaxData.audit_text = text;
            IntelligentRoadTest_SystemLayerEdit.submitDelteLayer(ajaxData , item , type);
            $("#pass").hide();
		});
	}else{
        IntelligentRoadTest_SystemLayerEdit.submitDelteLayer(ajaxData , item , type);
	}

}

/*提交删除图层的操作*/
IntelligentRoadTest_SystemLayerEdit.submitDelteLayer = function(ajaxData , item,type){
    ajaxData.type = 3;
    ajaxData.operate = "delete";
    var $ajax = $.ajax({
        type: 'post',
        data: ajaxData,
        url: 'pages_audit_OperateEntity_operateEntity.action',
        cache: false,
        dataType: 'json',
        success: function(data){
            if(data.flag=="error"){
                alert(data.status);
            }else{
                alert(data.status);
                IntelligentRoadTest_SystemLayerEdit.ajaxSuccessCallbackQuery(type,item);
            }
        },
        error: function(data,textStatus){
            alert("提交删除图层审核失败");
        }
    });
}

/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.ajaxSuccessCallbackQuery
 * @funcdesc 后台处理图层成功后，对数据进行刷新
 * @param {object} item (input) 该图层详情页对象
 * @param {array} type (input) 对象类型
 * @return {null}
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
//后台处理成功后刷新数据
IntelligentRoadTest_SystemLayerEdit.ajaxSuccessCallbackQuery = function(type,item) {
	var currentCollegeCity = null;
	var district = null;
	var district_id = null;
	var mktcenter = null;
	var mktcenter_id = null;
	if (type == 1) {
		currentCollegeCity = $("#collegeCityName").text();
		district = $("#collegeDistrictName").text();
		mktcenter = $("#collegeMktName").text();
	} else if (type == 2) {
		currentCollegeCity = $("#uptownCityName").text();
		district = $("#uptownDistrictName").text();
		mktcenter = $("#uptownMktName").text();
	} else if (type == 3) {
		currentCollegeCity = $("#businessCityName").text();
		district = $("#businessDistrictName").text();
		mktcenter = $("#businessMktName").text();
	} else if (type == 7) {
		currentCollegeCity = $("#sceneryName").text();
		district = $("#sceneryDistrictName").text();
		mktcenter = $("#sceneryMktName").text();
	} else if (type == 8) {
		currentCollegeCity = $("#marketCityName").text();
		district = $("#marketDistrictName").text();
		mktcenter = $("#marketMktName").text();
	} else if (type == 9) {
		currentCollegeCity = $("#foodCityName").text();
		district = $("#foodDistrictName").text();
		mktcenter = $("#foodMktName").text();
	} else if (type == 10) {
		currentCollegeCity = $("#siteCityName").text();
		district = $("#siteCityDistrictName").text();
		mktcenter = $("#siteCityMktName").text();
	}else if (type == 11||type == 12) {
		currentCollegeCity = $("#senseCityName").text();
		district = $("#senseDistrictName").text();
		mktcenter = $("#senseMktName").text();
	}

	if (district == "全市") {
		district = null;
		mktcenter = null;
	} else {
		if (mktcenter == "全区") {
			mktcenter = null;
		}
	}
	if (currentCollegeCity != null) {
		var disObj = IntelligentRoadTest.districtLngAndLat[currentCollegeCity];
		if (disObj && district != null) {// 获取到区县的id
			district_id = disObj[district]["id"];
		}

		if (mktcenter != null) {
			var mktDistrictObj = IntelligentRoadTest.mktcenterLngAndLat[currentCollegeCity];
			if (mktDistrictObj) {// 先获取到地市的所有区县营服
				var mkt = null;
				for ( var districtObj in mktDistrictObj) {// 遍历该地市的所有区县营服，根据id匹配出所在区县的所有营服
					var dis_id = districtObj.split("_")[0];
					if (district_id == dis_id) {
						// 这里为什么能直接用id，因为前面已经判断过，如果是全市的话，区县、营服名称会为null，不会进入这整个分支，并且前面已经匹配出区县id
						mkt = mktDistrictObj[districtObj];
						break;
					}
				}

				for ( var i = 0; i < mkt.length; i++) {
					if (mktcenter == mkt[i].name) {
						mktcenter_id = mkt[i].id;
					}
				}

			}
		}
	}

	if (type == undefined) {
		// 战狼区域,暂时不做
		// IntelligentRoadTest.getWarwolfListData();
	} else {
		// 更新场景的列表数据
		IntelligentRoadTest.getSenseDataByObjectId(type, currentCollegeCity,
				IntelligentRoadTest.day, district_id, mktcenter_id);
		if(item){
			// 直接进入对应场景的对应id的详情页
			IntelligentRoadTest.getSenseDataByESBHID(type, item.esbh_id,IntelligentRoadTest.day);
		}
		
	}
}

/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.changeObj
 * @funcdesc 根据act对象进行转置，提交到后台直接映射成对象
 * @param {object} dmSceneAreaGisAct (input) 转置的act对象
 * @return {object} newGisActObject 转置后的对象
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest_SystemLayerEdit.changeObj = function (dmSceneAreaGisAct){
	var newGisActObject = {
			"dmSceneAreaGisAct.obj_id":dmSceneAreaGisAct.obj_id,
			"dmSceneAreaGisAct.obj_name":dmSceneAreaGisAct.obj_name,
			"dmSceneAreaGisAct.obj_type":dmSceneAreaGisAct.obj_type,
			"dmSceneAreaGisAct.city":dmSceneAreaGisAct.city,
			"dmSceneAreaGisAct.city_id":dmSceneAreaGisAct.city_id,
			"dmSceneAreaGisAct.country":dmSceneAreaGisAct.country,
			"dmSceneAreaGisAct.country_id":dmSceneAreaGisAct.country_id,
			"dmSceneAreaGisAct.mktcenter":dmSceneAreaGisAct.mktcenter,
			"dmSceneAreaGisAct.mktcenter_id":dmSceneAreaGisAct.mktcenter_id,
			"dmSceneAreaGisAct.gis_data_gps":dmSceneAreaGisAct.gis_data_gps,
			"dmSceneAreaGisAct.longitude_min_gps":dmSceneAreaGisAct.longitude_min_gps,
			"dmSceneAreaGisAct.latitude_min_gps":dmSceneAreaGisAct.latitude_min_gps,
			"dmSceneAreaGisAct.longitude_mid_gps":dmSceneAreaGisAct.longitude_mid_gps,
			"dmSceneAreaGisAct.latitude_mid_gps":dmSceneAreaGisAct.latitude_mid_gps,
			"dmSceneAreaGisAct.longitude_max_gps":dmSceneAreaGisAct.longitude_max_gps,
			"dmSceneAreaGisAct.latitude_max_gps":dmSceneAreaGisAct.latitude_max_gps,
			"dmSceneAreaGisAct.gis_data_baidu":dmSceneAreaGisAct.gis_data_baidu,
			"dmSceneAreaGisAct.longitude_min_baidu":dmSceneAreaGisAct.longitude_min_baidu,
			"dmSceneAreaGisAct.latitude_min_baidu":dmSceneAreaGisAct.latitude_min_baidu,
			"dmSceneAreaGisAct.longitude_mid_baidu":dmSceneAreaGisAct.longitude_mid_baidu,
			"dmSceneAreaGisAct.latitude_mid_baidu":dmSceneAreaGisAct.latitude_mid_baidu,
			"dmSceneAreaGisAct.longitude_max_baidu":dmSceneAreaGisAct.longitude_max_baidu,
			"dmSceneAreaGisAct.latitude_max_baidu":dmSceneAreaGisAct.latitude_max_baidu,
			"dmSceneAreaGisAct.obj_area":dmSceneAreaGisAct.obj_area,
			"dmSceneAreaGisAct.zlqy_flag":dmSceneAreaGisAct.zlqy_flag,
//			"dmSceneAreaGisAct.editor_id":dmSceneAreaGisAct.editor_id,
//			"dmSceneAreaGisAct.edit_time":dmSceneAreaGisAct.edit_time,
//			"dmSceneAreaGisAct.auditor_id":dmSceneAreaGisAct.auditor_id,
//			"dmSceneAreaGisAct.audit_time":dmSceneAreaGisAct.audit_time,
			"dmSceneAreaGisAct.audit_status":dmSceneAreaGisAct.audit_status,
	    };
	return newGisActObject;
}

/**********************************
 * @funcname IntelligentRoadTest_SystemLayerEdit.getMessageDivId
 * @funcdesc 根据对象类型获取详情页的div id
 * @param {string} obj_type (input) 对象类型
 * @return {string} detilInfoDivId 详情页div的id
 * @author 梁杰禹
 * @create 20180410
 * @modifier
 * @modify
 ***********************************/
IntelligentRoadTest_SystemLayerEdit.getMessageDivId = function (obj_type){
	var detilInfoDivId = "";
	switch (obj_type) {
	case "高校":
		detilInfoDivId = "showCollegeCompleteMessage";
		break;
	case "高密度住宅区":
		detilInfoDivId="showUptownCompleteMessage";
		break;
	case "高流量商务区":
		detilInfoDivId="showBusinessCompleteMessage";
		break;
	case "美景":
		detilInfoDivId="showSceneryCompleteMessage";
		break;
	case "战狼区域":
		detilInfoDivId="showWarwolfCompleteMessage";
		 break;
	case "农贸市场":
		detilInfoDivId="showMarketCompleteMessage";
		break;
	case "美食":
		detilInfoDivId="showFoodCompleteMessage";
		break;
	case "场馆":
		detilInfoDivId="showSiteCompleteMessage";
		break;
	case "城中村":
		detilInfoDivId="showSenseCompleteMessage";
		break;
	case "中小学":
		detilInfoDivId="showSenseCompleteMessage";
		break;
	case "自然村":
		detilInfoDivId="showSenseCompleteMessage";
		break;
	case "工厂":
		detilInfoDivId="showSenseCompleteMessage";
		break;
	default: ""
		break;
	}
	
	return detilInfoDivId;
}
//-----------------------------系统图层编辑    end-----------------------------------------------------
