package com.spring.common.pojo.user;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import net.sf.json.JSONArray;

@Entity
@Table(name = "DM_USER")
public class User implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "USER_ID")
	private int userId;

	@Column(name = "NAME")
	private String name;

	@Column(name = "REAL_NAME")
	private String realName;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "MOBILE")
	private String mobile;

	@Column(name = "EMAIL")
	private String email;

	@Column(name = "PASSWORD")
	private String password;

	@Column(name = "CREATE_TIME")
	private Date createTime;

	@Column(name = "FLAG")
	private int flag;

	@Column(name = "CODE")
	private String code;

	@Column(name = "CREATOR_ID")
	private int creatorId;

	@Column(name = "DISCRIPTION")
	private String description;
	
	@Column(name = "PASSWORDENCRYPT")
	private String passwordencrypt;
	
	@Column(name = "LAST_IP")
	private String lastIp;
	
	@Column(name = "ISLOGIN")
	private Integer isLogin;
	
	@Transient
	private String relativeGroupMsg;

	public User() {

	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public int getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(int creatorId) {
		this.creatorId = creatorId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getRelativeGroupMsg() {
		return relativeGroupMsg;
	}

	public void setRelativeGroupMsg(String relativeGroupMsg) {
		this.relativeGroupMsg = relativeGroupMsg;
	}

	public String toString() {
		return JSONArray.fromObject(this).toString();
	}

	public String getPasswordencrypt() {
		return passwordencrypt;
	}

	public void setPasswordencrypt(String passwordencrypt) {
		this.passwordencrypt = passwordencrypt;
	}

	public String getLastIp() {
		return lastIp;
	}

	public void setLastIp(String lastIp) {
		this.lastIp = lastIp;
	}

	public Integer getIsLogin() {
		return isLogin;
	}

	public void setIsLogin(Integer isLogin) {
		this.isLogin = isLogin;
	}


}
