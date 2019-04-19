var defualtMeunConfig = {
// "专题分析" : "top100HotspotTendency"
};// key:value

defualtMeunConfig.appId = "";// 应用id
defualtMeunConfig.id_path = "";//点击目录树进行跳转：new；点击左上角一级菜单进行跳转：first；
defualtMeunConfig.index = 0;//点击头部栏公告要用到，但是现在头部公告已被隐藏
defualtMeunConfig.menuId = "";//左上角一级菜单的id
defualtMeunConfig.perId = "";//左下角菜单对应的id
defualtMeunConfig.menuArray = [];
//点击一级菜单需要跳转的二级菜单路径
defualtMeunConfig.menuProperties={
    "456":472,
    "242":485,
    "252":400,
    "334":494,
    "343":454,
    "346":444,
    "185":186,
	"482":480
};
var isContains = false;
$(function() {
	defualtMeunConfig.appId = $('#currentAppId').val();
	defualtMeunConfig.menuId = $('#currentAppMenuId').val();
    defualtMeunConfig.perId = $('#currentPerId').val();

	var appId = noceUtil.GetQueryString("appId");
//	var index = noceUtil.GetQueryString("munIndex");
	var menuId = noceUtil.GetQueryString("menuId");
	var perId = noceUtil.GetQueryString("perId");
	var id_path = noceUtil.GetQueryString("id_path");

	// id_url存在或appId和默认应用的appId不同,就把id_url赋值给defualtMeunConfig.id_url
	if (!noceUtil.isUndefined(id_path)
			|| (!noceUtil.isUndefined(appId) && defualtMeunConfig.appId != appId)) {
		defualtMeunConfig.id_path = id_path;
	}
	if (!noceUtil.isUndefined(appId)) {
		defualtMeunConfig.appId = appId;
	}
	if (!noceUtil.isUndefined(perId)) {
		defualtMeunConfig.perId = perId;
	}
	noceCommon.loadAddSubIcon();
	if (defualtMeunConfig.appId == "notice"
			&& defualtMeunConfig.menuId == "null") {//点击头部栏公告的js处理
		defualtMeunConfig.index = 0;
		$('.header-nav li a').eq(defualtMeunConfig.index).parent().addClass(
				'active').siblings().removeClass('active');
		$(".left-menu").eq(defualtMeunConfig.index).show().siblings().hide();
		$('.left-menu li:has(ul)').addClass('parent_li').find('> a').next("ul")
				.hide();
		/*
		 * }else
		 * if(defualtMeunConfig.appId=="HomeIndex"&&defualtMeunConfig.menuId=="noce"){
		 * $('.header-nav').find('li').removeClass('active');
		 * $('.left-menu').hide();
		 */
	} else {//非公告
		if (id_path == "new") {//点击目录树跳转
            if (!noceUtil.isUndefined(defualtMeunConfig.menuId)){
//                console.log($('.header-nav li a#' + defualtMeunConfig.menuId + ''));
//            	console.log(defualtMeunConfig.menuId);
                $('.header-nav li a#' + defualtMeunConfig.menuId + '').parent()
                    .addClass('active').siblings().removeClass('active');
                $('.left-menu').filter('#' + defualtMeunConfig.menuId).show()
                    .siblings().hide();
            }
			$('.left-menu').find('.first-menu li').removeClass('active');

//			console.log(defualtMeunConfig.appId);
			$("#" + defualtMeunConfig.perId).parent().addClass('active');
			$('.left-menu li:has(ul)').addClass('parent_li').find('> a').next("ul").hide();
			if (!noceUtil.isUndefined(defualtMeunConfig.perId)){
				showTree();
			}
		} else if(id_path == "first"){//点击一级菜单进行跳转
//			console.log($('.header-nav li a#' + defualtMeunConfig.menuId + ''));
//			console.log(defualtMeunConfig.menuId);
			$('.header-nav li a#' + defualtMeunConfig.menuId + '').parent()
					.addClass('active').siblings().removeClass('active');
			$('.left-menu').find('.first-menu li').removeClass('active');
			$('.left-menu').filter('#' + defualtMeunConfig.menuId).show()
					.siblings().hide();
//			console.log(defualtMeunConfig.appId);
			$('.left-menu li:has(ul)').addClass('parent_li').find('> a').next("ul").hide();//收缩二级、三级目录
			//$("#" + defualtMeunConfig.appId).parent().addClass('active');
		}else {//首次登陆
            // $("#preHomeIndex").show().siblings(".content,.header").hide();
			$('.header-nav').find('li').removeClass('active');
			$('.left-menu').hide();
			$('.left-menu li:has(ul)').addClass('parent_li').find('> a').next("ul").hide();
			/*$('.header-nav').find('li a#456').parent().addClass('active');
			$('.tabContent').find('#456').show();*/
			// 如果id_path是未定义的，即url是登录验证url
			if (id_path == undefined) {
				window.addEventListener(
								"storage",
								function(e) {
									var logout = localStorage.getItem("logOut");
									if (logout == "1" || logout == 1) {
										systemLoginOut();
										location.href = "/NOCE/portal/pages_index_Index_login.action";
									}
								});
				// showTree();

			}

		}
        $('.tabContent .all-left').show();

		// 用户登录进行，浏览器的链接不存在id_url，需要根据目录id和页面id进行树的展开
		function showTree() {
			// 用户登录进行，浏览器的链接不存在id_url，需要根据目录id和页面id进行树的展开
			var $menuAppId = $('.left-menu').filter(
					'#' + defualtMeunConfig.menuId).find(
					'#' + defualtMeunConfig.perId);
			if ($menuAppId.length > 0) {// 配置的页面id在打开的目录id里面
				var $appId = $('#' + defualtMeunConfig.perId);
				showIndexMenu($appId);
				for ( var i = defualtMeunConfig.menuArray.length - 1; i >= 0; i--) {
					defualtMeunConfig.menuArray[i].click();

//					console.log(defualtMeunConfig.menuArray[i]);
				}

			} else {// 配置的页面id不在打开的目录id里面
				var invokeApp = noceUtil.GetQueryString("hideFramework");
				if(invokeApp!="1"){
					alert("首页配置异常，请检查配置文件");
					return;
				}
			}
		}

		// 下面说的只是左边菜单栏的，不是页面，传入的为a标签
		// 递归查找父节点的a标签，传入的为a标签，中间会把找到的a标签放入到menuArray数组中，输出无
		function showIndexMenu(node) {
			// 将本次的节点存放到数组中
			defualtMeunConfig.menuArray.push($(node));
			// 查找父节点的第一个li节点
			var nodeParent = $(node).parent();
			out: for (;;) {
				if (nodeParent.is('li')) {
					break out;
				} else {
					nodeParent = nodeParent.parent();
				}
			}
			if (!nodeParent.parent().hasClass('first-menu')) {
				// 查找父节点a标签
				var nodeParentA = null;
				// 如果父节点a标签的向上的第一个兄弟节点是a标签，直接取，否则在向上的第一个兄弟节点查找a标签
				if (nodeParent.parent().prev().is('a')) {
					nodeParentA = nodeParent.parent().prev();
				} else {
					nodeParentA = nodeParent.parent().prev().find('a');
				}
				if (nodeParentA.length == 1) {
					// 查找找到的父节点a标签的父节点li，根据父节点li进行判断是否到了目录的顶层
					var nodeParentLi = nodeParentA.parent();
					outLi: for (;;) {
						if (nodeParentLi.is('li')) {
							break outLi;
						} else {
							nodeParentLi = nodeParentLi.parent();
						}
					}

					var isTopUl = nodeParentLi.parent().hasClass('first-menu');
					if (isTopUl) {// 到达该目录的顶层,将本次的a标签存放到存储的数组中
						defualtMeunConfig.menuArray.push(nodeParentA.prev());
					} else {
						showIndexMenu(nodeParentA.prev());
					}
				} else {
					alert("树形结构有异常");
				}
			}
		}
	}


   /*星空首页菜单的点击事件 */
    $(".preIndex-content>.preIndex-menu li").click(function() {
    	var index=$(this).index();
        // $("#preHomeIndex").hide().siblings(".content,.header").show();
        var name=$(".header-nav li").eq(index).children("a").attr("name");
        /*if(name=='menu'){
            $(".header-nav li").eq(index).click();
            var id=$(".header-nav li").eq(index).children("a").attr("id");
            $("#left_home div[id="+id+"]"+" > ul").find("a#"+defualtMeunConfig.menuProperties[id]).click();
           /!*点击一级菜单跳转到name！=menu的二级菜单
           var id=$(".header-nav li").eq(index).children("a").attr("id");
            var firstLiA=$("#left_home div[id="+id+"]"+" > ul > li:first-child a");
            for(var i=0;i<firstLiA.length;i++){
				var $aname=$(firstLiA[i]).attr("name");
				if(!noceUtil.isUndefined($aname)&&$aname.toLowerCase()!="menu"){
                    $(firstLiA[i]).click();
					break;
				}
			}*!/
		}else{
            $(".header-nav li").eq(index).click();
		}*/
        $(".header-nav li").eq(index).click();

    });
    $(".header .top-bar-logo").click(function () {
    	var id="HomeIndex";
        if (!multiTabPages.isHasId(id)) {
            multiTabPages.setItem("openIdStr", id);
            window.open("pages_index_Index_home.action", id);
        } else {
            var logOut = localStorage.getItem("logOut");
            if (logOut == "1" || logOut == 1) {
                alert("您已经退出登录，请重新登录");
                return;
            } else {
                var mywin = window.open('', id);
                if (mywin.location.href == "about:blank") {
                    window.open("pages_index_Index_home.action",id);
                    /*window.open(
                        "pages_index_Index_home.action",
                        id);*/
                } else {
                    mywin.focus();
                }
            }
        }
    });

	// /*一级菜单点击事件 *///顶部列表的切换事件
	$(".header-nav li").click(function() {
		defualtMeunConfig.index = $(".header-nav li").index($(this));
//		console.log("defualtMeunConfig.index" + defualtMeunConfig.index);
		//defualtMeunConfig.menuId = $(this).children("a").attr("id");
		//defualtMeunConfig.firstMenuName = $(this).children("a").attr("name");
		// /menuName = $(this).children("a").text();
		// defualtMeunConfig[menuName];
		$(this).addClass("active").siblings().removeClass("active");
		$(".left-menu").eq(defualtMeunConfig.index).show().siblings().hide();
		//$(".first-menu a[id="+defualtMeunConfig.firstMenuName+"]").click();
		defualtMeunConfig.menuId = $(this).children("a").attr("id");
		defualtMeunConfig.firstMenuName = $(this).children("a").attr("name");
		//判断对应子菜单是否也有这个name的二级菜单
		var liMenu=$("#left_home div[id="+defualtMeunConfig.menuId+"]"+" > ul").find('a[name='+defualtMeunConfig.firstMenuName+']');
		if(liMenu.length>0&&defualtMeunConfig.firstMenuName!="menu"){//有这个二级菜单，说明用户有这个权限访问，直接跳转到这个二级菜单
            $(liMenu).click();
		}else{//没有，则需要进一步判断，用户没有权限访问，还是因为有权限并一级菜单本身是一个独立的应用
            $.ajax({
                type : "POST",  // 提交方式
                dataType:"JSON",
                async:false,//将异步设置为同步后，浏览器才不会拦截window.open()和window.focus()
                url : "/NOCE/portal/pages_perm_Perm_getPermsByCode.action",// 路径
                data : {
                    "code" :defualtMeunConfig.firstMenuName ,
                },// 数据，这里使用的是Json格式进行传输
                success : function(perms) {// 返回数据根据结果进行相应的处理
                	if(perms.length==1){//说明是一个独立的应用
                        toFirstMenuPage();
					}else{//说明不是一个独立的应用，也确定该用户没有权限访问
                		// 点击一级菜单跳转到name！=menu的第一个二级菜单
						var firstLiA=$("#left_home div[id="+defualtMeunConfig.menuId+"]"+" > ul > li:first-child a");
						for(var i=0;i<firstLiA.length;i++){
						   var $aname=$(firstLiA[i]).attr("name");
						   if(!noceUtil.isUndefined($aname)&&$aname.toLowerCase()!="menu"){
							   $(firstLiA[i]).click();
							   break;
						   }
						}
					}
                }
            });
            // toFirstMenuPage();

        }

	});
    //跳转到独立应用的一级菜单
    function toFirstMenuPage(){
        //--------------------------跳转新界面---------------------------------
        if(!noceUtil.isUndefined(defualtMeunConfig.firstMenuName)&&defualtMeunConfig.firstMenuName!='menu'){
            $("#win_4_loading").hide();
            if ($(".bwin").attr("isSubmit") == "true") {
                isSubmit = true;
            }
            var id = defualtMeunConfig.firstMenuName;
            var id_ = id.toUpperCase();
            if (id_ == "menuHelper" || id_ == "MENU") {
                return false;
            }
            //noce.appId = id;
            //if (appId != null && appId != id) {
            if (appId != id) {
                id_path = "first";
                var appName = $('#'+defualtMeunConfig.menuId+' span').text();
                //alert(appName);
                if (!multiTabPages.isHasId(id)) {
                    multiTabPages.setItem("openIdStr", id);
                    window.open("pages_index_Index_home.action?appId=" + id
                        + "&menuId=" + defualtMeunConfig.menuId
                        + "&id_path=" + id_path
                        + "&isRedirect=true&appName="
                        + encodeURIComponent(appName), id);
                } else {
                    var logOut = localStorage.getItem("logOut");
                    if (logOut == "1" || logOut == 1) {
                        alert("您已经退出登录，请重新登录");
                        return;
                    } else {
                        var mywin = window.open('', id);
                        if (mywin.location.href == "about:blank") {
                            window.open(
                                "pages_index_Index_home.action?appId="
                                + id + "&menuId="
                                + defualtMeunConfig.menuId
                                + "&id_path=" + id_path
                                + "&isRedirect=true&appName="
                                + encodeURIComponent(appName),
                                id);
                        } else {
                            mywin.focus();
                        }
                    }
                }

                return;
            } else {
                appId = id;
                $(".pc_listb[id]").removeClass("down");
                $("#pc_listb_" + id).addClass("down");
                noce.init();
            }
        }
    }


	/*
	 * setTimeout(function() { if ($("div.pc_listb:visible").attr("id") ==
	 * "pc_listb_hotspotZoneAnalyze") {
	 * $("div.pc_listb:visible").find("div.bwin").first().hide(); } else {
	 * $("div.pc_listb:visible").find("div.bwin").first().show(); } }, 1000);
	 */

	$('.left-menu').each(function(i) {
		var $this = $(this);
		var contentLeftId = $(this).attr("id");
		if ($this.find('ul.first-menu').html().trim() == "") {
			//			$('.header-nav-list').eq(i).hide();
			//根据id进行隐藏
			$('.header-nav').filter('#' + contentLeftId).hide();
		}
	});

	$('.pcbox_nr .ptb table').addClass('table table-bordered');

	
	
	

});
