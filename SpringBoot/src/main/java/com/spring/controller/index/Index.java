package com.spring.controller.index;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.common.dataSource.AlarmDataQuery;
import com.spring.common.util.AnalysisSqlXmlUtil;

@Controller
@RequestMapping("/Index")
public class Index {
	
	@Resource
	private AlarmDataQuery alarmDataQuery;
	
	
	@RequestMapping("/alarmQuery")
	@ResponseBody
	public Map<String, Object> alarmQuery() {
    	String sql = "SELECT * from  alarm_info where Date(ALARM_TIME)<=20180505 AND city = '广州' and ALARM_NAME='AGPS智能路测弱覆盖区域'";
		Map<String, Object> resultMap = alarmDataQuery.getSqlData(sql);
//		System.out.println("sql:"+sql);
//		Map<String, Object> resultMap = new HashMap<String, Object>();
		return resultMap;
	}
	
	@RequestMapping("/Query")
	@ResponseBody
	public Map<String,Object> queryData(){
//		Map<String, Object> resultMap = alarmDataQuery.getSqlData(sql);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String templateId = "Common_04_city_area_mkt_NameAndId";
		String sql = AnalysisSqlXmlUtil.getInstance().AnalysisSqlXmlByID(templateId);
		resultMap.put("sql", sql);
		return resultMap;
	}
	
}
