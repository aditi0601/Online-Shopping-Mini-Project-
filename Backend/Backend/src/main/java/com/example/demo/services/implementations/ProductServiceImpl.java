package com.example.demo.services.implementations;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.payloads.ProductDto;
import com.example.demo.repositories.ProductRepo;
import com.example.demo.services.ProductService;
import com.example.demo.entities.Product;
import com.example.demo.exceptions.ResourceNotFoundException;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepo productRepo;  
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public ProductDto createProduct(ProductDto productDto) 
	{
		Product prod = this.modelMapper.map(productDto, Product.class);
		Product createdprod = this.productRepo.save(prod);
		return this.modelMapper.map(createdprod, ProductDto.class);
	}

	@Override
	public ProductDto updateProduct(ProductDto productDto, Integer productId) {
		Product prod = this.productRepo.findById(productId).orElseThrow(()-> new ResourceNotFoundException("Product", "Product Id", productId));
		
		prod.setProductName(productDto.getProductName());
		prod.setProductDescription(productDto.getProductDescription());
		prod.setProductPrice(productDto.getProductPrice());
		prod.setProductDiscount(productDto.getProductDiscount());
		prod.setProductQuantity(productDto.getProductQuantity());
		
		Product updatedprod = this.productRepo.save(prod);
		
		return this.modelMapper.map(updatedprod, ProductDto.class);
	}

	@Override
	public void deleteProduct(Integer productId) 
	{
		Product prod = this.productRepo.findById(productId).orElseThrow(()-> new ResourceNotFoundException("Product", "Product Id", productId));
		this.productRepo.delete(prod); 
	}

	
	@Override
	public ProductDto getProductById(Integer productId) 
	{
		Product prod = this.productRepo.findById(productId).orElseThrow(()-> new ResourceNotFoundException("Product", "Product Id", productId));
		
		return this.modelMapper.map(prod, ProductDto.class);
	}

	@Override
	public List<ProductDto> getProductsByCategory(String productCategory) 
	{
	    List<Product> products = productRepo.findByProductCategory(productCategory);
	    return products.stream()
	            .map(product -> modelMapper.map(product, ProductDto.class))
	            .collect(Collectors.toList());
	}

	@Override
	public ProductDto updateQuantityParameter(Integer productId, Integer newParameter) 
	{
		Product prod = this.productRepo.findById(productId).orElseThrow(()-> new ResourceNotFoundException("Product", "Product Id", productId));
		prod.setProductQuantityAddedToCart(newParameter);
		Product updatedprod = this.productRepo.save(prod);
		return this.modelMapper.map(updatedprod, ProductDto.class);
	}
	
	@Override
	public List<ProductDto> getAllProducts() {
        List<Product> productList = productRepo.findAll();
        return productList.stream()
	            .map(product -> modelMapper.map(product, ProductDto.class))
	            .collect(Collectors.toList());
    }

}
