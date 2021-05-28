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

    @PostMapping("card/changeTitle")
    public ResponseEntity<Card> changeTitle(@RequestBody Long id, String title){
        Card card = cardRepository.getOne(id);
        card.setTitle(title);
        return ResponseEntity.ok(cardRepository.save(card));
    }

    @PostMapping("card/changeDescription")
    public ResponseEntity<Card> changeDescription(@RequestBody Long id, String description){
        Card card = cardRepository.getOne(id);
        card.setDescription(description);
        return ResponseEntity.ok(cardRepository.save(card));
    }

    @PostMapping("card/changeLabel")
    public ResponseEntity<Card> changeLabel(@RequestBody Long id, String label){
        Card card = cardRepository.getOne(id);
        card.setLabel(label);
        return ResponseEntity.ok(cardRepository.save(card));
    }

    @PostMapping("card/changeList")
    public ResponseEntity<Card> changeList(@RequestBody Long listId, Long cardId){
        Card card = cardRepository.getOne(cardId);
        card.setList(listRepository.findListById(listId));
        return ResponseEntity.ok(cardRepository.save(card));
    }

    @PostMapping("/card/archived")
    public ResponseEntity<Card> setArchived(@RequestBody Long id){
        Card card = cardRepository.getOne(id);
        card.setArchived(true);
        return ResponseEntity.ok(cardRepository.save(card));
    }
}
