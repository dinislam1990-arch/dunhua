#!/bin/bash
# ============================================================================
# Скрипт сборки APK для Дунхуа ТВ через Bubblewrap (TWA)
# ============================================================================
# Использование: ./build-apk.sh https://ваш-домен.ru
# ============================================================================

set -e

echo "🎬 Дунхуа ТВ — Сборка APK"
echo "=========================="

# Проверка аргументов
if [ -z "$1" ]; then
    echo "❌ Ошибка: Укажите URL вашего PWA"
    echo "Использование: ./build-apk.sh https://ваш-домен.ru"
    exit 1
fi

PWA_URL=$1
echo "📱 PWA URL: $PWA_URL"

# Проверка зависимостей
echo ""
echo "🔍 Проверка зависимостей..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен. Установите: https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js: $(node --version)"

if ! command -v java &> /dev/null; then
    echo "❌ Java не установлен. Установите JDK 17: https://adoptium.net/"
    exit 1
fi
echo "✅ Java: $(java -version 2>&1 | head -n 1)"

if ! command -v bubblewrap &> /dev/null; then
    echo "📦 Установка Bubblewrap..."
    npm install -g @bubblewrap/cli
fi
echo "✅ Bubblewrap установлен"

# Создание проекта
echo ""
echo "🏗  Создание TWA проекта..."
mkdir -p dunhuatv-twa
cd dunhuatv-twa

# Инициализация
bubblewrap init --manifest="$PWA_URL/manifest.json"

# Обновление конфигурации
echo "⚙️  Настройка конфигурации..."
cat > twa-manifest.json << EOF
{
  "packageId": "ru.dunhuatv.app",
  "host": "$(echo $PWA_URL | sed 's|https://||')",
  "name": "Дунхуа ТВ",
  "shortName": "Дунхуа ТВ",
  "launcherName": "Дунхуа ТВ",
  "display": "fullscreen",
  "themeColor": "#E94560",
  "navigationColor": "#0A0A1A",
  "navigationDividerColor": "#0A0A1A",
  "backgroundColor": "#0A0A1A",
  "enableNotifications": true,
  "startUrl": "/",
  "iconUrl": "$PWA_URL/icons/icon-512.png",
  "splashScreenFadeOutDuration": 300,
  "signingKey": {
    "path": "./android.keystore",
    "alias": "dunhuatv"
  },
  "appVersionCode": 1,
  "appVersionName": "1.0.0",
  "shortcuts": [],
  "generatorApp": "bubblewrap-cli",
  "webManifestUrl": "$PWA_URL/manifest.json",
  "fallbackType": "customtabs",
  "features": {},
  "alphaDependencies": {
    "enabled": false
  },
  "enableSiteSettingsShortcut": true,
  "isChromeOSOnly": false,
  "orientation": "landscape",
  "fingerprints": []
}
EOF

# Создание ключа подписи
echo ""
echo "🔐 Создание ключа подписи..."
if [ ! -f android.keystore ]; then
    echo "Введите пароль для keystore (минимум 6 символов):"
    read -s KEYSTORE_PASSWORD
    
    keytool -genkey -v -keystore android.keystore -alias dunhuatv \
        -keyalg RSA -keysize 2048 -validity 10000 \
        -storepass "$KEYSTORE_PASSWORD" -keypass "$KEYSTORE_PASSWORD" \
        -dname "CN=Дунхуа ТВ, OU=Development, O=DunhuaTV, L=Moscow, ST=Moscow, C=RU"
    
    echo "✅ Ключ создан: android.keystore"
    echo "⚠️  ВАЖНО: Сохраните пароль в безопасном месте!"
    echo "$KEYSTORE_PASSWORD" > .keystore-password
    chmod 600 .keystore-password
else
    echo "✅ Ключ уже существует"
fi

# Сборка APK
echo ""
echo "🔨 Сборка APK..."
bubblewrap update
bubblewrap build

# Результат
echo ""
echo "✅ Сборка завершена!"
echo ""
echo "📦 APK файлы:"
ls -lh app-*.apk 2>/dev/null || echo "APK не найдены"
echo ""
echo "📱 Установка на Android TV:"
echo "   adb connect IP_АДРЕС_TV"
echo "   adb install app-release-signed.apk"
echo ""
echo "🔐 Digital Asset Links (для верификации TWA):"
echo "   Создайте файл .well-known/assetlinks.json на вашем сервере"
echo "   SHA256 отпечаток:"
keytool -list -v -keystore android.keystore -alias dunhuatv | grep SHA256
echo ""
echo "🎉 Готово!"
