var BMapUtil = {};


//入口方法，初始化变量
function osmMeasureDistance(bMapObj , finlishFunction){
	
	this.startPoint = null;
	this.endPoint = null;
	this.polyline = null;//鼠标移动线条覆盖物
	this.clickPolyline = null;//鼠标点击线条覆盖物
	this.clickPolylines = [];//所有鼠标点击线条覆盖物
	this.label = null;
	this.clickLabel = null;//鼠标点击标签
	this.clickLabels = [];//所有鼠标点击的标签
	this.Markers = [];//所有标注点
	this.distince = 0;//距离
	this.b = 0;//角度
	this.endMarker = null;
	this.startMarker = null;
	this.map=bMapObj;//地图对象
	this.isUseTool=false;//地图
	this.isFirst = true;//首次加载
	osmMeasureDistance.prototype.that = this;
	this.AllclickPolylines = {};//所有鼠标点击的线条覆盖物
	this.AllclickLabels = {};//所有鼠标点击的标签
	this.AllMarkers = {};
	this.count = 0;//累计测距次数
	this.finlishFunction = finlishFunction;
}

//测距方法
osmMeasureDistance.prototype.openMeasure = function(){
	console.log(this);
	this.removeAll();
	this.count++;
	if(this.count==1){
		
	}else{
		
		this.clickPolylines = [];
		this.clickLabels = [];
		this.Markers = [];
		console.log(this.AllclickPolylines);
	}
	
	
	var that = osmMeasureDistance.prototype.that;
	//that.map.setDefaultCursor('url(ruler.cur) , auto');
	
	this.startPoint=null;
	if(this.isFirst==true){
		this.isFirst = false;
		this.map.addEventListener('dblclick', this.dblclickMap)
		this.map.addEventListener('click', this.clickMap);
		this.map.addEventListener('mousemove',this.mousemove);
	}
	
	this.isUseTool = true;
	osmMeasureDistance.prototype.that = this;
	
	
}


osmMeasureDistance.prototype.clickMap = function clickMap(e){
	
	var that = osmMeasureDistance.prototype.that;
	var point = e.latlng;
	if(that.isUseTool){
		if(that.startPoint!=null){
			that.endPoint = point;
			//计算距离
			
			var distince1 =parseInt( that.map.distance(that.startPoint, that.endPoint));
			that.distince = that.distince + distince1;
			//计算角度
			that.endXY = e.layerPoint;
			var b = that.calculationAngle(that.startXY,that.endXY).toFixed(2);
			var latlngs = [];
			latlngs.push(that.startPoint);	
			latlngs.push(that.endPoint);

            //var pe = new BMap.Pixel(endXY.x-startXY.x,endXY.y-startXY.y);
            var pe = L.point(that.endXY.x-that.startXY.x,that.endXY.y-that.startXY.y);
            //原地点击，调用鼠标双击事件
            if(pe.x==0&&pe.y==0){
                //console.log(that.prototype);
                osmMeasureDistance.prototype.dblclickMap(e);
                return;
            }

			var starIcon=L.icon({iconUrl:"../images/stop_icon.png",iconSize:[12, 12]})
			that.endMarker =  L.marker(e.latlng,{icon:starIcon}).addTo(that.map);  // 创建标注
			
			
			//添加线段
			that.clickPolyline = L.polyline(latlngs, {color: 'blue',weight: 1.5}).addTo(that.map);
			
			//添加标签
			
			var tip = L.tooltip({permanent:false});
			
			if(that.distince<1000){
				that.endMarker.bindTooltip(that.distince+"米,"+b+"度",{permanent: true, direction: 'right',color: 'red'}).openTooltip();
			}else{
				that.endMarker.bindTooltip((that.distince/1000).toFixed(2)+"公里,"+b+"度",{permanent: true, direction: 'right',color: 'red'}).openTooltip();
				
			}
			
		
			that.startPoint=that.endPoint;
			that.startXY = e.layerPoint;
			that.endPoint = null;
			
			
			that.Markers.push(that.endMarker);
			that.clickPolylines.push(that.clickPolyline);
			return;
		}else{
			
			
			that.startPoint = point;
			that.startXY = e.layerPoint;
		    //添加标注点
			var starIcon=L.icon({iconUrl:"../images/stop_icon.png",iconSize:[12, 12]})
			that.endMarker = L.marker(e.latlng,{icon:starIcon}).addTo(that.map);
            that.endMarker.bindTooltip("起点",{permanent: true, direction: 'right'}).openTooltip();
			that.Markers.push(that.endMarker);

			that.clickLabels.push(that.clickLabel);	
		}
		
	}
}



//鼠标双击事件事件
osmMeasureDistance.prototype.dblclickMap = function dblclickMap(e) {
	var that = osmMeasureDistance.prototype.that;
	//that.map.setDefaultCursor("pointer");
	if(that.isUseTool == true){
		that.isUseTool = false;
        that.polyline.remove();
	   var point = e.latlng;
	   var myIcon=L.icon({iconUrl:"../images/st-close.png",iconSize:[15, 15]});
	   var marker2 = L.marker(e.latlng,{icon:myIcon}).addTo(that.map);
	   
	   //marker2.count = that.count;
	   marker2.addEventListener("click",osmMeasureDistance.prototype.removeAll);
	   that.Markers.push(marker2);
		var length = $(".leaflet-marker-icon").length;
		$($(".leaflet-marker-icon")[length-1]).css({"marginLeft":"-20px","marginTop":"-20px"})
		
	}
	if(that.finlishFunction!=null){
        that.finlishFunction();
	}
	
	
}


//鼠标移动事件
osmMeasureDistance.prototype.mousemove = function mousemove(e){
	
	var that = osmMeasureDistance.prototype.that;
	
	//that.map.setDefaultCursor('url(ruler.cur) , auto');
	
	var point = e.latlng;
	
	
	if(that.isUseTool){
		
		if(that.polyline!=null){
			that.polyline.remove();
			//that.label;
		}
		if( that.startPoint!=null ){
			//that.polyline = new BMap.Polyline([that.startPoint,point], {strokeWeight:1, strokeColor:"blue", strokeOpacity:0.7});
			that.polyline = L.polyline([that.startPoint ,e.latlng], {color: 'blue',weight: 1} ).addTo(that.map);
			var tip = L.tooltip({permanent:true,sticky:true,color:"#3388ff"});
			var distince = "";
			var tempXY = e.layerPoint;
			var tempDistince = parseInt( that.map.distance(that.startPoint, e.latlng));
			var b = that.calculationAngle(that.startXY,tempXY).toFixed(2);
			if(that.distince<1000){
				distince = that.distince+tempDistince+"米,"+b+"度<br>双击结束测量<br>悬停查看距离角度";
			}else{
				distince =((that.distince+tempDistince)/1000).toFixed(2)+"公里,"+b+"度<br>双击结束测量";
				
			}
			that.polyline.bindTooltip(distince,{permanent: true, direction: 'right',color: 'red'}).openTooltip();
		}
		
		
	}
}


//计算角度
osmMeasureDistance.prototype.calculationAngle = function calculationAngle(startXY, endXY){
	
		var pe = L.point(endXY.x-startXY.x,endXY.y-startXY.y);
		var a = Math.atan(Math.abs(pe.y)/Math.abs(pe.x));
		var b = a*180/Math.PI;

		if (pe.x==0&&pe.y<0) {
			b = 0;
		}else if (pe.x==0&&pe.y>0) {
			b = 180;
		}else if (pe.x>0&&pe.y==0) {
			b = 90;
		}else if (pe.x<0&&pe.y==0) {
			b =270;
		}else if (pe.x>0&&pe.y<0) {
			b = 90-b;
		}else if (pe.x>0&&pe.y>0) {
			b = b+90;
		}else if (pe.x<0&&pe.y>0) {
			b = 270-b;
		}else if (pe.x<0&&pe.y<0) {
			b = 270+b;
		}
		return b;
}



//移除所有覆盖物
osmMeasureDistance.prototype.removeAll = function removeAll(e){
	
	var that = osmMeasureDistance.prototype.that;
	
	
	for(var i=0;i<that.Markers.length;i++){
		that.Markers[i].remove();
	}
	for(var i=0;i<that.clickPolylines.length;i++){
		that.clickPolylines[i].remove();
	}
	if(that.polyline!=null){
		that.polyline.remove();
	}
	
	
	that.startPoint = null;
	that.endPoint = null;
	that.polyline = null;//鼠标移动线条覆盖物
	that.clickPolyline = null;//鼠标点击线条覆盖物
	that.clickPolylines = [];//所有鼠标点击线条覆盖物
	that.label = null;
	that.clickLabel = null;//鼠标点击标签
	that.clickLabels = [];//所有鼠标点击的标签
	that.Markers = [];//所有标注点
	that.distince = 0;
	that.b = 0;
	that.endMarker = null;
	that.startMarker = null;
	that.isUseTool=false;//地图
    if(that.finlishFunction!=null){
        that.finlishFunction();
    }
}

//关闭测距
osmMeasureDistance.prototype.closeAll = function(){
    var that = osmMeasureDistance.prototype.that;
    //that.map.setDefaultCursor(that.DefaultCursor);
    this.removeAll();
    this.startPoint=null;
    if(that.finlishFunction!=null){
        that.finlishFunction();
    }
}

