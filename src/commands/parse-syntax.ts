import { CommandParameter } from './command-parameter'

// Groups:
// 1: <
// 2: name
// 3: ...
// 4: >
const pattern = /(<|\[)(.+?)(\.\.\.)?(>|\])/g

export const parseSyntax = (syntax: string): CommandParameter[] => {
  const matches = Array.from(syntax.matchAll(pattern))

  return matches.map((match) => {
    const [_, openBracket, name, modifier, closeBracket] = match

    return new CommandParameter({
      name,
      isRepeated: modifier === '...',
      isRequired: openBracket === '<' && closeBracket === '>'
    })
  })
}
