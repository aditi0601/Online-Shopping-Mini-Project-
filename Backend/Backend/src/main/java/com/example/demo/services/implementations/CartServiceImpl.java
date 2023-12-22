package com.example.demo.services.implementations;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Cart;
import com.example.demo.entities.Product;
import com.example.demo.entities.User;
import com.example.demo.repositories.CartRepo;
import com.example.demo.repositories.ProductRepo;
import com.example.demo.services.CartService;
import com.example.demo.exceptions.ResourceNotFoundException;

@Service
public class CartServiceImpl implements CartService 
{
	@Autowired
	private CartRepo cartRepo;
	
	@Autowired
	private ProductRepo productRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	

	@Override
	public Cart addToCart(int cartId, int productId) 
	{
		Cart cart = this.cartRepo.findById(cartId).orElse(new Cart());
		
		Product product = this.productRepo.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product", "Id", productId));

	        cart.getCartProducts().add(product);
	        return cartRepo.save(cart);

	}
	
	@Override
	public Cart createCart(User user)
	{
		Cart cart = new Cart();
		cart.setUser(user);
		return cart;
	}
	
	@Override
	public Cart removeFromCart(int cartId, int productId) {

		Cart cart = this.cartRepo.findById(cartId).orElse(new Cart());
		
		Product product = this.productRepo.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product", "Id", productId));

        cart.getCartProducts().remove(product);
        return cartRepo.save(cart);
    }

}
