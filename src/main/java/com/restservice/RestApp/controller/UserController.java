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
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    
    @Autowired
    UserRepository userRepository;

    @PostMapping("/users/register")
    public Status registerUser(@Valid @RequestBody User newUser) {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            if (user.equals(newUser)) {
                return Status.USER_ALREADY_EXISTS;
            }
        }
        userRepository.save(newUser);
        return Status.SUCCESS;
    }

    @PostMapping("/users/login")
    public String loginUser(@Valid @RequestBody User user) {
        List<User> users = userRepository.findAll();
        User usertest = userRepository.findByEmail(user.getEmail());
        String password = user.getPassword();
        String email = user.getEmail();
        for (User other : users) {
            if (other.getPassword().equals(password) && other.getEmail().equals(email)) {
                usertest.setLoggedIn(true);
                userRepository.save(usertest);
                return usertest.getId().toString();
            }
        }
        return "-1";
    }

    @PostMapping("/users/logout")
    public Status logUserOut(@RequestBody User user) {
        List<User> users = userRepository.findAll();
        Optional<User> user1 = userRepository.findById(user.getId());

        if(!user1.isEmpty()){
            for (User other : users) {
                if (other.equals(user1.get())) {
                    user.setLoggedIn(false);
                    userRepository.save(user1.get());
                    return Status.SUCCESS;
                }
            }
        }

        return Status.FAILURE;
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
