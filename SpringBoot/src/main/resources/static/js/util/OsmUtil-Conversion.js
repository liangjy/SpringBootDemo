function OsmMapConversion(MapObj){
	this.clickPoint = [];//点击位置的经纬度
	this.clickMarker = [];//点击位置的覆盖物(定位标记图片)
//	this.clickMarkerImageUrl = null;//点击位置覆盖物的图片url
	this.clickLabelOverlay = [];//提示信息的覆盖物，需要使用自定义覆盖物
	this.map=MapObj.map;//地图对象
	this.finlishFunction = MapObj.finishFunction;//事件处理结束后调用的接口
	this.isUseTool = false;//是否正在使用工具
	this.isFirst = true;//首次加载
	//this.DefaultCursor = MapObj.map.getDefaultCursor();
	OsmMapConversion.prototype.that = this;
}
//开启坐标拾取工具
OsmMapConversion.prototype.openMeasure = function (){
	var that = OsmMapConversion.prototype.that;
	
//	that.map.setDefaultCursor('url(../images/icon_editPwd.png) , auto');
	this.removeAll();
//	this.clickPoint=[];
	
	if(this.isFirst==true){
		this.isFirst = false;
		this.map.on('click', this.clickMap);
	}
	
	this.isUseTool = true;
	OsmMapConversion.prototype.that = this;
}

//这里新增的样式全部结合智能路测V2版本的样式文件，如果需要拿到其他地方使用，请拷贝对应的样式
OsmMapConversion.prototype.clickMap = function clickMap(e){
	var that = OsmMapConversion.prototype.that;
	var point = e.latlng;
	if(that.isUseTool){
		
		var currentDomEvent = $(e.originalEvent.target);
//		console.log("hasClass  pointValSpan----"+$(currentDomEvent).hasClass("pointValSpan"));
//		console.log("hasClass  btn-bgAndbtn-copy----"+$(currentDomEvent).hasClass("btn-bg btn-copy copyPointStrButton"));
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
		var obj = [];
		
		var pointStr = parseFloat(point.lat).toFixed(6)+","+parseFloat(point.lng).toFixed(6);
		var gps = {key:"GPS坐标",val:pointStr}
		
		var baiduPoint = GPSUtil.gps84_To_bd09(point.lat,point.lng);
		var baiduPointStr = baiduPoint[0]+","+baiduPoint[1];
		var baidu = {key:"百度坐标",val:baiduPointStr}
		obj.push(gps);
		obj.push(baidu);
//		console.log(obj);
		that._textArr = obj;
		var tip=that._div=document.createElement("div");
		
		$(tip).html("");
		$(tip).show();
		var ul = document.createElement("ul");
		$(ul).addClass("pointSpan");
		tip.appendChild(ul);
		
		for(var i=0;i<that._textArr.length;i++){
    	  if(that._textArr[i].val!=null){
    		  var li=document.createElement("li");
    		  $(li).addClass("pointSpan");
    		  var copyButton = document.createElement("button");
              $(copyButton).addClass("btn-bg btn-copy copyPointStrButton");
              $(copyButton).text("复制");
              var span1 = document.createElement("span");
              $(span1).addClass("pointSpan");//绑定一个样式方便查找
              $(span1).html(that._textArr[i].key+":");
              $(span1).css("display","inline-block");
              $(span1).css("width","63px");
              var span2 = document.createElement("span");
              $(span2).html(that._textArr[i].val);
              $(span2).addClass("pointValSpan");//绑定一个样式方便查找
		      li.appendChild(span1);
              li.appendChild(span2);
              li.appendChild(copyButton);
		      ul.appendChild(li);
    	  }
		}
		
		var clickMarker = new L.marker(point,{title:"坐标拾取点",draggable:true});
		
		var clickLabelOverlay = new L.marker(point,{
			icon:L.divIcon({html:$(that._div).html(),className:"circleTipLeft circleTipLeftWidthAndHeight"}),
		});  // 创建标注
		
		clickLabelOverlay.addTo(that.map);
		clickMarker.addTo(that.map);
		point.arrIndex = that.clickPoint.length;
		clickMarker.arrIndex = that.clickMarker.length;
		clickLabelOverlay.arrIndex = that.clickLabelOverlay.length;
		
		clickMarker.on("drag",function(e){
//			console.log(e);
			
			var mar = e.target;
			var arrIndex = mar.arrIndex;
			that.clickPoint[arrIndex] = e.latlng;
//			that.clickLabelOverlay[arrIndex].remove();
			
			var obj = [];
			var pointStr = parseFloat(e.latlng.lat).toFixed(6)+","+parseFloat(e.latlng.lng).toFixed(6);
			var gps = {key:"GPS坐标",val:pointStr}
			var baiduPoint = GPSUtil.gps84_To_bd09(e.latlng.lat,e.latlng.lng);
			var baiduPointStr = baiduPoint[0]+","+baiduPoint[1];
			var baidu = {key:"百度坐标",val:baiduPointStr}
			obj.push(gps);
			obj.push(baidu);
//			console.log(obj);
			that._textArr = obj;
			var tip=that._div=document.createElement("div");
			
			$(tip).html("");
			$(tip).show();
			var ul = document.createElement("ul");
			$(ul).addClass("pointSpan");
			tip.appendChild(ul);
			
			for(var i=0;i<that._textArr.length;i++){
	    	  if(that._textArr[i].val!=null){
	    		  var li=document.createElement("li");
	    		  $(li).addClass("pointSpan");
	    		  var copyButton = document.createElement("button");
	              $(copyButton).addClass("btn-bg btn-copy copyPointStrButton");
	              $(copyButton).text("复制");
	              var span1 = document.createElement("span");
	              $(span1).addClass("pointSpan");//绑定一个样式方便查找
	              $(span1).html(that._textArr[i].key+":");
	              $(span1).css("display","inline-block");
	              $(span1).css("width","63px");
	              var span2 = document.createElement("span");
	              $(span2).html(that._textArr[i].val);
	              $(span2).addClass("pointValSpan");//绑定一个样式方便查找
			      li.appendChild(span1);
	              li.appendChild(span2);
	              li.appendChild(copyButton);
			      ul.appendChild(li);
	    	  }
			}
//			var clickLabelOverlay = new L.marker(e.latlng,{
//				icon:L.divIcon({html:$(that._div).html(),className:"circleTipLeft circleTipLeftWidthAndHeight"}),
//			});  // 创建标注
			var icon = L.divIcon({html:$(that._div).html(),className:"circleTipLeft circleTipLeftWidthAndHeight"});
			that.clickLabelOverlay[arrIndex].setLatLng(e.latlng);
			that.clickLabelOverlay[arrIndex].setIcon(icon);
//			= clickLabelOverlay;
//			clickLabelOverlay.addTo(that.map);
//			that.map.addOverlay(that.clickLabelOverlay[arrIndex]);
			
		});
		
		clickMarker.on("dragend",function(e){
			that.bindButtonEvent();
		});
		
		that.clickPoint.push(point);
		that.clickLabelOverlay.push(clickLabelOverlay);
		that.clickMarker.push(clickMarker);
		
		that.bindButtonEvent();
		
//		if(that.finlishFunction){
//			that.finlishFunction();
//		}
	}
}

OsmMapConversion.prototype.removeAll = function removeAll(){
	var that = OsmMapConversion.prototype.that;
	
	if(that.clickMarker.length>0){
		for(var i=0;i<that.clickMarker.length;i++){
			that.clickMarker[i].remove();
		}
		
	}
	
	if(that.clickLabelOverlay.length>0){
		for(var i=0;i<that.clickLabelOverlay.length;i++){
			that.clickLabelOverlay[i].remove();
		}
		
	}
	
	
	that.clickPoint = [];//点击位置的经纬度
	that.clickMarker = [];//点击位置的覆盖物(定位标记图片)
	that.clickLabelOverlay = [];//提示信息的覆盖物，需要使用自定义覆盖物
	that.isUseTool = false;//是否正在使用工具
}

OsmMapConversion.prototype.bindButtonEvent = function(){
	var that = OsmMapConversion.prototype.that;
	var mapContainer = that.map.getContainer();
//	copyPointStrButton
	//osm地图中没有提供直接的标签，只能根据当前地图的div所在id，查找自身放入的class样式名称进行查找，不能使用id，因为会引起冲突
	var osmMapId = $(mapContainer).attr("id");
	$('#'+osmMapId).find(".copyPointStrButton").each(function(i){
		$(this).unbind("mousedown").bind("mousedown",function(){
			$(this).css("background-color","#00c4ff");
		});
		$(this).unbind("mouseup").bind("mouseup",function(){
			$(this).css("background-color","#199ED8");
		});
		
		$(this).unbind("click").bind("click",function(){
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
		})
	});
}

//关闭坐标拾取
OsmMapConversion.prototype.closeAll = function(){
    var that = OsmMapConversion.prototype.that;
//    that.map.setDefaultCursor(that.DefaultCursor);
    that.removeAll();
    if(that.finlishFunction!=null){
        that.finlishFunction();
    }
}