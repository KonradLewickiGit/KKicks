package com.kkicks.backend.dao;

import com.kkicks.backend.entity.User;
import com.kkicks.backend.entity.UserRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRatingDao extends JpaRepository<UserRating, Long> {
    List<UserRating> findAllByUser(User user);
    Optional<UserRating> findBySenderAndUser(User sender,User user);
}
