package com.example.smartcity.controller;

import com.example.smartcity.model.UserProfile;
import com.example.smartcity.repository.UserProfileRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
public class UserProfileController {
    private final UserProfileRepository repo;
    public UserProfileController(UserProfileRepository repo){ this.repo = repo; }

    @GetMapping public List<UserProfile> all(){ return repo.findAll(); }
    @PostMapping public UserProfile create(@RequestBody UserProfile p){ return repo.save(p); }
}
