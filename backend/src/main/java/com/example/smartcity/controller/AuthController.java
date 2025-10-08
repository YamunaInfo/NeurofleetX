package com.example.smartcity.controller;

import com.example.smartcity.model.User;
import com.example.smartcity.service.UserService;
import com.example.smartcity.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final UserRepository userRepository;

    public AuthController(UserService userService, UserRepository userRepository){
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user){
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body(Map.of("error","username_taken"));
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("error","email_taken"));
        }
        User created = userService.signup(user);
        created.setPassword(null);
        return ResponseEntity.ok(created);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body){
        String username = body.get("username");
        String password = body.get("password");
        return userService.login(username, password)
                .map(u -> {
                    u.setPassword(null);
                    return ResponseEntity.ok(u);
                })
                .orElse(ResponseEntity.status(401).body(Map.of("error","invalid_credentials")));
    }
}
