package com.example.smartcity.controller;

import com.example.smartcity.model.Booking;
import com.example.smartcity.repository.BookingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingRepository repo;
    public BookingController(BookingRepository repo){ this.repo = repo; }

    @GetMapping public List<Booking> all(){ return repo.findAll(); }
    @PostMapping public Booking create(@RequestBody Booking b){ return repo.save(b); }
}
