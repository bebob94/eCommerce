package com.eCommerce.server.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eCommerce.auth.entity.User;
import com.eCommerce.auth.repository.UserRepository;
import com.eCommerce.server.entity.Address;
import com.eCommerce.server.payload.AddressDto;
import com.eCommerce.server.repository.AddressRepository;

import jakarta.persistence.EntityNotFoundException;


@Service
public class AddressService {

	@Autowired
	AddressRepository addressRepo;
	@Autowired
	UserRepository userRepo;
	
	
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CREA ADDRESS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public String createAddress(AddressDto address, Long userId) {
		User u = userRepo.findById(userId).get();
		Address a= new Address();
		a.setState(address.getState());
		a.setCity(address.getCity());
		a.setStreet(address.getStreet());
		a.setRegion(address.getRegion());
		a.setHouseNumber(address.getHouseNumber());
		a.setCap(address.getCap());
		addressRepo.save(a);
		if (!u.getAddresses().contains(a)) {
			u.getAddresses().add(a);
			a.getUsers().add(u);
			userRepo.save(u);
		}
		return "Address added successfully";
	}
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CERCA ADDRESS PER ID>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public Address findAddressById(Long id) {
		if(!addressRepo.existsById(id)) {
			throw new EntityNotFoundException("Address not exists!!!");
		}else {
			return addressRepo.findById(id).get();
		}
	}
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MODIFICA ADDRESS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public Address updateAddress(Address a) {
		if(!addressRepo.existsById(a.getId())) {
			throw new EntityNotFoundException("Address not exists!!!");
		}else {
			addressRepo.save(a);
			return a;
		}
	}

//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RIMUOVI ADDRESS PER ID >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public String removeAddressById(Long id) {
		if (!addressRepo.existsById(id)) {
			throw new EntityNotFoundException("Address not exists!!!");
		} else {
			addressRepo.deleteById(id);
			return "Address delete";
		}
	}

}
