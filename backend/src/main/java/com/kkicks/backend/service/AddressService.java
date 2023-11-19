package com.kkicks.backend.service;

import com.kkicks.backend.dao.AddressDao;
import com.kkicks.backend.dao.UserDao;
import com.kkicks.backend.entity.Address;
import com.kkicks.backend.entity.User.User;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {
    @Autowired
    AddressDao addressDao;
    @Autowired
    UserDao userDao;

    public Address addAddress(Long userId, Address address){
        User user = userDao.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Address address1 = addressDao.findAddressByUser(user).orElse(null);
        if(address1 == null){
            address1 = new Address();
            address1.setCity(address.getCity());
            address1.setStreet(address.getStreet());
            address1.setZipCode(address.getZipCode());
            address1.setBuildingNumber(address.getBuildingNumber());
            address1.setApartmentNumber(address.getApartmentNumber());
            address1.setUser(user);
        } else {
            address1.setCity(address.getCity());
            address1.setStreet(address.getStreet());
            address1.setZipCode(address.getZipCode());
            address1.setBuildingNumber(address.getBuildingNumber());
            address1.setApartmentNumber(address.getApartmentNumber());
        }
        return addressDao.save(address1);
    }
    public Address getAddressByUserId(Long userId){
        User user = userDao.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        return addressDao.findAddressByUser(user).orElseThrow(() -> new EntityNotFoundException("Address not found"));
    }
}
