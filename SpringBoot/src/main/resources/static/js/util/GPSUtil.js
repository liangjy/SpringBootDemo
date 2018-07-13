var GPSUtil = {
	pi:3.1415926535897932384626,
	x_pi:3.14159265358979324 * 3000.0 / 180.0,
	a:6378245.0,
	ee:0.00669342162296594323
}

GPSUtil.transformLat = function(x, y) {
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y
            + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * GPSUtil.pi) + 20.0 * Math.sin(2.0 * x * GPSUtil.pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * GPSUtil.pi) + 40.0 * Math.sin(y / 3.0 * GPSUtil.pi)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * GPSUtil.pi) + 320 * Math.sin(y * GPSUtil.pi / 30.0)) * 2.0 / 3.0;
    return ret;
}

GPSUtil.transformLon = function (x, y) {
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1
            * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * GPSUtil.pi) + 20.0 * Math.sin(2.0 * x * GPSUtil.pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * GPSUtil.pi) + 40.0 * Math.sin(x / 3.0 * GPSUtil.pi)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * GPSUtil.pi) + 300.0 * Math.sin(x / 30.0
            * GPSUtil.pi)) * 2.0 / 3.0;
    return ret;
}

GPSUtil.transform = function (lat, lon) {
    if (GPSUtil.outOfChina(lat, lon)) {
        return [lat, lon];
    }
    var dLat = GPSUtil.transformLat(lon - 105.0, lat - 35.0);
    var dLon = GPSUtil.transformLon(lon - 105.0, lat - 35.0);
    var radLat = lat / 180.0 * GPSUtil.pi;
    var magic = Math.sin(radLat);
    magic = 1 - GPSUtil.ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((GPSUtil.a * (1 - GPSUtil.ee)) / (magic * sqrtMagic) * GPSUtil.pi);
    dLon = (dLon * 180.0) / (GPSUtil.a / sqrtMagic * Math.cos(radLat) * GPSUtil.pi);
    var mgLat = lat + dLat;
    var mgLon = lon + dLon;
    return [mgLat, mgLon];
}

GPSUtil.outOfChina = function (lat, lon) {
    if (lon < 72.004 || lon > 137.8347)
        return true;
    if (lat < 0.8293 || lat > 55.8271)
        return true;
    return false;
}


/**
 * 84 to 火星坐标系 (GCJ-02) World Geodetic System ==> Mars Geodetic System
 *
 * @param lat
 * @param lon
 * @return
 */
GPSUtil.gps84_To_Gcj02 = function (lat, lon) {
    if (GPSUtil.outOfChina(lat, lon)) {
        return [lat, lon];
    }
    var dLat = GPSUtil.transformLat(lon - 105.0, lat - 35.0);
    var dLon = GPSUtil.transformLon(lon - 105.0, lat - 35.0);
    var radLat = lat / 180.0 * GPSUtil.pi;
    var magic = Math.sin(radLat);
    magic = 1 - GPSUtil.ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((GPSUtil.a * (1 - GPSUtil.ee)) / (magic * sqrtMagic) * GPSUtil.pi);
    dLon = (dLon * 180.0) / (GPSUtil.a / sqrtMagic * Math.cos(radLat) * GPSUtil.pi);
    var mgLat = lat + dLat;
    var mgLon = lon + dLon;
    return [mgLat, mgLon];
}

/**
 * * 火星坐标系 (GCJ-02) to 84 * * @param lon * @param lat * @return
 */
GPSUtil.gcj02_To_Gps84 = function (lat, lon) {
    var gps = GPSUtil.transform(lat, lon);
    var lontitude = lon * 2 - gps[1];
    var latitude = lat * 2 - gps[0];
    return [latitude, lontitude];
}

/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 将 GCJ-02 坐标转换成 BD-09 坐标
 *
 * @param lat
 * @param lon
 */
GPSUtil.gcj02_To_Bd09 = function (lat, lon) {
    var x = lon, y = lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * GPSUtil.x_pi);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * GPSUtil.x_pi);
    var tempLon = z * Math.cos(theta) + 0.0065;
    var tempLat = z * Math.sin(theta) + 0.006;
    var gps = [tempLat, tempLon];
    return gps;
}

/**
 * * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 * * 将 BD-09 坐标转换成GCJ-02 坐标 * * @param
 * bd_lat * @param bd_lon * @return
 */
GPSUtil.bd09_To_Gcj02 = function (lat, lon) {
    var x = lon - 0.0065, y = lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * GPSUtil.x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * GPSUtil.x_pi);
    var tempLon = z * Math.cos(theta);
    var tempLat = z * Math.sin(theta);
    var gps = [tempLat, tempLon];
    return gps;
}

/**
 * 将gps84转为bd09
 * 使用此方法
 * @param lat
 * @param lon
 * @return
 */
GPSUtil.gps84_To_bd09 = function (lat, lon) {
    var gcj02 = GPSUtil.gps84_To_Gcj02(lat, lon);
    var bd09 = GPSUtil.gcj02_To_Bd09(gcj02[0], gcj02[1]);
    bd09[0] = parseFloat(bd09[0]).toFixed(6);
    bd09[1] = parseFloat(bd09[1]).toFixed(6);
    return bd09;
}

/**
 * 百度转gps经纬度
 * @param lat
 * @param lon
 * @return [lat,lng]
 */
GPSUtil.bd09_To_gps84 = function (lat, lon) {
    var gcj02 = GPSUtil.bd09_To_Gcj02(lat, lon);
    var gps84 = GPSUtil.gcj02_To_Gps84(gcj02[0], gcj02[1]);
    //保留小数点后六位
    gps84[0] = parseFloat(gps84[0]).toFixed(6);
    gps84[1] = parseFloat(gps84[1]).toFixed(6);
    return gps84;
}