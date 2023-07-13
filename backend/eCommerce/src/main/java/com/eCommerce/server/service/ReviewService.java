package com.eCommerce.server.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eCommerce.auth.entity.User;
import com.eCommerce.auth.repository.UserRepository;
import com.eCommerce.server.entity.Product;
import com.eCommerce.server.entity.Review;
import com.eCommerce.server.payload.ReviewDto;
import com.eCommerce.server.repository.ProductRepository;
import com.eCommerce.server.repository.ReviewRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ReviewService {

	@Autowired
	UserRepository userRepo;
	@Autowired
	ProductRepository productRepo;
	@Autowired
	ReviewRepository reviewRepo;
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CREA REVIEW >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public String createReview(ReviewDto review) {
		User u= userRepo.findById(review.getUser_id()).get();
		Product p = productRepo.findById(review.getProduct_id()).get();
		
		Review r = new Review();
		if(review.getValutation()>0 &  review.getValutation() <=10 ) {
			r.setUser(u);
			r.setProduct(p);
			r.setComment(review.getComment());
			r.setPublished(LocalDate.now());
			r.setValutation(review.getValutation());
			reviewRepo.save(r);
			return "Review added successfully";
		}else {
			return "error valutation";
		
		}
	}
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CERCA REVIEW PER ID>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public Review findReviewById(Long id) {
		if(!reviewRepo.existsById(id)) {
			throw new EntityNotFoundException("Review not exists!!!");
		}else {
			return reviewRepo.findById(id).get();
		}
	}
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CERCA TUTTI I REVIEW>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public List<Review> findAllReviews() {
		return (List<Review>) reviewRepo.findAll();
	}
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MODIFICA REVIEW >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>	
	public Review updateReview(Review r) {
		if(!reviewRepo.existsById(r.getId())) {
			throw new EntityNotFoundException("Review not exists!!!");
		}else {
			reviewRepo.save(r);
			return r;
		}
	}	
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RIMUOVI REVIEW BY ID>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public String removeReviewById(Long id) {
		if (!reviewRepo.existsById(id)) {
			throw new EntityNotFoundException("Review not exists!!!");
		} else {
			reviewRepo.deleteById(id);
			return "Review delete";
		}
	}
	
}
