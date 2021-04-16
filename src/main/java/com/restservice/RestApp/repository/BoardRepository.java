package com.restservice.RestApp.repository;

import com.restservice.RestApp.model.Board;
import com.restservice.RestApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long> {

}
