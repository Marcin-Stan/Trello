package com.restservice.RestApp.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "board_user")
public class BoardUser {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "board_id",referencedColumnName = "id")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;


}
