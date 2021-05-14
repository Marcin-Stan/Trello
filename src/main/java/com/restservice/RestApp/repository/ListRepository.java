package com.restservice.RestApp.repository;

import com.restservice.RestApp.model.Board;
import com.restservice.RestApp.model.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListRepository extends JpaRepository<List,Long> {
    public java.util.List<List> findAllByBoard(Board board);
}
