package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Cart;
import com.example.demo.services.CartService;
import com.fasterxml.jackson.annotation.JsonIgnore;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController 
{
	@Autowired
	private CartService cartService;
	
	@PostMapping("/AddToCart/{userid}/{productid}")
	@JsonIgnore
	public ResponseEntity<Cart> addToCart(@PathVariable Integer userid, @PathVariable Integer productid)
	{
		Cart updatedCart = cartService.addToCart(userid, productid);
		return ResponseEntity.ok(updatedCart);
			
	}
	
	
	@DeleteMapping("/DeleteFromCart/{cartId}/{productId}")
    public ResponseEntity<Cart> removeFromCart(@PathVariable int cartId, @PathVariable int productId) {
        Cart updatedCart = cartService.removeFromCart(cartId, productId);
        return ResponseEntity.ok(updatedCart);
    }
	

}
