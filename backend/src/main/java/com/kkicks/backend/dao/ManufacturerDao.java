package com.kkicks.backend.dao;

import com.kkicks.backend.entity.Manufacturer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ManufacturerDao extends JpaRepository<Manufacturer,Integer> {
}
