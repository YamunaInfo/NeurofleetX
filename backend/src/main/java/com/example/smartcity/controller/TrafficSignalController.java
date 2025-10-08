package com.example.smartcity.controller;

import com.example.smartcity.model.TrafficSignal;
import com.example.smartcity.repository.TrafficSignalRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/traffic-signals")
public class TrafficSignalController {
    private final TrafficSignalRepository repo;
    public TrafficSignalController(TrafficSignalRepository repo){ this.repo = repo; }

    @GetMapping public List<TrafficSignal> all(){ return repo.findAll(); }
    @PostMapping public TrafficSignal create(@RequestBody TrafficSignal t){ return repo.save(t); }
}
