/**
 * 工程工具JS，存放公用方法
 */
var BMapUtil = {};

//时间测试
var sectorDate1,sectorDate2,sectorDate3;

/**********************************
 * @funcname SectorStation
 * @funcdesc 初始函数
 * @param {map} type (input)
 * @return {null}
 * @author 邹土杰
 * @create 20170515
 * @modifier 
 * @modify 
 ***********************************/
function sectorStation(bMapObj,overlayEventArray,overlaycallbackArray){
	this.map=bMapObj.map;//地图
	this.selectTime=bMapObj.selectTime;//缓存所选的时间
	this.selecMarketbase=bMapObj.selecMarketbase; //缓存所选的营服中心
	this.selectCity=bMapObj.selectCity; //缓存所选的城市
	this.selectDistrict=bMapObj.selectDistrict; //缓存所选的区县
	this.selectNetType=bMapObj.selectNetType;//缓存所选网络类型
	this.useSelectTimeQuerySector=bMapObj.useSelectTimeQuerySector;//使用缓存时间查询扇区
	this.RSRPVectorStarChe = [];//缓存高价值基站	
	this.RSRPSectorChe = [];//缓存扇区
	this.RSRPCircleChe = [];//缓存扇区定点圆
	this.RSRPStationChe = [];//缓存基站
	this.RSRPVectorStarChe = [];//缓存高价值基站
	this.mapvLayerSector=null;//扇区mapvLayer
	this.alreadySector=false;//已经查询扇区信息
	this.olswChe;//覆盖物范围左下角位置
	this.olneChe;//覆盖物范围右上角位置	
	this.NetTypeChe=null;//缓存已渲染的网络类型
	this.lastTimeSelecMarketbase=null;//上次选的营服中心，用于判断营服中心选择是否变更
	this.overlayEventArray=overlayEventArray;//扇区事件
	this.overlaycallbackArray=overlaycallbackArray;//扇区事件回调函数
	
	this.containerID=bMapObj.containerID;
	this.container=null;//搜索框容器
	this.searchSectorContent=null;//搜索框内容缓存
	this.searchSector=[];//缓存定位的扇区
	if(null!=this.containerID){
		this.queryContainerCreat();
	}
	this.positioningEvent=bMapObj.positioningEvent;
}

/**********************************
 * @funcname queryByTemplate
 * @funcdesc 根据模版查询基站扇区数据
 * @param {map,centerPoint} type (input)
 * @return {null}
 * @author 邹土杰
 * @create 20170515
 * @modifier 
 * @modify 
 ***********************************/
sectorStation.prototype.queryByTemplate=function(){
	//500米以上不打扇区基站
	var zoom=this.map.getZoom();
	if(zoom<15){
		return;
	}
	var centerPoint=this.map.getCenter();
	var nettype = this.selectNetType;
	this.NetTypeChe=this.selectNetType;
	this.lastTimeSelecMarketbase=this.selecMarketbase;
	sectorDate1=new Date();//时间测试
	var list1 = [];
	var progressBarSqls=[],functionlist=[];	
	var standard,jOIN2G;
	this.highStatn();
	if(nettype == '4G' || nettype == null){
		nettype = '4G';
		standard = "FDD";
		jOIN2G="2GJOIN:on (sector.base_statn_id=alarm.base_statn_id and alarm.alarm_scope='base_station') or (sector.base_statn_id=alarm.base_statn_id and sector.cell_id=alarm.cell_id and alarm.alarm_scope='cell')";
	}else{
		nettype = "3G";
		standard = "1X+DO','1X";
		jOIN2G="2GJOIN:on sector.base_statn_id=alarm.base_statn_id and sector.bsc_id=alarm.bsc_id";
	}
	var timepara;
	if(null==this.useSelectTimeQuerySector || true==this.useSelectTimeQuerySector){
		timepara="TIME:"+this.selectTime;
	}else{
		timepara="TIME:(select max(day) from noce.dim_sector)";
	}
	if(this.selecMarketbase!=null && this.selecMarketbase!="全营服中心"){//选了营服
		list1.push("CustExpVsl_08_dist_mkt_info");
		list1.push(jOIN2G);
		list1.push(timepara);
		list1.push("NETTYPE:"+nettype);
		list1.push("CITYNAME:"+this.selectCity);
		list1.push("DISTRICTNAME:"+this.selectDistrict);
		list1.push("MKTCENNAME:"+this.selecMarketbase);
		list1.push("STANDARD:"+standard);
		progressBarSqls.push(list1);
		functionlist.push(this.showSectorDate);
	}else{
		this.pointswAndne(centerPoint);
		var bs = this.map.getBounds(); // 获取可视区域
		var bssw = bs.getSouthWest(); // 可视区域左下角
		DIST_KM_H=this.map.getDistance(new BMap.Point(bssw.lng,bssw.lat),new BMap.Point(centerPoint.lng,bssw.lat))/1000; 
		DIST_KM_V=this.map.getDistance(new BMap.Point(bssw.lng,bssw.lat),new BMap.Point(bssw.lng,centerPoint.lat))/1000;
		list1.push("CustExpVsl_09_sqr_mkt_info");
		list1.push(jOIN2G);
		list1.push(timepara);
		list1.push("NETTYPE:"+nettype);
		list1.push("LATITUDCENTER:"+centerPoint.lat);
		list1.push("LONGITUDCENTER:"+centerPoint.lng);
		list1.push("DIST_KM_H:"+DIST_KM_H);
		list1.push("DIST_KM_V:"+DIST_KM_V);
		list1.push("STANDARD:"+standard);
		progressBarSqls.push(list1);
		functionlist.push(this.showSectorDate);
	}
	var database = [3];
	progressbarTwo.submitSql(progressBarSqls, functionlist,database,[this]);
}

/**********************************
 * @funcname showSectorDate
 * @funcdesc 扇区基站渲染回调函数
 * @param {data} type (input)
 * @return {null}
 * @author 邹土杰
 * @create 20170515
 * @modifier 
 * @modify 
 ***********************************/
sectorStation.prototype.showSectorDate=function(data,obj){
	sectorDate2=new Date();//时间测试
	var resultData = changeData(data);
	if(resultData.length == 0){
		alert("该营服中心经纬度数据缺失！");	
		obj.sectorHide();//隐藏上一次的渲染结果
		return;
	}
	if(obj.RSRPStationChe.length>0){
		$.each(obj.RSRPStationChe,function(i,item){
			obj.map.removeOverlay(item);			
		});
		obj.RSRPStationChe=[];
	}
	if(obj.RSRPSectorChe.length>0){
		$.each(obj.RSRPSectorChe,function(i,item){
			obj.map.removeOverlay(item);		
		});
		obj.RSRPSectorChe=[];
	}
	if(obj.RSRPCircleChe.length>0){
		$.each(obj.RSRPCircleChe,function(i,item){
			obj.map.removeOverlay(item);			
		});
		obj.RSRPCircleChe=[];
	}
	if(obj.mapvLayerSector!=null){
		obj.mapvLayerSector.destroy();
		obj.mapvLayerSector=null;
	}
	obj.alreadySector=true;
	var zoom=obj.map.getZoom();
	if(zoom==15){
		obj.mapvSectorLayer(resultData);
	}else{
		obj.sectorLayer(resultData);
	}	

	//时间测试
	sectorDate3=new Date();
	console.log("扇区查询时间："+(sectorDate2-sectorDate1));
	console.log("扇区渲染时间："+(sectorDate3-sectorDate2));
	console.log("扇区总时间："+(sectorDate3-sectorDate1));
}

/**********************************
 * @funcname sectorLayer
 * @funcdesc 打基站扇区
 * @param {resultData} type (input)
 * @return {null}
 * @author 邹土杰
 * @create 20170426
 * @modifier 
 * @modify 
 ***********************************/
sectorStation.prototype.sectorLayer=function(resultData){
	for(var i=0;i<resultData.length;i++){
		var result=resultData[i];
		var lng=result.longitude_baidu;
		var lat=result.latitude_baidu;
		var point=new BMap.Point(lng, lat);
		var ant_azimuth=result.ant_azimuth;
		point.sector_id=result.sector_id;//扇区ID
		point.sector_name=null==result.sector_name?"":result.sector_name;//扇区名称
		point.sector_addr=null==result.sector_addr?"":result.sector_addr;//扇区地址
		point.ant_azimuth=null==ant_azimuth?"":ant_azimuth+"°";//扇区方位角		
		point.statn_id=null==result.base_statn_id?"":result.base_statn_id;//基站编号
		point.statn_name=null==result.base_statn_name?"":result.base_statn_name;//基站名称
		point.vendor=null==result.bs_vendor?"":result.bs_vendor;//基站厂家
		point.market=null==result.mkt_center_name?"":result.mkt_center_name;//营服中心
		point.area=null==result.area_name?"":result.area_name;//区县
		point.gps="("+result.longitude+","+result.latitude+")";//gps经纬度
		point.cell_id=result.cell_id==null?"":result.cell_id;//小区编码
		point.cell_name=result.cell_name==null?"":result.cell_name;//小区名称
		point.nettype=result.nettype==null?"":result.nettype;//网络类型
		var is_indoor=result.is_indoor;//室内外
		point.is_indoor=is_indoor;
		point.band=null==result.band?"":result.band;//频段
		point.ant_electron_angle=null==result.ant_electron_angle?"":result.ant_electron_angle;//电子下倾
		point.ant_engine_angle=null==result.ant_engine_angle?"":result.ant_engine_angle;//机械下倾
		point.high=null==result.high?"":result.high+"米";//天线挂高
		point.acceptstatus=null==result.acceptstatus?"":result.acceptstatus;//验收状况
		point.longitude=null==result.longitude?"":result.longitude;//经度
		point.latitude=null==result.latitude?"":result.latitude;//纬度
		point.bsc_id=null==result.bsc_id?"":result.bsc_id;//2G类型BSC编号
		point.total_declination_angle=null==result.total_declination_angle?"":result.total_declination_angle;//2G类型总下倾角度
		//point.selectTime=this.selectTime;
		point.day=this.selectTime;
		point.thisObj=this;
		var outofsrv=result.outofsrv;//是否断站退服
		var circleColor;
		if('通过'==point.acceptstatus){//通过验收
			if(1==outofsrv){//断站退服
				circleColor="#EE4039";
				var marker=new BMap.Marker(point);
				this.map.addOverlay(marker);
				this.RSRPCircleChe.push(marker);//水滴缓存
			}else{
				circleColor="#3EC705";
			}
		}else{//不通过验收
			circleColor="#BFBBB7";
		}
		if('室外'==is_indoor){
			//根据频段，扇区的高矮肥瘦不同   point.band==1.8GH时为默认
			var xy=0.0006;
			var z=3.5;
			if("2.6GHz"==point.band){
				xy=0.0002;
				z=0.8;
			}else if("2.1GHz"==point.band){
				xy=0.0004;
				z=1.8;
			}else if("800MHz"==point.band){
				xy=0.0008;
				z=5.5;
			}
			
			var assemble=BMapUtil.add_sector(point,xy,xy,z,ant_azimuth);
			var sectorPolygon=new BMap.Polygon(assemble);
			//sectorPolygon.setFillColor("blue");
			sectorPolygon.setFillColor(circleColor);
			sectorPolygon.setStrokeWeight(1);
			//sectorPolygon.setFillOpacity(0.6);			
			sectorPolygon.point2=point;
			if(null!=this.overlaycallbackArray && null!=this.overlayEventArray){
				this.overlayEventListener(sectorPolygon);
			}else{
				sectorPolygon.bmap=this.map;
				sectorPolygon.addEventListener("click",this.circleclick);
			}					
			this.map.addOverlay(sectorPolygon);
			this.RSRPSectorChe.push(sectorPolygon);
			var circle=new BMap.Circle(point,3,{fillColor:"#d340c3",strokeWeight:1});
			this.RSRPCircleChe.push(circle);
			this.map.addOverlay(circle);
		}else{						
			var circle=new BMap.Circle(point,20,{fillColor:circleColor,strokeWeight:1,strokeColor:circleColor,fillOpacity:1});
			var circle2=new BMap.Circle(point,8,{fillColor:"#ffffff",strokeWeight:1,strokeColor:"ffffff",fillOpacity:1});
			var zoom = this.map.getZoom();
			circle.point2=point;
			circle2.point2=point;
			if(null!=this.overlaycallbackArray && null!=this.overlayEventArray){
				this.overlayEventListener(circle);
				this.overlayEventListener(circle2);
			}else{
				circle.bmap=this.map;
				circle2.bmap=this.map;
				circle.addEventListener('click', this.circleclick);
				circle2.addEventListener('click', this.circleclick);
			}			
			this.RSRPStationChe.push(circle);
			this.map.addOverlay(circle);
			this.RSRPStationChe.push(circle2);
			this.map.addOverlay(circle2);
		}
	}
}

/**********************************
 * @funcname circleclick
 * @funcdesc 室内基站点击事件
 * @param {e} type (input)
 * @return {null}
 * @author 邹土杰
 * @create 20170515
 * @modifier 邹土杰
 * @modify 20170621
 ***********************************/
sectorStation.prototype.circleclick=function(e){ 
	var p=this.point2;
	var is_indoor=p.is_indoor;
	var title=""+is_indoor+"";
	//由取扇区表最大时间修改成取this.selectTime
	var selectedDay=p.thisObj.selectTime;
	if(selectedDay!=p.day){
		p.infoStr=null;
	}
	
	var infoStr;
	var infoWindow;
	if(null==p.infoStr){
		if(p.nettype == "4G"){
			infoStr ="基站编号："+p.statn_id+"<br/>扇区编号："+p.sector_id+"<br/>扇区名称："+p.sector_name+"<br/>频段："+p.band+
			"<br/>方位角 ："+p.ant_azimuth+"<br/>机械下倾："+p.ant_engine_angle+"<br/>电子下倾："+p.ant_electron_angle+"<br/>天线挂高："+
			p.high+"<br/>经度："+p.longitude+"<br/>纬度："+p.latitude+"<br/>验收状况："+p.acceptstatus+"<br/>站址地址："+p.sector_addr+"<br/><a href='javascript:BMapUtil.redirect("+p.statn_id+","+p.cell_id+","+selectedDay+")' style='color: blue;text-decoration: underline;'>更多...</a>";
			
			infoWindow = new BMap.InfoWindow(infoStr,{title:title});// 创建信息窗口对象 	
			var key=selectedDay+"_"+p.statn_id+"_"+p.sector_id;
			BMapUtil.dayTrafficQuery(key,infoWindow,p);//查询日流量数据,并修改infoWindow的内容
		}else{
			infoStr ="BSC编号："+p.bsc_id+"<br/>基站编号："+p.statn_id+"<br/>基站名称："+p.statn_name+"<br/>扇区编号："+p.sector_id+"<br/>扇区名称："+p.sector_name+"<br/>天线方向角："+p.ant_azimuth+
			"<br/>总下倾角度 ："+p.total_declination_angle+"<br/>天线挂高："+p.high+"<br/>扇区经度："+p.longitude+"<br/>扇区纬度："+p.latitude+"<br/>验收状况："+p.acceptstatus+"<br/>物理地址："+p.sector_addr;
		
			infoWindow = new BMap.InfoWindow(infoStr,{title:title});// 创建信息窗口对象 					
			var key2=selectedDay+"_"+p.bsc_id+"_"+p.statn_id+"_"+p.sector_id;			
			BMapUtil.dayTrafficQuery2(key2,infoWindow,p);//查询日2g话务量,并修改infoWindow的内容
		}		
	}else{
		infoStr=p.infoStr;
		infoWindow = new BMap.InfoWindow(infoStr,{title:title});// 创建信息窗口对象 
	}	
	this.bmap.openInfoWindow(infoWindow,p); //开启信息窗口
}

/**********************************
 * @funcname mapvSectorLayer
 * @funcdesc 海量打基站扇区
 * @param {resultData} type (input)
 * @return {null}
 * @author 邹土杰
 * @create 20170426
 * @modifier 
 * @modify 
 ***********************************/
sectorStation.prototype.mapvSectorLayer=function(resultData){	
	var options = {
	        lineWidth: 1,
	        draw: 'simple'
	        /*,methods: { // 一些事件回调函数
	            click: function (item) { // 点击事件，返回对应点击元素的对象值
	                if(item == null || !this.mapvLayerSector.isShow){
	                	return;
	                }
	    			var p=item.point2;
					var infoStr;
					if(p.nettype == "4G"){
						infoStr ="基站编号："+p.statn_id+"<br/>扇区编号："+p.sector_id+"<br/>扇区名称："+p.sector_name+"<br/>频段："+p.band+
						"<br/>方位角 ："+p.ant_azimuth+"<br/>机械下倾："+p.ant_engine_angle+"<br/>电子下倾："+p.ant_electron_angle+"<br/>天线挂高："+
						p.high+"<br/>经度："+p.longitude+"<br/>纬度："+p.latitude+"<br/>验收状况："+p.acceptstatus+"<br/>站址地址："+p.sector_addr+"<br/><a href='javascript:this.redirect("+p.statn_id+","+p.cell_id+")' style='color: blue;text-decoration: underline;'>更多...</a>";
					}else{
						infoStr ="BSC编号："+p.bsc_id+"<br/>基站编号："+p.statn_id+"<br/>基站名称："+p.statn_name+"<br/>扇区编号："+p.sector_id+"<br/>扇区名称："+p.sector_name+"<br/>天线方向角："+p.ant_azimuth+
						"<br/>总下倾角度 ："+p.total_declination_angle+"<br/>天线挂高："+p.high+"<br/>扇区经度："+p.longitude+"<br/>扇区纬度："+p.latitude+"<br/>验收状况："+p.acceptstatus+"<br/>物理地址："+p.sector_addr;
					}
					var title='室外'==p.is_indoor?'--室外--':'--室内--';
	    			var infoWindow = new BMap.InfoWindow(infoStr,{title:title,enableAutoPan:false});// 创建信息窗口对象 
	    			this.map.openInfoWindow(infoWindow,p); //开启信息窗口
	             }
	         }*/	
	    }
	var dataArr = [];//海量数据
	for(var i=0;i<resultData.length;i++){
		var result=resultData[i];
		var lng=result.longitude_baidu;
		var lat=result.latitude_baidu;
		var point=new BMap.Point(lng, lat);
		var ant_azimuth=result.ant_azimuth;
		point.sector_id=result.sector_id;//扇区ID
		point.sector_name=null==result.sector_name?"":result.sector_name;//扇区名称
		point.sector_addr=null==result.sector_addr?"":result.sector_addr;//扇区地址
		point.ant_azimuth=null==ant_azimuth?"":ant_azimuth+"°";//扇区方位角		
		point.statn_id=null==result.base_statn_id?"":result.base_statn_id;//基站编号
		point.statn_name=null==result.base_statn_name?"":result.base_statn_name;//基站名称
		point.vendor=null==result.bs_vendor?"":result.bs_vendor;//基站厂家
		point.market=null==result.mkt_center_name?"":result.mkt_center_name;//营服中心
		point.area=null==result.area_name?"":result.area_name;//区县
		point.gps="("+result.longitude+","+result.latitude+")";//gps经纬度
		point.cell_id=result.cell_id==null?"":result.cell_id;//小区编码
		point.cell_name=result.cell_name==null?"":result.cell_name;//小区名称
		point.nettype=result.nettype==null?"":result.nettype;//网络类型
		var is_indoor=result.is_indoor;//室内外
		point.is_indoor=is_indoor;
		point.band=null==result.band?"":result.band;//频段
		point.ant_electron_angle=null==result.ant_electron_angle?"":result.ant_electron_angle;//电子下倾
		point.ant_engine_angle=null==result.ant_engine_angle?"":result.ant_engine_angle;//机械下倾
		point.high=null==result.high?"":result.high+"米";//天线挂高
		point.acceptstatus=null==result.acceptstatus?"":result.acceptstatus;//验收状况
		point.longitude=null==result.longitude?"":result.longitude;//经度
		point.latitude=null==result.latitude?"":result.latitude;//纬度
		point.bsc_id=null==result.bsc_id?"":result.bsc_id;//2G类型BSC编号
		point.total_declination_angle=null==result.total_declination_angle?"":result.total_declination_angle;//2G类型总下倾角度
		var outofsrv=result.outofsrv;//是否断站退服
		
		var circleColor;
		if('通过'==point.acceptstatus){//通过验收
			if(1==outofsrv){//断站退服
				circleColor="#EE4039";
				var marker=new BMap.Marker(point);
				this.map.addOverlay(marker);
				this.RSRPCircleChe.push(marker);//水滴缓存
			}else{
				circleColor="#3EC705";
			}
		}else{//不通过验收
			circleColor="#BFBBB7";
		}
		
		if('室外'==is_indoor){
			var assemble=BMapUtil.add_sector2(point,0.0003,0.0003,ant_azimuth);
			var oneData={};
			var geometry={};
			geometry["type"]='Polygon';
			var assembleArr=[assemble];
			geometry["coordinates"]=assembleArr;
			oneData["geometry"]=geometry;
			//oneData["fillStyle"]="blue";
			oneData["fillStyle"]=circleColor;
			oneData["point2"]=point;
			dataArr.push(oneData);
			var assemble=BMapUtil.add_circle(6,point.lng,point.lat,0.00005);
			var oneData2={};
			var geometry2={};
			geometry2["type"]='Polygon';
			var assembleArr=[assemble];
			geometry2["coordinates"]=assembleArr;
			oneData2["geometry"]=geometry2;
			oneData2["fillStyle"]="#d340c3";
			dataArr.push(oneData2);
		}else{
			var assemble=BMapUtil.add_circle(10,point.lng,point.lat,0.0002);
			var oneData={};
			var geometry={};
			geometry["type"]='Polygon';
			var assembleArr=[assemble];
			geometry["coordinates"]=assembleArr;
			oneData["geometry"]=geometry;
			//oneData["fillStyle"]="#0071b8";
			oneData["fillStyle"]=circleColor;
			oneData["point2"]=point;
			dataArr.push(oneData);
			var assemble2=BMapUtil.add_circle(10,point.lng,point.lat,0.0001);
			var oneData2={};
			var geometry2={};
			geometry2["type"]='Polygon';
			var assembleArr2=[assemble2];
			geometry2["coordinates"]=assembleArr2;
			oneData2["geometry"]=geometry2;
			oneData2["fillStyle"]="#ffffff";
			dataArr.push(oneData2);
		}
	}
	var dataSet = new mapv.DataSet(dataArr);
	this.mapvLayerSector = new mapv.baiduMapLayer(this.map, dataSet, options);
	this.mapvLayerSector.isShow=true;
}

/**********************************
 * @funcname redirect
 * @funcdesc 根据传入的基站编号和小区编号跳转到指定的路径
 * @param {statn_id,cell_id} type (input)
      当传入基站编号和小区编号跳转到指定的路径
 * @return {null}
 * @author 沈士强
 * @create 20170418
 * @modifier 沈士强
 * @modify 20170418
 ***********************************/
BMapUtil.redirect=function(statn_id,cell_id,selectTime){
	var origin,url,selectTime;
	origin = window.location.origin;
	url = origin+"/NOCE/portal/pages_index_Index_invokeApp.action?appId=badCellAnalysis&menuId=252&perId=399&timeStr="+selectTime+"&enbid="+statn_id+"&cellid="+cell_id+"&hideProgressbar=1";
	window.open(url); 
}

/**********************************
 * @funcname sectorShow
 * @funcdesc 扇区信息查询渲染
 * @param {null} 
 * @return {null}
 * @author 邹土杰
 * @create 20170515
 * @modifier 
 * @modify 
 ***********************************/
sectorStation.prototype.sectorShow=function(){
	var that=this;
	var zoom=that.map.getZoom();
	if(null==that.selectCity || zoom<15){//用户没选择城市或者地图级别500米以上不显示扇区基站
		return;
	}
	var PointswAndne=that.inPointswAndne();
	var sectorChePoint = null;
	var circleChePoint = null;
	var stationChePoint = null;
	if(that.alreadySector &&　that.NetTypeChe==that.selectNetType　 &&　((that.selecMarketbase!= "全营服中心" && that.selecMarketbase!=null && that.lastTimeSelecMarketbase==that.selecMarketbase) || PointswAndne)){//选了营服		
		if(that.RSRPSectorChe.length>0){
			$.each(that.RSRPSectorChe, function (i, item) {
				var market = item.point2.market;//营服中心名称
				if(that.selecMarketbase == market){
					sectorChePoint = item.point2;
				}
				that.map.addOverlay(item);
            });
        }
		if(that.RSRPCircleChe.length>0){
			$.each(that.RSRPCircleChe, function (i, item) {
				var market = item.point.market;//营服中心名称
				if(that.selecMarketbase == market){
					circleChePoint = item.point;
				}
				that.map.addOverlay(item);
		     });
		}
		if(that.RSRPStationChe.length>0){
			$.each(that.RSRPStationChe, function (i, item) {
				var market = item.point.market;//营服中心名称
				if(that.selecMarketbase == market){
					stationChePoint = item.point;
				}
				that.map.addOverlay(item);
		     });
		}
		if(that.mapvLayerSector!=null){			
			that.mapvLayerSector.show();
			that.mapvLayerSector.isShow=true;
		}
		var zoom = that.map.getZoom();
		if(that.selectNetType == "4G"){
			that.changeVectorStar(zoom);
		}		
		if(that.selecMarketbase!= "全营服中心" && that.selecMarketbase!= null && sectorChePoint == null && circleChePoint == null && stationChePoint == null){
			alert("该基站经纬度数据缺失!");
			that.sectorHide();//隐藏上一次的渲染结果
			return;
		}
	}else{
		that.queryByTemplate();
	}
}

/**********************************
 * @funcname sectorHide
 * @funcdesc 隐藏扇区、基站
 * @param 
 * @return {null}
 * @author 邹土杰
 * @create 20170515
 * @modifier 
 * @modify 
 ***********************************/
sectorStation.prototype.sectorHide=function(){
	var that=this;
	if(that.RSRPSectorChe.length>0){
		$.each(that.RSRPSectorChe, function (i, item) {
			that.map.removeOverlay(item);
	     });
	}
	if(that.RSRPCircleChe.length>0){
		$.each(that.RSRPCircleChe, function (i, item) {
			that.map.removeOverlay(item);
	     });
	}
	if(that.RSRPStationChe.length>0){
		$.each(that.RSRPStationChe, function (i, item) {
			that.map.removeOverlay(item);
	     });
	}
	if(that.RSRPVectorStarChe.length>0){
		$.each(that.RSRPVectorStarChe, function (i, item) {
			that.map.removeOverlay(item);
	     });
	}
	if(that.searchSector.length>0){
		$.each(that.searchSector,function(i,item){
			that.map.removeOverlay(item);			
		});
		that.searchSector=[];
	}
	if(that.mapvLayerSector!=null){
		that.mapvLayerSector.hide();
		that.mapvLayerSector.isShow=false;
	}
}

/**********************************
 * @funcname highStatn
 * @funcdesc 高价值基站数据查询参数封装
 * @param {centerPoint} type (input)
      按照中心点获取相关参数调用后台数据查询组件查询高价值基站数据返回给前端
 * @return {showHighStatnData} 回调函数
 * @author 沈士强
 * @create 20170418
 * @modifier 沈士强     邹土杰
 * @modify 20170418   20170515
 ***********************************/
sectorStation.prototype.highStatn=function(){
	var centerPoint=this.map.getCenter();
	var netType=this.NetTypeChe;
	var list1 = [],progressBarSqls=[],functionlist=[];	
	var selectTime = this.selectTime;
	var date = new Date();
	if(selectTime!=undefined){
		date = new Date(selectTime.substring(0,4),parseInt(selectTime.substring(4,6))-2);
	}
	
	var year = date.getFullYear();
	var month = date.getMonth()+1;	
	month =(month<10 ? "0"+month:month);
	if(this.selecMarketbase!= "全营服中心"&&this.selectDistrict!=undefined&&this.selecMarketbase!=undefined){//选了营服
		list1.push("CustExpVsl_09_02_sqr_mkt_info");
		list1.push("MONTH:"+year+month);
		list1.push("NETTYPE:"+netType);
		list1.push("CITYNAME:"+this.selectCity);
		list1.push("DISTRICTNAME:"+this.selectDistrict);
		list1.push("MKTCENNAME:"+this.selecMarketbase);
	}else{
		if(netType==undefined){
			netType = "4G";
		}
		var bs = this.map.getBounds(); // 获取可视区域
		var bssw = bs.getSouthWest(); // 可视区域左下角
		var DIST_KM_H=this.map.getDistance(new BMap.Point(bssw.lng,bssw.lat),new BMap.Point(centerPoint.lng,bssw.lat))/1000; 
		var DIST_KM_V=this.map.getDistance(new BMap.Point(bssw.lng,bssw.lat),new BMap.Point(bssw.lng,centerPoint.lat))/1000; 	
		list1.push("CustExpVsl_09_01_sqr_mkt_info");
		list1.push("MONTH:"+year+month);
		list1.push("NETTYPE:"+netType);
		list1.push("LATITUDCENTER:"+centerPoint.lat);
		list1.push("LONGITUDCENTER:"+centerPoint.lng);
		list1.push("DIST_KM_H:"+DIST_KM_H);
		list1.push("DIST_KM_V:"+DIST_KM_V);
	}	
	progressBarSqls.push(list1);
	functionlist.push(this.showHighStatnData);
	var database = [2];
	progressbarTwo.submitSql(progressBarSqls, functionlist,database,[this]);
}

/**********************************
 * @funcname showHighStatnData
 * @funcdesc 高价值基站数据查询回调函数
 * @param {data} type (input)
      调用后台数据查询组件查询高价值基站数据返回给前端放入到BMapUtil.RSRPVectorStarChe缓存中
 * @return {null}
 * @author 沈士强
 * @create 20170418
 * @modifier 沈士强      邹土杰
 * @modify 20170418    20170515
 ***********************************/
sectorStation.prototype.showHighStatnData=function(data,obj){
	console.log(obj);
	console.log(obj.RSRPVectorStarChe);
	var resultData = changeData(data);
	if(obj.RSRPVectorStarChe.length>0){
		$.each(obj.RSRPVectorStarChe, function (i, item) {
			obj.map.removeOverlay(item);
	     });
		obj.RSRPVectorStarChe = [];
	}
	for(var i=0;i<resultData.length;i++){
		var result=resultData[i];
		var lng=result.longitude_baidu;
		var lat=result.latitude_baidu;
		var point=new BMap.Point(lng+0.0003, lat+0.0003);
		point.city_name=result.city_name;//城市名
		point.area_name=null==result.area_name?"":result.area_name;//区县名
		point.mkt_center_name=null==result.mkt_center_name?"":result.mkt_center_name;//营服中心名称
		point.statn_id=null==result.base_statn_id?"":result.base_statn_id;//基站编号
		point.statn_name=null==result.base_statn_name?"":result.base_statn_name;//基站名称
		point.bs_vendor=null==result.bs_vendor?"":result.bs_vendor;//基站厂家
		point.longitude=null==result.longitude?"":result.longitude;//经度
		point.latitude=null==result.latitude?"":result.latitude;//纬度
		point.duration=result.duration==null?"":result.duration;//持续时长
		point.flow_ul=result.flow_ul==null?"":result.flow_ul;//上行流量
		point.flow_dl=result.flow_dl==null?"":result.flow_dl;//下行流量	
		point.flow_all=null==result.flow_all?"":result.flow_all;//总流量G
		point.traffic_2g=null==result.traffic_2g?"":result.traffic_2g;//2g话务量
		point.bsc_id=null==result.bsc_id?"":result.bsc_id;//2G类型BSC编号
		var zoom = obj.map.getZoom();
		/*var vectorStar = new BMap.Marker(point, {
			  // 初始化五角星symbol
			  icon: new BMap.Symbol(BMap_Symbol_SHAPE_STAR, {    
			    scale: scale(zoom),
			    fillColor: "#FFAC00",
			    fillOpacity: 0.8,
			    strokeColor:"#606060",
			    strokeOpacity:0.5
			  })
			});*/		
		var starIcon = scale(zoom);
		var vectorStar = new BMap.Marker(point, {
			  // 初始化五角星
			  icon:starIcon
			});				
		obj.RSRPVectorStarChe.push(vectorStar);
		obj.map.addOverlay(vectorStar);
	}
}

function changeData(data) {
	var result = data.result;
	var cloumns = data.columns;
	var resultArray = [];
	if(result ==undefined ||cloumns ==undefined){
		return resultArray;
	}
	for ( var i = 0; i < result.length; i++) {
		var rs = result[i];
		var dataRsult = {};
		for ( var j = 0; j < rs.length; j++) {
			//var dataC = JSON.stringify(cloumns[j]);
			var dataC = cloumns[j];
			var dataR = rs[j];
			dataRsult[dataC] = dataR;
		}
		resultArray.push(dataRsult);
	}
	return resultArray;
}

/**
 * 传入城市名称获取相应的经纬度
 *
 */
BMapUtil.getCityLocation = function(city){
	var cityLocation={
			"广州":"113.270793,23.135308",
			"深圳":"114.066112,22.548515",
			"珠海":"113.583235,22.276392",
			"汕头":"116.688739,23.359289",
			"佛山":"113.128432,23.027707",
			"韶关":"113.603757,24.816174",
			"湛江":"110.365494,21.277163",
			"肇庆":"112.47177,23.052984",
			"江门":"113.088165,22.584459",
			"茂名":"110.931773,21.669051",
			"惠州":"114.423348,23.116409",
			"梅州":"116.129179,24.294311",
			"汕尾":"115.381693,22.791322",
			"河源":"114.707097,23.749829",
			"阳江":"111.989051,21.864421",
			"清远":"113.062619,23.688238",
			"东莞":"113.758231,23.026997",
			"中山":"113.399023,22.522262",
			"潮州":"116.62943,23.662923",
			"揭阳":"116.37922,23.555773",
			"云浮":"112.051045,22.921154",
			"未知":"113.270793,23.135308"
	};
	if(city!=null){
		var  pointArr=cityLocation[city].split(",");
		pointLng=pointArr[0];
		pointLat=pointArr[1];
		var point = new BMap.Point(pointLng, pointLat);
		return point;
	}
	return null;
	
};



/**********************************
 * @funcname add_sector
 * @funcdesc 获取扇形点数组  百度point数组
 * @param {centre,x,y,z,ant_angle} type (input) 
 * @return {assemble}
 * @author 邹土杰
 * @create 20170426
 * @modifier 
 * @modify 
 ***********************************/
BMapUtil.add_sector=function (centre,x,y,z,ant_angle)
{
	var assemble=new Array();
	var angle;
	var dot;
	var tangent=x/y;
	assemble.push(centre);
	for(i=0;i<=3;i++)
	{
		angle = (2* Math.PI/6 / 3) * i/z+(ant_angle-30/z)/180*Math.PI;
		dot = new BMap.Point(centre.lng+Math.sin(angle)*y*tangent, centre.lat+Math.cos(angle)*y);
		assemble.push(dot);
	}
	return assemble;
}


/**********************************
 * @funcname add_sector2
 * @funcdesc 获取扇形点数组
 * @param {centre,x,y,ant_angle} type (input) 
 * @return {assemble}
 * @author 邹土杰
 * @create 20170426
 * @modifier 
 * @modify 
 ***********************************/
BMapUtil.add_sector2 = function (centre,x,y,ant_angle)
{
	var assemble=new Array();
	var angle;
	var dot;
	var tangent=x/y;
	//assemble.push(centre);
	assemble.push([centre.lng,centre.lat]);
	for(i=0;i<=3;i++)
	{
		angle = (2* Math.PI/6 / 3) * i+(ant_angle-30)/180*Math.PI;
		dot = [centre.lng+Math.sin(angle)*y*tangent, centre.lat+Math.cos(angle)*y];
		assemble.push(dot);
	}
	return assemble;
}

/**********************************
 * @funcname pointswAndne
 * @funcdesc 缓存扇区基站覆盖物范围
 * @param {centerPoint} type (input) 中心点
 * @return {null}
 * @author 邹土杰
 * @create 20170515
 * @modifier 
 * @modify 
 ***********************************/
sectorStation.prototype.pointswAndne=function(centerPoint){
	var zoom=this.map.getZoom();
	if(zoom>=16){
		var bs = this.map.getBounds(); // 获取可视区域
		this.olswChe = bs.getSouthWest(); // 可视区域左下角
		this.olneChe = bs.getNorthEast(); // 可视区域右上角
	}else{
		this.olswChe = null;
		this.olneChe = null;
	}
}

/**********************************
 * @funcname inPointswAndne
 * @funcdesc 判断是否在缓存覆盖物范围
 * @param {null} type (input)
 * @return {null}
 * @author 邹土杰
 * @create 20170515
 * @modifier 
 * @modify 
 ***********************************/
sectorStation.prototype.inPointswAndne=function(){
	var zoom=this.map.getZoom();
	if(zoom>=16){
		var bs = this.map.getBounds(); // 获取可视区域
		var bssw = bs.getSouthWest(); // 可视区域左下角
		var bsne = bs.getNorthEast(); // 可视区域右上角
		//可视范围是否在覆盖物范围内
		if(this.olswChe!=null && this.olneChe!=null 
				&& bssw.lng>=this.olswChe.lng && bssw.lat>=this.olswChe.lat 
				&& bsne.lng<=this.olneChe.lng && bsne.lat<=this.olneChe.lat){
			return true;
		}
	}	
	return false;
}

/**********************************
 * @funcname getCenterPoint
 * @funcdesc 获取地图中心点
 * @param 
 * @return {BMap.Point}
 * @author 邹土杰
 * @create 20170426
 * @modifier 
 * @modify 
 ***********************************/
sectorStation.prototype.getCenterPoint=function(){
	var bs = this.map.getBounds(); // 获取可视区域
	var bssw = bs.getSouthWest(); // 可视区域左下角
	var bsne = bs.getNorthEast(); // 可视区域右上角
	if(bssw==null || bsne==null){
		return new BMap.Point(0,0);
	}else{
		return new BMap.Point((bssw.lng+bsne.lng)/2,(bsne.lat+bssw.lat)/2);
	}	
}

/**********************************
 * @funcname eventListener
 * @funcdesc 
 * @param {fun} type (input)
      
 * @return {null}
 * @author 邹土杰
 * @create 20170526
 * @modifier 
 * @modify 
 ***********************************/
sectorStation.prototype.overlayEventListener=function(overlayObject){
	if(null==this.overlayEventArray || null==this.overlaycallbackArray || this.overlayEventArray.length!=this.overlaycallbackArray.length){
		return;
	}
	for(var i=0;i<this.overlayEventArray.length;i++){
		var e=this.overlayEventArray[i];
		var fun=this.overlaycallbackArray[i];
		overlayObject.addEventListener(e,fun);
	}	
}

/**********************************
 * @funcname changeVectorStar
 * @funcdesc 根据等级递减五角星的大小以及渲染五角星到地图上
 * @param {zoom} type (input)
      当传入的地图级别y不同等级则返回图标不同的大小以及渲染五角星到地图上
 * @return {null}
 * @author 沈士强
 * @create 20170418
 * @modifier 沈士强
 * @modify 20170418
 ***********************************/
sectorStation.prototype.changeVectorStar=function(zoom){
	var that=this;
	if(that.RSRPVectorStarChe.length>0 && zoom >= 15){
		var changeVectorStarChe = new Array();
		$.each(that.RSRPVectorStarChe, function (i, item) {
			that.map.removeOverlay(item);
			/*var icon = item.getIcon();			
			icon.style.scale = scale(zoom);		
			item.setIcon(icon);*/			
			var icon = scale(zoom);			
			item.setIcon(icon);			
			that.map.addOverlay(item);
			changeVectorStarChe.push(item);
	     });
		that.RSRPVectorStarChe = changeVectorStarChe;
	}
}


/**********************************
 * @funcname scale
 * @funcdesc 根据地图级别返回图标的大小
 * @param {y} type (input)
      当传入的地图级别y不同等级则返回图标不同的大小。
 * @return {x}
 * @author 沈士强
 * @create 20170418
 * @modifier 沈士强
 * @modify 20170418
 ***********************************/
function scale(y){
	var icon;
	switch (y){
	  case 18:
		icon=new BMap.Icon("../images/u2828.png", new BMap.Size(28,28));
	    break;
	  case 17:
		icon=new BMap.Icon("../images/u915.png", new BMap.Size(18,18));
	    break;
	  case 16:
		icon=new BMap.Icon("../images/u1010.png", new BMap.Size(10,10));
	    break;
	  case 15:
		icon=new BMap.Icon("../images/u88.png", new BMap.Size(8,8));
	    break;	 
	  default:
		icon=new BMap.Icon("../images/u915.png", new BMap.Size(18,18));
	  }
	return icon;
}


/**********************************
 * @funcname add_circle
 * @funcdesc 加多边形（圆）
 * @param {n,x,y,r} type (input) n是边数，x，y是中心点横纵坐标,r半径
 * @return {assemble}
 * @author 邹土杰
 * @create 20170426
 * @modifier 
 * @modify 
 ***********************************/
BMapUtil.add_circle=function(n,x,y,r)
{
	var assemble=new Array();
	var angle =0;
	assemble.push([x + r*Math.sin(angle), y - r*Math.cos(angle)]);//确立第一个点 
	var delta = 2*Math.PI/n;        //相邻两个顶点之间的夹角  
	for(i=0;i<n;i++)
	{
		angle +=  delta;     //角度调整  
		assemble.push([x + r*Math.sin(angle), y - r*Math.cos(angle)]);
	}
	return assemble;
}


/**********************************
 * @funcname queryContainerCreat
 * @funcdesc 基站扇区定位初始函数
 * @param {map,containerID} type (input) map地图实例，containerID搜索框容器
 * @return {null}
 * @author 邹土杰
 * @create 20170531
 * @modifier 
 * @modify 
 ***********************************/
var bMapUtilObjs={};
sectorStation.prototype.queryContainerCreat=function(){
	var containerID=this.containerID;
	bMapUtilObjs[containerID]=this;
	var container=document.getElementById(containerID);
	var divStr='<div class="b-searchBox" id="'+containerID+'_searchBox" style="display: none;">'+
	'<input class="b-textBox" placeholder=\'请输入基站名称或基站"ID+扇区ID" \' id="'+containerID+'_searchSector" />'+
	'<button type="button" class="b-btn-bg" onclick="BMapUtil.querySectorFuzzy(\''+containerID+'\');">搜索</button>'+
	'<div class="b-table-search" style="display: none;" id="'+containerID+'_table-search">'+
	'<table class="b-table"> <thead> <tr>'+
	'<td>基站ID</td><td>扇区ID</td><td>扇区名称列表</td>'+
	'</tr></thead><tbody id="'+containerID+'_tbody"></tbody></table>'+
	'</div></div>';
	container.innerHTML=divStr;	
	this.container=container;//搜索框容器
}

/**********************************
 * @funcname searchBoxShow
 * @funcdesc 基站扇区定位搜索框显示
 * @param {null}
 * @return {null}
 * @author 邹土杰
 * @create 20170601
 * @modifier 
 * @modify 
 ***********************************/
sectorStation.prototype.searchBoxShow=function(){
	$("#"+this.containerID+"_searchBox").show();
}

/**********************************
 * @funcname searchBoxHide
 * @funcdesc 基站扇区定位搜索框隐藏
 * @param {null}
 * @return {null}
 * @author 邹土杰
 * @create 20170601
 * @modifier 
 * @modify 
 ***********************************/
sectorStation.prototype.searchBoxHide=function(){	
	$("#"+this.containerID+"_searchBox").hide();
	$("#"+this.containerID+"_table-search").hide();
	$("#"+this.containerID+"_searchSector").val("");
}

/**********************************
 * @funcname querySectorFuzzy
 * @funcdesc 扇区搜索定位模板查询
 * @param {null} type
 * @return {null}
 * @author 邹土杰
 * @create 20170531
 * @modifier 
 * @modify 
 ***********************************/
BMapUtil.querySectorFuzzy=function(containerID){
	var that=bMapUtilObjs[containerID];
	var searchSector=$("#"+that.containerID+"_searchSector").val().trim();
	if(""==searchSector){
		return;
	}
	if(that.searchSectorContent==searchSector){
		$("#"+that.containerID+"_table-search").show();
		return;
	}
	var selectCity=that.selectCity;
	var nettype = that.selectNetType;
	if(null==selectCity){//如果用户没点击确认按钮，则使用下拉框选中的值
		return;
	}
	if(that.selectNetType == null){
		return;
	}
	var standard;
	if(nettype == '4G'){
		standard = "FDD";
	}else{
		nettype = "3G"
		standard = "1X+DO','1X";
	}
	tbody="<tr><td colspan=3>查询请等待</td></tr>"
	$("#"+that.containerID+"_tbody").html(tbody);
	$("#"+that.containerID+"_table-search").show();
	if(that.searchSector.length>0){
		$.each(that.searchSector,function(i,item){
			that.map.removeOverlay(item);			
		});
		that.searchSector=[];
	}		
	that.searchSectorContent=searchSector;//缓存搜索内容
	var list1 = [];
	list1.push("CustExpVsl_10_sector_search");
	list1.push("NETTYPE:"+nettype);
	list1.push("STANDARD:"+standard);
	list1.push("CITYNAME:"+selectCity);
	list1.push("MATCHSTRING:"+searchSector);
	var progressBarSqls = [],functionlist = [];		
	progressBarSqls.push(list1);
	functionlist.push(that.SectorFuzzyData);
	var database = [3];
	progressbarTwo.submitSql(progressBarSqls, functionlist,database,[that]);
}

/**********************************
 * @funcname SectorFuzzyData
 * @funcdesc 扇区搜索定位模板查询回调函数
 * @param {data} type {input}
 * @return {null}
 * @author 邹土杰
 * @create 20170531
 * @modifier 
 * @modify 
 ***********************************/
sectorStation.prototype.SectorFuzzyData=function(data,obj){
	var resultData = changeData(data);
	obj.searchSectorChe=resultData;
	var tbody="";
	var containerID=obj.containerID;
	if(0==resultData.length){
		tbody="<tr><td colspan=3>无相关数据</td></tr>"
	}else{
		for(var i=0;i<resultData.length;i++){
			var val=resultData[i];
			tbody=tbody+"<tr onclick='BMapUtil.sectorPosition("+i+",\""+containerID+"\");'><td>"+val.base_statn_id+"</td><td>"+val.sector_id+"</td><td>"+val.sector_name+"</td></tr>";
		}
	}
	if(10==resultData.length){
		tbody=tbody+"<tr><td colspan=3>...</td></tr>"
	}	
	$("#"+containerID+"_tbody").html(tbody);
	$("#"+containerID+"_table-search").show();
	if(1==resultData.length){
		BMapUtil.sectorPosition(0,containerID);
	}
}

/**********************************
 * @funcname sectorPosition
 * @funcdesc 扇区基站定位并高亮显示
 * @param {index,obj} type {input,input}
 * @return {null}
 * @author 邹土杰
 * @create 20170531
 * @modifier 
 * @modify 
 ***********************************/
BMapUtil.sectorPosition=function(index,containerID){
	var obj=bMapUtilObjs[containerID];
	$("#"+containerID+"_table-search").hide();	
	if(obj.searchSector.length>0){
		$.each(obj.searchSector,function(i,item){
			obj.map.removeOverlay(item);			
		});
		obj.searchSector=[];
	}	
	var result=obj.searchSectorChe[index];
	var lng=result.longitude_baidu;
	var lat=result.latitude_baidu;
	if(null==lng || null==lat){
		alert("该基站经纬度数据缺失!");
		obj.sectorHide();//隐藏上一次的渲染结果
		return;
	}
	var point=new BMap.Point(lng, lat);
	obj.map.setCenter(point);
	
	if(null!=obj.positioningEvent){
		obj.positioningEvent();
	}
	
	
	//RSRPGridMapOperation();
	var ant_azimuth=result.ant_azimuth;
	point.sector_id=result.sector_id;//扇区ID
	point.sector_name=null==result.sector_name?"":result.sector_name;//扇区名称
	point.sector_addr=null==result.sector_addr?"":result.sector_addr;//扇区地址
	//point.sector_name=result.sector_name;//扇区名称
	//point.sector_addr=result.sector_addr;//扇区地址
	point.ant_azimuth=null==ant_azimuth?"":ant_azimuth+"°";//扇区方位角		
	point.statn_id=result.base_statn_id
	point.statn_name=null==result.base_statn_name?"":result.base_statn_name;//基站名称
	point.vendor=null==result.bs_vendor?"":result.bs_vendor;//基站厂家
	point.market=null==result.mkt_center_name?"":result.mkt_center_name;//营服中心
	point.area=null==result.area_name?"":result.area_name;//区县
	//point.statn_name=result.base_statn_name;//基站名称
	//point.vendor=result.bs_vendor;//基站厂家
	//point.market=result.mkt_center_name?null:result.mkt_center_name+"营服";//营服中心
	//point.area=null==result.area_name?null:result.area_name+"区县";//区县
	point.gps="("+result.longitude+","+result.latitude+")";//gps经纬度
	point.cell_id=result.cell_id==null?"":result.cell_id;//小区编码
	point.cell_name=result.cell_name==null?"":result.cell_name;//小区名称
	//point.is_indoor=result.is_indoor==null?"":result.is_indoor;//室内外
	var is_indoor=result.is_indoor;//室内外
	
	point.band=null==result.band?"":result.band;//频段
	point.ant_electron_angle=null==result.ant_electron_angle?"":result.ant_electron_angle;//机械下倾
	point.ant_engine_angle=null==result.ant_engine_angle?"":result.ant_engine_angle;//电子下倾
	point.high=null==result.high?"":result.high+"米";//天线挂高
	point.acceptstatus=null==result.acceptstatus?"":result.acceptstatus;//验收状况
	point.longitude=null==result.longitude?"":result.longitude;//经度
	point.latitude=null==result.latitude?"":result.latitude;//纬度
	point.bsc_id=null==result.bsc_id?"":result.bsc_id;//2G类型BSC编号
	point.total_declination_angle=null==result.total_declination_angle?"":result.total_declination_angle;//2G类型总下倾角度
	//point.selectTime=obj.selectTime;
	point.day=this.selectTime;
	point.thisObj=this;
	if('室外'==is_indoor){
		//根据频段，扇区的高矮肥瘦不同   point.band==1.8GH时为默认
		var xy=0.0006;
		var z=3.5;
		if("2.6GHz"==point.band){
			xy=0.0002;
			z=0.8;
		}else if("2.1GHz"==point.band){
			xy=0.0004;
			z=1.8;
		}else if("800MHz"==point.band){
			xy=0.0008;
			z=5.5;
		}
		
		var assemble=BMapUtil.add_sector(point,xy,xy,z,ant_azimuth);
		var sectorPolygon=new BMap.Polygon(assemble);
		sectorPolygon.setFillColor("#007c09");
		sectorPolygon.setFillOpacity(1);
		sectorPolygon.setStrokeWeight(1);
		sectorPolygon.point2=point;
		if(null!=obj.overlaycallbackArray && null!=obj.overlayEventArray){
			obj.overlayEventListener(sectorPolygon);
		}else{
			sectorPolygon.bmap=obj.map;
			sectorPolygon.addEventListener("click",obj.circleclick);
		}					
		obj.map.addOverlay(sectorPolygon);
		obj.searchSector.push(sectorPolygon);
		obj.map.addOverlay(sectorPolygon);
		var circle=new BMap.Circle(point,3,{fillColor:"#d340c3",strokeWeight:1});
		obj.searchSector.push(circle);
		obj.map.addOverlay(circle);
	}else{
		var circle=new BMap.Circle(point,30,{fillColor:"#007a08",strokeWeight:1,strokeColor:"007a08",fillOpacity:1});
		var circle2=new BMap.Circle(point,12,{fillColor:"#ffffff",strokeWeight:1,strokeColor:"ffffff",fillOpacity:1});		
		circle.point2=point;
		circle2.point2=point;
		if(null!=obj.overlaycallbackArray && null!=obj.overlayEventArray){
			obj.overlayEventListener(circle);
			obj.overlayEventListener(circle2);
		}else{
			circle.bmap=obj.map;
			circle2.bmap=obj.map;
			circle.addEventListener('click', this.circleclick);
			circle2.addEventListener('click', this.circleclick);
		}		
		circle.addEventListener('click', circleclick);
		circle2.addEventListener('click', circleclick);
		obj.searchSector.push(circle);
		obj.map.addOverlay(circle);
		obj.searchSector.push(circle2);
		obj.map.addOverlay(circle2);
	}
} 

/**********************************
 * @funcname clearSectorFuzzy
 * @funcdesc 清掉查询结果和缓存的查询输入
 * @param {null} type (input)
 * @return {null}
 * @author 邹土杰
 * @create 20170518
 * @modifier 
 * @modify 
 ***********************************/
sectorStation.prototype.clearSectorFuzzy=function(){
	$("#"+this.containerID+"_tbody").html("");
	$("#"+this.containerID+"_table-search").hide();
	$("#"+this.containerID+"_searchSector").val("");
	this.searchSectorContent=null;
}

/**********************************
 * @funcname dayTrafficQuery
 * @funcdesc 查询日流量数据
 * @param {key,infoWindow,pointData} type (String,InfoWindow,Point)  key:DAY_ENODEBID_CellId,如：20170529_xxxxx_yyyy
 * infoWindow：百度地图infoWindow对象   point：百度地图Point对象
 * @return {null}
 * @author 邹土杰
 * @create 20170606
 * @modifier 邹土杰
 * @modify 20170621
 ***********************************/
BMapUtil.dayTrafficQuery=function(key,infoWindow,point){
	var list1 = [];
	var progressBarSqls=[],functionlist=[];	
	list1.push("CustExpVsl_09_02_FlowOfBSN");
	list1.push("KEY:"+key);
	progressBarSqls.push(list1);
	functionlist.push(BMapUtil.dayTrafficData);	
	var database = [4];
	progressbarTwo.submitSql(progressBarSqls, functionlist,database,[[infoWindow,point]]);
}

/**********************************
 * @funcname dayTrafficQuery
 * @funcdesc 查询日流量数据
 * @param {key,infoWindow,pointData} type (String,InfoWindow,Point)  key:DAY_ENODEBID_CellId,如：20170529_xxxxx_yyyy
 * infoWindow：百度地图infoWindow对象   point：百度地图Point对象
 * @return {null}
 * @author 邹土杰
 * @create 20170606
 * @modifier 邹土杰
 * @modify 20170621
 ***********************************/
BMapUtil.dayTrafficQuery2=function(key,infoWindow,point){
	var list2 = [];
	var progressBarSqls=[],functionlist=[];		
	list2.push("CustExpVsl_09_03_2GTrafficOfBSN");
	list2.push("KEY:"+key);
	progressBarSqls.push(list2);
	functionlist.push(BMapUtil.dayTrafficData2);		
	var database = [4];
	progressbarTwo.submitSql(progressBarSqls, functionlist,database,[[infoWindow,point]]);
}

/**********************************
 * @funcname dayTrafficData
 * @funcdesc 查询日流量数据回调函数
 * @param {data,obj} type (Object,Object)  data:返回的查询数据 obj：参数集合
 * @return {null}
 * @author 邹土杰
 * @create 20170606
 * @modifier 
 * @modify 
 ***********************************/
BMapUtil.dayTrafficData=function(data,obj){
	var infoWindow=obj[0];
	var point=obj[1];
	var resultData = changeData(data);
	var content=infoWindow.getContent();
	if(resultData.length==0){
		content=content.replace("<a href","日总流量：<br/><a href")
	}else{
		var dayTraffic=parseFloat(resultData[0]["i:a59"])+parseFloat(resultData[0]["i:a60"]);
		dayTraffic=dayTraffic.toFixed(2);	
		var dayTrafficC="日总流量："+dayTraffic+"MB";
		content=content.replace("<a href",dayTrafficC+"<br/><a href")
	}	
	infoWindow.setContent(content);
	point.infoStr=content;
}

/**********************************
 * @funcname dayTrafficData2
 * @funcdesc 查询日流量数据回调函数
 * @param {data,obj} type (Object,Object)  data:返回的查询数据 obj：参数集合
 * @return {null}
 * @author 邹土杰
 * @create 20170621
 * @modifier 
 * @modify 
 ***********************************/
BMapUtil.dayTrafficData2=function(data,obj){
	var infoWindow=obj[0];
	var point=obj[1];
	var resultData = changeData(data);
	var content=infoWindow.getContent();
	if(resultData.length==0){
		content=content+"<br/>2g话务量：";
	}else{
		var dayTraffic=parseFloat(resultData[0]["i:a11"])/10000;
		dayTraffic=dayTraffic.toFixed(2);	
		var dayTrafficC="2g话务量："+dayTraffic+"万ERL";
		content=content+"<br/>"+dayTrafficC;
	}	
	infoWindow.setContent(content);
	point.infoStr=content;
}