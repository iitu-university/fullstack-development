# Full Stack Development with Spring Boot 3 and React

Учебный репозиторий по книге Juha Hinkula, 4-е издание, 2023.

Два независимых проекта:

- `backend/` — Spring Boot 3.1.0, Java 17, Gradle, MariaDB, JPA, Spring Data REST, Spring Security и JWT. Тесты используют H2.
- `frontend/` — React 18.2.0, JavaScript/JSX, Vite 4.3.9. Здесь доступны 12 разделов с практическими примерами главы 8.
- `.vscode/` — настройки редактора, Java 17, ESLint и Prettier.
- `frontend/README.md` — структура frontend и команды запуска.

## Запуск примеров главы 8

Из каталога `frontend`:

```sh
npm ci
npm run dev
```

Откройте адрес, напечатанный Vite, обычно `http://localhost:5173`.
Выберите раздел в меню. При переключении состояние примера сбрасывается.
Для примеров эффектов откройте консоль браузера; для useTitle смотрите заголовок вкладки.
Примеры работают без запущенного backend.

Проверки из того же каталога:

```sh
npm run lint
npm run build
npm run examples:es6
```

## Backend

Нужны Java 17 и MariaDB с базой `cardb`; текущие параметры подключения находятся в
`backend/src/main/resources/application.properties`.

Из каталога `backend`:

```sh
./gradlew test
./gradlew bootRun
```

Тесты выбирают профиль `test` с H2 и не требуют MariaDB.
В приложении доступны Swagger `/swagger`, вход `POST /login`, данные `/api/cars`,
`/api/owners` и отдельный endpoint `/cars`.
Начальные учебные пользователи: `user/user` (чтение) и `admin/admin` (чтение и изменение).
Глава 8 не изменяет backend и не подключает React к его API.
