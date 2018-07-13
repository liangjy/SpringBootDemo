/**
 * 根据百度地图定制map 使用方法： var customMap = CustomMap.initMap(div, cityPermission,
 * areaChangedCallbac) customMap.getBaiduMap(); //返回百度地图实例
 */
var CustomMap = {

	/**
	 * 初始化地图
	 * 
	 * @param div
	 *            地图所在的div容器
	 * @param areaChangedCallback
	 *            地图地市或者区县改变后调用此回调方法，
	 *            此回调方法有参数zoom,currCityName,currAreaName分别为地图当前级别，当前地市名，当前区县名
	 *            如：function callbackDemo(zoom, currCityName, currAreaName){...};
	 * @param cityPermission
	 *            当前用户的区域权限
	 */
	initMap : function(div, cityPermission, areaChangedCallback) {
		var customMap = {};

		var map;// 地图实例

		var beforeZoom = 7;
		var baseStationSectionList = [];// 扇区
		var baseStationSectionCollection = null; // 扇区海量点

		var brightCityName;// 当前高亮地市名称
		var brightCityPolygon = new Array();// 当前高亮地市Polygon

		var brightCountyName;// 当前高亮区县名称
		var brightCountyPolygon = new Array();// 当前高亮区县Polygon

		var currentCountyPolygon;// 当前区县

		var addComp = null;

		var mapUtil_cityPermission = null;

		var allBorder = new Array(); // 所有行政区域的边框

		var beforeCityName = null;
		var beforeAreaName = null;
		var beforeBorderType = "province";
		var regionType = "province";

		var areaChangedCallBackFun = null;

		var isSectorShow = false; // 扇区是否展示，默认展示
		var baseStationSectionQueryParam = "" // 扇区额外查询参数

		initBaiduMap(div, cityPermission, areaChangedCallback);

		// 私有方法start
		function initBaiduMap(div, cityPermission, areaChangedCallback) {
			map = new BMap.Map(div); // 创建地图实例
			map.enableScrollWheelZoom(); // 允许滚轮缩放
			var top_left_navigation = new BMap.NavigationControl(); // 左上角，添加默认缩放平移控件
			map.addControl(top_left_navigation);
			map.setMapStyle({
				style : 'grayscale'
			});
			var point = new BMap.Point(113.315808, 21.659752);
			AreaRestriction(map);
			areaChangedCallBackFun = areaChangedCallback;
			if ("全省" != cityPermission) {
				mapUtil_cityPermission = cityPermission + "市";
			} else {
				mapUtil_cityPermission = "广东省";
			}

			beforeCityName = mapUtil_cityPermission;

			if ("广东省" == mapUtil_cityPermission) {
				map.centerAndZoom(point, 7); // 初始化地图，设置中心点坐标和地图级别
				map.setMinZoom(7);
				province(); // 画全省的地市边框
			} else {
				map.centerAndZoom(point, 9); // 初始化地图，设置中心点坐标和地图级别
				map.setMinZoom(9);
				city2();
				regionType = "city";
			}
			// 地图级别缩放事件
			map.addEventListener("zoomend", function(e) {
				updatePoint(false);
				var zoom = map.getZoom();
				console.log("等级：" + zoom);
				if (zoom == 7 || zoom == 8) { // 省份
					if (beforeZoom != 7 && beforeZoom != 8) {
						regionType = "province";
						removeAllBorder();
						province();
					}
				} else if (zoom == 9) { // 地市
					regionType = "city";
					removeAllBorder();
					city2();
				} else if (zoom >= 11) {
					regionType = "county";
					// 取消区县高亮背景
					currentCountyPolygon.setFillColor("");
				}
				console.log("zoom == " + zoom);
				beforeZoom = zoom;
			});

			// 地图移动结束事件
			map.addEventListener("moveend", function(e) {
				updatePoint(false);
			});
			return map;
		}

		/**
		 * 地图动态变更中心点 1.修改当前行政区域高亮边界 2.地图每次缩放都会调用updatePoint(false)更新中心点
		 */
		// updateFlag true为主动查询时变更
		function updatePoint(updateFlag) {
			var point = map.getCenter();
			baiduGetLocation
					.getLocation(
							point,
							map,
							function(rs) {
								// console.log(rs);
								addComp = rs.addressComponents;
								var zoom = map.getZoom();
								if (zoom == 7 || zoom == 8) {
									regionType = "province";
									regionName = "广东省";
								} else if (zoom == 9) {
									regionType = "city";
									regionName = addComp.city;
								} else if (zoom >= 10) {
									regionType = "county";
									regionName = addComp.city + "-"
											+ addComp.district;
								}
								// console.log("移动了
								// 1："+regionName+";2:"+beforeRegionName);
								if (regionName != ''
										&& (addComp.city == mapUtil_cityPermission || "广东省" == mapUtil_cityPermission)) {
									// 非广东省级别,修改当前行政区域高亮边界
									if (zoom != 7 && zoom != 8) {
										if (beforeCityName != addComp.city) {
											if (addComp.city != "") {
												borderCity(addComp.city, "city");
											} else {
												console.log("地市为空");
												console.log(addComp);
											}
										}
										// map.removeOverlay(brightCountyPolygon);
										if (zoom >= 10) {
											borderCity(addComp.district,
													"county");
										}
									}
									// 扇区
									/*
									 * if(isSectorShow && addComp.district !=
									 * beforeAreaName){
									 * removeBaseStationSectionCollection();
									 * console.log("zoom == " + map.getZoom());
									 * if(map.getZoom() < 15 && map.getZoom() >=
									 * 10){ //15级以下海量打点方式进行显示
									 * baseStationSectionCollectionShow(addComp.city,addComp.district);
									 * }else if(map.getZoom() >= 15){
									 * baseStationSection(addComp.city,addComp.district); } }
									 */
								} else {
									map.setCenter(mapUtil_cityPermission);
								}
							});
		}

		// 省份
		var arr = [];
		function province() {
			console.log("等级：省份");
			// 把21个地市分成21个对象
			var cityList = getCityJson().city;
			// 获取各地市对象

			for ( var i = 0; i < cityList.length; i++) {
				// 行政区域的点有多少个
				if (cityList[i].name == mapUtil_cityPermission
						|| "广东省" == mapUtil_cityPermission) {
					for ( var j = 0; j < cityList[i].boundaries.length; j++) {
						// console.log(cityList[i].boundaries[j]);
						var ply = new BMap.Polygon(cityList[i].boundaries[j], {
							strokeWeight : 3,
							strokeColor : "#819fd1",
							fillOpacity : 0.4,
							fillColor : ""
						}); // 建立多边形覆盖物
						// 绑定鼠标进入事件
						ply.addEventListener("mouseover", function(e) {
							this.setFillColor("#bc801a");
						});
						// 绑定鼠标离开事件
						ply.addEventListener("mouseout", function(e) {
							// map.removeOverlay(textHintOverlay);
							this.setFillColor("");
						});
						ply
								.addEventListener(
										"click",
										function(e) {
											map.centerAndZoom(e.point, 9);
											// 勾勒出当前地市的边框
											baiduGetLocation
													.getLocation(
															e.point,
															map,
															function(rs) {
																var addComp = rs.addressComponents;
																if (addComp.city == mapUtil_cityPermission
																		|| "广东省" == mapUtil_cityPermission) {
																	borderCity(
																			addComp.city,
																			"city");
																}
															});
										});
						map.addOverlay(ply); // 添加覆盖物
						allBorder.push(ply);
					}
				}
			}
			borderCity("广东", "province");
		}

		// 高亮边界
		function borderCity(city, type) {
			// console.log("高亮边界:"+city+",type:"+type);
			// 突出边界
			var boundaries = getCityBoundaries(city, type).boundaries;
			var count = boundaries.length; // 行政区域的点有多少个
			var hasCalled = false;

			if (type == "city") {// 地市
				for ( var i = 0; i < brightCityPolygon.length; i++) {
					map.removeOverlay(brightCityPolygon[i]);
				}
				for ( var i = 0; i < brightCountyPolygon.length; i++) {
					map.removeOverlay(brightCountyPolygon[i]);
				}
				brightCityName = city;
				// 高亮地市更改
				if (beforeCityName != brightCityName && areaChangedCallBackFun) {
					areaChangedCallBackFun(map.getZoom(), brightCityName, "",
							map.getCenter());
					hasCalled = true;
					beforeBorderType = "city";
				}
				beforeCityName = brightCityName;
				beforeAreaName = "";
				if (isSectorShow) {
					removeBaseStationSectionCollection();
				}
			} else if (type == "county") {// 区县
				for ( var i = 0; i < brightCountyPolygon.length; i++) {
					map.removeOverlay(brightCountyPolygon[i]);
				}
				brightCountyName = city;
				// 高亮区县更改
				if (beforeAreaName != brightCountyName
						&& areaChangedCallBackFun) {
					areaChangedCallBackFun(map.getZoom(), beforeCityName,
							brightCountyName, map.getCenter());
					hasCalled = true;
					beforeBorderType = "county";
				}
				if (isSectorShow
						&& (beforeAreaName != brightCountyName || needToSwitchSection())) {// 高亮区县更改，重新画扇区
					removeBaseStationSectionCollection();
					console.log("zoom == " + map.getZoom());
					/*
					 * if(map.getZoom() < 15 && map.getZoom() >= 10){
					 * //15级以下海量打点方式进行显示
					 * baseStationSectionCollectionShow(addComp.city,addComp.district);
					 * }else if(map.getZoom() >= 15){
					 * baseStationSection(addComp.city,addComp.district); }
					 */
					if (map.getZoom() >= 15) {
						baseStationSection(addComp.city, addComp.district);
					}
				}
				beforeAreaName = brightCountyName;
			}

			for ( var j = 0; j < count; j++) {
				var ply = new BMap.Polygon(boundaries[j], {
					strokeWeight : 3,
					strokeColor : "#0000EE",
					fillColor : "",
					fillOpacity : 1
				}); // 建立多边形覆盖物
				map.addOverlay(ply); // 添加覆盖物
				allBorder.push(ply);
				if (type == "city") {// 地市
					brightCityPolygon[j] = ply;
				} else if (type == "county" && ply != null) {// 区县
					brightCountyPolygon[j] = ply;
				}
			}

			// 高亮的级别更改了
			if (beforeZoom > 8 && map.getZoom() <= 8) {
				areaChangedCallBackFun(map.getZoom(), "广东省", "", map
						.getCenter());
				beforeBorderType = "province";
				beforeCityName = "广东省";
				beforeAreaName = "";
			} else if (beforeBorderType != type && !hasCalled
					&& map.getZoom() < beforeZoom) {
				areaChangedCallBackFun(map.getZoom(), city, "", map.getCenter());
				beforeBorderType = type;
			}
		}

		// 判断是否要重新画扇区
		function needToSwitchSection() {
			if ((beforeZoom < 10 && map.getZoom() >= 10)
					|| (beforeZoom < 15 && map.getZoom() >= 15)
					|| (beforeZoom >= 10 && map.getZoom() < 10)
					|| (beforeZoom >= 15 && map.getZoom() < 15)) {
				return true;
			}
			return false;
		}

		// 地市
		function city2() {
			console.log("等级：地市");
			console.log("地市生成区县块");

			var cityList = getCityJson().city;
			for ( var i = 0; i < cityList.length; i++) {// 地市
				if (cityList[i].name == mapUtil_cityPermission
						|| "广东省" == mapUtil_cityPermission) {
					if (cityList[i].area.length == 0) {
						countyPolygon(cityList[i].boundaries, false,
								cityList[i].cn_name);
					} else {
						for ( var j = 0; j < cityList[i].area.length; j++) {// 区县
							countyPolygon(cityList[i].area[j].boundaries, true,
									cityList[i].area[j].name);
						}
					}
				}
			}
			// 高亮当前地市
			baiduGetLocation.getLocation(map.getCenter(), map, function(rs) {
				var addComp = rs.addressComponents;
				borderCity(addComp.city, "city");
			});

		}

		// 生成区县区划
		function countyPolygon(boundaries, iscounty, countyName) {
			var count = boundaries.length; // 行政区域的点有多少个
			for ( var j = 0; j < count; j++) {
				if (j == 0) {
					var ply = new BMap.Polygon(boundaries[j], {
						strokeWeight : 2,
						strokeColor : "#819fd1",
						fillOpacity : 0.4,
						fillColor : ""
					}); // 建立多边形覆盖物
					// 绑定鼠标进入事件
					ply.addEventListener("mouseover", function(e) {
						if (map.getZoom() < 10) {
							this.setFillColor("#a36905");
						} else {
							this.setFillColor("");
						}
						currentCountyPolygon = this;
					});
					// 绑定鼠标离开事件
					ply.addEventListener("mouseout", function(e) {
						this.setFillColor("");
					});
					ply
							.addEventListener(
									"click",
									function(e) {
										var zoom = map.getZoom();
										if (zoom == 9) {
											map.centerAndZoom(e.point, 10);
											// 通过当前点击坐标点，突出其边框
											baiduGetLocation
													.getLocation(
															e.point,
															map,
															function(rs) {
																var addComp = rs.addressComponents;
																if (addComp.city == mapUtil_cityPermission
																		|| "广东省" == mapUtil_cityPermission) {
																	borderCity(
																			addComp.district,
																			"county");
																}
															});
										}

										if (zoom >= 10) {// 当前等级为10时显示基站
											map.centerAndZoom(e.point, 11);
										}
									});
					map.addOverlay(ply); // 添加覆盖物
					allBorder.push(ply);
				} else {
					var ply2 = new BMap.Polygon(boundaries[j], {
						strokeWeight : 0.1,
						strokeColor : "#819fd1",
						fillOpacity : 0.4,
						fillColor : "#ffffff"
					}); // 建立多边形覆盖物
					map.addOverlay(ply2); // 添加覆盖物
					allBorder.push(ply2);
				}
			}
		}

		// 扇区
		function baseStationSection(city, district) {
			removeBaseStationSectionCollection();

			var url = "pages_baidumap_BaiDuMap_baseStationSectionSql.action?city="
					+ city
					+ "&district="
					+ district
					+ "&number="
					+ Math.random() + baseStationSectionQueryParam;
			$
					.get(
							url,
							function(data) {
								var progressBarSqls = [ data ];
								var functionlist = [ baseStationSectionCallback ];
								var reflectClass = [ "com.gsta.bdi.dh.odi.engine.web.action.baidumap.BaiDuMapAction:baseStationSectionPretreatment" ];
								progressbar.submitSql(progressBarSqls,
										functionlist, reflectClass);
							});

		}
		function baseStationSectionCallback(data) {
			var json = data.result;
			for ( var i = 0; i < json.length; i++) {
				var sector = new BMap.Polygon(add_sector(new BMap.Point(
						json[i].longitude, json[i].latitude), 0.002, 0.002,
						json[i].antAzimuth), {
					strokeColor : "blue",
					strokeWeight : 1,
					strokeOpacity : 0.5,
					fillOpacity : 0.0001
				});
				map.addOverlay(sector);
				baseStationSectionList[i] = sector;
				sector.addEventListener("mouseover", function(e) {
					console.log("查找扇区" + json.length);
					var context = "";
					var size = 0;
					for ( var a = 0; a < json.length; a++) {
						var flag = BMapLib.GeoUtils.isPointInPolygon(e.point,
								baseStationSectionList[a]);
						if (flag) {
							size++;
							context += "扇区名称：" + json[a].name + "<br/>扇区id："
									+ json[a].id + "<br/>地市名称："
									+ json[a].cityName + "<br/>网络类型："
									+ json[a].nettype + "<br/>bscId："
									+ json[a].bscId + "<br/>基站id："
									+ json[a].baseStatnId + "<br/>经度："
									+ json[a].longitude + "<br/>纬度："
									+ json[a].latitude + "<br/>方位角："
									+ json[a].antAzimuth + "<br/><br/>";
						}
					}
					// console.log(context);
					if (size > 0) {
						// openMapInfoWindow("扇区信息",context,e.point,140*size);
						openMapInfoWindow("扇区信息", context, e.point, 0);
					}
				});
				// sector.addEventListener("mouseout",function(e){
				// console.log("移出扇区");
				// map.closeInfoWindow();
				// });
			}
			console.log("扇区Size:" + baseStationSectionList.length);
		}

		// 海量打点方式显示扇区
		function baseStationSectionCollectionShow(city, district) {
			var url = "pages_baidumap_BaiDuMap_baseStationSectionSql.action?city="
					+ city
					+ "&district="
					+ district
					+ "&number="
					+ Math.random() + baseStationSectionQueryParam;
			$
					.get(
							url,
							function(data) {
								var progressBarSqls = [ data ];
								var functionlist = [ baseStationSectionCollectionShowCallback ];
								var reflectClass = [ "com.gsta.bdi.dh.odi.engine.web.action.baidumap.BaiDuMapAction:baseStationSectionPretreatment" ];
								progressbar.submitSql(progressBarSqls,
										functionlist, reflectClass);
							});
		}
		function baseStationSectionCollectionShowCallback(data) {
			console.log("海量打点扇区");
			var json = data.result;
			var basePoints = [];
			var options = diffArea.getSectionSizeByZoom(map.getZoom());
			options['color'] = "blue";
			options['size'] = "3"
			console.log(options);
			removeBaseStationSectionCollection();
			// 初始化PointCollection
			for ( var i = 0; i < json.length; i++) {
				basePoints.push(new BMap.Point(json[i].longitude,
						json[i].latitude));
			}
			baseStationSectionCollection = new BMap.PointCollection(basePoints,
					options); // 初始化PointCollection
			map.addOverlay(baseStationSectionCollection); // 添加Overlay
		}

		// 获取信息窗口了
		function openMapInfoWindow(title, context, point, height) {
			var opts = {
				width : 230, // 信息窗口宽度
				height : height, // 信息窗口高度
				title : title, // 信息窗口标题
				enableMessage : true,// 设置允许信息窗发送短息
				enableAutoPan : false,// 展示地图时，不平移地图
				message : context
			};
			var infoWindow = new BMap.InfoWindow(context, opts); // 创建信息窗口对象
			map.openInfoWindow(infoWindow, point);
		}
		// centre:椭圆中心点,X:横向经度,Y:纵向纬度;ant_angle角度
		function add_sector(centre, x, y, ant_angle) {
			var assemble = new Array();
			var angle;
			var dot;
			var tangent = x / y;
			assemble.push(centre)
			for (i = 0; i < 36; i++) {
				angle = (2 * Math.PI / 3 / 36) * i + (ant_angle - 60) / 180
						* Math.PI;
				dot = new BMap.Point(
						centre.lng + Math.sin(angle) * y * tangent, centre.lat
								+ Math.cos(angle) * y);
				assemble.push(dot);
			}
			return assemble;
		}

		// 删除基站扇区
		function removeBaseStationSectionCollection() {
			console.log('删除扇区');
			map.closeInfoWindow();
			for ( var i = 0; i < baseStationSectionList.length; i++) {
				map.removeOverlay(baseStationSectionList[i]);
			}
			baseStationSectionList = [];

			map.removeOverlay(baseStationSectionCollection); // 删除扇区海量点
			baseStationSectionCollection = null;
		}

		/**
		 * 删除所有区域边框
		 */
		function removeAllBorder() {
			for ( var i = 0; i < allBorder.length; i++) {
				map.removeOverlay(allBorder[i]);
			}
			allBorder = new Array();
		}

		// 私有方法 end

		// public方法 start

		/**
		 * 返回此定制地图的百度地图实例
		 */
		customMap.getBaiduMap = function() {
			return map;
		}

		/**
		 * 返回当前地图的级别，返回值如下：province、city、county
		 */
		customMap.getRegionType = function() {
			return regionType;
		}

		/**
		 * 展现扇区
		 * 
		 * @param dataSource
		 *            网络类型：app、dpi
		 * @param timeGading
		 *            时间粒度：quarter、month、week、day、hour
		 * @param startTime
		 *            起始时间
		 * @param endTime
		 *            结束时间
		 */
		customMap.showBaseStationSection = function(dataSource, timeGrading,
				startTime, endTime) {
			removeBaseStationSectionCollection();
			console.log("zoom == " + map.getZoom());
			baseStationSectionQueryParam = "&perceptionQuery.timeGrading="
					+ timeGrading + "&perceptionQuery.startTime=" + startTime
					+ "&perceptionQuery.endTime=" + endTime
					+ "&perceptionQuery.dataSource=" + dataSource
			/*
			 * if(map.getZoom() < 15 && map.getZoom() >= 10){ //15级以下海量打点方式进行显示
			 * baseStationSectionCollectionShow(addComp.city,addComp.district);
			 * }else if(map.getZoom() >= 15){
			 * baseStationSection(addComp.city,addComp.district); }
			 */
			if (map.getZoom() >= 15) {
				baseStationSection(addComp.city, addComp.district);
			}
			isSectorShow = true;
		}

		customMap.removeBaseStationSection = function() {
			removeBaseStationSectionCollection();
			isSectorShow = false;
		}
		// public 方法 end

		return customMap; // 返回customMap对象
	}
}