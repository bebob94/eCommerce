package com.eCommerce.server.payload;

import com.eCommerce.server.entity.Category;

import lombok.Data;

@Data
public class productDto {

	private String name;
	private String description;
	private Double price;
	private Long quantity;
	private Category category;
	private String image;
}
