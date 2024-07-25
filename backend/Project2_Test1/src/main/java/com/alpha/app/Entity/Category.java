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
	
	// If we want to know who(User) created category 
//	@ManyToOne
//	@JoinColumn(name = "user_id")
//	private User userId;
}
