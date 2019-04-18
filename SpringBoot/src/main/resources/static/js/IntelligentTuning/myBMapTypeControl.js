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

    var BMapBtn= '<span class="BMapBtn">普通</span><span class="triangle"></span>';

    var BMapSelect = '<ul class="BMapSelect">\n' +
        '\t<li class="div1 BMap-selected">普通</li>\n' +
        '\t<li class="div2">实景</li>\n' +
        '\t<li class="div3">混合</li>\n' +
        '</ul>';

    var div = document.createElement("div");
	var divWrap = document.createElement("div");
    var select = document.createElement("div");

    var selectDiv = document.createElement("div");
    var selectText = document.createTextNode("普通");
    selectDiv.appendChild(selectText);

    var div1 = document.createElement("div");
    var e1 = document.createTextNode("普通");
    div1.appendChild(e1);

	var div2 = document.createElement("div");
    var e2 = document.createTextNode("卫星");
    div2.appendChild(e2);

    var div3 = document.createElement("div");
    var e3 = document.createTextNode("混合");
    div3.appendChild(e3);
    // // 设置样式
    selectDiv.className = 'BMap-select';
    div1.className = 'BMap-btns BMap-active';
	div2.className = 'BMap-btns';
	div3.className = 'BMap-btns';

    divWrap.appendChild(div1);
    divWrap.appendChild(div2);
    divWrap.appendChild(div3);


    div.append(selectDiv);
    div.append(divWrap);

    divWrap.className = 'BMapSelect';

    map.getContainer().appendChild(div);

    // 绑定事件
    selectDiv.onclick = function(e){
        var mapId = $(map.getContainer()).attr('id');
        // console.log('mapId:'+mapId);
        $("#"+mapId+" .BMapSelect").toggle();
    }


    // 绑定事件
    div3.onclick = function(e){
        $(this).addClass("BMap-active").siblings().removeClass("BMap-active");
        selectDiv.innerText = '混合';
        $(this).parent().hide();
		map.setMapType(BMAP_HYBRID_MAP);
	}

    div1.onclick = function(e){
        $(this).addClass("BMap-active").siblings().removeClass("BMap-active");
        selectDiv.innerText = '普通';
        $(this).parent().hide();
		map.setMapType(BMAP_NORMAL_MAP);
	}

    div2.onclick = function(e){
        $(this).addClass("BMap-active").siblings().removeClass("BMap-active");
        selectDiv.innerText = '卫星';
        $(this).parent().hide();
		map.setMapType(BMAP_SATELLITE_MAP);
	}

	if(this.mapType == BMAP_NORMAL_MAP){
        $(".div1").addClass("BMap-active").siblings().removeClass("BMap-active");
    }else if(this.mapType == BMAP_SATELLITE_MAP){
        $(".div2").addClass("BMap-active").siblings().removeClass("BMap-active");
    }else if(this.mapType == BMAP_HYBRID_MAP){
        $(".div3").addClass("BMap-active").siblings().removeClass("BMap-active");
    }
    $("body").click(function (e) { //点击其他地方隐藏下拉列表
        if($(e.target).closest(".BMap-select").length == 0){
            $(".BMapSelect").hide();
        }
    });
    // 将DOM元素返回
    return div;
}