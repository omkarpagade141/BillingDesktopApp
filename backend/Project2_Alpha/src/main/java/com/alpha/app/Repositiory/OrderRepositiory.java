package com.alpha.app.Repositiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alpha.app.Entity.Order;

@Repository
public interface OrderRepositiory extends JpaRepository<Order, Long>{

}
