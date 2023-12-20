package com.kkicks.backend.controller;

import com.kkicks.backend.entity.Address;
import com.kkicks.backend.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/address")
public class AddressController {
    @Autowired
    AddressService addressService;

    @PostMapping("/add/{userId}")
    public Address addAddress(@PathVariable Long userId, @RequestBody Address address){
        return  addressService.addAddress(userId,address);
    }
    @GetMapping("find/ByUserId/{userId}")
    public Address findByUserId(@PathVariable Long userId){
        return addressService.getAddressByUserId(userId);
    }


}
