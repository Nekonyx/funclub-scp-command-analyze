import type { CommandParameter } from './command-parameter'

export const parseArguments = (
  params: CommandParameter[],
  args: string[]
): Record<string, string> => {
  const result: Record<string, string> = {}

  for (let i = 0; i < params.length; i++) {
    const param = params[i]

    // Аргументов меньше чем параметров
    if (args.length <= i) {
      result[param.name] = ''
      continue
    }

    // Повторяющиеся параметры в самом конце
    // prettier-ignore
    result[param.name] = param.isRepeated
      ? args.slice(i).join(' ')
      : args[i]
  }

  return result
}
