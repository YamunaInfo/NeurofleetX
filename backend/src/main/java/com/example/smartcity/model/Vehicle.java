package com.example.smartcity.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String registrationNumber;
    private String model;
    private String make;
    @Column(name = "model_year")
    private Integer modelYear;
    private String status;
}
