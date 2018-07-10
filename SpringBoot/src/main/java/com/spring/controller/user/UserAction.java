package com.spring.controller.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.spring.common.dao.UserDao;
import com.spring.common.dataSource.AlarmDataTest;
import com.spring.common.pojo.user.User;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/User")
public class UserAction {
	
	@Resource
	private UserDao userDao;
	
	@RequestMapping("/getAllUsers")
	@ResponseBody
	public List<User> getAllUser(){
		List<User> userList = userDao.getAllUser();
		System.out.println("全部用户:"+userList.size());
		return userList;
		
	}
    @RequestMapping("/getUserByName")
    @ResponseBody
	public User getUserByName(String username){
	    User user = userDao.selectUserByName(username);
	    return user;
    }

    @RequestMapping("/getUserById")
    @ResponseBody
    public User getUserById(int id){
        User user = userDao.getUserById(id);
        return user;
    }
}
