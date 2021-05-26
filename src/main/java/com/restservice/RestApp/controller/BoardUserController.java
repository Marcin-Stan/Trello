package com.restservice.RestApp.controller;

import com.restservice.RestApp.model.Board;
import com.restservice.RestApp.model.BoardUser;
import com.restservice.RestApp.model.User;
import com.restservice.RestApp.repository.BoardUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BoardUserController {

    @Autowired
    BoardUserRepository boardUserRepository;

    @GetMapping("/boardsUser")
    public List<BoardUser> getBoardsUser(){
        return boardUserRepository.findAll();
    }

    @PostMapping("/boardsUser/add")
    public ResponseEntity addNewBoardUser(@Valid @RequestBody BoardUser boardUser){
        return ResponseEntity.ok(boardUserRepository.save(boardUser));
    }

    @PostMapping("/boardsUser/getByUser")
    public List<BoardUser> getBoardsUserByUser(@RequestBody User user){
        return boardUserRepository.findByUserId(user.getId());
    }

    @PostMapping("/boardsUser/getUsersByBoard")
    public List<User> getUserByBoar(@RequestBody Board board){
        return boardUserRepository.retrieveEmployeesByBoard(board);
    }



}
