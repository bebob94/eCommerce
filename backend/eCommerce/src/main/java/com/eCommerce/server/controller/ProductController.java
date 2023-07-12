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
import com.eCommerce.server.payload.productDto;
import com.eCommerce.server.service.ProductService;


@CrossOrigin(origins = "http://localhost:3000", maxAge = 6000000,allowCredentials = "true")
@RestController
@RequestMapping("/product")
public class ProductController {

	@Autowired
	ProductService productService;
	
	//<<<<<<<<<<<<<<<<<<<<<<<<< METODO POST>>>>>>>>>>>>>>>>>>>>>>>>>
		@PostMapping(value="/add/{id}")
		@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
		public ResponseEntity<String> addProduct(@RequestBody productDto product){
			return new ResponseEntity<String>(productService.createProduct(product),HttpStatus.CREATED);
		}
		
		//<<<<<<<<<<<<<<<<<<<<<<<<< METODO PUT>>>>>>>>>>>>>>>>>>>>>>>>>
		@PutMapping()
		@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
		public ResponseEntity<?> updateProduct(@RequestBody Product product) {
			Product existingProduct=productService.findProductById(product.getId());
			 if (existingProduct != null) {
				 existingProduct.setName(product.getName());
				 existingProduct.setDescription(product.getDescription());
				 existingProduct.setPrice(product.getPrice());
				 existingProduct.setQuantity(product.getQuantity());
				 existingProduct.setCategory(product.getCategory());
				 existingProduct.setImage(product.getImage());
				 
				 Product updateProduct= productService.updateProduct(existingProduct);
				 return new ResponseEntity<Product>(updateProduct,HttpStatus.OK);
			 }else{
				 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			 }
		}
		
		//<<<<<<<<<<<<<<<<<<<<<<<<< METODO DELETE>>>>>>>>>>>>>>>>>>>>>>>>>
		@DeleteMapping("/{id}")
		@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
		public ResponseEntity<String> deleteProduct( @PathVariable Long id){
			return new ResponseEntity<String>(productService.removeProductById(id), HttpStatus.OK);
		}	
		
		//<<<<<<<<<<<<<<<<<<<<<<<<< METODI GET>>>>>>>>>>>>>>>>>>>>>>>>>
		@GetMapping("/{id}")
		public ResponseEntity<Product> getProductById(@PathVariable Long id){
			return new ResponseEntity<Product>(productService.findProductById(id),HttpStatus.OK);
		}
		
		@GetMapping("/all")
		public ResponseEntity<List<Product>> getAllProducts() {
			return new ResponseEntity<List<Product>>(productService.findAllProducts(),HttpStatus.OK);
		}
}
