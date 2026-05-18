package com.example.smartcity.controller;

import com.example.smartcity.model.Booking;
import com.example.smartcity.model.Emergency;
import com.example.smartcity.model.TrafficSignal;
import com.example.smartcity.model.Vehicle;
import com.example.smartcity.repository.BookingRepository;
import com.example.smartcity.repository.EmergencyRepository;
import com.example.smartcity.repository.TrafficSignalRepository;
import com.example.smartcity.repository.VehicleRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;

@RestController
@RequestMapping("/api/stream")
public class SseController {

    private final VehicleRepository vehicleRepo;
    private final TrafficSignalRepository signalRepo;
    private final EmergencyRepository emergencyRepo;
    private final BookingRepository bookingRepo;

    public SseController(VehicleRepository vehicleRepo,
                         TrafficSignalRepository signalRepo,
                         EmergencyRepository emergencyRepo,
                         BookingRepository bookingRepo) {
        this.vehicleRepo = vehicleRepo;
        this.signalRepo = signalRepo;
        this.emergencyRepo = emergencyRepo;
        this.bookingRepo = bookingRepo;
    }

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter stream() {
        SseEmitter emitter = new SseEmitter(0L); // no timeout

        var scheduler = Executors.newSingleThreadExecutor();
        scheduler.execute(() -> {
            try {
                while (true) {
                    Map<String, Object> payload = new HashMap<>();

                    List<Vehicle> vehicles = vehicleRepo.findAll();
                    List<TrafficSignal> signals = signalRepo.findAll();
                    List<Emergency> emergencies = emergencyRepo.findAll();
                    List<Booking> bookings = bookingRepo.findAll();

                    payload.put("vehicles", vehicles);
                    payload.put("signals", signals);
                    payload.put("emergencies", emergencies);
                    payload.put("bookings", bookings);

                    try {
                        emitter.send(SseEmitter.event().name("update").data(payload));
                    } catch (IOException ioe) {
                        break;
                    }

                    try {
                        Thread.sleep(Duration.ofSeconds(5).toMillis());
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                }
            } finally {
                emitter.complete();
                scheduler.shutdownNow();
            }
        });

        return emitter;
    }
}
