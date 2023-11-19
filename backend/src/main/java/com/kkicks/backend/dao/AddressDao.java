package com.kkicks.backend.dao;

import com.kkicks.backend.entity.Address;
import com.kkicks.backend.entity.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressDao  extends JpaRepository<Address, Long> {
    Optional<Address> findAddressByUser(User user);
}
