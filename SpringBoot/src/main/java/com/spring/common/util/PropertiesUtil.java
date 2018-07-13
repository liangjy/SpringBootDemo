package com.spring.common.util;

import java.io.FileInputStream;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.springframework.util.ResourceUtils;

public class PropertiesUtil {
	private static final Logger LOG = Logger.getLogger(PropertiesUtil.class);
	
	public static Properties getPropertiesByFileName(String fileName) throws Exception { 
		String classPath = ResourceUtils.getURL("classpath:").getPath();
		Properties properties = getPropertiesByFilePath(classPath + fileName);
		return properties;
	}

	/**
	 * 获取properties文件内容
	 * 
	 * @param filePath
	 * @return
	 * @throws Exception
	 */
	public static Properties getPropertiesByFilePath(String filePath) throws Exception {

		Properties props = new Properties();
		FileInputStream istream = null;
		try {
			istream = new FileInputStream(filePath);
			props.load(istream);
			istream.close();
		} catch (Exception e) {
			LOG.error(e);
			throw e;
		} finally {
			if (istream != null) {
				istream.close();
			}
		}
		return props;
	}
}
