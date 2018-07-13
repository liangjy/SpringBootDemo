//----------------------------下面的代码为注册和移除多边形对象数据（适配需求点击地图显示结果列表给用户选择）---------------------------------------------
IntelligentRoadTest.polygonToLayer = [];//存储的对象数据
IntelligentRoadTest.polygonToLayerComponents = null;//用于识别注册对象
//注册多边形到图层对象中
//注意：itemData为扇区时数据格式和其他类型不一样
IntelligentRoadTest.registeredPolygonToLayer = function IntelligentRoadTest_registeredPolygonToLayer(itemData){
//	console.log(itemData);
	//在注册这个图层数据时，先匹配看是否已经有这个图层数据，如果已经有，则不需要放入
	var isNeedAdd = true;
	for(var i=0;i<IntelligentRoadTest.polygonToLayer.length;i++){
		if(IntelligentRoadTest.polygonToLayer[i].obj_type=='sector'){//如果是扇区，需要根据基站id和扇区id进行判断
			if(IntelligentRoadTest.polygonToLayer[i].statn_id==itemData.statn_id
					&&IntelligentRoadTest.polygonToLayer[i].cell_id==itemData.cell_id){
				isNeedAdd = false;
			}
		}else{
			if(IntelligentRoadTest.polygonToLayer[i].obj_type==itemData.obj_type
					&&IntelligentRoadTest.polygonToLayer[i].obj_id==itemData.obj_id){
				//如果是一个对象，有多个多边形的情况，修改为一个对象只存储一个，避免多个的时候注销困难
				if(itemData.obj_type=='poorArea'||itemData.obj_type=='upPoorArea'
					||itemData.obj_type=='dwPoorArea'||itemData.obj_type=='m3PoorArea'
						||itemData.obj_type=='olPoorArea'||itemData.obj_type=='cbPoorArea'){//由于弱区的特殊性，需要再加上日期判断
					if(IntelligentRoadTest.polygonToLayer[i].day==itemData.day){//如果是同一天的弱区，编号也相等，则认为是同一个，不需要存放近数组中
						//将经纬度转成string再比较是否相等
						if(IntelligentRoadTest.polygonToLayer[i].pointsString==itemData.pointsString){
							isNeedAdd = false;
						}
					}
				}else{
					if(IntelligentRoadTest.polygonToLayer[i].pointsString==itemData.pointsString){
						isNeedAdd = false;
					}
				}
			}
		}
		
	}
	
	if(isNeedAdd){
		IntelligentRoadTest.polygonToLayer.push(itemData);
	}
//	console.log("registeredPolygon:"+IntelligentRoadTest.polygonToLayer.length);
	IntelligentRoadTest.updatePolygonLayerData();
}

//将多边形从图层对象中注销
//注意：itemData为扇区时数据格式和其他类型不一样,一个对象只存储一个（多个多边形也一样）
IntelligentRoadTest.logOutPolygonToLayer = function IntelligentRoadTest_logOutPolygonToLayer(itemData){
	
//	console.log(itemData);
	var deleteIndexArr = null;
	for(var i=0;i<IntelligentRoadTest.polygonToLayer.length;i++){
		if(IntelligentRoadTest.polygonToLayer[i].obj_type=='sector'){//如果是扇区，需要根据基站id和扇区id进行判断
			if(IntelligentRoadTest.polygonToLayer[i].statn_id==itemData.statn_id
					&&IntelligentRoadTest.polygonToLayer[i].cell_id==itemData.cell_id){
				deleteIndexArr = i;
			}
		}else{
			if(IntelligentRoadTest.polygonToLayer[i].obj_type==itemData.obj_type
					&&IntelligentRoadTest.polygonToLayer[i].obj_id==itemData.obj_id){
				//如果是一个对象，有多个多边形的情况，如何处理？
				if(itemData.obj_type=='poorArea'||itemData.obj_type=='upPoorArea'
					||itemData.obj_type=='dwPoorArea'||itemData.obj_type=='m3PoorArea'
						||itemData.obj_type=='olPoorArea'||itemData.obj_type=='cbPoorArea'){//由于弱区的特殊性，需要再加上日期判断
					if(IntelligentRoadTest.polygonToLayer[i].day==itemData.day){//如果是同一天的弱区，编号也相等，则认为是同一个，不需要存放进数组中
						deleteIndexArr = i;
						//将经纬度转成string再比较是否相等
//						if(JSON.stringify(IntelligentRoadTest.polygonToLayer[i].points)==JSON.stringify(itemData.points)){
//							deleteIndexArr.push(i);
//						}
					}
				}else{
//					if(JSON.stringify(IntelligentRoadTest.polygonToLayer[i].points)==JSON.stringify(itemData.points)){
//						deleteIndexArr.push(i);
//					}
					deleteIndexArr = i;
				}
			}
		}
	}
	
	if(deleteIndexArr!=null){
		IntelligentRoadTest.polygonToLayer.splice(deleteIndexArr,1);
	}
//	console.log("logOutPolygon:"+IntelligentRoadTest.polygonToLayer.length);
	IntelligentRoadTest.updatePolygonLayerData();
}
//
IntelligentRoadTest.updatePolygonLayerData = function IntelligentRoadTest_updatePolygonLayerData(){
	//重新生成一份数据直接替换掉旧数据，因为如果进行适配的话，会 出现一个对象多个多边形很难匹配的情况
	var newDataArr= [];
	for(var i=0;i<IntelligentRoadTest.polygonToLayer.length;i++){
		if(IntelligentRoadTest.polygonToLayer[i].obj_type=='sector'){
			newDataArr.push(IntelligentRoadTest.polygonToLayer[i]);
//			if(IntelligentRoadTest.polygonToLayer.type==1){//室内
//				
//			}else{
//				
//			}
//			var points = IntelligentRoadTest.polygonToLayer.points
		}else{
			var gis_data = IntelligentRoadTest.polygonToLayer[i].pointsString.split(";");
			for(var j=0;j<gis_data.length;j++){
				var points_arr = gis_data[j].split('@');
				var point_arr = [];
				for(k=0;k<points_arr.length;k++){
					var p = points_arr[k].split(",");
					var point = new BMap.Point(p[0],p[1]);
					point_arr.push(point);
				}
				
				var data = {
						obj_type:IntelligentRoadTest.polygonToLayer[i].obj_type,
				    	points:point_arr,
				    	type:2,
				    	decide:1,
				    	obj_id:IntelligentRoadTest.polygonToLayer[i].obj_id,
				    	day:IntelligentRoadTest.polygonToLayer[i].day,
				    	name:IntelligentRoadTest.polygonToLayer[i].name,
				    	isDashLine:IntelligentRoadTest.polygonToLayer[i].isDashLine
				};
				newDataArr.push(data);
			}
		}
	}
	
	if(IntelligentRoadTest.polygonToLayerComponents==null){
		var bMapObj={
            map:IntelligentRoadTest.map,
            sectorColor:"white",
            circleColor:"white",
            lineColor:"white",
            opacity:"white",
            lineOpacity:1,
            lineWidth:2,
            sectorZindex:0,
        };
		IntelligentRoadTest.polygonToLayerComponents = new SectorUtilForBaidu(bMapObj);
	}
	
	IntelligentRoadTest.polygonToLayerComponents.polygonCanvasArr = newDataArr;
	
	
//	IntelligentRoadTest.polygonToLayerComponentsData = newDataArr;
//	console.log(IntelligentRoadTest.polygonToLayerComponents.polygonCanvasArr);
}


IntelligentRoadTest.judgmentIsNeedRegisteredPolygonToLayer = function IntelligentRoadTest_judgmeIsNeedRegisteredPolygonToLayer(type){
	var isNeedAdd = true;
	//场景类 判断
	if(IntelligentRoadTest.showSceneAreaId=="concern"&&type=="concern"){//关注区域
		isNeedAdd = false;
	}else if(IntelligentRoadTest.showSceneAreaId=="bone"&&type=="boneArea"){//骨头区域
		isNeedAdd = false;
	}else if(IntelligentRoadTest.showSceneAreaId=="highColleges"&&type=="college"){//高校
		isNeedAdd = false;
	}else if(IntelligentRoadTest.showSceneAreaId=="venues"&&type=="site"){//场馆
		isNeedAdd = false;
	}else if(IntelligentRoadTest.showSceneAreaId=="beautyFood"&&type=="food"){//美食
		isNeedAdd = false;
	}else if(IntelligentRoadTest.showSceneAreaId=="beautyScenery"&&type=="scenery"){//美景
		isNeedAdd = false;
	}else if(IntelligentRoadTest.showSceneAreaId=="wolfArea"&&type=="warwolf"){//战狼区域
		isNeedAdd = false;
	}else if(IntelligentRoadTest.showSceneAreaId=="farmerMarket"&&type=="market"){//农贸市场
		isNeedAdd = false;
	}else if(IntelligentRoadTest.showSceneAreaId=="highResidence"&&type=="uptown"){//高密度住宅区
		isNeedAdd = false;
	}else if(IntelligentRoadTest.showSceneAreaId=="highBusiness"&&type=="business"){//高流量商务区
		isNeedAdd = false;
	}else if(IntelligentRoadTest.showSceneAreaId=="village"&&type=="village"){//自然村
		isNeedAdd = false;
	}else if(IntelligentRoadTest.showSceneAreaId=="cityVillage"&&type=="cityVillage"){//城中村
		isNeedAdd = false;
	}else if(IntelligentRoadTest.showSceneAreaId=="school"&&type=="school"){//中小学
		isNeedAdd = false;
	}else if(IntelligentRoadTest.showSceneAreaId=="factory"&&type=="factory"){//工厂
		isNeedAdd = false;
	}
	return isNeedAdd;
}