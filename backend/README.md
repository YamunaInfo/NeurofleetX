SmartCity Backend (Spring Boot)
===============================

What's included:
- Full Spring Boot project with entities, repositories, services and controllers
  for Users/Auth, UserProfiles, Vehicles, Drivers, Bookings, Emergencies,
  Traffic Signals, Analytics, AI Control Logs and Digital Twin.
- Simple SecurityConfig that permits all requests (development). Passwords are hashed using BCrypt.
- application.properties preconfigured to connect to `smart_city_db`

Quick start:
1. Ensure MySQL is running and import the database SQL (smart_city_db.sql) into MySQL:
   mysql -u root -p < /path/to/smart_city_db.sql
2. Update spring.datasource.password in src/main/resources/application.properties
3. Build & run:
   mvn spring-boot:run

Notes & Next steps:
- Currently the project does not implement JWT or session-based authentication. For production,
  enable Spring Security properly and issue tokens.
- Controllers are simple CRUD endpoints to match a typical React frontend.
- If you want, I can:
  * add DTOs and mappers
  * add JWT authentication
  * add CORS configuration limited to your frontend domain
  * wire endpoints to your frontend routes automatically
