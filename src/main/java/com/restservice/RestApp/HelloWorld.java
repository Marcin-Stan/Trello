package com.restservice.RestApp;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorld {
    @RequestMapping("/1")
    public String index(){
        //test
        //test
        //test
        return "Karolak aktor wybitny";
    }
}