package com.admin.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.admin.bean.NoticeManage;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface NoticeManageMapper extends BaseMapper<NoticeManage> {

    //获取通知公告列表
    List<NoticeManage> getNoticeList(@Param("NoticeManage") NoticeManage noticeManage);

    //获取通知公告列表
    List<NoticeManage> getNoticeListToWX(@Param("content") String content);

    //删除通知公告内容
    void deleteNotice(@Param("id") Integer id);

    //新增服务通知公告内容
    void insertNotice(@Param("NoticeManage") NoticeManage noticeManage);

    //更新服务通知公告内容
    void updateNotice(@Param("NoticeManage") NoticeManage noticeManage);

    //根据id获取通知内容
    NoticeManage getNoticeContentById(@Param("id")Integer id);

}