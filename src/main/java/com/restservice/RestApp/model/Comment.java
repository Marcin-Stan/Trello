package com.restservice.RestApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "text")
    private String text;

    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "card_id",referencedColumnName = "id")
    private Card card;

    public Comment(String text, User user, Card card) {
        this.text = text;
        this.user = user;
        this.card = card;
    }

    public Comment(){}
}
