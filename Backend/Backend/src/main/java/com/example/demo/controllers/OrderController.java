package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.User;
import com.example.demo.entities.Order;
import com.example.demo.entities.Product;
import com.example.demo.repositories.OrderRepo;
import com.example.demo.repositories.UserRepo;
import com.example.demo.services.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController 
{
	@Autowired
	private OrderService orderService;
	
	
	@Autowired
	private OrderRepo orderRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@PostMapping("/place")
    public ResponseEntity<String> placeOrder(@RequestBody User user) {
        try {
            Order order = orderService.placeOrder(user);
            return new ResponseEntity<>("Order placed successfully. Order ID: " + order.getOrder_id(), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
	
	@GetMapping("/user/{userId}")
    public ResponseEntity<List<Product>> getCartProducts(@PathVariable int userId) {
        Optional<User> userOptional = userRepo.findById(userId);
        
        if (userOptional.isPresent()) {
            List<Product> orders = userOptional.get().getOrder().getProducts();
            return ResponseEntity.ok(orders);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	
	
	

}
