package com.alpha.app.Repositiory;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alpha.app.Entity.User;

@Repository
public interface UserRepositiory extends JpaRepository<User, Integer>{

	User findByUserNameAndUserPassword(String userName, String userPassword);

	Optional<User> findByUserName(String username);




}
