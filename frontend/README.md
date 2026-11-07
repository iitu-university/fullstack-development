# Frontend

React 18.2, TypeScript 5.2 и Vite 4.3.

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
