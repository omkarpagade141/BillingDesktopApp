package com.alpha.app.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ordermaster")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_Id")
	private Long orderId;
	
	@Column(name="sub_total")
	private double subTotalAmt;
	
	@Column(name = "discount_percentage")
	private int discountPercentage;
	
	@Column(name="discount_amount")
	private double discountAmount;
	

	@Column(name="net_amount")
	private double netAmount;
	
	
	@Column(name = "order_created_date")
	private LocalDate orderCreatedOn;

}
