package com.spring.controller.util;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.common.vo.TableToolsPara;


@Controller
@RequestMapping("/DataQuery")
public class DataQueryAction {
	
	@RequestMapping("/submitQuery")
	@ResponseBody
	public String submitQuery(Integer database,String cmd,TableToolsPara tableToolsPara,Integer toolsType,HttpServletRequest request,HttpServletResponse response) throws IOException{
		String jsonpCallback=request.getParameter("jsonpCallback");//jsonp查询
//		Map<String,Object> resultMap = progressbarServiceImpl.queryForData(database, cmd, tableToolsPara, toolsType);
		if(database==null){
			database = 3;
		}
		
		if(toolsType==null){
			toolsType = 0;
		}
		Map<String,Object> resultMap = new HashMap<String, Object>();
		resultMap.put("sql", "select * from user");
		String data = JSONObject.fromObject(resultMap).toString();
		if(jsonpCallback!=null){
			data = jsonpCallback+"("+data+")";
		}
		return data;
	}
}
