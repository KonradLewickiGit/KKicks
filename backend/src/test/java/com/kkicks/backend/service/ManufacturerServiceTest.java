package com.kkicks.backend.service;

import com.kkicks.backend.dao.ManufacturerDao;
import com.kkicks.backend.entity.Manufacturer;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;

class ManufacturerServiceTest {

    @Mock
    private ManufacturerDao manufacturerDao;

    @InjectMocks
    private ManufacturerService manufacturerService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllManufacturers() {
        Manufacturer manufacturer1 = new Manufacturer();
        manufacturer1.setId(1);
        manufacturer1.setName("Manufacturer1");

        Manufacturer manufacturer2 = new Manufacturer();
        manufacturer2.setId(2);
        manufacturer2.setName("Manufacturer2");

        when(manufacturerDao.findAll()).thenReturn(Arrays.asList(manufacturer1, manufacturer2));

        List<Manufacturer> result = manufacturerService.getAllManufacturers();

        assertEquals(2, result.size());
        assertTrue(result.contains(manufacturer1));
        assertTrue(result.contains(manufacturer2));
    }

    @Test
    public void testGetManufacturerById() {
        Integer manufacturerId = 1;

        Manufacturer manufacturer = new Manufacturer();
        manufacturer.setId(manufacturerId);
        manufacturer.setName("TestManufacturer");

        when(manufacturerDao.findById(manufacturerId)).thenReturn(Optional.of(manufacturer));

        Manufacturer result = manufacturerService.getManufacturerById(manufacturerId);

        assertEquals(manufacturer, result);
    }

    @Test
    public void testGetManufacturerByIdNotFound() {
        Integer manufacturerId = 1;

        when(manufacturerDao.findById(manufacturerId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> manufacturerService.getManufacturerById(manufacturerId));

    }

    @Test
    public void testSaveManufacturer() {
        Manufacturer newManufacturer = new Manufacturer();
        newManufacturer.setName("NewManufacturer");

        when(manufacturerDao.save(newManufacturer)).thenReturn(newManufacturer);

        Manufacturer result = manufacturerService.saveManufacturer(newManufacturer);

        assertEquals(newManufacturer, result);
    }

    @Test
    public void testDeleteManufacturerById() {
        Integer manufacturerId = 1;

        assertDoesNotThrow(() -> manufacturerService.deleteManufacturerById(manufacturerId));
        verify(manufacturerDao, times(1)).deleteById(manufacturerId);
    }
}