@echo off
setlocal enabledelayedexpansion
title AgriVision Precision Agriculture Platform
color 0A

echo ======================================================================
echo             AGRIVISION - SMART PRECISION AGRICULTURE PLATFORM
echo                        One-Click Automatic Launcher
echo ======================================================================
echo.

:: 1. Check Python
echo [1/3] Checking Python installation...
set PYTHON_CMD=
where python >nul 2>nul
if %errorlevel% equ 0 (
    set PYTHON_CMD=python
) else (
    where py >nul 2>nul
    if %errorlevel% equ 0 (
        set PYTHON_CMD=py
    )
)

if "%PYTHON_CMD%"=="" (
    echo.
    echo ======================================================================
    echo [ERROR] Python is not installed or not added to your system PATH!
    echo.
    echo Please install Python 3.10, 3.11, or 3.12:
    echo   1. Download from: https://www.python.org/downloads/
    echo   2. Run installer and MUST CHECK: "Add python.exe to PATH"
    echo   3. Restart this start_all.bat file
    echo ======================================================================
    echo.
    pause
    exit /b 1
)

echo [OK] Using Python: %PYTHON_CMD%

:: Check if local virtualenv exists in ml or backend, otherwise use global/local
set ML_PYTHON=%PYTHON_CMD%
if exist "%~dp0ml\venv\Scripts\python.exe" (
    set ML_PYTHON="%~dp0ml\venv\Scripts\python.exe"
)

set BACKEND_PYTHON=%PYTHON_CMD%
if exist "%~dp0backend\venv\Scripts\python.exe" (
    set BACKEND_PYTHON="%~dp0backend\venv\Scripts\python.exe"
)

:: 2. Check and Install dependencies if needed
echo.
echo [2/3] Verifying core backend dependencies...
%BACKEND_PYTHON% -c "import flask, flask_cors, sqlalchemy, requests, PIL" 2>nul
if %errorlevel% neq 0 (
    echo [INFO] First-time setup: Installing backend dependencies...
    %BACKEND_PYTHON% -m pip install -r "%~dp0backend\requirements.txt"
) else (
    echo [OK] Backend dependencies verified.
)

echo Verifying ML dependencies...
%ML_PYTHON% -c "import fastapi, uvicorn, joblib, pandas" 2>nul
if %errorlevel% neq 0 (
    echo [INFO] First-time setup: Installing ML dependencies...
    %ML_PYTHON% -m pip install -r "%~dp0ml\requirements.txt"
) else (
    echo [OK] ML microservice dependencies verified.
)

:: 3. Check Frontend runtime (Vite vs Python SPA Server)
echo.
echo [3/3] Configuring Frontend launcher...
set FRONTEND_MODE=spa
where npm >nul 2>nul
if %errorlevel% equ 0 (
    if exist "%~dp0frontend\node_modules" (
        set FRONTEND_MODE=vite
    )
)

if "%FRONTEND_MODE%"=="vite" (
    echo [OK] Node.js and node_modules detected. Launching Vite dev server...
    set FRONTEND_LAUNCH=npm run dev
) else (
    echo [OK] Pre-compiled production build detected. Launching Python SPA server on Port 5173...
    set FRONTEND_LAUNCH=%PYTHON_CMD% serve_dist.py
)

:: 4. Start Services
echo.
echo ======================================================================
echo   Launching 3 AgriVision Microservices:
echo     1. ML Microservice (FastAPI)  -> http://localhost:8000
echo     2. Web Backend (Flask API)    -> http://localhost:5000
echo     3. Frontend User Interface   -> http://localhost:5173
echo ======================================================================
echo.

echo Starting ML Microservice on port 8000...
start "AgriVision - ML Microservice (Port 8000)" cmd /k "cd /d ""%~dp0ml"" && %ML_PYTHON% -m uvicorn app.main:app --host 0.0.0.0 --port 8000"

timeout /t 3 /nobreak >nul

echo Starting Flask Backend on port 5000...
start "AgriVision - Flask Backend (Port 5000)" cmd /k "cd /d ""%~dp0backend"" && %BACKEND_PYTHON% app.py"

timeout /t 3 /nobreak >nul

echo Starting Frontend on port 5173...
start "AgriVision - Frontend (Port 5173)" cmd /k "cd /d ""%~dp0frontend"" && %FRONTEND_LAUNCH%"

timeout /t 3 /nobreak >nul

echo.
echo ======================================================================
echo [SUCCESS] AgriVision is now live!
echo Opening http://localhost:5173 in your default browser...
echo ======================================================================
start http://localhost:5173

echo.
echo NOTE: Keep this terminal and the service windows open while using AgriVision.
echo To shut down all services, press any key in this window.
echo.
pause >nul

echo Stopping AgriVision services...
taskkill /FI "WINDOWTITLE eq AgriVision - ML Microservice*" /T /F >nul 2>nul
taskkill /FI "WINDOWTITLE eq AgriVision - Flask Backend*" /T /F >nul 2>nul
taskkill /FI "WINDOWTITLE eq AgriVision - Frontend*" /T /F >nul 2>nul
echo All AgriVision processes stopped cleanly.
timeout /t 2 /nobreak >nul
