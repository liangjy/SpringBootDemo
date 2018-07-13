package com.spring.common.vo;

import java.io.Serializable;

public class TableToolsPara implements Serializable{
	/**
	 * 扩展后的table公共组件参数
	 */
	private static final long serialVersionUID = 1L;
	private String sql;
	private String sortColumn;
	private int pageSize;
	private int pageIndex;
	private String thead;
	private String sortType;
	private String dataType;
	//private int sortFlag;
	private int pageFlag;
	private int sceneId;
	
	
	public int getSceneId() {
		return sceneId;
	}
	public void setSceneId(int sceneId) {
		this.sceneId = sceneId;
	}
	/*public int getSortFlag() {
		return sortFlag;
	}
	public void setSortFlag(int sortFlag) {
		this.sortFlag = sortFlag;
	}*/
	public int getPageFlag() {
		return pageFlag;
	}
	public void setPageFlag(int pageFlag) {
		this.pageFlag = pageFlag;
	}
	public String getSql() {
		return sql;
	}
	public void setSql(String sql) {
		this.sql = sql;
	}
	public String getSortColumn() {
		return sortColumn;
	}
	public void setSortColumn(String sortColumn) {
		this.sortColumn = sortColumn;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}
	public String getThead() {
		return thead;
	}
	public void setThead(String thead) {
		this.thead = thead;
	}
	public String getSortType() {
		return sortType;
	}
	public void setSortType(String sortType) {
		this.sortType = sortType;
	}
	public String getDataType() {
		return dataType;
	}
	public void setDataType(String dataType) {
		this.dataType = dataType;
	}
	
	
	
}
