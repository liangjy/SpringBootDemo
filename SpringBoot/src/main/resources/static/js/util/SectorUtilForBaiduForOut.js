/**
 * 百度地图canvas方式画基站扇区组件
 * @param bMapObj，配置信息
 * sectorColor：扇形呈现的颜色，默认为#3295e8
 * circleColor：圆呈现的颜色，默认为#d340c3
 * map：地图对象，必须传入
 * selectTime：查询的时间
 * useSelectTimeQuerySector：是否使用传入的时间查询扇区，默认不使用
 * useSelectSectorData：使用传入的数据呈现基站（暂未实现）
 * opacity:透明度0~1
 * zIndex：呈现canvas父层div的index
 * lineColor：画线的颜色,默认为#0000ff
 * selectCity：查询的地市
 * selectDistrict：查询的区县
 * selecMarketbase：查询的营服
 * selectNetType：网络类型，默认为4G
 * factory：厂家筛选
 * band：频率筛选
 * regon：场景筛选
 * indoor：室内外筛选
 * @returns {SectorUtilForBaidu}
 */
function SectorUtilForBaidu(bMapObj){
    if(bMapObj == undefined||bMapObj == null){
        alert("基站组件传入参数对象错误，请检查");
        return;
    }

    if(bMapObj.map == undefined || bMapObj.map == null){
        alert("基站组件传入地图参数错误，请检查");
        return;
    }
    this.cityForId = {
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
    this.cityString = ",广东,广州,深圳,珠海,佛山,东莞,惠州,中山,江门,肇庆,清远,茂名,湛江,汕头,汕尾,梅州,韶关,揭阳,潮州,云浮,河源,阳江,未知,";

    this.sectorColor = bMapObj.sectorColor==undefined?"#3295e8":bMapObj.sectorColor; //默认显示的扇形颜色，如果需要其他的颜色可以在参数中设置颜色
    this.circleColor = bMapObj.circleColor==undefined?"#d340c3":bMapObj.circleColor; //默认的圆形颜色，如果需要设置其他颜色可以在参数中设置
    this.map=bMapObj.map;//地图
    this.selectTime=bMapObj.selectTime;//缓存所选的时间
    this.useSelectTimeQuerySector=bMapObj.useSelectTimeQuerySector==undefined?false:true;//使用缓存时间查询扇区
    this.useSelectSectorData = bMapObj.useSelectSectorData;//使用传入的数据呈现基站
    this.opacity = bMapObj.opacity==undefined?"0.7":bMapObj.opacity;
    this.zIndex = bMapObj.zIndex == undefined?-1: bMapObj.zIndex;
    this.sectorZindex = bMapObj.sectorZindex == undefined?0:bMapObj.sectorZindex;
    this.lineColor = bMapObj.lineColor==undefined?"#270f3a":bMapObj.lineColor;
    //----showType,绘制扩容小区需要使用到这种
    this.showType = bMapObj.showType == undefined?null:bMapObj.showType;
    //sectorCell 基站小区用
    this.sectorCell = bMapObj.sectorCell == undefined?null:bMapObj.sectorCell;
    this.limit_type = bMapObj.limitType == undefined?null:bMapObj.limitType; //扩容小区中有一个紧急程度的字段
    this.selectTimeByKR = bMapObj.selectTimeByKR == undefined?"20171016":bMapObj.selectTimeByKR; //扩容小区的选择时间（跑数日期) 区别于selectTime
    this.result = null;
    this.ifCompleted = false;//查询是否完成
    this.selectCity=bMapObj.selectCity==undefined?null:bMapObj.selectCity; //缓存所选的城市
    this.selectDistrict=bMapObj.selectDistrict==undefined?null:bMapObj.selectDistrict; //缓存所选的区县
    this.selecMarketbase=bMapObj.selecMarketbase==undefined?null:bMapObj.selecMarketbase; //缓存所选的营服中心
    this.selectNetType=bMapObj.selectNetType==undefined?"4G":bMapObj.selectNetType;//缓存所选网络类型
    this.factory = bMapObj.factory==undefined?null:bMapObj.factory;//厂家
    this.band = bMapObj.band==undefined?null:bMapObj.band;//基站频率(只有4G基站会有)
    this.regon = bMapObj.regon==undefined?null:bMapObj.regon;//场景
    this.indoor = bMapObj.indoor==undefined?null:bMapObj.indoor;//室内外
//	this.isShowFactoryIcon = (bMapObj.isShowFactoryIcon==false||bMapObj.isShowFactoryIcon=="false")?false:true;
//	this.showHighStatn = (bMapObj.showHighStatn==false||bMapObj.showHighStatn=="false")?false:true;//是否呈现高价值

    //---lcj--
    this.ifShowLodingImage  = bMapObj.ifShowLodingImage==undefined?null : bMapObj.ifShowLodingImage; //是否在查询基站的时候显示正在加载数据的图片标识属性
    this.progressbarTwoMultiple = null; //作为一个可以取消查询的查询对象，可以通过调用这个对象的cancelSqlAjax方法取消ajax查询
    this.currentQueryCount = 0; //当前页面正在查询的进程的个数（基站查询）
    //---lcj--

    this.reloadPolygon = null;//需要重绘的扇形
    this.reloadPolygonColor = bMapObj.reloadPolygonColor==undefined?"yellow":bMapObj.reloadPolygonColor;
    this.polygonCanvasArr = [];//基站数据缓存,用于画canvas画基站
    this.sectorPolygon = [];//多边形或者圆对象缓存，用于判断地图点击时在哪个扇区或者基站内
    this.ImageLayer = null;//canvas图层
    this.infoWindow = null;//提示信息
    this.isBindMapEvent = bMapObj.isBindMapEvent==undefined?false:true;
    this.scopeDistance = 3;//范围6*6KM扇区
    this.bounds = null;



    this.allDataFlag = false;
    this.LastTimeSelectTime = null;//记录上一次全量查询的查询时间
    this.LastTimeSelectCity = null;//记录上一次全量查询的查询地市
    this.allDataFlagIsCompleted = false;//查全量数据的时候是否结束
    this.queryConditionIschange = false;
    this.isBackgroundQuerying = false;
    this.senes = bMapObj.senes==undefined?1:bMapObj.senes;//场景

    if(!this.isBindMapEvent){
//		this.map.addEventListener("zoomend",SectorUtilForBaidu.prototype.MapZoomAndDragEnd());
//		this.map.addEventListener("dragend",SectorUtilForBaidu.prototype.MapZoomAndDragEnd());
//		this.map.addEventListener("click",SectorUtilForBaidu.prototype.MapClickEvent());
    }else{

    }

    //如果未引入百度GeoUtils工具，则引入该工具（但是未测试是否能用20171025）
//	if("undefined" == typeof BMapLib.GeoUtils){
//		document.write('<script src="../js/util/GeoUtils.js"><\/script>');
//	}
}

SectorUtilForBaidu.prototype.cancleQuery = function(){
    if(this.progressbarTwoMultiple!=undefined){
        this.progressbarTwoMultiple.cancelSqlAjax();
        $('.progressBox').hide();
    }
}

/**********************************
 * @funcname queryByTemplate
 * @funcdesc 查询基站
 * @param {null}
 * @return {null}
 * @author 梁杰禹
 * @create 20171025
 ***********************************/
SectorUtilForBaidu.prototype.queryByTemplate=function(){
    if(this.senes==0){
        if(this.useSelectTimeQuerySector){
            if((this.LastTimeSelectTime!=this.selectTime||this.LastTimeSelectCity!=this.selectCity)
            ){

                this.queryConditionIschange = true;
                this.allDataFlagIsCompleted = false;
                this.LastTimeSelectTime = this.selectTime;
                this.LastTimeSelectCity = this.selectCity;

            }
        }else{
            if(this.LastTimeSelectCity!=this.selectCity
            ){
                this.queryConditionIschange = true;
                this.allDataFlagIsCompleted = false;
                this.LastTimeSelectCity = this.selectCity;
            }
        }
        //查询条件改变
        if(this.queryConditionIschange){
            this.queryByTemplateForScope();
        }else{
            //比例尺大于等于1000米
            if(this.map.getZoom()<=14){
                this.queryByTemplateForScope();

            }else{
                if(this.bounds!=null){
                    if(!this.allDataFlagIsCompleted){//全量查询还未完成
                        if(!this.bounds.containsBounds(this.map.getBounds())){//视野不在6*6KM范围内
                            this.queryByTemplateForScope();
                        }
                    }

                }else{
                    this.queryByTemplateForScope();
                }

            }
        }

//		return;
    }else if(this.senes==1){
        if(this.ifShowLodingImage == true){
            var obj = document.getElementById("lodingImage");
            if(obj == null){
                var div = "<div class='progressBox' id='lodingImage'>"
                    +"<input type='hidden' id='currentQueryCount' value='0'/>"
                    + "<div class='progressDiv'>"
                    + "<div class='progressLoading'>"
                    +"<div class='load-imgText'>"
                    +"<img src='../images/loading.gif' />"
                    +"<div>正在加载全量数据，请耐心等待......</div>"
                    +"</div>"
                    +"<button type='button' class='closeProgress'>"
                    +"<img src='../images/closeChart.png'/>"
                    +"</button>"
                    +"</div>"
                    +"</div>"
                    +"</div>";
                $("body").prepend(div);
            }
        }

        var list1 = [];
        var progressBarSqls=[],functionlist=[];
        if(this.showType == null){
            list1= ["SectorUtilForBaidu_01_querySector_onlyDrawField"];
            var nettype = "";
            var band = null;
            if(this.selectNetType == '4G' || this.selectNetType == null){
                nettype = "NETTYPE: and nettype = '4G'";
                if(this.band==null){
                    band = "BAND:";
                }else{
                    band = "BAND: and band = '"+this.band+"'";
                }
                list1.push(band);
            }else{
                nettype = "NETTYPE: and nettype <> '4G'";
            }
            list1.push(nettype);
            // list1.push(band);
            var timepara = "DAY:";
            if(this.useSelectTimeQuerySector){
                timepara = "DAY:"+ this.selectTime;
            }else{
                timepara = "DAY:(select max(day) from noce.dim_sector)";
            }
            list1.push(timepara);

            if(this.selectCity==null){
                list1.push("CITY:");
            }else{
                if(this.cityString.indexOf(','+this.selectCity+',')>0){
                    this.selectCity = this.cityForId[this.selectCity];
                }
                list1.push("CITY: and city_id="+this.selectCity);
//				this.cityChe = this.selectCity;
            }
            if(this.selectDistrict==null){
                list1.push("COUNTRY:");
            }else{
                list1.push("COUNTRY: and area_name = '"+this.selectDistrict+"'");
//				this.districtChe = this.selectDistrict;
            }
            if(this.selecMarketbase!=null && this.selecMarketbase!="全营服中心"){
                list1.push("MKTCENTER: and mkt_center_name = '"+this.selecMarketbase+"'");
            }else{
                list1.push("MKTCENTER:");
            }
        }else{//查询扩容小区
            list1 = ["SectorComponent_05_sqr_mkt_info"];
            if(this.band==null){
                band = "BAND:";
            }else{
                band = "BAND: and band = '"+this.band+"'";
            }
            list1.push(band);
            if(this.selectCity==null){
                list1.push("CITY:");
            }else{
                if(this.cityString.indexOf(','+this.selectCity+',')>0){
                    this.selectCity = this.cityForId[this.selectCity];
                }
                list1.push("CITY: and city_id="+this.selectCity);
//				this.cityChe = this.selectCity;
            }
            if(this.selectDistrict==null){
                list1.push("DISTRICT:");
            }else{
                list1.push("DISTRICT: and area_name = '"+this.selectDistrict+"'");
//				this.districtChe = this.selectDistrict;
            }
            if(this.limit_type==null || this.limit_type == ""){
                list1.push("LIMIT_TYPE:");
            }else{
                list1.push("LIMIT_TYPE: "+this.limit_type);
//				this.districtChe = this.selectDistrict;
            }
            list1.push("TIME: and day = " + this.selectTimeByKR);
        }

        //增加筛选条件
        if(this.regon==null){
            list1.push("REGON:");
        }else{
            list1.push("REGON:and REGION='"+this.regon+"'");
//			this.regonChe = this.regon;
        }

        if(this.indoor==null ){
            list1.push("INDOOR:");
        }else{
            list1.push("INDOOR:and IS_INDOOR='"+this.indoor+"'");
//			this.indoorChe = this.indoor;
        }

        if(this.factory==null){
            list1.push("FACTORY:");
        }else{
            list1.push("FACTORY:and BS_VENDOR='"+this.factory+"'");
//			this.factoryChe = this.factory;
        }
        this.ifCompleted = false;
        progressBarSqls.push(list1);
        functionlist.push(this.showSectorDate);
        var database = [3];
        if(this.ifShowLodingImage == true){
            $("#lodingImage").show();
        }
//		progressbarTwo.submitSql(progressBarSqls, functionlist,database,[this]);
        if(document.getElementById("currentQueryCount") != null){
            this.currentQueryCount = parseInt($("#currentQueryCount").val()) + 1;
            $("#currentQueryCount").val(this.currentQueryCount);
        }
        this.progressbarTwoMultiple = new progressbarTwoMultiple(progressBarSqls, functionlist ,database,[{self:this,queryType:0}]);
        var that = this;
        $(".closeProgress").click(function(){
            that.cancleQuery();
            that.progressbarTwoMultiple = null;
        });

    }


}
/**********************************
 * @funcname showSectorDate
 * @funcdesc 查询基站回调函数
 * @param {array}  data (input) 查询返回的数据结果集
 * @param {object}  thisObject (input) 自身对象，不传入自身对象，使用this获取到的是window对象
 * @return {null}
 * @author 梁杰禹
 * @create 20171025
 ***********************************/
SectorUtilForBaidu.prototype.showSectorDate = function SectorUtilForBaidu_showSectorDate(data,queryObject){
    var result = null;
//	{self:this,queryType:0}
    var thisObject = queryObject.self;
    var queryType = queryObject.queryType;

    if(!thisObject.isBackgroundQuerying&&thisObject.allDataFlagIsCompleted){
        if(thisObject.BackgroundQueryResult.result!=undefined){
            result = CallBackChangeDataUtil(thisObject.BackgroundQueryResult);
            if(thisObject.progressbarTwoMultiple!=null){
                thisObject.progressbarTwoMultiple.cancelSqlAjax();
                thisObject.progressbarTwoMultiple = null;
                thisObject.BackgroundQueryResult = null;
                thisObject.BackgroundQueryResult = {};
            }

        }else{
            result = CallBackChangeDataUtil(data);
        }
    }else{
        result = CallBackChangeDataUtil(data);
    }

    data = null;
    if(thisObject.result != null){
        thisObject.result = null;
        thisObject.result = [];
    }
    if(thisObject.showType != null){
        thisObject.result = result;
    }
    if(thisObject.sectorCell != null){
        if(result.length>0){
            thisObject.result = result;
        }else{
            thisObject.result = [];
        }

    }
    if(thisObject.allDataFlag){
        thisObject.allDataFlagIsCompleted = true;
    }
    thisObject.ifCompleted = true;
    thisObject.polygonCanvasArr = null;
    thisObject.polygonCanvasArr = [];
    thisObject.sectorPolygon = [];
    thisObject.reloadPolygon = null;
    for(var i=0;i<result.length;i++){
        var lng=result[i].longitude_baidu;
        var lat=result[i].latitude_baidu;
        var point=new BMap.Point(lng, lat);
        var ant_azimuth=result[i].ant_azimuth;
        var is_indoor=result[i].type;//室内外   2为室外 1为不为室外的
//		var band = result[i].band==null?"":result[i].band;//频段
        var band_order = result[i].band_order==null?2:result[i].band_order;//频段自定义排序字段
        var bandLevel = 3;
        if(2==is_indoor){
            //根据频段，扇区的高矮肥瘦不同   point.band==1.8GH时为默认
            var xy=0.0008;
            var z=3.5;
            var r = 6;
            //case band when '2.6GHz' then 4 when '2.1GHz' then 3 when '1.8GHz' then 2 when '800MHz' then 1 else 5 end as band_order
            if(band_order==4){
                xy=0.0004;
                z=0.8;
                r = 2;
                bandLevel = 1;
            }else if(band_order==3){
                xy=0.0006;
                z=1.8;
                r = 4;
                bandLevel = 2;
            }else if(band_order==1){
                xy=0.001;
                z=5.5;
                r = 8;
                bandLevel = 4;
            }

            var assemble = {};
            assemble.points = thisObject.add_sector(point,xy,xy,z,ant_azimuth);//得到扇形的点集合
            assemble.type = is_indoor;
//			var polygon=new BMap.Polygon(assemble.points);//生成多边形进行存储，用于判断点击时在哪个扇形内
//			assemble.band = band;
            assemble.bandLevel = bandLevel;
            assemble.statn_id=null==result[i].base_statn_id?"":result[i].base_statn_id;//基站编号
            assemble.cell_id=result[i].cell_id==null?"":result[i].cell_id;//小区编码
//			assemble.data = assemble;
//			assemble.sector_id=result[i].sector_id;//扇区ID
//			assemble.sector_name=null==result[i].sector_name?"":result[i].sector_name;//扇区名称
//			assemble.sector_addr=null==result[i].sector_addr?"":result[i].sector_addr;//扇区地址
//			assemble.ant_azimuth=null==ant_azimuth?"":ant_azimuth+"°";//扇区方位角
//			assemble.statn_name=null==result[i].base_statn_name?"":result[i].base_statn_name;//基站名称
//			assemble.vendor=null==result[i].bs_vendor?"":result[i].bs_vendor;//基站厂家
////			assemble.market=null==result[i].mkt_center_name?"":result[i].mkt_center_name;//营服中心
////			assemble.area=null==result[i].area_name?"":result[i].area_name;//区县
//			assemble.gps="("+result[i].longitude+","+result[i].latitude+")";//gps经纬度
//			assemble.cell_name=result[i].cell_name==null?"":result[i].cell_name;//小区名称
//			assemble.nettype=result[i].nettype==null?"":result[i].nettype;//网络类型
//			assemble.is_indoor=is_indoor;
//			assemble.band=null==result[i].band?"":result[i].band;//频段
//			assemble.ant_electron_angle=null==result[i].ant_electron_angle?"":result[i].ant_electron_angle;//电子下倾
//			assemble.ant_engine_angle=null==result[i].ant_engine_angle?"":result[i].ant_engine_angle;//机械下倾
//			assemble.high=null==result[i].high?"":result[i].high+"米";//天线挂高
//			assemble.acceptstatus=null==result[i].acceptstatus?"":result[i].acceptstatus;//验收状况
//			assemble.longitude=null==result[i].longitude?"":result[i].longitude;//经度
//			assemble.latitude=null==result[i].latitude?"":result[i].latitude;//纬度
//			assemble.bsc_id=null==result[i].bsc_id?"":result[i].bsc_id;//2G类型BSC编号
//			assemble.total_declination_angle=null==result[i].total_declination_angle?"":result[i].total_declination_angle;//2G类型总下倾角度
////			assemble.total_days = result[i].total_days;
//			assemble.city_name=result[i].city_name;//地市名称
//			assemble.area_name=result[i].area_name;//区县名称
//			assemble.mkt_center_name=result[i].mkt_center_name;//营服名称
//			thisObject.sectorPolygon.push(polygon);
            thisObject.polygonCanvasArr.push(assemble);//将扇形点集合进行存储
            assemble = null;
        }else{

            var radiusL = 15;
            var radiusS = 12;
            if(band_order==4){
                radiusL = 8;
                radiusS = 5;
                bandLevel = 1;
            }else if(band_order==3){
                radiusL = 12;
                radiusS = 9;
                bandLevel = 2;
            }else if(band_order==1){
                radiusL = 18;
                radiusS = 15;
                bandLevel = 4;
            }

            var assemble = {};
            assemble.radiusL = radiusL;
            assemble.radiusS = radiusS;
            assemble.type = is_indoor;
            assemble.point = point;

//			var circle = new BMap.Circle(point,radiusL);
//			assemble.data = assemble;
//			assemble.band = band;
            assemble.bandLevel = bandLevel;
            assemble.statn_id=null==result[i].base_statn_id?"":result[i].base_statn_id;//基站编号
            assemble.cell_id=result[i].cell_id==null?"":result[i].cell_id;//小区编码
//			assemble.sector_id=result[i].sector_id;//扇区ID
//			assemble.sector_name=null==result[i].sector_name?"":result[i].sector_name;//扇区名称
//			assemble.sector_addr=null==result[i].sector_addr?"":result[i].sector_addr;//扇区地址
//			assemble.ant_azimuth=null==ant_azimuth?"":ant_azimuth+"°";//扇区方位角
//			assemble.statn_name=null==result[i].base_statn_name?"":result[i].base_statn_name;//基站名称
//			assemble.vendor=null==result[i].bs_vendor?"":result[i].bs_vendor;//基站厂家
////			assemble.market=null==result[i].mkt_center_name?"":result[i].mkt_center_name;//营服中心
////			assemble.area=null==result[i].area_name?"":result[i].area_name;//区县
//			assemble.gps="("+result[i].longitude+","+result[i].latitude+")";//gps经纬度
//			assemble.cell_name=result[i].cell_name==null?"":result[i].cell_name;//小区名称
//			assemble.nettype=result[i].nettype==null?"":result[i].nettype;//网络类型
//			assemble.is_indoor=is_indoor;
//			assemble.band=null==result[i].band?"":result[i].band;//频段
//			assemble.ant_electron_angle=null==result[i].ant_electron_angle?"":result[i].ant_electron_angle;//电子下倾
//			assemble.ant_engine_angle=null==result[i].ant_engine_angle?"":result[i].ant_engine_angle;//机械下倾
//			assemble.high=null==result[i].high?"":result[i].high+"米";//天线挂高
//			assemble.acceptstatus=null==result[i].acceptstatus?"":result[i].acceptstatus;//验收状况
//			assemble.longitude=null==result[i].longitude?"":result[i].longitude;//经度
//			assemble.latitude=null==result[i].latitude?"":result[i].latitude;//纬度
//			assemble.bsc_id=null==result[i].bsc_id?"":result[i].bsc_id;//2G类型BSC编号
//			assemble.total_declination_angle=null==result[i].total_declination_angle?"":result[i].total_declination_angle;//2G类型总下倾角度
////			assemble.total_days = result[i].total_days;
//			assemble.city_name=result[i].city_name;//地市名称
//			assemble.area_name=result[i].area_name;//区县名称
//			assemble.mkt_center_name=result[i].mkt_center_name;//营服名称
//			thisObject.sectorPolygon.push(circle);
            thisObject.polygonCanvasArr.push(assemble);
            assemble = null;
        }
    }
//	thisObject.clear();
    thisObject.draw();
    if(queryType==0){//全量查询将查询计数减一
        if(document.getElementById("currentQueryCount") != null){
            this.currentQueryCount = parseInt($("#currentQueryCount").val()) - 1;
            if(this.currentQueryCount<=0){
                $("#currentQueryCount").val(0)
            }else{
                $("#currentQueryCount").val(this.currentQueryCount);
            }

            if(this.currentQueryCount <= 0){
                $("#lodingImage").hide();
            }
        }
    }

    thisObject.progressbarTwoMultiple = null;
    /*if(thisObject.ifShowLodingImage == true){
        $("#lodingImage").hide();
    }*/
    /*if(thisObject.showType == null){
        if(thisObject.sectorCell!=null && result.length>=0){
            $(".progressBox").hide();
        }
    }*/
}

/**********************************
 * @funcname draw
 * @funcdesc 回调函数将数据处理完后，将结果进行存放，调用本方法，根据基站室外或者室内进行绘制
 * @param {null}
 * @return {null}
 * @author 梁杰禹
 * @create 20171025
 ***********************************/
SectorUtilForBaidu.prototype.draw = function() {
    var thisObject = this;
    if(thisObject.ImageLayer!=null){
        thisObject.map.removeOverlay(thisObject.ImageLayer);
        thisObject.ImageLayer = null;
    }
    /*if(thisObject.showType != null){
        if(thisObject.sectorCell!=null && thisObject.result.length==0){
            $(".progressBox").hide();
        }
    }*/

    if(thisObject.polygonCanvasArr.length == 0) return;
    if(thisObject.map == null) return;
//	if(thisObject.map.getZoom()<16){
//
//	}else{
//		if(!thisObject.bounds.containsBounds(thisObject.map.getBounds())){
//			thisObject.queryByTemplate();
//			return;
//		}
//	}
    var canvas = $('<canvas width=' + thisObject.map.getSize().width + ' height=' + thisObject.map.getSize().height + ' "></canvas>')
    var context = canvas[0].getContext("2d");
    //context.fillStyle = "#FF0000";
    context.globalAlpha = thisObject.opacity;

    context.strokeStyle = thisObject.lineColor;
    context.lineWidth = 1;
    var zoom = thisObject.map.getZoom();
    var bounds = thisObject.add_bounds(thisObject.map.getBounds());
    var centerPoint = thisObject.map.getCenter();
    var addCenterPointLng = new BMap.Point(centerPoint.lng+0.1,centerPoint.lat);
    var addCenterPointLat = new BMap.Point(centerPoint.lng,centerPoint.lat+0.1);

    var distinceLng = thisObject.map.getDistance(centerPoint,addCenterPointLng);//0.1经度的距离
    var distinceLat = thisObject.map.getDistance(centerPoint,addCenterPointLat);//0.1纬度度的距离

    var onemeterLng = 0.1/distinceLng;//一米的经度长度
    var onemeterLat = 0.1/distinceLat;//一米的纬度长度
    $.each(this.polygonCanvasArr, function(i, item) {
        if(item.type == 2){
//			var assemble = {};
//			assemble.points = baiduSector.add_sector(point,xy,xy,z,ant_azimuth);//得到扇形的点集合
//			assemble.type = is_indoor;

            var point = item.points[0];
            if(item.decide==undefined){
                if(BMapLib.GeoUtils.isPointInRect(point, bounds)){
                    context.fillStyle = thisObject.sectorColor;
                    thisObject.drawItem(item, context, zoom);
                }
            }else{//预留使用画多边形
                context.fillStyle = thisObject.sectorColor;
                thisObject.drawItem(item, context, zoom);
            }

        }else{
//			var assemble = {};
//			assemble.radiusL = radiusL;
//			assemble.radiusS = radiusS;
//			assemble.type = is_indoor;
//			assemble.point = point;
            if(BMapLib.GeoUtils.isPointInRect(item.point, bounds)){
                var largeRadius = item.radiusL;//单位为米
                var smallRadius = item.radiusS;//单位为米

                var radiusCenterPoint = item.point;//圆心

                //水平方向加了大圆半径的经纬度    水平方向1米的经度*长度+圆心经度
                var lengPointLarge = new BMap.Point(onemeterLng*largeRadius+radiusCenterPoint.lng,radiusCenterPoint.lat);
                var lengPointSmall = new BMap.Point(onemeterLng*smallRadius+radiusCenterPoint.lng,radiusCenterPoint.lat);

                item.lengPointLarge = lengPointLarge;
                item.lengPointSmall = lengPointSmall;
                context.fillStyle = thisObject.circleColor;
                thisObject.drawCicle(item, context, zoom);
            }


        }

    });


    if(thisObject.reloadPolygon!=null){
        context.fillStyle = thisObject.reloadPolygonColor;
        if(thisObject.reloadPolygon.type==2){
            thisObject.drawItem(thisObject.reloadPolygon, context, zoom);
        }else{
            var largeRadius = thisObject.reloadPolygon.radiusL;//单位为米
            var smallRadius = thisObject.reloadPolygon.radiusS;//单位为米
            var radiusCenterPoint = thisObject.reloadPolygon.point;//圆心

            //水平方向加了大圆半径的经纬度    水平方向1米的经度*长度+圆心经度
            var lengPointLarge = new BMap.Point(onemeterLng*largeRadius+radiusCenterPoint.lng,radiusCenterPoint.lat);
            var lengPointSmall = new BMap.Point(onemeterLng*smallRadius+radiusCenterPoint.lng,radiusCenterPoint.lat);

            thisObject.reloadPolygon.lengPointLarge = lengPointLarge;
            thisObject.reloadPolygon.lengPointSmall = lengPointSmall;
            thisObject.drawCicle(thisObject.reloadPolygon, context, zoom);
        }
    }

    thisObject.ImageLayer = new BMap.GroundOverlay(thisObject.map.getBounds());
    thisObject.ImageLayer.setImageURL(canvas[0].toDataURL('image/png'));
    thisObject.ImageLayer.OverlayType = 'PolygonMapControls';
    thisObject.map.addOverlay(thisObject.ImageLayer);

//	thisObject.map.removeEventListener("zoomend",thisObject.MapZoomAndDragEnd(thisObject));
//	thisObject.map.removeEventListener("dragend",thisObject.MapZoomAndDragEnd(thisObject));
//	thisObject.map.removeEventListener("click",thisObject.MapClickEvent(thisObject));
//
//	thisObject.map.addEventListener("zoomend",thisObject.MapZoomAndDragEnd(thisObject));
//	thisObject.map.addEventListener("dragend",thisObject.MapZoomAndDragEnd(thisObject));
//	thisObject.map.addEventListener("click",thisObject.MapClickEvent(thisObject));
    canvas =  null;
    var div = null;
    if (thisObject.ImageLayer != null) {
        div = thisObject.ImageLayer.V;
    }

    if (div) {
        $(div).parent().css("z-index", thisObject.zIndex);
        if(thisObject.showType != null){
            $(div).css("z-index", thisObject.sectorZindex);
        }
    }

}


//绘制圆
/**********************************
 * @funcname drawCicle
 * @funcdesc 在canvas中绘制圆，分为外圆和内圆(需要将米转换成像素长度)
 * @param {array}  arr (input) 需要绘制的数据
 * @param {object}  cxt (input) canvas对象
 * @param {number}  zoom (input) 地图级别（暂未使用）
 * @return {null}
 * @author 梁杰禹
 * @create 20171025
 ***********************************/
SectorUtilForBaidu.prototype.drawCicle = function(arr, cxt, zoom) {

    var sw = this.map.pointToPixel(arr.point); //左下 圆心
    var rl =  this.map.pointToPixel(arr.lengPointLarge); //水平方向的像素位置,用于求半径
    var rs =  this.map.pointToPixel(arr.lengPointSmall); //水平方向的像素位置,用于求半径

    var radiusL = Math.sqrt((rl.x-sw.x)*(rl.x-sw.x)+(rl.y-sw.y)*(rl.y-sw.y));//计算半径
    var radiuss = Math.sqrt((rs.x-sw.x)*(rs.x-sw.x)+(rs.y-sw.y)*(rs.y-sw.y));//计算半径

    //大圆
    cxt.beginPath();
//	cxt.fillStyle = this.circleColor;
    cxt.arc(sw.x, sw.y, radiusL, 0, Math.PI * 2, true); //Math.PI*2是JS计算方法，是圆
    cxt.closePath();
    cxt.stroke();
    cxt.fill();

    //小圆
    cxt.beginPath();
    cxt.fillStyle = "white";
    cxt.arc(sw.x, sw.y, radiuss, 0, Math.PI * 2, true); //Math.PI*2是JS计算方法，是圆
    cxt.closePath();
    cxt.stroke();
    cxt.fill();

}
/**********************************
 * @funcname drawItem
 * @funcdesc 在canvas中绘制多边形
 * @param {array}  arr (input) 需要绘制的数据
 * @param {object}  cxt (input) canvas对象
 * @param {number}  zoom (input) 地图级别（暂未使用）
 * @return {null}
 * @author 梁杰禹
 * @create 20171025
 ***********************************/
//绘制多边形
SectorUtilForBaidu.prototype.drawItem = function(arr, cxt, zoom) {

    var points=[];
    for(var i=0;i<arr.points.length;i++){
        points.push(this.map.pointToPixel(arr.points[i]));
    }
    cxt.beginPath();
//	cxt.fillStyle=this.sectorColor;
    cxt.moveTo(points[0].x,points[0].y);
    for(var i=1;i<points.length;i++){
        cxt.lineTo(points[i].x,points[i].y)
    }
    cxt.closePath();
    cxt.stroke();
    cxt.fill();

}
/**********************************
 * @funcname clear
 * @funcdesc 清除图层
 * @param {null}
 * @return {null}
 * @author 梁杰禹
 * @create 20171025
 ***********************************/
//清除图层
SectorUtilForBaidu.prototype.clear = function() {
    if(this.map == null) return;
    if(this.ImageLayer != null) {
        this.map.removeOverlay(this.ImageLayer);
//		this.map.removeEventListener("zoomend",this.MapZoomAndDragEnd);
//		this.map.removeEventListener("dragend",this.MapZoomAndDragEnd);
//		this.map.removeEventListener("click",this.MapClickEvent);
        this.ImageLayer = null;
    }

}

/**********************************
 * @funcname getSectorPolygonByPoint
 * @funcdesc 获取到点击位置的扇区（包括扇形和圆）
 * @param {object} clickPoint 点击位置的经纬度
 * @return {array} clickPolygon 点击位置的扇区集合（根据频率进行排序后返回）
 * @author 梁杰禹
 * @create 20171025
 ***********************************/
SectorUtilForBaidu.prototype.getSectorPolygonByPoint = function(clickPoint){
    var clickPolygon = [];
    var bounds = this.add_bounds(this.map.getBounds());
    for(var i=0;i<this.polygonCanvasArr.length;i++){
        if(this.polygonCanvasArr[i].type==2){
//			var sectorPolygon = new BMap.Polygon(this.polygonCanvasArr[i].points);
//			var Polygon = {};
//			Polygon.points = districtPolygon.getPath();
//			Polygon.bounds = districtPolygon.getBounds();
            var polygonPoint = this.polygonCanvasArr[i].points[0];
            //先判断是否在视野范围内，再判断点是否在扇形内
            if(BMapLib.GeoUtils.isPointInRect(polygonPoint, bounds)){
                if(BMapLib.GeoUtils.isPointInPolygonForNOCE(clickPoint, this.polygonCanvasArr[i])){
                    var clickP = this.polygonCanvasArr[i];
                    clickPolygon.push(clickP);
                }
                sectorPolygon = null;
            }
            polygonPoint = null;

        }else{
//			var circle = new BMap.Circle(this.polygonCanvasArr[i].point,radiusL);
            var circlePoint = this.polygonCanvasArr[i].point;
            if(BMapLib.GeoUtils.isPointInRect(circlePoint, bounds)){
                var radiusL = 15;
                if(this.polygonCanvasArr[i].bandLevel==1){
                    radiusL = 8;
                }else if(this.polygonCanvasArr[i].bandLevel==2){
                    radiusL = 12;
                }else if(this.polygonCanvasArr[i].bandLevel==4){
                    radiusL = 18;
                }
                var distance = BMapLib.GeoUtils.getDistance(clickPoint,circlePoint);
                if(distance <= radiusL){
                    var clickP = this.polygonCanvasArr[i];
                    clickPolygon.push(clickP);
                    clickP = null;
                }
            }

            circlePoint = null;
        }
    }
    if(clickPolygon.length>1){
        clickPolygon.sort(function(a,b){
            return a.bandLevel - b.bandLevel;
        });
    }
    return clickPolygon;
}
/**********************************
 * @funcname MapZoomAndDragEnd
 * @funcdesc 地图拖拽、缩放后需要将图层重新绘制
 * @param {object} e 百度提供
 * @return {object} thisObject 本组件的对象，由于内部增加地图事件获取不到本组件对象，因此需要外部提供，这里只是提供一个接口
 * @author 梁杰禹
 * @create 20171025
 ***********************************/
SectorUtilForBaidu.prototype.MapZoomAndDragEnd = function(e,thisObject){
//	if(e==undefined){
//		return;
//	}
//	var thisObject = this;
    if(thisObject.polygonCanvasArr.length!=0){
        thisObject.clear();
        thisObject.draw();
    }else{
        return;
    }

    if(thisObject.senes==0){
        thisObject.queryByTemplateForScope();
    }

}
/**********************************
 * @funcname MapClickEvent
 * @funcdesc 点击时，呈现选中扇区的信息
 * @param {object} e 百度提供
 * @return {object} thisObject 本组件的对象，由于内部增加地图事件获取不到本组件对象，因此需要外部提供，这里只是提供一个接口
 * @author 梁杰禹
 * @create 20171025
 ***********************************/
SectorUtilForBaidu.prototype.MapClickEvent = function(e,thisObject){
//	if(e==undefined){
//		return;
//	}
//	var thisObject = this;
    var clickPoint = e.point;
    var mapContain = thisObject.map.getContainer();
    var mapid = $(mapContain).attr("id");
    var sectorCell = thisObject.sectorCell;
    var clickPolygon = [];
    if(thisObject.ImageLayer!=null){
        clickPolygon = thisObject.getSectorPolygonByPoint(clickPoint);
        var p = "";
        if(clickPolygon.length>=1){
            p = clickPolygon[0];
//			console.log(p.statn_id+"_"+p.cell_id);
//			thisObject.reloadPolygon = p.data;
            thisObject.reloadPolygon = clickPolygon[0];
            thisObject.clear();
            thisObject.draw();
        }else{
//			thisObject.reloadPolygon = null;
//			thisObject.clear();
//			thisObject.draw();
        }


        if(p==""){
            return clickPolygon;
        }else{
            var bstStr = "";
            for(var i=0;i<clickPolygon.length;i++){
                if(i<clickPolygon.length-1){
                    bstStr += clickPolygon[i].statn_id*1000000+clickPolygon[i].cell_id+",";
                }else{
                    bstStr += clickPolygon[i].statn_id*1000000+clickPolygon[i].cell_id;
                }

            }
//			console.log("匹配到的基站："+bstStr);
            //DAY BSTIDANDCELID
            var sqlList1 = ["SectorUtilForBaidu_01_querySector_ClickSector"];
            if(thisObject.useSelectTimeQuerySector==false){
                sqlList1.push("DAY:"+"(select max(day) from noce.dim_sector)");
            }else{
                sqlList1.push("DAY:"+thisObject.selectTime);
            }

            sqlList1.push("BSTIDANDCELLID:"+bstStr);
            var sqlList = [sqlList1];
            var functionList = [thisObject.ClickSectorInfo];
            progressbarTwo.submitSql(sqlList, functionList ,[3] , [[thisObject,clickPolygon,clickPoint]]);

        }

    }
    return clickPolygon;
}
//
SectorUtilForBaidu.prototype.ClickSectorInfo = function (data,objectAndSectorList){
    //objectAndSectorList = [thisObject,clickPolygon,clickPoint]

    var result = CallBackChangeDataUtil(data);
    data = null;
    var thisObject = objectAndSectorList[0];
    var clickPolygon = objectAndSectorList[1];
    var clickPoint = objectAndSectorList[2];
    if(clickPolygon.length!=result.length){
        console.log("error:查询结果长度和匹配到的扇区长度不一致");
    }
    //首先将查询会拉的数据进行位置对应
    var matchCell = [];
    for(var i = 0;i<clickPolygon.length;i++){
        for(var j=0;j<result.length;j++){
            if(clickPolygon[i].statn_id==result[j].base_statn_id
                &&clickPolygon[i].cell_id==result[j].cell_id){
                matchCell.push(result[j]);
            }
        }
    }

    if(matchCell.length!=0){
        var infoStr = "";
        if(thisObject.infoWindow == null){
            thisObject.infoWindow = new BMap.InfoWindow("");
        }else{

        }
        var p = matchCell[0];
        var infoTextId = "infowindowTextClassName";
        var title=""+p.is_indoor+"";
        var divStr = '<div class="'+infoTextId+'" style="margin:0;padding:2px;">';

        if(p.nettype == "4G"){
            infoStr += ""+p.is_indoor+"</br>";
            if(p.total_days == null){
                infoStr +="基站编号："+p.base_statn_id+"<br/>小区id："+p.cell_id+"<br/>小区名称："+p.cell_name+"<br/>频段："+p.band+
                    "<br/>方位角 ："+p.ant_azimuth+"°<br/>机械下倾："+p.ant_engine_angle+"<br/>电子下倾："+p.ant_electron_angle+"<br/>天线挂高："+
                    p.high+"米<br/>经度："+p.longitude+"<br/>纬度："+p.latitude+"<br/>验收状况："+p.acceptstatus+"<br/>站址地址："+p.sector_addr+"<br/>"
                    + "厂家：" + p.bs_vendor + "</br>";
            }else{
                infoStr +="基站编号："+p.base_statn_id+"<br/>小区id："+p.cell_id+"<br/>小区名称："+p.cell_name+"<br/>频段："+p.band+
                    "<br/>方位角 ："+p.ant_azimuth+"<br/>机械下倾："+p.ant_engine_angle+"<br/>电子下倾："+p.ant_electron_angle+"<br/>天线挂高："+
                    p.high+"<br/>经度："+p.longitude+"<br/>纬度："+p.latitude+"<br/>验收状况："+p.acceptstatus+"<br/>扩容标记累计天数："+p.total_days+"天<br/>站址地址："
                    +p.sector_addr+"<br/>" + "厂家：" + p.bs_vendor + "</br>";
            }


        }else{
            infoStr += ""+p.is_indoor+"</br>";
            if(p.total_days == null){
                infoStr +="BSC编号："+p.bsc_id+"<br/>基站编号："+p.base_statn_id+"<br/>基站名称："+p.statn_name+"<br/>扇区编号："+p.sector_id+"<br/>扇区名称："+p.sector_name+"<br/>天线方向角："+p.ant_azimuth+
                    "°<br/>总下倾角度 ："+p.total_declination_angle+"<br/>天线挂高："+p.high+"米<br/>扇区经度："+p.longitude+"<br/>扇区纬度："+p.latitude+"<br/>验收状况："+p.acceptstatus+"<br/>物理地址："+p.sector_addr+"</br>"
                    + "厂家：" + p.bs_vendor + "</br>";
            }else{
                infoStr +="BSC编号："+p.bsc_id+"<br/>基站编号："+p.base_statn_id+"<br/>基站名称："+p.statn_name+"<br/>扇区编号："+p.sector_id+"<br/>扇区名称："+p.sector_name+"<br/>天线方向角："+p.ant_azimuth+
                    "°<br/>总下倾角度 ："+p.total_declination_angle+"<br/>天线挂高："+p.high+"米<br/>扇区经度："+p.longitude+"<br/>扇区纬度："+p.latitude+"<br/>验收状况："+p.acceptstatus+"<br/>物理地址："+p.sector_addr+"<br/>扩容标志累计天数："+p.total_days + "天"
                    + "</br>"+ "厂家：" + p.bs_vendor + "</br>";
            }

        }

        var divStrTwo = null;
        var mapContain = thisObject.map.getContainer();
        var mapid = $(mapContain).attr("id");
        if(matchCell.length>1){
            var moreId = "infowindowTextMoreClassName";
            divStrTwo = '<div class="'+moreId+'" style="margin:0;padding:2px;overflow:auto;display:none;">';
            for(var j=1;j<matchCell.length;j++){
                var newInfoStr = "";
                if(matchCell[j].nettype == "4G"){
                    newInfoStr += ""+matchCell[j].is_indoor+"</br>";
                    if(matchCell[j].total_days == null){
                        newInfoStr +="基站编号："+matchCell[j].base_statn_id+"<br/>小区id："+matchCell[j].cell_id+"<br/>小区名称："+matchCell[j].cell_name+"<br/>频段："+matchCell[j].band+
                            "<br/>方位角 ："+matchCell[j].ant_azimuth+"°<br/>机械下倾："+matchCell[j].ant_engine_angle+"<br/>电子下倾："+matchCell[j].ant_electron_angle+"<br/>天线挂高："+
                            matchCell[j].high+"米<br/>经度："+matchCell[j].longitude+"<br/>纬度："+matchCell[j].latitude+
                            "<br/>验收状况："+matchCell[j].acceptstatus+"<br/>站址地址："+matchCell[j].sector_addr+"<br/>"+ "厂家：" + matchCell[j].bs_vendor + "</br>";
                    }else{
                        newInfoStr +="基站编号："+matchCell[j].base_statn_id+"<br/>小区id："+matchCell[j].cell_id+"<br/>小区名称："+matchCell[j].cell_name+"<br/>频段："+matchCell[j].band+
                            "<br/>方位角 ："+matchCell[j].ant_azimuth+"°<br/>机械下倾："+matchCell[j].ant_engine_angle+"<br/>电子下倾："+matchCell[j].ant_electron_angle+"<br/>天线挂高："+
                            matchCell[j].high+"米<br/>经度："+matchCell[j].longitude+"<br/>纬度："+matchCell[j].latitude+"<br/>验收状况："+matchCell[j].acceptstatus+
                            "<br/>扩容标记累计天数："+matchCell[j].total_days+"天<br/>站址地址："+matchCell[j].sector_addr+"<br/>"+ "厂家：" + matchCell[j].bs_vendor + "</br>";
                    }
                }else{
                    newInfoStr += ""+matchCell[j].is_indoor+"</br>";
                    if(matchCell[j].total_days == null){
                        newInfoStr +="BSC编号："+matchCell[j].bsc_id+"<br/>基站编号："+matchCell[j].base_statn_id+"<br/>基站名称："+matchCell[j].statn_name+
                            "<br/>扇区编号："+matchCell[j].sector_id+"<br/>扇区名称："+matchCell[j].sector_name+"<br/>天线方向角："+matchCell[j].ant_azimuth+
                            "°<br/>总下倾角度 ："+matchCell[j].total_declination_angle+"<br/>天线挂高："+matchCell[j].high+"米<br/>扇区经度："+matchCell[j].longitude+
                            "<br/>扇区纬度："+matchCell[j].latitude+"<br/>验收状况："+matchCell[j].acceptstatus+"<br/>物理地址："+matchCell[j].sector_addr+"</br>"+ "厂家：" + matchCell[j].bs_vendor + "</br>";
                    }else{
                        newInfoStr +="BSC编号："+matchCell[j].bsc_id+"<br/>基站编号："+matchCell[j].base_statn_id+"<br/>基站名称："+matchCell[j].statn_name+
                            "<br/>扇区编号："+matchCell[j].sector_id+"<br/>扇区名称："+matchCell[j].sector_name+"<br/>天线方向角："+matchCell[j].ant_azimuth+
                            "°<br/>总下倾角度 ："+matchCell[j].total_declination_angle+"<br/>天线挂高："+matchCell[j].high+"米<br/>扇区经度："+matchCell[j].longitude+
                            "<br/>扇区纬度："+matchCell[j].latitude+"<br/>验收状况："+matchCell[j].acceptstatus+"<br/>物理地址："+matchCell[j].sector_addr+
                            "厂家：" + matchCell[j].bs_vendor + "</br>"+"<br/>扩容标志累计天数："+matchCell[j].total_days + "天</br>";
                    }

                }
                divStrTwo +=newInfoStr+"</br>";
            }
            divStrTwo += '</div>';
            infoStr +="<a href='javascript:showMoreSectorInfo(\""+mapid+"\",\""+moreId+"\")' style='color: blue;text-decoration: underline;'>更多基站</a>"
        }

        divStr += infoStr;
        divStr +='</br></div>';
        if(divStrTwo!=null){
            divStr += divStrTwo;
        }
        thisObject.infoWindow.setContent(divStr);
//		infoWindow = new BMap.InfoWindow(divStr);// 创建信息窗口对象
        thisObject.infoWindow.textId = infoTextId;
        thisObject.map.openInfoWindow(thisObject.infoWindow,clickPoint); //开启信息窗口
    }

}

/**********************************
 * @funcname showMoreSectorInfo
 * @funcdesc 扇区提示信息中点击更多基站，触发的方法，需要将div呈现滚动条并将其他基站信息显示
 * @param {string} mapid 地图所在的div id
 * @return {string} moreClassName 其他基站信息所在的div的样式名称，主要用来查找该div并进行样式调整
 * @author 梁杰禹
 * @create 20171025
 ***********************************/
function showMoreSectorInfo(mapid,moreClassName){
    var moreInfoClass = $("#"+mapid).find('.'+moreClassName);
    $(moreInfoClass).show();
    $(moreInfoClass).prev().find('a').hide();
    $(moreInfoClass).parent().css("overflow","auto");
    $(moreInfoClass).parent().parent().css("overflow","auto");
}
/**********************************
 * @funcname add_sector
 * @funcdesc 根据基站的位置方位角计算出一个多边形
 * @param {object} centre 基站位置
 * @return
 * @author 梁杰禹
 * @create 20171025
 ***********************************/
SectorUtilForBaidu.prototype.add_sector=function (centre,x,y,z,ant_angle){
    var assemble=new Array();
    var angle;
    var dot;
    var tangent=x/y;
    assemble.push(centre);
    for(i=0;i<=3;i++)
    {
        angle = (2* Math.PI/6 / 3) * i/z+(ant_angle-30/z)/180*Math.PI;
        dot = new BMap.Point(centre.lng+Math.sin(angle)*y*tangent, centre.lat+Math.cos(angle)*y);
        assemble.push(dot);
    }
    return assemble;
}

/**********************************
 * @funcname CallBackChangeDataUtil
 * @funcdesc 回调函数数据格式转换方法，避免外部没有引入js报错
 * @param {array} data 查询返回的数据  {result:[],columns:[],type:[]}
 * @return {array} resultArray 格式化后的数据[{column1:result1,columns2:result2,....},{},{}]
 * @author 梁杰禹
 * @create 20171025
 ***********************************/
function CallBackChangeDataUtil(data) {
    var result = data.result;
    var cloumns = data.columns;
    var resultArray = [];
    if (result == undefined || cloumns == undefined) {
        return resultArray;
    }
    for ( var i = 0; i < result.length; i++) {
        var rs = result[i];
        var dataRsult = {};
        for ( var j = 0; j < rs.length; j++) {
            // var dataC = JSON.stringify(cloumns[j]);
            var dataC = cloumns[j];
            var dataR = rs[j];
            dataRsult[dataC] = dataR;
        }
        resultArray.push(dataRsult);
    }
    return resultArray;
}

function reverseChangeDataUtil(result){
    var data = {};
    var columns = [];
    var dataResult = [];
    if($.isArray(result)){
        for(var i=0;i<result.length;i++){
            if(i==0){
                for(var k in result[i]){
                    columns.push(k);
                }
            }
            var d = [];
            for(var j=0;j<columns.length;j++){
                d.push(result[i][columns[j]]);
            }
            dataResult.push(d);
        }
    }
    data.columns = columns;
    data.result = dataResult;
    return data;
}

/**********************************
 * @funcname add_bounds
 * @funcdesc 可以范围进行扩大最大室外扇区的经纬度
 * @param {object} bounds 可视范围对象
 * @return {object} newBounds 扩大后的可视范围对象
 * @author 梁杰禹
 * @create 20171120
 ***********************************/
SectorUtilForBaidu.prototype.add_bounds=function SectorUtilForBaidu_prototype_add_bounds(bounds){

//	经度偏移量：0.000980657
//	纬度偏移量：0.000899322
//	getSouthWest()	Point	返回矩形区域的西南角    左下角
//	getNorthEast()	Point	返回矩形区域的东北角    右上角
    var sw = bounds.getSouthWest();// 左下角
    var ne = bounds.getNorthEast();// 右上角

    var newSW = new BMap.Point(sw.lng-0.000980657,sw.lat-0.000899322);
    var newNE = new BMap.Point(ne.lng+0.000980657,ne.lat+0.000899322);
    var newBounds = new BMap.Bounds(newSW,newNE);
    return newBounds;

}


SectorUtilForBaidu.prototype.queryByTemplateForScope = function (){
    var list1 = [];
    var progressBarSqls=[],functionlist=[];
//		list1= ["SectorUtilForBaidu_01_querySector_onlyDrawField"];
//		list1= ["SectorUtilForBaidu_01_querySector"];
    list1= ["SectorUtilForBaidu_01_querySector_ByScope_OnlyDrawField"];
    var centerPoint = this.map.getCenter();
    var boundMax_lng = centerPoint.lng+0.00980657*this.scopeDistance;
    var boundMin_lng = centerPoint.lng-0.00980657*this.scopeDistance;
    var boundMax_lat = centerPoint.lat+0.00899322*this.scopeDistance;
    var boundMin_lat = centerPoint.lat-0.00899322*this.scopeDistance;

    this.bounds = new BMap.Bounds(new BMap.Point(boundMin_lng,boundMin_lat),new BMap.Point(boundMax_lng,boundMax_lat));

    list1.push("CENTERLONGITUDE:"+centerPoint.lng);
    list1.push("CENTERLATITUDE:"+centerPoint.lat);
    list1.push("KM:"+this.scopeDistance);

    var tempList = [];
    var nettype = "";
    var band = null;
    if(this.selectNetType == '4G' || this.selectNetType == null){
        nettype = "NETTYPE: and nettype = '4G'";
        if(this.band==null){
            band = "BAND:";
        }else{
            band = "BAND: and band = '"+this.band+"'";
        }
        tempList.push(band);
    }else{
        nettype = "NETTYPE: and nettype <> '4G'";
    }
    tempList.push(nettype);
    // list1.push(band);
    var timepara = "DAY:";
    if(this.useSelectTimeQuerySector){
        timepara = "DAY:"+ this.selectTime;
    }else{
        timepara = "DAY:(select max(day) from noce.dim_sector)";
    }
    tempList.push(timepara);

    if(this.selectCity==null){
        tempList.push("CITY:");
    }else{
        if(this.cityString.indexOf(','+this.selectCity+',')>0){
            this.selectCity = this.cityForId[this.selectCity];
        }
        tempList.push("CITY: and city_id="+this.selectCity);
//			this.cityChe = this.selectCity;
    }
    if(this.selectDistrict==null){
        tempList.push("COUNTRY:");
    }else{
        tempList.push("COUNTRY: and area_name = '"+this.selectDistrict+"'");
//			this.districtChe = this.selectDistrict;
    }
    if(this.selecMarketbase!=null && this.selecMarketbase!="全营服中心"){
        tempList.push("MKTCENTER: and mkt_center_name = '"+this.selecMarketbase+"'");
    }else{
        tempList.push("MKTCENTER:");
    }

    //增加筛选条件
    if(this.regon==null){
        tempList.push("REGON:");
    }else{
        tempList.push("REGON:and REGION='"+this.regon+"'");
//		this.regonChe = this.regon;
    }

    if(this.indoor==null ){
        tempList.push("INDOOR:");
    }else{
        tempList.push("INDOOR:and IS_INDOOR='"+this.indoor+"'");
//		this.indoorChe = this.indoor;
    }

    if(this.factory==null){
        tempList.push("FACTORY:");
    }else{
        tempList.push("FACTORY:and BS_VENDOR='"+this.factory+"'");
//		this.factoryChe = this.factory;
    }

    list1 = list1.concat(tempList);
    this.ifCompleted = false;
    progressBarSqls.push(list1);
    functionlist.push(this.showSectorDate);
    var database = [3];
    this.allDataFlag = false;

    //后台查询全量数据
    if(!this.isBackgroundQuerying&&!this.allDataFlagIsCompleted){
        var list2 =["SectorUtilForBaidu_01_querySector_onlyDrawField"];
//		var list2 =["SectorUtilForBaidu_01_querySector"];
        list2 = list2.concat(tempList);
        var pSqls = [list2];
        var fList = [this.BackgroundQueryShowSectorDate];
        var dbase = [3];
        this.allDataFlagIsCompleted = false;
        this.isBackgroundQuerying = true;
        this.progressbarTwoMultipleTwo = new progressbarTwoMultiple(pSqls, fList ,dbase,[{self:this,queryType:2}]);
        //{self:this,queryType:0}   self:组件实例          queryType:查询类型 0：全量，1：局部
    }
    //增加锁屏
    if(this.map.getZoom()<=14&&this.isBackgroundQuerying&&!this.allDataFlagIsCompleted){
        if(this.ifShowLodingImage){
            var obj = document.getElementById("lodingImage");
            if(obj == null){
                var div = "<div class='progressBox' id='lodingImage'>"
                    +"<input type='hidden' id='currentQueryCount' value='0'/>"
                    + "<div class='progressDiv'>"
                    + "<div class='progressLoading'>"
                    +"<div class='load-imgText'>"
                    +"<img src='../images/loading.gif' />"
                    +"<div>正在加载全量数据，请耐心等待......<br>如希望快速响应，请把地图放大至比例尺为500米及以下</div>"
                    +"</div>"
                    +"<button type='button' class='closeProgress'>"
                    +"<img src='../images/closeChart.png'/>"
                    +"</button>"
                    +"</div>"
                    +"</div>"
                    +"</div>";
                $("body").prepend(div);
            }
            $("#lodingImage").show();
            var that = this;
            $(".closeProgress").click(function(){
//				that.cancleQuery();
//				that.progressbarTwoMultiple = null;
                if(that.progressbarTwoMultipleTwo!=null){
                    that.progressbarTwoMultipleTwo.cancelSqlAjax();
                    that.progressbarTwoMultipleTwo = null;
                }

                if(that.progressbarTwoMultiple!=null){
                    that.progressbarTwoMultiple.cancelSqlAjax();
                    that.progressbarTwoMultiple = null;
                }
//				that.clear();
                that.allDataFlagIsCompleted = true;
                that.isBackgroundQuerying = false;
//				that.polygonCanvasArr = null;
//				that.polygonCanvasArr = [];

                $('.progressBox').hide();


            });
            //起定时器判断全量查询是否结束
            setTimeout(function(){
                that.timeoutFunc();
            },300);

        }

    }

    if(this.map.getZoom()>14&&!this.allDataFlagIsCompleted){
        if(this.progressbarTwoMultiple==null){
            //查局部范围数据
            this.progressbarTwoMultiple = new progressbarTwoMultiple(progressBarSqls, functionlist ,database,[{self:this,queryType:1}]);
        }else{
            this.progressbarTwoMultiple.cancelSqlAjax();
            this.progressbarTwoMultiple = null;
            this.progressbarTwoMultiple = new progressbarTwoMultiple(progressBarSqls, functionlist ,database,[{self:this,queryType:1}]);
        }

    }

}

SectorUtilForBaidu.prototype.BackgroundQueryShowSectorDate = function (data,queryObject){
//	console.log(data);
    var thisObject = queryObject.self;
    var queryType = queryObject.queryType;
    if(queryType==2){
//		console.log("全量查询结束");
        thisObject.BackgroundQueryResult = data;
        thisObject.isBackgroundQuerying = false;
        thisObject.allDataFlagIsCompleted = true;

        if(thisObject.progressbarTwoMultipleTwo!=null){
//			this.progressbarTwoMultipleTwo.cancleQuery();
            thisObject.progressbarTwoMultipleTwo = null;
        }

        if(thisObject.progressbarTwoMultiple==null){
            thisObject.showSectorDate(data,queryObject);
        }
        data = null;
    }


}

SectorUtilForBaidu.prototype.timeoutFunc = function (){
//	console.log(this);
    if(!this.isBackgroundQuerying&&this.allDataFlagIsCompleted){
        $("#lodingImage").hide();
    }else{
        var that = this;
        setTimeout(function(){
            that.timeoutFunc();
        },300);
    }

}

/**********************************
 * @funcname CallBackChangeDataUtil
 * @funcdesc 回调函数数据格式转换方法，避免外部没有引入js报错
 * @param {array} data 查询返回的数据  {result:[],columns:[],type:[]}
 * @return {array} resultArray 格式化后的数据[{column1:result1,columns2:result2,....},{},{}]
 * @author 梁杰禹
 * @create 20171025
 ***********************************/
function CallBackChangeDataUtil(data) {
	var result = data.result;
	var cloumns = data.columns;
	var resultArray = [];
	if (result == undefined || cloumns == undefined) {
		return resultArray;
	}
	for ( var i = 0; i < result.length; i++) {
		var rs = result[i];
		var dataRsult = {};
		for ( var j = 0; j < rs.length; j++) {
			// var dataC = JSON.stringify(cloumns[j]);
			var dataC = cloumns[j];
			var dataR = rs[j];
			dataRsult[dataC] = dataR;
		}
		resultArray.push(dataRsult);
	}
	return resultArray;
}



function isUndefined(obj){
	if("undefined"==typeof(obj)||obj==""||obj==null){
		return true;
	}else{
		return false;
	}
};

//-----------------------------------progressbartwo-------------------------------

var progressbarTwo = {};





/**********************************
 * @funcname progressbarTwo.submitSql
 * @funcdesc 查询组件入口，首先判断参数，如果使用impala的异步查询，则使用impala异步查询逻辑，再判断是组件查询，然后判断是否是同步请求进行查询，如果前面的都不符合，则使用正常的异步请求进行查询
 * @param {array} sqllist (input ) 数组的每个为替换sql模板的参数数组  格式：[["id","key:value","key:value",…],[ "id","key:value","key:value",…],...]
 * @param {array} functionlist (input ) 数组的每个为查询的回调函数 格式:[func1,func2,...]
 * @param {array} dataBase (input optional) 如果不传该参数，则默认使用impala的同步查询（默认为2），3：mysql 4：hbase thrift 5：Elasticsearch 6：postgreSql 7：hbase api（无认证的方式）
 * @param {array} paraArray (input optional) 往回调函数带入的参数（对象、数组等），如果要带入，则需要一一对应，比如在第三个查询模板带入，则需要将前两个位置填满，第三个位置放入需要带入的参数
 * @param {boolean} isAsync_ImpalaQuery (input optional) 该参数为true的时候使用impala的后台异步查询，其他情况为不使用impala的异步查询
 * @param {number} callType (input optional) 使用的组件标识，目前暂时只有一个组件使用（1：表格组件）
 * @param {object} callPara (input optional) 本参数需要和callType配合使用，请求会将这个对象发送到后台（如果增加组件，则需要在后台新增实体类接收该参数）进行sql拼接后者其他处理
 * callPara = {
		"sql":sqlPara,
		"sortColumn":sortColumn,
		"pageSize":pageSize,
		"pageIndex":pageIndex,
		"thead":thead,
		"sortType":sortType,
		"dataType":dataType,
		"pageFlag":pageFlag,
		"sceneId":sceneId
	};
	sceneId:场景0的功能展示:
	a.	加载更多。
	b.	排序（可升降排序）
	c.	导出。
	d.	超长缩略（前后取10个字符，鼠标浮动显示完整信息）。
	e.	数值型样式右对齐，字符型左对齐。
	场景1的功能展示:
	a.实现复杂表头（表头可跨列）
	b.支持按列或按行冻结
	c.支持表头或按列绑定函数（包括悬停、单击、双击）
	d.支持表头或按列指定css class,class名称可以整列相同，可以按列值对应，可以按取值范围对应
	e.支持不分页，不添加表头排序，不指定order by字段
	f.支持前端直接提供数据去生成表格
 * 
 * 
 * 
 * @param {boolean} isSync (input optional) 本参数标识使用ajax的同步请求，即一个请求处理完才发起下一个请求
 * @return null
 * @author 梁杰禹	
 * @create 20170808
 * @modifier  
 * @modify  
 ***********************************/
progressbarTwo.submitSql = function(sqllist, functionlist,dataBase,paraArray,isAsync_ImpalaQuery,callType,callPara,isSync,dbName) {
	if(dbName!=undefined||dbName!=null){
		for ( var i = 0; i < sqllist.length; i++) {  
			progressbarTwo.submitSqlAjax(sqllist[i],functionlist[i],dataBase[i],null,null,dbName[i]);
		}
		return;
	}
	if(isAsync_ImpalaQuery==undefined||isAsync_ImpalaQuery==null){
		isAsync_ImpalaQuery = false;
	}
	if(isSync==undefined||isSync==null){
		isSync = false;
	}
	if(callType == undefined || callType==null){
		callType = false;
	}
	
	if(isUndefined(paraArray)){
		paraArray = [];
	}
	
	if(sqllist.length==0){
		alert("传入的sql参数长度为0，请检查....");
		return;
	}
	
	if(isAsync_ImpalaQuery){
		//progressbarTwo.submitSqlAsync(sqllist,functionlist,paraArray,callType,callPara); //-----
		return;
	}
	if(isUndefined(dataBase)){
		dataBase = [];
	}
	
	if(callType==1||callType=="1"){
		var paraUrl = progressbarTwo.getParaUrl(1,callPara);
		progressbarTwo.submitSqlAjax(sqllist[0], functionlist[0],dataBase[0],paraArray[0],paraUrl);  //--------
		return;
	}
	
	if(isSync){
		//依次对每条sql提交查询
		for ( var i = 0; i < sqllist.length; i++) {  
			if(dataBase[i]==null||dataBase[i]==undefined||dataBase[i].length==0){
				dataBase[i] = 2;
			}
			progressbarTwo.submitSqlSync(sqllist[i], functionlist[i],dataBase[i],paraArray[i]); //-------
		}
		return;
	}
	//依次对每条sql提交查询
	for ( var i = 0; i < sqllist.length; i++) {  
		if(dataBase[i]==null||dataBase[i]==undefined||dataBase[i].length==0){
			dataBase[i] = 2;
		}
		progressbarTwo.submitSqlAjax(sqllist[i], functionlist[i],dataBase[i],paraArray[i]);
	}
};


/**********************************
 * @funcname progressbarTwo.submitSqlAjax
 * @funcdesc ajax异步请求，同步查询数据
 * @param {array} sqlParaList (input) 模板参数数组 格式：["id","key:value","key:value",…]
 * @param {function} callBackFunc (input) 回调函数 格式: func1方法
 * @param {number} dataBase (input) 数据库类型
 * @param {object} paraArray (input optional) 往回调函数中放入的参数 说明：附带上的参数
 * @param {string} paraUrl (input optional) 组件拼装的url
 * @return {null}
 * @author 梁杰禹
 * @create 20170808
 * @modifier 
 * @modify 
 ***********************************/
progressbarTwo.submitSqlAjax = function(sqlParaList, callBackFunc,dataBase,paraAny,paraUrl,databaseName){
	if(paraUrl==""||paraUrl==undefined||paraUrl==null){
		paraUrl = "";
	}
	noce.ajax("http://132.96.171.45:8080/NOCE/portal/pages_util_ProgressbarTwo_submitCmd.action", "cmd=" + encodeURIComponent(JSON.stringify(sqlParaList)) + "&database=" + dataBase +paraUrl+"&dbName="+databaseName, function(data) {
		if(isUndefined(paraAny)){
			callBackFunc(data);
		}else{
			callBackFunc(data,paraAny);
		}
		
	}, true);
	
};


/**********************************
 * @funcname progressbarTwo.submitSqlSync
 * @funcdesc ajax同步请求，同步查询数据
 * @param {array} sqlParaList (input) 模板参数数组 格式：["id","key:value","key:value",…]
 * @param {function} callBackFunc (input) 回调函数 格式: func1方法
 * @param {number} dataBase (input) 数据库类型
 * @param {object} paraArray (input optional) 往回调函数中放入的参数 说明：附带上的参数
 * @param {string} paraUrl (input optional) 组件拼装的url
 * @return {null}
 * @author 梁杰禹
 * @create 20170808
 * @modifier 
 * @modify 
 ***********************************/
progressbarTwo.submitSqlSync = function(sqlParaList, callBackFunc,dataBase,paraAny,paraUrl){
	if(paraUrl==""||paraUrl==undefined||paraUrl==null){
		paraUrl = "";
	}
	
	noce.ajaxAsync("http://132.96.171.45:8080/NOCE/portal/pages_util_ProgressbarTwo_submitCmd.action", "cmd=" + encodeURIComponent(JSON.stringify(sqlParaList)) + "&database=" + dataBase +paraUrl, function(data) {
		//回调开始  声明一个回调开始时间
		if(isUndefined(paraAny)){
			callBackFunc(data);
		}else{
			callBackFunc(data,paraAny);
		}
	});
};



//------------------增加多实例的提交方法，适用于可取消本次的ajax请求-------------------------
function progressbarTwoMultiple(sqllist, functionlist, dataBase, paraArray, isAsync_ImpalaQuery, callType, callPara, isSync, dbName) {
    this.sqllist = sqllist;
    this.functionlist = functionlist;
    this.dataBase = dataBase;
    this.paraArray = paraArray;
    this.isAsync_ImpalaQuery = isAsync_ImpalaQuery;
    this.callType = callType;
    this.callPara = callPara;
    this.isSync = isSync;
    this.dbName = dbName;
    this.sqlListCount = 0;
    this.completeCount = 0;
    this.sqlListAjax = [];
    if (dbName != undefined || dbName != null) {
        this.sqlListCount = sqllist.length;
        for (var i = 0; i < sqllist.length; i++) {
            this.submitSqlAjax(sqllist[i], functionlist[i], dataBase[i], null, null, dbName[i]);
        }
        return;
    }
    if (isAsync_ImpalaQuery == undefined || isAsync_ImpalaQuery == null) {
        isAsync_ImpalaQuery = false;
    }
    if (isSync == undefined || isSync == null) {
        isSync = false;
    }
    if (callType == undefined || callType == null) {
        callType = false;
    }

    if (isUndefined(paraArray)) {
        paraArray = [];
    }

    if (sqllist.length == 0) {
        alert("传入的sql参数长度为0，请检查....");
        return;
    }
    //impala后台异步查询
    if (isAsync_ImpalaQuery) {
        // progressbarTwo.submitSqlAsync(sqllist, functionlist, paraArray, callType, callPara); // -----
        return;
    }
    if (isUndefined(dataBase)) {
        dataBase = [];
    }

    if (callType == 1 || callType == "1") {
        this.sqlListCount = 1;
        var paraUrl = progressbarTwo.getParaUrl(1, callPara);
        this.submitSqlAjax(sqllist[0], functionlist[0], dataBase[0], paraArray[0], paraUrl);  // --------
        return;
    }

    if (isSync) {
        // 依次对每条sql提交查询
        this.sqlListCount = sqllist.length;
        for (var i = 0; i < sqllist.length; i++) {
            if (dataBase[i] == null || dataBase[i] == undefined || dataBase[i].length == 0) {
                dataBase[i] = 2;
            }
            this.submitSqlSync(sqllist[i], functionlist[i], dataBase[i], paraArray[i]); // -------
        }
        return;
    }

    //依次对每条sql提交查询
    this.sqlListCount = sqllist.length;
    for (var i = 0; i < sqllist.length; i++) {
        if (dataBase[i] == null || dataBase[i] == undefined || dataBase[i].length == 0) {
            dataBase[i] = 2;
        }
        this.submitSqlAjax(sqllist[i], functionlist[i], dataBase[i], paraArray[i]);
    }


}

progressbarTwoMultiple.prototype = {
    sqllist: [],
    functionlist: [],
    dataBase: [],
    paraArray: [],
    isAsync_ImpalaQuery: false,
    callType: 1,
    callPara: {},
    isSync: false,
    dbName: null,
    sqlListCount: 0,
    completeCount: 0,
    sqlListAjax: [],
    submitSqlAjax: function (sqlParaList, callBackFunc, dataBase, paraAny, paraUrl, databaseName) {
        if (paraUrl == "" || paraUrl == undefined || paraUrl == null) {
            paraUrl = "";
        }
        var $ajax = noce.ajax("http://132.96.171.45:8080/NOCE/portal/pages_util_ProgressbarTwo_submitCmd.action", "cmd=" + encodeURIComponent(JSON.stringify(sqlParaList)) + "&database=" + dataBase  + paraUrl + "&dbName=" + databaseName, function (data) {
            //回调开始
            if (isUndefined(paraAny)) {
                callBackFunc(data);
            } else {
                callBackFunc(data, paraAny);
            }
            this.completeCount++;
            if (this.completeCount == this.sqlListCount) {
                console.log("submitSqlAjax：sql查询完成");
            }
            //回调结束
        }, true);
        this.sqlListAjax.push($ajax);
    },
    submitSqlSync: function (sqlParaList, callBackFunc, dataBase, paraAny, paraUrl) {
        if (paraUrl == "" || paraUrl == undefined || paraUrl == null) {
            paraUrl = "";
        }
        var $ajax = noce.ajaxAsync("http://132.96.171.45:8080/NOCE/portal/pages_util_ProgressbarTwo_submitCmd.action", "cmd=" + encodeURIComponent(JSON.stringify(sqlParaList)) + "&database=" + dataBase  + paraUrl, function (data) {

            //回调开始
            if (isUndefined(paraAny)) {
                callBackFunc(data);
            } else {
                callBackFunc(data, paraAny);
            }

            this.completeCount++;
            if (this.completeCount == this.sqlListCount) {
                console.log("submitSqlSync：sql查询完成");
            }
            //回调结束
        });
        this.sqlListAjax.push($ajax);

    },
    cancelSqlAjax: function () {
        for (var i = 0; i < this.sqlListAjax.length; i++) {
            if (this.sqlListAjax[i] != null && this.sqlListAjax[i].state() === 'pending') {
                this.sqlListAjax[i].abort();
            }
        }
        this.sqlListAjax = null;
        this.sqlListAjax = [];
    }
}


//------------------增加多实例的提交方法，适用于可取消本次的ajax请求 end -------------------------







//------------------------------------progressbartwo--------------------------------
//
//function flightHandler(data){
//	console.log(data);
//}

//--------------------------------noce.ajaxAll---------------------------------------------
/*****************************************************************
jQuery Ajax封装通用类       
*****************************************************************/
var noce = {};
/**
* ajax封装
* url 发送请求的地址
* data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
* async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
*       注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
* type 请求方式("POST" 或 "GET")， 默认为 "GET"
* dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
* successfn 成功回调函数
* errorfn 失败回调函数
*/
noce.ajaxAll=function(url, data, async, type, dataType, successfn, errorfn,showLoad) {
//  async = (async==null || async=="" || typeof(async)=="undefined")? "true" : async;
	showLoad = (showLoad==null || typeof(showLoad)=="undefined")? true : showLoad;
  type = (type==null || type=="" || typeof(type)=="undefined")? "post" : type;
  dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
  data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
  if(async&&showLoad){
  }
  var $ajax = $.ajax({
      type: type,
      async: async,
      data: data,
      url: url,
      cache: false,
      //dataType: dataType,
      dataType: 'jsonp',
      jsonp:'jsonpCallback',//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
     // jsonpCallback:"flightHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
      success: function(data){
      		if(successfn!=null && successfn!="" && typeof(successfn)!="undefined"){
      			successfn(data);
      		}
      },
      error: function(data,textStatus){
      	if(typeof(data)!="undefined"){
//      		超时返回登陆页面
      		var infor = data.responseText||data.statusText;
      		if(infor.indexOf("登陆")>-1 || infor.indexOf("Not Found")>-1){
      			console.log("服务器没有登陆");
      			return false;
      		}else if(data.status==404){
      			if(infor==" "){
      				infor = "网络异常，请检查网络连接";
      			}

      			console.log(infor);
      		}
      		else{
      			if(infor=="abort"){
      				console.log(infor);
      			}else{
      				
          			console.log(infor);
      			}
      			
      		}
      	}
      }
  });
  return $ajax;
  
};


/**
* ajax封装 异步请求
* url 发送请求的地址
* data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
* successfn 成功回调函数
*/
noce.ajax=function(url, data, successfn,showLoad) {
    data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
    var $ajax = noce.ajaxAll(url, data, true, null, null, successfn, null,showLoad);
    return $ajax;
};

/**
 * ajax封装 同步请求
 * url 发送请求的地址
 * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
 * successfn 成功回调函数
 */
noce.ajaxAsync=function(url, data, successfn) {
    data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
    var $ajax = noce.ajaxAll(url, data, false, null, null, successfn, null);
    return $ajax;
};



//--------------------------------noce.ajaxAll---------------------------------------------

