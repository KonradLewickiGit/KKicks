package com.kkicks.backend.service;

import com.kkicks.backend.dao.AddressDao;
import com.kkicks.backend.dao.UserDao;
import com.kkicks.backend.entity.Address;
import com.kkicks.backend.entity.User.User;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AddressServiceTest {

    @Mock
    private AddressDao addressDao;

    @Mock
    private UserDao userDao;

    @InjectMocks
    private AddressService addressService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testUpdateAddress() {
        Long userId = 1L;

        User existingUser = new User();
        existingUser.setId(userId);

        Address existingAddress = new Address();
        existingAddress.setId(1L);
        existingAddress.setUser(existingUser);

        Address newAddress = new Address();
        newAddress.setCity("NewCity");
        newAddress.setStreet("NewStreet");
        newAddress.setZipCode("NewZipCode");
        newAddress.setBuildingNumber("NewBuildingNumber");
        newAddress.setApartmentNumber(12);

        when(userDao.findById(userId)).thenReturn(Optional.of(existingUser));
        when(addressDao.findAddressByUser(existingUser)).thenReturn(Optional.of(existingAddress));
        when(addressDao.save(any(Address.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Address result = addressService.addAddress(userId, newAddress);

        assertEquals(existingAddress.getId(), result.getId());
        assertEquals(newAddress.getCity(), result.getCity());
        assertEquals(newAddress.getStreet(), result.getStreet());
        assertEquals(newAddress.getZipCode(), result.getZipCode());
        assertEquals(newAddress.getBuildingNumber(), result.getBuildingNumber());
        assertEquals(newAddress.getApartmentNumber(), result.getApartmentNumber());

        verify(addressDao, times(1)).save(existingAddress);
    }

    @Test
    public void testAddAddress() {
        Long userId = 1L;

        User existingUser = new User();
        existingUser.setId(userId);

        Address newAddress = new Address();
        newAddress.setCity("NewCity");
        newAddress.setStreet("NewStreet");
        newAddress.setZipCode("NewZipCode");
        newAddress.setBuildingNumber("NewBuildingNumber");
        newAddress.setApartmentNumber(12);

        when(userDao.findById(userId)).thenReturn(Optional.of(existingUser));
        when(addressDao.findAddressByUser(existingUser)).thenReturn(Optional.empty());
        when(addressDao.save(any(Address.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Address result = addressService.addAddress(userId, newAddress);

        assertNull(result.getId());
        assertEquals(newAddress.getCity(), result.getCity());
        assertEquals(newAddress.getStreet(), result.getStreet());
        assertEquals(newAddress.getZipCode(), result.getZipCode());
        assertEquals(newAddress.getBuildingNumber(), result.getBuildingNumber());
        assertEquals(newAddress.getApartmentNumber(), result.getApartmentNumber());

        verify(addressDao, times(1)).save(any(Address.class));
    }

    @Test
    public void testGetAddressByUserId() {
        Long userId = 1L;

        User existingUser = new User();
        existingUser.setId(userId);

        Address existingAddress = new Address();
        existingAddress.setId(101L);
        existingAddress.setUser(existingUser);

        when(userDao.findById(userId)).thenReturn(Optional.of(existingUser));
        when(addressDao.findAddressByUser(existingUser)).thenReturn(Optional.of(existingAddress));

        Address result = addressService.getAddressByUserId(userId);

        assertEquals(existingAddress, result);
    }

    @Test
    public void testGetAddressByUserIdUserNotFound() {
        Long userId = 1L;

        when(userDao.findById(userId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> addressService.getAddressByUserId(userId));
        verify(addressDao, never()).findAddressByUser(any());
    }

    @Test
    public void testGetAddressByUserIdAddressNotFound() {
        Long userId = 1L;

        User existingUser = new User();
        existingUser.setId(userId);

        when(userDao.findById(userId)).thenReturn(Optional.of(existingUser));
        when(addressDao.findAddressByUser(existingUser)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> addressService.getAddressByUserId(userId));
    }
}