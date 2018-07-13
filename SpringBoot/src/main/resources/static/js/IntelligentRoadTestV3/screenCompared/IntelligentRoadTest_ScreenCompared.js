var IntelligentRoadTestScreenCompared = {};
IntelligentRoadTest.isScreenCompared = false;//是否是分屏页面
IntelligentRoadTest.isAddMessageEvent = false;//是否已经增加message监听事件
IntelligentRoadTestScreenCompared.initLng = null;//分屏中需要初始化的经度
IntelligentRoadTestScreenCompared.initLat = null;//分屏中需要初始化的纬度
IntelligentRoadTestScreenCompared.initZoom = null;//分屏中需要初始化的地图级别
IntelligentRoadTestScreenCompared.menu_id = 456;//智能路测V3菜单id
IntelligentRoadTestScreenCompared.perId = 486;//智能路测V3菜单id
IntelligentRoadTestScreenCompared.sendSetCenter = false;//是否需要往主屏或者分屏发送message
IntelligentRoadTestScreenCompared.messageObject = {};//记录最后接收到的message信息（不保存地图拖动事件）
$(function(){
    var menu_id = noceUtil.GetQueryString("menuId");
    var perId = noceUtil.GetQueryString("perId");
    if(menu_id!=null){
        IntelligentRoadTestScreenCompared.menu_id = menu_id;
    }
    if(perId!=null){
        IntelligentRoadTestScreenCompared.perId = perId;
    }

    var screen = noceUtil.GetQueryString("screen");
    if(screen=="true"||screen==true){
    	$("title").text("天翼蓝鹰分屏对比副屏" + " - 广东电信网络数据智慧运营平台");
        IntelligentRoadTest.isScreenCompared = true;
//        $('#leftIcon').click();
//        $('#topHeader').click();
//        $('#downFooter').click();
//        //隐藏工具、框选、对比
//        $('#threeComp').hide();
//        $('#BoxSelection').hide();
        // $('#compText').hide();
        // $(".pack").click();
        var timeDay = noceUtil.GetQueryString("day");
        if(timeDay!=null){
            var fomatDate = timeDay.substring(0, 4) + "/" + timeDay.substring(4, 6) + "/" + timeDay.substring(6, 8);
            var d=new Date(fomatDate);
            var date= new Date(d.getFullYear(), d.getMonth(), d.getDate()-6);
            var year=date.getFullYear()+"";
            var month=date.getMonth()+1+"";
            var day=date.getDate()+"";
            if(month.length==1){
                month="0"+month;
            }
            if(day.length==1){
                day="0"+day;
            }
            var startTime = year+month+day;
            $('#seachTime').text(timeDay);
            $('#weekStartTime').text(startTime);
            IntelligentRoadTest.day = $('#seachTime').text();
        }

        var lng = noceUtil.GetQueryString("lng");
        var lat = noceUtil.GetQueryString("lat");
        var mapType = noceUtil.GetQueryString("mapType");
        var point = null;
        if(mapType=='OSM'){
        	IntelligentRoadTest.showOsmMap();//显示osm地图
        	if(lng!=null&&lat!=null){
                IntelligentRoadTestScreenCompared.initLng = lng;
                IntelligentRoadTestScreenCompared.initLat = lat;
                point = new L.latLng(lat,lng);
            }
        	var zoom = noceUtil.GetQueryString("zoom");
            if(zoom!=null){
                IntelligentRoadTestScreenCompared.initZoom = zoom;
            }

            if(point!=null&&zoom!=null){
                IntelligentRoadTest.OsmMap.setView(point,zoom);
            }
        	
        }else{
        	if(lng!=null&&lat!=null){
                IntelligentRoadTestScreenCompared.initLng = lng;
                IntelligentRoadTestScreenCompared.initLat = lat;
                point = new BMap.Point(lng,lat);
            }
            var zoom = noceUtil.GetQueryString("zoom");
            if(zoom!=null){
                IntelligentRoadTestScreenCompared.initZoom = zoom;
            }

            if(point!=null&&zoom!=null){
                IntelligentRoadTest.map.centerAndZoom(point,zoom);
            }
        }
        

        window.addEventListener('message',function(e){
            if(!e.data){
                return;
            }
            var data = JSON.parse(e.data);
            IntelligentRoadTestScreenCompared.postMessageHandle(data);
        },false);
        
        window.onfocus = function (){
        	console.log('screen');
        	if(!window.opener.closed){
//        		window.opener.focus();
//        		window.open('','IntelligentRoadTestAnalysisV3','resizable=yes');
        		$('#screenComp').trigger('click');
        	}else{
        		
        	}
        	
        }
        
    }

})

IntelligentRoadTestScreenCompared.openComared = function (){
    /**
     * var w=screen.availWidth;
    var h=screen.availHeight;
    var width = w/2;
    var height = h;
    var option = 'width='+width+',height='+height+',resizable=yes,scrollbars=no';
    var centerPoint = IntelligentRoadTest.map.getCenter();
    var lng = centerPoint.lng;
    var lat = centerPoint.lat;
    var zoom = IntelligentRoadTest.map.getZoom();
    var url = null;
    url='/NOCE/portal/pages_index_Index_home.action?appId=IntelligentRoadTestAnalysisV3&menuId='+IntelligentRoadTestScreenCompared.menu_id+'&perId='+IntelligentRoadTestScreenCompared.perId+'&id_path=new&isRedirect=true&appName=智能测评V3.0Beta'
        +"&day="+IntelligentRoadTest.day
        +"&lng="+lng
        +"&lat="+lat
        +"&zoom="+zoom
        +"&screen=true";
    windowScreeen = window.open(url,"IntelligentRoadTestScreen",option);
    windowScreeen.moveTo(width,0);
    window.resizeTo(width,height);
    window.moveTo(0,0);
    return;
     */

    //如何判断是在哪个详情页
    var object_type = IntelligentRoadTestScreenCompared.getObjTypeByString(IntelligentRoadTest.currentLocation);
    var object_data = IntelligentRoadTestScreenCompared.getObjDataByString(IntelligentRoadTest.currentLocation);
    // if(object_type=="高速"||object_type=="高铁"||object_type=="市政路"||object_type=="地铁"||object_type==''){//线段类暂不支持分屏
    //     //工单、宏扇区勘误、自定义图层也不支持分屏
    //     alert("当前类型不支持分屏对比");
    //     return ;
    // }
    if(!IntelligentRoadTest.isScreenCompared&&IntelligentRoadTest.isAddMessageEvent){//不是在分屏页，并且点击过分屏
        if(!windowScreeen.closed){//如果窗口没有关闭，需要进行同步信息，如果已经关闭，则需要重新打开
//            windowScreeen.focus();
        	window.open('', 'IntelligentRoadTestScreen','resizable=yes');
            return;
        }

    }

    IntelligentRoadTestScreenCompared.openScreenCompared(object_data,object_type);

    //    为当前页面增加监听事件，只能添加一次
    if(!IntelligentRoadTest.isAddMessageEvent){
        window.addEventListener('message',function(e){
            var data = JSON.parse(e.data);
            IntelligentRoadTestScreenCompared.postMessageHandle(data);
        },false);
        
        window.onfocus = function (){
        	console.log('main');
        	if(!windowScreeen.closed){//如果窗口没有关闭，需要进行同步信息，如果已经关闭，则需要重新打开
//              windowScreeen.focus();
//        		window.open('', 'IntelligentRoadTestScreen','resizable=yes');
        		$('#screenComp').trigger('click');
              return;
          }
        }
        
        IntelligentRoadTest.isAddMessageEvent = true;
    }
}

//打开分屏对比
IntelligentRoadTestScreenCompared.openScreenCompared = function (item,obj_type){
    if(IntelligentRoadTest.isScreenCompared){//如果是分屏页，不可以再进行分屏对比
        alert("分屏页不支持再分屏");
        return;
    }

    
    var w=screen.availWidth;
    var h=screen.availHeight;
//    var w = window.outerwidth;
//    var h = window.outerHeight;
    var width = w/2;
    var height = h;
    var option = 'width='+width+',height='+height+',resizable=yes,scrollbars=no';
    var url = null;
    
    window.resizeTo(width,height);
    window.moveTo(0,0);
    
    var centerPoint = IntelligentRoadTest.map.getCenter();
    var lng = centerPoint.lng;
    var lat = centerPoint.lat;
    var zoom = IntelligentRoadTest.map.getZoom();
    var mapType = "BD";
    if(obj_type=="高速"||obj_type=="高铁"||obj_type=="市政路"){
    	centerPoint = IntelligentRoadTest.OsmMap.getCenter();
        lng = centerPoint.lng;
        lat = centerPoint.lat;
        zoom = IntelligentRoadTest.OsmMap.getZoom();
        mapType = "OSM";
    }
    
    
    if(obj_type==""||item==null){
        url='/NOCE/portal/pages_index_Index_home.action?appId=IntelligentRoadTestAnalysisV3&menuId='+IntelligentRoadTestScreenCompared.menu_id+'&perId='+IntelligentRoadTestScreenCompared.perId+'&id_path=new&isRedirect=true&appName=智能测评V3.0Beta分屏对比'
            +"&day="+IntelligentRoadTest.day
            +"&lng="+lng
            +"&lat="+lat
            +"&zoom="+zoom
            +"&mapType="+mapType
            +"&screen=true";
        windowScreeen = window.open(url,"IntelligentRoadTestScreen",option);
        windowScreeen.moveTo(width,0);
        return;
    }
    
    var id = IntelligentRoadTestScreenCompared.getObjIdByObjType(obj_type,item);
    if(obj_type=="地铁"){
    	item.city = item.city_name;
    }
    url='/NOCE/portal/pages_index_Index_home.action?appId=IntelligentRoadTestAnalysisV3&menuId='+IntelligentRoadTestScreenCompared.menu_id+'&perId='+IntelligentRoadTestScreenCompared.perId+'&id_path=new&isRedirect=true&appName=智能测评V3.0Beta'
    +"&day="+IntelligentRoadTest.day
    +"&city="+item.city
    +"&country="+item.country
    +"&mktcenter="+item.mktcenter
    +"&lng="+lng
    +"&lat="+lat
    +"&zoom="+zoom
    +"&mapType="+mapType
    +"&screen=true";
    
    var object_id = id
    if(obj_type=='高速'||obj_type=='高铁'||obj_type=='市政路'){
    	object_id = id.split(',')[1];//高速、高铁、市政路的对象id是线段id
    	url +="&object_id="+object_id+"&road_id="+id.split(',')[0];
    	if(IntelligentRoadTest.isLP){
    		url +="&isLP="+IntelligentRoadTest.isLP;
    	}
    }else if(obj_type=='地铁'){
//    	object_id = id.split(',')[1]+","+id.split(',')[2];//由于工单中没有地铁的工单，因此传入from_station_id和to_station_id
    	url +="&object_id="+object_id;
    }else{
    	url +="&object_id="+object_id;
    }
    
    if(obj_type != "弱区"){
    	url += "&object_type="+obj_type;
    }
    
    windowScreeen = window.open(url,"IntelligentRoadTestScreen",option);
    windowScreeen.moveTo(width,0);

}

//向分屏页发送详情页同步信息
IntelligentRoadTestScreenCompared.postMessageToScreenCompared = function (object_data,object_type){
    var messageObj = {}
    messageObj.type = object_type;
    messageObj.item = object_data;
    if(object_type=="poor"||object_type=="highway"||object_type=="railway"||object_type=="cityRoad"){
        messageObj.day = IntelligentRoadTest.day;
    }
    windowScreeen.postMessage(JSON.stringify(messageObj),"*");
}


IntelligentRoadTestScreenCompared.postMessageHandle = function (messageData){
    if(messageData.type == "bdmaponmoveend"||messageData.type == "osmmaponmoveend"){
    	if(messageData.type == "bdmaponmoveend"){
    		if(messageData.sendSetCenter == true||messageData.sendSetCenter == "true"){
                IntelligentRoadTestScreenCompared.sendSetCenter = true;
            }
            var nowCenterPoint = IntelligentRoadTest.map.getCenter();
            var centerPoint = new BMap.Point(messageData.point.lng,messageData.point.lat);
            if(nowCenterPoint.lng!=centerPoint.lng&&nowCenterPoint.lat != centerPoint.lat){
                IntelligentRoadTest.map.setCenter(centerPoint);
            }

            var mapZoom = messageData.zoom;
            if(IntelligentRoadTest.map.getZoom()!=mapZoom){
                IntelligentRoadTest.map.setZoom(mapZoom);
            }
            setTimeout(function (){
                IntelligentRoadTestScreenCompared.sendSetCenter = false;
            },300);
    	}else if(messageData.type == "osmmaponmoveend"){
    		if(messageData.sendSetCenter == true||messageData.sendSetCenter == "true"){
                IntelligentRoadTestScreenCompared.sendSetCenter = true;
            }
            var nowCenterPoint = IntelligentRoadTest.OsmMap.getCenter();
//            new L.LatLng(23.135541, 113.270667);
            var centerPoint = new L.LatLng(messageData.point.lat,messageData.point.lng);
            if(nowCenterPoint.lng!=centerPoint.lng&&nowCenterPoint.lat != centerPoint.lat){
                IntelligentRoadTest.OsmMap.panTo(centerPoint);
            }

            var mapZoom = messageData.zoom;
            if(IntelligentRoadTest.OsmMap.getZoom()!=mapZoom){
                IntelligentRoadTest.OsmMap.setZoom(mapZoom);
            }
            setTimeout(function (){
                IntelligentRoadTestScreenCompared.sendSetCenter = false;
            },300);
    	}
        
    }else{
    	if(messageData.type=="highway"||messageData.type=="railway"||messageData.type=="cityRoad"){
    		IntelligentRoadTest.showOsmMap();//显示osm地图
    		//只显示扇区图层选项
    		$('#sector').parents('table').siblings('table').hide();
    	}else{
    		IntelligentRoadTest.showBaiduMap();//显示百度地图
    		if(messageData.type=="metro"){
    			//只显示扇区图层选项
        		$('#sector').parents('table').siblings('table').hide();
    		}else{
    			//将图层配置所有选项都显示
    			$('#sector').parents('table').siblings('table').show();
    		}
    	}
    	//场景：1关注 2工单 3扇区 4dt 5骨头 6宏扇区 7高速 8高铁 9高密度 10高校  11高流量商务 12美景 13框选骨头区域 14市政路 15地铁 16战狼 17农贸 18美食 19场馆
        if(messageData.type=="college"){
            IntelligentRoadTest.getSenseDataByESBHID(1 , messageData.item.esbh_id , IntelligentRoadTest.day,false , false);
        }else if(messageData.type=="site"){
            IntelligentRoadTest.getSenseDataByESBHID(10 , messageData.item.esbh_id , IntelligentRoadTest.day,false , false);
        }else if(messageData.type=="uptown"){
            IntelligentRoadTest.getSenseDataByESBHID(2 , messageData.item.esbh_id , IntelligentRoadTest.day,false , false);
        }else if(messageData.type=="food"){
            IntelligentRoadTest.getSenseDataByESBHID(9 , messageData.item.esbh_id , IntelligentRoadTest.day,false , false);
        }else if(messageData.type=="warWolf"){
            IntelligentRoadTest.getSenseDataByESBHID(3 , messageData.item.esbh_id , IntelligentRoadTest.day,false , true);
        }else if(messageData.type=="scenery"){
            IntelligentRoadTest.getSenseDataByESBHID(7 , messageData.item.esbh_id , IntelligentRoadTest.day,false , false);
        }else if(messageData.type=="business"){
            IntelligentRoadTest.getSenseDataByESBHID(3 , messageData.item.esbh_id , IntelligentRoadTest.day,false , false);
        }else if(messageData.type=="market"){
            IntelligentRoadTest.getSenseDataByESBHID(8 , messageData.item.esbh_id , IntelligentRoadTest.day,false , false);
        }else if(messageData.type=="sector"){
            IntelligentRoadTest.getSectorMessageById(messageData.item.enodeb_id , messageData.item.cell_id , IntelligentRoadTest.day);
        }else if(messageData.type=="concernArea"){
            IntelligentRoadTest.getConcernAreaMessageById(messageData.item.id);
        }else if(messageData.type=="boneArea"){
            IntelligentRoadTest.getBoneAreaMessageById(messageData.item.id);
        }else if(messageData.type=="poor"){
            if(messageData.day==IntelligentRoadTest.day){
                IntelligentRoadTest.getPoorAreaMessageById(messageData.item.object_id,messageData.day);
            }else{
            	if(IntelligentRoadTest.index != null){
            		$(".clearText").click();
                    $(".pack").click();
            	}
//            	IntelligentRoadTest.getPoorAreaMessageById(messageData.item.object_id,IntelligentRoadTest.day);
                IntelligentRoadTest.showPolygon(messageData.item.gis_data,true);
                IntelligentRoadTest.loadGrid(messageData.item.longitude_max_baidu,messageData.item.longitude_min_baidu,messageData.item.latitude_max_baidu,messageData.item.latitude_min_baidu);
            }
//            console.log("弱区需要特殊处理");
        }else if(messageData.type=="metro"){
        	IntelligentRoadTest.senseName = 'metro';
        	IntelligentRoadTest.getMetroStationDataByID(messageData.item.from_station_id ,messageData.item.to_station_id , IntelligentRoadTest.day);
        }else if(messageData.type=="highway"){
        	IntelligentRoadTest.senseName = 'highway';
//        	IntelligentRoadTest.road_id = messageData.item.road_id;
        	//如果第一层vue对象没有初始化则进行初始化，为什么还要else这个分支呢，因为不重新设置一遍vue对象，会出现前后对不上的问题，比如先进入了500米，下一次切到连片，某些查询还是会按500米的逻辑进行查询
        	if(!IntelligentRoadTest.highwayVM){
        		IntelligentRoadTest.showRoadFirstList([] , 1 , messageData.item.isLP);
        	}else{
        		IntelligentRoadTest.showRoadFirstList(IntelligentRoadTest.highwayFirstListResult , 1 , messageData.item.isLP);
        	}
        	
        	if(messageData.item.isLP){
        		//连片的线段不同天的时候暂不实现,20180509
        		if(messageData.item.day==IntelligentRoadTest.day){
        			IntelligentRoadTest.getRoadCompleteMessageByLineID(messageData.item.line_id ,IntelligentRoadTest.day , 1 , messageData.item.city , messageData.item.road_id , messageData.item.isLP);
        		}else{
//        			alert("高速连片线段暂不支持不同天的分屏对比");
        			if(IntelligentRoadTest.index != null){
                		$(".clearText").click();
                        $(".pack").click();
                	}
                    IntelligentRoadTest.hideOsmStarEndMk();
                    IntelligentRoadTest.hideDetailsMk();
        			var city_id = noceUtil.city_LATN_ID[messageData.item.city];
        			IntelligentRoadTest.loadContinueLineMeterData(IntelligentRoadTest.day,1,city_id,messageData.item.road_id,messageData.item.contain_ids);
        		}
        	}else{
        		IntelligentRoadTest.getRoadCompleteMessageByLineID(messageData.item.line_id ,IntelligentRoadTest.day , 1 , messageData.item.city , messageData.item.road_id , messageData.item.isLP);
        	}
        	        	
        }else if(messageData.type=="railway"){
        	IntelligentRoadTest.senseName = 'rail';
//        	IntelligentRoadTest.road_id = messageData.item.road_id;
        	if(!IntelligentRoadTest.railVM){
        		IntelligentRoadTest.showRoadFirstList([] , 2 , messageData.item.isLP);
        	}else{
        		IntelligentRoadTest.showRoadFirstList(IntelligentRoadTest.railFirstListResult , 2 , messageData.item.isLP);
        	}
        	if(messageData.item.isLP){
        		//连片的线段不同天的时候暂不实现,20180509
        		if(messageData.item.day==IntelligentRoadTest.day){
        			IntelligentRoadTest.getRoadCompleteMessageByLineID(messageData.item.line_id ,IntelligentRoadTest.day , 2 , messageData.item.city , messageData.item.road_id , messageData.item.isLP);
        		}else{
//        			alert("高铁连片线段暂不支持不同天的分屏对比");
        			if(IntelligentRoadTest.index != null){
                		$(".clearText").click();
                        $(".pack").click();
                	}
                    IntelligentRoadTest.hideOsmStarEndMk();
                    IntelligentRoadTest.hideDetailsMk();
        			var city_id = noceUtil.city_LATN_ID[messageData.item.city];
        			IntelligentRoadTest.loadContinueLineMeterData(IntelligentRoadTest.day,2,city_id,messageData.item.road_id,messageData.item.contain_ids);
        		}
        	}else{
        		IntelligentRoadTest.getRoadCompleteMessageByLineID(messageData.item.line_id ,IntelligentRoadTest.day , 2 , messageData.item.city , messageData.item.road_id , messageData.item.isLP);
        	}
        	
        }else if(messageData.type=="cityRoad"){
        	IntelligentRoadTest.senseName = 'cityRoad';
//        	IntelligentRoadTest.road_id = messageData.item.road_id;
        	//line_id , day , typeID , cityName , road_id , isLP
        	if(!IntelligentRoadTest.cityRoadVM){
        		IntelligentRoadTest.showRoadFirstList([] , 3 , messageData.item.isLP);
        	}else{
        		IntelligentRoadTest.showRoadFirstList(IntelligentRoadTest.cityRoadFirstListResult , 3 , messageData.item.isLP);
        	}
        	
        	if(messageData.item.isLP){
        		//连片的线段不同天的时候暂不实现,20180509
        		if(messageData.item.day==IntelligentRoadTest.day){
        			IntelligentRoadTest.getRoadCompleteMessageByLineID(messageData.item.line_id ,IntelligentRoadTest.day , 3 , messageData.item.city , messageData.item.road_id , messageData.item.isLP);
        		}else{
//        			alert("市政路连片线段暂不支持不同天的分屏对比");
        			if(IntelligentRoadTest.index != null){
                		$(".clearText").click();
                        $(".pack").click();
                	}
                    IntelligentRoadTest.hideOsmStarEndMk();
                    IntelligentRoadTest.hideDetailsMk();
        			var city_id = noceUtil.city_LATN_ID[messageData.item.city];
        			IntelligentRoadTest.loadContinueLineMeterData(IntelligentRoadTest.day,3,city_id,messageData.item.road_id,messageData.item.contain_ids);
        		}
        	}else{
        		IntelligentRoadTest.getRoadCompleteMessageByLineID(messageData.item.line_id ,IntelligentRoadTest.day , 3 , messageData.item.city , messageData.item.road_id , messageData.item.isLP);
        	}
        	        	
        }else if(messageData.type=="sense"){
        	var obj_type = IntelligentRoadTest.getObjTypeNumByTypeName(messageData.item);
        	IntelligentRoadTest.getSenseDataByESBHID(obj_type , messageData.item.esbh_id , IntelligentRoadTest.day,false , false);
        	
        }
        IntelligentRoadTestScreenCompared.messageObject = messageData;
        console.log("object_type:"+messageData.type);
    }
}


//根据字符串的对象类型返回页面跳转之间的中文字符串
IntelligentRoadTestScreenCompared.getObjTypeByString = function (currentLocation){
    var object_type = "";
    switch (currentLocation) {
        case "college":
            object_type="高校";
            break;
        case "site":
            object_type="场馆";
            break;
        case "uptown":
            object_type="高密度住宅区";
            break;
        case "food":
            object_type="美食";
            break;
        case "scenery":
            object_type="美景";
            break;
        case "business":
            object_type="高流量商务区";
            break;
        case "market":
            object_type="农贸市场";
            break;
        case "poorArea":
            object_type="弱区";
            break;
        case "sector":
            object_type="扇区";
            break;
        case "macSector":
            object_type="宏扇区";
            break;
        case "concern":
            object_type="关注区域";
            break;
        case "boneArea":
            object_type="骨头区域";
            break;
        case "warwolf":
            object_type="战狼区域";
            break;
        case "highway":
            object_type="高速";
            break;
        case "rail":
            object_type="高铁";
            break;
        case "cityRoad":
            object_type="市政路";
            break;
        case "metro":
            object_type="地铁";
            break;
        case "school":
            object_type="中小学";
            break;
        case "cityVillage":
            object_type="城中村";
            break;
        case "village":
            object_type="自然村";
            break;
        case "factory":
            object_type="工厂";
            break;
        case "boxSelect":
            object_type="自定义框选";
            break;
        case "poorAreaDashed":
            object_type="虚线弱区";
            break;
        case "upPoorArea":
            object_type="上行低速区";
            break;
        case "dwPoorArea":
            object_type="下行低速区";
            break;
        case "m3PoorArea":
            object_type="MOD3干扰区";
            break;
        case "olPoorArea":
            object_type="重叠覆盖区";
            break;
        case "cbPoorArea":
            object_type="越区覆盖区";
            break;
        default: ""
            break;
    }
    return object_type;
}

IntelligentRoadTestScreenCompared.getObjDataByString = function (currentLocation){
    var itemData = null;
    switch (currentLocation){
        case "college":
            itemData=IntelligentRoadTest.collegeCompleteVM.collegeData;
            break;
        case "site":
            itemData=IntelligentRoadTest.siteCompleteVM.siteData;
            break;
        case "uptown":
            itemData=IntelligentRoadTest.uptownCompleteVM.uptownData;
            break;
        case "food":
            itemData=IntelligentRoadTest.foodCompleteVM.foodData;
            break;
        case "scenery":
            itemData=IntelligentRoadTest.sceneryCompleteVM.sceneryData;
            break;
        case "business":
            itemData=IntelligentRoadTest.businessCompleteVM.businessData;
            break;
        case "market":
            itemData=IntelligentRoadTest.marketCompleteVM.marketData;
            break;
        case "poorArea":
            itemData=IntelligentRoadTest.rfgCompleteVM.poorAreaData;
            break;
        case "sector":
            itemData=IntelligentRoadTest.sectorCompleteVM.sectorData;
            break;
        case "macSector":
            itemData=IntelligentRoadTest.macSectorCompleteVM.macSectorData;
            break;
        case "concern":
            itemData=IntelligentRoadTest.concernAreaCompleteVM.concernAreaData;
            break;
        case "boneArea":
            itemData=IntelligentRoadTest.boneAreaCompleteVM.boneAreaData;
            break;
        case "warwolf":
            itemData=IntelligentRoadTest.warwolfCompleteVM.warwolfData;
            break;
        case "school":
        	itemData=IntelligentRoadTest.senseCompleteVM.senseData;
            break;
        case "cityVillage":
        	itemData=IntelligentRoadTest.senseCompleteVM.senseData;
            break;
        case "village":
        	itemData=IntelligentRoadTest.senseCompleteVM.senseData;
            break;
        case "factory":
        	itemData=IntelligentRoadTest.senseCompleteVM.senseData;
            break;
        case "highway":
            itemData=IntelligentRoadTest.highwayCompleteVM.highwayData;
            break;
        case "rail":
            itemData=IntelligentRoadTest.railCompleteVM.railData;
            break;
        case "cityRoad":
            itemData=IntelligentRoadTest.cityRoadCompleteVM.cityRoadData;
            break;
        case "metro":
            itemData=IntelligentRoadTest.metroCompleteVM.metroData;
            break;
        default: ""
            break;
    }
    return itemData;
}

IntelligentRoadTestScreenCompared.getObjIdByObjType = function (obj_type,obj_data){
    var obj_id = null;
    switch (obj_type){
        case "高校":
            obj_id=obj_data.esbh_id;
            break;
        case "场馆":
            obj_id=obj_data.esbh_id;
            break;
        case "高密度住宅区":
            obj_id=obj_data.esbh_id;
            break;
        case "美食":
            obj_id=obj_data.esbh_id;
            break;
        case "美景":
            obj_id=obj_data.esbh_id;
            break;
        case "高流量商务区":
            obj_id=obj_data.esbh_id;
            break;
        case "农贸市场":
            obj_id=obj_data.esbh_id;
            break;
        case "弱区":
            obj_id=obj_data.object_id;
            break;
        case "扇区":
            obj_id=obj_data.enodeb_id*256+parseInt(obj_data.cell_id);
            break;
        case "宏扇区":
            obj_id=null;
            break;
        case "关注区域":
            obj_id=obj_data.id;
            break;
        case "骨头区域":
            obj_id=obj_data.id;
            break;
        case "战狼区域":
            obj_id=obj_data.esbh_id;
            break;
        case "中小学":
            obj_id=obj_data.esbh_id;
            break;
        case "城中村":
            obj_id=obj_data.esbh_id;
            break;
        case "自然村":
            obj_id=obj_data.esbh_id;
            break;
        case "工厂":
            obj_id=obj_data.esbh_id;
            break;
        case "高速":
            obj_id=obj_data.road_id+","+obj_data.line_id;
            break;
        case "高铁":
            obj_id=obj_data.road_id+","+obj_data.line_id;
            break;
        case "市政路":
            obj_id=obj_data.road_id+","+obj_data.line_id;
            break;
        case "地铁":
            obj_id=obj_data.line_id+","+obj_data.from_station_id+","+obj_data.to_station_id;
            break;
        default: ""
            break;
    }
    return obj_id;
}
