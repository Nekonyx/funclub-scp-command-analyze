import { useEffect, useState } from 'react'

import { CommandParameter } from './commands/command-parameter'
import { parseArguments } from './commands/parse-argument'
import { parseSyntax } from './commands/parse-syntax'

export const App: React.FC = () => {
  const [syntax, setSyntax] = useState('')
  const [input, setInput] = useState('')

  const [params, setParams] = useState<CommandParameter[]>([])
  const [args, setArgs] = useState<Record<string, string>>({})

  const argsEntries = Object.entries(args)
  const argsCount = argsEntries.reduce(
    (acc, arg) => acc + Number(arg[1].length > 0),
    0
  )

  useEffect(() => {
    try {
      const nextParams = parseSyntax(syntax.trim()).filter(
        (param) => param.name && param.name.trim() !== ''
      )

      setParams(nextParams)
      setArgs(parseArguments(nextParams, input.trim().split(' ')))
    } catch (error) {
      console.error(error)
      alert('Произошла ошибка! Ты что-то сделал не так!')
      return
    }
  }, [syntax, input])

  const onSyntaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSyntax(e.currentTarget.value)
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const showExample = () => {
    setSyntax('<id> <duration> [reason...]')
    setInput('hubert@northwood 24h Попытался сбежать из Саратова')
  }

  const clear = () => {
    setSyntax('')
    setInput('')
  }

  return (
    <div className="container">
      <div className="group">
        <input
          value={syntax}
          onChange={onSyntaxChange}
          placeholder="Синтаксис команды"
        />
      </div>
      <div className="group">
        <input value={input} onChange={onInputChange} placeholder="Твой ввод" />
      </div>
      <div className="vertical group">
        <h1>Результат разбора:</h1>
        <h2>Параметры:</h2>
        <p>Синтаксис команды выше имеет {params.length} параметра:</p>
        {params.map((param, index) => (
          <p key={param.name + index}>
            <span>{index + 1}. </span>
            <span className="bold">{param.name}: </span>
            <span className={param.isRequired ? 'red' : 'green'}>
              {param.isRequired ? 'необходим' : 'дополнительный'}
            </span>
            {param.isRepeated && <span>, повторяется до конца</span>}
          </p>
        ))}

        <h2>Аргументы:</h2>
        <p>Ты передал {argsCount} аргумента:</p>
        {argsEntries.map(([key, value], index) => (
          <p key={key + index}>
            <span>{index + 1}. </span>
            <span className="bold blue">{key}: </span>
            <span className="bold">{value}</span>
          </p>
        ))}
      </div>
      <div className="group">
        <button onClick={showExample}>Пример</button>
        <button onClick={clear}>Очистить</button>
      </div>
    </div>
  )
}
