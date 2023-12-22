package com.example.demo.services;

import com.example.demo.entities.Cart;
import com.example.demo.entities.User;

public interface CartService 
{
	Cart addToCart(int cartId, int productId);
	
	Cart createCart(User user);
	
	Cart removeFromCart(int cartId, int productId);

}
