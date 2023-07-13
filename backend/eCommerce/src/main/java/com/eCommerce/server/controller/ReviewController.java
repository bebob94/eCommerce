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

import com.eCommerce.server.entity.Product;
import com.eCommerce.server.entity.Review;
import com.eCommerce.server.payload.ReviewDto;
import com.eCommerce.server.repository.ProductRepository;
import com.eCommerce.server.repository.ReviewRepository;
import com.eCommerce.server.service.ReviewService;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 6000000)
@RestController
@RequestMapping("/review")
public class ReviewController {
	
	@Autowired
	ReviewService reviewService;
	@Autowired
	ReviewRepository reviewRepo;
	@Autowired
	ProductRepository productRepo;
	
	
	//<<<<<<<<<<<<<<<<<<<<<<<<< METODO POST>>>>>>>>>>>>>>>>>>>>>>>>>
	@PostMapping("/add")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<String> postNewComment(@RequestBody ReviewDto review){
		return new ResponseEntity<String>(reviewService.createReview(review),HttpStatus.OK);
	}
	
	//<<<<<<<<<<<<<<<<<<<<<<<<< METODO PUT>>>>>>>>>>>>>>>>>>>>>>>>>
	@PutMapping()
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public ResponseEntity<?> updateRecensione(@RequestBody Review r){
		return new ResponseEntity<Review>(reviewService.updateReview(r),HttpStatus.OK);
	}	
	
	//<<<<<<<<<<<<<<<<<<<<<<<<< METODO DELETE>>>>>>>>>>>>>>>>>>>>>>>>>	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public ResponseEntity<String> eliminaReview( @PathVariable Long id){
		return new ResponseEntity<String>(reviewService.removeReviewById(id), HttpStatus.OK);
	}
	
	//<<<<<<<<<<<<<<<<<<<<<<<<< METODI GET>>>>>>>>>>>>>>>>>>>>>>>>>
			@GetMapping("/{id}")
			@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
			public ResponseEntity<Review> getProductById(@PathVariable Long id){
				return new ResponseEntity<Review>(reviewService.findReviewById(id),HttpStatus.OK);
			}
			
			@GetMapping("/all")
			@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
			public ResponseEntity<List<Review>> getAllProducts() {
				return new ResponseEntity<List<Review>>(reviewService.findAllReviews(),HttpStatus.OK);
			}	
}
