package com.admin.controller;

import com.admin.bean.NoticeManage;
import com.admin.common.WMessage;
import com.admin.common.WResponse;
import com.admin.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * 通知公告controller
 * 2019.8.9
 */
@Controller
@RequestMapping("/noticeManage")
public class NoticeManageController {

	@Autowired
	private NoticeService noticeService;

	/**
	 * 通知公告列表页面
	 * @return
	 */
	@RequestMapping(value = "/noticeManagePage")
	public String noticeManagePage(Model model, HttpSession session) {
		model.addAttribute("level", session.getAttribute("level"));
	    return "/noticeManage/noticeManagePage";
	}

	/**
	 * 通知公告新增/编辑页面
	 * @return
	 */
	@RequestMapping(value = "/editNoticeManage")
	public String editNoticeManage(Model model, NoticeManage noticeManage) {
	    if(noticeManage.getId() != null) { //更新
            List<NoticeManage>  noticeList = noticeService.getNoticeList(noticeManage);
            model.addAttribute("id",noticeList.get(0).getId());
            model.addAttribute("noticeName", noticeList.get(0).getNoticeName());
            model.addAttribute("noticeType", noticeList.get(0).getNoticeType());
            model.addAttribute("content", noticeList.get(0).getContent());
        } else {
            model.addAttribute("id","");
            model.addAttribute("noticeName", "");
            model.addAttribute("noticeType", "");
            model.addAttribute("content", "");
        }
		return "/noticeManage/editNoticeManage";
	}

	/**
	 * 获取通知公告列表列表
	 * @param noticeManage
	 * @return
	 */
	@RequestMapping(value = "/getNoticeList")
	@ResponseBody
	public List getNoticeList(NoticeManage noticeManage,HttpSession session) {
		if(session.getAttribute("level").toString().equals("1") || session.getAttribute("level").toString().equals("2") ) { //管理员 可以看到所有的
			noticeManage.setCreateUser(null);
		} else {
			noticeManage.setCreateUser(session.getAttribute("username").toString());
		}
		List<NoticeManage>  noticeList = noticeService.getNoticeList(noticeManage);
		return noticeList;
	}

	/**
	 * 保存通知公告 新增/编辑
	 * @param noticeManage
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/saveNoticeManage", method = RequestMethod.POST)
	@ResponseBody
	public WResponse saveNoticeManage(NoticeManage noticeManage, HttpSession session) {
		WResponse response=new WResponse();
		try{
		    if(noticeManage.getId() != null) { // 更新操作
                noticeService.updateNotice(noticeManage);
            } else { // 新增
				noticeManage.setCreateUser(session.getAttribute("username").toString());
				noticeService.insertNotice(noticeManage);
            }
			response.setMessage(WMessage.MSG_SUCCESS);
		} catch (Exception e) {
			response.setMessage(WMessage.MSG_FAIL);
			e.printStackTrace();
		}
		return response;
	}

	/**
	 * 删除标题
	 * @param ids
	 * @return
	 */
	@RequestMapping(value = "/deleteNotice", method = RequestMethod.POST)
	@ResponseBody
	public WResponse deleteNotice(String ids) {
		String[] id = ids.split(",");
		WResponse response=new WResponse();
		try{
			for(int i=0; i<id.length; i++) {
				noticeService.deleteNotice(Integer.parseInt(id[i]));
			}
			response.setMessage(WMessage.MSG_SUCCESS);
		} catch (Exception e) {
			response.setMessage(WMessage.MSG_FAIL);
			e.printStackTrace();
		}
		return response;
	}

	/**
	 * 获取通知公告列表列表  小程序
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/getNoticeListToWX")
	@ResponseBody
	public List getNoticeListToWX(String content) throws UnsupportedEncodingException {
        String param = null;
	    if(content!=null&&!"".equals(content)){
            param = decode(content);
        }

        List<NoticeManage>  noticeList = noticeService.getNoticeListToWX(param);
		return noticeList;
	}

    private String decode(String param){
        String result= null;
        try {
            result = new String(param.getBytes("utf-8"), "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return result;
    }



	/**
	 * 获取通知公告列表列表  小程序
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/getNoticeContentById")
	@ResponseBody
	public NoticeManage getNoticeContentById(Integer id) {
		NoticeManage noticeContent = noticeService.getNoticeContentById(id);
		return noticeContent;
	}



}
