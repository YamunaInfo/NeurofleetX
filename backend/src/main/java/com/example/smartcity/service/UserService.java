package com.example.smartcity.service;

import com.example.smartcity.model.User;
import com.example.smartcity.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(User user) {
        // hash password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> login(String username, String rawPassword) {
        Optional<User> u = userRepository.findByUsername(username);
        if (u.isPresent() && passwordEncoder.matches(rawPassword, u.get().getPassword())) {
            return u;
        }
        return Optional.empty();
    }
}
