package com.spring.controller.index;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.common.dao.UserDao;
import com.spring.common.dataSource.AlarmDataQuery;
import com.spring.common.pojo.user.User;
import com.spring.common.util.AnalysisSqlXmlUtil;
import com.spring.common.util.MD5;

@Controller
@RequestMapping("/Index")
public class Index {
	
	
	@Resource
	UserDao userDao;
	
//	@Resource
//	private AlarmDataQuery alarmDataQuery;
	
	
//	@RequestMapping("/alarmQuery")
//	@ResponseBody
//	public Map<String, Object> alarmQuery() {
//    	String sql = "SELECT * from  alarm_info where Date(ALARM_TIME)<=20180505 AND city = '广州' and ALARM_NAME='AGPS智能路测弱覆盖区域'";
//		Map<String, Object> resultMap = alarmDataQuery.getSqlData(sql);
//		return resultMap;
//	}
	
	@RequestMapping("/login")
	public String login(String username,String password,HttpServletRequest request,HttpServletResponse response,Model model) throws Exception{
		System.out.println("username:"+username);
		System.out.println("password:"+password);
		String md5Password = MD5.getMD5Str(password);
		User user = userDao.validate(username, md5Password);
		boolean validate = false;
		if(user!=null){
			validate = true;
		}
		if(validate){
			return "/Index/home";
		}else{
			model.addAttribute("status", "用户校验不通过，请检查账号或者密码");
			return "/Index/login";
		}
		
	}
	
	
}
