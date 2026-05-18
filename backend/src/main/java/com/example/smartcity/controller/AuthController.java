package com.example.smartcity.controller;

import com.example.smartcity.dto.UserRequest;
import com.example.smartcity.dto.UserResponse;
import com.example.smartcity.model.User;
import com.example.smartcity.service.UserService;
import com.example.smartcity.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:3000"})
public class AuthController {
    private final UserService userService;
    private final UserRepository userRepository;

    public AuthController(UserService userService, UserRepository userRepository){
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody UserRequest userRequest){
        if (userRepository.existsByUsername(userRequest.getUsername())) {
            return ResponseEntity.badRequest().body(Map.of("error","username_taken"));
        }
        if (userRepository.existsByEmail(userRequest.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("error","email_taken"));
        }
        
        User user = new User();
        user.setUsername(userRequest.getUsername());
        user.setEmail(userRequest.getEmail());
        user.setPassword(userRequest.getPassword());
        
        User created = userService.signup(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(new UserResponse(created));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserRequest userRequest){
        Optional<User> userOpt = userService.login(userRequest.getUsername(), userRequest.getPassword());
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(new UserResponse(userOpt.get()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","invalid_credentials"));
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken() {
        return ResponseEntity.ok(Map.of("message", "Token is valid"));
    }
}
