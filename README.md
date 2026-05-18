# 🚀 NeurofleetX - AI-Driven Urban Mobility Optimization System

NeurofleetX is a premium, state-of-the-art **AI-driven urban mobility optimization and fleet management platform**. The system leverages cutting-edge web technologies, real-time streaming, and interactive geo-mapping to optimize routes, schedule dispatching, monitor vehicle health, and support emergency dispatches in real time.

---

## 🛠️ System Modules & Features

The platform is organized into high-fidelity, interactive control dashboards:

1.  **📊 Overview Dashboard** — Core KPIs of city-wide urban mobility (traffic levels, average travel times, active emergency dispatches, and fleet optimization rate).
2.  **🚦 Traffic Monitor (Leaflet Geo-Maps)** — Live interactive maps displaying active signal statuses and emergency vehicles across major intersections, with dynamic toggles for **Traffic Signals** overlays and **Density Heatmaps**.
3.  **🚑 Emergency Dispatch** — Real-time emergency vehicle dispatch control console with modal entry and active hazard notification streams.
4.  **🚦 Traffic Signals Control** — Interconnected signal controller with **AI-driven "Optimize All" controls** to automatically calculate and apply optimal green times to relieve city bottlenecks.
5.  **📈 Mobility Analytics** — Interactive, responsive data charts visualizing average vehicle speeds, peak-hour bottlenecks, carbon emissions, and traffic flow distributions.
6.  **🚗 Vehicle Booking & Dispatch** — Intelligent fleet vehicle scheduling system with custom forms to register new bookings, allocate drivers, and assign vehicle classes.
7.  **🤖 AI Control Audit Logs** — Audit logging stream detailing autonomous operations, routing decisions, and signal changes made by the AI core.

---

## ⚙️ Technology Stack

*   **Backend Core**: Java 17, Spring Boot, Spring Security (CORS enabled for development).
*   **Database Core**: In-Memory H2 Database (Default for zero-setup execution) / MySQL Support.
*   **Frontend Core**: React 18, Vite, TypeScript, TailwindCSS, Lucide Icons.
*   **Maps & Charts**: Leaflet (Geo-Mapping), Leaflet Heat (Traffic Heatmaps overlay), Chart.js (Data Analytics).
*   **Real-time Services**: Server-Sent Events (SSE) for hot-push updates to client applications.

---

## ⚡ Zero-Setup Developer Quick Start

NeurofleetX is pre-configured to run out of the box with an **in-memory H2 database** and an **automatic data seeder**. No MySQL installation or database manual setup is required to run the development build!

### 📥 Step 1: Clone the Repository
```bash
git clone https://github.com/YamunaInfo/NeurofleetX.git
cd NeurofleetX
```

### ☕ Step 2: Launch the Spring Boot Backend
The backend utilizes an in-memory database and pre-seeds it on boot-up with mock traffic data, drivers, signal structures, and user profiles.
```bash
cd backend
mvn spring-boot:run
```
*   The backend will build, seed the mock data, and launch on port **`8081`**.
*   Verify the backend is live by opening: `http://localhost:8081/api/auth/validate`

### 💻 Step 3: Launch the React Frontend
Open a new terminal, install the package dependencies, and start the Vite dev server:
```bash
cd Frontend
npm install
npm run dev
```
*   The frontend dev server will launch on port **`5173`**.
*   Open your browser and navigate to: **`http://localhost:5173/`**
*   **Default Logins** (Automatically seeded):
    *   **Username**: `admin` | **Password**: `password`
    *   **Username**: `driver1` | **Password**: `password`

---

## 📦 Single-Artifact Production Deployment

A pre-configured batch script is included in the project root to bundle the entire project into a single executable Spring Boot JAR file:

1.  Ensure you have **Node.js** and **Maven** installed on your system.
2.  Double-click **`build_for_deployment.bat`** in the root folder (or run it via terminal: `./build_for_deployment.bat`).
3.  The script will automatically:
    *   Compile and build the production-ready React assets.
    *   Copy the built static assets into the Spring Boot backend resources (`backend/src/main/resources/static/`).
    *   Compile the Spring Boot project and output a single runnable JAR file.
4.  Run the production JAR file using:
    ```bash
    java -jar backend/target/smartcity-backend-0.0.1-SNAPSHOT.jar
    ```
5.  Access the complete system directly at: **`http://localhost:8081/`**

---

## 💾 Switching to MySQL (Optional)

If you wish to use a persistent MySQL database rather than the zero-setup in-memory H2 database:

1.  Ensure MySQL is running and import the database SQL script:
    ```bash
    mysql -u root -p < Database/smart_city_db.sql
    ```
2.  Open **`backend/src/main/resources/application.properties`** and uncomment the MySQL database connection settings:
    ```properties
    # Enable MySQL
    spring.datasource.url=jdbc:mysql://localhost:3306/smart_city_db?useSSL=false&allowPublicKeyRetrieval=true
    spring.datasource.username=root
    spring.datasource.password=your_mysql_password
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
    spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
    ```
3.  Comment out the H2 Database Configuration block in the same file.
4.  Re-run the backend with `mvn spring-boot:run` to connect directly to MySQL!
