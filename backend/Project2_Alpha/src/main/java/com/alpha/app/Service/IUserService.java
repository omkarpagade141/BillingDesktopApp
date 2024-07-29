package com.alpha.app.Service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.alpha.app.DTO.UserSignUpDTO;
import com.alpha.app.Entity.User;

public interface IUserService {

	ResponseEntity<?> addNewUser(UserSignUpDTO addUser);

	Integer userLogIn(UserSignUpDTO userLogIn);

	List<User> allUserList();

	UserSignUpDTO getUserDetailsByName(String name);

}
