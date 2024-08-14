package com.alpha.app.Repositiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alpha.app.Entity.ShoppingCart;

@Repository
public interface ShoppingCartRepositiory extends JpaRepository<ShoppingCart, Long>{

}
