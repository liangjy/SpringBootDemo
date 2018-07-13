//----------郑文彬代码开始--------------------------------------
intelligentRoadTest={};
intelligentRoadTest.city=null;
intelligentRoadTest.guangDongCity=['广州','深圳','珠海','汕头','佛山','韶关','湛江','肇庆','江门','茂名','惠州','梅州','汕尾','河源','阳江','清远','东莞','中山','潮州','揭阳','云浮'];
intelligentRoadTest.topBarData=null;//上方条形图数据
intelligentRoadTest.bottomBarData=null;//下方条形图数据
intelligentRoadTest.checkedTopBar=null;//上方选中的柱条
intelligentRoadTest.checkedBottomBar=null;//下方选中的柱条
intelligentRoadTest.top20data=[];//右边top数据
intelligentRoadTest.polygonData=[];
intelligentRoadTest.map=null;//地图 对象
intelligentRoadTest.gridMap=null;//栅格对象
intelligentRoadTest.gridData=[];//栅格数据
intelligentRoadTest.zoom=18;//地图级别
intelligentRoadTest.fx=null;//地图级别
intelligentRoadTest.checkedBottomCity=null;
intelligentRoadTest.bmapDistanceTool==null;
intelligentRoadTest.baimapStyle = "grayscale";
intelligentRoadTest.title='综合排名得分=弱栅格数排名*0.3+4G切3G次数排名*0.3+4G用户数排名*0.2+4G流量排名*0.1+4G感知优良率*0.1';
intelligentRoadTest.Thresholds=[
    { "threshold": "<=-105", "text": "", "color": "#FFC000", "gradient": 0.5 },
    { "threshold": "<=-115", "text": "", "color": "#C00000", "gradient": 0.5 }
];

$(function (){
    //页面切换回来后97日历会自动弹出来  隐藏弹出来的日历
    window.onfocus = function(){
        setTimeout(function(){
            $dp.hide();
        },5);
    }
    intelligentRoadTest.city=$('#cityPermission_common').val();
    // intelligentRoadTest.city="广州";
    intelligentRoadTest.init();
//	$('#orderBy').click(function(){
//		var orderByCol=$('input:radio[name="group1"]:checked').val();
//		var desc=$('input:radio[name="group2"]:checked').val();
////		alert(orderByCol+" "+desc);
//		intelligentRoadTest.loadTOP20Table($('#seachTime').val(),intelligentRoadTest.checkedBottomCity,intelligentRoadTest.checkedBottomBar,orderByCol,desc);
//	})
    $("#gageDistance").click(function () {
        if(intelligentRoadTest.bmapDistanceTool==null){
            intelligentRoadTest.bmapDistanceTool = new measureDistance(intelligentRoadTest.map);
        }else{
            intelligentRoadTest.bmapDistanceTool.removeAll();
        }
        intelligentRoadTest.bmapDistanceTool.openMeasure();
    });
    $('input[type=radio][name=group1]').change(function() {
        var desc='';
        switch (this.value) {
            case 'PC_OrderNo_TOT':
                desc='desc';
                break;
            case 'POOR_GRID_NUMS_OrderNo':
//                desc='desc';
                break;
            case 'Lte_To_3g_OrderNo':
//                desc='desc';
                break;
            case 'User_4G_OrderNo':
//                desc='desc';
                break;
            case 'Flow_4G_OrderNo':
//                desc='desc';
                break;
            case 'Ce_GOOD_RATIO_OrderNo':
                break;

            default:

                break;
        }
        $(".select-infos").hide();
//		$(":radio[name='group2'][value='"+desc+"']").attr("checked","checked");
//		alert(orderByCol+" "+desc);
        intelligentRoadTest.loadTOP20Table($('#seachTime').val(),intelligentRoadTest.checkedBottomCity,intelligentRoadTest.checkedBottomBar,this.value,desc);
    });

    //地图上方的三块内容显示隐藏 //右边echart图显示隐藏
    $(".chartWrap .pack").click(function () {
        if ($(this).children().hasClass('rotateImg')){
            $(this).children().removeClass('rotateImg');
            $(this).parent().animate({marginLeft:0}, 800);
        } else{
            var leftTopWidth=$(this).parent().width();
            $(this).children().addClass('rotateImg');
            $(this).parent().animate({marginLeft:-leftTopWidth-10}, 800);
        }
    });
    $(".tableWrap .pack").click(function () {
        if ($(this).children().hasClass('rotateImg')){
            $(this).children().removeClass('rotateImg');
            var rightInfoWidth=$(this).parent().width();
            $(this).parent().animate({marginRight:-rightInfoWidth-32}, 500);
        } else{
            $(this).children().addClass('rotateImg');
            $(this).parent().animate({marginRight:0}, 500);
        }
    });

    $(".btnPackImg").click(function () {
        if ($(this).attr("title")=="地图模式"){
            $(".chartWrap .pack").children().addClass('rotateImg');
            $(".tableWrap .pack").children().removeClass('rotateImg');
            var leftTopWidth=$(".chartWrap .pack").parent().width();
            var rightInfoWidth=$(".tableWrap .pack").parent().width();
            $(".chartWrap .pack").parent().animate({marginLeft:-leftTopWidth-10}, 800);
            $(".tableWrap .pack").parent().animate({marginRight:-rightInfoWidth-32}, 500)

            $(this).attr("title","图表模式");
            $(this).children().attr("src","../js/IntelligentRoadTest/images/chartMode.png");
        } else{
            $(".chartWrap .pack").children().removeClass('rotateImg');
            $(".tableWrap .pack").children().addClass('rotateImg');
            $(".chartWrap .pack").parent().animate({marginLeft:0}, 800);
            $(".tableWrap .pack").parent().animate({marginRight:0}, 500)

            $(this).attr("title","地图模式");
            $(this).children().attr("src","../js/IntelligentRoadTest/images/mapMode.png");
        }
    });

    $("#leftIcon").click(function () {
        if($(".content-left").css("display")=="none"){
            if ($(".chartWrap").css("margin-left")=="0px"){
                $(".chartWrap").animate({marginLeft:0}, 800);
            } else{
                var leftTopWidth=$(".chartWrap").width();
                $(".chartWrap").animate({marginLeft:-leftTopWidth-10}, 0);
            }
            if ($(".tableWrap").css("margin-right")=="0px"){
                $(".tableWrap").animate({marginRight:0}, 500);
            } else{
                var rightInfoWidth=$(".tableWrap").width();
                $(".tableWrap").animate({marginRight:-rightInfoWidth-32}, 0);
            }
        }else{
            if ($(".chartWrap").css("margin-left")=="0px"){
                $(".chartWrap").animate({marginLeft:0}, 800);
            } else{
                var leftTopWidth=$(".chartWrap").width();
                $(".chartWrap").animate({marginLeft:-leftTopWidth-10}, 0);
            }
            if ($(".tableWrap").css("margin-right")=="0px"){
                $(".tableWrap").animate({marginRight:0}, 500);
            } else{
                var rightInfoWidth=$(".tableWrap").width();
                $(".tableWrap").animate({marginRight:-rightInfoWidth-32}, 0);
            }
        }
    });

//	$('.tdLine').click(function(){
//		$('.tdLine').removeClass('addLine');
//		$(this).addClass('addLine');
//	});
})
/**********************************
 * @funcname intelligentRoadTest.init
 * @funcdesc 页面初始化
 * 1、查询最新数据时间
 * 2、根据最新时间查询显示两个柱形图和右边top20弱覆盖区域数据
 * 3、设置时间控件、初始化地图及栅格组件
 * @return {null}
 * @author 郑文彬
 * @create 20171017
 ***********************************/
function loadPage(city,country){

    if(intelligentRoadTest.city=="全省"){
        intelligentRoadTest.checkedTopBar=city;//上方选中的柱条
        intelligentRoadTest.checkedBottomBar=country;//下方选中的柱条
        intelligentRoadTest.loadBottomBar($('#seachTime').val(),city);
        intelligentRoadTest.loadTOP20Table($('#seachTime').val(),city,country);
    }else{
        intelligentRoadTest.checkedTopBar=city;//上方选中的柱条
        intelligentRoadTest.checkedBottomBar=country;//下方选中的柱条
        intelligentRoadTest.loadBottomBar($('#seachTime').val(),city);
        intelligentRoadTest.loadTOP20Table($('#seachTime').val(),intelligentRoadTest.city,country);
    }
    intelligentRoadTest.loadMap();


}
intelligentRoadTest.init=function init(){
    //查询所有城市
    var sql=[["Common_04_city_area_mkt_NameAndId","CITY:"]];
    if(intelligentRoadTest.city!="全省"){
        sql=[["Common_04_city_area_mkt_NameAndId","CITY: and CITY_NAME='"+intelligentRoadTest.city+"'"]];
    }
    progressbarTwo.submitSql(sql ,
        [function (data){
            var result = callBackChangeData(data);
            var html_1='';
            if(intelligentRoadTest.city=="全省"){
                var city=[];
                var district=[];
                for(var i=0;i<result.length;i++){
                	city.push(result[i].city_name);
                    var obj={}
                    obj[result[i].city_name]=result[i].district_name;
                    var isRepeat=false;
                    //查看district是否已经有了重复数据
                    for(var j=0;j<district.length;j++){
                    	if(result[i].district_name==district[j][result[i].city_name]){
                    		isRepeat=true;
                    	}
                    }
                    //如果没有重复的数据则添加
                    if(!isRepeat){
                    	district.push(obj);
                    }
                }
                city= city.unique();
                
                for(var i=0;i<city.length;i++){
                    var liList='';
                    var html_2='';
                    for(var j=0;j<district.length;j++){
                        if(district[j][city[i]]!=undefined){
                            liList=liList+ '<li ><a onclick="loadPage(\''+city[i]+'\',\''+district[j][city[i]]+'\')" href="javascript:;">'+district[j][city[i]]+'</a></li>';

                        }
                    }
                    html_2=html_2+'<ul class="districtName">'+liList+'</ul>';
                    html_1=html_1+'<li><a href="javascript:;">'+city[i]+'</a>'+html_2+'</li>';
                }

            }else{
                var district=[];
                var mktcen=[];
                for(var i=0;i<result.length;i++){
                    district.push(result[i].district_name);
                    var obj={}
                    obj[result[i].district_name]=result[i].mktcen_name;
                    mktcen.push(obj);
                }
                district= district.unique();
                for(var i=0;i<district.length;i++){
                    var liList='';
                    var html_2='';
                    for(var j=0;j<mktcen.length;j++){
                        // if()
                        if(mktcen[j][district[i]]!=undefined){
                            liList=liList+ '<li ><a onclick="loadPage(\''+district[i]+'\',\''+mktcen[j][district[i]]+'\')" href="javascript:;">'+mktcen[j][district[i]]+'</a></li>';

                        }
                    }
                    html_2=html_2+'<ul class="districtName">'+liList+'</ul>';
                    html_1=html_1+'<li><a href="javascript:;">'+district[i]+'</a>'+html_2+'</li>';

                }
            }

            $('#allcity').html(html_1);
            $(".cityName > li").mouseover(function () {
                $(this).addClass("selectedCity").siblings().removeClass("selectedCity");
                $(".districtName").hide();
                $(this).children(".districtName").show();
            });
            // 城市列表点击事件
            $(".districtName li").mouseup(function () {
                $(".districtName li").removeClass("selected");
                $(this).addClass("selected");
                $(this).parents("li").addClass("selectedCity").siblings().removeClass("selectedCity");
                $(".districtName").hide();
                $(this).parent().show();
                $(".city-selected").text($(this).parent().siblings().text());
//						$(".district-selected").text($(this).children().text());
                $('.select-info').hide();
            });

        }],
        [3]);
    //查询数据最大时间
    progressbarTwo.submitSql([["IntelligentRoadTest_07_maxDay"]] ,
        [function (data){
            var result = callBackChangeData(data);
            var data=result[0];
            var srtTime=data["max(day)"]+"";
            var fomatDate=srtTime.substring(0,4)+"/"+srtTime.substring(4,6)+"/"+srtTime.substring(6,8);
            var now =new Date(srtTime);
            var obj=intelligentRoadTest.getFirstDayOfWeek(now);
            $('#seachTime').val(srtTime);
            $('#weekStartTime').html(getNewDate(fomatDate,-6));

        }],
        [3],null,null,null,null,true);
    //初始化地图
    intelligentRoadTest.map= new BMap.Map("mapDiv",{enableMapClick : false,minZoom:8,maxZoom:18});
//	var mapType2 = new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT,mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP],offset: new BMap.Size(150, 10)});
    var mapType2 = new myBMapTypeControl({anchor: BMAP_ANCHOR_TOP_LEFT,offset: new BMap.Size(10, 60)});
    intelligentRoadTest.map.addControl(mapType2);
    var opts = {anchor:BMAP_ANCHOR_TOP_LEFT,offset: new BMap.Size(150,57)}
    intelligentRoadTest.map.addControl(new BMap.ScaleControl(opts));
    intelligentRoadTest.map.enableScrollWheelZoom();
    intelligentRoadTest.map.setMapStyle({style:intelligentRoadTest.baimapStyle});
    intelligentRoadTest.map.centerAndZoom(new BMap.Point('113.271368','23.134245'),intelligentRoadTest.zoom);
    //广东以外遮罩
    var bMapObj = {
        map:intelligentRoadTest.map,
        sectorColor:"#818181",
        circleColor:"#818181",
        opacity:0.5
    };
    intelligentRoadTest.sectorCompentM= new SectorUtilForBaidu(bMapObj);
    intelligentRoadTest.map.addEventListener('zoomend', GridMapZoomEnd);
    intelligentRoadTest.map.addEventListener('dragend', GridMapZoomEnd);
    addBands(intelligentRoadTest.sectorCompentM);
    //初始化栅格组件
    intelligentRoadTest.gridMap = new GridMap(intelligentRoadTest.map, {
        readTileData: null,//瓦片获取数据事件
        opacity: 0.7,//$('#opacity').val(),//透明度
        colorMode: 'range'//gradient:渐变的方式呈现颜色；range:按区间匹配颜色
    });
    //设置栅格组件门限值
    intelligentRoadTest.gridMap.setThresholds(intelligentRoadTest.Thresholds);
    //根据最大时间查询显示上方柱状图

    showPage($('#seachTime').val());
//	intelligentRoadTest.loadTopBar($('#seachTime').val());
//	//根据用户区域信息及最大时间查询下方柱状图
//	intelligentRoadTest.loadBottomBar($('#seachTime').val(),intelligentRoadTest.topBarData.city[0]);
//	//查询右边top20数据
//	if(intelligentRoadTest.city=="全省"){
//		intelligentRoadTest.loadTOP20Table($('#seachTime').val(),intelligentRoadTest.topBarData.city[0],'全市');
//	}else{
//		intelligentRoadTest.loadTOP20Table($('#seachTime').val(),intelligentRoadTest.city,intelligentRoadTest.bottomBarData[1].mktcenter);
//	}
}
function showPage(date){
    //根据最大时间查询显示上方柱状图
    intelligentRoadTest.loadTopBar(date);
    //根据用户区域信息及最大时间查询下方柱状图
    intelligentRoadTest.loadBottomBar(date,intelligentRoadTest.topBarData.city[0]);
    //查询右边top20数据
    if(intelligentRoadTest.city=="全省"){
        intelligentRoadTest.loadTOP20Table(date,intelligentRoadTest.topBarData.city[0],intelligentRoadTest.bottomBarData[1].country);
    }else{
        intelligentRoadTest.loadTOP20Table(date,intelligentRoadTest.city,intelligentRoadTest.bottomBarData[1].mktcenter);
    }
    intelligentRoadTest.loadMap()
}
/**********************************
 * @funcname GridMapZoomEnd
 * @funcdesc 地图缩放或者平移时重新绘制栅格
 * @return {null}
 * @author 郑文彬
 * @create 20171017
 ***********************************/
function GridMapZoomEnd(e){
    intelligentRoadTest.lat=intelligentRoadTest.map.getCenter().lat
    intelligentRoadTest.lng=intelligentRoadTest.map.getCenter().lng
    intelligentRoadTest.zoom=intelligentRoadTest.map.getZoom();
    if(intelligentRoadTest.zoom<10){
        intelligentRoadTest.map.disableInertialDragging();
    }else{
        intelligentRoadTest.map.enableInertialDragging();
    }
    intelligentRoadTest.showGrid(intelligentRoadTest.gridData,intelligentRoadTest.map,'1');
    var bs = intelligentRoadTest.map.getBounds();   //获取可视区域
    var bssw = bs.getSouthWest();   //可视区域左下角
    var bsne = bs.getNorthEast();   //可视区域右上角
//	alert("当前地图可视范围是：" + bssw.lng + "," + bssw.lat + "到" + bsne.lng + "," + bsne.lat);
    if(bssw.lng<105.99061||bsne.lng>119.876504||bssw.lat<18.109402||bsne.lat>26.280373){
        intelligentRoadTest.map.centerAndZoom("广州",intelligentRoadTest.zoom);
    }

    setTimeout(
        function(){
            intelligentRoadTest.sectorCompentM.MapZoomAndDragEnd(e,intelligentRoadTest.sectorCompentM)
        },300);
}
/**********************************
 * @funcname intelligentRoadTest.loadMap
 * @funcdesc 加载地图
 * 1、查询并显示轮廓数据
 * 2、查询并显示栅格数据
 * @return {null}
 * @author 郑文彬
 * @create 20171017
 ***********************************/
intelligentRoadTest.loadMap =function loadMap(moveLocation){
    // 百度地图API功能  intelligentRoadTest.checkedBottomBar
//	$(".chartWrap").hide();
//	$(".mapWrap").show();
//	$(".progressBox").show();
//
//	$(".tableTitle").css("background-color","#BEBEBE");
//	$('.tableTitle').unbind("click");
    //清除所有地图覆盖物
    intelligentRoadTest.map.clearOverlays();
    intelligentRoadTest.loadPolygon(moveLocation);
    intelligentRoadTest.loadGrid(intelligentRoadTest.checkedBottomBar);
//	window.setTimeout(intelligentRoadTest.loadGrid(intelligentRoadTest.checkedBottomBar),10000);


}
/**********************************
 * @funcname getCityCountryMktcenterId
 * @funcdesc 从缓存的下方柱形图数据取出所需的各种地区ID，用于栅格数据的查询
 * @param {String} cityName (input optional)
 * 城市名称
 * @return {null}
 * @author 郑文彬
 * @create 20171017
 ***********************************/
function getCityCountryMktcenterId(cityName){
    var data={};
    //intelligentRoadTest.bottomBarData
    for ( var i = 0; i < intelligentRoadTest.bottomBarData.length; i++) {
        if(cityName==intelligentRoadTest.bottomBarData[i].mktcenter||cityName==intelligentRoadTest.bottomBarData[i].country){
            data.city_id=intelligentRoadTest.bottomBarData[i].city_id;
            data.country_id=intelligentRoadTest.bottomBarData[i].country_id;
            data.mktcenter_id=intelligentRoadTest.bottomBarData[i].mktcenter_id;
            data.city=intelligentRoadTest.bottomBarData[i].city;
            data.country=intelligentRoadTest.bottomBarData[i].country;
            data.mktcenter=intelligentRoadTest.bottomBarData[i].mktcenter;
        }
    }

    return data;
}
/**********************************
 * @funcname intelligentRoadTest.loadGrid
 * @funcdesc 向后台查询栅格数据，并调用绘制栅格
 * @param {String} city (input optional)
 *下方选中的柱条名称
 * @return {null}
 * @author 郑文彬
 * @create 20171017
 ***********************************/
intelligentRoadTest.loadGrid=function loadGrid(city){
    var data=getCityCountryMktcenterId(city);
    var STARTROW="";
    var COLUMNLIST="i:a11,i:a12,i:a15,i:a16,i:a27";
    if(intelligentRoadTest.city=="全省"){
        STARTROW=$('#seachTime').val()+"_20_2_"+
            data.city_id+"_"+
            data.country_id+
            "_";
    }else{
        STARTROW=$('#seachTime').val()+"_20_2_"+
            data.city_id+"_"+
            data.country_id+
            "_";
//		+data.mktcenter_id+"_";

    }
    var ENDROW=STARTROW+"~";
//	STARTROW="20171008_20_2_200_4050_";
//	ENDROW="20171008_20_2_200_4050_~";
    var sql=["IntelligentRoadTest_06_grid","STARTROW:"+STARTROW,"ENDROW:"+ENDROW,"COLUMNLIST:"+COLUMNLIST]

    progressbarTwo.submitSql([sql] ,
        [function (data){
            var result = callBackChangeData(data);
            intelligentRoadTest.gridData=result;
            intelligentRoadTest.showGrid(result,intelligentRoadTest.map);
        }],
        [4]);
}
/**********************************
 * @funcname intelligentRoadTest.showGrid
 * @funcdesc 在地图上绘制栅格
 * @param {object} result (input optional)
 *栅格数据
 * @param {object} map (input optional)
 *地图对象
 * @return {null}
 * @author 郑文彬
 * @create 20171017
 ***********************************/
intelligentRoadTest.showGrid=function showGrid(result,map,v){
    intelligentRoadTest.gridMap.clear();
    intelligentRoadTest.gridArr=[];
    for(var i=0;i<result.length;i++){
        var color='';
        var maxLng = result[i]["i:a15"];// 最大经度
        var maxLat = result[i]["i:a16"];// 最大纬度
        var minLng = result[i]["i:a11"];// 最小经度
        var minLat = result[i]["i:a12"];// 最小纬度
        var coverageavg = result[i]["i:a27"];// 电信平均覆盖
        var data = [minLng,minLat,maxLng,maxLat,coverageavg];
        intelligentRoadTest.gridArr.push(data);

    }
    intelligentRoadTest.gridMap.draw(intelligentRoadTest.gridArr);
    if(v==undefined){
        intelligentRoadTest.map.centerAndZoom(new BMap.Point(intelligentRoadTest.lng,intelligentRoadTest.lat), intelligentRoadTest.zoom);

    }

}
//加载轮廓数据
/**********************************
 * @funcname intelligentRoadTest.loadPolygon
 * @funcdesc 查询轮廓数据并显示
 * @return {null}
 * @author 郑文彬
 * @create 20171017
 ***********************************/
intelligentRoadTest.loadPolygon=function loadPolygon(moveLocation){
    var sql;
    if(intelligentRoadTest.city=="全省"){
        sql=["IntelligentRoadTest_05_polygonGis","DAY:"+$('#seachTime').val(),"CITY:"+intelligentRoadTest.checkedTopBar,"COUNTRY:"+intelligentRoadTest.checkedBottomBar,"MKTCENTER:"]
    }else{
        if(intelligentRoadTest.checkedBottomBar!=intelligentRoadTest.checkedTopBar){
            sql=["IntelligentRoadTest_05_polygonGis","DAY:"+$('#seachTime').val(),"CITY:"+intelligentRoadTest.city,"COUNTRY:"+intelligentRoadTest.checkedTopBar,"MKTCENTER:and mktcenter = '"+intelligentRoadTest.checkedBottomBar+"'"]
        }else{
            sql=["IntelligentRoadTest_05_polygonGis","DAY:"+$('#seachTime').val(),"CITY:"+intelligentRoadTest.city,"COUNTRY:"+intelligentRoadTest.checkedTopBar,"MKTCENTER:"]
        }
    }
    progressbarTwo.submitSql([sql] ,
        [function (data){
            var result = callBackChangeData(data);
            intelligentRoadTest.polygonData=result;
            intelligentRoadTest.drawPolygon(result,moveLocation);
            intelligentRoadTest.drawMk(intelligentRoadTest.top20data,intelligentRoadTest.polygonData);
        }],
        [3]);
}
/**********************************
 * @funcname intelligentRoadTest.drawPolygon
 * @funcdesc 绘制轮廓线
 * @param {object} data (input optional)
 *轮廓数据
 * @return {null}
 * @author 郑文彬
 * @create 20171017
 ***********************************/
intelligentRoadTest.drawPolygon=function drawPolygon(data,moveLocation){
    var sumLon=0;
    var sumLat=0;
    var coordinate={lon:[],lat:[]};
    for(var i=0;i<data.length;i++){
        var varr=[];
        var gis_data=data[i].gis_data;
        var sp=gis_data.split('@');
        for(var j=0;j<sp.length;j++){
            var v=sp[j].split(',');
            varr.push(new BMap.Point(v[0],v[1]));
            if(j==0){
                sumLon=sumLon+parseFloat(v[0]);
                sumLat=sumLat+parseFloat(v[1]);
                coordinate.lon.push(v[0]);
                coordinate.lat.push(v[1]);
            }
        }
        var polygon = new BMap.Polygon(varr, {strokeColor:"#FF9900", strokeWeight:2, strokeOpacity:0.6,fillOpacity:0.1});  //创建多边形
        //设置多边形边框为虚线
//		polygon.setStrokeStyle("dashed");
        polygon.str="day="+$('#seachTime').val()+"&city="+data[i].city+"&country="+data[i].country+"&mktcenter="+data[i].mktcenter+"&object_id="+data[i].object_id
        polygon.addEventListener("click",function (e){
            doFx(this.str);
        });
//		polygon.setZIndex(90000);
        intelligentRoadTest.map.addOverlay(polygon);   //增加多边形
        $(".progressBox").hide();
    }
    if(moveLocation==null ||moveLocation==undefined){
        intelligentRoadTest.lng=sumLon/data.length;
        intelligentRoadTest.lat=sumLat/data.length;
//		intelligentRoadTest.zoom=getZoom (Math.max.apply( Math, coordinate.lon ), Math.min.apply( Math, coordinate.lon ), Math.max.apply( Math, coordinate.lat ), Math.min.apply( Math, coordinate.lat ));
        intelligentRoadTest.zoom=14;
        if(intelligentRoadTest.zoom<=11){
            intelligentRoadTest.zoom=intelligentRoadTest.zoom+1;
        }
        intelligentRoadTest.map.centerAndZoom(new BMap.Point(intelligentRoadTest.lng,intelligentRoadTest.lat), intelligentRoadTest.zoom);
    }

}
/**********************************
 * @funcname intelligentRoadTest.loadTopBar
 * @funcdesc 查询上方柱状图数据
 * @param {stirng} day (input optional)
 *日期
 * @return {null}
 * @author 郑文彬
 * @create 20171017
 ***********************************/
intelligentRoadTest.loadTopBar=function loadTopBar(day){
    var sql=["IntelligentRoadTest_01_province","DAY:"+day]
    if(intelligentRoadTest.city!="全省"){
        sql=["IntelligentRoadTest_02_city","DAY:"+day,"CITY:"+intelligentRoadTest.city];

    }

    progressbarTwo.submitSql([sql] ,
        [function (data){
            var result = callBackChangeData(data);
            for(var j=0;j<result.length;j++){
                if(result[j].country=='全市'){

                    result[0] = result.splice(j, 1, result[0])[0];
                }
            }
            var chartData={};
            var charBadcount=[];
            var charPoor_grid_nums=[];
            var charCity=[];
            var charProportion=[]
            if(result.length!=0){
                $('#topbar').html(intelligentRoadTest.city+"RSRP<-105db弱覆盖区域数及弱覆盖栅格占比<div style='padding-left:40px;' >弱区总数："+result[0].badcount+"  弱栅格总数："+	result[0].poor_grid_nums+"</div>");
            }

            for(var i=1;i<result.length;i++){
                charBadcount.push(result[i].badcount);
                charPoor_grid_nums.push(result[i].poor_grid_nums);
                charProportion.push(result[i].proportion)
                if(intelligentRoadTest.city!="全省"){
                    charCity.push(result[i].country);
                }else{
                    charCity.push(result[i].city);
                }

            }
            chartData.city=charCity;
            chartData.badcount=charBadcount;
            chartData.poor_grid_nums=charPoor_grid_nums;
            chartData.proportion=charProportion;
            intelligentRoadTest.topBarData=chartData;//缓存上方柱状图数据
            intelligentRoadTest.showBar('chartTop',chartData);
//				$('#cityList_1').html("");
//				$('#city_1').html(charCity[0]);
//				$('#cityName').html(charCity[0]);
//				for(var k=0;k<charCity.length;k++){
//					$('#cityList_1').append('<li class="current" onclick="intelligentRoadTest.selectTopBar(\''+charCity[k]+'\')"><a href="javascript:;">'+charCity[k]+'</a></li>');
//				}
        }],
        [3],null,null,null,null,true);
}
/**********************************
 * @funcname intelligentRoadTest.loadBottomBar
 * @funcdesc 查询下方柱状图数据
 * @param {stirng} day (input optional)
 *日期
 * @param {stirng} city (input optional)
 *上方柱状图选中的柱条名称
 * @return {null}
 * @author 郑文彬
 * @create 20171017
 ***********************************/
intelligentRoadTest.loadBottomBar=function loadBottomBar(day,city){
    intelligentRoadTest.checkedTopBar=city;
    var sql;
    if(intelligentRoadTest.city=="全省"){
        sql=["IntelligentRoadTest_02_city","DAY:"+day,"CITY:"+city];
        $('.city-selected').html(city);
    }else{
        sql=["IntelligentRoadTest_03_country","DAY:"+day,"CITY:"+intelligentRoadTest.city,"COUNTRY:"+city]
        $('.city-selected').html(city);
    }

    progressbarTwo.submitSql([sql] ,
        [function (data){
            var result = callBackChangeData(data);
            for(var j=0;j<result.length;j++){
                if(result[j].country=='全市'){

                    result[0] = result.splice(j, 1, result[0])[0];
                }
            }
            intelligentRoadTest.bottomBarData=result;//缓存下方柱状图数据
            var chartData={};
            var charBadcount=[];
            var charPoor_grid_nums=[];
            var charCity=[];
            var charProportion=[]
            if(result.length!=0){
                $('#bottombar').html(city+"RSRP<-105db弱覆盖区域数及弱覆盖栅格占比<div style='padding-left:40px;'>弱区总数："+result[0].badcount+"  弱栅格总数："+	result[0].poor_grid_nums+"</div>");
            }

            for(var i=1;i<result.length;i++){
                charBadcount.push(result[i].badcount);
                charPoor_grid_nums.push(result[i].poor_grid_nums);
                charProportion.push(result[i].proportion);
                if(intelligentRoadTest.city=="全省"){
                    charCity.push(result[i].country);
                }else{
                    charCity.push(result[i].mktcenter);
                }

            }
            chartData.city=charCity;
            chartData.badcount=charBadcount;
            chartData.poor_grid_nums=charPoor_grid_nums;
            chartData.proportion=charProportion;
            intelligentRoadTest.showBar('chartBottom',chartData);
//				$('#cityList_2').html("");
//				$('#city_2').html(charCity[0]);
//				for(var k=0;k<charCity.length;k++){
//					$('#cityList_2').append('<a href="javascript:;" onclick="intelligentRoadTest.selectBottomBar(\''+charCity[k]+'\')">'+charCity[k]+'</a>');
//				}
        }],
        [3],null,null,null,null,true);
}
/**********************************
 * @funcname intelligentRoadTest.loadTOP20Table
 * @funcdesc 查询top20如覆盖区数据
 * @param {stirng} day (input optional)
 *日期
 * @param {stirng} city (input optional)
 *市级城市
 * @param {stirng} v (input optional)
 *下方柱状图选中的柱条名称
 * @return {null}
 * @author 郑文彬
 * @create 20171017
 ***********************************/
intelligentRoadTest.loadTOP20Table=function loadTOP20Table(day,city,v,ORDERCOL,DESC){
    if(ORDERCOL==undefined){
        ORDERCOL='PC_OrderNo_TOT';
        DESC='desc';
    }
    if(DESC==undefined){
        DESC='';
    }
    $('.district-selected').html(v);
    switch (ORDERCOL) {
        case 'PC_OrderNo_TOT':
            intelligentRoadTest.title='按本地网弱覆盖区域各指标排名的加权得分排名，计算方法如下，得分越低越推荐处理  综合排名得分=弱栅格数排名*0.3+4G切3G次数排名*0.3+4G用户数排名*0.2+4G流量排名*0.1+4G感知优良率*0.1';
            $('#orderType').html("综合排名");
            break;
        case 'POOR_GRID_NUMS_OrderNo':
            intelligentRoadTest.title='按本地网弱覆盖区域的弱栅格数指标降序排名，排名越前越推荐处理';
            $('#orderType').html("弱栅格数排名");
            break;
        case 'Lte_To_3g_OrderNo':
            intelligentRoadTest.title='按本地网弱覆盖区域的4G切3G次数指标降序排名，排名越前越推荐处理';
            $('#orderType').html("4G切3G次数排名");
            break;
        case 'User_4G_OrderNo':
            intelligentRoadTest.title='按本地网弱覆盖区域的4G用户数指标降序排名，排名越前越推荐处理';
            $('#orderType').html("4G用户数排名");
            break;
        case 'Flow_4G_OrderNo':
            intelligentRoadTest.title='按本地网弱覆盖区域的4G流量指标降序排名，排名越前越推荐处理';
            $('#orderType').html("4G流量排名");
            break;
        case 'Ce_GOOD_RATIO_OrderNo':
            intelligentRoadTest.title='按本地网弱覆盖区域的4G感知优良率升序排名，排名越前越推荐处理';
            $('#orderType').html("4G感知优良率排名");
            break;

        default:
            intelligentRoadTest.title='按本地网弱覆盖区域各指标排名的加权得分，计算方法如下，得分越低越推荐处理  综合排名得分=弱栅格数排名*0.3+4G切3G次数排名*0.3+4G用户数排名*0.2+4G流量排名*0.1+4G感知优良率*0.1';
            $('#orderType').html("综合排名");
            break;
    }
//	alert();
    $("#orderType").attr("title",intelligentRoadTest.title);
//	$('input:radio[name="group1"]').val(ORDERCOL);
    $(":radio[name='group1'][value='"+ORDERCOL+"']").attr("checked","checked");
    $(":radio[name='group2'][value='"+DESC+"']").attr("checked","checked");
    var sql;
    intelligentRoadTest.checkedBottomCity=city;
    intelligentRoadTest.checkedBottomBar=v;
    //将显示地图的按钮设置为可用
    $(".tableTitle").css("background-color","#56B9FD");
    $('.tableTitle').unbind("click");
    /*点击xxx覆盖弱区分布显示当前区域的地图*/
    $(".tableTitle").click(function(){
//		$(".chartWrap").hide();
//		$(".mapWrap").show();
//		$(".progressBox").show();
//
//		$(".tableTitle").css("background-color","#BEBEBE");
//		$('.tableTitle').unbind("click");
//		intelligentRoadTest.loadMap();
    });
    if(intelligentRoadTest.city=="全省"){
        //设置查询县区参数
        if(v!='全市'){
            $('.areaName').html(v);
            v="AND country ='"+v+"'";
        }else{
            v='';
            $('.areaName').html(city);
            //将显示地图的按钮设置为禁用
            $(".tableTitle").css("background-color","#BEBEBE");
            $('.tableTitle').unbind("click");
        }
        sql=["IntelligentRoadTest_04_TOP20Table","DAY:"+day,"CITY:"+city,"COUNTRY:"+v,"MKTCENTER:","ORDERCOL:"+ORDERCOL,"DESC:"+DESC]
    }else{
        $('.areaName').html(v);
        //设置查询营服参数
        if(v!=intelligentRoadTest.checkedTopBar){
            v="AND mktcenter ='"+v+"'";
        }else{
            v='';
        }
        sql=["IntelligentRoadTest_04_TOP20Table","DAY:"+day,"CITY:"+city,"COUNTRY: and COUNTRY='"+intelligentRoadTest.checkedTopBar+"'","MKTCENTER:"+v,"ORDERCOL:"+ORDERCOL,"DESC:"+DESC]
    }

    progressbarTwo.submitSql([sql] ,
        [function (data){
            var result = callBackChangeData(data);
            intelligentRoadTest.top20data=result;
            //切换排名地图绘制top10水滴点
            intelligentRoadTest.drawMk(intelligentRoadTest.top20data,intelligentRoadTest.polygonData);
            $('#tb_01').html("");
            intelligentRoadTest.fx="day="+$('#seachTime').val()+"&city="+result[0].city+"&country="+result[0].country+"&mktcenter="+result[0].mktcenter;
            $('#AnalysisEntrance').unbind("click");
            $('#AnalysisEntrance').click(function(){
                doFx(intelligentRoadTest.fx+"&object_id="+result[0].object_id);
            });
            for(var i=0;i<result.length;i++){
                intelligentRoadTest.fx="day="+$('#seachTime').val()+"&city="+result[i].city+"&country="+result[i].country+"&mktcenter="+result[i].mktcenter;
                var orderStr=result[i].col;
                if(orderStr!=null){
                    orderStr=result[i].col.toFixed(1)
                }
                var str='<tr>'+
                    '<td class="coefficient"><div class="alltd" title="'+$('#orderType').html()+"得分:"+orderStr+'">'+(i+1)+'</div></td>'+
                    '<td onclick=doFx("'+intelligentRoadTest.fx+'&object_id='+result[i].object_id+'") class="clickCell"><div class="alltd tdLine"><span class="hou">'+result[i].object_id+'</span></div></td>'+
                    '<td onclick=doFx("'+intelligentRoadTest.fx+'&object_id='+result[i].object_id+'&clickSector=1") class="clickAddress"><div class="alltd tdLine" title='+result[i].address+'><span class="hou">'+result[i].address+'</span></div></td></tr>';
                $('#tb_01').append(str);
                $('.tdLine').click(function(){
                    $('.tdLine').removeClass('addLine');
                    $(this).addClass('addLine');
                });
            }
        }],
        [3],null,null,null,null,true);
}
/**********************************
 * @funcname intelligentRoadTest.showBar
 * @funcdesc 根据div绘制上方或者下方的柱形图，并绑定点击柱条事件
 * @param {stirng} div (input optional)
 *echar图对应的div_id
 * @param {object} data (input optional)
 *柱图数据
 * @return {null}
 * @author 郑文彬
 * @create 20171017
 ***********************************/
intelligentRoadTest.showBar= function showBar(div,data){
    var gridSum=0;//栅格总数
    var chart = echarts.init(document.getElementById(div));
    var asisLab=null;
    if(div!="chartBottom"){
        intelligentRoadTest.topChar=chart;
        asisLab={
            interval:0,//横轴信息全部显示
            formatter:function(val){
                return val.split("").join("\n");
            }
//            rotate: 60,//60度角倾斜显示
        }

    }else{
        intelligentRoadTest.bottomChar=chart;
        asisLab={
            interval:0,//横轴信息全部显示
            formatter:function(val){
                return val.split("").join("\n");
            }
//            rotate: 60,//60度角倾斜显示
        }
    }
    var max=Math.max.apply(null, data.poor_grid_nums);
    for(var i=0;i<data.poor_grid_nums.length;i++){
        if(data.poor_grid_nums[i]<(max/12)){
            data.poor_grid_nums[i]=Math.ceil(max/10);
        }
        gridSum=gridSum+data.poor_grid_nums[i];//计算栅格总数
    }
    var max2=Math.max.apply(null, data.badcount);
    for(var j=0;j<data.badcount.length;j++){
        if(data.badcount[j]<(max2/12)){
            data.badcount[j]=Math.ceil(max2/10);
        }
    }
    //获取栅格占比信息
    var gridRatio=[]
    for(var i=0;i<data.proportion.length;i++){
        gridRatio.push((data.proportion[i]*100).toFixed(2));
    }
    var max3=Math.max.apply(null, gridRatio);
    //-------------
    var interval3=Math.ceil(Math.ceil(max3)/4);
    max3=interval3*4;

    var interval2=Math.ceil(Math.ceil(max2)/4);
    interval2=Math.ceil(interval2/100)*100;
    max2=interval2*4;
//    var i=1;
//    if(max>5000){
//    	num=1000;
//    }else{
//    	num=500;
//    }
//    while (num*i<interval) {
//		i=i+1;
//	}
//    interval=i*num;
//    max=interval*5;
//
//    var max2=Math.max.apply(null, data.badcount);
//    if(max2>5000){
//    	num=1000;
//    }else{
//    	num=500;
//    }
////  var interval=Math.ceil(data.city.length)/5;
//    var interval2=Math.ceil(max2/5);
//    var j=1;
//    while (num*j<interval2) {
//		j=j+1;
//	}
//    interval2=j*num;
//    max2=interval2*5;

    var option = {
        tooltip : {
            trigger: 'axis',
            axisPointer:{
                type:'shadow'

            },formatter:function(params ){
//	        	alert(JSON.stringify(params[0]));
                var str='<ul style="">';
                for(var i=0;i<params.length;i++){
                    var s='';
                    if(params[i].seriesName=='弱覆盖栅格占比'){
                        s='%';
                    }
                    str=str+'<li style=""><span style="color:'+params[i].color+';font-size: 20px;padding-right: 5px;">●</span>'+params[i].seriesName+': '+params[i].value+''+s+'</li>';
                }
                return str+'</ul>';
            }
        },
        legend: {
            data:['弱覆盖栅格占比','弱覆盖区域'],
            top: '5%',
        },
        calculable : true,
        grid:{
            left: '11%',
            right: '10%',
            bottom: '50px'
        },
        xAxis : [
            {
                type : 'category',
                data : data.city,
                axisLabel: asisLab,
                axisLine: {
                    lineStyle:{
                        color: '#686c78',
                    },
                },
                axisTick: {
                    show: false
                },
            },
        ],
        yAxis : [
            {
                type : 'value',
                name:'弱覆盖栅格占比(%)',
//	            splitNumber:4,
//	            scale:true,
                min: 0,
                max: max3,
                interval: interval3,
                axisLine: {
                    lineStyle:{
                        color: '#686c78',
                    },
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                nameTextStyle:{

                }
            },
            {
                type : 'value',
                name:'弱覆盖区域数',
                min: 0,
                max: max2,
                interval: interval2,
//	            splitNumber:4,
                axisLine: {
                    lineStyle:{
                        color: '#686c78',
                    },
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
            ,
            {
                type : 'value',
                name:'弱覆盖栅格数',
                show:false,
//	            min: 0,
//	            max: max,
//	            interval: interval,
                axisLine: {
                    lineStyle:{
                        color: '#686c78',
                    },
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series : [
//	        {
//	            name:'覆盖弱区',
//	            type:'bar',
//	            barWidth: '20%',
//	            data:data.badcount,
//	            itemStyle:{
//	                normal:{
//	                    color: '#E8A463',
//	                    barBorderRadius: [10,10,0,0]
//	                }
//	            }
//	        },
            {
                name:'弱覆盖栅格占比',
                type:'bar',
                barWidth: '40%',
                data:gridRatio,
                yAxisIndex:0,
                itemStyle:{
                    normal:{
                        color: '#64BBA8',
                        barBorderRadius: [10,10,0,0]
                    }
                }
            }
            , {
                name: '弱覆盖区域',
                yAxisIndex:1,
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#E8A463'
                    }
                },
                data: data.badcount
            },
            {
                name:'弱覆盖栅格',
                type:'line',
                data:data.poor_grid_nums,
                yAxisIndex:2,
                itemStyle:{
                    normal:{
                        borderWidth:0,
                        color: '#7d8bd3',
                        opacity:0
                    }
                },
                lineStyle:{
                    normal:{
                        opacity:0
                    }
                }
            }
        ]
    };
    chart.setOption(option);
    if(div!="chartBottom"){
        chart.on('click', function (params) {
            if(params.name=='全省' ||params.name=='全市'){
                return;
            }
            //查询下方柱状图
            intelligentRoadTest.loadBottomBar($('#seachTime').val(),params.name);
            //查询右边top20数据
            if(intelligentRoadTest.city=="全省"){
                intelligentRoadTest.loadTOP20Table($('#seachTime').val(),params.name,intelligentRoadTest.bottomBarData[1].country);
            }else{
                intelligentRoadTest.loadTOP20Table($('#seachTime').val(),intelligentRoadTest.city,intelligentRoadTest.bottomBarData[1].mktcenter);
            }
            intelligentRoadTest.loadMap();
//			$('#city_1').html(params.name);
//			$('#cityName').html(params.name);
        });
    }else{
        chart.on('click', function (params) {
            //查询右边top20数据
            if(intelligentRoadTest.city=="全省"){
                intelligentRoadTest.loadTOP20Table($('#seachTime').val(),intelligentRoadTest.checkedTopBar,params.name);
            }else{
                intelligentRoadTest.loadTOP20Table($('#seachTime').val(),intelligentRoadTest.city,params.name);
            }
            intelligentRoadTest.loadMap();
//			$('#city_2').html(params.name);
        });
    }

    chart.resize();

}
/**********************************
 * @funcname getFirstDayOfWeek
 * @funcdesc 通过传入的日期获取该日期对应的星期的周一和周日的日期
 * @param {Date} theDay (input optional)
 *  日期对象
 * @return 周一和周日的日期
 * @author 郑文彬
 * @create 20170921
 ***********************************/
intelligentRoadTest.getFirstDayOfWeek=function getFirstDayOfWeek (date) {
    var day = date.getDay() || 7;
    var date= new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day);
    var year=date.getFullYear()+"";
    var month=date.getMonth()+1+"";
    var d=date.getDate()+"";
    if(month.length==1){
        month="0"+month;
    }
    if(d.length==1){
        d="0"+d;
    }
    var d2=new Date(parseInt(year), parseInt(month)-1, parseInt(d)+6);
    var year2=d2.getFullYear()+"";
    var month2=d2.getMonth()+1+"";
    var d2=d2.getDate()+"";
    if(month2.length==1){
        month2="0"+month2;
    }
    if(d2.length==1){
        d2="0"+d2;
    }
    return  {"starTime":year+month+d,"endTime":year2+month2+d2};
};
/**********************************
 * @funcname intelligentRoadTest.submit
 * @funcdesc 切换日期时重新初始化页面
 * @param {string} date (input optional)
 *日期
 * @return {null}
 * @author 郑文彬
 * @create 20171017
 ***********************************/
intelligentRoadTest.submit=function submit(date){
//	$(".chartWrap").show();
//	$(".mapWrap").hide();
//	$('#tb_01').html("");
//	intelligentRoadTest.checkedTopBar=null;//上方选中的柱条
//	intelligentRoadTest.checkedBottomBar=null;//下方选中的柱条
//	showPage(date);
    intelligentRoadTest.map.clearOverlays();
    //根据最大时间查询显示上方柱状图
    intelligentRoadTest.loadTopBar(date);
    //根据用户区域信息及最大时间查询下方柱状图
    intelligentRoadTest.loadBottomBar(date,intelligentRoadTest.checkedTopBar);
    //查询右边top20数据
    if(intelligentRoadTest.city=="全省"){
        intelligentRoadTest.loadTOP20Table(date,intelligentRoadTest.checkedTopBar,intelligentRoadTest.checkedBottomBar);
    }else{
        intelligentRoadTest.loadTOP20Table(date,intelligentRoadTest.city,intelligentRoadTest.checkedBottomBar);
    }
    intelligentRoadTest.loadMap("1");


}

//----------郑文彬代码结束-------------------------------------
function endTime(){
    var year=$dp.cal.getP('y');
    var month=$dp.cal.getP('M');
    var day=$dp.cal.getP('d');
    var sevenDayLater= noceUtil.getSevenDayLater(year, month, day);
    var sTim=sevenDayLater.split("-");
    $("#seachTime").text(sTim[0]+sTim[1]+sTim[2]);
    intelligentRoadTest.submit(sTim[0]+sTim[1]+sTim[2]);
}
$(function() {

//	$(".city-list li").click(function () {
//		$(this).addClass("current").siblings().removeClass("current");
//		$(".select-name").removeClass("selectName");
//		$(this).parents(".select-city").find(".city-name").text($(this).text());
//		$(this).parents(".select-city").find(".city-selected").text($(this).text());
//		$(this).parents(".city-info").hide();
//	});
    // 下拉框
    $(".select-name").click(function () {
        $(this).siblings(".select-info").toggle();
    });
//	$(".select-info > a").click(function () {
//		$(this).addClass("selected").siblings().removeClass("selected");
//		$(this).parent().siblings().find(".selectA").text($(this).text());
//		$(".select-name").removeClass("selectName");
//		$(this).parent().hide();
//	});

    $(window).resize(function(){
//
        intelligentRoadTest.topChar.resize();

        intelligentRoadTest.bottomChar.resize();
//		$(".tableDiv").height($(".tableWrap").height()-$(".tableTitle").height()-20);

    });



    $("#leftIcon").click(function(){
        $(window).resize();
    });

    $(".closeDiv").click(function(){
        $(".chartWrap").show();
        $(".mapWrap").hide();
        $(this).css("background-color","#56B9FD");
        $(".tableTitle").css("background-color","#56B9FD");
        $('.tableTitle').unbind("click");
        /*点击xxx覆盖弱区分布显示当前区域的地图*/
        $(".tableTitle").click(function(){
//			$(".chartWrap").hide();
//			$(".mapWrap").show();
//			$(".progressBox").show();
//
//			$(".tableTitle").css("background-color","#BEBEBE");
        });
        $(window).resize();
    });
    /* 点击弱覆盖系数显示下拉列表  */
    $(".ratioTD .alltd").click(function(){
        $(".select-infos").show();
    });
//	$(".btn-sure").click(function(){
//		$(".select-info").hide();
//	});
    $(".closeProgress").click(function(){
        $(".progressBox").hide();
    });

//	$(".tableDiv").height($(".tableWrap").height()-$(".tableTitle").height()-20);
    /* 点击其他地方隐藏下拉列表  */
    $("body").click(function (e) {
        if($(e.target).closest(".ratioTD,.radioGroup,.selectCity").length == 0){
            $(".select-info,.select-infos").hide();
        };
    });

//	$('#AnalysisEntrance').click(function(){
//		var appId = noceUtil.GetQueryString("appId");
//		var menuId = noceUtil.GetQueryString("menuId");
//		var appName = noceUtil.GetQueryString("appId");
//		var city = "深圳";
//		var country = "宝安";
//		var mktcenter = "松岗";
//		var object_id = "75501300";
//		var day = "20171008";
//		window.open("pages_index_Index_home.action?appId="+appId+"&menuId="+menuId+
//				"&id_path=new&isRedirect=true&appName="+appName+
//				"&Analysis=1&city="+city+"&day="+day+"&country="+country+
//				"&mktcenter="+mktcenter+"&object_id="+object_id);
//	});
});
/**********************************
 * @funcname doFx
 * @funcdesc 跳至分析页面
 * @param {string} str (input optional)
 *跳转携带的参数
 * @return {null}
 * @author 郑文彬
 * @create 20171017
 ***********************************/
function doFx(str){
    var appId = noceUtil.GetQueryString("appId");
    var menuId = noceUtil.GetQueryString("menuId");
    var appName = noceUtil.GetQueryString("appId");
    var perId = noceUtil.GetQueryString("perId");
//	var city = "深圳";
//	var country = "宝安";
//	var mktcenter = "松岗";
//	var object_id = "75501300";
    var day = "20171008";
    window.open("pages_index_Index_home.action?appId="+appId+"&menuId="+menuId+"&perId="+perId+
        "&id_path=new&isRedirect=true&appName="+appName+
        "&Analysis=1&"+str);
}
//第二个时间选择后，更新第一个时间为一周前的时间
function seachTimeOnpicked(){
    var c = $dp.cal;
    var year = c.newdate['y'];
    var month = c.newdate['M'];
    var day = c.newdate['d'];

    if(month<10){
        month = "0"+month;
    }else{
        month = String(month);
    }
    if(day<10){
        day = "0"+day;
    }else{
        day = String(day);
    }

    var newDay = year+month+day;
    var enddate = new Date(year,month-1,day);
    var startdate = new Date(enddate.getTime()-6*24*60*60*1000);
    var startY = startdate.getFullYear();
    var startM = startdate.getMonth()+1;
    var startD = startdate.getDate();

    if(startM<10){
        startM = "0"+startM;
    }else{
        startM = String(startM);
    }
    if(startD<10){
        startD = "0"+startD;
    }else{
        startD = String(startD);
    }
    var time = startY+startM+startD;
    console.log("一周前日期："+time);
    $('#weekStartTime').text(time);
    intelligentRoadTest.submit(newDay);
}
/**********************************
 * @funcname getNewDate
 * @funcdesc 日期加减函数 传入日期字符串date（格式为2017/09/01）和加减天数days（减为负数），返回加减天后的日期
 * @param {Date} date (input optional)
 *  日期字符串（格式为2017/09/01）
 * @param {Date} days (input optional)
 *  加减天数
 * @return 返回加减后的日期字符串
 * @author 郑文彬
 * @create 20170921
 ***********************************/
function getNewDate(date,days){
    var d=new Date(date);
    var date= new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
    var year=date.getFullYear()+"";
    var month=date.getMonth()+1+"";
    var d=date.getDate()+"";
    if(month.length==1){
        month="0"+month;
    }
    if(d.length==1){
        d="0"+d;
    }
    return year+month+d;
}
function getZoom (maxLng, minLng, maxLat, minLat) {
    var zoom = ["50","100","200","500","1000","2000","5000","10000","20000","25000","50000","100000","200000","500000","1000000","2000000"];// 级别18到3。
    var pointA = new BMap.Point(maxLng,maxLat);  // 创建点坐标A
    var pointB = new BMap.Point(minLng,minLat);  // 创建点坐标B
    var distance = intelligentRoadTest.map.getDistance(pointA,pointB).toFixed(1);  // 获取两点距离,保留小数点后两位
    for (var i = 0,zoomLen = zoom.length; i < zoomLen; i++) {
        if(zoom[i] - distance > 0){
            return 18-i+3;// 之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
        }
    };
    return 3;
}
intelligentRoadTest.markerList=[];
intelligentRoadTest.drawMk=function drawMk(top20Data,polygonData){
    for(var k=0;k<intelligentRoadTest.markerList.length;k++){
        intelligentRoadTest.map.removeOverlay(intelligentRoadTest.markerList[k]);
    }
    intelligentRoadTest.markerList=[];
    // 百度地图API功能
    var f=1;
    for(var i=0;i< 10;i++){
        for(var j=0;j<polygonData.length;j++){
            try {


                if(polygonData[j].object_id==top20Data[i].object_id){
                    var point = new BMap.Point(polygonData[j].lng,polygonData[j].lat);
                    var myIcon = new BMap.Icon("../js/IntelligentRoadTest/images/marke.png", new BMap.Size(40,60));
                    var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
                    //				marker.setZIndex(1);
                    //				marker.setOffset(new BMap.Size(0,-15));
                    var label = new BMap.Label(f, {
                        offset : new BMap.Size(8, 8)
                    });
                    if(i>=9){
                        label = new BMap.Label(f, {
                            offset : new BMap.Size(5, 8)
                        });
                    }
                    label.setStyle({
                        background:'none',color:'#fff',border:'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
                    });
                    marker.setLabel(label);
                    marker.str="day="+$('#seachTime').val()+"&city="+polygonData[j].city+"&country="+polygonData[j].country+"&mktcenter="+polygonData[j].mktcenter+"&object_id="+polygonData[j].object_id
                    marker.addEventListener("click",function (e){
                        doFx(this.str);
                    });
                    intelligentRoadTest.markerList.push(marker);
                    intelligentRoadTest.map.addOverlay(marker);
                    f=f+1;
                }
            } catch (e) {
                // TODO: handle exception
            }
        }
    }
    // 将标注添加到地图中
//	marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
}
function addBands(CymapBjo){

    var pointArr = [];

    var badPolygonArrM = [];
    for(var j=0;j<OpersCompV3.boundry1.length;j++){
        var bmapPointArr = [];
        for(var i=0;i<OpersCompV3.boundry1[j].length;i++){

            var pointArr = OpersCompV3.boundry1[j][i].split(';');
            for(var b=0;b<pointArr.length;b++){
                var p = pointArr[b].split(',');
                bmapPointArr.push(new BMap.Point(p[0],p[1]));

            }
//				console.log(bmapPointArr);
        }
        var plyM = {type:"室外",points:bmapPointArr,decide:1};
        badPolygonArrM.push(plyM);
    }

    //var plyM = {type:"室外",points:bmapPointArr,decide:1};
    //badPolygonArrM.push(plyM);
    CymapBjo.polygonCanvasArr = 	badPolygonArrM;
    CymapBjo.draw();
}
intelligentRoadTest.selectTopBar=function intelligentRoadTest_selectTopBar(city){
//	var city="江门";
    //查询下方柱状图
    intelligentRoadTest.loadBottomBar($('#seachTime').val(),city);
    //查询右边top20数据
    if(intelligentRoadTest.city=="全省"){
        intelligentRoadTest.loadTOP20Table($('#seachTime').val(),city,intelligentRoadTest.bottomBarData[1].country);
    }else{
        intelligentRoadTest.loadTOP20Table($('#seachTime').val(),intelligentRoadTest.city,intelligentRoadTest.bottomBarData[0].mktcenter);
    }
    intelligentRoadTest.loadMap();
}
intelligentRoadTest.selectBottomBar=function intelligentRoadTest_selectBottomBar(city){
//	var city="江海";
    //查询右边top20数据
    $('#city_2').html(city);
    if(intelligentRoadTest.city=="全省"){
        intelligentRoadTest.loadTOP20Table($('#seachTime').val(),intelligentRoadTest.checkedTopBar,city);
    }else{
        intelligentRoadTest.loadTOP20Table($('#seachTime').val(),intelligentRoadTest.city,city);
    }
    intelligentRoadTest.loadMap();
    $('#cityList_2').hide();
}
Array.prototype.unique = function(){
    var res = [];
    var json = {};
    for(var i = 0; i < this.length; i++){
        if(!json[this[i]]){
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}

