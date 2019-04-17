L.Control.Legend = L.Control.extend({
    options: {
        position: 'topright' //初始位置

    },
    initialize: function (options,TileLayerWMSObject) {
        L.Util.extend(this.options, options);
        this._TileLayerWMSObject = TileLayerWMSObject;
    },
    onAdd: function (map) {
        //创建一个class为leaflet-control-clegend的div
        this._container = L.DomUtil.create('div', 'BMap_noprint OSMControlTOP');
        var buttonDiv = document.createElement("div");
        var divWrap = document.createElement("div");

        /*
        var selectDiv = document.createElement("div");
        var selectText = document.createTextNode("普通");
        selectDiv.appendChild(selectText);*/

        var div1 = document.createElement("div");
        var e1 = document.createTextNode("普通");
        div1.appendChild(e1);

        var div2 = document.createElement("div");
        var e2 = document.createTextNode("卫星");
        div2.appendChild(e2);

        var div3 = document.createElement("div");
        var e3 = document.createTextNode("混合");
        div3.appendChild(e3);
        // // 设置样式
        //selectDiv.className = 'BMap-select';
        div1.className = 'BMap-btn div1 BMap-active';
        div2.className = 'BMap-btn div2';
        div3.className = 'BMap-btn div2';

        divWrap.appendChild(div1);
        divWrap.appendChild(div2);
        divWrap.appendChild(div3);

        //div.append(selectDiv);
        buttonDiv.appendChild(divWrap);

        divWrap.className = 'BMapSelect';
        this._div = buttonDiv

        var thisObject = this;

        // 绑定事件
        /*
        div3.onclick = function (e) {
            $(this).addClass("BMap-active").siblings().removeClass("BMap-active");
            selectDiv.innerText = '混合';
            $(this).parent().hide();
            console.log("div3---click");
            thisObject._TileLayerWMSObject.setUrl('http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}');
        }

        div1.onclick = function (e) {
            $(this).addClass("BMap-active").siblings().removeClass("BMap-active");
            selectDiv.innerText = '普通';
            $(this).parent().hide();
            console.log("div1---click");
            thisObject._TileLayerWMSObject.setUrl('http://132.126.23.107:8080/styles/positron/{z}/{x}/{y}.png')
        }

        div2.onclick = function (e) {
            $(this).addClass("BMap-active").siblings().removeClass("BMap-active");
            selectDiv.innerText = '卫星';
            $(this).parent().hide();
            console.log("div2---click");
            thisObject._TileLayerWMSObject.setUrl('http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}');
        }*/

        div3.onclick = function(e){
            div1.style.backgroundColor = "#fff";
            div1.style.color = "black";
            div1.style.fontWeight = "normal";

            div2.style.backgroundColor = "#fff";
            div2.style.color = "black";
            div2.style.fontWeight = "normal";

            div3.style.backgroundColor = "rgb(142, 168, 224)";
            div3.style.color = "white";
            div3.style.fontWeight = "bold";
            thisObject._TileLayerWMSObject.setUrl('http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}');

        }

        div1.onclick = function(e){
            div2.style.backgroundColor = "#fff";
            div2.style.color = "black";
            div2.style.fontWeight = "normal";

            div3.style.backgroundColor = "#fff";
            div3.style.color = "black";
            div3.style.fontWeight = "normal";

            div1.style.backgroundColor = "rgb(142, 168, 224)";
            div1.style.color = "white";
            div1.style.fontWeight = "bold";

            thisObject._TileLayerWMSObject.setUrl(commonOsmUrl + '/styles/positron/{z}/{x}/{y}.png');
        }

        div2.onclick = function(e){
            div1.style.backgroundColor = "#fff";
            div1.style.color = "black";
            div1.style.fontWeight = "normal";

            div3.style.backgroundColor = "#fff";
            div3.style.color = "black";
            div3.style.fontWeight = "normal";

            div2.style.backgroundColor = "rgb(142, 168, 224)";
            div2.style.color = "white";
            div2.style.fontWeight = "bold";
            thisObject._TileLayerWMSObject.setUrl('http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}');

        }


        /*
         var legendimg = document.createElement('img');
         legendimg.id = 'leaflet-control-clegend';
         legendimg.type = 'img';
         legendimg.src = "deng.png";
         this._legendimg = legendimg;
         //创建一个关闭控件的按钮
         var closebutton = document.createElement('a');
         closebutton.id = 'leaflet-control-geosearch-close';
         closebutton.className = 'glyphicon glyphicon-remove';
         this._closebutton = closebutton;*/

        //this._container.appendChild(this._closebutton);
        //this._container.appendChild(this._legendimg);
        this._container.appendChild(this._div);
        //注册关闭事件
        //L.DomEvent.addListener(this._closebutton, 'click', this._onCloseControl, this);

        return this._container;
    },
    _onCloseControl: function () {
        this._map.options.Legend = false;
        this.removeFrom(this._map);
    },
});