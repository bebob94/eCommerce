package com.eCommerce.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eCommerce.server.entity.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

}
