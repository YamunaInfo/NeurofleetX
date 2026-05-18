package com.example.smartcity;

import com.example.smartcity.model.TrafficSignal;
import com.example.smartcity.model.Vehicle;
import com.example.smartcity.repository.TrafficSignalRepository;
import com.example.smartcity.repository.VehicleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final VehicleRepository vehicleRepo;
    private final TrafficSignalRepository signalRepo;

    public DataLoader(VehicleRepository vehicleRepo, TrafficSignalRepository signalRepo) {
        this.vehicleRepo = vehicleRepo;
        this.signalRepo = signalRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        if (vehicleRepo.count() == 0) {
            var v1 = new Vehicle(null, "KA01AB1234", "Model S", "Tesla", 2022, "AVAILABLE");
            var v2 = new Vehicle(null, "MH12CD5678", "i3", "BMW", 2019, "IN_SERVICE");
            vehicleRepo.saveAll(List.of(v1, v2));
        }

        if (signalRepo.count() == 0) {
            var s1 = new TrafficSignal(null, "1st Ave & Main St", TrafficSignal.SignalStatus.GREEN, LocalDateTime.now());
            var s2 = new TrafficSignal(null, "2nd Ave & Pine St", TrafficSignal.SignalStatus.RED, LocalDateTime.now());
            signalRepo.saveAll(List.of(s1, s2));
        }
    }
}
