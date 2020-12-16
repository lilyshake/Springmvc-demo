package com.admin.service;

import com.admin.bean.Userinfo;

/**
 * 用户登录service
 * 2018.4.27
 */
public interface UserLoginService{
	
	/**
	 * 检查用户名密码是否正确，返回用户角色等级
	 * @param user
	 * @return
	 */
	public Integer checkUserGetLevel(Userinfo user) throws Exception;
}