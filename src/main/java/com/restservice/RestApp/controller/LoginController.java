package com.restservice.RestApp.controller;

import com.restservice.RestApp.config.LoginCredentials;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin (origins = "*", allowedHeaders = "*")
public class LoginController {

    @PostMapping("/login")
    public void login(@RequestBody LoginCredentials credentials) {

    }
}
