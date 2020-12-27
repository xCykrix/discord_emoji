const { EmojiParser } = require('../dist/lib/parser/parse.js')
const parser = new EmojiParser()

async function main () {
  await parser.sync()
  console.info(await parser.get('grinning'))
  console.info(await parser.get('rainbow_flag'))
}

main()
