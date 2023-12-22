package com.example.demo.services;


import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.demo.payloads.ProductDto;

public interface ProductService 
{
	ProductDto createProduct(ProductDto productDto);
	
	ProductDto updateProduct(ProductDto productDto, Integer productId);
	
	void deleteProduct(Integer productId);
	
	ProductDto getProductById(Integer productId);
	
	List<ProductDto> getProductsByCategory(String productCategory);
	
	ProductDto updateQuantityParameter(Integer productId, Integer newParameter);
	
	List<ProductDto> getAllProducts();
	

}
