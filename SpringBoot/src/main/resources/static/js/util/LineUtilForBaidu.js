//import {PolylineToProfile} from '../util/PolylineToProfile.js'
"use strict";
class LineUtilForBaidu {
    /*map = null;//百度地图对象
    useOptionFiled = false;//是否使用选项字段进行颜色配置
    optionFiledConfiguration =  {filed:null,option:[]};//选项字段配置
    optionChangeFunc = null;//选项字段进行等级适配的函数
    ------------
    useOptionFiled、optionFiledConfiguration和optionChangeFunc需要配合使用，但是由于查询会存在数据字段不一样，组件无法进行适配，因此建议暂不要使用这几个属性
    ------------
    lineWeight = 2;//线宽
    lineOpacity = 0.6;//线的透明度
    canvasPaneString = `,floatPane,markerMouseTarget,floatShadow,labelPane,markerPane,markerShadow,mapPane,`;
    canvasPaneName = 'mapPane';//canvas图层所放在的覆盖物层级，默认放在多边形图形所在的容器:
    // floatPane:信息窗口所在的容器、markerMouseTarget:标注点击区域所在的容器、floatShadow:信息窗口阴影所在的容器、labelPane:文本标注所在的容器
    // markerPane:标注图标所在的容器、markerShadow:标注阴影所在的容器、mapPane:折线、多边形等矢量图形所在的容器
    canvasLineIndex = 1;//canvas图层的z-index
    mapCanvasLayers = null;//百度地图canvasLayers对象
    useLineToProfile = false;//是否需要对线段进行扩展成框后再进行绘制
    lineProfileWeight = 3;//线段扩展成框的距离
    useTouchWeight = false;//是否使用配置的匹配距离
    touchWeight = 3;//进行鼠标移动或者点击时的匹配距离，默认是线段的一半
    replyMouseMoveEvent: true,//是否应用地图的鼠标移动事件，应用的时候，需要配上鼠标移动结束时的调用接口
    replyMouseMoveEventFunc: useFunction, //鼠标移动事件接口
    replyMouseClickEvent: true,//是否应用地图的鼠标点击事件，应用的时候，需要配上鼠标点击地图时的调用接口
    replyMouseClickEventFunc: useFunction //鼠标点击地图事件接口方法
    this.lineCap = "round";//canvas笔触头的样式，这个属性请自行查找canvas配置
    */
    constructor(baiduMap, option) {
        this._map = baiduMap;
        this._canvasPaneString = `,floatPane,markerMouseTarget,floatShadow,labelPane,markerPane,markerShadow,mapPane,`;
        this.useOptionColor = false;
        this.optionFiledConfiguration = {field: '', option: []};//使用独立的颜色配置,格式：{field:'',option:[{level:'',color:''},....]}//field数据库对应的字段，level等级，color等级对应的颜色
        this.optionChangeFunc = null;//数据库值转换成对应level的函数，由外部传入
        this.replyMouseMoveEvent = false;
        this.replyMouseMoveEventFunc = null;
        this.replyMouseClickEvent = false;
        this.replyMouseClickEventFunc = null;
        this._mouseMovePoint = null;
        this._mousePoint = null;
        this._mouseMoveTimeout = null;
        this.lineCap = "round";
        this.lineOpacity = 0.6;
        this.useLineToProfile = false;//根据线段进行扩展成框后再进行绘制
        this.lineProfileWeight = 3;//线段扩展成框的距离
        this._mapCanvasLayers = null;//百度地图canvasLayers对象
        this.lineDataObject = [];//存储的线段数据，格式：[{pointArr:[point,point],level:"",color:''},{pointArr:[point,point],level:"",color:''}]，
        // 其中数组中的每个item的pointArr是固定的，color对应本条线段的颜色，level暂不使用，
        // 如果用户需要匹配的数据存在其他属性，可以自行在每个item中增加
        // this.useTouchWeight = false;//在鼠标移动和点击事件中，是否使用设定的距离宽度来捕获数据
        // this.touchWeight = 2;//鼠标移动的时候没用来计算鼠标到线段的距离，来获取数据
        this._GAOPolyLine = null;
        this._clearLayers = false;
        /*this._drawIntervalTime = 300;//绘制间隔，如果在这个时间之内，则不进行绘制
        this._deplayDrawTimeout = null;
        this._lastDrawZoom = 0;*/
        if (option) {
            if (option.useOptionColor === true) {
                if (typeof option.optionFiledConfiguration == "object") {
                    if (!this._isNullOrEmpty(option.optionFiledConfiguration) && this._isFunction(option.optionChangeFunc)) {
                        this.useOptionColor = true;
                        this.optionFiledConfiguration = option.optionFiledConfiguration;//使用独立的颜色配置,格式：{field:'',option:[{level:'',color:''},....]}//field数据库对应的字段，level等级，color等级对应的颜色
                        this.optionChangeFunc = option.optionChangeFunc;//数据库值转换成对应level的函数，由外部传入
                    }
                }
            }
            this.lineWeight = option.lineWeight == undefined ? 2 : option.lineWeight;
            this.lineOpacity = option.lineOpacity == undefined ? 0.6 : option.lineOpacity;
            if(option.useTouchWeight){
                if(option.useTouchWeight == true || option.useTouchWeight == false){
                    if (Number.isInteger(parseInt(option.touchWeight))) {
                        this.touchWeight = true;
                        if (parseInt(option.touchWeight) > 0) {
                            this.touchWeight = parseInt(option.touchWeight);
                        }else {
                            this.touchWeight = this.lineWeight/2;
                        }
                    }
                }
            }else{
                this.touchWeight = false;
                this.touchWeight = this.lineWeight/2;
            }



            this.canvasPaneName = "mapPane";
            if (option.paneName != undefined) {
                if (this._canvasPaneString.includes(',' + option.paneName + ',')) {
                    this.canvasPaneName = option.paneName;
                }
            }

            this.canvasLineIndex = 1;
            if (Number.isInteger(option.lineIndex)) {
                this.canvasLineIndex = option.lineIndex;
            }

            if (option.replyMouseMoveEvent == true && this._isFunction(option.replyMouseMoveEventFunc)) {
                this.replyMouseMoveEvent = true;
                this.replyMouseMoveEventFunc = option.replyMouseMoveEventFunc;
            }

            if (option.replyMouseClickEvent == true && this._isFunction(option.replyMouseClickEventFunc)) {
                this.replyMouseClickEvent = true;
                this.replyMouseClickEventFunc = option.replyMouseClickEventFunc;
            }

        }
        if (this.replyMouseMoveEvent && this._map) {
            this._map.addEventListener("mousemove", this._mapMouseMoveEvent.bind(this));
        }

        if (this.replyMouseClickEvent && this._map) {
            this._map.addEventListener("click", this._mapMouseClickEvent.bind(this));
        }

        if (option.useLineToProfile == true) {
            this.useLineToProfile = true;
            if (Number.isInteger(parseInt(option.lineProfileWeight))) {
                if (parseInt(option.lineProfileWeight) > 10) {
                    this.lineProfileWeight = 10;
                } else if (parseInt(option.lineProfileWeight) < 1) {
                    this.lineProfileWeight = 1;
                } else {
                    this.lineProfileWeight = parseInt(option.lineProfileWeight);
                }
            }
        }
    }
    /**********************************
     * @funcname _mapMouseMoveEvent
     * @funcdesc 百度地图绑定鼠标移动事件后调用的接口，对鼠标位置进行延迟匹配，无论是否有结果，都调用用户配置的replyMouseMoveEventFunc属性接口
     * @param {obejct} eventTarget (input) 百度传入的对象
     * @return {null}
     * @author liangjy
     * @createDate 2019/1/14 15:57
     ***********************************/
    _mapMouseMoveEvent(eventTarget) {
        // console.log("mousemove",eventTarget)
        // console.log(this);
        //第一步：获取线段的所在的矩形范围，判断当前点是否在线段的矩形内，在则进行第二步
        //第二步：判断点和线段的关系（使用像素进行判断，如果点到线段的距离小于线宽，则视为在这条线上）
        if(this.replyMouseMoveEvent){
            this._mousePoint = eventTarget.point;
            if (this._mouseMovePoint == null) {
                this._mouseMovePoint = this._mousePoint;
            } else if (this._mouseMovePoint.lng != this._mousePoint.lng && this._mouseMovePoint.lat != this._mousePoint.lat) {
                this._mouseMovePoint = this._mousePoint;
                if (this._mouseMoveTimeout != null) {
                    clearTimeout(this._mouseMoveTimeout);
                }
            }

            this._mouseMoveTimeout = setTimeout(function () {
                if (this._mapCanvasLayers != null) {
                    if (this._mouseMovePoint.lng != this._mousePoint.lng && this._mouseMovePoint.lat != this._mousePoint.lat) {
                        return;
                    }
                    this.replyMouseMoveEventFunc(this._getLineByPoint(this._mousePoint));
                }
            }.bind(this), 300);
        }

    }
    /**********************************
     * @funcname _mapMouseClickEvent
     * @funcdesc 百度地图点击事件，对鼠标位置进行数据匹配，再调用用户配置的replyMouseClickEventFunc接口
     * @param {datatype} nameOfParameter (input/output optional)
          descriptionOfParameter
     * @return {datatype}
     * @author liangjy
     * @createDate 2019/1/14 16:03
     ***********************************/
    _mapMouseClickEvent(eventTarget) {
        // console.log("click", eventTarget)
        // console.log(this);

        if(this.replyMouseClickEvent){
            if (this._mapCanvasLayers != null) {
                this.replyMouseClickEventFunc(this._getLineByPoint(eventTarget.point));
            }
        }
    }

    /**********************************
     * @funcname removeMapEvent
     * @funcdesc 清楚绑定的地图事件（鼠标移动和点击）
     * @param
     * @return
     * @author liangjy
     * @createDate 2019/1/14 16:04
     ***********************************/
    removeMapEvent() {
        this.removeMapMouseMoveEvent();
        this.removeMapMouseClickEvent();
    }
    /**********************************
     * @funcname setMapMouseMoveEventFunc
     * @funcdesc 设置百度地图的鼠标移动事件，如果组件已经绑定了事件，则先清除，再绑定
     * @param {function} mouseMoveEventFunc (input) 需要时间触发后调用的接口
     * @return
     * @author liangjy
     * @createDate 2019/1/14 16:05
     ***********************************/
    setMapMouseMoveEventFunc(mouseMoveEventFunc) {
        if (this._isFunction(mouseMoveEventFunc)) {
            this.removeMapMouseMoveEvent();
            this._map.addEventListener("mousemove", this._mapMouseMoveEvent.bind(this));
            this.replyMouseMoveEvent = true;
            this.replyMouseMoveEventFunc = mouseMoveEventFunc;
        }

    }
    /**********************************
     * @funcname setMapMouseClickEventFunc
     * @funcdesc
     * @param {function} mouseclickEventFunc (input) 设置百度地图的鼠标点击事件，如果组件已经绑定了事件，则先清除，再绑定
     * @return {datatype}
     * @author liangjy
     * @createDate 2019/1/14 16:06
     ***********************************/
    setMapMouseClickEventFunc(mouseclickEventFunc) {
        if (this._isFunction(mouseclickEventFunc)) {
            this.removeMapMouseClickEvent();
            this._map.addEventListener("click", this._mapMouseClickEvent.bind(this));
            this.replyMouseClickEvent = true;
            this.replyMouseClickEventFunc = mouseclickEventFunc;
        }
    }
    /**********************************
     * @funcname removeMapMouseMoveEvent
     * @funcdesc 清除百度地图绑定的鼠标移动事件
     * @param
     * @return
     * @author liangjy
     * @createDate 2019/1/14 16:08
     ***********************************/
    removeMapMouseMoveEvent() {
        this._map.removeEventListener("mousemove", this._mapMouseMoveEvent);
        this.replyMouseMoveEvent = false;
    }

    /**********************************
     * @funcname removeMapMouseClickEvent
     * @funcdesc 移除百度地图绑定的鼠标点击事件
     * @param
     * @return
     * @author liangjy
     * @createDate 2019/1/14 16:09
     ***********************************/
    removeMapMouseClickEvent() {
        this._map.removeEventListener("click", this._mapMouseClickEvent);
        this.replyMouseClickEvent = false;
    }

    /**********************************
     * @funcname queryDataByTemplateIdAndParam
     * @funcdesc 根据查询模板和参数进行数据查询，只用来做测试
     * @param {string} templateId (input optional) 模板id
     * @return
     * @author liangjy
     * @createDate 2019/1/14 16:10
     ***********************************/
    //支持mysql，暂不支持其他数据库
    queryDataByTemplateIdAndParam(templateId, paramArr) {
        let list = [templateId];
        list = list.concat(paramArr)
        let sqlList = [];
        sqlList.push(list);
        let functionList = [this._queryDataCallbackFunc.bind(this)];
        let dataBase = [3];
        progressbarTwo.submitSql(sqlList, functionList, dataBase)
    }
    /**********************************
     * @funcname queryDataCallbackFunc
     * @funcdesc 根据模板id和参数进行数据查询的回调函数
     * @param {object} data (input/optional) 查询结果
     * @return
     * @author liangjy
     * @createDate 2019/1/14 16:11
     ***********************************/
    _queryDataCallbackFunc(data, para) {
        let result = this._callBackChangeDataES6(data);
        this._showDataForMap(result);
    }
    /**********************************
     * @funcname showDataForMap
     * @funcdesc 对查询数据进行处理
     * @param {array} resultData (input) 查询数据集
     * @return
     * @author liangjy
     * @createDate 2019/1/14 16:12
     ***********************************/
    _showDataForMap(resultData) {
        let reg = /\d+(\.\d+)?\s\d+(\.\d+)?/g;
        let lineAllPoint = [];
        let lineDataObject = [];
        for (let i = 0; i < resultData.length; i++) {
            let gis_data_point_strArr = [];
            let line_gis_data = resultData[i].geog;
            if (line_gis_data != null && line_gis_data != "") {
                gis_data_point_strArr = line_gis_data.match(reg);//例如：["3.1 4", "10 50", "20 25"]
            }
            if (gis_data_point_strArr == null || gis_data_point_strArr.length == 0) { //由于line_gis_data.match(reg)返回的结果可能是null，所以要做容错
                gis_data_point_strArr = [];
            }
            let pointArr = [];

            for (let j = 0; j < gis_data_point_strArr.length; j++) {
                let pointStrArr = gis_data_point_strArr[j].split(" ");
                let p = new BMap.Point(pointStrArr[0], pointStrArr[1]);
                lineAllPoint.push(p);
                pointArr.push(p);
            }

            let lineObject = {
                id: resultData[i].id,
                city_name: resultData[i].city_name,
                line_id: resultData[i].line_id,
                line_name: resultData[i].line_name,
                from_station_id: resultData[i].from_station_id,
                to_station_id: resultData[i].to_station_id,
                pointArr: pointArr,
                level: parseInt(Math.random() * 6)
            }

            if (this.useOptionColor) {
                // var feildVal = result[i][thisObject.optionColor.field];
                if (this.optionChangeFunc != null && typeof this.optionChangeFunc == 'function') {
                    lineObject.fieldLevel = this.optionChangeFunc(resultData[i][this.optionFiledConfiguration.field]);
                } else {
                    lineObject.fieldLevel = resultData[i][this.optionFiledConfiguration.field];
                }
            }

            lineDataObject.push(lineObject);
        }
        this.lineDataObject = lineDataObject;
        // console.log(lineDataObject);
        this.draw();
    }
    /**********************************
     * @funcname draw
     * @funcdesc 对线段进行绘制方法
     * @param
     * @return {
     * @author liangjy
     * @createDate 2019/1/14 16:18
     ***********************************/
    draw() {
        this._clearLayers = false;
        if(this._mapCanvasLayers == null){
            this._mapCanvasLayers = new BMap.CanvasLayer({
                update: this._drawDataForMap.bind(this),//this._depalyDraw.bind(this),
                paneName: this.canvasPaneName,
                zIndex: this.canvasLineIndex
            });
            this._map.addOverlay(this._mapCanvasLayers);
        }else{
            this._mapCanvasLayers.draw();
        }

    }

    _depalyDraw(){
        this._lastDrawZoom = this._map.getZoom();
        if(this._deplayDrawTimeout != null){
            clearTimeout(this._deplayDrawTimeout);
            if(this._mapCanvasLayers != null){
                let ctx = this._mapCanvasLayers.canvas.getContext("2d");
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }

            this._deplayDrawTimeout = setTimeout(this._drawDataForMap.bind(this),this._drawIntervalTime);
        }else{
            this._deplayDrawTimeout = setTimeout(this._drawDataForMap.bind(this),this._drawIntervalTime);
        }

/*
        if(this._lastDrawTime == null){
            this._lastDrawTime = new Date();
        }
        let nowTime = new Date();
        if(nowTime.getTime() - this._lastDrawTime.getTime() > this._drawIntervalTime){
            console.log("draw.....");
            this._drawDataForMap();
            this._lastDrawTime = new Date();
        }else{
            this._lastDrawTime = new Date();
        }*/
    }


    /**********************************
     * @funcname _drawDataForMap
     * @funcdesc 百度地图CanvasLayer对象绑定的绘制方法，地图缩放、移动结束后地图会自动调用该方法
     * @param
     * @return
     * @author liangjy
     * @createDate 2019/1/14 16:20
     ***********************************/
    _drawDataForMap() {

        if(this._clearLayers){
            return;
        }

        if (this._mapCanvasLayers == null) {
            return;
        }

        /*if(this._lastDrawZoom != this._map.getZoom()){
            return;
        }
        console.log('draw...')*/

        let ctx = this._mapCanvasLayers.canvas.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalAlpha = this.lineOpacity;
        // ctx.strokeStyle = this.line;
        ctx.lineWidth = this.lineWeight;
        ctx.lineCap = this.lineCap;
        let mapBounds = this._map.getBounds();
        if(this._GAOPolyLine != null){
            this._GAOPolyLine = null;
        }

        for (let i = 0; i < this.lineDataObject.length; i++) {
            if (this.useOptionColor) {
                option: for (let OptionItem in this.optionFiledConfiguration.option) {
                    if (this.lineDataObject[i].fieldLevel == this.optionFiledConfiguration.option[OptionItem].level) {
                        ctx.strokeStyle = this.optionFiledConfiguration.option[OptionItem].color;
                        break option;
                    }
                }
            }

            if (this.lineDataObject[i].color != undefined) {
                ctx.strokeStyle = this.lineDataObject[i].color;
            }

            let max_min_rect = this._getMaxAndMinLatLng(this.lineDataObject[i].pointArr);
            //计算不出线段最大最小经纬度的，也不进行判断
            if (max_min_rect.minLng != null && max_min_rect.minLat != null && max_min_rect.maxLat != null && max_min_rect.maxLng != null) {
                //console.log("draw...");
                let lineBounds = new BMap.Bounds(new BMap.Point(max_min_rect.minLng, max_min_rect.minLat), new BMap.Point(max_min_rect.maxLng, max_min_rect.maxLat))
                //当前线段所在矩形框在视野内的话，进行绘制
                if (mapBounds.intersects(lineBounds) != null) {
                    this._drawItemLine(ctx, this.lineDataObject[i]);
                }
            }
        }
        // console.log(this)
    }
    /**********************************
     * @funcname _drawItemLine
     * @funcdesc 对单个线段进行绘制，如果用户配置了线段绘制成框，则会根据算法先得到框的点集合，再进行绘制，否则使用正常的画线方式进行绘制
     * @param {object} ctx (input) canvas的context对象
     * @param {object} item (input) 单个对象数据
     * @return
     * @author liangjy
     * @createDate 2019/1/14 16:22
     ***********************************/
    _drawItemLine(ctx, item) {
        let pointsPixelOld = [];
        if(item.pointArr == undefined){
            return;
        }

        if(!Array.isArray(item.pointArr)){
            return;
        }

        if(item.pointArr.length < 2){
            return;
        }

        for (let i = 0; i < item.pointArr.length; i++) {
            pointsPixelOld.push(this._map.pointToPixel(item.pointArr[i]));
        }
        let pointsPixel = [];
        if (this.useLineToProfile) {
            if(GAO){
                if(GAO.Point){

                    /*pointsPixel = PolylineToProfile.polyline_expand(pointsPixelOld,this.lineProfileWeight);
                    if(pointsPixel.length >0){
                        ctx.beginPath();
                        ctx.moveTo(pointsPixel[0].x, pointsPixel[0].y);
                        for (let i = 1; i < pointsPixel.length; i++) {
                            ctx.lineTo(pointsPixel[i].x, pointsPixel[i].y);
                        }
                        // ctx.closePath();
                        ctx.stroke();
                    }*/


                    let GAOPointArr = [];
                    for(const [i, pixel] of pointsPixelOld.entries()) {
                        GAOPointArr.push(new GAO.Point(pixel.x,pixel.y))
                    }
                    if(this._GAOPolyLine == null){
                        this._GAOPolyLine = new GAO.PolyLine(GAOPointArr);
                    }else{
                        this._GAOPolyLine.pList = GAOPointArr;
                    }
					this._GAOPolyLine.draw(ctx,this.lineProfileWeight,"round")
                    /*let GAOPolyLinePoints = this.GAOPolyLine.zip(10).expand(this.lineProfileWeight);

                    for(const [i, p] of GAOPolyLinePoints.pList.entries()) {
                        pointsPixel.push(new BMap.Pixel(p.x,p.y))
                    }

                    if(pointsPixel.length>0){
                        if(!pointsPixel[0].equals(pointsPixel[pointsPixel.length-1])){
                            //将点连回第一个点，形成闭合
                            pointsPixel.push(pointsPixel[0]);
                        }
                    }*/
                }
            }
            //pointsPixel = PolylineToProfile.polyline_expand(pointsPixelOld, this.lineProfileWeight);
            //console.log(item,pointsPixel);
            /*let points = PolylineToProfile.polyline_expand(pointsPixelOld, this.lineProfileWeight);
            if(points.upper_pl.length >0){
                ctx.beginPath();
                ctx.moveTo(points.upper_pl[0].x, points.upper_pl[0].y);
                for (let i = 1; i < points.upper_pl.length; i++) {
                    ctx.lineTo(points.upper_pl[i].x, points.upper_pl[i].y)
                }
                // ctx.closePath();
                ctx.stroke();
            }

            if(pointsPixelOld.length >0){
                ctx.beginPath();
                //ctx.moveTo(points.upper_pl[points.upper_pl.length-1].x,points.upper_pl[points.upper_pl.length-1].y);
                ctx.moveTo(pointsPixelOld[0].x,pointsPixelOld[0].y);
                ctx.arc(pointsPixelOld[0].x,pointsPixelOld[0].y,this.lineProfileWeight,0,2*Math.PI,true)
                ctx.moveTo(pointsPixelOld[pointsPixelOld.length-1].x,pointsPixelOld[pointsPixelOld.length-1].y);
                ctx.arc(pointsPixelOld[pointsPixelOld.length-1].x,pointsPixelOld[pointsPixelOld.length-1].y,this.lineProfileWeight,0,2*Math.PI,true)
                ctx.stroke();
            }

            if(points.lower_pl.length >0){
                ctx.beginPath();
                ctx.moveTo(points.lower_pl[0].x, points.lower_pl[0].y);
                for (let i = 1; i < points.lower_pl.length; i++) {
                    ctx.lineTo(points.lower_pl[i].x, points.lower_pl[i].y)
                }
                // ctx.closePath();
                ctx.stroke();
            }*/
            //console.log(item,pointsPixelOld,pointsPixel);
        }else{
            pointsPixel = [].concat(pointsPixelOld);
			if(pointsPixel.length >0){
				ctx.beginPath();
				ctx.moveTo(pointsPixel[0].x, pointsPixel[0].y);
				for (let i = 1; i < pointsPixel.length; i++) {
					ctx.lineTo(pointsPixel[i].x, pointsPixel[i].y);
				}
				// ctx.closePath();
				ctx.stroke();
			}
        }
        pointsPixelOld = [];
        pointsPixelOld = null;
    }
    /**********************************
     * @funcname _getLineByPoint
     * @funcdesc 根据坐标点获取匹配线段数据
     * @param {object} clickPoint (input) 经纬度点
     * @return {array} clickLineData 根据传入的点匹配出来的线段数据集
     * @author liangjy
     * @createDate 2019/1/14 16:24
     ***********************************/
    _getLineByPoint(clickPoint) {
        let mapBounds = this._map.getBounds();
        let clickLineData = [];
        // let sw = mapBounds.getSouthWest();//西南角
        // let ne = mapBounds.getNorthEast();//东北角
        for (let i = 0; i < this.lineDataObject.length; i++) {
            let max_min_rect = this._getMaxAndMinLatLng(this.lineDataObject[i].pointArr);
            //计算不出线段最大最小经纬度的，也不进行判断
            if (max_min_rect.minLng != null && max_min_rect.minLat != null && max_min_rect.maxLat != null && max_min_rect.maxLng != null) {
                let lineBounds = new BMap.Bounds(new BMap.Point(max_min_rect.minLng, max_min_rect.minLat), new BMap.Point(max_min_rect.maxLng, max_min_rect.maxLat))
                //当前线段所在矩形框在视野内的话，进行下一步判断
                if (mapBounds.intersects(lineBounds) != null) {
                    //匹配到第一个结果时，就可以进行返回
                    //优化--------------
                    if (this._isPointOnPolyline(clickPoint, this.lineDataObject[i].pointArr, max_min_rect)) {
                        clickLineData.push(this.lineDataObject[i]);
                        break;
                        // console.log("pointOnLine", this.lineDataObject[i]);
                    }
                }
            }
        }
        return clickLineData;
    }

    /**********************************
     * @funcname clearCanvasLayers
     * @funcdesc 清楚canvas图层
     * @param
     * @return
     * @author liangjy
     * @createDate 2019/1/14 16:26
     ***********************************/
    clearCanvasLayers() {
        if (this._mapCanvasLayers != null) {
            //this._map.removeOverlay(this._mapCanvasLayers);
            //this._mapCanvasLayers = null;
            let ctx = this._mapCanvasLayers.canvas.getContext("2d");
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            this._clearLayers = true;
        }
    }

    /**********************************
     * @funcname isNullOrEmpty
     * @funcdesc 判断传入的参数是否为undefine或者null或者空字符串
     * @param {} str (input)
     * @return {boolean}
     * @author liangjy
     * @createDate 2019/1/14 16:26
     ***********************************/
    _isNullOrEmpty(str) {
        if (str == undefined || str == null || str == '') {
            return true
        } else {
            return false;
        }
    }

    /**********************************
     * @funcname _isFunction
     * @funcdesc 判断是否为函数
     * @param func (input) 需要判断的参数
     * @return {boolean}
     * @author liangjy
     * @createDate 2019/1/14 16:28
     ***********************************/
    _isFunction(func) {
        if (typeof func == "function") {
            return true;
        } else {
            return false;
        }
    }

    /**********************************
     * @funcname _callBackChangeDataES6
     * @funcdesc 查询结果进行转换的函数
     * @param {object} data (input) 查询结果
     * @return {array} resultArray 转换之后的数据集
     * @author liangjy
     * @createDate 2019/1/14 16:29
     ***********************************/
    _callBackChangeDataES6(data) {
        let {result = [], columns = [], type = []} = data;
        let resultArray = [];
        if (result.length == 0 || columns.length == 0) {
            return resultArray;
        }
        for (let i = 0; i < result.length; i++) {
            let rs = result[i];
            let dataRsult = {};
            for (let j = 0; j < rs.length; j++) {
                // var dataC = JSON.stringify(cloumns[j]);
                let dataC = columns[j];
                let dataR = rs[j];
                dataRsult[dataC] = dataR;
            }
            resultArray.push(dataRsult);
        }
        return resultArray;
    }

    /**********************************
     * @funcname _reverseDataForCallBackDataUtil
     * @funcdesc 将数组的结果集转换成对象形式
     * @param {array} result (input) 结果集合
     * @return {object} 对象形式的数据 {columns:[],result:[[],[],[]]}
     * @author liangjy
     * @createDate 2019/1/14 16:30
     ***********************************/
    _reverseDataForCallBackDataUtil(result) {
        let data = {};
        let columns = [];
        let dataResult = [];
        if (Array.isArray(result)) {
            for (let i = 0; i < result.length; i++) {
                if (i == 0) {
                    for (let k in result[i]) {
                        columns.push(k);
                    }
                }
                let d = [];
                for (let j = 0; j < columns.length; j++) {
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
     * @funcname _isPointOnPolyline
     * @funcdesc 判断点是否在线上（线宽大小的线，不是原始线），
     * 规则：
     * 先判断点是否在线段的矩形框内，如果在，再遍历该线段集合点，计算点到每个小线段的距离，
     * 如果距离大于等于0并且小于等于touchWeight，则认为该点在线上，将该数据进行缓存，
     * 遍历所有线段后，将匹配的结果进行返回
     * 可能存在的bug：
     * 在进行最大最下矩形框内判断时，如果线是垂直或者水平的时候会匹配不到结果。
     * 还有就是在判断矩形框的时候，没有结合线宽进行判断，这里也有可能导致匹配不到完整的数据
     * @param {object} point (input) 点位置
     * @param {array} linePointArrs (input) 线段经纬度集合
     * @param {object} max_min_rect (input) 线段的最大最小经纬度
     * @return {datatype}
     * @author liangjy
     * @createDate 2019/1/14 16:33
     ***********************************/
    _isPointOnPolyline(point, linePointArrs, max_min_rect) {
        let PointOnPolyline = false;
        //检查类型
        if (!(typeof point.lng == "number" && typeof point.lat == "number")) {
            PointOnPolyline = false;
        }

        //首先判断点是否在线的外包矩形内，如果在，则进一步判断，否则返回false
        if (!(point.lng >= max_min_rect.minLng && point.lng <= max_min_rect.maxLng && point.lat >= max_min_rect.minLat && point.lat <= max_min_rect.maxLat)) {
            PointOnPolyline = false
        }

        //判断点是否在线段上，设点为Q，线段为P1P2 ，
        //判断点Q在该线段上的依据是：( Q - P1 ) × ( P2 - P1 ) = 0，且 Q 在以 P1，P2为对角顶点的矩形内
        let pointPixel = this._map.pointToPixel(point);

        for(let i = 0; i < linePointArrs.length - 1; i++) {
            let curPt = linePointArrs[i];
            let nextPt = linePointArrs[i + 1];
            let curPx = this._map.pointToPixel(curPt);
            let nextPx = this._map.pointToPixel(nextPt);
            let pointForLineDistance = this._PointLine_Disp(pointPixel.x, pointPixel.y, curPx.x, curPx.y, nextPx.x, nextPx.y);
            if (pointForLineDistance <= this.touchWeight) {
                PointOnPolyline = true;
                break;
            }

            //首先判断point是否在curPt和nextPt之间，即：此判断该点是否在该线段的外包矩形内
            //这里需要改进，如果是平着的线，会判断不对
            // if (point.lng >= Math.min(curPt.lng, nextPt.lng) && point.lng <= Math.max(curPt.lng, nextPt.lng) &&
            //     point.lat >= Math.min(curPt.lat, nextPt.lat) && point.lat <= Math.max(curPt.lat, nextPt.lat)){
            /*//判断点是否在直线上公式
            var precision = (curPt.lng - point.lng) * (nextPt.lat - point.lat) -
                (nextPt.lng - point.lng) * (curPt.lat - point.lat);
            if(precision < 2e-10 && precision > -2e-10){//实质判断是否接近0
                return true;
            }*/
            // }
        }

        return PointOnPolyline;
    }

    /**********************************
     * @funcname getMaxAndMinLatLng
     * @funcdesc 根据点集合，获取最大最小经纬度
     * @param {array} array (input) 经纬度点集合
     * @return {object} resultArr
     * @author liangjy
     * @createDate 2019/1/14 16:40
     ***********************************/
    _getMaxAndMinLatLng(array) {
//	console.log(this);
        let resultArr = {
            maxLng: null,
            maxLat: null,
            minLng: null,
            minLat: null
        };
        let maxLng = null;
        let maxLat = null;
        let minLng = null;
        let minLat = null;

        if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                if (maxLng == null) {
                    maxLng = array[i].lng;
                }
                if (maxLat == null) {
                    maxLat = array[i].lat;
                }
                if (minLat == null) {
                    minLat = array[i].lat;
                }
                if (minLng == null) {
                    minLng = array[i].lng;
                }
                if (maxLat < array[i].lat) {
                    maxLat = array[i].lat;
                }
                if (maxLng < array[i].lng) {
                    maxLng = array[i].lng;
                }
                if (minLat > array[i].lat) {
                    minLat = array[i].lat;
                }
                if (minLng > array[i].lng) {
                    minLng = array[i].lng;
                }
            }
            resultArr = {
                maxLng: maxLng,
                maxLat: maxLat,
                minLng: minLng,
                minLat: minLat
            };
        }
        return resultArr;
    }

    /**********************************
     * @funcname _PointLine_Disp
     * @funcdesc 计算点到线段的距离算法(不是垂直距离)
     * @param {number} xx (input) 点的x坐标
     * @param {number} yy (input) 点的y坐标
     * @param {number} x1 (input) 线段第一个点的x坐标
     * @param {number} y1 (input) 线段第一个点的y坐标
     * @param {number} x2 (input) 线段第二个点的x坐标
     * @param {number} y2 (input) 线段第二个点的y坐标
     * @return {double} distance 点到线段的距离
     * @author liangjy
     * @createDate 2019/1/14 16:49
     ***********************************/
    //xx,yy 点的坐标   x1,y1线段第一个的坐标  x2,y2线段第二个点的坐标
    _PointLine_Disp(xx, yy, x1, y1, x2, y2) {
        let a, b, c, ang1, ang2, ang, m;
        let result = 0;
        //分别计算三条边的长度
        a = Math.sqrt((x1 - xx) * (x1 - xx) + (y1 - yy) * (y1 - yy));
        if (a == 0)
            return -1;
        b = Math.sqrt((x2 - xx) * (x2 - xx) + (y2 - yy) * (y2 - yy));
        if (b == 0)
            return -1;
        c = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        //如果线段是一个点则退出函数并返回距离
        if (c == 0) {
            result = a;
            return result;
        }
        //如果点(xx,yy到点x1,y1)这条边短
        if (a < b) {
            //如果直线段AB是水平线。得到直线段AB的弧度
            if (y1 == y2) {
                if (x1 < x2)
                    ang1 = 0;
                else
                    ang1 = Math.PI;
            }
            else {
                m = (x2 - x1) / c;
                if (m - 1 > 0.00001)
                    m = 1;
                ang1 = Math.acos(m);
                if (y1 > y2)
                    ang1 = Math.PI * 2 - ang1;//直线(x1,y1)-(x2,y2)与折X轴正向夹角的弧度
            }
            m = (xx - x1) / a;
            if (m - 1 > 0.00001)
                m = 1;
            ang2 = Math.acos(m);
            if (y1 > yy)
                ang2 = Math.PI * 2 - ang2;//直线(x1,y1)-(xx,yy)与折X轴正向夹角的弧度

            ang = ang2 - ang1;
            if (ang < 0) ang = -ang;

            if (ang > Math.PI) ang = Math.PI * 2 - ang;
            //如果是钝角则直接返回距离
            if (ang > Math.PI / 2)
                return a;
            else
                return a * Math.sin(ang);
        }
        else//如果(xx,yy)到点(x2,y2)这条边较短
        {
            //如果两个点的纵坐标相同，则直接得到直线斜率的弧度
            if (y1 == y2)
                if (x1 < x2)
                    ang1 = Math.PI;
                else
                    ang1 = 0;
            else {
                m = (x1 - x2) / c;
                if (m - 1 > 0.00001)
                    m = 1;
                ang1 = Math.acos(m);
                if (y2 > y1)
                    ang1 = Math.PI * 2 - ang1;
            }
            m = (xx - x2) / b;
            if (m - 1 > 0.00001)
                m = 1;
            ang2 = Math.acos(m);//直线(x2-x1)-(xx,yy)斜率的弧度
            if (y2 > yy)
                ang2 = Math.PI * 2 - ang2;
            ang = ang2 - ang1;
            if (ang < 0) ang = -ang;
            if (ang > Math.PI) ang = Math.PI * 2 - ang;//交角的大小
            //如果是对角则直接返回距离
            if (ang > Math.PI / 2)
                return b;
            else
                return b * Math.sin(ang);//如果是锐角，返回计算得到的距离
        }
    }
}

export {LineUtilForBaidu}