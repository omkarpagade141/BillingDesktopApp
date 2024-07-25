package com.alpha.app.Service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.alpha.app.DTO.CategoryDTO;
import com.alpha.app.Entity.Category;

public interface ICategoryService {

	List<Category> getCategoryList();

	ResponseEntity<String> addNewCategoryRecord(CategoryDTO newCate);

}
