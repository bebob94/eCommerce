package com.eCommerce.server.payload;

import java.util.List;

import com.eCommerce.server.entity.Address;
import com.eCommerce.server.entity.MyOrder;
import com.eCommerce.server.entity.Payment;
import com.eCommerce.server.entity.ShippingMethod;

import lombok.Data;

@Data
public class OrderListDto {

	private Address address;
	private List<MyOrder> orders;
	private ShippingMethod shippingMethod;
	private List<Payment> payment;
	
}
