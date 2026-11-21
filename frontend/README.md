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
