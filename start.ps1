Write-Host "Starting Antigravity AI OS Infrastructure..." -ForegroundColor Cyan
docker-compose up -d

Write-Host "Starting Backend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python app/main.py"

Write-Host "Starting Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "Antigravity OS is launching!" -ForegroundColor Magenta
