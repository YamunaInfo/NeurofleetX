package com.example.smartcity.controller;

import com.example.smartcity.model.DigitalTwin;
import com.example.smartcity.repository.DigitalTwinRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/digital-twin")
public class DigitalTwinController {
    private final DigitalTwinRepository repo;
    public DigitalTwinController(DigitalTwinRepository repo){ this.repo = repo; }

    @GetMapping public List<DigitalTwin> all(){ return repo.findAll(); }
    @PostMapping public DigitalTwin create(@RequestBody DigitalTwin d){ return repo.save(d); }
}
