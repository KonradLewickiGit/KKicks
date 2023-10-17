package com.kkicks.backend.service;

import com.kkicks.backend.dao.ManufacturerDao;
import com.kkicks.backend.entity.Manufacturer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManufacturerService {
    @Autowired
    ManufacturerDao manufacturerDao;

    public List<Manufacturer> getAllManufacturers(){
        return manufacturerDao.findAll();
    };
    public Manufacturer getManufacturerById(Integer id){
        return manufacturerDao.findById(id).orElse(null);
    }
    public Manufacturer saveManufacturer(Manufacturer manufacturer){
        return manufacturerDao.save(manufacturer);
    }
    public void deleteManufacturerById(Integer id){
        manufacturerDao.deleteById(id);
    }
}
