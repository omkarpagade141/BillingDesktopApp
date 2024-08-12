package com.alpha.app.Entity;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

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
@Table(name="cart_products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartProducts {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long cartProdId;
	
	@ManyToOne
	@JoinColumn(name="product_id")
	private Product products;

//	@ManyToOne
//	@JoinColumn(name="shopping_cart_id")
//	private ShoppingCart shoppingCart;
	
	//New Chnage trial purpose 7-8
	@ManyToOne
	@JoinColumn(name = "customer_id")
	private Customer currentCustomer;
	
	private int quantity;
	
	@CreationTimestamp 
	@Column(name = "cart_created_on")
	private LocalDate cartCreatedOn;

}
