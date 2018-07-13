function beforeClick(treeId, treeNode) {  
}  
function onCheck(e, treeId, treeNode) {  
}       
  
ZtreeUtil.prototype.showTree=function(){
    this.zTreeObj = $.fn.zTree.init($("#"+this.div),this.setting, this.data);
    var nodes = this.zTreeObj.getNodes();
    //将二级节点展开
    for (var i = 0; i < nodes.length; i++) { //设置节点展开
    	this.zTreeObj.expandNode(nodes[i], true, false, true);
    }
}
//根据node_id设置选中的节点  allNodeId==node_id+"_"+node_id+...
ZtreeUtil.prototype.chekeNode=function(allNodeId){
	if(allNodeId==null||allNodeId==undefined||allNodeId==""){
		return;
	}
	var sp=allNodeId.split('_');
	if(sp!=null&&sp!=undefined&&sp!=""){
		for(var i=0;i<sp.length;i++){
			var node = this.zTreeObj.getNodeByParam("node_id",sp[i]);
			this.zTreeObj.checkNode(node, true, true);
		}
	}
}
function ZtreeUtil(div,data){
	this.zTreeObj=null;
	this.div=div;
	this.data=data;
	this.setting = {  
	  check: { /**复选框**/ 
	  enable: true,  //是否显示复选框
	  chkboxType: {"Y":"", "N":""}  ,
	  enable: true,
	 },  
	 view: {                                    
	  expandSpeed: 300 //设置树展开的动画速度，IE6下面没效果，  
	 },                            
	 data: {                                    
	  simpleData: {   //简单的数据源，一般开发中都是从数据库里读取，API有介绍，这里只是本地的                           
	   enable: true,  
	   idKey: "node_id",  //id和pid，这里不用多说了吧，树的目录级别  
	   pIdKey: "parent_id",  
	   rootPId: 0   //根节点  
	  }                            
	 },                           
	 callback: {     /**回调函数的设置，随便写了两个**/  
	  beforeClick: beforeClick,                                    
	  onCheck: onCheck                            
	 }  
	};  
}