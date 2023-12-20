package com.kkicks.backend.controller;

import com.kkicks.backend.entity.Question.Answer;
import com.kkicks.backend.entity.Question.Question;
import com.kkicks.backend.entity.Question.Status;
import com.kkicks.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
public class QuestionController {
    @Autowired
    QuestionService questionService;
    @PostMapping("/add")
    public Question addQuestion(@RequestBody Question question){
        return questionService.save(question);
    }
    @PostMapping("/sendAnswer/{questionId}")
    public Answer sendAnswer(@PathVariable Long questionId, @RequestBody Answer answer){
        return questionService.answerQuestion(questionId,answer);
    }
    @GetMapping("/find/{id}")
    public Question find(@PathVariable Long id){
        return questionService.findById(id);
    }
    @GetMapping("/find/All")
    public List<Question> findAll(){
        return questionService.findAll();
    }
    @GetMapping("/find/AllByStatus/{status}")
    public List<Question> findAllByStatus(@PathVariable Status status){
        return questionService.findAllByStatus(status);
    }
}
