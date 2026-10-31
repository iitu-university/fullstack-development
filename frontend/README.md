# Frontend

React 18.2, JavaScript и Vite.

- `src/app/` — приложение и общие стили.
- `src/pages/react-examples/` — страница со списком примеров и навигацией.
- `src/features/` — компоненты примеров по темам.
- `src/shared/hooks/` — хук useTitle.

Список разделов находится в ReactExamplesPage, примеры ES6 — в Es6Demo,
контекст и его потребитель — в ContextDemo.

Из каталога frontend:

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run build
npm run examples:es6
```

Последняя команда проверяет ожидаемые ошибки из примеров ES6.
