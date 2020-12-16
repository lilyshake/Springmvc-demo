<%@ page pageEncoding="utf-8" %>
<%@ page language="java" import="com.admin.utils.*" %>
<!DOCTYPE html>
<html>
<head>
    <title>Admin</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css" type="text/css"/>
    <link rel="stylesheet" href="../css/bootstrap-theme.min.css" type="text/css"/>
    <link href="../css/changePwd.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<div class="login panel panel-default">
    <div class="login_internal">
        <form id="login_form">
            <h2 class="text-center">密码修改</h2>
            <div class="form-group">
                <label for="inputNewPwd">请输入新密码</label>
                <input type="password" class="form-control" id="inputNewPwd" name="username" placeholder="请输入新密码"
                       required autofocus>
            </div>
            <div class="form-group">
                <label for="inputPwd">请确认新密码</label>
                <input type="password" class="form-control" id="inputPwd" name="password" placeholder="请确认新密码" required>
            </div>
            <div class="col-sm-offset-1 col-sm-4">
                <button type="button" class="btn btn-primary text-center" onclick="changePwd();">确认修改</button>
            </div>
            <div class="col-sm-offset-2 col-sm-4">
                <button type="reset" class="btn btn-default">取消修改</button>
            </div>
        </form>
        <label id="pwd_return_message" class="login_label"></label>
    </div>
</div>
<script type="text/javascript" src="../js/jquery-2.1.1.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script type="text/javascript" src="../js/login.js"></script>
<script type="text/javascript">
    function changePwd() {
        var username = $("#inputNewPwd").val();
        var password = $("#inputPwd").val();

        if (username == '' || username == null
            || password == '' || password == null) {
            $("#pwd_return_message").text("请输入密码和确认密码！");
        } else if (username != password) {
            $("#pwd_return_message").text("两次输入的密码不一致！");
        } else {
            $.ajax({
                url: "person/changePassword",
                type: "post",
                data: {
                    "username": username,
                    "password": password
                },
                success: function (response) {
                    if (response.message == "success") {
                        $("#pwd_return_message").text("修改密码成功！");
                    } else if (response.message == "passwd_same") {
                        $("#pwd_return_message").text("新密码不能和旧密码相同!");
                    } else if (response.message == "fail") {
                        $("#pwd_return_message").text("修改密码失败，请咨询管理员!");
                        return;
                    }
                }
            });
        }
    }
</script>
</body>
</html>