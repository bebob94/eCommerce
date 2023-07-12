package com.eCommerce.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eCommerce.server.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long>{
	
	Optional<Address> findByStateAndCityAndStreetAndRegionAndCap(String State,String City,String Street,String Region,String Cap );

}
