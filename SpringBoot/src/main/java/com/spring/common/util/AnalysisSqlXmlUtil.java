package com.spring.common.util;

import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

public class AnalysisSqlXmlUtil {
	private static AnalysisSqlXmlUtil instance = new AnalysisSqlXmlUtil();
	private static Map<String,String> sqlMap;
	
	private AnalysisSqlXmlUtil(){
		String FilePath = WebUtil.getWebRoot() + File.separatorChar+"sqlTempLate";
        sqlMap = new HashMap<String,String>();
        traverseFolder2(FilePath);
	}
	
	public void traverseFolder2(String path) {
        File file = new File(path);
        if (file.exists()) {
            File[] files = file.listFiles();
            if (files.length == 0) {
                System.out.println("文件夹是空的!");
                return;
            } else {
                for (File file2 : files) {
                    if (file2.isDirectory()) {
//                        System.out.println("文件夹:" + file2.getAbsolutePath());
                        traverseFolder2(file2.getAbsolutePath());
                    } else {
                        System.out.println("文件:" + file2.getAbsolutePath());
                        SAXReader saxReader = new SAXReader(); 
                        try {
                			Document document = saxReader.read(file2);//读取XML文件,获得document对象
                			Element root = document.getRootElement();
                			for (Iterator ie = root.elementIterator(); ie.hasNext();) {
                		           Element element = (Element) ie.next();
                		           String id = element.attribute("id").getText();
                		           String sql = element.getText();
                		           sqlMap.put(id, sql);
                		    }
                		} catch (DocumentException e) {
                			e.printStackTrace();
                		} 
                    }
                }
            }
        } else {
            System.out.println("文件路径不存在!");
        }
    }
	
	
	public static AnalysisSqlXmlUtil getInstance(){
		return instance;
	}
	
	public String AnalysisSqlXmlByID(String id) {
		String sql = sqlMap.get(id);
		if(sql == null){
			throw new NullPointerException("sql is null , sql_id = "+id);
		}
		return sql; 
	}
	
}
