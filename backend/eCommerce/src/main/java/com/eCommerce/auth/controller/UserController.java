package com.eCommerce.auth.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.eCommerce.auth.entity.User;
import com.eCommerce.auth.service.AuthServiceImpl;
import com.eCommerce.auth.service.UserService;

@RestController
@RequestMapping("/User")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 6000000, allowCredentials = "true")
public class UserController {
	
	@Autowired
	UserService userService;

	@Autowired
	AuthServiceImpl userServiceImp;
	
	//<<<<<<<<<<<<<<<<<<<<<<<<< INIZIO METODI GET>>>>>>>>>>>>>>>>>>>>>>>>>
		@GetMapping("/{id}")
		@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
		public ResponseEntity<User> trovaUserTramiteId(@PathVariable Long id) {
			return new ResponseEntity<User>(userService.findUserById(id),
					HttpStatus.OK);
		}
		
		@GetMapping("/username/{username}")
		@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
		public ResponseEntity<User> trovaUserTramiteUsername(@PathVariable String username) {
			return new ResponseEntity<User>(userService.findUserByUsername(username),
					HttpStatus.OK);
		}

		@GetMapping("/all")
		@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
		public ResponseEntity<List<User>> trovaUserAll() {
			return new ResponseEntity<List<User>>(userService.findAllUser(),
					HttpStatus.OK);
		}
		//<<<<<<<<<<<<<<<<<<<<<<<<< FINE METODI GET>>>>>>>>>>>>>>>>>>>>>>>>>

		
		//<<<<<<<<<<<<<<<<<<<<<<<<< INIZIO METODI DELETE>>>>>>>>>>>>>>>>>>>>>>>>>
		@DeleteMapping("/{id}")
		@PreAuthorize("hasRole('ADMIN')")
		public ResponseEntity<String> eliminaUser( @PathVariable Long id){
			return new ResponseEntity<String>(userService.removeUserById(id), HttpStatus.OK);
		}
		//<<<<<<<<<<<<<<<<<<<<<<<<< FINE METODI DELETE>>>>>>>>>>>>>>>>>>>>>>>>>
		
		
		//<<<<<<<<<<<<<<<<<<<<<<<<< INIZIO METODI PUT>>>>>>>>>>>>>>>>>>>>>>>>>
		@PutMapping()
		@PreAuthorize("hasRole('ADMIN') or hasRole('USER') ")
		public ResponseEntity<?> updateUser(@RequestBody User u) {
		    User existingUser = userService.findUserById(u.getId());

		    if (existingUser != null) {
		        existingUser.setName(u.getName());
		        existingUser.setImage(u.getImage());
		        existingUser.setAddress(u.getAddress());
		        existingUser.setEmail(u.getEmail());

		        User updatedUser = userService.updateUser(existingUser);

		        return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
		    } else {
		        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		    }
		}
		
		@PutMapping("/uploadimage/{id}") 
		 @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
		 public ResponseEntity<?> updateUtenteImage(@PathVariable Long id,@RequestParam("file") MultipartFile file){
		  return new ResponseEntity<User>(userServiceImp.updateUtenteImage(id, file),HttpStatus.OK);
		 }
		//<<<<<<<<<<<<<<<<<<<<<<<<< FINE METODI PUT>>>>>>>>>>>>>>>>>>>>>>>>>
		
}
