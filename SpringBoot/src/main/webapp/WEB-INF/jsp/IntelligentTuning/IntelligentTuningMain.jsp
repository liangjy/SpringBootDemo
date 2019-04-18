<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	System.out.println(request.getAttribute("param"));
%>

<c:if test="${param.isChart==null}">
	<jsp:include page="IntelligentTuning.jsp"></jsp:include>
</c:if>
<c:if test="${param.isChart=='1'}">
	<jsp:include page="IntelligentTuningStatisticalExport.jsp"></jsp:include>
</c:if>


