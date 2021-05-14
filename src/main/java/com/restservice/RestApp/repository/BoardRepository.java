package com.restservice.RestApp.repository;

import com.restservice.RestApp.model.Board;
import com.restservice.RestApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long> {
    public List<Board> findAllByOwner(User user);
}
