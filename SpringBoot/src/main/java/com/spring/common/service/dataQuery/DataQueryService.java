package com.spring.common.service.dataQuery;

import java.util.Map;

import com.spring.common.vo.TableToolsPara;

public interface DataQueryService {
	public Map<String,Object> queryForData(int database,String cmd,TableToolsPara tableToolsPara,int toolsType) throws Exception;
	public Map<String,Object> queryForData(int database,String cmd) throws Exception;
	public String getSqlBySqlparaList(String cmd) throws Exception;
	public String getSqlByToolsPara(String sql,int database,TableToolsPara tableToolsPara,int toolsType);
}
