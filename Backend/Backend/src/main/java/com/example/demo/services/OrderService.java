package com.example.demo.services;

import com.example.demo.entities.Order;
import com.example.demo.entities.User;

public interface OrderService {
	
	Order placeOrder(User user);

}
