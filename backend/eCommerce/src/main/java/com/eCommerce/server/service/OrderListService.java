package com.eCommerce.server.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eCommerce.auth.entity.User;
import com.eCommerce.auth.repository.UserRepository;
import com.eCommerce.server.entity.MyOrder;
import com.eCommerce.server.entity.OrderList;
import com.eCommerce.server.entity.OrderStatus;
import com.eCommerce.server.entity.Payment;
import com.eCommerce.server.payload.OrderListDto;
import com.eCommerce.server.repository.AddressRepository;
import com.eCommerce.server.repository.MyOrderRepository;
import com.eCommerce.server.repository.OrderListRepository;
import com.eCommerce.server.repository.PaymentRepository;
import com.eCommerce.server.repository.ShippingMethodRepository;

@Service
public class OrderListService {
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	AddressRepository adressRepo;
	
	@Autowired
	MyOrderRepository myOrderRepo;
	
	@Autowired
	OrderListRepository OrderListRepo;
	
	@Autowired
	ShippingMethodRepository shippingMethodRepo;
	
	@Autowired
	PaymentRepository paymentRepo;
	
	@Autowired
	PaymentService paymentService;


//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CREA ORDERLIST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
public String createOrderList(OrderListDto orderList, Long user_id) {
	OrderList ol = new OrderList();
	User u = userRepo.findById(user_id).get();
	ol.setUser(u);
	ol.setInitializedOrder(LocalDate.now());
	ol.setAddress(orderList.getAddress());
	ol.setOrderStatus(OrderStatus.CONFIRMED);
	ol.setShippingMethod(orderList.getShippingMethod());
	
	//ORDERLIST
	Set<MyOrder> uniqueOrder= new HashSet<>(orderList.getOrders());
	List<MyOrder> MyOrder= new ArrayList<>(uniqueOrder);
	ol.setOrders(MyOrder);
	ol.getOrders().forEach(e->e.setOrderList(ol));
	
	//TOTAL PRICE
	double total=0;
	for(MyOrder o : orderList.getOrders()) {
		total += o.getPrice();
	}
	double totalRounded= Math.round(total *100)/100;		
	ol.setTotalPrice(totalRounded);
	OrderListRepo.save(ol);
	
	//PAYMENT
	List<Payment> payment = new ArrayList<>();
	orderList.getPayment().forEach(e->{
		Payment p = paymentService.createNewPayment(e.getProvider(), e.getStatus(),ol);
		payment.add(p);
	});
	ol.setPayment(payment);
	ol.getPayment().forEach(e->e.setOrderList(ol));
	return "OrderList added successfully";
}

}