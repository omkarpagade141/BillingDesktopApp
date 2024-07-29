package com.alpha.app.Entity;

import java.time.LocalDate;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity

@Table(name = "UserMasterTbl")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_Id")
	private Integer userId;
	
	@Column(name="user_name",nullable = false)
	private String userName;
	@Column(name="user_pass",nullable = false)
	private String userPassword;
	@Column(name="created_date")
	private LocalDate createdOn;
	
	public User() {
		// TODO Auto-generated constructor stub
	}
	
	public User(Integer userId, String userName, String userPassword, LocalDate createdOn) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.userPassword = userPassword;
		this.createdOn = createdOn;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public LocalDate getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(LocalDate createdOn) {
		this.createdOn = createdOn;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", userName=" + userName + ", userPassword=" + userPassword + ", createdOn="
				+ createdOn + "]";
	}
	
	
	
}
