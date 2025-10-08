package com.example.smartcity.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "traffic_signals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrafficSignal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String signalLocation;

    @Enumerated(EnumType.STRING)
    private SignalStatus status = SignalStatus.RED;

    private LocalDateTime lastUpdated;

    public enum SignalStatus { RED, YELLOW, GREEN }
}
