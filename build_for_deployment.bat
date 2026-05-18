@echo off
REM ========================================================
REM Deployment Build Script for NeurofleetX (Bare-Metal)
REM ========================================================

echo [1/4] Building React Frontend...
cd Frontend
call npm install
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Frontend build failed!
    pause
    exit /b %errorlevel%
)
cd ..

echo [2/4] Preparing Static Resources for Spring Boot...
if exist "backend\src\main\resources\static" (
    rmdir /S /Q "backend\src\main\resources\static"
)
mkdir "backend\src\main\resources\static"
xcopy "Frontend\dist\*" "backend\src\main\resources\static\" /E /I /Y

echo [3/4] Building Spring Boot Backend (Single Executable JAR)...
cd backend
REM Set Maven path explicitly if required, or assume mvn is in PATH
call apache-maven-3.9.9\bin\mvn clean package -DskipTests
if %errorlevel% neq 0 (
    echo [ERROR] Backend build failed!
    cd ..
    pause
    exit /b %errorlevel%
)
cd ..

echo ========================================================
echo SUCCESS: Build completed successfully!
echo.
echo The executable JAR file is located at:
echo backend\target\smartcity-backend-0.0.1-SNAPSHOT.jar
echo.
echo To run the application in production:
echo java -jar backend\target\smartcity-backend-0.0.1-SNAPSHOT.jar
echo.
echo Make sure MySQL is running before starting the app.
echo ========================================================
pause
