/**
 * 自定义弹窗
 * @author fangy
 *
 */
/*
 * ajax查询出错
 */
noce.errorMsg = function(message){
	var head= message.split("||")[0];
    var message2= "";
	if(message == 'session超时'){
        head="session超时";
        // $("body").html("<div style=\"font-size:12px;text-align:center;\">没有权限访问 <a href=\"javascript:history.back();\">返回</a></div>");
        location.reload();
	}else if(head!="获取业务数据失败"&&head!="获取元数据失败"){
		head="系统数据缺失";
        message2=message.split("||")[1];
        message2 = (message2==null || message2=="" || typeof(message2)=="undefined")? "系统数据缺失":message2;

        var $ajaxErrorDialog = $("#ajaxErrorDialog");
//	关闭弹窗
        var list = art.dialog.list;
        for (var i in list) {
            list[i].close();
        };
        $ajaxErrorDialog.find('div').html(message2).hide();
        $ajaxErrorDialog.find('span').html(head+"&nbsp;&nbsp;");
        $ajaxErrorDialog.find("a").click(function(){
//		关闭弹窗
            var list = art.dialog.list;
            for (var i in list) {
                list[i].close();
            };
//		打开弹窗
            $ajaxErrorDialog.find("div").show();
            art.dialog({
                lock: true,
                width: '200px',
                content: document.getElementById('ajaxErrorDialog'),
            });
        });
//	错误提示
        art.dialog({
            lock: true,
            width: '200px',
            content: document.getElementById('ajaxErrorDialog'),
        });
	}
	


}
/*
 * ajax查询无数据 提示
 */
noce.noDataMsg = function(message){
	message = (message==null || message=="" || typeof(message)=="undefined")? "暂无数据":message;
	var $ajaxNoDataDialog = $("#ajaxNoDataDialog");
	$ajaxNoDataDialog.find('span').html(message);
//	关闭弹窗
	var list = art.dialog.list;
	for (var i in list) {
		list[i].close();
	};
//	错误提示
	art.dialog({
		lock: true,
		  width: '200px',
		  content: document.getElementById('ajaxNoDataDialog'),
	  });
}

$(function(){
	$("#app").click(function(){
//		noce.errorMsg();
//		noce.noDataMsg();
	});
})