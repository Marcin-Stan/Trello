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
    @JsonIgnore
    private User owner;

    @OneToMany(mappedBy = "board",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<BoardUser> boardUsersList;

    @OneToMany(mappedBy = "board",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<com.restservice.RestApp.model.List> lists;

    public Board(@NotEmpty String name,
                 @NotEmpty User user){
        this.name = name;
        this.owner = user;
    }

    public Board(){}


}
