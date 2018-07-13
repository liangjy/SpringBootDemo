function LineChartTool(id,title,xtile,tickx,ytile,inputMaxValue1,inputMaxValue2,unit1,unit2,lineCharge1,lineCharge2){
	this.id = id;	//DIV的ID
	this.title = title;		//图表的标题
	this.xtile = xtile;		//x轴的标题
	this.tickx = tickx;		//x轴数据的间隔数
	this.ytile = ytile;		//y轴的标题
	this.unit1 = unit1;		//第一个输入框的单位
	this.unit2 = unit2;		//第二个输入框的单位
	this.inputMaxValue1 = inputMaxValue1;	//第一个输入框允许输入的最大值
	this.inputMaxValue2 = inputMaxValue2;	//第二个输入框允许输入的最大值
	this.lineCharge1 = lineCharge1;		//第一条线的值
	this.lineCharge2 = lineCharge2;		//第二条线的值	

LineChartTool.prototype.createDiv = function(lineChartTool){
	if(LineChartTool.prototype.comIsNull(lineChartTool.id)){
		alert("必填的DIV的ID不能为空！");
		return;
	}
	if(LineChartTool.prototype.comIsNull(lineChartTool.xtile)){
		lineChartTool.xtile = "";
	}
	if(LineChartTool.prototype.comIsNull(lineChartTool.tickx)){
		lineChartTool.tickx = 100;
	}
	if(LineChartTool.prototype.comIsNull(lineChartTool.ytile)){
		lineChartTool.ytile = "";
	}
	if(LineChartTool.prototype.comIsNull(lineChartTool.unit1)){
		lineChartTool.unit1 = "";
	}
	if(LineChartTool.prototype.comIsNull(lineChartTool.unit2)){
		lineChartTool.unit2 = "";
	}
	if(LineChartTool.prototype.comIsNull(lineChartTool.inputMaxValue1)){
		lineChartTool.inputMaxValue1 = 4000;
	}
	if(LineChartTool.prototype.comIsNull(lineChartTool.inputMaxValue2)){
		lineChartTool.inputMaxValue2 = 100;
	}
	if(LineChartTool.prototype.ArrayIsNull(lineChartTool.lineCharge1)){
//		alert("必填的打点划线数据不能为空！格式为：[[x,y],[x,y]....]");
		return;
	}
	var inputId = lineChartTool.id+'Input';
	var graphId = lineChartTool.id+'Graph';
	lineChartTool.inputId = inputId;
	lineChartTool.graphId = graphId;
	lineChartTool.lineAllCharge = lineChartTool.lineCharge1;
	lineChartTool.minx = 0;
	var div = '<div id="'+inputId+'"></div><div id="'+graphId+'"></div>';
	$('#'+lineChartTool.id).html(div);
	LineChartTool.prototype.createInputDiv(lineChartTool);
	LineChartTool.prototype.drawLine(lineChartTool);
}
	
LineChartTool.prototype.createInputDiv = function(lineChartTool){
	var htmlDiv = '<div style="float:left;width: 30%;margin: 30px 0 0 40px;">'+
	'<div style="float:left;width: 50%">'+
		'<input type="text" id="xid_line1" style="width: 40px;height:15px "  onkeyup="LineChartTool.prototype.replace(this);" maxlength="4"/>'+lineChartTool.unit1+
		'<input type="submit" id="xidSubmit" value="查询" />'+
	'</div>'+
	'<div style="float:left;width: 50%">'+
		'<input type="text" id="percent_line1" style="width: 30px;height:15px " onkeyup="LineChartTool.prototype.replace(this);" maxlength="5"/>'+lineChartTool.unit2+
		'<input type="submit" id="percentSubmit" value="查询" />'+							
	'</div>'+
	'</div >'+
	'<div style="float:left;width: 30%;margin: 30px 0 0 40px;">'+
	'设置横坐标：<input type="text" placeholder="0" id="start_line1" style="width: 40px;height:15px " onkeyup="LineChartTool.prototype.replace(this);" maxlength="4"/>'+lineChartTool.unit1+'&nbsp;'+
	'~<input type="text" placeholder="4000" id="end_line1" style="width: 40px;height:15px " onkeyup="LineChartTool.prototype.replace(this);" maxlength="4"/>'+lineChartTool.unit1+
	'<input type="submit" id="drawLineAgainSubmit" value="查询" />'+
	'</div>';
	$('#'+lineChartTool.inputId).html(htmlDiv);
	$('#xidSubmit').bind('click', function() {
		LineChartTool.prototype.addPlotLine('xid_line1',lineChartTool);
	});
	$('#percentSubmit').bind('click', function() {
		LineChartTool.prototype.addPlotLine('percent_line1',lineChartTool);
	});
	$('#drawLineAgainSubmit').bind('click', function() {
		LineChartTool.prototype.drawLineAgain('start_line1','end_line1',lineChartTool);
	});
}	

LineChartTool.prototype.replace = function(node){
	var id = $(node).attr("id");	
	var value = $(node).val();
	if(id == 'percent_line1'){		
		value=value.replace(/[^\([1-9]+\)|\([0-9]+\.[0-9]{1,2}\)]/g,"");
		if(value > 100){
			value = '100';
		}
	}else{
		value=value.replace(/[^\d]/g,"");
	}
	$(node).val(value);
}

LineChartTool.prototype.addPlotLine=function(inputId,lineChartTool){
	var xid=$("#"+inputId).val();	
	var unit="";
	var maxValue="";
	var xValue="";
	var yValue="";
	if(xid==""){
		alert("请输入！");
		return ;
	}else if(isNaN(xid)){
		alert("请输入数字！");
		return ;
	}

	var distributentStart1="";
	var distributentEnd1="";
	var distributentStart2="";
	var distributentEnd2="";
	var start="";
	var end="";
	var distributentCharge1= lineChartTool.lineCharge1;
	var distributentCharge2= lineChartTool.lineCharge2;
	var y = 0;
	var list = new Array();	
	if(!LineChartTool.prototype.ArrayIsNull(distributentCharge1)){
		for(var i=0;i<=distributentCharge1.length-1;i++){
			var x = distributentCharge1[i][0];
			var y1 = distributentCharge1[i][1];				
			y = y+parseInt(y1);//百分比累加
			var num = [parseInt(x),parseInt(y.toFixed(2))];
			list.push(num);
		}
	}
	if(inputId == 'xid_line1'){
		unit = lineChartTool.unit1;
		maxValue = lineChartTool.inputMaxValue1;		
		if(lineChartTool.xstart != "" && lineChartTool.xend != ""){
			if(parseInt(xid) < parseInt(lineChartTool.xstart) || parseInt(xid) > parseInt(lineChartTool.xend)){
				alert("请输入"+lineChartTool.xstart+"-"+lineChartTool.xend+"的数字！");
				return ;
			}
		}else{
			if(parseInt(xid) < 0 || parseInt(xid) > maxValue){
				alert("请输入0-"+maxValue+"的数字！");
				return ;
			}
		}
		
		//查找出该打点处的百分比
		if(!LineChartTool.prototype.ArrayIsNull(list)){
			for(var i=0;i<list.length;i++){
				var tem=list[i][0];
				var tem2=list[i][1];				
				if(tem > 0 && tem == xid){
					xValue = tem;
					xid = tem;
					yValue = tem2;					
					break;
				}
			}
		}
	}else if(inputId == 'percent_line1'){
		unit = lineChartTool.unit2;
		maxValue = lineChartTool.inputMaxValue2;		
		if(!LineChartTool.prototype.comIsNull(lineChartTool.xstart) && !LineChartTool.prototype.comIsNull(lineChartTool.xend)){
			start=lineChartTool.xstart;
			end=lineChartTool.xend;
			if(!LineChartTool.prototype.ArrayIsNull(list)){
				for(var i=0;i<list.length-1;i++){
					var tem = list[i];
					var tem2 = list[i+1];
					if(parseInt(lineChartTool.xstart) >= tem[0] && tem2[0] >= parseInt(lineChartTool.xstart)){
						distributentStart1 = tem2[1];
					}
					if(parseInt(lineChartTool.xend) >= tem[0] && tem2[0] >= parseInt(lineChartTool.xend)){
						distributentEnd1 = tem[1];
					}
				}
				if(distributentStart1 == ""){
					distributentStart1 = 0;
				}
				if(distributentEnd1 == ""){
					distributentEnd1 = list[list.length-1][1];
				}
			}else{
				distributentStart1 = 0;
				distributentEnd1 = 0;
			}					
			 
			//限制范围
			if(parseInt(xid)<parseInt(distributentStart1)||parseInt(xid)>parseInt(distributentEnd1)){
				alert("请输入"+distributentStart1+"~"+distributentEnd1+"的数字！");
				return ;
			}
		}else{
			if(parseInt(xid) < 0 || parseInt(xid) > maxValue){
				alert("请输入0-"+maxValue+"的数字！");
				return ;
			}	
		}
		var xid1="";
		if(!LineChartTool.prototype.ArrayIsNull(list)){			
			if(parseInt(xid)>parseInt(list[list.length-1][1])){
				yValue=list[list.length-1][1];
				xid1=list[list.length-1][0];
			}else{
				for(var i=0;i<=list.length-2;i++){
					var tem=list[i];
					if(tem[0]<start){
						continue;
					}
					var tem2=list[i+1];
					if(tem[1]>=xid){
						xid1=tem[0];
						yValue=tem[1];
						break;
					}else if(xid>tem[1]&&xid<=tem2[1]){
						var value1=tem[1];
						var value2=tem2[1];
						if((xid-value1)<=(value2-xid)){
							xid1=tem[0];
							yValue=tem[1];
						}else{
							xid1=tem2[0];
							yValue=tem2[1];
						}			
						break;
					}
				}
				
			}
			
		}else{
			yValue=0;
		}
		xid = xid1
	}

	if(LineChartTool.prototype.comIsNull(xid)){
		xid = 0;
	}
	if(LineChartTool.prototype.comIsNull(xValue)){
		xValue = 0;
	}
	if(LineChartTool.prototype.comIsNull(yValue)){
		yValue = 0;
	}
	option = new Highcharts.Chart(lineChartTool.option);
	option.xAxis[0].addPlotLine({
        value: xid,
        color: 'red',
        zIndex:10,
        width: 2,
        id: 'plot-line-'+xid,
        label:{//ehrpd
            text:xid+lineChartTool.unit1+'<br/>'+yValue+lineChartTool.unit2,     //标签的内容
            align:'left',                //标签的水平位置，水平居左,默认是水平居中center
            x:10,                        //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
            rotation:0,
            style: {
                color: 'red',
                fontWeight: 'bold',
               // zIndex:10
            }
        }
    });
}

LineChartTool.prototype.drawLine = function(lineChartTool){
	lineChartTool.option = {
        chart: {
        	type: 'line',
        	marginRight: 80,
        	height:250
        },
        colors:['#91ed7c'],
        title: {
            text: lineChartTool.title,
            style: {
                color: '#333333',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: false
        },
        xAxis: {
        	min:lineChartTool.minx,
        	tickmarkPlacement:'on',
        	tickInterval:lineChartTool.tickx,
            title: {
                text: lineChartTool.xtile,
                align:'high',
                offset: -16 //标题跟x轴的距离
            }
        },
        yAxis: {
        	lineColor: '#C0D0E0',
            lineWidth: 1,
        	min:0,
        	startOnTick: true,
            title: {
                text: lineChartTool.ytile,
                align:'high',
                offset: 0, //标题跟y轴的距离
                y: -12	//标题与y轴的高度
            },
        },
        legend:{
            enabled:false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0,
            labelFormatter: function () {
            	
            }
        },
        credits:{
            enabled:false
        },
        tooltip: {
            enabled: true,
            formatter: function() {
               return this.x+lineChartTool.xtile+'<br/>'+this.y+lineChartTool.ytile;
            }
        },
        plotOptions: {
            spline: {
            	allowPointSelect: true,
                dataLabels: {
                    enabled: true
                },
                cursor: 'pointer',
                lineWidth:0.1,
//                events:{
//                	click:function(e){
//                		alert("gg");
//                	}
//                }
            }
        },
        series: [
                {
		        	data: lineChartTool.lineCharge1,
		        	zoneAxis: 'x',
                }
        ]
    }
	lineChartTool.chart = $('#'+lineChartTool.graphId).highcharts(lineChartTool.option);
}

LineChartTool.prototype.drawLineAgain=function(start,end,lineChartTool){
	var startId=$("#"+start).val();
	var endId=$("#"+end).val();
	if(LineChartTool.prototype.comIsNull(startId)){
		alert("请输入开始值！");
		return ;
	}else if(LineChartTool.prototype.comIsNull(endId)){
		alert("请输入结束值！");
		return ;
	}else if(isNaN(startId)){
		alert("请输入数字！");
		return ;
	}else if(isNaN(endId)){
		alert("请输入数字！");
		return ;		
	}else if(parseInt(startId)>parseInt(endId)){
		alert("开始值不能大于结束值！");
		return ;
	}
	lineChartTool.xstart = startId;
	lineChartTool.xend = endId;
	var cut=parseInt(endId)-parseInt(startId);
	var tickx=Math.ceil(cut/10);
	lineChartTool.tickx = tickx;
	var newList1=new Array();
	var lineCharge1="";
	var maxValue = lineChartTool.inputMaxValue1;
	if(parseInt(startId) < 0 || parseInt(startId)> maxValue || parseInt(endId)< 0 || parseInt(endId) > maxValue){
		alert("请输入0-"+maxValue+"的数字！");
		return ;
	}

	var distributentCharge1= lineChartTool.lineAllCharge;
	for(var i=0;i<distributentCharge1.length;i++){
		var tem=distributentCharge1[i];
		if(tem[0]>=startId&&tem[0]<=endId){
			newList1.push(tem);
		}
	}
	lineChartTool.lineCharge1 = newList1;
	lineChartTool.minx = startId;
	$('#'+lineChartTool.graphId).html("");
	LineChartTool.prototype.drawLine(lineChartTool);
}

//判断数据是否为空
LineChartTool.prototype.comIsNull = function(value){
	if(typeof(value)=="undefined"||value=="undefined"||value==""){
		return true;
	}
	return false;
}

//判断集合或数组是否为空
LineChartTool.prototype.ArrayIsNull = function(value){
	if(typeof(value)=="undefined"||value=="undefined"||value==null||value.length<1){
		return true;
	}
	return false;
}

}