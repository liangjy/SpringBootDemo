
function bmapConversion(bMapObj){
	this.clickPoint = [];//点击位置的经纬度
	this.clickMarker = [];//点击位置的覆盖物(定位标记图片)
//	this.clickMarkerImageUrl = null;//点击位置覆盖物的图片url
	this.clickLabelOverlay = [];//提示信息的覆盖物，需要使用自定义覆盖物
	this.map=bMapObj.map;//地图对象
	this.finlishFunction = bMapObj.finishFunction;//事件处理结束后调用的接口
	this.isUseTool = false;//是否正在使用工具
	this.isFirst = true;//首次加载
	this.DefaultCursor = bMapObj.map.getDefaultCursor();
	bmapConversion.prototype.that = this;
}

//开启坐标拾取工具
bmapConversion.prototype.openMeasure = function (){
	var that = bmapConversion.prototype.that;
	
//	that.map.setDefaultCursor('url(../images/icon_editPwd.png) , auto');
	this.removeAll();
	this.clickPoint=[];
	
	if(this.isFirst==true){
		this.isFirst = false;
		this.map.addEventListener('click', this.clickMap);
	}
	
	this.isUseTool = true;
	bmapConversion.prototype.that = this;
}

bmapConversion.prototype.clickMap = function clickMap(e){
	var that = bmapConversion.prototype.that;
	var point = e.point;
	if(that.isUseTool){
		var currentDomEvent = $(e.domEvent.target);
//		console.log("hasClass  pointValSpan----"+$(currentDomEvent).hasClass("pointValSpan"));
//		console.log("hasClass  btn-bgAndbtn-copy----"+$(currentDomEvent).hasClass("btn-bg btn-copy"));
//		console.log("hasClass  pointSpan----"+$(currentDomEvent).hasClass("pointSpan"));
//		console.log("hasClass  circleTipLeft----"+$(currentDomEvent).hasClass("circleTipLeft"));
		
		if($(currentDomEvent).hasClass("btn-bg btn-copy")
				||$(currentDomEvent).hasClass("pointValSpan")
				||$(currentDomEvent).hasClass("pointSpan")
				||$(currentDomEvent).hasClass("circleTipLeft")
				||$(currentDomEvent).attr("title")=="坐标拾取点"){
			return;
		}
		
//		that.map.setDefaultCursor(that.DefaultCursor);
//		that.isUseTool = false;
//		that.clickPoint = point;// 创建标注
		var clickMarker = new BMap.Marker(point);  // 创建标注
		clickMarker.setTitle("坐标拾取点");
//		that.clickMarker = new BMap.Marker(point);  // 创建标注
		
		var obj = [];
		
		var pointStr = parseFloat(point.lat).toFixed(6)+","+parseFloat(point.lng).toFixed(6);
		var baidu = {key:"百度坐标",val:pointStr}
		
		var gpsPoint = GPSUtil.bd09_To_gps84(point.lat,point.lng);
		var gpsPointStr = gpsPoint[0]+","+gpsPoint[1];
		var gps = {key:"GPS坐标",val:gpsPointStr}
		obj.push(baidu);
		obj.push(gps);
		
		var clickLabelOverlay = new ConversionOverlay(point,obj);
		that.map.addOverlay(clickMarker);
		that.map.addOverlay(clickLabelOverlay);
		clickMarker.arrIndex = that.clickMarker.length;
		clickLabelOverlay.arrIndex = that.clickLabelOverlay.length;
		point.arrIndex = that.clickPoint.length;
		
		clickMarker.enableDragging();//开启标注拖拽功能
		clickMarker.addEventListener('dragging',function(e){
//			console.log(e);
			var mar = e.target;
			var arrIndex = mar.arrIndex;
			that.clickPoint[arrIndex] = e.point;
			that.map.removeOverlay(that.clickLabelOverlay[arrIndex]);
			var obj = [];
			
			var pointStr = parseFloat(e.point.lat).toFixed(6)+","+parseFloat(e.point.lng).toFixed(6);
			var baidu = {key:"百度坐标",val:pointStr}
			
			var gpsPoint = GPSUtil.bd09_To_gps84(e.point.lat,e.point.lng);
			var gpsPointStr = gpsPoint[0]+","+gpsPoint[1];
			var gps = {key:"GPS坐标",val:gpsPointStr}
			obj.push(baidu);
			obj.push(gps);
			
			that.clickLabelOverlay[arrIndex] = new ConversionOverlay(e.point,obj);
			that.map.addOverlay(that.clickLabelOverlay[arrIndex]);
		});
		
		that.clickPoint.push(point);//点击位置的经纬度
		that.clickMarker.push(clickMarker);//点击位置增加的标注点
		that.clickLabelOverlay.push(clickLabelOverlay);//点击位置的文本
//		if(that.finlishFunction){
//			that.finlishFunction();
//		}
	}
}

bmapConversion.prototype.removeAll = function removeAll(){
	var that = bmapConversion.prototype.that;
	
	for(var i=0;i<that.clickPoint.length;i++){
		that.map.removeOverlay(that.clickPoint[i]);
	}
	
	for(var i=0;i<that.clickMarker.length;i++){
		that.map.removeOverlay(that.clickMarker[i]);
	}
	
	for(var i=0;i<that.clickLabelOverlay.length;i++){
		that.map.removeOverlay(that.clickLabelOverlay[i]);
	}
	
//	if(that.clickMarker){
//		that.map.removeOverlay(that.clickMarker);
//	}
	
//	if(that.clickLabelOverlay){
////		that.clickLabelOverlay.hide();
//		that.map.removeOverlay(that.clickLabelOverlay);
//	}
	
//	if(that.clickPoint){
//		that.clickPoint = null;
//	}
	
	that.clickPoint = null;//点击位置的经纬度数组
	that.clickMarker = null;//点击位置的覆盖物数组
	that.clickLabelOverlay = null;//提示信息的覆盖物，需要使用自定义覆盖物数组
	
	that.clickPoint = [];//点击位置的经纬度
	that.clickMarker = [];//点击位置的覆盖物
	that.clickLabelOverlay = [];//提示信息的覆盖物，需要使用自定义覆盖物
	that.isUseTool = false;//是否正在使用工具
}

//关闭坐标拾取
bmapConversion.prototype.closeAll = function(){
    var that = bmapConversion.prototype.that;
//    that.map.setDefaultCursor(that.DefaultCursor);
    that.removeAll();
    if(that.finlishFunction!=null){
        that.finlishFunction();
    }
}


function ConversionOverlay(point, textArr){
    this._point = point;
    this._textArr = textArr;
}
ConversionOverlay.prototype = new BMap.Overlay();

ConversionOverlay.prototype.initialize = function(map){
    this._map = map;
    
    var tip=this._div=document.createElement("div");
//    
//    tip.style.position = "absolute";
//    tip.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
//    tip.style.backgroundColor = "white";
//    tip.style.border = "1px solid white";
//    tip.style.color = "black";
//    tip.style.height = "36px";
//    tip.style.padding = "2px";
//    tip.style.lineHeight = "18px";
//    tip.style.whiteSpace = "nowrap";
//    tip.style.MozUserSelect = "none";
//    tip.style.fontSize = "12px"
    
    
    $(tip).html("");
    $(tip).addClass("circleTipLeft");
    $(tip).show();
    var ul = document.createElement("ul");
    $(ul).addClass("pointSpan");
    tip.appendChild(ul);
    for(var i=0;i<this._textArr.length;i++){
    	  if(this._textArr[i].val!=null){
    		  var li=document.createElement("li");
    		  $(li).addClass("pointSpan");
    		  var copyButton = document.createElement("button");
              $(copyButton).addClass("btn-bg btn-copy");
              $(copyButton).text("复制");
              var span1 = document.createElement("span");
              $(span1).addClass("pointSpan");//绑定一个样式，用于在点击事件中判断，如果有改样式，不执行新增标记点
              $(span1).html(this._textArr[i].key+":");
              $(span1).css("display","inline-block");
              $(span1).css("width","63px");
              var span2 = document.createElement("span");
              $(span2).html(this._textArr[i].val);
              $(span2).addClass("pointValSpan");//绑定一个样式方便查找
		      li.appendChild(span1);
              li.appendChild(span2);
              li.appendChild(copyButton);
		      ul.appendChild(li);
              copyButton.onmousedown = function(e){
                  $(this).css("background-color","#00c4ff");
              };
              copyButton.onmouseup = function (e){
                  $(this).css("background-color","#199ED8");
              };
              copyButton.onclick = function(e){
            	  
                  var thisButton = this;
                  var pointVal = $(this).prev('.pointValSpan');
                  if(pointVal.length!=0){
                      var pointValStr = $(pointVal).text();
                      var liTag = $(this).parent('li');
                      var snapTextarea = document.createElement("textarea");
                      snapTextarea.style.height = "0px";
                      snapTextarea.style.width = "0px";
                      snapTextarea.value = pointValStr;
                      $(liTag).append(snapTextarea);
                      snapTextarea.select();
                      document.execCommand("Copy"); //执行浏览器复制命令
                      $(liTag).find('textarea').remove();

                  }
              };
    	  }
     }
    map.getPanes().markerPane.appendChild(tip);
    return tip;
}
ConversionOverlay.prototype.draw = function(){
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x + 20 + "px";
    this._div.style.top  = pixel.y - 36 + "px";
}