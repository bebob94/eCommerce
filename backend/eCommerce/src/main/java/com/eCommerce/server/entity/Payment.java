package com.eCommerce.server.entity;

import java.time.LocalDate;

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
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String provider;
	private LocalDate create_time;
	private String status;
	
	@ManyToOne
	private OrderList OrderList;
}
