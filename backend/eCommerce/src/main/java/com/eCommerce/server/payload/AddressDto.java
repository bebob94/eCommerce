package com.eCommerce.server.payload;

import lombok.Data;

@Data
public class AddressDto {
	
		private String state;
	    private String city;
	    private String street;
	    private String region;
	    private Long houseNumber;
	    private String cap;
}
