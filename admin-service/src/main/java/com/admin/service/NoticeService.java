package com.admin.service;

import com.baomidou.mybatisplus.service.IService;
import com.admin.bean.NoticeManage;

import java.util.List;

/**
 * 通知公告service
 * 2019.8.13
 * lilyshake
 */
public interface NoticeService extends IService<NoticeManage> {

	/**
	 * 获取所有咨询服务Notice列表
	 * @return
	 */
	List<NoticeManage> getNoticeList(NoticeManage noticeManage);

	/**
	 * 获取所有咨询服务Notice列表 小程序
	 * @return
	 */
	List<NoticeManage> getNoticeListToWX(String content);


	/**
	 * 新增通知公告
	 * @param noticeManage
	 */
	void insertNotice(NoticeManage noticeManage);

	/**
	 * 更新通知公告
	 * @param noticeManage
	 */
	void updateNotice(NoticeManage noticeManage);

	/**
	 * 删除通知公告
	 * @param id
	 */
	void deleteNotice(Integer id);

	//根据id获取通知内容
	NoticeManage getNoticeContentById(Integer id);
}
