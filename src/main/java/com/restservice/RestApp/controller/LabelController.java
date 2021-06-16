package com.restservice.RestApp.controller;


import com.restservice.RestApp.model.*;
import com.restservice.RestApp.repository.LabelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LabelController {

    @Autowired
    LabelRepository labelRepository;

    @PostMapping("/label/getAllByBoard")
    public ResponseEntity getAllList(@RequestBody Board board){
        return ResponseEntity.ok(labelRepository.findAllByBoard(board));
    }

    @PostMapping("/label/add")
    public ResponseEntity<Label> addNewLabel(@RequestBody Label label){
        return ResponseEntity.ok(labelRepository.save(label));
    }
}
