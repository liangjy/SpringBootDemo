
//绘制栅格时用到的通用方法

//-------------------绘制栅格-------------------------
/*
 * 添加一个conf对象构造方法 query代表查询对象，包含查询数据所需的模板以及模板参数列表  ，  factsConf代表指标配置对象，包含指标列表，指标对应的数值区间以及颜色值等等
 * gripInfo代表栅格信息对象，包含栅格的信息在数据库中的字段名称以及对应的在页面显示时的名称
 */
//function Conf (query , factsConf , gripInfo){
//	this.query = query;
//	this.factsConf = factsConf;
//	this.gripInfo = gripInfo;
//}
/**********************************
 * @funcname Query
 * @funcdesc Query对象的构造方法
 * @param {String} templateID  , {int} database , {Map} queryKeys
      templateID 代表查询模板的ID , database代表数据库代号 , queryKeys代表查询所诉的参数列表
 * @return  
 * @author 林楚佳
 * @create 20170602
 * @modifier nameOfModifier
 * @modify dateOfModification
 ***********************************/
function Query(templateID , database ,queryKeys){
	this.templateID = templateID;
	this.database = database;
	this.queryKeys = queryKeys;
}

////-----添加一个factsConf(指标配置)对象构造方法 facts代表指标列表 ，里面可能包含有多个的指标对象 ， dropDownId代表前端页面中的指标下拉列表的元素对象的ID，方便定位，将指标的基本信息放入页面中----------
//function FactsConf(facts , dropDownID){
//	this.facts = facts;
//	this.dropDownID = dropDownID;
//}

/**********************************
 * @funcname Fact
 * @funcdesc 指标对象的构造函数
 * @param {Array} codes  , {String} name , {Array} ranges , {int} position
       codes表示该指标对应的数据库查询中的哪些字段名称
 * @return {datatype}
 * @author nameOfauthor
 * @create dateOfCreation
 * @modifier nameOfModifier
 * @modify dateOfModification
 ***********************************/
function  Fact(codes , name , ranges , position){
	this.codes = codes;
	this.name = name;
	this.ranges = ranges;
	this.position = position;
}

/**********************************
 * @funcname Range
 * @funcdesc 区间栏对象的构造函数
 * @param {String} color , {Object} interval , {String} level
      color代表区间栏所表示的颜色 , interval代表区间对象 , level是一个标识符，用于区分不同的区间栏的格子
 * @return {datatype}
 * @author nameOfauthor
 * @create dateOfCreation
 * @modifier nameOfModifier
 * @modify dateOfModification
 ***********************************/
function Range(color , interval , level){
	this.color = color;
	this.interval = interval;
	this.level = level;
}

/**********************************
 * @funcname Interval
 * @funcdesc 区间对象的构造函数
 * @param {Stirng} leftValue ,  {Boolean} isLeftClose , {Stirng} rightValue , {Boolean} isRightClose 
       leftValue代表区间的左边界的值 , isLeftClose代表区间是否闭合 , rightValue代表右区间的值 , isRightClose代表右区间是否闭合
 * @return 
 * @author 林楚佳	
 * @create 20160602
 * @modifier  
 * @modify  
 ***********************************/
function Interval(leftValue , isLeftClose , rightValue,isRightClose){
	this.leftValue = leftValue;
	this.isLeftClose = isLeftClose;
	this.rightValue = rightValue;
	this.isRightClose = isRightClose;
}
/**********************************
 * @funcname Info
 * @funcdesc Info对象的构造方法
 * @param {String} code  , {String} codeName
      code表示信息编码(查询的列表名称)  ,  codeName代表页面中显示的名称
 * @return  
 * @author 林楚佳
 * @create 20160602
 * @modifier  
 * @modify  
 ***********************************/
function Info(code , codeName){
	this.code = code;
	this.codeName = codeName;
}

/**********************************
 * @funcname getQueryList
 * @funcdesc 通过取数模板ID 和取数的参数列表的Mapmap对象获取到一个可用于查询的list
 * @param {String} templateID , {Map} map
      templateID代表取数模板的ID , map代表取数的参数列表的map集合 key表示要替换掉的字段的名称  , value代表要替换进去的值
 * @return {List} list
 * @author 林楚佳
 * @create  20160606
 * @modifier  
 * @modify  
 ***********************************/
function getQueryList(templateID , map){
	var list = [];
	list.push(templateID);
	for(var i = 0 ; i < map.elements.length;i++){
		list.push(map.elements[i].value);
	}
	return list;
}


/**********************************
 * @funcname refress
 * @funcdesc 刷新地图上的栅格，也就是清楚地图上的栅格并根据查询参数不同重新绘制栅格
 * @param {Object} query  , {Object} gridMap , {Object} fact , {Array} colorBarArr
      query代表查询对象 , gridMap表示承载绘制栅格的地图的容器 , fact表示指标区间对象 , colorBarArr 代表被选中不显示的栅格区间的区间栏id数组
 * @return  
 * @author 林楚佳
 * @create 20170606
 * @modifier  
 * @modify  
 ***********************************/
function refress(query ,gridMap , fact , colorBarArr){
	if(query!= null){
		var list = getQueryList(query.templateID, query.queryKeys);
		getTileData(list , colorBarArr, gridMap, fact);
	}
}

/**********************************
 * @funcname drawGrids
 * @funcdesc 绘制栅格
 * @param {Object} gridMap , {BMap} map , {Object} fact , {Array} colorBarArr
 *      gridMap表示承载绘制栅格的地图的容器 , map表示百度地图的地图实例 , fact表示指标区间对象 , colorBarArr 代表被选中不显示的栅格区间的区间栏id数组
 * @return  
 * @author 林楚佳
 * @create 20170606
 * @modifier  
 * @modify  
 ***********************************/
function drawGrids(gridMap , map, fact , colorBarArr){
	console.log("调用drawGrids方法" +  new Date());
	var queryTemp = getQueryObj(map); //通过map，获取相关的数据，包括地图的区域最大经纬度，以及页面中其他参数。
	if(queryTemp!= null){
		var list = getQueryList(queryTemp.templateID , queryTemp.queryKeys);
		getTileData(list , colorBarArr, gridMap, fact);
	}
}

/**********************************
 * @funcname doShowOrHide 
 * @funcdesc 根据用户的需求显示区间栏的颜色或者隐藏区间栏的颜色
 * @param {Element} $id , {String} keyWord  
 *      $id代表指标区间栏的元素对象 , keyWord表示该指标的名称，在处理该指标区间名称时需要将指标的名称截去，
 *      所以这个keyWord会被截去，而指标的名称可能不同，所以需要传递这个参数给这个方法
 * @return  
 * @author 林楚佳
 * @create 20170606
 * @modifier  
 * @modify  
 ***********************************/
function doShowOrHide($id , keyWord){
	var id = $id.id;
	var clickId = "";
	if(id.indexOf(keyWord) > -1){
		var num = id.split('_')[1];
		for(var i = 0 ; i < fact.ranges.length; i++){
			if(num == fact.ranges[i].level.split('_')[1]){
				//这里判断的时候注意一下空格问题，可能因为空格的原因导致点击切换的效果失效。
				if( fact.ranges[i].color == $id.style.backgroundColor ){ //如果是红色的背景颜色就将背景颜色的属性更改为灰色或者黑色
					$id.style.backgroundColor="rgb(63, 72, 72)";
					$id.style.border="1px solid rgb(63, 72, 72)";
					SrvPrdMdl4G.colorBarArr.push(id);//需要不显示的颜色栅格
				}else{
					SrvPrdMdl4G.colorBarArr = SrvPrdMdl4G.removeId(SrvPrdMdl4G.colorBarArr,id);
					$id.style.backgroundColor=fact.ranges[i].color;
					$id.style.border="1px solid "+ fact.ranges[i].color;
				}
			}
		}
	}
}

/**********************************
 * @funcname clearGridByColor
 * @funcdesc 清除栅格并重新绘制栅格
 * @param {Array} colorBarArr , {Array} tileData , {Object}gridMap , {Object} fact
      colorBarArr 代表被选中不显示的栅格区间的区间栏id数组  ， tileData表示要绘制的栅格的数据， gridMap表示承载绘制栅格的地图的容器 ， fact表示指标区间的对象
 * @return 
 * @author 林楚佳
 * @create 20170606
 * @modifier    
 * @modify  
 ***********************************/
function clearGridByColor(colorBarArr , tileData , gridMap ,fact){
	console.log("调用clearGridByColor" + new Date());
	//判断用户是否点击了数值区间条的按钮
	if(colorBarArr.length==0){ //没有点击，也即是所有的区间都要显示
		gridMap.clear();
		gridMap.draw(tileData);
	}else{
		var data = tileData;
		for(var j=0;j<colorBarArr.length;j++){ //如果用户点击了之后，会记录进数组，遍历数组之后进行筛选数据，再进行绘制  
			data = clearData2(data,colorBarArr[j],fact);
		}
		gridMap.clear();
		gridMap.draw(data);
	}
}

/**********************************
 * @funcname clearData2
 * @funcdesc 根据指标区间栏的点击情况来筛选需要显示的数据
 * @param {Array} data  , {int} id , {Fact} fact
      data表示需要进行过滤的数据数组  ， id表示的是区间栏每一个区间的id , fact表示指标区间对象
 * @return {Array}newTileData 返回筛选过后的数据数组
 * @author 林楚佳
 * @create 20170606
 * @modifier  
 * @modify  
 ***********************************/
function clearData2(data , id , fact){
	console.log("调用clearData2" + new Date());
	var newTileData =[];
	for(var i=0;i<data.length;i++){
		for(var k = 0 ;k < fact.ranges.length; k++){
			if(id.split("_")[1] == fact.ranges[k].level.split("_")[1]){
				var interval = fact.ranges[k].interval;
				if(interval.leftValue != "-x" && interval.RightValue != "+x"){ //如果区间的左右都不是无穷大的情况
						if(interval.isLeftClose == true){ //如果左区间闭合
							if(data[i][fact.position] < parseInt(interval.leftValue)){
								newTileData.push(data[i]);
							}
						}else{ //如果左区间不闭合
							if(data[i][fact.position] <= parseInt(interval.leftValue)){
								newTileData.push(data[i]);
							}
						}
						if(interval.isRightClose == true){
							if(data[i][fact.position] > parseInt(interval.rightValue)){
								newTileData.push(data[i]);
							}
						}else{
							if(data[i][fact.position] >= parseInt(interval.rightValue)){
								newTileData.push(data[i]);
							}
						}
				}else{ //如果其中有一个为无穷大的情况
					if(interval.leftValue == "-x"){ //左区间数值是负无穷大，则不需要判断比它小的值，直接判断比它的右区间大的值就行了
						if(interval.isRightClose == true){
							if(data[i][fact.position] > parseInt(interval.rightValue)){
								newTileData.push(data[i]);
							}
						}else{
							if(data[i][fact.position] >= parseInt(interval.rightValue)){
								newTileData.push(data[i]);
							}
						}
					}else{
						if(interval.isLeftClose == true){
							if(data[i][fact.position] < parseInt(interval.leftValue)){
								newTileData.push(data[i]);
							}
						}else{
							if(data[i][fact.position] <= parseInt(interval.leftValue)){
								newTileData.push(data[i]);
							}
						}
					}
				}
			} 
		}
	}
	return newTileData;
}