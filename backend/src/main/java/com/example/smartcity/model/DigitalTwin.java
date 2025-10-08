package com.example.smartcity.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "digital_twin")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DigitalTwin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String entityType;
    private Long entityId;

    @Column(columnDefinition = "JSON")
    private String statusData;

    private java.time.LocalDateTime updatedAt;
}
