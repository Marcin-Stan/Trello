package com.restservice.RestApp.repository;

import com.restservice.RestApp.model.Board;
import com.restservice.RestApp.model.BoardUser;
import com.restservice.RestApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardUserRepository extends JpaRepository<BoardUser,Long> {
    public List<BoardUser> findByUserId(Long id);

    @Query("SELECT bu.user FROM BoardUser bu WHERE bu.board=:board")
    public List<User> retrieveEmployeesByBoard(@Param("board") Board board);
}
