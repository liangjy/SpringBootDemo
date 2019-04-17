/*******************图层配置js*********************/
var IntelligentRoadTestSystemLayerV3={};
IntelligentRoadTestSystemLayerV3.gridYearDate="20190325";//20190325开始,查询栅格需要增加年份,key值如:250319_1_2467714497
IntelligentRoadTestSystemLayerV3.isAudit=0;
//专题图层的对象
IntelligentRoadTestSystemLayerV3.poorArea={
    "poor":{index:0,type:0,name:"弱覆盖区"},
    "m3Sector":{index:26,type:"IS_M3_COV",name:"MOD3干扰扇区"},
    "olSector":{index:27,type:"IS_OL_COV",name:"重叠覆盖扇区"},
    "cbSector":{index:28,type:"IS_CB_COV",name:"越区覆盖扇区"},
    "m3PoorArea":{index:30,type:6,name:"MOD3干扰区"},
    "olPoorArea":{index:31,type:7,name:"重叠覆盖区"},
    "cbPoorArea":{index:32,type:8,name:"越区覆盖区"},
    "upPoorArea":{index:24,type:4,name:"上行低速区"},
    "downPoorArea":{index:25,type:5,name:"下行低速区"},
    "sector":{index:3,type:"",name:"扇区"}
};
//栅格RSRP总和          140栅格MR条数   	栅格RSRP平均值    	接入扇区	105栅格MR条数		所在数组的位置
IntelligentRoadTestSystemLayerV3.gridBandObj={
    "800M":["f800m_rsrp_140_sum","f800m_rsrp_140_cnt","f800m_rsrp_140_avg","f800m_sector_set","f800m_rsrp_140_cnt",3,1],
    "1.8G":["f18g_rsrp_140_sum","f18g_rsrp_140_cnt","f18g_rsrp_140_avg","f18g_sector_set","f18g_rsrp_105_cnt",4,2],
    "2.1G":["f21g_rsrp_140_sum","f21g_rsrp_140_cnt","f21g_rsrp_140_avg","f21g_sector_set","f21g_rsrp_105_cnt",5,3],
    "2.6G":["f26g_rsrp_140_sum","f26g_rsrp_140_cnt","f26g_rsrp_140_avg","f26g_sector_set","f26g_rsrp_105_cnt",6,4]
};
IntelligentRoadTestSystemLayerV3.userComplainCompent=null;//用户抱怨图层
IntelligentRoadTestSystemLayerV3.systemLayerObj=null;
IntelligentRoadTestSystemLayerV3.isShowUCGrid = false;//正在查看用户抱怨的栅格
IntelligentRoadTestSystemLayerV3.colorBarArrUC = [];//需要隐藏的图例id数组---用户抱怨
IntelligentRoadTestSystemLayerV3.isShowUserComplain=false;//是否勾选用户抱怨图层
IntelligentRoadTestSystemLayerV3.ucCanArr = [];//用户抱怨热点栅格数据
IntelligentRoadTestSystemLayerV3.hLUserComplain = null;//越级工单和全量工单，不能直接画圆（像素经纬度会变化），所以直接打点
/*智能测评V3系统图层文件*/
$(function (){
    //拖拽图层插件配置
    $(".layerTabCon").sortable({
        cancel: "input,.layerTabCon table tr:not(:first-child)",
        start: function( event, ui ) {
            var item =ui.item;
            item[0].className = 'ui-sortable-handle borderLine';
        },
        stop: function( event, ui ) {
            var item =ui.item;
            item[0].className = 'ui-sortable-handle';
        }
    });

	IntelligentRoadTestSystemLayerV3.isAudit= noceUtil.GetQueryString("isAudit");
    /*判断localStorage缓存中是否有数据,有数据则需要根据localStorage中的配置初始化图层顺序，内容，颜色*/
    if(window.localStorage) {//检查浏览器是否支持localStorage
        var systemLayer = localStorage.getItem("systemLayer");
        // systemLayer=null;
        if(systemLayer!=null&&systemLayer!=""){
            IntelligentRoadTestSystemLayerV3.systemLayerObj = JSON.parse(systemLayer);
            /*var systemLayerZIndex=IntelligentRoadTestSystemLayerV3.systemLayerObj.zIndex;
            systemLayerZIndex.sort(function (a,b) {//升序
                var x = a.index;
                var y = b.index;
                return ((x < y) ? 1 : ((x > y) ? 0 : 0));
            });*/
            if(!IntelligentRoadTest.showNrCover){
                IntelligentRoadTestSystemLayerV3.fillLayerTabCon();//填充#submitForData里面的文本标签数据
            }
        }else{
            IntelligentRoadTestSystemLayerV3.systemLayerObj=IntelligentRoadTestSystemLayerV3.getNowSystemLayer();//用户没有缓存时也要记住配置
        }
    }


    //系统图层提示
    var systemTip = localStorage.getItem("notip");
    if(systemTip){
        IntelligentRoadTest.systemTip=false;
    }

    //”我知道了“弹框点击事件
    $(".btn-know").click(function(){
        localStorage.setItem("notip",true);
        IntelligentRoadTest.systemTip=false;
        $(".layerGif").hide();
        // $(".layer-info").show();
    });

    //图层按钮的点击事件
    $(".select-layer").click(function (event) {
        event.stopPropagation();
        $(".help-info").hide();
        IntelligentRoadTest.editImgSrc($(this));
        if ($(".rightToolbar ").css("width")=="120px"){
            setTimeout(function(){
                $(".layer-info").toggle();
            },800);
        }else{
            $(".layer-info").toggle();
        }

        if($(".layerTabTitle li:first-child").hasClass("active")&&IntelligentRoadTest.systemTip){
            $(".layerGif").show();
            IntelligentRoadTest.systemTip=false;
            setTimeout(function(){
                $(".know").show();
            },8000);
        }
    });
    $(".layer-info").click(function (event) {
        event.stopPropagation();
    });
    // $(".btn-showTableInfo img").addClass("rotateImg");
    $('.layerWrap table tr:first-child').click(function(e){
        if($(e.target).closest(".layer-name,.layer-opacity .opacityText,.layer-opacity .iptNum").length == 0){
            $(this).siblings().toggle();
            if($(this).find(".btn-showTableInfo img").hasClass("rotateImg")){
                $(this).find(".btn-showTableInfo img").removeClass("rotateImg");
            }else{
                $(this).find(".btn-showTableInfo img").addClass("rotateImg");
            }
        };

    });

    //硬件GPS坐标，百度地图坐标点击
    $('.coordinateType input[name="coordinate"]').click(function(event){
        $('.coordinateType  label').css("color","");
        if($(this).is(':checked')){
            $(this).siblings('label').css("color","#3285FF");
        }
    });

    //选中文字变色
    $('.layerTabCon input[type="checkbox"],.layerTabCon input[type="radio"]').click(function(event){
        event.stopPropagation();
        var id=$(this).attr('id');
        var name=$(this).attr('name');
        if($(this).is(':checked')){
            if(!noceUtil.isUndefined(id)){
                /*$(".poorIptNum").attr("disabled",false);
                $('.poorIptNum').parents("td").removeClass("greyColor");*/
                if(id=="radioGPS"||id=="radioBaidu"){
                    $(this).parent().siblings('li').children('label').css("color","");
                }else if (id=="sector"){//扇区
                    if($(this).parents('tr').siblings().children().find('input:checkbox:checked').length<=0){
                        $(this).parents('tr').siblings().children().find('input:checkbox').prop("checked", true);
                        $(this).parents('tr').siblings().children().find('input:checkbox').siblings('label').css("color","#3285FF");
                    }
                }else if(id=="poor"){//弱覆盖区
                    $('input:radio[name="type-quyu"]').prop("checked",false);
                    $('input:radio[name="type-quyu"]').siblings('label').css("color","");
                }/*else if(id=="m3Sector"||id=="cbSector"||id=="olSector"){//MOD3干扰区/越区覆盖区/重叠覆盖区
                    if(!$("input#poor").is(":checked")){//弱区没有选中，说明只选中了MOD3干扰区/越区覆盖区/重叠覆盖区一个，禁用连片数量
                        $(".poorIptNum").attr("disabled",true);
                        $('.poorIptNum').parents("td").addClass("greyColor");
                    }

                }*/
            }
            if(name!="layer"){
                $(this).siblings('label').css("color","#3285FF");
            }
        }else{
            $(this).siblings('label').css("color","");
        }
        /*if(!$("input#poor").is(":checked")&&($("input#m3Sector").is(":checked")||$("input#cbSector").is(":checked")||$("input#olSector").is(":checked"))){
            $(".poorIptNum").attr("disabled",true);//禁用连片数量
            $('.poorIptNum').parents("td").addClass("greyColor");
        }else{
            $(".poorIptNum").attr("disabled",false);//取消禁用连片数量
            $('.poorIptNum').parents("td").removeClass("greyColor");
        }*/
    });

    //栅格图层【覆盖频段】点击事件
    $('.fieldset li input').click(function(){
        var index = $('.fieldset li input').index($(this));
        $(".bandDiv").eq(index).show().siblings().hide();
    });
    //栅格图层【栅格类型】点击事件
    $('.fieldset2 li input').click(function(){
        var radioName = $(this).attr("name");
        var gridType="gridFieldSetInfo";
        if(radioName == 'grid-type-line'){//线段的栅格
            gridType="lineFieldSetInfo";
        }
        var index = $('.fieldset2 li input[name="'+radioName+'"]').index($(this));
        $("."+gridType+" .gridTypeDiv").eq(index).show().siblings().hide();

//    	console.log("radioName:"+radioName);
    	
    	$(this).parent('li').siblings('li').children('label').css("color","");
    	$(this).siblings('label').css("color","#3285FF");
    	if(radioName == 'grid-type'){
    		if(index!=2){//不等于覆盖质量的类型
                $('.fieldset input').attr("disabled",false);
                $('.fieldset input').siblings('label').removeClass("greyColor");
                $('input[name="gridNum"]').attr("disabled",false);
                $('input[name="gridNum"]').siblings('label').removeClass("greyColor");

                $("input#bf-band").click();
                $("input#zjr-grid").click();
                $('.fieldset input').attr("disabled",true);
                $('.fieldset input').siblings('label').addClass("greyColor");

                $("input#agps-mr").click();
                $('input#grid').parents('tbody').find('input:checkbox:not("#grid"):checked,input:radio:checked').siblings('label').css("color","#3285FF");
                $('input[name="gridNum"]').attr("disabled",true);
                $('input[name="gridNum"]').siblings('label').addClass("greyColor");

                if(index==6){//EC/IO
                    $(".bandDiv input:radio").attr("checked",false);
                    $('input[name="gridNum"]').attr("checked",false);
                }


                /*if(index==0||index==1){//全量MR、AGPS变灰
                    $("input#agps-mr").click();
                    $('input[name="gridNum"]').attr("disabled",true);
                    $('input[name="gridNum"]').siblings('label').addClass("greyColor");
                }else{
                    $('input[name="gridNum"]').attr("disabled",false);
                    $('input[name="gridNum"]').siblings('label').removeClass("greyColor");
                }*/
            }else{
    		    if(IntelligentRoadTest.isShowGrid&&IntelligentRoadTest.currentLocation.toLowerCase().endsWith("sector")){//当前正在查看栅格扇区
                    $('input[name="gridNum"]').attr("disabled",false);
                    $('input[name="gridNum"]').siblings('label').removeClass("greyColor");
                }else{
                    $('.fieldset input').attr("disabled",false);
                    $('.fieldset input').siblings('label').removeClass("greyColor");
                    $('input[name="gridNum"]').attr("disabled",false);
                    $('input[name="gridNum"]').siblings('label').removeClass("greyColor");
                }
    		    if($(".bandDiv input:radio:checked").length<=0){
                    $("input#zjr-grid").click();
                }
    		    if($('input[name="gridNum"]:checked').length<=0){
                    $("input#agps-mr").click();
                }
                $('input#grid').parents('tbody').find('input:checkbox:not("#grid"):checked,input:radio:checked').siblings('label').css("color","#3285FF");
            }
    	}
    });

    //栅格图层覆盖质量点击事件
   /* $('input[name="legend-grid"]').click(function(){
        var index=$('input[name="legend-grid"]').index($(this));
        var $legen=$(".colorLegen").children('.map-w-i').eq(index);
        var id = $legen.attr("id");
        if($legen.hasClass("grey")){//判断该图例颜色是否为灰
            //灰色的时候，呈现栅格
            $legen.removeClass("grey");
            IntelligentRoadTest.colorBarArr = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArr,id.split("_")[1]);
        }else{
            //呈现该图例栅格
            $legen.addClass("grey");
            IntelligentRoadTest.colorBarArr.push(id.split("_")[1]);
//				console.log("清除栅格");
        }

        IntelligentRoadTest.colorbarEndRedraw();
        // console.log(IntelligentRoadTest.colorBarArr);
        if(IntelligentRoadTest.index==15){
            IntelligentRoadTest.metorColorLegen();
        }
        if(IntelligentRoadTest.index==7||IntelligentRoadTest.index==8||IntelligentRoadTest.index==14){
            IntelligentRoadTest.osmColorLegen();
        }

    });*/

    //场景图层/专题图层点击事件
    $('input[type="radio"][name="sceneRadio"],input[type="radio"][name="type-quyu"]').click(function (){
        var name=$(this).attr("name");
        var id=$(this).attr("id");
        $('input:radio[name="'+name+'"]').siblings('label').css("color","");
        $(this).siblings('label').css("color","#3285FF");
    });

    //栅格图层栅格数据点击事件
    $('input[type="radio"][name="gridNum"],input[type="radio"][name="gridTime"],input[name="chq-grid"],input[name="band-radio"],input[name="grid-type"]').click(function (){
        $(this).parent().siblings().find('label').css("color","");
    });
    

    /*系统图层初始化事件start*/
    /*if(!$("#sector").is(':checked')){
        /!*$("#sector").parents("table").addClass("unCheched");
        $("#sector").parents('tr').siblings().children().find('input:checkbox,input:radio').attr("disabled",true);
        $("#sector").parents('tr').siblings().children().find('.squarePick').addClass("colorUnClick");
        $("#sector").parent().next('.layer-opacity').find('input').attr("disabled",true);*!/
    }else{
        $("#sector").next().css("color","#3285FF");
    }
    if(!$("#poor").is(':checked')){
        /!*$("#poor").parents("table").addClass("unCheched");
        $("#poor").parents('tr').siblings().children().find('input:checkbox,input:radio,input[type="number"]').attr("disabled",true);
        $("#poor").parents('tr').siblings().children().find('.squarePick').addClass("colorUnClick");
        $("#poor").parent().next('.layer-opacity').find('input').attr("disabled",true);*!/
    }else{
        $("#poor").next().css("color","#3285FF");
    }
    if(!$("#scene").is(':checked')){
        /!*$("#scene").parents("table").addClass("unCheched");
        $("#scene").parents('tr').siblings().children().find('input:checkbox,input:radio').attr("disabled",true);
        $("#scene").parents('tr').siblings().children().find('.squarePick').addClass("colorUnClick");
        $("#scene").parent().next('.layer-opacity').find('input').attr("disabled",true);*!/
    }else{
        $("#scene").next().css("color","#3285FF");

    }*/
    $('input:radio[name="coordinate"]:checked').next().css("color","#3285FF");
    if(!IntelligentRoadTest.showNrCover){
        /*系统图层初始化事件start*/
        IntelligentRoadTestSystemLayerV3.initSystemLayer(IntelligentRoadTestSystemLayerV3.systemLayerObj);
        /*系统图层初始化事件end*/
    }
    IntelligentRoadTestGridLegend.initNotCount();//初始化图例记录数
    /*正方形颜色选择插件*/
    $('.squarePick').colpick({
        layout:'rgbhex',
        color:'76ACFC',
        livePreview:0,
        onSubmit:function(hsb,hex,rgb,el) {
            $(el).css('background-color', '#'+hex);
            $(el).colpickHide();
        }
    });

    $('.iptNum').blur(function() {
        var id=$(this).attr('id');
        var value=$(this).val();
        if(id=='minGridNum'){
            if(Number(value)<3){
                alert("请输入大于等于3的数值！");
                $(this).val("10");
                return;
            }
        }else if(id=='maxGridNum'){
            if(Number(value)<10&&value!=""){
                alert("请输入大于等于10的数值！");
                $(this).val("");
                return;
            }

        }else if(id=='sectorOpacity'||id=='poorOpacity'||id=='gridOpacity'||id=='sceneOpacity'){
            if(Number(value)<0.1||Number(value)>1){
                alert("请输入[0.1,1]区间的数值！");
                $(this).val("0.5");
                return;
            }
        }
    });


    /*//如果只选中了mod3干扰，重叠，越区则禁用连片栅格数量
    if(!$("input#poor").is(":checked")&&($("input#m3Sector").is(":checked")||$("input#cbSector").is(":checked")||$("input#olSector").is(":checked"))){
        $(".poorIptNum").attr("disabled",true);//取消禁用连片数量
        $('.poorIptNum').parents("td").addClass("greyColor");
    }*/


});


/**********************************
 * @funcname IntelligentRoadTest.resetSystemLayer
 * @funcdesc 根据系统缓存初始化图层配置
 * @param {Object} systemLayerObj 图层缓存
 * @return {null}
 * @author 陈小芳
 * @create 20180410
 ***********************************/
IntelligentRoadTestSystemLayerV3.resetSystemLayer=function IntelligentRoadTestSystemLayerV3_resetSystemLayer(systemLayerObj){
    if(systemLayerObj!=null&&systemLayerObj!=""){
        /*//4G扇区初始化 start*/
        var sectorObj=systemLayerObj.sector;
        if(!isNull(sectorObj.opacity)){
            $('#sectorOpacity').val(sectorObj.opacity);//透明度
        }
        $("#sector").parents('table').find('input:checkbox').prop("checked", false);//先置空4g扇区图层所有选项
        for(var i2=0;i2<sectorObj.type.length;i2++){//扇区类型
            if(!$('input[name="type-sector"][value="'+sectorObj.type[i2]+'"]').is(':checked')){
                $('input[name="type-sector"][value="'+sectorObj.type[i2]+'"]').click();
            }
        }
        for(var i1=0;i1<sectorObj.band.length;i1++){//使用频段
            if(!$('input[name="band-sector"][value="'+sectorObj.band[i1]+'"]').is(':checked')){
                $('input[name="band-sector"][value="'+sectorObj.band[i1]+'"]').click();
            }
        }
        for(var i3=0;i3<sectorObj.factory.length;i3++){//扇区设备厂家
            if(!$('input[name="factory-sector"][value="'+sectorObj.factory[i3].type+'"]').is(':checked')){
                $('input[name="factory-sector"][value="'+sectorObj.factory[i3].type+'"]').click();
            }
            $('input[name="factory-sector"][value="'+sectorObj.factory[i3].type+'"]').next().css("background-color",sectorObj.factory[i3].color);
        }

        for(var i4=0;i4<sectorObj.covSector.length;i4++){//专题扇区
            if(!$('input[name="cov-sector"][value="'+sectorObj.covSector[i4]+'"]').is(':checked')){
                $('input[name="cov-sector"][value="'+sectorObj.covSector[i4]+'"]').click();
            }
        }
        if(sectorObj.selected){
            $("#sector").click();
        }
        /*//4G扇区初始化 end*/

        /*2g扇区初始化start*/
        var sector2GObj=systemLayerObj.sector2G;
        if(!isNull(sector2GObj)){
            $("#sector2G").parents('table').find('input:checkbox:not(":disabled")').prop("checked", false);//先置空2g扇区图层所有选项
            if(sector2GObj.selected){
                if(!$("#sector2G").is(':checked')){
                    $("#sector2G").click();
                }
            }
            if(!isNull(sector2GObj.opacity)){
                $('#sector2GOpacity').val(sector2GObj.opacity);//透明度
            }
            for(var k3=0;k3<sector2GObj.factory.length;k3++){//扇区设备厂家
                if(!$('input[name="factory-sector-2g"][value="'+sector2GObj.factory[k3].type+'"]').is(':checked')){
                    $('input[name="factory-sector-2g"][value="'+sector2GObj.factory[k3].type+'"]').click();
                }
                $('input[name="factory-sector-2g"][value="'+sector2GObj.factory[k3].type+'"]').next().css("background-color",sector2GObj.factory[k3].color);
            }
        }
        /*2g扇区初始化end*/

        /*移动站址初始化 start*/
        var sectorYDObj=systemLayerObj.yd_sector;
        if(!isNull(sectorYDObj)){
            $("#yd_sector").parents('table').find('input:checkbox:not(":disabled")').prop("checked", false);//先置空2g扇区图层所有选项
            if(sectorYDObj.selected){
                $("#yd_sector").click();
            }
            if(!isNull(sectorYDObj.opacity)){
                $('#yd_SectorOpacity').val(sectorYDObj.opacity);//透明度
            }
            for(var k5=0;k5<sectorYDObj.factory.length;k5++){//扇区设备厂家
                if(!$('input[name="factory-sector-yd"][value="'+sectorYDObj.factory[k5].type+'"]').is(':checked')){
                    $('input[name="factory-sector-yd"][value="'+sectorYDObj.factory[k5].type+'"]').click();
                }
                $('input[name="factory-sector-yd"][value="'+sectorYDObj.factory[k5].type+'"]').next().css("background-color",sectorYDObj.factory[k5].color);
            }
        }
        /*移动站址初始化 end**/

       /* //栅格初始化 start*/
        var gridObj=systemLayerObj.grid;
        if(!isNull(gridObj.opacity)){
            $('#gridOpacity').val(gridObj.opacity);//透明度
        }
        if(!$('input[name="band-radio"][value='+gridObj.band.gridBandIndex+']').is(':checked')){
            $('input[name="band-radio"][value='+gridObj.band.gridBandIndex+']').click();
        }
        if(gridObj.band.gridBandIndex==0){
            if(!$('input[name="chq-grid"][value='+gridObj.band.gridBand[0]+']').is(':checked')){
                $('input[name="chq-grid"][value='+gridObj.band.gridBand[0]+']').click();
            }
        }else{
            for(var i3=0;i3<gridObj.band.gridBand.length;i3++){//覆盖频段
                if(!$('input[name="band-grid"][value="'+gridObj.band.gridBand[i3]+'"]').is(':checked')){
                    $('input[name="band-grid"][value="'+gridObj.band.gridBand[i3]+'"]').click();
                }
            }
        }

        $('input[name="gridNum"][value="'+gridObj.type+'"]').click();//栅格数据
        $('input[name="gridTime"][value="'+gridObj.time+'"]').click();//栅格时间粒度
        $('input[name="grid-type"][value='+gridObj.thresholds.gridTypeIndex+']').click();
        var gridIndex=$('input[name="grid-type"][value='+gridObj.thresholds.gridTypeIndex+']').parent().index();
        var gridThresholds=gridObj.thresholds.gridThresholds;
        for(var i4=0;i4<gridThresholds.length;i4++){//覆盖质量
            if(gridThresholds[i4].selected){
                $('.gridFieldSetInfo .gridTypeDiv:eq('+gridIndex+') input[value="'+gridThresholds[i4].level+'"]').prop("checked",true);
                $('.gridFieldSetInfo .gridTypeDiv:eq('+gridIndex+') input[value="'+gridThresholds[i4].level+'"]').siblings('label').css("color","#3285FF");
            }else{
                $('.gridFieldSetInfo .gridTypeDiv:eq('+gridIndex+') input[value="'+gridThresholds[i4].level+'"]').prop("checked",false);
                $('.gridFieldSetInfo .gridTypeDiv:eq('+gridIndex+') input[value="'+gridThresholds[i4].level+'"]').siblings('label').css("color","");
            }
            if(!isNull(gridThresholds[i4].color)){
                $('.gridFieldSetInfo .gridTypeDiv:eq('+gridIndex+') input[value="'+gridThresholds[i4].level+'"]').next('.squarePick').css("background-color",gridThresholds[i4].color);
            }
        }

        IntelligentRoadTest.gridBandIndex=gridObj.band.gridBandIndex;//栅格频段下标 0--不分频段  1--区分频段
        IntelligentRoadTest.gridTypeIndex=gridObj.thresholds.gridTypeIndex;//栅格类型下标
        IntelligentRoadTest.gridOpacity=gridObj.opacity;//栅格透明度
        IntelligentRoadTest.gridBand=gridObj.band.gridBand;//栅格频段
        IntelligentRoadTest.gridType=gridObj.type;//栅格数据
        IntelligentRoadTest.gridTime = gridObj.time;//栅格时间粒度
        IntelligentRoadTest.gridThresholds=IntelligentRoadTestSystemLayerV3.getGridThresholds(IntelligentRoadTest.gridTypeIndex, IntelligentRoadTest.gridOpacity);
        /* //栅格初始化 end*/

        //弱区初始化==>专题图层
        /*专题图层 start*/
        var poorObj=systemLayerObj.poorArea;
        if(!isNull(poorObj)){
            if(!isNull(poorObj.opacity)){
                $('#poorOpacity').val(poorObj.opacity);//透明度
            }
            // $('#poorColor').css("background-color",poorObj.poorCover.color);//弱覆盖区连片颜色
            var poorValue=poorObj.poorCover.poorValue;
            for(var i5=0;i5<poorValue.length;i5++){//覆盖质量
                if(!$('input[name="type-quyu"][value='+poorValue[i5].value+']').is(':checked')){
                    $('input[name="type-quyu"][value='+poorValue[i5].value+']').click();//专题图层 区域边界
                    $('input[name="type-quyu"][value='+poorValue[i5].value+']').next().css("background-color",poorValue[i5].color);//专题图层 区域边界

                }
            }
            $('#minGridNum').val(poorObj.poorCover.minGridNum);//最小
            $('#maxGridNum').val(poorObj.poorCover.maxGridNum);//最大
            if(poorObj.selected){
                $("#poorArea").prop("checked",true);
            }else{
                $("#poorArea").prop("checked",false);
            }
        }
        /*专题图层 end*/

       /* //场景初始化 start*/
        var sceneObj=systemLayerObj.scene;
        if(!isNull(sceneObj.opacity)){
            $('#sceneOpacity').val(sceneObj.opacity);//透明度
        }
        $('input:radio[name="sceneRadio"][value="'+sceneObj.area.value+'"]').click();
        $('input:radio[name="sceneRadio"][value="'+sceneObj.area.value+'"]').next().css("background-color",sceneObj.area.color);
        if(sceneObj.selected){
            $("#scene").prop("checked",true);
        }else{
            $("#scene").prop("checked",false);
        }
        /* //场景初始化 end*/

       /* //---用户抱怨初始化 start------*/
        var userComplainObj=systemLayerObj.userComplain;
        if(!isNull(userComplainObj)){
            $("#userComplain").parents('table').find('input:checkbox').prop("checked", false);//先置空2g扇区图层所有选项
            if(!isNull(userComplainObj.opacity)){
                $('#userOpacity').val(userComplainObj.opacity);//透明度
            }

            //全量工单
            $.each(userComplainObj.fullOrder, function (index, obj) {
                $('input:checkbox[name="full-order"][value="'+obj.value+'"]').click();
                $('input:checkbox[name="full-order"][value="'+obj.value+'"]').next().css("background-color",obj.color);
            });
            //抱怨热点
            $.each(userComplainObj.complainHot, function (index, obj) {
                $('input:checkbox[name="complain-hot"][value="'+obj.value+'"]').click();
                $('input:checkbox[name="complain_hot"][value="'+obj.value+'"]').next().css("background-color",obj.color);
            });
            //越级工单
            $.each(userComplainObj.overOrder, function (index, obj) {
                $('input:checkbox[name="over-order"][value="'+obj.value+'"]').click();
                $('input:checkbox[name="over_order"][value="'+obj.value+'"]').next().css("background-color",obj.color);
            });
            if(userComplainObj.selected){
                $("#userComplain").prop("checked",true);
            }else{
                $("#userComplain").prop("checked",false);
            }
        }
        /*//---用户抱怨初始化 end------*/

       /* //-------线段图例 start------------*/
        var lineAreaObj = systemLayerObj.lineArea;
        if(lineAreaObj){
            if(!isNull(lineAreaObj.opacity)){
                $('#lineOpacity').val(lineAreaObj.opacity);//透明度
            }
            if(lineAreaObj.thresholds.lineTypeIndex){
                $('input[name="grid-type-line"][value='+lineAreaObj.thresholds.lineTypeIndex+']').click();
                IntelligentRoadTest.lineTypeIndex = lineAreaObj.thresholds.lineTypeIndex;
            }
            var lineIndex = 3;//对应的配置图例所在的div序号
            if(lineAreaObj.thresholds.lineTypeIndex==0){
                lineIndex = 3;
            }else if(lineAreaObj.thresholds.lineTypeIndex==1){
                lineIndex = 1;
            }else if(lineAreaObj.thresholds.lineTypeIndex==2){
                lineIndex = 2;
            }else{
                lineIndex = 0;
            }

            if(lineIndex!=0){
                var lineThresholds =  lineAreaObj.thresholds.lineThresholds;
                if(lineThresholds){
                    //先根据指标的value得到对应图例的index，然后查找图例所在的顶级div，根据得到的div再转为jquery对象进行查找，所以下面会出现两个$
                    for(var i4=0;i4<lineThresholds.length;i4++){//覆盖质量
                        if(lineThresholds[i4].selected){
                            $($('.lineFieldSetInfo .gridTypeDiv')[lineIndex-1]).find('input[value="'+lineThresholds[i4].level+'"]').prop("checked",true);
                            $($('.lineFieldSetInfo .gridTypeDiv')[lineIndex-1]).find('input[value="'+lineThresholds[i4].level+'"]').siblings('label').css("color","#3285FF");
                        }else{
                            $($('.lineFieldSetInfo .gridTypeDiv')[lineIndex-1]).find('input[value="'+lineThresholds[i4].level+'"]').prop("checked",false);
                            $($('.lineFieldSetInfo .gridTypeDiv')[lineIndex-1]).find('input[value="'+lineThresholds[i4].level+'"]').siblings('label').css("color","");
                        }
                        $($('.lineFieldSetInfo .gridTypeDiv')[lineIndex-1]).find('input[value="'+lineThresholds[i4].level+'"]').next().css("background-color",lineThresholds[i4].color);
                    }
                }

            }
        }
        /* //-------线段图例 end------------*/
    }
    $('.layerTabCon input:checkbox:not("#scene,#poorArea,#grid,#sector,#sector2G,#yd_sector,#userComplain,#lineArea"):checked,.layerTabCon input:radio:checked').siblings('label').css("color","#3285FF");


}

/*系统图层初始化事件*/
/**********************************
 * @funcname IntelligentRoadTest.initSystemLayer
 * @funcdesc 系统图层初始化事件
 * @param {Object} systemLayerObj 图层缓存
 * @return {null}
 * @author 陈小芳
 * @create 20180410
 ***********************************/
IntelligentRoadTestSystemLayerV3.initSystemLayer=function IntelligentRoadTestSystemLayerV3_initSystemLayer(systemLayerObj){
    // var systemLayerObj=IntelligentRoadTestSystemLayerV3.systemLayerObj;
    IntelligentRoadTestSystemLayerV3.resetSystemLayer(systemLayerObj);//根据缓存勾选图层对应的选项
    var isShowPoor = noceUtil.GetQueryString("isShowPoor");
    if(isShowPoor == "1"){ //要显示弱区
        if($("#poorArea").attr("checked") != "checked"){
            $("#poorArea").trigger('click'); //专题图层
        }
        if($("#poor").attr("checked") != "checked"){
            $("#poor").trigger('click'); //弱覆盖区
        }
    }
    //判断是否从审核清单跳转过来，如果是则按照许工提的需求进行系统图层配置的修改 (林楚佳修改)
    var isAudit = noceUtil.GetQueryString("isAudit");
    if(isAudit=="3"){//从【站点规划】跳转过来不做任何处理
        return;
    }
    if(isAudit == "1"){ //如果是从审核清单跳转过来，图层配置要按照以下的配置进行加载
        if($("input#fgzl-type").attr("checked") != "checked"){
            $("input#fgzl-type").trigger('click'); //覆盖质量
        }
        if($("input#bf-band").attr("checked") != "checked"){
            $("input#bf-band").trigger('click'); //不分频段
        }
        if($("input#zjr-grid").attr("checked") != "checked"){
            $("input#zjr-grid").trigger('click');//主接入场强
        }
        if($("input#agps-mr").attr("checked") != "checked"){
            $("input#agps-mr").trigger('click');//AGPS-MR
        }
        if($("input#poorArea").attr("checked") != "checked"){
            $("input#poorArea").trigger('click'); //专题图层
        }
        if($("input#poor").attr("checked") != "checked"){
            $("input#poor").trigger('click'); //弱覆盖区
        }
    }else if(isAudit=="2"){//如果是从【智能调优】跳转过来
        var object_type = noceUtil.GetQueryString("object_type");
        var grid_type = noceUtil.GetQueryString("grid_type");
        var poorAreaType = noceUtil.GetQueryString("poorAreaType");
        var index=0;
        var gridType=0;
        //1 勾选区域图层 //0弱区（弱覆盖区）24上行低速率区 25下行低速率区 30MOD3干扰区 31重叠覆盖区 32越区覆盖区
        switch (grid_type){
            case "1" ://1-覆盖质量
                gridType=0;
                break;
            case "2" ://2-过覆盖(越区覆盖)
                gridType=4;
                break;
            case "3" ://3-重叠覆盖
                gridType=5;
                break;
            case "4" ://4-mod3干扰
                gridType=3;
                break;
            case "5" ://5-下行速率
                gridType=2;
                break;
        }
        switch (poorAreaType){
            case "" ://1覆盖质量
                index=0;
                break;
            case "cbPoorArea" ://过覆盖(越区覆盖)
                index=32;
                break;
            case "olPoorArea" ://重叠覆盖
                index=31;
                break;
            case "m3PoorArea" ://mod3干扰
                index=30;
                gridType=3;
                break;
            case "dwPoorArea" ://下行速率
                index=25;
                break;
        }
        if(isNull(object_type)){//如果是多边形,蓝鹰显示对应的区域图层和栅格图层，日期粒度改为天
            $("#poorArea").prop("checked",true);
            $('input[name="type-quyu"][value="'+index+'"]').click();

            //2 勾选栅格图层
            $('input[name="grid-type"][value="'+gridType+'"]').click();
            $('input[name="gridTime"][value="day"]').click();

        }else if(object_type=="扇区"){//如果是扇区, 蓝鹰显示扇区图层和该扇区的问题的栅格图层，日期粒度改为天
            //1 勾选扇区图层
            $('#sector').parents('table').find('input:checkbox').prop("checked",true);
            $('#sector').parents('tr').siblings().find('input:checkbox').siblings('label').css("color","#3285FF");
            //2 勾选对应栅格图层
            $('input[name="grid-type"][value="'+gridType+'"]').click();
            $('input[name="gridTime"][value="day"]').click();
        }
    }else{
        IntelligentRoadTest.submitLayersData();//初始化图层
    }

}


/**********************************
 * @funcname IntelligentRoadTestSystemLayerV3.showHighCollegesMessage
 * @funcdesc 渲染高校详情页
 * @param {object} item (input optional) 具体高校对象轮廓数据
 * @return {null}
 * @author 陈小芳
 * @create 20180410
 ***********************************/
IntelligentRoadTestSystemLayerV3.showHighCollegesMessage=function IntelligentRoadTestSystemLayerV3_showHighCollegesMessage(item) {
    IntelligentRoadTest.cacheItem=item;
    //跳转到高校详情
    IntelligentRoadTest.goCollegeCompleteMessage();
    // IntelligentRoadTest.index=10;
    IntelligentRoadTest.removeEsbhPolyline();//清除附近弱区的多边形（工单监测）
    if(item.alarm_id != null && item.alarm_id != ''){ //判断该对象是否需要展示工单监测指标
        IntelligentRoadTest.isShowAlarmInfoMessage = true;
    }/*else{
        IntelligentRoadTest.isShowAlarmInfoMessage = false;
    }*/
    //增加查询工单指标的方法
    if(IntelligentRoadTest.isShowAlarmInfoMessage == true){
        IntelligentRoadTest.getSenseObjectAlarmInfoData("天翼蓝鹰高校",item.esbh_id , IntelligentRoadTest.day , item.poor_coverage_set);
    }
    IntelligentRoadTest.showPolygon(item.gis_data,undefined,"college",item.esbh_id,IntelligentRoadTest.day,item.esbh_name);
    IntelligentRoadTest.loadGrid(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
    /*IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
        [
            {"key":"区域名称","val":item.esbh_name},
            {"key":"区域编号","val":item.esbh_id},
        ]
    );*/
    if(IntelligentRoadTest.mapClick){
        IntelligentRoadTest.mapClick=false;
    }else{
    	if(item.audit_stat!='待审核'||item.audit_style!='删除'){
//    		var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
//            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
    		IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),16);
    	}
        
    }
    if(!IntelligentRoadTest.isScreenCompared&&IntelligentRoadTest.isAddMessageEvent){//不是在分屏页，并且点击过分屏
        if(!windowScreeen.closed){//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
            // windowScreeen.focus();
            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item,'college');
        }
    }
    // $("#colorBar").click();

    var RecentCellImg = $("#showCollegeCompleteMessage").find('.linkCell').children('img');
    $(RecentCellImg).each(function(){
        var srcText = $(this).attr('src');
        var clickImg=srcText.replace("nor","click");
        var norImg=srcText.replace("click","nor");
        if(srcText==clickImg){
            $(this).attr('src',norImg);
        }
    });
    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
    var echartTitle = "历史30天覆盖变化";
    IntelligentRoadTest.getSense30DayLineData(1 , item.esbh_id , item.city);//加载30天的折线图

    var nearTOP5 = [];
    if(item.top5_sector_set != null && item.top5_sector_set != ""){
        var to5DataArr = item.top5_sector_set.split("@");
        for(var i =  0 ; i < to5DataArr.length; i++){
            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
        }
    }
    var mrNearTOP5 = [];
    if(item.sector_set != null && item.sector_set != ""){
        var mrTo5DataArr = item.sector_set.split("@");
        for(var k =  0 ; k < mrTo5DataArr.length; k++){
            mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
        }
    }
    if(IntelligentRoadTest.checkIfHasSameSector(nearTOP5 , mrNearTOP5)){
        item.isHasSameSector = true;
    }
    var nearPoorAreaList = []; //附近弱覆盖区域集合
    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
    }
    if(item.day !=  null && item.day.toString().indexOf("-") < 0){ //转换日期格式
        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
    }
    var poorAreaList = [] ;//弱覆盖区域集合
    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
    }
//                    IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList,1);
    IntelligentRoadTest.polygonList=[];
    IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList,2);

    $(".linkCell").attr("title","显示连线");
    $(".linkCell").removeClass("linkCellHover");
    IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData(item,1);
    if(item.audit_style=='删除'&&item.audit_stat=='审核通过'){
    	$("#showCollegeCompleteMessage").find('.systemLayerBottonLi').hide();
    	$("#showCollegeCompleteMessage").find('.systemLayerDelete').hide();
    	$("#showCollegeCompleteMessage").find('.systemLayerDeleteEnd').show();
    }else{
    	if(IntelligentRoadTest.user_role.indexOf('审核员')<0){
        	$("#showCollegeCompleteMessage").find('.systemLayerBottonLi').hide();
        	$("#showCollegeCompleteMessage").find('.systemLayerDelete').hide();
        }else{
        	$("#showCollegeCompleteMessage").find('.systemLayerBottonLi').show();
        	$("#showCollegeCompleteMessage").find('.systemLayerDelete').show();
        }
    	$("#showCollegeCompleteMessage").find('.systemLayerDeleteEnd').hide();
    }
    
    if(IntelligentRoadTest.collegeCompleteVM == null){
        IntelligentRoadTest.collegeCompleteVM = new Vue({
            el : '#showCollegeCompleteMessage' ,
            data : {
                collegeData : item ,
                //dataIndex : index ,
                nrTop5Cell : nearTOP5,
                mrTop5Cell : mrNearTOP5,
                title : echartTitle,
                isShowAlarmInfo : IntelligentRoadTest.isShowAlarmInfoMessage,
                alarm_dataObj:{}, //用于存放从告警表中获取到的指标的对象
                alaram_title:"工单监测",
                uname : IntelligentRoadTest.currentUser ,
                nearPoorAreaListData : nearPoorAreaList
            },
            methods : {
                collegePosition : function(item){
                    // IntelligentRoadTest.collegePositiong(item);
                    var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
                },
                viewCollegeLog : function (item) {
                    IntelligentRoadTest.collegeLog(item);
                },
                showDetailInfo :function (event){
                    IntelligentRoadTest.showDetailInfo();
                },
                showLinkCell :function (event,item,type){
                    //type=1最近小区，type=2 接入扇区
                    if($(event.currentTarget).hasClass("linkCellHover")){
                        $(event.currentTarget).attr("title","显示连线");
                        $(event.currentTarget).removeClass("linkCellHover");
                        if(type==1){
                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                        }else if(type==2){
                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                        }
                    }else{
                        $(event.currentTarget).attr("title","隐藏连线");
                        $(event.currentTarget).addClass("linkCellHover");
                        var max_lng = item.longitude_max_baidu;
                        var max_lat = item.latitude_max_baidu;
                        var min_lng = item.longitude_min_baidu;
                        var min_lat = item.latitude_min_baidu;
                        var mid_lng = item.longitude_mid_baidu;
                        var mid_lat = item.latitude_mid_baidu;
                        var centerPoint = new BMap.Point(mid_lng,mid_lat);
                        if(type==1){
                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint,item.top5_sector_set);
                        }else if(type==2){
                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint,item.sector_set);
                        }
                    }
                },
                showLinkPoorArea :function (event,item,type){
                    //扇区连接线
                    if($(event.currentTarget).hasClass("linkCellHover")){
                        $(event.currentTarget).attr("title","显示连线");
                        $(event.currentTarget).removeClass("linkCellHover");
                        // $(event.currentTarget).children().attr("src",norImg);
                        IntelligentRoadTest.hideSectorPoorLine(type);//---
                    }else{
                        $(event.currentTarget).attr("title","隐藏连线");
                        $(event.currentTarget).addClass("linkCellHover");
                        IntelligentRoadTest.showSectorPoorLine(item,type);
                    }
                },
                gotoShowSectorMessage : function (sectorDate){
                    IntelligentRoadTest.clickType=1;
                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid , sectorDate.cellid , IntelligentRoadTest.day);
                },
                gotoKPIList : function (item){
                    if(item.sector_set != null){
                        var sectorArr = item.sector_set.split("@");
                        showOrHideInputImage(2);
                        IntelligentRoadTest.loadKPIListData(sectorArr);
                        $("#kpiBackPoor").html("返回上一级");
                    }
                },
                editSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.editSystemLayer(item,1);
                },
                resetSystemLayer : function (item,event){
                    IntelligentRoadTest_SystemLayerEdit.resetSystemLayer(item,1,event);
                },
                saveSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.saveSystemLayer(item,1);
                },
                commitSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.commitSystemLayer(item,1);
                },
                recoverSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer(item,1);
                },
                deleteSystemLayer: function (item){
                	IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer(item,1);
                },
                redrawSystemLayer: function (item,event){
                	IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer(item,1,event);
                },
                cancelSystemLayer: function (item,event){
                	IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer(item,1,event);
                },
                openScreenCompared:function(item){
                    IntelligentRoadTestScreenCompared.openScreenCompared(item,"college");
                },
                showPolygonGrid:function(item,event){
                    IntelligentRoadTest.showHidePolygonGrid(item,event);
                }

            }
        });
    }else{
        IntelligentRoadTest.collegeCompleteVM.collegeData = item;
        //IntelligentRoadTest.collegeCompleteVM.dataIndex = index;
        IntelligentRoadTest.collegeCompleteVM.nrTop5Cell = nearTOP5;
        IntelligentRoadTest.collegeCompleteVM.mrTop5Cell = mrNearTOP5;
        IntelligentRoadTest.collegeCompleteVM.nearPoorAreaListData = nearPoorAreaList;
        IntelligentRoadTest.collegeCompleteVM.isShowAlarmInfo = IntelligentRoadTest.isShowAlarmInfoMessage;
        // IntelligentRoadTest.collegeCompleteVM.title = echartTitle;
    }

}

/**********************************
 * @funcname IntelligentRoadTest.showSiteMessage
 * @funcdesc 渲染场馆详情页
 * @param {object} item (input optional) 具体场馆对象轮廓数据
 * @return {null}
 * @author 陈小芳
 * @create 20180410
 ***********************************/
IntelligentRoadTestSystemLayerV3.showSiteMessage=function IntelligentRoadTestSystemLayerV3_showSiteMessage(item){
    // IntelligentRoadTest.mkIndex=index;
    IntelligentRoadTest.cacheItem=item;
    //跳转到场馆详情
    IntelligentRoadTest.goSiteCompleteMessage();
    // IntelligentRoadTest.index=19;
    IntelligentRoadTest.showPolygon(item.gis_data,undefined,"site",item.esbh_id,IntelligentRoadTest.day,item.esbh_name);
    IntelligentRoadTest.loadGrid(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
   /* IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
        [
            {"key":"区域名称","val":item.esbh_name},
            {"key":"区域编号","val":item.esbh_id},
        ]
    );*/

    // $('#concernHandleDescribe').val(item.handle_description);
    if(IntelligentRoadTest.mapClick){
        IntelligentRoadTest.mapClick=false;
    }else{
    	if(item.audit_stat!='待审核'||item.audit_style!='删除'){
//    		var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
//            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
    		IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),16);
    	}
    }
    if(!IntelligentRoadTest.isScreenCompared&&IntelligentRoadTest.isAddMessageEvent){//不是在分屏页，并且点击过分屏
        if(!windowScreeen.closed){//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
            // windowScreeen.focus();
            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item,'site');
        }
    }
    // $("#colorBar").click();

    var RecentCellImg = $("#showSiteCompleteMessage").find('.linkCell').children('img');
    $(RecentCellImg).each(function(){
        var srcText = $(this).attr('src');
        var clickImg=srcText.replace("nor","click");
        var norImg=srcText.replace("click","nor");
        if(srcText==clickImg){
            $(this).attr('src',norImg);
        }
    });
    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
    var echartTitle = "历史30天覆盖变化";
    IntelligentRoadTest.getSense30DayLineData(10 , item.esbh_id , item.city);//加载30天的折线图

    var nearTOP5 = [];
    if(item.top5_sector_set != null && item.top5_sector_set != ""){
        var to5DataArr = item.top5_sector_set.split("@");
        for(var i =  0 ; i < to5DataArr.length; i++){
            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
        }
    }
    var mrNearTOP5 = [];
    if(item.sector_set != null && item.sector_set != ""){
        var mrTo5DataArr = item.sector_set.split("@");
        for(var k =  0 ; k < mrTo5DataArr.length; k++){
            mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
        }
    }
    if(IntelligentRoadTest.checkIfHasSameSector(nearTOP5 , mrNearTOP5)){
        item.isHasSameSector = true;
    }
    var nearPoorAreaList = []; //附近弱覆盖区域集合
    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
    }
    if(item.day !=  null && item.day.toString().indexOf("-") < 0){ //转换日期格式
        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
    }
    var poorAreaList = [] ;//弱覆盖区域集合
    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
    }
//                    IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList,1);
    IntelligentRoadTest.polygonList=[];
    IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList,2);




    $(".linkCell").attr("title","显示连线");
    $(".linkCell").removeClass("linkCellHover");
    IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData(item,10);
    if(item.audit_style=='删除'&&item.audit_stat=='审核通过'){
    	$("#showSiteCompleteMessage").find('.systemLayerBottonLi').hide();
    	$("#showSiteCompleteMessage").find('.systemLayerDelete').hide();
    	$("#showSiteCompleteMessage").find('.systemLayerDeleteEnd').show();
    }else{
    	if(IntelligentRoadTest.user_role.indexOf('审核员')<0){
        	$("#showSiteCompleteMessage").find('.systemLayerBottonLi').hide();
        	$("#showSiteCompleteMessage").find('.systemLayerDelete').hide();
        }else{
        	$("#showSiteCompleteMessage").find('.systemLayerBottonLi').show();
        	$("#showSiteCompleteMessage").find('.systemLayerDelete').show();
        }
    	$("#showSiteCompleteMessage").find('.systemLayerDeleteEnd').hide();
    }
    
    if(IntelligentRoadTest.siteCompleteVM == null){
        IntelligentRoadTest.siteCompleteVM = new Vue({
            el : '#showSiteCompleteMessage' ,
            data : {
                siteData : item ,
                // dataIndex : index ,
                nrTop5Cell : nearTOP5,
                mrTop5Cell : mrNearTOP5,
                title : echartTitle,
                isShowAlarmInfo : IntelligentRoadTest.isShowAlarmInfoMessage,
                alarm_dataObj:{}, //用于存放从告警表中获取到的指标的对象
                alaram_title:"工单监测",
                uname : IntelligentRoadTest.currentUser ,
                nearPoorAreaListData : nearPoorAreaList
            },
            methods : {
                sitePosition : function(item){
                    var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
                    // IntelligentRoadTest.sitePositiong(item);
                },
                viewSiteLog : function (item) {
                    IntelligentRoadTest.siteLog(item);
                },
                showDetailInfo :function (event){
                    IntelligentRoadTest.showDetailInfo();
                },
                showLinkCell :function (event,item,type){
                    //type=1最近小区，type=2 接入扇区
                    if($(event.currentTarget).hasClass("linkCellHover")){
                        $(event.currentTarget).attr("title","显示连线");
                        $(event.currentTarget).removeClass("linkCellHover");
                        if(type==1){
                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                        }else if(type==2){
                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                        }
                    }else{
                        $(event.currentTarget).attr("title","隐藏连线");
                        $(event.currentTarget).addClass("linkCellHover");
                        var max_lng = item.longitude_max_baidu;
                        var max_lat = item.latitude_max_baidu;
                        var min_lng = item.longitude_min_baidu;
                        var min_lat = item.latitude_min_baidu;
                        var mid_lng = item.longitude_mid_baidu;
                        var mid_lat = item.latitude_mid_baidu;
                        var centerPoint = new BMap.Point(mid_lng,mid_lat);
                        if(type==1){
                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint,item.top5_sector_set);
                        }else if(type==2){
                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint,item.sector_set);
                        }
                    }
                },
                showLinkPoorArea :function (event,item,type){
                    //扇区连接线
                    if($(event.currentTarget).hasClass("linkCellHover")){
                        $(event.currentTarget).attr("title","显示连线");
                        $(event.currentTarget).removeClass("linkCellHover");
                        // $(event.currentTarget).children().attr("src",norImg);
                        IntelligentRoadTest.hideSectorPoorLine(type);//---
                    }else{
                        $(event.currentTarget).attr("title","隐藏连线");
                        $(event.currentTarget).addClass("linkCellHover");
                        IntelligentRoadTest.showSectorPoorLine(item,type);
                    }
                },
                gotoShowSectorMessage : function (sectorDate){
                    IntelligentRoadTest.clickType=1;
                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid , sectorDate.cellid , IntelligentRoadTest.day);
                },
                gotoKPIList : function (item){
                    if(item.sector_set != null){
                        var sectorArr = item.sector_set.split("@");
                        showOrHideInputImage(2);
                        IntelligentRoadTest.loadKPIListData(sectorArr);
                        $("#kpiBackPoor").html("返回上一级");
                    }
                },
                editSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.editSystemLayer(item,10);
                },
                resetSystemLayer : function (item,event){
                    IntelligentRoadTest_SystemLayerEdit.resetSystemLayer(item,10,event);
                },
                saveSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.saveSystemLayer(item,10);
                },
                commitSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.commitSystemLayer(item,10);
                },
                recoverSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer(item,10);
                },
                deleteSystemLayer: function (item){
                	IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer(item,10);
                },
                redrawSystemLayer: function (item,event){
                	IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer(item,10,event);
                },
                cancelSystemLayer: function (item,event){
                	IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer(item,10,event);
                },
                showPolygonGrid:function(item,event){
                    IntelligentRoadTest.showHidePolygonGrid(item,event);
                }
            }
        });
    }else{
        IntelligentRoadTest.siteCompleteVM.siteData = item;
        // IntelligentRoadTest.siteCompleteVM.dataIndex = index;
        IntelligentRoadTest.siteCompleteVM.nrTop5Cell = nearTOP5;
        IntelligentRoadTest.siteCompleteVM.mrTop5Cell = mrNearTOP5;
        IntelligentRoadTest.siteCompleteVM.nearPoorAreaListData = nearPoorAreaList;
        IntelligentRoadTest.siteCompleteVM.isShowAlarmInfo = IntelligentRoadTest.isShowAlarmInfoMessage;
        // IntelligentRoadTest.siteCompleteVM.title = echartTitle;
    }

}

/**********************************
 * @funcname IntelligentRoadTestSystemLayerV3.showFoodMessage
 * @funcdesc 渲染美食详情页
 * @param {object} item (input optional) 具体美食对象轮廓数据
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.showFoodMessage =function IntelligentRoadTestSystemLayerV3_showFoodMessage(item){
    // IntelligentRoadTest.mkIndex=index;
    IntelligentRoadTest.cacheItem=item;
    //跳转到美食详情
    IntelligentRoadTest.goFoodCompleteMessage();
    // IntelligentRoadTest.index=18;
    IntelligentRoadTest.removeEsbhPolyline();//清除附近弱区的多边形（工单监测）
    if(item.alarm_id != null && item.alarm_id != ''){ //判断该对象是否需要展示工单监测指标
        IntelligentRoadTest.isShowAlarmInfoMessage = true;
    }/*else{
        IntelligentRoadTest.isShowAlarmInfoMessage = false;
    }*/
    //增加查询工单指标的方法
    if(IntelligentRoadTest.isShowAlarmInfoMessage == true){
        IntelligentRoadTest.getSenseObjectAlarmInfoData("天翼蓝鹰美食",item.esbh_id , IntelligentRoadTest.day , item.poor_coverage_set);
    }
    IntelligentRoadTest.showPolygon(item.gis_data,undefined,"food",item.esbh_id,IntelligentRoadTest.day,item.esbh_name);
    IntelligentRoadTest.loadGrid(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
    /*IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
        [
            {"key":"区域名称","val":item.esbh_name},
            {"key":"区域编号","val":item.esbh_id},
        ]
    );
*/
    // $('#concernHandleDescribe').val(item.handle_description);
    if(IntelligentRoadTest.mapClick){
        IntelligentRoadTest.mapClick=false;
    }else{
    	if(item.audit_stat!='待审核'||item.audit_style!='删除'){
//    		var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
//            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
    		IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),16);
    	}
    }

    if(!IntelligentRoadTest.isScreenCompared&&IntelligentRoadTest.isAddMessageEvent){//不是在分屏页，并且点击过分屏
        if(!windowScreeen.closed){//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
            // windowScreeen.focus();
            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item,'food');
        }
    }
    // $("#colorBar").click();

    var RecentCellImg = $("#showFoodCompleteMessage").find('.linkCell').children('img');
    $(RecentCellImg).each(function(){
        var srcText = $(this).attr('src');
        var clickImg=srcText.replace("nor","click");
        var norImg=srcText.replace("click","nor");
        if(srcText==clickImg){
            $(this).attr('src',norImg);
        }
    });
    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
    var echartTitle = "历史30天覆盖变化";
    IntelligentRoadTest.getSense30DayLineData(9 , item.esbh_id , item.city);//加载30天的折线图

    var nearTOP5 = [];
    if(item.top5_sector_set != null && item.top5_sector_set != ""){
        var to5DataArr = item.top5_sector_set.split("@");
        for(var i =  0 ; i < to5DataArr.length; i++){
            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
        }
    }
    var mrNearTOP5 = [];
    if(item.sector_set != null && item.sector_set != ""){
        var mrTo5DataArr = item.sector_set.split("@");
        for(var k =  0 ; k < mrTo5DataArr.length; k++){
            mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
        }
    }
    if(IntelligentRoadTest.checkIfHasSameSector(nearTOP5 , mrNearTOP5)){
        item.isHasSameSector = true;
    }
    var nearPoorAreaList = []; //附近弱覆盖区域集合
    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
    }
    if(item.day !=  null && item.day.toString().indexOf("-") < 0){ //转换日期格式
        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
    }
    var poorAreaList = [] ;//弱覆盖区域集合
    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
    }
//                    IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList,1);
    IntelligentRoadTest.polygonList=[];
    IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList,2);




    $(".linkCell").attr("title","显示连线");
    $(".linkCell").removeClass("linkCellHover");
    IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData(item,9);
    if(item.audit_style=='删除'&&item.audit_stat=='审核通过'){
    	$("#showFoodCompleteMessage").find('.systemLayerBottonLi').hide();
    	$("#showFoodCompleteMessage").find('.systemLayerDelete').hide();
    	$("#showFoodCompleteMessage").find('.systemLayerDeleteEnd').show();
    }else{
    	if(IntelligentRoadTest.user_role.indexOf('审核员')<0){
        	$("#showFoodCompleteMessage").find('.systemLayerBottonLi').hide();
        	$("#showFoodCompleteMessage").find('.systemLayerDelete').hide();
        }else{
        	$("#showFoodCompleteMessage").find('.systemLayerBottonLi').show();
        	$("#showFoodCompleteMessage").find('.systemLayerDelete').show();
        }
    	$("#showFoodCompleteMessage").find('.systemLayerDeleteEnd').hide();
    }
    if(IntelligentRoadTest.foodCompleteVM == null){
        IntelligentRoadTest.foodCompleteVM = new Vue({
            el : '#showFoodCompleteMessage' ,
            data : {
                foodData : item ,
                // dataIndex : index ,
                nrTop5Cell : nearTOP5,
                mrTop5Cell : mrNearTOP5,
                title : echartTitle,
                isShowAlarmInfo : IntelligentRoadTest.isShowAlarmInfoMessage,
                alarm_dataObj:{}, //用于存放从告警表中获取到的指标的对象
                alaram_title:"工单监测",
                uname : IntelligentRoadTest.currentUser ,
                nearPoorAreaListData : nearPoorAreaList
            },
            methods : {
                foodPosition : function(item){
                    // IntelligentRoadTest.foodPositiong(item);
                    var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
                },
                viewFoodLog : function (item) {
                    IntelligentRoadTest.foodLog(item);
                },
                showDetailInfo :function (event){
                    IntelligentRoadTest.showDetailInfo();
                },
                showLinkCell :function (event,item,type){
                    //type=1最近小区，type=2 接入扇区
                    if($(event.currentTarget).hasClass("linkCellHover")){
                        $(event.currentTarget).attr("title","显示连线");
                        $(event.currentTarget).removeClass("linkCellHover");
                        if(type==1){
                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                        }else if(type==2){
                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                        }
                    }else{
                        $(event.currentTarget).attr("title","隐藏连线");
                        $(event.currentTarget).addClass("linkCellHover");
                        var max_lng = item.longitude_max_baidu;
                        var max_lat = item.latitude_max_baidu;
                        var min_lng = item.longitude_min_baidu;
                        var min_lat = item.latitude_min_baidu;
                        var mid_lng = item.longitude_mid_baidu;
                        var mid_lat = item.latitude_mid_baidu;
                        var centerPoint = new BMap.Point(mid_lng,mid_lat);
                        if(type==1){
                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint,item.top5_sector_set);
                        }else if(type==2){
                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint,item.sector_set);
                        }
                    }
                },
                showLinkPoorArea :function (event,item,type){
                    //扇区连接线
                    if($(event.currentTarget).hasClass("linkCellHover")){
                        $(event.currentTarget).attr("title","显示连线");
                        $(event.currentTarget).removeClass("linkCellHover");
                        // $(event.currentTarget).children().attr("src",norImg);
                        IntelligentRoadTest.hideSectorPoorLine(type);//---
                    }else{
                        $(event.currentTarget).attr("title","隐藏连线");
                        $(event.currentTarget).addClass("linkCellHover");
                        IntelligentRoadTest.showSectorPoorLine(item,type);
                    }
                },
                gotoShowSectorMessage : function (sectorDate){
                    IntelligentRoadTest.clickType=1;
                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid , sectorDate.cellid , IntelligentRoadTest.day);
                },
                gotoKPIList : function (item){
                    if(item.sector_set != null){
                        var sectorArr = item.sector_set.split("@");
                        showOrHideInputImage(2);
                        IntelligentRoadTest.loadKPIListData(sectorArr);
                        $("#kpiBackPoor").html("返回上一级");
                    }
                },
                editSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.editSystemLayer(item,9);
                },
                resetSystemLayer : function (item,event){
                    IntelligentRoadTest_SystemLayerEdit.resetSystemLayer(item,9,event);
                },
                saveSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.saveSystemLayer(item,9);
                },
                commitSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.commitSystemLayer(item,9);
                },
                recoverSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer(item,9);
                },
                deleteSystemLayer: function (item){
                	IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer(item,9);
                },
                redrawSystemLayer: function (item,event){
                	IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer(item,9,event);
                },
                cancelSystemLayer: function (item,event){
                	IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer(item,9,event);
                },
                showPolygonGrid:function(item,event){
                    IntelligentRoadTest.showHidePolygonGrid(item,event);
                }
            }
        });
    }else{
        IntelligentRoadTest.foodCompleteVM.foodData = item;
        // IntelligentRoadTest.foodCompleteVM.dataIndex = index;
        IntelligentRoadTest.foodCompleteVM.nrTop5Cell = nearTOP5;
        IntelligentRoadTest.foodCompleteVM.mrTop5Cell = mrNearTOP5;
        IntelligentRoadTest.foodCompleteVM.nearPoorAreaListData = nearPoorAreaList;
        IntelligentRoadTest.foodCompleteVM.isShowAlarmInfo = IntelligentRoadTest.isShowAlarmInfoMessage;
        // IntelligentRoadTest.foodCompleteVM.title = echartTitle;
    }

}


/**********************************
 * @funcname IntelligentRoadTestSystemLayerV3.showSceneryMessage
 * @funcdesc 渲染美景详情页
 * @param {object} item (input optional) 具体美景对象轮廓数据
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.showSceneryMessage =function IntelligentRoadTestSystemLayerV3_showSceneryMessage(item){
    // IntelligentRoadTest.mkIndex=index;
    IntelligentRoadTest.cacheItem=item;
    //跳转到美食详情
    IntelligentRoadTest.goSceneryCompleteMessage();
    // IntelligentRoadTest.index=12;
    IntelligentRoadTest.removeEsbhPolyline();//清除附近弱区的多边形（工单监测）
    if(item.alarm_id != null && item.alarm_id != ''){ //判断该对象是否需要展示工单监测指标
        IntelligentRoadTest.isShowAlarmInfoMessage = true;
    }/*else{
        IntelligentRoadTest.isShowAlarmInfoMessage = false;
    }*/
    //增加查询工单指标的方法
    if(IntelligentRoadTest.isShowAlarmInfoMessage == true){
        IntelligentRoadTest.getSenseObjectAlarmInfoData("天翼蓝鹰美景",item.esbh_id , IntelligentRoadTest.day , item.poor_coverage_set);
    }
    IntelligentRoadTest.showPolygon(item.gis_data,undefined,"scenery",item.esbh_id,IntelligentRoadTest.day,item.esbh_name);
    IntelligentRoadTest.loadGrid(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
    /*IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
        [
            {"key":"区域名称","val":item.esbh_name},
            {"key":"区域编号","val":item.esbh_id},
        ]
    );*/


    // $('#concernHandleDescribe').val(item.handle_description);
    if(IntelligentRoadTest.mapClick){
        IntelligentRoadTest.mapClick=false;
    }else{
    	if(item.audit_stat!='待审核'||item.audit_style!='删除'){
//    		var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
//            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
    		IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),16);
    	}
    }

    if(!IntelligentRoadTest.isScreenCompared&&IntelligentRoadTest.isAddMessageEvent){//不是在分屏页，并且点击过分屏
        if(!windowScreeen.closed){//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
            // windowScreeen.focus();
            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item,'scenery');
        }
    }
    // $("#colorBar").click();

    var RecentCellImg = $("#showSceneryCompleteMessage").find('.linkCell').children('img');
    $(RecentCellImg).each(function(){
        var srcText = $(this).attr('src');
        var clickImg=srcText.replace("nor","click");
        var norImg=srcText.replace("click","nor");
        if(srcText==clickImg){
            $(this).attr('src',norImg);
        }
    });
    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();

    var echartTitle = "历史30天覆盖变化";
    IntelligentRoadTest.getSense30DayLineData(7 , item.esbh_id , item.city);//加载30天的折线图

    var nearTOP5 = [];
    if(item.top5_sector_set != null && item.top5_sector_set != ""){
        var to5DataArr = item.top5_sector_set.split("@");
        for(var i =  0 ; i < to5DataArr.length; i++){
            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
        }
    }
    var mrNearTOP5 = [];
    if(item.sector_set != null && item.sector_set != ""){
        var mrTo5DataArr = item.sector_set.split("@");
        for(var k =  0 ; k < mrTo5DataArr.length; k++){
            mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
        }
    }
    if(IntelligentRoadTest.checkIfHasSameSector(nearTOP5 , mrNearTOP5)){
        item.isHasSameSector = true;
    }
    var nearPoorAreaList = []; //附近弱覆盖区域集合
    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
    }
    var poorAreaList = [] ;//弱覆盖区域集合
    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
    }
    IntelligentRoadTest.polygonList=[];
    IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList,1);
    IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList,2);
    if(item.day !=  null && item.day.toString().indexOf("-") < 0){ //转换日期格式
        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
    }
    $(".linkCell").attr("title","显示连线");
    $(".linkCell").removeClass("linkCellHover");
    IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData(item,7);
    if(item.audit_style=='删除'&&item.audit_stat=='审核通过'){
    	$("#showSceneryCompleteMessage").find('.systemLayerBottonLi').hide();
    	$("#showSceneryCompleteMessage").find('.systemLayerDelete').hide();
    	$("#showSceneryCompleteMessage").find('.systemLayerDeleteEnd').show();
    }else{
    	if(IntelligentRoadTest.user_role.indexOf('审核员')<0){
        	$("#showSceneryCompleteMessage").find('.systemLayerBottonLi').hide();
        	$("#showSceneryCompleteMessage").find('.systemLayerDelete').hide();
        }else{
        	$("#showSceneryCompleteMessage").find('.systemLayerBottonLi').show();
        	$("#showSceneryCompleteMessage").find('.systemLayerDelete').show();
        }
    	$("#showSceneryCompleteMessage").find('.systemLayerDeleteEnd').hide();
    }
    
    if(IntelligentRoadTest.sceneryCompleteVM == null){
        IntelligentRoadTest.sceneryCompleteVM = new Vue({
            el : '#showSceneryCompleteMessage' ,
            data : {
                sceneryData : item ,
                // dataIndex : index ,
                nrTop5Cell : nearTOP5,
                mrTop5Cell : mrNearTOP5,
                title : echartTitle,
                isShowAlarmInfo : IntelligentRoadTest.isShowAlarmInfoMessage,
                alarm_dataObj:{}, //用于存放从告警表中获取到的指标的对象
                alaram_title:"工单监测",
                uname : IntelligentRoadTest.currentUser,
                nearPoorAreaListData : nearPoorAreaList
            },
            methods : {
                sceneryPosition : function(item){
                    // IntelligentRoadTest.sceneryPositiong(item);
                    var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
                },
                /*editSceneryMessage : function (item) {
                    IntelligentRoadTest.sceneryEdit(item);
                },
                deleteScenery : function(item , ind){
                    IntelligentRoadTest.sceneryDelete(item);
                },*/
                viewSceneryLog : function (item) {
                    IntelligentRoadTest.sceneryLog(item);
                },
                // gotoScenerySevenEchart : function (item) {
                //     IntelligentRoadTest.scenerySevenLine(item);
                // },
                showDetailInfo :function (event){
                    IntelligentRoadTest.showDetailInfo();
                },
                showLinkCell :function (event,item,type){
                    //type=1最近小区，type=2 接入扇区
                    if($(event.currentTarget).hasClass("linkCellHover")){
                        $(event.currentTarget).attr("title","显示连线");
                        $(event.currentTarget).removeClass("linkCellHover");
                        if(type==1){
                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                        }else if(type==2){
                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                        }
                    }else{
                        $(event.currentTarget).attr("title","隐藏连线");
                        $(event.currentTarget).addClass("linkCellHover");
                        var max_lng = item.longitude_max_baidu;
                        var max_lat = item.latitude_max_baidu;
                        var min_lng = item.longitude_min_baidu;
                        var min_lat = item.latitude_min_baidu;
                        var mid_lng = item.longitude_mid_baidu;
                        var mid_lat = item.latitude_mid_baidu;
                        var centerPoint = new BMap.Point(mid_lng,mid_lat);
                        if(type==1){
                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint,item.top5_sector_set);
                        }else if(type==2){
                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint,item.sector_set);
                        }
                    }
                },
                showLinkPoorArea :function (event,item,type){
                    //扇区连接线
                    if($(event.currentTarget).hasClass("linkCellHover")){
                        $(event.currentTarget).attr("title","显示连线");
                        $(event.currentTarget).removeClass("linkCellHover");
                        // $(event.currentTarget).children().attr("src",norImg);
                        IntelligentRoadTest.hideSectorPoorLine(type);//---
                    }else{
                        $(event.currentTarget).attr("title","隐藏连线");
                        $(event.currentTarget).addClass("linkCellHover");
                        IntelligentRoadTest.showSectorPoorLine(item,type);
                    }
                },
                gotoShowSectorMessage : function (sectorDate){
                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid , sectorDate.cellid , IntelligentRoadTest.day);
                },
                gotoKPIList : function (item){
                    if(item.sector_set != null){
                        var sectorArr = item.sector_set.split("@");
                        showOrHideInputImage(2);
                        IntelligentRoadTest.loadKPIListData(sectorArr);
                        $("#kpiBackPoor").html("返回上一级");
                    }
                },
                editSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.editSystemLayer(item,7);
                },
                resetSystemLayer : function (item,event){
                    IntelligentRoadTest_SystemLayerEdit.resetSystemLayer(item,7,event);
                },
                saveSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.saveSystemLayer(item,7);
                },
                commitSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.commitSystemLayer(item,7);
                },
                recoverSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer(item,7);
                },
                deleteSystemLayer: function (item){
                	IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer(item,7);
                },
                redrawSystemLayer: function (item,event){
                	IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer(item,7,event);
                },
                cancelSystemLayer: function (item,event){
                	IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer(item,7,event);
                },
                showPolygonGrid:function(item,event){
                    IntelligentRoadTest.showHidePolygonGrid(item,event);
                }
            }
        });
    }else{
        IntelligentRoadTest.sceneryCompleteVM.sceneryData = item;
        // IntelligentRoadTest.sceneryCompleteVM.dataIndex = index;
        IntelligentRoadTest.sceneryCompleteVM.nrTop5Cell = nearTOP5;
        IntelligentRoadTest.sceneryCompleteVM.mrTop5Cell = mrNearTOP5;
        IntelligentRoadTest.sceneryCompleteVM.nearPoorAreaListData = nearPoorAreaList;
        IntelligentRoadTest.sceneryCompleteVM.isShowAlarmInfo = IntelligentRoadTest.isShowAlarmInfoMessage;
        // IntelligentRoadTest.sceneryCompleteVM.title = echartTitle;
    }

}


/**********************************
 * @funcname IntelligentRoadTestSystemLayerV3.showWarwolfMessage
 * @funcdesc 渲染战狼区域详情页
 * @param {object} item (input optional) 具体战狼区域对象轮廓数据
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.showWarwolfMessage =function IntelligentRoadTestSystemLayerV3_showWarwolfMessage(item){
    // IntelligentRoadTest.mkIndex=index;
    IntelligentRoadTest.cacheItem=item;
    //跳转到战狼区域详情
    IntelligentRoadTest.goWarwolfCompleteMessage();
    // IntelligentRoadTest.index=16;
    IntelligentRoadTest.removeEsbhPolyline();//清除附近弱区的多边形（工单监测）
    if(item.alarm_id != null && item.alarm_id != ''){ //判断该对象是否需要展示工单监测指标
        IntelligentRoadTest.isShowAlarmInfoMessage = true;
    }/*else{
        IntelligentRoadTest.isShowAlarmInfoMessage = false;
    }*/
    //增加查询工单指标的方法
    if(IntelligentRoadTest.isShowAlarmInfoMessage == true){
        IntelligentRoadTest.getSenseObjectAlarmInfoData("天翼蓝鹰战狼区域",item.esbh_id , IntelligentRoadTest.day , item.poor_coverage_set);
    }
    IntelligentRoadTest.showPolygon(item.gis_data,undefined,"warwolf",item.esbh_id,IntelligentRoadTest.day,item.esbh_name);
    IntelligentRoadTest.loadGrid(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
  /*  IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
        [
            {"key":"区域名称","val":item.esbh_name},
            {"key":"区域编号","val":item.esbh_id},
        ]
    );*/

    // $('#concernHandleDescribe').val(item.handle_description);
    if(IntelligentRoadTest.mapClick){
        IntelligentRoadTest.mapClick=false;
    }else{
        IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),16);
    }

    if(!IntelligentRoadTest.isScreenCompared&&IntelligentRoadTest.isAddMessageEvent){//不是在分屏页，并且点击过分屏
        if(!windowScreeen.closed){//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
            // windowScreeen.focus();
            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item,'warWolf');
        }
    }
    // $("#colorBar").click();

    var RecentCellImg = $("#showWarwolfCompleteMessage").find('.linkCell').children('img');
    $(RecentCellImg).each(function(){
        var srcText = $(this).attr('src');
        var clickImg=srcText.replace("nor","click");
        var norImg=srcText.replace("click","nor");
        if(srcText==clickImg){
            $(this).attr('src',norImg);
        }
    });
    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();

    var echartTitle = "历史30天覆盖变化";
    IntelligentRoadTest.getSense30DayLineData(3 , item.esbh_id , item.city);//加载30天的折线图

    var nearTOP5 = [];
    if(item.top5_sector_set != null && item.top5_sector_set != ""){
        var to5DataArr = item.top5_sector_set.split("@");
        for(var i =  0 ; i < to5DataArr.length; i++){
            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
        }
    }
    var mrNearTOP5 = [];
    if(item.sector_set != null && item.sector_set != ""){
        var mrTo5DataArr = item.sector_set.split("@");
        for(var k =  0 ; k < mrTo5DataArr.length; k++){
            mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
        }
    }
    if(IntelligentRoadTest.checkIfHasSameSector(nearTOP5 , mrNearTOP5)){
        item.isHasSameSector = true;
    }
    var nearPoorAreaList = []; //附近弱覆盖区域集合
    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
    }
    var poorAreaList = [] ;//弱覆盖区域集合
    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
    }
    IntelligentRoadTest.polygonList=[];
    IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList,1);
    IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList,2);
    if(item.day !=  null && item.day.toString().indexOf("-") < 0){ //转换日期格式
        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
    }
    $(".linkCell").attr("title","显示连线");
    $(".linkCell").removeClass("linkCellHover");
//    IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData(item);
//    if(item.audit_style=='删除'&&item.audit_stat=='审核通过'){
//    	$("#showSceneryCompleteMessage").find('.systemLayerBottonLi').hide();
//    	$("#showSceneryCompleteMessage").find('.systemLayerDelete').hide();
//    	$("#showSceneryCompleteMessage").find('.systemLayerDeleteEnd').show();
//    }else{
//    	if(IntelligentRoadTest.user_role.indexOf('审核员')<0){
//        	$("#showSceneryCompleteMessage").find('.systemLayerBottonLi').hide();
//        	$("#showSceneryCompleteMessage").find('.systemLayerDelete').hide();
//        }else{
//        	$("#showSceneryCompleteMessage").find('.systemLayerBottonLi').show();
//        	$("#showSceneryCompleteMessage").find('.systemLayerDelete').show();
//        }
//    	$("#showSceneryCompleteMessage").find('.systemLayerDeleteEnd').hide();
//    }
    if(IntelligentRoadTest.warwolfCompleteVM == null){
        IntelligentRoadTest.warwolfCompleteVM = new Vue({
            el : '#showWarwolfCompleteMessage' ,
            data : {
                warwolfData : item ,
                // dataIndex : index ,
                nrTop5Cell : nearTOP5,
                mrTop5Cell : mrNearTOP5,
                title : echartTitle,
                isShowAlarmInfo : IntelligentRoadTest.isShowAlarmInfoMessage,
                alarm_dataObj:{}, //用于存放从告警表中获取到的指标的对象
                alaram_title:"工单监测",
                uname : IntelligentRoadTest.currentUser,
                nearPoorAreaListData :  nearPoorAreaList
            },
            methods : {
                warwolfPosition : function(item){
                    // IntelligentRoadTest.warwolfPositiong(item);
                    var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
                },
                viewWarwolfLog : function (item) {
                    IntelligentRoadTest.warwolfLog(item);
                },
                showDetailInfo :function (event){
                    IntelligentRoadTest.showDetailInfo();
                },
                showLinkCell :function (event,item,type){
                    //type=1最近小区，type=2 接入扇区
                    if($(event.currentTarget).hasClass("linkCellHover")){
                        $(event.currentTarget).attr("title","显示连线");
                        $(event.currentTarget).removeClass("linkCellHover");
                        if(type==1){
                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                        }else if(type==2){
                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                        }
                    }else{
                        $(event.currentTarget).attr("title","隐藏连线");
                        $(event.currentTarget).addClass("linkCellHover");
                        var max_lng = item.longitude_max_baidu;
                        var max_lat = item.latitude_max_baidu;
                        var min_lng = item.longitude_min_baidu;
                        var min_lat = item.latitude_min_baidu;
                        var mid_lng = item.longitude_mid_baidu;
                        var mid_lat = item.latitude_mid_baidu;
                        var centerPoint = new BMap.Point(mid_lng,mid_lat);
                        if(type==1){
                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint,item.top5_sector_set);
                        }else if(type==2){
                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint,item.sector_set);
                        }
                    }
                },
                showLinkPoorArea :function (event,item,type){
                    //扇区连接线
                    if($(event.currentTarget).hasClass("linkCellHover")){
                        $(event.currentTarget).attr("title","显示连线");
                        $(event.currentTarget).removeClass("linkCellHover");
                        // $(event.currentTarget).children().attr("src",norImg);
                        IntelligentRoadTest.hideSectorPoorLine(type);//---
                    }else{
                        $(event.currentTarget).attr("title","隐藏连线");
                        $(event.currentTarget).addClass("linkCellHover");
                        IntelligentRoadTest.showSectorPoorLine(item,type);
                    }
                },
                gotoShowSectorMessage : function (sectorDate){
                    IntelligentRoadTest.clickType=1;
                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid , sectorDate.cellid , IntelligentRoadTest.day);
                },
                gotoKPIList : function (item){
                    if(item.sector_set != null){
                        var sectorArr = item.sector_set.split("@");
                        showOrHideInputImage(2);
                        IntelligentRoadTest.loadKPIListData(sectorArr);
                        $("#kpiBackPoor").html("返回上一级");
                    }
                },
                editSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.editSystemLayer(item);
                },
                resetSystemLayer : function (item,event){
                    IntelligentRoadTest_SystemLayerEdit.resetSystemLayer(item,undefined,event);
                },
                saveSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.saveSystemLayer(item);
                },
                commitSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.commitSystemLayer(item);
                },
                recoverSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer(item);
                },
                deleteSystemLayer: function (item){
                	IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer(item);
                },
                redrawSystemLayer: function (item,event){
                	IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer(item,undefined,event);
                },
                cancelSystemLayer: function (item,event){
                	IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer(item,undefined,event);
                },
                showPolygonGrid:function(item,event){
                    IntelligentRoadTest.showHidePolygonGrid(item,event);
                }
            }
        });
    }else{
        IntelligentRoadTest.warwolfCompleteVM.warwolfData = item;
        // IntelligentRoadTest.warwolfCompleteVM.dataIndex = index;
        IntelligentRoadTest.warwolfCompleteVM.nrTop5Cell = nearTOP5;
        IntelligentRoadTest.warwolfCompleteVM.mrTop5Cell = mrNearTOP5;
        IntelligentRoadTest.warwolfCompleteVM.nearPoorAreaListData = nearPoorAreaList;
        IntelligentRoadTest.warwolfCompleteVM.title = echartTitle;
        IntelligentRoadTest.warwolfCompleteVM.isShowAlarmInfo = IntelligentRoadTest.isShowAlarmInfoMessage;
    }

}


/**********************************
 * @funcname IntelligentRoadTestSystemLayerV3.showMarketMessage
 * @funcdesc 渲染农贸市场详情页
 * @param {object} item (input optional) 具体农贸市场对象轮廓数据
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.showMarketMessage =function IntelligentRoadTestSystemLayerV3_showMarketMessage(item){
    // IntelligentRoadTest.mkIndex=index;
    IntelligentRoadTest.cacheItem=item;
    //跳转到农贸市场详情
    IntelligentRoadTest.goMarketCompleteMessage();
    // IntelligentRoadTest.index=17;
    IntelligentRoadTest.removeEsbhPolyline();//清除附近弱区的多边形（工单监测）
    if(item.alarm_id != null && item.alarm_id != ''){ //判断该对象是否需要展示工单监测指标
        IntelligentRoadTest.isShowAlarmInfoMessage = true;
    }/*else{
        IntelligentRoadTest.isShowAlarmInfoMessage = false;
    }*/
    //增加查询工单指标的方法
    if(IntelligentRoadTest.isShowAlarmInfoMessage == true){
        IntelligentRoadTest.getSenseObjectAlarmInfoData("天翼蓝鹰农贸市场",item.esbh_id , IntelligentRoadTest.day , item.poor_coverage_set);
    }
    IntelligentRoadTest.showPolygon(item.gis_data,undefined,"market",item.esbh_id,IntelligentRoadTest.day,item.esbh_name);
    IntelligentRoadTest.loadGrid(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
    /*IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
        [
            {"key":"区域名称","val":item.esbh_name},
            {"key":"区域编号","val":item.esbh_id},
        ]
    );*/

    // $('#concernHandleDescribe').val(item.handle_description);
    if(IntelligentRoadTest.mapClick){
        IntelligentRoadTest.mapClick=false;
    }else{
    	if(item.audit_stat!='待审核'||item.audit_style!='删除'){
//    		var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
//            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
    		IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),16);
    	}
    }

    if(!IntelligentRoadTest.isScreenCompared&&IntelligentRoadTest.isAddMessageEvent){//不是在分屏页，并且点击过分屏
        if(!windowScreeen.closed){//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
            // windowScreeen.focus();
            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item,'market');
        }
    }
    // $("#colorBar").click();

    var RecentCellImg = $("#showMarketCompleteMessage").find('.linkCell').children('img');
    $(RecentCellImg).each(function(){
        var srcText = $(this).attr('src');
        var clickImg=srcText.replace("nor","click");
        var norImg=srcText.replace("click","nor");
        if(srcText==clickImg){
            $(this).attr('src',norImg);
        }
    });
    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();

    var echartTitle = "历史30天覆盖变化";
    IntelligentRoadTest.getSense30DayLineData(8 , item.esbh_id , item.city);//加载30天的折线图

    var nearTOP5 = [];
    if(item.top5_sector_set != null && item.top5_sector_set != ""){
        var to5DataArr = item.top5_sector_set.split("@");
        for(var i =  0 ; i < to5DataArr.length; i++){
            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
        }
    }
    var mrNearTOP5 = [];
    if(item.sector_set != null && item.sector_set != ""){
        var mrTo5DataArr = item.sector_set.split("@");
        for(var k =  0 ; k < mrTo5DataArr.length; k++){
            mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
        }
    }
    if(IntelligentRoadTest.checkIfHasSameSector(nearTOP5 , mrNearTOP5)){
        item.isHasSameSector = true;
    }
    var nearPoorAreaList = []; //附近弱覆盖区域集合
    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
    }
    var poorAreaList = [] ;//弱覆盖区域集合
    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
    }
    IntelligentRoadTest.polygonList=[];
    IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList,1);
    IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList,2);
    if(item.day !=  null && item.day.toString().indexOf("-") < 0){ //转换日期格式
        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
    }
    $(".linkCell").attr("title","显示连线");
    $(".linkCell").removeClass("linkCellHover");
    IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData(item,8);
    if(item.audit_style=='删除'&&item.audit_stat=='审核通过'){
    	$("#showMarketCompleteMessage").find('.systemLayerBottonLi').hide();
    	$("#showMarketCompleteMessage").find('.systemLayerDelete').hide();
    	$("#showMarketCompleteMessage").find('.systemLayerDeleteEnd').show();
    }else{
    	if(IntelligentRoadTest.user_role.indexOf('审核员')<0){
        	$("#showMarketCompleteMessage").find('.systemLayerBottonLi').hide();
        	$("#showMarketCompleteMessage").find('.systemLayerDelete').hide();
        }else{
        	$("#showMarketCompleteMessage").find('.systemLayerBottonLi').show();
        	$("#showMarketCompleteMessage").find('.systemLayerDelete').show();
        }
    	$("#showMarketCompleteMessage").find('.systemLayerDeleteEnd').hide();
    }
    if(IntelligentRoadTest.marketCompleteVM == null){
        IntelligentRoadTest.marketCompleteVM = new Vue({
            el : '#showMarketCompleteMessage' ,
            data : {
                marketData : item ,
                // dataIndex : index ,
                nrTop5Cell : nearTOP5,
                mrTop5Cell : mrNearTOP5,
                title : echartTitle,
                isShowAlarmInfo : IntelligentRoadTest.isShowAlarmInfoMessage,
                alarm_dataObj:{}, //用于存放从告警表中获取到的指标的对象
                alaram_title:"工单监测",
                uname : IntelligentRoadTest.currentUser,
                nearPoorAreaListData :  nearPoorAreaList
            },
            methods : {
                marketPosition : function(item){
                    // IntelligentRoadTest.marketPositiong(item);
                    var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
                },
                viewMarketLog : function (item) {
                    IntelligentRoadTest.marketLog(item);
                },
                showDetailInfo :function (event){
                    IntelligentRoadTest.showDetailInfo();
                },
                showLinkCell :function (event,item,type){
                    //type=1最近小区，type=2 接入扇区
                    if($(event.currentTarget).hasClass("linkCellHover")){
                        $(event.currentTarget).attr("title","显示连线");
                        $(event.currentTarget).removeClass("linkCellHover");
                        if(type==1){
                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                        }else if(type==2){
                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                        }
                    }else{
                        $(event.currentTarget).attr("title","隐藏连线");
                        $(event.currentTarget).addClass("linkCellHover");
                        var max_lng = item.longitude_max_baidu;
                        var max_lat = item.latitude_max_baidu;
                        var min_lng = item.longitude_min_baidu;
                        var min_lat = item.latitude_min_baidu;
                        var mid_lng = item.longitude_mid_baidu;
                        var mid_lat = item.latitude_mid_baidu;
                        var centerPoint = new BMap.Point(mid_lng,mid_lat);
                        if(type==1){
                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint,item.top5_sector_set);
                        }else if(type==2){
                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint,item.sector_set);
                        }
                    }
                },
                showLinkPoorArea :function (event,item,type){
                    //扇区连接线
                    if($(event.currentTarget).hasClass("linkCellHover")){
                        $(event.currentTarget).attr("title","显示连线");
                        $(event.currentTarget).removeClass("linkCellHover");
                        // $(event.currentTarget).children().attr("src",norImg);
                        IntelligentRoadTest.hideSectorPoorLine(type);//---
                    }else{
                        $(event.currentTarget).attr("title","隐藏连线");
                        $(event.currentTarget).addClass("linkCellHover");
                        IntelligentRoadTest.showSectorPoorLine(item,type);
                    }
                },
                gotoShowSectorMessage : function (sectorDate){
                    IntelligentRoadTest.clickType=1;
                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid , sectorDate.cellid , IntelligentRoadTest.day);
                },
                gotoKPIList : function (item){
                    if(item.sector_set != null){
                        var sectorArr = item.sector_set.split("@");
                        showOrHideInputImage(2);
                        IntelligentRoadTest.loadKPIListData(sectorArr);
                        $("#kpiBackPoor").html("返回上一级");
                    }
                },
                editSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.editSystemLayer(item,8);
                },
                resetSystemLayer : function (item,event){
                    IntelligentRoadTest_SystemLayerEdit.resetSystemLayer(item,8,event);
                },
                saveSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.saveSystemLayer(item,8);
                },
                commitSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.commitSystemLayer(item,8);
                },
                recoverSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer(item,8);
                },
                deleteSystemLayer: function (item){
                	IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer(item,8);
                },
                redrawSystemLayer: function (item,event){
                	IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer(item,8,event);
                },
                cancelSystemLayer: function (item,event){
                	IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer(item,8,event);
                },
                showPolygonGrid:function(item,event){
                    IntelligentRoadTest.showHidePolygonGrid(item,event);
                }
            }
        });
    }else{
        IntelligentRoadTest.marketCompleteVM.marketData = item;
        // IntelligentRoadTest.marketCompleteVM.dataIndex = index;
        IntelligentRoadTest.marketCompleteVM.nrTop5Cell = nearTOP5;
        IntelligentRoadTest.marketCompleteVM.mrTop5Cell = mrNearTOP5;
        IntelligentRoadTest.marketCompleteVM.nearPoorAreaListData = nearPoorAreaList;
        IntelligentRoadTest.marketCompleteVM.title = echartTitle;
        IntelligentRoadTest.marketCompleteVM.isShowAlarmInfo = IntelligentRoadTest.isShowAlarmInfoMessage;
    }

}


/**********************************
 * @funcname IntelligentRoadTestSystemLayerV3.showUptownMessage
 * @funcdesc 渲染高密度住宅区详情页
 * @param {object} item (input optional) 具体高密度住宅区对象轮廓数据
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.showUptownMessage =function IntelligentRoadTestSystemLayerV3_showUptownMessage(item){
    // IntelligentRoadTest.mkIndex=index;
    IntelligentRoadTest.cacheItem=item;
    //跳转到高密度住宅区详情
    IntelligentRoadTest.goUptownCompleteMessage();
    // IntelligentRoadTest.index=9;
    IntelligentRoadTest.removeEsbhPolyline();//清除附近弱区的多边形（工单监测）
    if(item.alarm_id != null && item.alarm_id != ''){ //判断该对象是否需要展示工单监测指标
        IntelligentRoadTest.isShowAlarmInfoMessage = true;
    }/*else{
        IntelligentRoadTest.isShowAlarmInfoMessage = false;
    }*/
    //增加查询工单指标的方法
    if(IntelligentRoadTest.isShowAlarmInfoMessage == true){
        IntelligentRoadTest.getSenseObjectAlarmInfoData("天翼蓝鹰高密度住宅区",item.esbh_id , IntelligentRoadTest.day , item.poor_coverage_set);
    }
    IntelligentRoadTest.showPolygon(item.gis_data,undefined,"uptown",item.esbh_id,IntelligentRoadTest.day,item.esbh_name);
    IntelligentRoadTest.loadGrid(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
    /*IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
        [
            {"key":"区域名称","val":item.esbh_name},
            {"key":"区域编号","val":item.esbh_id},
        ]
    );*/

    // $('#concernHandleDescribe').val(item.handle_description);
    if(IntelligentRoadTest.mapClick){
        IntelligentRoadTest.mapClick=false;
    }else{
    	if(item.audit_stat!='待审核'||item.audit_style!='删除'){
//    		var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
//            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
    		IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),16);
    	}
    }

    if(!IntelligentRoadTest.isScreenCompared&&IntelligentRoadTest.isAddMessageEvent){//不是在分屏页，并且点击过分屏
        if(!windowScreeen.closed){//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
            // windowScreeen.focus();
            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item,'uptown');
        }
    }
    // $("#colorBar").click();

    var RecentCellImg = $("#showUptownCompleteMessage").find('.linkCell').children('img');
    $(RecentCellImg).each(function(){
        var srcText = $(this).attr('src');
        var clickImg=srcText.replace("nor","click");
        var norImg=srcText.replace("click","nor");
        if(srcText==clickImg){
            $(this).attr('src',norImg);
        }
    });
    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();

    var echartTitle = "历史30天覆盖变化";
    IntelligentRoadTest.getSense30DayLineData(2 , item.esbh_id , item.city);//加载30天的折线图

    var nearTOP5 = [];
    if(item.top5_sector_set != null && item.top5_sector_set != ""){
        var to5DataArr = item.top5_sector_set.split("@");
        for(var i =  0 ; i < to5DataArr.length; i++){
            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
        }
    }
    var mrNearTOP5 = [];
    if(item.sector_set != null && item.sector_set != ""){
        var mrTo5DataArr = item.sector_set.split("@");
        for(var k =  0 ; k < mrTo5DataArr.length; k++){
            mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
        }
    }
    if(IntelligentRoadTest.checkIfHasSameSector(nearTOP5 , mrNearTOP5)){
        item.isHasSameSector = true;
    }
    var nearPoorAreaList = []; //附近弱覆盖区域集合
    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
    }
    var poorAreaList = [] ;//弱覆盖区域集合
    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
    }
//                    IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList,1);
    IntelligentRoadTest.polygonList=[];
    IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList,2);

    if(item.day !=  null && item.day.toString().indexOf("-") < 0){ //转换日期格式
        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
    }
    $(".linkCell").attr("title","显示连线");
    $(".linkCell").removeClass("linkCellHover");
    IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData(item,2);
    if(item.audit_style=='删除'&&item.audit_stat=='审核通过'){
    	$("#showUptownCompleteMessage").find('.systemLayerBottonLi').hide();
    	$("#showUptownCompleteMessage").find('.systemLayerDelete').hide();
    	$("#showUptownCompleteMessage").find('.systemLayerDeleteEnd').show();
    }else{
    	if(IntelligentRoadTest.user_role.indexOf('审核员')<0){
        	$("#showUptownCompleteMessage").find('.systemLayerBottonLi').hide();
        	$("#showUptownCompleteMessage").find('.systemLayerDelete').hide();
        }else{
        	$("#showUptownCompleteMessage").find('.systemLayerBottonLi').show();
        	$("#showUptownCompleteMessage").find('.systemLayerDelete').show();
        }
    	$("#showUptownCompleteMessage").find('.systemLayerDeleteEnd').hide();
    }
    if(IntelligentRoadTest.uptownCompleteVM == null){
        IntelligentRoadTest.uptownCompleteVM = new Vue({
            el : '#showUptownCompleteMessage' ,
            data : {
                uptownData : item ,
                // dataIndex : index ,
                nrTop5Cell : nearTOP5,
                mrTop5Cell : mrNearTOP5,
                title : echartTitle,
                isShowAlarmInfo : IntelligentRoadTest.isShowAlarmInfoMessage,
                alarm_dataObj:{}, //用于存放从告警表中获取到的指标的对象
                alaram_title:"工单监测",
                uname : IntelligentRoadTest.currentUser,
                nearPoorAreaListData : nearPoorAreaList
            },
            methods : {
                uptownPosition : function(item){
                    // IntelligentRoadTest.uptownPositiong(item);
                    var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
                },
                viewUptownLog : function (item) {
                    IntelligentRoadTest.uptownLog(item);
                },
                showDetailInfo :function (event){
                    IntelligentRoadTest.showDetailInfo();
                },
                showLinkCell :function (event,item,type){
                    //type=1最近小区，type=2 接入扇区
                    if($(event.currentTarget).hasClass("linkCellHover")){
                        $(event.currentTarget).attr("title","显示连线");
                        $(event.currentTarget).removeClass("linkCellHover");
                        if(type==1){
                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                        }else if(type==2){
                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                        }
                    }else{
                        $(event.currentTarget).attr("title","隐藏连线");
                        $(event.currentTarget).addClass("linkCellHover");
                        var max_lng = item.longitude_max_baidu;
                        var max_lat = item.latitude_max_baidu;
                        var min_lng = item.longitude_min_baidu;
                        var min_lat = item.latitude_min_baidu;
                        var mid_lng = item.longitude_mid_baidu;
                        var mid_lat = item.latitude_mid_baidu;
                        var centerPoint = new BMap.Point(mid_lng,mid_lat);
                        if(type==1){
                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint,item.top5_sector_set);
                        }else if(type==2){
                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint,item.sector_set);
                        }
                    }
                },
                showLinkPoorArea :function (event,item,type){
                    //扇区连接线
                    if($(event.currentTarget).hasClass("linkCellHover")){
                        $(event.currentTarget).attr("title","显示连线");
                        $(event.currentTarget).removeClass("linkCellHover");
                        // $(event.currentTarget).children().attr("src",norImg);
                        IntelligentRoadTest.hideSectorPoorLine(type);//---
                    }else{
                        $(event.currentTarget).attr("title","隐藏连线");
                        $(event.currentTarget).addClass("linkCellHover");
                        IntelligentRoadTest.showSectorPoorLine(item,type);
                    }
                },
                gotoShowSectorMessage : function (sectorDate){
                    IntelligentRoadTest.clickType=1;
                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid , sectorDate.cellid , IntelligentRoadTest.day);
                },
                gotoKPIList : function (item){
                    if(item.sector_set != null){
                        var sectorArr = item.sector_set.split("@");
                        showOrHideInputImage(2);
                        IntelligentRoadTest.loadKPIListData(sectorArr);
                        $("#kpiBackPoor").html("返回上一级");
                    }
                },
                editSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.editSystemLayer(item,2);
                },
                resetSystemLayer : function (item,event){
                    IntelligentRoadTest_SystemLayerEdit.resetSystemLayer(item,2,event);
                },
                saveSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.saveSystemLayer(item,2);
                },
                commitSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.commitSystemLayer(item,2);
                },
                recoverSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer(item,2);
                },
                deleteSystemLayer: function (item){
                	IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer(item,2);
                },
                redrawSystemLayer: function (item,event){
                	IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer(item,2,event);
                },
                cancelSystemLayer: function (item,event){
                	IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer(item,2,event);
                },
                showPolygonGrid:function(item,event){
                    IntelligentRoadTest.showHidePolygonGrid(item,event);
                }
            }
        });
    }else{
        IntelligentRoadTest.uptownCompleteVM.uptownData = item;
        // IntelligentRoadTest.uptownCompleteVM.dataIndex = index;
        IntelligentRoadTest.uptownCompleteVM.nrTop5Cell = nearTOP5;
        IntelligentRoadTest.uptownCompleteVM.mrTop5Cell = mrNearTOP5;
        IntelligentRoadTest.uptownCompleteVM.nearPoorAreaListData = nearPoorAreaList;
        IntelligentRoadTest.uptownCompleteVM.isShowAlarmInfo = IntelligentRoadTest.isShowAlarmInfoMessage;
        // IntelligentRoadTest.uptownCompleteVM.title = echartTitle;
    }

}


/**********************************
 * @funcname IntelligentRoadTestSystemLayerV3.showBusinessMessage
 * @funcdesc 渲染高密度商务区详情页
 * @param {object} item (input optional) 具体渲染高密度商务区对象轮廓数据
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.showBusinessMessage =function IntelligentRoadTestSystemLayerV3_showBusinessMessage(item){
    // IntelligentRoadTest.mkIndex=index;
    IntelligentRoadTest.cacheItem=item;
    //跳转到高密度商务区详情
    IntelligentRoadTest.goBusinessCompleteMessage();
    // IntelligentRoadTest.index=17;
    IntelligentRoadTest.removeEsbhPolyline();//清除附近弱区的多边形（工单监测）
    if(item.alarm_id != null && item.alarm_id != ''){ //判断该对象是否需要展示工单监测指标
        IntelligentRoadTest.isShowAlarmInfoMessage = true;
    }/*else{
        IntelligentRoadTest.isShowAlarmInfoMessage = false;
    }*/
    //增加查询工单指标的方法
    if(IntelligentRoadTest.isShowAlarmInfoMessage == true){
        IntelligentRoadTest.getSenseObjectAlarmInfoData("天翼蓝鹰高流量商务区",item.esbh_id , IntelligentRoadTest.day , item.poor_coverage_set , item.zlqy_flag);
    }
    IntelligentRoadTest.showPolygon(item.gis_data,undefined,"business",item.esbh_id,IntelligentRoadTest.day,item.esbh_name);
    IntelligentRoadTest.loadGrid(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
   /* IntelligentRoadTest.openInfoWindowTwo(item.longitude_mid_baidu,item.latitude_mid_baidu,
        [
            {"key":"区域名称","val":item.esbh_name},
            {"key":"区域编号","val":item.esbh_id},
        ]
    );*/

    // $('#concernHandleDescribe').val(item.handle_description);
    if(IntelligentRoadTest.mapClick){
        IntelligentRoadTest.mapClick=false;
    }else{
    	if(item.audit_stat!='待审核'||item.audit_style!='删除'){
//    		var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
//            IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
    		IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),16);
    	}
    }
    if(!IntelligentRoadTest.isScreenCompared&&IntelligentRoadTest.isAddMessageEvent){//不是在分屏页，并且点击过分屏
        if(!windowScreeen.closed){//如果窗口没有关闭，需要进行同步信息，如果已经关闭，什么都不用做
            // windowScreeen.focus();
            IntelligentRoadTestScreenCompared.postMessageToScreenCompared(item,'business');
        }
    }
    // $("#colorBar").click();

    var RecentCellImg = $("#showBusinessCompleteMessage").find('.linkCell').children('img');
    $(RecentCellImg).each(function(){
        var srcText = $(this).attr('src');
        var clickImg=srcText.replace("nor","click");
        var norImg=srcText.replace("click","nor");
        if(srcText==clickImg){
            $(this).attr('src',norImg);
        }
    });
    IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
    IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();

    var echartTitle = "历史30天覆盖变化";
    IntelligentRoadTest.getSense30DayLineData(3 , item.esbh_id , item.city);//加载30天的折线图

    var nearTOP5 = [];
    if(item.top5_sector_set != null && item.top5_sector_set != ""){
        var to5DataArr = item.top5_sector_set.split("@");
        for(var i =  0 ; i < to5DataArr.length; i++){
            nearTOP5[i] = IntelligentRoadTest.dealAnotherTop5CellData(to5DataArr[i]);
        }
    }
    var mrNearTOP5 = [];
    if(item.sector_set != null && item.sector_set != ""){
        var mrTo5DataArr = item.sector_set.split("@");
        for(var k =  0 ; k < mrTo5DataArr.length; k++){
            mrNearTOP5[k] = IntelligentRoadTest.dealTop5CellData(mrTo5DataArr[k]);
        }
    }
    if(IntelligentRoadTest.checkIfHasSameSector(nearTOP5 , mrNearTOP5)){
        item.isHasSameSector = true;
    }
    var nearPoorAreaList = []; //附近弱覆盖区域集合
    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
        nearPoorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
    }
    var poorAreaList = [] ;//弱覆盖区域集合
    if(item.poor_coverage_set != null && item.poor_coverage_set != ''){
        poorAreaList = IntelligentRoadTest.splitPoorAreaStr(item.poor_coverage_set);
    }
    IntelligentRoadTest.polygonList=[];
    IntelligentRoadTest.loadPolygonByObjectIdList(poorAreaList,1);
    IntelligentRoadTest.loadPolygonByObjectIdList(nearPoorAreaList,2);
    if(item.day !=  null && item.day.toString().indexOf("-") < 0){ //转换日期格式
        item.day = dealDateString(item.day.toString()).Format("yyyy-MM-dd");
    }
    $(".linkCell").attr("title","显示连线");
    $(".linkCell").removeClass("linkCellHover");
    
 // 增加一个查询,获取图层的版本信息等
    IntelligentRoadTest_SystemLayerEdit.loadSystemLayerData(item,3);
//    var user_role = $('#user_role_List_string').val();
    
    if(item.audit_style=='删除'&&item.audit_stat=='审核通过'){
    	$("#showBusinessCompleteMessage").find('.systemLayerBottonLi').hide();
    	$("#showBusinessCompleteMessage").find('.systemLayerDelete').hide();
    	$("#showBusinessCompleteMessage").find('.systemLayerDeleteEnd').show();
    }else{
    	if(IntelligentRoadTest.user_role.indexOf('审核员')<0){
        	$("#showBusinessCompleteMessage").find('.systemLayerBottonLi').hide();
        	$("#showBusinessCompleteMessage").find('.systemLayerDelete').hide();
        }else{
        	$("#showBusinessCompleteMessage").find('.systemLayerBottonLi').show();
        	$("#showBusinessCompleteMessage").find('.systemLayerDelete').show();
        }
    	$("#showBusinessCompleteMessage").find('.systemLayerDeleteEnd').hide();
    }
    
    if(IntelligentRoadTest.businessCompleteVM == null){
        IntelligentRoadTest.businessCompleteVM = new Vue({
            el : '#showBusinessCompleteMessage' ,
            data : {
                businessData : item ,
                // dataIndex : index ,
                nrTop5Cell : nearTOP5,
                mrTop5Cell : mrNearTOP5,
                title : echartTitle,
                isShowAlarmInfo : IntelligentRoadTest.isShowAlarmInfoMessage,
                alarm_dataObj:{}, //用于存放从告警表中获取到的指标的对象
                alaram_title:"工单监测",
                uname : IntelligentRoadTest.currentUser,
                nearPoorAreaListData :  nearPoorAreaList
            },
            methods : {
                businessPosition : function(item){
                    //IntelligentRoadTest.businessPositiong(item);
                    var zoom=getZoom(item.longitude_max_baidu,item.longitude_min_baidu,item.latitude_max_baidu,item.latitude_min_baidu);
                    IntelligentRoadTest.map.centerAndZoom(new BMap.Point(item.longitude_mid_baidu,item.latitude_mid_baidu),zoom);
                },
                viewBusinessLog : function (item) {
                    IntelligentRoadTest.businessLog(item);
                },
                showDetailInfo :function (event){
                    IntelligentRoadTest.showDetailInfo();
                },
                showLinkCell :function (event,item,type){
                    //type=1最近小区，type=2 接入扇区
                    if($(event.currentTarget).hasClass("linkCellHover")){
                        $(event.currentTarget).attr("title","显示连线");
                        $(event.currentTarget).removeClass("linkCellHover");
                        if(type==1){
                            IntelligentRoadTest.hideGridOrPolygonNrTop5Sector();
                        }else if(type==2){
                            IntelligentRoadTest.hideGridOrPolygonMrTop5Sector();
                        }
                    }else{
                        $(event.currentTarget).attr("title","隐藏连线");
                        $(event.currentTarget).addClass("linkCellHover");
                        var max_lng = item.longitude_max_baidu;
                        var max_lat = item.latitude_max_baidu;
                        var min_lng = item.longitude_min_baidu;
                        var min_lat = item.latitude_min_baidu;
                        var mid_lng = item.longitude_mid_baidu;
                        var mid_lat = item.latitude_mid_baidu;
                        var centerPoint = new BMap.Point(mid_lng,mid_lat);
                        if(type==1){
                            IntelligentRoadTest.showNrTop5CellForMap(centerPoint,item.top5_sector_set);
                        }else if(type==2){
                            IntelligentRoadTest.showMrNrTop5CellForMap(centerPoint,item.sector_set);
                        }
                    }
                },
                showLinkPoorArea :function (event,item,type){
                    //扇区连接线
                    if($(event.currentTarget).hasClass("linkCellHover")){
                        $(event.currentTarget).attr("title","显示连线");
                        $(event.currentTarget).removeClass("linkCellHover");
                        // $(event.currentTarget).children().attr("src",norImg);
                        IntelligentRoadTest.hideSectorPoorLine(type);//---
                    }else{
                        $(event.currentTarget).attr("title","隐藏连线");
                        $(event.currentTarget).addClass("linkCellHover");
                        IntelligentRoadTest.showSectorPoorLine(item,type);
                    }
                },
                gotoShowSectorMessage : function (sectorDate){
                    IntelligentRoadTest.clickType=1;
                    IntelligentRoadTest.getSectorMessageById(sectorDate.enodebid , sectorDate.cellid , IntelligentRoadTest.day);
                },
                gotoKPIList : function (item){
                    if(item.sector_set != null){
                        var sectorArr = item.sector_set.split("@");
                        showOrHideInputImage(2);
                        IntelligentRoadTest.loadKPIListData(sectorArr);
                        $("#kpiBackPoor").html("返回上一级");
                    }
                },
                editSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.editSystemLayer(item,3);
                },
                resetSystemLayer : function (item,event){
                    IntelligentRoadTest_SystemLayerEdit.resetSystemLayer(item,3,event);
                },
                saveSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.saveSystemLayer(item,3);
                },
                commitSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.commitSystemLayer(item,3);
                },
                recoverSystemLayer : function (item){
                    IntelligentRoadTest_SystemLayerEdit.recoverSystemLayer(item,3);
                },
                deleteSystemLayer: function (item){
                	IntelligentRoadTest_SystemLayerEdit.deleteSystemLayer(item,3);
                },
                redrawSystemLayer: function (item,event){
                	IntelligentRoadTest_SystemLayerEdit.redrawSystemLayer(item,3,event);
                },
                cancelSystemLayer: function (item,event){
                	IntelligentRoadTest_SystemLayerEdit.cancelSystemLayer(item,3,event);
                },
                showPolygonGrid:function(item,event){
                    IntelligentRoadTest.showHidePolygonGrid(item,event);
                }
            }
        });
    }else{
        IntelligentRoadTest.businessCompleteVM.businessData = item;
        // IntelligentRoadTest.businessCompleteVM.dataIndex = index;
        IntelligentRoadTest.businessCompleteVM.nrTop5Cell = nearTOP5;
        IntelligentRoadTest.businessCompleteVM.mrTop5Cell = mrNearTOP5;
        IntelligentRoadTest.businessCompleteVM.nearPoorAreaListData = nearPoorAreaList;
        IntelligentRoadTest.businessCompleteVM.title = echartTitle;
        IntelligentRoadTest.businessCompleteVM.isShowAlarmInfo = IntelligentRoadTest.isShowAlarmInfoMessage;
    }

}

/**********************************
 * @funcname IntelligentRoadTestSystemLayerV3.showGridV2
 * @funcdesc 场景图层栅格和弱区图层栅格数据的处理，过滤不在多边形的数据以及重复数据（4.29）
 * @param {object} data (input optional) Hbase查询出来的数据（4.29）
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.showGridV2=function IntelligentRoadTestSystemLayerV3_showGridV2(data){
    IntelligentRoadTest.gridDataV2=data;
    IntelligentRoadTest.GridMap.clear();
   /* //对不在多边形内的栅格进行过滤
    var result = [];
    if(data != undefined){
        result = data.result;
    }
    var polygonGridData = [];
    //将不在框选多边形内的栅格去掉
    for(var i=0;i<result.length;i++){
        var gridMidLng = result[i][1].split("#")[11];
        var gridMidLat = result[i][1].split("#")[12];
        var point = new BMap.Point(gridMidLng,gridMidLat);
        var num=0;
        for(var j=0;j<IntelligentRoadTest.polygonPoint.length;j++){
            if(BMapLib.GeoUtils.isPointInPolygon(point, IntelligentRoadTest.polygonPoint[j])){
               num++;
            }
        }
        if(num==1){
            polygonGridData.push(result[i]);
        }
    }
    data.result=polygonGridData;*/
    // var oldData=IntelligentRoadTestSystemLayerV3.formatData(polygonGridData);
    // var newdata=IntelligentRoadTestSystemLayerV3.gridResultGroupByGridNumV2(oldData);
    // IntelligentRoadTestSystemLayerV3.showGridByCanv2(newdata);
    IntelligentRoadTestSystemLayerV3.showGridByCanv2(data);
}

//根据用户缓存的条件读取对应的4.29表的字段(栅格详情页)
IntelligentRoadTestSystemLayerV3.getGridCloumnsList=function IntelligentRoadTestSystemLayerV3_getGridCloumnsList(){
    var cloumnsList = [];
    var sectorList = [];
    var join="";
    //覆盖质量
    cloumnsList.push("i:a1");
    for (var gridBand in IntelligentRoadTest.gridBand) {
        switch (IntelligentRoadTest.gridBand[gridBand]) {
            case "最优场强":
                cloumnsList.push("i:a2");
                sectorList.push("i:a9");
                continue;
            case "主接入场强":
                cloumnsList.push("i:a7");
                sectorList.push("i:a14");
                continue;
            case "800M":
                cloumnsList.push("i:a3");
                sectorList.push("i:a10");
                continue;
            case "1.8G":
                cloumnsList.push("i:a4");
                sectorList.push("i:a11");
                continue;
            case "2.1G":
                cloumnsList.push("i:a5");
                sectorList.push("i:a12");
                continue;
            case "2.6G":
                cloumnsList.push("i:a6");
                sectorList.push("i:a13");
                continue;
        };
    }
    if(sectorList.length>0){
        join=",";
    }
    var alarmCell="i:b1";
    if(IntelligentRoadTest.gridTypeIndex==3){//MOD3干扰
        alarmCell="i:b2";
    }else if(IntelligentRoadTest.gridTypeIndex==4){//越区覆盖
        alarmCell="i:b4";
    }else if(IntelligentRoadTest.gridTypeIndex==5){//重叠覆盖
        alarmCell="i:b3";
    }
    return cloumnsList.join(",")+join+sectorList.join(",")+",i:a16,"+alarmCell;
}


//根据用户缓存的条件读取对应的4.29表的字段
IntelligentRoadTestSystemLayerV3.getCloumnsList=function IntelligentRoadTestSystemLayerV3_getCloumnsList(){
    var cloumnsList = [];
    //覆盖质量
    for (var gridBand in IntelligentRoadTest.gridBand) {
        switch (IntelligentRoadTest.gridBand[gridBand]) {
            case "最优场强":
                cloumnsList.push("i:a2");
                continue;
            case "主接入场强":
                cloumnsList.push("i:a7");
                continue;
            case "800M":
                cloumnsList.push("i:a3");
                continue;
            case "1.8G":
                cloumnsList.push("i:a4");
                continue;
            case "2.1G":
                cloumnsList.push("i:a5");
                continue;
            case "2.6G":
                cloumnsList.push("i:a6");
                continue;
        };
    }

    if(IntelligentRoadTest.gridTypeIndex==1||IntelligentRoadTest.gridTypeIndex==2){//上行速率、下行速率
        cloumnsList.push("i:a16,i:b9");
    }else if(IntelligentRoadTest.gridTypeIndex==3){//MOD3干扰
        cloumnsList.push("i:b1,i:b2");
    }else if(IntelligentRoadTest.gridTypeIndex==4){//越区覆盖
        cloumnsList.push("i:b1,i:b4");
    }else if(IntelligentRoadTest.gridTypeIndex==5){//重叠覆盖
        cloumnsList.push("i:b1,i:b3");
    }else if(IntelligentRoadTest.gridTypeIndex==6){//EC/IO
        cloumnsList.push("i:b10");
    }else if(IntelligentRoadTest.gridTypeIndex==7){//NB预测
        cloumnsList.push("i:b11");
    }
    //增加这个判断是为了避免用户选了 【区分频段】 但是又没有选择里面的具体频段时，匹配不到对应的列字段查hbase会报错，
    // 这里随便给一个表中没有的字段i:c20，这样查出来的数据就是空的，但不会报列缺失的错误
    if(cloumnsList.length==0){
        cloumnsList.push("i:c20");
    }
    return cloumnsList.join(",");
}
//查询三网栅格的数据 拼接查询sql
/**********************************
 * @funcname IntelligentRoadTest.loadThreeGrid
 * @funcdesc 查询三网栅格的数据 拼接查询sql（4.21）
 * @param {String} maxlng_maxlat_minlng_minlat (input optional) 传入的当前点击三网多边形的最大最小经纬度
 * @return {Object} {"progressBarSqls":list,"functionlist":IntelligentRoadTestSystemLayerV3.showThreeGrid,"dataBase":7} 拼接好需要提交的参数
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.loadThreeGrid = function IntelligentRoadTestSystemLayerV3_loadThreeGrid(maxlng_maxlat_minlng_minlat){
	IntelligentRoadTest.maxlng_maxlat_minlng_minlatThree=maxlng_maxlat_minlng_minlat+getPreMonth(IntelligentRoadTest.day);
	var keyprefix=getPreMonth(IntelligentRoadTest.day)+"_"+"20_";
	var cloumnsList = "i:a1,i:a9,i:a10,i:a11,i:a12,i:a13,i:a14,i:a15,i:a16,i:a19,i:a23,i:a24,i:a27,i:a30,i:a34,i:a35,i:a38,i:a41,i:a45,i:a46";
	var list = ["IntelligentRoadTestV2_getThreeGridData","TABLENAME:"+"NOCE:DSI_AGPS_GRID_RSRP_M","GRIDKEYPREFIX:"+keyprefix,"POLYGONCONTOUR:"+IntelligentRoadTest.polygonContour,"COLUMNLIST:"+cloumnsList];
    IntelligentRoadTest.loadLayerNum+=1;
	return {"progressBarSqls":list,"functionlist":IntelligentRoadTestSystemLayerV3.showThreeGrid,"dataBase":7};
	
}

//查询区域、场景栅格的数据 拼接查询sql
/**********************************
 * @funcname IntelligentRoadTest.loadAreaGrid
 * @funcdesc //查询区域、场景栅格的数据 拼接查询sql（4.29）
 * @param {String} maxlng_maxlat_minlng_minlat (input optional) 传入的当前点击的场景多边形的最大最小经纬度
 * @return {Object} {"progressBarSqls":list,"functionlist":IntelligentRoadTestSystemLayerV3.showThreeGrid,"dataBase":7} 拼接好需要提交的参数
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.loadAreaGrid = function IntelligentRoadTestSystemLayerV3_loadAreaGrid(maxlng_maxlat_minlng_minlat){
    //栅格覆盖频段
    var gridBand=IntelligentRoadTest.gridBand;
    var gridType=IntelligentRoadTest.gridType;
    if(IntelligentRoadTest.gridTypeIndex==6){//如果选择的是EC/IO的栅格,gridType==0
        gridType=0;
    }
    var tableName=(IntelligentRoadTest.gridTime=="week") ? "DSI_MRO_ALL_GRID_TOT_W" : "DSI_MRO_ALL_GRID_TOT_D";

    //栅格数据
    var keyprefix=getddmm(IntelligentRoadTest.day)+"_"+gridType+"_";
    var cloumnsList = "";
    var list = [];
    var functionlist = [];
    cloumnsList = IntelligentRoadTestSystemLayerV3.getCloumnsList();
    list =["IntelligentRoadTestV2_getGridDataV2","TABLENAME:NOCE:"+tableName,"GRIDKEYPREFIX:"+keyprefix,"GRIDLEVEL:20",
        "POLYGONCONTOUR:"+IntelligentRoadTest.polygonContour,"COLUMNLIST:"+cloumnsList,"PARTITIONMOD:"+" "];//partitionmod 1
    //缓存
    IntelligentRoadTest.maxlng_maxlat_minlng_minlat = maxlng_maxlat_minlng_minlat + IntelligentRoadTest.day + IntelligentRoadTest.gridType + cloumnsList + IntelligentRoadTest.gridTime;
    IntelligentRoadTest.loadLayerNum+=1;
    return {"progressBarSqls":list,"functionlist":IntelligentRoadTestSystemLayerV3.showGridV2,"dataBase":7};
}

//处理三网的栅格数据用于渲染(4.21)
/**********************************
 * @funcname IntelligentRoadTestSystemLayerV3.showThreeGrid
 * @funcdesc //处理三网的栅格数据，过滤不在多边形的栅格数据以及重复的栅格数据(4.21)
 * @param {Object} data (input optional) 通过hbase查询返回的对象数据
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.showThreeGrid=function IntelligentRoadTestSystemLayerV3_showThreeGrid(data){
	IntelligentRoadTest.gridThreeData=data;
	IntelligentRoadTest.GridMap.clear();
	/*//对不在多边形内的栅格进行过滤
	var result = [];
	if(data != undefined){
	    result = data.result;
	}
	var polygonGridData = [];
	//将不在框选多边形内的栅格去掉
	for(var i=0;i<result.length;i++){
	    var gridMidLng = result[i][3];
	    var gridMidLat = result[i][4];
	    var point = new BMap.Point(gridMidLng,gridMidLat);
	    var num=0;
	    for(var j=0;j<IntelligentRoadTest.polygonPoint.length;j++){
	    	 if(BMapLib.GeoUtils.isPointInPolygon(point, IntelligentRoadTest.polygonPoint[j])){
	    	        num++;
	    	 }
	    }
	    if(num==1){
            polygonGridData.push(result[i]);
        }

	}
	data.result = polygonGridData;*/
	IntelligentRoadTestSystemLayerV3.showThreeGridByCanv(data);
}

//渲染三网的栅格
/**********************************
 * @funcname IntelligentRoadTest.showThreeGridByCanv
 * @funcdesc //渲染三网的栅格，同时计算三网的平均均值和覆盖率缓存用于提示框展示(4.21)
 * @param {Object} data (input optional) 通过hbase查询返回的对象数据
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.showThreeGridByCanv=function IntelligentRoadTestSystemLayerV3_showThreeGridByCanv(data){
    IntelligentRoadTest.gridThreeData=data;

    IntelligentRoadTest.GridMap.setThresholds(IntelligentRoadTest.gridThresholds);
    IntelligentRoadTest.GridMapM.setThresholds(IntelligentRoadTest.gridThresholds);
    IntelligentRoadTest.GridMapU.setThresholds(IntelligentRoadTest.gridThresholds);
  
	
	var result = callBackChangeData(data);
    data = null;
    IntelligentRoadTest.GridMap.clear();
    IntelligentRoadTest.GridMapM.clear();
    IntelligentRoadTest.GridMapU.clear();
    IntelligentRoadTest.isShowGrid = true;
    IntelligentRoadTest.isShowDTGrid = false;
    //清除描点数据
//		IntelligentRoadTest.GridMapCircle.clear();
    IntelligentRoadTest.GridMapCircleDataArr = null;
    IntelligentRoadTest.GridMapCircleDataArr = [];



//		IntelligentRoadTest.GridCanArr = [];
//		IntelligentRoadTest.GridCanArr = null;
    IntelligentRoadTest.GridCanArrT = null;
    IntelligentRoadTest.GridCanArrM = null;
    IntelligentRoadTest.GridCanArrU = null;
    IntelligentRoadTest.CanArr = null;

    IntelligentRoadTest.GridCanArrT = [];
    IntelligentRoadTest.GridCanArrM = [];
    IntelligentRoadTest.GridCanArrU = [];
    IntelligentRoadTest.CanArr = [];


    var grid_dx_count = 0;
    var grid_dx_sum = 0;
    var grid_dx_105_count = 0;
    var grid_yd_count = 0;
    var grid_yd_sum = 0;
    var grid_yd_105_count = 0;
    var grid_lt_count = 0;
    var grid_lt_sum = 0;
    var grid_lt_105_count = 0;
    for(var i=0;i<result.length;i++){
        var maxLng = result[i]["i:a13"];// 最大经度
        var maxLat = result[i]["i:a14"];// 最大纬度
        var minLng = result[i]["i:a9"];// 最小经度
        var minLat = result[i]["i:a10"];// 最小纬度
        var grid_num = result[i]["i:a1"];// 栅格号

        var dxrsrpCount = result[i]["i:a16"];//DX_RSRP_COUNT
        var dxrsrp105Count = result[i]["i:a19"];//DX_RSRP_105_COUNT
        var ydrsrpCount = result[i]["i:a27"];//YD_RSRP_COUNT
        var ydrsrp105Count = result[i]["i:a30"];//YD_RSRP_105_COUNT
        var ltrsrpCount = result[i]["i:a38"];//LT_RSRP_COUNT
        var ltrsrp105Count = result[i]["i:a41"];//LT_RSRP_105_COUNT
//	        var monthrelate = result[i]["i:a38"];//MONTH_RELATE

        var dxrsrpAvg = result[i]["i:a24"];//DX_RSRP_AVG
        var rsrp_avgM = result[i]["i:a35"];//YD_RSRP_AVG
        var rsrp_avgU = result[i]["i:a46"];//LT_RSRP_AVG
        var dx_cover = null;
        var yd_cover = null;
        var lt_cover = null;

        if(!isNull(dxrsrpCount)&&!isNull(dxrsrp105Count)){
            dx_cover = dxrsrp105Count/dxrsrpCount;
        }
        if(!isNull(ydrsrpCount)&&!isNull(ydrsrp105Count)){
            yd_cover = ydrsrp105Count/ydrsrpCount;
        }
        if(!isNull(ltrsrpCount)&&!isNull(ltrsrp105Count)){
            lt_cover = ltrsrp105Count/ltrsrpCount;
        }


        if(IntelligentRoadTest.isThreeNetStatus){
            if(!isNull(dxrsrpAvg)){
                var gridData = [minLng,minLat,maxLng,maxLat,dxrsrpAvg,grid_num,dx_cover];
                IntelligentRoadTest.GridCanArrT.push(gridData);
            }
            if(!isNull(rsrp_avgM)){
                var gridData = [minLng,minLat,maxLng,maxLat,rsrp_avgM,grid_num,yd_cover];
                IntelligentRoadTest.GridCanArrM.push(gridData);
            }

            if(!isNull(rsrp_avgU)){
                var gridData = [minLng,minLat,maxLng,maxLat,rsrp_avgU,grid_num,lt_cover];
                IntelligentRoadTest.GridCanArrU.push(gridData);
            }
        }

        //计算三网的覆盖率和平均值
        grid_dx_count += isNull(result[i]["i:a16"]) ? 0 : Number(result[i]["i:a16"]);//DX_RSRP_COUNT
        grid_dx_sum += isNull(result[i]["i:a23"]) ? 0 : Number(result[i]["i:a23"]);//DX_RSRP_SUM
        grid_dx_105_count += isNull(result[i]["i:a19"]) ? 0 : Number(result[i]["i:a19"]);//DX_RSRP_105_COUNT
        grid_yd_count += isNull(result[i]["i:a27"]) ? 0 : Number(result[i]["i:a27"]);//YD_RSRP_COUNT
        grid_yd_sum += isNull(result[i]["i:a34"]) ? 0 : Number(result[i]["i:a34"]);//YD_RSRP_SUM
        grid_yd_105_count += isNull(result[i]["i:a30"]) ? 0 : Number(result[i]["i:a30"]);//YD_RSRP_105_COUNT
        grid_lt_count += isNull(result[i]["i:a38"]) ? 0 : Number(result[i]["i:a38"]);//LT_RSRP_COUNT
        grid_lt_sum += isNull(result[i]["i:a45"]) ? 0 : Number(result[i]["i:a45"]);//LT_RSRP_SUM
        grid_lt_105_count += isNull(result[i]["i:a41"]) ? 0 : Number(result[i]["i:a41"]);//LT_RSRP_105_COUNT
    }

    var dx_rsrp_three = grid_dx_sum/grid_dx_count;
    var yd_rsrp_three = grid_yd_sum/grid_yd_count;
    var lt_rsrp_three = grid_lt_sum/grid_lt_count;
    var dx_cover_three = grid_dx_105_count/grid_dx_count;
    var yd_cover_three = grid_yd_105_count/grid_yd_count;
    var lt_cover_three = grid_lt_105_count/grid_lt_count;

    if(grid_dx_sum==0||grid_dx_count==0){
        dx_rsrp_three = null;
    }
    if(grid_yd_sum==0||grid_yd_count==0){
        yd_rsrp_three = null;
    }
    if(grid_lt_sum==0||grid_lt_count==0){
        lt_rsrp_three = null;
    }
    if(grid_dx_105_count==0||grid_dx_count==0){
        dx_cover_three = null;
    }
    if(grid_yd_105_count==0||grid_yd_count==0){
        yd_cover_three = null;
    }
    if(grid_lt_105_count==0||grid_lt_count==0){
        lt_cover_three = null;
    }

    //三网RSRP均值对比
    IntelligentRoadTest.dx_rsrp_three = isNull(dx_rsrp_three) ? 'null' : (dx_rsrp_three).toFixed(2);
    IntelligentRoadTest.yd_rsrp_three = isNull(yd_rsrp_three) ? 'null' : (yd_rsrp_three).toFixed(2);
    IntelligentRoadTest.lt_rsrp_three = isNull(lt_rsrp_three) ? 'null' : (lt_rsrp_three).toFixed(2);
    //三网覆盖率对比
    IntelligentRoadTest.dx_cover_three = isNull(dx_cover_three) ? 'null' : (dx_cover_three*100).toFixed(2);
    IntelligentRoadTest.yd_cover_three = isNull(yd_cover_three) ? 'null' : (yd_cover_three*100).toFixed(2);
    IntelligentRoadTest.lt_cover_three = isNull(lt_cover_three) ? 'null' : (lt_cover_three*100).toFixed(2);
    IntelligentRoadTest.month_relate_three = getPreMonth(IntelligentRoadTest.day);

    if(IntelligentRoadTest.isThreeNetStatus){
        var CTData = IntelligentRoadTest.GridCanArrT;
        var CMData = IntelligentRoadTest.GridCanArrM;
        var CUData = IntelligentRoadTest.GridCanArrU;
        for(var j=0;j<IntelligentRoadTest.colorBarArr.length;j++){
            CTData = IntelligentRoadTest.ClearData(CTData,IntelligentRoadTest.colorBarArr[j]);
            CMData = IntelligentRoadTest.ClearData(CMData,IntelligentRoadTest.colorBarArr[j]);
            CUData = IntelligentRoadTest.ClearData(CUData,IntelligentRoadTest.colorBarArr[j]);
        }
        IntelligentRoadTest.GridMap.draw(CTData);
        IntelligentRoadTest.GridMapM.draw(CMData);
        IntelligentRoadTest.GridMapU.draw(CUData);
        CTData = null;
        CMData = null;
        CUData = null;
    }
    IntelligentRoadTest.legendGrid();
    IntelligentRoadTest.openThreeLable();
    IntelligentRoadTest.currentLayerNum+=1;
}


//渲染区域、场景的栅格
//多边形点击呈现栅格回调函数(4.29)
/**********************************
 * @funcname IntelligentRoadTest.showGridByCanv2
 * @funcdesc //渲染场景和弱区的栅格，根据用户配置的栅格图层绘制栅格(4.29)
 * @param {Object} data (input optional) hbase返回后经过滤去重后的数据
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.showGridByCanv2 = function IntelligentRoadTestSystemLayerV3_showGridByCanv2(data){

    IntelligentRoadTest.GridMap.setThresholds(IntelligentRoadTest.gridThresholds);
    IntelligentRoadTest.GridMapM.setThresholds(IntelligentRoadTest.gridThresholds);
    IntelligentRoadTest.GridMapU.setThresholds(IntelligentRoadTest.gridThresholds);


    IntelligentRoadTest.GridMap.clear();
    IntelligentRoadTest.GridMapM.clear();
    IntelligentRoadTest.GridMapU.clear();
    IntelligentRoadTest.isShowGrid = true;
    IntelligentRoadTest.isShowDTGrid = false;
    //清除描点数据
//	IntelligentRoadTest.GridMapCircle.clear();
    IntelligentRoadTest.GridMapCircleDataArr = null;
    IntelligentRoadTest.GridMapCircleDataArr = [];



//	IntelligentRoadTest.GridCanArr = [];
//	IntelligentRoadTest.GridCanArr = null;
    IntelligentRoadTest.GridCanArrT = null;
    IntelligentRoadTest.GridCanArrM = null;
    IntelligentRoadTest.GridCanArrU = null;
    IntelligentRoadTest.CanArr = null;

    IntelligentRoadTest.GridCanArrT = [];
    IntelligentRoadTest.GridCanArrM = [];
    IntelligentRoadTest.GridCanArrU = [];
    IntelligentRoadTest.CanArr = [];

    var result=isNull(data.result)? [] : data.result;
    var length=data.columns.length-1;

    var rsrp_avg_sum = 0;//所含栅格XXX_RSRP_140_Sum之和
    var cnt_140_sum = 0;//所含栅格XXX_RSRP_140_Cnt之和
    var cnt_105_sum = 0;//所含栅格XXX_RSRP_105_Cnt之和
    var all_grid_count = 0;//所含总栅格个数
    var poor_grid_count = 0;//XXX_RSRP_140_Avg小于-105栅格个数
    var sh_sum = 0;//上行速率之和
    var xh_sum = 0;//下行速率之和
    var xh_cqi_sum = 0;//下行速率CQI
    var xh_rank_sum = 0;//下行速率Rank
    var all_sh_count=0;//上行速率有值的个数
    var all_xh_count=0;//下行速率有值的个数
    var xmr_sum = 0;//mod3,越区,覆盖XXMRNUM之和
    var mr_sum = 0;//MRNUM总数量之和
    var cov_sum = 0;//专题弱区数据之和
    var cdr2g_cnt_sum=0;//ec/io 2g栅格的记录数之和(过滤<=not_count的)
    var cdr2g_avg_sum=0;//ec/io 2g栅格的平均之和(过滤<=not_count的)
    var all_cdr2g_count=0;//ec/io 2g栅格的平均值的个数(过滤<=not_count的)
    var not_count=IntelligentRoadTest.gridInterval.notCount.value;//记录数<=XXX条，不参与计算
    for(var i=0;i<result.length;i++){
        var rowKey=result[i][0];
        var grid_num = rowKey.split("_")[2];// 栅格号
        var gridLngLatArray=gridLngLat(grid_num,20,100000);
        var maxLng = gridLngLatArray[4];// 最大经度
        var maxLat = gridLngLatArray[5];// 最大纬度
        var minLng = gridLngLatArray[0];// 最小经度
        var minLat = gridLngLatArray[1];// 最小纬度
        var longitude_mid = gridLngLatArray[2];// 中心经度
        var latitude_mid = gridLngLatArray[3];// 中心纬度

        var rsrp_avg = null;// rsrp均值 （覆盖质量的）
        var rsrp_attend= 0;//记录数≤3 （覆盖质量（共用）的）


        if(IntelligentRoadTest.gridBand.length==1){//主接入、最优、单个频段
            var reData=formatArray(result[i][1]).split("#");
            if(!isNull(reData[9])){//把小于等于3条记录数和rsrp均值为null过滤掉 不参与计算
                rsrp_avg = formatValue(reData[9]);// rsrp均值 _rsrp_140_avg
                rsrp_attend=parseFloat(formatValue(reData[0]));//栅格MR条数 _rsrp_140_cnt
                if(parseFloat(formatValue(reData[0]))>not_count){
                    rsrp_avg_sum += parseFloat(formatValue(reData[8])); // _RSRP_140_Sum
                    cnt_140_sum += parseFloat(formatValue(reData[0])); // _RSRP_140_Cnt
                    cnt_105_sum += parseInt(formatValue(reData[4])); // _RSRP_105_Cnt
                    if(parseFloat(reData[9]) <= -105){
                        poor_grid_count++;
                    }
                    all_grid_count++;
                }

            }
        }else if(IntelligentRoadTest.gridBand.length>1){//组合频段取最优rsrp
            // var flag1=false;//用于计算场景覆盖指标
            // var rsrp_avg1=null;
            var flag2=false;//用于计算记录数<=3
            var max_140_sum=null;
            var max_140_cnt=null;
            var max_105_cnt=null;
            for(var k=1;k<result[i].length;k++){
                var leng=result[i].length-1;
                if(IntelligentRoadTest.gridTypeIndex==3||IntelligentRoadTest.gridTypeIndex==4||IntelligentRoadTest.gridTypeIndex==5){
                    leng=result[i].length-2;
                }

                if(IntelligentRoadTest.gridTypeIndex!=0&&k==leng){//上、下行速率a16不需要做下面的逻辑 mod3和越区和重叠也不需要 ib1,ibX
                    break;
                }
                var reData=formatArray(result[i][k]).split("#");

                if(!isNull(reData[0])){
                    if(parseFloat(reData[0])>not_count){
                        if(!isNull(reData[9])){
                            if(!flag2){
                                rsrp_avg=reData[9];// rsrp均值
                                rsrp_attend=reData[0];// _RSRP_140_Cnt

                                max_140_sum=reData[8];// _RSRP_140_Sum
                                max_140_cnt=reData[0];// _RSRP_140_Cnt
                                max_105_cnt=reData[4];// _RSRP_105_Cnt
                                flag2=true;
                            }else{
                                if(parseFloat(reData[9])>parseFloat(rsrp_avg)){
                                    rsrp_avg=reData[9];// rsrp均值
                                    rsrp_attend=reData[0];// _RSRP_140_Cnt

                                    max_140_sum=reData[8];// _RSRP_140_Sum
                                    max_140_cnt=reData[0];// _RSRP_140_Cnt
                                    max_105_cnt=reData[4];// _RSRP_105_Cnt
                                }
                            }
                        }
                    }else{
                        rsrp_attend=reData[0];// _RSRP_140_Cnt
                    }

                }
                // rsrp_attend+=parseFloat(formatValue(reData[0]));
            }
            if(rsrp_avg!=0&&!isNull(rsrp_avg)&&parseFloat(formatValue(max_105_cnt))>not_count){//把小于等于3条记录数和rsrp均值为null过滤掉 不参与计算
                rsrp_avg_sum += parseFloat(formatValue(max_140_sum)); // _RSRP_140_Sum
                cnt_140_sum += parseFloat(formatValue(max_140_cnt)); // _RSRP_140_Cnt
                cnt_105_sum += parseInt(formatValue(max_105_cnt)); // _RSRP_105_Cnt
                if(parseFloat(rsrp_avg) <= -105){
                    poor_grid_count++;
                }
                all_grid_count++;
            }



        }
        //现在是分频段那种如果各个频段均达不到3条就是紫色，不分频段那种是如果合总达不到3条就是紫色
        //0-最小经度	1-最小纬度	2-最大经度	3-最小纬度	4-rsrp平均值/上行速率/下行速率/MR条数默认为3	5-栅格号  6-记录数<=n||记录数>n
        if(IntelligentRoadTest.gridTypeIndex==0){//覆盖质量
            var dataChe = [];
            if(rsrp_attend!=0&&!isNull(rsrp_attend)) {
                if (rsrp_avg != 0 && !isNull(rsrp_avg)) {
                    if (parseFloat(rsrp_attend) <= not_count) {
                        dataChe = [minLng, minLat, maxLng, maxLat, rsrp_avg, grid_num,"<=n"];
                    }else{
                        dataChe = [minLng, minLat, maxLng, maxLat, rsrp_avg, grid_num,">n"];
                    }
                }
                if (dataChe.length > 0) {
                    IntelligentRoadTest.CanArr.push(dataChe);
                }
            }
        }else if(IntelligentRoadTest.gridTypeIndex==1 || IntelligentRoadTest.gridTypeIndex==2){//上、下行速率
            var rate_sxh;//上/下行速率
            if(!isNull(result[i][length-1])){
                var rate_sh = result[i][length-1].split("#")[0];//MIN_USEREX_UPAVGRATE 最小用户体验上行平均速率(Mbps)
                var rate_xh = result[i][length-1].split("#")[1];//MIN_USEREX_DWAVGRATE 最小用户体验下行平均速率(Mbps)
                if(IntelligentRoadTest.gridTypeIndex==1){//上行速率
                    rate_sxh=rate_sh;
                }else if(IntelligentRoadTest.gridTypeIndex==2){//下行速率
                    rate_sxh=rate_xh;
                }
                //平均CQI   平均CQI：1.25
                var xhCqi=formatArray(result[i][length]).split("#")[1];
                var xhRank=formatArray(result[i][length]).split("#")[2];
                if(rsrp_attend!=0&&!isNull(rsrp_attend)&&parseFloat(rsrp_attend)>not_count){
                    sh_sum += parseFloat(formatValue(rate_sh));//上行速率
                    xh_sum += parseFloat(formatValue(rate_xh));//下行速率
                    xh_cqi_sum += parseFloat(formatValue(xhCqi));//下行速率平均CQI
                    xh_rank_sum += parseFloat(formatValue(xhRank));//下行速率平均CQI
                    if(!isNull(rate_sh)){
                        all_sh_count++
                    }
                    if(!isNull(rate_xh)){
                        all_xh_count++
                    }
                }
            }


            if(rsrp_attend!=0&&!isNull(rsrp_attend)) {
                var dataChe = [];
                if (!isNull(rate_sxh)) {
                    if (parseFloat(rsrp_attend) <= not_count) {
                        dataChe = [minLng,minLat,maxLng,maxLat,rate_sxh,grid_num,"<=n"];
                    }else{
                        dataChe = [minLng,minLat,maxLng,maxLat,rate_sxh,grid_num,">n"];
                    }
                }
                if (dataChe.length > 0) {
                    IntelligentRoadTest.CanArr.push(dataChe);
                }
            }

        }else if(IntelligentRoadTest.gridTypeIndex==3||IntelligentRoadTest.gridTypeIndex==4||IntelligentRoadTest.gridTypeIndex==5){//MOD3干扰 i:b2 越区覆盖 i:b4 重叠覆盖 i:b3
            var mr_num = formatArray(result[i][length-1]).split("#")[0];//MRNUM
            var xmr_num = formatArray(result[i][length]).split("#")[0];//XXMRNUM
            var mr_rat = formatArray(result[i][length]).split("#")[1];//MRMRRAT/OLMRRAT/CBMRRAT 模三干扰MR/重叠覆盖MR/越区覆盖MR的总数量占MR总数量的比率
            var is_x_grid = formatArray(result[i][length]).split("#")[2];//ISM3MR_GRID/ISOLMR_GRID/ISCBMR_GRID


            if(rsrp_attend!=0&&!isNull(rsrp_attend)&&parseFloat(rsrp_attend)>not_count){
                mr_sum += parseFloat(formatValue(mr_num));//MR的总数量
                xmr_sum += parseFloat(formatValue(xmr_num));//XXXXMR的总数量
                if(is_x_grid==1||is_x_grid=="1"){
                    cov_sum ++;// 是否是XXX覆盖的栅格
                }

            }
            if(rsrp_attend!=0&&!isNull(rsrp_attend)) {
                var dataChe = [];
                if (!isNull(mr_rat)||mr_rat==0) {
                    if (parseFloat(rsrp_attend) <= not_count) {
                        dataChe = [minLng,minLat,maxLng,maxLat,mr_rat,grid_num,"<=n"];
                    }else{
                        dataChe = [minLng,minLat,maxLng,maxLat,mr_rat,grid_num,">n"];
                    }
                }
                if (dataChe.length > 0) {
                    IntelligentRoadTest.CanArr.push(dataChe);
                }
            }
        }else if(IntelligentRoadTest.gridTypeIndex==6){//EC/IO
            var CDR_2G_STR_Cnt = formatArray(result[i][length]).split("#")[0];//CDR_2G_STR_Cnt
            var CDR_2G_STR_Avg = formatArray(result[i][length]).split("#")[1];//CDR_2G_STR_Avg
            if(CDR_2G_STR_Cnt!=0&&!isNull(CDR_2G_STR_Cnt)) {
                var dataChe = [];
                if (!isNull(CDR_2G_STR_Avg)) {
                    if (parseFloat(CDR_2G_STR_Cnt) <= not_count) {
                        dataChe = [minLng,minLat,maxLng,maxLat,CDR_2G_STR_Avg,grid_num,"<=n"];
                    } else {
                        dataChe = [minLng,minLat,maxLng,maxLat,CDR_2G_STR_Avg,grid_num,">n"];
                        //顺便计算CDR记录数:sum(CDR_2G_STR_Avg),EC/IO:avg(CDR_2G_STR_Avg)
                        cdr2g_cnt_sum+=parseFloat(formatValue(CDR_2G_STR_Cnt));//CDR_2G_STR_Cnt加总求和
                        cdr2g_avg_sum+=parseFloat(formatValue(CDR_2G_STR_Avg));//CDR_2G_STR_Avg加总求和
                        all_cdr2g_count++;
                    }
                }
                if (dataChe.length > 0) {
                    IntelligentRoadTest.CanArr.push(dataChe);
                }
            }
        }else if(IntelligentRoadTest.gridTypeIndex==7){//NB
            var NB_RSRP_140_Cnt = formatArray(result[i][length]).split("#")[0];//NB_RSRP_140_Cnt  NB-RSRP记录数
            var NB_RSRP_140_Sum = formatArray(result[i][length]).split("#")[1];//NB_RSRP_140_Sum  NB-RSRP之和
            var NB_RSRP_140_Avg = formatArray(result[i][length]).split("#")[2];//NB_RSRP_140_Avg  NB-RSRP均值
            var dataChe = [];
            if(rsrp_attend!=0&&!isNull(rsrp_attend)) {
                if (NB_RSRP_140_Avg != 0 && !isNull(NB_RSRP_140_Avg)) {
                    if(parseFloat(rsrp_attend) <= not_count){
                        dataChe = [minLng, minLat, maxLng, maxLat, NB_RSRP_140_Avg, grid_num,"<=n"];
                    }else{
                        dataChe = [minLng, minLat, maxLng, maxLat, NB_RSRP_140_Avg, grid_num,">n"];
                    }
                }

                if (dataChe.length > 0) {
                    IntelligentRoadTest.CanArr.push(dataChe);
                }
            }
        }
    }


    if(IntelligentRoadTest.gridTypeIndex==0||IntelligentRoadTest.gridTypeIndex==3||IntelligentRoadTest.gridTypeIndex==4||IntelligentRoadTest.gridTypeIndex==5){
        IntelligentRoadTest.zhibiao = IntelligentRoadTestSystemLayerV3.getGridName(IntelligentRoadTest.gridTypeIndex)["zhibiao"];
        IntelligentRoadTest.rsrpAvg = isNull(all_grid_count)? "null" : parseFloat(rsrp_avg_sum/cnt_140_sum).toFixed(2);//RSRP均值
        IntelligentRoadTest.coverRate = isNull(all_grid_count)? "null" : parseFloat(cnt_105_sum/cnt_140_sum*100).toFixed(2);//覆盖率
        if(IntelligentRoadTest.gridTypeIndex==0){
            IntelligentRoadTest.poorRate = isNull(all_grid_count)? "null" : parseFloat(poor_grid_count/all_grid_count*100).toFixed(2);//弱栅格占比
        }else{
            IntelligentRoadTest.mrRate = isNull(all_grid_count)? "null" : parseFloat(cov_sum/all_grid_count*100).toFixed(2);//MOD3/越区/重叠栅格占比
        }

    }else if(IntelligentRoadTest.gridTypeIndex==1){
        IntelligentRoadTest.zhibiao = getGridTypeName(IntelligentRoadTest.gridType)+" "+"平均上行速率"+"(Mbps)";
        IntelligentRoadTest.rsrpAvg = isNull(all_grid_count)? "null" : parseFloat(rsrp_avg_sum/cnt_140_sum).toFixed(2);//RSRP均值
        IntelligentRoadTest.shRate = isNull(all_sh_count)? "null" : parseFloat(sh_sum/all_sh_count).toFixed(2);//KPI感知上行速率
        IntelligentRoadTest.xhRate = isNull(all_xh_count)? "null" : parseFloat(xh_sum/all_xh_count).toFixed(2);//KPI感知下行速率
    }else if(IntelligentRoadTest.gridTypeIndex==2){
        IntelligentRoadTest.rsrpAvg = isNull(all_grid_count)? "null" : parseFloat(rsrp_avg_sum/cnt_140_sum).toFixed(2);//RSRP均值
        IntelligentRoadTest.zhibiao = getGridTypeName(IntelligentRoadTest.gridType)+" "+"平均下行速率"+"(Mbps)";
        IntelligentRoadTest.shRate = isNull(all_sh_count)? "null" : parseFloat(sh_sum/all_sh_count).toFixed(2);//KPI感知上行速率
        IntelligentRoadTest.xhRate = isNull(all_xh_count)? "null" : parseFloat(xh_sum/all_xh_count).toFixed(2);//KPI感知下行速率
        IntelligentRoadTest.xhCqi = isNull(all_xh_count)? "null" : parseFloat(xh_cqi_sum/all_xh_count).toFixed(2);//KPI感知下行速率平均CQI
        IntelligentRoadTest.xhRank = isNull(all_xh_count)? "null" : parseFloat(xh_rank_sum/all_xh_count).toFixed(2);//KPI感知下行速率平均Rank
    }else if(IntelligentRoadTest.gridTypeIndex==6){
        IntelligentRoadTest.zhibiao = "全量MR"+" "+"EC/IO";
        IntelligentRoadTest.cdr2g = isNull(cdr2g_cnt_sum)? "null" : cdr2g_cnt_sum;//CDR记录数
        IntelligentRoadTest.ecio2g = isNull(all_cdr2g_count)? "null" : parseFloat(cdr2g_avg_sum/all_cdr2g_count).toFixed(2);//EC/IO的平均值
    }else if(IntelligentRoadTest.gridTypeIndex==7){
        IntelligentRoadTest.zhibiao = IntelligentRoadTestSystemLayerV3.getGridName(IntelligentRoadTest.gridTypeIndex)["zhibiao"];
    }

    if(!IntelligentRoadTest.isThreeNetStatus){
        var CTData = IntelligentRoadTest.CanArr;
        var colorBarArr=IntelligentRoadTest.colorBarArr;
        if(IntelligentRoadTest.gridTypeIndex==1){
            colorBarArr=IntelligentRoadTest.colorBarArrSH;
        }else if(IntelligentRoadTest.gridTypeIndex==2){
            colorBarArr=IntelligentRoadTest.colorBarArrXH;
        }else if(IntelligentRoadTest.gridTypeIndex==3){
            colorBarArr=IntelligentRoadTest.colorBarArrM3;
        }else if(IntelligentRoadTest.gridTypeIndex==4){
            colorBarArr=IntelligentRoadTest.colorBarArrYQ;
        }else if(IntelligentRoadTest.gridTypeIndex==5){
            colorBarArr=IntelligentRoadTest.colorBarArrCD;
        }else if(IntelligentRoadTest.gridTypeIndex==6){
            colorBarArr=IntelligentRoadTest.colorBarArrEC;
        }else if(IntelligentRoadTest.gridTypeIndex==7){
            colorBarArr=IntelligentRoadTest.colorBarArrNB;
        }
        for(var j=0;j<colorBarArr.length;j++){
            CTData = IntelligentRoadTest.ClearData(CTData,colorBarArr[j]);
        }
        IntelligentRoadTest.GridMap.draw(CTData);
        CTData = null;
    }
    data=null;
    IntelligentRoadTest.legendGrid();

    IntelligentRoadTest.openThreeLable();
    IntelligentRoadTest.currentLayerNum+=1;
}



//渲染扇区的栅格（取4.30表数据）
/**********************************
 * @funcname IntelligentRoadTest.showSectorGridByCanv
 * @funcdesc //渲染扇区的栅格(4.30)
 * @param {Object} data (input optional) 通过hbase查询出来的4.30栅格数据
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.showSectorGridByCanv=function IntelligentRoadTestSystemLayerV3_showSectorGridByCanv(data){
    IntelligentRoadTest.gridDataV2=data;
    IntelligentRoadTest.GridMap.setThresholds(IntelligentRoadTest.gridThresholds);
    IntelligentRoadTest.GridMapM.setThresholds(IntelligentRoadTest.gridThresholds);
    IntelligentRoadTest.GridMapU.setThresholds(IntelligentRoadTest.gridThresholds);

    var result=isNull(data.result)? [] : data.result;
	data = null;
    IntelligentRoadTest.GridMap.clear();
    IntelligentRoadTest.GridMapM.clear();
    IntelligentRoadTest.GridMapU.clear();
    IntelligentRoadTest.isShowGrid = true;
    IntelligentRoadTest.isShowDTGrid = false;
    //清除描点数据
//	IntelligentRoadTest.GridMapCircle.clear();
    IntelligentRoadTest.GridMapCircleDataArr = null;
    IntelligentRoadTest.GridMapCircleDataArr = [];



//	IntelligentRoadTest.GridCanArr = [];
//	IntelligentRoadTest.GridCanArr = null;
    IntelligentRoadTest.GridCanArrT = null;
    IntelligentRoadTest.GridCanArrM = null;
    IntelligentRoadTest.GridCanArrU = null;
    IntelligentRoadTest.CanArr = null;

    IntelligentRoadTest.GridCanArrT = [];
    IntelligentRoadTest.GridCanArrM = [];
    IntelligentRoadTest.GridCanArrU = [];
    IntelligentRoadTest.CanArr = [];


    var sectorType="sector";//扇区类型
    var rsrp_avg_sum = 0;//所含栅格XXX_RSRP_140_Sum之和
    var cnt_140_sum = 0;//所含栅格XXX_RSRP_140_Cnt之和
    var cnt_105_sum = 0;//所含栅格XXX_RSRP_105_Cnt之和
    var all_grid_count = 0;//所含总栅格个数
    var poor_grid_count = 0;//XXX_RSRP_140_Avg小于-105栅格个数
    var xmr_sum = 0;//mod3,越区,覆盖XXMRNUM之和
    var mr_sum = 0;//MRNUM总数量之和
    var cov_sum = 0;//专题扇区数据之和
    var sh_sum = 0;//上行速率之和
    var xh_sum = 0;//下行速率之和
    var xh_cqi_sum = 0;//下行速率CQI
    var xh_rank_sum = 0;//下行速率Rank
    var all_sh_count=0;//上行速率有值的个数
    var all_xh_count=0;//下行速率有值的个数
    var not_count=IntelligentRoadTest.gridInterval.notCount.value;//记录数<=XXX条，不参与计算
    var cloumn=2;
    if(IntelligentRoadTest.gridTypeIndex==3){//MOD3 i：a6
        cloumn=4;
        sectorType="m3Sector";
    }else if(IntelligentRoadTest.gridTypeIndex==4){//越区 i：a4
        cloumn=2;
        sectorType="cbSector";
    }else if(IntelligentRoadTest.gridTypeIndex==5){//重叠 i：a5
        cloumn=3;
        sectorType="olSector";
    }else if (IntelligentRoadTest.gridTypeIndex==2){//下行 i:a7
        cloumn = 5;
    }else if(IntelligentRoadTest.gridTypeIndex==7){//NB  i:b8
        cloumn = 6;
    }
    for(var i=0;i<result.length;i++){
        var rowKey=result[i][0];
		var ia2Result=formatArray(result[i][1]).split("#");
        var ia3Result=formatArray(result[i][cloumn]).split("#");
		//根据栅格号获取最大最小、中心经纬度
		var grid_num = rowKey.split("_")[4];// 栅格号
		var gridLngLatArray=gridLngLat(grid_num,20,100000);
        var maxLng = gridLngLatArray[4];// 最大经度
        var maxLat = gridLngLatArray[5];// 最大纬度
        var minLng = gridLngLatArray[0];// 最小经度
        var minLat = gridLngLatArray[1];// 最小纬度
        var rsrp_avg = !isNull(ia2Result) ? ia2Result[9] : null;// rsrp均值
        var rsrp_attend = !isNull(ia2Result) ? ia2Result[0] : null;// 电信RSRP[-140，0)记录数
        var rsrp_105_cnt = !isNull(ia2Result) ? ia2Result[4] : null;// 电信RSRP[-105，0)记录数
        var rsrp_cover=null;// 覆盖率
        if(!isNull(rsrp_105_cnt)&&!isNull(rsrp_attend)){
            rsrp_cover=rsrp_105_cnt/rsrp_attend;//覆盖率 sc_rsrp_105_cnt/sc_rsrp_140_cnt
        }

        if(rsrp_avg!=0&&!isNull(rsrp_avg)&&parseFloat(formatValue(rsrp_attend))>not_count){
            rsrp_avg_sum += parseFloat(formatValue(ia2Result[8])); // _RSRP_140_Sum
            cnt_140_sum += parseFloat(formatValue(rsrp_attend)); // _RSRP_140_Cnt
            cnt_105_sum += parseInt(formatValue(rsrp_105_cnt)); // _RSRP_105_Cnt
            if(parseFloat(rsrp_avg) <= -105){
                poor_grid_count++;
            }
            all_grid_count++;
        }
        if(IntelligentRoadTest.gridTypeIndex==0){
            //0-最小经度 1-最小纬度 2—最大经度 3-最大纬度 4-rsrp均值/电信RSRP[-140，0)记录数 5-栅格号 6-记录数<=n||记录数>n 7-电信RSRP[-105，0)记录数 8-电信RSRP[-140，0)记录数 9-覆盖率（6/7） 10-rsrp均值
            var dataChe = [];
            if(rsrp_attend!=0&&!isNull(rsrp_attend)){
                if(!isNull(rsrp_avg)){
                    if(parseFloat(rsrp_attend)<=not_count){//_RSRP_140_Cnt记录数<=3
                        dataChe = [minLng,minLat,maxLng,maxLat,rsrp_avg,grid_num,"<=n",rsrp_105_cnt,rsrp_attend,rsrp_cover,rsrp_avg];
                    }else{
                        dataChe = [minLng,minLat,maxLng,maxLat,rsrp_avg,grid_num,">n",rsrp_105_cnt,rsrp_attend,rsrp_cover,rsrp_avg];
                    }
                }
                if(dataChe.length>0){
                    IntelligentRoadTest.CanArr.push(dataChe);
                }
            }
        }else if(IntelligentRoadTest.gridTypeIndex==3||IntelligentRoadTest.gridTypeIndex==4||IntelligentRoadTest.gridTypeIndex==5){//MOD3干扰 i:b2 越区覆盖 i:b4 重叠覆盖 i:b3
            // var mr_num = ia3Result[0];//MRNUM===>使用_RSRP_140_Cnt代替
            var xmr_num = ia3Result[0];//XXMRNUM
            var mr_rat = ia3Result[1];//MRMRRAT/OLMRRAT/CBMRRAT 模三干扰MR/重叠覆盖MR/越区覆盖MR的总数量占MR总数量的比率
            var is_x_grid = ia3Result[2];;//ISM3MR_GRID/ISOLMR_GRID/ISCBMR_GRID

            if(rsrp_attend!=0&&!isNull(rsrp_attend)&&parseFloat(rsrp_attend)>not_count){
                // mr_sum += parseFloat(formatValue(mr_num));//MR的总数量 ====>cnt_140_sum代替
                xmr_sum += parseFloat(formatValue(xmr_num));//XXXXMR的总数量
                if(is_x_grid==1||is_x_grid=="1"){
                    cov_sum ++;// 是否是XXX覆盖的栅格
                }
            }
            if(rsrp_attend!=0&&!isNull(rsrp_attend)) {
                var dataChe = [];
                if (!isNull(mr_rat)) {
                    if (parseFloat(rsrp_attend) <= not_count) {//过滤_RSRP_140_Cnt<=3的值
                        dataChe = [minLng,minLat,maxLng,maxLat,mr_rat,grid_num,"<=n"];
                    } else{
                        dataChe = [minLng,minLat,maxLng,maxLat,mr_rat,grid_num,,">n",rsrp_105_cnt,rsrp_attend,rsrp_cover,rsrp_avg];
                    }
                }
                if (dataChe.length > 0) {
                    IntelligentRoadTest.CanArr.push(dataChe);
                }
            }
        }else if(IntelligentRoadTest.gridTypeIndex==2){//下行速率
            var rate_sxh;//上/下行速率
            // var rate_sh = 0;//MIN_USEREX_UPAVGRATE 最小用户体验上行平均速率(Mbps)
            var rate_xh = ia3Result[3];//MIN_USEREX_DWAVGRATE 最小用户体验下行平均速率(Mbps)
            /*if(IntelligentRoadTest.gridTypeIndex==1){//上行速率
                rate_sxh=rate_sh;
            }else if(IntelligentRoadTest.gridTypeIndex==2){*///下行速率
            rate_sxh=rate_xh;
            // }
            //平均CQI   平均CQI：1.25
            var xhCqi=ia3Result[1];//MR_CQI_AVG MRCQI均值
            var xhRank=ia3Result[2];//MR_Rank_AVG MRRank均值
            if(rsrp_attend!=0&&!isNull(rsrp_attend)&&parseFloat(rsrp_attend)>not_count){
                // sh_sum += parseFloat(formatValue(rate_sh));//上行速率
                xh_sum += parseFloat(formatValue(rate_xh));//下行速率
                xh_cqi_sum += parseFloat(formatValue(xhCqi));//下行速率平均CQI
                xh_rank_sum += parseFloat(formatValue(xhRank));//下行速率平均CQI
                /*if(!isNull(rate_sh)){
                    all_sh_count++
                }*/
                if(!isNull(rate_xh)){
                    all_xh_count++
                }
            }

            if(rsrp_attend!=0&&!isNull(rsrp_attend)) {
                var dataChe = [];
                if (!isNull(rate_sxh)) {
                    if (parseFloat(rsrp_attend) <= not_count) {
                        dataChe = [minLng,minLat,maxLng,maxLat,rate_sxh,grid_num,"<=n"];
                    }else{
                        dataChe = [minLng,minLat,maxLng,maxLat,rate_sxh,grid_num,">n"];
                    }

                }
                if (dataChe.length > 0) {
                    IntelligentRoadTest.CanArr.push(dataChe);
                }
            }

        }else if(IntelligentRoadTest.gridTypeIndex==7){//NB栅格
            var NB_RSRP_140_Cnt = ia3Result[0];//NB_RSRP_140_Cnt  NB-RSRP记录数
            var NB_RSRP_140_Sum = ia3Result[1];//NB_RSRP_140_Sum  NB-RSRP之和
            var NB_RSRP_140_Avg = ia3Result[2];//NB_RSRP_140_Avg  NB-RSRP均值
            var dataChe = [];
            if(rsrp_attend!=0&&!isNull(rsrp_attend)) {
                if (NB_RSRP_140_Avg != 0 && !isNull(NB_RSRP_140_Avg)) {
                    if(parseFloat(rsrp_attend) <= not_count){
                        dataChe = [minLng, minLat, maxLng, maxLat, NB_RSRP_140_Avg, grid_num,"<=n"];
                    }else{
                        dataChe = [minLng, minLat, maxLng, maxLat, NB_RSRP_140_Avg, grid_num,">n"];
                    }
                }

                if (dataChe.length > 0) {
                    IntelligentRoadTest.CanArr.push(dataChe);
                }
            }
        }

    }

    IntelligentRoadTest.rsrpAvg = isNull(all_grid_count)? "null" : parseFloat(rsrp_avg_sum/cnt_140_sum).toFixed(2);//RSRP均值
    IntelligentRoadTest.coverRate = isNull(all_grid_count)? "null" : parseFloat(cnt_105_sum/cnt_140_sum*100).toFixed(2);//覆盖率
    IntelligentRoadTest.zhibiao = IntelligentRoadTestSystemLayerV3.getGridName(IntelligentRoadTest.gridTypeIndex)["zhibiao"];
    IntelligentRoadTest.poorRate = isNull(all_grid_count)? "null" : parseFloat(poor_grid_count/all_grid_count*100).toFixed(2);//弱栅格占比
    if(IntelligentRoadTest.gridTypeIndex==0){
        // IntelligentRoadTest.poorRate = isNull(all_grid_count)? "null" : parseFloat(poor_grid_count/all_grid_count*100).toFixed(2);//弱栅格占比
    }else if(IntelligentRoadTest.gridTypeIndex==2){//下行速率
        // IntelligentRoadTest.rsrpAvg = isNull(all_grid_count)? "null" : parseFloat(rsrp_avg_sum/cnt_140_sum).toFixed(2);//RSRP均值
        // IntelligentRoadTest.shRate = isNull(all_sh_count)? "null" : parseFloat(sh_sum/all_sh_count).toFixed(2);//KPI感知上行速率
        IntelligentRoadTest.xhRate = isNull(all_xh_count)? "null" : parseFloat(xh_sum/all_xh_count).toFixed(2);//KPI感知下行速率
        IntelligentRoadTest.xhCqi = isNull(all_xh_count)? "null" : parseFloat(xh_cqi_sum/all_xh_count).toFixed(2);//KPI感知下行速率平均CQI
        IntelligentRoadTest.xhRank = isNull(all_xh_count)? "null" : parseFloat(xh_rank_sum/all_xh_count).toFixed(2);//KPI感知下行速率平均Rank
    }else{
        IntelligentRoadTest.mrRate = isNull(all_grid_count)? "null" : parseFloat(cov_sum/all_grid_count*100).toFixed(2);//MOD3/越区/重叠栅格占比
    }


	//根据栅格类型过滤
    var CTData = IntelligentRoadTest.CanArr;
    var colorBarArr=IntelligentRoadTest.colorBarArr;
    if(IntelligentRoadTest.gridTypeIndex==3){
        colorBarArr=IntelligentRoadTest.colorBarArrM3;
    }else if(IntelligentRoadTest.gridTypeIndex==4){
        colorBarArr=IntelligentRoadTest.colorBarArrYQ;
    }else if(IntelligentRoadTest.gridTypeIndex==5){
        colorBarArr=IntelligentRoadTest.colorBarArrCD;
    }else if(IntelligentRoadTest.gridTypeIndex==2){
        colorBarArr=IntelligentRoadTest.colorBarArrXH;
    }else if(IntelligentRoadTest.gridTypeIndex==7){
        colorBarArr=IntelligentRoadTest.colorBarArrNB;
    }
	for(var j=0;j<colorBarArr.length;j++){
		CTData = IntelligentRoadTest.ClearData(CTData,colorBarArr[j]);
	}
	IntelligentRoadTest.GridMap.draw(CTData);
	CTData = null;
   
    IntelligentRoadTest.legendGrid();//图例的变化情况

    IntelligentRoadTest.openThreeLable();//加载栅格后在弹框中呈现栅格的指标情况
    IntelligentRoadTest.currentLayerNum+=1;

    IntelligentRoadTest.setChangealbeDataObj(sectorType);//设置扇区详情页中根据图层配置变化而变化的指标的对象（加载栅格之后调用）
}



/*ID解析规则

PC_ID: 地市ID_区县ID_营服ID_中心栅格编号
//level=10时len=1000000
//level=100时len=100000(除了10的栅格，其它的栅格都是用len=100000)
//栅格号转经纬度*/
function gridLngLat(gridNum, level,len) {

    // 经度编号=(经度-109.456006485399)/(0.00000972*级别)+1001（向下取整）
    // 纬度编号=(纬度-20.1297900884702)/(0.00000896*级别)+1001（向下取整）
    // 网格编号=经度编号*100000+纬度编号
    //
    // 最小经度=(经度编号-1001)*(0.00000972*级别)+109.456006485399
    // 最小纬度=(经度编号-1001)*(0.00000896*级别)+20.1297900884702
    //
    // 中心经度=最小经度+(0.00000972*级别)/2
    // 中心纬度=最小纬度+(0.00000896*级别)/2
    //
    // 最大经度=最小经度+(0.00000972*级别)
    // 最大纬度=最小纬度+(0.00000896*级别)
    var lngNum = Math.floor(gridNum / len);
    var latNum = gridNum % len;
    var minLat = (latNum - 1001) * (0.00000896 * level) + 20.1297900884702;
    var minLng = (lngNum - 1001) * (0.00000972 * level) + 109.456006485399;
    var midLat = minLat + (0.00000896 * level) / 2;
    var midLng = minLng + (0.00000972 * level) / 2;
    var maxLat = minLat + (0.00000896 * level);
    var maxLng = minLng + (0.00000972 * level);
    return [minLng, minLat, midLng, midLat, maxLng, maxLat];
}


//过滤三网框选区域栅格(4.21)
/**********************************
 * @funcname IntelligentRoadTest.filterThreeGridData
 * @funcdesc //过滤三网框选区域栅格(4.21)
 * @param {Object} data (input optional) 通过hbase查询出来的4.21栅格数据
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.filterThreeGridData = function IntelligentRoadTestSystemLayerV3_filterThreeGridData(data){
	IntelligentRoadTest.gridThreeData=data; 
	var result = data.result;
	 var polygonGridData = [];
	 //将不在框选多边形内的栅格去掉
    if(IntelligentRoadTest.SelectionOverlay!=null){
		for(var i=0;i<result.length;i++){
			var gridMidLng = result[i][3];
            var gridMidLat = result[i][4];
			var point = new BMap.Point(gridMidLng,gridMidLat);
			if(BMapLib.GeoUtils.isPointInPolygon(point, IntelligentRoadTest.SelectionOverlay)){
				polygonGridData.push(result[i]);
			}
			
		}
	}
    data.result = polygonGridData;

    IntelligentRoadTestSystemLayerV3.showThreeGridByCanv(data);//渲染栅格
	
}



//过滤框选区域栅格用于展示列表(4.29)
/**********************************
 * @funcname IntelligentRoadTest.filterAreaGridData
 * @funcdesc //过滤框选区域栅格用于展示列表，同时计算出框选的总栅格数量以及弱栅格数量(4.29)
 * @param {Object} data (input optional) 通过hbase查询出来的4.29栅格数据
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.filterAreaGridData = function IntelligentRoadTestSystemLayerV3_filterAreaGridData(data){
	IntelligentRoadTest.gridDataV2=data;
	var result = data.result;
	var polygonGridData = [];
    var not_count=IntelligentRoadTest.gridInterval.notCount.value;//记录数<=XXX条，不参与计算
	//将不在框选多边形内的栅格去掉
    if(IntelligentRoadTest.SelectionOverlay!=null){
        var rsrp_avg_sum = 0;//所含栅格XXX_RSRP_140_Sum之和
        var cnt_140_sum = 0;//所含栅格XXX_RSRP_140_Cnt之和
        var cnt_105_sum = 0;//所含栅格XXX_RSRP_105_Cnt之和
        var all_grid_count = 0;//所含总栅格个数
        var poor_grid_count = 0;//XXX_RSRP_140_Avg小于-105栅格个数
        // var avgSum=0;
		for(var i=0;i<result.length;i++){
            var rowKey=result[i][0];
            var gridLngLatArray=gridLngLat(rowKey.split("_")[2],20,100000);
			var gridMidLng = gridLngLatArray[2];
			var gridMidLat = gridLngLatArray[3];
			var point = new BMap.Point(gridMidLng,gridMidLat);
			if(BMapLib.GeoUtils.isPointInPolygon(point, IntelligentRoadTest.SelectionOverlay)){
				polygonGridData.push(result[i]);
                if(IntelligentRoadTest.gridBand.length==1){//主接入、最优、单个频段
                    if(!isNull(result[i][1])){
                        var reData=result[i][1].split("#");
                        if(parseFloat(formatValue(reData[0]))>not_count&&!isNull(reData[9])){
                            all_grid_count++;
                            // avgSum += parseFloat(formatValue(reData[9])); // _RSRP_140_Avg
                            cnt_140_sum += parseFloat(formatValue(reData[0])); // _RSRP_140_Cnt
                            cnt_105_sum += parseInt(formatValue(reData[4])); // _RSRP_105_Cnt
                            rsrp_avg_sum += parseFloat(formatValue(reData[8])); // _RSRP_140_Sum
                            if(parseFloat(reData[9]) <= -105){
                                poor_grid_count++;
                            }
                        }
                    }
                }else if(IntelligentRoadTest.gridBand.length>1){//组合频段取最优rsrp
                    var flag=false;
                    var maxAvg=null;
                    var maxAll=null;
                    var maxCnt=null;
                    var maxSum=null;
                    for(var k=1;k<result[i].length;k++){
                        if(IntelligentRoadTest.gridTypeIndex!=0&&k==result[i].length-1){
                            break;
                        }
                        var reData=formatArray(result[i][k]).split("#");
                        if(!isNull(reData[9])&&parseFloat(formatValue(reData[0]))>not_count){
                            if(!flag){
                                maxAvg=parseFloat(formatValue(reData[9]));// rsrp均值
                                maxAll=parseFloat(formatValue(reData[0]));//140记录数
                                maxCnt=parseFloat(formatValue(reData[4]));//105记录数
                                maxSum=parseFloat(formatValue(reData[8]));//140总数
                                flag=true;
                            }else{
                                if(parseFloat(reData[9])>maxAvg){
                                    maxAvg=parseFloat(formatValue(reData[9]));// rsrp均值
                                    maxAll=parseFloat(formatValue(reData[0]));//140记录数
                                    maxCnt=parseFloat(formatValue(reData[4]));//105记录数
                                    maxSum=parseFloat(formatValue(reData[8]));//140总数
                                }
                            }
                        }
                    }
                    if(maxAvg!=null){
                        // avgSum += maxAvg; // _RSRP_140_Avg
                        cnt_140_sum += maxAll; // _RSRP_140_Cnt
                        cnt_105_sum += maxCnt; // _RSRP_105_Cnt
                        rsrp_avg_sum += maxSum; // _RSRP_140_Sum
                        if(maxAvg <= -105){
                            poor_grid_count++;
                        }
                        all_grid_count++;
                    }
                }
			}
		}

		var rsrpAvg = rsrp_avg_sum/cnt_140_sum;//RSRP均值
        var cover = cnt_105_sum/cnt_140_sum;//覆盖率
		if(all_grid_count==0||cnt_140_sum==0){
            rsrpAvg = null;
            cover = null;
        }
		IntelligentRoadTest.SelectionOverlay.type = "boxSelect";
        IntelligentRoadTest.SelectionOverlay.rsrpAvg = rsrpAvg;//parseFloat(rsrpAvg).toFixed(2);
        IntelligentRoadTest.SelectionOverlay.cover = cover;//parseFloat(cover).toFixed(4);
        IntelligentRoadTest.SelectionOverlay.count = all_grid_count;
		
        IntelligentRoadTest.SelectionOverlay.gridCount = all_grid_count;//框选栅格总数量
        IntelligentRoadTest.SelectionOverlay.poor_grid_count = poor_grid_count;//弱栅格数据
	}

	IntelligentRoadTest.goBoxSelection(IntelligentRoadTest.SelectionOverlay.cover ,IntelligentRoadTest.SelectionOverlay.rsrpAvg ,IntelligentRoadTest.SelectionOverlay.poor_grid_count,all_grid_count);
    if(!IntelligentRoadTest.isThreeNetStatus){
        /*var oldData=IntelligentRoadTestSystemLayerV3.formatData(polygonGridData);
        var newdata=IntelligentRoadTestSystemLayerV3.gridResultGroupByGridNumV2(oldData);*/
        data.result=polygonGridData;
        IntelligentRoadTestSystemLayerV3.showGridByCanv2(data);
        //判断是否需要赋值2G指标
        if(IntelligentRoadTest.gridTypeIndex==6){
            $("#ec_io").text(IntelligentRoadTest.ecio2g);
            $("#cdrCount").text(IntelligentRoadTest.cdr2g);
            //隐藏4G指标,显示2G指标
            $("#2GZhiBiao").show();
            $("#4GZhiBiao").hide();
        }else{
            //显示4G指标,隐藏2G指标
            $("#2GZhiBiao").hide();
            $("#4GZhiBiao").show();
        }
    }else{
        IntelligentRoadTest.currentLayerNum +=1;
    }
    data = null;
    if(IntelligentRoadTest.selectBoxMarker!=null){
        IntelligentRoadTest.selectBoxMarker.show();
    }
}


//查询三网框选区域栅格的数据（4.21） 拼接sql
/**********************************
 * @funcname IntelligentRoadTest.loadThreeBoxGrid
 * @funcdesc //拼接三网状态下框选多边形的sql提交查询(4.21)
 * @param {String} maxlng_maxlat_minlng_minlat (input optional) 多边形的最大最小经纬度
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.loadThreeBoxGrid = function IntelligentRoadTestSystemLayerV3_loadThreeBoxGrid(maxlng_maxlat_minlng_minlat){
	var keyprefix=getPreMonth(IntelligentRoadTest.day)+"_"+"20_";
	var cloumnsList = "i:a1,i:a9,i:a10,i:a11,i:a12,i:a13,i:a14,i:a15,i:a16,i:a19,i:a23,i:a24,i:a27,i:a30,i:a34,i:a35,i:a38,i:a41,i:a45,i:a46";
	var list1 = ["IntelligentRoadTestV2_getThreeGridData","TABLENAME:"+"NOCE:DSI_AGPS_GRID_RSRP_M","GRIDKEYPREFIX:"+keyprefix,"POLYGONCONTOUR:"+IntelligentRoadTest.polygonContour,"COLUMNLIST:"+cloumnsList];;
	IntelligentRoadTest.maxlng_maxlat_minlng_minlatThree=maxlng_maxlat_minlng_minlat+getPreMonth(IntelligentRoadTest.day);
    return {"progressBarSqls":list1,"functionlist":IntelligentRoadTestSystemLayerV3.filterThreeGridData,"dataBase":7};
}

//查询框选区域栅格的数据（4.29） 拼接sql
/**********************************
 * @funcname IntelligentRoadTest.loadAreaBoxGrid
 * @funcdesc //拼接框选多边形的sql(4.29)
 * @param {String} maxlng_maxlat_minlng_minlat (input optional) 多边形的最大最小经纬度
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.loadAreaBoxGrid = function IntelligentRoadTestSystemLayerV3_loadAreaBoxGrid(maxlng_maxlat_minlng_minlat){
	   //栅格覆盖频段
    var gridBand=IntelligentRoadTest.gridBand;
    var tableName=(IntelligentRoadTest.gridTime=="week") ? "DSI_MRO_ALL_GRID_TOT_W" : "DSI_MRO_ALL_GRID_TOT_D";
    var type=IntelligentRoadTest.gridType;
    if(IntelligentRoadTest.gridTypeIndex==6){
        type=0;
    }
    var keyprefix=getddmm(IntelligentRoadTest.day)+"_"+type+"_";
    var cloumnsList = IntelligentRoadTestSystemLayerV3.getCloumnsList();
    var list2 =["IntelligentRoadTestV2_getGridDataV2","TABLENAME:NOCE:"+tableName,"GRIDKEYPREFIX:"+keyprefix,"GRIDLEVEL:20",
    	"POLYGONCONTOUR:"+IntelligentRoadTest.polygonContour,"COLUMNLIST:"+cloumnsList,"PARTITIONMOD:"+" "];//partitionmod 1
    IntelligentRoadTest.maxlng_maxlat_minlng_minlat = maxlng_maxlat_minlng_minlat + IntelligentRoadTest.day +IntelligentRoadTest.gridType+cloumnsList+IntelligentRoadTest.gridTime;
    return {"progressBarSqls":list2,"functionlist":IntelligentRoadTestSystemLayerV3.filterAreaGridData,"dataBase":7};
}

/**********************************
 * @funcname IntelligentRoadTest.initLegendGrid
 * @funcdesc //同步图例的面板 初始化图层图例的颜色和需要过滤的区间
 * @param {null}
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.initLegendGrid = function IntelligentRoadTestSystemLayerV3_initLegendGrid(){
    if($('.lineTable').css('display')=='none'){//线段图层是否隐藏
        IntelligentRoadTest.gridIntervalKey=IntelligentRoadTestGridLegend.getGridIntervalKey(IntelligentRoadTest.gridTypeIndex,"grid");
        var gridInterval=IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey];//获取对应栅格类型的指标区间
        IntelligentRoadTest.gridInterval=gridInterval;
        //1 面板的同步
        var gridconditions=IntelligentRoadTest.gridBandIndex+"|"+IntelligentRoadTest.gridBand+"|"+IntelligentRoadTest.gridType+"|"+IntelligentRoadTest.gridTime+"|"+IntelligentRoadTest.gridTypeIndex
        $('.legendTitle .gridBoxSelectionUl li').removeClass("active");
        $('.legendTitle .gridBoxSelectionUl li[data-gridconditions="'+gridconditions+'"]').addClass("active").siblings().removeClass("active");

        var textValue=$('.legendTitle .gridBoxSelectionUl li[data-gridconditions="'+gridconditions+'"]').text();
        if(isNull(textValue)){
            textValue=$('.gridFieldset2 input[name="grid-type"][value="'+IntelligentRoadTest.gridTypeIndex+'"]').siblings('label').text();
        }else{
            textValue=textValue.split(" ")[1];
        }
        $(".slideLegend .scale-text").text(textValue);
        //2 颜色 记录数 区间
        var num = $('.gridFieldset2 input[name="grid-type"][value="'+IntelligentRoadTest.gridTypeIndex+'"]').parent().index();
        clearColorBarArr("area");
        $('.gridFieldSetInfo .gridTypeDiv:eq('+num+') input[name="legend-grid"]').each(function() {
            var index=$('.gridFieldSetInfo .gridTypeDiv:eq('+num+') input[name="legend-grid"]').index($(this));
            var bgColor=$(this).next().css('background-color');
            var $legen=null;
            if(index==5){//记录数
                $legen=$(".colorLegend .level_6");
                $(".colorLegend .recordNum").text(gridInterval.notCount.value);
                //同步图例记录数
            }else if(index==6){//脱网
                $legen=$(".level_7");
                $legen.css('background-color',bgColor);//同步图例颜色
            }else{//优/良/中/差/极差
                $legen=$(".colorLegendUl").children('.map-w-i').eq(index);
                $legen.css('background-color',bgColor);//同步图例颜色
            }
            var id = $legen.attr("id");
            if($(this).is(':checked')){
                if(id=='level_6'){
                    $("#showRecordCheckbox").prop("checked",true);
                }else{
                    if($legen.hasClass("grey")){//判断该图例颜色是否为灰
                        //灰色的时候，移除grey类，呈现栅格
                        $legen.removeClass("grey");
                    }
                }

                //目前只有高铁有[脱网]功能
                if(id.split("_")[1]==7){
                    return true;//结束本次循环
                }
                removeColorBarArrId(id.split("_")[1]);
                /*if(IntelligentRoadTest.gridTypeIndex==0){//覆盖质量
                    IntelligentRoadTest.colorBarArr = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArr,id.split("_")[1]);
                }else if(IntelligentRoadTest.gridTypeIndex==1){//上行速率
                    IntelligentRoadTest.colorBarArrSH = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrSH,id.split("_")[1]);
                }else if(IntelligentRoadTest.gridTypeIndex==2){//下行速率
                    IntelligentRoadTest.colorBarArrXH = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrXH,id.split("_")[1]);
                }else if(IntelligentRoadTest.gridTypeIndex==3){//MOD3干扰
                    IntelligentRoadTest.colorBarArrM3 = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrM3,id.split("_")[1]);
                }else if(IntelligentRoadTest.gridTypeIndex==4){//越区覆盖
                    IntelligentRoadTest.colorBarArrYQ = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrYQ,id.split("_")[1]);
                }else if(IntelligentRoadTest.gridTypeIndex==5){//重叠覆盖
                    IntelligentRoadTest.colorBarArrCD = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrCD,id.split("_")[1]);
                }else if(IntelligentRoadTest.gridTypeIndex==6){//EC/IO
                    IntelligentRoadTest.colorBarArrEC = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrEC,id.split("_")[1]);
                }*/
            }else{
                if(id=='level_6'){
                    $("#showRecordCheckbox").prop("checked",false);
                }else{
                    if(!$legen.hasClass("grey")){//判断该图例颜色是否为灰
                        //呈现该图例栅格
                        $legen.addClass("grey");
                    }
                }
                //目前只有高铁有[脱网]功能
                if(id.split("_")[1]==7){
                    return true;//结束本次循环
                }
                pushColorBarArrId(id.split("_")[1]);
                /*if(IntelligentRoadTest.gridTypeIndex==0){//覆盖质量
                    IntelligentRoadTest.colorBarArr.push(id.split("_")[1]);
                }else if(IntelligentRoadTest.gridTypeIndex==1){//上行速率
                    IntelligentRoadTest.colorBarArrSH.push(id.split("_")[1]);
                }else if(IntelligentRoadTest.gridTypeIndex==2){//下行速率
                    IntelligentRoadTest.colorBarArrXH.push(id.split("_")[1]);
                }else if(IntelligentRoadTest.gridTypeIndex==3){//MOD3干扰
                    IntelligentRoadTest.colorBarArrM3.push(id.split("_")[1]);
                }else if(IntelligentRoadTest.gridTypeIndex==4){//越区覆盖
                    IntelligentRoadTest.colorBarArrYQ.push(id.split("_")[1]);
                }else if(IntelligentRoadTest.gridTypeIndex==5){//重叠覆盖
                    IntelligentRoadTest.colorBarArrCD.push(id.split("_")[1]);
                }else if(IntelligentRoadTest.gridTypeIndex==6){//EC/IO
                    IntelligentRoadTest.colorBarArrEC.push(id.split("_")[1]);
                }*/
            }
        });
    }else {
        IntelligentRoadTest.gridIntervalKey=IntelligentRoadTestGridLegend.getGridIntervalKey(IntelligentRoadTest.lineTypeIndex,"line");
        var gridInterval=IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey];//获取对应栅格类型的指标区间

        //1 面板的同步
        $('.legendTitle .lineBoxSelectionUl li[data-gridIndex="'+IntelligentRoadTest.lineTypeIndex+'"]').addClass("active").siblings().removeClass("active");
        var textValue=$('.legendTitle .lineBoxSelectionUl li[data-gridIndex="'+IntelligentRoadTest.lineTypeIndex+'"]').text();
        $(".slideLegend .scale-text").text(textValue);
        //2 颜色 记录数 区间
        var num = $('.lineFieldset2 input[name="grid-type-line"][value="'+IntelligentRoadTest.lineTypeIndex+'"]').parent().index();
        var keys=["you","liang","zhong","cha","jicha","notCount","fallNet"];
        clearColorBarArr("line");
        $('.lineFieldSetInfo .gridTypeDiv:eq('+num+') input[name="legend-grid-line"]').each(function() {
            var index=$('.lineFieldSetInfo .gridTypeDiv:eq('+num+') input[name="legend-grid-line"]').index($(this));
            var bgColor=$(this).next().css('background-color');
            var $legen=null;
            if(index==5){//记录数
                $legen=$(".colorLegend .level_6");
                $(".colorLegend .recordNum").text(gridInterval.notCount.value);
                //同步图例记录数
            }else if(index==6){//脱网
                $legen=$(".level_7");
            }else{//优/良/中/差/极差
                $legen=$(".colorLegendUl").children('.map-w-i').eq(index);
            }
            gridInterval[keys[index]]["color"]=bgColor;
            var id = $legen.attr("id");
            $legen.css('background-color',bgColor);//同步图例颜色

            if($(this).is(':checked')){
                if($legen.hasClass("grey")){//判断该图例颜色是否为灰
                    //灰色的时候，移除grey类，呈现栅格
                    $legen.removeClass("grey");
                }
                //目前只有高铁能看到[脱网]的图例
                if(IntelligentRoadTest.index == 8 || (IntelligentRoadTest.index == 2 && IntelligentRoadTest.clickSenseName == "rail" )){
                }else{
                    if(id.split("_")[1]==7){
                        return true;//结束本次循环
                    }
                }

                if(IntelligentRoadTest.lineTypeIndex==0){//覆盖质量
                    IntelligentRoadTest.colorBarArrLine = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrLine,id.split("_")[1]);
                }else if(IntelligentRoadTest.lineTypeIndex==1){//上行速率
                    IntelligentRoadTest.colorBarArrSHLine = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrSHLine,id.split("_")[1]);
                }else if(IntelligentRoadTest.lineTypeIndex==2){//下行速率
                    IntelligentRoadTest.colorBarArrXHLine = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrXHLine,id.split("_")[1]);
                }
            }else{
                if(!$legen.hasClass("grey")){//判断该图例颜色是否为灰
                    //呈现该图例栅格
                    $legen.addClass("grey");
                }
                //目前只有高铁能看到[脱网]的图例
                if(IntelligentRoadTest.index == 8 || (IntelligentRoadTest.index == 2 && IntelligentRoadTest.clickSenseName == "rail" )){
                }else{
                    if(id.split("_")[1]==7){
                        return true;//结束本次循环
                    }
                }
                if(IntelligentRoadTest.lineTypeIndex==0){//覆盖质量
                    IntelligentRoadTest.colorBarArrLine.push(id.split("_")[1]);
                }else if(IntelligentRoadTest.lineTypeIndex==1){//上行速率
                    IntelligentRoadTest.colorBarArrSHLine.push(id.split("_")[1]);
                }else if(IntelligentRoadTest.lineTypeIndex==2){//下行速率
                    IntelligentRoadTest.colorBarArrXHLine.push(id.split("_")[1]);
                }
            }
        });
        IntelligentRoadTest.gridInterval=gridInterval;//同步了[颜色]之后的缓存
        IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey]=IntelligentRoadTest.gridInterval;
        localStorage.setItem("gridLegend", JSON.stringify(IntelligentRoadTestGridLegend.gridLegend));

       /* //线段图层图例(图层上的配置)
        $('input[name="legend-grid-line"]').each(function(index){
            /!*var index=$('input[name="legend-grid"]').index($(this));
            console(index+"=================="+i)*!/
            var $legen=$(".colorLegenLine").children('.map-w-i').eq(index);
            var id = $legen.attr("id");
            var bgColor=$(this).next().css('background-color');
            $legen.css('background-color',bgColor);
            if($(this).is(':checked')){
                if($legen.hasClass("grey")){//判断该图例颜色是否为灰
                    //灰色的时候，呈现栅格
                    $legen.removeClass("grey");
                    if(index<=5){//上行
                        IntelligentRoadTest.colorBarArrSHLine = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrSHLine,id.split("_")[1]);
                    }else if(index>5&&index<12){//下行
                        IntelligentRoadTest.colorBarArrXHLine = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrXHLine,id.split("_")[1]);
                    }else if(index>11&&index<18){//覆盖质量
                        IntelligentRoadTest.colorBarArrLine = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrLine,id.split("_")[1]);
                    }
                }
            }else{
                if(!$legen.hasClass("grey")){//判断该图例颜色是否为灰
                    //呈现该图例栅格
                    $legen.addClass("grey");
                    if(index<=5){//上行
                        IntelligentRoadTest.colorBarArrSHLine.push(id.split("_")[1]);
                    }else if(index>5&&index<12){//下行
                        IntelligentRoadTest.colorBarArrXHLine.push(id.split("_")[1]);
                    }else if(index>11&&index<18){//覆盖质量
                        IntelligentRoadTest.colorBarArrLine.push(id.split("_")[1]);
                    }
                }
            }

        });*/
    }


    //用户抱怨图例（图层上的配置） colorLegenBihuan IntelligentRoadTestSystemLayerV3.colorBarArrUC
    $('input[name="complain-hot"]').each(function(index){
        var $legen=$(".colorLegenBihuan").children('.map-w-i').eq(index);
        var id = $legen.attr("id");
        var bgColor=$(this).next().css('background-color');
        $legen.css('background-color',bgColor);
        if($(this).is(':checked')){
            if($legen.hasClass("grey")){//判断该图例颜色是否为灰
                //灰色的时候，呈现栅格
                $legen.removeClass("grey");
                IntelligentRoadTestSystemLayerV3.colorBarArrUC = IntelligentRoadTest.removeId(IntelligentRoadTestSystemLayerV3.colorBarArrUC,id.split("_")[1]);
            }
        }else{
            if(!$legen.hasClass("grey")){//判断该图例颜色是否为灰
                //呈现该图例栅格
                $legen.addClass("grey");
                IntelligentRoadTestSystemLayerV3.colorBarArrUC.push(id.split("_")[1]);
            }
        }

    });
    
    
}


//地图点击的对象高亮显示:用于地图点击对象时，由于要去查对应的数据，导致showsector（）和showpolyon（）方法执行较慢
/**********************************
 * @funcname IntelligentRoadTestSystemLayerV3.showHighLightedPolyline
 * @funcdesc //地图点击的对象高亮显示:用于地图点击对象时，由于要去查对应的数据，导致showsector（）和showpolyon（）方法执行较慢
 * @param {Array} pointArr  绘制多边形需要用到的集合点
 * @param {Number} type 1-圆形的扇区 2-叶子形状的扇区和栅格、多边形
 * @param {String} param sector-扇区 XXX-其它的字符串表示其它对象
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.showHighLightedPolyline = function IntelligentRoadTestSystemLayerV3_showHighLightedPolyline(pointArr,type,param){
    if(type==2){//叶子形状的扇区和栅格、多边形等
        if(IntelligentRoadTest.highLightPolyline!=null){
            IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.highLightPolyline);
            if(param=="sector"){
                IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.circle);
            }
        }
        /*if(IntelligentRoadTest.circle!=null){
            IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.circle);
        }*/
        var styleOptions = {
            // strokeColor:"#00dddd",    //边线颜色。
            fillColor:"#9ffb13",      //填充颜色
            strokeWeight: 1,       //边线的宽度，以像素为单位。
            // strokeOpacity: 1,	   //边线透明度，取值范围0 - 1。
            // fillOpacity: 0.1,      //填充的透明度，取值范围0 - 1。
            // strokeStyle: 'dashed' //边线的样式，solid或dashed。
        };
        if(param!="sector"){
            styleOptions = {
                strokeColor:"#9ffb13",  //边线颜色。
                fillColor:"",      //填充颜色
                strokeWeight: 4,       //边线的宽度，以像素为单位。
                strokeOpacity: 1,	   //边线透明度，取值范围0 - 1。
                fillOpacity: 0.1,      //填充的透明度，取值范围0 - 1。
                // strokeStyle: 'dashed' //边线的样式，solid或dashed。
            }
        }
        IntelligentRoadTest.highLightPolyline = new BMap.Polygon(pointArr,styleOptions);
        IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.highLightPolyline);
    }else{//圆形的扇区
        if(IntelligentRoadTest.highLightPolyline!=null){
            IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.highLightPolyline);
        }
        if(IntelligentRoadTest.circle!=null){
            IntelligentRoadTest.map.removeOverlay(IntelligentRoadTest.circle);
        }
        var circlePoint = pointArr.point;
        var radius = pointArr.radiusL;
        IntelligentRoadTest.highLightPolyline = new BMap.Circle(circlePoint,radius,{strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5,fillColor:'#9ffb13'});
        /*IntelligentRoadTest.highLightPolyline.setStrokeColor(IntelligentRoadTest.highLightPolyline);
        IntelligentRoadTest.highLightPolyline.setStrokeOpacity(1);
        IntelligentRoadTest.objectPolyline.setStrokeWeight(2);*/
        IntelligentRoadTest.map.addOverlay(IntelligentRoadTest.highLightPolyline);
    }

}


/**********************************
 * @funcname IntelligentRoadTest.resetSectorGridType
 * @funcdesc //扇区状态下如果选择上行速率，默认选中覆盖质量，不分频段，主接入场强；
 * 并且扇区的专题栅格只能查看AGPS-MR的栅格，
 * @param {null}
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.resetSectorGridType = function IntelligentRoadTestSystemLayerV3_resetSectorGridType(){
    //扇区没有上行速率 扇区只有主接入场强，没有最优场强和区分频段的选择
    if(IntelligentRoadTest.gridTypeIndex==1||IntelligentRoadTest.gridTypeIndex==6){//如果当前的栅格类型为上行速率,需要修改为覆盖质量
        $('input:radio[id="fgzl-type"]').attr("checked","true");
        $('input:radio[id="fgzl-type"]').click();
        IntelligentRoadTest.gridTypeIndex=0;
        IntelligentRoadTest.gridIntervalKey=IntelligentRoadTestGridLegend.getGridIntervalKey(IntelligentRoadTest.gridTypeIndex,"grid");
        IntelligentRoadTest.gridInterval=IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey];//获取对应栅格类型的指标区间
        var gridOpacity = parseFloat($('#gridOpacity').val());
        IntelligentRoadTest.gridThresholds=[
            { "threshold": "<"+IntelligentRoadTest.gridInterval.firstLastValue.first, "text": "(-85,0)", "color": $("#youColor").css('background-color'), "gradient": gridOpacity, "selected":$('#youLegend').is(':checked'),"level":1},
            { "threshold": "<="+IntelligentRoadTest.gridInterval.you.value, "text": "(-95,-85]", "color": $("#liangColor").css('background-color'), "gradient": gridOpacity, "selected":$('#liangLegend').is(':checked'),"level":2},
            { "threshold": "<="+IntelligentRoadTest.gridInterval.liang.value, "text": "(-105,-95]", "color": $("#zhongColor").css('background-color'), "gradient": gridOpacity, "selected":$('#zhongLegend').is(':checked'),"level":3},
            { "threshold": "<="+IntelligentRoadTest.gridInterval.zhong.value, "text": "(-115,-105]", "color": $("#chaColor").css('background-color'), "gradient": gridOpacity, "selected":$('#chaLegend').is(':checked'),"level":4},
            { "threshold": "<="+IntelligentRoadTest.gridInterval.cha.value, "text": "(-∞,-115]", "color": $("#jichaColor").css('background-color'), "gradient": gridOpacity, "selected":$('#jichaLegend').is(':checked'),"level":5}
        ];
        //更新栅格图例的切换面板
        //1 面板的同步
        var gridconditions=IntelligentRoadTest.gridBandIndex+"|"+IntelligentRoadTest.gridBand+"|"+IntelligentRoadTest.gridType+"|"+IntelligentRoadTest.gridTime+"|"+IntelligentRoadTest.gridTypeIndex
        $('.legendTitle .gridBoxSelectionUl li').removeClass("active");
        $('.legendTitle .gridBoxSelectionUl li[data-gridconditions="'+gridconditions+'"]').addClass("active").siblings().removeClass("active");

        var textValue=$('.legendTitle .gridBoxSelectionUl li[data-gridconditions="'+gridconditions+'"]').text();
        if(isNull(textValue)){
            textValue=$('.gridFieldset2 input[name="grid-type"][value="'+IntelligentRoadTest.gridTypeIndex+'"]').siblings('label').text();
        }else{
            textValue=textValue.split(" ")[1];
        }
        $(".slideLegend .scale-text").text(textValue);
        //2 颜色 记录数 区间
        var num = $('.gridFieldset2 input[name="grid-type"][value="'+IntelligentRoadTest.gridTypeIndex+'"]').parent().index();
        $('.gridFieldSetInfo .gridTypeDiv:eq('+num+') input[name="legend-grid"]').each(function() {
            var index=$('.gridFieldSetInfo .gridTypeDiv:eq('+num+') input[name="legend-grid"]').index($(this));
            var bgColor=$(this).next().css('background-color');
            var $legen=null;
            if(index==5){//记录数
                $legen=$(".colorLegend .level_6");
                $(".colorLegend .recordNum").text(IntelligentRoadTest.gridInterval.notCount.value);
                //同步图例记录数
            }else{//优/良/中/差/极差
                $legen=$(".colorLegendUl").children('.map-w-i').eq(index);
                $legen.css('background-color',bgColor);//同步图例颜色
            }
            // var id = $legen.attr("id");

        });

    }

    if(!$('input:radio[id="bf-band"]').is(':checked')){//选中不分频段
        $('input:radio[id="bf-band"]').attr("checked","true");
        $('input:radio[id="bf-band"]').click();
    }
    $('input:radio[id="zjr-grid"]').attr("checked","true");//主接入场强
    $('input:radio[id="zjr-grid"]').click();
    IntelligentRoadTest.gridBand=["主接入场强"];

    if(IntelligentRoadTest.gridTypeIndex==0){//非覆盖质量需禁用三网
        if($('#threeComp').hasClass("unClick")){
            $('#threeComp').removeClass("unClick");
        }
    }else{
        if(!$('#threeComp').hasClass("unClick")){
            $('#threeComp').addClass("unClick");
        }
    }
}

/**********************************
 * @funcname IntelligentRoadTest.resetGridType
 * @funcdesc //扇区状态下禁用上行速率,其它的时候恢复原状
 * @param {null}
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.resetGridType = function IntelligentRoadTestSystemLayerV3_resetGridType(){
    if(IntelligentRoadTest.currentLocation!=null&&IntelligentRoadTest.currentLocation.toLowerCase().endsWith("sector")){//当前查看扇区或专题扇区，将下行速率禁用
        $(".gridFieldSetInfo .gridTypeDiv:eq(0) input,.gridFieldSetInfo .gridTypeDiv:eq(6) input , input[name='grid-type']:eq(0),input[name='grid-type']:eq(6)").attr("disabled",true);
        $(".gridFieldSetInfo .gridTypeDiv:eq(0) input,.gridFieldSetInfo .gridTypeDiv:eq(6) input , input[name='grid-type']:eq(0),input[name='grid-type']:eq(6)").siblings('label').addClass("greyColor");
        $(".bandMap input").attr("disabled",true);
        $(".bandMap input").siblings('label').addClass("greyColor");
        $(".gridBoxSelectionUl > li:eq(0)").hide();
    }else {
        $(".gridFieldSetInfo .gridTypeDiv:eq(0) input,.gridFieldSetInfo .gridTypeDiv:eq(6) input , input[name='grid-type']:eq(0),input[name='grid-type']:eq(6)").attr("disabled",false);
        $(".gridFieldSetInfo .gridTypeDiv:eq(0) input,.gridFieldSetInfo .gridTypeDiv:eq(6) input , input[name='grid-type']:eq(0),input[name='grid-type']:eq(6)").siblings('label').removeClass("greyColor");
        $(".gridBoxSelectionUl > li:eq(0)").show();
        /*$(".bandMap input").attr("disabled",false);
        $(".bandMap input").siblings('label').removeClass("greyColor");*/
    }

}


//定时器判断图层是否已经加载完成，加载完成则取消“加载中动画”
IntelligentRoadTestSystemLayerV3.cancelLoading = function IntelligentRoadTestSystemLayerV3_cancelLoading(){
    clearInterval(IntelligentRoadTestSystemLayerV3.cancelLoadingTimer);
    IntelligentRoadTestSystemLayerV3.cancelLoadingTimer=setInterval(function(){
        if(IntelligentRoadTest.loadLayerNum==0 || IntelligentRoadTest.loadLayerNum <= IntelligentRoadTest.currentLayerNum){
            clearInterval(IntelligentRoadTestSystemLayerV3.cancelLoadingTimer);
            $('#layerSubmitProgressDiv').hide();
            $('#layerSubmitProgressDiv .closeProgress').unbind("click");
            IntelligentRoadTestSystemLayerV3.cancelLoadingTimer=null;
            IntelligentRoadTest.showLayerLoading=false;
        }
    },500);
}

//给IntelligentRoadTest.poorAreaObj总对象赋值一个当前正在查看的专题图层对象 、给IntelligentRoadTest.sectorObj总对象赋值一个当前正在查看的扇区图层对象
IntelligentRoadTestSystemLayerV3.setPoorAreaObj=function IntelligentRoadTestSystemLayerV3_setPoorAreaObj(index){
    if(index==24){
        IntelligentRoadTest.poorAreaObj = upPoorArea;
        // IntelligentRoadTest.index=24;
    }else if(index==25){
        IntelligentRoadTest.poorAreaObj = dwPoorArea;
        // IntelligentRoadTest.index=25;
    }else if(index==26){
        IntelligentRoadTest.sectorObj = m3Sector;
        // IntelligentRoadTest.index=26;
    }else if(index==27){
        IntelligentRoadTest.sectorObj = olSector;
        // IntelligentRoadTest.index=27;
    }else if(index==28){
        IntelligentRoadTest.sectorObj = cbSector;
        // IntelligentRoadTest.index=28;
    }else if(index==0){
        IntelligentRoadTest.poorAreaObj = poorArea;
        // IntelligentRoadTest.index=0;
    }else if(index==3){
        IntelligentRoadTest.sectorObj = normalSector;
        // IntelligentRoadTest.index=3;
    }else if(index==30){
        IntelligentRoadTest.poorAreaObj = m3PoorArea;
    }else if(index==31){
        IntelligentRoadTest.poorAreaObj = olPoorArea;
    }else if(index==32){
        IntelligentRoadTest.poorAreaObj = cbPoorArea;
    }

}

//给IntelligentRoadTest.poorAreaObj总对象赋值一个当前正在查看的专题图层对象
/**********************************
 * @funcname IntelligentRoadTestSystemLayerV3.setGridLayerIndex
 * @funcdesc 给IntelligentRoadTest.poorAreaObj总对象赋值一个当前正在查看的专题图层对象
 * @param {String} currentLocation 当前详情页的标识
 * @return {null}
 * @author 陈小芳
 * @create 20180410
 ***********************************/
IntelligentRoadTestSystemLayerV3.setGridLayerIndex=function IntelligentRoadTestSystemLayerV3_setGridLayerIndex(currentLocation){
    if(currentLocation=="upPoorArea"){//上行
        $(".fieldset2 input#sxsl-type").click();
        $(".fieldset2 input#sxsl-type").siblings('label').css("color","#3285FF");
    }else if(currentLocation=="dwPoorArea"){//下行
        $(".fieldset2 input#xxsl-type").click();
        $(".fieldset2 input#xxsl-type").siblings('label').css("color","#3285FF");
    }else if(currentLocation=="poorArea"){//覆盖质量
        $(".fieldset2 input#fgzl-type").click();
        $(".fieldset2 input#fgzl-type").siblings('label').css("color","#3285FF");
    }else if(currentLocation=="m3Sector"){//MOD3干扰
        $(".fieldset2 input#mod3-type").click();
        $(".fieldset2 input#mod3-type").siblings('label').css("color","#3285FF");
    }else if(currentLocation=="cbSector"){//越区覆盖
        $(".fieldset2 input#yqfg-type").click();
        $(".fieldset2 input#yqfg-type").siblings('label').css("color","#3285FF");
    }else if(currentLocation=="olSector"){//重叠覆盖
        $(".fieldset2 input#cdfg-type").click();
        $(".fieldset2 input#cdfg-type").siblings('label').css("color","#3285FF");
    }
    //栅格覆盖频段
    var gridBandIndex=$('input:radio[name="band-radio"]:checked').val();//不分频段、区分频段下标
    var gridBand=[];
    if(gridBandIndex==0){
        gridBand.push($('input:radio[name="chq-grid"]:checked').val());
    }else{
        $('input:checkbox[name="band-grid"]:checked').each(function(i){
            gridBand.push($(this).val());
        });
    }
    //栅格数据
    var gridType=$('input:radio[name="gridNum"]:checked').val();
    //栅格覆盖质量
    var gridTypeIndex=$('input:radio[name="grid-type"]:checked').val();//覆盖质量-0、上行速率-1、下行速率-2、MOD3干扰-3、越区覆盖-4、重叠覆盖-5的值


    IntelligentRoadTest.gridBand=gridBand;//栅格频段
    IntelligentRoadTest.gridType=gridType;//栅格数据
    IntelligentRoadTest.gridBandIndex=gridBandIndex;//栅格频段下标 0--不分频段  1--区分频段
    IntelligentRoadTest.gridTypeIndex=gridTypeIndex;//栅格类型下标 0--覆盖质量  1--上行速率  2--下行速率
    IntelligentRoadTest.gridThresholds=IntelligentRoadTestSystemLayerV3.getGridThresholds(gridTypeIndex,IntelligentRoadTest.gridOpacity);//栅格图例
}

//栅格图层中的gridThresholds
/**********************************
 * @funcname IntelligentRoadTestSystemLayerV3.getGridThresholds
 * @funcdesc 栅格图层中的gridThresholds
 * @param {Number} gridTypeIndex 栅格类型编号
 * @param {Number} gridOpacity 透明度
 * @return {null}
 * @author 陈小芳
 * @create 20180410
 ***********************************/
IntelligentRoadTestSystemLayerV3.getGridThresholds = function IntelligentRoadTestSystemLayerV3_getGridThresholds(gridTypeIndex,gridOpacity){
    var gridIntervalKey=IntelligentRoadTestGridLegend.getGridIntervalKey(gridTypeIndex,"grid");
    var gridInterval=IntelligentRoadTestGridLegend.gridLegend[gridIntervalKey];//获取对应栅格类型的指标区间
    if($('.lineTable').css('display')=='none'){
        $(".lineBoxSelectionUl").hide();
        IntelligentRoadTest.gridIntervalKey=gridIntervalKey;
        IntelligentRoadTest.gridInterval=gridInterval;
    }
    //{ "threshold": "<="+gridInterval.notCount.value, "text": "(0,3]", "color": $("#notCountColor").css('background-color'), "gradient": gridOpacity, "selected":$('#notCountLegend').is(':checked'),"level":6}
    var gridThresholds=[
        { "threshold": "<"+gridInterval.firstLastValue.first, "text": "(-85,0)", "color": $("#youColor").css('background-color'), "gradient": gridOpacity, "selected":$('#youLegend').is(':checked'),"level":1},
        { "threshold": "<="+gridInterval.you.value, "text": "(-95,-85]", "color": $("#liangColor").css('background-color'), "gradient": gridOpacity, "selected":$('#liangLegend').is(':checked'),"level":2},
        { "threshold": "<="+gridInterval.liang.value, "text": "(-105,-95]", "color": $("#zhongColor").css('background-color'), "gradient": gridOpacity, "selected":$('#zhongLegend').is(':checked'),"level":3},
        { "threshold": "<="+gridInterval.zhong.value, "text": "(-115,-105]", "color": $("#chaColor").css('background-color'), "gradient": gridOpacity, "selected":$('#chaLegend').is(':checked'),"level":4},
        { "threshold": "<="+gridInterval.cha.value, "text": "(-∞,-115]", "color": $("#jichaColor").css('background-color'), "gradient": gridOpacity, "selected":$('#jichaLegend').is(':checked'),"level":5}
    ];
    if(gridTypeIndex==1){
        //{ "threshold": "0", "text": "[-2,0)", "color": $("#notCountshColor").css('background-color'), "gradient": gridOpacity, "selected":$('#notCountshLegend').is(':checked'),"level":6}
        //上行速率
        gridThresholds=[
            { "threshold": gridInterval.firstLastValue.first+"", "text": "[5,+∞)", "color": $("#youshColor").css('background-color'), "gradient": gridOpacity, "selected":$('#youshLegend').is(':checked'),"level":1},
            { "threshold": gridInterval.you.value+"", "text": "[3,5)", "color": $("#liangshColor").css('background-color'), "gradient": gridOpacity, "selected":$('#liangshLegend').is(':checked'),"level":2},
            { "threshold": gridInterval.liang.value+"", "text": "[1,3)", "color": $("#zhongshColor").css('background-color'), "gradient": gridOpacity, "selected":$('#zhongshLegend').is(':checked'),"level":3},
            { "threshold": gridInterval.zhong.value+"", "text": "[0.25,1)", "color": $("#chashColor").css('background-color'), "gradient": gridOpacity, "selected":$('#chaLeshgend').is(':checked'),"level":4},
            { "threshold": gridInterval.cha.value+"", "text": "(0,0.25)", "color": $("#jichashColor").css('background-color'), "gradient": gridOpacity, "selected":$('#jichashLegend').is(':checked'),"level":5}
        ];
    }else if(gridTypeIndex==2){
        // { "threshold": "0", "text": "[-2,0)", "color": $("#notCountxhColor").css('background-color'), "gradient": gridOpacity, "selected":$('#notCountxhLegend').is(':checked'),"level":6}
        gridThresholds=[
            { "threshold": gridInterval.firstLastValue.first+"", "text": "[12,+∞)", "color": $("#youxhColor").css('background-color'), "gradient": gridOpacity, "selected":$('#youxhLegend').is(':checked'),"level":1},
            { "threshold": gridInterval.you.value+"", "text": "[8,12)", "color": $("#liangxhColor").css('background-color'), "gradient": gridOpacity, "selected":$('#liangxhLegend').is(':checked'),"level":2},
            { "threshold": gridInterval.liang.value+"", "text": "[5,8)", "color": $("#zhongxhColor").css('background-color'), "gradient": gridOpacity, "selected":$('#zhongxhLegend').is(':checked'),"level":3},
            { "threshold": gridInterval.zhong.value+"", "text": "[2,5)", "color": $("#chaxhColor").css('background-color'), "gradient": gridOpacity, "selected":$('#chaxhLegend').is(':checked'),"level":4},
            { "threshold": gridInterval.cha.value+"", "text": "(0,2)", "color": $("#jichaxhColor").css('background-color'), "gradient": gridOpacity, "selected":$('#jichaxhLegend').is(':checked'),"level":5}
        ];
    }else if(gridTypeIndex==3){
        //{ "threshold": "-1", "text": "[0,-3]", "color": $("#notCountM3Color").css('background-color'), "gradient": gridOpacity, "selected":$('#notCountM3Legend').is(':checked'),"level":6},
        gridThresholds=[
            { "threshold": gridInterval.you.value/100+"", "text": "[0,0.05]", "color": $("#youM3Color").css('background-color'), "gradient": gridOpacity, "selected":$('#youM3Legend').is(':checked'),"level":1},
            { "threshold": gridInterval.liang.value/100+"", "text": "(0.05,0.15]", "color": $("#liangM3Color").css('background-color'), "gradient": gridOpacity, "selected":$('#liangM3Legend').is(':checked'),"level":2},
            { "threshold": gridInterval.zhong.value/100+"", "text": "(0.15,0.25]", "color": $("#zhongM3Color").css('background-color'), "gradient": gridOpacity, "selected":$('#zhongM3Legend').is(':checked'),"level":3},
            { "threshold": gridInterval.cha.value/100+"", "text": "(0.25,0.35]", "color": $("#chaM3Color").css('background-color'), "gradient": gridOpacity, "selected":$('#chaM3Legend').is(':checked'),"level":4},
            { "threshold": gridInterval.firstLastValue.last/100+"", "text": "(0.35,1]", "color": $("#jichaM3Color").css('background-color'), "gradient": gridOpacity, "selected":$('#jichaM3Legend').is(':checked'),"level":5}
        ];
    }else if(gridTypeIndex==4){
        //{ "threshold": "-1", "text": "[0,-3]", "color": $("#notCountYQColor").css('background-color'), "gradient": gridOpacity, "selected":$('#notCountYQLegend').is(':checked'),"level":6},
        gridThresholds=[
            { "threshold": gridInterval.you.value/100+"", "text": "[0,0.05]", "color": $("#youYQColor").css('background-color'), "gradient": gridOpacity, "selected":$('#youYQLegend').is(':checked'),"level":1},
            { "threshold": gridInterval.liang.value/100+"", "text": "(0.05,0.15]", "color": $("#liangYQColor").css('background-color'), "gradient": gridOpacity, "selected":$('#liangYQLegend').is(':checked'),"level":2},
            { "threshold": gridInterval.zhong.value/100+"", "text": "(0.15,0.25]", "color": $("#zhongYQColor").css('background-color'), "gradient": gridOpacity, "selected":$('#zhongYQLegend').is(':checked'),"level":3},
            { "threshold": gridInterval.cha.value/100+"", "text": "(0.25,0.35]", "color": $("#chaYQColor").css('background-color'), "gradient": gridOpacity, "selected":$('#chaYQLegend').is(':checked'),"level":4},
            { "threshold": gridInterval.firstLastValue.last/100+"", "text": "(0.35,1]", "color": $("#jichaYQColor").css('background-color'), "gradient": gridOpacity, "selected":$('#jichaYQLegend').is(':checked'),"level":5}
        ];
    }else if(gridTypeIndex==5){
        //{ "threshold": "-1", "text": "[0,-3]", "color": $("#notCountCDColor").css('background-color'), "gradient": gridOpacity, "selected":$('#notCountCDLegend').is(':checked'),"level":6},
        gridThresholds=[
            { "threshold": gridInterval.you.value/100+"", "text": "[0,0.05]", "color": $("#youCDColor").css('background-color'), "gradient": gridOpacity, "selected":$('#youCDLegend').is(':checked'),"level":1},
            { "threshold": gridInterval.liang.value/100+"", "text": "(0.05,0.15]", "color": $("#liangCDColor").css('background-color'), "gradient": gridOpacity, "selected":$('#liangCDLegend').is(':checked'),"level":2},
            { "threshold": gridInterval.zhong.value/100+"", "text": "(0.15,0.25]", "color": $("#zhongCDColor").css('background-color'), "gradient": gridOpacity, "selected":$('#zhongCDLegend').is(':checked'),"level":3},
            { "threshold": gridInterval.cha.value/100+"", "text": "(0.25,0.35]", "color": $("#chaCDColor").css('background-color'), "gradient": gridOpacity, "selected":$('#chaCDLegend').is(':checked'),"level":4},
            { "threshold": gridInterval.firstLastValue.last/100+"", "text": "(0.35,1]", "color": $("#jichaCDColor").css('background-color'), "gradient": gridOpacity, "selected":$('#jichaCDLegend').is(':checked'),"level":5}
        ];
    }else if(gridTypeIndex==6){
        // { "threshold": gridInterval.notCount.value+"", "text": "[0,-3]", "color": $("#notCountECColor").css('background-color'), "gradient": gridOpacity, "selected":$('#notCountECLegend').is(':checked'),"level":6},
        gridThresholds=[
            { "threshold": gridInterval.firstLastValue.first+"", "text": "(-6,0]", "color": $("#youECColor").css('background-color'), "gradient": gridOpacity, "selected":$('#youECLegend').is(':checked'),"level":1},
            { "threshold": gridInterval.you.value+"", "text": "(-8,-6]", "color": $("#liangECColor").css('background-color'), "gradient": gridOpacity, "selected":$('#liangECLegend').is(':checked'),"level":2},
            { "threshold": gridInterval.liang.value+"", "text": "(-10,-8]", "color": $("#zhongECColor").css('background-color'), "gradient": gridOpacity, "selected":$('#zhongECLegend').is(':checked'),"level":3},
            { "threshold": gridInterval.zhong.value+"", "text": "(-12,-10]", "color": $("#chaECColor").css('background-color'), "gradient": gridOpacity, "selected":$('#chaECLegend').is(':checked'),"level":4},
            { "threshold": gridInterval.cha.value+"", "text": "(-32,-12]", "color": $("#jichaECColor").css('background-color'), "gradient": gridOpacity, "selected":$('#jichaECLegend').is(':checked'),"level":5}
        ];
    }else if(gridTypeIndex==7){
        gridThresholds=[
            { "threshold": "<"+gridInterval.firstLastValue.first, "text": "(-85,0)", "color": $("#youNBColor").css('background-color'), "gradient": gridOpacity, "selected":$('#youNBLegend').is(':checked'),"level":1},
            { "threshold": "<="+gridInterval.you.value, "text": "(-95,-85]", "color": $("#liangNBColor").css('background-color'), "gradient": gridOpacity, "selected":$('#liangNBLegend').is(':checked'),"level":2},
            { "threshold": "<="+gridInterval.liang.value, "text": "(-105,-95]", "color": $("#zhongNBColor").css('background-color'), "gradient": gridOpacity, "selected":$('#zhongNBLegend').is(':checked'),"level":3},
            { "threshold": "<="+gridInterval.zhong.value, "text": "(-115,-105]", "color": $("#chaNBColor").css('background-color'), "gradient": gridOpacity, "selected":$('#chaNBLegend').is(':checked'),"level":4},
            { "threshold": "<="+gridInterval.cha.value, "text": "(-∞,-115]", "color": $("#jichaNBColor").css('background-color'), "gradient": gridOpacity, "selected":$('#jichaNBLegend').is(':checked'),"level":5}
        ];
    }
    return gridThresholds;

}

//线段图层中的线段配置，使用level(和页面图例对应)，不使用对应的值，需要在匹配时自行将值根据区间进行转换
IntelligentRoadTestSystemLayerV3.getLineThresholds = function IntelligentRoadTestSystemLayerV3_getLineThresholds(lineTypeIndex,lineOpacity){
    if($('.lineTable').css('display')=='table'){
        $(".gridBoxSelectionUl").hide();
        var gridIntervalKey=IntelligentRoadTestGridLegend.getGridIntervalKey(lineTypeIndex,"line");
        var gridInterval=IntelligentRoadTestGridLegend.gridLegend[gridIntervalKey];//获取对应栅格类型的指标区间
        IntelligentRoadTest.gridIntervalKey=gridIntervalKey;
        IntelligentRoadTest.gridInterval=gridInterval;
    }
    //1优2良3中4差5极差6记录数
	var gridThresholds=[
        { "level": "1", "text": "(-∞,-115]", "color": $("#youColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#jichaLegendLine').is(':checked')},
        { "level": "2", "text": "(-115,-105]", "color": $("#liangColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#chaLegendLine').is(':checked')},
        { "level": "3", "text": "(-105,-95]", "color": $("#zhongColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#zhongLegendLine').is(':checked')},
        { "level": "4", "text": "(-95,-85]", "color": $("#chaColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#liangLegendLine').is(':checked')},
        { "level": "5", "text": "(-85,0)", "color": $("#jichaColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#youLegendLine').is(':checked')},
        { "level": "6", "text": "(0,3]", "color": $("#notCountColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#notCountLegendLine').is(':checked')},
        { "level": "7", "text": "null", "color": $("#fallNetColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#fallNetLegendLine').is(':checked')}
    ];
    if(lineTypeIndex==1){
        //上行速率
        gridThresholds=[
            { "level": "1", "text": "[5,+∞)", "color": $("#youshColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#youshLegendLine').is(':checked')},
            { "level": "2", "text": "[3,5)", "color": $("#liangshColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#liangshLegendLine').is(':checked')},
            { "level": "3", "text": "[1,3)", "color": $("#zhongshColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#zhongshLegendLine').is(':checked')},
            { "level": "4", "text": "[0.25,1)", "color": $("#chashColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#chaLeshgendLine').is(':checked')},
            { "level": "5", "text": "(0,0.25)", "color": $("#jichashColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#jichashLegendLine').is(':checked')},
            { "level": "6", "text": "[-2,0)", "color": $("#notCountshColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#notCountshLegendLine').is(':checked')},
            { "level": "7", "text": "null", "color": $("#fallNetshColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#fallNetshLegendLine').is(':checked')}
        ];
    }else if(lineTypeIndex==2){
        gridThresholds=[
            { "level": "1", "text": "[12,+∞)", "color": $("#youxhColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#youxhLegendLine').is(':checked')},
            { "level": "2", "text": "[8,12)", "color": $("#liangxhColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#liangxhLegendLine').is(':checked')},
            { "level": "3", "text": "[5,8)", "color": $("#zhongxhColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#zhongxhLegendLine').is(':checked')},
            { "level": "4", "text": "[2,5)", "color": $("#chaxhColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#chaxhLegendLine').is(':checked')},
            { "level": "5", "text": "(0,2)", "color": $("#jichaxhColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#jichaxhLegendLine').is(':checked')},
            { "level": "6", "text": "[-2,0)", "color": $("#notCountxhColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#notCountxhLegendLine').is(':checked')},
            { "level": "7", "text": "null", "color": $("#fallNetxhColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#fallNetxhLegendLine').is(':checked')}
        ];
    }
    return gridThresholds;

}

//根据栅格下标获取栅格的指标名称
IntelligentRoadTestSystemLayerV3.getGridName = function IntelligentRoadTestSystemLayerV3_getGridName(gridTypeIndex){
    var obj={};
    if(gridTypeIndex==0){
        obj={"zhibiao":IntelligentRoadTest.gridBand.join(",")+" "+getGridTypeName(IntelligentRoadTest.gridType)+"(dBm)","name":"覆盖质量"};
    }else if(gridTypeIndex==1){
        obj={"zhibiao":getGridTypeName(IntelligentRoadTest.gridType)+" "+"平均上行速率"+"(Mbps)","name":"上行速率"};
    }else if(gridTypeIndex==2){
        obj={"zhibiao":getGridTypeName(IntelligentRoadTest.gridType)+" "+"平均下行速率"+"(Mbps)","name":"下行速率"};
    }else if(gridTypeIndex==3){
        obj={"zhibiao":getGridTypeName(IntelligentRoadTest.gridType)+" "+"MOD3干扰"+"(%)","name":"MOD3干扰"};
    }else if(gridTypeIndex==4){
        obj={"zhibiao":getGridTypeName(IntelligentRoadTest.gridType)+" "+"越区覆盖"+"(%)","name":"越区覆盖"};
    }else if(gridTypeIndex==5){
        obj={"zhibiao":getGridTypeName(IntelligentRoadTest.gridType)+" "+"重叠覆盖"+"(%)","name":"重叠覆盖"};
    }else if(gridTypeIndex==6){
        obj={"zhibiao":"EC/IO"+"","name":"EC/IO"};
    }else if(gridTypeIndex==7){
        obj={"zhibiao":getGridTypeName(IntelligentRoadTest.gridType)+" "+"NB预测"+"(dBm)","name":"NB预测"};
    }
    return obj;

}

//无效数据置为0
function formatValue(value){
    if(!noceUtil.isUndefined(value)&&value!='NULL'&&value!='null'&&value!='undefined'){
        return value;
    }
    return 0;

}

//无效数组置为空''
function formatArray(value) {
    if(!noceUtil.isUndefined(value)&&value!='NULL'&&value!='null'&&value!='undefined'){
        return value;
    }
    return '';
}

//是否是无效数据
function isNull(value){
    if(!noceUtil.isUndefined(value)&&value!='NULL'&&value!='null'&&value!='undefined'){
        return false;
    }else{
        return true;
    }
}

//获取上一个月份的日期
function getPreMonth(date){
    var year=date.substr(0 , 4);
    var month=date.substr(4 , 2);
    var preMonth = new Date(year, month-1-1, 1).Format("yyyyMM");
    // var preMonth =new Date( now.setMonth(now.getMonth() - 1)).Format("yyyyMM");
    return preMonth;
}

//获取日期格式为ddMM
function getddmm(date){
    var year=date.substr(2 , 2);
    var month=date.substr(4 , 2);
    var day = date.substr(6 , 2);
    var preMonth=day+""+month+""+year;
    if(Number(date)<Number(IntelligentRoadTestSystemLayerV3.gridYearDate)){
        preMonth=day+""+month;
    }
    // preMonth = new Date(year+"-"+month+"-"+day).Format("ddMMyyyy");
    return preMonth;
}

//------------------------------------用户抱怨图层Start--------------------------------------------------------------
/**
 * ********************************
 * @funcname IntelligentRoadTestSystemLayerV3.queryUserComplainData
 * @funcdesc 根据图层的数据查询用户抱怨的数据 越级工单、全量工单
 * @param {String}cityname : 地市名称
 * @param {Number}userZindex : 层级
 * @param {Number}userOpacity : 透明度
 * @param {Array}full : 全量工单（选中的数组数据）
 * @param {Array}hot : 抱怨热点（选中的数组数据）
 * @param {Array}over : 越级工单（选中的数组数据）
 * @return {null}
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentRoadTestSystemLayerV3.queryUserComplainData = function IntelligentRoadTestSystemLayerV3_queryUserComplainData(city,userZindex,userOpacity,full,hot,over){
    if($('#userComplain').is(':checked')){//是否需要渲染用户抱怨图层
        if(IntelligentRoadTest.userComplainQueryFlag==3&&!IntelligentRoadTest.seachTime){//说明已经查询过，有缓存的数据，不需要重新查询
            IntelligentRoadTest.loadLayerNum+=1;
            IntelligentRoadTestSystemLayerV3.handleUserComplainData(city,userZindex,userOpacity,full,hot,over);
        }else{
            // IntelligentRoadTest.userComplainQueryFlag=null;
            IntelligentRoadTest.queryAllUserComplain();
            var timer=setInterval(function(){
                if(IntelligentRoadTest.userComplainQueryFlag==3){//用户抱怨所有数据查询并合并完成
                    clearInterval(timer);
                    IntelligentRoadTest.loadLayerNum+=1;
                    IntelligentRoadTestSystemLayerV3.handleUserComplainData(city,userZindex,userOpacity,full,hot,over);
                    timer=null;
                }
            },300);
        }
    }else{
        IntelligentRoadTestSystemLayerV3.isShowUserComplain = false;//用户抱怨没有选中
        if(IntelligentRoadTestSystemLayerV3.userComplainCompent!=null){//清空用户抱怨图层
            IntelligentRoadTestSystemLayerV3.userComplainCompent.clear();
        }
        IntelligentRoadTestSystemLayerV3.ucCanArr=[];//清空抱怨热点缓存的栅格
        IntelligentRoadTestSystemLayerV3.isShowUCGrid=false;
        IntelligentRoadTest.legendGrid();//图例显示隐藏
        if(IntelligentRoadTestSystemLayerV3.hLUserComplain){
            //注销
            var itemData = {
                obj_type:IntelligentRoadTestSystemLayerV3.hLUserComplain.obj_type,
                pointsString:null,
                point:null,
                obj_id:IntelligentRoadTestSystemLayerV3.hLUserComplain.obj_id
            };
            IntelligentRoadTest.logOutPolygonToLayer(itemData);
        }
        IntelligentRoadTest.map.removeOverlay(IntelligentRoadTestSystemLayerV3.hLUserComplain);//移除点击的对象标志
        IntelligentRoadTestSystemLayerV3.hLUserComplain=null;
        if(IntelligentRoadTest.polygonToLayerComponents!=null){//清空用户抱怨图层的数据
            var registerPolygonArr=[];
            var polygonCanvasArr=IntelligentRoadTest.polygonToLayerComponents.polygonCanvasArr;
            for(var i=0;i<polygonCanvasArr.length;i++){
                if(polygonCanvasArr[i]["obj_type"]!="userComplain"&&polygonCanvasArr[i]["signs"]!="addUserComplain"&&polygonCanvasArr[i]["signs"]!="addComplainHot"){
                    registerPolygonArr.push(polygonCanvasArr[i]);
                }
            }
            IntelligentRoadTest.polygonToLayerComponents.polygonCanvasArr=registerPolygonArr;
        }
    }

}

/**
 * ********************************
 * @funcname IntelligentRoadTestSystemLayerV3.handleUserComplainData
 * @funcdesc 处理用户抱怨的数据 越级工单、全量工单、抱怨热点
 * @param {String}city : 地市名称
 * @param {Array}full : 全量工单（选中的数组数据）
 * @param {Array}hot : 抱怨热点（选中的数组数据）
 * @param {Array}over : 越级工单（选中的数组数据）
 * @return {null}
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentRoadTestSystemLayerV3.handleUserComplainData = function IntelligentRoadTestSystemLayerV3_handleUserComplainData(city,userZindex,userOpacity,full,hot,over){
    hot=[1,2,3];//将抱怨热点的栅格全部查出来，方便地图的图例筛选数据
    var result=IntelligentRoadTest.filterUserComplainData(city , null , null , full,hot,over);//过滤
    IntelligentRoadTestSystemLayerV3.ucCanArr=[];
    var orderArr = [];
    for(var i=0;i<result.length;i++){
        var res=result[i];
        if(res["type"]=="全量工单"||res["type"]=="越级工单"){
            if(!isNull(res["longitude"])&&!isNull(res["latitude"])){
                var obj = {};
                obj.point = new BMap.Point(res["longitude"],res["latitude"]);
                if(res["type"]=="全量工单"){
                    obj.workOrder = res["workorder_type"];
                }else if(res["type"]=="越级工单"){
                    if(isNull(obj.workOrder)){//为了适应勾选多个和勾选一个，都能正确的按照顺序匹配对应类型，顺序规则为if顺序的规则
                        if(over.indexOf("越级考核") > -1){
                            if(res["workorder_type2"]=="考核工单"){
                                obj.workOrder = "越级考核";
                            }
                        }
                    }
                    if(isNull(obj.workOrder)){
                        if(over.indexOf("越级归档") > -1){
                            if(res["workorder_type2"]=="归档工单"){
                                obj.workOrder = "越级归档";
                            }
                        }
                    }

                    if(isNull(obj.workOrder)){
                        if(over.indexOf("工信部越级") > -1){
                            if(res["workorder_type"]=="工信部预处理"){
                                obj.workOrder = "工信部越级";
                            }
                        }
                    }

                    if(isNull(obj.workOrder)){
                        if(over.indexOf("集团越级") > -1){
                            if(res["workorder_type"]=="集团网络投诉" || res["workorder_type"]=="4008热线"){
                                obj.workOrder = "集团越级";
                            }
                        }
                    }

                }
                obj.bandLevel = IntelligentRoadTestSystemLayerV3.getLevelByType(res["type"],obj.workOrder);
                obj.radius = 13;
                obj.type = 1;
                obj.decide = 1;
                obj.id = res["workorder_id"];
                obj.workType = res["type"];
                obj.signs = "addUserComplain";//为polygonCanvasArr标识为是手工添加进去的，并非是点击对象后通过registeredPolygonToLayer方法注册的
                obj.val=res;
                orderArr.push(obj);
            }
        }else if(res["type"]=="抱怨热点"){
            var grid_num = res["workorder_id"];// 栅格号
            var gridLngLatArray=userComplainGridLngLat(grid_num,500,100000);
            var maxLng = gridLngLatArray[4];// 最大经度
            var maxLat = gridLngLatArray[5];// 最大纬度
            var minLng = gridLngLatArray[0];// 最小经度
            var minLat = gridLngLatArray[1];// 最小纬度
            var longitude_mid = gridLngLatArray[2];// 中心经度
            var latitude_mid = gridLngLatArray[3];// 中心纬度
            if(!isNull(maxLng)&&!isNull(maxLat)&&!isNull(minLng)&&!isNull(minLat)&&!isNull(res["close_loop"].toString())){
                var obj = {};//type:2,points:pointArr,decide:1,object_id:object_id,scene:type
                obj.type=2;
                obj.points=[new BMap.Point(minLng,maxLat),new BMap.Point(maxLng,maxLat),new BMap.Point(maxLng,minLat),new BMap.Point(minLng,minLat)];
                obj.decide=1;
                obj.id = grid_num;
                obj.workType = res["type"];//d.continued_cycle < 3
                if(res["close_loop"]==1){
                    obj.workOrder="已闭环";
                }else if(res["close_loop"]==0&&res["continued_cycle"]<3){
                    obj.workOrder="未闭环持续3周以内（<3）";
                }else if(res["close_loop"]==0&&res["continued_cycle"]>=3){
                    obj.workOrder="未闭环持续3周以上（≥3）";
                }
                if(isNull(obj.workOrder)){
                    continue;
                }
                obj.continuedCycle=res["continued_cycle"];//持续周期
                obj.closeLoop=res["close_loop"];//是否闭环 1已闭环; 0 持续周期为2 未闭环持续3周以内（<3）; 持续周期为3未闭环持续3周以上（≥3）  0代表为闭环，1代表已闭环
                obj.bandLevel = IntelligentRoadTestSystemLayerV3.getLevelByType(res["type"],obj.workOrder);
                obj.signs = "addComplainHot";
                obj.val=res;
                IntelligentRoadTestSystemLayerV3.ucCanArr.push(obj);
            }

        }
    }
    //$('input[name="complain-hot"]:checked')
    if(hot.length>0){
        IntelligentRoadTestSystemLayerV3.isShowUCGrid=true;//用于用户抱怨栅格是否有选中的标识
    }else{
        IntelligentRoadTestSystemLayerV3.isShowUCGrid=false;
    }
    //根据图例过滤栅格
    var CTData = IntelligentRoadTestSystemLayerV3.ucCanArr;
    if(!IntelligentRoadTest.isThreeNetStatus){
        var colorBarArr=IntelligentRoadTestSystemLayerV3.colorBarArrUC;
        for(var j=0;j<colorBarArr.length;j++){
            CTData = IntelligentRoadTestSystemLayerV3.ClearUCData(CTData,colorBarArr[j]);
        }
    }
    //配置扇区组件按颜色渲染图层
    if(IntelligentRoadTestSystemLayerV3.userComplainCompent == null){
        var mapObj = {
            map:IntelligentRoadTest.map,
            useBandsColor:true,
            bandLevelColor:{
                /*level1:"#ff9900",
                level2:"#69c",
                level3:"#f66",
                level4:"#008000",
                level5:"#6699cc",
                level6:"#f00",
                level7:"#f90",
                level8:"#6699cc",
                level9:"#f30",
                level10:"#9c0"*/
                level1:$("#ly_wuxianceBColor").css("background-color"),
                level2:$("#ly_hexinceNColor").css("background-color"),
                level3:$("#ly_ziyuanleiCColor").css("background-color"),
                level4:$("#ly_yibihuanColor").css("background-color"),
                level5:$("#ly_weibihuanless3Color").css("background-color"),
                level6:$("#ly_weibihuanmore3Color").css("background-color"),
                level7:$("#ly_gongxinbukaoheColor").css("background-color"),
                level8:$("#ly_jituankaoheColor").css("background-color"),
                level9:$("#ly_gongxinbuguidangColor").css("background-color"),
                level10:$("#ly_jituanguidangColor").css("background-color")
            },
            sectorZindex:userZindex,
            lineWidth:0.01,
            opacity:userOpacity
        };
        IntelligentRoadTestSystemLayerV3.userComplainCompent = new SectorUtilForBaidu(mapObj);
    }else{
        // 修改颜色，层级,透明度等
        IntelligentRoadTestSystemLayerV3.userComplainCompent.sectorZindex=userZindex;
        IntelligentRoadTestSystemLayerV3.userComplainCompent.opacity=userOpacity;
        IntelligentRoadTestSystemLayerV3.userComplainCompent.bandLevelColor={
            level1:$("#ly_wuxianceBColor").css("background-color"),
            level2:$("#ly_hexinceNColor").css("background-color"),
            level3:$("#ly_ziyuanleiCColor").css("background-color"),
            level4:$("#ly_yibihuanColor").css("background-color"),
            level5:$("#ly_weibihuanless3Color").css("background-color"),
            level6:$("#ly_weibihuanmore3Color").css("background-color"),
            level7:$("#ly_gongxinbukaoheColor").css("background-color"),
            level8:$("#ly_jituankaoheColor").css("background-color"),
            level9:$("#ly_gongxinbuguidangColor").css("background-color"),
            level10:$("#ly_jituanguidangColor").css("background-color")
        };
    }
    IntelligentRoadTestSystemLayerV3.userComplainCompent.polygonCanvasArr = orderArr.concat(CTData);
    IntelligentRoadTestSystemLayerV3.userComplainCompent.draw();
    IntelligentRoadTestSystemLayerV3.isShowUserComplain = true;

    //只用于存储数据，主要用于在用户点击用户抱怨图层时，获取当前点击的具体对象
    if(IntelligentRoadTest.polygonToLayerComponents==null){
        var bMapObj={
            map:IntelligentRoadTest.map,
            sectorColor:"white",
            circleColor:"white",
            lineColor:"white",
            opacity:"white",
            lineOpacity:1,
            lineWidth:2,
            sectorZindex:0,
        };
        IntelligentRoadTest.polygonToLayerComponents = new SectorUtilForBaidu(bMapObj);
        IntelligentRoadTest.polygonToLayerComponents.polygonCanvasArr=orderArr.concat(CTData);
    }else if(IntelligentRoadTest.polygonToLayerComponents!=null){//清空用户抱怨图层的数据
        var registerPolygonArr=[];
        var polygonCanvasArr=IntelligentRoadTest.polygonToLayerComponents.polygonCanvasArr
        for(var i=0;i<polygonCanvasArr.length;i++){
            if(polygonCanvasArr[i]["signs"]!="addUserComplain"&&polygonCanvasArr[i]["signs"]!="addComplainHot"){
                registerPolygonArr.push(polygonCanvasArr[i]);
            }
        }
        IntelligentRoadTest.polygonToLayerComponents.polygonCanvasArr=registerPolygonArr.concat(orderArr,CTData);
    }
    IntelligentRoadTest.legendGrid();
    IntelligentRoadTest.currentLayerNum+=1;
}
/**
 * ********************************
 * @funcname IntelligentRoadTestSystemLayerV3.showComplainHotGrid
 * @funcdesc 渲染用户抱怨【抱怨热点】的栅格
 * @param {String}city : 地市名称
 * {String} mktcenter_name ：营服中心名称 ,{String} type ： 类型
 * @return {null}
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentRoadTestSystemLayerV3.showComplainHotGrid = function IntelligentRoadTestSystemLayerV3_showComplainHotGrid(city){
  /*  //【用户抱怨】栅格组件
    if(IntelligentRoadTestSystemLayerV3.ucGridMap==null){
        IntelligentRoadTestSystemLayerV3.ucGridMap = new GridMap(IntelligentRoadTest.map, {
            readTileData: null,//瓦片获取数据事件
            opacity: 0.6,//$('#opacity').val(),//透明度
            colorMode: 'range',//gradient:渐变的方式呈现颜色；range:按区间匹配颜色
            divZindex:10,
        });
    }
    //设置栅格门限
    IntelligentRoadTestSystemLayerV3.ucGridMap.setThresholds(IntelligentRoadTestSystemLayerV3.gridUCThresholds);
    IntelligentRoadTestSystemLayerV3.ucGridMap.clear();
    IntelligentRoadTestSystemLayerV3.isShowUCGrid = true;
    IntelligentRoadTestSystemLayerV3.ucCanArr = null;
    IntelligentRoadTestSystemLayerV3.ucCanArr = [];

    var result=IntelligentRoadTest.filterUserComplainData(city , null , null , null,[1,2,3],null);
    for(var i=0;i<result.length;i++){
        var grid_num = result[i]["gridid"];// 栅格号
        var gridLngLatArray=gridLngLat(grid_num,20,100000);
        var maxLng = gridLngLatArray[4];// 最大经度
        var maxLat = gridLngLatArray[5];// 最大纬度
        var minLng = gridLngLatArray[0];// 最小经度
        var minLat = gridLngLatArray[1];// 最小纬度
        var longitude_mid = gridLngLatArray[2];// 中心经度
        var latitude_mid = gridLngLatArray[3];// 中心纬度
        var closeLoop=result[i]["close_loop"];//是否闭环 1已闭环; 2未闭环持续3周以内（<3）; 3未闭环持续3周以上（≥3）
        if(!isNull(closeLoop)){
            var dataChe=[minLng, minLat, maxLng, maxLat, closeLoop, grid_num];
            IntelligentRoadTestSystemLayerV3.ucCanArr.push(dataChe);
        }
    }
    //根据图例过滤栅格后渲染
    if(!IntelligentRoadTest.isThreeNetStatus){
        var CTData = IntelligentRoadTestSystemLayerV3.ucCanArr;
        var colorBarArr=IntelligentRoadTestSystemLayerV3.colorBarArrUC;
        for(var j=0;j<colorBarArr.length;j++){
            CTData = IntelligentRoadTestSystemLayerV3.ClearUCData(CTData,colorBarArr[j]);
        }
        IntelligentRoadTestSystemLayerV3.ucGridMap.draw(CTData);
        CTData = null;
    }*/
}

/**
  * ********************************
  * @funcname IntelligentRoadTestSystemLayerV3.getLevelByType
  * @funcdesc 根据工单类型获取越级工单或者全量工单的颜色level
  * @param {String} type :  全量工单 || 越级工单
  * @param {String}workOrder :  无线侧B  核心侧N  资源类C   对应传入的值为“投诉单”、“NOC投诉单”、“需求单” || "工信部越级","集团越级","越级考核","越级归档"
 * @return {Number} level 颜色等级
  * @author 陈小芳
  * @create
  **********************************
  */
IntelligentRoadTestSystemLayerV3.getLevelByType=function IntelligentRoadTestSystemLayerV3_getLevelByType(type,workOrder){
    var level=0;
    if(type=="全量工单"){
        if(workOrder=="投诉单"){
            level=1;
        }else if(workOrder=="NOC投诉单"){
            level=2;
        }else if(workOrder=="需求单"){
            level=3;
        }

    }else if(type=="抱怨热点"){
        if(workOrder=="已闭环"){
            level=4;
        }else if(workOrder=="未闭环持续3周以内（<3）"){
            level=5;
        }else if(workOrder=="未闭环持续3周以上（≥3）"){
            level=6;
        }

    }else if(type="越级工单"){
        if(workOrder=="工信部越级"){
            level=7;
        }else if(workOrder=="集团越级"){
            level=8;
        }else if(workOrder=="越级考核"){
            level=9;
        }else if(workOrder=="越级归档"){
            level=10;
        }
    }
    return level;
}



//重绘抱怨热点的栅格
/**
 * ********************************
 * @funcname IntelligentRoadTestSystemLayerV3.colorbarEndRedraw
 * @funcdesc 重绘抱怨热点的栅格
 * @param {null}
 * @return {null}
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentRoadTestSystemLayerV3.colorbarEndRedraw=function IntelligentRoadTestSystemLayerV3_colorbarEndRedraw(){
    //根据图例过滤栅格
    var CTData = IntelligentRoadTestSystemLayerV3.ucCanArr;
    if(!IntelligentRoadTest.isThreeNetStatus){
        var colorBarArr=IntelligentRoadTestSystemLayerV3.colorBarArrUC;
        for(var j=0;j<colorBarArr.length;j++){
            CTData = IntelligentRoadTestSystemLayerV3.ClearUCData(CTData,colorBarArr[j]);
        }
    }
    var userComplainArr=[];
    var polygonCanvasArr=IntelligentRoadTestSystemLayerV3.userComplainCompent.polygonCanvasArr;
    for(var i=0;i<polygonCanvasArr.length;i++){
        if(polygonCanvasArr[i]["signs"]!="addComplainHot"){
            userComplainArr.push(polygonCanvasArr[i]);
        }
    }
    IntelligentRoadTestSystemLayerV3.userComplainCompent.polygonCanvasArr=userComplainArr.concat(CTData);
    IntelligentRoadTestSystemLayerV3.userComplainCompent.draw();
    //更新polygonToLayerComponents图层的数据（多边形注册的数据+全量工单+越级工单+抱怨热点）
    var registerPolygonArr=[];
    var polygonCanvasArr=IntelligentRoadTest.polygonToLayerComponents.polygonCanvasArr
    for(var i=0;i<polygonCanvasArr.length;i++){
        if(polygonCanvasArr[i]["signs"]!="addUserComplain"&&polygonCanvasArr[i]["signs"]!="addComplainHot"){
            registerPolygonArr.push(polygonCanvasArr[i]);
        }
    }
    IntelligentRoadTest.polygonToLayerComponents.polygonCanvasArr=registerPolygonArr.concat(userComplainArr,CTData);
}

/**
  * ********************************
  * @funcname IntelligentRoadTestSystemLayerV3.ClearUCData
  * @funcdesc 根据图例id过滤【用户抱怨】的栅格数据，一般用户图例点击或者需要重绘的时候
  * @param {Array} data 需要过滤的栅格数据【用户抱怨】
  * @param {String}id 图例id
  * @return {Array} newTileData 需要重新渲染的抱怨热点数据
  * @author 陈小芳
  * @create
  **********************************
  */
IntelligentRoadTestSystemLayerV3.ClearUCData = function IntelligentRoadTest_ClearUCData(data,id){
    var newTileData = [];
    for(var i=0;i<data.length;i++){
        if(id=="1"){//已闭环 去掉等于1的
            if(data[i]["closeLoop"]!=1){
                newTileData.push(data[i]);
            }
        }else if(id=="2"){//未闭环 去掉等于closeLoop=0,并且持续周期<3的
            if(data[i]["closeLoop"]!=0||data[i]["continuedCycle"]>=3){
                newTileData.push(data[i]);
            }
        }else if(id=="3"){//未闭环 去掉等于closeLoop=0,并且持续周期>=3的
            if(data[i]["closeLoop"]!=0||data[i]["continuedCycle"]<3){
                newTileData.push(data[i]);
            }
        }else{
            newTileData.push(data[i]);
        }
    }
    return newTileData;
}

//计算当前地图级别一像素等于多少米
/**
 * ********************************
 * @funcname IntelligentRoadTestSystemLayerV3.getMeterOnMap
 * @funcdesc 计算当前地图级别一像素等于多少米
 * @param {null}
 * @param {null}
 * @return {Number} meter 返回当前1像素的距离（米）
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentRoadTestSystemLayerV3.getMeterOnMap = function IntelligentRoadTest_getMeterOnMap(){
    var point=IntelligentRoadTest.map.getCenter();
    var pixel=IntelligentRoadTest.map.pointToPixel(point);
    var endPoint=IntelligentRoadTest.map.pixelToPoint(new BMap.Pixel(pixel.x+1,pixel.y));
    var meter=IntelligentRoadTest.map.getDistance(point,endPoint);
    return meter;
}

//用于高亮越级工单和全量工单
/**
 * ********************************
 * @funcname IntelligentRoadTestSystemLayerV3.highLightUserComplain
 * @funcdesc 用于进入详情页高亮越级工单和全量工单、抱怨热点
 * @param {Object} result 具体工单的对象数据
 * @param {String} objType 具体工单对象详情页标识
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentRoadTestSystemLayerV3.highLightUserComplain=function IntelligentRoadTestSystemLayerV3_highLightUserComplain(result,objType){
    IntelligentRoadTest.map.removeOverlay(IntelligentRoadTestSystemLayerV3.hLUserComplain);
    if(result.longitude==0||result.latitude==0){
        return;
    }
    if(IntelligentRoadTestSystemLayerV3.hLUserComplain){
        //注销
        var itemData = {
            obj_type:IntelligentRoadTestSystemLayerV3.hLUserComplain.obj_type,
            pointsString:null,
            point:null,
            obj_id:IntelligentRoadTestSystemLayerV3.hLUserComplain.obj_id
        };
        IntelligentRoadTest.logOutPolygonToLayer(itemData);
    }
    IntelligentRoadTestSystemLayerV3.hLUserComplain=null;
    if(result.type=="抱怨热点"){
        var grid_num = result["workorder_id"];// 栅格号
        var gridLngLatArray=userComplainGridLngLat(grid_num,500,100000);
        var maxLng = gridLngLatArray[4];// 最大经度
        var maxLat = gridLngLatArray[5];// 最大纬度
        var minLng = gridLngLatArray[0];// 最小经度
        var minLat = gridLngLatArray[1];// 最小纬度
        var longitude_mid = gridLngLatArray[2];// 中心经度
        var latitude_mid = gridLngLatArray[3];// 中心纬度
        var pointArr=[new BMap.Point(minLng,maxLat),new BMap.Point(maxLng,maxLat),new BMap.Point(maxLng,minLat),new BMap.Point(minLng,minLat)];
        var  styleOptions = {
           strokeColor:"#9ffb13",  //边线颜色。
           strokeWeight: 4,       //边线的宽度，以像素为单位。
           strokeOpacity: 1,	   //边线透明度，取值范围0 - 1。
           fillOpacity: 0.1     //填充的透明度，取值范围0 - 1。
           // strokeStyle: 'dashed' //边线的样式，solid或dashed。
       }
        var polygon = new BMap.Polygon(pointArr,styleOptions);
        polygon.addEventListener("click",function (e){
            console.log("抱怨热点的弹框");
            setTimeout(function(){
                $("#cirTipLeft").show();
                IntelligentRoadTest.resizeInfoWindow();
            },200)
        });
        polygon.obj_type=objType;
        polygon.obj_id=grid_num;
        IntelligentRoadTestSystemLayerV3.hLUserComplain=polygon;

        //  将多边形注册到图层对象
        var itemData = {
            obj_type:objType,
            points:pointArr,
            type:2,
            decide:1,
            pointsString:pointArr,
            radiusL: 13,
            obj_id:grid_num

        };
        IntelligentRoadTest.registeredPolygonToLayer(itemData);
    }else{
        var point = new BMap.Point(result.longitude,result.latitude);
        var myIcon = new BMap.Icon("../js/IntelligentRoadTestV3/images/work_order.png", new BMap.Size(34,34));
        var marker = new BMap.Marker(point,{icon:myIcon});
        marker.setOffset(
            new BMap.Size(0, 0)
        );
        marker.setZIndex(10);
        marker.addEventListener("click",function (e){
            setTimeout(function(){
                $("#cirTipLeft").show();
                IntelligentRoadTest.resizeInfoWindow();
            },100)
        });
        IntelligentRoadTestSystemLayerV3.hLUserComplain=marker;
        IntelligentRoadTestSystemLayerV3.hLUserComplain.obj_type=objType;
        IntelligentRoadTestSystemLayerV3.hLUserComplain.obj_id=result.workorder_id;
        //  将多边形注册到图层对象
        var itemData = {
            obj_type:objType,
            point:point,
            type:1,
            decide:1,
            pointsString:point,
            radiusL: 13,
            obj_id:result.workorder_id

        };
        IntelligentRoadTest.registeredPolygonToLayer(itemData);
    }

   IntelligentRoadTest.map.addOverlay(IntelligentRoadTestSystemLayerV3.hLUserComplain);




}


//根据分类筛选选项，更新图层配置
/**
 * ********************************
 * @funcname IntelligentRoadTestSystemLayerV3.setUcByList
 * @funcdesc 根据分类筛选选项，更新图层配置
 * @param {Array} allAlarmInfo ：全量工单的value数据
 * @param {Array} hotComplain ：抱怨工单的value数据
 * @param {Array} crossLevelAlarmInfo ：越级工单的value数据
 * @return
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentRoadTestSystemLayerV3.setUcByList=function IntelligentRoadTestSystemLayerV3_setUcByList(allAlarmInfo,hotComplain,crossLevelAlarmInfo){
    $("#userComplain").parents("tr").siblings().children().find("input:checkbox").attr("checked",false);
    $("#userComplain").parents("tr").siblings().children().find("input:checkbox").siblings('label').css("color","");
    for(var i=0;i<allAlarmInfo.length;i++){ //全量工单
        if(!$('input[name="full-order"][value="'+allAlarmInfo[i]+'"]').is(":checked")){
            $('input[name="full-order"][value="'+allAlarmInfo[i]+'"]').click();
        }
    }
    for(var i=0;i<hotComplain.length;i++){//抱怨工单
        if(!$('input[name="complain-hot"][value="'+hotComplain[i]+'"]').is(":checked")){
            $('input[name="complain-hot"][value="'+hotComplain[i]+'"]').click();
        }
    }
    for(var i=0;i<crossLevelAlarmInfo.length;i++){//越级工单
        if(!$('input[name="over-order"][value="'+crossLevelAlarmInfo[i]+'"]').is(":checked")){
            $('input[name="over-order"][value="'+crossLevelAlarmInfo[i]+'"]').click();
        }
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTestSystemLayerV3.initUC
 * @funcdesc 获取用户抱怨列表中分类筛选数据，更新图层配置
 * @param {null}
 * @return {null}
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentRoadTestSystemLayerV3.initUC=function IntelligentRoadTestSystemLayerV3_initUC(){
    var allAlarmInfo = []; //全量工单条件数组
    var hotComplain = [];//抱怨热点条件数组
    var crossLevelAlarmInfo = [];//越级工单条件数组
    var checkBoxList = $(".userComplainTB input:checked");
    for(var i = 0; i < checkBoxList.length; i++){
        var elementID = $(checkBoxList[i]).attr("id");
        switch(elementID) {
            case 'wuxianceB' :
                allAlarmInfo.push("投诉单");
                break;
            case 'hexinceN' :
                allAlarmInfo.push("NOC投诉单");
                break;
            case 'ziyuanleiC' :
                allAlarmInfo.push("需求单");
                break;
            case 'yibihuan' :
                hotComplain.push(1);
                break;
            case 'weibihuanless3' :
                hotComplain.push(2);
                break;
            case 'weibihuanmore3' :
                hotComplain.push(3);
                break;
            case 'gongxinbukaohe' :
                crossLevelAlarmInfo.push("工信部越级");
                break;
            case 'jituankaohe' :
                crossLevelAlarmInfo.push("集团越级");
                break;
            case 'gongxinbuguidang' :
                crossLevelAlarmInfo.push("越级考核");
                break;
            case 'jituanguidang' :
                crossLevelAlarmInfo.push("越级归档");
                break;
        }
    }
    IntelligentRoadTest.userComplainFilterConditonArr = {
        allAlarmInfo : allAlarmInfo, //全量工单条件数组
        hotComplain : hotComplain , //抱怨热点条件数组
        crossLevelAlarmInfo:crossLevelAlarmInfo//越级工单条件数组
    }

    //获取分类筛选的选择结果
    IntelligentRoadTestSystemLayerV3.setUcByList(allAlarmInfo,hotComplain,crossLevelAlarmInfo);//更新图层和图例
}

//------------------------------------用户抱怨图层end--------------------------------------------------------------

/**
 * ********************************
 * @funcname IntelligentRoadTestSystemLayerV3.getSectorCondition
 * @funcdesc 通过扇区图层配置的信息，拼接扇区设备厂家和专题扇区的查询条件
 * @param {Array} sectorFactory 设备厂家勾选的配置 [华为，中兴，爱立信，其它]
 * @param {Array} sectorCov 专题扇区勾选的配置 ["MOD3干扰扇区","越区覆盖扇区","重叠覆盖扇区","其它"] [26,28,27,3] [IS_M3_COV,IS_CB_COV,IS_OL_COV,其它]
 * @return {String} queryCondition 根据用户配置拼接好的扇区设备厂家和专题扇区的查询条件
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentRoadTestSystemLayerV3.getSectorCondition=function IntelligentRoadTestSystemLayerV3_getSectorCondition(sectorFactory,sectorCov){
    var queryCondition="AND nb_flag = 0 ";
    if(sectorFactory.length>0&&sectorFactory.length<4){
        var sectorFactoryNot=[];
        //没有勾选的厂家
        $('input:checkbox[name="factory-sector"]:not(:checked)').each(function(i){
            sectorFactoryNot.push($(this).val());
        });
        queryCondition +=IntelligentRoadTestSystemLayerV3.getFactoryCondition(sectorFactory,sectorFactoryNot);
    }/*else if(sectorFactory.length==0){//没有勾选任何厂家
        queryCondition += " and BS_VENDOR='' ";
    }*/

    if(sectorCov.length>0&&sectorCov.length<4){
        var cov=sectorCov.join(",");
        if(sectorCov.length>1){//勾选了多个专题
            if(cov.indexOf("其它")>-1){//并勾选了“其它”选项
                queryCondition += " and ((IS_CB_COV <> 1 and IS_OL_COV <> 1 and IS_M3_COV <> 1) ";
                sectorCov.forEach(function(value,i){
                    if(value!="其它"){
                        queryCondition += " or "+value+"=1  ";
                    }
                });
                queryCondition += " ) ";
            }else{
                queryCondition += " and ( ";
                sectorCov.forEach(function(value,i){
                    if(i==0){
                        queryCondition += value+"=1 ";
                    }else{
                        queryCondition += " or "+value+"=1 ";
                    }
                });
                queryCondition += " ) ";
            }
        }else{//只勾选了一个专题
            if(sectorCov[0]=="其它"){//并勾选了“其它”选项
                queryCondition += " and (IS_CB_COV <> 1 and IS_OL_COV <> 1 and IS_M3_COV <> 1) ";
            }else{
                queryCondition += " and "+sectorCov[0]+"=1 ";
            }

        }
    }/*else if(sectorCov.length==0){
        queryCondition += " and (IS_CB_COV = '' and IS_OL_COV = '' and IS_M3_COV = '') ";
    }*/

    return queryCondition;


}

//拼接厂家的查询条件,提供给基站组件使用
IntelligentRoadTestSystemLayerV3.getFactoryCondition=function IntelligentRoadTestSystemLayerV3_getFactoryCondition(sectorFactory,sectorFactoryNot){
    var factory=sectorFactory.join(",");
    var factoryNot=sectorFactoryNot.join(",");

    var queryCondition = " ";

    if(factory.indexOf(",")>-1){//勾选了多个厂家
        if(factory.indexOf("其它")>-1){//并勾选了“其它”选项
            var factory_new = factoryNot.replace(/\,/g,"','");
            queryCondition += " and BS_VENDOR not in ('"+factory_new+"') ";
        }else{
            var factory_new = factory.replace(/\,/g,"','");
            queryCondition += " and BS_VENDOR in ('"+factory_new+"') ";
        }
    }else{//只勾选了一个厂家
        if(factory=="其它"){//并勾选了“其它”选项
            var factory_new = factoryNot.replace(/\,/g,"','");
            queryCondition += " and BS_VENDOR not in ('"+factory_new+"') ";
        }else{
            queryCondition += " and BS_VENDOR='"+factory+"' ";
        }
    }
    return queryCondition;
}


//4g基站组件对象渲染4G基站
/**
 * ********************************
 * @funcname IntelligentRoadTestSystemLayerV3.sectorLayerData
 * @funcdesc 通过扇区图层配置的信息，拼接2g基站组件对象的查询条件渲染4G基站
 * @param {String} city 查询的地市
 * @param {Number} sectorZindex 4G基站对应的层级
 * @param {Numer} sectorOpacity 4G基站透明度
 * @param {Array} factoryArr 设备厂家勾选的配置 [华为，中兴，爱立信，其它]
 * @param {Object} systemLayerOld 未更新缓存前的本地存储数据
 * @param {Object} systemLayer 需要更新的本地缓存数据
 * @return {String} queryCondition 根据用户配置拼接好的扇区设备厂家和专题扇区的查询条件
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentRoadTestSystemLayerV3.sectorLayerData=function IntelligentRoadTestSystemLayerV3_sectorLayerData(city,sectorZindex,sectorOpacity,factoryArr,systemLayerOld,systemLayer) {
    if ($('#sector').is(':checked')) {//是否需要加载基站数据
        if (IntelligentRoadTest.requery || !systemLayerOld.sector.selected || JSON.stringify(systemLayerOld.sector.type) != JSON.stringify(systemLayer.sector.type)
            || JSON.stringify(systemLayerOld.sector.band) != JSON.stringify(systemLayer.sector.band)
            || JSON.stringify(systemLayerOld.sector.factory) != JSON.stringify(systemLayer.sector.factory)
            || JSON.stringify(systemLayerOld.sector.covSector) != JSON.stringify(systemLayer.sector.covSector)) {//需要重新查数
            if (IntelligentRoadTest.isShowBaiduMap) {
                IntelligentRoadTest.sectorCompent.queryConditionIschange = true;
                IntelligentRoadTest.sectorCompent.allDataFlagIsCompleted = false;
            } else {
                IntelligentRoadTest.sectorCompentForOsm.queryConditionIschange = true;
                IntelligentRoadTest.sectorCompentForOsm.allDataFlagIsCompleted = false;
            }
        }
        IntelligentRoadTest.isShowSector = true;
        if(IntelligentRoadTest.showNrCover ){
            IntelligentRoadTest.sectorCompent.useScopeQuery = true;
            // IntelligentRoadTest.sectorCompent.scopeDistance = 2;
        }else{
            IntelligentRoadTest.sectorCompent.useScopeQuery = false;
            // IntelligentRoadTest.sectorCompent.scopeDistance = 3;
        }
        if(IntelligentRoadTest.cityPermission_common == '全省'){
            IntelligentRoadTest.sectorCompent.selectCity = null;
        }else{
            IntelligentRoadTest.sectorCompent.selectCity = city;
            //补充区县的限制条件
            if(!isNull(IntelligentRoadTest.countryPermission_common)){ //区县条件不为空，则说明是区县用户，这里要将区县信息也加入进去
                IntelligentRoadTest.sectorCompent.selectDistrict = IntelligentRoadTest.countryPermission_common;
            }
        }


        IntelligentRoadTest.sectorCompent.selectTime = IntelligentRoadTest.day;
        IntelligentRoadTest.sectorCompent.sectorZindex = sectorZindex;
        var sectorType=systemLayer.sector.type;
        var sectorBand=systemLayer.sector.band;
        var sectorFactory=systemLayer.sector.factory;
        var sectorCov=systemLayer.sector.covSector;

        //根据扇区图层配置更改组件参数
        if (sectorType.length == 3) {
            IntelligentRoadTest.sectorCompent.indoor = null;
        } else {
            IntelligentRoadTest.sectorCompent.indoor = sectorType.join(",");
        }
        if (sectorBand.length == 4) {
            IntelligentRoadTest.sectorCompent.band = null;
        } else {
            IntelligentRoadTest.sectorCompent.band = sectorBand.join(",");
        }


        IntelligentRoadTest.sectorCompent.useOptionColor = true;
        IntelligentRoadTest.sectorCompent.optionColor = {
            field: 'bs_vendor',
            option: [
                {
                    level: '0',
                    color: $('input:checkbox[name="factory-sector"][value="其它"]').next().css('background-color')
                },
                {
                    level: '1',
                    color: $('input:checkbox[name="factory-sector"][value="中兴"]').next().css('background-color')
                },
                {
                    level: '2',
                    color: $('input:checkbox[name="factory-sector"][value="华为"]').next().css('background-color')
                },
                {
                    level: '3',
                    color: $('input:checkbox[name="factory-sector"][value="爱立信"]').next().css('background-color')
                }]
        };
        IntelligentRoadTest.sectorCompent.optionChangeFunc = IntelligentRoadTest.factoryLevel;
        var queryCondition = IntelligentRoadTestSystemLayerV3.getSectorCondition(factoryArr, sectorCov);
        IntelligentRoadTest.sectorCompent.queryCondition = queryCondition;


        IntelligentRoadTest.sectorCompentForOsm.selectCity = city;
        IntelligentRoadTest.sectorCompentForOsm.selectTime = IntelligentRoadTest.day;
        IntelligentRoadTest.sectorCompentForOsm.sectorZindex = sectorZindex;
        if (sectorType.length == 3) {
            IntelligentRoadTest.sectorCompentForOsm.indoor = null;
        } else {
            IntelligentRoadTest.sectorCompentForOsm.indoor = sectorType.join(",");
        }
        if (sectorBand.length == 4) {
            IntelligentRoadTest.sectorCompentForOsm.band = null;
        } else {
            IntelligentRoadTest.sectorCompentForOsm.band = sectorBand.join(",");
        }

        if (sectorType.length > 0 && sectorBand.length > 0 && factoryArr.length > 0 && sectorCov.length > 0) {
            if (IntelligentRoadTest.isShowBaiduMap) {
                IntelligentRoadTest.sectorCompent.opacity = sectorOpacity;
                IntelligentRoadTest.sectorCompent.queryByTemplate();
                IntelligentRoadTest.sectorCompent.setOpacity(sectorOpacity, true);
            } else {
                IntelligentRoadTest.sectorCompentForOsm.opacity = sectorOpacity;
                IntelligentRoadTest.sectorCompentForOsm.queryByTemplate();
                IntelligentRoadTest.sectorCompentForOsm.setOpacity(sectorOpacity, true);
            }
        } else {
            IntelligentRoadTest.sectorCompent.clear();
            if (IntelligentRoadTest.sectorCompentForOsm) {
                IntelligentRoadTest.sectorCompentForOsm.clear();
            }
        }

    } else {
        IntelligentRoadTest.isShowSector = false;
        IntelligentRoadTest.sectorCompent.clear();
        if (IntelligentRoadTest.sectorCompentForOsm) {
            IntelligentRoadTest.sectorCompentForOsm.clear();
        }
    }
}


//2g基站组件对象渲染2G基站
/**
 * ********************************
 * @funcname IntelligentRoadTestSystemLayerV3.sector2GLayerData
 * @funcdesc 通过扇区图层配置的信息，拼接2g基站组件对象的查询条件渲染2G基站
 * @param {String} city 查询的地市
 * @param {Number} sector2GZindex 2G基站对应的层级
 * @param {Numer} sector2GOpacity 2G基站透明度
 * @param {Array} factory2GArr 设备厂家勾选的配置 [华为，中兴，阿朗，其它]
 * @param {Object} systemLayerOld 未更新缓存前的本地存储数据
 * @param {Object} systemLayer 需要更新的本地缓存数据
 * @return {String} queryCondition 根据用户配置拼接好的扇区设备厂家和专题扇区的查询条件
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentRoadTestSystemLayerV3.sector2GLayerData=function IntelligentRoadTestSystemLayerV3_sector2GLayerData(city,sector2GZindex,sector2GOpacity,factory2GArr,systemLayerOld,systemLayer) {
    if ($('#sector2G').is(':checked')) {//是否需要加载2g基站数据
        if (IntelligentRoadTest.requery || !systemLayerOld.sector2G.selected
            || JSON.stringify(systemLayerOld.sector2G.factory) != JSON.stringify(systemLayer.sector2G.factory)) {//需要重新查数
            IntelligentRoadTest.sector2GCompent.queryConditionIschange = true;
            IntelligentRoadTest.sector2GCompent.allDataFlagIsCompleted = false;
        }
        IntelligentRoadTest.isShow2GSector = true;
        if(IntelligentRoadTest.showNrCover ){
            IntelligentRoadTest.sector2GCompent.useScopeQuery = true;
            // IntelligentRoadTest.sectorCompent.scopeDistance = 2;
        }else{
            IntelligentRoadTest.sector2GCompent.useScopeQuery = false;
            // IntelligentRoadTest.sectorCompent.scopeDistance = 3;
        }
        if(IntelligentRoadTest.cityPermission_common == '全省'){
            IntelligentRoadTest.sector2GCompent.selectCity = null;
        }else{
            IntelligentRoadTest.sector2GCompent.selectCity = city;
            //补充区县的限制条件
            if(!isNull(IntelligentRoadTest.countryPermission_common)){ //区县条件不为空，则说明是区县用户，这里要将区县信息也加入进去
                IntelligentRoadTest.sector2GCompent.selectDistrict = IntelligentRoadTest.countryPermission_common;
            }
        }


        IntelligentRoadTest.sector2GCompent.selectTime = IntelligentRoadTest.day;
        IntelligentRoadTest.sector2GCompent.sectorZindex = sector2GZindex;
        IntelligentRoadTest.sector2GCompent.opacity=sector2GOpacity;
        IntelligentRoadTest.sector2GCompent.useOptionColor = true;
        IntelligentRoadTest.sector2GCompent.optionColor = {
            field: 'bs_vendor',
            option: [
                {
                    level: '0',
                    color: $('input:checkbox[name="factory-sector-2g"][value="其它"]').next().css('background-color')
                },
                {
                    level: '1',
                    color: $('input:checkbox[name="factory-sector-2g"][value="中兴"]').next().css('background-color')
                },
                {
                    level: '2',
                    color: $('input:checkbox[name="factory-sector-2g"][value="华为"]').next().css('background-color')
                },
                {
                    level: '4',
                    color: $('input:checkbox[name="factory-sector-2g"][value="阿朗"]').next().css('background-color')
                }]
        };
        IntelligentRoadTest.sector2GCompent.optionChangeFunc = IntelligentRoadTest.factoryLevel;
        var queryCondition=" ";
        if(factory2GArr.length>0&&factory2GArr.length<4){
            var sector2GFactoryNot=[];
            //没有勾选的厂家
            $('input:checkbox[name="factory-sector-2g"]:not(:checked)').each(function(i){
                sector2GFactoryNot.push($(this).val());
            });
            queryCondition +=IntelligentRoadTestSystemLayerV3.getFactoryCondition(factory2GArr,sector2GFactoryNot);
        }
        IntelligentRoadTest.sector2GCompent.queryCondition = queryCondition;
        IntelligentRoadTest.sector2GCompent.queryByTemplate();
    } else {
        IntelligentRoadTest.isShow2GSector = false;
        IntelligentRoadTest.sector2GCompent.clear();
    }
}


/**
 * ********************************
 * @funcname IntelligentRoadTestSystemLayerV3.drawSectorData
 * @funcdesc 通过扇区图层配置的信息，拼接2g基站组件对象的查询条件渲染基站
 * @param {Boolean} isRun 是否需要渲染或者移除扇区 true:渲染  false:移除
 * @return {null}
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentRoadTestSystemLayerV3.drawSectorData=function IntelligentRoadTestSystemLayerV3_drawSectorData(isRun){
    if(isRun){
        IntelligentRoadTest.isShowSector = true;
        IntelligentRoadTest.sectorCompent.queryByTemplate();
    }else{
        IntelligentRoadTest.sectorCompent.clear();
        IntelligentRoadTest.isShowSector = false;
    }
}

/**
 * ********************************
 * @funcname IntelligentRoadTestSystemLayerV3.drawSector2GData
 * @funcdesc 通过扇区图层配置的信息，拼接2g基站组件对象的查询条件渲染2G基站
 * @param {Boolean} isRun 是否需要渲染或者移除扇区 true:渲染  false:移除
 * @return {null}
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentRoadTestSystemLayerV3.drawSector2GData=function IntelligentRoadTestSystemLayerV3_drawSector2GData(isRun){
    if(isRun){
        IntelligentRoadTest.isShow2GSector = true;
        IntelligentRoadTest.sector2GCompent.queryByTemplate();
    }else{
        IntelligentRoadTest.sector2GCompent.clear();
        IntelligentRoadTest.isShow2GSector = false;
    }

}

/**
 * ********************************
 * @funcname IntelligentRoadTestSystemLayerV3.drawNrCoverGrid
 * @funcdesc 显示附近覆盖栅格
 * @param {null}
 * @return {null}
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentRoadTestSystemLayerV3.drawNrCoverGrid=function IntelligentRoadTestSystemLayerV3_drawNrCoverGrid(){
    //显示附近覆盖栅格
    if(IntelligentRoadTest.showNrCover){
        if(Array.isArray(IntelligentRoadTest.maxlnglat_minlnglat)){
            let lnglat = IntelligentRoadTest.maxlnglat_minlnglat;
            IntelligentRoadTest.loadGrid(lnglat[0], lnglat[1], lnglat[2], lnglat[3]);
        }

    }
}

//根据栅格图层配置加载栅格的图层代码,同时判断查询栅格是否有缓存,有则直接使用上一次的栅格渲染,否则重新查询栅格
/**
 * ********************************
 * @funcname IntelligentRoadTestSystemLayerV3.gridLayerData
 * @funcdesc 当用户切换栅格图层的选项后点击确定需要触发下面的代码
 * @param {null}
 * @return {null}
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentRoadTestSystemLayerV3.gridLayerData=function IntelligentRoadTestSystemLayerV3_gridLayerData() {
    if (IntelligentRoadTest.isShowGrid && IntelligentRoadTest.isShowDTGrid == false) {
        if (IntelligentRoadTest.index == 13) {//框选的时候
            var lnglat = IntelligentRoadTest.maxlnglat_minlnglat
            var maxlng_maxlat_minlng_minlat = lnglat[0] + "," + lnglat[1] + "," + lnglat[2] + "," + lnglat[3];
            var progressBarSqls = [];
            var functionlist = [];
            var dataBase = [];
            if (IntelligentRoadTest.isThreeNetStatus) {//框选三网
                if (maxlng_maxlat_minlng_minlat + getPreMonth(IntelligentRoadTest.day) == IntelligentRoadTest.maxlng_maxlat_minlng_minlatThree) {
                    if (IntelligentRoadTest.gridThreeData) {
                        IntelligentRoadTestSystemLayerV3.filterThreeGridData(IntelligentRoadTest.gridThreeData);
                    }

                } else {
                    var ajaxThreeObj = IntelligentRoadTestSystemLayerV3.loadThreeBoxGrid(maxlng_maxlat_minlng_minlat);
                    progressBarSqls.push(ajaxThreeObj.progressBarSqls);
                    functionlist.push(ajaxThreeObj.functionlist);
                    dataBase.push(ajaxThreeObj.dataBase);
                    IntelligentRoadTest.loadLayerNum += 1;
                }
            }
            if (maxlng_maxlat_minlng_minlat + IntelligentRoadTest.day + IntelligentRoadTest.gridType + IntelligentRoadTestSystemLayerV3.getCloumnsList() + IntelligentRoadTest.gridTime == IntelligentRoadTest.maxlng_maxlat_minlng_minlat) {
                if (IntelligentRoadTest.gridDataV2) {
                    IntelligentRoadTestSystemLayerV3.filterAreaGridData(IntelligentRoadTest.gridDataV2);
                }

            } else {
                var ajaxAreaObj = IntelligentRoadTestSystemLayerV3.loadAreaBoxGrid(maxlng_maxlat_minlng_minlat);
                progressBarSqls.push(ajaxAreaObj.progressBarSqls);
                functionlist.push(ajaxAreaObj.functionlist);
                dataBase.push(ajaxAreaObj.dataBase);
                IntelligentRoadTest.loadLayerNum += 1;
            }

            if (progressBarSqls.length > 0 && functionlist.length > 0 && dataBase.length > 0) {
                progressbarTwo.submitSql(progressBarSqls, functionlist, dataBase);
            }
        } else {
            if (IntelligentRoadTest.currentLocation.toLowerCase().endsWith("sector")) {//重新查询扇区的栅格数据
                var item = IntelligentRoadTest.cacheItem;
                var object_id = item.enodeb_id * 256 + item.cell_id;
                IntelligentRoadTest.loadPoorAreaGrid(IntelligentRoadTest.day, item.city_id, item.country_id, object_id, 1, item.enodeb_id, item.cell_id);

            } else {//重新查询场景或弱区栅格的数据
                var lnglat = IntelligentRoadTest.maxlnglat_minlnglat;
                IntelligentRoadTest.loadGrid(lnglat[0], lnglat[1], lnglat[2], lnglat[3]);
            }
        }
    }
}

/*移动站址取数*/
IntelligentRoadTestSystemLayerV3.sectorYDLayerData = function (city,sectorYDZindex,sectorYDOpacity){
    if ($('#yd_sector').is(':checked')) {//是否需要加载2g基站数据
        let yd_sectorColor =$('#yd-factory-color').css('background-color');
        if (IntelligentRoadTest.sectorYDCompent == null) {
            var bMapObjPoor = {
                map: IntelligentRoadTest.map,
                sectorColor: "white",
                circleColor: "white",
                lineColor: yd_sectorColor,
                opacity: sectorYDOpacity,
                lineOpacity: sectorYDOpacity,
                lineWidth: 2,
                sectorZindex: sectorYDZindex,
            };
            IntelligentRoadTest.sectorYDCompent = new SectorUtilForBaidu(bMapObjPoor);
        } else {
            IntelligentRoadTest.sectorYDCompent.opacity = sectorYDOpacity;
            IntelligentRoadTest.sectorYDCompent.lineOpacity = sectorYDOpacity;
            IntelligentRoadTest.sectorYDCompent.lineColor = yd_sectorColor;
            IntelligentRoadTest.sectorYDCompent.sectorZindex = sectorYDZindex;
        }

        IntelligentRoadTest.sectorYDCompent.useBandsColor = true;
        IntelligentRoadTest.sectorYDCompent.bandLevelColor = {
            level1:yd_sectorColor,
            level2:yd_sectorColor,
        }

        IntelligentRoadTest.isShowYDSector = true;
        let ydSectorDay = '20190225';//IntelligentRoadTest.day;
        let queryList = ['IntelligentRoadTestV5_ydsector_detail','CITY:'+city,'DAY:'+ydSectorDay];
        let callbackFunc = [IntelligentRoadTestSystemLayerV3.ydSectorLayerDataBack];
        let sqlList = [queryList]
        progressbarTwo.submitSql(sqlList,callbackFunc,[3]);

    } else {
        IntelligentRoadTest.isShowYDSector = false;
        if(IntelligentRoadTest.sectorYDCompent){
            IntelligentRoadTest.sectorYDCompent.clear();
        }

    }
}
/*移动站址渲染*/
IntelligentRoadTestSystemLayerV3.ydSectorLayerDataBack = function IntelligentRoadTestSystemLayerV3_ydSectorLayerDataBack(data){
    let result = callBackChangeData(data);
    let compentData = [];
    for(let i=0;i<result.length;i++){
        let point = new BMap.Point(result[i].longitude_baidu,result[i].latitude_baidu);
        let distanceLength = IntelligentRoadTest.LngDistince(point,20,IntelligentRoadTest.map);
        let pointArr = CalculationTrianglePoint(point.lng,point.lat,distanceLength);
        let ydSectorObj = {
            type: 2,
            points: pointArr,
            decide: 1,
            cen_point:point,
            bandtype:result[i].bandtype,
            coveragetype:result[i].coveragetype,
            name: result[i].enodebname,
            bandLevel:1,
            obj_id:i,
        };
        compentData.push(ydSectorObj);
    }
    IntelligentRoadTest.sectorYDCompent.polygonCanvasArr = compentData;
    if ($('#yd_sector').is(':checked')) {
        IntelligentRoadTest.sectorYDCompent.draw();
    }else{
        IntelligentRoadTest.sectorYDCompent.clear();
    }


}
//length:边长
function CalculationTrianglePoint(lng,lat,length){
    let distance = Math.sqrt(3)*length/3;
    let p1 = new BMap.Point(lng,lat+distance);//{x:x,y:y-distance};
    let p2 = new BMap.Point(lng-length/2,lat+distance/6);//{x:x-length/2,y:y+distance/6}
    let p3 = new BMap.Point(lng+length/2,lat+distance/6);//{x:x+length/2,y:y+distance/6}
    return [p1,p2,p3];
}

IntelligentRoadTestSystemLayerV3.query2GSectorInfo = function (sectorInfo){
    let sectorInfoId = sectorInfo.statn_id*100000+sectorInfo.sector_id*10000+sectorInfo.bsc_id
    //console.log('查询2G扇区。。。',sectorInfo);
    let queryList = ['SectorUtilForBaidu_02_querySector_ClickSector','DAY:'+IntelligentRoadTest.day,'CITYID:'+sectorInfo.city_id,'BSTIDANDCELLID:'+sectorInfoId];
    var sqlList = [queryList];
    var functionList = [IntelligentRoadTestSystemLayerV3.show2GSectorInfo];
    progressbarTwo.submitSql(sqlList, functionList ,[3] );
}

IntelligentRoadTestSystemLayerV3.show2GSectorInfo = function IntelligentRoadTestSystemLayerV3_show2GSectorInfo(data){
    let result = callBackChangeData(data);
    if(result.length == 1){
        let sector2GPoint = new BMap.Point(result[0].longitude_baidu,result[0].latitude_baidu);
        let sector2GInfo = [
            {key:'扇区名称',val:result[0].sector_name},
            {key:'地市',val:result[0].city_name},
            {key:'基站厂家',val:result[0].bs_vendor},
            {key:'BSC编码',val:result[0].bsc_id},
            {key:'基站ID',val:result[0].base_statn_id},
            {key:'扇区编码',val:result[0].sector_id},
            {key:'天线方位角',val:result[0].ant_azimuth},
            {key:'天线挂高',val:result[0].high},
            {key:'频点',val:result[0].band},
            {key:'总下倾角',val:result[0].total_declination_angle},
        ]
        IntelligentRoadTest.openInfoWindowTwo(sector2GPoint.lng,sector2GPoint.lat,sector2GInfo);
    }

}


//根据图层中的栅格数据的value值获取对应名称
function getGridTypeName(gridType){
    var name="AGPS-MR";
    if(gridType==0){
        name="全量MR综合";
    }else if(gridType==3){
        name="全量MR室外";
    }else if(gridType==2){
        name="全量MR室内";
    }
    return name;
}

//置空对应图例的缓存
function clearColorBarArr(type){
    if(type=="line"){
        if(IntelligentRoadTest.lineTypeIndex==0){//覆盖质量
            IntelligentRoadTest.colorBarArrLine = [];
        }else if(IntelligentRoadTest.lineTypeIndex==1){//上行速率
            IntelligentRoadTest.colorBarArrSHLine = [];
        }else if(IntelligentRoadTest.lineTypeIndex==2){//下行速率
            IntelligentRoadTest.colorBarArrXHLine = [];
        }
    }else{
        if(IntelligentRoadTest.gridTypeIndex==0){//覆盖质量
            IntelligentRoadTest.colorBarArr = [];
        }else if(IntelligentRoadTest.gridTypeIndex==1){//上行速率
            IntelligentRoadTest.colorBarArrSH = [];
        }else if(IntelligentRoadTest.gridTypeIndex==2){//下行速率
            IntelligentRoadTest.colorBarArrXH = [];
        }else if(IntelligentRoadTest.gridTypeIndex==3){//MOD3干扰
            IntelligentRoadTest.colorBarArrM3 = [];
        }else if(IntelligentRoadTest.gridTypeIndex==4){//越区覆盖
            IntelligentRoadTest.colorBarArrYQ = [];
        }else if(IntelligentRoadTest.gridTypeIndex==5){//重叠覆盖
            IntelligentRoadTest.colorBarArrCD = [];
        }else if(IntelligentRoadTest.gridTypeIndex==6){//EC/IO
            IntelligentRoadTest.colorBarArrEC = [];
        }else if(IntelligentRoadTest.gridTypeIndex==7){//NB
            IntelligentRoadTest.colorBarArrNB = [];
        }
    }

}

//移除需要过滤的栅格等级
function removeColorBarArrId(level){
//				console.log("呈现栅格");
    if(IntelligentRoadTest.gridTypeIndex==0){//覆盖质量
        IntelligentRoadTest.colorBarArr = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArr,level);
    }else if(IntelligentRoadTest.gridTypeIndex==1){//上行速率
        IntelligentRoadTest.colorBarArrSH = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrSH,level);
    }else if(IntelligentRoadTest.gridTypeIndex==2){//下行速率
        IntelligentRoadTest.colorBarArrXH = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrXH,level);
    }else if(IntelligentRoadTest.gridTypeIndex==3){//MOD3干扰
        IntelligentRoadTest.colorBarArrM3 = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrM3,level);
    }else if(IntelligentRoadTest.gridTypeIndex==4){//越区覆盖
        IntelligentRoadTest.colorBarArrYQ = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrYQ,level);
    }else if(IntelligentRoadTest.gridTypeIndex==5){//重叠覆盖
        IntelligentRoadTest.colorBarArrCD = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrCD,level);
    }else if(IntelligentRoadTest.gridTypeIndex==6){//EC/IO
        IntelligentRoadTest.colorBarArrEC = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrEC,level);
    }else if(IntelligentRoadTest.gridTypeIndex==7){//NB
        IntelligentRoadTest.colorBarArrNB = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrNB,level);
    }
}
//添加需要过滤的栅格等级
function pushColorBarArrId(level) {
    if(IntelligentRoadTest.gridTypeIndex==0){//覆盖质量
        IntelligentRoadTest.colorBarArr.push(level);
    }else if(IntelligentRoadTest.gridTypeIndex==1){//上行速率
        IntelligentRoadTest.colorBarArrSH.push(level);
    }else if(IntelligentRoadTest.gridTypeIndex==2){//下行速率
        IntelligentRoadTest.colorBarArrXH.push(level);
    }else if(IntelligentRoadTest.gridTypeIndex==3){//MOD3干扰
        IntelligentRoadTest.colorBarArrM3.push(level);
    }else if(IntelligentRoadTest.gridTypeIndex==4){//越区覆盖
        IntelligentRoadTest.colorBarArrYQ.push(level);
    }else if(IntelligentRoadTest.gridTypeIndex==5){//重叠覆盖
        IntelligentRoadTest.colorBarArrCD.push(level);
    }else if(IntelligentRoadTest.gridTypeIndex==6){//EC/IO
        IntelligentRoadTest.colorBarArrEC.push(level);
    }else if(IntelligentRoadTest.gridTypeIndex==7){//NB
        IntelligentRoadTest.colorBarArrNB.push(level);
    }
}


/**
 * ********************************
 * @funcname IntelligentRoadTestSystemLayerV3.fillLayerTabCon
 * @funcdesc 根据缓存初始化图层的顺序
 * @param {null}
 * @return {null}
 * @author 陈小芳
 * @create
 **********************************
 */
IntelligentRoadTestSystemLayerV3.fillLayerTabCon=function IntelligentRoadTestSystemLayerV3_fillLayerTabCon() {
    if(isNull(IntelligentRoadTestSystemLayerV3.systemLayerObj.version)||IntelligentRoadTestSystemLayerV3.systemLayerObj.version != 0.9){
        return;
    }
    var  systemLayerZIndex=IntelligentRoadTestSystemLayerV3.systemLayerObj.zIndex
    for(var i1=0;i1<systemLayerZIndex.length;i1++){
        var sceneName=systemLayerZIndex[i1].name;
        $("#"+sceneName).parents('table').attr('data-zindex',systemLayerZIndex[i1].index);
    }

    var arr = [];
    for(var i2=0;i2<$(".layerTabCon table").length;i2++)
    {
        arr.push($(".layerTabCon table").get(i2));  //$(".layerTabCon table")是元素的集合，并不是数组，所以不能直接用数组的sort进行排序。
    }
    arr.sort(function(a,b){
        return $(a).attr('data-zindex') - $(b).attr('data-zindex');
    });
    for(var i3=0;i3<arr.length;i3++) {
        $(".layerTabCon").prepend(arr[i3]); //将排好序的元素，重新塞到layerTabCon里面显示。
    }
}


//获取当前的图层配置对象
IntelligentRoadTestSystemLayerV3.getNowSystemLayer=function IntelligentRoadTestSystemLayerV3_getNowSystemLayer(){
    //需要将图层透明度进行记录（）
    var sectorOpacity = parseFloat($('#sectorOpacity').val());
    var sector2GOpacity = parseFloat($('#sector2GOpacity').val());
    var poorOpacity = parseFloat($('#poorOpacity').val());
    var gridOpacity = parseFloat($('#gridOpacity').val());
    var sceneOpacity = parseFloat($('#sceneOpacity').val());
    var userOpacity = parseFloat($('#userOpacity').val());
    var lineOpacity = parseFloat($('#lineOpacity').val());

    //需要将图层顺序进行记录
    let sectorYDOpacity = parseFloat($('#yd_SectorOpacity').val());
    let sectorYDZindex = 8 - ($('.layerTabCon table').index($('#yd_sector').parents('table.ui-sortable-handle')) + 1);
    var sectorZindex = 8 - ($('.layerTabCon table').index($('#sector').parents('table.ui-sortable-handle')) + 1);
    var sector2GZindex = 8 - ($('.layerTabCon table').index($('#sector2G').parents('table.ui-sortable-handle')) + 1);
    var poorAreaZindex = 8 - ($('.layerTabCon table').index($('#poorArea').parents('table.ui-sortable-handle')) + 1);
    var gridZindex = 8 - ($('.layerTabCon table').index($('#grid').parents('table.ui-sortable-handle')) + 1);
    var sceneZindex = 8 - ($('.layerTabCon table').index($('#scene').parents('table.ui-sortable-handle')) + 1);
    var userZindex = 8 - ($('.layerTabCon table').index($('#userComplain').parents('table.ui-sortable-handle')) + 1);
    var lineZindex = 8 - ($('.layerTabCon table').index($('#lineArea').parents('table.ui-sortable-handle')) + 1);
    /*var concernAreaZindex = 5-($('#layerUl li').index($('#concernArea').parent())+1);
    var boneAreaZindex = 5-($('#layerUl li').index($('#boneArea').parent())+1);*/

    /*缓存用户选择的图层数据start*/
    //扇区类型
    var sectorType = [];
    $('input:checkbox[name="type-sector"]:checked').each(function (i) {
        sectorType.push($(this).val());
    });
    //扇区使用频段
    var sectorBand = [];
    $('input:checkbox[name="band-sector"]:checked').each(function (i) {
        sectorBand.push($(this).val());
    });
    //扇区设备厂家
    var sectorFactory = [];
    var factoryArr = [];
    $('input:checkbox[name="factory-sector"]').each(function (i) {
        if($(this).is(':checked')){
            var factory = $(this).val();
            var color = $(this).next().css('background-color');
            factoryArr.push(factory);
            sectorFactory.push({type: factory, color: color});
        }
    });
    //扇区专题扇区
    var sectorCov = [];
    $('input:checkbox[name="cov-sector"]:checked').each(function (i) {
        sectorCov.push($(this).val());
    });

    /*2G扇区图层 start*/
    //2G扇区设备厂家
    var sector2GFactory = [];
    var factory2GArr = [];
    $('input:checkbox[name="factory-sector-2g"]').each(function (i) {
        if($(this).is(':checked')){
            var factory = $(this).val();
            var color = $(this).next().css('background-color');
            factory2GArr.push(factory);
            sector2GFactory.push({type: factory, color: color});
        }
    });
    /*2G扇区图层 end*/

    /*移动站址图层 start*/
    var sectorYDFactory = [];
    $('input:checkbox[name="factory-sector-yd"]:checked').each(function (i) {
        var factory = $(this).val();
        var color = $(this).next().css('background-color');
        sectorYDFactory.push({type: factory, color: color});
    });
    /*移动站址图层 end*/

    //栅格覆盖频段
    var gridBandIndex = $('input:radio[name="band-radio"]:checked').val();//不分频段、区分频段下标
    var gridBand = [];
    if (gridBandIndex == 0) {
        if($('input:radio[name="chq-grid"]:checked').length==1){
            gridBand.push($('input:radio[name="chq-grid"]:checked').val());
        }
    } else {
        $('input:checkbox[name="band-grid"]:checked').each(function (i) {
            gridBand.push($(this).val());
        });
    }
    //栅格数据
    var gridType = $('input:radio[name="gridNum"]:checked').val();
    // 栅格时间粒度
    var gridTime = $('input:radio[name="gridTime"]:checked').val();
    //栅格覆盖质量
    var gridTypeIndex = $('input:radio[name="grid-type"]:checked').val();//覆盖质量-0、上行速率-1、下行速率-2、MOD3干扰扇区-3、越区覆盖扇区-4、重叠覆盖扇区-5、EC/IO-6           ------MOD3干扰弱区-6、越区覆盖弱区-7、重叠覆盖弱区-8
    var gridThresholds = IntelligentRoadTestSystemLayerV3.getGridThresholds(gridTypeIndex, gridOpacity);
    var gridNum = $('.gridFieldset2 input[name="grid-type"][value="'+gridTypeIndex+'"]').parent().index();
    var [ ...gridThresholdsEnd ] = gridThresholds; //深克隆
    gridThresholdsEnd.push({ "color": null, "gradient": gridOpacity, "selected":$('.gridFieldSetInfo .gridTypeDiv:eq('+gridNum+') input[value="6"]').is(':checked'),"level":6});
    var lineTypeIndex = $('input:radio[name="grid-type-line"]:checked').val();//覆盖质量-0、上行速率-1、下行速率-2
    var lineThresholds = IntelligentRoadTestSystemLayerV3.getLineThresholds(lineTypeIndex, lineOpacity);

    //弱区弱覆盖区==> 专题图层
    var poorValue = [];
    $('input[name="type-quyu"]:checked').each(function (i) {//区域边界
        poorValue.push({color: $(this).next().css('background-color'), value: $(this).val(), id: $(this).attr("id")});
    });
    var minGridNum = $("#minGridNum").val();
    var maxGridNum = $("#maxGridNum").val();
    var poorCover = {"poorValue": poorValue, "minGridNum": minGridNum, "maxGridNum": maxGridNum};

    //场景边界
    var sceneColor = $('input:radio[name="sceneRadio"]:checked').next().css('background-color');
    var scenevalue = $('input:radio[name="sceneRadio"]:checked').val();
    var sceneName = $('input:radio[name="sceneRadio"]:checked').siblings('label').text();
    var sceneArea = {"color": sceneColor, "value": scenevalue, "name": sceneName};

    //全量工单
    var fullOrder = [], full = [];
    $('input[name="full-order"]:checked').each(function (i) {//区域边界
        fullOrder.push({color: $(this).next().css('background-color'), value: $(this).val(), id: $(this).attr("id")});
        full.push($(this).val());
    });

    //抱怨热点
    var complainHot = [], hot = [];
    $('input[name="complain-hot"]:checked').each(function (i) {//区域边界
        complainHot.push({color: $(this).next().css('background-color'), value: $(this).val(), id: $(this).attr("id")});
        hot.push($(this).val());
    });

    //越级工单
    var overOrder = [], over = [];
    $('input[name="over-order"]:checked').each(function (i) {//区域边界
        overOrder.push({color: $(this).next().css('background-color'), value: $(this).val(), id: $(this).attr("id")});
        over.push($(this).val());
    });

    var systemLayer = {
        "version": 0.9,
        "zIndex": [
            {"name": "sector", "index": sectorZindex},
            {"name": "sector2G", "index": sector2GZindex},
            {"name": "yd_sector", "index": sectorYDZindex},
            {"name": "poorArea", "index": poorAreaZindex},
            {"name": "grid", "index": gridZindex},
            {"name": "scene", "index": sceneZindex},
            {"name": "userComplain", "index": userZindex},
            {"name": "lineArea", "index": lineZindex}
        ],
        "sector": {
            "selected": $('#sector').is(':checked'),
            "zIndex": sectorZindex,
            "opacity": sectorOpacity,
            "type": sectorType,
            "band": sectorBand,
            "factory": sectorFactory,
            "covSector": sectorCov
        },
        "sector2G": {
            "selected": $('#sector2G').is(':checked'),
            "zIndex": sector2GZindex,
            "opacity": sector2GOpacity,
            "factory": sector2GFactory,
        },
        "yd_sector": {
            "selected": $('#yd_sector').is(':checked'),
            "zIndex": sectorYDZindex,
            "opacity":sectorYDOpacity,
            "factory": sectorYDFactory,
        },
        "poorArea": {
            "selected": $('#poorArea').is(':checked'),
            "zIndex": poorAreaZindex,
            "opacity": poorOpacity,
            "poorCover": poorCover
        },
        "grid": {
            "selected": true,
            "zIndex": gridZindex,
            "opacity": gridOpacity,
            "band": {"gridBandIndex": gridBandIndex, "gridBand": gridBand},
            "type": gridType,
            "time": gridTime,
            "thresholds": {"gridTypeIndex": gridTypeIndex, "gridThresholds": gridThresholdsEnd},
        },
        "scene": {
            "selected": $('#scene').is(':checked'),
            "zIndex": sceneZindex,
            "opacity": sceneOpacity,
            "area": sceneArea
        },
        "userComplain": {
            "selected": $('#userComplain').is(':checked'),
            "zIndex": userZindex,
            "opacity": userOpacity,
            "fullOrder": fullOrder,
            "complainHot": complainHot,
            "overOrder": overOrder
        },
        "lineArea": {
            "selected": true,
            "zIndex": lineZindex,
            "opacity": lineOpacity,
            "thresholds": {"lineTypeIndex": lineTypeIndex, "lineThresholds": lineThresholds},
        }
    };
    return systemLayer;
    /*IntelligentRoadTest.gridBand = gridBand;//栅格频段
    IntelligentRoadTest.gridType = gridType;//栅格数据 1--AGPS-MR、0--全量MR综合、3--全量MR室外、2--全量MR室内
    IntelligentRoadTest.gridTime = gridTime;//栅格时间粒度
    IntelligentRoadTest.gridBandIndex = gridBandIndex;//栅格频段下标 0--不分频段  1--区分频段
    IntelligentRoadTest.gridTypeIndex = gridTypeIndex;//栅格类型下标 0--覆盖质量  1--上行速率  2--下行速率
    IntelligentRoadTest.gridThresholds = gridThresholds;//栅格图例（图层）
    IntelligentRoadTest.poorLineColor = $("#poorColor").css('background-color');//弱覆盖颜色
    IntelligentRoadTest.poorAreaLineColor = $('input:radio[name="type-quyu"]:checked').next().css('background-color');//其它弱覆盖颜色

    IntelligentRoadTest.lineTypeIndex = lineTypeIndex;//类型下标 0--覆盖质量  1--上行速率  2--下行速率
    IntelligentRoadTest.lineThresholds = lineThresholds;//线段图例
    IntelligentRoadTest.lineOpacity = lineOpacity;//线段透明度

    IntelligentRoadTest.gridOpacity = gridOpacity;//栅格透明度
    // IntelligentRoadTest.gridDivZindex=gridZindex;//栅格层级

    IntelligentRoadTest.GridMap.divZindex = gridZindex;
    IntelligentRoadTest.GridMapM.divZindex = gridZindex;
    IntelligentRoadTest.GridMapU.divZindex = gridZindex;

    IntelligentRoadTest.GridMap.opacity = gridOpacity;
    IntelligentRoadTest.GridMapM.opacity = gridOpacity;
    IntelligentRoadTest.GridMapU.opacity = gridOpacity;*/
    /*缓存用户选择的图层数据end*/
}
