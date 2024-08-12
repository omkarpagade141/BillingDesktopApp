//package com.alpha.app.Entity;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.OneToMany;
//import jakarta.persistence.OneToOne;
//import jakarta.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Entity
//@Table(name = "shopping_cart_master")
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//public class ShoppingCart {
//
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "shopping_cart_Id")
//	private Long shoppingCartId;
//	
//	
//	@OneToMany(mappedBy = "shoppingCart",cascade = CascadeType.ALL)
//	private List<CartProducts> cartProductsList = new ArrayList<CartProducts>();
//	
//	@OneToOne(cascade = CascadeType.ALL)
//	@JoinColumn(name = "customer_id")
//	private Customer customerId;
//	
////	public String addProductToCart(CartProducts prodObj)
////	{
////		this.cartProductsList.add(prodObj);
////		return "Product added to cart";
////	}
//}
