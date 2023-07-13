package com.eCommerce.server.entity;

import java.time.LocalDate;
import java.util.List;

import com.eCommerce.auth.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
	private LocalDate initializedOrder;
	private double totalPrice;
	@Enumerated(EnumType.STRING)
	private OrderStatus orderStatus;
	@ManyToOne
	private User user;
	
	@ManyToOne
	@JsonIgnoreProperties
	private Address address;
	
	@JsonIgnoreProperties(value = "OrderList")
	@OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
	private List<MyOrder> orders;
	
	@JsonIgnoreProperties(value = "OrderList")
	@OneToMany(mappedBy = "OrderList")
	private List<Payment> payment;
}
