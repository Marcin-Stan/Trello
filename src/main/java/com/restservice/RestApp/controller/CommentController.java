package com.restservice.RestApp.controller;


import com.restservice.RestApp.model.Card;
import com.restservice.RestApp.model.Comment;
import com.restservice.RestApp.model.User;
import com.restservice.RestApp.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CommentController {

    @Autowired
    CommentRepository commentRepository;

    @PostMapping("/comment/add")
    public ResponseEntity<Comment> addNewComment(@RequestBody Card card, User user, String text){
        Comment comment = new Comment(text,user,card);
        return ResponseEntity.ok(commentRepository.save(comment));
    }

    @PostMapping("/comment/getAllCommentByCard")
    public ResponseEntity<List<Comment>> getAllCommentByCard(@RequestBody Card card){
        return  ResponseEntity.ok(commentRepository.findAllByCard(card));
    }

}
