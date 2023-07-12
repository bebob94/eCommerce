package com.eCommerce.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eCommerce.server.entity.Product;
import com.eCommerce.server.payload.productDto;
import com.eCommerce.server.repository.ProductRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductService {

	@Autowired
	ProductRepository productRepo;
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CREA PRODUCT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public String createProduct(productDto product) {
		Product p= new Product();
		p.setName(product.getName());
		p.setDescription(product.getDescription());
		p.setPrice(product.getPrice());
		p.setQuantity(product.getQuantity());
		p.setCategory(product.getCategory());
		p.setImage(product.getImage());
		productRepo.save(p);
		return "Product added successfully";
	}
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CERCA PRODUCT PER ID>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public Product findProductById(Long id) {
		if(!productRepo.existsById(id)) {
			throw new EntityNotFoundException("Product not exists!!!");
		}else {
			return productRepo.findById(id).get();
		}
	}
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CERCA TUTTI I PRODUCT>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public List<Product> findAllProducts() {
		return (List<Product>) productRepo.findAll();
	}
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MODIFICA PRODUCT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>	
	public Product updateProduct(Product p) {
		if(!productRepo.existsById(p.getId())) {
			throw new EntityNotFoundException("Product not exists!!!");
		}else {
			productRepo.save(p);
			return p;
		}
	}
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RIMUOVI ADDRESS PER ID >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public String removeProductById(Long id) {
		if (!productRepo.existsById(id)) {
			throw new EntityNotFoundException("Address not exists!!!");
		} else {
			productRepo.deleteById(id);
			return "Product delete";
		}
	}
}
