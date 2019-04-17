function myBMapTypeControl(bmapObject) {
    if(bmapObject.anchor!=undefined){
    	this.defaultAnchor = bmapObject.anchor;
    }else{
    	this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
    }
    
    if(bmapObject.offset!=undefined){
    	this.defaultOffset = bmapObject.offset;
    }else{
    	this.defaultOffset = new BMap.Size(10 , 10);
    }

    if(bmapObject.mapType != undefined){
        this.mapType = bmapObject.mapType;
    }else{
        this.mapType = BMAP_NORMAL_MAP;
    }
}

myBMapTypeControl.prototype = new BMap.Control();
myBMapTypeControl.prototype.initialize = function (map) {
	var div = document.createElement("div");

    var div1 = document.createElement("div");
    var e1 = document.createTextNode("地图");
    div1.appendChild(e1);
    // 设置样式
	div1.className = 'BMap-btn BMapTypeControl div1';
	
	var div2 = document.createElement("div");
    var e2 = document.createTextNode("实景");
    div2.appendChild(e2);
    
    var div3 = document.createElement("div");
    var e3 = document.createTextNode("混合");
    div3.appendChild(e3);
    // 设置样式
	div2.className = 'BMap-btn BMapTypeControl div2';
	div3.className = 'BMap-btn BMapTypeControl div3';
	div.appendChild(div1);
	div.appendChild(div2);
	div.appendChild(div3);
	// div2.id="mapControl";
    map.getContainer().appendChild(div);
	
	// 绑定事件
	div3.onclick = function(e){
		div1.style.backgroundColor = "#fff";
		div1.style.color = "black";
		div1.style.fontWeight = "normal";
		
		div2.style.backgroundColor = "#fff";
		div2.style.color = "black";
		div2.style.fontWeight = "normal";
		
		div3.style.backgroundColor = "rgb(142, 168, 224)";
		div3.style.color = "white";
		div3.style.fontWeight = "bold";
		
		map.setMapType(BMAP_HYBRID_MAP);
	}
	
	div1.onclick = function(e){
		div2.style.backgroundColor = "#fff";
		div2.style.color = "black";
		div2.style.fontWeight = "normal";
		
		div3.style.backgroundColor = "#fff";
		div3.style.color = "black";
		div3.style.fontWeight = "normal";
		
		div1.style.backgroundColor = "rgb(142, 168, 224)";
		div1.style.color = "white";
		div1.style.fontWeight = "bold";
        map.setMapType(BMAP_NORMAL_MAP);
		/*var tiler = map.getMapType().getTileLayer();
		var mapType = new BMap.MapType("BMAP_NORMAL_MAP" , tiler,{maxZoom:20, minZoom:8});
		map.setMapType(mapType);*/
	}
	
	div2.onclick = function(e){
		div1.style.backgroundColor = "#fff";
		div1.style.color = "black";
		div1.style.fontWeight = "normal";
		
		div3.style.backgroundColor = "#fff";
		div3.style.color = "black";
		div3.style.fontWeight = "normal";
		
		div2.style.backgroundColor = "rgb(142, 168, 224)";
		div2.style.color = "white";
		div2.style.fontWeight = "bold";
		
		map.setMapType(BMAP_SATELLITE_MAP);
	}

	if(this.mapType == BMAP_NORMAL_MAP){
        div2.style.backgroundColor = "#fff";
        div2.style.color = "black";
        div2.style.fontWeight = "normal";

        div3.style.backgroundColor = "#fff";
        div3.style.color = "black";
        div3.style.fontWeight = "normal";

        div1.style.backgroundColor = "rgb(142, 168, 224)";
        div1.style.color = "white";
        div1.style.fontWeight = "bold";
        map.setMapType(BMAP_NORMAL_MAP);
    }else if(this.mapType == BMAP_SATELLITE_MAP){
        div1.style.backgroundColor = "#fff";
        div1.style.color = "black";
        div1.style.fontWeight = "normal";

        div3.style.backgroundColor = "#fff";
        div3.style.color = "black";
        div3.style.fontWeight = "normal";

        div2.style.backgroundColor = "rgb(142, 168, 224)";
        div2.style.color = "white";
        div2.style.fontWeight = "bold";
        map.setMapType(BMAP_SATELLITE_MAP);
    }else if(this.mapType == BMAP_HYBRID_MAP){
        div1.style.backgroundColor = "#fff";
        div1.style.color = "black";
        div1.style.fontWeight = "normal";

        div2.style.backgroundColor = "#fff";
        div2.style.color = "black";
        div2.style.fontWeight = "normal";

        div3.style.backgroundColor = "rgb(142, 168, 224)";
        div3.style.color = "white";
        div3.style.fontWeight = "bold";
        map.setMapType(BMAP_HYBRID_MAP);
    }

    // 将DOM元素返回
    return div;
}