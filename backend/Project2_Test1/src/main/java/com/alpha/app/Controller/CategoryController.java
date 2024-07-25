package com.alpha.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alpha.app.DTO.CategoryDTO;
import com.alpha.app.Entity.Category;
import com.alpha.app.Service.ICategoryService;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

	@Autowired
	private ICategoryService cateService;
	
	// Send List of all categories
	@GetMapping("/allcategories")
	List<Category> getAllCategories()
	{
		return cateService.getCategoryList();
	}
	
	@PostMapping(value = "/add_category",consumes = {"multipart/form-data"})
	ResponseEntity<String> addNewCategory(@RequestBody CategoryDTO newCate)
	{
		return cateService.addNewCategoryRecord(newCate);
	}
}
