function login() {
    var username = $("#inputUsername").val();
    var password = $("#inputPassword").val();

    if (username == '' || username == null
        || password == '' || password == null) {
        $("#loginErr_label").text("请输入完整的用户名和密码！").show().siblings("#loginSuccess_label").hide()
    } else {
        $.ajax({
            url: "login/userLogin",
            type: "post",
            data: {
                "username": username,
                "password": password
            },
            success: function (response) {
                if (response.message == "success") {
                    $("#loginSuccess_label").text("登录成功，正在跳转...").show().siblings("#loginErr_label").hide();
                    window.location.href = "login/userPageSelect?username=" + response.object.username + "&level=" + response.object.level;
                } else {
                    $("#loginErr_label").text("用户名或密码错误！").show().siblings("#loginSuccess_label").hide();
                    return;
                }
            }
        });
    }
}

document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) { // 按 Esc
        login();
    }
}