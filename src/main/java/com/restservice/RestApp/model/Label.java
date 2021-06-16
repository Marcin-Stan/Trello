package com.restservice.RestApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "label")
public class Label {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="color")
    private String color;

    @ManyToOne
    @JoinColumn(name = "board_id",referencedColumnName = "id")
    private Board board;


    @OneToMany(mappedBy = "label",cascade = CascadeType.ALL)
    @JsonIgnore
    private java.util.List<Card> cardList;


}
