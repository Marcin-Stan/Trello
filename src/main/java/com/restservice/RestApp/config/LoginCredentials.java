package com.restservice.RestApp.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
public class LoginCredentials {
    private String username;
    private String password;
    private String displayName;
}
