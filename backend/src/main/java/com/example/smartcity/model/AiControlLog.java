package com.example.smartcity.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ai_control_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiControlLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String modelName;

    @Column(columnDefinition = "JSON")
    private String inputData;

    @Column(columnDefinition = "JSON")
    private String outputData;

    private Float confidence;

    private java.time.LocalDateTime executedAt;
}
