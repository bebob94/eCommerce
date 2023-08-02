package com.eCommerce.server.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eCommerce.auth.entity.User;
import com.eCommerce.auth.repository.UserRepository;
import com.eCommerce.server.entity.Address;
import com.eCommerce.server.entity.Review;
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
		AddAddressToUser(a, u);
		return "Address create successfully";
	}
	
	public String AddAddressToUser(Address a, User u) {
		
	    List<Address> userAddresses = u.getAddress();
	    userAddresses.add(a);
	    u.setAddress(userAddresses);
	    userRepo.save(u);
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
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CERCA TUTTI GLI ADDRESSES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public List<Address> findAllAddresses() {
		return (List<Address>) addressRepo.findAll();
	}
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CERCA TUTTI GLI ADDRESSES DI UN USER>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public List<Address> findAllAddressesByUserId(Long userId) {
		User u= userRepo.findById(userId).get();
		return u.getAddress();
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
	        Address addressToRemove = addressRepo.findById(id).orElse(null);
	        if (addressToRemove != null) {
	            List<User> users = addressToRemove.getUsers();
	            for (User user : users) {
	                user.getAddress().remove(addressToRemove);
	            }
	            userRepo.saveAll(users); // Salva gli utenti aggiornati senza l'indirizzo da rimuovere
	        }
	        addressRepo.deleteById(id); // Ora puoi eliminare l'indirizzo
	        return "Address delete";
	    }
	}

}
