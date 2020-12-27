export interface EmojiIndex {
  people: EmojiTable[]
  nature: EmojiTable[]
  food: EmojiTable[]
  activity: EmojiTable[]
  travel: EmojiTable[]
  objects: EmojiTable[]
  flags: EmojiTable[]
}

export interface EmojiTable {
  names: string[]
  surrogates: string
  unicodeVersion: number
  hasDiversity?: boolean
  diversityChildren?: DiversityChildren[]
}

export interface DiversityChildren {
  names: string[]
  surrogates: string
  unicodeVersion: number
  diversity: string[]
  hasDiversityParent: boolean
}

export interface IndexedEmoji {
  name: string
  surrogates: string
  unicodeVersion: number
}
