var staticPassword = null;
var verifiState=1;
var inter=null;
var time=120;
var countdown = 120;
var iCount;
document.onkeydown = keyDownSearch;
//var responseCode=[[${responseCode}]]; // 获取值，在jsp中的写法为<%=request.getAttribute("responseCode")%>;
//console.log("responseCode:"+responseCode)
//var fromUserName=[[${fromUserName}]]; // <%=request.getAttribute("fromUserName")%>;
// 切换认证模式
function authentication(option) {
    if ("0" == option) {
        staticPassword = $("#verification").val();
        $("#timing").show();
        $("#staticPassword").hide();
        $("#verification").val("请输入验证码");
        if ($("#timing").val() == "发送短信") {
            $("#verification").attr("readonly", true);
        }
        $("#usertype").attr("value", "0");
    } else if ("1" == option) {
        $("#timing").hide();
        var password = $("#staticPassword").attr("class");
        if (password == null) {
            loadStaticPassword();
        }
        $("#staticPassword").show();
        $("#verification").attr("readonly", false);
        if (staticPassword != null) {
            $("#verification").val(staticPassword);
        }
    }
}

// 获取静态密码
function loadStaticPassword() {
    $("img").remove(".staticPassword");
    return ;//先不执行请求
    var url = "/portal/pages_index_Index_generateVerifyCode.action";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = "blob";
    xhr.setRequestHeader("client_type", "DESKTOP_WEB");
    xhr.onload = function () {
        if (this.status == 200) {
            var blob = this.response;
            var img = document.createElement("img");
            img.onload = function (e) {
                window.URL.revokeObjectURL(img.src);
            };
            img.src = window.URL.createObjectURL(blob);
            $(img).addClass("staticPassword");
            $(img).attr("id", "staticPassword");
            $(img).attr("alt", "静态密码");
            $(img).attr("title", "看不清，换一张");
            $(img).click(function () {
                loadStaticPassword();
            });
            $("#verifyCode").append(img);
            $("#usertype").attr("value", "2");
        }
    };
    xhr.send();
}

// 清空静态密码输入框的提示
function emptyValue(verification) {
    var value = $("input[name='loginOption']:checked").val();
    if ("password" == value) {
        $(verification).val("");
    }
}

// 计时器
function timer() {
    if (countdown == 0) {
        $("#timing").css("disabled", "disabled");
        $("#timing").val("获取验证码");
        $("#step").val("login");
        clearInterval(iCount);
        $("#col").html("<img src='/images/icon_warn.png' style='display:inline;'/> 验证码超时，请重新发送短信！");
        $("#col").show();
        $("#verification").attr("readonly", true);
        $("#verification").attr("value", "请输入验证码");
        $("#verification").css("background-color", "#C0C0C0");
        $("#usertype").attr("value", "0");
        countdown = 120;
        return;
    } else {
        $("#timing").css("disabled", "");
        $("#timing").val("重新发送(" + countdown + ")");
        countdown--;
    }

}


// 短信发送验证
function verifi() {
    if(verifiState!=1){
     	return;
    }
    $("#col").hide();
    countDownFc();
    if ($("#loginForm").validationEngine('validate')) {
        var username = $("#username").val();
        var paswd = $("#dispasswd").val();
        var accType = $('input:radio[name="accType"]:checked').val();
        if (accType != 1) {
            paswd = hex_md5(paswd);
        }
        $("#password").val(paswd);
        
        return;//先不执行请求
        $.ajax({
            type: 'POST',
            url: '/portal/pages_index_Index_smsVerifi.action',
            data: {username: username, password: paswd, accType: accType},
            dataType: 'json',
            success: function (data) {
                var loginFaileText = null;
                if(data[0].responseCode==1){
                	$('.editPsdModal').show();
                	 $('#TextVal').html('密码为初始密码或已过期，请修改密码！');
                }
                if (data[0].loginFaile != null && data[0].loginFaile.indexOf("过期") != -1) {
                    loginFaileText = "您的密码已过期，请登录www.gdoss.com并更新密码，然后再登录本系统。不便之处，敬请谅解！";
                } else {
                    loginFaileText = data[0].loginFaile;
                }

                if (data[0].isValidate != 1) {
                    $("#col").html("<img src='/images/icon_warn.png' style='display:inline;'/>" + loginFaileText);
                    $("#col").show();
                      clearInterval(inter);
				 	  $('#timing').css("backgroundColor","#6accf1");
				 	  $('#timing').html("发送短信");
				 	  verifiState=1;
				 	  time=120;
                } else if (data[0].isValidate == 1) {
                    $("#usertype").attr("value", "1");
                    $("#verification").attr("readonly", false);
                    $("#verification").attr("value", "");
                    $("#verification").css("background-color", "");
                    $("#verification").focus();
                    iCount = setInterval(timer, 1000);
                }
            }
        });
    }
}

function keyDownSearch(e) {
    // 兼容FF和IE和Opera
    var theEvent = e || window.event;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        theEvent.code = 9;
        login();// 具体处理函数
        return false;
    }
    return true;
}

$(function () {
    
});

function login() {
    // 用户进行登录时，将localStorage中打开标签页的字符串置为空
    localStorage.setItem("openIdStr", "@");
    localStorage.setItem("logOut", "0");// 登录时设置为0，退出时设为1
    if ($("#loginForm").validationEngine('validate')) {
        var paswd = $("#dispasswd").val();
        var accType = $('input:radio[name="accType"]:checked').val();
        if (accType != 1) {
            paswd = hex_md5(paswd);
        }
        $("#password").val(paswd);
        $("#loginForm").submit();
    }
};

$(function () {
	$("#loginForm").validationEngine({
        "promptPosition": "inline",
        autoHidePrompt: true,
        scroll: false,
        autoPositionUpdate: true
    });
    $("form[name='loginForm'] input").keypress(function (e) {
        if (e.which == 13) {// 判断所按是否回车键
            var inputs = $("form[name='loginForm']").find("input"); // 获取表单中的所有输入框
            var idx = inputs.index(this); // 获取当前焦点输入框所处的位置
            if (idx == inputs.length - 1) {// 判断是否是最后一个输入框
                login();
            } else {
                inputs[idx + 1].focus(); // 设置焦点
                inputs[idx + 1].select(); // 选中文字
            }
            return false;// 取消默认的提交行为
        }
    });
    $("input:text:visible:first").focus();
    
    
    //var isFlag = [[${loginFaile}]];//'<%=loginFaile%>';

    if (isFlag != null && isFlag.indexOf("静态密码") > -1) {
        $("input[name='loginOption']:eq(1)").attr("checked", "checked");
        authentication(1);
    }

    if (isFlag != "null" || $("#flagregion").val() == "") {
        $("#col").show();
    } else {
        $("#col").hide();
    }

    if ($("#logining").val().indexOf(":") > -1) {
        firm();
    }
});

function firm() {
    // 利用对话框返回的值 （true 或者 false）
    if (confirm("账号已登录，是否强制登录？")) {
        console.log("true");
        var infor = $("#logining").val().split(":");
        $("#forceFlag").val("forceFlag");
        $("#username").val(infor[0]);
        $("#password").val(infor[1]);
        if(infor[2]==0){
        	 $('input:radio[name="accType"]').eq(1).attr("checked","checked");
        }
      	else{
       		$('input:radio[name="accType"]').eq(0).attr("checked","checked");
        }
        $("#loginForm").submit();
    }
    else {
        console.log("false");
//        location.href = "pages_index_Index_home.action";
    }
};
    
function countDownFc(){
  $('#timing').css("backgroundColor","#818181");
  verifiState=0;
  $('#timing').html(time);
  inter= setInterval(function (){
 	  $('#timing').html(time);
  time--;
  if(time==0){
   clearInterval(inter);
   $('#timing').css("backgroundColor","#6accf1");
   $('#timing').html("发送短信");
 	   verifiState=1;
 	   time=120;
 	  }
   },1000);
}
// 修改密码
$(function(){
	if(responseCode=="1"){
		$('.editPsdModal').show();
		$('#TextVal').html('密码为初始密码或已过期，请修改密码！');
	}
	$('.closeImg').click(function(){
		$('.editPsdModal').hide();
	});
})

$('#submit_1').click(function(){
	var oldPwd=$('#oldPwd').val().trim();// 旧密码
	var newPwd=$('#newPwd').val().trim();// 新密码
	var surePwd=$('#surePwd').val().trim();// 确认密码
	var username=$('#username').val().trim();// 用户名
	if(oldPwd==''||oldPwd==null||oldPwd==undefined){
		$('#TextVal').html('请输入原始密码！');
		return;
	}
	if(newPwd==''||newPwd==null||newPwd==undefined){
		$('#TextVal').html('请输入新密码！');
		return;
	}
	if(surePwd==''||surePwd==null||surePwd==undefined){
		$('#TextVal').html('请输入确认密码！');
		return;
	}
	if(surePwd!=newPwd){
		$('#TextVal').html('新密码和旧密码不一致！');
		return;
	}
	
	return;//先不执行请求
	$.ajax({
	    type: 'POST',
	    url: '/portal/pages_index_Index_changePwd.action',
	    data: {oldPwd: oldPwd,newPwd:newPwd,username:username},
	    dataType: 'json',
	    success: function (data) {
	    	if(data[0].resetCode==0){
	    		// 修改成功
	    		$('#TextVal').html(data[0].resetRemark);
	    	}else{
	    		$('#TextVal').html(data[0].resetRemark);
	        	}
	        	console.log(data);
	        }
	  });
});