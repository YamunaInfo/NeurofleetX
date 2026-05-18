@echo off
REM Setup Script for NeurofleetX
title NeurofleetX Development Setup
echo ====================================================
echo  🚀 Welcome to NeurofleetX Development Workspace Setup
echo ====================================================
echo.

REM Check if MySQL is running
echo [1/2] Checking MySQL connection...
mysql -u root -proot -e "SELECT 1" >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo 💡 INFO: MySQL is not accessible on localhost with root:root credentials.
    echo    No action needed! The system is pre-configured with an in-memory H2
    echo    database that runs instantly out of the box with auto-seeded mock data.
    echo    MySQL is completely optional!
    echo.
) else (
    echo.
    echo  ✓ MySQL connection successful!
    echo  [2/2] Importing database schema into MySQL...
    mysql -u root -proot < "Database\smart_city_db.sql"
    if %errorlevel% equ 0 (
        echo  ✓ Database setup complete.
    ) else (
        echo  ✗ Database import failed. Fallback to H2 database will occur automatically.
    )
    echo.
)

echo ====================================================
echo 🎉 SETUP COMPLETED SUCCESSFUL!
echo ====================================================
echo.
echo To run the application in development mode, execute
echo these commands in separate terminal windows:
echo.
echo 💻 TERMINAL 1 - BACKEND (Java):
echo    cd backend
echo    mvn spring-boot:run
echo.
echo 🖥️ TERMINAL 2 - FRONTEND (React):
echo    cd Frontend
echo    npm install
echo    npm run dev
echo.
echo ====================================================
echo Press any key to exit setup...
pause >nul
