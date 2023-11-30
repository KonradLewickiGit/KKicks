package com.kkicks.backend.service;

import com.kkicks.backend.dao.AnswerDao;
import com.kkicks.backend.dao.QuestionDao;
import com.kkicks.backend.dao.UserDao;
import com.kkicks.backend.entity.Question.Answer;
import com.kkicks.backend.entity.Question.Question;
import com.kkicks.backend.entity.Question.Status;
import com.kkicks.backend.entity.User.User;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    @Autowired
    QuestionDao questionDao;
    @Autowired
    AnswerDao answerDao;
    @Autowired
    UserDao userDao;
    @Autowired
    JavaMailSender javaMailSender;

    public Question findById(Long id){
        return questionDao.findById(id).orElseThrow(() -> new EntityNotFoundException("question not found!"));
    }

    public List<Question> findAll(){
        return questionDao.findAll();
    }
    public List<Question> findAllByStatus(Status status){
        return questionDao.findAllByStatus(status);
    }
    public Question save(Question question){
        User user = userDao.findByEmail(question.getEmail()).orElse(null);
        question.setUser(user);
        return questionDao.save(question);
    }
    public Answer answerQuestion(Long questionId, Answer answer){
        Question question = questionDao.findById(questionId).orElseThrow(() -> new EntityNotFoundException("question not found!"));
        Answer answer1 = new Answer();
        answer1.setQuestion(question);
        answer1.setBody(answer.getBody());
        answer1.setSubject("answer to: " + question.getSubject());
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(question.getEmail());
        message.setSubject(answer1.getSubject());
        message.setText(answer1.getBody());
        javaMailSender.send(message);
        question.setStatus(Status.REPLIED);
        questionDao.save(question);
        return answerDao.save(answer1);
    }
}
