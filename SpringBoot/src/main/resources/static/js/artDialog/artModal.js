
//入口方法，初始化变量
function modalInfo(localStorageName,id,content,width,fontSize,color){
    this.isFirst = true;//首次加载
    this.localStorageName = localStorageName;//缓存名称
    this.id=id;//弹框id
    this.content=content;//弹框内容
    this.width=width;//弹窗宽度
    this.fontSize=fontSize;//字体大小
    this.color=color;//字体颜色
    modalInfo.prototype.that = this;
}

//打开弹框
modalInfo.prototype.openModal = function(){
    var that = modalInfo.prototype.that;
    this.isFirst = true;
    //获取缓存名称，判断是否首次加载
    var systemTip = localStorage.getItem(this.localStorageName);
    if(systemTip){
        this.isFirst = false;
    }
    //复选框 我知道了，不需再提示
    var contentKnow = '<div style="margin-top:10px;"><input type="checkbox" class="Iknow"/><label>我知道了，不需再提示</label></div>';;
    if(this.isFirst){
        art.dialog({
            lock: true,  //锁屏
            id: this.id,  //id
            width: this.width+'px',  //宽度
            content: '<div>' + this.content+'</div>' + contentKnow,  //内容
        }); //初始化弹框

    }

    $(".aui_state_focus").attr("id",this.id); //弹框添加id
    $('#'+that.id + ' .aui_content').css("font-size",this.fontSize+"px"); //字体大小
    $('#'+that.id + ' .aui_content').css("color",this.color);  //字体颜色

    // ”我知道了“关闭弹框不再显示（除了清缓存）
    $('#'+that.id + ' .Iknow').click(function(){
        if ($(this).is(':checked')){
            localStorage.setItem(that.localStorageName,true);
            that.isFirst=false;
            art.dialog({id:that.id}).close();  //关闭弹框
        }
    });
}