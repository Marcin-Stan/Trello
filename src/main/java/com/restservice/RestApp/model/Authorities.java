package com.restservice.RestApp.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "authorities")
public class Authorities {

    @Id
    @Column(name = "username")
    private String username;

    @Column(name = "authority")
    private String authority;
}
