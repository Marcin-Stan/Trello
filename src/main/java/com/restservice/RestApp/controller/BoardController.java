package com.restservice.RestApp.controller;

import com.restservice.RestApp.model.Board;
import com.restservice.RestApp.model.Status;
import com.restservice.RestApp.model.User;
import com.restservice.RestApp.repository.BoardRepository;
import com.restservice.RestApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BoardController {

    @Autowired
    BoardRepository boardRepository;

    @PostMapping("/boards")
    public ResponseEntity<List<Board>> getBoardsbyId(@RequestBody User user){
        return ResponseEntity.ok(boardRepository.findAllByOwner(user));
    }

    @PostMapping("/boardChangeName")
    public ResponseEntity changeName(@RequestBody Long id,String name){
        Board board = boardRepository.getOne(id);
        board.setName(name);
        return ResponseEntity.ok(boardRepository.save(board));
    }

    @PostMapping("/boards/add")
    public ResponseEntity addNewBoard(@Valid @RequestBody Board board){
        return ResponseEntity.ok(boardRepository.save(board));
    }

    @PostMapping("/boards/checkOwner")
    public boolean isOwner(@RequestBody Board board){
         Optional<Board> boardOptional = boardRepository.findById(board.getId());

         if(!boardOptional.isEmpty()){
             if(boardOptional.get().getOwner().getId().equals(board.getOwner().getId())){
                 return true;
             }
         }
         return false;
    }

}
