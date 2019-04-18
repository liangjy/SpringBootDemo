$(function (){
    IntelligentTuning.searchTextInit();
})

/**
 * ********************************
 * @funcname searchenter
 * @funcdesc 搜索输入绑定回车
 * @param {object} event 绑定的键盘事件
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
function searchenter(event) {
    event = event || window.event;
    if (event.keyCode == 13) {
        $('#searchResult li').eq(0).click();
    }
}

/**
 * ********************************
 * @funcname IntelligentTuning.searchTextInit
 * @funcdesc 对搜索的文本输入框绑定事件
 * @param
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuning.searchTextInit = function (){
    /*---搜索框输入文本事件---*/
    cpLock = false;
    $('#searchText').on('compositionstart', function(){
        cpLock = true;
    })
    $('#searchText').on('compositionend', function(){
        cpLock = false;
        $('#searchText').trigger('input');
    })

    $('#searchText').on('input',function(){
        if(cpLock){
            return;
        }

        var val = $('#searchText').val().trim();
        $('#searchResult').html('');
        if(val == "") {
            $("#searchResult").hide();
            return;
        }else{
            if(IntelligentTuning.positioningMarker!=null){
                IntelligentTuningMap.map.removeOverlay(IntelligentTuning.positioningMarker);
            }
            // 做延迟进行匹配，避免用户没输一个字符都匹配一次
            if(IntelligentTuning.searchTextVal != val){
                clearTimeout(IntelligentTuning.searchTextTimeout);
                IntelligentTuning.searchTextVal = val;
                IntelligentTuning.searchTextTimeout = setTimeout(IntelligentTuning.searchTextFunc,300);
            }else{
                if (IntelligentTuning.searchTextTimeout!=undefined){
                    clearTimeout(IntelligentTuning.searchTextTimeout);
                }
            }
        }
    });

    /*---搜索框点击事件---*/
    // $('#searchText').on('focus',function(){
    //     if(IntelligentRoadTest.index == null){
    //         IntelligentRoadTest.gotoIndex();
    //     }
    // });
}

/**
 * ********************************
 * @funcname IntelligentTuning.searchTextFunc
 * @funcdesc 搜索文本进行匹配后延迟执行的方法，对输入文本进行匹配，根据用户选择的搜索类型进行搜索
 * @param
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuning.searchTextFunc = function (){
    // IntelligentTuning.searchEndType = [];
    IntelligentTuning.seachResult = {};
//搜索按钮，分四种情况，根据名称(小区名称或者地名)、根据经纬度、根据基站id_小区id、基站id进行定位
    var re2=new RegExp('^[\u4e00-\u9fa5]{1,}');
    //var re3=new RegExp("^[0-9]+\.[0-9]+\,[0-9]+\.[0-9]+$");
    /* 1）经度和纬度之前的分隔符支持空白符和全角逗号
    2）默认为百度经纬度，增加对GPS经纬度的支持（纬度后增加“G"或”GPS“后缀表示，大小写不限）*/
    var re3=new RegExp("(^[0-9]+\.[0-9]+(\ |\,|，)[0-9]+\.[0-9]+$)|(^[0-9]+.[0-9]+(\ |\,|，)[0-9]+.[0-9]+(G|GPS|B)$)","i");
    var re4=new RegExp("^[0-9]+\_[0-9]+$");
    var re5 = new RegExp("^[0-9]+$");

    var radioId = $(".coordinateType .active label").attr('id');
    // console.log("radioId--"+radioId);
    /**
    if(re2.test(IntelligentTuning.searchTextVal)){//输入的都是中文,根据小区名称和百度地图搜索进行匹配（最多20条记录）
        IntelligentTuning.searchNameByMap(IntelligentTuning.searchTextVal);
    }else if(re3.test(IntelligentTuning.searchTextVal)){
        IntelligentTuning.searchByLngAndLat(IntelligentTuning.searchTextVal);
    }else if(re4.test(IntelligentTuning.searchTextVal)){
        IntelligentTuning.searchByCellId(IntelligentTuning.searchTextVal);
    }else if(re5.test(IntelligentTuning.searchTextVal)){
        IntelligentTuning.searchByBstId(IntelligentTuning.searchTextVal);
    }else if(false){
        IntelligentTuning.searchNameByCellName(IntelligentTuning.searchTextVal);
    }*/
    if(radioId === 'radioAddress'){//输入的都是中文,根据小区名称和百度地图搜索进行匹配（最多20条记录）
        IntelligentTuning.searchNameByMap(IntelligentTuning.searchTextVal);
    }else if(radioId === 'radioGPS' || radioId === 'radioBaidu'){
        $('#searchResult').hide();
        if(re3.test(IntelligentTuning.searchTextVal)){
            IntelligentTuning.searchByLngAndLat(IntelligentTuning.searchTextVal);
        }
    }else if(radioId === 'radioCell' || radioId === 'radioCellName'){
        IntelligentTuning.searchCell(IntelligentTuning.searchTextVal);
    }
}

/**
 * ********************************
 * @funcname IntelligentTuning.searchNameByMap
 * @funcdesc 当用户选择了按照地址进行搜索时，使用百度接口进行名称搜索定位
 * @param
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
//使用百度接口进行名称搜索定位
IntelligentTuning.searchNameByMap = function IntelligentTuning_searchNameByMap(searchText){
    var city = '广东省';
    if($("#cityPermission_common").val() != "全省"){
        city = $("#cityPermission_common").val();
    }

    if(IntelligentTuning.localSearch==undefined){
        IntelligentTuning.localSearch = new BMap.LocalSearch(city, {
            onSearchComplete:IntelligentTuning.localSearchSearchComplete
        });
    }else{
        IntelligentTuning.localSearch.clearResults();
    }
    IntelligentTuning.localSearch.search(searchText);
}
/**
 * ********************************
 * @funcname IntelligentTuning.searchNameByMap
 * @funcdesc 当用户选择了按照地址进行搜索时，百度地图根据名称搜索回调函数，根据结果进行定位
 * @param
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuning.localSearchSearchComplete = function IntelligentTuning_localSearchSearchComplete(result){
    var resultLength = 0;
    if(result.getNumPois()>0){
        if(result.getNumPois()<=10){
            resultLength = result.getNumPois();
        }else{
            resultLength = 10;
        }
    }else{
        console.log('地址匹配不到结果');
    }
    var resultList = [];
    var resultStr = '';
    for(var i=0;i<resultLength;i++){
        var res = {};
        if(result.getPoi(i) != undefined){
            res.id = i;
            res.title = result.getPoi(i).title;
            res.point = result.getPoi(i).point;
            res.address = result.getPoi(i).address;
            res.city = result.getPoi(i).city;
            resultStr += '<li type="address" clickId="'+res.id+'"><span>'+res.address+'</span><span>'+res.title+'</span><span>'+res.city+'</span></li>';
            resultList.push(res);
        }
    }
    // console.log("address");
    // console.log(resultList);
    // IntelligentTuning.searchEndType.push('address');
    IntelligentTuning.seachResult = {type:"address",result: resultList};
    IntelligentTuning.searchResultHtml(resultStr);

}
/**
 * ********************************
 * @funcname IntelligentTuning.searchCell
 * @funcdesc 当用户选择了按照基站小区进行搜索时，根据输入的文本到3,171表进行匹配
 * @param {string} searchText 进行模糊匹配的文本
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuning.searchCell = function (searchText){
    var re4=new RegExp("^[0-9]+\_[0-9]+$");
    if(re4.test(searchText)){
        searchText = searchText.replace('_','\_');
    }
    var city = "";
    if($("#cityPermission_common").val() != "全省"){ //只有全省用户可以搜索全省的基站小区
        city = "and city = '" + $("#cityPermission_common").val() + "'";
    }
    var list = ["AntAdj_01_SectorSearchByNameOrCode","DAY:"+IntelligentTuning.day,"CELL_NAME_OR_CODE:"+searchText, "CITYCOND:" + city];
    var progressBarSqls=[];
    progressBarSqls.push(list);
    var functionlist = [IntelligentTuning.searchBstResult];
    var dataBase = [3];
    progressbarTwo.submitSql(progressBarSqls, functionlist,dataBase,['Cell']);
}

/**
 * ********************************
 * @funcname IntelligentTuning.searchByLngAndLat
 * @funcdesc 当用户选择了GPS坐标或者百度坐标后，根据经纬度进行定位
 * @param {string} searchText 进行定位的经纬度
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuning.searchByLngAndLat = function IntelligentTuning_searchByLngAndLat(searchText) {
    var lng="";//经度
    var lat="";//纬度
    if(searchText.toUpperCase().lastIndexOf("G")>-1||searchText.toUpperCase().lastIndexOf("GPS")>-1){//GPS
        searchText=searchText.replace(/gps|g/i, "").replace(/\ |\,|，/g,",");
        var baiduPoint = GPSUtil.gps84_To_bd09(Number(searchText.split(",")[1]),Number(searchText.split(",")[0]));
        lng = baiduPoint[1];
        lat = baiduPoint[0];
    }else if(searchText.toUpperCase().lastIndexOf("B")>-1){//baidu
        searchText=searchText.replace(/b/i, "").replace(/\ |\,|，/g,",");
        lng = searchText.split(",")[0];
        lat = searchText.split(",")[1];
    }else{//没有添加任何后缀，则通过单选框确定radioGPS radioBaidu
        searchText=searchText.replace(/\ |\,|，/g,",");
        var radioId = $(".coordinateType .active label").attr('id');
        if(radioId === 'radioGPS'){
            var baiduPoint = GPSUtil.gps84_To_bd09(Number(searchText.split(",")[1]),Number(searchText.split(",")[0]));
            lng = baiduPoint[1];
            lat = baiduPoint[0];
        }else{
            lng = searchText.split(",")[0];
            lat = searchText.split(",")[1];
        }
    }

    var polyPoint = new BMap.Point(Number(lng),Number(lat));
    IntelligentTuningMap.map.panTo(polyPoint, {noAnimation:false});

    if(IntelligentTuning.positioningMarker!=null){
        IntelligentTuningMap.map.removeOverlay(IntelligentTuning.positioningMarker);
    }
    var myIcon = new BMap.Icon("../js/IntelligentRoadTest/images/mapPositioning.png", new BMap.Size(23,23));
    IntelligentTuning.positioningMarker = new BMap.Marker(polyPoint,{icon:myIcon});
    IntelligentTuning.positioningMarker.setZIndex(-1);
    IntelligentTuning.positioningMarker.setOffset(new BMap.Size(0,-12));
    IntelligentTuningMap.map.addOverlay(IntelligentTuning.positioningMarker);


}
/**
 * ********************************
 * @funcname IntelligentTuning.searchBstResult
 * @funcdesc 用户进行基站小区模糊匹配的回调函数
 * @param {object} data 模糊搜索的结果
 * @param {string} type 搜索的类型
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuning.searchBstResult = function IntelligentTuning_searchBstResult(data,type){
    var result = callBackChangeData(data);
    // console.log(result);
    // IntelligentTuning.searchEndType.push(type);
    IntelligentTuning.seachResult = {type:type, result:result};
    var resultHtmlStr = '';
    for(var j=0;j<result.length;j++){
        resultHtmlStr += '<li type="'+type+'" clickId="'+result[j].cell_code+'"><span>'+result[j].cell_name+'</span><span>'+result[j].cell_code+'</span><span>'+result[j].city+'</span></li>';
    }
    IntelligentTuning.searchResultHtml(resultHtmlStr);
}
/**
 * ********************************
 * @funcname IntelligentTuning.searchResultHtml
 * @funcdesc 用户进行基站小区模糊匹配的回调函数中拼接页面元素的字符串后调用的方法，需要在页面中对显示搜索结果的ul标签进行重置，并对子li节点解绑、绑定点击事件
 * @param {string} resultStr 拼接好的html字符串
 * @return
 * @author 梁杰禹
 * @create
 **********************************
 */
IntelligentTuning.searchResultHtml = function (resultStr){
    if(resultStr != ''){
        $('#searchResult').html(resultStr);
        setTimeout(function(){
            if($('#searchText').val().trim() != "") {
                $('#searchResult').show();
            }
        },100);
    }else{
        $('#searchResult').html('无结果');
        setTimeout(function(){
            if($('#searchText').val().trim() != "") {
                $('#searchResult').show();
            }
        },100);
    }

    $('#searchResult li').unbind('click').bind('click',function(){
        var type = $(this).attr('type');
        var clickId = $(this).attr('clickId');
        if(IntelligentTuning.seachResult.type == type){
            if(type == 'address'){//地址结果匹配
                for(var i=0;i<IntelligentTuning.seachResult.result.length;i++){
                    if(clickId==IntelligentTuning.seachResult.result[i].id){
                        var localPoint = IntelligentTuning.seachResult.result[i].point;
                        IntelligentTuningMap.map.panTo(localPoint, {noAnimation:false});
                        if(IntelligentTuning.positioningMarker!=null){
                            IntelligentTuningMap.map.removeOverlay(IntelligentTuning.positioningMarker);
                        }
                        var myIcon = new BMap.Icon("../js/IntelligentRoadTest/images/mapPositioning.png", new BMap.Size(25,25));
                        IntelligentTuning.positioningMarker = new BMap.Marker(localPoint,{icon:myIcon});
                        IntelligentTuning.positioningMarker.setZIndex(-1);
                        IntelligentTuningMap.map.addOverlay(IntelligentTuning.positioningMarker);
                        // console.log("匹配到地图搜索结果");
                        break;
                    }
                }
            }else if(type == 'Cell'){
                for(var i=0;i<IntelligentTuning.seachResult.result.length;i++){
                    if(clickId==IntelligentTuning.seachResult.result[i].cell_code){
                        //待接入进入该扇区详情页
                        // console.log('扇区匹配结果');
                        // console.log(IntelligentTuning.seachResult.result[i]);
                        IntelligentTuning.isClickList=true;
                        var cell_code = IntelligentTuning.seachResult.result[i].cell_code.split('_');
                        IntelligentTuningMap.gridTypeIndex=getNeedGridType(IntelligentTuningMap);
                        IntelligentTuning.goSectorCompleteMessage(cell_code[0],cell_code[1]);//跳转到详情页
                        IntelligentTuning.getSectorMessageById(cell_code[0],cell_code[1],IntelligentTuning.day,'topMap');
                        break;
                    }
                }
            }
        }
        $('#searchResult').hide();
        $('#searchResult').html('');
    });
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

IntelligentTuning.getSectorXYZ=function IntelligentTuning_getSectorXYZ(band_order){
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
    return {"xy":xy,"z":z,"r":r};
}

IntelligentTuning.add_sector=function (centre,x,y,z,ant_angle){
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

IntelligentTuning.getSectorRadius=function IntelligentTuning_getSectorRadius(band_order){
    var radiusL = 15;
    var radiusS = 12;
    if(band_order==4){
        radiusL = 8;
        radiusS = 5;
    }else if(band_order==3){
        radiusL = 12;
        radiusS = 9;
    }else if(band_order==1){
        radiusL = 18;
        radiusS = 15;
    }
    return {"radiusL":radiusL,"radiusS":radiusS,"bandLevel":band_order};
}