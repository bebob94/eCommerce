package com.eCommerce.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eCommerce.server.entity.Address;
import com.eCommerce.server.entity.Review;
import com.eCommerce.server.payload.AddressDto;
import com.eCommerce.server.service.AddressService;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 6000000,allowCredentials = "true")
@RestController
@RequestMapping("/address")
public class AddressController {

	@Autowired
	AddressService addressService;
	
	//<<<<<<<<<<<<<<<<<<<<<<<<< METODO POST>>>>>>>>>>>>>>>>>>>>>>>>>
	@PostMapping(value="/add/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<String> addAddressToUser(@RequestBody AddressDto address,@PathVariable Long id){
		return new ResponseEntity<String>(addressService.createAddress(address, id),HttpStatus.CREATED);
	}
	
	//<<<<<<<<<<<<<<<<<<<<<<<<< METODO PUT>>>>>>>>>>>>>>>>>>>>>>>>>
	@PutMapping()
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> updateAddress(@RequestBody Address address) {
		Address existingAddress=addressService.findAddressById(address.getId());
		 if (existingAddress != null) {
			 existingAddress.setState(address.getState());
			 existingAddress.setCity(address.getCity());
			 existingAddress.setStreet(address.getStreet());
			 existingAddress.setRegion(address.getRegion());
			 existingAddress.setHouseNumber(address.getHouseNumber());
			 existingAddress.setCap(address.getCap());
			 
			 Address updateAddress= addressService.updateAddress(existingAddress);
			 return new ResponseEntity<Address>(updateAddress,HttpStatus.OK);
		 }else{
			 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		 }
	}
	
	//<<<<<<<<<<<<<<<<<<<<<<<<< METODO DELETE>>>>>>>>>>>>>>>>>>>>>>>>>
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<String> deleteAddress( @PathVariable Long id){
		return new ResponseEntity<String>(addressService.removeAddressById(id), HttpStatus.OK);
	}
	
	//<<<<<<<<<<<<<<<<<<<<<<<<< METODI GET>>>>>>>>>>>>>>>>>>>>>>>>>
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<Address> getProductById(@PathVariable Long id){
		return new ResponseEntity<Address>(addressService.findAddressById(id),HttpStatus.OK);
	}
	
	@GetMapping("/all")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<Address>> getAllAddresses() {
		return new ResponseEntity<List<Address>>(addressService.findAllAddresses(),HttpStatus.OK);
	}	
	@GetMapping("/all/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<Address>> AllAddressesByUserId(@PathVariable Long id) {
		return new ResponseEntity<List<Address>>(addressService.findAllAddressesByUserId(id),HttpStatus.OK);
	}	
	
	
}


