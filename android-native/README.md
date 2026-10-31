# Дунхуа ТВ — Android TV Application

## 📱 О проекте

Нативное приложение для Android TV для просмотра китайской анимации (дунхуа) с сайта [dunhuatv.ru](https://dunhuatv.ru/).

Оптимизировано для просмотра на телевизоре с навигацией через пульт ДУ (D-pad).

## 🛠 Технологический стек

- **Язык:** Kotlin
- **UI:** Jetpack Compose for TV (TvLazyRow, TvLazyColumn, Card)
- **Видео:** AndroidX Media3 (ExoPlayer)
- **Сеть:** Retrofit + OkHttp + Jsoup (HTML-парсинг)
- **Изображения:** Coil
- **Архитектура:** MVVM + Clean Architecture
- **DI:** Dagger Hilt
- **Навигация:** Navigation Compose

## 📁 Структура проекта

```
app/src/main/java/ru/dunhuatv/app/
├── data/
│   ├── remote/
│   │   └── DunhuaHtmlParser.kt    # Jsoup-парсер dunhuatv.ru
│   └── repository/
│       └── DunhuaRepository.kt    # Репозиторий (Mock + интерфейс)
├── di/
│   └── AppModule.kt               # Hilt DI модуль
├── domain/
│   └── model/
│       └── Models.kt              # Модели данных
├── presentation/
│   ├── MainActivity.kt            # Точка входа + навигация
│   ├── home/
│   │   ├── HomeScreen.kt          # Главный экран с рядами
│   │   └── HomeViewModel.kt       # ViewModel
│   └── player/
│       ├── PlayerScreen.kt        # Видеоплеер с D-pad
│       └── PlayerViewModel.kt     # ViewModel
└── ui/
    └── theme/
        ├── Color.kt               # Цвета темы
        └── Theme.kt               # Тема Material3
```

## 🚀 Как использовать

### Вариант 1: PWA (веб-приложение)

Текущий проект уже собран как PWA с TV-интерфейсом. Откройте `dist/index.html` в браузере на Android TV.

### Вариант 2: Нативное Android-приложение

1. Создайте новый проект в Android Studio (Empty Activity, Kotlin)
2. Скопируйте файлы из папки `android-native/` в ваш проект
3. Обновите `build.gradle.kts` (Module: app) содержимым из `app/build.gradle.kts`
4. Скопируйте `AndroidManifest.xml` из `app/src/main/`
5. Синхронизируйте Gradle и запустите на Android TV эмуляторе или устройстве

## 🎮 Управление (пульт ДУ)

| Кнопка | Действие |
|--------|----------|
| ← → ↑ ↓ | Навигация по интерфейсу |
| OK/Enter | Выбрать / Воспроизвести |
| Back/Esc | Назад |
| Space | Пауза / Воспроизведение |
| → (плеер) | Перемотка +10 сек |
| ← (плеер) | Перемотка -10 сек |
| ↑ ↓ (плеер) | Громкость |
| N | Следующая серия |
| F | Полный экран |

## 🔄 Переключение с моков на реальный парсинг

В файле `di/AppModule.kt` замените:

```kotlin
// Было:
return MockDunhuaRepository()

// Станет:
return RealDunhuaRepository(DunhuaHtmlParser())
```

И создайте `RealDunhuaRepository`, реализующий интерфейс `DunhuaRepository` с использованием `DunhuaHtmlParser`.

## ⚠️ Примечания

- HTML-парсинг зависит от структуры сайта. При изменении верстки dunhuatv.ru обновите CSS-селекторы в `DunhuaHtmlParser.kt`
- Для production рекомендуется проксировать запросы через собственный бэкенд
- ExoPlayer поддерживает HLS, DASH и прогрессивный MP4
- Минимальная версия Android: 8.0 (API 26) для поддержки Leanback

## 📺 TV UI особенности

- **Фокус:** Все интерактивные элементы имеют чёткое состояние фокуса (увеличение 1.08x + рамка)
- **Размеры:** Крупные шрифты (от 14sp) и отступы для просмотра с 3 метров
- **Тёмная тема:** По умолчанию, оптимизирована для OLED/AMOLED телевизоров
- **Анимации:** Плавные переходы при навигации (200ms)

## 📝 Лицензия

Проект создан для образовательных целей. Контент принадлежит dunhuatv.ru.
