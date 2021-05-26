package com.restservice.RestApp.controller;

import com.restservice.RestApp.model.Board;
import com.restservice.RestApp.model.BoardUser;
import com.restservice.RestApp.model.List;
import com.restservice.RestApp.model.User;
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
public class ListController {

    @Autowired
    ListRepository listRepository;

    @PostMapping("/list/add")
    public ResponseEntity addNewList(@RequestBody Board board, String name){

        List list = new List(name,board,false);
        return ResponseEntity.ok(listRepository.save(list));
    }

    @PostMapping("/list/getAll")
    public ResponseEntity getAllList(@RequestBody Board board){
        return ResponseEntity.ok(listRepository.findAllByBoardAndIsArchivedIsFalse(board));
    }

    @PostMapping("/list/getAllArchived")
    public ResponseEntity getAllArchived(@RequestBody Board board){
        return ResponseEntity.ok(listRepository.findAllByBoardAndIsArchivedIsTrue(board));
    }

    @PostMapping("list/changeName")
    public ResponseEntity changeName(@RequestBody Long id, String name){
        List list = listRepository.getOne(id);
        list.setName(name);
        return ResponseEntity.ok(listRepository.save(list));
    }

    @PostMapping("list/archived")
    public ResponseEntity setArchived(@RequestBody Long id){
        List list = listRepository.getOne(id);
        list.setIsArchived(true);
        return ResponseEntity.ok(listRepository.save(list));
    }

}
