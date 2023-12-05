package com.kkicks.backend.dao;

import com.kkicks.backend.entity.Chat.Chat;
import com.kkicks.backend.entity.Product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatDao  extends JpaRepository<Chat,Long> {
    Optional<Chat> findByProduct(Product product);
}
