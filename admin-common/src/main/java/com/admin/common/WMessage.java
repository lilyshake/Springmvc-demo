package com.admin.common;

import java.io.Serializable;

/**
 * 定义统一的消息
 * 2018.5.2
 */

public class WMessage implements Serializable {

	/**
	 * 操作失败
	 */
	public static final String MSG_FAIL="fail";
	
	/**
	 * 操作成功
	 */
	public static final String MSG_SUCCESS="success";
	
	/**
	 * 新密码与原密码相同
	 */
	public static final String MSG_SAME_PASSWD="passwd_same";
	
	/**
	 * 用户名已存在
	 */
	public static final String MSG_USER_EXISTS="user_exists";

	/**
	 * 已存在
	 */
	public static final String EXISTS = "exists";
	
	/**
	 * 操作类型：添加
	 */
	public static final String MSG_OPREATION_ADD="添加";
	
	/**
	 * 操作类型：修改
	 */
	public static final String MSG_OPREATION_UPDATE="更新";
	
	/**
	 * 操作类型：删除
	 */
	public static final String MSG_OPREATION_DELETE="删除";
	
	/**
	 * 操作类型：登录
	 */
	public static final String MSG_OPREATION_LOGIN="登录";
	
	/**
	 * 操作类型：添加配置
	 */
	public static final String MSG_OPREATION_ADD_CONFIG="添加配置";
	
	/**
	 * 操作类型：更新配置
	 */
	public static final String MSG_OPREATION_UPDATE_CONFIG="更新配置";
}
