# 📱 Дунхуа ТВ — Быстрый старт для получения APK

## ⚡ Самый быстрый способ (2 минуты)

### 1. Установите PWA напрямую на Android TV

**На Android TV:**
1. Установите браузер **TV Bro** из Google Play Store
2. Откройте URL: `https://dunhuatv-app.netlify.app` (или ваш хостинг)
3. Нажмите кнопку меню → "Добавить на главный экран"
4. Готово! Приложение появится в списке приложений TV

**На Android-телефоне:**
1. Откройте Chrome
2. Перейдите на URL приложения
3. Нажмите меню (⋮) → "Установить приложение"
4. Готово!

---

## 🚀 Способ 2: Создать APK через TWA (15 минут)

### Что нужно:
- ✅ Компьютер (Windows/Mac/Linux)
- ✅ Node.js 18+ ([скачать](https://nodejs.org))
- ✅ Java JDK 17 ([скачать](https://adoptium.net))
- ✅ PWA размещённое на HTTPS-хостинге

### Шаг 1: Разместите PWA на хостинге

**Вариант A: Netlify (проще всего)**
1. Перейдите на https://app.netlify.com/drop
2. Перетащите папку `dist/` в браузер
3. Получите URL вида `https://random-name.netlify.app`

**Вариант B: Vercel**
1. Установите Vercel CLI: `npm i -g vercel`
2. В папке проекта выполните: `vercel`
3. Следуйте инструкциям

**Вариант C: GitHub Pages**
1. Загрузите `dist/` в репозиторий GitHub
2. Включите GitHub Pages в настройках
3. Получите URL вида `https://username.github.io/repo`

### Шаг 2: Запустите скрипт сборки

**На Windows:**
```cmd
build-apk.bat https://ваш-домен.netlify.app
```

**На Mac/Linux:**
```bash
chmod +x build-apk.sh
./build-apk.sh https://ваш-домен.netlify.app
```

### Шаг 3: Установите APK на TV

```bash
# Подключите TV по ADB
adb connect 192.168.1.100  # IP вашего TV

# Установите APK
adb install dunhuatv-twa/app-release-signed.apk
```

---

## 📦 Что вы получите

После сборки у вас будет:

```
dunhuatv-twa/
├── app-release-signed.apk      ← Готовый APK для установки
├── app-release-unsigned.apk    ← Для публикации в Google Play
├── android.keystore            ← Ключ подписи (СОХРАНИТЕ!)
└── twa-manifest.json           ← Конфигурация
```

---

## 🎯 Установка APK на Android TV

### Метод 1: Через ADB (рекомендуется)

1. **Включите режим разработчика на TV:**
   - Настройки → О телевизоре → 7 раз нажмите "Номер сборки"
   - Настройки → Для разработчиков → Включите "Отладка по USB"

2. **Найдите IP адрес TV:**
   - Настройки → Сеть → IP адрес

3. **Подключитесь и установите:**
   ```bash
   adb connect 192.168.1.100
   adb install app-release-signed.apk
   ```

### Метод 2: Через USB-флешку

1. Скопируйте `app-release-signed.apk` на USB-флешку
2. Вставьте флешку в TV
3. Откройте файловый менеджер на TV
4. Нажмите на APK → Установить

### Метод 3: Через "Send files to TV"

1. Установите "Send files to TV" на телефон и TV из Google Play
2. Отправьте APK с телефона на TV
3. Установите на TV

---

## 🔧 Решение проблем

### Ошибка: "App not installed"
- Включите "Установка из неизвестных источников" в настройках TV
- Удалите старую версию приложения если есть

### Ошибка: "Installation blocked"
- Настройки → Безопасность → Разрешите установку из неизвестных источников

### Приложение не запускается
- Проверьте, что PWA доступен по HTTPS
- Очистите кэш браузера на TV

### TWA показывает адресную строку
- Настройте Digital Asset Links (см. BUILD_APK_INSTRUCTIONS.md)

---

## 📞 Нужна помощь?

1. **Подробная инструкция:** `BUILD_APK_INSTRUCTIONS.md`
2. **Документация TWA:** https://developer.chrome.com/docs/android/trusted-web-activity
3. **Bubblewrap:** https://github.com/GoogleChrome/bubblewrap

---

## ✅ Быстрый чеклист

- [ ] Node.js установлен
- [ ] Java JDK 17 установлен
- [ ] PWA размещено на HTTPS
- [ ] Скрипт сборки запущен
- [ ] APK создан
- [ ] APK установлен на TV
- [ ] Приложение работает

---

**Готово!** 🎉 Теперь у вас есть APK для Android TV.

Если возникли вопросы — прочитайте `BUILD_APK_INSTRUCTIONS.md` для детальной информации.
