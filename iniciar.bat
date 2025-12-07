@echo off
echo =================================
echo   SISTEMA FERRETERIA - INICIO
echo =================================
echo.
echo [1/3] INICIANDO BACKEND...
start "Backend" cmd /k "cd ferreteria-backends && echo BACKEND: localhost:8080 && if exist ferreteria-backend.jar (java -jar ferreteria-backend.jar) else (echo NO HAY JAR - Solo frontend && pause)"
timeout /t 2 >nul
echo.
echo [2/3] INICIANDO FRONTEND...
start "Frontend" cmd /k "cd ferreteria-frontend && echo FRONTEND: localhost:3000 && npm start"
timeout /t 2 >nul
echo.
echo =================================
echo  ACCESO: http://localhost:3000
echo =================================
echo.
echo Usuario: admin@ferreteria.cl
echo Password: admin123
echo.
pause
