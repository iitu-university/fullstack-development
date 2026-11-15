import { useState } from 'react'
import { ComponentsDemo } from '../../features/component-basics'
import { Es6Demo } from '../../features/javascript-basics'
import {
  PropsStateDemo,
  ConditionalDemo,
  BatchingDemo,
} from '../../features/component-state'
import { Counter, EffectsDemo, RefDemo } from '../../features/react-hooks'
import { ContextDemo } from '../../features/user-context'
import { ListsDemo } from '../../features/lists'
import { EventsDemo } from '../../features/events'
import { FormsDemo } from '../../features/forms'
import {
  TypesDemo,
  FunctionsDemo,
  TypedPropsDemo,
  TypedStateDemo,
  TypedForm,
} from '../../features/typescript'
import LessonNavigation from './components/LessonNavigation'
import {
  PromiseDemo,
  WeatherDemo,
  GithubDemo,
  ReactQueryDemo,
  RaceDemo,
  MutationDemo,
  FetchPostDemo,
  CacheDemo,
  CarRaceDemo,
} from '../../features/networking/Networking'
import styles from './ReactExamplesPage.module.css'

const lessons = [
  {
    id: 'components',
    title: 'Компоненты и JSX',
    component: ComponentsDemo,
  },
  { id: 'es6', title: 'Возможности ES6', component: Es6Demo },
  {
    id: 'props',
    title: 'Props и state',
    component: PropsStateDemo,
  },
  {
    id: 'conditional',
    title: 'Условный рендеринг',
    component: ConditionalDemo,
  },
  {
    id: 'counter',
    title: 'Счётчик и useTitle',
    component: Counter,
  },
  {
    id: 'batching',
    title: 'Batching и flushSync',
    component: BatchingDemo,
  },
  {
    id: 'effects',
    title: 'useEffect и cleanup',
    component: EffectsDemo,
  },
  { id: 'ref', title: 'Фокус с useRef', component: RefDemo },
  {
    id: 'context',
    title: 'Context API',
    component: ContextDemo,
  },
  {
    id: 'lists',
    title: 'Списки и таблицы',
    component: ListsDemo,
  },
  { id: 'events', title: 'События', component: EventsDemo },
  {
    id: 'forms',
    title: 'Управляемые формы',
    component: FormsDemo,
  },
  { id: 'typescript-types', title: 'Типы TypeScript', component: TypesDemo },
  {
    id: 'typescript-functions',
    title: 'Функции TypeScript',
    component: FunctionsDemo,
  },
  {
    id: 'typescript-props',
    title: 'Типизация props',
    component: TypedPropsDemo,
  },
  {
    id: 'typescript-state',
    title: 'Типизация state',
    component: TypedStateDemo,
  },
  { id: 'typescript-form', title: 'Форма TypeScript', component: TypedForm },
  { id: 'promises', title: 'Promise и async/await', component: PromiseDemo },
  { id: 'fetch-post', title: 'Fetch: POST', component: FetchPostDemo },
  { id: 'weather', title: 'Погода: fetch', component: WeatherDemo },
  { id: 'github', title: 'GitHub: Axios', component: GithubDemo },
  { id: 'race', title: 'Гонка запросов', component: RaceDemo },
  {
    id: 'race-cars',
    title: 'Гонка запросов: автомобили',
    component: CarRaceDemo,
  },
  { id: 'query', title: 'React Query', component: ReactQueryDemo },
  { id: 'cache', title: 'React Query: staleTime', component: CacheDemo },
  { id: 'mutation', title: 'React Query: изменения', component: MutationDemo },
]

function ReactExamplesPage() {
  const [activeId, setActiveId] = useState('components')
  const currentLesson =
    lessons.find((lesson) => lesson.id === activeId) ?? lessons[0]
  const Lesson = currentLesson.component

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <LessonNavigation
          lessons={lessons}
          activeId={activeId}
          onSelect={setActiveId}
        />
        <main
          className={styles.content}
          id="lesson"
          aria-label={currentLesson.title}
        >
          <Lesson key={activeId} />
        </main>
      </div>
    </div>
  )
}

export default ReactExamplesPage
