package com.spring.common.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.ResourceUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class WebUtil {
	
	public static String getWebRoot() {
		try {
			File file = new File("");
			System.out.println("file getAbsolutePath-----------"+file.getAbsolutePath());
			System.out.println("file getPath-----------"+file.getPath());
			return ResourceUtils.getURL("classpath:").getPath();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return System.getProperty("user.dir");

	}

	public static HttpServletRequest getRequest() {
		ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = requestAttributes.getRequest();
		return request;
	}
	
	public static HttpServletResponse getResponse() {
		ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		HttpServletResponse response = requestAttributes.getResponse();
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
