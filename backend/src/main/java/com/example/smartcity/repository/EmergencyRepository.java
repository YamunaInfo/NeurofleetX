package com.example.smartcity.repository;

import com.example.smartcity.model.Emergency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmergencyRepository extends JpaRepository<Emergency, Long> {}
