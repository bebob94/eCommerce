package com.eCommerce.server.entity;


import java.util.List;

import com.eCommerce.auth.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
public class Address {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String state;
    private String city;
    private String street;
    private String region;
    private Long houseNumber;
    private String cap;
    
    @JsonIgnore
	@ManyToMany(mappedBy = "address")
	private List<User> users;
	
}
