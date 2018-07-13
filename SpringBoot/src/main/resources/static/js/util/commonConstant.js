var getIpAndPort_common;

$(function(){
	//配置覆盖的ip和port
	if(getIpAndPort_common!=""){
		getIpAndPort_common=$("#getIpAndPort_common").val();
	}else{
		getIpAndPort_common="http://132.96.133.6:8012/Modules/CloudMap/GridMap.html?viewkey=";
	}
});