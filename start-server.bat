@echo off
cd /d "%~dp0"
echo Starting 오늘운세365 at http://localhost:8000
echo Keep this window open while testing. Press Ctrl+C to stop the server.
where py >nul 2>nul
if errorlevel 1 (
  echo py was not found. Trying python...
  python -m http.server 8000
) else (
  py -m http.server 8000
)
pause
