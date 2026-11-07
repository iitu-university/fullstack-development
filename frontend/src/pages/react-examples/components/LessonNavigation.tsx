import styles from './LessonNavigation.module.css'

type NavigationProps = {
  lessons: { id: string; title: string }[]
  activeId: string
  onSelect: (id: string) => void
}

function LessonNavigation({ lessons, activeId, onSelect }: NavigationProps) {
  return (
    <nav className={styles.navigation}>
      {lessons.map(({ id, title }, index) => (
        <button
          key={id}
          type="button"
          aria-current={activeId === id ? 'page' : undefined}
          onClick={() => onSelect(id)}
        >
          <span className={styles.number}>
            {String(index + 1).padStart(2, '0')}
          </span>
          {title}
        </button>
      ))}
    </nav>
  )
}

export default LessonNavigation
