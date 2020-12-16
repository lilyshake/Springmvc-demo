package com.admin.service.impl;

import java.util.List;

import com.admin.service.UserManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.bean.Userinfo;
import com.admin.bean.UserinfoExample;
import com.admin.bean.UserinfoExample.Criteria;
import com.admin.mapper.UserinfoMapper;
import com.admin.utils.MD5;

@Service
public class UserManageServiceImpl implements UserManageService {

	@Autowired
	private UserinfoMapper userinfoMapper;
	
	@Override
	public Integer updatePassword(Userinfo userinfo) throws Exception {
		
		return userinfoMapper.updatePasswordByUsername(userinfo);
	}

	@Override
	public Boolean checkPasswdIsSameByUsername(Userinfo userinfo) throws Exception {
		
		UserinfoExample example=new UserinfoExample();
		Criteria criteria=example.createCriteria();
		criteria.andUsernameEqualTo(userinfo.getUsername());
		
		List<Userinfo> list=userinfoMapper.selectByExample(example);
		
		if(list.size()>0) {
			if(list.get(0).getPassword().equals(MD5.getMD5(userinfo.getPassword()))) {
				return true;
			}
		}
		
		return false;
	}

	@Override
	public Integer addPerson(Userinfo userinfo) throws Exception {
		
		userinfo.setPassword(MD5.getMD5(userinfo.getPassword()));
		return userinfoMapper.insertSelective(userinfo);
	}

	@Override
	public Boolean checkUserExists(String username) throws Exception {
		
		UserinfoExample example=new UserinfoExample();
		Criteria criteria=example.createCriteria();
		criteria.andUsernameEqualTo(username);
		Long count=userinfoMapper.countByExample(example);
		
		
		if(count==0 || count==null) {
			return Boolean.FALSE;
		}
		return Boolean.TRUE;
	}

	@Override
	public List<Userinfo> selectAllUser() throws Exception{
		UserinfoExample example=new UserinfoExample();
		Criteria criteria=example.createCriteria();
		criteria.andLevelNotEqualTo(1);
		
		return userinfoMapper.selectByExample(example);
	}

	@Override
	public Integer updateUserinfo(Userinfo userinfo) throws Exception {
		UserinfoExample example=new UserinfoExample();
		Criteria criteria=example.createCriteria();
		criteria.andUsernameEqualTo(userinfo.getUsername());
		if(userinfo.getPassword().length()==0 || userinfo.getPassword()==null) {
			userinfo.setPassword(null);
		}else {
			userinfo.setPassword(MD5.getMD5(userinfo.getPassword()));
		}
		return userinfoMapper.updateByExampleSelective(userinfo, example);
	}

	@Override
	public Integer deletePersonByUsername(String username) throws Exception {
		return userinfoMapper.deletePersonByUsername(username);
	}
	
}
