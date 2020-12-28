const { expect } = require('chai')

const dmoji = require('../dist/index')

describe('Discord Emoji Parser', function () {
  it('should-parse-emoji-correctly', async function () {
    expect(dmoji.people.grinning).to.equal('😀')
  })
})
