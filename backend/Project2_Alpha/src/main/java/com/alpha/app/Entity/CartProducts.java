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

	public CartProducts() {
		// TODO Auto-generated constructor stub
	}

	public CartProducts(Long cartProdId, Product products, Customer currentCustomer, int quantity,
			LocalDate cartCreatedOn) {
		super();
		this.cartProdId = cartProdId;
		this.products = products;
		this.currentCustomer = currentCustomer;
		this.quantity = quantity;
		this.cartCreatedOn = cartCreatedOn;
	}

	public Long getCartProdId() {
		return cartProdId;
	}

	public void setCartProdId(Long cartProdId) {
		this.cartProdId = cartProdId;
	}

	public Product getProducts() {
		return products;
	}

	public void setProducts(Product products) {
		this.products = products;
	}

	public Customer getCurrentCustomer() {
		return currentCustomer;
	}

	public void setCurrentCustomer(Customer currentCustomer) {
		this.currentCustomer = currentCustomer;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public LocalDate getCartCreatedOn() {
		return cartCreatedOn;
	}

	public void setCartCreatedOn(LocalDate cartCreatedOn) {
		this.cartCreatedOn = cartCreatedOn;
	}
	
	
}
