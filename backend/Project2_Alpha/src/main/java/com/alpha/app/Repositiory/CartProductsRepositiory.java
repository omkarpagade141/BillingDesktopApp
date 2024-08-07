package com.alpha.app.Repositiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alpha.app.Entity.CartProducts;

@Repository
public interface CartProductsRepositiory extends JpaRepository<CartProducts, Long>{

}
