package com.restservice.RestApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "card")
public class Card {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name="title")
    private String title;

    @Column(name="description")
    private String description;

    @Column(name="archived")
    private Boolean archived;

    @Column(name="label")
    private String label;

    @ManyToOne
    @JoinColumn(name = "list_id",referencedColumnName = "id")
    private List list;

    @OneToMany(mappedBy = "card",cascade = CascadeType.ALL)
    @JsonIgnore
    private java.util.List<Comment> commentList;

    public Card(String title, List list) {
        this.title = title;
        this.list = list;
    }

    public Card(){}
}
