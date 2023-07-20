package com.eCommerce.server.entity;



import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class MyOrder {
	   
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@ManyToOne
	private Product product;
	@ManyToOne
	private OrderList orderList;
	private int quantity;
	private double price;
}