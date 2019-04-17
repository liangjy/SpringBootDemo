<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<c:if test="${param.Analysis=='1'}">
    <jsp:include page="IntelligentRoadTestChart.jsp"></jsp:include>
</c:if>
<c:if test="${param.Analysis=='3'}">
    <jsp:include page="IntelligentRoadTestChartV5.jsp"></jsp:include>
</c:if>
<c:if test="${param.Analysis=='2'}">
    <jsp:include page="helpInfo.jsp"></jsp:include>
</c:if>
<c:if test="${param.Analysis==null}">
    <jsp:include page="IntelligentRoadTestAnalysisV5.jsp"></jsp:include>
</c:if>