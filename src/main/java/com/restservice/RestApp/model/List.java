package com.restservice.RestApp.model;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Data
@Table(name = "list")
public class List {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "board_id",referencedColumnName = "id")
    private Board board;

    @Column(name = "archived")
    private Boolean isArchived;

    public List(String name, Board board,Boolean isArchived) {
        this.name = name;
        this.board = board;
        this.isArchived = isArchived;
    }

    public List() {
    }
}
