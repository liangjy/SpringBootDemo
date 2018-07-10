package com.spring.common.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.spring.common.pojo.user.User;

@Repository
@Qualifier("userDao")
public interface UserDao extends CrudRepository<User, Integer >{
	/**
	 * 验证用户名和密码
	 * @param username
	 * @param password
	 * @return
	 */
	@Query("SELECT u FROM User u WHERE u.name=:name AND u.passwordencrypt=:passwordencrypt")
	public User validate(@Param("name") String username,@Param("passwordencrypt") String password) throws Exception;
	
	/**
	 * 新增和修改用户
	 * @param user
	 * @return user 保存的对象
	 */
	public User save(User user);
	
	/**
	 * 删除用户
	 * @param  id
	 * @return
	 */
	public void delete(@Param("id") Integer id);
	
	@Query("SELECT u From User u order by createTime desc")
	public List<User> getAllUser();
	
	@Query("select u from User u where name=:name")
	public User existUser(@Param("name") String name);
	
	@Query("SELECT u FROM User u WHERE u.name=:name")
	public User selectUserByName(@Param("name") String username);
	
	@Query("select u from User u where id = :id")
	public User getUserById(@Param("id")int id);

	public long count();
	
}
