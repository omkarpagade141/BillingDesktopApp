package com.alpha.app.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="cart_products")
public class CartProducts {

	@ManyToOne
	@JoinColumn(name="product_id")
	private Product products;

	@ManyToOne
	@JoinColumn(name="customer_id")
	private Customer customer;
	
	private int quantity;
}
