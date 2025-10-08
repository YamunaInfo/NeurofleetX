package com.example.smartcity.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "emergencies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Emergency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private Severity severity = Severity.LOW;

    @Enumerated(EnumType.STRING)
    private Status status = Status.REPORTED;

    private LocalDateTime timestamp;

    public enum Severity { LOW, MEDIUM, HIGH }
    public enum Status { REPORTED, IN_PROGRESS, RESOLVED }
}
