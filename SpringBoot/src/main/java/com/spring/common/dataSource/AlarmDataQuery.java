package com.spring.common.dataSource;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

@Repository
@Qualifier("alarmDataQuery")
public class AlarmDataQuery {
	
	@Resource
    protected JdbcTemplate alarmJdbcTemplate;
	
	public Map<String,Object> getSqlData(String sql){
		Map<String,Object> result = new HashMap<String, Object>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		final List<String> cloumnLabel= new ArrayList<String>();//cloumns
		final List<String> cloumnType= new ArrayList<String>();//types
		final List<List<Object>> resultList = new ArrayList<List<Object>>();//结果返回
		Date jdbcStartQueryDate = new Date();
		alarmJdbcTemplate.query(sql, new RowCallbackHandler() {
			
			public void processRow(ResultSet res) throws SQLException {
				int cloumns = res.getMetaData().getColumnCount();
				List<Object> resultByJdbc = new ArrayList<Object>();
				if(cloumnLabel.size()==cloumns){
					for(int i=1;i<=cloumns;i++){
						resultByJdbc.add(res.getObject(i));
					}
				}else{
					for(int i=1;i<=cloumns;i++){
						cloumnLabel.add(res.getMetaData().getColumnLabel(i).toLowerCase());
						resultByJdbc.add(res.getObject(i));
					}
				}
				
				resultList.add(resultByJdbc);
			}
		});
		Date jdbcEndQueryDate = new Date();
		//获取对象的类型，为什么不在查询的时候做，是因为res.isFirst()不行，暂时不知道是为什么
		if(resultList.size()>0){
			List<Object> list = resultList.get(0);
			for(int i=0;i<list.size();i++){
				cloumnType.add(getObjectType(list.get(i)));
			}
		}
		
		result = new HashMap<String, Object>();
		result.put("result",resultList);
		result.put("columns", cloumnLabel);
		result.put("types", cloumnType);
		System.out.println("sql="+sql);
//        System.out.println("dataBase:"+database);
        System.out.println("查询开始时间："+sdf.format(jdbcStartQueryDate));
        System.out.println("查询结束时间："+sdf.format(jdbcEndQueryDate));
		System.out.println("结果集长度："+resultList.size());
		return result;
	}
	
	public static String getObjectType(Object obj) {
		if (obj instanceof Integer) {
			return "Integer";
		} else if (obj instanceof String) {
			return "String";
		} else if (obj instanceof Double) {
			return "Double";
		} else if (obj instanceof Float) {
			return "Float";
		} else if (obj instanceof Long) {
			return "Long";
		} else if (obj instanceof Boolean) {
			return "Boolean";
		} else if (obj instanceof Date) {
			return "Date";
		} else if (obj instanceof Byte) {
			return "Byte";
		} else if (obj instanceof Short) {
			return "Short";
		} else {
			return "Object";
		}
	}
	
}
