package com.eCommerce.server.controller;

import java.io.UnsupportedEncodingException;
import java.time.Duration;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.eCommerce.server.entity.Image;
import com.eCommerce.server.repository.ImageRepository;
import com.eCommerce.server.service.ImageService;

import org.springframework.core.io.Resource;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 6000000, allowCredentials = "true")
public class ImageController {
	 @Autowired
	  private ImageRepository imageRepository;
	 @Autowired
	 private ImageService imageService;
	 
	//<<<<<<<<<<<<<<<<<<<<<<<<< INIZIO METODI GET>>>>>>>>>>>>>>>>>>>>>>>>>
	 @GetMapping("/{id}")
	 public ResponseEntity<String> trovaImmagine(@PathVariable Long id) throws UnsupportedEncodingException {
	     Optional<Image> image = imageRepository.findById(id);
	     if (image.isPresent()) {
	         String encodedUrl = URLEncoder.encode("http://localhost:8080/api/images/immagini/" + id, StandardCharsets.UTF_8.toString());
	         String imageUrl = "http://localhost:8080/api/images/visualizza?imageUrl=" + encodedUrl;
	         return ResponseEntity.ok(imageUrl);
	     } else {
	         return ResponseEntity.notFound().build();
	     }
	 }
	 @GetMapping("/db/{id}")
	    public ResponseEntity<Resource> retrieve(@PathVariable  Long id) {
	        var image = imageRepository.findById(id);
	        var body = new ByteArrayResource(image.get().getData());

	        return ResponseEntity.ok()
	                .header(HttpHeaders.CONTENT_TYPE, image.get().getType())
	                .cacheControl(CacheControl.maxAge(Duration.ofSeconds(60)).cachePrivate().mustRevalidate())
	                .body(body);
	    }
	//<<<<<<<<<<<<<<<<<<<<<<<<< FINE METODI GET>>>>>>>>>>>>>>>>>>>>>>>>>
 
	//<<<<<<<<<<<<<<<<<<<<<<<<< INIZIO METODI POST>>>>>>>>>>>>>>>>>>>>>>>>>
	 @PostMapping("/upload")
	  public ResponseEntity<Image> uploadImage(@RequestParam("file") MultipartFile file) {
		 return new ResponseEntity<Image>(imageService.saveImage(file),HttpStatus.OK);
	  }
	//<<<<<<<<<<<<<<<<<<<<<<<<< FINE METODI POST>>>>>>>>>>>>>>>>>>>>>>>>>
		
}
