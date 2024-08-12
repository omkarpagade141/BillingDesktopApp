package com.alpha.app.Repositiory;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.alpha.app.Entity.CartProducts;
import com.alpha.app.Entity.Customer;

@Repository
public interface CartProductsRepositiory extends JpaRepository<CartProducts, Long>{

	List<CartProducts> findByCurrentCustomer(Customer cust);

	@Modifying
	@Query("DELETE FROM CartProducts c WHERE c.products.prodId = ?1 AND c.currentCustomer.custId = ?2 AND c.cartCreatedOn = ?3")
	void deleteByProductsAndCurrentCustomerAndCartCreatedOn(Long prodId, Long custId, LocalDate localDate);

}
