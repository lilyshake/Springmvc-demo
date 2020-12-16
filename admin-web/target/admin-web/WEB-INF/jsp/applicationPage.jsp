<%@ page pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Admin</title>
    <link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="../vendor/layui/css/layui.css" rel="stylesheet" type="text/css"/>
    <link href="../css/mainPage.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<div class="page">
    <header class="header">
        <nav class="navbar">
            <div class="container-fluid">
                <a href="#" class="navbar-logo">
                    Admin
                </a>
                <div class="sidebar-header">
                    <div class="avatar">
                        <img src="../images/gerenxinxi.png" alt="默认头像" class="img-fluid rounded-circle">
                    </div>
                    <div class="title">
                        <h1 class="h4">${username}</h1>
                    </div>
                </div>
                  <a onclick="logout()" class="navbar-logout">
                      <span>退出登录</span>
                      <i class="glyphicon glyphicon-log-out"></i>
                  </a>
            </div>
        </nav>
    </header>

    <div class="page-content">
        <%
            String username = (String) session.getAttribute("username");
            Integer level = (Integer) session.getAttribute("level");
        %>
        <nav class="side-navbar">
            <ul id="leftMenu" class="list-unstyled">
                <li><a href="#systemSetting" aria-expanded="true" data-toggle="collapse"> <i
                        class="glyphicon glyphicon-compressed"></i> <span>系统管理</span></a>
                    <ul id="systemSetting" class="list-unstyled  collapse in">
                        <%
                            if (level == 1 || level == 2) {
                        %>
                        <li><a class="J_menuItem"
                               data-href="${pageContext.request.contextPath }/addPerson"
                               name="tabMenuItem"><i
                                class="glyphicon glyphicon-plus"></i> <span>管理人员添加</span></a></li>
                        <li><a class="J_menuItem" data-href="${pageContext.request.contextPath }/person/managePerson"
                               name="tabMenuItem">
                            <i class="glyphicon glyphicon-user"></i> <span>管理人员管理</span></a>
                        </li>
                        <%
                            }
                        %>
                        <li><a class="J_menuItem" data-href="${pageContext.request.contextPath }/changePassword"
                               name="tabMenuItem"><i
                                class="glyphicon glyphicon-certificate"></i> <span>密码修改</span></a></li>
                        <%
                            if (level == 1 || level == 2) {
                        %>
                        <li><a class="J_menuItem" data-href="${pageContext.request.contextPath }/log/showAllLog"
                               name="tabMenuItem"><i
                                class="glyphicon glyphicon-list-alt"></i> <span>系统操作日志</span></a></li>
                        <%
                            }
                        %>
                    </ul>
                </li>
                <li><a class="J_menuItem"
                       data-href="${pageContext.request.contextPath }/noticeManage/noticeManagePage"
                       name="tabMenuItem">
                    <i class="glyphicon glyphicon-bullhorn"></i><span>通知公告</span>
                </a></li>
            </ul>
        </nav>
        <div class="content-inner">
            <header class="page-header">
                <div class="content-tabs">
                    <nav class="page-tabs J_menuTabs">
                        <div id="navMenuBlock" class="page-tabs-content">
                            <a href="javascript:;" class="active J_menuTab"
                               data-id="${pageContext.request.contextPath }/home">首页</a>
                        </div>
                    </nav>
                </div>
            </header>
            <div id="content-main" class="page-iframe J_mainContent">
                <iframe class="J_iframe jsp_frame" name="iframe0" width="100%" height="100%"
                        src="${pageContext.request.contextPath }/home" frameborder="0"
                        data-id="${pageContext.request.contextPath }/home" seamless></iframe>
            </div>
        </div>
    </div>
</div>
<script src="../js/jquery-2.1.1.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../vendor/layui/layui.js"></script>
<script>
    $(function () {
        $J_menuItem = $(".J_menuItem");
        $J_menuTabs = $('.J_menuTabs');

        //通过遍历给菜单项加上data-index属性
        $J_menuItem.each(function (index) {
            if (!$(this).attr('data-index')) {
                $(this).attr('data-index', index);
            }
        });

        function menuItem() {
            clearTabMenuItem();
            $(this).parent('li').addClass("active");
            // 获取标识数据
            var dataUrl = $(this).data('href'),
                dataIndex = $(this).data('index'),
                menuName = $.trim($(this).text()),
                flag = true;
            if (dataUrl == undefined || $.trim(dataUrl).length == 0) return false;

            // 选项卡菜单已存在
            $('.J_menuTab').each(function () {
                if ($(this).data('id') == dataUrl) {
                    if (!$(this).hasClass('active')) {
                        $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
                        // scrollToTab(this);
                        // 显示tab对应的内容区
                        $('.J_mainContent .J_iframe').each(function () {
                            if ($(this).data('id') == dataUrl) {
                                $(this).show().siblings('.J_iframe').hide();
                                $(this).attr('src', $(this).attr('src'));
                                return false;
                            }
                        });
                    }
                    flag = false;
                    return false;
                }
            });

            // 选项卡菜单不存在
            if (flag) {
                var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '"><span class="navMenuTitle">' + menuName + ' </span><i class="fa fa-close"></i></a>';
                $('.J_menuTab').removeClass('active');

                // 添加选项卡对应的iframe
                var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
                $('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);

                // 添加选项卡
                $('.J_menuTabs .page-tabs-content').append(str);
            }
            return false;
        }

        $J_menuItem.on('click', menuItem);

        // 关闭选项卡菜单
        function closeTab() {
            var closeTabId = $(this).parents('.J_menuTab').data('id');

            // 当前元素处于活动状态
            if ($(this).parents('.J_menuTab').hasClass('active')) {

                // 当前元素后面有同辈元素，使后面的一个元素处于活动状态
                if ($(this).parents('.J_menuTab').next('.J_menuTab').size()) {

                    var activeId = $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').data('id');
                    highLightMenuItem(activeId);  //高亮对应的tab菜单
                    $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').addClass('active');

                    $('.J_mainContent .J_iframe').each(function () {
                        if ($(this).data('id') == activeId) {
                            $(this).show().siblings('.J_iframe').hide();
                            return false;
                        }
                    });

                    //  移除当前选项卡
                    $(this).parents('.J_menuTab').remove();

                    // 移除tab对应的内容区
                    $('.J_mainContent .J_iframe').each(function () {
                        if ($(this).data('id') == closeTabId) {
                            $(this).remove();
                            return false;
                        }
                    });
                }

                // 当前元素后面没有同辈元素，使当前元素的上一个元素处于活动状态
                if ($(this).parents('.J_menuTab').prev('.J_menuTab').size()) {
                    var activeId = $(this).parents('.J_menuTab').prev('.J_menuTab:last').data('id');
                    $(this).parents('.J_menuTab').prev('.J_menuTab:last').addClass('active');
                    $('.J_mainContent .J_iframe').each(function () {
                        if ($(this).data('id') == activeId) {
                            $(this).show().siblings('.J_iframe').hide();
                            return false;
                        }
                    });

                    //  移除当前选项卡
                    $(this).parents('.J_menuTab').remove();

                    // 移除tab对应的内容区
                    $('.J_mainContent .J_iframe').each(function () {
                        if ($(this).data('id') == closeTabId) {
                            $(this).remove();
                            return false;
                        }
                    });
                    highLightMenuItem(activeId);//高亮对应的tab菜单
                }
            }
            // 当前元素不处于活动状态
            else {
                //  移除当前选项卡
                $(this).parents('.J_menuTab').remove();

                // 移除相应tab对应的内容区
                $('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });
                // scrollToTab($('.J_menuTab.active'));
            }
            return false;
        }

        $J_menuTabs.on('click', '.J_menuTab i', closeTab);

        // 点击选项卡菜单
        function activeTab() {
            if (!$(this).hasClass('active')) {
                var currentId = $(this).data('id');
                highLightMenuItem(currentId);  //高亮对应的tab菜单
                // 显示tab对应的内容区
                $('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('id') == currentId) {
                        $(this).show().siblings('.J_iframe').hide();
                        return false;
                    }
                });
                $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
            }
        }

        $J_menuTabs.on('click', '.J_menuTab', activeTab);

        function clearTabMenuItem() {
            $("a[name='tabMenuItem']").each(function () {
                $(this).parent('li').removeClass("active");
            });
        }

        function highLightMenuItem(hrefVal) {
            clearTabMenuItem();
            $("a[data-href='" + hrefVal + "']").parent('li').addClass("active");
        }
    });

    function logout(){
        window.location.href = "logout";
    }
</script>
</body>
</html>