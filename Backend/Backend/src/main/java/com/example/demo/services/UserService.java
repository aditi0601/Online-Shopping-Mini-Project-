package com.example.demo.services;

import java.util.List;

import com.example.demo.payloads.UserDto;


public interface UserService 
{
	UserDto createUser(UserDto user);
	UserDto updateUser(UserDto user, Integer userId);
	UserDto getUserById(Integer userId);
	void deleteUser(Integer userId);
	UserDto getUserByuserEmail(String userEmail);
	UserDto updateUserAdress(Integer userId, String newAddress);
	
	
}
