import { CommandParameter } from './command-parameter'

// Groups:
// 1: <
// 2: name
// 3: ...
// 4: >
const pattern = /(<|\[)(.+?)(\.\.\.)?(>|\])/

export const parseSyntax = (syntax: string): CommandParameter[] => {
  return syntax.split(' ').map((part) => {
    const [_, openBracket, name, modifier, closeBracket] =
      pattern.exec(part) ?? []

    return new CommandParameter({
      name,
      isRepeated: modifier === '...',
      isRequired: openBracket === '<' && closeBracket === '>'
    })
  })
}
