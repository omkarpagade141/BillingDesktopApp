package com.alpha.app.Repositiory;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alpha.app.Entity.Category;

@Repository
public interface CategoryRepositiory extends JpaRepository<Category, Long>{

	
}
