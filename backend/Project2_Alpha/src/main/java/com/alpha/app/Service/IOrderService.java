package com.alpha.app.Service;

import org.springframework.http.ResponseEntity;

import com.alpha.app.DTO.OrderDTO;

public interface IOrderService {

	ResponseEntity<?> placeOrderDetails(OrderDTO orderDetails);

}
