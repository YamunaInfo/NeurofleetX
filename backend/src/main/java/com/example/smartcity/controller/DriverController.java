package com.example.smartcity.controller;

import com.example.smartcity.model.Driver;
import com.example.smartcity.repository.DriverRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {
    private final DriverRepository repo;
    public DriverController(DriverRepository repo){ this.repo = repo; }

    @GetMapping public List<Driver> all(){ return repo.findAll(); }
    @PostMapping public Driver create(@RequestBody Driver d){ return repo.save(d); }
}
