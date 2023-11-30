package com.kkicks.backend.service;

import com.kkicks.backend.dao.AnswerDao;
import com.kkicks.backend.dao.QuestionDao;
import com.kkicks.backend.dao.UserDao;
import com.kkicks.backend.entity.Question.Answer;
import com.kkicks.backend.entity.Question.Question;
import com.kkicks.backend.entity.Question.Status;
import com.kkicks.backend.entity.User.User;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class QuestionServiceTest {
    @Mock
    private QuestionDao questionDao;

    @Mock
    private AnswerDao answerDao;

    @Mock
    private UserDao userDao;

    @Mock
    private JavaMailSender javaMailSender;

    @InjectMocks
    private QuestionService questionService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindById() {
        Long questionId = 1L;

        Question question = new Question();
        question.setId(questionId);

        when(questionDao.findById(questionId)).thenReturn(Optional.of(question));

        Question result = questionService.findById(questionId);

        assertEquals(question, result);
    }

    @Test
    public void testFindByIdNotFound() {
        Long questionId = 1L;

        when(questionDao.findById(questionId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> questionService.findById(questionId));
    }

    @Test
    public void testFindAll() {
        Question question1 = new Question();
        Question question2 = new Question();

        when(questionDao.findAll()).thenReturn(Arrays.asList(question1, question2));

        List<Question> result = questionService.findAll();

        assertEquals(2, result.size());
        assertTrue(result.contains(question1));
        assertTrue(result.contains(question2));
    }

    @Test
    public void testFindAllByStatus() {
        Status status = Status.RECEIVED;

        Question question1 = new Question();
        Question question2 = new Question();

        when(questionDao.findAllByStatus(status)).thenReturn(Arrays.asList(question1, question2));

        List<Question> result = questionService.findAllByStatus(status);

        assertEquals(2, result.size());
        assertTrue(result.contains(question1));
        assertTrue(result.contains(question2));
    }

    @Test
    public void testSave() {
        String userEmail = "test@example.com";

        User user = new User();
        user.setEmail(userEmail);

        Question question = new Question();
        question.setEmail(userEmail);

        when(userDao.findByEmail(userEmail)).thenReturn(Optional.of(user));
        when(questionDao.save(question)).thenReturn(question);

        Question result = questionService.save(question);

        assertEquals(user, result.getUser());
        verify(questionDao, times(1)).save(question);
    }
    @Test
    public void testAnswerQuestion() {
        Long questionId = 1L;
        String userEmail = "test@example.com";

        Question question = new Question();
        question.setId(questionId);
        question.setEmail(userEmail);

        Answer answer = new Answer();
        answer.setBody("Test answer");
        answer.setQuestion(question);
        answer.setSubject("answer to: " + question.getSubject());

        when(questionDao.findById(questionId)).thenReturn(Optional.of(question));
        doNothing().when(javaMailSender).send(any(SimpleMailMessage.class));

        when(answerDao.save(any(Answer.class))).thenAnswer(invocation -> {
            Answer savedAnswer = invocation.getArgument(0);
            savedAnswer.setQuestion(question);
            return savedAnswer;
        });

        Answer result = questionService.answerQuestion(questionId, answer);

        assertNotNull(result);
        assertEquals(question, result.getQuestion());
        assertEquals(Status.REPLIED, question.getStatus());
        verify(questionDao, times(1)).save(question);
        verify(answerDao, times(1)).save(answer);
    }

}