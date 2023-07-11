package com.eCommerce.auth.service;

import com.eCommerce.auth.payload.LoginDto;
import com.eCommerce.auth.payload.RegisterDto;

public interface AuthService {
    
	String login(LoginDto loginDto);
    String register(RegisterDto registerDto);
    
}
