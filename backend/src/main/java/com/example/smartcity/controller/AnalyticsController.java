package com.example.smartcity.controller;

import com.example.smartcity.model.Analytics;
import com.example.smartcity.repository.AnalyticsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
    private final AnalyticsRepository repo;
    public AnalyticsController(AnalyticsRepository repo){ this.repo = repo; }

    @GetMapping public List<Analytics> all(){ return repo.findAll(); }
    @PostMapping public Analytics create(@RequestBody Analytics a){ return repo.save(a); }
}
