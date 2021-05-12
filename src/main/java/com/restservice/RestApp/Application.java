package com.restservice.RestApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        System.out.println("{bcrypt}" + new BCryptPasswordEncoder().encode("dupa"));
        SpringApplication.run(Application.class, args);
    }


}