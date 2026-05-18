package com.example.smartcity.repository;

import com.example.smartcity.model.AiControlLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AiControlLogRepository extends JpaRepository<AiControlLog, Long> {}
