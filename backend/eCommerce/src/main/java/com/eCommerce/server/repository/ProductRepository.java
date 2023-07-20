package com.eCommerce.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eCommerce.server.entity.Category;
import com.eCommerce.server.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
	List<Product> findByNameContainingIgnoreCase(String name);
	List<Product> findByCategory(Category category);
}
