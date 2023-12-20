package com.kkicks.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kkicks.backend.BackendApplication;
import com.kkicks.backend.config.security.JWTService;
import com.kkicks.backend.dao.AddressDao;
import com.kkicks.backend.dao.UserDao;
import com.kkicks.backend.entity.Address;
import com.kkicks.backend.entity.User.User;
import com.kkicks.backend.service.AddressService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        classes = BackendApplication.class)
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application.properties")
public class AddressControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Mock
    private AddressService addressService;
    @Autowired
    private UserDao userDao;
    @Autowired
    private AddressDao addressDao;
    @Autowired
    private JWTService jwtService;

    @InjectMocks
    private AddressController addressController;

    @Test
    public void testAddAddress() throws Exception {
        Long userId = 1L;
        User user = createTestUser(userId);
        Address address = createTestAddress(user);

        String token = jwtService.generateToken(user);
        when(addressService.addAddress(userId, address)).thenReturn(address);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/address/add/{userId}", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content(objectMapper.writeValueAsString(address));

        mockMvc.perform(requestBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.street").value("Jasna"))
                .andExpect(jsonPath("$.city").value("Lublin"))
                .andExpect(jsonPath("$.zipCode").value("20-400"))
                .andExpect(jsonPath("$.buildingNumber").value("12a"))
                .andExpect(jsonPath("$.apartmentNumber").value(12));
    }

    @Test
    public void testFindByUserId() throws Exception {
        Long userId = 1L;
        User user = createTestUser(userId);
        Address address = createTestAddress(user);
        addressDao.save(address);

        String token = jwtService.generateToken(user);

        // Mock service behavior
        when(addressService.getAddressByUserId(userId)).thenReturn(address);

        // Create request
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/address/find/ByUserId/{userId}", userId)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON);

        // Perform the request and validate the response
        mockMvc.perform(requestBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.street").value("Jasna"))
                .andExpect(jsonPath("$.city").value("Lublin"))
                .andExpect(jsonPath("$.zipCode").value("20-400"))
                .andExpect(jsonPath("$.buildingNumber").value("12a"))
                .andExpect(jsonPath("$.apartmentNumber").value(12));
    }
    private User createTestUser(Long userId){
        User user = new User();
        user.setId(userId);
        user.setUsername("test");
        user.setEmail("test");
        user.setLastName("test");
        user.setFirstName("test");
        user.setPassword("test");
        userDao.save(user);
        return user;
    }
    private Address createTestAddress(User user){
        Address address = new Address();
        address.setStreet("Jasna");
        address.setCity("Lublin");
        address.setZipCode("20-400");
        address.setBuildingNumber("12a");
        address.setApartmentNumber(12);
        address.setUser(user);
        return address;
    }
}