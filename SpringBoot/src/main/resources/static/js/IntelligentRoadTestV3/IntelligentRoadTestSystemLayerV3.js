var IntelligentRoadTestSystemLayerV3={};
IntelligentRoadTestSystemLayerV3.isAudit=0;
IntelligentRoadTestSystemLayerV3.poorArea={
    "poor":{index:0,type:0,name:"弱覆盖区"},
    "m3PoorArea":{index:26,type:6,name:"MOD3干扰区"},
    "olPoorArea":{index:27,type:7,name:"重叠覆盖区"},
    "cbPoorArea":{index:28,type:8,name:"越区覆盖区"},
    "upPoorArea":{index:24,type:4,name:"上行低速区"},
    "downPoorArea":{index:25,type:5,name:"下行低速区"}
};//弱区
IntelligentRoadTestSystemLayerV3.layers={
    "sector":'<table>\n' +
    '\t<tr>\n' +
    '\t\t<td colspan="3">\n' +
    '\t\t\t<div class="layer-name">\n' +
    '\t\t\t\t<input type="checkbox" name="layer" id="sector" value="3">\n' +
    '\t\t\t\t<label for="sector">扇区图层</label>\n' +
    '\t\t\t</div>\n' +
    '\t\t\t<div class="layer-opacity">\n' +
    '\t\t\t\t<span class="opacityText">透明度：</span>\n' +
    '\t\t\t\t<input type="number" id="sectorOpacity" class="iptNum" min="0" max="1" step="0.1" value="0.5">\n' +
    '\t\t\t\t<button class="btn-showTableInfo"><img src="../js/IntelligentRoadTestV3/images/layer_xiala.png"></button>\n' +
    '\t\t\t</div>\n' +
    '\t\t</td>\n' +
    '\t</tr>\n' +
    '\t<tr>\n' +
    '\t\t<td>扇区类型</td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="checkbox" id="indoor-sector" name="type-sector" value="室内">\n' +
    '\t\t\t<label for="">室分</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="checkbox" id="macro-sector" name="type-sector" value="室外">\n' +
    '\t\t\t<label for="">宏扇区</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td class="nullTd"></td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="checkbox" id="other-sector" name="type-sector" value="室外和室内">\n' +
    '\t\t\t<label for="">其他</label>\n' +
    '\t\t</td>\n' +
    '\t</tr>\n' +
    '\t<tr>\n' +
    '\t\t<td>使用频段</td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="checkbox" value="800MHz" name="band-sector">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #9966CC;"></span>\n' +
    '\t\t\t<label>800M</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="checkbox" value="1.8GHz" name="band-sector">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #9966CC;"></span>\n' +
    '\t\t\t<label>1.8G</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td class="nullTd"></td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="checkbox" value="2.1GHz" name="band-sector">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #9966CC;"></span>\n' +
    '\t\t\t<label>2.1G</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="checkbox" value="2.6GHz" name="band-sector">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #9966CC;"></span>\n' +
    '\t\t\t<label>2.6G</label>\n' +
    '\t\t</td>\n' +
    '\t</tr>\n' +
    '</table>',
    "grid":'<table style="table-layout: fixed;">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td colspan="3">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="layer-name">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="grid" checked="" disabled="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="grid">栅格图层</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="layer-opacity">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="opacityText">透明度：</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="number" id="gridOpacity" class="iptNum" min="0" max="1" step="0.1" value="0.5">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class="btn-showTableInfo"><img src="../js/IntelligentRoadTestV3/images/layer_xiala.png"></button>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td>覆盖频段</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td colspan="2" class="padding0">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fieldset class="fieldset">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<legend>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ul>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="radio" id="bf-band" name="band-radio" value="0" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="bf-band" >不分频段</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="radio" id="qf-band" name="band-radio" value="1">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="qf-band" >区分频段</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</legend>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="fieldsetInfo">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="bandDiv" style="display: block;">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="radio" id="zy-grid" name="chq-grid" value="最优场强">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="zy-grid" >最优场强</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="radio" id="zjr-grid" name="chq-grid" value="主接入场强" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="zjr-grid" >主接入场强</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="bandDiv" style="display: none;">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="cover800" name="band-grid" value="800M">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="cover800" >800M</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="cover18" name="band-grid" value="1.8G">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="cover18" >1.8G</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="cover21" name="band-grid" value="2.1G">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="cover21" >2.1G</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="cover26" name="band-grid" value="2.6G">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="cover26" >2.6G</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fieldset>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td>栅格数据</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="radio" id="agps-mr" name="gridNum" value="AGPS-MR" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="agps-mr"  style="color: rgb(50, 133, 255);">AGPS-MR</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="radio" id="all-mr" name="gridNum" value="全量MR" >\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="all-mr" >全量MR</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
    '\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td style="color:red;width: 100%;padding-left: 30px;">2018-05-01之前系统仅有AGPS-MR主接入场强图层</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td>栅格类型</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td colspan="5" class="padding0">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fieldset class="fieldset2">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<legend>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ul>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="radio" id="sxsl-type" name="grid-type" value="1">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="sxsl-type">上行速率</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="radio" id="xxsl-type" name="grid-type" value="2">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="xxsl-type">下行速率</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="radio" id="fgzl-type" name="grid-type" value="0" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="fgzl-type">覆盖质量</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="radio" id="mod3-type" name="grid-type" value="3">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="mod3-type">MOD3干拢</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="radio" id="yqfg-type" name="grid-type" value="4">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="yqfg-type">越区覆盖</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="radio" id="cdfg-type" name="grid-type" value="5">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="cdfg-type">重叠覆盖</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</legend>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="fieldsetInfo">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="gridTypeDiv" style="display: none;">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="youshLegend" name="legend-grid" value="=>5" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #009900;" id="youshColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>优秀[5,+∞)</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="liangshLegend" name="legend-grid" value="=>3" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #00B0F0;" id="liangshColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>良好[3,5)</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="zhongshLegend" name="legend-grid" value="=>1" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #0070C0;" id="zhongshColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>中等[1,3)</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="chaLeshgend" name="legend-grid" value="=>0.25" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #FFC000;" id="chashColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>较差[0.25,1)</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="jichashLegend" name="legend-grid" value=">0" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #C00000;" id="jichashColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>极差[-∞,0.25)</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="notCountshLegend" name="legend-grid" value="=>-2">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #bb10c4;" id="notCountshColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>记录数≤3</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="gridTypeDiv" style="display: none;">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="youxhLegend" name="legend-grid" value="=>12" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #009900;" id="youxhColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>优秀[12,+∞)</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="liangxhLegend" name="legend-grid" value="=>8" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #00B0F0;" id="liangxhColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>良好[8,12)</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="zhongxhLegend" name="legend-grid" value="=>5" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #0070C0;" id="zhongxhColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>中等[5,8)</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="chaxhLegend" name="legend-grid" value="=>2" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #FFC000;" id="chaxhColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>较差[2,5)</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="jichaxhLegend" name="legend-grid" value=">0" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #C00000;" id="jichaxhColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>极差(-∞,2)</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="notCountxhLegend" name="legend-grid" value="=>-2">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #bb10c4;" id="notCountxhColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>记录数≤3</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="gridTypeDiv" style="display: block;">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="youLegend" name="legend-grid" value="<0" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #009900;" id="youColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>优秀(-85,0)</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="liangLegend" name="legend-grid" value="<=-85" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #00B0F0;" id="liangColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>良好(-95.-85]</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="zhongLegend" name="legend-grid" value="<=-95" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #0070C0;" id="zhongColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>中等(-105,95]</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="chaLegend" name="legend-grid" value="<=-105" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #FFC000;" id="chaColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>较差(-115,-105]</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="jichaLegend" name="legend-grid" value="<=-115" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #C00000;" id="jichaColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>极差(-140,-115]</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="notCountLegend" name="legend-grid" value="<=3">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #bb10c4;" id="notCountColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>记录数≤3</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="gridTypeDiv" style="display: none;">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="youM3Legend" name="legend-grid" value="<=0.1" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #009900;" id="youM3Color"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>优秀(-∞,0.1]</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="liangM3Legend" name="legend-grid" value="<=0.3" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #00B0F0;" id="liangM3Color"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>良好(0.1,0.3]</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="zhongM3Legend" name="legend-grid" value="<=0.5" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #0070C0;" id="zhongM3Color"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>中等(0.3,0.5]</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="chaM3Legend" name="legend-grid" value="<=0.7" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #FFC000;" id="chaM3Color"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>较差(0.5,0.7]</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="jichaM3Legend" name="legend-grid" value="<=0" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #C00000;" id="jichaM3Color"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>极差(0.7,+∞)</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="notCountM3Legend" name="legend-grid" value="<=3">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #bb10c4;" id="notCountM3Color"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>记录数≤3</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="gridTypeDiv" style="display: none;">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="youYQLegend" name="legend-grid" value="<=0.1" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #009900;" id="youYQColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>优秀(-∞,0.1]</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="liangYQLegend" name="legend-grid" value="<=0.3" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #00B0F0;" id="liangYQColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>良好(0.1,0.3]</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="zhongYQLegend" name="legend-grid" value="<=0.5" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #0070C0;" id="zhongYQColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>中等(0.3,0.5]</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="chaYQLegend" name="legend-grid" value="<=0.7" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #FFC000;" id="chaYQColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>较差(0.5,0.7]</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="jichaYQLegend" name="legend-grid" value="<=0" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #C00000;" id="jichaYQColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>极差(0.7,+∞)</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="notCountYQLegend" name="legend-grid" value="<=3">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #bb10c4;" id="notCountYQColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>记录数≤3</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="gridTypeDiv" style="display: none;">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="youCDLegend" name="legend-grid" value="<=0.1" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #009900;" id="youCDColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>优秀(-∞,0.1]</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="liangCDLegend" name="legend-grid" value="<=0.3" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #00B0F0;" id="liangCDColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>良好(0.1,0.3]</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="zhongCDLegend" name="legend-grid" value="<=0.5" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #0070C0;" id="zhongCDColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>中等(0.3,0.5]</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="chaCDLegend" name="legend-grid" value="<=0.7" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #FFC000;" id="chaCDColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>较差(0.5,0.7]</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="jichaCDLegend" name="legend-grid" value="<=0" checked="">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #C00000;" id="jichaCDColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>极差(0.7,+∞)</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="notCountCDLegend" name="legend-grid" value="<=3">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #bb10c4;" id="notCountCDColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>记录数≤3</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fieldset>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t</table>',
    "poorArea":'<table>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td colspan="6">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="layer-name">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" name="layer" id="poorArea">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="poorArea">专题图层</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="layer-opacity">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="opacityText">透明度：</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="number" id="poorOpacity" class="iptNum" min="0" max="1" step="0.1" value="0.5">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class="btn-showTableInfo"><img src="../js/IntelligentRoadTestV3/images/layer_xiala.png"></button>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td>区域边界</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" id="poor" name="type-quyu" value="0">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #F5B258;" id="poorColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>弱覆盖区</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="radio" id="m3PoorArea" name="type-quyu" value="26">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #57b0bd;" id="m3PoorAreaColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>MOD3干扰区</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td class="nullTd"></td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="radio" id="cbPoorArea" name="type-quyu" value="28">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #de5077;" id="cbPoorAreaColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>越区覆盖区</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="radio" id="olPoorArea" name="type-quyu" value="27">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #f78131;" id="olPoorAreaColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>重叠覆盖区</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td class="nullTd"></td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="radio" id="upPoorArea" name="type-quyu" value="24">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #7477bf;" id="upPoorAreaColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>上行低速区</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="radio" id="downPoorArea" name="type-quyu" value="25">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="squarePick" style="background-color: #77799c;" id="downPoorAreaColor"></span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>下行低速区</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td>区域大小</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t<td style="width: 66.6%;">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for="">连片栅格数</label>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="number" class="iptNum" id="minGridNum" min="3" step="1" value="10" onkeyup="this.value=this.value.replace(/[^0-9]+/g,\'\')">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>--</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="number" class="iptNum" id="maxGridNum" min="11" step="1" placeholder="最大" onkeyup="this.value=this.value.replace(/[^0-9]+/g,\'\')">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t</table>',
    "scene":'<table>\n' +
    '\t<tr>\n' +
    '\t\t<td colspan="6">\n' +
    '\t\t\t<div class="layer-name">\n' +
    '\t\t\t\t<input type="checkbox" name="layer" id="scene">\n' +
    '\t\t\t\t<label for="scene" style="">场景图层</label>\n' +
    '\t\t\t</div>\n' +
    '\t\t\t<div class="layer-opacity">\n' +
    '\t\t\t\t<span class="opacityText">透明度：</span>\n' +
    '\t\t\t\t<input type="number" id="sceneOpacity" class="iptNum" min="0" max="1" step="0.1" value="0.5">\n' +
    '\t\t\t\t<button class="btn-showTableInfo"><img src="../js/IntelligentRoadTestV3/images/layer_xiala.png"></button>\n' +
    '\t\t\t</div>\n' +
    '\t\t</td>\n' +
    '\t</tr>\n' +
    '\t<tr>\n' +
    '\t\t<td>场景边界</td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="radio" id="highColleges" name="sceneRadio" value="10">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #76ACFC;" id="highCollegesColor"></span>\n' +
    '\t\t\t<label>高校</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="radio" id="venues" name="sceneRadio" value="19">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #76ACFC;" id="venuesColor"></span>\n' +
    '\t\t\t<label>场馆</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td class="nullTd"></td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="radio" id="beautyFood" name="sceneRadio" value="18">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #76ACFC;" id="beautyFoodColor"></span>\n' +
    '\t\t\t<label>美食</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="radio" id="beautyScenery" name="sceneRadio" value="12">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #76ACFC;" id="beautySceneryColor"></span>\n' +
    '\t\t\t<label>美景</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td class="nullTd"></td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="radio" id="concern" name="sceneRadio" value="1">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #4AA9E0;" id="concernAreaColor"></span>\n' +
    '\t\t\t<label>关注区域</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="radio" id="bone" name="sceneRadio" value="5">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #ED666A;" id="boneAreaColor"></span>\n' +
    '\t\t\t<label>骨头区域</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td class="nullTd"></td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="radio" id="wolfArea" name="sceneRadio" value="16">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #76ACFC;" id="wolfAreaColor"></span>\n' +
    '\t\t\t<label>战狼区域</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="radio" id="farmerMarket" name="sceneRadio" value="17">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #76ACFC;" id="farmerMarketColor"></span>\n' +
    '\t\t\t<label>农贸市场</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td class="nullTd"></td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="radio" id="highResidence" name="sceneRadio" value="9">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #76ACFC;" id="highResidenceColor"></span>\n' +
    '\t\t\t<label>高密度住宅区</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="radio" id="highBusiness" name="sceneRadio" value="11">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #76ACFC;" id="highBusinessColor"></span>\n' +
    '\t\t\t<label>高流量商务区</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td class="nullTd"></td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="radio" id="village" name="sceneRadio" value="22">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #76ACFC;" id="villageColor"></span>\n' +
    '\t\t\t<label>自然村</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="radio" id="cityVillage" name="sceneRadio" value="21">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #76ACFC;" id="cityVillageColor"></span>\n' +
    '\t\t\t<label>城中村</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td class="nullTd"></td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="radio" id="school" name="sceneRadio" value="20">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #76ACFC;" id="schoolColor"></span>\n' +
    '\t\t\t<label>中小学</label>\n' +
    '\t\t</td>\n' +
    '\t\t<td>\n' +
    '\t\t\t<input type="radio" id="factory" name="sceneRadio" value="23">\n' +
    '\t\t\t<span class="squarePick" style="background-color: #76ACFC;" id="factoryColor"></span>\n' +
    '\t\t\t<label>工厂</label>\n' +
    '\t\t</td>\n' +
    '\t</tr>\n' +
    '</table>',
    "lineArea":'<table class="lineTable" style="display: none;">' +
    	 '<tr>' +  
    	 '<td colspan="6">' +  
    	 '<div class="layer-name">' +  
    	 '<input type="checkbox" name="layer" id="lineArea" checked disabled>' +  
    	 '<label for="poorArea">线路图层</label>' +  
    	 '</div>' +  
    	 '<div class="layer-opacity">' +  
    	 '<span class="opacityText">透明度：</span>' +  
    	 '<input type="number" id="lineOpacity" class="iptNum" min="0" max="1" step="0.1" value="0.5">' +  
    	 '<button class="btn-showTableInfo"><img src="../js/IntelligentRoadTestV3/images/layer_xiala.png"></button>' +  
    	 '</div>' +  
    	 '</td>' +  
    	 '</tr>' +  
    	 '<tr>' +  
    	 '<td>线路类型</td>' +  
    	 '<td colspan="5" class="padding0">' +  
    	 '<fieldset class="fieldset2">' +  
    	 '<legend>' +  
    	 '<ul>' +  
    	 '<li>' +  
    	 '<input type="radio" id="sxsl-type" name="grid-type-line" value="1">' +  
    	 '<label for="sxsl-type">上行速率</label>' +  
    	 '</li>' +  
    	 '<li>' +  
    	 '<input type="radio" id="xxsl-type" name="grid-type-line" value="2">' +  
    	 '<label for="xxsl-type">下行速率</label>' +  
    	 '</li>' +  
    	 '<li>' +  
    	 '<input type="radio" id="fgzl-type" name="grid-type-line" value="0" checked="">' +  
    	 '<label for="fgzl-type">覆盖质量</label>' +  
    	 '</li>' +  
    	 '</ul>' +  
    	 '</legend>' +  
    	 '' +  
    	 '<div class="fieldsetInfo lineFieldSetInfo">' +  
    	 '<div class="gridTypeDiv" style="display: none;">' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="youshLegendLine" name="legend-grid-line" value="1" checked="">' +  
    	 '<span class="squarePick" style="background-color: #009900;" id="youshColorLine"></span>' +  
    	 '<label>优秀[5,+∞)</label>' +  
    	 '</span>' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="liangshLegendLine" name="legend-grid-line" value="2" checked="">' +  
    	 '<span class="squarePick" style="background-color: #00B0F0;" id="liangshColorLine"></span>' +  
    	 '<label>良好[3,5)</label>' +  
    	 '</span>' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="zhongshLegendLine" name="legend-grid-line" value="3" checked="">' +  
    	 '<span class="squarePick" style="background-color: #0070C0;" id="zhongshColorLine"></span>' +  
    	 '<label>中等[1,3)</label>' +  
    	 '</span>' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="chaLeshgendLine" name="legend-grid-line" value="4" checked="">' +  
    	 '<span class="squarePick" style="background-color: #FFC000;" id="chashColorLine"></span>' +  
    	 '<label>较差[0.25,1)</label>' +  
    	 '</span>' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="jichashLegendLine" name="legend-grid-line" value="5" checked="">' +  
    	 '<span class="squarePick" style="background-color: #C00000;" id="jichashColorLine"></span>' +  
    	 '<label>极差[-∞,0.25)</label>' +  
    	 '</span>' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="notCountshLegendLine" name="legend-grid-line" value="6">' +  
    	 '<span class="squarePick" style="background-color: #bb10c4;" id="notCountshColorLine"></span>' +  
    	 '<label>记录数≤3</label>' +  
    	 '</span>' +  
    	 '</div>' +  
    	 '<div class="gridTypeDiv" style="display: none;">' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="youxhLegendLine" name="legend-grid-line" value="1" checked="">' +  
    	 '<span class="squarePick" style="background-color: #009900;" id="youxhColorLine"></span>' +  
    	 '<label>优秀[12,+∞)</label>' +  
    	 '</span>' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="liangxhLegendLine" name="legend-grid-line" value="2" checked="">' +  
    	 '<span class="squarePick" style="background-color: #00B0F0;" id="liangxhColorLine"></span>' +  
    	 '<label>良好[8,12)</label>' +  
    	 '</span>' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="zhongxhLegendLine" name="legend-grid-line" value="3" checked="">' +  
    	 '<span class="squarePick" style="background-color: #0070C0;" id="zhongxhColorLine"></span>' +  
    	 '<label>中等[5,8)</label>' +  
    	 '</span>' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="chaxhLegendLine" name="legend-grid-line" value="4" checked="">' +  
    	 '<span class="squarePick" style="background-color: #FFC000;" id="chaxhColorLine"></span>' +  
    	 '<label>较差[2,5)</label>' +  
    	 '</span>' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="jichaxhLegendLine" name="legend-grid-line" value="5" checked="">' +  
    	 '<span class="squarePick" style="background-color: #C00000;" id="jichaxhColorLine"></span>' +  
    	 '<label>极差(-∞,2)</label>' +  
    	 '</span>' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="notCountxhLegendLine" name="legend-grid-line" value="6">' +  
    	 '<span class="squarePick" style="background-color: #bb10c4;" id="notCountxhColorLine"></span>' +  
    	 '<label>记录数≤3</label>' +  
    	 '</span>' +  
    	 '</div>' +  
    	 '<div class="gridTypeDiv" style="display: block;">' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="youLegendLine" name="legend-grid-line" value="1" checked="">' +  
    	 '<span class="squarePick" style="background-color: #009900;" id="youColorLine"></span>' +  
    	 '<label>优秀(-85,0)</label>' +  
    	 '</span>' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="liangLegendLine" name="legend-grid-line" value="2" checked="">' +  
    	 '<span class="squarePick" style="background-color: #00B0F0;" id="liangColorLine"></span>' +  
    	 '<label>良好(-95.-85]</label>' +  
    	 '</span>' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="zhongLegendLine" name="legend-grid-line" value="3" checked="">' +  
    	 '<span class="squarePick" style="background-color: #0070C0;" id="zhongColorLine"></span>' +  
    	 '<label>中等(-105,95]</label>' +  
    	 '</span>' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="chaLegendLine" name="legend-grid-line" value="4" checked="">' +  
    	 '<span class="squarePick" style="background-color: #FFC000;" id="chaColorLine"></span>' +  
    	 '<label>较差(-115,-105]</label>' +  
    	 '</span>' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="jichaLegendLine" name="legend-grid-line" value="5" checked="">' +  
    	 '<span class="squarePick" style="background-color: #C00000;" id="jichaColorLine"></span>' +  
    	 '<label>极差(-140,-115]</label>' +  
    	 '</span>' +  
    	 '<span>' +  
    	 '<input type="checkbox" id="notCountLegendLine" name="legend-grid-line" value="6">' +  
    	 '<span class="squarePick" style="background-color: #bb10c4;" id="notCountColorLine"></span>' +  
    	 '<label>记录数≤3</label>' +  
    	 '</span>' +  
    	 '</div>' +  
    	 '</div>' +  
    	 '</fieldset>' +  
    	 '</td>' +  
    	 '</tr>' +  
    	 '</table>',
};
//栅格RSRP总和          140栅格MR条数   	栅格RSRP平均值    	接入扇区	105栅格MR条数		所在数组的位置
IntelligentRoadTestSystemLayerV3.gridBandObj={
    "800M":["f800m_rsrp_140_sum","f800m_rsrp_140_cnt","f800m_rsrp_140_avg","f800m_sector_set","f800m_rsrp_140_cnt",3,1],
    "1.8G":["f18g_rsrp_140_sum","f18g_rsrp_140_cnt","f18g_rsrp_140_avg","f18g_sector_set","f18g_rsrp_105_cnt",4,2],
    "2.1G":["f21g_rsrp_140_sum","f21g_rsrp_140_cnt","f21g_rsrp_140_avg","f21g_sector_set","f21g_rsrp_105_cnt",5,3],
    "2.6G":["f26g_rsrp_140_sum","f26g_rsrp_140_cnt","f26g_rsrp_140_avg","f26g_sector_set","f26g_rsrp_105_cnt",6,4]
};
IntelligentRoadTestSystemLayerV3.systemLayerObj=null;
/*智能测评V3系统图层文件*/
$(function (){
	IntelligentRoadTestSystemLayerV3.isAudit= noceUtil.GetQueryString("isAudit");
    /*判断localStorage缓存中是否有数据,有数据则需要根据localStorage中的配置初始化图层顺序，内容，颜色*/
    if(window.localStorage) {//检查浏览器是否支持localStorage
        var systemLayer = localStorage.getItem("systemLayer");
        if(systemLayer!=null&&systemLayer!=""){
            IntelligentRoadTestSystemLayerV3.systemLayerObj = JSON.parse(systemLayer);
            var systemLayerZIndex=IntelligentRoadTestSystemLayerV3.systemLayerObj.zIndex;
            systemLayerZIndex.sort(function (a,b) {//倒序
                var x = a.index;
                var y = b.index;
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            $("#submitForData").parent().prevAll().remove();//清空系统图层内容
            if(isNull(IntelligentRoadTestSystemLayerV3.systemLayerObj.version)||IntelligentRoadTestSystemLayerV3.systemLayerObj.version != 0.4){
               if(isNull(IntelligentRoadTestSystemLayerV3.systemLayerObj.poorArea)){
                   $(".layerTabCon").prepend(IntelligentRoadTestSystemLayerV3.layers["poorArea"]);
               }
               
               if(isNull(IntelligentRoadTestSystemLayerV3.systemLayerObj.lineArea)){
            	   $(".layerTabCon").prepend(IntelligentRoadTestSystemLayerV3.layers["lineArea"]);
               }
            }
             for(var i=0;i<systemLayerZIndex.length;i++){
                 var sceneName=systemLayerZIndex[i].name;
                 $(".layerTabCon").prepend(IntelligentRoadTestSystemLayerV3.layers[sceneName]);
             }
        }
    }

    //系统图层提示
    var systemTip = localStorage.getItem("notip");
    if(systemTip){
        IntelligentRoadTest.systemTip=false;
    }

    $(".know").click(function(){
        localStorage.setItem("notip",true);
        IntelligentRoadTest.systemTip=false;
        $(".layerGif").hide();
        // $(".layer-info").show();
    });

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


    //拖拽图层插件配置
    /*$(".layerTabCon").sortable({
        cancel: "input,.layerTabCon table tr:not(:first-child)",
        start: function( event, ui ) {
            var item =ui.item;
            item[0].className = 'ui-sortable-handle borderLine';
        },
        stop: function( event, ui ) {
            var item =ui.item;
            item[0].className = 'ui-sortable-handle';
        }
    });*/
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

    //选中文字变色
    $('input[type="checkbox"],input[type="radio"]').click(function(event){
        event.stopPropagation();
        var id=$(this).attr('id');
        if($(this).is(':checked')){
            if(!noceUtil.isUndefined(id)){
                /*if(id=='zy-grid'||id=='zjr-grid'){
                    $('input[type="checkbox"][id^="cover"]').prop("checked", false);
                    $('input[type="checkbox"][id^="cover"]').next().css("color","");
                }else if(id.indexOf("cover")>-1){
                    $('#zy-grid,#zjr-grid').prop("checked", false);
                    $('#zy-grid,#zjr-grid').next().css("color","");
                }else if(id=="sector"||id=="poor"||id=="scene"){
                    $(this).parents("table").removeClass("unCheched");
                    $(this).parents('tr').siblings().children().find('input').attr("disabled",false);
                    $(this).parent().next('.layer-opacity').find('input').attr("disabled",false);
                    $(this).parents('tr').siblings().children().find('.squarePick').removeClass("colorUnClick");
                }else*/
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
                }
            }
            if(id!="sector"&&id!="poorArea"&&id!="grid"&&id!="scene"){
                $(this).siblings('label').css("color","#3285FF");
            }
        }else{
            /* if(!noceUtil.isUndefined(id)){
                 if(id=="sector"||id=="poor"||id=="scene"){
                     $(this).parents("table").addClass("unCheched");
                     $(this).parents('tr').siblings().children().find('input').attr("disabled",true);
                     $(this).parent().next('.layer-opacity').find('input').attr("disabled",true);
                     $(this).parents('tr').siblings().children().find('.squarePick').addClass("colorUnClick");
                 }
             }*/
            $(this).siblings('label').css("color","");
        }
    });

    $('.fieldset li input').click(function(){
        var index = $('.fieldset li input').index($(this));
        $(".bandDiv").eq(index).show().siblings().hide();
    });
    $('.fieldset2 li input').click(function(){
        var index = $('.fieldset2 li input').index($(this));
        $(".fieldsetInfo .gridTypeDiv").eq(index).show().siblings().hide();
        var radioName = $(this).attr("name");
//    	console.log("radioName:"+radioName);
    	
    	$(this).parent('li').siblings('li').children('label').css("color","");
    	$(this).siblings('label').css("color","#3285FF");
    	if(radioName == 'grid-type'){
    		if(index!=2){
                $("input#bf-band").click();
                $("input#zjr-grid").click();
                $("input#agps-mr").click();
                $('input#grid').parents('tbody').find('input:checkbox:not("#grid"):checked,input:radio:checked').siblings('label').css("color","#3285FF");
                $('.fieldset input').attr("disabled",true);
                $('.fieldset input').siblings('label').addClass("greyColor");
                $('input[name="gridNum"]').attr("disabled",true);
                $('input[name="gridNum"]').siblings('label').addClass("greyColor");
            }else{
                $('.fieldset input').attr("disabled",false);
                $('.fieldset input').siblings('label').removeClass("greyColor");
                $('input[name="gridNum"]').attr("disabled",false);
                $('input[name="gridNum"]').siblings('label').removeClass("greyColor");
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
        /*if(id=="upPoorArea"){//上行
            $(".fieldset2 input#sxsl-type").click();
            $(".fieldset2 input#sxsl-type").siblings('label').css("color","#3285FF");
        }else if(id=="downPoorArea"){//下行
            $(".fieldset2 input#xxsl-type").click();
            $(".fieldset2 input#xxsl-type").siblings('label').css("color","#3285FF");
        }else if(id=="poor"){//覆盖质量
            $(".fieldset2 input#fgzl-type").click();
            $(".fieldset2 input#fgzl-type").siblings('label').css("color","#3285FF");
        }*/
        $('input:radio[name="'+name+'"]').siblings('label').css("color","");
        $(this).siblings('label').css("color","#3285FF");
    });

    //栅格图层栅格数据点击事件
    $('input[type="radio"][name="gridNum"],input[name="chq-grid"],input[name="band-radio"],input[name="grid-type"]').click(function (){
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
   
    /*系统图层初始化事件start*/
    IntelligentRoadTestSystemLayerV3.initSystemLayer(IntelligentRoadTestSystemLayerV3.systemLayerObj);
    /*系统图层初始化事件end*/
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


});

/*系统图层初始化事件*/
/**********************************
 * @funcname IntelligentRoadTest.initSystemLayer
 * @funcdesc 系统图层初始化事件
 * @param {null}
 * @return {null}
 * @author 陈小芳
 * @create 20180410
 ***********************************/
IntelligentRoadTestSystemLayerV3.initSystemLayer=function IntelligentRoadTestSystemLayerV3_initSystemLayer(systemLayerObj){
    // var systemLayerObj=IntelligentRoadTestSystemLayerV3.systemLayerObj;
    if(systemLayerObj!=null&&systemLayerObj!=""){
        //扇区初始化
        var sectorObj=systemLayerObj.sector;
        if(!isNull(sectorObj.opacity)){
            $('#sectorOpacity').val(sectorObj.opacity);//透明度
        }
        for(var i1=0;i1<sectorObj.band.length;i1++){//使用频段
            $('input[name="band-sector"][value="'+sectorObj.band[i1].type+'"]').click();
            $('input[name="band-sector"][value="'+sectorObj.band[i1].type+'"]').next().css("background-color",sectorObj.band[i1].color);
        }
        for(var i2=0;i2<sectorObj.type.length;i2++){//扇区类型
            $('input[name="type-sector"][value="'+sectorObj.type[i2]+'"]').click();
        }
        if(sectorObj.selected){
            $("#sector").click();
        }

        //栅格初始化
        var gridObj=systemLayerObj.grid;
        if(!isNull(gridObj.opacity)){
            $('#gridOpacity').val(gridObj.opacity);//透明度
        }
        $('input[name="band-radio"][value='+gridObj.band.gridBandIndex+']').click();
        if(gridObj.band.gridBandIndex==0){
            $('input[name="chq-grid"][value='+gridObj.band.gridBand[0]+']').click();
        }else{
            for(var i3=0;i3<gridObj.band.gridBand.length;i3++){//覆盖频段
                $('input[name="band-grid"][value="'+gridObj.band.gridBand[i3]+'"]').click();
            }
        }

        $('input[name="gridNum"][value="'+gridObj.type+'"]').click();//栅格数据
        $('input[name="grid-type"][value='+gridObj.thresholds.gridTypeIndex+']').click();
        var gridThresholds=gridObj.thresholds.gridThresholds;
        for(var i4=0;i4<gridThresholds.length;i4++){//覆盖质量
            if(gridThresholds[i4].selected){
                $('.fieldsetInfo .gridTypeDiv:visible input[value="'+gridThresholds[i4].threshold+'"]').siblings('label').css("color","#3285FF");
            }else{
                $('.fieldsetInfo .gridTypeDiv:visible input[value="'+gridThresholds[i4].threshold+'"]').prop("checked",false);
                $('.fieldsetInfo .gridTypeDiv:visible input[value="'+gridThresholds[i4].threshold+'"]').siblings('label').css("color","");
            }
            $('.fieldsetInfo .gridTypeDiv:visible input[value="'+gridThresholds[i4].threshold+'"]').next().css("background-color",gridThresholds[i4].color);
        }


        /*IntelligentRoadTest.gridBandIndex=gridObj.band.gridBandIndex;//栅格频段下标 0--不分频段  1--区分频段
        IntelligentRoadTest.gridTypeIndex=gridObj.band.gridTypeIndex;//栅格类型下标 0--覆盖类型  1--上行速率  2--下行速率
        IntelligentRoadTest.gridOpacity=gridObj.opacity;//栅格透明度
        IntelligentRoadTest.gridBand=gridObj.band.gridBand;//栅格频段
        IntelligentRoadTest.gridType=gridObj.type;//栅格数据
        IntelligentRoadTest.gridThresholds=gridThresholds;*/

        //弱区初始化==>专题图层
        var poorObj=systemLayerObj.poorArea;
        if(!isNull(poorObj)){
            if(!isNull(poorObj.opacity)){
                $('#poorOpacity').val(poorObj.opacity);//透明度
            }
            // $('#poorColor').css("background-color",poorObj.poorCover.color);//弱覆盖区连片颜色
            var poorValue=poorObj.poorCover.poorValue;
            for(var i5=0;i5<poorValue.length;i5++){//覆盖质量
                $('input[name="type-quyu"][value='+poorValue[i5].value+']').click();//专题图层 区域边界
                $('input[name="type-quyu"][value='+poorValue[i5].value+']').next().css("background-color",poorValue[i5].color);//专题图层 区域边界

            }
            $('#minGridNum').val(poorObj.poorCover.minGridNum);//最小
            $('#maxGridNum').val(poorObj.poorCover.maxGridNum);//最大
            if(poorObj.selected){
                $("#poorArea").click();
            }
        }

        //场景初始化
        var sceneObj=systemLayerObj.scene;
        if(!isNull(sceneObj.opacity)){
            $('#sceneOpacity').val(sceneObj.opacity);//透明度
        }
        $('input:radio[name="sceneRadio"][value="'+sceneObj.area.value+'"]').click();
        $('input:radio[name="sceneRadio"][value="'+sceneObj.area.value+'"]').next().css("background-color",sceneObj.area.color);
        if(sceneObj.selected){
            $("#scene").click();
        }
        
        var lineAreaObj = systemLayerObj.lineArea;
        if(lineAreaObj){
        	if(!isNull(lineAreaObj.opacity)){
                $('#lineOpacity').val(lineAreaObj.opacity);//透明度
            }
        	if(lineAreaObj.thresholds.lineTypeIndex){
        		$('input[name="grid-type-line"][value='+lineAreaObj.thresholds.lineTypeIndex+']').click();
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
    }
    $('input:checkbox:not("#scene,#poorArea,#grid,#sector"):checked,input:radio:checked').siblings('label').css("color","#3285FF");

    //重新设置颜色区间
    var gridOpacity = parseFloat($('#gridOpacity').val());


    //{ "threshold": "200", "text": "(-85,0)", "color": "#0070C0", "gradient": 0.33 }

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
    return cloumnsList.join(",")+join+sectorList.join(",")+",i:a16";
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
        cloumnsList.push("i:a16");
    }else if(IntelligentRoadTest.gridTypeIndex==3){//MOD3干扰
        cloumnsList.push("i:b1,i:b2");
    }else if(IntelligentRoadTest.gridTypeIndex==4){//越区覆盖
        cloumnsList.push("i:b1,i:b4");
    }else if(IntelligentRoadTest.gridTypeIndex==5){//重叠覆盖
        cloumnsList.push("i:b1,i:b3");
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

    //栅格数据
    var keyprefix="";
    var cloumnsList = "";
    var list = [];
    var functionlist = [];

   
    if(gridType=="AGPS-MR"){
        keyprefix=getddmm(IntelligentRoadTest.day)+"_1_";
    }else if(gridType=="全量MR"){
        keyprefix=getddmm(IntelligentRoadTest.day)+"_0_";
    }
    cloumnsList = IntelligentRoadTestSystemLayerV3.getCloumnsList();
    list =["IntelligentRoadTestV2_getGridDataV2","TABLENAME:NOCE:DSI_MRO_ALL_GRID_TOT_W","GRIDKEYPREFIX:"+keyprefix,"GRIDLEVEL:20",
        "POLYGONCONTOUR:"+IntelligentRoadTest.polygonContour,"COLUMNLIST:"+cloumnsList,"PARTITIONMOD:"+" "];//partitionmod 1
    //缓存
    IntelligentRoadTest.maxlng_maxlat_minlng_minlat = maxlng_maxlat_minlng_minlat + IntelligentRoadTest.day + IntelligentRoadTest.gridType + cloumnsList;
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
    var sh_sum = 0;//下行速率之和
    var xh_sum = 0;//上行速率之和
    var xmr_sum = 0;//mod3,越区,覆盖XXMRNUM之和
    var mr_sum = 0;//MRNUM总数量之和
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


        if(IntelligentRoadTest.gridBand.length==1){//最接入、最优、单个频段
            var reData=formatArray(result[i][1]).split("#");
            if(!isNull(reData[9])){//把小于等于3条记录数和rsrp均值为null过滤掉 不参与计算
                rsrp_avg = formatValue(reData[9]);// rsrp均值 _rsrp_140_avg
                rsrp_attend=parseFloat(formatValue(reData[0]));//栅格MR条数 _rsrp_140_cnt
                if(parseFloat(formatValue(reData[0]))>3){
                    rsrp_avg_sum += parseFloat(formatValue(reData[8])); // _RSRP_140_Sum
                    cnt_140_sum += parseFloat(formatValue(reData[0])); // _RSRP_140_Cnt
                    cnt_105_sum += parseInt(formatValue(reData[4])); // _RSRP_105_Cnt
                    if(parseFloat(reData[9]) <= -105){
                        poor_grid_count++;
                    }
                    all_grid_count++;
                }

            }
        }else{//组合频段取最优rsrp
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
                    if(parseFloat(reData[0])>3){
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
            if(rsrp_avg!=0&&!isNull(rsrp_avg)&&parseFloat(formatValue(max_105_cnt))>3){//把小于等于3条记录数和rsrp均值为null过滤掉 不参与计算
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
        //0-最小经度	1-最小纬度	2-最大经度	3-最小纬度	4-rsrp平均值/上行速率/下行速率/MR条数默认为3	5-栅格号
        if(IntelligentRoadTest.gridTypeIndex==0){//覆盖质量
            var dataChe = [];
            if(rsrp_attend!=0&&!isNull(rsrp_attend)) {
                if (parseFloat(rsrp_attend) <= 3) {
                    dataChe = [minLng, minLat, maxLng, maxLat, rsrp_attend, grid_num];
                } else if (rsrp_avg != 0 && !isNull(rsrp_avg)) {
                    dataChe = [minLng, minLat, maxLng, maxLat, rsrp_avg, grid_num];
                }
                if (dataChe.length > 0) {
                    IntelligentRoadTest.CanArr.push(dataChe);
                }
            }
        }else if(IntelligentRoadTest.gridTypeIndex==1 || IntelligentRoadTest.gridTypeIndex==2){//上、下行速率
            var rate_sxh = 0;//上/下行速率
            if(!isNull(result[i][length])){
                var rate_sh = result[i][length].split("#")[0];//MIN_USEREX_UPAVGRATE 最小用户体验上行平均速率(Mbps)
                var rate_xh = result[i][length].split("#")[1];//MIN_USEREX_DWAVGRATE 最小用户体验下行平均速率(Mbps)
                if(IntelligentRoadTest.gridTypeIndex==1){//上行速率
                    rate_sxh=rate_sh;
                }else if(IntelligentRoadTest.gridTypeIndex==2){//下行速率
                    rate_sxh=rate_xh;
                }
                if(rsrp_attend!=0&&!isNull(rsrp_attend)&&parseFloat(rsrp_attend)>3){
                    sh_sum += parseFloat(formatValue(rate_sh));//下行速率
                    xh_sum += parseFloat(formatValue(rate_xh));//上行速率
                }
            }

            if(rsrp_attend!=0&&!isNull(rsrp_attend)) {
                var dataChe = [];
                if (parseFloat(rsrp_attend) <= 3) {
                    dataChe = [minLng,minLat,maxLng,maxLat,-1,grid_num];
                } else if (rate_sxh != 0 && !isNull(rate_sxh)) {
                    dataChe = [minLng,minLat,maxLng,maxLat,rate_sxh,grid_num];
                }
                if (dataChe.length > 0) {
                    IntelligentRoadTest.CanArr.push(dataChe);
                }
            }

        }else if(IntelligentRoadTest.gridTypeIndex==3||IntelligentRoadTest.gridTypeIndex==4||IntelligentRoadTest.gridTypeIndex==5){//MOD3干扰 i:b2 越区覆盖 i:b4 重叠覆盖 i:b3
            var mr_num = formatArray(result[i][length-1]).split("#")[0];//MRNUM
            var xmr_num = formatArray(result[i][length]).split("#")[0];//XXMRNUM
            var mr_rat = formatArray(result[i][length]).split("#")[1];//MRMRRAT/OLMRRAT/CBMRRAT 模三干扰MR/重叠覆盖MR/越区覆盖MR的总数量占MR总数量的比率

            if(rsrp_attend!=0&&!isNull(rsrp_attend)&&parseFloat(rsrp_attend)>3){
                mr_sum += parseFloat(formatValue(mr_num));//下行速率
                xmr_sum += parseFloat(formatValue(xmr_num));//上行速率
            }
            if(rsrp_attend!=0&&!isNull(rsrp_attend)) {
                var dataChe = [];
                if (parseFloat(rsrp_attend) <= 3) {
                    dataChe = [minLng,minLat,maxLng,maxLat,-2,grid_num];
                } else if (!isNull(mr_rat)||mr_rat==0) {
                    dataChe = [minLng,minLat,maxLng,maxLat,mr_rat,grid_num];
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
            IntelligentRoadTest.mrRate = isNull(mr_sum)? "null" : parseFloat(xmr_sum/mr_sum*100).toFixed(2);//MOD3/越区/重叠栅格占比
        }

    }else if(IntelligentRoadTest.gridTypeIndex==1){
        IntelligentRoadTest.zhibiao = IntelligentRoadTest.gridType+" "+"平均上行速率"+"(Mbps)";
        IntelligentRoadTest.shRate = isNull(all_grid_count)? "null" : parseFloat(sh_sum/all_grid_count).toFixed(2);//KPI感知上行速率
        IntelligentRoadTest.xhRate = isNull(all_grid_count)? "null" : parseFloat(xh_sum/all_grid_count).toFixed(2);//KPI感知下行速率
    }else if(IntelligentRoadTest.gridTypeIndex==2){
        IntelligentRoadTest.zhibiao = IntelligentRoadTest.gridType+" "+"平均下行速率"+"(Mbps)";
        IntelligentRoadTest.shRate = isNull(all_grid_count)? "null" : parseFloat(sh_sum/all_grid_count).toFixed(2);//KPI感知上行速率
        IntelligentRoadTest.xhRate = isNull(all_grid_count)? "null" : parseFloat(xh_sum/all_grid_count).toFixed(2);//KPI感知下行速率
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


    var rsrp_avg_sum = 0;//所含栅格XXX_RSRP_140_Sum之和
    var cnt_140_sum = 0;//所含栅格XXX_RSRP_140_Cnt之和
    var cnt_105_sum = 0;//所含栅格XXX_RSRP_105_Cnt之和
    var all_grid_count = 0;//所含总栅格个数
    var poor_grid_count = 0;//XXX_RSRP_140_Avg小于-105栅格个数
    for(var i=0;i<result.length;i++){
        var rowKey=result[i][0];
		var ia2Result=formatArray(result[i][1]).split("#");
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

        if(rsrp_avg!=0&&!isNull(rsrp_avg)&&parseFloat(formatValue(rsrp_attend))>3){
            rsrp_avg_sum += parseFloat(formatValue(ia2Result[8])); // _RSRP_140_Sum
            cnt_140_sum += parseFloat(formatValue(rsrp_attend)); // _RSRP_140_Cnt
            cnt_105_sum += parseInt(formatValue(rsrp_105_cnt)); // _RSRP_105_Cnt
            if(parseFloat(rsrp_avg) <= -105){
                poor_grid_count++;
            }
            all_grid_count++;
        }
        //0-最小经度 1-最小纬度 2—最大经度 3-最大纬度 4-rsrp均值/电信RSRP[-140，0)记录数 5-栅格号 6-电信RSRP[-105，0)记录数 7-电信RSRP[-140，0)记录数 8-覆盖率（6/7） 9-rsrp均值
        var dataChe = [];
        if(rsrp_attend!=0&&!isNull(rsrp_attend)){
            if(parseFloat(rsrp_attend)<=3){
                dataChe = [minLng,minLat,maxLng,maxLat,rsrp_attend,grid_num,rsrp_105_cnt,rsrp_attend,rsrp_cover,rsrp_avg];
            }else if(!isNull(rsrp_avg)){
                dataChe = [minLng,minLat,maxLng,maxLat,rsrp_avg,grid_num,rsrp_105_cnt,rsrp_attend,rsrp_cover,rsrp_avg];
            }
            if(dataChe.length>0){
                IntelligentRoadTest.CanArr.push(dataChe);
            }
        }

    }

    IntelligentRoadTest.rsrpAvg = isNull(all_grid_count)? "null" : parseFloat(rsrp_avg_sum/cnt_140_sum).toFixed(2);//RSRP均值
    IntelligentRoadTest.coverRate = isNull(all_grid_count)? "null" : parseFloat(cnt_105_sum/cnt_140_sum*100).toFixed(2);//覆盖率
    IntelligentRoadTest.poorRate = isNull(all_grid_count)? "null" : parseFloat(poor_grid_count/all_grid_count*100).toFixed(2);//弱栅格占比
    IntelligentRoadTest.zhibiao = IntelligentRoadTest.gridBand.join(",")+" "+IntelligentRoadTest.gridType+"(dBm)";

	var CTData = IntelligentRoadTest.CanArr;
	for(var j=0;j<IntelligentRoadTest.colorBarArr.length;j++){
		CTData = IntelligentRoadTest.ClearData(CTData,IntelligentRoadTest.colorBarArr[j]);
	}
	IntelligentRoadTest.GridMap.draw(CTData);
	CTData = null;
   
    IntelligentRoadTest.legendGrid();

    IntelligentRoadTest.openThreeLable();
    IntelligentRoadTest.currentLayerNum+=1;
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
                        if(parseFloat(formatValue(reData[0]))>3&&!isNull(reData[9])){
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
                }else{//组合频段取最优rsrp
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
                        if(!isNull(reData[9])&&parseFloat(formatValue(reData[0]))>3){
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
		if(all_grid_count==0){
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
    var gridType=IntelligentRoadTest.gridType;
    var type=(gridType=="AGPS-MR") ? 1 : 0;
    var keyprefix=getddmm(IntelligentRoadTest.day)+"_"+type+"_";
    var cloumnsList = IntelligentRoadTestSystemLayerV3.getCloumnsList();
    var list2 =["IntelligentRoadTestV2_getGridDataV2","TABLENAME:NOCE:DSI_MRO_ALL_GRID_TOT_W","GRIDKEYPREFIX:"+keyprefix,"GRIDLEVEL:20",
    	"POLYGONCONTOUR:"+IntelligentRoadTest.polygonContour,"COLUMNLIST:"+cloumnsList,"PARTITIONMOD:"+" "];//partitionmod 1
    IntelligentRoadTest.maxlng_maxlat_minlng_minlat = maxlng_maxlat_minlng_minlat + IntelligentRoadTest.day +IntelligentRoadTest.gridType+cloumnsList;
    return {"progressBarSqls":list2,"functionlist":IntelligentRoadTestSystemLayerV3.filterAreaGridData,"dataBase":7};
}

/**********************************
 * @funcname IntelligentRoadTest.initLegendGrid
 * @funcdesc //初始化图层图例的方法
 * @param {null}
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.initLegendGrid = function IntelligentRoadTestSystemLayerV3_initLegendGrid(){
    $('input[name="legend-grid"]').each(function(index){//覆盖质量
        /*var index=$('input[name="legend-grid"]').index($(this));
        console(index+"=================="+i)*/
        var $legen=$(".colorLegen").children('.map-w-i').eq(index);
        var id = $legen.attr("id");
        var bgColor=$(this).next().css('background-color');
        $legen.css('background-color',bgColor);
        if($(this).is(':checked')){
            if($legen.hasClass("grey")){//判断该图例颜色是否为灰
                //灰色的时候，呈现栅格
                $legen.removeClass("grey");
                if(index<=5){//上行
                    IntelligentRoadTest.colorBarArrSH = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrSH,id.split("_")[1]);
                }else if(index>5&&index<12){//下行
                    IntelligentRoadTest.colorBarArrXH = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrXH,id.split("_")[1]);
                }else if(index>11&&index<18){//覆盖质量
                    IntelligentRoadTest.colorBarArr = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArr,id.split("_")[1]);
                }else if(index>17&&index<24){//MOD3干扰
                    IntelligentRoadTest.colorBarArrM3 = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrM3,id.split("_")[1]);
                }else if(index>23&&index<30){//越区覆盖
                    IntelligentRoadTest.colorBarArrYQ = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrYQ,id.split("_")[1]);
                }else if(index>29&&index<36){//重叠覆盖
                    IntelligentRoadTest.colorBarArrCD = IntelligentRoadTest.removeId(IntelligentRoadTest.colorBarArrCD,id.split("_")[1]);
                }
            }
        }else{
            if(!$legen.hasClass("grey")){//判断该图例颜色是否为灰
                //呈现该图例栅格
                $legen.addClass("grey");
                if(index<=5){//上行
                    IntelligentRoadTest.colorBarArrSH.push(id.split("_")[1]);
                }else if(index>5&&index<12){//下行
                    IntelligentRoadTest.colorBarArrXH.push(id.split("_")[1]);
                }else if(index>11&&index<18){//覆盖质量
                    IntelligentRoadTest.colorBarArr.push(id.split("_")[1]);
                }else if(index>17&&index<24){//MOD3干扰
                    IntelligentRoadTest.colorBarArrM3.push(id.split("_")[1]);
                }else if(index>23&&index<30){//越区覆盖
                    IntelligentRoadTest.colorBarArrYQ.push(id.split("_")[1]);
                }else if(index>29&&index<36){//重叠覆盖
                    IntelligentRoadTest.colorBarArrCD.push(id.split("_")[1]);
                }
            }
        }

        /*if(IntelligentRoadTest.isShowGrid||IntelligentRoadTest.isShowDTGrid){
            IntelligentRoadTest.colorbarEndRedraw();
        }
        // console.log(IntelligentRoadTest.colorBarArr);
        if(IntelligentRoadTest.index==15){
            IntelligentRoadTest.metorColorLegen();
        }
        if(IntelligentRoadTest.index==7||IntelligentRoadTest.index==8||IntelligentRoadTest.index==14){
            IntelligentRoadTest.osmColorLegen();
        }*/

    });
    
    //线段图层图例(图层上的配置)
    $('input[name="legend-grid-line"]').each(function(index){
        /*var index=$('input[name="legend-grid"]').index($(this));
        console(index+"=================="+i)*/
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

    });
    
    
}


//地图点击的对象高亮显示:用于地图点击对象时，由于要去查对应的数据，导致showsector（）和showpolyon（）方法执行较慢
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
 * @funcname IntelligentRoadTest.resetGridType
 * @funcdesc //扇区状态下禁用上、下行速率
 * @param {null}
 * @return {null}
 * @author 陈小芳
 * @create 20171017
 ***********************************/
IntelligentRoadTestSystemLayerV3.resetGridType = function IntelligentRoadTestSystemLayerV3_resetGridType(){
    //扇区没有上、下行速率 扇区只有主接入场强，没有最优场强和区分频段的选择
    $('input:radio[id="fgzl-type"]').attr("checked","true");
    $('input:radio[id="fgzl-type"]').click();
    IntelligentRoadTest.gridTypeIndex=0;
    IntelligentRoadTest.gridThresholds=[
        { "threshold": "<=-115", "text": "(-∞,-115]", "color": $("#jichaColor").css('background-color'), "gradient": gridOpacity, "selected":$('#jichaLegend').is(':checked')},
        { "threshold": "<=-105", "text": "(-115,-105]", "color": $("#chaColor").css('background-color'), "gradient": gridOpacity, "selected":$('#chaLegend').is(':checked')},
        { "threshold": "<=-95", "text": "(-105,-95]", "color": $("#zhongColor").css('background-color'), "gradient": gridOpacity, "selected":$('#zhongLegend').is(':checked')},
        { "threshold": "<=-85", "text": "(-95,-85]", "color": $("#liangColor").css('background-color'), "gradient": gridOpacity, "selected":$('#liangLegend').is(':checked')},
        { "threshold": "<0", "text": "(-85,0)", "color": $("#youColor").css('background-color'), "gradient": gridOpacity, "selected":$('#youLegend').is(':checked')},
        { "threshold": "<=3", "text": "(0,3]", "color": $("#notCountColor").css('background-color'), "gradient": gridOpacity, "selected":$('#notCountLegend').is(':checked')}
    ];
    if(!$('input:radio[id="bf-band"]').is(':checked')){
        $('input:radio[id="bf-band"]').attr("checked","true");
        $('input:radio[id="bf-band"]').click();
    }
    $('input:radio[id="zjr-grid"]').attr("checked","true");
    $('input:radio[id="zjr-grid"]').click();

    IntelligentRoadTest.gridBandIndex=0;
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

//给IntelligentRoadTest.poorAreaObj总对象赋值一个当前正在查看的专题图层对象
IntelligentRoadTestSystemLayerV3.setPoorAreaObj=function IntelligentRoadTestSystemLayerV3_setPoorAreaObj(index){
    if(index==24){
        IntelligentRoadTest.poorAreaObj = upPoorArea;
    }else if(index==25){
        IntelligentRoadTest.poorAreaObj = dwPoorArea;
    }else if(index==26){
        IntelligentRoadTest.poorAreaObj = m3PoorArea;
    }else if(index==27){
        IntelligentRoadTest.poorAreaObj = olPoorArea;
    }else if(index==28){
        IntelligentRoadTest.poorAreaObj = cbPoorArea;
    }else if(index==0){
        IntelligentRoadTest.poorAreaObj = poorArea;
    }

}

//给IntelligentRoadTest.poorAreaObj总对象赋值一个当前正在查看的专题图层对象
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
    }else if(currentLocation=="m3PoorArea"){//MOD3干扰
        $(".fieldset2 input#mod3-type").click();
        $(".fieldset2 input#mod3-type").siblings('label').css("color","#3285FF");
    }else if(currentLocation=="cbPoorArea"){//越区覆盖
        $(".fieldset2 input#yqfg-type").click();
        $(".fieldset2 input#yqfg-type").siblings('label').css("color","#3285FF");
    }else if(currentLocation=="olPoorArea"){//重叠覆盖
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
IntelligentRoadTestSystemLayerV3.getGridThresholds = function IntelligentRoadTestSystemLayerV3_getGridThresholds(gridTypeIndex,gridOpacity){
    var gridThresholds=[
        { "threshold": "<=-115", "text": "(-∞,-115]", "color": $("#jichaColor").css('background-color'), "gradient": gridOpacity, "selected":$('#jichaLegend').is(':checked')},
        { "threshold": "<=-105", "text": "(-115,-105]", "color": $("#chaColor").css('background-color'), "gradient": gridOpacity, "selected":$('#chaLegend').is(':checked')},
        { "threshold": "<=-95", "text": "(-105,-95]", "color": $("#zhongColor").css('background-color'), "gradient": gridOpacity, "selected":$('#zhongLegend').is(':checked')},
        { "threshold": "<=-85", "text": "(-95,-85]", "color": $("#liangColor").css('background-color'), "gradient": gridOpacity, "selected":$('#liangLegend').is(':checked')},
        { "threshold": "<0", "text": "(-85,0)", "color": $("#youColor").css('background-color'), "gradient": gridOpacity, "selected":$('#youLegend').is(':checked')},
        { "threshold": "<=3", "text": "(0,3]", "color": $("#notCountColor").css('background-color'), "gradient": gridOpacity, "selected":$('#notCountLegend').is(':checked')}
    ];
    if(gridTypeIndex==1){
        //上行速率
        gridThresholds=[
            { "threshold": "100", "text": "[5,+∞)", "color": $("#youshColor").css('background-color'), "gradient": gridOpacity, "selected":$('#youshLegend').is(':checked')},
            { "threshold": "4.99", "text": "[3,5)", "color": $("#liangshColor").css('background-color'), "gradient": gridOpacity, "selected":$('#liangshLegend').is(':checked')},
            { "threshold": "2.99", "text": "[1,3)", "color": $("#zhongshColor").css('background-color'), "gradient": gridOpacity, "selected":$('#zhongshLegend').is(':checked')},
            { "threshold": "0.99", "text": "[0.25,1)", "color": $("#chashColor").css('background-color'), "gradient": gridOpacity, "selected":$('#chaLeshgend').is(':checked')},
            { "threshold": "0.24", "text": "(0,0.25)", "color": $("#jichashColor").css('background-color'), "gradient": gridOpacity, "selected":$('#jichashLegend').is(':checked')},
            { "threshold": "0", "text": "[-2,0)", "color": $("#notCountshColor").css('background-color'), "gradient": gridOpacity, "selected":$('#notCountshLegend').is(':checked')}
        ];
    }else if(gridTypeIndex==2){
        gridThresholds=[
            { "threshold": "100", "text": "[12,+∞)", "color": $("#youxhColor").css('background-color'), "gradient": gridOpacity, "selected":$('#youxhLegend').is(':checked')},
            { "threshold": "11.99", "text": "[8,12)", "color": $("#liangxhColor").css('background-color'), "gradient": gridOpacity, "selected":$('#liangxhLegend').is(':checked')},
            { "threshold": "7.99", "text": "[5,8)", "color": $("#zhongxhColor").css('background-color'), "gradient": gridOpacity, "selected":$('#zhongxhLegend').is(':checked')},
            { "threshold": "4.99", "text": "[2,5)", "color": $("#chaxhColor").css('background-color'), "gradient": gridOpacity, "selected":$('#chaxhLegend').is(':checked')},
            { "threshold": "1.99", "text": "(0,2)", "color": $("#jichaxhColor").css('background-color'), "gradient": gridOpacity, "selected":$('#jichaxhLegend').is(':checked')},
            { "threshold": "0", "text": "[-2,0)", "color": $("#notCountxhColor").css('background-color'), "gradient": gridOpacity, "selected":$('#notCountxhLegend').is(':checked')}
        ];
    }else if(gridTypeIndex==3){
        gridThresholds=[
            { "threshold": "0.1", "text": "(-∞,0.1]", "color": $("#youM3Color").css('background-color'), "gradient": gridOpacity, "selected":$('#youM3Legend').is(':checked')},
            { "threshold": "0.3", "text": "(0.1,0.3]", "color": $("#liangM3Color").css('background-color'), "gradient": gridOpacity, "selected":$('#liangM3Legend').is(':checked')},
            { "threshold": "0.5", "text": "(0.3,0.5]", "color": $("#zhongM3Color").css('background-color'), "gradient": gridOpacity, "selected":$('#zhongM3Legend').is(':checked')},
            { "threshold": "0.7", "text": "(0.5,0.7]", "color": $("#chaM3Color").css('background-color'), "gradient": gridOpacity, "selected":$('#chaM3Legend').is(':checked')},
            { "threshold": "3", "text": "(0.7,+∞)", "color": $("#jichaM3Color").css('background-color'), "gradient": gridOpacity, "selected":$('#jichaM3Legend').is(':checked')},
            { "threshold": "-1", "text": "[-3,0]", "color": $("#notCountM3Color").css('background-color'), "gradient": gridOpacity, "selected":$('#notCountM3Legend').is(':checked')}
        ];
    }else if(gridTypeIndex==4){
        gridThresholds=[
            { "threshold": "0.1", "text": "(-∞,0.1]", "color": $("#youYQColor").css('background-color'), "gradient": gridOpacity, "selected":$('#youYQLegend').is(':checked')},
            { "threshold": "0.3", "text": "(0.1,0.3]", "color": $("#liangYQColor").css('background-color'), "gradient": gridOpacity, "selected":$('#liangYQLegend').is(':checked')},
            { "threshold": "0.5", "text": "(0.3,0.5]", "color": $("#zhongYQColor").css('background-color'), "gradient": gridOpacity, "selected":$('#zhongYQLegend').is(':checked')},
            { "threshold": "0.7", "text": "(0.5,0.7]", "color": $("#chaYQColor").css('background-color'), "gradient": gridOpacity, "selected":$('#chaYQLegend').is(':checked')},
            { "threshold": "3", "text": "(0.7,+∞)", "color": $("#jichaYQColor").css('background-color'), "gradient": gridOpacity, "selected":$('#jichaYQLegend').is(':checked')},
            { "threshold": "-1", "text": "[-3,0]", "color": $("#notCountYQColor").css('background-color'), "gradient": gridOpacity, "selected":$('#notCountYQLegend').is(':checked')}
        ];
    }else if(gridTypeIndex==5){
        gridThresholds=[
            { "threshold": "0.1", "text": "(-∞,0.1]", "color": $("#youCDColor").css('background-color'), "gradient": gridOpacity, "selected":$('#youCDLegend').is(':checked')},
            { "threshold": "0.3", "text": "(0.1,0.3]", "color": $("#liangCDColor").css('background-color'), "gradient": gridOpacity, "selected":$('#liangCDLegend').is(':checked')},
            { "threshold": "0.5", "text": "(0.3,0.5]", "color": $("#zhongCDColor").css('background-color'), "gradient": gridOpacity, "selected":$('#zhongCDLegend').is(':checked')},
            { "threshold": "0.7", "text": "(0.5,0.7]", "color": $("#chaCDColor").css('background-color'), "gradient": gridOpacity, "selected":$('#chaCDLegend').is(':checked')},
            { "threshold": "3", "text": "(0.7,+∞)", "color": $("#jichaCDColor").css('background-color'), "gradient": gridOpacity, "selected":$('#jichaCDLegend').is(':checked')},
            { "threshold": "-1", "text": "[-3,0]", "color": $("#notCountCDColor").css('background-color'), "gradient": gridOpacity, "selected":$('#notCountCDLegend').is(':checked')}
        ];
    }
    return gridThresholds;

}

//线段图层中的线段配置，使用level(和页面图例对应)，不使用对应的值，需要在匹配时自行将值根据区间进行转换
IntelligentRoadTestSystemLayerV3.getLineThresholds = function IntelligentRoadTestSystemLayerV3_getLineThresholds(lineTypeIndex,lineOpacity){
    //1优2良3中4差5极差6记录数
	var gridThresholds=[
        { "level": "1", "text": "(-∞,-115]", "color": $("#youColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#jichaLegendLine').is(':checked')},
        { "level": "2", "text": "(-115,-105]", "color": $("#liangColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#chaLegendLine').is(':checked')},
        { "level": "3", "text": "(-105,-95]", "color": $("#zhongColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#zhongLegendLine').is(':checked')},
        { "level": "4", "text": "(-95,-85]", "color": $("#chaColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#liangLegendLine').is(':checked')},
        { "level": "5", "text": "(-85,0)", "color": $("#jichaColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#youLegendLine').is(':checked')},
        { "level": "6", "text": "(0,3]", "color": $("#notCountColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#notCountLegendLine').is(':checked')}
    ];
    if(lineTypeIndex==1){
        //上行速率
        gridThresholds=[
            { "level": "1", "text": "[5,+∞)", "color": $("#youshColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#youshLegendLine').is(':checked')},
            { "level": "2", "text": "[3,5)", "color": $("#liangshColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#liangshLegendLine').is(':checked')},
            { "level": "3", "text": "[1,3)", "color": $("#zhongshColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#zhongshLegendLine').is(':checked')},
            { "level": "4", "text": "[0.25,1)", "color": $("#chashColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#chaLeshgendLine').is(':checked')},
            { "level": "5", "text": "(0,0.25)", "color": $("#jichashColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#jichashLegendLine').is(':checked')},
            { "level": "6", "text": "[-2,0)", "color": $("#notCountshColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#notCountshLegendLine').is(':checked')}
        ];
    }else if(lineTypeIndex==2){
        gridThresholds=[
            { "level": "1", "text": "[12,+∞)", "color": $("#youxhColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#youxhLegendLine').is(':checked')},
            { "level": "2", "text": "[8,12)", "color": $("#liangxhColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#liangxhLegendLine').is(':checked')},
            { "level": "3", "text": "[5,8)", "color": $("#zhongxhColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#zhongxhLegendLine').is(':checked')},
            { "level": "4", "text": "[2,5)", "color": $("#chaxhColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#chaxhLegendLine').is(':checked')},
            { "level": "5", "text": "(0,2)", "color": $("#jichaxhColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#jichaxhLegendLine').is(':checked')},
            { "level": "6", "text": "[-2,0)", "color": $("#notCountxhColorLine").css('background-color'), "gradient": lineOpacity, "selected":$('#notCountxhLegendLine').is(':checked')}
        ];
    }
    return gridThresholds;

}

//根据栅格下标获取栅格的指标名称
IntelligentRoadTestSystemLayerV3.getGridName = function IntelligentRoadTestSystemLayerV3_getGridName(gridTypeIndex){
    var obj={};
    if(gridTypeIndex==0){
        obj={"zhibiao":IntelligentRoadTest.gridBand.join(",")+" "+IntelligentRoadTest.gridType+"(dBm)","name":"覆盖质量"};
    }else if(gridTypeIndex==1){
        obj={"zhibiao":IntelligentRoadTest.gridType+" "+"平均上行速率"+"(Mbps)","name":"上行速率"};
    }else if(gridTypeIndex==2){
        obj={"zhibiao":IntelligentRoadTest.gridType+" "+"平均下行速率"+"(Mbps)","name":"下行速率"};
    }else if(gridTypeIndex==3){
        obj={"zhibiao":IntelligentRoadTest.gridType+" "+"MOD3干扰"+"(dBm)","name":"MOD3干扰"};
    }else if(gridTypeIndex==4){
        obj={"zhibiao":IntelligentRoadTest.gridType+" "+"越区覆盖"+"(dBm)","name":"越区覆盖"};
    }else if(gridTypeIndex==5){
        obj={"zhibiao":IntelligentRoadTest.gridType+" "+"重叠覆盖"+"(dBm)","name":"重叠覆盖"};
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
    var year=date.substr(0 , 4);
    var month=date.substr(4 , 2);
    var day = date.substr(6 , 2);
    var preMonth = new Date(year, month-1, day).Format("ddMM");
    // var preMonth =new Date( now.setMonth(now.getMonth() - 1)).Format("yyyyMM");
    return preMonth;
}



