package com.example.demo.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter

public class User 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;
	private String userFirstName;
	private String userLastName;
	private String userEmail;
	private String userPassword;
	private String userMobileNumber;
	private String userGender;
	private String userAddress;
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
	private Cart cart;
	
	
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
	private Order order;
	
	
	
	

}
