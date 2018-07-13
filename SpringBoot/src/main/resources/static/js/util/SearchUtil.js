var searchUtils = {};

searchUtils.positioningMarker = null;

//匹配中文
searchUtils.matchCN=new RegExp('^[\u4e00-\u9fa5]{1,}');

//匹配经纬度
searchUtils.matchLatAndLon=new RegExp("^[0-9]+\.[0-9]+\,[0-9]+\.[0-9]+$");

//匹配基站id_小区id
searchUtils.matchBTAndCell=new RegExp("^[0-9]+\_[0-9]+$");


/**********************************
 * @author laijunbao
 * @funcdesc
 * map：地图对象，必须传入
 * @create 2017/11/17 0017 9:42
 * @modifier
 * @modify
 ***********************************/
function SearchUtil(obj,searchStr){
    if(obj == undefined||obj == null){
        alert("传入参数对象错误，请检查");
        return;
    }
    if(obj.bMapObj.map == undefined || obj.bMapObj.map == null){
        alert("传入地图参数错误，请检查");
        return;
    }
    if(searchStr == undefined || searchStr == null){
        alert("传入搜索字符串参数错误，请检查");
        return;
    }
    this.obj = obj;
    //地图
    this.map=obj.bMapObj.map;

    //搜索字符串
    this.searchStr = searchStr;

    if(obj.sectorCompent == null){
        var bMapObj={
            map:this.map,
            useSelectTimeQuerySector:true,
            isShowFactoryIcon:false,
            showHighStatn:false,
            sectorColor:"#3295e8",
            circleColor:"#3295e8",
            selectTime:obj.selectTime,
            selectCity:obj.selectCity,
            sectorCell:"基站小区",
            ifShowLodingImage : true
            // selectDistrict:'天河'
        };
        obj.sectorCompent = new SectorUtilForBaidu(bMapObj);
    }

}
/**********************************
 * @author laijunbao
 * @funcdesc 地图搜索
 * @create 2017/11/21 0021 9:09
 * @modifier
 * @modify
 ***********************************/
SearchUtil.prototype.search = function(){
    var that = this;
    var searchStr = that.searchStr;
    var obj = that.obj;
    var temp = that.obj.searchTXTSign;
    if(searchStr != ""){
        //输入的都是中文,用百度地图搜索组件
        if(temp == "地名"){
            if(searchUtils.matchCN.test(searchStr)){
                var localSearch = new BMap.LocalSearch(that.map);
                localSearch.search(searchStr);
                //检索结束后的回调函数
                localSearch.setSearchCompleteCallback(function (searchResult) {
                    if(searchResult.getPoi(0)==undefined){
                        alert("当前地图所在地市搜索不到你输入的地址");
                        return;
                    }else {
                        var localPoint = searchResult.getPoi(0).point;
                        that.searchComplete(localPoint);
                    }

                });
            }else{
                alert("输入的不是地名");
                return;
            }
        }else if(temp == "经纬度"){
            if(searchUtils.matchLatAndLon.test(searchStr)) {
                var lng = searchStr.split(",")[0];
                var lat = searchStr.split(",")[1];
                var polyPoint = new BMap.Point(Number(lng), Number(lat))
                that.map.setCenter(polyPoint);

                var localPoint = that.map.getCenter();
                that.searchComplete(localPoint);
            }else{
                alert("输入的不是经纬度");
                return;
            }
        }else if(temp == "基站id_小区id") {
            if (searchUtils.matchBTAndCell.test(searchStr)) {
                var tex = searchStr.split('_');
                var list = ["IntelligentRoadTest_17_cellPositioning", "DAY:" + obj.selectTime, "BSTID:" + tex[0], "CELLID:" + tex[1]];
                var progressBarSqls = [];
                progressBarSqls.push(list);
                var cellPositioning = function (data) {
                    var result = callBackChangeData(data);
                    if (result.length > 0) {
                        var point = new BMap.Point(result[0].longitude_baidu, result[0].latitude_baidu);
                        that.map.setCenter(point);

                        var localPoint = that.map.getCenter();
                        that.searchComplete(localPoint);
                    } else {
                        alert("当前地图所在地市搜索不到你输入的基站id_小区id");
                    }
                }
                var functionlist = [cellPositioning];
                var dataBase = [3];
                progressbarTwo.submitSql(progressBarSqls, functionlist, dataBase);
            } else {
                alert("当前地图所在地市搜索不到你输入的地址");
            }
        }else {
            alert("当前地图所在地市搜索不到你输入的地址");
        }
    }else{
        alert("输入是空");
    }

    /*if(searchUtils.matchCN.test(searchStr)){
        var localSearch = new BMap.LocalSearch(that.map);
        localSearch.search(searchStr);
        //检索结束后的回调函数
        localSearch.setSearchCompleteCallback(function (searchResult) {
            if(searchResult.getPoi(0)==undefined){
                alert("当前地图所在地市搜索不到你输入的地址");
                return;
            }else {
                var localPoint = searchResult.getPoi(0).point;
                that.searchComplete(localPoint);
            }

        });
    }
    //经纬度定位
    else if(searchUtils.matchLatAndLon.test(searchStr)) {
        var lng = searchStr.split(",")[0];
        var lat = searchStr.split(",")[1];
        var polyPoint = new BMap.Point(Number(lng), Number(lat))
        that.map.setCenter(polyPoint);

        var localPoint = that.map.getCenter();
        that.searchComplete(localPoint);
    }
    //基站id_小区id
    else if(searchUtils.matchBTAndCell.test(searchStr)){
        var tex = searchStr.split('_');
        var list = ["IntelligentRoadTest_17_cellPositioning","DAY:"+obj.selectTime,"BSTID:"+tex[0],"CELLID:"+tex[1]];
        var progressBarSqls=[];
        progressBarSqls.push(list);
        var cellPositioning = function (data) {
            var result = callBackChangeData(data);
            if (result.length > 0) {
                var point = new BMap.Point(result[0].longitude_baidu, result[0].latitude_baidu);
                that.map.setCenter(point);

                var localPoint = that.map.getCenter();
                that.searchComplete(localPoint);
            }else{
                alert("当前地图所在地市搜索不到你输入的基站id_小区id");
            }
        }
        var functionlist = [cellPositioning];
        var dataBase = [3];
        progressbarTwo.submitSql(progressBarSqls,functionlist,dataBase);
    }else {
        alert("当前地图所在地市搜索不到你输入的地址");
    }*/

}
/**********************************
 * @author laijunbao
 * @funcdesc 定位完成，重绘
 * @param
 * @create 2017/11/21 0021 17:10
 * @modifier 
 * @modify 
 ***********************************/
SearchUtil.prototype.searchComplete = function SearchUtil_searchComplete(localPoint){
    var that = this;
    var searchStr = that.searchStr;
    var obj = that.obj;
    that.map.setCenter(localPoint);

    if(searchUtils.positioningMarker!=null){
        that.map.removeOverlay(searchUtils.positioningMarker);
    }
    var myIcon = new BMap.Icon("../js/BasestationAndSectorQuery/images/mapPositioning.png", new BMap.Size(30,30));
    searchUtils.positioningMarker = new BMap.Marker(localPoint,{icon:myIcon});
    searchUtils.positioningMarker.setZIndex(-1);
    searchUtils.positioningMarker.setOffset(new BMap.Size(0,-15));
    that.map.addOverlay(searchUtils.positioningMarker);

    that.map.setZoom(18)

    //匹配地图中心点所在的区县
    var district = obj.getCenterPointDistrict(localPoint);
    if(obj.cityPermission_common=="全省"){
        if(district!=null){
            if(district.city!=obj.selectCity||district.name!=obj.selectDistrict){
                obj.city = district.city;
                obj.country = district.name;
                obj.mktcenter = null;
            }
            if(district.city!=obj.sectorCompent.selectCity){
                obj.sectorCompent.selectCity = district.city;
                obj.sectorCompent.queryByTemplate();
            }else{
                obj.sectorCompent.draw();
            }

        }
    }else{
        if(district!=null){
            if(district.city==obj.cityPermission_common){
                if(district.city!=obj.city||district.name!=obj.country){
                    obj.city = district.city;
                    obj.country = district.name;
                    obj.mktcenter = null;
                }

                // if(district.city!=obj.sectorCompent.selectCity){
                    obj.sectorCompent.selectCity = district.city;
                    obj.sectorCompent.queryByTemplate();
                // }else{
                //     obj.sectorCompent.draw();
                // }
            }

        }
    }
}


