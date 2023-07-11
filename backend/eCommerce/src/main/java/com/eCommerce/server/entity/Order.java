package com.eCommerce.server.entity;

import java.util.List;

import com.eCommerce.auth.entity.User;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name="order")
public class Order {
	   
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	private Double total;
	private OrderStatus orderStatus;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	private User user;
	@OneToMany
	private List<Product> products;
	@OneToOne
	private Cart cart;
}
