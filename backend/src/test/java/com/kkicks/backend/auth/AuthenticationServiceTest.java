package com.kkicks.backend.auth;

import com.kkicks.backend.config.security.JWTService;
import com.kkicks.backend.dao.UserDao;
import com.kkicks.backend.entity.User.User;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
class AuthenticationServiceTest {
    @Mock
    private UserDao userDao;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JWTService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testRegister() {
        RegisterRequest registerRequest = new RegisterRequest("test", "test",
                "test", "test", "test", "123456789");

        when(userDao.findByEmail(registerRequest.getEmail())).thenReturn(Optional.empty());
        when(userDao.findByUsername(registerRequest.getLogin())).thenReturn(Optional.empty());

        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn("encodedPassword");

        when(jwtService.generateToken(any(User.class))).thenReturn("jwtToken");

        AuthenticationResponse response = authenticationService.register(registerRequest);

        verify(userDao, times(1)).save(any(User.class));

        assertNotNull(response.getToken());
    }

    @Test
    void testRegisterWithEmailAlreadyExists() {
        RegisterRequest registerRequest = new RegisterRequest("test", "test", "test",
                "test", "test", "123456789");

        when(userDao.findByEmail(registerRequest.getEmail())).thenReturn(Optional.of(new User()));

        assertThrows(IllegalArgumentException.class, () -> authenticationService.register(registerRequest));
    }

    @Test
    void testRegisterWithUsernameAlreadyExists() {
        RegisterRequest registerRequest = new RegisterRequest("test", "test", "test",
                "test", "test", "123456789");
        // Mock userDao behavior
        when(userDao.findByEmail(registerRequest.getEmail())).thenReturn(Optional.empty());
        when(userDao.findByUsername(registerRequest.getLogin())).thenReturn(Optional.of(new User()));

        // Execute the register method and expect an exception
        assertThrows(IllegalArgumentException.class, () -> authenticationService.register(registerRequest));
    }

    @Test
    void testAuthenticate() {
        AuthenticationRequest authenticationRequest = new AuthenticationRequest("test", "test");

        // Mock userDao behavior
        when(userDao.findByEmail(authenticationRequest.getEmail())).thenReturn(Optional.of(new User()));

        // Mock authenticationManager behavior
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(null);

        // Mock jwtService behavior
        when(jwtService.generateToken(any(User.class))).thenReturn("jwtToken");

        // Execute the authenticate method
        AuthenticationResponse response = authenticationService.authenticate(authenticationRequest);

        // Verify the response token is not null
        assertNotNull(response.getToken());
    }

    @Test
    void testAuthenticateWithInvalidUser() {
        AuthenticationRequest authenticationRequest = new AuthenticationRequest("test", "test");

        // Mock userDao behavior
        when(userDao.findByEmail(authenticationRequest.getEmail())).thenReturn(Optional.empty());

        // Execute the authenticate method and expect an exception
        assertThrows(EntityNotFoundException.class, () -> authenticationService.authenticate(authenticationRequest));
    }
}