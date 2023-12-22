package com.example.demo.entities;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer productId;
    private String productName;
    private String productDescription;
    private Integer productPrice;
    private Integer productDiscount; 
    private Integer productQuantity;
    private String productCategory;
    private Integer productQuantityAddedToCart;
    
}
