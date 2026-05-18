@echo off
REM Setup Script for NeurofleetX
echo ====================================
echo  NeurofleetX Backend & Frontend Setup
echo ====================================
echo.

REM Check if MySQL is running
echo Checking MySQL connection...
mysql -u root -proot -e "SELECT 1" >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: MySQL not accessible with credentials root:root
    echo Please ensure MySQL is running and update database.properties if needed
    pause
) else (
    echo ✓ MySQL connection successful
    echo.
    echo Setting up database...
    mysql -u root -proot < "Database\smart_city_db.sql"
    if %errorlevel% equ 0 (
        echo ✓ Database setup complete
    ) else (
        echo ✗ Database setup failed
    )
)

echo.
echo ====================================
echo Now run these commands in separate terminals:
echo.
echo Terminal 1 - Backend (Java):
echo   cd backend
echo   mvn clean install
echo   mvn spring-boot:run
echo.
echo Terminal 2 - Frontend (React):
echo   cd Frontend
echo   npm install
echo   npm run dev
echo.
echo ====================================
pause
