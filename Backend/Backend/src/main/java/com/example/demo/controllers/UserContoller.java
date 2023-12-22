package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Product;
import com.example.demo.entities.User;
import com.example.demo.payloads.ApiResponse;
import com.example.demo.payloads.UserDto;
import com.example.demo.repositories.UserRepo;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserContoller 
{
	@Autowired
	private UserService userservice;
	
	@Autowired
	private UserRepo userRepo;
	
	
	//Post - create user
	@PostMapping("/")
	public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
		UserDto createUserDto = this.userservice.createUser(userDto);
		return new ResponseEntity<>(createUserDto, HttpStatus.CREATED);
	}
	
	//Put - update user
	@PutMapping("/{userId}")
	public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto, @PathVariable Integer userId)
	{
		UserDto updatedUser = this.userservice.updateUser(userDto, userId);
		return ResponseEntity.ok(updatedUser);
	}
	
	//Delete - delete user
	@DeleteMapping("/{userId}")
	public ResponseEntity<ApiResponse> deleteUser(@PathVariable Integer userId)
	{
		this.userservice.deleteUser(userId);
		return new ResponseEntity<ApiResponse>(new ApiResponse("User Deleted Successfully" , true), HttpStatus.OK);
	}
	
	
	
	//Get - get user
	@GetMapping("/{userId}")
	public ResponseEntity<UserDto> getUserById(@PathVariable Integer userId)
	{
		return ResponseEntity.ok(this.userservice.getUserById(userId));
	}
	
	@GetMapping("/username/{userEmail}")
	public ResponseEntity<UserDto> getUserByuserEmail(@PathVariable String userEmail)
	{
		return ResponseEntity.ok(this.userservice.getUserByuserEmail(userEmail));
	}
	
	@GetMapping("/cartProducts/{userId}")
	public ResponseEntity<List<Product>> getCartProducts(@PathVariable int userId) {
        Optional<User> userOptional = userRepo.findById(userId);
        
        if (userOptional.isPresent()) {
            List<Product> cartProducts = userOptional.get().getCart().getCartProducts();
            return ResponseEntity.ok(cartProducts);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	@PutMapping("/updateUserAdress/{userId}/{userAddress}")
	public ResponseEntity<UserDto> updateUserAdress(@PathVariable Integer userId, @PathVariable String userAddress)
	{
		UserDto updateUser = this.userservice.updateUserAdress(userId, userAddress);
		return new ResponseEntity<UserDto>(updateUser, HttpStatus.OK);
	}
	
	
	
	

}
