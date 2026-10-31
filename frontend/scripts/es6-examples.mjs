import assert from 'node:assert/strict'
import { runInNewContext } from 'node:vm'

const errorExamples = [
  {
    title: 'Переназначение const',
    source: 'const PI = 3.14159; PI = 4;',
    error: 'TypeError',
  },
  {
    title: 'Доступ вне блока',
    source: 'if (true) { const total = 20; } total;',
    error: 'ReferenceError',
  },
  {
    title: 'Прямое изменение state-переменной',
    source: 'const name = "Jim"; name = "John";',
    error: 'TypeError',
  },
]

for (const { title, source, error } of errorExamples) {
  assert.throws(() => runInNewContext(source), { name: error })
  console.log(`${title}: ожидаемая ${error} подтверждена`)
}
