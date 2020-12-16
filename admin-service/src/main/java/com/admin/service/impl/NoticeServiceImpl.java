package com.admin.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.admin.bean.NoticeManage;
import com.admin.mapper.NoticeManageMapper;
import com.admin.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeServiceImpl extends ServiceImpl<NoticeManageMapper, NoticeManage>implements NoticeService {

	@Autowired
	private NoticeManageMapper noticeManageMapper;

	@Override
	public List<NoticeManage> getNoticeList(NoticeManage noticeManage) {
		return noticeManageMapper.getNoticeList(noticeManage);
	}

	@Override
	public List<NoticeManage> getNoticeListToWX(String content) {
		return noticeManageMapper.getNoticeListToWX(content);
	}

	@Override
	public void insertNotice(NoticeManage noticeManage) {
		 noticeManageMapper.insertNotice(noticeManage);
	}

	@Override
	public void updateNotice(NoticeManage noticeManage) {
		 noticeManageMapper.updateNotice(noticeManage);
	}

	@Override
	public void deleteNotice(Integer id) {
		 noticeManageMapper.deleteNotice(id);
	}

	@Override
	public NoticeManage getNoticeContentById(Integer id) {
		return noticeManageMapper.getNoticeContentById(id);
	}

}
