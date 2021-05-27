package com.restservice.RestApp.controller;

import com.restservice.RestApp.model.*;
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

    @Autowired
    ListRepository listRepository;

    @PostMapping("/cards/add")
    public ResponseEntity<Card> addNewCard(@RequestBody Long idList, String title){
        Card card = new Card(title,listRepository.findListById(idList));
        return ResponseEntity.ok( cardRepository.save(card));
    }

    @PostMapping("/card/getAllCardsByList")
    public ResponseEntity<java.util.List<Card>> getAllCardByList(@RequestBody List list){
        return ResponseEntity.ok(cardRepository.findAllByList(list));
    }



}
