/*******************栅格图例配置js*********************/
var IntelligentRoadTestGridLegend={};
//各种栅格类型默认的区间(点击[恢复默认]按钮时需要用到)以图例结束位置为value分界值
IntelligentRoadTestGridLegend.defaultGridLegend={
    "fgLegend": { //覆盖质量
        "gridTypeIndex":0,
        "firstLastValue":{"first":0,"last":-140},//边界值 第一个,最后一个
        "defaultValue":{"first":-75,"last":-125},//展示在页面上的值
        "you": {"value":-85,"width":0}, //优
        "liang": {"value":-95,"width":0}, //良
        "zhong": {"value":-105,"width":0}, //中
        "cha": {"value":-115,"width":0}, //差
        "jicha": {"value":-140,"width":0}, //极差
        "notCount": {"value":3,"width":0}, //记录数
        "fallNet": {"value":null,"width":0}
    },
    "shLegend": {//上行速率
        "gridTypeIndex":1,
        "firstLastValue":{"first":40,"last":0},//边界值 第一个,最后一个
        "defaultValue":{"first":6,"last":0},
        "you": {"value":5,"width":0},
        "liang": {"value":3,"width":0},
        "zhong": {"value":1,"width":0},
        "cha": {"value":0.25,"width":0},
        "jicha": {"value":0,"width":0},
        "notCount": {"value":3,"width":0},
        "fallNet": {"value":null,"width":0}
    },
    "xhLegend": {//下行速率
        "gridTypeIndex":2,
        "firstLastValue":{"first":150,"last":0},//边界值 第一个,最后一个
        "defaultValue":{"first":16,"last":0},
        "you": {"value":12,"width":0},
        "liang": {"value":8,"width":0},
        "zhong": {"value":5,"width":0},
        "cha":{"value":2,"width":0},
        "jicha": {"value":0,"width":0},//最后一个值不用改
        "notCount": {"value":3,"width":0},
        "fallNet": {"value":null,"width":0}
    },
    "yqLegend": {//越区覆盖
        "gridTypeIndex":4,
        "firstLastValue":{"first":0,"last":100},//边界值 第一个,最后一个
        "defaultValue":{"first":0,"last":45},
        "you": {"value":5,"width":0},
        "liang": {"value":15,"width":0},
        "zhong": {"value":25,"width":0},
        "cha": {"value":35,"width":0},
        "jicha": {"value":100,"width":0},
        "notCount": {"value":3,"width":0},
        "fallNet": {"value":null,"width":0}
    },
    "cdLegend": {//重叠覆盖
        "gridTypeIndex":5,
        "firstLastValue":{"first":0,"last":100},//边界值 第一个,最后一个
        "defaultValue":{"first":0,"last":45},
        "you": {"value":5,"width":0},
        "liang": {"value":15,"width":0},
        "zhong": {"value":25,"width":0},
        "cha": {"value":35,"width":0},
        "jicha": {"value":100,"width":0},
        "notCount": {"value":3,"width":0},
        "fallNet": {"value":null,"width":0}
    },
    "m3Legend": {//MOD3干扰
        "gridTypeIndex":3,
        "firstLastValue":{"first":0,"last":100},//边界值 第一个,最后一个
        "defaultValue":{"first":0,"last":45},
        "you": {"value":5,"width":0},
        "liang": {"value":15,"width":0},
        "zhong": {"value":25,"width":0},
        "cha": {"value":35,"width":0},
        "jicha": {"value":100,"width":0},
        "notCount": {"value":3,"width":0},
        "fallNet": {"value":null,"width":0}
    },
    "ecLegend": { //EC/IO
        "gridTypeIndex":6,
        "firstLastValue":{"first":0,"last":-32},//边界值 第一个,最后一个
        "defaultValue":{"first":-4,"last":-14},
        "you": {"value":-6,"width":0}, //优
        "liang": {"value":-8,"width":0}, //良
        "zhong": {"value":-10,"width":0}, //中
        "cha": {"value":-12,"width":0}, //差
        "jicha": {"value":-32,"width":0}, //极差
        "notCount": {"value":3,"width":0}, //记录数
        "fallNet": {"value":null,"width":0}
    },
    "nbLegend": { //NB
        "gridTypeIndex":7,
        "gridTypeIndex":0,
        "firstLastValue":{"first":0,"last":-140},//边界值 第一个,最后一个
        "defaultValue":{"first":-75,"last":-125},
        "you": {"value":-85,"width":0}, //优
        "liang": {"value":-95,"width":0}, //良
        "zhong": {"value":-105,"width":0}, //中
        "cha": {"value":-115,"width":0}, //差
        "jicha": {"value":-140,"width":0}, //极差
        "notCount": {"value":3,"width":0}, //记录数
        "fallNet": {"value":null,"width":0}
    },
    "fgLineLegend": { //覆盖质量---线段
        "gridTypeIndex":0,
        "firstLastValue":{"first":0,"last":-140},//边界值 第一个,最后一个
        "defaultValue":{"first":-75,"last":-125},
        "you": {"value":-85,"width":0,level:1}, //优
        "liang": {"value":-95,"width":0,level:2}, //良
        "zhong": {"value":-105,"width":0,level:3}, //中
        "cha": {"value":-115,"width":0,level:4}, //差
        "jicha": {"value":-140,"width":0,level:5}, //极差
        "notCount": {"value":3,"width":0,level:6}, //记录数
        "fallNet": {"value":null,"width":0,level:7}
    },
    "shLineLegend": {//上行速率---线段
        "gridTypeIndex":1,
        "firstLastValue":{"first":40,"last":0},//边界值 第一个,最后一个
        "defaultValue":{"first":6,"last":0},
        "you": {"value":5,"width":0,level:1},
        "liang": {"value":3,"width":0,level:2},
        "zhong": {"value":1,"width":0,level:3},
        "cha": {"value":0.25,"width":0,level:4},
        "jicha": {"value":0,"width":0,level:5},
        "notCount": {"value":3,"width":0,level:6},
        "fallNet": {"value":null,"width":0,level:7}
    },
    "xhLineLegend": {//下行速率---线段
        "gridTypeIndex":2,
        "firstLastValue":{"first":150,"last":0},//边界值 第一个,最后一个
        "defaultValue":{"first":16,"last":0},
        "you": {"value":12,"width":0,level:1},
        "liang": {"value":8,"width":0,level:2},
        "zhong": {"value":5,"width":0,level:3},
        "cha":{"value":2,"width":0,level:4},
        "jicha": {"value":0,"width":0,level:5},
        "notCount": {"value":3,"width":0,level:6},
        "fallNet": {"value":null,"width":0,level:7}
    }
};
//默认的各种栅格类型指标区间情况[目前是统一使用(左开右闭]的原则]
IntelligentRoadTestGridLegend.gridLegend={
    "version":2.1,
    "fgLegend": { //覆盖质量
        "gridTypeIndex":0,
        "firstLastValue":{"first":0,"last":-140},//边界值 第一个,最后一个
        "defaultValue":{"first":-75,"last":-125},
        "you": {"value":-85,"max":0,"min":-85,"maxClose":false,"minClose":true,"width":0}, //优
        "liang": {"value":-95,"max":-85,"min":-95,"maxClose":false,"minClose":true,"width":0}, //良
        "zhong": {"value":-105,"max":-95,"min":-105,"maxClose":false,"minClose":true,"width":0}, //中
        "cha": {"value":-115,"max":-105,"min":-115,"maxClose":false,"minClose":true,"width":0}, //差
        "jicha": {"value":-140,"max":-115,"min":-140,"maxClose":false,"minClose":true,"width":0}, //极差
        "notCount": {"value":3,"width":0}, //记录数
        "fallNet": {"value":null,"width":0}
    },
    "shLegend": {//上行速率
        "gridTypeIndex":1,
        "firstLastValue":{"first":40,"last":0},//边界值 第一个,最后一个
        "defaultValue":{"first":6,"last":0},
        "you": {"value":5,"max":40,"min":5,"maxClose":false,"minClose":true,"width":0},
        "liang": {"value":3,"max":5,"min":3,"maxClose":false,"minClose":true,"width":0},
        "zhong": {"value":1,"max":3,"min":1,"maxClose":false,"minClose":true,"width":0},
        "cha": {"value":0.25,"max":1,"min":0.25,"maxClose":false,"minClose":true,"width":0},
        "jicha": {"value":0,"max":0.25,"min":0,"maxClose":false,"minClose":true,"width":0},
        "notCount": {"value":3,"width":0},
        "fallNet": {"value":null,"width":0}
    },
    "xhLegend": {//下行速率
        "gridTypeIndex":2,
        "firstLastValue":{"first":150,"last":0},//边界值 第一个,最后一个
        "defaultValue":{"first":16,"last":0},
        "you": {"value":12,"max":150,"min":12,"maxClose":false,"minClose":true,"width":0},
        "liang": {"value":8,"max":12,"min":8,"maxClose":false,"minClose":true,"width":0},
        "zhong": {"value":5,"max":8,"min":5,"maxClose":false,"minClose":true,"width":0},
        "cha":{"value":2,"max":5,"min":2,"maxClose":false,"minClose":true,"width":0},
        "jicha": {"value":0,"max":2,"min":0,"maxClose":false,"minClose":true,"width":0},
        "notCount": {"value":3,"width":0},
        "fallNet": {"value":null,"width":0}
    },
    "yqLegend": {//越区覆盖
        "gridTypeIndex":4,
        "firstLastValue":{"first":0,"last":100},//边界值 第一个,最后一个
        "defaultValue":{"first":0,"last":45},
        "you": {"value":5,"max":5,"min":0,"maxClose":true,"minClose":false,"width":0},
        "liang": {"value":15,"max":15,"min":5,"maxClose":true,"minClose":false,"width":0},
        "zhong": {"value":25,"max":25,"min":15,"maxClose":true,"minClose":false,"width":0},
        "cha": {"value":35,"max":35,"min":25,"maxClose":true,"minClose":false,"width":0},
        "jicha": {"value":100,"max":100,"min":35,"maxClose":true,"minClose":false,"width":0},
        "notCount": {"value":3,"width":0},
        "fallNet": {"value":null,"width":0}
    },
    "cdLegend": {//重叠覆盖
        "gridTypeIndex":5,
        "firstLastValue":{"first":0,"last":100},//边界值 第一个,最后一个
        "defaultValue":{"first":0,"last":45},
        "you": {"value":5,"max":5,"min":0,"maxClose":true,"minClose":false,"width":0},
        "liang": {"value":15,"max":15,"min":5,"maxClose":true,"minClose":false,"width":0},
        "zhong": {"value":25,"max":25,"min":15,"maxClose":true,"minClose":false,"width":0},
        "cha": {"value":35,"max":35,"min":25,"maxClose":true,"minClose":false,"width":0},
        "jicha": {"value":100,"max":100,"min":35,"maxClose":true,"minClose":false,"width":0},
        "notCount": {"value":3,"width":0},
        "fallNet": {"value":null,"width":0}
    },
    "m3Legend": {//MOD3干扰
        "gridTypeIndex":3,
        "firstLastValue":{"first":0,"last":100},//边界值 第一个,最后一个
        "defaultValue":{"first":0,"last":45},
        "you": {"value":5,"max":5,"min":0,"maxClose":true,"minClose":false,"width":0},
        "liang": {"value":15,"max":15,"min":5,"maxClose":true,"minClose":false,"width":0},
        "zhong": {"value":25,"max":25,"min":15,"maxClose":true,"minClose":false,"width":0},
        "cha": {"value":35,"max":35,"min":25,"maxClose":true,"minClose":false,"width":0},
        "jicha": {"value":100,"max":100,"min":35,"maxClose":true,"minClose":false,"width":0},
        "notCount": {"value":3,"width":0},
        "fallNet": {"value":null,"width":0}
    },
    "ecLegend": {//EC/IO2g栅格
        "gridTypeIndex":6,
        "firstLastValue":{"first":0,"last":-32},//边界值 第一个,最后一个
        "defaultValue":{"first":-4,"last":-14},
        "you": {"value":-6,"max":0,"min":-6,"maxClose":true,"minClose":false,"width":0},
        "liang": {"value":-8,"max":-6,"min":-8,"maxClose":true,"minClose":false,"width":0},
        "zhong": {"value":-10,"max":-8,"min":-10,"maxClose":true,"minClose":false,"width":0},
        "cha": {"value":-12,"max":-10,"min":-12,"maxClose":true,"minClose":false,"width":0},
        "jicha": {"value":-32,"max":-12,"min":-32,"maxClose":true,"minClose":false,"width":0},
        "notCount": {"value":3,"width":0},
        "fallNet": {"value":null,"width":0}
    },
    "nbLegend": {//NB栅格
        "gridTypeIndex":0,
        "firstLastValue":{"first":0,"last":-140},//边界值 第一个,最后一个
        "defaultValue":{"first":-75,"last":-125},
        "you": {"value":-85,"max":0,"min":-85,"maxClose":false,"minClose":true,"width":0}, //优
        "liang": {"value":-95,"max":-85,"min":-95,"maxClose":false,"minClose":true,"width":0}, //良
        "zhong": {"value":-105,"max":-95,"min":-105,"maxClose":false,"minClose":true,"width":0}, //中
        "cha": {"value":-115,"max":-105,"min":-115,"maxClose":false,"minClose":true,"width":0}, //差
        "jicha": {"value":-140,"max":-115,"min":-140,"maxClose":false,"minClose":true,"width":0}, //极差
        "notCount": {"value":3,"width":0}, //记录数
        "fallNet": {"value":null,"width":0}
    },
    "fgLineLegend": { //覆盖质量---线段
        "gridTypeIndex":0,
        "firstLastValue":{"first":0,"last":-140},//边界值 第一个,最后一个
        "defaultValue":{"first":-75,"last":-125},
        "you": {"value":-85,"max":0,"min":-85,"maxClose":false,"minClose":true,"width":0,"level":1,"color":"rgb(0, 153, 0)"}, //优
        "liang": {"value":-95,"max":-85,"min":-95,"maxClose":false,"minClose":true,"width":0,"level":2,"color":"rgb(0, 176, 240)"}, //良
        "zhong": {"value":-105,"max":-95,"min":-105,"maxClose":false,"minClose":true,"width":0,"level":3,"color":"rgb(0, 112, 192)"}, //中
        "cha": {"value":-115,"max":-105,"min":-115,"maxClose":false,"minClose":true,"width":0,"level":4,"color":"rgb(255, 192, 0)"}, //差
        "jicha": {"value":-140,"max":-115,"min":-140,"maxClose":false,"minClose":true,"width":0,"level":5,"color":"rgb(192, 0, 0)"}, //极差
        "notCount": {"value":3,"width":0,"level":6,"color":"rgb(187, 16, 196)"},//记录数
        "fallNet": {"value":null,"width":0,"level":7,"color":"rgb(0, 0, 0)"}
    },
    "shLineLegend": {//上行速率---线段
        "gridTypeIndex":1,
        "firstLastValue":{"first":40,"last":0},//边界值 第一个,最后一个
        "defaultValue":{"first":6,"last":0},
        "you": {"value":5,"max":40,"min":5,"maxClose":false,"minClose":true,"width":0,"level":1,"color":"rgb(0, 153, 0)"},
        "liang": {"value":3,"max":5,"min":3,"maxClose":false,"minClose":true,"width":0,"level":2,"color":"rgb(0, 176, 240)"},
        "zhong": {"value":1,"max":3,"min":1,"maxClose":false,"minClose":true,"width":0,"level":3,"color":"rgb(0, 112, 192)"},
        "cha": {"value":0.25,"max":1,"min":0.25,"maxClose":false,"minClose":true,"width":0,"level":4,"color":"rgb(255, 192, 0)"},
        "jicha": {"value":0,"max":0.25,"min":0,"maxClose":false,"minClose":true,"width":0,"level":5,"color":"rgb(192, 0, 0)"},
        "notCount": {"value":3,"width":0,"level":6,"color":"rgb(187, 16, 196)"},
        "fallNet": {"value":null,"width":0,"level":7,"color":"rgb(0, 0, 0)"}
    },
    "xhLineLegend": {//下行速率---线段
        "gridTypeIndex":2,
        "firstLastValue":{"first":150,"last":0},//边界值 第一个,最后一个
        "defaultValue":{"first":16,"last":0},
        "you": {"value":12,"max":150,"min":12,"maxClose":false,"minClose":true,"width":0,"level":1,"color":"rgb(0, 153, 0)"},
        "liang": {"value":8,"max":12,"min":8,"maxClose":false,"minClose":true,"width":0,"level":2,"color":"rgb(0, 176, 240)"},
        "zhong": {"value":5,"max":8,"min":5,"maxClose":false,"minClose":true,"width":0,"level":3,"color":"rgb(0, 112, 192)"},
        "cha":{"value":2,"max":5,"min":2,"maxClose":false,"minClose":true,"width":0,"level":4,"color":"rgb(255, 192, 0)"},
        "jicha": {"value":0,"max":2,"min":0,"maxClose":false,"minClose":true,"width":0,"level":5,"color":"rgb(192, 0, 0)"},
        "notCount": {"value":3,"width":0,"level":6,"color":"rgb(187, 16, 196)"},
        "fallNet": {"value":null,"width":0,"level":7,"color":"rgb(0, 0, 0)"}
    }
};
IntelligentRoadTestGridLegend.inputTextTimeout=null;
$(function(){
    /*栅格类型切换面板控制*/
    $(".legendTitle .boxSelectionImg").click(function () {
        if($('.lineTable').css('display')=='none'){
            $(this).siblings('.gridBoxSelectionUl').toggle();
        }else{
            $(this).siblings('.lineBoxSelectionUl').toggle();
        }
    });
    /*记录数面板控制*/
    $(".recordDiv .triangle").click(function (event) {
        event.stopPropagation();
        $(this).siblings(".boxSelectionUl").toggle();
    });
    /*栅格类型切换面板选择*/
    $(".legendTitle ul li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(this).parent().hide();
        $(this).parent().siblings().find(".colorBarText").text($(this).text());
        IntelligentRoadTestGridLegend.syncLegendPanel();

    });
    /*记录数面板选择*/
    $(".recordDiv ul li").click(function (event) {
        event.stopPropagation();
        if($(".recordDiv ul li").index($(this))<3){
            $(this).addClass("active").siblings().removeClass("active");
            $(this).parent().hide();
            $(".recordDiv .recordNum").text($(this).text());
            //同步记录数,并缓存
            IntelligentRoadTestGridLegend.syncRecordValue($(this).text());
        }
    });
    /*记录数的勾选(ok)事件*/
    $(".recordDiv .recordBtn").click(function (event) {
        event.stopPropagation();
        var inputValue = $(this).siblings().val();
        if(inputValue != ""){
            var flag=false;
            $(".recordDiv ul li:not('.customLi')").each(function (i) {
                if(inputValue==$(this).text()){
                    flag=true;
                    $(this).addClass("active").siblings().removeClass("active");
                    return false;
                }
            });
            if(!flag){
                $(".recordDiv ul li").removeClass("active");
            }
            $(this).parent().parent().hide();
            $(".recordDiv .recordNum").text(inputValue);
            //同步记录数,并缓存
            IntelligentRoadTestGridLegend.syncRecordValue(inputValue);
        }
    });
    /*游标的勾选/取消事件*/
    $(".scale-btn .closeScale").click(function () {
        $(this).parent().parent().hide();
        $(".slideOrange").hide();
        var index=$(".scale-btn .closeScale").index($(this));
        if(index==0){//勾选
            IntelligentRoadTestGridLegend.syncGridInterval();
        }else{//取消
            //返回到游标之前的状态
            //IntelligentRoadTest.gridInterval
        }
        $(".ui-slider-label,.slideValue").removeClass("slideSelect");
    });
    /*恢复默认*/
    $(".scale-btn .reset").click(function () {
        //高铁"中"的默认值是(-95,-110]
        if(IntelligentRoadTest.index == 8|| (IntelligentRoadTest.index == 2 && IntelligentRoadTest.clickSenseName == "rail" )){
            IntelligentRoadTestGridLegend.defaultGridLegend.fgLineLegend.zhong.value=-110;
        }else{
            IntelligentRoadTestGridLegend.defaultGridLegend.fgLineLegend.zhong.value=-115;
        }
        IntelligentRoadTestGridLegend.initSlidePosition(IntelligentRoadTestGridLegend.defaultGridLegend);
        IntelligentRoadTestGridLegend.initSlideRange();
        //如果显示了标尺,则在input上显示标尺对应的值
        if($('.slideOrange:visible').parent().hasClass("slideLeft")){//边界左边
            $('.slideOrange:visible').siblings('.slideSpaceImg').click();
        }else if($('.slideOrange:visible').parent().hasClass("slideRight")){//边界右边
            $('.slideOrange:visible').siblings('.slideSpaceImg').click();
        }else{
            $('.slideOrange:visible').siblings('.slideImg').click();
        }
    });

    /*游标右边的input框事件*/
    var cpLock = false;
    $('.numberInput').on('compositionstart', function(){
        cpLock = true;
    })
    $('.numberInput').on('compositionend', function(){
        cpLock = false;
        $('.numberInput').trigger('input');
    })
    $('.numberInput').on('input',function(){
        if(cpLock) return;
        var val = $('.numberInput').val().trim();
        if(val == "") {
            if (IntelligentRoadTestGridLegend.inputTextTimeout!=null){
                clearTimeout(IntelligentRoadTestGridLegend.inputTextTimeout);
                IntelligentRoadTestGridLegend.inputTextTimeout=null;
            }
            return;
        }else{
            // 做延迟进行匹配，避免用户没输一个字符都匹配一次
            if(IntelligentRoadTestGridLegend.inputTextVal != val){
                clearTimeout(IntelligentRoadTestGridLegend.inputTextTimeout);
                IntelligentRoadTestGridLegend.inputTextVal = val;
                IntelligentRoadTestGridLegend.inputTextTimeout = setTimeout(IntelligentRoadTestGridLegend.inputTextFunc,1500);
            }else{
                if (IntelligentRoadTestGridLegend.inputTextTimeout!=null){
                    clearTimeout(IntelligentRoadTestGridLegend.inputTextTimeout);
                    IntelligentRoadTestGridLegend.inputTextTimeout=null;
                }
            }
        }
    });

    /*刻度尺*/
    $("#scale-slider").slider({
        min: 0,
        max: 100,
        step: 1,
    }).slider("pips", {
        rest: "label",
        step: 1
    });

    /*游标拖拽改变前后两个色块的宽度*/
    $(".slideDiv").draggable({
        axis: "x",
        containment: 'parent',
        cancel: ".slideValue,.slideOrange",
        start: function(event, ui) {
            var index=$(ui.helper).index();
            $(".scaleWrap").show();  //显示图例上面的刻度尺
            $(".slideOrange").hide();
            $(this).children(".slideOrange").show();  //显示刻度尺上的橙色游标
        },
        stop: function(event, ui) {
            var index=$(ui.helper).index();  //当前的游标

            var width1=0;
            var width2=0;
            if(index==0){//第一个
                var width1 = ui.position.left;
                var width2 = $(ui.helper).next().position().left-width1;
            }else if(index==3){//最后一个
                var width=ui.helper[0].offsetLeft;
                width1=width-$(ui.helper).prev()[0].offsetLeft;
                width2=$(this).parent().siblings("ul").width()-width;
            }else{//中间的
                var width=ui.helper[0].offsetLeft;
                width1=width-$(ui.helper).prev()[0].offsetLeft;
                width2=$(ui.helper).next()[0].offsetLeft-width;
            }

            //设置游标前后两个色块的宽度宽度
            $(this).parent().siblings().find("li").eq(index).css("width",width1+"px");
            $(this).parent().siblings().find("li").eq(index+1).css("width",width2+"px");
            IntelligentRoadTestGridLegend.initSlideRange();
        },
        drag: function(event, ui) {
            var index=$(ui.helper).index();  //当前的游标
            var left = parseInt(ui.position.left);
            var totalWidth = $(".colorLegendUl").width();
            var totalScale = $("#scale-slider").slider("option", "max")-$("#scale-slider").slider("option", "min");
            var value =parseFloat(left*totalScale/totalWidth)+$("#scale-slider").slider("option", "min");//拖动游标对应的值
            //分类判断
            var gridTypeIndex=IntelligentRoadTest.gridTypeIndex;
            if($('.lineTable').css('display')=='table'){
                gridTypeIndex=IntelligentRoadTest.lineTypeIndex;
            }
            if(gridTypeIndex==3||gridTypeIndex==4||gridTypeIndex==5){//重叠,越区,mod3
                value=parseInt(value);
            }else if(gridTypeIndex==1||gridTypeIndex==2){//上,下行
                var max=$("#scale-slider").slider("option", "max");
                value=parseInt(max-value);
            }else{//覆盖质量--0 //EC/IO--6
                value=parseInt(-value);
            }
            var prevValue=0;
            var nextValue=0;
            if(index==0){//第一个
                prevValue=$("#scale-slider .ui-slider-pip-first").find(".ui-slider-label").text();
                nextValue=$(this).next().find(".slideValue").text();
            }else if(index==3){//最后一个
                prevValue=$(this).prev().find(".slideValue").text();
                nextValue=$("#scale-slider .ui-slider-pip-last").find(".ui-slider-label").text();
            }else{//中间的
                prevValue=$(this).prev().find(".slideValue").text();
                nextValue=$(this).next().find(".slideValue").text();
            }
            //根据数值由小到大和由大到小的不同游标设置最大最小值
            var minValue=prevValue;
            var maxValue=nextValue;
            if(gridTypeIndex<3||gridTypeIndex==6){//大---->小
                minValue=nextValue;
                maxValue=prevValue;
            }else{//小--->大
            }
            $(".scale-btn .numberInput").attr("min",minValue);
            $(".scale-btn .numberInput").attr("max",maxValue);

            IntelligentRoadTestGridLegend.inputTextVal=value;
            if(Number(value) <= minValue||Number(value) >= maxValue){
                return false;
            }else{//满足条件才给value设置,否则恢复为原来的值
                $(this).find(".slideValue").text(value);//图例上面的
                $(".scale-btn .numberInput").val(value);//input
            }
        }
    });

    /*游标的点击后呈现标尺和获取对应的数值在input中*/
    $(".slideDiv .slideImg,.slideSpace .slideSpaceImg").on("click",function () {
        $(".scaleWrap").show();  //显示图例上面的刻度尺
        $(".slideOrange").hide();
        var prevValue=0;
        var nextValue=0;
        var value=0;
        if($(this).parent().hasClass("slideLeft")){//边界左边
            $(this).siblings().show();  //显示刻度尺上的橙色游标
            value=$("#scale-slider .ui-slider-pip-first").find(".ui-slider-label").text();
            prevValue=IntelligentRoadTestGridLegend.defaultGridLegend[IntelligentRoadTest.gridIntervalKey].firstLastValue.first;
            nextValue=$(".slideWrap .slideDiv:first").find(".slideValue").text();
        }else if($(this).parent().hasClass("slideRight")){//边界右边
            $(this).siblings().show();  //显示刻度尺上的橙色游标
            value=$("#scale-slider .ui-slider-pip-last").find(".ui-slider-label").text();
            prevValue=$(".slideWrap .slideDiv:last").find(".slideValue").text();
            nextValue=IntelligentRoadTestGridLegend.defaultGridLegend[IntelligentRoadTest.gridIntervalKey].firstLastValue.last;
        }else{
            $(this).parent(".slideDiv ").children(".slideOrange").show();  //显示刻度尺上的橙色游标
            value=$(this).siblings(".slideValue").text();
            var index=$(".slideDiv .slideImg").index($(this));
            if(index==0){//第一个
                prevValue=$("#scale-slider .ui-slider-pip-first").find(".ui-slider-label").text();
                nextValue=$(this).parent(".slideDiv ").next().find(".slideValue").text();
            }else if(index==3){//最后一个
                prevValue=$(this).parent(".slideDiv ").prev().find(".slideValue").text();
                nextValue=$("#scale-slider .ui-slider-pip-last").find(".ui-slider-label").text();
            }else{//中间的
                prevValue=$(this).parent(".slideDiv ").prev().find(".slideValue").text();
                nextValue=$(this).parent(".slideDiv ").next().find(".slideValue").text();
            }
        }
        $(".scale-btn .numberInput").val(value);//input
        IntelligentRoadTestGridLegend.inputTextVal=value;

        //根据数值由小到大和由大到小的不同游标设置最大最小值
        if(IntelligentRoadTest.gridTypeIndex<3||IntelligentRoadTest.gridTypeIndex==6){//大---->小
            $(".scale-btn .numberInput").attr("min",nextValue);
            $(".scale-btn .numberInput").attr("max",prevValue);
        }else{//小--->大
            $(".scale-btn .numberInput").attr("min",prevValue);
            $(".scale-btn .numberInput").attr("max",nextValue);
        }

        $(".scale-btn .numberInput").focus();
        $(".ui-slider-label,.slideValue").removeClass("slideSelect");
        if($(".slideSpaceImg").index($(this)) == 0){ //边界左边
            $("#scale-slider .ui-slider-pip-first").find(".ui-slider-label").addClass("slideSelect");
        }else if($(".slideSpaceImg").index($(this)) == 1){ //边界右边
            $("#scale-slider .ui-slider-pip-last").find(".ui-slider-label").addClass("slideSelect");
        }else{
            $(this).siblings(".slideValue").addClass("slideSelect");
        }

    }).on("mouseover",function () {  //鼠标移入显示提示信息：拖动的范围
        var prevValue=0;
        var nextValue=0;
        if($(this).parent().hasClass("slideLeft")){//边界左边
            // prevValue=$("#scale-slider .ui-slider-pip-first").find(".ui-slider-label").text();
            prevValue=IntelligentRoadTestGridLegend.defaultGridLegend[IntelligentRoadTest.gridIntervalKey].firstLastValue.first;
            nextValue=$(".slideWrap .slideDiv:first").find(".slideValue").text();
        }else if($(this).parent().hasClass("slideRight")){//边界右边
            // prevValue=$(".slideWrap .slideDiv:last").find(".slideValue").text();
            prevValue=$(".slideWrap .slideDiv:last").find(".slideValue").text();
            nextValue=IntelligentRoadTestGridLegend.defaultGridLegend[IntelligentRoadTest.gridIntervalKey].firstLastValue.last;

        }else{
            var index=$(".slideDiv .slideImg").index($(this));
            if(index==0){//第一个
                prevValue=$("#scale-slider .ui-slider-pip-first").find(".ui-slider-label").text();
                nextValue=$(this).parent(".slideDiv ").next().find(".slideValue").text();
            }else if(index==3){//最后一个
                prevValue=$(this).parent(".slideDiv ").prev().find(".slideValue").text();
                nextValue=$("#scale-slider .ui-slider-pip-last").find(".ui-slider-label").text();
            }else{//中间的
                prevValue=$(this).parent(".slideDiv ").prev().find(".slideValue").text();
                nextValue=$(this).parent(".slideDiv ").next().find(".slideValue").text();
            }
        }
        if(Number(prevValue)>Number(nextValue)){
            $(this).attr("title","边界的范围：("+nextValue+","+prevValue+")");
        }else{
            $(this).attr("title","边界的范围：("+prevValue+","+nextValue+")");
        }
    });

    /*/!*调整间距按钮*!/
    $(".slideSpace .slideSpaceImg").on("click",function (){
        $(".scaleWrap").show();  //显示图例上面的刻度尺
        $(".slideOrange").hide();
        $(this).siblings().show();  //显示刻度尺上的橙色游标
    });*/

});

//input框的输入事件回调
/**********************************
 * @funcname IntelligentRoadTestGridLegend.inputTextFunc
 * @funcdesc //input框的输入事件回调
 * @param {null}
 * @return {null}
 * @author 陈小芳
 * @create 20181120
 ***********************************/
IntelligentRoadTestGridLegend.inputTextFunc=function IntelligentRoadTestGridLegend_inputTextFunc(){
    var min=Number($(".numberInput").attr("min"));
    var max=Number($(".numberInput").attr("max"));
    var flag=false;
    //手动触发游标到value的值
    if($('.slideOrange:visible').parent().hasClass("slideLeft")){//边界左边
        var firstLabel=IntelligentRoadTestGridLegend.defaultGridLegend[IntelligentRoadTest.gridIntervalKey].firstLastValue.first;
        if((Number(IntelligentRoadTestGridLegend.inputTextVal)>min&&Number(IntelligentRoadTestGridLegend.inputTextVal)<max)
            ||IntelligentRoadTestGridLegend.inputTextVal==firstLabel){
            flag=true;
            $("#scale-slider .ui-slider-pip-first").find(".ui-slider-label").text(IntelligentRoadTestGridLegend.inputTextVal);
        }
    }else if($('.slideOrange:visible').parent().hasClass("slideRight")){//边界右边
        var lastLabel=IntelligentRoadTestGridLegend.defaultGridLegend[IntelligentRoadTest.gridIntervalKey].firstLastValue.last;
        if((Number(IntelligentRoadTestGridLegend.inputTextVal)>min&&Number(IntelligentRoadTestGridLegend.inputTextVal)<max)
            ||IntelligentRoadTestGridLegend.inputTextVal==lastLabel){
            flag=true;
            $("#scale-slider .ui-slider-pip-last").find(".ui-slider-label").text(IntelligentRoadTestGridLegend.inputTextVal);
        }
    }else{
        if((Number(IntelligentRoadTestGridLegend.inputTextVal)>min&&Number(IntelligentRoadTestGridLegend.inputTextVal)<max)){
            flag=true;
            $('.slideOrange:visible').next().text(IntelligentRoadTestGridLegend.inputTextVal);
        }
    }
    if(flag){
        var first=$("#scale-slider .ui-slider-pip-first").find(".ui-slider-label").text();
        var last=$("#scale-slider .ui-slider-pip-last").find(".ui-slider-label").text();
        if(Math.abs(first)>Math.abs(last)){
            $("#scale-slider").slider("option", "min", Math.abs(last));
            $("#scale-slider").slider("option", "max", Math.abs(first));
        }else{
            $("#scale-slider").slider("option", "min", Math.abs(first));
            $("#scale-slider").slider("option", "max", Math.abs(last));
        }
        //重新计算图例的宽度
        //----------------------------------线性宽度start------------------------------------------
        var totalWidth = $(".colorLegendUl").width();//不能用这个,因为下面的计算精度不够导致的偏差,会让图例总体的宽度变化
        // var totalWidth = 500;
        var totalScale=Math.abs(Math.abs(first)-Math.abs(last));
        var widthArr=[];
        var restWidth=0;//除去最小限额后算出的剩下的宽度
        var distWidth=500;//500-最小限额后剩下的可分配的宽度
        $(".slideValue").each(function (i) {
            var value = $(this).text();
            var width=0;
            if(i==0){//第一个{
                // var first=$("#scale-slider .ui-slider-pip-first").find(".ui-slider-label").text();
                width=Math.abs(Math.abs(first)-Math.abs(value))/totalScale*totalWidth;
            }else{
                var prev=$(".slideValue").eq(i-1).text();
                width=Math.abs(Math.abs(prev)-Math.abs(value))/totalScale*totalWidth;
            }
            widthArr.push(width);
            if(width<=40){
                distWidth-=40;
            }else{
                restWidth+=width;
            }
        });
        //最后一个
        // var last= $("#scale-slider .ui-slider-pip-last").find(".ui-slider-label").text();
        var value=$(".slideValue").eq(3).text();
        var width=Math.abs(Math.abs(last)-Math.abs(value))/totalScale*totalWidth;
        widthArr.push(width);
        if(width<=40){
            distWidth-=40;
        }else{
            restWidth+=width;
        }

        //开始分配图例的宽度和游标的left
        var slideLeft=0;
        for(var k=0;k<widthArr.length;k++){
            var realWidth=40;
            if(widthArr[k]>40){//小于最小限额则直接是40的宽度,大于则按比例分配 widthArr[k]/restWidth=realWidth/distWidth
                realWidth=widthArr[k]/restWidth*distWidth;
            }
            slideLeft+=realWidth;
            $(".colorLegendUl li").eq(k).width(realWidth);//分配图例的宽度
            if(k<widthArr.length-1){
                $(".slideDiv").eq(k).css("left",slideLeft);//分配游标的left值
            }
        }
        //----------------------------------线性宽度end------------------------------------------
        // sameWidth();
        IntelligentRoadTestGridLegend.initSlideRange();//初始化游标的拖动范围
    }else{
        if(IntelligentRoadTestGridLegend.inputTextVal!=''&&!isNaN(IntelligentRoadTestGridLegend.inputTextVal)){
            alert("请输入("+min+","+max+")区间的值!");
        }
    }
}
/*初始化游标的拖动范围*/
/**********************************
 * @funcname IntelligentRoadTestGridLegend.initSlideRange
 * @funcdesc //初始化游标的拖动范围
 * @param {null}
 * @return {null}
 * @author 杨艳萍
 * @create 20181120
 ***********************************/
IntelligentRoadTestGridLegend.initSlideRange = function IntelligentRoadTestGridLegend_initSlideRange() {
    $(".slideDiv").each(function (index) {
        if(index==0){
            var x1 = $(this).parent().siblings().find("li").eq(0).offset().left;
            var x2 = $(this).next().offset().left;
        }else if(index==3){
            var x1 = $(this).prev().offset().left;
            var x2 = $(this).parents(".slideLegend").next().offset().left;
        }else{
            var x1 = $(this).prev().offset().left;
            var x2 = $(this).next().offset().left;
        }
        $(this).draggable( "option", "containment", [x1+40,30,x2-40,30] );
       /* var containment = $(this).draggable( "option", "containment" );
        console.log(containment)*/
    });
}
/*根据数值初始化游标位置和色块宽度*/
/**********************************
 * @funcname IntelligentRoadTestGridLegend.initSlidePosition
 * @funcdesc //根据数值初始化游标位置和色块宽度
 * @param {Object} gridLegend 图例对象
 * @return {null}
 * @author 陈小芳
 * @create 20181120
 ***********************************/
IntelligentRoadTestGridLegend.initSlidePosition = function IntelligentRoadTestGridLegend_initSlidePosition(gridLegend){
    var legend=null;
    if($('.lineTable').css('display')=='none'){//----------------------------------------除线段外的栅格图层
        //1 初始化插件的值
        if(IntelligentRoadTest.gridTypeIndex==0){//覆盖质量
            legend= gridLegend.fgLegend;
        }else if(IntelligentRoadTest.gridTypeIndex==1){//上行速率
            legend= gridLegend.shLegend;
        }else if(IntelligentRoadTest.gridTypeIndex==2){//下行速率
            legend= gridLegend.xhLegend;
        }else if(IntelligentRoadTest.gridTypeIndex==4){//越区覆盖
            legend= gridLegend.yqLegend;
        }else if(IntelligentRoadTest.gridTypeIndex==5){//重叠覆盖
            legend= gridLegend.cdLegend;
        }else if(IntelligentRoadTest.gridTypeIndex==3){//MOD3干扰
            legend= gridLegend.m3Legend;
        }else if(IntelligentRoadTest.gridTypeIndex==6){//EC/IO
            legend= gridLegend.ecLegend;
        }else if(IntelligentRoadTest.gridTypeIndex==7){//NB
            legend= gridLegend.nbLegend;
        }
        var firstLabel=legend.defaultValue["first"];
        var lastLabel=legend.defaultValue["last"];
        $("#scale-slider .ui-slider-pip-first").find(".ui-slider-label").text(firstLabel);
        $("#scale-slider .ui-slider-pip-last").find(".ui-slider-label").text(lastLabel);
        if(Math.abs(firstLabel)>Math.abs(lastLabel)){
            $("#scale-slider").slider("option", "min", Math.abs(lastLabel));
            $("#scale-slider").slider("option", "max", Math.abs(firstLabel));
        }else{
            $("#scale-slider").slider("option", "min", Math.abs(firstLabel));
            $("#scale-slider").slider("option", "max", Math.abs(lastLabel));
        }


        //2 给图例上面的各个value赋值
        $(".slideValue").eq(0).text(legend.you.value);
        $(".slideValue").eq(1).text(legend.liang.value);
        $(".slideValue").eq(2).text(legend.zhong.value);
        $(".slideValue").eq(3).text(legend.cha.value);

    }else{//----------------------------------------------线段
        //1 初始化插件的值
        if(IntelligentRoadTest.lineTypeIndex==0){//覆盖质量-----------线段
            legend= gridLegend.fgLineLegend;
        }else if(IntelligentRoadTest.lineTypeIndex==1){//上行速率-----------线段
            legend= gridLegend.shLineLegend;
        }else if(IntelligentRoadTest.lineTypeIndex==2){//下行速率------线段
            legend= gridLegend.xhLineLegend;
        }
        var firstLabel=legend.defaultValue["first"];
        var lastLabel=legend.defaultValue["last"];
        $("#scale-slider .ui-slider-pip-first").find(".ui-slider-label").text(firstLabel);
        $("#scale-slider .ui-slider-pip-last").find(".ui-slider-label").text(lastLabel);
        if(Math.abs(firstLabel)>Math.abs(lastLabel)){
            $("#scale-slider").slider("option", "min", Math.abs(lastLabel));
            $("#scale-slider").slider("option", "max", Math.abs(firstLabel));
        }else{
            $("#scale-slider").slider("option", "min", Math.abs(firstLabel));
            $("#scale-slider").slider("option", "max", Math.abs(lastLabel));
        }

        //2 给图例上面的各个value赋值
        $(".slideValue").eq(0).text(legend.you.value);
        $(".slideValue").eq(1).text(legend.liang.value);
        $(".slideValue").eq(2).text(legend.zhong.value);
        $(".slideValue").eq(3).text(legend.cha.value);
    }

    //3 根据value初始化图例的宽度及游标的left值 //先判断是否需要使用缓存的width

    //----------------------------------线性宽度start------------------------------------------
    if(legend.you.width!=0){//有缓存的宽度就直接使用
        //开始分配图例的宽度和游标的left
        var keys=["you","liang","zhong","cha","jicha"];
        var slideLeft=0;
        for(var k=0;k<keys.length;k++){
            var realWidth=legend[keys[k]].width;
            slideLeft+=realWidth;
            $(".colorLegendUl li").eq(k).width(realWidth);//分配图例的宽度
            if(k<keys.length-1){
                $(".slideDiv").eq(k).css("left",slideLeft);//分配游标的left值
            }
        }
    }else{//没有缓存宽度则需要重新计算
        var totalWidth = $(".colorLegendUl").width();//不能用这个,因为下面的计算精度不够导致的偏差,会让图例总体的宽度变化
        // console.log(totalWidth+'--------------------------');
        var widthArr=[];
        var restWidth=0;//除去最小限额后算出的剩下的宽度
        var distWidth=500;//500-最小限额后剩下的可分配的宽度
        var totalScale=$("#scale-slider").slider("option", "max")-$("#scale-slider").slider("option", "min");
        $(".slideValue").each(function (i) {
            var value = $(this).text();
            var width=0;
            if(i==0){//第一个{
                var first=$("#scale-slider .ui-slider-pip-first").find(".ui-slider-label").text();
                width=Math.abs(Math.abs(first)-Math.abs(value))/totalScale*totalWidth;
            }else{
                var prev=$(".slideValue").eq(i-1).text();
                width=Math.abs(Math.abs(prev)-Math.abs(value))/totalScale*totalWidth;
            }
            widthArr.push(width);
            if(width<=40){
                distWidth-=40;
            }else{
                restWidth+=width;
            }
        });
        //最后一个
        var last= $("#scale-slider .ui-slider-pip-last").find(".ui-slider-label").text();
        var value=$(".slideValue").eq(3).text();
        var width=Math.abs(Math.abs(last)-Math.abs(value))/totalScale*totalWidth;
        widthArr.push(width);
        if(width<=40){
            distWidth-=40;
        }else{
            restWidth+=width;
        }

        //开始分配图例的宽度和游标的left
        var slideLeft=0;
        for(var k=0;k<widthArr.length;k++){
            var realWidth=40;
            if(widthArr[k]>40){//小于最小限额则直接是40的宽度,大于则按比例分配 widthArr[k]/restWidth=realWidth/distWidth
                realWidth=widthArr[k]/restWidth*distWidth;
            }
            slideLeft+=realWidth;
            $(".colorLegendUl li").eq(k).width(realWidth);//分配图例的宽度
            if(k<widthArr.length-1){
                $(".slideDiv").eq(k).css("left",slideLeft);//分配游标的left值
            }
        }
    }
    //------------------------------------线性宽度end----------------------------------------------------------------------------
    // sameWidth();


}

/**********************************
 * @funcname IntelligentRoadTestGridLegend.initNotCount
 * @funcdesc //根据栅格图例区间缓存初始化记录数的初始值
 * @param {Number} gridTypeIndex 栅格类型
 * @return {String} gridInterval IntelligentRoadTestGridLegend.gridLegend的key
 * @author 陈小芳
 * @create 20181120
 ***********************************/
IntelligentRoadTestGridLegend.initNotCount=function IntelligentRoadTestGridLegend_initNotCount(){
    var gridLegend = localStorage.getItem("gridLegend");
    if(gridLegend!=null&&gridLegend!=""){
        var legend=JSON.parse(gridLegend)
        if(!isNull(legend.version)&&legend.version==2.1){
            IntelligentRoadTestGridLegend.gridLegend=legend;
        }
    }
    var gridLegendObj=IntelligentRoadTestGridLegend.gridLegend;
    for(var key in gridLegendObj){
        if(key!="version"){
            var gridTypeIndex=gridLegendObj[key]["gridTypeIndex"];
            var notCount=gridLegendObj[key]["notCount"].value;
            if(key.indexOf('Line')>-1){//线段上的
                var index = $('.lineFieldset2 input[name="grid-type-line"][value="'+gridTypeIndex+'"]').parent().index();
                $('.lineFieldSetInfo .gridTypeDiv:eq('+index+') .counter').text(notCount);//线段图层上的
            }else{
                var index = $('.gridFieldset2 input[name="grid-type"][value="'+gridTypeIndex+'"]').parent().index();
                $('.gridFieldSetInfo .gridTypeDiv:eq('+index+') .counter').text(notCount);//图层上的
            }
        }
    }

}

/**********************************
 * @funcname IntelligentRoadTestGridLegend.getGridInterval
 * @funcdesc //根据栅格类型获取对应的用户配置好的栅格图例区间
 * @param {Number} gridTypeIndex 栅格类型
 * @param {String} type 只有'grid'和'line'两种类型
 * @return {String} gridInterval IntelligentRoadTestGridLegend.gridLegend的key
 * @author 陈小芳
 * @create 20181120
 ***********************************/
IntelligentRoadTestGridLegend.getGridIntervalKey=function IntelligentRoadTestGridLegend_getGridIntervalKey(gridTypeIndex,type){
    if(type=="line"){//线段图例
        var gridIntervalKey="fgLineLegend";
        if(gridTypeIndex==1){//上行速率
            gridIntervalKey="shLineLegend";
        }else if(gridTypeIndex==2){//下行速率
            gridIntervalKey="xhLineLegend";
        }
    }else{
        var gridIntervalKey="fgLegend";
        if(gridTypeIndex==1){//上行速率
            gridIntervalKey="shLegend";
        }else if(gridTypeIndex==2){//下行速率
            gridIntervalKey="xhLegend";
        }else if(gridTypeIndex==3){//MOD3干扰
            gridIntervalKey="m3Legend";
        }else if(gridTypeIndex==4){//越区覆盖
            gridIntervalKey="yqLegend";
        }else if(gridTypeIndex==5){//重叠覆盖
            gridIntervalKey="cdLegend";
        }else if(gridTypeIndex==6){//EC/IO
            gridIntervalKey="ecLegend";
        }else if (gridTypeIndex==7){//NB
            gridIntervalKey="nbLegend";
        }
    }

    return gridIntervalKey;
}

/**********************************
 * @funcname IntelligentRoadTestGridLegend.syncRecordValue
 * @funcdesc 用户调整完成记录数,需要更新图层的配置,当前查看图例对象的缓存,图例的本地缓存,重绘栅格
 * @param {String} value 传入用户调整好的记录数
 * @return {null}
 * @author 陈小芳
 * @create 20191120
 ***********************************/
IntelligentRoadTestGridLegend.syncRecordValue=function IntelligentRoadTestGridLegend_syncRecordValue(value){
    //1 更新缓存
    IntelligentRoadTest.gridInterval.notCount.value=value;//更新当前查看的缓存
    IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].notCount.value=value;//更新栅格图例缓存记录
    localStorage.setItem("gridLegend", JSON.stringify(IntelligentRoadTestGridLegend.gridLegend));

    if($('.lineTable').css('display')=='none'){
        //2 同步记录数
        var index = $('.gridFieldset2 input[name="grid-type"][value="'+IntelligentRoadTest.gridTypeIndex+'"]').parent().index();//栅格图层【栅格类型】选中的下标
        $('.gridFieldSetInfo .gridTypeDiv:eq('+index+') .counter').text(value);

        //3 重绘栅格
        if(IntelligentRoadTest.isShowGrid){
            if (IntelligentRoadTest.currentLocation.toLowerCase().endsWith("sector")) {//重新查询扇区的栅格数据
                if (IntelligentRoadTest.gridDataV2) {
                    IntelligentRoadTestSystemLayerV3.showSectorGridByCanv(IntelligentRoadTest.gridDataV2);
                }
            } else {//重新查询场景或弱区栅格的数据
                if (IntelligentRoadTest.gridDataV2) {
                    IntelligentRoadTestSystemLayerV3.showGridV2(IntelligentRoadTest.gridDataV2);
                }
            }
        }
    }else{
        //2 同步记录数
        var index = $('.lineFieldset2 input[name="grid-type-line"][value="'+IntelligentRoadTest.lineTypeIndex+'"]').parent().index();//栅格图层【栅格类型】选中的下标
        $('.lineFieldSetInfo .gridTypeDiv:eq('+index+') .counter').text(value);

        //3 杰禹增加线段的逻辑
        //是否需要加载线段数据，加上了工单情况下的加载,
        if (IntelligentRoadTest.index == 7 || IntelligentRoadTest.index == 8 || IntelligentRoadTest.index == 14
            || (IntelligentRoadTest.index == 2 && (IntelligentRoadTest.clickSenseName == "highway" || IntelligentRoadTest.clickSenseName == "rail" || IntelligentRoadTest.clickSenseName == "cityRoad"))) {
            IntelligentRoadTest.osmColorLegen();
        }

        if (IntelligentRoadTest.index == 15) {
            IntelligentRoadTest.metroColorLegen();
        }

    }

}


/**********************************
 * @funcname IntelligentRoadTestGridLegend.syncGridInterval
 * @funcdesc 用户重新配置了栅格区间,需要更新当前查看图例对象的缓存,图例的本地缓存,重绘栅格
 * @param {null}
 * @return {null}
 * @author 陈小芳
 * @create 20191120
 ***********************************/
IntelligentRoadTestGridLegend.syncGridInterval=function IntelligentRoadTestGridLegend_syncGridInterval(){
    var first=$("#scale-slider .ui-slider-pip-first").find(".ui-slider-label").text();//0
    var last=$("#scale-slider .ui-slider-pip-last").find(".ui-slider-label").text();//100
    IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].defaultValue.first=first;
    IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].defaultValue.last=last;

    if($('.lineTable').css('display')=='none'){
        IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].you.value=$(".slideValue").eq(0).text();
        IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].liang.value=$(".slideValue").eq(1).text();
        IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].zhong.value=$(".slideValue").eq(2).text();
        IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].cha.value=$(".slideValue").eq(3).text();
        // IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].jicha.value=last;
        if(IntelligentRoadTest.gridTypeIndex==3||IntelligentRoadTest.gridTypeIndex==4||IntelligentRoadTest.gridTypeIndex==5){//MOD3干扰/越区覆盖/重叠覆盖
            IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].you.max=$(".slideValue").eq(0).text();
            // IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].you.min=first;
            IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].liang.max=$(".slideValue").eq(1).text();
            IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].liang.min=$(".slideValue").eq(0).text();
            IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].zhong.max=$(".slideValue").eq(2).text();
            IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].zhong.min=$(".slideValue").eq(1).text();
            IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].cha.max=$(".slideValue").eq(3).text();
            IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].cha.min=$(".slideValue").eq(2).text();
            // IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].jicha.max=last;
            IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].jicha.min=$(".slideValue").eq(3).text();

        }else if(IntelligentRoadTest.gridTypeIndex==0||IntelligentRoadTest.gridTypeIndex==1||IntelligentRoadTest.gridTypeIndex==2||IntelligentRoadTest.gridTypeIndex==6){///上行速率/下行速率 //覆盖质量 //EC/IO
            // IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].you.max=first;
            IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].you.min=$(".slideValue").eq(0).text();
            IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].liang.max=$(".slideValue").eq(0).text();
            IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].liang.min=$(".slideValue").eq(1).text();
            IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].zhong.max=$(".slideValue").eq(1).text();
            IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].zhong.min=$(".slideValue").eq(2).text();
            IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].cha.max=$(".slideValue").eq(2).text();
            IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].cha.min=$(".slideValue").eq(3).text();
            IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].jicha.max=$(".slideValue").eq(3).text();
            // IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].jicha.min=last;
        }
    }else{
        IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].you.value=$(".slideValue").eq(0).text();
        // IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].you.max=first;
        IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].you.min=$(".slideValue").eq(0).text();

        IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].liang.value=$(".slideValue").eq(1).text();
        IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].liang.max=$(".slideValue").eq(0).text();
        IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].liang.min=$(".slideValue").eq(1).text();

        IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].zhong.value=$(".slideValue").eq(2).text();
        IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].zhong.max=$(".slideValue").eq(1).text();
        IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].zhong.min=$(".slideValue").eq(2).text();

        IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].cha.value=$(".slideValue").eq(3).text();
        IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].cha.max=$(".slideValue").eq(2).text();
        IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].cha.min=$(".slideValue").eq(3).text();

        // IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].jicha.value=last;
        IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].jicha.max=$(".slideValue").eq(3).text();
        // IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].jicha.min=last;
    }

    IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].you.width=$(".colorLegendUl li:eq(0)")[0].getBoundingClientRect().width;
    IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].liang.width=$(".colorLegendUl li:eq(1)")[0].getBoundingClientRect().width;
    IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].zhong.width=$(".colorLegendUl li:eq(2)")[0].getBoundingClientRect().width;
    IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].cha.width=$(".colorLegendUl li:eq(3)")[0].getBoundingClientRect().width;
    IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey].jicha.width=$(".colorLegendUl li:eq(4)")[0].getBoundingClientRect().width;
    //var width=$(this)[0].getBoundingClientRect().width;

    IntelligentRoadTest.gridInterval=IntelligentRoadTestGridLegend.gridLegend[IntelligentRoadTest.gridIntervalKey];
    localStorage.setItem("gridLegend", JSON.stringify(IntelligentRoadTestGridLegend.gridLegend));
    IntelligentRoadTest.gridThresholds=IntelligentRoadTestSystemLayerV3.getGridThresholds(IntelligentRoadTest.gridTypeIndex, IntelligentRoadTest.gridOpacity)
    if($('.lineTable').css('display')=='none'){
        IntelligentRoadTest.GridMap.setThresholds(IntelligentRoadTest.gridThresholds);
        IntelligentRoadTest.colorbarEndRedraw();//重绘栅格
    }else{
        //杰禹添加线段的逻辑代码
        //高速、高铁、市政路，加上了工单情况下的加载,
        if (IntelligentRoadTest.index == 7 || IntelligentRoadTest.index == 8 || IntelligentRoadTest.index == 14
            || (IntelligentRoadTest.index == 2 && (IntelligentRoadTest.clickSenseName == "highway" || IntelligentRoadTest.clickSenseName == "rail" || IntelligentRoadTest.clickSenseName == "cityRoad"))) {
            IntelligentRoadTest.osmColorLegen();
        }
        //地铁
        if (IntelligentRoadTest.index == 15) {
            IntelligentRoadTest.metroColorLegen();
        }

    }

}



/**********************************
 * @funcname IntelligentRoadTestGridLegend.syncLegendPanel
 * @funcdesc 用户切换图例栅格类型面板,需要更新栅格图层面板,并重绘栅格
 * @param {null}
 * @return {null}
 * @author 陈小芳
 * @create 20191120
 ***********************************/
IntelligentRoadTestGridLegend.syncLegendPanel=function IntelligentRoadTestGridLegend_syncLegendPanel(){
    var textValue=$('.gridBoxSelectionUl .active').text();
    if($('.lineTable').css('display')=='none'){
        $(".slideLegend .scale-text").text(textValue.split(" ")[1]);
        var gridconditions = $('.gridBoxSelectionUl .active').data("gridconditions").split("|");//例如: 0|主接入场强|1|week|0  覆盖质量
        $('.gridFieldset2 input[name="grid-type"][value="'+gridconditions[4]+'"]').click();//配置栅格类型
        $('input[name="gridTime"][value="'+gridconditions[3]+'"]').click();//配置时间粒度
        $('input[name="gridTime"][value="'+gridconditions[3]+'"]').siblings('label').css("color","#3285FF");
        if(gridconditions[4]==0){//如果是覆盖质量，需要重置一下勾选的选项
            $('input[name="band-radio"][value='+gridconditions[0]+']').click();//不分频段
            $('input[name="chq-grid"][value='+gridconditions[1]+']').click();//主接入场强
            $('input[name="gridNum"][value='+gridconditions[2]+']').click();//AGPS-MR
        }
        // $('#grid').parents('table').find('input:checkbox:checked,input:radio:checked').prop("checked",true);
        $('#grid').parents('tr').siblings().find('input:checkbox:checked,input:radio:checked').siblings('label').css("color","#3285FF");
        //在附近覆盖的场景
        if(IntelligentRoadTest.showNrCover){
            //增加4G扇区和移动站址扇区的勾选
            if(gridconditions[4]!=6){
                IntelligentRoadTest.currentNrCover="4G";
                $(".NrText").text($('.NrUl li[data-nrcover="'+IntelligentRoadTest.currentNrCover+'"]').text());
                $('.NrUl li[data-nrcover="'+IntelligentRoadTest.currentNrCover+'"]').addClass("selected").siblings().removeClass("selected");

                $("#sector2G").prop("checked", false);
                $("#yd_sector").prop("checked", true);
                $("#sector").prop("checked", true);
                $("#sector").parents('tr').siblings().children().find('input:checkbox').prop("checked", true);
                $("#sector").parents('tr').siblings().children().find('input:checkbox').siblings('label').css("color","#3285FF");
            }

        }
        IntelligentRoadTest.submitLayersData();//开始重新查询栅格
    }else{
        //杰禹添加线段的逻辑
        var gridIndex = $('.lineBoxSelectionUl .active').data("gridindex");
        $('.lineFieldset2 input[name="grid-type-line"][value="'+gridIndex+'"]').click();//配置栅格类型
        IntelligentRoadTest.submitLayersData();//开始重新查询栅格
    }


}

//图例分配等宽
function  sameWidth() {
    var keys=["you","liang","zhong","cha","jicha"];
    var slideLeft=0;
    for(var k=0;k<keys.length;k++){
        var realWidth=100;
        slideLeft+=realWidth;
        $(".colorLegendUl li").eq(k).width(realWidth);//分配图例的宽度
        if(k<keys.length-1){
            $(".slideDiv").eq(k).css("left",slideLeft);//分配游标的left值
        }
    }
}




