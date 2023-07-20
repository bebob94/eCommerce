package com.eCommerce.server.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eCommerce.server.entity.OrderList;
import com.eCommerce.server.entity.OrderStatus;

public interface OrderListRepository extends JpaRepository<OrderList, Long>{
	List<OrderList> findDistinctByUserId(Long userId);
	List<OrderList> findByOrderStatus(OrderStatus orderStatus);
	List<OrderList> findByInitializedOrder(LocalDate initializedOrder);
}
