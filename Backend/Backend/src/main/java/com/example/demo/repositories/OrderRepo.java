package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Order;
public interface OrderRepo extends JpaRepository<Order, Integer> {

}