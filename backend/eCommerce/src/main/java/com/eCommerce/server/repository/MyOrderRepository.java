package com.eCommerce.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eCommerce.server.entity.MyOrder;

public interface MyOrderRepository extends JpaRepository<MyOrder, Long>{

}
