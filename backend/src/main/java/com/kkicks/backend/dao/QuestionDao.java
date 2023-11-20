package com.kkicks.backend.dao;

import com.kkicks.backend.entity.Question.Question;
import com.kkicks.backend.entity.Question.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionDao extends JpaRepository<Question, Long> {
    List<Question> findAllByStatus(Status status);
}
