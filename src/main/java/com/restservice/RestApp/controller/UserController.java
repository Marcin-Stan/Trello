package com.restservice.RestApp.controller;

import com.restservice.RestApp.model.Status;
import com.restservice.RestApp.model.User;
import com.restservice.RestApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.ArrayList;
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

    @PostMapping("/users/getUserByDisplayName")
    public ResponseEntity<User> getUserByDisplayName(String displayName){
        return ResponseEntity.ok(userRepository.findByDisplayName(displayName));
    }

    /*
    @GetMapping("/users")
    public List<User> getUsers(){
        return userRepository.findAll();
    }

     */

    @GetMapping("/users")
    public List<String> getUsersNickname(){
        List<String> usersNickname = new ArrayList<>();
        for(User user: userRepository.findAll()){
            usersNickname.add(user.getDisplayName());
        }
        return usersNickname;
    }


}
