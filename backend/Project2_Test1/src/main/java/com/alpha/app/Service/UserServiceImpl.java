package com.alpha.app.Service;

import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.alpha.app.DTO.UserSignUpDTO;
import com.alpha.app.Entity.User;
import com.alpha.app.Repositiory.UserRepositiory;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements IUserService{

	@Autowired
	private UserRepositiory userRepo;
	
	@Autowired
	private ModelMapper mapper;
	
//	@Autowired
//	private PasswordEncoder passwordEncoder;	

	@Override
	public ResponseEntity<?> addNewUser(UserSignUpDTO addUser) {
		
		try {
		User userObj = mapper.map(addUser, User.class);
		LocalDate currentDt = LocalDate.now();
		userObj.setCreatedOn(currentDt);
//		userObj.setUserPassword(passwordEncoder.encode(userObj.getUserPassword()));
		userRepo.save(userObj);
		return new ResponseEntity<>("User Sign up successfully", HttpStatus.CREATED);
		}catch (Exception e) {
			return new ResponseEntity<>("Error!!!User Sign up Failed", HttpStatus.BAD_REQUEST);
		}
		
	}

	@Override
	public Integer userLogIn(UserSignUpDTO userLogIn) {
		
		User userObj = userRepo.findByUserNameAndUserPassword(userLogIn.getUserName(), userLogIn.getUserPassword());
		
		if(userObj !=null)
		{
			return userObj.getUserId();
		}else
		{
			return 0;
		}
		
	}

	@Override
	public List<User> allUserList() {
		// TODO Auto-generated method stub
		return userRepo.findAll();
	}
	
	
}
