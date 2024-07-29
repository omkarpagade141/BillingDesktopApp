package com.alpha.app.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alpha.app.DTO.ProductDTO;
import com.alpha.app.Entity.Category;
import com.alpha.app.Entity.Product;
import com.alpha.app.Exception.ResourceNotFoundException;
import com.alpha.app.Repositiory.CategoryRepositiory;
import com.alpha.app.Repositiory.ProductRepositiory;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProductServiceImpl implements IProductService {

	@Autowired
	private ProductRepositiory productRepo;

	@Autowired
	private CategoryRepositiory cateRepo;

	@Autowired
	private ModelMapper mapper;

	// For Image set
	@Value("${content.upload.folder}")
	private String folderName;

	@Override
	public List<Product> allProductList() {
		// all prod list
		return productRepo.findAll();
	}

	@Override
	public ResponseEntity<?> addNewProduct(Long cateId, String prodName, double prodPrice, MultipartFile imageFile)
			throws IOException {

		// First find Category Object from DB with the help of cateId
		Category cateObj = cateRepo.findById(cateId)
				.orElseThrow(() -> new ResourceNotFoundException("Category Not found!!!"));
		// Create prod obj
		Product prod = new Product();
		// Set User i/p to prod object
		prod.setProdCreatedOn(LocalDate.now()); // Time
		prod.setProdName(prodName); // Name
		prod.setProdPrice(prodPrice); // Price
		// Prod(M) and Category(O) are mapped as Unidirectional : So set Category to the
		// Product
		prod.setCategory(cateObj);

		if (!imageFile.isEmpty()) {
			// Image path process
			String targetPath = folderName + File.separator + imageFile.getOriginalFilename();
			Files.copy(imageFile.getInputStream(), Paths.get(targetPath), StandardCopyOption.REPLACE_EXISTING);
			prod.addImageToProduct(targetPath);
			System.out.println("New Image Inserted !!!");
		}
		productRepo.save(prod);
		return new ResponseEntity<>("Product Added", HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<String> deleteProductById(Long prodId) throws IOException {
		// TODO Auto-generated method stub
		Product prod = productRepo.findById(prodId)
				.orElseThrow(() -> new ResourceNotFoundException("Error!!Product Not found!!"));
		if (prod.getProdImageUrl() != null) {
			Path prodImgPath = Paths.get(prod.getProdImageUrl());
			Files.delete(prodImgPath);
			System.out.println("Product Image path Deleted !!!");
		}
		productRepo.deleteById(prodId);
		return new ResponseEntity<>("Product Deleted", HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> updateProductDetails(Long prodId, String updtProdName, double updtProdPrice,
			MultipartFile updtProdImageFile) throws IOException {

		Product oldProd = productRepo.findById(prodId)
				.orElseThrow(() -> new ResourceNotFoundException("Product Not found!!!"));
		oldProd.setProdName(updtProdName);
		oldProd.setProdPrice(updtProdPrice);
		//Set on which date product was updated
		oldProd.setProdLastUpdatedOn(LocalDate.now());
		if (oldProd.getProdImageUrl() != null) {
			Path prodImgPath = Paths.get(oldProd.getProdImageUrl());
			Files.delete(prodImgPath);
			System.out.println("Product Image path Deleted !!!");
		}
		if (!updtProdImageFile.isEmpty()) {
			String targetPath = folderName + File.separator + updtProdImageFile.getOriginalFilename();
			Files.copy(updtProdImageFile.getInputStream(), Paths.get(targetPath), StandardCopyOption.REPLACE_EXISTING);
			oldProd.addImageToProduct(targetPath);
			System.out.println("New Image Inserted !!!");
		}
		productRepo.save(oldProd);
		return new ResponseEntity<>("Product Updated Successfully!!!", HttpStatus.OK);
	}
}
