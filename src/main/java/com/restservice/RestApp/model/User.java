package com.restservice.RestApp.model;

import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.Data;
import org.hibernate.validator.constraints.UniqueElements;

import java.util.Objects;


@Entity
@Data
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "email")
    @Email
    @NotEmpty
    private String email;

    @Column(name = "password")
    @NotEmpty
    private String password;

    @NotNull
    @Column(name = "logged_in")
    private boolean loggedIn;

    @Column(name = "display_name")
    private String displayName;

    public User() {
    }
    public User( @NotEmpty String email,
                 @NotEmpty String password) {
        this.email = email;
        this.password = password;
        this.loggedIn = false;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return Objects.equals(email, user.email) &&
                Objects.equals(password, user.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id,email, password,
                loggedIn);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", loggedIn=" + loggedIn +
                '}';
    }

}
