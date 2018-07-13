package com.spring.common.util;

import java.io.FileNotFoundException;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ResourceUtils;

public class WebUtil {
	@Autowired
	static HttpServletRequest request; 
	
	@Autowired
	static HttpServletResponse response;
	
	public static String getWebRoot() {
		try {
			return ResourceUtils.getURL("classpath:").getPath();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return System.getProperty("webapp.root");

	}

	public static HttpServletRequest getRequest() {
		return request;
	}
	
	public static HttpServletResponse getResponse() {
		return response;
	}
	
	public static void write(Object object) throws IOException {
		getResponse().setContentType("text/html");
		getResponse().setCharacterEncoding("utf-8");
		StringBuffer script = new StringBuffer(); 
		script.append(object);
		getResponse().getWriter().write(script.toString());
	}
	
	public static String getParameter(String name) {
		return getRequest().getParameter(name);
	}
}
