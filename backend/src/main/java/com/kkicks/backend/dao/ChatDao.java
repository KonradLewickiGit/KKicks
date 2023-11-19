package com.kkicks.backend.dao;

import com.kkicks.backend.entity.Chat.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatDao  extends JpaRepository<Chat,Long> {
    Optional<Chat> findByProductId(Long productId);
}
