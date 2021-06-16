package com.restservice.RestApp.controller;

import com.restservice.RestApp.config.LoginCredentials;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin (origins = "*", allowedHeaders = "*")
public class LoginController {

    @PostMapping("/login")
    public void login(@RequestBody LoginCredentials credentials) {
    }
}
