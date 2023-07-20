package com.eCommerce.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eCommerce.server.entity.Review;

public interface ReviewRepository extends JpaRepository<Review,Long> {

}
