package com.example.demo.exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceNotFoundException extends RuntimeException
{
	String resourceName;
	String filedName;
	long filedvalue;
	public ResourceNotFoundException(String resourceName, String filedName, long filedvalue) {
		super(String.format("%s not found wiht %s : %s", resourceName, filedName, filedvalue));
		this.resourceName = resourceName;
		this.filedName = filedName;
		this.filedvalue = filedvalue;
	}
	
	
	
	

}
