package com.alpha.app.Repositiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alpha.app.Entity.Product;

@Repository
public interface ProductRepositiory extends JpaRepository<Product, Long>{

}
