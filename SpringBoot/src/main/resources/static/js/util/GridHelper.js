//栅格号转经纬度
//level=10时len=1000000
//level=100时len=100000
function gridLngLat(gridNum, level,len) {

    // 经度编号=(经度-109.456006485399)/(0.00000972*级别)+1001（向下取整）
    // 纬度编号=(纬度-20.1297900884702)/(0.00000896*级别)+1001（向下取整）
    // 网格编号=经度编号*100000+纬度编号
    //
    // 最小经度=(经度编号-1001)*(0.00000972*级别)+109.456006485399
    // 最小纬度=(经度编号-1001)*(0.00000896*级别)+20.1297900884702
    //
    // 中心经度=最小经度+(0.00000972*级别)/2
    // 中心纬度=最小纬度+(0.00000896*级别)/2
    //
    // 最大经度=最小经度+(0.00000972*级别)
    // 最大纬度=最小纬度+(0.00000896*级别)
    var lngNum = Math.floor(gridNum / len);
    var latNum = gridNum % len;
    var minLat = (latNum - 1001) * (0.00000896 * level) + 20.1297900884702;
    var minLng = (lngNum - 1001) * (0.00000972 * level) + 109.456006485399;
    var midLat = minLat + (0.00000896 * level) / 2;
    var midLng = minLng + (0.00000972 * level) / 2;
    var maxLat = minLat + (0.00000896 * level);
    var maxLng = minLng + (0.00000972 * level);
    return [minLng, minLat, midLng, midLat, maxLng, maxLat];
}
//经纬度转栅格号
//level=10时len=1000000
//level=100时len=100000
function gridNum(longitude, latitude, level,len) {
    // 经度编号=(经度-109.456006485399)/(0.00000972*级别)+1001（向下取整）
    // 纬度编号=(纬度-20.1297900884702)/(0.00000896*级别)+1001（向下取整）
    // 网格编号=经度编号*100000+纬度编号
    var lngnum = Math.floor((longitude - 109.456006485399) / (0.00000972 * level) + 1001);

    var latnum = Math.floor((latitude - 20.1297900884702) / (0.00000896 * level) + 1001);
    var gridnum = lngnum * len + latnum;
    return gridnum;
}

function gridLngNum(longitude,level){
	var lngnum = Math.floor((longitude - 109.456006485399) / (0.00000972 * level) + 1001);
	return lngnum;
}

function gridLatNum(latitude,level){
	var latnum = Math.floor((latitude - 20.1297900884702) / (0.00000896 * level) + 1001);
	return latnum;
}

//获取邻区栅格号
function getNcGridNum(gridNum, num) {
    lngnum = Math.floor(gridNum / 100000);
    latnum = gridNum % 100000;
    var result = [];
    for (var i = 0; i < num + 1; i++) {
        for (var j = 0; j < num + 1; j++) {
            if (i == 0 && j != 0) {
            
                result.push(lngnum * 100000 + latnum + j);
                result.push(lngnum * 100000 + latnum - j);
            } else if (i != 0 && j == 0) {
                result.push((lngnum + i) * 100000 + latnum);
                result.push((lngnum - i) * 100000 + latnum);
            } else if (i != 0 && j != 0) {
                result.push((lngnum + i) * 100000 + latnum + j);
                result.push((lngnum + i) * 100000 + latnum - j);
                result.push((lngnum - i) * 100000 + latnum + j);
                result.push((lngnum - i) * 100000 + latnum - j);
            }
        }
    }
    return result;
}
//折半查找
function binarySearch(target, array) {
    var low = 0,
      high = array.length - 1,
      mid, midElement;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        midElement = array[mid];
        if (target > midElement) {
            low = mid + 1;
        } else if (target < midElement) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}
//查找联通区域
function getArea(datas, radius, min, max) {

    if (arguments.length == 0) { return []; }
    else if (arguments.length == 1) {
        radius = 1;
        min = -1;
        max = -1;
    } else if (arguments.length == 2) {
        min = -1;
        max = -1;
    } else if (arguments.length == 3) {
        max = -1;
    }


    datas.sort();

    var gp = [];
    while (datas.length > 0) {
        var curgp = [];
        var inlist = [datas[0]];

        while (inlist.length > 0) {
            var curItem = inlist[0];
            inlist.splice(0, 1);
            var curPost = binarySearch(curItem, datas);
            if (curPost != -1) {
                datas.splice(curPost, 1);
                curgp.push(curItem);
            }
            var ncItems = getNcGridNum(curItem, radius);
            for (var j = 0; j < ncItems.length; j++) {
                var curNcItems = ncItems[j];
                var ncPost = binarySearch(curNcItems, datas);
                if (ncPost != -1) {
                    inlist.push(curNcItems);
                    datas.splice(ncPost, 1);
                    curgp.push(curNcItems);
                }
            }
        }
        gp.push(curgp);
    }
    var resultGP = [];
    for (var i = 0; i < gp.length; i++) {
        var cursize = gp[i].length;
        if ((min == -1 || min <= cursize) && (max == -1 || max >= cursize)) {
            resultGP.push(gp[i]);
        }
    }


    return resultGP;
}

//gis_data:多边形的轮廓数据，经度和纬度用逗号拼接，点和点之间用@拼接，多边形和多边形用竖线拼接
//栅格级别:
function getGridNum(gis_data,level){
	var max_lng = null;
	var max_lat = null;
	var min_lng = 180;
	var min_lat = 90;
	var area_bonds_arr = gis_data.split("|");
	var polygonArr = [];
	for(var i=0;i<area_bonds_arr.length;i++){
		var area_bonds_item = area_bonds_arr[i].split('@');
		var pointArr = [];
		for(var j=0;j<area_bonds_item.length;j++){
			var lng_lat = area_bonds_item[j].split(',');
			var lng = parseFloat(lng_lat[0]);
			var lat = parseFloat(lng_lat[1]);
			var p = {}
			p.lng = lng;
			p.lat = lat;
			// 设置最大最小经纬度
			if (lng > max_lng)
				max_lng = lng;
			if (lat > max_lat)
				max_lat = lat;
			if (lng < min_lng)
				min_lng = lng;
			if (lat < min_lat)
				min_lat = lat;
			pointArr.push(p);
		}
		polygonArr.push(pointArr);
	}
	
	// 求出经纬度返回包含的栅格
	var base_lng = 109.456006485399;
	var base_lat = 20.1297900884702;
	var diff_lng = 0.00000972;
	var diff_lat = 0.00000896;
	
	var d = 100000;
	if (level == 10)
		d = d * 10;
	var dnum = 1001;
	if(max_lng==null||max_lat==null||min_lng==180||min_lat == 90){
		console.warn("计算最大最小经纬度报错");
		return;
	}
	var max_lng_num = Math.floor((max_lng - base_lng) / (diff_lng * level) + dnum);
	var max_lat_num = Math.floor((max_lat - base_lat) / (diff_lat * level) + dnum);
	var min_lng_num = Math.floor((min_lng - base_lng) / (diff_lng * level) + dnum);
	var min_lat_num = Math.floor((min_lat - base_lat) / (diff_lat * level) + dnum);
	// 获取所有栅格号
	var allNums = [];
	for (var m = min_lat_num; m <= max_lat_num; m++) {
		for (var n = min_lng_num; n <= max_lng_num; n++) {
			allNums.push(n * d + m);
		}
	}
	
	var retNums = [];
	// 判断栅格是否落在多边形里面
	for (var i=0;i<allNums.length;i++) {
		var lngNum = parseInt(allNums[i] / d);//需要注意经度编号计算出来为整形，不进行强转会导致计算出来的栅格变多
		var latNum = allNums[i] % d;
		var minLat = (latNum - dnum) * (diff_lat * level) + base_lat;
		var minLng = (lngNum - dnum) * (diff_lng * level) + base_lng;
		var midLat = minLat + (diff_lat * level) / 2;
		var midLng = minLng + (diff_lng * level) / 2;
		var is_in = 0;
		for (var j=0;j<polygonArr.length;j++) {
			var p = {lng:midLng,lat:midLat};
			if (rayCasting(midLng, midLat, polygonArr[j])) {
				is_in += 1;
			}
//			if (rayCasting2(p, polygonArr[j])) {
//				is_in += 1;
//			}
		}
		if (is_in == 1) {
			retNums.push(allNums[i]);
		}
	}
//	console.log("栅格长度："+retNums.length);
	return retNums;
}

function rayCasting(px,py,pointArr){
	var flag = false;
	for (var i = 0, l = pointArr.length, j = l - 1; i < l; j = i, i++) {
		var sx = pointArr[i].lng;
		var sy = pointArr[i].lat;
		var tx = pointArr[j].lng;
		var ty = pointArr[j].lat;

		// 点与多边形顶点重合
		if ((sx == px && sy == py) || (tx == px && ty == py)) {
			return true;
		}

		// 判断线段两端点是否在射线两侧
		if ((sy < py && ty >= py) || (sy >= py && ty < py)) {
			// 线段上与射线 Y 坐标相同的点的 X 坐标
			var x = sx + (py - sy) * (tx - sx) / (ty - sy);

			// 点在多边形的边上
			if (x == px) {
				return true;
			}

			// 射线穿过多边形的边界
			if (x > px) {
				flag = !flag;
			}
		}
	}
	// 射线穿过多边形边界的次数为奇数时点在多边形内
	return flag ? true : false;
}


function rayCasting2(point, pts){

    var maxAndMinLngLat =getMaxAndMinLatLng(pts);//{max_lng: maxLng, max_lat:maxLat ,min_lng:minLng , min_lat:minLat};
    if(!(point.lng >= maxAndMinLngLat.min_lng && point.lng <= maxAndMinLngLat.max_lng
        && point.lat >= maxAndMinLngLat.min_lat && point.lat <= maxAndMinLngLat.max_lat)){
        return false;
    }

    //下述代码来源：http://paulbourke.net/geometry/insidepoly/，进行了部分修改
    //基本思想是利用射线法，计算射线与多边形各边的交点，如果是偶数，则点在多边形外，否则
    //在多边形内。还会考虑一些特殊情况，如点在多边形顶点上，点在多边形边上等特殊情况。
    
    var N = pts.length;
    var boundOrVertex = true; //如果点位于多边形的顶点或边上，也算做点在多边形内，直接返回true
    var intersectCount = 0;//cross points count of x 
    var precision = 2e-10; //浮点类型计算时候与0比较时候的容差
    var p1, p2;//neighbour bound vertices
    var p = point; //测试点
    
    p1 = pts[0];//left vertex        
    for(var i = 1; i <= N; ++i){//check all rays            
        if(p.lng==p1.lng&&p.lat==p1.lat){
            return boundOrVertex;//p is an vertex
        }
        
        p2 = pts[i % N];//right vertex            
        if(p.lat < Math.min(p1.lat, p2.lat) || p.lat > Math.max(p1.lat, p2.lat)){//ray is outside of our interests                
            p1 = p2; 
            continue;//next ray left point
        }
        
        if(p.lat > Math.min(p1.lat, p2.lat) && p.lat < Math.max(p1.lat, p2.lat)){//ray is crossing over by the algorithm (common part of)
            if(p.lng <= Math.max(p1.lng, p2.lng)){//x is before of ray                    
                if(p1.lat == p2.lat && p.lng >= Math.min(p1.lng, p2.lng)){//overlies on a horizontal ray
                    return boundOrVertex;
                }
                
                if(p1.lng == p2.lng){//ray is vertical                        
                    if(p1.lng == p.lng){//overlies on a vertical ray
                        return boundOrVertex;
                    }else{//before ray
                        ++intersectCount;
                    } 
                }else{//cross point on the left side                        
                    var xinters = (p.lat - p1.lat) * (p2.lng - p1.lng) / (p2.lat - p1.lat) + p1.lng;//cross point of lng                        
                    if(Math.abs(p.lng - xinters) < precision){//overlies on a ray
                        return boundOrVertex;
                    }
                    
                    if(p.lng < xinters){//before ray
                        ++intersectCount;
                    } 
                }
            }
        }else{//special case when ray is crossing through the vertex                
            if(p.lat == p2.lat && p.lng <= p2.lng){//p crossing over p2                    
                var p3 = pts[(i+1) % N]; //next vertex                    
                if(p.lat >= Math.min(p1.lat, p3.lat) && p.lat <= Math.max(p1.lat, p3.lat)){//p.lat lies between p1.lat & p3.lat
                    ++intersectCount;
                }else{
                    intersectCount += 2;
                }
            }
        }            
        p1 = p2;//next ray left point
    }
    
    if(intersectCount % 2 == 0){//偶数在多边形外
        return false;
    } else { //奇数在多边形内
        return true;
    }            


function getMaxAndMinLatLng(PointArray){
    var resultArr = {};
    var maxLng = null;
    var maxLat = null;
    var minLng = null;
    var minLat = null;

    if(PointArray.length > 0){
        for(var i = 0; i < PointArray.length; i++){
            if(maxLng == null){
                maxLng = PointArray[i].lng;
            }
            if(maxLat == null){
                maxLat = PointArray[i].lat;
            }
            if(minLat == null){
                minLat = PointArray[i].lat;
            }
            if(minLng == null){
                minLng = PointArray[i].lng;
            }
            if(maxLat <  PointArray[i].lat){
                maxLat = PointArray[i].lat;
            }
            if(maxLng < PointArray[i].lng){
                maxLng = PointArray[i].lng;
            }
            if(minLat > PointArray[i].lat){
                minLat = PointArray[i].lat;
            }
            if(minLng > PointArray[i].lng){
                minLng = PointArray[i].lng;
            }
        }
        resultArr = {max_lng: maxLng, max_lat:maxLat ,min_lng:minLng , min_lat:minLat};
    }
    return resultArr;
}}

