# ichem-site

Сайт компании `Innovative Chemicals` (каталог товаров и услуг + страницы компании) — одностраничное приложение на **Vite + React + TypeScript**.

## Стек

- `vite` (сборка/дев-сервер)
- `react` + `react-dom`
- `react-router-dom` (клиентский роутинг)
- `tailwindcss` (стилизация)
- `typescript`

## Требования

- Node.js (рекомендуется версия из вашей текущей toolchain; проект использует TypeScript и Vite)

## Установка и локальный запуск

1. `npm install`
2. `npm run dev`

## Сборка и предпросмотр

- Build: `npm run build`
- Preview: `npm run preview`

## Деплой и base path

В production проект собирается с `base: /home/` (см. `vite.config.ts`). На рантайме роутер использует `basename`:

- dev: `/`
- prod: `/home`

Поэтому вёрстка и ссылки на статику используют префикс `/home/`:

- изображения: `/home/images/...`
- PDF: `/home/PDF/...`
- видео (на главной/в hero-блоках): `/home/videos/...`

Если вы размещаете сайт на другом пути — обновите `base`/`basename` и места, где формируются URL к статике.

## Архитектура

- `src/App.tsx` — общий layout (шапка `Header`, `main` с роутами, подвал `Footer`) + модальное окно `ContactForm`.
- `src/pages/*` — страницы приложения:
  - `/` → `HomePage`
  - `/products` → `ProductsPage` (каталог продуктов)
  - `/services` → `ServicesPage` (каталог услуг)
  - `/rd` → `RDPage`
  - `/contact` → `ContactPage`
- `src/components/*` — переиспользуемые секции (Hero/About/Experience/Partners/…).
- Данные каталога и переводов: `src/data/translations.ts`

## Каталог товаров и услуг (текущая реализация)

Контент каталога сейчас берётся из публичного backend API:

- `/api/catalog?lang=...` (в dev запросы идут через `vite` proxy)

Отрисовка:

- продукты → `src/pages/ProductsPage.tsx`
  - данные грузятся через `src/hooks/useProductsCatalog.ts`
  - секции категорий формируются по stableKey `category_en`
  - label/описания категорий берутся по активному языку из полей `category_ru`/`category_kz` (с fallback на `en`)
  - PDF: `pdf_url` из API (может быть `null`); если `null`, используются fallback-данные из `src/data/fallback/products.ts`
- услуги → `src/components/Services.tsx`, вызывается из `src/pages/ServicesPage.tsx`
  - данные грузятся через `src/hooks/useServicesCatalog.ts`
  - фильтр: `type === "service"`
  - группировка: `category_key`
  - описание группы показывается один раз из `category_description` (если `null` — не показывается)
  - карточки услуг: `name` + `description`

`src/data/translations.ts` при этом используется как UI-переводы и fallback, когда API недоступен.

## Мультиязычность

Включена простая локализация через `translations.ts`:

- поддерживаются `en` и `ru`
- язык хранится в состоянии `src/App.tsx` и переключается в `Header`

В URL локаль не вшита (роуты одинаковые, меняется только содержимое).

## Форма обратной связи (Contact)

Модальное окно `ContactForm` отправляет сообщение через **EmailJS**:

- см. `src/components/ContactForm.tsx`
- `EMAILJS_USER_ID` и идентификаторы `service_ichem_mail` / `template_ichem_email` сейчас заданы в коде

Если планируется интеграция с backend, лучше перенести отправку на сервер (чтобы не хранить ключи EmailJS в клиенте).

## Примечание про Supabase

В репозитории есть папка `supabase/` (миграции и функция отправки письма), но со стороны фронтенда в текущей реализации прямых вызовов Supabase/HTTP-клиента не видно.

Если backend будет отдавать каталог (товары/услуги), ориентируйтесь на то, чтобы фронтенд оставался в рамках текущего layout/design, заменив только источник данных.
