package com.alpha.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alpha.app.DTO.UserSignUpDTO;
import com.alpha.app.Entity.User;
import com.alpha.app.Service.IUserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private IUserService userService;
	
	
	@PostMapping("/signup")
	ResponseEntity<?> userSignUp (@RequestBody UserSignUpDTO addUser)
	{
		return userService.addNewUser(addUser);
	}
	
	@PostMapping("/login")
	ResponseEntity<?> userLogIn (@RequestBody UserSignUpDTO userLogIn)
	{
		Integer userId= userService.userLogIn(userLogIn);
		if(userId >0)
		{
			return new ResponseEntity<Integer>(userId, HttpStatus.OK);
		}
		return new ResponseEntity<String> ("Wrong username and password",HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/allUser")
	List<User> allUser()
	{
		return userService.allUserList();
	}
}
