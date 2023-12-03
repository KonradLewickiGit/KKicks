package com.kkicks.backend.entity.Question;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kkicks.backend.entity.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class Question {
    public Question() {
        this.status = Status.RECEIVED;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String subject;
    @Column(nullable = false)
    private String body;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;
    @Column(nullable = false)
    private String email;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @OneToOne(mappedBy = "question")
    @JsonIgnore
    private Answer answer;
}
