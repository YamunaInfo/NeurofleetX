package com.example.smartcity.repository;

import com.example.smartcity.model.TrafficSignal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrafficSignalRepository extends JpaRepository<TrafficSignal, Long> {
    List<TrafficSignal> findByStatus(String status);
    List<TrafficSignal> findBySignalLocation(String signalLocation);
}
