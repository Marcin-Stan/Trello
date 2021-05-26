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

    @Column(name = "order")
    private Integer order;

    @Column(name="archived")
    private Boolean archived;

    @ManyToOne
    @JoinColumn(name = "list_id",referencedColumnName = "id")
    private List list;


}
