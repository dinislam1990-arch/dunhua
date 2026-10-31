# 📱 Как получить APK для Android TV

## 🚀 Способ 1: TWA (Trusted Web Activity) — РЕКОМЕНДУЕТСЯ

**Время:** 15-30 минут  
**Сложность:** Средняя  
**Результат:** Готовый APK для установки на Android TV

### Что это?
Google TWA (Trusted Web Activity) — официальный способ обернуть PWA в нативный Android APK. Приложение будет работать в полноэкранном режиме без адресной строки браузера.

### Пошаговая инструкция:

#### Шаг 1: Разместите PWA на хостинге

Вам нужен HTTPS-хостинг для PWA. Варианты:
- **Netlify** (бесплатно): https://app.netlify.com/drop
- **Vercel** (бесплатно): https://vercel.com
- **GitHub Pages** (бесплатно): https://pages.github.com

Загрузите содержимое папки `dist/` на хостинг.

#### Шаг 2: Установите Bubblewrap

Bubblewrap — официальный инструмент Google для создания TWA:

```bash
# Установите Node.js 18+ если ещё не установлен
# https://nodejs.org/

# Установите Bubblewrap глобально
npm install -g @bubblewrap/cli

# Инициализируйте проект
mkdir dunhuatv-twa && cd dunhuatv-twa
bubblewrap init --manifest=https://ВАШ_ДОМЕН/manifest.json
```

#### Шаг 3: Настройте проект

Откройте `twa-manifest.json` и измените:

```json
{
  "packageId": "ru.dunhuatv.app",
  "host": "ВАШ_ДОМЕН",
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
  "iconUrl": "https://ВАШ_ДОМЕН/icons/icon-512.png",
  "splashScreenFadeOutDuration": 300,
  "signingKey": {
    "path": "./android.keystore",
    "alias": "dunhuatv"
  },
  "appVersionCode": 1,
  "appVersionName": "1.0.0",
  "shortcuts": [],
  "generatorApp": "bubblewrap-cli",
  "webManifestUrl": "https://ВАШ_ДОМЕН/manifest.json",
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
```

#### Шаг 4: Соберите APK

```bash
# Создайте signing key (сохраните пароль!)
keytool -genkey -v -keystore android.keystore -alias dunhuatv \
  -keyalg RSA -keysize 2048 -validity 10000

# Соберите APK
bubblewrap build
```

После сборки вы получите:
- `app-release-signed.apk` — готовый APK для установки
- `app-release-unsigned.apk` — для публикации в Google Play

#### Шаг 5: Установите на Android TV

```bash
# Подключите TV по ADB
adb connect IP_АДРЕС_TV

# Установите APK
adb install app-release-signed.apk
```

---

## 🛠 Способ 2: Нативное Android-приложение (Kotlin)

**Время:** 1-2 часа  
**Сложность:** Высокая  
**Результат:** Полностью нативное приложение

### Инструкция:

1. **Установите Android Studio**
   - Скачайте: https://developer.android.com/studio
   - Установите Android SDK (API 26+)

2. **Создайте проект**
   ```bash
   # Создайте новый проект в Android Studio
   # Template: Empty Activity
   # Language: Kotlin
   # Minimum SDK: API 26 (Android 8.0)
   ```

3. **Скопируйте файлы из `android-native/`**
   - Скопируйте всю структуру пакетов
   - Обновите `build.gradle.kts`
   - Скопируйте `AndroidManifest.xml`

4. **Соберите APK**
   ```bash
   # В терминале Android Studio:
   ./gradlew assembleRelease
   ```

5. **Найдите APK**
   ```
   app/build/outputs/apk/release/app-release.apk
   ```

---

## ⚡ Способ 3: Быстрая установка PWA (без APK)

**Время:** 2 минуты  
**Сложность:** Очень низкая  
**Результат:** PWA, установленное как приложение

### На Android TV:

1. Установите браузер **TV Bro** или **Puffin TV** из Google Play
2. Откройте URL вашего PWA: `https://ВАШ_ДОМЕН`
3. Нажмите меню → "Добавить на главный экран"
4. Приложение появится в списке приложений TV

### На Android-телефоне/планшете:

1. Откройте Chrome
2. Перейдите на `https://ВАШ_ДОМЕН`
3. Нажмите меню (⋮) → "Установить приложение"
4. Готово!

---

## 🔧 Необходимые инструменты

### Для TWA (Способ 1):
- Node.js 18+: https://nodejs.org
- Java JDK 17: https://adoptium.net
- Android SDK (установится автоматически с Bubblewrap)

### Для нативного приложения (Способ 2):
- Android Studio: https://developer.android.com/studio
- Java JDK 17
- Git

---

## 📦 Структура проекта для TWA

```
dunhuatv-twa/
├── twa-manifest.json          # Конфигурация TWA
├── android.keystore           # Ключ подписи (создайте сами)
├── app-release-signed.apk     # Готовый APK (после сборки)
└── .bubblewrap/               # Временные файлы сборки
```

---

## 🎯 Рекомендации

### Для быстрого старта:
Используйте **Способ 3** (PWA) — работает сразу, без сборки.

### Для публикации в Google Play:
Используйте **Способ 1** (TWA) — официальный метод Google.

### Для максимальной производительности:
Используйте **Способ 2** (нативное приложение) — полный контроль.

---

## 🆘 Решение проблем

### Ошибка: "Manifest not found"
- Убедитесь, что `manifest.json` доступен по HTTPS
- Проверьте CORS-заголовки на сервере

### Ошибка: "Digital Asset Links verification failed"
Для TWA нужно настроить Digital Asset Links:

1. Создайте файл `assetlinks.json`:
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "ru.dunhuatv.app",
    "sha256_cert_fingerprints": [
      "ВАШ_SHA256_ОТПЕЧАТОК"
    ]
  }
}]
```

2. Разместите по URL: `https://ВАШ_ДОМЕН/.well-known/assetlinks.json`

3. Получите SHA256 отпечаток:
```bash
keytool -list -v -keystore android.keystore -alias dunhuatv
```

### APK не устанавливается на TV
- Убедитесь, что TV поддерживает установку из неизвестных источников
- Проверьте `minSdk` в manifest (должен быть ≤ версии Android TV)

---

## 📞 Поддержка

Если возникли вопросы:
1. Проверьте логи: `adb logcat | grep -i "dunhuatv"`
2. Документация TWA: https://developer.chrome.com/docs/android/trusted-web-activity
3. Bubblewrap: https://github.com/GoogleChrome/bubblewrap

---

## ✅ Чеклист перед публикацией

- [ ] PWA размещено на HTTPS-хостинге
- [ ] `manifest.json` доступен и валиден
- [ ] Service Worker работает (проверьте в DevTools)
- [ ] Иконки всех размеров созданы
- [ ] Digital Asset Links настроены (для TWA)
- [ ] APK протестирован на реальном устройстве
- [ ] Подпись APK сохранена в безопасном месте

---

**Готово!** Теперь у вас есть все инструменты для создания APK. Выберите подходящий способ и следуйте инструкции.
