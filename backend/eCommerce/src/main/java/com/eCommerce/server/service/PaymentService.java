package com.eCommerce.server.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eCommerce.server.entity.OrderList;
import com.eCommerce.server.entity.Payment;
import com.eCommerce.server.repository.PaymentRepository;

@Service
public class PaymentService {

	@Autowired
	PaymentRepository paymentRepo;
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CREA PAYMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public Payment createNewPayment(String a1,String a2,OrderList ol) {
		Payment p = new Payment();
		p.setCreate_time(LocalDate.now());
		p.setProvider(a1);
		p.setStatus(a2);
		p.setOrderList(ol);;
		paymentRepo.save(p);
		return p;
	}
	
}
