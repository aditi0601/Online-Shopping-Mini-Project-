package com.example.demo.payloads;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.entities.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartDto 
{
	private int cartId;
	private List<Product> cartProducts = new ArrayList<>();
	private int userId;
	
	

}
