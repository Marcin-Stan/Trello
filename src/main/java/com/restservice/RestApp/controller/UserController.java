package com.restservice.RestApp.controller;

import com.restservice.RestApp.model.Status;
import com.restservice.RestApp.model.User;
import com.restservice.RestApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    
    @Autowired
    UserRepository userRepository;


    @PostMapping("/users/getUserByEmail")
    public User loginUser(String email) {
        return userRepository.findByEmail(email);
    }

    @DeleteMapping("/users/all")
    public Status deleteUsers() {
        userRepository.deleteAll();
        return Status.SUCCESS;
    }

    @GetMapping("/users")
    public List<User> getUsers(){
        return userRepository.findAll();
    }
}
