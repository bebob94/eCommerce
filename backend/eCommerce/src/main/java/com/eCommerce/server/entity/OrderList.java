package com.eCommerce.server.entity;

import java.time.LocalDate;
import java.util.List;

import com.eCommerce.auth.entity.User;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class OrderList {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@ManyToOne
	private User user;
	private LocalDate initializedOrder;
	private LocalDate scheduledDelivery;
	private double totalPrice;
	private OrderStatus orderStatus;
	
	@OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
	private List<Order> orders;
	
	@ManyToOne
	private ShippingMethod shippingMethod;
	
	@OneToMany(mappedBy = "OrderList")
	private List<Payment> payment;
}
