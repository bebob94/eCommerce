package com.eCommerce.server.payload;

import java.util.List;

import com.eCommerce.server.entity.Address;
import com.eCommerce.server.entity.MyOrder;
import com.eCommerce.server.entity.Payment;

import lombok.Data;

@Data
public class OrderListDto {

	private Address address;
	private List<MyOrder> orders;
	private List<Payment> payment;
	
}
