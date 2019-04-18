//栅格号转经纬度
//level=10时len=1000000
//level=100时len=100000
function userComplainGridLngLat(gridNum, level,len) {
	
//	1）确定全省左下角经纬度为： Lon_o=109.75，Lat_o=20.2
//	2）确定地图级别n，我们固定500*500的栅格级别为n=5 
//	3）根据点的经纬度(lon,lat)计算经度刻度GridM和维度刻度GridN 
//	GridM = (int)(lon - Lon_o)/0.000972/5 +1000 +1 
//	GridN = (int)(lat - Lat_o)/0.000896/5+ 1000 + 1 
//	+1000是为了防止经纬度低于省原点的时候导致刻度出现负数 
//	+1是表示刻度从1开始 
//	4）整合栅格编号： 
//	GRIDNAME = ( GridM * 100000 + GridN).ToString("0000000000") 
//	GRIDNAME为栅格编号，后面的ToString("0000000000")表示编号的长度为10位数，不足的位数补0;

	gridNum = parseInt(gridNum);
    var lngNum = Math.floor(gridNum / len);
    var latNum = gridNum % len;
    var minLat = (latNum - 1001) * (0.00000896 * level) + 20.2;
    var minLng = (lngNum - 1001) * (0.00000972 * level) + 109.75;
    var midLat = minLat + (0.00000896 * level) / 2;
    var midLng = minLng + (0.00000972 * level) / 2;
    var maxLat = minLat + (0.00000896 * level);
    var maxLng = minLng + (0.00000972 * level);
    return [minLng, minLat, midLng, midLat, maxLng, maxLat];
}
//经纬度转栅格号
//level=10时len=1000000
//level=100时len=100000
function userComplainGridNum(longitude, latitude, level,len) {
//	Lon_o=109.75，Lat_o=20.2
//	GridM = (int)(lon - Lon_o)/0.000972/5 +1000 +1 
//	GridN = (int)(lat - Lat_o)/0.000896/5+ 1000 + 1 
//  GRIDNAME = ( GridM * 100000 + GridN).ToString("0000000000") 
//	GRIDNAME为栅格编号，后面的ToString("0000000000")表示编号的长度为10位数，不足的位数补0;

    var lngnum = Math.floor((longitude - 109.75) / (0.00000972 * level) + 1001);

    var latnum = Math.floor((latitude - 20.2) / (0.00000896 * level) + 1001);
    var gridnum = lngnum * len + latnum;
    var gridnumString = gridNumPadLeft(gridnum,10,"0");
    return gridnumString;
}

function userComplainGridLngNum(longitude,level){
	var lngnum = Math.floor((longitude - 109.75) / (0.00000972 * level) + 1001);
	return lngnum;
}

function userComplainGridLatNum(latitude,level){
	var latnum = Math.floor((latitude - 20.2) / (0.00000896 * level) + 1001);
	return latnum;
}


/**
 * 根据传入的字符串，后补足位数进行返回
 * @param char 需要补足位数的值
 * @param len 补足长度
 * @param padString 补足的字符串
 * @returns {String} 后补足位数后的字符串
 */
function gridNumPadRight(char,len, padString) {
    var s = char + '';
    return s + new Array(len - s.length + 1).join(padString,  '');
}

/**
 * 根据传入的字符串，往前补足位数进行返回
 * @param char 需要补足位数的值
 * @param len 补足长度
 * @param padString 补足的字符串
 * @returns {String} 前补足位数后的字符串
 */
function gridNumPadLeft(char,len, padString) {
	var s = char + '';
    return new Array(len - s.length + 1).join(padString,  '') + s;
}
