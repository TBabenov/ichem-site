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

- Production-сборка: `npm run build`
- Сборка для выкладки на сервер (в `dist/` попадёт и `.htaccess` для Apache): `npm run build:deploy`
- Локальный просмотр собранного бандла: `npm run preview`

## Деплой: только `dist/` (рекомендуемый процесс)

Собирайте **локально** (или в CI) и на хостинг заливайте **содержимое папки `dist/`** — исходники (`src/`) и `node_modules` на сервер не нужны.

1. В корне проекта задайте переменные для **production**-сборки (в терминале или в `.env.production`, не коммитьте секреты):
   - `VITE_RECAPTCHA_V3_SITE_KEY` — ключ reCAPTCHA (Enterprise/v3), как ожидает ваш бэкенд
   - при необходимости: `VITE_RECAPTCHA_V3_ACTION`, `VITE_CATALOG_API_BASE_URL` (если каталог не на том же origin)
2. `npm ci` (или `npm install`)
3. `npm run build:deploy` — появится `dist/` с бандлом и **`dist/.htaccess`**
4. На сервере (например каталог `.../public/home/` под `https://dev.ichem.kz/home/`) **замените или обновите файлы содержимым `dist/`**: `index.html`, `assets/`, всё остальное из `dist/`, включая `.htaccess`

Статика из репозитория (`images/`, `PDF/` и т.д.), которая попадает в сборку через `public/` или пути в коде, окажется внутри `dist/` после билда. Если какие-то тяжёлые файлы лежат только на сервере и не в репо — не удаляйте их при выкладке, либо перенесите их в `public/` и пересоберите.

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

- поддерживаются `en`, `ru` и `kz`
- язык хранится в состоянии `src/App.tsx` и переключается в `Header`

В URL локаль не вшита (роуты одинаковые, меняется только содержимое).

## Форма обратной связи (Contact)

Модальное окно `ContactForm` отправляет заявку на backend: **`POST /api/leads`** (JSON), с **reCAPTCHA v3 / Enterprise** токеном в поле `captcha_token`, honeypot `website_extra_field`, ключом идемпотентности `idempotency_key`.

- см. `src/components/ContactForm.tsx`
- для сборки нужен `VITE_RECAPTCHA_V3_SITE_KEY` (и при необходимости `VITE_RECAPTCHA_V3_ACTION`)

## Примечание про Supabase

В репозитории есть папка `supabase/` (миграции и функция отправки письма), но со стороны фронтенда в текущей реализации прямых вызовов Supabase/HTTP-клиента не видно.

Если backend будет отдавать каталог (товары/услуги), ориентируйтесь на то, чтобы фронтенд оставался в рамках текущего layout/design, заменив только источник данных.
