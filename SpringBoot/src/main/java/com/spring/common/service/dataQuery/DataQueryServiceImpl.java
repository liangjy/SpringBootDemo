package com.spring.common.service.dataQuery;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import com.spring.common.util.AnalysisSqlXmlUtil;
import com.spring.common.util.PropertiesUtil;
import com.spring.common.util.WebUtil;
import com.spring.common.util.hbaseQuery.HbaseQuery;
import com.spring.common.util.hbaseQuery.JavaHBaseTool;
import com.spring.common.vo.TableToolsPara;

@Repository("dataQueryService")
public class DataQueryServiceImpl implements DataQueryService{

	@Resource(name = "NOCEJdbcTemplate")
   	public JdbcTemplate jdbcTemplate;//mysql数据源jdbc模板
//    @Resource(name = "MYSQL_BROADBAND")
//   	public JdbcTemplate MYSQL_BROADBAND;//天翼手机展用到的mysql数据源jdbc模板
    @Resource(name = "alarmJdbcTemplate")
    public JdbcTemplate alarmJdbcTemplate;//告警库mysql数据源jdbc模板
    
    @Resource(name = "postgreSQLJdbcTemplate")
   	public JdbcTemplate postgreSQLJdbcTemplate;//postgreSQL数据源jdbc模板
//    
//    @Resource(name = "GDSSqlServerJdbcTemplate")
//   	public JdbcTemplate GDSSqlServerJdbcTemplate;//gds的sql server数据源jdbc模板
	
	
	public Map<String, Object> queryForData(int database, String cmd,
			TableToolsPara tableToolsPara, int toolsType) throws Exception {
		String sql="";
    	if(database!=8){
	    	sql = getSqlBySqlparaList(cmd); //获取sql
	    	if(toolsType==1){//目前只支持toolType==1,表格组件,需要对sql进行limit、order by 等特殊处理
	    		sql = getSqlByToolsPara(sql,database,tableToolsPara,toolsType); 
	    	}
    	}
		String dbName = WebUtil.getParameter("dbName");
    	Map<String, Object> resultMap = queryForDataPublic(database, cmd,sql,dbName);
//    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	return resultMap;
	}

	public Map<String, Object> queryForData(int database, String cmd)
			throws Exception {
		String sql="";
    	if(database!=8){
	    	sql = getSqlBySqlparaList(cmd); //获取sql
    	}
    	Map<String, Object> resultMap = queryForDataPublic(database, cmd,sql,null);
//    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	return resultMap;
	}

	public String getSqlBySqlparaList(String cmd) throws Exception {
		AnalysisSqlXmlUtil instance = AnalysisSqlXmlUtil.getInstance();
    	JSONArray jsonArray = JSONArray.fromObject(cmd);
    	if(jsonArray.size()<1){
    		throw new Exception("Error of SQLTemplate2Instance: 请输入sqlTemplateID参数!");
    	}
    	String sqlTemplateId = jsonArray.getString(0);
    	String sql = instance.AnalysisSqlXmlByID(sqlTemplateId);
    	if(sql.isEmpty()){
			throw new Exception("Error of SQLTemplate2Instance: 找不到sqlTemplateID="+sqlTemplateId+"的模板!");
		}
    	System.out.println("sqlTemplateId="+sqlTemplateId);
    	
    	for(int i=1;i<jsonArray.size();i++){
    		String[] paraStrArray = jsonArray.getString(i).split(":", 2);
    		if(paraStrArray.length!=2){
    			throw new Exception("Error of SQLTemplate2Instance: 传入的参数不正确"+jsonArray.getString(i));
    		}
    		String key = paraStrArray[0];
    		String value = paraStrArray[1];
    		String str = "#{"+key+"}";
			sql = sql.replace(str, value);
    	}
        return sql;
	}

	public String getSqlByToolsPara(String sql, int database,
			TableToolsPara tableToolsPara, int toolsType) {
		String sqlNewStr = "";
    	if(toolsType==1){
    		if(database!=4){
    			if(tableToolsPara.getSortColumn()!=null&&tableToolsPara.getSortColumn().trim().length()>0){
        			sqlNewStr = " order by "+tableToolsPara.getSortColumn() +" ";
            		String SortType = tableToolsPara.getSortType()==null?"":tableToolsPara.getSortType();
            		sqlNewStr +=SortType;
        		}
    		}
    		
    		
    		if(database==2){
    			if(tableToolsPara.getSceneId()==1&&tableToolsPara.getPageFlag()==0){//场景1并且不分页
    				return sql+sqlNewStr;
    			}else{
    				sqlNewStr = sqlNewStr+" limit "+tableToolsPara.getPageSize()+" offset "+tableToolsPara.getPageIndex();
    			}
    		}else if(database==4){
    			if(tableToolsPara.getSceneId()==1&&tableToolsPara.getPageFlag()==0){//场景1并且不分页
    				return sql+sqlNewStr+"\n"+"rowkey "+1;
    			}else{
    				sqlNewStr =sqlNewStr+"limit " + tableToolsPara.getPageSize()+"\n"+"offset "+tableToolsPara.getPageIndex()+"\n"+"rowkey "+1;
    				return sql.trim()+"\n"+sqlNewStr;//sqlNewStr = tableToolsPara.getPageSize()+","+tableToolsPara.getPageIndex();
    			}
    		}else{
    			if(tableToolsPara.getSceneId()==1&&tableToolsPara.getPageFlag()==0){//场景1并且不分页
    				return sql+sqlNewStr;
    			}else{
    				sqlNewStr = sqlNewStr+" limit "+tableToolsPara.getPageIndex()+","+tableToolsPara.getPageSize();
    			}
    		}
    	}
    	return sql+sqlNewStr;
	}
	
	public Map<String,Object> queryForDataPublic(int database,String cmd,String sql,String dbName) throws Exception{
		Map<String, Object> resultMap = null;
    	Date queryStartDate = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	if(database==3){
    		//mysql的查询
//    		List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);//数据查询结果
//    		Date queryEndDate = new Date();
    		final List<String> cloumnLabel= new ArrayList<String>();//cloumns
    		final List<String> cloumnType= new ArrayList<String>();//types
    		final List<List<Object>> resultList = new ArrayList<List<Object>>();//结果返回
			
			Date jdbcStartQueryDate = new Date();
			JdbcTemplate jdbc=jdbcTemplate;
//			String parameter = WebUtil.getParameter("dbName");
//			if(parameter!=null&&parameter.trim().equals("MYSQL_BROADBAND")){
//				System.out.println("进来："+parameter);
//				jdbc=MYSQL_BROADBAND;
//			}else
			if(dbName!=null&&dbName.trim().equals("Alarms")){
				System.out.println("进来："+dbName);
				jdbc=alarmJdbcTemplate;
			}
			jdbc.query(sql, new RowCallbackHandler() {
				
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
			
			resultMap = new HashMap<String, Object>();
			resultMap.put("result",resultList);
			resultMap.put("columns", cloumnLabel);
			resultMap.put("types", cloumnType);
            System.out.println(cmd);
            System.out.println("sql="+sql);
            System.out.println("dataBase:"+database);
            System.out.println("查询开始时间："+sdf.format(jdbcStartQueryDate));
            System.out.println("查询结束时间："+sdf.format(jdbcEndQueryDate));
			System.out.println("结果集长度："+resultList.size());
//			System.out.println("获取dataSource时间："+(jdbcStartQueryDate.getTime()-getDataSource.getTime()));
//			System.out.println("resultSet处理时间："+(jdbcEndQueryDate.getTime()-handleResultSet.getTime()));
			System.out.println("Jdbc查询处理总时间:"+(jdbcEndQueryDate.getTime()-jdbcStartQueryDate.getTime())+"毫秒");
    	}else if(database==4){
    		Properties hbaseProperties = PropertiesUtil.getPropertiesByFileName("Hbase.properties");
    		String isUserThrift = hbaseProperties.getProperty("isUseThrift");
    		String isUserJavaAPI = hbaseProperties.getProperty("isUseJavaAPI");
    		String isNoKerberos = hbaseProperties.getProperty("isNoKerberos");
    		if("true".equals(isUserThrift)){
    			resultMap = HbaseQuery.getQueryResult(sql);
    			Date queryEndDate = new Date();
                System.out.println(cmd);
                System.out.println("sql="+sql);
                System.out.println("dataBase:"+database);
                System.out.println("查询开始时间："+sdf.format(queryStartDate));
                System.out.println("查询结束时间："+sdf.format(queryEndDate));
    			System.out.println("hbase thrift查询结果集长度："+((List)resultMap.get("result")).size());
        		System.out.println("hbase thrift查询时间："+(queryEndDate.getTime()-queryStartDate.getTime()));
        		
    		}else if("true".equals(isUserJavaAPI)){
    		    if("true".equals(isNoKerberos)){
    		    	resultMap = new JavaHBaseTool().queryHbaseNoKerberos(sql);
                    Date queryEndDate = new Date();
                    System.out.println(cmd);
                    System.out.println("sql="+sql);
                    System.out.println("dataBase:"+database);
                    System.out.println("查询开始时间："+sdf.format(queryStartDate));
                    System.out.println("查询结束时间："+sdf.format(queryEndDate));
                    System.out.println("hbase api查询结果集长度："+((List)resultMap.get("result")).size());
                    System.out.println("hbase api查询时间："+(queryEndDate.getTime()-queryStartDate.getTime()));
                }else{
                	resultMap = new JavaHBaseTool().queryHbase(sql);
//    			Map<String,Object> hbaseResultMap = new JavaHBaseTool().queryHbaseNoKerberos(sql);
                    Date queryEndDate = new Date();
                    System.out.println(cmd);
                    System.out.println("sql="+sql);
                    System.out.println("dataBase:"+database);
                    System.out.println("查询开始时间："+sdf.format(queryStartDate));
                    System.out.println("查询结束时间："+sdf.format(queryEndDate));
                    System.out.println("hbase kerberos查询结果集长度："+((List)resultMap.get("result")).size());
                    System.out.println("hbase kerberos查询时间："+(queryEndDate.getTime()-queryStartDate.getTime()));
                }

    		}
//    		Map<String,Object> queryMap = HbaseQuery.getHbaseParaBySqlstr(sql);
    		
    	}
    	else if(database==6){
    		//PostgreSQL的查询
    		final List<String> cloumnLabel= new ArrayList<String>();//cloumns
    		final List<String> cloumnType= new ArrayList<String>();//types
    		final List<List<Object>> resultList = new ArrayList<List<Object>>();//结果返回
			
			Date jdbcStartQueryDate = new Date();
//			System.out.println("PostgreSQL查询开始："+ jdbcStartQueryDate);
			
			postgreSQLJdbcTemplate.query(sql, new RowCallbackHandler() {
				
				@Override
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
//			System.out.println("PostgreSQL查询结束："+ jdbcEndQueryDate);
			//获取对象的类型，为什么不在查询的时候做，是因为res.isFirst()不行，暂时不知道是为什么
			if(resultList.size()>0){
				List<Object> list = resultList.get(0);
				for(int i=0;i<list.size();i++){
					cloumnType.add(getObjectType(list.get(i)));
				}
			}
			
			resultMap = new HashMap<String, Object>();
			resultMap.put("result",resultList);
			resultMap.put("columns", cloumnLabel);
			resultMap.put("types", cloumnType);
            System.out.println(cmd);
            System.out.println("sql="+sql);
            System.out.println("dataBase:"+database);
            System.out.println("查询开始时间："+sdf.format(jdbcStartQueryDate));
            System.out.println("查询结束时间："+sdf.format(jdbcEndQueryDate));
			System.out.println("PostgreSQL结果集长度："+resultList.size());
			System.out.println("PostgreSQL Jdbc查询处理总时间:"+(jdbcEndQueryDate.getTime()-jdbcStartQueryDate.getTime())+"毫秒");
    	}else if(database==7){
    		Properties hbaseProperties = PropertiesUtil.getPropertiesByFileName("Hbase.properties");
    		String isUserThrift = hbaseProperties.getProperty("isUseThrift");
    		String isUserJavaAPI = hbaseProperties.getProperty("isUseJavaAPI");
            String isNoKerberos = hbaseProperties.getProperty("isNoKerberos");
            if("true".equals(isUserJavaAPI)){
                if("true".equals(isNoKerberos)){
                	resultMap = new JavaHBaseTool().queryHbaseNoKerberos(sql);
                    Date queryEndDate = new Date();
                    System.out.println(cmd);
                    System.out.println("sql="+sql);
                    System.out.println("dataBase:"+database);
                    System.out.println("查询开始时间："+sdf.format(queryStartDate));
                    System.out.println("查询结束时间："+sdf.format(queryEndDate));
                    System.out.println("hbase api查询结果集长度："+((List)resultMap.get("result")).size());
                    System.out.println("hbase api查询时间："+(queryEndDate.getTime()-queryStartDate.getTime()));
                    
                }else{
                	resultMap = new JavaHBaseTool().queryHbase(sql);
//    			Map<String,Object> hbaseResultMap = new JavaHBaseTool().queryHbaseNoKerberos(sql);
                    Date queryEndDate = new Date();
                    System.out.println(cmd);
                    System.out.println("sql="+sql);
                    System.out.println("dataBase:"+database);
                    System.out.println("查询开始时间："+sdf.format(queryStartDate));
                    System.out.println("查询结束时间："+sdf.format(queryEndDate));
                    System.out.println("hbase kerberos查询结果集长度："+((List)resultMap.get("result")).size());
                    System.out.println("hbase kerberos查询时间："+(queryEndDate.getTime()-queryStartDate.getTime()));
                    
                }

            }else if("true".equals(isUserThrift)){
            	resultMap = new JavaHBaseTool().queryHbaseNoKerberos(sql);
                Date queryEndDate = new Date();
                System.out.println(cmd);
                System.out.println("sql="+sql);
                System.out.println("dataBase:"+database);
                System.out.println("查询开始时间："+sdf.format(queryStartDate));
                System.out.println("查询结束时间："+sdf.format(queryEndDate));
                System.out.println("hbase api查询结果集长度："+((List)resultMap.get("result")).size());
                System.out.println("hbase api查询时间："+(queryEndDate.getTime()-queryStartDate.getTime()));

            }
    	}
		return resultMap;
	}

	private String getObjectType(Object obj) {
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
