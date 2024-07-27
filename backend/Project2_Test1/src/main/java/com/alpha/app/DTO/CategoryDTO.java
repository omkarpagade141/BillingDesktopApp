package com.alpha.app.DTO;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {

	private String cateName;
	private String cateImageUrl;
	
	public CategoryDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public CategoryDTO(String cateName, String cateImageUrl) {
		super();
		this.cateName = cateName;
		this.cateImageUrl = cateImageUrl;
	}

	public String getCateName() {
		return cateName;
	}

	public void setCateName(String cateName) {
		this.cateName = cateName;
	}

	public String getCateImageUrl() {
		return cateImageUrl;
	}

	public void setCateImageUrl(String cateImageUrl) {
		this.cateImageUrl = cateImageUrl;
	}
	
	
	
}
