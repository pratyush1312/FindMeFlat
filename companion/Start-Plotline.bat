@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Install Node.js LTS 22.13 or newer from https://nodejs.org/ and open this launcher again.
 pause
 exit /b 1
)
if not exist node_modules\jose (
 call npm ci --omit=dev --ignore-scripts --no-audit --no-fund
 if errorlevel 1 (
  echo Dependency installation failed. Check your internet connection.
  pause
  exit /b 1
 )
)
node server.mjs
pause
