import fetch from 'node-fetch'
import { js } from 'js-beautify'
import { EmojiIndex, IndexedEmoji } from '../types/generic.type'

export class EmojiParser {
  private index: EmojiIndex
  private readonly parsed: Map<string, IndexedEmoji> = new Map()

  async update (): Promise<void> {
    const connection = await fetch('https://discord.com/assets/5dc3de3390231d99c855.js')
    const minified = await connection.text()

    const clean = await js(minified, { indent_size: 2, space_in_empty_paren: true })
    const statement = clean.split('\n').filter((v) => { return v.includes('"people":[') })[0]

    let text = statement.replace('e.exports = JSON.parse(\'', '')
    text = text.substr(0, text.length - 2)
    text = JSON.parse(`${text}`)

    this.index = text as unknown as EmojiIndex

    const entries = [
      ...this.index.people,
      ...this.index.nature,
      ...this.index.food,
      ...this.index.activity,
      ...this.index.travel,
      ...this.index.objects,
      ...this.index.flags
    ]

    for (const entry of entries) {
      for (const name of entry.names) {
        this.parsed.set(name, {
          name,
          surrogates: entry.surrogates,
          unicodeVersion: entry.unicodeVersion
        })
      }
    }
  }

  get (name: string): IndexedEmoji | undefined {
    return this.parsed.get(name)
  }
}
