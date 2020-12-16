package com.admin.controller;

/**
 * 登录验证controller
 * 2018.4.27
 */

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.admin.bean.Log;
import com.admin.bean.Userinfo;
import com.admin.common.WMessage;
import com.admin.common.WResponse;
import com.admin.service.LogService;
import com.admin.service.UserLoginService;
import com.admin.utils.TimeUtil;

@Controller
@RequestMapping("/login")
public class LoginController {

	@Autowired
	private UserLoginService userLoginService;
	
	@Autowired
	private LogService logService;
	
	/**
	 * 返回登录结果信息
	 * @param userinfo
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/userLogin" , method = RequestMethod.POST)
	public WResponse userLogin(Userinfo userinfo,HttpSession session) throws Exception {

		Integer level=userLoginService.checkUserGetLevel(userinfo);
		userinfo.setLevel(level);
		userinfo.setPassword("");
		WResponse response=new WResponse();
		response.setObject(userinfo);
		
		if(level==-1) {
			response.setMessage(WMessage.MSG_FAIL);
		}else {
			session.setAttribute("username", userinfo.getUsername());
			session.setAttribute("level", userinfo.getLevel());
			response.setMessage(WMessage.MSG_SUCCESS);
		}
		
		Log log=logService.createLog(userinfo.getUsername(),
									WMessage.MSG_OPREATION_LOGIN,
									"用户:"+userinfo.getUsername()
									+"&nbsp;&nbsp;&nbsp;&nbsp;等级:"+userinfo.getLevel()
									+"&nbsp;&nbsp;&nbsp;&nbsp;于&nbsp;"+TimeUtil.getNowerTime()
									+"&nbsp;登录系统&nbsp;&nbsp;&nbsp;&nbsp;结果:"+response.getMessage());
		logService.insertLog(log);
		
		return response;
	}
	
	/**
	 * 判定用户等级，并返回视图
	 * @param username
	 * @param level
	 * @param session
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/userPageSelect", method = RequestMethod.GET)
	public String userPageSelect(@RequestParam("username") String username,@RequestParam("level") Integer level,HttpSession session) 
			throws Exception {
		
		if(session.getAttribute("username")==null) {
			return "error";
		}
		
		session.setAttribute("level", level);
		return "applicationPage";
	}


	@RequestMapping(value = "/logout")
	public String logout(HttpSession session){
		session.invalidate();//清除session
		return "redirect:/index.jsp";
	}

}
