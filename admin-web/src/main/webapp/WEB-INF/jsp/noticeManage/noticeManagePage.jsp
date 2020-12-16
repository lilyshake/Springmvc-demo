<%@page import="java.util.ArrayList" %>
<%@ page pageEncoding="utf-8" %>
<%@ page language="java" isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <title>Admin</title>
    <link href="../../css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="../../css/bootstrap-table.min.css" rel="stylesheet" type="text/css">
    <link href="../../css/bootstrapValidator.min.css" rel="stylesheet" type="text/css">
    <link href="../../css/bootstrap-treetable.css" rel="stylesheet" type="text/css">
    <link href="../../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="../../css/style.css" rel="stylesheet" type="text/css">
</head>
<body>
<%
    Integer level = (Integer) session.getAttribute("level");
%>
<div class="pageContent">
    <div class="row">
        <div class="col-sm-12">
            <div class="input-group notice-formBox">
                <span class="input-group-addon form-group-span">公告名称:</span>
                <input type="text" class="form-control" id="noticeName" placeholder="请输入公告名称">
            </div>

            <div class="input-group notice-formBox">
                <span class="input-group-addon form-group-span">发布人:</span>
                <input type="text" class="form-control" id="createUser" placeholder="请输入发布人"
                    <%
                            if (level == 3) {
                        %>
                        disabled
                    <%
                            }
                        %>
                >
            </div>

            <div class="input-group notice-formBox">
                <span class="input-group-addon form-group-span">发布时间 从:</span>
                <input type="text" class="form-control" id="beginTime" placeholder="请选择开始时间">
            </div>

            <div class="input-group notice-formBox">
                <span class="input-group-addon form-group-span">至:</span>
                <input type="text" class="form-control" id="endTime" placeholder="请选择结束时间">
            </div>

            <div class="form-group notice-btnBox">
                <button type="submit" id="search" class="btn btn-default" onclick="NoticeManagePage.search()"><i
                        class="fa fa-search"></i>搜索
                </button>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <div class="hidden-xs" id="noticeManageTableToolbar" role="group">
                <button type="button" class="btn btn-add" onclick="add()" id="add">
                    <i class="fa fa-plus"></i>&nbsp;添加
                </button>
                <button type="button" class="btn btn-add" onclick="edit()" id="edit">
                    <i class="fa fa-edit"></i>&nbsp;修改
                </button>
                <button type="button" class="btn btn-add" onclick="del()" id="del">
                    <i class="fa fa-remove"></i>&nbsp;删除
                </button>
            </div>
            <table id="noticeManageTable" data-mobile-responsive="true" data-click-to-select="true"/>
        </div>
    </div>
</div>
<script src="../../js/jquery-2.1.1.min.js"></script>
<script src="../../js/bootstrap.min.js"></script>
<script src="../../js/bootstrap-table.min.js"></script>
<script src="../../js/bootstrapValidator.min.js"></script>
<script src="../../js/bootstrap-table-mobile.min.js"></script>
<script src="../../js/bootstrap-table-zh-CN.js"></script>
<script src="../../js/ajax-object.js"></script>
<script src="../../js/bootstrap-table-object.js"></script>
<script src="../../js/Feng.js"></script>
<script src="../../js/layer.js"></script>
<script src="../../js/laydate/laydate.js"></script>
<script src="../../js/noticeManage/noticeManagePage.js"></script>
<script>
    laydate.render({
        elem: '#beginTime',
        type: 'datetime'
    });
    laydate.render({
        elem: '#endTime',
        type: 'datetime'
    });
</script>
</body>
</html>
