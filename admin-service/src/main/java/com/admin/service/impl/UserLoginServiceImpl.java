package com.admin.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.bean.Userinfo;
import com.admin.bean.UserinfoExample;
import com.admin.bean.UserinfoExample.Criteria;
import com.admin.mapper.UserinfoMapper;
import com.admin.service.UserLoginService;
import com.admin.utils.MD5;

@Service
public class UserLoginServiceImpl implements UserLoginService{

	@Autowired
	private UserinfoMapper userinfoMapper;
	
	@Override
	public Integer checkUserGetLevel(Userinfo user) throws Exception{
		Integer level=-1;
		UserinfoExample example=new UserinfoExample();
		Criteria criteria=example.createCriteria();
		criteria.andUsernameEqualTo(user.getUsername());
		criteria.andPasswordEqualTo(MD5.getMD5(user.getPassword()));
		
		List<Userinfo> list=userinfoMapper.selectByExample(example);
		if(list.size()>0) {
			return list.get(0).getLevel();
		}
		return level;
	}
}
