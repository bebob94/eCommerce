package com.eCommerce.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eCommerce.server.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment,Long> {

}
