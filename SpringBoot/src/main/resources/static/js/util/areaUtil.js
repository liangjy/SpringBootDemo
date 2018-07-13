/**
 * 地域维度工具类
 * @author fangy
 *
 */
var areaUtil = {};
areaUtil.data;//地域维度数据
var cityPermission_common;
var userName;

/**
 * ajax获取数据，赋值给areaUtil.data
 */
areaUtil.getData = function(){
	noce.ajaxAsync("pages_area_Area_getAllAreaInfor.action",
		 	null,
			function(data){
				countyJson.boundaries = data[0].boundaries;
				data = data[0].citys;
				areaUtil.data = data;
				for(var i = 0;i<data.length;i++){
					var cityName = data[i].name+"市";
					for(var j = 0;j<countyJson.city.length;j++){
						var josnCityName = countyJson.city[j].name;
						if(cityName == josnCityName){
							countyJson.city[j].area = data[i].area;
							countyJson.city[j].boundaries = data[i].boundaries;
							break;
						}
					}
				}
				initArea = true;
			});
};
/**
 * ajax获取GIS
 */
areaUtil.getGIS = function(areaName){
	var area ={} ;
	var provinceJson = getCityJson();
	var cityList = getCityJson().city;
	getArea:
	for(var i=0;i<cityList.length;i++){
		//地市下的区县
		for(var j = 0; j < cityList[i].area.length; j++){
			if(cityList[i].area[j].name.replace("区","")==areaName.replace("区","")){
				area =  cityList[i].area[j];
				break getArea;
			}
		}
	}
//	是否存在边界信息   是则返回对象，否则发送请求获取
	var boundaries = area.boundaries;
	if(typeof(boundaries)!="undefined"&&boundaries.length>0){
		return area;
	}else{
		noce.ajaxAsync("pages_area_Area_getGis.action?areaName="+areaName,
			 	null,
				function(data){
					console.log("success");
		//			data = data[0];
					console.log(data);
					area.boundaries = data;
					city:
		//			数据储存到countyJson
					for(var i=0;i<cityList.length;i++){
						for(var j = 0; j < cityList[i].area.length; j++){
							if(cityList[i].area[j].name==areaName){
								countyJson.city[i].area[j] = area;
								break city;
							}
						}
					}
					console.log(area);
					return area;
				});
	}
};
/**
 * set boundaries of city.s area
 */
areaUtil.setCityGIS = function(cityName){
	var city ={} ;
	var provinceJson = getCityJson();
	var cityList = getCityJson().city;
	getArea:
	for(var i=0;i<cityList.length;i++){
		//地市下的区县
			if(cityList[i].name==cityName){
				city =  cityList[i];
			}
	}
//	是否存在边界信息   是则返回对象，否则发送请求获取
	var boundaries = city.area[0].boundaries;
	if(typeof(boundaries)!="undefined"&&boundaries.length>0){
		return area;
	}else{
		
		noce.ajaxAsync("pages_area_Area_getAreaByCityName.action?cityName="+cityName,
			 	null,
				function(data){
					console.log("success");
		//			data = data[0];
					console.log(data);
					data = data[0];
					var cityName = data.name+"市";
					city:
					for(var j = 0;j<countyJson.city.length;j++){
						var josnCityName = countyJson.city[j].name;
						if(cityName == josnCityName){
							countyJson.city[j].area = data[i].area;
							break city;
						}
					}
				});
	}
};
/**
 * 初始化地域select
 * 初始化select[noce_area] ,生成select地市和select区县
 * filter="广东省，...."
 */
areaUtil.initArea = function(){
//	alert(cityPermission_common);
	var $currentTab = $(".pc_listb[id].down");
	var $sblingSelect=$currentTab.find("select[noce_area]");
	if($sblingSelect.length<1){
		return false;
	}
	$sblingSelect.each(function(){
		var $this = $(this);
		var showArea = $this.attr("showArea");//是否显示区县
		var cityID = $this.attr("cityID")||"cityName";
		var areeID = $this.attr("areeID")||"areaName";
		var filter = $this.attr("filter")||"";
		var $citySelect = $('<select id="'+cityID+'"></select>');
		var $areaSelect = $('<select id="'+areeID+'"><option value="" selected="">全省</option></select>');
		if("2.0"==$('#version').val()){
			$citySelect = $('<select class="select" style="width: 65px;" id="'+cityID+'"></select>');
			$areaSelect = $('<select class="select" style="width: 65px;" id="'+areeID+'"><option value="" selected="">全省</option></select>');
		}		
		var cityNames = noceUtil.getCityFromCountyJson();
	//	区域初始化
		var str;
		if(cityPermission_common=="全省"){
			
			if (filter.indexOf("广东省") == -1) {
				str = '<option value="" selected="">广东省</option>';
			}  
			
			for(var i=0;i<cityNames.length;i++){
				
				str=str+'<option value="'+cityNames[i]+'" >'+cityNames[i]+'</option>';
				
			}
			str = str+'<option value="other" >未知</option>';			
		}else if(cityPermission_common=="未知"){
			str='<option value="'+cityPermission_common+'">'+cityPermission_common+'</option>';
		}else{
			str='<option value="'+cityPermission_common+'市">'+cityPermission_common+'市</option>';
		}

		$citySelect.append(str);
	//	$citySelect.after($areaSelect);
		if(showArea!="0"){
			$this.after($areaSelect).after($('<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>')).after($citySelect).remove();
			$citySelect.change(function(){
				console.log("get AreaNames");
				var $this = $(this);
				var $areaSelect =$currentTab.find("#"+areeID);
				$areaSelect.empty();
				var str="";
				if($this.val()==""){
					str = '<option value="" selected="">全省</option>';
				}else if($this.val()=="null"){
					str = '<option value="" selected="">全市</option>';
				}else{
					var areaNames = noceUtil.getAreanByCity($this.val());
					str = '<option value="" selected="">全市</option>';
					for(var i=0;i<areaNames.length;i++){
						str=str+'<option value="'+areaNames[i]+'" >'+areaNames[i]+'</option>';
					}
					str = str+'<option value="other">未知</option>';
				}
				$areaSelect.append(str);
			});
			$citySelect.change();
		}else{
			$this.after($citySelect).remove();
		}
	});
	
//	diffuseUser.initCity();
};

///**
// * 初始化地域select
// * 初始化select[noce_area] ,生成select地市和select区县
// */
//areaUtil.initArea = function(tab){
//	var $currentTab = $(tab);
//	var $sblingSelect=$currentTab.find("select[noce_area]");
//	if($sblingSelect.length<1){
//		return false;
//	}
//	$sblingSelect.each(function(){
//		var $this = $(this);
//		var cityID = $this.attr("cityID")||"cityName";
//		var areeID = $this.attr("areeID")||"areaName";
//		var $citySelect = $('<select id="'+cityID+'"></select>');
//		var $areaSelect = $('<select id="'+areeID+'"><option value="" selected="">全省</option></select>')
//		var cityNames = noceUtil.getCityFromCountyJson();
//	//	区域初始化
//		var str = '<option value="" selected="">广东省</option>';
//		
//		for(var i=0;i<cityNames.length;i++){
//			str=str+'<option value="'+cityNames[i]+'" >'+cityNames[i]+'</option>';
//		}
//		str = str+'<option value="other" >未知</option>';
//		$citySelect.append(str);
//		$this.after($areaSelect).after($('<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>')).after($citySelect).remove();
//	//	$citySelect.after($areaSelect);
//		$citySelect.change(function(){
//			console.log("get AreaNames");
//			var $this = $(this);
//			var $areaSelect =$currentTab.find("#"+areeID);
//			$areaSelect.empty();
//			var str="";
//			if($this.val()==""){
//				str = '<option value="" selected="">全省</option>';
//			}else if($this.val()=="null"){
//				str = '<option value="" selected="">全市</option>';
//			}else{
//				var areaNames = noceUtil.getAreanByCity($this.val());
//				str = '<option value="" selected="">全市</option>';
//				for(var i=0;i<areaNames.length;i++){
//					str=str+'<option value="'+areaNames[i]+'" >'+areaNames[i]+'</option>';
//				}
//				str = str+'<option value="other">未知</option>';
//			}
//			$areaSelect.append(str);
//		});
//	})
//}

/**
 * load之后初始化地图上方地域选择
 * 初始化select[map_area] ,生成select地市和select区县
 */
areaUtil.initMapArea = function(){
	
};
/**
 * 文档加载结束
 */
$(function(){
//	areaUtil.getData();
	cityPermission_common=$("#cityPermission_common").val();
	localStorage.cityPermission_common = cityPermission_common;
	
	userName = $("#headerUserForm_a").text(); //这是按第三方梁杰禹的要求做的
	localStorage.userName = $.trim(userName);
	
});