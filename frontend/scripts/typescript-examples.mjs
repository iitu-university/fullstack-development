import assert from 'node:assert/strict'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const root = fileURLToPath(new URL('../', import.meta.url))
const file = resolve(root, 'src/typescript-exercise.tsx')
const configFile = ts.readConfigFile(
  resolve(root, 'tsconfig.json'),
  ts.sys.readFile,
)
const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, root)
const options = {
  ...config.options,
  noUnusedLocals: false,
  noUnusedParameters: false,
}

const examples = [
  {
    name: 'Корректные props, state и unknown',
    source: `
      import { useState } from 'react'
      import HelloComponent from './features/typescript/components/HelloComponent'
      const element = <HelloComponent name="Mary" age={12} />
      const [message, setMessage] = useState<string | undefined>(undefined)
      setMessage('Hello')
      setMessage(undefined)
      const value: unknown = 'Hello'
      if (typeof value === 'string') console.log(value.toUpperCase())
    `,
    error: null,
  },
  {
    name: 'Вывод типа переменной',
    source: `let message = 'Hello'; message = 12`,
    error: 2322,
  },
  {
    name: 'Тип свойства interface',
    source: `interface Student { id: number; name: string }; const student: Student = { id: '1', name: 'Lisa' }`,
    error: 2322,
  },
  {
    name: 'Неизвестный тип',
    source: `function read(value: unknown) { return value.toUpperCase() }`,
    error: 18046,
  },
  {
    name: 'Optional-свойство',
    source: `type Person = { address?: { street: string } }; const person: Person = {}; console.log(person.address.street)`,
    error: 18048,
  },
  {
    name: 'Union для топлива',
    source: `type Fuel = 'diesel' | 'gasoline' | 'electric'; const fuel: Fuel = 'hybrid'`,
    error: 2322,
  },
  {
    name: 'Union для числа передач',
    source: `type NoOfGears = 5 | 6 | 7; const gears: NoOfGears = 4`,
    error: 2322,
  },
  {
    name: 'Тип аргумента функции',
    source: `function sayHello(name: string): void { console.log(name) }; sayHello(12)`,
    error: 2345,
  },
  {
    name: 'Тип React props',
    source: `import HelloComponent from './features/typescript/components/HelloComponent'; const element = <HelloComponent name="Mary" age="12" />`,
    error: 2322,
  },
  {
    name: 'Вывод типа React state',
    source: `import { useState } from 'react'; const [isReady, setReady] = useState(false); setReady('true')`,
    error: 2345,
  },
  {
    name: 'Явный тип React state',
    source: `import { useState } from 'react'; const [message, setMessage] = useState<string | undefined>(undefined); setMessage(12)`,
    error: 2345,
  },
  {
    name: 'Тип события',
    source: `function handleChange(event) { console.log(event.target.value) }`,
    error: 7006,
  },
]

for (const example of examples) {
  const host = ts.createCompilerHost(options)
  const getSourceFile = host.getSourceFile.bind(host)
  host.getSourceFile = (
    fileName,
    languageVersion,
    onError,
    shouldCreateNewSourceFile,
  ) => {
    if (resolve(fileName) === file) {
      return ts.createSourceFile(
        fileName,
        example.source,
        languageVersion,
        true,
        ts.ScriptKind.TSX,
      )
    }

    return getSourceFile(
      fileName,
      languageVersion,
      onError,
      shouldCreateNewSourceFile,
    )
  }

  const program = ts.createProgram([file], options, host)
  const diagnostics = ts.getPreEmitDiagnostics(program)

  if (example.error === null) {
    assert.equal(
      diagnostics.length,
      0,
      ts.formatDiagnosticsWithColorAndContext(diagnostics, host),
    )
    console.log(`${example.name}: OK`)
  } else {
    assert.ok(diagnostics.length > 0, example.name)
    assert.ok(
      diagnostics.every((diagnostic) => diagnostic.code === example.error),
      ts.formatDiagnosticsWithColorAndContext(diagnostics, host),
    )
    console.log(`${example.name}: ожидаемая ошибка TS${example.error}`)
  }
}
