-- ==============================================
--  Smart City / Fleet Management Database Schema
-- ==============================================
CREATE DATABASE IF NOT EXISTS smart_city_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE smart_city_db;

-- =====================
-- 1. USER AUTH MODULE
-- =====================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    role ENUM('ADMIN','USER') DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- 2. VEHICLE BOOKING MODULE
-- ==========================
CREATE TABLE IF NOT EXISTS vehicles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    registration_number VARCHAR(64),
    model VARCHAR(128),
    make VARCHAR(128),
    year INT,
    status VARCHAR(32)
);

CREATE TABLE IF NOT EXISTS drivers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128),
    license_number VARCHAR(64),
    phone VARCHAR(32),
    status VARCHAR(32)
);

CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    vehicle_id BIGINT,
    driver_id BIGINT,
    start_time DATETIME,
    end_time DATETIME,
    origin VARCHAR(255),
    destination VARCHAR(255),
    status VARCHAR(32),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL,
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE SET NULL
);

-- ===========================
-- 3. EMERGENCY MANAGEMENT
-- ===========================
CREATE TABLE IF NOT EXISTS emergencies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    location VARCHAR(255),
    description TEXT,
    severity ENUM('LOW','MEDIUM','HIGH') DEFAULT 'LOW',
    status ENUM('REPORTED','IN_PROGRESS','RESOLVED') DEFAULT 'REPORTED',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ==========================
-- 4. TRAFFIC SIGNAL MODULE
-- ==========================
CREATE TABLE IF NOT EXISTS traffic_signals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    signal_location VARCHAR(255),
    status ENUM('RED','YELLOW','GREEN') DEFAULT 'RED',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ======================
-- 5. ANALYTICS MODULE
-- ======================
CREATE TABLE IF NOT EXISTS analytics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    metric_name VARCHAR(100),
    metric_value DOUBLE,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ======================
-- 6. AI CONTROL MODULE
-- ======================
CREATE TABLE IF NOT EXISTS ai_control_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    model_name VARCHAR(128),
    input_data JSON,
    output_data JSON,
    confidence FLOAT,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ======================
-- 7. DIGITAL TWIN MODULE
-- ======================
CREATE TABLE IF NOT EXISTS digital_twin (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    entity_type VARCHAR(64),
    entity_id BIGINT,
    status_data JSON,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ======================
-- 8. USER PROFILE MODULE
-- ======================
CREATE TABLE IF NOT EXISTS user_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    full_name VARCHAR(128),
    phone VARCHAR(20),
    address VARCHAR(255),
    profile_pic VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ======================
-- SAMPLE DATA
-- ======================
INSERT INTO users (username,password,email,role) VALUES
('admin','admin123','admin@example.com','ADMIN'),
('user1','user123','user1@example.com','USER');

INSERT INTO vehicles (registration_number, model, make, year, status) VALUES
('TN10AB1234','Model S','Tesla',2023,'AVAILABLE');

INSERT INTO traffic_signals (signal_location,status) VALUES
('Main Street','GREEN'), ('City Square','RED');

INSERT INTO analytics (metric_name,metric_value) VALUES
('avg_speed',45.6), ('fuel_efficiency',12.3);
