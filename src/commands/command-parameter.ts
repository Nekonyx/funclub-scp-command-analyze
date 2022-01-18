export type CommandParameterOptions = {
  name: string
  isRequired?: boolean
  isRepeated?: boolean
}

export class CommandParameter {
  public readonly name: string
  public readonly isRequired: boolean
  public readonly isRepeated: boolean

  public constructor(opts: CommandParameterOptions) {
    this.name = opts.name
    this.isRequired = opts.isRequired ?? false
    this.isRepeated = opts.isRepeated ?? false
  }

  public toString() {
    let result = ''

    result += this.isRequired ? '<' : '['
    result += this.name
    result += this.isRepeated ? '...' : ''
    result += this.isRequired ? '>' : ']'

    return result
  }
}
