package com.eCommerce.server.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ShippingMethod {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Enumerated(EnumType.STRING)
	private Shipping_method name;
}