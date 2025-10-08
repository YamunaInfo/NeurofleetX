package com.example.smartcity.controller;

import com.example.smartcity.model.Vehicle;
import com.example.smartcity.repository.VehicleRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {
    private final VehicleRepository repo;
    public VehicleController(VehicleRepository repo){ this.repo = repo; }

    @GetMapping public List<Vehicle> all(){ return repo.findAll(); }
    @GetMapping("/{id}") public Vehicle one(@PathVariable Long id){ return repo.findById(id).orElse(null); }
    @PostMapping public Vehicle create(@RequestBody Vehicle v){ return repo.save(v); }
    @PutMapping("/{id}") public Vehicle update(@PathVariable Long id, @RequestBody Vehicle v){
        v.setId(id); return repo.save(v);
    }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id){ repo.deleteById(id); }
}
