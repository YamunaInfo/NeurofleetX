package com.example.smartcity.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "drivers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String licenseNumber;
    private String phone;
    private String status;
}
