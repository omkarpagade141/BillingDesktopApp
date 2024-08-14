package com.alpha.app.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alpha.app.DTO.OrderDTO;
import com.alpha.app.Service.IOrderService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/order")
public class OrderController {
	
	@Autowired
	private IOrderService orderService;

	@PostMapping("/place-order")
	ResponseEntity<?> placedOrder(@RequestBody OrderDTO orderDetails)
	{
		return orderService.placeOrderDetails(orderDetails);
	}
}
