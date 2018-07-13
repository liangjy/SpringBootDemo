var multiTabPages = {};
multiTabPages.splitT = "@";
//直接根据key设置值，新增id
//对localStorage中追加，先取到该key的字符串，如果为空则在value的前后都增加@，否则在value后增加@再放入到该key中
multiTabPages.setItem = function(key,value){
	var keyStr = localStorage.getItem(key);
	if(keyStr == ""||keyStr==null){
		keyStr = multiTabPages.splitT+value+multiTabPages.splitT;
	}else{
		keyStr += value+multiTabPages.splitT;
	}
	console.log("keyStr========"+keyStr);
	localStorage.setItem(key,keyStr);
};
//没有该id，返回false，否则返回true
multiTabPages.isHasId = function(id){
	var openIdStr = localStorage.getItem("openIdStr");
	if(openIdStr==null){
		return false;
	}
	//没有该id，返回false
	if(openIdStr.indexOf(multiTabPages.splitT+id+multiTabPages.splitT)==-1){
		return false;
	}else{
		return true;
	}
};
//根据key值取得localStorage中的value，如果为null则返回空数组，否则返回分割后的数组
multiTabPages.getItem = function(key){
	var returnArr = [];
	var openIdStr = localStorage.getItem(key)==null?"":localStorage.getItem(key);
	if(openIdStr==""){
		return returnArr;
	}else{
		var openIdArr = openIdStr.split(multiTabPages.splitT);
		for(var i=0;i<openIdArr.length;i++){
			if(openIdArr[i]!=""){
				returnArr.push(openIdArr[i]);
			}
		}
		return returnArr;
	}
	
};
//对openIdStr进行初始化设置，设置为"@"
multiTabPages.initMultiTabPagesItem = function(key){
	localStorage.setItem(key,multiTabPages.splitT);
};

//进行移除的方法，删除id
multiTabPages.removeItem = function(key,id){
	var openIdStr = localStorage.getItem(key)==null?"":localStorage.getItem(key);
	if(openIdStr.indexOf(multiTabPages.splitT+id+multiTabPages.splitT)>-1){
		var openIdNewStr = openIdStr.replace((id+multiTabPages.splitT),"");
		localStorage.setItem(key,openIdNewStr);
	}
};