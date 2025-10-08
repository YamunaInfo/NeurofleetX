package com.example.smartcity.controller;

import com.example.smartcity.model.Emergency;
import com.example.smartcity.repository.EmergencyRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergencies")
public class EmergencyController {
    private final EmergencyRepository repo;
    public EmergencyController(EmergencyRepository repo){ this.repo = repo; }

    @GetMapping public List<Emergency> all(){ return repo.findAll(); }
    @PostMapping public Emergency create(@RequestBody Emergency e){ return repo.save(e); }
}
