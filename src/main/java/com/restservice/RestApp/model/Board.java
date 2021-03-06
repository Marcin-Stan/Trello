package com.restservice.RestApp.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Null;
import java.util.List;

@Entity
@Data
@Table(name = "board")
public class Board {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    @NotEmpty
    private String name;

    @Lob
    @Column(name = "background",columnDefinition="BLOB")
    private byte[] background;

    @ManyToOne
    @JoinColumn(name = "owner_id",referencedColumnName = "id")
    private User owner;

    @OneToMany(mappedBy = "board")
    @JsonIgnore
    private List<BoardUser> boardUsersList;

    public Board(@NotEmpty String name,
                 @NotEmpty User user){
        this.name = name;
        this.owner = user;
    }

    public Board(){}


}
