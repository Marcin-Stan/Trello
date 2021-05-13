package com.restservice.RestApp.controller;

import com.restservice.RestApp.config.LoginCredentials;
import com.restservice.RestApp.model.Authorities;
import com.restservice.RestApp.model.Status;
import com.restservice.RestApp.model.User;
import com.restservice.RestApp.repository.AuthoritiesRepository;
import com.restservice.RestApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.List;

@Controller
public class RegisterController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthoritiesRepository authoritiesRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/register")
    public ResponseEntity processRegister(@RequestBody LoginCredentials credentials) {
        String encodedPassword = bCryptPasswordEncoder.encode(credentials.getPassword());
        User user = new User();
        user.setEmail(credentials.getUsername());
        user.setPassword(encodedPassword);
        user.setEnabled(true);

        return ResponseEntity.ok(userRepository.save(user));
    }

    @PostMapping("/addAuthorities")
    public ResponseEntity addAuthorities(String username) {

        Authorities authorities = new Authorities();
        authorities.setUsername(username);
        authorities.setAuthority("USER");

        return ResponseEntity.ok( authoritiesRepository.save(authorities));
    }

}
