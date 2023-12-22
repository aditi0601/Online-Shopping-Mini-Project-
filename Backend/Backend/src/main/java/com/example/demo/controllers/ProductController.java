package com.example.demo.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.payloads.ApiResponse;
import com.example.demo.payloads.ProductDto;
import com.example.demo.services.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController 
{
	@Autowired
	private ProductService productservice;
	
	
	
	
	
	@PostMapping(value="/")
	public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productdto)
	{
		ProductDto createProductDto = this.productservice.createProduct(productdto);
	
		return new ResponseEntity<ProductDto>(createProductDto, HttpStatus.CREATED);
	}
	
	
	@PutMapping("/{productId}")
	public ResponseEntity<ProductDto> updateProduct(@RequestBody ProductDto productdto, @PathVariable Integer productId)
	{
		ProductDto updateProductDto = this.productservice.updateProduct(productdto, productId);
		return new ResponseEntity<ProductDto>(updateProductDto, HttpStatus.OK);
	}
	
	
	@DeleteMapping("/{productId}")
	public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Integer productId)
	{
		this.productservice.deleteProduct(productId);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Product Deleted Successfully" , true), HttpStatus.OK);
	}
	
	
	@GetMapping("/{productId}")
	public ResponseEntity<ProductDto> getProduct(@PathVariable Integer productId)
	{
		ProductDto getProductDto = this.productservice.getProductById(productId);
		return new ResponseEntity<ProductDto>(getProductDto, HttpStatus.OK);
	}
	
	@GetMapping("/getAllProducts")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<ProductDto> allProducts = productservice.getAllProducts();
        return new ResponseEntity<>(allProducts, HttpStatus.OK);
    }
	
	
	@GetMapping("/byCategory/{category}")
	public ResponseEntity<List<ProductDto>> getProductsByCategory(@PathVariable String category) {
	    List<ProductDto> productsByCategory = productservice.getProductsByCategory(category);
	    return new ResponseEntity<>(productsByCategory, HttpStatus.OK);
	}
	
	@PutMapping("/updateQuantityParameter/{productId}/{newParameter}")
	public ResponseEntity<ProductDto> updateQuantityParameter(@PathVariable Integer productId, @PathVariable Integer newParameter)
	{
		ProductDto updateProd = this.productservice.updateQuantityParameter(productId, newParameter);
		return new ResponseEntity<ProductDto>(updateProd, HttpStatus.OK);
	}

	
	

}
