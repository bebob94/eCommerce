package com.eCommerce.server.payload;


import lombok.Data;

@Data
public class ReviewDto {
	
	private Long user_id;
	private Long product_id;
	private String comment;
	private int valutation;
}
