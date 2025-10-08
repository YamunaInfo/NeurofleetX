package com.example.smartcity.controller;

import com.example.smartcity.model.AiControlLog;
import com.example.smartcity.repository.AiControlLogRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai-control")
public class AiControlController {
    private final AiControlLogRepository repo;
    public AiControlController(AiControlLogRepository repo){ this.repo = repo; }

    @GetMapping public List<AiControlLog> all(){ return repo.findAll(); }
    @PostMapping public AiControlLog create(@RequestBody AiControlLog a){ return repo.save(a); }
}
