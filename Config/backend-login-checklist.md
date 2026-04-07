# Почему `https://dev.ichem.kz/login` может отдавать 404

Фронт только ведёт на URL. Реальную страницу отдаёт **nginx → Apache :8082 → PHP**.

## 1. Проверить, что отвечает бэкенд напрямую (на сервере)

```bash
curl -sS -o /dev/null -w "%{http_code}\n" -H "Host: dev.ichem.kz" "http://127.0.0.1:8082/login"
```

- **404** — маршрута нет в приложении или неверный **DocumentRoot** / нет **rewrite** в Apache.
- **200 / 302** — бэкенд жив; тогда смотреть nginx (редко, если уже есть `proxy_pass`).

## 2. Apache: DocumentRoot и маршрутизация

- Для многих фреймворков **DocumentRoot** должен указывать на каталог **`public`**, где лежит `index.php`, а не на корень проекта.
- Нужны **mod_rewrite** и **`AllowOverride All`** для каталога, чтобы отрабатывал **`.htaccess`** (или правила в `vhosts-resources/dev.ichem.kz`).

## 3. CodeIgniter / аналог: `baseURL`

В `.env` бэкенда для dev:

`app.baseURL = 'https://dev.ichem.kz/'`

Без этого маршруты и редиректы часто ведут себя неправильно.

## 4. Временный обход на фронте (пока чинится сервер)

В GitHub **Secrets** задать **`VITE_LOGIN_URL`** = рабочий URL входа (например прод или отдельный стенд), в **Actions** передаётся в сборку — кнопка Login будет вести туда.

См. `README.md` и переменные в `.github/workflows/deploy-dev.yml`.
