if(typeof NOCE === 'undefined'){ 
  NOCE = {};
}

/**********************************
 * @funcname polyLineDivide
 * @funcdesc 在折线上按指定距离等距地找出切分点
 * @param {Array} polyline (input) 折线，每个元素是一个点，每个点是一个对象{lng,lat},其中lng,lat分别代表经度和纬度，取值为小数
 * @param {number} distance (input) 切分的距离，单位米
 * @return {Array} 每个元素是一个点，每个点是一个对象{lng,lat}
 * @author 高智衡
 * @create 
 * @modifier 
 * @modify 
 ***********************************/
NOCE.polyLineDivide = function (polyline,distance){
	var d = distance;//下一个点的距离
	var res = []; //返回结果
	var p_s = polyline[0]; //开始点
	var p_e = {};  //结束点
	for (var i=0;i<polyline.length-1;i++){
		p_s = polyline[i]
		p_e = polyline[i+1]; //取下一个折点为结束点
		while(NOCE.Dist(p_s,p_e) > d) { //循环，直到余下距离不足以切分
		  var temp = NOCE.rayCut(p_s,p_e,d); //计算指定距离的点
		  res.push(temp); //放入结果集
		  p_s = temp; //调整开始点
		  d = distance;//重置下一个点的距离
		}
		d -= NOCE.Dist(p_s,p_e); //下一段的距离，需要减掉本段的余额
	}
    return res;
}

/**********************************
 * @funcname Dist
 * @funcdesc 计算A、B两位置间的距离
 * @param {object} A (input) 对象{lng,lat},其中lng,lat分别代表经度和纬度，取值为小数
 * @param {object} B (input) 对象{lng,lat},其中lng,lat分别代表经度和纬度，取值为小数
 * @return {Number} 距离（单位：米）
 * @author 高智衡
 * @create 
 * @modifier 
 * @modify 
 ***********************************/
NOCE.Dist = function (A,B){
  const LNG = 101.9724369*1000; //每经度代表的距离近似值（米）
  const LAT = 111.1949389*1000; //每纬度代表的距离近似值（米）
  
  //convert to distance coordinate
  var x1=A.lng*LNG;
  var y1=A.lat*LAT;
  var x2=B.lng*LNG;
  var y2=B.lat*LAT;
  return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}


/**********************************
 * @funcname rayCut
 * @funcdesc 在射线AB上，找出距离A点为distance的点
 * @param {object} A (input) 对象{lng,lat},其中lng,lat分别代表经度和纬度，取值为小数
 * @param {object} B (input) 对象{lng,lat},其中lng,lat分别代表经度和纬度，取值为小数
 * @param {number} distance (input) 切分的距离，单位米
 * @return {object} 每个元素是一个点，每个点是一个对象{lng,lat}
 * @author 高智衡
 * @create 
 * @modifier 
 * @modify 
 ***********************************/
NOCE.rayCut = function (A,B,distance){
//  const LNG = 101.9724369*1000; //每经度代表的距离近似值（米）
//  const LAT = 111.1949389*1000; //每纬度代表的距离近似值（米）

  //convert to distance coordinate
  var x1=A.lng;
  var y1=A.lat;
  var x2=B.lng;
  var y2=B.lat;
  
  var D = NOCE.Dist(A,B);
  var p={};
  p.lng = (x1 + (x2-x1)*distance/D );
  p.lat = (y1 + (y2-y1)*distance/D );
  //将两个点之间的夹角也一起返回
  p.angle = Math.round(360 - NOCE.calculationAngle(A,B));
  return p;
}

/**********************************
 * @funcname calculationAngle
 * @funcdesc 在射线AB上计算方向角
 * @param {object} startXY (input) 对象{lng,lat},其中lng,lat分别代表经度和纬度，取值为小数
 * @param {object} endXY (input) 对象{lng,lat},其中lng,lat分别代表经度和纬度，取值为小数
 * @return {num} 射线的角度（得到的角度是以正南为正方向，逆时针旋转的角度）
 * @author 梁杰禹
 * @create 
 * @modifier 
 * @modify 
 ***********************************/
NOCE.calculationAngle = function calculationAngle(startXY, endXY){
	var pe = new BMap.Pixel(endXY.lng-startXY.lng,endXY.lat-startXY.lat);
	var a = Math.atan(Math.abs(pe.y)/Math.abs(pe.x));
	var b = a*180/Math.PI;

	if (pe.x==0&&pe.y<0) {
		b = 0;
	}else if (pe.x==0&&pe.y>0) {
		b = 180;
	}else if (pe.x>0&&pe.y==0) {
		b = 90;
	}else if (pe.x<0&&pe.y==0) {
		b =270;
	}else if (pe.x>0&&pe.y<0) {
		b = 90-b;
	}else if (pe.x>0&&pe.y>0) {
		b = b+90;
	}else if (pe.x<0&&pe.y>0) {
		b = 270-b;
	}else if (pe.x<0&&pe.y<0) {
		b = 270+b;
	}
	return b;
}

/*

var A={};
A.lng = 113.383333;
A.lat = 23.073115;
var B={};
B.lng = 113.386423;
B.lat = 23.069956;
var C={};
C.lng = 113.380834;
C.lat = 23.06639;
var D={};
D.lng = 113.376234;
D.lat = 23.0624;

var pl = [A,B,C,D];

var c =NOCE.rayCut(A,B,200);
*/