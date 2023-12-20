package com.kkicks.backend.controller;

import com.kkicks.backend.entity.Manufacturer;
import com.kkicks.backend.service.ManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/manufacturer"})
public class ManufacturerController {
    @Autowired
    ManufacturerService manufacturerService;

    @PostMapping({"/save"})
    public Manufacturer saveManufacturer(@RequestBody Manufacturer manufacturer){
        return manufacturerService.saveManufacturer(manufacturer);
    }
    @DeleteMapping({"/delete/{id}"})
    public String deleteManufacturerById(@PathVariable Integer id){
        manufacturerService.deleteManufacturerById(id);
        return "Successfully removed manufacturer(" + id + ")!";
    }
    @GetMapping({"/find/All"})
    public List<Manufacturer> getAllManufacturers(){
        return manufacturerService.getAllManufacturers();
    }
    @GetMapping({"/find/{id}"})
    public Manufacturer getManufacturerById(@PathVariable Integer id){
        return manufacturerService.getManufacturerById(id);
    }
}
