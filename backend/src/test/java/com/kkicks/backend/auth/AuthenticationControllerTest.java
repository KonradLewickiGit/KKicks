package com.kkicks.backend.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kkicks.backend.BackendApplication;
import com.kkicks.backend.dao.UserDao;
import com.kkicks.backend.entity.User.User;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        classes = BackendApplication.class)
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application.properties")
class AuthenticationControllerTest {
    @Mock
    private AuthenticationService authenticationService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthenticationController authenticationController;

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserDao userDao;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testRegister_isStatus200() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest("test1", "test1", "test1",
                "test1", "test1","123123123");
        AuthenticationResponse expectedResponse = AuthenticationResponse.builder().token("expectedToken").build();

        when(authenticationService.register(registerRequest)).thenReturn(expectedResponse);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(registerRequest)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.token", Matchers.is(Matchers.notNullValue())));

    }
    @Test
    void testAuthenticate_isStatus200() throws Exception {
        createTestUser(1L);
        AuthenticationRequest authenticationRequest = new AuthenticationRequest("test", "test");
        AuthenticationResponse expectedResponse = AuthenticationResponse.builder().token("jwtToken").build();

        when(authenticationService.authenticate(authenticationRequest)).thenReturn(expectedResponse);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(authenticationRequest)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.token", Matchers.is(Matchers.notNullValue())));
    }
    private void createTestUser(Long userId){
        User user = new User();
        user.setId(userId);
        user.setUsername("test");
        user.setEmail("test");
        user.setLastName("test");
        user.setFirstName("test");
        user.setPassword(passwordEncoder.encode("test"));
        userDao.save(user);
    }
}