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
<div class="pageContent">
    <div class="row">
        <div class="col-sm-12">
            <div class="row">
                <input id="id" value="${id}" hidden>
                <div class="form-group col-sm-4">
                    <label for="noticeName" class="col-sm-4 control-label">公告名称:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="noticeName" placeholder="请输入公告名称"
                               value="${noticeName}">
                    </div>
                </div>
                <div class="form-group col-sm-4">
                    <label for="noticeType" class="col-sm-4 control-label">公告类型:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="noticeType" placeholder="请输入公告类型"
                               value="${noticeType}">
                    </div>
                </div>
            </div>

            <textarea class="form-control" cols="80" id="content" name="content" rows="10">${content}</textarea>
        </div>
    </div>
    <div class="row">
        <div class="buttonGroup col-sm-12">
            <button id="save" class="btn btn-default" onclick="EditNoticeManage.save()"><i class="fa fa-check"></i>确认</button>
        </div>
    </div>
</div>
<script src="../../js/jquery-2.1.1.min.js"></script>
<script src="../../js/bootstrap.min.js"></script>
<script src="../../js/bootstrap-table.min.js"></script>
<script src="../../js/bootstrapValidator.min.js"></script>
<script src="../../js/bootstrap-table-mobile.min.js"></script>
<script src="../../js/bootstrap-table-zh-CN.js"></script>
<script src="../../js/bootstrap-treetable.js"></script>
<script src="../../js/ajax-object.js"></script>
<script src="../../js/bootstrap-table-object.js"></script>
<script src="../../js/Feng.js"></script>
<script src="../../js/layer.js"></script>
<script src="../../js/noticeManage/editNoticeManage.js"></script>
<script src="../../js/ckeditor/ckeditor/ckeditor.js"></script>
<script type="text/javascript">
    window.onload = function () {
        CKEDITOR.replace('content');
    };
</script>
</body>
</html>
