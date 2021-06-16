package com.restservice.RestApp.repository;

import com.restservice.RestApp.model.Card;
import com.restservice.RestApp.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {

    public List<Comment> findAllByCard(Card card);
}
