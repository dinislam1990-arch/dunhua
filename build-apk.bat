@echo off
REM ============================================================================
REM Скрипт сборки APK для Дунхуа ТВ через Bubblewrap (TWA) - Windows
REM ============================================================================
REM Использование: build-apk.bat https://ваш-домен.ru
REM ============================================================================

echo 🎬 Дунхуа ТВ — Сборка APK
echo ==========================

REM Проверка аргументов
IF "%~1"=="" (
    echo ❌ Ошибка: Укажите URL вашего PWA
    echo Использование: build-apk.bat https://ваш-домен.ru
    exit /b 1
)

set PWA_URL=%~1
echo 📱 PWA URL: %PWA_URL%

REM Проверка зависимостей
echo.
echo 🔍 Проверка зависимостей...

where node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js не установлен. Установите: https://nodejs.org/
    exit /b 1
)
echo ✅ Node.js установлен

where java >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Java не установлен. Установите JDK 17: https://adoptium.net/
    exit /b 1
)
echo ✅ Java установлен

where bubblewrap >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo 📦 Установка Bubblewrap...
    call npm install -g @bubblewrap/cli
)
echo ✅ Bubblewrap установлен

REM Создание проекта
echo.
echo 🏗  Создание TWA проекта...
if not exist "dunhuatv-twa" mkdir dunhuatv-twa
cd dunhuatv-twa

REM Инициализация
call bubblewrap init --manifest=%PWA_URL%/manifest.json

REM Создание ключа подписи
echo.
echo 🔐 Создание ключа подписи...
if not exist "android.keystore" (
    set /p KEYSTORE_PASSWORD="Введите пароль для keystore (минимум 6 символов): "
    
    keytool -genkey -v -keystore android.keystore -alias dunhuatv ^
        -keyalg RSA -keysize 2048 -validity 10000 ^
        -storepass %KEYSTORE_PASSWORD% -keypass %KEYSTORE_PASSWORD% ^
        -dname "CN=DunhuaTV, OU=Development, O=DunhuaTV, L=Moscow, ST=Moscow, C=RU"
    
    echo ✅ Ключ создан: android.keystore
    echo ⚠️  ВАЖНО: Сохраните пароль в безопасном месте!
) else (
    echo ✅ Ключ уже существует
)

REM Сборка APK
echo.
echo 🔨 Сборка APK...
call bubblewrap update
call bubblewrap build

REM Результат
echo.
echo ✅ Сборка завершена!
echo.
echo 📦 APK файлы:
dir app-*.apk
echo.
echo 📱 Установка на Android TV:
echo    adb connect IP_АДРЕС_TV
echo    adb install app-release-signed.apk
echo.
echo 🎉 Готово!
pause
