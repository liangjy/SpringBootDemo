var BMapUtil = {};


//入口方法，初始化变量
function measureDistance(bMapObj , finlishFunction){
	
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
	this.DefaultCursor = bMapObj.getDefaultCursor();
	this.finlishFunction = finlishFunction;
	measureDistance.prototype.that = this;
	
}

//测距方法
measureDistance.prototype.openMeasure = function(){
//	console.log(this);
	
	var that = measureDistance.prototype.that;
	that.map.setDefaultCursor('url(../images/ruler.cur) , auto');
	this.removeAll();
	this.startPoint=null;
	if(this.isFirst==true){
		this.isFirst = false;
		//this.map.addEventListener('dblclick', this.dblclickMap)
		this.map.addEventListener('click', this.clickMap);
		this.map.addEventListener('rightclick', this.rightClickMap);
		this.map.addEventListener('mousemove',this.mousemove);
	}
	
	this.isUseTool = true;
	measureDistance.prototype.that = this;
	
	
}


measureDistance.prototype.clickMap = function clickMap(e){
	
	var that = measureDistance.prototype.that;
	var point = e.point;
	if(that.isUseTool){
		if(that.startPoint!=null){
				that.endPoint = point;
				var distince1 =parseInt( this.getDistance(that.startPoint, that.endPoint));
				that.distince = that.distince + distince1;				
			var startXY = this.pointToPixel(that.startPoint);
					
			var endXY = this.pointToPixel(that.endPoint);//两个点位于第二象限，需要进行坐标轴转换
			var pe = new BMap.Pixel(endXY.x-startXY.x,endXY.y-startXY.y);
			
			//原地点击，调用鼠标双击事件
			  if(pe.x==0&&pe.y==0){
				  //console.log(that.prototype);
				  measureDistance.prototype.dblclickMap(e);
				  return;
			  }
	   
			that.b= (that.calculationAngle(startXY, endXY)).toFixed(2);
			//添加标注点
			var myIcon = new BMap.Icon("../images/stop_icon.png", new BMap.Size(10,10));
			that.endMarker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
			
			//添加线段
			that.clickPolyline = new BMap.Polyline([that.startPoint,that.endPoint], {strokeWeight:1.5, strokeColor:"blue", strokeOpacity:0.7});
			
			//添加标签
			var opts1 = {
				  position : point,    // 指定文本标注所在的地理位置
				  offset   : new BMap.Size(10, 0),    //设置文本偏移量
				  
				}
			
			if(that.distince<1000){
				that.clickLabel = new BMap.Label(that.distince+"米,"+that.b+"度", opts1);
			}else{
				that.clickLabel = new BMap.Label((that.distince/1000).toFixed(2)+"公里,"+that.b+"度", opts1);
			}
			that.clickLabel.setStyle({
					 color : "red",
					 borderRadius: "5px",
					 border: '1px solid red',
					 fontSize : "12px",
					 height : "20px",
					 lineHeight : "20px",
					 fontFamily:"微软雅黑",
					 zIndex : 1000,
				 });
		
			that.startPoint=that.endPoint;
			that.endPoint = null;
			//isUseTool = false;
			
			that.Markers.push(that.endMarker);
			that.clickLabels.push(that.clickLabel);
			that.clickPolylines.push(that.clickPolyline);
			
			this.removeOverlay(that.polyline);
			this.addOverlay(that.endMarker);
			this.addOverlay(that.clickPolyline);
			this.addOverlay(that.clickLabel);
			
			return;
		}else{
			
			//console.log(that.startPoint);
			that.startPoint = point;
			var opts1 = {
				  position : point,    // 指定文本标注所在的地理位置
				  offset   : new BMap.Size(10, 0)    //设置文本偏移量
				}
			that.clickLabel = new BMap.Label("起点", opts1);
			that.clickLabel.setStyle({
					 color : "red",
					 fontSize : "12px",
					 height : "20px",
					 lineHeight : "20px",
					 fontFamily:"微软雅黑",
					 zIndex : 1000,
				 });
				 
		  
		  //添加标注点
			var myIcon = new BMap.Icon("../images/stop_icon.png", new BMap.Size(10,10));
			that.endMarker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
			that.Markers.push(that.endMarker);
			that.clickLabels.push(that.clickLabel);
			this.addOverlay(that.endMarker);
		    this.addOverlay(that.clickLabel);
			
		}
		
	}
}



//鼠标双击事件事件
measureDistance.prototype.dblclickMap = function dblclickMap(e) {
	var that = measureDistance.prototype.that;
	that.map.setDefaultCursor(that.DefaultCursor);
	if(that.isUseTool == true){
		that.isUseTool = false;
		var point = e.point;
		var opts1 = {
					  position : point,    // 指定文本标注所在的地理位置
					  offset   : new BMap.Size(10, 0)    //设置文本偏移量
					}
		if(that.clickLabel!=null){
			that.map.removeOverlay(that.clickLabel);
			
		}
		if(that.distince<1000){
			that.clickLabel = new BMap.Label("总长"+that.distince+"米,角度"+that.b, opts1);
		}else{
			that.clickLabel = new BMap.Label("总长"+(that.distince/1000).toFixed(2)+"公里,角度"+that.b, opts1);
		}
		that.clickLabel.setStyle({
				 color : "red",
				 fontSize : "12px",
				 height : "20px",
				 lineHeight : "20px",
				 fontFamily:"微软雅黑",
				 zIndex : 1000,
			 });
		//添加终点label
		
	
		//删除图标
	   var myIcon = new BMap.Icon("../images/st-close.png", new BMap.Size(50,30));
	   var marker2 = new BMap.Marker(point,{icon:myIcon});
	   marker2.addEventListener("click",measureDistance.prototype.removeAll);
		var myIcon = new BMap.Icon("../images/stop_icon.png", new BMap.Size(10,10));
		that.endMarker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
		that.clickLabels.push(that.clickLabel);
		that.Markers.push(that.endMarker);
		that.Markers.push(marker2);
		that.map.addOverlay(that.clickLabel);
		that.map.addOverlay(marker2);
		that.map.addOverlay(that.endMarker);
		that.map.removeOverlay(that.label);
		
		
	}
	
	if(that.finlishFunction!=null){
        that.finlishFunction();
	}

}


//鼠标移动事件
measureDistance.prototype.mousemove = function mousemove(e){
	
	var that = measureDistance.prototype.that;
	
	//that.map.setDefaultCursor('url(../images/ruler.cur) , auto');
	
	var point = e.point;
	var opts = {
	  position : point,    // 指定文本标注所在的地理位置
	  offset   : new BMap.Size(30, 30)    //设置文本偏移量
	}
	
	if(that.isUseTool){
		
		if(that.polyline!=null){
			this.removeOverlay(that.polyline);
			this.removeOverlay(that.label);
		}
		if( that.startPoint!=null ){
			that.polyline = new BMap.Polyline([that.startPoint,point], {strokeWeight:1, strokeColor:"blue", strokeOpacity:0.7});
			
			
			this.addOverlay(that.polyline);
			
			if (that.label!=null){
				this.removeOverlay(that.label);
			}
			
			var distince1 = parseInt(this.getDistance(that.startPoint, point));
			var startXY = this.pointToPixel(that.startPoint);	
			var endXY = this.pointToPixel(point);//两个点位于第二象限，需要进行坐标轴转换
			var c= (that.calculationAngle(startXY, endXY)).toFixed(2);
			if(distince1+that.distince<1000){
				that.label = new BMap.Label("距离"+(distince1+that.distince)+"米,角度"+c+"<br />双击结束测量", opts);
			}else{
				that.label = new BMap.Label("距离"+((distince1+that.distince)/1000).toFixed(2)+"公里,角度"+c+"<br />双击结束测量", opts);
			}
			that.label.setStyle({
					 color : "red",
					 fontSize : "12px",
					 height : "40px",
					 lineHeight : "20px",
					 fontFamily:"微软雅黑",
					 zIndex : 1000,
				 }); 
		   this.addOverlay(that.label);
		}
		
		
	}
}


//计算角度
measureDistance.prototype.calculationAngle = function calculationAngle(startXY, endXY){
	
		var pe = new BMap.Pixel(endXY.x-startXY.x,endXY.y-startXY.y);
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
measureDistance.prototype.removeAll = function removeAll(){
	
	var that = measureDistance.prototype.that;
	for(var i=0;i<that.Markers.length;i++){
		that.map.removeOverlay(that.Markers[i]);
	}
	for(var i=0;i<that.clickLabels.length;i++){
		that.map.removeOverlay(that.clickLabels[i]);
	}
	for(var i=0;i<that.clickPolylines.length;i++){
		that.map.removeOverlay(that.clickPolylines[i]);
	}
	
	that.map.removeOverlay(that.polyline);
	that.map.removeOverlay(that.label);
	
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
}



//鼠标右键事件
measureDistance.prototype.rightClickMap = function rightClickMap(e){
	
	var that = measureDistance.prototype.that;
	that.map.setDefaultCursor(that.DefaultCursor);
	if(that.isUseTool == true){
		that.isUseTool = false;
		if(that.clickLabel!=null){
			that.map.removeOverlay(that.clickLabel);
		}
		var point = that.startPoint;
		var opts1 = {
					  position : point,    // 指定文本标注所在的地理位置
					  offset   : new BMap.Size(10, 0)    //设置文本偏移量
					}
		
		that.clickLabel = new BMap.Label("总长"+that.distince+"米,角度"+that.b, opts1);
		that.clickLabel.setStyle({
				 color : "red",
				 fontSize : "12px",
				 height : "20px",
				 lineHeight : "20px",
				 fontFamily:"微软雅黑",
				 zIndex : 1000,
			 });
		//添加终点label
		
	
		//删除图标
	   var myIcon = new BMap.Icon("../images/st-close.png", new BMap.Size(50,30));
	   var marker2 = new BMap.Marker(point,{icon:myIcon});
	   marker2.addEventListener("click",that.removeAll);
	   
		
		var myIcon = new BMap.Icon("../images/stop_icon.png", new BMap.Size(10,10));
		that.endMarker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
		
		that.clickLabels.push(that.clickLabel);
		that.Markers.push(that.endMarker);
		that.Markers.push(marker2);
		that.map.addOverlay(that.clickLabel);
		that.map.addOverlay(marker2);
		that.map.addOverlay(that.endMarker);
		that.map.removeOverlay(that.polyline);
		that.map.removeOverlay(that.label);
		
		
	}

    if(that.finlishFunction!=null){
        that.finlishFunction();
    }
}


//关闭测距
measureDistance.prototype.closeAll = function(){
    var that = measureDistance.prototype.that;
    that.map.setDefaultCursor(that.DefaultCursor);
    this.removeAll();
    this.startPoint=null;
    if(that.finlishFunction!=null){
        that.finlishFunction();
    }
}
