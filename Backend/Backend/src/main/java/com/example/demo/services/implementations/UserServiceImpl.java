package com.example.demo.services.implementations;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Cart;
import com.example.demo.entities.User;
import com.example.demo.payloads.UserDto;
import com.example.demo.repositories.UserRepo;
import com.example.demo.services.CartService;
import com.example.demo.services.UserService;
import com.example.demo.exceptions.ResourceNotFoundException;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private CartService cartService;
	
	
	
	@Override
	public UserDto createUser(UserDto userDto) {
		
		User user = this.dtotoUser(userDto);
		
		Cart cart = this.cartService.createCart(user);
		user.setCart(cart);
		User savedUser = this.userRepo.save(user);
		return this.usertoDto(savedUser);
	}

	@Override
	public UserDto updateUser(UserDto userDto, Integer userId) 
	{
		User user = this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User", "Id", userId));
		user.setUserFirstName(userDto.getUserFirstName());
		user.setUserLastName(userDto.getUserLastName());
		user.setUserMobileNumber(userDto.getUserMobileNumber());
		
		User updatedUser = this.userRepo.save(user);
		return this.usertoDto(updatedUser);
	}

	@Override
	public UserDto getUserById(Integer userId) {
		User user = this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User", "Id", userId));
		
		return this.usertoDto(user);
	}

	@Override
	public void deleteUser(Integer userId) {
		User user = this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User", "Id", userId));
		this.userRepo.delete(user);
	}
	
	@Override
	public UserDto getUserByuserEmail(String userEmail) {
		User user = userRepo.findByuserEmail(userEmail).orElseThrow(() -> new ResourceNotFoundException("User", "userEmail", 0));

	    return usertoDto(user);
	}
	
	private User dtotoUser(UserDto userDto)
	{
		User user = this.modelMapper.map(userDto, User.class);
		return user;
	}
	
	
	private UserDto usertoDto(User user)
	{
		UserDto userDto = this.modelMapper.map(user, UserDto.class);
		return userDto;
	}

	@Override
	public UserDto updateUserAdress(Integer userId, String newAddress) 
	{
		User user = this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User", "Id", userId));
		user.setUserAddress(newAddress);
		User updatedUser = this.userRepo.save(user);
		return this.modelMapper.map(updatedUser, UserDto.class);
	}

	
	
}
