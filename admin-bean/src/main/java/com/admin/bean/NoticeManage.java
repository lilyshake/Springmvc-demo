package com.admin.bean;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import lombok.Data;

import java.io.Serializable;

@Data
@TableName("notice_manage")
public class NoticeManage extends Model<NoticeManage> {

    @TableId(value = "id", type = IdType.AUTO) //主键id
    private Integer id;
    private String noticeName;
    private String noticeType;
    private String content;
    private String createUser;
    private String createTime;
    private String beginTime;
    private String endTime;
    private String createUserParam;

    public String getCreateUserParam() {
        return createUserParam;
    }

    public void setCreateUserParam(String createUserParam) {
        this.createUserParam = createUserParam;
    }

    public String getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(String beginTime) {
        this.beginTime = beginTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getNoticeName() {
        return noticeName;
    }

    public void setNoticeName(String noticeName) {
        this.noticeName = noticeName;
    }

    public String getNoticeType() {
        return noticeType;
    }

    public void setNoticeType(String noticeType) {
        this.noticeType = noticeType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

    @Override
    public String toString() {
        return " NoticeManage[id=" + id
                + ", noticeName  =" + noticeName
                + ", noticeType =" + noticeType
                + ", content =" + content
                + ", createUser =" + createUser
                + ", createUserParam =" + createUserParam
                + ", createTime =" + createTime
                + ", beginTime =" + beginTime
                + ", endTime =" + endTime+ "]";
    }}