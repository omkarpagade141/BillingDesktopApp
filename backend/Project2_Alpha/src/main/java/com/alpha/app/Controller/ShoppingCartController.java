package com.alpha.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alpha.app.DTO.AddProductDTO;
import com.alpha.app.Entity.ShoppingCart;
import com.alpha.app.Exception.UserHandlingException;
import com.alpha.app.Service.IShoppingCartService;

@RestController
@RequestMapping("/api/shopping_cart")
public class ShoppingCartController {

	@Autowired
	private IShoppingCartService shopCartService;
	
	@PostMapping("/addtocart")
	public ResponseEntity<?> addProductToCart(@RequestBody AddProductDTO addProd) throws UserHandlingException
	{
		shopCartService.addProductToCart(addProd.getCustId(), addProd.getProdId(), addProd.getQuantity());
		
		return new ResponseEntity<String>("product Added to cart Successfully",HttpStatus.CREATED);
	}
	
//	@GetMapping("/{cartId}")
//	public ResponseEntity<?> getCartItemList(@PathVariable long cartId)
//	{
//		System.out.println("in getCartitemList contr");
//		List<ShoppingCart>
//	}
}
