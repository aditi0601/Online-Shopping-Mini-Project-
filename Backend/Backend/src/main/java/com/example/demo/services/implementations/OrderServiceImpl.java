package com.example.demo.services.implementations;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Cart;
import com.example.demo.entities.Order;
import com.example.demo.entities.User;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.repositories.CartRepo;
import com.example.demo.repositories.OrderRepo;
import com.example.demo.repositories.UserRepo;
import com.example.demo.services.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private CartRepo cartRepo;
	
	@Autowired 
	private OrderRepo orderRepo;
	
	@Override
	public Order placeOrder(User user) {
        // Check if a user with the specified userId exists
        Optional<User> existingUser = userRepo.findById(user.getUserId());

        if (existingUser.isEmpty()) {
            // Handle the case where the user does not exist
            throw new RuntimeException("User with userId " + user.getUserId() + " does not exist. Unable to place the order.");
        }

        // Get the user's cart
        Cart cart = cartRepo.findById(user.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "User", 0));

        if (cart == null || cart.getCartProducts().isEmpty()) {
            // Handle the case where the cart is empty or doesn't exist
            throw new RuntimeException("Cart is empty. Unable to place the order.");
        }

        // Create a new order
        Order order = new Order();
        order.setUser(existingUser.get()); // Use the existing user
        Date date = new Date();
        order.setDate(date);
        order.setProducts(new ArrayList<>(cart.getCartProducts()));

        // Save the order
        order = orderRepo.save(order);

        // Clear the cart
        cart.getCartProducts().clear();
        cartRepo.save(cart);

        return order;
    }


}
