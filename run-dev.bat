@echo off
title SOCIETIX Dev Launcher
echo ====================================================
echo         SOCIETIX - Starting Local Environment
echo ====================================================
echo.

:: 1. Launch Backend Server in a new window
echo [1/2] Starting Backend API Server (Port 5000)...
start "SOCIETIX Backend [Port 5000]" cmd /k "cd /d %~dp0server && npm start"

:: 2. Launch Frontend Server in a new window
echo [2/2] Starting Frontend Vite Server (Port 5173)...
start "SOCIETIX Frontend [Port 5173]" cmd /k "cd /d %~dp0client && npm run dev"

echo.
echo ====================================================
echo  All systems launching!
echo    - Backend API:  http://localhost:5000/api/health
echo    - Frontend App: http://localhost:5173
echo ====================================================
echo You can close this launcher window.
pause
