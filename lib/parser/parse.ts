import fetch from 'node-fetch'
import { js } from 'js-beautify'
import { EmojiIndex, IndexedEmoji } from '../types/generic.type'

export class EmojiParser {
  private _index: EmojiIndex
  private readonly _parse: Map<string, IndexedEmoji> = new Map()

  async download (): Promise<string> {
    const connection = await fetch('https://discord.com/assets/5dc3de3390231d99c855.js')
    const minified = await connection.text()

    const clean = await js(minified, { indent_size: 2, space_in_empty_paren: true })
    return clean.split('\n').filter((v) => { return v.includes('"people":[') })[0]
  }

  async sync (): Promise<void> {
    let text = await this.download()

    text = text.replace('e.exports = JSON.parse(\'', '')
    text = text.substr(0, text.length - 2)
    text = JSON.parse(`${text}`)

    this._index = text as unknown as EmojiIndex

    const indexMerge = [
      ...this._index.people,
      ...this._index.nature,
      ...this._index.food,
      ...this._index.activity,
      ...this._index.travel,
      ...this._index.objects,
      ...this._index.flags
    ]

    for (const e of indexMerge) {
      for (const name of e.names) {
        this._parse.set(name, {
          name,
          surrogates: e.surrogates,
          unicodeVersion: e.unicodeVersion
        })
      }
    }
  }

  async get (name: string): Promise<IndexedEmoji | undefined> {
    return this._parse.get(name)
  }
}
