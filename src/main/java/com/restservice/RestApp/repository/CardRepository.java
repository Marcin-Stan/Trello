package com.restservice.RestApp.repository;

import com.restservice.RestApp.model.BoardUser;
import com.restservice.RestApp.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card,Long> {
    public List<Card> findAllByList(com.restservice.RestApp.model.List list);
}
