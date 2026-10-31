import styles from './LessonNavigation.module.css'

function LessonNavigation({ lessons, activeId, onSelect }) {
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
