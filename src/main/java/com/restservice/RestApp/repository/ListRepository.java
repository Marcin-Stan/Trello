package com.restservice.RestApp.repository;

import com.restservice.RestApp.model.Board;
import com.restservice.RestApp.model.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ListRepository extends JpaRepository<List,Long> {

    public com.restservice.RestApp.model.List findListById(Long id);

    public java.util.List<List> findAllByBoard(Board board);

    public java.util.List<List> findAllByBoardAndIsArchivedIsFalse(Board board);

    public java.util.List<List> findAllByBoardAndIsArchivedIsTrue(Board board);
}
