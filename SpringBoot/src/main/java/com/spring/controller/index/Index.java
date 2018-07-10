package com.spring.controller.index;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.common.dataSource.AlarmDataTest;

@Controller
@RequestMapping("/Index")
public class Index {
	
	@Resource
	private AlarmDataTest alarmDataTest;
	
	
	@RequestMapping("/alarmQuery")
	@ResponseBody
	public Map<String, Object> alarmQuery() {
    	String sql = "SELECT * from  alarm_info where Date(ALARM_TIME)<=20180505 AND city = '广州' and ALARM_NAME='AGPS智能路测弱覆盖区域'";
		Map<String, Object> resultMap = alarmDataTest.getSqlData(sql);
//		System.out.println("sql:"+sql);
//		Map<String, Object> resultMap = new HashMap<String, Object>();
		return resultMap;
	}
}
