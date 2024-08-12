package com.alpha.app.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.alpha.app.DTO.RemoveProductFromCartDTO;
import com.alpha.app.Entity.CartProducts;
import com.alpha.app.Entity.Customer;
import com.alpha.app.Entity.Product;
import com.alpha.app.Exception.ResourceNotFoundException;
import com.alpha.app.Exception.UserHandlingException;
import com.alpha.app.Repositiory.CartProductsRepositiory;
import com.alpha.app.Repositiory.CustomerRepositiory;
import com.alpha.app.Repositiory.ProductRepositiory;
import com.alpha.app.Repositiory.ShoppingCartRepositiory;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ShoppingCartServiceImpl implements IShoppingCartService {

//	@Autowired
//	private ShoppingCartRepositiory shopCartRepo;
	
	@Autowired
	private CartProductsRepositiory cartProdRepo;
	
	@Autowired
	private CustomerRepositiory custRepo;
	
	@Autowired
	private ProductRepositiory prodRepo;
	

	@Override
	public void addProductToCart(Long custId, Long prodId, int quantity) throws UserHandlingException {
		// TODO Auto-generated method stub
		Customer cust = custRepo.findById(custId).orElseThrow(()-> new ResourceNotFoundException("Customer not found"));
		int updateQty = 0;
		try {
			
			Product prodDetails = prodRepo.findById(prodId).orElseThrow(()-> new ResourceNotFoundException("Product not found"));
			
			CartProducts cart = new CartProducts();
//			CartProducts cart =
			cart.setCurrentCustomer(cust);
			cart.setProducts(prodDetails);
			cart.setQuantity(quantity);
//			cart.setCartCreatedOn(LocalDate.now());
			cartProdRepo.save(cart);
			
		} catch (Exception e) {
			throw new UserHandlingException("Error to add prod in cart"+e.getMessage());
		}
		
	}


	@Override
	public List<CartProducts> getCartProductList(long custId) {
		Customer cust = custRepo.findById(custId).orElseThrow(()-> new ResourceNotFoundException("Invalid Customer details"));
		return cartProdRepo.findByCurrentCustomer(cust);
		
	}


	@Override
	public void removeSingleProduct(RemoveProductFromCartDTO removeProd) {
		
		Customer cust = custRepo.findById(removeProd.getCustId()).orElseThrow(()-> new ResourceNotFoundException("Invalid Customer details"));
		
		cartProdRepo.deleteByProductsAndCurrentCustomerAndCartCreatedOn(removeProd.getProdId(),removeProd.getCustId(),LocalDate.now());
		
	}


	
}
