/**
 *号码验证
 */
var validateUtil = {};

/**
 * 验证号码是否需要添加86并通过服务器加密返回密文
 */
validateUtil.validateNum = function(number){
	if(typeof(number) == "undefined" || number == "undefined" || number == ""){
		alert("输入的参数不能为空!");
		return ;
	}
	var reg = /^((13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])|(86(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])))\d{8}$/;
	if (reg.test(number) ) {
		var reg1 = /^(86)\d*$/;
		if (!reg1.test(number)) {
			number = "86" + number;
		}
	}
	var validateParam={
			"param":number
	}
	return validateUtil.encryptionMD5(validateParam);  
}

/**
 * 通过服务器加密返回密文
 */
validateUtil.encryptionMD5 = function(param){
	//提交请求
	 var encryption = "";
	 $.ajax({
       async: false,//默认true为异步，false为同步
       data: param,
       url: "pages_validateUtil_validateUtil_getMD5EncryptionKey.action",
       dataType: "json",
       success: function(data){
       	encryption = data;
       }
	 });
	 return encryption;	
}
