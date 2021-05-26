package com.restservice.RestApp.controller;

import com.restservice.RestApp.model.Board;
import com.restservice.RestApp.model.BoardUser;
import com.restservice.RestApp.model.List;
import com.restservice.RestApp.repository.CardRepository;
import com.restservice.RestApp.repository.ListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CardController {

    @Autowired
    CardRepository cardRepository;

    /*
    @PostMapping("/cards/add")
    public ResponseEntity addNewBoard(@Valid @RequestBody List list){
        boardRepository.save(board);
        BoardUser boardUser = new BoardUser(board,board.getOwner());
        return ResponseEntity.ok( boardUserRepository.save(boardUser));
    }

     */
}
