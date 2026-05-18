package com.example.smartcity.repository;

import com.example.smartcity.model.Emergency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmergencyRepository extends JpaRepository<Emergency, Long> {
    List<Emergency> findByStatus(String status);
}
