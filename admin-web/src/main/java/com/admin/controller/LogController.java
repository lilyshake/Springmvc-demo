package com.admin.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.admin.bean.Log;
import com.admin.service.LogService;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 日志controller
 * 2018.5.9
 */
@Controller
@RequestMapping("/log")
public class LogController {

    @Autowired
    private LogService logService;

    @RequestMapping(value = "/showAllLog", method = RequestMethod.GET)
    public String showAllLog(HttpSession session, Model model) {
        if (session.getAttribute("username") == null) {
            return "error";
        }

        List<Log> loglist = logService.selectAllLog();
        model.addAttribute("loglist", loglist);
        return "systemLog";
    }

    @RequestMapping(value = "/showAllLogList", method = RequestMethod.GET)
    @ResponseBody
    public List showAllLogList(HttpSession session, Model model) {
        List<Log> loglist = logService.selectAllLog();
        return loglist;
    }
}
