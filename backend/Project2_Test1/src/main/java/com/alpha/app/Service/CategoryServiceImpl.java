package com.alpha.app.Service;

import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.alpha.app.DTO.CategoryDTO;
import com.alpha.app.Entity.Category;
import com.alpha.app.Exception.ResourceNotFoundException;
import com.alpha.app.Repositiory.CategoryRepositiory;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CategoryServiceImpl implements ICategoryService {


	@Autowired
	private CategoryRepositiory cateRepo;

	@Autowired
	private ModelMapper mapper;
	
	
	
	@Override
	public List<Category> getCategoryList() {
		// To get all categories and send as List
		return cateRepo.findAll();
	}


	@Override
	public ResponseEntity<String> addNewCategoryRecord(CategoryDTO newCate) {
		// To add new category obj
		try {
		Category catObj = mapper.map(newCate, Category.class);
		catObj.setCateCreatedOn(LocalDate.now());
		
		cateRepo.save(catObj);
		return new ResponseEntity<String>("New Category added successfully", HttpStatus.CREATED);
		}catch (ResourceNotFoundException e) {
			// TODO: handle exception
			return new ResponseEntity<String>("Error!!! Category Not added", HttpStatus.BAD_REQUEST);
		}

	}
}
