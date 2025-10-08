
# Smart City Database Table Structure

## Database: smartcity

### Table: users
| Column Name | Data Type | Constraints | Description |
|--------------|------------|--------------|--------------|
| user_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique user ID |
| name | VARCHAR(100) | NOT NULL | User’s name |
| email | VARCHAR(100) | UNIQUE, NOT NULL | User’s email |
| password | VARCHAR(255) | NOT NULL | Encrypted password |
| role | ENUM('admin', 'user', 'technician') | DEFAULT 'user' | Role type |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When user was created |

### Table: sensors
| Column Name | Data Type | Constraints | Description |
|--------------|------------|--------------|--------------|
| sensor_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique sensor ID |
| sensor_name | VARCHAR(100) | NOT NULL | Name of the sensor |
| sensor_type | VARCHAR(50) |  | Type of sensor (e.g., temperature, gas) |
| location | VARCHAR(100) |  | Physical location |
| status | ENUM('active', 'inactive', 'faulty') | DEFAULT 'active' | Sensor status |
| installed_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Installation time |

### Table: sensor_data
| Column Name | Data Type | Constraints | Description |
|--------------|------------|--------------|--------------|
| data_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique data ID |
| sensor_id | INT | FOREIGN KEY → sensors(sensor_id) | Link to sensor |
| reading_value | FLOAT | NOT NULL | Sensor reading |
| unit | VARCHAR(20) |  | Measurement unit |
| recorded_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Time of reading |

### Table: alerts
| Column Name | Data Type | Constraints | Description |
|--------------|------------|--------------|--------------|
| alert_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique alert ID |
| sensor_id | INT | FOREIGN KEY → sensors(sensor_id) | Related sensor |
| alert_type | VARCHAR(50) |  | Type of alert |
| description | TEXT |  | Alert message |
| severity | ENUM('low', 'medium', 'high') | DEFAULT 'low' | Alert severity |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When alert triggered |

### Table: maintenance_logs
| Column Name | Data Type | Constraints | Description |
|--------------|------------|--------------|--------------|
| log_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique log ID |
| sensor_id | INT | FOREIGN KEY → sensors(sensor_id) | Related sensor |
| technician_name | VARCHAR(100) |  | Name of technician |
| remarks | TEXT |  | Maintenance details |
| maintenance_date | DATE |  | Date of maintenance |

### Table: city_zones
| Column Name | Data Type | Constraints | Description |
|--------------|------------|--------------|--------------|
| zone_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique zone ID |
| zone_name | VARCHAR(100) | NOT NULL | Name of the city zone |
| description | TEXT |  | Zone details |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation time |

### Table: sensor_zone_mapping
| Column Name | Data Type | Constraints | Description |
|--------------|------------|--------------|--------------|
| mapping_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique mapping ID |
| sensor_id | INT | FOREIGN KEY → sensors(sensor_id) | Related sensor |
| zone_id | INT | FOREIGN KEY → city_zones(zone_id) | Related zone |
| assigned_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When mapping created |
