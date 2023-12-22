package com.example.demo.payloads;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserDto 
{
	private int userId;
	private String userFirstName;
	private String userLastName;
	private String userEmail;
	private String userPassword;
	private String userMobileNumber;
	private String userGender;
	private String userAddress;
	
	

}
