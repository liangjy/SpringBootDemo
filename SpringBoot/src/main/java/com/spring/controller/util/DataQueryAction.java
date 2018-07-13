package com.spring.controller.util;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.common.service.dataQuery.DataQueryService;
import com.spring.common.vo.TableToolsPara;


@Controller
@RequestMapping("/DataQuery")
public class DataQueryAction {
	
	@Resource
	DataQueryService dataQueryServiceImpl;
	
	
	@RequestMapping("/submitQuery")
	@ResponseBody
	public String submitQuery(String database,String cmd,TableToolsPara tableToolsPara,String toolsType,HttpServletRequest request,HttpServletResponse response) throws Exception{
		String jsonpCallback=request.getParameter("jsonpCallback");//jsonp查询
//		Map<String,Object> resultMap = progressbarServiceImpl.queryForData(database, cmd, tableToolsPara, toolsType);
		int databaseType = 3;
		int toolsTypeNum = 0;
		if(database==null){
			databaseType = 3;
		}else{
			databaseType = Integer.parseInt(database);
		}
		
		if(toolsType==null){
			toolsTypeNum = 0;
		}else{
			toolsTypeNum = Integer.parseInt(toolsType);
		}
//		Map<String,Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> resultMap = dataQueryServiceImpl.queryForData(databaseType, cmd, tableToolsPara, toolsTypeNum);
		String data = JSONObject.fromObject(resultMap).toString();
		if(jsonpCallback!=null){
			data = jsonpCallback+"("+data+")";
		}
		return data;
	}
}
