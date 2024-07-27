package com.alpha.app.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "CategoryMaster")
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "category_Id")
	private Long cateId;
	
	@Column(name="category_name",nullable = false)
	private String cateName;
	@Column(name="category_image_url")
	private String cateImageUrl;
	@Column(name="cate_created_date")
	private LocalDate cateCreatedOn;
	
	public Category() {
		// TODO Auto-generated constructor stub
	}
	
	public Category(Long cateId, String cateName, String cateImageUrl, LocalDate cateCreatedOn) {
		super();
		this.cateId = cateId;
		this.cateName = cateName;
		this.cateImageUrl = cateImageUrl;
		this.cateCreatedOn = cateCreatedOn;
	}

	public Long getCateId() {
		return cateId;
	}

	public void setCateId(Long cateId) {
		this.cateId = cateId;
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

	public LocalDate getCateCreatedOn() {
		return cateCreatedOn;
	}

	public void setCateCreatedOn(LocalDate cateCreatedOn) {
		this.cateCreatedOn = cateCreatedOn;
	}

	@Override
	public String toString() {
		return "Category [cateId=" + cateId + ", cateName=" + cateName + ", cateImageUrl=" + cateImageUrl
				+ ", cateCreatedOn=" + cateCreatedOn + "]";
	}
	
	// If we want to know who(User) created category 
//	@ManyToOne
//	@JoinColumn(name = "user_id")
//	private User userId;
	
	
}
