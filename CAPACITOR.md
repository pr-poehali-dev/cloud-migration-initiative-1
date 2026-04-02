# Capacitor — сборка мобильного приложения

Проект настроен для сборки нативных приложений (Android / iOS) через [Capacitor](https://capacitorjs.com/).

## Установленные пакеты

| Пакет | Версия |
|---|---|
| `@capacitor/core` | 8.x |
| `@capacitor/cli` | 8.x |
| `@capacitor/android` | 8.x |
| `@capacitor/ios` | 8.x |

## Ключевые файлы

| Файл | Описание |
|---|---|
| `capacitor.config.ts` | Основной конфиг Capacitor (appId, appName, webDir) |
| `vite.capacitor.config.ts` | Vite-конфиг для мобильной сборки (`base: './'`) |

---

## Быстрый старт

### 1. Собрать веб-часть для мобильной сборки

```bash
npx vite build --config vite.capacitor.config.ts
```

### 2. Добавить платформы (один раз)

```bash
npx cap add android
npx cap add ios
```

### 3. Синхронизировать веб-сборку с нативными проектами

```bash
npx cap sync
```

> `cap sync` = копирует `dist/` в нативный проект + обновляет плагины.

### 4. Открыть в IDE и запустить

```bash
npx cap open android   # Открывает Android Studio
npx cap open ios       # Открывает Xcode
```

---

## Полный цикл (пересборка + деплой)

```bash
# Шаг 1: сборка веба
npx vite build --config vite.capacitor.config.ts

# Шаг 2: синхронизация с нативным проектом
npx cap sync android   # или ios

# Шаг 3: открыть IDE
npx cap open android
```

---

## Рекомендуемые скрипты (добавить в package.json)

```json
{
  "scripts": {
    "build:mobile":       "vite build --config vite.capacitor.config.ts",
    "cap:sync:android":   "vite build --config vite.capacitor.config.ts && npx cap sync android",
    "cap:sync:ios":       "vite build --config vite.capacitor.config.ts && npx cap sync ios",
    "cap:open:android":   "npx cap open android",
    "cap:open:ios":       "npx cap open ios"
  }
}
```

---

## Конфигурация приложения (`capacitor.config.ts`)

```ts
{
  appId: 'ru.finpotok.app',   // Bundle ID / Application ID
  appName: 'ФинПоток',        // Название приложения
  webDir: 'dist',             // Папка с веб-сборкой
  server: {
    androidScheme: 'https'    // HTTPS схема для Android WebView
  }
}
```

Для изменения названия, иконок или splash-экрана — редактируйте `capacitor.config.ts`.

---

## Требования

- **Android**: Android Studio + Android SDK (API 22+)
- **iOS**: Xcode 14+ (только на macOS)
- **Node.js**: 18+

---

## Полезные команды

```bash
npx cap --version          # Версия Capacitor CLI
npx cap doctor             # Проверка среды и конфигурации
npx cap copy android       # Только копирует dist/ без обновления плагинов
npx cap update             # Обновляет нативные плагины
```
