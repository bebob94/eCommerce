package com.eCommerce.server.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import com.eCommerce.server.entity.Category;
import com.eCommerce.server.entity.Product;

public interface ProductRepository extends PagingAndSortingRepository<Product, Long>,CrudRepository<Product, Long>{
	List<Product> findByNameContainingIgnoreCase(String name);
	List<Product> findByCategory(Category category);
	List<Product> findByNameContains(String s);
}
