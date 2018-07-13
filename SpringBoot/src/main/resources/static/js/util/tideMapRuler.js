function TideMapRuler(datePar, startDataPar,$table,type){
	var ruler = new Object;
	var $rulerTable = $table;
	var date = datePar;
	var startData = startDataPar;
	var rulerType = type;
	//生成各类终端占比标尺
	ruler.creatRuler = function (){
		var rulerHtml, rLeft, BoxWidth;
		rulerHtml = '';
		rLeft = 0;
		BoxWidth = parseInt(parseInt($rulerTable.find(".apd_ruler").width()) / (date.length - 1)) + 1;
		$.each(date, function(i, n) {
			if (i == (date.length - 1)) {
				rulerHtml += '<div class="ruler_label" time="' + n + '" leftNum="'
						+ rLeft + '" style="right:0px;"></div>';
			} else {
				rulerHtml += '<div class="ruler_label" time="' + n + '" leftNum="'
						+ rLeft + '" style="left:' + rLeft + 'px;"></div>';
			}
			;
			rLeft += BoxWidth;
		});
		$rulerTable.find(".apd_ruler").html($(rulerHtml));
		ruler.loadPosition(BoxWidth, startData);
		
	};
	
	
	//初始化拖动块位置
	ruler.loadPosition = function (w, start){
		var sLeft = parseInt($rulerTable.find(".ruler_label[time='" + start + "']")
				.attr("leftNum"));
		var eLeft = parseInt($rulerTable.find(".ruler_label[time='" + start + "']").next().attr(
				"leftNum"))
				- (sLeft + 1);
		$rulerTable.find(".apd_block").css({
			left : sLeft,
			width : eLeft
		});
		ruler.updataPosition();
		
		$rulerTable.find(".apd_block").draggable({
			containment : "parent",
			grid : [ w, w ],
			drag : function(event, ui) {
				ruler.updataPosition();
			},
			stop : function(event, ui) {
				var _self, leftW, rightW, allW;
				_self = $(this);
				leftW = parseInt(_self.css("left"));
				rightW = parseInt(_self.width()) + leftW;
				allW = parseInt(_self.parent().width());
				//alert("左边："+leftW+"右边："+rightW+"全部："+allW);
				if (rightW > allW + 37) {
					_self.css("left", leftW - w);
				};
				ruler.changeHandle();
			}
		});
	};
	//刷新拖动块位置与日期
	ruler.updataPosition = function (){
		var sl, el, sTime, eTime;
		sl = parseInt($rulerTable.find(".apd_block").css("left"));
		el = parseInt($rulerTable.find(".apd_block").width()) + 1;
		sTime = $rulerTable.find(".ruler_label[leftNum='" + sl + "']").attr("time");
		$rulerTable.find(".apd_block .block_l").html(sTime);
	};
	//跳转至下一个节点
	ruler.nextWin4 = function (){
		var obj_bk, bk_time, obj_bc, all_bc;
		obj_bk = $rulerTable.find(".apd_block"); //拖动块
		bk_time = obj_bk.find(".block_l").html(); //块上的参数
		obj_bc = $rulerTable.find(".ruler_label[time=" + bk_time + "]");//对应标尺
		obj_bx_idx = obj_bc.index(); //对应索引
		all_bc = $rulerTable.find(".ruler_label").length - 2;//总标尺数量
		if (obj_bx_idx >= all_bc) {
			var obj_ruler = $rulerTable.find(".ruler_label").eq(0);
			var rtime = obj_ruler.attr("time");
			var rlnum = obj_ruler.attr("leftnum");
			obj_bk.css("left", parseInt(rlnum));
			obj_bk.find(".block_l").html(rtime)
		} else {
			var obj_ruler = $rulerTable.find(".ruler_label").eq(obj_bx_idx + 1);
			var rtime = obj_ruler.attr("time");
			var rlnum = obj_ruler.attr("leftnum");
			obj_bk.css("left", parseInt(rlnum));
			obj_bk.find(".block_l").html(rtime);
		}
	};
	nextWin4 = function (){
		ruler.nextWin4();
	};
	// 拖动之后的处理
	ruler.changeHandle = function() {
		if (rulerType == 1) {// 扇区呈现
			
		} else if (rulerType == 2) {// 3G4G联合分析

		}
	};
	
	
	return ruler;
};

