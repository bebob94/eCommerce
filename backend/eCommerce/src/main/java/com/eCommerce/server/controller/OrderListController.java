package com.eCommerce.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PathVariable;
import com.eCommerce.server.payload.OrderListDto;
import com.eCommerce.server.repository.OrderListRepository;
import com.eCommerce.server.service.OrderListService;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 6000000,allowCredentials = "true")
@RestController
@RequestMapping("/OrderList")
public class OrderListController {

	@Autowired
	OrderListRepository orderListRepo;
	
	@Autowired
	OrderListService orderListService;
	
	//<<<<<<<<<<<<<<<<<<<<<<<<< METODO POST>>>>>>>>>>>>>>>>>>>>>>>>>
	@PostMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<String> addOrderList(@RequestBody OrderListDto orderList, @PathVariable Long id){
		return new ResponseEntity<String>(orderListService.createOrderList(orderList,id),HttpStatus.CREATED);
	}
	
	//<<<<<<<<<<<<<<<<<<<<<<<<< METODO GET>>>>>>>>>>>>>>>>>>>>>>>>>
	@GetMapping("/{id}")
	public ResponseEntity<?> getUserOrders(@PathVariable Long id){
		return new ResponseEntity<>(orderListRepo.findDistinctByUserId(id),HttpStatus.OK);
	}
}
