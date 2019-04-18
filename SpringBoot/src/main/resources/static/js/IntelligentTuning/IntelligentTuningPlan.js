//'方案调优’模块
var IntelligentTuningPlan={};
/**********************************
 * @funcname getPlanRecords
 * @funcdesc 获取方案记录
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter enodeb_id 基站id,cell_id 小区id
 * @return {datatype}
 * @author zhaixuan
 * @create 2018/9/19 14:45
 * @modifier 
 * @modify 
 ***********************************/
IntelligentTuningPlan.getPlanRecords=function IntelligentTuningPlan_getPlanRecords(item) {
    var progress=[];
    var list=['AntAdj_03_GetProblemCell','ENODEB_ID:'+item.enodeb_id,'CELL_ID:'+item.cell_id];
    progress.push(list);
    var functionList=[IntelligentTuningPlan.callGetPlanRecords];
    var database=[3];
    var params=[item];
    progressbarTwo.submitSql(progress,functionList,database,params);
}
IntelligentTuningPlan.callGetPlanRecords=function IntelligentTuningPlan_callGetPlanRecords(data,paramObj) {
    var result=callBackChangeData(data);
    //测试数据
    // result=[
    //     {sys_status:'待审核',task_create_time:'2018-09-19 12:12:12',enodeb_id:100,cell_id:02,comf_time:'2018-09-19 12:12:12',comf_opinion:'确定',oprt_etime:'2018-09-19 12:12:12',oprt_result:'成功',eval_etime:'2018-09-19 12:12:12',eval_result:'解决',problem_name:'MOD3干扰',ant_electron_angle:8,sugg_ant_electron_angle:8,pilot_power:8,sugg_pilot_power:8,handover:8,sugg_handover:8,pci:8,sugg_pci:8,solution:'551183,17,5,狮山油田接入机房LBBU14_4,调整电子下倾角,4,7,中兴'},
    //     {sys_status:'待审核',task_create_time:'2018-09-20 12:12:12',enodeb_id:200,cell_id:03,comf_time:'2018-09-20 13:13:13',comf_opinion:'确定',oprt_etime:'2018-09-20 13:13:13',oprt_result:'成功',eval_etime:'2018-09-20 13:13:13',eval_result:'解决',problem_name:'越区覆盖',ant_electron_angle:9,sugg_ant_electron_angle:9,pilot_power:9,sugg_pilot_power:9,handover:9,sugg_handover:9,pci:9,sugg_pci:9,solution:'504368,48,0,坦洲公洲_F_0,调整方位角,100,340,华为@504368,50,2,坦洲公洲_F_2,调整方位角,340,100,华为'},
    //     // {sys_status:'待审核',task_create_time:'2018-09-21 12:12:12',enodeb_id:300,cell_id:08,comf_time:'2018-09-21 14:14:14',comf_opinion:'确定',oprt_etime:'2018-09-21 14:14:142',oprt_result:'成功',EVAL_ETIME:'2018-09-21 14:14:14',EVAL_RESULT:'解决',PROBLEM_NAME:'MOD3干扰',ANT_ELECTRON_ANGLE:10,SUGG_ANT_ELECTRON_ANGLE:10,PILOT_POWER:10,SUGG_PILOT_POWER:10,HANDOVER:10,SUGG_HANDOVER:10,PCI:10,SUGG_PCI:10,SOLUTION:'弱覆盖：调整功率'}
    // ];
    //方案记录数组添加数据
    IntelligentTuning.sectorCompleteVM.planRecords=[];
    var arr=[];
    for(var i=0;i<result.length;i++){
        var dataObj={};
        dataObj.cell_item=paramObj;
        //空值替换
        var comf_time_str=yyyyMmDdFormat(result[i]['comf_time']);
        var oprt_etime_str=yyyyMmDdFormat(result[i]['oprt_etime']);
        var eval_etime_str=yyyyMmDdFormat(result[i]['eval_etime']);
        var comf_opinion_str=isStatus(result[i]['comf_opinion']);
        var oprt_result_str=isStatus(result[i]['oprt_result']);
        var eval_result_str=isStatus(result[i]['eval_result']);
        var oprt_solu_result=result[i]['oprt_solu_result'];
        // oprt_solu_result='确认@开始';//测试数据
        dataObj.comf_opinion=comf_opinion_str;
        dataObj.oprt_result=oprt_result_str;
        dataObj.eval_result=eval_result_str;
        dataObj.comf_note=abnorValRepeat(result[i]['comf_note']);//null或者undefine时，用''替换
        var confirm_status=comf_time_str.substring(0,4)+'/'+comf_time_str.substring(5,7)+'/'+comf_time_str.substring(8,10)+' <'+comf_opinion_str+'>';
        var perform_status=oprt_etime_str.substring(0,4)+'/'+oprt_etime_str.substring(5,7)+'/'+oprt_etime_str.substring(8,10)+' <'+oprt_result_str+'>';
        var assessment_status=eval_etime_str.substring(0,4)+'/'+eval_etime_str.substring(5,7)+'/'+eval_etime_str.substring(8,10)+' <'+eval_result_str+'>';
        //当前问题
        dataObj.problem_name=result[i]['problem_name'],
        //方案详情的信息
        dataObj.ant_electron_angle=result[i]['ant_electron_angle'],
        dataObj.sugg_ant_electron_angle=result[i]['sugg_ant_electron_angle'],
        dataObj.pilot_power=result[i]['pilot_power'],
        dataObj.sugg_pilot_power=result[i]['sugg_pilot_power'],
        dataObj.PCI=result[i]['pci'],
        dataObj.sugg_pci=result[i]['sugg_pci'],
        dataObj.handover=result[i]['handover'],
        dataObj.sugg_handover=result[i]['sugg_handover'],
        //记录列表的信息
        dataObj.confirm_status=confirm_status,
        dataObj.perform_status=perform_status,
        dataObj.assessment_status=assessment_status,
        dataObj.adjust_content=result[i]['solution'],
        //基站小区id
        dataObj.enodeb_id=result[i]['enodeb_id'],
        dataObj.cell_id=result[i]['cell_id'],
        dataObj.comf_time=comf_time_str.substring(0,4)+'-'+comf_time_str.substring(5,7)+'-'+comf_time_str.substring(8,10),
        dataObj.oprt_etime=oprt_etime_str.substring(0,4)+'-'+oprt_etime_str.substring(5,7)+'-'+oprt_etime_str.substring(8,10),
        dataObj.eval_etime=eval_etime_str.substring(0,4)+'-'+eval_etime_str.substring(5,7)+'-'+eval_etime_str.substring(8,10),
        dataObj.current_status=result[i]['sys_status'],
        dataObj.task_create_time_date=result[i]['task_create_time'],//以源于数据表的格式赋值
        dataObj.task_create_time=result[i]['task_create_time'],
        dataObj.status_time=result[i]['task_create_time'].substring(0,4)+'-'+result[i]['task_create_time'].substring(5,7)+'-'+result[i]['task_create_time'].substring(8,10),
        dataObj.comf_task_id=result[i]['comf_task_id'],
        //方案记录的工单状态
        dataObj.record_sys_status='<'+isStatus(dataObj.current_status)+'>';
        //task_create_time格式修改为'yyyy/MM/dd'
        dataObj.task_create_time=dataObj.task_create_time.substring(0,4)+'/'+dataObj.task_create_time.substring(5,7)+'/'+dataObj.task_create_time.substring(8,10);
        if(dataObj.task_create_time==''||dataObj.task_create_time==undefined||dataObj.task_create_time==null){
            dataObj.task_create_time='yyyy/MM/dd';
        }
        //方案详情数组
        dataObj.planInfoArr=[];
        //如果调整内容含有@符号，进行换行符替换  replace(/@/g,'\n')
        if(dataObj.adjust_content.indexOf('@')>0){
            dataObj.adjust_content=dataObj.adjust_content.replace(/@/g,'\n');
            var adjustArr=dataObj.adjust_content.split('\n');
            for(var k=0;k<adjustArr.length;k++){
                var adjustNameArr=adjustArr[k].split(',');
                //方案详情
                var obj={enodeb_id:adjustNameArr[0]+'_'+adjustNameArr[1],cell_name:adjustNameArr[3],adjustName:adjustNameArr[4],currentSet:adjustNameArr[5],planSet:adjustNameArr[6]};
                dataObj.planInfoArr.push(obj);
            }
        }else{
            if(dataObj.adjust_content.indexOf(',')>0){
                var adjustNameArr=dataObj.adjust_content.split(',');
                var obj={enodeb_id:adjustNameArr[0]+'_'+adjustNameArr[1],cell_name:adjustNameArr[3],adjustName:adjustNameArr[4],currentSet:adjustNameArr[5],planSet:adjustNameArr[6]};
                dataObj.planInfoArr.push(obj);
            }
        }
        //截取执行状态
        var oprts='';
        if(oprt_solu_result!=null&&oprt_solu_result!=undefined){
            oprts=oprt_solu_result.split('@');
        }
        if(oprts.length>0){
            for(var p=0;p<dataObj.planInfoArr.length;p++){
                dataObj.planInfoArr[p].oprt_status=oprts[p];
            }
        }
        //方案设置
        dataObj.sugg_ant_electron_angle=setByWord(dataObj.adjust_content,'下倾角');
        dataObj.sugg_pci=setByWord(dataObj.adjust_content,'PCI');
        dataObj.sugg_pilot_power=setByWord(dataObj.adjust_content,'功率');
        dataObj.sugg_handover=setByWord(dataObj.adjust_content,'切换参数');
        //用于是否显示方案详情isPLanShow
        dataObj.isPlanShow=true;
        // if(dataObj.sugg_ant_electron_angle=='_'&&dataObj.sugg_pci=='_'&&dataObj.sugg_pilot_power=='_'&&dataObj.sugg_handover=='_'){
        //     dataObj.isPlanShow=false;
        // }
        arr.push(dataObj);
        // IntelligentTuning.sectorCompleteVM.planRecords.push(dataObj);
    }
    IntelligentTuning.sectorCompleteVM.planRecords=arr;
    //方案记录的第一条信息,默认是方案详情
    if(IntelligentTuning.sectorCompleteVM.planRecords.length>0){
        IntelligentTuning.sectorCompleteVM.planInfo=IntelligentTuning.sectorCompleteVM.planRecords[0];
    }else{
        var obj={};
        obj.sugg_ant_electron_angle='_';
        obj.sugg_pci='_';
        obj.sugg_pilot_power='_';
        obj.sugg_handover='_';
        obj.status_time='';
        obj.status_time=yyyyMmDdFormatUnd(paramObj.status_time);
        obj.cell_item=paramObj;
        IntelligentTuning.sectorCompleteVM.planInfo=obj;
        IntelligentTuning.sectorCompleteVM.planInfo.isPlanShow=false;
        IntelligentTuning.sectorCompleteVM.planInfo.oprt_etime='';
    }
    IntelligentTuningChart.fillChart(IntelligentTuning.sectorCompleteVM.planInfo,IntelligentTuning.sectorCompleteVM.planInfo.oprt_etime);
}
/**********************************
 * @funcname cellCurSetting
 * @funcdesc 小区当前设置
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter item 小区对象
 * @return {datatype}
 * @author zhaixuan
 * @create 2018/10/19 10:52
 * @modifier 
 * @modify 
 ***********************************/
IntelligentTuningPlan.cellCurSetting=function IntelligentTuningPlan_cellCurSetting(item) {
    var progress=[];
    var list=['AntAdj_03_01_GetCellCurSet','ENODEB_ID:'+item.enodeb_id,'CELL_ID:'+item.cell_id];
    progress.push(list);
    var database=[3];
    var functionList=[IntelligentTuningPlan.callCellCurSetting];
    progressbarTwo.submitSql(progress,functionList,database);
}
IntelligentTuningPlan.callCellCurSetting=function IntelligentTuningPlan_callCellCurSetting(data) {
    var result=callBackChangeData(data);
    if(result.length>0){
        IntelligentTuning.sectorCompleteVM.currentSetObj=result[0];
        IntelligentTuning.sectorCompleteVM.currentSetObj.isShowInfo=true;
        IntelligentTuning.sectorCompleteVM.currentSetObj.PCI=result[0].pci;
        //根据条件给属性赋值
        IntelligentTuning.sectorCompleteVM.currentSetObj.ant_electron_angle=abnorValRepeat(result[0].ant_electron_angle);
        IntelligentTuning.sectorCompleteVM.currentSetObj.pilot_power=abnorValRepeat(result[0].pilot_power);
        IntelligentTuning.sectorCompleteVM.currentSetObj.PCI=abnorValRepeat(result[0].pci);
        IntelligentTuning.sectorCompleteVM.currentSetObj.handover=abnorValRepeat(result[0].handover);
        //方案当前设置的属性都为''时，设置isShowInfo为false,用于是否显示方案详情
        if(IntelligentTuning.sectorCompleteVM.currentSetObj.ant_electron_angle==''&&IntelligentTuning.sectorCompleteVM.currentSetObj.pilot_power==''&&IntelligentTuning.sectorCompleteVM.currentSetObj.PCI==''&&IntelligentTuning.sectorCompleteVM.currentSetObj.handover==''){
            IntelligentTuning.sectorCompleteVM.currentSetObj.isShowInfo=false;
        }
    }else{
        IntelligentTuning.sectorCompleteVM.currentSetObj.isShowInfo=false;
    }
}
/**********************************
 * @funcname getCellRefer
 * @funcdesc 获取小区参考方案
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter
 * @return {datatype}
 * @author zhaixuan
 * @create 2018/11/5 14:24
 * @modifier 
 * @modify 
 ***********************************/
IntelligentTuningPlan.getCellRefer=function IntelligentTuningPlan_getCellRefer(item,start,end) {
    var progress=[];
    var list=['AntAdj_03_01_GetCellRefer','ENODEB_ID:'+item.enodeb_id,'CELL_ID:'+item.cell_id,'start:'+start,'end:'+end];
    progress.push(list);
    var functionList=[IntelligentTuningPlan.CallGetCellRefer];
    var dataBase=[3];
    progressbarTwo.submitSql(progress,functionList,dataBase);
}
IntelligentTuningPlan.CallGetCellRefer=function IntelligentTuningPlan_CallGetCellRefer(data) {
    IntelligentTuning.sectorCompleteVM.referencePlanArr=[];
    var result=callBackChangeData(data);
    // result=[
    //     {problem:'坐标勘误',day:20181031,solution:'551183,17,5,狮山油田接入机房LBBU14_4,调整电子下倾角,4,7,中兴'},
    //     {problem:'重叠覆盖',day:20181031,solution:'504368,48,0,坦洲公洲_F_0,调整方位角,100,340,华为@504368,50,2,坦洲公洲_F_2,调整方位角,340,100,华为'}
    // ];
    for(var i=0;i<result.length;i++){
        var referencePlan={};
        //给参考方案赋予属性值
        referencePlan.problem=result[i]['problem'];
        result[i]['day']=result[i]['day'].toString();
        referencePlan.day=result[i]['day'].substring(0,4)+'/'+result[i]['day'].substring(4,6)+'/'+result[i]['day'].substring(6,8);
        var solution=result[i]['solution'];
        //如果调整内容含有@符号，进行换行符替换  replace(/@/g,'\n')
        referencePlan.planInfoArr=[];
        if(solution.indexOf('@')>0){
            solution=solution.replace(/@/g,'\n');
            var adjustArr=solution.split('\n');
            for(var h=0;h<adjustArr.length;h++){
                var adjustNameArr=adjustArr[h].split(',');
                //方案详情
                var obj={enodeb_id:adjustNameArr[0]+'_'+adjustNameArr[1],cell_name:adjustNameArr[3],adjustName:adjustNameArr[4],currentSet:adjustNameArr[5],planSet:adjustNameArr[6]};
                referencePlan.planInfoArr.push(obj);
            }
        }else{
            if(solution.indexOf(',')>0){
                var adjustNameArr=solution.split(',');
                var obj={enodeb_id:adjustNameArr[0]+'_'+adjustNameArr[1],cell_name:adjustNameArr[3],adjustName:adjustNameArr[4],currentSet:adjustNameArr[5],planSet:adjustNameArr[6]};
                referencePlan.planInfoArr.push(obj);
            }
        }
        referencePlan.solution=solution;
        referencePlan.isShowContent=false;
        //根据调整内容是否包含关键词，来给属性赋值
        // referencePlan.sugg_ant_electron_angle=setByWord(referencePlan.solution,'下倾角');
        // referencePlan.sugg_pci=setByWord(referencePlan.solution,'PCI');
        // referencePlan.sugg_pilot_power=setByWord(referencePlan.solution,'功率');
        // referencePlan.sugg_handover=setByWord(referencePlan.solution,'切换参数');
        IntelligentTuning.sectorCompleteVM.referencePlanArr.push(referencePlan);
    }
    if(IntelligentTuning.sectorCompleteVM.referencePlanArr.length>0){
        //按时间倒叙
        var dateToTime = function(str){
            return (new Date(str)).getTime();
        }
        for(var k=0; k < IntelligentTuning.sectorCompleteVM.referencePlanArr.length; k++){
            IntelligentTuning.sectorCompleteVM.referencePlanArr[k].publishTimeNew = dateToTime(IntelligentTuning.sectorCompleteVM.referencePlanArr[k].day);
        }
        IntelligentTuning.sectorCompleteVM.referencePlanArr.sort(function(a, b) {
            return b.publishTimeNew> a.publishTimeNew ? 1 : -1;
        });
        //默认第一个给true
        IntelligentTuning.sectorCompleteVM.referencePlanArr[0].isShowContent=true;
    }
}
//日期格式替换 'yyyy/MM/dd'
function yyyyMmDdFormat(dateString) {
    if(dateString==''||dateString==undefined||dateString==null){
        dateString='yyyy/MM/dd';
    }
    return dateString;
}
//日期格式替换 'yyyy-MM-dd'
function yyyyMmDdFormatUnd(dateString) {
    if(dateString==''||dateString==undefined||dateString==null){
        dateString='yyyy-MM-dd';
    }
    return dateString;
}
//状态值替换
function isStatus(statusString) {
    if(statusString==''||statusString==undefined||statusString==null){
        statusString='---';
    }
    return statusString;
}
//值为null或者undefine时，用''替换
function abnorValRepeat(str){
    if(str==undefined||str==null){
        str='';
    }
    return str;
}
/**********************************
 * @funcname setByWord
 * @funcdesc 根据内容是否包含关键词，来赋值
 * @param {datatype} nameOfParameter (input/output optional)
      descriptionOfParameter adjust_content取值的内容  content关键词
 * @return {datatype}objProper 接受值的属性
 * @author zhaixuan
 * @create 2018/11/1 11:23
 * @modifier 
 * @modify 
 ***********************************/
function setByWord(adjust_content,content) {
    var objProper='';
    if(adjust_content.indexOf(content)>0){
        objProper=adjust_content;
    }else{
        objProper='_';
    }
    return objProper;
}
//Date类型转化为yyyyMMdd
IntelligentTuningPlan.formatDate=function formatDate (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second= date.getSeconds();
    second = minute < 10 ? ('0' + second) : second;
    return y +''+ m +''+ d;
}
// 字符串转日期
IntelligentTuningPlan.stringFormDate=function stringFormDate (date) {
    var t = Date.parse(date);
    if (!isNaN(t)) {
        return new Date(Date.parse(date.replace(/-/g, "/")));
    } else {
        return new Date();
    }
};


