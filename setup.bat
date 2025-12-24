@echo off
REM Lumière Café - Production Setup Script for Windows
REM This script prepares your application for deployment

echo ========================================
echo   Lumiere Cafe - Production Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js v16 or higher from https://nodejs.org/
    pause
    exit /b 1
)

node -v
echo [OK] Node.js detected
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed
    pause
    exit /b 1
)

npm -v
echo [OK] npm detected
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    echo [INFO] Creating .env file from template...
    copy .env.example .env >nul
    echo [OK] .env file created
    echo [WARNING] Please edit .env with your production settings!
) else (
    echo [OK] .env file already exists
)

echo.

REM Install root dependencies
echo [INFO] Installing root dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install root dependencies
    pause
    exit /b 1
)
echo [OK] Root dependencies installed
echo.

REM Install client dependencies
echo [INFO] Installing client dependencies...
cd client
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install client dependencies
    pause
    exit /b 1
)
echo [OK] Client dependencies installed
echo.

REM Install server dependencies
echo [INFO] Installing server dependencies...
cd ..\server
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install server dependencies
    pause
    exit /b 1
)
echo [OK] Server dependencies installed
cd ..
echo.

REM Create uploads directory if it doesn't exist
if not exist server\uploads (
    echo [INFO] Creating uploads directory...
    mkdir server\uploads
    echo [OK] Uploads directory created
) else (
    echo [OK] Uploads directory exists
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo.
echo 1. Edit .env file with your settings:
echo    - Set MONGODB_URI (or leave empty for localStorage mode)
echo    - Update JWT secrets
echo    - Set CLIENT_URL
echo.
echo 2. For Development:
echo    npm run dev
echo.
echo 3. For Production Build:
echo    npm run build
echo    npm start
echo.
echo 4. With Docker:
echo    docker-compose up -d
echo.
echo Read DEPLOYMENT.md for detailed deployment instructions
echo.
echo Default Credentials:
echo    Admin: admin@admin.com / admin
echo    Demo:  demo@demo.com / demo
echo.
echo Happy deploying!
echo.
pause
