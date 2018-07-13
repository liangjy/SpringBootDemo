/**
 * 工程工具JS，存放公用方法
 */
var noceUtil = {};
//定义noce
var noce = {};

noceUtil.districtGisDataVersion = "20180712";


/**
 * 根据地市获取city_id 表（dim_tele_city）
 */
noceUtil.city_LATN_ID={
		"广东":"1000",
		"广州":"200",
		"汕尾":"660",
		"阳江":"662",
		"揭阳":"663",
		"茂名":"668",
		"江门":"750",
		"韶关":"751",
		"惠州":"752",
		"梅州":"753",
		"汕头":"754",
		"深圳":"755",
		"珠海":"756",
		"佛山":"757",
		"肇庆":"758",
		"湛江":"759",
		"中山":"760",
		"河源":"762",
		"清远":"763",
		"云浮":"766",
		"潮州":"768",
		"东莞":"769",
		"未知":"0"
};



/**
 * 根据地市获取city_id 表（dim_tele_city）
 */
noceUtil.LATN_ID_city={
		"1000":"广东",
		"200":"广州",
		"660":"汕尾",
		"662":"阳江",
		"663":"揭阳",
		"668":"茂名",
		"750":"江门",
		"751":"韶关",
		"752":"惠州",
		"753":"梅州",
		"754":"汕头",
		"755":"深圳",
		"756":"珠海",
		"757":"佛山",
		"758":"肇庆",
		"759":"湛江",
		"760":"中山",
		"762":"河源",
		"763":"清远",
		"766":"云浮",
		"768":"潮州",
		"769":"东莞",
		"0":"未知"
};

/**
 * 判断对象是否为undefined
 * @param obj object
 * @return boolean
 */
noceUtil.isUndefined = function(obj){
	if("undefined"==typeof(obj)||obj==""||obj==null){
		return true;
	}else{
		return false;
	}
};
/**
 * 将json转为ajax url json格式。。
 * @param objectName string 转换成的对象名
 * @param jsonData json json数据
 * @return string  url?parm1=value1&parm2 = value2...
 */
noceUtil.JsonToObject = function (objectName,jsonData){
	if(noceUtil.isUndefined(jsonData)){
		console.log("noceUtil.JsonToObject参数不完整");
		return "";
	}
	var objectStr = "";
        for(var key in jsonData){  
        	objectStr=objectStr+objectName+"."+key+"="+jsonData[key]+"&"
        }
        return objectStr.substring(0,objectStr.length-1);
};
/**
 * 时间转换
 * @param date YYYYMMDD hhmmss
 * @return string  YYYY-MM-DD hh：mm：ss
 */
noceUtil.parseDate = function (date){
	date=""+date;
	var dareStr = "";
	date = date.replace(/[^0-9]/g, ""); 
	var l = date.length;
	if(l<4||l%2!=0){
		return 0;
	}
	l>14?date = date.substring(0,14):date = date;
	if(date.length>0){
		dareStr = date.substring(0,4);
	}
	if(date.length>4){
		dareStr = dareStr+"-"+date.substring(4,6);
	}
	if(date.length>6){
		dareStr = dareStr+"-"+date.substring(6,8);
	}
	if(date.length>8){
		dareStr = dareStr+" "+date.substring(8,10);
	}
	if(date.length>10){
		dareStr = dareStr+":"+date.substring(10,12);
	}
	if(date.length>12){
		dareStr = dareStr+":"+date.substring(12,14);
	}
	return dareStr;
}
/**
 * 获取7天后的日期
 * @param year 
 * @param month 
 * @param day 
 * @return string YYYY-MM-DD
 */
noceUtil.getSevenDayLater = function(year,month,day){
	var date = new Date();
	date.setFullYear(year,(month-1),day);
	var date2 = new Date(date);
	date2.setDate(date.getDate()+6);
	var date3 = noceUtil.parseLocalDate(date2.getFullYear(),date2.getMonth()-(-1),date2.getDate(),"-");
	return date3;
};
/**
 * 时间没有12月，只有0月bug
 * @param connectStr 连接符
 * @return string
 */
noceUtil.parseLocalDate = function(year,month,day,connectStr){
	if(month=='00'){
		year = year-1;
		month = "12";
	}
	return year+connectStr+noceUtil.fomatMD(month)+connectStr+noceUtil.fomatMD(day);
};
/**
 * 补齐时间格式，月和日
 * @param value
 * @returns string  MM||DD
 */
noceUtil.fomatMD = function(value){
	value = ""+value;
	if(value.length<2){
		value = "0"+value;
	}
	return value;	
};

/**
 * 获取当前时间的年月日
 * YYYYMMDD 20170119
 */
noceUtil.getCurYYYYMMDD = function(){
	var myDate = new Date();
	var curYear = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
	var curMonth = noceUtil.fomatMD(myDate.getMonth()+1);       //获取当前月份(0-11,0代表1月)+1
	var curDay = noceUtil.fomatMD(myDate.getDate());        //获取当前日(1-31)	
	return curYear+curMonth+curDay;
};

/**
 * 输出文件
 * 创建一个隐藏表单触发
 * @param url 下载路径
 * @param objectName 接受对象名
 * @param condition 条件
 */
noceUtil.outputAsFile = function (url,objectName,condition){
	if(typeof(objectName)!="undefined"||typeof(condition)!="undefined"){
		url = url+"?"+noceUtil.JsonToObject(objectName,condition);
	}
	var form = $("<form>");   //定义一个form表单
    form.attr('style', 'display:none');   //在form表单中添加查询参数
    form.attr('target', '');
    form.attr('method', 'post');
    form.attr('action', url);
    $('body').append(form);  //将表单放置在web中
    form.submit();
    form.remove();
};
/**
 * 整数验证
 * @param num 
 * @returns boolean
 */
noceUtil.integerValidat = function(num){
	var r = /^[0-9]*[1-9][0-9]*$/;
	if (typeof(num)!="undefined"&&r.test(num)) {
		return true;
	} else {
		return false;
	}
};
/**
 * 带小数类型数据保留两位小数，整数和字符串无变化
 * @param number 
 * @param times 倍数默认1
 * @param decimals 浮点数 默认2
 */
noceUtil.fix2 = function (number){
	var strNum = number.toString();
	if(typeof(number)!="undefined"&&strNum.indexOf(".")>-1){
//	小数
			number = number*100;
			return number.toFixed(2);  
	}
//	非小数
	return number;
};
//相除去百分比
noceUtil.numToPrecent = function (num,num2){
	if(typeof(num)=="undefined"||typeof(num2)=="undefined"||num==0||num2==0){
		return 0;
	}else{
		return Number((num*100/num2).toFixed(2));  
	}
};
/**
 * 带小数类型数据保留两位小数，整数和字符串无变化
 * @param number 
 * @param times 倍数默认1
 * @param decimals 浮点数 默认2
 */
noceUtil.fixL2 = function (number){
	var reg = /^-?\d+\.\d+$/;
	var reg2 = /^-?\d+\.\d+e-\d$/;
	if(typeof(number)!="undefined"&&reg.test(number)){
//	小数
		return (number-0).toFixed(2);  
	}else if(typeof(number)!="undefined"&&reg2.test(number)){
		return "0.00";  
	}
//	非小数
	return number;
};

/**
 * 截取2位小数，不做四舍五入计算，如果是整数或1位小数，缺的位置加个0，补齐为2位小数
 */
noceUtil.toDecimal2 = function(num){
	var reg1 = /^-?\d+\.\d{1}$/;
	var reg2 = /^-?\d+\.\d*$/;
	if(reg1.test(num)){
		num = num+"0";
	}else if(!reg2.test(num)){
		num = num+".00";
	}else{
		num = num+"";
		var index = num.indexOf(".");
		num = num.substr(0,index+3); 
	}
	return num;
 };

/**
 * '广东'转为'全省'
 * @param cityName 地市名
 */
noceUtil.transToProvice = function (cityName){
	if(cityName.indexOf("广东")>-1){
		return "全省";  
	}
	return cityName;
};
/**
 *数据加载界面条件显示
 *obj 父对象
 *condition key ID ,value   
 */
noceUtil.displayConditions = function (obj,condition){
	obj = $(obj);
	$.each(condition,function(key,value){
		obj.find("span[id='"+key+"']").html(value);
	});
};
//判断数据是否为空
 noceUtil.comIsNull = function(value){
	if(typeof(value)=="undefined"||value=="undefined"||value==""){
		return true;
	}
	return false;
};
//判断集合或数组是否为空
noceUtil.ArrayIsNull = function(value){
	if(typeof(value)=="undefined"||value=="undefined"||value==null||value.length<1){
		return true;
	}
	return false;
};

 /**
  * 获取7天后的时间
  */
 noceUtil.getSenvenDayLater = function(year,month,day){
	 var date = new Date();
	 date.setFullYear(year,month+1,day);
	 var date2 = new Date(date);
	 date2.setDate(date.getDate()+6);
 };
 /**
  * 比较时间大小
  */
 noceUtil.compareDate = function(startTime,endTime){
	 if(startTime.length<15){
		 startTime = startTime+":00";
		 endTime = endTime+":00";
	 }
	var   d1   = new  Date(startTime.replace(/\-/g, "\/"));
	var   d2   = new  Date(endTime.replace(/\-/g, "\/"));
	if(d1-d2>0){
		return false;
	}else{
		return true;
	}
 };
 
 /**
  * 判断2个时间之间是否相隔x天
  * 传入的时间格式是否为：YYYY-MM-DD?
  */
noceUtil.compareDateToXDay = function(startTime,endTime,x){
	 var d1 = new Date(startTime.replace(/[^\/\d]+/g,"/")+",0:0:0");
	 var d2 = new Date(endTime.replace(/[^\/\d]+/g,"/")+",0:0:0");
	 d1.setDate(d1.getDate()+x);
	if(d2 > d1){
		return true;
	}else{
		return false;
	}
 };
 
 /**
  * 判断2个时间之间是否相隔x天
  * startTime：YYYYMMDD开始时间
  * endTime：YYYYMMDD结束时间
  * x:相隔天数
  */
noceUtil.compareDateIsSeparatedXDay = function(startTime,endTime,x){
	if(isNaN(startTime)||isNaN(endTime)||isNaN(x)){
		alert("传入的参数有不全为数字的参数");
		return;
	}
	if(startTime.length!=8||endTime.length!=8){
		alert("请检查传入的时间是否为YYYYMMDD的格式");
		return;
	}
	 var d1 = new Date(startTime.substring(0,4),startTime.substring(4,6),startTime.substring(6));
	 var d2 = new Date(endTime.substring(0,4),endTime.substring(4,6),endTime.substring(6));
	 if(d1.getTime()>d2.getTime()+1000*60*60*24*x){
		 return true;
	 }else{
		 return false;
	 }
//	 myDate.getTime()
//	 d1.setDate(d1.getDate()+x);
//	if(d2 > d1){
//		return true;
//	}else{
//		return false;
//	}
 };
 
 /**
  * 获取2个小时之间相隔x个小时
  * startHour : 2016110100
  * endHour : 2016110123
  * return : 24
  */
noceUtil.intervalHour = function(startHour,endHour){
	//计算相差的小时
		var date1 = new Date(); 
		var date2 = new Date();
		
		date1.setFullYear(startHour.substr(0, 4), startHour.substr(4, 2), startHour.substr(6, 2));
		date2.setFullYear(endHour.substr(0, 4), endHour.substr(4, 2), endHour.substr(6, 2));
		date1.setHours(startHour.substr(8, 2));
		date2.setHours(endHour.substr(8, 2));
		var subDay = (date2.getTime() - date1.getTime())/(60*60*1000);
		subDay = parseInt(subDay, 10)+1;
		return subDay;
 };
 
 /**
  * 获取当前时间
  * YYYY-MM
  */
 noceUtil.currentMonth = function(){
	 var date=new Date;
	 var year=date.getFullYear(); 
	 var month=date.getMonth()+1;
	 month =(month<10 ? "0"+month:month); 
	return  year+"-"+month;
 };
 
/**
 * 获取字符串的Unicode编码的长度
 */
 noceUtil.getStringByUnicodeLength = function(str){
	 var strlen = 0;
	 for(var j = 0;j < str.length; j++){
		 if(str.charCodeAt(j) > 255){
			 strlen += 2; //如果是汉字，则字符串长度加2
		 }else {
			 strlen++;
		 } 
	 }
	 return strlen;
 };
 
 /**
  * 获取http请求的URL参数
  */
 noceUtil.GetQueryString = function(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null)
    	  return  unescape(decodeURI(r[2])); 
      
      return null;
 };

 /**
  * 把数字123456转换成12,3456
  */
 noceUtil.replaceNum = function(num){
	var numStr = num.toString();
 	var x = 0;
	var str = "";
	for(var i = numStr.length - 1; i >= 0; i--){
		x++;
		var char = numStr.charAt(i);
		str = char+str;
		if(x % 4 == 0 && i > 0){
			str = ","+str;
		}  		
	}
	return str;
 };