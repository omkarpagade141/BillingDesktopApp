package com.alpha.app.Service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alpha.app.Entity.Customer;
import com.alpha.app.Entity.Product;
import com.alpha.app.Entity.ShoppingCart;
import com.alpha.app.Exception.ResourceNotFoundException;
import com.alpha.app.Exception.UserHandlingException;
import com.alpha.app.Repositiory.CustomerRepositiory;
import com.alpha.app.Repositiory.ProductRepositiory;
import com.alpha.app.Repositiory.ShoppingCartRepositiory;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ShoppingCartServiceImpl implements IShoppingCartService {

	@Autowired
	private ShoppingCartRepositiory shopCartRepo;
	
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
			ShoppingCart cart = new ShoppingCart();
			if(cart !=null)
			{
//				updateQty = cart.getQuantity() + quantity;
				if(updateQty < 0)
				{
					throw new UserHandlingException("Invalid Quantity");
				}else
				{
//					cart.setCartCreatedOn(LocalDate.now());
//					cart.setCustomerId(cust);
//					cart.setProducts(prodDetails);
					shopCartRepo.save(cart);
				}
			}
			
		} catch (Exception e) {
			throw new UserHandlingException("Error to add prod in cart"+e.getMessage());
		}
		
	}
}
