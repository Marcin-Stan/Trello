package com.restservice.RestApp.model;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.List;
import java.util.Objects;


@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    @Email
    @NotEmpty
    private String email;

    @Column(name = "password")
    @NotEmpty
    @JsonIgnore
    private String password;

    @NotNull
    @Column(name = "enabled")
    private boolean enabled;

    @Column(name = "display_name")
    private String displayName;

    @OneToMany(mappedBy = "owner")
    @JsonIgnore
    private List<Board> boardList;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<BoardUser> boardUsersList;

    public User() {
    }
    public User( @NotEmpty String email,
                 @NotEmpty String password) {
        this.email = email;
        this.password = password;
        this.enabled = false;
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
                enabled);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", loggedIn=" + enabled +
                '}';
    }

}