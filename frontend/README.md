# Frontend

React 18.2, TypeScript 5.2 и Vite 4.3.

Для примера погоды укажите ключ OpenWeather в `frontend/.env.local`:
`VITE_OPENWEATHER_API_KEY=ваш_ключ`. Переменные Vite доступны в браузере.

Приложения из главы 10 находятся в `weatherapp/`, `restgithub/` и `gitapi/`.
Для запуска каждого перейдите в его каталог и выполните `npm ci` и `npm run dev`.
Для `weatherapp` укажите ключ в `weatherapp/.env.local` по примеру `.env.example`.
Примеры автомобилей в общем меню используют `VITE_API_URL` и JWT backend.

## Глава 11

| Пример | Каталог | Что открыть |
| --- | --- | --- |
| React Date Picker | `frontend/` | Пункт **React Date Picker** в меню |
| AG Grid | `frontend/restgithub/` | Поиск репозиториев и таблица с фильтрами, сортировкой и пагинацией |
| MUI 5 | `frontend/shoppinglist/` | **Add Item** и форма с полями **Product** и **Amount** |
| React Router 6 | `frontend/routerapp/` | **Home**, **Contact**, **London**, **Paris**, `/contact/mike` и `/missing` |

В каталоге каждого приложения выполните `npm ci` и `npm run dev`.

## Главы 12 и 13

Перейдите в каталог `frontend/carfront` и запустите Vite.

```sh
npm ci
npm run dev
```

По адресу из строки `Local` открывается **Car Shop**. Таблица загружает
автомобили с `/api/cars` и поддерживает сортировку, фильтрацию и пагинацию.
**New Car**, **Edit** и **Delete** меняют записи в базе.
CSV доступен через **Export → Download as CSV**.
Адрес API по умолчанию — `http://localhost:8080`. Другой адрес можно указать
переменной `VITE_API_URL` в `frontend/carfront/.env.local`.

Для проверки REST API создайте в локальной MariaDB отдельную базу.

```sql
CREATE DATABASE IF NOT EXISTS cardb_chapter12;
```

Запустите Spring Boot из каталога `backend` с Java 17.

```sh
./gradlew bootRun --args='--spring.profiles.active=chapter12'
```

В другом терминале проверьте ответ API.

```sh
curl http://127.0.0.1:8080/api/cars
```

Профиль `chapter12` открывает API без JWT на `127.0.0.1`.
Параметры подключения MariaDB берутся из конфигурации backend, а имя базы
для этого профиля задано в `application-chapter12.properties`.

## Структура

- `src/app/` — приложение и общие стили.
- `src/pages/react-examples/` — страница со списком примеров и навигацией.
- `src/features/` — компоненты примеров по темам.
- `src/features/typescript/components/` — примеры главы 9.
- `src/shared/hooks/` — хук useTitle.

Список разделов находится в ReactExamplesPage, примеры ES6 — в Es6Demo,
контекст и его потребитель — в ContextDemo. Типы находятся рядом с компонентами.

Из каталога frontend:

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run typecheck
npm run build
npm run examples:es6
npm run examples:typescript
```

Команды examples проверяют ожидаемые ошибки из примеров учебника.
Сборка запускает проверку TypeScript перед Vite.
