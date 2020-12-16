package com.admin.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
//@WebFilter("/*")
public class loginFilter implements Filter {
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        System.out.println("过滤器执行");
        //强制转换
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse)resp;

        //获取资源请求路径
        String uri = request.getRequestURI();
        System.out.println("url: "+uri);
        //判断是否包含登录相关资源路径,要注意排除掉 css/js/图片/验证码等资源
        if(uri.equals("/") ||uri.contains("/login.jsp") || uri.contains("/images") || uri.contains("/css/") || uri.contains("/js/") || uri.contains("/fonts/") || uri.contains("/index.jsp") ||uri.contains("/login/") ){
            //包含，用户就是想登录。放行
            chain.doFilter(req, resp);
        }else{
            //不包含，需要验证用户是否登录
            //从获取session中获取user
            Object user = request.getSession().getAttribute("username");
            if(user != null){
                //登录了。放行
                chain.doFilter(req, resp);
            }else{
                //没有登录。跳转登录页面
                System.out.println("未登录");
                //request.setAttribute("login_msg","您尚未登录，请登录");
                //request.getRequestDispatcher("/index.jsp").forward(request,resp);
                response.sendRedirect("/index.jsp");

            }
        }


        // chain.doFilter(req, resp);
    }

    public void init(FilterConfig config) throws ServletException {

    }

    public void destroy() {
    }
}
