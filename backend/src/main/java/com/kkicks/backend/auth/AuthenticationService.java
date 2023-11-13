package com.kkicks.backend.auth;

import com.kkicks.backend.config.security.JWTService;
import com.kkicks.backend.dao.UserDao;
import com.kkicks.backend.entity.Role;
import com.kkicks.backend.entity.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        if (!userDao.findByEmail(request.getEmail()).isEmpty()) {
            throw new IllegalArgumentException("Adres email jest już w użyciu");
        } else if (!userDao.findByUsername(request.getLogin()).isEmpty()){
            throw new IllegalArgumentException("Login jest już w użyciu");
        }

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .username(request.getLogin())
                .password(passwordEncoder.encode(request.getPasswd()))
                .phoneNumber(request.getPhoneNumber())
                .role(Role.USER)
                .build();
        userDao.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getLogin(),request.getPasswd()));
        var user = userDao.findByEmail(request.getLogin()).orElseThrow(() -> new EntityNotFoundException("user not found"));
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}
