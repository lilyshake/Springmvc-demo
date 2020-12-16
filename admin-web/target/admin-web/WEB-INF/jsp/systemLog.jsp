<%@page import="java.util.ArrayList" %>
<%@page import="com.admin.bean.Userinfo" %>
<%@ page pageEncoding="utf-8" %>
<%@ page language="java" isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <link href="../vendor/layui/css/layui.css" rel="stylesheet" type="text/css">
    <link href="../css/systemLog.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class="pageContent">
    <div class="div_table">
        <table class="layui-hide" id="usertable"></table>
    </div>
</div>
<script src="../js/jquery-2.1.1.min.js"></script>
<script src="../vendor/layui/layui.js"></script>
<script src="../js/systemLog.js"></script>
</body>
</html>