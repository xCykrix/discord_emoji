const { expect } = require('chai')

const dismoji = require('../dist/index')

describe('Discord Emoji Parser', function () {
  it('should-parse-emoji-correctly', async function () {
    expect(dismoji.people.grinning).to.equal('😀')
  })
})
