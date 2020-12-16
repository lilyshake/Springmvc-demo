<%@ page pageEncoding="utf-8" %>
<%@ page language="java" import="com.admin.utils.*" %>
<!DOCTYPE html>
<html>
<head>
    <title>Admin</title>
    <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css"/>
    <link rel="stylesheet" href="css/bootstrap-theme.min.css" type="text/css"/>
    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <link href="css/login.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="js/login.js"></script>
</head>
<body>
<div class="login panel panel-default">
    <div class="login_internal">
        <form id="login_form">
            <h2 class="text-center">登录</h2>
            <div class="form-group">
                <label for="inputUsername">用户名</label>
                <input type="text" class="form-control" id="inputUsername" name="username" placeholder="用户名" required
                       autofocus>
            </div>
            <div class="form-group">
                <label for="inputPassword">密码</label>
                <input type="password" class="form-control" id="inputPassword" name="password" placeholder="密码"
                       required>
            </div>
            <div class="col-sm-offset-1 col-sm-4">
                <button type="button" class="btn btn-primary btn-block" onclick="login();">登录
                </button>
            </div>
            <div class="col-sm-offset-2 col-sm-4">
                <button type="reset" class="btn btn-default btn-block">取消
                </button>
            </div>
        </form>
        <div id="loginErr_label" class="loginErr_label"></div>
        <div id="loginSuccess_label" class="loginSuccess_label"></div>
    </div>
</div>
<script src="../js/login.js"></script>
</body>
</html>