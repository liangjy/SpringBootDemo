
class MassiveGridQuery {
    constructor(baiduMap, option){
        this._map = baiduMap;
        this._canvasPaneString = `,floatPane,markerMouseTarget,floatShadow,labelPane,markerPane,markerShadow,mapPane,`;
        this.cityString = ",广州,深圳,珠海,佛山,东莞,惠州,中山,江门,肇庆,清远,茂名,湛江,汕头,汕尾,梅州,韶关,揭阳,潮州,云浮,河源,阳江,";
        this.showType = 'image';//imgae:查询结果为图片，grid：查询结果为栅格数据
        this.initComplete = false;//初始化完成
        if(this._checkShowType(option.showType)){
            this.showType = option.showType;
        }
        this.city = (option.city == undefined || option.city == '全省') ? null:option.city;
        this.district = (option.district == undefined) ? null:option.district;
        this.mktcenter = (option.mktcenter == undefined) ? null:option.mktcenter;

        /*if(!noceUtil.isUndefined(option.city)){
            if(this._checkArea(option.city,option.district,option.mktcenter)){
                if(option.city != '全省'){
                    this.city = option.city;
                    this.district = option.district;
                    this.mktcenter = option.mktcenter;
                }
            }
        }*/

        this.valueInterval = [
            {"value": -85, "max": 0, "min": -85, "maxClose": false, "minClose": true, level: 1,color:"rgb(0, 153, 0)",filter:false}, //优
            {"value": -95, "max": -85, "min": -95, "maxClose": false, "minClose": true, level: 2,color:"rgb(0, 176, 240)",filter:false}, //良
            {"value": -105, "max": -95, "min": -105, "maxClose": false, "minClose": true, level: 3,color:"rgb(0, 112, 192)",filter:false}, //中
            {"value": -115, "max": -105, "min": -115, "maxClose": false, "minClose": true, level: 4,color:"rgb(255, 192, 0)",filter:false}, //差
            {"value": -140, "max": -115, "min": -140, "maxClose": false, "minClose": true, level: 5,color:"rgb(192, 0, 0)",filter:false}, //极差
        ];
        if(option.valueInterval){
            if(this._checkValueInterval(option.valueInterval)){
                this.valueInterval = option.valueInterval;
            }
        }

        this.day = null;
        if(this._checkDay(option.day)){
            this.day = option.day;
        }
        this.divisionBand = false;
        this.bandType = ['SC'];//当divisionBand为false时，取值是SC（主接入）或者BEST（最优场强），当为true时，取值为'800M','1.8G','2.1G','2.6G'中的一个或者多个
        if(this._checkBand(option.divisionBand,option.bandType)){
            this.divisionBand = option.divisionBand;
            this.bandType = option.bandType;
        }
        this.opacity = 0.5;
        if(this._checkBand(option.opacity)){
            this.opacity = option.opacity;
        }
        this.dataType = 0;//AGPS：1,全量MR综合：0,全量MR室外：3,全量MR室内：2
        if(this._checkDataType(option.dataType)){
            this.dataType = option.dataType;
        }
        this.gridType = 'rsrp';//rsrp（覆盖质量）,userex_upavgrate（用户上行速率）,userex_dwavgrate（下行速率）,m3mr（MOD3干扰）,olmr（重叠覆盖）,cbmr（越区覆盖）,ecio（2G）
        if(this._checkGridType(option.gridType)){
            this.gridType = option.gridType;
        }

        this.useCustomizePolygon = false;
        this.polygon = '';
        if(option.useCustomizePolygon == true){
            if(this._checkPolygon(option.polygon)){
                this.useCustomizePolygon = true;
                this.polygon = option.polygon;
            }
        }


        this.mapBounds = '';
        this.notCount = {value:3,filter:true};//如果值为0表示过滤数据，如果大于0，需要将mr记录数小于等于本值，大于0的数据按照valueInteval等级进行划分
        if(this._checkNotCount(option.notCount)){
            this.notCount = option.notCount;
        }

        this.timeType = 'week';
        if(this._checkTimeType(option.timeType)){
            this.timeType = option.timeType;
        }
        this.boundsMatrix = {
            boundsLngNumWidth:{},
            boundsLatNumHeight:{},
            boundsSouthWestPixel:{}
        };
        this.roundedDown = 0;
        if(option.roundedDown == 1 || option.roundedDown == 2){
            this.roundedDown = option.roundedDown;
        }

        this.canvasPaneName = "mapPane";
        if (option.paneName != undefined) {
            if (this._canvasPaneString.includes(',' + option.paneName + ',')) {
                this.canvasPaneName = option.paneName;
            }
        }

        this.canvasLineIndex = 0;
        if (Number.isInteger(option.canvasIndex)) {
            this.canvasLineIndex = option.canvasIndex;
        }

        this._gridLevel = 20;
        this.reloadGridAjax = null;
        this._gridImgBase = [];//存放查询回来的图片结果生成的img对象数组
        this._zoom = this._map.getZoom();
        this.drawGrid = false;
        this._gridCanvasLayers = null;
        this._GridResultArr = [];
        this.mapMoveendNotResponding = false;//不响应地图移动结束事件
        this._map.addEventListener('moveend',this._mapMoveendEvent.bind(this));

    }

    setShowType(showType){
        let reload = this._checkShowType(showType);
        if(reload){
            this.showType = showType;
            this.reloadMassiveGrid();
        }else{
            console.log('配置大范围栅格showType错误');
        }

    }

    _checkShowType(showType){
        let parameter = false;
        if(showType == 'image' || showType == 'grid'){
            parameter = true;
        }
        return parameter;
    }

    setArea(city,district,mktcenter){
        let reload = this._checkArea(city,district,mktcenter);

        if(reload){
            if(city != '全省'){
                this.city = city;
                this.district = district;
                this.mktcenter = mktcenter;
            }else{
                this.city = null;
                this.district = null;
                this.mktcenter = null;
            }
            this.reloadMassiveGrid();
        }
    }

    _checkArea(city,district,mktcenter){
        let parameter = false;
        if(city == '全省'){
            parameter = true;
        }else{
            if(this.cityString.indexOf(','+city+',')>0){
                parameter = true;
                if(noceUtil.isUndefined(district) && !noceUtil.isUndefined(mktcenter)){
                    parameter = false;
                }
            }else{
                parameter = false;
            }
        }

        return parameter;
    }

    setValueInterval(valueInterval){
        let reload = this._checkValueInterval(valueInterval);
        if(reload){
            this.valueInterval = valueInterval;
            this.reloadMassiveGrid();
        }else{
            console.log('区间值更新配置错误');
        }
    }

    _checkValueInterval(valueInterval){
        let parameter = false;
        if(Array.isArray(valueInterval)){
            for(let i=0;i<valueInterval.length;i++){
                if( 'level' in valueInterval[i] && 'color' in valueInterval[i] && 'filter' in valueInterval[i] && 'minClose' in valueInterval[i]
                    && 'maxClose' in valueInterval[i] && 'min' in valueInterval[i] && 'max' in valueInterval[i]){
                    parameter = false;
                }
            }
        }
        return parameter;
    }

    setDay(day){
        day += '';
        if(this._checkDay(day)){
            this.day = day;
            this.reloadMassiveGrid();
        }
    }

    _checkDay(day){
        let parameter = false;
        if(day.length == 8 && Number.isInteger(parseInt(day))){
            parameter = true;
        }
        return parameter;
    }

    setBand(divisionBand,bandType){
        let reload = this._checkBand(divisionBand,bandType);
        if(reload){
            this.divisionBand = divisionBand;
            this.bandType = bandType;
            this.reloadMassiveGrid();
        }

    }

    _checkBand(divisionBand,bandType){
        let parameter = false;
        if(divisionBand == true){
            let bandString = ',800M,1.8G,2.1G,2.6G,';
            let bandFormat = true;
            if(Array.isArray(bandType)){
                for(let i=0;i<bandType.length;i++){
                    //如果设置的多频段有匹配不对的，则不能进行配置更新
                    if(bandString.indexOf(bandType[i]) < 0){
                        bandFormat = false;
                    }
                }

                if(!bandFormat){
                    parameter = true;
                }
            }
        }else if(divisionBand == false){
            if(Array.isArray(bandType)){
                if(bandType.length == 1){
                    if(bandType[0] == 'SC' || bandType[0] == 'BEST'){
                        parameter = true;
                    }
                }
            }
        }
        return parameter;
    }

    setOpacity(opacity){
        if(this._checkOpacity(opacity)){
            this.opacity = opacity;
            this.reloadMassiveGrid();
        }
    }

    _checkOpacity(opacity){
        let parameter = false;
        if($.isNumeric(opacity)){
            if(opacity >= 0 && opacity <= 1){
                parameter = true;
            }
        }
        return parameter;
    }

    setDataType(dataType){
        //AGPS：1,全量MR综合：0,全量MR室外：3,全量MR室内：2
        if(this._checkDataType(dataType)){
            this.dataType = dataType;
            this.reloadMassiveGrid();
        }
    }

    _checkDataType(dataType){
        let parameter = false;
        //AGPS：1,全量MR综合：0,全量MR室外：3,全量MR室内：2
        if(Number.isInteger(dataType)){
            if(dataType >=0 && dataType <= 4){
                parameter = true;
            }
        }
        return parameter;
    }

    setGridType(gridType){
        //rsrp（覆盖质量）,userex_upavgrate（用户上行速率）,userex_dwavgrate（下行速率）,m3mr（MOD3干扰）,olmr（重叠覆盖）,cbmr（越区覆盖）,ecio（2G）
        if(this._checkGridType(gridType)){
            this.gridType = gridType;
            this.reloadMassiveGrid();
        }
    }

    _checkGridType(gridType){
        let parameter = false;
        let gridTypeString = ',rsrp,userex_upavgrate,userex_dwavgrate,m3mr,olmr,cbmr,ecio,';
        //rsrp（覆盖质量）,userex_upavgrate（用户上行速率）,userex_dwavgrate（下行速率）,m3mr（MOD3干扰）,olmr（重叠覆盖）,cbmr（越区覆盖）,ecio（2G）
        if(gridTypeString.indexOf(',' + gridType + ',') >= 0){
            parameter = true;
        }
        return parameter;
    }

    setPolygon(polygon){
        if(this._checkPolygon(polygon)){
            this.useCustomizePolygon = true;
            this.polygon = polygon;
            this.reloadMassiveGrid();
        }

    }

    _checkPolygon(polygon){
        let parameter = false;
        let polygonArr = polygon.split('@');
        if(polygonArr.length >= 3){
            parameter = true;
        }
        return parameter;
    }

    setNotCount(notCount){
        if(this._checkNotCount(notCount)){
            this.notCount = notCount;
            this.reloadMassiveGrid();
        }else{
            console.log('设置记录数参数错误');
        }

    }

    _checkNotCount(notCount){
        let parameter = false;
        if(notCount){
            if('filter' in notCount && 'value' in notCount){
                parameter = true;
            }
        }
        return parameter;
    }

    setTimeType(timeType){
        if(this._checkTimeType(timeType)){
            this.timeType = timeType;
            this.reloadMassiveGrid();
        }
    }

    _checkTimeType(timeType){
        let parameter = false;
        if(timeType == 'week' || timeType == 'day'){
            parameter = true;
        }
        return parameter;
    }

    getGridLevelByZoom(mapZoom,roundedDown){
        let gridLevel = 20;
        switch (mapZoom) {
            case 19:
                gridLevel = 20;
                break;
            case 18:
                gridLevel = 20;
                break;
            case 17:
                gridLevel = 20;
                break;
            case 16:
                gridLevel = 20;
                break;
            case 15:
                gridLevel = 20;
                break;
            case 14:
                gridLevel = 20;
                break;
            case 13:
                gridLevel = 40;
                if(roundedDown == 1 || roundedDown == 2){
                    gridLevel = 20;
                }
                break;
            case 12:
                gridLevel = 80;
                if(roundedDown == 1){
                    gridLevel = 40;
                }else if(roundedDown == 2){
                    gridLevel = 20;
                }
                break;
            case 11:
                gridLevel = 160;
                if(roundedDown == 1){
                    gridLevel = 80;
                }else if(roundedDown == 2){
                    gridLevel = 40;
                }
                break;
            case 10:
                gridLevel = 320;
                if(roundedDown == 1){
                    gridLevel = 160;
                }else if(roundedDown == 2){
                    gridLevel = 80;
                }
                break;
            case 9:
                gridLevel = 640;
                if(roundedDown == 1){
                    gridLevel = 320;
                }else if(roundedDown == 2){
                    gridLevel = 160;
                }
                break;
            case 8:
                gridLevel = 1280;
                if(roundedDown == 1){
                    gridLevel = 640;
                }else if(roundedDown == 2){
                    gridLevel = 320;
                }
                break;
            case 7:
                gridLevel = 1280;
                if(roundedDown == 2){
                    gridLevel = 640;
                }
                break;
        }
        return gridLevel;
    }

    moveMoveendEvent(){
        this._map.removeEventListener('moveend',this._mapMoveendEvent.bind(this));
    }

    _mapMoveendEvent(event){
        this.drawGrid = false;
        if(this.mapMoveendNotResponding == true){
            return;
        }
        this.reloadMassiveGrid();
    }

    reloadMassiveGrid(){
        this._CalculationCalculationBoundsMatrix();
        if(this.showType == 'image'){
            this.loadMassiveGridImg();
        }else if(this.showType == 'grid'){
            this.loadMassiveGridResultList();
        }
    }

    _CalculationCalculationBoundsMatrix(){
        this._zoom = this._map.getZoom();
        let bounds = this._map.getBounds();
        let sw = bounds.getSouthWest();//西南角
        let ne = bounds.getNorthEast();//东北角

        let gridLen = 100000;
        this._gridLevel = this.getGridLevelByZoom(this._zoom);

        let swLngnum = gridLngNum(sw.lng, this._gridLevel);
        let swLatnum = gridLatNum(sw.lat, this._gridLevel);

        //计算出一个栅格的经度长度
        let swLngCurrentGridLngLat = gridLngNumToLng(swLngnum, this._gridLevel);//[minLng, midLng, maxLng];
        let oneLngnumLng = swLngCurrentGridLngLat[2] - swLngCurrentGridLngLat[0];

        //计算出一个栅格的纬度长度
        let swLatCurrentGridLngLat = gridLatNumToLat(swLatnum, this._gridLevel);//[minLat, midLat, maxLat];
        let oneLatnumLat = swLatCurrentGridLngLat[2] - swLatCurrentGridLngLat[0];

        /*let sw = bounds.getSouthWest();//西南角
        let ne = bounds.getNorthEast();//东北角*/
        sw.lng -=  oneLngnumLng;
        sw.lat -=  oneLatnumLat;

        ne.lng +=  oneLngnumLng;
        ne.lat +=  oneLatnumLat;
        this.mapBounds = `${sw.lng},${sw.lat}@${ne.lng},${sw.lat}@${ne.lng},${ne.lat}@${sw.lng},${ne.lat}`;
        if(!this.useCustomizePolygon){
            this.polygon = `${sw.lng},${sw.lat}@${ne.lng},${sw.lat}@${ne.lng},${ne.lat}@${sw.lng},${ne.lat}`;
        }

        let polygonPointArr = this.mapBounds.split('@');
        let lngArr = [];
        let latArr = [];
        for (let i = 0; i < polygonPointArr.length; i++) {
            let p = polygonPointArr[i].split(',');
            lngArr.push(parseFloat(p[0]));
            latArr.push(parseFloat(p[1]));
        }
        lngArr.sort(function (a,b){
            return a-b;
        });
        latArr.sort(function (a,b){
            return a-b;
        });
        let min_lng = lngArr[0];
        let max_lng = lngArr[lngArr.length - 1];

        let min_lat = latArr[0];
        let max_lat = latArr[latArr.length - 1];

        let minLngNum = gridLngNum(min_lng, this._gridLevel);
        let maxLngNum = gridLngNum(max_lng, this._gridLevel);
        let minLatNum = gridLatNum(min_lat, this._gridLevel);
        let maxLatNum = gridLatNum(max_lat, this._gridLevel);

        //范围扩大一行一列之后，要将最大最小经纬度也要进行扩展
        let minLngArr = gridLngNumToLng(minLngNum, this._gridLevel);//[minLng, midLng, maxLng];
        let maxLngArr = gridLngNumToLng(maxLngNum, this._gridLevel, gridLen);//[minLng, midLng, maxLng];
        let minLatArr = gridLatNumToLat(minLatNum, this._gridLevel, gridLen);//[minLat, midLat, maxLat];
        let maxLatArr = gridLatNumToLat(maxLatNum, this._gridLevel, gridLen);//[minLat, midLat, maxLat];
        min_lng = minLngArr[0];
        min_lat = minLatArr[0];
        max_lng = maxLngArr[2];
        max_lat = maxLatArr[2];

        let gridLngNumToPixelLength = {};
        for (let i = minLngNum; i <= maxLngNum; i++) {
            //计算出当前经度编码和下一个经度编码的经纬度，转换像素后，再计算像素长度
            let currentGrid = gridLngNumToLng(i,this._gridLevel);//[minLng, midLng, maxLng];
            let nextGrid = gridLngNumToLng(i+1,this._gridLevel);
            //当前这个栅格的最大最小经纬度，左下角点和右下角点的像素长度，就认为是当前这个栅格经度编码的像素长度
            let leftButtomPoint = new BMap.Point(currentGrid[0], min_lat);
            let rightButtomPoint = new BMap.Point(nextGrid[0], min_lat);
            let leftButtomPixel = this._map.pointToPixel(leftButtomPoint);
            let rightButtomPixel = this._map.pointToPixel(rightButtomPoint);

            let gridWidth = rightButtomPixel.x - leftButtomPixel.x;
            gridLngNumToPixelLength[i] = gridWidth
        }
        let gridLatNumToPixelLength = {};
        //从上往下遍历
        for (let i = maxLatNum; i >= minLatNum; i--) {
            //计算出当前经度编码和下一个经度编码的经纬度，转换像素后，再计算像素长度
            let currentGrid = gridLatNumToLat(i, this._gridLevel);//[minLat, midLat, maxLat];
            let nextGrid = gridLatNumToLat((i-1), this._gridLevel);
            //当前这个栅格的最大最小经纬度，左下角点和右下角点的像素长度，就认为是当前这个栅格经度编码的像素长度
            let leftTopPoint = new BMap.Point(min_lng, currentGrid[0]);
            let leftButtomPoint = new BMap.Point(min_lng, nextGrid[0]);
            let leftButtomPixel = this._map.pointToPixel(leftButtomPoint);
            let leftTopPixel = this._map.pointToPixel(leftTopPoint);
            let gridHeight = leftButtomPixel.y - leftTopPixel.y;
            gridLatNumToPixelLength[i] = gridHeight
        }

        let leftTopStartPoint = new BMap.Point(min_lng, max_lat);
        let leftTopStartPixel = this._map.pointToPixel(leftTopStartPoint);
        this.boundsMatrix = {
            boundsLngNumWidth:gridLngNumToPixelLength,
            boundsLatNumHeight:gridLatNumToPixelLength,
            boundsSouthWestPixel:leftTopStartPixel,
        }
    }

    loadMassiveGridImg(){
        let ajaxStartTime = new Date();
        if(this.reloadGridAjax){
            this.reloadGridAjax.abort();
        }
        let thisObj = this;
        this.reloadGridAjax = $.ajax({
            type:'post',
            data:{
                polygon: this.polygon,
                bounds: this.mapBounds,
                mapLevel: this._zoom,
                divisionBand: this.divisionBand,
                bandType: JSON.stringify(this.bandType),
                gridType: this.gridType,
                timeType: this.timeType,
                dataType: this.dataType,
                day: this.day,
                valueInteval: JSON.stringify(this.valueInterval),
                city: this.city,
                district:this.district,
                mktcenter:this.mktcenter,
                boundsMatrix:JSON.stringify(this.boundsMatrix),
                opacity:this.opacity,
                gridLevel:this._gridLevel,
                notCount:JSON.stringify(this.notCount),
            }, //参数
            dataType:'json',
            url: "/NOCE/portal/pages_batchGrid_BatchGrid_getGridDataImg.action",
            success: function(data) {
                let startTime = new Date();
                thisObj._gridImgBase = [];
                if (data){
                    if(data.status == 'success'){
                        if(Array.isArray(data.result)){
                            for(let i=0;i<data.result.length;i++){
                                let img=new Image();
                                img.src=data.result[i].dataImage;
                                img.imgX = data.result[i].x;
                                img.imgY = data.result[i].y;
                                thisObj._gridImgBase.push(img);
                            }
                        }
                        console.log('大范围栅格图片获取成功：'+data.message);
                    }else if(data.status == 'failure'){
                        console.log('大范围栅格图片获取失败：'+data.result);
                    }

                }
                thisObj.drawGrid = true;
                thisObj.drawGridToMap();
                let endTime = new Date();
                // console.log('回调耗时：'+(endTime.getTime() - startTime.getTime()));
                console.log('请求总耗时：'+(endTime.getTime() - ajaxStartTime.getTime()));
            },
            error:function(data){
                console.log('gridQueryError');
                // alert('响应失败！');
            }
        });
    }

    loadMassiveGridResultList(){
        let ajaxStartTime = new Date();
        if(this.reloadGridAjax){
            this.reloadGridAjax.abort();
        }

        let nextGridPixelX = leftTopStartPixel.x;
        let nextGridPixelY = leftTopStartPixel.y;
        let beforeW = 0;
        this.gridNumToPixelLength = {};
        for(let i = minLngNum; i <= maxLngNum; i++){
            let w = this.boundsMatrix.boundsLngNumWidth[i];
            if($.isNumeric(beforeW) && beforeW > 0){
                nextGridPixelX += beforeW;
            }else{
                nextGridPixelX += w;
            }
            nextGridPixelY = leftTopStartPixel.y;
            let beforeH = 0;
            for(let j = maxLatNum; j >= minLatNum; j--){
                let currentGridNum = i*gridLen + j;
                let h = this.boundsMatrix.boundsLatNumHeight[j];
                if($.isNumeric(beforeH) && beforeH > 0){
                    nextGridPixelY += beforeH;
                }else{
                    nextGridPixelY += h;
                }


                this.gridNumToPixelLength[currentGridNum] = {
                    x:nextGridPixelX,
                    y:nextGridPixelY,
                    w:w,
                    h:h
                };
                beforeH = h;
                beforeW = w;
            }
        }
        let thisObj = this;
        this.reloadGridAjax = $.ajax({
            type: "post",
            url: "pages_batchGrid_BatchGrid_queryGridData.action",
            dataType: "json",
            timeout : 60*1000, //超时时间设置，单位毫秒
            // async: false,
            data:{
                polygon: this.polygon,
                bounds: this.mapBounds,
                mapLevel: this._zoom,
                divisionBand: this.divisionBand,
                bandType: JSON.stringify(this.bandType),
                gridType: this.gridType,
                timeType: this.timeType,
                dataType: this.dataType,
                day: this.day,
                valueInteval: JSON.stringify(this.valueInterval),
                city: this.city,
                district:this.district,
                mktcenter:this.mktcenter,
                boundsMatrix:JSON.stringify(this.boundsMatrix),
                opacity:this.opacity,
                gridLevel:this._gridLevel,
                notCount:JSON.stringify(this.notCount),
            },
            success: function (data) {
                let handleLngLatNum = new Date();
                if(data){
                    if(data.status == 'success'){
                        thisObj._GridResultArr = data.result;
                        console.log("查询成功:"+data.message);
                    }else if(data.status == 'failure'){
                        thisObj._GridResultArr = [];
                        console.log("查询失败原因:"+data.result);
                    }
                }else{
                    thisObj._GridResultArr = [];
                    console.log("查询失败原因:返回数据不正确");
                }

                let handleTime = new Date();
                thisObj.drawGrid = true;
                thisObj.drawGridToMap();
            },
            error: function (XMLHttpRequest, textStatus) {
                console.warn(textStatus);
            }
        });
    }
    drawGridToMap(){
        this._clearLayers = false;
        if(this._gridCanvasLayers == null){
            this._gridCanvasLayers = new BMap.CanvasLayer({
                update: this._drawDataForMap.bind(this),//this._depalyDraw.bind(this),
                paneName: this.canvasPaneName,
                zIndex: this.canvasLineIndex
            });
            this._map.addOverlay(this._gridCanvasLayers);
        }else{
            this._gridCanvasLayers.draw();
        }
    }

    clearCanvasLayers() {
        if (this._gridCanvasLayers != null) {
            //this._map.removeOverlay(this._mapCanvasLayers);
            //this._mapCanvasLayers = null;
            let ctx = this._gridCanvasLayers.canvas.getContext("2d");
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            this._clearLayers = true;
        }
    }

    _drawDataForMap(){

        if(this._clearLayers){
            return;
        }

        let ctx = this._gridCanvasLayers.canvas.getContext("2d");

        if (!ctx) {
            return;
        }
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if(this.drawGrid == false){
            return;
        }
        ctx.beginPath();
        let gridLen = 100000;
        if (batchGrid.GridLevel <= 10) {
            gridLen = 1000000;
        }
        let startTime = new Date();
        if(this.showType == 'image'){
            if(this._gridImgBase.length > 0){
                for(let i=0;i<this._gridImgBase.length;i++){
                    if(this._gridImgBase[i].src.startsWith('data:image/png;base64')){
                        ctx.drawImage(this._gridImgBase[i],this._gridImgBase[i].imgX,this._gridImgBase[i].imgY);
                    }
                }
            }
        }else if(this.showType == 'grid'){
            ctx.globalAlpha = this.opacity;
            for(let i=0;i<this._GridResultArr.length;i++){
                /*let gridLngLatArr = gridLngLat(parseInt(batchGrid.GridResultArr[i][0]), batchGrid.GridLevel, gridLen);//[minLng, minLat, midLng, midLat, maxLng, maxLat];
                let leftTopPixel = batchGrid.map.pointToPixel(new BMap.Point(gridLngLatArr[0], gridLngLatArr[5]));
                let rightButtomPixel = batchGrid.map.pointToPixel(new BMap.Point(gridLngLatArr[4], gridLngLatArr[1]));
                ctx.fillStyle = batchGrid.getColorByLevel(parseInt(batchGrid.GridResultArr[i][1]));;
                ctx.fillRect(leftTopPixel.x, leftTopPixel.y, rightButtomPixel.x - leftTopPixel.x, rightButtomPixel.y - leftTopPixel.y);*/


                ctx.fillStyle = this.getColorByLevel(parseInt(this._GridResultArr[i][1]));
                let gridParam = this.gridNumToPixelLength[this._GridResultArr[i][0]];
                ctx.fillRect(gridParam.x, gridParam.y, gridParam.w, gridParam.h);
            }
        }
        let endTime = new Date();
        console.log('绘制耗时：'+ (endTime.getTime() - startTime.getTime()));

    }

    getColorByLevel(level){
        let color = '';
        for(let i=0;i<this.valueInterval.length;i++){
            if(this.valueInterval[i].level && this.valueInterval[i].color){
                if(level == this.valueInterval[i].level){
                    color = this.valueInterval[i].color;
                    break;
                }
            }
        }
        return color;
    }

}

export {MassiveGridQuery}