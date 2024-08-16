package com.alpha.app.Service;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.alpha.app.DTO.OrderDTO;
import com.alpha.app.DTO.OrderItemsDTO;
import com.alpha.app.Entity.CartProducts;
import com.alpha.app.Entity.Customer;
import com.alpha.app.Entity.Order;
import com.alpha.app.Entity.Product;
import com.alpha.app.Entity.ShoppingCart;
import com.alpha.app.Repositiory.CartProductsRepositiory;
import com.alpha.app.Repositiory.OrderRepositiory;
import com.alpha.app.Repositiory.ShoppingCartRepositiory;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OrderServiceImpl implements IOrderService {

	@Autowired
	private ShoppingCartRepositiory shopCartRepo;
	
	@Autowired
	private CartProductsRepositiory cartProductRepo;
	
	@Autowired
	private OrderRepositiory orderRepo;

	@Override
	public ResponseEntity<?> placeOrderDetails(OrderDTO orderDetails) {
		// Get Customer Obj from DTO
		Customer custDetails = orderDetails.getCustomer();
		// Set customer to shopCart
		ShoppingCart shopKart = new ShoppingCart();
		shopKart.setCustomerObj(custDetails);
		
//		ShoppingCart kartSaved=shopCartRepo.save(shopKart);
		System.out.println("What kart saved :"+shopKart);
		
		//Perform CartProduct
//		CartProducts krtProd = new CartProducts();
//		krtProd.setShoppingCartObj(kartSaved);
		
		for(OrderItemsDTO itemDTO : orderDetails.getOrderItems())
		{
			CartProducts item = new CartProducts();
			item.setProducts(itemDTO.getProduct());
			item.setQuantity(itemDTO.getQuantity());
			item.setShoppingCartObj(shopKart);
			shopKart.getCartProductsList().add(item);
		}
		ShoppingCart kartSaved=shopCartRepo.save(shopKart);
		
		Order order = new Order();
		order.setCustomerObj(custDetails);
		order.setShoppingCart(kartSaved);
		order.setSubTotalAmt(orderDetails.getSubTotalAmt());
		order.setDiscountPercentage(orderDetails.getDiscountPercentage());
		order.setDiscountAmount(orderDetails.getDiscountAmount());
		order.setNetAmount(orderDetails.getNetAmount());
		order.setPaymentMode(orderDetails.getPaymentMode());
		
		orderRepo.save(order);
		
		return new ResponseEntity<>("Order placed for customer "+custDetails.getCustFullName(), HttpStatus.CREATED);
	}
	
}
