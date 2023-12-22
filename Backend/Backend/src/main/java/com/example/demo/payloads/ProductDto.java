package com.example.demo.payloads;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ProductDto 
{
	private Integer productId;
    private String productName;
    private String productDescription;
    private Integer productPrice;
    private Integer productDiscount; 
    private Integer productQuantity;
    private String productCategory;
    private Integer productQuantityAddedToCart;
    
}
