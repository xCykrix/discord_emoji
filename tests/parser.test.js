const { expect } = require('chai')

const { EmojiParser } = require('../dist/lib/parser/parse.js')

describe('Discord Emoji Parser', function () {
  const parser = new EmojiParser()

  it('should-sync-emoji-data', async function () {
    this.timeout(5000)
    await parser.update()
  })
  it('should-parse-emoji-correctly', async function () {
    expect(await parser.get('grinning').surrogates).to.equal('😀')
  })
})
